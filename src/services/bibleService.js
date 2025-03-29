const BASE_URL = "https://bible-api.com";

// Versets de secours en cas d'indisponibilité de l'API
const fallbackVerses = {
  "John 3:16": {
    text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
    reference: "Jean 3:16",
    translation_name: "Version Louis Segond",
  },
  "Philippians 4:13": {
    text: "Je puis tout par celui qui me fortifie.",
    reference: "Philippiens 4:13",
    translation_name: "Version Louis Segond",
  },
  "Psalms 37:5": {
    text: "Recommande ton sort à l'Éternel, mets en lui ta confiance, et il agira.",
    reference: "Psaumes 37:5",
    translation_name: "Version Louis Segond",
  },
  "Psalms 23:1": {
    text: "L'Éternel est mon berger: je ne manquerai de rien.",
    reference: "Psaumes 23:1",
    translation_name: "Version Louis Segond",
  },
  "2 Corinthians 13:13": {
    text: "Que la grâce du Seigneur Jésus-Christ, l'amour de Dieu, et la communication du Saint-Esprit, soient avec vous tous!",
    reference: "2 Corinthiens 13:13",
    translation_name: "Version Louis Segond",
  },
  "Psalms 1:1-2": {
    text: "Heureux l'homme qui ne marche pas selon le conseil des méchants, qui ne s'arrête pas sur la voie des pécheurs, et qui ne s'assied pas en compagnie des moqueurs, mais qui trouve son plaisir dans la loi de l'Éternel.",
    reference: "Psaumes 1:1-2",
    translation_name: "Version Louis Segond",
  },
};

// Fonction pour nettoyer et formater la référence biblique
const formatReference = (reference) => {
  return reference
    .replace(/\s+/g, "+") // Remplace les espaces par des +
    .replace(/\++/g, "+") // Évite les + multiples
    .replace(/[^\w\d+:.-]/g, ""); // Supprime les caractères spéciaux sauf +, :, . et -
};

export const bibleService = {
  // Récupérer un verset spécifique
  async getVerse(reference) {
    try {
      // Vérifier d'abord si nous avons une version locale du verset
      if (fallbackVerses[reference]) {
        return fallbackVerses[reference];
      }

      const formattedRef = formatReference(reference);
      console.log("Fetching verse:", formattedRef);

      const response = await fetch(`${BASE_URL}/${formattedRef}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch verse: ${response.status}`);
      }

      const data = await response.json();
      return {
        text: data.text || "Verset non disponible",
        reference: data.reference || reference,
        translation_name: data.translation_name || "Version standard",
      };
    } catch (error) {
      console.error("Error fetching verse:", error);

      // En cas d'erreur, utiliser la version locale si disponible
      if (fallbackVerses[reference]) {
        console.log("Using fallback verse for:", reference);
        return fallbackVerses[reference];
      }

      // Sinon, retourner un message d'erreur
      return {
        text: "Verset temporairement indisponible",
        reference: reference,
        translation_name: "Version locale",
      };
    }
  },

  // Récupérer plusieurs versets pour les versets quotidiens
  async getDailyVerses(references) {
    try {
      // Utiliser Promise.allSettled au lieu de Promise.all pour gérer les échecs individuels
      const results = await Promise.allSettled(
        references.map((reference) => this.getVerse(reference))
      );

      // Filtrer et traiter les résultats
      return results
        .map((result, index) => {
          if (result.status === "fulfilled") {
            return result.value;
          } else {
            console.error(
              `Error fetching verse ${references[index]}:`,
              result.reason
            );
            return {
              text: "Verset temporairement indisponible",
              reference: references[index],
              translation_name: "Erreur",
            };
          }
        })
        .filter((verse) => verse !== null);
    } catch (error) {
      console.error("Error fetching daily verses:", error);
      throw new Error("Impossible de charger les versets quotidiens");
    }
  },
};
