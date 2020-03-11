define('examples/embed.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  require("examples/polyfills/index.ts");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var react_dom_1 = require("node_modules/react-dom/index");
  var axios_1 = tslib_1.__importDefault(require("node_modules/axios/index"));
  var copy_to_clipboard_1 = tslib_1.__importDefault(require("node_modules/copy-to-clipboard/index"));
  var qs_1 = tslib_1.__importDefault(require("node_modules/qs/lib/index"));
  var index_1 = require("src/index.tsx");
  function embed(container, schema, data, env) {
      if (typeof container === 'string') {
          container = document.querySelector(container);
      }
      if (!container) {
          console.error('选择器不对，页面上没有此元素');
          return;
      }
      else if (container.tagName === 'BODY') {
          var div = document.createElement('div');
          container.appendChild(div);
          container = div;
      }
      container.classList.add('amis-scope');
      var scoped;
      var normalizeLink = function (to) {
          to = to || '';
          var location = window.location;
          if (to && to[0] === '#') {
              to = location.pathname + location.search + to;
          }
          else if (to && to[0] === '?') {
              to = location.pathname + to;
          }
          var idx = to.indexOf('?');
          var idx2 = to.indexOf('#');
          var pathname = ~idx
              ? to.substring(0, idx)
              : ~idx2
                  ? to.substring(0, idx2)
                  : to;
          var search = ~idx ? to.substring(idx, ~idx2 ? idx2 : undefined) : '';
          var hash = ~idx2 ? to.substring(idx2) : location.hash;
          if (!pathname) {
              pathname = location.pathname;
          }
          else if (pathname[0] != '/' && !/^https?\:\/\//.test(pathname)) {
              var relativeBase = location.pathname;
              var paths = relativeBase.split('/');
              paths.pop();
              var m = void 0;
              while ((m = /^\.\.?\//.exec(pathname))) {
                  if (m[0] === '../') {
                      paths.pop();
                  }
                  pathname = pathname.substring(m[0].length);
              }
              pathname = paths.concat(pathname).join('/');
          }
          return pathname + search + hash;
      };
      var responseAdpater = function (api) { return function (value) {
          var response = value.data;
          if (env && env.responseAdpater) {
              var url = api.url;
              var idx = api.url.indexOf('?');
              var query = ~idx ? qs_1.default.parse(api.url.substring(idx)) : {};
              var request = tslib_1.__assign(tslib_1.__assign({}, api), { query: query, body: api.data });
              response = env.responseAdpater(api, response, query, request);
          }
          else {
              if (response.hasOwnProperty('errno')) {
                  response.status = response.errno;
                  response.msg = response.errmsg;
              }
              else if (response.hasOwnProperty('no')) {
                  response.status = response.no;
                  response.msg = response.error;
              }
          }
          var result = tslib_1.__assign(tslib_1.__assign({}, value), { data: response });
          return result;
      }; };
      react_dom_1.render(react_1.default.createElement("div", { className: "amis-routes-wrapper" },
          react_1.default.createElement(index_1.ToastComponent, { position: (env && env.toastPosition) || 'top-right', closeButton: false, timeOut: 5000, extendedTimeOut: 3000 }),
          react_1.default.createElement(index_1.AlertComponent, { container: container }),
          index_1.render(schema, tslib_1.__assign(tslib_1.__assign({}, data), { scopeRef: function (ref) { return (scoped = ref); } }), tslib_1.__assign({ getModalContainer: function () { return document.querySelector('.amis-scope'); }, notify: function (type, msg) {
                  return index_1.toast[type]
                      ? index_1.toast[type](msg, type === 'error' ? '系统错误' : '系统消息')
                      : console.warn('[Notify]', type, msg);
              }, alert: index_1.alert,
              confirm: index_1.confirm, updateLocation: function (to, replace) {
                  if (to === 'goBack') {
                      return window.history.back();
                  }
                  replace || (location.href = normalizeLink(to));
              }, isCurrentUrl: function (to) {
                  var link = normalizeLink(to);
                  var location = window.location;
                  var pathname = link;
                  var search = '';
                  var idx = link.indexOf('?');
                  if (~idx) {
                      pathname = link.substring(0, idx);
                      search = link.substring(idx);
                  }
                  if (search) {
                      if (pathname !== location.pathname || !location.search) {
                          return false;
                      }
                      var query_1 = qs_1.default.parse(search.substring(1));
                      var currentQuery_1 = qs_1.default.parse(location.search.substring(1));
                      return Object.keys(query_1).every(function (key) { return query_1[key] === currentQuery_1[key]; });
                  }
                  else if (pathname === location.pathname) {
                      return true;
                  }
                  return false;
              }, jumpTo: function (to, action) {
                  if (to === 'goBack') {
                      return window.history.back();
                  }
                  to = normalizeLink(to);
                  if (action && action.actionType === 'url') {
                      action.blank === false
                          ? (window.location.href = to)
                          : window.open(to);
                      return;
                  }
                  if (/^https?:\/\//.test(to)) {
                      window.location.replace(to);
                  }
                  else {
                      location.href = to;
                  }
              }, fetcher: function (api) {
                  var url = api.url, method = api.method, data = api.data, responseType = api.responseType, config = api.config, headers = api.headers;
                  config = config || {};
                  config.withCredentials = true;
                  responseType && (config.responseType = responseType);
                  if (config.cancelExecutor) {
                      config.cancelToken = new axios_1.default.CancelToken(config.cancelExecutor);
                  }
                  config.headers = headers || {};
                  config.method = method;
                  if (method === 'get' && data) {
                      config.params = data;
                  }
                  else if (data && data instanceof FormData) {
                      // config.headers['Content-Type'] = 'multipart/form-data';
                  }
                  else if (data &&
                      typeof data !== 'string' &&
                      !(data instanceof Blob) &&
                      !(data instanceof ArrayBuffer)) {
                      data = JSON.stringify(data);
                      config.headers['Content-Type'] = 'application/json';
                  }
                  data && (config.data = data);
                  return axios_1.default(url, config).then(responseAdpater(api));
              }, isCancel: function (value) { return axios_1.default.isCancel(value); }, copy: function (contents, options) {
                  if (options === void 0) { options = {}; }
                  var ret = copy_to_clipboard_1.default(contents, options);
                  ret && options.shutup !== true && index_1.toast.info('内容已拷贝到剪切板');
                  return ret;
              }, richTextToken: '' }, env))), container);
      return scoped;
  }
  exports.embed = embed;
  //# sourceMappingURL=/examples/embed.js.map
  

});
