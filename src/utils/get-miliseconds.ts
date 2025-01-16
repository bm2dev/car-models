export interface GetMillisecondsProps {
	seconds?: number;
	minutes?: number;
	hours?: number;
}

/**
 * Converts time in hours, minutes, and seconds to milliseconds.
 *
 * This function takes an object with optional hours, minutes, and seconds properties,
 * and converts the time into its equivalent in milliseconds. If multiple time units
 * are provided, only the smallest unit (that is not zero) will be considered for the
 * conversion. If all parameters are omitted or set to zero, the function returns 0.
 *
 * Note: If multiple time units are provided, e.g. `{ seconds: 30, minutes: 1 }`,
 * only the smallest non-zero unit (in this case, seconds) will be considered.
 *
 * @example
 * getMilliseconds({ seconds: 10 }) // 10000
 * getMilliseconds({ minutes: 1 }) // 60000
 * getMilliseconds({ hours: 1 }) // 3600000
 * getMilliseconds({}) // 0
 */
export function getMilliseconds(props: GetMillisecondsProps) {
	const { seconds = 0, minutes = 0, hours = 0 } = props;

	if (seconds < 0 || minutes < 0 || hours < 0) {
		throw new Error('Invalid time');
	}

	if (seconds) {
		return seconds * 1000;
	}

	if (minutes) {
		return minutes * 60 * 1000;
	}

	if (hours) {
		return hours * 60 * 60 * 1000;
	}

	return 0;
}
