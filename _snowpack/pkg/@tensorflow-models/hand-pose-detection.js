import { c as commonjsGlobal, s as squaredDifference, p as pow, m as maximum, a as minimum, b as sub, f as floorDiv, d as divNoNan, e as div, g as mod, h as addN, i as add, j as isNaN$1, k as prod, r as rsqrt, l as clipByValue, t as tan, n as tanh, o as square, q as sqrt, u as softplus, v as sinh, w as sign, x as sin, y as selu, z as round, A as real, B as reciprocal, C as neg, D as imag, E as log1p, F as log, G as floor, H as expm1, I as exp, J as erf, K as cosh, L as cos, M as ceil, N as atanh, O as atan2, P as atan, Q as asinh, R as asin, S as acosh, T as acos, U as abs, V as stack, W as concat, X as unstack, Y as slice, Z as dilation2d, _ as maxPool3d, $ as avgPool3d, a0 as maxPoolWithArgmax, a1 as maxPool, a2 as avgPool, a3 as conv3d, a4 as depthwiseConv2d, a5 as conv2dTranspose, a6 as depthwiseConv2d$1, a7 as conv2d, a8 as conv2d$1, a9 as conv1d, aa as zerosLike, ab as truncatedNormal, ac as range, ad as randomUniform, ae as onesLike, af as ones, ag as oneHot, ah as multinomial, ai as linspace, aj as fill, ak as setdiff1dAsync, al as whereAsync, am as image$1, an as unique, ao as topk, ap as tensor1d, aq as where, ar as logicalOr, as as logicalNot, at as logicalAnd, au as lessEqual, av as less, aw as greaterEqual, ax as greater, ay as notEqual, az as equal, aA as matMul, aB as transpose, aC as einsum, aD as matMul$1, aE as sparseToDense, aF as logSoftmax, aG as softmax, aH as localResponseNormalization, aI as batchNorm, aJ as denseBincount, aK as bincount, aL as cumsum, aM as argMin, aN as argMax, aO as any, aP as all, aQ as min, aR as mean, aS as max, aT as gatherND, aU as scatterND, aV as split$1, aW as tile, aX as squeeze, aY as stridedSlice, aZ as reverse, a_ as gather, a$ as sparse$1, b0 as irfft, b1 as rfft, b2 as ifft, b3 as fft, b4 as string$1, b5 as broadcastArgs, b6 as broadcastTo, b7 as depthToSpace, b8 as batchToSpaceND, b9 as spaceToBatchND, ba as pad, bb as mirrorPad, bc as expandDims, bd as fromPixels, be as tensor2d } from '../common/ops-6a16c5ee.js';
import { e as env, c as clone, m as mul, p as prelu, l as leakyRelu, r as relu6, s as sigmoid, a as relu, b as elu, d as complex, f as scalar, k as keep, t as tensor, g as tidy, h as reshape, z as zeros, i as cast, j as sum, n as browserHTTPRequest, o as getLoadHandlers, q as decodeWeights, u as getSaveHandlers, T as Tensor, v as dispose } from '../common/non_max_suppression_impl-ec0b3862.js';
import { t as toNestedArray, a as assert, b as arraysEqual, i as isPromise } from '../common/util_base-577665f5.js';

(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var x;function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}var ba="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
function ca(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof commonjsGlobal&&commonjsGlobal];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}var y=ca(this);function B(a,b){if(b)a:{var c=y;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];if(!(e in c))break a;c=c[e];}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&ba(c,a,{configurable:!0,writable:!0,value:b});}}
B("Symbol",function(a){function b(g){if(this instanceof b)throw new TypeError("Symbol is not a constructor");return new c(d+(g||"")+"_"+e++,g)}function c(g,f){this.g=g;ba(this,"description",{configurable:!0,writable:!0,value:f});}if(a)return a;c.prototype.toString=function(){return this.g};var d="jscomp_symbol_"+(1E9*Math.random()>>>0)+"_",e=0;return b});
B("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=y[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&ba(d.prototype,a,{configurable:!0,writable:!0,value:function(){return da(aa(this))}});}return a});function da(a){a={next:a};a[Symbol.iterator]=function(){return this};return a}
function C(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}function ea(a){if(!(a instanceof Array)){a=C(a);for(var b,c=[];!(b=a.next()).done;)c.push(b.value);a=c;}return a}var fa="function"==typeof Object.create?Object.create:function(a){function b(){}b.prototype=a;return new b},ha;
if("function"==typeof Object.setPrototypeOf)ha=Object.setPrototypeOf;else {var ia;a:{var ja={a:!0},ka={};try{ka.__proto__=ja;ia=ka.a;break a}catch(a){}ia=!1;}ha=ia?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null;}var la=ha;
function E(a,b){a.prototype=fa(b.prototype);a.prototype.constructor=a;if(la)la(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d);}else a[c]=b[c];a.da=b.prototype;}function ma(){this.l=!1;this.i=null;this.h=void 0;this.g=1;this.s=this.m=0;this.j=null;}function na(a){if(a.l)throw new TypeError("Generator is already running");a.l=!0;}ma.prototype.o=function(a){this.h=a;};
function oa(a,b){a.j={U:b,V:!0};a.g=a.m||a.s;}ma.prototype.return=function(a){this.j={return:a};this.g=this.s;};function F(a,b,c){a.g=c;return {value:b}}function pa(a){this.g=new ma;this.h=a;}function qa(a,b){na(a.g);var c=a.g.i;if(c)return ra(a,"return"in c?c["return"]:function(d){return {value:d,done:!0}},b,a.g.return);a.g.return(b);return G(a)}
function ra(a,b,c,d){try{var e=b.call(a.g.i,c);if(!(e instanceof Object))throw new TypeError("Iterator result "+e+" is not an object");if(!e.done)return a.g.l=!1,e;var g=e.value;}catch(f){return a.g.i=null,oa(a.g,f),G(a)}a.g.i=null;d.call(a.g,g);return G(a)}function G(a){for(;a.g.g;)try{var b=a.h(a.g);if(b)return a.g.l=!1,{value:b.value,done:!1}}catch(c){a.g.h=void 0,oa(a.g,c);}a.g.l=!1;if(a.g.j){b=a.g.j;a.g.j=null;if(b.V)throw b.U;return {value:b.return,done:!0}}return {value:void 0,done:!0}}
function sa(a){this.next=function(b){na(a.g);a.g.i?b=ra(a,a.g.i.next,b,a.g.o):(a.g.o(b),b=G(a));return b};this.throw=function(b){na(a.g);a.g.i?b=ra(a,a.g.i["throw"],b,a.g.o):(oa(a.g,b),b=G(a));return b};this.return=function(b){return qa(a,b)};this[Symbol.iterator]=function(){return this};}function ta(a){function b(d){return a.next(d)}function c(d){return a.throw(d)}return new Promise(function(d,e){function g(f){f.done?d(f.value):Promise.resolve(f.value).then(b,c).then(g,e);}g(a.next());})}
function H(a){return ta(new sa(new pa(a)))}
B("Promise",function(a){function b(f){this.h=0;this.i=void 0;this.g=[];this.o=!1;var k=this.j();try{f(k.resolve,k.reject);}catch(h){k.reject(h);}}function c(){this.g=null;}function d(f){return f instanceof b?f:new b(function(k){k(f);})}if(a)return a;c.prototype.h=function(f){if(null==this.g){this.g=[];var k=this;this.i(function(){k.l();});}this.g.push(f);};var e=y.setTimeout;c.prototype.i=function(f){e(f,0);};c.prototype.l=function(){for(;this.g&&this.g.length;){var f=this.g;this.g=[];for(var k=0;k<f.length;++k){var h=
f[k];f[k]=null;try{h();}catch(l){this.j(l);}}}this.g=null;};c.prototype.j=function(f){this.i(function(){throw f;});};b.prototype.j=function(){function f(l){return function(n){h||(h=!0,l.call(k,n));}}var k=this,h=!1;return {resolve:f(this.C),reject:f(this.l)}};b.prototype.C=function(f){if(f===this)this.l(new TypeError("A Promise cannot resolve to itself"));else if(f instanceof b)this.F(f);else {a:switch(typeof f){case "object":var k=null!=f;break a;case "function":k=!0;break a;default:k=!1;}k?this.v(f):this.m(f);}};
b.prototype.v=function(f){var k=void 0;try{k=f.then;}catch(h){this.l(h);return}"function"==typeof k?this.G(k,f):this.m(f);};b.prototype.l=function(f){this.s(2,f);};b.prototype.m=function(f){this.s(1,f);};b.prototype.s=function(f,k){if(0!=this.h)throw Error("Cannot settle("+f+", "+k+"): Promise already settled in state"+this.h);this.h=f;this.i=k;2===this.h&&this.D();this.A();};b.prototype.D=function(){var f=this;e(function(){if(f.B()){var k=y.console;"undefined"!==typeof k&&k.error(f.i);}},1);};b.prototype.B=
function(){if(this.o)return !1;var f=y.CustomEvent,k=y.Event,h=y.dispatchEvent;if("undefined"===typeof h)return !0;"function"===typeof f?f=new f("unhandledrejection",{cancelable:!0}):"function"===typeof k?f=new k("unhandledrejection",{cancelable:!0}):(f=y.document.createEvent("CustomEvent"),f.initCustomEvent("unhandledrejection",!1,!0,f));f.promise=this;f.reason=this.i;return h(f)};b.prototype.A=function(){if(null!=this.g){for(var f=0;f<this.g.length;++f)g.h(this.g[f]);this.g=null;}};var g=new c;b.prototype.F=
function(f){var k=this.j();f.J(k.resolve,k.reject);};b.prototype.G=function(f,k){var h=this.j();try{f.call(k,h.resolve,h.reject);}catch(l){h.reject(l);}};b.prototype.then=function(f,k){function h(p,m){return "function"==typeof p?function(q){try{l(p(q));}catch(t){n(t);}}:m}var l,n,r=new b(function(p,m){l=p;n=m;});this.J(h(f,l),h(k,n));return r};b.prototype.catch=function(f){return this.then(void 0,f)};b.prototype.J=function(f,k){function h(){switch(l.h){case 1:f(l.i);break;case 2:k(l.i);break;default:throw Error("Unexpected state: "+
l.h);}}var l=this;null==this.g?g.h(h):this.g.push(h);this.o=!0;};b.resolve=d;b.reject=function(f){return new b(function(k,h){h(f);})};b.race=function(f){return new b(function(k,h){for(var l=C(f),n=l.next();!n.done;n=l.next())d(n.value).J(k,h);})};b.all=function(f){var k=C(f),h=k.next();return h.done?d([]):new b(function(l,n){function r(q){return function(t){p[q]=t;m--;0==m&&l(p);}}var p=[],m=0;do p.push(void 0),m++,d(h.value).J(r(p.length-1),n),h=k.next();while(!h.done)})};return b});
function ua(a,b){a instanceof String&&(a+="");var c=0,d=!1,e={next:function(){if(!d&&c<a.length){var g=c++;return {value:b(g,a[g]),done:!1}}d=!0;return {done:!0,value:void 0}}};e[Symbol.iterator]=function(){return e};return e}var va="function"==typeof Object.assign?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)Object.prototype.hasOwnProperty.call(d,e)&&(a[e]=d[e]);}return a};B("Object.assign",function(a){return a||va});
B("Object.is",function(a){return a?a:function(b,c){return b===c?0!==b||1/b===1/c:b!==b&&c!==c}});B("Array.prototype.includes",function(a){return a?a:function(b,c){var d=this;d instanceof String&&(d=String(d));var e=d.length;c=c||0;for(0>c&&(c=Math.max(c+e,0));c<e;c++){var g=d[c];if(g===b||Object.is(g,b))return !0}return !1}});
B("String.prototype.includes",function(a){return a?a:function(b,c){if(null==this)throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype.includes must not be a regular expression");return -1!==this.indexOf(b,c||0)}});B("Array.prototype.keys",function(a){return a?a:function(){return ua(this,function(b){return b})}});var wa=this||self;
function J(a,b){a=a.split(".");var c=wa;a[0]in c||"undefined"==typeof c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b;}function xa(a){wa.setTimeout(function(){throw a;},0);}function K(a){xa(a);return;}function ya(a,b){K(Error("Invalid wire type: "+a+" (at position "+b+")"));}function za(){K(Error("Failed to read varint, encoding is invalid."));}function Aa(a,b){b=String.fromCharCode.apply(null,b);return null==a?b:a+b}var Ba,Ca="undefined"!==typeof TextDecoder,Da,Ea="undefined"!==typeof TextEncoder;
function Fa(a){if(Ea)a=(Da||(Da=new TextEncoder)).encode(a);else {var b=void 0;b=void 0===b?!1:b;for(var c=0,d=new Uint8Array(3*a.length),e=0;e<a.length;e++){var g=a.charCodeAt(e);if(128>g)d[c++]=g;else {if(2048>g)d[c++]=g>>6|192;else {if(55296<=g&&57343>=g){if(56319>=g&&e<a.length){var f=a.charCodeAt(++e);if(56320<=f&&57343>=f){g=1024*(g-55296)+f-56320+65536;d[c++]=g>>18|240;d[c++]=g>>12&63|128;d[c++]=g>>6&63|128;d[c++]=g&63|128;continue}else e--;}if(b)throw Error("Found an unpaired surrogate");g=65533;}d[c++]=
g>>12|224;d[c++]=g>>6&63|128;}d[c++]=g&63|128;}}a=d.subarray(0,c);}return a}var Ga={},L=null;function Ha(a){var b;void 0===b&&(b=0);Ia();b=Ga[b];for(var c=Array(Math.floor(a.length/3)),d=b[64]||"",e=0,g=0;e<a.length-2;e+=3){var f=a[e],k=a[e+1],h=a[e+2],l=b[f>>2];f=b[(f&3)<<4|k>>4];k=b[(k&15)<<2|h>>6];h=b[h&63];c[g++]=l+f+k+h;}l=0;h=d;switch(a.length-e){case 2:l=a[e+1],h=b[(l&15)<<2]||d;case 1:a=a[e],c[g]=b[a>>2]+b[(a&3)<<4|l>>4]+h+d;}return c.join("")}
function Ja(a){var b=a.length,c=3*b/4;c%3?c=Math.floor(c):-1!="=.".indexOf(a[b-1])&&(c=-1!="=.".indexOf(a[b-2])?c-2:c-1);var d=new Uint8Array(c),e=0;Ka(a,function(g){d[e++]=g;});return d.subarray(0,e)}
function Ka(a,b){function c(h){for(;d<a.length;){var l=a.charAt(d++),n=L[l];if(null!=n)return n;if(!/^[\s\xa0]*$/.test(l))throw Error("Unknown base64 encoding at char: "+l);}return h}Ia();for(var d=0;;){var e=c(-1),g=c(0),f=c(64),k=c(64);if(64===k&&-1===e)break;b(e<<2|g>>4);64!=f&&(b(g<<4&240|f>>2),64!=k&&b(f<<6&192|k));}}
function Ia(){if(!L){L={};for(var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),b=["+/=","+/","-_=","-_.","-_"],c=0;5>c;c++){var d=a.concat(b[c].split(""));Ga[c]=d;for(var e=0;e<d.length;e++){var g=d[e];void 0===L[g]&&(L[g]=e);}}}}var La="function"===typeof Uint8Array,Ma;function Na(a){this.g=a;if(null!==a&&0===a.length)throw Error("ByteString should be constructed with non-empty values");}Na.prototype.toJSON=function(){if(null==this.g)var a="";else a=this.g,a=this.g=null==a||"string"===typeof a?a:La&&a instanceof Uint8Array?Ha(a):null;return a};var Oa="function"===typeof Uint8Array.prototype.slice;function Pa(a,b,c){return b===c?Ma||(Ma=new Uint8Array(0)):Oa?a.slice(b,c):new Uint8Array(a.subarray(b,c))}var M=0,N=0;
function Qa(a){if(a.constructor===Uint8Array)return a;if(a.constructor===ArrayBuffer)return new Uint8Array(a);if(a.constructor===Array)return new Uint8Array(a);if(a.constructor===String)return Ja(a);if(a.constructor===Na){if(null==a.g)var b=Ma||(Ma=new Uint8Array(0));else {b=Uint8Array;var c=a.g;c=null==c||La&&null!=c&&c instanceof Uint8Array?c:"string"===typeof c?Ja(c):null;a=a.g=c;b=new b(a);}return b}if(a instanceof Uint8Array)return new Uint8Array(a.buffer,a.byteOffset,a.byteLength);throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, or Array of numbers");
}function Ra(a,b){b=void 0===b?{}:b;b=void 0===b.u?!1:b.u;this.h=null;this.g=this.i=this.l=0;this.j=!1;this.u=b;a&&Sa(this,a);}function Sa(a,b){a.h=Qa(b);a.l=0;a.i=a.h.length;a.g=a.l;}Ra.prototype.reset=function(){this.g=this.l;};function O(a){a.g>a.i&&(a.j=!0,K(Error("Tried to read past the end of the data "+a.g+" > "+a.i)));}
function P(a){var b=a.h,c=b[a.g],d=c&127;if(128>c)return a.g+=1,O(a),d;c=b[a.g+1];d|=(c&127)<<7;if(128>c)return a.g+=2,O(a),d;c=b[a.g+2];d|=(c&127)<<14;if(128>c)return a.g+=3,O(a),d;c=b[a.g+3];d|=(c&127)<<21;if(128>c)return a.g+=4,O(a),d;c=b[a.g+4];d|=(c&15)<<28;if(128>c)return a.g+=5,O(a),d>>>0;a.g+=5;if(128<=b[a.g++]&&128<=b[a.g++]&&128<=b[a.g++]&&128<=b[a.g++]&&128<=b[a.g++])return a.j=!0,za(),d;O(a);return d}var Ta=[];function Ua(){this.g=new Uint8Array(64);this.h=0;}function Q(a,b){if(!(a.h+1<a.g.length)){var c=a.g;a.g=new Uint8Array(Math.ceil(1+2*a.g.length));a.g.set(c);}a.g[a.h++]=b;}Ua.prototype.length=function(){return this.h};Ua.prototype.end=function(){var a=this.g,b=this.h;this.h=0;return Pa(a,0,b)};function S(a,b){for(;127<b;)Q(a,b&127|128),b>>>=7;Q(a,b);}function Va(a){var b={},c=void 0===b.N?!1:b.N;this.m={u:void 0===b.u?!1:b.u};this.N=c;b=this.m;Ta.length?(c=Ta.pop(),b&&(c.u=b.u),a&&Sa(c,a),a=c):a=new Ra(a,b);this.g=a;this.l=this.g.g;this.h=this.i=-1;this.j=!1;}Va.prototype.reset=function(){this.g.reset();this.h=this.i=-1;};function Wa(a){var b=a.g;(b=b.g==b.i)||(b=a.j)||(b=a.g,b=b.j||0>b.g||b.g>b.i);if(b)return !1;a.l=a.g.g;var c=P(a.g);b=c>>>3;c&=7;if(!(0<=c&&5>=c))return a.j=!0,ya(c,a.l),!1;a.i=b;a.h=c;return !0}
function Xa(a){switch(a.h){case 0:if(0!=a.h)Xa(a);else a:{a=a.g;for(var b=a.g,c=0;10>c;c++){if(0===(a.h[b]&128)){a.g=b+1;O(a);break a}b++;}a.j=!0;za();}break;case 1:a=a.g;a.g+=8;O(a);break;case 2:2!=a.h?Xa(a):(b=P(a.g),a=a.g,a.g+=b,O(a));break;case 5:a=a.g;a.g+=4;O(a);break;case 3:b=a.i;do{if(!Wa(a)){a.j=!0;K(Error("Unmatched start-group tag: stream EOF"));break}if(4==a.h){a.i!=b&&(a.j=!0,K(Error("Unmatched end-group tag")));break}Xa(a);}while(1);break;default:a.j=!0,ya(a.h,a.l);}}
function Ya(a,b,c){a.N||(a=Pa(a.g.h,c,a.g.g),(c=b.m)?c.push(a):b.m=[a]);}var Za=[];function $a(){this.h=[];this.i=0;this.g=new Ua;}function ab(a,b){0!==b.length&&(a.h.push(b),a.i+=b.length);}function bb(a,b,c){S(a.g,8*b+2);S(a.g,c.length);ab(a,a.g.end());ab(a,c);}var cb="function"===typeof Symbol&&"symbol"===typeof Symbol()?Symbol(void 0):void 0;function db(a,b){Object.isFrozen(a)||(cb?a[cb]|=b:void 0!==a.g?a.g|=b:Object.defineProperties(a,{g:{value:b,configurable:!0,writable:!0,enumerable:!1}}));}function eb(a){if(!a)return 0;var b;cb?b=a[cb]:b=a.g;return null==b?0:b}function fb(a){if(!Array.isArray(a))return a;db(a,1);return a}function gb(a){if(!Array.isArray(a))throw Error("cannot mark non-array as immutable");db(a,2);}function hb(a){return null!==a&&"object"===typeof a&&a.constructor===Object}function ib(a){switch(typeof a){case "number":return isFinite(a)?a:String(a);case "object":return La&&null!=a&&a instanceof Uint8Array?Ha(a):a;default:return a}}function jb(a,b){if(null!=a)return Array.isArray(a)||hb(a)?kb(a,b):b(a)}function kb(a,b){if(Array.isArray(a)){for(var c=Array(a.length),d=0;d<a.length;d++)c[d]=jb(a[d],b);eb(a)&1&&fb(c);return c}c={};for(d in a)c[d]=jb(a[d],b);return c}var lb;function T(a,b,c){var d=lb;lb=null;a||(a=d);d=this.constructor.ba;a||(a=d?[d]:[]);this.j=(d?0:-1)-(this.constructor.$||0);this.i=null;this.g=a;a:{d=this.g.length;a=d-1;if(d&&(d=this.g[a],hb(d))){this.l=a-this.j;this.h=d;break a}void 0!==b&&-1<b?(this.l=Math.max(b,a+1-this.j),this.h=null):this.l=Number.MAX_VALUE;}if(c)for(b=0;b<c.length;b++)a=c[b],a<this.l?(a+=this.j,(d=this.g[a])?fb(d):this.g[a]=mb):(nb(this),(d=this.h[a])?fb(d):this.h[a]=mb);}var mb=Object.freeze(fb([]));
function nb(a){var b=a.l+a.j;a.g[b]||(a.h=a.g[b]={});}function U(a,b,c){return -1===b?null:(void 0===c?0:c)||b>=a.l?a.h?a.h[b]:void 0:a.g[b+a.j]}function ob(a,b,c){c=void 0===c?!0:c;var d=void 0===d?!1:d;var e=U(a,b,d);null==e&&(e=mb);e===mb?(e=fb([]),V(a,b,e,d)):c&&Array.isArray(e)&&eb(e)&2&&(e=e.slice(),V(a,b,e,d));return e}function W(a,b,c){a=U(a,b);a=null==a?a:+a;return null==a?void 0===c?0:c:a}function V(a,b,c,d){(void 0===d?0:d)||b>=a.l?(nb(a),a.h[b]=c):a.g[b+a.j]=c;}
function pb(a,b,c){a.i||(a.i={});var d=a.i[c];if(!d){var e=ob(a,c,!1);d=[];for(var g=Array.isArray(e)?!!(eb(e)&2):!1,f=0;f<e.length;f++)d[f]=new b(e[f]),g&&gb(d[f].g);g&&(gb(d),Object.freeze(d));a.i[c]=d;}return d}function qb(a,b,c,d,e){var g=pb(a,d,b);c=c?c:new d;a=ob(a,b);void 0!=e?(g.splice(e,0,c),a.splice(e,0,X(c))):(g.push(c),a.push(X(c)));}T.prototype.toJSON=function(){var a=X(this);return kb(a,ib)};
function X(a){if(a.i)for(var b in a.i){var c=a.i[b];if(Array.isArray(c))for(var d=0;d<c.length;d++)c[d]&&X(c[d]);else c&&X(c);}return a.g}T.prototype.toString=function(){return X(this).toString()};function rb(a,b){a=U(a,b);return null==a?0:a}function sb(a,b){a=U(a,b);return null==a?"":a}function tb(a,b){if(a=a.m){ab(b,b.g.end());for(var c=0;c<a.length;c++)ab(b,a[c]);}}function ub(a){var b=a[0];switch(a.length){case 2:var c=a[1];return function(h,l,n){return b(h,l,n,c)};case 3:var d=a[1],e=a[2];return function(h,l,n){return b(h,l,n,d,e)};case 4:var g=a[1],f=a[2],k=a[3];return function(h,l,n){return b(h,l,n,g,f,k)};default:throw Error("unsupported number of parameters, expected [2-4], got "+a.length);}}
function vb(a,b,c){for(;Wa(b)&&4!=b.h;){var d=b.i,e=c[d];if(e){if(Array.isArray(e)&&(e=c[d]=ub(e)),!e(b,a,d)){d=b;e=a;var g=d.l;Xa(d);Ya(d,e,g);}}else d=b,e=a,g=d.l,Xa(d),Ya(d,e,g);}return a}function wb(a,b){var c=new $a;b(a,c);a=c.i+c.g.length();if(0===a)c=new Uint8Array(0);else {a=new Uint8Array(a);for(var d=c.h,e=d.length,g=b=0;g<e;g++){var f=d[g];0!==f.length&&(a.set(f,b),b+=f.length);}d=c.g;e=d.h;0!==e&&(a.set(d.g.subarray(0,e),b),d.h=0);c.h=[a];c=a;}return c}
function xb(a,b,c){if(Za.length){var d=Za.pop();a&&(Sa(d.g,a),d.i=-1,d.h=-1);a=d;}else a=new Va(a);try{return c(new b,a)}finally{b=a.g,b.h=null,b.l=0,b.i=0,b.g=0,b.j=!1,b.u=!1,a.i=-1,a.h=-1,a.j=!1,100>Za.length&&Za.push(a);}}
function Y(a,b,c){b=U(b,c);if(null!=b){S(a.g,8*c+5);a=a.g;var d=b;d=(c=0>d?1:0)?-d:d;0===d?0<1/d?M=N=0:(N=0,M=2147483648):isNaN(d)?(N=0,M=2147483647):3.4028234663852886E38<d?(N=0,M=(c<<31|2139095040)>>>0):1.1754943508222875E-38>d?(d=Math.round(d/Math.pow(2,-149)),N=0,M=(c<<31|d)>>>0):(b=Math.floor(Math.log(d)/Math.LN2),d*=Math.pow(2,-b),d=Math.round(8388608*d),16777216<=d&&++b,N=0,M=(c<<31|b+127<<23|d&8388607)>>>0);c=M;Q(a,c>>>0&255);Q(a,c>>>8&255);Q(a,c>>>16&255);Q(a,c>>>24&255);}}
function Z(a,b,c){if(5!==a.h)return !1;a=a.g;var d=a.h[a.g];var e=a.h[a.g+1];var g=a.h[a.g+2],f=a.h[a.g+3];a.g+=4;O(a);e=(d<<0|e<<8|g<<16|f<<24)>>>0;a=2*(e>>31)+1;d=e>>>23&255;e&=8388607;V(b,c,255==d?e?NaN:Infinity*a:0==d?a*Math.pow(2,-149)*e:a*Math.pow(2,d-150)*(e+Math.pow(2,23)));return !0}
function yb(a,b,c){if(0!==a.h)return !1;for(var d=a.g,e=128,g=0,f=a=0;4>f&&128<=e;f++)e=d.h[d.g++],g|=(e&127)<<7*f;128<=e&&(e=d.h[d.g++],g|=(e&127)<<28,a|=(e&127)>>4);if(128<=e)for(f=0;5>f&&128<=e;f++)e=d.h[d.g++],a|=(e&127)<<7*f+3;if(128>e){d=g>>>0;e=a>>>0;if(a=e&2147483648)d=~d+1>>>0,e=~e>>>0,0==d&&(e=e+1>>>0);d=4294967296*e+(d>>>0);a=a?-d:d;}else d.j=!0,za(),a=void 0;V(b,c,a);return !0}function zb(a,b,c){if(0!==a.h)return !1;V(b,c,P(a.g));return !0}
function Ab(a,b,c){if(2!==a.h)return !1;var d=P(a.g);a=a.g;var e=a.g;a.g+=d;O(a);a=a.h;var g;if(Ca)(g=Ba)||(g=Ba=new TextDecoder("utf-8",{fatal:!1})),g=g.decode(a.subarray(e,e+d));else {d=e+d;for(var f=[],k=null,h,l,n;e<d;)h=a[e++],128>h?f.push(h):224>h?e>=d?f.push(65533):(l=a[e++],194>h||128!==(l&192)?(e--,f.push(65533)):f.push((h&31)<<6|l&63)):240>h?e>=d-1?f.push(65533):(l=a[e++],128!==(l&192)||224===h&&160>l||237===h&&160<=l||128!==((g=a[e++])&192)?(e--,f.push(65533)):f.push((h&15)<<12|(l&63)<<6|
g&63)):244>=h?e>=d-2?f.push(65533):(l=a[e++],128!==(l&192)||0!==(h<<28)+(l-144)>>30||128!==((g=a[e++])&192)||128!==((n=a[e++])&192)?(e--,f.push(65533)):(h=(h&7)<<18|(l&63)<<12|(g&63)<<6|n&63,h-=65536,f.push((h>>10&1023)+55296,(h&1023)+56320))):f.push(65533),8192<=f.length&&(k=Aa(k,f),f.length=0);g=Aa(k,f);}V(b,c,g);return !0}
function Bb(a,b,c,d,e){if(2!==a.h)return !1;var g=new d,f=a.g.i,k=P(a.g),h=a.g.g+k;a.g.i=h;e(g,a);e=h-a.g.g;if(0!==e)throw Error("Message parsing ended unexpectedly. Expected to read "+(k+" bytes, instead read "+(k-e)+" bytes, either the data ended unexpectedly or the message misreported its own length"));a.g.g=h;a.g.i=f;qb(b,c,g,d,void 0);return !0}function Cb(a){T.call(this,a);}var Db;E(Cb,T);function Eb(a,b){var c=U(a,1);if(null!=c&&null!=c){S(b.g,8);var d=b.g;if(0<=c)S(d,c);else {for(var e=0;9>e;e++)Q(d,c&127|128),c>>=7;Q(d,1);}}Y(b,a,2);d=U(a,3);null!=d&&bb(b,3,Fa(d));d=U(a,4);null!=d&&bb(b,4,Fa(d));tb(a,b);}function Fb(a,b){return vb(a,b,Db||(Db={1:zb,2:Z,3:Ab,4:Ab}))}function Gb(a){T.call(this,a,-1,Hb);}var Ib;E(Gb,T);Gb.prototype.addClassification=function(a,b){qb(this,1,a,Cb,b);return this};function Jb(a,b){return vb(a,b,Ib||(Ib={1:[Bb,Cb,Fb]}))}var Hb=[1];function Kb(a){T.call(this,a);}var Lb;E(Kb,T);function Mb(a,b){Y(b,a,1);Y(b,a,2);Y(b,a,3);Y(b,a,4);Y(b,a,5);tb(a,b);}function Nb(a,b){return vb(a,b,Lb||(Lb={1:Z,2:Z,3:Z,4:Z,5:Z}))}function Ob(a){T.call(this,a,-1,Pb);}var Qb;E(Ob,T);function Rb(a,b){return vb(a,b,Qb||(Qb={1:[Bb,Kb,Nb]}))}var Pb=[1];function Sb(a){T.call(this,a);}var Tb;E(Sb,T);function Ub(a,b){Y(b,a,1);Y(b,a,2);Y(b,a,3);Y(b,a,4);Y(b,a,5);var c=U(a,6);if(null!=c&&null!=c){S(b.g,48);var d=b.g,e=c;c=0>e;e=Math.abs(e);var g=e>>>0;e=Math.floor((e-g)/4294967296);e>>>=0;c&&(e=~e>>>0,g=(~g>>>0)+1,4294967295<g&&(g=0,e++,4294967295<e&&(e=0)));M=g;N=e;c=M;for(g=N;0<g||127<c;)Q(d,c&127|128),c=(c>>>7|g<<25)>>>0,g>>>=7;Q(d,c);}tb(a,b);}function Vb(a,b){return vb(a,b,Tb||(Tb={1:Z,2:Z,3:Z,4:Z,5:Z,6:yb}))}function Wb(a,b,c){c=a.createShader(0===c?a.VERTEX_SHADER:a.FRAGMENT_SHADER);a.shaderSource(c,b);a.compileShader(c);if(!a.getShaderParameter(c,a.COMPILE_STATUS))throw Error("Could not compile WebGL shader.\n\n"+a.getShaderInfoLog(c));return c}function Xb(a){return pb(a,Cb,1).map(function(b){return {index:rb(b,1),score:W(b,2),label:null!=U(b,3)?sb(b,3):void 0,displayName:null!=U(b,4)?sb(b,4):void 0}})}function Yb(a){return {x:W(a,1),y:W(a,2),z:W(a,3),visibility:null!=U(a,4)?W(a,4):void 0}}function Zb(a){return a.map(function(b){return pb(xb(b,Ob,Rb),Kb,1).map(Yb)})}function $b(a,b){this.h=a;this.g=b;this.l=0;}
function ac(a,b,c){bc(a,b);if("function"===typeof a.g.canvas.transferToImageBitmap)return Promise.resolve(a.g.canvas.transferToImageBitmap());if(c)return Promise.resolve(a.g.canvas);if("function"===typeof createImageBitmap)return createImageBitmap(a.g.canvas);void 0===a.i&&(a.i=document.createElement("canvas"));return new Promise(function(d){a.i.height=a.g.canvas.height;a.i.width=a.g.canvas.width;a.i.getContext("2d",{}).drawImage(a.g.canvas,0,0,a.g.canvas.width,a.g.canvas.height);d(a.i);})}
function bc(a,b){var c=a.g;if(void 0===a.m){var d=Wb(c,"\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }",0),e=Wb(c,"\n  precision mediump float;\n  varying vec2 vTex;\n  uniform sampler2D sampler0;\n  void main(){\n    gl_FragColor = texture2D(sampler0, vTex);\n  }",1),g=c.createProgram();c.attachShader(g,d);c.attachShader(g,e);c.linkProgram(g);if(!c.getProgramParameter(g,c.LINK_STATUS))throw Error("Could not compile WebGL program.\n\n"+
c.getProgramInfoLog(g));d=a.m=g;c.useProgram(d);e=c.getUniformLocation(d,"sampler0");a.j={I:c.getAttribLocation(d,"aVertex"),H:c.getAttribLocation(d,"aTex"),ca:e};a.s=c.createBuffer();c.bindBuffer(c.ARRAY_BUFFER,a.s);c.enableVertexAttribArray(a.j.I);c.vertexAttribPointer(a.j.I,2,c.FLOAT,!1,0,0);c.bufferData(c.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),c.STATIC_DRAW);c.bindBuffer(c.ARRAY_BUFFER,null);a.o=c.createBuffer();c.bindBuffer(c.ARRAY_BUFFER,a.o);c.enableVertexAttribArray(a.j.H);c.vertexAttribPointer(a.j.H,
2,c.FLOAT,!1,0,0);c.bufferData(c.ARRAY_BUFFER,new Float32Array([0,1,0,0,1,0,1,1]),c.STATIC_DRAW);c.bindBuffer(c.ARRAY_BUFFER,null);c.uniform1i(e,0);}d=a.j;c.useProgram(a.m);c.canvas.width=b.width;c.canvas.height=b.height;c.viewport(0,0,b.width,b.height);c.activeTexture(c.TEXTURE0);a.h.bindTexture2d(b.glName);c.enableVertexAttribArray(d.I);c.bindBuffer(c.ARRAY_BUFFER,a.s);c.vertexAttribPointer(d.I,2,c.FLOAT,!1,0,0);c.enableVertexAttribArray(d.H);c.bindBuffer(c.ARRAY_BUFFER,a.o);c.vertexAttribPointer(d.H,
2,c.FLOAT,!1,0,0);c.bindFramebuffer(c.DRAW_FRAMEBUFFER?c.DRAW_FRAMEBUFFER:c.FRAMEBUFFER,null);c.clearColor(0,0,0,0);c.clear(c.COLOR_BUFFER_BIT);c.colorMask(!0,!0,!0,!0);c.drawArrays(c.TRIANGLE_FAN,0,4);c.disableVertexAttribArray(d.I);c.disableVertexAttribArray(d.H);c.bindBuffer(c.ARRAY_BUFFER,null);a.h.bindTexture2d(0);}function cc(a){this.g=a;}var dc=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,9,1,7,0,65,0,253,15,26,11]);function ec(a,b){return b+a}function fc(a,b){window[a]=b;}function gc(a){var b=document.createElement("script");b.setAttribute("src",a);b.setAttribute("crossorigin","anonymous");return new Promise(function(c){b.addEventListener("load",function(){c();},!1);b.addEventListener("error",function(){c();},!1);document.body.appendChild(b);})}
function hc(){return H(function(a){switch(a.g){case 1:return a.m=2,F(a,WebAssembly.instantiate(dc),4);case 4:a.g=3;a.m=0;break;case 2:return a.m=0,a.j=null,a.return(!1);case 3:return a.return(!0)}})}
function ic(a){this.g=a;this.listeners={};this.j={};this.F={};this.m={};this.s={};this.G=this.o=this.R=!0;this.C=Promise.resolve();this.P="";this.B={};this.locateFile=a&&a.locateFile||ec;if("object"===typeof window)var b=window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/";else if("undefined"!==typeof location)b=location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/";else throw Error("solutions can only be loaded on a web page or in a web worker");
this.S=b;if(a.options){b=C(Object.keys(a.options));for(var c=b.next();!c.done;c=b.next()){c=c.value;var d=a.options[c].default;void 0!==d&&(this.j[c]="function"===typeof d?d():d);}}}x=ic.prototype;x.close=function(){this.i&&this.i.delete();return Promise.resolve()};
function jc(a){var b,c,d,e,g,f,k,h,l,n,r;return H(function(p){switch(p.g){case 1:if(!a.R)return p.return();b=void 0===a.g.files?[]:"function"===typeof a.g.files?a.g.files(a.j):a.g.files;return F(p,hc(),2);case 2:c=p.h;if("object"===typeof window)return fc("createMediapipeSolutionsWasm",{locateFile:a.locateFile}),fc("createMediapipeSolutionsPackedAssets",{locateFile:a.locateFile}),f=b.filter(function(m){return void 0!==m.data}),k=b.filter(function(m){return void 0===m.data}),h=Promise.all(f.map(function(m){var q=
kc(a,m.url);if(void 0!==m.path){var t=m.path;q=q.then(function(w){a.overrideFile(t,w);return Promise.resolve(w)});}return q})),l=Promise.all(k.map(function(m){return void 0===m.simd||m.simd&&c||!m.simd&&!c?gc(a.locateFile(m.url,a.S)):Promise.resolve()})).then(function(){var m,q,t;return H(function(w){if(1==w.g)return m=window.createMediapipeSolutionsWasm,q=window.createMediapipeSolutionsPackedAssets,t=a,F(w,m(q),2);t.h=w.h;w.g=0;})}),n=function(){return H(function(m){a.g.graph&&a.g.graph.url?m=F(m,
kc(a,a.g.graph.url),0):(m.g=0,m=void 0);return m})}(),F(p,Promise.all([l,h,n]),7);if("function"!==typeof importScripts)throw Error("solutions can only be loaded on a web page or in a web worker");d=b.filter(function(m){return void 0===m.simd||m.simd&&c||!m.simd&&!c}).map(function(m){return a.locateFile(m.url,a.S)});importScripts.apply(null,ea(d));e=a;return F(p,createMediapipeSolutionsWasm(Module),6);case 6:e.h=p.h;a.l=new OffscreenCanvas(1,1);a.h.canvas=a.l;g=a.h.GL.createContext(a.l,{antialias:!1,
alpha:!1,aa:"undefined"!==typeof WebGL2RenderingContext?2:1});a.h.GL.makeContextCurrent(g);p.g=4;break;case 7:a.l=document.createElement("canvas");r=a.l.getContext("webgl2",{});if(!r&&(r=a.l.getContext("webgl",{}),!r))return alert("Failed to create WebGL canvas context when passing video frame."),p.return();a.D=r;a.h.canvas=a.l;a.h.createContext(a.l,!0,!0,{});case 4:a.i=new a.h.SolutionWasm,a.R=!1,p.g=0;}})}
function lc(a){var b,c,d,e,g,f,k,h;return H(function(l){if(1==l.g){if(a.g.graph&&a.g.graph.url&&a.P===a.g.graph.url)return l.return();a.o=!0;if(!a.g.graph||!a.g.graph.url){l.g=2;return}a.P=a.g.graph.url;return F(l,kc(a,a.g.graph.url),3)}2!=l.g&&(b=l.h,a.i.loadGraph(b));c=C(Object.keys(a.B));for(d=c.next();!d.done;d=c.next())e=d.value,a.i.overrideFile(e,a.B[e]);a.B={};if(a.g.listeners)for(g=C(a.g.listeners),f=g.next();!f.done;f=g.next())k=f.value,mc(a,k);h=a.j;a.j={};a.setOptions(h);l.g=0;})}
x.reset=function(){var a=this;return H(function(b){a.i&&(a.i.reset(),a.m={},a.s={});b.g=0;})};
x.setOptions=function(a,b){var c=this;if(b=b||this.g.options){for(var d=[],e=[],g={},f=C(Object.keys(a)),k=f.next();!k.done;g={K:g.K,L:g.L},k=f.next()){var h=k.value;h in this.j&&this.j[h]===a[h]||(this.j[h]=a[h],k=b[h],void 0!==k&&(k.onChange&&(g.K=k.onChange,g.L=a[h],d.push(function(l){return function(){var n;return H(function(r){if(1==r.g)return F(r,l.K(l.L),2);n=r.h;!0===n&&(c.o=!0);r.g=0;})}}(g))),k.graphOptionXref&&(h={valueNumber:1===k.type?a[h]:0,valueBoolean:0===k.type?a[h]:!1,valueString:2===
k.type?a[h]:""},k=Object.assign(Object.assign(Object.assign({},{calculatorName:"",calculatorIndex:0}),k.graphOptionXref),h),e.push(k))));}if(0!==d.length||0!==e.length)this.o=!0,this.A=(void 0===this.A?[]:this.A).concat(e),this.v=(void 0===this.v?[]:this.v).concat(d);}};
function nc(a){var b,c,d,e,g,f,k;return H(function(h){switch(h.g){case 1:if(!a.o)return h.return();if(!a.v){h.g=2;break}b=C(a.v);c=b.next();case 3:if(c.done){h.g=5;break}d=c.value;return F(h,d(),4);case 4:c=b.next();h.g=3;break;case 5:a.v=void 0;case 2:if(a.A){e=new a.h.GraphOptionChangeRequestList;g=C(a.A);for(f=g.next();!f.done;f=g.next())k=f.value,e.push_back(k);a.i.changeOptions(e);e.delete();a.A=void 0;}a.o=!1;h.g=0;}})}
x.initialize=function(){var a=this;return H(function(b){return 1==b.g?F(b,jc(a),2):3!=b.g?F(b,lc(a),3):F(b,nc(a),0)})};function kc(a,b){var c,d;return H(function(e){if(b in a.F)return e.return(a.F[b]);c=a.locateFile(b,"");d=fetch(c).then(function(g){return g.arrayBuffer()});a.F[b]=d;return e.return(d)})}x.overrideFile=function(a,b){this.i?this.i.overrideFile(a,b):this.B[a]=b;};x.clearOverriddenFiles=function(){this.B={};this.i&&this.i.clearOverriddenFiles();};
x.send=function(a,b){var c=this,d,e,g,f,k,h,l,n,r;return H(function(p){switch(p.g){case 1:if(!c.g.inputs)return p.return();d=1E3*(void 0===b||null===b?performance.now():b);return F(p,c.C,2);case 2:return F(p,c.initialize(),3);case 3:e=new c.h.PacketDataList;g=C(Object.keys(a));for(f=g.next();!f.done;f=g.next())if(k=f.value,h=c.g.inputs[k]){a:{var m=a[k];switch(h.type){case "video":var q=c.m[h.stream];q||(q=new $b(c.h,c.D),c.m[h.stream]=q);0===q.l&&(q.l=q.h.createTexture());if("undefined"!==typeof HTMLVideoElement&&
m instanceof HTMLVideoElement){var t=m.videoWidth;var w=m.videoHeight;}else "undefined"!==typeof HTMLImageElement&&m instanceof HTMLImageElement?(t=m.naturalWidth,w=m.naturalHeight):(t=m.width,w=m.height);w={glName:q.l,width:t,height:w};t=q.g;t.canvas.width=w.width;t.canvas.height=w.height;t.activeTexture(t.TEXTURE0);q.h.bindTexture2d(q.l);t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,m);q.h.bindTexture2d(0);q=w;break a;case "detections":q=c.m[h.stream];q||(q=new cc(c.h),c.m[h.stream]=q);
q.data||(q.data=new q.g.DetectionListData);q.data.reset(m.length);for(w=0;w<m.length;++w){t=m[w];var v=q.data,A=v.setBoundingBox,I=w;var D=t.T;var u=new Sb;V(u,1,D.X);V(u,2,D.Y);V(u,3,D.height);V(u,4,D.width);V(u,5,D.rotation);V(u,6,D.W);D=wb(u,Ub);A.call(v,I,D);if(t.O)for(v=0;v<t.O.length;++v){u=t.O[v];var z=u.visibility?!0:!1;A=q.data;I=A.addNormalizedLandmark;D=w;u=Object.assign(Object.assign({},u),{visibility:z?u.visibility:0});z=new Kb;V(z,1,u.x);V(z,2,u.y);V(z,3,u.z);u.visibility&&V(z,4,u.visibility);
u=wb(z,Mb);I.call(A,D,u);}if(t.M)for(v=0;v<t.M.length;++v)A=q.data,I=A.addClassification,D=w,u=t.M[v],z=new Cb,V(z,2,u.score),u.index&&V(z,1,u.index),u.label&&V(z,3,u.label),u.displayName&&V(z,4,u.displayName),u=wb(z,Eb),I.call(A,D,u);}q=q.data;break a;default:q={};}}l=q;n=h.stream;switch(h.type){case "video":e.pushTexture2d(Object.assign(Object.assign({},l),{stream:n,timestamp:d}));break;case "detections":r=l;r.stream=n;r.timestamp=d;e.pushDetectionList(r);break;default:throw Error("Unknown input config type: '"+
h.type+"'");}}c.i.send(e);return F(p,c.C,4);case 4:e.delete(),p.g=0;}})};
function oc(a,b,c){var d,e,g,f,k,h,l,n,r,p,m,q,t,w;return H(function(v){switch(v.g){case 1:if(!c)return v.return(b);d={};e=0;g=C(Object.keys(c));for(f=g.next();!f.done;f=g.next())k=f.value,h=c[k],"string"!==typeof h&&"texture"===h.type&&void 0!==b[h.stream]&&++e;1<e&&(a.G=!1);l=C(Object.keys(c));f=l.next();case 2:if(f.done){v.g=4;break}n=f.value;r=c[n];if("string"===typeof r)return t=d,w=n,F(v,pc(a,n,b[r]),14);p=b[r.stream];if("detection_list"===r.type){if(p){var A=p.getRectList();for(var I=p.getLandmarksList(),
D=p.getClassificationsList(),u=[],z=0;z<A.size();++z){var R=xb(A.get(z),Sb,Vb);R={T:{X:W(R,1),Y:W(R,2),height:W(R,3),width:W(R,4),rotation:W(R,5,0),W:rb(R,6)},O:pb(xb(I.get(z),Ob,Rb),Kb,1).map(Yb),M:Xb(xb(D.get(z),Gb,Jb))};u.push(R);}A=u;}else A=[];d[n]=A;v.g=7;break}if("proto_list"===r.type){if(p){A=Array(p.size());for(I=0;I<p.size();I++)A[I]=p.get(I);p.delete();}else A=[];d[n]=A;v.g=7;break}if(void 0===p){v.g=3;break}if("float_list"===r.type){d[n]=p;v.g=7;break}if("proto"===r.type){d[n]=p;v.g=7;break}if("texture"!==
r.type)throw Error("Unknown output config type: '"+r.type+"'");m=a.s[n];m||(m=new $b(a.h,a.D),a.s[n]=m);return F(v,ac(m,p,a.G),13);case 13:q=v.h,d[n]=q;case 7:r.transform&&d[n]&&(d[n]=r.transform(d[n]));v.g=3;break;case 14:t[w]=v.h;case 3:f=l.next();v.g=2;break;case 4:return v.return(d)}})}
function pc(a,b,c){var d;return H(function(e){return "number"===typeof c||c instanceof Uint8Array||c instanceof a.h.Uint8BlobList?e.return(c):c instanceof a.h.Texture2dDataOut?(d=a.s[b],d||(d=new $b(a.h,a.D),a.s[b]=d),e.return(ac(d,c,a.G))):e.return(void 0)})}
function mc(a,b){for(var c=b.name||"$",d=[].concat(ea(b.wants)),e=new a.h.StringList,g=C(b.wants),f=g.next();!f.done;f=g.next())e.push_back(f.value);g=a.h.PacketListener.implement({onResults:function(k){for(var h={},l=0;l<b.wants.length;++l)h[d[l]]=k.get(l);var n=a.listeners[c];n&&(a.C=oc(a,h,b.outs).then(function(r){r=n(r);for(var p=0;p<b.wants.length;++p){var m=h[d[p]];"object"===typeof m&&m.hasOwnProperty&&m.hasOwnProperty("delete")&&m.delete();}r&&(a.C=r);}));}});a.i.attachMultiListener(e,g);e.delete();}
x.onResults=function(a,b){this.listeners[b||"$"]=a;};J("Solution",ic);J("OptionType",{BOOL:0,NUMBER:1,Z:2,0:"BOOL",1:"NUMBER",2:"STRING"});function qc(a){void 0===a&&(a=0);return 1===a?"hand_landmark_full.tflite":"hand_landmark_lite.tflite"}
function rc(a){var b=this;a=a||{};this.g=new ic({locateFile:a.locateFile,files:function(c){return [{url:"hands_solution_packed_assets_loader.js"},{simd:!1,url:"hands_solution_wasm_bin.js"},{simd:!0,url:"hands_solution_simd_wasm_bin.js"},{data:!0,url:qc(c.modelComplexity)}]},graph:{url:"hands.binarypb"},inputs:{image:{type:"video",stream:"input_frames_gpu"}},listeners:[{wants:["multi_hand_landmarks","multi_hand_world_landmarks","image_transformed","multi_handedness"],outs:{image:"image_transformed",
multiHandLandmarks:{type:"proto_list",stream:"multi_hand_landmarks",transform:Zb},multiHandWorldLandmarks:{type:"proto_list",stream:"multi_hand_world_landmarks",transform:Zb},multiHandedness:{type:"proto_list",stream:"multi_handedness",transform:function(c){return c.map(function(d){return Xb(xb(d,Gb,Jb))[0]})}}}}],options:{useCpuInference:{type:0,graphOptionXref:{calculatorType:"InferenceCalculator",fieldName:"use_cpu_inference"},default:"iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform)||
navigator.userAgent.includes("Mac")&&"ontouchend"in document},selfieMode:{type:0,graphOptionXref:{calculatorType:"GlScalerCalculator",calculatorIndex:1,fieldName:"flip_horizontal"}},maxNumHands:{type:1,graphOptionXref:{calculatorType:"ConstantSidePacketCalculator",calculatorName:"ConstantSidePacketCalculator",fieldName:"int_value"}},modelComplexity:{type:1,graphOptionXref:{calculatorType:"ConstantSidePacketCalculator",calculatorName:"ConstantSidePacketCalculatorModelComplexity",fieldName:"int_value"},
onChange:function(c){var d,e,g;return H(function(f){if(1==f.g)return d=qc(c),e="third_party/mediapipe/modules/hand_landmark/"+d,F(f,kc(b.g,d),2);g=f.h;b.g.overrideFile(e,g);return f.return(!0)})}},minDetectionConfidence:{type:1,graphOptionXref:{calculatorType:"TensorsToDetectionsCalculator",calculatorName:"handlandmarktrackinggpu__palmdetectiongpu__TensorsToDetectionsCalculator",fieldName:"min_score_thresh"}},minTrackingConfidence:{type:1,graphOptionXref:{calculatorType:"ThresholdingCalculator",calculatorName:"handlandmarktrackinggpu__handlandmarkgpu__ThresholdingCalculator",
fieldName:"threshold"}}}});}x=rc.prototype;x.close=function(){this.g.close();return Promise.resolve()};x.onResults=function(a){this.g.onResults(a);};x.initialize=function(){var a=this;return H(function(b){return F(b,a.g.initialize(),0)})};x.reset=function(){this.g.reset();};x.send=function(a){var b=this;return H(function(c){return F(c,b.g.send(a),0)})};x.setOptions=function(a){this.g.setOptions(a);};J("Hands",rc);
J("HAND_CONNECTIONS",[[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]]);J("VERSION","0.4.1635986972");}).call(commonjsGlobal);

