import RequestParams from '../src/requestparams';

describe('RequestParams object', () => {
	const url = 'http://testapi.com/api/test/';
	const templateUrl = 'http://testapi.com/api/test/{{id}}';

	describe('options', () => {
		it('should contain basic fetch options', (done) => {
			const rp = new RequestParams(url, {}, {});
			const nrp = rp.parse();
			expect(nrp.options).toEqual({body: {}, json: true});
			done();
		});
		it('should accept default options', (done) => {
			const rp = new RequestParams(url, {}, {test: 1});
			const nrp = rp.parse();
			expect(nrp.options).toEqual(jasmine.objectContaining({test: 1}));
			done();
		});
		it('should be extended with params according to fetch specs', (done) => {
			const rp = new RequestParams(url, {foo: 'bar'}, {test: 1});
			const nrp = rp.parse();
			expect(nrp.options).toEqual(jasmine.objectContaining({test: 1, body: {foo: 'bar'}}));
			done();
		});
		it('should not contain a separate params field', (done) => {
			const rp = new RequestParams(url, {test: 1}, {test: 2});
			const nrp = rp.parse();
			expect(nrp.params).toBe(undefined);
			done();
		});
	});

	describe('url', () => {
		it('should remain untouched if it\'s not a template and method is not get', (done) => {
			const rp = new RequestParams(url, {id: 1, foo: 'bar'}, {method: 'POST'});
			const nrp = rp.parse();
			expect(nrp.url).toEqual(url);
			done();
		});
		it('should add query params to url if it\'s not a template but method is get', (done) => {
			const rp = new RequestParams(url, {id: 1, foo: 'bar'}, {method: 'GET'});
			const nrp = rp.parse();
			expect(nrp.url).toEqual(url + '?id=1&foo=bar');
			done();
		});
		it('should replace params in url template', (done) => {
			const rp = new RequestParams(templateUrl, {id: 1, foo: 'bar'}, {method: 'GET'});
			const nrp = rp.parse();
			expect(nrp.url).toEqual('http://testapi.com/api/test/1?foo=bar');
			done();
		});
		it('should remove params that were already used in the url template', (done) => {
			const rp = new RequestParams(templateUrl, {id: 1, foo: 'bar'}, {method: 'GET'});
			const nrp = rp.parse();
			expect(nrp.url).toEqual('http://testapi.com/api/test/1?foo=bar');
			expect(nrp.options.body).toEqual({});
			done();
		});
		it('should replace params in url template and keep params if method is post', (done) => {
			const rp = new RequestParams(templateUrl, {id: 1, foo: 'bar'}, {method: 'POST'});
			const nrp = rp.parse();
			expect(nrp.url).toEqual('http://testapi.com/api/test/1');
			expect(nrp.options.body).toEqual({foo: 'bar'});
			done();
		});
	});
});
