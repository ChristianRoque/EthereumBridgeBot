exports.id = 823;
exports.ids = [823];
exports.modules = {

/***/ 8277:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;
__webpack_unused_export__=true;exports.Y=getApiHandler;var _url=__webpack_require__(8835);var _apiUtils=__webpack_require__(5087);var _utils=__webpack_require__(2056);function getApiHandler(ctx){const{pageModule,encodedPreviewProps,pageIsDynamic}=ctx;const{handleRewrites,handleBasePath,dynamicRouteMatcher,normalizeDynamicRouteParams}=(0,_utils.getUtils)(ctx);return async(req,res)=>{try{// We need to trust the dynamic route params from the proxy
// to ensure we are using the correct values
const trustQuery=req.headers[_utils.vercelHeader];const parsedUrl=handleRewrites(req,(0,_url.parse)(req.url,true));if(parsedUrl.query.nextInternalLocale){delete parsedUrl.query.nextInternalLocale;}handleBasePath(req,parsedUrl);let params={};if(pageIsDynamic){const result=normalizeDynamicRouteParams(trustQuery?parsedUrl.query:dynamicRouteMatcher(parsedUrl.pathname));params=result.params;}await(0,_apiUtils.apiResolver)(req,res,Object.assign({},parsedUrl.query,params),await pageModule,encodedPreviewProps,true);}catch(err){console.error(err);// TODO: better error for DECODE_FAILED?
if(err.code==='DECODE_FAILED'){res.statusCode=400;res.end('Bad Request');}else{// Throw the error to crash the serverless function
throw err;}}};}
//# sourceMappingURL=api-handler.js.map

/***/ }),

/***/ 5697:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(2703)();
}


/***/ }),

/***/ 7294:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(2408);
} else {}


/***/ })

};
;