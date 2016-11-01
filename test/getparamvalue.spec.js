import getparamvalue from '../src/getparamvalue';

describe('getparamvalue should return', () => {
	const testString = 'test value';
	const valueCheck = (res) => expect(res).toBe(testString);

	it('with the value of the passed value', (done) => {
		const result = getparamvalue(testString);
		result
			.then(valueCheck)
			.then(done);
	});
	it('with the value of the passed function', (done) => {
		const result = getparamvalue(() => { return testString; });
		result
			.then(valueCheck)
			.then(done);
	});
	it('with the value of the passed promise', (done) => {
		const result = getparamvalue(new Promise((resolve) => resolve(testString)));
		result
			.then(valueCheck)
			.then(done);
	});
});
