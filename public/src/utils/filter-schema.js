define('src/utils/filter-schema.ts', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tpl_1 = require("src/utils/tpl.ts");
  /**
   * 处理 Props 数据，所有带 On 结束的做一次
   *
   * xxxOn
   * xxxExpr
   *
   *
   * @param schema
   * @param data
   */
  function getExprProperties(schema, data, blackList) {
      if (data === void 0) { data = {}; }
      if (blackList === void 0) { blackList = ['addOn']; }
      var exprProps = {};
      Object.getOwnPropertyNames(schema).forEach(function (key) {
          if (blackList && ~blackList.indexOf(key)) {
              return;
          }
          var parts = /^(.*)(On|Expr)$/.exec(key);
          var value = schema[key];
          if (value &&
              typeof value === 'string' &&
              parts &&
              (parts[2] === 'On' || parts[2] === 'Expr')) {
              key = parts[1];
              if (parts[2] === 'On' || parts[2] === 'Expr') {
                  value =
                      parts[2] === 'On' ? tpl_1.evalExpression(value, data) : tpl_1.filter(value, data);
              }
              exprProps[key] = value;
          }
      });
      return exprProps;
  }
  exports.default = getExprProperties;
  //# sourceMappingURL=/src/utils/filter-schema.js.map
  

});
