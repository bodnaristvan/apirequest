!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.apirequest=t():e.apirequest=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=e.responseTransformer||function(e){return e},n=e.paramTransformer||function(e){return e};return{get:function(e){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],o=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];return o.method="GET",function(){var i=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],a=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return Promise.all([e,r,i,o,a].map(u["default"])).then(f).then(n).then(c).then(l).then(h).then(t)}},post:function(e){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],o=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];return o.method="POST",function(){var i=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],a=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return Promise.all([e,r,i,o,a].map(u["default"])).then(f).then(n).then(c).then(l).then(h).then(t)}},put:function(e){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],o=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];return o.method="PUT",function(){var i=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],a=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return Promise.all([e,r,i,o,a].map(u["default"])).then(f).then(n).then(c).then(l).then(h).then(t)}},"delete":function(e){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],o=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];return o.method="DELETE",function(){var i=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],a=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return Promise.all([e,r,i,o,a].map(u["default"])).then(f).then(n).then(c).then(l).then(h).then(t)}}}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var i=n(1),u=r(i),a=n(2),s=r(a),f=function(e){return new s["default"](e)},c=function(e){return e.parse()},l=function(e){if("undefined"==typeof fetch)return new Promise.reject("fetch not supported");var t=Object.assign({},e.options,{body:e.params,json:!0});return fetch(e.url,t)},h=function(e){return e.json().then(function(t){return e.ok?t:Promise.reject(t)})};e.exports=t["default"]},function(e,t){"use strict";function n(e){var t=this;return new Promise(function(n,r){n("function"==typeof e?Promise.resolve(e.call(t)):e)})}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n,e.exports=t["default"]},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(){function e(t){n(this,e),this.params=Object.assign({},t[1],t[2]),this.options=Object.assign({},t[3],t[4]),this.url=t[0]}return o(e,[{key:"parse",value:function(){var e=this,t=this.url.match(/\{\{(.+?)\}\}/g);if(t){var n=t.map(function(e){return e.slice(2,-2)});this.url=n.reduce(function(t,n){return t.replace("{{"+n+"}}",e.params[n])},this.url),this.params=Object.keys(this.params).filter(function(e){return-1===n.indexOf(e)}).reduce(function(t,n){return t[n]=e.params[n],t},{})}return"GET"===this.options.method&&("object"===r(this.params)&&Object.keys(this.params).length||this.params instanceof Array&&this.params.length)&&(this.url+="?"+Object.keys(this.params).map(function(t){return t+"="+encodeURIComponent(e.params[t])}).join("&"),this.params={}),this}}]),e}();t["default"]=i,e.exports=t["default"]}])});
//# sourceMappingURL=apirequest.js.map