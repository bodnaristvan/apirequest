// @flow
import getparamvalue from './getparamvalue';
import RequestParams from './requestparams';

var createParams = (pars: Array<any>): RequestParams => new RequestParams(pars)
var parseParams = (pars: RequestParams): RequestParams => pars.parse();

var runRequest = (pars: RequestParams): Promise<Response> => {
	let options = Object.assign({}, pars.options, {
		body: pars.params,
		json: true
	});
	return fetch(pars.url, options);
}

var defaultResponseTransform = (resp: Response) => resp.json().then(json => resp.ok ? json : Promise.reject(json));

export default function factory(apiopts: Object = {}) {

	let responseTransform = apiopts.responseTransformer || ((data: Promise<Response>): Promise<Response> => data);
	let paramTransform = apiopts.paramTransformer || ((pars: RequestParams): RequestParams => pars);

	return {
		get: (url: string, params: Object = {}, options: Object = {}): Function => {
			options.method = 'GET';
			return (paramsOverride: Object = {}, optionsOverride: Object = {}): Promise<Response> => {
				return Promise.all([url, params, paramsOverride, options, optionsOverride].map(getparamvalue))
					// create params from all the passed promises and whatnot
					.then(createParams)
					// run a custom user provided transformer on the request params object
					.then(paramTransform)
					// parse the parameters ;-)
					.then(parseParams)
					// run the request
					.then(runRequest)
					// run the response through a default transformer that checks simply for valid json
					.then(defaultResponseTransform)
					// run the custom user provided response transformer
					.then(responseTransform);
			}
		},
		post: (url: string, params: Object = {}, options: Object = {}): Function => {
			options.method = 'POST';
			return (paramsOverride: Object = {}, optionsOverride: Object = {}): Promise<Response> => {
				return Promise.all([url, params, paramsOverride, options, optionsOverride].map(getparamvalue))
					.then(createParams)
					.then(paramTransform)
					.then(parseParams)
					.then(runRequest)
					.then(defaultResponseTransform)
					.then(responseTransform);
			}
		},
		put: (url: string, params: Object = {}, options: Object = {}): Function => {
			options.method = 'PUT';
			return (paramsOverride: Object = {}, optionsOverride: Object = {}): Promise<Response> => {
				return Promise.all([url, params, paramsOverride, options, optionsOverride].map(getparamvalue))
					.then(createParams)
					.then(paramTransform)
					.then(parseParams)
					.then(runRequest)
					.then(defaultResponseTransform)
					.then(responseTransform);
			}
		},
		delete: (url: string, params: Object = {}, options: Object = {}): Function => {
			options.method = 'DELETE';
			return (paramsOverride: Object = {}, optionsOverride: Object = {}): Promise<Response> => {
				return Promise.all([url, params, paramsOverride, options, optionsOverride].map(getparamvalue))
					.then(createParams)
					.then(paramTransform)
					.then(parseParams)
					.then(runRequest)
					.then(defaultResponseTransform)
					.then(responseTransform);
			}
		}
	};
}
