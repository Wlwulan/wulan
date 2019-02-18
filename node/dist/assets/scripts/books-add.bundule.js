(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["books-add"],{

/***/ "./src/webapp/components/add/add.js":
/*!******************************************!*\
  !*** ./src/webapp/components/add/add.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst add = {\n    init() {\n        console.log(\"add\");\n        xtag.create('x-add', class extends XTagElement {\n            constructor() {\n                super();\n                console.log(\"初始化执行\");\n                this.datas = {\n                    user: \"laoyuan\"\n                }\n            }\n            '::template(true)'() {\n                return `<h3>添加新闻</h3>\n                <form>\n                    <div class=\"form-group\">\n                        <label for=\"exampleInputEmail1\">书名</label>\n                        <input type=\"email\" class=\"form-control\" id=\"exampleInputEmail1\" placeholder=\"Email\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"exampleInputPassword1\">作者</label>\n                        <input type=\"password\" class=\"form-control\" id=\"exampleInputPassword1\" placeholder=\"Password\">\n                    </div>\n                    <button id=\"add-btn\" type=\"button\"  class=\"btn btn-primary\">提交</button>\n                </form>`\n            }\n            \"click::event\"(e){\n                if(e.target.id == \"add-btn\"){\n                    //fetch()\n                    alert(\"请求\");\n                }\n            }\n        });\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (add);\n\n//# sourceURL=webpack:///./src/webapp/components/add/add.js?");

/***/ }),

/***/ "./src/webapp/components/banner/banner.js":
/*!************************************************!*\
  !*** ./src/webapp/components/banner/banner.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.t.bind(null, /*! ./banner.css */ \"./src/webapp/components/banner/banner.css\", 7));\nconst banner = {\n    init(){\n        console.log(\"banner\");\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (banner);\n\n\n//# sourceURL=webpack:///./src/webapp/components/banner/banner.js?");

/***/ }),

/***/ "./src/webapp/views/books/books-add.entry.js":
/*!***************************************************!*\
  !*** ./src/webapp/views/books/books-add.entry.js ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_banner_banner_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/banner/banner.js */ \"./src/webapp/components/banner/banner.js\");\n/* harmony import */ var _components_add_add_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/add/add.js */ \"./src/webapp/components/add/add.js\");\n\n\n\n_components_banner_banner_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init();\n_components_add_add_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init();\n//Ioc容器\n\n//# sourceURL=webpack:///./src/webapp/views/books/books-add.entry.js?");

/***/ })

},[["./src/webapp/views/books/books-add.entry.js","runtime"]]]);