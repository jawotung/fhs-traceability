/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./lib/axios */ \"./node_modules/axios/lib/axios.js\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6IkFBQUEsNEZBQXVDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzPzUzZTkiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/axios/index.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar settle = __webpack_require__(/*! ./../core/settle */ \"./node_modules/axios/lib/core/settle.js\");\nvar buildURL = __webpack_require__(/*! ./../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ \"./node_modules/axios/lib/core/buildFullPath.js\");\nvar parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ \"./node_modules/axios/lib/helpers/parseHeaders.js\");\nvar isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ \"./node_modules/axios/lib/helpers/isURLSameOrigin.js\");\nvar createError = __webpack_require__(/*! ../core/createError */ \"./node_modules/axios/lib/core/createError.js\");\n\nmodule.exports = function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var requestData = config.data;\n    var requestHeaders = config.headers;\n\n    if (utils.isFormData(requestData)) {\n      delete requestHeaders['Content-Type']; // Let the browser set it\n    }\n\n    var request = new XMLHttpRequest();\n\n    // HTTP basic authentication\n    if (config.auth) {\n      var username = config.auth.username || '';\n      var password = config.auth.password || '';\n      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);\n    }\n\n    var fullPath = buildFullPath(config.baseURL, config.url);\n    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);\n\n    // Set the request timeout in MS\n    request.timeout = config.timeout;\n\n    // Listen for ready state\n    request.onreadystatechange = function handleLoad() {\n      if (!request || request.readyState !== 4) {\n        return;\n      }\n\n      // The request errored out and we didn't get a response, this will be\n      // handled by onerror instead\n      // With one exception: request that using file: protocol, most browsers\n      // will return status as 0 even though it's a successful request\n      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {\n        return;\n      }\n\n      // Prepare the response\n      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;\n      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;\n      var response = {\n        data: responseData,\n        status: request.status,\n        statusText: request.statusText,\n        headers: responseHeaders,\n        config: config,\n        request: request\n      };\n\n      settle(resolve, reject, response);\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle browser request cancellation (as opposed to a manual cancellation)\n    request.onabort = function handleAbort() {\n      if (!request) {\n        return;\n      }\n\n      reject(createError('Request aborted', config, 'ECONNABORTED', request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle low level network errors\n    request.onerror = function handleError() {\n      // Real errors are hidden from us by the browser\n      // onerror should only fire if it's a network error\n      reject(createError('Network Error', config, null, request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle timeout\n    request.ontimeout = function handleTimeout() {\n      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';\n      if (config.timeoutErrorMessage) {\n        timeoutErrorMessage = config.timeoutErrorMessage;\n      }\n      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',\n        request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Add xsrf header\n    // This is only done if running in a standard browser environment.\n    // Specifically not if we're in a web worker, or react-native.\n    if (utils.isStandardBrowserEnv()) {\n      var cookies = __webpack_require__(/*! ./../helpers/cookies */ \"./node_modules/axios/lib/helpers/cookies.js\");\n\n      // Add xsrf header\n      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?\n        cookies.read(config.xsrfCookieName) :\n        undefined;\n\n      if (xsrfValue) {\n        requestHeaders[config.xsrfHeaderName] = xsrfValue;\n      }\n    }\n\n    // Add headers to the request\n    if ('setRequestHeader' in request) {\n      utils.forEach(requestHeaders, function setRequestHeader(val, key) {\n        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {\n          // Remove Content-Type if data is undefined\n          delete requestHeaders[key];\n        } else {\n          // Otherwise add header to the request\n          request.setRequestHeader(key, val);\n        }\n      });\n    }\n\n    // Add withCredentials to request if needed\n    if (!utils.isUndefined(config.withCredentials)) {\n      request.withCredentials = !!config.withCredentials;\n    }\n\n    // Add responseType to request if needed\n    if (config.responseType) {\n      try {\n        request.responseType = config.responseType;\n      } catch (e) {\n        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.\n        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.\n        if (config.responseType !== 'json') {\n          throw e;\n        }\n      }\n    }\n\n    // Handle progress if needed\n    if (typeof config.onDownloadProgress === 'function') {\n      request.addEventListener('progress', config.onDownloadProgress);\n    }\n\n    // Not all browsers support upload events\n    if (typeof config.onUploadProgress === 'function' && request.upload) {\n      request.upload.addEventListener('progress', config.onUploadProgress);\n    }\n\n    if (config.cancelToken) {\n      // Handle cancellation\n      config.cancelToken.promise.then(function onCanceled(cancel) {\n        if (!request) {\n          return;\n        }\n\n        request.abort();\n        reject(cancel);\n        // Clean up request\n        request = null;\n      });\n    }\n\n    if (requestData === undefined) {\n      requestData = null;\n    }\n\n    // Send the request\n    request.send(requestData);\n  });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcy5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7QUFDaEMsYUFBYSxtQkFBTyxDQUFDLGlFQUFrQjtBQUN2QyxlQUFlLG1CQUFPLENBQUMsMkVBQXVCO0FBQzlDLG9CQUFvQixtQkFBTyxDQUFDLDZFQUF1QjtBQUNuRCxtQkFBbUIsbUJBQU8sQ0FBQyxtRkFBMkI7QUFDdEQsc0JBQXNCLG1CQUFPLENBQUMseUZBQThCO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLHlFQUFxQjs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkM7QUFDN0M7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMseUVBQXNCOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzPzFhNWMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICB2YXIgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICB2YXIgdGltZW91dEVycm9yTWVzc2FnZSA9ICd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCc7XG4gICAgICBpZiAoY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKHRpbWVvdXRFcnJvck1lc3NhZ2UsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGZ1bGxQYXRoKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIWNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/adapters/xhr.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar Axios = __webpack_require__(/*! ./core/Axios */ \"./node_modules/axios/lib/core/Axios.js\");\nvar mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\nvar defaults = __webpack_require__(/*! ./defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Create an instance of Axios\n *\n * @param {Object} defaultConfig The default config for the instance\n * @return {Axios} A new instance of Axios\n */\nfunction createInstance(defaultConfig) {\n  var context = new Axios(defaultConfig);\n  var instance = bind(Axios.prototype.request, context);\n\n  // Copy axios.prototype to instance\n  utils.extend(instance, Axios.prototype, context);\n\n  // Copy context to instance\n  utils.extend(instance, context);\n\n  return instance;\n}\n\n// Create the default instance to be exported\nvar axios = createInstance(defaults);\n\n// Expose Axios class to allow class inheritance\naxios.Axios = Axios;\n\n// Factory for creating new instances\naxios.create = function create(instanceConfig) {\n  return createInstance(mergeConfig(axios.defaults, instanceConfig));\n};\n\n// Expose Cancel & CancelToken\naxios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\naxios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ \"./node_modules/axios/lib/cancel/CancelToken.js\");\naxios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\n\n// Expose all/spread\naxios.all = function all(promises) {\n  return Promise.all(promises);\n};\naxios.spread = __webpack_require__(/*! ./helpers/spread */ \"./node_modules/axios/lib/helpers/spread.js\");\n\nmodule.exports = axios;\n\n// Allow use of default import syntax in TypeScript\nmodule.exports[\"default\"] = axios;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzLmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxrREFBUztBQUM3QixXQUFXLG1CQUFPLENBQUMsZ0VBQWdCO0FBQ25DLFlBQVksbUJBQU8sQ0FBQyw0REFBYztBQUNsQyxrQkFBa0IsbUJBQU8sQ0FBQyx3RUFBb0I7QUFDOUMsZUFBZSxtQkFBTyxDQUFDLHdEQUFZOztBQUVuQztBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsbUJBQU8sQ0FBQyxrRUFBaUI7QUFDeEMsb0JBQW9CLG1CQUFPLENBQUMsNEVBQXNCO0FBQ2xELGlCQUFpQixtQkFBTyxDQUFDLHNFQUFtQjs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1CQUFPLENBQUMsb0VBQWtCOztBQUV6Qzs7QUFFQTtBQUNBLHlCQUFzQiIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanM/ZmFkNiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9jb3JlL21lcmdlQ29uZmlnJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGF4aW9zLmRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/axios.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * A `Cancel` is an object that is thrown when an operation is canceled.\n *\n * @class\n * @param {string=} message The message.\n */\nfunction Cancel(message) {\n  this.message = message;\n}\n\nCancel.prototype.toString = function toString() {\n  return 'Cancel' + (this.message ? ': ' + this.message : '');\n};\n\nCancel.prototype.__CANCEL__ = true;\n\nmodule.exports = Cancel;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMuanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzP2QyYTIiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/cancel/Cancel.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar Cancel = __webpack_require__(/*! ./Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n\n/**\n * A `CancelToken` is an object that can be used to request cancellation of an operation.\n *\n * @class\n * @param {Function} executor The executor function.\n */\nfunction CancelToken(executor) {\n  if (typeof executor !== 'function') {\n    throw new TypeError('executor must be a function.');\n  }\n\n  var resolvePromise;\n  this.promise = new Promise(function promiseExecutor(resolve) {\n    resolvePromise = resolve;\n  });\n\n  var token = this;\n  executor(function cancel(message) {\n    if (token.reason) {\n      // Cancellation has already been requested\n      return;\n    }\n\n    token.reason = new Cancel(message);\n    resolvePromise(token.reason);\n  });\n}\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nCancelToken.prototype.throwIfRequested = function throwIfRequested() {\n  if (this.reason) {\n    throw this.reason;\n  }\n};\n\n/**\n * Returns an object that contains a new `CancelToken` and a function that, when called,\n * cancels the `CancelToken`.\n */\nCancelToken.source = function source() {\n  var cancel;\n  var token = new CancelToken(function executor(c) {\n    cancel = c;\n  });\n  return {\n    token: token,\n    cancel: cancel\n  };\n};\n\nmodule.exports = CancelToken;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcy5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixhQUFhLG1CQUFPLENBQUMsMkRBQVU7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzPzcyYzgiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/cancel/CancelToken.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function isCancel(value) {\n  return !!(value && value.__CANCEL__);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qcy5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYjtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qcz9jMTdhIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/cancel/isCancel.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar buildURL = __webpack_require__(/*! ../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ \"./node_modules/axios/lib/core/InterceptorManager.js\");\nvar dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ \"./node_modules/axios/lib/core/dispatchRequest.js\");\nvar mergeConfig = __webpack_require__(/*! ./mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\n\n/**\n * Create a new instance of Axios\n *\n * @param {Object} instanceConfig The default config for the instance\n */\nfunction Axios(instanceConfig) {\n  this.defaults = instanceConfig;\n  this.interceptors = {\n    request: new InterceptorManager(),\n    response: new InterceptorManager()\n  };\n}\n\n/**\n * Dispatch a request\n *\n * @param {Object} config The config specific for this request (merged with this.defaults)\n */\nAxios.prototype.request = function request(config) {\n  /*eslint no-param-reassign:0*/\n  // Allow for axios('example/url'[, config]) a la fetch API\n  if (typeof config === 'string') {\n    config = arguments[1] || {};\n    config.url = arguments[0];\n  } else {\n    config = config || {};\n  }\n\n  config = mergeConfig(this.defaults, config);\n\n  // Set config.method\n  if (config.method) {\n    config.method = config.method.toLowerCase();\n  } else if (this.defaults.method) {\n    config.method = this.defaults.method.toLowerCase();\n  } else {\n    config.method = 'get';\n  }\n\n  // Hook up interceptors middleware\n  var chain = [dispatchRequest, undefined];\n  var promise = Promise.resolve(config);\n\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {\n    chain.unshift(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {\n    chain.push(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  while (chain.length) {\n    promise = promise.then(chain.shift(), chain.shift());\n  }\n\n  return promise;\n};\n\nAxios.prototype.getUri = function getUri(config) {\n  config = mergeConfig(this.defaults, config);\n  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\\?/, '');\n};\n\n// Provide aliases for supported request methods\nutils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url\n    }));\n  };\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, data, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url,\n      data: data\n    }));\n  };\n});\n\nmodule.exports = Axios;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMuanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZO0FBQ2hDLGVBQWUsbUJBQU8sQ0FBQyx5RUFBcUI7QUFDNUMseUJBQXlCLG1CQUFPLENBQUMsaUZBQXNCO0FBQ3ZELHNCQUFzQixtQkFBTyxDQUFDLDJFQUFtQjtBQUNqRCxrQkFBa0IsbUJBQU8sQ0FBQyxtRUFBZTs7QUFFekM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzPzI5ZmIiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9tZXJnZUNvbmZpZycpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuICAgIGNvbmZpZy51cmwgPSBhcmd1bWVudHNbMF07XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICB9XG5cbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICBpZiAoY29uZmlnLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSBpZiAodGhpcy5kZWZhdWx0cy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gdGhpcy5kZWZhdWx0cy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcubWV0aG9kID0gJ2dldCc7XG4gIH1cblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuQXhpb3MucHJvdG90eXBlLmdldFVyaSA9IGZ1bmN0aW9uIGdldFVyaShjb25maWcpIHtcbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgcmV0dXJuIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKS5yZXBsYWNlKC9eXFw/LywgJycpO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/core/Axios.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction InterceptorManager() {\n  this.handlers = [];\n}\n\n/**\n * Add a new interceptor to the stack\n *\n * @param {Function} fulfilled The function to handle `then` for a `Promise`\n * @param {Function} rejected The function to handle `reject` for a `Promise`\n *\n * @return {Number} An ID used to remove interceptor later\n */\nInterceptorManager.prototype.use = function use(fulfilled, rejected) {\n  this.handlers.push({\n    fulfilled: fulfilled,\n    rejected: rejected\n  });\n  return this.handlers.length - 1;\n};\n\n/**\n * Remove an interceptor from the stack\n *\n * @param {Number} id The ID that was returned by `use`\n */\nInterceptorManager.prototype.eject = function eject(id) {\n  if (this.handlers[id]) {\n    this.handlers[id] = null;\n  }\n};\n\n/**\n * Iterate over all the registered interceptors\n *\n * This method is particularly useful for skipping over any\n * interceptors that may have become `null` calling `eject`.\n *\n * @param {Function} fn The function to call for each interceptor\n */\nInterceptorManager.prototype.forEach = function forEach(fn) {\n  utils.forEach(this.handlers, function forEachHandler(h) {\n    if (h !== null) {\n      fn(h);\n    }\n  });\n};\n\nmodule.exports = InterceptorManager;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzLmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixXQUFXLFVBQVU7QUFDckI7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanM/Yzc5MiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/core/InterceptorManager.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ \"./node_modules/axios/lib/helpers/isAbsoluteURL.js\");\nvar combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ \"./node_modules/axios/lib/helpers/combineURLs.js\");\n\n/**\n * Creates a new URL by combining the baseURL with the requestedURL,\n * only when the requestedURL is not already an absolute URL.\n * If the requestURL is absolute, this function returns the requestedURL untouched.\n *\n * @param {string} baseURL The base URL\n * @param {string} requestedURL Absolute or relative URL to combine\n * @returns {string} The combined full path\n */\nmodule.exports = function buildFullPath(baseURL, requestedURL) {\n  if (baseURL && !isAbsoluteURL(requestedURL)) {\n    return combineURLs(baseURL, requestedURL);\n  }\n  return requestedURL;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvYnVpbGRGdWxsUGF0aC5qcy5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixvQkFBb0IsbUJBQU8sQ0FBQyxtRkFBMEI7QUFDdEQsa0JBQWtCLG1CQUFPLENBQUMsK0VBQXdCOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvYnVpbGRGdWxsUGF0aC5qcz9mMDJkIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/core/buildFullPath.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar enhanceError = __webpack_require__(/*! ./enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\n\n/**\n * Create an Error with the specified message, config, error code, request and response.\n *\n * @param {string} message The error message.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The created error.\n */\nmodule.exports = function createError(message, config, code, request, response) {\n  var error = new Error(message);\n  return enhanceError(error, config, code, request, response);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvY3JlYXRlRXJyb3IuanMuanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsbUJBQW1CLG1CQUFPLENBQUMscUVBQWdCOztBQUUzQztBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzPzc3MGMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/core/createError.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar transformData = __webpack_require__(/*! ./transformData */ \"./node_modules/axios/lib/core/transformData.js\");\nvar isCancel = __webpack_require__(/*! ../cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nfunction throwIfCancellationRequested(config) {\n  if (config.cancelToken) {\n    config.cancelToken.throwIfRequested();\n  }\n}\n\n/**\n * Dispatch a request to the server using the configured adapter.\n *\n * @param {object} config The config that is to be used for the request\n * @returns {Promise} The Promise to be fulfilled\n */\nmodule.exports = function dispatchRequest(config) {\n  throwIfCancellationRequested(config);\n\n  // Ensure headers exist\n  config.headers = config.headers || {};\n\n  // Transform request data\n  config.data = transformData(\n    config.data,\n    config.headers,\n    config.transformRequest\n  );\n\n  // Flatten headers\n  config.headers = utils.merge(\n    config.headers.common || {},\n    config.headers[config.method] || {},\n    config.headers\n  );\n\n  utils.forEach(\n    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],\n    function cleanHeaderConfig(method) {\n      delete config.headers[method];\n    }\n  );\n\n  var adapter = config.adapter || defaults.adapter;\n\n  return adapter(config).then(function onAdapterResolution(response) {\n    throwIfCancellationRequested(config);\n\n    // Transform response data\n    response.data = transformData(\n      response.data,\n      response.headers,\n      config.transformResponse\n    );\n\n    return response;\n  }, function onAdapterRejection(reason) {\n    if (!isCancel(reason)) {\n      throwIfCancellationRequested(config);\n\n      // Transform response data\n      if (reason && reason.response) {\n        reason.response.data = transformData(\n          reason.response.data,\n          reason.response.headers,\n          config.transformResponse\n        );\n      }\n    }\n\n    return Promise.reject(reason);\n  });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzLmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTtBQUNoQyxvQkFBb0IsbUJBQU8sQ0FBQyx1RUFBaUI7QUFDN0MsZUFBZSxtQkFBTyxDQUFDLHVFQUFvQjtBQUMzQyxlQUFlLG1CQUFPLENBQUMseURBQWE7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtCQUErQjtBQUMvQix1Q0FBdUM7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzPzRkYzkiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNcbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/core/dispatchRequest.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Update an Error with the specified config, error code, and response.\n *\n * @param {Error} error The error to update.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The error.\n */\nmodule.exports = function enhanceError(error, config, code, request, response) {\n  error.config = config;\n  if (code) {\n    error.code = code;\n  }\n\n  error.request = request;\n  error.response = response;\n  error.isAxiosError = true;\n\n  error.toJSON = function() {\n    return {\n      // Standard\n      message: this.message,\n      name: this.name,\n      // Microsoft\n      description: this.description,\n      number: this.number,\n      // Mozilla\n      fileName: this.fileName,\n      lineNumber: this.lineNumber,\n      columnNumber: this.columnNumber,\n      stack: this.stack,\n      // Axios\n      config: this.config,\n      code: this.code\n    };\n  };\n  return error;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzLmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanM/MGRmMyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG5cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIGVycm9yLmlzQXhpb3NFcnJvciA9IHRydWU7XG5cbiAgZXJyb3IudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGVcbiAgICB9O1xuICB9O1xuICByZXR1cm4gZXJyb3I7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/core/enhanceError.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Config-specific merge-function which creates a new config-object\n * by merging two configuration objects together.\n *\n * @param {Object} config1\n * @param {Object} config2\n * @returns {Object} New object resulting from merging config2 to config1\n */\nmodule.exports = function mergeConfig(config1, config2) {\n  // eslint-disable-next-line no-param-reassign\n  config2 = config2 || {};\n  var config = {};\n\n  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];\n  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];\n  var defaultToConfig2Keys = [\n    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',\n    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',\n    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',\n    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',\n    'httpsAgent', 'cancelToken', 'socketPath'\n  ];\n\n  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {\n    if (typeof config2[prop] !== 'undefined') {\n      config[prop] = config2[prop];\n    }\n  });\n\n  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {\n    if (utils.isObject(config2[prop])) {\n      config[prop] = utils.deepMerge(config1[prop], config2[prop]);\n    } else if (typeof config2[prop] !== 'undefined') {\n      config[prop] = config2[prop];\n    } else if (utils.isObject(config1[prop])) {\n      config[prop] = utils.deepMerge(config1[prop]);\n    } else if (typeof config1[prop] !== 'undefined') {\n      config[prop] = config1[prop];\n    }\n  });\n\n  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {\n    if (typeof config2[prop] !== 'undefined') {\n      config[prop] = config2[prop];\n    } else if (typeof config1[prop] !== 'undefined') {\n      config[prop] = config1[prop];\n    }\n  });\n\n  var axiosKeys = valueFromConfig2Keys\n    .concat(mergeDeepPropertiesKeys)\n    .concat(defaultToConfig2Keys);\n\n  var otherKeys = Object\n    .keys(config2)\n    .filter(function filterAxiosKeys(key) {\n      return axiosKeys.indexOf(key) === -1;\n    });\n\n  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {\n    if (typeof config2[prop] !== 'undefined') {\n      config[prop] = config2[prop];\n    } else if (typeof config1[prop] !== 'undefined') {\n      config[prop] = config1[prop];\n    }\n  });\n\n  return config;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMuanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLG1EQUFVOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanM/YmQxMyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICB2YXIgY29uZmlnID0ge307XG5cbiAgdmFyIHZhbHVlRnJvbUNvbmZpZzJLZXlzID0gWyd1cmwnLCAnbWV0aG9kJywgJ3BhcmFtcycsICdkYXRhJ107XG4gIHZhciBtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cyA9IFsnaGVhZGVycycsICdhdXRoJywgJ3Byb3h5J107XG4gIHZhciBkZWZhdWx0VG9Db25maWcyS2V5cyA9IFtcbiAgICAnYmFzZVVSTCcsICd1cmwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJyxcbiAgICAndGltZW91dCcsICd3aXRoQ3JlZGVudGlhbHMnLCAnYWRhcHRlcicsICdyZXNwb25zZVR5cGUnLCAneHNyZkNvb2tpZU5hbWUnLFxuICAgICd4c3JmSGVhZGVyTmFtZScsICdvblVwbG9hZFByb2dyZXNzJywgJ29uRG93bmxvYWRQcm9ncmVzcycsXG4gICAgJ21heENvbnRlbnRMZW5ndGgnLCAndmFsaWRhdGVTdGF0dXMnLCAnbWF4UmVkaXJlY3RzJywgJ2h0dHBBZ2VudCcsXG4gICAgJ2h0dHBzQWdlbnQnLCAnY2FuY2VsVG9rZW4nLCAnc29ja2V0UGF0aCdcbiAgXTtcblxuICB1dGlscy5mb3JFYWNoKHZhbHVlRnJvbUNvbmZpZzJLZXlzLCBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKHByb3ApIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cywgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhwcm9wKSB7XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSB1dGlscy5kZWVwTWVyZ2UoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gdXRpbHMuZGVlcE1lcmdlKGNvbmZpZzFbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChkZWZhdWx0VG9Db25maWcyS2V5cywgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBheGlvc0tleXMgPSB2YWx1ZUZyb21Db25maWcyS2V5c1xuICAgIC5jb25jYXQobWVyZ2VEZWVwUHJvcGVydGllc0tleXMpXG4gICAgLmNvbmNhdChkZWZhdWx0VG9Db25maWcyS2V5cyk7XG5cbiAgdmFyIG90aGVyS2V5cyA9IE9iamVjdFxuICAgIC5rZXlzKGNvbmZpZzIpXG4gICAgLmZpbHRlcihmdW5jdGlvbiBmaWx0ZXJBeGlvc0tleXMoa2V5KSB7XG4gICAgICByZXR1cm4gYXhpb3NLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTE7XG4gICAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChvdGhlcktleXMsIGZ1bmN0aW9uIG90aGVyS2V5c0RlZmF1bHRUb0NvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gY29uZmlnO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/core/mergeConfig.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar createError = __webpack_require__(/*! ./createError */ \"./node_modules/axios/lib/core/createError.js\");\n\n/**\n * Resolve or reject a Promise based on response status.\n *\n * @param {Function} resolve A function that resolves the promise.\n * @param {Function} reject A function that rejects the promise.\n * @param {object} response The response.\n */\nmodule.exports = function settle(resolve, reject, response) {\n  var validateStatus = response.config.validateStatus;\n  if (!validateStatus || validateStatus(response.status)) {\n    resolve(response);\n  } else {\n    reject(createError(\n      'Request failed with status code ' + response.status,\n      response.config,\n      null,\n      response.request,\n      response\n    ));\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzLmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLGtCQUFrQixtQkFBTyxDQUFDLG1FQUFlOztBQUV6QztBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanM/ODc2OCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/core/settle.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Transform the data for a request or a response\n *\n * @param {Object|String} data The data to be transformed\n * @param {Array} headers The headers for the request or response\n * @param {Array|Function} fns A single function or Array of functions\n * @returns {*} The resulting transformed data\n */\nmodule.exports = function transformData(data, headers, fns) {\n  /*eslint no-param-reassign:0*/\n  utils.forEach(fns, function transform(fn) {\n    data = fn(data, headers);\n  });\n\n  return data;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcy5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZUFBZTtBQUMxQixXQUFXLE9BQU87QUFDbEIsV0FBVyxnQkFBZ0I7QUFDM0IsYUFBYSxHQUFHO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcz83NjYyIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/core/transformData.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ \"./node_modules/process/browser.js\");\n\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ \"./node_modules/axios/lib/helpers/normalizeHeaderName.js\");\n\nvar DEFAULT_CONTENT_TYPE = {\n  'Content-Type': 'application/x-www-form-urlencoded'\n};\n\nfunction setContentTypeIfUnset(headers, value) {\n  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {\n    headers['Content-Type'] = value;\n  }\n}\n\nfunction getDefaultAdapter() {\n  var adapter;\n  if (typeof XMLHttpRequest !== 'undefined') {\n    // For browsers use XHR adapter\n    adapter = __webpack_require__(/*! ./adapters/xhr */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {\n    // For node use HTTP adapter\n    adapter = __webpack_require__(/*! ./adapters/http */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  }\n  return adapter;\n}\n\nvar defaults = {\n  adapter: getDefaultAdapter(),\n\n  transformRequest: [function transformRequest(data, headers) {\n    normalizeHeaderName(headers, 'Accept');\n    normalizeHeaderName(headers, 'Content-Type');\n    if (utils.isFormData(data) ||\n      utils.isArrayBuffer(data) ||\n      utils.isBuffer(data) ||\n      utils.isStream(data) ||\n      utils.isFile(data) ||\n      utils.isBlob(data)\n    ) {\n      return data;\n    }\n    if (utils.isArrayBufferView(data)) {\n      return data.buffer;\n    }\n    if (utils.isURLSearchParams(data)) {\n      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');\n      return data.toString();\n    }\n    if (utils.isObject(data)) {\n      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');\n      return JSON.stringify(data);\n    }\n    return data;\n  }],\n\n  transformResponse: [function transformResponse(data) {\n    /*eslint no-param-reassign:0*/\n    if (typeof data === 'string') {\n      try {\n        data = JSON.parse(data);\n      } catch (e) { /* Ignore */ }\n    }\n    return data;\n  }],\n\n  /**\n   * A timeout in milliseconds to abort a request. If set to 0 (default) a\n   * timeout is not created.\n   */\n  timeout: 0,\n\n  xsrfCookieName: 'XSRF-TOKEN',\n  xsrfHeaderName: 'X-XSRF-TOKEN',\n\n  maxContentLength: -1,\n\n  validateStatus: function validateStatus(status) {\n    return status >= 200 && status < 300;\n  }\n};\n\ndefaults.headers = {\n  common: {\n    'Accept': 'application/json, text/plain, */*'\n  }\n};\n\nutils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {\n  defaults.headers[method] = {};\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);\n});\n\nmodule.exports = defaults;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzLmpzIiwibWFwcGluZ3MiOiI7QUFBYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsa0RBQVM7QUFDN0IsMEJBQTBCLG1CQUFPLENBQUMsOEZBQStCOztBQUVqRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxnRUFBZ0I7QUFDdEMsSUFBSSxnQkFBZ0IsT0FBTyxtREFBbUQsT0FBTztBQUNyRjtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxpRUFBaUI7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0U7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsWUFBWTtBQUNwQjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanM/ZTIyMSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/defaults.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function bind(fn, thisArg) {\n  return function wrap() {\n    var args = new Array(arguments.length);\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i];\n    }\n    return fn.apply(thisArg, args);\n  };\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcy5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcz80YmVhIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/helpers/bind.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction encode(val) {\n  return encodeURIComponent(val).\n    replace(/%40/gi, '@').\n    replace(/%3A/gi, ':').\n    replace(/%24/g, '$').\n    replace(/%2C/gi, ',').\n    replace(/%20/g, '+').\n    replace(/%5B/gi, '[').\n    replace(/%5D/gi, ']');\n}\n\n/**\n * Build a URL by appending params to the end\n *\n * @param {string} url The base of the url (e.g., http://www.google.com)\n * @param {object} [params] The params to be appended\n * @returns {string} The formatted url\n */\nmodule.exports = function buildURL(url, params, paramsSerializer) {\n  /*eslint no-param-reassign:0*/\n  if (!params) {\n    return url;\n  }\n\n  var serializedParams;\n  if (paramsSerializer) {\n    serializedParams = paramsSerializer(params);\n  } else if (utils.isURLSearchParams(params)) {\n    serializedParams = params.toString();\n  } else {\n    var parts = [];\n\n    utils.forEach(params, function serialize(val, key) {\n      if (val === null || typeof val === 'undefined') {\n        return;\n      }\n\n      if (utils.isArray(val)) {\n        key = key + '[]';\n      } else {\n        val = [val];\n      }\n\n      utils.forEach(val, function parseValue(v) {\n        if (utils.isDate(v)) {\n          v = v.toISOString();\n        } else if (utils.isObject(v)) {\n          v = JSON.stringify(v);\n        }\n        parts.push(encode(key) + '=' + encode(v));\n      });\n    });\n\n    serializedParams = parts.join('&');\n  }\n\n  if (serializedParams) {\n    var hashmarkIndex = url.indexOf('#');\n    if (hashmarkIndex !== -1) {\n      url = url.slice(0, hashmarkIndex);\n    }\n\n    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;\n  }\n\n  return url;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMuanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcz9jMTc4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/helpers/buildURL.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Creates a new URL by combining the specified URLs\n *\n * @param {string} baseURL The base URL\n * @param {string} relativeURL The relative URL\n * @returns {string} The combined URL\n */\nmodule.exports = function combineURLs(baseURL, relativeURL) {\n  return relativeURL\n    ? baseURL.replace(/\\/+$/, '') + '/' + relativeURL.replace(/^\\/+/, '')\n    : baseURL;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMuanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzPzZiYzYiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/helpers/combineURLs.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs support document.cookie\n    (function standardBrowserEnv() {\n      return {\n        write: function write(name, value, expires, path, domain, secure) {\n          var cookie = [];\n          cookie.push(name + '=' + encodeURIComponent(value));\n\n          if (utils.isNumber(expires)) {\n            cookie.push('expires=' + new Date(expires).toGMTString());\n          }\n\n          if (utils.isString(path)) {\n            cookie.push('path=' + path);\n          }\n\n          if (utils.isString(domain)) {\n            cookie.push('domain=' + domain);\n          }\n\n          if (secure === true) {\n            cookie.push('secure');\n          }\n\n          document.cookie = cookie.join('; ');\n        },\n\n        read: function read(name) {\n          var match = document.cookie.match(new RegExp('(^|;\\\\s*)(' + name + ')=([^;]*)'));\n          return (match ? decodeURIComponent(match[3]) : null);\n        },\n\n        remove: function remove(name) {\n          this.write(name, '', Date.now() - 86400000);\n        }\n      };\n    })() :\n\n  // Non standard browser env (web workers, react-native) lack needed support.\n    (function nonStandardBrowserEnv() {\n      return {\n        write: function write() {},\n        read: function read() { return null; },\n        remove: function remove() {}\n      };\n    })()\n);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcy5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7O0FBRWhDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwyQ0FBMkM7QUFDM0MsU0FBUzs7QUFFVDtBQUNBLDREQUE0RCx3QkFBd0I7QUFDcEY7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEMsZ0NBQWdDLGNBQWM7QUFDOUM7QUFDQTtBQUNBLEtBQUs7QUFDTCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzPzFkM2YiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/helpers/cookies.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Determines whether the specified URL is absolute\n *\n * @param {string} url The URL to test\n * @returns {boolean} True if the specified URL is absolute, otherwise false\n */\nmodule.exports = function isAbsoluteURL(url) {\n  // A URL is considered absolute if it begins with \"<scheme>://\" or \"//\" (protocol-relative URL).\n  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed\n  // by any combination of letters, digits, plus, period, or hyphen.\n  return /^([a-z][a-z\\d\\+\\-\\.]*:)?\\/\\//i.test(url);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcy5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanM/YTIyNyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/helpers/isAbsoluteURL.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs have full support of the APIs needed to test\n  // whether the request URL is of the same origin as current location.\n    (function standardBrowserEnv() {\n      var msie = /(msie|trident)/i.test(navigator.userAgent);\n      var urlParsingNode = document.createElement('a');\n      var originURL;\n\n      /**\n    * Parse a URL to discover it's components\n    *\n    * @param {String} url The URL to be parsed\n    * @returns {Object}\n    */\n      function resolveURL(url) {\n        var href = url;\n\n        if (msie) {\n        // IE needs attribute set twice to normalize properties\n          urlParsingNode.setAttribute('href', href);\n          href = urlParsingNode.href;\n        }\n\n        urlParsingNode.setAttribute('href', href);\n\n        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils\n        return {\n          href: urlParsingNode.href,\n          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',\n          host: urlParsingNode.host,\n          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\\?/, '') : '',\n          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',\n          hostname: urlParsingNode.hostname,\n          port: urlParsingNode.port,\n          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?\n            urlParsingNode.pathname :\n            '/' + urlParsingNode.pathname\n        };\n      }\n\n      originURL = resolveURL(window.location.href);\n\n      /**\n    * Determine if a URL shares the same origin as the current location\n    *\n    * @param {String} requestURL The URL to test\n    * @returns {boolean} True if URL shares the same origin, otherwise false\n    */\n      return function isURLSameOrigin(requestURL) {\n        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;\n        return (parsed.protocol === originURL.protocol &&\n            parsed.host === originURL.host);\n      };\n    })() :\n\n  // Non standard browser envs (web workers, react-native) lack needed support.\n    (function nonStandardBrowserEnv() {\n      return function isURLSameOrigin() {\n        return true;\n      };\n    })()\n);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzLmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzPzg3OTUiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/helpers/isURLSameOrigin.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = function normalizeHeaderName(headers, normalizedName) {\n  utils.forEach(headers, function processHeader(value, name) {\n    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {\n      headers[normalizedName] = value;\n      delete headers[name];\n    }\n  });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcy5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsbURBQVU7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzPzZiMTUiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/helpers/normalizeHeaderName.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n// Headers whose duplicates are ignored by node\n// c.f. https://nodejs.org/api/http.html#http_message_headers\nvar ignoreDuplicateOf = [\n  'age', 'authorization', 'content-length', 'content-type', 'etag',\n  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',\n  'last-modified', 'location', 'max-forwards', 'proxy-authorization',\n  'referer', 'retry-after', 'user-agent'\n];\n\n/**\n * Parse headers into an object\n *\n * ```\n * Date: Wed, 27 Aug 2014 08:58:49 GMT\n * Content-Type: application/json\n * Connection: keep-alive\n * Transfer-Encoding: chunked\n * ```\n *\n * @param {String} headers Headers needing to be parsed\n * @returns {Object} Headers parsed into an object\n */\nmodule.exports = function parseHeaders(headers) {\n  var parsed = {};\n  var key;\n  var val;\n  var i;\n\n  if (!headers) { return parsed; }\n\n  utils.forEach(headers.split('\\n'), function parser(line) {\n    i = line.indexOf(':');\n    key = utils.trim(line.substr(0, i)).toLowerCase();\n    val = utils.trim(line.substr(i + 1));\n\n    if (key) {\n      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {\n        return;\n      }\n      if (key === 'set-cookie') {\n        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);\n      } else {\n        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;\n      }\n    }\n  });\n\n  return parsed;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzLmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjs7QUFFbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanM/NTRlOSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/helpers/parseHeaders.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Syntactic sugar for invoking a function and expanding an array for arguments.\n *\n * Common use case would be to use `Function.prototype.apply`.\n *\n *  ```js\n *  function f(x, y, z) {}\n *  var args = [1, 2, 3];\n *  f.apply(null, args);\n *  ```\n *\n * With `spread` this example can be re-written.\n *\n *  ```js\n *  spread(function(x, y, z) {})([1, 2, 3]);\n *  ```\n *\n * @param {Function} callback\n * @returns {Function}\n */\nmodule.exports = function spread(callback) {\n  return function wrap(arr) {\n    return callback.apply(null, arr);\n  };\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzLmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcz8yNzI5Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/helpers/spread.js\n");

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\n\n/*global toString:true*/\n\n// utils is a library of generic helper functions non-specific to axios\n\nvar toString = Object.prototype.toString;\n\n/**\n * Determine if a value is an Array\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Array, otherwise false\n */\nfunction isArray(val) {\n  return toString.call(val) === '[object Array]';\n}\n\n/**\n * Determine if a value is undefined\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if the value is undefined, otherwise false\n */\nfunction isUndefined(val) {\n  return typeof val === 'undefined';\n}\n\n/**\n * Determine if a value is a Buffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Buffer, otherwise false\n */\nfunction isBuffer(val) {\n  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)\n    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);\n}\n\n/**\n * Determine if a value is an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an ArrayBuffer, otherwise false\n */\nfunction isArrayBuffer(val) {\n  return toString.call(val) === '[object ArrayBuffer]';\n}\n\n/**\n * Determine if a value is a FormData\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an FormData, otherwise false\n */\nfunction isFormData(val) {\n  return (typeof FormData !== 'undefined') && (val instanceof FormData);\n}\n\n/**\n * Determine if a value is a view on an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false\n */\nfunction isArrayBufferView(val) {\n  var result;\n  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {\n    result = ArrayBuffer.isView(val);\n  } else {\n    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);\n  }\n  return result;\n}\n\n/**\n * Determine if a value is a String\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a String, otherwise false\n */\nfunction isString(val) {\n  return typeof val === 'string';\n}\n\n/**\n * Determine if a value is a Number\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Number, otherwise false\n */\nfunction isNumber(val) {\n  return typeof val === 'number';\n}\n\n/**\n * Determine if a value is an Object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Object, otherwise false\n */\nfunction isObject(val) {\n  return val !== null && typeof val === 'object';\n}\n\n/**\n * Determine if a value is a Date\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Date, otherwise false\n */\nfunction isDate(val) {\n  return toString.call(val) === '[object Date]';\n}\n\n/**\n * Determine if a value is a File\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a File, otherwise false\n */\nfunction isFile(val) {\n  return toString.call(val) === '[object File]';\n}\n\n/**\n * Determine if a value is a Blob\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Blob, otherwise false\n */\nfunction isBlob(val) {\n  return toString.call(val) === '[object Blob]';\n}\n\n/**\n * Determine if a value is a Function\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Function, otherwise false\n */\nfunction isFunction(val) {\n  return toString.call(val) === '[object Function]';\n}\n\n/**\n * Determine if a value is a Stream\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Stream, otherwise false\n */\nfunction isStream(val) {\n  return isObject(val) && isFunction(val.pipe);\n}\n\n/**\n * Determine if a value is a URLSearchParams object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a URLSearchParams object, otherwise false\n */\nfunction isURLSearchParams(val) {\n  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;\n}\n\n/**\n * Trim excess whitespace off the beginning and end of a string\n *\n * @param {String} str The String to trim\n * @returns {String} The String freed of excess whitespace\n */\nfunction trim(str) {\n  return str.replace(/^\\s*/, '').replace(/\\s*$/, '');\n}\n\n/**\n * Determine if we're running in a standard browser environment\n *\n * This allows axios to run in a web worker, and react-native.\n * Both environments support XMLHttpRequest, but not fully standard globals.\n *\n * web workers:\n *  typeof window -> undefined\n *  typeof document -> undefined\n *\n * react-native:\n *  navigator.product -> 'ReactNative'\n * nativescript\n *  navigator.product -> 'NativeScript' or 'NS'\n */\nfunction isStandardBrowserEnv() {\n  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||\n                                           navigator.product === 'NativeScript' ||\n                                           navigator.product === 'NS')) {\n    return false;\n  }\n  return (\n    typeof window !== 'undefined' &&\n    typeof document !== 'undefined'\n  );\n}\n\n/**\n * Iterate over an Array or an Object invoking a function for each item.\n *\n * If `obj` is an Array callback will be called passing\n * the value, index, and complete array for each item.\n *\n * If 'obj' is an Object callback will be called passing\n * the value, key, and complete object for each property.\n *\n * @param {Object|Array} obj The object to iterate\n * @param {Function} fn The callback to invoke for each item\n */\nfunction forEach(obj, fn) {\n  // Don't bother if no value provided\n  if (obj === null || typeof obj === 'undefined') {\n    return;\n  }\n\n  // Force an array if not already something iterable\n  if (typeof obj !== 'object') {\n    /*eslint no-param-reassign:0*/\n    obj = [obj];\n  }\n\n  if (isArray(obj)) {\n    // Iterate over array values\n    for (var i = 0, l = obj.length; i < l; i++) {\n      fn.call(null, obj[i], i, obj);\n    }\n  } else {\n    // Iterate over object keys\n    for (var key in obj) {\n      if (Object.prototype.hasOwnProperty.call(obj, key)) {\n        fn.call(null, obj[key], key, obj);\n      }\n    }\n  }\n}\n\n/**\n * Accepts varargs expecting each argument to be an object, then\n * immutably merges the properties of each object and returns result.\n *\n * When multiple objects contain the same key the later object in\n * the arguments list will take precedence.\n *\n * Example:\n *\n * ```js\n * var result = merge({foo: 123}, {foo: 456});\n * console.log(result.foo); // outputs 456\n * ```\n *\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\nfunction merge(/* obj1, obj2, obj3, ... */) {\n  var result = {};\n  function assignValue(val, key) {\n    if (typeof result[key] === 'object' && typeof val === 'object') {\n      result[key] = merge(result[key], val);\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n  return result;\n}\n\n/**\n * Function equal to merge with the difference being that no reference\n * to original objects is kept.\n *\n * @see merge\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\nfunction deepMerge(/* obj1, obj2, obj3, ... */) {\n  var result = {};\n  function assignValue(val, key) {\n    if (typeof result[key] === 'object' && typeof val === 'object') {\n      result[key] = deepMerge(result[key], val);\n    } else if (typeof val === 'object') {\n      result[key] = deepMerge({}, val);\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n  return result;\n}\n\n/**\n * Extends object a by mutably adding to it the properties of object b.\n *\n * @param {Object} a The object to be extended\n * @param {Object} b The object to copy properties from\n * @param {Object} thisArg The object to bind function to\n * @return {Object} The resulting value of object a\n */\nfunction extend(a, b, thisArg) {\n  forEach(b, function assignValue(val, key) {\n    if (thisArg && typeof val === 'function') {\n      a[key] = bind(val, thisArg);\n    } else {\n      a[key] = val;\n    }\n  });\n  return a;\n}\n\nmodule.exports = {\n  isArray: isArray,\n  isArrayBuffer: isArrayBuffer,\n  isBuffer: isBuffer,\n  isFormData: isFormData,\n  isArrayBufferView: isArrayBufferView,\n  isString: isString,\n  isNumber: isNumber,\n  isObject: isObject,\n  isUndefined: isUndefined,\n  isDate: isDate,\n  isFile: isFile,\n  isBlob: isBlob,\n  isFunction: isFunction,\n  isStream: isStream,\n  isURLSearchParams: isURLSearchParams,\n  isStandardBrowserEnv: isStandardBrowserEnv,\n  forEach: forEach,\n  merge: merge,\n  deepMerge: deepMerge,\n  extend: extend,\n  trim: trim\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzLmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLFdBQVcsbUJBQU8sQ0FBQyxnRUFBZ0I7O0FBRW5DOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsVUFBVTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0NBQW9DLE9BQU87QUFDM0M7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVMsR0FBRyxTQUFTO0FBQzVDLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxPQUFPO0FBQy9DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixnQ0FBZ0M7QUFDaEMsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsT0FBTztBQUMvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanM/YzllYiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxuICAgICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgKG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOUycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBGdW5jdGlvbiBlcXVhbCB0byBtZXJnZSB3aXRoIHRoZSBkaWZmZXJlbmNlIGJlaW5nIHRoYXQgbm8gcmVmZXJlbmNlXG4gKiB0byBvcmlnaW5hbCBvYmplY3RzIGlzIGtlcHQuXG4gKlxuICogQHNlZSBtZXJnZVxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gZGVlcE1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGRlZXBNZXJnZTogZGVlcE1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/axios/lib/utils.js\n");

/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! ./bootstrap */ \"./resources/js/bootstrap.js\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZXNvdXJjZXMvanMvYXBwLmpzLmpzIiwibWFwcGluZ3MiOiJBQUFBQSxtQkFBTyxDQUFDLGdEQUFELENBQVAiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwLmpzP2NlZDYiXSwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi9ib290c3RyYXAnKTsiXSwibmFtZXMiOlsicmVxdWlyZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./resources/js/app.js\n");

/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var laravel_echo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! laravel-echo */ \"./node_modules/laravel-echo/dist/echo.js\");\nwindow._ = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n\ntry {// window.Popper = require('popper.js').default;\n  // window.$ = window.jQuery = require('jquery');\n  // require('jquery-ui');\n  // require('../plugins/bootstrap/js/bootstrap.bundle');\n  // // require('./menu');\n  // require('moment');\n  // require('select2');\n  // require('datatables.net-bs4');\n  // require('datatables.net-select');\n  // require('tempusdominus-bootstrap-4');\n  // require('admin-lte');\n} catch (e) {}\n/**\r\n * We'll load the axios HTTP library which allows us to easily issue requests\r\n * to our Laravel back-end. This library automatically handles sending the\r\n * CSRF token as a header based on the value of the \"XSRF\" token cookie.\r\n */\n\n\nwindow.axios = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\nwindow.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';\n/**\r\n * Echo exposes an expressive API for subscribing to channels and listening\r\n * for events that are broadcast by Laravel. Echo and event broadcasting\r\n * allows your team to easily build robust real-time web applications.\r\n */\n\n\nwindow.Pusher = __webpack_require__(/*! pusher-js */ \"./node_modules/pusher-js/dist/web/pusher.js\");\nwindow.Echo = new laravel_echo__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  broadcaster: 'pusher',\n  key: \"local\",\n  cluster: \"ap1\",\n  wsPort: 6001,\n  forceTLS: false,\n  disableStats: true\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZXNvdXJjZXMvanMvYm9vdHN0cmFwLmpzLmpzIiwibWFwcGluZ3MiOiI7O0FBQUFBLE1BQU0sQ0FBQ0MsQ0FBUCxHQUFXQyxtQkFBTyxDQUFDLCtDQUFELENBQWxCOztBQUVBLElBQUksQ0FDQTtFQUNBO0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUVBO0FBR0gsQ0FoQkQsQ0FnQkUsT0FBT0MsQ0FBUCxFQUFVLENBQUU7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQUgsTUFBTSxDQUFDSSxLQUFQLEdBQWVGLG1CQUFPLENBQUMsNENBQUQsQ0FBdEI7QUFFQUYsTUFBTSxDQUFDSSxLQUFQLENBQWFDLFFBQWIsQ0FBc0JDLE9BQXRCLENBQThCQyxNQUE5QixDQUFxQyxrQkFBckMsSUFBMkQsZ0JBQTNEO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUVBUCxNQUFNLENBQUNTLE1BQVAsR0FBZ0JQLG1CQUFPLENBQUMsOERBQUQsQ0FBdkI7QUFFQUYsTUFBTSxDQUFDUSxJQUFQLEdBQWMsSUFBSUEsb0RBQUosQ0FBUztFQUNuQkUsV0FBVyxFQUFFLFFBRE07RUFFbkJDLEdBQUcsRUFBRUMsT0FGYztFQUduQkcsT0FBTyxFQUFFSCxLQUhVO0VBSW5CSyxNQUFNLEVBQUUsSUFKVztFQUtuQkMsUUFBUSxFQUFFLEtBTFM7RUFNbkJDLFlBQVksRUFBRTtBQU5LLENBQVQsQ0FBZCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9ib290c3RyYXAuanM/NmRlNyJdLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5cclxudHJ5IHtcclxuICAgIC8vIHdpbmRvdy5Qb3BwZXIgPSByZXF1aXJlKCdwb3BwZXIuanMnKS5kZWZhdWx0O1xyXG4gICAgLy8gd2luZG93LiQgPSB3aW5kb3cualF1ZXJ5ID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcblxyXG4gICAgLy8gcmVxdWlyZSgnanF1ZXJ5LXVpJyk7XHJcbiAgICAvLyByZXF1aXJlKCcuLi9wbHVnaW5zL2Jvb3RzdHJhcC9qcy9ib290c3RyYXAuYnVuZGxlJyk7XHJcbiAgICAvLyAvLyByZXF1aXJlKCcuL21lbnUnKTtcclxuICAgIC8vIHJlcXVpcmUoJ21vbWVudCcpO1xyXG4gICAgLy8gcmVxdWlyZSgnc2VsZWN0MicpO1xyXG4gICAgLy8gcmVxdWlyZSgnZGF0YXRhYmxlcy5uZXQtYnM0Jyk7XHJcbiAgICAvLyByZXF1aXJlKCdkYXRhdGFibGVzLm5ldC1zZWxlY3QnKTtcclxuICAgIC8vIHJlcXVpcmUoJ3RlbXB1c2RvbWludXMtYm9vdHN0cmFwLTQnKTtcclxuICAgIFxyXG4gICAgLy8gcmVxdWlyZSgnYWRtaW4tbHRlJyk7XHJcbiAgICBcclxuXHJcbn0gY2F0Y2ggKGUpIHt9XHJcblxyXG4vKipcclxuICogV2UnbGwgbG9hZCB0aGUgYXhpb3MgSFRUUCBsaWJyYXJ5IHdoaWNoIGFsbG93cyB1cyB0byBlYXNpbHkgaXNzdWUgcmVxdWVzdHNcclxuICogdG8gb3VyIExhcmF2ZWwgYmFjay1lbmQuIFRoaXMgbGlicmFyeSBhdXRvbWF0aWNhbGx5IGhhbmRsZXMgc2VuZGluZyB0aGVcclxuICogQ1NSRiB0b2tlbiBhcyBhIGhlYWRlciBiYXNlZCBvbiB0aGUgdmFsdWUgb2YgdGhlIFwiWFNSRlwiIHRva2VuIGNvb2tpZS5cclxuICovXHJcblxyXG53aW5kb3cuYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xyXG5cclxud2luZG93LmF4aW9zLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLVJlcXVlc3RlZC1XaXRoJ10gPSAnWE1MSHR0cFJlcXVlc3QnO1xyXG5cclxuLyoqXHJcbiAqIEVjaG8gZXhwb3NlcyBhbiBleHByZXNzaXZlIEFQSSBmb3Igc3Vic2NyaWJpbmcgdG8gY2hhbm5lbHMgYW5kIGxpc3RlbmluZ1xyXG4gKiBmb3IgZXZlbnRzIHRoYXQgYXJlIGJyb2FkY2FzdCBieSBMYXJhdmVsLiBFY2hvIGFuZCBldmVudCBicm9hZGNhc3RpbmdcclxuICogYWxsb3dzIHlvdXIgdGVhbSB0byBlYXNpbHkgYnVpbGQgcm9idXN0IHJlYWwtdGltZSB3ZWIgYXBwbGljYXRpb25zLlxyXG4gKi9cclxuXHJcbmltcG9ydCBFY2hvIGZyb20gJ2xhcmF2ZWwtZWNobyc7XHJcblxyXG53aW5kb3cuUHVzaGVyID0gcmVxdWlyZSgncHVzaGVyLWpzJyk7XHJcblxyXG53aW5kb3cuRWNobyA9IG5ldyBFY2hvKHtcclxuICAgIGJyb2FkY2FzdGVyOiAncHVzaGVyJyxcclxuICAgIGtleTogcHJvY2Vzcy5lbnYuTUlYX1BVU0hFUl9BUFBfS0VZLFxyXG4gICAgY2x1c3RlcjogcHJvY2Vzcy5lbnYuTUlYX1BVU0hFUl9BUFBfQ0xVU1RFUixcclxuICAgIHdzUG9ydDogNjAwMSxcclxuICAgIGZvcmNlVExTOiBmYWxzZSxcclxuICAgIGRpc2FibGVTdGF0czogdHJ1ZVxyXG59KTtcclxuIl0sIm5hbWVzIjpbIndpbmRvdyIsIl8iLCJyZXF1aXJlIiwiZSIsImF4aW9zIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwiY29tbW9uIiwiRWNobyIsIlB1c2hlciIsImJyb2FkY2FzdGVyIiwia2V5IiwicHJvY2VzcyIsImVudiIsIk1JWF9QVVNIRVJfQVBQX0tFWSIsImNsdXN0ZXIiLCJNSVhfUFVTSEVSX0FQUF9DTFVTVEVSIiwid3NQb3J0IiwiZm9yY2VUTFMiLCJkaXNhYmxlU3RhdHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./resources/js/bootstrap.js\n");

/***/ }),

/***/ "./node_modules/laravel-echo/dist/echo.js":
/*!************************************************!*\
  !*** ./node_modules/laravel-echo/dist/echo.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Channel\": () => (/* binding */ Channel),\n/* harmony export */   \"default\": () => (/* binding */ Echo)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nfunction _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  Object.defineProperty(Constructor, \"prototype\", {\n    writable: false\n  });\n  return Constructor;\n}\n\nfunction _extends() {\n  _extends = Object.assign || function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n\n    return target;\n  };\n\n  return _extends.apply(this, arguments);\n}\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  Object.defineProperty(subClass, \"prototype\", {\n    writable: false\n  });\n  if (superClass) _setPrototypeOf(subClass, superClass);\n}\n\nfunction _getPrototypeOf(o) {\n  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  return _getPrototypeOf(o);\n}\n\nfunction _setPrototypeOf(o, p) {\n  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  return _setPrototypeOf(o, p);\n}\n\nfunction _isNativeReflectConstruct() {\n  if (typeof Reflect === \"undefined\" || !Reflect.construct) return false;\n  if (Reflect.construct.sham) return false;\n  if (typeof Proxy === \"function\") return true;\n\n  try {\n    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));\n    return true;\n  } catch (e) {\n    return false;\n  }\n}\n\nfunction _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && (typeof call === \"object\" || typeof call === \"function\")) {\n    return call;\n  } else if (call !== void 0) {\n    throw new TypeError(\"Derived constructors may only return object or undefined\");\n  }\n\n  return _assertThisInitialized(self);\n}\n\nfunction _createSuper(Derived) {\n  var hasNativeReflectConstruct = _isNativeReflectConstruct();\n\n  return function _createSuperInternal() {\n    var Super = _getPrototypeOf(Derived),\n        result;\n\n    if (hasNativeReflectConstruct) {\n      var NewTarget = _getPrototypeOf(this).constructor;\n\n      result = Reflect.construct(Super, arguments, NewTarget);\n    } else {\n      result = Super.apply(this, arguments);\n    }\n\n    return _possibleConstructorReturn(this, result);\n  };\n}\n\n/**\r\n * This class represents a basic channel.\r\n */\nvar Channel = /*#__PURE__*/function () {\n  function Channel() {\n    _classCallCheck(this, Channel);\n  }\n\n  _createClass(Channel, [{\n    key: \"listenForWhisper\",\n    value:\n    /**\r\n     * Listen for a whisper event on the channel instance.\r\n     */\n    function listenForWhisper(event, callback) {\n      return this.listen('.client-' + event, callback);\n    }\n    /**\r\n     * Listen for an event on the channel instance.\r\n     */\n\n  }, {\n    key: \"notification\",\n    value: function notification(callback) {\n      return this.listen('.Illuminate\\\\Notifications\\\\Events\\\\BroadcastNotificationCreated', callback);\n    }\n    /**\r\n     * Stop listening for a whisper event on the channel instance.\r\n     */\n\n  }, {\n    key: \"stopListeningForWhisper\",\n    value: function stopListeningForWhisper(event, callback) {\n      return this.stopListening('.client-' + event, callback);\n    }\n  }]);\n\n  return Channel;\n}();\n\n/**\r\n * Event name formatter\r\n */\nvar EventFormatter = /*#__PURE__*/function () {\n  /**\r\n   * Create a new class instance.\r\n   */\n  function EventFormatter(namespace) {\n    _classCallCheck(this, EventFormatter);\n\n    this.setNamespace(namespace);\n  }\n  /**\r\n   * Format the given event name.\r\n   */\n\n\n  _createClass(EventFormatter, [{\n    key: \"format\",\n    value: function format(event) {\n      if (event.charAt(0) === '.' || event.charAt(0) === '\\\\') {\n        return event.substr(1);\n      } else if (this.namespace) {\n        event = this.namespace + '.' + event;\n      }\n\n      return event.replace(/\\./g, '\\\\');\n    }\n    /**\r\n     * Set the event namespace.\r\n     */\n\n  }, {\n    key: \"setNamespace\",\n    value: function setNamespace(value) {\n      this.namespace = value;\n    }\n  }]);\n\n  return EventFormatter;\n}();\n\n/**\r\n * This class represents a Pusher channel.\r\n */\n\nvar PusherChannel = /*#__PURE__*/function (_Channel) {\n  _inherits(PusherChannel, _Channel);\n\n  var _super = _createSuper(PusherChannel);\n\n  /**\r\n   * Create a new class instance.\r\n   */\n  function PusherChannel(pusher, name, options) {\n    var _this;\n\n    _classCallCheck(this, PusherChannel);\n\n    _this = _super.call(this);\n    _this.name = name;\n    _this.pusher = pusher;\n    _this.options = options;\n    _this.eventFormatter = new EventFormatter(_this.options.namespace);\n\n    _this.subscribe();\n\n    return _this;\n  }\n  /**\r\n   * Subscribe to a Pusher channel.\r\n   */\n\n\n  _createClass(PusherChannel, [{\n    key: \"subscribe\",\n    value: function subscribe() {\n      this.subscription = this.pusher.subscribe(this.name);\n    }\n    /**\r\n     * Unsubscribe from a Pusher channel.\r\n     */\n\n  }, {\n    key: \"unsubscribe\",\n    value: function unsubscribe() {\n      this.pusher.unsubscribe(this.name);\n    }\n    /**\r\n     * Listen for an event on the channel instance.\r\n     */\n\n  }, {\n    key: \"listen\",\n    value: function listen(event, callback) {\n      this.on(this.eventFormatter.format(event), callback);\n      return this;\n    }\n    /**\r\n     * Listen for all events on the channel instance.\r\n     */\n\n  }, {\n    key: \"listenToAll\",\n    value: function listenToAll(callback) {\n      var _this2 = this;\n\n      this.subscription.bind_global(function (event, data) {\n        if (event.startsWith('pusher:')) {\n          return;\n        }\n\n        var namespace = _this2.options.namespace.replace(/\\./g, '\\\\');\n\n        var formattedEvent = event.startsWith(namespace) ? event.substring(namespace.length + 1) : '.' + event;\n        callback(formattedEvent, data);\n      });\n      return this;\n    }\n    /**\r\n     * Stop listening for an event on the channel instance.\r\n     */\n\n  }, {\n    key: \"stopListening\",\n    value: function stopListening(event, callback) {\n      if (callback) {\n        this.subscription.unbind(this.eventFormatter.format(event), callback);\n      } else {\n        this.subscription.unbind(this.eventFormatter.format(event));\n      }\n\n      return this;\n    }\n    /**\r\n     * Stop listening for all events on the channel instance.\r\n     */\n\n  }, {\n    key: \"stopListeningToAll\",\n    value: function stopListeningToAll(callback) {\n      if (callback) {\n        this.subscription.unbind_global(callback);\n      } else {\n        this.subscription.unbind_global();\n      }\n\n      return this;\n    }\n    /**\r\n     * Register a callback to be called anytime a subscription succeeds.\r\n     */\n\n  }, {\n    key: \"subscribed\",\n    value: function subscribed(callback) {\n      this.on('pusher:subscription_succeeded', function () {\n        callback();\n      });\n      return this;\n    }\n    /**\r\n     * Register a callback to be called anytime a subscription error occurs.\r\n     */\n\n  }, {\n    key: \"error\",\n    value: function error(callback) {\n      this.on('pusher:subscription_error', function (status) {\n        callback(status);\n      });\n      return this;\n    }\n    /**\r\n     * Bind a channel to an event.\r\n     */\n\n  }, {\n    key: \"on\",\n    value: function on(event, callback) {\n      this.subscription.bind(event, callback);\n      return this;\n    }\n  }]);\n\n  return PusherChannel;\n}(Channel);\n\n/**\r\n * This class represents a Pusher private channel.\r\n */\n\nvar PusherPrivateChannel = /*#__PURE__*/function (_PusherChannel) {\n  _inherits(PusherPrivateChannel, _PusherChannel);\n\n  var _super = _createSuper(PusherPrivateChannel);\n\n  function PusherPrivateChannel() {\n    _classCallCheck(this, PusherPrivateChannel);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(PusherPrivateChannel, [{\n    key: \"whisper\",\n    value:\n    /**\r\n     * Trigger client event on the channel.\r\n     */\n    function whisper(eventName, data) {\n      this.pusher.channels.channels[this.name].trigger(\"client-\".concat(eventName), data);\n      return this;\n    }\n  }]);\n\n  return PusherPrivateChannel;\n}(PusherChannel);\n\n/**\r\n * This class represents a Pusher private channel.\r\n */\n\nvar PusherEncryptedPrivateChannel = /*#__PURE__*/function (_PusherChannel) {\n  _inherits(PusherEncryptedPrivateChannel, _PusherChannel);\n\n  var _super = _createSuper(PusherEncryptedPrivateChannel);\n\n  function PusherEncryptedPrivateChannel() {\n    _classCallCheck(this, PusherEncryptedPrivateChannel);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(PusherEncryptedPrivateChannel, [{\n    key: \"whisper\",\n    value:\n    /**\r\n     * Trigger client event on the channel.\r\n     */\n    function whisper(eventName, data) {\n      this.pusher.channels.channels[this.name].trigger(\"client-\".concat(eventName), data);\n      return this;\n    }\n  }]);\n\n  return PusherEncryptedPrivateChannel;\n}(PusherChannel);\n\n/**\r\n * This class represents a Pusher presence channel.\r\n */\n\nvar PusherPresenceChannel = /*#__PURE__*/function (_PusherChannel) {\n  _inherits(PusherPresenceChannel, _PusherChannel);\n\n  var _super = _createSuper(PusherPresenceChannel);\n\n  function PusherPresenceChannel() {\n    _classCallCheck(this, PusherPresenceChannel);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(PusherPresenceChannel, [{\n    key: \"here\",\n    value:\n    /**\r\n     * Register a callback to be called anytime the member list changes.\r\n     */\n    function here(callback) {\n      this.on('pusher:subscription_succeeded', function (data) {\n        callback(Object.keys(data.members).map(function (k) {\n          return data.members[k];\n        }));\n      });\n      return this;\n    }\n    /**\r\n     * Listen for someone joining the channel.\r\n     */\n\n  }, {\n    key: \"joining\",\n    value: function joining(callback) {\n      this.on('pusher:member_added', function (member) {\n        callback(member.info);\n      });\n      return this;\n    }\n    /**\r\n     * Listen for someone leaving the channel.\r\n     */\n\n  }, {\n    key: \"leaving\",\n    value: function leaving(callback) {\n      this.on('pusher:member_removed', function (member) {\n        callback(member.info);\n      });\n      return this;\n    }\n    /**\r\n     * Trigger client event on the channel.\r\n     */\n\n  }, {\n    key: \"whisper\",\n    value: function whisper(eventName, data) {\n      this.pusher.channels.channels[this.name].trigger(\"client-\".concat(eventName), data);\n      return this;\n    }\n  }]);\n\n  return PusherPresenceChannel;\n}(PusherChannel);\n\n/**\r\n * This class represents a Socket.io channel.\r\n */\n\nvar SocketIoChannel = /*#__PURE__*/function (_Channel) {\n  _inherits(SocketIoChannel, _Channel);\n\n  var _super = _createSuper(SocketIoChannel);\n\n  /**\r\n   * Create a new class instance.\r\n   */\n  function SocketIoChannel(socket, name, options) {\n    var _this;\n\n    _classCallCheck(this, SocketIoChannel);\n\n    _this = _super.call(this);\n    /**\r\n     * The event callbacks applied to the socket.\r\n     */\n\n    _this.events = {};\n    /**\r\n     * User supplied callbacks for events on this channel.\r\n     */\n\n    _this.listeners = {};\n    _this.name = name;\n    _this.socket = socket;\n    _this.options = options;\n    _this.eventFormatter = new EventFormatter(_this.options.namespace);\n\n    _this.subscribe();\n\n    return _this;\n  }\n  /**\r\n   * Subscribe to a Socket.io channel.\r\n   */\n\n\n  _createClass(SocketIoChannel, [{\n    key: \"subscribe\",\n    value: function subscribe() {\n      this.socket.emit('subscribe', {\n        channel: this.name,\n        auth: this.options.auth || {}\n      });\n    }\n    /**\r\n     * Unsubscribe from channel and ubind event callbacks.\r\n     */\n\n  }, {\n    key: \"unsubscribe\",\n    value: function unsubscribe() {\n      this.unbind();\n      this.socket.emit('unsubscribe', {\n        channel: this.name,\n        auth: this.options.auth || {}\n      });\n    }\n    /**\r\n     * Listen for an event on the channel instance.\r\n     */\n\n  }, {\n    key: \"listen\",\n    value: function listen(event, callback) {\n      this.on(this.eventFormatter.format(event), callback);\n      return this;\n    }\n    /**\r\n     * Stop listening for an event on the channel instance.\r\n     */\n\n  }, {\n    key: \"stopListening\",\n    value: function stopListening(event, callback) {\n      this.unbindEvent(this.eventFormatter.format(event), callback);\n      return this;\n    }\n    /**\r\n     * Register a callback to be called anytime a subscription succeeds.\r\n     */\n\n  }, {\n    key: \"subscribed\",\n    value: function subscribed(callback) {\n      this.on('connect', function (socket) {\n        callback(socket);\n      });\n      return this;\n    }\n    /**\r\n     * Register a callback to be called anytime an error occurs.\r\n     */\n\n  }, {\n    key: \"error\",\n    value: function error(callback) {\n      return this;\n    }\n    /**\r\n     * Bind the channel's socket to an event and store the callback.\r\n     */\n\n  }, {\n    key: \"on\",\n    value: function on(event, callback) {\n      var _this2 = this;\n\n      this.listeners[event] = this.listeners[event] || [];\n\n      if (!this.events[event]) {\n        this.events[event] = function (channel, data) {\n          if (_this2.name === channel && _this2.listeners[event]) {\n            _this2.listeners[event].forEach(function (cb) {\n              return cb(data);\n            });\n          }\n        };\n\n        this.socket.on(event, this.events[event]);\n      }\n\n      this.listeners[event].push(callback);\n      return this;\n    }\n    /**\r\n     * Unbind the channel's socket from all stored event callbacks.\r\n     */\n\n  }, {\n    key: \"unbind\",\n    value: function unbind() {\n      var _this3 = this;\n\n      Object.keys(this.events).forEach(function (event) {\n        _this3.unbindEvent(event);\n      });\n    }\n    /**\r\n     * Unbind the listeners for the given event.\r\n     */\n\n  }, {\n    key: \"unbindEvent\",\n    value: function unbindEvent(event, callback) {\n      this.listeners[event] = this.listeners[event] || [];\n\n      if (callback) {\n        this.listeners[event] = this.listeners[event].filter(function (cb) {\n          return cb !== callback;\n        });\n      }\n\n      if (!callback || this.listeners[event].length === 0) {\n        if (this.events[event]) {\n          this.socket.removeListener(event, this.events[event]);\n          delete this.events[event];\n        }\n\n        delete this.listeners[event];\n      }\n    }\n  }]);\n\n  return SocketIoChannel;\n}(Channel);\n\n/**\r\n * This class represents a Socket.io private channel.\r\n */\n\nvar SocketIoPrivateChannel = /*#__PURE__*/function (_SocketIoChannel) {\n  _inherits(SocketIoPrivateChannel, _SocketIoChannel);\n\n  var _super = _createSuper(SocketIoPrivateChannel);\n\n  function SocketIoPrivateChannel() {\n    _classCallCheck(this, SocketIoPrivateChannel);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(SocketIoPrivateChannel, [{\n    key: \"whisper\",\n    value:\n    /**\r\n     * Trigger client event on the channel.\r\n     */\n    function whisper(eventName, data) {\n      this.socket.emit('client event', {\n        channel: this.name,\n        event: \"client-\".concat(eventName),\n        data: data\n      });\n      return this;\n    }\n  }]);\n\n  return SocketIoPrivateChannel;\n}(SocketIoChannel);\n\n/**\r\n * This class represents a Socket.io presence channel.\r\n */\n\nvar SocketIoPresenceChannel = /*#__PURE__*/function (_SocketIoPrivateChann) {\n  _inherits(SocketIoPresenceChannel, _SocketIoPrivateChann);\n\n  var _super = _createSuper(SocketIoPresenceChannel);\n\n  function SocketIoPresenceChannel() {\n    _classCallCheck(this, SocketIoPresenceChannel);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(SocketIoPresenceChannel, [{\n    key: \"here\",\n    value:\n    /**\r\n     * Register a callback to be called anytime the member list changes.\r\n     */\n    function here(callback) {\n      this.on('presence:subscribed', function (members) {\n        callback(members.map(function (m) {\n          return m.user_info;\n        }));\n      });\n      return this;\n    }\n    /**\r\n     * Listen for someone joining the channel.\r\n     */\n\n  }, {\n    key: \"joining\",\n    value: function joining(callback) {\n      this.on('presence:joining', function (member) {\n        return callback(member.user_info);\n      });\n      return this;\n    }\n    /**\r\n     * Listen for someone leaving the channel.\r\n     */\n\n  }, {\n    key: \"leaving\",\n    value: function leaving(callback) {\n      this.on('presence:leaving', function (member) {\n        return callback(member.user_info);\n      });\n      return this;\n    }\n  }]);\n\n  return SocketIoPresenceChannel;\n}(SocketIoPrivateChannel);\n\n/**\r\n * This class represents a null channel.\r\n */\n\nvar NullChannel = /*#__PURE__*/function (_Channel) {\n  _inherits(NullChannel, _Channel);\n\n  var _super = _createSuper(NullChannel);\n\n  function NullChannel() {\n    _classCallCheck(this, NullChannel);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(NullChannel, [{\n    key: \"subscribe\",\n    value:\n    /**\r\n     * Subscribe to a channel.\r\n     */\n    function subscribe() {//\n    }\n    /**\r\n     * Unsubscribe from a channel.\r\n     */\n\n  }, {\n    key: \"unsubscribe\",\n    value: function unsubscribe() {//\n    }\n    /**\r\n     * Listen for an event on the channel instance.\r\n     */\n\n  }, {\n    key: \"listen\",\n    value: function listen(event, callback) {\n      return this;\n    }\n    /**\r\n     * Stop listening for an event on the channel instance.\r\n     */\n\n  }, {\n    key: \"stopListening\",\n    value: function stopListening(event, callback) {\n      return this;\n    }\n    /**\r\n     * Register a callback to be called anytime a subscription succeeds.\r\n     */\n\n  }, {\n    key: \"subscribed\",\n    value: function subscribed(callback) {\n      return this;\n    }\n    /**\r\n     * Register a callback to be called anytime an error occurs.\r\n     */\n\n  }, {\n    key: \"error\",\n    value: function error(callback) {\n      return this;\n    }\n    /**\r\n     * Bind a channel to an event.\r\n     */\n\n  }, {\n    key: \"on\",\n    value: function on(event, callback) {\n      return this;\n    }\n  }]);\n\n  return NullChannel;\n}(Channel);\n\n/**\r\n * This class represents a null private channel.\r\n */\n\nvar NullPrivateChannel = /*#__PURE__*/function (_NullChannel) {\n  _inherits(NullPrivateChannel, _NullChannel);\n\n  var _super = _createSuper(NullPrivateChannel);\n\n  function NullPrivateChannel() {\n    _classCallCheck(this, NullPrivateChannel);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(NullPrivateChannel, [{\n    key: \"whisper\",\n    value:\n    /**\r\n     * Trigger client event on the channel.\r\n     */\n    function whisper(eventName, data) {\n      return this;\n    }\n  }]);\n\n  return NullPrivateChannel;\n}(NullChannel);\n\n/**\r\n * This class represents a null presence channel.\r\n */\n\nvar NullPresenceChannel = /*#__PURE__*/function (_NullChannel) {\n  _inherits(NullPresenceChannel, _NullChannel);\n\n  var _super = _createSuper(NullPresenceChannel);\n\n  function NullPresenceChannel() {\n    _classCallCheck(this, NullPresenceChannel);\n\n    return _super.apply(this, arguments);\n  }\n\n  _createClass(NullPresenceChannel, [{\n    key: \"here\",\n    value:\n    /**\r\n     * Register a callback to be called anytime the member list changes.\r\n     */\n    function here(callback) {\n      return this;\n    }\n    /**\r\n     * Listen for someone joining the channel.\r\n     */\n\n  }, {\n    key: \"joining\",\n    value: function joining(callback) {\n      return this;\n    }\n    /**\r\n     * Listen for someone leaving the channel.\r\n     */\n\n  }, {\n    key: \"leaving\",\n    value: function leaving(callback) {\n      return this;\n    }\n    /**\r\n     * Trigger client event on the channel.\r\n     */\n\n  }, {\n    key: \"whisper\",\n    value: function whisper(eventName, data) {\n      return this;\n    }\n  }]);\n\n  return NullPresenceChannel;\n}(NullChannel);\n\nvar Connector = /*#__PURE__*/function () {\n  /**\r\n   * Create a new class instance.\r\n   */\n  function Connector(options) {\n    _classCallCheck(this, Connector);\n\n    /**\r\n     * Default connector options.\r\n     */\n    this._defaultOptions = {\n      auth: {\n        headers: {}\n      },\n      authEndpoint: '/broadcasting/auth',\n      userAuthentication: {\n        endpoint: '/broadcasting/user-auth',\n        headers: {}\n      },\n      broadcaster: 'pusher',\n      csrfToken: null,\n      host: null,\n      key: null,\n      namespace: 'App.Events'\n    };\n    this.setOptions(options);\n    this.connect();\n  }\n  /**\r\n   * Merge the custom options with the defaults.\r\n   */\n\n\n  _createClass(Connector, [{\n    key: \"setOptions\",\n    value: function setOptions(options) {\n      this.options = _extends(this._defaultOptions, options);\n      var token = this.csrfToken();\n\n      if (token) {\n        this.options.auth.headers['X-CSRF-TOKEN'] = token;\n        this.options.userAuthentication.headers['X-CSRF-TOKEN'] = token;\n      }\n\n      return options;\n    }\n    /**\r\n     * Extract the CSRF token from the page.\r\n     */\n\n  }, {\n    key: \"csrfToken\",\n    value: function csrfToken() {\n      var selector;\n\n      if (typeof window !== 'undefined' && window['Laravel'] && window['Laravel'].csrfToken) {\n        return window['Laravel'].csrfToken;\n      } else if (this.options.csrfToken) {\n        return this.options.csrfToken;\n      } else if (typeof document !== 'undefined' && typeof document.querySelector === 'function' && (selector = document.querySelector('meta[name=\"csrf-token\"]'))) {\n        return selector.getAttribute('content');\n      }\n\n      return null;\n    }\n  }]);\n\n  return Connector;\n}();\n\n/**\r\n * This class creates a connector to Pusher.\r\n */\n\nvar PusherConnector = /*#__PURE__*/function (_Connector) {\n  _inherits(PusherConnector, _Connector);\n\n  var _super = _createSuper(PusherConnector);\n\n  function PusherConnector() {\n    var _this;\n\n    _classCallCheck(this, PusherConnector);\n\n    _this = _super.apply(this, arguments);\n    /**\r\n     * All of the subscribed channel names.\r\n     */\n\n    _this.channels = {};\n    return _this;\n  }\n  /**\r\n   * Create a fresh Pusher connection.\r\n   */\n\n\n  _createClass(PusherConnector, [{\n    key: \"connect\",\n    value: function connect() {\n      if (typeof this.options.client !== 'undefined') {\n        this.pusher = this.options.client;\n      } else {\n        this.pusher = new Pusher(this.options.key, this.options);\n      }\n    }\n    /**\r\n     * Sign in the user via Pusher user authentication (https://pusher.com/docs/channels/using_channels/user-authentication/).\r\n     */\n\n  }, {\n    key: \"signin\",\n    value: function signin() {\n      this.pusher.signin();\n    }\n    /**\r\n     * Listen for an event on a channel instance.\r\n     */\n\n  }, {\n    key: \"listen\",\n    value: function listen(name, event, callback) {\n      return this.channel(name).listen(event, callback);\n    }\n    /**\r\n     * Get a channel instance by name.\r\n     */\n\n  }, {\n    key: \"channel\",\n    value: function channel(name) {\n      if (!this.channels[name]) {\n        this.channels[name] = new PusherChannel(this.pusher, name, this.options);\n      }\n\n      return this.channels[name];\n    }\n    /**\r\n     * Get a private channel instance by name.\r\n     */\n\n  }, {\n    key: \"privateChannel\",\n    value: function privateChannel(name) {\n      if (!this.channels['private-' + name]) {\n        this.channels['private-' + name] = new PusherPrivateChannel(this.pusher, 'private-' + name, this.options);\n      }\n\n      return this.channels['private-' + name];\n    }\n    /**\r\n     * Get a private encrypted channel instance by name.\r\n     */\n\n  }, {\n    key: \"encryptedPrivateChannel\",\n    value: function encryptedPrivateChannel(name) {\n      if (!this.channels['private-encrypted-' + name]) {\n        this.channels['private-encrypted-' + name] = new PusherEncryptedPrivateChannel(this.pusher, 'private-encrypted-' + name, this.options);\n      }\n\n      return this.channels['private-encrypted-' + name];\n    }\n    /**\r\n     * Get a presence channel instance by name.\r\n     */\n\n  }, {\n    key: \"presenceChannel\",\n    value: function presenceChannel(name) {\n      if (!this.channels['presence-' + name]) {\n        this.channels['presence-' + name] = new PusherPresenceChannel(this.pusher, 'presence-' + name, this.options);\n      }\n\n      return this.channels['presence-' + name];\n    }\n    /**\r\n     * Leave the given channel, as well as its private and presence variants.\r\n     */\n\n  }, {\n    key: \"leave\",\n    value: function leave(name) {\n      var _this2 = this;\n\n      var channels = [name, 'private-' + name, 'presence-' + name];\n      channels.forEach(function (name, index) {\n        _this2.leaveChannel(name);\n      });\n    }\n    /**\r\n     * Leave the given channel.\r\n     */\n\n  }, {\n    key: \"leaveChannel\",\n    value: function leaveChannel(name) {\n      if (this.channels[name]) {\n        this.channels[name].unsubscribe();\n        delete this.channels[name];\n      }\n    }\n    /**\r\n     * Get the socket ID for the connection.\r\n     */\n\n  }, {\n    key: \"socketId\",\n    value: function socketId() {\n      return this.pusher.connection.socket_id;\n    }\n    /**\r\n     * Disconnect Pusher connection.\r\n     */\n\n  }, {\n    key: \"disconnect\",\n    value: function disconnect() {\n      this.pusher.disconnect();\n    }\n  }]);\n\n  return PusherConnector;\n}(Connector);\n\n/**\r\n * This class creates a connnector to a Socket.io server.\r\n */\n\nvar SocketIoConnector = /*#__PURE__*/function (_Connector) {\n  _inherits(SocketIoConnector, _Connector);\n\n  var _super = _createSuper(SocketIoConnector);\n\n  function SocketIoConnector() {\n    var _this;\n\n    _classCallCheck(this, SocketIoConnector);\n\n    _this = _super.apply(this, arguments);\n    /**\r\n     * All of the subscribed channel names.\r\n     */\n\n    _this.channels = {};\n    return _this;\n  }\n  /**\r\n   * Create a fresh Socket.io connection.\r\n   */\n\n\n  _createClass(SocketIoConnector, [{\n    key: \"connect\",\n    value: function connect() {\n      var _this2 = this;\n\n      var io = this.getSocketIO();\n      this.socket = io(this.options.host, this.options);\n      this.socket.on('reconnect', function () {\n        Object.values(_this2.channels).forEach(function (channel) {\n          channel.subscribe();\n        });\n      });\n      return this.socket;\n    }\n    /**\r\n     * Get socket.io module from global scope or options.\r\n     */\n\n  }, {\n    key: \"getSocketIO\",\n    value: function getSocketIO() {\n      if (typeof this.options.client !== 'undefined') {\n        return this.options.client;\n      }\n\n      if (typeof io !== 'undefined') {\n        return io;\n      }\n\n      throw new Error('Socket.io client not found. Should be globally available or passed via options.client');\n    }\n    /**\r\n     * Listen for an event on a channel instance.\r\n     */\n\n  }, {\n    key: \"listen\",\n    value: function listen(name, event, callback) {\n      return this.channel(name).listen(event, callback);\n    }\n    /**\r\n     * Get a channel instance by name.\r\n     */\n\n  }, {\n    key: \"channel\",\n    value: function channel(name) {\n      if (!this.channels[name]) {\n        this.channels[name] = new SocketIoChannel(this.socket, name, this.options);\n      }\n\n      return this.channels[name];\n    }\n    /**\r\n     * Get a private channel instance by name.\r\n     */\n\n  }, {\n    key: \"privateChannel\",\n    value: function privateChannel(name) {\n      if (!this.channels['private-' + name]) {\n        this.channels['private-' + name] = new SocketIoPrivateChannel(this.socket, 'private-' + name, this.options);\n      }\n\n      return this.channels['private-' + name];\n    }\n    /**\r\n     * Get a presence channel instance by name.\r\n     */\n\n  }, {\n    key: \"presenceChannel\",\n    value: function presenceChannel(name) {\n      if (!this.channels['presence-' + name]) {\n        this.channels['presence-' + name] = new SocketIoPresenceChannel(this.socket, 'presence-' + name, this.options);\n      }\n\n      return this.channels['presence-' + name];\n    }\n    /**\r\n     * Leave the given channel, as well as its private and presence variants.\r\n     */\n\n  }, {\n    key: \"leave\",\n    value: function leave(name) {\n      var _this3 = this;\n\n      var channels = [name, 'private-' + name, 'presence-' + name];\n      channels.forEach(function (name) {\n        _this3.leaveChannel(name);\n      });\n    }\n    /**\r\n     * Leave the given channel.\r\n     */\n\n  }, {\n    key: \"leaveChannel\",\n    value: function leaveChannel(name) {\n      if (this.channels[name]) {\n        this.channels[name].unsubscribe();\n        delete this.channels[name];\n      }\n    }\n    /**\r\n     * Get the socket ID for the connection.\r\n     */\n\n  }, {\n    key: \"socketId\",\n    value: function socketId() {\n      return this.socket.id;\n    }\n    /**\r\n     * Disconnect Socketio connection.\r\n     */\n\n  }, {\n    key: \"disconnect\",\n    value: function disconnect() {\n      this.socket.disconnect();\n    }\n  }]);\n\n  return SocketIoConnector;\n}(Connector);\n\n/**\r\n * This class creates a null connector.\r\n */\n\nvar NullConnector = /*#__PURE__*/function (_Connector) {\n  _inherits(NullConnector, _Connector);\n\n  var _super = _createSuper(NullConnector);\n\n  function NullConnector() {\n    var _this;\n\n    _classCallCheck(this, NullConnector);\n\n    _this = _super.apply(this, arguments);\n    /**\r\n     * All of the subscribed channel names.\r\n     */\n\n    _this.channels = {};\n    return _this;\n  }\n  /**\r\n   * Create a fresh connection.\r\n   */\n\n\n  _createClass(NullConnector, [{\n    key: \"connect\",\n    value: function connect() {//\n    }\n    /**\r\n     * Listen for an event on a channel instance.\r\n     */\n\n  }, {\n    key: \"listen\",\n    value: function listen(name, event, callback) {\n      return new NullChannel();\n    }\n    /**\r\n     * Get a channel instance by name.\r\n     */\n\n  }, {\n    key: \"channel\",\n    value: function channel(name) {\n      return new NullChannel();\n    }\n    /**\r\n     * Get a private channel instance by name.\r\n     */\n\n  }, {\n    key: \"privateChannel\",\n    value: function privateChannel(name) {\n      return new NullPrivateChannel();\n    }\n    /**\r\n     * Get a presence channel instance by name.\r\n     */\n\n  }, {\n    key: \"presenceChannel\",\n    value: function presenceChannel(name) {\n      return new NullPresenceChannel();\n    }\n    /**\r\n     * Leave the given channel, as well as its private and presence variants.\r\n     */\n\n  }, {\n    key: \"leave\",\n    value: function leave(name) {//\n    }\n    /**\r\n     * Leave the given channel.\r\n     */\n\n  }, {\n    key: \"leaveChannel\",\n    value: function leaveChannel(name) {//\n    }\n    /**\r\n     * Get the socket ID for the connection.\r\n     */\n\n  }, {\n    key: \"socketId\",\n    value: function socketId() {\n      return 'fake-socket-id';\n    }\n    /**\r\n     * Disconnect the connection.\r\n     */\n\n  }, {\n    key: \"disconnect\",\n    value: function disconnect() {//\n    }\n  }]);\n\n  return NullConnector;\n}(Connector);\n\n/**\r\n * This class is the primary API for interacting with broadcasting.\r\n */\n\nvar Echo = /*#__PURE__*/function () {\n  /**\r\n   * Create a new class instance.\r\n   */\n  function Echo(options) {\n    _classCallCheck(this, Echo);\n\n    this.options = options;\n    this.connect();\n\n    if (!this.options.withoutInterceptors) {\n      this.registerInterceptors();\n    }\n  }\n  /**\r\n   * Get a channel instance by name.\r\n   */\n\n\n  _createClass(Echo, [{\n    key: \"channel\",\n    value: function channel(_channel) {\n      return this.connector.channel(_channel);\n    }\n    /**\r\n     * Create a new connection.\r\n     */\n\n  }, {\n    key: \"connect\",\n    value: function connect() {\n      if (this.options.broadcaster == 'pusher') {\n        this.connector = new PusherConnector(this.options);\n      } else if (this.options.broadcaster == 'socket.io') {\n        this.connector = new SocketIoConnector(this.options);\n      } else if (this.options.broadcaster == 'null') {\n        this.connector = new NullConnector(this.options);\n      } else if (typeof this.options.broadcaster == 'function') {\n        this.connector = new this.options.broadcaster(this.options);\n      }\n    }\n    /**\r\n     * Disconnect from the Echo server.\r\n     */\n\n  }, {\n    key: \"disconnect\",\n    value: function disconnect() {\n      this.connector.disconnect();\n    }\n    /**\r\n     * Get a presence channel instance by name.\r\n     */\n\n  }, {\n    key: \"join\",\n    value: function join(channel) {\n      return this.connector.presenceChannel(channel);\n    }\n    /**\r\n     * Leave the given channel, as well as its private and presence variants.\r\n     */\n\n  }, {\n    key: \"leave\",\n    value: function leave(channel) {\n      this.connector.leave(channel);\n    }\n    /**\r\n     * Leave the given channel.\r\n     */\n\n  }, {\n    key: \"leaveChannel\",\n    value: function leaveChannel(channel) {\n      this.connector.leaveChannel(channel);\n    }\n    /**\r\n     * Listen for an event on a channel instance.\r\n     */\n\n  }, {\n    key: \"listen\",\n    value: function listen(channel, event, callback) {\n      return this.connector.listen(channel, event, callback);\n    }\n    /**\r\n     * Get a private channel instance by name.\r\n     */\n\n  }, {\n    key: \"private\",\n    value: function _private(channel) {\n      return this.connector.privateChannel(channel);\n    }\n    /**\r\n     * Get a private encrypted channel instance by name.\r\n     */\n\n  }, {\n    key: \"encryptedPrivate\",\n    value: function encryptedPrivate(channel) {\n      return this.connector.encryptedPrivateChannel(channel);\n    }\n    /**\r\n     * Get the Socket ID for the connection.\r\n     */\n\n  }, {\n    key: \"socketId\",\n    value: function socketId() {\n      return this.connector.socketId();\n    }\n    /**\r\n     * Register 3rd party request interceptiors. These are used to automatically\r\n     * send a connections socket id to a Laravel app with a X-Socket-Id header.\r\n     */\n\n  }, {\n    key: \"registerInterceptors\",\n    value: function registerInterceptors() {\n      if (typeof Vue === 'function' && Vue.http) {\n        this.registerVueRequestInterceptor();\n      }\n\n      if (typeof axios === 'function') {\n        this.registerAxiosRequestInterceptor();\n      }\n\n      if (typeof jQuery === 'function') {\n        this.registerjQueryAjaxSetup();\n      }\n    }\n    /**\r\n     * Register a Vue HTTP interceptor to add the X-Socket-ID header.\r\n     */\n\n  }, {\n    key: \"registerVueRequestInterceptor\",\n    value: function registerVueRequestInterceptor() {\n      var _this = this;\n\n      Vue.http.interceptors.push(function (request, next) {\n        if (_this.socketId()) {\n          request.headers.set('X-Socket-ID', _this.socketId());\n        }\n\n        next();\n      });\n    }\n    /**\r\n     * Register an Axios HTTP interceptor to add the X-Socket-ID header.\r\n     */\n\n  }, {\n    key: \"registerAxiosRequestInterceptor\",\n    value: function registerAxiosRequestInterceptor() {\n      var _this2 = this;\n\n      axios.interceptors.request.use(function (config) {\n        if (_this2.socketId()) {\n          config.headers['X-Socket-Id'] = _this2.socketId();\n        }\n\n        return config;\n      });\n    }\n    /**\r\n     * Register jQuery AjaxPrefilter to add the X-Socket-ID header.\r\n     */\n\n  }, {\n    key: \"registerjQueryAjaxSetup\",\n    value: function registerjQueryAjaxSetup() {\n      var _this3 = this;\n\n      if (typeof jQuery.ajax != 'undefined') {\n        jQuery.ajaxPrefilter(function (options, originalOptions, xhr) {\n          if (_this3.socketId()) {\n            xhr.setRequestHeader('X-Socket-Id', _this3.socketId());\n          }\n        });\n      }\n    }\n  }]);\n\n  return Echo;\n}();\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbGFyYXZlbC1lY2hvL2Rpc3QvZWNoby5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0Isa0JBQWtCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdGQUFnRjtBQUNoRjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQzs7QUFFbUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGFyYXZlbC1lY2hvL2Rpc3QvZWNoby5qcz8wN2NmIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwge1xuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5mdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdWJDbGFzcywgXCJwcm90b3R5cGVcIiwge1xuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbmZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gIF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTtcbiAgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTtcblxuICB0cnkge1xuICAgIEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2YuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChCb29sZWFuLCBbXSwgZnVuY3Rpb24gKCkge30pKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgIHJldHVybiBjYWxsO1xuICB9IGVsc2UgaWYgKGNhbGwgIT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJEZXJpdmVkIGNvbnN0cnVjdG9ycyBtYXkgb25seSByZXR1cm4gb2JqZWN0IG9yIHVuZGVmaW5lZFwiKTtcbiAgfVxuXG4gIHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlU3VwZXIoRGVyaXZlZCkge1xuICB2YXIgaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCA9IF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKTtcblxuICByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7XG4gICAgdmFyIFN1cGVyID0gX2dldFByb3RvdHlwZU9mKERlcml2ZWQpLFxuICAgICAgICByZXN1bHQ7XG5cbiAgICBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkge1xuICAgICAgdmFyIE5ld1RhcmdldCA9IF9nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3RvcjtcblxuICAgICAgcmVzdWx0ID0gUmVmbGVjdC5jb25zdHJ1Y3QoU3VwZXIsIGFyZ3VtZW50cywgTmV3VGFyZ2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gU3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgcmVzdWx0KTtcbiAgfTtcbn1cblxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIGJhc2ljIGNoYW5uZWwuXHJcbiAqL1xudmFyIENoYW5uZWwgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBDaGFubmVsKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDaGFubmVsKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhDaGFubmVsLCBbe1xuICAgIGtleTogXCJsaXN0ZW5Gb3JXaGlzcGVyXCIsXG4gICAgdmFsdWU6XG4gICAgLyoqXHJcbiAgICAgKiBMaXN0ZW4gZm9yIGEgd2hpc3BlciBldmVudCBvbiB0aGUgY2hhbm5lbCBpbnN0YW5jZS5cclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGxpc3RlbkZvcldoaXNwZXIoZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy5saXN0ZW4oJy5jbGllbnQtJyArIGV2ZW50LCBjYWxsYmFjayk7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogTGlzdGVuIGZvciBhbiBldmVudCBvbiB0aGUgY2hhbm5lbCBpbnN0YW5jZS5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwibm90aWZpY2F0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG5vdGlmaWNhdGlvbihjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuKCcuSWxsdW1pbmF0ZVxcXFxOb3RpZmljYXRpb25zXFxcXEV2ZW50c1xcXFxCcm9hZGNhc3ROb3RpZmljYXRpb25DcmVhdGVkJywgY2FsbGJhY2spO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIFN0b3AgbGlzdGVuaW5nIGZvciBhIHdoaXNwZXIgZXZlbnQgb24gdGhlIGNoYW5uZWwgaW5zdGFuY2UuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInN0b3BMaXN0ZW5pbmdGb3JXaGlzcGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0b3BMaXN0ZW5pbmdGb3JXaGlzcGVyKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIHRoaXMuc3RvcExpc3RlbmluZygnLmNsaWVudC0nICsgZXZlbnQsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQ2hhbm5lbDtcbn0oKTtcblxuLyoqXHJcbiAqIEV2ZW50IG5hbWUgZm9ybWF0dGVyXHJcbiAqL1xudmFyIEV2ZW50Rm9ybWF0dGVyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IGNsYXNzIGluc3RhbmNlLlxyXG4gICAqL1xuICBmdW5jdGlvbiBFdmVudEZvcm1hdHRlcihuYW1lc3BhY2UpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXZlbnRGb3JtYXR0ZXIpO1xuXG4gICAgdGhpcy5zZXROYW1lc3BhY2UobmFtZXNwYWNlKTtcbiAgfVxuICAvKipcclxuICAgKiBGb3JtYXQgdGhlIGdpdmVuIGV2ZW50IG5hbWUuXHJcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoRXZlbnRGb3JtYXR0ZXIsIFt7XG4gICAga2V5OiBcImZvcm1hdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmb3JtYXQoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5jaGFyQXQoMCkgPT09ICcuJyB8fCBldmVudC5jaGFyQXQoMCkgPT09ICdcXFxcJykge1xuICAgICAgICByZXR1cm4gZXZlbnQuc3Vic3RyKDEpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm5hbWVzcGFjZSkge1xuICAgICAgICBldmVudCA9IHRoaXMubmFtZXNwYWNlICsgJy4nICsgZXZlbnQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBldmVudC5yZXBsYWNlKC9cXC4vZywgJ1xcXFwnKTtcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGV2ZW50IG5hbWVzcGFjZS5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwic2V0TmFtZXNwYWNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldE5hbWVzcGFjZSh2YWx1ZSkge1xuICAgICAgdGhpcy5uYW1lc3BhY2UgPSB2YWx1ZTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRXZlbnRGb3JtYXR0ZXI7XG59KCk7XG5cbi8qKlxyXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgYSBQdXNoZXIgY2hhbm5lbC5cclxuICovXG5cbnZhciBQdXNoZXJDaGFubmVsID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfQ2hhbm5lbCkge1xuICBfaW5oZXJpdHMoUHVzaGVyQ2hhbm5lbCwgX0NoYW5uZWwpO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoUHVzaGVyQ2hhbm5lbCk7XG5cbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IGNsYXNzIGluc3RhbmNlLlxyXG4gICAqL1xuICBmdW5jdGlvbiBQdXNoZXJDaGFubmVsKHB1c2hlciwgbmFtZSwgb3B0aW9ucykge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQdXNoZXJDaGFubmVsKTtcblxuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgX3RoaXMubmFtZSA9IG5hbWU7XG4gICAgX3RoaXMucHVzaGVyID0gcHVzaGVyO1xuICAgIF90aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIF90aGlzLmV2ZW50Rm9ybWF0dGVyID0gbmV3IEV2ZW50Rm9ybWF0dGVyKF90aGlzLm9wdGlvbnMubmFtZXNwYWNlKTtcblxuICAgIF90aGlzLnN1YnNjcmliZSgpO1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byBhIFB1c2hlciBjaGFubmVsLlxyXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKFB1c2hlckNoYW5uZWwsIFt7XG4gICAga2V5OiBcInN1YnNjcmliZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdWJzY3JpYmUoKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMucHVzaGVyLnN1YnNjcmliZSh0aGlzLm5hbWUpO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIFVuc3Vic2NyaWJlIGZyb20gYSBQdXNoZXIgY2hhbm5lbC5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwidW5zdWJzY3JpYmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICB0aGlzLnB1c2hlci51bnN1YnNjcmliZSh0aGlzLm5hbWUpO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIExpc3RlbiBmb3IgYW4gZXZlbnQgb24gdGhlIGNoYW5uZWwgaW5zdGFuY2UuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImxpc3RlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsaXN0ZW4oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLm9uKHRoaXMuZXZlbnRGb3JtYXR0ZXIuZm9ybWF0KGV2ZW50KSwgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogTGlzdGVuIGZvciBhbGwgZXZlbnRzIG9uIHRoZSBjaGFubmVsIGluc3RhbmNlLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJsaXN0ZW5Ub0FsbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsaXN0ZW5Ub0FsbChjYWxsYmFjaykge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmJpbmRfZ2xvYmFsKGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICAgICAgICBpZiAoZXZlbnQuc3RhcnRzV2l0aCgncHVzaGVyOicpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5hbWVzcGFjZSA9IF90aGlzMi5vcHRpb25zLm5hbWVzcGFjZS5yZXBsYWNlKC9cXC4vZywgJ1xcXFwnKTtcblxuICAgICAgICB2YXIgZm9ybWF0dGVkRXZlbnQgPSBldmVudC5zdGFydHNXaXRoKG5hbWVzcGFjZSkgPyBldmVudC5zdWJzdHJpbmcobmFtZXNwYWNlLmxlbmd0aCArIDEpIDogJy4nICsgZXZlbnQ7XG4gICAgICAgIGNhbGxiYWNrKGZvcm1hdHRlZEV2ZW50LCBkYXRhKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogU3RvcCBsaXN0ZW5pbmcgZm9yIGFuIGV2ZW50IG9uIHRoZSBjaGFubmVsIGluc3RhbmNlLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJzdG9wTGlzdGVuaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0b3BMaXN0ZW5pbmcoZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5iaW5kKHRoaXMuZXZlbnRGb3JtYXR0ZXIuZm9ybWF0KGV2ZW50KSwgY2FsbGJhY2spO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5iaW5kKHRoaXMuZXZlbnRGb3JtYXR0ZXIuZm9ybWF0KGV2ZW50KSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIFN0b3AgbGlzdGVuaW5nIGZvciBhbGwgZXZlbnRzIG9uIHRoZSBjaGFubmVsIGluc3RhbmNlLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJzdG9wTGlzdGVuaW5nVG9BbGxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RvcExpc3RlbmluZ1RvQWxsKGNhbGxiYWNrKSB7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5iaW5kX2dsb2JhbChjYWxsYmFjayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bmJpbmRfZ2xvYmFsKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyIGEgY2FsbGJhY2sgdG8gYmUgY2FsbGVkIGFueXRpbWUgYSBzdWJzY3JpcHRpb24gc3VjY2VlZHMuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInN1YnNjcmliZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3Vic2NyaWJlZChjYWxsYmFjaykge1xuICAgICAgdGhpcy5vbigncHVzaGVyOnN1YnNjcmlwdGlvbl9zdWNjZWVkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyIGEgY2FsbGJhY2sgdG8gYmUgY2FsbGVkIGFueXRpbWUgYSBzdWJzY3JpcHRpb24gZXJyb3Igb2NjdXJzLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJlcnJvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlcnJvcihjYWxsYmFjaykge1xuICAgICAgdGhpcy5vbigncHVzaGVyOnN1YnNjcmlwdGlvbl9lcnJvcicsIGZ1bmN0aW9uIChzdGF0dXMpIHtcbiAgICAgICAgY2FsbGJhY2soc3RhdHVzKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogQmluZCBhIGNoYW5uZWwgdG8gYW4gZXZlbnQuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcIm9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24uYmluZChldmVudCwgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFB1c2hlckNoYW5uZWw7XG59KENoYW5uZWwpO1xuXG4vKipcclxuICogVGhpcyBjbGFzcyByZXByZXNlbnRzIGEgUHVzaGVyIHByaXZhdGUgY2hhbm5lbC5cclxuICovXG5cbnZhciBQdXNoZXJQcml2YXRlQ2hhbm5lbCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX1B1c2hlckNoYW5uZWwpIHtcbiAgX2luaGVyaXRzKFB1c2hlclByaXZhdGVDaGFubmVsLCBfUHVzaGVyQ2hhbm5lbCk7XG5cbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihQdXNoZXJQcml2YXRlQ2hhbm5lbCk7XG5cbiAgZnVuY3Rpb24gUHVzaGVyUHJpdmF0ZUNoYW5uZWwoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFB1c2hlclByaXZhdGVDaGFubmVsKTtcblxuICAgIHJldHVybiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhQdXNoZXJQcml2YXRlQ2hhbm5lbCwgW3tcbiAgICBrZXk6IFwid2hpc3BlclwiLFxuICAgIHZhbHVlOlxuICAgIC8qKlxyXG4gICAgICogVHJpZ2dlciBjbGllbnQgZXZlbnQgb24gdGhlIGNoYW5uZWwuXHJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB3aGlzcGVyKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgdGhpcy5wdXNoZXIuY2hhbm5lbHMuY2hhbm5lbHNbdGhpcy5uYW1lXS50cmlnZ2VyKFwiY2xpZW50LVwiLmNvbmNhdChldmVudE5hbWUpLCBkYXRhKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBQdXNoZXJQcml2YXRlQ2hhbm5lbDtcbn0oUHVzaGVyQ2hhbm5lbCk7XG5cbi8qKlxyXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgYSBQdXNoZXIgcHJpdmF0ZSBjaGFubmVsLlxyXG4gKi9cblxudmFyIFB1c2hlckVuY3J5cHRlZFByaXZhdGVDaGFubmVsID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfUHVzaGVyQ2hhbm5lbCkge1xuICBfaW5oZXJpdHMoUHVzaGVyRW5jcnlwdGVkUHJpdmF0ZUNoYW5uZWwsIF9QdXNoZXJDaGFubmVsKTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKFB1c2hlckVuY3J5cHRlZFByaXZhdGVDaGFubmVsKTtcblxuICBmdW5jdGlvbiBQdXNoZXJFbmNyeXB0ZWRQcml2YXRlQ2hhbm5lbCgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUHVzaGVyRW5jcnlwdGVkUHJpdmF0ZUNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFB1c2hlckVuY3J5cHRlZFByaXZhdGVDaGFubmVsLCBbe1xuICAgIGtleTogXCJ3aGlzcGVyXCIsXG4gICAgdmFsdWU6XG4gICAgLyoqXHJcbiAgICAgKiBUcmlnZ2VyIGNsaWVudCBldmVudCBvbiB0aGUgY2hhbm5lbC5cclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHdoaXNwZXIoZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICB0aGlzLnB1c2hlci5jaGFubmVscy5jaGFubmVsc1t0aGlzLm5hbWVdLnRyaWdnZXIoXCJjbGllbnQtXCIuY29uY2F0KGV2ZW50TmFtZSksIGRhdGEpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFB1c2hlckVuY3J5cHRlZFByaXZhdGVDaGFubmVsO1xufShQdXNoZXJDaGFubmVsKTtcblxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIFB1c2hlciBwcmVzZW5jZSBjaGFubmVsLlxyXG4gKi9cblxudmFyIFB1c2hlclByZXNlbmNlQ2hhbm5lbCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX1B1c2hlckNoYW5uZWwpIHtcbiAgX2luaGVyaXRzKFB1c2hlclByZXNlbmNlQ2hhbm5lbCwgX1B1c2hlckNoYW5uZWwpO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoUHVzaGVyUHJlc2VuY2VDaGFubmVsKTtcblxuICBmdW5jdGlvbiBQdXNoZXJQcmVzZW5jZUNoYW5uZWwoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFB1c2hlclByZXNlbmNlQ2hhbm5lbCk7XG5cbiAgICByZXR1cm4gX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoUHVzaGVyUHJlc2VuY2VDaGFubmVsLCBbe1xuICAgIGtleTogXCJoZXJlXCIsXG4gICAgdmFsdWU6XG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlciBhIGNhbGxiYWNrIHRvIGJlIGNhbGxlZCBhbnl0aW1lIHRoZSBtZW1iZXIgbGlzdCBjaGFuZ2VzLlxyXG4gICAgICovXG4gICAgZnVuY3Rpb24gaGVyZShjYWxsYmFjaykge1xuICAgICAgdGhpcy5vbigncHVzaGVyOnN1YnNjcmlwdGlvbl9zdWNjZWVkZWQnLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBjYWxsYmFjayhPYmplY3Qua2V5cyhkYXRhLm1lbWJlcnMpLm1hcChmdW5jdGlvbiAoaykge1xuICAgICAgICAgIHJldHVybiBkYXRhLm1lbWJlcnNba107XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogTGlzdGVuIGZvciBzb21lb25lIGpvaW5pbmcgdGhlIGNoYW5uZWwuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImpvaW5pbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gam9pbmluZyhjYWxsYmFjaykge1xuICAgICAgdGhpcy5vbigncHVzaGVyOm1lbWJlcl9hZGRlZCcsIGZ1bmN0aW9uIChtZW1iZXIpIHtcbiAgICAgICAgY2FsbGJhY2sobWVtYmVyLmluZm8pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBMaXN0ZW4gZm9yIHNvbWVvbmUgbGVhdmluZyB0aGUgY2hhbm5lbC5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwibGVhdmluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsZWF2aW5nKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLm9uKCdwdXNoZXI6bWVtYmVyX3JlbW92ZWQnLCBmdW5jdGlvbiAobWVtYmVyKSB7XG4gICAgICAgIGNhbGxiYWNrKG1lbWJlci5pbmZvKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogVHJpZ2dlciBjbGllbnQgZXZlbnQgb24gdGhlIGNoYW5uZWwuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcIndoaXNwZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gd2hpc3BlcihldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgIHRoaXMucHVzaGVyLmNoYW5uZWxzLmNoYW5uZWxzW3RoaXMubmFtZV0udHJpZ2dlcihcImNsaWVudC1cIi5jb25jYXQoZXZlbnROYW1lKSwgZGF0YSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUHVzaGVyUHJlc2VuY2VDaGFubmVsO1xufShQdXNoZXJDaGFubmVsKTtcblxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIFNvY2tldC5pbyBjaGFubmVsLlxyXG4gKi9cblxudmFyIFNvY2tldElvQ2hhbm5lbCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0NoYW5uZWwpIHtcbiAgX2luaGVyaXRzKFNvY2tldElvQ2hhbm5lbCwgX0NoYW5uZWwpO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoU29ja2V0SW9DaGFubmVsKTtcblxuICAvKipcclxuICAgKiBDcmVhdGUgYSBuZXcgY2xhc3MgaW5zdGFuY2UuXHJcbiAgICovXG4gIGZ1bmN0aW9uIFNvY2tldElvQ2hhbm5lbChzb2NrZXQsIG5hbWUsIG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU29ja2V0SW9DaGFubmVsKTtcblxuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZXZlbnQgY2FsbGJhY2tzIGFwcGxpZWQgdG8gdGhlIHNvY2tldC5cclxuICAgICAqL1xuXG4gICAgX3RoaXMuZXZlbnRzID0ge307XG4gICAgLyoqXHJcbiAgICAgKiBVc2VyIHN1cHBsaWVkIGNhbGxiYWNrcyBmb3IgZXZlbnRzIG9uIHRoaXMgY2hhbm5lbC5cclxuICAgICAqL1xuXG4gICAgX3RoaXMubGlzdGVuZXJzID0ge307XG4gICAgX3RoaXMubmFtZSA9IG5hbWU7XG4gICAgX3RoaXMuc29ja2V0ID0gc29ja2V0O1xuICAgIF90aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIF90aGlzLmV2ZW50Rm9ybWF0dGVyID0gbmV3IEV2ZW50Rm9ybWF0dGVyKF90aGlzLm9wdGlvbnMubmFtZXNwYWNlKTtcblxuICAgIF90aGlzLnN1YnNjcmliZSgpO1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byBhIFNvY2tldC5pbyBjaGFubmVsLlxyXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKFNvY2tldElvQ2hhbm5lbCwgW3tcbiAgICBrZXk6IFwic3Vic2NyaWJlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN1YnNjcmliZSgpIHtcbiAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3N1YnNjcmliZScsIHtcbiAgICAgICAgY2hhbm5lbDogdGhpcy5uYW1lLFxuICAgICAgICBhdXRoOiB0aGlzLm9wdGlvbnMuYXV0aCB8fCB7fVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogVW5zdWJzY3JpYmUgZnJvbSBjaGFubmVsIGFuZCB1YmluZCBldmVudCBjYWxsYmFja3MuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInVuc3Vic2NyaWJlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgdGhpcy51bmJpbmQoKTtcbiAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3Vuc3Vic2NyaWJlJywge1xuICAgICAgICBjaGFubmVsOiB0aGlzLm5hbWUsXG4gICAgICAgIGF1dGg6IHRoaXMub3B0aW9ucy5hdXRoIHx8IHt9XG4gICAgICB9KTtcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBMaXN0ZW4gZm9yIGFuIGV2ZW50IG9uIHRoZSBjaGFubmVsIGluc3RhbmNlLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJsaXN0ZW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5vbih0aGlzLmV2ZW50Rm9ybWF0dGVyLmZvcm1hdChldmVudCksIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIFN0b3AgbGlzdGVuaW5nIGZvciBhbiBldmVudCBvbiB0aGUgY2hhbm5lbCBpbnN0YW5jZS5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwic3RvcExpc3RlbmluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdG9wTGlzdGVuaW5nKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgdGhpcy51bmJpbmRFdmVudCh0aGlzLmV2ZW50Rm9ybWF0dGVyLmZvcm1hdChldmVudCksIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyIGEgY2FsbGJhY2sgdG8gYmUgY2FsbGVkIGFueXRpbWUgYSBzdWJzY3JpcHRpb24gc3VjY2VlZHMuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInN1YnNjcmliZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3Vic2NyaWJlZChjYWxsYmFjaykge1xuICAgICAgdGhpcy5vbignY29ubmVjdCcsIGZ1bmN0aW9uIChzb2NrZXQpIHtcbiAgICAgICAgY2FsbGJhY2soc29ja2V0KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXIgYSBjYWxsYmFjayB0byBiZSBjYWxsZWQgYW55dGltZSBhbiBlcnJvciBvY2N1cnMuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImVycm9yXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVycm9yKGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBCaW5kIHRoZSBjaGFubmVsJ3Mgc29ja2V0IHRvIGFuIGV2ZW50IGFuZCBzdG9yZSB0aGUgY2FsbGJhY2suXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcIm9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XSA9IHRoaXMubGlzdGVuZXJzW2V2ZW50XSB8fCBbXTtcblxuICAgICAgaWYgKCF0aGlzLmV2ZW50c1tldmVudF0pIHtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gZnVuY3Rpb24gKGNoYW5uZWwsIGRhdGEpIHtcbiAgICAgICAgICBpZiAoX3RoaXMyLm5hbWUgPT09IGNoYW5uZWwgJiYgX3RoaXMyLmxpc3RlbmVyc1tldmVudF0pIHtcbiAgICAgICAgICAgIF90aGlzMi5saXN0ZW5lcnNbZXZlbnRdLmZvckVhY2goZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYihkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnNvY2tldC5vbihldmVudCwgdGhpcy5ldmVudHNbZXZlbnRdKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLnB1c2goY2FsbGJhY2spO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogVW5iaW5kIHRoZSBjaGFubmVsJ3Mgc29ja2V0IGZyb20gYWxsIHN0b3JlZCBldmVudCBjYWxsYmFja3MuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInVuYmluZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgT2JqZWN0LmtleXModGhpcy5ldmVudHMpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIF90aGlzMy51bmJpbmRFdmVudChldmVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBVbmJpbmQgdGhlIGxpc3RlbmVycyBmb3IgdGhlIGdpdmVuIGV2ZW50LlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJ1bmJpbmRFdmVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1bmJpbmRFdmVudChldmVudCwgY2FsbGJhY2spIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XSA9IHRoaXMubGlzdGVuZXJzW2V2ZW50XSB8fCBbXTtcblxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XSA9IHRoaXMubGlzdGVuZXJzW2V2ZW50XS5maWx0ZXIoZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgcmV0dXJuIGNiICE9PSBjYWxsYmFjaztcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghY2FsbGJhY2sgfHwgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAodGhpcy5ldmVudHNbZXZlbnRdKSB7XG4gICAgICAgICAgdGhpcy5zb2NrZXQucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIHRoaXMuZXZlbnRzW2V2ZW50XSk7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuZXZlbnRzW2V2ZW50XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RlbmVyc1tldmVudF07XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFNvY2tldElvQ2hhbm5lbDtcbn0oQ2hhbm5lbCk7XG5cbi8qKlxyXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgYSBTb2NrZXQuaW8gcHJpdmF0ZSBjaGFubmVsLlxyXG4gKi9cblxudmFyIFNvY2tldElvUHJpdmF0ZUNoYW5uZWwgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9Tb2NrZXRJb0NoYW5uZWwpIHtcbiAgX2luaGVyaXRzKFNvY2tldElvUHJpdmF0ZUNoYW5uZWwsIF9Tb2NrZXRJb0NoYW5uZWwpO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoU29ja2V0SW9Qcml2YXRlQ2hhbm5lbCk7XG5cbiAgZnVuY3Rpb24gU29ja2V0SW9Qcml2YXRlQ2hhbm5lbCgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU29ja2V0SW9Qcml2YXRlQ2hhbm5lbCk7XG5cbiAgICByZXR1cm4gX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoU29ja2V0SW9Qcml2YXRlQ2hhbm5lbCwgW3tcbiAgICBrZXk6IFwid2hpc3BlclwiLFxuICAgIHZhbHVlOlxuICAgIC8qKlxyXG4gICAgICogVHJpZ2dlciBjbGllbnQgZXZlbnQgb24gdGhlIGNoYW5uZWwuXHJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB3aGlzcGVyKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnY2xpZW50IGV2ZW50Jywge1xuICAgICAgICBjaGFubmVsOiB0aGlzLm5hbWUsXG4gICAgICAgIGV2ZW50OiBcImNsaWVudC1cIi5jb25jYXQoZXZlbnROYW1lKSxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU29ja2V0SW9Qcml2YXRlQ2hhbm5lbDtcbn0oU29ja2V0SW9DaGFubmVsKTtcblxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIFNvY2tldC5pbyBwcmVzZW5jZSBjaGFubmVsLlxyXG4gKi9cblxudmFyIFNvY2tldElvUHJlc2VuY2VDaGFubmVsID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfU29ja2V0SW9Qcml2YXRlQ2hhbm4pIHtcbiAgX2luaGVyaXRzKFNvY2tldElvUHJlc2VuY2VDaGFubmVsLCBfU29ja2V0SW9Qcml2YXRlQ2hhbm4pO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoU29ja2V0SW9QcmVzZW5jZUNoYW5uZWwpO1xuXG4gIGZ1bmN0aW9uIFNvY2tldElvUHJlc2VuY2VDaGFubmVsKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTb2NrZXRJb1ByZXNlbmNlQ2hhbm5lbCk7XG5cbiAgICByZXR1cm4gX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoU29ja2V0SW9QcmVzZW5jZUNoYW5uZWwsIFt7XG4gICAga2V5OiBcImhlcmVcIixcbiAgICB2YWx1ZTpcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyIGEgY2FsbGJhY2sgdG8gYmUgY2FsbGVkIGFueXRpbWUgdGhlIG1lbWJlciBsaXN0IGNoYW5nZXMuXHJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBoZXJlKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLm9uKCdwcmVzZW5jZTpzdWJzY3JpYmVkJywgZnVuY3Rpb24gKG1lbWJlcnMpIHtcbiAgICAgICAgY2FsbGJhY2sobWVtYmVycy5tYXAoZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICByZXR1cm4gbS51c2VyX2luZm87XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogTGlzdGVuIGZvciBzb21lb25lIGpvaW5pbmcgdGhlIGNoYW5uZWwuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImpvaW5pbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gam9pbmluZyhjYWxsYmFjaykge1xuICAgICAgdGhpcy5vbigncHJlc2VuY2U6am9pbmluZycsIGZ1bmN0aW9uIChtZW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG1lbWJlci51c2VyX2luZm8pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBMaXN0ZW4gZm9yIHNvbWVvbmUgbGVhdmluZyB0aGUgY2hhbm5lbC5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwibGVhdmluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsZWF2aW5nKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLm9uKCdwcmVzZW5jZTpsZWF2aW5nJywgZnVuY3Rpb24gKG1lbWJlcikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sobWVtYmVyLnVzZXJfaW5mbyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBTb2NrZXRJb1ByZXNlbmNlQ2hhbm5lbDtcbn0oU29ja2V0SW9Qcml2YXRlQ2hhbm5lbCk7XG5cbi8qKlxyXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgYSBudWxsIGNoYW5uZWwuXHJcbiAqL1xuXG52YXIgTnVsbENoYW5uZWwgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9DaGFubmVsKSB7XG4gIF9pbmhlcml0cyhOdWxsQ2hhbm5lbCwgX0NoYW5uZWwpO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoTnVsbENoYW5uZWwpO1xuXG4gIGZ1bmN0aW9uIE51bGxDaGFubmVsKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOdWxsQ2hhbm5lbCk7XG5cbiAgICByZXR1cm4gX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTnVsbENoYW5uZWwsIFt7XG4gICAga2V5OiBcInN1YnNjcmliZVwiLFxuICAgIHZhbHVlOlxuICAgIC8qKlxyXG4gICAgICogU3Vic2NyaWJlIHRvIGEgY2hhbm5lbC5cclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN1YnNjcmliZSgpIHsvL1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIFVuc3Vic2NyaWJlIGZyb20gYSBjaGFubmVsLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJ1bnN1YnNjcmliZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHsvL1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIExpc3RlbiBmb3IgYW4gZXZlbnQgb24gdGhlIGNoYW5uZWwgaW5zdGFuY2UuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImxpc3RlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsaXN0ZW4oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBTdG9wIGxpc3RlbmluZyBmb3IgYW4gZXZlbnQgb24gdGhlIGNoYW5uZWwgaW5zdGFuY2UuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInN0b3BMaXN0ZW5pbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RvcExpc3RlbmluZyhldmVudCwgY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyIGEgY2FsbGJhY2sgdG8gYmUgY2FsbGVkIGFueXRpbWUgYSBzdWJzY3JpcHRpb24gc3VjY2VlZHMuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInN1YnNjcmliZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3Vic2NyaWJlZChjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXIgYSBjYWxsYmFjayB0byBiZSBjYWxsZWQgYW55dGltZSBhbiBlcnJvciBvY2N1cnMuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImVycm9yXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVycm9yKGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBCaW5kIGEgY2hhbm5lbCB0byBhbiBldmVudC5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwib25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb24oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTnVsbENoYW5uZWw7XG59KENoYW5uZWwpO1xuXG4vKipcclxuICogVGhpcyBjbGFzcyByZXByZXNlbnRzIGEgbnVsbCBwcml2YXRlIGNoYW5uZWwuXHJcbiAqL1xuXG52YXIgTnVsbFByaXZhdGVDaGFubmVsID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfTnVsbENoYW5uZWwpIHtcbiAgX2luaGVyaXRzKE51bGxQcml2YXRlQ2hhbm5lbCwgX051bGxDaGFubmVsKTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKE51bGxQcml2YXRlQ2hhbm5lbCk7XG5cbiAgZnVuY3Rpb24gTnVsbFByaXZhdGVDaGFubmVsKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOdWxsUHJpdmF0ZUNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE51bGxQcml2YXRlQ2hhbm5lbCwgW3tcbiAgICBrZXk6IFwid2hpc3BlclwiLFxuICAgIHZhbHVlOlxuICAgIC8qKlxyXG4gICAgICogVHJpZ2dlciBjbGllbnQgZXZlbnQgb24gdGhlIGNoYW5uZWwuXHJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB3aGlzcGVyKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE51bGxQcml2YXRlQ2hhbm5lbDtcbn0oTnVsbENoYW5uZWwpO1xuXG4vKipcclxuICogVGhpcyBjbGFzcyByZXByZXNlbnRzIGEgbnVsbCBwcmVzZW5jZSBjaGFubmVsLlxyXG4gKi9cblxudmFyIE51bGxQcmVzZW5jZUNoYW5uZWwgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9OdWxsQ2hhbm5lbCkge1xuICBfaW5oZXJpdHMoTnVsbFByZXNlbmNlQ2hhbm5lbCwgX051bGxDaGFubmVsKTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKE51bGxQcmVzZW5jZUNoYW5uZWwpO1xuXG4gIGZ1bmN0aW9uIE51bGxQcmVzZW5jZUNoYW5uZWwoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE51bGxQcmVzZW5jZUNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE51bGxQcmVzZW5jZUNoYW5uZWwsIFt7XG4gICAga2V5OiBcImhlcmVcIixcbiAgICB2YWx1ZTpcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyIGEgY2FsbGJhY2sgdG8gYmUgY2FsbGVkIGFueXRpbWUgdGhlIG1lbWJlciBsaXN0IGNoYW5nZXMuXHJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBoZXJlKGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBMaXN0ZW4gZm9yIHNvbWVvbmUgam9pbmluZyB0aGUgY2hhbm5lbC5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiam9pbmluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBqb2luaW5nKGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBMaXN0ZW4gZm9yIHNvbWVvbmUgbGVhdmluZyB0aGUgY2hhbm5lbC5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwibGVhdmluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsZWF2aW5nKGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBUcmlnZ2VyIGNsaWVudCBldmVudCBvbiB0aGUgY2hhbm5lbC5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwid2hpc3BlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB3aGlzcGVyKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE51bGxQcmVzZW5jZUNoYW5uZWw7XG59KE51bGxDaGFubmVsKTtcblxudmFyIENvbm5lY3RvciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBjbGFzcyBpbnN0YW5jZS5cclxuICAgKi9cbiAgZnVuY3Rpb24gQ29ubmVjdG9yKG9wdGlvbnMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29ubmVjdG9yKTtcblxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBjb25uZWN0b3Igb3B0aW9ucy5cclxuICAgICAqL1xuICAgIHRoaXMuX2RlZmF1bHRPcHRpb25zID0ge1xuICAgICAgYXV0aDoge1xuICAgICAgICBoZWFkZXJzOiB7fVxuICAgICAgfSxcbiAgICAgIGF1dGhFbmRwb2ludDogJy9icm9hZGNhc3RpbmcvYXV0aCcsXG4gICAgICB1c2VyQXV0aGVudGljYXRpb246IHtcbiAgICAgICAgZW5kcG9pbnQ6ICcvYnJvYWRjYXN0aW5nL3VzZXItYXV0aCcsXG4gICAgICAgIGhlYWRlcnM6IHt9XG4gICAgICB9LFxuICAgICAgYnJvYWRjYXN0ZXI6ICdwdXNoZXInLFxuICAgICAgY3NyZlRva2VuOiBudWxsLFxuICAgICAgaG9zdDogbnVsbCxcbiAgICAgIGtleTogbnVsbCxcbiAgICAgIG5hbWVzcGFjZTogJ0FwcC5FdmVudHMnXG4gICAgfTtcbiAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5jb25uZWN0KCk7XG4gIH1cbiAgLyoqXHJcbiAgICogTWVyZ2UgdGhlIGN1c3RvbSBvcHRpb25zIHdpdGggdGhlIGRlZmF1bHRzLlxyXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKENvbm5lY3RvciwgW3tcbiAgICBrZXk6IFwic2V0T3B0aW9uc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IF9leHRlbmRzKHRoaXMuX2RlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICAgIHZhciB0b2tlbiA9IHRoaXMuY3NyZlRva2VuKCk7XG5cbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYXV0aC5oZWFkZXJzWydYLUNTUkYtVE9LRU4nXSA9IHRva2VuO1xuICAgICAgICB0aGlzLm9wdGlvbnMudXNlckF1dGhlbnRpY2F0aW9uLmhlYWRlcnNbJ1gtQ1NSRi1UT0tFTiddID0gdG9rZW47XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIEV4dHJhY3QgdGhlIENTUkYgdG9rZW4gZnJvbSB0aGUgcGFnZS5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiY3NyZlRva2VuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNzcmZUb2tlbigpIHtcbiAgICAgIHZhciBzZWxlY3RvcjtcblxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvd1snTGFyYXZlbCddICYmIHdpbmRvd1snTGFyYXZlbCddLmNzcmZUb2tlbikge1xuICAgICAgICByZXR1cm4gd2luZG93WydMYXJhdmVsJ10uY3NyZlRva2VuO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuY3NyZlRva2VuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY3NyZlRva2VuO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yID09PSAnZnVuY3Rpb24nICYmIChzZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cImNzcmYtdG9rZW5cIl0nKSkpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yLmdldEF0dHJpYnV0ZSgnY29udGVudCcpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQ29ubmVjdG9yO1xufSgpO1xuXG4vKipcclxuICogVGhpcyBjbGFzcyBjcmVhdGVzIGEgY29ubmVjdG9yIHRvIFB1c2hlci5cclxuICovXG5cbnZhciBQdXNoZXJDb25uZWN0b3IgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9Db25uZWN0b3IpIHtcbiAgX2luaGVyaXRzKFB1c2hlckNvbm5lY3RvciwgX0Nvbm5lY3Rvcik7XG5cbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihQdXNoZXJDb25uZWN0b3IpO1xuXG4gIGZ1bmN0aW9uIFB1c2hlckNvbm5lY3RvcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUHVzaGVyQ29ubmVjdG9yKTtcblxuICAgIF90aGlzID0gX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgLyoqXHJcbiAgICAgKiBBbGwgb2YgdGhlIHN1YnNjcmliZWQgY2hhbm5lbCBuYW1lcy5cclxuICAgICAqL1xuXG4gICAgX3RoaXMuY2hhbm5lbHMgPSB7fTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgZnJlc2ggUHVzaGVyIGNvbm5lY3Rpb24uXHJcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoUHVzaGVyQ29ubmVjdG9yLCBbe1xuICAgIGtleTogXCJjb25uZWN0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbm5lY3QoKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5jbGllbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMucHVzaGVyID0gdGhpcy5vcHRpb25zLmNsaWVudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHVzaGVyID0gbmV3IFB1c2hlcih0aGlzLm9wdGlvbnMua2V5LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcclxuICAgICAqIFNpZ24gaW4gdGhlIHVzZXIgdmlhIFB1c2hlciB1c2VyIGF1dGhlbnRpY2F0aW9uIChodHRwczovL3B1c2hlci5jb20vZG9jcy9jaGFubmVscy91c2luZ19jaGFubmVscy91c2VyLWF1dGhlbnRpY2F0aW9uLykuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNpZ25pblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaWduaW4oKSB7XG4gICAgICB0aGlzLnB1c2hlci5zaWduaW4oKTtcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBMaXN0ZW4gZm9yIGFuIGV2ZW50IG9uIGEgY2hhbm5lbCBpbnN0YW5jZS5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwibGlzdGVuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxpc3RlbihuYW1lLCBldmVudCwgY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiB0aGlzLmNoYW5uZWwobmFtZSkubGlzdGVuKGV2ZW50LCBjYWxsYmFjayk7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgY2hhbm5lbCBpbnN0YW5jZSBieSBuYW1lLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJjaGFubmVsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNoYW5uZWwobmFtZSkge1xuICAgICAgaWYgKCF0aGlzLmNoYW5uZWxzW25hbWVdKSB7XG4gICAgICAgIHRoaXMuY2hhbm5lbHNbbmFtZV0gPSBuZXcgUHVzaGVyQ2hhbm5lbCh0aGlzLnB1c2hlciwgbmFtZSwgdGhpcy5vcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY2hhbm5lbHNbbmFtZV07XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgcHJpdmF0ZSBjaGFubmVsIGluc3RhbmNlIGJ5IG5hbWUuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInByaXZhdGVDaGFubmVsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByaXZhdGVDaGFubmVsKG5hbWUpIHtcbiAgICAgIGlmICghdGhpcy5jaGFubmVsc1sncHJpdmF0ZS0nICsgbmFtZV0pIHtcbiAgICAgICAgdGhpcy5jaGFubmVsc1sncHJpdmF0ZS0nICsgbmFtZV0gPSBuZXcgUHVzaGVyUHJpdmF0ZUNoYW5uZWwodGhpcy5wdXNoZXIsICdwcml2YXRlLScgKyBuYW1lLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jaGFubmVsc1sncHJpdmF0ZS0nICsgbmFtZV07XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgcHJpdmF0ZSBlbmNyeXB0ZWQgY2hhbm5lbCBpbnN0YW5jZSBieSBuYW1lLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJlbmNyeXB0ZWRQcml2YXRlQ2hhbm5lbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmNyeXB0ZWRQcml2YXRlQ2hhbm5lbChuYW1lKSB7XG4gICAgICBpZiAoIXRoaXMuY2hhbm5lbHNbJ3ByaXZhdGUtZW5jcnlwdGVkLScgKyBuYW1lXSkge1xuICAgICAgICB0aGlzLmNoYW5uZWxzWydwcml2YXRlLWVuY3J5cHRlZC0nICsgbmFtZV0gPSBuZXcgUHVzaGVyRW5jcnlwdGVkUHJpdmF0ZUNoYW5uZWwodGhpcy5wdXNoZXIsICdwcml2YXRlLWVuY3J5cHRlZC0nICsgbmFtZSwgdGhpcy5vcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY2hhbm5lbHNbJ3ByaXZhdGUtZW5jcnlwdGVkLScgKyBuYW1lXTtcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYSBwcmVzZW5jZSBjaGFubmVsIGluc3RhbmNlIGJ5IG5hbWUuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInByZXNlbmNlQ2hhbm5lbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVzZW5jZUNoYW5uZWwobmFtZSkge1xuICAgICAgaWYgKCF0aGlzLmNoYW5uZWxzWydwcmVzZW5jZS0nICsgbmFtZV0pIHtcbiAgICAgICAgdGhpcy5jaGFubmVsc1sncHJlc2VuY2UtJyArIG5hbWVdID0gbmV3IFB1c2hlclByZXNlbmNlQ2hhbm5lbCh0aGlzLnB1c2hlciwgJ3ByZXNlbmNlLScgKyBuYW1lLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jaGFubmVsc1sncHJlc2VuY2UtJyArIG5hbWVdO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIExlYXZlIHRoZSBnaXZlbiBjaGFubmVsLCBhcyB3ZWxsIGFzIGl0cyBwcml2YXRlIGFuZCBwcmVzZW5jZSB2YXJpYW50cy5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwibGVhdmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbGVhdmUobmFtZSkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBjaGFubmVscyA9IFtuYW1lLCAncHJpdmF0ZS0nICsgbmFtZSwgJ3ByZXNlbmNlLScgKyBuYW1lXTtcbiAgICAgIGNoYW5uZWxzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUsIGluZGV4KSB7XG4gICAgICAgIF90aGlzMi5sZWF2ZUNoYW5uZWwobmFtZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBMZWF2ZSB0aGUgZ2l2ZW4gY2hhbm5lbC5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwibGVhdmVDaGFubmVsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxlYXZlQ2hhbm5lbChuYW1lKSB7XG4gICAgICBpZiAodGhpcy5jaGFubmVsc1tuYW1lXSkge1xuICAgICAgICB0aGlzLmNoYW5uZWxzW25hbWVdLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNoYW5uZWxzW25hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgc29ja2V0IElEIGZvciB0aGUgY29ubmVjdGlvbi5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwic29ja2V0SWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc29ja2V0SWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wdXNoZXIuY29ubmVjdGlvbi5zb2NrZXRfaWQ7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogRGlzY29ubmVjdCBQdXNoZXIgY29ubmVjdGlvbi5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZGlzY29ubmVjdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNjb25uZWN0KCkge1xuICAgICAgdGhpcy5wdXNoZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBQdXNoZXJDb25uZWN0b3I7XG59KENvbm5lY3Rvcik7XG5cbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGNyZWF0ZXMgYSBjb25ubmVjdG9yIHRvIGEgU29ja2V0LmlvIHNlcnZlci5cclxuICovXG5cbnZhciBTb2NrZXRJb0Nvbm5lY3RvciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0Nvbm5lY3Rvcikge1xuICBfaW5oZXJpdHMoU29ja2V0SW9Db25uZWN0b3IsIF9Db25uZWN0b3IpO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoU29ja2V0SW9Db25uZWN0b3IpO1xuXG4gIGZ1bmN0aW9uIFNvY2tldElvQ29ubmVjdG9yKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTb2NrZXRJb0Nvbm5lY3Rvcik7XG5cbiAgICBfdGhpcyA9IF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIC8qKlxyXG4gICAgICogQWxsIG9mIHRoZSBzdWJzY3JpYmVkIGNoYW5uZWwgbmFtZXMuXHJcbiAgICAgKi9cblxuICAgIF90aGlzLmNoYW5uZWxzID0ge307XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIGZyZXNoIFNvY2tldC5pbyBjb25uZWN0aW9uLlxyXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKFNvY2tldElvQ29ubmVjdG9yLCBbe1xuICAgIGtleTogXCJjb25uZWN0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbm5lY3QoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIGlvID0gdGhpcy5nZXRTb2NrZXRJTygpO1xuICAgICAgdGhpcy5zb2NrZXQgPSBpbyh0aGlzLm9wdGlvbnMuaG9zdCwgdGhpcy5vcHRpb25zKTtcbiAgICAgIHRoaXMuc29ja2V0Lm9uKCdyZWNvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIE9iamVjdC52YWx1ZXMoX3RoaXMyLmNoYW5uZWxzKS5mb3JFYWNoKGZ1bmN0aW9uIChjaGFubmVsKSB7XG4gICAgICAgICAgY2hhbm5lbC5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzLnNvY2tldDtcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBHZXQgc29ja2V0LmlvIG1vZHVsZSBmcm9tIGdsb2JhbCBzY29wZSBvciBvcHRpb25zLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRTb2NrZXRJT1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTb2NrZXRJTygpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLmNsaWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5jbGllbnQ7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaW8gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBpbztcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb2NrZXQuaW8gY2xpZW50IG5vdCBmb3VuZC4gU2hvdWxkIGJlIGdsb2JhbGx5IGF2YWlsYWJsZSBvciBwYXNzZWQgdmlhIG9wdGlvbnMuY2xpZW50Jyk7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogTGlzdGVuIGZvciBhbiBldmVudCBvbiBhIGNoYW5uZWwgaW5zdGFuY2UuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImxpc3RlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsaXN0ZW4obmFtZSwgZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGFubmVsKG5hbWUpLmxpc3RlbihldmVudCwgY2FsbGJhY2spO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIEdldCBhIGNoYW5uZWwgaW5zdGFuY2UgYnkgbmFtZS5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiY2hhbm5lbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjaGFubmVsKG5hbWUpIHtcbiAgICAgIGlmICghdGhpcy5jaGFubmVsc1tuYW1lXSkge1xuICAgICAgICB0aGlzLmNoYW5uZWxzW25hbWVdID0gbmV3IFNvY2tldElvQ2hhbm5lbCh0aGlzLnNvY2tldCwgbmFtZSwgdGhpcy5vcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY2hhbm5lbHNbbmFtZV07XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgcHJpdmF0ZSBjaGFubmVsIGluc3RhbmNlIGJ5IG5hbWUuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInByaXZhdGVDaGFubmVsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByaXZhdGVDaGFubmVsKG5hbWUpIHtcbiAgICAgIGlmICghdGhpcy5jaGFubmVsc1sncHJpdmF0ZS0nICsgbmFtZV0pIHtcbiAgICAgICAgdGhpcy5jaGFubmVsc1sncHJpdmF0ZS0nICsgbmFtZV0gPSBuZXcgU29ja2V0SW9Qcml2YXRlQ2hhbm5lbCh0aGlzLnNvY2tldCwgJ3ByaXZhdGUtJyArIG5hbWUsIHRoaXMub3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNoYW5uZWxzWydwcml2YXRlLScgKyBuYW1lXTtcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYSBwcmVzZW5jZSBjaGFubmVsIGluc3RhbmNlIGJ5IG5hbWUuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInByZXNlbmNlQ2hhbm5lbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVzZW5jZUNoYW5uZWwobmFtZSkge1xuICAgICAgaWYgKCF0aGlzLmNoYW5uZWxzWydwcmVzZW5jZS0nICsgbmFtZV0pIHtcbiAgICAgICAgdGhpcy5jaGFubmVsc1sncHJlc2VuY2UtJyArIG5hbWVdID0gbmV3IFNvY2tldElvUHJlc2VuY2VDaGFubmVsKHRoaXMuc29ja2V0LCAncHJlc2VuY2UtJyArIG5hbWUsIHRoaXMub3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNoYW5uZWxzWydwcmVzZW5jZS0nICsgbmFtZV07XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogTGVhdmUgdGhlIGdpdmVuIGNoYW5uZWwsIGFzIHdlbGwgYXMgaXRzIHByaXZhdGUgYW5kIHByZXNlbmNlIHZhcmlhbnRzLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJsZWF2ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsZWF2ZShuYW1lKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdmFyIGNoYW5uZWxzID0gW25hbWUsICdwcml2YXRlLScgKyBuYW1lLCAncHJlc2VuY2UtJyArIG5hbWVdO1xuICAgICAgY2hhbm5lbHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBfdGhpczMubGVhdmVDaGFubmVsKG5hbWUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogTGVhdmUgdGhlIGdpdmVuIGNoYW5uZWwuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImxlYXZlQ2hhbm5lbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsZWF2ZUNoYW5uZWwobmFtZSkge1xuICAgICAgaWYgKHRoaXMuY2hhbm5lbHNbbmFtZV0pIHtcbiAgICAgICAgdGhpcy5jaGFubmVsc1tuYW1lXS51bnN1YnNjcmliZSgpO1xuICAgICAgICBkZWxldGUgdGhpcy5jaGFubmVsc1tuYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHNvY2tldCBJRCBmb3IgdGhlIGNvbm5lY3Rpb24uXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInNvY2tldElkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNvY2tldElkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc29ja2V0LmlkO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIERpc2Nvbm5lY3QgU29ja2V0aW8gY29ubmVjdGlvbi5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZGlzY29ubmVjdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNjb25uZWN0KCkge1xuICAgICAgdGhpcy5zb2NrZXQuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBTb2NrZXRJb0Nvbm5lY3Rvcjtcbn0oQ29ubmVjdG9yKTtcblxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgY3JlYXRlcyBhIG51bGwgY29ubmVjdG9yLlxyXG4gKi9cblxudmFyIE51bGxDb25uZWN0b3IgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9Db25uZWN0b3IpIHtcbiAgX2luaGVyaXRzKE51bGxDb25uZWN0b3IsIF9Db25uZWN0b3IpO1xuXG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoTnVsbENvbm5lY3Rvcik7XG5cbiAgZnVuY3Rpb24gTnVsbENvbm5lY3RvcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTnVsbENvbm5lY3Rvcik7XG5cbiAgICBfdGhpcyA9IF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIC8qKlxyXG4gICAgICogQWxsIG9mIHRoZSBzdWJzY3JpYmVkIGNoYW5uZWwgbmFtZXMuXHJcbiAgICAgKi9cblxuICAgIF90aGlzLmNoYW5uZWxzID0ge307XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIGZyZXNoIGNvbm5lY3Rpb24uXHJcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoTnVsbENvbm5lY3RvciwgW3tcbiAgICBrZXk6IFwiY29ubmVjdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb25uZWN0KCkgey8vXG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogTGlzdGVuIGZvciBhbiBldmVudCBvbiBhIGNoYW5uZWwgaW5zdGFuY2UuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImxpc3RlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsaXN0ZW4obmFtZSwgZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gbmV3IE51bGxDaGFubmVsKCk7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgY2hhbm5lbCBpbnN0YW5jZSBieSBuYW1lLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJjaGFubmVsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNoYW5uZWwobmFtZSkge1xuICAgICAgcmV0dXJuIG5ldyBOdWxsQ2hhbm5lbCgpO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIEdldCBhIHByaXZhdGUgY2hhbm5lbCBpbnN0YW5jZSBieSBuYW1lLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJwcml2YXRlQ2hhbm5lbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcml2YXRlQ2hhbm5lbChuYW1lKSB7XG4gICAgICByZXR1cm4gbmV3IE51bGxQcml2YXRlQ2hhbm5lbCgpO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIEdldCBhIHByZXNlbmNlIGNoYW5uZWwgaW5zdGFuY2UgYnkgbmFtZS5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwicHJlc2VuY2VDaGFubmVsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByZXNlbmNlQ2hhbm5lbChuYW1lKSB7XG4gICAgICByZXR1cm4gbmV3IE51bGxQcmVzZW5jZUNoYW5uZWwoKTtcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBMZWF2ZSB0aGUgZ2l2ZW4gY2hhbm5lbCwgYXMgd2VsbCBhcyBpdHMgcHJpdmF0ZSBhbmQgcHJlc2VuY2UgdmFyaWFudHMuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImxlYXZlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxlYXZlKG5hbWUpIHsvL1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIExlYXZlIHRoZSBnaXZlbiBjaGFubmVsLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJsZWF2ZUNoYW5uZWxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbGVhdmVDaGFubmVsKG5hbWUpIHsvL1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgc29ja2V0IElEIGZvciB0aGUgY29ubmVjdGlvbi5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwic29ja2V0SWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc29ja2V0SWQoKSB7XG4gICAgICByZXR1cm4gJ2Zha2Utc29ja2V0LWlkJztcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBEaXNjb25uZWN0IHRoZSBjb25uZWN0aW9uLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJkaXNjb25uZWN0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRpc2Nvbm5lY3QoKSB7Ly9cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTnVsbENvbm5lY3Rvcjtcbn0oQ29ubmVjdG9yKTtcblxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdGhlIHByaW1hcnkgQVBJIGZvciBpbnRlcmFjdGluZyB3aXRoIGJyb2FkY2FzdGluZy5cclxuICovXG5cbnZhciBFY2hvID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IGNsYXNzIGluc3RhbmNlLlxyXG4gICAqL1xuICBmdW5jdGlvbiBFY2hvKG9wdGlvbnMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRWNobyk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuY29ubmVjdCgpO1xuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMud2l0aG91dEludGVyY2VwdG9ycykge1xuICAgICAgdGhpcy5yZWdpc3RlckludGVyY2VwdG9ycygpO1xuICAgIH1cbiAgfVxuICAvKipcclxuICAgKiBHZXQgYSBjaGFubmVsIGluc3RhbmNlIGJ5IG5hbWUuXHJcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoRWNobywgW3tcbiAgICBrZXk6IFwiY2hhbm5lbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjaGFubmVsKF9jaGFubmVsKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25uZWN0b3IuY2hhbm5lbChfY2hhbm5lbCk7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IGNvbm5lY3Rpb24uXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImNvbm5lY3RcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29ubmVjdCgpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuYnJvYWRjYXN0ZXIgPT0gJ3B1c2hlcicpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0b3IgPSBuZXcgUHVzaGVyQ29ubmVjdG9yKHRoaXMub3B0aW9ucyk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5icm9hZGNhc3RlciA9PSAnc29ja2V0LmlvJykge1xuICAgICAgICB0aGlzLmNvbm5lY3RvciA9IG5ldyBTb2NrZXRJb0Nvbm5lY3Rvcih0aGlzLm9wdGlvbnMpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuYnJvYWRjYXN0ZXIgPT0gJ251bGwnKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdG9yID0gbmV3IE51bGxDb25uZWN0b3IodGhpcy5vcHRpb25zKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5icm9hZGNhc3RlciA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdG9yID0gbmV3IHRoaXMub3B0aW9ucy5icm9hZGNhc3Rlcih0aGlzLm9wdGlvbnMpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcclxuICAgICAqIERpc2Nvbm5lY3QgZnJvbSB0aGUgRWNobyBzZXJ2ZXIuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImRpc2Nvbm5lY3RcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzY29ubmVjdCgpIHtcbiAgICAgIHRoaXMuY29ubmVjdG9yLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYSBwcmVzZW5jZSBjaGFubmVsIGluc3RhbmNlIGJ5IG5hbWUuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImpvaW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gam9pbihjaGFubmVsKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25uZWN0b3IucHJlc2VuY2VDaGFubmVsKGNoYW5uZWwpO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIExlYXZlIHRoZSBnaXZlbiBjaGFubmVsLCBhcyB3ZWxsIGFzIGl0cyBwcml2YXRlIGFuZCBwcmVzZW5jZSB2YXJpYW50cy5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwibGVhdmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbGVhdmUoY2hhbm5lbCkge1xuICAgICAgdGhpcy5jb25uZWN0b3IubGVhdmUoY2hhbm5lbCk7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogTGVhdmUgdGhlIGdpdmVuIGNoYW5uZWwuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImxlYXZlQ2hhbm5lbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsZWF2ZUNoYW5uZWwoY2hhbm5lbCkge1xuICAgICAgdGhpcy5jb25uZWN0b3IubGVhdmVDaGFubmVsKGNoYW5uZWwpO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIExpc3RlbiBmb3IgYW4gZXZlbnQgb24gYSBjaGFubmVsIGluc3RhbmNlLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJsaXN0ZW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbGlzdGVuKGNoYW5uZWwsIGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdG9yLmxpc3RlbihjaGFubmVsLCBldmVudCwgY2FsbGJhY2spO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIEdldCBhIHByaXZhdGUgY2hhbm5lbCBpbnN0YW5jZSBieSBuYW1lLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJwcml2YXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9wcml2YXRlKGNoYW5uZWwpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rvci5wcml2YXRlQ2hhbm5lbChjaGFubmVsKTtcbiAgICB9XG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYSBwcml2YXRlIGVuY3J5cHRlZCBjaGFubmVsIGluc3RhbmNlIGJ5IG5hbWUuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImVuY3J5cHRlZFByaXZhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5jcnlwdGVkUHJpdmF0ZShjaGFubmVsKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25uZWN0b3IuZW5jcnlwdGVkUHJpdmF0ZUNoYW5uZWwoY2hhbm5lbCk7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBTb2NrZXQgSUQgZm9yIHRoZSBjb25uZWN0aW9uLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJzb2NrZXRJZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzb2NrZXRJZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rvci5zb2NrZXRJZCgpO1xuICAgIH1cbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyIDNyZCBwYXJ0eSByZXF1ZXN0IGludGVyY2VwdGlvcnMuIFRoZXNlIGFyZSB1c2VkIHRvIGF1dG9tYXRpY2FsbHlcclxuICAgICAqIHNlbmQgYSBjb25uZWN0aW9ucyBzb2NrZXQgaWQgdG8gYSBMYXJhdmVsIGFwcCB3aXRoIGEgWC1Tb2NrZXQtSWQgaGVhZGVyLlxyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJyZWdpc3RlckludGVyY2VwdG9yc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWdpc3RlckludGVyY2VwdG9ycygpIHtcbiAgICAgIGlmICh0eXBlb2YgVnVlID09PSAnZnVuY3Rpb24nICYmIFZ1ZS5odHRwKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJWdWVSZXF1ZXN0SW50ZXJjZXB0b3IoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBheGlvcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyQXhpb3NSZXF1ZXN0SW50ZXJjZXB0b3IoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBqUXVlcnkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlcmpRdWVyeUFqYXhTZXR1cCgpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyIGEgVnVlIEhUVFAgaW50ZXJjZXB0b3IgdG8gYWRkIHRoZSBYLVNvY2tldC1JRCBoZWFkZXIuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInJlZ2lzdGVyVnVlUmVxdWVzdEludGVyY2VwdG9yXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlZ2lzdGVyVnVlUmVxdWVzdEludGVyY2VwdG9yKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgVnVlLmh0dHAuaW50ZXJjZXB0b3JzLnB1c2goZnVuY3Rpb24gKHJlcXVlc3QsIG5leHQpIHtcbiAgICAgICAgaWYgKF90aGlzLnNvY2tldElkKCkpIHtcbiAgICAgICAgICByZXF1ZXN0LmhlYWRlcnMuc2V0KCdYLVNvY2tldC1JRCcsIF90aGlzLnNvY2tldElkKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV4dCgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXIgYW4gQXhpb3MgSFRUUCBpbnRlcmNlcHRvciB0byBhZGQgdGhlIFgtU29ja2V0LUlEIGhlYWRlci5cclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwicmVnaXN0ZXJBeGlvc1JlcXVlc3RJbnRlcmNlcHRvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZWdpc3RlckF4aW9zUmVxdWVzdEludGVyY2VwdG9yKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIGF4aW9zLmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZShmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgIGlmIChfdGhpczIuc29ja2V0SWQoKSkge1xuICAgICAgICAgIGNvbmZpZy5oZWFkZXJzWydYLVNvY2tldC1JZCddID0gX3RoaXMyLnNvY2tldElkKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXIgalF1ZXJ5IEFqYXhQcmVmaWx0ZXIgdG8gYWRkIHRoZSBYLVNvY2tldC1JRCBoZWFkZXIuXHJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcInJlZ2lzdGVyalF1ZXJ5QWpheFNldHVwXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlZ2lzdGVyalF1ZXJ5QWpheFNldHVwKCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIGlmICh0eXBlb2YgalF1ZXJ5LmFqYXggIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgalF1ZXJ5LmFqYXhQcmVmaWx0ZXIoZnVuY3Rpb24gKG9wdGlvbnMsIG9yaWdpbmFsT3B0aW9ucywgeGhyKSB7XG4gICAgICAgICAgaWYgKF90aGlzMy5zb2NrZXRJZCgpKSB7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1Tb2NrZXQtSWQnLCBfdGhpczMuc29ja2V0SWQoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRWNobztcbn0oKTtcblxuZXhwb3J0IHsgQ2hhbm5lbCwgRWNobyBhcyBkZWZhdWx0IH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/laravel-echo/dist/echo.js\n");

/***/ }),

/***/ "./node_modules/lodash/lodash.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/lodash.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {


/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZXNvdXJjZXMvc2Fzcy9hcHAuc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvc2Fzcy9hcHAuc2Nzcz9hODBiIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./resources/sass/app.scss\n");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0JBQXNCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQ0FBc0M7O0FBRXRDO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcz81Y2IzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/process/browser.js\n");

/***/ }),

/***/ "./node_modules/pusher-js/dist/web/pusher.js":
/*!***************************************************!*\
  !*** ./node_modules/pusher-js/dist/web/pusher.js ***!
  \***************************************************/
/***/ ((module) => {


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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
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
/******/ 			"/js/app": 0,
/******/ 			"css/app": 0
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
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/sass/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.7.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/var FONT_COLOR="#2d353c",FONT_FAMILY="Open Sans, Helvetica Neue,Helvetica,Arial,sans-serif",FONT_WEIGHT="600",FONT_SIZE="12px",COLOR_BLUE="#348fe2",COLOR_BLUE_LIGHTER="#67abe9",COLOR_BLUE_DARKER="#276baa",COLOR_BLUE_TRANSPARENT_1="rgba(52, 143, 226, 0.1)",COLOR_BLUE_TRANSPARENT_2="rgba(52, 143, 226, 0.2)",COLOR_BLUE_TRANSPARENT_3="rgba(52, 143, 226, 0.3)",COLOR_BLUE_TRANSPARENT_4="rgba(52, 143, 226, 0.4)",COLOR_BLUE_TRANSPARENT_5="rgba(52, 143, 226, 0.5)",COLOR_BLUE_TRANSPARENT_6="rgba(52, 143, 226, 0.6)",COLOR_BLUE_TRANSPARENT_7="rgba(52, 143, 226, 0.7)",COLOR_BLUE_TRANSPARENT_8="rgba(52, 143, 226, 0.8)",COLOR_BLUE_TRANSPARENT_9="rgba(52, 143, 226, 0.9)",COLOR_AQUA="#5AC8FA",COLOR_AQUA_LIGHTER="#77c8e0",COLOR_AQUA_DARKER="#3789a1",COLOR_AQUA_TRANSPARENT_1="rgba(73, 182, 214, 0.1)",COLOR_AQUA_TRANSPARENT_2="rgba(73, 182, 214, 0.2)",COLOR_AQUA_TRANSPARENT_3="rgba(73, 182, 214, 0.3)",COLOR_AQUA_TRANSPARENT_4="rgba(73, 182, 214, 0.4)",COLOR_AQUA_TRANSPARENT_5="rgba(73, 182, 214, 0.5)",COLOR_AQUA_TRANSPARENT_6="rgba(73, 182, 214, 0.6)",COLOR_AQUA_TRANSPARENT_7="rgba(73, 182, 214, 0.7)",COLOR_AQUA_TRANSPARENT_8="rgba(73, 182, 214, 0.8)",COLOR_AQUA_TRANSPARENT_9="rgba(73, 182, 214, 0.9)",COLOR_GREEN="#00ACAC",COLOR_GREEN_LIGHTER="#65bf65",COLOR_GREEN_DARKER="#267f26",COLOR_GREEN_TRANSPARENT_1="rgba(0, 172, 172, 0.1)",COLOR_GREEN_TRANSPARENT_2="rgba(0, 172, 172, 0.2)",COLOR_GREEN_TRANSPARENT_3="rgba(0, 172, 172, 0.3)",COLOR_GREEN_TRANSPARENT_4="rgba(0, 172, 172, 0.4)",COLOR_GREEN_TRANSPARENT_5="rgba(0, 172, 172, 0.5)",COLOR_GREEN_TRANSPARENT_6="rgba(0, 172, 172, 0.6)",COLOR_GREEN_TRANSPARENT_7="rgba(0, 172, 172, 0.7)",COLOR_GREEN_TRANSPARENT_8="rgba(0, 172, 172, 0.8)",COLOR_GREEN_TRANSPARENT_9="rgba(0, 172, 172, 0.9)",COLOR_YELLOW="#ffd900",COLOR_YELLOW_LIGHTER="#ffe340",COLOR_YELLOW_DARKER="#bfa300",COLOR_YELLOW_TRANSPARENT_1="rgba(255, 217, 0, 0.1)",COLOR_YELLOW_TRANSPARENT_2="rgba(255, 217, 0, 0.2)",COLOR_YELLOW_TRANSPARENT_3="rgba(255, 217, 0, 0.3)",COLOR_YELLOW_TRANSPARENT_4="rgba(255, 217, 0, 0.4)",COLOR_YELLOW_TRANSPARENT_5="rgba(255, 217, 0, 0.5)",COLOR_YELLOW_TRANSPARENT_6="rgba(255, 217, 0, 0.6)",COLOR_YELLOW_TRANSPARENT_7="rgba(255, 217, 0, 0.7)",COLOR_YELLOW_TRANSPARENT_8="rgba(255, 217, 0, 0.8)",COLOR_YELLOW_TRANSPARENT_9="rgba(255, 217, 0, 0.9)",COLOR_ORANGE="#f59c1a",COLOR_ORANGE_LIGHTER="#f8b553",COLOR_ORANGE_DARKER="#b87514",COLOR_ORANGE_TRANSPARENT_1="rgba(245, 156, 26, 0.1)",COLOR_ORANGE_TRANSPARENT_2="rgba(245, 156, 26, 0.2)",COLOR_ORANGE_TRANSPARENT_3="rgba(245, 156, 26, 0.3)",COLOR_ORANGE_TRANSPARENT_4="rgba(245, 156, 26, 0.4)",COLOR_ORANGE_TRANSPARENT_5="rgba(245, 156, 26, 0.5)",COLOR_ORANGE_TRANSPARENT_6="rgba(245, 156, 26, 0.6)",COLOR_ORANGE_TRANSPARENT_7="rgba(245, 156, 26, 0.7)",COLOR_ORANGE_TRANSPARENT_8="rgba(245, 156, 26, 0.8)",COLOR_ORANGE_TRANSPARENT_9="rgba(245, 156, 26, 0.9)",COLOR_PURPLE="#727cb6",COLOR_PURPLE_LIGHTER="#959dc8",COLOR_PURPLE_DARKER="#565d89",COLOR_PURPLE_TRANSPARENT_1="rgba(114, 124, 182, 0.1)",COLOR_PURPLE_TRANSPARENT_2="rgba(114, 124, 182, 0.2)",COLOR_PURPLE_TRANSPARENT_3="rgba(114, 124, 182, 0.3)",COLOR_PURPLE_TRANSPARENT_4="rgba(114, 124, 182, 0.4)",COLOR_PURPLE_TRANSPARENT_5="rgba(114, 124, 182, 0.5)",COLOR_PURPLE_TRANSPARENT_6="rgba(114, 124, 182, 0.6)",COLOR_PURPLE_TRANSPARENT_7="rgba(114, 124, 182, 0.7)",COLOR_PURPLE_TRANSPARENT_8="rgba(114, 124, 182, 0.8)",COLOR_PURPLE_TRANSPARENT_9="rgba(114, 124, 182, 0.9)",COLOR_RED="#ff5b57",COLOR_RED_LIGHTER="#ff8481",COLOR_RED_DARKER="#bf4441",COLOR_RED_TRANSPARENT_1="rgba(255, 91, 87, 0.1)",COLOR_RED_TRANSPARENT_2="rgba(255, 91, 87, 0.2)",COLOR_RED_TRANSPARENT_3="rgba(255, 91, 87, 0.3)",COLOR_RED_TRANSPARENT_4="rgba(255, 91, 87, 0.4)",COLOR_RED_TRANSPARENT_5="rgba(255, 91, 87, 0.5)",COLOR_RED_TRANSPARENT_6="rgba(255, 91, 87, 0.6)",COLOR_RED_TRANSPARENT_7="rgba(255, 91, 87, 0.7)",COLOR_RED_TRANSPARENT_8="rgba(255, 91, 87, 0.8)",COLOR_RED_TRANSPARENT_9="rgba(255, 91, 87, 0.9)",COLOR_GREY="#b6c2c9",COLOR_GREY_LIGHTER="#c8d1d7",COLOR_GREY_DARKER="#899297",COLOR_GREY_TRANSPARENT_1="rgba(182, 194, 201, 0.1)",COLOR_GREY_TRANSPARENT_2="rgba(182, 194, 201, 0.2)",COLOR_GREY_TRANSPARENT_3="rgba(182, 194, 201, 0.3)",COLOR_GREY_TRANSPARENT_4="rgba(182, 194, 201, 0.4)",COLOR_GREY_TRANSPARENT_5="rgba(182, 194, 201, 0.5)",COLOR_GREY_TRANSPARENT_6="rgba(182, 194, 201, 0.6)",COLOR_GREY_TRANSPARENT_7="rgba(182, 194, 201, 0.7)",COLOR_GREY_TRANSPARENT_8="rgba(182, 194, 201, 0.8)",COLOR_GREY_TRANSPARENT_9="rgba(182, 194, 201, 0.9)",COLOR_SILVER="#b6c2c9",COLOR_SILVER_LIGHTER="#c8d1d7",COLOR_SILVER_DARKER="#899297",COLOR_SILVER_TRANSPARENT_1="rgba(182, 194, 201, 0.1)",COLOR_SILVER_TRANSPARENT_2="rgba(182, 194, 201, 0.2)",COLOR_SILVER_TRANSPARENT_3="rgba(182, 194, 201, 0.3)",COLOR_SILVER_TRANSPARENT_4="rgba(182, 194, 201, 0.4)",COLOR_SILVER_TRANSPARENT_5="rgba(182, 194, 201, 0.5)",COLOR_SILVER_TRANSPARENT_6="rgba(182, 194, 201, 0.6)",COLOR_SILVER_TRANSPARENT_7="rgba(182, 194, 201, 0.7)",COLOR_SILVER_TRANSPARENT_8="rgba(182, 194, 201, 0.8)",COLOR_SILVER_TRANSPARENT_9="rgba(182, 194, 201, 0.9)",COLOR_MUTED="#627884",COLOR_MUTED_LIGHTER="#8999a3",COLOR_MUTED_DARKER="#495a63",COLOR_MUTED_TRANSPARENT_1="rgba(98, 120, 132, 0.1)",COLOR_MUTED_TRANSPARENT_2="rgba(98, 120, 132, 0.2)",COLOR_MUTED_TRANSPARENT_3="rgba(98, 120, 132, 0.3)",COLOR_MUTED_TRANSPARENT_4="rgba(98, 120, 132, 0.4)",COLOR_MUTED_TRANSPARENT_5="rgba(98, 120, 132, 0.5)",COLOR_MUTED_TRANSPARENT_6="rgba(98, 120, 132, 0.6)",COLOR_MUTED_TRANSPARENT_7="rgba(98, 120, 132, 0.7)",COLOR_MUTED_TRANSPARENT_8="rgba(98, 120, 132, 0.8)",COLOR_MUTED_TRANSPARENT_9="rgba(98, 120, 132, 0.9)",COLOR_DARK="#2d353c",COLOR_DARK_LIGHTER="#575d63",COLOR_DARK_DARKER="#242a30",COLOR_DARK_TRANSPARENT_1="rgba(45, 53, 60, 0.1)",COLOR_DARK_TRANSPARENT_2="rgba(45, 53, 60, 0.2)",COLOR_DARK_TRANSPARENT_3="rgba(45, 53, 60, 0.3)",COLOR_DARK_TRANSPARENT_4="rgba(45, 53, 60, 0.4)",COLOR_DARK_TRANSPARENT_5="rgba(45, 53, 60, 0.5)",COLOR_DARK_TRANSPARENT_6="rgba(45, 53, 60, 0.6)",COLOR_DARK_TRANSPARENT_7="rgba(45, 53, 60, 0.7)",COLOR_DARK_TRANSPARENT_8="rgba(45, 53, 60, 0.8)",COLOR_DARK_TRANSPARENT_9="rgba(45, 53, 60, 0.9)",COLOR_BLACK="#000000",COLOR_BLACK_LIGHTER="#404040",COLOR_BLACK_DARKER="#000000",COLOR_BLACK_TRANSPARENT_1="rgba(0, 0, 0, 0.1)",COLOR_BLACK_TRANSPARENT_2="rgba(0, 0, 0, 0.2)",COLOR_BLACK_TRANSPARENT_3="rgba(0, 0, 0, 0.3)",COLOR_BLACK_TRANSPARENT_4="rgba(0, 0, 0, 0.4)",COLOR_BLACK_TRANSPARENT_5="rgba(0, 0, 0, 0.5)",COLOR_BLACK_TRANSPARENT_6="rgba(0, 0, 0, 0.6)",COLOR_BLACK_TRANSPARENT_7="rgba(0, 0, 0, 0.7)",COLOR_BLACK_TRANSPARENT_8="rgba(0, 0, 0, 0.8)",COLOR_BLACK_TRANSPARENT_9="rgba(0, 0, 0, 0.9)",COLOR_WHITE="#FFFFFF",COLOR_WHITE_TRANSPARENT_1="rgba(255, 255, 255, 0.1)",COLOR_WHITE_TRANSPARENT_2="rgba(255, 255, 255, 0.2)",COLOR_WHITE_TRANSPARENT_3="rgba(255, 255, 255, 0.3)",COLOR_WHITE_TRANSPARENT_4="rgba(255, 255, 255, 0.4)",COLOR_WHITE_TRANSPARENT_5="rgba(255, 255, 255, 0.5)",COLOR_WHITE_TRANSPARENT_6="rgba(255, 255, 255, 0.6)",COLOR_WHITE_TRANSPARENT_7="rgba(255, 255, 255, 0.7)",COLOR_WHITE_TRANSPARENT_8="rgba(255, 255, 255, 0.8)",COLOR_WHITE_TRANSPARENT_9="rgba(255, 255, 255, 0.9)",COLOR_INDIGO="#8753de",COLOR_INDIGO_LIGHTER="#a57ee6",COLOR_INDIGO_DARKER="#653ea7",COLOR_INDIGO_TRANSPARENT_1="rgba(135, 83, 222, 0.1)",COLOR_INDIGO_TRANSPARENT_2="rgba(135, 83, 222, 0.2)",COLOR_INDIGO_TRANSPARENT_3="rgba(135, 83, 222, 0.3)",COLOR_INDIGO_TRANSPARENT_4="rgba(135, 83, 222, 0.4)",COLOR_INDIGO_TRANSPARENT_5="rgba(135, 83, 222, 0.5)",COLOR_INDIGO_TRANSPARENT_6="rgba(135, 83, 222, 0.6)",COLOR_INDIGO_TRANSPARENT_7="rgba(135, 83, 222, 0.7)",COLOR_INDIGO_TRANSPARENT_8="rgba(135, 83, 222, 0.8)",COLOR_INDIGO_TRANSPARENT_9="rgba(135, 83, 222, 0.9)",COLOR_PINK="#fb5597",COLOR_PINK_LIGHTER="#fc80b1",COLOR_PINK_DARKER="#bc4071",COLOR_PINK_TRANSPARENT_1="rgba(251, 85, 151, 0.1)",COLOR_PINK_TRANSPARENT_2="rgba(251, 85, 151, 0.2)",COLOR_PINK_TRANSPARENT_3="rgba(251, 85, 151, 0.3)",COLOR_PINK_TRANSPARENT_4="rgba(251, 85, 151, 0.4)",COLOR_PINK_TRANSPARENT_5="rgba(251, 85, 151, 0.5)",COLOR_PINK_TRANSPARENT_6="rgba(251, 85, 151, 0.6)",COLOR_PINK_TRANSPARENT_7="rgba(251, 85, 151, 0.7)",COLOR_PINK_TRANSPARENT_8="rgba(251, 85, 151, 0.8)",COLOR_PINK_TRANSPARENT_9="rgba(251, 85, 151, 0.9)",COLOR_LIME="#90ca4b",COLOR_LIME_LIGHTER="#acd778",COLOR_LIME_DARKER="#6c9838",COLOR_LIME_TRANSPARENT_1="rgba(144, 202, 75, 0.1)",COLOR_LIME_TRANSPARENT_2="rgba(144, 202, 75, 0.2)",COLOR_LIME_TRANSPARENT_3="rgba(144, 202, 75, 0.3)",COLOR_LIME_TRANSPARENT_4="rgba(144, 202, 75, 0.4)",COLOR_LIME_TRANSPARENT_5="rgba(144, 202, 75, 0.5)",COLOR_LIME_TRANSPARENT_6="rgba(144, 202, 75, 0.6)",COLOR_LIME_TRANSPARENT_7="rgba(144, 202, 75, 0.7)",COLOR_LIME_TRANSPARENT_8="rgba(144, 202, 75, 0.8)",COLOR_LIME_TRANSPARENT_9="rgba(144, 202, 75, 0.9)",COLOR_TEAL="#00acac",COLOR_TEAL_LIGHTER="#40c1c1",COLOR_TEAL_DARKER="#008181",COLOR_TEAL_TRANSPARENT_1="rgba(0, 172, 172, 0.1)",COLOR_TEAL_TRANSPARENT_2="rgba(0, 172, 172, 0.2)",COLOR_TEAL_TRANSPARENT_3="rgba(0, 172, 172, 0.3)",COLOR_TEAL_TRANSPARENT_4="rgba(0, 172, 172, 0.4)",COLOR_TEAL_TRANSPARENT_5="rgba(0, 172, 172, 0.5)",COLOR_TEAL_TRANSPARENT_6="rgba(0, 172, 172, 0.6)",COLOR_TEAL_TRANSPARENT_7="rgba(0, 172, 172, 0.7)",COLOR_TEAL_TRANSPARENT_8="rgba(0, 172, 172, 0.8)",COLOR_TEAL_TRANSPARENT_9="rgba(0, 172, 172, 0.9)";
/*
 * Gritter for jQuery
 * http://www.boedesign.com/
 *
 * Copyright (c) 2012 Jordan Boesch
 * Dual licensed under the MIT and GPL licenses.
 *
 * Date: February 24, 2012
 * Version: 1.7.4
 */

(function($){
 	
	/**
	* Set it up as an object under the jQuery namespace
	*/
	$.gritter = {};
	
	/**
	* Set up global options that the user can over-ride
	*/
	$.gritter.options = {
		position: '',
		class_name: '', // could be set to 'gritter-light' to use white notifications
		fade_in_speed: 'medium', // how fast notifications fade in
		fade_out_speed: 1000, // how fast the notices fade out
		time: 6000 // hang on the screen for...
	}
	
	/**
	* Add a gritter notification to the screen
	* @see Gritter#add();
	*/
	$.gritter.add = function(params){

		try {
			return Gritter.add(params || {});
		} catch(e) {
		
			var err = 'Gritter Error: ' + e;
			(typeof(console) != 'undefined' && console.error) ? 
				console.error(err, params) : 
				alert(err);
				
		}
		
	}
	
	/**
	* Remove a gritter notification from the screen
	* @see Gritter#removeSpecific();
	*/
	$.gritter.remove = function(id, params){
		Gritter.removeSpecific(id, params || {});
	}
	
	/**
	* Remove all notifications
	* @see Gritter#stop();
	*/
	$.gritter.removeAll = function(params){
		Gritter.stop(params || {});
	}
	
	/**
	* Big fat Gritter object
	* @constructor (not really since its object literal)
	*/
	var Gritter = {
		
		// Public - options to over-ride with $.gritter.options in "add"
		position: '',
		fade_in_speed: '',
		fade_out_speed: '',
		time: '',
		
		// Private - no touchy the private parts
		_custom_timer: 0,
		_item_count: 0,
		_is_setup: 0,
		_tpl_close: '<a class="gritter-close" href="#" tabindex="1">Close Notification</a>',
		_tpl_title: '<span class="gritter-title">[[title]]</span>',
		_tpl_item: '<div id="gritter-item-[[number]]" class="gritter-item-wrapper [[item_class]]" style="display:none" role="alert"><div class="gritter-top"></div><div class="gritter-item">[[close]][[image]]<div class="[[class_name]]">[[title]]<p>[[text]]</p></div><div style="clear:both"></div></div><div class="gritter-bottom"></div></div>',
		_tpl_wrap: '<div id="gritter-notice-wrapper"></div>',
		
		/**
		* Add a gritter notification to the screen
		* @param {Object} params The object that contains all the options for drawing the notification
		* @return {Integer} The specific numeric id to that gritter notification
		*/
		add: function(params){
			// Handle straight text
			if(typeof(params) == 'string'){
				params = {text:params};
			}

			// We might have some issues if we don't have a title or text!
			if(params.text === null){
				throw 'You must supply "text" parameter.'; 
			}
			
			// Check the options and set them once
			if(!this._is_setup){
				this._runSetup();
			}
			
			// Basics
			var title = params.title, 
				text = params.text,
				image = params.image || '',
				sticky = params.sticky || false,
				item_class = params.class_name || $.gritter.options.class_name,
				position = $.gritter.options.position,
				time_alive = params.time || '';

			this._verifyWrapper();
			
			this._item_count++;
			var number = this._item_count, 
				tmp = this._tpl_item;
			
			// Assign callbacks
			$(['before_open', 'after_open', 'before_close', 'after_close']).each(function(i, val){
				Gritter['_' + val + '_' + number] = ($.isFunction(params[val])) ? params[val] : function(){}
			});

			// Reset
			this._custom_timer = 0;
			
			// A custom fade time set
			if(time_alive){
				this._custom_timer = time_alive;
			}
			
			var image_str = (image != '') ? '<img src="' + image + '" class="gritter-image" />' : '',
				class_name = (image != '') ? 'gritter-with-image' : 'gritter-without-image';
			
			// String replacements on the template
			if(title){
				title = this._str_replace('[[title]]',title,this._tpl_title);
			}else{
				title = '';
			}
			
			tmp = this._str_replace(
				['[[title]]', '[[text]]', '[[close]]', '[[image]]', '[[number]]', '[[class_name]]', '[[item_class]]'],
				[title, text, this._tpl_close, image_str, this._item_count, class_name, item_class], tmp
			);

			// If it's false, don't show another gritter message
			if(this['_before_open_' + number]() === false){
				return false;
			}

			$('#gritter-notice-wrapper').addClass(position).append(tmp);
			
			var item = $('#gritter-item-' + this._item_count);
			
			item.fadeIn(this.fade_in_speed, function(){
				Gritter['_after_open_' + number]($(this));
			});
			
			if(!sticky){
				this._setFadeTimer(item, number);
			}
			
			// Bind the hover/unhover states
			$(item).bind('mouseenter mouseleave', function(event){
				if(event.type == 'mouseenter'){
					if(!sticky){ 
						Gritter._restoreItemIfFading($(this), number);
					}
				}
				else {
					if(!sticky){
						Gritter._setFadeTimer($(this), number);
					}
				}
				Gritter._hoverState($(this), event.type);
			});
			
			// Clicking (X) makes the perdy thing close
			$(item).find('.gritter-close').click(function(){
				Gritter.removeSpecific(number, {}, null, true);
				return false;
			});
			
			return number;
		
		},
		
		/**
		* If we don't have any more gritter notifications, get rid of the wrapper using this check
		* @private
		* @param {Integer} unique_id The ID of the element that was just deleted, use it for a callback
		* @param {Object} e The jQuery element that we're going to perform the remove() action on
		* @param {Boolean} manual_close Did we close the gritter dialog with the (X) button
		*/
		_countRemoveWrapper: function(unique_id, e, manual_close){
			
			// Remove it then run the callback function
			e.remove();
			this['_after_close_' + unique_id](e, manual_close);
			
			// Check if the wrapper is empty, if it is.. remove the wrapper
			if($('.gritter-item-wrapper').length == 0){
				$('#gritter-notice-wrapper').remove();
			}
		
		},
		
		/**
		* Fade out an element after it's been on the screen for x amount of time
		* @private
		* @param {Object} e The jQuery element to get rid of
		* @param {Integer} unique_id The id of the element to remove
		* @param {Object} params An optional list of params to set fade speeds etc.
		* @param {Boolean} unbind_events Unbind the mouseenter/mouseleave events if they click (X)
		*/
		_fade: function(e, unique_id, params, unbind_events){

			var params = params || {},
				fade = (typeof(params.fade) != 'undefined') ? params.fade : true,
				fade_out_speed = params.speed || this.fade_out_speed,
				manual_close = unbind_events;

			this['_before_close_' + unique_id](e, manual_close);
			
			// If this is true, then we are coming from clicking the (X)
			if(unbind_events){
				e.unbind('mouseenter mouseleave');
			}
			
			// Fade it out or remove it
			if(fade){
			
				e.animate({
					opacity: 0
				}, fade_out_speed, function(){
					e.animate({ height: 0 }, 300, function(){
						Gritter._countRemoveWrapper(unique_id, e, manual_close);
					})
				})
				
			}
			else {
				
				this._countRemoveWrapper(unique_id, e);
				
			}
						
		},
		
		/**
		* Perform actions based on the type of bind (mouseenter, mouseleave) 
		* @private
		* @param {Object} e The jQuery element
		* @param {String} type The type of action we're performing: mouseenter or mouseleave
		*/
		_hoverState: function(e, type){
			
			// Change the border styles and add the (X) close button when you hover
			if(type == 'mouseenter'){
				
				e.addClass('hover');
				
				// Show close button
				e.find('.gritter-close').show();
						
			}
			// Remove the border styles and hide (X) close button when you mouse out
			else {
				
				e.removeClass('hover');
				
				// Hide close button
				e.find('.gritter-close').hide();
				
			}
			
		},
		
		/**
		* Remove a specific notification based on an ID
		* @param {Integer} unique_id The ID used to delete a specific notification
		* @param {Object} params A set of options passed in to determine how to get rid of it
		* @param {Object} e The jQuery element that we're "fading" then removing
		* @param {Boolean} unbind_events If we clicked on the (X) we set this to true to unbind mouseenter/mouseleave
		*/
		removeSpecific: function(unique_id, params, e, unbind_events){
			
			if(!e){
				var e = $('#gritter-item-' + unique_id);
			}

			// We set the fourth param to let the _fade function know to 
			// unbind the "mouseleave" event.  Once you click (X) there's no going back!
			this._fade(e, unique_id, params || {}, unbind_events);
			
		},
		
		/**
		* If the item is fading out and we hover over it, restore it!
		* @private
		* @param {Object} e The HTML element to remove
		* @param {Integer} unique_id The ID of the element
		*/
		_restoreItemIfFading: function(e, unique_id){
			
			clearTimeout(this['_int_id_' + unique_id]);
			e.stop().css({ opacity: '', height: '' });
			
		},
		
		/**
		* Setup the global options - only once
		* @private
		*/
		_runSetup: function(){
		
			for(opt in $.gritter.options){
				this[opt] = $.gritter.options[opt];
			}
			this._is_setup = 1;
			
		},
		
		/**
		* Set the notification to fade out after a certain amount of time
		* @private
		* @param {Object} item The HTML element we're dealing with
		* @param {Integer} unique_id The ID of the element
		*/
		_setFadeTimer: function(e, unique_id){
			
			var timer_str = (this._custom_timer) ? this._custom_timer : this.time;
			this['_int_id_' + unique_id] = setTimeout(function(){ 
				Gritter._fade(e, unique_id);
			}, timer_str);
		
		},
		
		/**
		* Bring everything to a halt
		* @param {Object} params A list of callback functions to pass when all notifications are removed
		*/  
		stop: function(params){
			
			// callbacks (if passed)
			var before_close = ($.isFunction(params.before_close)) ? params.before_close : function(){};
			var after_close = ($.isFunction(params.after_close)) ? params.after_close : function(){};
			
			var wrap = $('#gritter-notice-wrapper');
			before_close(wrap);
			wrap.fadeOut(function(){
				$(this).remove();
				after_close();
			});
		
		},
		
		/**
		* An extremely handy PHP function ported to JS, works well for templating
		* @private
		* @param {String/Array} search A list of things to search for
		* @param {String/Array} replace A list of things to replace the searches with
		* @return {String} sa The output
		*/  
		_str_replace: function(search, replace, subject, count){
		
			var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,
				f = [].concat(search),
				r = [].concat(replace),
				s = subject,
				ra = r instanceof Array, sa = s instanceof Array;
			s = [].concat(s);
			
			if(count){
				this.window[count] = 0;
			}
		
			for(i = 0, sl = s.length; i < sl; i++){
				
				if(s[i] === ''){
					continue;
				}
				
				for (j = 0, fl = f.length; j < fl; j++){
					
					temp = s[i] + '';
					repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
					s[i] = (temp).split(f[j]).join(repl);
					
					if(count && s[i] !== temp){
						this.window[count] += (temp.length-s[i].length) / f[j].length;
					}
					
				}
			}
			
			return sa ? s : s[0];
			
		},
		
		/**
		* A check to make sure we have something to wrap our notices with
		* @private
		*/  
		_verifyWrapper: function(){
		  
			if($('#gritter-notice-wrapper').length == 0){
				$('body').append(this._tpl_wrap);
			}
		
		}
		
	}
	
})(jQuery);

/*!
 DataTables 1.10.22
 ©2008-2020 SpryMedia Ltd - datatables.net/license
*/
(function(h){"function"===typeof define&&define.amd?define(["jquery"],function(E){return h(E,window,document)}):"object"===typeof exports?module.exports=function(E,H){E||(E=window);H||(H="undefined"!==typeof window?require("jquery"):require("jquery")(E));return h(H,E,E.document)}:h(jQuery,window,document)})(function(h,E,H,k){function $(a){var b,c,d={};h.each(a,function(e){if((b=e.match(/^([^A-Z]+?)([A-Z])/))&&-1!=="a aa ai ao as b fn i m o s ".indexOf(b[1]+" "))c=e.replace(b[0],b[2].toLowerCase()),
d[c]=e,"o"===b[1]&&$(a[e])});a._hungarianMap=d}function J(a,b,c){a._hungarianMap||$(a);var d;h.each(b,function(e){d=a._hungarianMap[e];if(d!==k&&(c||b[d]===k))"o"===d.charAt(0)?(b[d]||(b[d]={}),h.extend(!0,b[d],b[e]),J(a[d],b[d],c)):b[d]=b[e]})}function Ea(a){var b=n.defaults.oLanguage,c=b.sDecimal;c&&Fa(c);if(a){var d=a.sZeroRecords;!a.sEmptyTable&&(d&&"No data available in table"===b.sEmptyTable)&&F(a,a,"sZeroRecords","sEmptyTable");!a.sLoadingRecords&&(d&&"Loading..."===b.sLoadingRecords)&&F(a,
a,"sZeroRecords","sLoadingRecords");a.sInfoThousands&&(a.sThousands=a.sInfoThousands);(a=a.sDecimal)&&c!==a&&Fa(a)}}function gb(a){A(a,"ordering","bSort");A(a,"orderMulti","bSortMulti");A(a,"orderClasses","bSortClasses");A(a,"orderCellsTop","bSortCellsTop");A(a,"order","aaSorting");A(a,"orderFixed","aaSortingFixed");A(a,"paging","bPaginate");A(a,"pagingType","sPaginationType");A(a,"pageLength","iDisplayLength");A(a,"searching","bFilter");"boolean"===typeof a.sScrollX&&(a.sScrollX=a.sScrollX?"100%":
"");"boolean"===typeof a.scrollX&&(a.scrollX=a.scrollX?"100%":"");if(a=a.aoSearchCols)for(var b=0,c=a.length;b<c;b++)a[b]&&J(n.models.oSearch,a[b])}function hb(a){A(a,"orderable","bSortable");A(a,"orderData","aDataSort");A(a,"orderSequence","asSorting");A(a,"orderDataType","sortDataType");var b=a.aDataSort;"number"===typeof b&&!Array.isArray(b)&&(a.aDataSort=[b])}function ib(a){if(!n.__browser){var b={};n.__browser=b;var c=h("<div/>").css({position:"fixed",top:0,left:-1*h(E).scrollLeft(),height:1,
width:1,overflow:"hidden"}).append(h("<div/>").css({position:"absolute",top:1,left:1,width:100,overflow:"scroll"}).append(h("<div/>").css({width:"100%",height:10}))).appendTo("body"),d=c.children(),e=d.children();b.barWidth=d[0].offsetWidth-d[0].clientWidth;b.bScrollOversize=100===e[0].offsetWidth&&100!==d[0].clientWidth;b.bScrollbarLeft=1!==Math.round(e.offset().left);b.bBounding=c[0].getBoundingClientRect().width?!0:!1;c.remove()}h.extend(a.oBrowser,n.__browser);a.oScroll.iBarWidth=n.__browser.barWidth}
function jb(a,b,c,d,e,f){var g,j=!1;c!==k&&(g=c,j=!0);for(;d!==e;)a.hasOwnProperty(d)&&(g=j?b(g,a[d],d,a):a[d],j=!0,d+=f);return g}function Ga(a,b){var c=n.defaults.column,d=a.aoColumns.length,c=h.extend({},n.models.oColumn,c,{nTh:b?b:H.createElement("th"),sTitle:c.sTitle?c.sTitle:b?b.innerHTML:"",aDataSort:c.aDataSort?c.aDataSort:[d],mData:c.mData?c.mData:d,idx:d});a.aoColumns.push(c);c=a.aoPreSearchCols;c[d]=h.extend({},n.models.oSearch,c[d]);la(a,d,h(b).data())}function la(a,b,c){var b=a.aoColumns[b],
d=a.oClasses,e=h(b.nTh);if(!b.sWidthOrig){b.sWidthOrig=e.attr("width")||null;var f=(e.attr("style")||"").match(/width:\s*(\d+[pxem%]+)/);f&&(b.sWidthOrig=f[1])}c!==k&&null!==c&&(hb(c),J(n.defaults.column,c,!0),c.mDataProp!==k&&!c.mData&&(c.mData=c.mDataProp),c.sType&&(b._sManualType=c.sType),c.className&&!c.sClass&&(c.sClass=c.className),c.sClass&&e.addClass(c.sClass),h.extend(b,c),F(b,c,"sWidth","sWidthOrig"),c.iDataSort!==k&&(b.aDataSort=[c.iDataSort]),F(b,c,"aDataSort"));var g=b.mData,j=S(g),i=
b.mRender?S(b.mRender):null,c=function(a){return"string"===typeof a&&-1!==a.indexOf("@")};b._bAttrSrc=h.isPlainObject(g)&&(c(g.sort)||c(g.type)||c(g.filter));b._setter=null;b.fnGetData=function(a,b,c){var d=j(a,b,k,c);return i&&b?i(d,b,a,c):d};b.fnSetData=function(a,b,c){return N(g)(a,b,c)};"number"!==typeof g&&(a._rowReadObject=!0);a.oFeatures.bSort||(b.bSortable=!1,e.addClass(d.sSortableNone));a=-1!==h.inArray("asc",b.asSorting);c=-1!==h.inArray("desc",b.asSorting);!b.bSortable||!a&&!c?(b.sSortingClass=
d.sSortableNone,b.sSortingClassJUI=""):a&&!c?(b.sSortingClass=d.sSortableAsc,b.sSortingClassJUI=d.sSortJUIAscAllowed):!a&&c?(b.sSortingClass=d.sSortableDesc,b.sSortingClassJUI=d.sSortJUIDescAllowed):(b.sSortingClass=d.sSortable,b.sSortingClassJUI=d.sSortJUI)}function aa(a){if(!1!==a.oFeatures.bAutoWidth){var b=a.aoColumns;Ha(a);for(var c=0,d=b.length;c<d;c++)b[c].nTh.style.width=b[c].sWidth}b=a.oScroll;(""!==b.sY||""!==b.sX)&&ma(a);t(a,null,"column-sizing",[a])}function ba(a,b){var c=na(a,"bVisible");
return"number"===typeof c[b]?c[b]:null}function ca(a,b){var c=na(a,"bVisible"),c=h.inArray(b,c);return-1!==c?c:null}function W(a){var b=0;h.each(a.aoColumns,function(a,d){d.bVisible&&"none"!==h(d.nTh).css("display")&&b++});return b}function na(a,b){var c=[];h.map(a.aoColumns,function(a,e){a[b]&&c.push(e)});return c}function Ia(a){var b=a.aoColumns,c=a.aoData,d=n.ext.type.detect,e,f,g,j,i,h,l,q,u;e=0;for(f=b.length;e<f;e++)if(l=b[e],u=[],!l.sType&&l._sManualType)l.sType=l._sManualType;else if(!l.sType){g=
0;for(j=d.length;g<j;g++){i=0;for(h=c.length;i<h;i++){u[i]===k&&(u[i]=B(a,i,e,"type"));q=d[g](u[i],a);if(!q&&g!==d.length-1)break;if("html"===q)break}if(q){l.sType=q;break}}l.sType||(l.sType="string")}}function kb(a,b,c,d){var e,f,g,j,i,m,l=a.aoColumns;if(b)for(e=b.length-1;0<=e;e--){m=b[e];var q=m.targets!==k?m.targets:m.aTargets;Array.isArray(q)||(q=[q]);f=0;for(g=q.length;f<g;f++)if("number"===typeof q[f]&&0<=q[f]){for(;l.length<=q[f];)Ga(a);d(q[f],m)}else if("number"===typeof q[f]&&0>q[f])d(l.length+
q[f],m);else if("string"===typeof q[f]){j=0;for(i=l.length;j<i;j++)("_all"==q[f]||h(l[j].nTh).hasClass(q[f]))&&d(j,m)}}if(c){e=0;for(a=c.length;e<a;e++)d(e,c[e])}}function O(a,b,c,d){var e=a.aoData.length,f=h.extend(!0,{},n.models.oRow,{src:c?"dom":"data",idx:e});f._aData=b;a.aoData.push(f);for(var g=a.aoColumns,j=0,i=g.length;j<i;j++)g[j].sType=null;a.aiDisplayMaster.push(e);b=a.rowIdFn(b);b!==k&&(a.aIds[b]=f);(c||!a.oFeatures.bDeferRender)&&Ja(a,e,c,d);return e}function oa(a,b){var c;b instanceof
h||(b=h(b));return b.map(function(b,e){c=Ka(a,e);return O(a,c.data,e,c.cells)})}function B(a,b,c,d){var e=a.iDraw,f=a.aoColumns[c],g=a.aoData[b]._aData,j=f.sDefaultContent,i=f.fnGetData(g,d,{settings:a,row:b,col:c});if(i===k)return a.iDrawError!=e&&null===j&&(K(a,0,"Requested unknown parameter "+("function"==typeof f.mData?"{function}":"'"+f.mData+"'")+" for row "+b+", column "+c,4),a.iDrawError=e),j;if((i===g||null===i)&&null!==j&&d!==k)i=j;else if("function"===typeof i)return i.call(g);return null===
i&&"display"==d?"":i}function lb(a,b,c,d){a.aoColumns[c].fnSetData(a.aoData[b]._aData,d,{settings:a,row:b,col:c})}function La(a){return h.map(a.match(/(\\.|[^\.])+/g)||[""],function(a){return a.replace(/\\\./g,".")})}function S(a){if(h.isPlainObject(a)){var b={};h.each(a,function(a,c){c&&(b[a]=S(c))});return function(a,c,f,g){var j=b[c]||b._;return j!==k?j(a,c,f,g):a}}if(null===a)return function(a){return a};if("function"===typeof a)return function(b,c,f,g){return a(b,c,f,g)};if("string"===typeof a&&
(-1!==a.indexOf(".")||-1!==a.indexOf("[")||-1!==a.indexOf("("))){var c=function(a,b,f){var g,j;if(""!==f){j=La(f);for(var i=0,h=j.length;i<h;i++){f=j[i].match(da);g=j[i].match(X);if(f){j[i]=j[i].replace(da,"");""!==j[i]&&(a=a[j[i]]);g=[];j.splice(0,i+1);j=j.join(".");if(Array.isArray(a)){i=0;for(h=a.length;i<h;i++)g.push(c(a[i],b,j))}a=f[0].substring(1,f[0].length-1);a=""===a?g:g.join(a);break}else if(g){j[i]=j[i].replace(X,"");a=a[j[i]]();continue}if(null===a||a[j[i]]===k)return k;a=a[j[i]]}}return a};
return function(b,e){return c(b,e,a)}}return function(b){return b[a]}}function N(a){if(h.isPlainObject(a))return N(a._);if(null===a)return function(){};if("function"===typeof a)return function(b,d,e){a(b,"set",d,e)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||-1!==a.indexOf("("))){var b=function(a,d,e){var e=La(e),f;f=e[e.length-1];for(var g,j,i=0,h=e.length-1;i<h;i++){if("__proto__"===e[i])throw Error("Cannot set prototype values");g=e[i].match(da);j=e[i].match(X);if(g){e[i]=
e[i].replace(da,"");a[e[i]]=[];f=e.slice();f.splice(0,i+1);g=f.join(".");if(Array.isArray(d)){j=0;for(h=d.length;j<h;j++)f={},b(f,d[j],g),a[e[i]].push(f)}else a[e[i]]=d;return}j&&(e[i]=e[i].replace(X,""),a=a[e[i]](d));if(null===a[e[i]]||a[e[i]]===k)a[e[i]]={};a=a[e[i]]}if(f.match(X))a[f.replace(X,"")](d);else a[f.replace(da,"")]=d};return function(c,d){return b(c,d,a)}}return function(b,d){b[a]=d}}function Ma(a){return C(a.aoData,"_aData")}function pa(a){a.aoData.length=0;a.aiDisplayMaster.length=
0;a.aiDisplay.length=0;a.aIds={}}function qa(a,b,c){for(var d=-1,e=0,f=a.length;e<f;e++)a[e]==b?d=e:a[e]>b&&a[e]--; -1!=d&&c===k&&a.splice(d,1)}function ea(a,b,c,d){var e=a.aoData[b],f,g=function(c,d){for(;c.childNodes.length;)c.removeChild(c.firstChild);c.innerHTML=B(a,b,d,"display")};if("dom"===c||(!c||"auto"===c)&&"dom"===e.src)e._aData=Ka(a,e,d,d===k?k:e._aData).data;else{var j=e.anCells;if(j)if(d!==k)g(j[d],d);else{c=0;for(f=j.length;c<f;c++)g(j[c],c)}}e._aSortData=null;e._aFilterData=null;g=
a.aoColumns;if(d!==k)g[d].sType=null;else{c=0;for(f=g.length;c<f;c++)g[c].sType=null;Na(a,e)}}function Ka(a,b,c,d){var e=[],f=b.firstChild,g,j,i=0,h,l=a.aoColumns,q=a._rowReadObject,d=d!==k?d:q?{}:[],u=function(a,b){if("string"===typeof a){var c=a.indexOf("@");-1!==c&&(c=a.substring(c+1),N(a)(d,b.getAttribute(c)))}},G=function(a){if(c===k||c===i)j=l[i],h=a.innerHTML.trim(),j&&j._bAttrSrc?(N(j.mData._)(d,h),u(j.mData.sort,a),u(j.mData.type,a),u(j.mData.filter,a)):q?(j._setter||(j._setter=N(j.mData)),
j._setter(d,h)):d[i]=h;i++};if(f)for(;f;){g=f.nodeName.toUpperCase();if("TD"==g||"TH"==g)G(f),e.push(f);f=f.nextSibling}else{e=b.anCells;f=0;for(g=e.length;f<g;f++)G(e[f])}if(b=b.firstChild?b:b.nTr)(b=b.getAttribute("id"))&&N(a.rowId)(d,b);return{data:d,cells:e}}function Ja(a,b,c,d){var e=a.aoData[b],f=e._aData,g=[],j,i,m,l,q,k;if(null===e.nTr){j=c||H.createElement("tr");e.nTr=j;e.anCells=g;j._DT_RowIndex=b;Na(a,e);l=0;for(q=a.aoColumns.length;l<q;l++){m=a.aoColumns[l];i=(k=c?!1:!0)?H.createElement(m.sCellType):
d[l];i._DT_CellIndex={row:b,column:l};g.push(i);if(k||(!c||m.mRender||m.mData!==l)&&(!h.isPlainObject(m.mData)||m.mData._!==l+".display"))i.innerHTML=B(a,b,l,"display");m.sClass&&(i.className+=" "+m.sClass);m.bVisible&&!c?j.appendChild(i):!m.bVisible&&c&&i.parentNode.removeChild(i);m.fnCreatedCell&&m.fnCreatedCell.call(a.oInstance,i,B(a,b,l),f,b,l)}t(a,"aoRowCreatedCallback",null,[j,f,b,g])}e.nTr.setAttribute("role","row")}function Na(a,b){var c=b.nTr,d=b._aData;if(c){var e=a.rowIdFn(d);e&&(c.id=
e);d.DT_RowClass&&(e=d.DT_RowClass.split(" "),b.__rowc=b.__rowc?ra(b.__rowc.concat(e)):e,h(c).removeClass(b.__rowc.join(" ")).addClass(d.DT_RowClass));d.DT_RowAttr&&h(c).attr(d.DT_RowAttr);d.DT_RowData&&h(c).data(d.DT_RowData)}}function mb(a){var b,c,d,e,f,g=a.nTHead,j=a.nTFoot,i=0===h("th, td",g).length,m=a.oClasses,l=a.aoColumns;i&&(e=h("<tr/>").appendTo(g));b=0;for(c=l.length;b<c;b++)f=l[b],d=h(f.nTh).addClass(f.sClass),i&&d.appendTo(e),a.oFeatures.bSort&&(d.addClass(f.sSortingClass),!1!==f.bSortable&&
(d.attr("tabindex",a.iTabIndex).attr("aria-controls",a.sTableId),Oa(a,f.nTh,b))),f.sTitle!=d[0].innerHTML&&d.html(f.sTitle),Pa(a,"header")(a,d,f,m);i&&fa(a.aoHeader,g);h(g).children("tr").attr("role","row");h(g).children("tr").children("th, td").addClass(m.sHeaderTH);h(j).children("tr").children("th, td").addClass(m.sFooterTH);if(null!==j){a=a.aoFooter[0];b=0;for(c=a.length;b<c;b++)f=l[b],f.nTf=a[b].cell,f.sClass&&h(f.nTf).addClass(f.sClass)}}function ga(a,b,c){var d,e,f,g=[],j=[],i=a.aoColumns.length,
m;if(b){c===k&&(c=!1);d=0;for(e=b.length;d<e;d++){g[d]=b[d].slice();g[d].nTr=b[d].nTr;for(f=i-1;0<=f;f--)!a.aoColumns[f].bVisible&&!c&&g[d].splice(f,1);j.push([])}d=0;for(e=g.length;d<e;d++){if(a=g[d].nTr)for(;f=a.firstChild;)a.removeChild(f);f=0;for(b=g[d].length;f<b;f++)if(m=i=1,j[d][f]===k){a.appendChild(g[d][f].cell);for(j[d][f]=1;g[d+i]!==k&&g[d][f].cell==g[d+i][f].cell;)j[d+i][f]=1,i++;for(;g[d][f+m]!==k&&g[d][f].cell==g[d][f+m].cell;){for(c=0;c<i;c++)j[d+c][f+m]=1;m++}h(g[d][f].cell).attr("rowspan",
i).attr("colspan",m)}}}}function P(a){var b=t(a,"aoPreDrawCallback","preDraw",[a]);if(-1!==h.inArray(!1,b))D(a,!1);else{var b=[],c=0,d=a.asStripeClasses,e=d.length,f=a.oLanguage,g=a.iInitDisplayStart,j="ssp"==y(a),i=a.aiDisplay;a.bDrawing=!0;g!==k&&-1!==g&&(a._iDisplayStart=j?g:g>=a.fnRecordsDisplay()?0:g,a.iInitDisplayStart=-1);var g=a._iDisplayStart,m=a.fnDisplayEnd();if(a.bDeferLoading)a.bDeferLoading=!1,a.iDraw++,D(a,!1);else if(j){if(!a.bDestroying&&!nb(a))return}else a.iDraw++;if(0!==i.length){f=
j?a.aoData.length:m;for(j=j?0:g;j<f;j++){var l=i[j],q=a.aoData[l];null===q.nTr&&Ja(a,l);var u=q.nTr;if(0!==e){var G=d[c%e];q._sRowStripe!=G&&(h(u).removeClass(q._sRowStripe).addClass(G),q._sRowStripe=G)}t(a,"aoRowCallback",null,[u,q._aData,c,j,l]);b.push(u);c++}}else c=f.sZeroRecords,1==a.iDraw&&"ajax"==y(a)?c=f.sLoadingRecords:f.sEmptyTable&&0===a.fnRecordsTotal()&&(c=f.sEmptyTable),b[0]=h("<tr/>",{"class":e?d[0]:""}).append(h("<td />",{valign:"top",colSpan:W(a),"class":a.oClasses.sRowEmpty}).html(c))[0];
t(a,"aoHeaderCallback","header",[h(a.nTHead).children("tr")[0],Ma(a),g,m,i]);t(a,"aoFooterCallback","footer",[h(a.nTFoot).children("tr")[0],Ma(a),g,m,i]);d=h(a.nTBody);d.children().detach();d.append(h(b));t(a,"aoDrawCallback","draw",[a]);a.bSorted=!1;a.bFiltered=!1;a.bDrawing=!1}}function T(a,b){var c=a.oFeatures,d=c.bFilter;c.bSort&&ob(a);d?ha(a,a.oPreviousSearch):a.aiDisplay=a.aiDisplayMaster.slice();!0!==b&&(a._iDisplayStart=0);a._drawHold=b;P(a);a._drawHold=!1}function pb(a){var b=a.oClasses,
c=h(a.nTable),c=h("<div/>").insertBefore(c),d=a.oFeatures,e=h("<div/>",{id:a.sTableId+"_wrapper","class":b.sWrapper+(a.nTFoot?"":" "+b.sNoFooter)});a.nHolding=c[0];a.nTableWrapper=e[0];a.nTableReinsertBefore=a.nTable.nextSibling;for(var f=a.sDom.split(""),g,j,i,m,l,q,k=0;k<f.length;k++){g=null;j=f[k];if("<"==j){i=h("<div/>")[0];m=f[k+1];if("'"==m||'"'==m){l="";for(q=2;f[k+q]!=m;)l+=f[k+q],q++;"H"==l?l=b.sJUIHeader:"F"==l&&(l=b.sJUIFooter);-1!=l.indexOf(".")?(m=l.split("."),i.id=m[0].substr(1,m[0].length-
1),i.className=m[1]):"#"==l.charAt(0)?i.id=l.substr(1,l.length-1):i.className=l;k+=q}e.append(i);e=h(i)}else if(">"==j)e=e.parent();else if("l"==j&&d.bPaginate&&d.bLengthChange)g=qb(a);else if("f"==j&&d.bFilter)g=rb(a);else if("r"==j&&d.bProcessing)g=sb(a);else if("t"==j)g=tb(a);else if("i"==j&&d.bInfo)g=ub(a);else if("p"==j&&d.bPaginate)g=vb(a);else if(0!==n.ext.feature.length){i=n.ext.feature;q=0;for(m=i.length;q<m;q++)if(j==i[q].cFeature){g=i[q].fnInit(a);break}}g&&(i=a.aanFeatures,i[j]||(i[j]=
[]),i[j].push(g),e.append(g))}c.replaceWith(e);a.nHolding=null}function fa(a,b){var c=h(b).children("tr"),d,e,f,g,j,i,m,l,q,k;a.splice(0,a.length);f=0;for(i=c.length;f<i;f++)a.push([]);f=0;for(i=c.length;f<i;f++){d=c[f];for(e=d.firstChild;e;){if("TD"==e.nodeName.toUpperCase()||"TH"==e.nodeName.toUpperCase()){l=1*e.getAttribute("colspan");q=1*e.getAttribute("rowspan");l=!l||0===l||1===l?1:l;q=!q||0===q||1===q?1:q;g=0;for(j=a[f];j[g];)g++;m=g;k=1===l?!0:!1;for(j=0;j<l;j++)for(g=0;g<q;g++)a[f+g][m+j]=
{cell:e,unique:k},a[f+g].nTr=d}e=e.nextSibling}}}function sa(a,b,c){var d=[];c||(c=a.aoHeader,b&&(c=[],fa(c,b)));for(var b=0,e=c.length;b<e;b++)for(var f=0,g=c[b].length;f<g;f++)if(c[b][f].unique&&(!d[f]||!a.bSortCellsTop))d[f]=c[b][f].cell;return d}function ta(a,b,c){t(a,"aoServerParams","serverParams",[b]);if(b&&Array.isArray(b)){var d={},e=/(.*?)\[\]$/;h.each(b,function(a,b){var c=b.name.match(e);c?(c=c[0],d[c]||(d[c]=[]),d[c].push(b.value)):d[b.name]=b.value});b=d}var f,g=a.ajax,j=a.oInstance,
i=function(b){t(a,null,"xhr",[a,b,a.jqXHR]);c(b)};if(h.isPlainObject(g)&&g.data){f=g.data;var m="function"===typeof f?f(b,a):f,b="function"===typeof f&&m?m:h.extend(!0,b,m);delete g.data}m={data:b,success:function(b){var c=b.error||b.sError;c&&K(a,0,c);a.json=b;i(b)},dataType:"json",cache:!1,type:a.sServerMethod,error:function(b,c){var d=t(a,null,"xhr",[a,null,a.jqXHR]);-1===h.inArray(!0,d)&&("parsererror"==c?K(a,0,"Invalid JSON response",1):4===b.readyState&&K(a,0,"Ajax error",7));D(a,!1)}};a.oAjaxData=
b;t(a,null,"preXhr",[a,b]);a.fnServerData?a.fnServerData.call(j,a.sAjaxSource,h.map(b,function(a,b){return{name:b,value:a}}),i,a):a.sAjaxSource||"string"===typeof g?a.jqXHR=h.ajax(h.extend(m,{url:g||a.sAjaxSource})):"function"===typeof g?a.jqXHR=g.call(j,b,i,a):(a.jqXHR=h.ajax(h.extend(m,g)),g.data=f)}function nb(a){return a.bAjaxDataGet?(a.iDraw++,D(a,!0),ta(a,wb(a),function(b){xb(a,b)}),!1):!0}function wb(a){var b=a.aoColumns,c=b.length,d=a.oFeatures,e=a.oPreviousSearch,f=a.aoPreSearchCols,g,j=
[],i,m,l,k=Y(a);g=a._iDisplayStart;i=!1!==d.bPaginate?a._iDisplayLength:-1;var u=function(a,b){j.push({name:a,value:b})};u("sEcho",a.iDraw);u("iColumns",c);u("sColumns",C(b,"sName").join(","));u("iDisplayStart",g);u("iDisplayLength",i);var G={draw:a.iDraw,columns:[],order:[],start:g,length:i,search:{value:e.sSearch,regex:e.bRegex}};for(g=0;g<c;g++)m=b[g],l=f[g],i="function"==typeof m.mData?"function":m.mData,G.columns.push({data:i,name:m.sName,searchable:m.bSearchable,orderable:m.bSortable,search:{value:l.sSearch,
regex:l.bRegex}}),u("mDataProp_"+g,i),d.bFilter&&(u("sSearch_"+g,l.sSearch),u("bRegex_"+g,l.bRegex),u("bSearchable_"+g,m.bSearchable)),d.bSort&&u("bSortable_"+g,m.bSortable);d.bFilter&&(u("sSearch",e.sSearch),u("bRegex",e.bRegex));d.bSort&&(h.each(k,function(a,b){G.order.push({column:b.col,dir:b.dir});u("iSortCol_"+a,b.col);u("sSortDir_"+a,b.dir)}),u("iSortingCols",k.length));b=n.ext.legacy.ajax;return null===b?a.sAjaxSource?j:G:b?j:G}function xb(a,b){var c=ua(a,b),d=b.sEcho!==k?b.sEcho:b.draw,e=
b.iTotalRecords!==k?b.iTotalRecords:b.recordsTotal,f=b.iTotalDisplayRecords!==k?b.iTotalDisplayRecords:b.recordsFiltered;if(d!==k){if(1*d<a.iDraw)return;a.iDraw=1*d}pa(a);a._iRecordsTotal=parseInt(e,10);a._iRecordsDisplay=parseInt(f,10);d=0;for(e=c.length;d<e;d++)O(a,c[d]);a.aiDisplay=a.aiDisplayMaster.slice();a.bAjaxDataGet=!1;P(a);a._bInitComplete||va(a,b);a.bAjaxDataGet=!0;D(a,!1)}function ua(a,b){var c=h.isPlainObject(a.ajax)&&a.ajax.dataSrc!==k?a.ajax.dataSrc:a.sAjaxDataProp;return"data"===c?
b.aaData||b[c]:""!==c?S(c)(b):b}function rb(a){var b=a.oClasses,c=a.sTableId,d=a.oLanguage,e=a.oPreviousSearch,f=a.aanFeatures,g='<input type="search" class="'+b.sFilterInput+'"/>',j=d.sSearch,j=j.match(/_INPUT_/)?j.replace("_INPUT_",g):j+g,b=h("<div/>",{id:!f.f?c+"_filter":null,"class":b.sFilter}).append(h("<label/>").append(j)),i=function(){var b=!this.value?"":this.value;b!=e.sSearch&&(ha(a,{sSearch:b,bRegex:e.bRegex,bSmart:e.bSmart,bCaseInsensitive:e.bCaseInsensitive}),a._iDisplayStart=0,P(a))},
f=null!==a.searchDelay?a.searchDelay:"ssp"===y(a)?400:0,m=h("input",b).val(e.sSearch).attr("placeholder",d.sSearchPlaceholder).on("keyup.DT search.DT input.DT paste.DT cut.DT",f?Qa(i,f):i).on("mouseup",function(){setTimeout(function(){i.call(m[0])},10)}).on("keypress.DT",function(a){if(13==a.keyCode)return!1}).attr("aria-controls",c);h(a.nTable).on("search.dt.DT",function(b,c){if(a===c)try{m[0]!==H.activeElement&&m.val(e.sSearch)}catch(d){}});return b[0]}function ha(a,b,c){var d=a.oPreviousSearch,
e=a.aoPreSearchCols,f=function(a){d.sSearch=a.sSearch;d.bRegex=a.bRegex;d.bSmart=a.bSmart;d.bCaseInsensitive=a.bCaseInsensitive};Ia(a);if("ssp"!=y(a)){yb(a,b.sSearch,c,b.bEscapeRegex!==k?!b.bEscapeRegex:b.bRegex,b.bSmart,b.bCaseInsensitive);f(b);for(b=0;b<e.length;b++)zb(a,e[b].sSearch,b,e[b].bEscapeRegex!==k?!e[b].bEscapeRegex:e[b].bRegex,e[b].bSmart,e[b].bCaseInsensitive);Ab(a)}else f(b);a.bFiltered=!0;t(a,null,"search",[a])}function Ab(a){for(var b=n.ext.search,c=a.aiDisplay,d,e,f=0,g=b.length;f<
g;f++){for(var j=[],i=0,m=c.length;i<m;i++)e=c[i],d=a.aoData[e],b[f](a,d._aFilterData,e,d._aData,i)&&j.push(e);c.length=0;h.merge(c,j)}}function zb(a,b,c,d,e,f){if(""!==b){for(var g=[],j=a.aiDisplay,d=Ra(b,d,e,f),e=0;e<j.length;e++)b=a.aoData[j[e]]._aFilterData[c],d.test(b)&&g.push(j[e]);a.aiDisplay=g}}function yb(a,b,c,d,e,f){var e=Ra(b,d,e,f),g=a.oPreviousSearch.sSearch,j=a.aiDisplayMaster,i,f=[];0!==n.ext.search.length&&(c=!0);i=Bb(a);if(0>=b.length)a.aiDisplay=j.slice();else{if(i||c||d||g.length>
b.length||0!==b.indexOf(g)||a.bSorted)a.aiDisplay=j.slice();b=a.aiDisplay;for(c=0;c<b.length;c++)e.test(a.aoData[b[c]]._sFilterRow)&&f.push(b[c]);a.aiDisplay=f}}function Ra(a,b,c,d){a=b?a:Sa(a);c&&(a="^(?=.*?"+h.map(a.match(/"[^"]+"|[^ ]+/g)||[""],function(a){if('"'===a.charAt(0))var b=a.match(/^"(.*)"$/),a=b?b[1]:a;return a.replace('"',"")}).join(")(?=.*?")+").*$");return RegExp(a,d?"i":"")}function Bb(a){var b=a.aoColumns,c,d,e,f,g,j,i,h,l=n.ext.type.search;c=!1;d=0;for(f=a.aoData.length;d<f;d++)if(h=
a.aoData[d],!h._aFilterData){j=[];e=0;for(g=b.length;e<g;e++)c=b[e],c.bSearchable?(i=B(a,d,e,"filter"),l[c.sType]&&(i=l[c.sType](i)),null===i&&(i=""),"string"!==typeof i&&i.toString&&(i=i.toString())):i="",i.indexOf&&-1!==i.indexOf("&")&&(wa.innerHTML=i,i=Zb?wa.textContent:wa.innerText),i.replace&&(i=i.replace(/[\r\n\u2028]/g,"")),j.push(i);h._aFilterData=j;h._sFilterRow=j.join("  ");c=!0}return c}function Cb(a){return{search:a.sSearch,smart:a.bSmart,regex:a.bRegex,caseInsensitive:a.bCaseInsensitive}}
function Db(a){return{sSearch:a.search,bSmart:a.smart,bRegex:a.regex,bCaseInsensitive:a.caseInsensitive}}function ub(a){var b=a.sTableId,c=a.aanFeatures.i,d=h("<div/>",{"class":a.oClasses.sInfo,id:!c?b+"_info":null});c||(a.aoDrawCallback.push({fn:Eb,sName:"information"}),d.attr("role","status").attr("aria-live","polite"),h(a.nTable).attr("aria-describedby",b+"_info"));return d[0]}function Eb(a){var b=a.aanFeatures.i;if(0!==b.length){var c=a.oLanguage,d=a._iDisplayStart+1,e=a.fnDisplayEnd(),f=a.fnRecordsTotal(),
g=a.fnRecordsDisplay(),j=g?c.sInfo:c.sInfoEmpty;g!==f&&(j+=" "+c.sInfoFiltered);j+=c.sInfoPostFix;j=Fb(a,j);c=c.fnInfoCallback;null!==c&&(j=c.call(a.oInstance,a,d,e,f,g,j));h(b).html(j)}}function Fb(a,b){var c=a.fnFormatNumber,d=a._iDisplayStart+1,e=a._iDisplayLength,f=a.fnRecordsDisplay(),g=-1===e;return b.replace(/_START_/g,c.call(a,d)).replace(/_END_/g,c.call(a,a.fnDisplayEnd())).replace(/_MAX_/g,c.call(a,a.fnRecordsTotal())).replace(/_TOTAL_/g,c.call(a,f)).replace(/_PAGE_/g,c.call(a,g?1:Math.ceil(d/
e))).replace(/_PAGES_/g,c.call(a,g?1:Math.ceil(f/e)))}function ia(a){var b,c,d=a.iInitDisplayStart,e=a.aoColumns,f;c=a.oFeatures;var g=a.bDeferLoading;if(a.bInitialised){pb(a);mb(a);ga(a,a.aoHeader);ga(a,a.aoFooter);D(a,!0);c.bAutoWidth&&Ha(a);b=0;for(c=e.length;b<c;b++)f=e[b],f.sWidth&&(f.nTh.style.width=w(f.sWidth));t(a,null,"preInit",[a]);T(a);e=y(a);if("ssp"!=e||g)"ajax"==e?ta(a,[],function(c){var f=ua(a,c);for(b=0;b<f.length;b++)O(a,f[b]);a.iInitDisplayStart=d;T(a);D(a,!1);va(a,c)},a):(D(a,!1),
va(a))}else setTimeout(function(){ia(a)},200)}function va(a,b){a._bInitComplete=!0;(b||a.oInit.aaData)&&aa(a);t(a,null,"plugin-init",[a,b]);t(a,"aoInitComplete","init",[a,b])}function Ta(a,b){var c=parseInt(b,10);a._iDisplayLength=c;Ua(a);t(a,null,"length",[a,c])}function qb(a){for(var b=a.oClasses,c=a.sTableId,d=a.aLengthMenu,e=Array.isArray(d[0]),f=e?d[0]:d,d=e?d[1]:d,e=h("<select/>",{name:c+"_length","aria-controls":c,"class":b.sLengthSelect}),g=0,j=f.length;g<j;g++)e[0][g]=new Option("number"===
typeof d[g]?a.fnFormatNumber(d[g]):d[g],f[g]);var i=h("<div><label/></div>").addClass(b.sLength);a.aanFeatures.l||(i[0].id=c+"_length");i.children().append(a.oLanguage.sLengthMenu.replace("_MENU_",e[0].outerHTML));h("select",i).val(a._iDisplayLength).on("change.DT",function(){Ta(a,h(this).val());P(a)});h(a.nTable).on("length.dt.DT",function(b,c,d){a===c&&h("select",i).val(d)});return i[0]}function vb(a){var b=a.sPaginationType,c=n.ext.pager[b],d="function"===typeof c,e=function(a){P(a)},b=h("<div/>").addClass(a.oClasses.sPaging+
b)[0],f=a.aanFeatures;d||c.fnInit(a,b,e);f.p||(b.id=a.sTableId+"_paginate",a.aoDrawCallback.push({fn:function(a){if(d){var b=a._iDisplayStart,i=a._iDisplayLength,h=a.fnRecordsDisplay(),l=-1===i,b=l?0:Math.ceil(b/i),i=l?1:Math.ceil(h/i),h=c(b,i),k,l=0;for(k=f.p.length;l<k;l++)Pa(a,"pageButton")(a,f.p[l],l,h,b,i)}else c.fnUpdate(a,e)},sName:"pagination"}));return b}function Va(a,b,c){var d=a._iDisplayStart,e=a._iDisplayLength,f=a.fnRecordsDisplay();0===f||-1===e?d=0:"number"===typeof b?(d=b*e,d>f&&
(d=0)):"first"==b?d=0:"previous"==b?(d=0<=e?d-e:0,0>d&&(d=0)):"next"==b?d+e<f&&(d+=e):"last"==b?d=Math.floor((f-1)/e)*e:K(a,0,"Unknown paging action: "+b,5);b=a._iDisplayStart!==d;a._iDisplayStart=d;b&&(t(a,null,"page",[a]),c&&P(a));return b}function sb(a){return h("<div/>",{id:!a.aanFeatures.r?a.sTableId+"_processing":null,"class":a.oClasses.sProcessing}).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]}function D(a,b){a.oFeatures.bProcessing&&h(a.aanFeatures.r).css("display",b?"block":"none");
t(a,null,"processing",[a,b])}function tb(a){var b=h(a.nTable);b.attr("role","grid");var c=a.oScroll;if(""===c.sX&&""===c.sY)return a.nTable;var d=c.sX,e=c.sY,f=a.oClasses,g=b.children("caption"),j=g.length?g[0]._captionSide:null,i=h(b[0].cloneNode(!1)),m=h(b[0].cloneNode(!1)),l=b.children("tfoot");l.length||(l=null);i=h("<div/>",{"class":f.sScrollWrapper}).append(h("<div/>",{"class":f.sScrollHead}).css({overflow:"hidden",position:"relative",border:0,width:d?!d?null:w(d):"100%"}).append(h("<div/>",
{"class":f.sScrollHeadInner}).css({"box-sizing":"content-box",width:c.sXInner||"100%"}).append(i.removeAttr("id").css("margin-left",0).append("top"===j?g:null).append(b.children("thead"))))).append(h("<div/>",{"class":f.sScrollBody}).css({position:"relative",overflow:"auto",width:!d?null:w(d)}).append(b));l&&i.append(h("<div/>",{"class":f.sScrollFoot}).css({overflow:"hidden",border:0,width:d?!d?null:w(d):"100%"}).append(h("<div/>",{"class":f.sScrollFootInner}).append(m.removeAttr("id").css("margin-left",
0).append("bottom"===j?g:null).append(b.children("tfoot")))));var b=i.children(),k=b[0],f=b[1],u=l?b[2]:null;if(d)h(f).on("scroll.DT",function(){var a=this.scrollLeft;k.scrollLeft=a;l&&(u.scrollLeft=a)});h(f).css("max-height",e);c.bCollapse||h(f).css("height",e);a.nScrollHead=k;a.nScrollBody=f;a.nScrollFoot=u;a.aoDrawCallback.push({fn:ma,sName:"scrolling"});return i[0]}function ma(a){var b=a.oScroll,c=b.sX,d=b.sXInner,e=b.sY,b=b.iBarWidth,f=h(a.nScrollHead),g=f[0].style,j=f.children("div"),i=j[0].style,
m=j.children("table"),j=a.nScrollBody,l=h(j),q=j.style,u=h(a.nScrollFoot).children("div"),n=u.children("table"),o=h(a.nTHead),p=h(a.nTable),r=p[0],t=r.style,s=a.nTFoot?h(a.nTFoot):null,U=a.oBrowser,V=U.bScrollOversize,$b=C(a.aoColumns,"nTh"),Q,L,R,xa,v=[],x=[],y=[],z=[],A,B=function(a){a=a.style;a.paddingTop="0";a.paddingBottom="0";a.borderTopWidth="0";a.borderBottomWidth="0";a.height=0};L=j.scrollHeight>j.clientHeight;if(a.scrollBarVis!==L&&a.scrollBarVis!==k)a.scrollBarVis=L,aa(a);else{a.scrollBarVis=
L;p.children("thead, tfoot").remove();s&&(R=s.clone().prependTo(p),Q=s.find("tr"),R=R.find("tr"));xa=o.clone().prependTo(p);o=o.find("tr");L=xa.find("tr");xa.find("th, td").removeAttr("tabindex");c||(q.width="100%",f[0].style.width="100%");h.each(sa(a,xa),function(b,c){A=ba(a,b);c.style.width=a.aoColumns[A].sWidth});s&&I(function(a){a.style.width=""},R);f=p.outerWidth();if(""===c){t.width="100%";if(V&&(p.find("tbody").height()>j.offsetHeight||"scroll"==l.css("overflow-y")))t.width=w(p.outerWidth()-
b);f=p.outerWidth()}else""!==d&&(t.width=w(d),f=p.outerWidth());I(B,L);I(function(a){y.push(a.innerHTML);v.push(w(h(a).css("width")))},L);I(function(a,b){if(h.inArray(a,$b)!==-1)a.style.width=v[b]},o);h(L).height(0);s&&(I(B,R),I(function(a){z.push(a.innerHTML);x.push(w(h(a).css("width")))},R),I(function(a,b){a.style.width=x[b]},Q),h(R).height(0));I(function(a,b){a.innerHTML='<div class="dataTables_sizing">'+y[b]+"</div>";a.childNodes[0].style.height="0";a.childNodes[0].style.overflow="hidden";a.style.width=
v[b]},L);s&&I(function(a,b){a.innerHTML='<div class="dataTables_sizing">'+z[b]+"</div>";a.childNodes[0].style.height="0";a.childNodes[0].style.overflow="hidden";a.style.width=x[b]},R);if(p.outerWidth()<f){Q=j.scrollHeight>j.offsetHeight||"scroll"==l.css("overflow-y")?f+b:f;if(V&&(j.scrollHeight>j.offsetHeight||"scroll"==l.css("overflow-y")))t.width=w(Q-b);(""===c||""!==d)&&K(a,1,"Possible column misalignment",6)}else Q="100%";q.width=w(Q);g.width=w(Q);s&&(a.nScrollFoot.style.width=w(Q));!e&&V&&(q.height=
w(r.offsetHeight+b));c=p.outerWidth();m[0].style.width=w(c);i.width=w(c);d=p.height()>j.clientHeight||"scroll"==l.css("overflow-y");e="padding"+(U.bScrollbarLeft?"Left":"Right");i[e]=d?b+"px":"0px";s&&(n[0].style.width=w(c),u[0].style.width=w(c),u[0].style[e]=d?b+"px":"0px");p.children("colgroup").insertBefore(p.children("thead"));l.trigger("scroll");if((a.bSorted||a.bFiltered)&&!a._drawHold)j.scrollTop=0}}function I(a,b,c){for(var d=0,e=0,f=b.length,g,j;e<f;){g=b[e].firstChild;for(j=c?c[e].firstChild:
null;g;)1===g.nodeType&&(c?a(g,j,d):a(g,d),d++),g=g.nextSibling,j=c?j.nextSibling:null;e++}}function Ha(a){var b=a.nTable,c=a.aoColumns,d=a.oScroll,e=d.sY,f=d.sX,g=d.sXInner,j=c.length,i=na(a,"bVisible"),m=h("th",a.nTHead),l=b.getAttribute("width"),k=b.parentNode,u=!1,n,o,p=a.oBrowser,d=p.bScrollOversize;(n=b.style.width)&&-1!==n.indexOf("%")&&(l=n);for(n=0;n<i.length;n++)o=c[i[n]],null!==o.sWidth&&(o.sWidth=Gb(o.sWidthOrig,k),u=!0);if(d||!u&&!f&&!e&&j==W(a)&&j==m.length)for(n=0;n<j;n++)i=ba(a,n),
null!==i&&(c[i].sWidth=w(m.eq(n).width()));else{j=h(b).clone().css("visibility","hidden").removeAttr("id");j.find("tbody tr").remove();var r=h("<tr/>").appendTo(j.find("tbody"));j.find("thead, tfoot").remove();j.append(h(a.nTHead).clone()).append(h(a.nTFoot).clone());j.find("tfoot th, tfoot td").css("width","");m=sa(a,j.find("thead")[0]);for(n=0;n<i.length;n++)o=c[i[n]],m[n].style.width=null!==o.sWidthOrig&&""!==o.sWidthOrig?w(o.sWidthOrig):"",o.sWidthOrig&&f&&h(m[n]).append(h("<div/>").css({width:o.sWidthOrig,
margin:0,padding:0,border:0,height:1}));if(a.aoData.length)for(n=0;n<i.length;n++)u=i[n],o=c[u],h(Hb(a,u)).clone(!1).append(o.sContentPadding).appendTo(r);h("[name]",j).removeAttr("name");o=h("<div/>").css(f||e?{position:"absolute",top:0,left:0,height:1,right:0,overflow:"hidden"}:{}).append(j).appendTo(k);f&&g?j.width(g):f?(j.css("width","auto"),j.removeAttr("width"),j.width()<k.clientWidth&&l&&j.width(k.clientWidth)):e?j.width(k.clientWidth):l&&j.width(l);for(n=e=0;n<i.length;n++)k=h(m[n]),g=k.outerWidth()-
k.width(),k=p.bBounding?Math.ceil(m[n].getBoundingClientRect().width):k.outerWidth(),e+=k,c[i[n]].sWidth=w(k-g);b.style.width=w(e);o.remove()}l&&(b.style.width=w(l));if((l||f)&&!a._reszEvt)b=function(){h(E).on("resize.DT-"+a.sInstance,Qa(function(){aa(a)}))},d?setTimeout(b,1E3):b(),a._reszEvt=!0}function Gb(a,b){if(!a)return 0;var c=h("<div/>").css("width",w(a)).appendTo(b||H.body),d=c[0].offsetWidth;c.remove();return d}function Hb(a,b){var c=Ib(a,b);if(0>c)return null;var d=a.aoData[c];return!d.nTr?
h("<td/>").html(B(a,c,b,"display"))[0]:d.anCells[b]}function Ib(a,b){for(var c,d=-1,e=-1,f=0,g=a.aoData.length;f<g;f++)c=B(a,f,b,"display")+"",c=c.replace(ac,""),c=c.replace(/&nbsp;/g," "),c.length>d&&(d=c.length,e=f);return e}function w(a){return null===a?"0px":"number"==typeof a?0>a?"0px":a+"px":a.match(/\d$/)?a+"px":a}function Y(a){var b,c,d=[],e=a.aoColumns,f,g,j,i;b=a.aaSortingFixed;c=h.isPlainObject(b);var m=[];f=function(a){a.length&&!Array.isArray(a[0])?m.push(a):h.merge(m,a)};Array.isArray(b)&&
f(b);c&&b.pre&&f(b.pre);f(a.aaSorting);c&&b.post&&f(b.post);for(a=0;a<m.length;a++){i=m[a][0];f=e[i].aDataSort;b=0;for(c=f.length;b<c;b++)g=f[b],j=e[g].sType||"string",m[a]._idx===k&&(m[a]._idx=h.inArray(m[a][1],e[g].asSorting)),d.push({src:i,col:g,dir:m[a][1],index:m[a]._idx,type:j,formatter:n.ext.type.order[j+"-pre"]})}return d}function ob(a){var b,c,d=[],e=n.ext.type.order,f=a.aoData,g=0,j,i=a.aiDisplayMaster,h;Ia(a);h=Y(a);b=0;for(c=h.length;b<c;b++)j=h[b],j.formatter&&g++,Jb(a,j.col);if("ssp"!=
y(a)&&0!==h.length){b=0;for(c=i.length;b<c;b++)d[i[b]]=b;g===h.length?i.sort(function(a,b){var c,e,g,j,i=h.length,k=f[a]._aSortData,n=f[b]._aSortData;for(g=0;g<i;g++)if(j=h[g],c=k[j.col],e=n[j.col],c=c<e?-1:c>e?1:0,0!==c)return"asc"===j.dir?c:-c;c=d[a];e=d[b];return c<e?-1:c>e?1:0}):i.sort(function(a,b){var c,g,j,i,k=h.length,n=f[a]._aSortData,o=f[b]._aSortData;for(j=0;j<k;j++)if(i=h[j],c=n[i.col],g=o[i.col],i=e[i.type+"-"+i.dir]||e["string-"+i.dir],c=i(c,g),0!==c)return c;c=d[a];g=d[b];return c<
g?-1:c>g?1:0})}a.bSorted=!0}function Kb(a){for(var b,c,d=a.aoColumns,e=Y(a),a=a.oLanguage.oAria,f=0,g=d.length;f<g;f++){c=d[f];var j=c.asSorting;b=c.sTitle.replace(/<.*?>/g,"");var i=c.nTh;i.removeAttribute("aria-sort");c.bSortable&&(0<e.length&&e[0].col==f?(i.setAttribute("aria-sort","asc"==e[0].dir?"ascending":"descending"),c=j[e[0].index+1]||j[0]):c=j[0],b+="asc"===c?a.sSortAscending:a.sSortDescending);i.setAttribute("aria-label",b)}}function Wa(a,b,c,d){var e=a.aaSorting,f=a.aoColumns[b].asSorting,
g=function(a,b){var c=a._idx;c===k&&(c=h.inArray(a[1],f));return c+1<f.length?c+1:b?null:0};"number"===typeof e[0]&&(e=a.aaSorting=[e]);c&&a.oFeatures.bSortMulti?(c=h.inArray(b,C(e,"0")),-1!==c?(b=g(e[c],!0),null===b&&1===e.length&&(b=0),null===b?e.splice(c,1):(e[c][1]=f[b],e[c]._idx=b)):(e.push([b,f[0],0]),e[e.length-1]._idx=0)):e.length&&e[0][0]==b?(b=g(e[0]),e.length=1,e[0][1]=f[b],e[0]._idx=b):(e.length=0,e.push([b,f[0]]),e[0]._idx=0);T(a);"function"==typeof d&&d(a)}function Oa(a,b,c,d){var e=
a.aoColumns[c];Xa(b,{},function(b){!1!==e.bSortable&&(a.oFeatures.bProcessing?(D(a,!0),setTimeout(function(){Wa(a,c,b.shiftKey,d);"ssp"!==y(a)&&D(a,!1)},0)):Wa(a,c,b.shiftKey,d))})}function ya(a){var b=a.aLastSort,c=a.oClasses.sSortColumn,d=Y(a),e=a.oFeatures,f,g;if(e.bSort&&e.bSortClasses){e=0;for(f=b.length;e<f;e++)g=b[e].src,h(C(a.aoData,"anCells",g)).removeClass(c+(2>e?e+1:3));e=0;for(f=d.length;e<f;e++)g=d[e].src,h(C(a.aoData,"anCells",g)).addClass(c+(2>e?e+1:3))}a.aLastSort=d}function Jb(a,
b){var c=a.aoColumns[b],d=n.ext.order[c.sSortDataType],e;d&&(e=d.call(a.oInstance,a,b,ca(a,b)));for(var f,g=n.ext.type.order[c.sType+"-pre"],j=0,i=a.aoData.length;j<i;j++)if(c=a.aoData[j],c._aSortData||(c._aSortData=[]),!c._aSortData[b]||d)f=d?e[j]:B(a,j,b,"sort"),c._aSortData[b]=g?g(f):f}function za(a){if(a.oFeatures.bStateSave&&!a.bDestroying){var b={time:+new Date,start:a._iDisplayStart,length:a._iDisplayLength,order:h.extend(!0,[],a.aaSorting),search:Cb(a.oPreviousSearch),columns:h.map(a.aoColumns,
function(b,d){return{visible:b.bVisible,search:Cb(a.aoPreSearchCols[d])}})};t(a,"aoStateSaveParams","stateSaveParams",[a,b]);a.oSavedState=b;a.fnStateSaveCallback.call(a.oInstance,a,b)}}function Lb(a,b,c){var d,e,f=a.aoColumns,b=function(b){if(b&&b.time){var g=t(a,"aoStateLoadParams","stateLoadParams",[a,b]);if(-1===h.inArray(!1,g)&&(g=a.iStateDuration,!(0<g&&b.time<+new Date-1E3*g)&&!(b.columns&&f.length!==b.columns.length))){a.oLoadedState=h.extend(!0,{},b);b.start!==k&&(a._iDisplayStart=b.start,
a.iInitDisplayStart=b.start);b.length!==k&&(a._iDisplayLength=b.length);b.order!==k&&(a.aaSorting=[],h.each(b.order,function(b,c){a.aaSorting.push(c[0]>=f.length?[0,c[1]]:c)}));b.search!==k&&h.extend(a.oPreviousSearch,Db(b.search));if(b.columns){d=0;for(e=b.columns.length;d<e;d++)g=b.columns[d],g.visible!==k&&(f[d].bVisible=g.visible),g.search!==k&&h.extend(a.aoPreSearchCols[d],Db(g.search))}t(a,"aoStateLoaded","stateLoaded",[a,b])}}c()};if(a.oFeatures.bStateSave){var g=a.fnStateLoadCallback.call(a.oInstance,
a,b);g!==k&&b(g)}else c()}function Aa(a){var b=n.settings,a=h.inArray(a,C(b,"nTable"));return-1!==a?b[a]:null}function K(a,b,c,d){c="DataTables warning: "+(a?"table id="+a.sTableId+" - ":"")+c;d&&(c+=". For more information about this error, please see http://datatables.net/tn/"+d);if(b)E.console&&console.log&&console.log(c);else if(b=n.ext,b=b.sErrMode||b.errMode,a&&t(a,null,"error",[a,d,c]),"alert"==b)alert(c);else{if("throw"==b)throw Error(c);"function"==typeof b&&b(a,d,c)}}function F(a,b,c,d){Array.isArray(c)?
h.each(c,function(c,d){Array.isArray(d)?F(a,b,d[0],d[1]):F(a,b,d)}):(d===k&&(d=c),b[c]!==k&&(a[d]=b[c]))}function Ya(a,b,c){var d,e;for(e in b)b.hasOwnProperty(e)&&(d=b[e],h.isPlainObject(d)?(h.isPlainObject(a[e])||(a[e]={}),h.extend(!0,a[e],d)):a[e]=c&&"data"!==e&&"aaData"!==e&&Array.isArray(d)?d.slice():d);return a}function Xa(a,b,c){h(a).on("click.DT",b,function(b){h(a).trigger("blur");c(b)}).on("keypress.DT",b,function(a){13===a.which&&(a.preventDefault(),c(a))}).on("selectstart.DT",function(){return!1})}
function z(a,b,c,d){c&&a[b].push({fn:c,sName:d})}function t(a,b,c,d){var e=[];b&&(e=h.map(a[b].slice().reverse(),function(b){return b.fn.apply(a.oInstance,d)}));null!==c&&(b=h.Event(c+".dt"),h(a.nTable).trigger(b,d),e.push(b.result));return e}function Ua(a){var b=a._iDisplayStart,c=a.fnDisplayEnd(),d=a._iDisplayLength;b>=c&&(b=c-d);b-=b%d;if(-1===d||0>b)b=0;a._iDisplayStart=b}function Pa(a,b){var c=a.renderer,d=n.ext.renderer[b];return h.isPlainObject(c)&&c[b]?d[c[b]]||d._:"string"===typeof c?d[c]||
d._:d._}function y(a){return a.oFeatures.bServerSide?"ssp":a.ajax||a.sAjaxSource?"ajax":"dom"}function ja(a,b){var c=[],c=Mb.numbers_length,d=Math.floor(c/2);b<=c?c=Z(0,b):a<=d?(c=Z(0,c-2),c.push("ellipsis"),c.push(b-1)):(a>=b-1-d?c=Z(b-(c-2),b):(c=Z(a-d+2,a+d-1),c.push("ellipsis"),c.push(b-1)),c.splice(0,0,"ellipsis"),c.splice(0,0,0));c.DT_el="span";return c}function Fa(a){h.each({num:function(b){return Ba(b,a)},"num-fmt":function(b){return Ba(b,a,Za)},"html-num":function(b){return Ba(b,a,Ca)},"html-num-fmt":function(b){return Ba(b,
a,Ca,Za)}},function(b,c){v.type.order[b+a+"-pre"]=c;b.match(/^html\-/)&&(v.type.search[b+a]=v.type.search.html)})}function Nb(a){return function(){var b=[Aa(this[n.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return n.ext.internal[a].apply(this,b)}}var n=function(a){this.$=function(a,b){return this.api(!0).$(a,b)};this._=function(a,b){return this.api(!0).rows(a,b).data()};this.api=function(a){return a?new r(Aa(this[v.iApiIndex])):new r(this)};this.fnAddData=function(a,b){var c=this.api(!0),
d=Array.isArray(a)&&(Array.isArray(a[0])||h.isPlainObject(a[0]))?c.rows.add(a):c.row.add(a);(b===k||b)&&c.draw();return d.flatten().toArray()};this.fnAdjustColumnSizing=function(a){var b=this.api(!0).columns.adjust(),c=b.settings()[0],d=c.oScroll;a===k||a?b.draw(!1):(""!==d.sX||""!==d.sY)&&ma(c)};this.fnClearTable=function(a){var b=this.api(!0).clear();(a===k||a)&&b.draw()};this.fnClose=function(a){this.api(!0).row(a).child.hide()};this.fnDeleteRow=function(a,b,c){var d=this.api(!0),a=d.rows(a),e=
a.settings()[0],h=e.aoData[a[0][0]];a.remove();b&&b.call(this,e,h);(c===k||c)&&d.draw();return h};this.fnDestroy=function(a){this.api(!0).destroy(a)};this.fnDraw=function(a){this.api(!0).draw(a)};this.fnFilter=function(a,b,c,d,e,h){e=this.api(!0);null===b||b===k?e.search(a,c,d,h):e.column(b).search(a,c,d,h);e.draw()};this.fnGetData=function(a,b){var c=this.api(!0);if(a!==k){var d=a.nodeName?a.nodeName.toLowerCase():"";return b!==k||"td"==d||"th"==d?c.cell(a,b).data():c.row(a).data()||null}return c.data().toArray()};
this.fnGetNodes=function(a){var b=this.api(!0);return a!==k?b.row(a).node():b.rows().nodes().flatten().toArray()};this.fnGetPosition=function(a){var b=this.api(!0),c=a.nodeName.toUpperCase();return"TR"==c?b.row(a).index():"TD"==c||"TH"==c?(a=b.cell(a).index(),[a.row,a.columnVisible,a.column]):null};this.fnIsOpen=function(a){return this.api(!0).row(a).child.isShown()};this.fnOpen=function(a,b,c){return this.api(!0).row(a).child(b,c).show().child()[0]};this.fnPageChange=function(a,b){var c=this.api(!0).page(a);
(b===k||b)&&c.draw(!1)};this.fnSetColumnVis=function(a,b,c){a=this.api(!0).column(a).visible(b);(c===k||c)&&a.columns.adjust().draw()};this.fnSettings=function(){return Aa(this[v.iApiIndex])};this.fnSort=function(a){this.api(!0).order(a).draw()};this.fnSortListener=function(a,b,c){this.api(!0).order.listener(a,b,c)};this.fnUpdate=function(a,b,c,d,e){var h=this.api(!0);c===k||null===c?h.row(b).data(a):h.cell(b,c).data(a);(e===k||e)&&h.columns.adjust();(d===k||d)&&h.draw();return 0};this.fnVersionCheck=
v.fnVersionCheck;var b=this,c=a===k,d=this.length;c&&(a={});this.oApi=this.internal=v.internal;for(var e in n.ext.internal)e&&(this[e]=Nb(e));this.each(function(){var e={},g=1<d?Ya(e,a,!0):a,j=0,i,e=this.getAttribute("id"),m=!1,l=n.defaults,q=h(this);if("table"!=this.nodeName.toLowerCase())K(null,0,"Non-table node initialisation ("+this.nodeName+")",2);else{gb(l);hb(l.column);J(l,l,!0);J(l.column,l.column,!0);J(l,h.extend(g,q.data()),!0);var u=n.settings,j=0;for(i=u.length;j<i;j++){var o=u[j];if(o.nTable==
this||o.nTHead&&o.nTHead.parentNode==this||o.nTFoot&&o.nTFoot.parentNode==this){var r=g.bRetrieve!==k?g.bRetrieve:l.bRetrieve;if(c||r)return o.oInstance;if(g.bDestroy!==k?g.bDestroy:l.bDestroy){o.oInstance.fnDestroy();break}else{K(o,0,"Cannot reinitialise DataTable",3);return}}if(o.sTableId==this.id){u.splice(j,1);break}}if(null===e||""===e)this.id=e="DataTables_Table_"+n.ext._unique++;var p=h.extend(!0,{},n.models.oSettings,{sDestroyWidth:q[0].style.width,sInstance:e,sTableId:e});p.nTable=this;p.oApi=
b.internal;p.oInit=g;u.push(p);p.oInstance=1===b.length?b:q.dataTable();gb(g);Ea(g.oLanguage);g.aLengthMenu&&!g.iDisplayLength&&(g.iDisplayLength=Array.isArray(g.aLengthMenu[0])?g.aLengthMenu[0][0]:g.aLengthMenu[0]);g=Ya(h.extend(!0,{},l),g);F(p.oFeatures,g,"bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));F(p,g,["asStripeClasses","ajax","fnServerData","fnFormatNumber","sServerMethod","aaSorting","aaSortingFixed","aLengthMenu",
"sPaginationType","sAjaxSource","sAjaxDataProp","iStateDuration","sDom","bSortCellsTop","iTabIndex","fnStateLoadCallback","fnStateSaveCallback","renderer","searchDelay","rowId",["iCookieDuration","iStateDuration"],["oSearch","oPreviousSearch"],["aoSearchCols","aoPreSearchCols"],["iDisplayLength","_iDisplayLength"]]);F(p.oScroll,g,[["sScrollX","sX"],["sScrollXInner","sXInner"],["sScrollY","sY"],["bScrollCollapse","bCollapse"]]);F(p.oLanguage,g,"fnInfoCallback");z(p,"aoDrawCallback",g.fnDrawCallback,
"user");z(p,"aoServerParams",g.fnServerParams,"user");z(p,"aoStateSaveParams",g.fnStateSaveParams,"user");z(p,"aoStateLoadParams",g.fnStateLoadParams,"user");z(p,"aoStateLoaded",g.fnStateLoaded,"user");z(p,"aoRowCallback",g.fnRowCallback,"user");z(p,"aoRowCreatedCallback",g.fnCreatedRow,"user");z(p,"aoHeaderCallback",g.fnHeaderCallback,"user");z(p,"aoFooterCallback",g.fnFooterCallback,"user");z(p,"aoInitComplete",g.fnInitComplete,"user");z(p,"aoPreDrawCallback",g.fnPreDrawCallback,"user");p.rowIdFn=
S(g.rowId);ib(p);var s=p.oClasses;h.extend(s,n.ext.classes,g.oClasses);q.addClass(s.sTable);p.iInitDisplayStart===k&&(p.iInitDisplayStart=g.iDisplayStart,p._iDisplayStart=g.iDisplayStart);null!==g.iDeferLoading&&(p.bDeferLoading=!0,e=Array.isArray(g.iDeferLoading),p._iRecordsDisplay=e?g.iDeferLoading[0]:g.iDeferLoading,p._iRecordsTotal=e?g.iDeferLoading[1]:g.iDeferLoading);var w=p.oLanguage;h.extend(!0,w,g.oLanguage);w.sUrl&&(h.ajax({dataType:"json",url:w.sUrl,success:function(a){Ea(a);J(l.oLanguage,
a);h.extend(true,w,a);ia(p)},error:function(){ia(p)}}),m=!0);null===g.asStripeClasses&&(p.asStripeClasses=[s.sStripeOdd,s.sStripeEven]);var e=p.asStripeClasses,v=q.children("tbody").find("tr").eq(0);-1!==h.inArray(!0,h.map(e,function(a){return v.hasClass(a)}))&&(h("tbody tr",this).removeClass(e.join(" ")),p.asDestroyStripes=e.slice());e=[];u=this.getElementsByTagName("thead");0!==u.length&&(fa(p.aoHeader,u[0]),e=sa(p));if(null===g.aoColumns){u=[];j=0;for(i=e.length;j<i;j++)u.push(null)}else u=g.aoColumns;
j=0;for(i=u.length;j<i;j++)Ga(p,e?e[j]:null);kb(p,g.aoColumnDefs,u,function(a,b){la(p,a,b)});if(v.length){var U=function(a,b){return a.getAttribute("data-"+b)!==null?b:null};h(v[0]).children("th, td").each(function(a,b){var c=p.aoColumns[a];if(c.mData===a){var d=U(b,"sort")||U(b,"order"),e=U(b,"filter")||U(b,"search");if(d!==null||e!==null){c.mData={_:a+".display",sort:d!==null?a+".@data-"+d:k,type:d!==null?a+".@data-"+d:k,filter:e!==null?a+".@data-"+e:k};la(p,a)}}})}var V=p.oFeatures,e=function(){if(g.aaSorting===
k){var a=p.aaSorting;j=0;for(i=a.length;j<i;j++)a[j][1]=p.aoColumns[j].asSorting[0]}ya(p);V.bSort&&z(p,"aoDrawCallback",function(){if(p.bSorted){var a=Y(p),b={};h.each(a,function(a,c){b[c.src]=c.dir});t(p,null,"order",[p,a,b]);Kb(p)}});z(p,"aoDrawCallback",function(){(p.bSorted||y(p)==="ssp"||V.bDeferRender)&&ya(p)},"sc");var a=q.children("caption").each(function(){this._captionSide=h(this).css("caption-side")}),b=q.children("thead");b.length===0&&(b=h("<thead/>").appendTo(q));p.nTHead=b[0];b=q.children("tbody");
b.length===0&&(b=h("<tbody/>").appendTo(q));p.nTBody=b[0];b=q.children("tfoot");if(b.length===0&&a.length>0&&(p.oScroll.sX!==""||p.oScroll.sY!==""))b=h("<tfoot/>").appendTo(q);if(b.length===0||b.children().length===0)q.addClass(s.sNoFooter);else if(b.length>0){p.nTFoot=b[0];fa(p.aoFooter,p.nTFoot)}if(g.aaData)for(j=0;j<g.aaData.length;j++)O(p,g.aaData[j]);else(p.bDeferLoading||y(p)=="dom")&&oa(p,h(p.nTBody).children("tr"));p.aiDisplay=p.aiDisplayMaster.slice();p.bInitialised=true;m===false&&ia(p)};
g.bStateSave?(V.bStateSave=!0,z(p,"aoDrawCallback",za,"state_save"),Lb(p,g,e)):e()}});b=null;return this},v,r,o,s,$a={},Ob=/[\r\n\u2028]/g,Ca=/<.*?>/g,bc=/^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,cc=RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)","g"),Za=/['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,M=function(a){return!a||!0===a||"-"===a?!0:!1},Pb=function(a){var b=parseInt(a,10);return!isNaN(b)&&isFinite(a)?b:null},Qb=
function(a,b){$a[b]||($a[b]=RegExp(Sa(b),"g"));return"string"===typeof a&&"."!==b?a.replace(/\./g,"").replace($a[b],"."):a},ab=function(a,b,c){var d="string"===typeof a;if(M(a))return!0;b&&d&&(a=Qb(a,b));c&&d&&(a=a.replace(Za,""));return!isNaN(parseFloat(a))&&isFinite(a)},Rb=function(a,b,c){return M(a)?!0:!(M(a)||"string"===typeof a)?null:ab(a.replace(Ca,""),b,c)?!0:null},C=function(a,b,c){var d=[],e=0,f=a.length;if(c!==k)for(;e<f;e++)a[e]&&a[e][b]&&d.push(a[e][b][c]);else for(;e<f;e++)a[e]&&d.push(a[e][b]);
return d},ka=function(a,b,c,d){var e=[],f=0,g=b.length;if(d!==k)for(;f<g;f++)a[b[f]][c]&&e.push(a[b[f]][c][d]);else for(;f<g;f++)e.push(a[b[f]][c]);return e},Z=function(a,b){var c=[],d;b===k?(b=0,d=a):(d=b,b=a);for(var e=b;e<d;e++)c.push(e);return c},Sb=function(a){for(var b=[],c=0,d=a.length;c<d;c++)a[c]&&b.push(a[c]);return b},ra=function(a){var b;a:{if(!(2>a.length)){b=a.slice().sort();for(var c=b[0],d=1,e=b.length;d<e;d++){if(b[d]===c){b=!1;break a}c=b[d]}}b=!0}if(b)return a.slice();b=[];var e=
a.length,f,g=0,d=0;a:for(;d<e;d++){c=a[d];for(f=0;f<g;f++)if(b[f]===c)continue a;b.push(c);g++}return b},Tb=function(a,b){if(Array.isArray(b))for(var c=0;c<b.length;c++)Tb(a,b[c]);else a.push(b);return a};Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)});String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")});n.util={throttle:function(a,b){var c=b!==k?b:200,d,e;return function(){var b=
this,g=+new Date,j=arguments;if(d&&g<d+c){clearTimeout(e);e=setTimeout(function(){d=k;a.apply(b,j)},c)}else{d=g;a.apply(b,j)}}},escapeRegex:function(a){return a.replace(cc,"\\$1")}};var A=function(a,b,c){a[b]!==k&&(a[c]=a[b])},da=/\[.*?\]$/,X=/\(\)$/,Sa=n.util.escapeRegex,wa=h("<div>")[0],Zb=wa.textContent!==k,ac=/<.*?>/g,Qa=n.util.throttle,Ub=[],x=Array.prototype,dc=function(a){var b,c,d=n.settings,e=h.map(d,function(a){return a.nTable});if(a){if(a.nTable&&a.oApi)return[a];if(a.nodeName&&a.nodeName.toLowerCase()===
"table"){b=h.inArray(a,e);return b!==-1?[d[b]]:null}if(a&&typeof a.settings==="function")return a.settings().toArray();typeof a==="string"?c=h(a):a instanceof h&&(c=a)}else return[];if(c)return c.map(function(){b=h.inArray(this,e);return b!==-1?d[b]:null}).toArray()};r=function(a,b){if(!(this instanceof r))return new r(a,b);var c=[],d=function(a){(a=dc(a))&&c.push.apply(c,a)};if(Array.isArray(a))for(var e=0,f=a.length;e<f;e++)d(a[e]);else d(a);this.context=ra(c);b&&h.merge(this,b);this.selector={rows:null,
cols:null,opts:null};r.extend(this,this,Ub)};n.Api=r;h.extend(r.prototype,{any:function(){return this.count()!==0},concat:x.concat,context:[],count:function(){return this.flatten().length},each:function(a){for(var b=0,c=this.length;b<c;b++)a.call(this,this[b],b,this);return this},eq:function(a){var b=this.context;return b.length>a?new r(b[a],this[a]):null},filter:function(a){var b=[];if(x.filter)b=x.filter.call(this,a,this);else for(var c=0,d=this.length;c<d;c++)a.call(this,this[c],c,this)&&b.push(this[c]);
return new r(this.context,b)},flatten:function(){var a=[];return new r(this.context,a.concat.apply(a,this.toArray()))},join:x.join,indexOf:x.indexOf||function(a,b){for(var c=b||0,d=this.length;c<d;c++)if(this[c]===a)return c;return-1},iterator:function(a,b,c,d){var e=[],f,g,j,i,h,l=this.context,n,o,s=this.selector;if(typeof a==="string"){d=c;c=b;b=a;a=false}g=0;for(j=l.length;g<j;g++){var t=new r(l[g]);if(b==="table"){f=c.call(t,l[g],g);f!==k&&e.push(f)}else if(b==="columns"||b==="rows"){f=c.call(t,
l[g],this[g],g);f!==k&&e.push(f)}else if(b==="column"||b==="column-rows"||b==="row"||b==="cell"){o=this[g];b==="column-rows"&&(n=Da(l[g],s.opts));i=0;for(h=o.length;i<h;i++){f=o[i];f=b==="cell"?c.call(t,l[g],f.row,f.column,g,i):c.call(t,l[g],f,g,i,n);f!==k&&e.push(f)}}}if(e.length||d){a=new r(l,a?e.concat.apply([],e):e);b=a.selector;b.rows=s.rows;b.cols=s.cols;b.opts=s.opts;return a}return this},lastIndexOf:x.lastIndexOf||function(a,b){return this.indexOf.apply(this.toArray.reverse(),arguments)},
length:0,map:function(a){var b=[];if(x.map)b=x.map.call(this,a,this);else for(var c=0,d=this.length;c<d;c++)b.push(a.call(this,this[c],c));return new r(this.context,b)},pluck:function(a){return this.map(function(b){return b[a]})},pop:x.pop,push:x.push,reduce:x.reduce||function(a,b){return jb(this,a,b,0,this.length,1)},reduceRight:x.reduceRight||function(a,b){return jb(this,a,b,this.length-1,-1,-1)},reverse:x.reverse,selector:null,shift:x.shift,slice:function(){return new r(this.context,this)},sort:x.sort,
splice:x.splice,toArray:function(){return x.slice.call(this)},to$:function(){return h(this)},toJQuery:function(){return h(this)},unique:function(){return new r(this.context,ra(this))},unshift:x.unshift});r.extend=function(a,b,c){if(c.length&&b&&(b instanceof r||b.__dt_wrapper)){var d,e,f,g=function(a,b,c){return function(){var d=b.apply(a,arguments);r.extend(d,d,c.methodExt);return d}};d=0;for(e=c.length;d<e;d++){f=c[d];b[f.name]=f.type==="function"?g(a,f.val,f):f.type==="object"?{}:f.val;b[f.name].__dt_wrapper=
true;r.extend(a,b[f.name],f.propExt)}}};r.register=o=function(a,b){if(Array.isArray(a))for(var c=0,d=a.length;c<d;c++)r.register(a[c],b);else for(var e=a.split("."),f=Ub,g,j,c=0,d=e.length;c<d;c++){g=(j=e[c].indexOf("()")!==-1)?e[c].replace("()",""):e[c];var i;a:{i=0;for(var k=f.length;i<k;i++)if(f[i].name===g){i=f[i];break a}i=null}if(!i){i={name:g,val:{},methodExt:[],propExt:[],type:"object"};f.push(i)}if(c===d-1){i.val=b;i.type=typeof b==="function"?"function":h.isPlainObject(b)?"object":"other"}else f=
j?i.methodExt:i.propExt}};r.registerPlural=s=function(a,b,c){r.register(a,c);r.register(b,function(){var a=c.apply(this,arguments);return a===this?this:a instanceof r?a.length?Array.isArray(a[0])?new r(a.context,a[0]):a[0]:k:a})};var Vb=function(a,b){if(Array.isArray(a))return h.map(a,function(a){return Vb(a,b)});if(typeof a==="number")return[b[a]];var c=h.map(b,function(a){return a.nTable});return h(c).filter(a).map(function(){var a=h.inArray(this,c);return b[a]}).toArray()};o("tables()",function(a){return a!==
k&&a!==null?new r(Vb(a,this.context)):this});o("table()",function(a){var a=this.tables(a),b=a.context;return b.length?new r(b[0]):a});s("tables().nodes()","table().node()",function(){return this.iterator("table",function(a){return a.nTable},1)});s("tables().body()","table().body()",function(){return this.iterator("table",function(a){return a.nTBody},1)});s("tables().header()","table().header()",function(){return this.iterator("table",function(a){return a.nTHead},1)});s("tables().footer()","table().footer()",
function(){return this.iterator("table",function(a){return a.nTFoot},1)});s("tables().containers()","table().container()",function(){return this.iterator("table",function(a){return a.nTableWrapper},1)});o("draw()",function(a){return this.iterator("table",function(b){if(a==="page")P(b);else{typeof a==="string"&&(a=a==="full-hold"?false:true);T(b,a===false)}})});o("page()",function(a){return a===k?this.page.info().page:this.iterator("table",function(b){Va(b,a)})});o("page.info()",function(){if(this.context.length===
0)return k;var a=this.context[0],b=a._iDisplayStart,c=a.oFeatures.bPaginate?a._iDisplayLength:-1,d=a.fnRecordsDisplay(),e=c===-1;return{page:e?0:Math.floor(b/c),pages:e?1:Math.ceil(d/c),start:b,end:a.fnDisplayEnd(),length:c,recordsTotal:a.fnRecordsTotal(),recordsDisplay:d,serverSide:y(a)==="ssp"}});o("page.len()",function(a){return a===k?this.context.length!==0?this.context[0]._iDisplayLength:k:this.iterator("table",function(b){Ta(b,a)})});var Wb=function(a,b,c){if(c){var d=new r(a);d.one("draw",
function(){c(d.ajax.json())})}if(y(a)=="ssp")T(a,b);else{D(a,true);var e=a.jqXHR;e&&e.readyState!==4&&e.abort();ta(a,[],function(c){pa(a);for(var c=ua(a,c),d=0,e=c.length;d<e;d++)O(a,c[d]);T(a,b);D(a,false)})}};o("ajax.json()",function(){var a=this.context;if(a.length>0)return a[0].json});o("ajax.params()",function(){var a=this.context;if(a.length>0)return a[0].oAjaxData});o("ajax.reload()",function(a,b){return this.iterator("table",function(c){Wb(c,b===false,a)})});o("ajax.url()",function(a){var b=
this.context;if(a===k){if(b.length===0)return k;b=b[0];return b.ajax?h.isPlainObject(b.ajax)?b.ajax.url:b.ajax:b.sAjaxSource}return this.iterator("table",function(b){h.isPlainObject(b.ajax)?b.ajax.url=a:b.ajax=a})});o("ajax.url().load()",function(a,b){return this.iterator("table",function(c){Wb(c,b===false,a)})});var bb=function(a,b,c,d,e){var f=[],g,j,h,m,l,n;h=typeof b;if(!b||h==="string"||h==="function"||b.length===k)b=[b];h=0;for(m=b.length;h<m;h++){j=b[h]&&b[h].split&&!b[h].match(/[\[\(:]/)?
b[h].split(","):[b[h]];l=0;for(n=j.length;l<n;l++)(g=c(typeof j[l]==="string"?j[l].trim():j[l]))&&g.length&&(f=f.concat(g))}a=v.selector[a];if(a.length){h=0;for(m=a.length;h<m;h++)f=a[h](d,e,f)}return ra(f)},cb=function(a){a||(a={});if(a.filter&&a.search===k)a.search=a.filter;return h.extend({search:"none",order:"current",page:"all"},a)},db=function(a){for(var b=0,c=a.length;b<c;b++)if(a[b].length>0){a[0]=a[b];a[0].length=1;a.length=1;a.context=[a.context[b]];return a}a.length=0;return a},Da=function(a,
b){var c,d,e,f=[],g=a.aiDisplay;e=a.aiDisplayMaster;var j=b.search;c=b.order;d=b.page;if(y(a)=="ssp")return j==="removed"?[]:Z(0,e.length);if(d=="current"){c=a._iDisplayStart;for(d=a.fnDisplayEnd();c<d;c++)f.push(g[c])}else if(c=="current"||c=="applied")if(j=="none")f=e.slice();else if(j=="applied")f=g.slice();else{if(j=="removed"){var i={};c=0;for(d=g.length;c<d;c++)i[g[c]]=null;f=h.map(e,function(a){return!i.hasOwnProperty(a)?a:null})}}else if(c=="index"||c=="original"){c=0;for(d=a.aoData.length;c<
d;c++)if(j=="none")f.push(c);else{e=h.inArray(c,g);(e===-1&&j=="removed"||e>=0&&j=="applied")&&f.push(c)}}return f};o("rows()",function(a,b){if(a===k)a="";else if(h.isPlainObject(a)){b=a;a=""}var b=cb(b),c=this.iterator("table",function(c){var e=b,f;return bb("row",a,function(a){var b=Pb(a),i=c.aoData;if(b!==null&&!e)return[b];f||(f=Da(c,e));if(b!==null&&h.inArray(b,f)!==-1)return[b];if(a===null||a===k||a==="")return f;if(typeof a==="function")return h.map(f,function(b){var c=i[b];return a(b,c._aData,
c.nTr)?b:null});if(a.nodeName){var b=a._DT_RowIndex,m=a._DT_CellIndex;if(b!==k)return i[b]&&i[b].nTr===a?[b]:[];if(m)return i[m.row]&&i[m.row].nTr===a.parentNode?[m.row]:[];b=h(a).closest("*[data-dt-row]");return b.length?[b.data("dt-row")]:[]}if(typeof a==="string"&&a.charAt(0)==="#"){b=c.aIds[a.replace(/^#/,"")];if(b!==k)return[b.idx]}b=Sb(ka(c.aoData,f,"nTr"));return h(b).filter(a).map(function(){return this._DT_RowIndex}).toArray()},c,e)},1);c.selector.rows=a;c.selector.opts=b;return c});o("rows().nodes()",
function(){return this.iterator("row",function(a,b){return a.aoData[b].nTr||k},1)});o("rows().data()",function(){return this.iterator(true,"rows",function(a,b){return ka(a.aoData,b,"_aData")},1)});s("rows().cache()","row().cache()",function(a){return this.iterator("row",function(b,c){var d=b.aoData[c];return a==="search"?d._aFilterData:d._aSortData},1)});s("rows().invalidate()","row().invalidate()",function(a){return this.iterator("row",function(b,c){ea(b,c,a)})});s("rows().indexes()","row().index()",
function(){return this.iterator("row",function(a,b){return b},1)});s("rows().ids()","row().id()",function(a){for(var b=[],c=this.context,d=0,e=c.length;d<e;d++)for(var f=0,g=this[d].length;f<g;f++){var h=c[d].rowIdFn(c[d].aoData[this[d][f]]._aData);b.push((a===true?"#":"")+h)}return new r(c,b)});s("rows().remove()","row().remove()",function(){var a=this;this.iterator("row",function(b,c,d){var e=b.aoData,f=e[c],g,h,i,m,l;e.splice(c,1);g=0;for(h=e.length;g<h;g++){i=e[g];l=i.anCells;if(i.nTr!==null)i.nTr._DT_RowIndex=
g;if(l!==null){i=0;for(m=l.length;i<m;i++)l[i]._DT_CellIndex.row=g}}qa(b.aiDisplayMaster,c);qa(b.aiDisplay,c);qa(a[d],c,false);b._iRecordsDisplay>0&&b._iRecordsDisplay--;Ua(b);c=b.rowIdFn(f._aData);c!==k&&delete b.aIds[c]});this.iterator("table",function(a){for(var c=0,d=a.aoData.length;c<d;c++)a.aoData[c].idx=c});return this});o("rows.add()",function(a){var b=this.iterator("table",function(b){var c,f,g,h=[];f=0;for(g=a.length;f<g;f++){c=a[f];c.nodeName&&c.nodeName.toUpperCase()==="TR"?h.push(oa(b,
c)[0]):h.push(O(b,c))}return h},1),c=this.rows(-1);c.pop();h.merge(c,b);return c});o("row()",function(a,b){return db(this.rows(a,b))});o("row().data()",function(a){var b=this.context;if(a===k)return b.length&&this.length?b[0].aoData[this[0]]._aData:k;var c=b[0].aoData[this[0]];c._aData=a;Array.isArray(a)&&(c.nTr&&c.nTr.id)&&N(b[0].rowId)(a,c.nTr.id);ea(b[0],this[0],"data");return this});o("row().node()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]].nTr||null:null});
o("row.add()",function(a){a instanceof h&&a.length&&(a=a[0]);var b=this.iterator("table",function(b){return a.nodeName&&a.nodeName.toUpperCase()==="TR"?oa(b,a)[0]:O(b,a)});return this.row(b[0])});var eb=function(a,b){var c=a.context;if(c.length)if((c=c[0].aoData[b!==k?b:a[0]])&&c._details){c._details.remove();c._detailsShow=k;c._details=k}},Xb=function(a,b){var c=a.context;if(c.length&&a.length){var d=c[0].aoData[a[0]];if(d._details){(d._detailsShow=b)?d._details.insertAfter(d.nTr):d._details.detach();
var e=c[0],f=new r(e),g=e.aoData;f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");if(C(g,"_details").length>0){f.on("draw.dt.DT_details",function(a,b){e===b&&f.rows({page:"current"}).eq(0).each(function(a){a=g[a];a._detailsShow&&a._details.insertAfter(a.nTr)})});f.on("column-visibility.dt.DT_details",function(a,b){if(e===b)for(var c,d=W(b),f=0,h=g.length;f<h;f++){c=g[f];c._details&&c._details.children("td[colspan]").attr("colspan",d)}});f.on("destroy.dt.DT_details",
function(a,b){if(e===b)for(var c=0,d=g.length;c<d;c++)g[c]._details&&eb(f,c)})}}}};o("row().child()",function(a,b){var c=this.context;if(a===k)return c.length&&this.length?c[0].aoData[this[0]]._details:k;if(a===true)this.child.show();else if(a===false)eb(this);else if(c.length&&this.length){var d=c[0],c=c[0].aoData[this[0]],e=[],f=function(a,b){if(Array.isArray(a)||a instanceof h)for(var c=0,k=a.length;c<k;c++)f(a[c],b);else if(a.nodeName&&a.nodeName.toLowerCase()==="tr")e.push(a);else{c=h("<tr><td></td></tr>").addClass(b);
h("td",c).addClass(b).html(a)[0].colSpan=W(d);e.push(c[0])}};f(a,b);c._details&&c._details.detach();c._details=h(e);c._detailsShow&&c._details.insertAfter(c.nTr)}return this});o(["row().child.show()","row().child().show()"],function(){Xb(this,true);return this});o(["row().child.hide()","row().child().hide()"],function(){Xb(this,false);return this});o(["row().child.remove()","row().child().remove()"],function(){eb(this);return this});o("row().child.isShown()",function(){var a=this.context;return a.length&&
this.length?a[0].aoData[this[0]]._detailsShow||false:false});var ec=/^([^:]+):(name|visIdx|visible)$/,Yb=function(a,b,c,d,e){for(var c=[],d=0,f=e.length;d<f;d++)c.push(B(a,e[d],b));return c};o("columns()",function(a,b){if(a===k)a="";else if(h.isPlainObject(a)){b=a;a=""}var b=cb(b),c=this.iterator("table",function(c){var e=a,f=b,g=c.aoColumns,j=C(g,"sName"),i=C(g,"nTh");return bb("column",e,function(a){var b=Pb(a);if(a==="")return Z(g.length);if(b!==null)return[b>=0?b:g.length+b];if(typeof a==="function"){var e=
Da(c,f);return h.map(g,function(b,f){return a(f,Yb(c,f,0,0,e),i[f])?f:null})}var k=typeof a==="string"?a.match(ec):"";if(k)switch(k[2]){case "visIdx":case "visible":b=parseInt(k[1],10);if(b<0){var n=h.map(g,function(a,b){return a.bVisible?b:null});return[n[n.length+b]]}return[ba(c,b)];case "name":return h.map(j,function(a,b){return a===k[1]?b:null});default:return[]}if(a.nodeName&&a._DT_CellIndex)return[a._DT_CellIndex.column];b=h(i).filter(a).map(function(){return h.inArray(this,i)}).toArray();if(b.length||
!a.nodeName)return b;b=h(a).closest("*[data-dt-column]");return b.length?[b.data("dt-column")]:[]},c,f)},1);c.selector.cols=a;c.selector.opts=b;return c});s("columns().header()","column().header()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTh},1)});s("columns().footer()","column().footer()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTf},1)});s("columns().data()","column().data()",function(){return this.iterator("column-rows",Yb,
1)});s("columns().dataSrc()","column().dataSrc()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].mData},1)});s("columns().cache()","column().cache()",function(a){return this.iterator("column-rows",function(b,c,d,e,f){return ka(b.aoData,f,a==="search"?"_aFilterData":"_aSortData",c)},1)});s("columns().nodes()","column().nodes()",function(){return this.iterator("column-rows",function(a,b,c,d,e){return ka(a.aoData,e,"anCells",b)},1)});s("columns().visible()","column().visible()",
function(a,b){var c=this,d=this.iterator("column",function(b,c){if(a===k)return b.aoColumns[c].bVisible;var d=b.aoColumns,j=d[c],i=b.aoData,m,l,n;if(a!==k&&j.bVisible!==a){if(a){var o=h.inArray(true,C(d,"bVisible"),c+1);m=0;for(l=i.length;m<l;m++){n=i[m].nTr;d=i[m].anCells;n&&n.insertBefore(d[c],d[o]||null)}}else h(C(b.aoData,"anCells",c)).detach();j.bVisible=a}});a!==k&&this.iterator("table",function(d){ga(d,d.aoHeader);ga(d,d.aoFooter);d.aiDisplay.length||h(d.nTBody).find("td[colspan]").attr("colspan",
W(d));za(d);c.iterator("column",function(c,d){t(c,null,"column-visibility",[c,d,a,b])});(b===k||b)&&c.columns.adjust()});return d});s("columns().indexes()","column().index()",function(a){return this.iterator("column",function(b,c){return a==="visible"?ca(b,c):c},1)});o("columns.adjust()",function(){return this.iterator("table",function(a){aa(a)},1)});o("column.index()",function(a,b){if(this.context.length!==0){var c=this.context[0];if(a==="fromVisible"||a==="toData")return ba(c,b);if(a==="fromData"||
a==="toVisible")return ca(c,b)}});o("column()",function(a,b){return db(this.columns(a,b))});o("cells()",function(a,b,c){if(h.isPlainObject(a))if(a.row===k){c=a;a=null}else{c=b;b=null}if(h.isPlainObject(b)){c=b;b=null}if(b===null||b===k)return this.iterator("table",function(b){var d=a,e=cb(c),f=b.aoData,g=Da(b,e),j=Sb(ka(f,g,"anCells")),i=h(Tb([],j)),m,n=b.aoColumns.length,o,s,r,t,w,v;return bb("cell",d,function(a){var c=typeof a==="function";if(a===null||a===k||c){o=[];s=0;for(r=g.length;s<r;s++){m=
g[s];for(t=0;t<n;t++){w={row:m,column:t};if(c){v=f[m];a(w,B(b,m,t),v.anCells?v.anCells[t]:null)&&o.push(w)}else o.push(w)}}return o}if(h.isPlainObject(a))return a.column!==k&&a.row!==k&&h.inArray(a.row,g)!==-1?[a]:[];c=i.filter(a).map(function(a,b){return{row:b._DT_CellIndex.row,column:b._DT_CellIndex.column}}).toArray();if(c.length||!a.nodeName)return c;v=h(a).closest("*[data-dt-row]");return v.length?[{row:v.data("dt-row"),column:v.data("dt-column")}]:[]},b,e)});var d=c?{page:c.page,order:c.order,
search:c.search}:{},e=this.columns(b,d),f=this.rows(a,d),g,j,i,m,d=this.iterator("table",function(a,b){var c=[];g=0;for(j=f[b].length;g<j;g++){i=0;for(m=e[b].length;i<m;i++)c.push({row:f[b][g],column:e[b][i]})}return c},1),d=c&&c.selected?this.cells(d,c):d;h.extend(d.selector,{cols:b,rows:a,opts:c});return d});s("cells().nodes()","cell().node()",function(){return this.iterator("cell",function(a,b,c){return(a=a.aoData[b])&&a.anCells?a.anCells[c]:k},1)});o("cells().data()",function(){return this.iterator("cell",
function(a,b,c){return B(a,b,c)},1)});s("cells().cache()","cell().cache()",function(a){a=a==="search"?"_aFilterData":"_aSortData";return this.iterator("cell",function(b,c,d){return b.aoData[c][a][d]},1)});s("cells().render()","cell().render()",function(a){return this.iterator("cell",function(b,c,d){return B(b,c,d,a)},1)});s("cells().indexes()","cell().index()",function(){return this.iterator("cell",function(a,b,c){return{row:b,column:c,columnVisible:ca(a,c)}},1)});s("cells().invalidate()","cell().invalidate()",
function(a){return this.iterator("cell",function(b,c,d){ea(b,c,a,d)})});o("cell()",function(a,b,c){return db(this.cells(a,b,c))});o("cell().data()",function(a){var b=this.context,c=this[0];if(a===k)return b.length&&c.length?B(b[0],c[0].row,c[0].column):k;lb(b[0],c[0].row,c[0].column,a);ea(b[0],c[0].row,"data",c[0].column);return this});o("order()",function(a,b){var c=this.context;if(a===k)return c.length!==0?c[0].aaSorting:k;typeof a==="number"?a=[[a,b]]:a.length&&!Array.isArray(a[0])&&(a=Array.prototype.slice.call(arguments));
return this.iterator("table",function(b){b.aaSorting=a.slice()})});o("order.listener()",function(a,b,c){return this.iterator("table",function(d){Oa(d,a,b,c)})});o("order.fixed()",function(a){if(!a){var b=this.context,b=b.length?b[0].aaSortingFixed:k;return Array.isArray(b)?{pre:b}:b}return this.iterator("table",function(b){b.aaSortingFixed=h.extend(true,{},a)})});o(["columns().order()","column().order()"],function(a){var b=this;return this.iterator("table",function(c,d){var e=[];h.each(b[d],function(b,
c){e.push([c,a])});c.aaSorting=e})});o("search()",function(a,b,c,d){var e=this.context;return a===k?e.length!==0?e[0].oPreviousSearch.sSearch:k:this.iterator("table",function(e){e.oFeatures.bFilter&&ha(e,h.extend({},e.oPreviousSearch,{sSearch:a+"",bRegex:b===null?false:b,bSmart:c===null?true:c,bCaseInsensitive:d===null?true:d}),1)})});s("columns().search()","column().search()",function(a,b,c,d){return this.iterator("column",function(e,f){var g=e.aoPreSearchCols;if(a===k)return g[f].sSearch;if(e.oFeatures.bFilter){h.extend(g[f],
{sSearch:a+"",bRegex:b===null?false:b,bSmart:c===null?true:c,bCaseInsensitive:d===null?true:d});ha(e,e.oPreviousSearch,1)}})});o("state()",function(){return this.context.length?this.context[0].oSavedState:null});o("state.clear()",function(){return this.iterator("table",function(a){a.fnStateSaveCallback.call(a.oInstance,a,{})})});o("state.loaded()",function(){return this.context.length?this.context[0].oLoadedState:null});o("state.save()",function(){return this.iterator("table",function(a){za(a)})});
n.versionCheck=n.fnVersionCheck=function(a){for(var b=n.version.split("."),a=a.split("."),c,d,e=0,f=a.length;e<f;e++){c=parseInt(b[e],10)||0;d=parseInt(a[e],10)||0;if(c!==d)return c>d}return true};n.isDataTable=n.fnIsDataTable=function(a){var b=h(a).get(0),c=false;if(a instanceof n.Api)return true;h.each(n.settings,function(a,e){var f=e.nScrollHead?h("table",e.nScrollHead)[0]:null,g=e.nScrollFoot?h("table",e.nScrollFoot)[0]:null;if(e.nTable===b||f===b||g===b)c=true});return c};n.tables=n.fnTables=
function(a){var b=false;if(h.isPlainObject(a)){b=a.api;a=a.visible}var c=h.map(n.settings,function(b){if(!a||a&&h(b.nTable).is(":visible"))return b.nTable});return b?new r(c):c};n.camelToHungarian=J;o("$()",function(a,b){var c=this.rows(b).nodes(),c=h(c);return h([].concat(c.filter(a).toArray(),c.find(a).toArray()))});h.each(["on","one","off"],function(a,b){o(b+"()",function(){var a=Array.prototype.slice.call(arguments);a[0]=h.map(a[0].split(/\s/),function(a){return!a.match(/\.dt\b/)?a+".dt":a}).join(" ");
var d=h(this.tables().nodes());d[b].apply(d,a);return this})});o("clear()",function(){return this.iterator("table",function(a){pa(a)})});o("settings()",function(){return new r(this.context,this.context)});o("init()",function(){var a=this.context;return a.length?a[0].oInit:null});o("data()",function(){return this.iterator("table",function(a){return C(a.aoData,"_aData")}).flatten()});o("destroy()",function(a){a=a||false;return this.iterator("table",function(b){var c=b.nTableWrapper.parentNode,d=b.oClasses,
e=b.nTable,f=b.nTBody,g=b.nTHead,j=b.nTFoot,i=h(e),f=h(f),k=h(b.nTableWrapper),l=h.map(b.aoData,function(a){return a.nTr}),o;b.bDestroying=true;t(b,"aoDestroyCallback","destroy",[b]);a||(new r(b)).columns().visible(true);k.off(".DT").find(":not(tbody *)").off(".DT");h(E).off(".DT-"+b.sInstance);if(e!=g.parentNode){i.children("thead").detach();i.append(g)}if(j&&e!=j.parentNode){i.children("tfoot").detach();i.append(j)}b.aaSorting=[];b.aaSortingFixed=[];ya(b);h(l).removeClass(b.asStripeClasses.join(" "));
h("th, td",g).removeClass(d.sSortable+" "+d.sSortableAsc+" "+d.sSortableDesc+" "+d.sSortableNone);f.children().detach();f.append(l);g=a?"remove":"detach";i[g]();k[g]();if(!a&&c){c.insertBefore(e,b.nTableReinsertBefore);i.css("width",b.sDestroyWidth).removeClass(d.sTable);(o=b.asDestroyStripes.length)&&f.children().each(function(a){h(this).addClass(b.asDestroyStripes[a%o])})}c=h.inArray(b,n.settings);c!==-1&&n.settings.splice(c,1)})});h.each(["column","row","cell"],function(a,b){o(b+"s().every()",
function(a){var d=this.selector.opts,e=this;return this.iterator(b,function(f,g,h,i,m){a.call(e[b](g,b==="cell"?h:d,b==="cell"?d:k),g,h,i,m)})})});o("i18n()",function(a,b,c){var d=this.context[0],a=S(a)(d.oLanguage);a===k&&(a=b);c!==k&&h.isPlainObject(a)&&(a=a[c]!==k?a[c]:a._);return a.replace("%d",c)});n.version="1.10.22";n.settings=[];n.models={};n.models.oSearch={bCaseInsensitive:!0,sSearch:"",bRegex:!1,bSmart:!0};n.models.oRow={nTr:null,anCells:null,_aData:[],_aSortData:null,_aFilterData:null,
_sFilterRow:null,_sRowStripe:"",src:null,idx:-1};n.models.oColumn={idx:null,aDataSort:null,asSorting:null,bSearchable:null,bSortable:null,bVisible:null,_sManualType:null,_bAttrSrc:!1,fnCreatedCell:null,fnGetData:null,fnSetData:null,mData:null,mRender:null,nTh:null,nTf:null,sClass:null,sContentPadding:null,sDefaultContent:null,sName:null,sSortDataType:"std",sSortingClass:null,sSortingClassJUI:null,sTitle:null,sType:null,sWidth:null,sWidthOrig:null};n.defaults={aaData:null,aaSorting:[[0,"asc"]],aaSortingFixed:[],
ajax:null,aLengthMenu:[10,25,50,100],aoColumns:null,aoColumnDefs:null,aoSearchCols:[],asStripeClasses:null,bAutoWidth:!0,bDeferRender:!1,bDestroy:!1,bFilter:!0,bInfo:!0,bLengthChange:!0,bPaginate:!0,bProcessing:!1,bRetrieve:!1,bScrollCollapse:!1,bServerSide:!1,bSort:!0,bSortMulti:!0,bSortCellsTop:!1,bSortClasses:!0,bStateSave:!1,fnCreatedRow:null,fnDrawCallback:null,fnFooterCallback:null,fnFormatNumber:function(a){return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,this.oLanguage.sThousands)},fnHeaderCallback:null,
fnInfoCallback:null,fnInitComplete:null,fnPreDrawCallback:null,fnRowCallback:null,fnServerData:null,fnServerParams:null,fnStateLoadCallback:function(a){try{return JSON.parse((a.iStateDuration===-1?sessionStorage:localStorage).getItem("DataTables_"+a.sInstance+"_"+location.pathname))}catch(b){return{}}},fnStateLoadParams:null,fnStateLoaded:null,fnStateSaveCallback:function(a,b){try{(a.iStateDuration===-1?sessionStorage:localStorage).setItem("DataTables_"+a.sInstance+"_"+location.pathname,JSON.stringify(b))}catch(c){}},
fnStateSaveParams:null,iStateDuration:7200,iDeferLoading:null,iDisplayLength:10,iDisplayStart:0,iTabIndex:0,oClasses:{},oLanguage:{oAria:{sSortAscending:": activate to sort column ascending",sSortDescending:": activate to sort column descending"},oPaginate:{sFirst:"First",sLast:"Last",sNext:"Next",sPrevious:"Previous"},sEmptyTable:"No data available in table",sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",sInfoEmpty:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",
sInfoPostFix:"",sDecimal:"",sThousands:",",sLengthMenu:"Show _MENU_ entries",sLoadingRecords:"Loading...",sProcessing:"Processing...",sSearch:"Search:",sSearchPlaceholder:"",sUrl:"",sZeroRecords:"No matching records found"},oSearch:h.extend({},n.models.oSearch),sAjaxDataProp:"data",sAjaxSource:null,sDom:"lfrtip",searchDelay:null,sPaginationType:"simple_numbers",sScrollX:"",sScrollXInner:"",sScrollY:"",sServerMethod:"GET",renderer:null,rowId:"DT_RowId"};$(n.defaults);n.defaults.column={aDataSort:null,
iDataSort:-1,asSorting:["asc","desc"],bSearchable:!0,bSortable:!0,bVisible:!0,fnCreatedCell:null,mData:null,mRender:null,sCellType:"td",sClass:"",sContentPadding:"",sDefaultContent:null,sName:"",sSortDataType:"std",sTitle:null,sType:null,sWidth:null};$(n.defaults.column);n.models.oSettings={oFeatures:{bAutoWidth:null,bDeferRender:null,bFilter:null,bInfo:null,bLengthChange:null,bPaginate:null,bProcessing:null,bServerSide:null,bSort:null,bSortMulti:null,bSortClasses:null,bStateSave:null},oScroll:{bCollapse:null,
iBarWidth:0,sX:null,sXInner:null,sY:null},oLanguage:{fnInfoCallback:null},oBrowser:{bScrollOversize:!1,bScrollbarLeft:!1,bBounding:!1,barWidth:0},ajax:null,aanFeatures:[],aoData:[],aiDisplay:[],aiDisplayMaster:[],aIds:{},aoColumns:[],aoHeader:[],aoFooter:[],oPreviousSearch:{},aoPreSearchCols:[],aaSorting:null,aaSortingFixed:[],asStripeClasses:null,asDestroyStripes:[],sDestroyWidth:0,aoRowCallback:[],aoHeaderCallback:[],aoFooterCallback:[],aoDrawCallback:[],aoRowCreatedCallback:[],aoPreDrawCallback:[],
aoInitComplete:[],aoStateSaveParams:[],aoStateLoadParams:[],aoStateLoaded:[],sTableId:"",nTable:null,nTHead:null,nTFoot:null,nTBody:null,nTableWrapper:null,bDeferLoading:!1,bInitialised:!1,aoOpenRows:[],sDom:null,searchDelay:null,sPaginationType:"two_button",iStateDuration:0,aoStateSave:[],aoStateLoad:[],oSavedState:null,oLoadedState:null,sAjaxSource:null,sAjaxDataProp:null,bAjaxDataGet:!0,jqXHR:null,json:k,oAjaxData:k,fnServerData:null,aoServerParams:[],sServerMethod:null,fnFormatNumber:null,aLengthMenu:null,
iDraw:0,bDrawing:!1,iDrawError:-1,_iDisplayLength:10,_iDisplayStart:0,_iRecordsTotal:0,_iRecordsDisplay:0,oClasses:{},bFiltered:!1,bSorted:!1,bSortCellsTop:null,oInit:null,aoDestroyCallback:[],fnRecordsTotal:function(){return y(this)=="ssp"?this._iRecordsTotal*1:this.aiDisplayMaster.length},fnRecordsDisplay:function(){return y(this)=="ssp"?this._iRecordsDisplay*1:this.aiDisplay.length},fnDisplayEnd:function(){var a=this._iDisplayLength,b=this._iDisplayStart,c=b+a,d=this.aiDisplay.length,e=this.oFeatures,
f=e.bPaginate;return e.bServerSide?f===false||a===-1?b+d:Math.min(b+a,this._iRecordsDisplay):!f||c>d||a===-1?d:c},oInstance:null,sInstance:null,iTabIndex:0,nScrollHead:null,nScrollFoot:null,aLastSort:[],oPlugins:{},rowIdFn:null,rowId:null};n.ext=v={buttons:{},classes:{},builder:"-source-",errMode:"alert",feature:[],search:[],selector:{cell:[],column:[],row:[]},internal:{},legacy:{ajax:null},pager:{},renderer:{pageButton:{},header:{}},order:{},type:{detect:[],search:{},order:{}},_unique:0,fnVersionCheck:n.fnVersionCheck,
iApiIndex:0,oJUIClasses:{},sVersion:n.version};h.extend(v,{afnFiltering:v.search,aTypes:v.type.detect,ofnSearch:v.type.search,oSort:v.type.order,afnSortData:v.order,aoFeatures:v.feature,oApi:v.internal,oStdClasses:v.classes,oPagination:v.pager});h.extend(n.ext.classes,{sTable:"dataTable",sNoFooter:"no-footer",sPageButton:"paginate_button",sPageButtonActive:"current",sPageButtonDisabled:"disabled",sStripeOdd:"odd",sStripeEven:"even",sRowEmpty:"dataTables_empty",sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",
sInfo:"dataTables_info",sPaging:"dataTables_paginate paging_",sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"sorting_asc",sSortDesc:"sorting_desc",sSortable:"sorting",sSortableAsc:"sorting_asc_disabled",sSortableDesc:"sorting_desc_disabled",sSortableNone:"sorting_disabled",sSortColumn:"sorting_",sFilterInput:"",sLengthSelect:"",sScrollWrapper:"dataTables_scroll",sScrollHead:"dataTables_scrollHead",sScrollHeadInner:"dataTables_scrollHeadInner",sScrollBody:"dataTables_scrollBody",
sScrollFoot:"dataTables_scrollFoot",sScrollFootInner:"dataTables_scrollFootInner",sHeaderTH:"",sFooterTH:"",sSortJUIAsc:"",sSortJUIDesc:"",sSortJUI:"",sSortJUIAscAllowed:"",sSortJUIDescAllowed:"",sSortJUIWrapper:"",sSortIcon:"",sJUIHeader:"",sJUIFooter:""});var Mb=n.ext.pager;h.extend(Mb,{simple:function(){return["previous","next"]},full:function(){return["first","previous","next","last"]},numbers:function(a,b){return[ja(a,b)]},simple_numbers:function(a,b){return["previous",ja(a,b),"next"]},full_numbers:function(a,
b){return["first","previous",ja(a,b),"next","last"]},first_last_numbers:function(a,b){return["first",ja(a,b),"last"]},_numbers:ja,numbers_length:7});h.extend(!0,n.ext.renderer,{pageButton:{_:function(a,b,c,d,e,f){var g=a.oClasses,j=a.oLanguage.oPaginate,i=a.oLanguage.oAria.paginate||{},m,l,n=0,o=function(b,d){var k,s,r,t,v=g.sPageButtonDisabled,w=function(b){Va(a,b.data.action,true)};k=0;for(s=d.length;k<s;k++){t=d[k];if(Array.isArray(t)){r=h("<"+(t.DT_el||"div")+"/>").appendTo(b);o(r,t)}else{m=null;
l=t;r=a.iTabIndex;switch(t){case "ellipsis":b.append('<span class="ellipsis">&#x2026;</span>');break;case "first":m=j.sFirst;if(e===0){r=-1;l=l+(" "+v)}break;case "previous":m=j.sPrevious;if(e===0){r=-1;l=l+(" "+v)}break;case "next":m=j.sNext;if(f===0||e===f-1){r=-1;l=l+(" "+v)}break;case "last":m=j.sLast;if(f===0||e===f-1){r=-1;l=l+(" "+v)}break;default:m=a.fnFormatNumber(t+1);l=e===t?g.sPageButtonActive:""}if(m!==null){r=h("<a>",{"class":g.sPageButton+" "+l,"aria-controls":a.sTableId,"aria-label":i[t],
"data-dt-idx":n,tabindex:r,id:c===0&&typeof t==="string"?a.sTableId+"_"+t:null}).html(m).appendTo(b);Xa(r,{action:t},w);n++}}}},s;try{s=h(b).find(H.activeElement).data("dt-idx")}catch(r){}o(h(b).empty(),d);s!==k&&h(b).find("[data-dt-idx="+s+"]").trigger("focus")}}});h.extend(n.ext.type.detect,[function(a,b){var c=b.oLanguage.sDecimal;return ab(a,c)?"num"+c:null},function(a){if(a&&!(a instanceof Date)&&!bc.test(a))return null;var b=Date.parse(a);return b!==null&&!isNaN(b)||M(a)?"date":null},function(a,
b){var c=b.oLanguage.sDecimal;return ab(a,c,true)?"num-fmt"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Rb(a,c)?"html-num"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Rb(a,c,true)?"html-num-fmt"+c:null},function(a){return M(a)||typeof a==="string"&&a.indexOf("<")!==-1?"html":null}]);h.extend(n.ext.type.search,{html:function(a){return M(a)?a:typeof a==="string"?a.replace(Ob," ").replace(Ca,""):""},string:function(a){return M(a)?a:typeof a==="string"?a.replace(Ob," "):a}});var Ba=
function(a,b,c,d){if(a!==0&&(!a||a==="-"))return-Infinity;b&&(a=Qb(a,b));if(a.replace){c&&(a=a.replace(c,""));d&&(a=a.replace(d,""))}return a*1};h.extend(v.type.order,{"date-pre":function(a){a=Date.parse(a);return isNaN(a)?-Infinity:a},"html-pre":function(a){return M(a)?"":a.replace?a.replace(/<.*?>/g,"").toLowerCase():a+""},"string-pre":function(a){return M(a)?"":typeof a==="string"?a.toLowerCase():!a.toString?"":a.toString()},"string-asc":function(a,b){return a<b?-1:a>b?1:0},"string-desc":function(a,
b){return a<b?1:a>b?-1:0}});Fa("");h.extend(!0,n.ext.renderer,{header:{_:function(a,b,c,d){h(a.nTable).on("order.dt.DT",function(e,f,g,h){if(a===f){e=c.idx;b.removeClass(c.sSortingClass+" "+d.sSortAsc+" "+d.sSortDesc).addClass(h[e]=="asc"?d.sSortAsc:h[e]=="desc"?d.sSortDesc:c.sSortingClass)}})},jqueryui:function(a,b,c,d){h("<div/>").addClass(d.sSortJUIWrapper).append(b.contents()).append(h("<span/>").addClass(d.sSortIcon+" "+c.sSortingClassJUI)).appendTo(b);h(a.nTable).on("order.dt.DT",function(e,
f,g,h){if(a===f){e=c.idx;b.removeClass(d.sSortAsc+" "+d.sSortDesc).addClass(h[e]=="asc"?d.sSortAsc:h[e]=="desc"?d.sSortDesc:c.sSortingClass);b.find("span."+d.sSortIcon).removeClass(d.sSortJUIAsc+" "+d.sSortJUIDesc+" "+d.sSortJUI+" "+d.sSortJUIAscAllowed+" "+d.sSortJUIDescAllowed).addClass(h[e]=="asc"?d.sSortJUIAsc:h[e]=="desc"?d.sSortJUIDesc:c.sSortingClassJUI)}})}}});var fb=function(a){return typeof a==="string"?a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):
a};n.render={number:function(a,b,c,d,e){return{display:function(f){if(typeof f!=="number"&&typeof f!=="string")return f;var g=f<0?"-":"",h=parseFloat(f);if(isNaN(h))return fb(f);h=h.toFixed(c);f=Math.abs(h);h=parseInt(f,10);f=c?b+(f-h).toFixed(c).substring(2):"";return g+(d||"")+h.toString().replace(/\B(?=(\d{3})+(?!\d))/g,a)+f+(e||"")}}},text:function(){return{display:fb,filter:fb}}};h.extend(n.ext.internal,{_fnExternApiFunc:Nb,_fnBuildAjax:ta,_fnAjaxUpdate:nb,_fnAjaxParameters:wb,_fnAjaxUpdateDraw:xb,
_fnAjaxDataSrc:ua,_fnAddColumn:Ga,_fnColumnOptions:la,_fnAdjustColumnSizing:aa,_fnVisibleToColumnIndex:ba,_fnColumnIndexToVisible:ca,_fnVisbleColumns:W,_fnGetColumns:na,_fnColumnTypes:Ia,_fnApplyColumnDefs:kb,_fnHungarianMap:$,_fnCamelToHungarian:J,_fnLanguageCompat:Ea,_fnBrowserDetect:ib,_fnAddData:O,_fnAddTr:oa,_fnNodeToDataIndex:function(a,b){return b._DT_RowIndex!==k?b._DT_RowIndex:null},_fnNodeToColumnIndex:function(a,b,c){return h.inArray(c,a.aoData[b].anCells)},_fnGetCellData:B,_fnSetCellData:lb,
_fnSplitObjNotation:La,_fnGetObjectDataFn:S,_fnSetObjectDataFn:N,_fnGetDataMaster:Ma,_fnClearTable:pa,_fnDeleteIndex:qa,_fnInvalidate:ea,_fnGetRowElements:Ka,_fnCreateTr:Ja,_fnBuildHead:mb,_fnDrawHead:ga,_fnDraw:P,_fnReDraw:T,_fnAddOptionsHtml:pb,_fnDetectHeader:fa,_fnGetUniqueThs:sa,_fnFeatureHtmlFilter:rb,_fnFilterComplete:ha,_fnFilterCustom:Ab,_fnFilterColumn:zb,_fnFilter:yb,_fnFilterCreateSearch:Ra,_fnEscapeRegex:Sa,_fnFilterData:Bb,_fnFeatureHtmlInfo:ub,_fnUpdateInfo:Eb,_fnInfoMacros:Fb,_fnInitialise:ia,
_fnInitComplete:va,_fnLengthChange:Ta,_fnFeatureHtmlLength:qb,_fnFeatureHtmlPaginate:vb,_fnPageChange:Va,_fnFeatureHtmlProcessing:sb,_fnProcessingDisplay:D,_fnFeatureHtmlTable:tb,_fnScrollDraw:ma,_fnApplyToChildren:I,_fnCalculateColumnWidths:Ha,_fnThrottle:Qa,_fnConvertToWidth:Gb,_fnGetWidestNode:Hb,_fnGetMaxLenString:Ib,_fnStringToCss:w,_fnSortFlatten:Y,_fnSort:ob,_fnSortAria:Kb,_fnSortListener:Wa,_fnSortAttachListener:Oa,_fnSortingClasses:ya,_fnSortData:Jb,_fnSaveState:za,_fnLoadState:Lb,_fnSettingsFromNode:Aa,
_fnLog:K,_fnMap:F,_fnBindAction:Xa,_fnCallbackReg:z,_fnCallbackFire:t,_fnLengthOverflow:Ua,_fnRenderer:Pa,_fnDataSource:y,_fnRowAttributes:Na,_fnExtend:Ya,_fnCalculateEnd:function(){}});h.fn.dataTable=n;n.$=h;h.fn.dataTableSettings=n.settings;h.fn.dataTableExt=n.ext;h.fn.DataTable=function(a){return h(this).dataTable(a).api()};h.each(n,function(a,b){h.fn.DataTable[a]=b});return h.fn.dataTable});

/*!
 DataTables Bootstrap 4 integration
 ©2011-2017 SpryMedia Ltd - datatables.net/license
*/
(function(c){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(a){return c(a,window,document)}):"object"===typeof exports?module.exports=function(a,d){a||(a=window);if(!d||!d.fn.dataTable)d=require("datatables.net")(a,d).$;return c(d,a,a.document)}:c(jQuery,window,document)})(function(c,a,d,m){var f=c.fn.dataTable;c.extend(!0,f.defaults,{dom:"<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
renderer:"bootstrap"});c.extend(f.ext.classes,{sWrapper:"dataTables_wrapper dt-bootstrap4",sFilterInput:"form-control form-control-sm",sLengthSelect:"custom-select custom-select-sm form-control form-control-sm",sProcessing:"dataTables_processing card",sPageButton:"paginate_button page-item"});f.ext.renderer.pageButton.bootstrap=function(a,h,r,s,j,n){var o=new f.Api(a),t=a.oClasses,k=a.oLanguage.oPaginate,u=a.oLanguage.oAria.paginate||{},e,g,p=0,q=function(d,f){var l,h,i,b,m=function(a){a.preventDefault();
!c(a.currentTarget).hasClass("disabled")&&o.page()!=a.data.action&&o.page(a.data.action).draw("page")};l=0;for(h=f.length;l<h;l++)if(b=f[l],Array.isArray(b))q(d,b);else{g=e="";switch(b){case "ellipsis":e="&#x2026;";g="disabled";break;case "first":e=k.sFirst;g=b+(0<j?"":" disabled");break;case "previous":e=k.sPrevious;g=b+(0<j?"":" disabled");break;case "next":e=k.sNext;g=b+(j<n-1?"":" disabled");break;case "last":e=k.sLast;g=b+(j<n-1?"":" disabled");break;default:e=b+1,g=j===b?"active":""}e&&(i=c("<li>",
{"class":t.sPageButton+" "+g,id:0===r&&"string"===typeof b?a.sTableId+"_"+b:null}).append(c("<a>",{href:"#","aria-controls":a.sTableId,"aria-label":u[b],"data-dt-idx":p,tabindex:a.iTabIndex,"class":"page-link"}).html(e)).appendTo(d),a.oApi._fnBindAction(i,{action:b},m),p++)}},i;try{i=c(h).find(d.activeElement).data("dt-idx")}catch(v){}q(c(h).empty().html('<ul class="pagination"/>').children("ul"),s);i!==m&&c(h).find("[data-dt-idx="+i+"]").trigger("focus")};return f});

/*!
 Select for DataTables 1.3.1
 2015-2019 SpryMedia Ltd - datatables.net/license/mit
*/
(function(e){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(i){return e(i,window,document)}):"object"===typeof exports?module.exports=function(i,j){i||(i=window);if(!j||!j.fn.dataTable)j=require("datatables.net")(i,j).$;return e(j,i,i.document)}:e(jQuery,window,document)})(function(e,i,j,h){function u(a,c,b){var d;d=function(b,c){if(b>c)var d=c,c=b,b=d;var f=!1;return a.columns(":visible").indexes().filter(function(a){a===b&&(f=!0);return a===c?(f=!1,!0):f})};var f=
function(b,c){var d=a.rows({search:"applied"}).indexes();if(d.indexOf(b)>d.indexOf(c))var f=c,c=b,b=f;var e=!1;return d.filter(function(a){a===b&&(e=!0);return a===c?(e=!1,!0):e})};!a.cells({selected:!0}).any()&&!b?(d=d(0,c.column),b=f(0,c.row)):(d=d(b.column,c.column),b=f(b.row,c.row));b=a.cells(b,d).flatten();a.cells(c,{selected:!0}).any()?a.cells(b).deselect():a.cells(b).select()}function q(a){var c=a.settings()[0]._select.selector;e(a.table().container()).off("mousedown.dtSelect",c).off("mouseup.dtSelect",
c).off("click.dtSelect",c);e("body").off("click.dtSelect"+x(a.table().node()))}function y(a){var c=e(a.table().container()),b=a.settings()[0],d=b._select.selector,f;c.on("mousedown.dtSelect",d,function(b){if(b.shiftKey||b.metaKey||b.ctrlKey)c.css("-moz-user-select","none").one("selectstart.dtSelect",d,function(){return!1});i.getSelection&&(f=i.getSelection())}).on("mouseup.dtSelect",d,function(){c.css("-moz-user-select","")}).on("click.dtSelect",d,function(b){var c=a.select.items();if(f){var d=i.getSelection();
if((!d.anchorNode||e(d.anchorNode).closest("table")[0]===a.table().node())&&d!==f)return}var d=a.settings()[0],g=e.trim(a.settings()[0].oClasses.sWrapper).replace(/ +/g,".");if(e(b.target).closest("div."+g)[0]==a.table().container()&&(g=a.cell(e(b.target).closest("td, th")),g.any())){var h=e.Event("user-select.dt");k(a,h,[c,g,b]);h.isDefaultPrevented()||(h=g.index(),"row"===c?(c=h.row,r(b,a,d,"row",c)):"column"===c?(c=g.index().column,r(b,a,d,"column",c)):"cell"===c&&(c=g.index(),r(b,a,d,"cell",c)),
d._select_lastCell=h)}});e("body").on("click.dtSelect"+x(a.table().node()),function(c){b._select.blurable&&!e(c.target).parents().filter(a.table().container()).length&&(0!==e(c.target).parents("html").length&&!e(c.target).parents("div.DTE").length)&&o(b,!0)})}function k(a,c,b,d){if(!d||a.flatten().length)"string"===typeof c&&(c+=".dt"),b.unshift(a),e(a.table().node()).trigger(c,b)}function z(a){var c=a.settings()[0];if(c._select.info&&c.aanFeatures.i&&"api"!==a.select.style()){var b=a.rows({selected:!0}).flatten().length,
d=a.columns({selected:!0}).flatten().length,f=a.cells({selected:!0}).flatten().length,l=function(b,c,d){b.append(e('<span class="select-item"/>').append(a.i18n("select."+c+"s",{_:"%d "+c+"s selected","0":"",1:"1 "+c+" selected"},d)))};e.each(c.aanFeatures.i,function(c,a){var a=e(a),g=e('<span class="select-info"/>');l(g,"row",b);l(g,"column",d);l(g,"cell",f);var h=a.children("span.select-info");h.length&&h.remove();""!==g.text()&&a.append(g)})}}function A(a,c,b,d){var f=a[c+"s"]({search:"applied"}).indexes(),
d=e.inArray(d,f),l=e.inArray(b,f);if(!a[c+"s"]({selected:!0}).any()&&-1===d)f.splice(e.inArray(b,f)+1,f.length);else{if(d>l)var g=l,l=d,d=g;f.splice(l+1,f.length);f.splice(0,d)}a[c](b,{selected:!0}).any()?(f.splice(e.inArray(b,f),1),a[c+"s"](f).deselect()):a[c+"s"](f).select()}function o(a,c){if(c||"single"===a._select.style){var b=new g.Api(a);b.rows({selected:!0}).deselect();b.columns({selected:!0}).deselect();b.cells({selected:!0}).deselect()}}function r(a,c,b,d,f){var e=c.select.style(),g=c.select.toggleable(),
h=c[d](f,{selected:!0}).any();if(!h||g)"os"===e?a.ctrlKey||a.metaKey?c[d](f).select(!h):a.shiftKey?"cell"===d?u(c,f,b._select_lastCell||null):A(c,d,f,b._select_lastCell?b._select_lastCell[d]:null):(a=c[d+"s"]({selected:!0}),h&&1===a.flatten().length?c[d](f).deselect():(a.deselect(),c[d](f).select())):"multi+shift"==e?a.shiftKey?"cell"===d?u(c,f,b._select_lastCell||null):A(c,d,f,b._select_lastCell?b._select_lastCell[d]:null):c[d](f).select(!h):c[d](f).select(!h)}function x(a){return a.id.replace(/[^a-zA-Z0-9\-\_]/g,
"-")}function p(a,c){return function(b){return b.i18n("buttons."+a,c)}}function s(a){a=a._eventNamespace;return"draw.dt.DT"+a+" select.dt.DT"+a+" deselect.dt.DT"+a}var g=e.fn.dataTable;g.select={};g.select.version="1.3.1";g.select.init=function(a){var c=a.settings()[0],b=c.oInit.select,d=g.defaults.select,b=b===h?d:b,d="row",f="api",l=!1,v=!0,w=!0,i="td, th",k="selected",j=!1;c._select={};if(!0===b)f="os",j=!0;else if("string"===typeof b)f=b,j=!0;else if(e.isPlainObject(b)&&(b.blurable!==h&&(l=b.blurable),
b.toggleable!==h&&(v=b.toggleable),b.info!==h&&(w=b.info),b.items!==h&&(d=b.items),f=b.style!==h?b.style:"os",j=!0,b.selector!==h&&(i=b.selector),b.className!==h))k=b.className;a.select.selector(i);a.select.items(d);a.select.style(f);a.select.blurable(l);a.select.toggleable(v);a.select.info(w);c._select.className=k;e.fn.dataTable.ext.order["select-checkbox"]=function(b,c){return this.api().column(c,{order:"index"}).nodes().map(function(c){return"row"===b._select.items?e(c).parent().hasClass(b._select.className):
"cell"===b._select.items?e(c).hasClass(b._select.className):!1})};!j&&e(a.table().node()).hasClass("selectable")&&a.select.style("os")};e.each([{type:"row",prop:"aoData"},{type:"column",prop:"aoColumns"}],function(a,c){g.ext.selector[c.type].push(function(b,a,f){var a=a.selected,e,g=[];if(!0!==a&&!1!==a)return f;for(var h=0,i=f.length;h<i;h++)e=b[c.prop][f[h]],(!0===a&&!0===e._select_selected||!1===a&&!e._select_selected)&&g.push(f[h]);return g})});g.ext.selector.cell.push(function(a,c,b){var c=c.selected,
d,f=[];if(c===h)return b;for(var e=0,g=b.length;e<g;e++)d=a.aoData[b[e].row],(!0===c&&d._selected_cells&&!0===d._selected_cells[b[e].column]||!1===c&&(!d._selected_cells||!d._selected_cells[b[e].column]))&&f.push(b[e]);return f});var m=g.Api.register,n=g.Api.registerPlural;m("select()",function(){return this.iterator("table",function(a){g.select.init(new g.Api(a))})});m("select.blurable()",function(a){return a===h?this.context[0]._select.blurable:this.iterator("table",function(c){c._select.blurable=
a})});m("select.toggleable()",function(a){return a===h?this.context[0]._select.toggleable:this.iterator("table",function(c){c._select.toggleable=a})});m("select.info()",function(a){return z===h?this.context[0]._select.info:this.iterator("table",function(c){c._select.info=a})});m("select.items()",function(a){return a===h?this.context[0]._select.items:this.iterator("table",function(c){c._select.items=a;k(new g.Api(c),"selectItems",[a])})});m("select.style()",function(a){return a===h?this.context[0]._select.style:
this.iterator("table",function(c){c._select.style=a;if(!c._select_init){var b=new g.Api(c);c.aoRowCreatedCallback.push({fn:function(b,a,d){a=c.aoData[d];a._select_selected&&e(b).addClass(c._select.className);b=0;for(d=c.aoColumns.length;b<d;b++)(c.aoColumns[b]._select_selected||a._selected_cells&&a._selected_cells[b])&&e(a.anCells[b]).addClass(c._select.className)},sName:"select-deferRender"});b.on("preXhr.dt.dtSelect",function(){var a=b.rows({selected:!0}).ids(!0).filter(function(b){return b!==h}),
c=b.cells({selected:!0}).eq(0).map(function(a){var c=b.row(a.row).id(!0);return c?{row:c,column:a.column}:h}).filter(function(b){return b!==h});b.one("draw.dt.dtSelect",function(){b.rows(a).select();c.any()&&c.each(function(a){b.cells(a.row,a.column).select()})})});b.on("draw.dtSelect.dt select.dtSelect.dt deselect.dtSelect.dt info.dt",function(){z(b)});b.on("destroy.dtSelect",function(){q(b);b.off(".dtSelect")})}var d=new g.Api(c);q(d);"api"!==a&&y(d);k(new g.Api(c),"selectStyle",[a])})});m("select.selector()",
function(a){return a===h?this.context[0]._select.selector:this.iterator("table",function(c){q(new g.Api(c));c._select.selector=a;"api"!==c._select.style&&y(new g.Api(c))})});n("rows().select()","row().select()",function(a){var c=this;if(!1===a)return this.deselect();this.iterator("row",function(b,a){o(b);b.aoData[a]._select_selected=!0;e(b.aoData[a].nTr).addClass(b._select.className)});this.iterator("table",function(b,a){k(c,"select",["row",c[a]],!0)});return this});n("columns().select()","column().select()",
function(a){var c=this;if(!1===a)return this.deselect();this.iterator("column",function(b,a){o(b);b.aoColumns[a]._select_selected=!0;var c=(new g.Api(b)).column(a);e(c.header()).addClass(b._select.className);e(c.footer()).addClass(b._select.className);c.nodes().to$().addClass(b._select.className)});this.iterator("table",function(b,a){k(c,"select",["column",c[a]],!0)});return this});n("cells().select()","cell().select()",function(a){var c=this;if(!1===a)return this.deselect();this.iterator("cell",
function(b,a,c){o(b);a=b.aoData[a];a._selected_cells===h&&(a._selected_cells=[]);a._selected_cells[c]=!0;a.anCells&&e(a.anCells[c]).addClass(b._select.className)});this.iterator("table",function(a,d){k(c,"select",["cell",c[d]],!0)});return this});n("rows().deselect()","row().deselect()",function(){var a=this;this.iterator("row",function(a,b){a.aoData[b]._select_selected=!1;e(a.aoData[b].nTr).removeClass(a._select.className)});this.iterator("table",function(c,b){k(a,"deselect",["row",a[b]],!0)});return this});
n("columns().deselect()","column().deselect()",function(){var a=this;this.iterator("column",function(a,b){a.aoColumns[b]._select_selected=!1;var d=new g.Api(a),f=d.column(b);e(f.header()).removeClass(a._select.className);e(f.footer()).removeClass(a._select.className);d.cells(null,b).indexes().each(function(b){var d=a.aoData[b.row],f=d._selected_cells;d.anCells&&(!f||!f[b.column])&&e(d.anCells[b.column]).removeClass(a._select.className)})});this.iterator("table",function(c,b){k(a,"deselect",["column",
a[b]],!0)});return this});n("cells().deselect()","cell().deselect()",function(){var a=this;this.iterator("cell",function(a,b,d){b=a.aoData[b];b._selected_cells[d]=!1;b.anCells&&!a.aoColumns[d]._select_selected&&e(b.anCells[d]).removeClass(a._select.className)});this.iterator("table",function(c,b){k(a,"deselect",["cell",a[b]],!0)});return this});var t=0;e.extend(g.ext.buttons,{selected:{text:p("selected","Selected"),className:"buttons-selected",limitTo:["rows","columns","cells"],init:function(a,c,
b){var d=this;b._eventNamespace=".select"+t++;a.on(s(b),function(){d.enable(-1!==e.inArray("rows",b.limitTo)&&a.rows({selected:!0}).any()||-1!==e.inArray("columns",b.limitTo)&&a.columns({selected:!0}).any()||-1!==e.inArray("cells",b.limitTo)&&a.cells({selected:!0}).any()?!0:!1)});this.disable()},destroy:function(a,c,b){a.off(b._eventNamespace)}},selectedSingle:{text:p("selectedSingle","Selected single"),className:"buttons-selected-single",init:function(a,c,b){var d=this;b._eventNamespace=".select"+
t++;a.on(s(b),function(){var b=a.rows({selected:!0}).flatten().length+a.columns({selected:!0}).flatten().length+a.cells({selected:!0}).flatten().length;d.enable(1===b)});this.disable()},destroy:function(a,c,b){a.off(b._eventNamespace)}},selectAll:{text:p("selectAll","Select all"),className:"buttons-select-all",action:function(){this[this.select.items()+"s"]().select()}},selectNone:{text:p("selectNone","Deselect all"),className:"buttons-select-none",action:function(){o(this.settings()[0],!0)},init:function(a,
c,b){var d=this;b._eventNamespace=".select"+t++;a.on(s(b),function(){var b=a.rows({selected:!0}).flatten().length+a.columns({selected:!0}).flatten().length+a.cells({selected:!0}).flatten().length;d.enable(0<b)});this.disable()},destroy:function(a,c,b){a.off(b._eventNamespace)}}});e.each(["Row","Column","Cell"],function(a,c){var b=c.toLowerCase();g.ext.buttons["select"+c+"s"]={text:p("select"+c+"s","Select "+b+"s"),className:"buttons-select-"+b+"s",action:function(){this.select.items(b)},init:function(a){var c=
this;a.on("selectItems.dt.DT",function(a,d,e){c.active(e===b)})}}});e(j).on("preInit.dt.dtSelect",function(a,c){"dt"===a.namespace&&g.select.init(new g.Api(c))});return g.select});

/*!
 Bootstrap 4 styling wrapper for Select
 ©2018 SpryMedia Ltd - datatables.net/license
*/
(function(c){"function"===typeof define&&define.amd?define(["jquery","datatables.net-bs4","datatables.net-select"],function(a){return c(a,window,document)}):"object"===typeof exports?module.exports=function(a,b){a||(a=window);if(!b||!b.fn.dataTable)b=require("datatables.net-bs4")(a,b).$;b.fn.dataTable.select||require("datatables.net-select")(a,b);return c(b,a,a.document)}:c(jQuery,window,document)})(function(c){return c.fn.dataTable});


const drawUserMenu = (menu,currentlUrl) => {
    const tmpForParentMenu = menu;
    const tmpForSubMenu = menu;
    //var sortedMenu = _.sortBy(menu, function(o) { return o.category; }, ['asc']);
    var arrGroupedData = _.mapValues(_.groupBy(menu, 'parent_menu'), (function(clist) {
        return clist.map(function(byCategory) {
            return _.omit(byCategory, 'parent_menu');
        });
    }));
    
    var activeMainMenuLink = "";
    var activeSubMenuClass = "";

    $.each(arrGroupedData, function(i, groupedMainMenu) {
        if (i) {
            var mainActive = '';
            var menuBar = "";
            var subMenu = "";
            var parent_id = "";
            $.each(groupedMainMenu, function(indx, link) {
                if (i == link.parent_name) {
                    if (currentlUrl.includes(link.url)) {
                        activeSubMenuClass = "active";
                        if (mainActive == '') {
                            activeMainMenuLink = "active";
                            mainActive = "active";
                        }
                    } else {
                        activeSubMenuClass = "";
                    }

                    if (link.has_sub > 0 && link.parent_name == "0") {
                        menuBar += "<li class='has-sub " + mainActive + "' id='"+link.page_name+"_main_li'>" +
                                        "<a href='"+link.url+"' id='"+link.page_name+"_main_a'>" +
                                            "<b class='caret'></b>"+
                                            "<i class='"+link.icon+"'></i>"+
                                            "<span>"+link.page_label+"</span>"+
                                        "</a>"+
                                        "<ul class='sub-menu' id='"+link.page_name+"'></ul>"+
                                    "</li>";


                    } else if (link.has_sub == 0 && link.parent_name == "0") {
                        menuBar += "<li class='" + activeMainMenuLink + "'>" +
                                        "<a href='"+link.url+"'>" +
                                            "<i class='"+link.icon+"'></i>"+
                                            "<span>"+link.page_label+"</span>"+
                                        "</a>"+
                                    "</li>";
                    } else if (link.has_sub == 0 && link.parent_name != "0") {
                        parent_id = "#"+link.parent_name;
                        subMenu += "<li>"+
                                        "<a href='"+link.url+"'>"+link.page_label+"</a>"+
                                    "</li>";
                    }


                }

                $("#menuBar").append(menuBar);
                $(parent_id).append(subMenu);
                $(parent_id+"_main_li").addClass(mainActive);
                $(parent_id+"_main_a").addClass(activeMainMenuLink);

                menuBar="";
                subMenu="";
                parent_id="";
                mainActive="";
                activeMainMenuLink="";
            });
            
        }
    });
}

var menu = $("#hdnMenu").val();
var currentlUrl = $("#hdnMenu").data("currurl");

if ($("#hdnMenu").length) {
    if (menu.replace(" ", "") != "") {
        drawUserMenu(JSON.parse(menu),currentlUrl);
    }
}


/*
* iziToast | v1.4.0
* http://izitoast.marcelodolce.com
* by Marcelo Dolce.
*/
!function(t,e){"function"==typeof define&&define.amd?define([],e(t)):"object"==typeof exports?module.exports=e(t):t.iziToast=e(t)}("undefined"!=typeof global?global:window||this.window||this.global,function(t){"use strict";var e={},n="iziToast",o=(document.querySelector("body"),!!/Mobi/.test(navigator.userAgent)),i=/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor),s="undefined"!=typeof InstallTrigger,a="ontouchstart"in document.documentElement,r=["bottomRight","bottomLeft","bottomCenter","topRight","topLeft","topCenter","center"],l={info:{color:"blue",icon:"ico-info"},success:{color:"green",icon:"ico-success"},warning:{color:"orange",icon:"ico-warning"},error:{color:"red",icon:"ico-error"},question:{color:"yellow",icon:"ico-question"}},d=568,c={};e.children={};var u={id:null,"class":"",title:"",titleColor:"",titleSize:"",titleLineHeight:"",message:"",messageColor:"",messageSize:"",messageLineHeight:"",backgroundColor:"",theme:"light",color:"",icon:"",iconText:"",iconColor:"",iconUrl:null,image:"",imageWidth:50,maxWidth:null,zindex:null,layout:1,balloon:!1,close:!0,closeOnEscape:!1,closeOnClick:!1,displayMode:0,position:"bottomRight",target:"",targetFirst:!0,timeout:5e3,rtl:!1,animateInside:!0,drag:!0,pauseOnHover:!0,resetOnHover:!1,progressBar:!0,progressBarColor:"",progressBarEasing:"linear",overlay:!1,overlayClose:!1,overlayColor:"rgba(0, 0, 0, 0.6)",transitionIn:"fadeInUp",transitionOut:"fadeOut",transitionInMobile:"fadeInUp",transitionOutMobile:"fadeOutDown",buttons:{},inputs:{},onOpening:function(){},onOpened:function(){},onClosing:function(){},onClosed:function(){}};if("remove"in Element.prototype||(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)}),"function"!=typeof window.CustomEvent){var p=function(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n};p.prototype=window.Event.prototype,window.CustomEvent=p}var m=function(t,e,n){if("[object Object]"===Object.prototype.toString.call(t))for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.call(n,t[o],o,t);else if(t)for(var i=0,s=t.length;s>i;i++)e.call(n,t[i],i,t)},g=function(t,e){var n={};return m(t,function(e,o){n[o]=t[o]}),m(e,function(t,o){n[o]=e[o]}),n},f=function(t){var e=document.createDocumentFragment(),n=document.createElement("div");for(n.innerHTML=t;n.firstChild;)e.appendChild(n.firstChild);return e},v=function(t){var e=btoa(encodeURIComponent(t));return e.replace(/=/g,"")},y=function(t){return"#"==t.substring(0,1)||"rgb"==t.substring(0,3)||"hsl"==t.substring(0,3)},h=function(t){try{return btoa(atob(t))==t}catch(e){return!1}},b=function(){return{move:function(t,e,o,a){var r,l=.3,d=180;0!==a&&(t.classList.add(n+"-dragged"),t.style.transform="translateX("+a+"px)",a>0?(r=(d-a)/d,l>r&&e.hide(g(o,{transitionOut:"fadeOutRight",transitionOutMobile:"fadeOutRight"}),t,"drag")):(r=(d+a)/d,l>r&&e.hide(g(o,{transitionOut:"fadeOutLeft",transitionOutMobile:"fadeOutLeft"}),t,"drag")),t.style.opacity=r,l>r&&((i||s)&&(t.style.left=a+"px"),t.parentNode.style.opacity=l,this.stopMoving(t,null)))},startMoving:function(t,e,n,o){o=o||window.event;var i=a?o.touches[0].clientX:o.clientX,s=t.style.transform.replace("px)","");s=s.replace("translateX(","");var r=i-s;n.transitionIn&&t.classList.remove(n.transitionIn),n.transitionInMobile&&t.classList.remove(n.transitionInMobile),t.style.transition="",a?document.ontouchmove=function(o){o.preventDefault(),o=o||window.event;var i=o.touches[0].clientX,s=i-r;b.move(t,e,n,s)}:document.onmousemove=function(o){o.preventDefault(),o=o||window.event;var i=o.clientX,s=i-r;b.move(t,e,n,s)}},stopMoving:function(t,e){a?document.ontouchmove=function(){}:document.onmousemove=function(){},t.style.opacity="",t.style.transform="",t.classList.contains(n+"-dragged")&&(t.classList.remove(n+"-dragged"),t.style.transition="transform 0.4s ease, opacity 0.4s ease",setTimeout(function(){t.style.transition=""},400))}}}();return e.setSetting=function(t,n,o){e.children[t][n]=o},e.getSetting=function(t,n){return e.children[t][n]},e.destroy=function(){m(document.querySelectorAll("."+n+"-overlay"),function(t,e){t.remove()}),m(document.querySelectorAll("."+n+"-wrapper"),function(t,e){t.remove()}),m(document.querySelectorAll("."+n),function(t,e){t.remove()}),this.children={},document.removeEventListener(n+"-opened",{},!1),document.removeEventListener(n+"-opening",{},!1),document.removeEventListener(n+"-closing",{},!1),document.removeEventListener(n+"-closed",{},!1),document.removeEventListener("keyup",{},!1),c={}},e.settings=function(t){e.destroy(),c=t,u=g(u,t||{})},m(l,function(t,n){e[n]=function(e){var n=g(c,e||{});n=g(t,n||{}),this.show(n)}}),e.progress=function(t,e,o){var i=this,s=e.getAttribute("data-iziToast-ref"),a=g(this.children[s],t||{}),r=e.querySelector("."+n+"-progressbar div");return{start:function(){"undefined"==typeof a.time.REMAINING&&(e.classList.remove(n+"-reseted"),null!==r&&(r.style.transition="width "+a.timeout+"ms "+a.progressBarEasing,r.style.width="0%"),a.time.START=(new Date).getTime(),a.time.END=a.time.START+a.timeout,a.time.TIMER=setTimeout(function(){clearTimeout(a.time.TIMER),e.classList.contains(n+"-closing")||(i.hide(a,e,"timeout"),"function"==typeof o&&o.apply(i))},a.timeout),i.setSetting(s,"time",a.time))},pause:function(){if("undefined"!=typeof a.time.START&&!e.classList.contains(n+"-paused")&&!e.classList.contains(n+"-reseted")){if(e.classList.add(n+"-paused"),a.time.REMAINING=a.time.END-(new Date).getTime(),clearTimeout(a.time.TIMER),i.setSetting(s,"time",a.time),null!==r){var t=window.getComputedStyle(r),l=t.getPropertyValue("width");r.style.transition="none",r.style.width=l}"function"==typeof o&&setTimeout(function(){o.apply(i)},10)}},resume:function(){"undefined"!=typeof a.time.REMAINING?(e.classList.remove(n+"-paused"),null!==r&&(r.style.transition="width "+a.time.REMAINING+"ms "+a.progressBarEasing,r.style.width="0%"),a.time.END=(new Date).getTime()+a.time.REMAINING,a.time.TIMER=setTimeout(function(){clearTimeout(a.time.TIMER),e.classList.contains(n+"-closing")||(i.hide(a,e,"timeout"),"function"==typeof o&&o.apply(i))},a.time.REMAINING),i.setSetting(s,"time",a.time)):this.start()},reset:function(){clearTimeout(a.time.TIMER),delete a.time.REMAINING,i.setSetting(s,"time",a.time),e.classList.add(n+"-reseted"),e.classList.remove(n+"-paused"),null!==r&&(r.style.transition="none",r.style.width="100%"),"function"==typeof o&&setTimeout(function(){o.apply(i)},10)}}},e.hide=function(t,e,i){"object"!=typeof e&&(e=document.querySelector(e));var s=this,a=g(this.children[e.getAttribute("data-iziToast-ref")],t||{});a.closedBy=i||null,delete a.time.REMAINING,e.classList.add(n+"-closing"),function(){var t=document.querySelector("."+n+"-overlay");if(null!==t){var e=t.getAttribute("data-iziToast-ref");e=e.split(",");var o=e.indexOf(String(a.ref));-1!==o&&e.splice(o,1),t.setAttribute("data-iziToast-ref",e.join()),0===e.length&&(t.classList.remove("fadeIn"),t.classList.add("fadeOut"),setTimeout(function(){t.remove()},700))}}(),a.transitionIn&&e.classList.remove(a.transitionIn),a.transitionInMobile&&e.classList.remove(a.transitionInMobile),o||window.innerWidth<=d?a.transitionOutMobile&&e.classList.add(a.transitionOutMobile):a.transitionOut&&e.classList.add(a.transitionOut);var r=e.parentNode.offsetHeight;e.parentNode.style.height=r+"px",e.style.pointerEvents="none",(!o||window.innerWidth>d)&&(e.parentNode.style.transitionDelay="0.2s");try{var l=new CustomEvent(n+"-closing",{detail:a,bubbles:!0,cancelable:!0});document.dispatchEvent(l)}catch(c){console.warn(c)}setTimeout(function(){e.parentNode.style.height="0px",e.parentNode.style.overflow="",setTimeout(function(){delete s.children[a.ref],e.parentNode.remove();try{var t=new CustomEvent(n+"-closed",{detail:a,bubbles:!0,cancelable:!0});document.dispatchEvent(t)}catch(o){console.warn(o)}"undefined"!=typeof a.onClosed&&a.onClosed.apply(null,[a,e,i])},1e3)},200),"undefined"!=typeof a.onClosing&&a.onClosing.apply(null,[a,e,i])},e.show=function(t){var i=this,s=g(c,t||{});if(s=g(u,s),s.time={},null===s.id&&(s.id=v(s.title+s.message+s.color)),1===s.displayMode||"once"==s.displayMode)try{if(document.querySelectorAll("."+n+"#"+s.id).length>0)return!1}catch(l){console.warn("["+n+"] Could not find an element with this selector: #"+s.id+". Try to set an valid id.")}if(2===s.displayMode||"replace"==s.displayMode)try{m(document.querySelectorAll("."+n+"#"+s.id),function(t,e){i.hide(s,t,"replaced")})}catch(l){console.warn("["+n+"] Could not find an element with this selector: #"+s.id+". Try to set an valid id.")}s.ref=(new Date).getTime()+Math.floor(1e7*Math.random()+1),e.children[s.ref]=s;var p={body:document.querySelector("body"),overlay:document.createElement("div"),toast:document.createElement("div"),toastBody:document.createElement("div"),toastTexts:document.createElement("div"),toastCapsule:document.createElement("div"),cover:document.createElement("div"),buttons:document.createElement("div"),inputs:document.createElement("div"),icon:s.iconUrl?document.createElement("img"):document.createElement("i"),wrapper:null};p.toast.setAttribute("data-iziToast-ref",s.ref),p.toast.appendChild(p.toastBody),p.toastCapsule.appendChild(p.toast),function(){if(p.toast.classList.add(n),p.toast.classList.add(n+"-opening"),p.toastCapsule.classList.add(n+"-capsule"),p.toastBody.classList.add(n+"-body"),p.toastTexts.classList.add(n+"-texts"),o||window.innerWidth<=d?s.transitionInMobile&&p.toast.classList.add(s.transitionInMobile):s.transitionIn&&p.toast.classList.add(s.transitionIn),s["class"]){var t=s["class"].split(" ");m(t,function(t,e){p.toast.classList.add(t)})}s.id&&(p.toast.id=s.id),s.rtl&&(p.toast.classList.add(n+"-rtl"),p.toast.setAttribute("dir","rtl")),s.layout>1&&p.toast.classList.add(n+"-layout"+s.layout),s.balloon&&p.toast.classList.add(n+"-balloon"),s.maxWidth&&(isNaN(s.maxWidth)?p.toast.style.maxWidth=s.maxWidth:p.toast.style.maxWidth=s.maxWidth+"px"),""===s.theme&&"light"===s.theme||p.toast.classList.add(n+"-theme-"+s.theme),s.color&&(y(s.color)?p.toast.style.background=s.color:p.toast.classList.add(n+"-color-"+s.color)),s.backgroundColor&&(p.toast.style.background=s.backgroundColor,s.balloon&&(p.toast.style.borderColor=s.backgroundColor))}(),function(){s.image&&(p.cover.classList.add(n+"-cover"),p.cover.style.width=s.imageWidth+"px",h(s.image.replace(/ /g,""))?p.cover.style.backgroundImage="url(data:image/png;base64,"+s.image.replace(/ /g,"")+")":p.cover.style.backgroundImage="url("+s.image+")",s.rtl?p.toastBody.style.marginRight=s.imageWidth+10+"px":p.toastBody.style.marginLeft=s.imageWidth+10+"px",p.toast.appendChild(p.cover))}(),function(){s.close?(p.buttonClose=document.createElement("button"),p.buttonClose.type="button",p.buttonClose.classList.add(n+"-close"),p.buttonClose.addEventListener("click",function(t){t.target;i.hide(s,p.toast,"button")}),p.toast.appendChild(p.buttonClose)):s.rtl?p.toast.style.paddingLeft="18px":p.toast.style.paddingRight="18px"}(),function(){s.progressBar&&(p.progressBar=document.createElement("div"),p.progressBarDiv=document.createElement("div"),p.progressBar.classList.add(n+"-progressbar"),p.progressBarDiv.style.background=s.progressBarColor,p.progressBar.appendChild(p.progressBarDiv),p.toast.appendChild(p.progressBar)),s.timeout&&(s.pauseOnHover&&!s.resetOnHover&&(p.toast.addEventListener("mouseenter",function(t){i.progress(s,p.toast).pause()}),p.toast.addEventListener("mouseleave",function(t){i.progress(s,p.toast).resume()})),s.resetOnHover&&(p.toast.addEventListener("mouseenter",function(t){i.progress(s,p.toast).reset()}),p.toast.addEventListener("mouseleave",function(t){i.progress(s,p.toast).start()})))}(),function(){s.iconUrl?(p.icon.setAttribute("class",n+"-icon"),p.icon.setAttribute("src",s.iconUrl)):s.icon&&(p.icon.setAttribute("class",n+"-icon "+s.icon),s.iconText&&p.icon.appendChild(document.createTextNode(s.iconText)),s.iconColor&&(p.icon.style.color=s.iconColor)),(s.icon||s.iconUrl)&&(s.rtl?p.toastBody.style.paddingRight="33px":p.toastBody.style.paddingLeft="33px",p.toastBody.appendChild(p.icon))}(),function(){s.title.length>0&&(p.strong=document.createElement("strong"),p.strong.classList.add(n+"-title"),p.strong.appendChild(f(s.title)),p.toastTexts.appendChild(p.strong),s.titleColor&&(p.strong.style.color=s.titleColor),s.titleSize&&(isNaN(s.titleSize)?p.strong.style.fontSize=s.titleSize:p.strong.style.fontSize=s.titleSize+"px"),s.titleLineHeight&&(isNaN(s.titleSize)?p.strong.style.lineHeight=s.titleLineHeight:p.strong.style.lineHeight=s.titleLineHeight+"px")),s.message.length>0&&(p.p=document.createElement("p"),p.p.classList.add(n+"-message"),p.p.appendChild(f(s.message)),p.toastTexts.appendChild(p.p),s.messageColor&&(p.p.style.color=s.messageColor),s.messageSize&&(isNaN(s.titleSize)?p.p.style.fontSize=s.messageSize:p.p.style.fontSize=s.messageSize+"px"),s.messageLineHeight&&(isNaN(s.titleSize)?p.p.style.lineHeight=s.messageLineHeight:p.p.style.lineHeight=s.messageLineHeight+"px")),s.title.length>0&&s.message.length>0&&(s.rtl?p.strong.style.marginLeft="10px":2===s.layout||s.rtl||(p.strong.style.marginRight="10px"))}(),p.toastBody.appendChild(p.toastTexts);var L;!function(){s.inputs.length>0&&(p.inputs.classList.add(n+"-inputs"),m(s.inputs,function(t,e){p.inputs.appendChild(f(t[0])),L=p.inputs.childNodes,L[e].classList.add(n+"-inputs-child"),t[3]&&setTimeout(function(){L[e].focus()},300),L[e].addEventListener(t[1],function(e){var n=t[2];return n(i,p.toast,this,e)})}),p.toastBody.appendChild(p.inputs))}(),function(){s.buttons.length>0&&(p.buttons.classList.add(n+"-buttons"),m(s.buttons,function(t,e){p.buttons.appendChild(f(t[0]));var o=p.buttons.childNodes;o[e].classList.add(n+"-buttons-child"),t[2]&&setTimeout(function(){o[e].focus()},300),o[e].addEventListener("click",function(e){e.preventDefault();var n=t[1];return n(i,p.toast,this,e,L)})})),p.toastBody.appendChild(p.buttons)}(),s.message.length>0&&(s.inputs.length>0||s.buttons.length>0)&&(p.p.style.marginBottom="0"),(s.inputs.length>0||s.buttons.length>0)&&(s.rtl?p.toastTexts.style.marginLeft="10px":p.toastTexts.style.marginRight="10px",s.inputs.length>0&&s.buttons.length>0&&(s.rtl?p.inputs.style.marginLeft="8px":p.inputs.style.marginRight="8px")),function(){p.toastCapsule.style.visibility="hidden",setTimeout(function(){var t=p.toast.offsetHeight,e=p.toast.currentStyle||window.getComputedStyle(p.toast),n=e.marginTop;n=n.split("px"),n=parseInt(n[0]);var o=e.marginBottom;o=o.split("px"),o=parseInt(o[0]),p.toastCapsule.style.visibility="",p.toastCapsule.style.height=t+o+n+"px",setTimeout(function(){p.toastCapsule.style.height="auto",s.target&&(p.toastCapsule.style.overflow="visible")},500),s.timeout&&i.progress(s,p.toast).start()},100)}(),function(){var t=s.position;if(s.target)p.wrapper=document.querySelector(s.target),p.wrapper.classList.add(n+"-target"),s.targetFirst?p.wrapper.insertBefore(p.toastCapsule,p.wrapper.firstChild):p.wrapper.appendChild(p.toastCapsule);else{if(-1==r.indexOf(s.position))return void console.warn("["+n+"] Incorrect position.\nIt can be › "+r);t=o||window.innerWidth<=d?"bottomLeft"==s.position||"bottomRight"==s.position||"bottomCenter"==s.position?n+"-wrapper-bottomCenter":"topLeft"==s.position||"topRight"==s.position||"topCenter"==s.position?n+"-wrapper-topCenter":n+"-wrapper-center":n+"-wrapper-"+t,p.wrapper=document.querySelector("."+n+"-wrapper."+t),p.wrapper||(p.wrapper=document.createElement("div"),p.wrapper.classList.add(n+"-wrapper"),p.wrapper.classList.add(t),document.body.appendChild(p.wrapper)),"topLeft"==s.position||"topCenter"==s.position||"topRight"==s.position?p.wrapper.insertBefore(p.toastCapsule,p.wrapper.firstChild):p.wrapper.appendChild(p.toastCapsule)}isNaN(s.zindex)?console.warn("["+n+"] Invalid zIndex."):p.wrapper.style.zIndex=s.zindex}(),function(){s.overlay&&(null!==document.querySelector("."+n+"-overlay.fadeIn")?(p.overlay=document.querySelector("."+n+"-overlay"),p.overlay.setAttribute("data-iziToast-ref",p.overlay.getAttribute("data-iziToast-ref")+","+s.ref),isNaN(s.zindex)||null===s.zindex||(p.overlay.style.zIndex=s.zindex-1)):(p.overlay.classList.add(n+"-overlay"),p.overlay.classList.add("fadeIn"),p.overlay.style.background=s.overlayColor,p.overlay.setAttribute("data-iziToast-ref",s.ref),isNaN(s.zindex)||null===s.zindex||(p.overlay.style.zIndex=s.zindex-1),document.querySelector("body").appendChild(p.overlay)),s.overlayClose?(p.overlay.removeEventListener("click",{}),p.overlay.addEventListener("click",function(t){i.hide(s,p.toast,"overlay")})):p.overlay.removeEventListener("click",{}))}(),function(){if(s.animateInside){p.toast.classList.add(n+"-animateInside");var t=[200,100,300];"bounceInLeft"!=s.transitionIn&&"bounceInRight"!=s.transitionIn||(t=[400,200,400]),s.title.length>0&&setTimeout(function(){p.strong.classList.add("slideIn")},t[0]),s.message.length>0&&setTimeout(function(){p.p.classList.add("slideIn")},t[1]),(s.icon||s.iconUrl)&&setTimeout(function(){p.icon.classList.add("revealIn")},t[2]);var e=150;s.buttons.length>0&&p.buttons&&setTimeout(function(){m(p.buttons.childNodes,function(t,n){setTimeout(function(){t.classList.add("revealIn")},e),e+=150})},s.inputs.length>0?150:0),s.inputs.length>0&&p.inputs&&(e=150,m(p.inputs.childNodes,function(t,n){setTimeout(function(){t.classList.add("revealIn")},e),e+=150}))}}(),s.onOpening.apply(null,[s,p.toast]);try{var C=new CustomEvent(n+"-opening",{detail:s,bubbles:!0,cancelable:!0});document.dispatchEvent(C)}catch(w){console.warn(w)}setTimeout(function(){p.toast.classList.remove(n+"-opening"),p.toast.classList.add(n+"-opened");try{var t=new CustomEvent(n+"-opened",{detail:s,bubbles:!0,cancelable:!0});document.dispatchEvent(t)}catch(e){console.warn(e)}s.onOpened.apply(null,[s,p.toast])},1e3),s.drag&&(a?(p.toast.addEventListener("touchstart",function(t){b.startMoving(this,i,s,t)},!1),p.toast.addEventListener("touchend",function(t){b.stopMoving(this,t)},!1)):(p.toast.addEventListener("mousedown",function(t){t.preventDefault(),b.startMoving(this,i,s,t)},!1),p.toast.addEventListener("mouseup",function(t){t.preventDefault(),b.stopMoving(this,t)},!1))),s.closeOnEscape&&document.addEventListener("keyup",function(t){t=t||window.event,27==t.keyCode&&i.hide(s,p.toast,"esc")}),s.closeOnClick&&p.toast.addEventListener("click",function(t){i.hide(s,p.toast,"toast")}),i.toast=p.toast},e});
/*
* iziModal | v1.6.0
* http://izimodal.marcelodolce.com
* by Marcelo Dolce.
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

	var $window = $(window),
    	$document = $(document),
		PLUGIN_NAME = 'iziModal',
		STATES = {
		CLOSING: 'closing',
		CLOSED: 'closed',
		OPENING: 'opening',
		OPENED: 'opened',
		DESTROYED: 'destroyed'
	};

	function whichAnimationEvent(){
		var t,
			el = document.createElement('fakeelement'),
			animations = {
			'animation'      : 'animationend',
			'OAnimation'     : 'oAnimationEnd',
			'MozAnimation'   : 'animationend',
			'WebkitAnimation': 'webkitAnimationEnd'
		};
		for (t in animations){
			if (el.style[t] !== undefined){
				return animations[t];
			}
		}
	}

	function isIE(version) {
		if(version === 9){
			return navigator.appVersion.indexOf('MSIE 9.') !== -1;
		} else {
			userAgent = navigator.userAgent;
			return userAgent.indexOf('MSIE ') > -1 || userAgent.indexOf('Trident/') > -1;
		}
	}

	function clearValue(value){
		var separators = /%|px|em|cm|vh|vw/;
		return parseInt(String(value).split(separators)[0]);
	}

	function changeHashWithoutScrolling(hash) {
		var id = hash.replace(/^.*#/, ''),
			$elem = $(hash);
		$elem.attr('id', id+'-tmp');
		window.location.hash = hash;
		$elem.attr('id', id);
	}

	var animationEvent = whichAnimationEvent(),
		isMobile = (/Mobi/.test(navigator.userAgent)) ? true : false;

	window.$iziModal = {};
	window.$iziModal.autoOpen = 0;
	window.$iziModal.history = false;

	var iziModal = function (element, options) {
		this.init(element, options);
	};

	iziModal.prototype = {

		constructor: iziModal,

		init: function (element, options) {

			var that = this;
			this.$element = $(element);

			if(this.$element[0].id !== undefined && this.$element[0].id !== ''){
				this.id = this.$element[0].id;
			} else {
				this.id = PLUGIN_NAME+Math.floor((Math.random() * 10000000) + 1);
				this.$element.attr('id', this.id);
			}
			this.classes = ( this.$element.attr('class') !== undefined ) ? this.$element.attr('class') : '';
			this.content = this.$element.html();
			this.state = STATES.CLOSED;
			this.options = options;
			this.width = 0;
			this.timer = null;
			this.timerTimeout = null;
			this.progressBar = null;
            this.isPaused = false;
			this.isFullscreen = false;
            this.headerHeight = 0;
            this.modalHeight = 0;
            this.$overlay = $('<div class="'+PLUGIN_NAME+'-overlay" style="background-color:'+options.overlayColor+'"></div>');
			this.$navigate = $('<div class="'+PLUGIN_NAME+'-navigate"><div class="'+PLUGIN_NAME+'-navigate-caption">Use</div><button class="'+PLUGIN_NAME+'-navigate-prev"></button><button class="'+PLUGIN_NAME+'-navigate-next"></button></div>');
            this.group = {
            	name: this.$element.attr('data-'+PLUGIN_NAME+'-group'),
            	index: null,
            	ids: []
            };
			this.$element.attr('aria-hidden', 'true');
			this.$element.attr('aria-labelledby', this.id);
			this.$element.attr('role', 'dialog');

			if( !this.$element.hasClass('iziModal') ){
				this.$element.addClass('iziModal');
			}

            if(this.group.name === undefined && options.group !== ''){
            	this.group.name = options.group;
            	this.$element.attr('data-'+PLUGIN_NAME+'-group', options.group);
            }
            if(this.options.loop === true){
            	this.$element.attr('data-'+PLUGIN_NAME+'-loop', true);
            }

            $.each( this.options , function(index, val) {
				var attr = that.$element.attr('data-'+PLUGIN_NAME+'-'+index);
            	try {
		            if(typeof attr !== typeof undefined){

						if(attr === ''|| attr == 'true'){
							options[index] = true;
						} else if (attr == 'false') {
							options[index] = false;
						} else if (typeof val == 'function') {
							options[index] = new Function(attr);
						} else {
							options[index] = attr;
						}
		            }
            	} catch(exc){}
            });

            if(options.appendTo !== false){
				this.$element.appendTo(options.appendTo);
            }

            if (options.iframe === true) {
                this.$element.html('<div class="'+PLUGIN_NAME+'-wrap"><div class="'+PLUGIN_NAME+'-content"><iframe class="'+PLUGIN_NAME+'-iframe"></iframe>' + this.content + "</div></div>");

	            if (options.iframeHeight !== null) {
	                this.$element.find('.'+PLUGIN_NAME+'-iframe').css('height', options.iframeHeight);
	            }
            } else {
            	this.$element.html('<div class="'+PLUGIN_NAME+'-wrap"><div class="'+PLUGIN_NAME+'-content">' + this.content + '</div></div>');
            }

			if (this.options.background !== null) {
				this.$element.css('background', this.options.background);
			}

            this.$wrap = this.$element.find('.'+PLUGIN_NAME+'-wrap');

			if(options.zindex !== null && !isNaN(parseInt(options.zindex)) ){
			 	this.$element.css('z-index', options.zindex);
			 	this.$navigate.css('z-index', options.zindex-1);
			 	this.$overlay.css('z-index', options.zindex-2);
			}

			if(options.radius !== ''){
                this.$element.css('border-radius', options.radius);
            }

            if(options.padding !== ''){
                this.$element.find('.'+PLUGIN_NAME+'-content').css('padding', options.padding);
            }

            if(options.theme !== ''){
				if(options.theme === 'light'){
					this.$element.addClass(PLUGIN_NAME+'-light');
				} else {
					this.$element.addClass(options.theme);
				}
            }

			if(options.rtl === true) {
				this.$element.addClass(PLUGIN_NAME+'-rtl');
			}

			if(options.openFullscreen === true){
			    this.isFullscreen = true;
			    this.$element.addClass('isFullscreen');
			}

			this.createHeader();
			this.recalcWidth();
			this.recalcVerticalPos();

			if (that.options.afterRender && ( typeof(that.options.afterRender) === 'function' || typeof(that.options.afterRender) === 'object' ) ) {
		        that.options.afterRender(that);
		    }

		},

		createHeader: function(){

			this.$header = $('<div class="'+PLUGIN_NAME+'-header"><h2 class="'+PLUGIN_NAME+'-header-title">' + this.options.title + '</h2><p class="'+PLUGIN_NAME+'-header-subtitle">' + this.options.subtitle + '</p><div class="'+PLUGIN_NAME+'-header-buttons"></div></div>');

			if (this.options.closeButton === true) {
				this.$header.find('.'+PLUGIN_NAME+'-header-buttons').append('<a href="javascript:void(0)" class="'+PLUGIN_NAME+'-button '+PLUGIN_NAME+'-button-close" data-'+PLUGIN_NAME+'-close></a>');
			}

            if (this.options.fullscreen === true) {
            	this.$header.find('.'+PLUGIN_NAME+'-header-buttons').append('<a href="javascript:void(0)" class="'+PLUGIN_NAME+'-button '+PLUGIN_NAME+'-button-fullscreen" data-'+PLUGIN_NAME+'-fullscreen></a>');
            }

            //if (this.options.timeoutProgressbar === true && !isNaN(parseInt(this.options.timeout)) && this.options.timeout !== false && this.options.timeout !== 0) {
			if (this.options.timeoutProgressbar === true) {
				this.$header.prepend('<div class="'+PLUGIN_NAME+'-progressbar"><div style="background-color:'+this.options.timeoutProgressbarColor+'"></div></div>');
            }

            if (this.options.subtitle === '') {
        		this.$header.addClass(PLUGIN_NAME+'-noSubtitle');
            }

            if (this.options.title !== '') {

                if (this.options.headerColor !== null) {
                	if(this.options.borderBottom === true){
                    	this.$element.css('border-bottom', '3px solid ' + this.options.headerColor + '');
                	}
                    this.$header.css('background', this.options.headerColor);
                }
				if (this.options.icon !== null || this.options.iconText !== null){

                    this.$header.prepend('<i class="'+PLUGIN_NAME+'-header-icon"></i>');

	                if (this.options.icon !== null) {
	                    this.$header.find('.'+PLUGIN_NAME+'-header-icon').addClass(this.options.icon).css('color', this.options.iconColor);
					}
	                if (this.options.iconText !== null){
	                	this.$header.find('.'+PLUGIN_NAME+'-header-icon').html(this.options.iconText);
	                }
				}
                this.$element.css('overflow', 'hidden').prepend(this.$header);
            }
		},

		setGroup: function(groupName){

			var that = this,
				group = this.group.name || groupName;
				this.group.ids = [];

			if( groupName !== undefined && groupName !== this.group.name){
				group = groupName;
				this.group.name = group;
				this.$element.attr('data-'+PLUGIN_NAME+'-group', group);
			}
			if(group !== undefined && group !== ''){

            	var count = 0;
            	$.each( $('.'+PLUGIN_NAME+'[data-'+PLUGIN_NAME+'-group='+group+']') , function(index, val) {

					that.group.ids.push($(this)[0].id);

					if(that.id == $(this)[0].id){
						that.group.index = count;
					}
        			count++;
            	});
            }
		},

		toggle: function () {

			if(this.state == STATES.OPENED){
				this.close();
			}
			if(this.state == STATES.CLOSED){
				this.open();
			}
		},

		startProgress: function(param) {

			var that = this;

			this.isPaused = false;

			clearTimeout(this.timerTimeout);

			if (this.options.timeoutProgressbar === true) {

				this.progressBar = {
                    hideEta: null,
                    maxHideTime: null,
                    currentTime: new Date().getTime(),
                    el: this.$element.find('.'+PLUGIN_NAME+'-progressbar > div'),
                    updateProgress: function()
                    {
						if(!that.isPaused){

							that.progressBar.currentTime = that.progressBar.currentTime+10;

		                    var percentage = ((that.progressBar.hideEta - (that.progressBar.currentTime)) / that.progressBar.maxHideTime) * 100;
		                    that.progressBar.el.width(percentage + '%');
		                    if(percentage < 0){
		                    	that.close();
		                    }
						}
                    }
                };
				if (param > 0) {
                    this.progressBar.maxHideTime = parseFloat(param);
                    this.progressBar.hideEta = new Date().getTime() + this.progressBar.maxHideTime;
                    this.timerTimeout = setInterval(this.progressBar.updateProgress, 10);
                }

			} else {
				this.timerTimeout = setTimeout(function(){
					that.close();
				}, that.options.timeout);
			}
	
		}, 

		pauseProgress: function(){

			this.isPaused = true;
		},

		resumeProgress: function(){

			this.isPaused = false;
		},

		resetProgress: function(param){

        	clearTimeout(this.timerTimeout);
        	this.progressBar = {};
            this.$element.find('.'+PLUGIN_NAME+'-progressbar > div').width('100%');
		},

		open: function (param) {

			var that = this;

			try {
				if(param !== undefined && param.preventClose === false){
					$.each( $('.'+PLUGIN_NAME) , function(index, modal) {
						if( $(modal).data().iziModal !== undefined ){
							var state = $(modal).iziModal('getState');

							if(state == 'opened' || state == 'opening'){
								$(modal).iziModal('close');
							}
						}
					});				
				}
			} catch(e) {  /*console.warn(exc);*/  }

            (function urlHash(){
				if(that.options.history){

	            	var oldTitle = document.title;
		            document.title = oldTitle + " - " + that.options.title;
					changeHashWithoutScrolling('#'+that.id);
					document.title = oldTitle;
					//history.pushState({}, that.options.title, "#"+that.id);

					window.$iziModal.history = true;
				} else {
					window.$iziModal.history = false;
				}
            })();

			function opened(){

			    // console.info('[ '+PLUGIN_NAME+' | '+that.id+' ] Opened.');

				that.state = STATES.OPENED;
		    	that.$element.trigger(STATES.OPENED);

				if (that.options.onOpened && ( typeof(that.options.onOpened) === "function" || typeof(that.options.onOpened) === "object" ) ) {
			        that.options.onOpened(that);
			    }
			}

			function bindEvents(){

	            // Close when button pressed
	            that.$element.off('click', '[data-'+PLUGIN_NAME+'-close]').on('click', '[data-'+PLUGIN_NAME+'-close]', function (e) {
	                e.preventDefault();

	                var transition = $(e.currentTarget).attr('data-'+PLUGIN_NAME+'-transitionOut');

	                if(transition !== undefined){
	                	that.close({transition:transition});
	                } else {
	                	that.close();
	                }
	            });

	            // Expand when button pressed
	            that.$element.off('click', '[data-'+PLUGIN_NAME+'-fullscreen]').on('click', '[data-'+PLUGIN_NAME+'-fullscreen]', function (e) {
	                e.preventDefault();
	                if(that.isFullscreen === true){
						that.isFullscreen = false;
		                that.$element.removeClass('isFullscreen');
	                } else {
		                that.isFullscreen = true;
		                that.$element.addClass('isFullscreen');
	                }
					if (that.options.onFullscreen && typeof(that.options.onFullscreen) === "function") {
				        that.options.onFullscreen(that);
				    }
				    that.$element.trigger('fullscreen', that);
	            });

	            // Next modal
	            that.$navigate.off('click', '.'+PLUGIN_NAME+'-navigate-next').on('click', '.'+PLUGIN_NAME+'-navigate-next', function (e) {
	            	that.next(e);
	            });
	            that.$element.off('click', '[data-'+PLUGIN_NAME+'-next]').on('click', '[data-'+PLUGIN_NAME+'-next]', function (e) {
	            	that.next(e);
	            });

	            // Previous modal
	            that.$navigate.off('click', '.'+PLUGIN_NAME+'-navigate-prev').on('click', '.'+PLUGIN_NAME+'-navigate-prev', function (e) {
	            	that.prev(e);
	            });
				that.$element.off('click', '[data-'+PLUGIN_NAME+'-prev]').on('click', '[data-'+PLUGIN_NAME+'-prev]', function (e) {
	            	that.prev(e);
	            });
			}

		    if(this.state == STATES.CLOSED){

		    	bindEvents();

				this.setGroup();
				this.state = STATES.OPENING;
	            this.$element.trigger(STATES.OPENING);
				this.$element.attr('aria-hidden', 'false');

				// console.info('[ '+PLUGIN_NAME+' | '+this.id+' ] Opening...');

				if (this.options.timeoutProgressbar === true) {
					this.$element.find('.'+PLUGIN_NAME+'-progressbar > div').width('100%');
				}

				if(this.options.iframe === true){

					this.$element.find('.'+PLUGIN_NAME+'-content').addClass(PLUGIN_NAME+'-content-loader');

					this.$element.find('.'+PLUGIN_NAME+'-iframe').on('load', function(){
						$(this).parent().removeClass(PLUGIN_NAME+'-content-loader');
					});

					var href = null;
					try {
						href = $(param.currentTarget).attr('href') !== '' ? $(param.currentTarget).attr('href') : null;
					} catch(e) { /* console.warn(exc); */ }

					if( (this.options.iframeURL !== null) && (href === null || href === undefined)){
						href = this.options.iframeURL;
					}
					if(href === null || href === undefined){
						throw new Error('Failed to find iframe URL');
					}
				    this.$element.find('.'+PLUGIN_NAME+'-iframe').attr('src', href);
				}


				if (this.options.bodyOverflow || isMobile){
					$('html').addClass(PLUGIN_NAME+'-isOverflow');
					if(isMobile){
						$('body').css('overflow', 'hidden');
					}
				}

				if (this.options.onOpening && typeof(this.options.onOpening) === 'function') {
			        this.options.onOpening(this);
			    }
				(function open(){

			    	if(that.group.ids.length > 1 ){

			    		that.$navigate.appendTo('body');
			    		that.$navigate.addClass('fadeIn');

			    		if(that.options.navigateCaption === true){
			    			that.$navigate.find('.'+PLUGIN_NAME+'-navigate-caption').show();
			    		}

			    		var modalWidth = that.$element.outerWidth();
			    		if(that.options.navigateArrows !== false){
					    	if (that.options.navigateArrows === 'closeScreenEdge'){
				    			that.$navigate.find('.'+PLUGIN_NAME+'-navigate-prev').css('left', 0).show();
				    			that.$navigate.find('.'+PLUGIN_NAME+'-navigate-next').css('right', 0).show();
					    	} else {
						    	that.$navigate.find('.'+PLUGIN_NAME+'-navigate-prev').css('margin-left', -((modalWidth/2)+84)).show();
						    	that.$navigate.find('.'+PLUGIN_NAME+'-navigate-next').css('margin-right', -((modalWidth/2)+84)).show();
					    	}
			    		} else {
			    			that.$navigate.find('.'+PLUGIN_NAME+'-navigate-prev').hide();
			    			that.$navigate.find('.'+PLUGIN_NAME+'-navigate-next').hide();
			    		}

			    		var loop;
						if(that.group.index === 0){

							loop = $('.'+PLUGIN_NAME+'[data-'+PLUGIN_NAME+'-group="'+that.group.name+'"][data-'+PLUGIN_NAME+'-loop]').length;

							if(loop === 0 && that.options.loop === false)
								that.$navigate.find('.'+PLUGIN_NAME+'-navigate-prev').hide();
				    	}
				    	if(that.group.index+1 === that.group.ids.length){

				    		loop = $('.'+PLUGIN_NAME+'[data-'+PLUGIN_NAME+'-group="'+that.group.name+'"][data-'+PLUGIN_NAME+'-loop]').length;

							if(loop === 0 && that.options.loop === false)
								that.$navigate.find('.'+PLUGIN_NAME+'-navigate-next').hide();
				    	}
			    	}

					if(that.options.overlay === true) {

						if(that.options.appendToOverlay === false){
							that.$overlay.appendTo('body');
						} else {
							that.$overlay.appendTo( that.options.appendToOverlay );
						}
					}

					if (that.options.transitionInOverlay) {
						that.$overlay.addClass(that.options.transitionInOverlay);
					}

					var transitionIn = that.options.transitionIn;

					if( typeof param == 'object' ){
						
						if(param.transition !== undefined || param.transitionIn !== undefined){
							transitionIn = param.transition || param.transitionIn;
						}
						if(param.zindex !== undefined){
							that.setZindex(param.zindex);
						}
					}

					if (transitionIn !== '' && animationEvent !== undefined) {

						that.$element.addClass('transitionIn '+transitionIn).show();
						that.$wrap.one(animationEvent, function () {

						    that.$element.removeClass(transitionIn + ' transitionIn');
						    that.$overlay.removeClass(that.options.transitionInOverlay);
						    that.$navigate.removeClass('fadeIn');

							opened();
						});

					} else {

						that.$element.show();
						opened();
					}

					if(that.options.pauseOnHover === true && that.options.pauseOnHover === true && that.options.timeout !== false && !isNaN(parseInt(that.options.timeout)) && that.options.timeout !== false && that.options.timeout !== 0){

						that.$element.off('mouseenter').on('mouseenter', function(event) {
							event.preventDefault();
							that.isPaused = true;
						});
						that.$element.off('mouseleave').on('mouseleave', function(event) {
							event.preventDefault();
							that.isPaused = false;
						});
					}

				})();

				if (this.options.timeout !== false && !isNaN(parseInt(this.options.timeout)) && this.options.timeout !== false && this.options.timeout !== 0) {

					that.startProgress(this.options.timeout);
				}

	            // Close on overlay click
	            if (this.options.overlayClose && !this.$element.hasClass(this.options.transitionOut)) {
	            	this.$overlay.click(function () {
	                    that.close();
	            	});
	            }

				if (this.options.focusInput){
			    	this.$element.find(':input:not(button):enabled:visible:first').focus(); // Focus on the first field
				}

				(function updateTimer(){
			    	that.recalcLayout();
				    that.timer = setTimeout(updateTimer, 300);
				})();

	            // Close when the Escape key is pressed
	            $document.on('keydown.'+PLUGIN_NAME, function (e) {
	                if (that.options.closeOnEscape && e.keyCode === 27) {
	                    that.close();
	                }
	            });

		    }

		},

		close: function (param) {

			var that = this;

			function closed(){

                // console.info('[ '+PLUGIN_NAME+' | '+that.id+' ] Closed.');

                that.state = STATES.CLOSED;
                that.$element.trigger(STATES.CLOSED);

                if (that.options.iframe === true) {
                    that.$element.find('.'+PLUGIN_NAME+'-iframe').attr('src', '');
                }

				if (that.options.bodyOverflow || isMobile){
					$('html').removeClass(PLUGIN_NAME+'-isOverflow');
					if(isMobile){
						$('body').css('overflow','auto');
					}
				}

				if (that.options.onClosed && typeof(that.options.onClosed) === 'function') {
					that.options.onClosed(that);
				}

				if(that.options.restoreDefaultContent === true){
				    that.$element.find('.'+PLUGIN_NAME+'-content').html( that.content );
				}

				if( $('.'+PLUGIN_NAME+':visible').length === 0 ){
					$('html').removeClass(PLUGIN_NAME+'-isAttached');
				}
			}

            if(this.state == STATES.OPENED || this.state == STATES.OPENING){

            	$document.off('keydown.'+PLUGIN_NAME);

				this.state = STATES.CLOSING;
				this.$element.trigger(STATES.CLOSING);
				this.$element.attr('aria-hidden', 'true');

				// console.info('[ '+PLUGIN_NAME+' | '+this.id+' ] Closing...');

	            clearTimeout(this.timer);
	            clearTimeout(this.timerTimeout);

				if (that.options.onClosing && typeof(that.options.onClosing) === "function") {
			        that.options.onClosing(this);
			    }

				var transitionOut = this.options.transitionOut;

				if( typeof param == 'object' ){
					if(param.transition !== undefined || param.transitionOut !== undefined){
						transitionOut = param.transition || param.transitionOut;
					}
				}

				if( (transitionOut === false || transitionOut === '' ) || animationEvent === undefined){

	                this.$element.hide();
	                this.$overlay.remove();
                	this.$navigate.remove();
	                closed();

				} else {

	                this.$element.attr('class', [
						this.classes,
						PLUGIN_NAME,
						transitionOut,
						this.options.theme == 'light' ? PLUGIN_NAME+'-light' : this.options.theme,
						this.isFullscreen === true ? 'isFullscreen' : '',
						this.options.rtl ? PLUGIN_NAME+'-rtl' : ''
					].join(' '));

					this.$overlay.attr('class', PLUGIN_NAME + '-overlay ' + this.options.transitionOutOverlay);

					if(that.options.navigateArrows !== false && !isMobile){
						this.$navigate.attr('class', PLUGIN_NAME + '-navigate fadeOut');
					}

	                this.$element.one(animationEvent, function () {

	                    if( that.$element.hasClass(transitionOut) ){
	                        that.$element.removeClass(transitionOut + ' transitionOut').hide();
	                    }
                        that.$overlay.removeClass(that.options.transitionOutOverlay).remove();
						that.$navigate.removeClass('fadeOut').remove();
						closed();
	                });

				}

            }
		},

		next: function(e){

            var that = this;
            var transitionIn = 'fadeInRight';
            var transitionOut = 'fadeOutLeft';
			var modal = $('.'+PLUGIN_NAME+':visible');
            var modals = {};
				modals.out = this;

			if(e !== undefined && typeof e !== 'object'){
            	e.preventDefault();
            	modal = $(e.currentTarget);
            	transitionIn = modal.attr('data-'+PLUGIN_NAME+'-transitionIn');
            	transitionOut = modal.attr('data-'+PLUGIN_NAME+'-transitionOut');
			} else if(e !== undefined){
				if(e.transitionIn !== undefined){
					transitionIn = e.transitionIn;
				}
				if(e.transitionOut !== undefined){
					transitionOut = e.transitionOut;
				}
			}

        	this.close({transition:transitionOut});

			setTimeout(function(){

				var loop = $('.'+PLUGIN_NAME+'[data-'+PLUGIN_NAME+'-group="'+that.group.name+'"][data-'+PLUGIN_NAME+'-loop]').length;
				for (var i = that.group.index+1; i <= that.group.ids.length; i++) {

					try {
						modals.in = $("#"+that.group.ids[i]).data().iziModal;
					} catch(log) {
						// console.info('[ '+PLUGIN_NAME+' ] No next modal.');
					}
					if(typeof modals.in !== 'undefined'){

						$('#'+that.group.ids[i]).iziModal('open', { transition: transitionIn });
						break;

					} else {

						if(i == that.group.ids.length && loop > 0 || that.options.loop === true){

							for (var index = 0; index <= that.group.ids.length; index++) {

								modals.in = $('#'+that.group.ids[index]).data().iziModal;
								if(typeof modals.in !== 'undefined'){

                					$('#'+that.group.ids[index]).iziModal('open', { transition: transitionIn });
               
									break;
								}
							}
						}
					}
				}

			}, 200);

			$(document).trigger( PLUGIN_NAME + '-group-change', modals );
		},

		prev: function(e){
            var that = this;
            var transitionIn = 'fadeInLeft';
            var transitionOut = 'fadeOutRight';
			var modal = $('.'+PLUGIN_NAME+':visible');
            var modals = {};
				modals.out = this;

			if(e !== undefined && typeof e !== 'object'){
            	e.preventDefault();
            	modal = $(e.currentTarget);
            	transitionIn = modal.attr('data-'+PLUGIN_NAME+'-transitionIn');
            	transitionOut = modal.attr('data-'+PLUGIN_NAME+'-transitionOut');

			} else if(e !== undefined){

				if(e.transitionIn !== undefined){
					transitionIn = e.transitionIn;
				}
				if(e.transitionOut !== undefined){
					transitionOut = e.transitionOut;
				}
			}

			this.close({transition:transitionOut});

			setTimeout(function(){

				var loop = $('.'+PLUGIN_NAME+'[data-'+PLUGIN_NAME+'-group="'+that.group.name+'"][data-'+PLUGIN_NAME+'-loop]').length;

				for (var i = that.group.index; i >= 0; i--) {

					try {
						modals.in = $('#'+that.group.ids[i-1]).data().iziModal;
					} catch(log) {
						// console.info('[ '+PLUGIN_NAME+' ] No previous modal.');
					}
					if(typeof modals.in !== 'undefined'){

						$('#'+that.group.ids[i-1]).iziModal('open', { transition: transitionIn });
						break;

					} else {

						if(i === 0 && loop > 0 || that.options.loop === true){

							for (var index = that.group.ids.length-1; index >= 0; index--) {

								modals.in = $('#'+that.group.ids[index]).data().iziModal;
								if(typeof modals.in !== 'undefined'){

									$('#'+that.group.ids[index]).iziModal('open', { transition: transitionIn });

									break;
								}
							}
						}
					}
				}

			}, 200);

			$(document).trigger( PLUGIN_NAME + '-group-change', modals );
		},

		destroy: function() {
			var e = $.Event('destroy');

			this.$element.trigger(e);

            $document.off('keydown.'+PLUGIN_NAME);

			clearTimeout(this.timer);
			clearTimeout(this.timerTimeout);

			if (this.options.iframe === true) {
				this.$element.find('.'+PLUGIN_NAME+'-iframe').remove();
			}
			this.$element.html(this.$element.find('.'+PLUGIN_NAME+'-content').html());

			this.$element.off('click', '[data-'+PLUGIN_NAME+'-close]');
			this.$element.off('click', '[data-'+PLUGIN_NAME+'-fullscreen]');

			this.$element
				.off('.'+PLUGIN_NAME)
				.removeData(PLUGIN_NAME)
				.attr('style', '');

			this.$overlay.remove();
			this.$navigate.remove();
			this.$element.trigger(STATES.DESTROYED);
			this.$element = null;
		},

		getState: function(){

			return this.state;
		},

		getGroup: function(){

			return this.group;
		},

		setWidth: function(width){

			this.options.width = width;

			this.recalcWidth();

			var modalWidth = this.$element.outerWidth();
    		if(this.options.navigateArrows === true || this.options.navigateArrows == 'closeToModal'){
		    	this.$navigate.find('.'+PLUGIN_NAME+'-navigate-prev').css('margin-left', -((modalWidth/2)+84)).show();
		    	this.$navigate.find('.'+PLUGIN_NAME+'-navigate-next').css('margin-right', -((modalWidth/2)+84)).show();
    		}

		},

		setTop: function(top){

			this.options.top = top;

			this.recalcVerticalPos(false);
		},

		setBottom: function(bottom){

			this.options.bottom = bottom;

			this.recalcVerticalPos(false);

		},

		setHeader: function(status){

			if(status){
				this.$element.find('.'+PLUGIN_NAME+'-header').show();
			} else {
				this.headerHeight = 0;
				this.$element.find('.'+PLUGIN_NAME+'-header').hide();
			}
		},

		setTitle: function(title){

			this.options.title = title;

			if(this.headerHeight === 0){
				this.createHeader();
			}

			if( this.$header.find('.'+PLUGIN_NAME+'-header-title').length === 0 ){
				this.$header.append('<h2 class="'+PLUGIN_NAME+'-header-title"></h2>');
			}

			this.$header.find('.'+PLUGIN_NAME+'-header-title').html(title);
		},

		setSubtitle: function(subtitle){

			if(subtitle === ''){

				this.$header.find('.'+PLUGIN_NAME+'-header-subtitle').remove();
				this.$header.addClass(PLUGIN_NAME+'-noSubtitle');

			} else {

				if( this.$header.find('.'+PLUGIN_NAME+'-header-subtitle').length === 0 ){
					this.$header.append('<p class="'+PLUGIN_NAME+'-header-subtitle"></p>');
				}
				this.$header.removeClass(PLUGIN_NAME+'-noSubtitle');

			}

			this.$header.find('.'+PLUGIN_NAME+'-header-subtitle').html(subtitle);
			this.options.subtitle = subtitle;
		},

		setIcon: function(icon){

			if( this.$header.find('.'+PLUGIN_NAME+'-header-icon').length === 0 ){
				this.$header.prepend('<i class="'+PLUGIN_NAME+'-header-icon"></i>');
			}
			this.$header.find('.'+PLUGIN_NAME+'-header-icon').attr('class', PLUGIN_NAME+'-header-icon ' + icon);
			this.options.icon = icon;
		},

		setIconText: function(iconText){

			this.$header.find('.'+PLUGIN_NAME+'-header-icon').html(iconText);
			this.options.iconText = iconText;
		},

		setHeaderColor: function(headerColor){
			if(this.options.borderBottom === true){
            	this.$element.css('border-bottom', '3px solid ' + headerColor + '');
        	}
            this.$header.css('background', headerColor);
            this.options.headerColor = headerColor;
		},

		setBackground: function(background){
			if(background === false){
				this.options.background = null;
				this.$element.css('background', '');
			} else{
            	this.$element.css('background', background);
            	this.options.background = background;
			}
		},

		setZindex: function(zindex){

	        if (!isNaN(parseInt(this.options.zindex))) {
	        	this.options.zindex = zindex;
			 	this.$element.css('z-index', zindex);
			 	this.$navigate.css('z-index', zindex-1);
			 	this.$overlay.css('z-index', zindex-2);
	        }
		},

		setFullscreen: function(value){

			if(value){
			    this.isFullscreen = true;
			    this.$element.addClass('isFullscreen');
			} else {
				this.isFullscreen = false;
			    this.$element.removeClass('isFullscreen');
			}

		},

		setContent: function(content){

			if( typeof content == 'object' ){
				var replace = content.default || false;
				if(replace === true){
					this.content = content.content;
				}
				content = content.content;
			}
            if (this.options.iframe === false) {
        		this.$element.find('.'+PLUGIN_NAME+'-content').html(content);
            }

		},

		setTransitionIn: function(transition){

			this.options.transitionIn = transition;
		},

		setTransitionOut: function(transition){

			this.options.transitionOut = transition;
		},

		setTimeout: function(timeout){

			this.options.timeout = timeout;
		},

		resetContent: function(){

			this.$element.find('.'+PLUGIN_NAME+'-content').html(this.content);
		},

		startLoading: function(){

			if( !this.$element.find('.'+PLUGIN_NAME+'-loader').length ){
				this.$element.append('<div class="'+PLUGIN_NAME+'-loader fadeIn"></div>');
			}
			this.$element.find('.'+PLUGIN_NAME+'-loader').css({
				top: this.headerHeight,
    			borderRadius: this.options.radius
			});
		},

		stopLoading: function(){

			var $loader = this.$element.find('.'+PLUGIN_NAME+'-loader');

			if( !$loader.length ){
				this.$element.prepend('<div class="'+PLUGIN_NAME+'-loader fadeIn"></div>');
				$loader = this.$element.find('.'+PLUGIN_NAME+'-loader').css('border-radius', this.options.radius);
			}
			$loader.removeClass('fadeIn').addClass('fadeOut');
			setTimeout(function(){
				$loader.remove();
			},600);
		},

		recalcWidth: function(){

			var that = this;

            this.$element.css('max-width', this.options.width);

            if(isIE()){
            	var modalWidth = that.options.width;

            	if(modalWidth.toString().split('%').length > 1){
					modalWidth = that.$element.outerWidth();
            	}
            	that.$element.css({
            		left: '50%',
            		marginLeft: -(modalWidth/2)
            	});
            }
		},

		recalcVerticalPos: function(first){

			if(this.options.top !== null && this.options.top !== false){
            	this.$element.css('margin-top', this.options.top);
            	if(this.options.top === 0){
            		this.$element.css({
            			borderTopRightRadius: 0,
            			borderTopLeftRadius: 0
            		});
            	}
			} else {
				if(first === false){
					this.$element.css({
						marginTop: '',
            			borderRadius: this.options.radius
            		});
				}
			}
			if (this.options.bottom !== null && this.options.bottom !== false){
            	this.$element.css('margin-bottom', this.options.bottom);
            	if(this.options.bottom === 0){
            		this.$element.css({
            			borderBottomRightRadius: 0,
            			borderBottomLeftRadius: 0
            		});
            	}
			} else {
				if(first === false){
					this.$element.css({
						marginBottom: '',
            			borderRadius: this.options.radius
            		});
				}
			}

		},

		recalcLayout: function(){

			var that = this,
        		windowHeight = $window.height(),
                modalHeight = this.$element.outerHeight(),
                modalWidth = this.$element.outerWidth(),
                contentHeight = this.$element.find('.'+PLUGIN_NAME+'-content')[0].scrollHeight,
            	outerHeight = contentHeight + this.headerHeight,
            	wrapperHeight = this.$element.innerHeight() - this.headerHeight,
                modalMargin = parseInt(-((this.$element.innerHeight() + 1) / 2)) + 'px',
            	scrollTop = this.$wrap.scrollTop(),
            	borderSize = 0;

			if(isIE()){
				if( modalWidth >= $window.width() || this.isFullscreen === true ){
					this.$element.css({
						left: '0',
						marginLeft: ''
					});
				} else {
	            	this.$element.css({
	            		left: '50%',
	            		marginLeft: -(modalWidth/2)
	            	});
				}
			}

			if(this.options.borderBottom === true && this.options.title !== ''){
				borderSize = 3;
			}

            if(this.$element.find('.'+PLUGIN_NAME+'-header').length && this.$element.find('.'+PLUGIN_NAME+'-header').is(':visible') ){
            	this.headerHeight = parseInt(this.$element.find('.'+PLUGIN_NAME+'-header').innerHeight());
            	this.$element.css('overflow', 'hidden');
            } else {
            	this.headerHeight = 0;
            	this.$element.css('overflow', '');
            }

			if(this.$element.find('.'+PLUGIN_NAME+'-loader').length){
				this.$element.find('.'+PLUGIN_NAME+'-loader').css('top', this.headerHeight);
			}

			if(modalHeight !== this.modalHeight){
				this.modalHeight = modalHeight;

				if (this.options.onResize && typeof(this.options.onResize) === "function") {
			        this.options.onResize(this);
			    }
			}

            if(this.state == STATES.OPENED || this.state == STATES.OPENING){

				if (this.options.iframe === true) {

					// If the height of the window is smaller than the modal with iframe
					if(windowHeight < (this.options.iframeHeight + this.headerHeight+borderSize) || this.isFullscreen === true){
						this.$element.find('.'+PLUGIN_NAME+'-iframe').css( 'height', windowHeight - (this.headerHeight+borderSize));
					} else {
						this.$element.find('.'+PLUGIN_NAME+'-iframe').css( 'height', this.options.iframeHeight);
					}
				}

				if(modalHeight == windowHeight){
					this.$element.addClass('isAttached');
				} else {
					this.$element.removeClass('isAttached');
				}

        		if(this.isFullscreen === false && this.$element.width() >= $window.width() ){
        			this.$element.find('.'+PLUGIN_NAME+'-button-fullscreen').hide();
        		} else {
        			this.$element.find('.'+PLUGIN_NAME+'-button-fullscreen').show();
        		}
				this.recalcButtons();

				if(this.isFullscreen === false){
	                	windowHeight = windowHeight - (clearValue(this.options.top) || 0) - (clearValue(this.options.bottom) || 0);
				}
                // If the modal is larger than the height of the window..
                if (outerHeight > windowHeight) {
					if(this.options.top > 0 && this.options.bottom === null && contentHeight < $window.height()){
				    	this.$element.addClass('isAttachedBottom');
					}
					if(this.options.bottom > 0 && this.options.top === null && contentHeight < $window.height()){
				    	this.$element.addClass('isAttachedTop');
					}
					if( $('.'+PLUGIN_NAME+':visible').length === 1 ){
						$('html').addClass(PLUGIN_NAME+'-isAttached');
					}
					this.$element.css( 'height', windowHeight );

                } else {
                	this.$element.css('height', contentHeight + (this.headerHeight+borderSize));
		    		this.$element.removeClass('isAttachedTop isAttachedBottom');
		    		if( $('.'+PLUGIN_NAME+':visible').length === 1 ){
		    			$('html').removeClass(PLUGIN_NAME+'-isAttached');
		    		}
                }

                (function applyScroll(){
                	if(contentHeight > wrapperHeight && outerHeight > windowHeight){
                		that.$element.addClass('hasScroll');
                		that.$wrap.css('height', modalHeight - (that.headerHeight+borderSize));
                	} else {
                		that.$element.removeClass('hasScroll');
                		that.$wrap.css('height', 'auto');
                	}
            	})();

	            (function applyShadow(){
	                if (wrapperHeight + scrollTop < (contentHeight - 30)) {
	                    that.$element.addClass('hasShadow');
	                } else {
	                    that.$element.removeClass('hasShadow');
	                }
				})();

        	}
		},

		recalcButtons: function(){
			var widthButtons = this.$header.find('.'+PLUGIN_NAME+'-header-buttons').innerWidth()+10;
			if(this.options.rtl === true){
				this.$header.css('padding-left', widthButtons);
			} else {
				this.$header.css('padding-right', widthButtons);
			}
		}

	};


	$window.off('load.'+PLUGIN_NAME).on('load.'+PLUGIN_NAME, function(e) {

		var modalHash = document.location.hash;

		if(window.$iziModal.autoOpen === 0 && !$('.'+PLUGIN_NAME).is(':visible')){

			try {
				var data = $(modalHash).data();
				if(typeof data !== 'undefined'){
					if(data.iziModal.options.autoOpen !== false){
						$(modalHash).iziModal('open');
					}
				}
			} catch(exc) { /* console.warn(exc); */ }
		}

	});

	$window.off('hashchange.'+PLUGIN_NAME).on('hashchange.'+PLUGIN_NAME, function(e) {

		var modalHash = document.location.hash;

		if(modalHash !== ''){
			try {
      			var data = $(modalHash).data();

				if(typeof data !== 'undefined' && $(modalHash).iziModal('getState') !== 'opening'){
					setTimeout(function(){
						$(modalHash).iziModal('open', { preventClose: false });
					},200);
				}
			} catch(exc) { /* console.warn(exc); */ }

		} else {

			if(window.$iziModal.history){
				$.each( $('.'+PLUGIN_NAME) , function(index, modal) {
					if( $(modal).data().iziModal !== undefined ){
						var state = $(modal).iziModal('getState');
						if(state == 'opened' || state == 'opening'){
							$(modal).iziModal('close');
						}
					}
				});
			}
		}

	});

	$document.off('click', '[data-'+PLUGIN_NAME+'-open]').on('click', '[data-'+PLUGIN_NAME+'-open]', function(e) {
		e.preventDefault();

		var modal = $('.'+PLUGIN_NAME+':visible');
		var openModal = $(e.currentTarget).attr('data-'+PLUGIN_NAME+'-open');
		var preventClose = $(e.currentTarget).attr('data-'+PLUGIN_NAME+'-preventClose');
		var transitionIn = $(e.currentTarget).attr('data-'+PLUGIN_NAME+'-transitionIn');
		var transitionOut = $(e.currentTarget).attr('data-'+PLUGIN_NAME+'-transitionOut');
		var zindex = $(e.currentTarget).attr('data-'+PLUGIN_NAME+'-zindex');

		if(zindex !== undefined)
			$(openModal).iziModal('setZindex', zindex);

		if(preventClose === undefined){
			if(transitionOut !== undefined){
				modal.iziModal('close', {
					transition: transitionOut
				});
			} else {
				modal.iziModal('close');
			}
		}
		
		setTimeout(function(){
			if(transitionIn !== undefined){
				$(openModal).iziModal('open', {
					transition: transitionIn
				});
			} else {
				$(openModal).iziModal('open');
			}
		}, 200);
	});

	$document.off('keyup.'+PLUGIN_NAME).on('keyup.'+PLUGIN_NAME, function(event) {

		if( $('.'+PLUGIN_NAME+':visible').length ){
			var modal = $('.'+PLUGIN_NAME+':visible')[0].id,
				arrowKeys = $('#'+modal).data().iziModal.options.arrowKeys,
				group = $('#'+modal).iziModal('getGroup'),
				e = event || window.event,
				target = e.target || e.srcElement,
				modals = {};

			if(modal !== undefined && arrowKeys && group.name !== undefined && !e.ctrlKey && !e.metaKey && !e.altKey && target.tagName.toUpperCase() !== 'INPUT' && target.tagName.toUpperCase() != 'TEXTAREA'){ //&& $(e.target).is('body')

				if(e.keyCode === 37) { // left
					$('#'+modal).iziModal('prev', e);
				}
				else if(e.keyCode === 39 ) { // right
					$('#'+modal).iziModal('next', e);
				}
			}
		}
	});

	$.fn[PLUGIN_NAME] = function(option, args) {


		if( !$(this).length && typeof option == 'object'){

			var newEL = {
				$el: document.createElement('div'),
				id: this.selector.split('#'),
				class: this.selector.split('.')
			};

			if(newEL.id.length > 1){
				try{
					newEL.$el = document.createElement(id[0]);
				} catch(exc){ }

				newEL.$el.id = this.selector.split('#')[1].trim();

			} else if(newEL.class.length > 1){
				try{
					newEL.$el = document.createElement(newEL.class[0]);
				} catch(exc){ }

				for (var x=1; x<newEL.class.length; x++) {
					newEL.$el.classList.add(newEL.class[x].trim());
				}
			}
			document.body.appendChild(newEL.$el);

			this.push($(this.selector));
		}
		var objs = this;

		for (var i=0; i<objs.length; i++) {

			var $this = $(objs[i]);
			var data = $this.data(PLUGIN_NAME);
			var options = $.extend({}, $.fn[PLUGIN_NAME].defaults, $this.data(), typeof option == 'object' && option);

			if (!data && (!option || typeof option == 'object')){

				$this.data(PLUGIN_NAME, (data = new iziModal($this, options)));
			}
			else if (typeof option == 'string' && typeof data != 'undefined'){

				return data[option].apply(data, [].concat(args));
			}
			if (options.autoOpen){ // Automatically open the modal if autoOpen setted true or ms

				if( !isNaN(parseInt(options.autoOpen)) ){

					setTimeout(function(){
						data.open();
					}, options.autoOpen);

				} else if(options.autoOpen === true ) {

					data.open();
				}
				window.$iziModal.autoOpen++;
			}
		}

        return this;
    };

	$.fn[PLUGIN_NAME].defaults = {
	    title: '',
	    subtitle: '',
	    headerColor: '#88A0B9',
	    background: null,
	    theme: '',  // light
	    icon: null,
	    iconText: null,
	    iconColor: '',
	    rtl: false,
	    width: 600,
	    top: null,
	    bottom: null,
	    borderBottom: true,
	    padding: 0,
	    radius: 3,
	    zindex: 999,
	    iframe: false,
	    iframeHeight: 400,
	    iframeURL: null,
	    focusInput: true,
	    group: '',
	    loop: false,
	    arrowKeys: true,
	    navigateCaption: true,
	    navigateArrows: true, // Boolean, 'closeToModal', 'closeScreenEdge'
	    history: false,
	    restoreDefaultContent: false,
	    autoOpen: 0, // Boolean, Number
	    bodyOverflow: false,
	    fullscreen: false,
	    openFullscreen: false,
	    closeOnEscape: true,
	    closeButton: true,
	    appendTo: 'body', // or false
	    appendToOverlay: 'body', // or false
	    overlay: true,
	    overlayClose: true,
	    overlayColor: 'rgba(0, 0, 0, 0.4)',
	    timeout: false,
	    timeoutProgressbar: false,
	    pauseOnHover: false,
	    timeoutProgressbarColor: 'rgba(255,255,255,0.5)',
	    transitionIn: 'comingIn',   // comingIn, bounceInDown, bounceInUp, fadeInDown, fadeInUp, fadeInLeft, fadeInRight, flipInX
	    transitionOut: 'comingOut', // comingOut, bounceOutDown, bounceOutUp, fadeOutDown, fadeOutUp, , fadeOutLeft, fadeOutRight, flipOutX
	    transitionInOverlay: 'fadeIn',
	    transitionOutOverlay: 'fadeOut',
	    onFullscreen: function(){},
	    onResize: function(){},
        onOpening: function(){},
        onOpened: function(){},
        onClosing: function(){},
        onClosed: function(){},
        afterRender: function(){}
	};

	$.fn[PLUGIN_NAME].Constructor = iziModal;

    return $.fn.iziModal;

}));

/*!
* Parsley.js
* Version 2.8.1 - built Sat, Feb 3rd 2018, 2:27 pm
* http://parsleyjs.org
* Guillaume Potier - <guillaume@wisembly.com>
* Marc-Andre Lafortune - <petroselinum@marc-andre.ca>
* MIT Licensed
*/
function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}var _slice=Array.prototype.slice,_slicedToArray=function(){function e(e,t){var i=[],n=!0,r=!1,s=void 0;try{for(var a,o=e[Symbol.iterator]();!(n=(a=o.next()).done)&&(i.push(a.value),!t||i.length!==t);n=!0);}catch(l){r=!0,s=l}finally{try{!n&&o["return"]&&o["return"]()}finally{if(r)throw s}}return i}return function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e};!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):e.parsley=t(e.jQuery)}(this,function(e){"use strict";function t(e,t){return e.parsleyAdaptedCallback||(e.parsleyAdaptedCallback=function(){var i=Array.prototype.slice.call(arguments,0);i.unshift(this),e.apply(t||M,i)}),e.parsleyAdaptedCallback}function i(e){return 0===e.lastIndexOf(D,0)?e.substr(D.length):e}/**
   * inputevent - Alleviate browser bugs for input events
   * https://github.com/marcandre/inputevent
   * @version v0.0.3 - (built Thu, Apr 14th 2016, 5:58 pm)
   * @author Marc-Andre Lafortune <github@marc-andre.ca>
   * @license MIT
   */
function n(){var t=this,i=window||global;_extends(this,{isNativeEvent:function(e){return e.originalEvent&&e.originalEvent.isTrusted!==!1},fakeInputEvent:function(i){t.isNativeEvent(i)&&e(i.target).trigger("input")},misbehaves:function(i){t.isNativeEvent(i)&&(t.behavesOk(i),e(document).on("change.inputevent",i.data.selector,t.fakeInputEvent),t.fakeInputEvent(i))},behavesOk:function(i){t.isNativeEvent(i)&&e(document).off("input.inputevent",i.data.selector,t.behavesOk).off("change.inputevent",i.data.selector,t.misbehaves)},install:function(){if(!i.inputEventPatched){i.inputEventPatched="0.0.3";for(var n=["select",'input[type="checkbox"]','input[type="radio"]','input[type="file"]'],r=0;r<n.length;r++){var s=n[r];e(document).on("input.inputevent",s,{selector:s},t.behavesOk).on("change.inputevent",s,{selector:s},t.misbehaves)}}},uninstall:function(){delete i.inputEventPatched,e(document).off(".inputevent")}})}var r=1,s={},a={attr:function(e,t,i){var n,r,s,a=new RegExp("^"+t,"i");if("undefined"==typeof i)i={};else for(n in i)i.hasOwnProperty(n)&&delete i[n];if(!e)return i;for(s=e.attributes,n=s.length;n--;)r=s[n],r&&r.specified&&a.test(r.name)&&(i[this.camelize(r.name.slice(t.length))]=this.deserializeValue(r.value));return i},checkAttr:function(e,t,i){return e.hasAttribute(t+i)},setAttr:function(e,t,i,n){e.setAttribute(this.dasherize(t+i),String(n))},getType:function(e){return e.getAttribute("type")||"text"},generateID:function(){return""+r++},deserializeValue:function(e){var t;try{return e?"true"==e||"false"!=e&&("null"==e?null:isNaN(t=Number(e))?/^[\[\{]/.test(e)?JSON.parse(e):e:t):e}catch(i){return e}},camelize:function(e){return e.replace(/-+(.)?/g,function(e,t){return t?t.toUpperCase():""})},dasherize:function(e){return e.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()},warn:function(){var e;window.console&&"function"==typeof window.console.warn&&(e=window.console).warn.apply(e,arguments)},warnOnce:function(e){s[e]||(s[e]=!0,this.warn.apply(this,arguments))},_resetWarnings:function(){s={}},trimString:function(e){return e.replace(/^\s+|\s+$/g,"")},parse:{date:function S(e){var t=e.match(/^(\d{4,})-(\d\d)-(\d\d)$/);if(!t)return null;var i=t.map(function(e){return parseInt(e,10)}),n=_slicedToArray(i,4),r=(n[0],n[1]),s=n[2],a=n[3],S=new Date(r,s-1,a);return S.getFullYear()!==r||S.getMonth()+1!==s||S.getDate()!==a?null:S},string:function(e){return e},integer:function(e){return isNaN(e)?null:parseInt(e,10)},number:function(e){if(isNaN(e))throw null;return parseFloat(e)},"boolean":function(e){return!/^\s*false\s*$/i.test(e)},object:function(e){return a.deserializeValue(e)},regexp:function(e){var t="";return/^\/.*\/(?:[gimy]*)$/.test(e)?(t=e.replace(/.*\/([gimy]*)$/,"$1"),e=e.replace(new RegExp("^/(.*?)/"+t+"$"),"$1")):e="^"+e+"$",new RegExp(e,t)}},parseRequirement:function(e,t){var i=this.parse[e||"string"];if(!i)throw'Unknown requirement specification: "'+e+'"';var n=i(t);if(null===n)throw"Requirement is not a "+e+': "'+t+'"';return n},namespaceEvents:function(t,i){return t=this.trimString(t||"").split(/\s+/),t[0]?e.map(t,function(e){return e+"."+i}).join(" "):""},difference:function(t,i){var n=[];return e.each(t,function(e,t){i.indexOf(t)==-1&&n.push(t)}),n},all:function(t){return e.when.apply(e,_toConsumableArray(t).concat([42,42]))},objectCreate:Object.create||function(){var e=function(){};return function(t){if(arguments.length>1)throw Error("Second argument not supported");if("object"!=typeof t)throw TypeError("Argument must be an object");e.prototype=t;var i=new e;return e.prototype=null,i}}(),_SubmitSelector:'input[type="submit"], button:submit'},o={namespace:"data-parsley-",inputs:"input, textarea, select",excluded:"input[type=button], input[type=submit], input[type=reset], input[type=hidden]",priorityEnabled:!0,multiple:null,group:null,uiEnabled:!0,validationThreshold:3,focus:"first",trigger:!1,triggerAfterFailure:"input",errorClass:"parsley-error",successClass:"parsley-success",classHandler:function(e){},errorsContainer:function(e){},errorsWrapper:'<ul class="parsley-errors-list"></ul>',errorTemplate:"<li></li>"},l=function(){this.__id__=a.generateID()};l.prototype={asyncSupport:!0,_pipeAccordingToValidationResult:function(){var t=this,i=function(){var i=e.Deferred();return!0!==t.validationResult&&i.reject(),i.resolve().promise()};return[i,i]},actualizeOptions:function(){return a.attr(this.element,this.options.namespace,this.domOptions),this.parent&&this.parent.actualizeOptions&&this.parent.actualizeOptions(),this},_resetOptions:function(e){this.domOptions=a.objectCreate(this.parent.options),this.options=a.objectCreate(this.domOptions);for(var t in e)e.hasOwnProperty(t)&&(this.options[t]=e[t]);this.actualizeOptions()},_listeners:null,on:function(e,t){this._listeners=this._listeners||{};var i=this._listeners[e]=this._listeners[e]||[];return i.push(t),this},subscribe:function(t,i){e.listenTo(this,t.toLowerCase(),i)},off:function(e,t){var i=this._listeners&&this._listeners[e];if(i)if(t)for(var n=i.length;n--;)i[n]===t&&i.splice(n,1);else delete this._listeners[e];return this},unsubscribe:function(t,i){e.unsubscribeTo(this,t.toLowerCase())},trigger:function(e,t,i){t=t||this;var n,r=this._listeners&&this._listeners[e];if(r)for(var s=r.length;s--;)if(n=r[s].call(t,t,i),n===!1)return n;return!this.parent||this.parent.trigger(e,t,i)},asyncIsValid:function(e,t){return a.warnOnce("asyncIsValid is deprecated; please use whenValid instead"),this.whenValid({group:e,force:t})},_findRelated:function(){return this.options.multiple?e(this.parent.element.querySelectorAll("["+this.options.namespace+'multiple="'+this.options.multiple+'"]')):this.$element}};var u=function(e,t){var i=e.match(/^\s*\[(.*)\]\s*$/);if(!i)throw'Requirement is not an array: "'+e+'"';var n=i[1].split(",").map(a.trimString);if(n.length!==t)throw"Requirement has "+n.length+" values when "+t+" are needed";return n},d=function(e,t,i){var n=null,r={};for(var s in e)if(s){var o=i(s);"string"==typeof o&&(o=a.parseRequirement(e[s],o)),r[s]=o}else n=a.parseRequirement(e[s],t);return[n,r]},h=function(t){e.extend(!0,this,t)};h.prototype={validate:function(e,t){if(this.fn)return arguments.length>3&&(t=[].slice.call(arguments,1,-1)),this.fn(e,t);if(Array.isArray(e)){if(!this.validateMultiple)throw"Validator `"+this.name+"` does not handle multiple values";return this.validateMultiple.apply(this,arguments)}var i=arguments[arguments.length-1];if(this.validateDate&&i._isDateInput())return arguments[0]=a.parse.date(arguments[0]),null!==arguments[0]&&this.validateDate.apply(this,arguments);if(this.validateNumber)return!isNaN(e)&&(arguments[0]=parseFloat(arguments[0]),this.validateNumber.apply(this,arguments));if(this.validateString)return this.validateString.apply(this,arguments);throw"Validator `"+this.name+"` only handles multiple values"},parseRequirements:function(t,i){if("string"!=typeof t)return Array.isArray(t)?t:[t];var n=this.requirementType;if(Array.isArray(n)){for(var r=u(t,n.length),s=0;s<r.length;s++)r[s]=a.parseRequirement(n[s],r[s]);return r}return e.isPlainObject(n)?d(n,t,i):[a.parseRequirement(n,t)]},requirementType:"string",priority:2};var p=function(e,t){this.__class__="ValidatorRegistry",this.locale="en",this.init(e||{},t||{})},c={email:/^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/,number:/^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,integer:/^-?\d+$/,digits:/^\d+$/,alphanum:/^\w+$/i,date:{test:function(e){return null!==a.parse.date(e)}},url:new RegExp("^(?:(?:https?|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-zA-Z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$")};c.range=c.number;var f=function(e){var t=(""+e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return t?Math.max(0,(t[1]?t[1].length:0)-(t[2]?+t[2]:0)):0},m=function(e,t){return t.map(a.parse[e])},g=function(e,t){return function(i){for(var n=arguments.length,r=Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return r.pop(),t.apply(void 0,[i].concat(_toConsumableArray(m(e,r))))}},v=function(e){return{validateDate:g("date",e),validateNumber:g("number",e),requirementType:e.length<=2?"string":["string","string"],priority:30}};p.prototype={init:function(e,t){this.catalog=t,this.validators=_extends({},this.validators);for(var i in e)this.addValidator(i,e[i].fn,e[i].priority);window.Parsley.trigger("parsley:validator:init")},setLocale:function(e){if("undefined"==typeof this.catalog[e])throw new Error(e+" is not available in the catalog");return this.locale=e,this},addCatalog:function(e,t,i){return"object"==typeof t&&(this.catalog[e]=t),!0===i?this.setLocale(e):this},addMessage:function(e,t,i){return"undefined"==typeof this.catalog[e]&&(this.catalog[e]={}),this.catalog[e][t]=i,this},addMessages:function(e,t){for(var i in t)this.addMessage(e,i,t[i]);return this},addValidator:function(e,t,i){if(this.validators[e])a.warn('Validator "'+e+'" is already defined.');else if(o.hasOwnProperty(e))return void a.warn('"'+e+'" is a restricted keyword and is not a valid validator name.');return this._setValidator.apply(this,arguments)},hasValidator:function(e){return!!this.validators[e]},updateValidator:function(e,t,i){return this.validators[e]?this._setValidator.apply(this,arguments):(a.warn('Validator "'+e+'" is not already defined.'),this.addValidator.apply(this,arguments))},removeValidator:function(e){return this.validators[e]||a.warn('Validator "'+e+'" is not defined.'),delete this.validators[e],this},_setValidator:function(e,t,i){"object"!=typeof t&&(t={fn:t,priority:i}),t.validate||(t=new h(t)),this.validators[e]=t;for(var n in t.messages||{})this.addMessage(n,e,t.messages[n]);return this},getErrorMessage:function(e){var t;if("type"===e.name){var i=this.catalog[this.locale][e.name]||{};t=i[e.requirements]}else t=this.formatMessage(this.catalog[this.locale][e.name],e.requirements);return t||this.catalog[this.locale].defaultMessage||this.catalog.en.defaultMessage},formatMessage:function(e,t){if("object"==typeof t){for(var i in t)e=this.formatMessage(e,t[i]);return e}return"string"==typeof e?e.replace(/%s/i,t):""},validators:{notblank:{validateString:function(e){return/\S/.test(e)},priority:2},required:{validateMultiple:function(e){return e.length>0},validateString:function(e){return/\S/.test(e)},priority:512},type:{validateString:function(e,t){var i=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],n=i.step,r=void 0===n?"any":n,s=i.base,a=void 0===s?0:s,o=c[t];if(!o)throw new Error("validator type `"+t+"` is not supported");if(!o.test(e))return!1;if("number"===t&&!/^any$/i.test(r||"")){var l=Number(e),u=Math.max(f(r),f(a));if(f(l)>u)return!1;var d=function(e){return Math.round(e*Math.pow(10,u))};if((d(l)-d(a))%d(r)!=0)return!1}return!0},requirementType:{"":"string",step:"string",base:"number"},priority:256},pattern:{validateString:function(e,t){return t.test(e)},requirementType:"regexp",priority:64},minlength:{validateString:function(e,t){return e.length>=t},requirementType:"integer",priority:30},maxlength:{validateString:function(e,t){return e.length<=t},requirementType:"integer",priority:30},length:{validateString:function(e,t,i){return e.length>=t&&e.length<=i},requirementType:["integer","integer"],priority:30},mincheck:{validateMultiple:function(e,t){return e.length>=t},requirementType:"integer",priority:30},maxcheck:{validateMultiple:function(e,t){return e.length<=t},requirementType:"integer",priority:30},check:{validateMultiple:function(e,t,i){return e.length>=t&&e.length<=i},requirementType:["integer","integer"],priority:30},min:v(function(e,t){return e>=t}),max:v(function(e,t){return e<=t}),range:v(function(e,t,i){return e>=t&&e<=i}),equalto:{validateString:function(t,i){var n=e(i);return n.length?t===n.val():t===i},priority:256}}};var y={},_=function k(e,t,i){for(var n=[],r=[],s=0;s<e.length;s++){for(var a=!1,o=0;o<t.length;o++)if(e[s].assert.name===t[o].assert.name){a=!0;break}a?r.push(e[s]):n.push(e[s])}return{kept:r,added:n,removed:i?[]:k(t,e,!0).added}};y.Form={_actualizeTriggers:function(){var e=this;this.$element.on("submit.Parsley",function(t){e.onSubmitValidate(t)}),this.$element.on("click.Parsley",a._SubmitSelector,function(t){e.onSubmitButton(t)}),!1!==this.options.uiEnabled&&this.element.setAttribute("novalidate","")},focus:function(){if(this._focusedField=null,!0===this.validationResult||"none"===this.options.focus)return null;for(var e=0;e<this.fields.length;e++){var t=this.fields[e];if(!0!==t.validationResult&&t.validationResult.length>0&&"undefined"==typeof t.options.noFocus&&(this._focusedField=t.$element,"first"===this.options.focus))break}return null===this._focusedField?null:this._focusedField.focus()},_destroyUI:function(){this.$element.off(".Parsley")}},y.Field={_reflowUI:function(){if(this._buildUI(),this._ui){var e=_(this.validationResult,this._ui.lastValidationResult);this._ui.lastValidationResult=this.validationResult,this._manageStatusClass(),this._manageErrorsMessages(e),this._actualizeTriggers(),!e.kept.length&&!e.added.length||this._failedOnce||(this._failedOnce=!0,this._actualizeTriggers())}},getErrorsMessages:function(){if(!0===this.validationResult)return[];for(var e=[],t=0;t<this.validationResult.length;t++)e.push(this.validationResult[t].errorMessage||this._getErrorMessage(this.validationResult[t].assert));return e},addError:function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=t.message,n=t.assert,r=t.updateClass,s=void 0===r||r;this._buildUI(),this._addError(e,{message:i,assert:n}),s&&this._errorClass()},updateError:function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=t.message,n=t.assert,r=t.updateClass,s=void 0===r||r;this._buildUI(),this._updateError(e,{message:i,assert:n}),s&&this._errorClass()},removeError:function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=t.updateClass,n=void 0===i||i;this._buildUI(),this._removeError(e),n&&this._manageStatusClass()},_manageStatusClass:function(){this.hasConstraints()&&this.needsValidation()&&!0===this.validationResult?this._successClass():this.validationResult.length>0?this._errorClass():this._resetClass()},_manageErrorsMessages:function(t){if("undefined"==typeof this.options.errorsMessagesDisabled){if("undefined"!=typeof this.options.errorMessage)return t.added.length||t.kept.length?(this._insertErrorWrapper(),0===this._ui.$errorsWrapper.find(".parsley-custom-error-message").length&&this._ui.$errorsWrapper.append(e(this.options.errorTemplate).addClass("parsley-custom-error-message")),this._ui.$errorsWrapper.addClass("filled").find(".parsley-custom-error-message").html(this.options.errorMessage)):this._ui.$errorsWrapper.removeClass("filled").find(".parsley-custom-error-message").remove();for(var i=0;i<t.removed.length;i++)this._removeError(t.removed[i].assert.name);for(i=0;i<t.added.length;i++)this._addError(t.added[i].assert.name,{message:t.added[i].errorMessage,assert:t.added[i].assert});for(i=0;i<t.kept.length;i++)this._updateError(t.kept[i].assert.name,{message:t.kept[i].errorMessage,assert:t.kept[i].assert})}},_addError:function(t,i){var n=i.message,r=i.assert;this._insertErrorWrapper(),this._ui.$errorClassHandler.attr("aria-describedby",this._ui.errorsWrapperId),this._ui.$errorsWrapper.addClass("filled").append(e(this.options.errorTemplate).addClass("parsley-"+t).html(n||this._getErrorMessage(r)))},_updateError:function(e,t){var i=t.message,n=t.assert;this._ui.$errorsWrapper.addClass("filled").find(".parsley-"+e).html(i||this._getErrorMessage(n))},_removeError:function(e){this._ui.$errorClassHandler.removeAttr("aria-describedby"),this._ui.$errorsWrapper.removeClass("filled").find(".parsley-"+e).remove()},_getErrorMessage:function(e){var t=e.name+"Message";return"undefined"!=typeof this.options[t]?window.Parsley.formatMessage(this.options[t],e.requirements):window.Parsley.getErrorMessage(e)},_buildUI:function(){if(!this._ui&&!1!==this.options.uiEnabled){var t={};this.element.setAttribute(this.options.namespace+"id",this.__id__),t.$errorClassHandler=this._manageClassHandler(),t.errorsWrapperId="parsley-id-"+(this.options.multiple?"multiple-"+this.options.multiple:this.__id__),t.$errorsWrapper=e(this.options.errorsWrapper).attr("id",t.errorsWrapperId),t.lastValidationResult=[],t.validationInformationVisible=!1,this._ui=t}},_manageClassHandler:function(){if("string"==typeof this.options.classHandler&&e(this.options.classHandler).length)return e(this.options.classHandler);var t=this.options.classHandler;if("string"==typeof this.options.classHandler&&"function"==typeof window[this.options.classHandler]&&(t=window[this.options.classHandler]),"function"==typeof t){var i=t.call(this,this);if("undefined"!=typeof i&&i.length)return i}else{if("object"==typeof t&&t instanceof jQuery&&t.length)return t;t&&a.warn("The class handler `"+t+"` does not exist in DOM nor as a global JS function")}return this._inputHolder()},_inputHolder:function(){return this.options.multiple&&"SELECT"!==this.element.nodeName?this.$element.parent():this.$element},_insertErrorWrapper:function(){var t=this.options.errorsContainer;if(0!==this._ui.$errorsWrapper.parent().length)return this._ui.$errorsWrapper.parent();if("string"==typeof t){if(e(t).length)return e(t).append(this._ui.$errorsWrapper);"function"==typeof window[t]?t=window[t]:a.warn("The errors container `"+t+"` does not exist in DOM nor as a global JS function")}return"function"==typeof t&&(t=t.call(this,this)),"object"==typeof t&&t.length?t.append(this._ui.$errorsWrapper):this._inputHolder().after(this._ui.$errorsWrapper)},_actualizeTriggers:function(){var e,t=this,i=this._findRelated();i.off(".Parsley"),this._failedOnce?i.on(a.namespaceEvents(this.options.triggerAfterFailure,"Parsley"),function(){t._validateIfNeeded()}):(e=a.namespaceEvents(this.options.trigger,"Parsley"))&&i.on(e,function(e){t._validateIfNeeded(e)})},_validateIfNeeded:function(e){var t=this;e&&/key|input/.test(e.type)&&(!this._ui||!this._ui.validationInformationVisible)&&this.getValue().length<=this.options.validationThreshold||(this.options.debounce?(window.clearTimeout(this._debounced),this._debounced=window.setTimeout(function(){return t.validate()},this.options.debounce)):this.validate())},_resetUI:function(){this._failedOnce=!1,this._actualizeTriggers(),"undefined"!=typeof this._ui&&(this._ui.$errorsWrapper.removeClass("filled").children().remove(),this._resetClass(),this._ui.lastValidationResult=[],this._ui.validationInformationVisible=!1)},_destroyUI:function(){this._resetUI(),"undefined"!=typeof this._ui&&this._ui.$errorsWrapper.remove(),delete this._ui},_successClass:function(){this._ui.validationInformationVisible=!0,this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass)},_errorClass:function(){this._ui.validationInformationVisible=!0,this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass)},_resetClass:function(){this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass)}};var w=function(t,i,n){this.__class__="Form",this.element=t,this.$element=e(t),this.domOptions=i,this.options=n,this.parent=window.Parsley,this.fields=[],this.validationResult=null},b={pending:null,resolved:!0,rejected:!1};w.prototype={onSubmitValidate:function(e){var t=this;if(!0!==e.parsley){var i=this._submitSource||this.$element.find(a._SubmitSelector)[0];if(this._submitSource=null,this.$element.find(".parsley-synthetic-submit-button").prop("disabled",!0),!i||null===i.getAttribute("formnovalidate")){window.Parsley._remoteCache={};var n=this.whenValidate({event:e});"resolved"===n.state()&&!1!==this._trigger("submit")||(e.stopImmediatePropagation(),e.preventDefault(),"pending"===n.state()&&n.done(function(){t._submit(i)}))}}},onSubmitButton:function(e){this._submitSource=e.currentTarget},_submit:function(t){if(!1!==this._trigger("submit")){if(t){var i=this.$element.find(".parsley-synthetic-submit-button").prop("disabled",!1);0===i.length&&(i=e('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element)),i.attr({name:t.getAttribute("name"),value:t.getAttribute("value")})}this.$element.trigger(_extends(e.Event("submit"),{parsley:!0}))}},validate:function(t){if(arguments.length>=1&&!e.isPlainObject(t)){a.warnOnce("Calling validate on a parsley form without passing arguments as an object is deprecated.");var i=_slice.call(arguments),n=i[0],r=i[1],s=i[2];t={group:n,force:r,event:s}}return b[this.whenValidate(t).state()]},whenValidate:function(){var t,i=this,n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=n.group,s=n.force,o=n.event;this.submitEvent=o,o&&(this.submitEvent=_extends({},o,{preventDefault:function(){a.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`"),i.validationResult=!1}})),this.validationResult=!0,this._trigger("validate"),this._refreshFields();var l=this._withoutReactualizingFormOptions(function(){return e.map(i.fields,function(e){return e.whenValidate({force:s,group:r})})});return(t=a.all(l).done(function(){i._trigger("success")}).fail(function(){i.validationResult=!1,i.focus(),i._trigger("error")}).always(function(){i._trigger("validated")})).pipe.apply(t,_toConsumableArray(this._pipeAccordingToValidationResult()))},isValid:function(t){if(arguments.length>=1&&!e.isPlainObject(t)){a.warnOnce("Calling isValid on a parsley form without passing arguments as an object is deprecated.");var i=_slice.call(arguments),n=i[0],r=i[1];t={group:n,force:r}}return b[this.whenValid(t).state()]},whenValid:function(){var t=this,i=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=i.group,r=i.force;this._refreshFields();var s=this._withoutReactualizingFormOptions(function(){return e.map(t.fields,function(e){return e.whenValid({group:n,force:r})})});return a.all(s)},refresh:function(){return this._refreshFields(),this},reset:function(){for(var e=0;e<this.fields.length;e++)this.fields[e].reset();this._trigger("reset")},destroy:function(){this._destroyUI();for(var e=0;e<this.fields.length;e++)this.fields[e].destroy();this.$element.removeData("Parsley"),this._trigger("destroy")},_refreshFields:function(){return this.actualizeOptions()._bindFields()},_bindFields:function(){var t=this,i=this.fields;return this.fields=[],this.fieldsMappedById={},this._withoutReactualizingFormOptions(function(){t.$element.find(t.options.inputs).not(t.options.excluded).each(function(e,i){var n=new window.Parsley.Factory(i,{},t);if(("Field"===n.__class__||"FieldMultiple"===n.__class__)&&!0!==n.options.excluded){var r=n.__class__+"-"+n.__id__;"undefined"==typeof t.fieldsMappedById[r]&&(t.fieldsMappedById[r]=n,t.fields.push(n))}}),e.each(a.difference(i,t.fields),function(e,t){t.reset()})}),this},_withoutReactualizingFormOptions:function(e){var t=this.actualizeOptions;this.actualizeOptions=function(){return this};var i=e();return this.actualizeOptions=t,i},_trigger:function(e){return this.trigger("form:"+e)}};var F=function(e,t,i,n,r){var s=window.Parsley._validatorRegistry.validators[t],a=new h(s);n=n||e.options[t+"Priority"]||a.priority,r=!0===r,_extends(this,{validator:a,name:t,requirements:i,priority:n,isDomConstraint:r}),this._parseRequirements(e.options)},C=function(e){var t=e[0].toUpperCase();return t+e.slice(1)};F.prototype={validate:function(e,t){var i;return(i=this.validator).validate.apply(i,[e].concat(_toConsumableArray(this.requirementList),[t]))},_parseRequirements:function(e){var t=this;this.requirementList=this.validator.parseRequirements(this.requirements,function(i){return e[t.name+C(i)]})}};var A=function(t,i,n,r){this.__class__="Field",this.element=t,this.$element=e(t),"undefined"!=typeof r&&(this.parent=r),this.options=n,this.domOptions=i,this.constraints=[],this.constraintsByName={},this.validationResult=!0,this._bindConstraints()},E={pending:null,resolved:!0,rejected:!1};A.prototype={validate:function(t){arguments.length>=1&&!e.isPlainObject(t)&&(a.warnOnce("Calling validate on a parsley field without passing arguments as an object is deprecated."),t={options:t});var i=this.whenValidate(t);if(!i)return!0;switch(i.state()){case"pending":return null;case"resolved":return!0;case"rejected":return this.validationResult}},whenValidate:function(){var e,t=this,i=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=i.force,r=i.group;if(this.refresh(),!r||this._isInGroup(r))return this.value=this.getValue(),this._trigger("validate"),(e=this.whenValid({force:n,value:this.value,_refreshed:!0}).always(function(){t._reflowUI()}).done(function(){t._trigger("success")}).fail(function(){t._trigger("error")}).always(function(){t._trigger("validated")})).pipe.apply(e,_toConsumableArray(this._pipeAccordingToValidationResult()))},hasConstraints:function(){return 0!==this.constraints.length},needsValidation:function(e){return"undefined"==typeof e&&(e=this.getValue()),!(!e.length&&!this._isRequired()&&"undefined"==typeof this.options.validateIfEmpty)},_isInGroup:function(t){return Array.isArray(this.options.group)?-1!==e.inArray(t,this.options.group):this.options.group===t},isValid:function(t){if(arguments.length>=1&&!e.isPlainObject(t)){a.warnOnce("Calling isValid on a parsley field without passing arguments as an object is deprecated.");var i=_slice.call(arguments),n=i[0],r=i[1];t={force:n,value:r}}var s=this.whenValid(t);return!s||E[s.state()]},whenValid:function(){var t=this,i=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=i.force,r=void 0!==n&&n,s=i.value,o=i.group,l=i._refreshed;if(l||this.refresh(),!o||this._isInGroup(o)){if(this.validationResult=!0,!this.hasConstraints())return e.when();if("undefined"!=typeof s&&null!==s||(s=this.getValue()),!this.needsValidation(s)&&!0!==r)return e.when();var u=this._getGroupedConstraints(),d=[];return e.each(u,function(i,n){var r=a.all(e.map(n,function(e){return t._validateConstraint(s,e)}));if(d.push(r),"rejected"===r.state())return!1}),a.all(d)}},_validateConstraint:function(t,i){var n=this,r=i.validate(t,this);return!1===r&&(r=e.Deferred().reject()),a.all([r]).fail(function(e){n.validationResult instanceof Array||(n.validationResult=[]),n.validationResult.push({assert:i,errorMessage:"string"==typeof e&&e})})},getValue:function(){var e;return e="function"==typeof this.options.value?this.options.value(this):"undefined"!=typeof this.options.value?this.options.value:this.$element.val(),"undefined"==typeof e||null===e?"":this._handleWhitespace(e)},reset:function(){return this._resetUI(),this._trigger("reset")},destroy:function(){this._destroyUI(),this.$element.removeData("Parsley"),this.$element.removeData("FieldMultiple"),this._trigger("destroy")},refresh:function(){return this._refreshConstraints(),this},_refreshConstraints:function(){return this.actualizeOptions()._bindConstraints()},refreshConstraints:function(){return a.warnOnce("Parsley's refreshConstraints is deprecated. Please use refresh"),this.refresh()},addConstraint:function(e,t,i,n){if(window.Parsley._validatorRegistry.validators[e]){var r=new F(this,e,t,i,n);"undefined"!==this.constraintsByName[r.name]&&this.removeConstraint(r.name),this.constraints.push(r),this.constraintsByName[r.name]=r}return this},removeConstraint:function(e){for(var t=0;t<this.constraints.length;t++)if(e===this.constraints[t].name){this.constraints.splice(t,1);break}return delete this.constraintsByName[e],this},updateConstraint:function(e,t,i){return this.removeConstraint(e).addConstraint(e,t,i)},_bindConstraints:function(){for(var e=[],t={},i=0;i<this.constraints.length;i++)!1===this.constraints[i].isDomConstraint&&(e.push(this.constraints[i]),t[this.constraints[i].name]=this.constraints[i]);this.constraints=e,this.constraintsByName=t;for(var n in this.options)this.addConstraint(n,this.options[n],void 0,!0);return this._bindHtml5Constraints()},_bindHtml5Constraints:function(){null!==this.element.getAttribute("required")&&this.addConstraint("required",!0,void 0,!0),null!==this.element.getAttribute("pattern")&&this.addConstraint("pattern",this.element.getAttribute("pattern"),void 0,!0);var e=this.element.getAttribute("min"),t=this.element.getAttribute("max");null!==e&&null!==t?this.addConstraint("range",[e,t],void 0,!0):null!==e?this.addConstraint("min",e,void 0,!0):null!==t&&this.addConstraint("max",t,void 0,!0),null!==this.element.getAttribute("minlength")&&null!==this.element.getAttribute("maxlength")?this.addConstraint("length",[this.element.getAttribute("minlength"),this.element.getAttribute("maxlength")],void 0,!0):null!==this.element.getAttribute("minlength")?this.addConstraint("minlength",this.element.getAttribute("minlength"),void 0,!0):null!==this.element.getAttribute("maxlength")&&this.addConstraint("maxlength",this.element.getAttribute("maxlength"),void 0,!0);var i=a.getType(this.element);return"number"===i?this.addConstraint("type",["number",{step:this.element.getAttribute("step")||"1",base:e||this.element.getAttribute("value")}],void 0,!0):/^(email|url|range|date)$/i.test(i)?this.addConstraint("type",i,void 0,!0):this},_isRequired:function(){return"undefined"!=typeof this.constraintsByName.required&&!1!==this.constraintsByName.required.requirements},_trigger:function(e){return this.trigger("field:"+e)},_handleWhitespace:function(e){return!0===this.options.trimValue&&a.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"'),"squish"===this.options.whitespace&&(e=e.replace(/\s{2,}/g," ")),"trim"!==this.options.whitespace&&"squish"!==this.options.whitespace&&!0!==this.options.trimValue||(e=a.trimString(e)),e},_isDateInput:function(){var e=this.constraintsByName.type;return e&&"date"===e.requirements},_getGroupedConstraints:function(){if(!1===this.options.priorityEnabled)return[this.constraints];for(var e=[],t={},i=0;i<this.constraints.length;i++){var n=this.constraints[i].priority;t[n]||e.push(t[n]=[]),t[n].push(this.constraints[i])}return e.sort(function(e,t){return t[0].priority-e[0].priority}),e}};var x=A,$=function(){this.__class__="FieldMultiple"};$.prototype={addElement:function(e){return this.$elements.push(e),this},_refreshConstraints:function(){var t;if(this.constraints=[],"SELECT"===this.element.nodeName)return this.actualizeOptions()._bindConstraints(),this;for(var i=0;i<this.$elements.length;i++)if(e("html").has(this.$elements[i]).length){t=this.$elements[i].data("FieldMultiple")._refreshConstraints().constraints;for(var n=0;n<t.length;n++)this.addConstraint(t[n].name,t[n].requirements,t[n].priority,t[n].isDomConstraint)}else this.$elements.splice(i,1);return this},getValue:function(){if("function"==typeof this.options.value)return this.options.value(this);if("undefined"!=typeof this.options.value)return this.options.value;if("INPUT"===this.element.nodeName){var t=a.getType(this.element);if("radio"===t)return this._findRelated().filter(":checked").val()||"";if("checkbox"===t){
var i=[];return this._findRelated().filter(":checked").each(function(){i.push(e(this).val())}),i}}return"SELECT"===this.element.nodeName&&null===this.$element.val()?[]:this.$element.val()},_init:function(){return this.$elements=[this.$element],this}};var P=function(t,i,n){this.element=t,this.$element=e(t);var r=this.$element.data("Parsley");if(r)return"undefined"!=typeof n&&r.parent===window.Parsley&&(r.parent=n,r._resetOptions(r.options)),"object"==typeof i&&_extends(r.options,i),r;if(!this.$element.length)throw new Error("You must bind Parsley on an existing element.");if("undefined"!=typeof n&&"Form"!==n.__class__)throw new Error("Parent instance must be a Form instance");return this.parent=n||window.Parsley,this.init(i)};P.prototype={init:function(e){return this.__class__="Parsley",this.__version__="2.8.1",this.__id__=a.generateID(),this._resetOptions(e),"FORM"===this.element.nodeName||a.checkAttr(this.element,this.options.namespace,"validate")&&!this.$element.is(this.options.inputs)?this.bind("parsleyForm"):this.isMultiple()?this.handleMultiple():this.bind("parsleyField")},isMultiple:function(){var e=a.getType(this.element);return"radio"===e||"checkbox"===e||"SELECT"===this.element.nodeName&&null!==this.element.getAttribute("multiple")},handleMultiple:function(){var t,i,n=this;if(this.options.multiple=this.options.multiple||(t=this.element.getAttribute("name"))||this.element.getAttribute("id"),"SELECT"===this.element.nodeName&&null!==this.element.getAttribute("multiple"))return this.options.multiple=this.options.multiple||this.__id__,this.bind("parsleyFieldMultiple");if(!this.options.multiple)return a.warn("To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.",this.$element),this;this.options.multiple=this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g,""),t&&e('input[name="'+t+'"]').each(function(e,t){var i=a.getType(t);"radio"!==i&&"checkbox"!==i||t.setAttribute(n.options.namespace+"multiple",n.options.multiple)});for(var r=this._findRelated(),s=0;s<r.length;s++)if(i=e(r.get(s)).data("Parsley"),"undefined"!=typeof i){this.$element.data("FieldMultiple")||i.addElement(this.$element);break}return this.bind("parsleyField",!0),i||this.bind("parsleyFieldMultiple")},bind:function(t,i){var n;switch(t){case"parsleyForm":n=e.extend(new w(this.element,this.domOptions,this.options),new l,window.ParsleyExtend)._bindFields();break;case"parsleyField":n=e.extend(new x(this.element,this.domOptions,this.options,this.parent),new l,window.ParsleyExtend);break;case"parsleyFieldMultiple":n=e.extend(new x(this.element,this.domOptions,this.options,this.parent),new $,new l,window.ParsleyExtend)._init();break;default:throw new Error(t+"is not a supported Parsley type")}return this.options.multiple&&a.setAttr(this.element,this.options.namespace,"multiple",this.options.multiple),"undefined"!=typeof i?(this.$element.data("FieldMultiple",n),n):(this.$element.data("Parsley",n),n._actualizeTriggers(),n._trigger("init"),n)}};var V=e.fn.jquery.split(".");if(parseInt(V[0])<=1&&parseInt(V[1])<8)throw"The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";V.forEach||a.warn("Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim");var T=_extends(new l,{element:document,$element:e(document),actualizeOptions:null,_resetOptions:null,Factory:P,version:"2.8.1"});_extends(x.prototype,y.Field,l.prototype),_extends(w.prototype,y.Form,l.prototype),_extends(P.prototype,l.prototype),e.fn.parsley=e.fn.psly=function(t){if(this.length>1){var i=[];return this.each(function(){i.push(e(this).parsley(t))}),i}if(0!=this.length)return new P(this[0],t)},"undefined"==typeof window.ParsleyExtend&&(window.ParsleyExtend={}),T.options=_extends(a.objectCreate(o),window.ParsleyConfig),window.ParsleyConfig=T.options,window.Parsley=window.psly=T,T.Utils=a,window.ParsleyUtils={},e.each(a,function(e,t){"function"==typeof t&&(window.ParsleyUtils[e]=function(){return a.warnOnce("Accessing `window.ParsleyUtils` is deprecated. Use `window.Parsley.Utils` instead."),a[e].apply(a,arguments)})});var O=window.Parsley._validatorRegistry=new p(window.ParsleyConfig.validators,window.ParsleyConfig.i18n);window.ParsleyValidator={},e.each("setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator hasValidator".split(" "),function(e,t){window.Parsley[t]=function(){return O[t].apply(O,arguments)},window.ParsleyValidator[t]=function(){var e;return a.warnOnce("Accessing the method '"+t+"' through Validator is deprecated. Simply call 'window.Parsley."+t+"(...)'"),(e=window.Parsley)[t].apply(e,arguments)}}),window.Parsley.UI=y,window.ParsleyUI={removeError:function(e,t,i){var n=!0!==i;return a.warnOnce("Accessing UI is deprecated. Call 'removeError' on the instance directly. Please comment in issue 1073 as to your need to call this method."),e.removeError(t,{updateClass:n})},getErrorsMessages:function(e){return a.warnOnce("Accessing UI is deprecated. Call 'getErrorsMessages' on the instance directly."),e.getErrorsMessages()}},e.each("addError updateError".split(" "),function(e,t){window.ParsleyUI[t]=function(e,i,n,r,s){var o=!0!==s;return a.warnOnce("Accessing UI is deprecated. Call '"+t+"' on the instance directly. Please comment in issue 1073 as to your need to call this method."),e[t](i,{message:n,assert:r,updateClass:o})}}),!1!==window.ParsleyConfig.autoBind&&e(function(){e("[data-parsley-validate]").length&&e("[data-parsley-validate]").parsley()});var M=e({}),R=function(){a.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley")},D="parsley:";e.listen=function(e,n){var r;if(R(),"object"==typeof arguments[1]&&"function"==typeof arguments[2]&&(r=arguments[1],n=arguments[2]),"function"!=typeof n)throw new Error("Wrong parameters");window.Parsley.on(i(e),t(n,r))},e.listenTo=function(e,n,r){if(R(),!(e instanceof x||e instanceof w))throw new Error("Must give Parsley instance");if("string"!=typeof n||"function"!=typeof r)throw new Error("Wrong parameters");e.on(i(n),t(r))},e.unsubscribe=function(e,t){if(R(),"string"!=typeof e||"function"!=typeof t)throw new Error("Wrong arguments");window.Parsley.off(i(e),t.parsleyAdaptedCallback)},e.unsubscribeTo=function(e,t){if(R(),!(e instanceof x||e instanceof w))throw new Error("Must give Parsley instance");e.off(i(t))},e.unsubscribeAll=function(t){R(),window.Parsley.off(i(t)),e("form,input,textarea,select").each(function(){var n=e(this).data("Parsley");n&&n.off(i(t))})},e.emit=function(e,t){var n;R();var r=t instanceof x||t instanceof w,s=Array.prototype.slice.call(arguments,r?2:1);s.unshift(i(e)),r||(t=window.Parsley),(n=t).trigger.apply(n,_toConsumableArray(s))};e.extend(!0,T,{asyncValidators:{"default":{fn:function(e){return e.status>=200&&e.status<300},url:!1},reverse:{fn:function(e){return e.status<200||e.status>=300},url:!1}},addAsyncValidator:function(e,t,i,n){return T.asyncValidators[e]={fn:t,url:i||!1,options:n||{}},this}}),T.addValidator("remote",{requirementType:{"":"string",validator:"string",reverse:"boolean",options:"object"},validateString:function(t,i,n,r){var s,a,o={},l=n.validator||(!0===n.reverse?"reverse":"default");if("undefined"==typeof T.asyncValidators[l])throw new Error("Calling an undefined async validator: `"+l+"`");i=T.asyncValidators[l].url||i,i.indexOf("{value}")>-1?i=i.replace("{value}",encodeURIComponent(t)):o[r.element.getAttribute("name")||r.element.getAttribute("id")]=t;var u=e.extend(!0,n.options||{},T.asyncValidators[l].options);s=e.extend(!0,{},{url:i,data:o,type:"GET"},u),r.trigger("field:ajaxoptions",r,s),a=e.param(s),"undefined"==typeof T._remoteCache&&(T._remoteCache={});var d=T._remoteCache[a]=T._remoteCache[a]||e.ajax(s),h=function(){var t=T.asyncValidators[l].fn.call(r,d,i,n);return t||(t=e.Deferred().reject()),e.when(t)};return d.then(h,h)},priority:-1}),T.on("form:submit",function(){T._remoteCache={}}),l.prototype.addAsyncValidator=function(){return a.warnOnce("Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`"),T.addAsyncValidator.apply(T,arguments)},T.addMessages("en",{defaultMessage:"This value seems to be invalid.",type:{email:"This value should be a valid email.",url:"This value should be a valid url.",number:"This value should be a valid number.",integer:"This value should be a valid integer.",digits:"This value should be digits.",alphanum:"This value should be alphanumeric."},notblank:"This value should not be blank.",required:"This value is required.",pattern:"This value seems to be invalid.",min:"This value should be greater than or equal to %s.",max:"This value should be lower than or equal to %s.",range:"This value should be between %s and %s.",minlength:"This value is too short. It should have %s characters or more.",maxlength:"This value is too long. It should have %s characters or fewer.",length:"This value length is invalid. It should be between %s and %s characters long.",mincheck:"You must select at least %s choices.",maxcheck:"You must select %s choices or fewer.",check:"You must select between %s and %s choices.",equalto:"This value should be the same."}),T.setLocale("en");var I=new n;I.install();var q=T;return q});
//# sourceMappingURL=parsley.min.js.map

/*
 * Gritter for jQuery
 * http://www.boedesign.com/
 *
 * Copyright (c) 2012 Jordan Boesch
 * Dual licensed under the MIT and GPL licenses.
 *
 * Date: February 24, 2012
 * Version: 1.7.4
 */

(function($){
 	
	/**
	* Set it up as an object under the jQuery namespace
	*/
	$.gritter = {};
	
	/**
	* Set up global options that the user can over-ride
	*/
	$.gritter.options = {
		position: '',
		class_name: '', // could be set to 'gritter-light' to use white notifications
		fade_in_speed: 'medium', // how fast notifications fade in
		fade_out_speed: 1000, // how fast the notices fade out
		time: 6000 // hang on the screen for...
	}
	
	/**
	* Add a gritter notification to the screen
	* @see Gritter#add();
	*/
	$.gritter.add = function(params){

		try {
			return Gritter.add(params || {});
		} catch(e) {
		
			var err = 'Gritter Error: ' + e;
			(typeof(console) != 'undefined' && console.error) ? 
				console.error(err, params) : 
				alert(err);
				
		}
		
	}
	
	/**
	* Remove a gritter notification from the screen
	* @see Gritter#removeSpecific();
	*/
	$.gritter.remove = function(id, params){
		Gritter.removeSpecific(id, params || {});
	}
	
	/**
	* Remove all notifications
	* @see Gritter#stop();
	*/
	$.gritter.removeAll = function(params){
		Gritter.stop(params || {});
	}
	
	/**
	* Big fat Gritter object
	* @constructor (not really since its object literal)
	*/
	var Gritter = {
		
		// Public - options to over-ride with $.gritter.options in "add"
		position: '',
		fade_in_speed: '',
		fade_out_speed: '',
		time: '',
		
		// Private - no touchy the private parts
		_custom_timer: 0,
		_item_count: 0,
		_is_setup: 0,
		_tpl_close: '<a class="gritter-close" href="#" tabindex="1">Close Notification</a>',
		_tpl_title: '<span class="gritter-title">[[title]]</span>',
		_tpl_item: '<div id="gritter-item-[[number]]" class="gritter-item-wrapper [[item_class]]" style="display:none" role="alert"><div class="gritter-top"></div><div class="gritter-item">[[close]][[image]]<div class="[[class_name]]">[[title]]<p>[[text]]</p></div><div style="clear:both"></div></div><div class="gritter-bottom"></div></div>',
		_tpl_wrap: '<div id="gritter-notice-wrapper"></div>',
		
		/**
		* Add a gritter notification to the screen
		* @param {Object} params The object that contains all the options for drawing the notification
		* @return {Integer} The specific numeric id to that gritter notification
		*/
		add: function(params){
			// Handle straight text
			if(typeof(params) == 'string'){
				params = {text:params};
			}

			// We might have some issues if we don't have a title or text!
			if(params.text === null){
				throw 'You must supply "text" parameter.'; 
			}
			
			// Check the options and set them once
			if(!this._is_setup){
				this._runSetup();
			}
			
			// Basics
			var title = params.title, 
				text = params.text,
				image = params.image || '',
				sticky = params.sticky || false,
				item_class = params.class_name || $.gritter.options.class_name,
				position = $.gritter.options.position,
				time_alive = params.time || '';

			this._verifyWrapper();
			
			this._item_count++;
			var number = this._item_count, 
				tmp = this._tpl_item;
			
			// Assign callbacks
			$(['before_open', 'after_open', 'before_close', 'after_close']).each(function(i, val){
				Gritter['_' + val + '_' + number] = ($.isFunction(params[val])) ? params[val] : function(){}
			});

			// Reset
			this._custom_timer = 0;
			
			// A custom fade time set
			if(time_alive){
				this._custom_timer = time_alive;
			}
			
			var image_str = (image != '') ? '<img src="' + image + '" class="gritter-image" />' : '',
				class_name = (image != '') ? 'gritter-with-image' : 'gritter-without-image';
			
			// String replacements on the template
			if(title){
				title = this._str_replace('[[title]]',title,this._tpl_title);
			}else{
				title = '';
			}
			
			tmp = this._str_replace(
				['[[title]]', '[[text]]', '[[close]]', '[[image]]', '[[number]]', '[[class_name]]', '[[item_class]]'],
				[title, text, this._tpl_close, image_str, this._item_count, class_name, item_class], tmp
			);

			// If it's false, don't show another gritter message
			if(this['_before_open_' + number]() === false){
				return false;
			}

			$('#gritter-notice-wrapper').addClass(position).append(tmp);
			
			var item = $('#gritter-item-' + this._item_count);
			
			item.fadeIn(this.fade_in_speed, function(){
				Gritter['_after_open_' + number]($(this));
			});
			
			if(!sticky){
				this._setFadeTimer(item, number);
			}
			
			// Bind the hover/unhover states
			$(item).bind('mouseenter mouseleave', function(event){
				if(event.type == 'mouseenter'){
					if(!sticky){ 
						Gritter._restoreItemIfFading($(this), number);
					}
				}
				else {
					if(!sticky){
						Gritter._setFadeTimer($(this), number);
					}
				}
				Gritter._hoverState($(this), event.type);
			});
			
			// Clicking (X) makes the perdy thing close
			$(item).find('.gritter-close').click(function(){
				Gritter.removeSpecific(number, {}, null, true);
				return false;
			});
			
			return number;
		
		},
		
		/**
		* If we don't have any more gritter notifications, get rid of the wrapper using this check
		* @private
		* @param {Integer} unique_id The ID of the element that was just deleted, use it for a callback
		* @param {Object} e The jQuery element that we're going to perform the remove() action on
		* @param {Boolean} manual_close Did we close the gritter dialog with the (X) button
		*/
		_countRemoveWrapper: function(unique_id, e, manual_close){
			
			// Remove it then run the callback function
			e.remove();
			this['_after_close_' + unique_id](e, manual_close);
			
			// Check if the wrapper is empty, if it is.. remove the wrapper
			if($('.gritter-item-wrapper').length == 0){
				$('#gritter-notice-wrapper').remove();
			}
		
		},
		
		/**
		* Fade out an element after it's been on the screen for x amount of time
		* @private
		* @param {Object} e The jQuery element to get rid of
		* @param {Integer} unique_id The id of the element to remove
		* @param {Object} params An optional list of params to set fade speeds etc.
		* @param {Boolean} unbind_events Unbind the mouseenter/mouseleave events if they click (X)
		*/
		_fade: function(e, unique_id, params, unbind_events){

			var params = params || {},
				fade = (typeof(params.fade) != 'undefined') ? params.fade : true,
				fade_out_speed = params.speed || this.fade_out_speed,
				manual_close = unbind_events;

			this['_before_close_' + unique_id](e, manual_close);
			
			// If this is true, then we are coming from clicking the (X)
			if(unbind_events){
				e.unbind('mouseenter mouseleave');
			}
			
			// Fade it out or remove it
			if(fade){
			
				e.animate({
					opacity: 0
				}, fade_out_speed, function(){
					e.animate({ height: 0 }, 300, function(){
						Gritter._countRemoveWrapper(unique_id, e, manual_close);
					})
				})
				
			}
			else {
				
				this._countRemoveWrapper(unique_id, e);
				
			}
						
		},
		
		/**
		* Perform actions based on the type of bind (mouseenter, mouseleave) 
		* @private
		* @param {Object} e The jQuery element
		* @param {String} type The type of action we're performing: mouseenter or mouseleave
		*/
		_hoverState: function(e, type){
			
			// Change the border styles and add the (X) close button when you hover
			if(type == 'mouseenter'){
				
				e.addClass('hover');
				
				// Show close button
				e.find('.gritter-close').show();
						
			}
			// Remove the border styles and hide (X) close button when you mouse out
			else {
				
				e.removeClass('hover');
				
				// Hide close button
				e.find('.gritter-close').hide();
				
			}
			
		},
		
		/**
		* Remove a specific notification based on an ID
		* @param {Integer} unique_id The ID used to delete a specific notification
		* @param {Object} params A set of options passed in to determine how to get rid of it
		* @param {Object} e The jQuery element that we're "fading" then removing
		* @param {Boolean} unbind_events If we clicked on the (X) we set this to true to unbind mouseenter/mouseleave
		*/
		removeSpecific: function(unique_id, params, e, unbind_events){
			
			if(!e){
				var e = $('#gritter-item-' + unique_id);
			}

			// We set the fourth param to let the _fade function know to 
			// unbind the "mouseleave" event.  Once you click (X) there's no going back!
			this._fade(e, unique_id, params || {}, unbind_events);
			
		},
		
		/**
		* If the item is fading out and we hover over it, restore it!
		* @private
		* @param {Object} e The HTML element to remove
		* @param {Integer} unique_id The ID of the element
		*/
		_restoreItemIfFading: function(e, unique_id){
			
			clearTimeout(this['_int_id_' + unique_id]);
			e.stop().css({ opacity: '', height: '' });
			
		},
		
		/**
		* Setup the global options - only once
		* @private
		*/
		_runSetup: function(){
		
			for(opt in $.gritter.options){
				this[opt] = $.gritter.options[opt];
			}
			this._is_setup = 1;
			
		},
		
		/**
		* Set the notification to fade out after a certain amount of time
		* @private
		* @param {Object} item The HTML element we're dealing with
		* @param {Integer} unique_id The ID of the element
		*/
		_setFadeTimer: function(e, unique_id){
			
			var timer_str = (this._custom_timer) ? this._custom_timer : this.time;
			this['_int_id_' + unique_id] = setTimeout(function(){ 
				Gritter._fade(e, unique_id);
			}, timer_str);
		
		},
		
		/**
		* Bring everything to a halt
		* @param {Object} params A list of callback functions to pass when all notifications are removed
		*/  
		stop: function(params){
			
			// callbacks (if passed)
			var before_close = ($.isFunction(params.before_close)) ? params.before_close : function(){};
			var after_close = ($.isFunction(params.after_close)) ? params.after_close : function(){};
			
			var wrap = $('#gritter-notice-wrapper');
			before_close(wrap);
			wrap.fadeOut(function(){
				$(this).remove();
				after_close();
			});
		
		},
		
		/**
		* An extremely handy PHP function ported to JS, works well for templating
		* @private
		* @param {String/Array} search A list of things to search for
		* @param {String/Array} replace A list of things to replace the searches with
		* @return {String} sa The output
		*/  
		_str_replace: function(search, replace, subject, count){
		
			var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,
				f = [].concat(search),
				r = [].concat(replace),
				s = subject,
				ra = r instanceof Array, sa = s instanceof Array;
			s = [].concat(s);
			
			if(count){
				this.window[count] = 0;
			}
		
			for(i = 0, sl = s.length; i < sl; i++){
				
				if(s[i] === ''){
					continue;
				}
				
				for (j = 0, fl = f.length; j < fl; j++){
					
					temp = s[i] + '';
					repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
					s[i] = (temp).split(f[j]).join(repl);
					
					if(count && s[i] !== temp){
						this.window[count] += (temp.length-s[i].length) / f[j].length;
					}
					
				}
			}
			
			return sa ? s : s[0];
			
		},
		
		/**
		* A check to make sure we have something to wrap our notices with
		* @private
		*/  
		_verifyWrapper: function(){
		  
			if($('#gritter-notice-wrapper').length == 0){
				$('body').append(this._tpl_wrap);
			}
		
		}
		
	}
	
})(jQuery);

﻿/*****************************************
A. Name: Message Class
B. Synopsis: Class Module used for showing messages
***********************************************/
;
(function(global, $) {
    const Message = function(msgType, msgTitle, msg, func, trxId) {
        return new Message.init(msgType, msgTitle, msg, func, trxId);
    }
    Message.init = function(msgType, msgTitle, msg, func, trxId) {
        this.msgType = msgType || "";
        this.msgTitle = msgTitle || "";
        this.msg = msg || "";
        this.trxId = trxId || "";
        this.func = func || "";

        this.msgTimer = 5000;
        this.msgToastrType = {
            "info": "fa fa-info-circle",
            "warning": "fas fa-lg fa-fw m-r-10 fa-exclamation-triangle",
            "success": "fas fa-check-circle",
            "error": "fa fa-times-circle",
        };
        this.txtColor = {
            "info": "blue",
            "warning": "yellow",
            "success": "green",
            "error": "red",
        };
    }
    Message.prototype = {
        getError: function() {
            var errorList = "";
            if (Array.isArray(this.msg) || typeof this.msg === "object") {
                $.each(this.msg, function(key, value) {
                    errorList += '<div>' + (key + 1) + ". " + value + '</div>';
                });
            } else {
                errorList += '<div>' + this.msg + '</div>';
            }
            this.msg = errorList;
        },
        showToastrMsg: function() {
            if (this.msgType === "error") {
                this.getError();
            }
            iziToast.show({
                title: this.msgTitle,
                message: this.msg,
                icon: this.msgToastrType[this.msgType],
                position: 'topRight',
                backgroundColor: '',
                theme: 'light', // dark
                color: this.txtColor[this.msgType], // blue, red, green, yellow
                timeout: this.msgTimer,
            });
            return this;
        },
        showToastrMsgNoClose: function() {
            if (this.msgType === "error") {
                this.getError();
            }
            iziToast.show({
                title: this.msgTitle,
                message: this.msg,
                icon: this.msgToastrType[this.msgType],
                position: 'topRight',
                backgroundColor: '',
                theme: 'light', // dark
                color: this.txtColor[this.msgType], // blue, red, green, yellow
                timeout: 0,
            });
            return this;
        },
        showInfo: function(msg) {
            this.msgType = "info";
            this.msgTitle = "Message!";
            this.msg = msg;
            this.showToastrMsg();
        },
        showError: function(msg) {
            this.msgType = "error";
            this.msgTitle = "Error!";
            this.msg = msg;
            this.showToastrMsg();
        },
        showErrorNoClose: function(msg) {
            this.msgType = "error";
            this.msgTitle = "Error!";
            this.msg = msg;
            this.showToastrMsgNoClose();
        },
        showSuccess: function(msg) {
            this.msgType = "success";
            this.msgTitle = "Success!";
            this.msg = msg;
            this.showToastrMsg();
        },
        showWarning: function(msg) {
            this.msgType = "warning";
            this.msgTitle = "Warning!";
            this.msg = msg;
            this.showToastrMsg();
        },
        showNotification: function(data) {
            $.gritter.add({
                title: data.title,
                text: data.content,
                image: data.photo,
                sticky: false,
                time: ''
            });
            return false;
        },
        confirmAction: function() {
            var self = this;
            var promiseObj = new Promise(function(resolve, reject) {
                iziToast.question({
                    timeout: 20000,
                    close: false,
                    overlay: true,
                    displayMode: 'once',
                    id: 'question',
                    zindex: 99999999,
                    title: 'Confirm: ',
                    message: self.msg,
                    position: 'topCenter',
                    timeout: 0,
                    buttons: [
                        ['<button>Yes</button>', function(instance, toast) {

                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                            resolve(true);

                        }],
                        ['<button><b>NO</b></button>', function(instance, toast) {
                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                            resolve(false);
                        }, true],
                    ],
                });
            });
            return promiseObj;
        },
        confirmActionNo: function() {
            var self = this;
            var promiseObj = new Promise(function(resolve, reject) {
                iziToast.question({
                    timeout: 20000,
                    close: false,
                    overlay: true,
                    displayMode: 'once',
                    id: 'question',
                    zindex: 99999999,
                    title: 'Confirm: ',
                    message: self.msg,
                    position: 'topCenter',
                    timeout: 0,
                    buttons: [
                        ['<button>Yes</button>', function(instance, toast) {

                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                            resolve(true);

                        }],
                        ['<button><b>NO</b></button>', function(instance, toast) {
                            resolve(false);
                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                        }, true],
                    ],
                });
            });
            return promiseObj;
        },
        showSessionError: function(response) {
            $("#iziModalError").iziModal({
                title: "Attention",
                subtitle: response.errors,
                icon: 'icon-power_settings_new',
                headerColor: '#BD5B5B',
                width: 600,
                timeout: 0,
                timeoutProgressbar: true,
                transitionIn: 'fadeInDown',
                transitionOut: 'fadeOutDown',
                pauseOnHover: true
            });
            $('#iziModalError').iziModal('open');
        }
    }
    Message.init.prototype = Message.prototype;
    return global.Message = global.$M = Message;
}(window, $));
﻿/*****************************************
A. Name: Format Data Class
B. Synopsis: Class Module used to format data
***********************************************/
; (function () {
    const FormatterClass = function (dataToFormat) {
        return new FormatterClass.init(dataToFormat);
    }
    FormatterClass.init = function (dataToFormat) {
        this.dataToFormat = dataToFormat;
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }
    FormatterClass.prototype = {
        formatDate: function (dateFormat) {
            if (this.dataToFormat) {
                if (dateFormat) {
                    if (dateFormat === "dd/mm/yyyy") {
                        var today = new Date(this.dataToFormat);
                        var dd = today.getDate();
                        var mm = today.getMonth() + 1; //January is 0!

                        var yyyy = today.getFullYear();
                        if (dd < 10) {
                            dd = '0' + dd;
                        }
                        if (mm < 10) {
                            mm = '0' + mm;
                        }
                        var today = dd + '/' + mm + '/' + yyyy;
                    }
                    if (dateFormat === "mm/dd/yyyy") {
                        var today = new Date(this.dataToFormat);
                        var dd = today.getDate();
                        var mm = today.getMonth() + 1; //January is 0!

                        var yyyy = today.getFullYear();
                        if (dd < 10) {
                            dd = '0' + dd;
                        }
                        if (mm < 10) {
                            mm = '0' + mm;
                        }
                        var today = mm + '/' + dd + '/' + yyyy;
                    }
                    if (dateFormat === "mmyyyy") {
                        var today = new Date(this.dataToFormat);
                        var dd = today.getDate();
                        var mm = today.getMonth() + 1; //January is 0!

                        var yyyy = today.getFullYear();
                        if (dd < 10) {
                            dd = '0' + dd;
                        }
                        if (mm < 10) {
                            mm = '0' + mm;
                        }
                        var today = mm + '' + yyyy;
                    }
                    return today;
                } else {
                    return this.dataToFormat;
                }

            } else {
                return "";
            }
        },
        getFullMotnName: function (m) {
            return this.months[m];
        },
        formatMoney: function (decimalPlaces) {
            this.addZeros();
            return this.dataToFormat.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return this.formatDecimal(2);
        },
        formatDecimal: function (decimalPlaces) {

            if (decimalPlaces > 0) {
                this.addZeros();
                this.dataToFormat = this.dataToFormat.toFixed(decimalPlaces);
                var arrParts = this.dataToFormat.split('.');
                var p1 = arrParts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return p1 + "." + arrParts[1];
            } else {
                return this.dataToFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }


        },
        addZeros: function () {
            var value = Number(this.dataToFormat);
            var res = ("'" + this.dataToFormat + "'").search(".");
            if (res.length < 0) {
                value = value + "00";
            }
            return value;
        },
        setInputFilter: function (textbox, inputFilter) {
            var id = "";
            if (textbox.length) {
                ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
                    id = textbox[0].id;
                    if (id) {
                        el = document.getElementById(id);
                        el.addEventListener(event, function () {
                            if (inputFilter(this.value)) {
                                this.oldValue = this.value;
                                this.oldSelectionStart = this.selectionStart;
                                this.oldSelectionEnd = this.selectionEnd;
                            } else if (this.hasOwnProperty("oldValue")) {
                                this.value = this.oldValue;
                                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                            }
                        });
                    }
                });
            }
        },
        ConvertMinutes: function (num) {
            d = Math.floor(num / 1440); // 60*24
            h = Math.floor((num - (d * 1440)) / 60);
            m = Math.round(num % 60);

            if (d > 0) {
                return (d + " days, " + h + " hours, " + m + " minute" + ((m > 1) ? "s" : ""));
            } else {
                return (h + " hours, " + m + " minute" + ((m > 1) ? "s" : ""));
            }
        }
    }
    FormatterClass.init.prototype = FormatterClass.prototype;

    FormatterClass.init.prototype = FormatterClass.prototype;
    return window.FormatterClass = window.$F = FormatterClass;
}());
$(document).ready(function () {
    $("body").on("keypress", ".decimal-only, .money-only, .decimal", function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode != 45 && charCode != 46 && charCode > 31
          && (charCode < 48 || charCode > 57))
            return false;
        else {
            if (charCode == 46) {
                if ($(this).val().search(/\./) >= 0) {
                    return false;
                }
            }
        }
        return true;
    });
    $(".decimal-only").change(function (evt) {
        return $(this).val($F(+$(this).val()).formatDecimal(4));
    });
    $(".money-only").change(function (evt) {
        return $(this).val($F(+$(this).val()).formatMoney(2));
    });
    $("body").on("change, focusout", ".amountInputValidate", function () {
        var val = $(this).val();
        if (val.search(",") >= 0) {
            val = val.replace(/,/g, '')
        }
        if (+val <= 0) {
            $(this).addClass("input-error");
            $("#err-" + $(this).attr("id")).text("This value should be greater than 0.");
            $("#err-" + $(this).attr("id")).addClass("text-danger");
            $("#err-" + $(this).attr("id")).addClass("text-right");
            $(this).val("");
        } else {
            $(this).removeClass("input-error");
            $("#err-" + $(this).attr("id")).text("");
            $("#err-" + $(this).attr("id")).removeClass("text-danger")
        }
    });
    $F().setInputFilter(document.getElementsByClassName("posNegOnly"), function (value) {
        return /^-?\d*$/.test(value);
    });
    $F().setInputFilter(document.getElementsByClassName("posOnly"), function (value) {
        return /^\d*$/.test(value);
    });
    $F().setInputFilter(document.getElementsByClassName("intLimit"), function (value) {
        return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 500);
    });
    $F().setInputFilter(document.getElementsByClassName("floatNum"), function (value) {
        return /^-?\d*[.,]?\d*$/.test(value);
    });
    $F().setInputFilter(document.getElementsByClassName("currency2Dec"), function (value) {
        return /^-?\d*[.,]?\d{0,2}$/.test(value);
    });
    $F().setInputFilter(document.getElementsByClassName("hexa"), function (value) {
        return /^[0-9a-f]*$/i.test(value);
    });

});

﻿/*****************************************
A. Name: Custom UI Class
B. Synopsis: Class Module used to Create custom UI features
***********************************************/
;
(function() {
    const CustomUI = function() {
        return new CustomUI.init();
    }
    CustomUI.init = function() {
        this.dataTableID = "";
        this.notifTable = "";
    }
    CustomUI.prototype = {
        setDatatableMaxHeight: function() {
            if (this.dataTableID) {
                var $closestDiv = $(this.dataTableID).closest(".col-sm-12");
                if ($closestDiv.length) {
                    var eTop = $($closestDiv).offset().top;
                    var windowHeight = $(window).height();
                    var containerID = this.dataTableID + "-container";
                    var adjust = $(this.dataTableID).data("adjust") || 0;
                    var pagingHeight = $(this.dataTableID + "_wrapper .pagination").height();
                    var divHeight = windowHeight - eTop - 30 - pagingHeight + adjust;
                    var containerHeight = divHeight;

                    $($closestDiv).attr("id", containerID.replace('#', ''));
                    $($closestDiv).css("max-height", containerHeight + "px");
                    $($closestDiv).addClass("fixed-tblcontainer");
                } else if ($("#tblPriceEstimation_filter").length) {
                    var eTop = $("#tblPriceEstimation_filter").offset().top;
                    var windowHeight = $(window).height();
                    var containerID = this.dataTableID + "-container";
                    var adjust = $(this.dataTableID).data("adjust") || 0;
                    var pagingHeight = $(this.dataTableID + "_wrapper .pagination").height();
                    var divHeight = windowHeight - eTop - 70 - pagingHeight + adjust;
                    var containerHeight = divHeight;
                    if (!$(".tbl-container-here").length) $(this.dataTableID).wrap("<div class='tbl-container-here'></div>");
                    $(".tbl-container-here").attr("id", containerID.replace('#', ''));
                    $(".tbl-container-here").css("max-height", containerHeight + "px");
                    $(".tbl-container-here").addClass("fixed-tblcontainer");
                }
            }
        },
        setDatatableMaxHeightFixed: function() {
            var self = this;
            if (this.dataTableID) {
                var $closestDiv = $(this.dataTableID + "_wrapper");
                if ($closestDiv.length) {
                    var eTop = $($closestDiv).offset().top || 0;
                    var windowHeight = $(window).height() || 0;
                    var containerID = this.dataTableID + "-container" || 0;
                    var adjust = $(this.dataTableID).data("adjust") || 0 || 0;
                    var pagingHeight = $(this.dataTableID + "_wrapper .pagination").height() || 0;
                    var divHeight = 0;
                    var docWidth = $(document).width() || 0;

                    if (docWidth >= 767)
                        divHeight = windowHeight - eTop - 70 - pagingHeight + adjust;
                    else if (docWidth >= 576 && docWidth < 767)
                        divHeight = windowHeight - eTop - pagingHeight + adjust;
                    else if (docWidth < 576)
                        divHeight = windowHeight - eTop - pagingHeight + adjust;
                    if ($(this.dataTableID + " > tfoot").length || $(this.dataTableID + " > thead").length)
                        divHeight = divHeight - 31;
                    $(this.dataTableID + "_wrapper > div:nth-child(2) > div > div.dataTables_scroll > div.dataTables_scrollBody").css("height", "100%");
                    $(this.dataTableID + "_wrapper > div:nth-child(2) > div > div.dataTables_scroll > div.dataTables_scrollBody").css("max-height", divHeight + "px");
                    $(this.dataTableID + "_wrapper > div:nth-child(2) > div > div.dataTables_scroll > div.dataTables_scrollBody").attr("data-scrollbar", true);
                    $(this.dataTableID + "_wrapper > div:nth-child(2) > div > div.dataTables_scroll > div.dataTables_scrollBody").attr("data-height", divHeight + "px");
                    $(this.dataTableID + "_wrapper > div:nth-child(2) > div > div.dataTables_scroll > div.dataTables_scrollBody").attr("data-width", $(this.dataTableID + "_wrapper").width() + "px");
                    $(this.dataTableID + "_wrapper > div:nth-child(2) > div > div.dataTables_scroll > div.dataTables_scrollBody").slimScroll({
                        height: (divHeight + "px"),
                        width: ($(this.dataTableID + "_wrapper").width() + "px"),
                        size: '20px',
                    });
                    $(this.dataTableID + "_wrapper > div:nth-child(2) > div > div.dataTables_scroll > div.slimScrollDiv > div.dataTables_scrollBody").css("overflow", "");
                    $(this.dataTableID + "_wrapper > div:nth-child(2) > div > div.dataTables_scroll > div.slimScrollDiv > div.dataTables_scrollBody").css("overflow-x", "auto");
                    $(this.dataTableID + "_wrapper > div:nth-child(2) > div > div.dataTables_scroll > div.slimScrollDiv > div.dataTables_scrollBody").css("overflow-y", "hidden");
                    $(this.dataTableID + ">tbody>tr:nth-child(1)>td").each(function() {
                        var tdIndex = $(this).index();
                        var tdWidth = $(this).width();
                        var $headerTable = $(self.dataTableID).closest(".dataTables_scroll").find(".table").first();
                        $headerTable.find("tr").each(function() {
                            $(this).find("th").each(function() {
                                var thIndex = $(this).index();
                                if (tdIndex == thIndex) {
                                    $(this).css("width", tdWidth + "px");
                                }
                            });
                        });
                    });
                }
            }
        },
        setDivMaxHeight: function(ID) {
            if (ID) {
                if (ID.length) {
                    var eTop = $(ID).offset().top;
                    var windowHeight = $(window).height();
                    var adjust = $(ID).data("adjust") || 0;
                    var divHeight = windowHeight - eTop - 70 + adjust;
                    var containerHeight = divHeight;
                    $(ID).css("max-height", containerHeight + "px");
                    $(ID).css("overflow-y", "auto");
                }
            }
        },
        createSelectOption: function(selectOptionsList) {
            var options = "<option value=''>--Please Select--</option>";
            if (selectOptionsList.length) {
                $.each(selectOptionsList, function(i, x) {
                    options += '<option value="' + x.value + '">' + x.text + '</option>';
                });
            }
            return options;
        },
        createSelect2: function(arrID, arrList) {
            var self = this;
            $.each(arrID, function(i, val) {
                if (arrList[i].length > 0) {
                    $(val).html(self.createSelectOption(arrList[i]));
                }
                $(val).select2({
                    placeholder: '--Please Select--',
                    allowClear: true
                });
            })
        },
        clearCustomError: function(id) {
            $("#" + id).removeClass("input-error");
            $("#err-" + id).text("");
            $("#err-" + id).removeClass("text-danger")
        },
        openCreatePanel: function() {
            var bodyID = $(".btnCreateData").data("panelbodyid");
            $(bodyID).show();
            $(bodyID).removeClass("tago");
            $(".btnCreateData")[0].children[0].className = "fa fa-minus";
            $(".btnCreateData").prop("title", "Collapse");
            this.setDatatableMaxHeight();
        },
        closeCreatePanel: function() {
            var bodyID = $(".btnCreateData").data("panelbodyid");
            $(bodyID).hide();
            $(bodyID).addClass("tago");
            $(".btnCreateData")[0].children[0].className = "fa fa-plus";
            $(".btnCreateData").prop("title", "Create");
            this.setDatatableMaxHeight();
        }
    }
    CustomUI.init.prototype = CustomUI.prototype;
    return window.CustomUI = window.$UI = CustomUI;
}());

const CUI = $UI();
$(document).ready(function() {
    $(window).resize(function() {
        CUI.setDatatableMaxHeight();
    });
    $('.tabs-with-datatable .nav-tabs a').on('shown.bs.tab', function(event) {
        CUI.dataTableID = "#tbl" + $(this).attr("href").replace("#", "");
        if ($.fn.DataTable.isDataTable(CUI.dataTableID)) {
            CUI.setDatatableMaxHeight();
        }
    });
    if ($("#iziModalError").length) {
        $(document).on('closing', '#iziModalError', function(e) {
            window.location.href = "/login";
        });
    }
    $('#loading_modal').on('hidden.bs.modal', function() {
        if ($('.modal:visible').length) {
            $('body').addClass('modal-open');
        }
    });
});
﻿/*****************************************
A. Name: Custom Data Class
B. Synopsis: Class Module used to process data
***********************************************/
;
(function() {
    const DataClass = function(formData, formAction) {
        return new DataClass.init(formData, formAction);
    }
    DataClass.init = function(formData, formAction) {
        $M.init.call(this);
        this.formData = formData || "";
        this.formAction = formAction || "";
        this.jsonData = {};
        this.submitType = "POST";
        this.responseData = {};
        this.responseStatus = 200;
        this.responseError = {};
    }
    DataClass.prototype = {
        setJsonData: function() {
            let self = this;
            this.jsonData = {};
            if (self.formData) {
                $.each(self.formData, function() {
                    $(this).prop("disabled", "false");
                    if (self.jsonData[this.name]) {
                        if (!self.jsonData[this.name].push) {
                            self.jsonData[this.name] = [self.jsonData[this.name]];
                        }
                        self.jsonData[this.name].push(this.value.trim() || '');
                    } else {
                        self.jsonData[this.name] = this.value.trim() || '';
                    }
                });
            } else {
                self.showError("Please try again.");
            }
            return this;
        },
        clearFromData: function(formID) {
            let self = this;
            if (!formID) {
                self.showError("Please try again.");
                return;
            }
            $.each($("#" + formID + " .input"), function() {
                $(this).prop("readonly", false);
                if ($(this).hasClass("input")) {
                    var type = $(this).attr('type');
                    var showIfTrue = "";
                    if (type === "text" || type === "hidden" || $(this).is("select") || $(this).is("textarea") || type == "number" || type == "file") {
                        $(this).val("");
                        if ($(this).hasClass('select2-hidden-accessible')) {
                            $(this).val("").trigger('change.select2');
                        }
                    }
                    if (type === "radio") {
                        if ($(this).data("radiodefault")) {
                            $(this).trigger('click');
                        }
                        if ($(this).data("showiftrue")) {
                            if ($(this).is(":checked")) {
                                $(this).trigger('click');
                            }
                        }
                    }
                    if (type === "checkbox") {
                        $(this).prop("checked", false);
                    }
                }
                if ($(this).hasClass("readonly")) {
                    $(this).prop("readonly", true);
                }
            });
            $("#" + formID).parsley().reset();
            return this;
        },
        partialClearFromData: function(formID) {
            let self = this;
            if (!formID) {
                self.showError("Please try again.");
                return;
            }
            $.each($("#" + formID + " .input"), function() {
                if ($(this).hasClass("input")) {
                    if (!$(this).hasClass("xPartialClear")) {
                        var type = $(this).attr('type');
                        var showIfTrue = "";
                        if (type === "text" || type === "hidden" || $(this).is("select") || $(this).is("textarea") || type == "number") {
                            $(this).val("");
                            if ($(this).hasClass('select2-hidden-accessible')) {
                                $(this).trigger('change');
                                $(this).val(null).trigger('change');
                            }
                        }
                        if (type === "radio") {
                            $(this).trigger('click');
                            $(this).prop("checked", false);
                            if ($(this).data("radiodefault")) {
                                $(this).trigger('click');
                            }
                            if ($(this).data("showiftrue")) {
                                if ($(this).is(":checked")) {
                                    $(this).trigger('click');
                                }
                            }
                        }
                    }
                }
            });
            $("#" + formID).parsley().reset();
            return this;
        },
        sendData: function() {
            let self = this;

            let promiseObj = new Promise(function(resolve, reject) {
                if (!self.formAction) {
                    self.showError("Please try again.");
                    resolve(false);
                    return;
                }
                $.ajax({
                    dataType: 'json',
                    type: self.submitType,
                    url: self.formAction,
                    data: self.jsonData,
                    beforeSend: function() {
                        $('#loading_modal').modal("show");
                    },
                    success: function(response) {
                        $('#loading_modal').modal('hide');
                        if (response.success) {
                            self.responseData = response.data;
                            if (response.hasOwnProperty('msg')) {
                                self.msgType = response.msgType;
                                self.msgTitle = response.msgTitle;
                                self.msg = response.msg;
                                self.showToastrMsg();
                            }
                            resolve(true);
                        } else {
                            self.msgType = "error";
                            self.msgTitle = "Error!";
                            self.msg = response.errors || response.msg;
                            if (response.hasOwnProperty('errors') || response.hasOwnProperty('msg')) {
                                if (response.hasOwnProperty('type')) {
                                    if (response.type == "Login") {
                                        self.showSessionError(response);
                                    }
                                } else {
                                    self.showToastrMsg();
                                }
                            }
                            resolve(false);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        $('#loading_modal').modal('hide');
                        console.table(jqXHR.status);
                        console.table(textStatus);
                        console.table(errorThrown);
                        self.responseStatus = jqXHR.status;
                        self.responseError = jqXHR.responseJSON;
                        console.log(self.responseError)
                        // var errors = self.responseError.errors;
                        // self.showInputErrors(errors);

                        if (errorThrown == "Internal Server Error") {
                            self.ErrorMsg(jqXHR);
                        }
                        
                        resolve(false);

                        if (jqXHR.status == 419) {
                            window.location.href = '/login';
                        }
                    }
                });
            });
            return promiseObj;
        },
        sendDataNoLoading: function() {
            let self = this;

            let promiseObj = new Promise(function(resolve, reject) {
                if (!self.formAction) {
                    self.showError("Please try again.");
                    resolve(false);
                    return;
                }
                $.ajax({
                    dataType: 'json',
                    type: self.submitType,
                    url: self.formAction,
                    data: self.jsonData,
                    beforeSend: function() {},
                    success: function(response) {
                        if (response.success) {
                            self.responseData = response.data;
                            self.msgType = "success";
                            self.msgTitle = "Success!";
                            if (response.hasOwnProperty('msg')) {
                                self.msg = response.msg;
                                self.showToastrMsg();
                            }

                            resolve(true);
                        } else {
                            self.msgType = "error";
                            self.msgTitle = "Error!";
                            self.msg = response.errors || response.msg;
                            if (response.hasOwnProperty('errors') || response.hasOwnProperty('msg')) {
                                if (response.hasOwnProperty('type')) {
                                    if (response.type == "Login") {
                                        self.showSessionError(response);
                                    }
                                } else {
                                    self.showToastrMsg();
                                }

                            }
                            resolve(false);
                        }

                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        //$('#loading_modal').modal('hide');
                        self.showError("An error occured while processing your request. Please refresh the page and try again.")
                        console.table(jqXHR.status);
                        console.table(textStatus);
                        console.table(errorThrown);
                        resolve(false);
                    }
                });
            });
            return promiseObj;
        },
        sendFile: function() {
            let self = this;

            let promiseObj = new Promise(function(resolve, reject) {
                if (!self.formAction) {
                    self.showError("Please try again.");
                    resolve(false);
                    return;
                }
                $.ajax({
                    type: self.submitType,
                    url: self.formAction,
                    data: self.jsonData,
                    contentType: false,
                    processData: false,
                    beforeSend: function() {
                        $('#loading_modal').modal("show");
                    },
                    success: function(response) {
                        $('#loading_modal').modal('hide');
                        if (response.success) {
                            self.responseData = response.data;
                            self.msgType = "success";
                            self.msgTitle = "Success!";
                            if (response.hasOwnProperty('msg')) {
                                self.msg = response.msg;
                                self.showToastrMsg();
                            }
                            resolve(true);
                        } else {
                            self.msgType = "error";
                            self.msgTitle = "Error!";
                            self.msg = response.errors || response.msg;
                            if (response.hasOwnProperty('errors') || response.hasOwnProperty('msg')) {
                                if (response.hasOwnProperty('type')) {
                                    if (response.type == "Login") {
                                        self.showSessionError(response);
                                    }
                                }
                                self.showToastrMsg();
                            }
                            resolve(false);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        $('#loading_modal').modal('hide');
                        console.table(jqXHR.status);
                        console.table(textStatus);
                        console.table(errorThrown);
                    }
                });
            });
            return promiseObj;
        },
        makeSelect: function(id, data) {
            var option = '<option value="">--Please Select--</option>';
            $.each(data, function(i, x) {
                option += '<option value="' + x.value + '">' + x.text + '</option>';
            });
            if (id) {
                $('#' + id).append(option);
            } else {
                return option;
            }
        },
        isObjEmpty: function(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        },
        populateToFormInputs: function(data, frmContainer) {
            frmContainer = frmContainer || "";
            $.each(data, function(key, value) {
                var type = $("#" + key).attr('type');
                var showIfTrue = "";
                var id = "";
                if (type === undefined) {
                    type = $("input[name='" + key + "']").attr('type');
                }
                if (type === "text" || type === "number" || type === "hidden" || $("#" + key).is("select") || $("#" + key).is("textarea")) {
                    id = $(frmContainer + " [name='" + key + "']").attr('id')
                    $("#" + id).val(value);
                    if ($("#" + id).hasClass('select2-hidden-accessible')) {
                        $("#" + id).trigger('change.select2');
                    }
                    if ($("#" + id).hasClass('datepicker')) {
                        $("#" + id).val($F(value).formatDate($("#" + id).data("dateformat")));
                    }
                }
                if (type === "radio") {
                    $("input[name='" + key + "']").attr('checked', false);
                    $("input[name='" + key + "'][value='" + value + "']").trigger('click');
                    $("input[name='" + key + "'][value='" + value + "']").prop("checked", true);
                    showIfTrue = $("input[name='" + key + "']").data("showiftrue") || "";
                    if (showIfTrue) {
                        if (value == 1) {
                            $(showIfTrue).show();
                        } else {
                            $(showIfTrue).hide();
                        }
                    }
                }
            });
        },
        getDataTableData: function(tblData) {
            var arrData = [];
            var selectedRowCount = tblData.length;
            var row = "",
                ID = "";
            for (var i = 0; selectedRowCount > i; i++) {
                row = tblData[i];
                arrData.push(row);
            }
            return arrData;
        },
        parsleyValidate: function(form) {
            if ($(".form-control.parsley-error").length) {
                $('#' + form).parsley().validate();
            }
        },
        getArrayValFromObjectArray: function(tblData, prop) {
            var arrVal = [];
            var selectedRowCount = tblData.length;
            var row = "",
                ID = "";
            for (var i = 0; selectedRowCount > i; i++) {
                row = tblData[i];
                arrVal.push(row[prop])
            }
            return arrVal;
        },
        readURL: function(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                var previewid = input.getAttribute('data-previewid');
                reader.onload = function(e) {
                    $("#" + previewid).attr('src', e.target.result);
                };

                reader.readAsDataURL(input.files[0]);
            }
        },
        checkAllCheckboxesInTable: function(tblID, checkAllClass, checkItemClass, deleteButtonID, selectedID) {
            $(tblID + ' ' + checkAllClass).on('click', function(event) {
                $('input:checkbox' + checkItemClass + ':enabled').not(this).prop('checked', this.checked);

                var checked = 0;
                var table = $(tblID).DataTable();
                for (var x = 0; x < table.context[0].aoData.length; x++) {
                    var dtRow = table.context[0].aoData[x];
                    if (dtRow.anCells !== null) {
                        if (dtRow.anCells[0].firstChild.checked == true) {
                            checked++;
                            table.row(dtRow.idx).select();
                        } else {
                            table.row(dtRow.idx).deselect();
                        }
                    }
                }

                if (deleteButtonID !== null) {
                    if (checked > 0)
                        $(deleteButtonID).prop('disabled', false);
                    else
                        $(deleteButtonID).prop('disabled', true);
                }
            });

        },
        checkCheckboxesInTable: function(tblID, checkAllClass, checkItemClass, deleteButtonID) {
            $(tblID + '_wrapper ' + checkItemClass).on('change', function() {
                var index = $(this).parents('tr');
                var table = $(tblID).DataTable();
                $(this).not(this).prop('checked', this.checked);

                var checked = 0;
                if ($(this).is(':checked')) {
                    table.row($(this).parents('tr')).select();
                    checked++;
                }

                if (checked == 0) {
                    $(tblID + ' ' + checkAllClass).prop('checked', false);
                    table.row($(this).parents('tr')).deselect();
                }

                if (deleteButtonID !== null) {
                    if (checked > 0)
                        $(deleteButtonID).prop('disabled', false);
                    else
                        $(deleteButtonID).prop('disabled', true);
                }
            });
        },
        ToggleCheckboxOnPageChange: function(data, table_id, col_index) {
            var checked = 0;

            for (var i = 0; i < data.length; i++) {
                var checkbox;
                if (col_index == null) {
                    checkbox = data[i].anCells[0].firstChild;
                } else {
                    checkbox = data[i].anCells[col_index].children[0];
                }

                if ($(checkbox).is(':checked')) {
                    checked++;
                }
            }

            if (data.length == checked) {
                $('#' + table_id + ' .checkAllitem').prop('checked', true);
            } else {
                $('#' + table_id + ' .checkAllitem').prop('checked', false);
            }
        },
        getSelectedDataRow: function(TableID, dataID, column_indx) {
            var table = $(TableID).DataTable();
            // dataID = table.rows({ selected: true });
            //$.map(table.context[0].aoData, function (item) {
            //    //return item[column_indx];
            //    if ($(item.nTr).hasClass('selected')) {
            //        console.log(item);
            //    }
            //});

            return dataID;
        },
        showInputErrors: function(errors) {
            $.each(errors, function(i, x) {
                switch (i) {
                    case i:

                        if (i == 'photo') {
                            var err = '';
                            $.each(x, function(ii, xx) {
                                err += '<li>' + xx + '</li>';
                                $('#photo_feedback').append(err);
                            });
                            $('#photo_feedback').css('color', '#dc3545');
                        }
                        if (i !== 'photo') {
                            $('#' + i).addClass("input-error");
                            $('#' + i).addClass('is-invalid');
                            $('#' + i + '_feedback').addClass('invalid-feedback');
                            $('#' + i + '_feedback').html(x);
                        }
                        break;
                }
            });
        },
        hideInputErrors: function(error) {
            $('#' + error).removeClass("input-error");
            $('#' + error).removeClass('is-invalid');
            $('#' + error + '_feedback').removeClass('invalid-feedback');
            $('#' + error + '_feedback').html('');
        },
        ErrorMsg: function(xhr) {
            var self = this;
            if (xhr.status == 500 || xhr.status == 405) {
                var response;
                if (xhr.hasOwnProperty('responseJSON')) {
                    response = xhr.responseJSON;
                } else {
                    response = jQuery.parseJSON(xhr.responseText);
                }

                var file = response.file;
                var line = response.line;

                var msg = "File: " + file + "</br>" + "Line: " + line + "</br>" + "Message: " + response.message;

                self.showError(msg);

                $('.loadingOverlay').hide();
                $('.loadingOverlay-modal').hide();
            } else if (xhr.status == 422) {
                self.showInputErrors(xhr.responseJSON.errors);
            }

        },
        jsUcfirst: function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        },
        getSelectedText: function(elementId) {
            var elt = document.getElementById(elementId);

            if (elt.selectedIndex == -1)
                return null;

            return elt.options[elt.selectedIndex].text;
        },
        formatNumber: function(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        isNumberKey: function(evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                evt.target.value = "";
                return false;
            }
            return true;
        },

        toFixed: function(num, fixed) {
            var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
            return num.toString().match(re)[0];
        }
    }
    DataClass.init.prototype = $.extend(DataClass.prototype, $M.init.prototype);

    DataClass.init.prototype = DataClass.prototype;
    return window.DataClass = window.$D = DataClass;
}());
/*****************************************
A. Name: Real Time Script
B. Synopsis: Real Time Script
***********************************************/
"use strict";

(function() {
    const RealTime = function() {
        return new RealTime.init();
    }
    RealTime.init = function() {
        $D.init.call(this);
        this.$tbl_audit_realtime = "";
        this.token = $("meta[name=csrf-token]").attr("content");
    }
    RealTime.prototype = {
        init: function() {},
    }
    RealTime.init.prototype = $.extend(RealTime.prototype, $D.init.prototype);
    RealTime.init.prototype = RealTime.prototype;

    $(document).ready(function() {
        var _RealTime = RealTime();
        // _RealTime.getUnreadNotification();
        // _RealTime.drawRealTimeAuditDatatables();

        // Echo.channel('audit-trail')
        //     .listen('AuditTrail', function(e) {
        //         _RealTime.$tbl_audit_realtime.ajax.reload(null, false);
        //     });

        // Echo.channel('notification')
        //     .listen('Notify', function(e) {
        //         var noti = e._notification;

        //         var receiver_id = parseInt($('meta[name=user_id]').attr('content'));
        //         if (noti.to == receiver_id) {
        //             // redraw notification menu
        //             _RealTime.getUnreadNotification();
        //             // notification message
        //             _RealTime.showNotification(noti);
        //         }
        //     });

        // $('#notification_list_header').on('click', '.view_notification', function() {
        //     _RealTime.readNotification($(this).attr('data-id'), $(this).attr('data-link'));
        // });


    });
})();

"use strict";

(function() {
    const Pages = function() {
        return new Pages.init();
    }
    Pages.init = function() {
        $D.init.call(this);
        this.$tbl_pages = "";
        this.id = 0;
        this.token = $("meta[name=csrf-token]").attr("content");
        this.page_checked = 0;
    }
    Pages.prototype = {
        init: function() {},
        drawDatatables: function() {
            var self = this;
            if (!$.fn.DataTable.isDataTable('#tbl_pages')) {
                self.$tbl_pages = $('#tbl_pages').DataTable({
                    processing: true,
                    ajax: {
                        url: "/masters/page/list",
                        dataType: "JSON",
                        error: function(response) {
                            console.log(response);
                        }
                    },
                    deferRender: true,
                    language: {
                        aria: {
                            sortAscending: ": activate to sort column ascending",
                            sortDescending: ": activate to sort column descending"
                        },
                        emptyTable: "No data available in table",
                        info: "Showing _START_ to _END_ of _TOTAL_ records",
                        infoEmpty: "No records found",
                        infoFiltered: "(filtered1 from _MAX_ total records)",
                        lengthMenu: "Show _MENU_",
                        search: "Search:",
                        zeroRecords: "No matching records found",
                        paginate: {
                            "previous": "Prev",
                            "next": "Next",
                            "last": "Last",
                            "first": "First"
                        }
                    },
                    pageLength: 10,
                    order: [
                        [12, "desc"]
                    ],
                    columns: [{
                            data: function(x) {
                                return '<input type="checkbox" class="table-checkbox check_page" value="' + x.id + '">';
                            },
                            name: 'id',
                            searchable: false,
                            orderable: false
                        },
                        {
                            data: 'action',
                            name: 'action',
                            orderable: false,
                            searchable: false
                        },
                        { data: 'page_name', name: 'page_name' },
                        { data: 'page_label', name: 'page_label' },
                        { data: 'url', name: 'url' },
                        { data: 'has_sub', name: 'has_sub' },
                        { data: 'parent_menu', name: 'parent_menu' },
                        { data: 'parent_name', name: 'parent_name' },
                        { data: 'parent_order', name: 'parent_order' },
                        { data: 'order', name: 'order' },
                        { data: 'icon', name: 'icon' },
                        { data: 'create_user', name: 'create_user' },
                        { data: 'updated_at', name: 'updated_at' },
                    ],
                    rowCallback: function(row, data) {
                        var td = $(row).find('td:first .check_page');
                        if (td.is(':checked')) {
                            self.page_checked++;
                        }
                    },
                    createdRow: function(row, data, dataIndex) {
                        if (data.del_flag === 1) {
                            $(row).css('background-color', '#ff6266');
                            $(row).css('color', '#fff');
                        }
                    },
                    initComplete: function() {
                        $('.check_all_pages').prop('checked', false);
                    },
                    fnDrawCallback: function() {
                        if (self.page_checked > 9) {
                            $('.check_all_pages').prop('checked', true);
                        } else {
                            $('.check_all_pages').prop('checked', false);
                        }
                        self.checkCheckboxesInTable('#tbl_pages', '.check_all_pages', '.check_page');
                        self.checkAllCheckboxesInTable('#tbl_pages', '.check_all_pages', '.check_page');
                        $("#tbl_pages").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
                    },
                }).on('page.dt', function() {
                    self.page_checked = 0;
                });
            }
            return this;
        },
        delete_page: function(IDs) {
            var self = this;
            self.formAction = '/masters/page/delete-page';
            self.jsonData = { _token: self.token, ids: IDs };
            self.sendData().then(function() {
                self.$tbl_pages.ajax.reload(null, false);
            });
            return this;
        },
        clearForm: function(inputs) {
            var self = this;
            $.each(inputs, function(i,x) {
                $('#'+x).val('');
                self.hideInputErrors(x);
            });
        }
    }
    Pages.init.prototype = $.extend(Pages.prototype, $D.init.prototype);
    Pages.init.prototype = Pages.prototype;

    $(document).ready(function() {
        var _Pages = Pages();
        _Pages.drawDatatables();

        $('#btn_add_pages').on('click', function() {
            var inputs = $('.clear').map(function() {
                return this.name;
            });
            _Pages.clearForm(inputs);
            $('#modal_form_title').html('Add Page');
            $('#modal_pages').modal('show');
        });

        $('#frm_pages').on('submit', function(e) {
            $('#loading_modal').modal('show');
            e.preventDefault();
            var data = $(this).serializeArray();
            $.ajax({
                url: $(this).attr('action'),
                type: 'POST',
                dataType: 'JSON',
                data: data
            }).done(function(response, textStatus, xhr) {
                if (textStatus) {
                    switch (response.status) {
                        case "failed":
                            _Pages.showWarning(response.msg);
                            break;
                        case "error":
                            _Pages.ErrorMsg(response.msg);
                            break;
                        default:
                            _Pages.clearForm(response.inputs);
                            _Pages.$tbl_pages.ajax.reload();
                            _Pages.showSuccess(response.msg);
                            break;
                    }
                    
                    _Pages.id = 0;
                }
            }).fail(function(xhr, textStatus, errorThrown) {
                var errors = xhr.responseJSON.errors;
                _Pages.showInputErrors(errors);

                if (errorThrown == "Internal Server Error") {
                    _Pages.ErrorMsg(xhr);
                }
            }).always(function() {
                $('#loading_modal').modal('hide');
            });
        });

        $('#tbl_pages').on('click', '.btn_edit_page', function() {
            var inputs = $('.clear').map(function() {
                return this.name;
            });
            _Pages.clearForm(inputs);

            var data = $('#tbl_pages').DataTable().row($(this).parents('tr')).data();

            $('#id').val(data.id);
            $('#page_name').val(data.page_name);
            $('#page_label').val(data.page_label);
            $('#url').val(data.url);
            $('#parent_menu').val(data.parent_menu);
            $('#parent_name').val(data.parent_name);
            $('#parent_order').val(data.parent_order);
            $('#order').val(data.order);
            $('#icon').val(data.icon);

            if (data.has_sub == "YES") {
                $('#has_sub').prop('checked', true);
            } else {
                $('#has_sub').prop('checked', false);
            }

            $('#modal_form_title').html('Edit Page');
            $('#modal_pages').modal('show');
        });

        $('#btn_delete_pages').on('click', function() {
            var chkArray = [];
            var table = _Pages.$tbl_pages;

            for (var x = 0; x < table.context[0].aoData.length; x++) {
                var DataRow = table.context[0].aoData[x];
                if (DataRow.anCells !== null && DataRow.anCells[0].firstChild.checked == true) {
                    chkArray.push(table.context[0].aoData[x].anCells[0].firstChild.value)
                }
            }

            if (chkArray.length > 0) {
                _Pages.msg = "Are you sure you want to delete this page/s?";
                _Pages.confirmAction().then(function(approve) {
                    if (approve)
                        _Pages.delete_page(chkArray);

                    $('.check_all_pages').prop('checked', false);
                });
            } else {
                _Pages.showWarning('Please select at least 1 page.');
            }
        });
    });
})();




window.history.forward();

function noBack() {
    window.history.forward();
}
setTimeout("noBack()", 0);
window.onunload = function() { null };