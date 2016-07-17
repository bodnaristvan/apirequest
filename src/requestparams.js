// @flow
// TODO: refactor the hell out of the class
export default class RequestParams {
	params: Object;
	options: Object;
	url: string;

	constructor(pars: Array<any>) {
		this.params = Object.assign({}, pars[1], pars[2]);
		this.options = Object.assign({}, pars[3], pars[4]);
		this.url = pars[0];
	}

	parse() {
		// check if the url contains any template strings, replace them with values in the params object
		// returned object contains the url, the final query params and request options
		var urlParams = this.url.match(/\{\{(.+?)\}\}/g);
		if (urlParams) {
			var paramsUsed = urlParams.map((p) => p.slice(2, -2));
			this.url = paramsUsed.reduce((url, p) => url.replace('{{' + p + '}}', this.params[p]), this.url);
			this.params = Object.keys(this.params)
				.filter((p) => paramsUsed.indexOf(p) === -1)
				.reduce((p, k) => {
					p[k] = this.params[k];
					return p;
				}, {});
		}

		// handle query params nicely for GET requests
		if (this.options.method === 'GET' && ((typeof this.params === 'object' && Object.keys(this.params).length) || (this.params instanceof Array && this.params.length))) {
			// append data to the url as encoded query params
			this.url += '?' + Object.keys(this.params)
				.map(key => key + '=' + encodeURIComponent(this.params[key]))
				.join('&');
			// empty the params array, since they're now part of the query
			this.params = {};
		}
		return this;
	}
}
