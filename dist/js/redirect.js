/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/utilities/_helper.ts":
/*!******************************************!*\
  !*** ./src/scripts/utilities/_helper.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentFolderId: function() { return /* binding */ getCurrentFolderId; },
/* harmony export */   hasInvalidChars: function() { return /* binding */ hasInvalidChars; },
/* harmony export */   ready: function() { return /* binding */ ready; }
/* harmony export */ });
const ready = (fn) => {
    if (document.readyState !== 'loading') {
        fn();
    }
    else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};
const hasInvalidChars = (str) => {
    const invalid = ["\\", "/", ":", "*", "?", "\"", "<", ">", "|"];
    return invalid.some(char => str.includes(char));
};
const getCurrentFolderId = () => {
    const match = window.location.hash.match(/^#\/folder\/([^/]+)/);
    return match ? match[1] : "root";
};


/***/ }),

/***/ "./node_modules/@azure/msal-browser/dist/redirect-bridge/cache/CacheKeys.mjs":
/*!***********************************************************************************!*\
  !*** ./node_modules/@azure/msal-browser/dist/redirect-bridge/cache/CacheKeys.mjs ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PREFIX: function() { return /* binding */ PREFIX; }
/* harmony export */ });
/*! @azure/msal-browser v5.6.1 2026-03-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const PREFIX = "msal";


//# sourceMappingURL=CacheKeys.mjs.map


/***/ }),

/***/ "./node_modules/@azure/msal-browser/dist/redirect-bridge/config/Configuration.mjs":
/*!****************************************************************************************!*\
  !*** ./node_modules/@azure/msal-browser/dist/redirect-bridge/config/Configuration.mjs ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_REDIRECT_TIMEOUT_MS: function() { return /* binding */ DEFAULT_REDIRECT_TIMEOUT_MS; }
/* harmony export */ });
/*! @azure/msal-browser v5.6.1 2026-03-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const DEFAULT_REDIRECT_TIMEOUT_MS = 30000;


//# sourceMappingURL=Configuration.mjs.map


/***/ }),

/***/ "./node_modules/@azure/msal-browser/dist/redirect-bridge/encode/Base64Decode.mjs":
/*!***************************************************************************************!*\
  !*** ./node_modules/@azure/msal-browser/dist/redirect-bridge/encode/Base64Decode.mjs ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   base64DecToArr: function() { return /* binding */ base64DecToArr; },
/* harmony export */   base64Decode: function() { return /* binding */ base64Decode; }
/* harmony export */ });
/* harmony import */ var _error_BrowserAuthError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error/BrowserAuthError.mjs */ "./node_modules/@azure/msal-browser/dist/redirect-bridge/error/BrowserAuthError.mjs");
/* harmony import */ var _error_BrowserAuthErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../error/BrowserAuthErrorCodes.mjs */ "./node_modules/@azure/msal-browser/dist/redirect-bridge/error/BrowserAuthErrorCodes.mjs");
/*! @azure/msal-browser v5.6.1 2026-03-19 */




/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Class which exposes APIs to decode base64 strings to plaintext. See here for implementation details:
 * https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
 */
/**
 * Returns a URL-safe plaintext decoded string from b64 encoded input.
 * @param input
 */
function base64Decode(input) {
    return new TextDecoder().decode(base64DecToArr(input));
}
/**
 * Decodes base64 into Uint8Array
 * @param base64String
 */
function base64DecToArr(base64String) {
    let encodedString = base64String.replace(/-/g, "+").replace(/_/g, "/");
    switch (encodedString.length % 4) {
        case 0:
            break;
        case 2:
            encodedString += "==";
            break;
        case 3:
            encodedString += "=";
            break;
        default:
            throw (0,_error_BrowserAuthError_mjs__WEBPACK_IMPORTED_MODULE_0__.createBrowserAuthError)(_error_BrowserAuthErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_1__.invalidBase64String);
    }
    const binString = atob(encodedString);
    return Uint8Array.from(binString, (m) => m.codePointAt(0) || 0);
}


//# sourceMappingURL=Base64Decode.mjs.map


/***/ }),

/***/ "./node_modules/@azure/msal-browser/dist/redirect-bridge/error/BrowserAuthError.mjs":
/*!******************************************************************************************!*\
  !*** ./node_modules/@azure/msal-browser/dist/redirect-bridge/error/BrowserAuthError.mjs ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BrowserAuthError: function() { return /* binding */ BrowserAuthError; },
/* harmony export */   createBrowserAuthError: function() { return /* binding */ createBrowserAuthError; },
/* harmony export */   getDefaultErrorMessage: function() { return /* binding */ getDefaultErrorMessage; }
/* harmony export */ });
/* harmony import */ var _azure_msal_common_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @azure/msal-common/browser */ "./node_modules/@azure/msal-common/dist-browser/error/AuthError.mjs");
/*! @azure/msal-browser v5.6.1 2026-03-19 */



/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function getDefaultErrorMessage(code) {
    return `See https://aka.ms/msal.js.errors#${code} for details`;
}
/**
 * Browser library error class thrown by the MSAL.js library for SPAs
 */
class BrowserAuthError extends _azure_msal_common_browser__WEBPACK_IMPORTED_MODULE_0__.AuthError {
    constructor(errorCode, subError) {
        super(errorCode, getDefaultErrorMessage(errorCode), subError);
        Object.setPrototypeOf(this, BrowserAuthError.prototype);
        this.name = "BrowserAuthError";
    }
}
function createBrowserAuthError(errorCode, subError) {
    return new BrowserAuthError(errorCode, subError);
}


//# sourceMappingURL=BrowserAuthError.mjs.map


/***/ }),

/***/ "./node_modules/@azure/msal-browser/dist/redirect-bridge/error/BrowserAuthErrorCodes.mjs":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@azure/msal-browser/dist/redirect-bridge/error/BrowserAuthErrorCodes.mjs ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   emptyResponse: function() { return /* binding */ emptyResponse; },
/* harmony export */   invalidBase64String: function() { return /* binding */ invalidBase64String; },
/* harmony export */   noStateInHash: function() { return /* binding */ noStateInHash; },
/* harmony export */   timedOut: function() { return /* binding */ timedOut; },
/* harmony export */   unableToParseState: function() { return /* binding */ unableToParseState; }
/* harmony export */ });
/*! @azure/msal-browser v5.6.1 2026-03-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const noStateInHash = "no_state_in_hash";
const unableToParseState = "unable_to_parse_state";
const invalidBase64String = "invalid_base64_string";
const timedOut = "timed_out";
const emptyResponse = "empty_response";


//# sourceMappingURL=BrowserAuthErrorCodes.mjs.map


/***/ }),

/***/ "./node_modules/@azure/msal-browser/dist/redirect-bridge/navigation/NavigationClient.mjs":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@azure/msal-browser/dist/redirect-bridge/navigation/NavigationClient.mjs ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavigationClient: function() { return /* binding */ NavigationClient; }
/* harmony export */ });
/* harmony import */ var _error_BrowserAuthError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error/BrowserAuthError.mjs */ "./node_modules/@azure/msal-browser/dist/redirect-bridge/error/BrowserAuthError.mjs");
/* harmony import */ var _error_BrowserAuthErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../error/BrowserAuthErrorCodes.mjs */ "./node_modules/@azure/msal-browser/dist/redirect-bridge/error/BrowserAuthErrorCodes.mjs");
/*! @azure/msal-browser v5.6.1 2026-03-19 */




/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class NavigationClient {
    /**
     * Navigates to other pages within the same web application
     * @param url
     * @param options
     */
    navigateInternal(url, options) {
        return NavigationClient.defaultNavigateWindow(url, options);
    }
    /**
     * Navigates to other pages outside the web application i.e. the Identity Provider
     * @param url
     * @param options
     */
    navigateExternal(url, options) {
        return NavigationClient.defaultNavigateWindow(url, options);
    }
    /**
     * Default navigation implementation invoked by the internal and external functions
     * @param url
     * @param options
     */
    static defaultNavigateWindow(url, options) {
        if (options.noHistory) {
            window.location.replace(url); // CodeQL [SM03712] Application owner controls the URL. User can't change it.
        }
        else {
            window.location.assign(url); // CodeQL [SM03712] Application owner controls the URL. User can't change it.
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject((0,_error_BrowserAuthError_mjs__WEBPACK_IMPORTED_MODULE_0__.createBrowserAuthError)(_error_BrowserAuthErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_1__.timedOut, "failed_to_redirect"));
            }, options.timeout);
        });
    }
}


//# sourceMappingURL=NavigationClient.mjs.map


/***/ }),

/***/ "./node_modules/@azure/msal-browser/dist/redirect-bridge/redirect_bridge/index.mjs":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@azure/msal-browser/dist/redirect-bridge/redirect_bridge/index.mjs ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   broadcastResponseToMainFrame: function() { return /* binding */ broadcastResponseToMainFrame; }
/* harmony export */ });
/* harmony import */ var _utils_BrowserUtils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/BrowserUtils.mjs */ "./node_modules/@azure/msal-browser/dist/redirect-bridge/utils/BrowserUtils.mjs");
/* harmony import */ var _utils_BrowserConstants_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/BrowserConstants.mjs */ "./node_modules/@azure/msal-browser/dist/redirect-bridge/utils/BrowserConstants.mjs");
/* harmony import */ var _config_Configuration_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/Configuration.mjs */ "./node_modules/@azure/msal-browser/dist/redirect-bridge/config/Configuration.mjs");
/* harmony import */ var _navigation_NavigationClient_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../navigation/NavigationClient.mjs */ "./node_modules/@azure/msal-browser/dist/redirect-bridge/navigation/NavigationClient.mjs");
/* harmony import */ var _cache_CacheKeys_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cache/CacheKeys.mjs */ "./node_modules/@azure/msal-browser/dist/redirect-bridge/cache/CacheKeys.mjs");
/*! @azure/msal-browser v5.6.1 2026-03-19 */







