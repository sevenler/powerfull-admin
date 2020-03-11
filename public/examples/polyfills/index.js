define('examples/polyfills/index.ts', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  require("examples/polyfills/Object.assign.ts");
  require("examples/polyfills/Array.from.ts");
  require("examples/polyfills/Array.find.ts");
  require("examples/polyfills/cloest.ts");
  require("node_modules/promise/polyfill");
  require("node_modules/es6-symbol/implement");
  //# sourceMappingURL=/examples/polyfills/index.js.map
  

});
