import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function useAsyncStorage<T>(keyName: string, defaultValue: T) {
	const [storedValue, setStoredValue] = useState<T>(defaultValue);

	useEffect(() => {
		const loadStoredValue = async () => {
			try {
				const item = await AsyncStorage.getItem(keyName);
				if (item) {
					const parsedItem = JSON.parse(item);
					const currentTimestamp = Date.now();

					if (parsedItem.expiryTime && currentTimestamp >= parsedItem.expiryTime) {
						await AsyncStorage.removeItem(keyName);
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
				await AsyncStorage.setItem(keyName, valueWithExpiry);
			} else {
				await AsyncStorage.setItem(keyName, stringValue);
			}

			setStoredValue(valueToStore);
		} catch (error) {
			console.log(error);
		}
	};

	const removeValue = async () => {
		try {
			await AsyncStorage.removeItem(keyName);
			setStoredValue(defaultValue);
		} catch (error) {
			console.log(error);
		}
	};

	return [storedValue, setValue, removeValue] as const;
}