/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Processes the authentication response from the redirect URL
 * For SSO and popup scenarios broadcasts it to the main frame
 * For redirect scenario navigates to the home page
 *
 * @param {NavigationClient} navigationClient - Optional navigation client for redirect scenario.
 *
 * @returns {Promise<void>} A promise that resolves when the response has been broadcast and cleanup is complete.
 *
 * @throws {AuthError} If no authentication payload is found in the URL (hash or query string).
 * @throws {AuthError} If the state parameter is missing from the redirect URL.
 * @throws {AuthError} If the state is missing required 'id' or 'meta' attributes.
 */
async function broadcastResponseToMainFrame(navigationClient) {
    let parsedResponse;
    try {
        parsedResponse = (0,_utils_BrowserUtils_mjs__WEBPACK_IMPORTED_MODULE_0__.parseAuthResponseFromUrl)();
    }
    catch (error) {
        // Clear hash and query string before re-throwing parse errors
        if (typeof window.history.replaceState === "function") {
            window.history.replaceState(null, "", `${window.location.origin}${window.location.pathname}`);
        }
        throw error;
    }
    const { payload, urlHash, urlQuery, hasResponseInHash, hasResponseInQuery, libraryState, } = parsedResponse;
    const { id, meta } = libraryState;
    if (meta["interactionType"] === _utils_BrowserConstants_mjs__WEBPACK_IMPORTED_MODULE_1__.InteractionType.Redirect) {
        const navClient = navigationClient || new _navigation_NavigationClient_mjs__WEBPACK_IMPORTED_MODULE_3__.NavigationClient();
        const navigationOptions = {
            apiId: _utils_BrowserConstants_mjs__WEBPACK_IMPORTED_MODULE_1__.ApiId.handleRedirectPromise,
            noHistory: true,
            timeout: _config_Configuration_mjs__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_REDIRECT_TIMEOUT_MS,
        };
        let navigateToUrl = "";
        const interactionKey = `${_cache_CacheKeys_mjs__WEBPACK_IMPORTED_MODULE_4__.PREFIX}.${_utils_BrowserConstants_mjs__WEBPACK_IMPORTED_MODULE_1__.TemporaryCacheKeys.INTERACTION_STATUS_KEY}`;
        try {
            /*
             * Retrieve the original navigation URL from sessionStorage
             */
            const { clientId } = JSON.parse(window.sessionStorage.getItem(interactionKey) || "");
            if (clientId) {
                const cacheKey = `${_cache_CacheKeys_mjs__WEBPACK_IMPORTED_MODULE_4__.PREFIX}.${clientId}.${_utils_BrowserConstants_mjs__WEBPACK_IMPORTED_MODULE_1__.TemporaryCacheKeys.ORIGIN_URI}`;
                navigateToUrl = window.sessionStorage.getItem(cacheKey) || "";
            }
        }
        catch (e) {
            // SessionStorage access may fail in some contexts, use default
        }
        // Reconstruct full URL with auth response (preserve original format)
        let fullUrlResponse = "";
        if (hasResponseInHash && hasResponseInQuery) {
            // Hybrid format
            fullUrlResponse = `${urlQuery}${urlHash}`;
        }
        else if (hasResponseInHash) {
            // Hash only
            fullUrlResponse = urlHash;
        }
        else {
            // Query only
            fullUrlResponse = urlQuery;
        }
        const homepage = `${navigateToUrl || (0,_utils_BrowserUtils_mjs__WEBPACK_IMPORTED_MODULE_0__.getHomepage)()}${fullUrlResponse}`;
        await navClient.navigateInternal(homepage, navigationOptions);
        // Do NOT clear URL for redirect flow - we're navigating away anyway
        return;
    }
    // Clear only the part(s) containing the auth response from redirect bridge URL
    if (typeof window.history.replaceState === "function") {
        let newUrl = `${window.location.origin}${window.location.pathname}`;
        // Preserve hash if it didn't contain the response
        if (!hasResponseInHash && urlHash) {
            newUrl += urlHash;
        }
        // Preserve query if it didn't contain the response
        if (!hasResponseInQuery && urlQuery) {
            newUrl += urlQuery;
        }
        window.history.replaceState(null, "", newUrl);
    }
    // Send the raw URL payload to the main frame
    const channel = new BroadcastChannel(id);
    channel.postMessage({
        v: 1,
        payload,
    });
    channel.close();
    try {
        window.close();
    }
    catch { }
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./node_modules/@azure/msal-browser/dist/redirect-bridge/utils/BrowserConstants.mjs":
/*!******************************************************************************************!*\
  !*** ./node_modules/@azure/msal-browser/dist/redirect-bridge/utils/BrowserConstants.mjs ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiId: function() { return /* binding */ ApiId; },
/* harmony export */   InteractionType: function() { return /* binding */ InteractionType; },
/* harmony export */   TemporaryCacheKeys: function() { return /* binding */ TemporaryCacheKeys; }
/* harmony export */ });
/*! @azure/msal-browser v5.6.1 2026-03-19 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Temporary cache keys for MSAL, deleted after any request.
 */
const TemporaryCacheKeys = {
    ORIGIN_URI: "request.origin",
    URL_HASH: "urlHash",
    REQUEST_PARAMS: "request.params",
    VERIFIER: "code.verifier",
    INTERACTION_STATUS_KEY: "interaction.status",
    NATIVE_REQUEST: "request.native",
};
/**
 * API Codes for Telemetry purposes.
 * Before adding a new code you must claim it in the MSAL Telemetry tracker as these number spaces are shared across all MSALs
 * 0-99 Silent Flow
 * 800-899 Auth Code Flow
 * 900-999 Misc
 */
const ApiId = {
    handleRedirectPromise: 865};
/*
 * Interaction type of the API - used for state and telemetry
 */
var InteractionType;
(function (InteractionType) {
    InteractionType["Redirect"] = "redirect";
    InteractionType["Popup"] = "popup";
    InteractionType["Silent"] = "silent";
    InteractionType["None"] = "none";
})(InteractionType || (InteractionType = {}));


//# sourceMappingURL=BrowserConstants.mjs.map


/***/ }),

/***/ "./node_modules/@azure/msal-browser/dist/redirect-bridge/utils/BrowserUtils.mjs":
/*!**************************************************************************************!*\
  !*** ./node_modules/@azure/msal-browser/dist/redirect-bridge/utils/BrowserUtils.mjs ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHomepage: function() { return /* binding */ getHomepage; },
/* harmony export */   invoke: function() { return /* reexport safe */ _azure_msal_common_browser__WEBPACK_IMPORTED_MODULE_2__.invoke; },
/* harmony export */   invokeAsync: function() { return /* reexport safe */ _azure_msal_common_browser__WEBPACK_IMPORTED_MODULE_2__.invokeAsync; },
/* harmony export */   parseAuthResponseFromUrl: function() { return /* binding */ parseAuthResponseFromUrl; }
/* harmony export */ });
/* harmony import */ var _azure_msal_common_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @azure/msal-common/browser */ "./node_modules/@azure/msal-common/dist-browser/url/UrlString.mjs");
/* harmony import */ var _azure_msal_common_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @azure/msal-common/browser */ "./node_modules/@azure/msal-common/dist-browser/utils/ProtocolUtils.mjs");
/* harmony import */ var _azure_msal_common_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @azure/msal-common/browser */ "./node_modules/@azure/msal-common/dist-browser/utils/FunctionWrappers.mjs");
/* harmony import */ var _error_BrowserAuthError_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../error/BrowserAuthError.mjs */ "./node_modules/@azure/msal-browser/dist/redirect-bridge/error/BrowserAuthError.mjs");
/* harmony import */ var _error_BrowserAuthErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../error/BrowserAuthErrorCodes.mjs */ "./node_modules/@azure/msal-browser/dist/redirect-bridge/error/BrowserAuthErrorCodes.mjs");
/* harmony import */ var _encode_Base64Decode_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../encode/Base64Decode.mjs */ "./node_modules/@azure/msal-browser/dist/redirect-bridge/encode/Base64Decode.mjs");
/*! @azure/msal-browser v5.6.1 2026-03-19 */







/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Extracts and parses the authentication response from URL (hash and/or query string).
 * This is a shared utility used across multiple components in msal-browser.
 *
 * @returns {Object} An object containing the parsed state information and URL parameters.
 * @returns {URLSearchParams} params - The parsed URL parameters from the payload.
 * @returns {string} payload - The combined query string and hash content.
 * @returns {string} urlHash - The original URL hash.
 * @returns {string} urlQuery - The original URL query string.
 * @returns {LibraryStateObject} libraryState - The decoded library state from the state parameter.
 *
 * @throws {AuthError} If no authentication payload is found in the URL.
 * @throws {AuthError} If the state parameter is missing.
 * @throws {AuthError} If the state is missing required 'id' or 'meta' attributes.
 */
