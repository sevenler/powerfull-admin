define('src/themes/dark.ts', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var theme_1 = require("src/theme.tsx");
  exports.classPrefix = 'dark-';
  exports.classnames = theme_1.makeClassnames(exports.classPrefix);
  theme_1.theme('dark', {
      classPrefix: exports.classPrefix,
      classnames: exports.classnames,
      renderers: {
          'json': {
              jsonTheme: 'eighties'
          },
          'editor-control': {
              editorTheme: 'vs-dark'
          }
      }
  });
  //# sourceMappingURL=/src/themes/dark.js.map
  

});
