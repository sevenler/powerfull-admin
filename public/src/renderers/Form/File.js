define('src/renderers/Form/File.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var Item_1 = require("src/renderers/Form/Item.tsx");
  var find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  var isPlainObject_1 = tslib_1.__importDefault(require("node_modules/lodash/isPlainObject"));
  var async_1 = require("node_modules/async/dist/async");
  var Image_1 = tslib_1.__importDefault(require("src/renderers/Form/Image.tsx"));
  var helper_1 = require("src/utils/helper.ts");
  var api_1 = require("src/utils/api.ts");
  var Button_1 = tslib_1.__importDefault(require("src/components/Button.tsx"));
  var icons_1 = require("src/components/icons.tsx");
  var react_dropzone_1 = tslib_1.__importDefault(require("node_modules/react-dropzone/dist/index"));
  var preventEvent = function (e) { return e.stopPropagation(); };
  function getNameFromUrl(url) {
      if (/(?:\/|^)([^\/]+?)$/.test(url)) {
          return decodeURIComponent(RegExp.$1);
      }
      return url;
  }
  exports.getNameFromUrl = getNameFromUrl;
  var FileControl = /** @class */ (function (_super) {
      tslib_1.__extends(FileControl, _super);
      function FileControl(props) {
          var _this = _super.call(this, props) || this;
          _this.dropzone = react_1.default.createRef();
          var value = props.value;
          var multiple = props.multiple;
          var joinValues = props.joinValues;
          var delimiter = props.delimiter;
          var files = [];
          if (value && value instanceof Blob) {
              files = [value];
          }
          else if (value) {
              files = (Array.isArray(value)
                  ? value
                  : joinValues
                      ? (value.value || value).split(delimiter)
                      : [(value.value || value)])
                  .map(function (item) { return FileControl.valueToFile(item, props); })
                  .filter(function (item) { return item; });
          }
          _this.state = {
              files: files,
              uploading: false
          };
          _this.sendFile = _this.sendFile.bind(_this);
          _this.removeFile = _this.removeFile.bind(_this);
          _this.clearError = _this.clearError.bind(_this);
          _this.handleDrop = _this.handleDrop.bind(_this);
          _this.handleDropRejected = _this.handleDropRejected.bind(_this);
          _this.startUpload = _this.startUpload.bind(_this);
          _this.stopUpload = _this.stopUpload.bind(_this);
          _this.retry = _this.retry.bind(_this);
          _this.toggleUpload = _this.toggleUpload.bind(_this);
          _this.tick = _this.tick.bind(_this);
          _this.onChange = _this.onChange.bind(_this);
          _this.uploadFile = _this.uploadFile.bind(_this);
          _this.uploadBigFile = _this.uploadBigFile.bind(_this);
          _this.handleSelect = _this.handleSelect.bind(_this);
          return _this;
      }
      FileControl.valueToFile = function (value, props, files) {
          var file = files && typeof value === 'string'
              ? find_1.default(files, function (item) { return item.value === value; })
              : undefined;
          return value
              ? value instanceof File
                  ? {
                      state: 'ready',
                      value: value,
                      name: value.name,
                      url: '',
                      id: helper_1.guid()
                  }
                  : tslib_1.__assign({}, (typeof value === 'string'
                      ? {
                          state: file && file.state ? file.state : 'init',
                          value: value,
                          name: (file && file.name) ||
                              (/^data:/.test(value)
                                  ? 'base64数据'
                                  : getNameFromUrl(value)),
                          id: helper_1.guid(),
                          url: typeof props.downloadUrl === 'string' &&
                              value &&
                              !/^data:/.test(value)
                              ? "" + props.downloadUrl + value
                              : undefined
                      }
                      : value))
              : undefined;
      };
      FileControl.prototype.componentWillReceiveProps = function (nextProps) {
          var _this = this;
          var props = this.props;
          if (props.value !== nextProps.value && this.emitValue !== nextProps.value) {
              var value = nextProps.value;
              var multiple = nextProps.multiple;
              var joinValues = nextProps.joinValues;
              var delimiter = nextProps.delimiter;
              var files = [];
              if (value) {
                  files = (Array.isArray(value)
                      ? value
                      : joinValues && typeof value === 'string'
                          ? value.split(delimiter)
                          : [value])
                      .map(function (item) {
                      var obj = FileControl.valueToFile(item, nextProps, _this.state.files);
                      var org;
                      if (obj &&
                          (org = find_1.default(_this.state.files, function (item) { return item.value === obj.value; }))) {
                          obj = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, org), obj), { id: obj.id || org.id });
                      }
                      return obj;
                  })
                      .filter(function (item) { return item; });
              }
              this.setState({
                  files: files
              });
          }
      };
      FileControl.prototype.handleDrop = function (files) {
          var _this = this;
          if (!files.length) {
              return;
          }
          var _a = this.props, maxSize = _a.maxSize, multiple = _a.multiple, maxLength = _a.maxLength;
          var allowed = multiple && maxLength
              ? maxLength - this.state.files.length
              : files.length;
          var inputFiles = [];
          [].slice.call(files, 0, allowed).forEach(function (file) {
              if (maxSize && file.size > maxSize) {
                  _this.props.env.alert("\u60A8\u9009\u62E9\u7684\u6587\u4EF6 " + file.name + " \u5927\u5C0F\u4E3A " + Image_1.default.formatFileSize(file.size) + " \u8D85\u51FA\u4E86\u6700\u5927\u4E3A " + Image_1.default.formatFileSize(maxSize) + " \u7684\u9650\u5236\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9");
                  file.state = 'invalid';
              }
              else {
                  file.state = 'pending';
              }
              file.id = helper_1.guid();
              inputFiles.push(file);
          });
          if (!inputFiles.length) {
              return;
          }
          this.setState({
              error: null,
              files: multiple ? this.state.files.concat(inputFiles) : inputFiles
          }, function () {
              var autoUpload = _this.props.autoUpload;
              if (autoUpload) {
                  _this.startUpload();
              }
          });
      };
      FileControl.prototype.handleDropRejected = function (rejectedFiles, evt) {
          if (evt.type !== 'change' && evt.type !== 'drop') {
              return;
          }
          var _a = this.props, multiple = _a.multiple, env = _a.env, accept = _a.accept;
          var files = rejectedFiles.map(function (file) { return (tslib_1.__assign(tslib_1.__assign({}, file), { state: 'invalid', id: helper_1.guid(), name: file.name })); });
          this.setState({
              files: multiple
                  ? this.state.files.concat(files)
                  : this.state.files.length
                      ? this.state.files
                      : files.slice(0, 1)
          });
          env.alert("\u60A8\u6DFB\u52A0\u7684\u6587\u4EF6" + files.map(function (item) { return "\u3010" + item.name + "\u3011"; }) + "\u4E0D\u7B26\u5408\u7C7B\u578B\u7684`" + accept + "`\u8BBE\u5B9A\uFF0C\u8BF7\u4ED4\u7EC6\u68C0\u67E5\u3002");
      };
      FileControl.prototype.handleSelect = function () {
          this.dropzone.current && this.dropzone.current.open();
      };
      FileControl.prototype.startUpload = function (retry) {
          if (retry === void 0) { retry = false; }
          if (this.state.uploading) {
              return;
          }
          this.setState({
              uploading: true,
              files: this.state.files.map(function (file) {
                  if (retry && file.state === 'error') {
                      file.state = 'pending';
                      file.progress = 0;
                  }
                  return file;
              })
          }, this.tick);
      };
      FileControl.prototype.toggleUpload = function (e) {
          e.preventDefault();
          return this.state.uploading ? this.stopUpload() : this.startUpload();
      };
      FileControl.prototype.stopUpload = function () {
          if (!this.state.uploading) {
              return;
          }
          this.setState({
              uploading: false
          });
      };
      FileControl.prototype.retry = function () {
          this.startUpload(true);
      };
      FileControl.prototype.tick = function () {
          var _this = this;
          if (this.current || !this.state.uploading) {
              return;
          }
          var file = find_1.default(this.state.files, function (item) { return item.state === 'pending'; });
          if (file) {
              this.current = file;
              file.state = 'uploading';
              this.setState({
                  files: this.state.files.concat()
              }, function () {
                  return _this.sendFile(file, function (error, file, obj) {
                      var files = _this.state.files.concat();
                      var idx = files.indexOf(file);
                      if (!~idx) {
                          return;
                      }
                      var newFile = file;
                      if (error) {
                          newFile.state = 'error';
                          newFile.error = error;
                      }
                      else {
                          newFile = obj;
                          newFile.name = newFile.name || file.name;
                      }
                      files.splice(idx, 1, newFile);
                      _this.current = null;
                      _this.setState({
                          error: error ? error : null,
                          files: files
                      }, _this.tick);
                  }, function (progress) {
                      var files = _this.state.files.concat();
                      var idx = files.indexOf(file);
                      if (!~idx) {
                          return;
                      }
                      // file 是个非 File 对象，先不copy了直接改。
                      file.progress = progress;
                      _this.setState({
                          files: files
                      });
                  });
              });
          }
          else {
              this.setState({
                  uploading: false
              }, function () {
                  _this.onChange(!!_this.resolve);
                  if (_this.resolve) {
                      _this.resolve(_this.state.files.some(function (file) { return file.state === 'error'; })
                          ? '文件上传失败请重试'
                          : null);
                      _this.resolve = undefined;
                  }
              });
          }
      };
      FileControl.prototype.sendFile = function (file, cb, onProgress) {
          var _a = this.props, reciever = _a.reciever, fileField = _a.fileField, downloadUrl = _a.downloadUrl, useChunk = _a.useChunk, chunkSize = _a.chunkSize, startChunkApi = _a.startChunkApi, chunkApi = _a.chunkApi, finishChunkApi = _a.finishChunkApi, asBase64 = _a.asBase64, asBlob = _a.asBlob, data = _a.data;
          if (asBase64) {
              var reader_1 = new FileReader();
              reader_1.readAsDataURL(file);
              reader_1.onload = function () {
                  file.state = 'ready';
                  cb(null, file, {
                      value: reader_1.result,
                      name: file.name,
                      url: '',
                      state: 'ready',
                      id: file.id
                  });
              };
              reader_1.onerror = function (error) { return cb(error.message); };
              return;
          }
          else if (asBlob) {
              file.state = 'ready';
              setTimeout(function () {
                  return cb(null, file, {
                      name: file.name,
                      value: file,
                      url: '',
                      state: 'ready',
                      id: file.id
                  });
              }, 4);
              return;
          }
          var fn = (useChunk === 'auto' && chunkSize && file.size > chunkSize) ||
              useChunk === true
              ? this.uploadBigFile
              : this.uploadFile;
          fn(file, reciever, {}, {
              fieldName: fileField,
              chunkSize: chunkSize,
              startChunkApi: startChunkApi,
              chunkApi: chunkApi,
              finishChunkApi: finishChunkApi,
              data: data
          }, onProgress)
              .then(function (ret) {
              if (ret.status || !ret.data) {
                  throw new Error(ret.msg || '上传失败, 请重试');
              }
              onProgress(1);
              var value = ret.data.value || ret.data;
              cb(null, file, tslib_1.__assign(tslib_1.__assign({}, (isPlainObject_1.default(ret.data) ? ret.data : null)), { value: value, url: typeof downloadUrl === 'string' && value
                      ? "" + downloadUrl + value
                      : ret.data
                          ? ret.data.url
                          : null, state: 'uploaded', id: file.id }));
          })
              .catch(function (error) {
              cb(error.message || '上传失败, 请重试', file);
          });
      };
      FileControl.prototype.removeFile = function (file, index) {
          var files = this.state.files.concat();
          files.splice(index, 1);
          this.setState({
              files: files
          }, this.onChange);
      };
      FileControl.prototype.clearError = function () {
          this.setState({
              error: null
          });
      };
      FileControl.prototype.onChange = function (changeImmediately) {
          var _a = this.props, multiple = _a.multiple, onChange = _a.onChange, joinValues = _a.joinValues, extractValue = _a.extractValue, valueField = _a.valueField, delimiter = _a.delimiter, resetValue = _a.resetValue, asBlob = _a.asBlob;
          var files = this.state.files.filter(function (file) { return ~['uploaded', 'init', 'ready'].indexOf(file.state); });
          var value = multiple ? files : files[0];
          if (value) {
              if (extractValue || asBlob) {
                  value = Array.isArray(value)
                      ? value.map(function (item) { return item[valueField || 'value']; })
                      : value[valueField || 'value'];
              }
              else if (joinValues) {
                  value = Array.isArray(value)
                      ? value
                          .map(function (item) { return item[valueField || 'value']; })
                          .join(delimiter || ',')
                      : value[valueField || 'value'];
              }
          }
          else {
              value = typeof resetValue === 'undefined' ? '' : resetValue;
          }
          onChange((this.emitValue = value), undefined, changeImmediately);
      };
      FileControl.prototype.uploadFile = function (file, reciever, params, config, onProgress) {
          if (config === void 0) { config = {}; }
          var fd = new FormData();
          var api = api_1.buildApi(reciever, helper_1.createObject(config.data, params), {
              method: 'post'
          });
          helper_1.qsstringify(tslib_1.__assign(tslib_1.__assign({}, api.data), params))
              .split('&')
              .forEach(function (item) {
              var parts = item.split('=');
              fd.append(parts[0], decodeURIComponent(parts[1]));
          });
          fd.append(config.fieldName || 'file', file);
          return this._send(api, fd, {}, onProgress);
      };
      FileControl.prototype.uploadBigFile = function (file, reciever, params, config, onProgress) {
          if (config === void 0) { config = {}; }
          var chunkSize = config.chunkSize || 5 * 1024 * 1024;
          var self = this;
          var startProgress = 0.2;
          var endProgress = 0.9;
          var progressArr;
          return new Promise(function (resolve, reject) {
              var state;
              var startApi = api_1.buildApi(config.startChunkApi, helper_1.createObject(config.data, tslib_1.__assign(tslib_1.__assign({}, params), { filename: file.name })), {
                  method: 'post',
                  autoAppend: true
              });
              self
                  ._send(startApi)
                  .then(startChunk)
                  .catch(reject);
              function startChunk(ret) {
                  onProgress(startProgress);
                  var tasks = getTasks(file);
                  progressArr = tasks.map(function () { return 0; });
                  if (!ret.data) {
                      throw new Error('接口返回错误，请仔细检查');
                  }
                  state = {
                      key: ret.data.key,
                      uploadId: ret.data.uploadId,
                      loaded: 0,
                      total: tasks.length
                  };
                  async_1.mapLimit(tasks, 3, uploadPartFile(state, config), function (err, results) {
                      if (err) {
                          reject(err);
                      }
                      else {
                          finishChunk(results, state);
                      }
                  });
              }
              function updateProgress(partNumber, progress) {
                  progressArr[partNumber - 1] = progress;
                  onProgress(startProgress +
                      (endProgress - startProgress) *
                          (progressArr.reduce(function (count, progress) { return count + progress; }, 0) /
                              progressArr.length));
              }
              function finishChunk(partList, state) {
                  onProgress(endProgress);
                  var endApi = api_1.buildApi(config.finishChunkApi, helper_1.createObject(config.data, tslib_1.__assign(tslib_1.__assign({}, params), { uploadId: state.uploadId, key: state.key, filename: file.name, partList: partList })), {
                      method: 'post',
                      autoAppend: true
                  });
                  self
                      ._send(endApi)
                      .then(resolve)
                      .catch(reject);
              }
              function uploadPartFile(state, conf) {
                  return function (task, callback) {
                      var api = api_1.buildApi(conf.chunkApi, helper_1.createObject(config.data, params), {
                          method: 'post'
                      });
                      var fd = new FormData();
                      var blob = task.file.slice(task.start, task.stop + 1);
                      helper_1.qsstringify(tslib_1.__assign(tslib_1.__assign({}, api.data), params))
                          .split('&')
                          .forEach(function (item) {
                          var parts = item.split('=');
                          fd.append(parts[0], decodeURIComponent(parts[1]));
                      });
                      fd.append('key', state.key);
                      fd.append('uploadId', state.uploadId);
                      fd.append('partNumber', task.partNumber.toString());
                      fd.append('partSize', task.partSize.toString());
                      fd.append(config.fieldName || 'file', blob, file.name);
                      return self
                          ._send(api, fd, {}, function (progress) {
                          return updateProgress(task.partNumber, progress);
                      })
                          .then(function (ret) {
                          state.loaded++;
                          callback(null, {
                              partNumber: task.partNumber,
                              eTag: ret.data.eTag
                          });
                      })
                          .catch(callback);
                  };
              }
              function getTasks(file) {
                  var leftSize = file.size;
                  var offset = 0;
                  var partNumber = 1;
                  var tasks = [];
                  while (leftSize > 0) {
                      var partSize = Math.min(leftSize, chunkSize);
                      tasks.push({
                          file: file,
                          partNumber: partNumber,
                          partSize: partSize,
                          start: offset,
                          stop: offset + partSize - 1
                      });
                      leftSize -= partSize;
                      offset += partSize;
                      partNumber += 1;
                  }
                  return tasks;
              }
          });
      };
      FileControl.prototype._send = function (api, data, options, onProgress) {
          var env = this.props.env;
          if (!env || !env.fetcher) {
              throw new Error('fetcher is required');
          }
          return env.fetcher(api, data, tslib_1.__assign(tslib_1.__assign({ method: 'post' }, options), { withCredentials: true, onUploadProgress: onProgress
                  ? function (event) {
                      return onProgress(event.loaded / event.total);
                  }
                  : undefined }));
      };
      FileControl.prototype.validate = function () {
          var _this = this;
          if (this.state.uploading ||
              this.state.files.some(function (item) { return item.state === 'pending'; })) {
              return new Promise(function (resolve) {
                  _this.resolve = resolve;
                  _this.startUpload();
              });
          }
          else if (this.state.files.some(function (item) { return item.state === 'error'; })) {
              return '文件上传失败请重试';
          }
      };
      FileControl.prototype.render = function () {
          var _this = this;
          var _a = this.props, btnLabel = _a.btnLabel, accept = _a.accept, disabled = _a.disabled, maxLength = _a.maxLength, multiple = _a.multiple, autoUpload = _a.autoUpload, description = _a.description, hideUploadButton = _a.hideUploadButton, className = _a.className, cx = _a.classnames, render = _a.render;
          var _b = this.state, files = _b.files, uploading = _b.uploading, error = _b.error;
          var hasPending = files.some(function (file) { return file.state == 'pending'; });
          var uploaded = 0;
          var failed = 0;
          this.state.uploading ||
              this.state.files.forEach(function (item) {
                  if (item.state === 'error') {
                      failed++;
                  }
                  else if (item.state === 'uploaded') {
                      uploaded++;
                  }
              });
          return (react_1.default.createElement("div", { className: cx('FileControl', className) },
              react_1.default.createElement(react_dropzone_1.default, { key: "drop-zone", ref: this.dropzone, onDrop: this.handleDrop, onDropRejected: this.handleDropRejected, accept: accept === '*' ? '' : accept, multiple: multiple }, function (_a) {
                  var getRootProps = _a.getRootProps, getInputProps = _a.getInputProps, isDragActive = _a.isDragActive;
                  return (react_1.default.createElement("div", tslib_1.__assign({}, getRootProps({
                      onClick: preventEvent
                  }), { className: cx('FileControl-dropzone', {
                          disabled: disabled,
                          'is-empty': !files.length,
                          'is-active': isDragActive
                      }) }),
                      react_1.default.createElement("input", tslib_1.__assign({}, getInputProps())),
                      isDragActive ? (react_1.default.createElement("div", { className: cx('FileControl-acceptTip') }, "\u628A\u6587\u4EF6\u62D6\u5230\u8FD9\uFF0C\u7136\u540E\u677E\u5B8C\u6210\u6DFB\u52A0\uFF01")) : (react_1.default.createElement(react_1.default.Fragment, null,
                          (multiple && (!maxLength || files.length < maxLength)) ||
                              !multiple ? (react_1.default.createElement(Button_1.default, { level: "default", disabled: disabled, className: cx('FileControl-selectBtn'), onClick: _this.handleSelect },
                              react_1.default.createElement(icons_1.Icon, { icon: "upload", className: "icon" }),
                              !multiple && files.length
                                  ? '重新上传'
                                  : multiple && files.length
                                      ? '继续添加'
                                      : '上传文件')) : null,
                          description
                              ? render('desc', description, {
                                  className: cx('FileControl-description')
                              })
                              : null,
                          Array.isArray(files) ? (react_1.default.createElement("ul", { className: cx('FileControl-list') }, files.map(function (file, index) { return (react_1.default.createElement("li", { key: file.id },
                              react_1.default.createElement("div", { className: cx('FileControl-itemInfo', {
                                      'is-invalid': file.state === 'invalid' ||
                                          file.state === 'error'
                                  }) },
                                  react_1.default.createElement(icons_1.Icon, { icon: "file", className: "icon" }),
                                  file.url ? (react_1.default.createElement("a", { className: cx('FileControl-itemInfoText'), target: "_blank", href: file.url }, file.name || file.filename)) : (react_1.default.createElement("span", { className: cx('FileControl-itemInfoText') }, file.name || file.filename)),
                                  file.state === 'invalid' ||
                                      file.state === 'error' ? (react_1.default.createElement(icons_1.Icon, { icon: "fail", className: "icon" })) : null,
                                  file.state !== 'uploading' ? (react_1.default.createElement("a", { "data-tooltip": "\u79FB\u9664", className: cx('FileControl-clear'), onClick: function () { return _this.removeFile(file, index); } },
                                      react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null),
                              file.state === 'uploading' ||
                                  file.state === 'uploaded' ? (react_1.default.createElement("div", { className: cx('FileControl-progressInfo') },
                                  react_1.default.createElement("div", { className: cx('FileControl-progress') },
                                      react_1.default.createElement("span", { style: {
                                              width: (file.state === 'uploaded'
                                                  ? 100
                                                  : (file.progress || 0) * 100) + "%"
                                          } })),
                                  file.state === 'uploaded' ? (react_1.default.createElement(icons_1.Icon, { icon: "success", className: "icon" })) : (react_1.default.createElement("span", null,
                                      Math.round((file.progress || 0) * 100),
                                      "%")))) : null)); }))) : null))));
              }),
              failed ? (react_1.default.createElement("div", { className: cx('FileControl-sum') },
                  "\u5DF2\u6210\u529F\u4E0A\u4F20",
                  uploaded,
                  "\u4E2A\u6587\u4EF6\uFF0C",
                  failed,
                  "\u4E2A\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25\uFF0C",
                  react_1.default.createElement("a", { onClick: this.retry }, "\u91CD\u65B0\u4E0A\u4F20"),
                  "\u5931\u8D25\u6587\u4EF6")) : null,
              !autoUpload && !hideUploadButton && files.length ? (react_1.default.createElement(Button_1.default, { level: "default", disabled: !hasPending, className: cx('FileControl-uploadBtn'), onClick: this.toggleUpload }, uploading ? '暂停上传' : '开始上传')) : null));
      };
      FileControl.defaultProps = {
          maxSize: 0,
          maxLength: 0,
          placeholder: '',
          btnLabel: '文件上传',
          reciever: '/api/upload/file',
          fileField: 'file',
          joinValues: true,
          extractValue: false,
          delimiter: ',',
          downloadUrl: '',
          useChunk: 'auto',
          chunkSize: 5 * 1024 * 1024,
          startChunkApi: '/api/upload/startChunk',
          chunkApi: '/api/upload/chunk',
          finishChunkApi: '/api/upload/finishChunk',
          accept: 'text/plain',
          multiple: false,
          autoUpload: true,
          hideUploadButton: false,
          stateTextMap: {
              init: '',
              pending: '等待上传',
              uploading: '上传中',
              error: '上传出错',
              uploaded: '已上传',
              ready: ''
          },
          asBase64: false
      };
      return FileControl;
  }(react_1.default.Component));
  exports.default = FileControl;
  var FileControlRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(FileControlRenderer, _super);
      function FileControlRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      FileControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'file',
              sizeMutable: false,
              renderDescription: false
          })
      ], FileControlRenderer);
      return FileControlRenderer;
  }(FileControl));
  exports.FileControlRenderer = FileControlRenderer;
  //# sourceMappingURL=/src/renderers/Form/File.js.map
  

});
