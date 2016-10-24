// @flow
import getparamvalue from './getparamvalue';
import RequestParams from './requestparams';

export function createParams(pars: Array<any>): RequestParams {
	let params = Object.assign({}, pars[1], pars[2]);
	let options = Object.assign({}, pars[3], pars[4]);
	let url = pars[0];
	return new RequestParams(url, params, options);
}

function runRequest(pars: RequestParams): Promise<Response> {
  let params = pars.parse();
  return fetch(params.url, params.options);
}

function defaultResponseTransform(resp: Response): Promise<any> {
	return resp
		.json()
		.then(json => resp.ok ? json : Promise.reject(json));
}

export default function generateApirequest(url: string, params: Object, options: Object, paramTransform: Function, responseTransform: Function): Function {
		return (paramsOverride: Object = {}, optionsOverride: Object = {}): Promise<Response> => {
			return Promise.all([url, params, paramsOverride, options, optionsOverride].map(getparamvalue))
				// create params from all the passed promises and whatnot
				.then(createParams)
				// run a custom user provided transformer on the request params object
				.then(paramTransform)
				// fire the fetch request
				.then(runRequest)
				// run the response through a default transformer that checks simply for valid json
				.then(defaultResponseTransform)
				// run the custom user provided response transformer
				.then(responseTransform);
		}
}
