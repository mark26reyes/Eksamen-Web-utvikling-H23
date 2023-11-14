class MediaService {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl;
  }

  async fetchF1Images() {
    try {
      const response = await fetch(`${this.apiBaseUrl}/f1/images`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.images;
    } catch (error) {
      console.error("Error fetching F1 images:", error);
      return [];
    }
  }

  // You can add more methods for different types of media or other functionalities
}

export default new MediaService("https://example-api.com");
