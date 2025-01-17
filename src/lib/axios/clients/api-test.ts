import axios, { AxiosError } from 'axios';

export type ApiTestErrorType = AxiosError<{
	error: boolean;
	message: string;
}>;

export const apiTest = axios.create({
	baseURL: 'https://test-api-y04b.onrender.com',
});

apiTest.interceptors.response.use(
	(response) => {
		return response;
	},
	(error: ApiTestErrorType) => {
		console.error(error.response?.data.message || error.message);

		return Promise.reject(error);
	}
);

export const setApiTestToken = (token: string | null) => {
	apiTest.defaults.headers.common.Authorization = token ? `Bearer ${token}` : undefined;
};
