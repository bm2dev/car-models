import { ModelList } from '@/features/models/components/model-list';
import { render } from '@testing-library/react-native';
import React from 'react';

jest.mock('@/features/models/apis', () => ({
	useModels: jest.fn(),
}));

describe('ModelList', () => {
	it('should render a list of models', () => {
		const { getByText } = render(
			<ModelList
				models={[
					{ codigo: 1, nome: 'Model 1' },
					{ codigo: 2, nome: 'Model 2' },
				]}
			/>
		);
		expect(getByText('Model 1')).toBeTruthy();
		expect(getByText('Model 2')).toBeTruthy();
	});
});
