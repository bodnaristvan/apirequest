# apirequest&#46;js

A tool to help building API libraries. Apirequest allows you to create a library for accessing http services easily, in a centralized way. An API defined by apirequest will return a native Javascript Promise when called, wrapping `fetch` calls.


## Installation
Get the npm module:
```
npm install apirequest --save-dev
```

Since fetch is [not fully supported](http://caniuse.com/#feat=promises) by all browsers it is recommended to use the fetch polyfill from Github:
https://github.com/github/fetch

## Usage
```javascript
// Load the library from npm
import apirequest from 'apirequest';

// Create a new API instance, with optional parameters
const api = new apirequest({
	// The paramTransformer option lets you specify a function that operates on the
	// parameters passed down to the `fetch` request.
	// The function has a single RequestParams argument, allowing you to access the `url`,
	// `params` and `options` properties. The return value must be a RequestParams instance.
	paramTransformer: (request) => {
		// Set a default "maxreturned" parameter on GET queries
		if (request.options.method === 'GET' && !request.params.maxreturned) {
			request.params.maxreturned = 10;
		}
		return request;
	},
	// The responseTransformer option lets you process responses before returning to clients.
	// The function takes the response JSON object as an argument.
	responseTransformer: (response) => {
		// Given this API response envelope:
		// {
		//   meta: { status: 200, ... },
		//   data: { ... }
		// }
		// The following function simply checks the returned status, and returns the wrapped data
		// in the "data" field, or rejects the request promise.
		return (response.meta && response.meta.status === 200) ? response.data : Promise.reject(response);
	}
});
```

Creating the API clients to be distributed can be done using the `get`, `post`, `put` or `delete` methods.

Syntax:
```javascript
get: (url: string, params: Object = {}, options: Object = {}): Function
```

The required `url` parameter is the URL of the API. Placeholders in double curly brackets will be replaced with the values provided by clients.
`params` allows the client library to provide default parameter values. These parameters can be overridden by the user specified values at run-time.
`options` lets the client set request options, these will be passed to `fetch`. This is the good place for specifying custom headers for example.
All parameter of the client can be specified as a JavaScript value or a "thenable" object or function.

```javascript
const getItem = api.get('http://someapi.com/api/item/{{id}}');
const postItem = api.post('http://someapi.com/api/item/');
```

Generated API client functions accept two parameters:
* `params` -- an object containing the request payload
* `options` -- an object setting custom request options (using the fetch API)

The return value is a native JavaScript Promise object, to allow easy processing or further chaining.
Usage:
```javascript
// Get a single item
getItem({id: 1})
	.then((item) => renderItem(item))
	.catch((error) => renderError(error.msg));

// Create a new item
postItem({type: 'item', name: 'Thing'})
	.then((item) => renderSuccess(item))
	.catch((error) => renderError(error.msg));
```

## Examples

### Creating simple clients

#### Define an API client
A simple request to fetch an object from a fixed URL:
```javascript
import apirequest from 'apirequest';
const api = new apirequest();
const getLuke = api.get('http://swapi.co/api/people/1/');

getLuke()
	.then((luke) => console.log(luke))
    .catch((error) => console.error(error));
```

### Working with payload
#### Add user specified payload to the request
Dynamically pass values to the URL:
```javascript
const getPerson = api.get('http://swapi.co/api/people/{{id}}/');

// Called URL will be http://swapi.co/api/people/1/
getPerson({id: 1})
	.then((person) => console.log(person))
	.catch((error) => console.error(error));
```

#### Add default payload to request
```javascript
const getPerson = api.get('http://swapi.co/api/people/{{id}}/', {format: 'wookiee'});

// URL will be http://swapi.co/api/people/1/?format=wookiee
// Note that while `id` was used for the URL generation, the `format` param is passed as
// regular GET query param, as the only remaining payload attribute.
getPerson({id: 1})
	.then((person) => console.log(person))
	.catch((error) => console.error(error));
// Parameter specified at call time will override the default value, the resulting URL
// will be http://swapi.co/api/people/1/?format=json
getPerson({id: 1, format: 'json'})
	.then((person) => console.log(person))
	.catch((error) => console.error(error));
```

#### Add payload async
Parameters and options both can be specified as a JavaScript value, function or Promise.
```javascript
const getPerson = api.get('http://swapi.co/api/people/{{id}}/', {format: 'wookiee'});
// parameter as a function
let personIdByName = (name) => {id: nameToIdMap[name]};
getPerson(personIdByName)
	.then((person) => console.log(person))
	.catch((error) => console.error(error));

// parameter as a Promise
let getPersonIdPromise = new Promise((resolve, reject) => {
	// Get the person ID from a remote server
	if (remoteResponse) {
		resolve({id: remoteResponse.id});
	} else {
		reject('Not found');
	}
});
getPerson(getPersonIdPromise)
	.then((person) => console.log(person))
	.catch((error) => console.error(error));
```

### Response and request processing
#### Process the response
As client functions return with a Promise they can be chained for further processing
```javascript
const getPerson = api.get('http://swapi.co/api/people/{{id}}/');

// Define a method that works with the result
let heightToInches = (person) => {
	person.height = person.height * 0.393701;
	return person;
}
getPerson({id: 1})
	.then(heightToInches)
	.then((person) => {
		console.log(person.name + ' is ' + person.height + ' inches tall');
	})
	.catch((error) => console.error(error));
```

### Handling errors
#### Handle errors
TBD

## Development
See [CONTRIBUTING](./CONTRIBUTING.md)

## Flow support
[Flow](https://flowtype.org/) annotation is not complete yet, will be done later, providing an external type definition.
