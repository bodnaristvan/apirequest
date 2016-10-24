// @flow
// returns a promise that resolves with the final value of the passed param:
// - resolves functions that return a promise, and return with the promises value
// - resolves functions and return with the returned value
// - resolves with the passed in value
export default function getparamvalue (v: any): Promise<any> {
	return new Promise((resolve, reject): void => {
		if (typeof v === 'function') {
			resolve(Promise.resolve(v.call(this)));
		} else {
			resolve(v);
		}
	});
}
