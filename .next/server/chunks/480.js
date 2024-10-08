"use strict";
exports.id = 480;
exports.ids = [480];
exports.modules = {

/***/ 744:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ TokyoContext),
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
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
    PORTFOLIODETAILSMODAL: "PORTFOLIODETAILSMODAL"
};
const { NAV , ANIMATION , MODAL , SERVICEMODAL , NEWSMODAL , PORTFOLIODETAILSMODAL  } = type;
// Initial Value
const initialState = {
    nav: "home",
    animation: "fadeInLeft",
    modal: false,
    serviceModal: null,
    newsModal: null,
    portfolioDetailsModal: null,
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
    const { nav , animation , modal , serviceModal , newsModal , portfolioDetailsModal , menus  } = state;
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
            setPortfolioDetailsModal
        },
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TokyoState);



/***/ }),

/***/ 575:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ tokyo)
/* harmony export */ });
const tokyo = {
    dataImage () {
        let d = document.querySelectorAll("[data-img-url]");
        for(let i = 0; i < d.length; i++){
            const element = d[i];
            element.style.backgroundImage = `url(${element.getAttribute("data-img-url")})`;
        }
    },
    imageToSvg () {
        document.querySelectorAll("img.svg").forEach((el)=>{
            const imgID = el.getAttribute("id");
            const imgClass = el.getAttribute("class");
            const imgURL = el.getAttribute("src");
            fetch(imgURL).then((data)=>data.text()).then((response)=>{
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response, "text/html");
                let svg = xmlDoc.querySelector("svg");
                if (typeof imgID !== "undefined") {
                    svg.setAttribute("id", imgID);
                }
                if (typeof imgClass !== "undefined") {
                    svg.setAttribute("class", imgClass + " replaced-svg");
                }
                svg.removeAttribute("xmlns:a");
                if (el.parentNode) {
                    el.parentNode.replaceChild(svg, el);
                }
            });
        });
    },
    customCursor () {
        var myCursor = document.querySelectorAll(".mouse-cursor"), hamburger = document.querySelector(".hamburger"), kura_tm_topbar = document.querySelector(".kura_tm_topbar "), pointer = document.querySelector(".cursor-pointer"), e = document.querySelector(".cursor-inner"), t = document.querySelector(".cursor-outer");
        function mouseEvent(element) {
            element.addEventListener("mouseenter", function() {
                e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
            });
            element.addEventListener("mouseleave", function() {
                e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover");
            });
        }
        if (myCursor.length) {
            if (document.body) {
                let n, i = 0, o = !1;
                window.onmousemove = function(s) {
                    // console.log(document.querySelector(this));
                    o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX;
                }, document.body.addEventListener("mouseenter", // "a,.kura_tm_topbar .trigger, .cursor-pointer",
                function() {
                    let a = document.querySelectorAll("a"), sliders = document.querySelectorAll(".owl-carousel, .swiper-container, .cursor-link"), slider = document.querySelectorAll(".modal_item");
                    e.classList.add("cursor-inner"), t.classList.add("cursor-outer");
                    for(let i = 0; i < a.length; i++){
                        const element = a[i];
                        mouseEvent(element);
                    }
                    for(let i = 0; i < sliders.length; i++){
                        const element = sliders[i];
                        element.addEventListener("mouseenter", function() {
                            e.classList.add("cursor-slider"), t.classList.add("cursor-slider");
                        });
                        element.addEventListener("mouseleave", function() {
                            e.classList.remove("cursor-slider"), t.classList.remove("cursor-slider");
                        });
                    }
                    for(let i = 0; i < slider.length; i++){
                        const element = slider[i];
                        mouseEvent(element);
                    }
                    hamburger && mouseEvent(hamburger);
                    kura_tm_topbar && mouseEvent(kura_tm_topbar);
                    pointer && mouseEvent(pointer);
                }), e.style.visibility = "visible", t.style.visibility = "visible";
            }
        }
    },
    preloader () {
        let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
        let preloader = document.getElementById("preloader");
        if (preloader) {
            if (!isMobile) {
                setTimeout(function() {
                    preloader.classList.add("preloaded");
                }, 800);
                setTimeout(function() {
                    preloader.remove();
                }, 2000);
            } else {
                preloader.remove();
            }
        }
    },
    portfolioHover () {
        const tokyo_tm_portfolio_animation_wrap = document.querySelectorAll(".tokyo_tm_portfolio_animation_wrap"), tokyo_tm_portfolio_titles = document.querySelector(".tokyo_tm_portfolio_titles");
        tokyo_tm_portfolio_animation_wrap.forEach((element)=>{
            element.addEventListener("mousemove", ()=>{
                let title = element.getAttribute("data-title"), category = element.getAttribute("data-category");
                if (title) {
                    tokyo_tm_portfolio_titles.classList.add("visible");
                    tokyo_tm_portfolio_titles.innerHTML = title + '<span class="work__cat">' + category + "</span>";
                }
                document.addEventListener("mousemove", (e)=>{
                    tokyo_tm_portfolio_titles.style.left = `${e.clientX - 10}px`;
                    tokyo_tm_portfolio_titles.style.top = `${e.clientY + 25}px`;
                });
            });
            element.addEventListener("mouseleave", ()=>{
                tokyo_tm_portfolio_titles.classList.remove("visible");
            });
        });
    }
};


/***/ })

};
;