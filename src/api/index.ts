import axios from 'axios';

// Axios create
// You can make an api call by
// calling api variable. It will provide the url.
const api = axios.create({
	baseURL: 'http://localhost:80/',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;
