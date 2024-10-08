"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/checkout-sessions/create";
exports.ids = ["pages/api/checkout-sessions/create"];
exports.modules = {

/***/ "next":
/*!****************************************************!*\
  !*** external "next/dist/lib/import-next-warning" ***!
  \****************************************************/
/***/ ((module) => {

module.exports = require("next/dist/lib/import-next-warning");

/***/ }),

/***/ "stripe":
/*!*************************!*\
  !*** external "stripe" ***!
  \*************************/
/***/ ((module) => {

module.exports = import("stripe");;

/***/ }),

/***/ "(api)/./pages/api/checkout-sessions/create.js":
/*!***********************************************!*\
  !*** ./pages/api/checkout-sessions/create.js ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! stripe */ \"stripe\");\n/* harmony import */ var next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next */ \"next\");\n/* harmony import */ var next__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next__WEBPACK_IMPORTED_MODULE_1__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([stripe__WEBPACK_IMPORTED_MODULE_0__]);\nstripe__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nconst stripe = new stripe__WEBPACK_IMPORTED_MODULE_0__[\"default\"](process.env.STRIPE_SECRET_KEY, {\n    apiVersion: \"2023-10-16\"\n});\nasync function handler(req, res) {\n    if (req.method === \"POST\") {\n        const { cartItems , returnUrl  } = req.body;\n        // Map cart items to the Stripe line_items format\n        const line_items = cartItems.map((item)=>{\n            return {\n                price_data: {\n                    currency: \"usd\",\n                    product_data: {\n                        name: item.name,\n                        images: [\n                            item.image\n                        ]\n                    },\n                    unit_amount: item.price * 100\n                },\n                quantity: item.quantity\n            };\n        });\n        const session = await stripe.checkout.sessions.create({\n            payment_method_types: [\n                \"card\"\n            ],\n            line_items,\n            mode: \"payment\",\n            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,\n            cancel_url: `${returnUrl}`\n        });\n        res.status(200).json({\n            sessionId: session.id\n        });\n    } else {\n        res.setHeader(\"Allow\", \"POST\");\n        res.status(405).end(\"Method Not Allowed\");\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvY2hlY2tvdXQtc2Vzc2lvbnMvY3JlYXRlLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBNEI7QUFDMkI7QUFFdkQsTUFBTUcsU0FBUyxJQUFJSCw4Q0FBTUEsQ0FBQ0ksUUFBUUMsR0FBRyxDQUFDQyxpQkFBaUIsRUFBRTtJQUN2REMsWUFBWTtBQUNkO0FBRWUsZUFBZUMsUUFBUUMsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDOUMsSUFBSUQsSUFBSUUsTUFBTSxLQUFLLFFBQVE7UUFDekIsTUFBTSxFQUFFQyxVQUFTLEVBQUVDLFVBQVMsRUFBRSxHQUFHSixJQUFJSyxJQUFJO1FBRXpDLGlEQUFpRDtRQUNqRCxNQUFNQyxhQUFhSCxVQUFVSSxHQUFHLENBQUMsQ0FBQ0MsT0FBUztZQUN6QyxPQUFPO2dCQUNMQyxZQUFZO29CQUNWQyxVQUFVO29CQUNWQyxjQUFjO3dCQUNaQyxNQUFNSixLQUFLSSxJQUFJO3dCQUNmQyxRQUFROzRCQUFDTCxLQUFLTSxLQUFLO3lCQUFDO29CQUN0QjtvQkFDQUMsYUFBYVAsS0FBS1EsS0FBSyxHQUFHO2dCQUM1QjtnQkFDQUMsVUFBVVQsS0FBS1MsUUFBUTtZQUN6QjtRQUNGO1FBRUEsTUFBTUMsVUFBVSxNQUFNeEIsT0FBT3lCLFFBQVEsQ0FBQ0MsUUFBUSxDQUFDQyxNQUFNLENBQUM7WUFDcERDLHNCQUFzQjtnQkFBQzthQUFPO1lBQzlCaEI7WUFDQWlCLE1BQU07WUFDTkMsYUFBYSxDQUFDLEVBQUV4QixJQUFJeUIsT0FBTyxDQUFDQyxNQUFNLENBQUMseUNBQXlDLENBQUM7WUFDN0VDLFlBQVksQ0FBQyxFQUFFdkIsVUFBVSxDQUFDO1FBQzVCO1FBRUFILElBQUkyQixNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVDLFdBQVdaLFFBQVFhLEVBQUU7UUFBQztJQUMvQyxPQUFPO1FBQ0w5QixJQUFJK0IsU0FBUyxDQUFDLFNBQVM7UUFDdkIvQixJQUFJMkIsTUFBTSxDQUFDLEtBQUtLLEdBQUcsQ0FBQztJQUN0QixDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NhY3JlZC1mZW1pbmluZS11aS8uL3BhZ2VzL2FwaS9jaGVja291dC1zZXNzaW9ucy9jcmVhdGUuanM/Yjg3NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RyaXBlIGZyb20gJ3N0cmlwZSc7XG5pbXBvcnQgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSAnbmV4dCc7XG5cbmNvbnN0IHN0cmlwZSA9IG5ldyBTdHJpcGUocHJvY2Vzcy5lbnYuU1RSSVBFX1NFQ1JFVF9LRVksIHtcbiAgYXBpVmVyc2lvbjogJzIwMjMtMTAtMTYnLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcbiAgaWYgKHJlcS5tZXRob2QgPT09ICdQT1NUJykge1xuICAgIGNvbnN0IHsgY2FydEl0ZW1zLCByZXR1cm5VcmwgfSA9IHJlcS5ib2R5O1xuXG4gICAgLy8gTWFwIGNhcnQgaXRlbXMgdG8gdGhlIFN0cmlwZSBsaW5lX2l0ZW1zIGZvcm1hdFxuICAgIGNvbnN0IGxpbmVfaXRlbXMgPSBjYXJ0SXRlbXMubWFwKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcmljZV9kYXRhOiB7XG4gICAgICAgICAgY3VycmVuY3k6ICd1c2QnLFxuICAgICAgICAgIHByb2R1Y3RfZGF0YToge1xuICAgICAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxuICAgICAgICAgICAgaW1hZ2VzOiBbaXRlbS5pbWFnZV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB1bml0X2Ftb3VudDogaXRlbS5wcmljZSAqIDEwMCwgLy8gVE9ETzogUHJpY2Ugc2hvdWxkIGJlIHJldHJpZXZlZCBmcm9tIGRiXG4gICAgICAgIH0sXG4gICAgICAgIHF1YW50aXR5OiBpdGVtLnF1YW50aXR5LFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBzdHJpcGUuY2hlY2tvdXQuc2Vzc2lvbnMuY3JlYXRlKHtcbiAgICAgIHBheW1lbnRfbWV0aG9kX3R5cGVzOiBbJ2NhcmQnXSxcbiAgICAgIGxpbmVfaXRlbXMsXG4gICAgICBtb2RlOiAncGF5bWVudCcsXG4gICAgICBzdWNjZXNzX3VybDogYCR7cmVxLmhlYWRlcnMub3JpZ2lufS9zdWNjZXNzP3Nlc3Npb25faWQ9e0NIRUNLT1VUX1NFU1NJT05fSUR9YCxcbiAgICAgIGNhbmNlbF91cmw6IGAke3JldHVyblVybH1gLFxuICAgIH0pO1xuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzZXNzaW9uSWQ6IHNlc3Npb24uaWQgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmVzLnNldEhlYWRlcignQWxsb3cnLCAnUE9TVCcpO1xuICAgIHJlcy5zdGF0dXMoNDA1KS5lbmQoJ01ldGhvZCBOb3QgQWxsb3dlZCcpO1xuICB9XG59XG4iXSwibmFtZXMiOlsiU3RyaXBlIiwiTmV4dEFwaVJlcXVlc3QiLCJOZXh0QXBpUmVzcG9uc2UiLCJzdHJpcGUiLCJwcm9jZXNzIiwiZW52IiwiU1RSSVBFX1NFQ1JFVF9LRVkiLCJhcGlWZXJzaW9uIiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsImNhcnRJdGVtcyIsInJldHVyblVybCIsImJvZHkiLCJsaW5lX2l0ZW1zIiwibWFwIiwiaXRlbSIsInByaWNlX2RhdGEiLCJjdXJyZW5jeSIsInByb2R1Y3RfZGF0YSIsIm5hbWUiLCJpbWFnZXMiLCJpbWFnZSIsInVuaXRfYW1vdW50IiwicHJpY2UiLCJxdWFudGl0eSIsInNlc3Npb24iLCJjaGVja291dCIsInNlc3Npb25zIiwiY3JlYXRlIiwicGF5bWVudF9tZXRob2RfdHlwZXMiLCJtb2RlIiwic3VjY2Vzc191cmwiLCJoZWFkZXJzIiwib3JpZ2luIiwiY2FuY2VsX3VybCIsInN0YXR1cyIsImpzb24iLCJzZXNzaW9uSWQiLCJpZCIsInNldEhlYWRlciIsImVuZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/checkout-sessions/create.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/checkout-sessions/create.js"));
module.exports = __webpack_exports__;

})();