function parseAuthResponseFromUrl() {
    // Extract both hash and query string to support hybrid response format
    const urlHash = window.location.hash;
    const urlQuery = window.location.search;
    // Determine which part contains the auth response by checking for 'state' parameter
    let hasResponseInHash = false;
    let hasResponseInQuery = false;
    let payload = "";
    let params = undefined;
    if (urlHash && urlHash.length > 1) {
        const hashContent = urlHash.charAt(0) === "#" ? urlHash.substring(1) : urlHash;
        const hashParams = new URLSearchParams(hashContent);
        if (hashParams.has("state")) {
            hasResponseInHash = true;
            payload = hashContent;
            params = hashParams;
        }
    }
    if (urlQuery && urlQuery.length > 1) {
        const queryContent = urlQuery.charAt(0) === "?" ? urlQuery.substring(1) : urlQuery;
        const queryParams = new URLSearchParams(queryContent);
        if (queryParams.has("state")) {
            hasResponseInQuery = true;
            payload = queryContent;
            params = queryParams;
        }
    }
    // If response is in both, combine them (hybrid format)
    if (hasResponseInHash && hasResponseInQuery) {
        const queryContent = urlQuery.charAt(0) === "?" ? urlQuery.substring(1) : urlQuery;
        const hashContent = urlHash.charAt(0) === "#" ? urlHash.substring(1) : urlHash;
        payload = `${queryContent}${hashContent}`;
        params = new URLSearchParams(payload);
    }
    if (!payload || !params) {
        throw (0,_error_BrowserAuthError_mjs__WEBPACK_IMPORTED_MODULE_3__.createBrowserAuthError)(_error_BrowserAuthErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_4__.emptyResponse);
    }
    const state = params.get("state");
    if (!state) {
        throw (0,_error_BrowserAuthError_mjs__WEBPACK_IMPORTED_MODULE_3__.createBrowserAuthError)(_error_BrowserAuthErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_4__.noStateInHash);
    }
    const { libraryState } = _azure_msal_common_browser__WEBPACK_IMPORTED_MODULE_1__.parseRequestState(_encode_Base64Decode_mjs__WEBPACK_IMPORTED_MODULE_5__.base64Decode, state);
    const { id, meta } = libraryState;
    if (!id || !meta) {
        throw (0,_error_BrowserAuthError_mjs__WEBPACK_IMPORTED_MODULE_3__.createBrowserAuthError)(_error_BrowserAuthErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_4__.unableToParseState, "missing_library_state");
    }
    return {
        params,
        payload,
        urlHash,
        urlQuery,
        hasResponseInHash,
        hasResponseInQuery,
        libraryState: {
            id,
            meta,
        },
    };
}
/**
 * Gets the homepage url for the current window location.
 */
function getHomepage() {
    const currentUrl = new _azure_msal_common_browser__WEBPACK_IMPORTED_MODULE_0__.UrlString(window.location.href);
    const urlComponents = currentUrl.getUrlComponents();
    return `${urlComponents.Protocol}//${urlComponents.HostNameAndPort}/`;
}


//# sourceMappingURL=BrowserUtils.mjs.map


/***/ }),

/***/ "./node_modules/@azure/msal-common/dist-browser/error/AuthError.mjs":
/*!**************************************************************************!*\
  !*** ./node_modules/@azure/msal-common/dist-browser/error/AuthError.mjs ***!
  \**************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthError: function() { return /* binding */ AuthError; },
/* harmony export */   createAuthError: function() { return /* binding */ createAuthError; },
/* harmony export */   getDefaultErrorMessage: function() { return /* binding */ getDefaultErrorMessage; }
/* harmony export */ });
/*! @azure/msal-common v16.4.0 2026-03-18 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function getDefaultErrorMessage(code) {
    return `See https://aka.ms/msal.js.errors#${code} for details`;
}
/**
 * General error class thrown by the MSAL.js library.
 */
class AuthError extends Error {
    constructor(errorCode, errorMessage, suberror) {
        const message = errorMessage ||
            (errorCode ? getDefaultErrorMessage(errorCode) : "");
        const errorString = message ? `${errorCode}: ${message}` : errorCode;
        super(errorString);
        Object.setPrototypeOf(this, AuthError.prototype);
        this.errorCode = errorCode || "";
        this.errorMessage = message || "";
        this.subError = suberror || "";
        this.name = "AuthError";
    }
    setCorrelationId(correlationId) {
        this.correlationId = correlationId;
    }
}
function createAuthError(code, additionalMessage) {
    return new AuthError(code, additionalMessage || getDefaultErrorMessage(code));
}


//# sourceMappingURL=AuthError.mjs.map


/***/ }),

/***/ "./node_modules/@azure/msal-common/dist-browser/error/ClientAuthError.mjs":
/*!********************************************************************************!*\
  !*** ./node_modules/@azure/msal-common/dist-browser/error/ClientAuthError.mjs ***!
  \********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClientAuthError: function() { return /* binding */ ClientAuthError; },
/* harmony export */   createClientAuthError: function() { return /* binding */ createClientAuthError; }
/* harmony export */ });
/* harmony import */ var _AuthError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AuthError.mjs */ "./node_modules/@azure/msal-common/dist-browser/error/AuthError.mjs");
/*! @azure/msal-common v16.4.0 2026-03-18 */



/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * ClientAuthErrorMessage class containing string constants used by error codes and messages.
 */
/**
 * Error thrown when there is an error in the client code running on the browser.
 */
class ClientAuthError extends _AuthError_mjs__WEBPACK_IMPORTED_MODULE_0__.AuthError {
    constructor(errorCode, additionalMessage) {
        super(errorCode, additionalMessage);
        this.name = "ClientAuthError";
        Object.setPrototypeOf(this, ClientAuthError.prototype);
    }
}
function createClientAuthError(errorCode, additionalMessage) {
    return new ClientAuthError(errorCode, additionalMessage);
}


//# sourceMappingURL=ClientAuthError.mjs.map


/***/ }),

/***/ "./node_modules/@azure/msal-common/dist-browser/error/ClientAuthErrorCodes.mjs":
/*!*************************************************************************************!*\
  !*** ./node_modules/@azure/msal-common/dist-browser/error/ClientAuthErrorCodes.mjs ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authTimeNotFound: function() { return /* binding */ authTimeNotFound; },
/* harmony export */   authorizationCodeMissingFromServerResponse: function() { return /* binding */ authorizationCodeMissingFromServerResponse; },
/* harmony export */   bindingKeyNotRemoved: function() { return /* binding */ bindingKeyNotRemoved; },
/* harmony export */   cannotAppendScopeSet: function() { return /* binding */ cannotAppendScopeSet; },
/* harmony export */   cannotRemoveEmptyScope: function() { return /* binding */ cannotRemoveEmptyScope; },
/* harmony export */   clientInfoDecodingError: function() { return /* binding */ clientInfoDecodingError; },
/* harmony export */   clientInfoEmptyError: function() { return /* binding */ clientInfoEmptyError; },
/* harmony export */   emptyInputScopeSet: function() { return /* binding */ emptyInputScopeSet; },
/* harmony export */   endSessionEndpointNotSupported: function() { return /* binding */ endSessionEndpointNotSupported; },
/* harmony export */   endpointResolutionError: function() { return /* binding */ endpointResolutionError; },
/* harmony export */   hashNotDeserialized: function() { return /* binding */ hashNotDeserialized; },
/* harmony export */   invalidCacheEnvironment: function() { return /* binding */ invalidCacheEnvironment; },
/* harmony export */   invalidCacheRecord: function() { return /* binding */ invalidCacheRecord; },
/* harmony export */   invalidState: function() { return /* binding */ invalidState; },
/* harmony export */   keyIdMissing: function() { return /* binding */ keyIdMissing; },
/* harmony export */   maxAgeTranspired: function() { return /* binding */ maxAgeTranspired; },
/* harmony export */   methodNotImplemented: function() { return /* binding */ methodNotImplemented; },
/* harmony export */   misplacedResourceParam: function() { return /* binding */ misplacedResourceParam; },
/* harmony export */   multipleMatchingAppMetadata: function() { return /* binding */ multipleMatchingAppMetadata; },
/* harmony export */   multipleMatchingTokens: function() { return /* binding */ multipleMatchingTokens; },
/* harmony export */   nestedAppAuthBridgeDisabled: function() { return /* binding */ nestedAppAuthBridgeDisabled; },
/* harmony export */   networkError: function() { return /* binding */ networkError; },
/* harmony export */   noAccountFound: function() { return /* binding */ noAccountFound; },
/* harmony export */   noAccountInSilentRequest: function() { return /* binding */ noAccountInSilentRequest; },
/* harmony export */   noCryptoObject: function() { return /* binding */ noCryptoObject; },
/* harmony export */   noNetworkConnectivity: function() { return /* binding */ noNetworkConnectivity; },
/* harmony export */   nonceMismatch: function() { return /* binding */ nonceMismatch; },
/* harmony export */   nullOrEmptyToken: function() { return /* binding */ nullOrEmptyToken; },
/* harmony export */   openIdConfigError: function() { return /* binding */ openIdConfigError; },
/* harmony export */   platformBrokerError: function() { return /* binding */ platformBrokerError; },
/* harmony export */   requestCannotBeMade: function() { return /* binding */ requestCannotBeMade; },
/* harmony export */   resourceParameterRequired: function() { return /* binding */ resourceParameterRequired; },
/* harmony export */   stateMismatch: function() { return /* binding */ stateMismatch; },
/* harmony export */   stateNotFound: function() { return /* binding */ stateNotFound; },
/* harmony export */   tokenClaimsCnfRequiredForSignedJwt: function() { return /* binding */ tokenClaimsCnfRequiredForSignedJwt; },
/* harmony export */   tokenParsingError: function() { return /* binding */ tokenParsingError; },
/* harmony export */   tokenRefreshRequired: function() { return /* binding */ tokenRefreshRequired; },
/* harmony export */   unexpectedCredentialType: function() { return /* binding */ unexpectedCredentialType; },
/* harmony export */   userCanceled: function() { return /* binding */ userCanceled; }
/* harmony export */ });
/*! @azure/msal-common v16.4.0 2026-03-18 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const clientInfoDecodingError = "client_info_decoding_error";
const clientInfoEmptyError = "client_info_empty_error";
const tokenParsingError = "token_parsing_error";
const nullOrEmptyToken = "null_or_empty_token";
const endpointResolutionError = "endpoints_resolution_error";
const networkError = "network_error";
const openIdConfigError = "openid_config_error";
const hashNotDeserialized = "hash_not_deserialized";
const invalidState = "invalid_state";
const stateMismatch = "state_mismatch";
const stateNotFound = "state_not_found";
const nonceMismatch = "nonce_mismatch";
const authTimeNotFound = "auth_time_not_found";
const maxAgeTranspired = "max_age_transpired";
const multipleMatchingTokens = "multiple_matching_tokens";
const multipleMatchingAppMetadata = "multiple_matching_appMetadata";
const requestCannotBeMade = "request_cannot_be_made";
const cannotRemoveEmptyScope = "cannot_remove_empty_scope";
const cannotAppendScopeSet = "cannot_append_scopeset";
const emptyInputScopeSet = "empty_input_scopeset";
const noAccountInSilentRequest = "no_account_in_silent_request";
const invalidCacheRecord = "invalid_cache_record";
const invalidCacheEnvironment = "invalid_cache_environment";
const noAccountFound = "no_account_found";
const noCryptoObject = "no_crypto_object";
const unexpectedCredentialType = "unexpected_credential_type";
const tokenRefreshRequired = "token_refresh_required";
const tokenClaimsCnfRequiredForSignedJwt = "token_claims_cnf_required_for_signedjwt";
const authorizationCodeMissingFromServerResponse = "authorization_code_missing_from_server_response";
const bindingKeyNotRemoved = "binding_key_not_removed";
const endSessionEndpointNotSupported = "end_session_endpoint_not_supported";
const keyIdMissing = "key_id_missing";
const noNetworkConnectivity = "no_network_connectivity";
const userCanceled = "user_canceled";
const methodNotImplemented = "method_not_implemented";
const nestedAppAuthBridgeDisabled = "nested_app_auth_bridge_disabled";
const platformBrokerError = "platform_broker_error";
const resourceParameterRequired = "resource_parameter_required";
const misplacedResourceParam = "misplaced_resource_parameter";


//# sourceMappingURL=ClientAuthErrorCodes.mjs.map


/***/ }),

