/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/ex.js":
/*!*********************************!*\
  !*** ./src/js/components/ex.js ***!
  \*********************************/
/***/ (() => {

var swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  loop: true,
  speed: 400,
  spaceBetween: 10,
  navigation: {
    nextEl: '.slider__control-right',
    prevEl: '.slider__control-left'
  },
  breakpoints: {
    576: {
      slidesPerView: 2
    },
    1200: {
      slidesPerView: 3
    },
    1400: {
      spaceBetween: 30,
      slidesPerView: 4
    }
  }
});
var headerLink = document.querySelectorAll('.header__link'),
    mainPage = document.querySelector('.main__page'),
    mainPageTwo = document.querySelector('.main__page-two'),
    catalog = document.querySelector('.catalog'),
    cart = document.querySelector('.cart'),
    menu4 = document.querySelector('.menu-4'),
    menu3 = document.querySelector('.menu-3');
headerLink.forEach(function (item) {
  item.addEventListener('click', function (e) {
    if (e.target.classList.contains('catalog')) {
      mainPage.classList.remove('main__page-noactive');
      mainPageTwo.classList.remove('main__page-two-active');
      catalog.classList.add('active');
    }

    if (e.target.classList.contains('cart')) {
      cart.classList.add('active');
      classAdd();
    } else {
      cart.classList.remove('active');
    }

    if (e.target.classList.contains('menu-3')) {
      menu3.classList.add('active');
      classAdd();
    } else {
      menu3.classList.remove('active');
    }

    if (e.target.classList.contains('menu-4')) {
      menu4.classList.add('active');
      classAdd();
    } else {
      menu4.classList.remove('active');
    }
  });
});

function classAdd() {
  mainPage.classList.add('main__page-noactive');
  mainPageTwo.classList.add('main__page-two-active');
  catalog.classList.remove('active');
}

if (window.screen.width <= 1024) {
  var hamburger = document.querySelector('.hamburger'),
      headerNav = document.querySelector('.header__nav'),
      headerHambLink = document.querySelectorAll('.header__hamburger-link');
  hamburger.addEventListener('click', function () {
    headerNav.classList.toggle('header__nav-active');
    hamburger.classList.toggle('hamburger-active');
    document.body.classList.toggle('is-hidden');
  });
  headerHambLink.forEach(function (item) {
    item.addEventListener('click', function () {
      headerNav.classList.toggle('header__nav-active');
      document.body.classList.toggle('is-hidden');
    });
  });
}

var screenWidth = window.screen.width;
console.log(screenWidth);

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_ex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/ex.js */ "./src/js/components/ex.js");
/* harmony import */ var _components_ex_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_ex_js__WEBPACK_IMPORTED_MODULE_0__);

})();

/******/ })()
;
//# sourceMappingURL=main.js.map