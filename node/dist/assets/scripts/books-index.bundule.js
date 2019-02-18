(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["books-index"],{

/***/ "./src/webapp/components/banner/banner.js":
/*!************************************************!*\
  !*** ./src/webapp/components/banner/banner.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.t.bind(null, /*! ./banner.css */ \"./src/webapp/components/banner/banner.css\", 7));\nconst banner = {\n    init(){\n        console.log(\"banner\");\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (banner);\n\n\n//# sourceURL=webpack:///./src/webapp/components/banner/banner.js?");

/***/ }),

/***/ "./src/webapp/components/list/list.js":
/*!********************************************!*\
  !*** ./src/webapp/components/list/list.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst list = {\n    init(){\n        console.log(\"我是list\")\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (list);\n\n//# sourceURL=webpack:///./src/webapp/components/list/list.js?");

/***/ }),

/***/ "./src/webapp/views/books/books-index.entry.js":
/*!*****************************************************!*\
  !*** ./src/webapp/views/books/books-index.entry.js ***!
  \*****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_banner_banner_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/banner/banner.js */ \"./src/webapp/components/banner/banner.js\");\n/* harmony import */ var _components_list_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/list/list.js */ \"./src/webapp/components/list/list.js\");\n\n\n_components_list_list_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init();\n_components_banner_banner_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init();\n// class App{\n//     //所有的模块管理\n//     static modules = [];\n//     constructor(){\n//         this.init()\n//     }\n//     init(){\n//         this.initModules\n//     }\n//     //注入\n//     static use(){\n//         if(Array.isArray(module)){\n//             module.map(item => App.use(item))\n//         } else {\n//             App.modules.push(module)\n//         }\n//     }\n//     //执行模块\n//     initModules(){\n//         App.modules.map(module=>module.init(this));\n//     }\n// }\n\n// App.use([banner,list])\n\n//# sourceURL=webpack:///./src/webapp/views/books/books-index.entry.js?");

/***/ })

},[["./src/webapp/views/books/books-index.entry.js","runtime"]]]);