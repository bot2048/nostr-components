(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod3) => function __require() {
    return mod3 || (0, cb[__getOwnPropNames(cb)[0]])((mod3 = { exports: {} }).exports, mod3), mod3.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod3, isNodeMode, target) => (target = mod3 != null ? __create(__getProtoOf(mod3)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod3 || !mod3.__esModule ? __defProp(target, "default", { value: mod3, enumerable: true }) : target,
    mod3
  ));

  // node_modules/tseep/lib/types.js
  var require_types = __commonJS({
    "node_modules/tseep/lib/types.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
    }
  });

  // node_modules/tseep/lib/task-collection/utils.js
  var require_utils = __commonJS({
    "node_modules/tseep/lib/task-collection/utils.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2._fast_remove_single = void 0;
      function _fast_remove_single(arr, index) {
        if (index === -1)
          return;
        if (index === 0)
          arr.shift();
        else if (index === arr.length - 1)
          arr.length = arr.length - 1;
        else
          arr.splice(index, 1);
      }
      exports2._fast_remove_single = _fast_remove_single;
    }
  });

  // node_modules/tseep/lib/task-collection/bake-collection.js
  var require_bake_collection = __commonJS({
    "node_modules/tseep/lib/task-collection/bake-collection.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.bakeCollectionVariadic = exports.bakeCollectionAwait = exports.bakeCollection = exports.BAKED_EMPTY_FUNC = void 0;
      exports.BAKED_EMPTY_FUNC = function() {
      };
      var FORLOOP_FALLBACK = 1500;
      function generateArgsDefCode(numArgs) {
        var argsDefCode2 = "";
        if (numArgs === 0)
          return argsDefCode2;
        for (var i2 = 0; i2 < numArgs - 1; ++i2) {
          argsDefCode2 += "arg" + String(i2) + ", ";
        }
        argsDefCode2 += "arg" + String(numArgs - 1);
        return argsDefCode2;
      }
      function generateBodyPartsCode(argsDefCode2, collectionLength) {
        var funcDefCode2 = "", funcCallCode2 = "";
        for (var i2 = 0; i2 < collectionLength; ++i2) {
          funcDefCode2 += "var f".concat(i2, " = collection[").concat(i2, "];\n");
          funcCallCode2 += "f".concat(i2, "(").concat(argsDefCode2, ")\n");
        }
        return { funcDefCode: funcDefCode2, funcCallCode: funcCallCode2 };
      }
      function generateBodyPartsVariadicCode(collectionLength) {
        var funcDefCode2 = "", funcCallCode2 = "";
        for (var i2 = 0; i2 < collectionLength; ++i2) {
          funcDefCode2 += "var f".concat(i2, " = collection[").concat(i2, "];\n");
          funcCallCode2 += "f".concat(i2, ".apply(undefined, arguments)\n");
        }
        return { funcDefCode: funcDefCode2, funcCallCode: funcCallCode2 };
      }
      function bakeCollection(collection, fixedArgsNum) {
        if (collection.length === 0)
          return exports.BAKED_EMPTY_FUNC;
        else if (collection.length === 1)
          return collection[0];
        var funcFactoryCode;
        if (collection.length < FORLOOP_FALLBACK) {
          var argsDefCode = generateArgsDefCode(fixedArgsNum);
          var _a = generateBodyPartsCode(argsDefCode, collection.length), funcDefCode = _a.funcDefCode, funcCallCode = _a.funcCallCode;
          funcFactoryCode = "(function(collection) {\n            ".concat(funcDefCode, "\n            collection = undefined;\n            return (function(").concat(argsDefCode, ") {\n                ").concat(funcCallCode, "\n            });\n        })");
        } else {
          var argsDefCode = generateArgsDefCode(fixedArgsNum);
          if (collection.length % 10 === 0) {
            funcFactoryCode = "(function(collection) {\n                return (function(".concat(argsDefCode, ") {\n                    for (var i = 0; i < collection.length; i += 10) {\n                        collection[i](").concat(argsDefCode, ");\n                        collection[i+1](").concat(argsDefCode, ");\n                        collection[i+2](").concat(argsDefCode, ");\n                        collection[i+3](").concat(argsDefCode, ");\n                        collection[i+4](").concat(argsDefCode, ");\n                        collection[i+5](").concat(argsDefCode, ");\n                        collection[i+6](").concat(argsDefCode, ");\n                        collection[i+7](").concat(argsDefCode, ");\n                        collection[i+8](").concat(argsDefCode, ");\n                        collection[i+9](").concat(argsDefCode, ");\n                    }\n                });\n            })");
          } else if (collection.length % 4 === 0) {
            funcFactoryCode = "(function(collection) {\n                return (function(".concat(argsDefCode, ") {\n                    for (var i = 0; i < collection.length; i += 4) {\n                        collection[i](").concat(argsDefCode, ");\n                        collection[i+1](").concat(argsDefCode, ");\n                        collection[i+2](").concat(argsDefCode, ");\n                        collection[i+3](").concat(argsDefCode, ");\n                    }\n                });\n            })");
          } else if (collection.length % 3 === 0) {
            funcFactoryCode = "(function(collection) {\n                return (function(".concat(argsDefCode, ") {\n                    for (var i = 0; i < collection.length; i += 3) {\n                        collection[i](").concat(argsDefCode, ");\n                        collection[i+1](").concat(argsDefCode, ");\n                        collection[i+2](").concat(argsDefCode, ");\n                    }\n                });\n            })");
          } else {
            funcFactoryCode = "(function(collection) {\n                return (function(".concat(argsDefCode, ") {\n                    for (var i = 0; i < collection.length; ++i) {\n                        collection[i](").concat(argsDefCode, ");\n                    }\n                });\n            })");
          }
        }
        {
          var bakeCollection_1 = void 0;
          var fixedArgsNum_1 = void 0;
          var bakeCollectionVariadic_1 = void 0;
          var bakeCollectionAwait_1 = void 0;
          var funcFactory = eval(funcFactoryCode);
          return funcFactory(collection);
        }
      }
      exports.bakeCollection = bakeCollection;
      function bakeCollectionAwait(collection, fixedArgsNum) {
        if (collection.length === 0)
          return exports.BAKED_EMPTY_FUNC;
        else if (collection.length === 1)
          return collection[0];
        var funcFactoryCode;
        if (collection.length < FORLOOP_FALLBACK) {
          var argsDefCode = generateArgsDefCode(fixedArgsNum);
          var _a = generateBodyPartsCode(argsDefCode, collection.length), funcDefCode = _a.funcDefCode, funcCallCode = _a.funcCallCode;
          funcFactoryCode = "(function(collection) {\n            ".concat(funcDefCode, "\n            collection = undefined;\n            return (function(").concat(argsDefCode, ") {\n                return Promise.all([ ").concat(funcCallCode, " ]);\n            });\n        })");
        } else {
          var argsDefCode = generateArgsDefCode(fixedArgsNum);
          funcFactoryCode = "(function(collection) {\n            return (function(".concat(argsDefCode, ") {\n                var promises = Array(collection.length);\n                for (var i = 0; i < collection.length; ++i) {\n                    promises[i] = collection[i](").concat(argsDefCode, ");\n                }\n                return Promise.all(promises);\n            });\n        })");
        }
        {
          var bakeCollection_2 = void 0;
          var fixedArgsNum_2 = void 0;
          var bakeCollectionVariadic_2 = void 0;
          var bakeCollectionAwait_2 = void 0;
          var funcFactory = eval(funcFactoryCode);
          return funcFactory(collection);
        }
      }
      exports.bakeCollectionAwait = bakeCollectionAwait;
      function bakeCollectionVariadic(collection) {
        if (collection.length === 0)
          return exports.BAKED_EMPTY_FUNC;
        else if (collection.length === 1)
          return collection[0];
        var funcFactoryCode;
        if (collection.length < FORLOOP_FALLBACK) {
          var _a = generateBodyPartsVariadicCode(collection.length), funcDefCode = _a.funcDefCode, funcCallCode = _a.funcCallCode;
          funcFactoryCode = "(function(collection) {\n            ".concat(funcDefCode, "\n            collection = undefined;\n            return (function() {\n                ").concat(funcCallCode, "\n            });\n        })");
        } else {
          funcFactoryCode = "(function(collection) {\n            return (function() {\n                for (var i = 0; i < collection.length; ++i) {\n                    collection[i].apply(undefined, arguments);\n                }\n            });\n        })";
        }
        {
          var bakeCollection_3 = void 0;
          var fixedArgsNum = void 0;
          var bakeCollectionVariadic_3 = void 0;
          var bakeCollectionAwait_3 = void 0;
          var funcFactory = eval(funcFactoryCode);
          return funcFactory(collection);
        }
      }
      exports.bakeCollectionVariadic = bakeCollectionVariadic;
    }
  });

  // node_modules/tseep/lib/task-collection/task-collection.js
  var require_task_collection = __commonJS({
    "node_modules/tseep/lib/task-collection/task-collection.js"(exports2) {
      "use strict";
      var __spreadArray = exports2 && exports2.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2) for (var i2 = 0, l = from.length, ar; i2 < l; i2++) {
          if (ar || !(i2 in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i2);
            ar[i2] = from[i2];
          }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.TaskCollection = void 0;
      var utils_1 = require_utils();
      var bake_collection_1 = require_bake_collection();
      function push_norebuild(a, b) {
        var len = this.length;
        if (len > 1) {
          if (b) {
            var _a2;
            (_a2 = this._tasks).push.apply(_a2, arguments);
            this.length += arguments.length;
          } else {
            this._tasks.push(a);
            this.length++;
          }
        } else {
          if (b) {
            if (len === 1) {
              var newAr = Array(1 + arguments.length);
              newAr.push(newAr);
              newAr.push.apply(newAr, arguments);
              this._tasks = newAr;
            } else {
              var newAr = Array(arguments.length);
              newAr.push.apply(newAr, arguments);
              this._tasks = newAr;
            }
            this.length += arguments.length;
          } else {
            if (len === 1)
              this._tasks = [this._tasks, a];
            else
              this._tasks = a;
            this.length++;
          }
        }
      }
      function push_rebuild(a, b) {
        var len = this.length;
        if (len > 1) {
          if (b) {
            var _a2;
            (_a2 = this._tasks).push.apply(_a2, arguments);
            this.length += arguments.length;
          } else {
            this._tasks.push(a);
            this.length++;
          }
        } else {
          if (b) {
            if (len === 1) {
              var newAr = Array(1 + arguments.length);
              newAr.push(newAr);
              newAr.push.apply(newAr, arguments);
              this._tasks = newAr;
            } else {
              var newAr = Array(arguments.length);
              newAr.push.apply(newAr, arguments);
              this._tasks = newAr;
            }
            this.length += arguments.length;
          } else {
            if (len === 1)
              this._tasks = [this._tasks, a];
            else
              this._tasks = a;
            this.length++;
          }
        }
        if (this.firstEmitBuildStrategy)
          this.call = rebuild_on_first_call;
        else
          this.rebuild();
      }
      function removeLast_norebuild(a) {
        if (this.length === 0)
          return;
        if (this.length === 1) {
          if (this._tasks === a) {
            this.length = 0;
          }
        } else {
          (0, utils_1._fast_remove_single)(this._tasks, this._tasks.lastIndexOf(a));
          if (this._tasks.length === 1) {
            this._tasks = this._tasks[0];
            this.length = 1;
          } else
            this.length = this._tasks.length;
        }
      }
      function removeLast_rebuild(a) {
        if (this.length === 0)
          return;
        if (this.length === 1) {
          if (this._tasks === a) {
            this.length = 0;
          }
          if (this.firstEmitBuildStrategy) {
            this.call = bake_collection_1.BAKED_EMPTY_FUNC;
            return;
          } else {
            this.rebuild();
            return;
          }
        } else {
          (0, utils_1._fast_remove_single)(this._tasks, this._tasks.lastIndexOf(a));
          if (this._tasks.length === 1) {
            this._tasks = this._tasks[0];
            this.length = 1;
          } else
            this.length = this._tasks.length;
        }
        if (this.firstEmitBuildStrategy)
          this.call = rebuild_on_first_call;
        else
          this.rebuild();
      }
      function insert_norebuild(index) {
        var _b;
        var func = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          func[_i - 1] = arguments[_i];
        }
        if (this.length === 0) {
          this._tasks = func;
          this.length = 1;
        } else if (this.length === 1) {
          func.unshift(this._tasks);
          this._tasks = func;
          this.length = this._tasks.length;
        } else {
          (_b = this._tasks).splice.apply(_b, __spreadArray([index, 0], func, false));
          this.length = this._tasks.length;
        }
      }
      function insert_rebuild(index) {
        var _b;
        var func = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          func[_i - 1] = arguments[_i];
        }
        if (this.length === 0) {
          this._tasks = func;
          this.length = 1;
        } else if (this.length === 1) {
          func.unshift(this._tasks);
          this._tasks = func;
          this.length = this._tasks.length;
        } else {
          (_b = this._tasks).splice.apply(_b, __spreadArray([index, 0], func, false));
          this.length = this._tasks.length;
        }
        if (this.firstEmitBuildStrategy)
          this.call = rebuild_on_first_call;
        else
          this.rebuild();
      }
      function rebuild_noawait() {
        if (this.length === 0)
          this.call = bake_collection_1.BAKED_EMPTY_FUNC;
        else if (this.length === 1)
          this.call = this._tasks;
        else
          this.call = (0, bake_collection_1.bakeCollection)(this._tasks, this.argsNum);
      }
      function rebuild_await() {
        if (this.length === 0)
          this.call = bake_collection_1.BAKED_EMPTY_FUNC;
        else if (this.length === 1)
          this.call = this._tasks;
        else
          this.call = (0, bake_collection_1.bakeCollectionAwait)(this._tasks, this.argsNum);
      }
      function rebuild_on_first_call() {
        this.rebuild();
        this.call.apply(void 0, arguments);
      }
      var TaskCollection = (
        /** @class */
        /* @__PURE__ */ function() {
          function TaskCollection2(argsNum, autoRebuild, initialTasks, awaitTasks) {
            if (autoRebuild === void 0) {
              autoRebuild = true;
            }
            if (initialTasks === void 0) {
              initialTasks = null;
            }
            if (awaitTasks === void 0) {
              awaitTasks = false;
            }
            this.awaitTasks = awaitTasks;
            this.call = bake_collection_1.BAKED_EMPTY_FUNC;
            this.argsNum = argsNum;
            this.firstEmitBuildStrategy = true;
            if (awaitTasks)
              this.rebuild = rebuild_await.bind(this);
            else
              this.rebuild = rebuild_noawait.bind(this);
            this.setAutoRebuild(autoRebuild);
            if (initialTasks) {
              if (typeof initialTasks === "function") {
                this._tasks = initialTasks;
                this.length = 1;
              } else {
                this._tasks = initialTasks;
                this.length = initialTasks.length;
              }
            } else {
              this._tasks = null;
              this.length = 0;
            }
            if (autoRebuild)
              this.rebuild();
          }
          return TaskCollection2;
        }()
      );
      exports2.TaskCollection = TaskCollection;
      function fastClear() {
        this._tasks = null;
        this.length = 0;
        this.call = bake_collection_1.BAKED_EMPTY_FUNC;
      }
      function clear() {
        this._tasks = null;
        this.length = 0;
        this.call = bake_collection_1.BAKED_EMPTY_FUNC;
      }
      function growArgsNum(argsNum) {
        if (this.argsNum < argsNum) {
          this.argsNum = argsNum;
          if (this.firstEmitBuildStrategy)
            this.call = rebuild_on_first_call;
          else
            this.rebuild();
        }
      }
      function setAutoRebuild(newVal) {
        if (newVal) {
          this.push = push_rebuild.bind(this);
          this.insert = insert_rebuild.bind(this);
          this.removeLast = removeLast_rebuild.bind(this);
        } else {
          this.push = push_norebuild.bind(this);
          this.insert = insert_norebuild.bind(this);
          this.removeLast = removeLast_norebuild.bind(this);
        }
      }
      function tasksAsArray() {
        if (this.length === 0)
          return [];
        if (this.length === 1)
          return [this._tasks];
        return this._tasks;
      }
      function setTasks(tasks) {
        if (tasks.length === 0) {
          this.length = 0;
          this.call = bake_collection_1.BAKED_EMPTY_FUNC;
        } else if (tasks.length === 1) {
          this.length = 1;
          this.call = tasks[0];
          this._tasks = tasks[0];
        } else {
          this.length = tasks.length;
          this._tasks = tasks;
          if (this.firstEmitBuildStrategy)
            this.call = rebuild_on_first_call;
          else
            this.rebuild();
        }
      }
      TaskCollection.prototype.fastClear = fastClear;
      TaskCollection.prototype.clear = clear;
      TaskCollection.prototype.growArgsNum = growArgsNum;
      TaskCollection.prototype.setAutoRebuild = setAutoRebuild;
      TaskCollection.prototype.tasksAsArray = tasksAsArray;
      TaskCollection.prototype.setTasks = setTasks;
    }
  });

  // node_modules/tseep/lib/task-collection/index.js
  var require_task_collection2 = __commonJS({
    "node_modules/tseep/lib/task-collection/index.js"(exports2) {
      "use strict";
      var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      __exportStar(require_task_collection(), exports2);
    }
  });

  // node_modules/tseep/lib/utils.js
  var require_utils2 = __commonJS({
    "node_modules/tseep/lib/utils.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.nullObj = void 0;
      function nullObj() {
        var x = {};
        x.__proto__ = null;
        return x;
      }
      exports2.nullObj = nullObj;
    }
  });

  // node_modules/tseep/lib/ee.js
  var require_ee = __commonJS({
    "node_modules/tseep/lib/ee.js"(exports2) {
      "use strict";
      var __spreadArray = exports2 && exports2.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2) for (var i2 = 0, l = from.length, ar; i2 < l; i2++) {
          if (ar || !(i2 in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i2);
            ar[i2] = from[i2];
          }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.EventEmitter = void 0;
      var task_collection_1 = require_task_collection2();
      var utils_1 = require_utils();
      var utils_2 = require_utils2();
      function emit(event, a, b, c, d4, e) {
        var ev = this.events[event];
        if (ev) {
          if (ev.length === 0)
            return false;
          if (ev.argsNum < 6) {
            ev.call(a, b, c, d4, e);
          } else {
            var arr = new Array(ev.argsNum);
            for (var i2 = 0, len = arr.length; i2 < len; ++i2) {
              arr[i2] = arguments[i2 + 1];
            }
            ev.call.apply(void 0, arr);
          }
          return true;
        }
        return false;
      }
      function emitHasOnce(event, a, b, c, d4, e) {
        var ev = this.events[event];
        var argsArr;
        if (ev !== void 0) {
          if (ev.length === 0)
            return false;
          if (ev.argsNum < 6) {
            ev.call(a, b, c, d4, e);
          } else {
            argsArr = new Array(ev.argsNum);
            for (var i2 = 0, len = argsArr.length; i2 < len; ++i2) {
              argsArr[i2] = arguments[i2 + 1];
            }
            ev.call.apply(void 0, argsArr);
          }
        }
        var oev = this.onceEvents[event];
        if (oev) {
          if (typeof oev === "function") {
            this.onceEvents[event] = void 0;
            if (arguments.length < 6) {
              oev(a, b, c, d4, e);
            } else {
              if (argsArr === void 0) {
                argsArr = new Array(arguments.length - 1);
                for (var i2 = 0, len = argsArr.length; i2 < len; ++i2) {
                  argsArr[i2] = arguments[i2 + 1];
                }
              }
              oev.apply(void 0, argsArr);
            }
          } else {
            var fncs = oev;
            this.onceEvents[event] = void 0;
            if (arguments.length < 6) {
              for (var i2 = 0; i2 < fncs.length; ++i2) {
                fncs[i2](a, b, c, d4, e);
              }
            } else {
              if (argsArr === void 0) {
                argsArr = new Array(arguments.length - 1);
                for (var i2 = 0, len = argsArr.length; i2 < len; ++i2) {
                  argsArr[i2] = arguments[i2 + 1];
                }
              }
              for (var i2 = 0; i2 < fncs.length; ++i2) {
                fncs[i2].apply(void 0, argsArr);
              }
            }
          }
          return true;
        }
        return ev !== void 0;
      }
      var EventEmitter10 = (
        /** @class */
        function() {
          function EventEmitter11() {
            this.events = (0, utils_2.nullObj)();
            this.onceEvents = (0, utils_2.nullObj)();
            this._symbolKeys = /* @__PURE__ */ new Set();
            this.maxListeners = Infinity;
          }
          Object.defineProperty(EventEmitter11.prototype, "_eventsCount", {
            get: function() {
              return this.eventNames().length;
            },
            enumerable: false,
            configurable: true
          });
          return EventEmitter11;
        }()
      );
      exports2.EventEmitter = EventEmitter10;
      function once(event, listener) {
        if (this.emit === emit) {
          this.emit = emitHasOnce;
        }
        switch (typeof this.onceEvents[event]) {
          case "undefined":
            this.onceEvents[event] = listener;
            if (typeof event === "symbol")
              this._symbolKeys.add(event);
            break;
          case "function":
            this.onceEvents[event] = [this.onceEvents[event], listener];
            break;
          case "object":
            this.onceEvents[event].push(listener);
        }
        return this;
      }
      function addListener(event, listener, argsNum) {
        if (argsNum === void 0) {
          argsNum = listener.length;
        }
        if (typeof listener !== "function")
          throw new TypeError("The listener must be a function");
        var evtmap = this.events[event];
        if (!evtmap) {
          this.events[event] = new task_collection_1.TaskCollection(argsNum, true, listener, false);
          if (typeof event === "symbol")
            this._symbolKeys.add(event);
        } else {
          evtmap.push(listener);
          evtmap.growArgsNum(argsNum);
          if (this.maxListeners !== Infinity && this.maxListeners <= evtmap.length)
            console.warn('Maximum event listeners for "'.concat(String(event), '" event!'));
        }
        return this;
      }
      function removeListener(event, listener) {
        var evt = this.events[event];
        if (evt) {
          evt.removeLast(listener);
        }
        var evto = this.onceEvents[event];
        if (evto) {
          if (typeof evto === "function") {
            this.onceEvents[event] = void 0;
          } else if (typeof evto === "object") {
            if (evto.length === 1 && evto[0] === listener) {
              this.onceEvents[event] = void 0;
            } else {
              (0, utils_1._fast_remove_single)(evto, evto.lastIndexOf(listener));
            }
          }
        }
        return this;
      }
      function addListenerBound(event, listener, bindTo, argsNum) {
        if (bindTo === void 0) {
          bindTo = this;
        }
        if (argsNum === void 0) {
          argsNum = listener.length;
        }
        if (!this.boundFuncs)
          this.boundFuncs = /* @__PURE__ */ new Map();
        var bound = listener.bind(bindTo);
        this.boundFuncs.set(listener, bound);
        return this.addListener(event, bound, argsNum);
      }
      function removeListenerBound(event, listener) {
        var _a2, _b;
        var bound = (_a2 = this.boundFuncs) === null || _a2 === void 0 ? void 0 : _a2.get(listener);
        (_b = this.boundFuncs) === null || _b === void 0 ? void 0 : _b.delete(listener);
        return this.removeListener(event, bound);
      }
      function hasListeners(event) {
        return this.events[event] && !!this.events[event].length;
      }
      function prependListener(event, listener, argsNum) {
        if (argsNum === void 0) {
          argsNum = listener.length;
        }
        if (typeof listener !== "function")
          throw new TypeError("The listener must be a function");
        var evtmap = this.events[event];
        if (!evtmap || !(evtmap instanceof task_collection_1.TaskCollection)) {
          evtmap = this.events[event] = new task_collection_1.TaskCollection(argsNum, true, listener, false);
          if (typeof event === "symbol")
            this._symbolKeys.add(event);
        } else {
          evtmap.insert(0, listener);
          evtmap.growArgsNum(argsNum);
          if (this.maxListeners !== Infinity && this.maxListeners <= evtmap.length)
            console.warn('Maximum event listeners for "'.concat(String(event), '" event!'));
        }
        return this;
      }
      function prependOnceListener(event, listener) {
        if (this.emit === emit) {
          this.emit = emitHasOnce;
        }
        var evtmap = this.onceEvents[event];
        if (!evtmap) {
          this.onceEvents[event] = [listener];
          if (typeof event === "symbol")
            this._symbolKeys.add(event);
        } else if (typeof evtmap !== "object") {
          this.onceEvents[event] = [listener, evtmap];
          if (typeof event === "symbol")
            this._symbolKeys.add(event);
        } else {
          evtmap.unshift(listener);
          if (this.maxListeners !== Infinity && this.maxListeners <= evtmap.length) {
            console.warn('Maximum event listeners for "'.concat(String(event), '" once event!'));
          }
        }
        return this;
      }
      function removeAllListeners(event) {
        if (event === void 0) {
          this.events = (0, utils_2.nullObj)();
          this.onceEvents = (0, utils_2.nullObj)();
          this._symbolKeys = /* @__PURE__ */ new Set();
        } else {
          this.events[event] = void 0;
          this.onceEvents[event] = void 0;
          if (typeof event === "symbol")
            this._symbolKeys.delete(event);
        }
        return this;
      }
      function setMaxListeners(n) {
        this.maxListeners = n;
        return this;
      }
      function getMaxListeners() {
        return this.maxListeners;
      }
      function listeners(event) {
        if (this.emit === emit)
          return this.events[event] ? this.events[event].tasksAsArray().slice() : [];
        else {
          if (this.events[event] && this.onceEvents[event]) {
            return __spreadArray(__spreadArray([], this.events[event].tasksAsArray(), true), typeof this.onceEvents[event] === "function" ? [this.onceEvents[event]] : this.onceEvents[event], true);
          } else if (this.events[event])
            return this.events[event].tasksAsArray();
          else if (this.onceEvents[event])
            return typeof this.onceEvents[event] === "function" ? [this.onceEvents[event]] : this.onceEvents[event];
          else
            return [];
        }
      }
      function eventNames() {
        var _this = this;
        if (this.emit === emit) {
          var keys = Object.keys(this.events);
          return __spreadArray(__spreadArray([], keys, true), Array.from(this._symbolKeys), true).filter(function(x) {
            return x in _this.events && _this.events[x] && _this.events[x].length;
          });
        } else {
          var keys = Object.keys(this.events).filter(function(x) {
            return _this.events[x] && _this.events[x].length;
          });
          var keysO = Object.keys(this.onceEvents).filter(function(x) {
            return _this.onceEvents[x] && _this.onceEvents[x].length;
          });
          return __spreadArray(__spreadArray(__spreadArray([], keys, true), keysO, true), Array.from(this._symbolKeys).filter(function(x) {
            return x in _this.events && _this.events[x] && _this.events[x].length || x in _this.onceEvents && _this.onceEvents[x] && _this.onceEvents[x].length;
          }), true);
        }
      }
      function listenerCount(type) {
        if (this.emit === emit)
          return this.events[type] && this.events[type].length || 0;
        else
          return (this.events[type] && this.events[type].length || 0) + (this.onceEvents[type] && this.onceEvents[type].length || 0);
      }
      EventEmitter10.prototype.emit = emit;
      EventEmitter10.prototype.on = addListener;
      EventEmitter10.prototype.once = once;
      EventEmitter10.prototype.addListener = addListener;
      EventEmitter10.prototype.removeListener = removeListener;
      EventEmitter10.prototype.addListenerBound = addListenerBound;
      EventEmitter10.prototype.removeListenerBound = removeListenerBound;
      EventEmitter10.prototype.hasListeners = hasListeners;
      EventEmitter10.prototype.prependListener = prependListener;
      EventEmitter10.prototype.prependOnceListener = prependOnceListener;
      EventEmitter10.prototype.off = removeListener;
      EventEmitter10.prototype.removeAllListeners = removeAllListeners;
      EventEmitter10.prototype.setMaxListeners = setMaxListeners;
      EventEmitter10.prototype.getMaxListeners = getMaxListeners;
      EventEmitter10.prototype.listeners = listeners;
      EventEmitter10.prototype.eventNames = eventNames;
      EventEmitter10.prototype.listenerCount = listenerCount;
    }
  });

  // node_modules/tseep/lib/index.js
  var require_lib = __commonJS({
    "node_modules/tseep/lib/index.js"(exports2) {
      "use strict";
      var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      __exportStar(require_types(), exports2);
      __exportStar(require_ee(), exports2);
    }
  });

  // node_modules/ms/index.js
  var require_ms = __commonJS({
    "node_modules/ms/index.js"(exports2, module2) {
      var s = 1e3;
      var m = s * 60;
      var h = m * 60;
      var d4 = h * 24;
      var w = d4 * 7;
      var y = d4 * 365.25;
      module2.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse3(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error(
          "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
        );
      };
      function parse3(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "weeks":
          case "week":
          case "w":
            return n * w;
          case "days":
          case "day":
          case "d":
            return n * d4;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      function fmtShort(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d4) {
          return Math.round(ms / d4) + "d";
        }
        if (msAbs >= h) {
          return Math.round(ms / h) + "h";
        }
        if (msAbs >= m) {
          return Math.round(ms / m) + "m";
        }
        if (msAbs >= s) {
          return Math.round(ms / s) + "s";
        }
        return ms + "ms";
      }
      function fmtLong(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d4) {
          return plural(ms, msAbs, d4, "day");
        }
        if (msAbs >= h) {
          return plural(ms, msAbs, h, "hour");
        }
        if (msAbs >= m) {
          return plural(ms, msAbs, m, "minute");
        }
        if (msAbs >= s) {
          return plural(ms, msAbs, s, "second");
        }
        return ms + " ms";
      }
      function plural(ms, msAbs, n, name) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
      }
    }
  });

  // node_modules/debug/src/common.js
  var require_common = __commonJS({
    "node_modules/debug/src/common.js"(exports2, module2) {
      function setup(env) {
        createDebug6.debug = createDebug6;
        createDebug6.default = createDebug6;
        createDebug6.coerce = coerce;
        createDebug6.disable = disable;
        createDebug6.enable = enable;
        createDebug6.enabled = enabled;
        createDebug6.humanize = require_ms();
        createDebug6.destroy = destroy;
        Object.keys(env).forEach((key) => {
          createDebug6[key] = env[key];
        });
        createDebug6.names = [];
        createDebug6.skips = [];
        createDebug6.formatters = {};
        function selectColor(namespace) {
          let hash3 = 0;
          for (let i2 = 0; i2 < namespace.length; i2++) {
            hash3 = (hash3 << 5) - hash3 + namespace.charCodeAt(i2);
            hash3 |= 0;
          }
          return createDebug6.colors[Math.abs(hash3) % createDebug6.colors.length];
        }
        createDebug6.selectColor = selectColor;
        function createDebug6(namespace) {
          let prevTime;
          let enableOverride = null;
          let namespacesCache;
          let enabledCache;
          function debug8(...args) {
            if (!debug8.enabled) {
              return;
            }
            const self2 = debug8;
            const curr = Number(/* @__PURE__ */ new Date());
            const ms = curr - (prevTime || curr);
            self2.diff = ms;
            self2.prev = prevTime;
            self2.curr = curr;
            prevTime = curr;
            args[0] = createDebug6.coerce(args[0]);
            if (typeof args[0] !== "string") {
              args.unshift("%O");
            }
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
              if (match === "%%") {
                return "%";
              }
              index++;
              const formatter = createDebug6.formatters[format];
              if (typeof formatter === "function") {
                const val = args[index];
                match = formatter.call(self2, val);
                args.splice(index, 1);
                index--;
              }
              return match;
            });
            createDebug6.formatArgs.call(self2, args);
            const logFn = self2.log || createDebug6.log;
            logFn.apply(self2, args);
          }
          debug8.namespace = namespace;
          debug8.useColors = createDebug6.useColors();
          debug8.color = createDebug6.selectColor(namespace);
          debug8.extend = extend;
          debug8.destroy = createDebug6.destroy;
          Object.defineProperty(debug8, "enabled", {
            enumerable: true,
            configurable: false,
            get: () => {
              if (enableOverride !== null) {
                return enableOverride;
              }
              if (namespacesCache !== createDebug6.namespaces) {
                namespacesCache = createDebug6.namespaces;
                enabledCache = createDebug6.enabled(namespace);
              }
              return enabledCache;
            },
            set: (v) => {
              enableOverride = v;
            }
          });
          if (typeof createDebug6.init === "function") {
            createDebug6.init(debug8);
          }
          return debug8;
        }
        function extend(namespace, delimiter) {
          const newDebug = createDebug6(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
          newDebug.log = this.log;
          return newDebug;
        }
        function enable(namespaces) {
          createDebug6.save(namespaces);
          createDebug6.namespaces = namespaces;
          createDebug6.names = [];
          createDebug6.skips = [];
          const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(" ", ",").split(",").filter(Boolean);
          for (const ns of split) {
            if (ns[0] === "-") {
              createDebug6.skips.push(ns.slice(1));
            } else {
              createDebug6.names.push(ns);
            }
          }
        }
        function matchesTemplate(search, template) {
          let searchIndex = 0;
          let templateIndex = 0;
          let starIndex = -1;
          let matchIndex = 0;
          while (searchIndex < search.length) {
            if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
              if (template[templateIndex] === "*") {
                starIndex = templateIndex;
                matchIndex = searchIndex;
                templateIndex++;
              } else {
                searchIndex++;
                templateIndex++;
              }
            } else if (starIndex !== -1) {
              templateIndex = starIndex + 1;
              matchIndex++;
              searchIndex = matchIndex;
            } else {
              return false;
            }
          }
          while (templateIndex < template.length && template[templateIndex] === "*") {
            templateIndex++;
          }
          return templateIndex === template.length;
        }
        function disable() {
          const namespaces = [
            ...createDebug6.names,
            ...createDebug6.skips.map((namespace) => "-" + namespace)
          ].join(",");
          createDebug6.enable("");
          return namespaces;
        }
        function enabled(name) {
          for (const skip of createDebug6.skips) {
            if (matchesTemplate(name, skip)) {
              return false;
            }
          }
          for (const ns of createDebug6.names) {
            if (matchesTemplate(name, ns)) {
              return true;
            }
          }
          return false;
        }
        function coerce(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }
          return val;
        }
        function destroy() {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
        createDebug6.enable(createDebug6.load());
        return createDebug6;
      }
      module2.exports = setup;
    }
  });

  // node_modules/debug/src/browser.js
  var require_browser = __commonJS({
    "node_modules/debug/src/browser.js"(exports2, module2) {
      exports2.formatArgs = formatArgs;
      exports2.save = save;
      exports2.load = load;
      exports2.useColors = useColors;
      exports2.storage = localstorage();
      exports2.destroy = /* @__PURE__ */ (() => {
        let warned = false;
        return () => {
          if (!warned) {
            warned = true;
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
          }
        };
      })();
      exports2.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
      ];
      function useColors() {
        if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
          return true;
        }
        if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
          return false;
        }
        let m;
        return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
        typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
        typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
        typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      function formatArgs(args) {
        args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
        if (!this.useColors) {
          return;
        }
        const c = "color: " + this.color;
        args.splice(1, 0, c, "color: inherit");
        let index = 0;
        let lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, (match) => {
          if (match === "%%") {
            return;
          }
          index++;
          if (match === "%c") {
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      exports2.log = console.debug || console.log || (() => {
      });
      function save(namespaces) {
        try {
          if (namespaces) {
            exports2.storage.setItem("debug", namespaces);
          } else {
            exports2.storage.removeItem("debug");
          }
        } catch (error) {
        }
      }
      function load() {
        let r;
        try {
          r = exports2.storage.getItem("debug");
        } catch (error) {
        }
        if (!r && typeof process !== "undefined" && "env" in process) {
          r = process.env.DEBUG;
        }
        return r;
      }
      function localstorage() {
        try {
          return localStorage;
        } catch (error) {
        }
      }
      module2.exports = require_common()(exports2);
      var { formatters } = module2.exports;
      formatters.j = function(v) {
        try {
          return JSON.stringify(v);
        } catch (error) {
          return "[UnexpectedJSONParseError]: " + error.message;
        }
      };
    }
  });

  // node_modules/typescript-lru-cache/dist/LRUCacheNode.js
  var require_LRUCacheNode = __commonJS({
    "node_modules/typescript-lru-cache/dist/LRUCacheNode.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.LRUCacheNode = void 0;
      var LRUCacheNode = class {
        constructor(key, value, options) {
          const { entryExpirationTimeInMS = null, next = null, prev = null, onEntryEvicted, onEntryMarkedAsMostRecentlyUsed, clone, cloneFn } = options !== null && options !== void 0 ? options : {};
          if (typeof entryExpirationTimeInMS === "number" && (entryExpirationTimeInMS <= 0 || Number.isNaN(entryExpirationTimeInMS))) {
            throw new Error("entryExpirationTimeInMS must either be null (no expiry) or greater than 0");
          }
          this.clone = clone !== null && clone !== void 0 ? clone : false;
          this.cloneFn = cloneFn !== null && cloneFn !== void 0 ? cloneFn : this.defaultClone;
          this.key = key;
          this.internalValue = this.clone ? this.cloneFn(value) : value;
          this.created = Date.now();
          this.entryExpirationTimeInMS = entryExpirationTimeInMS;
          this.next = next;
          this.prev = prev;
          this.onEntryEvicted = onEntryEvicted;
          this.onEntryMarkedAsMostRecentlyUsed = onEntryMarkedAsMostRecentlyUsed;
        }
        get value() {
          return this.clone ? this.cloneFn(this.internalValue) : this.internalValue;
        }
        get isExpired() {
          return typeof this.entryExpirationTimeInMS === "number" && Date.now() - this.created > this.entryExpirationTimeInMS;
        }
        invokeOnEvicted() {
          if (this.onEntryEvicted) {
            const { key, value, isExpired } = this;
            this.onEntryEvicted({ key, value, isExpired });
          }
        }
        invokeOnEntryMarkedAsMostRecentlyUsed() {
          if (this.onEntryMarkedAsMostRecentlyUsed) {
            const { key, value } = this;
            this.onEntryMarkedAsMostRecentlyUsed({ key, value });
          }
        }
        defaultClone(value) {
          if (typeof value === "boolean" || typeof value === "string" || typeof value === "number") {
            return value;
          }
          return JSON.parse(JSON.stringify(value));
        }
      };
      exports2.LRUCacheNode = LRUCacheNode;
    }
  });

  // node_modules/typescript-lru-cache/dist/LRUCache.js
  var require_LRUCache = __commonJS({
    "node_modules/typescript-lru-cache/dist/LRUCache.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.LRUCache = void 0;
      var LRUCacheNode_1 = require_LRUCacheNode();
      var LRUCache3 = class {
        /**
         * Creates a new instance of the LRUCache.
         *
         * @param options Additional configuration options for the LRUCache.
         *
         * @example
         * ```typescript
         * // No options.
         * const cache = new LRUCache();
         *
         * // With options.
         * const cache = new LRUCache({
         *  entryExpirationTimeInMS: 10000
         * });
         * ```
         */
        constructor(options) {
          this.lookupTable = /* @__PURE__ */ new Map();
          this.head = null;
          this.tail = null;
          const { maxSize = 25, entryExpirationTimeInMS = null, onEntryEvicted, onEntryMarkedAsMostRecentlyUsed, cloneFn, clone } = options !== null && options !== void 0 ? options : {};
          if (Number.isNaN(maxSize) || maxSize <= 0) {
            throw new Error("maxSize must be greater than 0.");
          }
          if (typeof entryExpirationTimeInMS === "number" && (entryExpirationTimeInMS <= 0 || Number.isNaN(entryExpirationTimeInMS))) {
            throw new Error("entryExpirationTimeInMS must either be null (no expiry) or greater than 0");
          }
          this.maxSizeInternal = maxSize;
          this.entryExpirationTimeInMS = entryExpirationTimeInMS;
          this.onEntryEvicted = onEntryEvicted;
          this.onEntryMarkedAsMostRecentlyUsed = onEntryMarkedAsMostRecentlyUsed;
          this.clone = clone;
          this.cloneFn = cloneFn;
        }
        /**
         * Returns the number of entries in the LRUCache object.
         * If the cache has entryExpirationTimeInMS set, expired entries will be removed before the size is returned.
         *
         * @returns The number of entries in the cache.
         *
         * @example
         * ```typescript
         * const cache = new LRUCache();
         *
         * cache.set('testKey', 'testValue');
         *
         * const size = cache.size;
         *
         * // Will log 1
         * console.log(size);
         * ```
         */
        get size() {
          this.cleanCache();
          return this.lookupTable.size;
        }
        /**
         * Returns the number of entries that can still be added to the LRUCache without evicting existing entries.
         *
         * @returns The number of entries that can still be added without evicting existing entries.
         *
         * @example
         * ```typescript
         * const cache = new LRUCache({ maxSize: 10 });
         *
         * cache.set('testKey', 'testValue');
         *
         * const remainingSize = cache.remainingSize;
         *
         * // Will log 9 due to 9 spots remaining before reaching maxSize of 10.
         * console.log(remainingSize);
         * ```
         */
        get remainingSize() {
          return this.maxSizeInternal - this.size;
        }
        /**
         * Returns the most recently used (newest) entry in the cache.
         * This will not mark the entry as recently used.
         * If the newest node is expired, it will be removed.
         *
         * @returns The most recently used (newest) entry in the cache.
         *
         * @example
         * ```typescript
         * const cache = new LRUCache({ maxSize: 10 });
         *
         * cache.set('testKey', 'testValue');
         *
         * const newest = cache.newest;
         *
         * // Will log testValue
         * console.log(newest.value);
         *
         * // Will log testKey
         * console.log(newest.key);
         * ```
         */
        get newest() {
          if (!this.head) {
            return null;
          }
          if (this.head.isExpired) {
            this.removeNodeFromListAndLookupTable(this.head);
            return this.newest;
          }
          return this.mapNodeToEntry(this.head);
        }
        /**
         * Returns the least recently used (oldest) entry in the cache.
         * This will not mark the entry as recently used.
         * If the oldest node is expired, it will be removed.
         *
         * @returns The least recently used (oldest) entry in the cache.
         *
         * @example
         * ```typescript
         * const cache = new LRUCache({ maxSize: 10 });
         *
         * cache.set('testKey', 'testValue');
         *
         * const oldest = cache.oldest;
         *
         * // Will log testValue
         * console.log(oldest.value);
         *
         * // Will log testKey
         * console.log(oldest.key);
         * ```
         */
        get oldest() {
          if (!this.tail) {
            return null;
          }
          if (this.tail.isExpired) {
            this.removeNodeFromListAndLookupTable(this.tail);
            return this.oldest;
          }
          return this.mapNodeToEntry(this.tail);
        }
        /**
         * Gets or sets the maxSize of the cache.
         * This will evict the least recently used entries if needed to reach new maxSize.
         *
         * @param value The new value for maxSize. Must be greater than 0.
         *
         * @example
         * ```typescript
         * const cache = new LRUCache({ maxSize: 10 });
         *
         * cache.set('testKey', 'testValue');
         *
         * // Will be 10
         * const maxSize = cache.maxSize;
         *
         * // Set new maxSize to 5. If there are more than 5 items in the cache, the least recently used entries will be removed until cache size is 5.
         * cache.maxSize = 5;
         * ```
         */
        get maxSize() {
          return this.maxSizeInternal;
        }
        set maxSize(value) {
          if (Number.isNaN(value) || value <= 0) {
            throw new Error("maxSize must be greater than 0.");
          }
          this.maxSizeInternal = value;
          this.enforceSizeLimit();
        }
        /**
         * Sets the value for the key in the LRUCache object. Returns the LRUCache object.
         * This marks the newly added entry as the most recently used entry.
         * If adding the new entry makes the cache size go above maxSize,
         * this will evict the least recently used entries until size is equal to maxSize.
         *
         * @param key The key of the entry.
         * @param value The value to set for the key.
         * @param entryOptions Additional configuration options for the cache entry.
         *
         * @returns The LRUCache instance.
         *
         * @example
         * ```typescript
         * const cache = new LRUCache();
         *
         * // Set the key testKey to value testValue
         * cache.set('testKey', 'testValue');
         *
         * // Set the key key2 to value value2. Pass in optional options.
         * cache.set('key2', 'value2', { entryExpirationTimeInMS: 10 });
         * ```
         */
        set(key, value, entryOptions) {
          const currentNodeForKey = this.lookupTable.get(key);
          if (currentNodeForKey) {
            this.removeNodeFromListAndLookupTable(currentNodeForKey);
          }
          const node = new LRUCacheNode_1.LRUCacheNode(key, value, {
            entryExpirationTimeInMS: this.entryExpirationTimeInMS,
            onEntryEvicted: this.onEntryEvicted,
            onEntryMarkedAsMostRecentlyUsed: this.onEntryMarkedAsMostRecentlyUsed,
            clone: this.clone,
            cloneFn: this.cloneFn,
            ...entryOptions
          });
          this.setNodeAsHead(node);
          this.lookupTable.set(key, node);
          this.enforceSizeLimit();
          return this;
        }
        /**
         * Returns the value associated to the key, or null if there is none or if the entry is expired.
         * If an entry is returned, this marks the returned entry as the most recently used entry.
         *
         * @param key The key of the entry to get.
         *
         * @returns The cached value or null.
         *
         * @example
         * ```typescript
         * const cache = new LRUCache();
         *
         * // Set the key testKey to value testValue
         * cache.set('testKey', 'testValue');
         *
         * // Will be 'testValue'. Entry will now be most recently used.
         * const item1 = cache.get('testKey');
         *
         * // Will be null
         * const item2 = cache.get('keyNotInCache');
         * ```
         */
        get(key) {
          const node = this.lookupTable.get(key);
          if (!node) {
            return null;
          }
          if (node.isExpired) {
            this.removeNodeFromListAndLookupTable(node);
            return null;
          }
          this.setNodeAsHead(node);
          return node.value;
        }
        /**
         * Returns the value associated to the key, or null if there is none or if the entry is expired.
         * If an entry is returned, this will not mark the entry as most recently accessed.
         * Useful if a value is needed but the order of the cache should not be changed.
         *
         * @param key The key of the entry to get.
         *
         * @returns The cached value or null.
         *
         * @example
         * ```typescript
         * const cache = new LRUCache();
         *
         * // Set the key testKey to value testValue
         * cache.set('testKey', 'testValue');
         *
         * // Will be 'testValue'
         * const item1 = cache.peek('testKey');
         *
         * // Will be null
         * const item2 = cache.peek('keyNotInCache');
         * ```
         */
        peek(key) {
          const node = this.lookupTable.get(key);
          if (!node) {
            return null;
          }
          if (node.isExpired) {
            this.removeNodeFromListAndLookupTable(node);
            return null;
          }
          return node.value;
        }
        /**
         * Deletes the entry for the passed in key.
         *
         * @param key The key of the entry to delete
         *
         * @returns True if an element in the LRUCache object existed and has been removed,
         * or false if the element does not exist.
         *
         * @example
         * ```typescript
         * const cache = new LRUCache();
         *
         * // Set the key testKey to value testValue
         * cache.set('testKey', 'testValue');
         *
         * // Will be true
         * const wasDeleted = cache.delete('testKey');
         *
         * // Will be false
         * const wasDeleted2 = cache.delete('keyNotInCache');
         * ```
         */
        delete(key) {
          const node = this.lookupTable.get(key);
          if (!node) {
            return false;
          }
          return this.removeNodeFromListAndLookupTable(node);
        }
        /**
         * Returns a boolean asserting whether a value has been associated to the key in the LRUCache object or not.
         * This does not mark the entry as recently used.
         * If the cache has a key but the entry is expired, it will be removed and false will be returned.
         *
         * @param key The key of the entry to check if exists
         *
         * @returns true if the cache contains the supplied key. False if not.
         *
         * @example
         * ```typescript
         * const cache = new LRUCache();
         *
         * // Set the key testKey to value testValue
         * cache.set('testKey', 'testValue');
         *
         * // Will be true
         * const wasDeleted = cache.has('testKey');
         *
         * // Will be false
         * const wasDeleted2 = cache.has('keyNotInCache');
         * ```
         */
        has(key) {
          const node = this.lookupTable.get(key);
          if (!node) {
            return false;
          }
          if (node.isExpired) {
            this.removeNodeFromListAndLookupTable(node);
            return false;
          }
          return true;
        }
        /**
         * Removes all entries in the cache.
         *
         * @example
         * ```typescript
         * const cache = new LRUCache();
         *
         * // Set the key testKey to value testValue
         * cache.set('testKey', 'testValue');
         *
         * // Clear cache.
         * cache.clear();
         * ```
         */
        clear() {
          this.head = null;
          this.tail = null;
          this.lookupTable.clear();
        }
        /**
         * Searches the cache for an entry matching the passed in condition.
         * Expired entries will be skipped (and removed).
         * If multiply entries in the cache match the condition, the most recently used entry will be returned.
         * If an entry is returned, this marks the returned entry as the most recently used entry.
         *
         * @param condition The condition to apply to each entry in the
         *
         * @returns The first cache entry to match the condition. Null if none match.
         *
         * @example
         * ```typescript
         * const cache = new LRUCache();
         *
         * // Set the key testKey to value testValue
         * cache.set('testKey', 'testValue');
         *
         * // item will be { key: 'testKey', value: 'testValue }
         * const item = cache.find(entry => {
         *   const { key, value } = entry;
         *
         *   if (key === 'testKey' || value === 'something') {
         *     return true;
         *   }
         *
         *   return false;
         * });
         *
         * // item2 will be null
         * const item2 = cache.find(entry => entry.key === 'notInCache');
         * ```
         */
        find(condition) {
          let node = this.head;
          while (node) {
            if (node.isExpired) {
              const next = node.next;
              this.removeNodeFromListAndLookupTable(node);
              node = next;
              continue;
            }
            const entry = this.mapNodeToEntry(node);
            if (condition(entry)) {
              this.setNodeAsHead(node);
              return entry;
            }
            node = node.next;
          }
          return null;
        }
        /**
         * Iterates over and applies the callback function to each entry in the cache.
         * Iterates in order from most recently accessed entry to least recently.
         * Expired entries will be skipped (and removed).
         * No entry will be marked as recently used.
         *
         * @param callback the callback function to apply to the entry
         *
         * @example
         * ```typescript
         * const cache = new LRUCache();
         *
         * // Set the key testKey to value testValue
         * cache.set('testKey', 'testValue');
         *
         * cache.forEach((key, value, index) => {
         *   // do something with key, value, and/or index
         * });
         * ```
         */
        forEach(callback) {
          let node = this.head;
          let index = 0;
          while (node) {
            if (node.isExpired) {
              const next = node.next;
              this.removeNodeFromListAndLookupTable(node);
              node = next;
              continue;
            }
            callback(node.value, node.key, index);
            node = node.next;
            index++;
          }
        }
        /**
         * Creates a Generator which can be used with for ... of ... to iterate over the cache values.
         * Iterates in order from most recently accessed entry to least recently.
         * Expired entries will be skipped (and removed).
         * No entry will be marked as accessed.
         *
         * @returns A Generator for the cache values.
         *
         * @example
         * ```typescript
         * const cache = new LRUCache();
         *
         * // Set the key testKey to value testValue
         * cache.set('testKey', 'testValue');
         *
         * for (const value of cache.values()) {
         *   // do something with the value
         * }
         * ```
         */
        *values() {
          let node = this.head;
          while (node) {
            if (node.isExpired) {
              const next = node.next;
              this.removeNodeFromListAndLookupTable(node);
              node = next;
              continue;
            }
            yield node.value;
            node = node.next;
          }
        }
        /**
         * Creates a Generator which can be used with for ... of ... to iterate over the cache keys.
         * Iterates in order from most recently accessed entry to least recently.
         * Expired entries will be skipped (and removed).
         * No entry will be marked as accessed.
         *
         * @returns A Generator for the cache keys.
         *
         * @example
         * ```typescript
         * const cache = new LRUCache();
         *
         * // Set the key testKey to value testValue
         * cache.set('testKey', 'testValue');
         *
         * for (const key of cache.keys()) {
         *   // do something with the key
         * }
         * ```
         */
        *keys() {
          let node = this.head;
          while (node) {
            if (node.isExpired) {
              const next = node.next;
              this.removeNodeFromListAndLookupTable(node);
              node = next;
              continue;
            }
            yield node.key;
            node = node.next;
          }
        }
        /**
         * Creates a Generator which can be used with for ... of ... to iterate over the cache entries.
         * Iterates in order from most recently accessed entry to least recently.
         * Expired entries will be skipped (and removed).
         * No entry will be marked as accessed.
         *
         * @returns A Generator for the cache entries.
         *
         * @example
         * ```typescript
         * const cache = new LRUCache();
         *
         * // Set the key testKey to value testValue
         * cache.set('testKey', 'testValue');
         *
         * for (const entry of cache.entries()) {
         *   const { key, value } = entry;
         *   // do something with the entry
         * }
         * ```
         */
        *entries() {
          let node = this.head;
          while (node) {
            if (node.isExpired) {
              const next = node.next;
              this.removeNodeFromListAndLookupTable(node);
              node = next;
              continue;
            }
            yield this.mapNodeToEntry(node);
            node = node.next;
          }
        }
        /**
         * Creates a Generator which can be used with for ... of ... to iterate over the cache entries.
         * Iterates in order from most recently accessed entry to least recently.
         * Expired entries will be skipped (and removed).
         * No entry will be marked as accessed.
         *
         * @returns A Generator for the cache entries.
         *
         * @example
         * ```typescript
         * const cache = new LRUCache();
         *
         * // Set the key testKey to value testValue
         * cache.set('testKey', 'testValue');
         *
         * for (const entry of cache) {
         *   const { key, value } = entry;
         *   // do something with the entry
         * }
         * ```
         */
        *[Symbol.iterator]() {
          let node = this.head;
          while (node) {
            if (node.isExpired) {
              const next = node.next;
              this.removeNodeFromListAndLookupTable(node);
              node = next;
              continue;
            }
            yield this.mapNodeToEntry(node);
            node = node.next;
          }
        }
        enforceSizeLimit() {
          let node = this.tail;
          while (node !== null && this.size > this.maxSizeInternal) {
            const prev = node.prev;
            this.removeNodeFromListAndLookupTable(node);
            node = prev;
          }
        }
        mapNodeToEntry({ key, value }) {
          return {
            key,
            value
          };
        }
        setNodeAsHead(node) {
          this.removeNodeFromList(node);
          if (!this.head) {
            this.head = node;
            this.tail = node;
          } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
          }
          node.invokeOnEntryMarkedAsMostRecentlyUsed();
        }
        removeNodeFromList(node) {
          if (node.prev !== null) {
            node.prev.next = node.next;
          }
          if (node.next !== null) {
            node.next.prev = node.prev;
          }
          if (this.head === node) {
            this.head = node.next;
          }
          if (this.tail === node) {
            this.tail = node.prev;
          }
          node.next = null;
          node.prev = null;
        }
        removeNodeFromListAndLookupTable(node) {
          node.invokeOnEvicted();
          this.removeNodeFromList(node);
          return this.lookupTable.delete(node.key);
        }
        cleanCache() {
          if (!this.entryExpirationTimeInMS) {
            return;
          }
          const expiredNodes = [];
          for (const node of this.lookupTable.values()) {
            if (node.isExpired) {
              expiredNodes.push(node);
            }
          }
          expiredNodes.forEach((node) => this.removeNodeFromListAndLookupTable(node));
        }
      };
      exports2.LRUCache = LRUCache3;
    }
  });

  // node_modules/typescript-lru-cache/dist/index.js
  var require_dist = __commonJS({
    "node_modules/typescript-lru-cache/dist/index.js"(exports2) {
      "use strict";
      var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
      };
      Object.defineProperty(exports2, "__esModule", { value: true });
      __exportStar(require_LRUCache(), exports2);
    }
  });

  // node_modules/light-bolt11-decoder/node_modules/@scure/base/lib/index.js
  var require_lib2 = __commonJS({
    "node_modules/light-bolt11-decoder/node_modules/@scure/base/lib/index.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.bytes = exports2.stringToBytes = exports2.str = exports2.bytesToString = exports2.hex = exports2.utf8 = exports2.bech32m = exports2.bech32 = exports2.base58check = exports2.base58xmr = exports2.base58xrp = exports2.base58flickr = exports2.base58 = exports2.base64url = exports2.base64 = exports2.base32crockford = exports2.base32hex = exports2.base32 = exports2.base16 = exports2.utils = exports2.assertNumber = void 0;
      function assertNumber2(n) {
        if (!Number.isSafeInteger(n))
          throw new Error(`Wrong integer: ${n}`);
      }
      exports2.assertNumber = assertNumber2;
      function chain3(...args) {
        const wrap = (a, b) => (c) => a(b(c));
        const encode2 = Array.from(args).reverse().reduce((acc, i2) => acc ? wrap(acc, i2.encode) : i2.encode, void 0);
        const decode3 = args.reduce((acc, i2) => acc ? wrap(acc, i2.decode) : i2.decode, void 0);
        return { encode: encode2, decode: decode3 };
      }
      function alphabet3(alphabet4) {
        return {
          encode: (digits) => {
            if (!Array.isArray(digits) || digits.length && typeof digits[0] !== "number")
              throw new Error("alphabet.encode input should be an array of numbers");
            return digits.map((i2) => {
              assertNumber2(i2);
              if (i2 < 0 || i2 >= alphabet4.length)
                throw new Error(`Digit index outside alphabet: ${i2} (alphabet: ${alphabet4.length})`);
              return alphabet4[i2];
            });
          },
          decode: (input) => {
            if (!Array.isArray(input) || input.length && typeof input[0] !== "string")
              throw new Error("alphabet.decode input should be array of strings");
            return input.map((letter) => {
              if (typeof letter !== "string")
                throw new Error(`alphabet.decode: not string element=${letter}`);
              const index = alphabet4.indexOf(letter);
              if (index === -1)
                throw new Error(`Unknown letter: "${letter}". Allowed: ${alphabet4}`);
              return index;
            });
          }
        };
      }
      function join3(separator = "") {
        if (typeof separator !== "string")
          throw new Error("join separator should be string");
        return {
          encode: (from) => {
            if (!Array.isArray(from) || from.length && typeof from[0] !== "string")
              throw new Error("join.encode input should be array of strings");
            for (let i2 of from)
              if (typeof i2 !== "string")
                throw new Error(`join.encode: non-string input=${i2}`);
            return from.join(separator);
          },
          decode: (to) => {
            if (typeof to !== "string")
              throw new Error("join.decode input should be string");
            return to.split(separator);
          }
        };
      }
      function padding2(bits, chr = "=") {
        assertNumber2(bits);
        if (typeof chr !== "string")
          throw new Error("padding chr should be string");
        return {
          encode(data) {
            if (!Array.isArray(data) || data.length && typeof data[0] !== "string")
              throw new Error("padding.encode input should be array of strings");
            for (let i2 of data)
              if (typeof i2 !== "string")
                throw new Error(`padding.encode: non-string input=${i2}`);
            while (data.length * bits % 8)
              data.push(chr);
            return data;
          },
          decode(input) {
            if (!Array.isArray(input) || input.length && typeof input[0] !== "string")
              throw new Error("padding.encode input should be array of strings");
            for (let i2 of input)
              if (typeof i2 !== "string")
                throw new Error(`padding.decode: non-string input=${i2}`);
            let end = input.length;
            if (end * bits % 8)
              throw new Error("Invalid padding: string should have whole number of bytes");
            for (; end > 0 && input[end - 1] === chr; end--) {
              if (!((end - 1) * bits % 8))
                throw new Error("Invalid padding: string has too much padding");
            }
            return input.slice(0, end);
          }
        };
      }
      function normalize3(fn) {
        if (typeof fn !== "function")
          throw new Error("normalize fn should be function");
        return { encode: (from) => from, decode: (to) => fn(to) };
      }
      function convertRadix3(data, from, to) {
        if (from < 2)
          throw new Error(`convertRadix: wrong from=${from}, base cannot be less than 2`);
        if (to < 2)
          throw new Error(`convertRadix: wrong to=${to}, base cannot be less than 2`);
        if (!Array.isArray(data))
          throw new Error("convertRadix: data should be array");
        if (!data.length)
          return [];
        let pos = 0;
        const res = [];
        const digits = Array.from(data);
        digits.forEach((d4) => {
          assertNumber2(d4);
          if (d4 < 0 || d4 >= from)
            throw new Error(`Wrong integer: ${d4}`);
        });
        while (true) {
          let carry = 0;
          let done = true;
          for (let i2 = pos; i2 < digits.length; i2++) {
            const digit = digits[i2];
            const digitBase = from * carry + digit;
            if (!Number.isSafeInteger(digitBase) || from * carry / from !== carry || digitBase - digit !== from * carry) {
              throw new Error("convertRadix: carry overflow");
            }
            carry = digitBase % to;
            digits[i2] = Math.floor(digitBase / to);
            if (!Number.isSafeInteger(digits[i2]) || digits[i2] * to + carry !== digitBase)
              throw new Error("convertRadix: carry overflow");
            if (!done)
              continue;
            else if (!digits[i2])
              pos = i2;
            else
              done = false;
          }
          res.push(carry);
          if (done)
            break;
        }
        for (let i2 = 0; i2 < data.length - 1 && data[i2] === 0; i2++)
          res.push(0);
        return res.reverse();
      }
      var gcd3 = (a, b) => !b ? a : gcd3(b, a % b);
      var radix2carry3 = (from, to) => from + (to - gcd3(from, to));
      function convertRadix23(data, from, to, padding3) {
        if (!Array.isArray(data))
          throw new Error("convertRadix2: data should be array");
        if (from <= 0 || from > 32)
          throw new Error(`convertRadix2: wrong from=${from}`);
        if (to <= 0 || to > 32)
          throw new Error(`convertRadix2: wrong to=${to}`);
        if (radix2carry3(from, to) > 32) {
          throw new Error(`convertRadix2: carry overflow from=${from} to=${to} carryBits=${radix2carry3(from, to)}`);
        }
        let carry = 0;
        let pos = 0;
        const mask = 2 ** to - 1;
        const res = [];
        for (const n of data) {
          assertNumber2(n);
          if (n >= 2 ** from)
            throw new Error(`convertRadix2: invalid data word=${n} from=${from}`);
          carry = carry << from | n;
          if (pos + from > 32)
            throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from}`);
          pos += from;
          for (; pos >= to; pos -= to)
            res.push((carry >> pos - to & mask) >>> 0);
          carry &= 2 ** pos - 1;
        }
        carry = carry << to - pos & mask;
        if (!padding3 && pos >= from)
          throw new Error("Excess padding");
        if (!padding3 && carry)
          throw new Error(`Non-zero padding: ${carry}`);
        if (padding3 && pos > 0)
          res.push(carry >>> 0);
        return res;
      }
      function radix3(num2) {
        assertNumber2(num2);
        return {
          encode: (bytes4) => {
            if (!(bytes4 instanceof Uint8Array))
              throw new Error("radix.encode input should be Uint8Array");
            return convertRadix3(Array.from(bytes4), 2 ** 8, num2);
          },
          decode: (digits) => {
            if (!Array.isArray(digits) || digits.length && typeof digits[0] !== "number")
              throw new Error("radix.decode input should be array of strings");
            return Uint8Array.from(convertRadix3(digits, num2, 2 ** 8));
          }
        };
      }
      function radix23(bits, revPadding = false) {
        assertNumber2(bits);
        if (bits <= 0 || bits > 32)
          throw new Error("radix2: bits should be in (0..32]");
        if (radix2carry3(8, bits) > 32 || radix2carry3(bits, 8) > 32)
          throw new Error("radix2: carry overflow");
        return {
          encode: (bytes4) => {
            if (!(bytes4 instanceof Uint8Array))
              throw new Error("radix2.encode input should be Uint8Array");
            return convertRadix23(Array.from(bytes4), 8, bits, !revPadding);
          },
          decode: (digits) => {
            if (!Array.isArray(digits) || digits.length && typeof digits[0] !== "number")
              throw new Error("radix2.decode input should be array of strings");
            return Uint8Array.from(convertRadix23(digits, bits, 8, revPadding));
          }
        };
      }
      function unsafeWrapper3(fn) {
        if (typeof fn !== "function")
          throw new Error("unsafeWrapper fn should be function");
        return function(...args) {
          try {
            return fn.apply(null, args);
          } catch (e) {
          }
        };
      }
      function checksum(len, fn) {
        assertNumber2(len);
        if (typeof fn !== "function")
          throw new Error("checksum fn should be function");
        return {
          encode(data) {
            if (!(data instanceof Uint8Array))
              throw new Error("checksum.encode: input should be Uint8Array");
            const checksum2 = fn(data).slice(0, len);
            const res = new Uint8Array(data.length + len);
            res.set(data);
            res.set(checksum2, data.length);
            return res;
          },
          decode(data) {
            if (!(data instanceof Uint8Array))
              throw new Error("checksum.decode: input should be Uint8Array");
            const payload = data.slice(0, -len);
            const newChecksum = fn(payload).slice(0, len);
            const oldChecksum = data.slice(-len);
            for (let i2 = 0; i2 < len; i2++)
              if (newChecksum[i2] !== oldChecksum[i2])
                throw new Error("Invalid checksum");
            return payload;
          }
        };
      }
      exports2.utils = { alphabet: alphabet3, chain: chain3, checksum, radix: radix3, radix2: radix23, join: join3, padding: padding2 };
      exports2.base16 = chain3(radix23(4), alphabet3("0123456789ABCDEF"), join3(""));
      exports2.base32 = chain3(radix23(5), alphabet3("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), padding2(5), join3(""));
      exports2.base32hex = chain3(radix23(5), alphabet3("0123456789ABCDEFGHIJKLMNOPQRSTUV"), padding2(5), join3(""));
      exports2.base32crockford = chain3(radix23(5), alphabet3("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), join3(""), normalize3((s) => s.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")));
      exports2.base64 = chain3(radix23(6), alphabet3("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), padding2(6), join3(""));
      exports2.base64url = chain3(radix23(6), alphabet3("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), padding2(6), join3(""));
      var genBase582 = (abc) => chain3(radix3(58), alphabet3(abc), join3(""));
      exports2.base58 = genBase582("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
      exports2.base58flickr = genBase582("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ");
      exports2.base58xrp = genBase582("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
      var XMR_BLOCK_LEN2 = [0, 2, 3, 5, 6, 7, 9, 10, 11];
      exports2.base58xmr = {
        encode(data) {
          let res = "";
          for (let i2 = 0; i2 < data.length; i2 += 8) {
            const block = data.subarray(i2, i2 + 8);
            res += exports2.base58.encode(block).padStart(XMR_BLOCK_LEN2[block.length], "1");
          }
          return res;
        },
        decode(str) {
          let res = [];
          for (let i2 = 0; i2 < str.length; i2 += 11) {
            const slice = str.slice(i2, i2 + 11);
            const blockLen = XMR_BLOCK_LEN2.indexOf(slice.length);
            const block = exports2.base58.decode(slice);
            for (let j = 0; j < block.length - blockLen; j++) {
              if (block[j] !== 0)
                throw new Error("base58xmr: wrong padding");
            }
            res = res.concat(Array.from(block.slice(block.length - blockLen)));
          }
          return Uint8Array.from(res);
        }
      };
      var base58check = (sha2564) => chain3(checksum(4, (data) => sha2564(sha2564(data))), exports2.base58);
      exports2.base58check = base58check;
      var BECH_ALPHABET3 = chain3(alphabet3("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), join3(""));
      var POLYMOD_GENERATORS3 = [996825010, 642813549, 513874426, 1027748829, 705979059];
      function bech32Polymod3(pre) {
        const b = pre >> 25;
        let chk = (pre & 33554431) << 5;
        for (let i2 = 0; i2 < POLYMOD_GENERATORS3.length; i2++) {
          if ((b >> i2 & 1) === 1)
            chk ^= POLYMOD_GENERATORS3[i2];
        }
        return chk;
      }
      function bechChecksum3(prefix, words, encodingConst = 1) {
        const len = prefix.length;
        let chk = 1;
        for (let i2 = 0; i2 < len; i2++) {
          const c = prefix.charCodeAt(i2);
          if (c < 33 || c > 126)
            throw new Error(`Invalid prefix (${prefix})`);
          chk = bech32Polymod3(chk) ^ c >> 5;
        }
        chk = bech32Polymod3(chk);
        for (let i2 = 0; i2 < len; i2++)
          chk = bech32Polymod3(chk) ^ prefix.charCodeAt(i2) & 31;
        for (let v of words)
          chk = bech32Polymod3(chk) ^ v;
        for (let i2 = 0; i2 < 6; i2++)
          chk = bech32Polymod3(chk);
        chk ^= encodingConst;
        return BECH_ALPHABET3.encode(convertRadix23([chk % 2 ** 30], 30, 5, false));
      }
      function genBech323(encoding) {
        const ENCODING_CONST = encoding === "bech32" ? 1 : 734539939;
        const _words = radix23(5);
        const fromWords = _words.decode;
        const toWords = _words.encode;
        const fromWordsUnsafe = unsafeWrapper3(fromWords);
        function encode2(prefix, words, limit2 = 90) {
          if (typeof prefix !== "string")
            throw new Error(`bech32.encode prefix should be string, not ${typeof prefix}`);
          if (!Array.isArray(words) || words.length && typeof words[0] !== "number")
            throw new Error(`bech32.encode words should be array of numbers, not ${typeof words}`);
          const actualLength = prefix.length + 7 + words.length;
          if (limit2 !== false && actualLength > limit2)
            throw new TypeError(`Length ${actualLength} exceeds limit ${limit2}`);
          prefix = prefix.toLowerCase();
          return `${prefix}1${BECH_ALPHABET3.encode(words)}${bechChecksum3(prefix, words, ENCODING_CONST)}`;
        }
        function decode3(str, limit2 = 90) {
          if (typeof str !== "string")
            throw new Error(`bech32.decode input should be string, not ${typeof str}`);
          if (str.length < 8 || limit2 !== false && str.length > limit2)
            throw new TypeError(`Wrong string length: ${str.length} (${str}). Expected (8..${limit2})`);
          const lowered = str.toLowerCase();
          if (str !== lowered && str !== str.toUpperCase())
            throw new Error(`String must be lowercase or uppercase`);
          str = lowered;
          const sepIndex = str.lastIndexOf("1");
          if (sepIndex === 0 || sepIndex === -1)
            throw new Error(`Letter "1" must be present between prefix and data only`);
          const prefix = str.slice(0, sepIndex);
          const _words2 = str.slice(sepIndex + 1);
          if (_words2.length < 6)
            throw new Error("Data must be at least 6 characters long");
          const words = BECH_ALPHABET3.decode(_words2).slice(0, -6);
          const sum = bechChecksum3(prefix, words, ENCODING_CONST);
          if (!_words2.endsWith(sum))
            throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
          return { prefix, words };
        }
        const decodeUnsafe = unsafeWrapper3(decode3);
        function decodeToBytes(str) {
          const { prefix, words } = decode3(str, false);
          return { prefix, words, bytes: fromWords(words) };
        }
        return { encode: encode2, decode: decode3, decodeToBytes, decodeUnsafe, fromWords, fromWordsUnsafe, toWords };
      }
      exports2.bech32 = genBech323("bech32");
      exports2.bech32m = genBech323("bech32m");
      exports2.utf8 = {
        encode: (data) => new TextDecoder().decode(data),
        decode: (str) => new TextEncoder().encode(str)
      };
      exports2.hex = chain3(radix23(4), alphabet3("0123456789abcdef"), join3(""), normalize3((s) => {
        if (typeof s !== "string" || s.length % 2)
          throw new TypeError(`hex.decode: expected string, got ${typeof s} with length ${s.length}`);
        return s.toLowerCase();
      }));
      var CODERS2 = {
        utf8: exports2.utf8,
        hex: exports2.hex,
        base16: exports2.base16,
        base32: exports2.base32,
        base64: exports2.base64,
        base64url: exports2.base64url,
        base58: exports2.base58,
        base58xmr: exports2.base58xmr
      };
      var coderTypeError2 = `Invalid encoding type. Available types: ${Object.keys(CODERS2).join(", ")}`;
      var bytesToString = (type, bytes4) => {
        if (typeof type !== "string" || !CODERS2.hasOwnProperty(type))
          throw new TypeError(coderTypeError2);
        if (!(bytes4 instanceof Uint8Array))
          throw new TypeError("bytesToString() expects Uint8Array");
        return CODERS2[type].encode(bytes4);
      };
      exports2.bytesToString = bytesToString;
      exports2.str = exports2.bytesToString;
      var stringToBytes = (type, str) => {
        if (!CODERS2.hasOwnProperty(type))
          throw new TypeError(coderTypeError2);
        if (typeof str !== "string")
          throw new TypeError("stringToBytes() expects string");
        return CODERS2[type].decode(str);
      };
      exports2.stringToBytes = stringToBytes;
      exports2.bytes = exports2.stringToBytes;
    }
  });

  // node_modules/light-bolt11-decoder/bolt11.js
  var require_bolt11 = __commonJS({
    "node_modules/light-bolt11-decoder/bolt11.js"(exports2, module2) {
      var { bech32: bech323, hex: hex2, utf8: utf82 } = require_lib2();
      var DEFAULTNETWORK = {
        // default network is bitcoin
        bech32: "bc",
        pubKeyHash: 0,
        scriptHash: 5,
        validWitnessVersions: [0]
      };
      var TESTNETWORK = {
        bech32: "tb",
        pubKeyHash: 111,
        scriptHash: 196,
        validWitnessVersions: [0]
      };
      var SIGNETNETWORK = {
        bech32: "tbs",
        pubKeyHash: 111,
        scriptHash: 196,
        validWitnessVersions: [0]
      };
      var REGTESTNETWORK = {
        bech32: "bcrt",
        pubKeyHash: 111,
        scriptHash: 196,
        validWitnessVersions: [0]
      };
      var SIMNETWORK = {
        bech32: "sb",
        pubKeyHash: 63,
        scriptHash: 123,
        validWitnessVersions: [0]
      };
      var FEATUREBIT_ORDER = [
        "option_data_loss_protect",
        "initial_routing_sync",
        "option_upfront_shutdown_script",
        "gossip_queries",
        "var_onion_optin",
        "gossip_queries_ex",
        "option_static_remotekey",
        "payment_secret",
        "basic_mpp",
        "option_support_large_channel"
      ];
      var DIVISORS = {
        m: BigInt(1e3),
        u: BigInt(1e6),
        n: BigInt(1e9),
        p: BigInt(1e12)
      };
      var MAX_MILLISATS = BigInt("2100000000000000000");
      var MILLISATS_PER_BTC = BigInt(1e11);
      var TAGCODES = {
        payment_hash: 1,
        payment_secret: 16,
        description: 13,
        payee: 19,
        description_hash: 23,
        // commit to longer descriptions (used by lnurl-pay)
        expiry: 6,
        // default: 3600 (1 hour)
        min_final_cltv_expiry: 24,
        // default: 9
        fallback_address: 9,
        route_hint: 3,
        // for extra routing info (private etc.)
        feature_bits: 5,
        metadata: 27
      };
      var TAGNAMES = {};
      for (let i2 = 0, keys = Object.keys(TAGCODES); i2 < keys.length; i2++) {
        const currentName = keys[i2];
        const currentCode = TAGCODES[keys[i2]].toString();
        TAGNAMES[currentCode] = currentName;
      }
      var TAGPARSERS = {
        1: (words) => hex2.encode(bech323.fromWordsUnsafe(words)),
        // 256 bits
        16: (words) => hex2.encode(bech323.fromWordsUnsafe(words)),
        // 256 bits
        13: (words) => utf82.encode(bech323.fromWordsUnsafe(words)),
        // string variable length
        19: (words) => hex2.encode(bech323.fromWordsUnsafe(words)),
        // 264 bits
        23: (words) => hex2.encode(bech323.fromWordsUnsafe(words)),
        // 256 bits
        27: (words) => hex2.encode(bech323.fromWordsUnsafe(words)),
        // variable
        6: wordsToIntBE,
        // default: 3600 (1 hour)
        24: wordsToIntBE,
        // default: 9
        3: routingInfoParser,
        // for extra routing info (private etc.)
        5: featureBitsParser
        // keep feature bits as array of 5 bit words
      };
      function getUnknownParser(tagCode) {
        return (words) => ({
          tagCode: parseInt(tagCode),
          words: bech323.encode("unknown", words, Number.MAX_SAFE_INTEGER)
        });
      }
      function wordsToIntBE(words) {
        return words.reverse().reduce((total, item, index) => {
          return total + item * Math.pow(32, index);
        }, 0);
      }
      function routingInfoParser(words) {
        const routes = [];
        let pubkey, shortChannelId, feeBaseMSats, feeProportionalMillionths, cltvExpiryDelta;
        let routesBuffer = bech323.fromWordsUnsafe(words);
        while (routesBuffer.length > 0) {
          pubkey = hex2.encode(routesBuffer.slice(0, 33));
          shortChannelId = hex2.encode(routesBuffer.slice(33, 41));
          feeBaseMSats = parseInt(hex2.encode(routesBuffer.slice(41, 45)), 16);
          feeProportionalMillionths = parseInt(
            hex2.encode(routesBuffer.slice(45, 49)),
            16
          );
          cltvExpiryDelta = parseInt(hex2.encode(routesBuffer.slice(49, 51)), 16);
          routesBuffer = routesBuffer.slice(51);
          routes.push({
            pubkey,
            short_channel_id: shortChannelId,
            fee_base_msat: feeBaseMSats,
            fee_proportional_millionths: feeProportionalMillionths,
            cltv_expiry_delta: cltvExpiryDelta
          });
        }
        return routes;
      }
      function featureBitsParser(words) {
        const bools = words.slice().reverse().map((word) => [
          !!(word & 1),
          !!(word & 2),
          !!(word & 4),
          !!(word & 8),
          !!(word & 16)
        ]).reduce((finalArr, itemArr) => finalArr.concat(itemArr), []);
        while (bools.length < FEATUREBIT_ORDER.length * 2) {
          bools.push(false);
        }
        const featureBits = {};
        FEATUREBIT_ORDER.forEach((featureName, index) => {
          let status;
          if (bools[index * 2]) {
            status = "required";
          } else if (bools[index * 2 + 1]) {
            status = "supported";
          } else {
            status = "unsupported";
          }
          featureBits[featureName] = status;
        });
        const extraBits = bools.slice(FEATUREBIT_ORDER.length * 2);
        featureBits.extra_bits = {
          start_bit: FEATUREBIT_ORDER.length * 2,
          bits: extraBits,
          has_required: extraBits.reduce(
            (result, bit, index) => index % 2 !== 0 ? result || false : result || bit,
            false
          )
        };
        return featureBits;
      }
      function hrpToMillisat(hrpString, outputString) {
        let divisor, value;
        if (hrpString.slice(-1).match(/^[munp]$/)) {
          divisor = hrpString.slice(-1);
          value = hrpString.slice(0, -1);
        } else if (hrpString.slice(-1).match(/^[^munp0-9]$/)) {
          throw new Error("Not a valid multiplier for the amount");
        } else {
          value = hrpString;
        }
        if (!value.match(/^\d+$/))
          throw new Error("Not a valid human readable amount");
        const valueBN = BigInt(value);
        const millisatoshisBN = divisor ? valueBN * MILLISATS_PER_BTC / DIVISORS[divisor] : valueBN * MILLISATS_PER_BTC;
        if (divisor === "p" && !(valueBN % BigInt(10) === BigInt(0)) || millisatoshisBN > MAX_MILLISATS) {
          throw new Error("Amount is outside of valid range");
        }
        return outputString ? millisatoshisBN.toString() : millisatoshisBN;
      }
      function decode3(paymentRequest, network) {
        if (typeof paymentRequest !== "string")
          throw new Error("Lightning Payment Request must be string");
        if (paymentRequest.slice(0, 2).toLowerCase() !== "ln")
          throw new Error("Not a proper lightning payment request");
        const sections = [];
        const decoded = bech323.decode(paymentRequest, Number.MAX_SAFE_INTEGER);
        paymentRequest = paymentRequest.toLowerCase();
        const prefix = decoded.prefix;
        let words = decoded.words;
        let letters = paymentRequest.slice(prefix.length + 1);
        let sigWords = words.slice(-104);
        words = words.slice(0, -104);
        let prefixMatches = prefix.match(/^ln(\S+?)(\d*)([a-zA-Z]?)$/);
        if (prefixMatches && !prefixMatches[2])
          prefixMatches = prefix.match(/^ln(\S+)$/);
        if (!prefixMatches) {
          throw new Error("Not a proper lightning payment request");
        }
        sections.push({
          name: "lightning_network",
          letters: "ln"
        });
        const bech32Prefix = prefixMatches[1];
        let coinNetwork;
        if (!network) {
          switch (bech32Prefix) {
            case DEFAULTNETWORK.bech32:
              coinNetwork = DEFAULTNETWORK;
              break;
            case TESTNETWORK.bech32:
              coinNetwork = TESTNETWORK;
              break;
            case SIGNETNETWORK.bech32:
              coinNetwork = SIGNETNETWORK;
              break;
            case REGTESTNETWORK.bech32:
              coinNetwork = REGTESTNETWORK;
              break;
            case SIMNETWORK.bech32:
              coinNetwork = SIMNETWORK;
              break;
          }
        } else {
          if (network.bech32 === void 0 || network.pubKeyHash === void 0 || network.scriptHash === void 0 || !Array.isArray(network.validWitnessVersions))
            throw new Error("Invalid network");
          coinNetwork = network;
        }
        if (!coinNetwork || coinNetwork.bech32 !== bech32Prefix) {
          throw new Error("Unknown coin bech32 prefix");
        }
        sections.push({
          name: "coin_network",
          letters: bech32Prefix,
          value: coinNetwork
        });
        const value = prefixMatches[2];
        let millisatoshis;
        if (value) {
          const divisor = prefixMatches[3];
          millisatoshis = hrpToMillisat(value + divisor, true);
          sections.push({
            name: "amount",
            letters: prefixMatches[2] + prefixMatches[3],
            value: millisatoshis
          });
        } else {
          millisatoshis = null;
        }
        sections.push({
          name: "separator",
          letters: "1"
        });
        const timestamp = wordsToIntBE(words.slice(0, 7));
        words = words.slice(7);
        sections.push({
          name: "timestamp",
          letters: letters.slice(0, 7),
          value: timestamp
        });
        letters = letters.slice(7);
        let tagName, parser, tagLength, tagWords;
        while (words.length > 0) {
          const tagCode = words[0].toString();
          tagName = TAGNAMES[tagCode] || "unknown_tag";
          parser = TAGPARSERS[tagCode] || getUnknownParser(tagCode);
          words = words.slice(1);
          tagLength = wordsToIntBE(words.slice(0, 2));
          words = words.slice(2);
          tagWords = words.slice(0, tagLength);
          words = words.slice(tagLength);
          sections.push({
            name: tagName,
            tag: letters[0],
            letters: letters.slice(0, 1 + 2 + tagLength),
            value: parser(tagWords)
            // see: parsers for more comments
          });
          letters = letters.slice(1 + 2 + tagLength);
        }
        sections.push({
          name: "signature",
          letters: letters.slice(0, 104),
          value: hex2.encode(bech323.fromWordsUnsafe(sigWords))
        });
        letters = letters.slice(104);
        sections.push({
          name: "checksum",
          letters
        });
        let result = {
          paymentRequest,
          sections,
          get expiry() {
            let exp = sections.find((s) => s.name === "expiry");
            if (exp) return getValue("timestamp") + exp.value;
          },
          get route_hints() {
            return sections.filter((s) => s.name === "route_hint").map((s) => s.value);
          }
        };
        for (let name in TAGCODES) {
          if (name === "route_hint") {
            continue;
          }
          Object.defineProperty(result, name, {
            get() {
              return getValue(name);
            }
          });
        }
        return result;
        function getValue(name) {
          let section = sections.find((s) => s.name === name);
          return section ? section.value : void 0;
        }
      }
      module2.exports = {
        decode: decode3,
        hrpToMillisat
      };
    }
  });

  // node_modules/dayjs/dayjs.min.js
  var require_dayjs_min = __commonJS({
    "node_modules/dayjs/dayjs.min.js"(exports2, module2) {
      !function(t, e) {
        "object" == typeof exports2 && "undefined" != typeof module2 ? module2.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
      }(exports2, function() {
        "use strict";
        var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i2 = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d4 = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
          var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
          return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
        } }, m = function(t2, e2, n2) {
          var r2 = String(t2);
          return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
        }, v = { s: m, z: function(t2) {
          var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i3 = n2 % 60;
          return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i3, 2, "0");
        }, m: function t2(e2, n2) {
          if (e2.date() < n2.date()) return -t2(n2, e2);
          var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i3 = e2.clone().add(r2, c), s2 = n2 - i3 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
          return +(-(r2 + (n2 - i3) / (s2 ? i3 - u2 : u2 - i3)) || 0);
        }, a: function(t2) {
          return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
        }, p: function(t2) {
          return { M: c, y: h, w: o, d: a, D: d4, h: u, m: s, s: i2, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
        }, u: function(t2) {
          return void 0 === t2;
        } }, g = "en", D = {};
        D[g] = M;
        var p = "$isDayjsObject", S = function(t2) {
          return t2 instanceof _ || !(!t2 || !t2[p]);
        }, w = function t2(e2, n2, r2) {
          var i3;
          if (!e2) return g;
          if ("string" == typeof e2) {
            var s2 = e2.toLowerCase();
            D[s2] && (i3 = s2), n2 && (D[s2] = n2, i3 = s2);
            var u2 = e2.split("-");
            if (!i3 && u2.length > 1) return t2(u2[0]);
          } else {
            var a2 = e2.name;
            D[a2] = e2, i3 = a2;
          }
          return !r2 && i3 && (g = i3), i3 || !r2 && g;
        }, O = function(t2, e2) {
          if (S(t2)) return t2.clone();
          var n2 = "object" == typeof e2 ? e2 : {};
          return n2.date = t2, n2.args = arguments, new _(n2);
        }, b = v;
        b.l = w, b.i = S, b.w = function(t2, e2) {
          return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
        };
        var _ = function() {
          function M2(t2) {
            this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
          }
          var m2 = M2.prototype;
          return m2.parse = function(t2) {
            this.$d = function(t3) {
              var e2 = t3.date, n2 = t3.utc;
              if (null === e2) return /* @__PURE__ */ new Date(NaN);
              if (b.u(e2)) return /* @__PURE__ */ new Date();
              if (e2 instanceof Date) return new Date(e2);
              if ("string" == typeof e2 && !/Z$/i.test(e2)) {
                var r2 = e2.match($);
                if (r2) {
                  var i3 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                  return n2 ? new Date(Date.UTC(r2[1], i3, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i3, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
                }
              }
              return new Date(e2);
            }(t2), this.init();
          }, m2.init = function() {
            var t2 = this.$d;
            this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
          }, m2.$utils = function() {
            return b;
          }, m2.isValid = function() {
            return !(this.$d.toString() === l);
          }, m2.isSame = function(t2, e2) {
            var n2 = O(t2);
            return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
          }, m2.isAfter = function(t2, e2) {
            return O(t2) < this.startOf(e2);
          }, m2.isBefore = function(t2, e2) {
            return this.endOf(e2) < O(t2);
          }, m2.$g = function(t2, e2, n2) {
            return b.u(t2) ? this[e2] : this.set(n2, t2);
          }, m2.unix = function() {
            return Math.floor(this.valueOf() / 1e3);
          }, m2.valueOf = function() {
            return this.$d.getTime();
          }, m2.startOf = function(t2, e2) {
            var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
              var i3 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
              return r2 ? i3 : i3.endOf(a);
            }, $2 = function(t3, e3) {
              return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
            }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v3 = "set" + (this.$u ? "UTC" : "");
            switch (f2) {
              case h:
                return r2 ? l2(1, 0) : l2(31, 11);
              case c:
                return r2 ? l2(1, M3) : l2(0, M3 + 1);
              case o:
                var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
                return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
              case a:
              case d4:
                return $2(v3 + "Hours", 0);
              case u:
                return $2(v3 + "Minutes", 1);
              case s:
                return $2(v3 + "Seconds", 2);
              case i2:
                return $2(v3 + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }, m2.endOf = function(t2) {
            return this.startOf(t2, false);
          }, m2.$set = function(t2, e2) {
            var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d4] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i2] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
            if (o2 === c || o2 === h) {
              var y2 = this.clone().set(d4, 1);
              y2.$d[l2]($2), y2.init(), this.$d = y2.set(d4, Math.min(this.$D, y2.daysInMonth())).$d;
            } else l2 && this.$d[l2]($2);
            return this.init(), this;
          }, m2.set = function(t2, e2) {
            return this.clone().$set(t2, e2);
          }, m2.get = function(t2) {
            return this[b.p(t2)]();
          }, m2.add = function(r2, f2) {
            var d5, l2 = this;
            r2 = Number(r2);
            var $2 = b.p(f2), y2 = function(t2) {
              var e2 = O(l2);
              return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
            };
            if ($2 === c) return this.set(c, this.$M + r2);
            if ($2 === h) return this.set(h, this.$y + r2);
            if ($2 === a) return y2(1);
            if ($2 === o) return y2(7);
            var M3 = (d5 = {}, d5[s] = e, d5[u] = n, d5[i2] = t, d5)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
            return b.w(m3, this);
          }, m2.subtract = function(t2, e2) {
            return this.add(-1 * t2, e2);
          }, m2.format = function(t2) {
            var e2 = this, n2 = this.$locale();
            if (!this.isValid()) return n2.invalidDate || l;
            var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i3 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i4, s3) {
              return t3 && (t3[n3] || t3(e2, r2)) || i4[n3].slice(0, s3);
            }, d5 = function(t3) {
              return b.s(s2 % 12 || 12, t3, "0");
            }, $2 = f2 || function(t3, e3, n3) {
              var r3 = t3 < 12 ? "AM" : "PM";
              return n3 ? r3.toLowerCase() : r3;
            };
            return r2.replace(y, function(t3, r3) {
              return r3 || function(t4) {
                switch (t4) {
                  case "YY":
                    return String(e2.$y).slice(-2);
                  case "YYYY":
                    return b.s(e2.$y, 4, "0");
                  case "M":
                    return a2 + 1;
                  case "MM":
                    return b.s(a2 + 1, 2, "0");
                  case "MMM":
                    return h2(n2.monthsShort, a2, c2, 3);
                  case "MMMM":
                    return h2(c2, a2);
                  case "D":
                    return e2.$D;
                  case "DD":
                    return b.s(e2.$D, 2, "0");
                  case "d":
                    return String(e2.$W);
                  case "dd":
                    return h2(n2.weekdaysMin, e2.$W, o2, 2);
                  case "ddd":
                    return h2(n2.weekdaysShort, e2.$W, o2, 3);
                  case "dddd":
                    return o2[e2.$W];
                  case "H":
                    return String(s2);
                  case "HH":
                    return b.s(s2, 2, "0");
                  case "h":
                    return d5(1);
                  case "hh":
                    return d5(2);
                  case "a":
                    return $2(s2, u2, true);
                  case "A":
                    return $2(s2, u2, false);
                  case "m":
                    return String(u2);
                  case "mm":
                    return b.s(u2, 2, "0");
                  case "s":
                    return String(e2.$s);
                  case "ss":
                    return b.s(e2.$s, 2, "0");
                  case "SSS":
                    return b.s(e2.$ms, 3, "0");
                  case "Z":
                    return i3;
                }
                return null;
              }(t3) || i3.replace(":", "");
            });
          }, m2.utcOffset = function() {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }, m2.diff = function(r2, d5, l2) {
            var $2, y2 = this, M3 = b.p(d5), m3 = O(r2), v3 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
              return b.m(y2, m3);
            };
            switch (M3) {
              case h:
                $2 = D2() / 12;
                break;
              case c:
                $2 = D2();
                break;
              case f:
                $2 = D2() / 3;
                break;
              case o:
                $2 = (g2 - v3) / 6048e5;
                break;
              case a:
                $2 = (g2 - v3) / 864e5;
                break;
              case u:
                $2 = g2 / n;
                break;
              case s:
                $2 = g2 / e;
                break;
              case i2:
                $2 = g2 / t;
                break;
              default:
                $2 = g2;
            }
            return l2 ? $2 : b.a($2);
          }, m2.daysInMonth = function() {
            return this.endOf(c).$D;
          }, m2.$locale = function() {
            return D[this.$L];
          }, m2.locale = function(t2, e2) {
            if (!t2) return this.$L;
            var n2 = this.clone(), r2 = w(t2, e2, true);
            return r2 && (n2.$L = r2), n2;
          }, m2.clone = function() {
            return b.w(this.$d, this);
          }, m2.toDate = function() {
            return new Date(this.valueOf());
          }, m2.toJSON = function() {
            return this.isValid() ? this.toISOString() : null;
          }, m2.toISOString = function() {
            return this.$d.toISOString();
          }, m2.toString = function() {
            return this.$d.toUTCString();
          }, M2;
        }(), k = _.prototype;
        return O.prototype = k, [["$ms", r], ["$s", i2], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d4]].forEach(function(t2) {
          k[t2[1]] = function(e2) {
            return this.$g(e2, t2[0], t2[1]);
          };
        }), O.extend = function(t2, e2) {
          return t2.$i || (t2(e2, _, O), t2.$i = true), O;
        }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
          return O(1e3 * t2);
        }, O.en = D[g], O.Ls = D, O.p = {}, O;
      });
    }
  });

  // node_modules/@nostr-dev-kit/ndk/dist/index.mjs
  var import_tseep = __toESM(require_lib(), 1);
  var import_debug = __toESM(require_browser(), 1);
  var import_tseep2 = __toESM(require_lib(), 1);
  var import_tseep3 = __toESM(require_lib(), 1);
  var import_debug2 = __toESM(require_browser(), 1);

  // node_modules/nostr-tools/node_modules/@noble/curves/node_modules/@noble/hashes/esm/_assert.js
  function number(n) {
    if (!Number.isSafeInteger(n) || n < 0)
      throw new Error(`Wrong positive integer: ${n}`);
  }
  function bytes(b, ...lengths) {
    if (!(b instanceof Uint8Array))
      throw new Error("Expected Uint8Array");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
  }
  function hash(hash3) {
    if (typeof hash3 !== "function" || typeof hash3.create !== "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    number(hash3.outputLen);
    number(hash3.blockLen);
  }
  function exists(instance, checkFinished = true) {
    if (instance.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function output(out, instance) {
    bytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
      throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
  }

  // node_modules/nostr-tools/node_modules/@noble/curves/node_modules/@noble/hashes/esm/crypto.js
  var crypto2 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;

  // node_modules/nostr-tools/node_modules/@noble/curves/node_modules/@noble/hashes/esm/utils.js
  var u8a = (a) => a instanceof Uint8Array;
  var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
  var rotr = (word, shift) => word << 32 - shift | word >>> shift;
  var isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
  if (!isLE)
    throw new Error("Non little-endian hardware is not supported");
  function utf8ToBytes(str) {
    if (typeof str !== "string")
      throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function toBytes(data) {
    if (typeof data === "string")
      data = utf8ToBytes(data);
    if (!u8a(data))
      throw new Error(`expected Uint8Array, got ${typeof data}`);
    return data;
  }
  function concatBytes(...arrays) {
    const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
    let pad2 = 0;
    arrays.forEach((a) => {
      if (!u8a(a))
        throw new Error("Uint8Array expected");
      r.set(a, pad2);
      pad2 += a.length;
    });
    return r;
  }
  var Hash = class {
    // Safe version that clones internal state
    clone() {
      return this._cloneInto();
    }
  };
  var toStr = {}.toString;
  function wrapConstructor(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
  }
  function randomBytes(bytesLength = 32) {
    if (crypto2 && typeof crypto2.getRandomValues === "function") {
      return crypto2.getRandomValues(new Uint8Array(bytesLength));
    }
    throw new Error("crypto.getRandomValues must be defined");
  }

  // node_modules/nostr-tools/node_modules/@noble/curves/node_modules/@noble/hashes/esm/_sha2.js
  function setBigUint64(view, byteOffset, value, isLE4) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE4);
    const _32n = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE4 ? 4 : 0;
    const l = isLE4 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE4);
    view.setUint32(byteOffset + l, wl, isLE4);
  }
  var SHA2 = class extends Hash {
    constructor(blockLen, outputLen, padOffset, isLE4) {
      super();
      this.blockLen = blockLen;
      this.outputLen = outputLen;
      this.padOffset = padOffset;
      this.isLE = isLE4;
      this.finished = false;
      this.length = 0;
      this.pos = 0;
      this.destroyed = false;
      this.buffer = new Uint8Array(blockLen);
      this.view = createView(this.buffer);
    }
    update(data) {
      exists(this);
      const { view, buffer, blockLen } = this;
      data = toBytes(data);
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        if (take === blockLen) {
          const dataView = createView(data);
          for (; blockLen <= len - pos; pos += blockLen)
            this.process(dataView, pos);
          continue;
        }
        buffer.set(data.subarray(pos, pos + take), this.pos);
        this.pos += take;
        pos += take;
        if (this.pos === blockLen) {
          this.process(view, 0);
          this.pos = 0;
        }
      }
      this.length += data.length;
      this.roundClean();
      return this;
    }
    digestInto(out) {
      exists(this);
      output(out, this);
      this.finished = true;
      const { buffer, view, blockLen, isLE: isLE4 } = this;
      let { pos } = this;
      buffer[pos++] = 128;
      this.buffer.subarray(pos).fill(0);
      if (this.padOffset > blockLen - pos) {
        this.process(view, 0);
        pos = 0;
      }
      for (let i2 = pos; i2 < blockLen; i2++)
        buffer[i2] = 0;
      setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE4);
      this.process(view, 0);
      const oview = createView(out);
      const len = this.outputLen;
      if (len % 4)
        throw new Error("_sha2: outputLen should be aligned to 32bit");
      const outLen = len / 4;
      const state = this.get();
      if (outLen > state.length)
        throw new Error("_sha2: outputLen bigger than state");
      for (let i2 = 0; i2 < outLen; i2++)
        oview.setUint32(4 * i2, state[i2], isLE4);
    }
    digest() {
      const { buffer, outputLen } = this;
      this.digestInto(buffer);
      const res = buffer.slice(0, outputLen);
      this.destroy();
      return res;
    }
    _cloneInto(to) {
      to || (to = new this.constructor());
      to.set(...this.get());
      const { blockLen, buffer, length, finished, destroyed, pos } = this;
      to.length = length;
      to.pos = pos;
      to.finished = finished;
      to.destroyed = destroyed;
      if (length % blockLen)
        to.buffer.set(buffer);
      return to;
    }
  };

  // node_modules/nostr-tools/node_modules/@noble/curves/node_modules/@noble/hashes/esm/sha256.js
  var Chi = (a, b, c) => a & b ^ ~a & c;
  var Maj = (a, b, c) => a & b ^ a & c ^ b & c;
  var SHA256_K = /* @__PURE__ */ new Uint32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  var IV = /* @__PURE__ */ new Uint32Array([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ]);
  var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
  var SHA256 = class extends SHA2 {
    constructor() {
      super(64, 32, 8, false);
      this.A = IV[0] | 0;
      this.B = IV[1] | 0;
      this.C = IV[2] | 0;
      this.D = IV[3] | 0;
      this.E = IV[4] | 0;
      this.F = IV[5] | 0;
      this.G = IV[6] | 0;
      this.H = IV[7] | 0;
    }
    get() {
      const { A, B, C, D, E, F, G, H } = this;
      return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
      this.E = E | 0;
      this.F = F | 0;
      this.G = G | 0;
      this.H = H | 0;
    }
    process(view, offset) {
      for (let i2 = 0; i2 < 16; i2++, offset += 4)
        SHA256_W[i2] = view.getUint32(offset, false);
      for (let i2 = 16; i2 < 64; i2++) {
        const W15 = SHA256_W[i2 - 15];
        const W2 = SHA256_W[i2 - 2];
        const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
        const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
        SHA256_W[i2] = s1 + SHA256_W[i2 - 7] + s0 + SHA256_W[i2 - 16] | 0;
      }
      let { A, B, C, D, E, F, G, H } = this;
      for (let i2 = 0; i2 < 64; i2++) {
        const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
        const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i2] + SHA256_W[i2] | 0;
        const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
        const T2 = sigma0 + Maj(A, B, C) | 0;
        H = G;
        G = F;
        F = E;
        E = D + T1 | 0;
        D = C;
        C = B;
        B = A;
        A = T1 + T2 | 0;
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      E = E + this.E | 0;
      F = F + this.F | 0;
      G = G + this.G | 0;
      H = H + this.H | 0;
      this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
      SHA256_W.fill(0);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0, 0, 0, 0);
      this.buffer.fill(0);
    }
  };
  var sha256 = /* @__PURE__ */ wrapConstructor(() => new SHA256());

  // node_modules/nostr-tools/node_modules/@noble/curves/esm/abstract/utils.js
  var utils_exports = {};
  __export(utils_exports, {
    bitGet: () => bitGet,
    bitLen: () => bitLen,
    bitMask: () => bitMask,
    bitSet: () => bitSet,
    bytesToHex: () => bytesToHex,
    bytesToNumberBE: () => bytesToNumberBE,
    bytesToNumberLE: () => bytesToNumberLE,
    concatBytes: () => concatBytes2,
    createHmacDrbg: () => createHmacDrbg,
    ensureBytes: () => ensureBytes,
    equalBytes: () => equalBytes,
    hexToBytes: () => hexToBytes,
    hexToNumber: () => hexToNumber,
    numberToBytesBE: () => numberToBytesBE,
    numberToBytesLE: () => numberToBytesLE,
    numberToHexUnpadded: () => numberToHexUnpadded,
    numberToVarBytesBE: () => numberToVarBytesBE,
    utf8ToBytes: () => utf8ToBytes2,
    validateObject: () => validateObject
  });
  var _0n = BigInt(0);
  var _1n = BigInt(1);
  var _2n = BigInt(2);
  var u8a2 = (a) => a instanceof Uint8Array;
  var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i2) => i2.toString(16).padStart(2, "0"));
  function bytesToHex(bytes4) {
    if (!u8a2(bytes4))
      throw new Error("Uint8Array expected");
    let hex2 = "";
    for (let i2 = 0; i2 < bytes4.length; i2++) {
      hex2 += hexes[bytes4[i2]];
    }
    return hex2;
  }
  function numberToHexUnpadded(num2) {
    const hex2 = num2.toString(16);
    return hex2.length & 1 ? `0${hex2}` : hex2;
  }
  function hexToNumber(hex2) {
    if (typeof hex2 !== "string")
      throw new Error("hex string expected, got " + typeof hex2);
    return BigInt(hex2 === "" ? "0" : `0x${hex2}`);
  }
  function hexToBytes(hex2) {
    if (typeof hex2 !== "string")
      throw new Error("hex string expected, got " + typeof hex2);
    const len = hex2.length;
    if (len % 2)
      throw new Error("padded hex string expected, got unpadded hex of length " + len);
    const array = new Uint8Array(len / 2);
    for (let i2 = 0; i2 < array.length; i2++) {
      const j = i2 * 2;
      const hexByte = hex2.slice(j, j + 2);
      const byte = Number.parseInt(hexByte, 16);
      if (Number.isNaN(byte) || byte < 0)
        throw new Error("Invalid byte sequence");
      array[i2] = byte;
    }
    return array;
  }
  function bytesToNumberBE(bytes4) {
    return hexToNumber(bytesToHex(bytes4));
  }
  function bytesToNumberLE(bytes4) {
    if (!u8a2(bytes4))
      throw new Error("Uint8Array expected");
    return hexToNumber(bytesToHex(Uint8Array.from(bytes4).reverse()));
  }
  function numberToBytesBE(n, len) {
    return hexToBytes(n.toString(16).padStart(len * 2, "0"));
  }
  function numberToBytesLE(n, len) {
    return numberToBytesBE(n, len).reverse();
  }
  function numberToVarBytesBE(n) {
    return hexToBytes(numberToHexUnpadded(n));
  }
  function ensureBytes(title, hex2, expectedLength) {
    let res;
    if (typeof hex2 === "string") {
      try {
        res = hexToBytes(hex2);
      } catch (e) {
        throw new Error(`${title} must be valid hex string, got "${hex2}". Cause: ${e}`);
      }
    } else if (u8a2(hex2)) {
      res = Uint8Array.from(hex2);
    } else {
      throw new Error(`${title} must be hex string or Uint8Array`);
    }
    const len = res.length;
    if (typeof expectedLength === "number" && len !== expectedLength)
      throw new Error(`${title} expected ${expectedLength} bytes, got ${len}`);
    return res;
  }
  function concatBytes2(...arrays) {
    const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
    let pad2 = 0;
    arrays.forEach((a) => {
      if (!u8a2(a))
        throw new Error("Uint8Array expected");
      r.set(a, pad2);
      pad2 += a.length;
    });
    return r;
  }
  function equalBytes(b1, b2) {
    if (b1.length !== b2.length)
      return false;
    for (let i2 = 0; i2 < b1.length; i2++)
      if (b1[i2] !== b2[i2])
        return false;
    return true;
  }
  function utf8ToBytes2(str) {
    if (typeof str !== "string")
      throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function bitLen(n) {
    let len;
    for (len = 0; n > _0n; n >>= _1n, len += 1)
      ;
    return len;
  }
  function bitGet(n, pos) {
    return n >> BigInt(pos) & _1n;
  }
  var bitSet = (n, pos, value) => {
    return n | (value ? _1n : _0n) << BigInt(pos);
  };
  var bitMask = (n) => (_2n << BigInt(n - 1)) - _1n;
  var u8n = (data) => new Uint8Array(data);
  var u8fr = (arr) => Uint8Array.from(arr);
  function createHmacDrbg(hashLen, qByteLen, hmacFn) {
    if (typeof hashLen !== "number" || hashLen < 2)
      throw new Error("hashLen must be a number");
    if (typeof qByteLen !== "number" || qByteLen < 2)
      throw new Error("qByteLen must be a number");
    if (typeof hmacFn !== "function")
      throw new Error("hmacFn must be a function");
    let v = u8n(hashLen);
    let k = u8n(hashLen);
    let i2 = 0;
    const reset = () => {
      v.fill(1);
      k.fill(0);
      i2 = 0;
    };
    const h = (...b) => hmacFn(k, v, ...b);
    const reseed = (seed = u8n()) => {
      k = h(u8fr([0]), seed);
      v = h();
      if (seed.length === 0)
        return;
      k = h(u8fr([1]), seed);
      v = h();
    };
    const gen = () => {
      if (i2++ >= 1e3)
        throw new Error("drbg: tried 1000 values");
      let len = 0;
      const out = [];
      while (len < qByteLen) {
        v = h();
        const sl = v.slice();
        out.push(sl);
        len += v.length;
      }
      return concatBytes2(...out);
    };
    const genUntil = (seed, pred) => {
      reset();
      reseed(seed);
      let res = void 0;
      while (!(res = pred(gen())))
        reseed();
      reset();
      return res;
    };
    return genUntil;
  }
  var validatorFns = {
    bigint: (val) => typeof val === "bigint",
    function: (val) => typeof val === "function",
    boolean: (val) => typeof val === "boolean",
    string: (val) => typeof val === "string",
    stringOrUint8Array: (val) => typeof val === "string" || val instanceof Uint8Array,
    isSafeInteger: (val) => Number.isSafeInteger(val),
    array: (val) => Array.isArray(val),
    field: (val, object) => object.Fp.isValid(val),
    hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
  };
  function validateObject(object, validators, optValidators = {}) {
    const checkField = (fieldName, type, isOptional) => {
      const checkVal = validatorFns[type];
      if (typeof checkVal !== "function")
        throw new Error(`Invalid validator "${type}", expected function`);
      const val = object[fieldName];
      if (isOptional && val === void 0)
        return;
      if (!checkVal(val, object)) {
        throw new Error(`Invalid param ${String(fieldName)}=${val} (${typeof val}), expected ${type}`);
      }
    };
    for (const [fieldName, type] of Object.entries(validators))
      checkField(fieldName, type, false);
    for (const [fieldName, type] of Object.entries(optValidators))
      checkField(fieldName, type, true);
    return object;
  }

  // node_modules/nostr-tools/node_modules/@noble/curves/esm/abstract/modular.js
  var _0n2 = BigInt(0);
  var _1n2 = BigInt(1);
  var _2n2 = BigInt(2);
  var _3n = BigInt(3);
  var _4n = BigInt(4);
  var _5n = BigInt(5);
  var _8n = BigInt(8);
  var _9n = BigInt(9);
  var _16n = BigInt(16);
  function mod(a, b) {
    const result = a % b;
    return result >= _0n2 ? result : b + result;
  }
  function pow(num2, power, modulo) {
    if (modulo <= _0n2 || power < _0n2)
      throw new Error("Expected power/modulo > 0");
    if (modulo === _1n2)
      return _0n2;
    let res = _1n2;
    while (power > _0n2) {
      if (power & _1n2)
        res = res * num2 % modulo;
      num2 = num2 * num2 % modulo;
      power >>= _1n2;
    }
    return res;
  }
  function pow2(x, power, modulo) {
    let res = x;
    while (power-- > _0n2) {
      res *= res;
      res %= modulo;
    }
    return res;
  }
  function invert(number4, modulo) {
    if (number4 === _0n2 || modulo <= _0n2) {
      throw new Error(`invert: expected positive integers, got n=${number4} mod=${modulo}`);
    }
    let a = mod(number4, modulo);
    let b = modulo;
    let x = _0n2, y = _1n2, u = _1n2, v = _0n2;
    while (a !== _0n2) {
      const q = b / a;
      const r = b % a;
      const m = x - u * q;
      const n = y - v * q;
      b = a, a = r, x = u, y = v, u = m, v = n;
    }
    const gcd3 = b;
    if (gcd3 !== _1n2)
      throw new Error("invert: does not exist");
    return mod(x, modulo);
  }
  function tonelliShanks(P) {
    const legendreC = (P - _1n2) / _2n2;
    let Q, S, Z;
    for (Q = P - _1n2, S = 0; Q % _2n2 === _0n2; Q /= _2n2, S++)
      ;
    for (Z = _2n2; Z < P && pow(Z, legendreC, P) !== P - _1n2; Z++)
      ;
    if (S === 1) {
      const p1div4 = (P + _1n2) / _4n;
      return function tonelliFast(Fp2, n) {
        const root = Fp2.pow(n, p1div4);
        if (!Fp2.eql(Fp2.sqr(root), n))
          throw new Error("Cannot find square root");
        return root;
      };
    }
    const Q1div2 = (Q + _1n2) / _2n2;
    return function tonelliSlow(Fp2, n) {
      if (Fp2.pow(n, legendreC) === Fp2.neg(Fp2.ONE))
        throw new Error("Cannot find square root");
      let r = S;
      let g = Fp2.pow(Fp2.mul(Fp2.ONE, Z), Q);
      let x = Fp2.pow(n, Q1div2);
      let b = Fp2.pow(n, Q);
      while (!Fp2.eql(b, Fp2.ONE)) {
        if (Fp2.eql(b, Fp2.ZERO))
          return Fp2.ZERO;
        let m = 1;
        for (let t2 = Fp2.sqr(b); m < r; m++) {
          if (Fp2.eql(t2, Fp2.ONE))
            break;
          t2 = Fp2.sqr(t2);
        }
        const ge2 = Fp2.pow(g, _1n2 << BigInt(r - m - 1));
        g = Fp2.sqr(ge2);
        x = Fp2.mul(x, ge2);
        b = Fp2.mul(b, g);
        r = m;
      }
      return x;
    };
  }
  function FpSqrt(P) {
    if (P % _4n === _3n) {
      const p1div4 = (P + _1n2) / _4n;
      return function sqrt3mod4(Fp2, n) {
        const root = Fp2.pow(n, p1div4);
        if (!Fp2.eql(Fp2.sqr(root), n))
          throw new Error("Cannot find square root");
        return root;
      };
    }
    if (P % _8n === _5n) {
      const c1 = (P - _5n) / _8n;
      return function sqrt5mod8(Fp2, n) {
        const n2 = Fp2.mul(n, _2n2);
        const v = Fp2.pow(n2, c1);
        const nv = Fp2.mul(n, v);
        const i2 = Fp2.mul(Fp2.mul(nv, _2n2), v);
        const root = Fp2.mul(nv, Fp2.sub(i2, Fp2.ONE));
        if (!Fp2.eql(Fp2.sqr(root), n))
          throw new Error("Cannot find square root");
        return root;
      };
    }
    if (P % _16n === _9n) {
    }
    return tonelliShanks(P);
  }
  var FIELD_FIELDS = [
    "create",
    "isValid",
    "is0",
    "neg",
    "inv",
    "sqrt",
    "sqr",
    "eql",
    "add",
    "sub",
    "mul",
    "pow",
    "div",
    "addN",
    "subN",
    "mulN",
    "sqrN"
  ];
  function validateField(field) {
    const initial = {
      ORDER: "bigint",
      MASK: "bigint",
      BYTES: "isSafeInteger",
      BITS: "isSafeInteger"
    };
    const opts = FIELD_FIELDS.reduce((map, val) => {
      map[val] = "function";
      return map;
    }, initial);
    return validateObject(field, opts);
  }
  function FpPow(f, num2, power) {
    if (power < _0n2)
      throw new Error("Expected power > 0");
    if (power === _0n2)
      return f.ONE;
    if (power === _1n2)
      return num2;
    let p = f.ONE;
    let d4 = num2;
    while (power > _0n2) {
      if (power & _1n2)
        p = f.mul(p, d4);
      d4 = f.sqr(d4);
      power >>= _1n2;
    }
    return p;
  }
  function FpInvertBatch(f, nums) {
    const tmp = new Array(nums.length);
    const lastMultiplied = nums.reduce((acc, num2, i2) => {
      if (f.is0(num2))
        return acc;
      tmp[i2] = acc;
      return f.mul(acc, num2);
    }, f.ONE);
    const inverted = f.inv(lastMultiplied);
    nums.reduceRight((acc, num2, i2) => {
      if (f.is0(num2))
        return acc;
      tmp[i2] = f.mul(acc, tmp[i2]);
      return f.mul(acc, num2);
    }, inverted);
    return tmp;
  }
  function nLength(n, nBitLength) {
    const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
    const nByteLength = Math.ceil(_nBitLength / 8);
    return { nBitLength: _nBitLength, nByteLength };
  }
  function Field(ORDER, bitLen3, isLE4 = false, redef = {}) {
    if (ORDER <= _0n2)
      throw new Error(`Expected Field ORDER > 0, got ${ORDER}`);
    const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen3);
    if (BYTES > 2048)
      throw new Error("Field lengths over 2048 bytes are not supported");
    const sqrtP = FpSqrt(ORDER);
    const f = Object.freeze({
      ORDER,
      BITS,
      BYTES,
      MASK: bitMask(BITS),
      ZERO: _0n2,
      ONE: _1n2,
      create: (num2) => mod(num2, ORDER),
      isValid: (num2) => {
        if (typeof num2 !== "bigint")
          throw new Error(`Invalid field element: expected bigint, got ${typeof num2}`);
        return _0n2 <= num2 && num2 < ORDER;
      },
      is0: (num2) => num2 === _0n2,
      isOdd: (num2) => (num2 & _1n2) === _1n2,
      neg: (num2) => mod(-num2, ORDER),
      eql: (lhs, rhs) => lhs === rhs,
      sqr: (num2) => mod(num2 * num2, ORDER),
      add: (lhs, rhs) => mod(lhs + rhs, ORDER),
      sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
      mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
      pow: (num2, power) => FpPow(f, num2, power),
      div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
      // Same as above, but doesn't normalize
      sqrN: (num2) => num2 * num2,
      addN: (lhs, rhs) => lhs + rhs,
      subN: (lhs, rhs) => lhs - rhs,
      mulN: (lhs, rhs) => lhs * rhs,
      inv: (num2) => invert(num2, ORDER),
      sqrt: redef.sqrt || ((n) => sqrtP(f, n)),
      invertBatch: (lst) => FpInvertBatch(f, lst),
      // TODO: do we really need constant cmov?
      // We don't have const-time bigints anyway, so probably will be not very useful
      cmov: (a, b, c) => c ? b : a,
      toBytes: (num2) => isLE4 ? numberToBytesLE(num2, BYTES) : numberToBytesBE(num2, BYTES),
      fromBytes: (bytes4) => {
        if (bytes4.length !== BYTES)
          throw new Error(`Fp.fromBytes: expected ${BYTES}, got ${bytes4.length}`);
        return isLE4 ? bytesToNumberLE(bytes4) : bytesToNumberBE(bytes4);
      }
    });
    return Object.freeze(f);
  }
  function getFieldBytesLength(fieldOrder) {
    if (typeof fieldOrder !== "bigint")
      throw new Error("field order must be bigint");
    const bitLength = fieldOrder.toString(2).length;
    return Math.ceil(bitLength / 8);
  }
  function getMinHashLength(fieldOrder) {
    const length = getFieldBytesLength(fieldOrder);
    return length + Math.ceil(length / 2);
  }
  function mapHashToField(key, fieldOrder, isLE4 = false) {
    const len = key.length;
    const fieldLen = getFieldBytesLength(fieldOrder);
    const minLen = getMinHashLength(fieldOrder);
    if (len < 16 || len < minLen || len > 1024)
      throw new Error(`expected ${minLen}-1024 bytes of input, got ${len}`);
    const num2 = isLE4 ? bytesToNumberBE(key) : bytesToNumberLE(key);
    const reduced = mod(num2, fieldOrder - _1n2) + _1n2;
    return isLE4 ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
  }

  // node_modules/nostr-tools/node_modules/@noble/curves/esm/abstract/curve.js
  var _0n3 = BigInt(0);
  var _1n3 = BigInt(1);
  function wNAF(c, bits) {
    const constTimeNegate2 = (condition, item) => {
      const neg = item.negate();
      return condition ? neg : item;
    };
    const opts = (W) => {
      const windows = Math.ceil(bits / W) + 1;
      const windowSize = 2 ** (W - 1);
      return { windows, windowSize };
    };
    return {
      constTimeNegate: constTimeNegate2,
      // non-const time multiplication ladder
      unsafeLadder(elm, n) {
        let p = c.ZERO;
        let d4 = elm;
        while (n > _0n3) {
          if (n & _1n3)
            p = p.add(d4);
          d4 = d4.double();
          n >>= _1n3;
        }
        return p;
      },
      /**
       * Creates a wNAF precomputation window. Used for caching.
       * Default window size is set by `utils.precompute()` and is equal to 8.
       * Number of precomputed points depends on the curve size:
       * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
       * - 𝑊 is the window size
       * - 𝑛 is the bitlength of the curve order.
       * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
       * @returns precomputed point tables flattened to a single array
       */
      precomputeWindow(elm, W) {
        const { windows, windowSize } = opts(W);
        const points = [];
        let p = elm;
        let base = p;
        for (let window2 = 0; window2 < windows; window2++) {
          base = p;
          points.push(base);
          for (let i2 = 1; i2 < windowSize; i2++) {
            base = base.add(p);
            points.push(base);
          }
          p = base.double();
        }
        return points;
      },
      /**
       * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
       * @param W window size
       * @param precomputes precomputed tables
       * @param n scalar (we don't check here, but should be less than curve order)
       * @returns real and fake (for const-time) points
       */
      wNAF(W, precomputes, n) {
        const { windows, windowSize } = opts(W);
        let p = c.ZERO;
        let f = c.BASE;
        const mask = BigInt(2 ** W - 1);
        const maxNumber = 2 ** W;
        const shiftBy = BigInt(W);
        for (let window2 = 0; window2 < windows; window2++) {
          const offset = window2 * windowSize;
          let wbits = Number(n & mask);
          n >>= shiftBy;
          if (wbits > windowSize) {
            wbits -= maxNumber;
            n += _1n3;
          }
          const offset1 = offset;
          const offset2 = offset + Math.abs(wbits) - 1;
          const cond1 = window2 % 2 !== 0;
          const cond2 = wbits < 0;
          if (wbits === 0) {
            f = f.add(constTimeNegate2(cond1, precomputes[offset1]));
          } else {
            p = p.add(constTimeNegate2(cond2, precomputes[offset2]));
          }
        }
        return { p, f };
      },
      wNAFCached(P, precomputesMap, n, transform) {
        const W = P._WINDOW_SIZE || 1;
        let comp = precomputesMap.get(P);
        if (!comp) {
          comp = this.precomputeWindow(P, W);
          if (W !== 1) {
            precomputesMap.set(P, transform(comp));
          }
        }
        return this.wNAF(W, comp, n);
      }
    };
  }
  function validateBasic(curve) {
    validateField(curve.Fp);
    validateObject(curve, {
      n: "bigint",
      h: "bigint",
      Gx: "field",
      Gy: "field"
    }, {
      nBitLength: "isSafeInteger",
      nByteLength: "isSafeInteger"
    });
    return Object.freeze({
      ...nLength(curve.n, curve.nBitLength),
      ...curve,
      ...{ p: curve.Fp.ORDER }
    });
  }

  // node_modules/nostr-tools/node_modules/@noble/curves/esm/abstract/weierstrass.js
  function validatePointOpts(curve) {
    const opts = validateBasic(curve);
    validateObject(opts, {
      a: "field",
      b: "field"
    }, {
      allowedPrivateKeyLengths: "array",
      wrapPrivateKey: "boolean",
      isTorsionFree: "function",
      clearCofactor: "function",
      allowInfinityPoint: "boolean",
      fromBytes: "function",
      toBytes: "function"
    });
    const { endo, Fp: Fp2, a } = opts;
    if (endo) {
      if (!Fp2.eql(a, Fp2.ZERO)) {
        throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
      }
      if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
        throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
      }
    }
    return Object.freeze({ ...opts });
  }
  var { bytesToNumberBE: b2n, hexToBytes: h2b } = utils_exports;
  var DER = {
    // asn.1 DER encoding utils
    Err: class DERErr extends Error {
      constructor(m = "") {
        super(m);
      }
    },
    _parseInt(data) {
      const { Err: E } = DER;
      if (data.length < 2 || data[0] !== 2)
        throw new E("Invalid signature integer tag");
      const len = data[1];
      const res = data.subarray(2, len + 2);
      if (!len || res.length !== len)
        throw new E("Invalid signature integer: wrong length");
      if (res[0] & 128)
        throw new E("Invalid signature integer: negative");
      if (res[0] === 0 && !(res[1] & 128))
        throw new E("Invalid signature integer: unnecessary leading zero");
      return { d: b2n(res), l: data.subarray(len + 2) };
    },
    toSig(hex2) {
      const { Err: E } = DER;
      const data = typeof hex2 === "string" ? h2b(hex2) : hex2;
      if (!(data instanceof Uint8Array))
        throw new Error("ui8a expected");
      let l = data.length;
      if (l < 2 || data[0] != 48)
        throw new E("Invalid signature tag");
      if (data[1] !== l - 2)
        throw new E("Invalid signature: incorrect length");
      const { d: r, l: sBytes } = DER._parseInt(data.subarray(2));
      const { d: s, l: rBytesLeft } = DER._parseInt(sBytes);
      if (rBytesLeft.length)
        throw new E("Invalid signature: left bytes after parsing");
      return { r, s };
    },
    hexFromSig(sig) {
      const slice = (s2) => Number.parseInt(s2[0], 16) & 8 ? "00" + s2 : s2;
      const h = (num2) => {
        const hex2 = num2.toString(16);
        return hex2.length & 1 ? `0${hex2}` : hex2;
      };
      const s = slice(h(sig.s));
      const r = slice(h(sig.r));
      const shl = s.length / 2;
      const rhl = r.length / 2;
      const sl = h(shl);
      const rl = h(rhl);
      return `30${h(rhl + shl + 4)}02${rl}${r}02${sl}${s}`;
    }
  };
  var _0n4 = BigInt(0);
  var _1n4 = BigInt(1);
  var _2n3 = BigInt(2);
  var _3n2 = BigInt(3);
  var _4n2 = BigInt(4);
  function weierstrassPoints(opts) {
    const CURVE = validatePointOpts(opts);
    const { Fp: Fp2 } = CURVE;
    const toBytes5 = CURVE.toBytes || ((_c, point, _isCompressed) => {
      const a = point.toAffine();
      return concatBytes2(Uint8Array.from([4]), Fp2.toBytes(a.x), Fp2.toBytes(a.y));
    });
    const fromBytes = CURVE.fromBytes || ((bytes4) => {
      const tail = bytes4.subarray(1);
      const x = Fp2.fromBytes(tail.subarray(0, Fp2.BYTES));
      const y = Fp2.fromBytes(tail.subarray(Fp2.BYTES, 2 * Fp2.BYTES));
      return { x, y };
    });
    function weierstrassEquation(x) {
      const { a, b } = CURVE;
      const x2 = Fp2.sqr(x);
      const x3 = Fp2.mul(x2, x);
      return Fp2.add(Fp2.add(x3, Fp2.mul(x, a)), b);
    }
    if (!Fp2.eql(Fp2.sqr(CURVE.Gy), weierstrassEquation(CURVE.Gx)))
      throw new Error("bad generator point: equation left != right");
    function isWithinCurveOrder(num2) {
      return typeof num2 === "bigint" && _0n4 < num2 && num2 < CURVE.n;
    }
    function assertGE(num2) {
      if (!isWithinCurveOrder(num2))
        throw new Error("Expected valid bigint: 0 < bigint < curve.n");
    }
    function normPrivateKeyToScalar(key) {
      const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n } = CURVE;
      if (lengths && typeof key !== "bigint") {
        if (key instanceof Uint8Array)
          key = bytesToHex(key);
        if (typeof key !== "string" || !lengths.includes(key.length))
          throw new Error("Invalid key");
        key = key.padStart(nByteLength * 2, "0");
      }
      let num2;
      try {
        num2 = typeof key === "bigint" ? key : bytesToNumberBE(ensureBytes("private key", key, nByteLength));
      } catch (error) {
        throw new Error(`private key must be ${nByteLength} bytes, hex or bigint, not ${typeof key}`);
      }
      if (wrapPrivateKey)
        num2 = mod(num2, n);
      assertGE(num2);
      return num2;
    }
    const pointPrecomputes2 = /* @__PURE__ */ new Map();
    function assertPrjPoint(other) {
      if (!(other instanceof Point3))
        throw new Error("ProjectivePoint expected");
    }
    class Point3 {
      constructor(px, py, pz) {
        this.px = px;
        this.py = py;
        this.pz = pz;
        if (px == null || !Fp2.isValid(px))
          throw new Error("x required");
        if (py == null || !Fp2.isValid(py))
          throw new Error("y required");
        if (pz == null || !Fp2.isValid(pz))
          throw new Error("z required");
      }
      // Does not validate if the point is on-curve.
      // Use fromHex instead, or call assertValidity() later.
      static fromAffine(p) {
        const { x, y } = p || {};
        if (!p || !Fp2.isValid(x) || !Fp2.isValid(y))
          throw new Error("invalid affine point");
        if (p instanceof Point3)
          throw new Error("projective point not allowed");
        const is0 = (i2) => Fp2.eql(i2, Fp2.ZERO);
        if (is0(x) && is0(y))
          return Point3.ZERO;
        return new Point3(x, y, Fp2.ONE);
      }
      get x() {
        return this.toAffine().x;
      }
      get y() {
        return this.toAffine().y;
      }
      /**
       * Takes a bunch of Projective Points but executes only one
       * inversion on all of them. Inversion is very slow operation,
       * so this improves performance massively.
       * Optimization: converts a list of projective points to a list of identical points with Z=1.
       */
      static normalizeZ(points) {
        const toInv = Fp2.invertBatch(points.map((p) => p.pz));
        return points.map((p, i2) => p.toAffine(toInv[i2])).map(Point3.fromAffine);
      }
      /**
       * Converts hash string or Uint8Array to Point.
       * @param hex short/long ECDSA hex
       */
      static fromHex(hex2) {
        const P = Point3.fromAffine(fromBytes(ensureBytes("pointHex", hex2)));
        P.assertValidity();
        return P;
      }
      // Multiplies generator point by privateKey.
      static fromPrivateKey(privateKey) {
        return Point3.BASE.multiply(normPrivateKeyToScalar(privateKey));
      }
      // "Private method", don't use it directly
      _setWindowSize(windowSize) {
        this._WINDOW_SIZE = windowSize;
        pointPrecomputes2.delete(this);
      }
      // A point on curve is valid if it conforms to equation.
      assertValidity() {
        if (this.is0()) {
          if (CURVE.allowInfinityPoint && !Fp2.is0(this.py))
            return;
          throw new Error("bad point: ZERO");
        }
        const { x, y } = this.toAffine();
        if (!Fp2.isValid(x) || !Fp2.isValid(y))
          throw new Error("bad point: x or y not FE");
        const left = Fp2.sqr(y);
        const right = weierstrassEquation(x);
        if (!Fp2.eql(left, right))
          throw new Error("bad point: equation left != right");
        if (!this.isTorsionFree())
          throw new Error("bad point: not in prime-order subgroup");
      }
      hasEvenY() {
        const { y } = this.toAffine();
        if (Fp2.isOdd)
          return !Fp2.isOdd(y);
        throw new Error("Field doesn't support isOdd");
      }
      /**
       * Compare one point to another.
       */
      equals(other) {
        assertPrjPoint(other);
        const { px: X1, py: Y1, pz: Z1 } = this;
        const { px: X2, py: Y2, pz: Z2 } = other;
        const U1 = Fp2.eql(Fp2.mul(X1, Z2), Fp2.mul(X2, Z1));
        const U2 = Fp2.eql(Fp2.mul(Y1, Z2), Fp2.mul(Y2, Z1));
        return U1 && U2;
      }
      /**
       * Flips point to one corresponding to (x, -y) in Affine coordinates.
       */
      negate() {
        return new Point3(this.px, Fp2.neg(this.py), this.pz);
      }
      // Renes-Costello-Batina exception-free doubling formula.
      // There is 30% faster Jacobian formula, but it is not complete.
      // https://eprint.iacr.org/2015/1060, algorithm 3
      // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
      double() {
        const { a, b } = CURVE;
        const b3 = Fp2.mul(b, _3n2);
        const { px: X1, py: Y1, pz: Z1 } = this;
        let X3 = Fp2.ZERO, Y3 = Fp2.ZERO, Z3 = Fp2.ZERO;
        let t0 = Fp2.mul(X1, X1);
        let t1 = Fp2.mul(Y1, Y1);
        let t2 = Fp2.mul(Z1, Z1);
        let t3 = Fp2.mul(X1, Y1);
        t3 = Fp2.add(t3, t3);
        Z3 = Fp2.mul(X1, Z1);
        Z3 = Fp2.add(Z3, Z3);
        X3 = Fp2.mul(a, Z3);
        Y3 = Fp2.mul(b3, t2);
        Y3 = Fp2.add(X3, Y3);
        X3 = Fp2.sub(t1, Y3);
        Y3 = Fp2.add(t1, Y3);
        Y3 = Fp2.mul(X3, Y3);
        X3 = Fp2.mul(t3, X3);
        Z3 = Fp2.mul(b3, Z3);
        t2 = Fp2.mul(a, t2);
        t3 = Fp2.sub(t0, t2);
        t3 = Fp2.mul(a, t3);
        t3 = Fp2.add(t3, Z3);
        Z3 = Fp2.add(t0, t0);
        t0 = Fp2.add(Z3, t0);
        t0 = Fp2.add(t0, t2);
        t0 = Fp2.mul(t0, t3);
        Y3 = Fp2.add(Y3, t0);
        t2 = Fp2.mul(Y1, Z1);
        t2 = Fp2.add(t2, t2);
        t0 = Fp2.mul(t2, t3);
        X3 = Fp2.sub(X3, t0);
        Z3 = Fp2.mul(t2, t1);
        Z3 = Fp2.add(Z3, Z3);
        Z3 = Fp2.add(Z3, Z3);
        return new Point3(X3, Y3, Z3);
      }
      // Renes-Costello-Batina exception-free addition formula.
      // There is 30% faster Jacobian formula, but it is not complete.
      // https://eprint.iacr.org/2015/1060, algorithm 1
      // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
      add(other) {
        assertPrjPoint(other);
        const { px: X1, py: Y1, pz: Z1 } = this;
        const { px: X2, py: Y2, pz: Z2 } = other;
        let X3 = Fp2.ZERO, Y3 = Fp2.ZERO, Z3 = Fp2.ZERO;
        const a = CURVE.a;
        const b3 = Fp2.mul(CURVE.b, _3n2);
        let t0 = Fp2.mul(X1, X2);
        let t1 = Fp2.mul(Y1, Y2);
        let t2 = Fp2.mul(Z1, Z2);
        let t3 = Fp2.add(X1, Y1);
        let t4 = Fp2.add(X2, Y2);
        t3 = Fp2.mul(t3, t4);
        t4 = Fp2.add(t0, t1);
        t3 = Fp2.sub(t3, t4);
        t4 = Fp2.add(X1, Z1);
        let t5 = Fp2.add(X2, Z2);
        t4 = Fp2.mul(t4, t5);
        t5 = Fp2.add(t0, t2);
        t4 = Fp2.sub(t4, t5);
        t5 = Fp2.add(Y1, Z1);
        X3 = Fp2.add(Y2, Z2);
        t5 = Fp2.mul(t5, X3);
        X3 = Fp2.add(t1, t2);
        t5 = Fp2.sub(t5, X3);
        Z3 = Fp2.mul(a, t4);
        X3 = Fp2.mul(b3, t2);
        Z3 = Fp2.add(X3, Z3);
        X3 = Fp2.sub(t1, Z3);
        Z3 = Fp2.add(t1, Z3);
        Y3 = Fp2.mul(X3, Z3);
        t1 = Fp2.add(t0, t0);
        t1 = Fp2.add(t1, t0);
        t2 = Fp2.mul(a, t2);
        t4 = Fp2.mul(b3, t4);
        t1 = Fp2.add(t1, t2);
        t2 = Fp2.sub(t0, t2);
        t2 = Fp2.mul(a, t2);
        t4 = Fp2.add(t4, t2);
        t0 = Fp2.mul(t1, t4);
        Y3 = Fp2.add(Y3, t0);
        t0 = Fp2.mul(t5, t4);
        X3 = Fp2.mul(t3, X3);
        X3 = Fp2.sub(X3, t0);
        t0 = Fp2.mul(t3, t1);
        Z3 = Fp2.mul(t5, Z3);
        Z3 = Fp2.add(Z3, t0);
        return new Point3(X3, Y3, Z3);
      }
      subtract(other) {
        return this.add(other.negate());
      }
      is0() {
        return this.equals(Point3.ZERO);
      }
      wNAF(n) {
        return wnaf.wNAFCached(this, pointPrecomputes2, n, (comp) => {
          const toInv = Fp2.invertBatch(comp.map((p) => p.pz));
          return comp.map((p, i2) => p.toAffine(toInv[i2])).map(Point3.fromAffine);
        });
      }
      /**
       * Non-constant-time multiplication. Uses double-and-add algorithm.
       * It's faster, but should only be used when you don't care about
       * an exposed private key e.g. sig verification, which works over *public* keys.
       */
      multiplyUnsafe(n) {
        const I = Point3.ZERO;
        if (n === _0n4)
          return I;
        assertGE(n);
        if (n === _1n4)
          return this;
        const { endo } = CURVE;
        if (!endo)
          return wnaf.unsafeLadder(this, n);
        let { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
        let k1p = I;
        let k2p = I;
        let d4 = this;
        while (k1 > _0n4 || k2 > _0n4) {
          if (k1 & _1n4)
            k1p = k1p.add(d4);
          if (k2 & _1n4)
            k2p = k2p.add(d4);
          d4 = d4.double();
          k1 >>= _1n4;
          k2 >>= _1n4;
        }
        if (k1neg)
          k1p = k1p.negate();
        if (k2neg)
          k2p = k2p.negate();
        k2p = new Point3(Fp2.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
        return k1p.add(k2p);
      }
      /**
       * Constant time multiplication.
       * Uses wNAF method. Windowed method may be 10% faster,
       * but takes 2x longer to generate and consumes 2x memory.
       * Uses precomputes when available.
       * Uses endomorphism for Koblitz curves.
       * @param scalar by which the point would be multiplied
       * @returns New point
       */
      multiply(scalar) {
        assertGE(scalar);
        let n = scalar;
        let point, fake;
        const { endo } = CURVE;
        if (endo) {
          const { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
          let { p: k1p, f: f1p } = this.wNAF(k1);
          let { p: k2p, f: f2p } = this.wNAF(k2);
          k1p = wnaf.constTimeNegate(k1neg, k1p);
          k2p = wnaf.constTimeNegate(k2neg, k2p);
          k2p = new Point3(Fp2.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
          point = k1p.add(k2p);
          fake = f1p.add(f2p);
        } else {
          const { p, f } = this.wNAF(n);
          point = p;
          fake = f;
        }
        return Point3.normalizeZ([point, fake])[0];
      }
      /**
       * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
       * Not using Strauss-Shamir trick: precomputation tables are faster.
       * The trick could be useful if both P and Q are not G (not in our case).
       * @returns non-zero affine point
       */
      multiplyAndAddUnsafe(Q, a, b) {
        const G = Point3.BASE;
        const mul3 = (P, a2) => a2 === _0n4 || a2 === _1n4 || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2);
        const sum = mul3(this, a).add(mul3(Q, b));
        return sum.is0() ? void 0 : sum;
      }
      // Converts Projective point to affine (x, y) coordinates.
      // Can accept precomputed Z^-1 - for example, from invertBatch.
      // (x, y, z) ∋ (x=x/z, y=y/z)
      toAffine(iz) {
        const { px: x, py: y, pz: z } = this;
        const is0 = this.is0();
        if (iz == null)
          iz = is0 ? Fp2.ONE : Fp2.inv(z);
        const ax = Fp2.mul(x, iz);
        const ay = Fp2.mul(y, iz);
        const zz = Fp2.mul(z, iz);
        if (is0)
          return { x: Fp2.ZERO, y: Fp2.ZERO };
        if (!Fp2.eql(zz, Fp2.ONE))
          throw new Error("invZ was invalid");
        return { x: ax, y: ay };
      }
      isTorsionFree() {
        const { h: cofactor, isTorsionFree } = CURVE;
        if (cofactor === _1n4)
          return true;
        if (isTorsionFree)
          return isTorsionFree(Point3, this);
        throw new Error("isTorsionFree() has not been declared for the elliptic curve");
      }
      clearCofactor() {
        const { h: cofactor, clearCofactor } = CURVE;
        if (cofactor === _1n4)
          return this;
        if (clearCofactor)
          return clearCofactor(Point3, this);
        return this.multiplyUnsafe(CURVE.h);
      }
      toRawBytes(isCompressed = true) {
        this.assertValidity();
        return toBytes5(Point3, this, isCompressed);
      }
      toHex(isCompressed = true) {
        return bytesToHex(this.toRawBytes(isCompressed));
      }
    }
    Point3.BASE = new Point3(CURVE.Gx, CURVE.Gy, Fp2.ONE);
    Point3.ZERO = new Point3(Fp2.ZERO, Fp2.ONE, Fp2.ZERO);
    const _bits = CURVE.nBitLength;
    const wnaf = wNAF(Point3, CURVE.endo ? Math.ceil(_bits / 2) : _bits);
    return {
      CURVE,
      ProjectivePoint: Point3,
      normPrivateKeyToScalar,
      weierstrassEquation,
      isWithinCurveOrder
    };
  }
  function validateOpts(curve) {
    const opts = validateBasic(curve);
    validateObject(opts, {
      hash: "hash",
      hmac: "function",
      randomBytes: "function"
    }, {
      bits2int: "function",
      bits2int_modN: "function",
      lowS: "boolean"
    });
    return Object.freeze({ lowS: true, ...opts });
  }
  function weierstrass(curveDef) {
    const CURVE = validateOpts(curveDef);
    const { Fp: Fp2, n: CURVE_ORDER } = CURVE;
    const compressedLen = Fp2.BYTES + 1;
    const uncompressedLen = 2 * Fp2.BYTES + 1;
    function isValidFieldElement(num2) {
      return _0n4 < num2 && num2 < Fp2.ORDER;
    }
    function modN3(a) {
      return mod(a, CURVE_ORDER);
    }
    function invN(a) {
      return invert(a, CURVE_ORDER);
    }
    const { ProjectivePoint: Point3, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
      ...CURVE,
      toBytes(_c, point, isCompressed) {
        const a = point.toAffine();
        const x = Fp2.toBytes(a.x);
        const cat = concatBytes2;
        if (isCompressed) {
          return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
        } else {
          return cat(Uint8Array.from([4]), x, Fp2.toBytes(a.y));
        }
      },
      fromBytes(bytes4) {
        const len = bytes4.length;
        const head = bytes4[0];
        const tail = bytes4.subarray(1);
        if (len === compressedLen && (head === 2 || head === 3)) {
          const x = bytesToNumberBE(tail);
          if (!isValidFieldElement(x))
            throw new Error("Point is not on curve");
          const y2 = weierstrassEquation(x);
          let y = Fp2.sqrt(y2);
          const isYOdd = (y & _1n4) === _1n4;
          const isHeadOdd = (head & 1) === 1;
          if (isHeadOdd !== isYOdd)
            y = Fp2.neg(y);
          return { x, y };
        } else if (len === uncompressedLen && head === 4) {
          const x = Fp2.fromBytes(tail.subarray(0, Fp2.BYTES));
          const y = Fp2.fromBytes(tail.subarray(Fp2.BYTES, 2 * Fp2.BYTES));
          return { x, y };
        } else {
          throw new Error(`Point of length ${len} was invalid. Expected ${compressedLen} compressed bytes or ${uncompressedLen} uncompressed bytes`);
        }
      }
    });
    const numToNByteStr = (num2) => bytesToHex(numberToBytesBE(num2, CURVE.nByteLength));
    function isBiggerThanHalfOrder(number4) {
      const HALF = CURVE_ORDER >> _1n4;
      return number4 > HALF;
    }
    function normalizeS(s) {
      return isBiggerThanHalfOrder(s) ? modN3(-s) : s;
    }
    const slcNum = (b, from, to) => bytesToNumberBE(b.slice(from, to));
    class Signature {
      constructor(r, s, recovery) {
        this.r = r;
        this.s = s;
        this.recovery = recovery;
        this.assertValidity();
      }
      // pair (bytes of r, bytes of s)
      static fromCompact(hex2) {
        const l = CURVE.nByteLength;
        hex2 = ensureBytes("compactSignature", hex2, l * 2);
        return new Signature(slcNum(hex2, 0, l), slcNum(hex2, l, 2 * l));
      }
      // DER encoded ECDSA signature
      // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
      static fromDER(hex2) {
        const { r, s } = DER.toSig(ensureBytes("DER", hex2));
        return new Signature(r, s);
      }
      assertValidity() {
        if (!isWithinCurveOrder(this.r))
          throw new Error("r must be 0 < r < CURVE.n");
        if (!isWithinCurveOrder(this.s))
          throw new Error("s must be 0 < s < CURVE.n");
      }
      addRecoveryBit(recovery) {
        return new Signature(this.r, this.s, recovery);
      }
      recoverPublicKey(msgHash) {
        const { r, s, recovery: rec } = this;
        const h = bits2int_modN(ensureBytes("msgHash", msgHash));
        if (rec == null || ![0, 1, 2, 3].includes(rec))
          throw new Error("recovery id invalid");
        const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
        if (radj >= Fp2.ORDER)
          throw new Error("recovery id 2 or 3 invalid");
        const prefix = (rec & 1) === 0 ? "02" : "03";
        const R = Point3.fromHex(prefix + numToNByteStr(radj));
        const ir = invN(radj);
        const u1 = modN3(-h * ir);
        const u2 = modN3(s * ir);
        const Q = Point3.BASE.multiplyAndAddUnsafe(R, u1, u2);
        if (!Q)
          throw new Error("point at infinify");
        Q.assertValidity();
        return Q;
      }
      // Signatures should be low-s, to prevent malleability.
      hasHighS() {
        return isBiggerThanHalfOrder(this.s);
      }
      normalizeS() {
        return this.hasHighS() ? new Signature(this.r, modN3(-this.s), this.recovery) : this;
      }
      // DER-encoded
      toDERRawBytes() {
        return hexToBytes(this.toDERHex());
      }
      toDERHex() {
        return DER.hexFromSig({ r: this.r, s: this.s });
      }
      // padded bytes of r, then padded bytes of s
      toCompactRawBytes() {
        return hexToBytes(this.toCompactHex());
      }
      toCompactHex() {
        return numToNByteStr(this.r) + numToNByteStr(this.s);
      }
    }
    const utils = {
      isValidPrivateKey(privateKey) {
        try {
          normPrivateKeyToScalar(privateKey);
          return true;
        } catch (error) {
          return false;
        }
      },
      normPrivateKeyToScalar,
      /**
       * Produces cryptographically secure private key from random of size
       * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
       */
      randomPrivateKey: () => {
        const length = getMinHashLength(CURVE.n);
        return mapHashToField(CURVE.randomBytes(length), CURVE.n);
      },
      /**
       * Creates precompute table for an arbitrary EC point. Makes point "cached".
       * Allows to massively speed-up `point.multiply(scalar)`.
       * @returns cached point
       * @example
       * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
       * fast.multiply(privKey); // much faster ECDH now
       */
      precompute(windowSize = 8, point = Point3.BASE) {
        point._setWindowSize(windowSize);
        point.multiply(BigInt(3));
        return point;
      }
    };
    function getPublicKey2(privateKey, isCompressed = true) {
      return Point3.fromPrivateKey(privateKey).toRawBytes(isCompressed);
    }
    function isProbPub(item) {
      const arr = item instanceof Uint8Array;
      const str = typeof item === "string";
      const len = (arr || str) && item.length;
      if (arr)
        return len === compressedLen || len === uncompressedLen;
      if (str)
        return len === 2 * compressedLen || len === 2 * uncompressedLen;
      if (item instanceof Point3)
        return true;
      return false;
    }
    function getSharedSecret(privateA, publicB, isCompressed = true) {
      if (isProbPub(privateA))
        throw new Error("first arg must be private key");
      if (!isProbPub(publicB))
        throw new Error("second arg must be public key");
      const b = Point3.fromHex(publicB);
      return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
    }
    const bits2int = CURVE.bits2int || function(bytes4) {
      const num2 = bytesToNumberBE(bytes4);
      const delta = bytes4.length * 8 - CURVE.nBitLength;
      return delta > 0 ? num2 >> BigInt(delta) : num2;
    };
    const bits2int_modN = CURVE.bits2int_modN || function(bytes4) {
      return modN3(bits2int(bytes4));
    };
    const ORDER_MASK = bitMask(CURVE.nBitLength);
    function int2octets(num2) {
      if (typeof num2 !== "bigint")
        throw new Error("bigint expected");
      if (!(_0n4 <= num2 && num2 < ORDER_MASK))
        throw new Error(`bigint expected < 2^${CURVE.nBitLength}`);
      return numberToBytesBE(num2, CURVE.nByteLength);
    }
    function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
      if (["recovered", "canonical"].some((k) => k in opts))
        throw new Error("sign() legacy options not supported");
      const { hash: hash3, randomBytes: randomBytes4 } = CURVE;
      let { lowS, prehash, extraEntropy: ent } = opts;
      if (lowS == null)
        lowS = true;
      msgHash = ensureBytes("msgHash", msgHash);
      if (prehash)
        msgHash = ensureBytes("prehashed msgHash", hash3(msgHash));
      const h1int = bits2int_modN(msgHash);
      const d4 = normPrivateKeyToScalar(privateKey);
      const seedArgs = [int2octets(d4), int2octets(h1int)];
      if (ent != null) {
        const e = ent === true ? randomBytes4(Fp2.BYTES) : ent;
        seedArgs.push(ensureBytes("extraEntropy", e));
      }
      const seed = concatBytes2(...seedArgs);
      const m = h1int;
      function k2sig(kBytes) {
        const k = bits2int(kBytes);
        if (!isWithinCurveOrder(k))
          return;
        const ik = invN(k);
        const q = Point3.BASE.multiply(k).toAffine();
        const r = modN3(q.x);
        if (r === _0n4)
          return;
        const s = modN3(ik * modN3(m + r * d4));
        if (s === _0n4)
          return;
        let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n4);
        let normS = s;
        if (lowS && isBiggerThanHalfOrder(s)) {
          normS = normalizeS(s);
          recovery ^= 1;
        }
        return new Signature(r, normS, recovery);
      }
      return { seed, k2sig };
    }
    const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
    const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
    function sign(msgHash, privKey, opts = defaultSigOpts) {
      const { seed, k2sig } = prepSig(msgHash, privKey, opts);
      const C = CURVE;
      const drbg = createHmacDrbg(C.hash.outputLen, C.nByteLength, C.hmac);
      return drbg(seed, k2sig);
    }
    Point3.BASE._setWindowSize(8);
    function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
      const sg = signature;
      msgHash = ensureBytes("msgHash", msgHash);
      publicKey = ensureBytes("publicKey", publicKey);
      if ("strict" in opts)
        throw new Error("options.strict was renamed to lowS");
      const { lowS, prehash } = opts;
      let _sig = void 0;
      let P;
      try {
        if (typeof sg === "string" || sg instanceof Uint8Array) {
          try {
            _sig = Signature.fromDER(sg);
          } catch (derError) {
            if (!(derError instanceof DER.Err))
              throw derError;
            _sig = Signature.fromCompact(sg);
          }
        } else if (typeof sg === "object" && typeof sg.r === "bigint" && typeof sg.s === "bigint") {
          const { r: r2, s: s2 } = sg;
          _sig = new Signature(r2, s2);
        } else {
          throw new Error("PARSE");
        }
        P = Point3.fromHex(publicKey);
      } catch (error) {
        if (error.message === "PARSE")
          throw new Error(`signature must be Signature instance, Uint8Array or hex string`);
        return false;
      }
      if (lowS && _sig.hasHighS())
        return false;
      if (prehash)
        msgHash = CURVE.hash(msgHash);
      const { r, s } = _sig;
      const h = bits2int_modN(msgHash);
      const is = invN(s);
      const u1 = modN3(h * is);
      const u2 = modN3(r * is);
      const R = Point3.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine();
      if (!R)
        return false;
      const v = modN3(R.x);
      return v === r;
    }
    return {
      CURVE,
      getPublicKey: getPublicKey2,
      getSharedSecret,
      sign,
      verify,
      ProjectivePoint: Point3,
      Signature,
      utils
    };
  }

  // node_modules/nostr-tools/node_modules/@noble/curves/node_modules/@noble/hashes/esm/hmac.js
  var HMAC = class extends Hash {
    constructor(hash3, _key) {
      super();
      this.finished = false;
      this.destroyed = false;
      hash(hash3);
      const key = toBytes(_key);
      this.iHash = hash3.create();
      if (typeof this.iHash.update !== "function")
        throw new Error("Expected instance of class which extends utils.Hash");
      this.blockLen = this.iHash.blockLen;
      this.outputLen = this.iHash.outputLen;
      const blockLen = this.blockLen;
      const pad2 = new Uint8Array(blockLen);
      pad2.set(key.length > blockLen ? hash3.create().update(key).digest() : key);
      for (let i2 = 0; i2 < pad2.length; i2++)
        pad2[i2] ^= 54;
      this.iHash.update(pad2);
      this.oHash = hash3.create();
      for (let i2 = 0; i2 < pad2.length; i2++)
        pad2[i2] ^= 54 ^ 92;
      this.oHash.update(pad2);
      pad2.fill(0);
    }
    update(buf) {
      exists(this);
      this.iHash.update(buf);
      return this;
    }
    digestInto(out) {
      exists(this);
      bytes(out, this.outputLen);
      this.finished = true;
      this.iHash.digestInto(out);
      this.oHash.update(out);
      this.oHash.digestInto(out);
      this.destroy();
    }
    digest() {
      const out = new Uint8Array(this.oHash.outputLen);
      this.digestInto(out);
      return out;
    }
    _cloneInto(to) {
      to || (to = Object.create(Object.getPrototypeOf(this), {}));
      const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
      to = to;
      to.finished = finished;
      to.destroyed = destroyed;
      to.blockLen = blockLen;
      to.outputLen = outputLen;
      to.oHash = oHash._cloneInto(to.oHash);
      to.iHash = iHash._cloneInto(to.iHash);
      return to;
    }
    destroy() {
      this.destroyed = true;
      this.oHash.destroy();
      this.iHash.destroy();
    }
  };
  var hmac = (hash3, key, message) => new HMAC(hash3, key).update(message).digest();
  hmac.create = (hash3, key) => new HMAC(hash3, key);

  // node_modules/nostr-tools/node_modules/@noble/curves/esm/_shortw_utils.js
  function getHash(hash3) {
    return {
      hash: hash3,
      hmac: (key, ...msgs) => hmac(hash3, key, concatBytes(...msgs)),
      randomBytes
    };
  }
  function createCurve(curveDef, defHash) {
    const create = (hash3) => weierstrass({ ...curveDef, ...getHash(hash3) });
    return Object.freeze({ ...create(defHash), create });
  }

  // node_modules/nostr-tools/node_modules/@noble/curves/esm/secp256k1.js
  var secp256k1P = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
  var secp256k1N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
  var _1n5 = BigInt(1);
  var _2n4 = BigInt(2);
  var divNearest = (a, b) => (a + b / _2n4) / b;
  function sqrtMod(y) {
    const P = secp256k1P;
    const _3n5 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
    const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
    const b2 = y * y * y % P;
    const b3 = b2 * b2 * y % P;
    const b6 = pow2(b3, _3n5, P) * b3 % P;
    const b9 = pow2(b6, _3n5, P) * b3 % P;
    const b11 = pow2(b9, _2n4, P) * b2 % P;
    const b22 = pow2(b11, _11n, P) * b11 % P;
    const b44 = pow2(b22, _22n, P) * b22 % P;
    const b88 = pow2(b44, _44n, P) * b44 % P;
    const b176 = pow2(b88, _88n, P) * b88 % P;
    const b220 = pow2(b176, _44n, P) * b44 % P;
    const b223 = pow2(b220, _3n5, P) * b3 % P;
    const t1 = pow2(b223, _23n, P) * b22 % P;
    const t2 = pow2(t1, _6n, P) * b2 % P;
    const root = pow2(t2, _2n4, P);
    if (!Fp.eql(Fp.sqr(root), y))
      throw new Error("Cannot find square root");
    return root;
  }
  var Fp = Field(secp256k1P, void 0, void 0, { sqrt: sqrtMod });
  var secp256k1 = createCurve({
    a: BigInt(0),
    b: BigInt(7),
    Fp,
    n: secp256k1N,
    // Base point (x, y) aka generator point
    Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
    Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
    h: BigInt(1),
    lowS: true,
    /**
     * secp256k1 belongs to Koblitz curves: it has efficiently computable endomorphism.
     * Endomorphism uses 2x less RAM, speeds up precomputation by 2x and ECDH / key recovery by 20%.
     * For precomputed wNAF it trades off 1/2 init time & 1/3 ram for 20% perf hit.
     * Explanation: https://gist.github.com/paulmillr/eb670806793e84df628a7c434a873066
     */
    endo: {
      beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
      splitScalar: (k) => {
        const n = secp256k1N;
        const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
        const b1 = -_1n5 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
        const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
        const b2 = a1;
        const POW_2_128 = BigInt("0x100000000000000000000000000000000");
        const c1 = divNearest(b2 * k, n);
        const c2 = divNearest(-b1 * k, n);
        let k1 = mod(k - c1 * a1 - c2 * a2, n);
        let k2 = mod(-c1 * b1 - c2 * b2, n);
        const k1neg = k1 > POW_2_128;
        const k2neg = k2 > POW_2_128;
        if (k1neg)
          k1 = n - k1;
        if (k2neg)
          k2 = n - k2;
        if (k1 > POW_2_128 || k2 > POW_2_128) {
          throw new Error("splitScalar: Endomorphism failed, k=" + k);
        }
        return { k1neg, k1, k2neg, k2 };
      }
    }
  }, sha256);
  var _0n5 = BigInt(0);
  var fe = (x) => typeof x === "bigint" && _0n5 < x && x < secp256k1P;
  var ge = (x) => typeof x === "bigint" && _0n5 < x && x < secp256k1N;
  var TAGGED_HASH_PREFIXES = {};
  function taggedHash(tag, ...messages) {
    let tagP = TAGGED_HASH_PREFIXES[tag];
    if (tagP === void 0) {
      const tagH = sha256(Uint8Array.from(tag, (c) => c.charCodeAt(0)));
      tagP = concatBytes2(tagH, tagH);
      TAGGED_HASH_PREFIXES[tag] = tagP;
    }
    return sha256(concatBytes2(tagP, ...messages));
  }
  var pointToBytes = (point) => point.toRawBytes(true).slice(1);
  var numTo32b = (n) => numberToBytesBE(n, 32);
  var modP = (x) => mod(x, secp256k1P);
  var modN = (x) => mod(x, secp256k1N);
  var Point = secp256k1.ProjectivePoint;
  var GmulAdd = (Q, a, b) => Point.BASE.multiplyAndAddUnsafe(Q, a, b);
  function schnorrGetExtPubKey(priv) {
    let d_ = secp256k1.utils.normPrivateKeyToScalar(priv);
    let p = Point.fromPrivateKey(d_);
    const scalar = p.hasEvenY() ? d_ : modN(-d_);
    return { scalar, bytes: pointToBytes(p) };
  }
  function lift_x(x) {
    if (!fe(x))
      throw new Error("bad x: need 0 < x < p");
    const xx = modP(x * x);
    const c = modP(xx * x + BigInt(7));
    let y = sqrtMod(c);
    if (y % _2n4 !== _0n5)
      y = modP(-y);
    const p = new Point(x, y, _1n5);
    p.assertValidity();
    return p;
  }
  function challenge(...args) {
    return modN(bytesToNumberBE(taggedHash("BIP0340/challenge", ...args)));
  }
  function schnorrGetPublicKey(privateKey) {
    return schnorrGetExtPubKey(privateKey).bytes;
  }
  function schnorrSign(message, privateKey, auxRand = randomBytes(32)) {
    const m = ensureBytes("message", message);
    const { bytes: px, scalar: d4 } = schnorrGetExtPubKey(privateKey);
    const a = ensureBytes("auxRand", auxRand, 32);
    const t = numTo32b(d4 ^ bytesToNumberBE(taggedHash("BIP0340/aux", a)));
    const rand = taggedHash("BIP0340/nonce", t, px, m);
    const k_ = modN(bytesToNumberBE(rand));
    if (k_ === _0n5)
      throw new Error("sign failed: k is zero");
    const { bytes: rx, scalar: k } = schnorrGetExtPubKey(k_);
    const e = challenge(rx, px, m);
    const sig = new Uint8Array(64);
    sig.set(rx, 0);
    sig.set(numTo32b(modN(k + e * d4)), 32);
    if (!schnorrVerify(sig, m, px))
      throw new Error("sign: Invalid signature produced");
    return sig;
  }
  function schnorrVerify(signature, message, publicKey) {
    const sig = ensureBytes("signature", signature, 64);
    const m = ensureBytes("message", message);
    const pub = ensureBytes("publicKey", publicKey, 32);
    try {
      const P = lift_x(bytesToNumberBE(pub));
      const r = bytesToNumberBE(sig.subarray(0, 32));
      if (!fe(r))
        return false;
      const s = bytesToNumberBE(sig.subarray(32, 64));
      if (!ge(s))
        return false;
      const e = challenge(numTo32b(r), pointToBytes(P), m);
      const R = GmulAdd(P, s, modN(-e));
      if (!R || !R.hasEvenY() || R.toAffine().x !== r)
        return false;
      return true;
    } catch (error) {
      return false;
    }
  }
  var schnorr = /* @__PURE__ */ (() => ({
    getPublicKey: schnorrGetPublicKey,
    sign: schnorrSign,
    verify: schnorrVerify,
    utils: {
      randomPrivateKey: secp256k1.utils.randomPrivateKey,
      lift_x,
      pointToBytes,
      numberToBytesBE,
      bytesToNumberBE,
      taggedHash,
      mod
    }
  }))();

  // node_modules/nostr-tools/node_modules/@noble/hashes/esm/crypto.js
  var crypto3 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;

  // node_modules/nostr-tools/node_modules/@noble/hashes/esm/utils.js
  var u8a3 = (a) => a instanceof Uint8Array;
  var createView2 = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
  var rotr2 = (word, shift) => word << 32 - shift | word >>> shift;
  var isLE2 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
  if (!isLE2)
    throw new Error("Non little-endian hardware is not supported");
  var hexes2 = Array.from({ length: 256 }, (v, i2) => i2.toString(16).padStart(2, "0"));
  function bytesToHex2(bytes4) {
    if (!u8a3(bytes4))
      throw new Error("Uint8Array expected");
    let hex2 = "";
    for (let i2 = 0; i2 < bytes4.length; i2++) {
      hex2 += hexes2[bytes4[i2]];
    }
    return hex2;
  }
  function hexToBytes2(hex2) {
    if (typeof hex2 !== "string")
      throw new Error("hex string expected, got " + typeof hex2);
    const len = hex2.length;
    if (len % 2)
      throw new Error("padded hex string expected, got unpadded hex of length " + len);
    const array = new Uint8Array(len / 2);
    for (let i2 = 0; i2 < array.length; i2++) {
      const j = i2 * 2;
      const hexByte = hex2.slice(j, j + 2);
      const byte = Number.parseInt(hexByte, 16);
      if (Number.isNaN(byte) || byte < 0)
        throw new Error("Invalid byte sequence");
      array[i2] = byte;
    }
    return array;
  }
  function utf8ToBytes3(str) {
    if (typeof str !== "string")
      throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function toBytes2(data) {
    if (typeof data === "string")
      data = utf8ToBytes3(data);
    if (!u8a3(data))
      throw new Error(`expected Uint8Array, got ${typeof data}`);
    return data;
  }
  function concatBytes3(...arrays) {
    const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
    let pad2 = 0;
    arrays.forEach((a) => {
      if (!u8a3(a))
        throw new Error("Uint8Array expected");
      r.set(a, pad2);
      pad2 += a.length;
    });
    return r;
  }
  var Hash2 = class {
    // Safe version that clones internal state
    clone() {
      return this._cloneInto();
    }
  };
  function wrapConstructor2(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
  }
  function randomBytes2(bytesLength = 32) {
    if (crypto3 && typeof crypto3.getRandomValues === "function") {
      return crypto3.getRandomValues(new Uint8Array(bytesLength));
    }
    throw new Error("crypto.getRandomValues must be defined");
  }

  // node_modules/nostr-tools/node_modules/@noble/hashes/esm/_assert.js
  function number2(n) {
    if (!Number.isSafeInteger(n) || n < 0)
      throw new Error(`Wrong positive integer: ${n}`);
  }
  function bool(b) {
    if (typeof b !== "boolean")
      throw new Error(`Expected boolean, not ${b}`);
  }
  function bytes2(b, ...lengths) {
    if (!(b instanceof Uint8Array))
      throw new Error("Expected Uint8Array");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
  }
  function hash2(hash3) {
    if (typeof hash3 !== "function" || typeof hash3.create !== "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    number2(hash3.outputLen);
    number2(hash3.blockLen);
  }
  function exists2(instance, checkFinished = true) {
    if (instance.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function output2(out, instance) {
    bytes2(out);
    const min = instance.outputLen;
    if (out.length < min) {
      throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
  }
  var assert = {
    number: number2,
    bool,
    bytes: bytes2,
    hash: hash2,
    exists: exists2,
    output: output2
  };
  var assert_default = assert;

  // node_modules/nostr-tools/node_modules/@noble/hashes/esm/_sha2.js
  function setBigUint642(view, byteOffset, value, isLE4) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE4);
    const _32n = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE4 ? 4 : 0;
    const l = isLE4 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE4);
    view.setUint32(byteOffset + l, wl, isLE4);
  }
  var SHA22 = class extends Hash2 {
    constructor(blockLen, outputLen, padOffset, isLE4) {
      super();
      this.blockLen = blockLen;
      this.outputLen = outputLen;
      this.padOffset = padOffset;
      this.isLE = isLE4;
      this.finished = false;
      this.length = 0;
      this.pos = 0;
      this.destroyed = false;
      this.buffer = new Uint8Array(blockLen);
      this.view = createView2(this.buffer);
    }
    update(data) {
      assert_default.exists(this);
      const { view, buffer, blockLen } = this;
      data = toBytes2(data);
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        if (take === blockLen) {
          const dataView = createView2(data);
          for (; blockLen <= len - pos; pos += blockLen)
            this.process(dataView, pos);
          continue;
        }
        buffer.set(data.subarray(pos, pos + take), this.pos);
        this.pos += take;
        pos += take;
        if (this.pos === blockLen) {
          this.process(view, 0);
          this.pos = 0;
        }
      }
      this.length += data.length;
      this.roundClean();
      return this;
    }
    digestInto(out) {
      assert_default.exists(this);
      assert_default.output(out, this);
      this.finished = true;
      const { buffer, view, blockLen, isLE: isLE4 } = this;
      let { pos } = this;
      buffer[pos++] = 128;
      this.buffer.subarray(pos).fill(0);
      if (this.padOffset > blockLen - pos) {
        this.process(view, 0);
        pos = 0;
      }
      for (let i2 = pos; i2 < blockLen; i2++)
        buffer[i2] = 0;
      setBigUint642(view, blockLen - 8, BigInt(this.length * 8), isLE4);
      this.process(view, 0);
      const oview = createView2(out);
      const len = this.outputLen;
      if (len % 4)
        throw new Error("_sha2: outputLen should be aligned to 32bit");
      const outLen = len / 4;
      const state = this.get();
      if (outLen > state.length)
        throw new Error("_sha2: outputLen bigger than state");
      for (let i2 = 0; i2 < outLen; i2++)
        oview.setUint32(4 * i2, state[i2], isLE4);
    }
    digest() {
      const { buffer, outputLen } = this;
      this.digestInto(buffer);
      const res = buffer.slice(0, outputLen);
      this.destroy();
      return res;
    }
    _cloneInto(to) {
      to || (to = new this.constructor());
      to.set(...this.get());
      const { blockLen, buffer, length, finished, destroyed, pos } = this;
      to.length = length;
      to.pos = pos;
      to.finished = finished;
      to.destroyed = destroyed;
      if (length % blockLen)
        to.buffer.set(buffer);
      return to;
    }
  };

  // node_modules/nostr-tools/node_modules/@noble/hashes/esm/sha256.js
  var Chi2 = (a, b, c) => a & b ^ ~a & c;
  var Maj2 = (a, b, c) => a & b ^ a & c ^ b & c;
  var SHA256_K2 = new Uint32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  var IV2 = new Uint32Array([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ]);
  var SHA256_W2 = new Uint32Array(64);
  var SHA2562 = class extends SHA22 {
    constructor() {
      super(64, 32, 8, false);
      this.A = IV2[0] | 0;
      this.B = IV2[1] | 0;
      this.C = IV2[2] | 0;
      this.D = IV2[3] | 0;
      this.E = IV2[4] | 0;
      this.F = IV2[5] | 0;
      this.G = IV2[6] | 0;
      this.H = IV2[7] | 0;
    }
    get() {
      const { A, B, C, D, E, F, G, H } = this;
      return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
      this.E = E | 0;
      this.F = F | 0;
      this.G = G | 0;
      this.H = H | 0;
    }
    process(view, offset) {
      for (let i2 = 0; i2 < 16; i2++, offset += 4)
        SHA256_W2[i2] = view.getUint32(offset, false);
      for (let i2 = 16; i2 < 64; i2++) {
        const W15 = SHA256_W2[i2 - 15];
        const W2 = SHA256_W2[i2 - 2];
        const s0 = rotr2(W15, 7) ^ rotr2(W15, 18) ^ W15 >>> 3;
        const s1 = rotr2(W2, 17) ^ rotr2(W2, 19) ^ W2 >>> 10;
        SHA256_W2[i2] = s1 + SHA256_W2[i2 - 7] + s0 + SHA256_W2[i2 - 16] | 0;
      }
      let { A, B, C, D, E, F, G, H } = this;
      for (let i2 = 0; i2 < 64; i2++) {
        const sigma1 = rotr2(E, 6) ^ rotr2(E, 11) ^ rotr2(E, 25);
        const T1 = H + sigma1 + Chi2(E, F, G) + SHA256_K2[i2] + SHA256_W2[i2] | 0;
        const sigma0 = rotr2(A, 2) ^ rotr2(A, 13) ^ rotr2(A, 22);
        const T2 = sigma0 + Maj2(A, B, C) | 0;
        H = G;
        G = F;
        F = E;
        E = D + T1 | 0;
        D = C;
        C = B;
        B = A;
        A = T1 + T2 | 0;
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      E = E + this.E | 0;
      F = F + this.F | 0;
      G = G + this.G | 0;
      H = H + this.H | 0;
      this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
      SHA256_W2.fill(0);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0, 0, 0, 0);
      this.buffer.fill(0);
    }
  };
  var SHA224 = class extends SHA2562 {
    constructor() {
      super();
      this.A = 3238371032 | 0;
      this.B = 914150663 | 0;
      this.C = 812702999 | 0;
      this.D = 4144912697 | 0;
      this.E = 4290775857 | 0;
      this.F = 1750603025 | 0;
      this.G = 1694076839 | 0;
      this.H = 3204075428 | 0;
      this.outputLen = 28;
    }
  };
  var sha2562 = wrapConstructor2(() => new SHA2562());
  var sha224 = wrapConstructor2(() => new SHA224());

  // node_modules/nostr-tools/node_modules/@scure/base/lib/esm/index.js
  function assertNumber(n) {
    if (!Number.isSafeInteger(n))
      throw new Error(`Wrong integer: ${n}`);
  }
  function chain(...args) {
    const wrap = (a, b) => (c) => a(b(c));
    const encode2 = Array.from(args).reverse().reduce((acc, i2) => acc ? wrap(acc, i2.encode) : i2.encode, void 0);
    const decode3 = args.reduce((acc, i2) => acc ? wrap(acc, i2.decode) : i2.decode, void 0);
    return { encode: encode2, decode: decode3 };
  }
  function alphabet(alphabet3) {
    return {
      encode: (digits) => {
        if (!Array.isArray(digits) || digits.length && typeof digits[0] !== "number")
          throw new Error("alphabet.encode input should be an array of numbers");
        return digits.map((i2) => {
          assertNumber(i2);
          if (i2 < 0 || i2 >= alphabet3.length)
            throw new Error(`Digit index outside alphabet: ${i2} (alphabet: ${alphabet3.length})`);
          return alphabet3[i2];
        });
      },
      decode: (input) => {
        if (!Array.isArray(input) || input.length && typeof input[0] !== "string")
          throw new Error("alphabet.decode input should be array of strings");
        return input.map((letter) => {
          if (typeof letter !== "string")
            throw new Error(`alphabet.decode: not string element=${letter}`);
          const index = alphabet3.indexOf(letter);
          if (index === -1)
            throw new Error(`Unknown letter: "${letter}". Allowed: ${alphabet3}`);
          return index;
        });
      }
    };
  }
  function join(separator = "") {
    if (typeof separator !== "string")
      throw new Error("join separator should be string");
    return {
      encode: (from) => {
        if (!Array.isArray(from) || from.length && typeof from[0] !== "string")
          throw new Error("join.encode input should be array of strings");
        for (let i2 of from)
          if (typeof i2 !== "string")
            throw new Error(`join.encode: non-string input=${i2}`);
        return from.join(separator);
      },
      decode: (to) => {
        if (typeof to !== "string")
          throw new Error("join.decode input should be string");
        return to.split(separator);
      }
    };
  }
  function padding(bits, chr = "=") {
    assertNumber(bits);
    if (typeof chr !== "string")
      throw new Error("padding chr should be string");
    return {
      encode(data) {
        if (!Array.isArray(data) || data.length && typeof data[0] !== "string")
          throw new Error("padding.encode input should be array of strings");
        for (let i2 of data)
          if (typeof i2 !== "string")
            throw new Error(`padding.encode: non-string input=${i2}`);
        while (data.length * bits % 8)
          data.push(chr);
        return data;
      },
      decode(input) {
        if (!Array.isArray(input) || input.length && typeof input[0] !== "string")
          throw new Error("padding.encode input should be array of strings");
        for (let i2 of input)
          if (typeof i2 !== "string")
            throw new Error(`padding.decode: non-string input=${i2}`);
        let end = input.length;
        if (end * bits % 8)
          throw new Error("Invalid padding: string should have whole number of bytes");
        for (; end > 0 && input[end - 1] === chr; end--) {
          if (!((end - 1) * bits % 8))
            throw new Error("Invalid padding: string has too much padding");
        }
        return input.slice(0, end);
      }
    };
  }
  function normalize(fn) {
    if (typeof fn !== "function")
      throw new Error("normalize fn should be function");
    return { encode: (from) => from, decode: (to) => fn(to) };
  }
  function convertRadix(data, from, to) {
    if (from < 2)
      throw new Error(`convertRadix: wrong from=${from}, base cannot be less than 2`);
    if (to < 2)
      throw new Error(`convertRadix: wrong to=${to}, base cannot be less than 2`);
    if (!Array.isArray(data))
      throw new Error("convertRadix: data should be array");
    if (!data.length)
      return [];
    let pos = 0;
    const res = [];
    const digits = Array.from(data);
    digits.forEach((d4) => {
      assertNumber(d4);
      if (d4 < 0 || d4 >= from)
        throw new Error(`Wrong integer: ${d4}`);
    });
    while (true) {
      let carry = 0;
      let done = true;
      for (let i2 = pos; i2 < digits.length; i2++) {
        const digit = digits[i2];
        const digitBase = from * carry + digit;
        if (!Number.isSafeInteger(digitBase) || from * carry / from !== carry || digitBase - digit !== from * carry) {
          throw new Error("convertRadix: carry overflow");
        }
        carry = digitBase % to;
        digits[i2] = Math.floor(digitBase / to);
        if (!Number.isSafeInteger(digits[i2]) || digits[i2] * to + carry !== digitBase)
          throw new Error("convertRadix: carry overflow");
        if (!done)
          continue;
        else if (!digits[i2])
          pos = i2;
        else
          done = false;
      }
      res.push(carry);
      if (done)
        break;
    }
    for (let i2 = 0; i2 < data.length - 1 && data[i2] === 0; i2++)
      res.push(0);
    return res.reverse();
  }
  var gcd = (a, b) => !b ? a : gcd(b, a % b);
  var radix2carry = (from, to) => from + (to - gcd(from, to));
  function convertRadix2(data, from, to, padding2) {
    if (!Array.isArray(data))
      throw new Error("convertRadix2: data should be array");
    if (from <= 0 || from > 32)
      throw new Error(`convertRadix2: wrong from=${from}`);
    if (to <= 0 || to > 32)
      throw new Error(`convertRadix2: wrong to=${to}`);
    if (radix2carry(from, to) > 32) {
      throw new Error(`convertRadix2: carry overflow from=${from} to=${to} carryBits=${radix2carry(from, to)}`);
    }
    let carry = 0;
    let pos = 0;
    const mask = 2 ** to - 1;
    const res = [];
    for (const n of data) {
      assertNumber(n);
      if (n >= 2 ** from)
        throw new Error(`convertRadix2: invalid data word=${n} from=${from}`);
      carry = carry << from | n;
      if (pos + from > 32)
        throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from}`);
      pos += from;
      for (; pos >= to; pos -= to)
        res.push((carry >> pos - to & mask) >>> 0);
      carry &= 2 ** pos - 1;
    }
    carry = carry << to - pos & mask;
    if (!padding2 && pos >= from)
      throw new Error("Excess padding");
    if (!padding2 && carry)
      throw new Error(`Non-zero padding: ${carry}`);
    if (padding2 && pos > 0)
      res.push(carry >>> 0);
    return res;
  }
  function radix(num2) {
    assertNumber(num2);
    return {
      encode: (bytes4) => {
        if (!(bytes4 instanceof Uint8Array))
          throw new Error("radix.encode input should be Uint8Array");
        return convertRadix(Array.from(bytes4), 2 ** 8, num2);
      },
      decode: (digits) => {
        if (!Array.isArray(digits) || digits.length && typeof digits[0] !== "number")
          throw new Error("radix.decode input should be array of strings");
        return Uint8Array.from(convertRadix(digits, num2, 2 ** 8));
      }
    };
  }
  function radix2(bits, revPadding = false) {
    assertNumber(bits);
    if (bits <= 0 || bits > 32)
      throw new Error("radix2: bits should be in (0..32]");
    if (radix2carry(8, bits) > 32 || radix2carry(bits, 8) > 32)
      throw new Error("radix2: carry overflow");
    return {
      encode: (bytes4) => {
        if (!(bytes4 instanceof Uint8Array))
          throw new Error("radix2.encode input should be Uint8Array");
        return convertRadix2(Array.from(bytes4), 8, bits, !revPadding);
      },
      decode: (digits) => {
        if (!Array.isArray(digits) || digits.length && typeof digits[0] !== "number")
          throw new Error("radix2.decode input should be array of strings");
        return Uint8Array.from(convertRadix2(digits, bits, 8, revPadding));
      }
    };
  }
  function unsafeWrapper(fn) {
    if (typeof fn !== "function")
      throw new Error("unsafeWrapper fn should be function");
    return function(...args) {
      try {
        return fn.apply(null, args);
      } catch (e) {
      }
    };
  }
  var base16 = chain(radix2(4), alphabet("0123456789ABCDEF"), join(""));
  var base32 = chain(radix2(5), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), padding(5), join(""));
  var base32hex = chain(radix2(5), alphabet("0123456789ABCDEFGHIJKLMNOPQRSTUV"), padding(5), join(""));
  var base32crockford = chain(radix2(5), alphabet("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), join(""), normalize((s) => s.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")));
  var base64 = chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), padding(6), join(""));
  var base64url = chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), padding(6), join(""));
  var genBase58 = (abc) => chain(radix(58), alphabet(abc), join(""));
  var base58 = genBase58("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
  var base58flickr = genBase58("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ");
  var base58xrp = genBase58("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
  var XMR_BLOCK_LEN = [0, 2, 3, 5, 6, 7, 9, 10, 11];
  var base58xmr = {
    encode(data) {
      let res = "";
      for (let i2 = 0; i2 < data.length; i2 += 8) {
        const block = data.subarray(i2, i2 + 8);
        res += base58.encode(block).padStart(XMR_BLOCK_LEN[block.length], "1");
      }
      return res;
    },
    decode(str) {
      let res = [];
      for (let i2 = 0; i2 < str.length; i2 += 11) {
        const slice = str.slice(i2, i2 + 11);
        const blockLen = XMR_BLOCK_LEN.indexOf(slice.length);
        const block = base58.decode(slice);
        for (let j = 0; j < block.length - blockLen; j++) {
          if (block[j] !== 0)
            throw new Error("base58xmr: wrong padding");
        }
        res = res.concat(Array.from(block.slice(block.length - blockLen)));
      }
      return Uint8Array.from(res);
    }
  };
  var BECH_ALPHABET = chain(alphabet("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), join(""));
  var POLYMOD_GENERATORS = [996825010, 642813549, 513874426, 1027748829, 705979059];
  function bech32Polymod(pre) {
    const b = pre >> 25;
    let chk = (pre & 33554431) << 5;
    for (let i2 = 0; i2 < POLYMOD_GENERATORS.length; i2++) {
      if ((b >> i2 & 1) === 1)
        chk ^= POLYMOD_GENERATORS[i2];
    }
    return chk;
  }
  function bechChecksum(prefix, words, encodingConst = 1) {
    const len = prefix.length;
    let chk = 1;
    for (let i2 = 0; i2 < len; i2++) {
      const c = prefix.charCodeAt(i2);
      if (c < 33 || c > 126)
        throw new Error(`Invalid prefix (${prefix})`);
      chk = bech32Polymod(chk) ^ c >> 5;
    }
    chk = bech32Polymod(chk);
    for (let i2 = 0; i2 < len; i2++)
      chk = bech32Polymod(chk) ^ prefix.charCodeAt(i2) & 31;
    for (let v of words)
      chk = bech32Polymod(chk) ^ v;
    for (let i2 = 0; i2 < 6; i2++)
      chk = bech32Polymod(chk);
    chk ^= encodingConst;
    return BECH_ALPHABET.encode(convertRadix2([chk % 2 ** 30], 30, 5, false));
  }
  function genBech32(encoding) {
    const ENCODING_CONST = encoding === "bech32" ? 1 : 734539939;
    const _words = radix2(5);
    const fromWords = _words.decode;
    const toWords = _words.encode;
    const fromWordsUnsafe = unsafeWrapper(fromWords);
    function encode2(prefix, words, limit2 = 90) {
      if (typeof prefix !== "string")
        throw new Error(`bech32.encode prefix should be string, not ${typeof prefix}`);
      if (!Array.isArray(words) || words.length && typeof words[0] !== "number")
        throw new Error(`bech32.encode words should be array of numbers, not ${typeof words}`);
      const actualLength = prefix.length + 7 + words.length;
      if (limit2 !== false && actualLength > limit2)
        throw new TypeError(`Length ${actualLength} exceeds limit ${limit2}`);
      prefix = prefix.toLowerCase();
      return `${prefix}1${BECH_ALPHABET.encode(words)}${bechChecksum(prefix, words, ENCODING_CONST)}`;
    }
    function decode3(str, limit2 = 90) {
      if (typeof str !== "string")
        throw new Error(`bech32.decode input should be string, not ${typeof str}`);
      if (str.length < 8 || limit2 !== false && str.length > limit2)
        throw new TypeError(`Wrong string length: ${str.length} (${str}). Expected (8..${limit2})`);
      const lowered = str.toLowerCase();
      if (str !== lowered && str !== str.toUpperCase())
        throw new Error(`String must be lowercase or uppercase`);
      str = lowered;
      const sepIndex = str.lastIndexOf("1");
      if (sepIndex === 0 || sepIndex === -1)
        throw new Error(`Letter "1" must be present between prefix and data only`);
      const prefix = str.slice(0, sepIndex);
      const _words2 = str.slice(sepIndex + 1);
      if (_words2.length < 6)
        throw new Error("Data must be at least 6 characters long");
      const words = BECH_ALPHABET.decode(_words2).slice(0, -6);
      const sum = bechChecksum(prefix, words, ENCODING_CONST);
      if (!_words2.endsWith(sum))
        throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
      return { prefix, words };
    }
    const decodeUnsafe = unsafeWrapper(decode3);
    function decodeToBytes(str) {
      const { prefix, words } = decode3(str, false);
      return { prefix, words, bytes: fromWords(words) };
    }
    return { encode: encode2, decode: decode3, decodeToBytes, decodeUnsafe, fromWords, fromWordsUnsafe, toWords };
  }
  var bech32 = genBech32("bech32");
  var bech32m = genBech32("bech32m");
  var utf8 = {
    encode: (data) => new TextDecoder().decode(data),
    decode: (str) => new TextEncoder().encode(str)
  };
  var hex = chain(radix2(4), alphabet("0123456789abcdef"), join(""), normalize((s) => {
    if (typeof s !== "string" || s.length % 2)
      throw new TypeError(`hex.decode: expected string, got ${typeof s} with length ${s.length}`);
    return s.toLowerCase();
  }));
  var CODERS = {
    utf8,
    hex,
    base16,
    base32,
    base64,
    base64url,
    base58,
    base58xmr
  };
  var coderTypeError = `Invalid encoding type. Available types: ${Object.keys(CODERS).join(", ")}`;

  // node_modules/@noble/ciphers/esm/_assert.js
  function number3(n) {
    if (!Number.isSafeInteger(n) || n < 0)
      throw new Error(`positive integer expected, not ${n}`);
  }
  function bool2(b) {
    if (typeof b !== "boolean")
      throw new Error(`boolean expected, not ${b}`);
  }
  function isBytes(a) {
    return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
  }
  function bytes3(b, ...lengths) {
    if (!isBytes(b))
      throw new Error("Uint8Array expected");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
  }
  function exists3(instance, checkFinished = true) {
    if (instance.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function output3(out, instance) {
    bytes3(out);
    const min = instance.outputLen;
    if (out.length < min) {
      throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
  }

  // node_modules/@noble/ciphers/esm/utils.js
  var u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
  var u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
  var createView3 = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
  var isLE3 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
  if (!isLE3)
    throw new Error("Non little-endian hardware is not supported");
  function utf8ToBytes4(str) {
    if (typeof str !== "string")
      throw new Error(`string expected, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function toBytes3(data) {
    if (typeof data === "string")
      data = utf8ToBytes4(data);
    else if (isBytes(data))
      data = data.slice();
    else
      throw new Error(`Uint8Array expected, got ${typeof data}`);
    return data;
  }
  function checkOpts(defaults2, opts) {
    if (opts == null || typeof opts !== "object")
      throw new Error("options must be defined");
    const merged = Object.assign(defaults2, opts);
    return merged;
  }
  function equalBytes2(a, b) {
    if (a.length !== b.length)
      return false;
    let diff = 0;
    for (let i2 = 0; i2 < a.length; i2++)
      diff |= a[i2] ^ b[i2];
    return diff === 0;
  }
  var wrapCipher = /* @__NO_SIDE_EFFECTS__ */ (params, c) => {
    Object.assign(c, params);
    return c;
  };
  function setBigUint643(view, byteOffset, value, isLE4) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE4);
    const _32n = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE4 ? 4 : 0;
    const l = isLE4 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE4);
    view.setUint32(byteOffset + l, wl, isLE4);
  }

  // node_modules/@noble/ciphers/esm/_polyval.js
  var BLOCK_SIZE = 16;
  var ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
  var ZEROS32 = u32(ZEROS16);
  var POLY = 225;
  var mul2 = (s0, s1, s2, s3) => {
    const hiBit = s3 & 1;
    return {
      s3: s2 << 31 | s3 >>> 1,
      s2: s1 << 31 | s2 >>> 1,
      s1: s0 << 31 | s1 >>> 1,
      s0: s0 >>> 1 ^ POLY << 24 & -(hiBit & 1)
      // reduce % poly
    };
  };
  var swapLE = (n) => (n >>> 0 & 255) << 24 | (n >>> 8 & 255) << 16 | (n >>> 16 & 255) << 8 | n >>> 24 & 255 | 0;
  function _toGHASHKey(k) {
    k.reverse();
    const hiBit = k[15] & 1;
    let carry = 0;
    for (let i2 = 0; i2 < k.length; i2++) {
      const t = k[i2];
      k[i2] = t >>> 1 | carry;
      carry = (t & 1) << 7;
    }
    k[0] ^= -hiBit & 225;
    return k;
  }
  var estimateWindow = (bytes4) => {
    if (bytes4 > 64 * 1024)
      return 8;
    if (bytes4 > 1024)
      return 4;
    return 2;
  };
  var GHASH = class {
    // We select bits per window adaptively based on expectedLength
    constructor(key, expectedLength) {
      this.blockLen = BLOCK_SIZE;
      this.outputLen = BLOCK_SIZE;
      this.s0 = 0;
      this.s1 = 0;
      this.s2 = 0;
      this.s3 = 0;
      this.finished = false;
      key = toBytes3(key);
      bytes3(key, 16);
      const kView = createView3(key);
      let k0 = kView.getUint32(0, false);
      let k1 = kView.getUint32(4, false);
      let k2 = kView.getUint32(8, false);
      let k3 = kView.getUint32(12, false);
      const doubles = [];
      for (let i2 = 0; i2 < 128; i2++) {
        doubles.push({ s0: swapLE(k0), s1: swapLE(k1), s2: swapLE(k2), s3: swapLE(k3) });
        ({ s0: k0, s1: k1, s2: k2, s3: k3 } = mul2(k0, k1, k2, k3));
      }
      const W = estimateWindow(expectedLength || 1024);
      if (![1, 2, 4, 8].includes(W))
        throw new Error(`ghash: wrong window size=${W}, should be 2, 4 or 8`);
      this.W = W;
      const bits = 128;
      const windows = bits / W;
      const windowSize = this.windowSize = 2 ** W;
      const items = [];
      for (let w = 0; w < windows; w++) {
        for (let byte = 0; byte < windowSize; byte++) {
          let s0 = 0, s1 = 0, s2 = 0, s3 = 0;
          for (let j = 0; j < W; j++) {
            const bit = byte >>> W - j - 1 & 1;
            if (!bit)
              continue;
            const { s0: d0, s1: d1, s2: d22, s3: d32 } = doubles[W * w + j];
            s0 ^= d0, s1 ^= d1, s2 ^= d22, s3 ^= d32;
          }
          items.push({ s0, s1, s2, s3 });
        }
      }
      this.t = items;
    }
    _updateBlock(s0, s1, s2, s3) {
      s0 ^= this.s0, s1 ^= this.s1, s2 ^= this.s2, s3 ^= this.s3;
      const { W, t, windowSize } = this;
      let o0 = 0, o1 = 0, o2 = 0, o3 = 0;
      const mask = (1 << W) - 1;
      let w = 0;
      for (const num2 of [s0, s1, s2, s3]) {
        for (let bytePos = 0; bytePos < 4; bytePos++) {
          const byte = num2 >>> 8 * bytePos & 255;
          for (let bitPos = 8 / W - 1; bitPos >= 0; bitPos--) {
            const bit = byte >>> W * bitPos & mask;
            const { s0: e0, s1: e1, s2: e2, s3: e3 } = t[w * windowSize + bit];
            o0 ^= e0, o1 ^= e1, o2 ^= e2, o3 ^= e3;
            w += 1;
          }
        }
      }
      this.s0 = o0;
      this.s1 = o1;
      this.s2 = o2;
      this.s3 = o3;
    }
    update(data) {
      data = toBytes3(data);
      exists3(this);
      const b32 = u32(data);
      const blocks = Math.floor(data.length / BLOCK_SIZE);
      const left = data.length % BLOCK_SIZE;
      for (let i2 = 0; i2 < blocks; i2++) {
        this._updateBlock(b32[i2 * 4 + 0], b32[i2 * 4 + 1], b32[i2 * 4 + 2], b32[i2 * 4 + 3]);
      }
      if (left) {
        ZEROS16.set(data.subarray(blocks * BLOCK_SIZE));
        this._updateBlock(ZEROS32[0], ZEROS32[1], ZEROS32[2], ZEROS32[3]);
        ZEROS32.fill(0);
      }
      return this;
    }
    destroy() {
      const { t } = this;
      for (const elm of t) {
        elm.s0 = 0, elm.s1 = 0, elm.s2 = 0, elm.s3 = 0;
      }
    }
    digestInto(out) {
      exists3(this);
      output3(out, this);
      this.finished = true;
      const { s0, s1, s2, s3 } = this;
      const o32 = u32(out);
      o32[0] = s0;
      o32[1] = s1;
      o32[2] = s2;
      o32[3] = s3;
      return out;
    }
    digest() {
      const res = new Uint8Array(BLOCK_SIZE);
      this.digestInto(res);
      this.destroy();
      return res;
    }
  };
  var Polyval = class extends GHASH {
    constructor(key, expectedLength) {
      key = toBytes3(key);
      const ghKey = _toGHASHKey(key.slice());
      super(ghKey, expectedLength);
      ghKey.fill(0);
    }
    update(data) {
      data = toBytes3(data);
      exists3(this);
      const b32 = u32(data);
      const left = data.length % BLOCK_SIZE;
      const blocks = Math.floor(data.length / BLOCK_SIZE);
      for (let i2 = 0; i2 < blocks; i2++) {
        this._updateBlock(swapLE(b32[i2 * 4 + 3]), swapLE(b32[i2 * 4 + 2]), swapLE(b32[i2 * 4 + 1]), swapLE(b32[i2 * 4 + 0]));
      }
      if (left) {
        ZEROS16.set(data.subarray(blocks * BLOCK_SIZE));
        this._updateBlock(swapLE(ZEROS32[3]), swapLE(ZEROS32[2]), swapLE(ZEROS32[1]), swapLE(ZEROS32[0]));
        ZEROS32.fill(0);
      }
      return this;
    }
    digestInto(out) {
      exists3(this);
      output3(out, this);
      this.finished = true;
      const { s0, s1, s2, s3 } = this;
      const o32 = u32(out);
      o32[0] = s0;
      o32[1] = s1;
      o32[2] = s2;
      o32[3] = s3;
      return out.reverse();
    }
  };
  function wrapConstructorWithKey(hashCons) {
    const hashC = (msg, key) => hashCons(key, msg.length).update(toBytes3(msg)).digest();
    const tmp = hashCons(new Uint8Array(16), 0);
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (key, expectedLength) => hashCons(key, expectedLength);
    return hashC;
  }
  var ghash = wrapConstructorWithKey((key, expectedLength) => new GHASH(key, expectedLength));
  var polyval = wrapConstructorWithKey((key, expectedLength) => new Polyval(key, expectedLength));

  // node_modules/@noble/ciphers/esm/aes.js
  var BLOCK_SIZE2 = 16;
  var BLOCK_SIZE32 = 4;
  var EMPTY_BLOCK = new Uint8Array(BLOCK_SIZE2);
  var POLY2 = 283;
  function mul22(n) {
    return n << 1 ^ POLY2 & -(n >> 7);
  }
  function mul(a, b) {
    let res = 0;
    for (; b > 0; b >>= 1) {
      res ^= a & -(b & 1);
      a = mul22(a);
    }
    return res;
  }
  var sbox = /* @__PURE__ */ (() => {
    let t = new Uint8Array(256);
    for (let i2 = 0, x = 1; i2 < 256; i2++, x ^= mul22(x))
      t[i2] = x;
    const box = new Uint8Array(256);
    box[0] = 99;
    for (let i2 = 0; i2 < 255; i2++) {
      let x = t[255 - i2];
      x |= x << 8;
      box[t[i2]] = (x ^ x >> 4 ^ x >> 5 ^ x >> 6 ^ x >> 7 ^ 99) & 255;
    }
    return box;
  })();
  var invSbox = /* @__PURE__ */ sbox.map((_, j) => sbox.indexOf(j));
  var rotr32_8 = (n) => n << 24 | n >>> 8;
  var rotl32_8 = (n) => n << 8 | n >>> 24;
  function genTtable(sbox2, fn) {
    if (sbox2.length !== 256)
      throw new Error("Wrong sbox length");
    const T0 = new Uint32Array(256).map((_, j) => fn(sbox2[j]));
    const T1 = T0.map(rotl32_8);
    const T2 = T1.map(rotl32_8);
    const T3 = T2.map(rotl32_8);
    const T01 = new Uint32Array(256 * 256);
    const T23 = new Uint32Array(256 * 256);
    const sbox22 = new Uint16Array(256 * 256);
    for (let i2 = 0; i2 < 256; i2++) {
      for (let j = 0; j < 256; j++) {
        const idx = i2 * 256 + j;
        T01[idx] = T0[i2] ^ T1[j];
        T23[idx] = T2[i2] ^ T3[j];
        sbox22[idx] = sbox2[i2] << 8 | sbox2[j];
      }
    }
    return { sbox: sbox2, sbox2: sbox22, T0, T1, T2, T3, T01, T23 };
  }
  var tableEncoding = /* @__PURE__ */ genTtable(sbox, (s) => mul(s, 3) << 24 | s << 16 | s << 8 | mul(s, 2));
  var tableDecoding = /* @__PURE__ */ genTtable(invSbox, (s) => mul(s, 11) << 24 | mul(s, 13) << 16 | mul(s, 9) << 8 | mul(s, 14));
  var xPowers = /* @__PURE__ */ (() => {
    const p = new Uint8Array(16);
    for (let i2 = 0, x = 1; i2 < 16; i2++, x = mul22(x))
      p[i2] = x;
    return p;
  })();
  function expandKeyLE(key) {
    bytes3(key);
    const len = key.length;
    if (![16, 24, 32].includes(len))
      throw new Error(`aes: wrong key size: should be 16, 24 or 32, got: ${len}`);
    const { sbox2 } = tableEncoding;
    const k32 = u32(key);
    const Nk = k32.length;
    const subByte = (n) => applySbox(sbox2, n, n, n, n);
    const xk = new Uint32Array(len + 28);
    xk.set(k32);
    for (let i2 = Nk; i2 < xk.length; i2++) {
      let t = xk[i2 - 1];
      if (i2 % Nk === 0)
        t = subByte(rotr32_8(t)) ^ xPowers[i2 / Nk - 1];
      else if (Nk > 6 && i2 % Nk === 4)
        t = subByte(t);
      xk[i2] = xk[i2 - Nk] ^ t;
    }
    return xk;
  }
  function expandKeyDecLE(key) {
    const encKey = expandKeyLE(key);
    const xk = encKey.slice();
    const Nk = encKey.length;
    const { sbox2 } = tableEncoding;
    const { T0, T1, T2, T3 } = tableDecoding;
    for (let i2 = 0; i2 < Nk; i2 += 4) {
      for (let j = 0; j < 4; j++)
        xk[i2 + j] = encKey[Nk - i2 - 4 + j];
    }
    encKey.fill(0);
    for (let i2 = 4; i2 < Nk - 4; i2++) {
      const x = xk[i2];
      const w = applySbox(sbox2, x, x, x, x);
      xk[i2] = T0[w & 255] ^ T1[w >>> 8 & 255] ^ T2[w >>> 16 & 255] ^ T3[w >>> 24];
    }
    return xk;
  }
  function apply0123(T01, T23, s0, s1, s2, s3) {
    return T01[s0 << 8 & 65280 | s1 >>> 8 & 255] ^ T23[s2 >>> 8 & 65280 | s3 >>> 24 & 255];
  }
  function applySbox(sbox2, s0, s1, s2, s3) {
    return sbox2[s0 & 255 | s1 & 65280] | sbox2[s2 >>> 16 & 255 | s3 >>> 16 & 65280] << 16;
  }
  function encrypt(xk, s0, s1, s2, s3) {
    const { sbox2, T01, T23 } = tableEncoding;
    let k = 0;
    s0 ^= xk[k++], s1 ^= xk[k++], s2 ^= xk[k++], s3 ^= xk[k++];
    const rounds = xk.length / 4 - 2;
    for (let i2 = 0; i2 < rounds; i2++) {
      const t02 = xk[k++] ^ apply0123(T01, T23, s0, s1, s2, s3);
      const t12 = xk[k++] ^ apply0123(T01, T23, s1, s2, s3, s0);
      const t22 = xk[k++] ^ apply0123(T01, T23, s2, s3, s0, s1);
      const t32 = xk[k++] ^ apply0123(T01, T23, s3, s0, s1, s2);
      s0 = t02, s1 = t12, s2 = t22, s3 = t32;
    }
    const t0 = xk[k++] ^ applySbox(sbox2, s0, s1, s2, s3);
    const t1 = xk[k++] ^ applySbox(sbox2, s1, s2, s3, s0);
    const t2 = xk[k++] ^ applySbox(sbox2, s2, s3, s0, s1);
    const t3 = xk[k++] ^ applySbox(sbox2, s3, s0, s1, s2);
    return { s0: t0, s1: t1, s2: t2, s3: t3 };
  }
  function decrypt(xk, s0, s1, s2, s3) {
    const { sbox2, T01, T23 } = tableDecoding;
    let k = 0;
    s0 ^= xk[k++], s1 ^= xk[k++], s2 ^= xk[k++], s3 ^= xk[k++];
    const rounds = xk.length / 4 - 2;
    for (let i2 = 0; i2 < rounds; i2++) {
      const t02 = xk[k++] ^ apply0123(T01, T23, s0, s3, s2, s1);
      const t12 = xk[k++] ^ apply0123(T01, T23, s1, s0, s3, s2);
      const t22 = xk[k++] ^ apply0123(T01, T23, s2, s1, s0, s3);
      const t32 = xk[k++] ^ apply0123(T01, T23, s3, s2, s1, s0);
      s0 = t02, s1 = t12, s2 = t22, s3 = t32;
    }
    const t0 = xk[k++] ^ applySbox(sbox2, s0, s3, s2, s1);
    const t1 = xk[k++] ^ applySbox(sbox2, s1, s0, s3, s2);
    const t2 = xk[k++] ^ applySbox(sbox2, s2, s1, s0, s3);
    const t3 = xk[k++] ^ applySbox(sbox2, s3, s2, s1, s0);
    return { s0: t0, s1: t1, s2: t2, s3: t3 };
  }
  function getDst(len, dst) {
    if (!dst)
      return new Uint8Array(len);
    bytes3(dst);
    if (dst.length < len)
      throw new Error(`aes: wrong destination length, expected at least ${len}, got: ${dst.length}`);
    return dst;
  }
  function ctrCounter(xk, nonce, src, dst) {
    bytes3(nonce, BLOCK_SIZE2);
    bytes3(src);
    const srcLen = src.length;
    dst = getDst(srcLen, dst);
    const ctr3 = nonce;
    const c32 = u32(ctr3);
    let { s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]);
    const src32 = u32(src);
    const dst32 = u32(dst);
    for (let i2 = 0; i2 + 4 <= src32.length; i2 += 4) {
      dst32[i2 + 0] = src32[i2 + 0] ^ s0;
      dst32[i2 + 1] = src32[i2 + 1] ^ s1;
      dst32[i2 + 2] = src32[i2 + 2] ^ s2;
      dst32[i2 + 3] = src32[i2 + 3] ^ s3;
      let carry = 1;
      for (let i3 = ctr3.length - 1; i3 >= 0; i3--) {
        carry = carry + (ctr3[i3] & 255) | 0;
        ctr3[i3] = carry & 255;
        carry >>>= 8;
      }
      ({ s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]));
    }
    const start = BLOCK_SIZE2 * Math.floor(src32.length / BLOCK_SIZE32);
    if (start < srcLen) {
      const b32 = new Uint32Array([s0, s1, s2, s3]);
      const buf = u8(b32);
      for (let i2 = start, pos = 0; i2 < srcLen; i2++, pos++)
        dst[i2] = src[i2] ^ buf[pos];
    }
    return dst;
  }
  function ctr32(xk, isLE4, nonce, src, dst) {
    bytes3(nonce, BLOCK_SIZE2);
    bytes3(src);
    dst = getDst(src.length, dst);
    const ctr3 = nonce;
    const c32 = u32(ctr3);
    const view = createView3(ctr3);
    const src32 = u32(src);
    const dst32 = u32(dst);
    const ctrPos = isLE4 ? 0 : 12;
    const srcLen = src.length;
    let ctrNum = view.getUint32(ctrPos, isLE4);
    let { s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]);
    for (let i2 = 0; i2 + 4 <= src32.length; i2 += 4) {
      dst32[i2 + 0] = src32[i2 + 0] ^ s0;
      dst32[i2 + 1] = src32[i2 + 1] ^ s1;
      dst32[i2 + 2] = src32[i2 + 2] ^ s2;
      dst32[i2 + 3] = src32[i2 + 3] ^ s3;
      ctrNum = ctrNum + 1 >>> 0;
      view.setUint32(ctrPos, ctrNum, isLE4);
      ({ s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]));
    }
    const start = BLOCK_SIZE2 * Math.floor(src32.length / BLOCK_SIZE32);
    if (start < srcLen) {
      const b32 = new Uint32Array([s0, s1, s2, s3]);
      const buf = u8(b32);
      for (let i2 = start, pos = 0; i2 < srcLen; i2++, pos++)
        dst[i2] = src[i2] ^ buf[pos];
    }
    return dst;
  }
  var ctr = wrapCipher({ blockSize: 16, nonceLength: 16 }, function ctr2(key, nonce) {
    bytes3(key);
    bytes3(nonce, BLOCK_SIZE2);
    function processCtr(buf, dst) {
      const xk = expandKeyLE(key);
      const n = nonce.slice();
      const out = ctrCounter(xk, n, buf, dst);
      xk.fill(0);
      n.fill(0);
      return out;
    }
    return {
      encrypt: (plaintext, dst) => processCtr(plaintext, dst),
      decrypt: (ciphertext, dst) => processCtr(ciphertext, dst)
    };
  });
  function validateBlockDecrypt(data) {
    bytes3(data);
    if (data.length % BLOCK_SIZE2 !== 0) {
      throw new Error(`aes/(cbc-ecb).decrypt ciphertext should consist of blocks with size ${BLOCK_SIZE2}`);
    }
  }
  function validateBlockEncrypt(plaintext, pcks5, dst) {
    let outLen = plaintext.length;
    const remaining = outLen % BLOCK_SIZE2;
    if (!pcks5 && remaining !== 0)
      throw new Error("aec/(cbc-ecb): unpadded plaintext with disabled padding");
    const b = u32(plaintext);
    if (pcks5) {
      let left = BLOCK_SIZE2 - remaining;
      if (!left)
        left = BLOCK_SIZE2;
      outLen = outLen + left;
    }
    const out = getDst(outLen, dst);
    const o = u32(out);
    return { b, o, out };
  }
  function validatePCKS(data, pcks5) {
    if (!pcks5)
      return data;
    const len = data.length;
    if (!len)
      throw new Error(`aes/pcks5: empty ciphertext not allowed`);
    const lastByte = data[len - 1];
    if (lastByte <= 0 || lastByte > 16)
      throw new Error(`aes/pcks5: wrong padding byte: ${lastByte}`);
    const out = data.subarray(0, -lastByte);
    for (let i2 = 0; i2 < lastByte; i2++)
      if (data[len - i2 - 1] !== lastByte)
        throw new Error(`aes/pcks5: wrong padding`);
    return out;
  }
  function padPCKS(left) {
    const tmp = new Uint8Array(16);
    const tmp32 = u32(tmp);
    tmp.set(left);
    const paddingByte = BLOCK_SIZE2 - left.length;
    for (let i2 = BLOCK_SIZE2 - paddingByte; i2 < BLOCK_SIZE2; i2++)
      tmp[i2] = paddingByte;
    return tmp32;
  }
  var ecb = wrapCipher({ blockSize: 16 }, function ecb2(key, opts = {}) {
    bytes3(key);
    const pcks5 = !opts.disablePadding;
    return {
      encrypt: (plaintext, dst) => {
        bytes3(plaintext);
        const { b, o, out: _out } = validateBlockEncrypt(plaintext, pcks5, dst);
        const xk = expandKeyLE(key);
        let i2 = 0;
        for (; i2 + 4 <= b.length; ) {
          const { s0, s1, s2, s3 } = encrypt(xk, b[i2 + 0], b[i2 + 1], b[i2 + 2], b[i2 + 3]);
          o[i2++] = s0, o[i2++] = s1, o[i2++] = s2, o[i2++] = s3;
        }
        if (pcks5) {
          const tmp32 = padPCKS(plaintext.subarray(i2 * 4));
          const { s0, s1, s2, s3 } = encrypt(xk, tmp32[0], tmp32[1], tmp32[2], tmp32[3]);
          o[i2++] = s0, o[i2++] = s1, o[i2++] = s2, o[i2++] = s3;
        }
        xk.fill(0);
        return _out;
      },
      decrypt: (ciphertext, dst) => {
        validateBlockDecrypt(ciphertext);
        const xk = expandKeyDecLE(key);
        const out = getDst(ciphertext.length, dst);
        const b = u32(ciphertext);
        const o = u32(out);
        for (let i2 = 0; i2 + 4 <= b.length; ) {
          const { s0, s1, s2, s3 } = decrypt(xk, b[i2 + 0], b[i2 + 1], b[i2 + 2], b[i2 + 3]);
          o[i2++] = s0, o[i2++] = s1, o[i2++] = s2, o[i2++] = s3;
        }
        xk.fill(0);
        return validatePCKS(out, pcks5);
      }
    };
  });
  var cbc = wrapCipher({ blockSize: 16, nonceLength: 16 }, function cbc2(key, iv, opts = {}) {
    bytes3(key);
    bytes3(iv, 16);
    const pcks5 = !opts.disablePadding;
    return {
      encrypt: (plaintext, dst) => {
        const xk = expandKeyLE(key);
        const { b, o, out: _out } = validateBlockEncrypt(plaintext, pcks5, dst);
        const n32 = u32(iv);
        let s0 = n32[0], s1 = n32[1], s2 = n32[2], s3 = n32[3];
        let i2 = 0;
        for (; i2 + 4 <= b.length; ) {
          s0 ^= b[i2 + 0], s1 ^= b[i2 + 1], s2 ^= b[i2 + 2], s3 ^= b[i2 + 3];
          ({ s0, s1, s2, s3 } = encrypt(xk, s0, s1, s2, s3));
          o[i2++] = s0, o[i2++] = s1, o[i2++] = s2, o[i2++] = s3;
        }
        if (pcks5) {
          const tmp32 = padPCKS(plaintext.subarray(i2 * 4));
          s0 ^= tmp32[0], s1 ^= tmp32[1], s2 ^= tmp32[2], s3 ^= tmp32[3];
          ({ s0, s1, s2, s3 } = encrypt(xk, s0, s1, s2, s3));
          o[i2++] = s0, o[i2++] = s1, o[i2++] = s2, o[i2++] = s3;
        }
        xk.fill(0);
        return _out;
      },
      decrypt: (ciphertext, dst) => {
        validateBlockDecrypt(ciphertext);
        const xk = expandKeyDecLE(key);
        const n32 = u32(iv);
        const out = getDst(ciphertext.length, dst);
        const b = u32(ciphertext);
        const o = u32(out);
        let s0 = n32[0], s1 = n32[1], s2 = n32[2], s3 = n32[3];
        for (let i2 = 0; i2 + 4 <= b.length; ) {
          const ps0 = s0, ps1 = s1, ps2 = s2, ps3 = s3;
          s0 = b[i2 + 0], s1 = b[i2 + 1], s2 = b[i2 + 2], s3 = b[i2 + 3];
          const { s0: o0, s1: o1, s2: o2, s3: o3 } = decrypt(xk, s0, s1, s2, s3);
          o[i2++] = o0 ^ ps0, o[i2++] = o1 ^ ps1, o[i2++] = o2 ^ ps2, o[i2++] = o3 ^ ps3;
        }
        xk.fill(0);
        return validatePCKS(out, pcks5);
      }
    };
  });
  var cfb = wrapCipher({ blockSize: 16, nonceLength: 16 }, function cfb2(key, iv) {
    bytes3(key);
    bytes3(iv, 16);
    function processCfb(src, isEncrypt, dst) {
      const xk = expandKeyLE(key);
      const srcLen = src.length;
      dst = getDst(srcLen, dst);
      const src32 = u32(src);
      const dst32 = u32(dst);
      const next32 = isEncrypt ? dst32 : src32;
      const n32 = u32(iv);
      let s0 = n32[0], s1 = n32[1], s2 = n32[2], s3 = n32[3];
      for (let i2 = 0; i2 + 4 <= src32.length; ) {
        const { s0: e0, s1: e1, s2: e2, s3: e3 } = encrypt(xk, s0, s1, s2, s3);
        dst32[i2 + 0] = src32[i2 + 0] ^ e0;
        dst32[i2 + 1] = src32[i2 + 1] ^ e1;
        dst32[i2 + 2] = src32[i2 + 2] ^ e2;
        dst32[i2 + 3] = src32[i2 + 3] ^ e3;
        s0 = next32[i2++], s1 = next32[i2++], s2 = next32[i2++], s3 = next32[i2++];
      }
      const start = BLOCK_SIZE2 * Math.floor(src32.length / BLOCK_SIZE32);
      if (start < srcLen) {
        ({ s0, s1, s2, s3 } = encrypt(xk, s0, s1, s2, s3));
        const buf = u8(new Uint32Array([s0, s1, s2, s3]));
        for (let i2 = start, pos = 0; i2 < srcLen; i2++, pos++)
          dst[i2] = src[i2] ^ buf[pos];
        buf.fill(0);
      }
      xk.fill(0);
      return dst;
    }
    return {
      encrypt: (plaintext, dst) => processCfb(plaintext, true, dst),
      decrypt: (ciphertext, dst) => processCfb(ciphertext, false, dst)
    };
  });
  function computeTag(fn, isLE4, key, data, AAD) {
    const h = fn.create(key, data.length + (AAD?.length || 0));
    if (AAD)
      h.update(AAD);
    h.update(data);
    const num2 = new Uint8Array(16);
    const view = createView3(num2);
    if (AAD)
      setBigUint643(view, 0, BigInt(AAD.length * 8), isLE4);
    setBigUint643(view, 8, BigInt(data.length * 8), isLE4);
    h.update(num2);
    return h.digest();
  }
  var gcm = wrapCipher({ blockSize: 16, nonceLength: 12, tagLength: 16 }, function gcm2(key, nonce, AAD) {
    bytes3(nonce);
    if (nonce.length === 0)
      throw new Error("aes/gcm: empty nonce");
    const tagLength = 16;
    function _computeTag(authKey, tagMask, data) {
      const tag = computeTag(ghash, false, authKey, data, AAD);
      for (let i2 = 0; i2 < tagMask.length; i2++)
        tag[i2] ^= tagMask[i2];
      return tag;
    }
    function deriveKeys() {
      const xk = expandKeyLE(key);
      const authKey = EMPTY_BLOCK.slice();
      const counter = EMPTY_BLOCK.slice();
      ctr32(xk, false, counter, counter, authKey);
      if (nonce.length === 12) {
        counter.set(nonce);
      } else {
        const nonceLen = EMPTY_BLOCK.slice();
        const view = createView3(nonceLen);
        setBigUint643(view, 8, BigInt(nonce.length * 8), false);
        ghash.create(authKey).update(nonce).update(nonceLen).digestInto(counter);
      }
      const tagMask = ctr32(xk, false, counter, EMPTY_BLOCK);
      return { xk, authKey, counter, tagMask };
    }
    return {
      encrypt: (plaintext) => {
        bytes3(plaintext);
        const { xk, authKey, counter, tagMask } = deriveKeys();
        const out = new Uint8Array(plaintext.length + tagLength);
        ctr32(xk, false, counter, plaintext, out);
        const tag = _computeTag(authKey, tagMask, out.subarray(0, out.length - tagLength));
        out.set(tag, plaintext.length);
        xk.fill(0);
        return out;
      },
      decrypt: (ciphertext) => {
        bytes3(ciphertext);
        if (ciphertext.length < tagLength)
          throw new Error(`aes/gcm: ciphertext less than tagLen (${tagLength})`);
        const { xk, authKey, counter, tagMask } = deriveKeys();
        const data = ciphertext.subarray(0, -tagLength);
        const passedTag = ciphertext.subarray(-tagLength);
        const tag = _computeTag(authKey, tagMask, data);
        if (!equalBytes2(tag, passedTag))
          throw new Error("aes/gcm: invalid ghash tag");
        const out = ctr32(xk, false, counter, data);
        authKey.fill(0);
        tagMask.fill(0);
        xk.fill(0);
        return out;
      }
    };
  });
  var limit = (name, min, max) => (value) => {
    if (!Number.isSafeInteger(value) || min > value || value > max)
      throw new Error(`${name}: invalid value=${value}, must be [${min}..${max}]`);
  };
  var siv = wrapCipher({ blockSize: 16, nonceLength: 12, tagLength: 16 }, function siv2(key, nonce, AAD) {
    const tagLength = 16;
    const AAD_LIMIT = limit("AAD", 0, 2 ** 36);
    const PLAIN_LIMIT = limit("plaintext", 0, 2 ** 36);
    const NONCE_LIMIT = limit("nonce", 12, 12);
    const CIPHER_LIMIT = limit("ciphertext", 16, 2 ** 36 + 16);
    bytes3(nonce);
    NONCE_LIMIT(nonce.length);
    if (AAD) {
      bytes3(AAD);
      AAD_LIMIT(AAD.length);
    }
    function deriveKeys() {
      const len = key.length;
      if (len !== 16 && len !== 24 && len !== 32)
        throw new Error(`key length must be 16, 24 or 32 bytes, got: ${len} bytes`);
      const xk = expandKeyLE(key);
      const encKey = new Uint8Array(len);
      const authKey = new Uint8Array(16);
      const n32 = u32(nonce);
      let s0 = 0, s1 = n32[0], s2 = n32[1], s3 = n32[2];
      let counter = 0;
      for (const derivedKey of [authKey, encKey].map(u32)) {
        const d32 = u32(derivedKey);
        for (let i2 = 0; i2 < d32.length; i2 += 2) {
          const { s0: o0, s1: o1 } = encrypt(xk, s0, s1, s2, s3);
          d32[i2 + 0] = o0;
          d32[i2 + 1] = o1;
          s0 = ++counter;
        }
      }
      xk.fill(0);
      return { authKey, encKey: expandKeyLE(encKey) };
    }
    function _computeTag(encKey, authKey, data) {
      const tag = computeTag(polyval, true, authKey, data, AAD);
      for (let i2 = 0; i2 < 12; i2++)
        tag[i2] ^= nonce[i2];
      tag[15] &= 127;
      const t32 = u32(tag);
      let s0 = t32[0], s1 = t32[1], s2 = t32[2], s3 = t32[3];
      ({ s0, s1, s2, s3 } = encrypt(encKey, s0, s1, s2, s3));
      t32[0] = s0, t32[1] = s1, t32[2] = s2, t32[3] = s3;
      return tag;
    }
    function processSiv(encKey, tag, input) {
      let block = tag.slice();
      block[15] |= 128;
      return ctr32(encKey, true, block, input);
    }
    return {
      encrypt: (plaintext) => {
        bytes3(plaintext);
        PLAIN_LIMIT(plaintext.length);
        const { encKey, authKey } = deriveKeys();
        const tag = _computeTag(encKey, authKey, plaintext);
        const out = new Uint8Array(plaintext.length + tagLength);
        out.set(tag, plaintext.length);
        out.set(processSiv(encKey, tag, plaintext));
        encKey.fill(0);
        authKey.fill(0);
        return out;
      },
      decrypt: (ciphertext) => {
        bytes3(ciphertext);
        CIPHER_LIMIT(ciphertext.length);
        const tag = ciphertext.subarray(-tagLength);
        const { encKey, authKey } = deriveKeys();
        const plaintext = processSiv(encKey, tag, ciphertext.subarray(0, -tagLength));
        const expectedTag = _computeTag(encKey, authKey, plaintext);
        encKey.fill(0);
        authKey.fill(0);
        if (!equalBytes2(tag, expectedTag))
          throw new Error("invalid polyval tag");
        return plaintext;
      }
    };
  });

  // node_modules/@noble/ciphers/esm/_poly1305.js
  var u8to16 = (a, i2) => a[i2++] & 255 | (a[i2++] & 255) << 8;
  var Poly1305 = class {
    constructor(key) {
      this.blockLen = 16;
      this.outputLen = 16;
      this.buffer = new Uint8Array(16);
      this.r = new Uint16Array(10);
      this.h = new Uint16Array(10);
      this.pad = new Uint16Array(8);
      this.pos = 0;
      this.finished = false;
      key = toBytes3(key);
      bytes3(key, 32);
      const t0 = u8to16(key, 0);
      const t1 = u8to16(key, 2);
      const t2 = u8to16(key, 4);
      const t3 = u8to16(key, 6);
      const t4 = u8to16(key, 8);
      const t5 = u8to16(key, 10);
      const t6 = u8to16(key, 12);
      const t7 = u8to16(key, 14);
      this.r[0] = t0 & 8191;
      this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
      this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
      this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
      this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
      this.r[5] = t4 >>> 1 & 8190;
      this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
      this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
      this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
      this.r[9] = t7 >>> 5 & 127;
      for (let i2 = 0; i2 < 8; i2++)
        this.pad[i2] = u8to16(key, 16 + 2 * i2);
    }
    process(data, offset, isLast = false) {
      const hibit = isLast ? 0 : 1 << 11;
      const { h, r } = this;
      const r0 = r[0];
      const r1 = r[1];
      const r2 = r[2];
      const r3 = r[3];
      const r4 = r[4];
      const r5 = r[5];
      const r6 = r[6];
      const r7 = r[7];
      const r8 = r[8];
      const r9 = r[9];
      const t0 = u8to16(data, offset + 0);
      const t1 = u8to16(data, offset + 2);
      const t2 = u8to16(data, offset + 4);
      const t3 = u8to16(data, offset + 6);
      const t4 = u8to16(data, offset + 8);
      const t5 = u8to16(data, offset + 10);
      const t6 = u8to16(data, offset + 12);
      const t7 = u8to16(data, offset + 14);
      let h0 = h[0] + (t0 & 8191);
      let h1 = h[1] + ((t0 >>> 13 | t1 << 3) & 8191);
      let h2 = h[2] + ((t1 >>> 10 | t2 << 6) & 8191);
      let h3 = h[3] + ((t2 >>> 7 | t3 << 9) & 8191);
      let h4 = h[4] + ((t3 >>> 4 | t4 << 12) & 8191);
      let h5 = h[5] + (t4 >>> 1 & 8191);
      let h6 = h[6] + ((t4 >>> 14 | t5 << 2) & 8191);
      let h7 = h[7] + ((t5 >>> 11 | t6 << 5) & 8191);
      let h8 = h[8] + ((t6 >>> 8 | t7 << 8) & 8191);
      let h9 = h[9] + (t7 >>> 5 | hibit);
      let c = 0;
      let d0 = c + h0 * r0 + h1 * (5 * r9) + h2 * (5 * r8) + h3 * (5 * r7) + h4 * (5 * r6);
      c = d0 >>> 13;
      d0 &= 8191;
      d0 += h5 * (5 * r5) + h6 * (5 * r4) + h7 * (5 * r3) + h8 * (5 * r2) + h9 * (5 * r1);
      c += d0 >>> 13;
      d0 &= 8191;
      let d1 = c + h0 * r1 + h1 * r0 + h2 * (5 * r9) + h3 * (5 * r8) + h4 * (5 * r7);
      c = d1 >>> 13;
      d1 &= 8191;
      d1 += h5 * (5 * r6) + h6 * (5 * r5) + h7 * (5 * r4) + h8 * (5 * r3) + h9 * (5 * r2);
      c += d1 >>> 13;
      d1 &= 8191;
      let d22 = c + h0 * r2 + h1 * r1 + h2 * r0 + h3 * (5 * r9) + h4 * (5 * r8);
      c = d22 >>> 13;
      d22 &= 8191;
      d22 += h5 * (5 * r7) + h6 * (5 * r6) + h7 * (5 * r5) + h8 * (5 * r4) + h9 * (5 * r3);
      c += d22 >>> 13;
      d22 &= 8191;
      let d32 = c + h0 * r3 + h1 * r2 + h2 * r1 + h3 * r0 + h4 * (5 * r9);
      c = d32 >>> 13;
      d32 &= 8191;
      d32 += h5 * (5 * r8) + h6 * (5 * r7) + h7 * (5 * r6) + h8 * (5 * r5) + h9 * (5 * r4);
      c += d32 >>> 13;
      d32 &= 8191;
      let d4 = c + h0 * r4 + h1 * r3 + h2 * r2 + h3 * r1 + h4 * r0;
      c = d4 >>> 13;
      d4 &= 8191;
      d4 += h5 * (5 * r9) + h6 * (5 * r8) + h7 * (5 * r7) + h8 * (5 * r6) + h9 * (5 * r5);
      c += d4 >>> 13;
      d4 &= 8191;
      let d5 = c + h0 * r5 + h1 * r4 + h2 * r3 + h3 * r2 + h4 * r1;
      c = d5 >>> 13;
      d5 &= 8191;
      d5 += h5 * r0 + h6 * (5 * r9) + h7 * (5 * r8) + h8 * (5 * r7) + h9 * (5 * r6);
      c += d5 >>> 13;
      d5 &= 8191;
      let d6 = c + h0 * r6 + h1 * r5 + h2 * r4 + h3 * r3 + h4 * r2;
      c = d6 >>> 13;
      d6 &= 8191;
      d6 += h5 * r1 + h6 * r0 + h7 * (5 * r9) + h8 * (5 * r8) + h9 * (5 * r7);
      c += d6 >>> 13;
      d6 &= 8191;
      let d7 = c + h0 * r7 + h1 * r6 + h2 * r5 + h3 * r4 + h4 * r3;
      c = d7 >>> 13;
      d7 &= 8191;
      d7 += h5 * r2 + h6 * r1 + h7 * r0 + h8 * (5 * r9) + h9 * (5 * r8);
      c += d7 >>> 13;
      d7 &= 8191;
      let d8 = c + h0 * r8 + h1 * r7 + h2 * r6 + h3 * r5 + h4 * r4;
      c = d8 >>> 13;
      d8 &= 8191;
      d8 += h5 * r3 + h6 * r2 + h7 * r1 + h8 * r0 + h9 * (5 * r9);
      c += d8 >>> 13;
      d8 &= 8191;
      let d9 = c + h0 * r9 + h1 * r8 + h2 * r7 + h3 * r6 + h4 * r5;
      c = d9 >>> 13;
      d9 &= 8191;
      d9 += h5 * r4 + h6 * r3 + h7 * r2 + h8 * r1 + h9 * r0;
      c += d9 >>> 13;
      d9 &= 8191;
      c = (c << 2) + c | 0;
      c = c + d0 | 0;
      d0 = c & 8191;
      c = c >>> 13;
      d1 += c;
      h[0] = d0;
      h[1] = d1;
      h[2] = d22;
      h[3] = d32;
      h[4] = d4;
      h[5] = d5;
      h[6] = d6;
      h[7] = d7;
      h[8] = d8;
      h[9] = d9;
    }
    finalize() {
      const { h, pad: pad2 } = this;
      const g = new Uint16Array(10);
      let c = h[1] >>> 13;
      h[1] &= 8191;
      for (let i2 = 2; i2 < 10; i2++) {
        h[i2] += c;
        c = h[i2] >>> 13;
        h[i2] &= 8191;
      }
      h[0] += c * 5;
      c = h[0] >>> 13;
      h[0] &= 8191;
      h[1] += c;
      c = h[1] >>> 13;
      h[1] &= 8191;
      h[2] += c;
      g[0] = h[0] + 5;
      c = g[0] >>> 13;
      g[0] &= 8191;
      for (let i2 = 1; i2 < 10; i2++) {
        g[i2] = h[i2] + c;
        c = g[i2] >>> 13;
        g[i2] &= 8191;
      }
      g[9] -= 1 << 13;
      let mask = (c ^ 1) - 1;
      for (let i2 = 0; i2 < 10; i2++)
        g[i2] &= mask;
      mask = ~mask;
      for (let i2 = 0; i2 < 10; i2++)
        h[i2] = h[i2] & mask | g[i2];
      h[0] = (h[0] | h[1] << 13) & 65535;
      h[1] = (h[1] >>> 3 | h[2] << 10) & 65535;
      h[2] = (h[2] >>> 6 | h[3] << 7) & 65535;
      h[3] = (h[3] >>> 9 | h[4] << 4) & 65535;
      h[4] = (h[4] >>> 12 | h[5] << 1 | h[6] << 14) & 65535;
      h[5] = (h[6] >>> 2 | h[7] << 11) & 65535;
      h[6] = (h[7] >>> 5 | h[8] << 8) & 65535;
      h[7] = (h[8] >>> 8 | h[9] << 5) & 65535;
      let f = h[0] + pad2[0];
      h[0] = f & 65535;
      for (let i2 = 1; i2 < 8; i2++) {
        f = (h[i2] + pad2[i2] | 0) + (f >>> 16) | 0;
        h[i2] = f & 65535;
      }
    }
    update(data) {
      exists3(this);
      const { buffer, blockLen } = this;
      data = toBytes3(data);
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        if (take === blockLen) {
          for (; blockLen <= len - pos; pos += blockLen)
            this.process(data, pos);
          continue;
        }
        buffer.set(data.subarray(pos, pos + take), this.pos);
        this.pos += take;
        pos += take;
        if (this.pos === blockLen) {
          this.process(buffer, 0, false);
          this.pos = 0;
        }
      }
      return this;
    }
    destroy() {
      this.h.fill(0);
      this.r.fill(0);
      this.buffer.fill(0);
      this.pad.fill(0);
    }
    digestInto(out) {
      exists3(this);
      output3(out, this);
      this.finished = true;
      const { buffer, h } = this;
      let { pos } = this;
      if (pos) {
        buffer[pos++] = 1;
        for (; pos < 16; pos++)
          buffer[pos] = 0;
        this.process(buffer, 0, true);
      }
      this.finalize();
      let opos = 0;
      for (let i2 = 0; i2 < 8; i2++) {
        out[opos++] = h[i2] >>> 0;
        out[opos++] = h[i2] >>> 8;
      }
      return out;
    }
    digest() {
      const { buffer, outputLen } = this;
      this.digestInto(buffer);
      const res = buffer.slice(0, outputLen);
      this.destroy();
      return res;
    }
  };
  function wrapConstructorWithKey2(hashCons) {
    const hashC = (msg, key) => hashCons(key).update(toBytes3(msg)).digest();
    const tmp = hashCons(new Uint8Array(32));
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (key) => hashCons(key);
    return hashC;
  }
  var poly1305 = wrapConstructorWithKey2((key) => new Poly1305(key));

  // node_modules/@noble/ciphers/esm/_arx.js
  var _utf8ToBytes = (str) => Uint8Array.from(str.split("").map((c) => c.charCodeAt(0)));
  var sigma16 = _utf8ToBytes("expand 16-byte k");
  var sigma32 = _utf8ToBytes("expand 32-byte k");
  var sigma16_32 = u32(sigma16);
  var sigma32_32 = u32(sigma32);
  var sigma = sigma32_32.slice();
  function rotl(a, b) {
    return a << b | a >>> 32 - b;
  }
  function isAligned32(b) {
    return b.byteOffset % 4 === 0;
  }
  var BLOCK_LEN = 64;
  var BLOCK_LEN32 = 16;
  var MAX_COUNTER = 2 ** 32 - 1;
  var U32_EMPTY = new Uint32Array();
  function runCipher(core, sigma2, key, nonce, data, output4, counter, rounds) {
    const len = data.length;
    const block = new Uint8Array(BLOCK_LEN);
    const b32 = u32(block);
    const isAligned = isAligned32(data) && isAligned32(output4);
    const d32 = isAligned ? u32(data) : U32_EMPTY;
    const o32 = isAligned ? u32(output4) : U32_EMPTY;
    for (let pos = 0; pos < len; counter++) {
      core(sigma2, key, nonce, b32, counter, rounds);
      if (counter >= MAX_COUNTER)
        throw new Error("arx: counter overflow");
      const take = Math.min(BLOCK_LEN, len - pos);
      if (isAligned && take === BLOCK_LEN) {
        const pos32 = pos / 4;
        if (pos % 4 !== 0)
          throw new Error("arx: invalid block position");
        for (let j = 0, posj; j < BLOCK_LEN32; j++) {
          posj = pos32 + j;
          o32[posj] = d32[posj] ^ b32[j];
        }
        pos += BLOCK_LEN;
        continue;
      }
      for (let j = 0, posj; j < take; j++) {
        posj = pos + j;
        output4[posj] = data[posj] ^ block[j];
      }
      pos += take;
    }
  }
  function createCipher(core, opts) {
    const { allowShortKeys, extendNonceFn, counterLength, counterRight, rounds } = checkOpts({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, opts);
    if (typeof core !== "function")
      throw new Error("core must be a function");
    number3(counterLength);
    number3(rounds);
    bool2(counterRight);
    bool2(allowShortKeys);
    return (key, nonce, data, output4, counter = 0) => {
      bytes3(key);
      bytes3(nonce);
      bytes3(data);
      const len = data.length;
      if (!output4)
        output4 = new Uint8Array(len);
      bytes3(output4);
      number3(counter);
      if (counter < 0 || counter >= MAX_COUNTER)
        throw new Error("arx: counter overflow");
      if (output4.length < len)
        throw new Error(`arx: output (${output4.length}) is shorter than data (${len})`);
      const toClean = [];
      let l = key.length, k, sigma2;
      if (l === 32) {
        k = key.slice();
        toClean.push(k);
        sigma2 = sigma32_32;
      } else if (l === 16 && allowShortKeys) {
        k = new Uint8Array(32);
        k.set(key);
        k.set(key, 16);
        sigma2 = sigma16_32;
        toClean.push(k);
      } else {
        throw new Error(`arx: invalid 32-byte key, got length=${l}`);
      }
      if (!isAligned32(nonce)) {
        nonce = nonce.slice();
        toClean.push(nonce);
      }
      const k32 = u32(k);
      if (extendNonceFn) {
        if (nonce.length !== 24)
          throw new Error(`arx: extended nonce must be 24 bytes`);
        extendNonceFn(sigma2, k32, u32(nonce.subarray(0, 16)), k32);
        nonce = nonce.subarray(16);
      }
      const nonceNcLen = 16 - counterLength;
      if (nonceNcLen !== nonce.length)
        throw new Error(`arx: nonce must be ${nonceNcLen} or 16 bytes`);
      if (nonceNcLen !== 12) {
        const nc = new Uint8Array(12);
        nc.set(nonce, counterRight ? 0 : 12 - nonce.length);
        nonce = nc;
        toClean.push(nonce);
      }
      const n32 = u32(nonce);
      runCipher(core, sigma2, k32, n32, data, output4, counter, rounds);
      while (toClean.length > 0)
        toClean.pop().fill(0);
      return output4;
    };
  }

  // node_modules/@noble/ciphers/esm/chacha.js
  function chachaCore(s, k, n, out, cnt, rounds = 20) {
    let y00 = s[0], y01 = s[1], y02 = s[2], y03 = s[3], y04 = k[0], y05 = k[1], y06 = k[2], y07 = k[3], y08 = k[4], y09 = k[5], y10 = k[6], y11 = k[7], y12 = cnt, y13 = n[0], y14 = n[1], y15 = n[2];
    let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
    for (let r = 0; r < rounds; r += 2) {
      x00 = x00 + x04 | 0;
      x12 = rotl(x12 ^ x00, 16);
      x08 = x08 + x12 | 0;
      x04 = rotl(x04 ^ x08, 12);
      x00 = x00 + x04 | 0;
      x12 = rotl(x12 ^ x00, 8);
      x08 = x08 + x12 | 0;
      x04 = rotl(x04 ^ x08, 7);
      x01 = x01 + x05 | 0;
      x13 = rotl(x13 ^ x01, 16);
      x09 = x09 + x13 | 0;
      x05 = rotl(x05 ^ x09, 12);
      x01 = x01 + x05 | 0;
      x13 = rotl(x13 ^ x01, 8);
      x09 = x09 + x13 | 0;
      x05 = rotl(x05 ^ x09, 7);
      x02 = x02 + x06 | 0;
      x14 = rotl(x14 ^ x02, 16);
      x10 = x10 + x14 | 0;
      x06 = rotl(x06 ^ x10, 12);
      x02 = x02 + x06 | 0;
      x14 = rotl(x14 ^ x02, 8);
      x10 = x10 + x14 | 0;
      x06 = rotl(x06 ^ x10, 7);
      x03 = x03 + x07 | 0;
      x15 = rotl(x15 ^ x03, 16);
      x11 = x11 + x15 | 0;
      x07 = rotl(x07 ^ x11, 12);
      x03 = x03 + x07 | 0;
      x15 = rotl(x15 ^ x03, 8);
      x11 = x11 + x15 | 0;
      x07 = rotl(x07 ^ x11, 7);
      x00 = x00 + x05 | 0;
      x15 = rotl(x15 ^ x00, 16);
      x10 = x10 + x15 | 0;
      x05 = rotl(x05 ^ x10, 12);
      x00 = x00 + x05 | 0;
      x15 = rotl(x15 ^ x00, 8);
      x10 = x10 + x15 | 0;
      x05 = rotl(x05 ^ x10, 7);
      x01 = x01 + x06 | 0;
      x12 = rotl(x12 ^ x01, 16);
      x11 = x11 + x12 | 0;
      x06 = rotl(x06 ^ x11, 12);
      x01 = x01 + x06 | 0;
      x12 = rotl(x12 ^ x01, 8);
      x11 = x11 + x12 | 0;
      x06 = rotl(x06 ^ x11, 7);
      x02 = x02 + x07 | 0;
      x13 = rotl(x13 ^ x02, 16);
      x08 = x08 + x13 | 0;
      x07 = rotl(x07 ^ x08, 12);
      x02 = x02 + x07 | 0;
      x13 = rotl(x13 ^ x02, 8);
      x08 = x08 + x13 | 0;
      x07 = rotl(x07 ^ x08, 7);
      x03 = x03 + x04 | 0;
      x14 = rotl(x14 ^ x03, 16);
      x09 = x09 + x14 | 0;
      x04 = rotl(x04 ^ x09, 12);
      x03 = x03 + x04 | 0;
      x14 = rotl(x14 ^ x03, 8);
      x09 = x09 + x14 | 0;
      x04 = rotl(x04 ^ x09, 7);
    }
    let oi = 0;
    out[oi++] = y00 + x00 | 0;
    out[oi++] = y01 + x01 | 0;
    out[oi++] = y02 + x02 | 0;
    out[oi++] = y03 + x03 | 0;
    out[oi++] = y04 + x04 | 0;
    out[oi++] = y05 + x05 | 0;
    out[oi++] = y06 + x06 | 0;
    out[oi++] = y07 + x07 | 0;
    out[oi++] = y08 + x08 | 0;
    out[oi++] = y09 + x09 | 0;
    out[oi++] = y10 + x10 | 0;
    out[oi++] = y11 + x11 | 0;
    out[oi++] = y12 + x12 | 0;
    out[oi++] = y13 + x13 | 0;
    out[oi++] = y14 + x14 | 0;
    out[oi++] = y15 + x15 | 0;
  }
  function hchacha(s, k, i2, o32) {
    let x00 = s[0], x01 = s[1], x02 = s[2], x03 = s[3], x04 = k[0], x05 = k[1], x06 = k[2], x07 = k[3], x08 = k[4], x09 = k[5], x10 = k[6], x11 = k[7], x12 = i2[0], x13 = i2[1], x14 = i2[2], x15 = i2[3];
    for (let r = 0; r < 20; r += 2) {
      x00 = x00 + x04 | 0;
      x12 = rotl(x12 ^ x00, 16);
      x08 = x08 + x12 | 0;
      x04 = rotl(x04 ^ x08, 12);
      x00 = x00 + x04 | 0;
      x12 = rotl(x12 ^ x00, 8);
      x08 = x08 + x12 | 0;
      x04 = rotl(x04 ^ x08, 7);
      x01 = x01 + x05 | 0;
      x13 = rotl(x13 ^ x01, 16);
      x09 = x09 + x13 | 0;
      x05 = rotl(x05 ^ x09, 12);
      x01 = x01 + x05 | 0;
      x13 = rotl(x13 ^ x01, 8);
      x09 = x09 + x13 | 0;
      x05 = rotl(x05 ^ x09, 7);
      x02 = x02 + x06 | 0;
      x14 = rotl(x14 ^ x02, 16);
      x10 = x10 + x14 | 0;
      x06 = rotl(x06 ^ x10, 12);
      x02 = x02 + x06 | 0;
      x14 = rotl(x14 ^ x02, 8);
      x10 = x10 + x14 | 0;
      x06 = rotl(x06 ^ x10, 7);
      x03 = x03 + x07 | 0;
      x15 = rotl(x15 ^ x03, 16);
      x11 = x11 + x15 | 0;
      x07 = rotl(x07 ^ x11, 12);
      x03 = x03 + x07 | 0;
      x15 = rotl(x15 ^ x03, 8);
      x11 = x11 + x15 | 0;
      x07 = rotl(x07 ^ x11, 7);
      x00 = x00 + x05 | 0;
      x15 = rotl(x15 ^ x00, 16);
      x10 = x10 + x15 | 0;
      x05 = rotl(x05 ^ x10, 12);
      x00 = x00 + x05 | 0;
      x15 = rotl(x15 ^ x00, 8);
      x10 = x10 + x15 | 0;
      x05 = rotl(x05 ^ x10, 7);
      x01 = x01 + x06 | 0;
      x12 = rotl(x12 ^ x01, 16);
      x11 = x11 + x12 | 0;
      x06 = rotl(x06 ^ x11, 12);
      x01 = x01 + x06 | 0;
      x12 = rotl(x12 ^ x01, 8);
      x11 = x11 + x12 | 0;
      x06 = rotl(x06 ^ x11, 7);
      x02 = x02 + x07 | 0;
      x13 = rotl(x13 ^ x02, 16);
      x08 = x08 + x13 | 0;
      x07 = rotl(x07 ^ x08, 12);
      x02 = x02 + x07 | 0;
      x13 = rotl(x13 ^ x02, 8);
      x08 = x08 + x13 | 0;
      x07 = rotl(x07 ^ x08, 7);
      x03 = x03 + x04 | 0;
      x14 = rotl(x14 ^ x03, 16);
      x09 = x09 + x14 | 0;
      x04 = rotl(x04 ^ x09, 12);
      x03 = x03 + x04 | 0;
      x14 = rotl(x14 ^ x03, 8);
      x09 = x09 + x14 | 0;
      x04 = rotl(x04 ^ x09, 7);
    }
    let oi = 0;
    o32[oi++] = x00;
    o32[oi++] = x01;
    o32[oi++] = x02;
    o32[oi++] = x03;
    o32[oi++] = x12;
    o32[oi++] = x13;
    o32[oi++] = x14;
    o32[oi++] = x15;
  }
  var chacha20 = /* @__PURE__ */ createCipher(chachaCore, {
    counterRight: false,
    counterLength: 4,
    allowShortKeys: false
  });
  var xchacha20 = /* @__PURE__ */ createCipher(chachaCore, {
    counterRight: false,
    counterLength: 8,
    extendNonceFn: hchacha,
    allowShortKeys: false
  });
  var ZEROS162 = /* @__PURE__ */ new Uint8Array(16);
  var updatePadded = (h, msg) => {
    h.update(msg);
    const left = msg.length % 16;
    if (left)
      h.update(ZEROS162.subarray(left));
  };
  var ZEROS322 = /* @__PURE__ */ new Uint8Array(32);
  function computeTag2(fn, key, nonce, data, AAD) {
    const authKey = fn(key, nonce, ZEROS322);
    const h = poly1305.create(authKey);
    if (AAD)
      updatePadded(h, AAD);
    updatePadded(h, data);
    const num2 = new Uint8Array(16);
    const view = createView3(num2);
    setBigUint643(view, 0, BigInt(AAD ? AAD.length : 0), true);
    setBigUint643(view, 8, BigInt(data.length), true);
    h.update(num2);
    const res = h.digest();
    authKey.fill(0);
    return res;
  }
  var _poly1305_aead = (xorStream) => (key, nonce, AAD) => {
    const tagLength = 16;
    bytes3(key, 32);
    bytes3(nonce);
    return {
      encrypt: (plaintext, output4) => {
        const plength = plaintext.length;
        const clength = plength + tagLength;
        if (output4) {
          bytes3(output4, clength);
        } else {
          output4 = new Uint8Array(clength);
        }
        xorStream(key, nonce, plaintext, output4, 1);
        const tag = computeTag2(xorStream, key, nonce, output4.subarray(0, -tagLength), AAD);
        output4.set(tag, plength);
        return output4;
      },
      decrypt: (ciphertext, output4) => {
        const clength = ciphertext.length;
        const plength = clength - tagLength;
        if (clength < tagLength)
          throw new Error(`encrypted data must be at least ${tagLength} bytes`);
        if (output4) {
          bytes3(output4, plength);
        } else {
          output4 = new Uint8Array(plength);
        }
        const data = ciphertext.subarray(0, -tagLength);
        const passedTag = ciphertext.subarray(-tagLength);
        const tag = computeTag2(xorStream, key, nonce, data, AAD);
        if (!equalBytes2(passedTag, tag))
          throw new Error("invalid tag");
        xorStream(key, nonce, data, output4, 1);
        return output4;
      }
    };
  };
  var chacha20poly1305 = /* @__PURE__ */ wrapCipher({ blockSize: 64, nonceLength: 12, tagLength: 16 }, _poly1305_aead(chacha20));
  var xchacha20poly1305 = /* @__PURE__ */ wrapCipher({ blockSize: 64, nonceLength: 24, tagLength: 16 }, _poly1305_aead(xchacha20));

  // node_modules/nostr-tools/node_modules/@noble/hashes/esm/hmac.js
  var HMAC2 = class extends Hash2 {
    constructor(hash3, _key) {
      super();
      this.finished = false;
      this.destroyed = false;
      assert_default.hash(hash3);
      const key = toBytes2(_key);
      this.iHash = hash3.create();
      if (typeof this.iHash.update !== "function")
        throw new Error("Expected instance of class which extends utils.Hash");
      this.blockLen = this.iHash.blockLen;
      this.outputLen = this.iHash.outputLen;
      const blockLen = this.blockLen;
      const pad2 = new Uint8Array(blockLen);
      pad2.set(key.length > blockLen ? hash3.create().update(key).digest() : key);
      for (let i2 = 0; i2 < pad2.length; i2++)
        pad2[i2] ^= 54;
      this.iHash.update(pad2);
      this.oHash = hash3.create();
      for (let i2 = 0; i2 < pad2.length; i2++)
        pad2[i2] ^= 54 ^ 92;
      this.oHash.update(pad2);
      pad2.fill(0);
    }
    update(buf) {
      assert_default.exists(this);
      this.iHash.update(buf);
      return this;
    }
    digestInto(out) {
      assert_default.exists(this);
      assert_default.bytes(out, this.outputLen);
      this.finished = true;
      this.iHash.digestInto(out);
      this.oHash.update(out);
      this.oHash.digestInto(out);
      this.destroy();
    }
    digest() {
      const out = new Uint8Array(this.oHash.outputLen);
      this.digestInto(out);
      return out;
    }
    _cloneInto(to) {
      to || (to = Object.create(Object.getPrototypeOf(this), {}));
      const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
      to = to;
      to.finished = finished;
      to.destroyed = destroyed;
      to.blockLen = blockLen;
      to.outputLen = outputLen;
      to.oHash = oHash._cloneInto(to.oHash);
      to.iHash = iHash._cloneInto(to.iHash);
      return to;
    }
    destroy() {
      this.destroyed = true;
      this.oHash.destroy();
      this.iHash.destroy();
    }
  };
  var hmac2 = (hash3, key, message) => new HMAC2(hash3, key).update(message).digest();
  hmac2.create = (hash3, key) => new HMAC2(hash3, key);

  // node_modules/nostr-tools/node_modules/@noble/hashes/esm/hkdf.js
  function extract(hash3, ikm, salt) {
    assert_default.hash(hash3);
    if (salt === void 0)
      salt = new Uint8Array(hash3.outputLen);
    return hmac2(hash3, toBytes2(salt), toBytes2(ikm));
  }
  var HKDF_COUNTER = new Uint8Array([0]);
  var EMPTY_BUFFER = new Uint8Array();
  function expand(hash3, prk, info, length = 32) {
    assert_default.hash(hash3);
    assert_default.number(length);
    if (length > 255 * hash3.outputLen)
      throw new Error("Length should be <= 255*HashLen");
    const blocks = Math.ceil(length / hash3.outputLen);
    if (info === void 0)
      info = EMPTY_BUFFER;
    const okm = new Uint8Array(blocks * hash3.outputLen);
    const HMAC4 = hmac2.create(hash3, prk);
    const HMACTmp = HMAC4._cloneInto();
    const T = new Uint8Array(HMAC4.outputLen);
    for (let counter = 0; counter < blocks; counter++) {
      HKDF_COUNTER[0] = counter + 1;
      HMACTmp.update(counter === 0 ? EMPTY_BUFFER : T).update(info).update(HKDF_COUNTER).digestInto(T);
      okm.set(T, hash3.outputLen * counter);
      HMAC4._cloneInto(HMACTmp);
    }
    HMAC4.destroy();
    HMACTmp.destroy();
    T.fill(0);
    HKDF_COUNTER.fill(0);
    return okm.slice(0, length);
  }

  // node_modules/nostr-tools/lib/esm/index.js
  var __defProp2 = Object.defineProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var verifiedSymbol = Symbol("verified");
  var isRecord = (obj) => obj instanceof Object;
  function validateEvent(event) {
    if (!isRecord(event))
      return false;
    if (typeof event.kind !== "number")
      return false;
    if (typeof event.content !== "string")
      return false;
    if (typeof event.created_at !== "number")
      return false;
    if (typeof event.pubkey !== "string")
      return false;
    if (!event.pubkey.match(/^[a-f0-9]{64}$/))
      return false;
    if (!Array.isArray(event.tags))
      return false;
    for (let i2 = 0; i2 < event.tags.length; i2++) {
      let tag = event.tags[i2];
      if (!Array.isArray(tag))
        return false;
      for (let j = 0; j < tag.length; j++) {
        if (typeof tag[j] === "object")
          return false;
      }
    }
    return true;
  }
  var utils_exports2 = {};
  __export2(utils_exports2, {
    Queue: () => Queue,
    QueueNode: () => QueueNode,
    binarySearch: () => binarySearch,
    insertEventIntoAscendingList: () => insertEventIntoAscendingList,
    insertEventIntoDescendingList: () => insertEventIntoDescendingList,
    normalizeURL: () => normalizeURL,
    utf8Decoder: () => utf8Decoder,
    utf8Encoder: () => utf8Encoder
  });
  var utf8Decoder = new TextDecoder("utf-8");
  var utf8Encoder = new TextEncoder();
  function normalizeURL(url) {
    if (url.indexOf("://") === -1)
      url = "wss://" + url;
    let p = new URL(url);
    p.pathname = p.pathname.replace(/\/+/g, "/");
    if (p.pathname.endsWith("/"))
      p.pathname = p.pathname.slice(0, -1);
    if (p.port === "80" && p.protocol === "ws:" || p.port === "443" && p.protocol === "wss:")
      p.port = "";
    p.searchParams.sort();
    p.hash = "";
    return p.toString();
  }
  function insertEventIntoDescendingList(sortedArray, event) {
    const [idx, found] = binarySearch(sortedArray, (b) => {
      if (event.id === b.id)
        return 0;
      if (event.created_at === b.created_at)
        return -1;
      return b.created_at - event.created_at;
    });
    if (!found) {
      sortedArray.splice(idx, 0, event);
    }
    return sortedArray;
  }
  function insertEventIntoAscendingList(sortedArray, event) {
    const [idx, found] = binarySearch(sortedArray, (b) => {
      if (event.id === b.id)
        return 0;
      if (event.created_at === b.created_at)
        return -1;
      return event.created_at - b.created_at;
    });
    if (!found) {
      sortedArray.splice(idx, 0, event);
    }
    return sortedArray;
  }
  function binarySearch(arr, compare) {
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      const cmp = compare(arr[mid]);
      if (cmp === 0) {
        return [mid, true];
      }
      if (cmp < 0) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    return [start, false];
  }
  var QueueNode = class {
    value;
    next = null;
    prev = null;
    constructor(message) {
      this.value = message;
    }
  };
  var Queue = class {
    first;
    last;
    constructor() {
      this.first = null;
      this.last = null;
    }
    enqueue(value) {
      const newNode = new QueueNode(value);
      if (!this.last) {
        this.first = newNode;
        this.last = newNode;
      } else if (this.last === this.first) {
        this.last = newNode;
        this.last.prev = this.first;
        this.first.next = newNode;
      } else {
        newNode.prev = this.last;
        this.last.next = newNode;
        this.last = newNode;
      }
      return true;
    }
    dequeue() {
      if (!this.first)
        return null;
      if (this.first === this.last) {
        const target2 = this.first;
        this.first = null;
        this.last = null;
        return target2.value;
      }
      const target = this.first;
      this.first = target.next;
      return target.value;
    }
  };
  var JS = class {
    generateSecretKey() {
      return schnorr.utils.randomPrivateKey();
    }
    getPublicKey(secretKey) {
      return bytesToHex2(schnorr.getPublicKey(secretKey));
    }
    finalizeEvent(t, secretKey) {
      const event = t;
      event.pubkey = bytesToHex2(schnorr.getPublicKey(secretKey));
      event.id = getEventHash(event);
      event.sig = bytesToHex2(schnorr.sign(getEventHash(event), secretKey));
      event[verifiedSymbol] = true;
      return event;
    }
    verifyEvent(event) {
      if (typeof event[verifiedSymbol] === "boolean")
        return event[verifiedSymbol];
      const hash3 = getEventHash(event);
      if (hash3 !== event.id) {
        event[verifiedSymbol] = false;
        return false;
      }
      try {
        const valid = schnorr.verify(event.sig, hash3, event.pubkey);
        event[verifiedSymbol] = valid;
        return valid;
      } catch (err) {
        event[verifiedSymbol] = false;
        return false;
      }
    }
  };
  function serializeEvent(evt) {
    if (!validateEvent(evt))
      throw new Error("can't serialize event with wrong or missing properties");
    return JSON.stringify([0, evt.pubkey, evt.created_at, evt.kind, evt.tags, evt.content]);
  }
  function getEventHash(event) {
    let eventHash = sha2562(utf8Encoder.encode(serializeEvent(event)));
    return bytesToHex2(eventHash);
  }
  var i = new JS();
  var generateSecretKey = i.generateSecretKey;
  var getPublicKey = i.getPublicKey;
  var finalizeEvent = i.finalizeEvent;
  var verifyEvent = i.verifyEvent;
  var kinds_exports = {};
  __export2(kinds_exports, {
    Application: () => Application,
    BadgeAward: () => BadgeAward,
    BadgeDefinition: () => BadgeDefinition,
    BlockedRelaysList: () => BlockedRelaysList,
    BookmarkList: () => BookmarkList,
    Bookmarksets: () => Bookmarksets,
    Calendar: () => Calendar,
    CalendarEventRSVP: () => CalendarEventRSVP,
    ChannelCreation: () => ChannelCreation,
    ChannelHideMessage: () => ChannelHideMessage,
    ChannelMessage: () => ChannelMessage,
    ChannelMetadata: () => ChannelMetadata,
    ChannelMuteUser: () => ChannelMuteUser,
    ClassifiedListing: () => ClassifiedListing,
    ClientAuth: () => ClientAuth,
    CommunitiesList: () => CommunitiesList,
    CommunityDefinition: () => CommunityDefinition,
    CommunityPostApproval: () => CommunityPostApproval,
    Contacts: () => Contacts,
    CreateOrUpdateProduct: () => CreateOrUpdateProduct,
    CreateOrUpdateStall: () => CreateOrUpdateStall,
    Curationsets: () => Curationsets,
    Date: () => Date2,
    DirectMessageRelaysList: () => DirectMessageRelaysList,
    DraftClassifiedListing: () => DraftClassifiedListing,
    DraftLong: () => DraftLong,
    Emojisets: () => Emojisets,
    EncryptedDirectMessage: () => EncryptedDirectMessage,
    EventDeletion: () => EventDeletion,
    FileMetadata: () => FileMetadata,
    FileServerPreference: () => FileServerPreference,
    Followsets: () => Followsets,
    GenericRepost: () => GenericRepost,
    Genericlists: () => Genericlists,
    GiftWrap: () => GiftWrap,
    HTTPAuth: () => HTTPAuth,
    Handlerinformation: () => Handlerinformation,
    Handlerrecommendation: () => Handlerrecommendation,
    Highlights: () => Highlights,
    InterestsList: () => InterestsList,
    Interestsets: () => Interestsets,
    JobFeedback: () => JobFeedback,
    JobRequest: () => JobRequest,
    JobResult: () => JobResult,
    Label: () => Label,
    LightningPubRPC: () => LightningPubRPC,
    LiveChatMessage: () => LiveChatMessage,
    LiveEvent: () => LiveEvent,
    LongFormArticle: () => LongFormArticle,
    Metadata: () => Metadata,
    Mutelist: () => Mutelist,
    NWCWalletInfo: () => NWCWalletInfo,
    NWCWalletRequest: () => NWCWalletRequest,
    NWCWalletResponse: () => NWCWalletResponse,
    NostrConnect: () => NostrConnect,
    OpenTimestamps: () => OpenTimestamps,
    Pinlist: () => Pinlist,
    PrivateDirectMessage: () => PrivateDirectMessage,
    ProblemTracker: () => ProblemTracker,
    ProfileBadges: () => ProfileBadges,
    PublicChatsList: () => PublicChatsList,
    Reaction: () => Reaction,
    RecommendRelay: () => RecommendRelay,
    RelayList: () => RelayList,
    Relaysets: () => Relaysets,
    Report: () => Report,
    Reporting: () => Reporting,
    Repost: () => Repost,
    Seal: () => Seal,
    SearchRelaysList: () => SearchRelaysList,
    ShortTextNote: () => ShortTextNote,
    Time: () => Time,
    UserEmojiList: () => UserEmojiList,
    UserStatuses: () => UserStatuses,
    Zap: () => Zap,
    ZapGoal: () => ZapGoal,
    ZapRequest: () => ZapRequest,
    classifyKind: () => classifyKind,
    isEphemeralKind: () => isEphemeralKind,
    isKind: () => isKind,
    isParameterizedReplaceableKind: () => isParameterizedReplaceableKind,
    isRegularKind: () => isRegularKind,
    isReplaceableKind: () => isReplaceableKind
  });
  function isRegularKind(kind) {
    return 1e3 <= kind && kind < 1e4 || [1, 2, 4, 5, 6, 7, 8, 16, 40, 41, 42, 43, 44].includes(kind);
  }
  function isReplaceableKind(kind) {
    return [0, 3].includes(kind) || 1e4 <= kind && kind < 2e4;
  }
  function isEphemeralKind(kind) {
    return 2e4 <= kind && kind < 3e4;
  }
  function isParameterizedReplaceableKind(kind) {
    return 3e4 <= kind && kind < 4e4;
  }
  function classifyKind(kind) {
    if (isRegularKind(kind))
      return "regular";
    if (isReplaceableKind(kind))
      return "replaceable";
    if (isEphemeralKind(kind))
      return "ephemeral";
    if (isParameterizedReplaceableKind(kind))
      return "parameterized";
    return "unknown";
  }
  function isKind(event, kind) {
    const kindAsArray = kind instanceof Array ? kind : [kind];
    return validateEvent(event) && kindAsArray.includes(event.kind) || false;
  }
  var Metadata = 0;
  var ShortTextNote = 1;
  var RecommendRelay = 2;
  var Contacts = 3;
  var EncryptedDirectMessage = 4;
  var EventDeletion = 5;
  var Repost = 6;
  var Reaction = 7;
  var BadgeAward = 8;
  var Seal = 13;
  var PrivateDirectMessage = 14;
  var GenericRepost = 16;
  var ChannelCreation = 40;
  var ChannelMetadata = 41;
  var ChannelMessage = 42;
  var ChannelHideMessage = 43;
  var ChannelMuteUser = 44;
  var OpenTimestamps = 1040;
  var GiftWrap = 1059;
  var FileMetadata = 1063;
  var LiveChatMessage = 1311;
  var ProblemTracker = 1971;
  var Report = 1984;
  var Reporting = 1984;
  var Label = 1985;
  var CommunityPostApproval = 4550;
  var JobRequest = 5999;
  var JobResult = 6999;
  var JobFeedback = 7e3;
  var ZapGoal = 9041;
  var ZapRequest = 9734;
  var Zap = 9735;
  var Highlights = 9802;
  var Mutelist = 1e4;
  var Pinlist = 10001;
  var RelayList = 10002;
  var BookmarkList = 10003;
  var CommunitiesList = 10004;
  var PublicChatsList = 10005;
  var BlockedRelaysList = 10006;
  var SearchRelaysList = 10007;
  var InterestsList = 10015;
  var UserEmojiList = 10030;
  var DirectMessageRelaysList = 10050;
  var FileServerPreference = 10096;
  var NWCWalletInfo = 13194;
  var LightningPubRPC = 21e3;
  var ClientAuth = 22242;
  var NWCWalletRequest = 23194;
  var NWCWalletResponse = 23195;
  var NostrConnect = 24133;
  var HTTPAuth = 27235;
  var Followsets = 3e4;
  var Genericlists = 30001;
  var Relaysets = 30002;
  var Bookmarksets = 30003;
  var Curationsets = 30004;
  var ProfileBadges = 30008;
  var BadgeDefinition = 30009;
  var Interestsets = 30015;
  var CreateOrUpdateStall = 30017;
  var CreateOrUpdateProduct = 30018;
  var LongFormArticle = 30023;
  var DraftLong = 30024;
  var Emojisets = 30030;
  var Application = 30078;
  var LiveEvent = 30311;
  var UserStatuses = 30315;
  var ClassifiedListing = 30402;
  var DraftClassifiedListing = 30403;
  var Date2 = 31922;
  var Time = 31923;
  var Calendar = 31924;
  var CalendarEventRSVP = 31925;
  var Handlerrecommendation = 31989;
  var Handlerinformation = 31990;
  var CommunityDefinition = 34550;
  function matchFilter(filter, event) {
    if (filter.ids && filter.ids.indexOf(event.id) === -1) {
      return false;
    }
    if (filter.kinds && filter.kinds.indexOf(event.kind) === -1) {
      return false;
    }
    if (filter.authors && filter.authors.indexOf(event.pubkey) === -1) {
      return false;
    }
    for (let f in filter) {
      if (f[0] === "#") {
        let tagName = f.slice(1);
        let values = filter[`#${tagName}`];
        if (values && !event.tags.find(([t, v]) => t === f.slice(1) && values.indexOf(v) !== -1))
          return false;
      }
    }
    if (filter.since && event.created_at < filter.since)
      return false;
    if (filter.until && event.created_at > filter.until)
      return false;
    return true;
  }
  function matchFilters(filters, event) {
    for (let i2 = 0; i2 < filters.length; i2++) {
      if (matchFilter(filters[i2], event)) {
        return true;
      }
    }
    return false;
  }
  var fakejson_exports = {};
  __export2(fakejson_exports, {
    getHex64: () => getHex64,
    getInt: () => getInt,
    getSubscriptionId: () => getSubscriptionId,
    matchEventId: () => matchEventId,
    matchEventKind: () => matchEventKind,
    matchEventPubkey: () => matchEventPubkey
  });
  function getHex64(json, field) {
    let len = field.length + 3;
    let idx = json.indexOf(`"${field}":`) + len;
    let s = json.slice(idx).indexOf(`"`) + idx + 1;
    return json.slice(s, s + 64);
  }
  function getInt(json, field) {
    let len = field.length;
    let idx = json.indexOf(`"${field}":`) + len + 3;
    let sliced = json.slice(idx);
    let end = Math.min(sliced.indexOf(","), sliced.indexOf("}"));
    return parseInt(sliced.slice(0, end), 10);
  }
  function getSubscriptionId(json) {
    let idx = json.slice(0, 22).indexOf(`"EVENT"`);
    if (idx === -1)
      return null;
    let pstart = json.slice(idx + 7 + 1).indexOf(`"`);
    if (pstart === -1)
      return null;
    let start = idx + 7 + 1 + pstart;
    let pend = json.slice(start + 1, 80).indexOf(`"`);
    if (pend === -1)
      return null;
    let end = start + 1 + pend;
    return json.slice(start + 1, end);
  }
  function matchEventId(json, id) {
    return id === getHex64(json, "id");
  }
  function matchEventPubkey(json, pubkey) {
    return pubkey === getHex64(json, "pubkey");
  }
  function matchEventKind(json, kind) {
    return kind === getInt(json, "kind");
  }
  var nip42_exports = {};
  __export2(nip42_exports, {
    makeAuthEvent: () => makeAuthEvent
  });
  function makeAuthEvent(relayURL, challenge3) {
    return {
      kind: ClientAuth,
      created_at: Math.floor(Date.now() / 1e3),
      tags: [
        ["relay", relayURL],
        ["challenge", challenge3]
      ],
      content: ""
    };
  }
  var _WebSocket;
  try {
    _WebSocket = WebSocket;
  } catch {
  }
  var _WebSocket2;
  try {
    _WebSocket2 = WebSocket;
  } catch {
  }
  var nip19_exports = {};
  __export2(nip19_exports, {
    BECH32_REGEX: () => BECH32_REGEX,
    Bech32MaxSize: () => Bech32MaxSize,
    NostrTypeGuard: () => NostrTypeGuard,
    decode: () => decode,
    encodeBytes: () => encodeBytes,
    naddrEncode: () => naddrEncode,
    neventEncode: () => neventEncode,
    noteEncode: () => noteEncode,
    nprofileEncode: () => nprofileEncode,
    npubEncode: () => npubEncode,
    nsecEncode: () => nsecEncode
  });
  var NostrTypeGuard = {
    isNProfile: (value) => /^nprofile1[a-z\d]+$/.test(value || ""),
    isNEvent: (value) => /^nevent1[a-z\d]+$/.test(value || ""),
    isNAddr: (value) => /^naddr1[a-z\d]+$/.test(value || ""),
    isNSec: (value) => /^nsec1[a-z\d]{58}$/.test(value || ""),
    isNPub: (value) => /^npub1[a-z\d]{58}$/.test(value || ""),
    isNote: (value) => /^note1[a-z\d]+$/.test(value || ""),
    isNcryptsec: (value) => /^ncryptsec1[a-z\d]+$/.test(value || "")
  };
  var Bech32MaxSize = 5e3;
  var BECH32_REGEX = /[\x21-\x7E]{1,83}1[023456789acdefghjklmnpqrstuvwxyz]{6,}/;
  function integerToUint8Array(number4) {
    const uint8Array = new Uint8Array(4);
    uint8Array[0] = number4 >> 24 & 255;
    uint8Array[1] = number4 >> 16 & 255;
    uint8Array[2] = number4 >> 8 & 255;
    uint8Array[3] = number4 & 255;
    return uint8Array;
  }
  function decode(nip19) {
    let { prefix, words } = bech32.decode(nip19, Bech32MaxSize);
    let data = new Uint8Array(bech32.fromWords(words));
    switch (prefix) {
      case "nprofile": {
        let tlv = parseTLV(data);
        if (!tlv[0]?.[0])
          throw new Error("missing TLV 0 for nprofile");
        if (tlv[0][0].length !== 32)
          throw new Error("TLV 0 should be 32 bytes");
        return {
          type: "nprofile",
          data: {
            pubkey: bytesToHex2(tlv[0][0]),
            relays: tlv[1] ? tlv[1].map((d4) => utf8Decoder.decode(d4)) : []
          }
        };
      }
      case "nevent": {
        let tlv = parseTLV(data);
        if (!tlv[0]?.[0])
          throw new Error("missing TLV 0 for nevent");
        if (tlv[0][0].length !== 32)
          throw new Error("TLV 0 should be 32 bytes");
        if (tlv[2] && tlv[2][0].length !== 32)
          throw new Error("TLV 2 should be 32 bytes");
        if (tlv[3] && tlv[3][0].length !== 4)
          throw new Error("TLV 3 should be 4 bytes");
        return {
          type: "nevent",
          data: {
            id: bytesToHex2(tlv[0][0]),
            relays: tlv[1] ? tlv[1].map((d4) => utf8Decoder.decode(d4)) : [],
            author: tlv[2]?.[0] ? bytesToHex2(tlv[2][0]) : void 0,
            kind: tlv[3]?.[0] ? parseInt(bytesToHex2(tlv[3][0]), 16) : void 0
          }
        };
      }
      case "naddr": {
        let tlv = parseTLV(data);
        if (!tlv[0]?.[0])
          throw new Error("missing TLV 0 for naddr");
        if (!tlv[2]?.[0])
          throw new Error("missing TLV 2 for naddr");
        if (tlv[2][0].length !== 32)
          throw new Error("TLV 2 should be 32 bytes");
        if (!tlv[3]?.[0])
          throw new Error("missing TLV 3 for naddr");
        if (tlv[3][0].length !== 4)
          throw new Error("TLV 3 should be 4 bytes");
        return {
          type: "naddr",
          data: {
            identifier: utf8Decoder.decode(tlv[0][0]),
            pubkey: bytesToHex2(tlv[2][0]),
            kind: parseInt(bytesToHex2(tlv[3][0]), 16),
            relays: tlv[1] ? tlv[1].map((d4) => utf8Decoder.decode(d4)) : []
          }
        };
      }
      case "nsec":
        return { type: prefix, data };
      case "npub":
      case "note":
        return { type: prefix, data: bytesToHex2(data) };
      default:
        throw new Error(`unknown prefix ${prefix}`);
    }
  }
  function parseTLV(data) {
    let result = {};
    let rest = data;
    while (rest.length > 0) {
      let t = rest[0];
      let l = rest[1];
      let v = rest.slice(2, 2 + l);
      rest = rest.slice(2 + l);
      if (v.length < l)
        throw new Error(`not enough data to read on TLV ${t}`);
      result[t] = result[t] || [];
      result[t].push(v);
    }
    return result;
  }
  function nsecEncode(key) {
    return encodeBytes("nsec", key);
  }
  function npubEncode(hex2) {
    return encodeBytes("npub", hexToBytes2(hex2));
  }
  function noteEncode(hex2) {
    return encodeBytes("note", hexToBytes2(hex2));
  }
  function encodeBech32(prefix, data) {
    let words = bech32.toWords(data);
    return bech32.encode(prefix, words, Bech32MaxSize);
  }
  function encodeBytes(prefix, bytes4) {
    return encodeBech32(prefix, bytes4);
  }
  function nprofileEncode(profile) {
    let data = encodeTLV({
      0: [hexToBytes2(profile.pubkey)],
      1: (profile.relays || []).map((url) => utf8Encoder.encode(url))
    });
    return encodeBech32("nprofile", data);
  }
  function neventEncode(event) {
    let kindArray;
    if (event.kind !== void 0) {
      kindArray = integerToUint8Array(event.kind);
    }
    let data = encodeTLV({
      0: [hexToBytes2(event.id)],
      1: (event.relays || []).map((url) => utf8Encoder.encode(url)),
      2: event.author ? [hexToBytes2(event.author)] : [],
      3: kindArray ? [new Uint8Array(kindArray)] : []
    });
    return encodeBech32("nevent", data);
  }
  function naddrEncode(addr) {
    let kind = new ArrayBuffer(4);
    new DataView(kind).setUint32(0, addr.kind, false);
    let data = encodeTLV({
      0: [utf8Encoder.encode(addr.identifier)],
      1: (addr.relays || []).map((url) => utf8Encoder.encode(url)),
      2: [hexToBytes2(addr.pubkey)],
      3: [new Uint8Array(kind)]
    });
    return encodeBech32("naddr", data);
  }
  function encodeTLV(tlv) {
    let entries = [];
    Object.entries(tlv).reverse().forEach(([t, vs]) => {
      vs.forEach((v) => {
        let entry = new Uint8Array(v.length + 2);
        entry.set([parseInt(t)], 0);
        entry.set([v.length], 1);
        entry.set(v, 2);
        entries.push(entry);
      });
    });
    return concatBytes3(...entries);
  }
  var nip04_exports = {};
  __export2(nip04_exports, {
    decrypt: () => decrypt2,
    encrypt: () => encrypt2
  });
  async function encrypt2(secretKey, pubkey, text) {
    const privkey = secretKey instanceof Uint8Array ? bytesToHex2(secretKey) : secretKey;
    const key = secp256k1.getSharedSecret(privkey, "02" + pubkey);
    const normalizedKey = getNormalizedX(key);
    let iv = Uint8Array.from(randomBytes2(16));
    let plaintext = utf8Encoder.encode(text);
    let ciphertext = cbc(normalizedKey, iv).encrypt(plaintext);
    let ctb64 = base64.encode(new Uint8Array(ciphertext));
    let ivb64 = base64.encode(new Uint8Array(iv.buffer));
    return `${ctb64}?iv=${ivb64}`;
  }
  async function decrypt2(secretKey, pubkey, data) {
    const privkey = secretKey instanceof Uint8Array ? bytesToHex2(secretKey) : secretKey;
    let [ctb64, ivb64] = data.split("?iv=");
    let key = secp256k1.getSharedSecret(privkey, "02" + pubkey);
    let normalizedKey = getNormalizedX(key);
    let iv = base64.decode(ivb64);
    let ciphertext = base64.decode(ctb64);
    let plaintext = cbc(normalizedKey, iv).decrypt(ciphertext);
    return utf8Decoder.decode(plaintext);
  }
  function getNormalizedX(key) {
    return key.slice(1, 33);
  }
  var nip05_exports = {};
  __export2(nip05_exports, {
    NIP05_REGEX: () => NIP05_REGEX,
    isNip05: () => isNip05,
    isValid: () => isValid,
    queryProfile: () => queryProfile,
    searchDomain: () => searchDomain,
    useFetchImplementation: () => useFetchImplementation
  });
  var NIP05_REGEX = /^(?:([\w.+-]+)@)?([\w_-]+(\.[\w_-]+)+)$/;
  var isNip05 = (value) => NIP05_REGEX.test(value || "");
  var _fetch;
  try {
    _fetch = fetch;
  } catch (_) {
    null;
  }
  function useFetchImplementation(fetchImplementation) {
    _fetch = fetchImplementation;
  }
  async function searchDomain(domain, query = "") {
    try {
      const url = `https://${domain}/.well-known/nostr.json?name=${query}`;
      const res = await _fetch(url, { redirect: "manual" });
      if (res.status !== 200) {
        throw Error("Wrong response code");
      }
      const json = await res.json();
      return json.names;
    } catch (_) {
      return {};
    }
  }
  async function queryProfile(fullname) {
    const match = fullname.match(NIP05_REGEX);
    if (!match)
      return null;
    const [, name = "_", domain] = match;
    try {
      const url = `https://${domain}/.well-known/nostr.json?name=${name}`;
      const res = await _fetch(url, { redirect: "manual" });
      if (res.status !== 200) {
        throw Error("Wrong response code");
      }
      const json = await res.json();
      const pubkey = json.names[name];
      return pubkey ? { pubkey, relays: json.relays?.[pubkey] } : null;
    } catch (_e) {
      return null;
    }
  }
  async function isValid(pubkey, nip05) {
    const res = await queryProfile(nip05);
    return res ? res.pubkey === pubkey : false;
  }
  var nip10_exports = {};
  __export2(nip10_exports, {
    parse: () => parse
  });
  function parse(event) {
    const result = {
      reply: void 0,
      root: void 0,
      mentions: [],
      profiles: [],
      quotes: []
    };
    let maybeParent;
    let maybeRoot;
    for (let i2 = event.tags.length - 1; i2 >= 0; i2--) {
      const tag = event.tags[i2];
      if (tag[0] === "e" && tag[1]) {
        const [_, eTagEventId, eTagRelayUrl, eTagMarker, eTagAuthor] = tag;
        const eventPointer = {
          id: eTagEventId,
          relays: eTagRelayUrl ? [eTagRelayUrl] : [],
          author: eTagAuthor
        };
        if (eTagMarker === "root") {
          result.root = eventPointer;
          continue;
        }
        if (eTagMarker === "reply") {
          result.reply = eventPointer;
          continue;
        }
        if (eTagMarker === "mention") {
          result.mentions.push(eventPointer);
          continue;
        }
        if (!maybeParent) {
          maybeParent = eventPointer;
        } else {
          maybeRoot = eventPointer;
        }
        result.mentions.push(eventPointer);
        continue;
      }
      if (tag[0] === "q" && tag[1]) {
        const [_, eTagEventId, eTagRelayUrl] = tag;
        result.quotes.push({
          id: eTagEventId,
          relays: eTagRelayUrl ? [eTagRelayUrl] : []
        });
      }
      if (tag[0] === "p" && tag[1]) {
        result.profiles.push({
          pubkey: tag[1],
          relays: tag[2] ? [tag[2]] : []
        });
        continue;
      }
    }
    if (!result.root) {
      result.root = maybeRoot || maybeParent || result.reply;
    }
    if (!result.reply) {
      result.reply = maybeParent || result.root;
    }
    ;
    [result.reply, result.root].forEach((ref) => {
      if (!ref)
        return;
      let idx = result.mentions.indexOf(ref);
      if (idx !== -1) {
        result.mentions.splice(idx, 1);
      }
      if (ref.author) {
        let author = result.profiles.find((p) => p.pubkey === ref.author);
        if (author && author.relays) {
          if (!ref.relays) {
            ref.relays = [];
          }
          author.relays.forEach((url) => {
            if (ref.relays?.indexOf(url) === -1)
              ref.relays.push(url);
          });
          author.relays = ref.relays;
        }
      }
    });
    result.mentions.forEach((ref) => {
      if (ref.author) {
        let author = result.profiles.find((p) => p.pubkey === ref.author);
        if (author && author.relays) {
          if (!ref.relays) {
            ref.relays = [];
          }
          author.relays.forEach((url) => {
            if (ref.relays.indexOf(url) === -1)
              ref.relays.push(url);
          });
          author.relays = ref.relays;
        }
      }
    });
    return result;
  }
  var nip11_exports = {};
  __export2(nip11_exports, {
    fetchRelayInformation: () => fetchRelayInformation,
    useFetchImplementation: () => useFetchImplementation2
  });
  var _fetch2;
  try {
    _fetch2 = fetch;
  } catch {
  }
  function useFetchImplementation2(fetchImplementation) {
    _fetch2 = fetchImplementation;
  }
  async function fetchRelayInformation(url) {
    return await (await fetch(url.replace("ws://", "http://").replace("wss://", "https://"), {
      headers: { Accept: "application/nostr+json" }
    })).json();
  }
  var nip13_exports = {};
  __export2(nip13_exports, {
    fastEventHash: () => fastEventHash,
    getPow: () => getPow,
    minePow: () => minePow
  });
  function getPow(hex2) {
    let count = 0;
    for (let i2 = 0; i2 < 64; i2 += 8) {
      const nibble = parseInt(hex2.substring(i2, i2 + 8), 16);
      if (nibble === 0) {
        count += 32;
      } else {
        count += Math.clz32(nibble);
        break;
      }
    }
    return count;
  }
  function minePow(unsigned, difficulty) {
    let count = 0;
    const event = unsigned;
    const tag = ["nonce", count.toString(), difficulty.toString()];
    event.tags.push(tag);
    while (true) {
      const now22 = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
      if (now22 !== event.created_at) {
        count = 0;
        event.created_at = now22;
      }
      tag[1] = (++count).toString();
      event.id = fastEventHash(event);
      if (getPow(event.id) >= difficulty) {
        break;
      }
    }
    return event;
  }
  function fastEventHash(evt) {
    return bytesToHex2(
      sha2562(utf8Encoder.encode(JSON.stringify([0, evt.pubkey, evt.created_at, evt.kind, evt.tags, evt.content])))
    );
  }
  var nip18_exports = {};
  __export2(nip18_exports, {
    finishRepostEvent: () => finishRepostEvent,
    getRepostedEvent: () => getRepostedEvent,
    getRepostedEventPointer: () => getRepostedEventPointer
  });
  function finishRepostEvent(t, reposted, relayUrl, privateKey) {
    return finalizeEvent(
      {
        kind: Repost,
        tags: [...t.tags ?? [], ["e", reposted.id, relayUrl], ["p", reposted.pubkey]],
        content: t.content === "" ? "" : JSON.stringify(reposted),
        created_at: t.created_at
      },
      privateKey
    );
  }
  function getRepostedEventPointer(event) {
    if (event.kind !== Repost) {
      return void 0;
    }
    let lastETag;
    let lastPTag;
    for (let i2 = event.tags.length - 1; i2 >= 0 && (lastETag === void 0 || lastPTag === void 0); i2--) {
      const tag = event.tags[i2];
      if (tag.length >= 2) {
        if (tag[0] === "e" && lastETag === void 0) {
          lastETag = tag;
        } else if (tag[0] === "p" && lastPTag === void 0) {
          lastPTag = tag;
        }
      }
    }
    if (lastETag === void 0) {
      return void 0;
    }
    return {
      id: lastETag[1],
      relays: [lastETag[2], lastPTag?.[2]].filter((x) => typeof x === "string"),
      author: lastPTag?.[1]
    };
  }
  function getRepostedEvent(event, { skipVerification } = {}) {
    const pointer = getRepostedEventPointer(event);
    if (pointer === void 0 || event.content === "") {
      return void 0;
    }
    let repostedEvent;
    try {
      repostedEvent = JSON.parse(event.content);
    } catch (error) {
      return void 0;
    }
    if (repostedEvent.id !== pointer.id) {
      return void 0;
    }
    if (!skipVerification && !verifyEvent(repostedEvent)) {
      return void 0;
    }
    return repostedEvent;
  }
  var nip21_exports = {};
  __export2(nip21_exports, {
    NOSTR_URI_REGEX: () => NOSTR_URI_REGEX,
    parse: () => parse2,
    test: () => test
  });
  var NOSTR_URI_REGEX = new RegExp(`nostr:(${BECH32_REGEX.source})`);
  function test(value) {
    return typeof value === "string" && new RegExp(`^${NOSTR_URI_REGEX.source}$`).test(value);
  }
  function parse2(uri) {
    const match = uri.match(new RegExp(`^${NOSTR_URI_REGEX.source}$`));
    if (!match)
      throw new Error(`Invalid Nostr URI: ${uri}`);
    return {
      uri: match[0],
      value: match[1],
      decoded: decode(match[1])
    };
  }
  var nip25_exports = {};
  __export2(nip25_exports, {
    finishReactionEvent: () => finishReactionEvent,
    getReactedEventPointer: () => getReactedEventPointer
  });
  function finishReactionEvent(t, reacted, privateKey) {
    const inheritedTags = reacted.tags.filter((tag) => tag.length >= 2 && (tag[0] === "e" || tag[0] === "p"));
    return finalizeEvent(
      {
        ...t,
        kind: Reaction,
        tags: [...t.tags ?? [], ...inheritedTags, ["e", reacted.id], ["p", reacted.pubkey]],
        content: t.content ?? "+"
      },
      privateKey
    );
  }
  function getReactedEventPointer(event) {
    if (event.kind !== Reaction) {
      return void 0;
    }
    let lastETag;
    let lastPTag;
    for (let i2 = event.tags.length - 1; i2 >= 0 && (lastETag === void 0 || lastPTag === void 0); i2--) {
      const tag = event.tags[i2];
      if (tag.length >= 2) {
        if (tag[0] === "e" && lastETag === void 0) {
          lastETag = tag;
        } else if (tag[0] === "p" && lastPTag === void 0) {
          lastPTag = tag;
        }
      }
    }
    if (lastETag === void 0 || lastPTag === void 0) {
      return void 0;
    }
    return {
      id: lastETag[1],
      relays: [lastETag[2], lastPTag[2]].filter((x) => x !== void 0),
      author: lastPTag[1]
    };
  }
  var nip27_exports = {};
  __export2(nip27_exports, {
    matchAll: () => matchAll,
    regex: () => regex,
    replaceAll: () => replaceAll
  });
  var regex = () => new RegExp(`\\b${NOSTR_URI_REGEX.source}\\b`, "g");
  function* matchAll(content) {
    const matches = content.matchAll(regex());
    for (const match of matches) {
      try {
        const [uri, value] = match;
        yield {
          uri,
          value,
          decoded: decode(value),
          start: match.index,
          end: match.index + uri.length
        };
      } catch (_e) {
      }
    }
  }
  function replaceAll(content, replacer) {
    return content.replaceAll(regex(), (uri, value) => {
      return replacer({
        uri,
        value,
        decoded: decode(value)
      });
    });
  }
  var nip28_exports = {};
  __export2(nip28_exports, {
    channelCreateEvent: () => channelCreateEvent,
    channelHideMessageEvent: () => channelHideMessageEvent,
    channelMessageEvent: () => channelMessageEvent,
    channelMetadataEvent: () => channelMetadataEvent,
    channelMuteUserEvent: () => channelMuteUserEvent
  });
  var channelCreateEvent = (t, privateKey) => {
    let content;
    if (typeof t.content === "object") {
      content = JSON.stringify(t.content);
    } else if (typeof t.content === "string") {
      content = t.content;
    } else {
      return void 0;
    }
    return finalizeEvent(
      {
        kind: ChannelCreation,
        tags: [...t.tags ?? []],
        content,
        created_at: t.created_at
      },
      privateKey
    );
  };
  var channelMetadataEvent = (t, privateKey) => {
    let content;
    if (typeof t.content === "object") {
      content = JSON.stringify(t.content);
    } else if (typeof t.content === "string") {
      content = t.content;
    } else {
      return void 0;
    }
    return finalizeEvent(
      {
        kind: ChannelMetadata,
        tags: [["e", t.channel_create_event_id], ...t.tags ?? []],
        content,
        created_at: t.created_at
      },
      privateKey
    );
  };
  var channelMessageEvent = (t, privateKey) => {
    const tags = [["e", t.channel_create_event_id, t.relay_url, "root"]];
    if (t.reply_to_channel_message_event_id) {
      tags.push(["e", t.reply_to_channel_message_event_id, t.relay_url, "reply"]);
    }
    return finalizeEvent(
      {
        kind: ChannelMessage,
        tags: [...tags, ...t.tags ?? []],
        content: t.content,
        created_at: t.created_at
      },
      privateKey
    );
  };
  var channelHideMessageEvent = (t, privateKey) => {
    let content;
    if (typeof t.content === "object") {
      content = JSON.stringify(t.content);
    } else if (typeof t.content === "string") {
      content = t.content;
    } else {
      return void 0;
    }
    return finalizeEvent(
      {
        kind: ChannelHideMessage,
        tags: [["e", t.channel_message_event_id], ...t.tags ?? []],
        content,
        created_at: t.created_at
      },
      privateKey
    );
  };
  var channelMuteUserEvent = (t, privateKey) => {
    let content;
    if (typeof t.content === "object") {
      content = JSON.stringify(t.content);
    } else if (typeof t.content === "string") {
      content = t.content;
    } else {
      return void 0;
    }
    return finalizeEvent(
      {
        kind: ChannelMuteUser,
        tags: [["p", t.pubkey_to_mute], ...t.tags ?? []],
        content,
        created_at: t.created_at
      },
      privateKey
    );
  };
  var nip30_exports = {};
  __export2(nip30_exports, {
    EMOJI_SHORTCODE_REGEX: () => EMOJI_SHORTCODE_REGEX,
    matchAll: () => matchAll2,
    regex: () => regex2,
    replaceAll: () => replaceAll2
  });
  var EMOJI_SHORTCODE_REGEX = /:(\w+):/;
  var regex2 = () => new RegExp(`\\B${EMOJI_SHORTCODE_REGEX.source}\\B`, "g");
  function* matchAll2(content) {
    const matches = content.matchAll(regex2());
    for (const match of matches) {
      try {
        const [shortcode, name] = match;
        yield {
          shortcode,
          name,
          start: match.index,
          end: match.index + shortcode.length
        };
      } catch (_e) {
      }
    }
  }
  function replaceAll2(content, replacer) {
    return content.replaceAll(regex2(), (shortcode, name) => {
      return replacer({
        shortcode,
        name
      });
    });
  }
  var nip39_exports = {};
  __export2(nip39_exports, {
    useFetchImplementation: () => useFetchImplementation3,
    validateGithub: () => validateGithub
  });
  var _fetch3;
  try {
    _fetch3 = fetch;
  } catch {
  }
  function useFetchImplementation3(fetchImplementation) {
    _fetch3 = fetchImplementation;
  }
  async function validateGithub(pubkey, username, proof) {
    try {
      let res = await (await _fetch3(`https://gist.github.com/${username}/${proof}/raw`)).text();
      return res === `Verifying that I control the following Nostr public key: ${pubkey}`;
    } catch (_) {
      return false;
    }
  }
  var nip44_exports = {};
  __export2(nip44_exports, {
    decrypt: () => decrypt22,
    encrypt: () => encrypt22,
    getConversationKey: () => getConversationKey,
    v2: () => v2
  });
  var minPlaintextSize = 1;
  var maxPlaintextSize = 65535;
  function getConversationKey(privkeyA, pubkeyB) {
    const sharedX = secp256k1.getSharedSecret(privkeyA, "02" + pubkeyB).subarray(1, 33);
    return extract(sha2562, sharedX, "nip44-v2");
  }
  function getMessageKeys(conversationKey, nonce) {
    const keys = expand(sha2562, conversationKey, nonce, 76);
    return {
      chacha_key: keys.subarray(0, 32),
      chacha_nonce: keys.subarray(32, 44),
      hmac_key: keys.subarray(44, 76)
    };
  }
  function calcPaddedLen(len) {
    if (!Number.isSafeInteger(len) || len < 1)
      throw new Error("expected positive integer");
    if (len <= 32)
      return 32;
    const nextPower = 1 << Math.floor(Math.log2(len - 1)) + 1;
    const chunk = nextPower <= 256 ? 32 : nextPower / 8;
    return chunk * (Math.floor((len - 1) / chunk) + 1);
  }
  function writeU16BE(num2) {
    if (!Number.isSafeInteger(num2) || num2 < minPlaintextSize || num2 > maxPlaintextSize)
      throw new Error("invalid plaintext size: must be between 1 and 65535 bytes");
    const arr = new Uint8Array(2);
    new DataView(arr.buffer).setUint16(0, num2, false);
    return arr;
  }
  function pad(plaintext) {
    const unpadded = utf8Encoder.encode(plaintext);
    const unpaddedLen = unpadded.length;
    const prefix = writeU16BE(unpaddedLen);
    const suffix = new Uint8Array(calcPaddedLen(unpaddedLen) - unpaddedLen);
    return concatBytes3(prefix, unpadded, suffix);
  }
  function unpad(padded) {
    const unpaddedLen = new DataView(padded.buffer).getUint16(0);
    const unpadded = padded.subarray(2, 2 + unpaddedLen);
    if (unpaddedLen < minPlaintextSize || unpaddedLen > maxPlaintextSize || unpadded.length !== unpaddedLen || padded.length !== 2 + calcPaddedLen(unpaddedLen))
      throw new Error("invalid padding");
    return utf8Decoder.decode(unpadded);
  }
  function hmacAad(key, message, aad) {
    if (aad.length !== 32)
      throw new Error("AAD associated data must be 32 bytes");
    const combined = concatBytes3(aad, message);
    return hmac2(sha2562, key, combined);
  }
  function decodePayload(payload) {
    if (typeof payload !== "string")
      throw new Error("payload must be a valid string");
    const plen = payload.length;
    if (plen < 132 || plen > 87472)
      throw new Error("invalid payload length: " + plen);
    if (payload[0] === "#")
      throw new Error("unknown encryption version");
    let data;
    try {
      data = base64.decode(payload);
    } catch (error) {
      throw new Error("invalid base64: " + error.message);
    }
    const dlen = data.length;
    if (dlen < 99 || dlen > 65603)
      throw new Error("invalid data length: " + dlen);
    const vers = data[0];
    if (vers !== 2)
      throw new Error("unknown encryption version " + vers);
    return {
      nonce: data.subarray(1, 33),
      ciphertext: data.subarray(33, -32),
      mac: data.subarray(-32)
    };
  }
  function encrypt22(plaintext, conversationKey, nonce = randomBytes2(32)) {
    const { chacha_key, chacha_nonce, hmac_key } = getMessageKeys(conversationKey, nonce);
    const padded = pad(plaintext);
    const ciphertext = chacha20(chacha_key, chacha_nonce, padded);
    const mac = hmacAad(hmac_key, ciphertext, nonce);
    return base64.encode(concatBytes3(new Uint8Array([2]), nonce, ciphertext, mac));
  }
  function decrypt22(payload, conversationKey) {
    const { nonce, ciphertext, mac } = decodePayload(payload);
    const { chacha_key, chacha_nonce, hmac_key } = getMessageKeys(conversationKey, nonce);
    const calculatedMac = hmacAad(hmac_key, ciphertext, nonce);
    if (!equalBytes2(calculatedMac, mac))
      throw new Error("invalid MAC");
    const padded = chacha20(chacha_key, chacha_nonce, ciphertext);
    return unpad(padded);
  }
  var v2 = {
    utils: {
      getConversationKey,
      calcPaddedLen
    },
    encrypt: encrypt22,
    decrypt: decrypt22
  };
  var nip47_exports = {};
  __export2(nip47_exports, {
    makeNwcRequestEvent: () => makeNwcRequestEvent,
    parseConnectionString: () => parseConnectionString
  });
  function parseConnectionString(connectionString) {
    const { pathname, searchParams } = new URL(connectionString);
    const pubkey = pathname;
    const relay = searchParams.get("relay");
    const secret = searchParams.get("secret");
    if (!pubkey || !relay || !secret) {
      throw new Error("invalid connection string");
    }
    return { pubkey, relay, secret };
  }
  async function makeNwcRequestEvent(pubkey, secretKey, invoice) {
    const content = {
      method: "pay_invoice",
      params: {
        invoice
      }
    };
    const encryptedContent = await encrypt2(secretKey, pubkey, JSON.stringify(content));
    const eventTemplate = {
      kind: NWCWalletRequest,
      created_at: Math.round(Date.now() / 1e3),
      content: encryptedContent,
      tags: [["p", pubkey]]
    };
    return finalizeEvent(eventTemplate, secretKey);
  }
  var nip57_exports = {};
  __export2(nip57_exports, {
    getZapEndpoint: () => getZapEndpoint,
    makeZapReceipt: () => makeZapReceipt,
    makeZapRequest: () => makeZapRequest,
    useFetchImplementation: () => useFetchImplementation4,
    validateZapRequest: () => validateZapRequest
  });
  var _fetch4;
  try {
    _fetch4 = fetch;
  } catch {
  }
  function useFetchImplementation4(fetchImplementation) {
    _fetch4 = fetchImplementation;
  }
  async function getZapEndpoint(metadata) {
    try {
      let lnurl = "";
      let { lud06, lud16 } = JSON.parse(metadata.content);
      if (lud06) {
        let { words } = bech32.decode(lud06, 1e3);
        let data = bech32.fromWords(words);
        lnurl = utf8Decoder.decode(data);
      } else if (lud16) {
        let [name, domain] = lud16.split("@");
        lnurl = new URL(`/.well-known/lnurlp/${name}`, `https://${domain}`).toString();
      } else {
        return null;
      }
      let res = await _fetch4(lnurl);
      let body = await res.json();
      if (body.allowsNostr && body.nostrPubkey) {
        return body.callback;
      }
    } catch (err) {
    }
    return null;
  }
  function makeZapRequest({
    profile,
    event,
    amount,
    relays,
    comment = ""
  }) {
    if (!amount)
      throw new Error("amount not given");
    if (!profile)
      throw new Error("profile not given");
    let zr = {
      kind: 9734,
      created_at: Math.round(Date.now() / 1e3),
      content: comment,
      tags: [
        ["p", profile],
        ["amount", amount.toString()],
        ["relays", ...relays]
      ]
    };
    if (event) {
      zr.tags.push(["e", event]);
    }
    return zr;
  }
  function validateZapRequest(zapRequestString) {
    let zapRequest;
    try {
      zapRequest = JSON.parse(zapRequestString);
    } catch (err) {
      return "Invalid zap request JSON.";
    }
    if (!validateEvent(zapRequest))
      return "Zap request is not a valid Nostr event.";
    if (!verifyEvent(zapRequest))
      return "Invalid signature on zap request.";
    let p = zapRequest.tags.find(([t, v]) => t === "p" && v);
    if (!p)
      return "Zap request doesn't have a 'p' tag.";
    if (!p[1].match(/^[a-f0-9]{64}$/))
      return "Zap request 'p' tag is not valid hex.";
    let e = zapRequest.tags.find(([t, v]) => t === "e" && v);
    if (e && !e[1].match(/^[a-f0-9]{64}$/))
      return "Zap request 'e' tag is not valid hex.";
    let relays = zapRequest.tags.find(([t, v]) => t === "relays" && v);
    if (!relays)
      return "Zap request doesn't have a 'relays' tag.";
    return null;
  }
  function makeZapReceipt({
    zapRequest,
    preimage,
    bolt11,
    paidAt
  }) {
    let zr = JSON.parse(zapRequest);
    let tagsFromZapRequest = zr.tags.filter(([t]) => t === "e" || t === "p" || t === "a");
    let zap = {
      kind: 9735,
      created_at: Math.round(paidAt.getTime() / 1e3),
      content: "",
      tags: [...tagsFromZapRequest, ["P", zr.pubkey], ["bolt11", bolt11], ["description", zapRequest]]
    };
    if (preimage) {
      zap.tags.push(["preimage", preimage]);
    }
    return zap;
  }
  var nip59_exports = {};
  __export2(nip59_exports, {
    createRumor: () => createRumor,
    createSeal: () => createSeal,
    createWrap: () => createWrap,
    unwrapEvent: () => unwrapEvent,
    unwrapManyEvents: () => unwrapManyEvents,
    wrapEvent: () => wrapEvent,
    wrapManyEvents: () => wrapManyEvents
  });
  var TWO_DAYS = 2 * 24 * 60 * 60;
  var now = () => Math.round(Date.now() / 1e3);
  var randomNow = () => Math.round(now() - Math.random() * TWO_DAYS);
  var nip44ConversationKey = (privateKey, publicKey) => getConversationKey(privateKey, publicKey);
  var nip44Encrypt = (data, privateKey, publicKey) => encrypt22(JSON.stringify(data), nip44ConversationKey(privateKey, publicKey));
  var nip44Decrypt = (data, privateKey) => JSON.parse(decrypt22(data.content, nip44ConversationKey(privateKey, data.pubkey)));
  function createRumor(event, privateKey) {
    const rumor = {
      created_at: now(),
      content: "",
      tags: [],
      ...event,
      pubkey: getPublicKey(privateKey)
    };
    rumor.id = getEventHash(rumor);
    return rumor;
  }
  function createSeal(rumor, privateKey, recipientPublicKey) {
    return finalizeEvent(
      {
        kind: Seal,
        content: nip44Encrypt(rumor, privateKey, recipientPublicKey),
        created_at: randomNow(),
        tags: []
      },
      privateKey
    );
  }
  function createWrap(seal, recipientPublicKey) {
    const randomKey = generateSecretKey();
    return finalizeEvent(
      {
        kind: GiftWrap,
        content: nip44Encrypt(seal, randomKey, recipientPublicKey),
        created_at: randomNow(),
        tags: [["p", recipientPublicKey]]
      },
      randomKey
    );
  }
  function wrapEvent(event, senderPrivateKey, recipientPublicKey) {
    const rumor = createRumor(event, senderPrivateKey);
    const seal = createSeal(rumor, senderPrivateKey, recipientPublicKey);
    return createWrap(seal, recipientPublicKey);
  }
  function wrapManyEvents(event, senderPrivateKey, recipientsPublicKeys) {
    if (!recipientsPublicKeys || recipientsPublicKeys.length === 0) {
      throw new Error("At least one recipient is required.");
    }
    const senderPublicKey = getPublicKey(senderPrivateKey);
    const wrappeds = [wrapEvent(event, senderPrivateKey, senderPublicKey)];
    recipientsPublicKeys.forEach((recipientPublicKey) => {
      wrappeds.push(wrapEvent(event, senderPrivateKey, recipientPublicKey));
    });
    return wrappeds;
  }
  function unwrapEvent(wrap, recipientPrivateKey) {
    const unwrappedSeal = nip44Decrypt(wrap, recipientPrivateKey);
    return nip44Decrypt(unwrappedSeal, recipientPrivateKey);
  }
  function unwrapManyEvents(wrappedEvents, recipientPrivateKey) {
    let unwrappedEvents = [];
    wrappedEvents.forEach((e) => {
      unwrappedEvents.push(unwrapEvent(e, recipientPrivateKey));
    });
    unwrappedEvents.sort((a, b) => a.created_at - b.created_at);
    return unwrappedEvents;
  }
  var nip98_exports = {};
  __export2(nip98_exports, {
    getToken: () => getToken,
    hashPayload: () => hashPayload,
    unpackEventFromToken: () => unpackEventFromToken,
    validateEvent: () => validateEvent2,
    validateEventKind: () => validateEventKind,
    validateEventMethodTag: () => validateEventMethodTag,
    validateEventPayloadTag: () => validateEventPayloadTag,
    validateEventTimestamp: () => validateEventTimestamp,
    validateEventUrlTag: () => validateEventUrlTag,
    validateToken: () => validateToken
  });
  var _authorizationScheme = "Nostr ";
  async function getToken(loginUrl, httpMethod, sign, includeAuthorizationScheme = false, payload) {
    const event = {
      kind: HTTPAuth,
      tags: [
        ["u", loginUrl],
        ["method", httpMethod]
      ],
      created_at: Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3),
      content: ""
    };
    if (payload) {
      event.tags.push(["payload", hashPayload(payload)]);
    }
    const signedEvent = await sign(event);
    const authorizationScheme = includeAuthorizationScheme ? _authorizationScheme : "";
    return authorizationScheme + base64.encode(utf8Encoder.encode(JSON.stringify(signedEvent)));
  }
  async function validateToken(token, url, method) {
    const event = await unpackEventFromToken(token).catch((error) => {
      throw error;
    });
    const valid = await validateEvent2(event, url, method).catch((error) => {
      throw error;
    });
    return valid;
  }
  async function unpackEventFromToken(token) {
    if (!token) {
      throw new Error("Missing token");
    }
    token = token.replace(_authorizationScheme, "");
    const eventB64 = utf8Decoder.decode(base64.decode(token));
    if (!eventB64 || eventB64.length === 0 || !eventB64.startsWith("{")) {
      throw new Error("Invalid token");
    }
    const event = JSON.parse(eventB64);
    return event;
  }
  function validateEventTimestamp(event) {
    if (!event.created_at) {
      return false;
    }
    return Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3) - event.created_at < 60;
  }
  function validateEventKind(event) {
    return event.kind === HTTPAuth;
  }
  function validateEventUrlTag(event, url) {
    const urlTag = event.tags.find((t) => t[0] === "u");
    if (!urlTag) {
      return false;
    }
    return urlTag.length > 0 && urlTag[1] === url;
  }
  function validateEventMethodTag(event, method) {
    const methodTag = event.tags.find((t) => t[0] === "method");
    if (!methodTag) {
      return false;
    }
    return methodTag.length > 0 && methodTag[1].toLowerCase() === method.toLowerCase();
  }
  function hashPayload(payload) {
    const hash3 = sha2562(utf8Encoder.encode(JSON.stringify(payload)));
    return bytesToHex2(hash3);
  }
  function validateEventPayloadTag(event, payload) {
    const payloadTag = event.tags.find((t) => t[0] === "payload");
    if (!payloadTag) {
      return false;
    }
    const payloadHash = hashPayload(payload);
    return payloadTag.length > 0 && payloadTag[1] === payloadHash;
  }
  async function validateEvent2(event, url, method, body) {
    if (!verifyEvent(event)) {
      throw new Error("Invalid nostr event, signature invalid");
    }
    if (!validateEventKind(event)) {
      throw new Error("Invalid nostr event, kind invalid");
    }
    if (!validateEventTimestamp(event)) {
      throw new Error("Invalid nostr event, created_at timestamp invalid");
    }
    if (!validateEventUrlTag(event, url)) {
      throw new Error("Invalid nostr event, url tag invalid");
    }
    if (!validateEventMethodTag(event, method)) {
      throw new Error("Invalid nostr event, method tag invalid");
    }
    if (Boolean(body) && typeof body === "object" && Object.keys(body).length > 0) {
      if (!validateEventPayloadTag(event, body)) {
        throw new Error("Invalid nostr event, payload tag does not match request body hash");
      }
    }
    return true;
  }

  // node_modules/@noble/hashes/esm/_assert.js
  function anumber(n) {
    if (!Number.isSafeInteger(n) || n < 0)
      throw new Error("positive integer expected, got " + n);
  }
  function isBytes2(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
  }
  function abytes(b, ...lengths) {
    if (!isBytes2(b))
      throw new Error("Uint8Array expected");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
  }
  function ahash(h) {
    if (typeof h !== "function" || typeof h.create !== "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    anumber(h.outputLen);
    anumber(h.blockLen);
  }
  function aexists(instance, checkFinished = true) {
    if (instance.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function aoutput(out, instance) {
    abytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
      throw new Error("digestInto() expects output buffer of length at least " + min);
    }
  }

  // node_modules/@noble/hashes/esm/crypto.js
  var crypto4 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;

  // node_modules/@noble/hashes/esm/utils.js
  function createView4(arr) {
    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
  }
  function rotr3(word, shift) {
    return word << 32 - shift | word >>> shift;
  }
  var hexes3 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i2) => i2.toString(16).padStart(2, "0"));
  function bytesToHex3(bytes4) {
    abytes(bytes4);
    let hex2 = "";
    for (let i2 = 0; i2 < bytes4.length; i2++) {
      hex2 += hexes3[bytes4[i2]];
    }
    return hex2;
  }
  function utf8ToBytes5(str) {
    if (typeof str !== "string")
      throw new Error("utf8ToBytes expected string, got " + typeof str);
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function toBytes4(data) {
    if (typeof data === "string")
      data = utf8ToBytes5(data);
    abytes(data);
    return data;
  }
  function concatBytes4(...arrays) {
    let sum = 0;
    for (let i2 = 0; i2 < arrays.length; i2++) {
      const a = arrays[i2];
      abytes(a);
      sum += a.length;
    }
    const res = new Uint8Array(sum);
    for (let i2 = 0, pad2 = 0; i2 < arrays.length; i2++) {
      const a = arrays[i2];
      res.set(a, pad2);
      pad2 += a.length;
    }
    return res;
  }
  var Hash3 = class {
    // Safe version that clones internal state
    clone() {
      return this._cloneInto();
    }
  };
  function wrapConstructor3(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes4(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
  }
  function randomBytes3(bytesLength = 32) {
    if (crypto4 && typeof crypto4.getRandomValues === "function") {
      return crypto4.getRandomValues(new Uint8Array(bytesLength));
    }
    if (crypto4 && typeof crypto4.randomBytes === "function") {
      return crypto4.randomBytes(bytesLength);
    }
    throw new Error("crypto.getRandomValues must be defined");
  }

  // node_modules/@noble/hashes/esm/_md.js
  function setBigUint644(view, byteOffset, value, isLE4) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE4);
    const _32n = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE4 ? 4 : 0;
    const l = isLE4 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE4);
    view.setUint32(byteOffset + l, wl, isLE4);
  }
  function Chi3(a, b, c) {
    return a & b ^ ~a & c;
  }
  function Maj3(a, b, c) {
    return a & b ^ a & c ^ b & c;
  }
  var HashMD = class extends Hash3 {
    constructor(blockLen, outputLen, padOffset, isLE4) {
      super();
      this.blockLen = blockLen;
      this.outputLen = outputLen;
      this.padOffset = padOffset;
      this.isLE = isLE4;
      this.finished = false;
      this.length = 0;
      this.pos = 0;
      this.destroyed = false;
      this.buffer = new Uint8Array(blockLen);
      this.view = createView4(this.buffer);
    }
    update(data) {
      aexists(this);
      const { view, buffer, blockLen } = this;
      data = toBytes4(data);
      const len = data.length;
      for (let pos = 0; pos < len; ) {
        const take = Math.min(blockLen - this.pos, len - pos);
        if (take === blockLen) {
          const dataView = createView4(data);
          for (; blockLen <= len - pos; pos += blockLen)
            this.process(dataView, pos);
          continue;
        }
        buffer.set(data.subarray(pos, pos + take), this.pos);
        this.pos += take;
        pos += take;
        if (this.pos === blockLen) {
          this.process(view, 0);
          this.pos = 0;
        }
      }
      this.length += data.length;
      this.roundClean();
      return this;
    }
    digestInto(out) {
      aexists(this);
      aoutput(out, this);
      this.finished = true;
      const { buffer, view, blockLen, isLE: isLE4 } = this;
      let { pos } = this;
      buffer[pos++] = 128;
      this.buffer.subarray(pos).fill(0);
      if (this.padOffset > blockLen - pos) {
        this.process(view, 0);
        pos = 0;
      }
      for (let i2 = pos; i2 < blockLen; i2++)
        buffer[i2] = 0;
      setBigUint644(view, blockLen - 8, BigInt(this.length * 8), isLE4);
      this.process(view, 0);
      const oview = createView4(out);
      const len = this.outputLen;
      if (len % 4)
        throw new Error("_sha2: outputLen should be aligned to 32bit");
      const outLen = len / 4;
      const state = this.get();
      if (outLen > state.length)
        throw new Error("_sha2: outputLen bigger than state");
      for (let i2 = 0; i2 < outLen; i2++)
        oview.setUint32(4 * i2, state[i2], isLE4);
    }
    digest() {
      const { buffer, outputLen } = this;
      this.digestInto(buffer);
      const res = buffer.slice(0, outputLen);
      this.destroy();
      return res;
    }
    _cloneInto(to) {
      to || (to = new this.constructor());
      to.set(...this.get());
      const { blockLen, buffer, length, finished, destroyed, pos } = this;
      to.length = length;
      to.pos = pos;
      to.finished = finished;
      to.destroyed = destroyed;
      if (length % blockLen)
        to.buffer.set(buffer);
      return to;
    }
  };

  // node_modules/@noble/hashes/esm/sha256.js
  var SHA256_K3 = /* @__PURE__ */ new Uint32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  var SHA256_IV = /* @__PURE__ */ new Uint32Array([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ]);
  var SHA256_W3 = /* @__PURE__ */ new Uint32Array(64);
  var SHA2563 = class extends HashMD {
    constructor() {
      super(64, 32, 8, false);
      this.A = SHA256_IV[0] | 0;
      this.B = SHA256_IV[1] | 0;
      this.C = SHA256_IV[2] | 0;
      this.D = SHA256_IV[3] | 0;
      this.E = SHA256_IV[4] | 0;
      this.F = SHA256_IV[5] | 0;
      this.G = SHA256_IV[6] | 0;
      this.H = SHA256_IV[7] | 0;
    }
    get() {
      const { A, B, C, D, E, F, G, H } = this;
      return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
      this.A = A | 0;
      this.B = B | 0;
      this.C = C | 0;
      this.D = D | 0;
      this.E = E | 0;
      this.F = F | 0;
      this.G = G | 0;
      this.H = H | 0;
    }
    process(view, offset) {
      for (let i2 = 0; i2 < 16; i2++, offset += 4)
        SHA256_W3[i2] = view.getUint32(offset, false);
      for (let i2 = 16; i2 < 64; i2++) {
        const W15 = SHA256_W3[i2 - 15];
        const W2 = SHA256_W3[i2 - 2];
        const s0 = rotr3(W15, 7) ^ rotr3(W15, 18) ^ W15 >>> 3;
        const s1 = rotr3(W2, 17) ^ rotr3(W2, 19) ^ W2 >>> 10;
        SHA256_W3[i2] = s1 + SHA256_W3[i2 - 7] + s0 + SHA256_W3[i2 - 16] | 0;
      }
      let { A, B, C, D, E, F, G, H } = this;
      for (let i2 = 0; i2 < 64; i2++) {
        const sigma1 = rotr3(E, 6) ^ rotr3(E, 11) ^ rotr3(E, 25);
        const T1 = H + sigma1 + Chi3(E, F, G) + SHA256_K3[i2] + SHA256_W3[i2] | 0;
        const sigma0 = rotr3(A, 2) ^ rotr3(A, 13) ^ rotr3(A, 22);
        const T2 = sigma0 + Maj3(A, B, C) | 0;
        H = G;
        G = F;
        F = E;
        E = D + T1 | 0;
        D = C;
        C = B;
        B = A;
        A = T1 + T2 | 0;
      }
      A = A + this.A | 0;
      B = B + this.B | 0;
      C = C + this.C | 0;
      D = D + this.D | 0;
      E = E + this.E | 0;
      F = F + this.F | 0;
      G = G + this.G | 0;
      H = H + this.H | 0;
      this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
      SHA256_W3.fill(0);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0, 0, 0, 0);
      this.buffer.fill(0);
    }
  };
  var sha2563 = /* @__PURE__ */ wrapConstructor3(() => new SHA2563());

  // node_modules/@noble/hashes/esm/hmac.js
  var HMAC3 = class extends Hash3 {
    constructor(hash3, _key) {
      super();
      this.finished = false;
      this.destroyed = false;
      ahash(hash3);
      const key = toBytes4(_key);
      this.iHash = hash3.create();
      if (typeof this.iHash.update !== "function")
        throw new Error("Expected instance of class which extends utils.Hash");
      this.blockLen = this.iHash.blockLen;
      this.outputLen = this.iHash.outputLen;
      const blockLen = this.blockLen;
      const pad2 = new Uint8Array(blockLen);
      pad2.set(key.length > blockLen ? hash3.create().update(key).digest() : key);
      for (let i2 = 0; i2 < pad2.length; i2++)
        pad2[i2] ^= 54;
      this.iHash.update(pad2);
      this.oHash = hash3.create();
      for (let i2 = 0; i2 < pad2.length; i2++)
        pad2[i2] ^= 54 ^ 92;
      this.oHash.update(pad2);
      pad2.fill(0);
    }
    update(buf) {
      aexists(this);
      this.iHash.update(buf);
      return this;
    }
    digestInto(out) {
      aexists(this);
      abytes(out, this.outputLen);
      this.finished = true;
      this.iHash.digestInto(out);
      this.oHash.update(out);
      this.oHash.digestInto(out);
      this.destroy();
    }
    digest() {
      const out = new Uint8Array(this.oHash.outputLen);
      this.digestInto(out);
      return out;
    }
    _cloneInto(to) {
      to || (to = Object.create(Object.getPrototypeOf(this), {}));
      const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
      to = to;
      to.finished = finished;
      to.destroyed = destroyed;
      to.blockLen = blockLen;
      to.outputLen = outputLen;
      to.oHash = oHash._cloneInto(to.oHash);
      to.iHash = iHash._cloneInto(to.iHash);
      return to;
    }
    destroy() {
      this.destroyed = true;
      this.oHash.destroy();
      this.iHash.destroy();
    }
  };
  var hmac3 = (hash3, key, message) => new HMAC3(hash3, key).update(message).digest();
  hmac3.create = (hash3, key) => new HMAC3(hash3, key);

  // node_modules/@noble/curves/esm/abstract/utils.js
  var utils_exports3 = {};
  __export(utils_exports3, {
    aInRange: () => aInRange,
    abool: () => abool,
    abytes: () => abytes2,
    bitGet: () => bitGet2,
    bitLen: () => bitLen2,
    bitMask: () => bitMask2,
    bitSet: () => bitSet2,
    bytesToHex: () => bytesToHex4,
    bytesToNumberBE: () => bytesToNumberBE2,
    bytesToNumberLE: () => bytesToNumberLE2,
    concatBytes: () => concatBytes5,
    createHmacDrbg: () => createHmacDrbg2,
    ensureBytes: () => ensureBytes2,
    equalBytes: () => equalBytes3,
    hexToBytes: () => hexToBytes3,
    hexToNumber: () => hexToNumber2,
    inRange: () => inRange,
    isBytes: () => isBytes3,
    memoized: () => memoized,
    notImplemented: () => notImplemented,
    numberToBytesBE: () => numberToBytesBE2,
    numberToBytesLE: () => numberToBytesLE2,
    numberToHexUnpadded: () => numberToHexUnpadded2,
    numberToVarBytesBE: () => numberToVarBytesBE2,
    utf8ToBytes: () => utf8ToBytes6,
    validateObject: () => validateObject2
  });
  var _0n6 = /* @__PURE__ */ BigInt(0);
  var _1n6 = /* @__PURE__ */ BigInt(1);
  var _2n5 = /* @__PURE__ */ BigInt(2);
  function isBytes3(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
  }
  function abytes2(item) {
    if (!isBytes3(item))
      throw new Error("Uint8Array expected");
  }
  function abool(title, value) {
    if (typeof value !== "boolean")
      throw new Error(title + " boolean expected, got " + value);
  }
  var hexes4 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i2) => i2.toString(16).padStart(2, "0"));
  function bytesToHex4(bytes4) {
    abytes2(bytes4);
    let hex2 = "";
    for (let i2 = 0; i2 < bytes4.length; i2++) {
      hex2 += hexes4[bytes4[i2]];
    }
    return hex2;
  }
  function numberToHexUnpadded2(num2) {
    const hex2 = num2.toString(16);
    return hex2.length & 1 ? "0" + hex2 : hex2;
  }
  function hexToNumber2(hex2) {
    if (typeof hex2 !== "string")
      throw new Error("hex string expected, got " + typeof hex2);
    return hex2 === "" ? _0n6 : BigInt("0x" + hex2);
  }
  var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
  function asciiToBase16(ch) {
    if (ch >= asciis._0 && ch <= asciis._9)
      return ch - asciis._0;
    if (ch >= asciis.A && ch <= asciis.F)
      return ch - (asciis.A - 10);
    if (ch >= asciis.a && ch <= asciis.f)
      return ch - (asciis.a - 10);
    return;
  }
  function hexToBytes3(hex2) {
    if (typeof hex2 !== "string")
      throw new Error("hex string expected, got " + typeof hex2);
    const hl = hex2.length;
    const al = hl / 2;
    if (hl % 2)
      throw new Error("hex string expected, got unpadded hex of length " + hl);
    const array = new Uint8Array(al);
    for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
      const n1 = asciiToBase16(hex2.charCodeAt(hi));
      const n2 = asciiToBase16(hex2.charCodeAt(hi + 1));
      if (n1 === void 0 || n2 === void 0) {
        const char = hex2[hi] + hex2[hi + 1];
        throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
      }
      array[ai] = n1 * 16 + n2;
    }
    return array;
  }
  function bytesToNumberBE2(bytes4) {
    return hexToNumber2(bytesToHex4(bytes4));
  }
  function bytesToNumberLE2(bytes4) {
    abytes2(bytes4);
    return hexToNumber2(bytesToHex4(Uint8Array.from(bytes4).reverse()));
  }
  function numberToBytesBE2(n, len) {
    return hexToBytes3(n.toString(16).padStart(len * 2, "0"));
  }
  function numberToBytesLE2(n, len) {
    return numberToBytesBE2(n, len).reverse();
  }
  function numberToVarBytesBE2(n) {
    return hexToBytes3(numberToHexUnpadded2(n));
  }
  function ensureBytes2(title, hex2, expectedLength) {
    let res;
    if (typeof hex2 === "string") {
      try {
        res = hexToBytes3(hex2);
      } catch (e) {
        throw new Error(title + " must be hex string or Uint8Array, cause: " + e);
      }
    } else if (isBytes3(hex2)) {
      res = Uint8Array.from(hex2);
    } else {
      throw new Error(title + " must be hex string or Uint8Array");
    }
    const len = res.length;
    if (typeof expectedLength === "number" && len !== expectedLength)
      throw new Error(title + " of length " + expectedLength + " expected, got " + len);
    return res;
  }
  function concatBytes5(...arrays) {
    let sum = 0;
    for (let i2 = 0; i2 < arrays.length; i2++) {
      const a = arrays[i2];
      abytes2(a);
      sum += a.length;
    }
    const res = new Uint8Array(sum);
    for (let i2 = 0, pad2 = 0; i2 < arrays.length; i2++) {
      const a = arrays[i2];
      res.set(a, pad2);
      pad2 += a.length;
    }
    return res;
  }
  function equalBytes3(a, b) {
    if (a.length !== b.length)
      return false;
    let diff = 0;
    for (let i2 = 0; i2 < a.length; i2++)
      diff |= a[i2] ^ b[i2];
    return diff === 0;
  }
  function utf8ToBytes6(str) {
    if (typeof str !== "string")
      throw new Error("string expected");
    return new Uint8Array(new TextEncoder().encode(str));
  }
  var isPosBig = (n) => typeof n === "bigint" && _0n6 <= n;
  function inRange(n, min, max) {
    return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
  }
  function aInRange(title, n, min, max) {
    if (!inRange(n, min, max))
      throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
  }
  function bitLen2(n) {
    let len;
    for (len = 0; n > _0n6; n >>= _1n6, len += 1)
      ;
    return len;
  }
  function bitGet2(n, pos) {
    return n >> BigInt(pos) & _1n6;
  }
  function bitSet2(n, pos, value) {
    return n | (value ? _1n6 : _0n6) << BigInt(pos);
  }
  var bitMask2 = (n) => (_2n5 << BigInt(n - 1)) - _1n6;
  var u8n2 = (data) => new Uint8Array(data);
  var u8fr2 = (arr) => Uint8Array.from(arr);
  function createHmacDrbg2(hashLen, qByteLen, hmacFn) {
    if (typeof hashLen !== "number" || hashLen < 2)
      throw new Error("hashLen must be a number");
    if (typeof qByteLen !== "number" || qByteLen < 2)
      throw new Error("qByteLen must be a number");
    if (typeof hmacFn !== "function")
      throw new Error("hmacFn must be a function");
    let v = u8n2(hashLen);
    let k = u8n2(hashLen);
    let i2 = 0;
    const reset = () => {
      v.fill(1);
      k.fill(0);
      i2 = 0;
    };
    const h = (...b) => hmacFn(k, v, ...b);
    const reseed = (seed = u8n2()) => {
      k = h(u8fr2([0]), seed);
      v = h();
      if (seed.length === 0)
        return;
      k = h(u8fr2([1]), seed);
      v = h();
    };
    const gen = () => {
      if (i2++ >= 1e3)
        throw new Error("drbg: tried 1000 values");
      let len = 0;
      const out = [];
      while (len < qByteLen) {
        v = h();
        const sl = v.slice();
        out.push(sl);
        len += v.length;
      }
      return concatBytes5(...out);
    };
    const genUntil = (seed, pred) => {
      reset();
      reseed(seed);
      let res = void 0;
      while (!(res = pred(gen())))
        reseed();
      reset();
      return res;
    };
    return genUntil;
  }
  var validatorFns2 = {
    bigint: (val) => typeof val === "bigint",
    function: (val) => typeof val === "function",
    boolean: (val) => typeof val === "boolean",
    string: (val) => typeof val === "string",
    stringOrUint8Array: (val) => typeof val === "string" || isBytes3(val),
    isSafeInteger: (val) => Number.isSafeInteger(val),
    array: (val) => Array.isArray(val),
    field: (val, object) => object.Fp.isValid(val),
    hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
  };
  function validateObject2(object, validators, optValidators = {}) {
    const checkField = (fieldName, type, isOptional) => {
      const checkVal = validatorFns2[type];
      if (typeof checkVal !== "function")
        throw new Error("invalid validator function");
      const val = object[fieldName];
      if (isOptional && val === void 0)
        return;
      if (!checkVal(val, object)) {
        throw new Error("param " + String(fieldName) + " is invalid. Expected " + type + ", got " + val);
      }
    };
    for (const [fieldName, type] of Object.entries(validators))
      checkField(fieldName, type, false);
    for (const [fieldName, type] of Object.entries(optValidators))
      checkField(fieldName, type, true);
    return object;
  }
  var notImplemented = () => {
    throw new Error("not implemented");
  };
  function memoized(fn) {
    const map = /* @__PURE__ */ new WeakMap();
    return (arg, ...args) => {
      const val = map.get(arg);
      if (val !== void 0)
        return val;
      const computed = fn(arg, ...args);
      map.set(arg, computed);
      return computed;
    };
  }

  // node_modules/@noble/curves/esm/abstract/modular.js
  var _0n7 = BigInt(0);
  var _1n7 = BigInt(1);
  var _2n6 = /* @__PURE__ */ BigInt(2);
  var _3n3 = /* @__PURE__ */ BigInt(3);
  var _4n3 = /* @__PURE__ */ BigInt(4);
  var _5n2 = /* @__PURE__ */ BigInt(5);
  var _8n2 = /* @__PURE__ */ BigInt(8);
  var _9n2 = /* @__PURE__ */ BigInt(9);
  var _16n2 = /* @__PURE__ */ BigInt(16);
  function mod2(a, b) {
    const result = a % b;
    return result >= _0n7 ? result : b + result;
  }
  function pow3(num2, power, modulo) {
    if (power < _0n7)
      throw new Error("invalid exponent, negatives unsupported");
    if (modulo <= _0n7)
      throw new Error("invalid modulus");
    if (modulo === _1n7)
      return _0n7;
    let res = _1n7;
    while (power > _0n7) {
      if (power & _1n7)
        res = res * num2 % modulo;
      num2 = num2 * num2 % modulo;
      power >>= _1n7;
    }
    return res;
  }
  function pow22(x, power, modulo) {
    let res = x;
    while (power-- > _0n7) {
      res *= res;
      res %= modulo;
    }
    return res;
  }
  function invert2(number4, modulo) {
    if (number4 === _0n7)
      throw new Error("invert: expected non-zero number");
    if (modulo <= _0n7)
      throw new Error("invert: expected positive modulus, got " + modulo);
    let a = mod2(number4, modulo);
    let b = modulo;
    let x = _0n7, y = _1n7, u = _1n7, v = _0n7;
    while (a !== _0n7) {
      const q = b / a;
      const r = b % a;
      const m = x - u * q;
      const n = y - v * q;
      b = a, a = r, x = u, y = v, u = m, v = n;
    }
    const gcd3 = b;
    if (gcd3 !== _1n7)
      throw new Error("invert: does not exist");
    return mod2(x, modulo);
  }
  function tonelliShanks2(P) {
    const legendreC = (P - _1n7) / _2n6;
    let Q, S, Z;
    for (Q = P - _1n7, S = 0; Q % _2n6 === _0n7; Q /= _2n6, S++)
      ;
    for (Z = _2n6; Z < P && pow3(Z, legendreC, P) !== P - _1n7; Z++) {
      if (Z > 1e3)
        throw new Error("Cannot find square root: likely non-prime P");
    }
    if (S === 1) {
      const p1div4 = (P + _1n7) / _4n3;
      return function tonelliFast(Fp2, n) {
        const root = Fp2.pow(n, p1div4);
        if (!Fp2.eql(Fp2.sqr(root), n))
          throw new Error("Cannot find square root");
        return root;
      };
    }
    const Q1div2 = (Q + _1n7) / _2n6;
    return function tonelliSlow(Fp2, n) {
      if (Fp2.pow(n, legendreC) === Fp2.neg(Fp2.ONE))
        throw new Error("Cannot find square root");
      let r = S;
      let g = Fp2.pow(Fp2.mul(Fp2.ONE, Z), Q);
      let x = Fp2.pow(n, Q1div2);
      let b = Fp2.pow(n, Q);
      while (!Fp2.eql(b, Fp2.ONE)) {
        if (Fp2.eql(b, Fp2.ZERO))
          return Fp2.ZERO;
        let m = 1;
        for (let t2 = Fp2.sqr(b); m < r; m++) {
          if (Fp2.eql(t2, Fp2.ONE))
            break;
          t2 = Fp2.sqr(t2);
        }
        const ge2 = Fp2.pow(g, _1n7 << BigInt(r - m - 1));
        g = Fp2.sqr(ge2);
        x = Fp2.mul(x, ge2);
        b = Fp2.mul(b, g);
        r = m;
      }
      return x;
    };
  }
  function FpSqrt2(P) {
    if (P % _4n3 === _3n3) {
      const p1div4 = (P + _1n7) / _4n3;
      return function sqrt3mod4(Fp2, n) {
        const root = Fp2.pow(n, p1div4);
        if (!Fp2.eql(Fp2.sqr(root), n))
          throw new Error("Cannot find square root");
        return root;
      };
    }
    if (P % _8n2 === _5n2) {
      const c1 = (P - _5n2) / _8n2;
      return function sqrt5mod8(Fp2, n) {
        const n2 = Fp2.mul(n, _2n6);
        const v = Fp2.pow(n2, c1);
        const nv = Fp2.mul(n, v);
        const i2 = Fp2.mul(Fp2.mul(nv, _2n6), v);
        const root = Fp2.mul(nv, Fp2.sub(i2, Fp2.ONE));
        if (!Fp2.eql(Fp2.sqr(root), n))
          throw new Error("Cannot find square root");
        return root;
      };
    }
    if (P % _16n2 === _9n2) {
    }
    return tonelliShanks2(P);
  }
  var FIELD_FIELDS2 = [
    "create",
    "isValid",
    "is0",
    "neg",
    "inv",
    "sqrt",
    "sqr",
    "eql",
    "add",
    "sub",
    "mul",
    "pow",
    "div",
    "addN",
    "subN",
    "mulN",
    "sqrN"
  ];
  function validateField2(field) {
    const initial = {
      ORDER: "bigint",
      MASK: "bigint",
      BYTES: "isSafeInteger",
      BITS: "isSafeInteger"
    };
    const opts = FIELD_FIELDS2.reduce((map, val) => {
      map[val] = "function";
      return map;
    }, initial);
    return validateObject2(field, opts);
  }
  function FpPow2(f, num2, power) {
    if (power < _0n7)
      throw new Error("invalid exponent, negatives unsupported");
    if (power === _0n7)
      return f.ONE;
    if (power === _1n7)
      return num2;
    let p = f.ONE;
    let d4 = num2;
    while (power > _0n7) {
      if (power & _1n7)
        p = f.mul(p, d4);
      d4 = f.sqr(d4);
      power >>= _1n7;
    }
    return p;
  }
  function FpInvertBatch2(f, nums) {
    const tmp = new Array(nums.length);
    const lastMultiplied = nums.reduce((acc, num2, i2) => {
      if (f.is0(num2))
        return acc;
      tmp[i2] = acc;
      return f.mul(acc, num2);
    }, f.ONE);
    const inverted = f.inv(lastMultiplied);
    nums.reduceRight((acc, num2, i2) => {
      if (f.is0(num2))
        return acc;
      tmp[i2] = f.mul(acc, tmp[i2]);
      return f.mul(acc, num2);
    }, inverted);
    return tmp;
  }
  function nLength2(n, nBitLength) {
    const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
    const nByteLength = Math.ceil(_nBitLength / 8);
    return { nBitLength: _nBitLength, nByteLength };
  }
  function Field2(ORDER, bitLen3, isLE4 = false, redef = {}) {
    if (ORDER <= _0n7)
      throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
    const { nBitLength: BITS, nByteLength: BYTES } = nLength2(ORDER, bitLen3);
    if (BYTES > 2048)
      throw new Error("invalid field: expected ORDER of <= 2048 bytes");
    let sqrtP;
    const f = Object.freeze({
      ORDER,
      isLE: isLE4,
      BITS,
      BYTES,
      MASK: bitMask2(BITS),
      ZERO: _0n7,
      ONE: _1n7,
      create: (num2) => mod2(num2, ORDER),
      isValid: (num2) => {
        if (typeof num2 !== "bigint")
          throw new Error("invalid field element: expected bigint, got " + typeof num2);
        return _0n7 <= num2 && num2 < ORDER;
      },
      is0: (num2) => num2 === _0n7,
      isOdd: (num2) => (num2 & _1n7) === _1n7,
      neg: (num2) => mod2(-num2, ORDER),
      eql: (lhs, rhs) => lhs === rhs,
      sqr: (num2) => mod2(num2 * num2, ORDER),
      add: (lhs, rhs) => mod2(lhs + rhs, ORDER),
      sub: (lhs, rhs) => mod2(lhs - rhs, ORDER),
      mul: (lhs, rhs) => mod2(lhs * rhs, ORDER),
      pow: (num2, power) => FpPow2(f, num2, power),
      div: (lhs, rhs) => mod2(lhs * invert2(rhs, ORDER), ORDER),
      // Same as above, but doesn't normalize
      sqrN: (num2) => num2 * num2,
      addN: (lhs, rhs) => lhs + rhs,
      subN: (lhs, rhs) => lhs - rhs,
      mulN: (lhs, rhs) => lhs * rhs,
      inv: (num2) => invert2(num2, ORDER),
      sqrt: redef.sqrt || ((n) => {
        if (!sqrtP)
          sqrtP = FpSqrt2(ORDER);
        return sqrtP(f, n);
      }),
      invertBatch: (lst) => FpInvertBatch2(f, lst),
      // TODO: do we really need constant cmov?
      // We don't have const-time bigints anyway, so probably will be not very useful
      cmov: (a, b, c) => c ? b : a,
      toBytes: (num2) => isLE4 ? numberToBytesLE2(num2, BYTES) : numberToBytesBE2(num2, BYTES),
      fromBytes: (bytes4) => {
        if (bytes4.length !== BYTES)
          throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes4.length);
        return isLE4 ? bytesToNumberLE2(bytes4) : bytesToNumberBE2(bytes4);
      }
    });
    return Object.freeze(f);
  }
  function getFieldBytesLength2(fieldOrder) {
    if (typeof fieldOrder !== "bigint")
      throw new Error("field order must be bigint");
    const bitLength = fieldOrder.toString(2).length;
    return Math.ceil(bitLength / 8);
  }
  function getMinHashLength2(fieldOrder) {
    const length = getFieldBytesLength2(fieldOrder);
    return length + Math.ceil(length / 2);
  }
  function mapHashToField2(key, fieldOrder, isLE4 = false) {
    const len = key.length;
    const fieldLen = getFieldBytesLength2(fieldOrder);
    const minLen = getMinHashLength2(fieldOrder);
    if (len < 16 || len < minLen || len > 1024)
      throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
    const num2 = isLE4 ? bytesToNumberLE2(key) : bytesToNumberBE2(key);
    const reduced = mod2(num2, fieldOrder - _1n7) + _1n7;
    return isLE4 ? numberToBytesLE2(reduced, fieldLen) : numberToBytesBE2(reduced, fieldLen);
  }

  // node_modules/@noble/curves/esm/abstract/curve.js
  var _0n8 = BigInt(0);
  var _1n8 = BigInt(1);
  function constTimeNegate(condition, item) {
    const neg = item.negate();
    return condition ? neg : item;
  }
  function validateW(W, bits) {
    if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
      throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
  }
  function calcWOpts(W, bits) {
    validateW(W, bits);
    const windows = Math.ceil(bits / W) + 1;
    const windowSize = 2 ** (W - 1);
    return { windows, windowSize };
  }
  function validateMSMPoints(points, c) {
    if (!Array.isArray(points))
      throw new Error("array expected");
    points.forEach((p, i2) => {
      if (!(p instanceof c))
        throw new Error("invalid point at index " + i2);
    });
  }
  function validateMSMScalars(scalars, field) {
    if (!Array.isArray(scalars))
      throw new Error("array of scalars expected");
    scalars.forEach((s, i2) => {
      if (!field.isValid(s))
        throw new Error("invalid scalar at index " + i2);
    });
  }
  var pointPrecomputes = /* @__PURE__ */ new WeakMap();
  var pointWindowSizes = /* @__PURE__ */ new WeakMap();
  function getW(P) {
    return pointWindowSizes.get(P) || 1;
  }
  function wNAF2(c, bits) {
    return {
      constTimeNegate,
      hasPrecomputes(elm) {
        return getW(elm) !== 1;
      },
      // non-const time multiplication ladder
      unsafeLadder(elm, n, p = c.ZERO) {
        let d4 = elm;
        while (n > _0n8) {
          if (n & _1n8)
            p = p.add(d4);
          d4 = d4.double();
          n >>= _1n8;
        }
        return p;
      },
      /**
       * Creates a wNAF precomputation window. Used for caching.
       * Default window size is set by `utils.precompute()` and is equal to 8.
       * Number of precomputed points depends on the curve size:
       * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
       * - 𝑊 is the window size
       * - 𝑛 is the bitlength of the curve order.
       * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
       * @param elm Point instance
       * @param W window size
       * @returns precomputed point tables flattened to a single array
       */
      precomputeWindow(elm, W) {
        const { windows, windowSize } = calcWOpts(W, bits);
        const points = [];
        let p = elm;
        let base = p;
        for (let window2 = 0; window2 < windows; window2++) {
          base = p;
          points.push(base);
          for (let i2 = 1; i2 < windowSize; i2++) {
            base = base.add(p);
            points.push(base);
          }
          p = base.double();
        }
        return points;
      },
      /**
       * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
       * @param W window size
       * @param precomputes precomputed tables
       * @param n scalar (we don't check here, but should be less than curve order)
       * @returns real and fake (for const-time) points
       */
      wNAF(W, precomputes, n) {
        const { windows, windowSize } = calcWOpts(W, bits);
        let p = c.ZERO;
        let f = c.BASE;
        const mask = BigInt(2 ** W - 1);
        const maxNumber = 2 ** W;
        const shiftBy = BigInt(W);
        for (let window2 = 0; window2 < windows; window2++) {
          const offset = window2 * windowSize;
          let wbits = Number(n & mask);
          n >>= shiftBy;
          if (wbits > windowSize) {
            wbits -= maxNumber;
            n += _1n8;
          }
          const offset1 = offset;
          const offset2 = offset + Math.abs(wbits) - 1;
          const cond1 = window2 % 2 !== 0;
          const cond2 = wbits < 0;
          if (wbits === 0) {
            f = f.add(constTimeNegate(cond1, precomputes[offset1]));
          } else {
            p = p.add(constTimeNegate(cond2, precomputes[offset2]));
          }
        }
        return { p, f };
      },
      /**
       * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
       * @param W window size
       * @param precomputes precomputed tables
       * @param n scalar (we don't check here, but should be less than curve order)
       * @param acc accumulator point to add result of multiplication
       * @returns point
       */
      wNAFUnsafe(W, precomputes, n, acc = c.ZERO) {
        const { windows, windowSize } = calcWOpts(W, bits);
        const mask = BigInt(2 ** W - 1);
        const maxNumber = 2 ** W;
        const shiftBy = BigInt(W);
        for (let window2 = 0; window2 < windows; window2++) {
          const offset = window2 * windowSize;
          if (n === _0n8)
            break;
          let wbits = Number(n & mask);
          n >>= shiftBy;
          if (wbits > windowSize) {
            wbits -= maxNumber;
            n += _1n8;
          }
          if (wbits === 0)
            continue;
          let curr = precomputes[offset + Math.abs(wbits) - 1];
          if (wbits < 0)
            curr = curr.negate();
          acc = acc.add(curr);
        }
        return acc;
      },
      getPrecomputes(W, P, transform) {
        let comp = pointPrecomputes.get(P);
        if (!comp) {
          comp = this.precomputeWindow(P, W);
          if (W !== 1)
            pointPrecomputes.set(P, transform(comp));
        }
        return comp;
      },
      wNAFCached(P, n, transform) {
        const W = getW(P);
        return this.wNAF(W, this.getPrecomputes(W, P, transform), n);
      },
      wNAFCachedUnsafe(P, n, transform, prev) {
        const W = getW(P);
        if (W === 1)
          return this.unsafeLadder(P, n, prev);
        return this.wNAFUnsafe(W, this.getPrecomputes(W, P, transform), n, prev);
      },
      // We calculate precomputes for elliptic curve point multiplication
      // using windowed method. This specifies window size and
      // stores precomputed values. Usually only base point would be precomputed.
      setWindowSize(P, W) {
        validateW(W, bits);
        pointWindowSizes.set(P, W);
        pointPrecomputes.delete(P);
      }
    };
  }
  function pippenger(c, fieldN, points, scalars) {
    validateMSMPoints(points, c);
    validateMSMScalars(scalars, fieldN);
    if (points.length !== scalars.length)
      throw new Error("arrays of points and scalars must have equal length");
    const zero = c.ZERO;
    const wbits = bitLen2(BigInt(points.length));
    const windowSize = wbits > 12 ? wbits - 3 : wbits > 4 ? wbits - 2 : wbits ? 2 : 1;
    const MASK = (1 << windowSize) - 1;
    const buckets = new Array(MASK + 1).fill(zero);
    const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
    let sum = zero;
    for (let i2 = lastBits; i2 >= 0; i2 -= windowSize) {
      buckets.fill(zero);
      for (let j = 0; j < scalars.length; j++) {
        const scalar = scalars[j];
        const wbits2 = Number(scalar >> BigInt(i2) & BigInt(MASK));
        buckets[wbits2] = buckets[wbits2].add(points[j]);
      }
      let resI = zero;
      for (let j = buckets.length - 1, sumI = zero; j > 0; j--) {
        sumI = sumI.add(buckets[j]);
        resI = resI.add(sumI);
      }
      sum = sum.add(resI);
      if (i2 !== 0)
        for (let j = 0; j < windowSize; j++)
          sum = sum.double();
    }
    return sum;
  }
  function validateBasic2(curve) {
    validateField2(curve.Fp);
    validateObject2(curve, {
      n: "bigint",
      h: "bigint",
      Gx: "field",
      Gy: "field"
    }, {
      nBitLength: "isSafeInteger",
      nByteLength: "isSafeInteger"
    });
    return Object.freeze({
      ...nLength2(curve.n, curve.nBitLength),
      ...curve,
      ...{ p: curve.Fp.ORDER }
    });
  }

  // node_modules/@noble/curves/esm/abstract/weierstrass.js
  function validateSigVerOpts(opts) {
    if (opts.lowS !== void 0)
      abool("lowS", opts.lowS);
    if (opts.prehash !== void 0)
      abool("prehash", opts.prehash);
  }
  function validatePointOpts2(curve) {
    const opts = validateBasic2(curve);
    validateObject2(opts, {
      a: "field",
      b: "field"
    }, {
      allowedPrivateKeyLengths: "array",
      wrapPrivateKey: "boolean",
      isTorsionFree: "function",
      clearCofactor: "function",
      allowInfinityPoint: "boolean",
      fromBytes: "function",
      toBytes: "function"
    });
    const { endo, Fp: Fp2, a } = opts;
    if (endo) {
      if (!Fp2.eql(a, Fp2.ZERO)) {
        throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
      }
      if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
        throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function");
      }
    }
    return Object.freeze({ ...opts });
  }
  var { bytesToNumberBE: b2n2, hexToBytes: h2b2 } = utils_exports3;
  var DERErr2 = class extends Error {
    constructor(m = "") {
      super(m);
    }
  };
  var DER2 = {
    // asn.1 DER encoding utils
    Err: DERErr2,
    // Basic building block is TLV (Tag-Length-Value)
    _tlv: {
      encode: (tag, data) => {
        const { Err: E } = DER2;
        if (tag < 0 || tag > 256)
          throw new E("tlv.encode: wrong tag");
        if (data.length & 1)
          throw new E("tlv.encode: unpadded data");
        const dataLen = data.length / 2;
        const len = numberToHexUnpadded2(dataLen);
        if (len.length / 2 & 128)
          throw new E("tlv.encode: long form length too big");
        const lenLen = dataLen > 127 ? numberToHexUnpadded2(len.length / 2 | 128) : "";
        const t = numberToHexUnpadded2(tag);
        return t + lenLen + len + data;
      },
      // v - value, l - left bytes (unparsed)
      decode(tag, data) {
        const { Err: E } = DER2;
        let pos = 0;
        if (tag < 0 || tag > 256)
          throw new E("tlv.encode: wrong tag");
        if (data.length < 2 || data[pos++] !== tag)
          throw new E("tlv.decode: wrong tlv");
        const first = data[pos++];
        const isLong = !!(first & 128);
        let length = 0;
        if (!isLong)
          length = first;
        else {
          const lenLen = first & 127;
          if (!lenLen)
            throw new E("tlv.decode(long): indefinite length not supported");
          if (lenLen > 4)
            throw new E("tlv.decode(long): byte length is too big");
          const lengthBytes = data.subarray(pos, pos + lenLen);
          if (lengthBytes.length !== lenLen)
            throw new E("tlv.decode: length bytes not complete");
          if (lengthBytes[0] === 0)
            throw new E("tlv.decode(long): zero leftmost byte");
          for (const b of lengthBytes)
            length = length << 8 | b;
          pos += lenLen;
          if (length < 128)
            throw new E("tlv.decode(long): not minimal encoding");
        }
        const v = data.subarray(pos, pos + length);
        if (v.length !== length)
          throw new E("tlv.decode: wrong value length");
        return { v, l: data.subarray(pos + length) };
      }
    },
    // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
    // since we always use positive integers here. It must always be empty:
    // - add zero byte if exists
    // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
    _int: {
      encode(num2) {
        const { Err: E } = DER2;
        if (num2 < _0n9)
          throw new E("integer: negative integers are not allowed");
        let hex2 = numberToHexUnpadded2(num2);
        if (Number.parseInt(hex2[0], 16) & 8)
          hex2 = "00" + hex2;
        if (hex2.length & 1)
          throw new E("unexpected DER parsing assertion: unpadded hex");
        return hex2;
      },
      decode(data) {
        const { Err: E } = DER2;
        if (data[0] & 128)
          throw new E("invalid signature integer: negative");
        if (data[0] === 0 && !(data[1] & 128))
          throw new E("invalid signature integer: unnecessary leading zero");
        return b2n2(data);
      }
    },
    toSig(hex2) {
      const { Err: E, _int: int, _tlv: tlv } = DER2;
      const data = typeof hex2 === "string" ? h2b2(hex2) : hex2;
      abytes2(data);
      const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
      if (seqLeftBytes.length)
        throw new E("invalid signature: left bytes after parsing");
      const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
      const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
      if (sLeftBytes.length)
        throw new E("invalid signature: left bytes after parsing");
      return { r: int.decode(rBytes), s: int.decode(sBytes) };
    },
    hexFromSig(sig) {
      const { _tlv: tlv, _int: int } = DER2;
      const rs = tlv.encode(2, int.encode(sig.r));
      const ss = tlv.encode(2, int.encode(sig.s));
      const seq = rs + ss;
      return tlv.encode(48, seq);
    }
  };
  var _0n9 = BigInt(0);
  var _1n9 = BigInt(1);
  var _2n7 = BigInt(2);
  var _3n4 = BigInt(3);
  var _4n4 = BigInt(4);
  function weierstrassPoints2(opts) {
    const CURVE = validatePointOpts2(opts);
    const { Fp: Fp2 } = CURVE;
    const Fn = Field2(CURVE.n, CURVE.nBitLength);
    const toBytes5 = CURVE.toBytes || ((_c, point, _isCompressed) => {
      const a = point.toAffine();
      return concatBytes5(Uint8Array.from([4]), Fp2.toBytes(a.x), Fp2.toBytes(a.y));
    });
    const fromBytes = CURVE.fromBytes || ((bytes4) => {
      const tail = bytes4.subarray(1);
      const x = Fp2.fromBytes(tail.subarray(0, Fp2.BYTES));
      const y = Fp2.fromBytes(tail.subarray(Fp2.BYTES, 2 * Fp2.BYTES));
      return { x, y };
    });
    function weierstrassEquation(x) {
      const { a, b } = CURVE;
      const x2 = Fp2.sqr(x);
      const x3 = Fp2.mul(x2, x);
      return Fp2.add(Fp2.add(x3, Fp2.mul(x, a)), b);
    }
    if (!Fp2.eql(Fp2.sqr(CURVE.Gy), weierstrassEquation(CURVE.Gx)))
      throw new Error("bad generator point: equation left != right");
    function isWithinCurveOrder(num2) {
      return inRange(num2, _1n9, CURVE.n);
    }
    function normPrivateKeyToScalar(key) {
      const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n: N } = CURVE;
      if (lengths && typeof key !== "bigint") {
        if (isBytes3(key))
          key = bytesToHex4(key);
        if (typeof key !== "string" || !lengths.includes(key.length))
          throw new Error("invalid private key");
        key = key.padStart(nByteLength * 2, "0");
      }
      let num2;
      try {
        num2 = typeof key === "bigint" ? key : bytesToNumberBE2(ensureBytes2("private key", key, nByteLength));
      } catch (error) {
        throw new Error("invalid private key, expected hex or " + nByteLength + " bytes, got " + typeof key);
      }
      if (wrapPrivateKey)
        num2 = mod2(num2, N);
      aInRange("private key", num2, _1n9, N);
      return num2;
    }
    function assertPrjPoint(other) {
      if (!(other instanceof Point3))
        throw new Error("ProjectivePoint expected");
    }
    const toAffineMemo = memoized((p, iz) => {
      const { px: x, py: y, pz: z } = p;
      if (Fp2.eql(z, Fp2.ONE))
        return { x, y };
      const is0 = p.is0();
      if (iz == null)
        iz = is0 ? Fp2.ONE : Fp2.inv(z);
      const ax = Fp2.mul(x, iz);
      const ay = Fp2.mul(y, iz);
      const zz = Fp2.mul(z, iz);
      if (is0)
        return { x: Fp2.ZERO, y: Fp2.ZERO };
      if (!Fp2.eql(zz, Fp2.ONE))
        throw new Error("invZ was invalid");
      return { x: ax, y: ay };
    });
    const assertValidMemo = memoized((p) => {
      if (p.is0()) {
        if (CURVE.allowInfinityPoint && !Fp2.is0(p.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x, y } = p.toAffine();
      if (!Fp2.isValid(x) || !Fp2.isValid(y))
        throw new Error("bad point: x or y not FE");
      const left = Fp2.sqr(y);
      const right = weierstrassEquation(x);
      if (!Fp2.eql(left, right))
        throw new Error("bad point: equation left != right");
      if (!p.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
      return true;
    });
    class Point3 {
      constructor(px, py, pz) {
        this.px = px;
        this.py = py;
        this.pz = pz;
        if (px == null || !Fp2.isValid(px))
          throw new Error("x required");
        if (py == null || !Fp2.isValid(py))
          throw new Error("y required");
        if (pz == null || !Fp2.isValid(pz))
          throw new Error("z required");
        Object.freeze(this);
      }
      // Does not validate if the point is on-curve.
      // Use fromHex instead, or call assertValidity() later.
      static fromAffine(p) {
        const { x, y } = p || {};
        if (!p || !Fp2.isValid(x) || !Fp2.isValid(y))
          throw new Error("invalid affine point");
        if (p instanceof Point3)
          throw new Error("projective point not allowed");
        const is0 = (i2) => Fp2.eql(i2, Fp2.ZERO);
        if (is0(x) && is0(y))
          return Point3.ZERO;
        return new Point3(x, y, Fp2.ONE);
      }
      get x() {
        return this.toAffine().x;
      }
      get y() {
        return this.toAffine().y;
      }
      /**
       * Takes a bunch of Projective Points but executes only one
       * inversion on all of them. Inversion is very slow operation,
       * so this improves performance massively.
       * Optimization: converts a list of projective points to a list of identical points with Z=1.
       */
      static normalizeZ(points) {
        const toInv = Fp2.invertBatch(points.map((p) => p.pz));
        return points.map((p, i2) => p.toAffine(toInv[i2])).map(Point3.fromAffine);
      }
      /**
       * Converts hash string or Uint8Array to Point.
       * @param hex short/long ECDSA hex
       */
      static fromHex(hex2) {
        const P = Point3.fromAffine(fromBytes(ensureBytes2("pointHex", hex2)));
        P.assertValidity();
        return P;
      }
      // Multiplies generator point by privateKey.
      static fromPrivateKey(privateKey) {
        return Point3.BASE.multiply(normPrivateKeyToScalar(privateKey));
      }
      // Multiscalar Multiplication
      static msm(points, scalars) {
        return pippenger(Point3, Fn, points, scalars);
      }
      // "Private method", don't use it directly
      _setWindowSize(windowSize) {
        wnaf.setWindowSize(this, windowSize);
      }
      // A point on curve is valid if it conforms to equation.
      assertValidity() {
        assertValidMemo(this);
      }
      hasEvenY() {
        const { y } = this.toAffine();
        if (Fp2.isOdd)
          return !Fp2.isOdd(y);
        throw new Error("Field doesn't support isOdd");
      }
      /**
       * Compare one point to another.
       */
      equals(other) {
        assertPrjPoint(other);
        const { px: X1, py: Y1, pz: Z1 } = this;
        const { px: X2, py: Y2, pz: Z2 } = other;
        const U1 = Fp2.eql(Fp2.mul(X1, Z2), Fp2.mul(X2, Z1));
        const U2 = Fp2.eql(Fp2.mul(Y1, Z2), Fp2.mul(Y2, Z1));
        return U1 && U2;
      }
      /**
       * Flips point to one corresponding to (x, -y) in Affine coordinates.
       */
      negate() {
        return new Point3(this.px, Fp2.neg(this.py), this.pz);
      }
      // Renes-Costello-Batina exception-free doubling formula.
      // There is 30% faster Jacobian formula, but it is not complete.
      // https://eprint.iacr.org/2015/1060, algorithm 3
      // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
      double() {
        const { a, b } = CURVE;
        const b3 = Fp2.mul(b, _3n4);
        const { px: X1, py: Y1, pz: Z1 } = this;
        let X3 = Fp2.ZERO, Y3 = Fp2.ZERO, Z3 = Fp2.ZERO;
        let t0 = Fp2.mul(X1, X1);
        let t1 = Fp2.mul(Y1, Y1);
        let t2 = Fp2.mul(Z1, Z1);
        let t3 = Fp2.mul(X1, Y1);
        t3 = Fp2.add(t3, t3);
        Z3 = Fp2.mul(X1, Z1);
        Z3 = Fp2.add(Z3, Z3);
        X3 = Fp2.mul(a, Z3);
        Y3 = Fp2.mul(b3, t2);
        Y3 = Fp2.add(X3, Y3);
        X3 = Fp2.sub(t1, Y3);
        Y3 = Fp2.add(t1, Y3);
        Y3 = Fp2.mul(X3, Y3);
        X3 = Fp2.mul(t3, X3);
        Z3 = Fp2.mul(b3, Z3);
        t2 = Fp2.mul(a, t2);
        t3 = Fp2.sub(t0, t2);
        t3 = Fp2.mul(a, t3);
        t3 = Fp2.add(t3, Z3);
        Z3 = Fp2.add(t0, t0);
        t0 = Fp2.add(Z3, t0);
        t0 = Fp2.add(t0, t2);
        t0 = Fp2.mul(t0, t3);
        Y3 = Fp2.add(Y3, t0);
        t2 = Fp2.mul(Y1, Z1);
        t2 = Fp2.add(t2, t2);
        t0 = Fp2.mul(t2, t3);
        X3 = Fp2.sub(X3, t0);
        Z3 = Fp2.mul(t2, t1);
        Z3 = Fp2.add(Z3, Z3);
        Z3 = Fp2.add(Z3, Z3);
        return new Point3(X3, Y3, Z3);
      }
      // Renes-Costello-Batina exception-free addition formula.
      // There is 30% faster Jacobian formula, but it is not complete.
      // https://eprint.iacr.org/2015/1060, algorithm 1
      // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
      add(other) {
        assertPrjPoint(other);
        const { px: X1, py: Y1, pz: Z1 } = this;
        const { px: X2, py: Y2, pz: Z2 } = other;
        let X3 = Fp2.ZERO, Y3 = Fp2.ZERO, Z3 = Fp2.ZERO;
        const a = CURVE.a;
        const b3 = Fp2.mul(CURVE.b, _3n4);
        let t0 = Fp2.mul(X1, X2);
        let t1 = Fp2.mul(Y1, Y2);
        let t2 = Fp2.mul(Z1, Z2);
        let t3 = Fp2.add(X1, Y1);
        let t4 = Fp2.add(X2, Y2);
        t3 = Fp2.mul(t3, t4);
        t4 = Fp2.add(t0, t1);
        t3 = Fp2.sub(t3, t4);
        t4 = Fp2.add(X1, Z1);
        let t5 = Fp2.add(X2, Z2);
        t4 = Fp2.mul(t4, t5);
        t5 = Fp2.add(t0, t2);
        t4 = Fp2.sub(t4, t5);
        t5 = Fp2.add(Y1, Z1);
        X3 = Fp2.add(Y2, Z2);
        t5 = Fp2.mul(t5, X3);
        X3 = Fp2.add(t1, t2);
        t5 = Fp2.sub(t5, X3);
        Z3 = Fp2.mul(a, t4);
        X3 = Fp2.mul(b3, t2);
        Z3 = Fp2.add(X3, Z3);
        X3 = Fp2.sub(t1, Z3);
        Z3 = Fp2.add(t1, Z3);
        Y3 = Fp2.mul(X3, Z3);
        t1 = Fp2.add(t0, t0);
        t1 = Fp2.add(t1, t0);
        t2 = Fp2.mul(a, t2);
        t4 = Fp2.mul(b3, t4);
        t1 = Fp2.add(t1, t2);
        t2 = Fp2.sub(t0, t2);
        t2 = Fp2.mul(a, t2);
        t4 = Fp2.add(t4, t2);
        t0 = Fp2.mul(t1, t4);
        Y3 = Fp2.add(Y3, t0);
        t0 = Fp2.mul(t5, t4);
        X3 = Fp2.mul(t3, X3);
        X3 = Fp2.sub(X3, t0);
        t0 = Fp2.mul(t3, t1);
        Z3 = Fp2.mul(t5, Z3);
        Z3 = Fp2.add(Z3, t0);
        return new Point3(X3, Y3, Z3);
      }
      subtract(other) {
        return this.add(other.negate());
      }
      is0() {
        return this.equals(Point3.ZERO);
      }
      wNAF(n) {
        return wnaf.wNAFCached(this, n, Point3.normalizeZ);
      }
      /**
       * Non-constant-time multiplication. Uses double-and-add algorithm.
       * It's faster, but should only be used when you don't care about
       * an exposed private key e.g. sig verification, which works over *public* keys.
       */
      multiplyUnsafe(sc) {
        const { endo, n: N } = CURVE;
        aInRange("scalar", sc, _0n9, N);
        const I = Point3.ZERO;
        if (sc === _0n9)
          return I;
        if (this.is0() || sc === _1n9)
          return this;
        if (!endo || wnaf.hasPrecomputes(this))
          return wnaf.wNAFCachedUnsafe(this, sc, Point3.normalizeZ);
        let { k1neg, k1, k2neg, k2 } = endo.splitScalar(sc);
        let k1p = I;
        let k2p = I;
        let d4 = this;
        while (k1 > _0n9 || k2 > _0n9) {
          if (k1 & _1n9)
            k1p = k1p.add(d4);
          if (k2 & _1n9)
            k2p = k2p.add(d4);
          d4 = d4.double();
          k1 >>= _1n9;
          k2 >>= _1n9;
        }
        if (k1neg)
          k1p = k1p.negate();
        if (k2neg)
          k2p = k2p.negate();
        k2p = new Point3(Fp2.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
        return k1p.add(k2p);
      }
      /**
       * Constant time multiplication.
       * Uses wNAF method. Windowed method may be 10% faster,
       * but takes 2x longer to generate and consumes 2x memory.
       * Uses precomputes when available.
       * Uses endomorphism for Koblitz curves.
       * @param scalar by which the point would be multiplied
       * @returns New point
       */
      multiply(scalar) {
        const { endo, n: N } = CURVE;
        aInRange("scalar", scalar, _1n9, N);
        let point, fake;
        if (endo) {
          const { k1neg, k1, k2neg, k2 } = endo.splitScalar(scalar);
          let { p: k1p, f: f1p } = this.wNAF(k1);
          let { p: k2p, f: f2p } = this.wNAF(k2);
          k1p = wnaf.constTimeNegate(k1neg, k1p);
          k2p = wnaf.constTimeNegate(k2neg, k2p);
          k2p = new Point3(Fp2.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
          point = k1p.add(k2p);
          fake = f1p.add(f2p);
        } else {
          const { p, f } = this.wNAF(scalar);
          point = p;
          fake = f;
        }
        return Point3.normalizeZ([point, fake])[0];
      }
      /**
       * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
       * Not using Strauss-Shamir trick: precomputation tables are faster.
       * The trick could be useful if both P and Q are not G (not in our case).
       * @returns non-zero affine point
       */
      multiplyAndAddUnsafe(Q, a, b) {
        const G = Point3.BASE;
        const mul3 = (P, a2) => a2 === _0n9 || a2 === _1n9 || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2);
        const sum = mul3(this, a).add(mul3(Q, b));
        return sum.is0() ? void 0 : sum;
      }
      // Converts Projective point to affine (x, y) coordinates.
      // Can accept precomputed Z^-1 - for example, from invertBatch.
      // (x, y, z) ∋ (x=x/z, y=y/z)
      toAffine(iz) {
        return toAffineMemo(this, iz);
      }
      isTorsionFree() {
        const { h: cofactor, isTorsionFree } = CURVE;
        if (cofactor === _1n9)
          return true;
        if (isTorsionFree)
          return isTorsionFree(Point3, this);
        throw new Error("isTorsionFree() has not been declared for the elliptic curve");
      }
      clearCofactor() {
        const { h: cofactor, clearCofactor } = CURVE;
        if (cofactor === _1n9)
          return this;
        if (clearCofactor)
          return clearCofactor(Point3, this);
        return this.multiplyUnsafe(CURVE.h);
      }
      toRawBytes(isCompressed = true) {
        abool("isCompressed", isCompressed);
        this.assertValidity();
        return toBytes5(Point3, this, isCompressed);
      }
      toHex(isCompressed = true) {
        abool("isCompressed", isCompressed);
        return bytesToHex4(this.toRawBytes(isCompressed));
      }
    }
    Point3.BASE = new Point3(CURVE.Gx, CURVE.Gy, Fp2.ONE);
    Point3.ZERO = new Point3(Fp2.ZERO, Fp2.ONE, Fp2.ZERO);
    const _bits = CURVE.nBitLength;
    const wnaf = wNAF2(Point3, CURVE.endo ? Math.ceil(_bits / 2) : _bits);
    return {
      CURVE,
      ProjectivePoint: Point3,
      normPrivateKeyToScalar,
      weierstrassEquation,
      isWithinCurveOrder
    };
  }
  function validateOpts2(curve) {
    const opts = validateBasic2(curve);
    validateObject2(opts, {
      hash: "hash",
      hmac: "function",
      randomBytes: "function"
    }, {
      bits2int: "function",
      bits2int_modN: "function",
      lowS: "boolean"
    });
    return Object.freeze({ lowS: true, ...opts });
  }
  function weierstrass2(curveDef) {
    const CURVE = validateOpts2(curveDef);
    const { Fp: Fp2, n: CURVE_ORDER } = CURVE;
    const compressedLen = Fp2.BYTES + 1;
    const uncompressedLen = 2 * Fp2.BYTES + 1;
    function modN3(a) {
      return mod2(a, CURVE_ORDER);
    }
    function invN(a) {
      return invert2(a, CURVE_ORDER);
    }
    const { ProjectivePoint: Point3, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints2({
      ...CURVE,
      toBytes(_c, point, isCompressed) {
        const a = point.toAffine();
        const x = Fp2.toBytes(a.x);
        const cat = concatBytes5;
        abool("isCompressed", isCompressed);
        if (isCompressed) {
          return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
        } else {
          return cat(Uint8Array.from([4]), x, Fp2.toBytes(a.y));
        }
      },
      fromBytes(bytes4) {
        const len = bytes4.length;
        const head = bytes4[0];
        const tail = bytes4.subarray(1);
        if (len === compressedLen && (head === 2 || head === 3)) {
          const x = bytesToNumberBE2(tail);
          if (!inRange(x, _1n9, Fp2.ORDER))
            throw new Error("Point is not on curve");
          const y2 = weierstrassEquation(x);
          let y;
          try {
            y = Fp2.sqrt(y2);
          } catch (sqrtError) {
            const suffix = sqrtError instanceof Error ? ": " + sqrtError.message : "";
            throw new Error("Point is not on curve" + suffix);
          }
          const isYOdd = (y & _1n9) === _1n9;
          const isHeadOdd = (head & 1) === 1;
          if (isHeadOdd !== isYOdd)
            y = Fp2.neg(y);
          return { x, y };
        } else if (len === uncompressedLen && head === 4) {
          const x = Fp2.fromBytes(tail.subarray(0, Fp2.BYTES));
          const y = Fp2.fromBytes(tail.subarray(Fp2.BYTES, 2 * Fp2.BYTES));
          return { x, y };
        } else {
          const cl = compressedLen;
          const ul = uncompressedLen;
          throw new Error("invalid Point, expected length of " + cl + ", or uncompressed " + ul + ", got " + len);
        }
      }
    });
    const numToNByteStr = (num2) => bytesToHex4(numberToBytesBE2(num2, CURVE.nByteLength));
    function isBiggerThanHalfOrder(number4) {
      const HALF = CURVE_ORDER >> _1n9;
      return number4 > HALF;
    }
    function normalizeS(s) {
      return isBiggerThanHalfOrder(s) ? modN3(-s) : s;
    }
    const slcNum = (b, from, to) => bytesToNumberBE2(b.slice(from, to));
    class Signature {
      constructor(r, s, recovery) {
        this.r = r;
        this.s = s;
        this.recovery = recovery;
        this.assertValidity();
      }
      // pair (bytes of r, bytes of s)
      static fromCompact(hex2) {
        const l = CURVE.nByteLength;
        hex2 = ensureBytes2("compactSignature", hex2, l * 2);
        return new Signature(slcNum(hex2, 0, l), slcNum(hex2, l, 2 * l));
      }
      // DER encoded ECDSA signature
      // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
      static fromDER(hex2) {
        const { r, s } = DER2.toSig(ensureBytes2("DER", hex2));
        return new Signature(r, s);
      }
      assertValidity() {
        aInRange("r", this.r, _1n9, CURVE_ORDER);
        aInRange("s", this.s, _1n9, CURVE_ORDER);
      }
      addRecoveryBit(recovery) {
        return new Signature(this.r, this.s, recovery);
      }
      recoverPublicKey(msgHash) {
        const { r, s, recovery: rec } = this;
        const h = bits2int_modN(ensureBytes2("msgHash", msgHash));
        if (rec == null || ![0, 1, 2, 3].includes(rec))
          throw new Error("recovery id invalid");
        const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
        if (radj >= Fp2.ORDER)
          throw new Error("recovery id 2 or 3 invalid");
        const prefix = (rec & 1) === 0 ? "02" : "03";
        const R = Point3.fromHex(prefix + numToNByteStr(radj));
        const ir = invN(radj);
        const u1 = modN3(-h * ir);
        const u2 = modN3(s * ir);
        const Q = Point3.BASE.multiplyAndAddUnsafe(R, u1, u2);
        if (!Q)
          throw new Error("point at infinify");
        Q.assertValidity();
        return Q;
      }
      // Signatures should be low-s, to prevent malleability.
      hasHighS() {
        return isBiggerThanHalfOrder(this.s);
      }
      normalizeS() {
        return this.hasHighS() ? new Signature(this.r, modN3(-this.s), this.recovery) : this;
      }
      // DER-encoded
      toDERRawBytes() {
        return hexToBytes3(this.toDERHex());
      }
      toDERHex() {
        return DER2.hexFromSig({ r: this.r, s: this.s });
      }
      // padded bytes of r, then padded bytes of s
      toCompactRawBytes() {
        return hexToBytes3(this.toCompactHex());
      }
      toCompactHex() {
        return numToNByteStr(this.r) + numToNByteStr(this.s);
      }
    }
    const utils = {
      isValidPrivateKey(privateKey) {
        try {
          normPrivateKeyToScalar(privateKey);
          return true;
        } catch (error) {
          return false;
        }
      },
      normPrivateKeyToScalar,
      /**
       * Produces cryptographically secure private key from random of size
       * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
       */
      randomPrivateKey: () => {
        const length = getMinHashLength2(CURVE.n);
        return mapHashToField2(CURVE.randomBytes(length), CURVE.n);
      },
      /**
       * Creates precompute table for an arbitrary EC point. Makes point "cached".
       * Allows to massively speed-up `point.multiply(scalar)`.
       * @returns cached point
       * @example
       * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
       * fast.multiply(privKey); // much faster ECDH now
       */
      precompute(windowSize = 8, point = Point3.BASE) {
        point._setWindowSize(windowSize);
        point.multiply(BigInt(3));
        return point;
      }
    };
    function getPublicKey2(privateKey, isCompressed = true) {
      return Point3.fromPrivateKey(privateKey).toRawBytes(isCompressed);
    }
    function isProbPub(item) {
      const arr = isBytes3(item);
      const str = typeof item === "string";
      const len = (arr || str) && item.length;
      if (arr)
        return len === compressedLen || len === uncompressedLen;
      if (str)
        return len === 2 * compressedLen || len === 2 * uncompressedLen;
      if (item instanceof Point3)
        return true;
      return false;
    }
    function getSharedSecret(privateA, publicB, isCompressed = true) {
      if (isProbPub(privateA))
        throw new Error("first arg must be private key");
      if (!isProbPub(publicB))
        throw new Error("second arg must be public key");
      const b = Point3.fromHex(publicB);
      return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
    }
    const bits2int = CURVE.bits2int || function(bytes4) {
      if (bytes4.length > 8192)
        throw new Error("input is too large");
      const num2 = bytesToNumberBE2(bytes4);
      const delta = bytes4.length * 8 - CURVE.nBitLength;
      return delta > 0 ? num2 >> BigInt(delta) : num2;
    };
    const bits2int_modN = CURVE.bits2int_modN || function(bytes4) {
      return modN3(bits2int(bytes4));
    };
    const ORDER_MASK = bitMask2(CURVE.nBitLength);
    function int2octets(num2) {
      aInRange("num < 2^" + CURVE.nBitLength, num2, _0n9, ORDER_MASK);
      return numberToBytesBE2(num2, CURVE.nByteLength);
    }
    function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
      if (["recovered", "canonical"].some((k) => k in opts))
        throw new Error("sign() legacy options not supported");
      const { hash: hash3, randomBytes: randomBytes4 } = CURVE;
      let { lowS, prehash, extraEntropy: ent } = opts;
      if (lowS == null)
        lowS = true;
      msgHash = ensureBytes2("msgHash", msgHash);
      validateSigVerOpts(opts);
      if (prehash)
        msgHash = ensureBytes2("prehashed msgHash", hash3(msgHash));
      const h1int = bits2int_modN(msgHash);
      const d4 = normPrivateKeyToScalar(privateKey);
      const seedArgs = [int2octets(d4), int2octets(h1int)];
      if (ent != null && ent !== false) {
        const e = ent === true ? randomBytes4(Fp2.BYTES) : ent;
        seedArgs.push(ensureBytes2("extraEntropy", e));
      }
      const seed = concatBytes5(...seedArgs);
      const m = h1int;
      function k2sig(kBytes) {
        const k = bits2int(kBytes);
        if (!isWithinCurveOrder(k))
          return;
        const ik = invN(k);
        const q = Point3.BASE.multiply(k).toAffine();
        const r = modN3(q.x);
        if (r === _0n9)
          return;
        const s = modN3(ik * modN3(m + r * d4));
        if (s === _0n9)
          return;
        let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n9);
        let normS = s;
        if (lowS && isBiggerThanHalfOrder(s)) {
          normS = normalizeS(s);
          recovery ^= 1;
        }
        return new Signature(r, normS, recovery);
      }
      return { seed, k2sig };
    }
    const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
    const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
    function sign(msgHash, privKey, opts = defaultSigOpts) {
      const { seed, k2sig } = prepSig(msgHash, privKey, opts);
      const C = CURVE;
      const drbg = createHmacDrbg2(C.hash.outputLen, C.nByteLength, C.hmac);
      return drbg(seed, k2sig);
    }
    Point3.BASE._setWindowSize(8);
    function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
      const sg = signature;
      msgHash = ensureBytes2("msgHash", msgHash);
      publicKey = ensureBytes2("publicKey", publicKey);
      const { lowS, prehash, format } = opts;
      validateSigVerOpts(opts);
      if ("strict" in opts)
        throw new Error("options.strict was renamed to lowS");
      if (format !== void 0 && format !== "compact" && format !== "der")
        throw new Error("format must be compact or der");
      const isHex = typeof sg === "string" || isBytes3(sg);
      const isObj = !isHex && !format && typeof sg === "object" && sg !== null && typeof sg.r === "bigint" && typeof sg.s === "bigint";
      if (!isHex && !isObj)
        throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
      let _sig = void 0;
      let P;
      try {
        if (isObj)
          _sig = new Signature(sg.r, sg.s);
        if (isHex) {
          try {
            if (format !== "compact")
              _sig = Signature.fromDER(sg);
          } catch (derError) {
            if (!(derError instanceof DER2.Err))
              throw derError;
          }
          if (!_sig && format !== "der")
            _sig = Signature.fromCompact(sg);
        }
        P = Point3.fromHex(publicKey);
      } catch (error) {
        return false;
      }
      if (!_sig)
        return false;
      if (lowS && _sig.hasHighS())
        return false;
      if (prehash)
        msgHash = CURVE.hash(msgHash);
      const { r, s } = _sig;
      const h = bits2int_modN(msgHash);
      const is = invN(s);
      const u1 = modN3(h * is);
      const u2 = modN3(r * is);
      const R = Point3.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine();
      if (!R)
        return false;
      const v = modN3(R.x);
      return v === r;
    }
    return {
      CURVE,
      getPublicKey: getPublicKey2,
      getSharedSecret,
      sign,
      verify,
      ProjectivePoint: Point3,
      Signature,
      utils
    };
  }

  // node_modules/@noble/curves/esm/_shortw_utils.js
  function getHash2(hash3) {
    return {
      hash: hash3,
      hmac: (key, ...msgs) => hmac3(hash3, key, concatBytes4(...msgs)),
      randomBytes: randomBytes3
    };
  }
  function createCurve2(curveDef, defHash) {
    const create = (hash3) => weierstrass2({ ...curveDef, ...getHash2(hash3) });
    return { ...create(defHash), create };
  }

  // node_modules/@noble/curves/esm/secp256k1.js
  var secp256k1P2 = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
  var secp256k1N2 = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
  var _1n10 = BigInt(1);
  var _2n8 = BigInt(2);
  var divNearest2 = (a, b) => (a + b / _2n8) / b;
  function sqrtMod2(y) {
    const P = secp256k1P2;
    const _3n5 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
    const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
    const b2 = y * y * y % P;
    const b3 = b2 * b2 * y % P;
    const b6 = pow22(b3, _3n5, P) * b3 % P;
    const b9 = pow22(b6, _3n5, P) * b3 % P;
    const b11 = pow22(b9, _2n8, P) * b2 % P;
    const b22 = pow22(b11, _11n, P) * b11 % P;
    const b44 = pow22(b22, _22n, P) * b22 % P;
    const b88 = pow22(b44, _44n, P) * b44 % P;
    const b176 = pow22(b88, _88n, P) * b88 % P;
    const b220 = pow22(b176, _44n, P) * b44 % P;
    const b223 = pow22(b220, _3n5, P) * b3 % P;
    const t1 = pow22(b223, _23n, P) * b22 % P;
    const t2 = pow22(t1, _6n, P) * b2 % P;
    const root = pow22(t2, _2n8, P);
    if (!Fpk1.eql(Fpk1.sqr(root), y))
      throw new Error("Cannot find square root");
    return root;
  }
  var Fpk1 = Field2(secp256k1P2, void 0, void 0, { sqrt: sqrtMod2 });
  var secp256k12 = createCurve2({
    a: BigInt(0),
    // equation params: a, b
    b: BigInt(7),
    Fp: Fpk1,
    // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
    n: secp256k1N2,
    // Curve order, total count of valid points in the field
    // Base point (x, y) aka generator point
    Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
    Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
    h: BigInt(1),
    // Cofactor
    lowS: true,
    // Allow only low-S signatures by default in sign() and verify()
    endo: {
      // Endomorphism, see above
      beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
      splitScalar: (k) => {
        const n = secp256k1N2;
        const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
        const b1 = -_1n10 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
        const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
        const b2 = a1;
        const POW_2_128 = BigInt("0x100000000000000000000000000000000");
        const c1 = divNearest2(b2 * k, n);
        const c2 = divNearest2(-b1 * k, n);
        let k1 = mod2(k - c1 * a1 - c2 * a2, n);
        let k2 = mod2(-c1 * b1 - c2 * b2, n);
        const k1neg = k1 > POW_2_128;
        const k2neg = k2 > POW_2_128;
        if (k1neg)
          k1 = n - k1;
        if (k2neg)
          k2 = n - k2;
        if (k1 > POW_2_128 || k2 > POW_2_128) {
          throw new Error("splitScalar: Endomorphism failed, k=" + k);
        }
        return { k1neg, k1, k2neg, k2 };
      }
    }
  }, sha2563);
  var _0n10 = BigInt(0);
  var TAGGED_HASH_PREFIXES2 = {};
  function taggedHash2(tag, ...messages) {
    let tagP = TAGGED_HASH_PREFIXES2[tag];
    if (tagP === void 0) {
      const tagH = sha2563(Uint8Array.from(tag, (c) => c.charCodeAt(0)));
      tagP = concatBytes5(tagH, tagH);
      TAGGED_HASH_PREFIXES2[tag] = tagP;
    }
    return sha2563(concatBytes5(tagP, ...messages));
  }
  var pointToBytes2 = (point) => point.toRawBytes(true).slice(1);
  var numTo32b2 = (n) => numberToBytesBE2(n, 32);
  var modP2 = (x) => mod2(x, secp256k1P2);
  var modN2 = (x) => mod2(x, secp256k1N2);
  var Point2 = secp256k12.ProjectivePoint;
  var GmulAdd2 = (Q, a, b) => Point2.BASE.multiplyAndAddUnsafe(Q, a, b);
  function schnorrGetExtPubKey2(priv) {
    let d_ = secp256k12.utils.normPrivateKeyToScalar(priv);
    let p = Point2.fromPrivateKey(d_);
    const scalar = p.hasEvenY() ? d_ : modN2(-d_);
    return { scalar, bytes: pointToBytes2(p) };
  }
  function lift_x2(x) {
    aInRange("x", x, _1n10, secp256k1P2);
    const xx = modP2(x * x);
    const c = modP2(xx * x + BigInt(7));
    let y = sqrtMod2(c);
    if (y % _2n8 !== _0n10)
      y = modP2(-y);
    const p = new Point2(x, y, _1n10);
    p.assertValidity();
    return p;
  }
  var num = bytesToNumberBE2;
  function challenge2(...args) {
    return modN2(num(taggedHash2("BIP0340/challenge", ...args)));
  }
  function schnorrGetPublicKey2(privateKey) {
    return schnorrGetExtPubKey2(privateKey).bytes;
  }
  function schnorrSign2(message, privateKey, auxRand = randomBytes3(32)) {
    const m = ensureBytes2("message", message);
    const { bytes: px, scalar: d4 } = schnorrGetExtPubKey2(privateKey);
    const a = ensureBytes2("auxRand", auxRand, 32);
    const t = numTo32b2(d4 ^ num(taggedHash2("BIP0340/aux", a)));
    const rand = taggedHash2("BIP0340/nonce", t, px, m);
    const k_ = modN2(num(rand));
    if (k_ === _0n10)
      throw new Error("sign failed: k is zero");
    const { bytes: rx, scalar: k } = schnorrGetExtPubKey2(k_);
    const e = challenge2(rx, px, m);
    const sig = new Uint8Array(64);
    sig.set(rx, 0);
    sig.set(numTo32b2(modN2(k + e * d4)), 32);
    if (!schnorrVerify2(sig, m, px))
      throw new Error("sign: Invalid signature produced");
    return sig;
  }
  function schnorrVerify2(signature, message, publicKey) {
    const sig = ensureBytes2("signature", signature, 64);
    const m = ensureBytes2("message", message);
    const pub = ensureBytes2("publicKey", publicKey, 32);
    try {
      const P = lift_x2(num(pub));
      const r = num(sig.subarray(0, 32));
      if (!inRange(r, _1n10, secp256k1P2))
        return false;
      const s = num(sig.subarray(32, 64));
      if (!inRange(s, _1n10, secp256k1N2))
        return false;
      const e = challenge2(numTo32b2(r), pointToBytes2(P), m);
      const R = GmulAdd2(P, s, modN2(-e));
      if (!R || !R.hasEvenY() || R.toAffine().x !== r)
        return false;
      return true;
    } catch (error) {
      return false;
    }
  }
  var schnorr2 = /* @__PURE__ */ (() => ({
    getPublicKey: schnorrGetPublicKey2,
    sign: schnorrSign2,
    verify: schnorrVerify2,
    utils: {
      randomPrivateKey: secp256k12.utils.randomPrivateKey,
      lift_x: lift_x2,
      pointToBytes: pointToBytes2,
      numberToBytesBE: numberToBytesBE2,
      bytesToNumberBE: bytesToNumberBE2,
      taggedHash: taggedHash2,
      mod: mod2
    }
  }))();

  // node_modules/@nostr-dev-kit/ndk/dist/index.mjs
  var import_typescript_lru_cache = __toESM(require_dist(), 1);
  var import_tseep4 = __toESM(require_lib(), 1);

  // node_modules/@scure/base/lib/esm/index.js
  function isBytes4(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
  }
  function isArrayOf(isString2, arr) {
    if (!Array.isArray(arr))
      return false;
    if (arr.length === 0)
      return true;
    if (isString2) {
      return arr.every((item) => typeof item === "string");
    } else {
      return arr.every((item) => Number.isSafeInteger(item));
    }
  }
  function afn(input) {
    if (typeof input !== "function")
      throw new Error("function expected");
    return true;
  }
  function astr(label, input) {
    if (typeof input !== "string")
      throw new Error(`${label}: string expected`);
    return true;
  }
  function anumber2(n) {
    if (!Number.isSafeInteger(n))
      throw new Error(`invalid integer: ${n}`);
  }
  function aArr(input) {
    if (!Array.isArray(input))
      throw new Error("array expected");
  }
  function astrArr(label, input) {
    if (!isArrayOf(true, input))
      throw new Error(`${label}: array of strings expected`);
  }
  function anumArr(label, input) {
    if (!isArrayOf(false, input))
      throw new Error(`${label}: array of numbers expected`);
  }
  // @__NO_SIDE_EFFECTS__
  function chain2(...args) {
    const id = (a) => a;
    const wrap = (a, b) => (c) => a(b(c));
    const encode2 = args.map((x) => x.encode).reduceRight(wrap, id);
    const decode3 = args.map((x) => x.decode).reduce(wrap, id);
    return { encode: encode2, decode: decode3 };
  }
  // @__NO_SIDE_EFFECTS__
  function alphabet2(letters) {
    const lettersA = typeof letters === "string" ? letters.split("") : letters;
    const len = lettersA.length;
    astrArr("alphabet", lettersA);
    const indexes = new Map(lettersA.map((l, i2) => [l, i2]));
    return {
      encode: (digits) => {
        aArr(digits);
        return digits.map((i2) => {
          if (!Number.isSafeInteger(i2) || i2 < 0 || i2 >= len)
            throw new Error(`alphabet.encode: digit index outside alphabet "${i2}". Allowed: ${letters}`);
          return lettersA[i2];
        });
      },
      decode: (input) => {
        aArr(input);
        return input.map((letter) => {
          astr("alphabet.decode", letter);
          const i2 = indexes.get(letter);
          if (i2 === void 0)
            throw new Error(`Unknown letter: "${letter}". Allowed: ${letters}`);
          return i2;
        });
      }
    };
  }
  // @__NO_SIDE_EFFECTS__
  function join2(separator = "") {
    astr("join", separator);
    return {
      encode: (from) => {
        astrArr("join.decode", from);
        return from.join(separator);
      },
      decode: (to) => {
        astr("join.decode", to);
        return to.split(separator);
      }
    };
  }
  var gcd2 = (a, b) => b === 0 ? a : gcd2(b, a % b);
  var radix2carry2 = /* @__NO_SIDE_EFFECTS__ */ (from, to) => from + (to - gcd2(from, to));
  var powers = /* @__PURE__ */ (() => {
    let res = [];
    for (let i2 = 0; i2 < 40; i2++)
      res.push(2 ** i2);
    return res;
  })();
  function convertRadix22(data, from, to, padding2) {
    aArr(data);
    if (from <= 0 || from > 32)
      throw new Error(`convertRadix2: wrong from=${from}`);
    if (to <= 0 || to > 32)
      throw new Error(`convertRadix2: wrong to=${to}`);
    if (/* @__PURE__ */ radix2carry2(from, to) > 32) {
      throw new Error(`convertRadix2: carry overflow from=${from} to=${to} carryBits=${/* @__PURE__ */ radix2carry2(from, to)}`);
    }
    let carry = 0;
    let pos = 0;
    const max = powers[from];
    const mask = powers[to] - 1;
    const res = [];
    for (const n of data) {
      anumber2(n);
      if (n >= max)
        throw new Error(`convertRadix2: invalid data word=${n} from=${from}`);
      carry = carry << from | n;
      if (pos + from > 32)
        throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from}`);
      pos += from;
      for (; pos >= to; pos -= to)
        res.push((carry >> pos - to & mask) >>> 0);
      const pow4 = powers[pos];
      if (pow4 === void 0)
        throw new Error("invalid carry");
      carry &= pow4 - 1;
    }
    carry = carry << to - pos & mask;
    if (!padding2 && pos >= from)
      throw new Error("Excess padding");
    if (!padding2 && carry > 0)
      throw new Error(`Non-zero padding: ${carry}`);
    if (padding2 && pos > 0)
      res.push(carry >>> 0);
    return res;
  }
  // @__NO_SIDE_EFFECTS__
  function radix22(bits, revPadding = false) {
    anumber2(bits);
    if (bits <= 0 || bits > 32)
      throw new Error("radix2: bits should be in (0..32]");
    if (/* @__PURE__ */ radix2carry2(8, bits) > 32 || /* @__PURE__ */ radix2carry2(bits, 8) > 32)
      throw new Error("radix2: carry overflow");
    return {
      encode: (bytes4) => {
        if (!isBytes4(bytes4))
          throw new Error("radix2.encode input should be Uint8Array");
        return convertRadix22(Array.from(bytes4), 8, bits, !revPadding);
      },
      decode: (digits) => {
        anumArr("radix2.decode", digits);
        return Uint8Array.from(convertRadix22(digits, bits, 8, revPadding));
      }
    };
  }
  function unsafeWrapper2(fn) {
    afn(fn);
    return function(...args) {
      try {
        return fn.apply(null, args);
      } catch (e) {
      }
    };
  }
  var BECH_ALPHABET2 = /* @__PURE__ */ chain2(/* @__PURE__ */ alphabet2("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), /* @__PURE__ */ join2(""));
  var POLYMOD_GENERATORS2 = [996825010, 642813549, 513874426, 1027748829, 705979059];
  function bech32Polymod2(pre) {
    const b = pre >> 25;
    let chk = (pre & 33554431) << 5;
    for (let i2 = 0; i2 < POLYMOD_GENERATORS2.length; i2++) {
      if ((b >> i2 & 1) === 1)
        chk ^= POLYMOD_GENERATORS2[i2];
    }
    return chk;
  }
  function bechChecksum2(prefix, words, encodingConst = 1) {
    const len = prefix.length;
    let chk = 1;
    for (let i2 = 0; i2 < len; i2++) {
      const c = prefix.charCodeAt(i2);
      if (c < 33 || c > 126)
        throw new Error(`Invalid prefix (${prefix})`);
      chk = bech32Polymod2(chk) ^ c >> 5;
    }
    chk = bech32Polymod2(chk);
    for (let i2 = 0; i2 < len; i2++)
      chk = bech32Polymod2(chk) ^ prefix.charCodeAt(i2) & 31;
    for (let v of words)
      chk = bech32Polymod2(chk) ^ v;
    for (let i2 = 0; i2 < 6; i2++)
      chk = bech32Polymod2(chk);
    chk ^= encodingConst;
    return BECH_ALPHABET2.encode(convertRadix22([chk % powers[30]], 30, 5, false));
  }
  // @__NO_SIDE_EFFECTS__
  function genBech322(encoding) {
    const ENCODING_CONST = encoding === "bech32" ? 1 : 734539939;
    const _words = /* @__PURE__ */ radix22(5);
    const fromWords = _words.decode;
    const toWords = _words.encode;
    const fromWordsUnsafe = unsafeWrapper2(fromWords);
    function encode2(prefix, words, limit2 = 90) {
      astr("bech32.encode prefix", prefix);
      if (isBytes4(words))
        words = Array.from(words);
      anumArr("bech32.encode", words);
      const plen = prefix.length;
      if (plen === 0)
        throw new TypeError(`Invalid prefix length ${plen}`);
      const actualLength = plen + 7 + words.length;
      if (limit2 !== false && actualLength > limit2)
        throw new TypeError(`Length ${actualLength} exceeds limit ${limit2}`);
      const lowered = prefix.toLowerCase();
      const sum = bechChecksum2(lowered, words, ENCODING_CONST);
      return `${lowered}1${BECH_ALPHABET2.encode(words)}${sum}`;
    }
    function decode3(str, limit2 = 90) {
      astr("bech32.decode input", str);
      const slen = str.length;
      if (slen < 8 || limit2 !== false && slen > limit2)
        throw new TypeError(`invalid string length: ${slen} (${str}). Expected (8..${limit2})`);
      const lowered = str.toLowerCase();
      if (str !== lowered && str !== str.toUpperCase())
        throw new Error(`String must be lowercase or uppercase`);
      const sepIndex = lowered.lastIndexOf("1");
      if (sepIndex === 0 || sepIndex === -1)
        throw new Error(`Letter "1" must be present between prefix and data only`);
      const prefix = lowered.slice(0, sepIndex);
      const data = lowered.slice(sepIndex + 1);
      if (data.length < 6)
        throw new Error("Data must be at least 6 characters long");
      const words = BECH_ALPHABET2.decode(data).slice(0, -6);
      const sum = bechChecksum2(prefix, words, ENCODING_CONST);
      if (!data.endsWith(sum))
        throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
      return { prefix, words };
    }
    const decodeUnsafe = unsafeWrapper2(decode3);
    function decodeToBytes(str) {
      const { prefix, words } = decode3(str, false);
      return { prefix, words, bytes: fromWords(words) };
    }
    function encodeFromBytes(prefix, bytes4) {
      return encode2(prefix, toWords(bytes4));
    }
    return {
      encode: encode2,
      decode: decode3,
      encodeFromBytes,
      decodeToBytes,
      decodeUnsafe,
      fromWords,
      fromWordsUnsafe,
      toWords
    };
  }
  var bech322 = /* @__PURE__ */ genBech322("bech32");

  // node_modules/@nostr-dev-kit/ndk/dist/index.mjs
  var import_debug3 = __toESM(require_browser(), 1);
  var import_debug4 = __toESM(require_browser(), 1);
  var import_debug5 = __toESM(require_browser(), 1);
  var import_debug6 = __toESM(require_browser(), 1);
  var import_debug7 = __toESM(require_browser(), 1);
  var import_debug8 = __toESM(require_browser(), 1);
  var import_tseep5 = __toESM(require_lib(), 1);
  var import_tseep6 = __toESM(require_lib(), 1);
  var import_debug9 = __toESM(require_browser(), 1);
  var import_tseep7 = __toESM(require_lib(), 1);
  var import_tseep8 = __toESM(require_lib(), 1);
  var import_typescript_lru_cache2 = __toESM(require_dist(), 1);
  var import_debug10 = __toESM(require_browser(), 1);
  var import_light_bolt11_decoder = __toESM(require_bolt11(), 1);
  var import_debug11 = __toESM(require_browser(), 1);
  var import_tseep9 = __toESM(require_lib(), 1);
  function getRelaysForSync(ndk, author, type = "write") {
    if (!ndk.outboxTracker) return void 0;
    const item = ndk.outboxTracker.data.get(author);
    if (!item) return void 0;
    if (type === "write") {
      return item.writeRelays;
    } else {
      return item.readRelays;
    }
  }
  async function getWriteRelaysFor(ndk, author, type = "write") {
    if (!ndk.outboxTracker) return void 0;
    if (!ndk.outboxTracker.data.has(author)) {
      await ndk.outboxTracker.trackUsers([author]);
    }
    return getRelaysForSync(ndk, author, type);
  }
  function getTopRelaysForAuthors(ndk, authors) {
    const relaysWithCount = /* @__PURE__ */ new Map();
    authors.forEach((author) => {
      const writeRelays = getRelaysForSync(ndk, author);
      if (writeRelays) {
        writeRelays.forEach((relay) => {
          const count = relaysWithCount.get(relay) || 0;
          relaysWithCount.set(relay, count + 1);
        });
      }
    });
    const sortedRelays = Array.from(relaysWithCount.entries()).sort((a, b) => b[1] - a[1]);
    return sortedRelays.map((entry) => entry[0]);
  }
  function getAllRelaysForAllPubkeys(ndk, pubkeys, type = "read") {
    const pubkeysToRelays = /* @__PURE__ */ new Map();
    const authorsMissingRelays = /* @__PURE__ */ new Set();
    pubkeys.forEach((pubkey) => {
      const relays = getRelaysForSync(ndk, pubkey, type);
      if (relays && relays.size > 0) {
        relays.forEach((relay) => {
          const pubkeysInRelay = pubkeysToRelays.get(relay) || /* @__PURE__ */ new Set();
          pubkeysInRelay.add(pubkey);
        });
        pubkeysToRelays.set(pubkey, relays);
      } else {
        authorsMissingRelays.add(pubkey);
      }
    });
    return { pubkeysToRelays, authorsMissingRelays };
  }
  function chooseRelayCombinationForPubkeys(ndk, pubkeys, type, { count, preferredRelays } = {}) {
    count ??= 2;
    preferredRelays ??= /* @__PURE__ */ new Set();
    const pool = ndk.pool;
    const connectedRelays = pool.connectedRelays();
    connectedRelays.forEach((relay) => {
      preferredRelays.add(relay.url);
    });
    const relayToAuthorsMap = /* @__PURE__ */ new Map();
    const { pubkeysToRelays, authorsMissingRelays } = getAllRelaysForAllPubkeys(ndk, pubkeys, type);
    const sortedRelays = getTopRelaysForAuthors(ndk, pubkeys);
    const addAuthorToRelay = (author, relay) => {
      const authorsInRelay = relayToAuthorsMap.get(relay) || [];
      authorsInRelay.push(author);
      relayToAuthorsMap.set(relay, authorsInRelay);
    };
    for (const [author, authorRelays] of pubkeysToRelays.entries()) {
      let missingRelayCount = count;
      for (const relay of connectedRelays) {
        if (authorRelays.has(relay.url)) {
          addAuthorToRelay(author, relay.url);
          missingRelayCount--;
        }
      }
      for (const authorRelay of authorRelays) {
        if (relayToAuthorsMap.has(authorRelay)) {
          addAuthorToRelay(author, authorRelay);
          missingRelayCount--;
        }
      }
      if (missingRelayCount <= 0) continue;
      for (const relay of sortedRelays) {
        if (missingRelayCount <= 0) break;
        if (authorRelays.has(relay)) {
          addAuthorToRelay(author, relay);
          missingRelayCount--;
        }
      }
    }
    for (const author of authorsMissingRelays) {
      pool.permanentAndConnectedRelays().forEach((relay) => {
        const authorsInRelay = relayToAuthorsMap.get(relay.url) || [];
        authorsInRelay.push(author);
        relayToAuthorsMap.set(relay.url, authorsInRelay);
      });
    }
    return relayToAuthorsMap;
  }
  function getRelaysForFilterWithAuthors(ndk, authors, relayGoalPerAuthor = 2) {
    return chooseRelayCombinationForPubkeys(ndk, authors, "write", { count: relayGoalPerAuthor });
  }
  function tryNormalizeRelayUrl(url) {
    try {
      return normalizeRelayUrl(url);
    } catch {
      return void 0;
    }
  }
  function normalizeRelayUrl(url) {
    let r = normalizeUrl(url.toLowerCase(), {
      stripAuthentication: false,
      stripWWW: false,
      stripHash: true
    });
    if (!r.endsWith("/")) {
      r += "/";
    }
    return r;
  }
  function normalize2(urls) {
    const normalized = /* @__PURE__ */ new Set();
    for (const url of urls) {
      try {
        normalized.add(normalizeRelayUrl(url));
      } catch {
      }
    }
    return Array.from(normalized);
  }
  var DATA_URL_DEFAULT_MIME_TYPE = "text/plain";
  var DATA_URL_DEFAULT_CHARSET = "us-ascii";
  var testParameter = (name, filters) => filters.some((filter) => filter instanceof RegExp ? filter.test(name) : filter === name);
  var supportedProtocols = /* @__PURE__ */ new Set(["https:", "http:", "file:"]);
  var hasCustomProtocol = (urlString) => {
    try {
      const { protocol } = new URL(urlString);
      return protocol.endsWith(":") && !protocol.includes(".") && !supportedProtocols.has(protocol);
    } catch {
      return false;
    }
  };
  var normalizeDataURL = (urlString, { stripHash }) => {
    const match = /^data:(?<type>[^,]*?),(?<data>[^#]*?)(?:#(?<hash>.*))?$/.exec(urlString);
    if (!match) {
      throw new Error(`Invalid URL: ${urlString}`);
    }
    let type = match.groups?.type ?? "";
    let data = match.groups?.data ?? "";
    let hash3 = match.groups?.hash ?? "";
    const mediaType = type.split(";");
    hash3 = stripHash ? "" : hash3;
    let isBase64 = false;
    if (mediaType[mediaType.length - 1] === "base64") {
      mediaType.pop();
      isBase64 = true;
    }
    const mimeType = mediaType.shift()?.toLowerCase() ?? "";
    const attributes = mediaType.map((attribute) => {
      let [key, value = ""] = attribute.split("=").map((string) => string.trim());
      if (key === "charset") {
        value = value.toLowerCase();
        if (value === DATA_URL_DEFAULT_CHARSET) {
          return "";
        }
      }
      return `${key}${value ? `=${value}` : ""}`;
    }).filter(Boolean);
    const normalizedMediaType = [...attributes];
    if (isBase64) {
      normalizedMediaType.push("base64");
    }
    if (normalizedMediaType.length > 0 || mimeType && mimeType !== DATA_URL_DEFAULT_MIME_TYPE) {
      normalizedMediaType.unshift(mimeType);
    }
    return `data:${normalizedMediaType.join(";")},${isBase64 ? data.trim() : data}${hash3 ? `#${hash3}` : ""}`;
  };
  function normalizeUrl(urlString, options = {}) {
    options = {
      defaultProtocol: "http",
      normalizeProtocol: true,
      forceHttp: false,
      forceHttps: false,
      stripAuthentication: true,
      stripHash: false,
      stripTextFragment: true,
      stripWWW: true,
      removeQueryParameters: [/^utm_\w+/i],
      removeTrailingSlash: true,
      removeSingleSlash: true,
      removeDirectoryIndex: false,
      removeExplicitPort: false,
      sortQueryParameters: true,
      ...options
    };
    if (typeof options.defaultProtocol === "string" && !options.defaultProtocol.endsWith(":")) {
      options.defaultProtocol = `${options.defaultProtocol}:`;
    }
    urlString = urlString.trim();
    if (/^data:/i.test(urlString)) {
      return normalizeDataURL(urlString, options);
    }
    if (hasCustomProtocol(urlString)) {
      return urlString;
    }
    const hasRelativeProtocol = urlString.startsWith("//");
    const isRelativeUrl = !hasRelativeProtocol && /^\.*\//.test(urlString);
    if (!isRelativeUrl) {
      urlString = urlString.replace(/^(?!(?:\w+:)?\/\/)|^\/\//, options.defaultProtocol);
    }
    const urlObject = new URL(urlString);
    if (options.forceHttp && options.forceHttps) {
      throw new Error("The `forceHttp` and `forceHttps` options cannot be used together");
    }
    if (options.forceHttp && urlObject.protocol === "https:") {
      urlObject.protocol = "http:";
    }
    if (options.forceHttps && urlObject.protocol === "http:") {
      urlObject.protocol = "https:";
    }
    if (options.stripAuthentication) {
      urlObject.username = "";
      urlObject.password = "";
    }
    if (options.stripHash) {
      urlObject.hash = "";
    } else if (options.stripTextFragment) {
      urlObject.hash = urlObject.hash.replace(/#?:~:text.*?$/i, "");
    }
    if (urlObject.pathname) {
      const protocolRegex = /\b[a-z][a-z\d+\-.]{1,50}:\/\//g;
      let lastIndex = 0;
      let result = "";
      for (; ; ) {
        const match = protocolRegex.exec(urlObject.pathname);
        if (!match) {
          break;
        }
        const protocol = match[0];
        const protocolAtIndex = match.index;
        const intermediate = urlObject.pathname.slice(lastIndex, protocolAtIndex);
        result += intermediate.replace(/\/{2,}/g, "/");
        result += protocol;
        lastIndex = protocolAtIndex + protocol.length;
      }
      const remnant = urlObject.pathname.slice(lastIndex, urlObject.pathname.length);
      result += remnant.replace(/\/{2,}/g, "/");
      urlObject.pathname = result;
    }
    if (urlObject.pathname) {
      try {
        urlObject.pathname = decodeURI(urlObject.pathname);
      } catch {
      }
    }
    if (options.removeDirectoryIndex === true) {
      options.removeDirectoryIndex = [/^index\.[a-z]+$/];
    }
    if (Array.isArray(options.removeDirectoryIndex) && options.removeDirectoryIndex.length > 0) {
      let pathComponents = urlObject.pathname.split("/");
      const lastComponent = pathComponents[pathComponents.length - 1];
      if (testParameter(lastComponent, options.removeDirectoryIndex)) {
        pathComponents = pathComponents.slice(0, -1);
        urlObject.pathname = pathComponents.slice(1).join("/") + "/";
      }
    }
    if (urlObject.hostname) {
      urlObject.hostname = urlObject.hostname.replace(/\.$/, "");
      if (options.stripWWW && /^www\.(?!www\.)[a-z\-\d]{1,63}\.[a-z.\-\d]{2,63}$/.test(urlObject.hostname)) {
        urlObject.hostname = urlObject.hostname.replace(/^www\./, "");
      }
    }
    if (Array.isArray(options.removeQueryParameters)) {
      for (const key of [...urlObject.searchParams.keys()]) {
        if (testParameter(key, options.removeQueryParameters)) {
          urlObject.searchParams.delete(key);
        }
      }
    }
    if (!Array.isArray(options.keepQueryParameters) && options.removeQueryParameters === true) {
      urlObject.search = "";
    }
    if (Array.isArray(options.keepQueryParameters) && options.keepQueryParameters.length > 0) {
      for (const key of [...urlObject.searchParams.keys()]) {
        if (!testParameter(key, options.keepQueryParameters)) {
          urlObject.searchParams.delete(key);
        }
      }
    }
    if (options.sortQueryParameters) {
      urlObject.searchParams.sort();
      try {
        urlObject.search = decodeURIComponent(urlObject.search);
      } catch {
      }
    }
    if (options.removeTrailingSlash) {
      urlObject.pathname = urlObject.pathname.replace(/\/$/, "");
    }
    if (options.removeExplicitPort && urlObject.port) {
      urlObject.port = "";
    }
    const oldUrlString = urlString;
    urlString = urlObject.toString();
    if (!options.removeSingleSlash && urlObject.pathname === "/" && !oldUrlString.endsWith("/") && urlObject.hash === "") {
      urlString = urlString.replace(/\/$/, "");
    }
    if ((options.removeTrailingSlash || urlObject.pathname === "/") && urlObject.hash === "" && options.removeSingleSlash) {
      urlString = urlString.replace(/\/$/, "");
    }
    if (hasRelativeProtocol && !options.normalizeProtocol) {
      urlString = urlString.replace(/^http:\/\//, "//");
    }
    if (options.stripProtocol) {
      urlString = urlString.replace(/^(?:https?:)?\/\//, "");
    }
    return urlString;
  }
  var NDKPublishError = class extends Error {
    errors;
    publishedToRelays;
    /**
     * Intended relay set where the publishing was intended to happen.
     */
    intendedRelaySet;
    constructor(message, errors, publishedToRelays, intendedRelaySet) {
      super(message);
      this.errors = errors;
      this.publishedToRelays = publishedToRelays;
      this.intendedRelaySet = intendedRelaySet;
    }
    get relayErrors() {
      const errors = [];
      for (const [relay, err] of this.errors) {
        errors.push(`${relay.url}: ${err}`);
      }
      return errors.join("\n");
    }
  };
  var NDKRelaySet = class _NDKRelaySet {
    relays;
    debug;
    ndk;
    pool;
    constructor(relays, ndk, pool) {
      this.relays = relays;
      this.ndk = ndk;
      this.pool = pool ?? ndk.pool;
      this.debug = ndk.debug.extend("relayset");
    }
    /**
     * Adds a relay to this set.
     */
    addRelay(relay) {
      this.relays.add(relay);
    }
    get relayUrls() {
      return Array.from(this.relays).map((r) => r.url);
    }
    /**
     * Creates a relay set from a list of relay URLs.
     *
     * If no connection to the relay is found in the pool it will temporarily
     * connect to it.
     *
     * @param relayUrls - list of relay URLs to include in this set
     * @param ndk
     * @param connect - whether to connect to the relay immediately if it was already in the pool but not connected
     * @returns NDKRelaySet
     */
    static fromRelayUrls(relayUrls, ndk, connect = true, pool) {
      pool = pool ?? ndk.pool;
      if (!pool) throw new Error("No pool provided");
      const relays = /* @__PURE__ */ new Set();
      for (const url of relayUrls) {
        const relay = pool.relays.get(normalizeRelayUrl(url));
        if (relay) {
          if (relay.status < 5 && connect) {
            relay.connect();
          }
          relays.add(relay);
        } else {
          const temporaryRelay = new NDKRelay(
            normalizeRelayUrl(url),
            ndk?.relayAuthDefaultPolicy,
            ndk
          );
          pool.useTemporaryRelay(
            temporaryRelay,
            void 0,
            "requested from fromRelayUrls " + relayUrls
          );
          relays.add(temporaryRelay);
        }
      }
      return new _NDKRelaySet(new Set(relays), ndk, pool);
    }
    /**
     * Publish an event to all relays in this set. Returns the number of relays that have received the event.
     * @param event
     * @param timeoutMs - timeout in milliseconds for each publish operation and connection operation
     * @returns A set where the event was successfully published to
     * @throws NDKPublishError if no relay was able to receive the event
     * @example
     * ```typescript
     * const event = new NDKEvent(ndk, {kinds: [NDKKind.Message], "#d": ["123"]});
     * try {
     *    const publishedToRelays = await relaySet.publish(event);
     *    console.log(`published to ${publishedToRelays.size} relays`)
     * } catch (error) {
     *   console.error("error publishing to relays", error);
     *
     *   if (error instanceof NDKPublishError) {
     *      for (const [relay, err] of error.errors) {
     *         console.error(`error publishing to relay ${relay.url}`, err);
     *       }
     *   }
     * }
     * ```
     */
    async publish(event, timeoutMs, requiredRelayCount = 1) {
      const publishedToRelays = /* @__PURE__ */ new Set();
      const errors = /* @__PURE__ */ new Map();
      const isEphemeral2 = event.isEphemeral();
      event.publishStatus = "pending";
      const promises = Array.from(this.relays).map((relay) => {
        return new Promise((resolve) => {
          relay.publish(event, timeoutMs).then((e) => {
            publishedToRelays.add(relay);
            resolve();
          }).catch((err) => {
            if (!isEphemeral2) {
              errors.set(relay, err);
            }
            resolve();
          });
        });
      });
      await Promise.all(promises);
      if (publishedToRelays.size < requiredRelayCount) {
        if (!isEphemeral2) {
          const error = new NDKPublishError(
            "Not enough relays received the event",
            errors,
            publishedToRelays,
            this
          );
          event.publishStatus = "error";
          event.publishError = error;
          this.ndk.emit("event:publish-failed", event, error, this.relayUrls);
          throw error;
        }
      } else {
        event.emit("published", { relaySet: this, publishedToRelays });
      }
      return publishedToRelays;
    }
    get size() {
      return this.relays.size;
    }
  };
  var d = (0, import_debug2.default)("ndk:outbox:calculate");
  async function calculateRelaySetFromEvent(ndk, event) {
    const relays = /* @__PURE__ */ new Set();
    const authorWriteRelays = await getWriteRelaysFor(ndk, event.pubkey);
    if (authorWriteRelays) {
      authorWriteRelays.forEach((relayUrl) => {
        const relay = ndk.pool?.getRelay(relayUrl);
        if (relay) relays.add(relay);
      });
    }
    let relayHints = event.tags.filter((tag) => ["a", "e"].includes(tag[0])).map((tag) => tag[2]).filter((url) => url && url.startsWith("wss://")).filter((url) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    }).map((url) => normalizeRelayUrl(url));
    relayHints = Array.from(new Set(relayHints)).slice(0, 5);
    relayHints.forEach((relayUrl) => {
      const relay = ndk.pool?.getRelay(relayUrl, true, true);
      if (relay) {
        d("Adding relay hint %s", relayUrl);
        relays.add(relay);
      }
    });
    const pTags = event.getMatchingTags("p").map((tag) => tag[1]);
    if (pTags.length < 5) {
      const pTaggedRelays = Array.from(
        chooseRelayCombinationForPubkeys(ndk, pTags, "read", {
          preferredRelays: new Set(authorWriteRelays)
        }).keys()
      );
      pTaggedRelays.forEach((relayUrl) => {
        const relay = ndk.pool?.getRelay(relayUrl, false, true);
        if (relay) {
          d("Adding p-tagged relay %s", relayUrl);
          relays.add(relay);
        }
      });
    } else {
      d("Too many p-tags to consider %d", pTags.length);
    }
    ndk.pool?.permanentAndConnectedRelays().forEach((relay) => relays.add(relay));
    return new NDKRelaySet(relays, ndk);
  }
  function calculateRelaySetsFromFilter(ndk, filters, pool) {
    const result = /* @__PURE__ */ new Map();
    const authors = /* @__PURE__ */ new Set();
    filters.forEach((filter) => {
      if (filter.authors) {
        filter.authors.forEach((author) => authors.add(author));
      }
    });
    if (authors.size > 0) {
      const authorToRelaysMap = getRelaysForFilterWithAuthors(ndk, Array.from(authors));
      for (const relayUrl of authorToRelaysMap.keys()) {
        result.set(relayUrl, []);
      }
      for (const filter of filters) {
        if (filter.authors) {
          for (const [relayUrl, authors2] of authorToRelaysMap.entries()) {
            const authorFilterAndRelayPubkeyIntersection = filter.authors.filter(
              (author) => authors2.includes(author)
            );
            result.set(relayUrl, [
              ...result.get(relayUrl),
              {
                ...filter,
                // Overwrite authors sent to this relay with the authors that were
                // present in the filter and are also present in the relay
                authors: authorFilterAndRelayPubkeyIntersection
              }
            ]);
          }
        } else {
          for (const relayUrl of authorToRelaysMap.keys()) {
            result.set(relayUrl, [...result.get(relayUrl), filter]);
          }
        }
      }
    } else {
      if (ndk.explicitRelayUrls) {
        ndk.explicitRelayUrls.forEach((relayUrl) => {
          result.set(relayUrl, filters);
        });
      }
    }
    if (result.size === 0) {
      pool.permanentAndConnectedRelays().slice(0, 5).forEach((relay) => {
        result.set(relay.url, filters);
      });
    }
    return result;
  }
  function calculateRelaySetsFromFilters(ndk, filters, pool) {
    const a = calculateRelaySetsFromFilter(ndk, filters, pool);
    return a;
  }
  function mergeTags(tags1, tags2) {
    const tagMap = /* @__PURE__ */ new Map();
    const generateKey = (tag) => tag.join(",");
    const isContained = (smaller, larger) => {
      return smaller.every((value, index) => value === larger[index]);
    };
    const processTag = (tag) => {
      for (const [key, existingTag] of tagMap) {
        if (isContained(existingTag, tag) || isContained(tag, existingTag)) {
          if (tag.length >= existingTag.length) {
            tagMap.set(key, tag);
          }
          return;
        }
      }
      tagMap.set(generateKey(tag), tag);
    };
    tags1.concat(tags2).forEach(processTag);
    return Array.from(tagMap.values());
  }
  async function generateContentTags(content, tags = []) {
    const tagRegex = /(@|nostr:)(npub|nprofile|note|nevent|naddr)[a-zA-Z0-9]+/g;
    const hashtagRegex = /(?<=\s|^)(#[^\s!@#$%^&*()=+./,[{\]};:'"?><]+)/g;
    const promises = [];
    const addTagIfNew = (t) => {
      if (!tags.find((t2) => ["q", t[0]].includes(t2[0]) && t2[1] === t[1])) {
        tags.push(t);
      }
    };
    content = content.replace(tagRegex, (tag) => {
      try {
        const entity = tag.split(/(@|nostr:)/)[2];
        const { type, data } = nip19_exports.decode(entity);
        let t;
        switch (type) {
          case "npub":
            t = ["p", data];
            break;
          case "nprofile":
            t = ["p", data.pubkey];
            break;
          case "note":
            promises.push(
              new Promise(async (resolve) => {
                addTagIfNew([
                  "e",
                  data,
                  await maybeGetEventRelayUrl(entity),
                  "mention"
                ]);
                resolve();
              })
            );
            break;
          case "nevent":
            promises.push(
              new Promise(async (resolve) => {
                const { id, author } = data;
                let { relays } = data;
                if (!relays || relays.length === 0) {
                  relays = [await maybeGetEventRelayUrl(entity)];
                }
                addTagIfNew(["e", id, relays[0], "mention"]);
                if (author) addTagIfNew(["p", author]);
                resolve();
              })
            );
            break;
          case "naddr":
            promises.push(
              new Promise(async (resolve) => {
                const id = [data.kind, data.pubkey, data.identifier].join(":");
                let relays = data.relays ?? [];
                if (relays.length === 0) {
                  relays = [await maybeGetEventRelayUrl(entity)];
                }
                addTagIfNew(["a", id, relays[0], "mention"]);
                addTagIfNew(["p", data.pubkey]);
                resolve();
              })
            );
            break;
          default:
            return tag;
        }
        if (t) addTagIfNew(t);
        return `nostr:${entity}`;
      } catch (error) {
        return tag;
      }
    });
    await Promise.all(promises);
    content = content.replace(hashtagRegex, (tag, word) => {
      const t = ["t", word.slice(1)];
      if (!tags.find((t2) => t2[0] === t[0] && t2[1] === t[1])) {
        tags.push(t);
      }
      return tag;
    });
    return { content, tags };
  }
  async function maybeGetEventRelayUrl(nip19Id) {
    return "";
  }
  function isReplaceable() {
    if (this.kind === void 0) throw new Error("Kind not set");
    return [0, 3].includes(this.kind) || this.kind >= 1e4 && this.kind < 2e4 || this.kind >= 3e4 && this.kind < 4e4;
  }
  function isEphemeral() {
    if (this.kind === void 0) throw new Error("Kind not set");
    return this.kind >= 2e4 && this.kind < 3e4;
  }
  function isParamReplaceable() {
    if (this.kind === void 0) throw new Error("Kind not set");
    return this.kind >= 3e4 && this.kind < 4e4;
  }
  var NDKKind = /* @__PURE__ */ ((NDKKind22) => {
    NDKKind22[NDKKind22["Metadata"] = 0] = "Metadata";
    NDKKind22[NDKKind22["Text"] = 1] = "Text";
    NDKKind22[NDKKind22["RecommendRelay"] = 2] = "RecommendRelay";
    NDKKind22[NDKKind22["Contacts"] = 3] = "Contacts";
    NDKKind22[NDKKind22["EncryptedDirectMessage"] = 4] = "EncryptedDirectMessage";
    NDKKind22[NDKKind22["EventDeletion"] = 5] = "EventDeletion";
    NDKKind22[NDKKind22["Repost"] = 6] = "Repost";
    NDKKind22[NDKKind22["Reaction"] = 7] = "Reaction";
    NDKKind22[NDKKind22["BadgeAward"] = 8] = "BadgeAward";
    NDKKind22[NDKKind22["GroupChat"] = 9] = "GroupChat";
    NDKKind22[NDKKind22["GroupNote"] = 11] = "GroupNote";
    NDKKind22[NDKKind22["GroupReply"] = 12] = "GroupReply";
    NDKKind22[NDKKind22["Image"] = 20] = "Image";
    NDKKind22[NDKKind22["GenericRespose"] = 22] = "GenericRespose";
    NDKKind22[NDKKind22["GenericRepost"] = 16] = "GenericRepost";
    NDKKind22[NDKKind22["ChannelCreation"] = 40] = "ChannelCreation";
    NDKKind22[NDKKind22["ChannelMetadata"] = 41] = "ChannelMetadata";
    NDKKind22[NDKKind22["ChannelMessage"] = 42] = "ChannelMessage";
    NDKKind22[NDKKind22["ChannelHideMessage"] = 43] = "ChannelHideMessage";
    NDKKind22[NDKKind22["ChannelMuteUser"] = 44] = "ChannelMuteUser";
    NDKKind22[NDKKind22["GenericReply"] = 1111] = "GenericReply";
    NDKKind22[NDKKind22["Media"] = 1063] = "Media";
    NDKKind22[NDKKind22["Report"] = 1984] = "Report";
    NDKKind22[NDKKind22["Label"] = 1985] = "Label";
    NDKKind22[NDKKind22["DVMReqTextExtraction"] = 5e3] = "DVMReqTextExtraction";
    NDKKind22[NDKKind22["DVMReqTextSummarization"] = 5001] = "DVMReqTextSummarization";
    NDKKind22[NDKKind22["DVMReqTextTranslation"] = 5002] = "DVMReqTextTranslation";
    NDKKind22[NDKKind22["DVMReqTextGeneration"] = 5050] = "DVMReqTextGeneration";
    NDKKind22[NDKKind22["DVMReqImageGeneration"] = 5100] = "DVMReqImageGeneration";
    NDKKind22[NDKKind22["DVMReqTextToSpeech"] = 5250] = "DVMReqTextToSpeech";
    NDKKind22[NDKKind22["DVMReqDiscoveryNostrContent"] = 5300] = "DVMReqDiscoveryNostrContent";
    NDKKind22[NDKKind22["DVMReqDiscoveryNostrPeople"] = 5301] = "DVMReqDiscoveryNostrPeople";
    NDKKind22[NDKKind22["DVMReqTimestamping"] = 5900] = "DVMReqTimestamping";
    NDKKind22[NDKKind22["DVMEventSchedule"] = 5905] = "DVMEventSchedule";
    NDKKind22[NDKKind22["DVMJobFeedback"] = 7e3] = "DVMJobFeedback";
    NDKKind22[NDKKind22["Subscribe"] = 7001] = "Subscribe";
    NDKKind22[NDKKind22["Unsubscribe"] = 7002] = "Unsubscribe";
    NDKKind22[NDKKind22["SubscriptionReceipt"] = 7003] = "SubscriptionReceipt";
    NDKKind22[NDKKind22["CashuReserve"] = 7373] = "CashuReserve";
    NDKKind22[NDKKind22["CashuQuote"] = 7374] = "CashuQuote";
    NDKKind22[NDKKind22["CashuToken"] = 7375] = "CashuToken";
    NDKKind22[NDKKind22["WalletChange"] = 7376] = "WalletChange";
    NDKKind22[NDKKind22["GroupAdminAddUser"] = 9e3] = "GroupAdminAddUser";
    NDKKind22[NDKKind22["GroupAdminRemoveUser"] = 9001] = "GroupAdminRemoveUser";
    NDKKind22[NDKKind22["GroupAdminEditMetadata"] = 9002] = "GroupAdminEditMetadata";
    NDKKind22[NDKKind22["GroupAdminEditStatus"] = 9006] = "GroupAdminEditStatus";
    NDKKind22[NDKKind22["GroupAdminCreateGroup"] = 9007] = "GroupAdminCreateGroup";
    NDKKind22[NDKKind22["GroupAdminRequestJoin"] = 9021] = "GroupAdminRequestJoin";
    NDKKind22[NDKKind22["MuteList"] = 1e4] = "MuteList";
    NDKKind22[NDKKind22["PinList"] = 10001] = "PinList";
    NDKKind22[NDKKind22["RelayList"] = 10002] = "RelayList";
    NDKKind22[NDKKind22["BookmarkList"] = 10003] = "BookmarkList";
    NDKKind22[NDKKind22["CommunityList"] = 10004] = "CommunityList";
    NDKKind22[NDKKind22["PublicChatList"] = 10005] = "PublicChatList";
    NDKKind22[NDKKind22["BlockRelayList"] = 10006] = "BlockRelayList";
    NDKKind22[NDKKind22["SearchRelayList"] = 10007] = "SearchRelayList";
    NDKKind22[NDKKind22["SimpleGroupList"] = 10009] = "SimpleGroupList";
    NDKKind22[NDKKind22["InterestList"] = 10015] = "InterestList";
    NDKKind22[NDKKind22["CashuMintList"] = 10019] = "CashuMintList";
    NDKKind22[NDKKind22["EmojiList"] = 10030] = "EmojiList";
    NDKKind22[NDKKind22["DirectMessageReceiveRelayList"] = 10050] = "DirectMessageReceiveRelayList";
    NDKKind22[NDKKind22["BlossomList"] = 10063] = "BlossomList";
    NDKKind22[NDKKind22["NostrWaletConnectInfo"] = 13194] = "NostrWaletConnectInfo";
    NDKKind22[NDKKind22["TierList"] = 17e3] = "TierList";
    NDKKind22[NDKKind22["FollowSet"] = 3e4] = "FollowSet";
    NDKKind22[
      NDKKind22["CategorizedPeopleList"] = 3e4
      /* FollowSet */
    ] = "CategorizedPeopleList";
    NDKKind22[NDKKind22["CategorizedBookmarkList"] = 30001] = "CategorizedBookmarkList";
    NDKKind22[NDKKind22["RelaySet"] = 30002] = "RelaySet";
    NDKKind22[
      NDKKind22["CategorizedRelayList"] = 30002
      /* RelaySet */
    ] = "CategorizedRelayList";
    NDKKind22[NDKKind22["BookmarkSet"] = 30003] = "BookmarkSet";
    NDKKind22[NDKKind22["CurationSet"] = 30004] = "CurationSet";
    NDKKind22[NDKKind22["ArticleCurationSet"] = 30004] = "ArticleCurationSet";
    NDKKind22[NDKKind22["VideoCurationSet"] = 30005] = "VideoCurationSet";
    NDKKind22[NDKKind22["ImageCurationSet"] = 30006] = "ImageCurationSet";
    NDKKind22[NDKKind22["InterestSet"] = 30015] = "InterestSet";
    NDKKind22[
      NDKKind22["InterestsList"] = 30015
      /* InterestSet */
    ] = "InterestsList";
    NDKKind22[NDKKind22["EmojiSet"] = 30030] = "EmojiSet";
    NDKKind22[NDKKind22["ModularArticle"] = 30040] = "ModularArticle";
    NDKKind22[NDKKind22["ModularArticleItem"] = 30041] = "ModularArticleItem";
    NDKKind22[NDKKind22["Wiki"] = 30818] = "Wiki";
    NDKKind22[NDKKind22["Draft"] = 31234] = "Draft";
    NDKKind22[NDKKind22["SubscriptionTier"] = 37001] = "SubscriptionTier";
    NDKKind22[NDKKind22["EcashMintRecommendation"] = 38e3] = "EcashMintRecommendation";
    NDKKind22[NDKKind22["HighlightSet"] = 39802] = "HighlightSet";
    NDKKind22[
      NDKKind22["CategorizedHighlightList"] = 39802
      /* HighlightSet */
    ] = "CategorizedHighlightList";
    NDKKind22[NDKKind22["Nutzap"] = 9321] = "Nutzap";
    NDKKind22[NDKKind22["ZapRequest"] = 9734] = "ZapRequest";
    NDKKind22[NDKKind22["Zap"] = 9735] = "Zap";
    NDKKind22[NDKKind22["Highlight"] = 9802] = "Highlight";
    NDKKind22[NDKKind22["ClientAuth"] = 22242] = "ClientAuth";
    NDKKind22[NDKKind22["NostrWalletConnectReq"] = 23194] = "NostrWalletConnectReq";
    NDKKind22[NDKKind22["NostrWalletConnectRes"] = 23195] = "NostrWalletConnectRes";
    NDKKind22[NDKKind22["NostrConnect"] = 24133] = "NostrConnect";
    NDKKind22[NDKKind22["BlossomUpload"] = 24242] = "BlossomUpload";
    NDKKind22[NDKKind22["HttpAuth"] = 27235] = "HttpAuth";
    NDKKind22[NDKKind22["ProfileBadge"] = 30008] = "ProfileBadge";
    NDKKind22[NDKKind22["BadgeDefinition"] = 30009] = "BadgeDefinition";
    NDKKind22[NDKKind22["MarketStall"] = 30017] = "MarketStall";
    NDKKind22[NDKKind22["MarketProduct"] = 30018] = "MarketProduct";
    NDKKind22[NDKKind22["Article"] = 30023] = "Article";
    NDKKind22[NDKKind22["AppSpecificData"] = 30078] = "AppSpecificData";
    NDKKind22[NDKKind22["Classified"] = 30402] = "Classified";
    NDKKind22[NDKKind22["HorizontalVideo"] = 34235] = "HorizontalVideo";
    NDKKind22[NDKKind22["VerticalVideo"] = 34236] = "VerticalVideo";
    NDKKind22[NDKKind22["CashuWallet"] = 37375] = "CashuWallet";
    NDKKind22[NDKKind22["GroupMetadata"] = 39e3] = "GroupMetadata";
    NDKKind22[NDKKind22["GroupAdmins"] = 39001] = "GroupAdmins";
    NDKKind22[NDKKind22["GroupMembers"] = 39002] = "GroupMembers";
    NDKKind22[NDKKind22["AppRecommendation"] = 31989] = "AppRecommendation";
    NDKKind22[NDKKind22["AppHandler"] = 31990] = "AppHandler";
    return NDKKind22;
  })(NDKKind || {});
  var DEFAULT_ENCRYPTION_SCHEME = "nip44";
  async function encrypt3(recipient, signer, type = DEFAULT_ENCRYPTION_SCHEME) {
    if (!this.ndk) throw new Error("No NDK instance found!");
    if (!signer) {
      await this.ndk.assertSigner();
      signer = this.ndk.signer;
    }
    if (!recipient) {
      const pTags = this.getMatchingTags("p");
      if (pTags.length !== 1) {
        throw new Error(
          "No recipient could be determined and no explicit recipient was provided"
        );
      }
      recipient = this.ndk.getUser({ pubkey: pTags[0][1] });
    }
    this.content = await signer?.encrypt(recipient, this.content, type);
  }
  async function decrypt3(sender, signer, type) {
    if (!this.ndk) throw new Error("No NDK instance found!");
    if (!signer) {
      await this.ndk.assertSigner();
      signer = this.ndk.signer;
    }
    if (!sender) {
      sender = this.author;
    }
    if (!type) {
      type = this.content.match(/\?iv=/) ? "nip04" : "nip44";
    }
    this.content = await signer?.decrypt(sender, this.content, type);
  }
  var DEFAULT_RELAY_COUNT = 2;
  function encode(maxRelayCount = DEFAULT_RELAY_COUNT) {
    let relays = [];
    if (this.onRelays.length > 0) {
      relays = this.onRelays.map((relay) => relay.url);
    } else if (this.relay) {
      relays = [this.relay.url];
    }
    if (relays.length > maxRelayCount) {
      relays = relays.slice(0, maxRelayCount);
    }
    if (this.isParamReplaceable()) {
      return nip19_exports.naddrEncode({
        kind: this.kind,
        pubkey: this.pubkey,
        identifier: this.replaceableDTag(),
        relays
      });
    } else if (relays.length > 0) {
      return nip19_exports.neventEncode({
        id: this.tagId(),
        relays,
        author: this.pubkey
      });
    } else {
      return nip19_exports.noteEncode(this.tagId());
    }
  }
  async function repost(publish = true, signer) {
    if (!signer && publish) {
      if (!this.ndk) throw new Error("No NDK instance found");
      this.ndk.assertSigner();
      signer = this.ndk.signer;
    }
    const e = new NDKEvent(this.ndk, {
      kind: getKind(this)
    });
    e.content = JSON.stringify(this.rawEvent());
    e.tag(this);
    if (this.kind !== 1) {
      e.tags.push(["k", `${this.kind}`]);
    }
    if (signer) await e.sign(signer);
    if (publish) await e.publish();
    return e;
  }
  function getKind(event) {
    if (event.kind === 1) {
      return 6;
    }
    return 16;
  }
  function eventHasETagMarkers(event) {
    return event.getMatchingTags("e").some((tag) => tag[3]);
  }
  function getRootTag(event, searchTag) {
    searchTag ??= event.tagType();
    const rootEventTag = event.tags.find((tag) => tag[3] === "root");
    if (!rootEventTag) {
      if (eventHasETagMarkers(event)) return;
      const matchingTags = event.getMatchingTags(searchTag);
      if (matchingTags.length < 3) return matchingTags[0];
    }
    return rootEventTag;
  }
  function getReplyTag(event, searchTag) {
    searchTag ??= event.tagType();
    let replyTag = event.tags.find((tag) => tag[3] === "reply");
    if (replyTag) return replyTag;
    if (!replyTag) replyTag = event.tags.find((tag) => tag[3] === "root");
    if (!replyTag) {
      if (eventHasETagMarkers(event)) return;
      const matchingTags = event.getMatchingTags(searchTag);
      if (matchingTags.length === 1) return matchingTags[0];
      if (matchingTags.length === 2) return matchingTags[1];
    }
  }
  async function fetchTaggedEvent(tag, marker) {
    if (!this.ndk) throw new Error("NDK instance not found");
    const t = this.getMatchingTags(tag, marker);
    if (t.length === 0) return void 0;
    const [_, id, hint] = t[0];
    let relay;
    const event = await this.ndk.fetchEvent(id, {}, relay);
    return event;
  }
  async function fetchRootEvent(subOpts) {
    if (!this.ndk) throw new Error("NDK instance not found");
    const rootTag = getRootTag(this);
    if (!rootTag) return void 0;
    return this.ndk.fetchEventFromTag(rootTag, this, subOpts);
  }
  async function fetchReplyEvent(subOpts) {
    if (!this.ndk) throw new Error("NDK instance not found");
    const replyTag = getReplyTag(this);
    if (!replyTag) return void 0;
    return this.ndk.fetchEventFromTag(replyTag, this, subOpts);
  }
  function serialize(includeSig = false, includeId = false) {
    const payload = [0, this.pubkey, this.created_at, this.kind, this.tags, this.content];
    if (includeSig) payload.push(this.sig);
    if (includeId) payload.push(this.id);
    return JSON.stringify(payload);
  }
  function deserialize(serializedEvent) {
    const eventArray = JSON.parse(serializedEvent);
    const ret = {
      pubkey: eventArray[1],
      created_at: eventArray[2],
      kind: eventArray[3],
      tags: eventArray[4],
      content: eventArray[5]
    };
    if (eventArray.length >= 7) ret.sig = eventArray[6];
    if (eventArray.length >= 8) ret.id = eventArray[7];
    return ret;
  }
  var worker;
  var processingQueue = {};
  function signatureVerificationInit(w) {
    worker = w;
    worker.onmessage = (msg) => {
      const [eventId, result] = msg.data;
      const record = processingQueue[eventId];
      if (!record) {
        console.error("No record found for event", eventId);
        return;
      }
      delete processingQueue[eventId];
      for (const resolve of record.resolves) {
        resolve(result);
      }
    };
  }
  async function verifySignatureAsync(event, persist) {
    const promise = new Promise((resolve) => {
      const serialized = event.serialize();
      let enqueue = false;
      if (!processingQueue[event.id]) {
        processingQueue[event.id] = { event, resolves: [] };
        enqueue = true;
      }
      processingQueue[event.id].resolves.push(resolve);
      if (!enqueue) return;
      worker.postMessage({
        serialized,
        id: event.id,
        sig: event.sig,
        pubkey: event.pubkey
      });
    });
    return promise;
  }
  var PUBKEY_REGEX = /^[a-f0-9]{64}$/;
  function validate() {
    if (typeof this.kind !== "number") return false;
    if (typeof this.content !== "string") return false;
    if (typeof this.created_at !== "number") return false;
    if (typeof this.pubkey !== "string") return false;
    if (!this.pubkey.match(PUBKEY_REGEX)) return false;
    if (!Array.isArray(this.tags)) return false;
    for (let i2 = 0; i2 < this.tags.length; i2++) {
      const tag = this.tags[i2];
      if (!Array.isArray(tag)) return false;
      for (let j = 0; j < tag.length; j++) {
        if (typeof tag[j] === "object") return false;
      }
    }
    return true;
  }
  var verifiedSignatures = new import_typescript_lru_cache.LRUCache({
    maxSize: 1e3,
    entryExpirationTimeInMS: 6e4
  });
  function verifySignature(persist) {
    if (typeof this.signatureVerified === "boolean") return this.signatureVerified;
    const prevVerification = verifiedSignatures.get(this.id);
    if (prevVerification !== null) {
      return this.signatureVerified = !!prevVerification;
    }
    try {
      if (this.ndk?.asyncSigVerification) {
        verifySignatureAsync(this, persist).then((result) => {
          if (persist) {
            this.signatureVerified = result;
            if (result) verifiedSignatures.set(this.id, this.sig);
          }
          if (!result) {
            this.ndk.emit("event:invalid-sig", this);
            verifiedSignatures.set(this.id, false);
          }
        });
      } else {
        const hash3 = sha2563(new TextEncoder().encode(this.serialize()));
        const res = schnorr2.verify(this.sig, hash3, this.pubkey);
        if (res) verifiedSignatures.set(this.id, this.sig);
        else verifiedSignatures.set(this.id, false);
        return this.signatureVerified = res;
      }
    } catch (err) {
      return this.signatureVerified = false;
    }
  }
  function getEventHash2() {
    return getEventHashFromSerializedEvent(this.serialize());
  }
  function getEventHashFromSerializedEvent(serializedEvent) {
    const eventHash = sha2563(new TextEncoder().encode(serializedEvent));
    return bytesToHex3(eventHash);
  }
  var skipClientTagOnKinds = [
    3
    /* Contacts */
  ];
  var NDKEvent = class _NDKEvent extends import_tseep3.EventEmitter {
    ndk;
    created_at;
    content = "";
    tags = [];
    kind;
    id = "";
    sig;
    pubkey = "";
    signatureVerified;
    _author = void 0;
    /**
     * The relay that this event was first received from.
     */
    relay;
    /**
     * The relays that this event was received from and/or successfully published to.
     */
    get onRelays() {
      let res = [];
      if (!this.ndk) {
        if (this.relay) res.push(this.relay);
      } else {
        res = this.ndk.subManager.seenEvents.get(this.id) || [];
      }
      return res;
    }
    /**
     * The status of the publish operation.
     */
    publishStatus = "success";
    publishError;
    constructor(ndk, event) {
      super();
      this.ndk = ndk;
      this.created_at = event?.created_at;
      this.content = event?.content || "";
      this.tags = event?.tags || [];
      this.id = event?.id || "";
      this.sig = event?.sig;
      this.pubkey = event?.pubkey || "";
      this.kind = event?.kind;
      if (event instanceof _NDKEvent) {
        if (this.relay) {
          this.relay = event.relay;
          this.ndk?.subManager.seenEvent(event.id, this.relay);
        }
        this.publishStatus = event.publishStatus;
        this.publishError = event.publishError;
      }
    }
    /**
     * Deserialize an NDKEvent from a serialized payload.
     * @param ndk
     * @param event
     * @returns
     */
    static deserialize(ndk, event) {
      return new _NDKEvent(ndk, deserialize(event));
    }
    /**
     * Returns the event as is.
     */
    rawEvent() {
      return {
        created_at: this.created_at,
        content: this.content,
        tags: this.tags,
        kind: this.kind,
        pubkey: this.pubkey,
        id: this.id,
        sig: this.sig
      };
    }
    set author(user) {
      this.pubkey = user.pubkey;
      this._author = user;
      this._author.ndk ??= this.ndk;
    }
    /**
     * Returns an NDKUser for the author of the event.
     */
    get author() {
      if (this._author) return this._author;
      if (!this.ndk) throw new Error("No NDK instance found");
      const user = this.ndk.getUser({ pubkey: this.pubkey });
      this._author = user;
      return user;
    }
    /**
     * NIP-73 tagging of external entities
     * @param entity to be tagged
     * @param type of the entity
     * @param markerUrl to be used as the marker URL
     *
     * @example
     * ```typescript
     * event.tagExternal("https://example.com/article/123#nostr", "url");
     * event.tags => [["i", "https://example.com/123"], ["k", "https://example.com"]]
     * ```
     *
     * @example tag a podcast:item:guid
     * ```typescript
     * event.tagExternal("e32b4890-b9ea-4aef-a0bf-54b787833dc5", "podcast:item:guid");
     * event.tags => [["i", "podcast:item:guid:e32b4890-b9ea-4aef-a0bf-54b787833dc5"], ["k", "podcast:item:guid"]]
     * ```
     *
     * @see https://github.com/nostr-protocol/nips/blob/master/73.md
     */
    tagExternal(entity, type, markerUrl) {
      let iTag = ["i"];
      let kTag = ["k"];
      switch (type) {
        case "url":
          const url = new URL(entity);
          url.hash = "";
          iTag.push(url.toString());
          kTag.push(`${url.protocol}//${url.host}`);
          break;
        case "hashtag":
          iTag.push(`#${entity.toLowerCase()}`);
          kTag.push("#");
          break;
        case "geohash":
          iTag.push(`geo:${entity.toLowerCase()}`);
          kTag.push("geo");
          break;
        case "isbn":
          iTag.push(`isbn:${entity.replace(/-/g, "")}`);
          kTag.push("isbn");
          break;
        case "podcast:guid":
          iTag.push(`podcast:guid:${entity}`);
          kTag.push("podcast:guid");
          break;
        case "podcast:item:guid":
          iTag.push(`podcast:item:guid:${entity}`);
          kTag.push("podcast:item:guid");
          break;
        case "podcast:publisher:guid":
          iTag.push(`podcast:publisher:guid:${entity}`);
          kTag.push("podcast:publisher:guid");
          break;
        case "isan":
          iTag.push(`isan:${entity.split("-").slice(0, 4).join("-")}`);
          kTag.push("isan");
          break;
        case "doi":
          iTag.push(`doi:${entity.toLowerCase()}`);
          kTag.push("doi");
          break;
        default:
          throw new Error(`Unsupported NIP-73 entity type: ${type}`);
      }
      if (markerUrl) {
        iTag.push(markerUrl);
      }
      this.tags.push(iTag);
      this.tags.push(kTag);
    }
    /**
     * Tag a user with an optional marker.
     * @param target What is to be tagged. Can be an NDKUser, NDKEvent, or an NDKTag.
     * @param marker The marker to use in the tag.
     * @param skipAuthorTag Whether to explicitly skip adding the author tag of the event.
     * @param forceTag Force a specific tag to be used instead of the default "e" or "a" tag.
     * @example
     * ```typescript
     * reply.tag(opEvent, "reply");
     * // reply.tags => [["e", <id>, <relay>, "reply"]]
     * ```
     */
    tag(target, marker, skipAuthorTag, forceTag) {
      let tags = [];
      const isNDKUser = target.fetchProfile !== void 0;
      if (isNDKUser) {
        forceTag ??= "p";
        const tag = [forceTag, target.pubkey];
        if (marker) tag.push(...["", marker]);
        tags.push(tag);
      } else if (target instanceof _NDKEvent) {
        const event = target;
        skipAuthorTag ??= event?.pubkey === this.pubkey;
        tags = event.referenceTags(marker, skipAuthorTag, forceTag);
        for (const pTag of event.getMatchingTags("p")) {
          if (pTag[1] === this.pubkey) continue;
          if (this.tags.find((t) => t[0] === "p" && t[1] === pTag[1])) continue;
          this.tags.push(["p", pTag[1]]);
        }
      } else if (Array.isArray(target)) {
        tags = [target];
      } else {
        throw new Error("Invalid argument", target);
      }
      this.tags = mergeTags(this.tags, tags);
    }
    /**
     * Return a NostrEvent object, trying to fill in missing fields
     * when possible, adding tags when necessary.
     * @param pubkey {string} The pubkey of the user who the event belongs to.
     * @returns {Promise<NostrEvent>} A promise that resolves to a NostrEvent.
     */
    async toNostrEvent(pubkey) {
      if (!pubkey && this.pubkey === "") {
        const user = await this.ndk?.signer?.user();
        this.pubkey = user?.pubkey || "";
      }
      if (!this.created_at) {
        this.created_at = Math.floor(Date.now() / 1e3);
      }
      const { content, tags } = await this.generateTags();
      this.content = content || "";
      this.tags = tags;
      try {
        this.id = this.getEventHash();
      } catch (e) {
      }
      return this.rawEvent();
    }
    serialize = serialize.bind(this);
    getEventHash = getEventHash2.bind(this);
    validate = validate.bind(this);
    verifySignature = verifySignature.bind(this);
    /**
     * Is this event replaceable (whether parameterized or not)?
     *
     * This will return true for kind 0, 3, 10k-20k and 30k-40k
     */
    isReplaceable = isReplaceable.bind(this);
    isEphemeral = isEphemeral.bind(this);
    /**
     * Is this event parameterized replaceable?
     *
     * This will return true for kind 30k-40k
     */
    isParamReplaceable = isParamReplaceable.bind(this);
    /**
     * Encodes a bech32 id.
     *
     * @param relays {string[]} The relays to encode in the id
     * @returns {string} - Encoded naddr, note or nevent.
     */
    encode = encode.bind(this);
    encrypt = encrypt3.bind(this);
    decrypt = decrypt3.bind(this);
    /**
     * Get all tags with the given name
     * @param tagName {string} The name of the tag to search for
     * @returns {NDKTag[]} An array of the matching tags
     */
    getMatchingTags(tagName, marker) {
      const t = this.tags.filter((tag) => tag[0] === tagName);
      if (marker === void 0) return t;
      return t.filter((tag) => tag[3] === marker);
    }
    /**
     * Check if the event has a tag with the given name
     * @param tagName
     * @param marker
     * @returns
     */
    hasTag(tagName, marker) {
      return this.tags.some((tag) => tag[0] === tagName && (!marker || tag[3] === marker));
    }
    /**
     * Get the first tag with the given name
     * @param tagName Tag name to search for
     * @returns The value of the first tag with the given name, or undefined if no such tag exists
     */
    tagValue(tagName) {
      const tags = this.getMatchingTags(tagName);
      if (tags.length === 0) return void 0;
      return tags[0][1];
    }
    /**
     * Gets the NIP-31 "alt" tag of the event.
     */
    get alt() {
      return this.tagValue("alt");
    }
    /**
     * Sets the NIP-31 "alt" tag of the event. Use this to set an alt tag so
     * clients that don't handle a particular event kind can display something
     * useful for users.
     */
    set alt(alt) {
      this.removeTag("alt");
      if (alt) this.tags.push(["alt", alt]);
    }
    /**
     * Gets the NIP-33 "d" tag of the event.
     */
    get dTag() {
      return this.tagValue("d");
    }
    /**
     * Sets the NIP-33 "d" tag of the event.
     */
    set dTag(value) {
      this.removeTag("d");
      if (value) this.tags.push(["d", value]);
    }
    /**
     * Remove all tags with the given name (e.g. "d", "a", "p")
     * @param tagName Tag name(s) to search for and remove
     * @returns {void}
     */
    removeTag(tagName) {
      const tagNames = Array.isArray(tagName) ? tagName : [tagName];
      this.tags = this.tags.filter((tag) => !tagNames.includes(tag[0]));
    }
    /**
     * Sign the event if a signer is present.
     *
     * It will generate tags.
     * Repleacable events will have their created_at field set to the current time.
     * @param signer {NDKSigner} The NDKSigner to use to sign the event
     * @returns {Promise<string>} A Promise that resolves to the signature of the signed event.
     */
    async sign(signer) {
      if (!signer) {
        this.ndk?.assertSigner();
        signer = this.ndk.signer;
      } else {
        this.author = await signer.user();
      }
      const nostrEvent = await this.toNostrEvent();
      this.sig = await signer.sign(nostrEvent);
      return this.sig;
    }
    /**
     *
     * @param relaySet
     * @param timeoutMs
     * @param requiredRelayCount
     * @returns
     */
    async publishReplaceable(relaySet, timeoutMs, requiredRelayCount) {
      this.id = "";
      this.created_at = Math.floor(Date.now() / 1e3);
      this.sig = "";
      return this.publish(relaySet, timeoutMs, requiredRelayCount);
    }
    /**
     * Attempt to sign and then publish an NDKEvent to a given relaySet.
     * If no relaySet is provided, the relaySet will be calculated by NDK.
     * @param relaySet {NDKRelaySet} The relaySet to publish the even to.
     * @param timeoutM {number} The timeout for the publish operation in milliseconds.
     * @param requiredRelayCount The number of relays that must receive the event for the publish to be considered successful.
     * @returns A promise that resolves to the relays the event was published to.
     */
    async publish(relaySet, timeoutMs, requiredRelayCount) {
      if (!this.sig) await this.sign();
      if (!this.ndk)
        throw new Error("NDKEvent must be associated with an NDK instance to publish");
      if (!relaySet) {
        relaySet = this.ndk.devWriteRelaySet || await calculateRelaySetFromEvent(this.ndk, this);
      }
      if (this.kind === 5 && this.ndk.cacheAdapter?.deleteEventIds) {
        const eTags = this.getMatchingTags("e").map((tag) => tag[1]);
        this.ndk.cacheAdapter.deleteEventIds(eTags);
      }
      const rawEvent = this.rawEvent();
      if (this.ndk.cacheAdapter?.addUnpublishedEvent) {
        try {
          this.ndk.cacheAdapter.addUnpublishedEvent(this, relaySet.relayUrls);
        } catch (e) {
          console.error("Error adding unpublished event to cache", e);
        }
      }
      if (this.kind === 5 && this.ndk.cacheAdapter?.deleteEventIds) {
        this.ndk.cacheAdapter.deleteEventIds(this.getMatchingTags("e").map((tag) => tag[1]));
      }
      this.ndk.subManager.dispatchEvent(rawEvent, void 0, true);
      const relays = await relaySet.publish(this, timeoutMs, requiredRelayCount);
      relays.forEach((relay) => this.ndk?.subManager.seenEvent(this.id, relay));
      return relays;
    }
    /**
     * Generates tags for users, notes, and other events tagged in content.
     * Will also generate random "d" tag for parameterized replaceable events where needed.
     * @returns {ContentTag} The tags and content of the event.
     */
    async generateTags() {
      let tags = [];
      const g = await generateContentTags(this.content, this.tags);
      const content = g.content;
      tags = g.tags;
      if (this.kind && this.isParamReplaceable()) {
        const dTag = this.getMatchingTags("d")[0];
        if (!dTag) {
          const title = this.tagValue("title");
          const randLength = title ? 6 : 16;
          let str = [...Array(randLength)].map(() => Math.random().toString(36)[2]).join("");
          if (title && title.length > 0) {
            str = title.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") + "-" + str;
          }
          tags.push(["d", str]);
        }
      }
      if (this.shouldAddClientTag) {
        const clientTag = ["client", this.ndk.clientName ?? ""];
        if (this.ndk.clientNip89) clientTag.push(this.ndk.clientNip89);
        tags.push(clientTag);
      } else {
        tags = tags.filter((tag) => tag[0] !== "client");
      }
      return { content: content || "", tags };
    }
    get shouldAddClientTag() {
      if (!this.ndk?.clientName && !this.ndk?.clientNip89) return false;
      if (skipClientTagOnKinds.includes(this.kind)) return false;
      if (this.isEphemeral()) return false;
      if (this.hasTag("client")) return false;
      return true;
    }
    muted() {
      const authorMutedEntry = this.ndk?.mutedIds.get(this.pubkey);
      if (authorMutedEntry && authorMutedEntry === "p") return "author";
      const eventTagReference = this.tagReference();
      const eventMutedEntry = this.ndk?.mutedIds.get(eventTagReference[1]);
      if (eventMutedEntry && eventMutedEntry === eventTagReference[0]) return "event";
      return null;
    }
    /**
     * Returns the "d" tag of a parameterized replaceable event or throws an error if the event isn't
     * a parameterized replaceable event.
     * @returns {string} the "d" tag of the event.
     */
    replaceableDTag() {
      if (this.kind && this.kind >= 3e4 && this.kind <= 4e4) {
        const dTag = this.getMatchingTags("d")[0];
        const dTagId = dTag ? dTag[1] : "";
        return dTagId;
      }
      throw new Error("Event is not a parameterized replaceable event");
    }
    /**
     * Provides a deduplication key for the event.
     *
     * For kinds 0, 3, 10k-20k this will be the event <kind>:<pubkey>
     * For kinds 30k-40k this will be the event <kind>:<pubkey>:<d-tag>
     * For all other kinds this will be the event id
     */
    deduplicationKey() {
      if (this.kind === 0 || this.kind === 3 || this.kind && this.kind >= 1e4 && this.kind < 2e4) {
        return `${this.kind}:${this.pubkey}`;
      } else {
        return this.tagId();
      }
    }
    /**
     * Returns the id of the event or, if it's a parameterized event, the generated id of the event using "d" tag, pubkey, and kind.
     * @returns {string} The id
     */
    tagId() {
      if (this.isParamReplaceable()) {
        return this.tagAddress();
      }
      return this.id;
    }
    /**
     * Returns the "reference" value ("<kind>:<author-pubkey>:<d-tag>") for this replaceable event.
     * @returns {string} The id
     */
    tagAddress() {
      if (!this.isParamReplaceable()) {
        throw new Error("This must only be called on replaceable events");
      }
      const dTagId = this.replaceableDTag();
      return `${this.kind}:${this.pubkey}:${dTagId}`;
    }
    /**
     * Determines the type of tag that can be used to reference this event from another event.
     * @returns {string} The tag type
     * @example
     * event = new NDKEvent(ndk, { kind: 30000, pubkey: 'pubkey', tags: [ ["d", "d-code"] ] });
     * event.tagType(); // "a"
     */
    tagType() {
      return this.isParamReplaceable() ? "a" : "e";
    }
    /**
     * Get the tag that can be used to reference this event from another event.
     *
     * Consider using referenceTags() instead (unless you have a good reason to use this)
     *
     * @example
     *     event = new NDKEvent(ndk, { kind: 30000, pubkey: 'pubkey', tags: [ ["d", "d-code"] ] });
     *     event.tagReference(); // ["a", "30000:pubkey:d-code"]
     *
     *     event = new NDKEvent(ndk, { kind: 1, pubkey: 'pubkey', id: "eventid" });
     *     event.tagReference(); // ["e", "eventid"]
     * @returns {NDKTag} The NDKTag object referencing this event
     */
    tagReference(marker) {
      let tag;
      if (this.isParamReplaceable()) {
        tag = ["a", this.tagAddress()];
      } else {
        tag = ["e", this.tagId()];
      }
      if (this.relay) {
        tag.push(this.relay.url);
      } else {
        tag.push("");
      }
      tag.push(marker ?? "");
      if (!this.isParamReplaceable()) {
        tag.push(this.pubkey);
      }
      return tag;
    }
    /**
     * Get the tags that can be used to reference this event from another event
     * @param marker The marker to use in the tag
     * @param skipAuthorTag Whether to explicitly skip adding the author tag of the event
     * @param forceTag Force a specific tag to be used instead of the default "e" or "a" tag
     * @example
     *     event = new NDKEvent(ndk, { kind: 30000, pubkey: 'pubkey', tags: [ ["d", "d-code"] ] });
     *     event.referenceTags(); // [["a", "30000:pubkey:d-code"], ["e", "parent-id"]]
     *
     *     event = new NDKEvent(ndk, { kind: 1, pubkey: 'pubkey', id: "eventid" });
     *     event.referenceTags(); // [["e", "parent-id"]]
     * @returns {NDKTag} The NDKTag object referencing this event
     */
    referenceTags(marker, skipAuthorTag, forceTag) {
      let tags = [];
      if (this.isParamReplaceable()) {
        tags = [
          [forceTag ?? "a", this.tagAddress()],
          [forceTag ?? "e", this.id]
        ];
      } else {
        tags = [[forceTag ?? "e", this.id]];
      }
      tags = tags.map((tag) => {
        if (tag[0] === "e" || marker) {
          tag.push(this.relay?.url ?? "");
        } else if (this.relay?.url) {
          tag.push(this.relay?.url);
        }
        return tag;
      });
      tags.forEach((tag) => {
        if (tag[0] === "e") {
          tag.push(marker ?? "");
          tag.push(this.pubkey);
        } else if (marker) {
          tag.push(marker);
        }
      });
      tags = [...tags, ...this.getMatchingTags("h")];
      if (!skipAuthorTag) tags.push(...this.author.referenceTags());
      return tags;
    }
    /**
     * Provides the filter that will return matching events for this event.
     *
     * @example
     *    event = new NDKEvent(ndk, { kind: 30000, pubkey: 'pubkey', tags: [ ["d", "d-code"] ] });
     *    event.filter(); // { "#a": ["30000:pubkey:d-code"] }
     * @example
     *    event = new NDKEvent(ndk, { kind: 1, pubkey: 'pubkey', id: "eventid" });
     *    event.filter(); // { "#e": ["eventid"] }
     *
     * @returns The filter that will return matching events for this event
     */
    filter() {
      if (this.isParamReplaceable()) {
        return { "#a": [this.tagId()] };
      } else {
        return { "#e": [this.tagId()] };
      }
    }
    /**
     * Generates a deletion event of the current event
     *
     * @param reason The reason for the deletion
     * @param publish Whether to publish the deletion event automatically
     * @returns The deletion event
     */
    async delete(reason, publish = true) {
      if (!this.ndk) throw new Error("No NDK instance found");
      this.ndk.assertSigner();
      const e = new _NDKEvent(this.ndk, {
        kind: 5,
        content: reason || ""
      });
      e.tag(this, void 0, true);
      e.tags.push(["k", this.kind.toString()]);
      if (publish) {
        this.emit("deleted");
        await e.publish();
      }
      return e;
    }
    /**
     * Fetch an event tagged with the given tag following relay hints if provided.
     * @param tag The tag to search for
     * @param marker The marker to use in the tag (e.g. "root")
     * @returns The fetched event or null if no event was found, undefined if no matching tag was found in the event
     * * @example
     * const replyEvent = await ndk.fetchEvent("nevent1qqs8x8vnycyha73grv380gmvlury4wtmx0nr9a5ds2dngqwgu87wn6gpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgq3ql2vyh47mk2p0qlsku7hg0vn29faehy9hy34ygaclpn66ukqp3afqz4cwjd")
     * const originalEvent = await replyEvent.fetchTaggedEvent("e", "reply");
     * console.log(replyEvent.encode() + " is a reply to event " + originalEvent?.encode());
     */
    fetchTaggedEvent = fetchTaggedEvent.bind(this);
    /**
     * Fetch the root event of the current event.
     * @returns The fetched root event or null if no event was found
     * @example
     * const replyEvent = await ndk.fetchEvent("nevent1qqs8x8vnycyha73grv380gmvlury4wtmx0nr9a5ds2dngqwgu87wn6gpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgq3ql2vyh47mk2p0qlsku7hg0vn29faehy9hy34ygaclpn66ukqp3afqz4cwjd")
     * const rootEvent = await replyEvent.fetchRootEvent();
     * console.log(replyEvent.encode() + " is a reply in the thread " + rootEvent?.encode());
     */
    fetchRootEvent = fetchRootEvent.bind(this);
    /**
     * Fetch the event the current event is replying to.
     * @returns The fetched reply event or null if no event was found
     */
    fetchReplyEvent = fetchReplyEvent.bind(this);
    /**
     * NIP-18 reposting event.
     *
     * @param publish Whether to publish the reposted event automatically @default true
     * @param signer The signer to use for signing the reposted event
     * @returns The reposted event
     *
     * @function
     */
    repost = repost.bind(this);
    /**
     * React to an existing event
     *
     * @param content The content of the reaction
     */
    async react(content, publish = true) {
      if (!this.ndk) throw new Error("No NDK instance found");
      this.ndk.assertSigner();
      const e = new _NDKEvent(this.ndk, {
        kind: 7,
        content
      });
      e.tag(this);
      if (publish) {
        await e.publish();
      } else {
        await e.sign();
      }
      return e;
    }
    /**
     * Checks whether the event is valid per underlying NIPs.
     *
     * This method is meant to be overridden by subclasses that implement specific NIPs
     * to allow the enforcement of NIP-specific validation rules.
     *
     * Otherwise, it will only check for basic event properties.
     *
     */
    get isValid() {
      return this.validate();
    }
    /**
     * Creates a reply event for the current event.
     * 
     * This function will use NIP-22 when appropriate (i.e. replies to non-kind:1 events).
     * This function does not have side-effects; it will just return an event with the appropriate tags
     * to generate the reply event; the caller is responsible for publishing the event.
     */
    reply() {
      const reply = new _NDKEvent(this.ndk);
      if (this.kind === 1) {
        reply.kind = 1;
        const opHasETag = this.hasTag("e");
        if (opHasETag) {
          reply.tags = [
            ...reply.tags,
            ...this.getMatchingTags("e"),
            ...this.getMatchingTags("p"),
            ...this.getMatchingTags("a"),
            ...this.referenceTags("reply")
          ];
        } else {
          reply.tag(this, "root");
        }
      } else {
        reply.kind = 1111;
        const carryOverTags = ["A", "E", "I", "P"];
        const rootTags = this.tags.filter((tag) => carryOverTags.includes(tag[0]));
        if (rootTags.length > 0) {
          const rootKind = this.tagValue("K");
          reply.tags.push(...rootTags);
          if (rootKind) reply.tags.push(["K", rootKind]);
          const [type, id, _, ...extra] = this.tagReference();
          const tag = [type, id, ...extra];
          reply.tags.push(tag);
        } else {
          const [type, id, _, relayHint] = this.tagReference();
          const tag = [type, id, relayHint ?? ""];
          if (type === "e") tag.push(this.pubkey);
          reply.tags.push(tag);
          const uppercaseTag = [...tag];
          uppercaseTag[0] = uppercaseTag[0].toUpperCase();
          reply.tags.push(uppercaseTag);
          reply.tags.push(["K", this.kind.toString()]);
          reply.tags.push(["P", this.pubkey]);
        }
        reply.tags.push(["k", this.kind.toString()]);
        reply.tags.push(...this.getMatchingTags("p"));
        reply.tags.push(["p", this.pubkey]);
      }
      return reply;
    }
  };
  var MAX_RECONNECT_ATTEMPTS = 5;
  var FLAPPING_THRESHOLD_MS = 1e3;
  var NDKRelayConnectivity = class {
    ndkRelay;
    ws;
    _status;
    timeoutMs;
    connectedAt;
    _connectionStats = {
      attempts: 0,
      success: 0,
      durations: []
    };
    debug;
    netDebug;
    connectTimeout;
    reconnectTimeout;
    ndk;
    openSubs = /* @__PURE__ */ new Map();
    openCountRequests = /* @__PURE__ */ new Map();
    openEventPublishes = /* @__PURE__ */ new Map();
    serial = 0;
    baseEoseTimeout = 4400;
    constructor(ndkRelay, ndk) {
      this.ndkRelay = ndkRelay;
      this._status = 1;
      const rand = Math.floor(Math.random() * 1e3);
      this.debug = this.ndkRelay.debug.extend("connectivity" + rand);
      this.ndk = ndk;
    }
    /**
     * Connects to the NDK relay and handles the connection lifecycle.
     *
     * This method attempts to establish a WebSocket connection to the NDK relay specified in the `ndkRelay` object.
     * If the connection is successful, it updates the connection statistics, sets the connection status to `CONNECTED`,
     * and emits `connect` and `ready` events on the `ndkRelay` object.
     *
     * If the connection attempt fails, it handles the error by either initiating a reconnection attempt or emitting a
     * `delayed-connect` event on the `ndkRelay` object, depending on the `reconnect` parameter.
     *
     * @param timeoutMs - The timeout in milliseconds for the connection attempt. If not provided, the default timeout from the `ndkRelay` object is used.
     * @param reconnect - Indicates whether a reconnection should be attempted if the connection fails. Defaults to `true`.
     * @returns A Promise that resolves when the connection is established, or rejects if the connection fails.
     */
    async connect(timeoutMs, reconnect = true) {
      if (this._status !== 2 && this._status !== 1 || this.reconnectTimeout) {
        this.debug(
          "Relay requested to be connected but was in state %s or it had a reconnect timeout",
          this._status
        );
        return;
      }
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = void 0;
      }
      if (this.connectTimeout) {
        clearTimeout(this.connectTimeout);
        this.connectTimeout = void 0;
      }
      timeoutMs ??= this.timeoutMs;
      if (!this.timeoutMs && timeoutMs) this.timeoutMs = timeoutMs;
      if (this.timeoutMs)
        this.connectTimeout = setTimeout(
          () => this.onConnectionError(reconnect),
          this.timeoutMs
        );
      try {
        this.updateConnectionStats.attempt();
        if (this._status === 1)
          this._status = 4;
        else this._status = 2;
        this.ws = new WebSocket(this.ndkRelay.url);
        this.ws.onopen = this.onConnect.bind(this);
        this.ws.onclose = this.onDisconnect.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onerror = this.onError.bind(this);
      } catch (e) {
        this.debug(`Failed to connect to ${this.ndkRelay.url}`, e);
        this._status = 1;
        if (reconnect) this.handleReconnection();
        else this.ndkRelay.emit("delayed-connect", 2 * 24 * 60 * 60 * 1e3);
        throw e;
      }
    }
    /**
     * Disconnects the WebSocket connection to the NDK relay.
     * This method sets the connection status to `NDKRelayStatus.DISCONNECTING`,
     * attempts to close the WebSocket connection, and sets the status to
     * `NDKRelayStatus.DISCONNECTED` if the disconnect operation fails.
     */
    disconnect() {
      this._status = 0;
      try {
        this.ws?.close();
      } catch (e) {
        this.debug("Failed to disconnect", e);
        this._status = 1;
      }
    }
    /**
     * Handles the error that occurred when attempting to connect to the NDK relay.
     * If `reconnect` is `true`, this method will initiate a reconnection attempt.
     * Otherwise, it will emit a `delayed-connect` event on the `ndkRelay` object,
     * indicating that a reconnection should be attempted after a delay.
     *
     * @param reconnect - Indicates whether a reconnection should be attempted.
     */
    onConnectionError(reconnect) {
      this.debug(`Error connecting to ${this.ndkRelay.url}`, this.timeoutMs);
      if (reconnect && !this.reconnectTimeout) {
        this.handleReconnection();
      }
    }
    /**
     * Handles the connection event when the WebSocket connection is established.
     * This method is called when the WebSocket connection is successfully opened.
     * It clears any existing connection and reconnection timeouts, updates the connection statistics,
     * sets the connection status to `CONNECTED`, and emits `connect` and `ready` events on the `ndkRelay` object.
     */
    onConnect() {
      this.netDebug?.("connected", this.ndkRelay);
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = void 0;
      }
      if (this.connectTimeout) {
        clearTimeout(this.connectTimeout);
        this.connectTimeout = void 0;
      }
      this.updateConnectionStats.connected();
      this._status = 5;
      this.ndkRelay.emit("connect");
      this.ndkRelay.emit("ready");
    }
    /**
     * Handles the disconnection event when the WebSocket connection is closed.
     * This method is called when the WebSocket connection is successfully closed.
     * It updates the connection statistics, sets the connection status to `DISCONNECTED`,
     * initiates a reconnection attempt if we didn't disconnect ourselves,
     * and emits a `disconnect` event on the `ndkRelay` object.
     */
    onDisconnect() {
      this.netDebug?.("disconnected", this.ndkRelay);
      this.updateConnectionStats.disconnected();
      if (this._status === 5) {
        this.handleReconnection();
      }
      this._status = 1;
      this.ndkRelay.emit("disconnect");
    }
    /**
     * Handles incoming messages from the NDK relay WebSocket connection.
     * This method is called whenever a message is received from the relay.
     * It parses the message data and dispatches the appropriate handling logic based on the message type.
     *
     * @param event - The MessageEvent containing the received message data.
     */
    onMessage(event) {
      this.netDebug?.(event.data, this.ndkRelay, "recv");
      try {
        const data = JSON.parse(event.data);
        const [cmd, id, ...rest] = data;
        switch (cmd) {
          case "EVENT": {
            const so = this.openSubs.get(id);
            const event2 = data[2];
            if (!so) {
              this.debug(`Received event for unknown subscription ${id}`);
              return;
            }
            so.onevent(event2);
            return;
          }
          case "COUNT": {
            const payload = data[2];
            const cr = this.openCountRequests.get(id);
            if (cr) {
              cr.resolve(payload.count);
              this.openCountRequests.delete(id);
            }
            return;
          }
          case "EOSE": {
            const so = this.openSubs.get(id);
            if (!so) return;
            so.oneose(id);
            return;
          }
          case "OK": {
            const ok = data[2];
            const reason = data[3];
            const ep = this.openEventPublishes.get(id);
            const firstEp = ep?.pop();
            if (!ep || !firstEp) {
              this.debug("Received OK for unknown event publish", id);
              return;
            }
            if (ok) firstEp.resolve(reason);
            else firstEp.reject(new Error(reason));
            if (ep.length === 0) {
              this.openEventPublishes.delete(id);
            } else {
              this.openEventPublishes.set(id, ep);
            }
            return;
          }
          case "CLOSED": {
            const so = this.openSubs.get(id);
            if (!so) return;
            so.onclosed(data[2]);
            return;
          }
          case "NOTICE":
            this.onNotice(data[1]);
            return;
          case "AUTH": {
            this.onAuthRequested(data[1]);
            return;
          }
        }
      } catch (error) {
        this.debug(
          `Error parsing message from ${this.ndkRelay.url}: ${error.message}`,
          error?.stack
        );
        return;
      }
    }
    /**
     * Handles an authentication request from the NDK relay.
     *
     * If an authentication policy is configured, it will be used to authenticate the connection.
     * Otherwise, the `auth` event will be emitted to allow the application to handle the authentication.
     *
     * @param challenge - The authentication challenge provided by the NDK relay.
     */
    async onAuthRequested(challenge3) {
      const authPolicy = this.ndkRelay.authPolicy ?? this.ndk?.relayAuthDefaultPolicy;
      this.debug("Relay requested authentication", {
        havePolicy: !!authPolicy
      });
      if (this._status === 7) {
        this.debug("Already authenticating, ignoring");
        return;
      }
      this._status = 6;
      if (authPolicy) {
        if (this._status >= 5) {
          this._status = 7;
          let res;
          try {
            res = await authPolicy(this.ndkRelay, challenge3);
          } catch (e) {
            this.debug("Authentication policy threw an error", e);
            res = false;
          }
          this.debug("Authentication policy returned", !!res);
          if (res instanceof NDKEvent || res === true) {
            if (res instanceof NDKEvent) {
              await this.auth(res);
            }
            const authenticate = async () => {
              if (this._status >= 5 && this._status < 8) {
                const event = new NDKEvent(this.ndk);
                event.kind = 22242;
                event.tags = [
                  ["relay", this.ndkRelay.url],
                  ["challenge", challenge3]
                ];
                await event.sign();
                this.auth(event).then(() => {
                  this._status = 8;
                  this.ndkRelay.emit("authed");
                  this.debug("Authentication successful");
                }).catch((e) => {
                  this._status = 6;
                  this.ndkRelay.emit("auth:failed", e);
                  this.debug("Authentication failed", e);
                });
              } else {
                this.debug(
                  "Authentication failed, it changed status, status is %d",
                  this._status
                );
              }
            };
            if (res === true) {
              if (!this.ndk?.signer) {
                this.debug("No signer available for authentication localhost");
                this.ndk?.once("signer:ready", authenticate);
              } else {
                authenticate().catch((e) => {
                  console.error("Error authenticating", e);
                });
              }
            }
            this._status = 5;
            this.ndkRelay.emit("authed");
          }
        }
      } else {
        this.ndkRelay.emit("auth", challenge3);
      }
    }
    /**
     * Handles errors that occur on the WebSocket connection to the relay.
     * @param error - The error or event that occurred.
     */
    onError(error) {
      this.debug(`WebSocket error on ${this.ndkRelay.url}:`, error);
    }
    /**
     * Gets the current status of the NDK relay connection.
     * @returns {NDKRelayStatus} The current status of the NDK relay connection.
     */
    get status() {
      return this._status;
    }
    /**
     * Checks if the NDK relay connection is currently available.
     * @returns {boolean} `true` if the relay connection is in the `CONNECTED` status, `false` otherwise.
     */
    isAvailable() {
      return this._status === 5;
    }
    /**
     * Checks if the NDK relay connection is flapping, which means the connection is rapidly
     * disconnecting and reconnecting. This is determined by analyzing the durations of the
     * last three connection attempts. If the standard deviation of the durations is less
     * than 1000 milliseconds, the connection is considered to be flapping.
     *
     * @returns {boolean} `true` if the connection is flapping, `false` otherwise.
     */
    isFlapping() {
      const durations = this._connectionStats.durations;
      if (durations.length % 3 !== 0) return false;
      const sum = durations.reduce((a, b) => a + b, 0);
      const avg = sum / durations.length;
      const variance = durations.map((x) => Math.pow(x - avg, 2)).reduce((a, b) => a + b, 0) / durations.length;
      const stdDev = Math.sqrt(variance);
      const isFlapping = stdDev < FLAPPING_THRESHOLD_MS;
      return isFlapping;
    }
    /**
     * Handles a notice received from the NDK relay.
     * If the notice indicates the relay is complaining (e.g. "too many" or "maximum"),
     * the method disconnects from the relay and attempts to reconnect after a 2-second delay.
     * A debug message is logged with the relay URL and the notice text.
     * The "notice" event is emitted on the ndkRelay instance with the notice text.
     *
     * @param notice - The notice text received from the NDK relay.
     */
    async onNotice(notice) {
      this.ndkRelay.emit("notice", notice);
    }
    /**
     * Attempts to reconnect to the NDK relay after a connection is lost.
     * This function is called recursively to handle multiple reconnection attempts.
     * It checks if the relay is flapping and emits a "flapping" event if so.
     * It then calculates a delay before the next reconnection attempt based on the number of previous attempts.
     * The function sets a timeout to execute the next reconnection attempt after the calculated delay.
     * If the maximum number of reconnection attempts is reached, a debug message is logged.
     *
     * @param attempt - The current attempt number (default is 0).
     */
    handleReconnection(attempt = 0) {
      if (this.reconnectTimeout) return;
      if (this.isFlapping()) {
        this.ndkRelay.emit("flapping", this._connectionStats);
        this._status = 3;
        return;
      }
      const reconnectDelay = this.connectedAt ? Math.max(0, 6e4 - (Date.now() - this.connectedAt)) : 5e3 * (this._connectionStats.attempts + 1);
      this.reconnectTimeout = setTimeout(() => {
        this.reconnectTimeout = void 0;
        this._status = 2;
        this.connect().catch((err) => {
          if (attempt < MAX_RECONNECT_ATTEMPTS) {
            setTimeout(
              () => {
                this.handleReconnection(attempt + 1);
              },
              1e3 * (attempt + 1) ^ 4
            );
          } else {
            this.debug("Reconnect failed");
          }
        });
      }, reconnectDelay);
      this.ndkRelay.emit("delayed-connect", reconnectDelay);
      this.debug("Reconnecting in", reconnectDelay);
      this._connectionStats.nextReconnectAt = Date.now() + reconnectDelay;
    }
    /**
     * Sends a message to the NDK relay if the connection is in the CONNECTED state and the WebSocket is open.
     * If the connection is not in the CONNECTED state or the WebSocket is not open, logs a debug message and throws an error.
     *
     * @param message - The message to send to the NDK relay.
     * @throws {Error} If attempting to send on a closed relay connection.
     */
    async send(message) {
      if (this._status >= 5 && this.ws?.readyState === WebSocket.OPEN) {
        this.ws?.send(message);
        this.netDebug?.(message, this.ndkRelay, "send");
      } else {
        this.debug(
          `Not connected to ${this.ndkRelay.url} (%d), not sending message ${message}`,
          this._status
        );
      }
    }
    /**
     * Authenticates the NDK event by sending it to the NDK relay and returning a promise that resolves with the result.
     *
     * @param event - The NDK event to authenticate.
     * @returns A promise that resolves with the authentication result.
     */
    async auth(event) {
      const ret = new Promise((resolve, reject) => {
        const val = this.openEventPublishes.get(event.id) ?? [];
        val.push({ resolve, reject });
        this.openEventPublishes.set(event.id, val);
      });
      this.send('["AUTH",' + JSON.stringify(event.rawEvent()) + "]");
      return ret;
    }
    /**
     * Publishes an NDK event to the relay and returns a promise that resolves with the result.
     *
     * @param event - The NDK event to publish.
     * @returns A promise that resolves with the result of the event publication.
     * @throws {Error} If attempting to publish on a closed relay connection.
     */
    async publish(event) {
      const ret = new Promise((resolve, reject) => {
        const val = this.openEventPublishes.get(event.id) ?? [];
        if (val.length > 0) {
          console.warn(
            "Duplicate event publishing detected, you are publishing event " + event.id + " twice"
          );
        }
        val.push({ resolve, reject });
        this.openEventPublishes.set(event.id, val);
      });
      this.send('["EVENT",' + JSON.stringify(event) + "]");
      return ret;
    }
    /**
     * Counts the number of events that match the provided filters.
     *
     * @param filters - The filters to apply to the count request.
     * @param params - An optional object containing a custom id for the count request.
     * @returns A promise that resolves with the number of matching events.
     * @throws {Error} If attempting to send the count request on a closed relay connection.
     */
    async count(filters, params) {
      this.serial++;
      const id = params?.id || "count:" + this.serial;
      const ret = new Promise((resolve, reject) => {
        this.openCountRequests.set(id, { resolve, reject });
      });
      this.send('["COUNT","' + id + '",' + JSON.stringify(filters).substring(1));
      return ret;
    }
    close(subId, reason) {
      this.send('["CLOSE","' + subId + '"]');
      const sub = this.openSubs.get(subId);
      this.openSubs.delete(subId);
      if (sub) sub.onclose(reason);
    }
    /**
     * Subscribes to the NDK relay with the provided filters and parameters.
     *
     * @param filters - The filters to apply to the subscription.
     * @param params - The subscription parameters, including an optional custom id.
     * @returns A new NDKRelaySubscription instance.
     */
    req(relaySub) {
      this.send(
        '["REQ","' + relaySub.subId + '",' + JSON.stringify(relaySub.executeFilters).substring(1)
      ) + "]";
      this.openSubs.set(relaySub.subId, relaySub);
    }
    /**
     * Utility functions to update the connection stats.
     */
    updateConnectionStats = {
      connected: () => {
        this._connectionStats.success++;
        this._connectionStats.connectedAt = Date.now();
      },
      disconnected: () => {
        if (this._connectionStats.connectedAt) {
          this._connectionStats.durations.push(
            Date.now() - this._connectionStats.connectedAt
          );
          if (this._connectionStats.durations.length > 100) {
            this._connectionStats.durations.shift();
          }
        }
        this._connectionStats.connectedAt = void 0;
      },
      attempt: () => {
        this._connectionStats.attempts++;
        this._connectionStats.connectedAt = Date.now();
      }
    };
    /** Returns the connection stats. */
    get connectionStats() {
      return this._connectionStats;
    }
    /** Returns the relay URL */
    get url() {
      return this.ndkRelay.url;
    }
    get connected() {
      return this._status >= 5 && this.ws?.readyState === WebSocket.OPEN;
    }
  };
  var NDKRelayPublisher = class {
    ndkRelay;
    debug;
    constructor(ndkRelay) {
      this.ndkRelay = ndkRelay;
      this.debug = ndkRelay.debug.extend("publisher");
    }
    /**
     * Published an event to the relay; if the relay is not connected, it will
     * wait for the relay to connect before publishing the event.
     *
     * If the relay does not connect within the timeout, the publish operation
     * will fail.
     * @param event  The event to publish
     * @param timeoutMs  The timeout for the publish operation in milliseconds
     * @returns A promise that resolves when the event has been published or rejects if the operation times out
     */
    async publish(event, timeoutMs = 2500) {
      let timeout;
      const publishConnected = () => {
        return new Promise((resolve, reject) => {
          try {
            this.publishEvent(event).then((result) => {
              this.ndkRelay.emit("published", event);
              event.emit("relay:published", this.ndkRelay);
              resolve(true);
            }).catch(reject);
          } catch (err) {
            reject(err);
          }
        });
      };
      const timeoutPromise = new Promise((_, reject) => {
        timeout = setTimeout(() => {
          timeout = void 0;
          reject(new Error("Timeout: " + timeoutMs + "ms"));
        }, timeoutMs);
      });
      const onConnectHandler = () => {
        publishConnected().then((result) => connectResolve(result)).catch((err) => connectReject(err));
      };
      let connectResolve;
      let connectReject;
      const onError = (err) => {
        this.ndkRelay.debug("Publish failed", err, event.id);
        this.ndkRelay.emit("publish:failed", event, err);
        event.emit("relay:publish:failed", this.ndkRelay, err);
        throw err;
      };
      const onFinally = () => {
        if (timeout) clearTimeout(timeout);
        this.ndkRelay.removeListener("connect", onConnectHandler);
      };
      if (this.ndkRelay.status >= 5) {
        return Promise.race([publishConnected(), timeoutPromise]).catch(onError).finally(onFinally);
      } else {
        if (this.ndkRelay.status <= 1) {
          console.warn(
            "Relay is disconnected, trying to connect to publish an event",
            this.ndkRelay.url
          );
          this.ndkRelay.connect();
        } else {
          console.warn(
            "Relay not connected, waiting for connection to publish an event",
            this.ndkRelay.url
          );
        }
        return Promise.race([
          new Promise((resolve, reject) => {
            connectResolve = resolve;
            connectReject = reject;
            this.ndkRelay.once("connect", onConnectHandler);
          }),
          timeoutPromise
        ]).catch(onError).finally(onFinally);
      }
    }
    async publishEvent(event) {
      return this.ndkRelay.connectivity.publish(event.rawEvent());
    }
  };
  function filterFingerprint(filters, closeOnEose) {
    const elements = [];
    for (const filter of filters) {
      const keys = Object.entries(filter || {}).map(([key, values]) => {
        if (["since", "until"].includes(key)) {
          return key + ":" + values;
        } else {
          return key;
        }
      }).sort().join("-");
      elements.push(keys);
    }
    let id = closeOnEose ? "+" : "";
    id += elements.join("|");
    return id;
  }
  function mergeFilters(filters) {
    const result = [];
    const lastResult = {};
    filters.filter((f) => !!f.limit).forEach((filterWithLimit) => result.push(filterWithLimit));
    filters = filters.filter((f) => !f.limit);
    if (filters.length === 0) return result;
    filters.forEach((filter) => {
      Object.entries(filter).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (lastResult[key] === void 0) {
            lastResult[key] = [...value];
          } else {
            lastResult[key] = Array.from(/* @__PURE__ */ new Set([...lastResult[key], ...value]));
          }
        } else {
          lastResult[key] = value;
        }
      });
    });
    return [...result, lastResult];
  }
  var NDKRelaySubscription = class {
    fingerprint;
    items = /* @__PURE__ */ new Map();
    topSubManager;
    debug;
    /**
     * Tracks the status of this REQ.
     */
    status = 0;
    onClose;
    relay;
    /**
     * Whether this subscription has reached EOSE.
     */
    eosed = false;
    /**
     * Timeout at which this subscription will
     * start executing.
     */
    executionTimer;
    /**
     * Track the time at which this subscription will fire.
     */
    fireTime;
    /**
     * The delay type that the current fireTime was calculated with.
     */
    delayType;
    /**
     * The filters that have been executed.
     */
    executeFilters;
    id = Math.random().toString(36).substring(7);
    /**
     *
     * @param fingerprint The fingerprint of this subscription.
     */
    constructor(relay, fingerprint, topSubManager) {
      this.relay = relay;
      this.topSubManager = topSubManager;
      this.debug = relay.debug.extend("subscription-" + this.id);
      this.fingerprint = fingerprint || Math.random().toString(36).substring(7);
    }
    _subId;
    get subId() {
      if (this._subId) return this._subId;
      this._subId = this.fingerprint.slice(0, 15);
      return this._subId;
    }
    subIdParts = /* @__PURE__ */ new Set();
    addSubIdPart(part) {
      this.subIdParts.add(part);
    }
    addItem(subscription, filters) {
      this.debug("Adding item", { filters, internalId: subscription.internalId, status: this.status, fingerprint: this.fingerprint, id: this.subId, items: this.items, itemsSize: this.items.size });
      if (this.items.has(subscription.internalId)) return;
      subscription.on("close", this.removeItem.bind(this, subscription));
      this.items.set(subscription.internalId, { subscription, filters });
      if (this.status !== 3) {
        if (subscription.subId && (!this._subId || this._subId.length < 48)) {
          if (this.status === 0 || this.status === 1) {
            this.addSubIdPart(subscription.subId);
          }
        }
      }
      switch (this.status) {
        case 0:
          this.evaluateExecutionPlan(subscription);
          break;
        case 3:
          console.log(
            "BUG: This should not happen: This subscription needs to catch up with a subscription that was already running",
            filters
          );
          break;
        case 1:
          this.evaluateExecutionPlan(subscription);
          break;
        case 4:
          this.debug(
            "Subscription is closed, cannot add new items %o (%o)",
            subscription,
            filters
          );
          throw new Error("Cannot add new items to a closed subscription");
      }
    }
    /**
     * A subscription has been closed, remove it from the list of items.
     * @param subscription
     */
    removeItem(subscription) {
      this.items.delete(subscription.internalId);
      if (this.items.size === 0) {
        if (!this.eosed) return;
        this.close();
        this.cleanup();
      }
    }
    close() {
      if (this.status === 4) return;
      const prevStatus = this.status;
      this.status = 4;
      if (prevStatus === 3) {
        try {
          this.relay.close(this.subId);
        } catch (e) {
          this.debug("Error closing subscription", e, this);
        }
      } else {
        this.debug("Subscription wanted to close but it wasn't running, this is probably ok", {
          subId: this.subId,
          prevStatus,
          sub: this
        });
      }
      this.cleanup();
    }
    cleanup() {
      if (this.executionTimer) clearTimeout(this.executionTimer);
      this.relay.off("ready", this.executeOnRelayReady);
      this.relay.off("authed", this.reExecuteAfterAuth);
      if (this.onClose) this.onClose(this);
    }
    evaluateExecutionPlan(subscription) {
      if (!subscription.isGroupable()) {
        this.status = 1;
        this.execute();
        return;
      }
      if (subscription.filters.find((filter) => !!filter.limit)) {
        this.executeFilters = this.compileFilters();
        if (this.executeFilters.length >= 10) {
          this.status = 1;
          this.execute();
          return;
        }
      }
      const delay = subscription.groupableDelay;
      const delayType = subscription.groupableDelayType;
      if (!delay) throw new Error("Cannot group a subscription without a delay");
      if (this.status === 0) {
        this.schedule(delay, delayType);
      } else {
        const existingDelayType = this.delayType;
        const timeUntilFire = this.fireTime - Date.now();
        if (existingDelayType === "at-least" && delayType === "at-least") {
          if (timeUntilFire < delay) {
            if (this.executionTimer) clearTimeout(this.executionTimer);
            this.schedule(delay, delayType);
          }
        } else if (existingDelayType === "at-least" && delayType === "at-most") {
          if (timeUntilFire > delay) {
            if (this.executionTimer) clearTimeout(this.executionTimer);
            this.schedule(delay, delayType);
          }
        } else if (existingDelayType === "at-most" && delayType === "at-most") {
          if (timeUntilFire > delay) {
            if (this.executionTimer) clearTimeout(this.executionTimer);
            this.schedule(delay, delayType);
          }
        } else if (existingDelayType === "at-most" && delayType === "at-least") {
          if (timeUntilFire > delay) {
            if (this.executionTimer) clearTimeout(this.executionTimer);
            this.schedule(delay, delayType);
          }
        } else {
          throw new Error(
            "Unknown delay type combination " + existingDelayType + " " + delayType
          );
        }
      }
    }
    schedule(delay, delayType) {
      this.status = 1;
      const currentTime = Date.now();
      this.fireTime = currentTime + delay;
      this.delayType = delayType;
      const timer = setTimeout(this.execute.bind(this), delay);
      if (delayType === "at-least") {
        this.executionTimer = timer;
      }
    }
    executeOnRelayReady = () => {
      if (this.status !== 2) return;
      if (this.items.size === 0) {
        this.debug("No items to execute; this relay was probably too slow to respond and the caller gave up", { status: this.status, fingerprint: this.fingerprint, items: this.items, itemsSize: this.items.size, id: this.id, subId: this.subId });
        this.cleanup();
        return;
      }
      this.debug("Executing on relay ready", { status: this.status, fingerprint: this.fingerprint, items: this.items, itemsSize: this.items.size });
      this.status = 1;
      this.execute();
    };
    finalizeSubId() {
      if (this.subIdParts.size > 0) {
        this._subId = Array.from(this.subIdParts).join("-");
      } else {
        this._subId = this.fingerprint.slice(0, 15);
      }
      this._subId += "-" + Math.random().toString(36).substring(2, 7);
    }
    // we do it this way so that we can remove the listener
    reExecuteAfterAuth = (() => {
      const oldSubId = this.subId;
      this.debug("Re-executing after auth", this.items.size);
      if (this.eosed) {
        this.relay.close(this.subId);
      } else {
        this.debug(
          "We are abandoning an opened subscription, once it EOSE's, the handler will close it",
          { oldSubId }
        );
      }
      this._subId = void 0;
      this.status = 1;
      this.execute();
      this.debug("Re-executed after auth %s \u{1F449} %s", oldSubId, this.subId);
    }).bind(this);
    execute() {
      if (this.status !== 1) {
        return;
      }
      if (!this.relay.connected) {
        this.status = 2;
        this.debug("Waiting for relay to be ready", { status: this.status, id: this.subId, fingerprint: this.fingerprint, items: this.items, itemsSize: this.items.size });
        this.relay.once("ready", this.executeOnRelayReady);
        return;
      } else if (this.relay.status < 8) {
        this.relay.once("authed", this.reExecuteAfterAuth);
      }
      this.status = 3;
      this.finalizeSubId();
      this.executeFilters = this.compileFilters();
      this.relay.req(this);
    }
    onstart() {
    }
    onevent(event) {
      this.topSubManager.dispatchEvent(event, this.relay);
    }
    oneose(subId) {
      this.eosed = true;
      if (subId !== this.subId) {
        this.debug("Received EOSE for an abandoned subscription", subId, this.subId);
        this.relay.close(subId);
        return;
      }
      if (this.items.size === 0) {
        this.close();
      }
      for (const { subscription } of this.items.values()) {
        subscription.eoseReceived(this.relay);
        if (subscription.closeOnEose) {
          this.debug("Removing item because of EOSE", { filters: subscription.filters, internalId: subscription.internalId, status: this.status, fingerprint: this.fingerprint, items: this.items, itemsSize: this.items.size });
          this.removeItem(subscription);
        }
      }
    }
    onclose(reason) {
      this.status = 4;
    }
    onclosed(reason) {
      if (!reason) return;
      for (const { subscription } of this.items.values()) {
        subscription.closedReceived(this.relay, reason);
      }
    }
    /**
     * Grabs the filters from all the subscriptions
     * and merges them into a single filter.
     */
    compileFilters() {
      const mergedFilters = [];
      const filters = Array.from(this.items.values()).map((item) => item.filters);
      if (!filters[0]) {
        this.debug("\u{1F440} No filters to merge", this.items);
        console.error("BUG: No filters to merge!", this.items);
        return [];
      }
      const filterCount = filters[0].length;
      for (let i2 = 0; i2 < filterCount; i2++) {
        const allFiltersAtIndex = filters.map((filter) => filter[i2]);
        mergedFilters.push(...mergeFilters(allFiltersAtIndex));
      }
      return mergedFilters;
    }
  };
  var NDKRelaySubscriptionManager = class {
    relay;
    subscriptions;
    generalSubManager;
    /**
     * @param relay - The relay instance.
     * @param generalSubManager - The subscription manager instance.
     */
    constructor(relay, generalSubManager) {
      this.relay = relay;
      this.subscriptions = /* @__PURE__ */ new Map();
      this.generalSubManager = generalSubManager;
    }
    /**
     * Adds a subscription to the manager.
     */
    addSubscription(sub, filters) {
      let relaySub;
      if (!sub.isGroupable()) {
        relaySub = this.createSubscription(sub, filters);
      } else {
        const filterFp = filterFingerprint(filters, sub.closeOnEose);
        if (filterFp) {
          const existingSubs = this.subscriptions.get(filterFp);
          relaySub = (existingSubs || []).find(
            (sub2) => sub2.status < 3
            /* RUNNING */
          );
        }
        relaySub ??= this.createSubscription(sub, filters, filterFp);
      }
      relaySub.addItem(sub, filters);
    }
    createSubscription(sub, filters, fingerprint) {
      const relaySub = new NDKRelaySubscription(this.relay, fingerprint || null, this.generalSubManager);
      relaySub.onClose = this.onRelaySubscriptionClose.bind(this);
      const currentVal = this.subscriptions.get(relaySub.fingerprint) ?? [];
      this.subscriptions.set(relaySub.fingerprint, [...currentVal, relaySub]);
      return relaySub;
    }
    onRelaySubscriptionClose(sub) {
      let currentVal = this.subscriptions.get(sub.fingerprint) ?? [];
      if (!currentVal) {
        console.warn(
          "Unexpectedly did not find a subscription with fingerprint",
          sub.fingerprint
        );
      } else if (currentVal.length === 1) {
        this.subscriptions.delete(sub.fingerprint);
      } else {
        currentVal = currentVal.filter((s) => s.id !== sub.id);
        this.subscriptions.set(sub.fingerprint, currentVal);
      }
    }
  };
  var NDKRelay = class _NDKRelay extends import_tseep2.EventEmitter {
    url;
    scores;
    connectivity;
    subs;
    publisher;
    authPolicy;
    /**
     * The lowest validation ratio this relay can reach.
     */
    lowestValidationRatio;
    /**
     * Current validation ratio this relay is targeting.
     */
    targetValidationRatio;
    validationRatioFn;
    /**
     * This tracks events that have been seen by this relay
     * with a valid signature.
     */
    validatedEventCount = 0;
    /**
     * This tracks events that have been seen by this relay
     * but have not been validated.
     */
    nonValidatedEventCount = 0;
    /**
     * Whether this relay is trusted.
     *
     * Trusted relay's events do not get their signature verified.
     */
    trusted = false;
    complaining = false;
    debug;
    static defaultValidationRatioUpdateFn = (relay, validatedCount, nonValidatedCount) => {
      if (relay.lowestValidationRatio === void 0 || relay.targetValidationRatio === void 0)
        return 1;
      let newRatio = relay.validationRatio;
      if (relay.validationRatio > relay.targetValidationRatio) {
        const factor = validatedCount / 100;
        newRatio = Math.max(relay.lowestValidationRatio, relay.validationRatio - factor);
      }
      if (newRatio < relay.validationRatio) {
        return newRatio;
      }
      return relay.validationRatio;
    };
    constructor(url, authPolicy, ndk) {
      super();
      this.url = normalizeRelayUrl(url);
      this.scores = /* @__PURE__ */ new Map();
      this.debug = (0, import_debug.default)(`ndk:relay:${url}`);
      this.connectivity = new NDKRelayConnectivity(this, ndk);
      this.connectivity.netDebug = ndk?.netDebug;
      this.req = this.connectivity.req.bind(this.connectivity);
      this.close = this.connectivity.close.bind(this.connectivity);
      this.subs = new NDKRelaySubscriptionManager(this, ndk.subManager);
      this.publisher = new NDKRelayPublisher(this);
      this.authPolicy = authPolicy;
      this.targetValidationRatio = ndk?.initialValidationRatio;
      this.lowestValidationRatio = ndk?.lowestValidationRatio;
      this.validationRatioFn = (ndk?.validationRatioFn ?? _NDKRelay.defaultValidationRatioUpdateFn).bind(this);
      this.updateValidationRatio();
      if (!ndk) {
        console.trace("relay created without ndk");
      }
    }
    updateValidationRatio() {
      setTimeout(() => {
        this.updateValidationRatio();
      }, 3e4);
    }
    get status() {
      return this.connectivity.status;
    }
    get connectionStats() {
      return this.connectivity.connectionStats;
    }
    /**
     * Connects to the relay.
     */
    async connect(timeoutMs, reconnect = true) {
      return this.connectivity.connect(timeoutMs, reconnect);
    }
    /**
     * Disconnects from the relay.
     */
    disconnect() {
      if (this.status === 1) {
        return;
      }
      this.connectivity.disconnect();
    }
    /**
     * Queues or executes the subscription of a specific set of filters
     * within this relay.
     *
     * @param subscription NDKSubscription this filters belong to.
     * @param filters Filters to execute
     */
    subscribe(subscription, filters) {
      this.subs.addSubscription(subscription, filters);
    }
    /**
     * Publishes an event to the relay with an optional timeout.
     *
     * If the relay is not connected, the event will be published when the relay connects,
     * unless the timeout is reached before the relay connects.
     *
     * @param event The event to publish
     * @param timeoutMs The timeout for the publish operation in milliseconds
     * @returns A promise that resolves when the event has been published or rejects if the operation times out
     */
    async publish(event, timeoutMs = 2500) {
      return this.publisher.publish(event, timeoutMs);
    }
    referenceTags() {
      return [["r", this.url]];
    }
    addValidatedEvent() {
      this.validatedEventCount++;
    }
    addNonValidatedEvent() {
      this.nonValidatedEventCount++;
    }
    /**
     * The current validation ratio this relay has achieved.
     */
    get validationRatio() {
      if (this.nonValidatedEventCount === 0) {
        return 1;
      }
      return this.validatedEventCount / (this.validatedEventCount + this.nonValidatedEventCount);
    }
    shouldValidateEvent() {
      if (this.trusted) {
        return false;
      }
      if (this.targetValidationRatio === void 0) {
        return true;
      }
      return this.validationRatio < this.targetValidationRatio;
    }
    get connected() {
      return this.connectivity.connected;
    }
    req;
    close;
  };
  var NDKPool = class extends import_tseep.EventEmitter {
    // TODO: This should probably be an LRU cache
    _relays = /* @__PURE__ */ new Map();
    autoConnectRelays = /* @__PURE__ */ new Set();
    blacklistRelayUrls;
    debug;
    temporaryRelayTimers = /* @__PURE__ */ new Map();
    flappingRelays = /* @__PURE__ */ new Set();
    // A map to store timeouts for each flapping relay.
    backoffTimes = /* @__PURE__ */ new Map();
    ndk;
    constructor(relayUrls = [], blacklistedRelayUrls = [], ndk, debug8) {
      super();
      this.debug = debug8 ?? ndk.debug.extend("pool");
      this.ndk = ndk;
      this.relayUrls = relayUrls;
      this.blacklistRelayUrls = new Set(blacklistedRelayUrls);
    }
    get relays() {
      return this._relays;
    }
    set relayUrls(urls) {
      this._relays.clear();
      for (const relayUrl of urls) {
        const relay = new NDKRelay(relayUrl, void 0, this.ndk);
        relay.connectivity.netDebug = this.ndk.netDebug;
        this.addRelay(relay, false);
      }
    }
    set name(name) {
      this.debug = this.debug.extend(name);
    }
    /**
     * Adds a relay to the pool, and sets a timer to remove it if it is not used within the specified time.
     * @param relay - The relay to add to the pool.
     * @param removeIfUnusedAfter - The time in milliseconds to wait before removing the relay from the pool after it is no longer used.
     */
    useTemporaryRelay(relay, removeIfUnusedAfter = 3e4, filters) {
      const relayAlreadyInPool = this.relays.has(relay.url);
      if (!relayAlreadyInPool) {
        this.addRelay(relay);
        this.debug("Adding temporary relay %s for filters %o", relay.url, filters);
      }
      const existingTimer = this.temporaryRelayTimers.get(relay.url);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }
      if (!relayAlreadyInPool || existingTimer) {
        const timer = setTimeout(() => {
          if (this.ndk.explicitRelayUrls?.includes(relay.url)) return;
          this.removeRelay(relay.url);
        }, removeIfUnusedAfter);
        this.temporaryRelayTimers.set(relay.url, timer);
      }
    }
    /**
     * Adds a relay to the pool.
     *
     * @param relay - The relay to add to the pool.
     * @param connect - Whether or not to connect to the relay.
     */
    addRelay(relay, connect = true) {
      const isAlreadyInPool = this.relays.has(relay.url);
      const isBlacklisted = this.blacklistRelayUrls?.has(relay.url);
      const isCustomRelayUrl = relay.url.includes("/npub1");
      let reconnect = true;
      const relayUrl = relay.url;
      if (isAlreadyInPool) return;
      if (isBlacklisted) {
        this.debug(`Refusing to add relay ${relayUrl}: blacklisted`);
        return;
      }
      if (isCustomRelayUrl) {
        this.debug(`Refusing to add relay ${relayUrl}: is a filter relay`);
        return;
      }
      if (this.ndk.cacheAdapter?.getRelayStatus) {
        const info = this.ndk.cacheAdapter.getRelayStatus(relayUrl);
        if (info && info.dontConnectBefore) {
          if (info.dontConnectBefore > Date.now()) {
            const delay = info.dontConnectBefore - Date.now();
            this.debug(`Refusing to add relay ${relayUrl}: delayed connect for ${delay}ms`);
            setTimeout(() => {
              this.addRelay(relay, connect);
            }, delay);
            return;
          } else {
            reconnect = false;
          }
        }
      }
      const noticeHandler = (notice) => this.emit("notice", relay, notice);
      const connectHandler = () => this.handleRelayConnect(relayUrl);
      const readyHandler = () => this.handleRelayReady(relay);
      const disconnectHandler = () => this.emit("relay:disconnect", relay);
      const flappingHandler = () => this.handleFlapping(relay);
      const authHandler = (challenge3) => this.emit("relay:auth", relay, challenge3);
      const authedHandler = () => this.emit("relay:authed", relay);
      relay.off("notice", noticeHandler);
      relay.off("connect", connectHandler);
      relay.off("ready", readyHandler);
      relay.off("disconnect", disconnectHandler);
      relay.off("flapping", flappingHandler);
      relay.off("auth", authHandler);
      relay.off("authed", authedHandler);
      relay.on("notice", noticeHandler);
      relay.on("connect", connectHandler);
      relay.on("ready", readyHandler);
      relay.on("disconnect", disconnectHandler);
      relay.on("flapping", flappingHandler);
      relay.on("auth", authHandler);
      relay.on("authed", authedHandler);
      relay.on("delayed-connect", (delay) => {
        if (this.ndk.cacheAdapter?.updateRelayStatus) {
          this.ndk.cacheAdapter.updateRelayStatus(relay.url, {
            dontConnectBefore: Date.now() + delay
          });
        }
      });
      this.relays.set(relayUrl, relay);
      if (connect) this.autoConnectRelays.add(relayUrl);
      if (connect) {
        this.emit("relay:connecting", relay);
        relay.connect(void 0, reconnect).catch((e) => {
          this.debug(`Failed to connect to relay ${relayUrl}`, e);
        });
      }
    }
    /**
     * Removes a relay from the pool.
     * @param relayUrl - The URL of the relay to remove.
     * @returns {boolean} True if the relay was removed, false if it was not found.
     */
    removeRelay(relayUrl) {
      const relay = this.relays.get(relayUrl);
      if (relay) {
        relay.disconnect();
        this.relays.delete(relayUrl);
        this.autoConnectRelays.delete(relayUrl);
        this.emit("relay:disconnect", relay);
        return true;
      }
      const existingTimer = this.temporaryRelayTimers.get(relayUrl);
      if (existingTimer) {
        clearTimeout(existingTimer);
        this.temporaryRelayTimers.delete(relayUrl);
      }
      return false;
    }
    /**
     * Checks whether a relay is already connected in the pool.
     */
    isRelayConnected(url) {
      const normalizedUrl = normalizeRelayUrl(url);
      const relay = this.relays.get(normalizedUrl);
      if (!relay) return false;
      return relay.status === 5;
    }
    /**
     * Fetches a relay from the pool, or creates a new one if it does not exist.
     *
     * New relays will be attempted to be connected.
     */
    getRelay(url, connect = true, temporary = false, filters) {
      let relay = this.relays.get(normalizeRelayUrl(url));
      if (!relay) {
        relay = new NDKRelay(url, void 0, this.ndk);
        relay.connectivity.netDebug = this.ndk.netDebug;
        if (temporary) {
          this.useTemporaryRelay(relay, 3e4, filters);
        } else {
          this.addRelay(relay, connect);
        }
      }
      return relay;
    }
    handleRelayConnect(relayUrl) {
      const relay = this.relays.get(relayUrl);
      if (!relay) {
        console.error("NDK BUG: relay not found in pool", { relayUrl });
        return;
      }
      this.emit("relay:connect", relay);
      if (this.stats().connected === this.relays.size) {
        this.emit("connect");
      }
    }
    handleRelayReady(relay) {
      this.emit("relay:ready", relay);
    }
    /**
     * Attempts to establish a connection to each relay in the pool.
     *
     * @async
     * @param {number} [timeoutMs] - Optional timeout in milliseconds for each connection attempt.
     * @returns {Promise<void>} A promise that resolves when all connection attempts have completed.
     * @throws {Error} If any of the connection attempts result in an error or timeout.
     */
    async connect(timeoutMs) {
      const promises = [];
      this.debug(
        `Connecting to ${this.relays.size} relays${timeoutMs ? `, timeout ${timeoutMs}...` : ""}`
      );
      const relaysToConnect = new Set(this.autoConnectRelays.keys());
      this.ndk.explicitRelayUrls?.forEach((url) => {
        const normalizedUrl = normalizeRelayUrl(url);
        relaysToConnect.add(normalizedUrl);
      });
      for (const relayUrl of relaysToConnect) {
        const relay = this.relays.get(relayUrl);
        if (!relay) continue;
        const connectPromise = new Promise((resolve, reject) => {
          this.emit("relay:connecting", relay);
          return relay.connect(timeoutMs).then(resolve).catch(reject);
        });
        if (timeoutMs) {
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(`Timed out after ${timeoutMs}ms`), timeoutMs);
          });
          promises.push(
            Promise.race([connectPromise, timeoutPromise]).catch((e) => {
              this.debug(
                `Failed to connect to relay ${relay.url}: ${e ?? "No reason specified"}`
              );
            })
          );
        } else {
          promises.push(connectPromise);
        }
      }
      if (timeoutMs) {
        setTimeout(() => {
          const allConnected = this.stats().connected === this.relays.size;
          const someConnected = this.stats().connected > 0;
          if (!allConnected && someConnected) {
            this.emit("connect");
          }
        }, timeoutMs);
      }
      await Promise.all(promises);
    }
    checkOnFlappingRelays() {
      const flappingRelaysCount = this.flappingRelays.size;
      const totalRelays = this.relays.size;
      if (flappingRelaysCount / totalRelays >= 0.8) {
        for (const relayUrl of this.flappingRelays) {
          this.backoffTimes.set(relayUrl, 0);
        }
      }
    }
    handleFlapping(relay) {
      this.debug(`Relay ${relay.url} is flapping`);
      let currentBackoff = this.backoffTimes.get(relay.url) || 5e3;
      currentBackoff = currentBackoff * 2;
      this.backoffTimes.set(relay.url, currentBackoff);
      this.debug(`Backoff time for ${relay.url} is ${currentBackoff}ms`);
      setTimeout(() => {
        this.debug(`Attempting to reconnect to ${relay.url}`);
        this.emit("relay:connecting", relay);
        relay.connect();
        this.checkOnFlappingRelays();
      }, currentBackoff);
      relay.disconnect();
      this.emit("flapping", relay);
    }
    size() {
      return this.relays.size;
    }
    /**
     * Returns the status of each relay in the pool.
     * @returns {NDKPoolStats} An object containing the number of relays in each status.
     */
    stats() {
      const stats = {
        total: 0,
        connected: 0,
        disconnected: 0,
        connecting: 0
      };
      for (const relay of this.relays.values()) {
        stats.total++;
        if (relay.status === 5) {
          stats.connected++;
        } else if (relay.status === 1) {
          stats.disconnected++;
        } else if (relay.status === 4) {
          stats.connecting++;
        }
      }
      return stats;
    }
    connectedRelays() {
      return Array.from(this.relays.values()).filter(
        (relay) => relay.status >= 5
        /* CONNECTED */
      );
    }
    permanentAndConnectedRelays() {
      return Array.from(this.relays.values()).filter(
        (relay) => relay.status >= 5 && !this.temporaryRelayTimers.has(relay.url)
      );
    }
    /**
     * Get a list of all relay urls in the pool.
     */
    urls() {
      return Array.from(this.relays.keys());
    }
  };
  function queryFullyFilled(subscription) {
    if (filterIncludesIds(subscription.filter)) {
      if (resultHasAllRequestedIds(subscription)) {
        return true;
      }
    }
    return false;
  }
  function filterIncludesIds(filter) {
    return !!filter["ids"];
  }
  function resultHasAllRequestedIds(subscription) {
    const ids = subscription.filter["ids"];
    return !!ids && ids.length === subscription.eventFirstSeen.size;
  }
  function filterFromId(id) {
    let decoded;
    if (id.match(NIP33_A_REGEX)) {
      const [kind, pubkey, identifier] = id.split(":");
      const filter = {
        authors: [pubkey],
        kinds: [parseInt(kind)]
      };
      if (identifier) {
        filter["#d"] = [identifier];
      }
      return filter;
    }
    if (id.match(BECH32_REGEX2)) {
      try {
        decoded = nip19_exports.decode(id);
        switch (decoded.type) {
          case "nevent": {
            const filter2 = { ids: [decoded.data.id] };
            if (decoded.data.author) filter2.authors = [decoded.data.author];
            if (decoded.data.kind) filter2.kinds = [decoded.data.kind];
            return filter2;
          }
          case "note":
            return { ids: [decoded.data] };
          case "naddr":
            const filter = {
              authors: [decoded.data.pubkey],
              kinds: [decoded.data.kind]
            };
            if (decoded.data.identifier) filter["#d"] = [decoded.data.identifier];
            return filter;
        }
      } catch (e) {
        console.error("Error decoding", id, e);
      }
    }
    return { ids: [id] };
  }
  function isNip33AValue(value) {
    return value.match(NIP33_A_REGEX) !== null;
  }
  var NIP33_A_REGEX = /^(\d+):([0-9A-Fa-f]+)(?::(.*))?$/;
  var BECH32_REGEX2 = /^n(event|ote|profile|pub|addr)1[\d\w]+$/;
  function relaysFromBech32(bech3222, ndk) {
    try {
      const decoded = nip19_exports.decode(bech3222);
      if (["naddr", "nevent"].includes(decoded?.type)) {
        const data = decoded.data;
        if (data?.relays) {
          return data.relays.map(
            (r) => new NDKRelay(r, ndk.relayAuthDefaultPolicy, ndk)
          );
        }
      }
    } catch (e) {
    }
    return [];
  }
  var defaultOpts = {
    closeOnEose: false,
    cacheUsage: "CACHE_FIRST",
    groupable: true,
    groupableDelay: 100,
    groupableDelayType: "at-most"
  };
  var NDKSubscription = class extends import_tseep4.EventEmitter {
    subId;
    filters;
    opts;
    pool;
    skipVerification = false;
    skipValidation = false;
    /**
     * Tracks the filters as they are executed on each relay
     */
    relayFilters;
    relaySet;
    ndk;
    debug;
    /**
     * Events that have been seen by the subscription, with the time they were first seen.
     */
    eventFirstSeen = /* @__PURE__ */ new Map();
    /**
     * Relays that have sent an EOSE.
     */
    eosesSeen = /* @__PURE__ */ new Set();
    /**
     * The time the last event was received by the subscription.
     * This is used to calculate when EOSE should be emitted.
     */
    lastEventReceivedAt;
    internalId;
    /**
     * Whether the subscription should close when all relays have reached the end of the event stream.
     */
    closeOnEose;
    /**
     * Pool monitor callback
     */
    poolMonitor;
    skipOptimisticPublishEvent = false;
    constructor(ndk, filters, opts, relaySet, subId) {
      super();
      this.ndk = ndk;
      this.pool = opts?.pool || ndk.pool;
      this.opts = { ...defaultOpts, ...opts || {} };
      this.filters = filters instanceof Array ? filters : [filters];
      this.subId = subId || opts?.subId;
      this.internalId = Math.random().toString(36).substring(7);
      this.relaySet = relaySet;
      this.debug = ndk.debug.extend(`subscription[${opts?.subId ?? this.internalId}]`);
      this.skipVerification = opts?.skipVerification || false;
      this.skipValidation = opts?.skipValidation || false;
      this.closeOnEose = opts?.closeOnEose || false;
      this.skipOptimisticPublishEvent = opts?.skipOptimisticPublishEvent || false;
      if (this.opts.cacheUsage === "ONLY_CACHE" && !this.opts.closeOnEose) {
        throw new Error("Cannot use cache-only options with a persistent subscription");
      }
    }
    /**
     * Returns the relays that have not yet sent an EOSE.
     */
    relaysMissingEose() {
      if (!this.relayFilters) return [];
      const relaysMissingEose = Array.from(this.relayFilters.keys()).filter(
        (url) => !this.eosesSeen.has(this.pool.getRelay(url, false, false))
      );
      return relaysMissingEose;
    }
    /**
     * Provides access to the first filter of the subscription for
     * backwards compatibility.
     */
    get filter() {
      return this.filters[0];
    }
    get groupableDelay() {
      if (!this.isGroupable()) return void 0;
      return this.opts?.groupableDelay;
    }
    get groupableDelayType() {
      return this.opts?.groupableDelayType || "at-most";
    }
    isGroupable() {
      return this.opts?.groupable || false;
    }
    shouldQueryCache() {
      return this.opts?.cacheUsage !== "ONLY_RELAY";
    }
    shouldQueryRelays() {
      return this.opts?.cacheUsage !== "ONLY_CACHE";
    }
    shouldWaitForCache() {
      return (
        // Must want to close on EOSE; subscriptions
        // that want to receive further updates must
        // always hit the relay
        this.opts.closeOnEose && // Cache adapter must claim to be fast
        !!this.ndk.cacheAdapter?.locking && // If explicitly told to run in parallel, then
        // we should not wait for the cache
        this.opts.cacheUsage !== "PARALLEL"
      );
    }
    /**
     * Start the subscription. This is the main method that should be called
     * after creating a subscription.
     */
    async start() {
      let cachePromise;
      if (this.shouldQueryCache()) {
        cachePromise = this.startWithCache();
        if (this.shouldWaitForCache()) {
          await cachePromise;
          if (queryFullyFilled(this)) {
            this.emit("eose", this);
            return;
          }
        }
      }
      if (this.shouldQueryRelays()) {
        this.startWithRelays();
        this.startPoolMonitor();
      } else {
        this.emit("eose", this);
      }
      return;
    }
    /**
     * We want to monitor for new relays that are coming online, in case
     * they should be part of this subscription.
     */
    startPoolMonitor() {
      const d4 = this.debug.extend("pool-monitor");
      this.poolMonitor = (relay) => {
        if (this.relayFilters?.has(relay.url)) return;
        const calc = calculateRelaySetsFromFilters(this.ndk, this.filters, this.pool);
        if (calc.get(relay.url)) {
          this.relayFilters?.set(relay.url, this.filters);
          relay.subscribe(this, this.filters);
        }
      };
      this.pool.on("relay:connect", this.poolMonitor);
    }
    onStopped;
    stop() {
      this.emit("close", this);
      this.poolMonitor && this.pool.off("relay:connect", this.poolMonitor);
      this.removeAllListeners();
      this.onStopped?.();
    }
    /**
     * @returns Whether the subscription has an authors filter.
     */
    hasAuthorsFilter() {
      return this.filters.some((f) => f.authors?.length);
    }
    async startWithCache() {
      if (this.ndk.cacheAdapter?.query) {
        const promise = this.ndk.cacheAdapter.query(this);
        if (this.ndk.cacheAdapter.locking) {
          await promise;
        }
      }
    }
    /**
     * Send REQ to relays
     */
    startWithRelays() {
      if (!this.relaySet || this.relaySet.relays.size === 0) {
        this.relayFilters = calculateRelaySetsFromFilters(this.ndk, this.filters, this.pool);
      } else {
        this.relayFilters = /* @__PURE__ */ new Map();
        for (const relay of this.relaySet.relays) {
          this.relayFilters.set(relay.url, this.filters);
        }
      }
      if (!this.relayFilters || this.relayFilters.size === 0) return;
      for (const [relayUrl, filters] of this.relayFilters) {
        const relay = this.pool.getRelay(relayUrl, true, true, filters);
        relay.subscribe(this, filters);
      }
    }
    // EVENT handling
    /**
     * Called when an event is received from a relay or the cache
     * @param event
     * @param relay
     * @param fromCache Whether the event was received from the cache
     * @param optimisticPublish Whether this event is coming from an optimistic publish
     */
    eventReceived(event, relay, fromCache = false, optimisticPublish = false) {
      const eventId = event.id;
      const eventAlreadySeen = this.eventFirstSeen.has(eventId);
      let ndkEvent;
      if (event instanceof NDKEvent) ndkEvent = event;
      if (!eventAlreadySeen) {
        ndkEvent ??= new NDKEvent(this.ndk, event);
        ndkEvent.ndk = this.ndk;
        ndkEvent.relay = relay;
        if (!fromCache && !optimisticPublish) {
          if (!this.skipValidation) {
            if (!ndkEvent.isValid) {
              this.debug(`Event failed validation %s from relay %s`, eventId, relay?.url);
              return;
            }
          }
          if (relay) {
            if (relay?.shouldValidateEvent() !== false) {
              if (!this.skipVerification) {
                if (!ndkEvent.verifySignature(true) && !this.ndk.asyncSigVerification) {
                  this.debug(`Event failed signature validation`, event);
                  return;
                } else if (relay) {
                  relay.addValidatedEvent();
                }
              }
            } else {
              relay.addNonValidatedEvent();
            }
          }
          if (this.ndk.cacheAdapter) {
            this.ndk.cacheAdapter.setEvent(ndkEvent, this.filters, relay);
          }
        }
        if (!fromCache && relay) {
          this.ndk.emit("event", ndkEvent, relay);
        }
        if (!optimisticPublish || this.skipOptimisticPublishEvent !== true) {
          this.emit("event", ndkEvent, relay, this);
          this.eventFirstSeen.set(eventId, Date.now());
        }
      } else {
        const timeSinceFirstSeen = Date.now() - (this.eventFirstSeen.get(eventId) || 0);
        this.emit("event:dup", eventId, relay, timeSinceFirstSeen, this);
        if (relay) {
          const signature = verifiedSignatures.get(eventId);
          if (signature && typeof signature === "string") {
            if (event.sig === signature) {
              relay.addValidatedEvent();
            }
          }
        }
      }
      this.lastEventReceivedAt = Date.now();
    }
    closedReceived(relay, reason) {
      this.emit("closed", relay, reason);
    }
    // EOSE handling
    eoseTimeout;
    eosed = false;
    eoseReceived(relay) {
      this.debug("EOSE received from %s", relay.url);
      this.eosesSeen.add(relay);
      let lastEventSeen = this.lastEventReceivedAt ? Date.now() - this.lastEventReceivedAt : void 0;
      const hasSeenAllEoses = this.eosesSeen.size === this.relayFilters?.size;
      const queryFilled = queryFullyFilled(this);
      const performEose = (reason) => {
        this.debug("Performing EOSE: %s %d", reason, this.eosed);
        if (this.eosed) return;
        if (this.eoseTimeout) clearTimeout(this.eoseTimeout);
        this.emit("eose", this);
        this.eosed = true;
      };
      if (queryFilled || hasSeenAllEoses) {
        performEose("query filled or seen all");
      } else if (this.relayFilters) {
        let timeToWaitForNextEose = 1e3;
        const connectedRelays = new Set(this.pool.connectedRelays().map((r) => r.url));
        const connectedRelaysWithFilters = Array.from(this.relayFilters.keys()).filter(
          (url) => connectedRelays.has(url)
        );
        if (connectedRelaysWithFilters.length === 0) {
          return;
        }
        const percentageOfRelaysThatHaveSentEose = this.eosesSeen.size / connectedRelaysWithFilters.length;
        this.debug("Percentage of relays that have sent EOSE", { subId: this.subId, percentageOfRelaysThatHaveSentEose, seen: this.eosesSeen.size, total: connectedRelaysWithFilters.length });
        if (this.eosesSeen.size >= 2 && percentageOfRelaysThatHaveSentEose >= 0.5) {
          timeToWaitForNextEose = timeToWaitForNextEose * (1 - percentageOfRelaysThatHaveSentEose);
          if (timeToWaitForNextEose === 0) {
            performEose("time to wait was 0");
            return;
          }
          if (this.eoseTimeout) clearTimeout(this.eoseTimeout);
          const sendEoseTimeout = () => {
            lastEventSeen = this.lastEventReceivedAt ? Date.now() - this.lastEventReceivedAt : void 0;
            if (lastEventSeen !== void 0 && lastEventSeen < 20) {
              this.eoseTimeout = setTimeout(sendEoseTimeout, timeToWaitForNextEose);
            } else {
              performEose("send eose timeout: " + timeToWaitForNextEose);
            }
          };
          this.eoseTimeout = setTimeout(sendEoseTimeout, timeToWaitForNextEose);
        }
      }
    }
  };
  async function follows(opts, outbox, kind = 3) {
    if (!this.ndk) throw new Error("NDK not set");
    const contactListEvent = await this.ndk.fetchEvent(
      { kinds: [kind], authors: [this.pubkey] },
      opts || { groupable: false }
    );
    if (contactListEvent) {
      const pubkeys = /* @__PURE__ */ new Set();
      contactListEvent.tags.forEach((tag) => {
        if (tag[0] === "p") pubkeys.add(tag[1]);
      });
      if (outbox) {
        this.ndk?.outboxTracker?.trackUsers(Array.from(pubkeys));
      }
      return [...pubkeys].reduce((acc, pubkey) => {
        const user = new NDKUser({ pubkey });
        user.ndk = this.ndk;
        acc.add(user);
        return acc;
      }, /* @__PURE__ */ new Set());
    }
    return /* @__PURE__ */ new Set();
  }
  function profileFromEvent(event) {
    const profile = {};
    let payload;
    try {
      payload = JSON.parse(event.content);
    } catch (error) {
      throw new Error(`Failed to parse profile event: ${error}`);
    }
    profile.created_at = event.created_at;
    profile.profileEvent = JSON.stringify(event.rawEvent());
    Object.keys(payload).forEach((key) => {
      switch (key) {
        case "name":
          profile.name = payload.name;
          break;
        case "display_name":
          profile.displayName = payload.display_name;
          break;
        case "image":
        case "picture":
          profile.image = payload.picture || payload.image;
          break;
        case "banner":
          profile.banner = payload.banner;
          break;
        case "bio":
          profile.bio = payload.bio;
          break;
        case "nip05":
          profile.nip05 = payload.nip05;
          break;
        case "lud06":
          profile.lud06 = payload.lud06;
          break;
        case "lud16":
          profile.lud16 = payload.lud16;
          break;
        case "about":
          profile.about = payload.about;
          break;
        case "zapService":
          profile.zapService = payload.zapService;
          break;
        case "website":
          profile.website = payload.website;
          break;
        default:
          profile[key] = payload[key];
          break;
      }
    });
    return profile;
  }
  function serializeProfile(profile) {
    const payload = {};
    for (const [key, val] of Object.entries(profile)) {
      switch (key) {
        case "username":
        case "name":
          payload.name = val;
          break;
        case "displayName":
          payload.display_name = val;
          break;
        case "image":
        case "picture":
          payload.picture = val;
          break;
        case "bio":
        case "about":
          payload.about = val;
          break;
        default:
          payload[key] = val;
          break;
      }
    }
    return JSON.stringify(payload);
  }
  var NIP05_REGEX2 = /^(?:([\w.+-]+)@)?([\w.-]+)$/;
  async function getNip05For(ndk, fullname, _fetch5 = fetch, fetchOpts = {}) {
    return await ndk.queuesNip05.add({
      id: fullname,
      func: async () => {
        if (ndk.cacheAdapter && ndk.cacheAdapter.loadNip05) {
          const profile = await ndk.cacheAdapter.loadNip05(fullname);
          if (profile !== "missing") {
            if (profile) {
              const user = new NDKUser({
                pubkey: profile.pubkey,
                relayUrls: profile.relays,
                nip46Urls: profile.nip46
              });
              user.ndk = ndk;
              return user;
            } else if (fetchOpts.cache !== "no-cache") {
              return null;
            }
          }
        }
        const match = fullname.match(NIP05_REGEX2);
        if (!match) return null;
        const [_, name = "_", domain] = match;
        try {
          const res = await _fetch5(
            `https://${domain}/.well-known/nostr.json?name=${name}`,
            fetchOpts
          );
          const { names, relays, nip46 } = parseNIP05Result(await res.json());
          const pubkey = names[name.toLowerCase()];
          let profile = null;
          if (pubkey) {
            profile = { pubkey, relays: relays?.[pubkey], nip46: nip46?.[pubkey] };
          }
          if (ndk?.cacheAdapter && ndk.cacheAdapter.saveNip05) {
            ndk.cacheAdapter.saveNip05(fullname, profile);
          }
          return profile;
        } catch (_e) {
          if (ndk?.cacheAdapter && ndk.cacheAdapter.saveNip05) {
            ndk?.cacheAdapter.saveNip05(fullname, null);
          }
          console.error("Failed to fetch NIP05 for", fullname, _e);
          return null;
        }
      }
    });
  }
  function parseNIP05Result(json) {
    const result = {
      names: {}
    };
    for (const [name, pubkey] of Object.entries(json.names)) {
      if (typeof name === "string" && typeof pubkey === "string") {
        result.names[name.toLowerCase()] = pubkey;
      }
    }
    if (json.relays) {
      result.relays = {};
      for (const [pubkey, relays] of Object.entries(json.relays)) {
        if (typeof pubkey === "string" && Array.isArray(relays)) {
          result.relays[pubkey] = relays.filter(
            (relay) => typeof relay === "string"
          );
        }
      }
    }
    if (json.nip46) {
      result.nip46 = {};
      for (const [pubkey, nip46] of Object.entries(json.nip46)) {
        if (typeof pubkey === "string" && Array.isArray(nip46)) {
          result.nip46[pubkey] = nip46.filter((relay) => typeof relay === "string");
        }
      }
    }
    return result;
  }
  var NDKCashuMintList = class _NDKCashuMintList extends NDKEvent {
    static kind = 10019;
    static kinds = [
      10019
      /* CashuMintList */
    ];
    _p2pk;
    constructor(ndk, event) {
      super(ndk, event);
      this.kind ??= 10019;
    }
    static from(event) {
      return new _NDKCashuMintList(event.ndk, event);
    }
    set relays(urls) {
      this.tags = this.tags.filter((t) => t[0] !== "relay");
      for (const url of urls) {
        this.tags.push(["relay", url]);
      }
    }
    get relays() {
      const r = [];
      for (const tag of this.tags) {
        if (tag[0] === "relay") {
          r.push(tag[1]);
        }
      }
      return r;
    }
    set mints(urls) {
      this.tags = this.tags.filter((t) => t[0] !== "mint");
      for (const url of urls) {
        this.tags.push(["mint", url]);
      }
    }
    get mints() {
      const r = [];
      for (const tag of this.tags) {
        if (tag[0] === "mint") {
          r.push(tag[1]);
        }
      }
      return Array.from(new Set(r));
    }
    get p2pk() {
      if (this._p2pk) {
        return this._p2pk;
      }
      this._p2pk = this.tagValue("pubkey") ?? this.pubkey;
      return this._p2pk;
    }
    set p2pk(pubkey) {
      this._p2pk = pubkey;
      this.removeTag("pubkey");
      if (pubkey) {
        this.tags.push(["pubkey", pubkey]);
      }
    }
    get relaySet() {
      return NDKRelaySet.fromRelayUrls(this.relays, this.ndk);
    }
  };
  var d2 = (0, import_debug3.default)("ndk:zapper:ln");
  async function getNip57ZapSpecFromLud({ lud06, lud16 }, ndk) {
    let zapEndpoint;
    if (lud16 && !lud16.startsWith("LNURL")) {
      const [name, domain] = lud16.split("@");
      zapEndpoint = `https://${domain}/.well-known/lnurlp/${name}`;
    } else if (lud06) {
      const { words } = bech322.decode(lud06, 1e3);
      const data = bech322.fromWords(words);
      const utf8Decoder2 = new TextDecoder("utf-8");
      zapEndpoint = utf8Decoder2.decode(data);
    }
    if (!zapEndpoint) {
      d2("No zap endpoint found %o", { lud06, lud16 });
      throw new Error("No zap endpoint found");
    }
    try {
      const _fetch5 = ndk.httpFetch || fetch;
      const response = await _fetch5(zapEndpoint);
      if (response.status !== 200) {
        const text = await response.text();
        throw new Error(`Unable to fetch zap endpoint ${zapEndpoint}: ${text}`);
      }
      return await response.json();
    } catch (e) {
      throw new Error(`Unable to fetch zap endpoint ${zapEndpoint}: ${e}`);
    }
  }
  var NDKUser = class _NDKUser {
    ndk;
    profile;
    _npub;
    _pubkey;
    relayUrls = [];
    nip46Urls = [];
    constructor(opts) {
      if (opts.npub) this._npub = opts.npub;
      if (opts.hexpubkey) this._pubkey = opts.hexpubkey;
      if (opts.pubkey) this._pubkey = opts.pubkey;
      if (opts.relayUrls) this.relayUrls = opts.relayUrls;
      if (opts.nip46Urls) this.nip46Urls = opts.nip46Urls;
    }
    get npub() {
      if (!this._npub) {
        if (!this._pubkey) throw new Error("pubkey not set");
        this._npub = nip19_exports.npubEncode(this.pubkey);
      }
      return this._npub;
    }
    get nprofile() {
      console.log("encoding with pubkey", this.pubkey);
      return nip19_exports.nprofileEncode({
        pubkey: this.pubkey
      });
    }
    set npub(npub) {
      this._npub = npub;
    }
    /**
     * Get the user's hexpubkey
     * @returns {Hexpubkey} The user's hexpubkey
     *
     * @deprecated Use `pubkey` instead
     */
    get hexpubkey() {
      return this.pubkey;
    }
    /**
     * Set the user's hexpubkey
     * @param pubkey {Hexpubkey} The user's hexpubkey
     * @deprecated Use `pubkey` instead
     */
    set hexpubkey(pubkey) {
      this._pubkey = pubkey;
    }
    /**
     * Get the user's pubkey
     * @returns {string} The user's pubkey
     */
    get pubkey() {
      if (!this._pubkey) {
        if (!this._npub) throw new Error("npub not set");
        this._pubkey = nip19_exports.decode(this.npub).data;
      }
      return this._pubkey;
    }
    /**
     * Set the user's pubkey
     * @param pubkey {string} The user's pubkey
     */
    set pubkey(pubkey) {
      this._pubkey = pubkey;
    }
    /**
     * Gets NIP-57 and NIP-61 information that this user has signaled
     *
     * @param getAll {boolean} Whether to get all zap info or just the first one
     */
    async getZapInfo(getAll = true, methods = ["nip61", "nip57"]) {
      if (!this.ndk) throw new Error("No NDK instance found");
      const kinds = [];
      if (methods.includes("nip61")) kinds.push(
        10019
        /* CashuMintList */
      );
      if (methods.includes("nip57")) kinds.push(
        0
        /* Metadata */
      );
      if (kinds.length === 0) return [];
      let events = await this.ndk.fetchEvents(
        { kinds, authors: [this.pubkey] },
        {
          cacheUsage: "ONLY_CACHE",
          groupable: false
        }
      );
      if (events.size < methods.length) {
        events = await this.ndk.fetchEvents(
          { kinds, authors: [this.pubkey] },
          {
            cacheUsage: "ONLY_RELAY"
            /* ONLY_RELAY */
          }
        );
      }
      const res = [];
      const nip61 = Array.from(events).find(
        (e) => e.kind === 10019
        /* CashuMintList */
      );
      const nip572 = Array.from(events).find(
        (e) => e.kind === 0
        /* Metadata */
      );
      if (nip61) {
        const mintList = NDKCashuMintList.from(nip61);
        if (mintList.mints.length > 0) {
          res.push({
            type: "nip61",
            data: {
              mints: mintList.mints,
              relays: mintList.relays,
              p2pk: mintList.p2pk
            }
          });
        }
        if (!getAll) return res;
      }
      if (nip572) {
        const profile = profileFromEvent(nip572);
        const { lud06, lud16 } = profile;
        try {
          const zapSpec = await getNip57ZapSpecFromLud({ lud06, lud16 }, this.ndk);
          if (zapSpec) {
            res.push({ type: "nip57", data: zapSpec });
          }
        } catch (e) {
          console.error("Error getting NIP-57 zap spec", e);
        }
      }
      return res;
    }
    /**
     * Determines whether this user
     * has signaled support for NIP-60 zaps
     **/
    // export type UserZapConfiguration = {
    // }
    // async getRecipientZapConfig(): Promise<> {
    // }
    /**
     * Retrieves the zapper this pubkey has designated as an issuer of zap receipts
     */
    async getZapConfiguration(ndk) {
      ndk ??= this.ndk;
      if (!ndk) throw new Error("No NDK instance found");
      const process2 = async () => {
        if (this.ndk?.cacheAdapter?.loadUsersLNURLDoc) {
          const doc = await this.ndk.cacheAdapter.loadUsersLNURLDoc(this.pubkey);
          if (doc !== "missing") {
            if (doc === null) return;
            if (doc) return doc;
          }
        }
        let lnurlspec;
        try {
          await this.fetchProfile({ groupable: false });
          if (this.profile) {
            const { lud06, lud16 } = this.profile;
            lnurlspec = await getNip57ZapSpecFromLud({ lud06, lud16 }, ndk);
          }
        } catch {
        }
        if (this.ndk?.cacheAdapter?.saveUsersLNURLDoc) {
          this.ndk.cacheAdapter.saveUsersLNURLDoc(this.pubkey, lnurlspec || null);
        }
        if (!lnurlspec) return;
        return lnurlspec;
      };
      return await ndk.queuesZapConfig.add({
        id: this.pubkey,
        func: process2
      });
    }
    /**
     * Fetches the zapper's pubkey for the zapped user
     * @returns The zapper's pubkey if one can be found
     */
    async getZapperPubkey() {
      const zapConfig = await this.getZapConfiguration();
      return zapConfig?.nostrPubkey;
    }
    /**
     * Instantiate an NDKUser from a NIP-05 string
     * @param nip05Id {string} The user's NIP-05
     * @param ndk {NDK} An NDK instance
     * @param skipCache {boolean} Whether to skip the cache or not
     * @returns {NDKUser | undefined} An NDKUser if one is found for the given NIP-05, undefined otherwise.
     */
    static async fromNip05(nip05Id, ndk, skipCache = false) {
      if (!ndk) throw new Error("No NDK instance found");
      const opts = {};
      if (skipCache) opts.cache = "no-cache";
      const profile = await getNip05For(ndk, nip05Id, ndk?.httpFetch, opts);
      if (profile) {
        const user = new _NDKUser({
          pubkey: profile.pubkey,
          relayUrls: profile.relays,
          nip46Urls: profile.nip46
        });
        user.ndk = ndk;
        return user;
      }
    }
    /**
     * Fetch a user's profile
     * @param opts {NDKSubscriptionOptions} A set of NDKSubscriptionOptions
     * @param storeProfileEvent {boolean} Whether to store the profile event or not
     * @returns User Profile
     */
    async fetchProfile(opts, storeProfileEvent = false) {
      if (!this.ndk) throw new Error("NDK not set");
      if (!this.profile) this.profile = {};
      let setMetadataEvents = null;
      if (this.ndk.cacheAdapter && this.ndk.cacheAdapter.fetchProfile && opts?.cacheUsage !== "ONLY_RELAY") {
        const profile = await this.ndk.cacheAdapter.fetchProfile(this.pubkey);
        if (profile) {
          this.profile = profile;
          return profile;
        }
      }
      if (!opts && // if no options have been set
      this.ndk.cacheAdapter && // and we have a cache
      this.ndk.cacheAdapter.locking) {
        setMetadataEvents = await this.ndk.fetchEvents(
          {
            kinds: [0],
            authors: [this.pubkey]
          },
          {
            cacheUsage: "ONLY_CACHE",
            closeOnEose: true,
            groupable: false
          }
        );
        opts = {
          cacheUsage: "ONLY_RELAY",
          closeOnEose: true,
          groupable: true,
          groupableDelay: 250
        };
      }
      if (!setMetadataEvents || setMetadataEvents.size === 0) {
        setMetadataEvents = await this.ndk.fetchEvents(
          {
            kinds: [0],
            authors: [this.pubkey]
          },
          opts
        );
      }
      const sortedSetMetadataEvents = Array.from(setMetadataEvents).sort(
        (a, b) => a.created_at - b.created_at
      );
      if (sortedSetMetadataEvents.length === 0) return null;
      const event = sortedSetMetadataEvents[0];
      this.profile = profileFromEvent(event);
      if (storeProfileEvent) {
        this.profile.profileEvent = JSON.stringify(event);
      }
      if (this.profile && this.ndk.cacheAdapter && this.ndk.cacheAdapter.saveProfile) {
        this.ndk.cacheAdapter.saveProfile(this.pubkey, this.profile);
      }
      return this.profile;
    }
    /**
     * Returns a set of users that this user follows.
     * 
     * @deprecated Use followSet instead
     */
    follows = follows.bind(this);
    /**
     * Returns a set of pubkeys that this user follows.
     * 
     * @param opts - NDKSubscriptionOptions
     * @param outbox - boolean
     * @param kind - number
     */
    async followSet(opts, outbox, kind = 3) {
      const follows2 = await this.follows(opts, outbox, kind);
      return new Set(Array.from(follows2).map((f) => f.pubkey));
    }
    /** @deprecated Use referenceTags instead. */
    /**
     * Get the tag that can be used to reference this user in an event
     * @returns {NDKTag} an NDKTag
     */
    tagReference() {
      return ["p", this.pubkey];
    }
    /**
     * Get the tags that can be used to reference this user in an event
     * @returns {NDKTag[]} an array of NDKTag
     */
    referenceTags(marker) {
      const tag = [["p", this.pubkey]];
      if (!marker) return tag;
      tag[0].push("", marker);
      return tag;
    }
    /**
     * Publishes the current profile.
     */
    async publish() {
      if (!this.ndk) throw new Error("No NDK instance found");
      if (!this.profile) throw new Error("No profile available");
      this.ndk.assertSigner();
      const event = new NDKEvent(this.ndk, {
        kind: 0,
        content: serializeProfile(this.profile)
      });
      await event.publish();
    }
    /**
     * Add a follow to this user's contact list
     *
     * @param newFollow {NDKUser} The user to follow
     * @param currentFollowList {Set<NDKUser>} The current follow list
     * @param kind {NDKKind} The kind to use for this contact list (defaults to `3`)
     * @returns {Promise<boolean>} True if the follow was added, false if the follow already exists
     */
    async follow(newFollow, currentFollowList, kind = 3) {
      if (!this.ndk) throw new Error("No NDK instance found");
      this.ndk.assertSigner();
      if (!currentFollowList) {
        currentFollowList = await this.follows(void 0, void 0, kind);
      }
      if (currentFollowList.has(newFollow)) {
        return false;
      }
      currentFollowList.add(newFollow);
      const event = new NDKEvent(this.ndk, { kind });
      for (const follow of currentFollowList) {
        event.tag(follow);
      }
      await event.publish();
      return true;
    }
    /**
     * Remove a follow from this user's contact list
     *
     * @param user {NDKUser} The user to unfollow
     * @param currentFollowList {Set<NDKUser>} The current follow list
     * @param kind {NDKKind} The kind to use for this contact list (defaults to `3`)
     * @returns The relays were the follow list was published or false if the user wasn't found
     */
    async unfollow(user, currentFollowList, kind = 3) {
      if (!this.ndk) throw new Error("No NDK instance found");
      this.ndk.assertSigner();
      if (!currentFollowList) {
        currentFollowList = await this.follows(void 0, void 0, kind);
      }
      const newUserFollowList = /* @__PURE__ */ new Set();
      let foundUser = false;
      for (const follow of currentFollowList) {
        if (follow.pubkey !== user.pubkey) {
          newUserFollowList.add(follow);
        } else {
          foundUser = true;
        }
      }
      if (!foundUser) return false;
      const event = new NDKEvent(this.ndk, { kind });
      for (const follow of newUserFollowList) {
        event.tag(follow);
      }
      return await event.publish();
    }
    /**
     * Validate a user's NIP-05 identifier (usually fetched from their kind:0 profile data)
     *
     * @param nip05Id The NIP-05 string to validate
     * @returns {Promise<boolean | null>} True if the NIP-05 is found and matches this user's pubkey,
     * False if the NIP-05 is found but doesn't match this user's pubkey,
     * null if the NIP-05 isn't found on the domain or we're unable to verify (because of network issues, etc.)
     */
    async validateNip05(nip05Id) {
      if (!this.ndk) throw new Error("No NDK instance found");
      const profilePointer = await getNip05For(this.ndk, nip05Id);
      if (profilePointer === null) return null;
      return profilePointer.pubkey === this.pubkey;
    }
  };
  var NDKList = class _NDKList extends NDKEvent {
    _encryptedTags;
    /**
     * Stores the number of bytes the content was before decryption
     * to expire the cache when the content changes.
     */
    encryptedTagsLength;
    constructor(ndk, rawEvent) {
      super(ndk, rawEvent);
      this.kind ??= 30001;
    }
    /**
     * Wrap a NDKEvent into a NDKList
     */
    static from(ndkEvent) {
      return new _NDKList(ndkEvent.ndk, ndkEvent);
    }
    /**
     * Returns the title of the list. Falls back on fetching the name tag value.
     */
    get title() {
      const titleTag = this.tagValue("title") || this.tagValue("name");
      if (titleTag) return titleTag;
      if (this.kind === 3) {
        return "Contacts";
      } else if (this.kind === 1e4) {
        return "Mute";
      } else if (this.kind === 10001) {
        return "Pinned Notes";
      } else if (this.kind === 10002) {
        return "Relay Metadata";
      } else if (this.kind === 10003) {
        return "Bookmarks";
      } else if (this.kind === 10004) {
        return "Communities";
      } else if (this.kind === 10005) {
        return "Public Chats";
      } else if (this.kind === 10006) {
        return "Blocked Relays";
      } else if (this.kind === 10007) {
        return "Search Relays";
      } else if (this.kind === 10050) {
        return "Direct Message Receive Relays";
      } else if (this.kind === 10015) {
        return "Interests";
      } else if (this.kind === 10030) {
        return "Emojis";
      } else {
        return this.tagValue("d");
      }
    }
    /**
     * Sets the title of the list.
     */
    set title(title) {
      this.removeTag(["title", "name"]);
      if (title) this.tags.push(["title", title]);
    }
    /**
     * Returns the name of the list.
     * @deprecated Please use "title" instead.
     */
    get name() {
      return this.title;
    }
    /**
     * Sets the name of the list.
     * @deprecated Please use "title" instead. This method will use the `title` tag instead.
     */
    set name(name) {
      this.title = name;
    }
    /**
     * Returns the description of the list.
     */
    get description() {
      return this.tagValue("description");
    }
    /**
     * Sets the description of the list.
     */
    set description(name) {
      this.removeTag("description");
      if (name) this.tags.push(["description", name]);
    }
    /**
     * Returns the image of the list.
     */
    get image() {
      return this.tagValue("image");
    }
    /**
     * Sets the image of the list.
     */
    set image(name) {
      this.removeTag("image");
      if (name) this.tags.push(["image", name]);
    }
    isEncryptedTagsCacheValid() {
      return !!(this._encryptedTags && this.encryptedTagsLength === this.content.length);
    }
    /**
     * Returns the decrypted content of the list.
     */
    async encryptedTags(useCache = true) {
      if (useCache && this.isEncryptedTagsCacheValid()) return this._encryptedTags;
      if (!this.ndk) throw new Error("NDK instance not set");
      if (!this.ndk.signer) throw new Error("NDK signer not set");
      const user = await this.ndk.signer.user();
      try {
        if (this.content.length > 0) {
          try {
            const decryptedContent = await this.ndk.signer.decrypt(user, this.content);
            const a = JSON.parse(decryptedContent);
            if (a && a[0]) {
              this.encryptedTagsLength = this.content.length;
              return this._encryptedTags = a;
            }
            this.encryptedTagsLength = this.content.length;
            return this._encryptedTags = [];
          } catch (e) {
            console.log(`error decrypting ${this.content}`);
          }
        }
      } catch (e) {
      }
      return [];
    }
    /**
     * This method can be overriden to validate that a tag is valid for this list.
     *
     * (i.e. the NDKPersonList can validate that items are NDKUser instances)
     */
    validateTag(tagValue) {
      return true;
    }
    getItems(type) {
      return this.tags.filter((tag) => tag[0] === type);
    }
    /**
     * Returns the unecrypted items in this list.
     */
    get items() {
      return this.tags.filter((t) => {
        return ![
          "d",
          "L",
          "l",
          "title",
          "name",
          "description",
          "published_at",
          "summary",
          "image",
          "thumb",
          "alt",
          "expiration",
          "subject",
          "client"
        ].includes(t[0]);
      });
    }
    /**
     * Adds a new item to the list.
     * @param relay Relay to add
     * @param mark Optional mark to add to the item
     * @param encrypted Whether to encrypt the item
     * @param position Where to add the item in the list (top or bottom)
     */
    async addItem(item, mark = void 0, encrypted = false, position = "bottom") {
      if (!this.ndk) throw new Error("NDK instance not set");
      if (!this.ndk.signer) throw new Error("NDK signer not set");
      let tags;
      if (item instanceof NDKEvent) {
        tags = [item.tagReference(mark)];
      } else if (item instanceof NDKUser) {
        tags = item.referenceTags();
      } else if (item instanceof NDKRelay) {
        tags = item.referenceTags();
      } else if (Array.isArray(item)) {
        tags = [item];
      } else {
        throw new Error("Invalid object type");
      }
      if (mark) tags[0].push(mark);
      if (encrypted) {
        const user = await this.ndk.signer.user();
        const currentList = await this.encryptedTags();
        if (position === "top") currentList.unshift(...tags);
        else currentList.push(...tags);
        this._encryptedTags = currentList;
        this.encryptedTagsLength = this.content.length;
        this.content = JSON.stringify(currentList);
        await this.encrypt(user);
      } else {
        if (position === "top") this.tags.unshift(...tags);
        else this.tags.push(...tags);
      }
      this.created_at = Math.floor(Date.now() / 1e3);
      this.emit("change");
    }
    /**
     * Removes an item from the list from both the encrypted and unencrypted lists.
     * @param value value of item to remove from the list
     * @param publish whether to publish the change
     * @returns
     */
    async removeItemByValue(value, publish = true) {
      if (!this.ndk) throw new Error("NDK instance not set");
      if (!this.ndk.signer) throw new Error("NDK signer not set");
      const index = this.tags.findIndex((tag) => tag[1] === value);
      if (index >= 0) {
        this.tags.splice(index, 1);
      }
      const user = await this.ndk.signer.user();
      const encryptedTags = await this.encryptedTags();
      const encryptedIndex = encryptedTags.findIndex((tag) => tag[1] === value);
      if (encryptedIndex >= 0) {
        encryptedTags.splice(encryptedIndex, 1);
        this._encryptedTags = encryptedTags;
        this.encryptedTagsLength = this.content.length;
        this.content = JSON.stringify(encryptedTags);
        await this.encrypt(user);
      }
      if (publish) {
        return this.publishReplaceable();
      } else {
        this.created_at = Math.floor(Date.now() / 1e3);
      }
      this.emit("change");
    }
    /**
     * Removes an item from the list.
     *
     * @param index The index of the item to remove.
     * @param encrypted Whether to remove from the encrypted list or not.
     */
    async removeItem(index, encrypted) {
      if (!this.ndk) throw new Error("NDK instance not set");
      if (!this.ndk.signer) throw new Error("NDK signer not set");
      if (encrypted) {
        const user = await this.ndk.signer.user();
        const currentList = await this.encryptedTags();
        currentList.splice(index, 1);
        this._encryptedTags = currentList;
        this.encryptedTagsLength = this.content.length;
        this.content = JSON.stringify(currentList);
        await this.encrypt(user);
      } else {
        this.tags.splice(index, 1);
      }
      this.created_at = Math.floor(Date.now() / 1e3);
      this.emit("change");
      return this;
    }
    has(item) {
      return this.items.some((tag) => tag[1] === item);
    }
    /**
     * Creates a filter that will result in fetching
     * the items of this list
     * @example
     * const list = new NDKList(...);
     * const filters = list.filterForItems();
     * const events = await ndk.fetchEvents(filters);
     */
    filterForItems() {
      const ids = /* @__PURE__ */ new Set();
      const nip33Queries = /* @__PURE__ */ new Map();
      const filters = [];
      for (const tag of this.items) {
        if (tag[0] === "e" && tag[1]) {
          ids.add(tag[1]);
        } else if (tag[0] === "a" && tag[1]) {
          const [kind, pubkey, dTag] = tag[1].split(":");
          if (!kind || !pubkey) continue;
          const key = `${kind}:${pubkey}`;
          const item = nip33Queries.get(key) || [];
          item.push(dTag || "");
          nip33Queries.set(key, item);
        }
      }
      if (ids.size > 0) {
        filters.push({ ids: Array.from(ids) });
      }
      if (nip33Queries.size > 0) {
        for (const [key, values] of nip33Queries.entries()) {
          const [kind, pubkey] = key.split(":");
          filters.push({
            kinds: [parseInt(kind)],
            authors: [pubkey],
            "#d": values
          });
        }
      }
      return filters;
    }
  };
  var lists_default = NDKList;
  var READ_MARKER = "read";
  var WRITE_MARKER = "write";
  var NDKRelayList = class _NDKRelayList extends NDKEvent {
    constructor(ndk, rawEvent) {
      super(ndk, rawEvent);
      this.kind ??= 10002;
    }
    static from(ndkEvent) {
      return new _NDKRelayList(ndkEvent.ndk, ndkEvent.rawEvent());
    }
    get readRelayUrls() {
      return this.tags.filter((tag) => tag[0] === "r" || tag[0] === "relay").filter((tag) => !tag[2] || tag[2] && tag[2] === READ_MARKER).map((tag) => tryNormalizeRelayUrl(tag[1])).filter((url) => !!url);
    }
    set readRelayUrls(relays) {
      for (const relay of relays) {
        this.tags.push(["r", relay, READ_MARKER]);
      }
    }
    get writeRelayUrls() {
      return this.tags.filter((tag) => tag[0] === "r" || tag[0] === "relay").filter((tag) => !tag[2] || tag[2] && tag[2] === WRITE_MARKER).map((tag) => tryNormalizeRelayUrl(tag[1])).filter((url) => !!url);
    }
    set writeRelayUrls(relays) {
      for (const relay of relays) {
        this.tags.push(["r", relay, WRITE_MARKER]);
      }
    }
    get bothRelayUrls() {
      return this.tags.filter((tag) => tag[0] === "r" || tag[0] === "relay").filter((tag) => !tag[2]).map((tag) => tag[1]);
    }
    set bothRelayUrls(relays) {
      for (const relay of relays) {
        this.tags.push(["r", relay]);
      }
    }
    get relays() {
      return this.tags.filter((tag) => tag[0] === "r" || tag[0] === "relay").map((tag) => tag[1]);
    }
    /**
     * Provides a relaySet for the relays in this list.
     */
    get relaySet() {
      if (!this.ndk) throw new Error("NDKRelayList has no NDK instance");
      return new NDKRelaySet(
        new Set(this.relays.map((u) => this.ndk.pool.getRelay(u))),
        this.ndk
      );
    }
  };
  function relayListFromKind3(ndk, contactList) {
    try {
      const content = JSON.parse(contactList.content);
      const relayList = new NDKRelayList(ndk);
      const readRelays = /* @__PURE__ */ new Set();
      const writeRelays = /* @__PURE__ */ new Set();
      for (let [key, config] of Object.entries(content)) {
        try {
          key = normalizeRelayUrl(key);
        } catch {
          continue;
        }
        if (!config) {
          readRelays.add(key);
          writeRelays.add(key);
        } else {
          const relayConfig = config;
          if (relayConfig.write) writeRelays.add(key);
          if (relayConfig.read) readRelays.add(key);
        }
      }
      relayList.readRelayUrls = Array.from(readRelays);
      relayList.writeRelayUrls = Array.from(writeRelays);
      return relayList;
    } catch {
    }
    return void 0;
  }
  var NDKNutzap = class _NDKNutzap extends NDKEvent {
    debug;
    _proofs = [];
    static kind = 9321;
    static kinds = [_NDKNutzap.kind];
    constructor(ndk, event) {
      super(ndk, event);
      this.kind ??= 9321;
      this.debug = ndk?.debug.extend("nutzap") ?? (0, import_debug6.default)("ndk:nutzap");
      if (!this.alt) this.alt = "This is a nutzap";
    }
    static from(event) {
      const e = new this(event.ndk, event);
      try {
        const proofTags = e.getMatchingTags("proof");
        if (proofTags.length) {
          e._proofs = proofTags.map((tag) => JSON.parse(tag[1]));
        } else {
          e._proofs = JSON.parse(e.content);
        }
      } catch {
        return;
      }
      if (!e._proofs || !e._proofs.length) return;
      return e;
    }
    set comment(comment) {
      this.content = comment ?? "";
    }
    get comment() {
      const c = this.tagValue("comment");
      if (c) return c;
      return this.content;
    }
    set proofs(proofs) {
      this._proofs = proofs;
      this.tags = this.tags.filter((tag) => tag[0] !== "proof");
      for (const proof of proofs) {
        this.tags.push(["proof", JSON.stringify(proof)]);
      }
      this.removeTag("amount");
      this.tags.push(["amount", this.amount.toString()]);
    }
    get proofs() {
      return this._proofs;
    }
    /**
     * Gets the p2pk pubkey that is embedded in the first proof
     */
    get p2pk() {
      const firstProof = this.proofs[0];
      try {
        const secret = JSON.parse(firstProof.secret);
        let payload = {};
        if (typeof secret === "string") {
          payload = JSON.parse(secret);
          this.debug("stringified payload", firstProof.secret);
        } else if (typeof secret === "object") {
          payload = secret;
        }
        const isP2PKLocked = payload[0] === "P2PK" && payload[1]?.data;
        if (isP2PKLocked) {
          const paddedp2pk = payload[1].data;
          const p2pk = paddedp2pk.slice(2, -1);
          if (p2pk) return p2pk;
        }
      } catch (e) {
        this.debug("error parsing p2pk pubkey", e, this.proofs[0]);
      }
    }
    /**
     * Get the mint where this nutzap proofs exist
     */
    get mint() {
      return this.tagValue("u");
    }
    set mint(value) {
      this.removeTag("u");
      this.tag(["u", value]);
    }
    get unit() {
      return this.tagValue("unit") ?? "msat";
    }
    set unit(value) {
      this.removeTag("unit");
      if (value) this.tag(["unit", value]);
    }
    get amount() {
      const count = this.proofs.reduce((total, proof) => total + proof.amount, 0);
      return count * 1e3;
    }
    sender = this.author;
    /**
     * Set the target of the nutzap
     * @param target The target of the nutzap (a user or an event)
     */
    set target(target) {
      this.tags = this.tags.filter((t) => t[0] !== "p");
      if (target instanceof NDKEvent) {
        this.tags.push(target.tagReference());
      }
    }
    set recipientPubkey(pubkey) {
      this.removeTag("p");
      this.tag(["p", pubkey]);
    }
    get recipientPubkey() {
      return this.tagValue("p");
    }
    get recipient() {
      const pubkey = this.recipientPubkey;
      if (this.ndk) return this.ndk.getUser({ pubkey });
      return new NDKUser({ pubkey });
    }
    /**
     * Validates that the nutzap conforms to NIP-61
     */
    get isValid() {
      let pTagCount = 0;
      let mintTagCount = 0;
      for (const tag of this.tags) {
        if (tag[0] === "p") pTagCount++;
        if (tag[0] === "u") mintTagCount++;
      }
      return (
        // exactly one recipient and mint
        pTagCount === 1 && mintTagCount === 1 && // must have at least one proof
        this.proofs.length > 0
      );
    }
  };
  var NDKNip07Signer = class {
    _userPromise;
    nip04Queue = [];
    nip04Processing = false;
    debug;
    waitTimeout;
    /**
     * @param waitTimeout - The timeout in milliseconds to wait for the NIP-07 to become available
     */
    constructor(waitTimeout = 1e3) {
      this.debug = (0, import_debug8.default)("ndk:nip07");
      this.waitTimeout = waitTimeout;
    }
    async blockUntilReady() {
      await this.waitForExtension();
      const pubkey = await window.nostr.getPublicKey();
      if (!pubkey) {
        throw new Error("User rejected access");
      }
      return new NDKUser({ pubkey });
    }
    /**
     * Getter for the user property.
     * @returns The NDKUser instance.
     */
    async user() {
      if (!this._userPromise) {
        this._userPromise = this.blockUntilReady();
      }
      return this._userPromise;
    }
    /**
     * Signs the given Nostr event.
     * @param event - The Nostr event to be signed.
     * @returns The signature of the signed event.
     * @throws Error if the NIP-07 is not available on the window object.
     */
    async sign(event) {
      await this.waitForExtension();
      const signedEvent = await window.nostr.signEvent(event);
      return signedEvent.sig;
    }
    async relays(ndk) {
      await this.waitForExtension();
      const relays = await window.nostr.getRelays?.() || {};
      const activeRelays = [];
      for (const url of Object.keys(relays)) {
        if (relays[url].read && relays[url].write) {
          activeRelays.push(url);
        }
      }
      return activeRelays.map((url) => new NDKRelay(url, ndk?.relayAuthDefaultPolicy, ndk));
    }
    async encrypt(recipient, value, type = DEFAULT_ENCRYPTION_SCHEME) {
      if (type === "nip44") {
        return this.nip44Encrypt(recipient, value);
      } else {
        return this.nip04Encrypt(recipient, value);
      }
    }
    async decrypt(sender, value, type = DEFAULT_ENCRYPTION_SCHEME) {
      if (type === "nip44") {
        return this.nip44Decrypt(sender, value);
      } else {
        return this.nip04Decrypt(sender, value);
      }
    }
    async nip44Encrypt(recipient, value) {
      await this.waitForExtension();
      return await this.nip44.encrypt(recipient.pubkey, value);
    }
    get nip44() {
      if (!window.nostr?.nip44) {
        throw new Error("NIP-44 not supported by your browser extension");
      }
      return window.nostr.nip44;
    }
    async nip44Decrypt(sender, value) {
      await this.waitForExtension();
      return await this.nip44.decrypt(sender.pubkey, value);
    }
    async nip04Encrypt(recipient, value) {
      await this.waitForExtension();
      const recipientHexPubKey = recipient.pubkey;
      return this.queueNip04("encrypt", recipientHexPubKey, value);
    }
    async nip04Decrypt(sender, value) {
      await this.waitForExtension();
      const senderHexPubKey = sender.pubkey;
      return this.queueNip04("decrypt", senderHexPubKey, value);
    }
    async queueNip04(type, counterpartyHexpubkey, value) {
      return new Promise((resolve, reject) => {
        this.nip04Queue.push({
          type,
          counterpartyHexpubkey,
          value,
          resolve,
          reject
        });
        if (!this.nip04Processing) {
          this.processNip04Queue();
        }
      });
    }
    async processNip04Queue(item, retries = 0) {
      if (!item && this.nip04Queue.length === 0) {
        this.nip04Processing = false;
        return;
      }
      this.nip04Processing = true;
      const { type, counterpartyHexpubkey, value, resolve, reject } = item || this.nip04Queue.shift();
      try {
        let result;
        if (type === "encrypt") {
          result = await window.nostr.nip04.encrypt(counterpartyHexpubkey, value);
        } else {
          result = await window.nostr.nip04.decrypt(counterpartyHexpubkey, value);
        }
        resolve(result);
      } catch (error) {
        if (error.message && error.message.includes("call already executing")) {
          if (retries < 5) {
            this.debug("Retrying encryption queue item", {
              type,
              counterpartyHexpubkey,
              value,
              retries
            });
            setTimeout(() => {
              this.processNip04Queue(item, retries + 1);
            }, 50 * retries);
            return;
          }
        }
        reject(error);
      }
      this.processNip04Queue();
    }
    waitForExtension() {
      return new Promise((resolve, reject) => {
        if (window.nostr) {
          resolve();
          return;
        }
        let timerId;
        const intervalId = setInterval(() => {
          if (window.nostr) {
            clearTimeout(timerId);
            clearInterval(intervalId);
            resolve();
          }
        }, 100);
        timerId = setTimeout(() => {
          clearInterval(intervalId);
          reject(new Error("NIP-07 extension not available"));
        }, this.waitTimeout);
      });
    }
  };
  function dedup(event1, event2) {
    if (event1.created_at > event2.created_at) {
      return event1;
    }
    return event2;
  }
  async function getRelayListForUser(pubkey, ndk) {
    const list = await getRelayListForUsers([pubkey], ndk);
    return list.get(pubkey);
  }
  async function getRelayListForUsers(pubkeys, ndk, skipCache = false) {
    const pool = ndk.outboxPool || ndk.pool;
    const set = /* @__PURE__ */ new Set();
    for (const relay of pool.relays.values()) set.add(relay);
    const relayLists = /* @__PURE__ */ new Map();
    const fromContactList = /* @__PURE__ */ new Map();
    const relaySet = new NDKRelaySet(set, ndk);
    if (ndk.cacheAdapter?.locking && !skipCache) {
      const cachedList = await ndk.fetchEvents(
        { kinds: [3, 10002], authors: pubkeys },
        {
          cacheUsage: "ONLY_CACHE"
          /* ONLY_CACHE */
        }
      );
      for (const relayList of cachedList) {
        if (relayList.kind === 10002)
          relayLists.set(relayList.pubkey, NDKRelayList.from(relayList));
      }
      for (const relayList of cachedList) {
        if (relayList.kind === 3) {
          if (relayLists.has(relayList.pubkey)) continue;
          const list = relayListFromKind3(ndk, relayList);
          if (list) fromContactList.set(relayList.pubkey, list);
        }
      }
      pubkeys = pubkeys.filter(
        (pubkey) => !relayLists.has(pubkey) && !fromContactList.has(pubkey)
      );
    }
    if (pubkeys.length === 0) return relayLists;
    const relayListEvents = /* @__PURE__ */ new Map();
    const contactListEvents = /* @__PURE__ */ new Map();
    return new Promise(async (resolve) => {
      const sub = ndk.subscribe(
        { kinds: [3, 10002], authors: pubkeys },
        {
          closeOnEose: true,
          pool,
          groupable: true,
          cacheUsage: "ONLY_RELAY",
          subId: "ndk-relay-list-fetch"
        },
        relaySet,
        false
      );
      sub.on("event", (event) => {
        if (event.kind === 10002) {
          const existingEvent = relayListEvents.get(event.pubkey);
          if (existingEvent && existingEvent.created_at > event.created_at) return;
          relayListEvents.set(event.pubkey, event);
        } else if (event.kind === 3) {
          const existingEvent = contactListEvents.get(event.pubkey);
          if (existingEvent && existingEvent.created_at > event.created_at) return;
          contactListEvents.set(event.pubkey, event);
        }
      });
      sub.on("eose", () => {
        for (const event of relayListEvents.values()) {
          relayLists.set(event.pubkey, NDKRelayList.from(event));
        }
        for (const pubkey of pubkeys) {
          if (relayLists.has(pubkey)) continue;
          const contactList = contactListEvents.get(pubkey);
          if (!contactList) continue;
          const list = relayListFromKind3(ndk, contactList);
          if (list) relayLists.set(pubkey, list);
        }
        resolve(relayLists);
      });
      sub.start();
    });
  }
  var OutboxItem = class {
    /**
     * Type of item
     */
    type;
    /**
     * The relay URLs that are of interest to this item
     */
    relayUrlScores;
    readRelays;
    writeRelays;
    constructor(type) {
      this.type = type;
      this.relayUrlScores = /* @__PURE__ */ new Map();
      this.readRelays = /* @__PURE__ */ new Set();
      this.writeRelays = /* @__PURE__ */ new Set();
    }
  };
  var OutboxTracker = class extends import_tseep8.EventEmitter {
    data;
    ndk;
    debug;
    constructor(ndk) {
      super();
      this.ndk = ndk;
      this.debug = ndk.debug.extend("outbox-tracker");
      this.data = new import_typescript_lru_cache2.LRUCache({
        maxSize: 1e5,
        entryExpirationTimeInMS: 2 * 60 * 1e3
      });
    }
    /**
     * Adds a list of users to the tracker.
     * @param items
     * @param skipCache
     */
    async trackUsers(items, skipCache = false) {
      const promises = [];
      for (let i2 = 0; i2 < items.length; i2 += 400) {
        const slice = items.slice(i2, i2 + 400);
        const pubkeys = slice.map((item) => getKeyFromItem(item)).filter((pubkey) => !this.data.has(pubkey));
        if (pubkeys.length === 0) continue;
        for (const pubkey of pubkeys) {
          this.data.set(pubkey, new OutboxItem("user"));
        }
        promises.push(
          new Promise((resolve) => {
            getRelayListForUsers(pubkeys, this.ndk, skipCache).then((relayLists) => {
              for (const [pubkey, relayList] of relayLists) {
                let outboxItem = this.data.get(pubkey);
                outboxItem ??= new OutboxItem("user");
                if (relayList) {
                  outboxItem.readRelays = new Set(
                    normalize2(relayList.readRelayUrls)
                  );
                  outboxItem.writeRelays = new Set(
                    normalize2(relayList.writeRelayUrls)
                  );
                  for (const relayUrl of outboxItem.readRelays) {
                    if (this.ndk.pool.blacklistRelayUrls.has(relayUrl)) {
                      outboxItem.readRelays.delete(relayUrl);
                    }
                  }
                  for (const relayUrl of outboxItem.writeRelays) {
                    if (this.ndk.pool.blacklistRelayUrls.has(relayUrl)) {
                      outboxItem.writeRelays.delete(relayUrl);
                    }
                  }
                  this.data.set(pubkey, outboxItem);
                }
              }
            }).finally(resolve);
          })
        );
      }
      return Promise.all(promises);
    }
    /**
     *
     * @param key
     * @param score
     */
    track(item, type, skipCache = true) {
      const key = getKeyFromItem(item);
      type ??= getTypeFromItem(item);
      let outboxItem = this.data.get(key);
      if (!outboxItem) {
        outboxItem = new OutboxItem(type);
        if (item instanceof NDKUser) {
          this.trackUsers([item]);
        }
      }
      return outboxItem;
    }
  };
  function getKeyFromItem(item) {
    if (item instanceof NDKUser) {
      return item.pubkey;
    } else {
      return item;
    }
  }
  function getTypeFromItem(item) {
    if (item instanceof NDKUser) {
      return "user";
    } else {
      return "kind";
    }
  }
  function correctRelaySet(relaySet, pool) {
    const connectedRelays = pool.connectedRelays();
    const includesConnectedRelay = Array.from(relaySet.relays).some((relay) => {
      return connectedRelays.map((r) => r.url).includes(relay.url);
    });
    if (!includesConnectedRelay) {
      for (const relay of connectedRelays) {
        relaySet.addRelay(relay);
      }
    }
    if (connectedRelays.length === 0) {
      for (const relay of pool.relays.values()) {
        relaySet.addRelay(relay);
      }
    }
    return relaySet;
  }
  function isValidHint(hint) {
    if (!hint || hint === "") return false;
    try {
      new URL(hint);
      return true;
    } catch (e) {
      return false;
    }
  }
  async function fetchEventFromTag(tag, originalEvent, subOpts, fallback = {
    type: "timeout"
  }) {
    const d4 = this.debug.extend("fetch-event-from-tag");
    const [_, id, hint] = tag;
    subOpts = {};
    d4("fetching event from tag", tag, subOpts, fallback);
    const authorRelays = getRelaysForSync(this, originalEvent.pubkey);
    if (authorRelays && authorRelays.size > 0) {
      d4("fetching event from author relays %o", Array.from(authorRelays));
      const relaySet2 = NDKRelaySet.fromRelayUrls(Array.from(authorRelays), this);
      const event2 = await this.fetchEvent(id, subOpts, relaySet2);
      if (event2) return event2;
    } else {
      d4("no author relays found for %s", originalEvent.pubkey, originalEvent);
    }
    const relaySet = calculateRelaySetsFromFilters(this, [{ ids: [id] }], this.pool);
    d4("fetching event without relay hint", relaySet);
    const event = await this.fetchEvent(id, subOpts);
    if (event) return event;
    if (hint && hint !== "") {
      const event2 = await this.fetchEvent(
        id,
        subOpts,
        this.pool.getRelay(hint, true, true, [{ ids: [id] }])
      );
      if (event2) return event2;
    }
    let result = void 0;
    const relay = isValidHint(hint) ? this.pool.getRelay(hint, false, true, [{ ids: [id] }]) : void 0;
    const fetchMaybeWithRelayHint = new Promise((resolve) => {
      this.fetchEvent(id, subOpts, relay).then(resolve);
    });
    if (!isValidHint(hint) || fallback.type === "none") {
      return fetchMaybeWithRelayHint;
    }
    const fallbackFetchPromise = new Promise(async (resolve) => {
      const fallbackRelaySet = fallback.relaySet;
      const timeout = fallback.timeout ?? 1500;
      const timeoutPromise = new Promise((resolve2) => setTimeout(resolve2, timeout));
      if (fallback.type === "timeout") await timeoutPromise;
      if (result) {
        resolve(result);
      } else {
        d4("fallback fetch triggered");
        const fallbackEvent = await this.fetchEvent(id, subOpts, fallbackRelaySet);
        resolve(fallbackEvent);
      }
    });
    switch (fallback.type) {
      case "timeout":
        return Promise.race([fetchMaybeWithRelayHint, fallbackFetchPromise]);
      case "eose":
        result = await fetchMaybeWithRelayHint;
        if (result) return result;
        return fallbackFetchPromise;
    }
  }
  var SPEC_PATH = "/.well-known/nostr/nip96.json";
  var Nip96 = class {
    ndk;
    spec;
    url;
    nip98Required = false;
    /**
     * @param domain domain of the NIP96 service
     */
    constructor(domain, ndk) {
      this.url = `https://${domain}${SPEC_PATH}`;
      this.ndk = ndk;
    }
    async prepareUpload(blob, httpVerb = "POST") {
      this.validateHttpFetch();
      if (!this.spec) await this.fetchSpec();
      if (!this.spec) throw new Error("Failed to fetch NIP96 spec");
      let headers = {};
      if (this.nip98Required) {
        const authorizationHeader = await this.generateNip98Header(
          this.spec.api_url,
          httpVerb,
          blob
        );
        headers = { Authorization: authorizationHeader };
      }
      return {
        url: this.spec.api_url,
        headers
      };
    }
    /**
     * Provides an XMLHttpRequest-based upload method for browsers.
     * @example
     * const xhr = new XMLHttpRequest();
     * xhr.upload.addEventListener("progress", function(e) {
     *    const percentComplete = e.loaded / e.total;
     *    console.log(percentComplete);
     * });
     * const nip96 = ndk.getNip96("nostrcheck.me");
     * const blob = new Blob(["Hello, world!"], { type: "text/plain" });
     * const response = await nip96.xhrUpload(xhr, blob);
     * console.log(response);
     * @returns Promise that resolves to the upload response
     */
    async xhrUpload(xhr, blob) {
      const httpVerb = "POST";
      const { url, headers } = await this.prepareUpload(blob, httpVerb);
      xhr.open(httpVerb, url, true);
      if (headers["Authorization"]) {
        xhr.setRequestHeader("Authorization", headers["Authorization"]);
      }
      const formData = new FormData();
      formData.append("file", blob);
      return new Promise((resolve, reject) => {
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(xhr.statusText));
          }
        };
        xhr.onerror = function() {
          reject(new Error("Network Error"));
        };
        xhr.send(formData);
      });
    }
    /**
     * Fetch-based upload method. Note that this will use NDK's httpFetch
     * @param blob
     * @returns Promise that resolves to the upload response
     *
     * @example
     * const nip96 = ndk.getNip96("nostrcheck.me");
     * const blob = new Blob(["Hello, world!"], { type: "text/plain" });
     * const response = await nip96.upload(blob);
     * console.log(response);
     */
    async upload(blob) {
      const httpVerb = "POST";
      const { url, headers } = await this.prepareUpload(blob, httpVerb);
      const formData = new FormData();
      formData.append("file", blob);
      const res = await this.ndk.httpFetch(this.spec.api_url, {
        method: httpVerb,
        headers,
        body: formData
      });
      if (res.status !== 200) throw new Error(`Failed to upload file to ${url}`);
      const json = await res.json();
      if (json.status !== "success") throw new Error(json.message);
      return json;
    }
    validateHttpFetch() {
      if (!this.ndk) throw new Error("NDK is required to fetch NIP96 spec");
      if (!this.ndk.httpFetch)
        throw new Error("NDK must have an httpFetch method to fetch NIP96 spec");
    }
    async fetchSpec() {
      this.validateHttpFetch();
      const res = await this.ndk.httpFetch(this.url);
      if (res.status !== 200) throw new Error(`Failed to fetch NIP96 spec from ${this.url}`);
      const spec = await res.json();
      if (!spec) throw new Error(`Failed to parse NIP96 spec from ${this.url}`);
      this.spec = spec;
      this.nip98Required = this.spec.plans.free.is_nip98_required;
    }
    async generateNip98Header(requestUrl, httpMethod, blob) {
      const event = new NDKEvent(this.ndk, {
        kind: 27235,
        tags: [
          ["u", requestUrl],
          ["method", httpMethod]
        ]
      });
      if (["POST", "PUT", "PATCH"].includes(httpMethod)) {
        const sha256Hash = await this.calculateSha256(blob);
        event.tags.push(["payload", sha256Hash]);
      }
      await event.sign();
      const encodedEvent = btoa(JSON.stringify(event.rawEvent()));
      return `Nostr ${encodedEvent}`;
    }
    async calculateSha256(blob) {
      const buffer = await blob.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      return hashHex;
    }
  };
  var Queue2 = class {
    queue = [];
    maxConcurrency;
    processing = /* @__PURE__ */ new Set();
    promises = /* @__PURE__ */ new Map();
    constructor(name, maxConcurrency) {
      this.maxConcurrency = maxConcurrency;
    }
    add(item) {
      if (this.promises.has(item.id)) {
        return this.promises.get(item.id);
      } else {
      }
      const promise = new Promise((resolve, reject) => {
        this.queue.push({
          ...item,
          func: () => item.func().then(
            (result) => {
              resolve(result);
              return result;
            },
            (error) => {
              reject(error);
              throw error;
            }
          )
        });
        this.process();
      });
      this.promises.set(item.id, promise);
      promise.finally(() => {
        this.promises.delete(item.id);
        this.processing.delete(item.id);
        this.process();
      });
      return promise;
    }
    process() {
      if (this.processing.size >= this.maxConcurrency || this.queue.length === 0) {
        return;
      }
      const item = this.queue.shift();
      if (!item || this.processing.has(item.id)) {
        return;
      }
      this.processing.add(item.id);
      item.func();
    }
    clear() {
      this.queue = [];
    }
    clearProcessing() {
      this.processing.clear();
    }
    clearAll() {
      this.clear();
      this.clearProcessing();
    }
    length() {
      return this.queue.length;
    }
  };
  var NDKSubscriptionManager = class {
    subscriptions;
    seenEvents = /* @__PURE__ */ new Map();
    debug;
    constructor(debug8) {
      this.subscriptions = /* @__PURE__ */ new Map();
      this.debug = debug8.extend("sub-manager");
    }
    add(sub) {
      this.subscriptions.set(sub.internalId, sub);
      if (sub.onStopped) {
        console.log("SUB-MANAGER BUG: Subscription already had onStopped! \u{1F914}", sub.internalId);
      }
      sub.onStopped = () => {
        this.subscriptions.delete(sub.internalId);
      };
      sub.on("close", () => {
        this.subscriptions.delete(sub.internalId);
      });
    }
    seenEvent(eventId, relay) {
      const current = this.seenEvents.get(eventId) || [];
      current.push(relay);
      this.seenEvents.set(eventId, current);
    }
    /**
     * Whenever an event comes in, this function is called.
     * This function matches the received event against all the
     * known (i.e. active) NDKSubscriptions, and if it matches,
     * it sends the event to the subscription.
     * 
     * This is the single place in the codebase that matches
     * incoming events with parties interested in the event.
     * 
     * This is also what allows for reactivity in NDK apps, such that
     * whenever an active subscription receives an event that some
     * other active subscription would want to receive, both receive it.
     * 
     * TODO This also allows for subscriptions that overlap in meaning
     * to be collapsed into one.
     * 
     * I.e. if a subscription with filter: kinds: [1], authors: [alice]
     * is created and EOSEs, and then a subsequent subscription with
     * kinds: [1], authors: [alice] is created, once the second subscription
     * EOSEs we can safely close it, increment its refCount and close it,
     * and when the first subscription receives a new event from Alice this
     * code will make the second subscription receive the event even though
     * it has no active subscription on a relay.
     * @param event Raw event received from a relay
     * @param relay Relay that sent the event
     * @param optimisticPublish Whether the event is coming from an optimistic publish
     */
    filterMatchingTime = 0;
    filterMatchingCount = 0;
    dispatchEvent(event, relay, optimisticPublish = false) {
      if (relay) this.seenEvent(event.id, relay);
      const subscriptions = this.subscriptions.values();
      const matchingSubs = [];
      const start = Date.now();
      for (const sub of subscriptions) {
        if (matchFilters(sub.filters, event)) {
          matchingSubs.push(sub);
        }
      }
      this.filterMatchingTime += Date.now() - start;
      this.filterMatchingCount += matchingSubs.length;
      for (const sub of matchingSubs) {
        sub.eventReceived(event, void 0, false, optimisticPublish);
      }
    }
  };
  var debug6 = (0, import_debug10.default)("ndk:active-user");
  async function getUserRelayList(user) {
    if (!this.autoConnectUserRelays) return;
    const userRelays = await getRelayListForUser(user.pubkey, this);
    if (!userRelays) return;
    for (const url of userRelays.relays) {
      let relay = this.pool.relays.get(url);
      if (!relay) {
        relay = new NDKRelay(url, this.relayAuthDefaultPolicy, this);
        this.pool.addRelay(relay);
      }
    }
    return userRelays;
  }
  async function setActiveUser(user) {
    const pool = this.outboxPool || this.pool;
    if (pool.connectedRelays.length > 0) {
      setActiveUserConnected.call(this, user);
    } else {
      pool.once("connect", () => {
        setActiveUserConnected.call(this, user);
      });
    }
  }
  async function setActiveUserConnected(user) {
    const userRelays = await getUserRelayList.call(this, user);
    const filters = [
      {
        kinds: [
          10006
          /* BlockRelayList */
        ],
        authors: [user.pubkey]
      }
    ];
    if (this.autoFetchUserMutelist) {
      filters[0].kinds.push(
        1e4
        /* MuteList */
      );
    }
    const relaySet = userRelays ? userRelays.relaySet : void 0;
    const sub = this.subscribe(
      filters,
      { subId: "active-user-settings", closeOnEose: true },
      relaySet,
      false
    );
    const events = /* @__PURE__ */ new Map();
    sub.on("event", (event) => {
      const prevEvent = events.get(event.kind);
      if (prevEvent && prevEvent.created_at >= event.created_at) return;
      events.set(event.kind, event);
    });
    sub.on("eose", () => {
      for (const event of events.values()) {
        processEvent.call(this, event);
      }
    });
    sub.start();
  }
  async function processEvent(event) {
    if (event.kind === 10006) {
      processBlockRelayList.call(this, event);
    } else if (event.kind === 1e4) {
      processMuteList.call(this, event);
    }
  }
  function processBlockRelayList(event) {
    const list = lists_default.from(event);
    for (const item of list.items) {
      this.pool.blacklistRelayUrls.add(item[0]);
    }
    debug6("Added %d relays to relay blacklist", list.items.length);
  }
  function processMuteList(muteList) {
    const list = lists_default.from(muteList);
    for (const item of list.items) {
      this.mutedIds.set(item[1], item[0]);
    }
    debug6("Added %d users to mute list", list.items.length);
  }
  var DEFAULT_OUTBOX_RELAYS = ["wss://purplepag.es/", "wss://nos.lol/"];
  var DEFAULT_BLACKLISTED_RELAYS = [
    "wss://brb.io/",
    // BRB
    "wss://nostr.mutinywallet.com/"
    // Don't try to read from this relay since it's a write-only relay
    // "wss://purplepag.es/", // This is a hack, since this is a mostly read-only relay, but not fully. Once we have relay routing this can be removed so it only receives the supported kinds
  ];
  var NDK = class extends import_tseep7.EventEmitter {
    _explicitRelayUrls;
    pool;
    outboxPool;
    _signer;
    _activeUser;
    cacheAdapter;
    debug;
    devWriteRelaySet;
    outboxTracker;
    mutedIds;
    clientName;
    clientNip89;
    queuesZapConfig;
    queuesNip05;
    asyncSigVerification = false;
    initialValidationRatio = 1;
    lowestValidationRatio = 1;
    validationRatioFn;
    subManager;
    publishingFailureHandled = false;
    /**
     * Default relay-auth policy that will be used when a relay requests authentication,
     * if no other policy is specified for that relay.
     *
     * @example Disconnect from relays that request authentication:
     * ```typescript
     * ndk.relayAuthDefaultPolicy = NDKAuthPolicies.disconnect(ndk.pool);
     * ```
     *
     * @example Sign in to relays that request authentication:
     * ```typescript
     * ndk.relayAuthDefaultPolicy = NDKAuthPolicies.signIn({ndk})
     * ```
     *
     * @example Sign in to relays that request authentication, asking the user for confirmation:
     * ```typescript
     * ndk.relayAuthDefaultPolicy = (relay: NDKRelay) => {
     *     const signIn = NDKAuthPolicies.signIn({ndk});
     *     if (confirm(`Relay ${relay.url} is requesting authentication, do you want to sign in?`)) {
     *        signIn(relay);
     *     }
     * }
     * ```
     */
    relayAuthDefaultPolicy;
    /**
     * Fetch function to use for HTTP requests.
     *
     * @example
     * ```typescript
     * import fetch from "node-fetch";
     *
     * ndk.httpFetch = fetch;
     * ```
     */
    httpFetch;
    /**
     * Provide a caller function to receive all networking traffic from relays
     */
    netDebug;
    autoConnectUserRelays = true;
    autoFetchUserMutelist = true;
    walletConfig;
    constructor(opts = {}) {
      super();
      this.debug = opts.debug || (0, import_debug9.default)("ndk");
      this.netDebug = opts.netDebug;
      this._explicitRelayUrls = opts.explicitRelayUrls || [];
      this.subManager = new NDKSubscriptionManager(this.debug);
      this.pool = new NDKPool(
        opts.explicitRelayUrls || [],
        opts.blacklistRelayUrls || DEFAULT_BLACKLISTED_RELAYS,
        this
      );
      this.pool.name = "main";
      this.pool.on("relay:auth", async (relay, challenge3) => {
        if (this.relayAuthDefaultPolicy) {
          await this.relayAuthDefaultPolicy(relay, challenge3);
        }
      });
      this.autoConnectUserRelays = opts.autoConnectUserRelays ?? true;
      this.autoFetchUserMutelist = opts.autoFetchUserMutelist ?? true;
      this.clientName = opts.clientName;
      this.clientNip89 = opts.clientNip89;
      this.relayAuthDefaultPolicy = opts.relayAuthDefaultPolicy;
      if (opts.enableOutboxModel) {
        this.outboxPool = new NDKPool(
          opts.outboxRelayUrls || DEFAULT_OUTBOX_RELAYS,
          opts.blacklistRelayUrls || DEFAULT_BLACKLISTED_RELAYS,
          this,
          this.debug.extend("outbox-pool")
        );
        this.outboxPool.name = "outbox";
        this.outboxTracker = new OutboxTracker(this);
      }
      this.signer = opts.signer;
      this.cacheAdapter = opts.cacheAdapter;
      this.mutedIds = opts.mutedIds || /* @__PURE__ */ new Map();
      if (opts.devWriteRelayUrls) {
        this.devWriteRelaySet = NDKRelaySet.fromRelayUrls(opts.devWriteRelayUrls, this);
      }
      this.queuesZapConfig = new Queue2("zaps", 3);
      this.queuesNip05 = new Queue2("nip05", 10);
      this.signatureVerificationWorker = opts.signatureVerificationWorker;
      this.initialValidationRatio = opts.initialValidationRatio || 1;
      this.lowestValidationRatio = opts.lowestValidationRatio || 1;
      try {
        this.httpFetch = fetch;
      } catch {
      }
    }
    set explicitRelayUrls(urls) {
      this._explicitRelayUrls = urls;
      this.pool.relayUrls = urls;
    }
    get explicitRelayUrls() {
      return this._explicitRelayUrls || [];
    }
    set signatureVerificationWorker(worker2) {
      this.asyncSigVerification = !!worker2;
      if (worker2) {
        signatureVerificationInit(worker2);
      }
    }
    /**
     * Adds an explicit relay to the pool.
     * @param url
     * @param relayAuthPolicy Authentication policy to use if different from the default
     * @param connect Whether to connect to the relay automatically
     * @returns
     */
    addExplicitRelay(urlOrRelay, relayAuthPolicy, connect = true) {
      let relay;
      if (typeof urlOrRelay === "string") {
        relay = new NDKRelay(urlOrRelay, relayAuthPolicy, this);
      } else {
        relay = urlOrRelay;
      }
      this.pool.addRelay(relay, connect);
      this.explicitRelayUrls.push(relay.url);
      return relay;
    }
    toJSON() {
      return { relayCount: this.pool.relays.size }.toString();
    }
    get activeUser() {
      return this._activeUser;
    }
    /**
     * Sets the active user for this NDK instance, typically this will be
     * called when assigning a signer to the NDK instance.
     *
     * This function will automatically connect to the user's relays if
     * `autoConnectUserRelays` is set to true.
     *
     * It will also fetch the user's mutelist if `autoFetchUserMutelist` is set to true.
     */
    set activeUser(user) {
      const differentUser = this._activeUser?.pubkey !== user?.pubkey;
      this._activeUser = user;
      if (user && differentUser) {
        setActiveUser.call(this, user);
      } else if (!user) {
        this.mutedIds = /* @__PURE__ */ new Map();
      }
    }
    get signer() {
      return this._signer;
    }
    set signer(newSigner) {
      this._signer = newSigner;
      if (newSigner) this.emit("signer:ready", newSigner);
      newSigner?.user().then((user) => {
        user.ndk = this;
        this.activeUser = user;
      });
    }
    /**
     * Connect to relays with optional timeout.
     * If the timeout is reached, the connection will be continued to be established in the background.
     */
    async connect(timeoutMs) {
      if (this._signer && this.autoConnectUserRelays) {
        this.debug(
          "Attempting to connect to user relays specified by signer %o",
          await this._signer.relays?.(this)
        );
        if (this._signer.relays) {
          const relays = await this._signer.relays(this);
          relays.forEach((relay) => this.pool.addRelay(relay));
        }
      }
      const connections = [this.pool.connect(timeoutMs)];
      if (this.outboxPool) {
        connections.push(this.outboxPool.connect(timeoutMs));
      }
      this.debug("Connecting to relays %o", { timeoutMs });
      return Promise.allSettled(connections).then(() => {
      });
    }
    /**
     * Get a NDKUser object
     *
     * @param opts
     * @returns
     */
    getUser(opts) {
      const user = new NDKUser(opts);
      user.ndk = this;
      return user;
    }
    /**
     * Get a NDKUser from a NIP05
     * @param nip05 NIP-05 ID
     * @param skipCache Skip cache
     * @returns
     */
    async getUserFromNip05(nip05, skipCache = false) {
      return NDKUser.fromNip05(nip05, this, skipCache);
    }
    /**
     * Create a new subscription. Subscriptions automatically start, you can make them automatically close when all relays send back an EOSE by setting `opts.closeOnEose` to `true`)
     *
     * @param filters
     * @param opts
     * @param relaySet explicit relay set to use
     * @param autoStart automatically start the subscription
     * @returns NDKSubscription
     */
    subscribe(filters, opts, relaySet, autoStart = true) {
      const subscription = new NDKSubscription(this, filters, opts, relaySet);
      this.subManager.add(subscription);
      const pool = opts?.pool ?? this.pool;
      if (relaySet) {
        for (const relay of relaySet.relays) {
          pool.useTemporaryRelay(relay, void 0, subscription.filters);
        }
      }
      if (this.outboxPool && subscription.hasAuthorsFilter()) {
        const authors = subscription.filters.filter((filter) => filter.authors && filter.authors?.length > 0).map((filter) => filter.authors).flat();
        this.outboxTracker?.trackUsers(authors);
      }
      if (autoStart) {
        setTimeout(() => subscription.start(), 0);
      }
      return subscription;
    }
    /**
     * Publish an event to a relay
     * @param event event to publish
     * @param relaySet explicit relay set to use
     * @param timeoutMs timeout in milliseconds to wait for the event to be published
     * @returns The relays the event was published to
     *
     * @deprecated Use `event.publish()` instead
     */
    async publish(event, relaySet, timeoutMs) {
      this.debug("Deprecated: Use `event.publish()` instead");
      return event.publish(relaySet, timeoutMs);
    }
    /**
     * Attempts to fetch an event from a tag, following relay hints and
     * other best practices.
     * @param tag Tag to fetch the event from
     * @param originalEvent Event where the tag came from
     * @param subOpts Subscription options to use when fetching the event
     * @param fallback Fallback options to use when the hint relay doesn't respond
     * @returns
     */
    fetchEventFromTag = fetchEventFromTag.bind(this);
    /**
     * Fetch a single event.
     *
     * @param idOrFilter event id in bech32 format or filter
     * @param opts subscription options
     * @param relaySetOrRelay explicit relay set to use
     */
    async fetchEvent(idOrFilter, opts, relaySetOrRelay) {
      let filters;
      let relaySet;
      if (relaySetOrRelay instanceof NDKRelay) {
        relaySet = new NDKRelaySet(/* @__PURE__ */ new Set([relaySetOrRelay]), this);
      } else if (relaySetOrRelay instanceof NDKRelaySet) {
        relaySet = relaySetOrRelay;
      }
      if (!relaySetOrRelay && typeof idOrFilter === "string") {
        if (!isNip33AValue(idOrFilter)) {
          const relays = relaysFromBech32(idOrFilter, this);
          if (relays.length > 0) {
            relaySet = new NDKRelaySet(new Set(relays), this);
            relaySet = correctRelaySet(relaySet, this.pool);
          }
        }
      }
      if (typeof idOrFilter === "string") {
        filters = [filterFromId(idOrFilter)];
      } else if (Array.isArray(idOrFilter)) {
        filters = idOrFilter;
      } else {
        filters = [idOrFilter];
      }
      if (filters.length === 0) {
        throw new Error(`Invalid filter: ${JSON.stringify(idOrFilter)}`);
      }
      return new Promise((resolve) => {
        let fetchedEvent = null;
        const s = this.subscribe(
          filters,
          { ...opts || {}, closeOnEose: true },
          relaySet,
          false
        );
        const t2 = setTimeout(() => {
          s.stop();
          resolve(fetchedEvent);
        }, 1e4);
        s.on("event", (event) => {
          event.ndk = this;
          if (!event.isReplaceable()) {
            clearTimeout(t2);
            resolve(event);
          } else if (!fetchedEvent || fetchedEvent.created_at < event.created_at) {
            fetchedEvent = event;
          }
        });
        s.on("eose", () => {
          clearTimeout(t2);
          resolve(fetchedEvent);
        });
        s.start();
      });
    }
    /**
     * Fetch events
     */
    async fetchEvents(filters, opts, relaySet) {
      return new Promise((resolve) => {
        const events = /* @__PURE__ */ new Map();
        const relaySetSubscription = this.subscribe(
          filters,
          { ...opts || {}, closeOnEose: true },
          relaySet,
          false
        );
        const onEvent = (event) => {
          if (!(event instanceof NDKEvent)) event = new NDKEvent(void 0, event);
          const dedupKey = event.deduplicationKey();
          const existingEvent = events.get(dedupKey);
          if (existingEvent) {
            event = dedup(existingEvent, event);
          }
          event.ndk = this;
          events.set(dedupKey, event);
        };
        relaySetSubscription.on("event", onEvent);
        relaySetSubscription.on("eose", () => {
          resolve(new Set(events.values()));
        });
        relaySetSubscription.start();
      });
    }
    /**
     * Ensures that a signer is available to sign an event.
     */
    assertSigner() {
      if (!this.signer) {
        this.emit("signer:required");
        throw new Error("Signer required");
      }
    }
    /**
     * Creates a new Nip96 instance for the given domain.
     * @param domain Domain to use for nip96 uploads
     * @example Upload a file to a NIP-96 enabled domain:
     *
     * ```typescript
     * const blob = new Blob(["Hello, world!"], { type: "text/plain" });
     * const nip96 = ndk.getNip96("nostrcheck.me");
     * await nip96.upload(blob);
     * ```
     */
    getNip96(domain) {
      return new Nip96(domain, this);
    }
    set wallet(wallet) {
      console.log("setting wallet", {
        lnPay: wallet?.lnPay,
        cashuPay: wallet?.cashuPay
      });
      if (!wallet) {
        this.walletConfig = void 0;
        return;
      }
      this.walletConfig ??= {};
      this.walletConfig.lnPay = wallet?.lnPay?.bind(wallet);
      this.walletConfig.cashuPay = wallet?.cashuPay?.bind(wallet);
    }
  };
  var d3 = (0, import_debug11.default)("ndk:zapper");

  // constants.ts
  var DEFAULT_RELAYS = [
    "wss://relay.damus.io",
    "wss://nostr.wine",
    "wss://relay.nostr.net",
    "wss://relay.nostr.band",
    "wss://nos.lol",
    // 'wss://nostr-pub.wellorder.net',
    "wss://njump.me",
    "wss://relay.getalby.com",
    "wss://relay.primal.net"
  ];
  var MILLISATS_PER_SAT = 1e3;

  // utils.ts
  function maskNPub(npubString = "", length = 3) {
    const npubLength = npubString.length;
    if (npubLength !== 63) {
      return "Invalid nPub";
    }
    let result = "npub1";
    for (let i2 = 5; i2 < length + 5; i2++) {
      result += npubString[i2];
    }
    result += "...";
    let suffix = "";
    for (let i2 = npubLength - 1; i2 >= npubLength - length; i2--) {
      suffix = npubString[i2] + suffix;
    }
    result += suffix;
    return result;
  }
  function getNostrLogo(theme = "dark", width = 24, height = 21) {
    return `
        <svg width="${width}" height="${height}" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.7084 10.1607C18.1683 13.3466 14.8705 14.0207 12.9733 13.9618C12.8515 13.958 12.7366 14.0173 12.6647 14.1157C12.4684 14.384 12.1547 14.7309 11.9125 14.7309C11.6405 14.7309 11.3957 15.254 11.284 15.5795C11.2723 15.6137 11.3059 15.6452 11.3403 15.634C14.345 14.6584 15.5241 14.3238 16.032 14.4178C16.4421 14.4937 17.209 15.8665 17.5413 16.5434C16.7155 16.5909 16.4402 15.8507 16.2503 15.7178C16.0985 15.6116 16.0415 16.0974 16.032 16.3536C15.8517 16.2587 15.6239 16.1259 15.6049 15.7178C15.5859 15.3098 15.3771 15.4142 15.2157 15.4332C15.0544 15.4521 12.5769 16.2493 12.2067 16.3536C11.8366 16.458 11.4094 16.6004 11.0582 16.8471C10.4697 17.1318 10.09 16.9325 9.98561 16.4485C9.90208 16.0614 10.4444 14.8701 10.726 14.3229C10.3779 14.4526 9.65529 14.7158 9.54898 14.7309C9.44588 14.7457 8.13815 15.7552 7.43879 16.3038C7.398 16.3358 7.37174 16.3827 7.36236 16.4336C7.25047 17.0416 6.89335 17.2118 6.27423 17.5303C5.77602 17.7867 4.036 20.4606 3.14127 21.9041C3.0794 22.0039 2.9886 22.0806 2.8911 22.1461C2.32279 22.5276 1.74399 23.4985 1.50923 23.9737C1.17511 23.0095 1.61048 22.1802 1.86993 21.886C1.75602 21.7873 1.49341 21.8449 1.37634 21.886C1.69907 20.7757 2.82862 20.7757 2.79066 20.7757C2.99948 20.5954 5.44842 17.0938 5.50538 16.9325C5.56187 16.7725 5.46892 16.0242 6.69975 15.6139C6.7193 15.6073 6.73868 15.5984 6.75601 15.5873C7.71493 14.971 8.43427 13.9774 8.67571 13.5542C7.39547 13.4662 5.92943 12.7525 5.16289 12.294C4.99765 12.1952 4.8224 12.1092 4.63108 12.0875C3.58154 11.9687 2.53067 12.6401 2.10723 13.0228C1.93258 12.7799 2.12938 12.0739 2.24961 11.7513C1.82437 11.6905 1.19916 12.308 0.939711 12.6243C0.658747 12.184 0.904907 11.397 1.06311 11.0585C0.501179 11.0737 0.120232 11.3306 0 11.4571C0.465109 7.99343 4.02275 9.00076 4.06259 9.04675C3.87275 8.84937 3.88857 8.59126 3.92021 8.48688C6.0749 8.54381 7.08105 8.18321 7.71702 7.81313C12.7288 5.01374 14.8882 6.73133 15.6856 7.1631C16.4829 7.59487 17.9304 7.77042 18.9318 7.37187C20.1278 6.83097 19.9478 5.43673 19.7054 4.90461C19.4397 4.32101 17.9399 3.51438 17.4084 2.49428C16.8768 1.47418 17.34 0.233672 17.9558 0.0607684C18.5425 -0.103972 18.9615 0.0876835 19.2831 0.378128C19.4974 0.571763 20.0994 0.710259 20.3509 0.800409C20.6024 0.890558 21.0201 1.00918 20.9964 1.08035C20.9726 1.15152 20.5699 1.14202 20.5075 1.14202C20.3794 1.14202 20.2275 1.161 20.3794 1.23217C20.5575 1.30439 20.8263 1.40936 20.955 1.47846C20.9717 1.48744 20.9683 1.51084 20.95 1.51577C20.0765 1.75085 19.2966 1.26578 18.7183 1.82526C18.1298 2.39463 19.3827 2.83114 20.0282 3.51438C20.6736 4.19762 21.3381 5.01372 20.8065 6.87365C20.395 8.31355 18.6703 9.53781 17.7795 10.0167C17.7282 10.0442 17.7001 10.1031 17.7084 10.1607Z" fill="${theme === "dark" ? "white" : "black"}"/>
        </svg>
    `;
  }
  function getLoadingNostrich(theme = "dark", width = 25, height = 25) {
    return `<img width="${width}" height="${height}" src="./assets/${theme === "dark" ? "light" : "dark"}-nostrich-running.gif" />`;
  }
  function getSuccessAnimation(theme = "dark", width = 25, height = 25) {
    return `
        <style>
            .checkmark__circle {
                stroke-dasharray: 166;
                stroke-dashoffset: 166;
                stroke-width: 4;
                stroke-miterlimit: 10;
                stroke: ${theme === "dark" ? "#FFF" : "#000"};
                animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
            }

            .checkmark {
                width: ${width}px;
                height: ${height}px;
                border-radius: 50%;
                display: block;
                stroke-width: 2;
                stroke: ${theme === "dark" ? "#FFFFFF" : "#000000"};
                stroke-miterlimit: 10;
                box-shadow: inset 0px 0px 0px #7ac142;
                animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
            }

            .checkmark__check {
                transform-origin: 50% 50%;
                stroke-dasharray: 48;
                stroke-dashoffset: 48;
                stroke-width: 4;
                animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
            }

            @keyframes stroke {
                100% {
                    stroke-dashoffset: 0;
                }
            }
            @keyframes scale {
                0%, 100% {
                    transform: none;
            }
            50% {
                    transform: scale3d(1.1, 1.1, 1);
                }
            }
            @keyframes fill {
                100% {
                    box-shadow: inset 0px 0px 0px 30px #fff;
                    fill: #000;
                }
            }
        </style>

        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="${theme === "dark" ? "#000" : "#FFF"}"/>
            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
    `;
  }
  async function getPostStats(ndk, postId) {
    debugger;
    var repostsCount = 0;
    var reactionCount = 0;
    var replyCount = 0;
    try {
      const reposts = await ndk.fetchEvents({
        kinds: [NDKKind.Repost],
        "#e": [postId || ""]
      });
      repostsCount = Array.from(reposts).filter((repost2) => {
        const pTagCounts = repost2.tags.filter((tag) => tag[0] === "p").length;
        return pTagCounts === 1;
      }).length;
    } catch {
      console.error("Fetching reposts count failed");
    }
    try {
      reactionCount = (await ndk.fetchEvents({
        kinds: [NDKKind.Reaction],
        "#e": [postId || ""]
      })).values.length;
    } catch {
      console.error("Fetching reactions count failed");
    }
    const zapAmount = 0;
    try {
      const replies = await ndk.fetchEvents({
        kinds: [NDKKind.Text],
        "#e": [postId || ""]
      });
      replyCount = Array.from(replies).filter((reply) => {
        const eTagsCount = reply.tags.filter((tag) => tag[0] === "e").length;
        return eTagsCount === 1;
      }).length;
    } catch {
      console.error("Fetching replies count failed");
    }
    return {
      likes: reactionCount,
      reposts: repostsCount,
      zaps: zapAmount / MILLISATS_PER_SAT,
      replies: replyCount
    };
  }

  // nostr-profile-badge.ts
  var NostrProfileBadge = class extends HTMLElement {
    rendered = false;
    ndk = new NDK();
    userProfile = {
      name: "",
      image: "",
      nip05: ""
    };
    theme = "light";
    isLoading = true;
    isError = false;
    onClick = null;
    ndkUser;
    connectToNostr = async () => {
      await this.ndk.connect();
    };
    getRelays = () => {
      const userRelays = this.getAttribute("relays");
      if (userRelays) {
        return userRelays.split(",");
      }
      return DEFAULT_RELAYS;
    };
    getNDKUser = async () => {
      const npub = this.getAttribute("npub");
      const nip05 = this.getAttribute("nip05");
      const pubkey = this.getAttribute("pubkey");
      if (npub) {
        return this.ndk.getUser({
          npub
        });
      } else if (nip05) {
        return this.ndk.getUserFromNip05(nip05);
      } else if (pubkey) {
        return this.ndk.getUser({
          pubkey
        });
      }
      return null;
    };
    getUserProfile = async () => {
      try {
        this.isLoading = true;
        this.render();
        const user = await this.getNDKUser();
        if (user?.npub) {
          this.ndkUser = user;
          await user.fetchProfile();
          this.userProfile = user.profile;
          if (!this.userProfile.image) {
            this.userProfile.image = "./assets/default_dp.png";
          }
          this.isError = false;
        } else {
          throw new Error("Either npub or nip05 should be provided");
        }
      } catch (err) {
        this.isError = true;
        throw err;
      } finally {
        this.isLoading = false;
        this.render();
      }
    };
    getTheme = async () => {
      this.theme = "light";
      const userTheme = this.getAttribute("theme");
      if (userTheme) {
        const isValidTheme = ["light", "dark"].includes(userTheme);
        if (!isValidTheme) {
          throw new Error(`Invalid theme '${userTheme}'. Accepted values are 'light', 'dark'`);
        }
        this.theme = userTheme;
      }
    };
    connectedCallback() {
      const onClick = this.getAttribute("onClick");
      if (onClick !== null) {
        this.onClick = window[onClick];
      }
      if (!this.rendered) {
        this.ndk = new NDK({
          explicitRelayUrls: this.getRelays()
        });
        this.getTheme();
        this.connectToNostr();
        this.getUserProfile();
        this.rendered = true;
      }
    }
    static get observedAttributes() {
      return ["relays", "npub", "pubkey", "nip05", "theme", "show-npub", "show-follow", "onClick"];
    }
    attributeChangedCallback(name, _oldValue, newValue) {
      if (name === "relays") {
        this.ndk.explicitRelayUrls = this.getRelays();
        this.connectToNostr();
      }
      if (["relays", "npub", "nip05"].includes(name)) {
        this.getUserProfile();
      }
      if (name === "onClick") {
        this.onClick = window[newValue];
      }
      if (name === "theme") {
        this.getTheme();
        this.render();
      }
      if (["show-npub", "show-follow"].includes(name)) {
        this.render();
      }
    }
    disconnectedCallback() {
    }
    getStyles() {
      let variables = ``;
      if (this.theme === "dark") {
        variables = `
      --nstrc-profile-badge-background: var(--nstrc-profile-badge-background-dark);
      --nstrc-profile-badge-name-color: var(--nstrc-profile-badge-name-color-dark);
      --nstrc-profile-badge-nip05-color: var(--nstrc-profile-badge-nip05-color-dark);
      --nstrc-profile-badge-skeleton-min-hsl: var(--nstrc-profile-badge-skeleton-min-hsl-dark);
      --nstrc-profile-badge-skeleton-max-hsl: var(--nstrc-profile-badge-skeleton-max-hsl-dark);
      --nstrc-profile-badge-copy-foreground-color: var(--nstrc-profile-badge-copy-foreground-color-dark);
      `;
      } else {
        variables = `
      --nstrc-profile-badge-background: var(--nstrc-profile-badge-background-light);
      --nstrc-profile-badge-name-color: var(--nstrc-profile-badge-name-color-light);
      --nstrc-profile-badge-nip05-color: var(--nstrc-profile-badge-nip05-color-light);
      --nstrc-profile-badge-skeleton-min-hsl: var(--nstrc-profile-badge-skeleton-min-hsl-light);
      --nstrc-profile-badge-skeleton-max-hsl: var(--nstrc-profile-badge-skeleton-max-hsl-light);
      --nstrc-profile-badge-copy-foreground-color: var(--nstrc-profile-badge-copy-foreground-color-light);
      `;
      }
      return `
    <style>
      :root {

        --nstrc-profile-badge-background-light: #f5f5f5;
        --nstrc-profile-badge-background-dark: #121212;
        --nstrc-profile-badge-name-color-light: #444;
        --nstrc-profile-badge-name-color-dark: #CCC;
        --nstrc-profile-badge-nip05-color-light: #808080;
        --nstrc-profile-badge-nip05-color-dark: #757575;
        --nstrc-profile-badge-skeleton-min-hsl-light: 200, 20%, 80%;
        --nstrc-profile-badge-skeleton-min-hsl-dark: 200, 20%, 20%;
        --nstrc-profile-badge-skeleton-max-hsl-light: 200, 20%, 95%;
        --nstrc-profile-badge-skeleton-max-hsl-dark: 200, 20%, 30%;
        --nstrc-profile-badge-copy-foreground-color-light: #222;
        --nstrc-profile-badge-copy-foreground-color-dark: #CCC;
        --nstrc-profile-badge-name-font-weight: 700;
        --nstrc-profile-badge-nip05-font-weight: 400;

        ${variables}

        --nstrc-follow-btn-padding: 4px 10px !important;
        --nstrc-follow-btn-font-size: 10px !important;
        --nstrc-follow-btn-border-radius: 8px !important;
        --nstrc-follow-btn-error-font-size: 8px !important;
        --nstrc-follow-btn-error-line-height: 1em !important;
        --nstrc-follow-btn-horizontal-alignment: start !important;
        --nstrc-follow-btn-min-height: auto !important;
      }

    .nostr-profile-badge-container {
      display: flex;
      align-items: center;
      border-radius: 100px;
      background-color: var(--nstrc-profile-badge-background);
      gap: 10px;
      font-size: 12px;
      min-height: 48px;
      padding: 8px 10px;
      font-family: Nacelle,sans-serif;
      cursor: pointer;
    }

    .nostr-profile-badge-container:has(.npub-container) {
      padding: 10px 12px;
    }

    .nostr-profile-badge-left-container {
      border-radius: 50%;
    }

    .nostr-profile-badge-left-container img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }

    .nostr-profile-badge-container:has(.npub-container) .nostr-profile-badge-left-container img {
      width: 64px !important;
      height: 64px !important;
    }

    .nostr-profile-badge-right-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 3px;
    }

    .nostr-profile-badge-right-container .nostr-profile-badge-name {
      color: var(--nstrc-profile-badge-name-color);
      font-weight: var(--nstrc-profile-badge-name-font-weight);
    }

    .nostr-profile-badge-right-container .nostr-profile-badge-nip05 {
      color: var(--nstrc-profile-badge-nip05-color);
      font-weight: var(--nstrc-profile-badge-nip05-font-weight);
    }

    .skeleton {
      animation: profile-badge-skeleton-loading 0.5s linear infinite alternate;
    }

    @keyframes profile-badge-skeleton-loading {
      0% {
        background-color: hsl(var(--nstrc-profile-badge-skeleton-min-hsl));
      }
      100% {
        background-color: hsl(var(--nstrc-profile-badge-skeleton-max-hsl));
      }
    }

    .error {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: red;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: #FFF;
    }

    .error-text {
      color: red;
      font-weight: bold;
    }

    .copy-button {
      display: flex;
      font-size: 16px;
      min-width: 15px;
      min-height: 15px;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      color: var(--nstrc-profile-badge-copy-foreground-color);
    }

    .npub-container, .nip05-container {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .npub-container .npub {
      color: #a2a2a2;
    }
    
    .npub-container .nostr-profile-badge-nip05 {
      word-break: break-all;
    }

    .name-container {
      display: flex;
      gap: 4px;
      align-items: center;
      padding: 3px 0; // To equalize flex height with other items
    }
    </style>
    `;
    }
    renderNpub() {
      const npubAttribute = this.getAttribute("npub");
      const showNpub = this.getAttribute("show-npub");
      if (showNpub === "false") {
        return "";
      }
      if (showNpub === null && this.userProfile.nip05) {
        return "";
      }
      if (!npubAttribute && !this.ndkUser.npub) {
        console.warn("Cannot use showNpub without providing a nPub");
        return "";
      }
      return `
      <div class="npub-container">
        <span class="npub">${maskNPub(npubAttribute || this.ndkUser.npub)}</span>
        <span id="npub-copy" class="copy-button">&#x2398;</span>
      </div>
    `;
    }
    copy(string) {
      navigator.clipboard.writeText(string);
    }
    onProfileClick() {
      if (this.isError) {
        return;
      }
      if (this.onClick !== null && typeof this.onClick === "function") {
        this.onClick(this.userProfile);
        return;
      }
      let key = "";
      const nip05 = this.getAttribute("nip05");
      const npub = this.getAttribute("npub");
      if (nip05) {
        key = nip05;
      } else if (npub) {
        key = npub;
      } else {
        return;
      }
      window.open(`https://njump.me/${key}`, "_blank");
    }
    attachEventListeners() {
      this.querySelector(".nostr-profile-badge-container")?.addEventListener("click", () => this.onProfileClick());
      this.querySelector("#npub-copy")?.addEventListener("click", (e) => {
        e.stopPropagation();
        this.copy(this.getAttribute("npub") || "");
      });
      this.querySelector("#nip05-copy")?.addEventListener("click", (e) => {
        e.stopPropagation();
        this.copy(this.userProfile.nip05 || "");
      });
    }
    render() {
      this.innerHTML = this.getStyles();
      if (this.userProfile === void 0 || this.userProfile.image === void 0 || this.userProfile.displayName === void 0 && this.userProfile.name === void 0) {
        this.isError = true;
      }
      const showFollow = this.getAttribute("show-follow") === "true";
      this.innerHTML += `
    <div class='nostr-profile-badge-container'>
      <div class='nostr-profile-badge-left-container'>
      ${this.isLoading ? '<div style="width: 35px; height: 35px; border-radius: 50%;" class="skeleton"></div>' : this.isError ? '<div class="error">&#9888;</div>' : `<img src='${this.userProfile.image}' alt='Nostr profile image of ${this.userProfile.displayName || this.userProfile.name}'/>`}
      </div>

      <div class='nostr-profile-badge-right-container'>
      ${this.isLoading ? `
          <div style="width: 70%; height: 10px; border-radius: 10px;" class="skeleton"></div>
          <div style="width: 80%; height: 8px; border-radius: 10px; margin-top: 5px;" class="skeleton"></div>
          ` : this.isError ? `
                <div class='error-container'>
                  <span class="error-text">Unable to load</span>
                </div>
                <div>
                  <small class="error-text" style="font-weight: normal">Please check console for more information</small>
                </div>
              ` : `
              <div class="name-container">
                <span class='nostr-profile-badge-name'>${this.userProfile.displayName || this.userProfile.name}</span>
                ${showFollow ? `
                    <nostr-follow-button
                      npub="${this.ndkUser.npub}"
                      icon-width="15"
                      icon-height="15"
                      theme="${this.theme}"
                    ></nostr-follow-button>
                  ` : ""}
              </div>
              ${Boolean(this.userProfile.nip05) ? `
                      <div class="nip05-container">
                        <span class='nostr-profile-badge-nip05'>${this.userProfile.nip05}</span>
                        <span id="nip05-copy" class="copy-button">&#x2398;</span>
                      </div>
                    ` : ""}

              ${this.renderNpub()}
              `}
      </div>
    </div>
    `;
      this.attachEventListeners();
    }
  };
  customElements.define("nostr-profile-badge", NostrProfileBadge);

  // node_modules/@glidejs/glide/dist/glide.esm.js
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) {
        symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2] != null ? arguments[i2] : {};
      if (i2 % 2) {
        ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _assertThisInitialized(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  function _possibleConstructorReturn(self2, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self2);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived), result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get2(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    }
    return _get.apply(this, arguments);
  }
  var defaults = {
    /**
     * Type of the movement.
     *
     * Available types:
     * `slider` - Rewinds slider to the start/end when it reaches the first or last slide.
     * `carousel` - Changes slides without starting over when it reaches the first or last slide.
     *
     * @type {String}
     */
    type: "slider",
    /**
     * Start at specific slide number defined with zero-based index.
     *
     * @type {Number}
     */
    startAt: 0,
    /**
     * A number of slides visible on the single viewport.
     *
     * @type {Number}
     */
    perView: 1,
    /**
     * Focus currently active slide at a specified position in the track.
     *
     * Available inputs:
     * `center` - Current slide will be always focused at the center of a track.
     * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
     *
     * @type {String|Number}
     */
    focusAt: 0,
    /**
     * A size of the gap added between slides.
     *
     * @type {Number}
     */
    gap: 10,
    /**
     * Change slides after a specified interval. Use `false` for turning off autoplay.
     *
     * @type {Number|Boolean}
     */
    autoplay: false,
    /**
     * Stop autoplay on mouseover event.
     *
     * @type {Boolean}
     */
    hoverpause: true,
    /**
     * Allow for changing slides with left and right keyboard arrows.
     *
     * @type {Boolean}
     */
    keyboard: true,
    /**
     * Stop running `perView` number of slides from the end. Use this
     * option if you don't want to have an empty space after
     * a slider. Works only with `slider` type and a
     * non-centered `focusAt` setting.
     *
     * @type {Boolean}
     */
    bound: false,
    /**
     * Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.
     *
     * @type {Number|Boolean}
     */
    swipeThreshold: 80,
    /**
     * Minimal mouse drag distance needed to change the slide. Use `false` for turning off a dragging.
     *
     * @type {Number|Boolean}
     */
    dragThreshold: 120,
    /**
     * A number of slides moved on single swipe.
     *
     * Available types:
     * `` - Moves slider by one slide per swipe
     * `|` - Moves slider between views per swipe (number of slides defined in `perView` options)
     *
     * @type {String}
     */
    perSwipe: "",
    /**
     * Moving distance ratio of the slides on a swiping and dragging.
     *
     * @type {Number}
     */
    touchRatio: 0.5,
    /**
     * Angle required to activate slides moving on swiping or dragging.
     *
     * @type {Number}
     */
    touchAngle: 45,
    /**
     * Duration of the animation in milliseconds.
     *
     * @type {Number}
     */
    animationDuration: 400,
    /**
     * Allows looping the `slider` type. Slider will rewind to the first/last slide when it's at the start/end.
     *
     * @type {Boolean}
     */
    rewind: true,
    /**
     * Duration of the rewinding animation of the `slider` type in milliseconds.
     *
     * @type {Number}
     */
    rewindDuration: 800,
    /**
     * Easing function for the animation.
     *
     * @type {String}
     */
    animationTimingFunc: "cubic-bezier(.165, .840, .440, 1)",
    /**
     * Wait for the animation to finish until the next user input can be processed
     *
     * @type {boolean}
     */
    waitForTransition: true,
    /**
     * Throttle costly events at most once per every wait milliseconds.
     *
     * @type {Number}
     */
    throttle: 10,
    /**
     * Moving direction mode.
     *
     * Available inputs:
     * - 'ltr' - left to right movement,
     * - 'rtl' - right to left movement.
     *
     * @type {String}
     */
    direction: "ltr",
    /**
     * The distance value of the next and previous viewports which
     * have to peek in the current view. Accepts number and
     * pixels as a string. Left and right peeking can be
     * set up separately with a directions object.
     *
     * For example:
     * `100` - Peek 100px on the both sides.
     * { before: 100, after: 50 }` - Peek 100px on the left side and 50px on the right side.
     *
     * @type {Number|String|Object}
     */
    peek: 0,
    /**
     * Defines how many clones of current viewport will be generated.
     *
     * @type {Number}
     */
    cloningRatio: 1,
    /**
     * Collection of options applied at specified media breakpoints.
     * For example: display two slides per view under 800px.
     * `{
     *   '800px': {
     *     perView: 2
     *   }
     * }`
     */
    breakpoints: {},
    /**
     * Collection of internally used HTML classes.
     *
     * @todo Refactor `slider` and `carousel` properties to single `type: { slider: '', carousel: '' }` object
     * @type {Object}
     */
    classes: {
      swipeable: "glide--swipeable",
      dragging: "glide--dragging",
      direction: {
        ltr: "glide--ltr",
        rtl: "glide--rtl"
      },
      type: {
        slider: "glide--slider",
        carousel: "glide--carousel"
      },
      slide: {
        clone: "glide__slide--clone",
        active: "glide__slide--active"
      },
      arrow: {
        disabled: "glide__arrow--disabled"
      },
      nav: {
        active: "glide__bullet--active"
      }
    }
  };
  function warn(msg) {
    console.error("[Glide warn]: ".concat(msg));
  }
  function toInt(value) {
    return parseInt(value);
  }
  function toFloat(value) {
    return parseFloat(value);
  }
  function isString(value) {
    return typeof value === "string";
  }
  function isObject(value) {
    var type = _typeof(value);
    return type === "function" || type === "object" && !!value;
  }
  function isFunction(value) {
    return typeof value === "function";
  }
  function isUndefined(value) {
    return typeof value === "undefined";
  }
  function isArray(value) {
    return value.constructor === Array;
  }
  function mount(glide, extensions, events) {
    var components = {};
    for (var name in extensions) {
      if (isFunction(extensions[name])) {
        components[name] = extensions[name](glide, components, events);
      } else {
        warn("Extension must be a function");
      }
    }
    for (var _name in components) {
      if (isFunction(components[_name].mount)) {
        components[_name].mount();
      }
    }
    return components;
  }
  function define2(obj, prop, definition) {
    Object.defineProperty(obj, prop, definition);
  }
  function sortKeys(obj) {
    return Object.keys(obj).sort().reduce(function(r, k) {
      r[k] = obj[k];
      return r[k], r;
    }, {});
  }
  function mergeOptions(defaults2, settings) {
    var options = Object.assign({}, defaults2, settings);
    if (settings.hasOwnProperty("classes")) {
      options.classes = Object.assign({}, defaults2.classes, settings.classes);
      var properties = ["direction", "type", "slide", "arrow", "nav"];
      properties.forEach(function(property) {
        if (settings.classes.hasOwnProperty(property)) {
          options.classes[property] = _objectSpread2(_objectSpread2({}, defaults2.classes[property]), settings.classes[property]);
        }
      });
    }
    if (settings.hasOwnProperty("breakpoints")) {
      options.breakpoints = Object.assign({}, defaults2.breakpoints, settings.breakpoints);
    }
    return options;
  }
  var EventsBus = /* @__PURE__ */ function() {
    function EventsBus2() {
      var events = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      _classCallCheck(this, EventsBus2);
      this.events = events;
      this.hop = events.hasOwnProperty;
    }
    _createClass(EventsBus2, [{
      key: "on",
      value: function on(event, handler) {
        if (isArray(event)) {
          for (var i2 = 0; i2 < event.length; i2++) {
            this.on(event[i2], handler);
          }
          return;
        }
        if (!this.hop.call(this.events, event)) {
          this.events[event] = [];
        }
        var index = this.events[event].push(handler) - 1;
        return {
          remove: function remove() {
            delete this.events[event][index];
          }
        };
      }
      /**
       * Runs registered handlers for specified event.
       *
       * @param {String|Array} event
       * @param {Object=} context
       */
    }, {
      key: "emit",
      value: function emit(event, context) {
        if (isArray(event)) {
          for (var i2 = 0; i2 < event.length; i2++) {
            this.emit(event[i2], context);
          }
          return;
        }
        if (!this.hop.call(this.events, event)) {
          return;
        }
        this.events[event].forEach(function(item) {
          item(context || {});
        });
      }
    }]);
    return EventsBus2;
  }();
  var Glide$1 = /* @__PURE__ */ function() {
    function Glide2(selector) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      _classCallCheck(this, Glide2);
      this._c = {};
      this._t = [];
      this._e = new EventsBus();
      this.disabled = false;
      this.selector = selector;
      this.settings = mergeOptions(defaults, options);
      this.index = this.settings.startAt;
    }
    _createClass(Glide2, [{
      key: "mount",
      value: function mount$1() {
        var extensions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        this._e.emit("mount.before");
        if (isObject(extensions)) {
          this._c = mount(this, extensions, this._e);
        } else {
          warn("You need to provide a object on `mount()`");
        }
        this._e.emit("mount.after");
        return this;
      }
      /**
       * Collects an instance `translate` transformers.
       *
       * @param  {Array} transformers Collection of transformers.
       * @return {Void}
       */
    }, {
      key: "mutate",
      value: function mutate() {
        var transformers = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        if (isArray(transformers)) {
          this._t = transformers;
        } else {
          warn("You need to provide a array on `mutate()`");
        }
        return this;
      }
      /**
       * Updates glide with specified settings.
       *
       * @param {Object} settings
       * @return {Glide}
       */
    }, {
      key: "update",
      value: function update() {
        var settings = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        this.settings = mergeOptions(this.settings, settings);
        if (settings.hasOwnProperty("startAt")) {
          this.index = settings.startAt;
        }
        this._e.emit("update");
        return this;
      }
      /**
       * Change slide with specified pattern. A pattern must be in the special format:
       * `>` - Move one forward
       * `<` - Move one backward
       * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
       * `>>` - Rewinds to end (last slide)
       * `<<` - Rewinds to start (first slide)
       * `|>` - Move one viewport forward
       * `|<` - Move one viewport backward
       *
       * @param {String} pattern
       * @return {Glide}
       */
    }, {
      key: "go",
      value: function go(pattern) {
        this._c.Run.make(pattern);
        return this;
      }
      /**
       * Move track by specified distance.
       *
       * @param {String} distance
       * @return {Glide}
       */
    }, {
      key: "move",
      value: function move(distance) {
        this._c.Transition.disable();
        this._c.Move.make(distance);
        return this;
      }
      /**
       * Destroy instance and revert all changes done by this._c.
       *
       * @return {Glide}
       */
    }, {
      key: "destroy",
      value: function destroy() {
        this._e.emit("destroy");
        return this;
      }
      /**
       * Start instance autoplaying.
       *
       * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
       * @return {Glide}
       */
    }, {
      key: "play",
      value: function play() {
        var interval = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        if (interval) {
          this.settings.autoplay = interval;
        }
        this._e.emit("play");
        return this;
      }
      /**
       * Stop instance autoplaying.
       *
       * @return {Glide}
       */
    }, {
      key: "pause",
      value: function pause() {
        this._e.emit("pause");
        return this;
      }
      /**
       * Sets glide into a idle status.
       *
       * @return {Glide}
       */
    }, {
      key: "disable",
      value: function disable() {
        this.disabled = true;
        return this;
      }
      /**
       * Sets glide into a active status.
       *
       * @return {Glide}
       */
    }, {
      key: "enable",
      value: function enable() {
        this.disabled = false;
        return this;
      }
      /**
       * Adds cuutom event listener with handler.
       *
       * @param  {String|Array} event
       * @param  {Function} handler
       * @return {Glide}
       */
    }, {
      key: "on",
      value: function on(event, handler) {
        this._e.on(event, handler);
        return this;
      }
      /**
       * Checks if glide is a precised type.
       *
       * @param  {String} name
       * @return {Boolean}
       */
    }, {
      key: "isType",
      value: function isType(name) {
        return this.settings.type === name;
      }
      /**
       * Gets value of the core options.
       *
       * @return {Object}
       */
    }, {
      key: "settings",
      get: function get() {
        return this._o;
      },
      set: function set(o) {
        if (isObject(o)) {
          this._o = o;
        } else {
          warn("Options must be an `object` instance.");
        }
      }
      /**
       * Gets current index of the slider.
       *
       * @return {Object}
       */
    }, {
      key: "index",
      get: function get() {
        return this._i;
      },
      set: function set(i2) {
        this._i = toInt(i2);
      }
      /**
       * Gets type name of the slider.
       *
       * @return {String}
       */
    }, {
      key: "type",
      get: function get() {
        return this.settings.type;
      }
      /**
       * Gets value of the idle status.
       *
       * @return {Boolean}
       */
    }, {
      key: "disabled",
      get: function get() {
        return this._d;
      },
      set: function set(status) {
        this._d = !!status;
      }
    }]);
    return Glide2;
  }();
  function Run(Glide2, Components, Events) {
    var Run2 = {
      /**
       * Initializes autorunning of the glide.
       *
       * @return {Void}
       */
      mount: function mount2() {
        this._o = false;
      },
      /**
       * Makes glides running based on the passed moving schema.
       *
       * @param {String} move
       */
      make: function make(move) {
        var _this = this;
        if (!Glide2.disabled) {
          !Glide2.settings.waitForTransition || Glide2.disable();
          this.move = move;
          Events.emit("run.before", this.move);
          this.calculate();
          Events.emit("run", this.move);
          Components.Transition.after(function() {
            if (_this.isStart()) {
              Events.emit("run.start", _this.move);
            }
            if (_this.isEnd()) {
              Events.emit("run.end", _this.move);
            }
            if (_this.isOffset()) {
              _this._o = false;
              Events.emit("run.offset", _this.move);
            }
            Events.emit("run.after", _this.move);
            Glide2.enable();
          });
        }
      },
      /**
       * Calculates current index based on defined move.
       *
       * @return {Number|Undefined}
       */
      calculate: function calculate() {
        var move = this.move, length = this.length;
        var steps = move.steps, direction = move.direction;
        var viewSize = 1;
        if (direction === "=") {
          if (Glide2.settings.bound && toInt(steps) > length) {
            Glide2.index = length;
            return;
          }
          Glide2.index = steps;
          return;
        }
        if (direction === ">" && steps === ">") {
          Glide2.index = length;
          return;
        }
        if (direction === "<" && steps === "<") {
          Glide2.index = 0;
          return;
        }
        if (direction === "|") {
          viewSize = Glide2.settings.perView || 1;
        }
        if (direction === ">" || direction === "|" && steps === ">") {
          var index = calculateForwardIndex(viewSize);
          if (index > length) {
            this._o = true;
          }
          Glide2.index = normalizeForwardIndex(index, viewSize);
          return;
        }
        if (direction === "<" || direction === "|" && steps === "<") {
          var _index = calculateBackwardIndex(viewSize);
          if (_index < 0) {
            this._o = true;
          }
          Glide2.index = normalizeBackwardIndex(_index, viewSize);
          return;
        }
        warn("Invalid direction pattern [".concat(direction).concat(steps, "] has been used"));
      },
      /**
       * Checks if we are on the first slide.
       *
       * @return {Boolean}
       */
      isStart: function isStart() {
        return Glide2.index <= 0;
      },
      /**
       * Checks if we are on the last slide.
       *
       * @return {Boolean}
       */
      isEnd: function isEnd() {
        return Glide2.index >= this.length;
      },
      /**
       * Checks if we are making a offset run.
       *
       * @param {String} direction
       * @return {Boolean}
       */
      isOffset: function isOffset() {
        var direction = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
        if (!direction) {
          return this._o;
        }
        if (!this._o) {
          return false;
        }
        if (direction === "|>") {
          return this.move.direction === "|" && this.move.steps === ">";
        }
        if (direction === "|<") {
          return this.move.direction === "|" && this.move.steps === "<";
        }
        return this.move.direction === direction;
      },
      /**
       * Checks if bound mode is active
       *
       * @return {Boolean}
       */
      isBound: function isBound() {
        return Glide2.isType("slider") && Glide2.settings.focusAt !== "center" && Glide2.settings.bound;
      }
    };
    function calculateForwardIndex(viewSize) {
      var index = Glide2.index;
      if (Glide2.isType("carousel")) {
        return index + viewSize;
      }
      return index + (viewSize - index % viewSize);
    }
    function normalizeForwardIndex(index, viewSize) {
      var length = Run2.length;
      if (index <= length) {
        return index;
      }
      if (Glide2.isType("carousel")) {
        return index - (length + 1);
      }
      if (Glide2.settings.rewind) {
        if (Run2.isBound() && !Run2.isEnd()) {
          return length;
        }
        return 0;
      }
      if (Run2.isBound()) {
        return length;
      }
      return Math.floor(length / viewSize) * viewSize;
    }
    function calculateBackwardIndex(viewSize) {
      var index = Glide2.index;
      if (Glide2.isType("carousel")) {
        return index - viewSize;
      }
      var view = Math.ceil(index / viewSize);
      return (view - 1) * viewSize;
    }
    function normalizeBackwardIndex(index, viewSize) {
      var length = Run2.length;
      if (index >= 0) {
        return index;
      }
      if (Glide2.isType("carousel")) {
        return index + (length + 1);
      }
      if (Glide2.settings.rewind) {
        if (Run2.isBound() && Run2.isStart()) {
          return length;
        }
        return Math.floor(length / viewSize) * viewSize;
      }
      return 0;
    }
    define2(Run2, "move", {
      /**
       * Gets value of the move schema.
       *
       * @returns {Object}
       */
      get: function get() {
        return this._m;
      },
      /**
       * Sets value of the move schema.
       *
       * @returns {Object}
       */
      set: function set(value) {
        var step = value.substr(1);
        this._m = {
          direction: value.substr(0, 1),
          steps: step ? toInt(step) ? toInt(step) : step : 0
        };
      }
    });
    define2(Run2, "length", {
      /**
       * Gets value of the running distance based
       * on zero-indexing number of slides.
       *
       * @return {Number}
       */
      get: function get() {
        var settings = Glide2.settings;
        var length = Components.Html.slides.length;
        if (this.isBound()) {
          return length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt);
        }
        return length - 1;
      }
    });
    define2(Run2, "offset", {
      /**
       * Gets status of the offsetting flag.
       *
       * @return {Boolean}
       */
      get: function get() {
        return this._o;
      }
    });
    return Run2;
  }
  function now2() {
    return (/* @__PURE__ */ new Date()).getTime();
  }
  function throttle(func, wait) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var timeout, context, args, result;
    var previous = 0;
    var later = function later2() {
      previous = options.leading === false ? 0 : now2();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    var throttled = function throttled2() {
      var at = now2();
      if (!previous && options.leading === false) previous = at;
      var remaining = wait - (at - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = at;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };
    return throttled;
  }
  var MARGIN_TYPE = {
    ltr: ["marginLeft", "marginRight"],
    rtl: ["marginRight", "marginLeft"]
  };
  function Gaps(Glide2, Components, Events) {
    var Gaps2 = {
      /**
       * Applies gaps between slides. First and last
       * slides do not receive it's edge margins.
       *
       * @param {HTMLCollection} slides
       * @return {Void}
       */
      apply: function apply(slides) {
        for (var i2 = 0, len = slides.length; i2 < len; i2++) {
          var style = slides[i2].style;
          var direction = Components.Direction.value;
          if (i2 !== 0) {
            style[MARGIN_TYPE[direction][0]] = "".concat(this.value / 2, "px");
          } else {
            style[MARGIN_TYPE[direction][0]] = "";
          }
          if (i2 !== slides.length - 1) {
            style[MARGIN_TYPE[direction][1]] = "".concat(this.value / 2, "px");
          } else {
            style[MARGIN_TYPE[direction][1]] = "";
          }
        }
      },
      /**
       * Removes gaps from the slides.
       *
       * @param {HTMLCollection} slides
       * @returns {Void}
      */
      remove: function remove(slides) {
        for (var i2 = 0, len = slides.length; i2 < len; i2++) {
          var style = slides[i2].style;
          style.marginLeft = "";
          style.marginRight = "";
        }
      }
    };
    define2(Gaps2, "value", {
      /**
       * Gets value of the gap.
       *
       * @returns {Number}
       */
      get: function get() {
        return toInt(Glide2.settings.gap);
      }
    });
    define2(Gaps2, "grow", {
      /**
       * Gets additional dimensions value caused by gaps.
       * Used to increase width of the slides wrapper.
       *
       * @returns {Number}
       */
      get: function get() {
        return Gaps2.value * Components.Sizes.length;
      }
    });
    define2(Gaps2, "reductor", {
      /**
       * Gets reduction value caused by gaps.
       * Used to subtract width of the slides.
       *
       * @returns {Number}
       */
      get: function get() {
        var perView = Glide2.settings.perView;
        return Gaps2.value * (perView - 1) / perView;
      }
    });
    Events.on(["build.after", "update"], throttle(function() {
      Gaps2.apply(Components.Html.wrapper.children);
    }, 30));
    Events.on("destroy", function() {
      Gaps2.remove(Components.Html.wrapper.children);
    });
    return Gaps2;
  }
  function siblings(node) {
    if (node && node.parentNode) {
      var n = node.parentNode.firstChild;
      var matched = [];
      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== node) {
          matched.push(n);
        }
      }
      return matched;
    }
    return [];
  }
  function toArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  }
  var TRACK_SELECTOR = '[data-glide-el="track"]';
  function Html(Glide2, Components, Events) {
    var Html2 = {
      /**
       * Setup slider HTML nodes.
       *
       * @param {Glide} glide
       */
      mount: function mount2() {
        this.root = Glide2.selector;
        this.track = this.root.querySelector(TRACK_SELECTOR);
        this.collectSlides();
      },
      /**
       * Collect slides
       */
      collectSlides: function collectSlides() {
        this.slides = toArray(this.wrapper.children).filter(function(slide) {
          return !slide.classList.contains(Glide2.settings.classes.slide.clone);
        });
      }
    };
    define2(Html2, "root", {
      /**
       * Gets node of the glide main element.
       *
       * @return {Object}
       */
      get: function get() {
        return Html2._r;
      },
      /**
       * Sets node of the glide main element.
       *
       * @return {Object}
       */
      set: function set(r) {
        if (isString(r)) {
          r = document.querySelector(r);
        }
        if (r !== null) {
          Html2._r = r;
        } else {
          warn("Root element must be a existing Html node");
        }
      }
    });
    define2(Html2, "track", {
      /**
       * Gets node of the glide track with slides.
       *
       * @return {Object}
       */
      get: function get() {
        return Html2._t;
      },
      /**
       * Sets node of the glide track with slides.
       *
       * @return {Object}
       */
      set: function set(t) {
        Html2._t = t;
      }
    });
    define2(Html2, "wrapper", {
      /**
       * Gets node of the slides wrapper.
       *
       * @return {Object}
       */
      get: function get() {
        return Html2.track.children[0];
      }
    });
    Events.on("update", function() {
      Html2.collectSlides();
    });
    return Html2;
  }
  function Peek(Glide2, Components, Events) {
    var Peek2 = {
      /**
       * Setups how much to peek based on settings.
       *
       * @return {Void}
       */
      mount: function mount2() {
        this.value = Glide2.settings.peek;
      }
    };
    define2(Peek2, "value", {
      /**
       * Gets value of the peek.
       *
       * @returns {Number|Object}
       */
      get: function get() {
        return Peek2._v;
      },
      /**
       * Sets value of the peek.
       *
       * @param {Number|Object} value
       * @return {Void}
       */
      set: function set(value) {
        if (isObject(value)) {
          value.before = toInt(value.before);
          value.after = toInt(value.after);
        } else {
          value = toInt(value);
        }
        Peek2._v = value;
      }
    });
    define2(Peek2, "reductor", {
      /**
       * Gets reduction value caused by peek.
       *
       * @returns {Number}
       */
      get: function get() {
        var value = Peek2.value;
        var perView = Glide2.settings.perView;
        if (isObject(value)) {
          return value.before / perView + value.after / perView;
        }
        return value * 2 / perView;
      }
    });
    Events.on(["resize", "update"], function() {
      Peek2.mount();
    });
    return Peek2;
  }
  function Move(Glide2, Components, Events) {
    var Move2 = {
      /**
       * Constructs move component.
       *
       * @returns {Void}
       */
      mount: function mount2() {
        this._o = 0;
      },
      /**
       * Calculates a movement value based on passed offset and currently active index.
       *
       * @param  {Number} offset
       * @return {Void}
       */
      make: function make() {
        var _this = this;
        var offset = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
        this.offset = offset;
        Events.emit("move", {
          movement: this.value
        });
        Components.Transition.after(function() {
          Events.emit("move.after", {
            movement: _this.value
          });
        });
      }
    };
    define2(Move2, "offset", {
      /**
       * Gets an offset value used to modify current translate.
       *
       * @return {Object}
       */
      get: function get() {
        return Move2._o;
      },
      /**
       * Sets an offset value used to modify current translate.
       *
       * @return {Object}
       */
      set: function set(value) {
        Move2._o = !isUndefined(value) ? toInt(value) : 0;
      }
    });
    define2(Move2, "translate", {
      /**
       * Gets a raw movement value.
       *
       * @return {Number}
       */
      get: function get() {
        return Components.Sizes.slideWidth * Glide2.index;
      }
    });
    define2(Move2, "value", {
      /**
       * Gets an actual movement value corrected by offset.
       *
       * @return {Number}
       */
      get: function get() {
        var offset = this.offset;
        var translate = this.translate;
        if (Components.Direction.is("rtl")) {
          return translate + offset;
        }
        return translate - offset;
      }
    });
    Events.on(["build.before", "run"], function() {
      Move2.make();
    });
    return Move2;
  }
  function Sizes(Glide2, Components, Events) {
    var Sizes2 = {
      /**
       * Setups dimensions of slides.
       *
       * @return {Void}
       */
      setupSlides: function setupSlides() {
        var width = "".concat(this.slideWidth, "px");
        var slides = Components.Html.slides;
        for (var i2 = 0; i2 < slides.length; i2++) {
          slides[i2].style.width = width;
        }
      },
      /**
       * Setups dimensions of slides wrapper.
       *
       * @return {Void}
       */
      setupWrapper: function setupWrapper() {
        Components.Html.wrapper.style.width = "".concat(this.wrapperSize, "px");
      },
      /**
       * Removes applied styles from HTML elements.
       *
       * @returns {Void}
       */
      remove: function remove() {
        var slides = Components.Html.slides;
        for (var i2 = 0; i2 < slides.length; i2++) {
          slides[i2].style.width = "";
        }
        Components.Html.wrapper.style.width = "";
      }
    };
    define2(Sizes2, "length", {
      /**
       * Gets count number of the slides.
       *
       * @return {Number}
       */
      get: function get() {
        return Components.Html.slides.length;
      }
    });
    define2(Sizes2, "width", {
      /**
       * Gets width value of the slider (visible area).
       *
       * @return {Number}
       */
      get: function get() {
        return Components.Html.track.offsetWidth;
      }
    });
    define2(Sizes2, "wrapperSize", {
      /**
       * Gets size of the slides wrapper.
       *
       * @return {Number}
       */
      get: function get() {
        return Sizes2.slideWidth * Sizes2.length + Components.Gaps.grow + Components.Clones.grow;
      }
    });
    define2(Sizes2, "slideWidth", {
      /**
       * Gets width value of a single slide.
       *
       * @return {Number}
       */
      get: function get() {
        return Sizes2.width / Glide2.settings.perView - Components.Peek.reductor - Components.Gaps.reductor;
      }
    });
    Events.on(["build.before", "resize", "update"], function() {
      Sizes2.setupSlides();
      Sizes2.setupWrapper();
    });
    Events.on("destroy", function() {
      Sizes2.remove();
    });
    return Sizes2;
  }
  function Build(Glide2, Components, Events) {
    var Build2 = {
      /**
       * Init glide building. Adds classes, sets
       * dimensions and setups initial state.
       *
       * @return {Void}
       */
      mount: function mount2() {
        Events.emit("build.before");
        this.typeClass();
        this.activeClass();
        Events.emit("build.after");
      },
      /**
       * Adds `type` class to the glide element.
       *
       * @return {Void}
       */
      typeClass: function typeClass() {
        Components.Html.root.classList.add(Glide2.settings.classes.type[Glide2.settings.type]);
      },
      /**
       * Sets active class to current slide.
       *
       * @return {Void}
       */
      activeClass: function activeClass() {
        var classes = Glide2.settings.classes;
        var slide = Components.Html.slides[Glide2.index];
        if (slide) {
          slide.classList.add(classes.slide.active);
          siblings(slide).forEach(function(sibling) {
            sibling.classList.remove(classes.slide.active);
          });
        }
      },
      /**
       * Removes HTML classes applied at building.
       *
       * @return {Void}
       */
      removeClasses: function removeClasses() {
        var _Glide$settings$class = Glide2.settings.classes, type = _Glide$settings$class.type, slide = _Glide$settings$class.slide;
        Components.Html.root.classList.remove(type[Glide2.settings.type]);
        Components.Html.slides.forEach(function(sibling) {
          sibling.classList.remove(slide.active);
        });
      }
    };
    Events.on(["destroy", "update"], function() {
      Build2.removeClasses();
    });
    Events.on(["resize", "update"], function() {
      Build2.mount();
    });
    Events.on("move.after", function() {
      Build2.activeClass();
    });
    return Build2;
  }
  function Clones(Glide2, Components, Events) {
    var Clones2 = {
      /**
       * Create pattern map and collect slides to be cloned.
       */
      mount: function mount2() {
        this.items = [];
        if (Glide2.isType("carousel")) {
          this.items = this.collect();
        }
      },
      /**
       * Collect clones with pattern.
       *
       * @return {[]}
       */
      collect: function collect() {
        var items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        var slides = Components.Html.slides;
        var _Glide$settings = Glide2.settings, perView = _Glide$settings.perView, classes = _Glide$settings.classes, cloningRatio = _Glide$settings.cloningRatio;
        if (slides.length > 0) {
          var peekIncrementer = +!!Glide2.settings.peek;
          var cloneCount = perView + peekIncrementer + Math.round(perView / 2);
          var append = slides.slice(0, cloneCount).reverse();
          var prepend = slides.slice(cloneCount * -1);
          for (var r = 0; r < Math.max(cloningRatio, Math.floor(perView / slides.length)); r++) {
            for (var i2 = 0; i2 < append.length; i2++) {
              var clone = append[i2].cloneNode(true);
              clone.classList.add(classes.slide.clone);
              items.push(clone);
            }
            for (var _i = 0; _i < prepend.length; _i++) {
              var _clone = prepend[_i].cloneNode(true);
              _clone.classList.add(classes.slide.clone);
              items.unshift(_clone);
            }
          }
        }
        return items;
      },
      /**
       * Append cloned slides with generated pattern.
       *
       * @return {Void}
       */
      append: function append() {
        var items = this.items;
        var _Components$Html = Components.Html, wrapper = _Components$Html.wrapper, slides = _Components$Html.slides;
        var half = Math.floor(items.length / 2);
        var prepend = items.slice(0, half).reverse();
        var append2 = items.slice(half * -1).reverse();
        var width = "".concat(Components.Sizes.slideWidth, "px");
        for (var i2 = 0; i2 < append2.length; i2++) {
          wrapper.appendChild(append2[i2]);
        }
        for (var _i2 = 0; _i2 < prepend.length; _i2++) {
          wrapper.insertBefore(prepend[_i2], slides[0]);
        }
        for (var _i3 = 0; _i3 < items.length; _i3++) {
          items[_i3].style.width = width;
        }
      },
      /**
       * Remove all cloned slides.
       *
       * @return {Void}
       */
      remove: function remove() {
        var items = this.items;
        for (var i2 = 0; i2 < items.length; i2++) {
          Components.Html.wrapper.removeChild(items[i2]);
        }
      }
    };
    define2(Clones2, "grow", {
      /**
       * Gets additional dimensions value caused by clones.
       *
       * @return {Number}
       */
      get: function get() {
        return (Components.Sizes.slideWidth + Components.Gaps.value) * Clones2.items.length;
      }
    });
    Events.on("update", function() {
      Clones2.remove();
      Clones2.mount();
      Clones2.append();
    });
    Events.on("build.before", function() {
      if (Glide2.isType("carousel")) {
        Clones2.append();
      }
    });
    Events.on("destroy", function() {
      Clones2.remove();
    });
    return Clones2;
  }
  var EventsBinder = /* @__PURE__ */ function() {
    function EventsBinder2() {
      var listeners = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      _classCallCheck(this, EventsBinder2);
      this.listeners = listeners;
    }
    _createClass(EventsBinder2, [{
      key: "on",
      value: function on(events, el, closure) {
        var capture = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
        if (isString(events)) {
          events = [events];
        }
        for (var i2 = 0; i2 < events.length; i2++) {
          this.listeners[events[i2]] = closure;
          el.addEventListener(events[i2], this.listeners[events[i2]], capture);
        }
      }
      /**
       * Removes event listeners from arrows HTML elements.
       *
       * @param  {String|Array} events
       * @param  {Element|Window|Document} el
       * @param  {Boolean|Object} capture
       * @return {Void}
       */
    }, {
      key: "off",
      value: function off(events, el) {
        var capture = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        if (isString(events)) {
          events = [events];
        }
        for (var i2 = 0; i2 < events.length; i2++) {
          el.removeEventListener(events[i2], this.listeners[events[i2]], capture);
        }
      }
      /**
       * Destroy collected listeners.
       *
       * @returns {Void}
       */
    }, {
      key: "destroy",
      value: function destroy() {
        delete this.listeners;
      }
    }]);
    return EventsBinder2;
  }();
  function Resize(Glide2, Components, Events) {
    var Binder = new EventsBinder();
    var Resize2 = {
      /**
       * Initializes window bindings.
       */
      mount: function mount2() {
        this.bind();
      },
      /**
       * Binds `rezsize` listener to the window.
       * It's a costly event, so we are debouncing it.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on("resize", window, throttle(function() {
          Events.emit("resize");
        }, Glide2.settings.throttle));
      },
      /**
       * Unbinds listeners from the window.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off("resize", window);
      }
    };
    Events.on("destroy", function() {
      Resize2.unbind();
      Binder.destroy();
    });
    return Resize2;
  }
  var VALID_DIRECTIONS = ["ltr", "rtl"];
  var FLIPED_MOVEMENTS = {
    ">": "<",
    "<": ">",
    "=": "="
  };
  function Direction(Glide2, Components, Events) {
    var Direction2 = {
      /**
       * Setups gap value based on settings.
       *
       * @return {Void}
       */
      mount: function mount2() {
        this.value = Glide2.settings.direction;
      },
      /**
       * Resolves pattern based on direction value
       *
       * @param {String} pattern
       * @returns {String}
       */
      resolve: function resolve(pattern) {
        var token = pattern.slice(0, 1);
        if (this.is("rtl")) {
          return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
        }
        return pattern;
      },
      /**
       * Checks value of direction mode.
       *
       * @param {String} direction
       * @returns {Boolean}
       */
      is: function is(direction) {
        return this.value === direction;
      },
      /**
       * Applies direction class to the root HTML element.
       *
       * @return {Void}
       */
      addClass: function addClass() {
        Components.Html.root.classList.add(Glide2.settings.classes.direction[this.value]);
      },
      /**
       * Removes direction class from the root HTML element.
       *
       * @return {Void}
       */
      removeClass: function removeClass() {
        Components.Html.root.classList.remove(Glide2.settings.classes.direction[this.value]);
      }
    };
    define2(Direction2, "value", {
      /**
       * Gets value of the direction.
       *
       * @returns {Number}
       */
      get: function get() {
        return Direction2._v;
      },
      /**
       * Sets value of the direction.
       *
       * @param {String} value
       * @return {Void}
       */
      set: function set(value) {
        if (VALID_DIRECTIONS.indexOf(value) > -1) {
          Direction2._v = value;
        } else {
          warn("Direction value must be `ltr` or `rtl`");
        }
      }
    });
    Events.on(["destroy", "update"], function() {
      Direction2.removeClass();
    });
    Events.on("update", function() {
      Direction2.mount();
    });
    Events.on(["build.before", "update"], function() {
      Direction2.addClass();
    });
    return Direction2;
  }
  function Rtl(Glide2, Components) {
    return {
      /**
       * Negates the passed translate if glide is in RTL option.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        if (Components.Direction.is("rtl")) {
          return -translate;
        }
        return translate;
      }
    };
  }
  function Gap(Glide2, Components) {
    return {
      /**
       * Modifies passed translate value with number in the `gap` settings.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        var multiplier = Math.floor(translate / Components.Sizes.slideWidth);
        return translate + Components.Gaps.value * multiplier;
      }
    };
  }
  function Grow(Glide2, Components) {
    return {
      /**
       * Adds to the passed translate width of the half of clones.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        return translate + Components.Clones.grow / 2;
      }
    };
  }
  function Peeking(Glide2, Components) {
    return {
      /**
       * Modifies passed translate value with a `peek` setting.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        if (Glide2.settings.focusAt >= 0) {
          var peek = Components.Peek.value;
          if (isObject(peek)) {
            return translate - peek.before;
          }
          return translate - peek;
        }
        return translate;
      }
    };
  }
  function Focusing(Glide2, Components) {
    return {
      /**
       * Modifies passed translate value with index in the `focusAt` setting.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        var gap = Components.Gaps.value;
        var width = Components.Sizes.width;
        var focusAt = Glide2.settings.focusAt;
        var slideWidth = Components.Sizes.slideWidth;
        if (focusAt === "center") {
          return translate - (width / 2 - slideWidth / 2);
        }
        return translate - slideWidth * focusAt - gap * focusAt;
      }
    };
  }
  function mutator(Glide2, Components, Events) {
    var TRANSFORMERS = [Gap, Grow, Peeking, Focusing].concat(Glide2._t, [Rtl]);
    return {
      /**
       * Piplines translate value with registered transformers.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      mutate: function mutate(translate) {
        for (var i2 = 0; i2 < TRANSFORMERS.length; i2++) {
          var transformer = TRANSFORMERS[i2];
          if (isFunction(transformer) && isFunction(transformer().modify)) {
            translate = transformer(Glide2, Components, Events).modify(translate);
          } else {
            warn("Transformer should be a function that returns an object with `modify()` method");
          }
        }
        return translate;
      }
    };
  }
  function Translate(Glide2, Components, Events) {
    var Translate2 = {
      /**
       * Sets value of translate on HTML element.
       *
       * @param {Number} value
       * @return {Void}
       */
      set: function set(value) {
        var transform = mutator(Glide2, Components).mutate(value);
        var translate3d = "translate3d(".concat(-1 * transform, "px, 0px, 0px)");
        Components.Html.wrapper.style.mozTransform = translate3d;
        Components.Html.wrapper.style.webkitTransform = translate3d;
        Components.Html.wrapper.style.transform = translate3d;
      },
      /**
       * Removes value of translate from HTML element.
       *
       * @return {Void}
       */
      remove: function remove() {
        Components.Html.wrapper.style.transform = "";
      },
      /**
       * @return {number}
       */
      getStartIndex: function getStartIndex() {
        var length = Components.Sizes.length;
        var index = Glide2.index;
        var perView = Glide2.settings.perView;
        if (Components.Run.isOffset(">") || Components.Run.isOffset("|>")) {
          return length + (index - perView);
        }
        return (index + perView) % length;
      },
      /**
       * @return {number}
       */
      getTravelDistance: function getTravelDistance() {
        var travelDistance = Components.Sizes.slideWidth * Glide2.settings.perView;
        if (Components.Run.isOffset(">") || Components.Run.isOffset("|>")) {
          return travelDistance * -1;
        }
        return travelDistance;
      }
    };
    Events.on("move", function(context) {
      if (!Glide2.isType("carousel") || !Components.Run.isOffset()) {
        return Translate2.set(context.movement);
      }
      Components.Transition.after(function() {
        Events.emit("translate.jump");
        Translate2.set(Components.Sizes.slideWidth * Glide2.index);
      });
      var startWidth = Components.Sizes.slideWidth * Components.Translate.getStartIndex();
      return Translate2.set(startWidth - Components.Translate.getTravelDistance());
    });
    Events.on("destroy", function() {
      Translate2.remove();
    });
    return Translate2;
  }
  function Transition(Glide2, Components, Events) {
    var disabled = false;
    var Transition2 = {
      /**
       * Composes string of the CSS transition.
       *
       * @param {String} property
       * @return {String}
       */
      compose: function compose(property) {
        var settings = Glide2.settings;
        if (disabled) {
          return "".concat(property, " 0ms ").concat(settings.animationTimingFunc);
        }
        return "".concat(property, " ").concat(this.duration, "ms ").concat(settings.animationTimingFunc);
      },
      /**
       * Sets value of transition on HTML element.
       *
       * @param {String=} property
       * @return {Void}
       */
      set: function set() {
        var property = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "transform";
        Components.Html.wrapper.style.transition = this.compose(property);
      },
      /**
       * Removes value of transition from HTML element.
       *
       * @return {Void}
       */
      remove: function remove() {
        Components.Html.wrapper.style.transition = "";
      },
      /**
       * Runs callback after animation.
       *
       * @param  {Function} callback
       * @return {Void}
       */
      after: function after(callback) {
        setTimeout(function() {
          callback();
        }, this.duration);
      },
      /**
       * Enable transition.
       *
       * @return {Void}
       */
      enable: function enable() {
        disabled = false;
        this.set();
      },
      /**
       * Disable transition.
       *
       * @return {Void}
       */
      disable: function disable() {
        disabled = true;
        this.set();
      }
    };
    define2(Transition2, "duration", {
      /**
       * Gets duration of the transition based
       * on currently running animation type.
       *
       * @return {Number}
       */
      get: function get() {
        var settings = Glide2.settings;
        if (Glide2.isType("slider") && Components.Run.offset) {
          return settings.rewindDuration;
        }
        return settings.animationDuration;
      }
    });
    Events.on("move", function() {
      Transition2.set();
    });
    Events.on(["build.before", "resize", "translate.jump"], function() {
      Transition2.disable();
    });
    Events.on("run", function() {
      Transition2.enable();
    });
    Events.on("destroy", function() {
      Transition2.remove();
    });
    return Transition2;
  }
  var supportsPassive = false;
  try {
    opts = Object.defineProperty({}, "passive", {
      get: function get() {
        supportsPassive = true;
      }
    });
    window.addEventListener("testPassive", null, opts);
    window.removeEventListener("testPassive", null, opts);
  } catch (e) {
  }
  var opts;
  var supportsPassive$1 = supportsPassive;
  var START_EVENTS = ["touchstart", "mousedown"];
  var MOVE_EVENTS = ["touchmove", "mousemove"];
  var END_EVENTS = ["touchend", "touchcancel", "mouseup", "mouseleave"];
  var MOUSE_EVENTS = ["mousedown", "mousemove", "mouseup", "mouseleave"];
  function Swipe(Glide2, Components, Events) {
    var Binder = new EventsBinder();
    var swipeSin = 0;
    var swipeStartX = 0;
    var swipeStartY = 0;
    var disabled = false;
    var capture = supportsPassive$1 ? {
      passive: true
    } : false;
    var Swipe2 = {
      /**
       * Initializes swipe bindings.
       *
       * @return {Void}
       */
      mount: function mount2() {
        this.bindSwipeStart();
      },
      /**
       * Handler for `swipestart` event. Calculates entry points of the user's tap.
       *
       * @param {Object} event
       * @return {Void}
       */
      start: function start(event) {
        if (!disabled && !Glide2.disabled) {
          this.disable();
          var swipe = this.touches(event);
          swipeSin = null;
          swipeStartX = toInt(swipe.pageX);
          swipeStartY = toInt(swipe.pageY);
          this.bindSwipeMove();
          this.bindSwipeEnd();
          Events.emit("swipe.start");
        }
      },
      /**
       * Handler for `swipemove` event. Calculates user's tap angle and distance.
       *
       * @param {Object} event
       */
      move: function move(event) {
        if (!Glide2.disabled) {
          var _Glide$settings = Glide2.settings, touchAngle = _Glide$settings.touchAngle, touchRatio = _Glide$settings.touchRatio, classes = _Glide$settings.classes;
          var swipe = this.touches(event);
          var subExSx = toInt(swipe.pageX) - swipeStartX;
          var subEySy = toInt(swipe.pageY) - swipeStartY;
          var powEX = Math.abs(subExSx << 2);
          var powEY = Math.abs(subEySy << 2);
          var swipeHypotenuse = Math.sqrt(powEX + powEY);
          var swipeCathetus = Math.sqrt(powEY);
          swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);
          if (swipeSin * 180 / Math.PI < touchAngle) {
            event.stopPropagation();
            Components.Move.make(subExSx * toFloat(touchRatio));
            Components.Html.root.classList.add(classes.dragging);
            Events.emit("swipe.move");
          } else {
            return false;
          }
        }
      },
      /**
       * Handler for `swipeend` event. Finitializes user's tap and decides about glide move.
       *
       * @param {Object} event
       * @return {Void}
       */
      end: function end(event) {
        if (!Glide2.disabled) {
          var _Glide$settings2 = Glide2.settings, perSwipe = _Glide$settings2.perSwipe, touchAngle = _Glide$settings2.touchAngle, classes = _Glide$settings2.classes;
          var swipe = this.touches(event);
          var threshold = this.threshold(event);
          var swipeDistance = swipe.pageX - swipeStartX;
          var swipeDeg = swipeSin * 180 / Math.PI;
          this.enable();
          if (swipeDistance > threshold && swipeDeg < touchAngle) {
            Components.Run.make(Components.Direction.resolve("".concat(perSwipe, "<")));
          } else if (swipeDistance < -threshold && swipeDeg < touchAngle) {
            Components.Run.make(Components.Direction.resolve("".concat(perSwipe, ">")));
          } else {
            Components.Move.make();
          }
          Components.Html.root.classList.remove(classes.dragging);
          this.unbindSwipeMove();
          this.unbindSwipeEnd();
          Events.emit("swipe.end");
        }
      },
      /**
       * Binds swipe's starting event.
       *
       * @return {Void}
       */
      bindSwipeStart: function bindSwipeStart() {
        var _this = this;
        var _Glide$settings3 = Glide2.settings, swipeThreshold = _Glide$settings3.swipeThreshold, dragThreshold = _Glide$settings3.dragThreshold;
        if (swipeThreshold) {
          Binder.on(START_EVENTS[0], Components.Html.wrapper, function(event) {
            _this.start(event);
          }, capture);
        }
        if (dragThreshold) {
          Binder.on(START_EVENTS[1], Components.Html.wrapper, function(event) {
            _this.start(event);
          }, capture);
        }
      },
      /**
       * Unbinds swipe's starting event.
       *
       * @return {Void}
       */
      unbindSwipeStart: function unbindSwipeStart() {
        Binder.off(START_EVENTS[0], Components.Html.wrapper, capture);
        Binder.off(START_EVENTS[1], Components.Html.wrapper, capture);
      },
      /**
       * Binds swipe's moving event.
       *
       * @return {Void}
       */
      bindSwipeMove: function bindSwipeMove() {
        var _this2 = this;
        Binder.on(MOVE_EVENTS, Components.Html.wrapper, throttle(function(event) {
          _this2.move(event);
        }, Glide2.settings.throttle), capture);
      },
      /**
       * Unbinds swipe's moving event.
       *
       * @return {Void}
       */
      unbindSwipeMove: function unbindSwipeMove() {
        Binder.off(MOVE_EVENTS, Components.Html.wrapper, capture);
      },
      /**
       * Binds swipe's ending event.
       *
       * @return {Void}
       */
      bindSwipeEnd: function bindSwipeEnd() {
        var _this3 = this;
        Binder.on(END_EVENTS, Components.Html.wrapper, function(event) {
          _this3.end(event);
        });
      },
      /**
       * Unbinds swipe's ending event.
       *
       * @return {Void}
       */
      unbindSwipeEnd: function unbindSwipeEnd() {
        Binder.off(END_EVENTS, Components.Html.wrapper);
      },
      /**
       * Normalizes event touches points accorting to different types.
       *
       * @param {Object} event
       */
      touches: function touches(event) {
        if (MOUSE_EVENTS.indexOf(event.type) > -1) {
          return event;
        }
        return event.touches[0] || event.changedTouches[0];
      },
      /**
       * Gets value of minimum swipe distance settings based on event type.
       *
       * @return {Number}
       */
      threshold: function threshold(event) {
        var settings = Glide2.settings;
        if (MOUSE_EVENTS.indexOf(event.type) > -1) {
          return settings.dragThreshold;
        }
        return settings.swipeThreshold;
      },
      /**
       * Enables swipe event.
       *
       * @return {self}
       */
      enable: function enable() {
        disabled = false;
        Components.Transition.enable();
        return this;
      },
      /**
       * Disables swipe event.
       *
       * @return {self}
       */
      disable: function disable() {
        disabled = true;
        Components.Transition.disable();
        return this;
      }
    };
    Events.on("build.after", function() {
      Components.Html.root.classList.add(Glide2.settings.classes.swipeable);
    });
    Events.on("destroy", function() {
      Swipe2.unbindSwipeStart();
      Swipe2.unbindSwipeMove();
      Swipe2.unbindSwipeEnd();
      Binder.destroy();
    });
    return Swipe2;
  }
  function Images(Glide2, Components, Events) {
    var Binder = new EventsBinder();
    var Images2 = {
      /**
       * Binds listener to glide wrapper.
       *
       * @return {Void}
       */
      mount: function mount2() {
        this.bind();
      },
      /**
       * Binds `dragstart` event on wrapper to prevent dragging images.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on("dragstart", Components.Html.wrapper, this.dragstart);
      },
      /**
       * Unbinds `dragstart` event on wrapper.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off("dragstart", Components.Html.wrapper);
      },
      /**
       * Event handler. Prevents dragging.
       *
       * @return {Void}
       */
      dragstart: function dragstart(event) {
        event.preventDefault();
      }
    };
    Events.on("destroy", function() {
      Images2.unbind();
      Binder.destroy();
    });
    return Images2;
  }
  function Anchors(Glide2, Components, Events) {
    var Binder = new EventsBinder();
    var detached = false;
    var prevented = false;
    var Anchors2 = {
      /**
       * Setups a initial state of anchors component.
       *
       * @returns {Void}
       */
      mount: function mount2() {
        this._a = Components.Html.wrapper.querySelectorAll("a");
        this.bind();
      },
      /**
       * Binds events to anchors inside a track.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on("click", Components.Html.wrapper, this.click);
      },
      /**
       * Unbinds events attached to anchors inside a track.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off("click", Components.Html.wrapper);
      },
      /**
       * Handler for click event. Prevents clicks when glide is in `prevent` status.
       *
       * @param  {Object} event
       * @return {Void}
       */
      click: function click(event) {
        if (prevented) {
          event.stopPropagation();
          event.preventDefault();
        }
      },
      /**
       * Detaches anchors click event inside glide.
       *
       * @return {self}
       */
      detach: function detach() {
        prevented = true;
        if (!detached) {
          for (var i2 = 0; i2 < this.items.length; i2++) {
            this.items[i2].draggable = false;
          }
          detached = true;
        }
        return this;
      },
      /**
       * Attaches anchors click events inside glide.
       *
       * @return {self}
       */
      attach: function attach() {
        prevented = false;
        if (detached) {
          for (var i2 = 0; i2 < this.items.length; i2++) {
            this.items[i2].draggable = true;
          }
          detached = false;
        }
        return this;
      }
    };
    define2(Anchors2, "items", {
      /**
       * Gets collection of the arrows HTML elements.
       *
       * @return {HTMLElement[]}
       */
      get: function get() {
        return Anchors2._a;
      }
    });
    Events.on("swipe.move", function() {
      Anchors2.detach();
    });
    Events.on("swipe.end", function() {
      Components.Transition.after(function() {
        Anchors2.attach();
      });
    });
    Events.on("destroy", function() {
      Anchors2.attach();
      Anchors2.unbind();
      Binder.destroy();
    });
    return Anchors2;
  }
  var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
  var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';
  var PREVIOUS_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, ' [data-glide-dir*="<"]');
  var NEXT_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, ' [data-glide-dir*=">"]');
  function Controls(Glide2, Components, Events) {
    var Binder = new EventsBinder();
    var capture = supportsPassive$1 ? {
      passive: true
    } : false;
    var Controls2 = {
      /**
       * Inits arrows. Binds events listeners
       * to the arrows HTML elements.
       *
       * @return {Void}
       */
      mount: function mount2() {
        this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);
        this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);
        this._arrowControls = {
          previous: Components.Html.root.querySelectorAll(PREVIOUS_CONTROLS_SELECTOR),
          next: Components.Html.root.querySelectorAll(NEXT_CONTROLS_SELECTOR)
        };
        this.addBindings();
      },
      /**
       * Sets active class to current slide.
       *
       * @return {Void}
       */
      setActive: function setActive() {
        for (var i2 = 0; i2 < this._n.length; i2++) {
          this.addClass(this._n[i2].children);
        }
      },
      /**
       * Removes active class to current slide.
       *
       * @return {Void}
       */
      removeActive: function removeActive() {
        for (var i2 = 0; i2 < this._n.length; i2++) {
          this.removeClass(this._n[i2].children);
        }
      },
      /**
       * Toggles active class on items inside navigation.
       *
       * @param  {HTMLElement} controls
       * @return {Void}
       */
      addClass: function addClass(controls) {
        var settings = Glide2.settings;
        var item = controls[Glide2.index];
        if (!item) {
          return;
        }
        item.classList.add(settings.classes.nav.active);
        siblings(item).forEach(function(sibling) {
          sibling.classList.remove(settings.classes.nav.active);
        });
      },
      /**
       * Removes active class from active control.
       *
       * @param  {HTMLElement} controls
       * @return {Void}
       */
      removeClass: function removeClass(controls) {
        var item = controls[Glide2.index];
        item === null || item === void 0 ? void 0 : item.classList.remove(Glide2.settings.classes.nav.active);
      },
      /**
       * Calculates, removes or adds `Glide.settings.classes.disabledArrow` class on the control arrows
       */
      setArrowState: function setArrowState() {
        if (Glide2.settings.rewind) {
          return;
        }
        var next = Controls2._arrowControls.next;
        var previous = Controls2._arrowControls.previous;
        this.resetArrowState(next, previous);
        if (Glide2.index === 0) {
          this.disableArrow(previous);
        }
        if (Glide2.index === Components.Run.length) {
          this.disableArrow(next);
        }
      },
      /**
       * Removes `Glide.settings.classes.disabledArrow` from given NodeList elements
       *
       * @param {NodeList[]} lists
       */
      resetArrowState: function resetArrowState() {
        var settings = Glide2.settings;
        for (var _len = arguments.length, lists = new Array(_len), _key = 0; _key < _len; _key++) {
          lists[_key] = arguments[_key];
        }
        lists.forEach(function(list) {
          toArray(list).forEach(function(element) {
            element.classList.remove(settings.classes.arrow.disabled);
          });
        });
      },
      /**
       * Adds `Glide.settings.classes.disabledArrow` to given NodeList elements
       *
       * @param {NodeList[]} lists
       */
      disableArrow: function disableArrow() {
        var settings = Glide2.settings;
        for (var _len2 = arguments.length, lists = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          lists[_key2] = arguments[_key2];
        }
        lists.forEach(function(list) {
          toArray(list).forEach(function(element) {
            element.classList.add(settings.classes.arrow.disabled);
          });
        });
      },
      /**
       * Adds handles to the each group of controls.
       *
       * @return {Void}
       */
      addBindings: function addBindings() {
        for (var i2 = 0; i2 < this._c.length; i2++) {
          this.bind(this._c[i2].children);
        }
      },
      /**
       * Removes handles from the each group of controls.
       *
       * @return {Void}
       */
      removeBindings: function removeBindings() {
        for (var i2 = 0; i2 < this._c.length; i2++) {
          this.unbind(this._c[i2].children);
        }
      },
      /**
       * Binds events to arrows HTML elements.
       *
       * @param {HTMLCollection} elements
       * @return {Void}
       */
      bind: function bind(elements) {
        for (var i2 = 0; i2 < elements.length; i2++) {
          Binder.on("click", elements[i2], this.click);
          Binder.on("touchstart", elements[i2], this.click, capture);
        }
      },
      /**
       * Unbinds events binded to the arrows HTML elements.
       *
       * @param {HTMLCollection} elements
       * @return {Void}
       */
      unbind: function unbind(elements) {
        for (var i2 = 0; i2 < elements.length; i2++) {
          Binder.off(["click", "touchstart"], elements[i2]);
        }
      },
      /**
       * Handles `click` event on the arrows HTML elements.
       * Moves slider in direction given via the
       * `data-glide-dir` attribute.
       *
       * @param {Object} event
       * @return {void}
       */
      click: function click(event) {
        if (!supportsPassive$1 && event.type === "touchstart") {
          event.preventDefault();
        }
        var direction = event.currentTarget.getAttribute("data-glide-dir");
        Components.Run.make(Components.Direction.resolve(direction));
      }
    };
    define2(Controls2, "items", {
      /**
       * Gets collection of the controls HTML elements.
       *
       * @return {HTMLElement[]}
       */
      get: function get() {
        return Controls2._c;
      }
    });
    Events.on(["mount.after", "move.after"], function() {
      Controls2.setActive();
    });
    Events.on(["mount.after", "run"], function() {
      Controls2.setArrowState();
    });
    Events.on("destroy", function() {
      Controls2.removeBindings();
      Controls2.removeActive();
      Binder.destroy();
    });
    return Controls2;
  }
  function Keyboard(Glide2, Components, Events) {
    var Binder = new EventsBinder();
    var Keyboard2 = {
      /**
       * Binds keyboard events on component mount.
       *
       * @return {Void}
       */
      mount: function mount2() {
        if (Glide2.settings.keyboard) {
          this.bind();
        }
      },
      /**
       * Adds keyboard press events.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on("keyup", document, this.press);
      },
      /**
       * Removes keyboard press events.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off("keyup", document);
      },
      /**
       * Handles keyboard's arrows press and moving glide foward and backward.
       *
       * @param  {Object} event
       * @return {Void}
       */
      press: function press(event) {
        var perSwipe = Glide2.settings.perSwipe;
        var arrowSymbols = {
          ArrowRight: ">",
          ArrowLeft: "<"
        };
        if (["ArrowRight", "ArrowLeft"].includes(event.code)) {
          Components.Run.make(Components.Direction.resolve("".concat(perSwipe).concat(arrowSymbols[event.code])));
        }
      }
    };
    Events.on(["destroy", "update"], function() {
      Keyboard2.unbind();
    });
    Events.on("update", function() {
      Keyboard2.mount();
    });
    Events.on("destroy", function() {
      Binder.destroy();
    });
    return Keyboard2;
  }
  function Autoplay(Glide2, Components, Events) {
    var Binder = new EventsBinder();
    var Autoplay2 = {
      /**
       * Initializes autoplaying and events.
       *
       * @return {Void}
       */
      mount: function mount2() {
        this.enable();
        this.start();
        if (Glide2.settings.hoverpause) {
          this.bind();
        }
      },
      /**
       * Enables autoplaying
       *
       * @returns {Void}
       */
      enable: function enable() {
        this._e = true;
      },
      /**
       * Disables autoplaying.
       *
       * @returns {Void}
       */
      disable: function disable() {
        this._e = false;
      },
      /**
       * Starts autoplaying in configured interval.
       *
       * @param {Boolean|Number} force Run autoplaying with passed interval regardless of `autoplay` settings
       * @return {Void}
       */
      start: function start() {
        var _this = this;
        if (!this._e) {
          return;
        }
        this.enable();
        if (Glide2.settings.autoplay) {
          if (isUndefined(this._i)) {
            this._i = setInterval(function() {
              _this.stop();
              Components.Run.make(">");
              _this.start();
              Events.emit("autoplay");
            }, this.time);
          }
        }
      },
      /**
       * Stops autorunning of the glide.
       *
       * @return {Void}
       */
      stop: function stop() {
        this._i = clearInterval(this._i);
      },
      /**
       * Stops autoplaying while mouse is over glide's area.
       *
       * @return {Void}
       */
      bind: function bind() {
        var _this2 = this;
        Binder.on("mouseover", Components.Html.root, function() {
          if (_this2._e) {
            _this2.stop();
          }
        });
        Binder.on("mouseout", Components.Html.root, function() {
          if (_this2._e) {
            _this2.start();
          }
        });
      },
      /**
       * Unbind mouseover events.
       *
       * @returns {Void}
       */
      unbind: function unbind() {
        Binder.off(["mouseover", "mouseout"], Components.Html.root);
      }
    };
    define2(Autoplay2, "time", {
      /**
       * Gets time period value for the autoplay interval. Prioritizes
       * times in `data-glide-autoplay` attrubutes over options.
       *
       * @return {Number}
       */
      get: function get() {
        var autoplay = Components.Html.slides[Glide2.index].getAttribute("data-glide-autoplay");
        if (autoplay) {
          return toInt(autoplay);
        }
        return toInt(Glide2.settings.autoplay);
      }
    });
    Events.on(["destroy", "update"], function() {
      Autoplay2.unbind();
    });
    Events.on(["run.before", "swipe.start", "update"], function() {
      Autoplay2.stop();
    });
    Events.on(["pause", "destroy"], function() {
      Autoplay2.disable();
      Autoplay2.stop();
    });
    Events.on(["run.after", "swipe.end"], function() {
      Autoplay2.start();
    });
    Events.on(["play"], function() {
      Autoplay2.enable();
      Autoplay2.start();
    });
    Events.on("update", function() {
      Autoplay2.mount();
    });
    Events.on("destroy", function() {
      Binder.destroy();
    });
    return Autoplay2;
  }
  function sortBreakpoints(points) {
    if (isObject(points)) {
      return sortKeys(points);
    } else {
      warn("Breakpoints option must be an object");
    }
    return {};
  }
  function Breakpoints(Glide2, Components, Events) {
    var Binder = new EventsBinder();
    var settings = Glide2.settings;
    var points = sortBreakpoints(settings.breakpoints);
    var defaults2 = Object.assign({}, settings);
    var Breakpoints2 = {
      /**
       * Matches settings for currectly matching media breakpoint.
       *
       * @param {Object} points
       * @returns {Object}
       */
      match: function match(points2) {
        if (typeof window.matchMedia !== "undefined") {
          for (var point in points2) {
            if (points2.hasOwnProperty(point)) {
              if (window.matchMedia("(max-width: ".concat(point, "px)")).matches) {
                return points2[point];
              }
            }
          }
        }
        return defaults2;
      }
    };
    Object.assign(settings, Breakpoints2.match(points));
    Binder.on("resize", window, throttle(function() {
      Glide2.settings = mergeOptions(settings, Breakpoints2.match(points));
    }, Glide2.settings.throttle));
    Events.on("update", function() {
      points = sortBreakpoints(points);
      defaults2 = Object.assign({}, settings);
    });
    Events.on("destroy", function() {
      Binder.off("resize", window);
    });
    return Breakpoints2;
  }
  var COMPONENTS = {
    // Required
    Html,
    Translate,
    Transition,
    Direction,
    Peek,
    Sizes,
    Gaps,
    Move,
    Clones,
    Resize,
    Build,
    Run,
    // Optional
    Swipe,
    Images,
    Anchors,
    Controls,
    Keyboard,
    Autoplay,
    Breakpoints
  };
  var Glide = /* @__PURE__ */ function(_Core) {
    _inherits(Glide2, _Core);
    var _super = _createSuper(Glide2);
    function Glide2() {
      _classCallCheck(this, Glide2);
      return _super.apply(this, arguments);
    }
    _createClass(Glide2, [{
      key: "mount",
      value: function mount2() {
        var extensions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        return _get(_getPrototypeOf(Glide2.prototype), "mount", this).call(this, Object.assign({}, COMPONENTS, extensions));
      }
    }]);
    return Glide2;
  }(Glide$1);

  // nostr-post.ts
  var import_dayjs = __toESM(require_dayjs_min(), 1);
  var NostrPost = class extends HTMLElement {
    rendered = false;
    ndk = new NDK();
    isLoading = true;
    isError = false;
    theme = "light";
    post = null;
    stats = null;
    receivedData = false;
    author = {
      name: "",
      image: "",
      nip05: ""
    };
    onClick = null;
    onAuthorClick = null;
    connectToNostr = async () => {
      await this.ndk.connect();
    };
    getRelays = () => {
      const userRelays = this.getAttribute("relays");
      if (userRelays) {
        return userRelays.split(",");
      }
      return DEFAULT_RELAYS;
    };
    getTheme = async () => {
      this.theme = "light";
      const userTheme = this.getAttribute("theme");
      if (userTheme) {
        const isValidTheme = ["light", "dark"].includes(userTheme);
        if (!isValidTheme) {
          throw new Error(`Invalid theme '${userTheme}'. Accepted values are 'light', 'dark'`);
        }
        this.theme = userTheme;
      }
    };
    connectedCallback() {
      const onClick = this.getAttribute("onClick");
      if (onClick !== null) {
        this.onClick = window[onClick];
      }
      const onAuthorClick = this.getAttribute("onAuthorClick");
      if (onAuthorClick !== null) {
        this.onAuthorClick = window[onAuthorClick];
      }
      this.render();
      if (!this.rendered) {
        this.ndk = new NDK({
          explicitRelayUrls: this.getRelays()
        });
        this.connectToNostr();
        this.getPost();
        this.rendered = true;
      }
    }
    static get observedAttributes() {
      return ["relays", "id", "theme", "show-stats", "onClick", "onAuthorClick"];
    }
    attributeChangedCallback(name, _oldValue, newValue) {
      if (name === "relays") {
        this.ndk.explicitRelayUrls = this.getRelays();
        this.connectToNostr();
      }
      if (["relays", "id"].includes(name)) {
        this.getPost();
      }
      if (name === "onClick") {
        this.onClick = window[newValue];
      }
      if (name === "onAuthorClick") {
        this.onAuthorClick = window[newValue];
      }
      if (name === "theme") {
        this.getTheme();
        this.render();
      }
      if (name === "show-stats") {
        this.render();
      }
    }
    async getPost() {
      try {
        this.isLoading = true;
        this.render();
        const noteId = this.getAttribute("id") || "";
        const post = await this.ndk.fetchEvent(noteId);
        if (!this.receivedData) {
          if (!post) {
            this.isError = true;
          } else {
            this.receivedData = true;
            this.post = post;
            const author = await this.post?.author.fetchProfile();
            if (author) {
              this.author = author;
            }
            const shouldShowStats = this.getAttribute("show-stats");
            if (this.post && shouldShowStats) {
              debugger;
              try {
                const stats = await getPostStats(this.ndk, this.post.id);
                if (stats) {
                  this.stats = stats;
                }
              } catch (e) {
                console.error("Error fetching stats:", e);
              }
            }
            this.isError = false;
          }
        }
      } catch (err) {
        console.log(err);
        this.isError = true;
        throw err;
      } finally {
        this.isLoading = false;
        this.render();
      }
    }
    #_onPostClick() {
      if (this.isError) {
        return;
      }
      if (this.onClick !== null && typeof this.onClick === "function") {
        this.onClick(this.post);
        return;
      }
      let id = this.getAttribute("id");
      window.open(`https://njump.me/${id}`, "_blank");
    }
    #_onAuthorClick() {
      if (this.isError) {
        return;
      }
      if (this.onAuthorClick !== null && typeof this.onAuthorClick === "function") {
        this.onAuthorClick(this.post?.author.npub, this.author);
        return;
      }
      window.open(`https://njump.me/${this.post?.author.npub}`, "_blank");
    }
    attachEventListeners() {
      this.querySelector(".post-container")?.addEventListener("click", (e) => {
        const targetElement = e.target;
        if (targetElement.closest(".post-header-left") || targetElement.closest(".post-header-middle")) {
          this.#_onAuthorClick();
        } else {
          this.#_onPostClick();
        }
      });
    }
    parseText = async (text) => {
      let textContent = text;
      const nostrURISchemaMatches = textContent.matchAll(new RegExp(nip21_exports.NOSTR_URI_REGEX, "g"));
      for (let match of nostrURISchemaMatches) {
        const parsedNostrURI = nip21_exports.parse(match[0]);
        const decordedData = parsedNostrURI.decoded.data;
        let pubkey = "";
        if (typeof decordedData === "string") {
          pubkey = decordedData;
        } else {
          pubkey = decordedData.pubkey;
        }
        const user = await this.ndk.getUser({ pubkey }).fetchProfile();
        const name = user?.displayName || "";
        textContent = textContent.replace(match[0], `<a href="https://njump.me/${parsedNostrURI.value}" target="_blank">@${name}</a>`);
      }
      const regex3 = /(https:\/\/(?!njump\.me)[\w.-]+(?:\.[\w.-]+)+(?:\/[^\s]*)?)/g;
      const matches = textContent.match(regex3);
      const result = [];
      if (matches) {
        let lastIndex = 0;
        for (const match of matches) {
          const startIndex = textContent.indexOf(match, lastIndex);
          const endIndex = startIndex + match.length;
          if (startIndex > lastIndex) {
            result.push({ type: "text", value: textContent.substring(lastIndex, startIndex) });
          }
          const url = new URL(match);
          let type;
          if (url.pathname.endsWith(".jpg") || url.pathname.endsWith(".jpeg") || url.pathname.endsWith(".png")) {
            type = "image";
          } else if (url.pathname.endsWith(".gif")) {
            type = "gif";
          } else if (url.pathname.endsWith(".mp4") || url.pathname.endsWith(".webm")) {
            type = "video";
          } else {
            type = "link";
          }
          result.push({ type, value: match });
          lastIndex = endIndex;
        }
        if (lastIndex < textContent.length) {
          result.push({ type: "text", value: textContent.substring(lastIndex) });
        }
      } else {
        result.push({ type: "text", value: textContent });
      }
      return result;
    };
    // TODO: Fix types
    renderContent = (content) => {
      const html = [];
      let mediaCount = 0;
      let textBuffer = "";
      for (const item of content) {
        if (item.type === "text") {
          textBuffer += item.value;
        } else {
          if (textBuffer) {
            html.push(`<span class="text-content">${textBuffer.replace(/\n/g, "<br />")}</span>`);
            textBuffer = "";
          }
          switch (item.type) {
            case "image":
              html.push(`<img width="100%" src="${item.value}" alt="Image">`);
              mediaCount++;
              break;
            case "gif":
              html.push(`<img width="100%" src="${item.value}" alt="GIF">`);
              mediaCount++;
              break;
            case "video":
              html.push(`<video width="100%" src="${item.value}" controls></video>`);
              mediaCount++;
              break;
            case "link":
              html.push(`<a href="${item.value}">${item.value}</a>`);
              break;
          }
        }
      }
      if (textBuffer) {
        html.push(`<span class="text-content">${textBuffer.replace(/\n/g, "<br />")}</span>`);
      }
      if (mediaCount > 1) {
        const carouselHtml = [];
        let bullets = "";
        for (let i2 = 0; i2 < html.length; i2++) {
          const item = html[i2];
          if (item.startsWith("<img") || item.startsWith("<video")) {
            carouselHtml.push(`<li class="glide__slide">${item}</li>`);
            bullets += `<button class="glide__bullet" data-glide-dir="=${i2}"></button>`;
            html.splice(i2, 1);
            i2--;
          }
        }
        html.push(`
            <div class="glide" style="margin-top: 20px">
                <div class="glide__track" data-glide-el="track">
                    <ul class="glide__slides">
                        ${carouselHtml.join("")}
                    </ul>
                </div>

                  <div class="glide__bullets" data-glide-el="controls[nav]">
                    ${bullets}
                </div>
            </div>
          `);
      }
      return html.join("");
    };
    getStyles = () => {
      let variables = ``;
      if (this.theme === "dark") {
        variables = `
        --nstrc-post-background: var(--nstrc-post-background-dark);
        --nstrc-post-name-color: var(--nstrc-post-name-color-dark);
        --nstrc-post-nip05-color: var(--nstrc-post-nip05-color-dark);
        --nstrc-post-skeleton-min-hsl: var(--nstrc-post-skeleton-min-hsl-dark);
        --nstrc-post-skeleton-max-hsl: var(--nstrc-post-skeleton-max-hsl-dark);
        --nstrc-post-text-color: var(--nstrc-post-text-color-dark);
        --nstrc-post-stat-text-color: var(--nstrc-post-stat-text-color-dark);
        `;
      } else {
        variables = `
        --nstrc-post-background: var(--nstrc-post-background-light);
        --nstrc-post-name-color: var(--nstrc-post-name-color-light);
        --nstrc-post-nip05-color: var(--nstrc-post-nip05-color-light);
        --nstrc-post-skeleton-min-hsl: var(--nstrc-post-skeleton-min-hsl-light);
        --nstrc-post-skeleton-max-hsl: var(--nstrc-post-skeleton-max-hsl-light);
        --nstrc-post-text-color: var(--nstrc-post-text-color-light);
        --nstrc-post-stat-text-color: var(--nstrc-post-stat-text-color-light);
        `;
      }
      return `
            <link rel="stylesheet" href="node_modules/@glidejs/glide/dist/css/glide.core.min.css">
            <link rel="stylesheet" href="node_modules/@glidejs/glide/dist/css/glide.theme.min.css">

            <style>
              :root {
                --nstrc-post-background-light: #f5f5f5;
                --nstrc-post-background-dark: #000000;
                --nstrc-post-name-color-light: #444;
                --nstrc-post-name-color-dark: #CCC;
                --nstrc-post-nip05-color-light: #808080;
                --nstrc-post-nip05-color-dark: #757575;
                --nstrc-post-skeleton-min-hsl-light: 200, 20%, 80%;
                --nstrc-post-skeleton-min-hsl-dark: 200, 20%, 20%;
                --nstrc-post-skeleton-max-hsl-light: 200, 20%, 95%;
                --nstrc-post-skeleton-max-hsl-dark: 200, 20%, 30%;
                --nstrc-post-text-color-light: #222;
                --nstrc-post-text-color-dark: #d4d4d4;
                --nstrc-post-stat-text-color-light: #222;
                --nstrc-post-stat-text-color-dark: #d0d0d0;

                --nstrc-post-name-font-weight: 700;
                --nstrc-post-nip05-font-weight: 400;

                --nstrc-post-accent: #ca077c;

                ${variables}
              }
              
              a {
                color: var(--nstrc-post-accent);
              }

              .post-container {
                  font-family: sans-serif;
                  padding: 20px;

                  display: flex;
                  flex-direction: column;
                  gap: 20px;

                  border: 1px solid #d9d9d9;
                  border-radius: 10px;

                  background-color: var(--nstrc-post-background);

                  color: var(--nstrc-post-text-color);

                  cursor: pointer;
              }

              .post-container .post-header {
                  display: flex;
                  gap: 10px;
              }

              .post-header-left {
                  width: 35px;
              }

              .post-header-left img {
                  width: 35px;
                  border-radius: 50%;
              }

              .post-header-middle {
                  display: flex;
                  flex-direction: column;
                  width: 100%;
                  gap: 5px;
              }

              .post-header-right {
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: end;
              }

              .author-name {
                color: var(--nstrc-post-name-color);
                font-weight: var(--nstrc-post-name-font-weight);
                    word-break: break-word;
              }

              .author-username {
                  font-weight: var(--nstrc-post-nip05-font-weight);
                  color: #808080;
                  font-size: 14px;
                  word-break: break-all;
              }

              .text-content {
                word-break: break-word;
              }

              .glide__slide {
                  width: 100%;
              }

              .glide__slide * {
                  border-radius: 10px;
              }

              .glide__bullets button {
                  border: 1px solid #000;
              }

              .post-container .skeleton {
                animation: post-skeleton-loading 0.5s linear infinite alternate;
              }

              @keyframes post-skeleton-loading {
                0% {
                  background-color: hsl(var(--nstrc-post-skeleton-min-hsl));
                }
                100% {
                  background-color: hsl(var(--nstrc-post-skeleton-max-hsl));
                }
              }

            .error-container {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 20px;
            }

            .error {
              width: 35px;
              height: 35px;
              border-radius: 50%;
              background-color: red;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 20px;
              color: #FFF;
            }

            .error-text {
              color: red;
              font-weight: bold;
            }

            .post-footer {
              margin-top: ${this.isError ? "0px" : "20px"};
            }

            .stats-container {
              display: flex;
              gap: 20px;
            }

            .stat {
              display: flex;
              align-items: center;
              gap: 5px;
              color: var(--nstrc-post-stat-text-color);
            }
          </style>
        `;
    };
    async render() {
      const content = this.post?.content || "";
      const parsedContent = await this.parseText(content);
      const htmlToRender = this.renderContent(parsedContent);
      let date = "";
      if (this.post && this.post.created_at) {
        date = (0, import_dayjs.default)(this.post.created_at * 1e3).format("MMM D, YYYY");
      }
      const shouldShowStats = this.getAttribute("show-stats") === "true";
      this.innerHTML = `
        ${this.getStyles()}

        <div class="post-container">
            <div class="post-header">
              <div class="post-header-left">
                <div class=""author-picture>
                  ${this.isLoading ? '<div style="width: 35px; height: 35px; border-radius: 50%;" class="skeleton"></div>' : this.isError ? `` : `<img src="${this.author?.image}" />`}
                  </div>
              </div>
              <div class="post-header-middle">
                ${this.isLoading ? `
                    <div style="width: 70%; height: 10px; border-radius: 10px;" class="skeleton"></div>
                    <div style="width: 80%; height: 8px; border-radius: 10px; margin-top: 5px;" class="skeleton"></div>
                  ` : this.isError ? "" : `
                      ${this.author?.displayName ? `<span class="author-name">${this.author?.displayName}</span>` : ""}
                      ${this.author?.nip05 ? `<span class="author-username">${this.author?.nip05}</span>` : ""}
                      
                    `}
              </div>
              <div class="post-header-right">
                ${this.isLoading ? '<div style="width: 100px; height: 10px; border-radius: 10px;" class="skeleton"></div>' : this.isError ? "" : `<span class="post-date">${date}</span>`}
              </div>
            </div>

            <div class="post-body">
                ${this.isLoading ? `
                    <div style="width: 100%; height: 10px; border-radius: 10px; margin-bottom: 15px;" class="skeleton"></div>
                    <div style="width: 100%; height: 10px; border-radius: 10px; margin-bottom: 15px;" class="skeleton"></div>
                    <div style="width: 30%; height: 10px; border-radius: 10px;" class="skeleton"></div>
                  ` : this.isError ? `
                      <div class='error-container'>
                        <div class="error">&#9888;</div>
                        <span class="error-text">Unable to load post</span>
                      </div>
                      <div style="text-align: center; margin-top: 8px">
                        <small class="error-text" style="font-weight: normal">Please check console for more information</small>
                      </div>
                    ` : htmlToRender}
            </div>


            ${!shouldShowStats ? "" : `
                <div class="post-footer">
                ${this.isLoading ? `
                    <div class='stats-container'>
                        <div class="stat">
                          <div style="width: 42px; height: 20px; border-radius: 4px;" class="skeleton"></div>
                        </div>

                        <!-- TODO: Add zaps after resolving the doubts
                        <div class="stat">
                          <div style="width: 42px; height: 20px; border-radius: 4px;" class="skeleton"></div>
                        </div>
                        -->

                        <div class="stat">
                          <div style="width: 42px; height: 20px; border-radius: 4px;" class="skeleton"></div>
                        </div>

                        <div class="stat">
                          <div style="width: 42px; height: 20px; border-radius: 4px;" class="skeleton"></div>
                        </div>
                      </div>
                    ` : this.isError || this.stats == null ? "" : `
                      <div class='stats-container'>
                        <div class="stat">
                          <svg width="18" height="18" fill="#00b3ff">
                            <path xmlns="http://www.w3.org/2000/svg" d="M1.5 5.5C1.5 4.09987 1.5 3.3998 1.77248 2.86502C2.01217 2.39462 2.39462 2.01217 2.86502 1.77248C3.3998 1.5 4.09987 1.5 5.5 1.5H12.5C13.9001 1.5 14.6002 1.5 15.135 1.77248C15.6054 2.01217 15.9878 2.39462 16.2275 2.86502C16.5 3.3998 16.5 4.09987 16.5 5.5V10C16.5 11.4001 16.5 12.1002 16.2275 12.635C15.9878 13.1054 15.6054 13.4878 15.135 13.7275C14.6002 14 13.9001 14 12.5 14H10.4031C9.88308 14 9.62306 14 9.37435 14.051C9.15369 14.0963 8.94017 14.1712 8.73957 14.2737C8.51347 14.3892 8.31043 14.5517 7.90434 14.8765L5.91646 16.4668C5.56973 16.7442 5.39636 16.8829 5.25045 16.8831C5.12356 16.8832 5.00352 16.8255 4.92436 16.7263C4.83333 16.6123 4.83333 16.3903 4.83333 15.9463V14C4.05836 14 3.67087 14 3.35295 13.9148C2.49022 13.6836 1.81635 13.0098 1.58519 12.147C1.5 11.8291 1.5 11.4416 1.5 10.6667V5.5Z" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <span>${this.stats.replies}</span>
                        </div>

                        <!-- TODO: Add zaps after resolving the doubts
                        <div class="stat">
                          <svg width="18" height="18">
                            <g xmlns="http://www.w3.org/2000/svg">
                              <path fill="#ffaf00" fill-rule="evenodd" clip-rule="evenodd" d="M8.93212 1.2218C9.2036 1.33964 9.36488 1.62235 9.32818 1.91602L8.75518 6.5L12.8852 6.49999C13.0458 6.49996 13.2086 6.49993 13.3415 6.51197C13.4673 6.52336 13.708 6.55347 13.9168 6.72221C14.1559 6.91539 14.2928 7.20776 14.2882 7.51507C14.2841 7.78351 14.1531 7.98776 14.0814 8.09164C14.0055 8.20149 13.9013 8.32648 13.7984 8.44989L7.84547 15.5935C7.65601 15.8208 7.33934 15.896 7.06786 15.7782C6.79638 15.6604 6.6351 15.3776 6.6718 15.084L7.2448 10.5L3.11481 10.5C2.95415 10.5 2.79142 10.5001 2.65847 10.488C2.53273 10.4766 2.29195 10.4465 2.08314 10.2778C1.84409 10.0846 1.70715 9.79223 1.71178 9.48492C1.71583 9.21648 1.84684 9.01223 1.91859 8.90835C1.99445 8.79851 2.09866 8.67351 2.20153 8.55011C2.20663 8.54399 2.21172 8.53788 2.21681 8.53178L8.15451 1.40654C8.34397 1.17918 8.66064 1.10395 8.93212 1.2218Z"/>
                            </g>
                          </svg>
                          <span>${this.stats.zaps}</span>
                        </div>
                        -->

                        <div class="stat">
                          <svg width="18" height="18">
                            <g xmlns="http://www.w3.org/2000/svg">
                              <path fill="#ff006d" fill-rule="evenodd" clip-rule="evenodd" d="M9.49466 2.78774C7.73973 1.25408 5.14439 0.940234 3.12891 2.6623C0.948817 4.52502 0.63207 7.66213 2.35603 9.88052C3.01043 10.7226 4.28767 11.9877 5.51513 13.1462C6.75696 14.3184 7.99593 15.426 8.60692 15.9671C8.61074 15.9705 8.61463 15.9739 8.61859 15.9774C8.67603 16.0283 8.74753 16.0917 8.81608 16.1433C8.89816 16.2052 9.01599 16.2819 9.17334 16.3288C9.38253 16.3912 9.60738 16.3912 9.81656 16.3288C9.97391 16.2819 10.0917 16.2052 10.1738 16.1433C10.2424 16.0917 10.3139 16.0283 10.3713 15.9774C10.3753 15.9739 10.3792 15.9705 10.383 15.9671C10.994 15.426 12.2329 14.3184 13.4748 13.1462C14.7022 11.9877 15.9795 10.7226 16.6339 9.88052C18.3512 7.67065 18.0834 4.50935 15.8532 2.65572C13.8153 0.961905 11.2476 1.25349 9.49466 2.78774Z"/>
                            </g>
                          </svg>
                          <span>${this.stats.likes}</span>
                        </div>

                        <div class="stat">
                          <svg width="18" height="18">
                            <g xmlns="http://www.w3.org/2000/svg">
                              <path fill="#1ded00" d="M12.2197 1.65717C12.5126 1.36428 12.9874 1.36428 13.2803 1.65717L16.2803 4.65717C16.5732 4.95006 16.5732 5.42494 16.2803 5.71783L13.2803 8.71783C12.9874 9.01072 12.5126 9.01072 12.2197 8.71783C11.9268 8.42494 11.9268 7.95006 12.2197 7.65717L13.9393 5.9375H5.85C5.20757 5.9375 4.77085 5.93808 4.43328 5.96566C4.10447 5.99253 3.93632 6.04122 3.81902 6.10099C3.53677 6.2448 3.3073 6.47427 3.16349 6.75652C3.10372 6.87381 3.05503 7.04197 3.02816 7.37078C3.00058 7.70835 3 8.14507 3 8.7875V8.9375C3 9.35171 2.66421 9.6875 2.25 9.6875C1.83579 9.6875 1.5 9.35171 1.5 8.9375V8.75653C1.49999 8.15281 1.49998 7.65452 1.53315 7.24863C1.56759 6.82706 1.64151 6.43953 1.82698 6.07553C2.1146 5.51104 2.57354 5.0521 3.13803 4.76448C3.50203 4.57901 3.88956 4.50509 4.31113 4.47065C4.71703 4.43748 5.2153 4.43749 5.81903 4.4375L13.9393 4.4375L12.2197 2.71783C11.9268 2.42494 11.9268 1.95006 12.2197 1.65717Z"/>
                              <path fill="#1ded00" d="M15.75 9.6875C15.3358 9.6875 15 10.0233 15 10.4375V10.5875C15 11.2299 14.9994 11.6667 14.9718 12.0042C14.945 12.333 14.8963 12.5012 14.8365 12.6185C14.6927 12.9007 14.4632 13.1302 14.181 13.274C14.0637 13.3338 13.8955 13.3825 13.5667 13.4093C13.2292 13.4369 12.7924 13.4375 12.15 13.4375H4.06066L5.78033 11.7178C6.07322 11.4249 6.07322 10.9501 5.78033 10.6572C5.48744 10.3643 5.01256 10.3643 4.71967 10.6572L1.71967 13.6572C1.42678 13.9501 1.42678 14.4249 1.71967 14.7178L4.71967 17.7178C5.01256 18.0107 5.48744 18.0107 5.78033 17.7178C6.07322 17.4249 6.07322 16.9501 5.78033 16.6572L4.06066 14.9375H12.181C12.7847 14.9375 13.283 14.9375 13.6889 14.9044C14.1104 14.8699 14.498 14.796 14.862 14.6105C15.4265 14.3229 15.8854 13.864 16.173 13.2995C16.3585 12.9355 16.4324 12.5479 16.4669 12.1264C16.5 11.7205 16.5 11.2222 16.5 10.6185V10.4375C16.5 10.0233 16.1642 9.6875 15.75 9.6875Z"/>
                            </g>
                          </svg>
                          <span>${this.stats.reposts}</span>
                        </div>
                      </div>
                    `}
                </div>
              `}
        </div>
        `;
      if (htmlToRender.includes("glide")) {
        new Glide(".glide").mount();
      }
      this.attachEventListeners();
    }
  };
  customElements.define("nostr-post", NostrPost);

  // nostr-profile.ts
  var import_dayjs2 = __toESM(require_dayjs_min(), 1);
  var NostrProfile = class extends HTMLElement {
    rendered = false;
    ndk = new NDK();
    userProfile = {
      name: "",
      image: "",
      nip05: ""
    };
    theme = "light";
    isLoading = true;
    isStatsLoading = true;
    isStatsFollowsLoading = true;
    isStatsFollowersLoading = true;
    isStatsNotesLoading = true;
    isStatsRelaysLoading = true;
    isError = false;
    isStatsError = false;
    stats = {
      follows: 0,
      followers: 0,
      notes: 0,
      replies: 0,
      zaps: 0,
      relays: 0
    };
    onClick = null;
    ndkUser;
    connectToNostr = async () => {
      await this.ndk.connect();
    };
    getRelays = () => {
      const userRelays = this.getAttribute("relays");
      if (userRelays) {
        return userRelays.split(",");
      }
      return DEFAULT_RELAYS;
    };
    getNDKUser = async () => {
      const npub = this.getAttribute("npub");
      const nip05 = this.getAttribute("nip05");
      const pubkey = this.getAttribute("pubkey");
      if (npub) {
        return this.ndk.getUser({
          npub
        });
      } else if (nip05) {
        return this.ndk.getUserFromNip05(nip05);
      } else if (pubkey) {
        return this.ndk.getUser({
          pubkey
        });
      }
      return null;
    };
    getUserProfile = async () => {
      try {
        this.isLoading = true;
        this.render();
        const user = await this.getNDKUser();
        if (user?.npub) {
          this.ndkUser = user;
          await user.fetchProfile();
          this.userProfile = user.profile;
          if (this.userProfile) {
            this.getProfileStats().then((stats) => {
              this.isStatsError = false;
              this.stats = stats;
            }).catch((err) => {
              console.log(err);
              this.isStatsError = true;
            }).finally(() => {
              this.isStatsLoading = false;
              this.render();
            });
          }
          if (!this.userProfile.image) {
            this.userProfile.image = "./assets/default_dp.png";
          }
          this.isError = false;
        } else {
          throw new Error("Either npub or nip05 should be provided");
        }
      } catch (err) {
        this.isError = true;
        throw err;
      } finally {
        this.isLoading = false;
        this.render();
      }
    };
    getProfileStats = async () => {
      try {
        this.isStatsFollowsLoading = true;
        this.isStatsFollowersLoading = true;
        this.isStatsNotesLoading = true;
        this.isStatsError = false;
        this.render();
        const userHex = this.ndkUser.pubkey;
        const followsPromise = this.ndkUser.follows().then((follows2) => {
          this.stats.follows = follows2.size;
          this.isStatsFollowsLoading = false;
        }).catch((err) => {
          console.log("Error fetching follows:", err);
          this.isStatsFollowsLoading = false;
        });
        const followersPromise = this.ndk.fetchEvents({
          kinds: [NDKKind.Contacts],
          "#p": [userHex || ""]
        }).then((followers) => {
          this.stats.followers = followers.size;
          this.isStatsFollowersLoading = false;
        }).catch((err) => {
          console.log("Error fetching followers:", err);
          this.isStatsFollowersLoading = false;
        });
        const notesPromise = this.ndk.fetchEvents({
          kinds: [NDKKind.Text],
          authors: [userHex]
        }).then((notes) => {
          let replies = 0;
          notes.forEach((note) => {
            if (note.hasTag("e")) {
              replies += 1;
            }
          });
          this.stats.replies = replies;
          this.stats.notes = notes.size - replies;
          this.isStatsNotesLoading = false;
        }).catch((err) => {
          console.log("Error fetching notes:", err);
          this.isStatsNotesLoading = false;
        });
        await Promise.all([
          followsPromise,
          followersPromise,
          notesPromise
        ]);
        this.stats.zaps = 0;
        this.stats.relays = 0;
        this.render();
        return this.stats;
      } catch (err) {
        console.log("getProfileStats", err);
        this.isStatsError = true;
        this.render();
        throw new Error("Error fetching stats");
      }
    };
    getTheme = async () => {
      this.theme = "light";
      const userTheme = this.getAttribute("theme");
      if (userTheme) {
        const isValidTheme = ["light", "dark"].includes(userTheme);
        if (!isValidTheme) {
          throw new Error(`Invalid theme '${userTheme}'. Accepted values are 'light', 'dark'`);
        }
        this.theme = userTheme;
      }
    };
    connectedCallback() {
      if (this.getAttribute("onClick") !== null) {
        this.onClick = window["onClick"];
      }
      if (!this.rendered) {
        this.ndk = new NDK({
          explicitRelayUrls: this.getRelays()
        });
        this.getTheme();
        this.connectToNostr();
        this.getUserProfile();
        this.rendered = true;
      }
    }
    static get observedAttributes() {
      return ["relays", "pubkey", "nip05", "theme", "show-npub", "show-follow", "onClick"];
    }
    attributeChangedCallback(name, _oldValue, newValue) {
      if (name === "relays") {
        this.ndk.explicitRelayUrls = this.getRelays();
        this.connectToNostr();
      }
      if (["relays", "npub", "nip05"].includes(name)) {
        this.getUserProfile();
      }
      if (name === "onClick") {
        this.onClick = window[newValue];
      }
      if (name === "theme") {
        this.getTheme();
        this.render();
      }
      if (["show-npub", "show-follow"].includes(name)) {
        this.render();
      }
    }
    disconnectedCallback() {
    }
    getStyles() {
      let variables = ``;
      if (this.theme === "dark") {
        variables = `
      --nstrc-profile-background: var(--nstrc-profile-background-dark);
      --nstrc-profile-skeleton-min-hsl: var(--nstrc-profile-skeleton-min-hsl-dark);
      --nstrc-profile-skeleton-max-hsl: var(--nstrc-profile-skeleton-max-hsl-dark);
      --nstrc-profile-text-primary: var(--nstrc-profile-text-primary-dark);
      --nstrc-profile-text-grey: var(--nstrc-profile-text-grey-dark);
      --nstrc-profile-banner-placeholder-color: var(--nstrc-profile-banner-placeholder-color-dark);
      --nstrc-profile-copy-foreground-color: var(--nstrc-profile-copy-foreground-color-dark);
      `;
      } else {
        variables = `
      --nstrc-profile-background: var(--nstrc-profile-background-light);
      --nstrc-profile-skeleton-min-hsl: var(--nstrc-profile-skeleton-min-hsl-light);
      --nstrc-profile-skeleton-max-hsl: var(--nstrc-profile-skeleton-max-hsl-light);
      --nstrc-profile-text-primary: var(--nstrc-profile-text-primary-light);
      --nstrc-profile-text-grey: var(--nstrc-profile-text-grey-light);
      --nstrc-profile-banner-placeholder-color: var(--nstrc-profile-banner-placeholder-color-light);
      --nstrc-profile-copy-foreground-color: var(--nstrc-profile-copy-foreground-color-light);
      `;
      }
      return `
    <style>
    :root {
        --nstrc-profile-background-light: #f5f5f5;
        --nstrc-profile-background-dark: #000000;
        --nstrc-profile-skeleton-min-hsl-light: 200, 20%, 80%;
        --nstrc-profile-skeleton-min-hsl-dark: 200, 20%, 20%;
        --nstrc-profile-skeleton-max-hsl-light: 200, 20%, 95%;
        --nstrc-profile-skeleton-max-hsl-dark: 200, 20%, 30%;
        --nstrc-profile-text-primary-light: #111111;
        --nstrc-profile-text-primary-dark: #ffffff;
        --nstrc-profile-text-grey-light: #808080;
        --nstrc-profile-text-grey-dark: #666666;
        --nstrc-profile-banner-placeholder-color-light: #e5e5e5;
        --nstrc-profile-banner-placeholder-color-dark: #222222;
        --nstrc-profile-copy-foreground-color-light: #222;
        --nstrc-profile-copy-foreground-color-dark: #CCC;

        ${variables}

        --nstrc-profile-accent: #ca077c;

        --nstrc-follow-btn-padding: 5px 8px !important;
        --nstrc-follow-btn-font-size: 14px !important;
        --nstrc-follow-btn-border-radius: 12px !important;
        --nstrc-follow-btn-border-dark: 1px solid #DDDDDD !important;
        --nstrc-follow-btn-border-light: 1px solid #DDDDDD !important;
        --nstrc-follow-btn-horizontal-alignment: end !important;
      }

        .nostr-profile .skeleton {
            animation: profile-skeleton-loading 0.5s linear infinite alternate;
        }

        @keyframes profile-skeleton-loading {
            0% {
                background-color: hsl(var(--nstrc-profile-skeleton-min-hsl));
            }
            100% {
                background-color: hsl(var(--nstrc-profile-skeleton-max-hsl));
            }
        }

      .nostr-profile {
        -webkit-tap-highlight-color: transparent;
        text-size-adjust: 100%;
        font-weight: 400;
        font-size: 18px;
        line-height: 1.5;
        text-rendering: optimizeLegibility;
        overflow-wrap: break-word;
        font-family: Nacelle, sans-serif;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
        background-repeat: no-repeat;
        min-height: 500px;
        border: 1px solid #CCC;
        border-radius: 5px;
        background-color: var(--nstrc-profile-background);
        cursor: pointer;
      }

      #profile {
        position: relative;
        background-color: var(--nstrc-profile-background);
        padding-bottom: 4px;
      }

      #profile_banner {
        width: 100%;
        height: 214px;
        overflow: hidden;
      }

      #profile_banner a {
        outline: none;
        color: var(--nstrc-profile-accent);
      }

      #profile_banner a img {
        color: var(--nstrc-profile-accent);
        max-width: 100%;
        border-style: none;
        display: block;
        z-index: 22;
        width: 100%;
        height: 214px;
        object-fit: cover;
      }

      #profile_banner .banner-placeholder {
        width: 100%;
        height: 214px;
        background-color: var(--nstrc-profile-banner-placeholder-color);
      }

      .dp_container {
        position: absolute;
        top: 140px;
        left: 15px;
        overflow: hidden;
      }

      .avatar_container {
        border: solid 4px var(--nstrc-profile-background);
        border-radius: 50%;
        background-color: var(--nstrc-profile-background);
      }

      .avatar_wrapper {
        display: block;
        min-height: 142px;
      }

      .xxl_avatar {
        position: relative;
        background-color: var(--nstrc-profile-background);
        border-radius: 50%;
        width: 142px;
        height: 142px;
      }

      .backfill {
        background-color: var(--nstrc-profile-background);
        border-radius: 50%;
        width: 142px;
        height: 142px;
      }

      .backfill a {
        outline: none;
      }

      .backfill a img {
        max-width: 100%;
        border-style: none;
        display: block;
        z-index: 22;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .profile_actions {
        height: 76px;
        display: flex;
        justify-content: end;
        align-items: center;
        padding: 0 18px;
      }

      .profile_data {
        display: block;
        margin-inline: 20px;
        min-height: 52px;
        margin-top: 14px;
      }

      .basic_info {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .name {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        max-width: 60%;
        height: 100%;
      }

      .name-text {
        color: var(--nstrc-profile-text-primary);
        font-size: 20px;
        line-height: 1;
        font-weight: 700;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
        vertical-align: baseline;
      }

      .verification-check {
        width: 20px;
        height: 20px;
      }

      .verification-icon {
        width: 20px;
        height: 20px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-inline: 4px;
      }

      ._whiteCheckL_lfbpc_49 {
        width: 12px;
        height: 12px;
        top: 4px;
        left: 4px;
        border-radius: 50%;
        background-color: #fff;
        position: absolute;
      }

      ._verifiedIconPrimal_lfbpc_30 {
        width: 100%;
        height: 100%;
        background: var(--nstrc-profile-accent);
        mask: url(https://primal.net/assets/verified-84f47cd3.svg) no-repeat 0/100%;
      }

      .joined {
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-align: right;
        color: var(--nstrc-profile-text-grey);
      }

      .nip05-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        color: var(--nstrc-profile-text-grey);
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        margin-top: 2px;
        margin-bottom: 16px;
      }

      .nip05-container {
        color: var(--nstrc-profile-text-grey);
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        display: flex;
        align-items: center;
      }

      .nip05 {
        color: var(--nstrc-profile-text-grey);
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        width: 100%;
        overflow: hidden;
      }

      .about {
        margin-inline: 20px;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: var(--nstrc-profile-text-primary);
      }

      .links {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-inline: 20px;
        margin-block: 12px;
      }

      .website {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
      }

      .website a {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        outline: none;
        color: var(--nstrc-profile-accent);
        max-width: 350px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: normal;
      }

      .stats {
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding-inline: 8px;
        border-radius: 0;
        padding-top: 22px;
        border-top: none;
        background-color: var(--nstrc-profile-background);
      }

      .stat {
        position: relative;
        display: inline-block;
        padding-inline: 14px;
        padding-block: 2px;
        border: none;
        background: none;
        width: fit-content;
        height: 40px;
        margin: 0 0 12px;
      }

      .stat-inner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .stat-inner .stat-value {
        font-weight: 400;
        font-size: 24px;
        line-height: 24px;
        color: var(--nstrc-profile-text-primary);
      }

      .stat-inner .stat-name {
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: var(--nstrc-profile-text-grey);
        text-transform: lowercase;
      }

      .error-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        min-height: 500px;
      }

      .error {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: #FFF;
      }

      .error-text {
        color: red;
        font-weight: bold;
      }

      .npub-container {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 6px;
      }

      .npub-container .npub {
        color: #a2a2a2;
      }

      .npub.full {
        display: inline !important;
      }

      .npub.masked {
        display: none !important;
      }

      .copy-button {
        display: flex;
        font-size: 16px;
        min-width: 15px;
        min-height: 15px;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        color: var(--nstrc-profile-copy-foreground-color);
      }
        
      .nip05 {
        display: flex;
        gap: 5px;
      }

      @media only screen and (max-width: 600px) {
        button.stat .stat-value {
          font-size: 18px !important;
        }

        .npub.full {
          display: none !important;
        }

        .npub.masked {
          display: inline !important;
        }
      }

      @media only screen and (max-width: 600px) {
        :root {
          --nstrc-follow-btn-padding: 5px 8px !important;
          --nstrc-follow-btn-font-size: 12px !important;
          --nstrc-follow-btn-min-height: auto !important;
          --nstrc-follow-btn-border-radius: 8px !important;
          --nstrc-follow-btn-error-max-width: 150px !important;
        }
      }

    </style>
    `;
    }
    renderNpub() {
      const npubAttribute = this.getAttribute("npub");
      const showNpub = this.getAttribute("show-npub");
      if (showNpub === "false") {
        return "";
      }
      if (showNpub === null && this.userProfile.nip05) {
        return "";
      }
      if (this.ndkUser == null) {
        return "";
      }
      if (!npubAttribute && !this.ndkUser.npub) {
        console.warn("Cannot use showNpub without providing a nPub");
        return "";
      }
      let npub = npubAttribute;
      if (!npub && this.ndkUser && this.ndkUser.npub) {
        npub = this.ndkUser.npub;
      }
      if (!npub) {
        console.warn("Cannot use showNPub without providing a nPub");
        return "";
      }
      return `
      <div class="npub-container">
        ${this.isLoading ? '<div style="width: 100px; height: 8px; border-radius: 5px" class="skeleton"></div>' : `
                <span class="npub full">${npub}</span>
                <span class="npub masked">${maskNPub(npub)}</span>
                <span id="npub-copy" class="copy-button">&#x2398;</span>
            `}
      </div>
    `;
    }
    copy(string) {
      navigator.clipboard.writeText(string);
    }
    onProfileClick() {
      if (this.isError) {
        return;
      }
      if (this.onClick !== null && typeof this.onClick === "function") {
        this.onClick(this.userProfile);
        return;
      }
      let key = "";
      const nip05 = this.getAttribute("nip05");
      const npub = this.getAttribute("npub");
      if (nip05) {
        key = nip05;
      } else if (npub) {
        key = npub;
      } else {
        return;
      }
      window.open(`https://njump.me/${key}`, "_blank");
    }
    attachEventListeners() {
      this.querySelector(".nostr-profile")?.addEventListener("click", (e) => {
        if (!e.target.closest(".nostr-follow-button-container")) {
          this.onProfileClick();
        }
      });
      this.querySelector("#npub-copy")?.addEventListener("click", (e) => {
        e.stopPropagation();
        this.copy(this.getAttribute("npub") || this.ndkUser.npub || "");
      });
      this.querySelector("#nip05-copy")?.addEventListener("click", (e) => {
        e.stopPropagation();
        this.copy(this.getAttribute("nip05") || this.userProfile.nip05 || "");
      });
    }
    render() {
      this.innerHTML = this.getStyles();
      if (this.userProfile === void 0 || this.userProfile.image === void 0 || this.userProfile.displayName === void 0 && this.userProfile.name === void 0) {
        this.isError = true;
      }
      let date = "";
      if (this.userProfile && this.userProfile.created_at) {
        date = (0, import_dayjs2.default)(this.userProfile.created_at * 1e3).format("MMM D, YYYY");
      }
      const showFollow = this.getAttribute("show-follow") === "true";
      if (!this.isLoading && this.isError) {
        this.innerHTML += `<div class="nostr-profile">
                <div class='error-container'>
                    <div class="error">&#9888;</div>
                    <span class="error-text">
                      Unable to load profile
                      <br/>
                      <small style="font-weight: normal">Please check console for more information</small>
                      </span>
                    </div>
            </div>
        `;
      } else {
        this.innerHTML += `
            <div class="nostr-profile">
                <div id="profile">
                    <div id="profile_banner">
                    ${this.isLoading ? '<div style="width: 100%; height: 100%;" class="skeleton"></div>' : this.userProfile.banner ? `
                                <a
                                    target="_blank"
                                    data-cropped="true"
                                    class="profile_image"
                                    href="#"
                                    data-pswp-width="991"
                                    data-pswp-height="330.3333333333333"
                                    >
                                        <img
                                        id="4075d846142df0a70fde5fd340e774697c4a7b4f2fce3635b02e061afcd16139"
                                        src="${this.userProfile.banner}"
                                        width="524px"/>
                                    </a>
                            ` : '<div class="banner-placeholder"></div>'}
                    </div>
                    <div class="dp_container">
                    <div class="avatar_container">
                        <div class="avatar_wrapper">
                        <div class="xxl_avatar">
                            <div class="backfill">
                            ${this.isLoading ? '<div style="width: 100%; height: 100%; border-radius: 50%" class="skeleton"></div>' : `
                                    <a
                                        target="_blank"
                                        data-cropped="true"
                                        class="profile_image roundedImage"
                                        href="#"
                                        data-pswp-width="991"
                                        data-pswp-height="989.6777851901267"
                                        ><img
                                        id="70f547f7e6e31ae6952f41d75d50a4ac13b9290d5d8e9e9eb89801501de242fd"
                                        src="${this.userProfile.image}"
                                        width="524px"
                                    /></a>
                                `}
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="profile_actions">
                      ${this.ndkUser && this.ndkUser.npub && showFollow ? `
                          <nostr-follow-button
                            npub="${this.ndkUser.npub}"
                            theme="${this.theme}"
                          ></nostr-follow-button>
                        ` : ""}
                    </div>
                    <div class="profile_data">
                    <div class="basic_info">
                        <div class="name">
                        ${this.isLoading ? '<div style="width: 100px; height: 16px; border-radius: 20px" class="skeleton"></div>' : `
                                <div class="name-text">${this.userProfile.displayName || this.userProfile.name}</div>
                            `}
                        </div>
                    </div>
                    <div class="nip05-wrapper">
                        <div class="nip05-container">
                        ${this.isLoading ? '<div style="width: 75px; height: 8px; border-radius: 20px" class="skeleton"></div>' : this.userProfile.nip05 ? `<div class="nip05">
                                  <span>${this.userProfile.nip05}</span>
                                  <span id="nip05-copy" class="copy-button">&#x2398;</span>
                                </div>` : ""}
                        </div>

                        ${this.renderNpub()}
                    </div>
                    </div>
                    
                    <div class="about">
                        ${this.isLoading ? `
                                <div style="width: 100%; height: 12px; border-radius: 20px; margin-bottom: 12px" class="skeleton"></div>
                                <div style="width: 40%; height: 12px; border-radius: 20px" class="skeleton"></div>
                            ` : this.userProfile.about || ""}
                    </div>
                    <div class="links">
                    ${this.isLoading ? '<div style="width: 150px; height: 12px; border-radius: 20px" class="skeleton"></div>' : this.userProfile.website ? `
                                <div class="website">
                                    <a target="_blank" href="${this.userProfile.website}"
                                    >${this.userProfile.website}</a
                                    >
                                </div>
                            ` : ""}
                    </div>
                </div>
                <div class="stats" data-orientation="horizontal">
                    ${this.isStatsError ? `<p class="error-text">Error loading stats</p>` : `
                        <button class="stat" data-orientation="horizontal">
                            <div class="stat-inner">
                                <div class="stat-value">
                                    ${this.isStatsNotesLoading ? '<div style="width: 50px; height: 28px; border-radius: 5px" class="skeleton"></div>' : this.stats.notes}
                                </div>
                                <div class="stat-name">Notes</div>
                            </div>
                        </button>
                        
                        <button class="stat" data-orientation="horizontal">
                            <div class="stat-inner">
                                <div class="stat-value">
                                    ${this.isStatsNotesLoading ? '<div style="width: 50px; height: 28px; border-radius: 5px" class="skeleton"></div>' : this.stats.replies}
                                </div>
                                <div class="stat-name">Replies</div>
                            </div></button>
                        
                        <!-- TODO: Add zaps after resolving the doubts
                        <button class="stat" data-orientation="horizontal">
                            <div class="stat-inner">
                                <div class="stat-value">
                                    ${this.isStatsLoading ? '<div style="width: 50px; height: 28px; border-radius: 5px" class="skeleton"></div>' : this.stats.zaps}
                                </div>
                                <div class="stat-name">Zaps</div>
                            </div>
                        </button>
                        -->
                        
                        <button class="stat" data-orientation="horizontal">
                            <div class="stat-inner">
                                <div class="stat-value">
                                    ${this.isStatsFollowsLoading ? '<div style="width: 50px; height: 28px; border-radius: 5px" class="skeleton"></div>' : this.stats.follows}
                                </div>
                                <div class="stat-name">Following</div>
                            </div>
                        </button>

                        <button class="stat" data-orientation="horizontal">
                            <div class="stat-inner">
                                <div class="stat-value">
                                    ${this.isStatsFollowersLoading ? '<div style="width: 50px; height: 28px; border-radius: 5px" class="skeleton"></div>' : this.stats.followers}
                                </div>
                                <div class="stat-name">Followers</div>
                            </div>
                        </button>
                        
                        <!--
                        <button class="stat" data-orientation="horizontal">
                            <div class="stat-inner">
                                <div class="stat-value">
                                    ${this.isStatsRelaysLoading ? '<div style="width: 20px; height: 28px; border-radius: 5px" class="skeleton"></div>' : this.stats.relays}
                                </div>
                                <div class="stat-name">Relays</div>
                            </div>
                        </button>
                        -->
                      `}
                </div>
            </div>
        `;
      }
      this.attachEventListeners();
    }
  };
  customElements.define("nostr-profile", NostrProfile);

  // nostr-follow-button.ts
  var NostrFollowButton = class extends HTMLElement {
    rendered = false;
    ndk = new NDK();
    theme = "light";
    isLoading = false;
    isError = false;
    errorMessage = "";
    isFollowed = false;
    connectToNostr = async () => {
      await this.ndk.connect();
    };
    getRelays = () => {
      const userRelays = this.getAttribute("relays");
      if (userRelays) {
        return userRelays.split(",");
      }
      return DEFAULT_RELAYS;
    };
    getTheme = async () => {
      this.theme = "light";
      const userTheme = this.getAttribute("theme");
      if (userTheme) {
        const isValidTheme = ["light", "dark"].includes(userTheme);
        if (!isValidTheme) {
          throw new Error(
            `Invalid theme '${userTheme}'. Accepted values are 'light', 'dark'`
          );
        }
        this.theme = userTheme;
      }
    };
    connectedCallback() {
      if (!this.rendered) {
        this.ndk = new NDK({
          explicitRelayUrls: this.getRelays()
        });
        this.getTheme();
        this.connectToNostr();
        this.render();
        this.rendered = true;
      }
    }
    static get observedAttributes() {
      return ["relays", "npub", "theme"];
    }
    attributeChangedCallback(name, _oldValue, newValue) {
      if (name === "relays") {
        this.ndk.explicitRelayUrls = this.getRelays();
        this.connectToNostr();
      }
      if (name === "theme") {
        this.getTheme();
      }
      this.render();
    }
    attachEventListeners() {
      this.querySelector(".nostr-follow-button")?.addEventListener("click", async () => {
        this.isError = false;
        const nip07signer = new NDKNip07Signer();
        this.isLoading = true;
        this.render();
        try {
          this.ndk.signer = nip07signer;
          await this.connectToNostr();
          const userToFollowNpub = this.getAttribute("npub");
          const userToFollowNip05 = this.getAttribute("nip05");
          const userToFollowPubkey = this.getAttribute("pubkey");
          if (!userToFollowNpub && !userToFollowNip05 && !userToFollowPubkey) {
            this.errorMessage = "Provide npub, nip05 or pubkey";
            this.isError = true;
          } else {
            let userToFollow = null;
            if (userToFollowPubkey) {
              userToFollow = this.ndk.getUser({
                pubkey: userToFollowPubkey
              });
            } else if (userToFollowNpub) {
              userToFollow = this.ndk.getUser({
                npub: userToFollowNpub
              });
            } else if (userToFollowNip05) {
              const userFromNip05 = await this.ndk.getUserFromNip05(userToFollowNip05);
              if (userFromNip05) {
                userToFollow = this.ndk.getUser({
                  npub: userFromNip05.npub
                });
              }
            }
            if (userToFollow != null) {
              const signedUser = await this.ndk.signer.user();
              await signedUser.follow(userToFollow);
              this.isFollowed = true;
            }
          }
        } catch (err) {
          this.isError = true;
          if (err.message && err.message.includes("NIP-07")) {
            this.errorMessage = `Looks like you don't have any nostr signing browser extension.
                                Please checkout the following video to setup a signer extension - <a href="https://youtu.be/8thRYn14nB0?t=310" target="_blank">Video</a>`;
          } else {
            this.errorMessage = "Please authorize, click the button to try again!";
          }
        } finally {
          this.isLoading = false;
        }
        this.render();
      });
    }
    getStyles() {
      let variables = ``;
      if (this.theme === "dark") {
        variables = `
          --nstrc-follow-btn-background: var(--nstrc-follow-btn-background-dark);
          --nstrc-follow-btn-hover-background: var(--nstrc-follow-btn-hover-background-dark);
    
          --nstrc-follow-btn-text-color: var(--nstrc-follow-btn-text-color-dark);
          --nstrc-follow-btn-border: var(--nstrc-follow-btn-border-dark);
      `;
      } else {
        variables = `
          --nstrc-follow-btn-background: var(--nstrc-follow-btn-background-light);
          --nstrc-follow-btn-hover-background: var(--nstrc-follow-btn-hover-background-light);
    
          --nstrc-follow-btn-text-color: var(--nstrc-follow-btn-text-color-light);
          --nstrc-follow-btn-border: var(--nstrc-follow-btn-border-light);
      `;
      }
      return `
        <style>
          :root {
            ${variables}

            --nstrc-follow-btn-padding: 10px 16px;
            --nstrc-follow-btn-font-size: 16px;
            --nstrc-follow-btn-background-dark: #000000;
            --nstrc-follow-btn-background-light: #FFFFFF;
            --nstrc-follow-btn-hover-background-dark: #222222;
            --nstrc-follow-btn-hover-background-light: #F9F9F9;
            --nstrc-follow-btn-border-dark: none;
            --nstrc-follow-btn-border-light: 1px solid #DDDDDD;
            --nstrc-follow-btn-text-color-dark: #FFFFFF;
            --nstrc-follow-btn-text-color-light: #000000;
            --nstrc-follow-btn-border-radius: 8px;
            --nstrc-follow-btn-error-font-size: 12px;
            --nstrc-follow-btn-error-line-height: 1em;
            --nstrc-follow-btn-error-max-width: 250px;
            --nstrc-follow-btn-horizontal-alignment: start;
            --nstrc-follow-btn-min-height: 47px;
          }

          .nostr-follow-button-container {
            display: flex;
            flex-direction: column;
            font-family: Inter,sans-serif;
            flex-direction: column;
            gap: 8px;
            width: fit-content;
          }

          .nostr-follow-button-wrapper {
            display: flex;
            justify-content: var(--nstrc-follow-btn-horizontal-alignment);
          }
    
          .nostr-follow-button {
            display: flex;
            align-items: center;
            gap: 12px;
            border-radius: var(--nstrc-follow-btn-border-radius);
            background-color: var(--nstrc-follow-btn-background);
            cursor: pointer;

            min-height: var(--nstrc-follow-btn-min-height);

            border: var(--nstrc-follow-btn-border);

            padding: var(--nstrc-follow-btn-padding);
            font-size: var(--nstrc-follow-btn-font-size);
            color: var(--nstrc-follow-btn-text-color);

            ${this.isLoading ? "pointer-events: none; user-select: none; background-color: var(--nstrc-follow-btn-hover-background);" : ""}
          }

          .nostr-follow-button:hover {
            background-color: var(--nstrc-follow-btn-hover-background);
          }

          .nostr-follow-button-error small {
            justify-content: flex-end;
            color: red;
            font-size: var(--nstrc-follow-btn-error-font-size);
            line-height: var(--nstrc-follow-btn-error-line-height);
            max-width: var(--nstrc-follow-btn-error-max-width);
          }
        </style>
    `;
    }
    render() {
      const iconWidthAttribute = this.getAttribute("icon-width");
      const iconHeightAttribute = this.getAttribute("icon-height");
      const iconWidth = iconWidthAttribute !== null ? Number(iconWidthAttribute) : 25;
      const iconHeight = iconHeightAttribute !== null ? Number(iconHeightAttribute) : 25;
      this.innerHTML = this.getStyles();
      this.innerHTML += `
      <div class="nostr-follow-button-container ${this.isError ? "nostr-follow-button-error" : ""}">
        <div class="nostr-follow-button-wrapper">
          <button class="nostr-follow-button">
            ${this.isLoading ? `${getLoadingNostrich(this.theme, iconWidth, iconHeight)} <span>Following...</span>` : this.isFollowed ? `${getSuccessAnimation(this.theme, iconWidth, iconHeight)} Followed!` : `${getNostrLogo(this.theme, iconWidth, iconHeight)} <span>Follow me on Nostr</span>`}
          </button>
        </div>

        ${this.isError ? `<small>${this.errorMessage}</small>` : ""}
      </div>
    `;
      this.attachEventListeners();
    }
  };
  customElements.define("nostr-follow-button", NostrFollowButton);
})();
/*! Bundled license information:

@scure/base/lib/index.js:
  (*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/modular.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/curve.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/weierstrass.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/_shortw_utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/secp256k1.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@scure/base/lib/esm/index.js:
  (*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/ciphers/esm/utils.js:
  (*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/modular.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/curve.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/weierstrass.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/_shortw_utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/secp256k1.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@scure/base/lib/esm/index.js:
  (*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@glidejs/glide/dist/glide.esm.js:
  (*!
   * Glide.js v3.7.1
   * (c) 2013-2024 Jędrzej Chałubek (https://github.com/jedrzejchalubek/)
   * Released under the MIT License.
   *)
*/
