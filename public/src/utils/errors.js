define('src/utils/errors.ts', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var ServerError = /** @class */ (function (_super) {
      tslib_1.__extends(ServerError, _super);
      function ServerError(msg, response) {
          var _this = _super.call(this, msg) || this;
          _this.type = 'ServerError';
          _this.response = response;
          return _this;
      }
      return ServerError;
  }(Error));
  exports.ServerError = ServerError;
  //# sourceMappingURL=/src/utils/errors.js.map
  

});
