define('examples/loader.ts', function(require, exports, module) {

  var __moduleId = function (str) { return ''; };
  var mapping = {
      'jquery': 'node_modules/jquery/dist/jquery',
      'react': 'node_modules/react/index',
      'react-dom': 'node_modules/react-dom/index',
      'react-addons-update': 'node_modules/react-addons-update/index',
      'immutability-helper': 'node_modules/react-addons-update/index',
      'react-cropper': 'node_modules/react-cropper/dist/react-cropper',
      'react-dropzone': 'node_modules/react-dropzone/dist/index',
      'classnames': 'node_modules/classnames/index',
      'axios': 'node_modules/axios/index',
      'moment': 'node_modules/moment/moment',
      'mobx': 'node_modules/mobx/lib/index',
      'mobx-state-tree': 'node_modules/mobx-state-tree/dist/mobx-state-tree',
      'react-transition-group': 'node_modules/react-transition-group/index',
      'echarts': 'node_modules/echarts/index',
      'zrender': 'node_modules/zrender/index',
      'sortablejs': 'node_modules/sortablejs/Sortable',
      'amis': 'src/index.tsx',
      'amis/embed': 'examples/embed.tsx',
      'prop-types': 'node_modules/prop-types/index',
      'async': 'node_modules/async/dist/async',
      'qs': 'node_modules/qs/lib/index'
  };
  function amisRequire() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      var id = args.shift();
      id = Array.isArray(id) ? id.map(function (id) { return mapping[id] || id; }) : mapping[id] || id;
      args.unshift(id);
      return require.apply(this, args);
  }
  window.amisRequire = amisRequire;
  //# sourceMappingURL=/examples/loader.js.map
  

});
