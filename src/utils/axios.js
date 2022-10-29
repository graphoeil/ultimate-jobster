// Imports
import axios from "axios";

// Custom instance of axios
// To avoid having to enter the base url for each request ,-)
const customAxiosFetch = axios.create({
	baseURL:'https://jobify-prod.herokuapp.com/api/v1/toolkit'
});

// Export
export default customAxiosFetch;