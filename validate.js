(function (root) {
  "use strict";

  const UNITS = new Set([
    "g", "kg", "ml", "cl", "l", "cas", "cac", "piece",
    "bouquet", "poignee", "pincee", "filet"
  ]);
  const has = function (object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
  };

  function validateRecipes(recipes) {
    if (!Array.isArray(recipes)) throw new Error("Le tableau des recettes est introuvable.");
    const recipeIds = new Set();
    const reports = recipes.map(function (recipe) {
      const errors = [];
      const warnings = [];
      const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
      const steps = Array.isArray(recipe.steps) ? recipe.steps : [];
      const ingredientIds = new Set();
      const usedIds = new Set();

      function error(code, message) {
        errors.push({ code: code, message: message });
      }

      function warning(code, message) {
        warnings.push({ code: code, message: message });
      }

      if (recipe.schemaVersion !== 1) error("E01", "schemaVersion doit être 1.");
      if (typeof recipe.id !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(recipe.id)) {
        error("E02", "id recette invalide : identifiant en minuscules séparé par des tirets attendu.");
      }
      if (recipeIds.has(recipe.id)) error("E03", "id recette dupliqué : " + recipe.id + ".");
      recipeIds.add(recipe.id);
      if (typeof recipe.title !== "string" || !recipe.title.trim()) error("E04", "title manquant.");
      if (recipe.language !== "fr" && recipe.language !== "en") {
        error("E05", "language doit être « fr » ou « en ».");
      }
      if (!Number.isInteger(recipe.baseServings) || recipe.baseServings < 1) {
        error("E06", "baseServings doit être un entier positif.");
      }
      if (!Array.isArray(recipe.ingredients) || ingredients.length === 0) {
        error("E07", "ingredients[] doit contenir au moins un ingrédient.");
      }
      if (!Array.isArray(recipe.steps) || steps.length === 0) {
        error("E08", "steps[] doit contenir au moins une étape.");
      }
      if (!recipe.sourceServingsLabel) warning("W01", "sourceServingsLabel manquant.");
      if (!recipe.source) warning("W07", "source manquante.");

      ingredients.forEach(function (ingredient, index) {
        const label = ingredient.id || "ingrédient " + (index + 1);
        if (ingredientIds.has(ingredient.id)) error("E09", "id ingrédient dupliqué : " + label + ".");
        ingredientIds.add(ingredient.id);
        if (typeof ingredient.name !== "string" || !ingredient.name.trim()) {
          error("E10", label + " : name manquant.");
        } else if (/\d/.test(ingredient.name)) {
          warning("W06", label + " : chiffre dans name.");
        }
        if (has(ingredient, "qty") !== has(ingredient, "unit")) {
          error(has(ingredient, "qty") ? "E11" : "E12",
            label + " : qty et unit doivent être présents ensemble.");
        }
        if (has(ingredient, "unit") && !UNITS.has(ingredient.unit)) {
          error("E13", label + " : unité non autorisée « " + ingredient.unit + " ».");
        }
        if (has(ingredient, "qty") &&
            (!Number.isFinite(ingredient.qty) || ingredient.qty <= 0)) {
          error("E14", label + " : qty doit être strictement positive.");
        }
        if (has(ingredient, "qtyMax") &&
            (!has(ingredient, "qty") || !Number.isFinite(ingredient.qtyMax) ||
              ingredient.qtyMax < ingredient.qty)) {
          error("E15", label + " : qtyMax doit être présent avec qty et supérieur ou égal.");
        }
        if (has(ingredient, "optional") && typeof ingredient.optional !== "boolean") {
          warning("W05", label + " : optional n’est pas booléen.");
        }
      });

      steps.forEach(function (step, index) {
        const stepLabel = "étape " + (index + 1);
        if (typeof step.text !== "string" || !step.text.trim()) {
          error("E16", stepLabel + " : text manquant.");
          return;
        }
        const uses = Array.isArray(step.uses) ? step.uses : [];
        if (uses.length === 0) warning("W03", stepLabel + " : uses vide.");
        const stepUseIds = new Set();

        uses.forEach(function (rawUse) {
          const use = typeof rawUse === "string" ? { id: rawUse } : rawUse;
          if (!use || typeof use.id !== "string" || !ingredientIds.has(use.id)) {
            error("E17", stepLabel + " : référence uses inconnue.");
            return;
          }
          stepUseIds.add(use.id);
          usedIds.add(use.id);
          if (has(use, "qty") !== has(use, "unit")) {
            error(has(use, "qty") ? "E11" : "E12",
              stepLabel + " / " + use.id + " : qty et unit doivent être présents ensemble.");
          }
          if (has(use, "unit") && !UNITS.has(use.unit)) {
            error("E13", stepLabel + " / " + use.id + " : unité non autorisée « " + use.unit + " ».");
          }
          if (has(use, "qty") &&
              (!Number.isFinite(use.qty) || use.qty <= 0)) {
            error("E14", stepLabel + " / " + use.id + " : qty doit être strictement positive.");
          }
          if (has(use, "qtyMax") &&
              (!has(use, "qty") || !Number.isFinite(use.qtyMax) || use.qtyMax < use.qty)) {
            error("E15", stepLabel + " / " + use.id + " : qtyMax invalide.");
          }
          const tokenIds = Array.from(step.text.matchAll(/\{([^{}]+)\}/g))
            .map(function (match) { return match[1]; });
          if (has(use, "qty") && !tokenIds.includes(use.id)) {
            warning("W08", stepLabel + " / " + use.id + " : override sans jeton correspondant.");
          }
        });

        const tokens = Array.from(step.text.matchAll(/\{([^{}]+)\}/g))
          .map(function (match) { return match[1]; });
        tokens.forEach(function (id) {
          if (!ingredientIds.has(id) || !stepUseIds.has(id)) {
            error("E18", stepLabel + " : jeton inconnu ou absent de uses : {" + id + "}.");
            return;
          }
          const use = uses.map(function (rawUse) {
            return typeof rawUse === "string" ? { id: rawUse } : rawUse;
          }).find(function (entry) {
            return entry && entry.id === id;
          });
          const ingredient = ingredients.find(function (entry) {
            return entry.id === id;
          });
          const quantity = has(use, "qty") ? use.qty : ingredient.qty;
          const unit = has(use, "unit") ? use.unit : ingredient.unit;
          if (quantity === undefined || unit === undefined) {
            error("E19", stepLabel + " : aucune quantité résoluble pour {" + id + "}.");
          }
        });

        if (tokens.length > 0 && !step.sourceText) {
          warning("W09", stepLabel + " : étape tokenisée sans sourceText.");
        }
        if (step.text.includes("[À VÉRIFIER]")) {
          warning("W04", stepLabel + " : marqueur [À VÉRIFIER] restant.");
        }
      });

      ingredients.forEach(function (ingredient) {
        if (!usedIds.has(ingredient.id)) {
          warning("W02", ingredient.id + " : ingrédient jamais utilisé dans une étape.");
        }
      });
      return { recipe: recipe, errors: errors, warnings: warnings };
    });
    return reports;
  }

  function printValidation(recipes, scale) {
    const reports = validateRecipes(recipes);
    let errorCount = 0;
    let warningCount = 0;
    reports.forEach(function (report) {
      errorCount += report.errors.length;
      warningCount += report.warnings.length;
      const mark = report.errors.length ? "✖" : "✔";
      console.log(mark + " " + report.recipe.id + " : " +
        report.errors.length + " erreur(s), " + report.warnings.length + " avertissement(s)");
      report.errors.concat(report.warnings).forEach(function (item) {
        console.log("  " + item.code + " " + item.message);
      });
    });

    console.log("\nTotaux de courses dérivés");
    recipes.forEach(function (recipe) {
      [recipe.baseServings, recipe.baseServings * 2].forEach(function (servings) {
        const factor = scale.getFactor(recipe, servings);
        console.log("\n" + recipe.id + " ×" + factor + " (" + servings + " pers.)");
        scale.getShoppingTotals(recipe, servings).forEach(function (total) {
          console.log("  " + total.ingredient.name + " : " +
            (total.isNeed ? "au besoin" : total.quantity));
        });
      });
    });

    console.log("\nAuto-test de mise à l’échelle");
    const selfTest = scale.selfTest(recipes);
    selfTest.expected.concat(selfTest.scaling).forEach(function (line) {
      console.log("  " + line);
    });
    console.log("\nTotal : " + errorCount + " erreur(s), " + warningCount + " avertissement(s)");
    return { errors: errorCount, warnings: warningCount };
  }

  const api = {
    validateRecipes: validateRecipes,
    printValidation: printValidation
  };
  root.CuisineValidate = api;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
    if (require.main === module) {
      const path = require("path");
      const recipePath = path.resolve(process.argv[2] || "./recipes.js");
      require(recipePath);
      const scale = require(path.join(__dirname, "scale.js"));
      try {
        const result = printValidation(root.RECIPES, scale);
        if (result.errors > 0) process.exitCode = 1;
      } catch (error) {
        console.error("Validation impossible : " + error.message);
        process.exitCode = 1;
      }
    }
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
