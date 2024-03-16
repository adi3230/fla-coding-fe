import HTTP from "../utils/interceptor.js";

export default {
    async fetchProducts() {
        try {
            const response  = await HTTP.get('/products');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error; // Rethrow the error to handle it at the caller's level if needed
        }
    }
}