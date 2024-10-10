"use strict";
exports.id = 744;
exports.ids = [744];
exports.modules = {

/***/ 5744:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ TokyoContext),
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


// Create Context
const TokyoContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();
// Type
const type = {
    NAV: "NAV",
    ANIMATION: "ANIMATION",
    MODAL: "MODAL",
    SERVICEMODAL: "SERVICEMODAL",
    NEWSMODAL: "NEWSMODAL",
    PORTFOLIODETAILSMODAL: "PORTFOLIODETAILSMODAL",
    SIGNUPMODAL: "SIGNUPMODAL"
};
const { NAV , ANIMATION , MODAL , SERVICEMODAL , NEWSMODAL , PORTFOLIODETAILSMODAL , SIGNUPMODAL  } = type;
// Initial Value
const initialState = {
    nav: "home",
    animation: "fadeInLeft",
    modal: false,
    serviceModal: null,
    newsModal: null,
    portfolioDetailsModal: null,
    signUpModal: false,
    menus: [
        {
            id: 1,
            name: "home",
            href: "home"
        },
        {
            id: 2,
            name: "about",
            href: "about"
        },
        {
            id: 3,
            name: "retreat",
            href: "retreat"
        },
        {
            id: 4,
            name: "resources",
            href: "resources"
        },
        {
            id: 6,
            name: "contact",
            href: "contact"
        }
    ]
};
// Reducer
const reducer = (state, action)=>{
    const { type , payload  } = action;
    switch(type){
        case NAV:
            return {
                ...state,
                nav: payload
            };
        case ANIMATION:
            return {
                ...state,
                animation: payload
            };
        case SIGNUPMODAL:
            return {
                ...state,
                signUpModal: payload
            };
        case MODAL:
            return {
                ...state,
                modal: payload
            };
        case SERVICEMODAL:
            return {
                ...state,
                serviceModal: payload
            };
        case NEWSMODAL:
            return {
                ...state,
                newsModal: payload
            };
        case PORTFOLIODETAILSMODAL:
            return {
                ...state,
                portfolioDetailsModal: payload
            };
        default:
            return state;
    }
};
// Watson State
const TokyoState = ({ children  })=>{
    const [state, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(reducer, initialState);
    const navChange = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((value)=>{
        dispatch({
            type: NAV,
            payload: value
        });
    }, []);
    const animationChnage = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((value)=>{
        dispatch({
            type: ANIMATION,
            payload: value
        });
    }, []);
    const modalToggle = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((value)=>{
        dispatch({
            type: MODAL,
            payload: value
        });
    }, []);
    const setSignUpModal = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((value)=>{
        dispatch({
            type: SIGNUPMODAL,
            payload: value
        });
    }, []);
    const setServiceModal = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((value)=>{
        dispatch({
            type: SERVICEMODAL,
            payload: value
        });
    }, []);
    const setNewsModal = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((value)=>{
        dispatch({
            type: NEWSMODAL,
            payload: value
        });
    }, []);
    const setPortfolioDetailsModal = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((value)=>{
        dispatch({
            type: PORTFOLIODETAILSMODAL,
            payload: value
        });
    }, []);
    const { nav , animation , modal , serviceModal , newsModal , portfolioDetailsModal , menus , signUpModal  } = state;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(TokyoContext.Provider, {
        value: {
            menus,
            nav,
            navChange,
            animation,
            animationChnage,
            modal,
            modalToggle,
            serviceModal,
            setServiceModal,
            newsModal,
            setNewsModal,
            portfolioDetailsModal,
            setPortfolioDetailsModal,
            signUpModal,
            setSignUpModal
        },
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TokyoState);



/***/ })

};
;