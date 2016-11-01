// @flow
// returns a promise that resolves with the final value of the passed param:
// - resolves functions that return a promise, and return with the promises value
// - resolves functions and return with the returned value
// - resolves with the passed in value
export default function getparamvalue<T>(v: T): Promise<T> {
	return new Promise((resolve): void => {
		if (typeof v === 'function') {
			resolve(Promise.resolve(v.call(this)));
		} else {
			resolve(v);
		}
	});
}
