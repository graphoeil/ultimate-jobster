// Imports
import axios from "axios";

// Custom instance of axios
// To avoid having to enter the base url for each request ,-)
const customAxiosFetch = axios.create({
	baseURL:'https://jobify-prod.herokuapp.com/api/v1/toolkit',
	// For local dev with back-end (node)
	// baseURL:'/api/v1'
});

// Export
export default customAxiosFetch;