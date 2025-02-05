type GetMilisecondsFromSecondsProps = { seconds: number };
type GetMilisecondsFromMinutesProps = { minutes: number };
type GetMilisecondsFromHoursProps = { hours: number };

type GetMillisecondsProps =
	| GetMilisecondsFromSecondsProps
	| GetMilisecondsFromMinutesProps
	| GetMilisecondsFromHoursProps;

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
	if ('seconds' in props) {
		if (props.seconds < 0) {
			throw new Error('Invalid time');
		}
		return props.seconds * 1000;
	}

	if ('minutes' in props) {
		if (props.minutes < 0) {
			throw new Error('Invalid time');
		}
		return props.minutes * 60 * 1000;
	}

	if ('hours' in props) {
		if (props.hours < 0) {
			throw new Error('Invalid time');
		}
		return props.hours * 60 * 60 * 1000;
	}

	return 0;
}
