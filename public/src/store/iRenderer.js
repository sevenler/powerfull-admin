define('src/store/iRenderer.ts', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  var helper_1 = require("src/utils/helper.ts");
  var tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  var SimpleMap_1 = require("src/utils/SimpleMap.ts");
  exports.iRendererStore = mobx_state_tree_1.types
      .model('iRendererStore', {
      id: mobx_state_tree_1.types.identifier,
      path: '',
      storeType: mobx_state_tree_1.types.string,
      hasRemoteData: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.boolean, false),
      data: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), {}),
      initedAt: 0,
      updatedAt: 0,
      pristine: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), {}),
      disposed: false,
      parentId: '',
      childrenIds: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.string), []),
      action: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), undefined),
      dialogOpen: false,
      dialogData: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), undefined),
      drawerOpen: false,
      drawerData: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), undefined)
  })
      .views(function (self) {
      return {
          // todo 不能自己引用自己
          get parentStore() {
              return mobx_state_tree_1.isAlive(self) &&
                  self.parentId &&
                  mobx_state_tree_1.getRoot(self) &&
                  mobx_state_tree_1.getRoot(self).storeType === 'RendererStore'
                  ? mobx_state_tree_1.getRoot(self).stores.get(self.parentId)
                  : null;
          }
      };
  })
      .actions(function (self) {
      var dialogCallbacks = new SimpleMap_1.SimpleMap();
      function dispose() {
          // 先标记自己是要销毁的。
          self.disposed = true;
          var parent = self.parentStore;
          if (!self.childrenIds.length) {
              var id = self.id;
              mobx_state_tree_1.destroy(self);
              parent && parent.onChildDispose(id);
          }
      }
      return {
          initData: function (data) {
              if (data === void 0) { data = {}; }
              self.initedAt = Date.now();
              self.pristine = data;
              self.data = data;
          },
          reset: function () {
              self.data = self.pristine;
          },
          updateData: function (data, tag, replace) {
              if (data === void 0) { data = {}; }
              var prev = self.data;
              var newData;
              if (tag) {
                  var proto = helper_1.createObject(self.data.__super || null, tag);
                  newData = helper_1.createObject(proto, tslib_1.__assign(tslib_1.__assign({}, (replace ? {} : self.data)), data));
              }
              else {
                  newData = helper_1.extendObject(self.data, data, !replace);
              }
              Object.defineProperty(newData, '__prev', {
                  value: tslib_1.__assign({}, prev),
                  enumerable: false,
                  configurable: false,
                  writable: false
              });
              self.data = newData;
          },
          setCurrentAction: function (action) {
              self.action = action;
          },
          openDialog: function (ctx, additonal, callback) {
              var proto = ctx.__super ? ctx.__super : self.data;
              if (additonal) {
                  proto = helper_1.createObject(proto, additonal);
              }
              var data = helper_1.createObject(proto, tslib_1.__assign({}, ctx));
              if (self.action.dialog && self.action.dialog.data) {
                  self.dialogData = tpl_builtin_1.dataMapping(self.action.dialog.data, data);
                  var clonedAction = tslib_1.__assign(tslib_1.__assign({}, self.action), { dialog: tslib_1.__assign({}, self.action.dialog) });
                  delete clonedAction.dialog.data;
                  self.action = clonedAction;
              }
              else {
                  self.dialogData = data;
              }
              self.dialogOpen = true;
              callback && dialogCallbacks.set(self.dialogData, callback);
          },
          closeDialog: function (result) {
              var callback = dialogCallbacks.get(self.dialogData);
              self.dialogOpen = false;
              if (callback) {
                  dialogCallbacks.delete(self.dialogData);
                  setTimeout(function () { return callback(result); }, 200);
              }
          },
          openDrawer: function (ctx, additonal, callback) {
              var proto = ctx.__super ? ctx.__super : self.data;
              if (additonal) {
                  proto = helper_1.createObject(proto, additonal);
              }
              var data = helper_1.createObject(proto, tslib_1.__assign({}, ctx));
              if (self.action.drawer.data) {
                  self.drawerData = tpl_builtin_1.dataMapping(self.action.drawer.data, data);
                  var clonedAction = tslib_1.__assign(tslib_1.__assign({}, self.action), { dialog: tslib_1.__assign({}, self.action.dialog) });
                  delete clonedAction.dialog.data;
                  self.action = clonedAction;
              }
              else {
                  self.drawerData = data;
              }
              self.drawerOpen = true;
              if (callback) {
                  dialogCallbacks.set(self.drawerData, callback);
              }
          },
          closeDrawer: function (result) {
              var callback = dialogCallbacks.get(self.drawerData);
              self.drawerOpen = false;
              if (callback) {
                  dialogCallbacks.delete(self.drawerData);
                  setTimeout(function () { return callback(result); }, 200);
              }
          },
          onChildDispose: function (childId) {
              var childrenIds = self.childrenIds.filter(function (item) { return item !== childId; });
              self.childrenIds.replace(childrenIds);
              self.disposed && dispose();
          },
          dispose: dispose
      };
  });
  // export type SIRendererStore = typeof iRendererStore.SnapshotType;
  //# sourceMappingURL=/src/store/iRenderer.js.map
  

});