/***/ "./node_modules/@azure/msal-common/dist-browser/error/ClientConfigurationError.mjs":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@azure/msal-common/dist-browser/error/ClientConfigurationError.mjs ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClientConfigurationError: function() { return /* binding */ ClientConfigurationError; },
/* harmony export */   createClientConfigurationError: function() { return /* binding */ createClientConfigurationError; }
/* harmony export */ });
/* harmony import */ var _AuthError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AuthError.mjs */ "./node_modules/@azure/msal-common/dist-browser/error/AuthError.mjs");
/*! @azure/msal-common v16.4.0 2026-03-18 */



/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Error thrown when there is an error in configuration of the MSAL.js library.
 */
class ClientConfigurationError extends _AuthError_mjs__WEBPACK_IMPORTED_MODULE_0__.AuthError {
    constructor(errorCode) {
        super(errorCode);
        this.name = "ClientConfigurationError";
        Object.setPrototypeOf(this, ClientConfigurationError.prototype);
    }
}
function createClientConfigurationError(errorCode) {
    return new ClientConfigurationError(errorCode);
}


//# sourceMappingURL=ClientConfigurationError.mjs.map


/***/ }),

/***/ "./node_modules/@azure/msal-common/dist-browser/error/ClientConfigurationErrorCodes.mjs":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@azure/msal-common/dist-browser/error/ClientConfigurationErrorCodes.mjs ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authorityMismatch: function() { return /* binding */ authorityMismatch; },
/* harmony export */   authorityUriInsecure: function() { return /* binding */ authorityUriInsecure; },
/* harmony export */   cannotAllowPlatformBroker: function() { return /* binding */ cannotAllowPlatformBroker; },
/* harmony export */   cannotSetOIDCOptions: function() { return /* binding */ cannotSetOIDCOptions; },
/* harmony export */   claimsRequestParsingError: function() { return /* binding */ claimsRequestParsingError; },
/* harmony export */   emptyInputScopesError: function() { return /* binding */ emptyInputScopesError; },
/* harmony export */   invalidAuthenticationHeader: function() { return /* binding */ invalidAuthenticationHeader; },
/* harmony export */   invalidAuthorityMetadata: function() { return /* binding */ invalidAuthorityMetadata; },
/* harmony export */   invalidClaims: function() { return /* binding */ invalidClaims; },
/* harmony export */   invalidCloudDiscoveryMetadata: function() { return /* binding */ invalidCloudDiscoveryMetadata; },
/* harmony export */   invalidCodeChallengeMethod: function() { return /* binding */ invalidCodeChallengeMethod; },
/* harmony export */   invalidRequestMethodForEAR: function() { return /* binding */ invalidRequestMethodForEAR; },
/* harmony export */   logoutRequestEmpty: function() { return /* binding */ logoutRequestEmpty; },
/* harmony export */   missingNonceAuthenticationHeader: function() { return /* binding */ missingNonceAuthenticationHeader; },
/* harmony export */   missingSshJwk: function() { return /* binding */ missingSshJwk; },
/* harmony export */   missingSshKid: function() { return /* binding */ missingSshKid; },
/* harmony export */   pkceParamsMissing: function() { return /* binding */ pkceParamsMissing; },
/* harmony export */   redirectUriEmpty: function() { return /* binding */ redirectUriEmpty; },
/* harmony export */   tokenRequestEmpty: function() { return /* binding */ tokenRequestEmpty; },
/* harmony export */   untrustedAuthority: function() { return /* binding */ untrustedAuthority; },
/* harmony export */   urlEmptyError: function() { return /* binding */ urlEmptyError; },
/* harmony export */   urlParseError: function() { return /* binding */ urlParseError; }
/* harmony export */ });
/*! @azure/msal-common v16.4.0 2026-03-18 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const redirectUriEmpty = "redirect_uri_empty";
const claimsRequestParsingError = "claims_request_parsing_error";
const authorityUriInsecure = "authority_uri_insecure";
const urlParseError = "url_parse_error";
const urlEmptyError = "empty_url_error";
const emptyInputScopesError = "empty_input_scopes_error";
const invalidClaims = "invalid_claims";
const tokenRequestEmpty = "token_request_empty";
const logoutRequestEmpty = "logout_request_empty";
const invalidCodeChallengeMethod = "invalid_code_challenge_method";
const pkceParamsMissing = "pkce_params_missing";
const invalidCloudDiscoveryMetadata = "invalid_cloud_discovery_metadata";
const invalidAuthorityMetadata = "invalid_authority_metadata";
const untrustedAuthority = "untrusted_authority";
const missingSshJwk = "missing_ssh_jwk";
const missingSshKid = "missing_ssh_kid";
const missingNonceAuthenticationHeader = "missing_nonce_authentication_header";
const invalidAuthenticationHeader = "invalid_authentication_header";
const cannotSetOIDCOptions = "cannot_set_OIDCOptions";
const cannotAllowPlatformBroker = "cannot_allow_platform_broker";
const authorityMismatch = "authority_mismatch";
const invalidRequestMethodForEAR = "invalid_request_method_for_EAR";


//# sourceMappingURL=ClientConfigurationErrorCodes.mjs.map


/***/ }),

/***/ "./node_modules/@azure/msal-common/dist-browser/url/UrlString.mjs":
/*!************************************************************************!*\
  !*** ./node_modules/@azure/msal-common/dist-browser/url/UrlString.mjs ***!
  \************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UrlString: function() { return /* binding */ UrlString; }
/* harmony export */ });
/* harmony import */ var _error_ClientConfigurationError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error/ClientConfigurationError.mjs */ "./node_modules/@azure/msal-common/dist-browser/error/ClientConfigurationError.mjs");
/* harmony import */ var _utils_StringUtils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/StringUtils.mjs */ "./node_modules/@azure/msal-common/dist-browser/utils/StringUtils.mjs");
/* harmony import */ var _utils_Constants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Constants.mjs */ "./node_modules/@azure/msal-common/dist-browser/utils/Constants.mjs");
/* harmony import */ var _error_ClientConfigurationErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../error/ClientConfigurationErrorCodes.mjs */ "./node_modules/@azure/msal-common/dist-browser/error/ClientConfigurationErrorCodes.mjs");
/*! @azure/msal-common v16.4.0 2026-03-18 */






/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Url object class which can perform various transformations on url strings.
 */
