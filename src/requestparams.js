// @flow
// TODO: refactor the hell out of the class
export default class RequestParams {
	url: string;
	params: Object;
	options: Object;

	constructor(url: string, params: Object = {}, options: Object = {}) {
		this.params = params;
		this.options = options;
		this.url = url;
	}

	parse() {
		// check if the url contains any template strings, replace them with values in the params object
		// returned object contains the url, the final query params and request options
		let genurl = this.url;
		let genparams = this.params;
		let genoptions = this.options;

		let urlParams = this.url.match(/\{\{(.+?)\}\}/g);
		if (urlParams) {
			var paramsUsed = urlParams.map((p) => p.slice(2, -2));
			genurl = paramsUsed.reduce((url, p) => url.replace('{{' + p + '}}', this.params[p]), this.url);
			genparams = Object.keys(this.params)
				.filter((p) => paramsUsed.indexOf(p) === -1)
				.reduce((p, k) => {
					p[k] = this.params[k];
					return p;
				}, {});
		}

		// handle query params nicely for GET requests
		if (this.options.method === 'GET' && ((typeof this.params === 'object' && Object.keys(genparams).length) || (this.params instanceof Array && genparams.length))) {
			// append data to the url as encoded query params
			genurl += '?' + Object.keys(genparams)
				.map(key => key + '=' + encodeURIComponent(genparams[key]))
				.join('&');
			// empty the params array, since they're now part of the query
			genparams = {};
		}

		genoptions = Object.assign({}, this.options, {
			body: genparams,
			json: true
		});
		return {url: genurl, options: genoptions};
	}
}
