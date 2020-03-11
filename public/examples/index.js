define('examples/index.jsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  /**
   * @file entry of this example.
   * @author liaoxuezhi@cloud.com
   */
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var react_dom_1 = require("node_modules/react-dom/index");
  var App_1 = tslib_1.__importDefault(require("examples/components/App.jsx"));
  function bootstrap(mountTo, initalState) {
      react_dom_1.render(react_1.default.createElement(App_1.default, null), mountTo);
  }
  exports.bootstrap = bootstrap;
  //# sourceMappingURL=/examples/index.js.map
  

});
