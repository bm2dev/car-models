import { ReactQueryProvider } from '@/lib/react-query/providers';
import { ThemeProvider } from '@/lib/rnr/providers';
import { render, RenderOptions } from '@testing-library/react-native';
import React, { ReactElement } from 'react';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<ReactQueryProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</ReactQueryProvider>
	);
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
	render(ui, { wrapper: AppProviders, ...options });

type UseJestMock<T extends (...args: any) => any> = jest.Mock<Partial<ReturnType<T>>>;

export * from '@testing-library/react-native';
export { customRender as render, UseJestMock };