class UrlString {
    get urlString() {
        return this._urlString;
    }
    constructor(url) {
        this._urlString = url;
        if (!this._urlString) {
            // Throws error if url is empty
            throw (0,_error_ClientConfigurationError_mjs__WEBPACK_IMPORTED_MODULE_0__.createClientConfigurationError)(_error_ClientConfigurationErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_3__.urlEmptyError);
        }
        if (!url.includes("#")) {
            this._urlString = UrlString.canonicalizeUri(url);
        }
    }
    /**
     * Ensure urls are lower case and end with a / character.
     * @param url
     */
    static canonicalizeUri(url) {
        if (url) {
            let lowerCaseUrl = url.toLowerCase();
            if (_utils_StringUtils_mjs__WEBPACK_IMPORTED_MODULE_1__.StringUtils.endsWith(lowerCaseUrl, "?")) {
                lowerCaseUrl = lowerCaseUrl.slice(0, -1);
            }
            else if (_utils_StringUtils_mjs__WEBPACK_IMPORTED_MODULE_1__.StringUtils.endsWith(lowerCaseUrl, "?/")) {
                lowerCaseUrl = lowerCaseUrl.slice(0, -2);
            }
            if (!_utils_StringUtils_mjs__WEBPACK_IMPORTED_MODULE_1__.StringUtils.endsWith(lowerCaseUrl, "/")) {
                lowerCaseUrl += "/";
            }
            return lowerCaseUrl;
        }
        return url;
    }
    /**
     * Throws if urlString passed is not a valid authority URI string.
     */
    validateAsUri() {
        // Attempts to parse url for uri components
        let components;
        try {
            components = this.getUrlComponents();
        }
        catch (e) {
            throw (0,_error_ClientConfigurationError_mjs__WEBPACK_IMPORTED_MODULE_0__.createClientConfigurationError)(_error_ClientConfigurationErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_3__.urlParseError);
        }
        // Throw error if URI or path segments are not parseable.
        if (!components.HostNameAndPort || !components.PathSegments) {
            throw (0,_error_ClientConfigurationError_mjs__WEBPACK_IMPORTED_MODULE_0__.createClientConfigurationError)(_error_ClientConfigurationErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_3__.urlParseError);
        }
        // Throw error if uri is insecure.
        if (!components.Protocol ||
            components.Protocol.toLowerCase() !== "https:") {
            throw (0,_error_ClientConfigurationError_mjs__WEBPACK_IMPORTED_MODULE_0__.createClientConfigurationError)(_error_ClientConfigurationErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_3__.authorityUriInsecure);
        }
    }
    /**
     * Given a url and a query string return the url with provided query string appended
     * @param url
     * @param queryString
     */
    static appendQueryString(url, queryString) {
        if (!queryString) {
            return url;
        }
        return url.indexOf("?") < 0
            ? `${url}?${queryString}`
            : `${url}&${queryString}`;
    }
    /**
     * Returns a url with the hash removed
     * @param url
     */
    static removeHashFromUrl(url) {
        return UrlString.canonicalizeUri(url.split("#")[0]);
    }
    /**
     * Given a url like https://a:b/common/d?e=f#g, and a tenantId, returns https://a:b/tenantId/d
     * @param href The url
     * @param tenantId The tenant id to replace
     */
    replaceTenantPath(tenantId) {
        const urlObject = this.getUrlComponents();
        const pathArray = urlObject.PathSegments;
        if (tenantId &&
            pathArray.length !== 0 &&
            (pathArray[0] === _utils_Constants_mjs__WEBPACK_IMPORTED_MODULE_2__.AADAuthority.COMMON ||
                pathArray[0] === _utils_Constants_mjs__WEBPACK_IMPORTED_MODULE_2__.AADAuthority.ORGANIZATIONS)) {
            pathArray[0] = tenantId;
        }
        return UrlString.constructAuthorityUriFromObject(urlObject);
    }
    /**
     * Parses out the components from a url string.
     * @returns An object with the various components. Please cache this value insted of calling this multiple times on the same url.
     */
    getUrlComponents() {
        // https://gist.github.com/curtisz/11139b2cfcaef4a261e0
        const regEx = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
        // If url string does not match regEx, we throw an error
        const match = this.urlString.match(regEx);
        if (!match) {
            throw (0,_error_ClientConfigurationError_mjs__WEBPACK_IMPORTED_MODULE_0__.createClientConfigurationError)(_error_ClientConfigurationErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_3__.urlParseError);
        }
        // Url component object
        const urlComponents = {
            Protocol: match[1],
            HostNameAndPort: match[4],
            AbsolutePath: match[5],
            QueryString: match[7],
        };
        let pathSegments = urlComponents.AbsolutePath.split("/");
        pathSegments = pathSegments.filter((val) => val && val.length > 0); // remove empty elements
        urlComponents.PathSegments = pathSegments;
        if (urlComponents.QueryString &&
            urlComponents.QueryString.endsWith("/")) {
            urlComponents.QueryString = urlComponents.QueryString.substring(0, urlComponents.QueryString.length - 1);
        }
        return urlComponents;
    }
    static getDomainFromUrl(url) {
        const regEx = RegExp("^([^:/?#]+://)?([^/?#]*)");
        const match = url.match(regEx);
        if (!match) {
            throw (0,_error_ClientConfigurationError_mjs__WEBPACK_IMPORTED_MODULE_0__.createClientConfigurationError)(_error_ClientConfigurationErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_3__.urlParseError);
        }
        return match[2];
    }
    static getAbsoluteUrl(relativeUrl, baseUrl) {
        if (relativeUrl[0] === _utils_Constants_mjs__WEBPACK_IMPORTED_MODULE_2__.FORWARD_SLASH) {
            const url = new UrlString(baseUrl);
            const baseComponents = url.getUrlComponents();
            return (baseComponents.Protocol +
                "//" +
                baseComponents.HostNameAndPort +
                relativeUrl);
        }
        return relativeUrl;
    }
    static constructAuthorityUriFromObject(urlObject) {
        return new UrlString(urlObject.Protocol +
            "//" +
            urlObject.HostNameAndPort +
            "/" +
            urlObject.PathSegments.join("/"));
    }
}


//# sourceMappingURL=UrlString.mjs.map


/***/ }),

/***/ "./node_modules/@azure/msal-common/dist-browser/utils/Constants.mjs":
/*!**************************************************************************!*\
  !*** ./node_modules/@azure/msal-common/dist-browser/utils/Constants.mjs ***!
  \**************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AADAuthority: function() { return /* binding */ AADAuthority; },
