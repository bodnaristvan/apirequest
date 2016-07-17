import RequestParams from '../src/requestparams';

describe('RequestParams object', () => {
	let rp;
	let url = 'http://testapi.com/api/test/';
	let templateUrl = 'http://testapi.com/api/test/{{id}}';
	let params = {};
	let paramsOverride = {id: 1};
	let options = {};
	let optionsOverride = {test: 'test'};
	let rawParams = [url, params, paramsOverride, options, optionsOverride];

	describe('params', () => {
		it('should accept default params', (done) => {
			let rp = new RequestParams([url, {test: 1}, {}, {}, {}]);
			rp.parse();
			expect(rp.params).toEqual({test: 1});
			done();
		});
		it('should extend default params with overrides', (done) => {
			let rp = new RequestParams([url, {test: 1}, {foo: 'bar'}, {}, {}]);
			rp.parse();
			expect(rp.params).toEqual({test: 1, foo: 'bar'});
			done();
		});
		it('should override default params', (done) => {
			let rp = new RequestParams([url, {test: 1}, {test: 2}, {}, {}]);
			rp.parse();
			expect(rp.params).toEqual({test: 2});
			done();
		});
	});

	describe('options', () => {
		it('should accept default options', (done) => {
			let rp = new RequestParams([url, {}, {}, {test: 1}, {}]);
			rp.parse();
			expect(rp.options).toEqual({test: 1});
			done();
		});
		it('should extend default options with overrides', (done) => {
			let rp = new RequestParams([url, {}, {}, {test: 1}, {foo: 'bar'}]);
			rp.parse();
			expect(rp.options).toEqual({test: 1, foo: 'bar'});
			done();
		});
		it('should override default options', (done) => {
			let rp = new RequestParams([url, {}, {}, {test: 1}, {test: 2}]);
			rp.parse();
			expect(rp.options).toEqual({test: 2});
			done();
		});
	});

	describe('url', () => {
		it('should remain untouched if it\'s not a template and method is not get', (done) => {
			let rp = new RequestParams([url, {id: 1, foo: 'bar'}, {}, {method: 'POST'}, {}]);
			rp.parse();
			expect(rp.url).toEqual(url);
			done();
		});
		it('should add query params to url if it\'s not a template but method is get', (done) => {
			let rp = new RequestParams([url, {id: 1, foo: 'bar'}, {}, {method: 'GET'}, {}]);
			rp.parse();
			expect(rp.url).toEqual(url + '?id=1&foo=bar');
			done();
		});
		it('should replace params in url template', (done) => {
			let rp = new RequestParams([templateUrl, {id: 1, foo: 'bar'}, {}, {method: 'GET'}, {}]);
			rp.parse();
			expect(rp.url).toEqual('http://testapi.com/api/test/1?foo=bar');
			done();
		});
		it('should remove params that were already used in the url template', (done) => {
			let rp = new RequestParams([templateUrl, {id: 1, foo: 'bar'}, {}, {method: 'GET'}, {}]);
			rp.parse();
			expect(rp.url).toEqual('http://testapi.com/api/test/1?foo=bar');
			expect(rp.params).toEqual({});
			done();
		});
		it('should replace params in url template and keep params if method is post', (done) => {
			let rp = new RequestParams([templateUrl, {id: 1, foo: 'bar'}, {}, {method: 'POST'}, {}]);
			rp.parse();
			expect(rp.url).toEqual('http://testapi.com/api/test/1');
			expect(rp.params).toEqual({foo: 'bar'});
			done();
		});
	});
});
