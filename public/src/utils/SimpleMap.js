define('src/utils/SimpleMap.ts', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  var findIndex_1 = tslib_1.__importDefault(require("node_modules/lodash/findIndex"));
  var SimpleMap = /** @class */ (function () {
      function SimpleMap() {
          this.list = [];
      }
      SimpleMap.prototype.set = function (key, value) {
          this.list.push({
              key: key,
              value: value
          });
      };
      SimpleMap.prototype.get = function (key) {
          var resolved = find_1.default(this.list, function (item) { return item.key === key; });
          return resolved ? resolved.value : null;
      };
      SimpleMap.prototype.delete = function (key) {
          var idx = findIndex_1.default(this.list, function (item) { return item.key === key; });
          ~idx && this.list.splice(idx, 1);
      };
      SimpleMap.prototype.dispose = function () {
          this.list.splice(0, this.list.length);
      };
      return SimpleMap;
  }());
  exports.SimpleMap = SimpleMap;
  //# sourceMappingURL=/src/utils/SimpleMap.js.map
  

});