var hands = {

};

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const ENV = env();
/** Whether to keep intermediate tensors. */
ENV.registerFlag('KEEP_INTERMEDIATE_TENSORS', () => false, debugValue => {
    if (debugValue) {
        console.warn('Keep intermediate tensors is ON. This will print the values of all ' +
            'intermediate tensors during model inference. Not all models ' +
            'support this mode. For details, check e2e/benchmarks/ ' +
            'model_config.js. This significantly impacts performance.');
    }
});

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */
/** DataType enum. */
var DataType;
(function (DataType) {
    // Not a legal value for DataType.  Used to indicate a DataType field
    // has not been set.
    DataType[DataType["DT_INVALID"] = 0] = "DT_INVALID";
    // Data types that all computation devices are expected to be
    // capable to support.
    DataType[DataType["DT_FLOAT"] = 1] = "DT_FLOAT";
    DataType[DataType["DT_DOUBLE"] = 2] = "DT_DOUBLE";
    DataType[DataType["DT_INT32"] = 3] = "DT_INT32";
    DataType[DataType["DT_UINT8"] = 4] = "DT_UINT8";
    DataType[DataType["DT_INT16"] = 5] = "DT_INT16";
    DataType[DataType["DT_INT8"] = 6] = "DT_INT8";
    DataType[DataType["DT_STRING"] = 7] = "DT_STRING";
    DataType[DataType["DT_COMPLEX64"] = 8] = "DT_COMPLEX64";
    DataType[DataType["DT_INT64"] = 9] = "DT_INT64";
    DataType[DataType["DT_BOOL"] = 10] = "DT_BOOL";
    DataType[DataType["DT_QINT8"] = 11] = "DT_QINT8";
    DataType[DataType["DT_QUINT8"] = 12] = "DT_QUINT8";
    DataType[DataType["DT_QINT32"] = 13] = "DT_QINT32";
    DataType[DataType["DT_BFLOAT16"] = 14] = "DT_BFLOAT16";
    DataType[DataType["DT_QINT16"] = 15] = "DT_QINT16";
    DataType[DataType["DT_QUINT16"] = 16] = "DT_QUINT16";
    DataType[DataType["DT_UINT16"] = 17] = "DT_UINT16";
    DataType[DataType["DT_COMPLEX128"] = 18] = "DT_COMPLEX128";
    DataType[DataType["DT_HALF"] = 19] = "DT_HALF";
    DataType[DataType["DT_RESOURCE"] = 20] = "DT_RESOURCE";
    DataType[DataType["DT_VARIANT"] = 21] = "DT_VARIANT";
    DataType[DataType["DT_UINT32"] = 22] = "DT_UINT32";
    DataType[DataType["DT_UINT64"] = 23] = "DT_UINT64";
    // Do not use!  These are only for parameters.  Every enum above
    // should have a corresponding value below (verified by types_test).
    DataType[DataType["DT_FLOAT_REF"] = 101] = "DT_FLOAT_REF";
    DataType[DataType["DT_DOUBLE_REF"] = 102] = "DT_DOUBLE_REF";
    DataType[DataType["DT_INT32_REF"] = 103] = "DT_INT32_REF";
    DataType[DataType["DT_UINT8_REF"] = 104] = "DT_UINT8_REF";
    DataType[DataType["DT_INT16_REF"] = 105] = "DT_INT16_REF";
    DataType[DataType["DT_INT8_REF"] = 106] = "DT_INT8_REF";
    DataType[DataType["DT_STRING_REF"] = 107] = "DT_STRING_REF";
    DataType[DataType["DT_COMPLEX64_REF"] = 108] = "DT_COMPLEX64_REF";
    DataType[DataType["DT_INT64_REF"] = 109] = "DT_INT64_REF";
    DataType[DataType["DT_BOOL_REF"] = 110] = "DT_BOOL_REF";
    DataType[DataType["DT_QINT8_REF"] = 111] = "DT_QINT8_REF";
    DataType[DataType["DT_QUINT8_REF"] = 112] = "DT_QUINT8_REF";
    DataType[DataType["DT_QINT32_REF"] = 113] = "DT_QINT32_REF";
    DataType[DataType["DT_BFLOAT16_REF"] = 114] = "DT_BFLOAT16_REF";
    DataType[DataType["DT_QINT16_REF"] = 115] = "DT_QINT16_REF";
    DataType[DataType["DT_QUINT16_REF"] = 116] = "DT_QUINT16_REF";
    DataType[DataType["DT_UINT16_REF"] = 117] = "DT_UINT16_REF";
    DataType[DataType["DT_COMPLEX128_REF"] = 118] = "DT_COMPLEX128_REF";
    DataType[DataType["DT_HALF_REF"] = 119] = "DT_HALF_REF";
    DataType[DataType["DT_RESOURCE_REF"] = 120] = "DT_RESOURCE_REF";
    DataType[DataType["DT_VARIANT_REF"] = 121] = "DT_VARIANT_REF";
    DataType[DataType["DT_UINT32_REF"] = 122] = "DT_UINT32_REF";
    DataType[DataType["DT_UINT64_REF"] = 123] = "DT_UINT64_REF";
})(DataType || (DataType = {}));
var SaverDef;
(function (SaverDef) {
    (function (CheckpointFormatVersion) {
        CheckpointFormatVersion[CheckpointFormatVersion["LEGACY"] = 0] = "LEGACY";
        CheckpointFormatVersion[CheckpointFormatVersion["V1"] = 1] = "V1";
        CheckpointFormatVersion[CheckpointFormatVersion["V2"] = 2] = "V2";
    })(SaverDef.CheckpointFormatVersion || (SaverDef.CheckpointFormatVersion = {}));
})(SaverDef || (SaverDef = {}));

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const CUSTOM_OPS = {};
/**
 * Retrieve the OpMapper object for the registered op.
 *
 * @param name The Tensorflow Op name.
 *
 * @doc {heading: 'Models', subheading: 'Op Registry'}
 */
function getRegisteredOp(name) {
    return CUSTOM_OPS[name];
}

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function getParamValue(paramName, node, tensorMap, context, resourceManager) {
    const inputParam = node.inputParams[paramName];
    if (inputParam && inputParam.inputIndexStart !== undefined) {
        const start = inputParam.inputIndexStart;
        const end = inputParam.inputIndexEnd === 0 ?
            undefined :
            (inputParam.inputIndexEnd === undefined ? start + 1 :
                inputParam.inputIndexEnd);
        if (inputParam.type === 'tensor') {
            return getTensor(node.inputNames[inputParam.inputIndexStart], tensorMap, context, resourceManager);
        }
        if (inputParam.type === 'tensors') {
            const inputs = node.inputNames.slice(start, end);
            return inputs.map(name => getTensor(name, tensorMap, context, resourceManager));
        }
        const tensor = getTensor(node.inputNames.slice(start)[0], tensorMap, context, resourceManager);
        const data = tensor.dataSync();
        return inputParam.type === 'number' ?
            data[0] :
            toNestedArray(tensor.shape, data);
    }
    const attrParam = node.attrParams[paramName];
    return attrParam && attrParam.value;
}
/**
 * Retrieve the tensor from tensorsMap based on input name.
 * @param name Node input name
 * @param tensorsMap Tensors map keyed by the node
 * @param context contains tensors and information for running the current node.
 * @param resourceManager Optional. Contains global resources of the model.
 */
function getTensor(name, tensorsMap, context, resourceManager) {
    const [nodeName, index] = parseNodeName(name);
    if (resourceManager != null) {
        const tensor = resourceManager.getHashTableHandleByName(nodeName);
        if (tensor != null) {
            return tensor;
        }
    }
    const contextId = context.currentContextIds.find(contextId => {
        return !!tensorsMap[getNodeNameWithContextId(nodeName, contextId)];
    });
    return contextId !== undefined ?
        tensorsMap[getNodeNameWithContextId(nodeName, contextId)][index] :
        undefined;
}
/**
 * Retrieve the tensors based on input name for current context.
 * @param name Node input name
 * @param tensorsMap Tensors map keyed by the node
 */
function getTensorsForCurrentContenxt(name, tensorsMap, context) {
    return tensorsMap[getNodeNameWithContextId(name, context.currentContextId)];
}
/**
 * Returns the node name, outputName and index from the Node input name.
 * @param inputName The input name of the node, in format of
 * node_name:output_index, i.e. MatMul:0, if the output_index is not set, it is
 * default to 0.
 * If the input name contains output name i.e. StringSplit:indices:0, it will
 * return ['StringSplit', 0, 'indices'].
 */
function getNodeNameAndIndex(inputName, context) {
    const [nodeName, index, outputName] = parseNodeName(inputName);
    return [
        getNodeNameWithContextId(nodeName, context && context.currentContextId),
        index, outputName
    ];
}
function getNodeNameWithContextId(name, contextId) {
    return !!contextId ? `${name}-${contextId}` : name;
}
function parseNodeName(name) {
    const parts = name.split(':');
    if (parts.length === 1) {
        return [name, 0, undefined];
    }
    const nodeName = parts[0];
    const outputName = parts.length === 3 ? parts[1] : undefined;
    const index = Number(parts[parts.length - 1]);
    return [nodeName, index, outputName];
}
function getPadding(node, tensorMap, context) {
    let pad = getParamValue('pad', node, tensorMap, context);
    if (pad === 'explicit') {
        // This is 1d array, we need to convert it to 2d array
        pad = getParamValue('explicitPaddings', node, tensorMap, context);
        const explicitPadding = [[0, 0], [0, 0], [0, 0], [0, 0]];
        for (let i = 0; i < 4; i++) {
            explicitPadding[i][0] = pad[i * 2];
            explicitPadding[i][1] = pad[i * 2 + 1];
        }
        return explicitPadding;
    }
    return pad;
}
/**
 *  Reuse the tensor if it is marked as keep, otherwise clone the tensor to
 *  avoid disposal. This is important for TensorArray and TensorList ops, since
 *  internally they use a tensor as the id for TensorArray and TensorList, and
 * to simplify lookup, they also use Tensor.id as the key to the internal map.
 * These id tensors have been marked as kept in the backend, we need avoid clone
 * them in order to create new Tensor.id.
 * @param tensor
 */
function cloneTensor(tensor) {
    return tensor.kept ? tensor : clone(tensor);
}

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json = [
    {
        'tfOpName': 'Add',
        'category': 'arithmetic',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'AddV2',
        'category': 'arithmetic',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'AddN',
        'category': 'arithmetic',
        'inputs': [
            {
                'start': 0,
                'end': 0,
                'name': 'tensors',
                'type': 'tensors'
            }
        ]
    },
    {
        'tfOpName': 'BiasAdd',
        'category': 'arithmetic',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            },
            {
                'tfName': 'data_format',
                'name': 'dataFormat',
                'type': 'string',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Sub',
        'category': 'arithmetic',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'RealDiv',
        'category': 'arithmetic',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Div',
        'category': 'arithmetic',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'DivNoNan',
        'category': 'arithmetic',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'FloorDiv',
        'category': 'arithmetic',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Mul',
        'category': 'arithmetic',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Maximum',
        'category': 'arithmetic',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Minimum',
        'category': 'arithmetic',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Pow',
        'category': 'arithmetic',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'SquaredDifference',
        'category': 'arithmetic',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Mod',
        'category': 'arithmetic',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'FloorMod',
        'category': 'arithmetic',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    }
];

var arithmetic = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json
});

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json$1 = [
    {
        'tfOpName': 'Abs',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Acos',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Asin',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Atan',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Atan2',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'y',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Ceil',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'ClipByValue',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'clipValueMin',
                'type': 'number'
            },
            {
                'start': 2,
                'name': 'clipValueMax',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Complex',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'real',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'imag',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'ComplexAbs',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Cos',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Cosh',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Elu',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Exp',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Floor',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Log',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Imag',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            },
            {
                'tfName': 'Tout',
                'name': 'outputType',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Neg',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Real',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            },
            {
                'tfName': 'Tout',
                'name': 'outputType',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Prelu',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'alpha',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Relu',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Relu6',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Selu',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Sigmoid',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Sin',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Sinh',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Sqrt',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Rsqrt',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Square',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Tan',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Tanh',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Sign',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Round',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Expm1',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Log1p',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Reciprocal',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Softplus',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Asinh',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Acosh',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Atanh',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Erf',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Prod',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'axes',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'keep_dims',
                'name': 'keepDims',
                'type': 'bool',
                'notSupported': true
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'LeakyRelu',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'alpha',
                'name': 'alpha',
                'type': 'number',
                'defaultValue': 0.2
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'IsNan',
        'category': 'basic_math',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    }
];

var basicMath = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json$1
});

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json$2 = [
    {
        'tfOpName': 'EmptyTensorList',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'elementShape',
                'type': 'shape'
            },
            {
                'start': 1,
                'name': 'maxNumElements',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'element_dtype',
                'name': 'elementDType',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'LoopCond',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'pred',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'Switch',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'data',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'pred',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'Merge',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'end': 0,
                'name': 'tensors',
                'type': 'tensors'
            }
        ]
    },
    {
        'tfOpName': 'Enter',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensor',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            },
            {
                'tfName': 'frame_name',
                'name': 'frameName',
                'type': 'string'
            },
            {
                'tfName': 'is_constant',
                'name': 'isConstant',
                'type': 'bool'
            }
        ]
    },
    {
        'tfOpName': 'Exit',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensor',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'NextIteration',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensor',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'TensorArrayV3',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'size',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'dtype',
                'name': 'dtype',
                'type': 'dtype'
            },
            {
                'tfName': 'element_shape',
                'name': 'elementShape',
                'type': 'shape'
            },
            {
                'tfName': 'dynamic_size',
                'name': 'dynamicSize',
                'type': 'bool'
            },
            {
                'tfName': 'clear_after_read',
                'name': 'clearAfterRead',
                'type': 'bool'
            },
            {
                'tfName': 'identical_element_shapes',
                'name': 'identicalElementShapes',
                'type': 'bool'
            },
            {
                'tfName': 'tensor_array_name',
                'name': 'name',
                'type': 'string'
            }
        ]
    },
    {
        'tfOpName': 'TensorArrayWriteV3',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensorArrayId',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'index',
                'type': 'number'
            },
            {
                'start': 2,
                'name': 'tensor',
                'type': 'tensor'
            },
            {
                'start': 3,
                'name': 'flowIn',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'TensorArrayReadV3',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensorArrayId',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'index',
                'type': 'number'
            },
            {
                'start': 2,
                'name': 'flowIn',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'dtype',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'TensorArrayGatherV3',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensorArrayId',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'indices',
                'type': 'number[]'
            },
            {
                'start': 2,
                'name': 'flowIn',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'dtype',
                'name': 'dtype',
                'type': 'dtype'
            },
            {
                'tfName': 'element_shape',
                'name': 'elementShape',
                'type': 'shape'
            }
        ]
    },
    {
        'tfOpName': 'TensorArrayScatterV3',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensorArrayId',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'indices',
                'type': 'number[]'
            },
            {
                'start': 2,
                'name': 'tensor',
                'type': 'tensor'
            },
            {
                'start': 3,
                'name': 'flowIn',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'TensorArrayConcatV3',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensorArrayId',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'flowIn',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'dtype',
                'name': 'dtype',
                'type': 'dtype'
            },
            {
                'tfName': 'element_shape_except0',
                'name': 'elementShapeExcept0',
                'type': 'shape',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'TensorArraySplitV3',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensorArrayId',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'tensor',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'lengths',
                'type': 'number[]'
            },
            {
                'start': 3,
                'name': 'flowIn',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'TensorArraySizeV3',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensorArrayId',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'flowIn',
                'type': 'number'
            }
        ]
    },
    {
        'tfOpName': 'TensorArrayCloseV3',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensorArrayId',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'StatelessIf',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'cond',
                'type': 'tensor'
            },
            {
                'start': 1,
                'end': 0,
                'name': 'args',
                'type': 'tensors'
            }
        ],
        'attrs': [
            {
                'tfName': 'then_branch',
                'name': 'thenBranch',
                'type': 'func'
            },
            {
                'tfName': 'else_branch',
                'name': 'elseBranch',
                'type': 'func'
            }
        ]
    },
    {
        'tfOpName': 'If',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'cond',
                'type': 'tensor'
            },
            {
                'start': 1,
                'end': 0,
                'name': 'args',
                'type': 'tensors'
            }
        ],
        'attrs': [
            {
                'tfName': 'then_branch',
                'name': 'thenBranch',
                'type': 'func'
            },
            {
                'tfName': 'else_branch',
                'name': 'elseBranch',
                'type': 'func'
            }
        ]
    },
    {
        'tfOpName': 'StatelessWhile',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'end': 0,
                'name': 'args',
                'type': 'tensors'
            }
        ],
        'attrs': [
            {
                'tfName': 'cond',
                'name': 'cond',
                'type': 'func'
            },
            {
                'tfName': 'body',
                'name': 'body',
                'type': 'func'
            }
        ]
    },
    {
        'tfOpName': 'While',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'end': 0,
                'name': 'args',
                'type': 'tensors'
            }
        ],
        'attrs': [
            {
                'tfName': 'cond',
                'name': 'cond',
                'type': 'func'
            },
            {
                'tfName': 'body',
                'name': 'body',
                'type': 'func'
            }
        ]
    },
    {
        'tfOpName': 'TensorListScatter',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensor',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'indices',
                'type': 'number[]'
            },
            {
                'start': 2,
                'name': 'elementShape',
                'type': 'shape'
            }
        ],
        'attrs': [
            {
                'tfName': 'element_dtype',
                'name': 'elementDType',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'TensorListScatterV2',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensor',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'indices',
                'type': 'number[]'
            },
            {
                'start': 2,
                'name': 'elementShape',
                'type': 'shape'
            },
            {
                'start': 3,
                'name': 'numElements',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'element_dtype',
                'name': 'elementDType',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'TensorListGather',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensorListId',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'indices',
                'type': 'number[]'
            },
            {
                'start': 2,
                'name': 'elementShape',
                'type': 'shape'
            }
        ],
        'attrs': [
            {
                'tfName': 'element_dtype',
                'name': 'elementDType',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'TensorListGetItem',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensorListId',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'index',
                'type': 'number'
            },
            {
                'start': 2,
                'name': 'elementShape',
                'type': 'shape'
            }
        ],
        'attrs': [
            {
                'tfName': 'element_dtype',
                'name': 'elementDType',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'TensorListSetItem',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensorListId',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'index',
                'type': 'number'
            },
            {
                'start': 2,
                'name': 'tensor',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'element_dtype',
                'name': 'elementDType',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'TensorListReserve',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'elementShape',
                'type': 'shape'
            },
            {
                'start': 1,
                'name': 'numElements',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'element_dtype',
                'name': 'elementDType',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'TensorListFromTensor',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensor',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'elementShape',
                'type': 'shape'
            }
        ],
        'attrs': [
            {
                'tfName': 'element_dtype',
                'name': 'elementDType',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'TensorListStack',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensorListId',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'elementShape',
                'type': 'shape'
            }
        ],
        'attrs': [
            {
                'tfName': 'element_dtype',
                'name': 'elementDType',
                'type': 'dtype'
            },
            {
                'tfName': 'num_elements',
                'name': 'numElements',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'TensorListSplit',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensor',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'elementShape',
                'type': 'shape'
            },
            {
                'start': 2,
                'name': 'lengths',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'element_dtype',
                'name': 'elementDType',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'TensorListConcat',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensorListId',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'element_shape',
                'name': 'elementShape',
                'type': 'shape'
            },
            {
                'tfName': 'element_dtype',
                'name': 'elementDType',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'TensorListPopBack',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensorListId',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'elementShape',
                'type': 'shape'
            }
        ],
        'attrs': [
            {
                'tfName': 'element_dtype',
                'name': 'elementDType',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'TensorListPushBack',
        'category': 'control',
        'inputs': [
            {
                'start': 0,
                'name': 'tensorListId',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'tensor',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'element_dtype',
                'name': 'elementDType',
                'type': 'dtype'
            }
        ]
    }
];

