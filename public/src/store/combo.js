define('src/store/combo.ts', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  var iRenderer_1 = require("src/store/iRenderer.ts");
  var formItem_1 = require("src/store/formItem.ts");
  var form_1 = require("src/store/form.ts");
  exports.UniqueGroup = mobx_state_tree_1.types.model('UniqueGroup', {
      name: mobx_state_tree_1.types.identifier,
      items: mobx_state_tree_1.types.array(mobx_state_tree_1.types.reference(mobx_state_tree_1.types.late(function () { return formItem_1.FormItemStore; })))
  });
  exports.ComboStore = iRenderer_1.iRendererStore
      .named('ComboStore')
      .props({
      uniques: mobx_state_tree_1.types.map(exports.UniqueGroup),
      forms: mobx_state_tree_1.types.array(mobx_state_tree_1.types.reference(mobx_state_tree_1.types.late(function () { return form_1.FormStore; }))),
      minLength: 0,
      maxLength: 0,
      length: 0,
      activeKey: 0
  })
      .views(function (self) { return ({
      get addable() {
          if (self.maxLength && self.length >= self.maxLength) {
              return false;
          }
          if (self.uniques.size) {
              var isFull_1 = false;
              self.uniques.forEach(function (item) {
                  if (isFull_1 || !item.items.length) {
                      return;
                  }
                  var total = item.items[0].options.length;
                  var current = item.items.reduce(function (total, item) {
                      return total + item.selectedOptions.length;
                  }, 0);
                  isFull_1 = total && current >= total ? true : false;
              });
              if (isFull_1) {
                  return false;
              }
          }
          return true;
      },
      get removable() {
          if (self.minLength && self.minLength >= self.length) {
              return false;
          }
          return true;
      }
  }); })
      .actions(function (self) {
      function config(setting) {
          typeof setting.minLength !== 'undefined' &&
              (self.minLength = parseInt(setting.minLength, 10));
          typeof setting.maxLength !== 'undefined' &&
              (self.maxLength = parseInt(setting.maxLength, 10));
          typeof setting.length !== 'undefined' && (self.length = setting.length);
      }
      function bindUniuqueItem(item) {
          if (!self.uniques.has(item.name)) {
              self.uniques.put({
                  name: item.name
              });
          }
          var group = self.uniques.get(item.name);
          group.items.push(item);
      }
      function unBindUniuqueItem(item) {
          var group = self.uniques.get(item.name);
          group.items.remove(item);
          if (!group.items.length) {
              self.uniques.delete(item.name);
          }
      }
      function addForm(form) {
          self.forms.push(form);
      }
      function removeForm(form) {
          // form 可能再它自己销毁的是已经被移除了。因为调用的是 destroy，所以 self.forms 里面也被一起移除。
          // 再来尝试移除，会报错。
          self.forms.includes(form) && self.forms.remove(form);
      }
      function setActiveKey(key) {
          self.activeKey = key;
      }
      return {
          config: config,
          setActiveKey: setActiveKey,
          bindUniuqueItem: bindUniuqueItem,
          unBindUniuqueItem: unBindUniuqueItem,
          addForm: addForm,
          removeForm: removeForm
      };
  });
  //# sourceMappingURL=/src/store/combo.js.map
  

});
