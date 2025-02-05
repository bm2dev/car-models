import { getMilliseconds } from '../get-miliseconds';

describe('getMilliseconds', () => {
	it('should convert seconds to milliseconds', () => {
		expect(getMilliseconds({ seconds: 10 })).toBe(10000);
	});

	it('should convert minutes to milliseconds', () => {
		expect(getMilliseconds({ minutes: 1 })).toBe(60000);
	});

	it('should convert hours to milliseconds', () => {
		expect(getMilliseconds({ hours: 1 })).toBe(3600000);
	});

	it('should throw an error if any time unit is negative', () => {
		expect(() => getMilliseconds({ seconds: -1 })).toThrow('Invalid time');
		expect(() => getMilliseconds({ minutes: -1 })).toThrow('Invalid time');
		expect(() => getMilliseconds({ hours: -1 })).toThrow('Invalid time');
	});
});
