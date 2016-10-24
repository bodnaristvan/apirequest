import generateApirequest, {createParams} from '../src/generateapirequest';

describe('Apirequest generator', () => {
	describe('createParams', () => {
		const requestParams = createParams(['a', {b: 'b'}, {c: 'c'}, {d: 'd'}, {e: 'e'}]);

		it('should generate RequestParams object with correct url', () => {
			expect(requestParams.url).toBe('a');
		});
		it('should generate RequestParams object with correct params', () => {
			expect(requestParams.params).toEqual({b: 'b', c: 'c'});
		});
		it('should generate RequestParams object with correct options', () => {
			expect(requestParams.options).toEqual({d: 'd', e: 'e'});
		});
	});

	describe('generateApirequest', () => {
		it('should return an API generator function when called', () => {
			const apifunc = generateApirequest('url', {}, {}, (a) => a, (b) => b);
			expect(typeof apifunc).toBe('function');
		});
		xit('result should return an API function when called', () => {
			const paramTransform = (params) => params;
			const responseTransform = (resp) => resp;
			const apifunc = generateApirequest('url', {}, {}, paramTransform, responseTransform);
			expect(typeof apifunc).toBe('function');
		});
	});
});
