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
exports.id = "pages/success";
exports.ids = ["pages/success"];
exports.modules = {

/***/ "./pages/success.js":
/*!**************************!*\
  !*** ./pages/success.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src_components_Success__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/src/components/Success */ \"./src/components/Success.js\");\n\n\nconst SuccessPage = ()=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_src_components_Success__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {}, void 0, false, {\n        fileName: \"/Users/brennanpollock/Projects/tokyo/pages/success.js\",\n        lineNumber: 4,\n        columnNumber: 10\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SuccessPage);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9zdWNjZXNzLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQStDO0FBRS9DLE1BQU1DLGNBQWMsSUFBTTtJQUN4QixxQkFBTyw4REFBQ0QsK0RBQU9BOzs7OztBQUNqQjtBQUVBLGlFQUFlQyxXQUFXQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2FjcmVkLWZlbWluaW5lLXVpLy4vcGFnZXMvc3VjY2Vzcy5qcz9mMjI0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdWNjZXNzIGZyb20gJ0Avc3JjL2NvbXBvbmVudHMvU3VjY2Vzcyc7XG5cbmNvbnN0IFN1Y2Nlc3NQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gPFN1Y2Nlc3MgLz47XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdWNjZXNzUGFnZTtcbiJdLCJuYW1lcyI6WyJTdWNjZXNzIiwiU3VjY2Vzc1BhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/success.js\n");

/***/ }),

/***/ "./src/components/Success.js":
/*!***********************************!*\
  !*** ./src/components/Success.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Success)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction Success() {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    const handleBackToHome = ()=>{\n        router.push(\"/\");\n    };\n    const { session_id  } = router.query;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"success-page\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Payment Successful\"\n            }, void 0, false, {\n                fileName: \"/Users/brennanpollock/Projects/tokyo/src/components/Success.js\",\n                lineNumber: 13,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: \"We Can't Wait to See You On Retreat!\"\n            }, void 0, false, {\n                fileName: \"/Users/brennanpollock/Projects/tokyo/src/components/Success.js\",\n                lineNumber: 14,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: handleBackToHome,\n                children: \"Back to Home\"\n            }, void 0, false, {\n                fileName: \"/Users/brennanpollock/Projects/tokyo/src/components/Success.js\",\n                lineNumber: 15,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/brennanpollock/Projects/tokyo/src/components/Success.js\",\n        lineNumber: 12,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9TdWNjZXNzLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUF3QztBQUV6QixTQUFTQyxVQUFVO0lBQ2hDLE1BQU1DLFNBQVNGLHNEQUFTQTtJQUV4QixNQUFNRyxtQkFBbUIsSUFBTTtRQUM3QkQsT0FBT0UsSUFBSSxDQUFDO0lBQ2Q7SUFDQSxNQUFNLEVBQUVDLFdBQVUsRUFBRSxHQUFHSCxPQUFPSSxLQUFLO0lBRW5DLHFCQUNFLDhEQUFDQztRQUFJQyxXQUFVOzswQkFDYiw4REFBQ0M7MEJBQUc7Ozs7OzswQkFDSiw4REFBQ0M7MEJBQUU7Ozs7OzswQkFDSCw4REFBQ0M7Z0JBQU9DLFNBQVNUOzBCQUFrQjs7Ozs7Ozs7Ozs7O0FBR3pDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYWNyZWQtZmVtaW5pbmUtdWkvLi9zcmMvY29tcG9uZW50cy9TdWNjZXNzLmpzP2EzNjgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdWNjZXNzKCkge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICBjb25zdCBoYW5kbGVCYWNrVG9Ib21lID0gKCkgPT4ge1xuICAgIHJvdXRlci5wdXNoKCcvJyk7XG4gIH07XG4gIGNvbnN0IHsgc2Vzc2lvbl9pZCB9ID0gcm91dGVyLnF1ZXJ5O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzdWNjZXNzLXBhZ2VcIj5cbiAgICAgIDxoMT5QYXltZW50IFN1Y2Nlc3NmdWw8L2gxPlxuICAgICAgPHA+V2UgQ2FuJ3QgV2FpdCB0byBTZWUgWW91IE9uIFJldHJlYXQhPC9wPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVCYWNrVG9Ib21lfT5CYWNrIHRvIEhvbWU8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VSb3V0ZXIiLCJTdWNjZXNzIiwicm91dGVyIiwiaGFuZGxlQmFja1RvSG9tZSIsInB1c2giLCJzZXNzaW9uX2lkIiwicXVlcnkiLCJkaXYiLCJjbGFzc05hbWUiLCJoMSIsInAiLCJidXR0b24iLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/Success.js\n");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/success.js"));
module.exports = __webpack_exports__;

})();