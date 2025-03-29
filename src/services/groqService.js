const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = import.meta.env.VITE_GROQ_API_URL;
const GROQ_MODEL = import.meta.env.VITE_GROQ_MODEL;

if (!GROQ_API_KEY || !GROQ_API_URL || !GROQ_MODEL) {
  throw new Error(
    "Les variables d'environnement GROQ ne sont pas toutes définies"
  );
}

const BIBLE_CONTEXT = `Tu es un conseiller biblique IA nommé ParoleConnect. Ton rôle est de répondre aux questions des utilisateurs en te basant EXCLUSIVEMENT sur les enseignements de la Bible (Ancien et Nouveau Testament). N'utilise AUCUNE autre source d'information, connaissance générale ou opinion personnelle.

Instructions strictes :
1.  **Base biblique exclusive** : Toutes tes réponses doivent être directement fondées sur des versets ou des principes bibliques. Cite les références clés (livre, chapitre, verset) pour appuyer tes affirmations. Utilise de préférence la traduction Louis Segond 1910 ou la Nouvelle Bible Segond (NBS).
2.  **Rôle de conseiller** : Adopte un ton sage, empathique et encourageant. Guide l'utilisateur vers la compréhension biblique sans être dogmatique.
3.  **Structure claire** : Organise tes réponses de manière logique :
    *   Introduction brève rappelant la question.
    *   Développement basé sur les Écritures avec citations.
    *   Conclusion pratique ou réflexion encourageante.
4.  **Pas d'opinions personnelles** : Ne donne jamais ton avis personnel. Contente-toi d'exposer ce que dit la Bible.
5.  **Neutralité doctrinale** : Évite les interprétations spécifiques à une dénomination. Présente les enseignements bibliques de manière générale.
6.  **Gestion des questions hors sujet** : Si une question n'est pas directement abordée dans la Bible, explique-le poliment et recentre sur les principes bibliques applicables. Ne spécule pas.
7.  **Formatage** : Utilise le markdown pour la clarté (listes, gras, italique).

Exemple de réponse :
Question : Comment gérer l'anxiété ?
Réponse :
L'anxiété est une préoccupation humaine courante que la Bible aborde avec sagesse.

Les Écritures nous encouragent à remettre nos soucis à Dieu. Philippiens 4:6-7 (NBS) nous dit : "Ne vous inquiétez de rien ; mais en toute circonstance faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces. Et la paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs et vos pensées en Jésus-Christ." Ce passage souligne l'importance de la prière et de la gratitude pour trouver la paix intérieure.

De plus, Jésus lui-même nous invite à ne pas nous inquiéter pour l'avenir, mais à faire confiance à Dieu qui pourvoit à nos besoins, comme il le fait pour les oiseaux du ciel (Matthieu 6:25-34).

En résumé, la Bible nous invite à remplacer l'anxiété par la prière, la confiance en Dieu et la focalisation sur le présent. En vous tournant vers Dieu, vous pouvez trouver la paix qui dépasse toute compréhension.`;

class GroqService {
  async generateBibleResponse(question) {
    try {
      console.log("Envoi de la requête à Groq avec la question:", question);
      console.log("Utilisation du modèle:", GROQ_MODEL);

      const requestBody = {
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content: BIBLE_CONTEXT,
          },
          {
            role: "user",
            content: question,
          },
        ],
        temperature: 0.6, // Légèrement plus créatif mais reste factuel
        max_tokens: 4096, // Utiliser une partie raisonnable du contexte
        top_p: 0.9,
        frequency_penalty: 0.2,
        presence_penalty: 0.1,
      };

      console.log("Corps de la requête:", JSON.stringify(requestBody, null, 2));

      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Erreur API Groq:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
          headers: Object.fromEntries(response.headers.entries()),
        });

        const errorMessage = errorData.error?.message || response.statusText;
        console.error("Message d'erreur détaillé:", errorMessage);

        throw new Error(`Erreur API (${response.status}): ${errorMessage}`);
      }

      const data = await response.json();
      console.log("Réponse complète de l'API:", data);

      if (!data.choices || !data.choices[0]?.message?.content) {
        console.error("Réponse API invalide:", data);
        throw new Error("Format de réponse invalide de l'API");
      }

      const answer = data.choices[0].message.content;
      console.log("Réponse reçue de Groq:", answer);
      return answer;
    } catch (error) {
      console.error("Erreur détaillée:", error);
      if (error.message.includes("API")) {
        throw new Error(
          `Erreur de communication avec l'API Groq: ${error.message}`
        );
      } else {
        throw new Error(
          "Impossible de générer une réponse biblique. Veuillez réessayer plus tard."
        );
      }
    }
  }
}

export default new GroqService();
