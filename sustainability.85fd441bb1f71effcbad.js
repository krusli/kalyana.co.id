/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/sems_v1.pdf":
/*!********************************!*\
  !*** ./src/assets/sems_v1.pdf ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/sems_v1.538989916db7ba448b78636081f5c970.pdf");

/***/ }),

/***/ "./src/common.js":
/*!***********************!*\
  !*** ./src/common.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _scss_app_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/app.scss */ "./src/scss/app.scss");
/* harmony import */ var owl_carousel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! owl.carousel */ "./node_modules/owl.carousel/dist/owl.carousel.js");
/* harmony import */ var owl_carousel__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(owl_carousel__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "./node_modules/@fortawesome/fontawesome-svg-core/index.mjs");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.mjs");
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "./node_modules/@fortawesome/free-regular-svg-icons/index.mjs");
/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/free-brands-svg-icons */ "./node_modules/@fortawesome/free-brands-svg-icons/index.mjs");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");




/* Font Awesome */




_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_3__.library.add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.fas, _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_5__.far, _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_6__.fab)
_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_3__.dom.i2svg()     // automatically find any <i> tags in the page and replace those with <svg> elements

/* Wait for page to load - https://css-tricks.com/making-animations-wait/ */
document.body.classList.add('js-loading');

window.addEventListener("load", showPage);

function showPage() {
    document.body.classList.remove('js-loading');
}

$(document).ready(function() {
    // update with latest year
    $('#year').html(new Date().getFullYear());
})

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sustainability.js":
/*!*******************************!*\
  !*** ./src/sustainability.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./src/common.js");
/* harmony import */ var pdfjs_dist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pdfjs-dist */ "./node_modules/pdfjs-dist/build/pdf.mjs");



// https://github.com/mozilla/pdf.js/tree/master/examples/webpack
// https://mozilla.github.io/pdf.js/examples/index.html#interactive-examples

// Modern PDF.js import for newer versions


// Set worker path to the copied worker file
pdfjs_dist__WEBPACK_IMPORTED_MODULE_1__.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const semsPdfUrl = (__webpack_require__(/*! src/assets/sems_v1.pdf */ "./src/assets/sems_v1.pdf")["default"]);  // works for file loader

