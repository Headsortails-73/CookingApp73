(function (root) {
  "use strict";

  const FRACTIONS = new Map([
    [0.25, "¼"],
    [0.5, "½"],
    [0.75, "¾"]
  ]);
  const UNIT_LABELS = {
    g: "g",
    kg: "kg",
    ml: "ml",
    cl: "cl",
    l: "l",
    cas: "c. à s.",
    cac: "c. à c.",
    piece: "",
    bouquet: "bouquet",
    poignee: "poignée",
    pincee: "pincée",
    filet: "filet"
  };

  function roundTo(value, increment) {
    return Math.floor(value / increment + 0.5 + 1e-10) * increment;
  }

  function formatNumber(value, decimals) {
    const digits = decimals === undefined ? 3 : decimals;
    return value.toFixed(digits)
      .replace(/(\.\d*?[1-9])0+$|\.0+$/, "$1")
      .replace(".", ",");
  }

  function formatFraction(value) {
    const whole = Math.floor(value + 1e-10);
    const fraction = Math.round((value - whole) * 4) / 4;
    const suffix = FRACTIONS.get(fraction);
    if (!suffix) return formatNumber(value);
    return (whole ? String(whole) : "") + suffix;
  }

  function roundQuantity(value, unit) {
    if (unit === "pincee" || unit === "filet") return roundTo(value, 0.25);
    if (unit === "piece") {
      return value < 1 ? roundTo(value, 0.25) : roundTo(value, 1);
    }
    if (unit === "poignee") return Math.max(1, roundTo(value, 1));
    if (unit === "cas" || unit === "cac") return roundTo(value, 0.25);
    if (unit === "bouquet") return roundTo(value, 0.5);
    if (unit === "kg" || unit === "l") {
      const base = unit === "kg" ? 1000 : 1000;
      const scaledBase = value * base;
      let increment = 1;
      if (scaledBase >= 100) increment = 10;
      else if (scaledBase >= 20) increment = 5;
      return roundTo(scaledBase, increment) / base;
    }
    if (unit === "g" || unit === "ml" || unit === "cl") {
      if (value >= 100) return roundTo(value, 10);
      if (value >= 20) return roundTo(value, 5);
      return roundTo(value, 1);
    }
    throw new Error("Unité non prise en charge : " + unit);
  }

  function unitLabel(unit, value) {
    const label = UNIT_LABELS[unit];
    if (label === undefined) throw new Error("Unité non prise en charge : " + unit);
    if (unit === "bouquet" && value >= 2) return "bouquets";
    if (unit === "poignee" && value >= 2) return "poignées";
    if (unit === "pincee" && value >= 2) return "pincées";
    if (unit === "filet" && value >= 2) return "filets";
    return label;
  }

  function formatAmount(value, unit) {
    return unit === "cas" || unit === "cac" || unit === "piece" ||
      unit === "bouquet" || unit === "poignee" ||
      unit === "pincee" || unit === "filet"
      ? formatFraction(value)
      : formatNumber(value, unit === "kg" || unit === "l" ? 3 : 0);
  }

  function getScale(factor) {
    const scale = factor === undefined ? 1 : factor;
    if (!Number.isFinite(scale) || scale <= 0) {
      throw new Error("Le multiplicateur doit être un nombre positif.");
    }
    return scale;
  }

  function formatQuantity(value, unit, factor) {
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error("La quantité doit être un nombre positif.");
    }
    const scale = getScale(factor);
    const effectiveScale = unit === "pincee" || unit === "filet" ? 1 : scale;
    const rounded = roundQuantity(value * effectiveScale, unit);
    const amount = formatAmount(rounded, unit);
    const label = unitLabel(unit, rounded);
    return label ? amount + " " + label : amount;
  }

  function formatRange(minimum, maximum, unit, factor) {
    if (!Number.isFinite(minimum) || minimum <= 0 ||
        !Number.isFinite(maximum) || maximum < minimum) {
      throw new Error("Les bornes de quantité sont invalides.");
    }
    const scale = getScale(factor);
    const effectiveScale = unit === "pincee" || unit === "filet" ? 1 : scale;
    const low = roundQuantity(minimum * effectiveScale, unit);
    const high = roundQuantity(maximum * effectiveScale, unit);
    const label = unitLabel(unit, high);
    const amounts = formatAmount(low, unit) + "–" + formatAmount(high, unit);
    return label ? amounts + " " + label : amounts;
  }

  function getFactor(recipe, servings) {
    if (!Number.isInteger(servings) || servings < 1) {
      throw new Error("Le nombre de personnes doit être un entier positif.");
    }
    if (!Number.isInteger(recipe.baseServings) || recipe.baseServings < 1) {
      throw new Error("La recette doit avoir un nombre de portions de base valide.");
    }
    return servings / recipe.baseServings;
  }

  function normalizeUse(use) {
    return typeof use === "string" ? { id: use } : use;
  }

  function getIngredient(recipe, id) {
    const ingredient = recipe.ingredients.find(function (item) {
      return item.id === id;
    });
    if (!ingredient) throw new Error("Ingrédient introuvable : " + id);
    return ingredient;
  }

  function getStepUse(recipe, step, id) {
    for (const rawUse of step.uses || []) {
      const use = normalizeUse(rawUse);
      if (use.id === id) return use;
    }
    return undefined;
  }

  function resolvedQuantity(recipe, step, use, factor) {
    const ingredient = getIngredient(recipe, use.id);
    const quantity = use.qty === undefined ? ingredient.qty : use.qty;
    const unit = use.unit === undefined ? ingredient.unit : use.unit;
    if (quantity === undefined || unit === undefined) return "";
    const max = use.qtyMax === undefined ? ingredient.qtyMax : use.qtyMax;
    if (max === undefined) return formatQuantity(quantity, unit, factor);
    return formatRange(quantity, max, unit, factor);
  }

  function resolveStepText(recipe, step, servings) {
    const factor = getFactor(recipe, servings);
    return step.text.replace(/\{([^{}]+)\}/g, function (token, id) {
      const use = getStepUse(recipe, step, id);
      if (!use) throw new Error("Jeton sans lien dans l'étape : " + id);
      const quantity = resolvedQuantity(recipe, step, use, factor);
      if (!quantity) throw new Error("Quantité introuvable pour le jeton : " + id);
      return quantity;
    });
  }

  function getStepIngredients(recipe, step, servings) {
    const factor = getFactor(recipe, servings);
    return (step.uses || []).map(function (rawUse) {
      const use = normalizeUse(rawUse);
      const ingredient = getIngredient(recipe, use.id);
      return {
        ingredient: ingredient,
        quantity: resolvedQuantity(recipe, step, use, factor),
        use: use
      };
    });
  }

  function getShoppingTotals(recipe, servings) {
    const factor = getFactor(recipe, servings);
    const totals = recipe.ingredients.map(function (ingredient) {
      if (ingredient.qty !== undefined) {
        const quantity = ingredient.qtyMax === undefined
          ? formatQuantity(ingredient.qty, ingredient.unit, factor)
          : formatRange(ingredient.qty, ingredient.qtyMax, ingredient.unit, factor);
        return {
          ingredient: ingredient,
          quantity: quantity,
          isNeed: false
        };
      }

      const grouped = new Map();
      recipe.steps.forEach(function (step) {
        (step.uses || []).forEach(function (rawUse) {
          const use = normalizeUse(rawUse);
          if (use.id !== ingredient.id || use.qty === undefined) return;
          const unit = use.unit || ingredient.unit;
          if (!unit) return;
          const item = grouped.get(unit) || { min: 0, max: 0, hasMax: false };
          item.min += use.qty;
          const max = use.qtyMax === undefined ? use.qty : use.qtyMax;
          item.max += max;
          item.hasMax = item.hasMax || use.qtyMax !== undefined;
          grouped.set(unit, item);
        });
      });

      const parts = [];
      grouped.forEach(function (values, unit) {
        parts.push(values.hasMax
          ? formatRange(values.min, values.max, unit, factor)
          : formatQuantity(values.min, unit, factor));
      });
      return {
        ingredient: ingredient,
        quantity: parts.join(" + "),
        isNeed: parts.length === 0
      };
    });
    return totals;
  }

  function formatShoppingList(recipe, servings) {
    const lines = [
      recipe.title + " — " + servings + (servings === 1 ? " personne" : " personnes")
    ];
    getShoppingTotals(recipe, servings).forEach(function (total) {
      const ingredient = total.ingredient;
      const optional = ingredient.optional ? " (facultatif)" : "";
      const amount = total.isNeed ? "au besoin" : total.quantity;
      lines.push("- " + amount + " " + ingredient.name + optional);
    });
    return lines.join("\n");
  }

  function assertEqual(actual, expected, label) {
    if (actual !== expected) {
      throw new Error(label + " : attendu « " + expected + " », reçu « " + actual + " »");
    }
  }

  function selfTest(recipes) {
    if (!Array.isArray(recipes)) throw new Error("Aucune recette chargée pour l'auto-test.");
    const byId = new Map(recipes.map(function (recipe) {
      return [recipe.id, recipe];
    }));
    const recipe2 = byId.get("chachouka-patate-douce-beurre-sriracha-pickles-oignons");
    const recipe5 = byId.get("hummus-pois-chiches-tahin");
    const recipe7 = byId.get("tarte-aux-legumes-grilles");
    if (!recipe2 || !recipe5 || !recipe7) {
      throw new Error("L'auto-test attend les recettes R2, R5 et R7.");
    }

    const list = function (recipe, servings) {
      return getShoppingTotals(recipe, servings).reduce(function (result, total) {
        result[total.ingredient.id] = total.isNeed ? "au besoin" : total.quantity;
        return result;
      }, {});
    };

    const r5 = list(recipe5, 6);
    assertEqual(r5.ail, "4", "S1 ail");
    assertEqual(r5["pois-chiches"], "600 g", "S1 pois chiches");
    assertEqual(r5.tahin, "250 g", "S1 tahin");
    assertEqual(r5["eau-glacee"], "10 cl", "S1 eau glacée");
    assertEqual(r5["jus-pois-chiches"], "10 cl", "S1 jus de pois chiches");
    assertEqual(r5.citrons, "1–2", "S1 citrons");
    ["sel", "poivre", "huile-olive", "zaatar"].forEach(function (id) {
      assertEqual(r5[id], "au besoin", "S1 " + id);
    });

    const r2 = list(recipe2, 6);
    [
      ["patates-douces", "1,5 kg"], ["oignon-rouge", "2"],
      ["jus-citron", "3 c. à s."], ["huile-olive", "4½ c. à s."],
      ["cheddar", "230 g"], ["ail", "5"], ["cumin", "1½ c. à c."],
      ["oeufs", "12"], ["beurre", "40 g"], ["sriracha", "1¼ c. à s."],
      ["coriandre", "3 c. à s."]
    ].forEach(function (pair) {
      assertEqual(r2[pair[0]], pair[1], "S2 " + pair[0]);
    });

    const r7 = list(recipe7, 5);
    [
      ["oignons", "3"], ["laurier", "3"], ["pate-brisee", "380 g"],
      ["thym", "10"], ["ricotta", "150 g"], ["feta", "150 g"],
      ["tomates-cerises", "9"], ["oeufs", "3"], ["creme", "25 cl"]
    ].forEach(function (pair) {
      assertEqual(r7[pair[0]], pair[1], "S3 " + pair[0]);
    });

    const r7Six = list(recipe7, 6);
    assertEqual(r7Six["tomates-cerises"], "11", "AC2 tomates cerises");
    assertEqual(r7Six.oeufs, "3", "AC2 œufs");
    assertEqual(r7Six.thym, "12", "AC2 thym");
    assertEqual(formatQuantity(8, "piece", 4 / 3), "11", "AC1 R2 œufs");
    assertEqual(formatQuantity(7, "piece", 1.5), "11", "AC1 R7 tomates");
    assertEqual(formatQuantity(2, "piece", 1.25), "3", "AC1 R7 œufs");
    assertEqual(formatQuantity(1, "pincee", 2), "1 pincée", "A6 pincée non mise à l’échelle");
    assertEqual(formatQuantity(1, "filet", 2), "1 filet", "A7 filet non mis à l’échelle");
    assertEqual(formatQuantity(1.5, "bouquet"), "1½ bouquet", "A3 bouquet fractionnaire");
    assertEqual(formatQuantity(4, "poignee", 1.25), "5 poignées", "A3 poignées ×1,25");
    assertEqual(formatQuantity(4, "poignee", 2), "8 poignées", "A3 poignées ×2");
    assertEqual(formatQuantity(170, "g", 1.5), "260 g", "A1 grammes ≥100");
    assertEqual(formatQuantity(26, "cl", 1.5), "40 cl", "A1 centilitres 20–100");
    assertEqual(formatQuantity(20, "g", 1.25), "25 g", "A1 grammes <20");
    assertEqual(formatQuantity(1, "kg", 1.33), "1,33 kg", "A1 kilogrammes");
    assertEqual(formatQuantity(3, "cas", 1.5), "4½ c. à s.", "A1 cuillères à soupe");
    assertEqual(formatQuantity(0.75, "cac", 1.5), "1¼ c. à c.", "A1 cuillères à café");
    const aubergine = byId.get("aubergine-parmigiana");
    assertEqual(list(aubergine, aubergine.baseServings)["cherry-tomatoes"],
      "600–1000 g", "A1 plage de grammes");

    const factors = [
      { label: "1", value: 1 },
      { label: "0,5", value: 0.5 },
      { label: "1,25", value: 1.25 },
      { label: "4/3", value: 4 / 3 },
      { label: "1,5", value: 1.5 },
      { label: "2", value: 2 }
    ];
    const scaling = factors.map(function (factor) {
      return "×" + factor.label + ": " +
        formatQuantity(8, "piece", factor.value) + " œufs, " +
        formatQuantity(7, "piece", factor.value) + " tomates";
    });
    return {
      expected: [
        "S1 (×1) : ail 4 · pois chiches 600 g · tahin 250 g · eau glacée 10 cl · jus de pois chiches 10 cl · citrons 1–2 · sel/poivre/huile/zaatar au besoin",
        "S2 (×1,5) : patates douces 1,5 kg · oignon rouge 2 · jus de citron 3 c. à s. · huile olive 4½ c. à s. · cheddar 230 g · ail 5 · cumin 1½ c. à c. · œufs 12 · beurre 40 g · sriracha 1¼ c. à s. · coriandre 3 c. à s.",
        "S3 (×1,25) : oignons 3 · laurier 3 · pâte brisée 380 g · thym 10 · ricotta 150 g · feta 150 g · tomates cerises 9 · œufs 3 · crème 25 cl",
        "AC2 (R7 4→6) : tomates 11 · œufs 3 · thym 12",
        "AC1 : R2 œufs 11 · R7 tomates 11 · R7 œufs 3"
      ],
      scaling: scaling
    };
  }

  const api = {
    formatQuantity: formatQuantity,
    formatShoppingList: formatShoppingList,
    getFactor: getFactor,
    getShoppingTotals: getShoppingTotals,
    getStepIngredients: getStepIngredients,
    resolveStepText: resolveStepText,
    selfTest: selfTest
  };

  root.CuisineScale = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
