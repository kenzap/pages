
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35734/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  /**
   * @name initHeader
   * @description Initiates Kenzap Cloud extension header and related scripts. Verifies user sessions, handles SSO, does cloud space navigation, initializes i18n localization. 
   * @param {object} response
   */
  const initHeader = (response) => {

      // cache header from backend
      if(response.header) localStorage.setItem('header', response.header);

      // cache CDN link
      if(response.cdn) localStorage.setItem('cdn', response.cdn);
    
      // load header to html if not present
      if(!document.querySelector("#k-script")){
    
          let child = document.createElement('div');
          child.innerHTML = localStorage.getItem('header');
          child = child.firstChild;
          document.body.prepend(child);
    
          // run header scripts
          Function(document.querySelector("#k-script").innerHTML).call('test');
      }
    
      // load locales if present
      if(response.locale) window.i18n.init(response.locale); 
  };

  /*
   * Translates string based on preloaded i18n locale values.
   * 
   * @param text {String} text to translate
   * @param cb {Function} callback function to escape text variable
   * @param p {String} list of parameters, to be replaced with %1$, %2$..
   * @returns {String} - text
   */
  const __esc = (text, cb, ...p) => {

      let match = (input, pa) => {

          pa.forEach((p, i) => { input = input.replace('%'+(i+1)+'$', p); }); 
          
          return input;
      };

      if(typeof window.i18n === 'undefined') return match(text, p);
      if(window.i18n.state.locale.values[text] === undefined) return match(text, p);

      return match(cb(window.i18n.state.locale.values[text]), p);
  };

  /*
   * Converts special characters `&`, `<`, `>`, `"`, `'` to HTML entities.
   * 
   * @param text {String}  text
   * @returns {String} - text
   */
  const attr = (text) => {

      text = String(text);

      if(text.length === 0){
  		return '';
  	}

      return text.replace(/[&<>'"]/g, tag => (
          {
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              "'": '&apos;',
              '"': '&quot;'
          } [tag]));
  };

  /*
   * Converts special characters `&`, `<`, `>`, `"`, `'` to HTML entities.
   * 
   * @param text {String}  text
   * @returns {String} - text
   */
  const html = (text) => {

      text = String(text);

      if(text.length === 0){
  		return '';
  	}

      return text.replace(/[&<>'"]/g, tag => (
          {
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              "'": '&apos;',
              '"': '&quot;'
          } [tag]));
  };

  /*
   * Converts special characters `&`, `<`, `>`, `"`, `'` to HTML entities and does translations
   * 
   * @param text {String}  text
   * @returns {String} - text
   */
  const __html = (text, ...p) => {

      text = String(text);

      if(text.length === 0){
  		return '';
  	}

      let cb = (text) => {

          return text.replace(/[&<>'"]/g, tag => (
              {
                  '&': '&amp;',
                  '<': '&lt;',
                  '>': '&gt;',
                  "'": '&apos;',
                  '"': '&quot;'
              } [tag]));
      };

      return __esc(text, cb, ...p);
  };

  /**
   * @name showLoader
   * @description Initiates full screen three dots loader.
   */
  const showLoader = () => {

      let el = document.querySelector(".loader");
      if (el) el.style.display = 'block';
  };

  /**
   * @name hideLoader
   * @description Removes full screen three dots loader.
   */
  const hideLoader = () => {

      let el = document.querySelector(".loader");
      if (el) el.style.display = 'none';
  };

  /**
   * @name link
   * @description Handles Cloud navigation links between extensions and its pages. Takes care of custom url parameters.
   * @param {string} slug - Any inbound link
   * 
   * @returns {string} link - Returns original link with kenzp cloud space ID identifier.
   */
  const link = (slug) => {
      
      let urlParams = new URLSearchParams(window.location.search);
      let sid = urlParams.get('sid') ? urlParams.get('sid') : "";

      let postfix = slug.indexOf('?') == -1 ? '?sid='+sid : '&sid='+sid;

      return slug + postfix;
  };

  /**
   * @name spaceID
   * @description Gets current Kenzap Cloud space ID identifier from the URL.
   * 
   * @returns {string} id - Kenzap Cloud space ID.
   */
   const spaceID = () => {
      
      let urlParams = new URLSearchParams(window.location.search);
      let id = urlParams.get('sid') ? urlParams.get('sid') : "";

      return id;
  };

  /**
   * @name setCookie
   * @description Set cookie by its name to all .kenzap.cloud subdomains
   * @param {string} name - Cookie name.
   * @param {string} value - Cookie value.
   * @param {string} days - Number of days when cookie expires.
   */
   const setCookie = (name, value, days) => {

      let expires = "";
      if (days) {
          let date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = ";expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (escape(value) || "") + expires + ";path=/;domain=.kenzap.cloud"; 
  };

  /**
   * @name getCookie
   * @description Read cookie by its name.
   * @param {string} cname - Cookie name.
   * 
   * @returns {string} value - Cookie value.
   */
  const getCookie = (cname) => {

      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  };

  /**
   * @name checkHeader
   * @description This function tracks UI updates, creates header version checksum and compares it after every page reload
   * @param {object} object - API response.
   */
   const checkHeader = () => {

      let version = (localStorage.hasOwnProperty('header') && localStorage.hasOwnProperty('header-version')) ? localStorage.getItem('header-version') : 0;
      let check = window.location.hostname + '/' + spaceID() + '/' + getCookie('locale');
      if(check != getCookie('check')){ version = 0; console.log('refresh'); }
      
      setCookie('check', check, 5);

      return version
  };

  /**
   * @name headers
   * @description Default headers object for all Kenzap Cloud fetch queries.
   * @param {object} headers
   */
   const H = () => {

      return {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
          'Kenzap-Locale': getCookie('locale') ? getCookie('locale') : "en",
          'Kenzap-Header': checkHeader(),
          'Kenzap-Token': getCookie('kenzap_token'),
          'Kenzap-Sid': spaceID()
      }
  };

  /**
   * @name headers
   * @description Default headers object for all Kenzap Cloud fetch queries. 
   * @param {object} headers
   * @deprecated
   */
   ({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
      'Kenzap-Locale': getCookie('locale') ? getCookie('locale') : "en",
      'Kenzap-Header': checkHeader(),
      'Kenzap-Token': getCookie('kenzap_token'),
      'Kenzap-Sid': spaceID(),
  });

  /**
   * @name parseApiError
   * @description Set default logics for different API Error responses.
   * @param {object} object - API response.
   */
   const parseApiError = (data) => {

      // outout to frontend console
      console.log(data);

      // unstructured failure
      if(isNaN(data.code)){
      
          // structure failure data
          let log = data;
          try{ log = JSON.stringify(log); }catch(e){ }

          let params = new URLSearchParams();
          params.append("cmd", "report");
          params.append("sid", spaceID());
          params.append("token", getCookie('kenzap_token'));
          params.append("data", log);
          
          // report error
          fetch('https://api-v1.kenzap.cloud/error/', { method: 'post', headers: { 'Accept': 'application/json', 'Content-type': 'application/x-www-form-urlencoded', }, body: params });

          alert('Can not connect to Kenzap Cloud');  
          return;
      }
      
      // handle cloud error codes
      switch(data.code){

          // unauthorized
          case 401:

              // dev mode
              if(window.location.href.indexOf('localhost')!=-1){ 

                  alert(data.reason); 
                  return; 
              }

              // production mode
              location.href="https://auth.kenzap.com/?app=65432108792785&redirect="+encodeURIComponent(window.location.href); break;
          
          // something else
          default:

              alert(data.reason); 
              break;
      }
  };

  /**
   * @name initBreadcrumbs
   * @description Render ui breadcrumbs.
   * @param {array} data - List of link objects containing link text and url. If url is missing then renders breadcrumb as static text. Requires html holder with .bc class.
   */
  const initBreadcrumbs = (data) => {

      let html = '<ol class="breadcrumb mt-2 mb-0">';
      for(let bc of data){
          
          if(typeof(bc.link) === 'undefined'){

              html += `<li class="breadcrumb-item">${ bc.text }</li>`;
          }else {

              html += `<li class="breadcrumb-item"><a href="${ bc.link }">${ bc.text }</a></li>`;
          }
      }
      html += '</ol>';
      
      document.querySelector(".bc").innerHTML = html;
  };

  /**
   * @name onClick
   * @description One row click event listener declaration. Works with one or many HTML selectors.
   * @param {string} sel - HTML selector, id, class, etc.
   * @param {string} fn - callback function fired on click event.
   */
  const onClick = (sel, fn) => {

      if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

          e.removeEventListener('click', fn, true);
          e.addEventListener('click', fn, true);
      }
  };

  /**
   * @name onKeyUp
   * @description One row key up event listener declaration. Works with one or many HTML selectors.
   * @param {string} sel - HTML selector, id, class, etc.
   * @param {string} fn - callback function fired on click event.
   */
  const onKeyUp = (sel, fn) => {

      if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

          e.removeEventListener('keyup', fn, true);
          e.addEventListener('keyup', fn, true);
      }
  };

  /**
   * @name onChange
   * @description One row change event listener declaration. Works with one or many HTML selectors.
   * @param {string} sel - HTML selector, id, class, etc.
   * @param {string} fn - callback function fired on click event.
   */
  const onChange = (sel, fn) => {

      if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

          e.removeEventListener('change', fn, true);
          e.addEventListener('change', fn, true);
      }
  };

  /**
   * @name simulateClick
   * @description Trigger on click event without user interaction.
   * @param {string} elem - HTML selector, id, class, etc.
   */
   const simulateClick = (elem) => {

  	// create our event (with options)
  	let evt = new MouseEvent('click', {
  		bubbles: true,
  		cancelable: true,
  		view: window
  	});

  	// if cancelled, don't dispatch the event
  	!elem.dispatchEvent(evt);
  };

  /**
   * Create a web friendly URL slug from a string.
   *
   * Requires XRegExp (http://xregexp.com) with unicode add-ons for UTF-8 support.
   *
   * Although supported, transliteration is discouraged because
   *     1) most web browsers support UTF-8 characters in URLs
   *     2) transliteration causes a loss of information
   *
   * @author Sean Murphy <sean@iamseanmurphy.com>
   * @copyright Copyright 2012 Sean Murphy. All rights reserved.
   * @license http://creativecommons.org/publicdomain/zero/1.0/
   *
   * @param string s
   * @param object opt
   * @return string
   */
   const slugify = (s, opt) => {

  	s = String(s);
  	opt = Object(opt);
  	
  	var defaults = {
  		'delimiter': '-',
  		'limit': undefined,
  		'lowercase': true,
  		'replacements': {},
  		'transliterate': (typeof(XRegExp) === 'undefined') ? true : false
  	};
  	
  	// Merge options
  	for (var k in defaults) {
  		if (!opt.hasOwnProperty(k)) {
  			opt[k] = defaults[k];
  		}
  	}
  	
  	var char_map = {
  		// Latin
  		'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE', 'Ç': 'C', 
  		'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I', 
  		'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', 'Å': 'O', 
  		'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U', 'Å°': 'U', 'Ý': 'Y', 'Þ': 'TH', 
  		'ß': 'ss', 
  		'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c', 
  		'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i', 
  		'ð': 'd', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'Å': 'o', 
  		'ø': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'Å±': 'u', 'ý': 'y', 'þ': 'th', 
  		'ÿ': 'y',

  		// Latin symbols
  		'©': '(c)',

  		// Greek
  		'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'H', 'Θ': '8',
  		'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': '3', 'Ο': 'O', 'Π': 'P',
  		'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y', 'Φ': 'F', 'Χ': 'X', 'Ψ': 'PS', 'Ω': 'W',
  		'Î': 'A', 'Î': 'E', 'Î': 'I', 'Î': 'O', 'Î': 'Y', 'Î': 'H', 'Î': 'W', 'Îª': 'I',
  		'Î«': 'Y',
  		'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'h', 'θ': '8',
  		'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': '3', 'ο': 'o', 'π': 'p',
  		'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'x', 'ψ': 'ps', 'ω': 'w',
  		'Î¬': 'a', 'Î­': 'e', 'Î¯': 'i', 'Ï': 'o', 'Ï': 'y', 'Î®': 'h', 'Ï': 'w', 'ς': 's',
  		'Ï': 'i', 'Î°': 'y', 'Ï': 'y', 'Î': 'i',

  		// Turkish
  		'Å': 'S', 'Ä°': 'I', 'Ç': 'C', 'Ü': 'U', 'Ö': 'O', 'Ä': 'G',
  		'Å': 's', 'Ä±': 'i', 'ç': 'c', 'ü': 'u', 'ö': 'o', 'Ä': 'g', 

  		// Russian
  		'Ð': 'A', 'Ð': 'B', 'Ð': 'V', 'Ð': 'G', 'Ð': 'D', 'Ð': 'E', 'Ð': 'Yo', 'Ð': 'Zh',
  		'Ð': 'Z', 'Ð': 'I', 'Ð': 'J', 'Ð': 'K', 'Ð': 'L', 'Ð': 'M', 'Ð': 'N', 'Ð': 'O',
  		'Ð': 'P', 'Ð ': 'R', 'Ð¡': 'S', 'Ð¢': 'T', 'Ð£': 'U', 'Ð¤': 'F', 'Ð¥': 'H', 'Ð¦': 'C',
  		'Ð§': 'Ch', 'Ð¨': 'Sh', 'Ð©': 'Sh', 'Ðª': '', 'Ð«': 'Y', 'Ð¬': '', 'Ð­': 'E', 'Ð®': 'Yu',
  		'Ð¯': 'Ya',
  		'Ð°': 'a', 'Ð±': 'b', 'Ð²': 'v', 'Ð³': 'g', 'Ð´': 'd', 'Ðµ': 'e', 'Ñ': 'yo', 'Ð¶': 'zh',
  		'Ð·': 'z', 'Ð¸': 'i', 'Ð¹': 'j', 'Ðº': 'k', 'Ð»': 'l', 'Ð¼': 'm', 'Ð½': 'n', 'Ð¾': 'o',
  		'Ð¿': 'p', 'Ñ': 'r', 'Ñ': 's', 'Ñ': 't', 'Ñ': 'u', 'Ñ': 'f', 'Ñ': 'h', 'Ñ': 'c',
  		'Ñ': 'ch', 'Ñ': 'sh', 'Ñ': 'sh', 'Ñ': '', 'Ñ': 'y', 'Ñ': '', 'Ñ': 'e', 'Ñ': 'yu',
  		'Ñ': 'ya',

  		// Ukrainian
  		'Ð': 'Ye', 'Ð': 'I', 'Ð': 'Yi', 'Ò': 'G',
  		'Ñ': 'ye', 'Ñ': 'i', 'Ñ': 'yi', 'Ò': 'g',

  		// Czech
  		'Ä': 'C', 'Ä': 'D', 'Ä': 'E', 'Å': 'N', 'Å': 'R', 'Š': 'S', 'Å¤': 'T', 'Å®': 'U', 
  		'Å½': 'Z', 
  		'Ä': 'c', 'Ä': 'd', 'Ä': 'e', 'Å': 'n', 'Å': 'r', 'š': 's', 'Å¥': 't', 'Å¯': 'u',
  		'Å¾': 'z', 

  		// Polish
  		'Ä': 'A', 'Ä': 'C', 'Ä': 'e', 'Å': 'L', 'Å': 'N', 'Ó': 'o', 'Å': 'S', 'Å¹': 'Z', 
  		'Å»': 'Z', 
  		'Ä': 'a', 'Ä': 'c', 'Ä': 'e', 'Å': 'l', 'Å': 'n', 'ó': 'o', 'Å': 's', 'Åº': 'z',
  		'Å¼': 'z',

  		// Latvian
  		'Ä': 'A', 'Ä': 'C', 'Ä': 'E', 'Ä¢': 'G', 'Äª': 'i', 'Ä¶': 'k', 'Ä»': 'L', 'Å': 'N', 
  		'Š': 'S', 'Åª': 'u', 'Å½': 'Z', 
  		'Ä': 'a', 'Ä': 'c', 'Ä': 'e', 'Ä£': 'g', 'Ä«': 'i', 'Ä·': 'k', 'Ä¼': 'l', 'Å': 'n',
  		'š': 's', 'Å«': 'u', 'Å¾': 'z'
  	};
  	
  	// Make custom replacements
  	for (var k in opt.replacements) {
  		s = s.replace(RegExp(k, 'g'), opt.replacements[k]);
  	}
  	
  	// Transliterate characters to ASCII
  	if (opt.transliterate) {
  		for (var k in char_map) {
  			s = s.replace(RegExp(k, 'g'), char_map[k]);
  		}
  	}
  	
  	// Replace non-alphanumeric characters with our delimiter
  	var alnum = (typeof(XRegExp) === 'undefined') ? RegExp('[^a-z0-9]+', 'ig') : XRegExp('[^\\p{L}\\p{N}]+', 'ig');
  	s = s.replace(alnum, opt.delimiter);
  	
  	// Remove duplicate delimiters
  	s = s.replace(RegExp('[' + opt.delimiter + ']{2,}', 'g'), opt.delimiter);
  	
  	// Truncate slug to max. characters
  	s = s.substring(0, opt.limit);
  	
  	// Remove delimiter from ends
  	s = s.replace(RegExp('(^' + opt.delimiter + '|' + opt.delimiter + '$)', 'g'), '');
  	
  	return opt.lowercase ? s.toLowerCase() : s;
  };

  /**
   * @name toast
   * @description Triggers toast notification. Adds toast html to the page if missing.
   * @param {string} text - Toast notification.
   */
   const toast = (text) => {

      // only add once
      if(!document.querySelector(".toast")){

          let html = `
        <div class="toast-cont position-fixed bottom-0 p-2 m-4 end-0 align-items-center" style="z-index:10000;">
            <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
                <div class="d-flex">
                    <div class="toast-body"></div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>`;
          if(document.querySelector('body > div')) document.querySelector('body > div').insertAdjacentHTML('afterend', html);
      }

      let toast = new bootstrap.Toast(document.querySelector('.toast'));
      document.querySelector('.toast .toast-body').innerHTML = text;  
      toast.show();
  };

  var getParam = function getParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get(param) ? urlParams.get(param) : "";
    return id;
  };
  var loadAddon = function loadAddon(dep, version, cb) {
    var url = new URL(dep);
    if (getCookie('debug')) dep = 'http://localhost:3000' + url.pathname;
    console.log(dep);
    if (document.getElementById(dep)) {
      if (typeof cb === 'function') cb.call();
      return;
    }
    var t = dep.split('.').slice(-1)[0];
    switch (t) {
      case 'js':
        var js = document.createElement("script");
        js.setAttribute("src", dep);
        js.id = dep;
        js.onload = js.onreadystatechange = function () {
          if (!this.readyState || this.readyState == 'complete') if (typeof cb === 'function') cb.call();
        };
        document.body.appendChild(js);
        break;
      case 'css':
        var head = document.getElementsByTagName('head')[0];
        var css = document.createElement('link');
        css.id = dep;
        css.rel = 'stylesheet';
        css.type = 'text/css';
        css.href = dep;
        head.appendChild(css);
        break;
    }
  };
  var makeid = function makeid(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    var counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };
  var initFooter = function initFooter(_this) {
    var left = __html('Pages 1.0.5 by %1$Kenzap%2$. ❤️ Licensed %3$GPLv3%4$.', '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>', '<a class="text-muted" href="https://github.com/kenzap/pages" target="_blank">', '</a>');
    var right = __html('%1$Developer mode%2$', "<a class=\"text-muted\" href=\"".concat(link('/develop/'), "\" target=\"_self\">"), "</a>");
    document.querySelector("footer .row").innerHTML = "\n    <div class=\"d-sm-flex justify-content-center justify-content-sm-between\">\n        <span class=\"text-muted text-center text-sm-left d-block d-sm-inline-block\">".concat(left, "</span>\n        <span class=\"float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted\">").concat(right, "</span>\n    </div>");
  };

  var EditSettings = function EditSettings(_this) {
    return "\n    <div class=\"card border-white shadow-sm lay br mb-2 nodrag\">\n        <div class=\"card-header border-white bg-white\" role=\"tab\" id=\"section0\">\n            <h6 class=\"my-2 d-flex align-items-center justify-content-between\">\n                <a data-bs-toggle=\"collapse\" href=\"#collapses-settings\" data-section=\"s\" aria-expanded=\"false\" aria-controls=\"collapses\" class=\"secos collapsed text-dark text-decoration-none fs-4\">\n                    ".concat(__html('Page Settings'), "<div id=\"page_template\"></div>\n                </a>\n            </h6>\n        </div>\n        <div id=\"collapses-settings\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\"collapses-settings\" data-parent=\"#sections\" >\n            <div class=\"card-body\">\n                <div class=\"controls\">\n                    <div class=\"r row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group row\"> \n                                <label class=\"col-sm-6 col-form-label\">").concat(__html('Title'), "</label>\n                                <div class=\"col-sm-12\"> \n                                    <input id=\"ptitle\" type=\"text\" data-key=\"heading\" data-type=\"text\" class=\"text-input form-control inps\" value=\"").concat(_this.page.title ? _this.page.title : '', "\" name=\"ptitle\">\n                                    <p class=\"form-text mt-2\">").concat(__html('Page title is used by the search engines and when you share the page.'), "</p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"r row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group row\"> \n                                <label class=\"col-sm-6 col-form-label\">").concat(__html('Slug'), "</label>\n                                <div class=\"col-sm-12\"> \n                                    <input id=\"pslug\" type=\"text\" data-key=\"heading\" data-type=\"text\" class=\"text-input form-control inps\" value=\"").concat(_this.page.slug ? _this.page.slug : '', "\" name=\"pslug\">\n                                    <p class=\"form-text mt-2\">").concat(__html('Page address or unique url.'), "</p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"r row\"> \n                        <div class=\"col-md-12\">\n                            <div class=\"form-group row\"> \n                                <label class=\"col-sm-6 col-form-label\">").concat(__html('Description'), "</label>\n                                <div class=\"col-sm-12\"> \n                                    <textarea id=\"pdesc\" type=\"text\" data-key=\"info1_desc\" data-type=\"text\" class=\"text-input form-control inps\" value=\"\" name=\"pdesc\" rows=\"4\">").concat(_this.page.description ? _this.page.description : '', "</textarea>\n                                    <p class=\"form-text mt-2\">").concat(__html('Used by search engines and when you share the page.'), "</p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"r row\"> \n                        <div class=\"col-md-12\">\n                            <div class=\"form-group row\"> \n                                <label class=\"col-sm-6 col-form-label\">").concat(__html('Palette'), "</label>\n                                <div class=\"col-sm-12\"> \n                                    <ul id=\"palette\" class=\"palette inp\" data-type=\"palette\">\n                                        <li> <input type=\"color\" class=\"border border-secondary form-control form-control-color\" data-key=\"baseColorA\" value=\"#1941df\" style=\"width:50px\" title=\"Choose your base color\"> </li>\n                                        <li> <input type=\"color\" class=\"border border-secondary form-control form-control-color\" data-key=\"baseColorB\" value=\"#1941df\" style=\"width:50px\" title=\"Choose your base color\"> </li>\n                                        <li> <input type=\"color\" class=\"border border-secondary form-control form-control-color\" data-key=\"bgColorA\" value=\"#000000\" style=\"width:50px\" title=\"Main background color\"> </li>\n                                        <li> <input type=\"color\" class=\"border border-secondary form-control form-control-color\" data-key=\"bgColorB\" value=\"#494949\" style=\"width:50px\" title=\"Light background color\"> </li>\n                                        <li> <input type=\"color\" class=\"border border-secondary form-control form-control-color\" data-key=\"txtColorA\" value=\"#111111\" style=\"width:50px\" title=\"Secondary text color\"> </li>\n                                        <li> <input type=\"color\" class=\"border border-secondary form-control form-control-color\" data-key=\"txtColorB\" value=\"#818181\" style=\"width:50px\" title=\"Light text color\"> </li>\n                                        <li> <input type=\"color\" class=\"border border-secondary form-control form-control-color\" data-key=\"txtColorC\" value=\"#ffffff\" style=\"width:50px\" title=\"Main text color\"> </li>\n                                        <li> <input type=\"color\" class=\"border border-secondary form-control form-control-color\" data-key=\"grayColorA\" value=\"#F7F7F7\" style=\"width:50px\" title=\"Secondary text color\"> </li>\n                                        <li> <input type=\"color\" class=\"border border-secondary form-control form-control-color\" data-key=\"grayColorB\" value=\"#c0c0c0\" style=\"width:50px\" title=\"Light text color\"> </li>\n                                        <li> <input type=\"color\" class=\"border border-secondary form-control form-control-color\" data-key=\"grayColorB\" value=\"#818181\" style=\"width:50px\" title=\"Main text color\"> </li>\n                                    </ul> \n                                    <div class=\"clearfix\"></div>\n                                    <p class=\"form-text\">").concat(__html('Click on block above to pick custom color'), "</p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>     \n                    <div class=\"r row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group row\"> \n                                <label class=\"col-sm-12 col-form-label\">").concat(__html('Heading font'), "</label>\n                                <div class=\"col-sm-6\"> \n                                    <select id=\"font_heading\" class=\"font-input text-input form-control form-select\" >                                        \n                                    </select>\n                                    <p class=\"form-text mt-2\"></p>\n                                </div>\n                                <div class=\"col-sm-3\"> \n                                    <select id=\"font_heading_type\" class=\"font-input text-input form-control form-select\" >                                        <option value=\"sans-serif\">Sans Serif</option>\n                                        <option value=\"serif\">Serif</option>\n                                        <option value=\"monospace\">Monospace</option>\n                                    </select>\n                                    <!-- <input id=\"heading_type\" type=\"text\" data-type=\"text\" class=\"text-input form-control inps\" value=\"\" name=\"heading_type\"> -->\n                                    <p class=\"form-text mt-2\"></p>\n                                </div>\n                                <div class=\"col-sm-3\"> \n                                    <select id=\"font_heading_weight\" class=\"font-input text-input form-control form-select\" >                                        <option value=\"100\" class=\"d-none\"></option>\n                                        <option value=\"200\">").concat(__html('Light'), "</option>\n                                        <option value=\"300\" class=\"d-none\">300</option>\n                                        <option value=\"400\" selected>").concat(__html('Normal'), "</option>\n                                        <option value=\"500\" class=\"d-none\">500</option>\n                                        <option value=\"600\">").concat(__html('Bold'), "</option>\n                                        <option value=\"700\" class=\"d-none\">700</option>\n                                        <option value=\"800\" class=\"d-none\">800</option>\n                                    </select>\n                                    <!-- <input id=\"heading_weight\" type=\"text\" data-type=\"text\" class=\"text-input form-control inps\" value=\"\" name=\"heading_weight\"> -->\n                                    <p class=\"form-text mt-2\"></p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"r row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group row\"> \n                                <label class=\"col-sm-12 col-form-label\">").concat(__html('Body font'), "</label>\n                                <div class=\"col-sm-6\"> \n                                <select id=\"font_body\" class=\"font-input text-input form-control form-select\" >                                    \n                                </select>\n                                <p class=\"form-text mt-2\"></p>\n                                </div>\n                                <div class=\"col-sm-3\"> \n                                <select id=\"font_body_type\" class=\"font-input text-input form-control form-select\" >                                    <option value=\"sans-serif\">Sans Serif</option>\n                                    <option value=\"serif\">Serif</option>\n                                    <option value=\"monospace\">Monospace</option>\n                                </select>\n                                <p class=\"form-text mt-2\"></p>\n                                </div>\n                                <div class=\"col-sm-3\"> \n                                <select id=\"font_body_weight\" class=\"font-input text-input form-control form-select\" >                                    <option value=\"100\" class=\"d-none\">").concat(__html('Very Light'), "</option>\n                                    <option value=\"200\">").concat(__html('Light'), "</option>\n                                    <option value=\"300\" class=\"d-none\">300</option>\n                                    <option value=\"400\" selected>").concat(__html('Normal'), "</option>\n                                    <option value=\"500\" class=\"d-none\">500</option>\n                                    <option value=\"600\">").concat(__html('Bold'), "</option>\n                                    <option value=\"700\" class=\"d-none\">700</option>\n                                    <option value=\"800\" class=\"d-none\">800</option>\n                                </select>\n                                <p class=\"form-text mt-2\"></p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"r row access-cont \">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group row\"> \n                                <label class=\"col-sm-12 col-form-label d-none\">").concat(__html('Restrict access'), "</label>\n                                <div class=\"col-sm-12\">\n                                    <div class=\"form-check form-switch\">\n                                        <input class=\"form-check-input\" type=\"checkbox\" id=\"password_protect\" ").concat(_this.page.password_protect ? 'checked' : '', " >\n                                        <label class=\"form-check-label\" for=\"password_protect\">").concat(__html('Restrict access'), "</label>\n                                    </div>\n                                    <p class=\"form-text mt-2 d-none\">").concat(__html('Set this page as home page.'), "</p>\n                                </div>\n                                <div class=\"col-sm-6 mt-2 password-cont ").concat(_this.page.password_protect ? '' : 'd-none', "\"> \n                                    <label class=\"col-form-label d-none\" for=\"password\">").concat(__html('Restrict access'), "</label>\n                                    <input id=\"password\" type=\"password\" data-key=\"password\" data-type=\"text\" class=\"text-input form-control inps\" value=\"").concat(_this.page.password ? _this.page.password : '', "\" name=\"password\">\n                                </div>\n                                <p class=\"form-text mt-2\">").concat(__html('Password-protect page, password should be at least 4 characters long.'), "</p>\n                            </div>\n                        </div>\n                    </div>                   \n                    <div class=\"r row homepage-cont ").concat(_this.page.password_protect ? 'd-none' : '', "\">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group row\"> \n                                <label class=\"col-sm-6 col-form-label d-none\">").concat(__html('Homepage'), "</label>\n                                <div class=\"col-sm-12\">\n                                    <div class=\"form-check form-switch\">\n                                        <input class=\"form-check-input\" type=\"checkbox\" id=\"home_page\" ").concat(_this.page.home_page ? 'checked' : '', " >\n                                        <label class=\"form-check-label\" for=\"home_page\">").concat(__html('Homepage'), "</label>\n                                    </div>\n                                    <p class=\"form-text mt-2\">").concat(__html('Set this page as home page.'), "</p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"r row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"form-group row\"> \n                                <label class=\"col-sm-6 col-form-label\">").concat(__html('CSS Rules'), "</label>\n                                <div class=\"col-sm-12\">\n                                    <textarea id=\"css_rules\" data-key=\"css_rules\" data-type=\"text\" class=\"csseditor-input text-input form-control inps\" name=\"css_rules\">").concat(_this.page.css_rules ? _this.page.css_rules : '', "</textarea>\n                                    <p class=\"form-text mt-2\">").concat(__html('Add custom CSS rules to adjust visual look of the page.'), "</p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n  ");
  };

  var CDN$1 = 'https://kenzap-sites.oss-ap-southeast-1.aliyuncs.com';
  var Controls = {
    data: {},
    page: {},
    layouts: {},
    sec: {},
    settings: {},
    cb: {},
    l: {},
    sel: {},
    obj: {
      settingsCache: null
    },
    section: '',
    init: function init(sel, js, cb, mode) {
      this.sel = sel;
      switch (mode) {
        case 'single':
          this.initSectionSingle(sel, js, cb);
          break;
        case 'sections':
          this.initSections(sel, js, cb);
          break;
        case 'settings':
          this.initSettings(sel, js, cb);
          break;
      }
    },
    initSectionSingle: function initSectionSingle(sel, js, cb) {
      var force = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      this.data = js;
      this.cb = cb;
      this.l.dep = {};
      this.l = {};
      var html = this.render(js);
      if (document.querySelector(sel) && document.querySelector(sel).innerHTML.length < 10 || force) {
        document.querySelector(sel).innerHTML = html;
        this.listeners();
      }
    },
    initSections: function initSections(sel, js, cb) {
      var _this = this;
      if (js == undefined) js = {
        sections: [],
        title: "Page",
        page: {}
      };
      this.page = js;
      this.cb = cb;
      if (js.sections == undefined) return "";
      var html = EditSettings(_this);
      var i = 0;
      for (var sec in js.sections) {
        var s = js.sections[sec];
        html += "\n      <div class=\"card border-white shadow-sm lay br mb-2\">\n        <div class=\"card-header border-white bg-white p-0\" role=\"tab\" id=\"section".concat(i, "\">\n          <h6 class=\"mb-0 d-flex align-items-center justify-content-between\">\n            <a data-bs-toggle=\"collapse\" href=\"#collapse").concat(i, "\" data-section=\"").concat(i, "\" aria-expanded=\"false\" aria-controls=\"collapse").concat(i, "\" class=\"seco collapsed text-dark ps-3 py-3 pe-3 text-decoration-none fs-5\">\n              ").concat(s.data.title, "\n              <div class=\"tname text-secondary d-none\" >").concat(s.data.template, " template</div>\n            </a>\n            <div class=\"row-actions-card\">\n              <div class=\"dropdown\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"34\" height=\"34\" fill=\"currentColor\" data-acc=\"actions\" data-section=\"").concat(i, "\" class=\"bi bi-three-dots-vertical text-secondary acc acc2- contect dropdown-toggle po\" id=\"actions-mennu").concat(i, "\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\" viewBox=\"0 0 16 16\">\n                  <path d=\"M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z\"/>\n                </svg>\n                <ul class=\"dropdown-menu\" aria-labelledby=\"actions-mennu").concat(i, "\">\n                  <li class=\"").concat(i == 0 ? 'd-none' : '', "\">\n                    <a class=\"dropdown-item acc d-flex justify-content-between align-items-center\" data-acc=\"moveup\" data-section=\"").concat(i, "\" href=\"#\">\n                      <div>").concat(__html('Move Up'), "</div>\n                      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-arrow-up\" viewBox=\"0 0 16 16\">\n                        <path fill-rule=\"evenodd\" d=\"M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z\"/>\n                      </svg>\n                    </a>\n                  </li>\n                  <li class=\"").concat(i == js.sections.length - 1 ? 'd-none' : '', "\">\n                    <a class=\"dropdown-item acc d-flex justify-content-between align-items-center\" data-acc=\"movedown\" data-section=\"").concat(i, "\" href=\"#\">\n                      <div>").concat(__html('Move Down'), "</div>\n                      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-arrow-down\" viewBox=\"0 0 16 16\">\n                        <path fill-rule=\"evenodd\" d=\"M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z\"/>\n                      </svg>\n                    </a>\n                  </li>\n                  <li>\n                    <a class=\"dropdown-item acc d-flex justify-content-between align-items-center\" data-acc=\"copy\" data-section=\"").concat(i, "\" href=\"#\">\n                      <div>").concat(__html('Duplicate'), "</div>\n                      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-files\" viewBox=\"0 0 16 16\">\n                        <path d=\"M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z\"/>\n                      </svg>\n                    </a>\n                  </li>\n                  <li>\n                    <a class=\"dropdown-item acc d-flex justify-content-between align-items-center\" data-acc=\"settings\" data-section=\"").concat(i, "\" href=\"#\">\n                      <div>").concat(__html('Advanced'), "</div>\n                      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-brush\" viewBox=\"0 0 16 16\">\n                        <path d=\"M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z\"/>\n                      </svg>                  \n                    </a>\n                  </li>\n                  <li>\n                    <a class=\"dropdown-item acc d-flex justify-content-between align-items-center\" data-acc=\"remove\" data-section=\"").concat(i, "\" href=\"#\">\n                      <div>").concat(__html('Delete'), "</div>\n                      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash3\" viewBox=\"0 0 16 16\">\n                        <path d=\"M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z\"/>\n                      </svg>\n                    </a>\n                  </li>\n                </ul>\n              </div>\n            </div>\n          </h6>\n        </div>\n        <div id=\"collapse").concat(i, "\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\"section").concat(i, "\" data-parent=\"#sections\" style=\"\">\n          <div class=\"card-body\">\n              <div class=\"controls\" data-section=\"").concat(i, "\"></div>\n          </div>\n        </div>\n      </div>");
        i++;
      }
      if (document.querySelector(sel)) document.querySelector(sel + ' .add-layout').insertAdjacentHTML("beforeBegin", html);
      var el = document.querySelectorAll(".seco");
      var _iterator = _createForOfIteratorHelper(el),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var a = _step.value;
          a.addEventListener('click', function (e) {
            _this.section = this.dataset.section;
            _this.initSectionSingle("#collapse" + this.dataset.section + " .controls", js.sections[this.dataset.section].data, _this.cb);
            return false;
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      _toConsumableArray(document.querySelectorAll('.dropdown-item.acc')).forEach(function (el) {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          var section = e.currentTarget.dataset.section;
          switch (e.currentTarget.dataset.acc) {
            case 'moveup':
              _this.arrayMove(_this.page.sections, section, parseInt(section - 1));
              _this.sectionListeners(".acc2");
              _this.obj.action = 'section-moveup';
              _this.cb.call({
                action: 'section-moveup'
              });
              break;
            case 'movedown':
              _this.arrayMove(_this.page.sections, section, parseInt(section) + 1);
              _this.sectionListeners(".acc2");
              _this.obj.action = 'section-movedown';
              _this.cb.call({
                action: 'section-movedown'
              });
              break;
            case 'settings':
              $("#settings").attr('data-section', section);
              $("#settings").attr('data-source', 'settings');
              $("#settings").attr('data-acc', 'settings');
              $("#settings .layouts_body").html('');
              var settingsCache = '';
              if (!Controls.obj.settingsCache) {
                settingsCache = "\n              <div class=\"r row\" data-key=\"\">\n                <div class=\"col-md-4\">\n                  <div class=\"form-group row\">\n                    <label class=\"col-sm-12 col-form-label\"><i class=\"mdi mdi-arrow-collapse-horizontal\"></i> Layout Width</label>\n                    <div class=\"col-sm-12\">\n                      <input id=\"max-width\" type=\"number\" placeholder=\"1168\" class=\"text-input form-control inps\" value=\"1168\"  >\n                      <p class=\"form-text mt-2\">Layout max width in pixels.</p>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"col-md-4\">\n                  <div class=\"form-group row\">\n                    <label class=\"col-sm-12 col-form-label\"><i class=\"mdi mdi-arrow-expand-horizontal\"></i> Side Paddings</label>\n                    <div class=\"col-sm-12\">\n                      <input id=\"side-paddings\" type=\"number\" placeholder=\"16\" class=\"text-input form-control inps\" value=\"16\"  >\n                      <p class=\"form-text mt-2\">Screen left and right offset margins.</p>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"col-md-4\"> \n                  <div class=\"form-group row\">\n                    <label class=\"col-sm-12 col-form-label\"><i class=\"mdi mdi-arrow-expand-vertical\" ></i> Section Paddings</label>\n                    <div class=\"col-sm-12\">\n                      <div class=\"form-check\">\n                        <label class=\"form-check-label\"><input id=\"pd0\" type=\"radio\" class=\"form-check-input\" value=\"pd0\" name=\"pd-type\" >Hidden <i class=\"input-helper\"></i></label>\n                      </div>\n                      <div class=\"form-check\">\n                        <label class=\"form-check-label\"><input id=\"pds\" type=\"radio\" class=\"form-check-input\" value=\"pds\" name=\"pd-type\">Small <i class=\"input-helper\"></i></label>\n                      </div>\n                      <div class=\"form-check\">\n                        <label class=\"form-check-label\"><input id=\"pdm\" type=\"radio\" class=\"form-check-input\" value=\"pdm\" name=\"pd-type\">Medium <i class=\"input-helper\"></i></label>\n                      </div>\n                      <div class=\"form-check\">\n                        <label class=\"form-check-label\"><input id=\"pdl\" type=\"radio\" class=\"form-check-input\" value=\"pdl\" name=\"pd-type\">Large <i class=\"input-helper\"></i></label>\n                      </div>\n                      <div class=\"form-check\">\n                        <label class=\"form-check-label\"><input id=\"pde\" type=\"radio\" class=\"form-check-input\" value=\"pde\" name=\"pd-type\">Extra Large <i class=\"input-helper\"></i></label>\n                      </div>\n                      <p class=\"form-text mt-2\"></p>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"r row\" data-key=\"\">\n\n                <div class=\"col-md-6\">\n                  <div class=\"form-group row\">\n                    <label class=\"col-sm-12 col-form-label\"><i class=\"mdi mdi-image-outline\"></i> Background image</label>\n                    <div class=\"col-sm-12\">\n                      <input id=\"bg-image\" type=\"text\" class=\"text-input form-control inps\" placeholder=\"https://static.kenzap.com/img/backg...\"  >\n                      <p class=\"form-text mt-2\">Link to background image.</p>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"col-md-6\">\n                  <div class=\"form-group row\">\n                    <label class=\"col-sm-12 col-form-label\"><i class=\"mdi mdi-invert-colors\" ></i> Background color</label>\n                    <div class=\"col-sm-12\">\n                      <input id=\"bg-color\" type=\"color\" class=\"inps color-control form-control-color border-0 border-radius-0- p-0-\" placeholder=\"#FEFEFE\" value=\"\"  >\n                      <p class=\"form-text mt-2\">Background color in HEX format.</p> \n                    </div>\n                  </div>\n                </div>\n\n                <!--\n                <div class=\"col-md-6\"> \n                  <div class=\"form-group row\">\n                    <label class=\"col-sm-12 col-form-label\">Background Type</label>\n                    <div class=\"col-sm-12\">\n                      <div class=\"form-check\">\n                        <label class=\"form-check-label\"><input id=\"bg-color\" type=\"radio\" class=\"form-check-input\" value=\"color\" name=\"bg-type\" >Color <i class=\"input-helper\"></i></label>\n                      </div>\n                      <div class=\"form-check\">\n                        <label class=\"form-check-label\"><input id=\"bg-image\" type=\"radio\" class=\"form-check-input\" value=\"image\" name=\"bg-type\">Image <i class=\"input-helper\"></i></label>\n                      </div>\n                      <div class=\"form-check\">\n                        <label class=\"form-check-label\"><input id=\"bg-gradient\" type=\"radio\" class=\"form-check-input\" value=\"gradient\" name=\"bg-type\">Gradient <i class=\"input-helper\"></i></label>\n                      </div>\n                      <div class=\"form-check\">\n                        <label class=\"form-check-label\"><input id=\"bg-video\" type=\"radio\" class=\"form-check-input\" value=\"video\" name=\"bg-type\">Video <i class=\"input-helper\"></i></label>\n                      </div>\n                      <p class=\"form-text mt-2\"></p>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"col-md-6\"> \n                  <div class=\"form-group row\">\n                    <label class=\"col-sm-12 col-form-label\">Result</label>\n                    <div class=\"col-sm-12\">\n                      <div style=\"\n                          width: 250px;\n                          height: 140px;\n                          border: 1px solid #ccc;\n                          border-radius: 20px;\n                          background: beige;\n                          background-image: linear-gradient(140deg, indigo,violet);\n                      \">jnj</div>\n                      <p class=\"form-text mt-2\"></p>\n                    </div>\n                  </div>\n                </div> -->\n\n              </div>";
              }
              Controls.renderSettings(settingsCache, section);
              break;
            case 'copy':
              _this.page.sections.push(_this.page.sections[section]);
              _this.sectionListeners(".acc2");
              _this.obj.action = 'section-copy';
              _this.cb.call({
                action: 'section-copy'
              });
              toast(__html('section copied'));
              break;
            case 'remove':
              if (!confirm('Remove this section?')) return;
              _this.page.sections.splice(section, 1);
              _this.obj.action = 'section-remove';
              _this.cb.call({
                action: 'section-remove'
              });
              toast(__html('section removed'));
              break;
          }
        });
      });
      var fontr = new XMLHttpRequest();
      fontr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          try {
            var _js = JSON.parse(this.responseText);
            var flist = '';
            for (var _f in _js.items) {
              flist += '<option value="' + _js.items[_f].family + '">' + _js.items[_f].family + '</option>';
            }
            document.querySelector("#font_heading").innerHTML = flist;
            document.querySelector("#font_body").innerHTML = flist;
            var value = "";
            if (document.querySelector('#font_heading [value="' + _this.page.typography.heading.font.value + '"]')) document.querySelector('#font_heading [value="' + _this.page.typography.heading.font.value + '"]').selected = true;
            if (document.querySelector('#font_body [value="' + _this.page.typography.body.font.value + '"]')) document.querySelector('#font_body [value="' + _this.page.typography.body.font.value + '"]').selected = true;
            if (document.querySelector('#font_heading_type [value="' + _this.page.typography.heading.type.value + '"]')) document.querySelector('#font_heading_type [value="' + _this.page.typography.heading.type.value + '"]').selected = true;
            if (document.querySelector('#font_body_type [value="' + _this.page.typography.body.type.value + '"]')) document.querySelector('#font_body_type [value="' + _this.page.typography.body.type.value + '"]').selected = true;
            if (document.querySelector('#font_heading_weight [value="' + _this.page.typography.heading.weight.value + '"]')) document.querySelector('#font_heading_weight [value="' + _this.page.typography.heading.weight.value + '"]').selected = true;
            if (document.querySelector('#font_body_weight [value="' + _this.page.typography.body.weight.value + '"]')) document.querySelector('#font_body_weight [value="' + _this.page.typography.body.weight.value + '"]').selected = true;
            document.querySelector('#palette').innerHTML = _this.page.palette.map(function (palette) {
              return "<li> <input type=\"color\" title=\"".concat(palette.title, "\" class=\"border border-secondary form-control form-control-color palette-color-control\" data-key=\"baseColorA\" value=\"").concat(palette.color, "\" style=\"width:40px;background-color:").concat(palette.color, "\" title=\"Choose your base color\"> </li>");
            }).join('');
            onChange('#font_heading', function (e) {
              _this.page.typography.heading.font.value = e.currentTarget.value;
              _this.cb.call({
                action: 'edit'
              });
            });
            onChange('#font_body', function (e) {
              _this.page.typography.body.font.value = e.currentTarget.value;
              _this.cb.call({
                action: 'edit'
              });
            });
            onChange('#font_heading_type', function (e) {
              _this.page.typography.heading.type.value = e.currentTarget.value;
              _this.cb.call({
                action: 'edit'
              });
            });
            onChange('#font_body_type', function (e) {
              _this.page.typography.body.type.value = e.currentTarget.value;
              _this.cb.call({
                action: 'edit'
              });
            });
            onChange('#font_heading_weight', function (e) {
              _this.page.typography.heading.weight.value = e.currentTarget.value;
              _this.cb.call({
                action: 'edit'
              });
            });
            onChange('#font_body_weight', function (e) {
              _this.page.typography.body.weight.value = e.currentTarget.value;
              _this.cb.call({
                action: 'edit'
              });
            });
            onChange('#ptitle', function (e) {
              _this.page.title = e.currentTarget.value;
              _this.cb.call({
                action: 'edit'
              });
            });
            onChange('#pslug', function (e) {
              e.currentTarget.value = slugify(e.currentTarget.value);
              _this.page.slug = e.currentTarget.value;
              _this.cb.call({
                action: 'edit'
              });
            });
            onChange('#pdesc', function (e) {
              _this.page.description = e.currentTarget.value;
              _this.cb.call({
                action: 'edit'
              });
            });
            onChange('#home_page', function (e) {
              _this.page.home_page = e.currentTarget.checked;
              _this.cb.call({
                action: 'edit'
              });
            });
            onChange('#password_protect', function (e) {
              _this.page.password_protect = e.currentTarget.checked;
              _this.page.password_changes = true;
              if (_this.page.password_protect) {
                _this.page.home_page = false;
                document.querySelector('.homepage-cont').classList.add('d-none');
                document.querySelector('.password-cont').classList.remove('d-none');
              } else {
                document.querySelector('.homepage-cont').classList.remove('d-none');
                document.querySelector('.password-cont').classList.add('d-none');
              }
              _this.cb.call({
                action: 'edit'
              });
            });
            onChange('#password', function (e) {
              _this.page.password_changes = true;
              _this.page.password = e.currentTarget.value;
              _this.cb.call({
                action: 'edit'
              });
            });
            onChange('.palette-color-control', function (e) {
              _toConsumableArray(document.querySelectorAll('.palette-color-control')).forEach(function (input, i) {
                _this.page.palette[i].color = input.value;
              });
              _this.cb.call({
                action: 'edit'
              });
            });
            onChange('#css_rules', function (e) {
              _this.page.css_rules = e.currentTarget.value;
              _this.cb.call({
                action: 'edit'
              });
            });
          } catch (e) {
            console.log(e);
          }
        }
      };
      fontr.open("GET", "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBwIX97bVWr3-6AIUvGkcNnmFgirefZ6Sw");
      fontr.send();
    },
    initSettings: function initSettings(sel, js, cb) {
      var _this = this;
      this.settings = js;
      this.page = js;
      this.cb = cb;
      if (js == undefined) return "";
      var html = "";
      for (var sec in js) {
        var s = js[sec];
        var i = sec;
        if (s.hint == undefined) s.hint = '';
        if (s.title == undefined) s.title = 'Setting Tab';
        html += '\
      <div class="card border-white shadow-sm lay br">\
        <div class="card-header border-white bg-white" role="tab" id="section' + i + '">\
          <h6 class="mb-0">\
            <a data-bs-toggle="collapse" href="#collapse' + i + '" data-section="' + i + '" aria-expanded="false" aria-controls="collapse' + i + '" class="seco collapsed">\
              ' + s.title + '\
              <div style="font-size:12px;margin-top:4px;color:#666;">' + s.hint + '</div>\
            </a>\
          </h6>\
        </div>\
        <div id="collapse' + i + '" class="collapse" role="tabpanel" aria-labelledby="section' + i + '" data-parent="#sections" style="">\
          <div class="card-body">\
              <div class="controls" data-section="' + i + '"></div>\
          </div>\
        </div>\
      </div>';
      }
      if (document.querySelector(sel)) document.querySelector(sel).innerHTML = html;
      var el = document.querySelectorAll(".seco");
      var _iterator2 = _createForOfIteratorHelper(el),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var a = _step2.value;
          a.addEventListener('click', function (e) {
            _this.initSectionSingle("#collapse" + this.dataset.section + " .controls", _this.settings[this.dataset.section].data, _this.cb);
            return false;
          });
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      this.sectionListeners(".acc2");
    },
    renderSettings: function renderSettings(html, section) {
      var modal = document.querySelector(".modal");
      var modalCont = new bootstrap.Modal(modal);
      modal.querySelector(".modal-title").innerHTML = __html('Advanced Settings');
      modal.querySelector(".modal-body").innerHTML = html;
      modal.querySelector(".modal-dialog").style.maxWidth = '700px';
      modal.querySelector(".modal-footer").innerHTML = "\n      <button type=\"button\" class=\"btn btn-primary btn-apply-set\">".concat(__html('Apply'), "</button>\n      <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">").concat(__html('Cancel'), "</button>\n    ");
      modalCont.show();
      var c = Controls.page.sections[section].data.c;
      if (!c) c = {};
      console.log(c.section);
      if (c.section) c.section.split(';').forEach(function (string) {
        var _string$split = string.split(":"),
          _string$split2 = _slicedToArray(_string$split, 2),
          key = _string$split2[0],
          value = _string$split2[1];
        switch (key) {
          case 'background-color':
            document.querySelector(".p-modal #bg-color").value = value;
            break;
          case 'bg-image':
            document.querySelector(".p-modal #bg-image").value = value;
            break;
        }
      });
      if (c.container) c.container.split(';').forEach(function (string) {
        var _string$split3 = string.split(":"),
          _string$split4 = _slicedToArray(_string$split3, 2),
          key = _string$split4[0],
          value = _string$split4[1];
        switch (key) {
          case 'max-width':
            document.querySelector(".p-modal #max-width").value = value.match(/\d+/g).join('');
            break;
          case 'padding-left':
            document.querySelector(".p-modal #side-paddings").value = value.match(/\d+/g).join('');
            break;
        }
      });
      if (c.classes) c.classes.split(' ').forEach(function (string) {
        switch (string) {
          case "pd0":
            $("#pd0").prop("checked", true);
            break;
          case "pds":
            $("#pds").prop("checked", true);
            break;
          case "pdm":
            $("#pdm").prop("checked", true);
            break;
          case "pdl":
            $("#pdl").prop("checked", true);
            break;
          case "pde":
            $("#pde").prop("checked", true);
            break;
        }
      });
      Controls.applySettings(section);
    },
    applySettings: function applySettings(section) {
      document.querySelector('.btn-apply-set').addEventListener('click', function (e) {
        e.preventDefault();
        Controls.page.sections[section].data.c = {};
        Controls.page.sections[section].data.c.section = "";
        Controls.page.sections[section].data.c.container = "";
        Controls.page.sections[section].data.c.classes = "";
        var mwidth = $(".modal.show").find("#max-width").val();
        var spadding = $(".modal.show").find("#side-paddings").val();
        var bgcolor = $(".modal.show").find("#bg-color").val();
        var pdtype = $(".modal.show").find('input[name="pd-type"]:checked').val();
        if (mwidth) Controls.page.sections[section].data.c.container += "max-width:" + mwidth + "px;";
        if (spadding) Controls.page.sections[section].data.c.container += "padding-left:" + spadding + "px;padding-right:" + spadding + "px;";
        if (bgcolor) Controls.page.sections[section].data.c.section += "background-color:" + bgcolor + ";";
        if (pdtype) Controls.page.sections[section].data.c.classes += pdtype + " ";
        $(".btn-close").trigger('click');
        Controls.obj = {
          action: null
        };
        Controls.cb.call();
      });
    },
    arrayMove: function arrayMove(arr, old_index, new_index) {
      var element = arr[old_index];
      arr.splice(old_index, 1);
      arr.splice(new_index, 0, element);
    },
    sectionListeners: function sectionListeners(acc_class) {
      var _this = this;
      var acc = document.querySelectorAll(acc_class);
      var _iterator3 = _createForOfIteratorHelper(acc),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var a = _step3.value;
          var args = {
            _this: _this,
            a: a
          };
          if (!a.dataset.lid) {
            a.dataset.lid = _this.makeid(6);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    },
    resolve: function resolve(path, obj) {
      return path.split('.').reduce(function (prev, curr) {
        return prev ? prev[curr] : null;
      }, obj || self);
    },
    sortByIndex: function sortByIndex(js) {
      var js_sorted = [];
      Object.keys(js).forEach(function (key, i) {
        if (_typeof(js[key]) === 'object' && js[key] !== null) {
          if (typeof js[key].index === 'undefined') {
            js[key].index = 999999999;
            console.log(js[key].index);
          }
          var kv = {};
          if (Array.isArray(js[key])) {
            kv.input = "list";
            kv.data = js[key];
            kv.key = key;
          } else {
            kv = js[key];
            kv.key = key;
          }
          if (!kv.id) kv.id = Controls.makeid();
          js_sorted.push(kv);
        }
      });
      js_sorted.sort(function (a, b) {
        return a.index - b.index;
      });
      return js_sorted;
    },
    render: function render(js) {
      console.log(js);
      var outputF = "";
      outputF = Controls.sortByIndex(js).map(function (jss) {
        return Controls.controls(jss);
      }).join("");
      return outputF;
    },
    actions: function actions(key) {
      var i = 0;
      return "\n      <div class=\"row-actions\">\n        <div class=\"dropdown\">\n          <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" data-acc=\"actions\" data-section-item=\"".concat(key, "\" class=\"bi bi-three-dots-vertical text-secondary acc acc2- contect dropdown-toggle po\" id=\"actions-mennu").concat(i, "\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\" viewBox=\"0 0 16 16\">\n            <path d=\"M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z\"/>\n          </svg>\n          <ul class=\"dropdown-menu\" aria-labelledby=\"actions-mennu").concat(i, "\">\n            <li class=\"").concat('d-none' , "\">\n              <a class=\"dropdown-item acc-item d-flex justify-content-between align-items-center\" data-acc=\"moveup\" data-section-item=\"").concat(key, "\" href=\"#\">\n                <div>").concat(__html('Move Up'), "</div>\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-arrow-up\" viewBox=\"0 0 16 16\">\n                  <path fill-rule=\"evenodd\" d=\"M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z\"/>\n                </svg>\n              </a>\n            </li>\n            <li class=\"").concat('d-none' , "\">\n              <a class=\"dropdown-item acc-item d-flex justify-content-between align-items-center\" data-acc=\"movedown\" data-section-item=\"").concat(key, "\" href=\"#\">\n                <div>").concat(__html('Move Down'), "</div>\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-arrow-down\" viewBox=\"0 0 16 16\">\n                  <path fill-rule=\"evenodd\" d=\"M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z\"/>\n                </svg>\n              </a>\n            </li>\n            <li class=\"d-none\">\n              <a class=\"dropdown-item acc-item d-flex justify-content-between align-items-center\" data-acc=\"copy\" data-section-item=\"").concat(key, "\" href=\"#\">\n                <div>").concat(__html('Duplicate'), "</div>\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-files\" viewBox=\"0 0 16 16\">\n                  <path d=\"M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z\"/>\n                </svg>\n              </a>\n            </li>\n            <li>\n              <a class=\"dropdown-item acc-item d-flex justify-content-between align-items-center\" data-acc=\"remove\" data-section-item=\"").concat(key, "\" href=\"#\">\n                <div>").concat(__html('Delete'), "</div>\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash3\" viewBox=\"0 0 16 16\">\n                  <path d=\"M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z\"/>\n                </svg>\n              </a>\n            </li>\n          </ul>\n        </div>\n      </div>\n      ");
    },
    keys: [],
    iterate: function iterate(o, fn) {
      fn.apply(this, [this.assignIds()]);
      for (var i in o) {
        if (o[i] !== null && _typeof(o[i]) == "object") {
          this.keys.push(i);
          this.iterate(o[i], fn);
        }
      }
      this.keys.pop();
    },
    assignIds: function assignIds() {
      var _this = this;
      var k = _this.keys;
      var obj = {};
      switch (k.length) {
        case 0:
          obj = _this.data;
          break;
        case 1:
          if (_this.data[k[0]].input && _this.data[k[0]].id == undefined) {
            _this.data[k[0]].id = _this.makeid();
          }
          obj = _this.data[k[0]];
          break;
        case 2:
          if (_this.data[k[0]][k[1]].input && _this.data[k[0]][k[1]].id == undefined) {
            _this.data[k[0]][k[1]].id = _this.makeid();
          }
          obj = _this.data[k[0]][k[1]];
          break;
        case 3:
          if (_this.data[k[0]][k[1]][k[2]].input && _this.data[k[0]][k[1]][k[2]].id == undefined) {
            _this.data[k[0]][k[1]][k[2]].id = _this.makeid();
          }
          obj = _this.data[k[0]][k[1]][k[2]];
          break;
        case 4:
          if (_this.data[k[0]][k[1]][k[2]][k[3]].input && _this.data[k[0]][k[1]][k[2]][k[3]].id == undefined) {
            _this.data[k[0]][k[1]][k[2]][k[3]].id = _this.makeid();
          }
          obj = _this.data[k[0]][k[1]][k[2]][k[3]];
          break;
        default:
          return false;
      }
      return _this.controls(k.join("."), obj);
    },
    removeProps: function removeProps(obj, keys) {
      var _this = this;
      if (obj instanceof Array) {
        obj.forEach(function (item) {
          _this.removeProps(item, keys);
        });
      } else if (_typeof(obj) === 'object') {
        Object.getOwnPropertyNames(obj).forEach(function (key) {
          if (keys.indexOf(key) !== -1) delete obj[key];else _this.removeProps(obj[key], keys);
        });
      }
    },
    updateIDs: function updateIDs(obj) {
      var _this = this;
      if (obj instanceof Array) {
        obj.forEach(function (item) {
          _this.updateIDs(item);
        });
      } else if (_typeof(obj) === 'object') {
        Object.getOwnPropertyNames(obj).forEach(function (key) {
          if (key == 'id') obj[key] = _this.makeid();else _this.updateIDs(obj[key]);
        });
      }
    },
    setJSV: function setJSV(v, k, e) {
      var _this = this;
      var c = document.querySelector("#" + e.id).closest('.controls');
      _this.sec = c.dataset.section;
      k = k.split('.');
      switch (k.length) {
        case 1:
          if (_this.data[k[0]]) _this.data[k[0]].value = v;
          break;
        case 2:
          if (_this.data[k[0]][k[1]]) _this.data[k[0]][k[1]].value = v;
          break;
        case 3:
          if (_this.data[k[0]][k[1]][k[2]]) _this.data[k[0]][k[1]][k[2]].value = v;
          break;
        default:
          return false;
      }
      _this.obj.action = 'edit';
      _this.cb.call({
        action: 'edit'
      });
    },
    findParentNode: function findParentNode(elm, selector) {
      var all = document.querySelectorAll(selector);
      var cur = elm.parentNode;
      while (cur && !collectionHas(all, cur)) {
        cur = cur.parentNode;
      }
      return cur;
    },
    fonts: null,
    controls: function controls(js) {
      var key = js.key;
      if (js.input == undefined) return;
      js["default"] = js["default"] == undefined ? "" : js["default"];
      js.value = js.value == undefined ? "" : js.value;
      js.title = js.title == undefined ? "" : js.title;
      js.hint = js.hint == undefined ? "" : js.hint;
      var _this = this;
      var id = js.id;
      var value = js.value == "" ? js["default"] : js.value;
      var key_row = key.substr(0, key.lastIndexOf('.'));
      switch (js.input) {
        case 'list':
          return js.data.map(function (lo, ai) {
            var la = Controls.sortByIndex(lo);
            return "\n            <div class=\"row-cont\" data-key=\"".concat(attr(key), "\">\n              <div class=\"row-click\">\n                <span>").concat(html(key + ' ' + (ai + 1)), "</span>\n                ").concat(Controls.actions(key), "  \n              </div>\n              ").concat(la.map(function (lobj, i) {
              lobj.key = js.key + '.' + ai + '.' + lobj.key;
              lobj.display = 'none';
              if (!lobj.id) lobj.id = Controls.makeid();
              return Controls.controls(lobj);
            }).join(''), "\n              ").concat(ai + 1 == js.data.length ? "<a class=\"acc-item-add\" href=\"#\">+ ".concat(attr(key), "</a>") : "", "\n            </div>");
          }).join('');
        case 'text':
          this.l.text = function () {
            var input = document.querySelectorAll('#collapse' + _this.section + ' .controls .text-input');
            var _iterator4 = _createForOfIteratorHelper(input),
              _step4;
            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var a = _step4.value;
                a.addEventListener('keyup', function (e) {
                  _this.setJSV(this.value, this.dataset.key, this);
                  return false;
                });
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          };
          return '\
          <div class="r row" data-key="' + key_row + '" >\
            <div class="col-md-12">\
              <div class="form-group row">\
                <label class="col-sm-6 col-form-label">' + js.title + '</label>\
                <div class="col-sm-12">\
                  <input id="' + id + '" type="text" data-key="' + key + '" data-type="' + js.input + '" class="text-input form-control inps" value="' + value + '" name="' + id + '" >\
                  <p class="form-text mt-2">' + js.hint + '</p>\
                </div>\
              </div>\
            </div>\
          </div>';
        case 'textarea':
          js.rows = js.rows == undefined ? "6" : js.rows;
          this.l.textarea = function () {
            var input = document.querySelectorAll('#collapse' + _this.section + ' .controls .textarea-input');
            var _iterator5 = _createForOfIteratorHelper(input),
              _step5;
            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var a = _step5.value;
                a.addEventListener('keyup', function (e) {
                  _this.setJSV(this.value, this.dataset.key, this);
                  return false;
                });
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }
          };
          return '\
          <div class="r row" data-key="' + key_row + '">\
            <div class="col-md-12">\
              <div class="form-group row">\
                <label class="col-sm-6 col-form-label">' + js.title + '</label>\
                <div class="col-sm-12">\
                  <textarea id="' + id + '" data-key="' + key + '" data-type="' + js.input + '" class="textarea-input form-control inps" maxlength="400" rows="' + js.rows + '">' + value + '</textarea>\
                  <p class="form-text mt-2">' + js.hint + '</p>\
                </div>\
              </div>\
            </div>\
          </div>';
        case 'number':
          this.l.number = function () {
            var input = document.querySelectorAll(".number-input");
            var _iterator6 = _createForOfIteratorHelper(input),
              _step6;
            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var a = _step6.value;
                a.addEventListener('keyup', function (e) {
                  _this.setJSV(this.value, this.dataset.key, this);
                  return false;
                });
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }
          };
          return '\
          <div class="r row" data-key="' + key_row + '">\
            <div class="col-md-12">\
              <div class="form-group row">\
                <label class="col-sm-6 col-form-label">' + js.title + '</label>\
                <div class="col-sm-12">\
                  <input id="' + id + '" type="number" data-key="' + key + '" data-type="' + js.input + '" class="number-input form-control inps" value="' + value + '" name="' + id + '" >\
                  <p class="form-text mt-2">' + js.hint + '</p>\
                </div>\
              </div>\
            </div>\
          </div>';
        case 'range':
          this.l.range = function () {
            var rcb = function cbf() {
              $('#collapse' + _this.section + ' .controls .range-input').each(function (i, elem) {
                if (elem.classList.contains('noUi-target')) return;
                var _cb = this;
                var range = noUiSlider.create(elem, {
                  start: [parseInt(elem.dataset.value)],
                  connect: [true, false],
                  tooltips: [true],
                  decimals: false,
                  range: {
                    'min': [parseInt(elem.dataset.min)],
                    'max': [parseInt(elem.dataset.max)]
                  },
                  format: {
                    to: function to(v) {
                      return parseFloat(v).toFixed(0);
                    },
                    from: function from(v) {
                      return parseFloat(v).toFixed(0);
                    }
                  },
                  step: 1
                }, true);
                range.on('set.one', function (values, handle) {
                  _this.setJSV(values[0], _cb.dataset.key, _cb);
                });
                range.on('update', function (values, handle) {
                  _cb.parentElement.querySelector(".range-output").innerHTML = " " + parseInt(values[0]);
                });
              });
            };
            _this.loadDependencies('nouislider.min.js', rcb);
            _this.loadDependencies('nouislider.min.css');
          };
          js.min = js.min == undefined ? 0 : js.min;
          js.max = js.max == undefined ? 100 : js.max;
          value == "" ? (js.min + js.max) / 2 : value;
          return '<div class="r row" data-key="' + key_row + '">\
          <div class="col-md-12">\
            <div class="form-group row">\
              <label class="col-sm-6 col-form-label">' + js.title + '</label>\
              <div class="col-sm-12">\
                <div id="' + id + '" data-min="' + js.min + '" data-value="' + value + '" data-max="' + js.max + '" data-key="' + key + '" data-type="' + js.input + '" class="range-input ul-slider slider-primary"></div>\
                <p class="form-text mt-2">' + js.hint + '<span class="range-output"><span></p>\
              </div>\
            </div>\
          </div>\
        </div>';
        case 'radio':
          this.l.radio = function () {
            var input = document.querySelectorAll('#collapse' + _this.section + ' .controls .radio-input');
            var _iterator7 = _createForOfIteratorHelper(input),
              _step7;
            try {
              for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                var a = _step7.value;
                a.addEventListener('change', function (e) {
                  _this.setJSV(this.value, this.dataset.key, this);
                  return false;
                });
              }
            } catch (err) {
              _iterator7.e(err);
            } finally {
              _iterator7.f();
            }
          };
          var rl = '';
          for (var o in js.options) {
            rl += '\
          <div class="form-check">\
            <label class="form-check-label"><input id="' + id + o + '" data-key="' + key + '" data-type="' + js.input + '" type="radio" class="radio-input form-check-input" ' + (value == js.options[o]['key'] ? "checked" : "") + ' name="' + key + '" value="' + js.options[o]['key'] + '">' + js.options[o]['value'] + ' <i class="input-helper"></i></label>\
          </div>';
          }
          return '\
          <div class="r row" data-key="' + key_row + '">\
            <div class="col-md-12">\
              <div class="form-group row">\
                <label class="col-sm-6 col-form-label">' + js.title + '</label>\
                <div class="col-sm-12">' + rl + '\
                  <p class="form-text mt-2">' + js.hint + '</p>\
                </div>\
              </div>\
            </div>\
          </div>';
        case 'font':
          this.l.font = function () {
            var input = document.querySelectorAll('#collapse' + _this.section + ' .controls .font-input');
            var _iterator8 = _createForOfIteratorHelper(input),
              _step8;
            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var a = _step8.value;
                a.addEventListener('change', function (e) {
                  _this.setJSV(this.value, this.dataset.key, this);
                  return false;
                });
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }
          };
          if (!_this.fonts) {
            var fontr = new XMLHttpRequest();
            fontr.onreadystatechange = function () {
              if (this.readyState == 4 && this.status == 200) {
                try {
                  var _js2 = JSON.parse(this.responseText);
                  var flist = '';
                  for (f in _js2.items) {
                    flist += '<option value="' + _js2.items[f].family + '">' + _js2.items[f].family + '</option>';
                  }
                  _this.fonts = flist;
                  document.querySelector("#" + id).innerHTML = flist;
                  document.querySelector("#" + id + ' [value="' + value + '"]').selected = true;
                } catch (e) {}
              }
            };
            fontr.open("GET", "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBwIX97bVWr3-6AIUvGkcNnmFgirefZ6Sw");
            fontr.send();
          } else {
            setTimeout(function () {
              document.querySelector("#" + id).innerHTML = _this.fonts;
              document.querySelector("#" + id + ' [value="' + value + '"]').selected = true;
            }, 50);
          }
          return '\
          <div class="r row" data-key="' + key_row + '">\
            <div class="col-md-12">\
              <div class="form-group row">\
                <label class="col-sm-6 col-form-label">' + js.title + '</label>\
                <div class="col-sm-12">\
                  <select id="' + id + '" data-key="' + key + '" data-type="' + js.input + '" class="font-input form-control" >\
                    \
                  </select>\
                  <p class="form-text mt-2">' + js.hint + '</p>\
                </div>\
              </div>\
            </div>\
          </div>';
        case 'richtext':
          this.l.richtext = function () {
            var cbf = function cbf() {
              $('#collapse' + _this.section + ' .controls .richtext-input').each(function (i, elem) {
                var quill = new Quill(elem, {
                  modules: {
                    toolbar: [['bold', 'italic', 'strike', 'link'], [{
                      'header': [1, 2, 3, 4, 5, 6, false]
                    }], [{
                      'align': []
                    }], [{
                      'color': []
                    }, {
                      'background': []
                    }]],
                    clipboard: {}
                  },
                  theme: 'snow'
                });
                quill.on('text-change', function (delta, oldDelta, source) {
                  var _cb = quill.container.parentElement.querySelector('#collapse' + _this.section + ' .controls .richtext-input');
                  var text = quill.container.firstChild.innerHTML;
                  text = text.replace('<p><br></p>', '');
                  text = text.replace('<h1><br></h1>', '');
                  text = text.replace('<h2><br></h2>', '');
                  text = text.replace('<h3><br></h3>', '');
                  text = text.replace('<h4><br></h4>', '');
                  _this.setJSV(text, _cb.dataset.key, _cb);
                });
              });
            };
            _this.loadDependencies('quill.min.js', cbf);
            _this.loadDependencies('quill.snow.css');
          };
          return '\
            <div class="r row" data-key="' + key_row + '">\
              <div class="col-md-12">\
                <div class="form-group row">\
                  <label class="col-sm-6 col-form-label">' + js.title + '</label>\
                  <div class="col-sm-12">\
                    <div class="richtext-wrap">\
                      <div id="' + id + '" data-key="' + key + '" data-type="' + js.input + '" name="' + id + '_' + key + '" class="richtext-input inps">' + value + '</div>\
                      <p class="form-text mt-2">' + js.hint + '</p>\
                    </div>\
                  </div>\
                </div>\
              </div>\
            </div>';
        case 'toggle':
          this.l.toggle = function () {
            var input = document.querySelectorAll('#collapse' + _this.section + ' .controls .switch_label');
            var _iterator9 = _createForOfIteratorHelper(input),
              _step9;
            try {
              for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                var a = _step9.value;
                a.addEventListener('click', function (e) {
                  e.preventDefault();
                  var inp = document.querySelector("#" + this.dataset.id);
                  _this.triggerClick(inp);
                  _this.setJSV(inp.checked, inp.dataset.key, inp);
                  return false;
                });
              }
            } catch (err) {
              _iterator9.e(err);
            } finally {
              _iterator9.f();
            }
          };
          return '\
              <div class="r row" data-key="' + key_row + '">\
                <div class="col-md-12">\
                  <div class="form-group row">\
                    <label class="col-sm-6 col-form-label">' + js.title + '</label>\
                    <div class="col-sm-12">\
                      <div class="switch">\
                        <input id="' + id + '" data-key="' + key + '" data-type="' + js.input + '" class="toggle-input switch_input" type="checkbox" data-val="' + key + '" value="' + value + '" ' + (Boolean(value) == true ? 'checked' : '') + '>\
                        <label aria-hidden="true" class="switch_label" data-id="' + id + '" for="toggle-input"></label>\
                        <div aria-hidden="true" class="switch_marker"></div>\
                      </div>\
                      <p class="form-text mt-2">' + js.hint + '</p>\
                    </div>\
                  </div>\
                </div>\
              </div>';
        case 'color':
          this.l.color = function () {
            var cb = function cbf() {
              $('#collapse' + _this.section + ' .controls .color-input').each(function (i, elem) {
                var _cb = this;
                var hueb = new Huebee(elem, {});
                hueb.on('change', function (color) {
                  _this.setJSV(_cb.value, _cb.dataset.key, _cb);
                });
              });
            };
            _this.loadDependencies('huebee.min.js', cb);
            _this.loadDependencies('huebee.min.css');
          };
          return '\
          <div class="r row" data-key="' + key_row + '">\
            <div class="col-md-12">\
              <div class="form-group row">\
                <label class="col-sm-6 col-form-label">' + js.title + '</label>\
                <div class="col-sm-12">\
                  <div class="asColorPicker-wrap">\
                    <input type="text" id="' + id + '" data-key="' + key + '" data-type="' + js.input + '" class="color-input inps" name="' + id + '_' + key + '" value="' + value + '" style="border:0;">\
                  </div>\
                  <p class="form-text mt-2">' + js.hint + '</p>\
                </div>\
              </div>\
            </div>\
          </div>';
        case 'icon':
        case 'image':
          js.sizes = js.sizes == undefined ? ["600", "1200x500"] : js.sizes;
          var sizestxt = "";
          js.sizes.forEach(function (entry) {
            sizestxt += entry + '|';
          });
          sizestxt = sizestxt.substr(0, sizestxt.length - 1);
          this.l.image = function () {
            var ip = document.querySelectorAll('#collapse' + _this.section + ' .controls .image-preview');
            var _iterator10 = _createForOfIteratorHelper(ip),
              _step10;
            try {
              for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                var a = _step10.value;
                a.addEventListener('click', function (e) {
                  var inp = document.querySelector('#collapse' + _this.section + ' .controls #u_' + this.dataset.id);
                  _this.triggerClick(inp);
                  return false;
                });
              }
            } catch (err) {
              _iterator10.e(err);
            } finally {
              _iterator10.f();
            }
            var iu = function iu(iid, file) {
              var fd = new FormData();
              var sizes = document.querySelector("#" + iid).dataset.sizes;
              var id = _this.getId();
              fd.append('id', iid);
              fd.append('sid', spaceID());
              fd.append('pid', 0);
              fd.append('key', 'image');
              fd.append('sizes', sizes);
              fd.append('file', file);
              fd.append('slug', id + '-' + iid);
              fd.append('token', getCookie('kenzap_token'));
              document.querySelector("#p_" + iid).style.display = "block";
              document.querySelector("#p_" + iid + " > div").style.width = "0%";
              $.ajax({
                xhr: function xhr() {
                  var xhr = new window.XMLHttpRequest();
                  xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                      var percentComplete = evt.loaded / evt.total;
                      document.querySelector("#p_" + iid + " > div").style.width = parseInt(percentComplete * 100) + '%';
                      if (percentComplete == 1) setTimeout(function () {
                        document.querySelector("#p_" + iid).style.display = "none";
                      }, 500);
                    }
                  }, false);
                  xhr.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                      var percentComplete = evt.loaded / evt.total;
                      document.querySelector("#p_" + iid + " > div").style.width = parseInt(percentComplete * 100) + '%';
                      if (percentComplete == 1) setTimeout(function () {
                        document.querySelector("#p_" + iid).style.display = "none";
                      }, 500);
                    }
                  }, false);
                  return xhr;
                },
                url: window.location.host.indexOf("localhost") == 0 ? 'https://api-v1-dev.kenzap.cloud/upload/' : 'https://api-v1.kenzap.cloud/upload/',
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function success(response) {
                  var js = JSON.parse(response);
                  if (js.success) {
                    var _icb = document.querySelector("#" + iid);
                    var icbv = js.format == 'svg' ? CDN$1 + '/S' + spaceID() + '/' + id + '-' + iid + '.svg' : CDN$1 + '/S' + spaceID() + '/' + id + '-' + iid + '-' + sizes.split('|')[0] + '.webp';
                    _this.setJSV(icbv, _icb.dataset.key, _icb);
                  }
                }
              });
            };
            var iup = document.querySelectorAll('#collapse' + _this.section + ' .controls .image-upload');
            var _iterator11 = _createForOfIteratorHelper(iup),
              _step11;
            try {
              for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                var _a = _step11.value;
                _a.addEventListener('change', function (e) {
                  if (this.files && this.files[0]) {
                    var fl = this;
                    var reader = new FileReader();
                    reader.onload = function (e) {
                      var im = document.querySelector("#i_" + fl.dataset.id);
                      if (im) im.setAttribute("src", e.target.result);
                      iu(fl.dataset.id, fl.files[0]);
                    };
                    reader.readAsDataURL(fl.files[0]);
                  }
                });
              }
            } catch (err) {
              _iterator11.e(err);
            } finally {
              _iterator11.f();
            }
          };
          var src;
          if (!value.includes("static")) {
            src = value.length < 5 ? 'https://kenzap.com/account/images/placeholder.jpg' : value;
          } else {
            src = value;
          }
          src += '?' + _this.page.updated;
          return '\
            <div class="r row" data-key="' + key_row + '">\
              <div class="col-md-12">\
                <div class="form-group row">\
                  <div class="col-sm-12">\
                    <div>\
                      <div class="file-search-img image-cont image-preview" data-id="' + id + '">\
                        <img id="i_' + id + '" class="image" data-key="' + key + '" data-type="' + js.input + '" src="' + src + '"/>\
                        <div id="p_' + id + '" class="progress">\
                          <div class="progress-bar bg-primary progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>\
                        </div>\
                      </div>\
                      <input id="u_' + id + '" data-id=' + id + ' type="file" name="img[]" data-key="' + key + '" data-type="' + js.input + '" name="' + id + '_' + key + '" class="image-upload"></input>\
                      <input id="' + id + '" type="hidden" data-key="' + key + '" data-sizes="' + sizestxt + '" data-type="' + js.input + '" class="image-input image-val inps" value="' + js["default"] + '"></input>\
                      <p class="form-text mt-2">' + js.hint + '</p>\
                    </div>\
                  </div>\
                </div>\
              </div>\
            </div>';
        case 'csseditor':
          this.l.csseditor = function () {
            var cb = function cbf() {
              $('#collapse' + _this.section + ' .controls .csseditor-input').each(function (i, elem) {
                var _cb = this;
                var csseditor = ace.edit(_cb.id);
                csseditor.setTheme("ace/theme/monokai");
                csseditor.getSession().setMode("ace/mode/css");
                csseditor.on('change', function () {
                  _this.setJSV(csseditor.getValue(), _cb.dataset.key, _cb);
                });
              });
            };
            _this.loadDependencies('ace.min.js', cb);
            _this.loadDependencies('ace.min.css');
          };
          return '\
            <div class="r row" data-key="' + key_row + '">\
              <div class="col-md-12">\
                <div class="form-group row">\
                  <label class="col-sm-6 col-form-label">' + js.title + '</label>\
                  <div class="col-sm-12">\
                    <div class="asColorPicker-wrap">\
                      <textarea id="' + id + '" data-key="' + key + '" data-type="' + js.input + '" class="csseditor-input inps w-400" name="' + id + '_' + key + '">' + value + '</textarea>\
                    </div>\
                    <p class="form-text mt-2">' + js.hint + '</p>\
                  </div>\
                </div>\
              </div>\
            </div>';
      }
      return '';
    },
    getData: function getData() {
      return this.data;
    },
    getSettings: function getSettings() {
      return this.settings;
    },
    getId: function getId() {
      var urlParams = new URLSearchParams(window.location.search);
      var id = urlParams.get('sid') ? urlParams.get('sid') : "";
      return id;
    },
    makeid: function makeid() {
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 12;
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    listeners: function listeners() {
      var _this = this;
      for (var k in this.l) {
        if (typeof this.l[k] === 'function') this.l[k].call();
      }
      var el = document.querySelectorAll('#collapse' + _this.section + ' .controls .row-click');
      var _iterator12 = _createForOfIteratorHelper(el),
        _step12;
      try {
        var _loop = function _loop() {
          var a = _step12.value;
          setTimeout(function () {
            a.addEventListener('click', function (e) {
              if (a.dataset.block == "true") {
                e.preventDefault();
                return false;
              }
              if (!a.dataset.display) {
                a.dataset.display = "yes";
              } else {
                a.dataset.display = "";
              }
              var rows = a.parentNode.querySelectorAll(".r.row");
              var _iterator13 = _createForOfIteratorHelper(rows),
                _step13;
              try {
                for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
                  var row = _step13.value;
                  if (!row.dataset.display) {
                    row.style.display = "flex";
                    row.dataset.display = "yes";
                  } else {
                    row.style.display = "none";
                    row.dataset.display = "";
                  }
                }
              } catch (err) {
                _iterator13.e(err);
              } finally {
                _iterator13.f();
              }
              return false;
            });
          }, 10);
        };
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }
      _toConsumableArray(document.querySelectorAll('#collapse' + _this.section + ' .controls .row-cont')).forEach(function (el) {
        el.querySelector('.row-actions .dropdown').addEventListener('click', function (e) {
          e.currentTarget.parentElement.parentElement.dataset.block = "true";
          setTimeout(function (pel) {
            pel.dataset.block = "";
          }, 100, e.currentTarget.parentElement.parentElement);
          _toConsumableArray(e.currentTarget.querySelectorAll('.row-actions .acc-item')).forEach(function (eli) {
            eli.addEventListener('click', function (e) {
              switch (e.currentTarget.dataset.acc) {
                case 'remove':
                  if (!confirm('Remove?')) return;
                  var section = e.currentTarget.closest(".controls").dataset.section;
                  var keyArr = e.currentTarget.dataset.sectionItem.split(".");
                  _this.page.sections[section].data[keyArr[0]].splice(keyArr[1], 1);
                  _this.obj.action = 'section-item-remove';
                  _this.cb.call({
                    action: 'section-item-remove'
                  });
                  _this.initSectionSingle("#collapse" + section + " .controls", _this.page.sections[section].data, _this.cb, true);
                  break;
              }
            });
          });
        });
        _toConsumableArray(el.querySelectorAll('.acc-item-add')).forEach(function (eli) {
          eli.addEventListener('click', function (e) {
            e.preventDefault();
            var section = e.currentTarget.parentElement.parentElement.dataset.section;
            var keyArr = e.currentTarget.parentElement.dataset.key.split(".");
            var obj = JSON.parse(JSON.stringify(_this.page.sections[section].data[keyArr[0]][0]));
            Object.keys(obj).forEach(function (key) {
              delete obj[key].id;
              delete obj[key].key;
              console.log(obj[key].key + ' ' + obj[key].id);
            });
            _this.page.sections[section].data[keyArr[0]].push(obj);
            _this.initSectionSingle("#collapse" + section + " .controls", _this.page.sections[section].data, _this.cb, true);
            toast(__html('Added'));
          });
        });
      });
    },
    findNodeById: function findNodeById(id, object) {
      var value;
      var e = this;
      Object.keys(object).some(function (k) {
        if (object[k].id === id) {
          value = object[k];
          return true;
        }
        if (object[k] && _typeof(object[k]) === 'object') {
          value = e.findNodeById(id, object[k]);
          return value !== undefined;
        }
      });
      return value;
    },
    loadDependencies: function loadDependencies(dep, cb) {
      if (document.getElementById(dep)) {
        if (typeof cb === 'function') cb.call();
        return;
      }
      var t = dep.split('.').slice(-1)[0];
      switch (t) {
        case 'js':
          var js = document.createElement("script");
          js.setAttribute("src", "/assets/js/controls/" + dep);
          js.id = dep;
          js.onload = js.onreadystatechange = function () {
            if (!this.readyState || this.readyState == 'complete') if (typeof cb === 'function') cb.call();
          };
          document.body.appendChild(js);
          break;
        case 'css':
          var head = document.getElementsByTagName('head')[0];
          var css = document.createElement('link');
          css.id = dep;
          css.rel = 'stylesheet';
          css.type = 'text/css';
          css.href = '/assets/js/controls/' + dep;
          head.appendChild(css);
          break;
      }
      return true;
    },
    triggerClick: function triggerClick(el) {
      var evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      !el.dispatchEvent(evt);
    }
  };

  var HTMLContent = function HTMLContent() {
    return "\n  <div class=\"container p-edit\">\n    <div class=\"d-md-flex justify-content-between bd-highlight mb-3\">\n        <nav class=\"bc\" aria-label=\"breadcrumb\"></nav>\n        <div>\n            <a class=\"preview-link nounderline d-md-inline-block d-none me-3\" target=\"_blank\" href=\"#\">".concat(__html('open page'), "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-arrow-right-short\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z\"/></svg></a>\n            <button class=\"btn btn-primary btn-publish mt-3 mb-1 mt-md-0 mb-md-0\" type=\"button\">").concat(__html('Save Changes'), "</button>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-lg-6 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card\">\n            <div class=\"accordion accordion-solid-header sections\" id=\"sections\" role=\"tablist\" style=\"width:100%;\">\n\n                <div class=\"add-card add-layout border-white p-sm-2 anm br mt-3\" data-ext=\"\">\n                    <div class=\"card-body\">\n                        <div class=\"d-flex flex-row justify-content-center\">\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"90\" height=\"90\" fill=\"currentColor\" style=\"color:#ccc;\" class=\"bi bi-plus-circle justify-content-center p-3\" viewBox=\"0 0 16 16\">\n                            <path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\"></path>\n                            <path d=\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z\"></path>\n                            </svg>\n                        </div>                  \n                    </div>\n                </div>\n\n            </div>\n        </div>\n        <div class=\"col-lg-6 mt-3 mt-lg-0 grid-margin grid-margin-lg-0 grid-margin-md-0\">\n\n            <div class=\"row\">\n                <div class=\"col-12 grid-margin stretch-card\">\n                \n                    <iframe class=\"preview card border-white shadow-sm br iload\" style=\"width:100%;border:none;border-radius:4px;\" ></iframe>\n\n                    <div class=\"card border-white shadow-sm p-sm-3 d-none\">\n                        <div class=\"card-body\">\n     \n                            <h4 class=\"card-title\" style=\"display:none;\">").concat(__html('General'), "</h4>\n                            <div class=\"landing_status\"></div>\n                            <input type=\"hidden\" class=\"form-control\" id=\"landing-slug\" value=\"\">\n\n                            <h4 id=\"elan\" class=\"card-title mb-4\">").concat(__html('Status'), "</h4>\n                            <div id=\"status-cont\" class=\"mb-3\">\n\n                                <div class=\"col-sm-12\">\n                                    <div class=\"form-check\">\n                                        <label class=\"form-check-label status-publish form-label\">\n                                            <input type=\"radio\" class=\"form-check-input\" name=\"p-status\"\n                                                id=\"p-status1\" value=\"1\">\n                                                ").concat(__html('Published'), "\n                                        </label>\n                                    </div>\n                                </div>\n\n                                <div class=\"col-sm-12\">\n                                    <div class=\"form-check\">\n                                        <label class=\"form-check-label status-draft form-label\">\n                                            <input type=\"radio\" class=\"form-check-input\" name=\"p-status\"  id=\"p-status0\" value=\"0\">\n                                            ").concat(__html('Draft'), "\n                                        </label>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <h4 id=\"elan\" class=\"card-title mb-4\">").concat(__html('Categories'), "</h4>\n                            <div id=\"p-cats\" class=\"simple-tags mb-4\" data-simple-tags=\"\"></div>\n                            <div class=\"clearfix\"> </div>\n\n                            <div class=\"d-grid gap-2\">\n                                <button class=\"btn btn-primary btn-save\" type=\"button\">").concat(__html('Save'), "</button>\n                            </div>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n  </div>\n\n  <div class=\"modal p-modal\" tabindex=\"-1\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\"></h5>\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n            </div>\n            <div class=\"modal-body\">\n\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-primary btn-modal\"></button>\n                <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\"></button>\n            </div>\n        </div>\n    </div>\n  </div>\n\n  <div class=\"position-fixed bottom-0 p-2 m-4 end-0 align-items-center\">\n    <div class=\"toast hide align-items-center text-white bg-dark border-0\" role=\"alert\" aria-live=\"assertive\"\n        aria-atomic=\"true\" data-bs-delay=\"3000\">\n        <div class=\"d-flex\">\n            <div class=\"toast-body\"></div>\n            <button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>\n        </div>\n    </div>\n  </div>\n  ");
  };

  var Edit = _createClass(function Edit() {
    var _this = this;
    _classCallCheck(this, Edit);
    _defineProperty(this, "getData", function () {
      showLoader();
      var id = getParam('id');
      fetch('https://api-v1.kenzap.cloud/', {
        method: 'post',
        headers: H(),
        body: JSON.stringify({
          query: {
            user: {
              type: 'authenticate',
              fields: ['avatar'],
              token: getCookie('kenzap_token')
            },
            site: {
              type: 'find',
              key: 'pages-site',
              fields: ['_id', 'id', 'status', 'domain', 'title', 'updated'],
              id: getParam('site')
            },
            page: {
              type: 'find',
              key: 'pages-page',
              id: id,
              fields: ['_id', 'id', 'img', 'status', 'price', 'discounts', 'page', 'title', 'sdesc', 'cats', 'updated']
            },
            settings: {
              type: 'get',
              key: 'pages-settings',
              fields: ['currency', 'currency_symb', 'currency_symb_loc', 'tax_calc', 'tax_auto_rate', 'tax_rate', 'tax_display', 'scripts_product_edit', 'addons']
            },
            locale: {
              type: 'locale',
              source: ['extension'],
              key: 'ecommerce'
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        hideLoader();
        if (!response.success) {
          parseApiError(response);
          return;
        }
        if (response.success) {
          _this.state.response = response;
          _this.state.settings = response.settings;
          initHeader(response);
          document.querySelector('#contents').innerHTML = HTMLContent();
          _this.render(response.page);
          _this.initListeners('all');
          initFooter();
          if (response.settings.addons) if (response.settings.addons.product_edit) response.settings.addons.product_edit.forEach(function (obj) {
            loadAddon(obj.src, obj.version);
          });
        }
      })["catch"](function (error) {
        parseApiError(error);
      });
    });
    _defineProperty(this, "render", function (page) {
      var self = _this;
      initBreadcrumbs([{
        link: link('https://dashboard.kenzap.cloud'),
        text: __html('Home')
      }, {
        link: link('/sites/'),
        text: __html('Sites')
      }, {
        link: link('/pages/?id=' + getParam('site')),
        text: __html('Pages')
      }, {
        text: _this.state.response.page.page.title ? _this.state.response.page.page.title : __html('Edit')
      }]);
      Controls.page = page.page == "" ? {
        title: _this.state.response.page.title,
        sections: [],
        typography: {
          "body": {
            "font": {
              "hint": "",
              "input": "font",
              "title": "Font",
              "value": "Red Hat Mono",
              "default": ""
            },
            "type": {
              "hint": "",
              "input": "text",
              "title": "Type",
              "value": "sans-serif",
              "default": ""
            },
            "weight": {
              "hint": "",
              "input": "text",
              "title": "Weight",
              "value": "400",
              "default": ""
            }
          },
          "hint": "Font pairs, typography settings.",
          "title": "Fonts",
          "heading": {
            "font": {
              "hint": "",
              "input": "font",
              "title": "Font",
              "value": "Red Hat Mono",
              "default": ""
            },
            "type": {
              "hint": "",
              "input": "text",
              "title": "Type",
              "value": "monospace",
              "default": ""
            },
            "weight": {
              "hint": "",
              "input": "text",
              "title": "Weight",
              "value": "600",
              "default": ""
            }
          }
        }
      } : page.page;
      if (!Controls.page.palette) Controls.page.palette = [{
        color: '#111111',
        name: 'txtColorA',
        title: __html("Primary text color")
      }, {
        color: '#818181',
        name: 'txtColorB',
        title: __html("Secondary text color")
      }, {
        color: '#ffffff',
        name: 'txtColorC',
        title: __html("Inverse text color")
      }, {
        color: '#04106B',
        name: 'linkColorA',
        title: __html("Primary link color")
      }, {
        color: '#071881',
        name: 'linkColorB',
        title: __html("Secondary link color")
      }, {
        color: '#1941df',
        name: 'baseColorA',
        title: __html("Base color A")
      }, {
        color: '#48AA27',
        name: 'baseColorB',
        title: __html("Base color B")
      }, {
        color: '#FFBF00',
        name: 'accColorA',
        title: __html("Accent color A")
      }, {
        color: '#FF4635',
        name: 'accColorB',
        title: __html("Accent color B")
      }, {
        color: '#F7F7F7',
        name: 'grayColorA',
        title: __html("Gray color light")
      }, {
        color: '#c0c0c0',
        name: 'grayColorB',
        title: __html("Gray color normal")
      }, {
        color: '#818181',
        name: 'grayColorC',
        title: __html("Gray color dark")
      }];
      if (!Controls.page.slug) Controls.page.slug = slugify(Controls.page.title);
      document.querySelector('.preview-link').setAttribute('href', 'https://' + _this.state.response.site.domain + '/' + _this.state.response.page.page.slug + '/');
      Controls.page.slug_old = Controls.page.slug;
      self.editor();
      if (self.state.timeoutIframe1) clearTimeout(self.state.timeoutIframe1);
      self.state.timeoutIframe1 = setTimeout(function (e) {
        return self.preview();
      }, 500);
    });
    _defineProperty(this, "editor", function () {
      Controls.init(".sections", Controls.page, _this.controlsUpdates, 'sections');
    });
    _defineProperty(this, "initSections", function () {
      document.querySelectorAll('.sections > .card.lay').forEach(function (e) {
        return e.remove();
      });
      Controls.init(".sections", Controls.page, _this.controlsUpdates, 'sections');
    });
    _defineProperty(this, "controlsUpdates", function () {
      if (Controls.obj) {
        var action = Controls.obj.action;
        _this.state.changes = true;
        console.log(action);
        switch (action) {
          case 'section-moveup':
            _this.initSections();
            break;
          case 'section-movedown':
            _this.initSections();
            break;
          case 'section-copy':
            _this.initSections();
            break;
          case 'section-remove':
            _this.initSections();
            break;
        }
      }
      _this.preview();
    });
    _defineProperty(this, "initListeners", function () {
      var self = _this;
      onClick('.btn-publish', _this.listeners.save);
      onClick('.p-modal .btn-primary', _this.listeners.modalSuccessBtn);
      onClick('.add-layout', _this.listeners.addLayout);
      onClick('.remove-block', _this.listeners.removeBlock);
      window.addEventListener('scroll', function (e) {
        if (e.currentTarget.scrollY > 70 && document.querySelector('body').offsetWidth > 991) {
          document.querySelector('.preview').style.position = 'fixed';
          document.querySelector('.preview').style.top = '64px';
          document.querySelector('.preview').style.width = self.state.iframe_width + 'px';
        } else {
          document.querySelector('.preview').style.position = 'relative';
          document.querySelector('.preview').style.top = '0';
          document.querySelector('.preview').style.width = '100%';
          self.state.iframe_width = document.querySelector('.preview').offsetWidth;
        }
      });
      document.querySelector('.preview').addEventListener('load', function (e) {
        e.target.contentWindow.addEventListener('scroll', function (e) {
          self.state.iframeScrollY = e.currentTarget.scrollY;
        });
      });
    });
    _defineProperty(this, "listeners", {
      addLayout: function addLayout(e) {
        var modal = document.querySelector(".modal");
        var modalCont = new bootstrap.Modal(modal);
        modal.querySelector(".modal-dialog").style.maxWidth = '700px';
        modal.querySelector(".modal-dialog").style.minHeight = '500px';
        var CDN2 = 'https://static.kenzap.com';
        modal.querySelector(".modal-title").innerHTML = "<input type=\"text\" class=\"text-input form-control search-layout\" value=\"\" placeholder=\"".concat(__html('search'), "\" >");
        modal.querySelector(".btn-primary").style.display = 'none';
        modal.querySelector(".btn-secondary").innerHTML = __html('Cancel');
        showLoader();
        var getLayouts = function getLayouts(s) {
          fetch('https://api.pages.app.kenzap.cloud/', {
            method: 'post',
            headers: H(),
            body: JSON.stringify({
              query: {
                layouts: {
                  type: 'preview_sections',
                  template: 'page_template',
                  s: s
                }
              }
            })
          }).then(function (response) {
            return response.json();
          }).then(function (response) {
            if (response.success) {
              Controls.layouts = response.layouts;
              var html = '';
              html += '<div class="row">';
              for (var key in response.layouts) {
                html += "<div class=\"col-md-6\" style=\"margin:16px 0;\">\n                                        <h4>\n                                            ".concat(response.layouts[key]['meta']['title'], "\n                                            <div class=\"br-wrapper br-theme-css-stars\"><select id=\"profile-rating\" name=\"rating\" autocomplete=\"off\" style=\"display: none;\"><option value=\"1\">1</option><option value=\"2\">2</option><option value=\"3\">3</option><option value=\"4\">4</option><option value=\"5\">5</option></select><div class=\"br-widget\"><a href=\"#\" data-rating-value=\"1\" data-rating-text=\"1\" class=\"br-selected\"></a><a href=\"#\" data-rating-value=\"2\" data-rating-text=\"2\" class=\"br-selected\"></a><a href=\"#\" data-rating-value=\"3\" data-rating-text=\"3\" class=\"br-selected\"></a><a href=\"#\" data-rating-value=\"4\" data-rating-text=\"4\" class=\"br-selected\"></a><a href=\"#\" data-rating-value=\"5\" data-rating-text=\"5\" class=\"br-selected br-current\"></a></div></div>\n                                        </h4>\n                                        <img alt=\"").concat(response.layouts[key]['meta']['title'], "\" style=\"max-width:100%;\" src=\"").concat(CDN2 + '/preview/' + response.layouts[key]['template'] + '-' + response.layouts[key]['meta']['slug'] + '-600.jpeg?' + response.layouts[key]['meta']['updated'], "\" />\n                                        <a class=\"sclick csection\" data-index=\"").concat(key, "\" >").concat(__html('Choose this section'), "</a>\n                                    </div>");
              }
              if (!response.layouts.length) html += "<div class=\"form-text text-center\" style=\"margin:120px 0;\">".concat(__html('No layouts found'), "</p>");
              html += '</div>';
              modal.querySelector(".modal-body").innerHTML = html;
              onClick('.sclick', _this.listeners.sectionClick);
              modalCont.show();
            } else {
              simulateClick(simulateClick(document.querySelector('.modal .btn-close')));
              toast(__html('No layouts found.'));
            }
            hideLoader();
          })["catch"](function (error) {
            console.error('Error:', error);
          });
        };
        getLayouts('');
        var timeout = "";
        onKeyUp('.search-layout', function (e) {
          e.preventDefault();
          var s = e.currentTarget.value;
          if (timeout) clearTimeout(timeout);
          timeout = setTimeout(function (s) {
            getLayouts(s);
          }, 500, s);
        });
      },
      sectionClick: function sectionClick(e) {
        simulateClick(document.querySelector('.modal .btn-close'));
        var layout = Controls.layouts[e.currentTarget.dataset.index]['extra'];
        console.log(layout);
        layout['js'] = Controls.layouts[e.currentTarget.dataset.index]['js'];
        layout['css'] = Controls.layouts[e.currentTarget.dataset.index]['css'];
        layout['meta'] = Controls.layouts[e.currentTarget.dataset.index]['meta'];
        layout['data']['id'] = makeid(6);
        if (Controls.page.sections == undefined) Controls.page.sections = [];
        Controls.page.sections.push(layout);
        toast(__html('Layout added'));
        _this.initSections();
        _this.preview();
      },
      editBlock: function editBlock(e) {
        e.preventDefault();
        var amb = document.querySelector('.add-mix-block');
        amb.dataset.action = 'edit';
        amb.dataset.index = e.currentTarget.dataset.index;
        setTimeout(function () {
          return simulateClick(amb);
        }, 10);
      },
      removeBlock: function removeBlock(e) {
        e.preventDefault();
        var c = confirm(__html('Remove entire block?'));
        if (c) {
          e.currentTarget.parentNode.parentNode.remove();
        }
      },
      save: function save(e) {
        e.preventDefault();
        var data = {};
        data['site'] = getParam('site');
        data['page'] = Controls.page;
        if (!data.page.title) data.page.title = "Page " + Math.floor(Math.random() * 100);
        if (!data.page.slug) data.page.slug = slugify(data.page.title);
        data.page.sid = spaceID();
        var id = getParam('id');
        var site = getParam('site');
        showLoader();
        fetch('https://api-v1.kenzap.cloud/', {
          method: 'post',
          headers: H(),
          body: JSON.stringify({
            query: {
              page: {
                type: 'update',
                key: 'pages-page',
                id: id,
                sid: spaceID(),
                data: data
              }
            }
          })
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.success) {
            _this.getData();
          } else {
            parseApiError(response);
          }
        })["catch"](function (error) {
          parseApiError(error);
        });
        fetch('https://api.pages.app.kenzap.cloud/', {
          method: 'post',
          headers: H(),
          body: JSON.stringify({
            query: {
              page: {
                type: 'publish',
                html: _this.page,
                home: data.page.home_page,
                folder: data.page.slug,
                folder_old: data.page.slug_old,
                password: {
                  protect: data.page.password_protect,
                  password: data.page.password,
                  changes: data.page.password_changes ? true : false
                },
                page_id: id,
                site_id: site,
                sid: spaceID()
              }
            }
          })
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.success) {
            toast(__('Changes applied'));
          } else {
            parseApiError(response);
          }
        })["catch"](function (error) {
          parseApiError(error);
        });
      },
      openImage: function openImage(e) {
        e.preventDefault();
        simulateClick(document.querySelector(".aif-" + e.currentTarget.dataset.index));
      },
      previewImage: function previewImage(e) {
        e.preventDefault();
        var input = e.currentTarget;
        if (input.files && input.files[0]) {
          if (input.files[0].type != 'image/jpeg' && input.files[0].type != 'image/jpg' && input.files[0].type != 'image/png') {
            toast(__html("Please provide image in JPEG format"));
            return;
          }
          if (input.files[0].size > 5000000) {
            toast(__html("Please provide image less than 5 MB in size!"));
            return;
          }
          var index = input.dataset.index;
          var reader = new FileReader();
          reader.onload = function (e) {
            document.querySelector('.images-' + index).setAttribute('src', e.currentTarget.result);
          };
          reader.readAsDataURL(input.files[0]);
          e.currentTarget.parentElement.querySelector('.remove').classList.remove("hd");
        }
      },
      removeImage: function removeImage(e) {
        var index = e.currentTarget.parentElement.dataset.index;
        document.querySelector('.aif-' + index).value = '';
        document.querySelector('.images-' + index).setAttribute('src', 'https://account.kenzap.com/images/placeholder.jpg');
        e.currentTarget.classList.add("hd");
      },
      modalSuccessBtn: function modalSuccessBtn(e) {
        _this.listeners.modalSuccessBtnFunc(e);
      },
      modalSuccessBtnFunc: null
    });
    _defineProperty(this, "preview", function () {
      var self = _this;
      if (!Controls.page.sections) return;
      document.querySelector('.preview').style.opacity = '0.01';
      var js = "",
        js_cb = "",
        css = "";
      Controls.page.sections.forEach(function (section) {
        if (!section.js) return;
        js += section.js + ";";
        css += section.css + "\n";
        section.data.sid = spaceID();
        js_cb += "\n            new ".concat(section.meta["class"], "( ").concat(JSON.stringify(section.data), ");\n            ");
      });
      _this.page = "<!DOCTYPE html>\n            <html lang=\"en\">\n                <head>\n                    <title>".concat(Controls.page.title ? Controls.page.title : "Kenzap Page", "</title> \n                    <meta name=\"Description\" content=\"").concat(Controls.page.description ? Controls.page.description : "Kenzap Cloud Template", "\" />\n                    <meta charset=\"UTF-8\" />\n                    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n                    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\" />\n                    <link href=\"https://fonts.googleapis.com/css?family=").concat(Controls.page.typography.heading.font.value, ":200,400,600|").concat(Controls.page.typography.body.font.value, ":200,400,600\" rel=\"stylesheet\">\n                    <!-- Essential Layout styles Using major third by default https://type-scale.com -->\n                    <style>\n                    :root {\n                        ").concat(Controls.page.palette.map(function (palette, i) {
        return "--".concat(palette.name, ": ").concat(palette.color, ";\n");
      }).join(""), "\n                    }\n                    html{font-size:16px; line-height: 1.75; -webkit-text-size-adjust: 100%; }\n                    body{margin: 0; line-height: 1.75; font-weight: ; font-family: ").concat(Controls.page.typography.body.font.value, "; color: var(--txtColorA); }\n                    h1, h2, h3, h4, h5{font-weight: 200; line-height: 1.3; margin: 3rem 0 1.38rem; font-family: ").concat(Controls.page.typography.heading.font.value, "}\n                    h1{font-size: 3.052em;}\n                    h2{font-size: 2.441em;}\n                    h3{font-size: 1.953em;}\n                    h4{font-size: 1.563em;}\n                    h5{font-size: 1.25em;}\n                    p{margin-bottom: 1rem;}\n                    b,strong{font-weight: 600;}\n                    small{font-size: 80%;}\n                    \n                    /* section spacings */\n                    section.pd0{padding-top:0;padding-bottom:0;}\n                    section.pds{padding-top:32px;padding-bottom:32px;}\n                    section.pdm{padding-top:64px;padding-bottom:64px;}\n                    section.pdl{padding-top:128px;padding-bottom:128px;}\n                    section.pde{padding-top:172px;padding-bottom:172px;}\n                    @media screen and (max-width: 500px){ .section.pdl, section.pde{padding-top:64px;padding-bottom:64px;} }\n                    \n                    /* button styles */\n                    .btns,.btnl,.btn{transition:all 0.24s;margin-bottom:1rem;padding: 0.5rem 1.5rem;border: 1px solid var(--baseColorA);text-decoration: none;color: var(--txtColorA);display: inline-block;}\n                    .btns{padding: 0.5rem 0.75rem;font-size: 0.8rem;line-height: 1rem;}\n                    .btnl{padding: 1rem 2rem;font-size: 1.2rem;line-height: 1rem;}\n                    .btns:hover,.btnl:hover,.btn:hover{background-color: var(--baseColorA);color: var(--txtColorC);}\n                    \n                    /* section{padding: 64px 16px;} */\n                    .ql-align-center{text-align:center;}\n                    .ql-align-right{text-align:right;}\n                    .ql-align-left{text-align:left;}\n                    \n                    /* normalize */\n                    section div{box-sizing: border-box;}\n\n                    ").concat(css, "\n\n                    ").concat(Controls.page.css_rules, "\n                    \n                    </style>\n                </head>\n                <body>\n                    <div id=\"content\">\n\n\n                    </div>\n                    <script>").concat(js, "</script>\n                    <script>\n            \n                        document.addEventListener(\"DOMContentLoaded\", () => {\n                                    \n                            ").concat(js_cb, "\n                            \t\n                        });\n            \n                    </script>\n                </body>\n            </html>");
      document.querySelector('.preview').srcdoc = _this.page;
      document.querySelector('.preview').addEventListener('load', function (e) {
        document.querySelector('.preview').style.opacity = '0.01';
      });
      if (self.state.timeoutIframe2) clearTimeout(self.state.timeoutIframe2);
      self.state.timeoutIframe2 = setTimeout(function () {
        if (self.state.iframeScrollY) {
          document.querySelector('.preview').contentWindow.scrollTo({
            top: self.state.iframeScrollY,
            behavior: 'auto'
          });
        }
        self.state.timeoutIframe2 = setTimeout(function () {
          if (self.state.iframeScrollY) {
            document.querySelector('.preview').contentWindow.scrollTo({
              top: self.state.iframeScrollY,
              behavior: 'auto'
            });
          }
          document.querySelector('.preview').style.opacity = '1';
          self.state.timeoutIframe2 = setTimeout(function () {
            if (self.state.iframeScrollY) {
              document.querySelector('.preview').contentWindow.scrollTo({
                top: self.state.iframeScrollY,
                behavior: 'auto'
              });
            }
            document.querySelector('.preview').style.opacity = '1';
          }, 3000);
        }, 1000);
        document.querySelector('.preview').style.height = window.innerHeight * 2 / 3 + 'px';
        if (self.state.iframeScrollY) {
          document.querySelector('.preview').contentWindow.scrollTo({
            top: self.state.iframeScrollY,
            behavior: 'auto'
          });
        }
      }, 20);
    });
    _defineProperty(this, "loadImages", function (product) {
      var d = document;
      var id = getParam('id');
      var sid = spaceID();
      var t = '';
      for (var i = 0; i < 5; i++) {
        var img = product.img !== undefined && product.img[i] == 'true' ? 'https://preview.kenzap.cloud/S' + spaceID() + '/_site/images/product-' + product.id + '-' + (i + 1) + '-100x100.jpeg?' + product.updated : 'https://account.kenzap.com/images/placeholder.jpg';
        t += "          <div class=\"p-img-cont float-start\">            <p data-index=\"".concat(i, "\">              <img class=\"p-img images-").concat(i, "\" data-index=\"").concat(i, "\" width=\"100\" height=\"100\" src=\"").concat(img, "\" />              <span class=\"remove hd\" title=\"").concat(__html('Remove'), "\">\xD7</span>            </p>            <input type=\"file\" name=\"img[]\" data-type=\"search\" data-index=\"").concat(i, "\" class=\"file aif-").concat(i, " d-none\">          </div>");
      }
      d.querySelector(".ic").innerHTML = t;
      onClick('.p-img-cont img', _this.listeners.openImage);
      onClick('.p-img-cont .remove', _this.listeners.removeImage);
      onChange('.p-img-cont .file', _this.listeners.previewImage);
      for (var fi = 0; fi < 5; fi++) {
        var image_url = CDN + '/S' + sid + '/product-' + id + '-' + (parseInt(fi) + 1) + '-250.jpeg?' + product.updated;
        setTimeout(function (img, sel, _fi) {
          var allow = true;
          if (typeof product.img !== "undefined") {
            if (!product.img[_fi]) allow = false;
          }
          if (allow) {
            var _i = new Image();
            _i.onload = function () {
              d.querySelector(sel + _fi).setAttribute('src', img);
              d.querySelector(sel + _fi).parentElement.querySelector('.remove').classList.remove('hd');
            };
            _i.src = img;
          }
        }, 300, image_url, ".images-", fi);
      }
    });
    _defineProperty(this, "uploadImages", function () {
      if (document.querySelector(".imgupnote")) document.querySelector(".imgupnote").remove();
      var fi = 0;
      var _iterator = _createForOfIteratorHelper(document.querySelectorAll(".file")),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var fileEl = _step.value;
          fi += 1;
          var id = getParam('id');
          var sid = spaceID();
          var file = fileEl.files[0];
          if (typeof file === "undefined") continue;
          var fd = new FormData();
          var sizes = '1000|500|250|100x100';
          fd.append('id', id);
          fd.append('sid', sid);
          fd.append('pid', id);
          fd.append('key', 'image');
          fd.append('sizes', sizes);
          fd.append('file', file);
          fd.append('slug', 'product-' + id + '-' + fi);
          fd.append('token', getCookie('kenzap_token'));
          file.value = '';
          _this.state.ajaxQueue += 1;
          fetch("https://api-v1.kenzap.cloud/upload/", {
            body: fd,
            method: "post"
          }).then(function (response) {
            return response.json();
          }).then(function (response) {
            _this.state.ajaxQueue -= 1;
            if (response.success && _this.state.ajaxQueue == 0) {
              toast(__html("Product updated"));
              hideLoader();
            }
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (_this.state.ajaxQueue == 0) {
        toast(__html("Product updated"));
        hideLoader();
      }
    });
    _defineProperty(this, "laodScript", function (script) {
      var sjs = document.createElement("script");
      sjs.setAttribute("src", script + "?" + new Date().getTime());
      document.body.appendChild(sjs);
    });
    this.state = {
      ajaxQueue: 0,
      settings: {}
    };
    this.getData();
  });
  new Edit();

})();
//# sourceMappingURL=index.js.map