/* harmony export */   AAD_INSTANCE_DISCOVERY_ENDPT: function() { return /* binding */ AAD_INSTANCE_DISCOVERY_ENDPT; },
/* harmony export */   AAD_TENANT_DOMAIN_SUFFIX: function() { return /* binding */ AAD_TENANT_DOMAIN_SUFFIX; },
/* harmony export */   ADFS: function() { return /* binding */ ADFS; },
/* harmony export */   APP_METADATA: function() { return /* binding */ APP_METADATA; },
/* harmony export */   AUTHORITY_METADATA_CACHE_KEY: function() { return /* binding */ AUTHORITY_METADATA_CACHE_KEY; },
/* harmony export */   AUTHORITY_METADATA_REFRESH_TIME_SECONDS: function() { return /* binding */ AUTHORITY_METADATA_REFRESH_TIME_SECONDS; },
/* harmony export */   AUTHORIZATION_PENDING: function() { return /* binding */ AUTHORIZATION_PENDING; },
/* harmony export */   AZURE_REGION_AUTO_DISCOVER_FLAG: function() { return /* binding */ AZURE_REGION_AUTO_DISCOVER_FLAG; },
/* harmony export */   AuthenticationScheme: function() { return /* binding */ AuthenticationScheme; },
/* harmony export */   AuthorityMetadataSource: function() { return /* binding */ AuthorityMetadataSource; },
/* harmony export */   CACHE_ACCOUNT_TYPE_ADFS: function() { return /* binding */ CACHE_ACCOUNT_TYPE_ADFS; },
/* harmony export */   CACHE_ACCOUNT_TYPE_GENERIC: function() { return /* binding */ CACHE_ACCOUNT_TYPE_GENERIC; },
/* harmony export */   CACHE_ACCOUNT_TYPE_MSAV1: function() { return /* binding */ CACHE_ACCOUNT_TYPE_MSAV1; },
/* harmony export */   CACHE_ACCOUNT_TYPE_MSSTS: function() { return /* binding */ CACHE_ACCOUNT_TYPE_MSSTS; },
/* harmony export */   CACHE_KEY_SEPARATOR: function() { return /* binding */ CACHE_KEY_SEPARATOR; },
/* harmony export */   CIAM_AUTH_URL: function() { return /* binding */ CIAM_AUTH_URL; },
/* harmony export */   CLIENT_INFO: function() { return /* binding */ CLIENT_INFO; },
/* harmony export */   CLIENT_INFO_SEPARATOR: function() { return /* binding */ CLIENT_INFO_SEPARATOR; },
/* harmony export */   CLIENT_MISMATCH_ERROR: function() { return /* binding */ CLIENT_MISMATCH_ERROR; },
/* harmony export */   CODE_GRANT_TYPE: function() { return /* binding */ CODE_GRANT_TYPE; },
/* harmony export */   CONSUMER_UTID: function() { return /* binding */ CONSUMER_UTID; },
/* harmony export */   CacheOutcome: function() { return /* binding */ CacheOutcome; },
/* harmony export */   CacheType: function() { return /* binding */ CacheType; },
/* harmony export */   ClaimsRequestKeys: function() { return /* binding */ ClaimsRequestKeys; },
/* harmony export */   CodeChallengeMethodValues: function() { return /* binding */ CodeChallengeMethodValues; },
/* harmony export */   CredentialType: function() { return /* binding */ CredentialType; },
/* harmony export */   DEFAULT_AUTHORITY: function() { return /* binding */ DEFAULT_AUTHORITY; },
/* harmony export */   DEFAULT_AUTHORITY_HOST: function() { return /* binding */ DEFAULT_AUTHORITY_HOST; },
/* harmony export */   DEFAULT_COMMON_TENANT: function() { return /* binding */ DEFAULT_COMMON_TENANT; },
/* harmony export */   DEFAULT_MAX_THROTTLE_TIME_SECONDS: function() { return /* binding */ DEFAULT_MAX_THROTTLE_TIME_SECONDS; },
/* harmony export */   DEFAULT_THROTTLE_TIME_SECONDS: function() { return /* binding */ DEFAULT_THROTTLE_TIME_SECONDS; },
/* harmony export */   DEFAULT_TOKEN_RENEWAL_OFFSET_SEC: function() { return /* binding */ DEFAULT_TOKEN_RENEWAL_OFFSET_SEC; },
/* harmony export */   DSTS: function() { return /* binding */ DSTS; },
/* harmony export */   EMAIL_SCOPE: function() { return /* binding */ EMAIL_SCOPE; },
/* harmony export */   EncodingTypes: function() { return /* binding */ EncodingTypes; },
/* harmony export */   FORWARD_SLASH: function() { return /* binding */ FORWARD_SLASH; },
/* harmony export */   GrantType: function() { return /* binding */ GrantType; },
/* harmony export */   HTTP_BAD_REQUEST: function() { return /* binding */ HTTP_BAD_REQUEST; },
/* harmony export */   HTTP_CLIENT_ERROR: function() { return /* binding */ HTTP_CLIENT_ERROR; },
/* harmony export */   HTTP_CLIENT_ERROR_RANGE_END: function() { return /* binding */ HTTP_CLIENT_ERROR_RANGE_END; },
/* harmony export */   HTTP_CLIENT_ERROR_RANGE_START: function() { return /* binding */ HTTP_CLIENT_ERROR_RANGE_START; },
/* harmony export */   HTTP_GATEWAY_TIMEOUT: function() { return /* binding */ HTTP_GATEWAY_TIMEOUT; },
/* harmony export */   HTTP_GONE: function() { return /* binding */ HTTP_GONE; },
/* harmony export */   HTTP_MULTI_SIDED_ERROR: function() { return /* binding */ HTTP_MULTI_SIDED_ERROR; },
/* harmony export */   HTTP_NOT_FOUND: function() { return /* binding */ HTTP_NOT_FOUND; },
/* harmony export */   HTTP_REDIRECT: function() { return /* binding */ HTTP_REDIRECT; },
/* harmony export */   HTTP_REQUEST_TIMEOUT: function() { return /* binding */ HTTP_REQUEST_TIMEOUT; },
/* harmony export */   HTTP_SERVER_ERROR: function() { return /* binding */ HTTP_SERVER_ERROR; },
/* harmony export */   HTTP_SERVER_ERROR_RANGE_END: function() { return /* binding */ HTTP_SERVER_ERROR_RANGE_END; },
/* harmony export */   HTTP_SERVER_ERROR_RANGE_START: function() { return /* binding */ HTTP_SERVER_ERROR_RANGE_START; },
/* harmony export */   HTTP_SERVICE_UNAVAILABLE: function() { return /* binding */ HTTP_SERVICE_UNAVAILABLE; },
/* harmony export */   HTTP_SUCCESS: function() { return /* binding */ HTTP_SUCCESS; },
/* harmony export */   HTTP_SUCCESS_RANGE_END: function() { return /* binding */ HTTP_SUCCESS_RANGE_END; },
/* harmony export */   HTTP_SUCCESS_RANGE_START: function() { return /* binding */ HTTP_SUCCESS_RANGE_START; },
/* harmony export */   HTTP_TOO_MANY_REQUESTS: function() { return /* binding */ HTTP_TOO_MANY_REQUESTS; },
/* harmony export */   HTTP_UNAUTHORIZED: function() { return /* binding */ HTTP_UNAUTHORIZED; },
/* harmony export */   HeaderNames: function() { return /* binding */ HeaderNames; },
/* harmony export */   HttpMethod: function() { return /* binding */ HttpMethod; },
/* harmony export */   IMDS_ENDPOINT: function() { return /* binding */ IMDS_ENDPOINT; },
/* harmony export */   IMDS_TIMEOUT: function() { return /* binding */ IMDS_TIMEOUT; },
/* harmony export */   IMDS_VERSION: function() { return /* binding */ IMDS_VERSION; },
/* harmony export */   INVALID_GRANT_ERROR: function() { return /* binding */ INVALID_GRANT_ERROR; },
/* harmony export */   INVALID_INSTANCE: function() { return /* binding */ INVALID_INSTANCE; },
/* harmony export */   JsonWebTokenTypes: function() { return /* binding */ JsonWebTokenTypes; },
/* harmony export */   KNOWN_PUBLIC_CLOUDS: function() { return /* binding */ KNOWN_PUBLIC_CLOUDS; },
/* harmony export */   NOT_APPLICABLE: function() { return /* binding */ NOT_APPLICABLE; },
/* harmony export */   NOT_AVAILABLE: function() { return /* binding */ NOT_AVAILABLE; },
/* harmony export */   OAuthResponseType: function() { return /* binding */ OAuthResponseType; },
/* harmony export */   OFFLINE_ACCESS_SCOPE: function() { return /* binding */ OFFLINE_ACCESS_SCOPE; },
/* harmony export */   OIDC_DEFAULT_SCOPES: function() { return /* binding */ OIDC_DEFAULT_SCOPES; },
/* harmony export */   OIDC_SCOPES: function() { return /* binding */ OIDC_SCOPES; },
/* harmony export */   ONE_DAY_IN_MS: function() { return /* binding */ ONE_DAY_IN_MS; },
/* harmony export */   OPENID_SCOPE: function() { return /* binding */ OPENID_SCOPE; },
/* harmony export */   PROFILE_SCOPE: function() { return /* binding */ PROFILE_SCOPE; },
/* harmony export */   PasswordGrantConstants: function() { return /* binding */ PasswordGrantConstants; },
/* harmony export */   PersistentCacheKeys: function() { return /* binding */ PersistentCacheKeys; },
/* harmony export */   PromptValue: function() { return /* binding */ PromptValue; },
/* harmony export */   REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX: function() { return /* binding */ REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX; },
/* harmony export */   RESOURCE_DELIM: function() { return /* binding */ RESOURCE_DELIM; },
/* harmony export */   RegionDiscoveryOutcomes: function() { return /* binding */ RegionDiscoveryOutcomes; },
/* harmony export */   RegionDiscoverySources: function() { return /* binding */ RegionDiscoverySources; },
/* harmony export */   ResponseMode: function() { return /* binding */ ResponseMode; },
/* harmony export */   S256_CODE_CHALLENGE_METHOD: function() { return /* binding */ S256_CODE_CHALLENGE_METHOD; },
/* harmony export */   SERVER_TELEM_CACHE_KEY: function() { return /* binding */ SERVER_TELEM_CACHE_KEY; },
/* harmony export */   SERVER_TELEM_CATEGORY_SEPARATOR: function() { return /* binding */ SERVER_TELEM_CATEGORY_SEPARATOR; },
/* harmony export */   SERVER_TELEM_MAX_CACHED_ERRORS: function() { return /* binding */ SERVER_TELEM_MAX_CACHED_ERRORS; },
/* harmony export */   SERVER_TELEM_MAX_CUR_HEADER_BYTES: function() { return /* binding */ SERVER_TELEM_MAX_CUR_HEADER_BYTES; },
/* harmony export */   SERVER_TELEM_MAX_LAST_HEADER_BYTES: function() { return /* binding */ SERVER_TELEM_MAX_LAST_HEADER_BYTES; },
/* harmony export */   SERVER_TELEM_OVERFLOW_FALSE: function() { return /* binding */ SERVER_TELEM_OVERFLOW_FALSE; },
/* harmony export */   SERVER_TELEM_OVERFLOW_TRUE: function() { return /* binding */ SERVER_TELEM_OVERFLOW_TRUE; },
/* harmony export */   SERVER_TELEM_SCHEMA_VERSION: function() { return /* binding */ SERVER_TELEM_SCHEMA_VERSION; },
/* harmony export */   SERVER_TELEM_UNKNOWN_ERROR: function() { return /* binding */ SERVER_TELEM_UNKNOWN_ERROR; },
/* harmony export */   SERVER_TELEM_VALUE_SEPARATOR: function() { return /* binding */ SERVER_TELEM_VALUE_SEPARATOR; },
/* harmony export */   SHR_NONCE_VALIDITY: function() { return /* binding */ SHR_NONCE_VALIDITY; },
/* harmony export */   SKU: function() { return /* binding */ SKU; },
/* harmony export */   THE_FAMILY_ID: function() { return /* binding */ THE_FAMILY_ID; },
/* harmony export */   THROTTLING_PREFIX: function() { return /* binding */ THROTTLING_PREFIX; },
/* harmony export */   URL_FORM_CONTENT_TYPE: function() { return /* binding */ URL_FORM_CONTENT_TYPE; },
/* harmony export */   X_MS_LIB_CAPABILITY_VALUE: function() { return /* binding */ X_MS_LIB_CAPABILITY_VALUE; }
/* harmony export */ });
/*! @azure/msal-common v16.4.0 2026-03-18 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const SKU = "msal.js.common";
// default authority
const DEFAULT_AUTHORITY = "https://login.microsoftonline.com/common/";
const DEFAULT_AUTHORITY_HOST = "login.microsoftonline.com";
const DEFAULT_COMMON_TENANT = "common";
// ADFS String
const ADFS = "adfs";
const DSTS = "dstsv2";
// Default AAD Instance Discovery Endpoint
const AAD_INSTANCE_DISCOVERY_ENDPT = `${DEFAULT_AUTHORITY}discovery/instance?api-version=1.1&authorization_endpoint=`;
// CIAM URL
const CIAM_AUTH_URL = ".ciamlogin.com";
const AAD_TENANT_DOMAIN_SUFFIX = ".onmicrosoft.com";
// Resource delimiter - used for certain cache entries
const RESOURCE_DELIM = "|";
// Consumer UTID
const CONSUMER_UTID = "9188040d-6c67-4c5b-b112-36a304b66dad";
// Default scopes
const OPENID_SCOPE = "openid";
const PROFILE_SCOPE = "profile";
const OFFLINE_ACCESS_SCOPE = "offline_access";
const EMAIL_SCOPE = "email";
const CODE_GRANT_TYPE = "authorization_code";
const S256_CODE_CHALLENGE_METHOD = "S256";
const URL_FORM_CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";
const AUTHORIZATION_PENDING = "authorization_pending";
const NOT_APPLICABLE = "N/A";
const NOT_AVAILABLE = "Not Available";
const FORWARD_SLASH = "/";
const IMDS_ENDPOINT = "http://169.254.169.254/metadata/instance/compute/location";
const IMDS_VERSION = "2020-06-01";
const IMDS_TIMEOUT = 2000;
const AZURE_REGION_AUTO_DISCOVER_FLAG = "TryAutoDetect";
const REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX = "login.microsoft.com";
const KNOWN_PUBLIC_CLOUDS = [
    "login.microsoftonline.com",
    "login.windows.net",
    "login.microsoft.com",
    "sts.windows.net",
];
const SHR_NONCE_VALIDITY = 240;
const INVALID_INSTANCE = "invalid_instance";
const HTTP_SUCCESS = 200;
const HTTP_SUCCESS_RANGE_START = 200;
const HTTP_SUCCESS_RANGE_END = 299;
const HTTP_REDIRECT = 302;
const HTTP_CLIENT_ERROR = 400;
const HTTP_CLIENT_ERROR_RANGE_START = 400;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;
const HTTP_NOT_FOUND = 404;
const HTTP_REQUEST_TIMEOUT = 408;
const HTTP_GONE = 410;
const HTTP_TOO_MANY_REQUESTS = 429;
const HTTP_CLIENT_ERROR_RANGE_END = 499;
const HTTP_SERVER_ERROR = 500;
const HTTP_SERVER_ERROR_RANGE_START = 500;
const HTTP_SERVICE_UNAVAILABLE = 503;
const HTTP_GATEWAY_TIMEOUT = 504;
const HTTP_SERVER_ERROR_RANGE_END = 599;
const HTTP_MULTI_SIDED_ERROR = 600;
const HttpMethod = {
    GET: "GET",
    POST: "POST",
};
const OIDC_DEFAULT_SCOPES = [
    OPENID_SCOPE,
    PROFILE_SCOPE,
    OFFLINE_ACCESS_SCOPE,
];
const OIDC_SCOPES = [...OIDC_DEFAULT_SCOPES, EMAIL_SCOPE];
/**
 * Request header names
 */
