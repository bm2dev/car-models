import axios, { AxiosError } from 'axios';

export type TestApiErrorType = AxiosError<{
	error: boolean;
	message: string;
}>;

export const testApi = axios.create({
	baseURL: 'https://test-api-y04b.onrender.com',
});

testApi.interceptors.response.use(
	(response) => {
		return response;
	},
	(error: TestApiErrorType) => {
		console.error(error.response?.data.message || error.message);

		return Promise.reject(error);
	}
);

export const setTestApiToken = (token: string | null) => {
	testApi.defaults.headers.common.Authorization = token ? `Bearer ${token}` : undefined;
};