var control = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json$2
});

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json$3 = [
    {
        'tfOpName': 'AvgPool',
        'category': 'convolution',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'strides',
                'name': 'strides',
                'type': 'number[]'
            },
            {
                'tfName': 'padding',
                'name': 'pad',
                'type': 'string'
            },
            {
                'tfName': 'data_format',
                'name': 'dataFormat',
                'type': 'string',
                'notSupported': true
            },
            {
                'tfName': 'ksize',
                'name': 'kernelSize',
                'type': 'number[]'
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'MaxPool',
        'category': 'convolution',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'strides',
                'name': 'strides',
                'type': 'number[]'
            },
            {
                'tfName': 'padding',
                'name': 'pad',
                'type': 'string'
            },
            {
                'tfName': 'data_format',
                'name': 'dataFormat',
                'type': 'string',
                'notSupported': true
            },
            {
                'tfName': 'ksize',
                'name': 'kernelSize',
                'type': 'number[]'
            },
            {
                'tfName': 'explicit_paddings',
                'name': 'explicitPaddings',
                'type': 'number[]',
                'defaultValue': [],
                'notSupported': true
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'MaxPoolWithArgmax',
        'category': 'convolution',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'strides',
                'name': 'strides',
                'type': 'number[]'
            },
            {
                'tfName': 'padding',
                'name': 'pad',
                'type': 'string'
            },
            {
                'tfName': 'ksize',
                'name': 'kernelSize',
                'type': 'number[]'
            },
            {
                'tfName': 'include_batch_in_index',
                'name': 'includeBatchInIndex',
                'type': 'bool'
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'AvgPool3D',
        'category': 'convolution',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'strides',
                'name': 'strides',
                'type': 'number[]'
            },
            {
                'tfName': 'padding',
                'name': 'pad',
                'type': 'string'
            },
            {
                'tfName': 'data_format',
                'name': 'dataFormat',
                'type': 'string',
                'notSupported': true
            },
            {
                'tfName': 'ksize',
                'name': 'kernelSize',
                'type': 'number[]'
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'MaxPool3D',
        'category': 'convolution',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'strides',
                'name': 'strides',
                'type': 'number[]'
            },
            {
                'tfName': 'padding',
                'name': 'pad',
                'type': 'string'
            },
            {
                'tfName': 'data_format',
                'name': 'dataFormat',
                'type': 'string',
                'notSupported': true
            },
            {
                'tfName': 'ksize',
                'name': 'kernelSize',
                'type': 'number[]'
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Conv1D',
        'category': 'convolution',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'filter',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'stride',
                'name': 'stride',
                'type': 'number'
            },
            {
                'tfName': 'padding',
                'name': 'pad',
                'type': 'string'
            },
            {
                'tfName': 'data_format',
                'name': 'dataFormat',
                'type': 'string',
                'defaultValue': 'NWC'
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            },
            {
                'tfName': 'dilation',
                'name': 'dilation',
                'type': 'number',
                'defaultValue': 1
            }
        ]
    },
    {
        'tfOpName': 'Conv2D',
        'category': 'convolution',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'filter',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            },
            {
                'tfName': 'strides',
                'name': 'strides',
                'type': 'number[]'
            },
            {
                'tfName': 'padding',
                'name': 'pad',
                'type': 'string'
            },
            {
                'tfName': 'useCudnnOnGpu',
                'name': 'useCudnnOnGpu',
                'type': 'bool'
            },
            {
                'tfName': 'data_format',
                'name': 'dataFormat',
                'type': 'string',
                'defaultValue': 'NHWC'
            },
            {
                'tfName': 'explicit_paddings',
                'name': 'explicitPaddings',
                'type': 'number[]',
                'defaultValue': []
            },
            {
                'tfName': 'dilations',
                'name': 'dilations',
                'type': 'number[]'
            }
        ]
    },
    {
        'tfOpName': '_FusedConv2D',
        'category': 'convolution',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'filter',
                'type': 'tensor'
            },
            {
                'start': 2,
                'end': 0,
                'name': 'args',
                'type': 'tensors'
            }
        ],
        'attrs': [
            {
                'tfName': 'num_args',
                'name': 'numArgs',
                'type': 'number'
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            },
            {
                'tfName': 'strides',
                'name': 'strides',
                'type': 'number[]'
            },
            {
                'tfName': 'padding',
                'name': 'pad',
                'type': 'string'
            },
            {
                'tfName': 'explicit_paddings',
                'name': 'explicitPaddings',
                'type': 'number[]',
                'defaultValue': []
            },
            {
                'tfName': 'use_cudnn_on_gpu',
                'name': 'useCudnnOnGpu',
                'type': 'bool',
                'defaultValue': true
            },
            {
                'tfName': 'data_format',
                'name': 'dataFormat',
                'type': 'string',
                'defaultValue': 'NHWC'
            },
            {
                'tfName': 'dilations',
                'name': 'dilations',
                'type': 'number[]',
                'defaultValue': [
                    1,
                    1,
                    1,
                    1
                ]
            },
            {
                'tfName': 'fused_ops',
                'name': 'fusedOps',
                'type': 'string[]',
                'defaultValue': []
            },
            {
                'tfName': 'epsilon',
                'name': 'epsilon',
                'type': 'number',
                'defaultValue': 0.0001
            },
            {
                'tfName': 'leakyrelu_alpha',
                'name': 'leakyreluAlpha',
                'type': 'number'
            }
        ]
    },
    {
        'tfOpName': 'Conv2DBackpropInput',
        'category': 'convolution',
        'inputs': [
            {
                'start': 2,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'filter',
                'type': 'tensor'
            },
            {
                'start': 0,
                'name': 'outputShape',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'strides',
                'name': 'strides',
                'type': 'number[]'
            },
            {
                'tfName': 'padding',
                'name': 'pad',
                'type': 'string'
            },
            {
                'tfName': 'data_format',
                'name': 'dataFormat',
                'type': 'string',
                'notSupported': true
            },
            {
                'tfName': 'explicit_paddings',
                'name': 'explicitPaddings',
                'type': 'number[]',
                'defaultValue': []
            },
            {
                'tfName': 'dilations',
                'name': 'dilations',
                'type': 'number[]',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'DepthwiseConv2d',
        'category': 'convolution',
        'inputs': [
            {
                'start': 0,
                'name': 'input',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'filter',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'strides',
                'name': 'strides',
                'type': 'number[]'
            },
            {
                'tfName': 'padding',
                'name': 'pad',
                'type': 'string'
            },
            {
                'tfName': 'data_format',
                'name': 'dataFormat',
                'type': 'string',
                'defaultValue': 'NHWC'
            },
            {
                'tfName': 'explicit_paddings',
                'name': 'explicitPaddings',
                'type': 'number[]',
                'defaultValue': []
            },
            {
                'tfName': 'dilations',
                'name': 'dilations',
                'type': 'number[]'
            }
        ]
    },
    {
        'tfOpName': 'DepthwiseConv2dNative',
        'category': 'convolution',
        'inputs': [
            {
                'start': 0,
                'name': 'input',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'filter',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'strides',
                'name': 'strides',
                'type': 'number[]'
            },
            {
                'tfName': 'padding',
                'name': 'pad',
                'type': 'string'
            },
            {
                'tfName': 'data_format',
                'name': 'dataFormat',
                'type': 'string',
                'defaultValue': 'NHWC'
            },
            {
                'tfName': 'explicit_paddings',
                'name': 'explicitPaddings',
                'type': 'number[]',
                'defaultValue': []
            },
            {
                'tfName': 'dilations',
                'name': 'dilations',
                'type': 'number[]'
            }
        ]
    },
    {
        'tfOpName': 'FusedDepthwiseConv2dNative',
        'category': 'convolution',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'filter',
                'type': 'tensor'
            },
            {
                'start': 2,
                'end': 0,
                'name': 'args',
                'type': 'tensors'
            }
        ],
        'attrs': [
            {
                'tfName': 'num_args',
                'name': 'numArgs',
                'type': 'number'
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            },
            {
                'tfName': 'strides',
                'name': 'strides',
                'type': 'number[]'
            },
            {
                'tfName': 'padding',
                'name': 'pad',
                'type': 'string'
            },
            {
                'tfName': 'data_format',
                'name': 'dataFormat',
                'type': 'string',
                'defaultValue': 'NHWC'
            },
            {
                'tfName': 'dilations',
                'name': 'dilations',
                'type': 'number[]',
                'defaultValue': [
                    1,
                    1,
                    1,
                    1
                ]
            },
            {
                'tfName': 'fused_ops',
                'name': 'fusedOps',
                'type': 'string[]',
                'defaultValue': []
            },
            {
                'tfName': 'explicit_paddings',
                'name': 'explicitPaddings',
                'type': 'number[]',
                'defaultValue': []
            }
        ]
    },
    {
        'tfOpName': 'Conv3D',
        'category': 'convolution',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'filter',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'strides',
                'name': 'strides',
                'type': 'number[]'
            },
            {
                'tfName': 'padding',
                'name': 'pad',
                'type': 'string'
            },
            {
                'tfName': 'data_format',
                'name': 'dataFormat',
                'type': 'string',
                'defaultValue': 'NHWC'
            },
            {
                'tfName': 'dilations',
                'name': 'dilations',
                'type': 'number[]'
            }
        ]
    },
    {
        'tfOpName': 'Dilation2D',
        'category': 'convolution',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'filter',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'strides',
                'name': 'strides',
                'type': 'number[]'
            },
            {
                'tfName': 'rates',
                'name': 'dilations',
                'type': 'number[]'
            },
            {
                'tfName': 'padding',
                'name': 'pad',
                'type': 'string'
            }
        ]
    }
];

var convolution = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json$3
});

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json$4 = [
    {
        'tfOpName': 'Fill',
        'category': 'creation',
        'inputs': [
            {
                'start': 0,
                'name': 'shape',
                'type': 'number[]'
            },
            {
                'start': 1,
                'name': 'value',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'LinSpace',
        'category': 'creation',
        'inputs': [
            {
                'start': 0,
                'name': 'start',
                'type': 'number'
            },
            {
                'start': 1,
                'name': 'stop',
                'type': 'number'
            },
            {
                'start': 2,
                'name': 'num',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'OneHot',
        'category': 'creation',
        'inputs': [
            {
                'start': 0,
                'name': 'indices',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'depth',
                'type': 'number'
            },
            {
                'start': 2,
                'name': 'onValue',
                'type': 'number',
                'defaultValue': 1
            },
            {
                'start': 3,
                'name': 'offValue',
                'type': 'number',
                'defaultValue': 0
            }
        ],
        'attrs': [
            {
                'tfName': 'axis',
                'name': 'axis',
                'type': 'number',
                'notSupported': true
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Ones',
        'category': 'creation',
        'inputs': [
            {
                'start': 0,
                'name': 'shape',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'OnesLike',
        'category': 'creation',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'dtype',
                'name': 'dtype',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'RandomUniform',
        'category': 'creation',
        'inputs': [
            {
                'start': 0,
                'name': 'shape',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'minval',
                'name': 'minval',
                'type': 'number',
                'defaultValue': 0
            },
            {
                'tfName': 'maxval',
                'name': 'maxval',
                'type': 'number',
                'defaultValue': 1
            },
            {
                'tfName': 'dtype',
                'name': 'dtype',
                'type': 'dtype'
            },
            {
                'tfName': 'seed',
                'name': 'seed',
                'type': 'number',
                'defaultValue': 0
            },
            {
                'tfName': 'seed2',
                'name': 'seed2',
                'type': 'number',
                'defaultValue': 0,
                'notSupported': true
            },
            {
                'tfName': 'T',
                'name': 'T',
                'type': 'number',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Range',
        'category': 'creation',
        'inputs': [
            {
                'start': 0,
                'name': 'start',
                'type': 'number'
            },
            {
                'start': 1,
                'name': 'stop',
                'type': 'number'
            },
            {
                'start': 2,
                'name': 'step',
                'type': 'number',
                'defaultValue': 0
            }
        ],
        'attrs': [
            {
                'tfName': 'Tidx',
                'name': 'dtype',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'TruncatedNormal',
        'category': 'creation',
        'inputs': [
            {
                'start': 0,
                'name': 'shape',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'means',
                'name': 'mean',
                'type': 'number',
                'defaultValue': 0
            },
            {
                'tfName': 'stddev',
                'name': 'stdDev',
                'type': 'number',
                'defaultValue': 1
            },
            {
                'tfName': 'seed',
                'name': 'seed',
                'type': 'number'
            },
            {
                'tfName': 'seed2',
                'name': 'seed2',
                'type': 'number',
                'defaultValue': 0,
                'notSupported': true
            },
            {
                'tfName': 'dtype',
                'name': 'dtype',
                'type': 'dtype'
            },
            {
                'tfName': 'T',
                'name': 'T',
                'type': 'number',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Zeros',
        'category': 'creation',
        'inputs': [
            {
                'start': 0,
                'name': 'shape',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'ZerosLike',
        'category': 'creation',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'Multinomial',
        'category': 'creation',
        'inputs': [
            {
                'start': 0,
                'name': 'logits',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'numSamples',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'seed',
                'name': 'seed',
                'type': 'number'
            },
            {
                'tfName': 'seed2',
                'name': 'seed2',
                'type': 'number'
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype'
            },
            {
                'tfName': 'output_dtype',
                'name': 'output_dtype',
                'type': 'dtype'
            }
        ]
    }
];

var creation = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json$4
});

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json$5 = [
    {
        'tfOpName': 'NonMaxSuppressionV2',
        'category': 'dynamic',
        'inputs': [
            {
                'start': 0,
                'name': 'boxes',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'scores',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'maxOutputSize',
                'type': 'number'
            },
            {
                'start': 3,
                'name': 'iouThreshold',
                'type': 'number'
            }
        ]
    },
    {
        'tfOpName': 'NonMaxSuppressionV3',
        'category': 'dynamic',
        'inputs': [
            {
                'start': 0,
                'name': 'boxes',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'scores',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'maxOutputSize',
                'type': 'number'
            },
            {
                'start': 3,
                'name': 'iouThreshold',
                'type': 'number'
            },
            {
                'start': 4,
                'name': 'scoreThreshold',
                'type': 'number'
            }
        ]
    },
    {
        'tfOpName': 'NonMaxSuppressionV4',
        'category': 'dynamic',
        'inputs': [
            {
                'start': 0,
                'name': 'boxes',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'scores',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'maxOutputSize',
                'type': 'number'
            },
            {
                'start': 3,
                'name': 'iouThreshold',
                'type': 'number'
            },
            {
                'start': 4,
                'name': 'scoreThreshold',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            },
            {
                'tfName': 'T_threshold',
                'name': 'threshold',
                'type': 'dtype',
                'notSupported': true
            },
            {
                'tfName': 'pad_to_max_output_size',
                'name': 'padToMaxOutputSize',
                'type': 'bool'
            }
        ]
    },
    {
        'tfOpName': 'NonMaxSuppressionV5',
        'category': 'dynamic',
        'inputs': [
            {
                'start': 0,
                'name': 'boxes',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'scores',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'maxOutputSize',
                'type': 'number'
            },
            {
                'start': 3,
                'name': 'iouThreshold',
                'type': 'number'
            },
            {
                'start': 4,
                'name': 'scoreThreshold',
                'type': 'number'
            },
            {
                'start': 5,
                'name': 'softNmsSigma',
                'type': 'number'
            }
        ]
    },
    {
        'tfOpName': 'Where',
        'category': 'dynamic',
        'inputs': [
            {
                'start': 0,
                'name': 'condition',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'ListDiff',
        'category': 'dynamic',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'y',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    }
];

var dynamic = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json$5
});

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json$6 = [
    {
        'tfOpName': 'TopKV2',
        'category': 'evaluation',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'k',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'sorted',
                'name': 'sorted',
                'type': 'bool'
            }
        ]
    },
    {
        'tfOpName': 'Unique',
        'category': 'evaluation',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'UniqueV2',
        'category': 'evaluation',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'axis',
                'type': 'number'
            }
        ]
    }
];

var evaluation = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json$6
});

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json$7 = [
    {
        'tfOpName': 'PlaceholderWithDefault',
        'category': 'graph',
        'inputs': [
            {
                'start': 0,
                'name': 'default',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'shape',
                'name': 'shape',
                'type': 'shape'
            },
            {
                'tfName': 'dtype',
                'name': 'dtype',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'Placeholder',
        'category': 'graph',
        'attrs': [
            {
                'tfName': 'shape',
                'name': 'shape',
                'type': 'shape'
            },
            {
                'tfName': 'dtype',
                'name': 'dtype',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'Const',
        'category': 'graph'
    },
    {
        'tfOpName': 'Identity',
        'category': 'graph',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'IdentityN',
        'category': 'graph',
        'inputs': [
            {
                'start': 0,
                'end': 0,
                'name': 'x',
                'type': 'tensors'
            }
        ]
    },
    {
        'tfOpName': 'Snapshot',
        'category': 'graph',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'Rank',
        'category': 'graph',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'Size',
        'category': 'graph',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'Shape',
        'category': 'graph',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'ShapeN',
        'category': 'graph',
        'inputs': [
            {
                'start': 0,
                'end': 0,
                'name': 'x',
                'type': 'tensors'
            }
        ]
    },
    {
        'tfOpName': 'Print',
        'category': 'graph',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'data',
                'type': 'tensors'
            }
        ],
        'attrs': [
            {
                'tfName': 'message',
                'name': 'message',
                'type': 'string'
            },
            {
                'tfName': 'first_n',
                'name': 'firstN',
                'type': 'number',
                'notSupported': true
            },
            {
                'tfName': 'summarize',
                'name': 'summarize',
                'type': 'number',
                'defaultValue': 3
            }
        ]
    },
    {
        'tfOpName': 'NoOp',
        'category': 'graph',
        'inputs': []
    },
    {
        'tfOpName': 'StopGradient',
        'category': 'graph',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'FakeQuantWithMinMaxVars',
        'category': 'graph',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'min',
                'name': 'min',
                'type': 'number'
            },
            {
                'tfName': 'max',
                'name': 'max',
                'type': 'number'
            }
        ]
    }
];

var graph = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json$7
});

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json$8 = [
    {
        'tfOpName': 'HashTable',
        'category': 'hash_table',
        'inputs': [],
        'attrs': [
            {
                'tfName': 'shared_name',
                'name': 'sharedName',
                'type': 'string'
            },
            {
                'tfName': 'use_node_name_sharing',
                'name': 'useNodeNameSharing',
                'type': 'bool'
            },
            {
                'tfName': 'key_dtype',
                'name': 'keyDType',
                'type': 'dtype'
            },
            {
                'tfName': 'value_dtype',
                'name': 'valueDType',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'HashTableV2',
        'category': 'hash_table',
        'inputs': [],
        'attrs': [
            {
                'tfName': 'shared_name',
                'name': 'sharedName',
                'type': 'string'
            },
            {
                'tfName': 'use_node_name_sharing',
                'name': 'useNodeNameSharing',
                'type': 'bool'
            },
            {
                'tfName': 'key_dtype',
                'name': 'keyDType',
                'type': 'dtype'
            },
            {
                'tfName': 'value_dtype',
                'name': 'valueDType',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'LookupTableImport',
        'category': 'hash_table',
        'inputs': [
            {
                'start': 0,
                'name': 'tableHandle',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'keys',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'values',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'Tin',
                'name': 'tIn',
                'type': 'dtype',
                'notSupported': true
            },
            {
                'tfName': 'Tout',
                'name': 'tOut',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'LookupTableImportV2',
        'category': 'hash_table',
        'inputs': [
            {
                'start': 0,
                'name': 'tableHandle',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'keys',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'values',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'Tin',
                'name': 'tIn',
                'type': 'dtype',
                'notSupported': true
            },
            {
                'tfName': 'Tout',
                'name': 'tOut',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'LookupTableFind',
        'category': 'hash_table',
        'inputs': [
            {
                'start': 0,
                'name': 'tableHandle',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'keys',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'defaultValue',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'Tin',
                'name': 'tIn',
                'type': 'dtype',
                'notSupported': true
            },
            {
                'tfName': 'Tout',
                'name': 'tOut',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'LookupTableFindV2',
        'category': 'hash_table',
        'inputs': [
            {
                'start': 0,
                'name': 'tableHandle',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'keys',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'defaultValue',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'Tin',
                'name': 'tIn',
                'type': 'dtype',
                'notSupported': true
            },
            {
                'tfName': 'Tout',
                'name': 'tOut',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'LookupTableSize',
        'category': 'hash_table',
        'inputs': [
            {
                'start': 0,
                'name': 'tableHandle',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'LookupTableSizeV2',
        'category': 'hash_table',
        'inputs': [
            {
                'start': 0,
                'name': 'tableHandle',
                'type': 'tensor'
            }
        ]
    }
];

var hashTable = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json$8
});

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json$9 = [
    {
        'tfOpName': 'ResizeBilinear',
        'category': 'image',
        'inputs': [
            {
                'start': 0,
                'name': 'images',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'size',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'align_corners',
                'name': 'alignCorners',
                'type': 'bool'
            },
            {
                'tfName': 'half_pixel_centers',
                'name': 'halfPixelCenters',
                'type': 'bool'
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'ResizeNearestNeighbor',
        'category': 'image',
        'inputs': [
            {
                'start': 0,
                'name': 'images',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'size',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'align_corners',
                'name': 'alignCorners',
                'type': 'bool'
            },
            {
                'tfName': 'half_pixel_centers',
                'name': 'halfPixelCenters',
                'type': 'bool'
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'CropAndResize',
        'category': 'image',
        'inputs': [
            {
                'start': 0,
                'name': 'image',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'boxes',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'boxInd',
                'type': 'tensor'
            },
            {
                'start': 3,
                'name': 'cropSize',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'method',
                'name': 'method',
                'type': 'string'
            },
            {
                'tfName': 'extrapolation_value',
                'name': 'extrapolationValue',
                'type': 'number'
            }
        ]
    }
];

var image = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json$9
});

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json$a = [
    {
        'tfOpName': 'Equal',
        'category': 'logical',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'NotEqual',
        'category': 'logical',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Greater',
        'category': 'logical',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'GreaterEqual',
        'category': 'logical',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Less',
        'category': 'logical',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'LessEqual',
        'category': 'logical',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'LogicalAnd',
        'category': 'logical',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'LogicalNot',
        'category': 'logical',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'LogicalOr',
        'category': 'logical',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Select',
        'category': 'logical',
        'inputs': [
            {
                'start': 0,
                'name': 'condition',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'SelectV2',
        'category': 'logical',
        'inputs': [
            {
                'start': 0,
                'name': 'condition',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    }
];

var logical = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json$a
});

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json$b = [
    {
        'tfOpName': '_FusedMatMul',
        'category': 'matrices',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            },
            {
                'start': 2,
                'end': 0,
                'name': 'args',
                'type': 'tensors'
            }
        ],
        'attrs': [
            {
                'tfName': 'num_args',
                'name': 'numArgs',
                'type': 'number'
            },
            {
                'tfName': 'fused_ops',
                'name': 'fusedOps',
                'type': 'string[]',
                'defaultValue': []
            },
            {
                'tfName': 'epsilon',
                'name': 'epsilon',
                'type': 'number',
                'defaultValue': 0.0001
            },
            {
                'tfName': 'transpose_a',
                'name': 'transposeA',
                'type': 'bool',
                'defaultValue': false
            },
            {
                'tfName': 'transpose_b',
                'name': 'transposeB',
                'type': 'bool',
                'defaultValue': false
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'MatMul',
        'category': 'matrices',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'transpose_a',
                'name': 'transposeA',
                'type': 'bool',
                'defaultValue': false
            },
            {
                'tfName': 'transpose_b',
                'name': 'transposeB',
                'type': 'bool',
                'defaultValue': false
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'BatchMatMul',
        'category': 'matrices',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'adj_x',
                'name': 'transposeA',
                'type': 'bool',
                'defaultValue': false
            },
            {
                'tfName': 'adj_y',
                'name': 'transposeB',
                'type': 'bool',
                'defaultValue': false
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'BatchMatMulV2',
        'category': 'matrices',
        'inputs': [
            {
                'start': 0,
                'name': 'a',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'b',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'adj_x',
                'name': 'transposeA',
                'type': 'bool',
                'defaultValue': false
            },
            {
                'tfName': 'adj_y',
                'name': 'transposeB',
                'type': 'bool',
                'defaultValue': false
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Transpose',
        'category': 'matrices',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'perm',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Einsum',
        'category': 'matrices',
        'inputs': [
            {
                'start': 0,
                'end': 0,
                'name': 'tensors',
                'type': 'tensors'
            }
        ],
        'attrs': [
            {
                'tfName': 'equation',
                'name': 'equation',
                'type': 'string'
            },
            {
                'tfName': 'N',
                'name': 'n',
                'type': 'number',
                'defaultValue': 2
            },
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype'
            }
        ]
    }
];

var matrices = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json$b
});

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json$c = [
    {
        'tfOpName': 'FusedBatchNorm',
        'category': 'normalization',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'scale',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'offset',
                'type': 'tensor'
            },
            {
                'start': 3,
                'name': 'mean',
                'type': 'tensor'
            },
            {
                'start': 4,
                'name': 'variance',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'epsilon',
                'name': 'epsilon',
                'type': 'number',
                'defaultValue': 0.001
            },
            {
                'tfName': 'data_format',
                'name': 'dataFormat',
                'type': 'string',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'FusedBatchNormV2',
        'category': 'normalization',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'scale',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'offset',
                'type': 'tensor'
            },
            {
                'start': 3,
                'name': 'mean',
                'type': 'tensor'
            },
            {
                'start': 4,
                'name': 'variance',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'epsilon',
                'name': 'epsilon',
                'type': 'number',
                'defaultValue': 0.001
            },
            {
                'tfName': 'data_format',
                'name': 'dataFormat',
                'type': 'string',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'FusedBatchNormV3',
        'category': 'normalization',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'scale',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'offset',
                'type': 'tensor'
            },
            {
                'start': 3,
                'name': 'mean',
                'type': 'tensor'
            },
            {
                'start': 4,
                'name': 'variance',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'epsilon',
                'name': 'epsilon',
                'type': 'number',
                'defaultValue': 0.001
            },
            {
                'tfName': 'data_format',
                'name': 'dataFormat',
                'type': 'string',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'LRN',
        'category': 'normalization',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'depth_radius',
                'name': 'radius',
                'type': 'number',
                'defaultValue': 5
            },
            {
                'tfName': 'bias',
                'name': 'bias',
                'type': 'number',
                'defaultValue': 1
            },
            {
                'tfName': 'alpha',
                'name': 'alpha',
                'type': 'number',
                'defaultValue': 1
            },
            {
                'tfName': 'beta',
                'name': 'beta',
                'type': 'number',
                'defaultValue': 0.5
            }
        ]
    },
    {
        'tfOpName': 'Softmax',
        'category': 'normalization',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'LogSoftmax',
        'category': 'normalization',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'SparseToDense',
        'category': 'normalization',
        'inputs': [
            {
                'start': 0,
                'name': 'sparseIndices',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'outputShape',
                'type': 'number[]'
            },
            {
                'start': 2,
                'name': 'sparseValues',
                'type': 'tensor'
            },
            {
                'start': 3,
                'name': 'defaultValue',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'validate_indices',
                'name': 'validateIndices',
                'type': 'bool',
                'defaultValue': true,
                'notSupported': true
            }
        ]
    }
];

var normalization = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json$c
});

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json$d = [
    {
        'tfOpName': 'Bincount',
        'category': 'reduction',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'size',
                'type': 'number'
            },
            {
                'start': 2,
                'name': 'weights',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'DenseBincount',
        'category': 'reduction',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'size',
                'type': 'number'
            },
            {
                'start': 2,
                'name': 'weights',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'binary_output',
                'name': 'binaryOutput',
                'type': 'bool'
            }
        ]
    },
    {
        'tfOpName': 'Max',
        'category': 'reduction',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'axis',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'keep_dims',
                'name': 'keepDims',
                'type': 'bool'
            }
        ]
    },
    {
        'tfOpName': 'Mean',
        'category': 'reduction',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'axis',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'keep_dims',
                'name': 'keepDims',
                'type': 'bool'
            }
        ]
    },
    {
        'tfOpName': 'Min',
        'category': 'reduction',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'axis',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'keep_dims',
                'name': 'keepDims',
                'type': 'bool'
            }
        ]
    },
    {
        'tfOpName': 'Sum',
        'category': 'reduction',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'axis',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'keep_dims',
                'name': 'keepDims',
                'type': 'bool'
            }
        ]
    },
    {
        'tfOpName': 'All',
        'category': 'reduction',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'axis',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'keep_dims',
                'name': 'keepDims',
                'type': 'bool'
            }
        ]
    },
    {
        'tfOpName': 'Any',
        'category': 'reduction',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'axis',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'keep_dims',
                'name': 'keepDims',
                'type': 'bool'
            }
        ]
    },
    {
        'tfOpName': 'ArgMax',
        'category': 'reduction',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'axis',
                'type': 'number'
            }
        ]
    },
    {
        'tfOpName': 'ArgMin',
        'category': 'reduction',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'axis',
                'type': 'number'
            }
        ]
    },
    {
        'tfOpName': 'Prod',
        'category': 'reduction',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'axis',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'keep_dims',
                'name': 'keepDims',
                'type': 'bool'
            }
        ]
    },
    {
        'tfOpName': 'Cumsum',
        'category': 'reduction',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'axis',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'exclusive',
                'name': 'exclusive',
                'type': 'bool'
            },
            {
                'tfName': 'reverse',
                'name': 'reverse',
                'type': 'bool'
            }
        ]
    }
];

var reduction = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json$d
});

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json$e = [
    {
        'tfOpName': 'ConcatV2',
        'category': 'slice_join',
        'inputs': [
            {
                'start': 0,
                'end': -1,
                'name': 'tensors',
                'type': 'tensors'
            },
            {
                'start': -1,
                'name': 'axis',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'N',
                'name': 'n',
                'type': 'number',
                'defaultValue': 2
            }
        ]
    },
    {
        'tfOpName': 'Concat',
        'category': 'slice_join',
        'inputs': [
            {
                'start': 1,
                'end': 0,
                'name': 'tensors',
                'type': 'tensors'
            },
            {
                'start': 0,
                'name': 'axis',
                'type': 'number'
            }
        ],
        'attrs': [
            {
                'tfName': 'N',
                'name': 'n',
                'type': 'number',
                'defaultValue': 2
            }
        ]
    },
    {
        'tfOpName': 'GatherV2',
        'category': 'slice_join',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'indices',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'axis',
                'type': 'number',
                'defaultValue': 0
            }
        ],
        'attrs': [
            {
                'tfName': 'batch_dims',
                'name': 'batchDims',
                'type': 'number',
                'defaultValue': 0
            }
        ]
    },
    {
        'tfOpName': 'Gather',
        'category': 'slice_join',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'indices',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'validate_indices',
                'name': 'validateIndices',
                'type': 'bool',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Reverse',
        'category': 'slice_join',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'dims',
                'type': 'bool[]'
            }
        ]
    },
    {
        'tfOpName': 'ReverseV2',
        'category': 'slice_join',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'axis',
                'type': 'number[]'
            }
        ]
    },
    {
        'tfOpName': 'Slice',
        'category': 'slice_join',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'begin',
                'type': 'number[]'
            },
            {
                'start': 2,
                'name': 'size',
                'type': 'number[]'
            }
        ]
    },
    {
        'tfOpName': 'StridedSlice',
        'category': 'slice_join',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'begin',
                'type': 'number[]'
            },
            {
                'start': 2,
                'name': 'end',
                'type': 'number[]'
            },
            {
                'start': 3,
                'name': 'strides',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'begin_mask',
                'name': 'beginMask',
                'type': 'number',
                'defaultValue': 0
            },
            {
                'tfName': 'end_mask',
                'name': 'endMask',
                'type': 'number',
                'defaultValue': 0
            },
            {
                'tfName': 'new_axis_mask',
                'name': 'newAxisMask',
                'type': 'number',
                'defaultValue': 0
            },
            {
                'tfName': 'ellipsis_mask',
                'name': 'ellipsisMask',
                'type': 'number',
                'defaultValue': 0
            },
            {
                'tfName': 'shrink_axis_mask',
                'name': 'shrinkAxisMask',
                'type': 'number',
                'defaultValue': 0
            }
        ]
    },
    {
        'tfOpName': 'Pack',
        'category': 'slice_join',
        'inputs': [
            {
                'start': 0,
                'end': 0,
                'name': 'tensors',
                'type': 'tensors'
            }
        ],
        'attrs': [
            {
                'tfName': 'axis',
                'name': 'axis',
                'type': 'number',
                'defaultValue': 0
            }
        ]
    },
    {
        'tfOpName': 'Unpack',
        'category': 'slice_join',
        'inputs': [
            {
                'start': 0,
                'name': 'tensor',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'axis',
                'name': 'axis',
                'type': 'number',
                'defaultValue': 0
            },
            {
                'tfName': 'num',
                'name': 'num',
                'type': 'number',
                'defaultValue': 0,
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Tile',
        'category': 'slice_join',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'reps',
                'type': 'number[]'
            }
        ]
    },
    {
        'tfOpName': 'Split',
        'category': 'slice_join',
        'inputs': [
            {
                'start': 0,
                'name': 'axis',
                'type': 'number',
                'defaultValue': 0
            },
            {
                'start': 1,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'num_split',
                'name': 'numOrSizeSplits',
                'type': 'number',
                'defaultValue': 1
            }
        ]
    },
    {
        'tfOpName': 'SplitV',
        'category': 'slice_join',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'numOrSizeSplits',
                'type': 'number[]'
            },
            {
                'start': 2,
                'name': 'axis',
                'type': 'number',
                'defaultValue': 0
            }
        ]
    },
    {
        'tfOpName': 'ScatterNd',
        'category': 'slice_join',
        'inputs': [
            {
                'start': 0,
                'name': 'indices',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'values',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'shape',
                'type': 'number[]'
            }
        ]
    },
    {
        'tfOpName': 'GatherNd',
        'category': 'slice_join',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'indices',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'SparseToDense',
        'category': 'slice_join',
        'inputs': [
            {
                'start': 0,
                'name': 'sparseIndices',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'outputShape',
                'type': 'number[]'
            },
            {
                'start': 2,
                'name': 'sparseValues',
                'type': 'tensor'
            },
            {
                'start': 3,
                'name': 'defaultValue',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'validate_indices',
                'name': 'validateIndices',
                'type': 'bool',
                'defaultValue': false,
                'notSupported': true
            }
        ]
    }
];