const HeaderNames = {
    CONTENT_TYPE: "Content-Type",
    CONTENT_LENGTH: "Content-Length",
    RETRY_AFTER: "Retry-After",
    CCS_HEADER: "X-AnchorMailbox",
    WWWAuthenticate: "WWW-Authenticate",
    AuthenticationInfo: "Authentication-Info",
    X_MS_REQUEST_ID: "x-ms-request-id",
    X_MS_HTTP_VERSION: "x-ms-httpver",
};
/**
 * Persistent cache keys MSAL which stay while user is logged in.
 */
const PersistentCacheKeys = {
    ACTIVE_ACCOUNT_FILTERS: "active-account-filters", // new cache entry for active_account for a more robust version for browser
};
/**
 * String constants related to AAD Authority
 */
const AADAuthority = {
    COMMON: "common",
    ORGANIZATIONS: "organizations",
    CONSUMERS: "consumers",
};
/**
 * Claims request keys
 */
const ClaimsRequestKeys = {
    ACCESS_TOKEN: "access_token",
    XMS_CC: "xms_cc",
};
/**
 * we considered making this "enum" in the request instead of string, however it looks like the allowed list of
 * prompt values kept changing over past couple of years. There are some undocumented prompt values for some
 * internal partners too, hence the choice of generic "string" type instead of the "enum"
 */
const PromptValue = {
    LOGIN: "login",
    SELECT_ACCOUNT: "select_account",
    CONSENT: "consent",
    NONE: "none",
    CREATE: "create",
    NO_SESSION: "no_session",
};
/**
 * allowed values for codeVerifier
 */
const CodeChallengeMethodValues = {
    PLAIN: "plain",
    S256: "S256",
};
/**
 * Allowed values for response_type
 */
const OAuthResponseType = {
    CODE: "code",
    IDTOKEN_TOKEN: "id_token token",
    IDTOKEN_TOKEN_REFRESHTOKEN: "id_token token refresh_token",
};
/**
 * allowed values for response_mode
 */
const ResponseMode = {
    QUERY: "query",
    FRAGMENT: "fragment",
    FORM_POST: "form_post",
};
/**
 * allowed grant_type
 */
const GrantType = {
    IMPLICIT_GRANT: "implicit",
    AUTHORIZATION_CODE_GRANT: "authorization_code",
    CLIENT_CREDENTIALS_GRANT: "client_credentials",
    RESOURCE_OWNER_PASSWORD_GRANT: "password",
    REFRESH_TOKEN_GRANT: "refresh_token",
    DEVICE_CODE_GRANT: "device_code",
    JWT_BEARER: "urn:ietf:params:oauth:grant-type:jwt-bearer",
};
/**
 * Account types in Cache
 */
const CACHE_ACCOUNT_TYPE_MSSTS = "MSSTS";
const CACHE_ACCOUNT_TYPE_ADFS = "ADFS";
const CACHE_ACCOUNT_TYPE_MSAV1 = "MSA";
const CACHE_ACCOUNT_TYPE_GENERIC = "Generic";
/**
 * Separators used in cache
 */
const CACHE_KEY_SEPARATOR = "-";
const CLIENT_INFO_SEPARATOR = ".";
/**
 * Credential Type stored in the cache
 */
const CredentialType = {
    ID_TOKEN: "IdToken",
    ACCESS_TOKEN: "AccessToken",
    ACCESS_TOKEN_WITH_AUTH_SCHEME: "AccessToken_With_AuthScheme",
    REFRESH_TOKEN: "RefreshToken",
};
/**
 * Combine all cache types
 */
const CacheType = {
    ADFS: 1001,
    MSA: 1002,
    MSSTS: 1003,
    GENERIC: 1004,
    ACCESS_TOKEN: 2001,
    REFRESH_TOKEN: 2002,
    ID_TOKEN: 2003,
    APP_METADATA: 3001,
    UNDEFINED: 9999,
};
/**
 * More Cache related constants
 */
const APP_METADATA = "appmetadata";
const CLIENT_INFO = "client_info";
const THE_FAMILY_ID = "1";
const AUTHORITY_METADATA_CACHE_KEY = "authority-metadata";
const AUTHORITY_METADATA_REFRESH_TIME_SECONDS = 3600 * 24; // 24 Hours
const AuthorityMetadataSource = {
    CONFIG: "config",
    CACHE: "cache",
    NETWORK: "network",
    HARDCODED_VALUES: "hardcoded_values",
};
const SERVER_TELEM_SCHEMA_VERSION = 5;
const SERVER_TELEM_MAX_CUR_HEADER_BYTES = 80; // ESTS limit is 100B, set to 80 to provide a 20B buffer
const SERVER_TELEM_MAX_LAST_HEADER_BYTES = 330; // ESTS limit is 350B, set to 330 to provide a 20B buffer,
const SERVER_TELEM_MAX_CACHED_ERRORS = 50; // Limit the number of errors that can be stored to prevent uncontrolled size gains
const SERVER_TELEM_CACHE_KEY = "server-telemetry";
const SERVER_TELEM_CATEGORY_SEPARATOR = "|";
const SERVER_TELEM_VALUE_SEPARATOR = ",";
const SERVER_TELEM_OVERFLOW_TRUE = "1";
const SERVER_TELEM_OVERFLOW_FALSE = "0";
const SERVER_TELEM_UNKNOWN_ERROR = "unknown_error";
/**
 * Type of the authentication request
 */
const AuthenticationScheme = {
    BEARER: "Bearer",
    POP: "pop",
    SSH: "ssh-cert",
};
/**
 * Constants related to throttling
 */
const DEFAULT_THROTTLE_TIME_SECONDS = 60;
// Default maximum time to throttle in seconds, overrides what the server sends back
const DEFAULT_MAX_THROTTLE_TIME_SECONDS = 3600;
// Prefix for storing throttling entries
const THROTTLING_PREFIX = "throttling";
// Value assigned to the x-ms-lib-capability header to indicate to the server the library supports throttling
const X_MS_LIB_CAPABILITY_VALUE = "retry-after, h429";
/**
 * Errors
 */
const INVALID_GRANT_ERROR = "invalid_grant";
const CLIENT_MISMATCH_ERROR = "client_mismatch";
/**
 * Password grant parameters
 */
const PasswordGrantConstants = {
    username: "username",
    password: "password",
};
/**
 * Region Discovery Sources
 */
const RegionDiscoverySources = {
    FAILED_AUTO_DETECTION: "1",
    INTERNAL_CACHE: "2",
    ENVIRONMENT_VARIABLE: "3",
    IMDS: "4",
};
/**
 * Region Discovery Outcomes
 */
const RegionDiscoveryOutcomes = {
    CONFIGURED_MATCHES_DETECTED: "1",
    CONFIGURED_NO_AUTO_DETECTION: "2",
    CONFIGURED_NOT_DETECTED: "3",
    AUTO_DETECTION_REQUESTED_SUCCESSFUL: "4",
    AUTO_DETECTION_REQUESTED_FAILED: "5",
};
/**
 * Specifies the reason for fetching the access token from the identity provider
 */
const CacheOutcome = {
    // When a token is found in the cache or the cache is not supposed to be hit when making the request
    NOT_APPLICABLE: "0",
    // When the token request goes to the identity provider because force_refresh was set to true. Also occurs if claims were requested
    FORCE_REFRESH_OR_CLAIMS: "1",
    // When the token request goes to the identity provider because no cached access token exists
    NO_CACHED_ACCESS_TOKEN: "2",
    // When the token request goes to the identity provider because cached access token expired
    CACHED_ACCESS_TOKEN_EXPIRED: "3",
    // When the token request goes to the identity provider because refresh_in was used and the existing token needs to be refreshed
    PROACTIVELY_REFRESHED: "4",
};
const JsonWebTokenTypes = {
    Jwt: "JWT",
    Jwk: "JWK",
    Pop: "pop",
};
const ONE_DAY_IN_MS = 86400000;
// Token renewal offset default in seconds
const DEFAULT_TOKEN_RENEWAL_OFFSET_SEC = 300;
const EncodingTypes = {
    BASE64: "base64",
    HEX: "hex",
    UTF8: "utf-8",
};


