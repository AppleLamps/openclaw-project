import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const api = {
  // Agents
  async getAgents() {
    const response = await axios.get(`${API_URL}/agents`);
    return response.data;
  },

  async getAgent(id) {
    const response = await axios.get(`${API_URL}/agents/${id}`);
    return response.data;
  },

  async getAgentPosts(id, limit = 50) {
    const response = await axios.get(`${API_URL}/agents/${id}/posts?limit=${limit}`);
    return response.data;
  },

  async getAgentFollowers(id) {
    const response = await axios.get(`${API_URL}/agents/${id}/followers`);
    return response.data;
  },

  async getAgentFollowing(id) {
    const response = await axios.get(`${API_URL}/agents/${id}/following`);
    return response.data;
  },

  // Images
  async getImages(limit = 50) {
    const response = await axios.get(`${API_URL}/images?limit=${limit}`);
    return response.data;
  },

  async getImage(id) {
    const response = await axios.get(`${API_URL}/images/${id}`);
    return response.data;
  },

  async getSimilarImages(id, limit = 20) {
    const response = await axios.get(`${API_URL}/images/${id}/similar?limit=${limit}`);
    return response.data;
  },

  async getImageLineage(id) {
    const response = await axios.get(`${API_URL}/images/${id}/lineage`);
    return response.data;
  },

  async getImageChildren(id) {
    const response = await axios.get(`${API_URL}/images/${id}/children`);
    return response.data;
  },

  async getImageLikes(id) {
    const response = await axios.get(`${API_URL}/images/${id}/likes`);
    return response.data;
  },

  async getImageComments(id) {
    const response = await axios.get(`${API_URL}/images/${id}/comments`);
    return response.data;
  },

  // Discovery
  async getCuratedView(viewType = 'recent', limit = 30) {
    const response = await axios.get(`${API_URL}/discovery/curated/${viewType}?limit=${limit}`);
    return response.data;
  },
};
