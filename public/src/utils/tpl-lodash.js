define('src/utils/tpl-lodash.ts', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var tpl_1 = require("src/utils/tpl.ts");
  var template_1 = tslib_1.__importDefault(require("node_modules/lodash/template"));
  var tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  var moment_1 = tslib_1.__importDefault(require("node_modules/moment/moment"));
  var imports = {
      default: undefined,
      moment: moment_1.default,
      countDown: function (end) {
          if (!end) {
              return '--';
          }
          var date = new Date(parseInt(end, 10) * 1000);
          var now = Date.now();
          if (date.getTime() < now) {
              return '已结束';
          }
          return Math.ceil((date.getTime() - now) / (1000 * 60 * 60 * 24)) + '天';
      },
      formatDate: function (value, format, inputFormat) {
          if (format === void 0) { format = 'LLL'; }
          if (inputFormat === void 0) { inputFormat = ''; }
          return moment_1.default(value, inputFormat).format(format);
      }
  };
  function lodashCompile(str, data) {
      try {
          var filters = tpl_builtin_1.getFilters();
          var finnalImports = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, filters), { formatTimeStamp: filters.date, formatNumber: filters.number, defaultValue: filters.defaut }), imports);
          delete finnalImports.default; // default 是个关键字，不能 imports 到 lodash 里面去。
          var fn = template_1.default(str, {
              imports: finnalImports,
              variable: 'data'
          });
          return fn(data);
      }
      catch (e) {
          return "<span class=\"text-danger\">" + e.message + "</span>";
      }
  }
  function register() {
      tpl_1.reigsterTplEnginer('lodash', {
          test: function (str) { return !!~str.indexOf('<%'); },
          compile: function (str, data) { return lodashCompile(str, data); }
      });
  }
  exports.register = register;
  //# sourceMappingURL=/src/utils/tpl-lodash.js.map
  

});
