/* recipes.js — R1–R7, Phase 2 nettoyé/validé.
   Ordre : R1 couscous | R2 chachouka | R3 parm | R4 risotto | R5 houmous | R6 mozzarella | R7 tarte
   Convention : dans step.text, {id} = quantité de cet ingrédient pour CETTE étape
   (override s'il y en a un, sinon la quantité de base). Jamais de nombre en dur. */
globalThis.RECIPES = [
   {
  "schemaVersion": 1,
  "id": "low-calorie-chicken-biryani",
  "title": "Low calorie chicken biryani",
  "source": "https://www.youtube.com/watch?v=-zVk6Z8MiDI",
  "sourceServingsLabel": "[À VÉRIFIER: aucun nombre de portions indiqué dans la source]",
  "language": "en",
  "baseServings": 1,
  "ingredients": [
    { "id": "rice", "name": "rice", "note": "[À VÉRIFIER: « washed rice, unwashed rice » — une seule sorte de riz (rincé ou non) ou les deux ? Aucune quantité donnée dans la source]" },
    { "id": "chicken", "name": "chicken", "note": "[À VÉRIFIER: le mot est répété (« chicken, chicken ») dans la transcription ; aucune quantité donnée]" },
    { "id": "salt", "name": "salt", "note": "[À VÉRIFIER: aucune quantité donnée dans la source]" },
    { "id": "pepper", "name": "pepper", "note": "[À VÉRIFIER: « pepper » désigne-t-il le poivre ou un poivron ? Aucune quantité donnée]" },
    { "id": "garlic-powder", "name": "garlic powder", "note": "[À VÉRIFIER: aucune quantité donnée dans la source]" },
    { "id": "turmeric", "name": "turmeric", "note": "[À VÉRIFIER: aucune quantité donnée dans la source]" },
    { "id": "paprika", "name": "paprika", "note": "[À VÉRIFIER: aucune quantité donnée dans la source]" },
    { "id": "chili-flakes", "name": "chili flakes", "note": "[À VÉRIFIER: aucune quantité donnée dans la source]" },
    { "id": "onion", "name": "onion", "note": "[À VÉRIFIER: le mot est répété (« onion, onion ») dans la transcription ; aucune quantité donnée]" },
    { "id": "red-pepper", "name": "red pepper", "note": "[À VÉRIFIER: poivron rouge ou piment rouge ? Aucune quantité donnée]" },
    { "id": "peas", "name": "peas", "note": "[À VÉRIFIER: le mot est répété (« peas, some peas ») dans la transcription ; aucune quantité donnée]" },
    { "id": "greek-yogurt", "name": "Greek yogurt", "note": "[À VÉRIFIER: transcription « Fat-ree Greek yogurt » = « fat-free Greek yogurt » ? Aucune quantité donnée]" },
    { "id": "coconut-milk", "name": "coconut milk", "note": "[À VÉRIFIER: aucune quantité donnée dans la source]" },
    { "id": "water", "name": "water", "note": "[À VÉRIFIER: aucune quantité donnée dans la source]" },
    { "id": "stock", "name": "stock", "note": "[À VÉRIFIER: type de bouillon non précisé ; aucune quantité donnée]" },
    { "id": "coriander", "name": "coriander", "note": "[À VÉRIFIER: « Pop of coriander lime » — garniture ajoutée à la fin ? Aucune quantité donnée]" },
    { "id": "lime", "name": "lime", "note": "[À VÉRIFIER: « Pop of coriander lime » — garniture ajoutée à la fin ? Aucune quantité donnée]" }
  ],
  "steps": [
    {
      "text": "Did you know if you had washed rice, unwashed rice, chicken, chicken, the seasonings, salt, pepper, garlic powder, turmeric, paprika, chili flakes.",
      "uses": ["rice", "chicken", "salt", "pepper", "garlic-powder", "turmeric", "paprika", "chili-flakes"]
    },
    {
      "text": "Let's add some spice, baby. Onion, onion, pepper, red pepper, peas, some peas.",
      "uses": ["onion", "red-pepper", "peas"]
    },
    {
      "text": "Fat-ree Greek yogurt. Greek yogurt like coconut milk. coconut milk and water.",
      "uses": ["greek-yogurt", "coconut-milk", "water"]
    },
    {
      "text": "We're leveling this one up with some stock. Then give it a mix.",
      "uses": ["stock"]
    },
    {
      "text": "All right, let's attempt to mix it all together.",
      "uses": []
    },
    {
      "text": "Then whack into an oven at 180 [À VÉRIFIER: 180 °C ou 180 °F ?] for 1 hour. Into the oven for 1 hour.",
      "uses": []
    },
    {
      "text": "Take it out and you get this delicious low calorie chicken biryani. This smells insane.",
      "uses": []
    },
    {
      "text": "Pop of coriander lime.",
      "uses": ["coriander", "lime"]
    },
    {
      "text": "This is just over 500 calories and 50 g of protein.",
      "uses": []
    }
  ]
},
{
  schemaVersion: 1, id: "mon-couscous-ultime", title: "Mon couscous « ultime »",
  source: "livre (Ottolenghi, éd. française)", sourceServingsLabel: "Pour 4 personnes ou plus",
  language: "fr", baseServings: 4,
  ingredients: [
    { id: "carottes", name: "carottes moyennes", qty: 2, unit: "piece", prep: "épluchées et coupées en tronçons de 2 cm" },
    { id: "panais", name: "panais moyens", qty: 2, unit: "piece", prep: "pelés et coupés en morceaux de 2 cm" },
    { id: "echalotes", name: "échalotes", qty: 8, unit: "piece", prep: "pelées" },
    { id: "cannelle", name: "bâtons de cannelle", qty: 2, unit: "piece" },
    { id: "badiane", name: "étoiles de badiane", qty: 4, unit: "piece" },
    { id: "laurier", name: "feuilles de laurier", qty: 3, unit: "piece" },
    { id: "gingembre-moulu", name: "gingembre moulu", qty: 0.5, unit: "cac" },
    { id: "curcuma-moulu", name: "curcuma moulu", qty: 0.25, unit: "cac" },
    { id: "paprika-fort", name: "paprika fort", qty: 0.25, unit: "cac" },
    { id: "flocons-piment", name: "flocons de piment", qty: 0.25, unit: "cac" },
    { id: "potiron-courge", name: "chair de potiron ou de courge musquée", qty: 300, unit: "g", prep: "coupée en cubes de 2 cm de côté" },
    { id: "abricots-secs", name: "abricots secs", qty: 75, unit: "g", prep: "grossièrement hachés" },
    { id: "pois-chiches", name: "pois chiches", qty: 200, unit: "g", note: "cuits maison ou en conserve" },
    { id: "liquide-cuisson", name: "liquide de cuisson", qty: 35, unit: "cl", note: "à compléter au besoin avec de l'eau" },
    { id: "eau", name: "eau", note: "un peu, au besoin" },
    { id: "semoule-couscous", name: "semoule de couscous", qty: 170, unit: "g" },
    { id: "safran", name: "stigmates de safran", qty: 1, unit: "pincee", note: "grosse" },
    { id: "bouillon-legumes", name: "bouillon de légumes", qty: 26, unit: "cl", note: "bouillant" },
    { id: "beurre", name: "beurre", qty: 20, unit: "g", prep: "en morceaux" },
    { id: "harissa", name: "harissa", qty: 25, unit: "g" },
    { id: "citron-confit", name: "écorce de citron confit", qty: 25, unit: "g", prep: "hachée" },
    { id: "coriandre", name: "feuilles de coriandre", qty: 30, unit: "g" },
    { id: "huile-olive", name: "huile d'olive", note: "dérivé des étapes (4 + 1 c. à s.)" },
    { id: "sel", name: "sel", note: "dérivé des étapes (¾ + ½ c. à c.)" }
  ],
  steps: [
    { text: "Préchauffez le four à 190 °C (th. 6-7).", uses: [] },
    { text: "Mettez les carottes, les panais et les échalotes dans un grand plat allant au four. Ajoutez les bâtons de cannelle, les étoiles de badiane, les feuilles de laurier, {huile-olive} d'huile, {sel} de sel et toutes les autres épices. Mélangez bien, enfournez et laissez cuire pendant 15 min.",
      uses: ["carottes","panais","echalotes","cannelle","badiane","laurier",{id:"huile-olive",qty:4,unit:"cas"},{id:"sel",qty:0.75,unit:"cac"},"gingembre-moulu","curcuma-moulu","paprika-fort","flocons-piment"] },
    { text: "Ajoutez les cubes de potiron ou de courge dans le plat, remuez et remettez au four. Prolongez la cuisson d'environ 35 min ; les légumes doivent être juste tendres, sans s'écraser. Incorporez les abricots secs et les pois chiches avec le liquide de cuisson, au besoin, complétez avec un peu d'eau. Remettez le plat au four pour 10 min.",
      uses: ["potiron-courge","abricots-secs","pois-chiches","liquide-cuisson","eau"] },
    { text: "Dès que vous avez mis le plat au four, mettez le couscous dans un saladier résistant à la chaleur, ajoutez {huile-olive} d'huile d'olive, le safran et {sel} de sel. Versez le bouillon, couvrez avec du film alimentaire et laissez reposer pendant 10 min. Ajoutez le beurre et aérez le couscous avec une fourchette jusqu'à ce que le beurre soit fondu. Couvrez de nouveau et réservez dans un endroit chaud.",
      uses: ["semoule-couscous",{id:"huile-olive",qty:1,unit:"cas"},"safran",{id:"sel",qty:0.5,unit:"cac"},"bouillon-legumes","beurre"] },
    { text: "Répartissez le couscous dans des assiettes creuses ou dans des bols. Incorporez aux légumes la harissa et le citron confit, puis goûtez pour saler au besoin un peu plus. Ajoutez une belle louche de légumes dans chaque bol et terminez par les feuilles de coriandre.",
      uses: ["semoule-couscous","harissa","citron-confit","sel","carottes","panais","echalotes","potiron-courge","abricots-secs","pois-chiches","coriandre"] }
  ]
},
{
  schemaVersion: 1, id: "chachouka-patate-douce-beurre-sriracha-pickles-oignons",
  title: "Chachouka de patate douce, beurre au sriracha et pickles d'oignons",
  source: "livre, page 84 (Ottolenghi)", sourceServingsLabel: "Pour 4 personnes",
  language: "fr", baseServings: 4,
  ingredients: [
    { id: "patates-douces", name: "patates douces", qty: 1, unit: "kg", prep: "avec la peau et nettoyées" },
    { id: "oignon-rouge", name: "petit oignon rouge", qty: 1, unit: "piece", prep: "en fines rondelles", note: "100 g" },
    { id: "jus-citron", name: "jus de citron", qty: 2, unit: "cas" },
    { id: "huile-olive", name: "huile d'olive", qty: 3, unit: "cas" },
    { id: "cheddar", name: "cheddar vieux", qty: 150, unit: "g", prep: "râpé grossièrement" },
    { id: "ail", name: "gousses d'ail", qty: 3, unit: "piece", prep: "écrasées" },
    { id: "cumin", name: "graines de cumin", qty: 1, unit: "cac", prep: "pilées dans un mortier" },
    { id: "oeufs", name: "œufs moyens", qty: 8, unit: "piece" },
    { id: "beurre", name: "beurre doux", qty: 25, unit: "g" },
    { id: "sriracha", name: "sriracha", qty: 0.75, unit: "cas" },
    { id: "coriandre", name: "feuilles de coriandre fraîche", qty: 2, unit: "cas", prep: "avec quelques tiges" },
    { id: "sel", name: "sel", note: "et poivre noir ; dérivé des étapes" }
  ],
  steps: [
    { text: "Préchauffez le four à 200 °C. Piquez les patates douces avec une fourchette (8-10 fois) et placez-les sur une plaque de cuisson tapissée de papier sulfurisé. Enfournez pour 45-50 min, jusqu'à ce qu'elles soient cuites. Laissez-les refroidir. Baissez le four à 180 °C.",
      uses: ["patates-douces"] },
    { text: "Pendant ce temps, mélangez dans un bol l'oignon, {jus-citron} de jus de citron et {sel} de sel. Laissez mariner.",
      uses: ["oignon-rouge",{id:"jus-citron",qty:1,unit:"cas"},{id:"sel",qty:1,unit:"pincee"}] },
    { text: "Pelez les patates douces et coupez la chair en cubes de 4 cm. Réservez ces derniers dans un saladier. Mettez les peaux de patate douce sur la plaque, versez {huile-olive} d'huile, ajoutez {sel} de sel et du poivre, puis mélangez. Enfournez pour 8 min, jusqu'à ce que les peaux soient croustillantes. Laissez-les refroidir : elles seront encore plus croquantes.",
      uses: ["patates-douces",{id:"huile-olive",qty:1,unit:"cas"},{id:"sel",qty:0.25,unit:"cac"}] },
    { text: "Avec une fourchette, écrasez la chair des patates douces en purée lisse, puis incorporez le cheddar, l'ail, le cumin, {huile-olive} d'huile, le jus de citron restant, {sel} de sel et beaucoup de poivre.",
      uses: ["patates-douces","cheddar","ail","cumin",{id:"huile-olive",qty:1,unit:"cas"},"jus-citron",{id:"sel",qty:1,unit:"cac"}] },
    { text: "Faites chauffer le reste d'huile dans une grande poêle en l'étalant bien pour en recouvrir le fond. Versez la purée dans la poêle, en l'étalant avec une cuillère, puis laissez cuire pendant environ 7 min à feu moyen-vif, jusqu'à ce que la base commence à dorer. Baissez à feu moyen, puis creusez {oeufs} nids avec une cuillère avant de casser 1 œuf dans chaque nid. Salez et poivrez, couvrez et laissez cuire pendant 4-5 min, jusqu'à ce que les blancs soient pris (les jaunes sont encore liquides).",
      uses: ["huile-olive","oeufs","sel"] },
    { text: "Pendant que les œufs cuisent, mettez le beurre et le sriracha dans une petite casserole, puis faites fondre le beurre à feu moyen, en fouettant sans cesse pour former une émulsion. Retirez du feu avant que le beurre ne commence à bouillir.",
      uses: ["beurre","sriracha"] },
    { text: "Étalez ce beurre aromatique sur les œufs, puis garnissez la chachouka avec la moitié des peaux croustillantes et des pickles d'oignon. Décorez de feuilles de coriandre et servez aussitôt, avec le reste des peaux croustillantes et des pickles d'oignon.",
      uses: ["beurre","oeufs","coriandre"] }
  ]
},
{
  schemaVersion: 1, id: "aubergine-parmigiana", title: "Aubergine a la parmigiana",
  source: "carte OneNote (texte fourni)", sourceServingsLabel: "2-3 people",
  language: "en", baseServings: 2,
  ingredients: [
    { id: "aubergines", name: "big aubergines", qty: 2, unit: "piece", note: "2 big aubergines does 2-3 people" },
    { id: "olive-oil", name: "olive oil", note: "loads; be generous" },
    { id: "onion", name: "large onion", qty: 1, unit: "piece", prep: "finely chopped" },
    { id: "garlic", name: "garlic cloves", qty: 2, unit: "piece", prep: "chopped" },
    { id: "chili-flakes", name: "chili flakes", note: "a few" },
    { id: "cherry-tomatoes", name: "cherry tomatoes", qty: 600, qtyMax: 1000, unit: "g", note: "derived from steps" },
    { id: "tinned-tomatoes", name: "tinned tomatoes", note: "a few tins if it doesn't look like enough" },
    { id: "salt", name: "salt", note: "some" },
    { id: "parmigiana", name: "parmigiana", note: "some" },
    { id: "mozzarella", name: "mozzarella", note: "some", optional: true },
    { id: "basil-leaves", name: "basil leaves", note: "some" }
  ],
  steps: [
    { text: "Slice the required aubergines into slices 0.5-1cm thick, cover with loads of olive oil and put in the oven until cooked, 40 mins or so. Cook them for long enough until they are not spongy anymore. And be generous with the olive oil.",
      uses: ["aubergines","olive-oil"] },
    { text: "Finely chop a large onion and fry in loads of olive oil in a large saucepan. Add {garlic} cloves of chopped garlic and a few chili flakes and fry until translucent.",
      uses: ["onion","olive-oil","garlic","chili-flakes"] },
    { text: "Add about {cherry-tomatoes} of cherry tomatoes (no need to chop). Put a lid on the pan. Cook them down until they have broken up. Add a few tins of tomatoes if it doesn't look like enough. Can also just only use tinned tomatoes if you want to make it a bit quicker. Add some salt etc. Want to cook it down into quite a thick sauce.",
      uses: ["cherry-tomatoes","tinned-tomatoes","salt"] },
    { text: "When sauce and aubergines are done, you need to layer them with cheese in a baking dish. Molly uses parmigiana and mozzarella, I tend to only use parmigiana. Put one layer of aubergines at the bottom of the dish, cover with a layer of sauce, add some basil leaves and some cheese. Then repeat with another layer of aubergines, sauce and cheese. Bake in the oven until the cheese is crisping up a bit.",
      uses: ["aubergines","parmigiana","mozzarella","basil-leaves","cherry-tomatoes","tinned-tomatoes","onion","garlic","chili-flakes","olive-oil","salt"] }
  ]
},
{
  schemaVersion: 1, id: "risotto-orge-feta-marinee", title: "Risotto d'orge à la feta marinée",
  source: "livre (Ottolenghi)", sourceServingsLabel: "POUR 4 PERSONNES",
  language: "fr", baseServings: 4,
  ingredients: [
    { id: "orge-perle", name: "orge perlé", qty: 200, unit: "g" },
    { id: "beurre", name: "beurre doux", qty: 30, unit: "g" },
    { id: "huile-olive", name: "huile d'olive", qty: 9, unit: "cl" },
    { id: "celeri", name: "petites branches de céleri", qty: 2, unit: "piece", prep: "en dés de 5 mm" },
    { id: "echalotes", name: "petites échalotes", qty: 2, unit: "piece", prep: "en dés de 5 mm" },
    { id: "ail", name: "gousses d'ail", qty: 4, unit: "piece", prep: "en dés de 2 mm" },
    { id: "thym", name: "brins de thym", qty: 4, unit: "piece" },
    { id: "paprika-fume", name: "paprika fumé", qty: 0.5, unit: "cac" },
    { id: "laurier", name: "feuille de laurier", qty: 1, unit: "piece" },
    { id: "zeste-citron", name: "bandes de zeste de citron", qty: 4, unit: "piece" },
    { id: "flocons-piment", name: "flocons de piment", qty: 0.25, unit: "cac" },
    { id: "tomates", name: "tomates en morceaux en conserve", qty: 400, unit: "g" },
    { id: "bouillon-legumes", name: "bouillon de légumes", qty: 70, unit: "cl" },
    { id: "passata", name: "passata", qty: 30, unit: "cl" },
    { id: "cumin", name: "graines de cumin", qty: 1, unit: "cas" },
    { id: "feta", name: "feta", qty: 300, unit: "g", prep: "en gros morceaux de 2 cm" },
    { id: "origan", name: "feuilles d'origan frais", qty: 1, unit: "cas" },
    { id: "sel", name: "sel", note: "dérivé des étapes (½ c. à s.)" }
  ],
  steps: [
    { text: "Rincez bien l'orge perlé sous l'eau froide et laissez-le égoutter. Faites fondre le beurre et {huile-olive} d'huile d'olive dans une très grande poêle et mettez-y le céleri, l'échalote et l'ail à feu doux pendant 5 min environ, jusqu'à ce qu'ils soient tendres. Ajoutez l'orge, le thym, le paprika, la feuille de laurier, le zeste de citron, les flocons de piment, les tomates, le bouillon, la passata et {sel} de sel. Mélangez. Portez à ébullition, puis baissez le feu et laissez cuire 45 min à tout petit feu, en remuant fréquemment afin que le risotto n'attache pas au fond de la poêle. Une fois prêt, l'orge doit être tendre et la majeure partie du liquide doit avoir été absorbée.",
      uses: ["orge-perle","beurre",{id:"huile-olive",qty:2,unit:"cas"},"celeri","echalotes","ail","thym","paprika-fume","laurier","zeste-citron","flocons-piment","tomates","bouillon-legumes","passata",{id:"sel",qty:0.5,unit:"cas"}] },
    { text: "Pendant ce temps, faites griller les graines de cumin dans une poêle sèche pendant 2 ou 3 min. Ensuite, écrasez-les légèrement en gardant quelques graines entières. Mélangez-les délicatement à la feta avec le reste d'huile d'olive.",
      uses: ["cumin","feta","huile-olive"] },
    { text: "Une fois le risotto prêt, vérifiez l'assaisonnement, puis répartissez-le dans quatre assiettes creuses. Garnissez de feta marinée avec son huile et de quelques feuilles d'origan.",
      uses: ["orge-perle","feta","huile-olive","origan","sel"] }
  ]
},
{
  schemaVersion: 1, id: "hummus-pois-chiches-tahin", title: "Hummus de pois chiches au tahin",
  source: "carte OneNote (texte fourni)", sourceServingsLabel: "non précisé dans la source (base choisie : 6)",
  language: "fr", baseServings: 6,
  ingredients: [
    { id: "eau-glacee", name: "eau glacée", qty: 10, unit: "cl", note: "ne pas l'oublier au congèle !" },
    { id: "ail", name: "gousses d'ail", qty: 4, unit: "piece", prep: "épluchées" },
    { id: "citrons", name: "citrons", qty: 1, qtyMax: 2, unit: "piece", note: "pour le jus" },
    { id: "pois-chiches", name: "pois chiches humides", qty: 600, unit: "g", note: "environ" },
    { id: "jus-pois-chiches", name: "jus de pois chiches", qty: 10, unit: "cl", note: "au feeling" },
    { id: "tahin", name: "tahin", qty: 250, unit: "g" },
    { id: "huile-olive", name: "huile d'olive" },
    { id: "zaatar", name: "zaatar" },
    { id: "huile-sesame", name: "huile de sésame", optional: true },
    { id: "basilic", name: "basilic", optional: true },
    { id: "sel", name: "sel", note: "au goût" },
    { id: "poivre", name: "poivre", note: "au goût" }
  ],
  steps: [
    { text: "Retirer un maximum de peaux des pois chiches en les frottant entre les mains dans un grand saladier d'eau. Vider l'eau avec les peaux mais sans les pois chiches. Recommencer 2 ou 3 fois.",
      uses: ["pois-chiches"] },
    { text: "Dans un mixeur, réduire les pois chiches, le tahin et l'ail en pâte.",
      uses: ["pois-chiches","tahin","ail"] },
    { text: "Ajouter la moitié du jus de citron, la moitié de l'eau, du sel et du poivre, un peu d'huile d'olive et mixer jusqu'à une consistance homogène.",
      uses: ["citrons","eau-glacee","sel","poivre","huile-olive"] },
    { text: "Selon le goût, ajouter du sel, le basilic légèrement déchiré, de l'huile d'olive et/ou du jus de citron.",
      uses: ["sel","basilic","huile-olive","citrons"] },
    { text: "Une fois le goût souhaité atteint, ajouter de l'eau et mixer 5 min, si on recherche une texture plus douce.",
      uses: ["eau-glacee"] },
    { text: "Mettre en plat avec du zaatar et un trait d'huile d'olive.",
      uses: ["zaatar","huile-olive"] }
  ]
},
{
  schemaVersion: 1, id: "mozzarella-agrumes-graines-coriandre-torrefiees",
  title: "Mozzarella et agrumes avec graines de coriandre torréfiées",
  source: "livre, page 436", sourceServingsLabel: "POUR 4 PERSONNES",
  language: "fr", baseServings: 4,
  ingredients: [
    { id: "graines-coriandre", name: "graines de coriandre", qty: 1, unit: "cas" },
    { id: "agrumes", name: "clémentines ou oranges sanguines", qty: 4, unit: "piece" },
    { id: "mozzarella", name: "boules de mozzarella di Bufala", qty: 2, unit: "piece", note: "environ 250 g" },
    { id: "creme-fraiche", name: "crème fraîche", qty: 2, unit: "cas" },
    { id: "grenade", name: "grenade", qty: 0.5, unit: "piece", prep: "graines seulement" },
    { id: "huile-olive", name: "huile d'olive vierge extra", qty: 2, unit: "cas" },
    { id: "sel", name: "sel" },
    { id: "poivre", name: "poivre" },
    { id: "pain", name: "bon pain", optional: true },
    { id: "feuilles-salade", name: "feuilles de salade", qty: 4, unit: "poignee", optional: true },
    { id: "jus-citron", name: "jus de citron", optional: true },
    { id: "huile", name: "huile", optional: true },
    { id: "sel-service", name: "sel", note: "bloc « pour servir »", optional: true },
    { id: "poivre-service", name: "poivre", note: "bloc « pour servir »", optional: true }
  ],
  steps: [
    { text: "Faites torréfier les graines de coriandre dans une poêle sèche jusqu'à ce qu'elles dégagent une odeur très parfumée et qu'elles prennent une teinte brun foncé. Écrasez-les à l'aide d'un pilon et d'un mortier ou d'un moulin à épices jusqu'à obtenir une poudre fine.",
      uses: ["graines-coriandre"] },
    { text: "Ensuite, à l'aide d'un couteau bien aiguisé, coupez une extrémité de la clémentine de manière qu'elle soit stable sur la planche à découper, puis enlevez la peau et le zeste – il ne doit plus y avoir de blanc visible. Coupez-la en fines rondelles. Répétez l'opération avec les 3 autres clémentines.",
      uses: ["agrumes"] },
    { text: "Déchirez les mozzarellas en gros morceaux, répartissez-les dans 4 assiettes et recouvrez-les de crème fraîche. Assaisonnez bien, puis ajoutez {graines-coriandre} de graines de coriandre torréfiées. Déposez les tranches de clémentine sur les assiettes et ajoutez les graines de grenade. Arrosez de {huile-olive} d'huile d'olive et servez avec du bon pain et des feuilles de salade assaisonnées de jus de citron et d'huile.",
      uses: ["mozzarella","creme-fraiche","sel","poivre",{id:"graines-coriandre",qty:1,unit:"pincee"},"agrumes","grenade",{id:"huile-olive",qty:1,unit:"filet"},"pain","feuilles-salade","jus-citron","huile","sel-service","poivre-service"] }
  ]
},
{
  schemaVersion: 1, id: "tarte-aux-legumes-grilles", title: "Tarte aux légumes grillés",
  source: "livre, page 84 (Poivrons et piments doux)", sourceServingsLabel: "Pour 4 à 6 personnes",
  language: "fr", baseServings: 4,
  ingredients: [
    { id: "poivron-rouge", name: "poivron rouge", qty: 1, unit: "piece" },
    { id: "poivron-jaune", name: "poivron jaune", qty: 1, unit: "piece" },
    { id: "aubergine", name: "aubergine moyenne", qty: 1, unit: "piece", prep: "coupée en morceaux de 4 cm" },
    { id: "patate-douce", name: "petite patate douce", qty: 1, unit: "piece", prep: "épluchée et coupée en cubes de 3 cm" },
    { id: "courgette", name: "petite courgette", qty: 1, unit: "piece", prep: "en cubes de 3 cm" },
    { id: "oignons", name: "oignons moyens", qty: 2, unit: "piece", prep: "émincés" },
    { id: "laurier", name: "feuilles de laurier", qty: 2, unit: "piece" },
    { id: "pate-brisee", name: "pâte brisée", qty: 300, unit: "g" },
    { id: "thym", name: "brins de thym", qty: 8, unit: "piece" },
    { id: "ricotta", name: "ricotta", qty: 120, unit: "g" },
    { id: "feta", name: "feta", qty: 120, unit: "g" },
    { id: "tomates-cerises", name: "tomates cerises", qty: 7, unit: "piece", prep: "coupées en deux" },
    { id: "oeufs", name: "œufs fermiers moyens", qty: 2, unit: "piece" },
    { id: "creme", name: "crème double ou crème d'Isigny", qty: 20, unit: "cl", note: "40 % MG" },
    { id: "huile-olive", name: "huile d'olive", note: "dérivé des étapes (4 + 2 c. à s.) + un filet et un peu pour graisser le moule" },
    { id: "sel", name: "sel" },
    { id: "poivre-noir", name: "poivre noir" },
    { id: "haricots-secs", name: "haricots secs", note: "pour la cuisson à blanc, à réutiliser" }
  ],
  steps: [
    { text: "Préchauffez le four à 230 °C (th. 7-8). Avec un petit couteau, retirez le pédoncule des poivrons et grattez l'intérieur pour enlever les graines. Mettez les poivrons dans un plat allant au four, arrosez d'un filet d'huile et glissez le plat sur une grille, en haut du four. Mélangez les aubergines avec {huile-olive} d'huile d'olive, un peu de sel et de poivre. Étalez-les dans un grand plat de cuisson et enfournez-les sur une grille, en dessous des poivrons. Au bout de 12 min, ajoutez les morceaux de patate douce et remuez délicatement. Faites de même avec la courgette 12 min plus tard, en comptant cette fois de 10 à 12 min de cuisson. À ce stade, les poivrons doivent être bien grillés et les autres légumes cuits à point. Sortez les deux plats du four et baissez la température à 160 °C (th. 5-6). Couvrez les poivrons d'une feuille de papier d'aluminium et laissez-les refroidir, puis pelez-les et coupez-les en lanières.",
      uses: ["poivron-rouge","poivron-jaune","aubergine","patate-douce","courgette",{id:"huile-olive",qty:4,unit:"cas"},"sel","poivre-noir"] },
    { text: "Pendant que les légumes rôtissent, faites chauffer {huile-olive} d'huile d'olive dans une poêle sur feu moyen et faites-y revenir les oignons avec le laurier et un peu de sel pendant 25 min, en remuant de temps en temps. Quand ils sont bien colorés et fondants, retirez la poêle du feu et jetez les feuilles de laurier.",
      uses: [{id:"huile-olive",qty:2,unit:"cas"},"oignons","laurier","sel"] },
    { text: "Graissez un moule à tarte à fond amovible de 22 cm de diamètre. Étalez la pâte sur 3 mm d'épaisseur et formez un disque assez grand pour déborder un peu du haut du moule. Mettez la pâte en place dans le moule, en la laissant déborder à l'extérieur, posez au fond un disque de papier sulfurisé et couvrez de haricots secs. Faites cuire la pâte à blanc pendant 30 min. Retirez les haricots et le papier sulfurisé, puis remettez la pâte pour 10 à 15 min dans le four pour qu'elle dore. Sortez-la du four et laissez-la refroidir un peu.",
      uses: ["pate-brisee","huile-olive","haricots-secs"] },
    { text: "Répartissez uniformément, sur le fond de tarte, les oignons, puis les légumes grillés. Parsemez avec la moitié du thym effeuillé, puis garnissez avec la feta et la ricotta avant de disposer les tomates, face coupée vers le haut.",
      uses: ["oignons","poivron-rouge","poivron-jaune","aubergine","patate-douce","courgette","thym","feta","ricotta","tomates-cerises"] },
    { text: "Fouettez les œufs et la crème avec un peu de sel et de poivre. Versez délicatement ce mélange sur les légumes sans recouvrir complètement les tomates et les morceaux de fromage. Saupoudrez avec le reste du thym. Enfournez pour 35 à 45 min, jusqu'à ce que l'ensemble soit cuit et doré. Sortez la tarte et laissez-la reposer pendant au moins 10 min avant de casser l'excédent de pâte. Démoulez et servez.",
      uses: ["oeufs","creme","sel","poivre-noir","poivron-rouge","poivron-jaune","aubergine","patate-douce","courgette","feta","ricotta","tomates-cerises","thym","pate-brisee"] }
  ]
}
];
