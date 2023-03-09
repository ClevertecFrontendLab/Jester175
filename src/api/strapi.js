import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://strapi.cleverland.by/',
});


const exceptionRequest = ['api/auth/local', 'api/auth/local/register', 'api/auth/forgot-password']

instance.interceptors.request.use(async (config) => {
    if (config.url && exceptionRequest.includes(config.url)) {
        return config
    }
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`

    return config;
})

export const Strapi = {

	getCategories(){
		return instance.get('/api/categories');
	},

	getBooks(){
		return instance.get('/api/books');
	},

	getBook(id){
        return instance.get(`/api/books/${id}`);
	},

	authRegistration(data){
        return instance.post('api/auth/local/register', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
	},

	authLogin(data) {
        return instance.post('api/auth/local', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
	},

    // eslint-disable-next-line class-methods-use-this
    authLoginOut(){
        localStorage.removeItem('jwt')
    }
}
