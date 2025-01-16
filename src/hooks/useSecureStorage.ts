import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

export function useSecureStorage<T>(keyName: string, defaultValue: T) {
	const [storedValue, setStoredValue] = useState<T>(defaultValue);

	useEffect(() => {
		const loadStoredValue = async () => {
			try {
				const item = await SecureStore.getItemAsync(keyName);
				if (item) {
					const parsedItem = JSON.parse(item);
					const currentTimestamp = Date.now();

					if (parsedItem.expiryTime && currentTimestamp >= parsedItem.expiryTime) {
						await SecureStore.deleteItemAsync(keyName);
					} else {
						setStoredValue(parsedItem.value);
					}
				}
			} catch (err) {
				console.error(err);
			}
		};

		loadStoredValue();
	}, [keyName]);

	const setValue = async (value: React.SetStateAction<T>, expiryDate?: Date) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			const stringValue = JSON.stringify({ value: valueToStore });

			if (expiryDate) {
				const expiryTimeInTimestamp = expiryDate.getTime();
				const valueWithExpiry = JSON.stringify({
					value: valueToStore,
					expiryTime: expiryTimeInTimestamp,
				});
				await SecureStore.setItemAsync(keyName, valueWithExpiry);
			} else {
				await SecureStore.setItemAsync(keyName, stringValue);
			}

			setStoredValue(valueToStore);
		} catch (error) {
			console.log(error);
		}
	};

	const removeValue = async () => {
		try {
			await SecureStore.deleteItemAsync(keyName);
			setStoredValue(defaultValue);
		} catch (error) {
			console.log(error);
		}
	};

	return [storedValue, setValue, removeValue] as const;
}
