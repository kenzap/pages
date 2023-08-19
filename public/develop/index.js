
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35735/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

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
   * Converts special characters `&`, `<`, `>`, `"`, `'` to HTML entities and does translation
   * 
   * @param text {String}  text
   * @returns {String} - text
   */
  const __attr = (text, ...p) => {

      text = String(text);

      if(text.length === 0){
  		return '';
  	}

      let cb = (text) => {

          return text.replace(/[<>'"]/g, tag => (
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
   * @name getSiteId
   * @description Gets current Kenzap Cloud space ID identifier from the URL.
   * 
   * @returns {string} id - Kenzap Cloud space ID.
   */
  const getSiteId = () => {
      
      let urlParams = new URLSearchParams(window.location.search);
      let id = urlParams.get('sid') ? urlParams.get('sid') : "";

      return id;
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

  var replaceQueryParam = function replaceQueryParam(param, newval, search) {
    var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    var query = search.replace(regex, "$1").replace(/&$/, '');
    return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
  };
  var getPageNumber = function getPageNumber() {
    var urlParams = new URLSearchParams(window.location.search);
    var page = urlParams.get('page') ? urlParams.get('page') : 1;
    return parseInt(page);
  };
  var getPagination = function getPagination(__, meta, cb) {
    if (typeof meta === 'undefined') {
      document.querySelector("#listing_info").innerHTML = __('no records to display');
      return;
    }
    var offset = meta.limit + meta.offset;
    if (offset > meta.total_records) offset = meta.total_records;
    document.querySelector("#listing_info").innerHTML = __("Showing %1$ to %2$ of %3$ entries", 1 + meta.offset, offset, meta.total_records);
    var pbc = Math.ceil(meta.total_records / meta.limit);
    document.querySelector("#listing_paginate").style.display = pbc < 2 ? "none" : "block";
    var page = getPageNumber();
    var html = '<ul class="pagination d-flex justify-content-end pagination-flat mb-0">';
    html += '<li class="paginate_button page-item previous" id="listing_previous"><a href="#" aria-controls="order-listing" data-type="prev" data-page="0" tabindex="0" class="page-link"><span aria-hidden="true">&laquo;</span></li>';
    var i = 0;
    while (i < pbc) {
      i++;
      if (i >= page - 3 && i <= page || i <= page + 3 && i >= page) {
        html += '<li class="paginate_button page-item ' + (page == i ? 'active' : '') + '"><a href="#" aria-controls="order-listing" data-type="page" data-page="' + i + '" tabindex="0" class="page-link">' + (page == i ? i : i) + '</a></li>';
      }
    }
    html += '<li class="paginate_button page-item next" id="order-listing_next"><a href="#" aria-controls="order-listing" data-type="next" data-page="2" tabindex="0" class="page-link"><span aria-hidden="true">&raquo;</span></a></li>';
    html += '</ul>';
    document.querySelector("#listing_paginate").innerHTML = html;
    var page_link = document.querySelectorAll(".page-link");
    var _iterator = _createForOfIteratorHelper(page_link),
      _step;
    try {
      var _loop = function _loop() {
        var l = _step.value;
        l.addEventListener('click', function (e) {
          var p = parseInt(getPageNumber());
          var ps = p;
          switch (l.dataset.type) {
            case 'prev':
              p -= 1;
              if (p < 1) p = 1;
              break;
            case 'page':
              p = l.dataset.page;
              break;
            case 'next':
              p += 1;
              if (p > pbc) p = pbc;
              break;
          }
          if (window.history.replaceState) {
            var str = window.location.search;
            str = replaceQueryParam('page', p, str);
            window.history.replaceState("kenzap-cloud", document.title, window.location.pathname + str);
          }
          if (ps != p) cb();
          e.preventDefault();
          return false;
        });
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };
  var formatStatus = function formatStatus(__, st) {
    st = parseInt(st);
    switch (st) {
      case 0:
        return '<div class="badge bg-warning text-dark fw-light">' + __('Draft') + '</div>';
      case 1:
        return '<div class="badge bg-primary fw-light">' + __('Published') + '</div>';
      case 3:
        return '<div class="badge bg-secondary fw-light">' + __('Unpublished') + '</div>';
      default:
        return '<div class="badge bg-secondary fw-light">' + __('Drafts') + '</div>';
    }
  };
  var formatTimeDetailed = function formatTimeDetailed(__, timestamp) {
    var d = new Date(parseInt(timestamp) * 1000);
    var t = d.toLocaleTimeString().split(':');
    return d.toLocaleDateString() + " " + t[0] + ":" + t[1];
  };
  var initFooter = function initFooter(_this) {
    var left = __html('Pages 1.0.5 by %1$Kenzap%2$. ❤️ Licensed %3$GPLv3%4$.', '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>', '<a class="text-muted" href="https://github.com/kenzap/pages" target="_blank">', '</a>');
    var right = __html('%1$Developer mode%2$', "<a class=\"text-muted\" href=\"".concat(link('/develop/'), "\" target=\"_self\">"), "</a>");
    document.querySelector("footer .row").innerHTML = "\n    <div class=\"d-sm-flex justify-content-center justify-content-sm-between\">\n        <span class=\"text-muted text-center text-sm-left d-block d-sm-inline-block\">".concat(left, "</span>\n        <span class=\"float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted\">").concat(right, "</span>\n    </div>");
  };
  var getSiteAPI = function getSiteAPI() {
    return window.location.host.indexOf("localhost") == 0 ? "https://siteapi-dev.kenzap.cloud/" : "https://siteapi.kenzap.cloud/";
  };

  var layoutsDevelopContent = function layoutsDevelopContent() {
    return "\n    <div class=\"container\">\n\n        <div class=\"d-md-flex justify-content-between bd-highlight mb-3\">\n            <nav class=\"bc\" aria-label=\"breadcrumb\"></nav>\n            <button class=\"btn btn-primary btn-add mt-3 mb-1 mt-md-0 mb-md-0\" type=\"button\">".concat(__html('Create layout'), "</button>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card\">\n                <div class=\"card border-white shadow-sm border-0\">\n                    <div class=\"card-body p-0\">\n                        <div class=\"no-footer\">\n                            <div class=\"row\">\n                                <div class=\"col-sm-12\">\n                                    <div class=\"table-responsive\">\n                                        <table class=\"table table-hover table-borderless align-middle table-striped- table-p-list mb-0\" style=\"min-width: 800px;\">\n                                            <thead>\n\n                                            </thead>\n                                            <tbody>\n\n                                            </tbody>\n                                        </table>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"row my-2\">\n                                <div class=\"col-sm-12 col-md-5 d-flex align-items-center\">\n                                    <div class=\"dataTables_info mx-2 text-secondary fw-lighter \" id=\"listing_info\" role=\"status\" aria-live=\"polite\">&nbsp;</div>\n                                </div>\n                                <div class=\"col-sm-12 col-md-7\">\n                                    <div class=\"dataTables_paginate paging_simple_numbers m-2\" id=\"listing_paginate\">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    \n    <div class=\"modal\" tabindex=\"-1\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <h5 class=\"modal-title\"></h5>\n                    <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                </div>\n                <div class=\"modal-body\">\n\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-primary btn-modal\"></button>\n                    <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\"></button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"position-fixed bottom-0 p-2 m-4 end-0 align-items-center\">\n        <div class=\"toast hide align-items-center text-white bg-dark border-0\" role=\"alert\" aria-live=\"assertive\"\n            aria-atomic=\"true\" data-bs-delay=\"3000\">\n            <div class=\"d-flex\">\n                <div class=\"toast-body\"></div>\n                <button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\"\n                    aria-label=\"Close\"></button>\n            </div>\n        </div>\n    </div>\n    \n    ");
  };

  var EditLayout = _createClass(function EditLayout(state) {
    var _this = this;
    _classCallCheck(this, EditLayout);
    _defineProperty(this, "init", function () {
      fetch(getSiteAPI() + 'v1/?' + new URLSearchParams({
        cmd: 'get_develop_layout',
        source: 'layout',
        token: getCookie('kenzap_token'),
        id: _this.state.layoutEditId
      })).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.success) {
          _this.state.layoutResponse = response;
          _this.render();
        } else {
          parseApiError(response);
        }
        hideLoader();
      })["catch"](function (error) {
        parseApiError(error);
      });
    });
    _defineProperty(this, "render", function () {
      var layout = _this.state.layoutResponse.layout;
      _this.state.modal = document.querySelector(".modal");
      _this.state.modalCont = new bootstrap.Modal(_this.state.modal);
      _this.state.modal.querySelector(".modal-dialog").classList.add('modal-fullscreen');
      _this.state.modal.querySelector(".modal-title").innerHTML = html(layout.meta.title);
      _this.state.modal.querySelector(".modal-footer").innerHTML = "\n            <button type=\"button\" class=\"btn btn-primary btn-update-layout\">".concat(__html('Update'), "</button>\n            <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">").concat(__html('Cancel'), "</button>\n        ");
      _this.state.modal.querySelector(".modal-body").innerHTML = "\n        <div class=\"form-cont\">\n            <div class=\"form-group mb-3\">\n                <div class=\"row\">\n                    <div class=\"col-md-6 grid-margin- stretch-card-\">\n                        <div class=\"card-\">\n                            <div class=\"card-body-\">\n                                <h6 class=\"card-title\">".concat(__html('HTML code'), "</h4>\n                                <textarea id=\"ace_html\" class=\"ace-editor w-400\" style=\"width:200px;height:200px;\"> </textarea>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 grid-margin- stretch-card-\">\n                        <div class=\"card-\">\n                            <div class=\"card-body-\">\n                                <h6 class=\"card-title\">").concat(__html('JSON data'), "</h4>\n                                <textarea id=\"ace_json\" class=\"ace-editor w-400\"> </textarea>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <br>\n                <div class=\"row\">\n                    <div class=\"col-md-6 grid-margin- stretch-card-\">\n                        <div class=\"card-\">\n                            <div class=\"card-body-\">\n                                <h6 class=\"card-title\">").concat(__html('JS code'), "</h4>\n                                <textarea id=\"ace_js\" class=\"ace-editor w-400\"> </textarea>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-md-6 grid-margin- stretch-card-\">\n                        <div class=\"card-\">\n                            <div class=\"card-body-\">\n                                <h6 class=\"card-title\">").concat(__html('CSS code'), " <span class=\"cssclass\"></span></h4>\n                                <textarea id=\"ace_css\" class=\"ace-editor w-400\"> </textarea>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <br>\n                <br>\n                <div class=\"row\">\n                    <div class=\"col-md-12 grid-margin stretch-card- settings\">\n                        <div class=\"card-\">\n                            <div class=\"card-body-\">\n                                <h6 class=\"card-title mb-3\">").concat(__html('Layout settings'), "</h4>\n                                <div class=\"row\" >\n                                    <div class=\"col-md-6\">\n                                        <div class=\"form-group row\">\n                                            <label for=\"title\" class=\"col-sm-3 col-form-label\">").concat(__html('Title'), "</label>\n                                            <div class=\"col-sm-9\">\n                                                <input id=\"title\" type=\"text\" class=\"text-input form-control  inps\" value=\"\" name=\"title\">\n                                                <p class=\"card-description mt-2 form-text\">").concat(__html('Layout title used in search and for section preview'), "</p>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"row\" >\n                                    <div class=\"col-md-6\">\n                                        <div class=\"form-group row\">\n                                            <label for=\"slug\" class=\"col-sm-3 col-form-label\">").concat(__html('Slug'), "</label>\n                                            <div class=\"col-sm-9\">\n                                                <input id=\"slug\" type=\"text\" class=\"text-input form-control  inps\" value=\"\" name=\"slug\" disabled>\n                                                <p class=\"card-description mt-2 form-text\">").concat(__html('Used for template navigation'), "</p>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"row\" >\n                                    <div class=\"col-md-6\">\n                                        <div class=\"form-group row\">\n                                            <label for=\"class\" class=\"col-sm-3 col-form-label\">").concat(__html('CSS Class'), "</label>\n                                            <div class=\"col-sm-9\">\n                                                <input id=\"class\" type=\"text\" class=\"text-input form-control  inps\" value=\"").concat(attr(layout.meta["class"]), "\" name=\"class\" disabled>\n                                                <p class=\"card-description mt-2 form-text\">").concat(__html('Unique class to be prefixed for each CSS rule'), "</p>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"row\" >\n                                    <div class=\"col-md-6\">\n                                        <div class=\"form-group row\">\n                                            <label for=\"template\" class=\"col-sm-3 col-form-label\">").concat(__html('Template'), "</label>\n                                            <div class=\"col-sm-9\">\n                                                <input id=\"template\" type=\"text\" class=\"text-input form-control  inps\" value=\"\" name=\"template\" >\n                                                <p class=\"card-description mt-2 form-text\">").concat(__html('Parent template required to render this layout'), "</p>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"row\" >\n                                    <div class=\"col-md-6\">\n                                        <div class=\"form-group row\">\n                                            <label for=\"version\" class=\"col-sm-3 col-form-label\">").concat(__html('Version'), "</label>\n                                            <div class=\"col-sm-9\">\n                                                <input id=\"version\" type=\"text\" class=\"text-input form-control  inps\" value=\"\" name=\"title\">\n                                                <p class=\"card-description mt-2 form-text\">").concat(__html('Layout version control'), "</p>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"row\" >\n                                    <div class=\"col-md-6\">\n                                        <div class=\"form-group row\">\n                                            <label for=\"description\" class=\"col-sm-3 col-form-label\">").concat(__html('Description'), "</label>\n                                            <div class=\"col-sm-9\">\n                                                <textarea id=\"description\" type=\"text\" class=\"text-input form-control  inps\" value=\"\" rows=\"2\" name=\"description\"></textarea>\n                                                <p class=\"card-description mt-2 form-text\">").concat(__html('Short layout description'), "</p>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"row\" >\n                                    <div class=\"col-md-6\">\n                                        <div class=\"form-group row\">\n                                            <label for=\"keywords\" class=\"col-sm-3 col-form-label\">").concat(__html('Keywords'), "</label>\n                                            <div class=\"col-sm-9\">\n                                                <textarea id=\"keywords\" type=\"text\" class=\"text-input form-control  inps\" value=\"\" rows=\"3\" name=\"keywords\"></textarea>\n                                                <p class=\"card-description mt-2 form-text\">").concat(__html('Separate keywords by ",". Ex.: slider, banner, image'), "</p>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"row\" >\n                                    <div class=\"col-md-6\">\n                                        <div class=\"form-group row\">\n                                            <label for=\"title\" class=\"col-sm-3 col-form-label\">").concat(__html('Repository'), "</label>\n                                            <div class=\"col-sm-9\">\n                                                <input id=\"repository\" type=\"text\" class=\"text-input form-control  inps\" value=\"\" name=\"title\">\n                                                <p class=\"card-repository mt-2 form-text\">").concat(__html('Link to Github repository where your layout is stored'), "</p>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"row\" >\n                                    <div class=\"col-md-6\">\n                                        <div class=\"form-group row\">\n                                            <label for=\"preview\" class=\"col-sm-3 col-form-label\">").concat(__html('Preview'), "</label>\n                                            <div class=\"col-sm-9\">\n\n                                                <div class=\"file-search-img image-cont image-preview\" data-id=\"preview_1\" >\n                                                    <img id=\"i_preview_1\" class=\"image\" src=\"https://static.kenzap.com/layouts/image.jpg\"/>\n                                                    <div id=\"p_preview_1\" class=\"progress\">\n                                                    <div class=\"progress-bar bg-primary progress-bar-striped progress-bar-animated\" role=\"progressbar\" style=\"width: 0%\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n                                                    </div>\n                                                </div>\n                                                <input id=\"u_preview_1\" type=\"file\" name=\"img[]\" class=\"image-upload\" data-iid=\"\" data-id=\"preview_1\"></input>\n                                                <input id=\"preview_1\" data-val=\"false\" type=\"hidden\" class=\"image-input image-val inps\" value=\"\"></input>\n                                                \n                                                <!-- <input id=\"preview\" type=\"text\" class=\"text-input form-control  inps\" value=\"\" name=\"preview\"> -->\n                                                <p class=\"card-description mt-2 form-text\">Layout preview image 1200x742px</p>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                \n                <p class=\"form-text\" >Need more help? <a target=\"_blank\" href=\"https://kenzap.com/help-center/\">Contact us here</a>.</p>            </div>\n        </div>");
      onClick('.btn-update-layout', function (e) {
        _this.update();
      });
      _this.state.modalCont.show();
      _this.listeners();
      _this.preview();
    });
    _defineProperty(this, "listeners", function () {
      var layout = _this.state.layoutResponse.layout;
      if (document.querySelector('#ace_html')) {
        _this.state.editor['html'] = ace.edit("ace_html");
        ace.config.set('basePath', 'https://account.kenzap.com/js/ace/');
        _this.state.editor['html'].setTheme("ace/theme/monokai");
        _this.state.editor['html'].getSession().setMode("ace/mode/html");
        _this.state.editor['html'].setValue(layout['html']);
        document.getElementById('ace_html');
      }
      if (document.querySelector('#ace_js')) {
        _this.state.editor['js'] = ace.edit("ace_js");
        _this.state.editor['js'].setTheme("ace/theme/monokai");
        _this.state.editor['js'].getSession().setMode("ace/mode/javascript");
        _this.state.editor['js'].setValue(layout['js']);
        document.getElementById('ace_js');
      }
      if (document.querySelector('#ace_json')) {
        try {
          document.querySelector('#title').value = html(layout['meta']['title']);
          document.querySelector('#version').value = html(layout['meta']['version']);
          document.querySelector('#description').value = html(layout['meta']['description'] ? layout['meta']['description'] : '');
          document.querySelector('#template').value = html(layout['meta']['template']);
          document.querySelector('#repository').value = html(layout['meta']['repository'] ? layout['meta']['repository'] : '');
          document.querySelector('#keywords').value = html(layout['meta']['keywords'] ? layout['meta']['keywords'] : '');
          document.querySelector('#slug').value = html(layout['meta']['slug']);
          document.querySelector('#class').value = html(layout['meta']['class']);
        } catch (e) {
          alert(e);
        }
        _this.state.editor['json'] = ace.edit("ace_json");
        _this.state.editor['json'].setTheme("ace/theme/monokai");
        _this.state.editor['json'].getSession().setMode("ace/mode/json");
        _this.state.editor['json'].setValue(JSON.stringify(layout['extra'], null, 2));
        document.getElementById('ace_json');
      }
      if (document.querySelector('#ace_css')) {
        _this.state.editor['css'] = ace.edit("ace_css");
        _this.state.editor['css'].setTheme("ace/theme/monokai");
        _this.state.editor['css'].getSession().setMode("ace/mode/css");
        document.querySelector('.cssclass').innerHTML = layout['meta']['class'];
        _this.state.editor['css'].setValue(layout['css']);
      }
    });
    _defineProperty(this, "preview", function () {
      var layout = _this.state.layoutResponse.layout;
      var d = new Date();
      var src = 'https://static.kenzap.com/preview/' + layout['meta']['template'] + '-' + layout['meta']['slug'] + '-600.jpeg?' + d.getTime();
      var image = new Image();
      image.src = src;
      image.onload = function () {
        if (image.width > 400) {
          layout['meta']['preview'] = true;
          document.querySelector("#i_preview_1").setAttribute("src", src);
          document.querySelector("#preview_1").setAttribute("data-val", true);
        }
      };
      document.querySelector("#u_preview_1").setAttribute("data-iid", layout['meta']['template'] + '-' + layout['meta']['slug']);
      var imgList = false;
      if (imgList) return;
      imgList = true;
      var ip = document.querySelectorAll(".image-preview");
      var _iterator = _createForOfIteratorHelper(ip),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var a = _step.value;
          a.addEventListener('click', function (e) {
            var inp = document.querySelector("#u_" + this.dataset.id);
            simulateClick(inp);
            return false;
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var iu = function iu(id, iid, file) {
        var fd = new FormData();
        fd.append('file', file);
        fd.append('id', iid);
        fd.append('cmd', 'store_image');
        fd.append('type', 'cloud_preview');
        fd.append('lang', 'en');
        fd.append('token', getCookie('kenzap_token'));
        document.querySelector("#p_" + id).style.display = "block";
        document.querySelector("#p_" + id + " > div").style.width = "0%";
        $.ajax({
          xhr: function xhr() {
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener("progress", function (evt) {
              if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                document.querySelector("#p_" + id + " > div").style.width = parseInt(percentComplete * 100) + '%';
                if (percentComplete == 1) setTimeout(function () {
                  document.querySelector("#p_" + id).style.display = "none";
                }, 500);
              }
            }, false);
            xhr.addEventListener("progress", function (evt) {
              if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                document.querySelector("#p_" + id + " > div").style.width = parseInt(percentComplete * 100) + '%';
                if (percentComplete == 1) setTimeout(function () {
                  document.querySelector("#p_" + id).style.display = "none";
                }, 500);
              }
            }, false);
            return xhr;
          },
          url: 'https://fileapi.kenzap.com/v1/',
          type: 'post',
          data: fd,
          contentType: false,
          processData: false,
          success: function success(response) {
            var js = JSON.parse(response);
            if (js.success) {
              document.querySelector("#preview_1").setAttribute("data-val", true);
            }
          }
        });
      };
      var iup = document.querySelectorAll(".image-upload");
      var _iterator2 = _createForOfIteratorHelper(iup),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _a = _step2.value;
          _a.addEventListener('change', function (e) {
            if (this.files && this.files[0]) {
              var fl = this;
              var reader = new FileReader();
              reader.onload = function (e) {
                var im = document.querySelector("#i_" + fl.dataset.id);
                if (im) im.setAttribute("src", e.target.result);
                iu(fl.dataset.id, fl.dataset.iid, fl.files[0]);
              };
              reader.readAsDataURL(fl.files[0]);
            }
          });
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    });
    _defineProperty(this, "update", function () {
      if (_this.state.modal.querySelector('.btn-update-layout').dataset.loading) return;
      _this.state.modal.querySelector('.btn-update-layout').dataset.loading = true;
      _this.state.modal.querySelector('.btn-update-layout').innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>' + __html('Loading..');
      try {
        var id = _this.state.layoutEditId;
        var jsonv = JSON.parse(_this.state.editor['json'].getValue());
        if (jsonv.data == undefined) jsonv.data = {};
        jsonv.data.version = document.querySelector("#version").value;
        jsonv.data.title = document.querySelector("#title").value;
        jsonv.data.slug = document.querySelector("#slug").value;
        jsonv.data.description = document.querySelector("#description").value;
        jsonv.data.preview = document.querySelector("#preview_1").dataset.val;
        jsonv.data.template = document.querySelector("#template").value;
        jsonv.data.keywords = document.querySelector("#keywords").value;
        var meta = {};
        meta['version'] = document.querySelector("#version").value;
        meta['title'] = document.querySelector("#title").value;
        meta['description'] = document.querySelector("#description").value;
        meta['preview'] = document.querySelector("#preview_1").dataset.val;
        meta['keywords'] = document.querySelector("#keywords").value;
        var _html = JSON.stringify(_this.state.editor['html'].getValue());
        var css = JSON.stringify(_this.state.editor['css'].getValue());
        var json = JSON.stringify(jsonv);
        var js = JSON.stringify(_this.state.editor['js'].getValue());
        showLoader();
        var fd = new FormData();
        fd.append('cmd', 'save_develop_layout');
        fd.append('version', document.querySelector("#version").value.trim());
        fd.append('title', document.querySelector("#title").value.trim());
        fd.append('description', document.querySelector("#description").value.trim());
        fd.append('preview', document.querySelector("#preview_1").dataset.val.trim());
        fd.append('keywords', document.querySelector("#keywords").value.trim());
        fd.append('repository', document.querySelector("#repository").value.trim());
        fd.append('html', _html);
        fd.append('css', css);
        fd.append('json', json);
        fd.append('js', js);
        fd.append('id', _this.state.layoutEditId);
        fd.append('token', getCookie('kenzap_token'));
        fetch(getSiteAPI() + 'v1/', {
          method: 'POST',
          body: fd
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          hideLoader();
          _this.state.modal.querySelector('.btn-update-layout').dataset.loading = "";
          _this.state.modal.querySelector('.btn-update-layout').innerHTML = __html('Update');
          if (response.success) {
            _this.state.refresh.call();
            _this.state.modalCont.hide();
            toast(__html('Layout updated'));
          } else {
            parseApiError(response);
          }
        })["catch"](function (error) {
          parseApiError(error);
        });
      } catch (e) {
        console.log(e);
      }
    });
    this.state = state;
    this.state.editor = [];
    this.init();
  });

  var Develop = _createClass(function Develop() {
    var _this = this;
    _classCallCheck(this, Develop);
    _defineProperty(this, "getData", function () {
      if (_this.state.firstLoad) showLoader();
      var s = document.querySelector('.search-cont input') ? document.querySelector('.search-cont input').value : '';
      fetch(getSiteAPI() + 'v1/?' + new URLSearchParams({
        cmd: 'get_develop_lists',
        token: getCookie('kenzap_token'),
        limit: _this.state.limit,
        offset: s.length > 0 ? 0 : getPageNumber() * _this.state.limit - _this.state.limit,
        search: s
      })).then(function (response) {
        return response.json();
      }).then(function (response) {
        console.log(response);
        response.locale = [];
        if (response.success) {
          _this.render(response);
          _this.initListeners();
          _this.initPagination(response);
          initFooter();
          hideLoader();
          _this.state.firstLoad = false;
        } else {
          parseApiError(response);
        }
      });
    });
    _defineProperty(this, "authUser", function (response) {
      if (response.user) {
        if (response.user.success == true) ;
      }
    });
    _defineProperty(this, "html", function () {
      if (!_this.state.firstLoad) return;
      document.querySelector('#contents').innerHTML = layoutsDevelopContent();
    });
    _defineProperty(this, "render", function (response) {
      if (_this.state.firstLoad) {
        initBreadcrumbs([{
          link: link('https://dashboard.kenzap.cloud'),
          text: __html('Home')
        }, {
          link: link('/sites/'),
          text: __html('Sites')
        }, {
          text: __html('Developer')
        }]);
        document.querySelector(".table thead").innerHTML = "\n                <tr>\n                    <th class=\"text-center\">\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"#212529\" class=\"bi justify-content-end bi-search mb-1\" viewBox=\"0 0 16 16\" >\n                            <path d=\"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z\"></path>\n                        </svg>\n                    </th>\n                    <th>\n                        <div class=\"search-cont input-group input-group-sm mb-0 justify-content-start\">     \n                            <input type=\"text\" placeholder=\"".concat(__html('Search'), "\" class=\"form-control border-top-0 border-start-0 border-end-0 rounded-0\" aria-label=\"").concat(__html('Search products'), "\" aria-describedby=\"inputGroup-sizing-sm\" style=\"max-width: 200px;\">\n                        </div>\n                        <span>").concat(__html("Layout"), "</span>\n                    </th>\n                    <th>").concat(__html("Status"), "</th>\n                    <th>").concat(__html("Class"), "</th>\n                    <th>").concat(__html("Updated"), "</th>\n                    <th></th>\n                </tr>");
      }
      getSiteId();
      _this.state.settings = response.settings;
      _this.state.layouts = response.layouts;
      if (!response.layouts) response.layouts = [];
      if (response.layouts.length == 0) {
        document.querySelector(".table tbody").innerHTML = "<tr><td colspan=\"6\" class=\"text-center form-text fs-6 p-3\">".concat(__html("no layouts to display"), "</td></tr>");
        return;
      }
      document.querySelector(".table tbody").innerHTML = response.layouts.map(function (layout, x) {
        layout.img = 'https://cdn.kenzap.com/loading.png';
        if (!layout.meta.preview) layout.meta.preview = "false";
        if (layout.meta.preview == "true") layout.img = "https://static.kenzap.com/preview/".concat(attr(layout.template + '-' + layout.meta.slug), "-600.jpeg?") + __attr(layout.meta.updated);
        return "\n            <tr>\n                <td>\n                    <div class=\"timgc\">\n                        <a href=\"".concat(link('/develop-edit/?id=' + attr(layout.id)), "\" class=\"edit-layout\" data-id=\"").concat(attr(layout.id), "\"><img src=\"").concat(layout.img, "\" data-srcset=\"").concat(layout.img, "\" class=\"img-fluid rounded\" alt=\"").concat(__attr("Layout placeholder"), "\" srcset=\"").concat(layout.img, "\" ></a>\n                    </div>\n                </td>\n                <td class=\"destt\" style=\"max-width:250px;\">\n                    <div>\n                        <a style=\"font-size:15px;color:#000E35;\" class=\"edit-layout\" href=\"").concat(link('/develop-edit/?id=' + attr(layout.id)), "\" data-id=\"").concat(attr(layout.id), "\"><b>").concat(html(layout.meta.title), "</b><i style=\"color:#9b9b9b;font-size:16px;margin-left:8px;display:none\" title=\"Edit\" class=\"mdi mdi-pencil menu-icon edit-cat\"></i></a>\n                        <div style=\"font-size:12px;\">").concat(html(layout.template), " template</div>\n                    </div>\n                </td>\n                <td class=\"\">\n                    ").concat(formatStatus(__html, layout.meta.status ? layout.meta.status : 1), "\n                </td>\n                <td class=\"form-text text-danger\">\n                    .").concat(__html(layout.meta["class"]), "\n                </td>\n                <td class=\"form-text\">\n                    ").concat(formatTimeDetailed(__html, layout.meta.updated), "\n                </td>\n                <td class=\"text-end\">\n                    <div class=\"dropdown layoutActionsCont\">\n                        <svg id=\"layoutActions").concat(attr(x), "\" data-bs-toggle=\"dropdown\" data-boundary=\"viewport\" aria-expanded=\"false\" xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"bi bi-three-dots-vertical dropdown-toggle po\" viewBox=\"0 0 16 16\">\n                            <path d=\"M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z\"/>\n                        </svg>\n                        <ul class=\"dropdown-menu\" aria-labelledby=\"layoutActions").concat(attr(x), "\">\n                            <li><a class=\"dropdown-item po edit-layout\" href=\"#\" data-id=\"").concat(attr(layout.id), "\" data-index=\"").concat(attr(x), "\">").concat(__html('Edit'), "</a></li>\n                            <li><a class=\"dropdown-item po download-template\" href=\"#\" data-title=\"").concat(html(layout.meta.title), "\" data-template=\"").concat(attr(layout.template), "\" data-slug=\"").concat(attr(layout.meta.slug), "\" data-class=\"").concat(attr(layout.meta["class"]), "\" data-id=\"").concat(attr(layout.id), "\" data-index=\"").concat(attr(x), "\">").concat(__html('Download'), "</a></li>\n                            <li><a class=\"dropdown-item po d-none\" href=\"#\" data-id=\"").concat(attr(layout.id), "\" data-index=\"").concat(attr(x), "\">").concat(__html('Duplicate'), "</a></li>\n                            <li><a class=\"dropdown-item po d-none\" href=\"#\" data-type=\"query\" data-id=\"").concat(attr(layout.id), "\" data-_id=\"").concat(attr(layout.id), "\" data-index=\"").concat(attr(x), "\">").concat(__html('Query'), "</a></li>\n                            <li><hr class=\"dropdown-divider d-none-\"></li>\n                            <li><a class=\"dropdown-item po remove-layout\" href=\"#\" data-type=\"cancel\" data-id=\"").concat(attr(layout.id), "\" data-index=\"").concat(attr(x), "\">").concat(__html('Remove'), "</a></li>\n                        </ul>\n                    </div>\n                </td>\n            </tr>");
      }).join('');
    });
    _defineProperty(this, "initListeners", function () {
      onClick('.remove-layout', _this.listeners.removeLayout);
      onClick('.view-pages', _this.listeners.viewPages);
      onClick('.download-template', _this.listeners.downloadTemplate);
      onClick('.edit-layout', _this.listeners.editLayout);
      onClick('.table-p-list .bi-search', _this.listeners.searchProductsActivate);
      if (!_this.state.firstLoad) return;
      onClick('.btn-add', _this.addLayout);
      onClick('.btn-modal', _this.listeners.modalSuccessBtn);
    });
    _defineProperty(this, "listeners", {
      downloadTemplate: function downloadTemplate(e) {
        e.preventDefault();
        toast(__html("Downloading"));
        showLoader();
        var saveBlob = function saveBlob(blob, fileName) {
          var a = document.createElement('a');
          a.href = window.URL.createObjectURL(blob);
          a.download = fileName;
          a.dispatchEvent(new MouseEvent('click'));
        };
        var cl = e.currentTarget.dataset["class"];
        var slug = e.currentTarget.dataset.slug;
        var title = e.currentTarget.dataset.title;
        var template = e.currentTarget.dataset.template;
        fetch('https://api.pages.app.kenzap.cloud/', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Kenzap-Locale': getCookie('locale') ? getCookie('locale') : "en",
            'Kenzap-Token': getCookie('kenzap_token')
          },
          body: JSON.stringify({
            query: {
              download: {
                type: 'download-template',
                "class": cl,
                title: title,
                slug: slug,
                template: template,
                data: []
              }
            }
          })
        }).then(function (response) {
          return response.blob();
        }).then(function (data) {
          hideLoader();
          if (data.size < 100) {
            data.text().then(function (result) {
              var js = JSON.parse(result);
              if (!js.success) {
                toast(__html("Can not download template"));
              }
            });
          } else {
            saveBlob(data, template + '.zip');
          }
        })["catch"](function (error) {
          parseApiError(error);
        });
      },
      removeLayout: function removeLayout(e) {
        e.preventDefault();
        var c = confirm(__html('Completely remove this layout?'));
        if (!c) return;
        showLoader();
        fetch(_this.getSiteAPI() + 'v1/?' + new URLSearchParams({
          cmd: 'remove_layout',
          token: getCookie('kenzap_token'),
          id: e.currentTarget.dataset.id
        })).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.success) {
            toast(__html('Layout removed'));
            _this.getData();
          } else {
            parseApiError(response);
          }
        })["catch"](function (error) {
          parseApiError(error);
        });
      },
      viewPages: function viewPages(e) {
        e.preventDefault();
      },
      editLayout: function editLayout(e) {
        e.preventDefault();
        _this.state.layoutEditId = e.currentTarget.dataset.id;
        _this.state.refresh = function () {
          _this.getData();
        };
        _this.state.editLayout = new EditLayout(_this.state);
      },
      searchProductsActivate: function searchProductsActivate(e) {
        e.preventDefault();
        document.querySelector('.table-p-list thead tr th:nth-child(2) span').style.display = 'none';
        document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont').style.display = 'flex';
        document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont input').focus();
        onKeyUp('.table-p-list thead tr th:nth-child(2) .search-cont input', _this.listeners.searchProducts);
      },
      searchProducts: function searchProducts(e) {
        e.preventDefault();
        _this.getData();
      },
      modalSuccessBtn: function modalSuccessBtn(e) {
        _this.listeners.modalSuccessBtnFunc(e);
      },
      modalSuccessBtnFunc: null
    });
    _defineProperty(this, "addLayout", function (e) {
      var modal = document.querySelector(".modal");
      var modalCont = new bootstrap.Modal(modal);
      modal.querySelector(".modal-title").innerHTML = __html('Add Layout');
      modal.querySelector(".modal-footer").innerHTML = "\n            <button type=\"button\" class=\"btn btn-primary btn-add-layout\">".concat(__html('Add'), "</button>\n            <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">").concat(__html('Cancel'), "</button>\n        ");
      modal.querySelector(".modal-body").innerHTML = "\n        <div class=\"form-cont\">\n            <img style=\"width:100%;max-height:200px;\" class=\"mb-3\" src=\"/assets/img/new-entry.svg\">\n            <div class=\"form-group mb-3\">\n                <div class=\"form-group\">\n                    <label for=\"tname\">".concat(__html('Layout name'), "</label>\n                    <input id=\"tname\" class=\"form-control tname\" type=\"text\" placeholder=\"Interactive Slider\" />\n                    <p class=\"form-text\" >").concat(__html('Make it short. Once layout name is assigned it can not be changed.'), "</p>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"ttemp\">").concat(__html('Template (optional)'), "</label>\n                    <input id=\"ttemp\" class=\"form-control ttemp\" type=\"text\" placeholder=\"universal\" value=\"Universal\" />\n                    <p class=\"form-text\" >").concat(__html('Specify this option if layout relies on Cloud Applicaton API.'), "</p>\n                </div>\n                <p class=\"form-text\" >Need more help? <a target=\"_blank\" href=\"https://kenzap.com/help-center/\">Contact us here</a>.</p>            </div>\n        </div>");
      onClick('.btn-add-layout', function (e) {
        e.preventDefault();
        var tname = modal.querySelector(".tname").value;
        if (tname.length < 4) {
          alert("Please enter longer name");
          return false;
        }
        var tnameF = tname.replace(/[^\w\s]/gi, '');
        showLoader();
        fetch(_this.getSiteAPI() + 'v1/?' + new URLSearchParams({
          cmd: 'create_layout',
          token: getCookie('kenzap_token'),
          tname: tnameF,
          ttemp: modal.querySelector(".ttemp").value
        })).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.success) {
            modalCont.hide();
            toast(__html('Layout created'));
            _this.getData();
          } else {
            parseApiError(response);
          }
        })["catch"](function (error) {
          parseApiError(error);
        });
      });
      modalCont.show();
      setTimeout(function () {
        return modal.querySelector("#tname").focus();
      }, 100);
    });
    _defineProperty(this, "initPagination", function (response) {
      getPagination(__, response.meta_layouts, _this.getData);
    });
    this.state = {
      firstLoad: true,
      settings: {},
      limit: 10
    };
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
      if (response.success) {
        initHeader(response);
        _this.html();
        _this.getData();
      }
    });
  });
  new Develop();

})();
//# sourceMappingURL=index.js.map
