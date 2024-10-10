"use strict";
(() => {
var exports = {};
exports.id = 761;
exports.ids = [761];
exports.modules = {

/***/ 8801:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: external "@mailchimp/mailchimp_marketing"
const mailchimp_marketing_namespaceObject = require("@mailchimp/mailchimp_marketing");
var mailchimp_marketing_default = /*#__PURE__*/__webpack_require__.n(mailchimp_marketing_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/subscribe.js

mailchimp_marketing_default().setConfig({
    apiKey: "18bb7c68d85e0d869246603e57babbd6-us19",
    server: "us19"
});
async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }
    const { firstName , lastName , email  } = req.body;
    if (!email) {
        return res.status(400).json({
            error: "Email is required"
        });
    }
    try {
        await mailchimp_marketing_default().lists.addListMember("749f2b97d8", {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        });
        return res.status(201).json({
            message: "Successfully subscribed"
        });
    } catch (error) {
        console.error("Error subscribing to Mailchimp:", error);
        return res.status(500).json({
            error: error.message || "Error subscribing to newsletter"
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8801));
module.exports = __webpack_exports__;

})();