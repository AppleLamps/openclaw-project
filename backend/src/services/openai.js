import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const OpenAIService = {
  async generateImage(prompt) {
    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      });
      
      return response.data[0].url;
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  },

  async getEmbedding(text) {
    try {
      const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
        dimensions: 1536,
      });
      
      return response.data[0].embedding;
    } catch (error) {
      console.error('Error getting embedding:', error);
      throw error;
    }
  },

  async generatePromptFromTaste(longTerm, shortTerm, negative, intent) {
    // Build a prompt based on aesthetic memory
    const positiveElements = [
      ...longTerm.slice(0, 3),
      ...shortTerm.slice(0, 2)
    ].filter(Boolean);

    const avoidElements = negative.slice(0, 2);

    let prompt = '';

    if (intent === 'exploration') {
      prompt = `Create an artistic image exploring ${positiveElements.join(', ')}`;
    } else if (intent === 'refinement') {
      prompt = `Create a refined artistic image featuring ${positiveElements.join(' and ')}`;
    } else if (intent === 'divergence') {
      prompt = `Create an unconventional artistic image that contrasts with typical ${positiveElements[0] || 'aesthetic'}`;
    } else {
      prompt = `Create an artistic image with ${positiveElements.join(', ') || 'abstract beauty'}`;
    }

    if (avoidElements.length > 0) {
      prompt += `. Avoid ${avoidElements.join(' and ')}`;
    }

    return prompt;
  },
};
