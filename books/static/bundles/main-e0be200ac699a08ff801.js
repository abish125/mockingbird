/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

throw new Error("Module build failed: Error: Cannot find module 'babel-core'\n    at Function.Module._resolveFilename (module.js:325:15)\n    at Function.Module._load (module.js:276:25)\n    at Module.require (module.js:353:17)\n    at require (internal/module.js:12:17)\n    at Object.<anonymous> (/home/ubuntu/workspace/catalog/node_modules/babel-loader/lib/index.js:3:13)\n    at Module._compile (module.js:409:26)\n    at Object.Module._extensions..js (module.js:416:10)\n    at Module.load (module.js:343:32)\n    at Function.Module._load (module.js:300:12)\n    at Module.require (module.js:353:17)\n    at require (internal/module.js:12:17)\n    at loadLoader (/home/ubuntu/workspace/catalog/node_modules/loader-runner/lib/loadLoader.js:13:17)\n    at iteratePitchingLoaders (/home/ubuntu/workspace/catalog/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/home/ubuntu/workspace/catalog/node_modules/loader-runner/lib/LoaderRunner.js:362:2)\n    at NormalModule.doBuild (/home/ubuntu/workspace/catalog/node_modules/webpack/lib/NormalModule.js:125:2)\n    at NormalModule.build (/home/ubuntu/workspace/catalog/node_modules/webpack/lib/NormalModule.js:173:15)\n    at Compilation.buildModule (/home/ubuntu/workspace/catalog/node_modules/webpack/lib/Compilation.js:127:9)\n    at Compilation.<anonymous> (/home/ubuntu/workspace/catalog/node_modules/webpack/lib/Compilation.js:401:8)\n    at /home/ubuntu/workspace/catalog/node_modules/webpack/lib/NormalModuleFactory.js:63:13\n    at NormalModuleFactory.applyPluginsAsyncWaterfall (/home/ubuntu/workspace/catalog/node_modules/tapable/lib/Tapable.js:196:70)\n    at onDoneResolving (/home/ubuntu/workspace/catalog/node_modules/webpack/lib/NormalModuleFactory.js:38:11)\n    at onDoneResolving (/home/ubuntu/workspace/catalog/node_modules/webpack/lib/NormalModuleFactory.js:135:6)\n    at /home/ubuntu/workspace/catalog/node_modules/webpack/lib/NormalModuleFactory.js:130:7\n    at /home/ubuntu/workspace/catalog/node_modules/async/lib/async.js:726:13\n    at /home/ubuntu/workspace/catalog/node_modules/async/lib/async.js:52:16\n    at done (/home/ubuntu/workspace/catalog/node_modules/async/lib/async.js:246:17)\n    at /home/ubuntu/workspace/catalog/node_modules/async/lib/async.js:44:16\n    at /home/ubuntu/workspace/catalog/node_modules/async/lib/async.js:723:17\n    at /home/ubuntu/workspace/catalog/node_modules/async/lib/async.js:167:37\n    at /home/ubuntu/workspace/catalog/node_modules/async/lib/async.js:52:16");

/***/ }
/******/ ]);