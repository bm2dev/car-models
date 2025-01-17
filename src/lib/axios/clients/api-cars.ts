import axios, { AxiosError } from 'axios';

export type ApiCarsErrorType = AxiosError<any>;

export const apiCars = axios.create({
	baseURL: 'https://parallelum.com.br/fipe/api/v1',
});

apiCars.interceptors.response.use(
	(response) => {
		return response;
	},
	(error: ApiCarsErrorType) => {
		console.error(error.response?.data.message || error.message);

		return Promise.reject(error);
	}
);