var sliceJoin = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json$e
});

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json$f = [
    {
        'tfOpName': 'SparseFillEmptyRows',
        'category': 'sparse',
        'inputs': [
            {
                'start': 0,
                'name': 'indices',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'values',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'denseShape',
                'type': 'tensor'
            },
            {
                'start': 3,
                'name': 'defaultValue',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'SparseReshape',
        'category': 'sparse',
        'inputs': [
            {
                'start': 0,
                'name': 'inputIndices',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'inputShape',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'newShape',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'T',
                'name': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'SparseSegmentMean',
        'category': 'sparse',
        'inputs': [
            {
                'start': 0,
                'name': 'data',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'indices',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'segmentIds',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'SparseSegmentSum',
        'category': 'sparse',
        'inputs': [
            {
                'start': 0,
                'name': 'data',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'indices',
                'type': 'tensor'
            },
            {
                'start': 2,
                'name': 'segmentIds',
                'type': 'tensor'
            }
        ]
    }
];

var sparse = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json$f
});

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json$g = [
    {
        'tfOpName': 'FFT',
        'category': 'spectral',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'IFFT',
        'category': 'spectral',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ]
    },
    {
        'tfOpName': 'RFFT',
        'category': 'spectral',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'fft_length',
                'type': 'number',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'IRFFT',
        'category': 'spectral',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'fft_length',
                'type': 'number',
                'notSupported': true
            }
        ]
    }
];

var spectral = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json$g
});

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json$h = [
    {
        'tfOpName': 'StringNGrams',
        'category': 'string',
        'inputs': [
            {
                'start': 0,
                'name': 'data',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'dataSplits',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'separator',
                'name': 'separator',
                'type': 'string'
            },
            {
                'tfName': 'ngram_widths',
                'name': 'nGramWidths',
                'type': 'number[]'
            },
            {
                'tfName': 'left_pad',
                'name': 'leftPad',
                'type': 'string'
            },
            {
                'tfName': 'right_pad',
                'name': 'rightPad',
                'type': 'string'
            },
            {
                'tfName': 'pad_width',
                'name': 'padWidth',
                'type': 'number'
            },
            {
                'tfName': 'preserve_short_sequences',
                'name': 'preserveShortSequences',
                'type': 'bool'
            }
        ],
        'outputs': [
            'ngrams',
            'ngrams_splits'
        ]
    },
    {
        'tfOpName': 'StringSplit',
        'category': 'string',
        'inputs': [
            {
                'start': 0,
                'name': 'input',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'delimiter',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'skip_empty',
                'name': 'skipEmpty',
                'type': 'bool'
            }
        ],
        'outputs': [
            'indices',
            'values',
            'shape'
        ]
    },
    {
        'tfOpName': 'StringToHashBucketFast',
        'category': 'string',
        'inputs': [
            {
                'start': 0,
                'name': 'input',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'num_buckets',
                'name': 'numBuckets',
                'type': 'number'
            }
        ]
    }
];

var string = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json$h
});

/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const json$i = [
    {
        'tfOpName': 'Cast',
        'category': 'transformation',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'SrcT',
                'name': 'sdtype',
                'type': 'dtype',
                'notSupported': true
            },
            {
                'tfName': 'DstT',
                'name': 'dtype',
                'type': 'dtype'
            }
        ]
    },
    {
        'tfOpName': 'ExpandDims',
        'category': 'transformation',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'axis',
                'type': 'number'
            }
        ]
    },
    {
        'tfOpName': 'MirrorPad',
        'category': 'transformation',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'padding',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'mode',
                'name': 'mode',
                'type': 'string'
            }
        ]
    },
    {
        'tfOpName': 'Pad',
        'category': 'transformation',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'padding',
                'type': 'number[]'
            }
        ],
        'attrs': [
            {
                'tfName': 'constant_value',
                'name': 'constantValue',
                'type': 'number',
                'defaultValue': 0
            }
        ]
    },
    {
        'tfOpName': 'PadV2',
        'category': 'transformation',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'padding',
                'type': 'number[]'
            },
            {
                'start': 2,
                'name': 'constantValue',
                'type': 'number',
                'defaultValue': 0
            }
        ]
    },
    {
        'tfOpName': 'Reshape',
        'category': 'transformation',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'shape',
                'type': 'number[]'
            }
        ]
    },
    {
        'tfOpName': 'Squeeze',
        'category': 'transformation',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'axis',
                'tfDeprecatedName': 'squeeze_dims',
                'name': 'axis',
                'type': 'number[]'
            }
        ]
    },
    {
        'tfOpName': 'SpaceToBatchND',
        'category': 'transformation',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'blockShape',
                'type': 'number[]'
            },
            {
                'start': 2,
                'name': 'paddings',
                'type': 'number[]'
            }
        ]
    },
    {
        'tfOpName': 'BatchToSpaceND',
        'category': 'transformation',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'blockShape',
                'type': 'number[]'
            },
            {
                'start': 2,
                'name': 'crops',
                'type': 'number[]'
            }
        ]
    },
    {
        'tfOpName': 'DepthToSpace',
        'category': 'transformation',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            }
        ],
        'attrs': [
            {
                'tfName': 'block_size',
                'name': 'blockSize',
                'type': 'number'
            },
            {
                'tfName': 'data_format',
                'name': 'dataFormat',
                'type': 'string'
            }
        ]
    },
    {
        'tfOpName': 'BroadcastTo',
        'category': 'transformation',
        'inputs': [
            {
                'start': 0,
                'name': 'x',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 'shape',
                'type': 'number[]'
            }
        ],
        'attrs': []
    },
    {
        'tfOpName': 'BroadcastArgs',
        'category': 'transformation',
        'inputs': [
            {
                'start': 0,
                'name': 's0',
                'type': 'tensor'
            },
            {
                'start': 1,
                'name': 's1',
                'type': 'tensor'
            }
        ],
        'attrs': []
    }
];

var transformation = /*#__PURE__*/Object.freeze({
    __proto__: null,
    json: json$i
});

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class OperationMapper {
    // Singleton instance for the mapper
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    // Loads the op mapping from the JSON file.
    constructor() {
        const ops = [
            arithmetic, basicMath, control, convolution, creation, dynamic,
            evaluation, graph, hashTable, image, logical, matrices, normalization,
            reduction, sliceJoin, sparse, spectral, string, transformation
        ];
        const mappersJson = [].concat(...ops.map(op => op.json));
        this.opMappers = mappersJson.reduce((map, mapper) => {
            map[mapper.tfOpName] = mapper;
            return map;
        }, {});
    }
    // Converts the model inference graph from Tensorflow GraphDef to local
    // representation for TensorFlow.js API
    transformGraph(graph, signature = {}) {
        const tfNodes = graph.node;
        const placeholders = [];
        const weights = [];
        const initNodes = [];
        const nodes = tfNodes.reduce((map, node) => {
            map[node.name] = this.mapNode(node);
            if (node.op.startsWith('Placeholder')) {
                placeholders.push(map[node.name]);
            }
            else if (node.op === 'Const') {
                weights.push(map[node.name]);
            }
            else if (node.input == null || node.input.length === 0) {
                initNodes.push(map[node.name]);
            }
            return map;
        }, {});
        let inputs = [];
        const outputs = [];
        let inputNodeNameToKey = {};
        let outputNodeNameToKey = {};
        if (signature != null) {
            inputNodeNameToKey = this.mapSignatureEntries(signature.inputs);
            outputNodeNameToKey = this.mapSignatureEntries(signature.outputs);
        }
        const allNodes = Object.keys(nodes);
        allNodes.forEach(key => {
            const node = nodes[key];
            node.inputNames.forEach((name, index) => {
                const [nodeName, , outputName] = getNodeNameAndIndex(name);
                const inputNode = nodes[nodeName];
                if (inputNode.outputs != null) {
                    const outputIndex = inputNode.outputs.indexOf(outputName);
                    if (outputIndex !== -1) {
                        const inputName = `${nodeName}:${outputIndex}`;
                        // update the input name to use the mapped output index directly.
                        node.inputNames[index] = inputName;
                    }
                }
                node.inputs.push(inputNode);
                inputNode.children.push(node);
            });
        });
        // if signature has not outputs set, add any node that does not have
        // outputs.
        if (Object.keys(outputNodeNameToKey).length === 0) {
            allNodes.forEach(key => {
                const node = nodes[key];
                if (node.children.length === 0) {
                    outputs.push(node);
                }
            });
        }
        else {
            Object.keys(outputNodeNameToKey).forEach(name => {
                const [nodeName,] = getNodeNameAndIndex(name);
                const node = nodes[nodeName];
                if (node != null) {
                    node.signatureKey = outputNodeNameToKey[name];
                    outputs.push(node);
                }
            });
        }
        if (Object.keys(inputNodeNameToKey).length > 0) {
            Object.keys(inputNodeNameToKey).forEach(name => {
                const [nodeName,] = getNodeNameAndIndex(name);
                const node = nodes[nodeName];
                if (node) {
                    node.signatureKey = inputNodeNameToKey[name];
                    inputs.push(node);
                }
            });
        }
        else {
            inputs = placeholders;
        }
        let functions = {};
        if (graph.library != null && graph.library.function != null) {
            functions = graph.library.function.reduce((functions, func) => {
                functions[func.signature.name] = this.mapFunction(func);
                return functions;
            }, {});
        }
        const result = { nodes, inputs, outputs, weights, placeholders, signature, functions };
        if (initNodes.length > 0) {
            result.initNodes = initNodes;
        }
        return result;
    }
    mapSignatureEntries(entries) {
        return Object.keys(entries || {})
            .reduce((prev, curr) => {
            prev[entries[curr].name] = curr;
            return prev;
        }, {});
    }
    mapNode(node) {
        // Unsupported ops will cause an error at run-time (not parse time), since
        // they may not be used by the actual execution subgraph.
        const mapper = getRegisteredOp(node.op) || this.opMappers[node.op] || {};
        if (node.attr == null) {
            node.attr = {};
        }
        const newNode = {
            name: node.name,
            op: node.op,
            category: mapper.category,
            inputNames: (node.input ||
                []).map(input => input.startsWith('^') ? input.substr(1) : input),
            inputs: [],
            children: [],
            inputParams: {},
            attrParams: {},
            rawAttrs: node.attr,
            outputs: mapper.outputs
        };
        if (mapper.inputs != null) {
            newNode.inputParams =
                mapper.inputs.reduce((map, param) => {
                    map[param.name] = {
                        type: param.type,
                        inputIndexStart: param.start,
                        inputIndexEnd: param.end
                    };
                    return map;
                }, {});
        }
        if (mapper.attrs != null) {
            newNode.attrParams =
                mapper.attrs.reduce((map, param) => {
                    const type = param.type;
                    let value = undefined;
                    switch (param.type) {
                        case 'string':
                            value = getStringParam(node.attr, param.tfName, param.defaultValue);
                            if (value === undefined && !!param.tfDeprecatedName) {
                                value = getStringParam(node.attr, param.tfDeprecatedName, param.defaultValue);
                            }
                            break;
                        case 'string[]':
                            value = getStringArrayParam(node.attr, param.tfName, param.defaultValue);
                            if (value === undefined && !!param.tfDeprecatedName) {
                                value = getStringArrayParam(node.attr, param.tfDeprecatedName, param.defaultValue);
                            }
                            break;
                        case 'number':
                            value = getNumberParam(node.attr, param.tfName, (param.defaultValue || 0));
                            if (value === undefined && !!param.tfDeprecatedName) {
                                value = getNumberParam(node.attr, param.tfDeprecatedName, param.defaultValue);
                            }
                            break;
                        case 'number[]':
                            value = getNumericArrayParam(node.attr, param.tfName, param.defaultValue);
                            if (value === undefined && !!param.tfDeprecatedName) {
                                value = getNumericArrayParam(node.attr, param.tfDeprecatedName, param.defaultValue);
                            }
                            break;
                        case 'bool':
                            value = getBoolParam(node.attr, param.tfName, param.defaultValue);
                            if (value === undefined && !!param.tfDeprecatedName) {
                                value = getBoolParam(node.attr, param.tfDeprecatedName, param.defaultValue);
                            }
                            break;
                        case 'bool[]':
                            value = getBoolArrayParam(node.attr, param.tfName, param.defaultValue);
                            if (value === undefined && !!param.tfDeprecatedName) {
                                value = getBoolArrayParam(node.attr, param.tfDeprecatedName, param.defaultValue);
                            }
                            break;
                        case 'shape':
                            value = getTensorShapeParam(node.attr, param.tfName, param.defaultValue);
                            if (value === undefined && !!param.tfDeprecatedName) {
                                value = getTensorShapeParam(node.attr, param.tfDeprecatedName, param.defaultValue);
                            }
                            break;
                        case 'shape[]':
                            value = getTensorShapeArrayParam(node.attr, param.tfName, param.defaultValue);
                            if (value === undefined && !!param.tfDeprecatedName) {
                                value = getTensorShapeArrayParam(node.attr, param.tfDeprecatedName, param.defaultValue);
                            }
                            break;
                        case 'dtype':
                            value = getDtypeParam(node.attr, param.tfName, param.defaultValue);
                            if (value === undefined && !!param.tfDeprecatedName) {
                                value = getDtypeParam(node.attr, param.tfDeprecatedName, param.defaultValue);
                            }
                            break;
                        case 'dtype[]':
                            value = getDtypeArrayParam(node.attr, param.tfName, param.defaultValue);
                            if (value === undefined && !!param.tfDeprecatedName) {
                                value = getDtypeArrayParam(node.attr, param.tfDeprecatedName, param.defaultValue);
                            }
                            break;
                        case 'func':
                            value = getFuncParam(node.attr, param.tfName, param.defaultValue);
                            if (value === undefined && !!param.tfDeprecatedName) {
                                value = getFuncParam(node.attr, param.tfDeprecatedName, param.defaultValue);
                            }
                            break;
                        case 'tensor':
                        case 'tensors':
                            break;
                        default:
                            throw new Error(`Unsupported param type: ${param.type} for op: ${node.op}`);
                    }
                    map[param.name] = { value, type };
                    return map;
                }, {});
        }
        return newNode;
    }
    // map the TFunctionDef to TFJS graph object
    mapFunction(functionDef) {
        const tfNodes = functionDef.nodeDef;
        const placeholders = [];
        const weights = [];
        let nodes = {};
        if (tfNodes != null) {
            nodes = tfNodes.reduce((map, node) => {
                map[node.name] = this.mapNode(node);
                if (node.op === 'Const') {
                    weights.push(map[node.name]);
                }
                return map;
            }, {});
        }
        const inputs = [];
        const outputs = [];
        functionDef.signature.inputArg.forEach(arg => {
            const [nodeName,] = getNodeNameAndIndex(arg.name);
            const node = {
                name: nodeName,
                op: 'Placeholder',
                inputs: [],
                inputNames: [],
                category: 'graph',
                inputParams: {},
                attrParams: { dtype: { value: parseDtypeParam(arg.type), type: 'dtype' } },
                children: []
            };
            node.signatureKey = arg.name;
            inputs.push(node);
            nodes[nodeName] = node;
        });
        const allNodes = Object.keys(nodes);
        allNodes.forEach(key => {
            const node = nodes[key];
            node.inputNames.forEach((name, index) => {
                const [nodeName, , outputName] = getNodeNameAndIndex(name);
                const inputNode = nodes[nodeName];
                if (inputNode.outputs != null) {
                    const outputIndex = inputNode.outputs.indexOf(outputName);
                    if (outputIndex !== -1) {
                        const inputName = `${nodeName}:${outputIndex}`;
                        // update the input name to use the mapped output index directly.
                        node.inputNames[index] = inputName;
                    }
                }
                node.inputs.push(inputNode);
                inputNode.children.push(node);
            });
        });
        const returnNodeMap = functionDef.ret;
        functionDef.signature.outputArg.forEach(output => {
            const [nodeName, index] = getNodeNameAndIndex(returnNodeMap[output.name]);
            const node = nodes[nodeName];
            if (node != null) {
                node.defaultOutput = index;
                outputs.push(node);
            }
        });
        const signature = this.mapArgsToSignature(functionDef);
        return { nodes, inputs, outputs, weights, placeholders, signature };
    }
    mapArgsToSignature(functionDef) {
        return {
            methodName: functionDef.signature.name,
            inputs: functionDef.signature.inputArg.reduce((map, arg) => {
                map[arg.name] = this.mapArgToTensorInfo(arg);
                return map;
            }, {}),
            outputs: functionDef.signature.outputArg.reduce((map, arg) => {
                map[arg.name] = this.mapArgToTensorInfo(arg, functionDef.ret);
                return map;
            }, {}),
        };
    }
    mapArgToTensorInfo(arg, nameMap) {
        let name = arg.name;
        if (nameMap != null) {
            name = nameMap[name];
        }
        return { name, dtype: arg.type };
    }
}
function decodeBase64(text) {
    const global = env().global;
    if (typeof global.atob !== 'undefined') {
        return global.atob(text);
    }
    else if (typeof Buffer !== 'undefined') {
        return new Buffer(text, 'base64').toString();
    }
    else {
        throw new Error('Unable to decode base64 in this environment. ' +
            'Missing built-in atob() or Buffer()');
    }
}
function parseStringParam(s, keepCase) {
    const value = Array.isArray(s) ? String.fromCharCode.apply(null, s) : decodeBase64(s);
    return keepCase ? value : value.toLowerCase();
}
function getStringParam(attrs, name, def, keepCase = false) {
    const param = attrs[name];
    if (param != null) {
        return parseStringParam(param.s, keepCase);
    }
    return def;
}
function getBoolParam(attrs, name, def) {
    const param = attrs[name];
    return param ? param.b : def;
}
function getNumberParam(attrs, name, def) {
    const param = attrs[name] || {};
    const value = param['i'] != null ? param['i'] : (param['f'] != null ? param['f'] : def);
    return (typeof value === 'number') ? value : parseInt(value, 10);
}
function parseDtypeParam(value) {
    if (typeof (value) === 'string') {
        // tslint:disable-next-line:no-any
        value = DataType[value];
    }
    switch (value) {
        case DataType.DT_FLOAT:
        case DataType.DT_HALF:
            return 'float32';
        case DataType.DT_INT32:
        case DataType.DT_INT64:
        case DataType.DT_INT8:
        case DataType.DT_UINT8:
            return 'int32';
        case DataType.DT_BOOL:
            return 'bool';
        case DataType.DT_DOUBLE:
            return 'float32';
        case DataType.DT_STRING:
            return 'string';
        default:
            // Unknown dtype error will happen at runtime (instead of parse time),
            // since these nodes might not be used by the actual subgraph execution.
            return null;
    }
}
function getFuncParam(attrs, name, def) {
    const param = attrs[name];
    if (param && param.func) {
        return param.func.name;
    }
    return def;
}
function getDtypeParam(attrs, name, def) {
    const param = attrs[name];
    if (param && param.type) {
        return parseDtypeParam(param.type);
    }
    return def;
}
function getDtypeArrayParam(attrs, name, def) {
    const param = attrs[name];
    if (param && param.list && param.list.type) {
        return param.list.type.map(v => parseDtypeParam(v));
    }
    return def;
}
function parseTensorShapeParam(shape) {
    if (shape.unknownRank) {
        return undefined;
    }
    if (shape.dim != null) {
        return shape.dim.map(dim => (typeof dim.size === 'number') ? dim.size : parseInt(dim.size, 10));
    }
    return [];
}
function getTensorShapeParam(attrs, name, def) {
    const param = attrs[name];
    if (param && param.shape) {
        return parseTensorShapeParam(param.shape);
    }
    return def;
}
function getNumericArrayParam(attrs, name, def) {
    const param = attrs[name];
    if (param) {
        return ((param.list.f && param.list.f.length ? param.list.f :
            param.list.i) ||
            [])
            .map(v => (typeof v === 'number') ? v : parseInt(v, 10));
    }
    return def;
}
function getStringArrayParam(attrs, name, def, keepCase = false) {
    const param = attrs[name];
    if (param && param.list && param.list.s) {
        return param.list.s.map((v) => {
            return parseStringParam(v, keepCase);
        });
    }
    return def;
}
function getTensorShapeArrayParam(attrs, name, def) {
    const param = attrs[name];
    if (param && param.list && param.list.shape) {
        return param.list.shape.map((v) => {
            return parseTensorShapeParam(v);
        });
    }
    return def;
}
function getBoolArrayParam(attrs, name, def) {
    const param = attrs[name];
    if (param && param.list && param.list.b) {
        return param.list.b;
    }
    return def;
}

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * Helper class for lookup inputs and params for nodes in the model graph.
 */
