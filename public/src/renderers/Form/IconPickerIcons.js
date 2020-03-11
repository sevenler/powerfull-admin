define('src/renderers/Form/IconPickerIcons.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ICONS = [
      {
          name: 'Font Awesome 4.7',
          prefix: 'fa fa-',
          icons: [
              'slideshare',
              'snapchat',
              'snapchat-ghost',
              'snapchat-square',
              'soundcloud',
              'spotify',
              'stack-exchange',
              'stack-overflow'
          ]
      }
  ];
  function setIconVendor(icons) {
      exports.ICONS = icons;
  }
  exports.setIconVendor = setIconVendor;
  //# sourceMappingURL=/src/renderers/Form/IconPickerIcons.js.map
  

});
