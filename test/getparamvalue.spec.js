import getparamvalue from '../src/getparamvalue';

describe('getparamvalue should return', () => {
	const testString = 'test value';
	const valueCheck = (res) => expect(res).toBe(testString);

	it('with the value of the passed value', (done) => {
		let result = getparamvalue(testString);
		result
			.then(valueCheck)
			.then(done);
	});
	it('with the value of the passed function', (done) => {
		let result = getparamvalue(() => { return testString });
		result
			.then(valueCheck)
			.then(done);
	});
	it('with the value of the passed promise', (done) => {
		let result = getparamvalue(new Promise((resolve, reject) => resolve(testString)));
		result
			.then(valueCheck)
			.then(done);
	});
});