class NodeValueImpl {
    constructor(node, tensorMap, context) {
        this.node = node;
        this.tensorMap = tensorMap;
        this.context = context;
        this.inputs = [];
        this.attrs = {};
        this.inputs = node.inputNames.map(name => this.getInput(name));
        if (node.rawAttrs != null) {
            this.attrs = Object.keys(node.rawAttrs)
                .reduce((attrs, key) => {
                attrs[key] = this.getAttr(key);
                return attrs;
            }, {});
        }
    }
    /**
     * Return the value of the attribute or input param.
     * @param name String: name of attribute or input param.
     */
    getInput(name) {
        return getTensor(name, this.tensorMap, this.context);
    }
    /**
     * Return the value of the attribute or input param.
     * @param name String: name of attribute or input param.
     */
    getAttr(name, defaultValue) {
        const value = this.node.rawAttrs[name];
        if (value.tensor != null) {
            return getTensor(name, this.tensorMap, this.context);
        }
        if (value.i != null || value.f != null) {
            return getNumberParam(this.node.rawAttrs, name, defaultValue);
        }
        if (value.s != null) {
            return getStringParam(this.node.rawAttrs, name, defaultValue);
        }
        if (value.b != null) {
            return getBoolParam(this.node.rawAttrs, name, defaultValue);
        }
        if (value.shape != null) {
            return getTensorShapeParam(this.node.rawAttrs, name, defaultValue);
        }
        if (value.type != null) {
            return getDtypeParam(this.node.rawAttrs, name, defaultValue);
        }
        if (value.list != null) {
            if (value.list.i != null || value.list.f != null) {
                return getNumericArrayParam(this.node.rawAttrs, name, defaultValue);
            }
            if (value.list.s != null) {
                return getStringArrayParam(this.node.rawAttrs, name, defaultValue);
            }
            if (value.list.shape != null) {
                return getTensorShapeArrayParam(this.node.rawAttrs, name, defaultValue);
            }
            if (value.list.b != null) {
                return getBoolArrayParam(this.node.rawAttrs, name, defaultValue);
            }
            if (value.list.type != null) {
                return getDtypeArrayParam(this.node.rawAttrs, name, defaultValue);
            }
        }
        return defaultValue;
    }
}

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const executeOp = (node, tensorMap, context) => {
    switch (node.op) {
        case 'BiasAdd':
        case 'AddV2':
        case 'Add': {
            return [add(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'AddN': {
            return [addN(getParamValue('tensors', node, tensorMap, context))];
        }
        case 'FloorMod':
        case 'Mod':
            return [mod(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        case 'Mul':
            return [mul(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        case 'RealDiv':
        case 'Div': {
            return [div(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'DivNoNan': {
            return [divNoNan(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'FloorDiv': {
            return [floorDiv(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'Sub': {
            return [sub(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'Minimum': {
            return [minimum(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'Maximum': {
            return [maximum(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'Pow': {
            return [pow(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'SquaredDifference': {
            return [squaredDifference(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const executeOp$1 = (node, tensorMap, context) => {
    switch (node.op) {
        case 'Abs':
        case 'ComplexAbs':
            return [abs(getParamValue('x', node, tensorMap, context))];
        case 'Acos':
            return [acos(getParamValue('x', node, tensorMap, context))];
        case 'Acosh':
            return [acosh(getParamValue('x', node, tensorMap, context))];
        case 'Asin':
            return [asin(getParamValue('x', node, tensorMap, context))];
        case 'Asinh':
            return [asinh(getParamValue('x', node, tensorMap, context))];
        case 'Atan':
            return [atan(getParamValue('x', node, tensorMap, context))];
        case 'Atan2':
            return [atan2(getParamValue('x', node, tensorMap, context), getParamValue('y', node, tensorMap, context))];
        case 'Atanh':
            return [atanh(getParamValue('x', node, tensorMap, context))];
        case 'Ceil':
            return [ceil(getParamValue('x', node, tensorMap, context))];
        case 'Complex':
            return [complex(getParamValue('real', node, tensorMap, context), getParamValue('imag', node, tensorMap, context))];
        case 'Cos':
            return [cos(getParamValue('x', node, tensorMap, context))];
        case 'Cosh':
            return [cosh(getParamValue('x', node, tensorMap, context))];
        case 'Elu':
            return [elu(getParamValue('x', node, tensorMap, context))];
        case 'Erf':
            return [erf(getParamValue('x', node, tensorMap, context))];
        case 'Exp':
            return [exp(getParamValue('x', node, tensorMap, context))];
        case 'Expm1': {
            return [expm1(getParamValue('x', node, tensorMap, context))];
        }
        case 'Floor':
            return [floor(getParamValue('x', node, tensorMap, context))];
        case 'Log':
            return [log(getParamValue('x', node, tensorMap, context))];
        case 'Log1p': {
            return [log1p(getParamValue('x', node, tensorMap, context))];
        }
        case 'Imag':
            return [imag(getParamValue('x', node, tensorMap, context))];
        case 'Neg':
            return [neg(getParamValue('x', node, tensorMap, context))];
        case 'Reciprocal': {
            return [reciprocal(getParamValue('x', node, tensorMap, context))];
        }
        case 'Real':
            return [real(getParamValue('x', node, tensorMap, context))];
        case 'Relu':
            return [relu(getParamValue('x', node, tensorMap, context))];
        case 'Round': {
            return [round(getParamValue('x', node, tensorMap, context))];
        }
        case 'Selu':
            return [selu(getParamValue('x', node, tensorMap, context))];
        case 'Sigmoid':
            return [sigmoid(getParamValue('x', node, tensorMap, context))];
        case 'Sin':
            return [sin(getParamValue('x', node, tensorMap, context))];
        case 'Sign': {
            return [sign(getParamValue('x', node, tensorMap, context))];
        }
        case 'Sinh': {
            return [sinh(getParamValue('x', node, tensorMap, context))];
        }
        case 'Softplus': {
            return [softplus(getParamValue('x', node, tensorMap, context))];
        }
        case 'Sqrt': {
            return [sqrt(getParamValue('x', node, tensorMap, context))];
        }
        case 'Square': {
            return [square(getParamValue('x', node, tensorMap, context))];
        }
        case 'Tanh': {
            return [tanh(getParamValue('x', node, tensorMap, context))];
        }
        case 'Tan':
            return [tan(getParamValue('x', node, tensorMap, context))];
        case 'ClipByValue':
            return [clipByValue(getParamValue('x', node, tensorMap, context), getParamValue('clipValueMin', node, tensorMap, context), getParamValue('clipValueMax', node, tensorMap, context))];
        case 'Relu6':
            return [relu6(getParamValue('x', node, tensorMap, context))];
        case 'Rsqrt':
            return [rsqrt(getTensor(node.inputNames[0], tensorMap, context))];
        case 'Prod':
            return [prod(getParamValue('x', node, tensorMap, context), getParamValue('axes', node, tensorMap, context))];
        case 'LeakyRelu':
            return [leakyRelu(getParamValue('x', node, tensorMap, context), getParamValue('alpha', node, tensorMap, context))];
        case 'Prelu':
            return [prelu(getParamValue('x', node, tensorMap, context), getParamValue('alpha', node, tensorMap, context))];
        case 'IsNan':
            return [isNaN$1(getTensor(node.inputNames[0], tensorMap, context))];
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * Used by TensorList and TensorArray to verify if elementShape matches, support
 * negative value as the dim shape.
 * @param shapeA
 * @param shapeB
 * @param errorMessagePrefix
 */
function assertShapesMatchAllowUndefinedSize(shapeA, shapeB, errorMessagePrefix = '') {
    // constant shape means unknown rank
    if (typeof shapeA === 'number' || typeof shapeB === 'number') {
        return;
    }
    assert(shapeA.length === shapeB.length, () => errorMessagePrefix + ` Shapes ${shapeA} and ${shapeB} must match`);
    for (let i = 0; i < shapeA.length; i++) {
        const dim0 = shapeA[i];
        const dim1 = shapeB[i];
        assert(dim0 < 0 || dim1 < 0 || dim0 === dim1, () => errorMessagePrefix + ` Shapes ${shapeA} and ${shapeB} must match`);
    }
}
function fullDefinedShape(elementShape) {
    if (typeof elementShape === 'number' || elementShape.some(dim => dim < 0)) {
        return false;
    }
    return true;
}
/**
 * Generate the output element shape from the list elementShape, list tensors
 * and input param.
 * @param listElementShape
 * @param tensors
 * @param elementShape
 */
function inferElementShape(listElementShape, tensors, elementShape) {
    let partialShape = mergeElementShape(listElementShape, elementShape);
    const notfullDefinedShape = !fullDefinedShape(partialShape);
    if (notfullDefinedShape && tensors.length === 0) {
        throw new Error(`Tried to calculate elements of an empty list` +
            ` with non-fully-defined elementShape: ${partialShape}`);
    }
    if (notfullDefinedShape) {
        tensors.forEach(tensor => {
            partialShape = mergeElementShape(tensor.shape, partialShape);
        });
    }
    if (!fullDefinedShape(partialShape)) {
        throw new Error(`Non-fully-defined elementShape: ${partialShape}`);
    }
    return partialShape;
}
function mergeElementShape(elementShapeA, elementShapeB) {
    if (typeof elementShapeA === 'number') {
        return elementShapeB;
    }
    if (typeof elementShapeB === 'number') {
        return elementShapeA;
    }
    if (elementShapeA.length !== elementShapeB.length) {
        throw new Error(`Incompatible ranks during merge: ${elementShapeA} vs. ${elementShapeB}`);
    }
    const result = [];
    for (let i = 0; i < elementShapeA.length; ++i) {
        const dim0 = elementShapeA[i];
        const dim1 = elementShapeB[i];
        if (dim0 >= 0 && dim1 >= 0 && dim0 !== dim1) {
            throw new Error(`Incompatible shape during merge: ${elementShapeA} vs. ${elementShapeB}`);
        }
        result[i] = dim0 >= 0 ? dim0 : dim1;
    }
    return result;
}

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * The TensorArray object keeps an array of Tensors.  It
 * allows reading from the array and writing to the array.
 */
class TensorArray {
    constructor(name, dtype, maxSize, elementShape, identicalElementShapes, dynamicSize, clearAfterRead) {
        this.name = name;
        this.dtype = dtype;
        this.maxSize = maxSize;
        this.elementShape = elementShape;
        this.identicalElementShapes = identicalElementShapes;
        this.dynamicSize = dynamicSize;
        this.clearAfterRead = clearAfterRead;
        this.tensors = [];
        this.closed_ = false;
        this.idTensor = scalar(0);
        keep(this.idTensor);
    }
    get id() {
        return this.idTensor.id;
    }
    get closed() {
        return this.closed_;
    }
    /**
     * Dispose the tensors and idTensor and mark the TensoryArray as closed.
     */
    clearAndClose(keepIds) {
        this.tensors.forEach(tensor => {
            if (keepIds == null || !keepIds.has(tensor.tensor.id)) {
                tensor.tensor.dispose();
            }
        });
        this.tensors = [];
        this.closed_ = true;
        this.idTensor.dispose();
    }
    size() {
        return this.tensors.length;
    }
    /**
     * Read the value at location index in the TensorArray.
     * @param index Number the index to read from.
     */
    read(index) {
        if (this.closed_) {
            throw new Error(`TensorArray ${this.name} has already been closed.`);
        }
        if (index < 0 || index >= this.size()) {
            throw new Error(`Tried to read from index ${index}, but array size is: ${this.size()}`);
        }
        const tensorWithState = this.tensors[index];
        if (tensorWithState.cleared) {
            throw new Error(`TensorArray ${this.name}: Could not read index ${index} twice because it was cleared after a previous read ` +
                `(perhaps try setting clear_after_read = false?).`);
        }
        if (this.clearAfterRead) {
            tensorWithState.cleared = true;
        }
        tensorWithState.read = true;
        return tensorWithState.tensor;
    }
    /**
     * Helper method to read multiple tensors from the specified indices.
     */
    readMany(indices) {
        return indices.map(index => this.read(index));
    }
    /**
     * Write value into the index of the TensorArray.
     * @param index number the index to write to.
     * @param tensor
     */
    write(index, tensor) {
        if (this.closed_) {
            throw new Error(`TensorArray ${this.name} has already been closed.`);
        }
        if (index < 0 || !this.dynamicSize && index >= this.maxSize) {
            throw new Error(`Tried to write to index ${index}, but array is not resizeable and size is: ${this.maxSize}`);
        }
        const t = this.tensors[index] || {};
        if (tensor.dtype !== this.dtype) {
            throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${index},
          because the value dtype is ${tensor.dtype}, but TensorArray dtype is ${this.dtype}.`);
        }
        // Set the shape for the first time write to unknow shape tensor array
        if (this.size() === 0 &&
            (this.elementShape == null || this.elementShape.length === 0)) {
            this.elementShape = tensor.shape;
        }
        assertShapesMatchAllowUndefinedSize(this.elementShape, tensor.shape, `TensorArray ${this.name}: Could not write to TensorArray index ${index}.`);
        if (t.read) {
            throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${index}, because it has already been read.`);
        }
        if (t.written) {
            throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${index}, because it has already been written.`);
        }
        t.tensor = tensor;
        keep(tensor);
        t.written = true;
        this.tensors[index] = t;
    }
    /**
     * Helper method to write multiple tensors to the specified indices.
     */
    writeMany(indices, tensors) {
        if (indices.length !== tensors.length) {
            throw new Error(`TensorArray ${this.name}: could not write multiple tensors,` +
                `because the index size: ${indices.length} is not the same as tensors size: ${tensors.length}.`);
        }
        indices.forEach((i, index) => this.write(i, tensors[index]));
    }
    /**
     * Return selected values in the TensorArray as a packed Tensor. All of
     * selected values must have been written and their shapes must all match.
     * @param [indices] number[] Optional. Taking values in [0, max_value). If the
     *    TensorArray is not dynamic, max_value=size(). If not specified returns
     *    all tensors in the original order.
     * @param [dtype]
     */
    gather(indices, dtype) {
        if (!!dtype && dtype !== this.dtype) {
            throw new Error(`TensorArray dtype is ${this.dtype} but gather requested dtype ${dtype}`);
        }
        if (!indices) {
            indices = [];
            for (let i = 0; i < this.size(); i++) {
                indices.push(i);
            }
        }
        else {
            indices = indices.slice(0, this.size());
        }
        if (indices.length === 0) {
            return tensor([], [0].concat(this.elementShape));
        }
        // Read all the PersistentTensors into a vector to keep track of
        // their memory.
        const tensors = this.readMany(indices);
        assertShapesMatchAllowUndefinedSize(this.elementShape, tensors[0].shape, 'TensorArray shape mismatch: ');
        return stack(tensors, 0);
    }
    /**
     * Return the values in the TensorArray as a concatenated Tensor.
     */
    concat(dtype) {
        if (!!dtype && dtype !== this.dtype) {
            throw new Error(`TensorArray dtype is ${this.dtype} but concat requested dtype ${dtype}`);
        }
        if (this.size() === 0) {
            return tensor([], [0].concat(this.elementShape));
        }
        const indices = [];
        for (let i = 0; i < this.size(); i++) {
            indices.push(i);
        }
        // Collect all the tensors from the tensors array.
        const tensors = this.readMany(indices);
        assertShapesMatchAllowUndefinedSize(this.elementShape, tensors[0].shape, `TensorArray shape mismatch: tensor array shape (${this.elementShape}) vs first tensor shape (${tensors[0].shape})`);
        return concat(tensors, 0);
    }
    /**
     * Scatter the values of a Tensor in specific indices of a TensorArray.
     * @param indices nummber[] values in [0, max_value). If the
     *    TensorArray is not dynamic, max_value=size().
     * @param tensor Tensor input tensor.
     */
    scatter(indices, tensor) {
        if (tensor.dtype !== this.dtype) {
            throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${tensor.dtype}`);
        }
        if (indices.length !== tensor.shape[0]) {
            throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${indices.length} vs. ${tensor.shape[0]}`);
        }
        const maxIndex = Math.max(...indices);
        if (!this.dynamicSize && maxIndex >= this.maxSize) {
            throw new Error(`Max index must be < array size (${maxIndex}  vs. ${this.maxSize})`);
        }
        this.writeMany(indices, unstack(tensor, 0));
    }
    /**
     * Split the values of a Tensor into the TensorArray.
     * @param length number[] with the lengths to use when splitting value along
     *    its first dimension.
     * @param tensor Tensor, the tensor to split.
     */
    split(length, tensor) {
        if (tensor.dtype !== this.dtype) {
            throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${tensor.dtype}`);
        }
        let totalLength = 0;
        const cumulativeLengths = length.map(len => {
            totalLength += len;
            return totalLength;
        });
        if (totalLength !== tensor.shape[0]) {
            throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${totalLength}, and tensor's shape is: ${tensor.shape}`);
        }
        if (!this.dynamicSize && length.length !== this.maxSize) {
            throw new Error(`TensorArray's size is not equal to the size of lengths (${this.maxSize} vs. ${length.length}), ` +
                'and the TensorArray is not marked as dynamically resizeable');
        }
        const elementPerRow = totalLength === 0 ? 0 : tensor.size / totalLength;
        const tensors = [];
        tidy(() => {
            tensor = reshape(tensor, [1, totalLength, elementPerRow]);
            for (let i = 0; i < length.length; ++i) {
                const previousLength = (i === 0) ? 0 : cumulativeLengths[i - 1];
                const indices = [0, previousLength, 0];
                const sizes = [1, length[i], elementPerRow];
                tensors[i] = reshape(slice(tensor, indices, sizes), this.elementShape);
            }
            return tensors;
        });
        const indices = [];
        for (let i = 0; i < length.length; i++) {
            indices[i] = i;
        }
        this.writeMany(indices, tensors);
    }
}

/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * TensorList stores a container of `tf.Tensor` objects, which are accessible
 * via tensors field.
 *
 * In order to get a copy of the underlying list, use the copy method:
 * ```
 *    TensorList b = a.copy();
 *    b.tensors().pushBack(t);  // This does not modify a.tensors().
 * ```
 *
 * Note that this is not a deep copy: the memory locations of the underlying
 * tensors will still point to the same locations of the corresponding tensors
 * in the original.
 */
class TensorList {
    /**
     *
     * @param tensors list of tensors
     * @param elementShape shape of each tensor, this can be a single number (any
     * shape is allowed) or partial shape (dim = -1).
     * @param elementDtype data type of each tensor
     * @param maxNumElements The maximum allowed size of `tensors`. Defaults to -1
     *   meaning that the size of `tensors` is unbounded.
     */
    constructor(tensors, elementShape, elementDtype, maxNumElements = -1) {
        this.tensors = tensors;
        this.elementShape = elementShape;
        this.elementDtype = elementDtype;
        if (tensors != null) {
            tensors.forEach(tensor => {
                if (elementDtype !== tensor.dtype) {
                    throw new Error(`Invalid data types; op elements ${elementDtype}, but list elements ${tensor.dtype}`);
                }
                assertShapesMatchAllowUndefinedSize(elementShape, tensor.shape, 'TensorList shape mismatch: ');
                keep(tensor);
            });
        }
        this.idTensor = scalar(0);
        this.maxNumElements = maxNumElements;
        keep(this.idTensor);
    }
    get id() {
        return this.idTensor.id;
    }
    /**
     * Get a new TensorList containing a copy of the underlying tensor container.
     */
    copy() {
        return new TensorList([...this.tensors], this.elementShape, this.elementDtype);
    }
    /**
     * Dispose the tensors and idTensor and clear the tensor list.
     */
    clearAndClose(keepIds) {
        this.tensors.forEach(tensor => {
            if (keepIds == null || !keepIds.has(tensor.id)) {
                tensor.dispose();
            }
        });
        this.tensors.length = 0;
        this.idTensor.dispose();
    }
    /**
     * The size of the tensors in the tensor list.
     */
    size() {
        return this.tensors.length;
    }
    /**
     * Return a tensor that stacks a list of rank-R tf.Tensors into one rank-(R+1)
     * tf.Tensor.
     * @param elementShape shape of each tensor
     * @param elementDtype data type of each tensor
     * @param numElements the number of elements to stack
     */
    stack(elementShape, elementDtype, numElements = -1) {
        if (elementDtype !== this.elementDtype) {
            throw new Error(`Invalid data types; op elements ${elementDtype}, but list elements ${this.elementDtype}`);
        }
        if (numElements !== -1 && this.tensors.length !== numElements) {
            throw new Error(`Operation expected a list with ${numElements} elements but got a list with ${this.tensors.length} elements.`);
        }
        assertShapesMatchAllowUndefinedSize(elementShape, this.elementShape, 'TensorList shape mismatch: ');
        const outputElementShape = inferElementShape(this.elementShape, this.tensors, elementShape);
        return tidy(() => {
            const reshapedTensors = this.tensors.map(tensor => reshape(tensor, outputElementShape));
            return stack(reshapedTensors, 0);
        });
    }
    /**
     * Pop a tensor from the end of the list.
     * @param elementShape shape of the tensor
     * @param elementDtype data type of the tensor
     */
    popBack(elementShape, elementDtype) {
        if (elementDtype !== this.elementDtype) {
            throw new Error(`Invalid data types; op elements ${elementDtype}, but list elements ${this.elementDtype}`);
        }
        if (this.size() === 0) {
            throw new Error('Trying to pop from an empty list.');
        }
        const outputElementShape = inferElementShape(this.elementShape, this.tensors, elementShape);
        const tensor = this.tensors.pop();
        assertShapesMatchAllowUndefinedSize(tensor.shape, elementShape, 'TensorList shape mismatch: ');
        return reshape(tensor, outputElementShape);
    }
    /**
     * Push a tensor to the end of the list.
     * @param tensor Tensor to be pushed.
     */
    pushBack(tensor) {
        if (tensor.dtype !== this.elementDtype) {
            throw new Error(`Invalid data types; op elements ${tensor.dtype}, but list elements ${this.elementDtype}`);
        }
        assertShapesMatchAllowUndefinedSize(tensor.shape, this.elementShape, 'TensorList shape mismatch: ');
        if (this.maxNumElements === this.size()) {
            throw new Error(`Trying to push element into a full list.`);
        }
        keep(tensor);
        this.tensors.push(tensor);
    }
    /**
     * Update the size of the list.
     * @param size the new size of the list.
     */
    resize(size) {
        if (size < 0) {
            throw new Error(`TensorListResize expects size to be non-negative. Got: ${size}`);
        }
        if (this.maxNumElements !== -1 && size > this.maxNumElements) {
            throw new Error(`TensorListResize input size ${size} is greater maxNumElement ${this.maxNumElements}.`);
        }
        this.tensors.length = size;
    }
    /**
     * Retrieve the element at the provided index
     * @param elementShape shape of the tensor
     * @param elementDtype dtype of the tensor
     * @param elementIndex index of the tensor
     */
    getItem(elementIndex, elementShape, elementDtype) {
        if (elementDtype !== this.elementDtype) {
            throw new Error(`Invalid data types; op elements ${elementDtype}, but list elements ${this.elementDtype}`);
        }
        if (elementIndex < 0 || elementIndex > this.tensors.length) {
            throw new Error(`Trying to access element ${elementIndex} in a list with ${this.tensors.length} elements.`);
        }
        if (this.tensors[elementIndex] == null) {
            throw new Error(`element at index ${elementIndex} is null.`);
        }
        assertShapesMatchAllowUndefinedSize(this.tensors[elementIndex].shape, elementShape, 'TensorList shape mismatch: ');
        const outputElementShape = inferElementShape(this.elementShape, this.tensors, elementShape);
        return reshape(this.tensors[elementIndex], outputElementShape);
    }
    /**
     * Set the tensor at the index
     * @param elementIndex index of the tensor
     * @param tensor the tensor to be inserted into the list
     */
    setItem(elementIndex, tensor) {
        if (tensor.dtype !== this.elementDtype) {
            throw new Error(`Invalid data types; op elements ${tensor.dtype}, but list elements ${this.elementDtype}`);
        }
        if (elementIndex < 0 ||
            this.maxNumElements !== -1 && elementIndex >= this.maxNumElements) {
            throw new Error(`Trying to set element ${elementIndex} in a list with max ${this.maxNumElements} elements.`);
        }
        assertShapesMatchAllowUndefinedSize(this.elementShape, tensor.shape, 'TensorList shape mismatch: ');
        keep(tensor);
        this.tensors[elementIndex] = tensor;
    }
    /**
     * Return selected values in the TensorList as a stacked Tensor. All of
     * selected values must have been written and their shapes must all match.
     * @param indices indices of tensors to gather
     * @param elementDtype output tensor dtype
     * @param elementShape output tensor element shape
     */
    gather(indices, elementDtype, elementShape) {
        if (elementDtype !== this.elementDtype) {
            throw new Error(`Invalid data types; op elements ${elementDtype}, but list elements ${this.elementDtype}`);
        }
        assertShapesMatchAllowUndefinedSize(this.elementShape, elementShape, 'TensorList shape mismatch: ');
        // When indices is greater than the size of the list, indices beyond the
        // size of the list are ignored.
        indices = indices.slice(0, this.size());
        const outputElementShape = inferElementShape(this.elementShape, this.tensors, elementShape);
        if (indices.length === 0) {
            return tensor([], [0].concat(outputElementShape));
        }
        return tidy(() => {
            const tensors = indices.map(i => reshape(this.tensors[i], outputElementShape));
            return stack(tensors, 0);
        });
    }
    /**
     * Return the values in the TensorList as a concatenated Tensor.
     * @param elementDtype output tensor dtype
     * @param elementShape output tensor element shape
     */
    concat(elementDtype, elementShape) {
        if (!!elementDtype && elementDtype !== this.elementDtype) {
            throw new Error(`TensorList dtype is ${this.elementDtype} but concat requested dtype ${elementDtype}`);
        }
        assertShapesMatchAllowUndefinedSize(this.elementShape, elementShape, 'TensorList shape mismatch: ');
        const outputElementShape = inferElementShape(this.elementShape, this.tensors, elementShape);
        if (this.size() === 0) {
            return tensor([], [0].concat(outputElementShape));
        }
        return tidy(() => {
            const tensors = this.tensors.map(t => reshape(t, outputElementShape));
            return concat(tensors, 0);
        });
    }
}
/**
 * Creates a TensorList which, when stacked, has the value of tensor.
 * @param tensor from tensor
 * @param elementShape output tensor element shape
 */
function fromTensor(tensor, elementShape, elementDtype) {
    const dtype = tensor.dtype;
    if (tensor.shape.length < 1) {
        throw new Error(`Tensor must be at least a vector, but saw shape: ${tensor.shape}`);
    }
    if (tensor.dtype !== elementDtype) {
        throw new Error(`Invalid data types; op elements ${tensor.dtype}, but list elements ${elementDtype}`);
    }
    const tensorElementShape = tensor.shape.slice(1);
    assertShapesMatchAllowUndefinedSize(tensorElementShape, elementShape, 'TensorList shape mismatch: ');
    const tensorList = unstack(tensor);
    return new TensorList(tensorList, elementShape, dtype);
}
/**
 * Return a TensorList of the given size with empty elements.
 * @param elementShape the shape of the future elements of the list
 * @param elementDtype the desired type of elements in the list
 * @param numElements the number of elements to reserve
 */
function reserve(elementShape, elementDtype, numElements) {
    return new TensorList([], elementShape, elementDtype, numElements);
}
/**
 * Put tensors at specific indices of a stacked tensor into a TensorList.
 * @param indices list of indices on how to scatter the tensor.
 * @param tensor input tensor.
 * @param elementShape the shape of the future elements of the list
 * @param numElements the number of elements to scatter
 */
function scatter(tensor, indices, elementShape, numElements) {
    if (indices.length !== tensor.shape[0]) {
        throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${indices.length} vs. ${tensor.shape[0]}`);
    }
    const maxIndex = Math.max(...indices);
    if (numElements != null && numElements !== -1 && maxIndex >= numElements) {
        throw new Error(`Max index must be < array size (${maxIndex}  vs. ${numElements})`);
    }
    const list = new TensorList([], elementShape, tensor.dtype, numElements);
    const tensors = unstack(tensor, 0);
    indices.forEach((value, index) => {
        list.setItem(value, tensors[index]);
    });
    return list;
}
/**
 * Split the values of a Tensor into a TensorList.
 * @param length the lengths to use when splitting value along
 *    its first dimension.
 * @param tensor the tensor to split.
 * @param elementShape the shape of the future elements of the list
 */
function split(tensor, length, elementShape) {
    let totalLength = 0;
    const cumulativeLengths = length.map(len => {
        totalLength += len;
        return totalLength;
    });
    if (totalLength !== tensor.shape[0]) {
        throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${totalLength}, and tensor's shape is: ${tensor.shape}`);
    }
    const shapeWithoutFirstDim = tensor.shape.slice(1);
    const outputElementShape = mergeElementShape(shapeWithoutFirstDim, elementShape);
    const elementPerRow = totalLength === 0 ? 0 : tensor.size / totalLength;
    const tensors = tidy(() => {
        const tensors = [];
        tensor = reshape(tensor, [1, totalLength, elementPerRow]);
        for (let i = 0; i < length.length; ++i) {
            const previousLength = (i === 0) ? 0 : cumulativeLengths[i - 1];
            const indices = [0, previousLength, 0];
            const sizes = [1, length[i], elementPerRow];
            tensors[i] = reshape(slice(tensor, indices, sizes), outputElementShape);
        }
        tensor.dispose();
        return tensors;
    });
    const list = new TensorList([], elementShape, tensor.dtype, length.length);
    for (let i = 0; i < tensors.length; i++) {
        list.setItem(i, tensors[i]);
    }
    return list;
}

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const executeOp$2 = async (node, tensorMap, context) => {
    switch (node.op) {
        case 'If':
        case 'StatelessIf': {
            const thenFunc = getParamValue('thenBranch', node, tensorMap, context);
            const elseFunc = getParamValue('elseBranch', node, tensorMap, context);
            const cond = getParamValue('cond', node, tensorMap, context);
            const args = getParamValue('args', node, tensorMap, context);
            const condValue = await cond.data();
            if (condValue[0]) {
                return context.functionMap[thenFunc].executeFunctionAsync(args, context.tensorArrayMap, context.tensorListMap);
            }
            else {
                return context.functionMap[elseFunc].executeFunctionAsync(args, context.tensorArrayMap, context.tensorListMap);
            }
        }
        case 'While':
        case 'StatelessWhile': {
            const bodyFunc = getParamValue('body', node, tensorMap, context);
            const condFunc = getParamValue('cond', node, tensorMap, context);
            const args = getParamValue('args', node, tensorMap, context);
            // Calculate the condition of the loop
            const condResult = (await context.functionMap[condFunc].executeFunctionAsync(args, context.tensorArrayMap, context.tensorListMap));
            const argIds = args.map(tensor => tensor.id);
            let condValue = await condResult[0].data();
            // Dispose the intermediate tensors for condition function
            condResult.forEach(tensor => {
                if (!tensor.kept && argIds.indexOf(tensor.id) === -1) {
                    tensor.dispose();
                }
            });
            let result = args;
            while (condValue[0]) {
                // Record the previous result for intermediate tensor tracking
                const origResult = result;
                // Execution the body of the loop
                result = await context.functionMap[bodyFunc].executeFunctionAsync(result, context.tensorArrayMap, context.tensorListMap);
                const resultIds = result.map(tensor => tensor.id);
                // Dispose the intermediate tensor for body function that is not global
                // kept, not input/output of the body function
                origResult.forEach(tensor => {
                    if (!tensor.kept && argIds.indexOf(tensor.id) === -1 &&
                        resultIds.indexOf(tensor.id) === -1) {
                        tensor.dispose();
                    }
                });
                // Recalcuate the condition of the loop using the latest results.
                const condResult = (await context.functionMap[condFunc].executeFunctionAsync(result, context.tensorArrayMap, context.tensorListMap));
                condValue = await condResult[0].data();
                // Dispose the intermediate tensors for condition function
                condResult.forEach(tensor => {
                    if (!tensor.kept && argIds.indexOf(tensor.id) === -1 &&
                        resultIds.indexOf(tensor.id) === -1) {
                        tensor.dispose();
                    }
                });
            }
            return result;
        }
        case 'LoopCond': {
            const pred = getParamValue('pred', node, tensorMap, context);
            return [cloneTensor(pred)];
        }
        case 'Switch': {
            const pred = getParamValue('pred', node, tensorMap, context);
            let data = getParamValue('data', node, tensorMap, context);
            if (!data.kept) {
                data = cloneTensor(data);
            }
            // Outputs nodes :0 => false, :1 => true
            return (await pred.data())[0] ? [undefined, data] : [data, undefined];
        }
        case 'Merge': {
            const inputName = node.inputNames.find(name => getTensor(name, tensorMap, context) !== undefined);
            if (inputName) {
                const data = getTensor(inputName, tensorMap, context);
                return [cloneTensor(data)];
            }
            return undefined;
        }
        case 'Enter': {
            const frameId = getParamValue('frameName', node, tensorMap, context);
            const data = getParamValue('tensor', node, tensorMap, context);
            context.enterFrame(frameId);
            return [cloneTensor(data)];
        }
        case 'Exit': {
            const data = getParamValue('tensor', node, tensorMap, context);
            context.exitFrame();
            return [cloneTensor(data)];
        }
        case 'NextIteration': {
            const data = getParamValue('tensor', node, tensorMap, context);
            context.nextIteration();
            return [cloneTensor(data)];
        }
        case 'TensorArrayV3': {
            const size = getParamValue('size', node, tensorMap, context);
            const dtype = getParamValue('dtype', node, tensorMap, context);
            const elementShape = getParamValue('elementShape', node, tensorMap, context);
            const dynamicSize = getParamValue('dynamicSize', node, tensorMap, context);
            const clearAfterRead = getParamValue('clearAfterRead', node, tensorMap, context);
            const identicalElementShapes = getParamValue('identicalElementShapes', node, tensorMap, context);
            const name = getParamValue('name', node, tensorMap, context);
            const tensorArray = new TensorArray(name, dtype, size, elementShape, identicalElementShapes, dynamicSize, clearAfterRead);
            context.addTensorArray(tensorArray);
            return [tensorArray.idTensor, scalar(1.0)];
        }
        case 'TensorArrayWriteV3': {
            const id = getParamValue('tensorArrayId', node, tensorMap, context);
            const index = getParamValue('index', node, tensorMap, context);
            const writeTensor = getParamValue('tensor', node, tensorMap, context);
            const writeTensorArray = context.getTensorArray(id.id);
            writeTensorArray.write(index, writeTensor);
            return [writeTensorArray.idTensor];
        }
        case 'TensorArrayReadV3': {
            const readId = getParamValue('tensorArrayId', node, tensorMap, context);
            const readIndex = getParamValue('index', node, tensorMap, context);
            const readTensorArray = context.getTensorArray(readId.id);
            return [readTensorArray.read(readIndex)];
        }
        case 'TensorArrayGatherV3': {
            const gatherId = getParamValue('tensorArrayId', node, tensorMap, context);
            const gatherIndices = getParamValue('indices', node, tensorMap, context);
            const gatherDtype = getParamValue('dtype', node, tensorMap, context);
            const gatherTensorArray = context.getTensorArray(gatherId.id);
            return [gatherTensorArray.gather(gatherIndices, gatherDtype)];
        }
        case 'TensorArrayScatterV3': {
            const scatterId = getParamValue('tensorArrayId', node, tensorMap, context);
            const scatterIndices = getParamValue('indices', node, tensorMap, context);
            const scatterTensor = getParamValue('tensor', node, tensorMap, context);
            const scatterTensorArray = context.getTensorArray(scatterId.id);
            scatterTensorArray.scatter(scatterIndices, scatterTensor);
            return [scatterTensorArray.idTensor];
        }
        case 'TensorArrayConcatV3': {
            const concatId = getParamValue('tensorArrayId', node, tensorMap, context);
            const concatTensorArray = context.getTensorArray(concatId.id);
            const concatDtype = getParamValue('dtype', node, tensorMap, context);
            return [concatTensorArray.concat(concatDtype)];
        }
        case 'TensorArraySplitV3': {
            const splitId = getParamValue('tensorArrayId', node, tensorMap, context);
            const splitTensor = getParamValue('tensor', node, tensorMap, context);
            const lengths = getParamValue('lengths', node, tensorMap, context);
            const splitTensorArray = context.getTensorArray(splitId.id);
            splitTensorArray.split(lengths, splitTensor);
            return [splitTensorArray.idTensor];
        }
        case 'TensorArraySizeV3': {
            const sizeId = getParamValue('tensorArrayId', node, tensorMap, context);
            const sizeTensorArray = context.getTensorArray(sizeId.id);
            return [scalar(sizeTensorArray.size(), 'int32')];
        }
        case 'TensorArrayCloseV3': {
            const closeId = getParamValue('tensorArrayId', node, tensorMap, context);
            const closeTensorArray = context.getTensorArray(closeId.id);
            closeTensorArray.clearAndClose();
            return [closeTensorArray.idTensor];
        }
        case 'TensorListSetItem': {
            const idTensor = getParamValue('tensorListId', node, tensorMap, context);
            const index = getParamValue('index', node, tensorMap, context);
            const writeTensor = getParamValue('tensor', node, tensorMap, context);
            const tensorList = context.getTensorList(idTensor.id);
            tensorList.setItem(index, writeTensor);
            return [tensorList.idTensor];
        }
        case 'TensorListGetItem': {
            const idTensor = getParamValue('tensorListId', node, tensorMap, context);
            const readIndex = getParamValue('index', node, tensorMap, context);
            const elementShape = getParamValue('elementShape', node, tensorMap, context);
            const elementDType = getParamValue('elementDType', node, tensorMap, context);
            const tensorList = context.getTensorList(idTensor.id);
            return [tensorList.getItem(readIndex, elementShape, elementDType)];
        }
        case 'TensorListScatterV2':
        case 'TensorListScatter': {
            const scatterIndices = getParamValue('indices', node, tensorMap, context);
            const scatterTensor = getParamValue('tensor', node, tensorMap, context);
            const elementShape = getParamValue('elementShape', node, tensorMap, context);
            const numElements = getParamValue('numElements', node, tensorMap, context);
            const tensorList = scatter(scatterTensor, scatterIndices, elementShape, numElements);
            context.addTensorList(tensorList);
            return [tensorList.idTensor];
        }
        case 'TensorListReserve':
        case 'EmptyTensorList': {
            const elementShape = getParamValue('elementShape', node, tensorMap, context);
            const elementDtype = getParamValue('elementDType', node, tensorMap, context);
            let numElementsParam;
            if (node.op === 'TensorListReserve') {
                numElementsParam = 'numElements';
            }
            else {
                numElementsParam = 'maxNumElements';
            }
            const numElements = getParamValue(numElementsParam, node, tensorMap, context);
            const tensorList = reserve(elementShape, elementDtype, numElements);
            context.addTensorList(tensorList);
            return [tensorList.idTensor];
        }
        case 'TensorListGather': {
            const gatherId = getParamValue('tensorListId', node, tensorMap, context);
            const gatherIndices = getParamValue('indices', node, tensorMap, context);
            const elementShape = getParamValue('elementShape', node, tensorMap, context);
            const elementDtype = getParamValue('elementDType', node, tensorMap, context);
            const tensorList = context.getTensorList(gatherId.id);
            return [tensorList.gather(gatherIndices, elementDtype, elementShape)];
        }
        case 'TensorListStack': {
            const idTensor = getParamValue('tensorListId', node, tensorMap, context);
            const elementShape = getParamValue('elementShape', node, tensorMap, context);
            const elementDtype = getParamValue('elementDType', node, tensorMap, context);
            const numElements = getParamValue('numElements', node, tensorMap, context);
            const tensorList = context.getTensorList(idTensor.id);
            return [tensorList.stack(elementShape, elementDtype, numElements)];
        }
        case 'TensorListFromTensor': {
            const tensor = getParamValue('tensor', node, tensorMap, context);
            const elementShape = getParamValue('elementShape', node, tensorMap, context);
            const elementDtype = getParamValue('elementDType', node, tensorMap, context);
            const tensorList = fromTensor(tensor, elementShape, elementDtype);
            context.addTensorList(tensorList);
            return [tensorList.idTensor];
        }
        case 'TensorListConcat': {
            const concatId = getParamValue('tensorListId', node, tensorMap, context);
            const tensorList = context.getTensorList(concatId.id);
            const concatDtype = getParamValue('dtype', node, tensorMap, context);
            const elementShape = getParamValue('elementShape', node, tensorMap, context);
            return [tensorList.concat(concatDtype, elementShape)];
        }
        case 'TensorListPushBack': {
            const idTensor = getParamValue('tensorListId', node, tensorMap, context);
            const writeTensor = getParamValue('tensor', node, tensorMap, context);
            const tensorList = context.getTensorList(idTensor.id);
            tensorList.pushBack(writeTensor);
            return [tensorList.idTensor];
        }
        case 'TensorListPopBack': {
            const idTensor = getParamValue('tensorListId', node, tensorMap, context);
            const elementShape = getParamValue('elementShape', node, tensorMap, context);
            const elementDType = getParamValue('elementDType', node, tensorMap, context);
            const tensorList = context.getTensorList(idTensor.id);
            return [tensorList.popBack(elementShape, elementDType)];
        }
        case 'TensorListSplit': {
            const splitTensor = getParamValue('tensor', node, tensorMap, context);
            const elementShape = getParamValue('elementShape', node, tensorMap, context);
            const lengths = getParamValue('lengths', node, tensorMap, context);
            const tensorList = split(splitTensor, lengths, elementShape);
            context.addTensorList(tensorList);
            return [tensorList.idTensor];
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function fusedConvAndDepthWiseParams(node, tensorMap, context) {
    const [extraOp, activationFunc] = getParamValue('fusedOps', node, tensorMap, context);
    const isBiasAdd = extraOp === 'biasadd';
    const noBiasAdd = !isBiasAdd;
    const isPrelu = activationFunc === 'prelu';
    const isBatchNorm = extraOp === 'fusedbatchnorm';
    const numArgs = getParamValue('numArgs', node, tensorMap, context);
    if (isBiasAdd) {
        if (isPrelu && numArgs !== 2) {
            throw new Error('FusedConv2d and DepthwiseConv2d with BiasAdd and Prelu ' +
                'must have two extra arguments: bias and alpha.');
        }
        if (!isPrelu && isBiasAdd && numArgs !== 1) {
            throw new Error('FusedConv2d and DepthwiseConv2d with BiasAdd must have ' +
                'one extra argument: bias.');
        }
    }
    if (isBatchNorm) {
        throw new Error('FusedConv2d and DepthwiseConv2d with FusedBatchNorm is not supported');
    }
    const stride = getParamValue('strides', node, tensorMap, context);
    const pad = getPadding(node, tensorMap, context);
    const dataFormat = getParamValue('dataFormat', node, tensorMap, context)
        .toUpperCase();
    const dilations = getParamValue('dilations', node, tensorMap, context);
    let [biasArg, preluArg] = getParamValue('args', node, tensorMap, context);
    if (noBiasAdd) {
        preluArg = biasArg;
        biasArg = undefined;
    }
    const leakyreluAlpha = getParamValue('leakyreluAlpha', node, tensorMap, context);
    return {
        stride,
        pad,
        dataFormat,
        dilations,
        biasArg,
        preluArg,
        activationFunc,
        leakyreluAlpha
    };
}
const executeOp$3 = (node, tensorMap, context) => {
    switch (node.op) {
        case 'Conv1D': {
            const stride = getParamValue('stride', node, tensorMap, context);
            const pad = getParamValue('pad', node, tensorMap, context);
            const dataFormat = getParamValue('dataFormat', node, tensorMap, context)
                .toUpperCase();
            const dilation = getParamValue('dilation', node, tensorMap, context);
            return [conv1d(getParamValue('x', node, tensorMap, context), getParamValue('filter', node, tensorMap, context), stride, pad, dataFormat, dilation)];
        }
        case 'Conv2D': {
            const stride = getParamValue('strides', node, tensorMap, context);
            const pad = getPadding(node, tensorMap, context);
            const dataFormat = getParamValue('dataFormat', node, tensorMap, context)
                .toUpperCase();
            const dilations = getParamValue('dilations', node, tensorMap, context);
            return [conv2d$1(getParamValue('x', node, tensorMap, context), getParamValue('filter', node, tensorMap, context), [stride[1], stride[2]], pad, dataFormat, [dilations[1], dilations[2]])];
        }
        case '_FusedConv2D': {
            const { stride, pad, dataFormat, dilations, biasArg, preluArg, activationFunc, leakyreluAlpha } = fusedConvAndDepthWiseParams(node, tensorMap, context);
            return [conv2d({
                    x: getParamValue('x', node, tensorMap, context),
                    filter: getParamValue('filter', node, tensorMap, context),
                    strides: [stride[1], stride[2]],
                    pad: pad,
                    dataFormat: dataFormat,
                    dilations: [dilations[1], dilations[2]],
                    bias: biasArg,
                    activation: activationFunc,
                    preluActivationWeights: preluArg,
                    leakyreluAlpha
                })];
        }
        case 'FusedDepthwiseConv2dNative': {
            const { stride, pad, dataFormat, dilations, biasArg, preluArg, activationFunc, leakyreluAlpha, } = fusedConvAndDepthWiseParams(node, tensorMap, context);
            return [depthwiseConv2d$1({
                    x: getParamValue('x', node, tensorMap, context),
                    filter: getParamValue('filter', node, tensorMap, context),
                    strides: [stride[1], stride[2]],
                    pad: pad,
                    dataFormat: dataFormat,
                    dilations: [dilations[1], dilations[2]],
                    bias: biasArg,
                    activation: activationFunc,
                    preluActivationWeights: preluArg,
                    leakyreluAlpha
                })];
        }
        case 'Conv2DBackpropInput':
        case 'Conv2dTranspose': {
            const shape = getParamValue('outputShape', node, tensorMap, context);
            const stride = getParamValue('strides', node, tensorMap, context);
            const pad = getPadding(node, tensorMap, context);
            return [conv2dTranspose(getParamValue('x', node, tensorMap, context), getParamValue('filter', node, tensorMap, context), shape, [stride[1], stride[2]], pad)];
        }
        case 'DepthwiseConv2dNative':
        case 'DepthwiseConv2d': {
            const stride = getParamValue('strides', node, tensorMap, context);
            const pad = getPadding(node, tensorMap, context);
            const dilations = getParamValue('dilations', node, tensorMap, context);
            const dataFormat = getParamValue('dataFormat', node, tensorMap, context)
                .toUpperCase();
            return [depthwiseConv2d(getParamValue('input', node, tensorMap, context), getParamValue('filter', node, tensorMap, context), [stride[1], stride[2]], pad, dataFormat, [dilations[1], dilations[2]])];
        }
        case 'Conv3D': {
            const stride = getParamValue('strides', node, tensorMap, context);
            const pad = getParamValue('pad', node, tensorMap, context);
            const dataFormat = getParamValue('dataFormat', node, tensorMap, context)
                .toUpperCase();
            const dilations = getParamValue('dilations', node, tensorMap, context);
            return [conv3d(getParamValue('x', node, tensorMap, context), getParamValue('filter', node, tensorMap, context), [stride[1], stride[2], stride[3]], pad, dataFormat, [dilations[1], dilations[2], dilations[3]])];
        }
        case 'AvgPool': {
            const stride = getParamValue('strides', node, tensorMap, context);
            const pad = getParamValue('pad', node, tensorMap, context);
            const kernelSize = getParamValue('kernelSize', node, tensorMap, context);
            return [avgPool(getParamValue('x', node, tensorMap, context), [kernelSize[1], kernelSize[2]], [stride[1], stride[2]], pad)];
        }
        case 'MaxPool': {
            const stride = getParamValue('strides', node, tensorMap, context);
            const pad = getParamValue('pad', node, tensorMap, context);
            const kernelSize = getParamValue('kernelSize', node, tensorMap, context);
            return [maxPool(getParamValue('x', node, tensorMap, context), [kernelSize[1], kernelSize[2]], [stride[1], stride[2]], pad)];
        }
        case 'MaxPoolWithArgmax': {
            const stride = getParamValue('strides', node, tensorMap, context);
            const pad = getParamValue('pad', node, tensorMap, context);
            const kernelSize = getParamValue('kernelSize', node, tensorMap, context);
            const includeBatchInIndex = getParamValue('includeBatchInIndex', node, tensorMap, context);
            const { result, indexes } = maxPoolWithArgmax(getParamValue('x', node, tensorMap, context), [kernelSize[1], kernelSize[2]], [stride[1], stride[2]], pad, includeBatchInIndex);
            return [result, indexes];
        }
        case 'AvgPool3D': {
            const stride = getParamValue('strides', node, tensorMap, context);
            const pad = getParamValue('pad', node, tensorMap, context);
            const kernelSize = getParamValue('kernelSize', node, tensorMap, context);
            return [avgPool3d(getParamValue('x', node, tensorMap, context), [kernelSize[1], kernelSize[2], kernelSize[3]], [stride[1], stride[2], stride[3]], pad)];
        }
        case 'MaxPool3D': {
            const stride = getParamValue('strides', node, tensorMap, context);
            const pad = getParamValue('pad', node, tensorMap, context);
            const kernelSize = getParamValue('kernelSize', node, tensorMap, context);
            return [maxPool3d(getParamValue('x', node, tensorMap, context), [kernelSize[1], kernelSize[2], kernelSize[3]], [stride[1], stride[2], stride[3]], pad)];
        }
        case 'Dilation2D': {
            const strides = getParamValue('strides', node, tensorMap, context);
            const pad = getParamValue('pad', node, tensorMap, context);
            const dilations = getParamValue('dilations', node, tensorMap, context);
            // strides: [1, stride_height, stride_width, 1].
            const strideHeight = strides[1];
            const strideWidth = strides[2];
            // dilations: [1, dilation_height, dilation_width, 1].
            const dilationHeight = dilations[1];
            const dilationWidth = dilations[2];
            return [dilation2d(getParamValue('x', node, tensorMap, context), getParamValue('filter', node, tensorMap, context), [strideHeight, strideWidth], pad, [dilationHeight, dilationWidth], 'NHWC' /* dataFormat */)];
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const executeOp$4 = (node, tensorMap, context) => {
    switch (node.op) {
        case 'Fill': {
            const shape = getParamValue('shape', node, tensorMap, context);
            const dtype = getParamValue('dtype', node, tensorMap, context);
            const value = getParamValue('value', node, tensorMap, context);
            return [fill(shape, value, dtype)];
        }
        case 'LinSpace': {
            const start = getParamValue('start', node, tensorMap, context);
            const stop = getParamValue('stop', node, tensorMap, context);
            const num = getParamValue('num', node, tensorMap, context);
            return [linspace(start, stop, num)];
        }
        case 'Multinomial': {
            const logits = getParamValue('logits', node, tensorMap, context);
            const numSamples = getParamValue('numSamples', node, tensorMap, context);
            const seed = getParamValue('seed', node, tensorMap, context);
            return [multinomial(logits, numSamples, seed)];
        }
        case 'OneHot': {
            const indices = getParamValue('indices', node, tensorMap, context);
            const depth = getParamValue('depth', node, tensorMap, context);
            const onValue = getParamValue('onValue', node, tensorMap, context);
            const offValue = getParamValue('offValue', node, tensorMap, context);
            return [oneHot(indices, depth, onValue, offValue)];
        }
        case 'Ones': {
            return [ones(getParamValue('shape', node, tensorMap, context), getParamValue('dtype', node, tensorMap, context))];
        }
        case 'OnesLike': {
            return [onesLike(getParamValue('x', node, tensorMap, context))];
        }
        case 'RandomUniform': {
            return [randomUniform(
                // tslint:disable-next-line:no-any
                getParamValue('shape', node, tensorMap, context), getParamValue('minval', node, tensorMap, context), getParamValue('maxval', node, tensorMap, context), getParamValue('dtype', node, tensorMap, context))];
        }
        case 'Range': {
            const start = getParamValue('start', node, tensorMap, context);
            const stop = getParamValue('stop', node, tensorMap, context);
            const step = getParamValue('step', node, tensorMap, context);
            return [range(start, stop, step, getParamValue('dtype', node, tensorMap, context))];
        }
        case 'TruncatedNormal': {
            const shape = getParamValue('shape', node, tensorMap, context);
            const mean = getParamValue('mean', node, tensorMap, context);
            const stdDev = getParamValue('stdDev', node, tensorMap, context);
            const seed = getParamValue('seed', node, tensorMap, context);
            return [truncatedNormal(shape, mean, stdDev, getParamValue('dtype', node, tensorMap, context), seed)];
        }
        case 'Zeros': {
            return [zeros(getParamValue('shape', node, tensorMap, context), getParamValue('dtype', node, tensorMap, context))];
        }
        case 'ZerosLike': {
            return [zerosLike(getParamValue('x', node, tensorMap, context))];
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function nmsParams(node, tensorMap, context) {
    const boxes = getParamValue('boxes', node, tensorMap, context);
    const scores = getParamValue('scores', node, tensorMap, context);
    const maxOutputSize = getParamValue('maxOutputSize', node, tensorMap, context);
    const iouThreshold = getParamValue('iouThreshold', node, tensorMap, context);
    const scoreThreshold = getParamValue('scoreThreshold', node, tensorMap, context);
    const softNmsSigma = getParamValue('softNmsSigma', node, tensorMap, context);
    return {
        boxes,
        scores,
        maxOutputSize,
        iouThreshold,
        scoreThreshold,
        softNmsSigma
    };
}
const executeOp$5 = async (node, tensorMap, context) => {
    switch (node.op) {
        case 'NonMaxSuppressionV5': {
            const { boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma } = nmsParams(node, tensorMap, context);
            const result = await image$1.nonMaxSuppressionWithScoreAsync(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma);
            return [result.selectedIndices, result.selectedScores];
        }
        case 'NonMaxSuppressionV4': {
            const { boxes, scores, maxOutputSize, iouThreshold, scoreThreshold } = nmsParams(node, tensorMap, context);
            const padToMaxOutputSize = getParamValue('padToMaxOutputSize', node, tensorMap, context);
            const result = await image$1.nonMaxSuppressionPaddedAsync(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, padToMaxOutputSize);
            return [result.selectedIndices, result.validOutputs];
        }
        case 'NonMaxSuppressionV3':
        case 'NonMaxSuppressionV2': {
            const { boxes, scores, maxOutputSize, iouThreshold, scoreThreshold } = nmsParams(node, tensorMap, context);
            return [await image$1.nonMaxSuppressionAsync(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold)];
        }
        case 'Where': {
            const condition = cast(getParamValue('condition', node, tensorMap, context), 'bool');
            const result = [await whereAsync(condition)];
            condition.dispose();
            return result;
        }
        case 'ListDiff': {
            return setdiff1dAsync(getParamValue('x', node, tensorMap, context), getParamValue('y', node, tensorMap, context));
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const executeOp$6 = (node, tensorMap, context) => {
    switch (node.op) {
        case 'TopKV2': {
            const x = getParamValue('x', node, tensorMap, context);
            const k = getParamValue('k', node, tensorMap, context);
            const sorted = getParamValue('sorted', node, tensorMap, context);
            const result = topk(x, k, sorted);
            return [result.values, result.indices];
        }
        case 'Unique': {
            const x = getParamValue('x', node, tensorMap, context);
            const result = unique(x);
            return [result.values, result.indices];
        }
        case 'UniqueV2': {
            const x = getParamValue('x', node, tensorMap, context);
            const axis = getParamValue('axis', node, tensorMap, context);
            const result = unique(x, axis);
            return [result.values, result.indices];
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const executeOp$7 = (node, tensorMap, context) => {
    switch (node.op) {
        case 'Const': {
            return tensorMap[node.name];
        }
        case 'PlaceholderWithDefault':
            const def = getParamValue('default', node, tensorMap, context);
            return [getTensor(node.name, tensorMap, context) || def];
        case 'Placeholder':
            return [getTensor(node.name, tensorMap, context)];
        case 'Identity':
        case 'StopGradient':
        case 'FakeQuantWithMinMaxVars': { // This op is currently ignored.
            const data = getParamValue('x', node, tensorMap, context);
            return [cloneTensor(data)];
        }
        case 'IdentityN':
            return getParamValue('x', node, tensorMap, context)
                .map((t) => cloneTensor(t));
        case 'Snapshot':
            const snapshot = getParamValue('x', node, tensorMap, context);
            return [cloneTensor(snapshot)];
        case 'Shape':
            return [tensor1d(getParamValue('x', node, tensorMap, context).shape, 'int32')];
        case 'ShapeN':
            return getParamValue('x', node, tensorMap, context)
                .map((t) => tensor1d(t.shape));
        case 'Size':
            return [scalar(getParamValue('x', node, tensorMap, context).size, 'int32')];
        case 'Rank':
            return [scalar(getParamValue('x', node, tensorMap, context).rank, 'int32')];
        case 'NoOp':
            return [scalar(1)];
        case 'Print':
            const input = getParamValue('x', node, tensorMap, context);
            const data = getParamValue('data', node, tensorMap, context);
            const message = getParamValue('message', node, tensorMap, context);
            const summarize = getParamValue('summarize', node, tensorMap, context);
            console.warn('The graph has a tf.print() operation,' +
                'usually used for debugging, which slows down performance.');
            console.log(message);
            for (let i = 0; i < data.length; i++) {
                console.log(Array.prototype.slice.call(data[i].dataSync())
                    .slice(0, summarize));
            }
            return [input];
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * Hashtable contains a set of tensors, which can be accessed by key.
 */
class HashTable {
    /**
     * Constructor of HashTable. Creates a hash table.
     *
     * @param keyDType `dtype` of the table keys.
     * @param valueDType `dtype` of the table values.
     */
    constructor(keyDType, valueDType) {
        this.keyDType = keyDType;
        this.valueDType = valueDType;
        this.handle = scalar(0);
        // tslint:disable-next-line: no-any
        this.tensorMap = new Map();
        keep(this.handle);
    }
    get id() {
        return this.handle.id;
    }
    /**
     * Dispose the tensors and handle and clear the hashtable.
     */
    clearAndClose() {
        this.tensorMap.forEach(value => value.dispose());
        this.tensorMap.clear();
        this.handle.dispose();
    }
    /**
     * The number of items in the hash table.
     */
    size() {
        return this.tensorMap.size;
    }
    /**
     * The number of items in the hash table as a rank-0 tensor.
     */
    tensorSize() {
        return scalar(this.size(), 'int32');
    }
    /**
     * Replaces the contents of the table with the specified keys and values.
     * @param keys Keys to store in the hashtable.
     * @param values Values to store in the hashtable.
     */
    async import(keys, values) {
        this.checkKeyAndValueTensor(keys, values);
        // We only store the primitive values of the keys, this allows lookup
        // to be O(1).
        const $keys = await keys.data();
        // Clear the hashTable before inserting new values.
        this.tensorMap.forEach(value => value.dispose());
        this.tensorMap.clear();
        return tidy(() => {
            const $values = unstack(values);
            const keysLength = $keys.length;
            const valuesLength = $values.length;
            assert(keysLength === valuesLength, () => `The number of elements doesn't match, keys has ` +
                `${keysLength} elements, the values has ${valuesLength} ` +
                `elements.`);
            for (let i = 0; i < keysLength; i++) {
                const key = $keys[i];
                const value = $values[i];
                keep(value);
                this.tensorMap.set(key, value);
            }
            return this.handle;
        });
    }
    /**
     * Looks up keys in a hash table, outputs the corresponding values.
     *
     * Performs batch lookups, for every element in the key tensor, `find`
     * stacks the corresponding value into the return tensor.
     *
     * If an element is not present in the table, the given `defaultValue` is
     * used.
     *
     * @param keys Keys to look up. Must have the same type as the keys of the
     *     table.
     * @param defaultValue The scalar `defaultValue` is the value output for keys
     *     not present in the table. It must also be of the same type as the
     *     table values.
     */
    async find(keys, defaultValue) {
        this.checkKeyAndValueTensor(keys, defaultValue);
        const $keys = await keys.data();
        return tidy(() => {
            const result = [];
            for (let i = 0; i < $keys.length; i++) {
                const key = $keys[i];
                const value = this.findWithDefault(key, defaultValue);
                result.push(value);
            }
            return stack(result);
        });
    }
    // tslint:disable-next-line: no-any
    findWithDefault(key, defaultValue) {
        const result = this.tensorMap.get(key);
        return result != null ? result : defaultValue;
    }
    checkKeyAndValueTensor(key, value) {
        if (key.dtype !== this.keyDType) {
            throw new Error(`Expect key dtype ${this.keyDType}, but got ` +
                `${key.dtype}`);
        }
        if (value.dtype !== this.valueDType) {
            throw new Error(`Expect value dtype ${this.valueDType}, but got ` +
                `${value.dtype}`);
        }
    }
}

/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const executeOp$8 = async (node, tensorMap, context, resourceManager) => {
    switch (node.op) {
        case 'HashTable':
        case 'HashTableV2': {
            const keyDType = getParamValue('keyDType', node, tensorMap, context);
            const valueDType = getParamValue('valueDType', node, tensorMap, context);
            const hashTable = new HashTable(keyDType, valueDType);
            resourceManager.addHashTable(node.name, hashTable);
            return [hashTable.handle];
        }
        case 'LookupTableImport':
        case 'LookupTableImportV2': {
            const handle = getParamValue('tableHandle', node, tensorMap, context, resourceManager);
            const keys = getParamValue('keys', node, tensorMap, context);
            const values = getParamValue('values', node, tensorMap, context);
            const hashTable = resourceManager.getHashTableById(handle.id);
            return [await hashTable.import(keys, values)];
        }
        case 'LookupTableFind':
        case 'LookupTableFindV2': {
            const handle = getParamValue('tableHandle', node, tensorMap, context, resourceManager);
            const keys = getParamValue('keys', node, tensorMap, context);
            const defaultValue = getParamValue('defaultValue', node, tensorMap, context);
            const hashTable = resourceManager.getHashTableById(handle.id);
            return [await hashTable.find(keys, defaultValue)];
        }
        case 'LookupTableSize':
        case 'LookupTableSizeV2': {
            const handle = getParamValue('tableHandle', node, tensorMap, context, resourceManager);
            const hashTable = resourceManager.getHashTableById(handle.id);
            return [hashTable.tensorSize()];
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const executeOp$9 = (node, tensorMap, context) => {
    switch (node.op) {
        case 'ResizeBilinear': {
            const images = getParamValue('images', node, tensorMap, context);
            const size = getParamValue('size', node, tensorMap, context);
            const alignCorners = getParamValue('alignCorners', node, tensorMap, context);
            const halfPixelCenters = getParamValue('halfPixelCenters', node, tensorMap, context);
            return [image$1.resizeBilinear(images, [size[0], size[1]], alignCorners, halfPixelCenters)];
        }
        case 'ResizeNearestNeighbor': {
            const images = getParamValue('images', node, tensorMap, context);
            const size = getParamValue('size', node, tensorMap, context);
            const alignCorners = getParamValue('alignCorners', node, tensorMap, context);
            const halfPixelCenters = getParamValue('halfPixelCenters', node, tensorMap, context);
            return [image$1.resizeNearestNeighbor(images, [size[0], size[1]], alignCorners, halfPixelCenters)];
        }
        case 'CropAndResize': {
            const image = getParamValue('image', node, tensorMap, context);
            const boxes = getParamValue('boxes', node, tensorMap, context);
            const boxInd = getParamValue('boxInd', node, tensorMap, context);
            const cropSize = getParamValue('cropSize', node, tensorMap, context);
            const method = getParamValue('method', node, tensorMap, context);
            const extrapolationValue = getParamValue('extrapolationValue', node, tensorMap, context);
            return [image$1.cropAndResize(image, boxes, boxInd, cropSize, method, extrapolationValue)];
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const executeOp$a = (node, tensorMap, context) => {
    switch (node.op) {
        case 'Equal': {
            return [equal(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'NotEqual': {
            return [notEqual(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'Greater': {
            return [greater(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'GreaterEqual': {
            return [greaterEqual(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'Less': {
            return [less(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'LessEqual': {
            return [lessEqual(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'LogicalAnd': {
            return [logicalAnd(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'LogicalNot': {
            return [logicalNot(getParamValue('a', node, tensorMap, context))];
        }
        case 'LogicalOr': {
            return [logicalOr(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        case 'Select':
        case 'SelectV2': {
            return [where(getParamValue('condition', node, tensorMap, context), getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context))];
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const executeOp$b = (node, tensorMap, context) => {
    switch (node.op) {
        case 'BatchMatMul':
        case 'BatchMatMulV2':
        case 'MatMul':
            return [matMul$1(getParamValue('a', node, tensorMap, context), getParamValue('b', node, tensorMap, context), getParamValue('transposeA', node, tensorMap, context), getParamValue('transposeB', node, tensorMap, context))];
        case 'Einsum':
            return [einsum(getParamValue('equation', node, tensorMap, context), ...getParamValue('tensors', node, tensorMap, context))];
        case 'Transpose':
            return [transpose(getParamValue('x', node, tensorMap, context), getParamValue('perm', node, tensorMap, context))];
        case '_FusedMatMul':
            const [extraOp, activationFunc] = getParamValue('fusedOps', node, tensorMap, context);
            const isBiasAdd = extraOp === 'biasadd';
            const isPrelu = activationFunc === 'prelu';
            const numArgs = getParamValue('numArgs', node, tensorMap, context);
            const leakyreluAlpha = getParamValue('leakyreluAlpha', node, tensorMap, context);
            if (isBiasAdd) {
                if (isPrelu && numArgs !== 2) {
                    throw new Error('Fused MatMul with BiasAdd and Prelu must have two ' +
                        'extra arguments: bias and alpha.');
                }
                if (!isPrelu && numArgs !== 1) {
                    throw new Error('Fused MatMul with BiasAdd must have one extra argument: bias.');
                }
            }
            const [biasArg, preluArg] = getParamValue('args', node, tensorMap, context);
            return [matMul({
                    a: getParamValue('a', node, tensorMap, context),
                    b: getParamValue('b', node, tensorMap, context),
                    transposeA: getParamValue('transposeA', node, tensorMap, context),
                    transposeB: getParamValue('transposeB', node, tensorMap, context),
                    bias: biasArg,
                    activation: activationFunc,
                    preluActivationWeights: preluArg,
                    leakyreluAlpha
                })];
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const executeOp$c = (node, tensorMap, context) => {
    switch (node.op) {
        case 'FusedBatchNorm':
        case 'FusedBatchNormV2': {
            return [batchNorm(getParamValue('x', node, tensorMap, context), getParamValue('mean', node, tensorMap, context), getParamValue('variance', node, tensorMap, context), getParamValue('offset', node, tensorMap, context), getParamValue('scale', node, tensorMap, context), getParamValue('epsilon', node, tensorMap, context))];
        }
        case 'FusedBatchNormV3': {
            return [batchNorm(getParamValue('x', node, tensorMap, context), getParamValue('mean', node, tensorMap, context), getParamValue('variance', node, tensorMap, context), getParamValue('offset', node, tensorMap, context), getParamValue('scale', node, tensorMap, context), getParamValue('epsilon', node, tensorMap, context))];
        }
        case 'LRN': {
            return [localResponseNormalization(getParamValue('x', node, tensorMap, context), getParamValue('radius', node, tensorMap, context), getParamValue('bias', node, tensorMap, context), getParamValue('alpha', node, tensorMap, context), getParamValue('beta', node, tensorMap, context))];
        }
        case 'Softmax': {
            return [softmax(getParamValue('x', node, tensorMap, context))];
        }
        case 'LogSoftmax': {
            return [logSoftmax(getParamValue('x', node, tensorMap, context))];
        }
        case 'SparseToDense': {
            return [sparseToDense(getParamValue('sparseIndices', node, tensorMap, context), getParamValue('outputShape', node, tensorMap, context), getParamValue('sparseValues', node, tensorMap, context), getParamValue('defaultValue', node, tensorMap, context))];
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const executeOp$d = (node, tensorMap, context) => {
    switch (node.op) {
        case 'Max': {
            const axis = getParamValue('axis', node, tensorMap, context);
            const keepDims = getParamValue('keepDims', node, tensorMap, context);
            return [max(getParamValue('x', node, tensorMap, context), axis, keepDims)];
        }
        case 'Mean': {
            const axis = getParamValue('axis', node, tensorMap, context);
            const keepDims = getParamValue('keepDims', node, tensorMap, context);
            return [mean(getParamValue('x', node, tensorMap, context), axis, keepDims)];
        }
        case 'Min': {
            const axis = getParamValue('axis', node, tensorMap, context);
            const keepDims = getParamValue('keepDims', node, tensorMap, context);
            return [min(getParamValue('x', node, tensorMap, context), axis, keepDims)];
        }
        case 'Sum': {
            const axis = getParamValue('axis', node, tensorMap, context);
            const keepDims = getParamValue('keepDims', node, tensorMap, context);
            return [sum(getParamValue('x', node, tensorMap, context), axis, keepDims)];
        }
        case 'All': {
            const axis = getParamValue('axis', node, tensorMap, context);
            const keepDims = getParamValue('keepDims', node, tensorMap, context);
            return [all(getParamValue('x', node, tensorMap, context), axis, keepDims)];
        }
        case 'Any': {
            const axis = getParamValue('axis', node, tensorMap, context);
            const keepDims = getParamValue('keepDims', node, tensorMap, context);
            return [any(getParamValue('x', node, tensorMap, context), axis, keepDims)];
        }
        case 'ArgMax': {
            const axis = getParamValue('axis', node, tensorMap, context);
            return [argMax(getParamValue('x', node, tensorMap, context), axis)];
        }
        case 'ArgMin': {
            const axis = getParamValue('axis', node, tensorMap, context);
            return [argMin(getParamValue('x', node, tensorMap, context), axis)];
        }
        case 'Prod': {
            const axis = getParamValue('axis', node, tensorMap, context);
            const keepDims = getParamValue('keepDims', node, tensorMap, context);
            return [prod(getParamValue('x', node, tensorMap, context), axis, keepDims)];
        }
        case 'Cumsum': {
            const axis = getParamValue('axis', node, tensorMap, context);
            const exclusive = getParamValue('exclusive', node, tensorMap, context);
            const reverse = getParamValue('reverse', node, tensorMap, context);
            return [cumsum(getParamValue('x', node, tensorMap, context), axis, exclusive, reverse)];
        }
        case 'Bincount':
            const x = getParamValue('x', node, tensorMap, context);
            const weights = getParamValue('weights', node, tensorMap, context);
            const size = getParamValue('size', node, tensorMap, context);
            return [bincount(x, weights, size)];
        case 'DenseBincount': {
            const x = getParamValue('x', node, tensorMap, context);
            const weights = getParamValue('weights', node, tensorMap, context);
            const size = getParamValue('size', node, tensorMap, context);
            const binaryOutput = getParamValue('binaryOutput', node, tensorMap, context);
            return [denseBincount(x, weights, size, binaryOutput)];
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const executeOp$e = (node, tensorMap, context) => {
    switch (node.op) {
        case 'ConcatV2':
        case 'Concat': {
            const n = getParamValue('n', node, tensorMap, context);
            const axis = getParamValue('axis', node, tensorMap, context);
            let inputs = getParamValue('tensors', node, tensorMap, context);
            inputs = inputs.slice(0, n);
            return [concat(inputs, axis)];
        }
        case 'Gather': {
            const input = getParamValue('x', node, tensorMap, context);
            const indices = getParamValue('indices', node, tensorMap, context);
            return [gather(input, cast(indices, 'int32'), 0)];
        }
        case 'GatherV2': {
            const axis = getParamValue('axis', node, tensorMap, context);
            const batchDims = getParamValue('batchDims', node, tensorMap, context);
            const input = getParamValue('x', node, tensorMap, context);
            const indices = getParamValue('indices', node, tensorMap, context);
            return [gather(input, cast(indices, 'int32'), axis, batchDims)];
        }
        case 'Reverse': {
            const dims = getParamValue('dims', node, tensorMap, context);
            const axis = [];
            for (let i = 0; i < dims.length; i++) {
                if (dims[i]) {
                    axis.push(i);
                }
            }
            const input = getParamValue('x', node, tensorMap, context);
            return [reverse(input, axis)];
        }
        case 'ReverseV2': {
            const axis = getParamValue('axis', node, tensorMap, context);
            const input = getParamValue('x', node, tensorMap, context);
            return [reverse(input, axis)];
        }
        case 'Slice': {
            // tslint:disable-next-line:no-any
            const begin = getParamValue('begin', node, tensorMap, context);
            // tslint:disable-next-line:no-any
            const size = getParamValue('size', node, tensorMap, context);
            return [slice(getParamValue('x', node, tensorMap, context), begin, size)];
        }
        case 'StridedSlice': {
            const begin = getParamValue('begin', node, tensorMap, context);
            const end = getParamValue('end', node, tensorMap, context);
            const strides = getParamValue('strides', node, tensorMap, context);
            const beginMask = getParamValue('beginMask', node, tensorMap, context);
            const endMask = getParamValue('endMask', node, tensorMap, context);
            const ellipsisMask = getParamValue('ellipsisMask', node, tensorMap, context);
            const newAxisMask = getParamValue('newAxisMask', node, tensorMap, context);
            const shrinkAxisMask = getParamValue('shrinkAxisMask', node, tensorMap, context);
            const tensor = getParamValue('x', node, tensorMap, context);
            return [stridedSlice(tensor, begin, end, strides, beginMask, endMask, ellipsisMask, newAxisMask, shrinkAxisMask)];
        }
        case 'Pack': {
            return tidy(() => {
                const axis = getParamValue('axis', node, tensorMap, context);
                const tensors = getParamValue('tensors', node, tensorMap, context);
                // Reshape the tensors to the first tensor's shape if they don't
                // match.
                const shape = tensors[0].shape;
                const squeezedShape = squeeze(tensors[0]).shape;
                const mapped = tensors.map(tensor => {
                    const sameShape = arraysEqual(tensor.shape, shape);
                    if (!sameShape &&
                        !arraysEqual(squeeze(tensor).shape, squeezedShape)) {
                        throw new Error('the input tensors shape does not match');
                    }
                    return sameShape ? tensor : reshape(tensor, shape);
                });
                return [stack(mapped, axis)];
            });
        }
        case 'Unpack': {
            const axis = getParamValue('axis', node, tensorMap, context);
            const tensor = getParamValue('tensor', node, tensorMap, context);
            return unstack(tensor, axis);
        }
        case 'Tile': {
            const reps = getParamValue('reps', node, tensorMap, context);
            return [tile(getParamValue('x', node, tensorMap, context), reps)];
        }
        case 'Split':
        case 'SplitV': {
            const axis = getParamValue('axis', node, tensorMap, context);
            const numOrSizeSplits = getParamValue('numOrSizeSplits', node, tensorMap, context);
            const tensor = getParamValue('x', node, tensorMap, context);
            return split$1(tensor, numOrSizeSplits, axis);
        }
        case 'ScatterNd': {
            const indices = getParamValue('indices', node, tensorMap, context);
            const values = getParamValue('values', node, tensorMap, context);
            const shape = getParamValue('shape', node, tensorMap, context);
            return [scatterND(indices, values, shape)];
        }
        case 'GatherNd': {
            const x = getParamValue('x', node, tensorMap, context);
            const indices = getParamValue('indices', node, tensorMap, context);
            return [gatherND(x, indices)];
        }
        case 'SparseToDense': {
            const indices = getParamValue('sparseIndices', node, tensorMap, context);
            const shape = getParamValue('outputShape', node, tensorMap, context);
            const sparseValues = getParamValue('sparseValues', node, tensorMap, context);
            const defaultValue = getParamValue('defaultValue', node, tensorMap, context);
            return [sparseToDense(indices, sparseValues, shape, sparseValues.dtype === defaultValue.dtype ?
                    defaultValue :
                    cast(defaultValue, sparseValues.dtype))];
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const executeOp$f = (node, tensorMap, context) => {
    switch (node.op) {
        case 'SparseFillEmptyRows': {
            const { outputIndices, outputValues, emptyRowIndicator, reverseIndexMap } = sparse$1.sparseFillEmptyRows(getParamValue('indices', node, tensorMap, context), getParamValue('values', node, tensorMap, context), getParamValue('denseShape', node, tensorMap, context), getParamValue('defaultValue', node, tensorMap, context));
            return [
                outputIndices, outputValues, emptyRowIndicator, reverseIndexMap
            ];
        }
        case 'SparseReshape': {
            const { outputIndices, outputShape } = sparse$1.sparseReshape(getParamValue('inputIndices', node, tensorMap, context), getParamValue('inputShape', node, tensorMap, context), getParamValue('newShape', node, tensorMap, context));
            return [outputIndices, outputShape];
        }
        case 'SparseSegmentMean': {
            const outputData = sparse$1.sparseSegmentMean(getParamValue('data', node, tensorMap, context), getParamValue('indices', node, tensorMap, context), getParamValue('segmentIds', node, tensorMap, context));
            return [outputData];
        }
        case 'SparseSegmentSum': {
            const outputData = sparse$1.sparseSegmentSum(getParamValue('data', node, tensorMap, context), getParamValue('indices', node, tensorMap, context), getParamValue('segmentIds', node, tensorMap, context));
            return [outputData];
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const executeOp$g = (node, tensorMap, context) => {
    switch (node.op) {
        case 'FFT': {
            return [fft(getParamValue('x', node, tensorMap, context))];
        }
        case 'IFFT': {
            return [ifft(getParamValue('x', node, tensorMap, context))];
        }
        case 'RFFT': {
            return [rfft(getParamValue('x', node, tensorMap, context))];
        }
        case 'IRFFT': {
            return [irfft(getParamValue('x', node, tensorMap, context))];
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const executeOp$h = (node, tensorMap, context) => {
    switch (node.op) {
        case 'StringNGrams': {
            const { nGrams, nGramsSplits } = string$1.stringNGrams(getParamValue('data', node, tensorMap, context), getParamValue('dataSplits', node, tensorMap, context), getParamValue('separator', node, tensorMap, context), getParamValue('nGramWidths', node, tensorMap, context), getParamValue('leftPad', node, tensorMap, context), getParamValue('rightPad', node, tensorMap, context), getParamValue('padWidth', node, tensorMap, context), getParamValue('preserveShortSequences', node, tensorMap, context));
            return [nGrams, nGramsSplits];
        }
        case 'StringSplit': {
            const { indices, values, shape } = string$1.stringSplit(getParamValue('input', node, tensorMap, context), getParamValue('delimiter', node, tensorMap, context), getParamValue('skipEmpty', node, tensorMap, context));
            return [indices, values, shape];
        }
        case 'StringToHashBucketFast': {
            const output = string$1.stringToHashBucketFast(getParamValue('input', node, tensorMap, context), getParamValue('numBuckets', node, tensorMap, context));
            return [output];
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const executeOp$i = (node, tensorMap, context) => {
    switch (node.op) {
        case 'Cast': {
            return [cast(getParamValue('x', node, tensorMap, context), getParamValue('dtype', node, tensorMap, context))];
        }
        case 'ExpandDims': {
            const axis = getParamValue('axis', node, tensorMap, context);
            return [expandDims(getParamValue('x', node, tensorMap, context), axis)];
        }
        case 'Squeeze': {
            const axis = getParamValue('axis', node, tensorMap, context);
            return [squeeze(getParamValue('x', node, tensorMap, context), axis)];
        }
        case 'Reshape': {
            return [reshape(getParamValue('x', node, tensorMap, context), getParamValue('shape', node, tensorMap, context))];
        }
        case 'MirrorPad': {
            return [mirrorPad(getParamValue('x', node, tensorMap, context), getParamValue('padding', node, tensorMap, context), getParamValue('mode', node, tensorMap, context))];
        }
        case 'PadV2':
        case 'Pad': {
            return [pad(getParamValue('x', node, tensorMap, context), getParamValue('padding', node, tensorMap, context), getParamValue('constantValue', node, tensorMap, context))];
        }
        case 'SpaceToBatchND': {
            const blockShape = getParamValue('blockShape', node, tensorMap, context);
            const paddings = getParamValue('paddings', node, tensorMap, context);
            return [spaceToBatchND(getParamValue('x', node, tensorMap, context), blockShape, paddings)];
        }
        case 'BatchToSpaceND': {
            const blockShape = getParamValue('blockShape', node, tensorMap, context);
            const crops = getParamValue('crops', node, tensorMap, context);
            return [batchToSpaceND(getParamValue('x', node, tensorMap, context), blockShape, crops)];
        }
        case 'DepthToSpace': {
            const blockSize = getParamValue('blockSize', node, tensorMap, context);
            const dataFormat = getParamValue('dataFormat', node, tensorMap, context).toUpperCase();
            return [depthToSpace(getParamValue('x', node, tensorMap, context), blockSize, dataFormat)];
        }
        case 'BroadcastTo': {
            return [broadcastTo(getParamValue('x', node, tensorMap, context), getParamValue('shape', node, tensorMap, context))];
        }
        case 'BroadcastArgs': {
            return [broadcastArgs(getParamValue('s0', node, tensorMap, context), getParamValue('s1', node, tensorMap, context))];
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * Executes the op defined by the node object.
 * @param node
 * @param tensorMap contains tensors for executed nodes and weights
 * @param context contains tensors and information for running the current node.
 * @param resourceManager Optional. Contains global resources of the model.
 */
function executeOp$j(node, tensorMap, context, resourceManager) {
    const value = ((node, tensorMap, context) => {
        switch (node.category) {
            case 'arithmetic':
                return tidy(() => executeOp(node, tensorMap, context));
            case 'basic_math':
                return tidy(() => executeOp$1(node, tensorMap, context));
            case 'control':
                return executeOp$2(node, tensorMap, context);
            case 'convolution':
                return tidy(() => executeOp$3(node, tensorMap, context));
            case 'creation':
                return tidy(() => executeOp$4(node, tensorMap, context));
            case 'dynamic':
                return executeOp$5(node, tensorMap, context);
            case 'evaluation':
                return tidy(() => executeOp$6(node, tensorMap, context));
            case 'image':
                return tidy(() => executeOp$9(node, tensorMap, context));
            case 'graph':
                return tidy(() => executeOp$7(node, tensorMap, context));
            case 'logical':
                return tidy(() => executeOp$a(node, tensorMap, context));
            case 'matrices':
                return tidy(() => executeOp$b(node, tensorMap, context));
            case 'normalization':
                return tidy(() => executeOp$c(node, tensorMap, context));
            case 'reduction':
                return tidy(() => executeOp$d(node, tensorMap, context));
            case 'slice_join':
                return tidy(() => executeOp$e(node, tensorMap, context));
            case 'sparse':
                return tidy(() => executeOp$f(node, tensorMap, context));
            case 'spectral':
                return tidy(() => executeOp$g(node, tensorMap, context));
            case 'string':
                return tidy(() => executeOp$h(node, tensorMap, context));
            case 'transformation':
                return tidy(() => executeOp$i(node, tensorMap, context));
            case 'hash_table':
                return executeOp$8(node, tensorMap, context, resourceManager);
            case 'custom':
                const opMapper = getRegisteredOp(node.op);
                if (opMapper && opMapper.customExecutor) {
                    return opMapper.customExecutor(new NodeValueImpl(node, tensorMap, context));
                }
                else {
                    throw TypeError(`Custom op ${node.op} is not registered.`);
                }
            default:
                throw TypeError(`Unknown op '${node.op}'. File an issue at ` +
                    `https://github.com/tensorflow/tfjs/issues so we can add it` +
                    `, or register a custom execution with tf.registerOp()`);
        }
    })(node, tensorMap, context);
    if (isPromise(value)) {
        return value.then((data) => [].concat(data));
    }
    return [].concat(value);
}

/**
 * ExecutionContext captures the runtime environment of the node. It keeps
 * track of the current frame and iteration for the control flow ops.
 *
 * For example, typical Dynamic RNN model may contain loops, for which
 * TensorFlow will generate graphs with Enter/Exit nodes to control the
 * current execution frame, and NextIteration Nodes for iteration id increment.
 * For model with branch logic, TensorFLow will generate Switch/Merge ops.
 */
class ExecutionContext {
    constructor(weightMap = {}, tensorArrayMap = {}, tensorListMap = {}, functionMap = {}) {
        this.weightMap = weightMap;
        this.tensorArrayMap = tensorArrayMap;
        this.tensorListMap = tensorListMap;
        this.functionMap = functionMap;
        this.rootContext = { id: 0, frameName: '', iterationId: 0 };
        this.contexts = [this.rootContext];
        this.lastId = 0;
        this.generateCurrentContextIds();
    }
    newFrame(id, frameName) {
        return { id, frameName, iterationId: 0 };
    }
    /**
     * Set the current context
     * @param contexts: ExecutionContextInfo[] the current path of execution
     * frames
     */
    set currentContext(contexts) {
        if (this.contexts !== contexts) {
            this.contexts = contexts;
            this.generateCurrentContextIds();
        }
    }
    get currentContext() {
        return this.contexts;
    }
    /**
     * Returns the current context in string format.
     */
    get currentContextId() {
        return this._currentContextIds[0];
    }
    /**
     * Returns the current context and all parent contexts in string format.
     * This allow access to the nodes in the current and parent frames.
     */
    get currentContextIds() {
        return this._currentContextIds;
    }
    generateCurrentContextIds() {
        const names = [];
        for (let i = 0; i < this.contexts.length - 1; i++) {
            const contexts = this.contexts.slice(0, this.contexts.length - i);
            names.push(this.contextIdforContexts(contexts));
        }
        names.push('');
        this._currentContextIds = names;
    }
    contextIdforContexts(contexts) {
        return contexts ?
            contexts
                .map(context => (context.id === 0 && context.iterationId === 0) ?
                '' :
                `${context.frameName}-${context.iterationId}`)
                .join('/') :
            '';
    }
    /**
     * Enter a new frame, a new context is pushed on the current context list.
     * @param frameId new frame id
     */
    enterFrame(frameId) {
        if (this.contexts) {
            this.lastId++;
            this.contexts = this.contexts.slice();
            this.contexts.push(this.newFrame(this.lastId, frameId));
            this._currentContextIds.unshift(this.contextIdforContexts(this.contexts));
        }
    }
    /**
     * Exit the current frame, the last context is removed from the current
     * context list.
     */
    exitFrame() {
        if (this.contexts && this.contexts.length > 1) {
            this.contexts = this.contexts.slice();
            this.contexts.splice(-1);
            this.currentContextIds.shift();
        }
        else {
            throw new Error('Cannot exit frame, the context is empty');
        }
    }
    /**
     * Enter the next iteration of a loop, the iteration id of last context is
     * increased.
     */
    nextIteration() {
        if (this.contexts && this.contexts.length > 0) {
            this.contexts = this.contexts.slice();
            this.lastId++;
            const context = Object.assign({}, this.contexts[this.contexts.length - 1]);
            context.iterationId += 1;
            context.id = this.lastId;
            this.contexts.splice(-1, 1, context);
            this._currentContextIds.splice(0, 1, this.contextIdforContexts(this.contexts));
        }
        else {
            throw new Error('Cannot increase frame iteration, the context is empty');
        }
    }
    getWeight(name) {
        return this.weightMap[name];
    }
    addTensorArray(tensorArray) {
        this.tensorArrayMap[tensorArray.id] = tensorArray;
    }
    getTensorArray(id) {
        return this.tensorArrayMap[id];
    }
    addTensorList(tensorList) {
        this.tensorListMap[tensorList.id] = tensorList;
    }
    getTensorList(id) {
        return this.tensorListMap[id];
    }
    dispose(keepIds) {
        for (const key in this.tensorArrayMap) {
            this.tensorArrayMap[key].clearAndClose(keepIds);
        }
        for (const key in this.tensorListMap) {
            this.tensorListMap[key].clearAndClose(keepIds);
        }
    }
}

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * Given graph inputs and desired outputs, find the minimal set of nodes
 * to execute in order to compute the outputs. In addition return other useful
 * info such:
 * - Missing inputs needed to compute the output.
 * - Whether the subgraph contains dynamic ops (control flow, dynamic shape).
 * - Alternative inputs in order to avoid async (dynamic op) execution.
 */
function getExecutionSubgraph(inputs, outputs, weightMap, initNodes) {
    const usedNodes = new Set();
    const missingInputs = [];
    let dynamicNode = null;
    let syncInputs = null;
    // Start with the outputs, going backwards and find all the nodes that are
    // needed to compute those outputs.
    const seen = new Set();
    const inputNodeNames = Object.keys(inputs).map(name => parseNodeName(name)[0]);
    let initNodeNames = [];
    if (initNodes != null) {
        initNodeNames = initNodes.map(node => parseNodeName(node.name)[0]);
    }
    const frontier = [...outputs];
    while (frontier.length > 0) {
        const node = frontier.pop();
        if (isControlFlow(node) || isDynamicShape(node) || isHashTable(node)) {
            if (dynamicNode == null) {
                dynamicNode = node;
                syncInputs = dynamicNode.children.map(child => child.name)
                    .filter(name => usedNodes.has(name));
            }
        }
        usedNodes.add(node.name);
        // Weights are dead end since we already have their values.
        if (weightMap[node.name] != null) {
            continue;
        }
        // This node is a dead end since it's one of the user-provided inputs.
        if (inputNodeNames.indexOf(node.name) !== -1) {
            continue;
        }
        // This node is a dead end since it doesn't have any inputs.
        if (initNodeNames.indexOf(node.name) !== -1) {
            continue;
        }
        if (node.inputs.length === 0) {
            missingInputs.push(node.name);
            continue;
        }
        node.inputs.forEach(input => {
            // Don't add to the frontier if it is already there.
            if (seen.has(input.name)) {
                return;
            }
            seen.add(input.name);
            frontier.push(input);
        });
    }
    return { inputs, outputs, usedNodes, missingInputs, dynamicNode, syncInputs };
}
/**
 * Given the execution info, return a list of nodes in topological order that
 * need to be executed to compute the output.
 */
function getNodesInTopologicalOrder(graph, weightMap, executionInfo) {
    const { usedNodes, inputs } = executionInfo;
    const frontier = [];
    const inputNodes = Object.keys(inputs)
        .map(name => parseNodeName(name)[0])
        .map(name => graph.nodes[name]);
    const initNodes = graph.initNodes;
    inputNodes.forEach(input => {
        if (usedNodes.has(input.name)) {
            frontier.push(input);
        }
    });
    graph.weights.forEach(weight => {
        if (usedNodes.has(weight.name)) {
            frontier.push(weight);
        }
    });
    if (initNodes != null) {
        initNodes.forEach(node => {
            if (usedNodes.has(node.name)) {
                frontier.push(node);
            }
        });
    }
    const seen = new Set();
    const orderedNodes = [];
    while (frontier.length > 0) {
        const node = frontier.pop();
        seen.add(node.name);
        if (!weightMap[node.name]) {
            orderedNodes.push(node);
        }
        node.children.forEach(child => {
            if (!seen.has(child.name) && usedNodes.has(child.name) &&
                child.inputs.every(input => seen.has(input.name))) {
                frontier.push(child);
            }
        });
    }
    return orderedNodes;
}
const CONTROL_FLOW_OPS = [
    'Switch', 'Merge', 'Enter', 'Exit', 'NextIteration', 'StatelessIf',
    'StatelessWhile', 'if', 'While'
];
const DYNAMIC_SHAPE_OPS = [
    'NonMaxSuppressionV2', 'NonMaxSuppressionV3', 'NonMaxSuppressionV5', 'Where'
];
const HASH_TABLE_OPS = [
    'HashTable', 'HashTableV2', 'LookupTableImport', 'LookupTableImportV2',
    'LookupTableFind', 'LookupTableFindV2', 'LookupTableSize', 'LookupTableSizeV2'
];
function isControlFlow(node) {
    return CONTROL_FLOW_OPS.indexOf(node.op) >= 0;
}
function isDynamicShape(node) {
    return DYNAMIC_SHAPE_OPS.indexOf(node.op) >= 0;
}
function isHashTable(node) {
    return HASH_TABLE_OPS.indexOf(node.op) >= 0;
}

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class GraphExecutor {
    /**
     *
     * @param graph Graph the model or function graph to be executed.
     * @param parent When building function exector you need to set the parent
     * executor. Since the weights and function executor maps are set at parant
     * level, that function executor can access the function maps and weight maps
     * through the parent.
     */
    constructor(graph, parent) {
        this.graph = graph;
        this.parent = parent;
        this.compiledMap = new Map();
        this._weightMap = {};
        this.SEPERATOR = ',';
        this._functions = {};
        this._functionExecutorMap = {};
        this.intermediateTensors = {};
        this.keepTensorForDebug = false;
        this._outputs = graph.outputs;
        this._inputs = graph.inputs;
        this._initNodes = graph.initNodes;
        this._signature = graph.signature;
        this._functions = graph.functions;
        // create sub-graph executors
        if (graph.functions != null) {
            Object.keys(graph.functions).forEach(name => {
                this._functionExecutorMap[name] =
                    new GraphExecutor(graph.functions[name], this);
            });
        }
    }
    get weightIds() {
        return this.parent ? this.parent.weightIds : this._weightIds;
    }
    get functionExecutorMap() {
        return this.parent ? this.parent.functionExecutorMap :
            this._functionExecutorMap;
    }
    get weightMap() {
        return this.parent ? this.parent.weightMap : this._weightMap;
    }
    set weightMap(weightMap) {
        const weightIds = Object.keys(weightMap).map(key => weightMap[key].map(tensor => tensor.id));
        this._weightIds = [].concat(...weightIds);
        this._weightMap = weightMap;
    }
    /**
     * Set `ResourceManager` shared by executors of a model.
     * @param resourceManager: `ResourceManager` of the `GraphModel`.
     */
    set resourceManager(resourceManager) {
        this._resourceManager = resourceManager;
    }
    get inputs() {
        return this._inputs.map(node => {
            return {
                name: node.name,
                shape: node.attrParams['shape'] ?
                    node.attrParams['shape'].value :
                    undefined,
                dtype: node.attrParams['dtype'] ?
                    node.attrParams['dtype'].value :
                    undefined
            };
        });
    }
    get outputs() {
        return this._outputs.map(node => {
            return {
                name: node.name,
                shape: node.attrParams['shape'] ?
                    node.attrParams['shape'].value :
                    undefined,
                dtype: node.attrParams['dtype'] ?
                    node.attrParams['dtype'].value :
                    undefined
            };
        });
    }
    get inputNodes() {
        return this._inputs.map(node => node.signatureKey || node.name);
    }
    get outputNodes() {
        return this._outputs.map((node) => {
            const name = node.signatureKey || node.name;
            return node.defaultOutput ? (`${name}:${node.defaultOutput}`) : name;
        });
    }
    get functions() {
        return Object.keys(this._functions).reduce((map, key) => {
            map[key] = this._functions[key].signature;
            return map;
        }, {});
    }
    getCompilationKey(inputs, outputs) {
        const sortedInputs = inputs.map(node => node.name).sort();
        const sortedOutputs = outputs.map(node => node.name).sort();
        return sortedInputs.join(this.SEPERATOR) + '--' +
            sortedOutputs.join(this.SEPERATOR);
    }
    /**
     * Compiles the inference graph and returns the minimal set of nodes that are
     * required for execution, in the correct execution order.
     */
    compile(inputs, outputs) {
        const executionInfo = getExecutionSubgraph(inputs, outputs, this.weightMap, this._initNodes);
        const { missingInputs, dynamicNode, syncInputs } = executionInfo;
        if (dynamicNode != null) {
            throw new Error(`This execution contains the node '${dynamicNode.name}', which has ` +
                `the dynamic op '${dynamicNode.op}'. Please use ` +
                `model.executeAsync() instead. Alternatively, to avoid the ` +
                `dynamic ops, specify the inputs [${syncInputs}]`);
        }
        if (missingInputs.length > 0) {
            const outNames = outputs.map(n => n.name);
            const inNames = Object.keys(inputs);
            throw new Error(`Cannot compute the outputs [${outNames}] from the provided inputs ` +
                `[${inNames}]. Missing the following inputs: [${missingInputs}]`);
        }
        return getNodesInTopologicalOrder(this.graph, this.weightMap, executionInfo);
    }
    /**
     * Executes the inference for given input tensors.
     * @param inputs Tensor map for the model inputs, keyed by the input node
     * names.
     * @param outputs Optional. output node name from the Tensorflow model, if
     * no outputs are specified, the default outputs of the model would be used.
     * You can inspect intermediate nodes of the model by adding them to the
     * outputs array.
     */
    execute(inputs, outputs) {
        inputs = this.mapInputs(inputs);
        const names = Object.keys(inputs).sort();
        this.checkInputs(inputs);
        this.checkInputShapeAndType(inputs);
        outputs = this.mapOutputs(outputs);
        this.checkOutputs(outputs);
        const inputNodes = names.map(name => this.graph.nodes[parseNodeName(name)[0]]);
        const outputNodeNames = outputs.map(name => parseNodeName(name)[0]);
        let outputNodes = outputNodeNames.map(name => this.graph.nodes[name]);
        this.resetIntermediateTensors();
        // If no outputs are specified, then use the default outputs of the model.
        if (outputNodes.length === 0) {
            outputNodes = this._outputs;
        }
        const compilationKey = this.getCompilationKey(inputNodes, outputNodes);
        // Do nothing if the compiled graph cache contains the input.
        let orderedNodes = this.compiledMap.get(compilationKey);
        if (orderedNodes == null) {
            orderedNodes = this.compile(inputs, outputNodes);
            this.compiledMap.set(compilationKey, orderedNodes);
        }
        const tensorArrayMap = {};
        const tensorListMap = {};
        return tidy(() => {
            const context = new ExecutionContext(this.weightMap, tensorArrayMap, tensorListMap, this.functionExecutorMap);
            const tensorsMap = Object.assign({}, this.weightMap);
            Object.keys(inputs).forEach(name => {
                const [nodeName, index] = parseNodeName(name);
                const tensors = [];
                tensors[index] = inputs[name];
                tensorsMap[nodeName] = tensors;
            });
            const tensorsToKeep = this.getFrozenTensorIds(tensorsMap);
            const intermediateTensorConsumerCount = {};
            for (let i = 0; i < orderedNodes.length; i++) {
                const node = orderedNodes[i];
                if (!tensorsMap[node.name]) {
                    const tensors = executeOp$j(node, tensorsMap, context, this._resourceManager);
                    if (isPromise(tensors)) {
                        throw new Error(`The execution of the op '${node.op}' returned a promise. ` +
                            `Please use model.executeAsync() instead.`);
                    }
                    tensorsMap[node.name] = tensors;
                    this.checkTensorForDisposal(node.name, node, tensorsMap, context, tensorsToKeep, outputNodeNames, intermediateTensorConsumerCount);
                }
            }
            // dispose the context for the root executor
            if (this.parent == null) {
                context.dispose(tensorsToKeep);
            }
            return outputs.map(name => getTensor(name, tensorsMap, context));
        });
    }
    getFrozenTensorIds(tensorMap) {
        const ids = [].concat.apply([], Object.keys(tensorMap)
            .map(key => tensorMap[key])
            .map(tensors => tensors.map(tensor => tensor.id)));
        return new Set(ids);
    }
    checkTensorForDisposal(nodeName, node, tensorMap, context, tensorsToKeep, outputNames, intermediateTensorConsumerCount) {
        // Skip output nodes and any control flow nodes, since its dependency is
        // tricky to track correctly.
        if (node.category === 'control' || outputNames.indexOf(nodeName) !== -1) {
            return;
        }
        tensorMap[nodeName].forEach(tensor => {
            if (tensor != null) {
                intermediateTensorConsumerCount[tensor.id] =
                    (intermediateTensorConsumerCount[tensor.id] || 0) +
                        node.children.length;
            }
        });
        node.inputs.forEach(input => {
            // Skip any control flow nodes, since its dependency is tricky to track
            // correctly.
            if (input.category !== 'control') {
                const tensors = getTensorsForCurrentContenxt(input.name, tensorMap, context);
                if (tensors != null) {
                    tensors.forEach(tensor => {
                        if (tensor && !tensor.kept && !tensorsToKeep.has(tensor.id)) {
                            const count = intermediateTensorConsumerCount[tensor.id];
                            if (count === 1) {
                                if (!this.keepTensorForDebug) {
                                    tensor.dispose();
                                }
                                else {
                                    const [nodeName, index] = getNodeNameAndIndex(node.name, context);
                                    if (this.intermediateTensors[nodeName]) {
                                        this.intermediateTensors[nodeName][index] = tensor;
                                    }
                                    else {
                                        this.intermediateTensors[nodeName] = [];
                                        this.intermediateTensors[nodeName][index] = tensor;
                                    }
                                }
                                delete intermediateTensorConsumerCount[tensor.id];
                            }
                            else if (count != null) {
                                // only intermediate nodes has count set, inputs and weights are
                                // not.
                                intermediateTensorConsumerCount[tensor.id]--;
                            }
                        }
                    });
                }
            }
        });
    }
    /**
     * Executes the inference for given input tensors in Async fashion.
     * @param inputs Tensor map for the model inputs, keyed by the input node
     * names.
     * @param outputs output node name from the Tensorflow model, if no outputs
     * are specified, the default outputs of the model would be used. You can
     * inspect intermediate nodes of the model by adding them to the outputs
     * array.
     */
    async executeAsync(inputs, outputs) {
        return this._executeAsync(inputs, outputs);
    }
    disposeIntermediateTensors() {
        if (!this.intermediateTensors) {
            return;
        }
        Object.keys(this.intermediateTensors)
            .forEach(key => this.intermediateTensors[key].forEach(tensor => tensor.dispose()));
        this.disposeTensorsMap();
    }
    disposeTensorsMap() {
        if (!this.tensorsMap) {
            return;
        }
        Object.keys(this.tensorsMap).forEach(key => {
            const tensorArray = this.tensorsMap[key];
            tensorArray.forEach(tensor => {
                if (tensor && !tensor.kept && !tensor.isDisposed &&
                    !this.keepIds.has(tensor.id)) {
                    tensor.dispose();
                }
            });
        });
    }
    getIntermediateTensors() {
        return this.tensorsMap;
    }
    resetIntermediateTensors() {
        for (const key in this.intermediateTensors) {
            this.intermediateTensors[key].forEach(tensor => tensor.dispose());
            delete this.intermediateTensors[key];
        }
    }
    /**
     * Executes the inference for given input tensors in Async fashion.
     * @param inputs Tensor map for the model inputs, keyed by the input node
     * names.
     * @param outputs Optional. output node name from the Tensorflow model,
     * if no outputs are specified, the default outputs of the model would be
     * used. You can inspect intermediate nodes of the model by adding them to the
     * outputs array.
     * @param isFunctionExecution Optional. Flag for executing a function.
     * @param tensorArrayMap Optional, global TensorArray map by id. Used for
     * function execution.
     * @param tensorArrayMap Optinal global TensorList map by id. Used for
     * function execution.
     */
    async _executeAsync(inputs, outputs, isFunctionExecution = false, tensorArrayMap = {}, tensorListMap = {}) {
        if (!isFunctionExecution) {
            inputs = this.mapInputs(inputs);
            this.checkInputs(inputs);
            this.checkInputShapeAndType(inputs);
            outputs = this.mapOutputs(outputs);
            this.checkOutputs(outputs);
        }
        // For model debug.
        try {
            this.keepTensorForDebug = env().getBool('KEEP_INTERMEDIATE_TENSORS');
        }
        catch (e) {
            console.warn(e.message);
        }
        this.resetIntermediateTensors();
        const context = new ExecutionContext(this.weightMap, tensorArrayMap, tensorListMap, this.functionExecutorMap);
        // Graph with control flow op requires runtime evaluation of the execution
        // order, while without control flow the execution order is pre-determined
        // in the compile method.
        this.tensorsMap = await this.executeWithControlFlow(inputs, context, outputs, isFunctionExecution);
        const results = outputs.map(name => getTensor(name, this.tensorsMap, context));
        // dispose all the intermediate tensors
        const outputIds = results.map(t => t.id);
        const inputIds = Object.keys(inputs).map(name => inputs[name].id);
        this.keepIds =
            new Set([...outputIds, ...inputIds, ...this.weightIds]);
        if (!this.keepTensorForDebug) {
            this.disposeTensorsMap();
        }
        // dispose the context for the root executor
        if (this.parent == null) {
            context.dispose(this.keepIds);
        }
        return results;
    }
    async executeFunctionAsync(inputs, tensorArrayMap, tensorListMap) {
        const mappedInputs = inputs.reduce((map, tensor, index) => {
            map[this.inputs[index].name] = tensor;
            return map;
        }, {});
        return this._executeAsync(mappedInputs, this.outputNodes, true, tensorArrayMap, tensorListMap);
    }
    /**
     * When there are control flow nodes in the graph, the graph execution use
     * ExecutionContext to keep track of the frames and loop iterators.
     * @param inputs placeholder tensors for the graph.
     * @param context the execution context object for current execution.
     * @param outputNames Optional. output node name from the Tensorflow model,
     * if no outputs are specified, the default outputs of the model would be
     * used. You can inspect intermediate nodes of the model by adding them to the
     * outputs array.
     * @param isFunctionExecution Flag for executing a function.
     */
    async executeWithControlFlow(inputs, context, outputNames, isFunctionExecution) {
        const names = Object.keys(inputs);
        const inputNodes = names.map(name => this.graph.nodes[parseNodeName(name)[0]]);
        const outputNodeNames = outputNames.map(name => parseNodeName(name)[0]);
        let outputNodes = outputNodeNames.map(name => this.graph.nodes[name]);
        // If no outputs are specified, then use the default outputs of the model.
        if (outputNodes.length === 0) {
            outputNodes = this._outputs;
        }
        const { usedNodes, missingInputs, dynamicNode, syncInputs } = getExecutionSubgraph(inputs, outputNodes, this.weightMap, this._initNodes);
        // First nodes to execute include inputNodes, weights, and initNodes.
        const stack = [
            ...inputNodes, ...this.graph.weights, ...(this._initNodes || [])
        ].map(node => {
            return { node, contexts: context.currentContext };
        });
        const tensorsMap = Object.assign({}, this.weightMap);
        Object.keys(inputs).forEach(name => {
            const [nodeName, index] = parseNodeName(name);
            const tensors = [];
            tensors[index] = inputs[name];
            tensorsMap[nodeName] = tensors;
        });
        const intermediateTensorConsumerCount = {};
        const tensorsToKeep = this.getFrozenTensorIds(tensorsMap);
        const added = {};
        while (stack.length > 0) {
            const promises = this.processStack(inputNodes, stack, context, tensorsMap, added, tensorsToKeep, outputNodeNames, intermediateTensorConsumerCount, usedNodes);
            await Promise.all(promises);
        }
        if (dynamicNode == null && !isFunctionExecution) {
            console.warn(`This model execution did not contain any nodes with control flow ` +
                `or dynamic output shapes. You can use model.execute() instead.`);
        }
        const missingOutputs = outputNodes
            .filter(node => !isControlFlow(node) &&
            !getTensor(node.name, tensorsMap, context))
            .map(node => node.name);
        if (missingOutputs.length > 0) {
            let alternativeMsg = '';
            if (dynamicNode != null) {
                alternativeMsg =
                    `Alternatively, to avoid the dynamic ops, use model.execute() ` +
                        `and specify the inputs [${syncInputs}]`;
            }
            throw new Error(`Cannot compute the outputs [${missingOutputs}] from the provided ` +
                `inputs [${names}]. Consider providing the following inputs: ` +
                `[${missingInputs}]. ${alternativeMsg}`);
        }
        return tensorsMap;
    }
    processStack(inputNodes, stack, context, tensorMap, added, tensorsToKeep, outputNames, intermediateTensorConsumerCount, usedNodes) {
        const promises = [];
        while (stack.length > 0) {
            const item = stack.pop();
            context.currentContext = item.contexts;
            let nodeName = '';
            // The tensor of the Enter op with isConstant set should be set
            // in the parent scope, so it will be available as constant for the
            // whole loop.
            if (item.node.op === 'Enter' &&
                getParamValue('isConstant', item.node, tensorMap, context)) {
                [nodeName] = getNodeNameAndIndex(item.node.name, context);
            }
            // only process nodes that are not in the tensorMap yet, this include
            // inputNodes and internal initNodes.
            if (tensorMap[item.node.name] == null) {
                const tensors = executeOp$j(item.node, tensorMap, context, this._resourceManager);
                if (!nodeName) {
                    [nodeName] = getNodeNameAndIndex(item.node.name, context);
                }
                const currentContext = context.currentContext;
                if (isPromise(tensors)) {
                    promises.push(tensors.then(t => {
                        tensorMap[nodeName] = t;
                        context.currentContext = currentContext;
                        this.checkTensorForDisposal(nodeName, item.node, tensorMap, context, tensorsToKeep, outputNames, intermediateTensorConsumerCount);
                        this.processChildNodes(item.node, stack, context, tensorMap, added, usedNodes);
                        return t;
                    }));
                }
                else {
                    tensorMap[nodeName] = tensors;
                    this.checkTensorForDisposal(nodeName, item.node, tensorMap, context, tensorsToKeep, outputNames, intermediateTensorConsumerCount);
                    this.processChildNodes(item.node, stack, context, tensorMap, added, usedNodes);
                }
            }
            else {
                this.processChildNodes(item.node, stack, context, tensorMap, added, usedNodes);
            }
        }
        return promises;
    }
    processChildNodes(node, stack, context, tensorMap, added, usedNodes) {
        node.children.forEach((childNode) => {
            const [nodeName,] = getNodeNameAndIndex(childNode.name, context);
            if (added[nodeName] || !usedNodes.has(childNode.name)) {
                return;
            }
            // Merge op can be pushed if any of its inputs has value.
            if (childNode.op === 'Merge') {
                if (childNode.inputNames.some(name => {
                    return !!getTensor(name, tensorMap, context);
                })) {
                    added[nodeName] = true;
                    stack.push({ contexts: context.currentContext, node: childNode });
                }
            }
            else // Otherwise all inputs must to have value.
             if (childNode.inputNames.every(name => {
                return !!getTensor(name, tensorMap, context);
            })) {
                added[nodeName] = true;
                stack.push({ contexts: context.currentContext, node: childNode });
            }
        });
    }
    /**
     * Releases the memory used by the weight tensors.
     */
    dispose() {
        Object.keys(this.weightMap)
            .forEach(key => this.weightMap[key].forEach(tensor => tensor.dispose()));
    }
    checkInputShapeAndType(inputs) {
        Object.keys(inputs).forEach(name => {
            const input = inputs[name];
            const [nodeName,] = parseNodeName(name);
            const node = this.graph.nodes[nodeName];
            if (node.attrParams['shape'] && node.attrParams['shape'].value) {
                const shape = node.attrParams['shape'].value;
                const match = shape.length === input.shape.length &&
                    input.shape.every((dim, index) => shape[index] === -1 || shape[index] === dim);
                assert(match, () => `The shape of dict['${node.name}'] provided in ` +
                    `model.execute(dict) must be [${shape}], but was ` +
                    `[${input.shape}]`);
            }
            if (node.attrParams['dtype'] && node.attrParams['dtype'].value) {
                assert(input.dtype === node.attrParams['dtype'].value, () => `The dtype of dict['${node.name}'] provided in ` +
                    `model.execute(dict) must be ` +
                    `${node.attrParams['dtype'].value}, but was ${input.dtype}`);
            }
        });
    }
    mapInputs(inputs) {
        const result = {};
        for (const inputName in inputs) {
            if (this._signature != null && this._signature.inputs != null &&
                this._signature.inputs[inputName] != null) {
                const tensor = this._signature.inputs[inputName];
                result[tensor.name] = inputs[inputName];
            }
            else {
                result[inputName] = inputs[inputName];
            }
        }
        return result;
    }
    checkInputs(inputs) {
        const notInGraph = Object.keys(inputs).filter(name => {
            const [nodeName] = parseNodeName(name);
            return this.graph.nodes[nodeName] == null;
        });
        if (notInGraph.length > 0) {
            throw new Error(`The dict provided in model.execute(dict) has ` +
                `keys: [${notInGraph}] that are not part of graph`);
        }
    }
    mapOutputs(outputs) {
        return outputs.map(name => {
            if (this._signature != null && this._signature.outputs != null &&
                this._signature.outputs[name] != null) {
                const tensor = this._signature.outputs[name];
                return tensor.name;
            }
            return name;
        }, {});
    }
    checkOutputs(outputs) {
        outputs.forEach(name => {
            const [normalizedName] = parseNodeName(name);
            if (!this.graph.nodes[normalizedName]) {
                throw new Error(`The output '${name}' is not found in the graph`);
            }
        });
    }
}

/**
 * Contains global resources of a model.
 */
class ResourceManager {
    constructor(hashTableNameToHandle = {}, hashTableMap = {}) {
        this.hashTableNameToHandle = hashTableNameToHandle;
        this.hashTableMap = hashTableMap;
    }
    /**
     * Register a `HashTable` in the resource manager.
     *
     * The `HashTable` can be retrieved by `resourceManager.getHashTableById`,
     * where id is the table handle tensor's id.
     *
     * @param name Op node name that creates the `HashTable`.
     * @param hashTable The `HashTable` to be added to resource manager.
     */
    addHashTable(name, hashTable) {
        this.hashTableNameToHandle[name] = hashTable.handle;
        this.hashTableMap[hashTable.id] = hashTable;
    }
    /**
     * Get the table handle by node name.
     * @param name Op node name that creates the `HashTable`. This name is also
     *     used in the inputs list of lookup and import `HashTable` ops.
     */
    getHashTableHandleByName(name) {
        return this.hashTableNameToHandle[name];
    }
    /**
     * Get the actual `HashTable` by its handle tensor's id.
     * @param id The id of the handle tensor.
     */
    getHashTableById(id) {
        return this.hashTableMap[id];
    }
    /**
     * Dispose `ResourceManager`, including its hashTables and tensors in them.
     */
    dispose() {
        for (const key in this.hashTableMap) {
            this.hashTableMap[key].clearAndClose();
            delete this.hashTableMap[key];
        }
        for (const name in this.hashTableNameToHandle) {
            this.hashTableNameToHandle[name].dispose();
            delete this.hashTableNameToHandle[name];
        }
    }
}

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const TFHUB_SEARCH_PARAM = '?tfjs-format=file';
const DEFAULT_MODEL_NAME = 'model.json';
/**
 * A `tf.GraphModel` is a directed, acyclic graph built from a
 * SavedModel GraphDef and allows inference execution.
 *
 * A `tf.GraphModel` can only be created by loading from a model converted from
 * a [TensorFlow SavedModel](https://www.tensorflow.org/guide/saved_model) using
 * the command line converter tool and loaded via `tf.loadGraphModel`.
 *
 * @doc {heading: 'Models', subheading: 'Classes'}
 */
class GraphModel {
    /**
     * @param modelUrl url for the model, or an `io.IOHandler`.
     * @param weightManifestUrl url for the weight file generated by
     * scripts/convert.py script.
     * @param requestOption options for Request, which allows to send credentials
     * and custom headers.
     * @param onProgress Optional, progress callback function, fired periodically
     * before the load is completed.
     */
    constructor(modelUrl, loadOptions = {}) {
        this.modelUrl = modelUrl;
        this.loadOptions = loadOptions;
        this.version = 'n/a';
        if (loadOptions == null) {
            this.loadOptions = {};
        }
        this.resourceManager = new ResourceManager();
    }
    // Returns the version information for the tensorflow model GraphDef.
    get modelVersion() {
        return this.version;
    }
    get inputNodes() {
        return this.executor.inputNodes;
    }
    get outputNodes() {
        return this.executor.outputNodes;
    }
    get inputs() {
        return this.executor.inputs;
    }
    get outputs() {
        return this.executor.outputs;
    }
    get weights() {
        return this.executor.weightMap;
    }
    get metadata() {
        return this.artifacts.userDefinedMetadata;
    }
    get modelSignature() {
        return this.signature;
    }
    findIOHandler() {
        const path = this.modelUrl;
        if (path.load != null) {
            // Path is an IO Handler.
            this.handler = path;
        }
        else if (this.loadOptions.requestInit != null) {
            this.handler = browserHTTPRequest(path, this.loadOptions);
        }
        else {
            const handlers = getLoadHandlers(path, this.loadOptions);
            if (handlers.length === 0) {
                // For backward compatibility: if no load handler can be found,
                // assume it is a relative http path.
                handlers.push(browserHTTPRequest(path, this.loadOptions));
            }
            else if (handlers.length > 1) {
                throw new Error(`Found more than one (${handlers.length}) load handlers for ` +
                    `URL '${[path]}'`);
            }
            this.handler = handlers[0];
        }
    }
    /**
     * Loads the model and weight files, construct the in memory weight map and
     * compile the inference graph.
     */
    async load() {
        this.findIOHandler();
        if (this.handler.load == null) {
            throw new Error('Cannot proceed with model loading because the IOHandler provided ' +
                'does not have the `load` method implemented.');
        }
        const artifacts = await this.handler.load();
        return this.loadSync(artifacts);
    }
    /**
     * Synchronously construct the in memory weight map and
     * compile the inference graph. Also initialize hashtable if any.
     *
     * @doc {heading: 'Models', subheading: 'Classes', ignoreCI: true}
     */
    loadSync(artifacts) {
        this.artifacts = artifacts;
        const graph = this.artifacts.modelTopology;
        let signature;
        if (this.artifacts.userDefinedMetadata != null &&
            this.artifacts.userDefinedMetadata.signature != null) {
            signature = // tslint:disable-next-line:no-any
                this.artifacts.userDefinedMetadata.signature;
        }
        else {
            signature = this.artifacts.signature;
        }
        this.signature = signature;
        this.version = `${graph.versions.producer}.${graph.versions.minConsumer}`;
        const weightMap = decodeWeights(this.artifacts.weightData, this.artifacts.weightSpecs);
        this.executor = new GraphExecutor(OperationMapper.Instance.transformGraph(graph, this.signature));
        this.executor.weightMap = this.convertTensorMapToTensorsMap(weightMap);
        // Attach a model-level resourceManager to each executor to share resources,
        // such as `HashTable`.
        this.executor.resourceManager = this.resourceManager;
        if (artifacts.modelInitializer != null &&
            artifacts.modelInitializer.node != null) {
            const initializer = OperationMapper.Instance.transformGraph(artifacts.modelInitializer);
            this.initializer = new GraphExecutor(initializer);
            this.initializer.weightMap = this.executor.weightMap;
            // Attach a model-level resourceManager to the initializer, the
            // hashTables created from when executing the initializer will be stored
            // in the resourceManager.
            this.initializer.resourceManager = this.resourceManager;
            this.initializer.executeAsync({}, []);
        }
        return true;
    }
    /**
     * Save the configuration and/or weights of the GraphModel.
     *
     * An `IOHandler` is an object that has a `save` method of the proper
     * signature defined. The `save` method manages the storing or
     * transmission of serialized data ("artifacts") that represent the
     * model's topology and weights onto or via a specific medium, such as
     * file downloads, local storage, IndexedDB in the web browser and HTTP
     * requests to a server. TensorFlow.js provides `IOHandler`
     * implementations for a number of frequently used saving mediums, such as
     * `tf.io.browserDownloads` and `tf.io.browserLocalStorage`. See `tf.io`
     * for more details.
     *
     * This method also allows you to refer to certain types of `IOHandler`s
     * as URL-like string shortcuts, such as 'localstorage://' and
     * 'indexeddb://'.
     *
     * Example 1: Save `model`'s topology and weights to browser [local
     * storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage);
     * then load it back.
     *
     * ```js
     * const modelUrl =
     *    'https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json';
     * const model = await tf.loadGraphModel(modelUrl);
     * const zeros = tf.zeros([1, 224, 224, 3]);
     * model.predict(zeros).print();
     *
     * const saveResults = await model.save('localstorage://my-model-1');
     *
     * const loadedModel = await tf.loadGraphModel('localstorage://my-model-1');
     * console.log('Prediction from loaded model:');
     * model.predict(zeros).print();
     * ```
     *
     * @param handlerOrURL An instance of `IOHandler` or a URL-like,
     * scheme-based string shortcut for `IOHandler`.
     * @param config Options for saving the model.
     * @returns A `Promise` of `SaveResult`, which summarizes the result of
     * the saving, such as byte sizes of the saved artifacts for the model's
     *   topology and weight values.
     *
     * @doc {heading: 'Models', subheading: 'Classes', ignoreCI: true}
     */
    async save(handlerOrURL, config) {
        if (typeof handlerOrURL === 'string') {
            const handlers = getSaveHandlers(handlerOrURL);
            if (handlers.length === 0) {
                throw new Error(`Cannot find any save handlers for URL '${handlerOrURL}'`);
            }
            else if (handlers.length > 1) {
                throw new Error(`Found more than one (${handlers.length}) save handlers for ` +
                    `URL '${handlerOrURL}'`);
            }
            handlerOrURL = handlers[0];
        }
        if (handlerOrURL.save == null) {
            throw new Error('GraphModel.save() cannot proceed because the IOHandler ' +
                'provided does not have the `save` attribute defined.');
        }
        return handlerOrURL.save(this.artifacts);
    }
    /**
     * Execute the inference for the input tensors.
     *
     * @param input The input tensors, when there is single input for the model,
     * inputs param should be a `tf.Tensor`. For models with mutliple inputs,
     * inputs params should be in either `tf.Tensor`[] if the input order is
     * fixed, or otherwise NamedTensorMap format.
     *
     * For model with multiple inputs, we recommend you use NamedTensorMap as the
     * input type, if you use `tf.Tensor`[], the order of the array needs to
     * follow the
     * order of inputNodes array. @see {@link GraphModel.inputNodes}
     *
     * You can also feed any intermediate nodes using the NamedTensorMap as the
     * input type. For example, given the graph
     *    InputNode => Intermediate => OutputNode,
     * you can execute the subgraph Intermediate => OutputNode by calling
     *    model.execute('IntermediateNode' : tf.tensor(...));
     *
     * This is useful for models that uses tf.dynamic_rnn, where the intermediate
     * state needs to be fed manually.
     *
     * For batch inference execution, the tensors for each input need to be
     * concatenated together. For example with mobilenet, the required input shape
     * is [1, 244, 244, 3], which represents the [batch, height, width, channel].
     * If we are provide a batched data of 100 images, the input tensor should be
     * in the shape of [100, 244, 244, 3].
     *
     * @param config Prediction configuration for specifying the batch size and
     * output node names. Currently the batch size option is ignored for graph
     * model.
     *
     * @returns Inference result tensors. The output would be single `tf.Tensor`
     * if model has single output node, otherwise Tensor[] or NamedTensorMap[]
     * will be returned for model with multiple outputs.
     *
     * @doc {heading: 'Models', subheading: 'Classes'}
     */
    predict(inputs, config) {
        return this.execute(inputs, this.outputNodes);
    }
    normalizeInputs(inputs) {
        if (!(inputs instanceof Tensor) && !Array.isArray(inputs)) {
            // The input is already a NamedTensorMap.
            return inputs;
        }
        inputs = Array.isArray(inputs) ? inputs : [inputs];
        if (inputs.length !== this.inputNodes.length) {
            throw new Error('Input tensor count mismatch,' +
                `the graph model has ${this.inputNodes.length} placeholders, ` +
                `while there are ${inputs.length} input tensors.`);
        }
        return this.inputNodes.reduce((map, inputName, i) => {
            map[inputName] = inputs[i];
            return map;
        }, {});
    }
    normalizeOutputs(outputs) {
        outputs = outputs || this.outputNodes;
        return !Array.isArray(outputs) ? [outputs] : outputs;
    }
    /**
     * Executes inference for the model for given input tensors.
     * @param inputs tensor, tensor array or tensor map of the inputs for the
     * model, keyed by the input node names.
     * @param outputs output node name from the Tensorflow model, if no
     * outputs are specified, the default outputs of the model would be used.
     * You can inspect intermediate nodes of the model by adding them to the
     * outputs array.
     *
     * @returns A single tensor if provided with a single output or no outputs
     * are provided and there is only one default output, otherwise return a
     * tensor array. The order of the tensor array is the same as the outputs
     * if provided, otherwise the order of outputNodes attribute of the model.
     *
     * @doc {heading: 'Models', subheading: 'Classes'}
     */
    execute(inputs, outputs) {
        inputs = this.normalizeInputs(inputs);
        outputs = this.normalizeOutputs(outputs);
        const result = this.executor.execute(inputs, outputs);
        return result.length > 1 ? result : result[0];
    }
    /**
     * Executes inference for the model for given input tensors in async
     * fashion, use this method when your model contains control flow ops.
     * @param inputs tensor, tensor array or tensor map of the inputs for the
     * model, keyed by the input node names.
     * @param outputs output node name from the Tensorflow model, if no outputs
     * are specified, the default outputs of the model would be used. You can
     * inspect intermediate nodes of the model by adding them to the outputs
     * array.
     *
     * @returns A Promise of single tensor if provided with a single output or
     * no outputs are provided and there is only one default output, otherwise
     * return a tensor map.
     *
     * @doc {heading: 'Models', subheading: 'Classes'}
     */
    async executeAsync(inputs, outputs) {
        inputs = this.normalizeInputs(inputs);
        outputs = this.normalizeOutputs(outputs);
        const result = await this.executor.executeAsync(inputs, outputs);
        return result.length > 1 ? result : result[0];
    }
    /**
     * Get intermediate tensors for model debugging mode (flag
     * KEEP_INTERMEDIATE_TENSORS is true).
     *
     * @doc {heading: 'Models', subheading: 'Classes'}
     */
    getIntermediateTensors() {
        return this.executor.getIntermediateTensors();
    }
    /**
     * Dispose intermediate tensors for model debugging mode (flag
     * KEEP_INTERMEDIATE_TENSORS is true).
     *
     * @doc {heading: 'Models', subheading: 'Classes'}
     */
    disposeIntermediateTensors() {
        this.executor.disposeIntermediateTensors();
    }
    convertTensorMapToTensorsMap(map) {
        return Object.keys(map).reduce((newMap, key) => {
            newMap[key] = [map[key]];
            return newMap;
        }, {});
    }
    /**
     * Releases the memory used by the weight tensors and resourceManager.
     *
     * @doc {heading: 'Models', subheading: 'Classes'}
     */
    dispose() {
        this.executor.dispose();
        if (this.initializer) {
            this.initializer.dispose();
        }
        this.resourceManager.dispose();
    }
}
/**
 * Load a graph model given a URL to the model definition.
 *
 * Example of loading MobileNetV2 from a URL and making a prediction with a
 * zeros input:
 *
 * ```js
 * const modelUrl =
 *    'https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json';
 * const model = await tf.loadGraphModel(modelUrl);
 * const zeros = tf.zeros([1, 224, 224, 3]);
 * model.predict(zeros).print();
 * ```
 *
 * Example of loading MobileNetV2 from a TF Hub URL and making a prediction with
 * a zeros input:
 *
 * ```js
 * const modelUrl =
 *    'https://tfhub.dev/google/imagenet/mobilenet_v2_140_224/classification/2';
 * const model = await tf.loadGraphModel(modelUrl, {fromTFHub: true});
 * const zeros = tf.zeros([1, 224, 224, 3]);
 * model.predict(zeros).print();
 * ```
 * @param modelUrl The url or an `io.IOHandler` that loads the model.
 * @param options Options for the HTTP request, which allows to send credentials
 *    and custom headers.
 *
 * @doc {heading: 'Models', subheading: 'Loading'}
 */
async function loadGraphModel(modelUrl, options = {}) {
    if (modelUrl == null) {
        throw new Error('modelUrl in loadGraphModel() cannot be null. Please provide a url ' +
            'or an IOHandler that loads the model');
    }
    if (options == null) {
        options = {};
    }
    if (options.fromTFHub) {
        if (modelUrl.load == null) {
            if (!modelUrl.endsWith('/')) {
                modelUrl = modelUrl + '/';
            }
            modelUrl = `${modelUrl}${DEFAULT_MODEL_NAME}${TFHUB_SEARCH_PARAM}`;
        }
    }
    const model = new GraphModel(modelUrl, options);
    await model.load();
    return model;
}

/**
    * @license
    * Copyright 2021 Google LLC. All Rights Reserved.
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    * http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    * =============================================================================
    */
var I=function(){return (I=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};function T(t,e,n,i){return new(n||(n=Promise))((function(r,o){function a(t){try{s(i.next(t));}catch(t){o(t);}}function h(t){try{s(i.throw(t));}catch(t){o(t);}}function s(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e);}))).then(a,h);}s((i=i.apply(t,e||[])).next());}))}function S(t,e){var n,i,r,o,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:h(0),throw:h(1),return:h(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function h(o){return function(h){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,i&&(r=2&o[0]?i.return:o[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,o[1])).done)return r;switch(i=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,i=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(r=a.trys,(r=r.length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){a.label=o[1];break}if(6===o[0]&&a.label<r[1]){a.label=r[1],r=o;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(o);break}r[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a);}catch(t){o=[6,t],i=0;}finally{n=r=0;}if(5&o[0])throw o[1];return {value:o[0]?o[1]:void 0,done:!0}}([o,h])}}}var k=["wrist","thumb_cmc","thumb_mcp","thumb_ip","thumb_tip","index_finger_mcp","index_finger_pip","index_finger_dip","index_finger_tip","middle_finger_mcp","middle_finger_pip","middle_finger_dip","middle_finger_tip","ring_finger_mcp","ring_finger_pip","ring_finger_dip","ring_finger_tip","pinky_finger_mcp","pinky_finger_pip","pinky_finger_dip","pinky_finger_tip"],_={runtime:"mediapipe",maxHands:2,modelType:"full"};var C=function(){function e(e){var n,i=this;switch(this.width=0,this.height=0,this.selfieMode=!1,this.handsSolution=new hands.Hands({locateFile:function(t,n){return e.solutionPath?e.solutionPath.replace(/\/+$/,"")+"/"+t:n+"/"+t}}),e.modelType){case"lite":n=0;break;case"full":default:n=1;}this.handsSolution.setOptions({modelComplexity:n,selfieMode:this.selfieMode,maxNumHands:e.maxHands}),this.handsSolution.onResults((function(t){if(i.height=t.image.height,i.width=t.image.width,i.hands=[],null!==t.multiHandLandmarks)for(var e=t.multiHandedness,n=t.multiHandLandmarks,r=t.multiHandWorldLandmarks,o=0;o<e.length;o++)i.hands.push(I({},i.translateOutput(n[o],r[o]),{score:e[o].score,handedness:e[o].label}));}));}return e.prototype.translateOutput=function(t,e){var n=this;return {keypoints:t.map((function(t,e){return {x:t.x*n.width,y:t.y*n.height,score:t.visibility,name:k[e]}})),keypoints3D:e.map((function(t,e){return {x:t.x,y:t.y,z:t.z,score:t.visibility,name:k[e]}}))}},e.prototype.estimateHands=function(t,e){return T(this,void 0,void 0,(function(){return S(this,(function(n){switch(n.label){case 0:return e&&e.flipHorizontal&&e.flipHorizontal!==this.selfieMode&&(this.selfieMode=e.flipHorizontal,this.handsSolution.setOptions({selfieMode:this.selfieMode})),[4,this.handsSolution.send({image:t})];case 1:return n.sent(),[2,this.hands]}}))}))},e.prototype.dispose=function(){this.handsSolution.close();},e.prototype.reset=function(){this.handsSolution.reset(),this.width=0,this.height=0,this.hands=null,this.selfieMode=!1;},e.prototype.initialize=function(){return this.handsSolution.initialize()},e}();function H(t){return T(this,void 0,void 0,(function(){var e,n;return S(this,(function(i){switch(i.label){case 0:return e=function(t){if(null==t)return I({},_);var e=I({},t);return e.runtime="mediapipe",null==e.maxHands&&(e.maxHands=_.maxHands),null==e.modelType&&(e.modelType=_.modelType),e}(t),[4,(n=new C(e)).initialize()];case 1:return i.sent(),[2,n]}}))}))}function z(t){return t.width*t.height}function O(t){var e=t.xCenter-t.width/2,n=e+t.width,i=t.yCenter-t.height/2;return {xMin:e,xMax:n,yMin:i,yMax:i+t.height,width:t.width,height:t.height}}function L(t,e){var n=O(t),i=O(e);if(!function(t,e){return !(t.xMax<e.xMin||e.xMax<t.xMin||t.yMax<e.yMin||e.yMax<t.yMin)}(n,i))return 0;var r=z(function(t,e){var n=Math.max(t.xMin,e.xMin),i=Math.min(t.xMax,e.xMax),r=Math.max(t.yMin,e.yMin),o=Math.min(t.yMax,e.yMax);return {xMin:n,xMax:i,yMin:r,yMax:o,width:Math.max(i-n,0),height:Math.max(o-r,0)}}(n,i)),o=z(n)+z(i)-r;return o>0?r/o:0}function N(t){return t instanceof Tensor?{height:t.shape[0],width:t.shape[1]}:{height:t.height,width:t.width}}function B(t){return t-2*Math.PI*Math.floor((t+Math.PI)/(2*Math.PI))}function R(t){return t instanceof Tensor?t:fromPixels(t)}function E(t,e){assert(0!==t.width,(function(){return e+" width cannot be 0."})),assert(0!==t.height,(function(){return e+" height cannot be 0."}));}function P(t,e,n){var i=e.inputResolution,r=e.keepAspectRatio,l=N(t),d=function(t,e){return e?{xCenter:e.xCenter*t.width,yCenter:e.yCenter*t.height,width:e.width*t.width,height:e.height*t.height,rotation:e.rotation}:{xCenter:.5*t.width,yCenter:.5*t.height,width:t.width,height:t.height,rotation:0}}(l,n),c=function(t,e,n){if(void 0===n&&(n=!1),!n)return {top:0,left:0,right:0,bottom:0};var i=e.height,r=e.width;E(e,"targetSize"),E(t,"roi");var o,a,h=i/r,s=t.height/t.width,u=0,l=0;return h>s?(o=t.width,a=t.width*h,l=(1-s/h)/2):(o=t.height/h,a=t.height,u=(1-h/s)/2),t.width=o,t.height=a,{top:l,left:u,right:u,bottom:l}}(d,i,r);return {imageTensor:tidy((function(){var e=R(t),n=tensor2d(function(t,e,n,i){E(i,"inputResolution");var r=1/e.width,o=1/e.height,a=t.xCenter,h=t.yCenter,s=Math.cos(t.rotation),u=Math.sin(t.rotation),l=n?-1:1,d=t.width,c=t.height;return [1/i.width*d*s*l*r*e.width,1/i.height*-c*u*r*e.width,(-.5*d*s*l+.5*c*u+a)*r*e.width,1/i.width*d*u*l*o*e.height,1/i.height*c*s*o*e.height,(-.5*c*s-.5*d*u*l+h)*o*e.height,0,0]}(d,l,!1,i),[1,8]);return image$1.transform(expandDims(cast(e,"float32")),n,"bilinear","nearest",0,[i.height,i.width])})),padding:c}}function V(t,e,n,i){return 1===i?.5*(t+e):t+(e-t)*n/(i-1)}function D(t,e,n){var i=t.locationData.relativeBoundingBox,r=function(t,e,n){var i,r=t.locationData,o=n.rotationVectorStartKeypointIndex,a=n.rotationVectorEndKeypointIndex;i=n.rotationVectorTargetAngle?n.rotationVectorTargetAngle:Math.PI*n.rotationVectorTargetAngleDegree/180;var h=r.relativeKeypoints[o].x*e.width,s=r.relativeKeypoints[o].y*e.height,u=r.relativeKeypoints[a].x*e.width,l=r.relativeKeypoints[a].y*e.height;return B(i-Math.atan2(-(l-s),u-h))}(t,e,n);return {xCenter:i.xMin+i.width/2,yCenter:i.yMin+i.height/2,width:i.width,height:i.height,rotation:r}}function K(t,e){return tidy((function(){var n=function(t){return tidy((function(){return [slice(t,[0,0,0],[1,-1,1]),slice(t,[0,0,1],[1,-1,-1])]}))}(e.predict(t)),i=n[0],r=n[1];return {boxes:squeeze(r),logits:squeeze(i)}}))}function A(t,e,n,i){return T(this,void 0,void 0,(function(){var r,o,s,u,l;return S(this,(function(d){switch(d.label){case 0:return t.sort((function(t,e){return Math.max.apply(Math,e.score)-Math.max.apply(Math,t.score)})),r=tensor2d(t.map((function(t){return [t.locationData.relativeBoundingBox.yMin,t.locationData.relativeBoundingBox.xMin,t.locationData.relativeBoundingBox.yMax,t.locationData.relativeBoundingBox.xMax]}))),o=tensor1d(t.map((function(t){return t.score[0]}))),[4,image$1.nonMaxSuppressionAsync(r,o,e,n,i)];case 1:return [4,(s=d.sent()).array()];case 2:return u=d.sent(),l=t.filter((function(t,e){return u.indexOf(e)>-1})),dispose([r,o,s]),[2,l]}}))}))}function Y(t,e){return t.map((function(t){var n=I({},t,{x:t.x*e.width,y:t.y*e.height});return null!=t.z&&(n.z=t.z*e.width),n}))}function F(t,e){var n=function(t,e,n,i){var r=e-t,o=i-n;if(0===r)throw new Error("Original min and max are both "+t+", range cannot be 0.");var a=o/r;return {scale:a,offset:n-t*a}}(0,255,e[0],e[1]);return tidy((function(){return add(mul(t,n.scale),n.offset)}))}function j(t,e,n){return T(this,void 0,void 0,(function(){var i,r,a,h,s;return S(this,(function(u){switch(u.label){case 0:return i=t[0],r=t[1],a=function(t,e,n){return tidy((function(){var i,r,o,a;n.reverseOutputOrder?(r=squeeze(slice(t,[0,n.boxCoordOffset+0],[-1,1])),i=squeeze(slice(t,[0,n.boxCoordOffset+1],[-1,1])),a=squeeze(slice(t,[0,n.boxCoordOffset+2],[-1,1])),o=squeeze(slice(t,[0,n.boxCoordOffset+3],[-1,1]))):(i=squeeze(slice(t,[0,n.boxCoordOffset+0],[-1,1])),r=squeeze(slice(t,[0,n.boxCoordOffset+1],[-1,1])),o=squeeze(slice(t,[0,n.boxCoordOffset+2],[-1,1])),a=squeeze(slice(t,[0,n.boxCoordOffset+3],[-1,1]))),r=add(mul(div(r,n.xScale),e.w),e.x),i=add(mul(div(i,n.yScale),e.h),e.y),n.applyExponentialOnBoxSize?(o=mul(exp(div(o,n.hScale)),e.h),a=mul(exp(div(a,n.wScale)),e.w)):(o=mul(div(o,n.hScale),e.h),a=mul(div(a,n.wScale),e.h));var h=sub(i,div(o,2)),s=sub(r,div(a,2)),u=add(i,div(o,2)),c=add(r,div(a,2)),f=concat([reshape(h,[n.numBoxes,1]),reshape(s,[n.numBoxes,1]),reshape(u,[n.numBoxes,1]),reshape(c,[n.numBoxes,1])],1);if(n.numKeypoints)for(var w=0;w<n.numKeypoints;++w){var b=n.keypointCoordOffset+w*n.numValuesPerKeypoint,I=void 0,T=void 0;n.reverseOutputOrder?(I=squeeze(slice(t,[0,b],[-1,1])),T=squeeze(slice(t,[0,b+1],[-1,1]))):(T=squeeze(slice(t,[0,b],[-1,1])),I=squeeze(slice(t,[0,b+1],[-1,1])));var S=add(mul(div(I,n.xScale),e.w),e.x),k=add(mul(div(T,n.yScale),e.h),e.y);f=concat([f,reshape(S,[n.numBoxes,1]),reshape(k,[n.numBoxes,1])],1);}return f}))}(r,e,n),h=tidy((function(){var t=i;return n.sigmoidScore?(null!=n.scoreClippingThresh&&(t=clipByValue(i,-n.scoreClippingThresh,n.scoreClippingThresh)),t=sigmoid(t)):t})),[4,U(a,h,n)];case 1:return s=u.sent(),dispose([a,h]),[2,s]}}))}))}function U(t,e,n){return T(this,void 0,void 0,(function(){var i,r,o,a,h,s,u,l,d,c,f,p;return S(this,(function(m){switch(m.label){case 0:return i=[],[4,t.data()];case 1:return r=m.sent(),[4,e.data()];case 2:for(o=m.sent(),a=0;a<n.numBoxes;++a)if(!(null!=n.minScoreThresh&&o[a]<n.minScoreThresh||(h=a*n.numCoords,s=W(r[h+0],r[h+1],r[h+2],r[h+3],o[a],n.flipVertically,a),(u=s.locationData.relativeBoundingBox).width<0||u.height<0))){if(n.numKeypoints>0)for((l=s.locationData).relativeKeypoints=[],d=n.numKeypoints*n.numValuesPerKeypoint,c=0;c<d;c+=n.numValuesPerKeypoint)f=h+n.keypointCoordOffset+c,p={x:r[f+0],y:n.flipVertically?1-r[f+1]:r[f+1]},l.relativeKeypoints.push(p);i.push(s);}return [2,i]}}))}))}function W(t,e,n,i,r,o,a){return {score:[r],ind:a,locationData:{relativeBoundingBox:{xMin:e,yMin:o?1-n:t,xMax:i,yMax:o?1-t:n,width:i-e,height:n-t}}}}function X(t,e){return "none"===t?e:function(t){return 1/(1+Math.exp(-t))}(e)}function q(t,e,n,i){return T(this,void 0,void 0,(function(){var r,o,a,h,s,u,l,d;return S(this,(function(c){switch(c.label){case 0:return n=n||e.flipHorizontally||!1,i=i||e.flipVertically||!1,r=t.size,o=r/e.numLandmarks,[4,t.data()];case 1:for(a=c.sent(),h=[],s=0;s<e.numLandmarks;++s)u=s*o,(d={x:0,y:0}).x=n?e.inputImageWidth-a[u]:a[u],o>1&&(d.y=i?e.inputImageHeight-a[u+1]:a[u+1]),o>2&&(d.z=a[u+2]),o>3&&(d.score=X(e.visibilityActivation,a[u+3])),h.push(d);for(l=0;l<h.length;++l)(d=h[l]).x=d.x/e.inputImageWidth,d.y=d.y/e.inputImageHeight,d.z=d.z/e.inputImageWidth/(e.normalizeZ||1);return [2,h]}}))}))}function G(t,e,n){var i=t.width,r=t.height,o=t.rotation;if(null==n.rotation&&null==n.rotationDegree||(o=function(t,e){null!=e.rotation?t+=e.rotation:null!=e.rotationDegree&&(t+=Math.PI*e.rotationDegree/180);return B(t)}(o,n)),0===o)t.xCenter=t.xCenter+i*n.shiftX,t.yCenter=t.yCenter+r*n.shiftY;else {var a=(e.width*i*n.shiftX*Math.cos(o)-e.height*r*n.shiftY*Math.sin(o))/e.width,h=(e.width*i*n.shiftX*Math.sin(o)+e.height*r*n.shiftY*Math.cos(o))/e.height;t.xCenter=t.xCenter+a,t.yCenter=t.yCenter+h;}if(n.squareLong){var s=Math.max(i*e.width,r*e.height);i=s/e.width,r=s/e.height;}else if(n.squareShort){var u=Math.min(i*e.width,r*e.height);i=u/e.width,r=u/e.height;}return t.width=i*n.scaleX,t.height=r*n.scaleY,t}function Z(t,e){for(var n=function(t,e){var n=t[0].x*e.width,i=t[0].y*e.height,r=(t[4].x+t[8].x)/2,o=(t[4].y+t[8].y)/2;return r=(r+t[6].x)/2*e.width,o=(o+t[6].y)/2*e.height,B(Math.PI/2-Math.atan2(-(o-i),r-n))}(t,e),i=B(-n),r=Number.POSITIVE_INFINITY,o=Number.NEGATIVE_INFINITY,a=Number.POSITIVE_INFINITY,h=Number.NEGATIVE_INFINITY,s=0,u=t;s<u.length;s++){var l=(g=u[s]).x,d=g.y;r=Math.min(r,l),o=Math.max(o,l),a=Math.min(a,d),h=Math.max(h,d);}var c=(o+r)/2,f=(h+a)/2;r=Number.POSITIVE_INFINITY,o=Number.NEGATIVE_INFINITY,a=Number.POSITIVE_INFINITY,h=Number.NEGATIVE_INFINITY;for(var p=0,m=t;p<m.length;p++){var g,y=((g=m[p]).x-c)*e.width,x=(g.y-f)*e.height,v=y*Math.cos(i)-x*Math.sin(i),M=y*Math.sin(i)+x*Math.cos(i);r=Math.min(r,v),o=Math.max(o,v),a=Math.min(a,M),h=Math.max(h,M);}var w=(o+r)/2,b=(h+a)/2,I=w*Math.cos(n)-b*Math.sin(n)+e.width*c,T=w*Math.sin(n)+b*Math.cos(n)+e.height*f,S=(o-r)/e.width,k=(h-a)/e.height;return {xCenter:I/e.width,yCenter:T/e.height,width:S,height:k,rotation:n}}var $={reduceBoxesInLowestLayer:!1,interpolatedScaleAspectRatio:1,featureMapHeight:[],featureMapWidth:[],numLayers:4,minScale:.1484375,maxScale:.75,inputSizeHeight:192,inputSizeWidth:192,anchorOffsetX:.5,anchorOffsetY:.5,strides:[8,16,16,16],aspectRatios:[1],fixedAnchorSize:!0},J={runtime:"tfjs",modelType:"full",maxHands:2,detectorModelUrl:"https://tfhub.dev/mediapipe/tfjs-model/handpose_3d/detector/full/1",landmarkModelUrl:"https://tfhub.dev/mediapipe/tfjs-model/handpose_3d/landmark/full/1"},Q={flipHorizontal:!1,staticImageMode:!1},tt={applyExponentialOnBoxSize:!1,flipVertically:!1,ignoreClasses:[],numClasses:1,numBoxes:2016,numCoords:18,boxCoordOffset:0,keypointCoordOffset:4,numKeypoints:7,numValuesPerKeypoint:2,sigmoidScore:!0,scoreClippingThresh:100,reverseOutputOrder:!0,xScale:192,yScale:192,hScale:192,wScale:192,minScoreThresh:.5},et=-1,nt=.3,it={shiftX:0,shiftY:-.5,scaleX:2.6,scaleY:2.6,squareLong:!0},rt={shiftX:0,shiftY:-.1,scaleX:2,scaleY:2,squareLong:!0},ot={inputResolution:{width:192,height:192},keepAspectRatio:!0},at={inputResolution:{width:224,height:224},keepAspectRatio:!0},ht={numLandmarks:21,inputImageWidth:224,inputImageHeight:224,normalizeZ:.4,visibilityActivation:"none",flipHorizontally:!1,flipVertically:!1},st={numLandmarks:21,inputImageWidth:1,inputImageHeight:1,visibilityActivation:"none",flipHorizontally:!1,flipVertically:!1};var ut,lt=function(){function t(t,e,n){this.detectorModel=t,this.landmarkModel=e,this.maxHands=n,this.prevHandRectsFromLandmarks=null,this.anchors=function(t){for(var e=[],n=0;n<t.numLayers;){for(var i=[],r=[],o=[],a=[],h=n;h<t.strides.length&&t.strides[h]===t.strides[n];){var s=V(t.minScale,t.maxScale,h,t.strides.length);if(0===h&&t.reduceBoxesInLowestLayer)o.push(1),o.push(2),o.push(.5),a.push(.1),a.push(s),a.push(s);else {for(var u=0;u<t.aspectRatios.length;++u)o.push(t.aspectRatios[u]),a.push(s);if(t.interpolatedScaleAspectRatio>0){var l=h===t.strides.length-1?1:V(t.minScale,t.maxScale,h+1,t.strides.length);a.push(Math.sqrt(s*l)),o.push(t.interpolatedScaleAspectRatio);}}h++;}for(var d=0;d<o.length;++d){var c=Math.sqrt(o[d]);i.push(a[d]/c),r.push(a[d]*c);}var f=0,p=0;if(t.featureMapHeight.length>0)f=t.featureMapHeight[n],p=t.featureMapWidth[n];else {var m=t.strides[n];f=Math.ceil(t.inputSizeHeight/m),p=Math.ceil(t.inputSizeWidth/m);}for(var g=0;g<f;++g)for(var y=0;y<p;++y)for(var x=0;x<i.length;++x){var v={xCenter:(y+t.anchorOffsetX)/p,yCenter:(g+t.anchorOffsetY)/f,width:0,height:0};t.fixedAnchorSize?(v.width=1,v.height=1):(v.width=r[x],v.height=i[x]),e.push(v);}n=h;}return e}($);var i=tensor1d(this.anchors.map((function(t){return t.width}))),r=tensor1d(this.anchors.map((function(t){return t.height}))),o=tensor1d(this.anchors.map((function(t){return t.xCenter}))),a=tensor1d(this.anchors.map((function(t){return t.yCenter})));this.anchorTensor={x:o,y:a,w:i,h:r};}return t.prototype.estimateHands=function(t,e){return T(this,void 0,void 0,(function(){var n,i,r,a,l,c,f,p,m,g,y,x,v,M,w,b,T,_,C=this;return S(this,(function(S){switch(S.label){case 0:return n=function(t){if(null==t)return I({},Q);var e=I({},t);return null==e.flipHorizontal&&(e.flipHorizontal=Q.flipHorizontal),null==e.staticImageMode&&(e.staticImageMode=Q.staticImageMode),e}(e),null==t?(this.reset(),[2,[]]):(i=N(t),r=tidy((function(){var e=cast(R(t),"float32");if(n.flipHorizontal){e=squeeze(image$1.flipLeftRight(expandDims(e,0)),[0]);}return e})),a=this.prevHandRectsFromLandmarks,n.staticImageMode||null==a||a.length<this.maxHands?[4,this.detectPalm(r)]:[3,2]);case 1:return 0===(c=S.sent()).length?(this.reset(),r.dispose(),[2,[]]):(f=c.map((function(t){return C.palmDetectionToRoi(t,i)})),l=f,[3,3]);case 2:l=a,S.label=3;case 3:return H=.5,z=[],[l].forEach((function(t){return t.forEach((function(t){(z=z.filter((function(e){return L(t,e)<=H}))).push(t);}))})),l=z,[4,Promise.all(l.map((function(t){return C.handLandmarks(t,r)})))];case 4:for(p=S.sent(),m=[],this.prevHandRectsFromLandmarks=[],g=0,y=p;g<y.length;g++)null!=(x=y[g])&&(v=x.landmarks,M=x.worldLandmarks,w=x.handScore,b=x.handedness,this.prevHandRectsFromLandmarks.push(this.handLandmarksToRoi(v,i)),null!=(T=Y(v,i))&&T.forEach((function(t,e){delete t.z,t.name=k[e];})),null!=(_=M)&&_.forEach((function(t,e){t.name=k[e];})),m.push({keypoints:T,keypoints3D:_,handedness:b,score:w}));return r.dispose(),[2,m]}var H,z;}))}))},t.prototype.dispose=function(){this.detectorModel.dispose(),this.landmarkModel.dispose(),dispose([this.anchorTensor.x,this.anchorTensor.y,this.anchorTensor.w,this.anchorTensor.h]);},t.prototype.reset=function(){this.prevHandRectsFromLandmarks=null;},t.prototype.detectPalm=function(t){return T(this,void 0,void 0,(function(){var e,n,i,r,o,a,h,s,u,l;return S(this,(function(d){switch(d.label){case 0:return e=P(t,ot),n=e.imageTensor,i=e.padding,r=F(n,[0,1]),o=K(r,this.detectorModel),a=o.boxes,[4,j([h=o.logits,a],this.anchorTensor,tt)];case 1:return 0===(s=d.sent()).length?(dispose([n,r,h,a]),[2,s]):[4,A(s,this.maxHands,nt,et)];case 2:return u=d.sent(),l=function(t,e){void 0===t&&(t=[]);for(var n=e.left,i=e.top,r=e.left+e.right,o=e.top+e.bottom,a=0;a<t.length;a++){var h=t[a],s=h.locationData.relativeBoundingBox,u=(s.xMin-n)/(1-r),l=(s.yMin-i)/(1-o),d=s.width/(1-r),c=s.height/(1-o);s.xMin=u,s.yMin=l,s.width=d,s.height=c;for(var f=0;f<h.locationData.relativeKeypoints.length;++f){var p=h.locationData.relativeKeypoints[f],m=(p.x-n)/(1-r),g=(p.y-i)/(1-o);p.x=m,p.y=g;}}return t}(u,i),dispose([n,r,h,a]),[2,l]}}))}))},t.prototype.palmDetectionToRoi=function(t,e){return G(D(t,e,{rotationVectorStartKeypointIndex:0,rotationVectorEndKeypointIndex:2,rotationVectorTargetAngleDegree:90}),e,it)},t.prototype.handLandmarks=function(t,e){return T(this,void 0,void 0,(function(){var n,i,r,o,a,h,s,u,l,d,f,p,m,g,y,x,v;return S(this,(function(M){switch(M.label){case 0:return n=P(e,at,t),i=n.imageTensor,r=n.padding,o=F(i,[0,1]),a=this.landmarkModel.execute(o,["Identity_2:0","Identity_1:0","Identity:0","Identity_3:0"]),h=a[0],s=a[1],u=a[2],l=a[3],[4,s.data()];case 1:return (d=M.sent()[0])<.5?(dispose(a),dispose([i,o]),[2,null]):[4,u.data()];case 2:return f=M.sent()[0],p=f>=.5?"Left":"Right",[4,q(h,ht)];case 3:return m=M.sent(),[4,q(l,st)];case 4:return g=M.sent(),y=function(t,e){var n=e.left,i=e.top,r=e.left+e.right,o=e.top+e.bottom;return t.map((function(t){return I({},t,{x:(t.x-n)/(1-r),y:(t.y-i)/(1-o),z:t.z/(1-r)})}))}(m,r),x=function(t,e,n){void 0===n&&(n={ignoreRotation:!1});for(var i=[],r=0,o=t;r<o.length;r++){var a=o[r],h=a.x-.5,s=a.y-.5,u=n.ignoreRotation?0:e.rotation,l=Math.cos(u)*h-Math.sin(u)*s,d=Math.sin(u)*h+Math.cos(u)*s;l=l*e.width+e.xCenter,d=d*e.height+e.yCenter;var c=a.z*e.width,f=I({},a);f.x=l,f.y=d,f.z=c,i.push(f);}return i}(y,t),v=function(t,e){for(var n=[],i=0,r=t;i<r.length;i++){var o=r[i],a=o.x,h=o.y,s=e.rotation,u=Math.cos(s)*a-Math.sin(s)*h,l=Math.sin(s)*a+Math.cos(s)*h,d=I({},o);d.x=u,d.y=l,n.push(d);}return n}(g,t),dispose(a),dispose([i,o]),[2,{landmarks:x,worldLandmarks:v,handScore:d,handedness:p}]}}))}))},t.prototype.handLandmarksToRoi=function(t,e){return G(Z([].concat(t.slice(0,4),t.slice(5,7),t.slice(9,11),t.slice(13,15),t.slice(17,19)),e),e,rt)},t}();function dt(t){return T(this,void 0,void 0,(function(){var n,i,r,o,a,h;return S(this,(function(s){switch(s.label){case 0:return n=function(t){if(null==t)return I({},J);var e=I({},t);if(e.runtime="tfjs",null==e.maxHands&&(e.maxHands=J.maxHands),null==e.modelType&&(e.modelType=J.modelType),"lite"!==e.modelType&&"full"!==e.modelType)throw new Error("Model type must be one of lite or full, but got "+e.modelType);if(null==e.detectorModelUrl)switch(e.modelType){case"lite":e.detectorModelUrl="https://tfhub.dev/mediapipe/tfjs-model/handpose_3d/detector/lite/1";break;case"full":default:e.detectorModelUrl="https://tfhub.dev/mediapipe/tfjs-model/handpose_3d/detector/full/1";}if(null==e.landmarkModelUrl)switch(e.modelType){case"lite":e.landmarkModelUrl="https://tfhub.dev/mediapipe/tfjs-model/handpose_3d/landmark/lite/1";break;case"full":default:e.landmarkModelUrl="https://tfhub.dev/mediapipe/tfjs-model/handpose_3d/landmark/full/1";}return e}(t),i=n.detectorModelUrl.indexOf("https://tfhub.dev")>-1,r=n.landmarkModelUrl.indexOf("https://tfhub.dev")>-1,[4,Promise.all([loadGraphModel(n.detectorModelUrl,{fromTFHub:i}),loadGraphModel(n.landmarkModelUrl,{fromTFHub:r})])];case 1:return o=s.sent(),a=o[0],h=o[1],[2,new lt(a,h,n.maxHands)]}}))}))}function ct(t,e){return T(this,void 0,void 0,(function(){var n,i;return S(this,(function(r){switch(t){case ut.MediaPipeHands:if(i=void 0,null!=(n=e)){if("tfjs"===n.runtime)return [2,dt(n)];if("mediapipe"===n.runtime)return [2,H(n)];i=n.runtime;}throw new Error("Expect modelConfig.runtime to be either 'tfjs' or 'mediapipe', but got "+i);default:throw new Error(t+" is not a supported model name.")}}))}))}!function(t){t.MediaPipeHands="MediaPipeHands";}(ut||(ut={}));

export { ut as SupportedModels, ct as createDetector };
