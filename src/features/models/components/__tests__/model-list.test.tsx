import { modelMocks } from '@/features/models/__mocks__/model-mocks';
import { useModels } from '@/features/models/apis';
import { ModelList, ModelListSmart } from '@/features/models/components/model-list';
import { render, UseJestMock } from '@/testing/test-utils';
import React from 'react';

jest.mock('@/features/models/apis');
const useModelsMock = useModels as UseJestMock<typeof useModels>;

const BRAND_CODIGO = '1';
describe('ModelListSmart', () => {
	it('should display loading indicator when loading', () => {
		useModelsMock.mockReturnValue({ isLoading: true });
		const { getByTestId } = render(<ModelListSmart brandCodigo={BRAND_CODIGO} />);

		expect(getByTestId('loading-indicator')).toBeTruthy();
	});

	it('should display error message when there is an error', async () => {
		useModelsMock.mockReturnValue({
			isLoading: false,
			error: { name: 'Error', message: 'Error message' },
		});
		const { getByTestId, findByTestId } = render(<ModelListSmart brandCodigo={BRAND_CODIGO} />);

		await findByTestId('error-message');

		expect(getByTestId('error-message')).toBeTruthy();
	});

	it('should display message when there are no models', async () => {
		useModelsMock.mockReturnValue({ data: { modelos: [] } });
		const { getByTestId, findByTestId } = render(<ModelListSmart brandCodigo={BRAND_CODIGO} />);

		await findByTestId('no-data-message');

		expect(getByTestId('no-data-message')).toBeTruthy();
	});

	it('should render a list of models when data is available', async () => {
		useModelsMock.mockReturnValue({
			data: {
				modelos: [modelMocks.model1, modelMocks.model2],
			},
		});
		const { getByText, findByText } = render(<ModelListSmart brandCodigo={BRAND_CODIGO} />);

		await findByText(modelMocks.model1.nome);

		expect(getByText(modelMocks.model1.nome)).toBeTruthy();
		expect(getByText(modelMocks.model2.nome)).toBeTruthy();
	});
});

describe('ModelList', () => {
	it('should render a list of models', () => {
		const { getByText } = render(<ModelList models={[modelMocks.model1, modelMocks.model2]} />);

		expect(getByText(modelMocks.model1.nome)).toBeTruthy();
		expect(getByText(modelMocks.model2.nome)).toBeTruthy();
	});
});
