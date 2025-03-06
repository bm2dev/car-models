import { brandMocks } from '@/features/brands/__mocks__/brand-mocks';
import { useBrands } from '@/features/brands/apis';
import { BrandItemList, BrandList, BrandListSmart } from '@/features/brands/components/brand-list';
import { fireEvent, render, UseJestMock } from '@/testing/test-utils';
import { useRouter } from 'expo-router';
import React from 'react';

jest.mock('expo-router');
jest.mock('@/features/brands/apis');

const useRouterMock = useRouter as UseJestMock<typeof useRouter>;
const useBrandsMock = useBrands as UseJestMock<typeof useBrands>;

describe('BrandListSmart', () => {
	it('should display loading indicator when loading', () => {
		useBrandsMock.mockReturnValue({ isLoading: true });
		const { getByTestId } = render(<BrandListSmart />);

		expect(getByTestId('loading-indicator')).toBeTruthy();
	});

	it('should display error message when there is an error', async () => {
		useBrandsMock.mockReturnValue({
			isLoading: false,
			error: { name: 'Error', message: 'Error message' },
		});
		const { getByTestId, findByTestId } = render(<BrandListSmart />);

		await findByTestId('error-message');

		expect(getByTestId('error-message')).toBeTruthy();
	});

	it('should display message when there are no brands', async () => {
		useBrandsMock.mockReturnValue({ data: [] });
		const { getByTestId, findByTestId } = render(<BrandListSmart />);

		await findByTestId('no-data-message');

		expect(getByTestId('no-data-message')).toBeTruthy();
	});

	it('should render a list of brands when data is available', async () => {
		useBrandsMock.mockReturnValue({
			isLoading: false,
			data: [brandMocks.brand1, brandMocks.brand2],
			error: null,
		});
		const { getByText, findByText } = render(<BrandListSmart />);

		await findByText(brandMocks.brand1.nome);

		expect(getByText(brandMocks.brand1.nome)).toBeTruthy();
		expect(getByText(brandMocks.brand2.nome)).toBeTruthy();
	});
});

describe('BrandList', () => {
	it('should render a list of brands', () => {
		const { getByText } = render(<BrandList brands={[brandMocks.brand1, brandMocks.brand2]} />);

		expect(getByText(brandMocks.brand1.nome)).toBeTruthy();
		expect(getByText(brandMocks.brand2.nome)).toBeTruthy();
	});
});

describe('BrandItemList', () => {
	it('should navigate to the correct route when pressed', () => {
		const pushMock = jest.fn();
		useRouterMock.mockReturnValue({ push: pushMock });

		const { getByText } = render(<BrandItemList brand={brandMocks.brand1} />);

		const brand1 = getByText(brandMocks.brand1.nome);

		fireEvent.press(brand1);

		expect(pushMock).toHaveBeenCalledWith(`/(auth)/model/${brandMocks.brand1.codigo}`);
	});
});
