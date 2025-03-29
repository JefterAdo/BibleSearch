import { GEMINI_API_KEY, GEMINI_MODEL, BIBLE_CONTEXT } from "../config/gemini";

class GeminiService {
  constructor() {
    this.apiKey = GEMINI_API_KEY;
    this.model = GEMINI_MODEL;
    this.baseUrl = "https://generativelanguage.googleapis.com/v1/models";
  }

  async generateBibleResponse(question) {
    try {
      const prompt = `${BIBLE_CONTEXT}\n\nQuestion: ${question}`;
      console.log("Envoi de la requête à Gemini avec la question:", question);

      const response = await fetch(
        `${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Erreur API Gemini:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });
        throw new Error(
          `Erreur API (${response.status}): ${
            errorData.error?.message || response.statusText
          }`
        );
      }

      const data = await response.json();

      if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
        console.error("Réponse API invalide:", data);
        throw new Error("Format de réponse invalide de l'API");
      }

      const answer = data.candidates[0].content.parts[0].text;
      console.log("Réponse reçue de Gemini:", answer);
      return answer;
    } catch (error) {
      console.error("Erreur détaillée:", error);
      if (error.message.includes("API")) {
        throw new Error(
          "Erreur de communication avec l'API Gemini. Veuillez réessayer."
        );
      } else {
        throw new Error(
          "Impossible de générer une réponse biblique. Veuillez réessayer plus tard."
        );
      }
    }
  }
}

export default new GeminiService();
