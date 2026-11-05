(function () {
  "use strict";

  const recipes = globalThis.RECIPES;
  const scale = globalThis.CuisineScale;
  const root = document.getElementById("app");
  const recipeById = new Map((recipes || []).map(function (recipe) {
    return [recipe.id, recipe];
  }));
  const navigation = [{ page: "library" }];
  let stepIndex = 0;
  let wakeLock = null;
  let wakeLockMessage = "";
  let offlineReady = false;
  let offlineMessage = "";
  let statusMessage = "";
  let statusKind = "success";

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
      }[character];
    });
  }

  function current() {
    return navigation[navigation.length - 1];
  }

  function currentRecipe() {
    const page = current();
    return page.recipeId ? recipeById.get(page.recipeId) : undefined;
  }

  function readServings(recipe) {
    try {
      const saved = localStorage.getItem("cuisine-servings-" + recipe.id);
      if (saved === null) return recipe.baseServings;
      const servings = Number(saved);
      if (!Number.isInteger(servings) || servings < 1) {
        statusMessage = "Le nombre de personnes mémorisé est invalide ; la valeur de base est utilisée.";
        statusKind = "error";
        return recipe.baseServings;
      }
      return servings;
    } catch (error) {
      console.error("Lecture des portions impossible.", error);
      statusMessage = "Impossible de lire les portions mémorisées ; la valeur de base est utilisée.";
      statusKind = "error";
      return recipe.baseServings;
    }
  }

  function saveServings(recipe, servings) {
    try {
      localStorage.setItem("cuisine-servings-" + recipe.id, String(servings));
      statusMessage = "";
    } catch (error) {
      console.error("Enregistrement des portions impossible.", error);
      statusMessage = "Impossible de mémoriser ce nombre de personnes sur cet appareil.";
      statusKind = "error";
    }
  }

  function infrastructureNote() {
    let note = "";
    if (offlineReady) {
      note += '<p class="offline-note">Recettes disponibles hors ligne.</p>';
    } else if (offlineMessage) {
      note += '<p class="meta">' + escapeHtml(offlineMessage) + "</p>";
    }
    if (!isStandalone()) {
      note += '<p class="meta">Ajoutez Cuisine à l’écran d’accueil pour l’ouvrir comme une app.</p>';
    }
    return note;
  }

  function isStandalone() {
    return window.matchMedia("(display-mode: standalone)").matches ||
      navigator.standalone === true;
  }

  function topbar(label) {
    return '<header class="topbar"><button class="back-button" type="button" data-action="back" aria-label="Retour">‹ ' +
      escapeHtml(label) + "</button></header>";
  }

  function renderLibrary() {
    const cards = recipes.map(function (recipe) {
      return '<button class="recipe-card" type="button" data-action="open-recipe" data-recipe-id="' +
        escapeHtml(recipe.id) + '"><span class="recipe-card-title">' +
        escapeHtml(recipe.title) + '</span><span class="recipe-card-meta">' +
        recipe.steps.length + " étapes</span></button>";
    }).join("");
    root.innerHTML = '<section class="screen" aria-labelledby="screen-title">' +
      '<h1 id="screen-title">Cuisine</h1>' +
      '<p class="meta">Vos recettes, prêtes à cuisiner.</p>' +
      '<div class="recipe-list" aria-label="Recettes">' + cards + "</div>" +
      infrastructureNote() + "</section>";
  }

  function renderIngredientChip(item) {
    const ingredient = item.ingredient;
    const detail = ingredient.prep || ingredient.note || "";
    const quantity = item.quantity
      ? '<span class="ingredient-chip-quantity">' + escapeHtml(item.quantity) + "</span>"
      : "";
    return '<li class="ingredient-chip">' + quantity +
      '<span>' + escapeHtml(ingredient.name) + "</span>" +
      (detail ? '<span class="meta">' + escapeHtml(detail) + "</span>" : "") +
      "</li>";
  }

  function getOverviewRows(recipe) {
    const rows = new Map();
    recipe.steps.forEach(function (step, stepNumber) {
      scale.getStepIngredients(recipe, step, current().servings).forEach(function (item) {
        if (!rows.has(item.ingredient.id)) {
          rows.set(item.ingredient.id, {
            ingredient: item.ingredient,
            steps: new Map()
          });
        }
        rows.get(item.ingredient.id).steps.set(stepNumber, item.quantity || "•");
      });
    });
    return Array.from(rows.values());
  }

  function renderOverview(recipe) {
    const rows = getOverviewRows(recipe);
    const totals = new Map(scale.getShoppingTotals(recipe, current().servings).map(function (total) {
      return [total.ingredient.id, total.isNeed ? "au besoin" : total.quantity];
    }));
    const stepHeaders = recipe.steps.map(function (_, index) {
      return "<th scope=\"col\">Étape " + (index + 1) + "</th>";
    }).join("");
    const body = rows.map(function (row) {
      const cells = recipe.steps.map(function (_, index) {
        const quantity = row.steps.get(index) || "—";
        const content = quantity === "—" || quantity === "•"
          ? escapeHtml(quantity)
          : '<span class="overview-quantity">' + escapeHtml(quantity) + "</span>";
        return "<td>" + content + "</td>";
      }).join("");
      const total = totals.get(row.ingredient.id) || "au besoin";
      const totalCell = total === "au besoin"
        ? escapeHtml(total)
        : '<span class="overview-quantity">' + escapeHtml(total) + "</span>";
      return "<tr><td>" + escapeHtml(row.ingredient.name) + "</td>" + cells +
        "<td>" + totalCell + "</td></tr>";
    }).join("");
    const columns = '<colgroup><col style="width:40%">' +
      recipe.steps.map(function () {
        return "<col>";
      }).join("") + "<col></colgroup>";
    return '<div class="overview-wrap"><table class="overview" aria-label="Ingrédients par étape">' +
      columns + "<thead><tr><th scope=\"col\">Ingrédient</th>" + stepHeaders +
      "<th scope=\"col\">Total</th></tr></thead><tbody>" + body +
      "</tbody></table></div>";
  }

  function renderRecipe() {
    const recipe = currentRecipe();
    if (!recipe) throw new Error("Recette introuvable.");
    const servings = current().servings;
    const amount = servings + (servings === 1 ? " personne" : " personnes");
    const info = recipe.source
      ? '<p class="meta">' + escapeHtml(recipe.source) + "</p>"
      : "";
    const warning = statusMessage && statusKind === "error"
      ? '<p class="meta" role="status">' + escapeHtml(statusMessage) + "</p>"
      : "";
    root.innerHTML = '<section class="screen" aria-labelledby="screen-title">' +
      topbar("Recettes") +
      '<h1 id="screen-title">' + escapeHtml(recipe.title) + "</h1>" +
      '<p class="meta">' + escapeHtml(amount) + " · " + recipe.steps.length + " étapes</p>" +
      info +
      '<div class="recipe-actions"><div class="stepper" aria-label="Nombre de personnes">' +
      '<button class="quiet" type="button" data-action="servings" data-delta="-1" aria-label="Diminuer le nombre de personnes">−</button>' +
      '<span class="stepper-value">' + escapeHtml(amount) + "</span>" +
      '<button class="quiet" type="button" data-action="servings" data-delta="1" aria-label="Augmenter le nombre de personnes">+</button>' +
      "</div>" +
      '<button class="primary" type="button" data-action="cook">Cuisiner</button></div>' +
      warning +
      "<h2>Vue d’ensemble</h2>" + renderOverview(recipe) +
      "<h2>Liste de courses</h2>" +
      '<p class="meta">Copiez la liste dans Rappels, puis retirez ce que vous avez déjà.</p>' +
      '<button class="shopping-copy" type="button" data-action="copy-list">Copier la liste</button>' +
      (statusMessage && statusKind === "success"
        ? '<p class="copied-toast" role="status">' + escapeHtml(statusMessage) + "</p>"
        : '<p class="copied-toast" aria-live="polite"></p>') +
      infrastructureNote() + "</section>";
  }

  function renderCook() {
    const recipe = currentRecipe();
    if (!recipe) throw new Error("Recette introuvable.");
    const step = recipe.steps[stepIndex];
    if (!step) throw new Error("Étape introuvable.");
    const stepText = scale.resolveStepText(recipe, step, current().servings);
    const ingredients = scale.getStepIngredients(recipe, step, current().servings);
    const chips = ingredients.length
      ? '<ul class="ingredient-chips" aria-label="Ingrédients de cette étape">' +
        ingredients.map(renderIngredientChip).join("") + "</ul>"
      : '<p class="meta">Aucun ingrédient à ajouter à cette étape.</p>';
    const previousDisabled = stepIndex === 0 ? " disabled" : "";
    const nextButton = stepIndex < recipe.steps.length - 1
      ? '<button class="primary" type="button" data-action="next-step">Étape suivante</button>'
      : '<button class="primary" type="button" disabled>Fin de la recette</button>';
    const warning = wakeLockMessage
      ? '<p class="meta" role="status">' + escapeHtml(wakeLockMessage) + "</p>"
      : "";
    root.innerHTML = '<section class="screen cook-screen" aria-labelledby="screen-title">' +
      '<div class="cook-main">' + topbar("Recette") +
      '<p class="step-header">Étape ' + (stepIndex + 1) + " / " + recipe.steps.length + "</p>" +
      '<p id="screen-title" class="step-text" tabindex="-1">' + escapeHtml(stepText) + "</p>" +
      '<p class="section-label">Ingrédients de cette étape</p>' + chips + warning +
      "</div>" +
      '<nav class="cook-navigation" aria-label="Navigation des étapes">' +
      '<button class="quiet" type="button" data-action="previous-step" aria-label="Étape précédente"' +
      previousDisabled + ">Précédente</button>" + nextButton + "</nav></section>";
  }

  function render(animate) {
    try {
      const page = current().page;
      if (page === "library") renderLibrary();
      else if (page === "recipe") renderRecipe();
      else if (page === "cook") renderCook();
      else throw new Error("Écran inconnu : " + page);
      if (animate) {
        const screen = root.querySelector(".screen");
        if (screen) screen.classList.add("enter");
      }
    } catch (error) {
      console.error("Affichage impossible.", error);
      root.innerHTML = '<section class="screen"><h1>Impossible d’afficher cette recette.</h1>' +
        '<p class="meta">' + escapeHtml(error.message) + "</p>" +
        '<button type="button" data-action="back">Retour</button></section>';
    }
  }

  async function acquireWakeLock() {
    if (!("wakeLock" in navigator)) {
      wakeLockMessage = "Le maintien de l’écran n’est pas disponible dans ce navigateur.";
      render();
      return;
    }
    if (wakeLock && !wakeLock.released) return;
    try {
      wakeLock = await navigator.wakeLock.request("screen");
      wakeLockMessage = "";
      wakeLock.addEventListener("release", function () {
        wakeLock = null;
        if (current().page === "cook") {
          wakeLockMessage = "Le maintien de l’écran a été interrompu par le système.";
          render();
        }
      }, { once: true });
    } catch (error) {
      console.error("Activation du maintien de l’écran impossible.", error);
      wakeLock = null;
      wakeLockMessage = "Impossible de maintenir l’écran allumé. Vérifiez le mode économie d’énergie.";
    }
  }

  async function releaseWakeLock() {
    const lock = wakeLock;
    wakeLock = null;
    if (!lock) return;
    try {
      await lock.release();
    } catch (error) {
      console.error("Libération du maintien de l’écran impossible.", error);
      statusMessage = "Le maintien de l’écran n’a pas pu être libéré correctement.";
      statusKind = "error";
    }
  }

  async function startCooking() {
    stepIndex = 0;
    wakeLockMessage = "";
    await acquireWakeLock();
    navigation.push({ page: "cook", recipeId: currentRecipe().id, servings: current().servings });
    render(true);
    window.scrollTo(0, 0);
    const heading = document.getElementById("screen-title");
    if (heading) heading.focus({ preventScroll: true });
  }

  async function goBack() {
    if (current().page === "cook") await releaseWakeLock();
    if (navigation.length > 1) navigation.pop();
    if (current().page === "library") {
      statusMessage = "";
      statusKind = "success";
    }
    render(true);
    window.scrollTo(0, 0);
  }

  async function copyList() {
    const recipe = currentRecipe();
    const text = scale.formatShoppingList(recipe, current().servings);
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      statusMessage = "La copie n’est pas disponible. Ouvrez Cuisine en contexte sécurisé.";
      statusKind = "error";
      render();
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      statusMessage = "Copié.";
      statusKind = "success";
    } catch (error) {
      console.error("Copie de la liste impossible.", error);
      statusMessage = "Copie impossible. Vérifiez l’autorisation du navigateur.";
      statusKind = "error";
    }
    render();
  }

  root.addEventListener("click", async function (event) {
    const button = event.target.closest("[data-action]");
    if (!button || button.disabled) return;
    const action = button.dataset.action;
    if (action === "open-recipe") {
      const recipe = recipeById.get(button.dataset.recipeId);
      if (!recipe) {
        statusMessage = "Recette introuvable.";
        statusKind = "error";
        render();
        return;
      }
      statusMessage = "";
      statusKind = "success";
      navigation.push({
        page: "recipe",
        recipeId: recipe.id,
        servings: readServings(recipe)
      });
      render(true);
      window.scrollTo(0, 0);
    } else if (action === "back") {
      await goBack();
    } else if (action === "servings") {
      const page = current();
      const next = Math.max(1, page.servings + Number(button.dataset.delta));
      if (next === page.servings) return;
      page.servings = next;
      saveServings(currentRecipe(), next);
      render();
    } else if (action === "cook") {
      await startCooking();
    } else if (action === "previous-step") {
      if (stepIndex > 0) stepIndex -= 1;
      render(true);
      window.scrollTo(0, 0);
    } else if (action === "next-step") {
      const recipe = currentRecipe();
      if (stepIndex < recipe.steps.length - 1) stepIndex += 1;
      render(true);
      window.scrollTo(0, 0);
    } else if (action === "copy-list") {
      await copyList();
    }
  });

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && current().page === "cook") {
      acquireWakeLock().then(function () {
        if (current().page === "cook") render();
      });
    }
  });

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator) || !window.isSecureContext) {
      offlineMessage = "L’accès hors ligne nécessite une adresse HTTPS.";
      render();
      return;
    }
    navigator.serviceWorker.register("./sw.js").then(function () {
      return navigator.serviceWorker.ready;
    }).then(function () {
      offlineReady = true;
      offlineMessage = "";
      render();
    }).catch(function (error) {
      console.error("Préparation du mode hors ligne impossible.", error);
      offlineMessage = "Le mode hors ligne n’a pas pu être préparé sur cet appareil.";
      render();
    });
  }

  if (!Array.isArray(recipes) || recipes.length !== 7) {
    throw new Error("Les sept recettes ne sont pas disponibles.");
  }
  if (!scale) throw new Error("Le module de mise à l’échelle est indisponible.");
  render();
  registerServiceWorker();
})();
