export class Strapi {

	baseUrl = 'https://strapi.cleverland.by';

	getCategories = async () => {
		const response = await fetch(`${this.baseUrl}/api/categories`);
		const data = await response.json();

		return data;
	};

	getBooks = async () => {
		const response = await fetch(`${this.baseUrl}/api/books`);
		const data = await response.json();

		return data;
	};

	getBook = async (id) => {
		const response = await fetch(`${this.baseUrl}/api/books/${id}`);
		const data = await response.json();

		return data;
	};
}