//# sourceMappingURL=Constants.mjs.map


/***/ }),

/***/ "./node_modules/@azure/msal-common/dist-browser/utils/FunctionWrappers.mjs":
/*!*********************************************************************************!*\
  !*** ./node_modules/@azure/msal-common/dist-browser/utils/FunctionWrappers.mjs ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   invoke: function() { return /* binding */ invoke; },
/* harmony export */   invokeAsync: function() { return /* binding */ invokeAsync; }
/* harmony export */ });
/*! @azure/msal-common v16.4.0 2026-03-18 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Wraps a function with a performance measurement.
 * Usage: invoke(functionToCall, performanceClient, "EventName", "correlationId")(...argsToPassToFunction)
 * @param callback
 * @param eventName
 * @param logger
 * @param telemetryClient
 * @param correlationId
 * @returns
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const invoke = (callback, eventName, logger, telemetryClient, correlationId) => {
    return (...args) => {
        logger.trace("1plfzx", correlationId);
        const inProgressEvent = telemetryClient.startMeasurement(eventName, correlationId);
        if (correlationId) {
            // Track number of times this API is called in a single request
            telemetryClient.incrementFields({ [`ext.${eventName}CallCount`]: 1 }, correlationId);
        }
        try {
            const result = callback(...args);
            inProgressEvent.end({
                success: true,
            });
            logger.trace("1g8n6a", correlationId);
            return result;
        }
        catch (e) {
            logger.trace("0cfd8i", correlationId);
            try {
                logger.trace(JSON.stringify(e), correlationId);
            }
            catch (e) {
                logger.trace("00dty7", correlationId);
            }
            inProgressEvent.end({
                success: false,
            }, e);
            throw e;
        }
    };
};
/**
 * Wraps an async function with a performance measurement.
 * Usage: invokeAsync(functionToCall, performanceClient, "EventName", "correlationId")(...argsToPassToFunction)
 * @param callback
 * @param eventName
 * @param logger
 * @param telemetryClient
 * @param correlationId
 * @returns
 * @internal
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const invokeAsync = (callback, eventName, logger, telemetryClient, correlationId) => {
    return (...args) => {
        logger.trace("1plfzx", correlationId);
        const inProgressEvent = telemetryClient.startMeasurement(eventName, correlationId);
        if (correlationId) {
            // Track number of times this API is called in a single request
            telemetryClient.incrementFields({ [`ext.${eventName}CallCount`]: 1 }, correlationId);
        }
        return callback(...args)
            .then((response) => {
            logger.trace("1g8n6a", correlationId);
            inProgressEvent.end({
                success: true,
            });
            return response;
        })
            .catch((e) => {
            logger.trace("0cfd8i", correlationId);
            try {
                logger.trace(JSON.stringify(e), correlationId);
            }
            catch (e) {
                logger.trace("00dty7", correlationId);
            }
            inProgressEvent.end({
                success: false,
            }, e);
            throw e;
        });
    };
};


//# sourceMappingURL=FunctionWrappers.mjs.map


/***/ }),

/***/ "./node_modules/@azure/msal-common/dist-browser/utils/ProtocolUtils.mjs":
/*!******************************************************************************!*\
  !*** ./node_modules/@azure/msal-common/dist-browser/utils/ProtocolUtils.mjs ***!
  \******************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateLibraryState: function() { return /* binding */ generateLibraryState; },
/* harmony export */   parseRequestState: function() { return /* binding */ parseRequestState; },
/* harmony export */   setRequestState: function() { return /* binding */ setRequestState; }
/* harmony export */ });
/* harmony import */ var _Constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants.mjs */ "./node_modules/@azure/msal-common/dist-browser/utils/Constants.mjs");
/* harmony import */ var _error_ClientAuthError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../error/ClientAuthError.mjs */ "./node_modules/@azure/msal-common/dist-browser/error/ClientAuthError.mjs");
/* harmony import */ var _error_ClientAuthErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../error/ClientAuthErrorCodes.mjs */ "./node_modules/@azure/msal-common/dist-browser/error/ClientAuthErrorCodes.mjs");
/*! @azure/msal-common v16.4.0 2026-03-18 */





/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Appends user state with random guid, or returns random guid.
 * @param cryptoObj
 * @param userState
 * @param meta
 */
function setRequestState(cryptoObj, userState, meta) {
    const libraryState = generateLibraryState(cryptoObj, meta);
    return userState
        ? `${libraryState}${_Constants_mjs__WEBPACK_IMPORTED_MODULE_0__.RESOURCE_DELIM}${userState}`
        : libraryState;
}
/**
 * Generates the state value used by the common library.
 * @param cryptoObj
 * @param meta
 */
function generateLibraryState(cryptoObj, meta) {
    if (!cryptoObj) {
        throw (0,_error_ClientAuthError_mjs__WEBPACK_IMPORTED_MODULE_1__.createClientAuthError)(_error_ClientAuthErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_2__.noCryptoObject);
    }
    // Create a state object containing a unique id and the timestamp of the request creation
    const stateObj = {
        id: cryptoObj.createNewGuid(),
    };
    if (meta) {
        stateObj.meta = meta;
    }
    const stateString = JSON.stringify(stateObj);
    return cryptoObj.base64Encode(stateString);
}
/**
 * Parses the state into the RequestStateObject, which contains the LibraryState info and the state passed by the user.
 * @param base64Decode
 * @param state
 */
function parseRequestState(base64Decode, state) {
    if (!base64Decode) {
        throw (0,_error_ClientAuthError_mjs__WEBPACK_IMPORTED_MODULE_1__.createClientAuthError)(_error_ClientAuthErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_2__.noCryptoObject);
    }
    if (!state) {
        throw (0,_error_ClientAuthError_mjs__WEBPACK_IMPORTED_MODULE_1__.createClientAuthError)(_error_ClientAuthErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_2__.invalidState);
    }
    try {
        // Split the state between library state and user passed state and decode them separately
        const splitState = state.split(_Constants_mjs__WEBPACK_IMPORTED_MODULE_0__.RESOURCE_DELIM);
        const libraryState = splitState[0];
        const userState = splitState.length > 1
            ? splitState.slice(1).join(_Constants_mjs__WEBPACK_IMPORTED_MODULE_0__.RESOURCE_DELIM)
            : "";
        const libraryStateString = base64Decode(libraryState);
        const libraryStateObj = JSON.parse(libraryStateString);
        return {
            userRequestState: userState || "",
            libraryState: libraryStateObj,
        };
    }
    catch (e) {
        throw (0,_error_ClientAuthError_mjs__WEBPACK_IMPORTED_MODULE_1__.createClientAuthError)(_error_ClientAuthErrorCodes_mjs__WEBPACK_IMPORTED_MODULE_2__.invalidState);
    }
}


//# sourceMappingURL=ProtocolUtils.mjs.map


/***/ }),

/***/ "./node_modules/@azure/msal-common/dist-browser/utils/StringUtils.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/@azure/msal-common/dist-browser/utils/StringUtils.mjs ***!
  \****************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StringUtils: function() { return /* binding */ StringUtils; }
/* harmony export */ });
/*! @azure/msal-common v16.4.0 2026-03-18 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * @hidden
 */
class StringUtils {
    /**
     * Check if stringified object is empty
     * @param strObj
     */
    static isEmptyObj(strObj) {
        if (strObj) {
            try {
                const obj = JSON.parse(strObj);
                return Object.keys(obj).length === 0;
            }
            catch (e) { }
        }
        return true;
    }
    static startsWith(str, search) {
        return str.indexOf(search) === 0;
    }
    static endsWith(str, search) {
        return (str.length >= search.length &&
            str.lastIndexOf(search) === str.length - search.length);
    }
    /**
     * Parses string into an object.
     *
     * @param query
     */
    static queryStringToObject(query) {
        const obj = {};
        const params = query.split("&");
        const decode = (s) => decodeURIComponent(s.replace(/\+/g, " "));
        params.forEach((pair) => {
            if (pair.trim()) {
                const [key, value] = pair.split(/=(.+)/g, 2); // Split on the first occurence of the '=' character
                if (key && value) {
                    obj[decode(key)] = decode(value);
                }
            }
        });
        return obj;
    }
    /**
     * Trims entries in an array.
     *
     * @param arr
     */
    static trimArrayEntries(arr) {
        return arr.map((entry) => entry.trim());
    }
    /**
     * Removes empty strings from array
     * @param arr
     */
    static removeEmptyStringsFromArray(arr) {
        return arr.filter((entry) => {
            return !!entry;
        });
    }
    /**
     * Attempts to parse a string into JSON
     * @param str
     */
    static jsonParseHelper(str) {
        try {
            return JSON.parse(str);
        }
        catch (e) {
            return null;
        }
    }
}


//# sourceMappingURL=StringUtils.mjs.map


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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {
/*!***************************************!*\
  !*** ./src/scripts/pages/redirect.ts ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _azure_msal_browser_redirect_bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @azure/msal-browser/redirect-bridge */ "./node_modules/@azure/msal-browser/dist/redirect-bridge/redirect_bridge/index.mjs");
/* harmony import */ var _utilities_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/_helper */ "./src/scripts/utilities/_helper.ts");


(0,_utilities_helper__WEBPACK_IMPORTED_MODULE_1__.ready)(() => {
    (0,_azure_msal_browser_redirect_bridge__WEBPACK_IMPORTED_MODULE_0__.broadcastResponseToMainFrame)().catch((error) => {
        console.error('Error broadcasting response:', error);
    });
});

}();
/******/ })()
;
//# sourceMappingURL=redirect.js.map