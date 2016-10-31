// @flow
import type RequestParams from './requestparams';
import generateApirequest from './generateapirequest';

// ApiRequest type definition
type ApiRequest = {
	get(url: string, params: Object, options: Object): Function,
	post(url: string, params: Object, options: Object): Function,
	put(url: string, params: Object, options: Object): Function,
	delete(url: string, params: Object, options: Object): Function
}

export default function factory(apiopts: Object = {}): ApiRequest {

	let responseTransform = apiopts.responseTransformer || ((data: Promise<Response>): Promise<Response> => data);
	let paramTransform = apiopts.paramTransformer || ((pars: RequestParams): RequestParams => pars);

	return {
		get: (url: string, params: Object = {}, options: Object = {}): Function =>
			generateApirequest(
				url,
				params,
				Object.assign({}, {method: 'GET'}, options),
				paramTransform, responseTransform),

		post: (url: string, params: Object = {}, options: Object = {}): Function =>
			generateApirequest(
				url,
				params,
				Object.assign({}, {method: 'POST'}, options),
				paramTransform, responseTransform),

		put: (url: string, params: Object = {}, options: Object = {}): Function =>
			generateApirequest(
				url,
				params,
				Object.assign({}, {method: 'PUT'}, options),
				paramTransform, responseTransform),

		delete: (url: string, params: Object = {}, options: Object = {}): Function =>
			generateApirequest(
				url,
				params,
				Object.assign({}, {method: 'DELETE'}, options),
				paramTransform, responseTransform)
	}
};
