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
exports.id = "pages/api/subscribe";
exports.ids = ["pages/api/subscribe"];
exports.modules = {

/***/ "@mailchimp/mailchimp_marketing":
/*!*************************************************!*\
  !*** external "@mailchimp/mailchimp_marketing" ***!
  \*************************************************/
/***/ ((module) => {

module.exports = require("@mailchimp/mailchimp_marketing");

/***/ }),

/***/ "(api)/./pages/api/subscribe.js":
/*!********************************!*\
  !*** ./pages/api/subscribe.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _mailchimp_mailchimp_marketing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mailchimp/mailchimp_marketing */ \"@mailchimp/mailchimp_marketing\");\n/* harmony import */ var _mailchimp_mailchimp_marketing__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mailchimp_mailchimp_marketing__WEBPACK_IMPORTED_MODULE_0__);\n\n_mailchimp_mailchimp_marketing__WEBPACK_IMPORTED_MODULE_0___default().setConfig({\n    apiKey: \"18bb7c68d85e0d869246603e57babbd6-us19\",\n    server: \"us19\"\n});\nasync function handler(req, res) {\n    if (req.method !== \"POST\") {\n        return res.status(405).json({\n            error: \"Method not allowed\"\n        });\n    }\n    const { firstName , lastName , email  } = req.body;\n    if (!email) {\n        return res.status(400).json({\n            error: \"Email is required\"\n        });\n    }\n    try {\n        await _mailchimp_mailchimp_marketing__WEBPACK_IMPORTED_MODULE_0___default().lists.addListMember(\"749f2b97d8\", {\n            email_address: email,\n            status: \"subscribed\",\n            merge_fields: {\n                FNAME: firstName,\n                LNAME: lastName\n            }\n        });\n        return res.status(201).json({\n            message: \"Successfully subscribed\"\n        });\n    } catch (error) {\n        console.error(\"Error subscribing to Mailchimp:\", error);\n        return res.status(500).json({\n            error: error.message || \"Error subscribing to newsletter\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvc3Vic2NyaWJlLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUF1RDtBQUV2REEsK0VBQW1CLENBQUM7SUFDbEJFLFFBQVE7SUFDUkMsUUFBUTtBQUNWO0FBRWUsZUFBZUMsUUFBUUMsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDOUMsSUFBSUQsSUFBSUUsTUFBTSxLQUFLLFFBQVE7UUFDekIsT0FBT0QsSUFBSUUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQXFCO0lBQzVELENBQUM7SUFFRCxNQUFNLEVBQUVDLFVBQVMsRUFBRUMsU0FBUSxFQUFFQyxNQUFLLEVBQUUsR0FBR1IsSUFBSVMsSUFBSTtJQUUvQyxJQUFJLENBQUNELE9BQU87UUFDVixPQUFPUCxJQUFJRSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBb0I7SUFDM0QsQ0FBQztJQUVELElBQUk7UUFDRixNQUFNVix5RkFBNkIsQ0FBQyxjQUFjO1lBQ2hEaUIsZUFBZUo7WUFDZkwsUUFBUTtZQUNSVSxjQUFjO2dCQUNaQyxPQUFPUjtnQkFDUFMsT0FBT1I7WUFDVDtRQUNGO1FBRUEsT0FBT04sSUFBSUUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFWSxTQUFTO1FBQTBCO0lBQ25FLEVBQUUsT0FBT1gsT0FBTztRQUNkWSxRQUFRWixLQUFLLENBQUMsbUNBQW1DQTtRQUVqRCxPQUFPSixJQUNKRSxNQUFNLENBQUMsS0FDUEMsSUFBSSxDQUFDO1lBQUVDLE9BQU9BLE1BQU1XLE9BQU8sSUFBSTtRQUFrQztJQUN0RTtBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYWNyZWQtZmVtaW5pbmUtdWkvLi9wYWdlcy9hcGkvc3Vic2NyaWJlLmpzPzMyMzIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1haWxjaGltcCBmcm9tICdAbWFpbGNoaW1wL21haWxjaGltcF9tYXJrZXRpbmcnO1xuXG5tYWlsY2hpbXAuc2V0Q29uZmlnKHtcbiAgYXBpS2V5OiAnMThiYjdjNjhkODVlMGQ4NjkyNDY2MDNlNTdiYWJiZDYtdXMxOScsXG4gIHNlcnZlcjogJ3VzMTknLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcbiAgaWYgKHJlcS5tZXRob2QgIT09ICdQT1NUJykge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwNSkuanNvbih7IGVycm9yOiAnTWV0aG9kIG5vdCBhbGxvd2VkJyB9KTtcbiAgfVxuXG4gIGNvbnN0IHsgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwgfSA9IHJlcS5ib2R5O1xuXG4gIGlmICghZW1haWwpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ0VtYWlsIGlzIHJlcXVpcmVkJyB9KTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgYXdhaXQgbWFpbGNoaW1wLmxpc3RzLmFkZExpc3RNZW1iZXIoJzc0OWYyYjk3ZDgnLCB7XG4gICAgICBlbWFpbF9hZGRyZXNzOiBlbWFpbCxcbiAgICAgIHN0YXR1czogJ3N1YnNjcmliZWQnLFxuICAgICAgbWVyZ2VfZmllbGRzOiB7XG4gICAgICAgIEZOQU1FOiBmaXJzdE5hbWUsXG4gICAgICAgIExOQU1FOiBsYXN0TmFtZSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLmpzb24oeyBtZXNzYWdlOiAnU3VjY2Vzc2Z1bGx5IHN1YnNjcmliZWQnIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHN1YnNjcmliaW5nIHRvIE1haWxjaGltcDonLCBlcnJvcik7XG5cbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKDUwMClcbiAgICAgIC5qc29uKHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0Vycm9yIHN1YnNjcmliaW5nIHRvIG5ld3NsZXR0ZXInIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsibWFpbGNoaW1wIiwic2V0Q29uZmlnIiwiYXBpS2V5Iiwic2VydmVyIiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsInN0YXR1cyIsImpzb24iLCJlcnJvciIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwiZW1haWwiLCJib2R5IiwibGlzdHMiLCJhZGRMaXN0TWVtYmVyIiwiZW1haWxfYWRkcmVzcyIsIm1lcmdlX2ZpZWxkcyIsIkZOQU1FIiwiTE5BTUUiLCJtZXNzYWdlIiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/subscribe.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/subscribe.js"));
module.exports = __webpack_exports__;

})();