var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 1,
    canvas = document.getElementById('pdf'),
    ctx = canvas.getContext('2d');

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(num) {
  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function(page) {
    var viewport = page.getViewport({scale: scale});
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    if (window.devicePixelRatio > 1) {
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
    
        canvas.width = canvasWidth * window.devicePixelRatio;
        canvas.height = canvasHeight * window.devicePixelRatio;
        canvas.style.width = canvasWidth + "px";
        canvas.style.height = canvasHeight + "px";
    
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  // Update page counters
  document.getElementById('page_num').textContent = num;
}

/**
 * If another page rendering in progress, waits until the rendering is
 * finised. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

/**
 * Displays previous page.
 */
function onPrevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}
document.getElementById('prev').addEventListener('click', onPrevPage);

/**
 * Displays next page.
 */
function onNextPage() {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
}
document.getElementById('next').addEventListener('click', onNextPage);

/**
 * Asynchronously downloads PDF.
 */
pdfjs_dist__WEBPACK_IMPORTED_MODULE_1__.getDocument(semsPdfUrl).promise.then(function(pdfDoc_) {
  pdfDoc = pdfDoc_;
  document.getElementById('page_count').textContent = pdfDoc.numPages;

  // Initial/first page rendering
  renderPage(pageNum);
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"sustainability": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkkalyana_co_id"] = self["webpackChunkkalyana_co_id"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/sustainability.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VzdGFpbmFiaWxpdHkuODVmZDQ0MWJiMWY3MWVmZmNiYWQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBZSxxQkFBdUIsd0RBQXdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0EzRTtBQUNNO0FBQ0g7O0FBRXRCO0FBQ2dFO0FBQ1Q7QUFDRTtBQUNEO0FBQ3hELHNFQUFPLEtBQUssa0VBQUcsRUFBRSxvRUFBRyxFQUFFLG1FQUFHO0FBQ3pCLGtFQUFHOztBQUVIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUM7QUFDRDtBQUNBLElBQUksQ0FBQztBQUNMLENBQUM7Ozs7Ozs7Ozs7O0FDeEJEOzs7Ozs7Ozs7Ozs7OztBQ0FxQjs7O0FBR3JCO0FBQ0E7O0FBRUE7QUFDdUM7O0FBRXZDO0FBQ0EsMkRBQTRCOztBQUU1QixtQkFBbUIsMEZBQXlDLEdBQUc7O0FBRS9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsYUFBYTtBQUNsRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtREFBb0I7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7O1VDakhEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7O1dDQUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va2FseWFuYS5jby5pZC8uL3NyYy9hc3NldHMvc2Vtc192MS5wZGYiLCJ3ZWJwYWNrOi8va2FseWFuYS5jby5pZC8uL3NyYy9jb21tb24uanMiLCJ3ZWJwYWNrOi8va2FseWFuYS5jby5pZC8uL3NyYy9zY3NzL2FwcC5zY3NzPzcwMGQiLCJ3ZWJwYWNrOi8va2FseWFuYS5jby5pZC8uL3NyYy9zdXN0YWluYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly9rYWx5YW5hLmNvLmlkL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2thbHlhbmEuY28uaWQvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9rYWx5YW5hLmNvLmlkL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2thbHlhbmEuY28uaWQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2thbHlhbmEuY28uaWQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9rYWx5YW5hLmNvLmlkL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va2FseWFuYS5jby5pZC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9rYWx5YW5hLmNvLmlkL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2thbHlhbmEuY28uaWQvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9rYWx5YW5hLmNvLmlkL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9rYWx5YW5hLmNvLmlkL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiYXNzZXRzL3NlbXNfdjEuNTM4OTg5OTE2ZGI3YmE0NDhiNzg2MzYwODFmNWM5NzAucGRmXCI7IiwiaW1wb3J0IFwiYm9vdHN0cmFwXCI7XG5pbXBvcnQgXCIuL3Njc3MvYXBwLnNjc3NcIjtcbmltcG9ydCBcIm93bC5jYXJvdXNlbFwiO1xuXG4vKiBGb250IEF3ZXNvbWUgKi9cbmltcG9ydCB7IGxpYnJhcnksIGRvbSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSdcbmltcG9ydCB7IGZhcyB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucydcbmltcG9ydCB7IGZhciB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXJlZ3VsYXItc3ZnLWljb25zJ1xuaW1wb3J0IHsgZmFiIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtYnJhbmRzLXN2Zy1pY29ucydcbmxpYnJhcnkuYWRkKGZhcywgZmFyLCBmYWIpXG5kb20uaTJzdmcoKSAgICAgLy8gYXV0b21hdGljYWxseSBmaW5kIGFueSA8aT4gdGFncyBpbiB0aGUgcGFnZSBhbmQgcmVwbGFjZSB0aG9zZSB3aXRoIDxzdmc+IGVsZW1lbnRzXG5cbi8qIFdhaXQgZm9yIHBhZ2UgdG8gbG9hZCAtIGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vbWFraW5nLWFuaW1hdGlvbnMtd2FpdC8gKi9cbmRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnanMtbG9hZGluZycpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgc2hvd1BhZ2UpO1xuXG5mdW5jdGlvbiBzaG93UGFnZSgpIHtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2pzLWxvYWRpbmcnKTtcbn1cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgLy8gdXBkYXRlIHdpdGggbGF0ZXN0IHllYXJcbiAgICAkKCcjeWVhcicpLmh0bWwobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcbn0pIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0ICcuL2NvbW1vbi5qcyc7XG5cblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvcGRmLmpzL3RyZWUvbWFzdGVyL2V4YW1wbGVzL3dlYnBhY2tcbi8vIGh0dHBzOi8vbW96aWxsYS5naXRodWIuaW8vcGRmLmpzL2V4YW1wbGVzL2luZGV4Lmh0bWwjaW50ZXJhY3RpdmUtZXhhbXBsZXNcblxuLy8gTW9kZXJuIFBERi5qcyBpbXBvcnQgZm9yIG5ld2VyIHZlcnNpb25zXG5pbXBvcnQgKiBhcyBwZGZqc0xpYiBmcm9tICdwZGZqcy1kaXN0JztcblxuLy8gU2V0IHdvcmtlciBwYXRoIHRvIHRoZSBjb3BpZWQgd29ya2VyIGZpbGVcbnBkZmpzTGliLkdsb2JhbFdvcmtlck9wdGlvbnMud29ya2VyU3JjID0gJy9wZGYud29ya2VyLm1pbi5tanMnO1xuXG5jb25zdCBzZW1zUGRmVXJsID0gcmVxdWlyZSgnc3JjL2Fzc2V0cy9zZW1zX3YxLnBkZicpLmRlZmF1bHQ7ICAvLyB3b3JrcyBmb3IgZmlsZSBsb2FkZXJcblxudmFyIHBkZkRvYyA9IG51bGwsXG4gICAgcGFnZU51bSA9IDEsXG4gICAgcGFnZVJlbmRlcmluZyA9IGZhbHNlLFxuICAgIHBhZ2VOdW1QZW5kaW5nID0gbnVsbCxcbiAgICBzY2FsZSA9IDEsXG4gICAgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BkZicpLFxuICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4vKipcbiAqIEdldCBwYWdlIGluZm8gZnJvbSBkb2N1bWVudCwgcmVzaXplIGNhbnZhcyBhY2NvcmRpbmdseSwgYW5kIHJlbmRlciBwYWdlLlxuICogQHBhcmFtIG51bSBQYWdlIG51bWJlci5cbiAqL1xuZnVuY3Rpb24gcmVuZGVyUGFnZShudW0pIHtcbiAgcGFnZVJlbmRlcmluZyA9IHRydWU7XG4gIC8vIFVzaW5nIHByb21pc2UgdG8gZmV0Y2ggdGhlIHBhZ2VcbiAgcGRmRG9jLmdldFBhZ2UobnVtKS50aGVuKGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICB2YXIgdmlld3BvcnQgPSBwYWdlLmdldFZpZXdwb3J0KHtzY2FsZTogc2NhbGV9KTtcbiAgICBjYW52YXMuaGVpZ2h0ID0gdmlld3BvcnQuaGVpZ2h0O1xuICAgIGNhbnZhcy53aWR0aCA9IHZpZXdwb3J0LndpZHRoO1xuXG4gICAgaWYgKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMSkge1xuICAgICAgICB2YXIgY2FudmFzV2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgICAgIHZhciBjYW52YXNIZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xuICAgIFxuICAgICAgICBjYW52YXMud2lkdGggPSBjYW52YXNXaWR0aCAqIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gY2FudmFzSGVpZ2h0ICogd2luZG93LmRldmljZVBpeGVsUmF0aW87XG4gICAgICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IGNhbnZhc1dpZHRoICsgXCJweFwiO1xuICAgICAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gY2FudmFzSGVpZ2h0ICsgXCJweFwiO1xuICAgIFxuICAgICAgICBjdHguc2NhbGUod2luZG93LmRldmljZVBpeGVsUmF0aW8sIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICB9XG5cbiAgICAvLyBSZW5kZXIgUERGIHBhZ2UgaW50byBjYW52YXMgY29udGV4dFxuICAgIHZhciByZW5kZXJDb250ZXh0ID0ge1xuICAgICAgY2FudmFzQ29udGV4dDogY3R4LFxuICAgICAgdmlld3BvcnQ6IHZpZXdwb3J0XG4gICAgfTtcbiAgICB2YXIgcmVuZGVyVGFzayA9IHBhZ2UucmVuZGVyKHJlbmRlckNvbnRleHQpO1xuXG4gICAgLy8gV2FpdCBmb3IgcmVuZGVyaW5nIHRvIGZpbmlzaFxuICAgIHJlbmRlclRhc2sucHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgcGFnZVJlbmRlcmluZyA9IGZhbHNlO1xuICAgICAgaWYgKHBhZ2VOdW1QZW5kaW5nICE9PSBudWxsKSB7XG4gICAgICAgIC8vIE5ldyBwYWdlIHJlbmRlcmluZyBpcyBwZW5kaW5nXG4gICAgICAgIHJlbmRlclBhZ2UocGFnZU51bVBlbmRpbmcpO1xuICAgICAgICBwYWdlTnVtUGVuZGluZyA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIFVwZGF0ZSBwYWdlIGNvdW50ZXJzXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlX251bScpLnRleHRDb250ZW50ID0gbnVtO1xufVxuXG4vKipcbiAqIElmIGFub3RoZXIgcGFnZSByZW5kZXJpbmcgaW4gcHJvZ3Jlc3MsIHdhaXRzIHVudGlsIHRoZSByZW5kZXJpbmcgaXNcbiAqIGZpbmlzZWQuIE90aGVyd2lzZSwgZXhlY3V0ZXMgcmVuZGVyaW5nIGltbWVkaWF0ZWx5LlxuICovXG5mdW5jdGlvbiBxdWV1ZVJlbmRlclBhZ2UobnVtKSB7XG4gIGlmIChwYWdlUmVuZGVyaW5nKSB7XG4gICAgcGFnZU51bVBlbmRpbmcgPSBudW07XG4gIH0gZWxzZSB7XG4gICAgcmVuZGVyUGFnZShudW0pO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGxheXMgcHJldmlvdXMgcGFnZS5cbiAqL1xuZnVuY3Rpb24gb25QcmV2UGFnZSgpIHtcbiAgaWYgKHBhZ2VOdW0gPD0gMSkge1xuICAgIHJldHVybjtcbiAgfVxuICBwYWdlTnVtLS07XG4gIHF1ZXVlUmVuZGVyUGFnZShwYWdlTnVtKTtcbn1cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmV2JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvblByZXZQYWdlKTtcblxuLyoqXG4gKiBEaXNwbGF5cyBuZXh0IHBhZ2UuXG4gKi9cbmZ1bmN0aW9uIG9uTmV4dFBhZ2UoKSB7XG4gIGlmIChwYWdlTnVtID49IHBkZkRvYy5udW1QYWdlcykge1xuICAgIHJldHVybjtcbiAgfVxuICBwYWdlTnVtKys7XG4gIHF1ZXVlUmVuZGVyUGFnZShwYWdlTnVtKTtcbn1cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXh0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk5leHRQYWdlKTtcblxuLyoqXG4gKiBBc3luY2hyb25vdXNseSBkb3dubG9hZHMgUERGLlxuICovXG5wZGZqc0xpYi5nZXREb2N1bWVudChzZW1zUGRmVXJsKS5wcm9taXNlLnRoZW4oZnVuY3Rpb24ocGRmRG9jXykge1xuICBwZGZEb2MgPSBwZGZEb2NfO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFnZV9jb3VudCcpLnRleHRDb250ZW50ID0gcGRmRG9jLm51bVBhZ2VzO1xuXG4gIC8vIEluaXRpYWwvZmlyc3QgcGFnZSByZW5kZXJpbmdcbiAgcmVuZGVyUGFnZShwYWdlTnVtKTtcbn0pOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwic3VzdGFpbmFiaWxpdHlcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5ra2FseWFuYV9jb19pZFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtrYWx5YW5hX2NvX2lkXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc3VzdGFpbmFiaWxpdHkuanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==