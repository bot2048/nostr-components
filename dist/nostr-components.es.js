var Pe = Object.defineProperty;
var $e = (n) => {
  throw TypeError(n);
};
var Ne = (n, e, t) => e in n ? Pe(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var y = (n, e, t) => Ne(n, typeof e != "symbol" ? e + "" : e, t), Ie = (n, e, t) => e.has(n) || $e("Cannot " + t);
var Te = (n, e, t) => e.has(n) ? $e("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t);
var Ee = (n, e, t) => (Ie(n, e, "access private method"), t);
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var lib$1 = {}, types = {};
Object.defineProperty(types, "__esModule", { value: !0 });
var ee = {}, taskCollection$1 = {}, taskCollection = {}, utils$1 = {};
Object.defineProperty(utils$1, "__esModule", { value: !0 });
utils$1._fast_remove_single = void 0;
function _fast_remove_single(n, e) {
  e !== -1 && (e === 0 ? n.shift() : e === n.length - 1 ? n.length = n.length - 1 : n.splice(e, 1));
}
utils$1._fast_remove_single = _fast_remove_single;
var bakeCollection = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: !0 }), exports.bakeCollectionVariadic = exports.bakeCollectionAwait = exports.bakeCollection = exports.BAKED_EMPTY_FUNC = void 0, exports.BAKED_EMPTY_FUNC = function() {
  };
  var FORLOOP_FALLBACK = 1500;
  function generateArgsDefCode(n) {
    var e = "";
    if (n === 0)
      return e;
    for (var t = 0; t < n - 1; ++t)
      e += "arg" + String(t) + ", ";
    return e += "arg" + String(n - 1), e;
  }
  function generateBodyPartsCode(n, e) {
    for (var t = "", r = "", s = 0; s < e; ++s)
      t += "var f".concat(s, " = collection[").concat(s, `];
`), r += "f".concat(s, "(").concat(n, `)
`);
    return { funcDefCode: t, funcCallCode: r };
  }
  function generateBodyPartsVariadicCode(n) {
    for (var e = "", t = "", r = 0; r < n; ++r)
      e += "var f".concat(r, " = collection[").concat(r, `];
`), t += "f".concat(r, `.apply(undefined, arguments)
`);
    return { funcDefCode: e, funcCallCode: t };
  }
  function bakeCollection(collection, fixedArgsNum) {
    if (collection.length === 0)
      return exports.BAKED_EMPTY_FUNC;
    if (collection.length === 1)
      return collection[0];
    var funcFactoryCode;
    if (collection.length < FORLOOP_FALLBACK) {
      var argsDefCode = generateArgsDefCode(fixedArgsNum), _a = generateBodyPartsCode(argsDefCode, collection.length), funcDefCode = _a.funcDefCode, funcCallCode = _a.funcCallCode;
      funcFactoryCode = `(function(collection) {
            `.concat(funcDefCode, `
            collection = undefined;
            return (function(`).concat(argsDefCode, `) {
                `).concat(funcCallCode, `
            });
        })`);
    } else {
      var argsDefCode = generateArgsDefCode(fixedArgsNum);
      collection.length % 10 === 0 ? funcFactoryCode = `(function(collection) {
                return (function(`.concat(argsDefCode, `) {
                    for (var i = 0; i < collection.length; i += 10) {
                        collection[i](`).concat(argsDefCode, `);
                        collection[i+1](`).concat(argsDefCode, `);
                        collection[i+2](`).concat(argsDefCode, `);
                        collection[i+3](`).concat(argsDefCode, `);
                        collection[i+4](`).concat(argsDefCode, `);
                        collection[i+5](`).concat(argsDefCode, `);
                        collection[i+6](`).concat(argsDefCode, `);
                        collection[i+7](`).concat(argsDefCode, `);
                        collection[i+8](`).concat(argsDefCode, `);
                        collection[i+9](`).concat(argsDefCode, `);
                    }
                });
            })`) : collection.length % 4 === 0 ? funcFactoryCode = `(function(collection) {
                return (function(`.concat(argsDefCode, `) {
                    for (var i = 0; i < collection.length; i += 4) {
                        collection[i](`).concat(argsDefCode, `);
                        collection[i+1](`).concat(argsDefCode, `);
                        collection[i+2](`).concat(argsDefCode, `);
                        collection[i+3](`).concat(argsDefCode, `);
                    }
                });
            })`) : collection.length % 3 === 0 ? funcFactoryCode = `(function(collection) {
                return (function(`.concat(argsDefCode, `) {
                    for (var i = 0; i < collection.length; i += 3) {
                        collection[i](`).concat(argsDefCode, `);
                        collection[i+1](`).concat(argsDefCode, `);
                        collection[i+2](`).concat(argsDefCode, `);
                    }
                });
            })`) : funcFactoryCode = `(function(collection) {
                return (function(`.concat(argsDefCode, `) {
                    for (var i = 0; i < collection.length; ++i) {
                        collection[i](`).concat(argsDefCode, `);
                    }
                });
            })`);
    }
    {
      var funcFactory = eval(funcFactoryCode);
      return funcFactory(collection);
    }
  }
  exports.bakeCollection = bakeCollection;
  function bakeCollectionAwait(collection, fixedArgsNum) {
    if (collection.length === 0)
      return exports.BAKED_EMPTY_FUNC;
    if (collection.length === 1)
      return collection[0];
    var funcFactoryCode;
    if (collection.length < FORLOOP_FALLBACK) {
      var argsDefCode = generateArgsDefCode(fixedArgsNum), _a = generateBodyPartsCode(argsDefCode, collection.length), funcDefCode = _a.funcDefCode, funcCallCode = _a.funcCallCode;
      funcFactoryCode = `(function(collection) {
            `.concat(funcDefCode, `
            collection = undefined;
            return (function(`).concat(argsDefCode, `) {
                return Promise.all([ `).concat(funcCallCode, ` ]);
            });
        })`);
    } else {
      var argsDefCode = generateArgsDefCode(fixedArgsNum);
      funcFactoryCode = `(function(collection) {
            return (function(`.concat(argsDefCode, `) {
                var promises = Array(collection.length);
                for (var i = 0; i < collection.length; ++i) {
                    promises[i] = collection[i](`).concat(argsDefCode, `);
                }
                return Promise.all(promises);
            });
        })`);
    }
    {
      var funcFactory = eval(funcFactoryCode);
      return funcFactory(collection);
    }
  }
  exports.bakeCollectionAwait = bakeCollectionAwait;
  function bakeCollectionVariadic(collection) {
    if (collection.length === 0)
      return exports.BAKED_EMPTY_FUNC;
    if (collection.length === 1)
      return collection[0];
    var funcFactoryCode;
    if (collection.length < FORLOOP_FALLBACK) {
      var _a = generateBodyPartsVariadicCode(collection.length), funcDefCode = _a.funcDefCode, funcCallCode = _a.funcCallCode;
      funcFactoryCode = `(function(collection) {
            `.concat(funcDefCode, `
            collection = undefined;
            return (function() {
                `).concat(funcCallCode, `
            });
        })`);
    } else
      funcFactoryCode = `(function(collection) {
            return (function() {
                for (var i = 0; i < collection.length; ++i) {
                    collection[i].apply(undefined, arguments);
                }
            });
        })`;
    {
      var funcFactory = eval(funcFactoryCode);
      return funcFactory(collection);
    }
  }
  exports.bakeCollectionVariadic = bakeCollectionVariadic;
})(bakeCollection);
var __spreadArray$1 = commonjsGlobal && commonjsGlobal.__spreadArray || function(n, e, t) {
  if (t || arguments.length === 2) for (var r = 0, s = e.length, o; r < s; r++)
    (o || !(r in e)) && (o || (o = Array.prototype.slice.call(e, 0, r)), o[r] = e[r]);
  return n.concat(o || Array.prototype.slice.call(e));
};
Object.defineProperty(taskCollection, "__esModule", { value: !0 });
taskCollection.TaskCollection = void 0;
var utils_1$1 = utils$1, bake_collection_1 = bakeCollection;
function push_norebuild(n, e) {
  var t = this.length;
  if (t > 1)
    if (e) {
      var r;
      (r = this._tasks).push.apply(r, arguments), this.length += arguments.length;
    } else
      this._tasks.push(n), this.length++;
  else if (e) {
    if (t === 1) {
      var s = Array(1 + arguments.length);
      s.push(s), s.push.apply(s, arguments), this._tasks = s;
    } else {
      var s = Array(arguments.length);
      s.push.apply(s, arguments), this._tasks = s;
    }
    this.length += arguments.length;
  } else
    t === 1 ? this._tasks = [this._tasks, n] : this._tasks = n, this.length++;
}
function push_rebuild(n, e) {
  var t = this.length;
  if (t > 1)
    if (e) {
      var r;
      (r = this._tasks).push.apply(r, arguments), this.length += arguments.length;
    } else
      this._tasks.push(n), this.length++;
  else if (e) {
    if (t === 1) {
      var s = Array(1 + arguments.length);
      s.push(s), s.push.apply(s, arguments), this._tasks = s;
    } else {
      var s = Array(arguments.length);
      s.push.apply(s, arguments), this._tasks = s;
    }
    this.length += arguments.length;
  } else
    t === 1 ? this._tasks = [this._tasks, n] : this._tasks = n, this.length++;
  this.firstEmitBuildStrategy ? this.call = rebuild_on_first_call : this.rebuild();
}
function removeLast_norebuild(n) {
  this.length !== 0 && (this.length === 1 ? this._tasks === n && (this.length = 0) : ((0, utils_1$1._fast_remove_single)(this._tasks, this._tasks.lastIndexOf(n)), this._tasks.length === 1 ? (this._tasks = this._tasks[0], this.length = 1) : this.length = this._tasks.length));
}
function removeLast_rebuild(n) {
  if (this.length !== 0) {
    if (this.length === 1)
      if (this._tasks === n && (this.length = 0), this.firstEmitBuildStrategy) {
        this.call = bake_collection_1.BAKED_EMPTY_FUNC;
        return;
      } else {
        this.rebuild();
        return;
      }
    else
      (0, utils_1$1._fast_remove_single)(this._tasks, this._tasks.lastIndexOf(n)), this._tasks.length === 1 ? (this._tasks = this._tasks[0], this.length = 1) : this.length = this._tasks.length;
    this.firstEmitBuildStrategy ? this.call = rebuild_on_first_call : this.rebuild();
  }
}
function insert_norebuild(n) {
  for (var e, t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  this.length === 0 ? (this._tasks = t, this.length = 1) : this.length === 1 ? (t.unshift(this._tasks), this._tasks = t, this.length = this._tasks.length) : ((e = this._tasks).splice.apply(e, __spreadArray$1([n, 0], t, !1)), this.length = this._tasks.length);
}
function insert_rebuild(n) {
  for (var e, t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  this.length === 0 ? (this._tasks = t, this.length = 1) : this.length === 1 ? (t.unshift(this._tasks), this._tasks = t, this.length = this._tasks.length) : ((e = this._tasks).splice.apply(e, __spreadArray$1([n, 0], t, !1)), this.length = this._tasks.length), this.firstEmitBuildStrategy ? this.call = rebuild_on_first_call : this.rebuild();
}
function rebuild_noawait() {
  this.length === 0 ? this.call = bake_collection_1.BAKED_EMPTY_FUNC : this.length === 1 ? this.call = this._tasks : this.call = (0, bake_collection_1.bakeCollection)(this._tasks, this.argsNum);
}
function rebuild_await() {
  this.length === 0 ? this.call = bake_collection_1.BAKED_EMPTY_FUNC : this.length === 1 ? this.call = this._tasks : this.call = (0, bake_collection_1.bakeCollectionAwait)(this._tasks, this.argsNum);
}
function rebuild_on_first_call() {
  this.rebuild(), this.call.apply(void 0, arguments);
}
var TaskCollection = (
  /** @class */
  /* @__PURE__ */ function() {
    function n(e, t, r, s) {
      t === void 0 && (t = !0), r === void 0 && (r = null), s === void 0 && (s = !1), this.awaitTasks = s, this.call = bake_collection_1.BAKED_EMPTY_FUNC, this.argsNum = e, this.firstEmitBuildStrategy = !0, s ? this.rebuild = rebuild_await.bind(this) : this.rebuild = rebuild_noawait.bind(this), this.setAutoRebuild(t), r ? typeof r == "function" ? (this._tasks = r, this.length = 1) : (this._tasks = r, this.length = r.length) : (this._tasks = null, this.length = 0), t && this.rebuild();
    }
    return n;
  }()
);
taskCollection.TaskCollection = TaskCollection;
function fastClear() {
  this._tasks = null, this.length = 0, this.call = bake_collection_1.BAKED_EMPTY_FUNC;
}
function clear() {
  this._tasks = null, this.length = 0, this.call = bake_collection_1.BAKED_EMPTY_FUNC;
}
function growArgsNum(n) {
  this.argsNum < n && (this.argsNum = n, this.firstEmitBuildStrategy ? this.call = rebuild_on_first_call : this.rebuild());
}
function setAutoRebuild(n) {
  n ? (this.push = push_rebuild.bind(this), this.insert = insert_rebuild.bind(this), this.removeLast = removeLast_rebuild.bind(this)) : (this.push = push_norebuild.bind(this), this.insert = insert_norebuild.bind(this), this.removeLast = removeLast_norebuild.bind(this));
}
function tasksAsArray() {
  return this.length === 0 ? [] : this.length === 1 ? [this._tasks] : this._tasks;
}
function setTasks(n) {
  n.length === 0 ? (this.length = 0, this.call = bake_collection_1.BAKED_EMPTY_FUNC) : n.length === 1 ? (this.length = 1, this.call = n[0], this._tasks = n[0]) : (this.length = n.length, this._tasks = n, this.firstEmitBuildStrategy ? this.call = rebuild_on_first_call : this.rebuild());
}
TaskCollection.prototype.fastClear = fastClear;
TaskCollection.prototype.clear = clear;
TaskCollection.prototype.growArgsNum = growArgsNum;
TaskCollection.prototype.setAutoRebuild = setAutoRebuild;
TaskCollection.prototype.tasksAsArray = tasksAsArray;
TaskCollection.prototype.setTasks = setTasks;
(function(n) {
  var e = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(r, s, o, a) {
    a === void 0 && (a = o);
    var c = Object.getOwnPropertyDescriptor(s, o);
    (!c || ("get" in c ? !s.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
      return s[o];
    } }), Object.defineProperty(r, a, c);
  } : function(r, s, o, a) {
    a === void 0 && (a = o), r[a] = s[o];
  }), t = commonjsGlobal && commonjsGlobal.__exportStar || function(r, s) {
    for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(s, o) && e(s, r, o);
  };
  Object.defineProperty(n, "__esModule", { value: !0 }), t(taskCollection, n);
})(taskCollection$1);
var utils = {};
Object.defineProperty(utils, "__esModule", { value: !0 });
utils.nullObj = void 0;
function nullObj() {
  var n = {};
  return n.__proto__ = null, n;
}
utils.nullObj = nullObj;
var __spreadArray = commonjsGlobal && commonjsGlobal.__spreadArray || function(n, e, t) {
  if (t || arguments.length === 2) for (var r = 0, s = e.length, o; r < s; r++)
    (o || !(r in e)) && (o || (o = Array.prototype.slice.call(e, 0, r)), o[r] = e[r]);
  return n.concat(o || Array.prototype.slice.call(e));
};
Object.defineProperty(ee, "__esModule", { value: !0 });
ee.EventEmitter = void 0;
var task_collection_1 = taskCollection$1, utils_1 = utils$1, utils_2 = utils;
function emit(n, e, t, r, s, o) {
  var a = this.events[n];
  if (a) {
    if (a.length === 0)
      return !1;
    if (a.argsNum < 6)
      a.call(e, t, r, s, o);
    else {
      for (var c = new Array(a.argsNum), l = 0, u = c.length; l < u; ++l)
        c[l] = arguments[l + 1];
      a.call.apply(void 0, c);
    }
    return !0;
  }
  return !1;
}
function emitHasOnce(n, e, t, r, s, o) {
  var a = this.events[n], c;
  if (a !== void 0) {
    if (a.length === 0)
      return !1;
    if (a.argsNum < 6)
      a.call(e, t, r, s, o);
    else {
      c = new Array(a.argsNum);
      for (var l = 0, u = c.length; l < u; ++l)
        c[l] = arguments[l + 1];
      a.call.apply(void 0, c);
    }
  }
  var h = this.onceEvents[n];
  if (h) {
    if (typeof h == "function")
      if (this.onceEvents[n] = void 0, arguments.length < 6)
        h(e, t, r, s, o);
      else {
        if (c === void 0) {
          c = new Array(arguments.length - 1);
          for (var l = 0, u = c.length; l < u; ++l)
            c[l] = arguments[l + 1];
        }
        h.apply(void 0, c);
      }
    else {
      var f = h;
      if (this.onceEvents[n] = void 0, arguments.length < 6)
        for (var l = 0; l < f.length; ++l)
          f[l](e, t, r, s, o);
      else {
        if (c === void 0) {
          c = new Array(arguments.length - 1);
          for (var l = 0, u = c.length; l < u; ++l)
            c[l] = arguments[l + 1];
        }
        for (var l = 0; l < f.length; ++l)
          f[l].apply(void 0, c);
      }
    }
    return !0;
  }
  return a !== void 0;
}
var EventEmitter = (
  /** @class */
  function() {
    function n() {
      this.events = (0, utils_2.nullObj)(), this.onceEvents = (0, utils_2.nullObj)(), this._symbolKeys = /* @__PURE__ */ new Set(), this.maxListeners = 1 / 0;
    }
    return Object.defineProperty(n.prototype, "_eventsCount", {
      get: function() {
        return this.eventNames().length;
      },
      enumerable: !1,
      configurable: !0
    }), n;
  }()
);
ee.EventEmitter = EventEmitter;
function once(n, e) {
  switch (this.emit === emit && (this.emit = emitHasOnce), typeof this.onceEvents[n]) {
    case "undefined":
      this.onceEvents[n] = e, typeof n == "symbol" && this._symbolKeys.add(n);
      break;
    case "function":
      this.onceEvents[n] = [this.onceEvents[n], e];
      break;
    case "object":
      this.onceEvents[n].push(e);
  }
  return this;
}
function addListener(n, e, t) {
  if (t === void 0 && (t = e.length), typeof e != "function")
    throw new TypeError("The listener must be a function");
  var r = this.events[n];
  return r ? (r.push(e), r.growArgsNum(t), this.maxListeners !== 1 / 0 && this.maxListeners <= r.length && console.warn('Maximum event listeners for "'.concat(String(n), '" event!'))) : (this.events[n] = new task_collection_1.TaskCollection(t, !0, e, !1), typeof n == "symbol" && this._symbolKeys.add(n)), this;
}
function removeListener(n, e) {
  var t = this.events[n];
  t && t.removeLast(e);
  var r = this.onceEvents[n];
  return r && (typeof r == "function" ? this.onceEvents[n] = void 0 : typeof r == "object" && (r.length === 1 && r[0] === e ? this.onceEvents[n] = void 0 : (0, utils_1._fast_remove_single)(r, r.lastIndexOf(e)))), this;
}
function addListenerBound(n, e, t, r) {
  t === void 0 && (t = this), r === void 0 && (r = e.length), this.boundFuncs || (this.boundFuncs = /* @__PURE__ */ new Map());
  var s = e.bind(t);
  return this.boundFuncs.set(e, s), this.addListener(n, s, r);
}
function removeListenerBound(n, e) {
  var t, r, s = (t = this.boundFuncs) === null || t === void 0 ? void 0 : t.get(e);
  return (r = this.boundFuncs) === null || r === void 0 || r.delete(e), this.removeListener(n, s);
}
function hasListeners(n) {
  return this.events[n] && !!this.events[n].length;
}
function prependListener(n, e, t) {
  if (t === void 0 && (t = e.length), typeof e != "function")
    throw new TypeError("The listener must be a function");
  var r = this.events[n];
  return !r || !(r instanceof task_collection_1.TaskCollection) ? (r = this.events[n] = new task_collection_1.TaskCollection(t, !0, e, !1), typeof n == "symbol" && this._symbolKeys.add(n)) : (r.insert(0, e), r.growArgsNum(t), this.maxListeners !== 1 / 0 && this.maxListeners <= r.length && console.warn('Maximum event listeners for "'.concat(String(n), '" event!'))), this;
}
function prependOnceListener(n, e) {
  this.emit === emit && (this.emit = emitHasOnce);
  var t = this.onceEvents[n];
  return t ? typeof t != "object" ? (this.onceEvents[n] = [e, t], typeof n == "symbol" && this._symbolKeys.add(n)) : (t.unshift(e), this.maxListeners !== 1 / 0 && this.maxListeners <= t.length && console.warn('Maximum event listeners for "'.concat(String(n), '" once event!'))) : (this.onceEvents[n] = [e], typeof n == "symbol" && this._symbolKeys.add(n)), this;
}
function removeAllListeners(n) {
  return n === void 0 ? (this.events = (0, utils_2.nullObj)(), this.onceEvents = (0, utils_2.nullObj)(), this._symbolKeys = /* @__PURE__ */ new Set()) : (this.events[n] = void 0, this.onceEvents[n] = void 0, typeof n == "symbol" && this._symbolKeys.delete(n)), this;
}
function setMaxListeners(n) {
  return this.maxListeners = n, this;
}
function getMaxListeners() {
  return this.maxListeners;
}
function listeners(n) {
  return this.emit === emit ? this.events[n] ? this.events[n].tasksAsArray().slice() : [] : this.events[n] && this.onceEvents[n] ? __spreadArray(__spreadArray([], this.events[n].tasksAsArray(), !0), typeof this.onceEvents[n] == "function" ? [this.onceEvents[n]] : this.onceEvents[n], !0) : this.events[n] ? this.events[n].tasksAsArray() : this.onceEvents[n] ? typeof this.onceEvents[n] == "function" ? [this.onceEvents[n]] : this.onceEvents[n] : [];
}
function eventNames() {
  var n = this;
  if (this.emit === emit) {
    var e = Object.keys(this.events);
    return __spreadArray(__spreadArray([], e, !0), Array.from(this._symbolKeys), !0).filter(function(r) {
      return r in n.events && n.events[r] && n.events[r].length;
    });
  } else {
    var e = Object.keys(this.events).filter(function(s) {
      return n.events[s] && n.events[s].length;
    }), t = Object.keys(this.onceEvents).filter(function(s) {
      return n.onceEvents[s] && n.onceEvents[s].length;
    });
    return __spreadArray(__spreadArray(__spreadArray([], e, !0), t, !0), Array.from(this._symbolKeys).filter(function(s) {
      return s in n.events && n.events[s] && n.events[s].length || s in n.onceEvents && n.onceEvents[s] && n.onceEvents[s].length;
    }), !0);
  }
}
function listenerCount(n) {
  return this.emit === emit ? this.events[n] && this.events[n].length || 0 : (this.events[n] && this.events[n].length || 0) + (this.onceEvents[n] && this.onceEvents[n].length || 0);
}
EventEmitter.prototype.emit = emit;
EventEmitter.prototype.on = addListener;
EventEmitter.prototype.once = once;
EventEmitter.prototype.addListener = addListener;
EventEmitter.prototype.removeListener = removeListener;
EventEmitter.prototype.addListenerBound = addListenerBound;
EventEmitter.prototype.removeListenerBound = removeListenerBound;
EventEmitter.prototype.hasListeners = hasListeners;
EventEmitter.prototype.prependListener = prependListener;
EventEmitter.prototype.prependOnceListener = prependOnceListener;
EventEmitter.prototype.off = removeListener;
EventEmitter.prototype.removeAllListeners = removeAllListeners;
EventEmitter.prototype.setMaxListeners = setMaxListeners;
EventEmitter.prototype.getMaxListeners = getMaxListeners;
EventEmitter.prototype.listeners = listeners;
EventEmitter.prototype.eventNames = eventNames;
EventEmitter.prototype.listenerCount = listenerCount;
(function(n) {
  var e = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(r, s, o, a) {
    a === void 0 && (a = o);
    var c = Object.getOwnPropertyDescriptor(s, o);
    (!c || ("get" in c ? !s.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
      return s[o];
    } }), Object.defineProperty(r, a, c);
  } : function(r, s, o, a) {
    a === void 0 && (a = o), r[a] = s[o];
  }), t = commonjsGlobal && commonjsGlobal.__exportStar || function(r, s) {
    for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(s, o) && e(s, r, o);
  };
  Object.defineProperty(n, "__esModule", { value: !0 }), t(types, n), t(ee, n);
})(lib$1);
var browser = { exports: {} }, ms, hasRequiredMs;
function requireMs() {
  if (hasRequiredMs) return ms;
  hasRequiredMs = 1;
  var n = 1e3, e = n * 60, t = e * 60, r = t * 24, s = r * 7, o = r * 365.25;
  ms = function(h, f) {
    f = f || {};
    var p = typeof h;
    if (p === "string" && h.length > 0)
      return a(h);
    if (p === "number" && isFinite(h))
      return f.long ? l(h) : c(h);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(h)
    );
  };
  function a(h) {
    if (h = String(h), !(h.length > 100)) {
      var f = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        h
      );
      if (f) {
        var p = parseFloat(f[1]), m = (f[2] || "ms").toLowerCase();
        switch (m) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return p * o;
          case "weeks":
          case "week":
          case "w":
            return p * s;
          case "days":
          case "day":
          case "d":
            return p * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return p * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return p * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return p * n;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return p;
          default:
            return;
        }
      }
    }
  }
  function c(h) {
    var f = Math.abs(h);
    return f >= r ? Math.round(h / r) + "d" : f >= t ? Math.round(h / t) + "h" : f >= e ? Math.round(h / e) + "m" : f >= n ? Math.round(h / n) + "s" : h + "ms";
  }
  function l(h) {
    var f = Math.abs(h);
    return f >= r ? u(h, f, r, "day") : f >= t ? u(h, f, t, "hour") : f >= e ? u(h, f, e, "minute") : f >= n ? u(h, f, n, "second") : h + " ms";
  }
  function u(h, f, p, m) {
    var E = f >= p * 1.5;
    return Math.round(h / p) + " " + m + (E ? "s" : "");
  }
  return ms;
}
function setup(n) {
  t.debug = t, t.default = t, t.coerce = l, t.disable = a, t.enable = s, t.enabled = c, t.humanize = requireMs(), t.destroy = u, Object.keys(n).forEach((h) => {
    t[h] = n[h];
  }), t.names = [], t.skips = [], t.formatters = {};
  function e(h) {
    let f = 0;
    for (let p = 0; p < h.length; p++)
      f = (f << 5) - f + h.charCodeAt(p), f |= 0;
    return t.colors[Math.abs(f) % t.colors.length];
  }
  t.selectColor = e;
  function t(h) {
    let f, p = null, m, E;
    function g(...b) {
      if (!g.enabled)
        return;
      const w = g, $ = Number(/* @__PURE__ */ new Date()), B = $ - (f || $);
      w.diff = B, w.prev = f, w.curr = $, f = $, b[0] = t.coerce(b[0]), typeof b[0] != "string" && b.unshift("%O");
      let P = 0;
      b[0] = b[0].replace(/%([a-zA-Z%])/g, (R, C) => {
        if (R === "%%")
          return "%";
        P++;
        const L = t.formatters[C];
        if (typeof L == "function") {
          const M = b[P];
          R = L.call(w, M), b.splice(P, 1), P--;
        }
        return R;
      }), t.formatArgs.call(w, b), (w.log || t.log).apply(w, b);
    }
    return g.namespace = h, g.useColors = t.useColors(), g.color = t.selectColor(h), g.extend = r, g.destroy = t.destroy, Object.defineProperty(g, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => p !== null ? p : (m !== t.namespaces && (m = t.namespaces, E = t.enabled(h)), E),
      set: (b) => {
        p = b;
      }
    }), typeof t.init == "function" && t.init(g), g;
  }
  function r(h, f) {
    const p = t(this.namespace + (typeof f > "u" ? ":" : f) + h);
    return p.log = this.log, p;
  }
  function s(h) {
    t.save(h), t.namespaces = h, t.names = [], t.skips = [];
    const f = (typeof h == "string" ? h : "").trim().replace(" ", ",").split(",").filter(Boolean);
    for (const p of f)
      p[0] === "-" ? t.skips.push(p.slice(1)) : t.names.push(p);
  }
  function o(h, f) {
    let p = 0, m = 0, E = -1, g = 0;
    for (; p < h.length; )
      if (m < f.length && (f[m] === h[p] || f[m] === "*"))
        f[m] === "*" ? (E = m, g = p, m++) : (p++, m++);
      else if (E !== -1)
        m = E + 1, g++, p = g;
      else
        return !1;
    for (; m < f.length && f[m] === "*"; )
      m++;
    return m === f.length;
  }
  function a() {
    const h = [
      ...t.names,
      ...t.skips.map((f) => "-" + f)
    ].join(",");
    return t.enable(""), h;
  }
  function c(h) {
    for (const f of t.skips)
      if (o(h, f))
        return !1;
    for (const f of t.names)
      if (o(h, f))
        return !0;
    return !1;
  }
  function l(h) {
    return h instanceof Error ? h.stack || h.message : h;
  }
  function u() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return t.enable(t.load()), t;
}
var common = setup;
(function(n, e) {
  e.formatArgs = r, e.save = s, e.load = o, e.useColors = t, e.storage = a(), e.destroy = /* @__PURE__ */ (() => {
    let l = !1;
    return () => {
      l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), e.colors = [
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
  function t() {
    if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
      return !0;
    if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
      return !1;
    let l;
    return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && (l = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(l[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function r(l) {
    if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + n.exports.humanize(this.diff), !this.useColors)
      return;
    const u = "color: " + this.color;
    l.splice(1, 0, u, "color: inherit");
    let h = 0, f = 0;
    l[0].replace(/%[a-zA-Z%]/g, (p) => {
      p !== "%%" && (h++, p === "%c" && (f = h));
    }), l.splice(f, 0, u);
  }
  e.log = console.debug || console.log || (() => {
  });
  function s(l) {
    try {
      l ? e.storage.setItem("debug", l) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function o() {
    let l;
    try {
      l = e.storage.getItem("debug");
    } catch {
    }
    return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
  }
  function a() {
    try {
      return localStorage;
    } catch {
    }
  }
  n.exports = common(e);
  const { formatters: c } = n.exports;
  c.j = function(l) {
    try {
      return JSON.stringify(l);
    } catch (u) {
      return "[UnexpectedJSONParseError]: " + u.message;
    }
  };
})(browser, browser.exports);
var browserExports = browser.exports;
const createDebug5 = /* @__PURE__ */ getDefaultExportFromCjs(browserExports);
function number$2(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`Wrong positive integer: ${n}`);
}
function bytes$2(n, ...e) {
  if (!(n instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (e.length > 0 && !e.includes(n.length))
    throw new Error(`Expected Uint8Array of length ${e}, not of length=${n.length}`);
}
function hash$1(n) {
  if (typeof n != "function" || typeof n.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  number$2(n.outputLen), number$2(n.blockLen);
}
function exists$1(n, e = !0) {
  if (n.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (e && n.finished)
    throw new Error("Hash#digest() has already been called");
}
function output$1(n, e) {
  bytes$2(n);
  const t = e.outputLen;
  if (n.length < t)
    throw new Error(`digestInto() expects output buffer of length at least ${t}`);
}
const crypto$2 = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const u8a$2 = (n) => n instanceof Uint8Array, createView$2 = (n) => new DataView(n.buffer, n.byteOffset, n.byteLength), rotr$2 = (n, e) => n << 32 - e | n >>> e, isLE$2 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!isLE$2)
  throw new Error("Non little-endian hardware is not supported");
function utf8ToBytes$4(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function toBytes$2(n) {
  if (typeof n == "string" && (n = utf8ToBytes$4(n)), !u8a$2(n))
    throw new Error(`expected Uint8Array, got ${typeof n}`);
  return n;
}
function concatBytes$4(...n) {
  const e = new Uint8Array(n.reduce((r, s) => r + s.length, 0));
  let t = 0;
  return n.forEach((r) => {
    if (!u8a$2(r))
      throw new Error("Uint8Array expected");
    e.set(r, t), t += r.length;
  }), e;
}
let Hash$2 = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
function wrapConstructor$2(n) {
  const e = (r) => n().update(toBytes$2(r)).digest(), t = n();
  return e.outputLen = t.outputLen, e.blockLen = t.blockLen, e.create = () => n(), e;
}
function randomBytes$2(n = 32) {
  if (crypto$2 && typeof crypto$2.getRandomValues == "function")
    return crypto$2.getRandomValues(new Uint8Array(n));
  throw new Error("crypto.getRandomValues must be defined");
}
function setBigUint64$2(n, e, t, r) {
  if (typeof n.setBigUint64 == "function")
    return n.setBigUint64(e, t, r);
  const s = BigInt(32), o = BigInt(4294967295), a = Number(t >> s & o), c = Number(t & o), l = r ? 4 : 0, u = r ? 0 : 4;
  n.setUint32(e + l, a, r), n.setUint32(e + u, c, r);
}
let SHA2$1 = class extends Hash$2 {
  constructor(e, t, r, s) {
    super(), this.blockLen = e, this.outputLen = t, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = createView$2(this.buffer);
  }
  update(e) {
    exists$1(this);
    const { view: t, buffer: r, blockLen: s } = this;
    e = toBytes$2(e);
    const o = e.length;
    for (let a = 0; a < o; ) {
      const c = Math.min(s - this.pos, o - a);
      if (c === s) {
        const l = createView$2(e);
        for (; s <= o - a; a += s)
          this.process(l, a);
        continue;
      }
      r.set(e.subarray(a, a + c), this.pos), this.pos += c, a += c, this.pos === s && (this.process(t, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    exists$1(this), output$1(e, this), this.finished = !0;
    const { buffer: t, view: r, blockLen: s, isLE: o } = this;
    let { pos: a } = this;
    t[a++] = 128, this.buffer.subarray(a).fill(0), this.padOffset > s - a && (this.process(r, 0), a = 0);
    for (let f = a; f < s; f++)
      t[f] = 0;
    setBigUint64$2(r, s - 8, BigInt(this.length * 8), o), this.process(r, 0);
    const c = createView$2(e), l = this.outputLen;
    if (l % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const u = l / 4, h = this.get();
    if (u > h.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let f = 0; f < u; f++)
      c.setUint32(4 * f, h[f], o);
  }
  digest() {
    const { buffer: e, outputLen: t } = this;
    this.digestInto(e);
    const r = e.slice(0, t);
    return this.destroy(), r;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    const { blockLen: t, buffer: r, length: s, finished: o, destroyed: a, pos: c } = this;
    return e.length = s, e.pos = c, e.finished = o, e.destroyed = a, s % t && e.buffer.set(r), e;
  }
};
const Chi$2 = (n, e, t) => n & e ^ ~n & t, Maj$2 = (n, e, t) => n & e ^ n & t ^ e & t, SHA256_K$2 = /* @__PURE__ */ new Uint32Array([
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
]), IV$1 = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), SHA256_W$2 = /* @__PURE__ */ new Uint32Array(64);
let SHA256$2 = class extends SHA2$1 {
  constructor() {
    super(64, 32, 8, !1), this.A = IV$1[0] | 0, this.B = IV$1[1] | 0, this.C = IV$1[2] | 0, this.D = IV$1[3] | 0, this.E = IV$1[4] | 0, this.F = IV$1[5] | 0, this.G = IV$1[6] | 0, this.H = IV$1[7] | 0;
  }
  get() {
    const { A: e, B: t, C: r, D: s, E: o, F: a, G: c, H: l } = this;
    return [e, t, r, s, o, a, c, l];
  }
  // prettier-ignore
  set(e, t, r, s, o, a, c, l) {
    this.A = e | 0, this.B = t | 0, this.C = r | 0, this.D = s | 0, this.E = o | 0, this.F = a | 0, this.G = c | 0, this.H = l | 0;
  }
  process(e, t) {
    for (let f = 0; f < 16; f++, t += 4)
      SHA256_W$2[f] = e.getUint32(t, !1);
    for (let f = 16; f < 64; f++) {
      const p = SHA256_W$2[f - 15], m = SHA256_W$2[f - 2], E = rotr$2(p, 7) ^ rotr$2(p, 18) ^ p >>> 3, g = rotr$2(m, 17) ^ rotr$2(m, 19) ^ m >>> 10;
      SHA256_W$2[f] = g + SHA256_W$2[f - 7] + E + SHA256_W$2[f - 16] | 0;
    }
    let { A: r, B: s, C: o, D: a, E: c, F: l, G: u, H: h } = this;
    for (let f = 0; f < 64; f++) {
      const p = rotr$2(c, 6) ^ rotr$2(c, 11) ^ rotr$2(c, 25), m = h + p + Chi$2(c, l, u) + SHA256_K$2[f] + SHA256_W$2[f] | 0, g = (rotr$2(r, 2) ^ rotr$2(r, 13) ^ rotr$2(r, 22)) + Maj$2(r, s, o) | 0;
      h = u, u = l, l = c, c = a + m | 0, a = o, o = s, s = r, r = m + g | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, o = o + this.C | 0, a = a + this.D | 0, c = c + this.E | 0, l = l + this.F | 0, u = u + this.G | 0, h = h + this.H | 0, this.set(r, s, o, a, c, l, u, h);
  }
  roundClean() {
    SHA256_W$2.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const sha256$2 = /* @__PURE__ */ wrapConstructor$2(() => new SHA256$2());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$9 = BigInt(0), _1n$9 = BigInt(1), _2n$5 = BigInt(2), u8a$1 = (n) => n instanceof Uint8Array, hexes$3 = /* @__PURE__ */ Array.from({ length: 256 }, (n, e) => e.toString(16).padStart(2, "0"));
function bytesToHex$3(n) {
  if (!u8a$1(n))
    throw new Error("Uint8Array expected");
  let e = "";
  for (let t = 0; t < n.length; t++)
    e += hexes$3[n[t]];
  return e;
}
function numberToHexUnpadded$1(n) {
  const e = n.toString(16);
  return e.length & 1 ? `0${e}` : e;
}
function hexToNumber$1(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  return BigInt(n === "" ? "0" : `0x${n}`);
}
function hexToBytes$3(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  const e = n.length;
  if (e % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + e);
  const t = new Uint8Array(e / 2);
  for (let r = 0; r < t.length; r++) {
    const s = r * 2, o = n.slice(s, s + 2), a = Number.parseInt(o, 16);
    if (Number.isNaN(a) || a < 0)
      throw new Error("Invalid byte sequence");
    t[r] = a;
  }
  return t;
}
function bytesToNumberBE$1(n) {
  return hexToNumber$1(bytesToHex$3(n));
}
function bytesToNumberLE$1(n) {
  if (!u8a$1(n))
    throw new Error("Uint8Array expected");
  return hexToNumber$1(bytesToHex$3(Uint8Array.from(n).reverse()));
}
function numberToBytesBE$1(n, e) {
  return hexToBytes$3(n.toString(16).padStart(e * 2, "0"));
}
function numberToBytesLE$1(n, e) {
  return numberToBytesBE$1(n, e).reverse();
}
function numberToVarBytesBE$1(n) {
  return hexToBytes$3(numberToHexUnpadded$1(n));
}
function ensureBytes$1(n, e, t) {
  let r;
  if (typeof e == "string")
    try {
      r = hexToBytes$3(e);
    } catch (o) {
      throw new Error(`${n} must be valid hex string, got "${e}". Cause: ${o}`);
    }
  else if (u8a$1(e))
    r = Uint8Array.from(e);
  else
    throw new Error(`${n} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof t == "number" && s !== t)
    throw new Error(`${n} expected ${t} bytes, got ${s}`);
  return r;
}
function concatBytes$3(...n) {
  const e = new Uint8Array(n.reduce((r, s) => r + s.length, 0));
  let t = 0;
  return n.forEach((r) => {
    if (!u8a$1(r))
      throw new Error("Uint8Array expected");
    e.set(r, t), t += r.length;
  }), e;
}
function equalBytes$2(n, e) {
  if (n.length !== e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (n[t] !== e[t])
      return !1;
  return !0;
}
function utf8ToBytes$3(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function bitLen$1(n) {
  let e;
  for (e = 0; n > _0n$9; n >>= _1n$9, e += 1)
    ;
  return e;
}
function bitGet$1(n, e) {
  return n >> BigInt(e) & _1n$9;
}
const bitSet$1 = (n, e, t) => n | (t ? _1n$9 : _0n$9) << BigInt(e), bitMask$1 = (n) => (_2n$5 << BigInt(n - 1)) - _1n$9, u8n$1 = (n) => new Uint8Array(n), u8fr$1 = (n) => Uint8Array.from(n);
function createHmacDrbg$1(n, e, t) {
  if (typeof n != "number" || n < 2)
    throw new Error("hashLen must be a number");
  if (typeof e != "number" || e < 2)
    throw new Error("qByteLen must be a number");
  if (typeof t != "function")
    throw new Error("hmacFn must be a function");
  let r = u8n$1(n), s = u8n$1(n), o = 0;
  const a = () => {
    r.fill(1), s.fill(0), o = 0;
  }, c = (...f) => t(s, r, ...f), l = (f = u8n$1()) => {
    s = c(u8fr$1([0]), f), r = c(), f.length !== 0 && (s = c(u8fr$1([1]), f), r = c());
  }, u = () => {
    if (o++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let f = 0;
    const p = [];
    for (; f < e; ) {
      r = c();
      const m = r.slice();
      p.push(m), f += r.length;
    }
    return concatBytes$3(...p);
  };
  return (f, p) => {
    a(), l(f);
    let m;
    for (; !(m = p(u())); )
      l();
    return a(), m;
  };
}
const validatorFns$1 = {
  bigint: (n) => typeof n == "bigint",
  function: (n) => typeof n == "function",
  boolean: (n) => typeof n == "boolean",
  string: (n) => typeof n == "string",
  stringOrUint8Array: (n) => typeof n == "string" || n instanceof Uint8Array,
  isSafeInteger: (n) => Number.isSafeInteger(n),
  array: (n) => Array.isArray(n),
  field: (n, e) => e.Fp.isValid(n),
  hash: (n) => typeof n == "function" && Number.isSafeInteger(n.outputLen)
};
function validateObject$1(n, e, t = {}) {
  const r = (s, o, a) => {
    const c = validatorFns$1[o];
    if (typeof c != "function")
      throw new Error(`Invalid validator "${o}", expected function`);
    const l = n[s];
    if (!(a && l === void 0) && !c(l, n))
      throw new Error(`Invalid param ${String(s)}=${l} (${typeof l}), expected ${o}`);
  };
  for (const [s, o] of Object.entries(e))
    r(s, o, !1);
  for (const [s, o] of Object.entries(t))
    r(s, o, !0);
  return n;
}
const ut$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: bitGet$1,
  bitLen: bitLen$1,
  bitMask: bitMask$1,
  bitSet: bitSet$1,
  bytesToHex: bytesToHex$3,
  bytesToNumberBE: bytesToNumberBE$1,
  bytesToNumberLE: bytesToNumberLE$1,
  concatBytes: concatBytes$3,
  createHmacDrbg: createHmacDrbg$1,
  ensureBytes: ensureBytes$1,
  equalBytes: equalBytes$2,
  hexToBytes: hexToBytes$3,
  hexToNumber: hexToNumber$1,
  numberToBytesBE: numberToBytesBE$1,
  numberToBytesLE: numberToBytesLE$1,
  numberToHexUnpadded: numberToHexUnpadded$1,
  numberToVarBytesBE: numberToVarBytesBE$1,
  utf8ToBytes: utf8ToBytes$3,
  validateObject: validateObject$1
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$8 = BigInt(0), _1n$8 = BigInt(1), _2n$4 = BigInt(2), _3n$3 = BigInt(3), _4n$1 = BigInt(4), _5n$1 = BigInt(5), _8n$1 = BigInt(8);
BigInt(9);
BigInt(16);
function mod$1(n, e) {
  const t = n % e;
  return t >= _0n$8 ? t : e + t;
}
function pow$1(n, e, t) {
  if (t <= _0n$8 || e < _0n$8)
    throw new Error("Expected power/modulo > 0");
  if (t === _1n$8)
    return _0n$8;
  let r = _1n$8;
  for (; e > _0n$8; )
    e & _1n$8 && (r = r * n % t), n = n * n % t, e >>= _1n$8;
  return r;
}
function pow2$1(n, e, t) {
  let r = n;
  for (; e-- > _0n$8; )
    r *= r, r %= t;
  return r;
}
function invert$1(n, e) {
  if (n === _0n$8 || e <= _0n$8)
    throw new Error(`invert: expected positive integers, got n=${n} mod=${e}`);
  let t = mod$1(n, e), r = e, s = _0n$8, o = _1n$8;
  for (; t !== _0n$8; ) {
    const c = r / t, l = r % t, u = s - o * c;
    r = t, t = l, s = o, o = u;
  }
  if (r !== _1n$8)
    throw new Error("invert: does not exist");
  return mod$1(s, e);
}
function tonelliShanks$1(n) {
  const e = (n - _1n$8) / _2n$4;
  let t, r, s;
  for (t = n - _1n$8, r = 0; t % _2n$4 === _0n$8; t /= _2n$4, r++)
    ;
  for (s = _2n$4; s < n && pow$1(s, e, n) !== n - _1n$8; s++)
    ;
  if (r === 1) {
    const a = (n + _1n$8) / _4n$1;
    return function(l, u) {
      const h = l.pow(u, a);
      if (!l.eql(l.sqr(h), u))
        throw new Error("Cannot find square root");
      return h;
    };
  }
  const o = (t + _1n$8) / _2n$4;
  return function(c, l) {
    if (c.pow(l, e) === c.neg(c.ONE))
      throw new Error("Cannot find square root");
    let u = r, h = c.pow(c.mul(c.ONE, s), t), f = c.pow(l, o), p = c.pow(l, t);
    for (; !c.eql(p, c.ONE); ) {
      if (c.eql(p, c.ZERO))
        return c.ZERO;
      let m = 1;
      for (let g = c.sqr(p); m < u && !c.eql(g, c.ONE); m++)
        g = c.sqr(g);
      const E = c.pow(h, _1n$8 << BigInt(u - m - 1));
      h = c.sqr(E), f = c.mul(f, E), p = c.mul(p, h), u = m;
    }
    return f;
  };
}
function FpSqrt$1(n) {
  if (n % _4n$1 === _3n$3) {
    const e = (n + _1n$8) / _4n$1;
    return function(r, s) {
      const o = r.pow(s, e);
      if (!r.eql(r.sqr(o), s))
        throw new Error("Cannot find square root");
      return o;
    };
  }
  if (n % _8n$1 === _5n$1) {
    const e = (n - _5n$1) / _8n$1;
    return function(r, s) {
      const o = r.mul(s, _2n$4), a = r.pow(o, e), c = r.mul(s, a), l = r.mul(r.mul(c, _2n$4), a), u = r.mul(c, r.sub(l, r.ONE));
      if (!r.eql(r.sqr(u), s))
        throw new Error("Cannot find square root");
      return u;
    };
  }
  return tonelliShanks$1(n);
}
const FIELD_FIELDS$1 = [
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
function validateField$1(n) {
  const e = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, t = FIELD_FIELDS$1.reduce((r, s) => (r[s] = "function", r), e);
  return validateObject$1(n, t);
}
function FpPow$1(n, e, t) {
  if (t < _0n$8)
    throw new Error("Expected power > 0");
  if (t === _0n$8)
    return n.ONE;
  if (t === _1n$8)
    return e;
  let r = n.ONE, s = e;
  for (; t > _0n$8; )
    t & _1n$8 && (r = n.mul(r, s)), s = n.sqr(s), t >>= _1n$8;
  return r;
}
function FpInvertBatch$1(n, e) {
  const t = new Array(e.length), r = e.reduce((o, a, c) => n.is0(a) ? o : (t[c] = o, n.mul(o, a)), n.ONE), s = n.inv(r);
  return e.reduceRight((o, a, c) => n.is0(a) ? o : (t[c] = n.mul(o, t[c]), n.mul(o, a)), s), t;
}
function nLength$1(n, e) {
  const t = e !== void 0 ? e : n.toString(2).length, r = Math.ceil(t / 8);
  return { nBitLength: t, nByteLength: r };
}
function Field$1(n, e, t = !1, r = {}) {
  if (n <= _0n$8)
    throw new Error(`Expected Field ORDER > 0, got ${n}`);
  const { nBitLength: s, nByteLength: o } = nLength$1(n, e);
  if (o > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const a = FpSqrt$1(n), c = Object.freeze({
    ORDER: n,
    BITS: s,
    BYTES: o,
    MASK: bitMask$1(s),
    ZERO: _0n$8,
    ONE: _1n$8,
    create: (l) => mod$1(l, n),
    isValid: (l) => {
      if (typeof l != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof l}`);
      return _0n$8 <= l && l < n;
    },
    is0: (l) => l === _0n$8,
    isOdd: (l) => (l & _1n$8) === _1n$8,
    neg: (l) => mod$1(-l, n),
    eql: (l, u) => l === u,
    sqr: (l) => mod$1(l * l, n),
    add: (l, u) => mod$1(l + u, n),
    sub: (l, u) => mod$1(l - u, n),
    mul: (l, u) => mod$1(l * u, n),
    pow: (l, u) => FpPow$1(c, l, u),
    div: (l, u) => mod$1(l * invert$1(u, n), n),
    // Same as above, but doesn't normalize
    sqrN: (l) => l * l,
    addN: (l, u) => l + u,
    subN: (l, u) => l - u,
    mulN: (l, u) => l * u,
    inv: (l) => invert$1(l, n),
    sqrt: r.sqrt || ((l) => a(c, l)),
    invertBatch: (l) => FpInvertBatch$1(c, l),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (l, u, h) => h ? u : l,
    toBytes: (l) => t ? numberToBytesLE$1(l, o) : numberToBytesBE$1(l, o),
    fromBytes: (l) => {
      if (l.length !== o)
        throw new Error(`Fp.fromBytes: expected ${o}, got ${l.length}`);
      return t ? bytesToNumberLE$1(l) : bytesToNumberBE$1(l);
    }
  });
  return Object.freeze(c);
}
function getFieldBytesLength$1(n) {
  if (typeof n != "bigint")
    throw new Error("field order must be bigint");
  const e = n.toString(2).length;
  return Math.ceil(e / 8);
}
function getMinHashLength$1(n) {
  const e = getFieldBytesLength$1(n);
  return e + Math.ceil(e / 2);
}
function mapHashToField$1(n, e, t = !1) {
  const r = n.length, s = getFieldBytesLength$1(e), o = getMinHashLength$1(e);
  if (r < 16 || r < o || r > 1024)
    throw new Error(`expected ${o}-1024 bytes of input, got ${r}`);
  const a = t ? bytesToNumberBE$1(n) : bytesToNumberLE$1(n), c = mod$1(a, e - _1n$8) + _1n$8;
  return t ? numberToBytesLE$1(c, s) : numberToBytesBE$1(c, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$7 = BigInt(0), _1n$7 = BigInt(1);
function wNAF$1(n, e) {
  const t = (s, o) => {
    const a = o.negate();
    return s ? a : o;
  }, r = (s) => {
    const o = Math.ceil(e / s) + 1, a = 2 ** (s - 1);
    return { windows: o, windowSize: a };
  };
  return {
    constTimeNegate: t,
    // non-const time multiplication ladder
    unsafeLadder(s, o) {
      let a = n.ZERO, c = s;
      for (; o > _0n$7; )
        o & _1n$7 && (a = a.add(c)), c = c.double(), o >>= _1n$7;
      return a;
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
    precomputeWindow(s, o) {
      const { windows: a, windowSize: c } = r(o), l = [];
      let u = s, h = u;
      for (let f = 0; f < a; f++) {
        h = u, l.push(h);
        for (let p = 1; p < c; p++)
          h = h.add(u), l.push(h);
        u = h.double();
      }
      return l;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(s, o, a) {
      const { windows: c, windowSize: l } = r(s);
      let u = n.ZERO, h = n.BASE;
      const f = BigInt(2 ** s - 1), p = 2 ** s, m = BigInt(s);
      for (let E = 0; E < c; E++) {
        const g = E * l;
        let b = Number(a & f);
        a >>= m, b > l && (b -= p, a += _1n$7);
        const w = g, $ = g + Math.abs(b) - 1, B = E % 2 !== 0, P = b < 0;
        b === 0 ? h = h.add(t(B, o[w])) : u = u.add(t(P, o[$]));
      }
      return { p: u, f: h };
    },
    wNAFCached(s, o, a, c) {
      const l = s._WINDOW_SIZE || 1;
      let u = o.get(s);
      return u || (u = this.precomputeWindow(s, l), l !== 1 && o.set(s, c(u))), this.wNAF(l, u, a);
    }
  };
}
function validateBasic$1(n) {
  return validateField$1(n.Fp), validateObject$1(n, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...nLength$1(n.n, n.nBitLength),
    ...n,
    p: n.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function validatePointOpts$1(n) {
  const e = validateBasic$1(n);
  validateObject$1(e, {
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
  const { endo: t, Fp: r, a: s } = e;
  if (t) {
    if (!r.eql(s, r.ZERO))
      throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
    if (typeof t != "object" || typeof t.beta != "bigint" || typeof t.splitScalar != "function")
      throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...e });
}
const { bytesToNumberBE: b2n$1, hexToBytes: h2b$1 } = ut$1, DER$1 = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(e = "") {
      super(e);
    }
  },
  _parseInt(n) {
    const { Err: e } = DER$1;
    if (n.length < 2 || n[0] !== 2)
      throw new e("Invalid signature integer tag");
    const t = n[1], r = n.subarray(2, t + 2);
    if (!t || r.length !== t)
      throw new e("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new e("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new e("Invalid signature integer: unnecessary leading zero");
    return { d: b2n$1(r), l: n.subarray(t + 2) };
  },
  toSig(n) {
    const { Err: e } = DER$1, t = typeof n == "string" ? h2b$1(n) : n;
    if (!(t instanceof Uint8Array))
      throw new Error("ui8a expected");
    let r = t.length;
    if (r < 2 || t[0] != 48)
      throw new e("Invalid signature tag");
    if (t[1] !== r - 2)
      throw new e("Invalid signature: incorrect length");
    const { d: s, l: o } = DER$1._parseInt(t.subarray(2)), { d: a, l: c } = DER$1._parseInt(o);
    if (c.length)
      throw new e("Invalid signature: left bytes after parsing");
    return { r: s, s: a };
  },
  hexFromSig(n) {
    const e = (u) => Number.parseInt(u[0], 16) & 8 ? "00" + u : u, t = (u) => {
      const h = u.toString(16);
      return h.length & 1 ? `0${h}` : h;
    }, r = e(t(n.s)), s = e(t(n.r)), o = r.length / 2, a = s.length / 2, c = t(o), l = t(a);
    return `30${t(a + o + 4)}02${l}${s}02${c}${r}`;
  }
}, _0n$6 = BigInt(0), _1n$6 = BigInt(1);
BigInt(2);
const _3n$2 = BigInt(3);
BigInt(4);
function weierstrassPoints$1(n) {
  const e = validatePointOpts$1(n), { Fp: t } = e, r = e.toBytes || ((E, g, b) => {
    const w = g.toAffine();
    return concatBytes$3(Uint8Array.from([4]), t.toBytes(w.x), t.toBytes(w.y));
  }), s = e.fromBytes || ((E) => {
    const g = E.subarray(1), b = t.fromBytes(g.subarray(0, t.BYTES)), w = t.fromBytes(g.subarray(t.BYTES, 2 * t.BYTES));
    return { x: b, y: w };
  });
  function o(E) {
    const { a: g, b } = e, w = t.sqr(E), $ = t.mul(w, E);
    return t.add(t.add($, t.mul(E, g)), b);
  }
  if (!t.eql(t.sqr(e.Gy), o(e.Gx)))
    throw new Error("bad generator point: equation left != right");
  function a(E) {
    return typeof E == "bigint" && _0n$6 < E && E < e.n;
  }
  function c(E) {
    if (!a(E))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function l(E) {
    const { allowedPrivateKeyLengths: g, nByteLength: b, wrapPrivateKey: w, n: $ } = e;
    if (g && typeof E != "bigint") {
      if (E instanceof Uint8Array && (E = bytesToHex$3(E)), typeof E != "string" || !g.includes(E.length))
        throw new Error("Invalid key");
      E = E.padStart(b * 2, "0");
    }
    let B;
    try {
      B = typeof E == "bigint" ? E : bytesToNumberBE$1(ensureBytes$1("private key", E, b));
    } catch {
      throw new Error(`private key must be ${b} bytes, hex or bigint, not ${typeof E}`);
    }
    return w && (B = mod$1(B, $)), c(B), B;
  }
  const u = /* @__PURE__ */ new Map();
  function h(E) {
    if (!(E instanceof f))
      throw new Error("ProjectivePoint expected");
  }
  class f {
    constructor(g, b, w) {
      if (this.px = g, this.py = b, this.pz = w, g == null || !t.isValid(g))
        throw new Error("x required");
      if (b == null || !t.isValid(b))
        throw new Error("y required");
      if (w == null || !t.isValid(w))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(g) {
      const { x: b, y: w } = g || {};
      if (!g || !t.isValid(b) || !t.isValid(w))
        throw new Error("invalid affine point");
      if (g instanceof f)
        throw new Error("projective point not allowed");
      const $ = (B) => t.eql(B, t.ZERO);
      return $(b) && $(w) ? f.ZERO : new f(b, w, t.ONE);
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
    static normalizeZ(g) {
      const b = t.invertBatch(g.map((w) => w.pz));
      return g.map((w, $) => w.toAffine(b[$])).map(f.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(g) {
      const b = f.fromAffine(s(ensureBytes$1("pointHex", g)));
      return b.assertValidity(), b;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(g) {
      return f.BASE.multiply(l(g));
    }
    // "Private method", don't use it directly
    _setWindowSize(g) {
      this._WINDOW_SIZE = g, u.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (e.allowInfinityPoint && !t.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: g, y: b } = this.toAffine();
      if (!t.isValid(g) || !t.isValid(b))
        throw new Error("bad point: x or y not FE");
      const w = t.sqr(b), $ = o(g);
      if (!t.eql(w, $))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: g } = this.toAffine();
      if (t.isOdd)
        return !t.isOdd(g);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(g) {
      h(g);
      const { px: b, py: w, pz: $ } = this, { px: B, py: P, pz: U } = g, R = t.eql(t.mul(b, U), t.mul(B, $)), C = t.eql(t.mul(w, U), t.mul(P, $));
      return R && C;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new f(this.px, t.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: g, b } = e, w = t.mul(b, _3n$2), { px: $, py: B, pz: P } = this;
      let U = t.ZERO, R = t.ZERO, C = t.ZERO, L = t.mul($, $), M = t.mul(B, B), F = t.mul(P, P), x = t.mul($, B);
      return x = t.add(x, x), C = t.mul($, P), C = t.add(C, C), U = t.mul(g, C), R = t.mul(w, F), R = t.add(U, R), U = t.sub(M, R), R = t.add(M, R), R = t.mul(U, R), U = t.mul(x, U), C = t.mul(w, C), F = t.mul(g, F), x = t.sub(L, F), x = t.mul(g, x), x = t.add(x, C), C = t.add(L, L), L = t.add(C, L), L = t.add(L, F), L = t.mul(L, x), R = t.add(R, L), F = t.mul(B, P), F = t.add(F, F), L = t.mul(F, x), U = t.sub(U, L), C = t.mul(F, M), C = t.add(C, C), C = t.add(C, C), new f(U, R, C);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(g) {
      h(g);
      const { px: b, py: w, pz: $ } = this, { px: B, py: P, pz: U } = g;
      let R = t.ZERO, C = t.ZERO, L = t.ZERO;
      const M = e.a, F = t.mul(e.b, _3n$2);
      let x = t.mul(b, B), _ = t.mul(w, P), S = t.mul($, U), T = t.add(b, w), v = t.add(B, P);
      T = t.mul(T, v), v = t.add(x, _), T = t.sub(T, v), v = t.add(b, $);
      let k = t.add(B, U);
      return v = t.mul(v, k), k = t.add(x, S), v = t.sub(v, k), k = t.add(w, $), R = t.add(P, U), k = t.mul(k, R), R = t.add(_, S), k = t.sub(k, R), L = t.mul(M, v), R = t.mul(F, S), L = t.add(R, L), R = t.sub(_, L), L = t.add(_, L), C = t.mul(R, L), _ = t.add(x, x), _ = t.add(_, x), S = t.mul(M, S), v = t.mul(F, v), _ = t.add(_, S), S = t.sub(x, S), S = t.mul(M, S), v = t.add(v, S), x = t.mul(_, v), C = t.add(C, x), x = t.mul(k, v), R = t.mul(T, R), R = t.sub(R, x), x = t.mul(T, _), L = t.mul(k, L), L = t.add(L, x), new f(R, C, L);
    }
    subtract(g) {
      return this.add(g.negate());
    }
    is0() {
      return this.equals(f.ZERO);
    }
    wNAF(g) {
      return m.wNAFCached(this, u, g, (b) => {
        const w = t.invertBatch(b.map(($) => $.pz));
        return b.map(($, B) => $.toAffine(w[B])).map(f.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(g) {
      const b = f.ZERO;
      if (g === _0n$6)
        return b;
      if (c(g), g === _1n$6)
        return this;
      const { endo: w } = e;
      if (!w)
        return m.unsafeLadder(this, g);
      let { k1neg: $, k1: B, k2neg: P, k2: U } = w.splitScalar(g), R = b, C = b, L = this;
      for (; B > _0n$6 || U > _0n$6; )
        B & _1n$6 && (R = R.add(L)), U & _1n$6 && (C = C.add(L)), L = L.double(), B >>= _1n$6, U >>= _1n$6;
      return $ && (R = R.negate()), P && (C = C.negate()), C = new f(t.mul(C.px, w.beta), C.py, C.pz), R.add(C);
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
    multiply(g) {
      c(g);
      let b = g, w, $;
      const { endo: B } = e;
      if (B) {
        const { k1neg: P, k1: U, k2neg: R, k2: C } = B.splitScalar(b);
        let { p: L, f: M } = this.wNAF(U), { p: F, f: x } = this.wNAF(C);
        L = m.constTimeNegate(P, L), F = m.constTimeNegate(R, F), F = new f(t.mul(F.px, B.beta), F.py, F.pz), w = L.add(F), $ = M.add(x);
      } else {
        const { p: P, f: U } = this.wNAF(b);
        w = P, $ = U;
      }
      return f.normalizeZ([w, $])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(g, b, w) {
      const $ = f.BASE, B = (U, R) => R === _0n$6 || R === _1n$6 || !U.equals($) ? U.multiplyUnsafe(R) : U.multiply(R), P = B(this, b).add(B(g, w));
      return P.is0() ? void 0 : P;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(g) {
      const { px: b, py: w, pz: $ } = this, B = this.is0();
      g == null && (g = B ? t.ONE : t.inv($));
      const P = t.mul(b, g), U = t.mul(w, g), R = t.mul($, g);
      if (B)
        return { x: t.ZERO, y: t.ZERO };
      if (!t.eql(R, t.ONE))
        throw new Error("invZ was invalid");
      return { x: P, y: U };
    }
    isTorsionFree() {
      const { h: g, isTorsionFree: b } = e;
      if (g === _1n$6)
        return !0;
      if (b)
        return b(f, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: g, clearCofactor: b } = e;
      return g === _1n$6 ? this : b ? b(f, this) : this.multiplyUnsafe(e.h);
    }
    toRawBytes(g = !0) {
      return this.assertValidity(), r(f, this, g);
    }
    toHex(g = !0) {
      return bytesToHex$3(this.toRawBytes(g));
    }
  }
  f.BASE = new f(e.Gx, e.Gy, t.ONE), f.ZERO = new f(t.ZERO, t.ONE, t.ZERO);
  const p = e.nBitLength, m = wNAF$1(f, e.endo ? Math.ceil(p / 2) : p);
  return {
    CURVE: e,
    ProjectivePoint: f,
    normPrivateKeyToScalar: l,
    weierstrassEquation: o,
    isWithinCurveOrder: a
  };
}
function validateOpts$1(n) {
  const e = validateBasic$1(n);
  return validateObject$1(e, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...e });
}
function weierstrass$1(n) {
  const e = validateOpts$1(n), { Fp: t, n: r } = e, s = t.BYTES + 1, o = 2 * t.BYTES + 1;
  function a(v) {
    return _0n$6 < v && v < t.ORDER;
  }
  function c(v) {
    return mod$1(v, r);
  }
  function l(v) {
    return invert$1(v, r);
  }
  const { ProjectivePoint: u, normPrivateKeyToScalar: h, weierstrassEquation: f, isWithinCurveOrder: p } = weierstrassPoints$1({
    ...e,
    toBytes(v, k, A) {
      const N = k.toAffine(), I = t.toBytes(N.x), D = concatBytes$3;
      return A ? D(Uint8Array.from([k.hasEvenY() ? 2 : 3]), I) : D(Uint8Array.from([4]), I, t.toBytes(N.y));
    },
    fromBytes(v) {
      const k = v.length, A = v[0], N = v.subarray(1);
      if (k === s && (A === 2 || A === 3)) {
        const I = bytesToNumberBE$1(N);
        if (!a(I))
          throw new Error("Point is not on curve");
        const D = f(I);
        let O = t.sqrt(D);
        const H = (O & _1n$6) === _1n$6;
        return (A & 1) === 1 !== H && (O = t.neg(O)), { x: I, y: O };
      } else if (k === o && A === 4) {
        const I = t.fromBytes(N.subarray(0, t.BYTES)), D = t.fromBytes(N.subarray(t.BYTES, 2 * t.BYTES));
        return { x: I, y: D };
      } else
        throw new Error(`Point of length ${k} was invalid. Expected ${s} compressed bytes or ${o} uncompressed bytes`);
    }
  }), m = (v) => bytesToHex$3(numberToBytesBE$1(v, e.nByteLength));
  function E(v) {
    const k = r >> _1n$6;
    return v > k;
  }
  function g(v) {
    return E(v) ? c(-v) : v;
  }
  const b = (v, k, A) => bytesToNumberBE$1(v.slice(k, A));
  class w {
    constructor(k, A, N) {
      this.r = k, this.s = A, this.recovery = N, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(k) {
      const A = e.nByteLength;
      return k = ensureBytes$1("compactSignature", k, A * 2), new w(b(k, 0, A), b(k, A, 2 * A));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(k) {
      const { r: A, s: N } = DER$1.toSig(ensureBytes$1("DER", k));
      return new w(A, N);
    }
    assertValidity() {
      if (!p(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!p(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(k) {
      return new w(this.r, this.s, k);
    }
    recoverPublicKey(k) {
      const { r: A, s: N, recovery: I } = this, D = C(ensureBytes$1("msgHash", k));
      if (I == null || ![0, 1, 2, 3].includes(I))
        throw new Error("recovery id invalid");
      const O = I === 2 || I === 3 ? A + e.n : A;
      if (O >= t.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const H = I & 1 ? "03" : "02", z = u.fromHex(H + m(O)), V = l(O), W = c(-D * V), j = c(N * V), G = u.BASE.multiplyAndAddUnsafe(z, W, j);
      if (!G)
        throw new Error("point at infinify");
      return G.assertValidity(), G;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return E(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new w(this.r, c(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return hexToBytes$3(this.toDERHex());
    }
    toDERHex() {
      return DER$1.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return hexToBytes$3(this.toCompactHex());
    }
    toCompactHex() {
      return m(this.r) + m(this.s);
    }
  }
  const $ = {
    isValidPrivateKey(v) {
      try {
        return h(v), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: h,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const v = getMinHashLength$1(e.n);
      return mapHashToField$1(e.randomBytes(v), e.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(v = 8, k = u.BASE) {
      return k._setWindowSize(v), k.multiply(BigInt(3)), k;
    }
  };
  function B(v, k = !0) {
    return u.fromPrivateKey(v).toRawBytes(k);
  }
  function P(v) {
    const k = v instanceof Uint8Array, A = typeof v == "string", N = (k || A) && v.length;
    return k ? N === s || N === o : A ? N === 2 * s || N === 2 * o : v instanceof u;
  }
  function U(v, k, A = !0) {
    if (P(v))
      throw new Error("first arg must be private key");
    if (!P(k))
      throw new Error("second arg must be public key");
    return u.fromHex(k).multiply(h(v)).toRawBytes(A);
  }
  const R = e.bits2int || function(v) {
    const k = bytesToNumberBE$1(v), A = v.length * 8 - e.nBitLength;
    return A > 0 ? k >> BigInt(A) : k;
  }, C = e.bits2int_modN || function(v) {
    return c(R(v));
  }, L = bitMask$1(e.nBitLength);
  function M(v) {
    if (typeof v != "bigint")
      throw new Error("bigint expected");
    if (!(_0n$6 <= v && v < L))
      throw new Error(`bigint expected < 2^${e.nBitLength}`);
    return numberToBytesBE$1(v, e.nByteLength);
  }
  function F(v, k, A = x) {
    if (["recovered", "canonical"].some((Y) => Y in A))
      throw new Error("sign() legacy options not supported");
    const { hash: N, randomBytes: I } = e;
    let { lowS: D, prehash: O, extraEntropy: H } = A;
    D == null && (D = !0), v = ensureBytes$1("msgHash", v), O && (v = ensureBytes$1("prehashed msgHash", N(v)));
    const z = C(v), V = h(k), W = [M(V), M(z)];
    if (H != null) {
      const Y = H === !0 ? I(t.BYTES) : H;
      W.push(ensureBytes$1("extraEntropy", Y));
    }
    const j = concatBytes$3(...W), G = z;
    function Z(Y) {
      const K = R(Y);
      if (!p(K))
        return;
      const re = l(K), J = u.BASE.multiply(K).toAffine(), q = c(J.x);
      if (q === _0n$6)
        return;
      const X = c(re * c(G + q * V));
      if (X === _0n$6)
        return;
      let te = (J.x === q ? 0 : 2) | Number(J.y & _1n$6), _e = X;
      return D && E(X) && (_e = g(X), te ^= 1), new w(q, _e, te);
    }
    return { seed: j, k2sig: Z };
  }
  const x = { lowS: e.lowS, prehash: !1 }, _ = { lowS: e.lowS, prehash: !1 };
  function S(v, k, A = x) {
    const { seed: N, k2sig: I } = F(v, k, A), D = e;
    return createHmacDrbg$1(D.hash.outputLen, D.nByteLength, D.hmac)(N, I);
  }
  u.BASE._setWindowSize(8);
  function T(v, k, A, N = _) {
    var J;
    const I = v;
    if (k = ensureBytes$1("msgHash", k), A = ensureBytes$1("publicKey", A), "strict" in N)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: D, prehash: O } = N;
    let H, z;
    try {
      if (typeof I == "string" || I instanceof Uint8Array)
        try {
          H = w.fromDER(I);
        } catch (q) {
          if (!(q instanceof DER$1.Err))
            throw q;
          H = w.fromCompact(I);
        }
      else if (typeof I == "object" && typeof I.r == "bigint" && typeof I.s == "bigint") {
        const { r: q, s: X } = I;
        H = new w(q, X);
      } else
        throw new Error("PARSE");
      z = u.fromHex(A);
    } catch (q) {
      if (q.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (D && H.hasHighS())
      return !1;
    O && (k = e.hash(k));
    const { r: V, s: W } = H, j = C(k), G = l(W), Z = c(j * G), Y = c(V * G), K = (J = u.BASE.multiplyAndAddUnsafe(z, Z, Y)) == null ? void 0 : J.toAffine();
    return K ? c(K.x) === V : !1;
  }
  return {
    CURVE: e,
    getPublicKey: B,
    getSharedSecret: U,
    sign: S,
    verify: T,
    ProjectivePoint: u,
    Signature: w,
    utils: $
  };
}
let HMAC$2 = class extends Hash$2 {
  constructor(e, t) {
    super(), this.finished = !1, this.destroyed = !1, hash$1(e);
    const r = toBytes$2(t);
    if (this.iHash = e.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const s = this.blockLen, o = new Uint8Array(s);
    o.set(r.length > s ? e.create().update(r).digest() : r);
    for (let a = 0; a < o.length; a++)
      o[a] ^= 54;
    this.iHash.update(o), this.oHash = e.create();
    for (let a = 0; a < o.length; a++)
      o[a] ^= 106;
    this.oHash.update(o), o.fill(0);
  }
  update(e) {
    return exists$1(this), this.iHash.update(e), this;
  }
  digestInto(e) {
    exists$1(this), bytes$2(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy();
  }
  digest() {
    const e = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e), e;
  }
  _cloneInto(e) {
    e || (e = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: t, iHash: r, finished: s, destroyed: o, blockLen: a, outputLen: c } = this;
    return e = e, e.finished = s, e.destroyed = o, e.blockLen = a, e.outputLen = c, e.oHash = t._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
};
const hmac$2 = (n, e, t) => new HMAC$2(n, e).update(t).digest();
hmac$2.create = (n, e) => new HMAC$2(n, e);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function getHash$1(n) {
  return {
    hash: n,
    hmac: (e, ...t) => hmac$2(n, e, concatBytes$4(...t)),
    randomBytes: randomBytes$2
  };
}
function createCurve$1(n, e) {
  const t = (r) => weierstrass$1({ ...n, ...getHash$1(r) });
  return Object.freeze({ ...t(e), create: t });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const secp256k1P$1 = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), secp256k1N$1 = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), _1n$5 = BigInt(1), _2n$3 = BigInt(2), divNearest$1 = (n, e) => (n + e / _2n$3) / e;
function sqrtMod$1(n) {
  const e = secp256k1P$1, t = BigInt(3), r = BigInt(6), s = BigInt(11), o = BigInt(22), a = BigInt(23), c = BigInt(44), l = BigInt(88), u = n * n * n % e, h = u * u * n % e, f = pow2$1(h, t, e) * h % e, p = pow2$1(f, t, e) * h % e, m = pow2$1(p, _2n$3, e) * u % e, E = pow2$1(m, s, e) * m % e, g = pow2$1(E, o, e) * E % e, b = pow2$1(g, c, e) * g % e, w = pow2$1(b, l, e) * b % e, $ = pow2$1(w, c, e) * g % e, B = pow2$1($, t, e) * h % e, P = pow2$1(B, a, e) * E % e, U = pow2$1(P, r, e) * u % e, R = pow2$1(U, _2n$3, e);
  if (!Fp.eql(Fp.sqr(R), n))
    throw new Error("Cannot find square root");
  return R;
}
const Fp = Field$1(secp256k1P$1, void 0, void 0, { sqrt: sqrtMod$1 }), secp256k1$1 = createCurve$1({
  a: BigInt(0),
  b: BigInt(7),
  Fp,
  n: secp256k1N$1,
  // Base point (x, y) aka generator point
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  lowS: !0,
  /**
   * secp256k1 belongs to Koblitz curves: it has efficiently computable endomorphism.
   * Endomorphism uses 2x less RAM, speeds up precomputation by 2x and ECDH / key recovery by 20%.
   * For precomputed wNAF it trades off 1/2 init time & 1/3 ram for 20% perf hit.
   * Explanation: https://gist.github.com/paulmillr/eb670806793e84df628a7c434a873066
   */
  endo: {
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (n) => {
      const e = secp256k1N$1, t = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -_1n$5 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), o = t, a = BigInt("0x100000000000000000000000000000000"), c = divNearest$1(o * n, e), l = divNearest$1(-r * n, e);
      let u = mod$1(n - c * t - l * s, e), h = mod$1(-c * r - l * o, e);
      const f = u > a, p = h > a;
      if (f && (u = e - u), p && (h = e - h), u > a || h > a)
        throw new Error("splitScalar: Endomorphism failed, k=" + n);
      return { k1neg: f, k1: u, k2neg: p, k2: h };
    }
  }
}, sha256$2), _0n$5 = BigInt(0), fe = (n) => typeof n == "bigint" && _0n$5 < n && n < secp256k1P$1, ge = (n) => typeof n == "bigint" && _0n$5 < n && n < secp256k1N$1, TAGGED_HASH_PREFIXES$1 = {};
function taggedHash$1(n, ...e) {
  let t = TAGGED_HASH_PREFIXES$1[n];
  if (t === void 0) {
    const r = sha256$2(Uint8Array.from(n, (s) => s.charCodeAt(0)));
    t = concatBytes$3(r, r), TAGGED_HASH_PREFIXES$1[n] = t;
  }
  return sha256$2(concatBytes$3(t, ...e));
}
const pointToBytes$1 = (n) => n.toRawBytes(!0).slice(1), numTo32b$1 = (n) => numberToBytesBE$1(n, 32), modP$1 = (n) => mod$1(n, secp256k1P$1), modN$1 = (n) => mod$1(n, secp256k1N$1), Point$1 = secp256k1$1.ProjectivePoint, GmulAdd$1 = (n, e, t) => Point$1.BASE.multiplyAndAddUnsafe(n, e, t);
function schnorrGetExtPubKey$1(n) {
  let e = secp256k1$1.utils.normPrivateKeyToScalar(n), t = Point$1.fromPrivateKey(e);
  return { scalar: t.hasEvenY() ? e : modN$1(-e), bytes: pointToBytes$1(t) };
}
function lift_x$1(n) {
  if (!fe(n))
    throw new Error("bad x: need 0 < x < p");
  const e = modP$1(n * n), t = modP$1(e * n + BigInt(7));
  let r = sqrtMod$1(t);
  r % _2n$3 !== _0n$5 && (r = modP$1(-r));
  const s = new Point$1(n, r, _1n$5);
  return s.assertValidity(), s;
}
function challenge$1(...n) {
  return modN$1(bytesToNumberBE$1(taggedHash$1("BIP0340/challenge", ...n)));
}
function schnorrGetPublicKey$1(n) {
  return schnorrGetExtPubKey$1(n).bytes;
}
function schnorrSign$1(n, e, t = randomBytes$2(32)) {
  const r = ensureBytes$1("message", n), { bytes: s, scalar: o } = schnorrGetExtPubKey$1(e), a = ensureBytes$1("auxRand", t, 32), c = numTo32b$1(o ^ bytesToNumberBE$1(taggedHash$1("BIP0340/aux", a))), l = taggedHash$1("BIP0340/nonce", c, s, r), u = modN$1(bytesToNumberBE$1(l));
  if (u === _0n$5)
    throw new Error("sign failed: k is zero");
  const { bytes: h, scalar: f } = schnorrGetExtPubKey$1(u), p = challenge$1(h, s, r), m = new Uint8Array(64);
  if (m.set(h, 0), m.set(numTo32b$1(modN$1(f + p * o)), 32), !schnorrVerify$1(m, r, s))
    throw new Error("sign: Invalid signature produced");
  return m;
}
function schnorrVerify$1(n, e, t) {
  const r = ensureBytes$1("signature", n, 64), s = ensureBytes$1("message", e), o = ensureBytes$1("publicKey", t, 32);
  try {
    const a = lift_x$1(bytesToNumberBE$1(o)), c = bytesToNumberBE$1(r.subarray(0, 32));
    if (!fe(c))
      return !1;
    const l = bytesToNumberBE$1(r.subarray(32, 64));
    if (!ge(l))
      return !1;
    const u = challenge$1(numTo32b$1(c), pointToBytes$1(a), s), h = GmulAdd$1(a, l, modN$1(-u));
    return !(!h || !h.hasEvenY() || h.toAffine().x !== c);
  } catch {
    return !1;
  }
}
const schnorr$1 = {
  getPublicKey: schnorrGetPublicKey$1,
  sign: schnorrSign$1,
  verify: schnorrVerify$1,
  utils: {
    randomPrivateKey: secp256k1$1.utils.randomPrivateKey,
    lift_x: lift_x$1,
    pointToBytes: pointToBytes$1,
    numberToBytesBE: numberToBytesBE$1,
    bytesToNumberBE: bytesToNumberBE$1,
    taggedHash: taggedHash$1,
    mod: mod$1
  }
}, crypto$1 = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const u8a = (n) => n instanceof Uint8Array, createView$1 = (n) => new DataView(n.buffer, n.byteOffset, n.byteLength), rotr$1 = (n, e) => n << 32 - e | n >>> e, isLE$1 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!isLE$1)
  throw new Error("Non little-endian hardware is not supported");
const hexes$2 = Array.from({ length: 256 }, (n, e) => e.toString(16).padStart(2, "0"));
function bytesToHex$2(n) {
  if (!u8a(n))
    throw new Error("Uint8Array expected");
  let e = "";
  for (let t = 0; t < n.length; t++)
    e += hexes$2[n[t]];
  return e;
}
function hexToBytes$2(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  const e = n.length;
  if (e % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + e);
  const t = new Uint8Array(e / 2);
  for (let r = 0; r < t.length; r++) {
    const s = r * 2, o = n.slice(s, s + 2), a = Number.parseInt(o, 16);
    if (Number.isNaN(a) || a < 0)
      throw new Error("Invalid byte sequence");
    t[r] = a;
  }
  return t;
}
function utf8ToBytes$2(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function toBytes$1(n) {
  if (typeof n == "string" && (n = utf8ToBytes$2(n)), !u8a(n))
    throw new Error(`expected Uint8Array, got ${typeof n}`);
  return n;
}
function concatBytes$2(...n) {
  const e = new Uint8Array(n.reduce((r, s) => r + s.length, 0));
  let t = 0;
  return n.forEach((r) => {
    if (!u8a(r))
      throw new Error("Uint8Array expected");
    e.set(r, t), t += r.length;
  }), e;
}
let Hash$1 = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
function wrapConstructor$1(n) {
  const e = (r) => n().update(toBytes$1(r)).digest(), t = n();
  return e.outputLen = t.outputLen, e.blockLen = t.blockLen, e.create = () => n(), e;
}
function randomBytes$1(n = 32) {
  if (crypto$1 && typeof crypto$1.getRandomValues == "function")
    return crypto$1.getRandomValues(new Uint8Array(n));
  throw new Error("crypto.getRandomValues must be defined");
}
function number$1(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`Wrong positive integer: ${n}`);
}
function bool$1(n) {
  if (typeof n != "boolean")
    throw new Error(`Expected boolean, not ${n}`);
}
function bytes$1(n, ...e) {
  if (!(n instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (e.length > 0 && !e.includes(n.length))
    throw new Error(`Expected Uint8Array of length ${e}, not of length=${n.length}`);
}
function hash(n) {
  if (typeof n != "function" || typeof n.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  number$1(n.outputLen), number$1(n.blockLen);
}
function exists(n, e = !0) {
  if (n.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (e && n.finished)
    throw new Error("Hash#digest() has already been called");
}
function output(n, e) {
  bytes$1(n);
  const t = e.outputLen;
  if (n.length < t)
    throw new Error(`digestInto() expects output buffer of length at least ${t}`);
}
const assert = {
  number: number$1,
  bool: bool$1,
  bytes: bytes$1,
  hash,
  exists,
  output
};
function setBigUint64$1(n, e, t, r) {
  if (typeof n.setBigUint64 == "function")
    return n.setBigUint64(e, t, r);
  const s = BigInt(32), o = BigInt(4294967295), a = Number(t >> s & o), c = Number(t & o), l = r ? 4 : 0, u = r ? 0 : 4;
  n.setUint32(e + l, a, r), n.setUint32(e + u, c, r);
}
class SHA2 extends Hash$1 {
  constructor(e, t, r, s) {
    super(), this.blockLen = e, this.outputLen = t, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = createView$1(this.buffer);
  }
  update(e) {
    assert.exists(this);
    const { view: t, buffer: r, blockLen: s } = this;
    e = toBytes$1(e);
    const o = e.length;
    for (let a = 0; a < o; ) {
      const c = Math.min(s - this.pos, o - a);
      if (c === s) {
        const l = createView$1(e);
        for (; s <= o - a; a += s)
          this.process(l, a);
        continue;
      }
      r.set(e.subarray(a, a + c), this.pos), this.pos += c, a += c, this.pos === s && (this.process(t, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    assert.exists(this), assert.output(e, this), this.finished = !0;
    const { buffer: t, view: r, blockLen: s, isLE: o } = this;
    let { pos: a } = this;
    t[a++] = 128, this.buffer.subarray(a).fill(0), this.padOffset > s - a && (this.process(r, 0), a = 0);
    for (let f = a; f < s; f++)
      t[f] = 0;
    setBigUint64$1(r, s - 8, BigInt(this.length * 8), o), this.process(r, 0);
    const c = createView$1(e), l = this.outputLen;
    if (l % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const u = l / 4, h = this.get();
    if (u > h.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let f = 0; f < u; f++)
      c.setUint32(4 * f, h[f], o);
  }
  digest() {
    const { buffer: e, outputLen: t } = this;
    this.digestInto(e);
    const r = e.slice(0, t);
    return this.destroy(), r;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    const { blockLen: t, buffer: r, length: s, finished: o, destroyed: a, pos: c } = this;
    return e.length = s, e.pos = c, e.finished = o, e.destroyed = a, s % t && e.buffer.set(r), e;
  }
}
const Chi$1 = (n, e, t) => n & e ^ ~n & t, Maj$1 = (n, e, t) => n & e ^ n & t ^ e & t, SHA256_K$1 = new Uint32Array([
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
]), IV = new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), SHA256_W$1 = new Uint32Array(64);
let SHA256$1 = class extends SHA2 {
  constructor() {
    super(64, 32, 8, !1), this.A = IV[0] | 0, this.B = IV[1] | 0, this.C = IV[2] | 0, this.D = IV[3] | 0, this.E = IV[4] | 0, this.F = IV[5] | 0, this.G = IV[6] | 0, this.H = IV[7] | 0;
  }
  get() {
    const { A: e, B: t, C: r, D: s, E: o, F: a, G: c, H: l } = this;
    return [e, t, r, s, o, a, c, l];
  }
  // prettier-ignore
  set(e, t, r, s, o, a, c, l) {
    this.A = e | 0, this.B = t | 0, this.C = r | 0, this.D = s | 0, this.E = o | 0, this.F = a | 0, this.G = c | 0, this.H = l | 0;
  }
  process(e, t) {
    for (let f = 0; f < 16; f++, t += 4)
      SHA256_W$1[f] = e.getUint32(t, !1);
    for (let f = 16; f < 64; f++) {
      const p = SHA256_W$1[f - 15], m = SHA256_W$1[f - 2], E = rotr$1(p, 7) ^ rotr$1(p, 18) ^ p >>> 3, g = rotr$1(m, 17) ^ rotr$1(m, 19) ^ m >>> 10;
      SHA256_W$1[f] = g + SHA256_W$1[f - 7] + E + SHA256_W$1[f - 16] | 0;
    }
    let { A: r, B: s, C: o, D: a, E: c, F: l, G: u, H: h } = this;
    for (let f = 0; f < 64; f++) {
      const p = rotr$1(c, 6) ^ rotr$1(c, 11) ^ rotr$1(c, 25), m = h + p + Chi$1(c, l, u) + SHA256_K$1[f] + SHA256_W$1[f] | 0, g = (rotr$1(r, 2) ^ rotr$1(r, 13) ^ rotr$1(r, 22)) + Maj$1(r, s, o) | 0;
      h = u, u = l, l = c, c = a + m | 0, a = o, o = s, s = r, r = m + g | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, o = o + this.C | 0, a = a + this.D | 0, c = c + this.E | 0, l = l + this.F | 0, u = u + this.G | 0, h = h + this.H | 0, this.set(r, s, o, a, c, l, u, h);
  }
  roundClean() {
    SHA256_W$1.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
class SHA224 extends SHA256$1 {
  constructor() {
    super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28;
  }
}
const sha256$1 = wrapConstructor$1(() => new SHA256$1());
wrapConstructor$1(() => new SHA224());
/*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function assertNumber(n) {
  if (!Number.isSafeInteger(n))
    throw new Error(`Wrong integer: ${n}`);
}
function chain(...n) {
  const e = (s, o) => (a) => s(o(a)), t = Array.from(n).reverse().reduce((s, o) => s ? e(s, o.encode) : o.encode, void 0), r = n.reduce((s, o) => s ? e(s, o.decode) : o.decode, void 0);
  return { encode: t, decode: r };
}
function alphabet(n) {
  return {
    encode: (e) => {
      if (!Array.isArray(e) || e.length && typeof e[0] != "number")
        throw new Error("alphabet.encode input should be an array of numbers");
      return e.map((t) => {
        if (assertNumber(t), t < 0 || t >= n.length)
          throw new Error(`Digit index outside alphabet: ${t} (alphabet: ${n.length})`);
        return n[t];
      });
    },
    decode: (e) => {
      if (!Array.isArray(e) || e.length && typeof e[0] != "string")
        throw new Error("alphabet.decode input should be array of strings");
      return e.map((t) => {
        if (typeof t != "string")
          throw new Error(`alphabet.decode: not string element=${t}`);
        const r = n.indexOf(t);
        if (r === -1)
          throw new Error(`Unknown letter: "${t}". Allowed: ${n}`);
        return r;
      });
    }
  };
}
function join(n = "") {
  if (typeof n != "string")
    throw new Error("join separator should be string");
  return {
    encode: (e) => {
      if (!Array.isArray(e) || e.length && typeof e[0] != "string")
        throw new Error("join.encode input should be array of strings");
      for (let t of e)
        if (typeof t != "string")
          throw new Error(`join.encode: non-string input=${t}`);
      return e.join(n);
    },
    decode: (e) => {
      if (typeof e != "string")
        throw new Error("join.decode input should be string");
      return e.split(n);
    }
  };
}
function padding(n, e = "=") {
  if (assertNumber(n), typeof e != "string")
    throw new Error("padding chr should be string");
  return {
    encode(t) {
      if (!Array.isArray(t) || t.length && typeof t[0] != "string")
        throw new Error("padding.encode input should be array of strings");
      for (let r of t)
        if (typeof r != "string")
          throw new Error(`padding.encode: non-string input=${r}`);
      for (; t.length * n % 8; )
        t.push(e);
      return t;
    },
    decode(t) {
      if (!Array.isArray(t) || t.length && typeof t[0] != "string")
        throw new Error("padding.encode input should be array of strings");
      for (let s of t)
        if (typeof s != "string")
          throw new Error(`padding.decode: non-string input=${s}`);
      let r = t.length;
      if (r * n % 8)
        throw new Error("Invalid padding: string should have whole number of bytes");
      for (; r > 0 && t[r - 1] === e; r--)
        if (!((r - 1) * n % 8))
          throw new Error("Invalid padding: string has too much padding");
      return t.slice(0, r);
    }
  };
}
function normalize$1(n) {
  if (typeof n != "function")
    throw new Error("normalize fn should be function");
  return { encode: (e) => e, decode: (e) => n(e) };
}
function convertRadix(n, e, t) {
  if (e < 2)
    throw new Error(`convertRadix: wrong from=${e}, base cannot be less than 2`);
  if (t < 2)
    throw new Error(`convertRadix: wrong to=${t}, base cannot be less than 2`);
  if (!Array.isArray(n))
    throw new Error("convertRadix: data should be array");
  if (!n.length)
    return [];
  let r = 0;
  const s = [], o = Array.from(n);
  for (o.forEach((a) => {
    if (assertNumber(a), a < 0 || a >= e)
      throw new Error(`Wrong integer: ${a}`);
  }); ; ) {
    let a = 0, c = !0;
    for (let l = r; l < o.length; l++) {
      const u = o[l], h = e * a + u;
      if (!Number.isSafeInteger(h) || e * a / e !== a || h - u !== e * a)
        throw new Error("convertRadix: carry overflow");
      if (a = h % t, o[l] = Math.floor(h / t), !Number.isSafeInteger(o[l]) || o[l] * t + a !== h)
        throw new Error("convertRadix: carry overflow");
      if (c)
        o[l] ? c = !1 : r = l;
      else continue;
    }
    if (s.push(a), c)
      break;
  }
  for (let a = 0; a < n.length - 1 && n[a] === 0; a++)
    s.push(0);
  return s.reverse();
}
const gcd = (n, e) => e ? gcd(e, n % e) : n, radix2carry = (n, e) => n + (e - gcd(n, e));
function convertRadix2(n, e, t, r) {
  if (!Array.isArray(n))
    throw new Error("convertRadix2: data should be array");
  if (e <= 0 || e > 32)
    throw new Error(`convertRadix2: wrong from=${e}`);
  if (t <= 0 || t > 32)
    throw new Error(`convertRadix2: wrong to=${t}`);
  if (radix2carry(e, t) > 32)
    throw new Error(`convertRadix2: carry overflow from=${e} to=${t} carryBits=${radix2carry(e, t)}`);
  let s = 0, o = 0;
  const a = 2 ** t - 1, c = [];
  for (const l of n) {
    if (assertNumber(l), l >= 2 ** e)
      throw new Error(`convertRadix2: invalid data word=${l} from=${e}`);
    if (s = s << e | l, o + e > 32)
      throw new Error(`convertRadix2: carry overflow pos=${o} from=${e}`);
    for (o += e; o >= t; o -= t)
      c.push((s >> o - t & a) >>> 0);
    s &= 2 ** o - 1;
  }
  if (s = s << t - o & a, !r && o >= e)
    throw new Error("Excess padding");
  if (!r && s)
    throw new Error(`Non-zero padding: ${s}`);
  return r && o > 0 && c.push(s >>> 0), c;
}
function radix(n) {
  return assertNumber(n), {
    encode: (e) => {
      if (!(e instanceof Uint8Array))
        throw new Error("radix.encode input should be Uint8Array");
      return convertRadix(Array.from(e), 2 ** 8, n);
    },
    decode: (e) => {
      if (!Array.isArray(e) || e.length && typeof e[0] != "number")
        throw new Error("radix.decode input should be array of strings");
      return Uint8Array.from(convertRadix(e, n, 2 ** 8));
    }
  };
}
function radix2(n, e = !1) {
  if (assertNumber(n), n <= 0 || n > 32)
    throw new Error("radix2: bits should be in (0..32]");
  if (radix2carry(8, n) > 32 || radix2carry(n, 8) > 32)
    throw new Error("radix2: carry overflow");
  return {
    encode: (t) => {
      if (!(t instanceof Uint8Array))
        throw new Error("radix2.encode input should be Uint8Array");
      return convertRadix2(Array.from(t), 8, n, !e);
    },
    decode: (t) => {
      if (!Array.isArray(t) || t.length && typeof t[0] != "number")
        throw new Error("radix2.decode input should be array of strings");
      return Uint8Array.from(convertRadix2(t, n, 8, e));
    }
  };
}
function unsafeWrapper(n) {
  if (typeof n != "function")
    throw new Error("unsafeWrapper fn should be function");
  return function(...e) {
    try {
      return n.apply(null, e);
    } catch {
    }
  };
}
const base16 = chain(radix2(4), alphabet("0123456789ABCDEF"), join("")), base32 = chain(radix2(5), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), padding(5), join(""));
chain(radix2(5), alphabet("0123456789ABCDEFGHIJKLMNOPQRSTUV"), padding(5), join(""));
chain(radix2(5), alphabet("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), join(""), normalize$1((n) => n.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")));
const base64 = chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), padding(6), join("")), base64url = chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), padding(6), join("")), genBase58 = (n) => chain(radix(58), alphabet(n), join("")), base58 = genBase58("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
genBase58("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ");
genBase58("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
const XMR_BLOCK_LEN = [0, 2, 3, 5, 6, 7, 9, 10, 11], base58xmr = {
  encode(n) {
    let e = "";
    for (let t = 0; t < n.length; t += 8) {
      const r = n.subarray(t, t + 8);
      e += base58.encode(r).padStart(XMR_BLOCK_LEN[r.length], "1");
    }
    return e;
  },
  decode(n) {
    let e = [];
    for (let t = 0; t < n.length; t += 11) {
      const r = n.slice(t, t + 11), s = XMR_BLOCK_LEN.indexOf(r.length), o = base58.decode(r);
      for (let a = 0; a < o.length - s; a++)
        if (o[a] !== 0)
          throw new Error("base58xmr: wrong padding");
      e = e.concat(Array.from(o.slice(o.length - s)));
    }
    return Uint8Array.from(e);
  }
}, BECH_ALPHABET = chain(alphabet("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), join("")), POLYMOD_GENERATORS = [996825010, 642813549, 513874426, 1027748829, 705979059];
function bech32Polymod(n) {
  const e = n >> 25;
  let t = (n & 33554431) << 5;
  for (let r = 0; r < POLYMOD_GENERATORS.length; r++)
    (e >> r & 1) === 1 && (t ^= POLYMOD_GENERATORS[r]);
  return t;
}
function bechChecksum(n, e, t = 1) {
  const r = n.length;
  let s = 1;
  for (let o = 0; o < r; o++) {
    const a = n.charCodeAt(o);
    if (a < 33 || a > 126)
      throw new Error(`Invalid prefix (${n})`);
    s = bech32Polymod(s) ^ a >> 5;
  }
  s = bech32Polymod(s);
  for (let o = 0; o < r; o++)
    s = bech32Polymod(s) ^ n.charCodeAt(o) & 31;
  for (let o of e)
    s = bech32Polymod(s) ^ o;
  for (let o = 0; o < 6; o++)
    s = bech32Polymod(s);
  return s ^= t, BECH_ALPHABET.encode(convertRadix2([s % 2 ** 30], 30, 5, !1));
}
function genBech32(n) {
  const e = n === "bech32" ? 1 : 734539939, t = radix2(5), r = t.decode, s = t.encode, o = unsafeWrapper(r);
  function a(h, f, p = 90) {
    if (typeof h != "string")
      throw new Error(`bech32.encode prefix should be string, not ${typeof h}`);
    if (!Array.isArray(f) || f.length && typeof f[0] != "number")
      throw new Error(`bech32.encode words should be array of numbers, not ${typeof f}`);
    const m = h.length + 7 + f.length;
    if (p !== !1 && m > p)
      throw new TypeError(`Length ${m} exceeds limit ${p}`);
    return h = h.toLowerCase(), `${h}1${BECH_ALPHABET.encode(f)}${bechChecksum(h, f, e)}`;
  }
  function c(h, f = 90) {
    if (typeof h != "string")
      throw new Error(`bech32.decode input should be string, not ${typeof h}`);
    if (h.length < 8 || f !== !1 && h.length > f)
      throw new TypeError(`Wrong string length: ${h.length} (${h}). Expected (8..${f})`);
    const p = h.toLowerCase();
    if (h !== p && h !== h.toUpperCase())
      throw new Error("String must be lowercase or uppercase");
    h = p;
    const m = h.lastIndexOf("1");
    if (m === 0 || m === -1)
      throw new Error('Letter "1" must be present between prefix and data only');
    const E = h.slice(0, m), g = h.slice(m + 1);
    if (g.length < 6)
      throw new Error("Data must be at least 6 characters long");
    const b = BECH_ALPHABET.decode(g).slice(0, -6), w = bechChecksum(E, b, e);
    if (!g.endsWith(w))
      throw new Error(`Invalid checksum in ${h}: expected "${w}"`);
    return { prefix: E, words: b };
  }
  const l = unsafeWrapper(c);
  function u(h) {
    const { prefix: f, words: p } = c(h, !1);
    return { prefix: f, words: p, bytes: r(p) };
  }
  return { encode: a, decode: c, decodeToBytes: u, decodeUnsafe: l, fromWords: r, fromWordsUnsafe: o, toWords: s };
}
const bech32$1 = genBech32("bech32");
genBech32("bech32m");
const utf8$1 = {
  encode: (n) => new TextDecoder().decode(n),
  decode: (n) => new TextEncoder().encode(n)
}, hex$1 = chain(radix2(4), alphabet("0123456789abcdef"), join(""), normalize$1((n) => {
  if (typeof n != "string" || n.length % 2)
    throw new TypeError(`hex.decode: expected string, got ${typeof n} with length ${n.length}`);
  return n.toLowerCase();
})), CODERS = {
  utf8: utf8$1,
  hex: hex$1,
  base16,
  base32,
  base64,
  base64url,
  base58,
  base58xmr
};
`${Object.keys(CODERS).join(", ")}`;
function number(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`positive integer expected, not ${n}`);
}
function bool(n) {
  if (typeof n != "boolean")
    throw new Error(`boolean expected, not ${n}`);
}
function isBytes$2(n) {
  return n instanceof Uint8Array || n != null && typeof n == "object" && n.constructor.name === "Uint8Array";
}
function bytes(n, ...e) {
  if (!isBytes$2(n))
    throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(n.length))
    throw new Error(`Uint8Array expected of length ${e}, not of length=${n.length}`);
}
/*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) */
const u32 = (n) => new Uint32Array(n.buffer, n.byteOffset, Math.floor(n.byteLength / 4)), isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!isLE)
  throw new Error("Non little-endian hardware is not supported");
function checkOpts(n, e) {
  if (e == null || typeof e != "object")
    throw new Error("options must be defined");
  return Object.assign(n, e);
}
function equalBytes$1(n, e) {
  if (n.length !== e.length)
    return !1;
  let t = 0;
  for (let r = 0; r < n.length; r++)
    t |= n[r] ^ e[r];
  return t === 0;
}
const wrapCipher = /* @__NO_SIDE_EFFECTS__ */ (n, e) => (Object.assign(e, n), e), BLOCK_SIZE = 16, POLY = 283;
function mul2(n) {
  return n << 1 ^ POLY & -(n >> 7);
}
function mul(n, e) {
  let t = 0;
  for (; e > 0; e >>= 1)
    t ^= n & -(e & 1), n = mul2(n);
  return t;
}
const sbox = /* @__PURE__ */ (() => {
  let n = new Uint8Array(256);
  for (let t = 0, r = 1; t < 256; t++, r ^= mul2(r))
    n[t] = r;
  const e = new Uint8Array(256);
  e[0] = 99;
  for (let t = 0; t < 255; t++) {
    let r = n[255 - t];
    r |= r << 8, e[n[t]] = (r ^ r >> 4 ^ r >> 5 ^ r >> 6 ^ r >> 7 ^ 99) & 255;
  }
  return e;
})(), invSbox = /* @__PURE__ */ sbox.map((n, e) => sbox.indexOf(e)), rotr32_8 = (n) => n << 24 | n >>> 8, rotl32_8 = (n) => n << 8 | n >>> 24;
function genTtable(n, e) {
  if (n.length !== 256)
    throw new Error("Wrong sbox length");
  const t = new Uint32Array(256).map((u, h) => e(n[h])), r = t.map(rotl32_8), s = r.map(rotl32_8), o = s.map(rotl32_8), a = new Uint32Array(256 * 256), c = new Uint32Array(256 * 256), l = new Uint16Array(256 * 256);
  for (let u = 0; u < 256; u++)
    for (let h = 0; h < 256; h++) {
      const f = u * 256 + h;
      a[f] = t[u] ^ r[h], c[f] = s[u] ^ o[h], l[f] = n[u] << 8 | n[h];
    }
  return { sbox: n, sbox2: l, T0: t, T1: r, T2: s, T3: o, T01: a, T23: c };
}
const tableEncoding = /* @__PURE__ */ genTtable(sbox, (n) => mul(n, 3) << 24 | n << 16 | n << 8 | mul(n, 2)), tableDecoding = /* @__PURE__ */ genTtable(invSbox, (n) => mul(n, 11) << 24 | mul(n, 13) << 16 | mul(n, 9) << 8 | mul(n, 14)), xPowers = /* @__PURE__ */ (() => {
  const n = new Uint8Array(16);
  for (let e = 0, t = 1; e < 16; e++, t = mul2(t))
    n[e] = t;
  return n;
})();
function expandKeyLE(n) {
  bytes(n);
  const e = n.length;
  if (![16, 24, 32].includes(e))
    throw new Error(`aes: wrong key size: should be 16, 24 or 32, got: ${e}`);
  const { sbox2: t } = tableEncoding, r = u32(n), s = r.length, o = (c) => applySbox(t, c, c, c, c), a = new Uint32Array(e + 28);
  a.set(r);
  for (let c = s; c < a.length; c++) {
    let l = a[c - 1];
    c % s === 0 ? l = o(rotr32_8(l)) ^ xPowers[c / s - 1] : s > 6 && c % s === 4 && (l = o(l)), a[c] = a[c - s] ^ l;
  }
  return a;
}
function expandKeyDecLE(n) {
  const e = expandKeyLE(n), t = e.slice(), r = e.length, { sbox2: s } = tableEncoding, { T0: o, T1: a, T2: c, T3: l } = tableDecoding;
  for (let u = 0; u < r; u += 4)
    for (let h = 0; h < 4; h++)
      t[u + h] = e[r - u - 4 + h];
  e.fill(0);
  for (let u = 4; u < r - 4; u++) {
    const h = t[u], f = applySbox(s, h, h, h, h);
    t[u] = o[f & 255] ^ a[f >>> 8 & 255] ^ c[f >>> 16 & 255] ^ l[f >>> 24];
  }
  return t;
}
function apply0123(n, e, t, r, s, o) {
  return n[t << 8 & 65280 | r >>> 8 & 255] ^ e[s >>> 8 & 65280 | o >>> 24 & 255];
}
function applySbox(n, e, t, r, s) {
  return n[e & 255 | t & 65280] | n[r >>> 16 & 255 | s >>> 16 & 65280] << 16;
}
function encrypt$2(n, e, t, r, s) {
  const { sbox2: o, T01: a, T23: c } = tableEncoding;
  let l = 0;
  e ^= n[l++], t ^= n[l++], r ^= n[l++], s ^= n[l++];
  const u = n.length / 4 - 2;
  for (let E = 0; E < u; E++) {
    const g = n[l++] ^ apply0123(a, c, e, t, r, s), b = n[l++] ^ apply0123(a, c, t, r, s, e), w = n[l++] ^ apply0123(a, c, r, s, e, t), $ = n[l++] ^ apply0123(a, c, s, e, t, r);
    e = g, t = b, r = w, s = $;
  }
  const h = n[l++] ^ applySbox(o, e, t, r, s), f = n[l++] ^ applySbox(o, t, r, s, e), p = n[l++] ^ applySbox(o, r, s, e, t), m = n[l++] ^ applySbox(o, s, e, t, r);
  return { s0: h, s1: f, s2: p, s3: m };
}
function decrypt$2(n, e, t, r, s) {
  const { sbox2: o, T01: a, T23: c } = tableDecoding;
  let l = 0;
  e ^= n[l++], t ^= n[l++], r ^= n[l++], s ^= n[l++];
  const u = n.length / 4 - 2;
  for (let E = 0; E < u; E++) {
    const g = n[l++] ^ apply0123(a, c, e, s, r, t), b = n[l++] ^ apply0123(a, c, t, e, s, r), w = n[l++] ^ apply0123(a, c, r, t, e, s), $ = n[l++] ^ apply0123(a, c, s, r, t, e);
    e = g, t = b, r = w, s = $;
  }
  const h = n[l++] ^ applySbox(o, e, s, r, t), f = n[l++] ^ applySbox(o, t, e, s, r), p = n[l++] ^ applySbox(o, r, t, e, s), m = n[l++] ^ applySbox(o, s, r, t, e);
  return { s0: h, s1: f, s2: p, s3: m };
}
function getDst(n, e) {
  if (!e)
    return new Uint8Array(n);
  if (bytes(e), e.length < n)
    throw new Error(`aes: wrong destination length, expected at least ${n}, got: ${e.length}`);
  return e;
}
function validateBlockDecrypt(n) {
  if (bytes(n), n.length % BLOCK_SIZE !== 0)
    throw new Error(`aes/(cbc-ecb).decrypt ciphertext should consist of blocks with size ${BLOCK_SIZE}`);
}
function validateBlockEncrypt(n, e, t) {
  let r = n.length;
  const s = r % BLOCK_SIZE;
  if (!e && s !== 0)
    throw new Error("aec/(cbc-ecb): unpadded plaintext with disabled padding");
  const o = u32(n);
  if (e) {
    let l = BLOCK_SIZE - s;
    l || (l = BLOCK_SIZE), r = r + l;
  }
  const a = getDst(r, t), c = u32(a);
  return { b: o, o: c, out: a };
}
function validatePCKS(n, e) {
  if (!e)
    return n;
  const t = n.length;
  if (!t)
    throw new Error("aes/pcks5: empty ciphertext not allowed");
  const r = n[t - 1];
  if (r <= 0 || r > 16)
    throw new Error(`aes/pcks5: wrong padding byte: ${r}`);
  const s = n.subarray(0, -r);
  for (let o = 0; o < r; o++)
    if (n[t - o - 1] !== r)
      throw new Error("aes/pcks5: wrong padding");
  return s;
}
function padPCKS(n) {
  const e = new Uint8Array(16), t = u32(e);
  e.set(n);
  const r = BLOCK_SIZE - n.length;
  for (let s = BLOCK_SIZE - r; s < BLOCK_SIZE; s++)
    e[s] = r;
  return t;
}
const cbc = /* @__PURE__ */ wrapCipher({ blockSize: 16, nonceLength: 16 }, function n(e, t, r = {}) {
  bytes(e), bytes(t, 16);
  const s = !r.disablePadding;
  return {
    encrypt: (o, a) => {
      const c = expandKeyLE(e), { b: l, o: u, out: h } = validateBlockEncrypt(o, s, a), f = u32(t);
      let p = f[0], m = f[1], E = f[2], g = f[3], b = 0;
      for (; b + 4 <= l.length; )
        p ^= l[b + 0], m ^= l[b + 1], E ^= l[b + 2], g ^= l[b + 3], { s0: p, s1: m, s2: E, s3: g } = encrypt$2(c, p, m, E, g), u[b++] = p, u[b++] = m, u[b++] = E, u[b++] = g;
      if (s) {
        const w = padPCKS(o.subarray(b * 4));
        p ^= w[0], m ^= w[1], E ^= w[2], g ^= w[3], { s0: p, s1: m, s2: E, s3: g } = encrypt$2(c, p, m, E, g), u[b++] = p, u[b++] = m, u[b++] = E, u[b++] = g;
      }
      return c.fill(0), h;
    },
    decrypt: (o, a) => {
      validateBlockDecrypt(o);
      const c = expandKeyDecLE(e), l = u32(t), u = getDst(o.length, a), h = u32(o), f = u32(u);
      let p = l[0], m = l[1], E = l[2], g = l[3];
      for (let b = 0; b + 4 <= h.length; ) {
        const w = p, $ = m, B = E, P = g;
        p = h[b + 0], m = h[b + 1], E = h[b + 2], g = h[b + 3];
        const { s0: U, s1: R, s2: C, s3: L } = decrypt$2(c, p, m, E, g);
        f[b++] = U ^ w, f[b++] = R ^ $, f[b++] = C ^ B, f[b++] = L ^ P;
      }
      return c.fill(0), validatePCKS(u, s);
    }
  };
}), _utf8ToBytes = (n) => Uint8Array.from(n.split("").map((e) => e.charCodeAt(0))), sigma16 = _utf8ToBytes("expand 16-byte k"), sigma32 = _utf8ToBytes("expand 32-byte k"), sigma16_32 = u32(sigma16), sigma32_32 = u32(sigma32);
sigma32_32.slice();
function rotl(n, e) {
  return n << e | n >>> 32 - e;
}
function isAligned32(n) {
  return n.byteOffset % 4 === 0;
}
const BLOCK_LEN = 64, BLOCK_LEN32 = 16, MAX_COUNTER = 2 ** 32 - 1, U32_EMPTY = new Uint32Array();
function runCipher(n, e, t, r, s, o, a, c) {
  const l = s.length, u = new Uint8Array(BLOCK_LEN), h = u32(u), f = isAligned32(s) && isAligned32(o), p = f ? u32(s) : U32_EMPTY, m = f ? u32(o) : U32_EMPTY;
  for (let E = 0; E < l; a++) {
    if (n(e, t, r, h, a, c), a >= MAX_COUNTER)
      throw new Error("arx: counter overflow");
    const g = Math.min(BLOCK_LEN, l - E);
    if (f && g === BLOCK_LEN) {
      const b = E / 4;
      if (E % 4 !== 0)
        throw new Error("arx: invalid block position");
      for (let w = 0, $; w < BLOCK_LEN32; w++)
        $ = b + w, m[$] = p[$] ^ h[w];
      E += BLOCK_LEN;
      continue;
    }
    for (let b = 0, w; b < g; b++)
      w = E + b, o[w] = s[w] ^ u[b];
    E += g;
  }
}
function createCipher(n, e) {
  const { allowShortKeys: t, extendNonceFn: r, counterLength: s, counterRight: o, rounds: a } = checkOpts({ allowShortKeys: !1, counterLength: 8, counterRight: !1, rounds: 20 }, e);
  if (typeof n != "function")
    throw new Error("core must be a function");
  return number(s), number(a), bool(o), bool(t), (c, l, u, h, f = 0) => {
    bytes(c), bytes(l), bytes(u);
    const p = u.length;
    if (h || (h = new Uint8Array(p)), bytes(h), number(f), f < 0 || f >= MAX_COUNTER)
      throw new Error("arx: counter overflow");
    if (h.length < p)
      throw new Error(`arx: output (${h.length}) is shorter than data (${p})`);
    const m = [];
    let E = c.length, g, b;
    if (E === 32)
      g = c.slice(), m.push(g), b = sigma32_32;
    else if (E === 16 && t)
      g = new Uint8Array(32), g.set(c), g.set(c, 16), b = sigma16_32, m.push(g);
    else
      throw new Error(`arx: invalid 32-byte key, got length=${E}`);
    isAligned32(l) || (l = l.slice(), m.push(l));
    const w = u32(g);
    if (r) {
      if (l.length !== 24)
        throw new Error("arx: extended nonce must be 24 bytes");
      r(b, w, u32(l.subarray(0, 16)), w), l = l.subarray(16);
    }
    const $ = 16 - s;
    if ($ !== l.length)
      throw new Error(`arx: nonce must be ${$} or 16 bytes`);
    if ($ !== 12) {
      const P = new Uint8Array(12);
      P.set(l, o ? 0 : 12 - l.length), l = P, m.push(l);
    }
    const B = u32(l);
    for (runCipher(n, b, w, B, u, h, f, a); m.length > 0; )
      m.pop().fill(0);
    return h;
  };
}
function chachaCore(n, e, t, r, s, o = 20) {
  let a = n[0], c = n[1], l = n[2], u = n[3], h = e[0], f = e[1], p = e[2], m = e[3], E = e[4], g = e[5], b = e[6], w = e[7], $ = s, B = t[0], P = t[1], U = t[2], R = a, C = c, L = l, M = u, F = h, x = f, _ = p, S = m, T = E, v = g, k = b, A = w, N = $, I = B, D = P, O = U;
  for (let z = 0; z < o; z += 2)
    R = R + F | 0, N = rotl(N ^ R, 16), T = T + N | 0, F = rotl(F ^ T, 12), R = R + F | 0, N = rotl(N ^ R, 8), T = T + N | 0, F = rotl(F ^ T, 7), C = C + x | 0, I = rotl(I ^ C, 16), v = v + I | 0, x = rotl(x ^ v, 12), C = C + x | 0, I = rotl(I ^ C, 8), v = v + I | 0, x = rotl(x ^ v, 7), L = L + _ | 0, D = rotl(D ^ L, 16), k = k + D | 0, _ = rotl(_ ^ k, 12), L = L + _ | 0, D = rotl(D ^ L, 8), k = k + D | 0, _ = rotl(_ ^ k, 7), M = M + S | 0, O = rotl(O ^ M, 16), A = A + O | 0, S = rotl(S ^ A, 12), M = M + S | 0, O = rotl(O ^ M, 8), A = A + O | 0, S = rotl(S ^ A, 7), R = R + x | 0, O = rotl(O ^ R, 16), k = k + O | 0, x = rotl(x ^ k, 12), R = R + x | 0, O = rotl(O ^ R, 8), k = k + O | 0, x = rotl(x ^ k, 7), C = C + _ | 0, N = rotl(N ^ C, 16), A = A + N | 0, _ = rotl(_ ^ A, 12), C = C + _ | 0, N = rotl(N ^ C, 8), A = A + N | 0, _ = rotl(_ ^ A, 7), L = L + S | 0, I = rotl(I ^ L, 16), T = T + I | 0, S = rotl(S ^ T, 12), L = L + S | 0, I = rotl(I ^ L, 8), T = T + I | 0, S = rotl(S ^ T, 7), M = M + F | 0, D = rotl(D ^ M, 16), v = v + D | 0, F = rotl(F ^ v, 12), M = M + F | 0, D = rotl(D ^ M, 8), v = v + D | 0, F = rotl(F ^ v, 7);
  let H = 0;
  r[H++] = a + R | 0, r[H++] = c + C | 0, r[H++] = l + L | 0, r[H++] = u + M | 0, r[H++] = h + F | 0, r[H++] = f + x | 0, r[H++] = p + _ | 0, r[H++] = m + S | 0, r[H++] = E + T | 0, r[H++] = g + v | 0, r[H++] = b + k | 0, r[H++] = w + A | 0, r[H++] = $ + N | 0, r[H++] = B + I | 0, r[H++] = P + D | 0, r[H++] = U + O | 0;
}
const chacha20 = /* @__PURE__ */ createCipher(chachaCore, {
  counterRight: !1,
  counterLength: 4,
  allowShortKeys: !1
});
let HMAC$1 = class extends Hash$1 {
  constructor(e, t) {
    super(), this.finished = !1, this.destroyed = !1, assert.hash(e);
    const r = toBytes$1(t);
    if (this.iHash = e.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const s = this.blockLen, o = new Uint8Array(s);
    o.set(r.length > s ? e.create().update(r).digest() : r);
    for (let a = 0; a < o.length; a++)
      o[a] ^= 54;
    this.iHash.update(o), this.oHash = e.create();
    for (let a = 0; a < o.length; a++)
      o[a] ^= 106;
    this.oHash.update(o), o.fill(0);
  }
  update(e) {
    return assert.exists(this), this.iHash.update(e), this;
  }
  digestInto(e) {
    assert.exists(this), assert.bytes(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy();
  }
  digest() {
    const e = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e), e;
  }
  _cloneInto(e) {
    e || (e = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: t, iHash: r, finished: s, destroyed: o, blockLen: a, outputLen: c } = this;
    return e = e, e.finished = s, e.destroyed = o, e.blockLen = a, e.outputLen = c, e.oHash = t._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
};
const hmac$1 = (n, e, t) => new HMAC$1(n, e).update(t).digest();
hmac$1.create = (n, e) => new HMAC$1(n, e);
function extract(n, e, t) {
  return assert.hash(n), hmac$1(n, toBytes$1(t), toBytes$1(e));
}
const HKDF_COUNTER = new Uint8Array([0]), EMPTY_BUFFER = new Uint8Array();
function expand(n, e, t, r = 32) {
  if (assert.hash(n), assert.number(r), r > 255 * n.outputLen)
    throw new Error("Length should be <= 255*HashLen");
  const s = Math.ceil(r / n.outputLen);
  t === void 0 && (t = EMPTY_BUFFER);
  const o = new Uint8Array(s * n.outputLen), a = hmac$1.create(n, e), c = a._cloneInto(), l = new Uint8Array(a.outputLen);
  for (let u = 0; u < s; u++)
    HKDF_COUNTER[0] = u + 1, c.update(u === 0 ? EMPTY_BUFFER : l).update(t).update(HKDF_COUNTER).digestInto(l), o.set(l, n.outputLen * u), a._cloneInto(c);
  return a.destroy(), c.destroy(), l.fill(0), HKDF_COUNTER.fill(0), o.slice(0, r);
}
var __defProp = Object.defineProperty, __export = (n, e) => {
  for (var t in e)
    __defProp(n, t, { get: e[t], enumerable: !0 });
}, verifiedSymbol = Symbol("verified"), isRecord = (n) => n instanceof Object;
function validateEvent(n) {
  if (!isRecord(n) || typeof n.kind != "number" || typeof n.content != "string" || typeof n.created_at != "number" || typeof n.pubkey != "string" || !n.pubkey.match(/^[a-f0-9]{64}$/) || !Array.isArray(n.tags))
    return !1;
  for (let e = 0; e < n.tags.length; e++) {
    let t = n.tags[e];
    if (!Array.isArray(t))
      return !1;
    for (let r = 0; r < t.length; r++)
      if (typeof t[r] == "object")
        return !1;
  }
  return !0;
}
var utils_exports = {};
__export(utils_exports, {
  Queue: () => Queue$1,
  QueueNode: () => QueueNode,
  binarySearch: () => binarySearch,
  insertEventIntoAscendingList: () => insertEventIntoAscendingList,
  insertEventIntoDescendingList: () => insertEventIntoDescendingList,
  normalizeURL: () => normalizeURL,
  utf8Decoder: () => utf8Decoder,
  utf8Encoder: () => utf8Encoder
});
var utf8Decoder = new TextDecoder("utf-8"), utf8Encoder = new TextEncoder();
function normalizeURL(n) {
  n.indexOf("://") === -1 && (n = "wss://" + n);
  let e = new URL(n);
  return e.pathname = e.pathname.replace(/\/+/g, "/"), e.pathname.endsWith("/") && (e.pathname = e.pathname.slice(0, -1)), (e.port === "80" && e.protocol === "ws:" || e.port === "443" && e.protocol === "wss:") && (e.port = ""), e.searchParams.sort(), e.hash = "", e.toString();
}
function insertEventIntoDescendingList(n, e) {
  const [t, r] = binarySearch(n, (s) => e.id === s.id ? 0 : e.created_at === s.created_at ? -1 : s.created_at - e.created_at);
  return r || n.splice(t, 0, e), n;
}
function insertEventIntoAscendingList(n, e) {
  const [t, r] = binarySearch(n, (s) => e.id === s.id ? 0 : e.created_at === s.created_at ? -1 : e.created_at - s.created_at);
  return r || n.splice(t, 0, e), n;
}
function binarySearch(n, e) {
  let t = 0, r = n.length - 1;
  for (; t <= r; ) {
    const s = Math.floor((t + r) / 2), o = e(n[s]);
    if (o === 0)
      return [s, !0];
    o < 0 ? r = s - 1 : t = s + 1;
  }
  return [t, !1];
}
var QueueNode = class {
  constructor(n) {
    y(this, "value");
    y(this, "next", null);
    y(this, "prev", null);
    this.value = n;
  }
}, Queue$1 = class {
  constructor() {
    y(this, "first");
    y(this, "last");
    this.first = null, this.last = null;
  }
  enqueue(e) {
    const t = new QueueNode(e);
    return this.last ? this.last === this.first ? (this.last = t, this.last.prev = this.first, this.first.next = t) : (t.prev = this.last, this.last.next = t, this.last = t) : (this.first = t, this.last = t), !0;
  }
  dequeue() {
    if (!this.first)
      return null;
    if (this.first === this.last) {
      const t = this.first;
      return this.first = null, this.last = null, t.value;
    }
    const e = this.first;
    return this.first = e.next, e.value;
  }
}, JS = class {
  generateSecretKey() {
    return schnorr$1.utils.randomPrivateKey();
  }
  getPublicKey(n) {
    return bytesToHex$2(schnorr$1.getPublicKey(n));
  }
  finalizeEvent(n, e) {
    const t = n;
    return t.pubkey = bytesToHex$2(schnorr$1.getPublicKey(e)), t.id = getEventHash$1(t), t.sig = bytesToHex$2(schnorr$1.sign(getEventHash$1(t), e)), t[verifiedSymbol] = !0, t;
  }
  verifyEvent(n) {
    if (typeof n[verifiedSymbol] == "boolean")
      return n[verifiedSymbol];
    const e = getEventHash$1(n);
    if (e !== n.id)
      return n[verifiedSymbol] = !1, !1;
    try {
      const t = schnorr$1.verify(n.sig, e, n.pubkey);
      return n[verifiedSymbol] = t, t;
    } catch {
      return n[verifiedSymbol] = !1, !1;
    }
  }
};
function serializeEvent(n) {
  if (!validateEvent(n))
    throw new Error("can't serialize event with wrong or missing properties");
  return JSON.stringify([0, n.pubkey, n.created_at, n.kind, n.tags, n.content]);
}
function getEventHash$1(n) {
  let e = sha256$1(utf8Encoder.encode(serializeEvent(n)));
  return bytesToHex$2(e);
}
var i = new JS(), generateSecretKey = i.generateSecretKey, getPublicKey = i.getPublicKey, finalizeEvent = i.finalizeEvent, verifyEvent = i.verifyEvent, kinds_exports = {};
__export(kinds_exports, {
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
  isAddressableKind: () => isAddressableKind,
  isEphemeralKind: () => isEphemeralKind,
  isKind: () => isKind,
  isParameterizedReplaceableKind: () => isParameterizedReplaceableKind,
  isRegularKind: () => isRegularKind,
  isReplaceableKind: () => isReplaceableKind
});
function isRegularKind(n) {
  return 1e3 <= n && n < 1e4 || [1, 2, 4, 5, 6, 7, 8, 16, 40, 41, 42, 43, 44].includes(n);
}
function isReplaceableKind(n) {
  return [0, 3].includes(n) || 1e4 <= n && n < 2e4;
}
function isEphemeralKind(n) {
  return 2e4 <= n && n < 3e4;
}
function isAddressableKind(n) {
  return 3e4 <= n && n < 4e4;
}
var isParameterizedReplaceableKind = isAddressableKind;
function classifyKind(n) {
  return isRegularKind(n) ? "regular" : isReplaceableKind(n) ? "replaceable" : isEphemeralKind(n) ? "ephemeral" : isAddressableKind(n) ? "parameterized" : "unknown";
}
function isKind(n, e) {
  const t = e instanceof Array ? e : [e];
  return validateEvent(n) && t.includes(n.kind) || !1;
}
var Metadata = 0, ShortTextNote = 1, RecommendRelay = 2, Contacts = 3, EncryptedDirectMessage = 4, EventDeletion = 5, Repost = 6, Reaction = 7, BadgeAward = 8, Seal = 13, PrivateDirectMessage = 14, GenericRepost = 16, ChannelCreation = 40, ChannelMetadata = 41, ChannelMessage = 42, ChannelHideMessage = 43, ChannelMuteUser = 44, OpenTimestamps = 1040, GiftWrap = 1059, FileMetadata = 1063, LiveChatMessage = 1311, ProblemTracker = 1971, Report = 1984, Reporting = 1984, Label = 1985, CommunityPostApproval = 4550, JobRequest = 5999, JobResult = 6999, JobFeedback = 7e3, ZapGoal = 9041, ZapRequest = 9734, Zap = 9735, Highlights = 9802, Mutelist = 1e4, Pinlist = 10001, RelayList = 10002, BookmarkList = 10003, CommunitiesList = 10004, PublicChatsList = 10005, BlockedRelaysList = 10006, SearchRelaysList = 10007, InterestsList = 10015, UserEmojiList = 10030, DirectMessageRelaysList = 10050, FileServerPreference = 10096, NWCWalletInfo = 13194, LightningPubRPC = 21e3, ClientAuth = 22242, NWCWalletRequest = 23194, NWCWalletResponse = 23195, NostrConnect = 24133, HTTPAuth = 27235, Followsets = 3e4, Genericlists = 30001, Relaysets = 30002, Bookmarksets = 30003, Curationsets = 30004, ProfileBadges = 30008, BadgeDefinition = 30009, Interestsets = 30015, CreateOrUpdateStall = 30017, CreateOrUpdateProduct = 30018, LongFormArticle = 30023, DraftLong = 30024, Emojisets = 30030, Application = 30078, LiveEvent = 30311, UserStatuses = 30315, ClassifiedListing = 30402, DraftClassifiedListing = 30403, Date2 = 31922, Time = 31923, Calendar = 31924, CalendarEventRSVP = 31925, Handlerrecommendation = 31989, Handlerinformation = 31990, CommunityDefinition = 34550;
function matchFilter(n, e) {
  if (n.ids && n.ids.indexOf(e.id) === -1 || n.kinds && n.kinds.indexOf(e.kind) === -1 || n.authors && n.authors.indexOf(e.pubkey) === -1)
    return !1;
  for (let t in n)
    if (t[0] === "#") {
      let r = t.slice(1), s = n[`#${r}`];
      if (s && !e.tags.find(([o, a]) => o === t.slice(1) && s.indexOf(a) !== -1))
        return !1;
    }
  return !(n.since && e.created_at < n.since || n.until && e.created_at > n.until);
}
function matchFilters(n, e) {
  for (let t = 0; t < n.length; t++)
    if (matchFilter(n[t], e))
      return !0;
  return !1;
}
var fakejson_exports = {};
__export(fakejson_exports, {
  getHex64: () => getHex64,
  getInt: () => getInt,
  getSubscriptionId: () => getSubscriptionId,
  matchEventId: () => matchEventId,
  matchEventKind: () => matchEventKind,
  matchEventPubkey: () => matchEventPubkey
});
function getHex64(n, e) {
  let t = e.length + 3, r = n.indexOf(`"${e}":`) + t, s = n.slice(r).indexOf('"') + r + 1;
  return n.slice(s, s + 64);
}
function getInt(n, e) {
  let t = e.length, r = n.indexOf(`"${e}":`) + t + 3, s = n.slice(r), o = Math.min(s.indexOf(","), s.indexOf("}"));
  return parseInt(s.slice(0, o), 10);
}
function getSubscriptionId(n) {
  let e = n.slice(0, 22).indexOf('"EVENT"');
  if (e === -1)
    return null;
  let t = n.slice(e + 7 + 1).indexOf('"');
  if (t === -1)
    return null;
  let r = e + 7 + 1 + t, s = n.slice(r + 1, 80).indexOf('"');
  if (s === -1)
    return null;
  let o = r + 1 + s;
  return n.slice(r + 1, o);
}
function matchEventId(n, e) {
  return e === getHex64(n, "id");
}
function matchEventPubkey(n, e) {
  return e === getHex64(n, "pubkey");
}
function matchEventKind(n, e) {
  return e === getInt(n, "kind");
}
var nip42_exports = {};
__export(nip42_exports, {
  makeAuthEvent: () => makeAuthEvent
});
function makeAuthEvent(n, e) {
  return {
    kind: ClientAuth,
    created_at: Math.floor(Date.now() / 1e3),
    tags: [
      ["relay", n],
      ["challenge", e]
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
__export(nip19_exports, {
  BECH32_REGEX: () => BECH32_REGEX$1,
  Bech32MaxSize: () => Bech32MaxSize,
  NostrTypeGuard: () => NostrTypeGuard,
  decode: () => decode,
  decodeNostrURI: () => decodeNostrURI,
  encodeBytes: () => encodeBytes,
  naddrEncode: () => naddrEncode,
  neventEncode: () => neventEncode,
  noteEncode: () => noteEncode,
  nprofileEncode: () => nprofileEncode,
  npubEncode: () => npubEncode,
  nsecEncode: () => nsecEncode
});
var NostrTypeGuard = {
  isNProfile: (n) => /^nprofile1[a-z\d]+$/.test(n || ""),
  isNEvent: (n) => /^nevent1[a-z\d]+$/.test(n || ""),
  isNAddr: (n) => /^naddr1[a-z\d]+$/.test(n || ""),
  isNSec: (n) => /^nsec1[a-z\d]{58}$/.test(n || ""),
  isNPub: (n) => /^npub1[a-z\d]{58}$/.test(n || ""),
  isNote: (n) => /^note1[a-z\d]+$/.test(n || ""),
  isNcryptsec: (n) => /^ncryptsec1[a-z\d]+$/.test(n || "")
}, Bech32MaxSize = 5e3, BECH32_REGEX$1 = /[\x21-\x7E]{1,83}1[023456789acdefghjklmnpqrstuvwxyz]{6,}/;
function integerToUint8Array(n) {
  const e = new Uint8Array(4);
  return e[0] = n >> 24 & 255, e[1] = n >> 16 & 255, e[2] = n >> 8 & 255, e[3] = n & 255, e;
}
function decodeNostrURI(n) {
  try {
    return n.startsWith("nostr:") && (n = n.substring(6)), decode(n);
  } catch {
    return { type: "invalid", data: null };
  }
}
function decode(n) {
  var s, o, a, c, l, u, h;
  let { prefix: e, words: t } = bech32$1.decode(n, Bech32MaxSize), r = new Uint8Array(bech32$1.fromWords(t));
  switch (e) {
    case "nprofile": {
      let f = parseTLV(r);
      if (!((s = f[0]) != null && s[0]))
        throw new Error("missing TLV 0 for nprofile");
      if (f[0][0].length !== 32)
        throw new Error("TLV 0 should be 32 bytes");
      return {
        type: "nprofile",
        data: {
          pubkey: bytesToHex$2(f[0][0]),
          relays: f[1] ? f[1].map((p) => utf8Decoder.decode(p)) : []
        }
      };
    }
    case "nevent": {
      let f = parseTLV(r);
      if (!((o = f[0]) != null && o[0]))
        throw new Error("missing TLV 0 for nevent");
      if (f[0][0].length !== 32)
        throw new Error("TLV 0 should be 32 bytes");
      if (f[2] && f[2][0].length !== 32)
        throw new Error("TLV 2 should be 32 bytes");
      if (f[3] && f[3][0].length !== 4)
        throw new Error("TLV 3 should be 4 bytes");
      return {
        type: "nevent",
        data: {
          id: bytesToHex$2(f[0][0]),
          relays: f[1] ? f[1].map((p) => utf8Decoder.decode(p)) : [],
          author: (a = f[2]) != null && a[0] ? bytesToHex$2(f[2][0]) : void 0,
          kind: (c = f[3]) != null && c[0] ? parseInt(bytesToHex$2(f[3][0]), 16) : void 0
        }
      };
    }
    case "naddr": {
      let f = parseTLV(r);
      if (!((l = f[0]) != null && l[0]))
        throw new Error("missing TLV 0 for naddr");
      if (!((u = f[2]) != null && u[0]))
        throw new Error("missing TLV 2 for naddr");
      if (f[2][0].length !== 32)
        throw new Error("TLV 2 should be 32 bytes");
      if (!((h = f[3]) != null && h[0]))
        throw new Error("missing TLV 3 for naddr");
      if (f[3][0].length !== 4)
        throw new Error("TLV 3 should be 4 bytes");
      return {
        type: "naddr",
        data: {
          identifier: utf8Decoder.decode(f[0][0]),
          pubkey: bytesToHex$2(f[2][0]),
          kind: parseInt(bytesToHex$2(f[3][0]), 16),
          relays: f[1] ? f[1].map((p) => utf8Decoder.decode(p)) : []
        }
      };
    }
    case "nsec":
      return { type: e, data: r };
    case "npub":
    case "note":
      return { type: e, data: bytesToHex$2(r) };
    default:
      throw new Error(`unknown prefix ${e}`);
  }
}
function parseTLV(n) {
  let e = {}, t = n;
  for (; t.length > 0; ) {
    let r = t[0], s = t[1], o = t.slice(2, 2 + s);
    if (t = t.slice(2 + s), o.length < s)
      throw new Error(`not enough data to read on TLV ${r}`);
    e[r] = e[r] || [], e[r].push(o);
  }
  return e;
}
function nsecEncode(n) {
  return encodeBytes("nsec", n);
}
function npubEncode(n) {
  return encodeBytes("npub", hexToBytes$2(n));
}
function noteEncode(n) {
  return encodeBytes("note", hexToBytes$2(n));
}
function encodeBech32(n, e) {
  let t = bech32$1.toWords(e);
  return bech32$1.encode(n, t, Bech32MaxSize);
}
function encodeBytes(n, e) {
  return encodeBech32(n, e);
}
function nprofileEncode(n) {
  let e = encodeTLV({
    0: [hexToBytes$2(n.pubkey)],
    1: (n.relays || []).map((t) => utf8Encoder.encode(t))
  });
  return encodeBech32("nprofile", e);
}
function neventEncode(n) {
  let e;
  n.kind !== void 0 && (e = integerToUint8Array(n.kind));
  let t = encodeTLV({
    0: [hexToBytes$2(n.id)],
    1: (n.relays || []).map((r) => utf8Encoder.encode(r)),
    2: n.author ? [hexToBytes$2(n.author)] : [],
    3: e ? [new Uint8Array(e)] : []
  });
  return encodeBech32("nevent", t);
}
function naddrEncode(n) {
  let e = new ArrayBuffer(4);
  new DataView(e).setUint32(0, n.kind, !1);
  let t = encodeTLV({
    0: [utf8Encoder.encode(n.identifier)],
    1: (n.relays || []).map((r) => utf8Encoder.encode(r)),
    2: [hexToBytes$2(n.pubkey)],
    3: [new Uint8Array(e)]
  });
  return encodeBech32("naddr", t);
}
function encodeTLV(n) {
  let e = [];
  return Object.entries(n).reverse().forEach(([t, r]) => {
    r.forEach((s) => {
      let o = new Uint8Array(s.length + 2);
      o.set([parseInt(t)], 0), o.set([s.length], 1), o.set(s, 2), e.push(o);
    });
  }), concatBytes$2(...e);
}
var nip04_exports = {};
__export(nip04_exports, {
  decrypt: () => decrypt$1,
  encrypt: () => encrypt$1
});
function encrypt$1(n, e, t) {
  const r = n instanceof Uint8Array ? bytesToHex$2(n) : n, s = secp256k1$1.getSharedSecret(r, "02" + e), o = getNormalizedX(s);
  let a = Uint8Array.from(randomBytes$1(16)), c = utf8Encoder.encode(t), l = cbc(o, a).encrypt(c), u = base64.encode(new Uint8Array(l)), h = base64.encode(new Uint8Array(a.buffer));
  return `${u}?iv=${h}`;
}
function decrypt$1(n, e, t) {
  const r = n instanceof Uint8Array ? bytesToHex$2(n) : n;
  let [s, o] = t.split("?iv="), a = secp256k1$1.getSharedSecret(r, "02" + e), c = getNormalizedX(a), l = base64.decode(o), u = base64.decode(s), h = cbc(c, l).decrypt(u);
  return utf8Decoder.decode(h);
}
function getNormalizedX(n) {
  return n.slice(1, 33);
}
var nip05_exports = {};
__export(nip05_exports, {
  NIP05_REGEX: () => NIP05_REGEX$1,
  isNip05: () => isNip05,
  isValid: () => isValid,
  queryProfile: () => queryProfile,
  searchDomain: () => searchDomain,
  useFetchImplementation: () => useFetchImplementation
});
var NIP05_REGEX$1 = /^(?:([\w.+-]+)@)?([\w_-]+(\.[\w_-]+)+)$/, isNip05 = (n) => NIP05_REGEX$1.test(n || ""), _fetch;
try {
  _fetch = fetch;
} catch (n) {
}
function useFetchImplementation(n) {
  _fetch = n;
}
async function searchDomain(n, e = "") {
  try {
    const t = `https://${n}/.well-known/nostr.json?name=${e}`, r = await _fetch(t, { redirect: "manual" });
    if (r.status !== 200)
      throw Error("Wrong response code");
    return (await r.json()).names;
  } catch {
    return {};
  }
}
async function queryProfile(n) {
  var s;
  const e = n.match(NIP05_REGEX$1);
  if (!e)
    return null;
  const [, t = "_", r] = e;
  try {
    const o = `https://${r}/.well-known/nostr.json?name=${t}`, a = await _fetch(o, { redirect: "manual" });
    if (a.status !== 200)
      throw Error("Wrong response code");
    const c = await a.json(), l = c.names[t];
    return l ? { pubkey: l, relays: (s = c.relays) == null ? void 0 : s[l] } : null;
  } catch {
    return null;
  }
}
async function isValid(n, e) {
  const t = await queryProfile(e);
  return t ? t.pubkey === n : !1;
}
var nip10_exports = {};
__export(nip10_exports, {
  parse: () => parse
});
function parse(n) {
  const e = {
    reply: void 0,
    root: void 0,
    mentions: [],
    profiles: [],
    quotes: []
  };
  let t, r;
  for (let s = n.tags.length - 1; s >= 0; s--) {
    const o = n.tags[s];
    if (o[0] === "e" && o[1]) {
      const [a, c, l, u, h] = o, f = {
        id: c,
        relays: l ? [l] : [],
        author: h
      };
      if (u === "root") {
        e.root = f;
        continue;
      }
      if (u === "reply") {
        e.reply = f;
        continue;
      }
      if (u === "mention") {
        e.mentions.push(f);
        continue;
      }
      t ? r = f : t = f, e.mentions.push(f);
      continue;
    }
    if (o[0] === "q" && o[1]) {
      const [a, c, l] = o;
      e.quotes.push({
        id: c,
        relays: l ? [l] : []
      });
    }
    if (o[0] === "p" && o[1]) {
      e.profiles.push({
        pubkey: o[1],
        relays: o[2] ? [o[2]] : []
      });
      continue;
    }
  }
  return e.root || (e.root = r || t || e.reply), e.reply || (e.reply = t || e.root), [e.reply, e.root].forEach((s) => {
    if (!s)
      return;
    let o = e.mentions.indexOf(s);
    if (o !== -1 && e.mentions.splice(o, 1), s.author) {
      let a = e.profiles.find((c) => c.pubkey === s.author);
      a && a.relays && (s.relays || (s.relays = []), a.relays.forEach((c) => {
        var l;
        ((l = s.relays) == null ? void 0 : l.indexOf(c)) === -1 && s.relays.push(c);
      }), a.relays = s.relays);
    }
  }), e.mentions.forEach((s) => {
    if (s.author) {
      let o = e.profiles.find((a) => a.pubkey === s.author);
      o && o.relays && (s.relays || (s.relays = []), o.relays.forEach((a) => {
        s.relays.indexOf(a) === -1 && s.relays.push(a);
      }), o.relays = s.relays);
    }
  }), e;
}
var nip11_exports = {};
__export(nip11_exports, {
  fetchRelayInformation: () => fetchRelayInformation,
  useFetchImplementation: () => useFetchImplementation2
});
var _fetch2;
try {
  _fetch2 = fetch;
} catch {
}
function useFetchImplementation2(n) {
  _fetch2 = n;
}
async function fetchRelayInformation(n) {
  return await (await fetch(n.replace("ws://", "http://").replace("wss://", "https://"), {
    headers: { Accept: "application/nostr+json" }
  })).json();
}
var nip13_exports = {};
__export(nip13_exports, {
  fastEventHash: () => fastEventHash,
  getPow: () => getPow,
  minePow: () => minePow
});
function getPow(n) {
  let e = 0;
  for (let t = 0; t < 64; t += 8) {
    const r = parseInt(n.substring(t, t + 8), 16);
    if (r === 0)
      e += 32;
    else {
      e += Math.clz32(r);
      break;
    }
  }
  return e;
}
function minePow(n, e) {
  let t = 0;
  const r = n, s = ["nonce", t.toString(), e.toString()];
  for (r.tags.push(s); ; ) {
    const o = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
    if (o !== r.created_at && (t = 0, r.created_at = o), s[1] = (++t).toString(), r.id = fastEventHash(r), getPow(r.id) >= e)
      break;
  }
  return r;
}
function fastEventHash(n) {
  return bytesToHex$2(
    sha256$1(utf8Encoder.encode(JSON.stringify([0, n.pubkey, n.created_at, n.kind, n.tags, n.content])))
  );
}
var nip17_exports = {};
__export(nip17_exports, {
  unwrapEvent: () => unwrapEvent2,
  unwrapManyEvents: () => unwrapManyEvents2,
  wrapEvent: () => wrapEvent2,
  wrapManyEvents: () => wrapManyEvents2
});
var nip59_exports = {};
__export(nip59_exports, {
  createRumor: () => createRumor,
  createSeal: () => createSeal,
  createWrap: () => createWrap,
  unwrapEvent: () => unwrapEvent,
  unwrapManyEvents: () => unwrapManyEvents,
  wrapEvent: () => wrapEvent$1,
  wrapManyEvents: () => wrapManyEvents
});
var nip44_exports = {};
__export(nip44_exports, {
  decrypt: () => decrypt2,
  encrypt: () => encrypt2,
  getConversationKey: () => getConversationKey,
  v2: () => v2
});
var minPlaintextSize = 1, maxPlaintextSize = 65535;
function getConversationKey(n, e) {
  const t = secp256k1$1.getSharedSecret(n, "02" + e).subarray(1, 33);
  return extract(sha256$1, t, "nip44-v2");
}
function getMessageKeys(n, e) {
  const t = expand(sha256$1, n, e, 76);
  return {
    chacha_key: t.subarray(0, 32),
    chacha_nonce: t.subarray(32, 44),
    hmac_key: t.subarray(44, 76)
  };
}
function calcPaddedLen(n) {
  if (!Number.isSafeInteger(n) || n < 1)
    throw new Error("expected positive integer");
  if (n <= 32)
    return 32;
  const e = 1 << Math.floor(Math.log2(n - 1)) + 1, t = e <= 256 ? 32 : e / 8;
  return t * (Math.floor((n - 1) / t) + 1);
}
function writeU16BE(n) {
  if (!Number.isSafeInteger(n) || n < minPlaintextSize || n > maxPlaintextSize)
    throw new Error("invalid plaintext size: must be between 1 and 65535 bytes");
  const e = new Uint8Array(2);
  return new DataView(e.buffer).setUint16(0, n, !1), e;
}
function pad(n) {
  const e = utf8Encoder.encode(n), t = e.length, r = writeU16BE(t), s = new Uint8Array(calcPaddedLen(t) - t);
  return concatBytes$2(r, e, s);
}
function unpad(n) {
  const e = new DataView(n.buffer).getUint16(0), t = n.subarray(2, 2 + e);
  if (e < minPlaintextSize || e > maxPlaintextSize || t.length !== e || n.length !== 2 + calcPaddedLen(e))
    throw new Error("invalid padding");
  return utf8Decoder.decode(t);
}
function hmacAad(n, e, t) {
  if (t.length !== 32)
    throw new Error("AAD associated data must be 32 bytes");
  const r = concatBytes$2(t, e);
  return hmac$1(sha256$1, n, r);
}
function decodePayload(n) {
  if (typeof n != "string")
    throw new Error("payload must be a valid string");
  const e = n.length;
  if (e < 132 || e > 87472)
    throw new Error("invalid payload length: " + e);
  if (n[0] === "#")
    throw new Error("unknown encryption version");
  let t;
  try {
    t = base64.decode(n);
  } catch (o) {
    throw new Error("invalid base64: " + o.message);
  }
  const r = t.length;
  if (r < 99 || r > 65603)
    throw new Error("invalid data length: " + r);
  const s = t[0];
  if (s !== 2)
    throw new Error("unknown encryption version " + s);
  return {
    nonce: t.subarray(1, 33),
    ciphertext: t.subarray(33, -32),
    mac: t.subarray(-32)
  };
}
function encrypt2(n, e, t = randomBytes$1(32)) {
  const { chacha_key: r, chacha_nonce: s, hmac_key: o } = getMessageKeys(e, t), a = pad(n), c = chacha20(r, s, a), l = hmacAad(o, c, t);
  return base64.encode(concatBytes$2(new Uint8Array([2]), t, c, l));
}
function decrypt2(n, e) {
  const { nonce: t, ciphertext: r, mac: s } = decodePayload(n), { chacha_key: o, chacha_nonce: a, hmac_key: c } = getMessageKeys(e, t), l = hmacAad(c, r, t);
  if (!equalBytes$1(l, s))
    throw new Error("invalid MAC");
  const u = chacha20(o, a, r);
  return unpad(u);
}
var v2 = {
  utils: {
    getConversationKey,
    calcPaddedLen
  },
  encrypt: encrypt2,
  decrypt: decrypt2
}, TWO_DAYS = 2 * 24 * 60 * 60, now$1 = () => Math.round(Date.now() / 1e3), randomNow = () => Math.round(now$1() - Math.random() * TWO_DAYS), nip44ConversationKey = (n, e) => getConversationKey(n, e), nip44Encrypt = (n, e, t) => encrypt2(JSON.stringify(n), nip44ConversationKey(e, t)), nip44Decrypt = (n, e) => JSON.parse(decrypt2(n.content, nip44ConversationKey(e, n.pubkey)));
function createRumor(n, e) {
  const t = {
    created_at: now$1(),
    content: "",
    tags: [],
    ...n,
    pubkey: getPublicKey(e)
  };
  return t.id = getEventHash$1(t), t;
}
function createSeal(n, e, t) {
  return finalizeEvent(
    {
      kind: Seal,
      content: nip44Encrypt(n, e, t),
      created_at: randomNow(),
      tags: []
    },
    e
  );
}
function createWrap(n, e) {
  const t = generateSecretKey();
  return finalizeEvent(
    {
      kind: GiftWrap,
      content: nip44Encrypt(n, t, e),
      created_at: randomNow(),
      tags: [["p", e]]
    },
    t
  );
}
function wrapEvent$1(n, e, t) {
  const r = createRumor(n, e), s = createSeal(r, e, t);
  return createWrap(s, t);
}
function wrapManyEvents(n, e, t) {
  if (!t || t.length === 0)
    throw new Error("At least one recipient is required.");
  const r = getPublicKey(e), s = [wrapEvent$1(n, e, r)];
  return t.forEach((o) => {
    s.push(wrapEvent$1(n, e, o));
  }), s;
}
function unwrapEvent(n, e) {
  const t = nip44Decrypt(n, e);
  return nip44Decrypt(t, e);
}
function unwrapManyEvents(n, e) {
  let t = [];
  return n.forEach((r) => {
    t.push(unwrapEvent(r, e));
  }), t.sort((r, s) => r.created_at - s.created_at), t;
}
function createEvent(n, e, t, r) {
  const s = {
    created_at: Math.ceil(Date.now() / 1e3),
    kind: PrivateDirectMessage,
    tags: [],
    content: e
  };
  return (Array.isArray(n) ? n : [n]).forEach(({ publicKey: a, relayUrl: c }) => {
    s.tags.push(c ? ["p", a, c] : ["p", a]);
  }), r && s.tags.push(["e", r.eventId, r.relayUrl || "", "reply"]), t && s.tags.push(["subject", t]), s;
}
function wrapEvent2(n, e, t, r, s) {
  const o = createEvent(e, t, r, s);
  return wrapEvent$1(o, n, e.publicKey);
}
function wrapManyEvents2(n, e, t, r, s) {
  if (!e || e.length === 0)
    throw new Error("At least one recipient is required.");
  return [{ publicKey: getPublicKey(n) }, ...e].map(
    (a) => wrapEvent2(n, a, t, r, s)
  );
}
var unwrapEvent2 = unwrapEvent, unwrapManyEvents2 = unwrapManyEvents, nip18_exports = {};
__export(nip18_exports, {
  finishRepostEvent: () => finishRepostEvent,
  getRepostedEvent: () => getRepostedEvent,
  getRepostedEventPointer: () => getRepostedEventPointer
});
function finishRepostEvent(n, e, t, r) {
  var a;
  let s;
  const o = [...n.tags ?? [], ["e", e.id, t], ["p", e.pubkey]];
  return e.kind === ShortTextNote ? s = Repost : (s = GenericRepost, o.push(["k", String(e.kind)])), finalizeEvent(
    {
      kind: s,
      tags: o,
      content: n.content === "" || (a = e.tags) != null && a.find((c) => c[0] === "-") ? "" : JSON.stringify(e),
      created_at: n.created_at
    },
    r
  );
}
function getRepostedEventPointer(n) {
  if (![Repost, GenericRepost].includes(n.kind))
    return;
  let e, t;
  for (let r = n.tags.length - 1; r >= 0 && (e === void 0 || t === void 0); r--) {
    const s = n.tags[r];
    s.length >= 2 && (s[0] === "e" && e === void 0 ? e = s : s[0] === "p" && t === void 0 && (t = s));
  }
  if (e !== void 0)
    return {
      id: e[1],
      relays: [e[2], t == null ? void 0 : t[2]].filter((r) => typeof r == "string"),
      author: t == null ? void 0 : t[1]
    };
}
function getRepostedEvent(n, { skipVerification: e } = {}) {
  const t = getRepostedEventPointer(n);
  if (t === void 0 || n.content === "")
    return;
  let r;
  try {
    r = JSON.parse(n.content);
  } catch {
    return;
  }
  if (r.id === t.id && !(!e && !verifyEvent(r)))
    return r;
}
var nip21_exports = {};
__export(nip21_exports, {
  NOSTR_URI_REGEX: () => NOSTR_URI_REGEX,
  parse: () => parse2,
  test: () => test
});
var NOSTR_URI_REGEX = new RegExp(`nostr:(${BECH32_REGEX$1.source})`);
function test(n) {
  return typeof n == "string" && new RegExp(`^${NOSTR_URI_REGEX.source}$`).test(n);
}
function parse2(n) {
  const e = n.match(new RegExp(`^${NOSTR_URI_REGEX.source}$`));
  if (!e)
    throw new Error(`Invalid Nostr URI: ${n}`);
  return {
    uri: e[0],
    value: e[1],
    decoded: decode(e[1])
  };
}
var nip25_exports = {};
__export(nip25_exports, {
  finishReactionEvent: () => finishReactionEvent,
  getReactedEventPointer: () => getReactedEventPointer
});
function finishReactionEvent(n, e, t) {
  const r = e.tags.filter((s) => s.length >= 2 && (s[0] === "e" || s[0] === "p"));
  return finalizeEvent(
    {
      ...n,
      kind: Reaction,
      tags: [...n.tags ?? [], ...r, ["e", e.id], ["p", e.pubkey]],
      content: n.content ?? "+"
    },
    t
  );
}
function getReactedEventPointer(n) {
  if (n.kind !== Reaction)
    return;
  let e, t;
  for (let r = n.tags.length - 1; r >= 0 && (e === void 0 || t === void 0); r--) {
    const s = n.tags[r];
    s.length >= 2 && (s[0] === "e" && e === void 0 ? e = s : s[0] === "p" && t === void 0 && (t = s));
  }
  if (!(e === void 0 || t === void 0))
    return {
      id: e[1],
      relays: [e[2], t[2]].filter((r) => r !== void 0),
      author: t[1]
    };
}
var nip27_exports = {};
__export(nip27_exports, {
  parse: () => parse3
});
var noCharacter = /\W/m, noURLCharacter = /\W |\W$|$|,| /m;
function* parse3(n) {
  const e = n.length;
  let t = 0, r = 0;
  for (; r < e; ) {
    let s = n.indexOf(":", r);
    if (s === -1)
      break;
    if (n.substring(s - 5, s) === "nostr") {
      const o = n.substring(s + 60).match(noCharacter), a = o ? s + 60 + o.index : e;
      try {
        let c, { data: l, type: u } = decode(n.substring(s + 1, a));
        switch (u) {
          case "npub":
            c = { pubkey: l };
            break;
          case "nsec":
          case "note":
            r = a + 1;
            continue;
          default:
            c = l;
        }
        t !== s - 5 && (yield { type: "text", text: n.substring(t, s - 5) }), yield { type: "reference", pointer: c }, r = a, t = r;
        continue;
      } catch {
        r = s + 1;
        continue;
      }
    } else if (n.substring(s - 5, s) === "https" || n.substring(s - 4, s) === "http") {
      const o = n.substring(s + 4).match(noURLCharacter), a = o ? s + 4 + o.index : e, c = n[s - 1] === "s" ? 5 : 4;
      try {
        let l = new URL(n.substring(s - c, a));
        if (l.hostname.indexOf(".") === -1)
          throw new Error("invalid url");
        if (t !== s - c && (yield { type: "text", text: n.substring(t, s - c) }), l.pathname.endsWith(".png") || l.pathname.endsWith(".jpg") || l.pathname.endsWith(".jpeg") || l.pathname.endsWith(".gif") || l.pathname.endsWith(".webp")) {
          yield { type: "image", url: l.toString() }, r = a, t = r;
          continue;
        }
        if (l.pathname.endsWith(".mp4") || l.pathname.endsWith(".avi") || l.pathname.endsWith(".webm") || l.pathname.endsWith(".mkv")) {
          yield { type: "video", url: l.toString() }, r = a, t = r;
          continue;
        }
        if (l.pathname.endsWith(".mp3") || l.pathname.endsWith(".aac") || l.pathname.endsWith(".ogg") || l.pathname.endsWith(".opus")) {
          yield { type: "audio", url: l.toString() }, r = a, t = r;
          continue;
        }
        yield { type: "url", url: l.toString() }, r = a, t = r;
        continue;
      } catch {
        r = a + 1;
        continue;
      }
    } else if (n.substring(s - 3, s) === "wss" || n.substring(s - 2, s) === "ws") {
      const o = n.substring(s + 4).match(noURLCharacter), a = o ? s + 4 + o.index : e, c = n[s - 1] === "s" ? 3 : 2;
      try {
        let l = new URL(n.substring(s - c, a));
        if (l.hostname.indexOf(".") === -1)
          throw new Error("invalid ws url");
        t !== s - c && (yield { type: "text", text: n.substring(t, s - c) }), yield { type: "relay", url: l.toString() }, r = a, t = r;
        continue;
      } catch {
        r = a + 1;
        continue;
      }
    } else {
      r = s + 1;
      continue;
    }
  }
  t !== e && (yield { type: "text", text: n.substring(t) });
}
var nip28_exports = {};
__export(nip28_exports, {
  channelCreateEvent: () => channelCreateEvent,
  channelHideMessageEvent: () => channelHideMessageEvent,
  channelMessageEvent: () => channelMessageEvent,
  channelMetadataEvent: () => channelMetadataEvent,
  channelMuteUserEvent: () => channelMuteUserEvent
});
var channelCreateEvent = (n, e) => {
  let t;
  if (typeof n.content == "object")
    t = JSON.stringify(n.content);
  else if (typeof n.content == "string")
    t = n.content;
  else
    return;
  return finalizeEvent(
    {
      kind: ChannelCreation,
      tags: [...n.tags ?? []],
      content: t,
      created_at: n.created_at
    },
    e
  );
}, channelMetadataEvent = (n, e) => {
  let t;
  if (typeof n.content == "object")
    t = JSON.stringify(n.content);
  else if (typeof n.content == "string")
    t = n.content;
  else
    return;
  return finalizeEvent(
    {
      kind: ChannelMetadata,
      tags: [["e", n.channel_create_event_id], ...n.tags ?? []],
      content: t,
      created_at: n.created_at
    },
    e
  );
}, channelMessageEvent = (n, e) => {
  const t = [["e", n.channel_create_event_id, n.relay_url, "root"]];
  return n.reply_to_channel_message_event_id && t.push(["e", n.reply_to_channel_message_event_id, n.relay_url, "reply"]), finalizeEvent(
    {
      kind: ChannelMessage,
      tags: [...t, ...n.tags ?? []],
      content: n.content,
      created_at: n.created_at
    },
    e
  );
}, channelHideMessageEvent = (n, e) => {
  let t;
  if (typeof n.content == "object")
    t = JSON.stringify(n.content);
  else if (typeof n.content == "string")
    t = n.content;
  else
    return;
  return finalizeEvent(
    {
      kind: ChannelHideMessage,
      tags: [["e", n.channel_message_event_id], ...n.tags ?? []],
      content: t,
      created_at: n.created_at
    },
    e
  );
}, channelMuteUserEvent = (n, e) => {
  let t;
  if (typeof n.content == "object")
    t = JSON.stringify(n.content);
  else if (typeof n.content == "string")
    t = n.content;
  else
    return;
  return finalizeEvent(
    {
      kind: ChannelMuteUser,
      tags: [["p", n.pubkey_to_mute], ...n.tags ?? []],
      content: t,
      created_at: n.created_at
    },
    e
  );
}, nip30_exports = {};
__export(nip30_exports, {
  EMOJI_SHORTCODE_REGEX: () => EMOJI_SHORTCODE_REGEX,
  matchAll: () => matchAll,
  regex: () => regex,
  replaceAll: () => replaceAll
});
var EMOJI_SHORTCODE_REGEX = /:(\w+):/, regex = () => new RegExp(`\\B${EMOJI_SHORTCODE_REGEX.source}\\B`, "g");
function* matchAll(n) {
  const e = n.matchAll(regex());
  for (const t of e)
    try {
      const [r, s] = t;
      yield {
        shortcode: r,
        name: s,
        start: t.index,
        end: t.index + r.length
      };
    } catch {
    }
}
function replaceAll(n, e) {
  return n.replaceAll(regex(), (t, r) => e({
    shortcode: t,
    name: r
  }));
}
var nip39_exports = {};
__export(nip39_exports, {
  useFetchImplementation: () => useFetchImplementation3,
  validateGithub: () => validateGithub
});
var _fetch3;
try {
  _fetch3 = fetch;
} catch {
}
function useFetchImplementation3(n) {
  _fetch3 = n;
}
async function validateGithub(n, e, t) {
  try {
    return await (await _fetch3(`https://gist.github.com/${e}/${t}/raw`)).text() === `Verifying that I control the following Nostr public key: ${n}`;
  } catch {
    return !1;
  }
}
var nip47_exports = {};
__export(nip47_exports, {
  makeNwcRequestEvent: () => makeNwcRequestEvent,
  parseConnectionString: () => parseConnectionString
});
function parseConnectionString(n) {
  const { pathname: e, searchParams: t } = new URL(n), r = e, s = t.get("relay"), o = t.get("secret");
  if (!r || !s || !o)
    throw new Error("invalid connection string");
  return { pubkey: r, relay: s, secret: o };
}
async function makeNwcRequestEvent(n, e, t) {
  const s = await encrypt$1(e, n, JSON.stringify({
    method: "pay_invoice",
    params: {
      invoice: t
    }
  })), o = {
    kind: NWCWalletRequest,
    created_at: Math.round(Date.now() / 1e3),
    content: s,
    tags: [["p", n]]
  };
  return finalizeEvent(o, e);
}
var nip54_exports = {};
__export(nip54_exports, {
  normalizeIdentifier: () => normalizeIdentifier
});
function normalizeIdentifier(n) {
  return n = n.trim().toLowerCase(), n = n.normalize("NFKC"), Array.from(n).map((e) => new RegExp("\\p{Letter}", "u").test(e) || new RegExp("\\p{Number}", "u").test(e) ? e : "-").join("");
}
var nip57_exports = {};
__export(nip57_exports, {
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
function useFetchImplementation4(n) {
  _fetch4 = n;
}
async function getZapEndpoint(n) {
  try {
    let e = "", { lud06: t, lud16: r } = JSON.parse(n.content);
    if (t) {
      let { words: a } = bech32$1.decode(t, 1e3), c = bech32$1.fromWords(a);
      e = utf8Decoder.decode(c);
    } else if (r) {
      let [a, c] = r.split("@");
      e = new URL(`/.well-known/lnurlp/${a}`, `https://${c}`).toString();
    } else
      return null;
    let o = await (await _fetch4(e)).json();
    if (o.allowsNostr && o.nostrPubkey)
      return o.callback;
  } catch {
  }
  return null;
}
function makeZapRequest({
  profile: n,
  event: e,
  amount: t,
  relays: r,
  comment: s = ""
}) {
  if (!t)
    throw new Error("amount not given");
  if (!n)
    throw new Error("profile not given");
  let o = {
    kind: 9734,
    created_at: Math.round(Date.now() / 1e3),
    content: s,
    tags: [
      ["p", n],
      ["amount", t.toString()],
      ["relays", ...r]
    ]
  };
  if (e && typeof e == "string" && o.tags.push(["e", e]), e && typeof e == "object") {
    if (isReplaceableKind(e.kind)) {
      const a = ["a", `${e.kind}:${e.pubkey}:`];
      o.tags.push(a);
    } else if (isAddressableKind(e.kind)) {
      let a = e.tags.find(([l, u]) => l === "d" && u);
      if (!a)
        throw new Error("d tag not found or is empty");
      const c = ["a", `${e.kind}:${e.pubkey}:${a[1]}`];
      o.tags.push(c);
    }
  }
  return o;
}
function validateZapRequest(n) {
  let e;
  try {
    e = JSON.parse(n);
  } catch {
    return "Invalid zap request JSON.";
  }
  if (!validateEvent(e))
    return "Zap request is not a valid Nostr event.";
  if (!verifyEvent(e))
    return "Invalid signature on zap request.";
  let t = e.tags.find(([o, a]) => o === "p" && a);
  if (!t)
    return "Zap request doesn't have a 'p' tag.";
  if (!t[1].match(/^[a-f0-9]{64}$/))
    return "Zap request 'p' tag is not valid hex.";
  let r = e.tags.find(([o, a]) => o === "e" && a);
  return r && !r[1].match(/^[a-f0-9]{64}$/) ? "Zap request 'e' tag is not valid hex." : e.tags.find(([o, a]) => o === "relays" && a) ? null : "Zap request doesn't have a 'relays' tag.";
}
function makeZapReceipt({
  zapRequest: n,
  preimage: e,
  bolt11: t,
  paidAt: r
}) {
  let s = JSON.parse(n), o = s.tags.filter(([c]) => c === "e" || c === "p" || c === "a"), a = {
    kind: 9735,
    created_at: Math.round(r.getTime() / 1e3),
    content: "",
    tags: [...o, ["P", s.pubkey], ["bolt11", t], ["description", n]]
  };
  return e && a.tags.push(["preimage", e]), a;
}
var nip98_exports = {};
__export(nip98_exports, {
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
async function getToken(n, e, t, r = !1, s) {
  const o = {
    kind: HTTPAuth,
    tags: [
      ["u", n],
      ["method", e]
    ],
    created_at: Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3),
    content: ""
  };
  s && o.tags.push(["payload", hashPayload(s)]);
  const a = await t(o);
  return (r ? _authorizationScheme : "") + base64.encode(utf8Encoder.encode(JSON.stringify(a)));
}
async function validateToken(n, e, t) {
  const r = await unpackEventFromToken(n).catch((o) => {
    throw o;
  });
  return await validateEvent2(r, e, t).catch((o) => {
    throw o;
  });
}
async function unpackEventFromToken(n) {
  if (!n)
    throw new Error("Missing token");
  n = n.replace(_authorizationScheme, "");
  const e = utf8Decoder.decode(base64.decode(n));
  if (!e || e.length === 0 || !e.startsWith("{"))
    throw new Error("Invalid token");
  return JSON.parse(e);
}
function validateEventTimestamp(n) {
  return n.created_at ? Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3) - n.created_at < 60 : !1;
}
function validateEventKind(n) {
  return n.kind === HTTPAuth;
}
function validateEventUrlTag(n, e) {
  const t = n.tags.find((r) => r[0] === "u");
  return t ? t.length > 0 && t[1] === e : !1;
}
function validateEventMethodTag(n, e) {
  const t = n.tags.find((r) => r[0] === "method");
  return t ? t.length > 0 && t[1].toLowerCase() === e.toLowerCase() : !1;
}
function hashPayload(n) {
  const e = sha256$1(utf8Encoder.encode(JSON.stringify(n)));
  return bytesToHex$2(e);
}
function validateEventPayloadTag(n, e) {
  const t = n.tags.find((s) => s[0] === "payload");
  if (!t)
    return !1;
  const r = hashPayload(e);
  return t.length > 0 && t[1] === r;
}
async function validateEvent2(n, e, t, r) {
  if (!verifyEvent(n))
    throw new Error("Invalid nostr event, signature invalid");
  if (!validateEventKind(n))
    throw new Error("Invalid nostr event, kind invalid");
  if (!validateEventTimestamp(n))
    throw new Error("Invalid nostr event, created_at timestamp invalid");
  if (!validateEventUrlTag(n, e))
    throw new Error("Invalid nostr event, url tag invalid");
  if (!validateEventMethodTag(n, t))
    throw new Error("Invalid nostr event, method tag invalid");
  if (r && typeof r == "object" && Object.keys(r).length > 0 && !validateEventPayloadTag(n, r))
    throw new Error("Invalid nostr event, payload tag does not match request body hash");
  return !0;
}
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function isBytes$1(n) {
  return n instanceof Uint8Array || ArrayBuffer.isView(n) && n.constructor.name === "Uint8Array";
}
function abytes$1(n, ...e) {
  if (!isBytes$1(n))
    throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(n.length))
    throw new Error("Uint8Array expected of length " + e + ", got length=" + n.length);
}
function ahash(n) {
  if (typeof n != "function" || typeof n.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  anumber(n.outputLen), anumber(n.blockLen);
}
function aexists(n, e = !0) {
  if (n.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (e && n.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(n, e) {
  abytes$1(n);
  const t = e.outputLen;
  if (n.length < t)
    throw new Error("digestInto() expects output buffer of length at least " + t);
}
const crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function createView(n) {
  return new DataView(n.buffer, n.byteOffset, n.byteLength);
}
function rotr(n, e) {
  return n << 32 - e | n >>> e;
}
const hexes$1 = /* @__PURE__ */ Array.from({ length: 256 }, (n, e) => e.toString(16).padStart(2, "0"));
function bytesToHex$1(n) {
  abytes$1(n);
  let e = "";
  for (let t = 0; t < n.length; t++)
    e += hexes$1[n[t]];
  return e;
}
const asciis$1 = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase16$1(n) {
  if (n >= asciis$1._0 && n <= asciis$1._9)
    return n - asciis$1._0;
  if (n >= asciis$1.A && n <= asciis$1.F)
    return n - (asciis$1.A - 10);
  if (n >= asciis$1.a && n <= asciis$1.f)
    return n - (asciis$1.a - 10);
}
function hexToBytes$1(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  const e = n.length, t = e / 2;
  if (e % 2)
    throw new Error("hex string expected, got unpadded hex of length " + e);
  const r = new Uint8Array(t);
  for (let s = 0, o = 0; s < t; s++, o += 2) {
    const a = asciiToBase16$1(n.charCodeAt(o)), c = asciiToBase16$1(n.charCodeAt(o + 1));
    if (a === void 0 || c === void 0) {
      const l = n[o] + n[o + 1];
      throw new Error('hex string expected, got non-hex character "' + l + '" at index ' + o);
    }
    r[s] = a * 16 + c;
  }
  return r;
}
function utf8ToBytes$1(n) {
  if (typeof n != "string")
    throw new Error("utf8ToBytes expected string, got " + typeof n);
  return new Uint8Array(new TextEncoder().encode(n));
}
function toBytes(n) {
  return typeof n == "string" && (n = utf8ToBytes$1(n)), abytes$1(n), n;
}
function concatBytes$1(...n) {
  let e = 0;
  for (let r = 0; r < n.length; r++) {
    const s = n[r];
    abytes$1(s), e += s.length;
  }
  const t = new Uint8Array(e);
  for (let r = 0, s = 0; r < n.length; r++) {
    const o = n[r];
    t.set(o, s), s += o.length;
  }
  return t;
}
class Hash {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function wrapConstructor(n) {
  const e = (r) => n().update(toBytes(r)).digest(), t = n();
  return e.outputLen = t.outputLen, e.blockLen = t.blockLen, e.create = () => n(), e;
}
function randomBytes(n = 32) {
  if (crypto && typeof crypto.getRandomValues == "function")
    return crypto.getRandomValues(new Uint8Array(n));
  if (crypto && typeof crypto.randomBytes == "function")
    return crypto.randomBytes(n);
  throw new Error("crypto.getRandomValues must be defined");
}
function setBigUint64(n, e, t, r) {
  if (typeof n.setBigUint64 == "function")
    return n.setBigUint64(e, t, r);
  const s = BigInt(32), o = BigInt(4294967295), a = Number(t >> s & o), c = Number(t & o), l = r ? 4 : 0, u = r ? 0 : 4;
  n.setUint32(e + l, a, r), n.setUint32(e + u, c, r);
}
function Chi(n, e, t) {
  return n & e ^ ~n & t;
}
function Maj(n, e, t) {
  return n & e ^ n & t ^ e & t;
}
class HashMD extends Hash {
  constructor(e, t, r, s) {
    super(), this.blockLen = e, this.outputLen = t, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = createView(this.buffer);
  }
  update(e) {
    aexists(this);
    const { view: t, buffer: r, blockLen: s } = this;
    e = toBytes(e);
    const o = e.length;
    for (let a = 0; a < o; ) {
      const c = Math.min(s - this.pos, o - a);
      if (c === s) {
        const l = createView(e);
        for (; s <= o - a; a += s)
          this.process(l, a);
        continue;
      }
      r.set(e.subarray(a, a + c), this.pos), this.pos += c, a += c, this.pos === s && (this.process(t, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    aexists(this), aoutput(e, this), this.finished = !0;
    const { buffer: t, view: r, blockLen: s, isLE: o } = this;
    let { pos: a } = this;
    t[a++] = 128, this.buffer.subarray(a).fill(0), this.padOffset > s - a && (this.process(r, 0), a = 0);
    for (let f = a; f < s; f++)
      t[f] = 0;
    setBigUint64(r, s - 8, BigInt(this.length * 8), o), this.process(r, 0);
    const c = createView(e), l = this.outputLen;
    if (l % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const u = l / 4, h = this.get();
    if (u > h.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let f = 0; f < u; f++)
      c.setUint32(4 * f, h[f], o);
  }
  digest() {
    const { buffer: e, outputLen: t } = this;
    this.digestInto(e);
    const r = e.slice(0, t);
    return this.destroy(), r;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    const { blockLen: t, buffer: r, length: s, finished: o, destroyed: a, pos: c } = this;
    return e.length = s, e.pos = c, e.finished = o, e.destroyed = a, s % t && e.buffer.set(r), e;
  }
}
const SHA256_K = /* @__PURE__ */ new Uint32Array([
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
]), SHA256_IV = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), SHA256_W = /* @__PURE__ */ new Uint32Array(64);
class SHA256 extends HashMD {
  constructor() {
    super(64, 32, 8, !1), this.A = SHA256_IV[0] | 0, this.B = SHA256_IV[1] | 0, this.C = SHA256_IV[2] | 0, this.D = SHA256_IV[3] | 0, this.E = SHA256_IV[4] | 0, this.F = SHA256_IV[5] | 0, this.G = SHA256_IV[6] | 0, this.H = SHA256_IV[7] | 0;
  }
  get() {
    const { A: e, B: t, C: r, D: s, E: o, F: a, G: c, H: l } = this;
    return [e, t, r, s, o, a, c, l];
  }
  // prettier-ignore
  set(e, t, r, s, o, a, c, l) {
    this.A = e | 0, this.B = t | 0, this.C = r | 0, this.D = s | 0, this.E = o | 0, this.F = a | 0, this.G = c | 0, this.H = l | 0;
  }
  process(e, t) {
    for (let f = 0; f < 16; f++, t += 4)
      SHA256_W[f] = e.getUint32(t, !1);
    for (let f = 16; f < 64; f++) {
      const p = SHA256_W[f - 15], m = SHA256_W[f - 2], E = rotr(p, 7) ^ rotr(p, 18) ^ p >>> 3, g = rotr(m, 17) ^ rotr(m, 19) ^ m >>> 10;
      SHA256_W[f] = g + SHA256_W[f - 7] + E + SHA256_W[f - 16] | 0;
    }
    let { A: r, B: s, C: o, D: a, E: c, F: l, G: u, H: h } = this;
    for (let f = 0; f < 64; f++) {
      const p = rotr(c, 6) ^ rotr(c, 11) ^ rotr(c, 25), m = h + p + Chi(c, l, u) + SHA256_K[f] + SHA256_W[f] | 0, g = (rotr(r, 2) ^ rotr(r, 13) ^ rotr(r, 22)) + Maj(r, s, o) | 0;
      h = u, u = l, l = c, c = a + m | 0, a = o, o = s, s = r, r = m + g | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, o = o + this.C | 0, a = a + this.D | 0, c = c + this.E | 0, l = l + this.F | 0, u = u + this.G | 0, h = h + this.H | 0, this.set(r, s, o, a, c, l, u, h);
  }
  roundClean() {
    SHA256_W.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const sha256 = /* @__PURE__ */ wrapConstructor(() => new SHA256());
class HMAC extends Hash {
  constructor(e, t) {
    super(), this.finished = !1, this.destroyed = !1, ahash(e);
    const r = toBytes(t);
    if (this.iHash = e.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const s = this.blockLen, o = new Uint8Array(s);
    o.set(r.length > s ? e.create().update(r).digest() : r);
    for (let a = 0; a < o.length; a++)
      o[a] ^= 54;
    this.iHash.update(o), this.oHash = e.create();
    for (let a = 0; a < o.length; a++)
      o[a] ^= 106;
    this.oHash.update(o), o.fill(0);
  }
  update(e) {
    return aexists(this), this.iHash.update(e), this;
  }
  digestInto(e) {
    aexists(this), abytes$1(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy();
  }
  digest() {
    const e = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e), e;
  }
  _cloneInto(e) {
    e || (e = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: t, iHash: r, finished: s, destroyed: o, blockLen: a, outputLen: c } = this;
    return e = e, e.finished = s, e.destroyed = o, e.blockLen = a, e.outputLen = c, e.oHash = t._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const hmac = (n, e, t) => new HMAC(n, e).update(t).digest();
hmac.create = (n, e) => new HMAC(n, e);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$4 = /* @__PURE__ */ BigInt(0), _1n$4 = /* @__PURE__ */ BigInt(1), _2n$2 = /* @__PURE__ */ BigInt(2);
function isBytes(n) {
  return n instanceof Uint8Array || ArrayBuffer.isView(n) && n.constructor.name === "Uint8Array";
}
function abytes(n) {
  if (!isBytes(n))
    throw new Error("Uint8Array expected");
}
function abool(n, e) {
  if (typeof e != "boolean")
    throw new Error(n + " boolean expected, got " + e);
}
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (n, e) => e.toString(16).padStart(2, "0"));
function bytesToHex(n) {
  abytes(n);
  let e = "";
  for (let t = 0; t < n.length; t++)
    e += hexes[n[t]];
  return e;
}
function numberToHexUnpadded(n) {
  const e = n.toString(16);
  return e.length & 1 ? "0" + e : e;
}
function hexToNumber(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  return n === "" ? _0n$4 : BigInt("0x" + n);
}
const asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase16(n) {
  if (n >= asciis._0 && n <= asciis._9)
    return n - asciis._0;
  if (n >= asciis.A && n <= asciis.F)
    return n - (asciis.A - 10);
  if (n >= asciis.a && n <= asciis.f)
    return n - (asciis.a - 10);
}
function hexToBytes(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  const e = n.length, t = e / 2;
  if (e % 2)
    throw new Error("hex string expected, got unpadded hex of length " + e);
  const r = new Uint8Array(t);
  for (let s = 0, o = 0; s < t; s++, o += 2) {
    const a = asciiToBase16(n.charCodeAt(o)), c = asciiToBase16(n.charCodeAt(o + 1));
    if (a === void 0 || c === void 0) {
      const l = n[o] + n[o + 1];
      throw new Error('hex string expected, got non-hex character "' + l + '" at index ' + o);
    }
    r[s] = a * 16 + c;
  }
  return r;
}
function bytesToNumberBE(n) {
  return hexToNumber(bytesToHex(n));
}
function bytesToNumberLE(n) {
  return abytes(n), hexToNumber(bytesToHex(Uint8Array.from(n).reverse()));
}
function numberToBytesBE(n, e) {
  return hexToBytes(n.toString(16).padStart(e * 2, "0"));
}
function numberToBytesLE(n, e) {
  return numberToBytesBE(n, e).reverse();
}
function numberToVarBytesBE(n) {
  return hexToBytes(numberToHexUnpadded(n));
}
function ensureBytes(n, e, t) {
  let r;
  if (typeof e == "string")
    try {
      r = hexToBytes(e);
    } catch (o) {
      throw new Error(n + " must be hex string or Uint8Array, cause: " + o);
    }
  else if (isBytes(e))
    r = Uint8Array.from(e);
  else
    throw new Error(n + " must be hex string or Uint8Array");
  const s = r.length;
  if (typeof t == "number" && s !== t)
    throw new Error(n + " of length " + t + " expected, got " + s);
  return r;
}
function concatBytes(...n) {
  let e = 0;
  for (let r = 0; r < n.length; r++) {
    const s = n[r];
    abytes(s), e += s.length;
  }
  const t = new Uint8Array(e);
  for (let r = 0, s = 0; r < n.length; r++) {
    const o = n[r];
    t.set(o, s), s += o.length;
  }
  return t;
}
function equalBytes(n, e) {
  if (n.length !== e.length)
    return !1;
  let t = 0;
  for (let r = 0; r < n.length; r++)
    t |= n[r] ^ e[r];
  return t === 0;
}
function utf8ToBytes(n) {
  if (typeof n != "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(n));
}
const isPosBig = (n) => typeof n == "bigint" && _0n$4 <= n;
function inRange(n, e, t) {
  return isPosBig(n) && isPosBig(e) && isPosBig(t) && e <= n && n < t;
}
function aInRange(n, e, t, r) {
  if (!inRange(e, t, r))
    throw new Error("expected valid " + n + ": " + t + " <= n < " + r + ", got " + e);
}
function bitLen(n) {
  let e;
  for (e = 0; n > _0n$4; n >>= _1n$4, e += 1)
    ;
  return e;
}
function bitGet(n, e) {
  return n >> BigInt(e) & _1n$4;
}
function bitSet(n, e, t) {
  return n | (t ? _1n$4 : _0n$4) << BigInt(e);
}
const bitMask = (n) => (_2n$2 << BigInt(n - 1)) - _1n$4, u8n = (n) => new Uint8Array(n), u8fr = (n) => Uint8Array.from(n);
function createHmacDrbg(n, e, t) {
  if (typeof n != "number" || n < 2)
    throw new Error("hashLen must be a number");
  if (typeof e != "number" || e < 2)
    throw new Error("qByteLen must be a number");
  if (typeof t != "function")
    throw new Error("hmacFn must be a function");
  let r = u8n(n), s = u8n(n), o = 0;
  const a = () => {
    r.fill(1), s.fill(0), o = 0;
  }, c = (...f) => t(s, r, ...f), l = (f = u8n()) => {
    s = c(u8fr([0]), f), r = c(), f.length !== 0 && (s = c(u8fr([1]), f), r = c());
  }, u = () => {
    if (o++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let f = 0;
    const p = [];
    for (; f < e; ) {
      r = c();
      const m = r.slice();
      p.push(m), f += r.length;
    }
    return concatBytes(...p);
  };
  return (f, p) => {
    a(), l(f);
    let m;
    for (; !(m = p(u())); )
      l();
    return a(), m;
  };
}
const validatorFns = {
  bigint: (n) => typeof n == "bigint",
  function: (n) => typeof n == "function",
  boolean: (n) => typeof n == "boolean",
  string: (n) => typeof n == "string",
  stringOrUint8Array: (n) => typeof n == "string" || isBytes(n),
  isSafeInteger: (n) => Number.isSafeInteger(n),
  array: (n) => Array.isArray(n),
  field: (n, e) => e.Fp.isValid(n),
  hash: (n) => typeof n == "function" && Number.isSafeInteger(n.outputLen)
};
function validateObject(n, e, t = {}) {
  const r = (s, o, a) => {
    const c = validatorFns[o];
    if (typeof c != "function")
      throw new Error("invalid validator function");
    const l = n[s];
    if (!(a && l === void 0) && !c(l, n))
      throw new Error("param " + String(s) + " is invalid. Expected " + o + ", got " + l);
  };
  for (const [s, o] of Object.entries(e))
    r(s, o, !1);
  for (const [s, o] of Object.entries(t))
    r(s, o, !0);
  return n;
}
const notImplemented = () => {
  throw new Error("not implemented");
};
function memoized(n) {
  const e = /* @__PURE__ */ new WeakMap();
  return (t, ...r) => {
    const s = e.get(t);
    if (s !== void 0)
      return s;
    const o = n(t, ...r);
    return e.set(t, o), o;
  };
}
const ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  aInRange,
  abool,
  abytes,
  bitGet,
  bitLen,
  bitMask,
  bitSet,
  bytesToHex,
  bytesToNumberBE,
  bytesToNumberLE,
  concatBytes,
  createHmacDrbg,
  ensureBytes,
  equalBytes,
  hexToBytes,
  hexToNumber,
  inRange,
  isBytes,
  memoized,
  notImplemented,
  numberToBytesBE,
  numberToBytesLE,
  numberToHexUnpadded,
  numberToVarBytesBE,
  utf8ToBytes,
  validateObject
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$3 = BigInt(0), _1n$3 = BigInt(1), _2n$1 = /* @__PURE__ */ BigInt(2), _3n$1 = /* @__PURE__ */ BigInt(3), _4n = /* @__PURE__ */ BigInt(4), _5n = /* @__PURE__ */ BigInt(5), _8n = /* @__PURE__ */ BigInt(8);
function mod(n, e) {
  const t = n % e;
  return t >= _0n$3 ? t : e + t;
}
function pow(n, e, t) {
  if (e < _0n$3)
    throw new Error("invalid exponent, negatives unsupported");
  if (t <= _0n$3)
    throw new Error("invalid modulus");
  if (t === _1n$3)
    return _0n$3;
  let r = _1n$3;
  for (; e > _0n$3; )
    e & _1n$3 && (r = r * n % t), n = n * n % t, e >>= _1n$3;
  return r;
}
function pow2(n, e, t) {
  let r = n;
  for (; e-- > _0n$3; )
    r *= r, r %= t;
  return r;
}
function invert(n, e) {
  if (n === _0n$3)
    throw new Error("invert: expected non-zero number");
  if (e <= _0n$3)
    throw new Error("invert: expected positive modulus, got " + e);
  let t = mod(n, e), r = e, s = _0n$3, o = _1n$3;
  for (; t !== _0n$3; ) {
    const c = r / t, l = r % t, u = s - o * c;
    r = t, t = l, s = o, o = u;
  }
  if (r !== _1n$3)
    throw new Error("invert: does not exist");
  return mod(s, e);
}
function tonelliShanks(n) {
  const e = (n - _1n$3) / _2n$1;
  let t, r, s;
  for (t = n - _1n$3, r = 0; t % _2n$1 === _0n$3; t /= _2n$1, r++)
    ;
  for (s = _2n$1; s < n && pow(s, e, n) !== n - _1n$3; s++)
    if (s > 1e3)
      throw new Error("Cannot find square root: likely non-prime P");
  if (r === 1) {
    const a = (n + _1n$3) / _4n;
    return function(l, u) {
      const h = l.pow(u, a);
      if (!l.eql(l.sqr(h), u))
        throw new Error("Cannot find square root");
      return h;
    };
  }
  const o = (t + _1n$3) / _2n$1;
  return function(c, l) {
    if (c.pow(l, e) === c.neg(c.ONE))
      throw new Error("Cannot find square root");
    let u = r, h = c.pow(c.mul(c.ONE, s), t), f = c.pow(l, o), p = c.pow(l, t);
    for (; !c.eql(p, c.ONE); ) {
      if (c.eql(p, c.ZERO))
        return c.ZERO;
      let m = 1;
      for (let g = c.sqr(p); m < u && !c.eql(g, c.ONE); m++)
        g = c.sqr(g);
      const E = c.pow(h, _1n$3 << BigInt(u - m - 1));
      h = c.sqr(E), f = c.mul(f, E), p = c.mul(p, h), u = m;
    }
    return f;
  };
}
function FpSqrt(n) {
  if (n % _4n === _3n$1) {
    const e = (n + _1n$3) / _4n;
    return function(r, s) {
      const o = r.pow(s, e);
      if (!r.eql(r.sqr(o), s))
        throw new Error("Cannot find square root");
      return o;
    };
  }
  if (n % _8n === _5n) {
    const e = (n - _5n) / _8n;
    return function(r, s) {
      const o = r.mul(s, _2n$1), a = r.pow(o, e), c = r.mul(s, a), l = r.mul(r.mul(c, _2n$1), a), u = r.mul(c, r.sub(l, r.ONE));
      if (!r.eql(r.sqr(u), s))
        throw new Error("Cannot find square root");
      return u;
    };
  }
  return tonelliShanks(n);
}
const FIELD_FIELDS = [
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
function validateField(n) {
  const e = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, t = FIELD_FIELDS.reduce((r, s) => (r[s] = "function", r), e);
  return validateObject(n, t);
}
function FpPow(n, e, t) {
  if (t < _0n$3)
    throw new Error("invalid exponent, negatives unsupported");
  if (t === _0n$3)
    return n.ONE;
  if (t === _1n$3)
    return e;
  let r = n.ONE, s = e;
  for (; t > _0n$3; )
    t & _1n$3 && (r = n.mul(r, s)), s = n.sqr(s), t >>= _1n$3;
  return r;
}
function FpInvertBatch(n, e) {
  const t = new Array(e.length), r = e.reduce((o, a, c) => n.is0(a) ? o : (t[c] = o, n.mul(o, a)), n.ONE), s = n.inv(r);
  return e.reduceRight((o, a, c) => n.is0(a) ? o : (t[c] = n.mul(o, t[c]), n.mul(o, a)), s), t;
}
function nLength(n, e) {
  const t = e !== void 0 ? e : n.toString(2).length, r = Math.ceil(t / 8);
  return { nBitLength: t, nByteLength: r };
}
function Field(n, e, t = !1, r = {}) {
  if (n <= _0n$3)
    throw new Error("invalid field: expected ORDER > 0, got " + n);
  const { nBitLength: s, nByteLength: o } = nLength(n, e);
  if (o > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let a;
  const c = Object.freeze({
    ORDER: n,
    isLE: t,
    BITS: s,
    BYTES: o,
    MASK: bitMask(s),
    ZERO: _0n$3,
    ONE: _1n$3,
    create: (l) => mod(l, n),
    isValid: (l) => {
      if (typeof l != "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof l);
      return _0n$3 <= l && l < n;
    },
    is0: (l) => l === _0n$3,
    isOdd: (l) => (l & _1n$3) === _1n$3,
    neg: (l) => mod(-l, n),
    eql: (l, u) => l === u,
    sqr: (l) => mod(l * l, n),
    add: (l, u) => mod(l + u, n),
    sub: (l, u) => mod(l - u, n),
    mul: (l, u) => mod(l * u, n),
    pow: (l, u) => FpPow(c, l, u),
    div: (l, u) => mod(l * invert(u, n), n),
    // Same as above, but doesn't normalize
    sqrN: (l) => l * l,
    addN: (l, u) => l + u,
    subN: (l, u) => l - u,
    mulN: (l, u) => l * u,
    inv: (l) => invert(l, n),
    sqrt: r.sqrt || ((l) => (a || (a = FpSqrt(n)), a(c, l))),
    invertBatch: (l) => FpInvertBatch(c, l),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (l, u, h) => h ? u : l,
    toBytes: (l) => t ? numberToBytesLE(l, o) : numberToBytesBE(l, o),
    fromBytes: (l) => {
      if (l.length !== o)
        throw new Error("Field.fromBytes: expected " + o + " bytes, got " + l.length);
      return t ? bytesToNumberLE(l) : bytesToNumberBE(l);
    }
  });
  return Object.freeze(c);
}
function getFieldBytesLength(n) {
  if (typeof n != "bigint")
    throw new Error("field order must be bigint");
  const e = n.toString(2).length;
  return Math.ceil(e / 8);
}
function getMinHashLength(n) {
  const e = getFieldBytesLength(n);
  return e + Math.ceil(e / 2);
}
function mapHashToField(n, e, t = !1) {
  const r = n.length, s = getFieldBytesLength(e), o = getMinHashLength(e);
  if (r < 16 || r < o || r > 1024)
    throw new Error("expected " + o + "-1024 bytes of input, got " + r);
  const a = t ? bytesToNumberLE(n) : bytesToNumberBE(n), c = mod(a, e - _1n$3) + _1n$3;
  return t ? numberToBytesLE(c, s) : numberToBytesBE(c, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$2 = BigInt(0), _1n$2 = BigInt(1);
function constTimeNegate(n, e) {
  const t = e.negate();
  return n ? t : e;
}
function validateW(n, e) {
  if (!Number.isSafeInteger(n) || n <= 0 || n > e)
    throw new Error("invalid window size, expected [1.." + e + "], got W=" + n);
}
function calcWOpts(n, e) {
  validateW(n, e);
  const t = Math.ceil(e / n) + 1, r = 2 ** (n - 1);
  return { windows: t, windowSize: r };
}
function validateMSMPoints(n, e) {
  if (!Array.isArray(n))
    throw new Error("array expected");
  n.forEach((t, r) => {
    if (!(t instanceof e))
      throw new Error("invalid point at index " + r);
  });
}
function validateMSMScalars(n, e) {
  if (!Array.isArray(n))
    throw new Error("array of scalars expected");
  n.forEach((t, r) => {
    if (!e.isValid(t))
      throw new Error("invalid scalar at index " + r);
  });
}
const pointPrecomputes = /* @__PURE__ */ new WeakMap(), pointWindowSizes = /* @__PURE__ */ new WeakMap();
function getW(n) {
  return pointWindowSizes.get(n) || 1;
}
function wNAF(n, e) {
  return {
    constTimeNegate,
    hasPrecomputes(t) {
      return getW(t) !== 1;
    },
    // non-const time multiplication ladder
    unsafeLadder(t, r, s = n.ZERO) {
      let o = t;
      for (; r > _0n$2; )
        r & _1n$2 && (s = s.add(o)), o = o.double(), r >>= _1n$2;
      return s;
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
    precomputeWindow(t, r) {
      const { windows: s, windowSize: o } = calcWOpts(r, e), a = [];
      let c = t, l = c;
      for (let u = 0; u < s; u++) {
        l = c, a.push(l);
        for (let h = 1; h < o; h++)
          l = l.add(c), a.push(l);
        c = l.double();
      }
      return a;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(t, r, s) {
      const { windows: o, windowSize: a } = calcWOpts(t, e);
      let c = n.ZERO, l = n.BASE;
      const u = BigInt(2 ** t - 1), h = 2 ** t, f = BigInt(t);
      for (let p = 0; p < o; p++) {
        const m = p * a;
        let E = Number(s & u);
        s >>= f, E > a && (E -= h, s += _1n$2);
        const g = m, b = m + Math.abs(E) - 1, w = p % 2 !== 0, $ = E < 0;
        E === 0 ? l = l.add(constTimeNegate(w, r[g])) : c = c.add(constTimeNegate($, r[b]));
      }
      return { p: c, f: l };
    },
    /**
     * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @param acc accumulator point to add result of multiplication
     * @returns point
     */
    wNAFUnsafe(t, r, s, o = n.ZERO) {
      const { windows: a, windowSize: c } = calcWOpts(t, e), l = BigInt(2 ** t - 1), u = 2 ** t, h = BigInt(t);
      for (let f = 0; f < a; f++) {
        const p = f * c;
        if (s === _0n$2)
          break;
        let m = Number(s & l);
        if (s >>= h, m > c && (m -= u, s += _1n$2), m === 0)
          continue;
        let E = r[p + Math.abs(m) - 1];
        m < 0 && (E = E.negate()), o = o.add(E);
      }
      return o;
    },
    getPrecomputes(t, r, s) {
      let o = pointPrecomputes.get(r);
      return o || (o = this.precomputeWindow(r, t), t !== 1 && pointPrecomputes.set(r, s(o))), o;
    },
    wNAFCached(t, r, s) {
      const o = getW(t);
      return this.wNAF(o, this.getPrecomputes(o, t, s), r);
    },
    wNAFCachedUnsafe(t, r, s, o) {
      const a = getW(t);
      return a === 1 ? this.unsafeLadder(t, r, o) : this.wNAFUnsafe(a, this.getPrecomputes(a, t, s), r, o);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(t, r) {
      validateW(r, e), pointWindowSizes.set(t, r), pointPrecomputes.delete(t);
    }
  };
}
function pippenger(n, e, t, r) {
  if (validateMSMPoints(t, n), validateMSMScalars(r, e), t.length !== r.length)
    throw new Error("arrays of points and scalars must have equal length");
  const s = n.ZERO, o = bitLen(BigInt(t.length)), a = o > 12 ? o - 3 : o > 4 ? o - 2 : o ? 2 : 1, c = (1 << a) - 1, l = new Array(c + 1).fill(s), u = Math.floor((e.BITS - 1) / a) * a;
  let h = s;
  for (let f = u; f >= 0; f -= a) {
    l.fill(s);
    for (let m = 0; m < r.length; m++) {
      const E = r[m], g = Number(E >> BigInt(f) & BigInt(c));
      l[g] = l[g].add(t[m]);
    }
    let p = s;
    for (let m = l.length - 1, E = s; m > 0; m--)
      E = E.add(l[m]), p = p.add(E);
    if (h = h.add(p), f !== 0)
      for (let m = 0; m < a; m++)
        h = h.double();
  }
  return h;
}
function validateBasic(n) {
  return validateField(n.Fp), validateObject(n, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...nLength(n.n, n.nBitLength),
    ...n,
    p: n.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function validateSigVerOpts(n) {
  n.lowS !== void 0 && abool("lowS", n.lowS), n.prehash !== void 0 && abool("prehash", n.prehash);
}
function validatePointOpts(n) {
  const e = validateBasic(n);
  validateObject(e, {
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
  const { endo: t, Fp: r, a: s } = e;
  if (t) {
    if (!r.eql(s, r.ZERO))
      throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
    if (typeof t != "object" || typeof t.beta != "bigint" || typeof t.splitScalar != "function")
      throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...e });
}
const { bytesToNumberBE: b2n, hexToBytes: h2b } = ut;
class DERErr extends Error {
  constructor(e = "") {
    super(e);
  }
}
const DER = {
  // asn.1 DER encoding utils
  Err: DERErr,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (n, e) => {
      const { Err: t } = DER;
      if (n < 0 || n > 256)
        throw new t("tlv.encode: wrong tag");
      if (e.length & 1)
        throw new t("tlv.encode: unpadded data");
      const r = e.length / 2, s = numberToHexUnpadded(r);
      if (s.length / 2 & 128)
        throw new t("tlv.encode: long form length too big");
      const o = r > 127 ? numberToHexUnpadded(s.length / 2 | 128) : "";
      return numberToHexUnpadded(n) + o + s + e;
    },
    // v - value, l - left bytes (unparsed)
    decode(n, e) {
      const { Err: t } = DER;
      let r = 0;
      if (n < 0 || n > 256)
        throw new t("tlv.encode: wrong tag");
      if (e.length < 2 || e[r++] !== n)
        throw new t("tlv.decode: wrong tlv");
      const s = e[r++], o = !!(s & 128);
      let a = 0;
      if (!o)
        a = s;
      else {
        const l = s & 127;
        if (!l)
          throw new t("tlv.decode(long): indefinite length not supported");
        if (l > 4)
          throw new t("tlv.decode(long): byte length is too big");
        const u = e.subarray(r, r + l);
        if (u.length !== l)
          throw new t("tlv.decode: length bytes not complete");
        if (u[0] === 0)
          throw new t("tlv.decode(long): zero leftmost byte");
        for (const h of u)
          a = a << 8 | h;
        if (r += l, a < 128)
          throw new t("tlv.decode(long): not minimal encoding");
      }
      const c = e.subarray(r, r + a);
      if (c.length !== a)
        throw new t("tlv.decode: wrong value length");
      return { v: c, l: e.subarray(r + a) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(n) {
      const { Err: e } = DER;
      if (n < _0n$1)
        throw new e("integer: negative integers are not allowed");
      let t = numberToHexUnpadded(n);
      if (Number.parseInt(t[0], 16) & 8 && (t = "00" + t), t.length & 1)
        throw new e("unexpected DER parsing assertion: unpadded hex");
      return t;
    },
    decode(n) {
      const { Err: e } = DER;
      if (n[0] & 128)
        throw new e("invalid signature integer: negative");
      if (n[0] === 0 && !(n[1] & 128))
        throw new e("invalid signature integer: unnecessary leading zero");
      return b2n(n);
    }
  },
  toSig(n) {
    const { Err: e, _int: t, _tlv: r } = DER, s = typeof n == "string" ? h2b(n) : n;
    abytes(s);
    const { v: o, l: a } = r.decode(48, s);
    if (a.length)
      throw new e("invalid signature: left bytes after parsing");
    const { v: c, l } = r.decode(2, o), { v: u, l: h } = r.decode(2, l);
    if (h.length)
      throw new e("invalid signature: left bytes after parsing");
    return { r: t.decode(c), s: t.decode(u) };
  },
  hexFromSig(n) {
    const { _tlv: e, _int: t } = DER, r = e.encode(2, t.encode(n.r)), s = e.encode(2, t.encode(n.s)), o = r + s;
    return e.encode(48, o);
  }
}, _0n$1 = BigInt(0), _1n$1 = BigInt(1);
BigInt(2);
const _3n = BigInt(3);
BigInt(4);
function weierstrassPoints(n) {
  const e = validatePointOpts(n), { Fp: t } = e, r = Field(e.n, e.nBitLength), s = e.toBytes || ((g, b, w) => {
    const $ = b.toAffine();
    return concatBytes(Uint8Array.from([4]), t.toBytes($.x), t.toBytes($.y));
  }), o = e.fromBytes || ((g) => {
    const b = g.subarray(1), w = t.fromBytes(b.subarray(0, t.BYTES)), $ = t.fromBytes(b.subarray(t.BYTES, 2 * t.BYTES));
    return { x: w, y: $ };
  });
  function a(g) {
    const { a: b, b: w } = e, $ = t.sqr(g), B = t.mul($, g);
    return t.add(t.add(B, t.mul(g, b)), w);
  }
  if (!t.eql(t.sqr(e.Gy), a(e.Gx)))
    throw new Error("bad generator point: equation left != right");
  function c(g) {
    return inRange(g, _1n$1, e.n);
  }
  function l(g) {
    const { allowedPrivateKeyLengths: b, nByteLength: w, wrapPrivateKey: $, n: B } = e;
    if (b && typeof g != "bigint") {
      if (isBytes(g) && (g = bytesToHex(g)), typeof g != "string" || !b.includes(g.length))
        throw new Error("invalid private key");
      g = g.padStart(w * 2, "0");
    }
    let P;
    try {
      P = typeof g == "bigint" ? g : bytesToNumberBE(ensureBytes("private key", g, w));
    } catch {
      throw new Error("invalid private key, expected hex or " + w + " bytes, got " + typeof g);
    }
    return $ && (P = mod(P, B)), aInRange("private key", P, _1n$1, B), P;
  }
  function u(g) {
    if (!(g instanceof p))
      throw new Error("ProjectivePoint expected");
  }
  const h = memoized((g, b) => {
    const { px: w, py: $, pz: B } = g;
    if (t.eql(B, t.ONE))
      return { x: w, y: $ };
    const P = g.is0();
    b == null && (b = P ? t.ONE : t.inv(B));
    const U = t.mul(w, b), R = t.mul($, b), C = t.mul(B, b);
    if (P)
      return { x: t.ZERO, y: t.ZERO };
    if (!t.eql(C, t.ONE))
      throw new Error("invZ was invalid");
    return { x: U, y: R };
  }), f = memoized((g) => {
    if (g.is0()) {
      if (e.allowInfinityPoint && !t.is0(g.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: b, y: w } = g.toAffine();
    if (!t.isValid(b) || !t.isValid(w))
      throw new Error("bad point: x or y not FE");
    const $ = t.sqr(w), B = a(b);
    if (!t.eql($, B))
      throw new Error("bad point: equation left != right");
    if (!g.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  class p {
    constructor(b, w, $) {
      if (this.px = b, this.py = w, this.pz = $, b == null || !t.isValid(b))
        throw new Error("x required");
      if (w == null || !t.isValid(w))
        throw new Error("y required");
      if ($ == null || !t.isValid($))
        throw new Error("z required");
      Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(b) {
      const { x: w, y: $ } = b || {};
      if (!b || !t.isValid(w) || !t.isValid($))
        throw new Error("invalid affine point");
      if (b instanceof p)
        throw new Error("projective point not allowed");
      const B = (P) => t.eql(P, t.ZERO);
      return B(w) && B($) ? p.ZERO : new p(w, $, t.ONE);
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
    static normalizeZ(b) {
      const w = t.invertBatch(b.map(($) => $.pz));
      return b.map(($, B) => $.toAffine(w[B])).map(p.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(b) {
      const w = p.fromAffine(o(ensureBytes("pointHex", b)));
      return w.assertValidity(), w;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(b) {
      return p.BASE.multiply(l(b));
    }
    // Multiscalar Multiplication
    static msm(b, w) {
      return pippenger(p, r, b, w);
    }
    // "Private method", don't use it directly
    _setWindowSize(b) {
      E.setWindowSize(this, b);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      f(this);
    }
    hasEvenY() {
      const { y: b } = this.toAffine();
      if (t.isOdd)
        return !t.isOdd(b);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(b) {
      u(b);
      const { px: w, py: $, pz: B } = this, { px: P, py: U, pz: R } = b, C = t.eql(t.mul(w, R), t.mul(P, B)), L = t.eql(t.mul($, R), t.mul(U, B));
      return C && L;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new p(this.px, t.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: b, b: w } = e, $ = t.mul(w, _3n), { px: B, py: P, pz: U } = this;
      let R = t.ZERO, C = t.ZERO, L = t.ZERO, M = t.mul(B, B), F = t.mul(P, P), x = t.mul(U, U), _ = t.mul(B, P);
      return _ = t.add(_, _), L = t.mul(B, U), L = t.add(L, L), R = t.mul(b, L), C = t.mul($, x), C = t.add(R, C), R = t.sub(F, C), C = t.add(F, C), C = t.mul(R, C), R = t.mul(_, R), L = t.mul($, L), x = t.mul(b, x), _ = t.sub(M, x), _ = t.mul(b, _), _ = t.add(_, L), L = t.add(M, M), M = t.add(L, M), M = t.add(M, x), M = t.mul(M, _), C = t.add(C, M), x = t.mul(P, U), x = t.add(x, x), M = t.mul(x, _), R = t.sub(R, M), L = t.mul(x, F), L = t.add(L, L), L = t.add(L, L), new p(R, C, L);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(b) {
      u(b);
      const { px: w, py: $, pz: B } = this, { px: P, py: U, pz: R } = b;
      let C = t.ZERO, L = t.ZERO, M = t.ZERO;
      const F = e.a, x = t.mul(e.b, _3n);
      let _ = t.mul(w, P), S = t.mul($, U), T = t.mul(B, R), v = t.add(w, $), k = t.add(P, U);
      v = t.mul(v, k), k = t.add(_, S), v = t.sub(v, k), k = t.add(w, B);
      let A = t.add(P, R);
      return k = t.mul(k, A), A = t.add(_, T), k = t.sub(k, A), A = t.add($, B), C = t.add(U, R), A = t.mul(A, C), C = t.add(S, T), A = t.sub(A, C), M = t.mul(F, k), C = t.mul(x, T), M = t.add(C, M), C = t.sub(S, M), M = t.add(S, M), L = t.mul(C, M), S = t.add(_, _), S = t.add(S, _), T = t.mul(F, T), k = t.mul(x, k), S = t.add(S, T), T = t.sub(_, T), T = t.mul(F, T), k = t.add(k, T), _ = t.mul(S, k), L = t.add(L, _), _ = t.mul(A, k), C = t.mul(v, C), C = t.sub(C, _), _ = t.mul(v, S), M = t.mul(A, M), M = t.add(M, _), new p(C, L, M);
    }
    subtract(b) {
      return this.add(b.negate());
    }
    is0() {
      return this.equals(p.ZERO);
    }
    wNAF(b) {
      return E.wNAFCached(this, b, p.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(b) {
      const { endo: w, n: $ } = e;
      aInRange("scalar", b, _0n$1, $);
      const B = p.ZERO;
      if (b === _0n$1)
        return B;
      if (this.is0() || b === _1n$1)
        return this;
      if (!w || E.hasPrecomputes(this))
        return E.wNAFCachedUnsafe(this, b, p.normalizeZ);
      let { k1neg: P, k1: U, k2neg: R, k2: C } = w.splitScalar(b), L = B, M = B, F = this;
      for (; U > _0n$1 || C > _0n$1; )
        U & _1n$1 && (L = L.add(F)), C & _1n$1 && (M = M.add(F)), F = F.double(), U >>= _1n$1, C >>= _1n$1;
      return P && (L = L.negate()), R && (M = M.negate()), M = new p(t.mul(M.px, w.beta), M.py, M.pz), L.add(M);
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
    multiply(b) {
      const { endo: w, n: $ } = e;
      aInRange("scalar", b, _1n$1, $);
      let B, P;
      if (w) {
        const { k1neg: U, k1: R, k2neg: C, k2: L } = w.splitScalar(b);
        let { p: M, f: F } = this.wNAF(R), { p: x, f: _ } = this.wNAF(L);
        M = E.constTimeNegate(U, M), x = E.constTimeNegate(C, x), x = new p(t.mul(x.px, w.beta), x.py, x.pz), B = M.add(x), P = F.add(_);
      } else {
        const { p: U, f: R } = this.wNAF(b);
        B = U, P = R;
      }
      return p.normalizeZ([B, P])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(b, w, $) {
      const B = p.BASE, P = (R, C) => C === _0n$1 || C === _1n$1 || !R.equals(B) ? R.multiplyUnsafe(C) : R.multiply(C), U = P(this, w).add(P(b, $));
      return U.is0() ? void 0 : U;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(b) {
      return h(this, b);
    }
    isTorsionFree() {
      const { h: b, isTorsionFree: w } = e;
      if (b === _1n$1)
        return !0;
      if (w)
        return w(p, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: b, clearCofactor: w } = e;
      return b === _1n$1 ? this : w ? w(p, this) : this.multiplyUnsafe(e.h);
    }
    toRawBytes(b = !0) {
      return abool("isCompressed", b), this.assertValidity(), s(p, this, b);
    }
    toHex(b = !0) {
      return abool("isCompressed", b), bytesToHex(this.toRawBytes(b));
    }
  }
  p.BASE = new p(e.Gx, e.Gy, t.ONE), p.ZERO = new p(t.ZERO, t.ONE, t.ZERO);
  const m = e.nBitLength, E = wNAF(p, e.endo ? Math.ceil(m / 2) : m);
  return {
    CURVE: e,
    ProjectivePoint: p,
    normPrivateKeyToScalar: l,
    weierstrassEquation: a,
    isWithinCurveOrder: c
  };
}
function validateOpts(n) {
  const e = validateBasic(n);
  return validateObject(e, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...e });
}
function weierstrass(n) {
  const e = validateOpts(n), { Fp: t, n: r } = e, s = t.BYTES + 1, o = 2 * t.BYTES + 1;
  function a(T) {
    return mod(T, r);
  }
  function c(T) {
    return invert(T, r);
  }
  const { ProjectivePoint: l, normPrivateKeyToScalar: u, weierstrassEquation: h, isWithinCurveOrder: f } = weierstrassPoints({
    ...e,
    toBytes(T, v, k) {
      const A = v.toAffine(), N = t.toBytes(A.x), I = concatBytes;
      return abool("isCompressed", k), k ? I(Uint8Array.from([v.hasEvenY() ? 2 : 3]), N) : I(Uint8Array.from([4]), N, t.toBytes(A.y));
    },
    fromBytes(T) {
      const v = T.length, k = T[0], A = T.subarray(1);
      if (v === s && (k === 2 || k === 3)) {
        const N = bytesToNumberBE(A);
        if (!inRange(N, _1n$1, t.ORDER))
          throw new Error("Point is not on curve");
        const I = h(N);
        let D;
        try {
          D = t.sqrt(I);
        } catch (z) {
          const V = z instanceof Error ? ": " + z.message : "";
          throw new Error("Point is not on curve" + V);
        }
        const O = (D & _1n$1) === _1n$1;
        return (k & 1) === 1 !== O && (D = t.neg(D)), { x: N, y: D };
      } else if (v === o && k === 4) {
        const N = t.fromBytes(A.subarray(0, t.BYTES)), I = t.fromBytes(A.subarray(t.BYTES, 2 * t.BYTES));
        return { x: N, y: I };
      } else {
        const N = s, I = o;
        throw new Error("invalid Point, expected length of " + N + ", or uncompressed " + I + ", got " + v);
      }
    }
  }), p = (T) => bytesToHex(numberToBytesBE(T, e.nByteLength));
  function m(T) {
    const v = r >> _1n$1;
    return T > v;
  }
  function E(T) {
    return m(T) ? a(-T) : T;
  }
  const g = (T, v, k) => bytesToNumberBE(T.slice(v, k));
  class b {
    constructor(v, k, A) {
      this.r = v, this.s = k, this.recovery = A, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(v) {
      const k = e.nByteLength;
      return v = ensureBytes("compactSignature", v, k * 2), new b(g(v, 0, k), g(v, k, 2 * k));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(v) {
      const { r: k, s: A } = DER.toSig(ensureBytes("DER", v));
      return new b(k, A);
    }
    assertValidity() {
      aInRange("r", this.r, _1n$1, r), aInRange("s", this.s, _1n$1, r);
    }
    addRecoveryBit(v) {
      return new b(this.r, this.s, v);
    }
    recoverPublicKey(v) {
      const { r: k, s: A, recovery: N } = this, I = R(ensureBytes("msgHash", v));
      if (N == null || ![0, 1, 2, 3].includes(N))
        throw new Error("recovery id invalid");
      const D = N === 2 || N === 3 ? k + e.n : k;
      if (D >= t.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const O = N & 1 ? "03" : "02", H = l.fromHex(O + p(D)), z = c(D), V = a(-I * z), W = a(A * z), j = l.BASE.multiplyAndAddUnsafe(H, V, W);
      if (!j)
        throw new Error("point at infinify");
      return j.assertValidity(), j;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return m(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new b(this.r, a(-this.s), this.recovery) : this;
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
      return p(this.r) + p(this.s);
    }
  }
  const w = {
    isValidPrivateKey(T) {
      try {
        return u(T), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: u,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const T = getMinHashLength(e.n);
      return mapHashToField(e.randomBytes(T), e.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(T = 8, v = l.BASE) {
      return v._setWindowSize(T), v.multiply(BigInt(3)), v;
    }
  };
  function $(T, v = !0) {
    return l.fromPrivateKey(T).toRawBytes(v);
  }
  function B(T) {
    const v = isBytes(T), k = typeof T == "string", A = (v || k) && T.length;
    return v ? A === s || A === o : k ? A === 2 * s || A === 2 * o : T instanceof l;
  }
  function P(T, v, k = !0) {
    if (B(T))
      throw new Error("first arg must be private key");
    if (!B(v))
      throw new Error("second arg must be public key");
    return l.fromHex(v).multiply(u(T)).toRawBytes(k);
  }
  const U = e.bits2int || function(T) {
    if (T.length > 8192)
      throw new Error("input is too large");
    const v = bytesToNumberBE(T), k = T.length * 8 - e.nBitLength;
    return k > 0 ? v >> BigInt(k) : v;
  }, R = e.bits2int_modN || function(T) {
    return a(U(T));
  }, C = bitMask(e.nBitLength);
  function L(T) {
    return aInRange("num < 2^" + e.nBitLength, T, _0n$1, C), numberToBytesBE(T, e.nByteLength);
  }
  function M(T, v, k = F) {
    if (["recovered", "canonical"].some((Z) => Z in k))
      throw new Error("sign() legacy options not supported");
    const { hash: A, randomBytes: N } = e;
    let { lowS: I, prehash: D, extraEntropy: O } = k;
    I == null && (I = !0), T = ensureBytes("msgHash", T), validateSigVerOpts(k), D && (T = ensureBytes("prehashed msgHash", A(T)));
    const H = R(T), z = u(v), V = [L(z), L(H)];
    if (O != null && O !== !1) {
      const Z = O === !0 ? N(t.BYTES) : O;
      V.push(ensureBytes("extraEntropy", Z));
    }
    const W = concatBytes(...V), j = H;
    function G(Z) {
      const Y = U(Z);
      if (!f(Y))
        return;
      const K = c(Y), re = l.BASE.multiply(Y).toAffine(), J = a(re.x);
      if (J === _0n$1)
        return;
      const q = a(K * a(j + J * z));
      if (q === _0n$1)
        return;
      let X = (re.x === J ? 0 : 2) | Number(re.y & _1n$1), te = q;
      return I && m(q) && (te = E(q), X ^= 1), new b(J, te, X);
    }
    return { seed: W, k2sig: G };
  }
  const F = { lowS: e.lowS, prehash: !1 }, x = { lowS: e.lowS, prehash: !1 };
  function _(T, v, k = F) {
    const { seed: A, k2sig: N } = M(T, v, k), I = e;
    return createHmacDrbg(I.hash.outputLen, I.nByteLength, I.hmac)(A, N);
  }
  l.BASE._setWindowSize(8);
  function S(T, v, k, A = x) {
    var X;
    const N = T;
    v = ensureBytes("msgHash", v), k = ensureBytes("publicKey", k);
    const { lowS: I, prehash: D, format: O } = A;
    if (validateSigVerOpts(A), "strict" in A)
      throw new Error("options.strict was renamed to lowS");
    if (O !== void 0 && O !== "compact" && O !== "der")
      throw new Error("format must be compact or der");
    const H = typeof N == "string" || isBytes(N), z = !H && !O && typeof N == "object" && N !== null && typeof N.r == "bigint" && typeof N.s == "bigint";
    if (!H && !z)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let V, W;
    try {
      if (z && (V = new b(N.r, N.s)), H) {
        try {
          O !== "compact" && (V = b.fromDER(N));
        } catch (te) {
          if (!(te instanceof DER.Err))
            throw te;
        }
        !V && O !== "der" && (V = b.fromCompact(N));
      }
      W = l.fromHex(k);
    } catch {
      return !1;
    }
    if (!V || I && V.hasHighS())
      return !1;
    D && (v = e.hash(v));
    const { r: j, s: G } = V, Z = R(v), Y = c(G), K = a(Z * Y), re = a(j * Y), J = (X = l.BASE.multiplyAndAddUnsafe(W, K, re)) == null ? void 0 : X.toAffine();
    return J ? a(J.x) === j : !1;
  }
  return {
    CURVE: e,
    getPublicKey: $,
    getSharedSecret: P,
    sign: _,
    verify: S,
    ProjectivePoint: l,
    Signature: b,
    utils: w
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function getHash(n) {
  return {
    hash: n,
    hmac: (e, ...t) => hmac(n, e, concatBytes$1(...t)),
    randomBytes
  };
}
function createCurve(n, e) {
  const t = (r) => weierstrass({ ...n, ...getHash(r) });
  return { ...t(e), create: t };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const secp256k1P = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), secp256k1N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), _1n = BigInt(1), _2n = BigInt(2), divNearest = (n, e) => (n + e / _2n) / e;
function sqrtMod(n) {
  const e = secp256k1P, t = BigInt(3), r = BigInt(6), s = BigInt(11), o = BigInt(22), a = BigInt(23), c = BigInt(44), l = BigInt(88), u = n * n * n % e, h = u * u * n % e, f = pow2(h, t, e) * h % e, p = pow2(f, t, e) * h % e, m = pow2(p, _2n, e) * u % e, E = pow2(m, s, e) * m % e, g = pow2(E, o, e) * E % e, b = pow2(g, c, e) * g % e, w = pow2(b, l, e) * b % e, $ = pow2(w, c, e) * g % e, B = pow2($, t, e) * h % e, P = pow2(B, a, e) * E % e, U = pow2(P, r, e) * u % e, R = pow2(U, _2n, e);
  if (!Fpk1.eql(Fpk1.sqr(R), n))
    throw new Error("Cannot find square root");
  return R;
}
const Fpk1 = Field(secp256k1P, void 0, void 0, { sqrt: sqrtMod }), secp256k1 = createCurve({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  Fp: Fpk1,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: secp256k1N,
  // Curve order, total count of valid points in the field
  // Base point (x, y) aka generator point
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  // Cofactor
  lowS: !0,
  // Allow only low-S signatures by default in sign() and verify()
  endo: {
    // Endomorphism, see above
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (n) => {
      const e = secp256k1N, t = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -_1n * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), o = t, a = BigInt("0x100000000000000000000000000000000"), c = divNearest(o * n, e), l = divNearest(-r * n, e);
      let u = mod(n - c * t - l * s, e), h = mod(-c * r - l * o, e);
      const f = u > a, p = h > a;
      if (f && (u = e - u), p && (h = e - h), u > a || h > a)
        throw new Error("splitScalar: Endomorphism failed, k=" + n);
      return { k1neg: f, k1: u, k2neg: p, k2: h };
    }
  }
}, sha256), _0n = BigInt(0), TAGGED_HASH_PREFIXES = {};
function taggedHash(n, ...e) {
  let t = TAGGED_HASH_PREFIXES[n];
  if (t === void 0) {
    const r = sha256(Uint8Array.from(n, (s) => s.charCodeAt(0)));
    t = concatBytes(r, r), TAGGED_HASH_PREFIXES[n] = t;
  }
  return sha256(concatBytes(t, ...e));
}
const pointToBytes = (n) => n.toRawBytes(!0).slice(1), numTo32b = (n) => numberToBytesBE(n, 32), modP = (n) => mod(n, secp256k1P), modN = (n) => mod(n, secp256k1N), Point = secp256k1.ProjectivePoint, GmulAdd = (n, e, t) => Point.BASE.multiplyAndAddUnsafe(n, e, t);
function schnorrGetExtPubKey(n) {
  let e = secp256k1.utils.normPrivateKeyToScalar(n), t = Point.fromPrivateKey(e);
  return { scalar: t.hasEvenY() ? e : modN(-e), bytes: pointToBytes(t) };
}
function lift_x(n) {
  aInRange("x", n, _1n, secp256k1P);
  const e = modP(n * n), t = modP(e * n + BigInt(7));
  let r = sqrtMod(t);
  r % _2n !== _0n && (r = modP(-r));
  const s = new Point(n, r, _1n);
  return s.assertValidity(), s;
}
const num = bytesToNumberBE;
function challenge(...n) {
  return modN(num(taggedHash("BIP0340/challenge", ...n)));
}
function schnorrGetPublicKey(n) {
  return schnorrGetExtPubKey(n).bytes;
}
function schnorrSign(n, e, t = randomBytes(32)) {
  const r = ensureBytes("message", n), { bytes: s, scalar: o } = schnorrGetExtPubKey(e), a = ensureBytes("auxRand", t, 32), c = numTo32b(o ^ num(taggedHash("BIP0340/aux", a))), l = taggedHash("BIP0340/nonce", c, s, r), u = modN(num(l));
  if (u === _0n)
    throw new Error("sign failed: k is zero");
  const { bytes: h, scalar: f } = schnorrGetExtPubKey(u), p = challenge(h, s, r), m = new Uint8Array(64);
  if (m.set(h, 0), m.set(numTo32b(modN(f + p * o)), 32), !schnorrVerify(m, r, s))
    throw new Error("sign: Invalid signature produced");
  return m;
}
function schnorrVerify(n, e, t) {
  const r = ensureBytes("signature", n, 64), s = ensureBytes("message", e), o = ensureBytes("publicKey", t, 32);
  try {
    const a = lift_x(num(o)), c = num(r.subarray(0, 32));
    if (!inRange(c, _1n, secp256k1P))
      return !1;
    const l = num(r.subarray(32, 64));
    if (!inRange(l, _1n, secp256k1N))
      return !1;
    const u = challenge(numTo32b(c), pointToBytes(a), s), h = GmulAdd(a, l, modN(-u));
    return !(!h || !h.hasEvenY() || h.toAffine().x !== c);
  } catch {
    return !1;
  }
}
const schnorr = {
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
};
var dist = {}, LRUCache$1 = {}, LRUCacheNode$1 = {};
Object.defineProperty(LRUCacheNode$1, "__esModule", { value: !0 });
LRUCacheNode$1.LRUCacheNode = void 0;
class LRUCacheNode {
  constructor(e, t, r) {
    const { entryExpirationTimeInMS: s = null, next: o = null, prev: a = null, onEntryEvicted: c, onEntryMarkedAsMostRecentlyUsed: l, clone: u, cloneFn: h } = r ?? {};
    if (typeof s == "number" && (s <= 0 || Number.isNaN(s)))
      throw new Error("entryExpirationTimeInMS must either be null (no expiry) or greater than 0");
    this.clone = u ?? !1, this.cloneFn = h ?? this.defaultClone, this.key = e, this.internalValue = this.clone ? this.cloneFn(t) : t, this.created = Date.now(), this.entryExpirationTimeInMS = s, this.next = o, this.prev = a, this.onEntryEvicted = c, this.onEntryMarkedAsMostRecentlyUsed = l;
  }
  get value() {
    return this.clone ? this.cloneFn(this.internalValue) : this.internalValue;
  }
  get isExpired() {
    return typeof this.entryExpirationTimeInMS == "number" && Date.now() - this.created > this.entryExpirationTimeInMS;
  }
  invokeOnEvicted() {
    if (this.onEntryEvicted) {
      const { key: e, value: t, isExpired: r } = this;
      this.onEntryEvicted({ key: e, value: t, isExpired: r });
    }
  }
  invokeOnEntryMarkedAsMostRecentlyUsed() {
    if (this.onEntryMarkedAsMostRecentlyUsed) {
      const { key: e, value: t } = this;
      this.onEntryMarkedAsMostRecentlyUsed({ key: e, value: t });
    }
  }
  defaultClone(e) {
    return typeof e == "boolean" || typeof e == "string" || typeof e == "number" ? e : JSON.parse(JSON.stringify(e));
  }
}
LRUCacheNode$1.LRUCacheNode = LRUCacheNode;
Object.defineProperty(LRUCache$1, "__esModule", { value: !0 });
LRUCache$1.LRUCache = void 0;
const LRUCacheNode_1 = LRUCacheNode$1;
class LRUCache {
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
  constructor(e) {
    this.lookupTable = /* @__PURE__ */ new Map(), this.head = null, this.tail = null;
    const { maxSize: t = 25, entryExpirationTimeInMS: r = null, onEntryEvicted: s, onEntryMarkedAsMostRecentlyUsed: o, cloneFn: a, clone: c } = e ?? {};
    if (Number.isNaN(t) || t <= 0)
      throw new Error("maxSize must be greater than 0.");
    if (typeof r == "number" && (r <= 0 || Number.isNaN(r)))
      throw new Error("entryExpirationTimeInMS must either be null (no expiry) or greater than 0");
    this.maxSizeInternal = t, this.entryExpirationTimeInMS = r, this.onEntryEvicted = s, this.onEntryMarkedAsMostRecentlyUsed = o, this.clone = c, this.cloneFn = a;
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
    return this.cleanCache(), this.lookupTable.size;
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
    return this.head ? this.head.isExpired ? (this.removeNodeFromListAndLookupTable(this.head), this.newest) : this.mapNodeToEntry(this.head) : null;
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
    return this.tail ? this.tail.isExpired ? (this.removeNodeFromListAndLookupTable(this.tail), this.oldest) : this.mapNodeToEntry(this.tail) : null;
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
  set maxSize(e) {
    if (Number.isNaN(e) || e <= 0)
      throw new Error("maxSize must be greater than 0.");
    this.maxSizeInternal = e, this.enforceSizeLimit();
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
  set(e, t, r) {
    const s = this.lookupTable.get(e);
    s && this.removeNodeFromListAndLookupTable(s);
    const o = new LRUCacheNode_1.LRUCacheNode(e, t, {
      entryExpirationTimeInMS: this.entryExpirationTimeInMS,
      onEntryEvicted: this.onEntryEvicted,
      onEntryMarkedAsMostRecentlyUsed: this.onEntryMarkedAsMostRecentlyUsed,
      clone: this.clone,
      cloneFn: this.cloneFn,
      ...r
    });
    return this.setNodeAsHead(o), this.lookupTable.set(e, o), this.enforceSizeLimit(), this;
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
  get(e) {
    const t = this.lookupTable.get(e);
    return t ? t.isExpired ? (this.removeNodeFromListAndLookupTable(t), null) : (this.setNodeAsHead(t), t.value) : null;
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
  peek(e) {
    const t = this.lookupTable.get(e);
    return t ? t.isExpired ? (this.removeNodeFromListAndLookupTable(t), null) : t.value : null;
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
  delete(e) {
    const t = this.lookupTable.get(e);
    return t ? this.removeNodeFromListAndLookupTable(t) : !1;
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
  has(e) {
    const t = this.lookupTable.get(e);
    return t ? t.isExpired ? (this.removeNodeFromListAndLookupTable(t), !1) : !0 : !1;
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
    this.head = null, this.tail = null, this.lookupTable.clear();
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
  find(e) {
    let t = this.head;
    for (; t; ) {
      if (t.isExpired) {
        const s = t.next;
        this.removeNodeFromListAndLookupTable(t), t = s;
        continue;
      }
      const r = this.mapNodeToEntry(t);
      if (e(r))
        return this.setNodeAsHead(t), r;
      t = t.next;
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
  forEach(e) {
    let t = this.head, r = 0;
    for (; t; ) {
      if (t.isExpired) {
        const s = t.next;
        this.removeNodeFromListAndLookupTable(t), t = s;
        continue;
      }
      e(t.value, t.key, r), t = t.next, r++;
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
    let e = this.head;
    for (; e; ) {
      if (e.isExpired) {
        const t = e.next;
        this.removeNodeFromListAndLookupTable(e), e = t;
        continue;
      }
      yield e.value, e = e.next;
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
    let e = this.head;
    for (; e; ) {
      if (e.isExpired) {
        const t = e.next;
        this.removeNodeFromListAndLookupTable(e), e = t;
        continue;
      }
      yield e.key, e = e.next;
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
    let e = this.head;
    for (; e; ) {
      if (e.isExpired) {
        const t = e.next;
        this.removeNodeFromListAndLookupTable(e), e = t;
        continue;
      }
      yield this.mapNodeToEntry(e), e = e.next;
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
    let e = this.head;
    for (; e; ) {
      if (e.isExpired) {
        const t = e.next;
        this.removeNodeFromListAndLookupTable(e), e = t;
        continue;
      }
      yield this.mapNodeToEntry(e), e = e.next;
    }
  }
  enforceSizeLimit() {
    let e = this.tail;
    for (; e !== null && this.size > this.maxSizeInternal; ) {
      const t = e.prev;
      this.removeNodeFromListAndLookupTable(e), e = t;
    }
  }
  mapNodeToEntry({ key: e, value: t }) {
    return {
      key: e,
      value: t
    };
  }
  setNodeAsHead(e) {
    this.removeNodeFromList(e), this.head ? (e.next = this.head, this.head.prev = e, this.head = e) : (this.head = e, this.tail = e), e.invokeOnEntryMarkedAsMostRecentlyUsed();
  }
  removeNodeFromList(e) {
    e.prev !== null && (e.prev.next = e.next), e.next !== null && (e.next.prev = e.prev), this.head === e && (this.head = e.next), this.tail === e && (this.tail = e.prev), e.next = null, e.prev = null;
  }
  removeNodeFromListAndLookupTable(e) {
    return e.invokeOnEvicted(), this.removeNodeFromList(e), this.lookupTable.delete(e.key);
  }
  cleanCache() {
    if (!this.entryExpirationTimeInMS)
      return;
    const e = [];
    for (const t of this.lookupTable.values())
      t.isExpired && e.push(t);
    e.forEach((t) => this.removeNodeFromListAndLookupTable(t));
  }
}
LRUCache$1.LRUCache = LRUCache;
(function(n) {
  var e = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(r, s, o, a) {
    a === void 0 && (a = o);
    var c = Object.getOwnPropertyDescriptor(s, o);
    (!c || ("get" in c ? !s.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
      return s[o];
    } }), Object.defineProperty(r, a, c);
  } : function(r, s, o, a) {
    a === void 0 && (a = o), r[a] = s[o];
  }), t = commonjsGlobal && commonjsGlobal.__exportStar || function(r, s) {
    for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(s, o) && e(s, r, o);
  };
  Object.defineProperty(n, "__esModule", { value: !0 }), t(LRUCache$1, n);
})(dist);
var lib = {};
(function(n) {
  /*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  Object.defineProperty(n, "__esModule", { value: !0 }), n.bytes = n.stringToBytes = n.str = n.bytesToString = n.hex = n.utf8 = n.bech32m = n.bech32 = n.base58check = n.base58xmr = n.base58xrp = n.base58flickr = n.base58 = n.base64url = n.base64 = n.base32crockford = n.base32hex = n.base32 = n.base16 = n.utils = n.assertNumber = void 0;
  function e(x) {
    if (!Number.isSafeInteger(x))
      throw new Error(`Wrong integer: ${x}`);
  }
  n.assertNumber = e;
  function t(...x) {
    const _ = (v, k) => (A) => v(k(A)), S = Array.from(x).reverse().reduce((v, k) => v ? _(v, k.encode) : k.encode, void 0), T = x.reduce((v, k) => v ? _(v, k.decode) : k.decode, void 0);
    return { encode: S, decode: T };
  }
  function r(x) {
    return {
      encode: (_) => {
        if (!Array.isArray(_) || _.length && typeof _[0] != "number")
          throw new Error("alphabet.encode input should be an array of numbers");
        return _.map((S) => {
          if (e(S), S < 0 || S >= x.length)
            throw new Error(`Digit index outside alphabet: ${S} (alphabet: ${x.length})`);
          return x[S];
        });
      },
      decode: (_) => {
        if (!Array.isArray(_) || _.length && typeof _[0] != "string")
          throw new Error("alphabet.decode input should be array of strings");
        return _.map((S) => {
          if (typeof S != "string")
            throw new Error(`alphabet.decode: not string element=${S}`);
          const T = x.indexOf(S);
          if (T === -1)
            throw new Error(`Unknown letter: "${S}". Allowed: ${x}`);
          return T;
        });
      }
    };
  }
  function s(x = "") {
    if (typeof x != "string")
      throw new Error("join separator should be string");
    return {
      encode: (_) => {
        if (!Array.isArray(_) || _.length && typeof _[0] != "string")
          throw new Error("join.encode input should be array of strings");
        for (let S of _)
          if (typeof S != "string")
            throw new Error(`join.encode: non-string input=${S}`);
        return _.join(x);
      },
      decode: (_) => {
        if (typeof _ != "string")
          throw new Error("join.decode input should be string");
        return _.split(x);
      }
    };
  }
  function o(x, _ = "=") {
    if (e(x), typeof _ != "string")
      throw new Error("padding chr should be string");
    return {
      encode(S) {
        if (!Array.isArray(S) || S.length && typeof S[0] != "string")
          throw new Error("padding.encode input should be array of strings");
        for (let T of S)
          if (typeof T != "string")
            throw new Error(`padding.encode: non-string input=${T}`);
        for (; S.length * x % 8; )
          S.push(_);
        return S;
      },
      decode(S) {
        if (!Array.isArray(S) || S.length && typeof S[0] != "string")
          throw new Error("padding.encode input should be array of strings");
        for (let v of S)
          if (typeof v != "string")
            throw new Error(`padding.decode: non-string input=${v}`);
        let T = S.length;
        if (T * x % 8)
          throw new Error("Invalid padding: string should have whole number of bytes");
        for (; T > 0 && S[T - 1] === _; T--)
          if (!((T - 1) * x % 8))
            throw new Error("Invalid padding: string has too much padding");
        return S.slice(0, T);
      }
    };
  }
  function a(x) {
    if (typeof x != "function")
      throw new Error("normalize fn should be function");
    return { encode: (_) => _, decode: (_) => x(_) };
  }
  function c(x, _, S) {
    if (_ < 2)
      throw new Error(`convertRadix: wrong from=${_}, base cannot be less than 2`);
    if (S < 2)
      throw new Error(`convertRadix: wrong to=${S}, base cannot be less than 2`);
    if (!Array.isArray(x))
      throw new Error("convertRadix: data should be array");
    if (!x.length)
      return [];
    let T = 0;
    const v = [], k = Array.from(x);
    for (k.forEach((A) => {
      if (e(A), A < 0 || A >= _)
        throw new Error(`Wrong integer: ${A}`);
    }); ; ) {
      let A = 0, N = !0;
      for (let I = T; I < k.length; I++) {
        const D = k[I], O = _ * A + D;
        if (!Number.isSafeInteger(O) || _ * A / _ !== A || O - D !== _ * A)
          throw new Error("convertRadix: carry overflow");
        if (A = O % S, k[I] = Math.floor(O / S), !Number.isSafeInteger(k[I]) || k[I] * S + A !== O)
          throw new Error("convertRadix: carry overflow");
        if (N)
          k[I] ? N = !1 : T = I;
        else continue;
      }
      if (v.push(A), N)
        break;
    }
    for (let A = 0; A < x.length - 1 && x[A] === 0; A++)
      v.push(0);
    return v.reverse();
  }
  const l = (x, _) => _ ? l(_, x % _) : x, u = (x, _) => x + (_ - l(x, _));
  function h(x, _, S, T) {
    if (!Array.isArray(x))
      throw new Error("convertRadix2: data should be array");
    if (_ <= 0 || _ > 32)
      throw new Error(`convertRadix2: wrong from=${_}`);
    if (S <= 0 || S > 32)
      throw new Error(`convertRadix2: wrong to=${S}`);
    if (u(_, S) > 32)
      throw new Error(`convertRadix2: carry overflow from=${_} to=${S} carryBits=${u(_, S)}`);
    let v = 0, k = 0;
    const A = 2 ** S - 1, N = [];
    for (const I of x) {
      if (e(I), I >= 2 ** _)
        throw new Error(`convertRadix2: invalid data word=${I} from=${_}`);
      if (v = v << _ | I, k + _ > 32)
        throw new Error(`convertRadix2: carry overflow pos=${k} from=${_}`);
      for (k += _; k >= S; k -= S)
        N.push((v >> k - S & A) >>> 0);
      v &= 2 ** k - 1;
    }
    if (v = v << S - k & A, !T && k >= _)
      throw new Error("Excess padding");
    if (!T && v)
      throw new Error(`Non-zero padding: ${v}`);
    return T && k > 0 && N.push(v >>> 0), N;
  }
  function f(x) {
    return e(x), {
      encode: (_) => {
        if (!(_ instanceof Uint8Array))
          throw new Error("radix.encode input should be Uint8Array");
        return c(Array.from(_), 2 ** 8, x);
      },
      decode: (_) => {
        if (!Array.isArray(_) || _.length && typeof _[0] != "number")
          throw new Error("radix.decode input should be array of strings");
        return Uint8Array.from(c(_, x, 2 ** 8));
      }
    };
  }
  function p(x, _ = !1) {
    if (e(x), x <= 0 || x > 32)
      throw new Error("radix2: bits should be in (0..32]");
    if (u(8, x) > 32 || u(x, 8) > 32)
      throw new Error("radix2: carry overflow");
    return {
      encode: (S) => {
        if (!(S instanceof Uint8Array))
          throw new Error("radix2.encode input should be Uint8Array");
        return h(Array.from(S), 8, x, !_);
      },
      decode: (S) => {
        if (!Array.isArray(S) || S.length && typeof S[0] != "number")
          throw new Error("radix2.decode input should be array of strings");
        return Uint8Array.from(h(S, x, 8, _));
      }
    };
  }
  function m(x) {
    if (typeof x != "function")
      throw new Error("unsafeWrapper fn should be function");
    return function(..._) {
      try {
        return x.apply(null, _);
      } catch {
      }
    };
  }
  function E(x, _) {
    if (e(x), typeof _ != "function")
      throw new Error("checksum fn should be function");
    return {
      encode(S) {
        if (!(S instanceof Uint8Array))
          throw new Error("checksum.encode: input should be Uint8Array");
        const T = _(S).slice(0, x), v = new Uint8Array(S.length + x);
        return v.set(S), v.set(T, S.length), v;
      },
      decode(S) {
        if (!(S instanceof Uint8Array))
          throw new Error("checksum.decode: input should be Uint8Array");
        const T = S.slice(0, -x), v = _(T).slice(0, x), k = S.slice(-x);
        for (let A = 0; A < x; A++)
          if (v[A] !== k[A])
            throw new Error("Invalid checksum");
        return T;
      }
    };
  }
  n.utils = { alphabet: r, chain: t, checksum: E, radix: f, radix2: p, join: s, padding: o }, n.base16 = t(p(4), r("0123456789ABCDEF"), s("")), n.base32 = t(p(5), r("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), o(5), s("")), n.base32hex = t(p(5), r("0123456789ABCDEFGHIJKLMNOPQRSTUV"), o(5), s("")), n.base32crockford = t(p(5), r("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), s(""), a((x) => x.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1"))), n.base64 = t(p(6), r("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), o(6), s("")), n.base64url = t(p(6), r("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), o(6), s(""));
  const g = (x) => t(f(58), r(x), s(""));
  n.base58 = g("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"), n.base58flickr = g("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"), n.base58xrp = g("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
  const b = [0, 2, 3, 5, 6, 7, 9, 10, 11];
  n.base58xmr = {
    encode(x) {
      let _ = "";
      for (let S = 0; S < x.length; S += 8) {
        const T = x.subarray(S, S + 8);
        _ += n.base58.encode(T).padStart(b[T.length], "1");
      }
      return _;
    },
    decode(x) {
      let _ = [];
      for (let S = 0; S < x.length; S += 11) {
        const T = x.slice(S, S + 11), v = b.indexOf(T.length), k = n.base58.decode(T);
        for (let A = 0; A < k.length - v; A++)
          if (k[A] !== 0)
            throw new Error("base58xmr: wrong padding");
        _ = _.concat(Array.from(k.slice(k.length - v)));
      }
      return Uint8Array.from(_);
    }
  };
  const w = (x) => t(E(4, (_) => x(x(_))), n.base58);
  n.base58check = w;
  const $ = t(r("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), s("")), B = [996825010, 642813549, 513874426, 1027748829, 705979059];
  function P(x) {
    const _ = x >> 25;
    let S = (x & 33554431) << 5;
    for (let T = 0; T < B.length; T++)
      (_ >> T & 1) === 1 && (S ^= B[T]);
    return S;
  }
  function U(x, _, S = 1) {
    const T = x.length;
    let v = 1;
    for (let k = 0; k < T; k++) {
      const A = x.charCodeAt(k);
      if (A < 33 || A > 126)
        throw new Error(`Invalid prefix (${x})`);
      v = P(v) ^ A >> 5;
    }
    v = P(v);
    for (let k = 0; k < T; k++)
      v = P(v) ^ x.charCodeAt(k) & 31;
    for (let k of _)
      v = P(v) ^ k;
    for (let k = 0; k < 6; k++)
      v = P(v);
    return v ^= S, $.encode(h([v % 2 ** 30], 30, 5, !1));
  }
  function R(x) {
    const _ = x === "bech32" ? 1 : 734539939, S = p(5), T = S.decode, v = S.encode, k = m(T);
    function A(O, H, z = 90) {
      if (typeof O != "string")
        throw new Error(`bech32.encode prefix should be string, not ${typeof O}`);
      if (!Array.isArray(H) || H.length && typeof H[0] != "number")
        throw new Error(`bech32.encode words should be array of numbers, not ${typeof H}`);
      const V = O.length + 7 + H.length;
      if (z !== !1 && V > z)
        throw new TypeError(`Length ${V} exceeds limit ${z}`);
      return O = O.toLowerCase(), `${O}1${$.encode(H)}${U(O, H, _)}`;
    }
    function N(O, H = 90) {
      if (typeof O != "string")
        throw new Error(`bech32.decode input should be string, not ${typeof O}`);
      if (O.length < 8 || H !== !1 && O.length > H)
        throw new TypeError(`Wrong string length: ${O.length} (${O}). Expected (8..${H})`);
      const z = O.toLowerCase();
      if (O !== z && O !== O.toUpperCase())
        throw new Error("String must be lowercase or uppercase");
      O = z;
      const V = O.lastIndexOf("1");
      if (V === 0 || V === -1)
        throw new Error('Letter "1" must be present between prefix and data only');
      const W = O.slice(0, V), j = O.slice(V + 1);
      if (j.length < 6)
        throw new Error("Data must be at least 6 characters long");
      const G = $.decode(j).slice(0, -6), Z = U(W, G, _);
      if (!j.endsWith(Z))
        throw new Error(`Invalid checksum in ${O}: expected "${Z}"`);
      return { prefix: W, words: G };
    }
    const I = m(N);
    function D(O) {
      const { prefix: H, words: z } = N(O, !1);
      return { prefix: H, words: z, bytes: T(z) };
    }
    return { encode: A, decode: N, decodeToBytes: D, decodeUnsafe: I, fromWords: T, fromWordsUnsafe: k, toWords: v };
  }
  n.bech32 = R("bech32"), n.bech32m = R("bech32m"), n.utf8 = {
    encode: (x) => new TextDecoder().decode(x),
    decode: (x) => new TextEncoder().encode(x)
  }, n.hex = t(p(4), r("0123456789abcdef"), s(""), a((x) => {
    if (typeof x != "string" || x.length % 2)
      throw new TypeError(`hex.decode: expected string, got ${typeof x} with length ${x.length}`);
    return x.toLowerCase();
  }));
  const C = {
    utf8: n.utf8,
    hex: n.hex,
    base16: n.base16,
    base32: n.base32,
    base64: n.base64,
    base64url: n.base64url,
    base58: n.base58,
    base58xmr: n.base58xmr
  }, L = `Invalid encoding type. Available types: ${Object.keys(C).join(", ")}`, M = (x, _) => {
    if (typeof x != "string" || !C.hasOwnProperty(x))
      throw new TypeError(L);
    if (!(_ instanceof Uint8Array))
      throw new TypeError("bytesToString() expects Uint8Array");
    return C[x].encode(_);
  };
  n.bytesToString = M, n.str = n.bytesToString;
  const F = (x, _) => {
    if (!C.hasOwnProperty(x))
      throw new TypeError(L);
    if (typeof _ != "string")
      throw new TypeError("stringToBytes() expects string");
    return C[x].decode(_);
  };
  n.stringToBytes = F, n.bytes = n.stringToBytes;
})(lib);
const { bech32, hex, utf8 } = lib;
BigInt(1e3), BigInt(1e6), BigInt(1e9), BigInt(1e12);
BigInt("2100000000000000000");
BigInt(1e11);
const TAGCODES = {
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
for (let n = 0, e = Object.keys(TAGCODES); n < e.length; n++)
  e[n], TAGCODES[e[n]].toString();
var NDKKind = /* @__PURE__ */ ((n) => (n[n.Metadata = 0] = "Metadata", n[n.Text = 1] = "Text", n[n.RecommendRelay = 2] = "RecommendRelay", n[n.Contacts = 3] = "Contacts", n[n.EncryptedDirectMessage = 4] = "EncryptedDirectMessage", n[n.EventDeletion = 5] = "EventDeletion", n[n.Repost = 6] = "Repost", n[n.Reaction = 7] = "Reaction", n[n.BadgeAward = 8] = "BadgeAward", n[n.GroupChat = 9] = "GroupChat", n[n.GroupNote = 11] = "GroupNote", n[n.GroupReply = 12] = "GroupReply", n[n.GiftWrapSeal = 13] = "GiftWrapSeal", n[n.PrivateDirectMessage = 14] = "PrivateDirectMessage", n[n.Image = 20] = "Image", n[n.Video = 21] = "Video", n[n.ShortVideo = 22] = "ShortVideo", n[n.Story = 23] = "Story", n[n.Vanish = 62] = "Vanish", n[n.CashuWalletBackup = 375] = "CashuWalletBackup", n[n.GiftWrap = 1059] = "GiftWrap", n[n.GenericRepost = 16] = "GenericRepost", n[n.ChannelCreation = 40] = "ChannelCreation", n[n.ChannelMetadata = 41] = "ChannelMetadata", n[n.ChannelMessage = 42] = "ChannelMessage", n[n.ChannelHideMessage = 43] = "ChannelHideMessage", n[n.ChannelMuteUser = 44] = "ChannelMuteUser", n[n.GenericReply = 1111] = "GenericReply", n[n.Media = 1063] = "Media", n[n.Report = 1984] = "Report", n[n.Label = 1985] = "Label", n[n.DVMReqTextExtraction = 5e3] = "DVMReqTextExtraction", n[n.DVMReqTextSummarization = 5001] = "DVMReqTextSummarization", n[n.DVMReqTextTranslation = 5002] = "DVMReqTextTranslation", n[n.DVMReqTextGeneration = 5050] = "DVMReqTextGeneration", n[n.DVMReqImageGeneration = 5100] = "DVMReqImageGeneration", n[n.DVMReqTextToSpeech = 5250] = "DVMReqTextToSpeech", n[n.DVMReqDiscoveryNostrContent = 5300] = "DVMReqDiscoveryNostrContent", n[n.DVMReqDiscoveryNostrPeople = 5301] = "DVMReqDiscoveryNostrPeople", n[n.DVMReqTimestamping = 5900] = "DVMReqTimestamping", n[n.DVMEventSchedule = 5905] = "DVMEventSchedule", n[n.DVMJobFeedback = 7e3] = "DVMJobFeedback", n[n.Subscribe = 7001] = "Subscribe", n[n.Unsubscribe = 7002] = "Unsubscribe", n[n.SubscriptionReceipt = 7003] = "SubscriptionReceipt", n[n.CashuReserve = 7373] = "CashuReserve", n[n.CashuQuote = 7374] = "CashuQuote", n[n.CashuToken = 7375] = "CashuToken", n[n.CashuWalletTx = 7376] = "CashuWalletTx", n[n.GroupAdminAddUser = 9e3] = "GroupAdminAddUser", n[n.GroupAdminRemoveUser = 9001] = "GroupAdminRemoveUser", n[n.GroupAdminEditMetadata = 9002] = "GroupAdminEditMetadata", n[n.GroupAdminEditStatus = 9006] = "GroupAdminEditStatus", n[n.GroupAdminCreateGroup = 9007] = "GroupAdminCreateGroup", n[n.GroupAdminRequestJoin = 9021] = "GroupAdminRequestJoin", n[n.MuteList = 1e4] = "MuteList", n[n.PinList = 10001] = "PinList", n[n.RelayList = 10002] = "RelayList", n[n.BookmarkList = 10003] = "BookmarkList", n[n.CommunityList = 10004] = "CommunityList", n[n.PublicChatList = 10005] = "PublicChatList", n[n.BlockRelayList = 10006] = "BlockRelayList", n[n.SearchRelayList = 10007] = "SearchRelayList", n[n.SimpleGroupList = 10009] = "SimpleGroupList", n[n.InterestList = 10015] = "InterestList", n[n.CashuMintList = 10019] = "CashuMintList", n[n.EmojiList = 10030] = "EmojiList", n[n.DirectMessageReceiveRelayList = 10050] = "DirectMessageReceiveRelayList", n[n.BlossomList = 10063] = "BlossomList", n[n.NostrWaletConnectInfo = 13194] = "NostrWaletConnectInfo", n[n.TierList = 17e3] = "TierList", n[n.CashuWallet = 17375] = "CashuWallet", n[n.FollowSet = 3e4] = "FollowSet", n[
  n.CategorizedPeopleList = 3e4
  /* FollowSet */
] = "CategorizedPeopleList", n[n.CategorizedBookmarkList = 30001] = "CategorizedBookmarkList", n[n.RelaySet = 30002] = "RelaySet", n[
  n.CategorizedRelayList = 30002
  /* RelaySet */
] = "CategorizedRelayList", n[n.BookmarkSet = 30003] = "BookmarkSet", n[n.CurationSet = 30004] = "CurationSet", n[n.ArticleCurationSet = 30004] = "ArticleCurationSet", n[n.VideoCurationSet = 30005] = "VideoCurationSet", n[n.ImageCurationSet = 30006] = "ImageCurationSet", n[n.InterestSet = 30015] = "InterestSet", n[
  n.InterestsList = 30015
  /* InterestSet */
] = "InterestsList", n[n.EmojiSet = 30030] = "EmojiSet", n[n.ModularArticle = 30040] = "ModularArticle", n[n.ModularArticleItem = 30041] = "ModularArticleItem", n[n.Wiki = 30818] = "Wiki", n[n.Draft = 31234] = "Draft", n[n.SubscriptionTier = 37001] = "SubscriptionTier", n[n.EcashMintRecommendation = 38e3] = "EcashMintRecommendation", n[n.HighlightSet = 39802] = "HighlightSet", n[
  n.CategorizedHighlightList = 39802
  /* HighlightSet */
] = "CategorizedHighlightList", n[n.Nutzap = 9321] = "Nutzap", n[n.ZapRequest = 9734] = "ZapRequest", n[n.Zap = 9735] = "Zap", n[n.Highlight = 9802] = "Highlight", n[n.ClientAuth = 22242] = "ClientAuth", n[n.NostrWalletConnectReq = 23194] = "NostrWalletConnectReq", n[n.NostrWalletConnectRes = 23195] = "NostrWalletConnectRes", n[n.NostrConnect = 24133] = "NostrConnect", n[n.BlossomUpload = 24242] = "BlossomUpload", n[n.HttpAuth = 27235] = "HttpAuth", n[n.ProfileBadge = 30008] = "ProfileBadge", n[n.BadgeDefinition = 30009] = "BadgeDefinition", n[n.MarketStall = 30017] = "MarketStall", n[n.MarketProduct = 30018] = "MarketProduct", n[n.Article = 30023] = "Article", n[n.AppSpecificData = 30078] = "AppSpecificData", n[n.Classified = 30402] = "Classified", n[n.HorizontalVideo = 34235] = "HorizontalVideo", n[n.VerticalVideo = 34236] = "VerticalVideo", n[n.LegacyCashuWallet = 37375] = "LegacyCashuWallet", n[n.GroupMetadata = 39e3] = "GroupMetadata", n[n.GroupAdmins = 39001] = "GroupAdmins", n[n.GroupMembers = 39002] = "GroupMembers", n[n.AppRecommendation = 31989] = "AppRecommendation", n[n.AppHandler = 31990] = "AppHandler", n))(NDKKind || {});
function getRelaysForSync(n, e, t = "write") {
  if (!n.outboxTracker) return;
  const r = n.outboxTracker.data.get(e);
  if (r)
    return t === "write" ? r.writeRelays : r.readRelays;
}
async function getWriteRelaysFor(n, e, t = "write") {
  if (n.outboxTracker)
    return n.outboxTracker.data.has(e) || await n.outboxTracker.trackUsers([e]), getRelaysForSync(n, e, t);
}
function getTopRelaysForAuthors(n, e) {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((s) => {
    const o = getRelaysForSync(n, s);
    o && o.forEach((a) => {
      const c = t.get(a) || 0;
      t.set(a, c + 1);
    });
  }), Array.from(t.entries()).sort((s, o) => o[1] - s[1]).map((s) => s[0]);
}
function getAllRelaysForAllPubkeys(n, e, t = "read") {
  const r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set();
  return e.forEach((o) => {
    const a = getRelaysForSync(n, o, t);
    a && a.size > 0 ? (a.forEach((c) => {
      (r.get(c) || /* @__PURE__ */ new Set()).add(o);
    }), r.set(o, a)) : s.add(o);
  }), { pubkeysToRelays: r, authorsMissingRelays: s };
}
function chooseRelayCombinationForPubkeys(n, e, t, { count: r, preferredRelays: s } = {}) {
  r ?? (r = 2), s ?? (s = /* @__PURE__ */ new Set());
  const o = n.pool, a = o.connectedRelays();
  a.forEach((p) => {
    s == null || s.add(p.url);
  });
  const c = /* @__PURE__ */ new Map(), { pubkeysToRelays: l, authorsMissingRelays: u } = getAllRelaysForAllPubkeys(n, e, t), h = getTopRelaysForAuthors(n, e), f = (p, m) => {
    const E = c.get(m) || [];
    E.push(p), c.set(m, E);
  };
  for (const [p, m] of l.entries()) {
    let E = r;
    for (const g of a)
      m.has(g.url) && (f(p, g.url), E--);
    for (const g of m)
      c.has(g) && (f(p, g), E--);
    if (!(E <= 0))
      for (const g of h) {
        if (E <= 0) break;
        m.has(g) && (f(p, g), E--);
      }
  }
  for (const p of u)
    o.permanentAndConnectedRelays().forEach((m) => {
      const E = c.get(m.url) || [];
      E.push(p), c.set(m.url, E);
    });
  return c;
}
function getRelaysForFilterWithAuthors(n, e, t = 2) {
  return chooseRelayCombinationForPubkeys(n, e, "write", { count: t });
}
function tryNormalizeRelayUrl(n) {
  try {
    return normalizeRelayUrl(n);
  } catch {
    return;
  }
}
function normalizeRelayUrl(n) {
  let e = normalizeUrl(n, {
    stripAuthentication: !1,
    stripWWW: !1,
    stripHash: !0
  });
  return e.endsWith("/") || (e += "/"), e;
}
function normalize(n) {
  const e = /* @__PURE__ */ new Set();
  for (const t of n)
    try {
      e.add(normalizeRelayUrl(t));
    } catch {
    }
  return Array.from(e);
}
var DATA_URL_DEFAULT_MIME_TYPE = "text/plain", DATA_URL_DEFAULT_CHARSET = "us-ascii", testParameter = (n, e) => e.some((t) => t instanceof RegExp ? t.test(n) : t === n), supportedProtocols = /* @__PURE__ */ new Set(["https:", "http:", "file:"]), hasCustomProtocol = (n) => {
  try {
    const { protocol: e } = new URL(n);
    return e.endsWith(":") && !e.includes(".") && !supportedProtocols.has(e);
  } catch {
    return !1;
  }
}, normalizeDataURL = (n, { stripHash: e }) => {
  var f, p, m, E;
  const t = /^data:(?<type>[^,]*?),(?<data>[^#]*?)(?:#(?<hash>.*))?$/.exec(n);
  if (!t)
    throw new Error(`Invalid URL: ${n}`);
  const r = ((f = t.groups) == null ? void 0 : f.type) ?? "", s = ((p = t.groups) == null ? void 0 : p.data) ?? "";
  let o = ((m = t.groups) == null ? void 0 : m.hash) ?? "";
  const a = r.split(";");
  o = e ? "" : o;
  let c = !1;
  a[a.length - 1] === "base64" && (a.pop(), c = !0);
  const l = ((E = a.shift()) == null ? void 0 : E.toLowerCase()) ?? "", h = [...a.map((g) => {
    let [b, w = ""] = g.split("=").map(($) => $.trim());
    return b === "charset" && (w = w.toLowerCase(), w === DATA_URL_DEFAULT_CHARSET) ? "" : `${b}${w ? `=${w}` : ""}`;
  }).filter(Boolean)];
  return c && h.push("base64"), (h.length > 0 || l && l !== DATA_URL_DEFAULT_MIME_TYPE) && h.unshift(l), `data:${h.join(";")},${c ? s.trim() : s}${o ? `#${o}` : ""}`;
};
function normalizeUrl(n, e = {}) {
  if (e = {
    defaultProtocol: "http",
    normalizeProtocol: !0,
    forceHttp: !1,
    forceHttps: !1,
    stripAuthentication: !0,
    stripHash: !1,
    stripTextFragment: !0,
    stripWWW: !0,
    removeQueryParameters: [/^utm_\w+/i],
    removeTrailingSlash: !0,
    removeSingleSlash: !0,
    removeDirectoryIndex: !1,
    removeExplicitPort: !1,
    sortQueryParameters: !0,
    ...e
  }, typeof e.defaultProtocol == "string" && !e.defaultProtocol.endsWith(":") && (e.defaultProtocol = `${e.defaultProtocol}:`), n = n.trim(), /^data:/i.test(n))
    return normalizeDataURL(n, e);
  if (hasCustomProtocol(n))
    return n;
  const t = n.startsWith("//");
  !t && /^\.*\//.test(n) || (n = n.replace(/^(?!(?:\w+:)?\/\/)|^\/\//, e.defaultProtocol));
  const s = new URL(n);
  if (s.hostname = s.hostname.toLowerCase(), e.forceHttp && e.forceHttps)
    throw new Error("The `forceHttp` and `forceHttps` options cannot be used together");
  if (e.forceHttp && s.protocol === "https:" && (s.protocol = "http:"), e.forceHttps && s.protocol === "http:" && (s.protocol = "https:"), e.stripAuthentication && (s.username = "", s.password = ""), e.stripHash ? s.hash = "" : e.stripTextFragment && (s.hash = s.hash.replace(/#?:~:text.*?$/i, "")), s.pathname) {
    const a = /\b[a-z][a-z\d+\-.]{1,50}:\/\//g;
    let c = 0, l = "";
    for (; ; ) {
      const h = a.exec(s.pathname);
      if (!h)
        break;
      const f = h[0], p = h.index, m = s.pathname.slice(c, p);
      l += m.replace(/\/{2,}/g, "/"), l += f, c = p + f.length;
    }
    const u = s.pathname.slice(c, s.pathname.length);
    l += u.replace(/\/{2,}/g, "/"), s.pathname = l;
  }
  if (s.pathname)
    try {
      s.pathname = decodeURI(s.pathname);
    } catch {
    }
  if (e.removeDirectoryIndex === !0 && (e.removeDirectoryIndex = [/^index\.[a-z]+$/]), Array.isArray(e.removeDirectoryIndex) && e.removeDirectoryIndex.length > 0) {
    let a = s.pathname.split("/");
    const c = a[a.length - 1];
    testParameter(c, e.removeDirectoryIndex) && (a = a.slice(0, -1), s.pathname = `${a.slice(1).join("/")}/`);
  }
  if (s.hostname && (s.hostname = s.hostname.replace(/\.$/, ""), e.stripWWW && /^www\.(?!www\.)[a-z\-\d]{1,63}\.[a-z.\-\d]{2,63}$/.test(s.hostname) && (s.hostname = s.hostname.replace(/^www\./, ""))), Array.isArray(e.removeQueryParameters))
    for (const a of [...s.searchParams.keys()])
      testParameter(a, e.removeQueryParameters) && s.searchParams.delete(a);
  if (!Array.isArray(e.keepQueryParameters) && e.removeQueryParameters === !0 && (s.search = ""), Array.isArray(e.keepQueryParameters) && e.keepQueryParameters.length > 0)
    for (const a of [...s.searchParams.keys()])
      testParameter(a, e.keepQueryParameters) || s.searchParams.delete(a);
  if (e.sortQueryParameters) {
    s.searchParams.sort();
    try {
      s.search = decodeURIComponent(s.search);
    } catch {
    }
  }
  e.removeTrailingSlash && (s.pathname = s.pathname.replace(/\/$/, "")), e.removeExplicitPort && s.port && (s.port = "");
  const o = n;
  return n = s.toString(), !e.removeSingleSlash && s.pathname === "/" && !o.endsWith("/") && s.hash === "" && (n = n.replace(/\/$/, "")), (e.removeTrailingSlash || s.pathname === "/") && s.hash === "" && e.removeSingleSlash && (n = n.replace(/\/$/, "")), t && !e.normalizeProtocol && (n = n.replace(/^http:\/\//, "//")), e.stripProtocol && (n = n.replace(/^(?:https?:)?\/\//, "")), n;
}
var MAX_RECONNECT_ATTEMPTS = 5, FLAPPING_THRESHOLD_MS = 1e3, NDKRelayConnectivity = class {
  constructor(n, e) {
    y(this, "ndkRelay");
    y(this, "ws");
    y(this, "_status");
    y(this, "timeoutMs");
    y(this, "connectedAt");
    y(this, "_connectionStats", {
      attempts: 0,
      success: 0,
      durations: []
    });
    y(this, "debug");
    y(this, "netDebug");
    y(this, "connectTimeout");
    y(this, "reconnectTimeout");
    y(this, "ndk");
    y(this, "openSubs", /* @__PURE__ */ new Map());
    y(this, "openCountRequests", /* @__PURE__ */ new Map());
    y(this, "openEventPublishes", /* @__PURE__ */ new Map());
    y(this, "serial", 0);
    y(this, "baseEoseTimeout", 4400);
    /**
     * Utility functions to update the connection stats.
     */
    y(this, "updateConnectionStats", {
      connected: () => {
        this._connectionStats.success++, this._connectionStats.connectedAt = Date.now();
      },
      disconnected: () => {
        this._connectionStats.connectedAt && (this._connectionStats.durations.push(Date.now() - this._connectionStats.connectedAt), this._connectionStats.durations.length > 100 && this._connectionStats.durations.shift()), this._connectionStats.connectedAt = void 0;
      },
      attempt: () => {
        this._connectionStats.attempts++, this._connectionStats.connectedAt = Date.now();
      }
    });
    this.ndkRelay = n, this._status = 1;
    const t = Math.floor(Math.random() * 1e3);
    this.debug = this.ndkRelay.debug.extend(`connectivity${t}`), this.ndk = e;
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
  async connect(n, e = !0) {
    if (this._status !== 2 && this._status !== 1 || this.reconnectTimeout) {
      this.debug(
        "Relay requested to be connected but was in state %s or it had a reconnect timeout",
        this._status
      );
      return;
    }
    this.reconnectTimeout && (clearTimeout(this.reconnectTimeout), this.reconnectTimeout = void 0), this.connectTimeout && (clearTimeout(this.connectTimeout), this.connectTimeout = void 0), n ?? (n = this.timeoutMs), !this.timeoutMs && n && (this.timeoutMs = n), this.timeoutMs && (this.connectTimeout = setTimeout(() => this.onConnectionError(e), this.timeoutMs));
    try {
      this.updateConnectionStats.attempt(), this._status === 1 ? this._status = 4 : this._status = 2, this.ws = new WebSocket(this.ndkRelay.url), this.ws.onopen = this.onConnect.bind(this), this.ws.onclose = this.onDisconnect.bind(this), this.ws.onmessage = this.onMessage.bind(this), this.ws.onerror = this.onError.bind(this);
    } catch (t) {
      throw this.debug(`Failed to connect to ${this.ndkRelay.url}`, t), this._status = 1, e ? this.handleReconnection() : this.ndkRelay.emit("delayed-connect", 2 * 24 * 60 * 60 * 1e3), t;
    }
  }
  /**
   * Disconnects the WebSocket connection to the NDK relay.
   * This method sets the connection status to `NDKRelayStatus.DISCONNECTING`,
   * attempts to close the WebSocket connection, and sets the status to
   * `NDKRelayStatus.DISCONNECTED` if the disconnect operation fails.
   */
  disconnect() {
    var n;
    this._status = 0;
    try {
      (n = this.ws) == null || n.close();
    } catch (e) {
      this.debug("Failed to disconnect", e), this._status = 1;
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
  onConnectionError(n) {
    this.debug(`Error connecting to ${this.ndkRelay.url}`, this.timeoutMs), n && !this.reconnectTimeout && this.handleReconnection();
  }
  /**
   * Handles the connection event when the WebSocket connection is established.
   * This method is called when the WebSocket connection is successfully opened.
   * It clears any existing connection and reconnection timeouts, updates the connection statistics,
   * sets the connection status to `CONNECTED`, and emits `connect` and `ready` events on the `ndkRelay` object.
   */
  onConnect() {
    var n;
    (n = this.netDebug) == null || n.call(this, "connected", this.ndkRelay), this.reconnectTimeout && (clearTimeout(this.reconnectTimeout), this.reconnectTimeout = void 0), this.connectTimeout && (clearTimeout(this.connectTimeout), this.connectTimeout = void 0), this.updateConnectionStats.connected(), this._status = 5, this.ndkRelay.emit("connect"), this.ndkRelay.emit("ready");
  }
  /**
   * Handles the disconnection event when the WebSocket connection is closed.
   * This method is called when the WebSocket connection is successfully closed.
   * It updates the connection statistics, sets the connection status to `DISCONNECTED`,
   * initiates a reconnection attempt if we didn't disconnect ourselves,
   * and emits a `disconnect` event on the `ndkRelay` object.
   */
  onDisconnect() {
    var n;
    (n = this.netDebug) == null || n.call(this, "disconnected", this.ndkRelay), this.updateConnectionStats.disconnected(), this._status === 5 && this.handleReconnection(), this._status = 1, this.ndkRelay.emit("disconnect");
  }
  /**
   * Handles incoming messages from the NDK relay WebSocket connection.
   * This method is called whenever a message is received from the relay.
   * It parses the message data and dispatches the appropriate handling logic based on the message type.
   *
   * @param event - The MessageEvent containing the received message data.
   */
  onMessage(n) {
    var e;
    (e = this.netDebug) == null || e.call(this, n.data, this.ndkRelay, "recv");
    try {
      const t = JSON.parse(n.data), [r, s, ...o] = t;
      switch (r) {
        case "EVENT": {
          const a = this.openSubs.get(s), c = t[2];
          if (!a) {
            this.debug(`Received event for unknown subscription ${s}`);
            return;
          }
          a.onevent(c);
          return;
        }
        case "COUNT": {
          const a = t[2], c = this.openCountRequests.get(s);
          c && (c.resolve(a.count), this.openCountRequests.delete(s));
          return;
        }
        case "EOSE": {
          const a = this.openSubs.get(s);
          if (!a) return;
          a.oneose(s);
          return;
        }
        case "OK": {
          const a = t[2], c = t[3], l = this.openEventPublishes.get(s), u = l == null ? void 0 : l.pop();
          if (!l || !u) {
            this.debug("Received OK for unknown event publish", s);
            return;
          }
          a ? u.resolve(c) : u.reject(new Error(c)), l.length === 0 ? this.openEventPublishes.delete(s) : this.openEventPublishes.set(s, l);
          return;
        }
        case "CLOSED": {
          const a = this.openSubs.get(s);
          if (!a) return;
          a.onclosed(t[2]);
          return;
        }
        case "NOTICE":
          this.onNotice(t[1]);
          return;
        case "AUTH": {
          this.onAuthRequested(t[1]);
          return;
        }
      }
    } catch (t) {
      this.debug(`Error parsing message from ${this.ndkRelay.url}: ${t.message}`, t == null ? void 0 : t.stack);
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
  async onAuthRequested(n) {
    var t, r, s;
    const e = this.ndkRelay.authPolicy ?? ((t = this.ndk) == null ? void 0 : t.relayAuthDefaultPolicy);
    if (this.debug("Relay requested authentication", {
      havePolicy: !!e
    }), this._status === 7) {
      this.debug("Already authenticating, ignoring");
      return;
    }
    if (this._status = 6, e) {
      if (this._status >= 5) {
        this._status = 7;
        let o;
        try {
          o = await e(this.ndkRelay, n);
        } catch (a) {
          this.debug("Authentication policy threw an error", a), o = !1;
        }
        if (this.debug("Authentication policy returned", !!o), o instanceof NDKEvent || o === !0) {
          o instanceof NDKEvent && await this.auth(o);
          const a = async () => {
            if (this._status >= 5 && this._status < 8) {
              const c = new NDKEvent(this.ndk);
              c.kind = 22242, c.tags = [
                ["relay", this.ndkRelay.url],
                ["challenge", n]
              ], await c.sign(), this.auth(c).then(() => {
                this._status = 8, this.ndkRelay.emit("authed"), this.debug("Authentication successful");
              }).catch((l) => {
                this._status = 6, this.ndkRelay.emit("auth:failed", l), this.debug("Authentication failed", l);
              });
            } else
              this.debug("Authentication failed, it changed status, status is %d", this._status);
          };
          o === !0 && ((r = this.ndk) != null && r.signer ? a().catch((c) => {
            console.error("Error authenticating", c);
          }) : (this.debug("No signer available for authentication localhost"), (s = this.ndk) == null || s.once("signer:ready", a))), this._status = 5, this.ndkRelay.emit("authed");
        }
      }
    } else
      this.ndkRelay.emit("auth", n);
  }
  /**
   * Handles errors that occur on the WebSocket connection to the relay.
   * @param error - The error or event that occurred.
   */
  onError(n) {
    this.debug(`WebSocket error on ${this.ndkRelay.url}:`, n);
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
    const n = this._connectionStats.durations;
    if (n.length % 3 !== 0) return !1;
    const t = n.reduce((a, c) => a + c, 0) / n.length, r = n.map((a) => (a - t) ** 2).reduce((a, c) => a + c, 0) / n.length;
    return Math.sqrt(r) < FLAPPING_THRESHOLD_MS;
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
  async onNotice(n) {
    this.ndkRelay.emit("notice", n);
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
  handleReconnection(n = 0) {
    if (this.reconnectTimeout) return;
    if (this.isFlapping()) {
      this.ndkRelay.emit("flapping", this._connectionStats), this._status = 3;
      return;
    }
    const e = this.connectedAt ? Math.max(0, 6e4 - (Date.now() - this.connectedAt)) : 5e3 * (this._connectionStats.attempts + 1);
    this.reconnectTimeout = setTimeout(() => {
      this.reconnectTimeout = void 0, this._status = 2, this.connect().catch((t) => {
        n < MAX_RECONNECT_ATTEMPTS ? setTimeout(
          () => {
            this.handleReconnection(n + 1);
          },
          1e3 * (n + 1) ^ 4
        ) : this.debug("Reconnect failed");
      });
    }, e), this.ndkRelay.emit("delayed-connect", e), this.debug("Reconnecting in", e), this._connectionStats.nextReconnectAt = Date.now() + e;
  }
  /**
   * Sends a message to the NDK relay if the connection is in the CONNECTED state and the WebSocket is open.
   * If the connection is not in the CONNECTED state or the WebSocket is not open, logs a debug message and throws an error.
   *
   * @param message - The message to send to the NDK relay.
   * @throws {Error} If attempting to send on a closed relay connection.
   */
  async send(n) {
    var e, t, r;
    this._status >= 5 && ((e = this.ws) == null ? void 0 : e.readyState) === WebSocket.OPEN ? ((t = this.ws) == null || t.send(n), (r = this.netDebug) == null || r.call(this, n, this.ndkRelay, "send")) : this.debug(`Not connected to ${this.ndkRelay.url} (%d), not sending message ${n}`, this._status);
  }
  /**
   * Authenticates the NDK event by sending it to the NDK relay and returning a promise that resolves with the result.
   *
   * @param event - The NDK event to authenticate.
   * @returns A promise that resolves with the authentication result.
   */
  async auth(n) {
    const e = new Promise((t, r) => {
      const s = this.openEventPublishes.get(n.id) ?? [];
      s.push({ resolve: t, reject: r }), this.openEventPublishes.set(n.id, s);
    });
    return this.send(`["AUTH",${JSON.stringify(n.rawEvent())}]`), e;
  }
  /**
   * Publishes an NDK event to the relay and returns a promise that resolves with the result.
   *
   * @param event - The NDK event to publish.
   * @returns A promise that resolves with the result of the event publication.
   * @throws {Error} If attempting to publish on a closed relay connection.
   */
  async publish(n) {
    const e = new Promise((t, r) => {
      const s = this.openEventPublishes.get(n.id) ?? [];
      s.length > 0 && console.warn(`Duplicate event publishing detected, you are publishing event ${n.id} twice`), s.push({ resolve: t, reject: r }), this.openEventPublishes.set(n.id, s);
    });
    return this.send(`["EVENT",${JSON.stringify(n)}]`), e;
  }
  /**
   * Counts the number of events that match the provided filters.
   *
   * @param filters - The filters to apply to the count request.
   * @param params - An optional object containing a custom id for the count request.
   * @returns A promise that resolves with the number of matching events.
   * @throws {Error} If attempting to send the count request on a closed relay connection.
   */
  async count(n, e) {
    this.serial++;
    const t = (e == null ? void 0 : e.id) || `count:${this.serial}`, r = new Promise((s, o) => {
      this.openCountRequests.set(t, { resolve: s, reject: o });
    });
    return this.send(`["COUNT","${t}",${JSON.stringify(n).substring(1)}`), r;
  }
  close(n, e) {
    this.send(`["CLOSE","${n}"]`);
    const t = this.openSubs.get(n);
    this.openSubs.delete(n), t && t.onclose(e);
  }
  /**
   * Subscribes to the NDK relay with the provided filters and parameters.
   *
   * @param filters - The filters to apply to the subscription.
   * @param params - The subscription parameters, including an optional custom id.
   * @returns A new NDKRelaySubscription instance.
   */
  req(n) {
    `${this.send(`["REQ","${n.subId}",${JSON.stringify(n.executeFilters).substring(1)}`)}`, this.openSubs.set(n.subId, n);
  }
  /** Returns the connection stats. */
  get connectionStats() {
    return this._connectionStats;
  }
  /** Returns the relay URL */
  get url() {
    return this.ndkRelay.url;
  }
  get connected() {
    var n;
    return this._status >= 5 && ((n = this.ws) == null ? void 0 : n.readyState) === WebSocket.OPEN;
  }
}, NDKRelayPublisher = class {
  constructor(n) {
    y(this, "ndkRelay");
    y(this, "debug");
    this.ndkRelay = n, this.debug = n.debug.extend("publisher");
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
  async publish(n, e = 2500) {
    let t;
    const r = () => new Promise((h, f) => {
      try {
        this.publishEvent(n).then((p) => {
          this.ndkRelay.emit("published", n), n.emit("relay:published", this.ndkRelay), h(!0);
        }).catch(f);
      } catch (p) {
        f(p);
      }
    }), s = new Promise((h, f) => {
      t = setTimeout(() => {
        t = void 0, f(new Error(`Timeout: ${e}ms`));
      }, e);
    }), o = () => {
      r().then((h) => a(h)).catch((h) => c(h));
    };
    let a, c;
    const l = (h) => {
      throw this.ndkRelay.debug("Publish failed", h, n.id), this.ndkRelay.emit("publish:failed", n, h), n.emit("relay:publish:failed", this.ndkRelay, h), h;
    }, u = () => {
      t && clearTimeout(t), this.ndkRelay.removeListener("connect", o);
    };
    return this.ndkRelay.status >= 5 ? Promise.race([r(), s]).catch(l).finally(u) : (this.ndkRelay.status <= 1 ? (console.warn("Relay is disconnected, trying to connect to publish an event", this.ndkRelay.url), this.ndkRelay.connect()) : console.warn("Relay not connected, waiting for connection to publish an event", this.ndkRelay.url), Promise.race([
      new Promise((h, f) => {
        a = h, c = f, this.ndkRelay.once("connect", o);
      }),
      s
    ]).catch(l).finally(u));
  }
  async publishEvent(n) {
    return this.ndkRelay.connectivity.publish(n.rawEvent());
  }
};
function filterFingerprint(n, e) {
  const t = [];
  for (const s of n) {
    const o = Object.entries(s || {}).map(([a, c]) => ["since", "until"].includes(a) ? `${a}:${c}` : a).sort().join("-");
    t.push(o);
  }
  let r = e ? "+" : "";
  return r += t.join("|"), r;
}
function mergeFilters(n) {
  const e = [], t = {};
  return n.filter((r) => !!r.limit).forEach((r) => e.push(r)), n = n.filter((r) => !r.limit), n.length === 0 ? e : (n.forEach((r) => {
    Object.entries(r).forEach(([s, o]) => {
      Array.isArray(o) ? t[s] === void 0 ? t[s] = [...o] : t[s] = Array.from(/* @__PURE__ */ new Set([...t[s], ...o])) : t[s] = o;
    });
  }), [...e, t]);
}
var NDKRelaySubscription = class {
  /**
   *
   * @param fingerprint The fingerprint of this subscription.
   */
  constructor(n, e, t) {
    y(this, "fingerprint");
    y(this, "items", /* @__PURE__ */ new Map());
    y(this, "topSubManager");
    y(this, "debug");
    /**
     * Tracks the status of this REQ.
     */
    y(this, "status", 0);
    y(this, "onClose");
    y(this, "relay");
    /**
     * Whether this subscription has reached EOSE.
     */
    y(this, "eosed", !1);
    /**
     * Timeout at which this subscription will
     * start executing.
     */
    y(this, "executionTimer");
    /**
     * Track the time at which this subscription will fire.
     */
    y(this, "fireTime");
    /**
     * The delay type that the current fireTime was calculated with.
     */
    y(this, "delayType");
    /**
     * The filters that have been executed.
     */
    y(this, "executeFilters");
    y(this, "id", Math.random().toString(36).substring(7));
    y(this, "_subId");
    y(this, "subIdParts", /* @__PURE__ */ new Set());
    y(this, "executeOnRelayReady", () => {
      if (this.status === 2) {
        if (this.items.size === 0) {
          this.debug("No items to execute; this relay was probably too slow to respond and the caller gave up", {
            status: this.status,
            fingerprint: this.fingerprint,
            items: this.items,
            itemsSize: this.items.size,
            id: this.id,
            subId: this.subId
          }), this.cleanup();
          return;
        }
        this.debug("Executing on relay ready", {
          status: this.status,
          fingerprint: this.fingerprint,
          items: this.items,
          itemsSize: this.items.size
        }), this.status = 1, this.execute();
      }
    });
    // we do it this way so that we can remove the listener
    y(this, "reExecuteAfterAuth", (() => {
      const n = this.subId;
      this.debug("Re-executing after auth", this.items.size), this.eosed ? this.relay.close(this.subId) : this.debug("We are abandoning an opened subscription, once it EOSE's, the handler will close it", {
        oldSubId: n
      }), this._subId = void 0, this.status = 1, this.execute(), this.debug("Re-executed after auth %s 👉 %s", n, this.subId);
    }).bind(this));
    this.relay = n, this.topSubManager = t, this.debug = n.debug.extend(`sub[${this.id}]`), this.fingerprint = e || Math.random().toString(36).substring(7);
  }
  get subId() {
    return this._subId ? this._subId : (this._subId = this.fingerprint.slice(0, 15), this._subId);
  }
  addSubIdPart(n) {
    this.subIdParts.add(n);
  }
  addItem(n, e) {
    if (this.debug("Adding item", {
      filters: e,
      internalId: n.internalId,
      status: this.status,
      fingerprint: this.fingerprint,
      id: this.subId,
      items: this.items,
      itemsSize: this.items.size
    }), !this.items.has(n.internalId))
      switch (n.on("close", this.removeItem.bind(this, n)), this.items.set(n.internalId, { subscription: n, filters: e }), this.status !== 3 && n.subId && (!this._subId || this._subId.length < 48) && (this.status === 0 || this.status === 1) && this.addSubIdPart(n.subId), this.status) {
        case 0:
          this.evaluateExecutionPlan(n);
          break;
        case 3:
          break;
        case 1:
          this.evaluateExecutionPlan(n);
          break;
        case 4:
          throw this.debug("Subscription is closed, cannot add new items %o (%o)", n, e), new Error("Cannot add new items to a closed subscription");
      }
  }
  /**
   * A subscription has been closed, remove it from the list of items.
   * @param subscription
   */
  removeItem(n) {
    if (this.items.delete(n.internalId), this.items.size === 0) {
      if (!this.eosed) return;
      this.close(), this.cleanup();
    }
  }
  close() {
    if (this.status === 4) return;
    const n = this.status;
    if (this.status = 4, n === 3)
      try {
        this.relay.close(this.subId);
      } catch (e) {
        this.debug("Error closing subscription", e, this);
      }
    else
      this.debug("Subscription wanted to close but it wasn't running, this is probably ok", {
        subId: this.subId,
        prevStatus: n,
        sub: this
      });
    this.cleanup();
  }
  cleanup() {
    this.executionTimer && clearTimeout(this.executionTimer), this.relay.off("ready", this.executeOnRelayReady), this.relay.off("authed", this.reExecuteAfterAuth), this.onClose && this.onClose(this);
  }
  evaluateExecutionPlan(n) {
    if (!n.isGroupable()) {
      this.status = 1, this.execute();
      return;
    }
    if (n.filters.find((r) => !!r.limit) && (this.executeFilters = this.compileFilters(), this.executeFilters.length >= 10)) {
      this.status = 1, this.execute();
      return;
    }
    const e = n.groupableDelay, t = n.groupableDelayType;
    if (!e) throw new Error("Cannot group a subscription without a delay");
    if (this.status === 0)
      this.schedule(e, t);
    else {
      const r = this.delayType, s = this.fireTime - Date.now();
      if (r === "at-least" && t === "at-least")
        s < e && (this.executionTimer && clearTimeout(this.executionTimer), this.schedule(e, t));
      else if (r === "at-least" && t === "at-most")
        s > e && (this.executionTimer && clearTimeout(this.executionTimer), this.schedule(e, t));
      else if (r === "at-most" && t === "at-most")
        s > e && (this.executionTimer && clearTimeout(this.executionTimer), this.schedule(e, t));
      else if (r === "at-most" && t === "at-least")
        s > e && (this.executionTimer && clearTimeout(this.executionTimer), this.schedule(e, t));
      else
        throw new Error(`Unknown delay type combination ${r} ${t}`);
    }
  }
  schedule(n, e) {
    this.status = 1;
    const t = Date.now();
    this.fireTime = t + n, this.delayType = e;
    const r = setTimeout(this.execute.bind(this), n);
    e === "at-least" && (this.executionTimer = r);
  }
  finalizeSubId() {
    this.subIdParts.size > 0 ? this._subId = Array.from(this.subIdParts).join("-") : this._subId = this.fingerprint.slice(0, 15), this._subId += `-${Math.random().toString(36).substring(2, 7)}`;
  }
  execute() {
    if (this.status === 1) {
      if (!this.relay.connected) {
        this.status = 2, this.debug("Waiting for relay to be ready", {
          status: this.status,
          id: this.subId,
          fingerprint: this.fingerprint,
          items: this.items,
          itemsSize: this.items.size
        }), this.relay.once("ready", this.executeOnRelayReady);
        return;
      }
      this.relay.status < 8 && this.relay.once("authed", this.reExecuteAfterAuth), this.status = 3, this.finalizeSubId(), this.executeFilters = this.compileFilters(), this.relay.req(this);
    }
  }
  onstart() {
  }
  onevent(n) {
    this.topSubManager.dispatchEvent(n, this.relay);
  }
  oneose(n) {
    if (this.eosed = !0, n !== this.subId) {
      this.debug("Received EOSE for an abandoned subscription", n, this.subId), this.relay.close(n);
      return;
    }
    this.items.size === 0 && this.close();
    for (const { subscription: e } of this.items.values())
      e.eoseReceived(this.relay), e.closeOnEose && (this.debug("Removing item because of EOSE", {
        filters: e.filters,
        internalId: e.internalId,
        status: this.status,
        fingerprint: this.fingerprint,
        items: this.items,
        itemsSize: this.items.size
      }), this.removeItem(e));
  }
  onclose(n) {
    this.status = 4;
  }
  onclosed(n) {
    if (n)
      for (const { subscription: e } of this.items.values())
        e.closedReceived(this.relay, n);
  }
  /**
   * Grabs the filters from all the subscriptions
   * and merges them into a single filter.
   */
  compileFilters() {
    const n = [], e = Array.from(this.items.values()).map((r) => r.filters);
    if (!e[0])
      return this.debug("👀 No filters to merge", this.items), console.error("BUG: No filters to merge!", this.items), [];
    const t = e[0].length;
    for (let r = 0; r < t; r++) {
      const s = e.map((o) => o[r]);
      n.push(...mergeFilters(s));
    }
    return n;
  }
}, NDKRelaySubscriptionManager = class {
  /**
   * @param relay - The relay instance.
   * @param generalSubManager - The subscription manager instance.
   */
  constructor(n, e) {
    y(this, "relay");
    y(this, "subscriptions");
    y(this, "generalSubManager");
    this.relay = n, this.subscriptions = /* @__PURE__ */ new Map(), this.generalSubManager = e;
  }
  /**
   * Adds a subscription to the manager.
   */
  addSubscription(n, e) {
    let t;
    if (!n.isGroupable())
      t = this.createSubscription(n, e);
    else {
      const r = filterFingerprint(e, n.closeOnEose);
      r && (t = (this.subscriptions.get(r) || []).find(
        (o) => o.status < 3
        /* RUNNING */
      )), t ?? (t = this.createSubscription(n, e, r));
    }
    t.addItem(n, e);
  }
  createSubscription(n, e, t) {
    const r = new NDKRelaySubscription(this.relay, t || null, this.generalSubManager);
    r.onClose = this.onRelaySubscriptionClose.bind(this);
    const s = this.subscriptions.get(r.fingerprint) ?? [];
    return this.subscriptions.set(r.fingerprint, [...s, r]), r;
  }
  onRelaySubscriptionClose(n) {
    let e = this.subscriptions.get(n.fingerprint) ?? [];
    e ? e.length === 1 ? this.subscriptions.delete(n.fingerprint) : (e = e.filter((t) => t.id !== n.id), this.subscriptions.set(n.fingerprint, e)) : console.warn("Unexpectedly did not find a subscription with fingerprint", n.fingerprint);
  }
}, be, NDKRelay = (be = class extends lib$1.EventEmitter {
  constructor(t, r, s) {
    super();
    y(this, "url");
    y(this, "scores");
    y(this, "connectivity");
    y(this, "subs");
    y(this, "publisher");
    y(this, "authPolicy");
    /**
     * The lowest validation ratio this relay can reach.
     */
    y(this, "lowestValidationRatio");
    /**
     * Current validation ratio this relay is targeting.
     */
    y(this, "targetValidationRatio");
    y(this, "validationRatioFn");
    /**
     * This tracks events that have been seen by this relay
     * with a valid signature.
     */
    y(this, "validatedEventCount", 0);
    /**
     * This tracks events that have been seen by this relay
     * but have not been validated.
     */
    y(this, "nonValidatedEventCount", 0);
    /**
     * Whether this relay is trusted.
     *
     * Trusted relay's events do not get their signature verified.
     */
    y(this, "trusted", !1);
    y(this, "complaining", !1);
    y(this, "debug");
    y(this, "req");
    y(this, "close");
    this.url = normalizeRelayUrl(t), this.scores = /* @__PURE__ */ new Map(), this.debug = createDebug5(`ndk:relay:${t}`), this.connectivity = new NDKRelayConnectivity(this, s), this.connectivity.netDebug = s == null ? void 0 : s.netDebug, this.req = this.connectivity.req.bind(this.connectivity), this.close = this.connectivity.close.bind(this.connectivity), this.subs = new NDKRelaySubscriptionManager(this, s.subManager), this.publisher = new NDKRelayPublisher(this), this.authPolicy = r, this.targetValidationRatio = s == null ? void 0 : s.initialValidationRatio, this.lowestValidationRatio = s == null ? void 0 : s.lowestValidationRatio, this.validationRatioFn = ((s == null ? void 0 : s.validationRatioFn) ?? be.defaultValidationRatioUpdateFn).bind(this), this.updateValidationRatio(), s || console.trace("relay created without ndk");
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
  async connect(t, r = !0) {
    return this.connectivity.connect(t, r);
  }
  /**
   * Disconnects from the relay.
   */
  disconnect() {
    this.status !== 1 && this.connectivity.disconnect();
  }
  /**
   * Queues or executes the subscription of a specific set of filters
   * within this relay.
   *
   * @param subscription NDKSubscription this filters belong to.
   * @param filters Filters to execute
   */
  subscribe(t, r) {
    this.subs.addSubscription(t, r);
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
  async publish(t, r = 2500) {
    return this.publisher.publish(t, r);
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
    return this.nonValidatedEventCount === 0 ? 1 : this.validatedEventCount / (this.validatedEventCount + this.nonValidatedEventCount);
  }
  shouldValidateEvent() {
    return this.trusted ? !1 : this.targetValidationRatio === void 0 ? !0 : this.validationRatio < this.targetValidationRatio;
  }
  get connected() {
    return this.connectivity.connected;
  }
}, y(be, "defaultValidationRatioUpdateFn", (t, r, s) => {
  if (t.lowestValidationRatio === void 0 || t.targetValidationRatio === void 0) return 1;
  let o = t.validationRatio;
  if (t.validationRatio > t.targetValidationRatio) {
    const a = r / 100;
    o = Math.max(t.lowestValidationRatio, t.validationRatio - a);
  }
  return o < t.validationRatio ? o : t.validationRatio;
}), be), NDKPublishError = class extends Error {
  constructor(e, t, r, s) {
    super(e);
    y(this, "errors");
    y(this, "publishedToRelays");
    /**
     * Intended relay set where the publishing was intended to happen.
     */
    y(this, "intendedRelaySet");
    this.errors = t, this.publishedToRelays = r, this.intendedRelaySet = s;
  }
  get relayErrors() {
    const e = [];
    for (const [t, r] of this.errors)
      e.push(`${t.url}: ${r}`);
    return e.join(`
`);
  }
}, NDKRelaySet = class Se {
  constructor(e, t, r) {
    y(this, "relays");
    y(this, "debug");
    y(this, "ndk");
    y(this, "pool");
    this.relays = e, this.ndk = t, this.pool = r ?? t.pool, this.debug = t.debug.extend("relayset");
  }
  /**
   * Adds a relay to this set.
   */
  addRelay(e) {
    this.relays.add(e);
  }
  get relayUrls() {
    return Array.from(this.relays).map((e) => e.url);
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
  static fromRelayUrls(e, t, r = !0, s) {
    if (s = s ?? t.pool, !s) throw new Error("No pool provided");
    const o = /* @__PURE__ */ new Set();
    for (const a of e) {
      const c = s.relays.get(normalizeRelayUrl(a));
      if (c)
        c.status < 5 && r && c.connect(), o.add(c);
      else {
        const l = new NDKRelay(normalizeRelayUrl(a), t == null ? void 0 : t.relayAuthDefaultPolicy, t);
        s.useTemporaryRelay(l, void 0, `requested from fromRelayUrls ${e}`), o.add(l);
      }
    }
    return new Se(new Set(o), t, s);
  }
  /**
   * Publish an event to all relays in this relay set.
   *
   * This method implements a robust mechanism for publishing events to multiple relays with
   * built-in handling for race conditions, timeouts, and partial failures. The implementation
   * uses a dual-tracking mechanism to ensure accurate reporting of which relays successfully
   * received an event.
   *
   * Key aspects of this implementation:
   *
   * 1. DUAL-TRACKING MECHANISM:
   *    - Promise-based tracking: Records successes/failures from the promises returned by relay.publish()
   *    - Event-based tracking: Listens for 'relay:published' events that indicate successful publishing
   *    This approach ensures we don't miss successful publishes even if there are subsequent errors in
   *    the promise chain.
   *
   * 2. RACE CONDITION HANDLING:
   *    - If a relay emits a success event but later fails in the promise chain, we still count it as a success
   *    - If a relay times out after successfully publishing, we still count it as a success
   *    - All relay operations happen in parallel, with proper tracking regardless of completion order
   *
   * 3. TIMEOUT MANAGEMENT:
   *    - Individual timeouts for each relay operation
   *    - Proper cleanup of timeouts to prevent memory leaks
   *    - Clear timeout error reporting
   *
   * 4. ERROR HANDLING:
   *    - Detailed tracking of specific errors for each failed relay
   *    - Special handling for ephemeral events (which don't expect acknowledgement)
   *    - RequiredRelayCount parameter to control the minimum success threshold
   *
   * @param event Event to publish
   * @param timeoutMs Timeout in milliseconds for each relay publish operation
   * @param requiredRelayCount The minimum number of relays we expect the event to be published to
   * @returns A set of relays the event was published to
   * @throws {NDKPublishError} If the event could not be published to at least `requiredRelayCount` relays
   * @example
   * ```typescript
   * const relaySet = new NDKRelaySet(new Set([relay1, relay2]), ndk);
   * const publishedToRelays = await relaySet.publish(event);
   * // publishedToRelays can contain relay1, relay2, both, or none
   * // depending on which relays the event was successfully published to
   * if (publishedToRelays.size > 0) {
   *   console.log("Event published to at least one relay");
   * }
   * ```
   */
  async publish(e, t, r = 1) {
    var l;
    const s = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = e.isEphemeral();
    e.publishStatus = "pending";
    const c = (u) => {
      s.add(u);
    };
    e.on("relay:published", c);
    try {
      const u = Array.from(this.relays).map((h) => new Promise((f) => {
        const p = t ? setTimeout(() => {
          s.has(h) || (o.set(h, new Error(`Publish timeout after ${t}ms`)), f(!1));
        }, t) : null;
        h.publish(e, t).then((m) => {
          p && clearTimeout(p), m ? (s.add(h), f(!0)) : f(!1);
        }).catch((m) => {
          p && clearTimeout(p), a || o.set(h, m), f(!1);
        });
      }));
      if (await Promise.all(u), s.size < r) {
        if (!a) {
          const h = new NDKPublishError(
            "Not enough relays received the event",
            o,
            s,
            this
          );
          throw e.publishStatus = "error", e.publishError = h, (l = this.ndk) == null || l.emit("event:publish-failed", e, h, this.relayUrls), h;
        }
      } else
        e.publishStatus = "success", e.emit("published", { relaySet: this, publishedToRelays: s });
      return s;
    } finally {
      e.off("relay:published", c);
    }
  }
  get size() {
    return this.relays.size;
  }
}, d = createDebug5("ndk:outbox:calculate");
async function calculateRelaySetFromEvent(n, e) {
  var a;
  const t = /* @__PURE__ */ new Set(), r = await getWriteRelaysFor(n, e.pubkey);
  r && r.forEach((c) => {
    var u;
    const l = (u = n.pool) == null ? void 0 : u.getRelay(c);
    l && t.add(l);
  });
  let s = e.tags.filter((c) => ["a", "e"].includes(c[0])).map((c) => c[2]).filter((c) => c == null ? void 0 : c.startsWith("wss://")).filter((c) => {
    try {
      return new URL(c), !0;
    } catch {
      return !1;
    }
  }).map((c) => normalizeRelayUrl(c));
  s = Array.from(new Set(s)).slice(0, 5), s.forEach((c) => {
    var u;
    const l = (u = n.pool) == null ? void 0 : u.getRelay(c, !0, !0);
    l && (d("Adding relay hint %s", c), t.add(l));
  });
  const o = e.getMatchingTags("p").map((c) => c[1]);
  return o.length < 5 ? Array.from(
    chooseRelayCombinationForPubkeys(n, o, "read", {
      preferredRelays: new Set(r)
    }).keys()
  ).forEach((l) => {
    var h;
    const u = (h = n.pool) == null ? void 0 : h.getRelay(l, !1, !0);
    u && (d("Adding p-tagged relay %s", l), t.add(u));
  }) : d("Too many p-tags to consider %d", o.length), (a = n.pool) == null || a.permanentAndConnectedRelays().forEach((c) => t.add(c)), new NDKRelaySet(t, n);
}
function calculateRelaySetsFromFilter(n, e, t) {
  const r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set();
  if (e.forEach((o) => {
    o.authors && o.authors.forEach((a) => s.add(a));
  }), s.size > 0) {
    const o = getRelaysForFilterWithAuthors(n, Array.from(s));
    for (const a of o.keys())
      r.set(a, []);
    for (const a of e)
      if (a.authors)
        for (const [c, l] of o.entries()) {
          const u = a.authors.filter(
            (h) => l.includes(h)
          );
          r.set(c, [
            ...r.get(c),
            {
              ...a,
              // Overwrite authors sent to this relay with the authors that were
              // present in the filter and are also present in the relay
              authors: u
            }
          ]);
        }
      else
        for (const c of o.keys())
          r.set(c, [...r.get(c), a]);
  } else
    n.explicitRelayUrls && n.explicitRelayUrls.forEach((o) => {
      r.set(o, e);
    });
  return r.size === 0 && t.permanentAndConnectedRelays().slice(0, 5).forEach((o) => {
    r.set(o.url, e);
  }), r;
}
function calculateRelaySetsFromFilters(n, e, t) {
  return calculateRelaySetsFromFilter(n, e, t);
}
function mergeTags(n, e) {
  const t = /* @__PURE__ */ new Map(), r = (a) => a.join(","), s = (a, c) => a.every((l, u) => l === c[u]), o = (a) => {
    for (const [c, l] of t)
      if (s(l, a) || s(a, l)) {
        a.length >= l.length && t.set(c, a);
        return;
      }
    t.set(r(a), a);
  };
  return n.concat(e).forEach(o), Array.from(t.values());
}
var hashtagRegex = new RegExp(`(?<=\\s|^)(#[^\\s!@#$%^&*()=+./,[{\\]};:'"?><]+)`, "g");
function generateHashtags(n) {
  const e = n.match(hashtagRegex), t = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
  if (e)
    for (const s of e)
      t.has(s.slice(1)) || (r.add(s.slice(1)), t.add(s.slice(1)));
  return Array.from(r);
}
async function generateContentTags(n, e = []) {
  const t = /(@|nostr:)(npub|nprofile|note|nevent|naddr)[a-zA-Z0-9]+/g, r = [], s = (a) => {
    e.find((c) => ["q", a[0]].includes(c[0]) && c[1] === a[1]) || e.push(a);
  };
  n = n.replace(t, (a) => {
    try {
      const c = a.split(/(@|nostr:)/)[2], { type: l, data: u } = nip19_exports.decode(c);
      let h;
      switch (l) {
        case "npub":
          h = ["p", u];
          break;
        case "nprofile":
          h = ["p", u.pubkey];
          break;
        case "note":
          r.push(
            new Promise(async (f) => {
              s(["q", u, await maybeGetEventRelayUrl(c)]), f();
            })
          );
          break;
        case "nevent":
          r.push(
            new Promise(async (f) => {
              const { id: p, author: m } = u;
              let { relays: E } = u;
              (!E || E.length === 0) && (E = [await maybeGetEventRelayUrl(c)]), s(["q", p, E[0]]), m && s(["p", m]), f();
            })
          );
          break;
        case "naddr":
          r.push(
            new Promise(async (f) => {
              const p = [u.kind, u.pubkey, u.identifier].join(":");
              let m = u.relays ?? [];
              m.length === 0 && (m = [await maybeGetEventRelayUrl(c)]), s(["q", p, m[0]]), s(["p", u.pubkey]), f();
            })
          );
          break;
        default:
          return a;
      }
      return h && s(h), `nostr:${c}`;
    } catch {
      return a;
    }
  }), await Promise.all(r);
  const o = generateHashtags(n).map((a) => ["t", a]);
  return e = mergeTags(e, o), { content: n, tags: e };
}
async function maybeGetEventRelayUrl(n) {
  return "";
}
async function encrypt(n, e, t = "nip44") {
  let r;
  if (!this.ndk) throw new Error("No NDK instance found!");
  let s = e;
  if (s || (this.ndk.assertSigner(), s = this.ndk.signer), !s) throw new Error("no NDK signer");
  const o = n || (() => {
    const a = this.getMatchingTags("p");
    if (a.length !== 1)
      throw new Error("No recipient could be determined and no explicit recipient was provided");
    return this.ndk.getUser({ pubkey: a[0][1] });
  })();
  if (t === "nip44" && await isEncryptionEnabled(s, "nip44") && (r = await s.encrypt(o, this.content, "nip44")), (!r || t === "nip04") && await isEncryptionEnabled(s, "nip04") && (r = await s.encrypt(o, this.content, "nip04")), !r) throw new Error("Failed to encrypt event.");
  this.content = r;
}
async function decrypt(n, e, t) {
  var c, l, u, h;
  if ((l = (c = this.ndk) == null ? void 0 : c.cacheAdapter) != null && l.getDecryptedEvent) {
    let f = null;
    if (typeof this.ndk.cacheAdapter.getDecryptedEvent == "function" && (f = this.ndk.cacheAdapter.getDecryptedEvent(this.id)), f) {
      this.content = f.content;
      return;
    }
  }
  let r;
  if (!this.ndk) throw new Error("No NDK instance found!");
  let s = e;
  if (s || (this.ndk.assertSigner(), s = this.ndk.signer), !s) throw new Error("no NDK signer");
  const o = n || this.author;
  if (!o) throw new Error("No sender provided and no author available");
  const a = t || (this.content.match(/\\?iv=/) ? "nip04" : "nip44");
  if ((a === "nip04" || this.kind === 4) && await isEncryptionEnabled(s, "nip04") && this.content.search("\\?iv=") && (r = await s.decrypt(o, this.content, "nip04")), !r && a === "nip44" && await isEncryptionEnabled(s, "nip44") && (r = await s.decrypt(o, this.content, "nip44")), !r) throw new Error("Failed to decrypt event.");
  this.content = r, (h = (u = this.ndk) == null ? void 0 : u.cacheAdapter) != null && h.addDecryptedEvent && this.ndk.cacheAdapter.addDecryptedEvent(this);
}
async function isEncryptionEnabled(n, e) {
  return n.encryptionEnabled ? e ? !!await n.encryptionEnabled(e) : !0 : !1;
}
function eventHasETagMarkers(n) {
  for (const e of n.tags)
    if (e[0] === "e" && (e[3] ?? "").length > 0) return !0;
  return !1;
}
function getRootTag(n, e) {
  e ?? (e = n.tagType());
  const t = n.tags.find(isTagRootTag);
  if (!t) {
    if (eventHasETagMarkers(n)) return;
    const r = n.getMatchingTags(e);
    if (r.length < 3) return r[0];
  }
  return t;
}
var nip22RootTags = /* @__PURE__ */ new Set(["A", "E", "I"]), nip22ReplyTags = /* @__PURE__ */ new Set(["a", "e", "i"]);
function getReplyTag(n, e) {
  if (n.kind === 1111) {
    let s;
    for (const o of n.tags)
      if (nip22RootTags.has(o[0])) s = o;
      else if (nip22ReplyTags.has(o[0])) {
        s = o;
        break;
      }
    return s;
  }
  e ?? (e = n.tagType());
  let t = !1, r;
  for (const s of n.tags)
    if (s[0] === e) {
      if ((s[3] ?? "").length > 0 && (t = !0), t && s[3] === "reply") return s;
      t && s[3] === "root" && (r = s), t || (r = s);
    }
  return r;
}
function isTagRootTag(n) {
  return n[0] === "E" || n[3] === "root";
}
async function fetchTaggedEvent(n, e) {
  if (!this.ndk) throw new Error("NDK instance not found");
  const t = this.getMatchingTags(n, e);
  if (t.length === 0) return;
  const [r, s, o] = t[0];
  let a = o !== "" ? this.ndk.pool.getRelay(o) : void 0;
  return await this.ndk.fetchEvent(s, {}, a);
}
async function fetchRootEvent(n) {
  if (!this.ndk) throw new Error("NDK instance not found");
  const e = getRootTag(this);
  if (e)
    return this.ndk.fetchEventFromTag(e, this, n);
}
async function fetchReplyEvent(n) {
  if (!this.ndk) throw new Error("NDK instance not found");
  const e = getReplyTag(this);
  if (e)
    return this.ndk.fetchEventFromTag(e, this, n);
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
var DEFAULT_RELAY_COUNT = 2;
function encode(n = DEFAULT_RELAY_COUNT) {
  let e = [];
  return this.onRelays.length > 0 ? e = this.onRelays.map((t) => t.url) : this.relay && (e = [this.relay.url]), e.length > n && (e = e.slice(0, n)), this.isParamReplaceable() ? nip19_exports.naddrEncode({
    kind: this.kind,
    pubkey: this.pubkey,
    identifier: this.replaceableDTag(),
    relays: e
  }) : e.length > 0 ? nip19_exports.neventEncode({
    id: this.tagId(),
    relays: e,
    author: this.pubkey
  }) : nip19_exports.noteEncode(this.tagId());
}
async function repost(n = !0, e) {
  if (!e && n) {
    if (!this.ndk) throw new Error("No NDK instance found");
    this.ndk.assertSigner(), e = this.ndk.signer;
  }
  const t = new NDKEvent(this.ndk, {
    kind: getKind(this)
  });
  return this.isProtected || (t.content = JSON.stringify(this.rawEvent())), t.tag(this), this.kind !== 1 && t.tags.push(["k", `${this.kind}`]), e && await t.sign(e), n && await t.publish(), t;
}
function getKind(n) {
  return n.kind === 1 ? 6 : 16;
}
function serialize(n = !1, e = !1) {
  const t = [0, this.pubkey, this.created_at, this.kind, this.tags, this.content];
  return n && t.push(this.sig), e && t.push(this.id), JSON.stringify(t);
}
function deserialize(n) {
  const e = JSON.parse(n), t = {
    pubkey: e[1],
    created_at: e[2],
    kind: e[3],
    tags: e[4],
    content: e[5]
  };
  return e.length >= 7 && (t.sig = e[6]), e.length >= 8 && (t.id = e[7]), t;
}
var worker, processingQueue = {};
function signatureVerificationInit(n) {
  worker = n, worker.onmessage = (e) => {
    const [t, r] = e.data, s = processingQueue[t];
    if (!s) {
      console.error("No record found for event", t);
      return;
    }
    delete processingQueue[t];
    for (const o of s.resolves)
      o(r);
  };
}
async function verifySignatureAsync(n, e) {
  return new Promise((r) => {
    const s = n.serialize();
    let o = !1;
    processingQueue[n.id] || (processingQueue[n.id] = { event: n, resolves: [] }, o = !0), processingQueue[n.id].resolves.push(r), o && (worker == null || worker.postMessage({
      serialized: s,
      id: n.id,
      sig: n.sig,
      pubkey: n.pubkey
    }));
  });
}
var PUBKEY_REGEX = /^[a-f0-9]{64}$/;
function validate() {
  if (typeof this.kind != "number" || typeof this.content != "string" || typeof this.created_at != "number" || typeof this.pubkey != "string" || !this.pubkey.match(PUBKEY_REGEX) || !Array.isArray(this.tags)) return !1;
  for (let n = 0; n < this.tags.length; n++) {
    const e = this.tags[n];
    if (!Array.isArray(e)) return !1;
    for (let t = 0; t < e.length; t++)
      if (typeof e[t] == "object") return !1;
  }
  return !0;
}
var verifiedSignatures = new dist.LRUCache({
  maxSize: 1e3,
  entryExpirationTimeInMS: 6e4
});
function verifySignature(n) {
  var t;
  if (typeof this.signatureVerified == "boolean") return this.signatureVerified;
  const e = verifiedSignatures.get(this.id);
  if (e !== null)
    return this.signatureVerified = !!e, this.signatureVerified;
  try {
    if ((t = this.ndk) != null && t.asyncSigVerification)
      verifySignatureAsync(this, n).then((r) => {
        var s;
        n && (this.signatureVerified = r, r && verifiedSignatures.set(this.id, this.sig)), r || ((s = this.ndk) == null || s.emit("event:invalid-sig", this), verifiedSignatures.set(this.id, !1));
      });
    else {
      const r = sha256(new TextEncoder().encode(this.serialize())), s = schnorr.verify(this.sig, r, this.pubkey);
      return s ? verifiedSignatures.set(this.id, this.sig) : verifiedSignatures.set(this.id, !1), this.signatureVerified = s, s;
    }
  } catch {
    return this.signatureVerified = !1, !1;
  }
}
function getEventHash() {
  return getEventHashFromSerializedEvent(this.serialize());
}
function getEventHashFromSerializedEvent(n) {
  const e = sha256(new TextEncoder().encode(n));
  return bytesToHex$1(e);
}
var skipClientTagOnKinds = /* @__PURE__ */ new Set([
  0,
  4,
  1059,
  13,
  3,
  9734,
  5
  /* EventDeletion */
]), NDKEvent = class ye extends lib$1.EventEmitter {
  constructor(t, r) {
    var s;
    super();
    y(this, "ndk");
    y(this, "created_at");
    y(this, "content", "");
    y(this, "tags", []);
    y(this, "kind");
    y(this, "id", "");
    y(this, "sig");
    y(this, "pubkey", "");
    y(this, "signatureVerified");
    y(this, "_author");
    /**
     * The relay that this event was first received from.
     */
    y(this, "relay");
    /**
     * The status of the publish operation.
     */
    y(this, "publishStatus", "success");
    y(this, "publishError");
    y(this, "serialize", serialize.bind(this));
    y(this, "getEventHash", getEventHash.bind(this));
    y(this, "validate", validate.bind(this));
    y(this, "verifySignature", verifySignature.bind(this));
    /**
     * Is this event replaceable (whether parameterized or not)?
     *
     * This will return true for kind 0, 3, 10k-20k and 30k-40k
     */
    y(this, "isReplaceable", isReplaceable.bind(this));
    y(this, "isEphemeral", isEphemeral.bind(this));
    y(this, "isDvm", () => this.kind && this.kind >= 5e3 && this.kind <= 7e3);
    /**
     * Is this event parameterized replaceable?
     *
     * This will return true for kind 30k-40k
     */
    y(this, "isParamReplaceable", isParamReplaceable.bind(this));
    /**
     * Encodes a bech32 id.
     *
     * @param relays {string[]} The relays to encode in the id
     * @returns {string} - Encoded naddr, note or nevent.
     */
    y(this, "encode", encode.bind(this));
    y(this, "encrypt", encrypt.bind(this));
    y(this, "decrypt", decrypt.bind(this));
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
    y(this, "fetchTaggedEvent", fetchTaggedEvent.bind(this));
    /**
     * Fetch the root event of the current event.
     * @returns The fetched root event or null if no event was found
     * @example
     * const replyEvent = await ndk.fetchEvent("nevent1qqs8x8vnycyha73grv380gmvlury4wtmx0nr9a5ds2dngqwgu87wn6gpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgq3ql2vyh47mk2p0qlsku7hg0vn29faehy9hy34ygaclpn66ukqp3afqz4cwjd")
     * const rootEvent = await replyEvent.fetchRootEvent();
     * console.log(replyEvent.encode() + " is a reply in the thread " + rootEvent?.encode());
     */
    y(this, "fetchRootEvent", fetchRootEvent.bind(this));
    /**
     * Fetch the event the current event is replying to.
     * @returns The fetched reply event or null if no event was found
     */
    y(this, "fetchReplyEvent", fetchReplyEvent.bind(this));
    /**
     * NIP-18 reposting event.
     *
     * @param publish Whether to publish the reposted event automatically @default true
     * @param signer The signer to use for signing the reposted event
     * @returns The reposted event
     *
     * @function
     */
    y(this, "repost", repost.bind(this));
    this.ndk = t, this.created_at = r == null ? void 0 : r.created_at, this.content = (r == null ? void 0 : r.content) || "", this.tags = (r == null ? void 0 : r.tags) || [], this.id = (r == null ? void 0 : r.id) || "", this.sig = r == null ? void 0 : r.sig, this.pubkey = (r == null ? void 0 : r.pubkey) || "", this.kind = r == null ? void 0 : r.kind, r instanceof ye && (this.relay && (this.relay = r.relay, (s = this.ndk) == null || s.subManager.seenEvent(r.id, this.relay)), this.publishStatus = r.publishStatus, this.publishError = r.publishError);
  }
  /**
   * The relays that this event was received from and/or successfully published to.
   */
  get onRelays() {
    let t = [];
    return this.ndk ? t = this.ndk.subManager.seenEvents.get(this.id) || [] : this.relay && t.push(this.relay), t;
  }
  /**
   * Deserialize an NDKEvent from a serialized payload.
   * @param ndk
   * @param event
   * @returns
   */
  static deserialize(t, r) {
    return new ye(t, deserialize(r));
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
  set author(t) {
    var r;
    this.pubkey = t.pubkey, this._author = t, (r = this._author).ndk ?? (r.ndk = this.ndk);
  }
  /**
   * Returns an NDKUser for the author of the event.
   */
  get author() {
    if (this._author) return this._author;
    if (!this.ndk) throw new Error("No NDK instance found");
    const t = this.ndk.getUser({ pubkey: this.pubkey });
    return this._author = t, t;
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
  tagExternal(t, r, s) {
    const o = ["i"], a = ["k"];
    switch (r) {
      case "url": {
        const c = new URL(t);
        c.hash = "", o.push(c.toString()), a.push(`${c.protocol}//${c.host}`);
        break;
      }
      case "hashtag":
        o.push(`#${t.toLowerCase()}`), a.push("#");
        break;
      case "geohash":
        o.push(`geo:${t.toLowerCase()}`), a.push("geo");
        break;
      case "isbn":
        o.push(`isbn:${t.replace(/-/g, "")}`), a.push("isbn");
        break;
      case "podcast:guid":
        o.push(`podcast:guid:${t}`), a.push("podcast:guid");
        break;
      case "podcast:item:guid":
        o.push(`podcast:item:guid:${t}`), a.push("podcast:item:guid");
        break;
      case "podcast:publisher:guid":
        o.push(`podcast:publisher:guid:${t}`), a.push("podcast:publisher:guid");
        break;
      case "isan":
        o.push(`isan:${t.split("-").slice(0, 4).join("-")}`), a.push("isan");
        break;
      case "doi":
        o.push(`doi:${t.toLowerCase()}`), a.push("doi");
        break;
      default:
        throw new Error(`Unsupported NIP-73 entity type: ${r}`);
    }
    s && o.push(s), this.tags.push(o), this.tags.push(a);
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
  tag(t, r, s, o) {
    let a = [];
    if (t.fetchProfile !== void 0) {
      o ?? (o = "p");
      const l = [o, t.pubkey];
      r && l.push("", r), a.push(l);
    } else if (t instanceof ye) {
      const l = t;
      s ?? (s = (l == null ? void 0 : l.pubkey) === this.pubkey), a = l.referenceTags(r, s, o);
      for (const u of l.getMatchingTags("p"))
        u[1] !== this.pubkey && (this.tags.find((h) => h[0] === "p" && h[1] === u[1]) || this.tags.push(["p", u[1]]));
    } else if (Array.isArray(t))
      a = [t];
    else
      throw new Error("Invalid argument", t);
    this.tags = mergeTags(this.tags, a);
  }
  /**
   * Return a NostrEvent object, trying to fill in missing fields
   * when possible, adding tags when necessary.
   * @param pubkey {string} The pubkey of the user who the event belongs to.
   * @returns {Promise<NostrEvent>} A promise that resolves to a NostrEvent.
   */
  async toNostrEvent(t) {
    var o, a;
    if (!t && this.pubkey === "") {
      const c = await ((a = (o = this.ndk) == null ? void 0 : o.signer) == null ? void 0 : a.user());
      this.pubkey = (c == null ? void 0 : c.pubkey) || "";
    }
    this.created_at || (this.created_at = Math.floor(Date.now() / 1e3));
    const { content: r, tags: s } = await this.generateTags();
    this.content = r || "", this.tags = s;
    try {
      this.id = this.getEventHash();
    } catch {
    }
    return this.rawEvent();
  }
  /**
   * Get all tags with the given name
   * @param tagName {string} The name of the tag to search for
   * @returns {NDKTag[]} An array of the matching tags
   */
  getMatchingTags(t, r) {
    const s = this.tags.filter((o) => o[0] === t);
    return r === void 0 ? s : s.filter((o) => o[3] === r);
  }
  /**
   * Check if the event has a tag with the given name
   * @param tagName
   * @param marker
   * @returns
   */
  hasTag(t, r) {
    return this.tags.some((s) => s[0] === t && (!r || s[3] === r));
  }
  /**
   * Get the first tag with the given name
   * @param tagName Tag name to search for
   * @returns The value of the first tag with the given name, or undefined if no such tag exists
   */
  tagValue(t) {
    const r = this.getMatchingTags(t);
    if (r.length !== 0)
      return r[0][1];
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
  set alt(t) {
    this.removeTag("alt"), t && this.tags.push(["alt", t]);
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
  set dTag(t) {
    this.removeTag("d"), t && this.tags.push(["d", t]);
  }
  /**
   * Remove all tags with the given name (e.g. "d", "a", "p")
   * @param tagName Tag name(s) to search for and remove
   * @returns {void}
   */
  removeTag(t) {
    const r = Array.isArray(t) ? t : [t];
    this.tags = this.tags.filter((s) => !r.includes(s[0]));
  }
  /**
   * Replace a tag with a new value. If not found, it will be added.
   * @param tag The tag to replace.
   * @param value The new value for the tag.
   */
  replaceTag(t) {
    this.removeTag(t[0]), this.tags.push(t);
  }
  /**
   * Sign the event if a signer is present.
   *
   * It will generate tags.
   * Repleacable events will have their created_at field set to the current time.
   * @param signer {NDKSigner} The NDKSigner to use to sign the event
   * @returns {Promise<string>} A Promise that resolves to the signature of the signed event.
   */
  async sign(t) {
    var s, o;
    t ? this.author = await t.user() : ((s = this.ndk) == null || s.assertSigner(), t = (o = this.ndk) == null ? void 0 : o.signer);
    const r = await this.toNostrEvent();
    return this.sig = await t.sign(r), this.sig;
  }
  /**
   *
   * @param relaySet
   * @param timeoutMs
   * @param requiredRelayCount
   * @returns
   */
  async publishReplaceable(t, r, s) {
    return this.id = "", this.created_at = Math.floor(Date.now() / 1e3), this.sig = "", this.publish(t, r, s);
  }
  /**
   * Attempt to sign and then publish an NDKEvent to a given relaySet.
   * If no relaySet is provided, the relaySet will be calculated by NDK.
   * @param relaySet {NDKRelaySet} The relaySet to publish the even to.
   * @param timeoutM {number} The timeout for the publish operation in milliseconds.
   * @param requiredRelayCount The number of relays that must receive the event for the publish to be considered successful.
   * @returns A promise that resolves to the relays the event was published to.
   */
  async publish(t, r, s) {
    var c, l, u;
    if (this.sig || await this.sign(), !this.ndk) throw new Error("NDKEvent must be associated with an NDK instance to publish");
    if ((!t || t.size === 0) && (t = this.ndk.devWriteRelaySet || await calculateRelaySetFromEvent(this.ndk, this)), this.kind === 5 && ((c = this.ndk.cacheAdapter) != null && c.deleteEventIds)) {
      const h = this.getMatchingTags("e").map((f) => f[1]);
      this.ndk.cacheAdapter.deleteEventIds(h);
    }
    const o = this.rawEvent();
    if ((l = this.ndk.cacheAdapter) != null && l.addUnpublishedEvent && shouldTrackUnpublishedEvent(this))
      try {
        this.ndk.cacheAdapter.addUnpublishedEvent(this, t.relayUrls);
      } catch (h) {
        console.error("Error adding unpublished event to cache", h);
      }
    this.kind === 5 && ((u = this.ndk.cacheAdapter) != null && u.deleteEventIds) && this.ndk.cacheAdapter.deleteEventIds(this.getMatchingTags("e").map((h) => h[1])), this.ndk.subManager.dispatchEvent(o, void 0, !0);
    const a = await t.publish(this, r, s);
    return a.forEach((h) => {
      var f;
      return (f = this.ndk) == null ? void 0 : f.subManager.seenEvent(this.id, h);
    }), a;
  }
  /**
   * Generates tags for users, notes, and other events tagged in content.
   * Will also generate random "d" tag for parameterized replaceable events where needed.
   * @returns {ContentTag} The tags and content of the event.
   */
  async generateTags() {
    var o, a, c;
    let t = [];
    const r = await generateContentTags(this.content, this.tags), s = r.content;
    if (t = r.tags, this.kind && this.isParamReplaceable() && !this.getMatchingTags("d")[0]) {
      const u = this.tagValue("title");
      let f = [...Array(u ? 6 : 16)].map(() => Math.random().toString(36)[2]).join("");
      u && u.length > 0 && (f = `${u.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}-${f}`), t.push(["d", f]);
    }
    if (this.shouldAddClientTag) {
      const l = ["client", ((o = this.ndk) == null ? void 0 : o.clientName) ?? ""];
      (a = this.ndk) != null && a.clientNip89 && l.push((c = this.ndk) == null ? void 0 : c.clientNip89), t.push(l);
    } else this.shouldStripClientTag && (t = t.filter((l) => l[0] !== "client"));
    return { content: s || "", tags: t };
  }
  get shouldAddClientTag() {
    var t, r;
    return !(!((t = this.ndk) != null && t.clientName) && !((r = this.ndk) != null && r.clientNip89) || skipClientTagOnKinds.has(this.kind) || this.isEphemeral() || this.isReplaceable() && !this.isParamReplaceable() || this.isDvm() || this.hasTag("client"));
  }
  get shouldStripClientTag() {
    return skipClientTagOnKinds.has(this.kind);
  }
  muted() {
    var o, a;
    const t = (o = this.ndk) == null ? void 0 : o.mutedIds.get(this.pubkey);
    if (t && t === "p") return "author";
    const r = this.tagReference(), s = (a = this.ndk) == null ? void 0 : a.mutedIds.get(r[1]);
    return s && s === r[0] ? "event" : null;
  }
  /**
   * Returns the "d" tag of a parameterized replaceable event or throws an error if the event isn't
   * a parameterized replaceable event.
   * @returns {string} the "d" tag of the event.
   *
   * @deprecated Use `dTag` instead.
   */
  replaceableDTag() {
    if (this.kind && this.kind >= 3e4 && this.kind <= 4e4) {
      const t = this.getMatchingTags("d")[0];
      return t ? t[1] : "";
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
    return this.kind === 0 || this.kind === 3 || this.kind && this.kind >= 1e4 && this.kind < 2e4 ? `${this.kind}:${this.pubkey}` : this.tagId();
  }
  /**
   * Returns the id of the event or, if it's a parameterized event, the generated id of the event using "d" tag, pubkey, and kind.
   * @returns {string} The id
   */
  tagId() {
    return this.isParamReplaceable() ? this.tagAddress() : this.id;
  }
  /**
   * Returns a stable reference value for a replaceable event.
   *
   * Param replaceable events are returned in the expected format of `<kind>:<pubkey>:<d-tag>`.
   * Kind-replaceable events are returned in the format of `<kind>:<pubkey>:`.
   *
   * @returns {string} A stable reference value for replaceable events
   */
  tagAddress() {
    if (this.isParamReplaceable()) {
      const t = this.dTag ?? "";
      return `${this.kind}:${this.pubkey}:${t}`;
    }
    if (this.isReplaceable())
      return `${this.kind}:${this.pubkey}:`;
    throw new Error("Event is not a replaceable event");
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
  tagReference(t) {
    let r;
    return this.isParamReplaceable() ? r = ["a", this.tagAddress()] : r = ["e", this.tagId()], this.relay ? r.push(this.relay.url) : r.push(""), r.push(t ?? ""), this.isParamReplaceable() || r.push(this.pubkey), r;
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
  referenceTags(t, r, s) {
    let o = [];
    return this.isParamReplaceable() ? o = [
      [s ?? "a", this.tagAddress()],
      [s ?? "e", this.id]
    ] : o = [[s ?? "e", this.id]], o = o.map((a) => {
      var c, l, u;
      return a[0] === "e" || t ? a.push(((c = this.relay) == null ? void 0 : c.url) ?? "") : (l = this.relay) != null && l.url && a.push((u = this.relay) == null ? void 0 : u.url), a;
    }), o.forEach((a) => {
      a[0] === "e" ? (a.push(t ?? ""), a.push(this.pubkey)) : t && a.push(t);
    }), o = [...o, ...this.getMatchingTags("h")], r || o.push(...this.author.referenceTags()), o;
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
    return this.isParamReplaceable() ? { "#a": [this.tagId()] } : { "#e": [this.tagId()] };
  }
  nip22Filter() {
    return this.isParamReplaceable() ? { "#A": [this.tagId()] } : { "#E": [this.tagId()] };
  }
  /**
   * Generates a deletion event of the current event
   *
   * @param reason The reason for the deletion
   * @param publish Whether to publish the deletion event automatically
   * @returns The deletion event
   */
  async delete(t, r = !0) {
    var o;
    if (!this.ndk) throw new Error("No NDK instance found");
    this.ndk.assertSigner();
    const s = new ye(this.ndk, {
      kind: 5,
      content: t || ""
    });
    return s.tag(this, void 0, !0), s.tags.push(["k", (o = this.kind) == null ? void 0 : o.toString()]), r && (this.emit("deleted"), await s.publish()), s;
  }
  /**
   * Establishes whether this is a NIP-70-protectede event.
   * @@satisfies NIP-70
   */
  set isProtected(t) {
    this.removeTag("-"), t && this.tags.push(["-"]);
  }
  /**
   * Whether this is a NIP-70-protected event.
   * @@satisfies NIP-70
   */
  get isProtected() {
    return this.hasTag("-");
  }
  /**
   * React to an existing event
   *
   * @param content The content of the reaction
   */
  async react(t, r = !0) {
    if (!this.ndk) throw new Error("No NDK instance found");
    this.ndk.assertSigner();
    const s = new ye(this.ndk, {
      kind: 7,
      content: t
    });
    return s.tag(this), r && await s.publish(), s;
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
  get inspect() {
    return JSON.stringify(this.rawEvent(), null, 4);
  }
  /**
   * Dump the event to console for debugging purposes.
   * Prints a JSON stringified version of rawEvent() with indentation
   * and also lists all relay URLs for onRelays.
   */
  dump() {
    console.debug(JSON.stringify(this.rawEvent(), null, 4)), console.debug("Event on relays:", this.onRelays.map((t) => t.url).join(", "));
  }
  /**
   * Creates a reply event for the current event.
   *
   * This function will use NIP-22 when appropriate (i.e. replies to non-kind:1 events).
   * This function does not have side-effects; it will just return an event with the appropriate tags
   * to generate the reply event; the caller is responsible for publishing the event.
   */
  reply() {
    var r, s;
    const t = new ye(this.ndk);
    if (this.kind === 1)
      t.kind = 1, this.hasTag("e") ? t.tags = [
        ...t.tags,
        ...this.getMatchingTags("e"),
        ...this.getMatchingTags("p"),
        ...this.getMatchingTags("a"),
        ...this.referenceTags("reply")
      ] : t.tag(this, "root");
    else {
      t.kind = 1111;
      const o = ["A", "E", "I", "P"], a = this.tags.filter((c) => o.includes(c[0]));
      if (a.length > 0) {
        const c = this.tagValue("K");
        t.tags.push(...a), c && t.tags.push(["K", c]);
        const [l, u, h, ...f] = this.tagReference(), p = [l, u, ...f];
        t.tags.push(p);
      } else {
        const [c, l, u, h] = this.tagReference(), f = [c, l, h ?? ""];
        c === "e" && f.push(this.pubkey), t.tags.push(f);
        const p = [...f];
        p[0] = p[0].toUpperCase(), t.tags.push(p), t.tags.push(["K", (r = this.kind) == null ? void 0 : r.toString()]), t.tags.push(["P", this.pubkey]);
      }
      t.tags.push(["k", (s = this.kind) == null ? void 0 : s.toString()]), t.tags.push(...this.getMatchingTags("p")), t.tags.push(["p", this.pubkey]);
    }
    return t;
  }
}, untrackedUnpublishedEvents = /* @__PURE__ */ new Set([
  24133,
  13194,
  23194,
  23195
  /* NostrWalletConnectRes */
]);
function shouldTrackUnpublishedEvent(n) {
  return !untrackedUnpublishedEvents.has(n.kind);
}
var NDKPool = class extends lib$1.EventEmitter {
  /**
   * @param relayUrls - The URLs of the relays to connect to.
   * @param blacklistedRelayUrls - URLs to blacklist for this pool IN ADDITION to those blacklisted at the ndk-level
   * @param ndk - The NDK instance.
   * @param opts - Options for the pool.
   */
  constructor(e, t, r, {
    debug: s,
    name: o
  } = {}) {
    super();
    // TODO: This should probably be an LRU cache
    y(this, "_relays", /* @__PURE__ */ new Map());
    y(this, "status", "idle");
    y(this, "autoConnectRelays", /* @__PURE__ */ new Set());
    y(this, "poolBlacklistRelayUrls", /* @__PURE__ */ new Set());
    y(this, "debug");
    y(this, "temporaryRelayTimers", /* @__PURE__ */ new Map());
    y(this, "flappingRelays", /* @__PURE__ */ new Set());
    // A map to store timeouts for each flapping relay.
    y(this, "backoffTimes", /* @__PURE__ */ new Map());
    y(this, "ndk");
    y(this, "_name", "unnamed");
    this.debug = s ?? r.debug.extend("pool"), o && (this._name = o), this.ndk = r, this.relayUrls = e, this.poolBlacklistRelayUrls = new Set(t), this.ndk.pools.push(this);
  }
  get blacklistRelayUrls() {
    const e = new Set(this.ndk.blacklistRelayUrls);
    return this.poolBlacklistRelayUrls.forEach((t) => e.add(t)), e;
  }
  get relays() {
    return this._relays;
  }
  set relayUrls(e) {
    this._relays.clear();
    for (const t of e) {
      const r = new NDKRelay(t, void 0, this.ndk);
      r.connectivity.netDebug = this.ndk.netDebug, this.addRelay(r);
    }
  }
  get name() {
    return this._name;
  }
  set name(e) {
    this._name = e, this.debug = this.debug.extend(e);
  }
  /**
   * Adds a relay to the pool, and sets a timer to remove it if it is not used within the specified time.
   * @param relay - The relay to add to the pool.
   * @param removeIfUnusedAfter - The time in milliseconds to wait before removing the relay from the pool after it is no longer used.
   */
  useTemporaryRelay(e, t = 3e4, r) {
    const s = this.relays.has(e.url);
    s || (this.addRelay(e), this.debug("Adding temporary relay %s for filters %o", e.url, r));
    const o = this.temporaryRelayTimers.get(e.url);
    if (o && clearTimeout(o), !s || o) {
      const a = setTimeout(() => {
        var c;
        (c = this.ndk.explicitRelayUrls) != null && c.includes(e.url) || this.removeRelay(e.url);
      }, t);
      this.temporaryRelayTimers.set(e.url, a);
    }
  }
  /**
   * Adds a relay to the pool.
   *
   * @param relay - The relay to add to the pool.
   * @param connect - Whether or not to connect to the relay.
   */
  addRelay(e, t = !0) {
    var g, b;
    const r = this.relays.has(e.url), s = (g = this.blacklistRelayUrls) == null ? void 0 : g.has(e.url), o = e.url.includes("/npub1");
    let a = !0;
    const c = e.url;
    if (r) return;
    if (s) {
      this.debug(`Refusing to add relay ${c}: blacklisted`);
      return;
    }
    if (o) {
      this.debug(`Refusing to add relay ${c}: is a filter relay`);
      return;
    }
    if ((b = this.ndk.cacheAdapter) != null && b.getRelayStatus) {
      const w = this.ndk.cacheAdapter.getRelayStatus(c);
      if (w != null && w.dontConnectBefore) {
        if (w.dontConnectBefore > Date.now()) {
          const $ = w.dontConnectBefore - Date.now();
          this.debug(`Refusing to add relay ${c}: delayed connect for ${$}ms`), setTimeout(() => {
            this.addRelay(e, t);
          }, $);
          return;
        }
        a = !1;
      }
    }
    const l = (w) => this.emit("notice", e, w), u = () => this.handleRelayConnect(c), h = () => this.handleRelayReady(e), f = () => this.emit("relay:disconnect", e), p = () => this.handleFlapping(e), m = (w) => this.emit("relay:auth", e, w), E = () => this.emit("relay:authed", e);
    e.off("notice", l), e.off("connect", u), e.off("ready", h), e.off("disconnect", f), e.off("flapping", p), e.off("auth", m), e.off("authed", E), e.on("notice", l), e.on("connect", u), e.on("ready", h), e.on("disconnect", f), e.on("flapping", p), e.on("auth", m), e.on("authed", E), e.on("delayed-connect", (w) => {
      var $;
      ($ = this.ndk.cacheAdapter) != null && $.updateRelayStatus && this.ndk.cacheAdapter.updateRelayStatus(e.url, {
        dontConnectBefore: Date.now() + w
      });
    }), this._relays.set(c, e), t && this.autoConnectRelays.add(c), t && this.status === "active" && (this.emit("relay:connecting", e), e.connect(void 0, a).catch((w) => {
      this.debug(`Failed to connect to relay ${c}`, w);
    }));
  }
  /**
   * Removes a relay from the pool.
   * @param relayUrl - The URL of the relay to remove.
   * @returns {boolean} True if the relay was removed, false if it was not found.
   */
  removeRelay(e) {
    const t = this.relays.get(e);
    if (t)
      return t.disconnect(), this.relays.delete(e), this.autoConnectRelays.delete(e), this.emit("relay:disconnect", t), !0;
    const r = this.temporaryRelayTimers.get(e);
    return r && (clearTimeout(r), this.temporaryRelayTimers.delete(e)), !1;
  }
  /**
   * Checks whether a relay is already connected in the pool.
   */
  isRelayConnected(e) {
    const t = normalizeRelayUrl(e), r = this.relays.get(t);
    return r ? r.status === 5 : !1;
  }
  /**
   * Fetches a relay from the pool, or creates a new one if it does not exist.
   *
   * New relays will be attempted to be connected.
   */
  getRelay(e, t = !0, r = !1, s) {
    let o = this.relays.get(normalizeRelayUrl(e));
    return o || (o = new NDKRelay(e, void 0, this.ndk), o.connectivity.netDebug = this.ndk.netDebug, r ? this.useTemporaryRelay(o, 3e4, s) : this.addRelay(o, t)), o;
  }
  handleRelayConnect(e) {
    const t = this.relays.get(e);
    if (!t) {
      console.error("NDK BUG: relay not found in pool", { relayUrl: e });
      return;
    }
    this.emit("relay:connect", t), this.stats().connected === this.relays.size && this.emit("connect");
  }
  handleRelayReady(e) {
    this.emit("relay:ready", e);
  }
  /**
   * Attempts to establish a connection to each relay in the pool.
   *
   * @async
   * @param {number} [timeoutMs] - Optional timeout in milliseconds for each connection attempt.
   * @returns {Promise<void>} A promise that resolves when all connection attempts have completed.
   * @throws {Error} If any of the connection attempts result in an error or timeout.
   */
  async connect(e) {
    const t = [];
    this.status = "active", this.debug(`Connecting to ${this.relays.size} relays${e ? `, timeout ${e}...` : ""}`);
    const r = new Set(this.autoConnectRelays.keys());
    for (const o of r) {
      const a = this.relays.get(o);
      if (!a)
        continue;
      const c = new Promise((l, u) => (this.emit("relay:connecting", a), a.connect(e).then(l).catch(u)));
      if (e) {
        const l = new Promise((u, h) => {
          setTimeout(() => h(`Timed out after ${e}ms`), e);
        });
        t.push(
          Promise.race([c, l]).catch((u) => {
            this.debug(`Failed to connect to relay ${a.url}: ${u ?? "No reason specified"}`);
          })
        );
      } else
        t.push(c);
    }
    const s = () => {
      const o = this.stats().connected === this.relays.size, a = this.stats().connected > 0;
      !o && a && this.emit("connect");
    };
    e && setTimeout(s, e), await Promise.all(t), s();
  }
  checkOnFlappingRelays() {
    const e = this.flappingRelays.size, t = this.relays.size;
    if (e / t >= 0.8)
      for (const r of this.flappingRelays)
        this.backoffTimes.set(r, 0);
  }
  handleFlapping(e) {
    this.debug(`Relay ${e.url} is flapping`);
    let t = this.backoffTimes.get(e.url) || 5e3;
    t = t * 2, this.backoffTimes.set(e.url, t), this.debug(`Backoff time for ${e.url} is ${t}ms`), setTimeout(() => {
      this.debug(`Attempting to reconnect to ${e.url}`), this.emit("relay:connecting", e), e.connect(), this.checkOnFlappingRelays();
    }, t), e.disconnect(), this.emit("flapping", e);
  }
  size() {
    return this.relays.size;
  }
  /**
   * Returns the status of each relay in the pool.
   * @returns {NDKPoolStats} An object containing the number of relays in each status.
   */
  stats() {
    const e = {
      total: 0,
      connected: 0,
      disconnected: 0,
      connecting: 0
    };
    for (const t of this.relays.values())
      e.total++, t.status === 5 ? e.connected++ : t.status === 1 ? e.disconnected++ : t.status === 4 && e.connecting++;
    return e;
  }
  connectedRelays() {
    return Array.from(this.relays.values()).filter(
      (e) => e.status >= 5
      /* CONNECTED */
    );
  }
  permanentAndConnectedRelays() {
    return Array.from(this.relays.values()).filter(
      (e) => e.status >= 5 && !this.temporaryRelayTimers.has(e.url)
    );
  }
  /**
   * Get a list of all relay urls in the pool.
   */
  urls() {
    return Array.from(this.relays.keys());
  }
}, se, NDKCashuMintList = (se = class extends NDKEvent {
  constructor(t, r) {
    super(t, r);
    y(this, "_p2pk");
    this.kind ?? (this.kind = 10019);
  }
  static from(t) {
    return new se(t.ndk, t);
  }
  set relays(t) {
    this.tags = this.tags.filter((r) => r[0] !== "relay");
    for (const r of t)
      this.tags.push(["relay", r]);
  }
  get relays() {
    const t = [];
    for (const r of this.tags)
      r[0] === "relay" && t.push(r[1]);
    return t;
  }
  set mints(t) {
    this.tags = this.tags.filter((r) => r[0] !== "mint");
    for (const r of t)
      this.tags.push(["mint", r]);
  }
  get mints() {
    const t = [];
    for (const r of this.tags)
      r[0] === "mint" && t.push(r[1]);
    return Array.from(new Set(t));
  }
  get p2pk() {
    return this._p2pk ? this._p2pk : (this._p2pk = this.tagValue("pubkey") ?? this.pubkey, this._p2pk);
  }
  set p2pk(t) {
    this._p2pk = t, this.removeTag("pubkey"), t && this.tags.push(["pubkey", t]);
  }
  get relaySet() {
    return NDKRelaySet.fromRelayUrls(this.relays, this.ndk);
  }
}, y(se, "kind", 10019), y(se, "kinds", [
  10019
  /* CashuMintList */
]), se), ie, NDKArticle = (ie = class extends NDKEvent {
  constructor(e, t) {
    super(e, t), this.kind ?? (this.kind = 30023);
  }
  /**
   * Creates a NDKArticle from an existing NDKEvent.
   *
   * @param event NDKEvent to create the NDKArticle from.
   * @returns NDKArticle
   */
  static from(e) {
    return new ie(e.ndk, e);
  }
  /**
   * Getter for the article title.
   *
   * @returns {string | undefined} - The article title if available, otherwise undefined.
   */
  get title() {
    return this.tagValue("title");
  }
  /**
   * Setter for the article title.
   *
   * @param {string | undefined} title - The title to set for the article.
   */
  set title(e) {
    this.removeTag("title"), e && this.tags.push(["title", e]);
  }
  /**
   * Getter for the article image.
   *
   * @returns {string | undefined} - The article image if available, otherwise undefined.
   */
  get image() {
    return this.tagValue("image");
  }
  /**
   * Setter for the article image.
   *
   * @param {string | undefined} image - The image to set for the article.
   */
  set image(e) {
    this.removeTag("image"), e && this.tags.push(["image", e]);
  }
  get summary() {
    return this.tagValue("summary");
  }
  set summary(e) {
    this.removeTag("summary"), e && this.tags.push(["summary", e]);
  }
  /**
   * Getter for the article's publication timestamp.
   *
   * @returns {number | undefined} - The Unix timestamp of when the article was published or undefined.
   */
  get published_at() {
    const e = this.tagValue("published_at");
    if (e) {
      let t = Number.parseInt(e);
      return t > 1e12 && (t = Math.floor(t / 1e3)), t;
    }
  }
  /**
   * Setter for the article's publication timestamp.
   *
   * @param {number | undefined} timestamp - The Unix timestamp to set for the article's publication date.
   */
  set published_at(e) {
    this.removeTag("published_at"), e !== void 0 && this.tags.push(["published_at", e.toString()]);
  }
  /**
   * Generates content tags for the article.
   *
   * This method first checks and sets the publication date if not available,
   * and then generates content tags based on the base NDKEvent class.
   *
   * @returns {ContentTag} - The generated content tags.
   */
  async generateTags() {
    return super.generateTags(), this.published_at || (this.published_at = this.created_at), super.generateTags();
  }
  /**
   * Getter for the article's URL.
   *
   * @returns {string | undefined} - The article's URL if available, otherwise undefined.
   */
  get url() {
    return this.tagValue("url");
  }
  /**
   * Setter for the article's URL.
   *
   * @param {string | undefined} url - The URL to set for the article.
   */
  set url(e) {
    e ? this.tags.push(["url", e]) : this.removeTag("url");
  }
}, y(ie, "kind", 30023), y(ie, "kinds", [
  30023
  /* Article */
]), ie);
function proofsTotalBalance(n) {
  return n.reduce((e, t) => {
    if (t.amount < 0)
      throw new Error("proof amount is negative");
    return e + t.amount;
  }, 0);
}
var oe, NDKCashuToken = (oe = class extends NDKEvent {
  constructor(t, r) {
    super(t, r);
    y(this, "_proofs", []);
    y(this, "_mint");
    /**
     * Tokens that this token superseeds
     */
    y(this, "_deletes", []);
    y(this, "original");
    this.kind ?? (this.kind = 7375);
  }
  static async from(t) {
    const r = new oe(t.ndk, t);
    r.original = t;
    try {
      await r.decrypt();
    } catch {
      r.content = r.original.content;
    }
    try {
      const s = JSON.parse(r.content);
      if (r.proofs = s.proofs, r.mint = s.mint ?? r.tagValue("mint"), r.deletedTokens = s.del ?? [], !Array.isArray(r.proofs)) return;
    } catch {
      return;
    }
    return r;
  }
  get proofs() {
    return this._proofs;
  }
  set proofs(t) {
    const r = /* @__PURE__ */ new Set();
    this._proofs = t.filter((s) => r.has(s.C) ? (console.warn("Passed in proofs had duplicates, ignoring", s.C), !1) : s.amount < 0 ? (console.warn("Invalid proof with negative amount", s), !1) : (r.add(s.C), !0)).map(this.cleanProof);
  }
  /**
   * Returns a minimal proof object with only essential properties
   */
  cleanProof(t) {
    return {
      id: t.id,
      amount: t.amount,
      C: t.C,
      secret: t.secret
    };
  }
  async toNostrEvent(t) {
    if (!this.ndk) throw new Error("no ndk");
    if (!this.ndk.signer) throw new Error("no signer");
    const r = {
      proofs: this.proofs.map(this.cleanProof),
      mint: this.mint,
      del: this.deletedTokens ?? []
    };
    this.content = JSON.stringify(r);
    const s = await this.ndk.signer.user();
    return await this.encrypt(s, void 0, "nip44"), super.toNostrEvent(t);
  }
  set mint(t) {
    this._mint = t;
  }
  get mint() {
    return this._mint;
  }
  /**
   * Tokens that were deleted by the creation of this token.
   */
  get deletedTokens() {
    return this._deletes;
  }
  /**
   * Marks tokens that were deleted by the creation of this token.
   */
  set deletedTokens(t) {
    this._deletes = t;
  }
  get amount() {
    return proofsTotalBalance(this.proofs);
  }
  async publish(t, r, s) {
    return this.original ? this.original.publish(t, r, s) : super.publish(t, r, s);
  }
}, y(oe, "kind", 7375), y(oe, "kinds", [
  7375
  /* CashuToken */
]), oe), ae, NDKHighlight = (ae = class extends NDKEvent {
  constructor(t, r) {
    super(t, r);
    y(this, "_article");
    this.kind ?? (this.kind = 9802);
  }
  static from(t) {
    return new ae(t.ndk, t);
  }
  get url() {
    return this.tagValue("r");
  }
  /**
   * Context tag.
   */
  set context(t) {
    t === void 0 ? this.tags = this.tags.filter(([r, s]) => r !== "context") : (this.tags = this.tags.filter(([r, s]) => r !== "context"), this.tags.push(["context", t]));
  }
  get context() {
    var t;
    return ((t = this.tags.find(([r, s]) => r === "context")) == null ? void 0 : t[1]) ?? void 0;
  }
  /**
   * Will return the article URL or NDKEvent if they have already been
   * set (it won't attempt to load remote events)
   */
  get article() {
    return this._article;
  }
  /**
   * Article the highlight is coming from.
   *
   * @param article Article URL or NDKEvent.
   */
  set article(t) {
    this._article = t, typeof t == "string" ? this.tags.push(["r", t]) : this.tag(t);
  }
  getArticleTag() {
    return this.getMatchingTags("a")[0] || this.getMatchingTags("e")[0] || this.getMatchingTags("r")[0];
  }
  async getArticle() {
    var s;
    if (this._article !== void 0) return this._article;
    let t;
    const r = this.getArticleTag();
    if (r) {
      switch (r[0]) {
        case "a": {
          const [o, a, c] = r[1].split(":");
          t = nip19_exports.naddrEncode({
            kind: Number.parseInt(o),
            pubkey: a,
            identifier: c
          });
          break;
        }
        case "e":
          t = nip19_exports.noteEncode(r[1]);
          break;
        case "r":
          this._article = r[1];
          break;
      }
      if (t) {
        let o = await ((s = this.ndk) == null ? void 0 : s.fetchEvent(t));
        o && (o.kind === 30023 && (o = NDKArticle.from(o)), this._article = o);
      }
      return this._article;
    }
  }
}, y(ae, "kind", 9802), y(ae, "kinds", [
  9802
  /* Highlight */
]), ae);
function mapImetaTag(n) {
  const e = {};
  if (n.length === 2) {
    const r = n[1].split(" ");
    for (let s = 0; s < r.length; s += 2) {
      const o = r[s], a = r[s + 1];
      o === "fallback" ? (e.fallback || (e.fallback = []), e.fallback.push(a)) : e[o] = a;
    }
    return e;
  }
  const t = n.slice(1);
  for (const r of t) {
    const s = r.split(" "), o = s[0], a = s.slice(1).join(" ");
    o === "fallback" ? (e.fallback || (e.fallback = []), e.fallback.push(a)) : e[o] = a;
  }
  return e;
}
function imetaTagToTag(n) {
  const e = ["imeta"];
  for (const [t, r] of Object.entries(n))
    if (Array.isArray(r))
      for (const s of r)
        e.push(`${t} ${s}`);
    else r && e.push(`${t} ${r}`);
  return e;
}
var ce, NDKImage = (ce = class extends NDKEvent {
  constructor(t, r) {
    super(t, r);
    y(this, "_imetas");
    this.kind ?? (this.kind = 20);
  }
  /**
   * Creates a NDKImage from an existing NDKEvent.
   *
   * @param event NDKEvent to create the NDKImage from.
   * @returns NDKImage
   */
  static from(t) {
    return new ce(t.ndk, t.rawEvent());
  }
  get isValid() {
    return this.imetas.length > 0;
  }
  get imetas() {
    return this._imetas ? this._imetas : (this._imetas = this.tags.filter((t) => t[0] === "imeta").map(mapImetaTag).filter((t) => !!t.url), this._imetas);
  }
  set imetas(t) {
    this._imetas = t, this.tags = this.tags.filter((r) => r[0] !== "imeta"), this.tags.push(...t.map(imetaTagToTag));
  }
}, y(ce, "kind", 20), y(ce, "kinds", [
  20
  /* Image */
]), ce), me, NDKList = (me = class extends NDKEvent {
  constructor(t, r) {
    super(t, r);
    y(this, "_encryptedTags");
    /**
     * Stores the number of bytes the content was before decryption
     * to expire the cache when the content changes.
     */
    y(this, "encryptedTagsLength");
    this.kind ?? (this.kind = 30001);
  }
  /**
   * Wrap a NDKEvent into a NDKList
   */
  static from(t) {
    return new me(t.ndk, t);
  }
  /**
   * Returns the title of the list. Falls back on fetching the name tag value.
   */
  get title() {
    const t = this.tagValue("title") || this.tagValue("name");
    return t || (this.kind === 3 ? "Contacts" : this.kind === 1e4 ? "Mute" : this.kind === 10001 ? "Pinned Notes" : this.kind === 10002 ? "Relay Metadata" : this.kind === 10003 ? "Bookmarks" : this.kind === 10004 ? "Communities" : this.kind === 10005 ? "Public Chats" : this.kind === 10006 ? "Blocked Relays" : this.kind === 10007 ? "Search Relays" : this.kind === 10050 ? "Direct Message Receive Relays" : this.kind === 10015 ? "Interests" : this.kind === 10030 ? "Emojis" : this.tagValue("d"));
  }
  /**
   * Sets the title of the list.
   */
  set title(t) {
    this.removeTag(["title", "name"]), t && this.tags.push(["title", t]);
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
  set name(t) {
    this.title = t;
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
  set description(t) {
    this.removeTag("description"), t && this.tags.push(["description", t]);
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
  set image(t) {
    this.removeTag("image"), t && this.tags.push(["image", t]);
  }
  isEncryptedTagsCacheValid() {
    return !!(this._encryptedTags && this.encryptedTagsLength === this.content.length);
  }
  /**
   * Returns the decrypted content of the list.
   */
  async encryptedTags(t = !0) {
    if (t && this.isEncryptedTagsCacheValid()) return this._encryptedTags;
    if (!this.ndk) throw new Error("NDK instance not set");
    if (!this.ndk.signer) throw new Error("NDK signer not set");
    const r = await this.ndk.signer.user();
    try {
      if (this.content.length > 0)
        try {
          const s = await this.ndk.signer.decrypt(r, this.content), o = JSON.parse(s);
          return o != null && o[0] ? (this.encryptedTagsLength = this.content.length, this._encryptedTags = o) : (this.encryptedTagsLength = this.content.length, this._encryptedTags = []);
        } catch {
        }
    } catch {
    }
    return [];
  }
  /**
   * This method can be overriden to validate that a tag is valid for this list.
   *
   * (i.e. the NDKPersonList can validate that items are NDKUser instances)
   */
  validateTag(t) {
    return !0;
  }
  getItems(t) {
    return this.tags.filter((r) => r[0] === t);
  }
  /**
   * Returns the unecrypted items in this list.
   */
  get items() {
    return this.tags.filter((t) => ![
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
    ].includes(t[0]));
  }
  /**
   * Adds a new item to the list.
   * @param relay Relay to add
   * @param mark Optional mark to add to the item
   * @param encrypted Whether to encrypt the item
   * @param position Where to add the item in the list (top or bottom)
   */
  async addItem(t, r = void 0, s = !1, o = "bottom") {
    if (!this.ndk) throw new Error("NDK instance not set");
    if (!this.ndk.signer) throw new Error("NDK signer not set");
    let a;
    if (t instanceof NDKEvent)
      a = [t.tagReference(r)];
    else if (t instanceof NDKUser)
      a = t.referenceTags();
    else if (t instanceof NDKRelay)
      a = t.referenceTags();
    else if (Array.isArray(t))
      a = [t];
    else
      throw new Error("Invalid object type");
    if (r && a[0].push(r), s) {
      const c = await this.ndk.signer.user(), l = await this.encryptedTags();
      o === "top" ? l.unshift(...a) : l.push(...a), this._encryptedTags = l, this.encryptedTagsLength = this.content.length, this.content = JSON.stringify(l), await this.encrypt(c);
    } else
      o === "top" ? this.tags.unshift(...a) : this.tags.push(...a);
    this.created_at = Math.floor(Date.now() / 1e3), this.emit("change");
  }
  /**
   * Removes an item from the list from both the encrypted and unencrypted lists.
   * @param value value of item to remove from the list
   * @param publish whether to publish the change
   * @returns
   */
  async removeItemByValue(t, r = !0) {
    if (!this.ndk) throw new Error("NDK instance not set");
    if (!this.ndk.signer) throw new Error("NDK signer not set");
    const s = this.tags.findIndex((l) => l[1] === t);
    s >= 0 && this.tags.splice(s, 1);
    const o = await this.ndk.signer.user(), a = await this.encryptedTags(), c = a.findIndex((l) => l[1] === t);
    if (c >= 0 && (a.splice(c, 1), this._encryptedTags = a, this.encryptedTagsLength = this.content.length, this.content = JSON.stringify(a), await this.encrypt(o)), r)
      return this.publishReplaceable();
    this.created_at = Math.floor(Date.now() / 1e3), this.emit("change");
  }
  /**
   * Removes an item from the list.
   *
   * @param index The index of the item to remove.
   * @param encrypted Whether to remove from the encrypted list or not.
   */
  async removeItem(t, r) {
    if (!this.ndk) throw new Error("NDK instance not set");
    if (!this.ndk.signer) throw new Error("NDK signer not set");
    if (r) {
      const s = await this.ndk.signer.user(), o = await this.encryptedTags();
      o.splice(t, 1), this._encryptedTags = o, this.encryptedTagsLength = this.content.length, this.content = JSON.stringify(o), await this.encrypt(s);
    } else
      this.tags.splice(t, 1);
    return this.created_at = Math.floor(Date.now() / 1e3), this.emit("change"), this;
  }
  has(t) {
    return this.items.some((r) => r[1] === t);
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
    const t = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), s = [];
    for (const o of this.items)
      if (o[0] === "e" && o[1])
        t.add(o[1]);
      else if (o[0] === "a" && o[1]) {
        const [a, c, l] = o[1].split(":");
        if (!a || !c) continue;
        const u = `${a}:${c}`, h = r.get(u) || [];
        h.push(l || ""), r.set(u, h);
      }
    if (t.size > 0 && s.push({ ids: Array.from(t) }), r.size > 0)
      for (const [o, a] of r.entries()) {
        const [c, l] = o.split(":");
        s.push({
          kinds: [Number.parseInt(c)],
          authors: [l],
          "#d": a
        });
      }
    return s;
  }
}, y(me, "kinds", [
  10063,
  30001,
  10004,
  10050,
  10030,
  10015,
  10001,
  10002,
  10007,
  10006,
  10003
  /* BookmarkList */
]), me), lists_default = NDKList, ne, NDKNutzap = (ne = class extends NDKEvent {
  constructor(t, r) {
    super(t, r);
    y(this, "debug");
    y(this, "_proofs", []);
    y(this, "sender", this.author);
    this.kind ?? (this.kind = 9321), this.debug = (t == null ? void 0 : t.debug.extend("nutzap")) ?? createDebug5("ndk:nutzap"), this.alt || (this.alt = "This is a nutzap");
    try {
      const s = this.getMatchingTags("proof");
      s.length ? this._proofs = s.map((o) => JSON.parse(o[1])) : this._proofs = JSON.parse(this.content);
    } catch {
      return;
    }
  }
  static from(t) {
    const r = new ne(t.ndk, t);
    if (!(!r._proofs || !r._proofs.length))
      return r;
  }
  set comment(t) {
    this.content = t ?? "";
  }
  get comment() {
    const t = this.tagValue("comment");
    return t || this.content;
  }
  set proofs(t) {
    this._proofs = t, this.tags = this.tags.filter((r) => r[0] !== "proof");
    for (const r of t)
      this.tags.push(["proof", JSON.stringify(r)]);
  }
  get proofs() {
    return this._proofs;
  }
  get rawP2pk() {
    var r;
    const t = this.proofs[0];
    try {
      const s = JSON.parse(t.secret);
      let o;
      if (typeof s == "string" ? (o = JSON.parse(s), this.debug("stringified payload", t.secret)) : typeof s == "object" && (o = s), Array.isArray(o) && o[0] === "P2PK" && o.length > 1 && typeof o[1] == "object" && o[1] !== null || typeof o == "object" && o !== null && typeof ((r = o[1]) == null ? void 0 : r.data) == "string")
        return o[1].data;
    } catch (s) {
      this.debug("error parsing p2pk pubkey", s, this.proofs[0]);
    }
  }
  /**
   * Gets the p2pk pubkey that is embedded in the first proof.
   *
   * Note that this returns a nostr pubkey, not a cashu pubkey (no "02" prefix)
   */
  get p2pk() {
    const t = this.rawP2pk;
    if (t)
      return t.startsWith("02") ? t.slice(2) : t;
  }
  /**
   * Get the mint where this nutzap proofs exist
   */
  get mint() {
    return this.tagValue("u");
  }
  set mint(t) {
    this.replaceTag(["u", t]);
  }
  get unit() {
    let t = this.tagValue("unit") ?? "sat";
    return t != null && t.startsWith("msat") && (t = "sat"), t;
  }
  set unit(t) {
    if (this.removeTag("unit"), t != null && t.startsWith("msat")) throw new Error("msat is not allowed, use sat denomination instead");
    t && this.tag(["unit", t]);
  }
  get amount() {
    return this.proofs.reduce((r, s) => r + s.amount, 0);
  }
  /**
   * Set the target of the nutzap
   * @param target The target of the nutzap (a user or an event)
   */
  set target(t) {
    this.tags = this.tags.filter((r) => r[0] !== "p"), t instanceof NDKEvent && this.tags.push(t.tagReference());
  }
  set recipientPubkey(t) {
    this.removeTag("p"), this.tag(["p", t]);
  }
  get recipientPubkey() {
    return this.tagValue("p");
  }
  get recipient() {
    const t = this.recipientPubkey;
    return this.ndk ? this.ndk.getUser({ pubkey: t }) : new NDKUser({ pubkey: t });
  }
  async toNostrEvent() {
    this.unit === "msat" && (this.unit = "sat"), this.removeTag("amount"), this.tags.push(["amount", this.amount.toString()]);
    const t = await super.toNostrEvent();
    return t.content = this.comment, t;
  }
  /**
   * Validates that the nutzap conforms to NIP-61
   */
  get isValid() {
    let t = 0, r = 0, s = 0;
    for (const o of this.tags)
      o[0] === "e" && t++, o[0] === "p" && r++, o[0] === "u" && s++;
    return (
      // exactly one recipient and mint
      r === 1 && s === 1 && // must have at most one e tag
      t <= 1 && // must have at least one proof
      this.proofs.length > 0
    );
  }
}, y(ne, "kind", 9321), y(ne, "kinds", [ne.kind]), ne), le, NDKSimpleGroupMemberList = (le = class extends NDKEvent {
  constructor(t, r) {
    super(t, r);
    y(this, "relaySet");
    y(this, "memberSet", /* @__PURE__ */ new Set());
    this.kind ?? (this.kind = 39002), this.memberSet = new Set(this.members);
  }
  static from(t) {
    return new le(t.ndk, t);
  }
  get members() {
    return this.getMatchingTags("p").map((t) => t[1]);
  }
  hasMember(t) {
    return this.memberSet.has(t);
  }
  async publish(t, r, s) {
    return t ?? (t = this.relaySet), super.publishReplaceable(t, r, s);
  }
}, y(le, "kind", 39002), y(le, "kinds", [
  39002
  /* GroupMembers */
]), le), ue, NDKSimpleGroupMetadata = (ue = class extends NDKEvent {
  constructor(e, t) {
    super(e, t), this.kind ?? (this.kind = 39e3);
  }
  static from(e) {
    return new ue(e.ndk, e);
  }
  get name() {
    return this.tagValue("name");
  }
  get picture() {
    return this.tagValue("picture");
  }
  get about() {
    return this.tagValue("about");
  }
  get scope() {
    if (this.getMatchingTags("public").length > 0) return "public";
    if (this.getMatchingTags("public").length > 0) return "private";
  }
  set scope(e) {
    this.removeTag("public"), this.removeTag("private"), e === "public" ? this.tags.push(["public", ""]) : e === "private" && this.tags.push(["private", ""]);
  }
  get access() {
    if (this.getMatchingTags("open").length > 0) return "open";
    if (this.getMatchingTags("closed").length > 0) return "closed";
  }
  set access(e) {
    this.removeTag("open"), this.removeTag("closed"), e === "open" ? this.tags.push(["open", ""]) : e === "closed" && this.tags.push(["closed", ""]);
  }
}, y(ue, "kind", 39e3), y(ue, "kinds", [
  39e3
  /* GroupMetadata */
]), ue);
function strToPosition(n) {
  const [e, t] = n.split(",").map(Number);
  return { x: e, y: t };
}
function strToDimension(n) {
  const [e, t] = n.split("x").map(Number);
  return { width: e, height: t };
}
var Q, NDKStorySticker = (Q = class {
  constructor(e) {
    y(this, "type");
    y(this, "value");
    y(this, "position");
    y(this, "dimension");
    y(this, "properties");
    y(this, "hasValidDimensions", () => typeof this.dimension.width == "number" && typeof this.dimension.height == "number" && !Number.isNaN(this.dimension.width) && !Number.isNaN(this.dimension.height));
    y(this, "hasValidPosition", () => typeof this.position.x == "number" && typeof this.position.y == "number" && !Number.isNaN(this.position.x) && !Number.isNaN(this.position.y));
    if (Array.isArray(e)) {
      const t = e;
      if (t[0] !== "sticker" || t.length < 5)
        throw new Error("Invalid sticker tag");
      this.type = t[1], this.value = t[2], this.position = strToPosition(t[3]), this.dimension = strToDimension(t[4]);
      const r = {};
      for (let s = 5; s < t.length; s++) {
        const [o, ...a] = t[s].split(" ");
        r[o] = a.join(" ");
      }
      Object.keys(r).length > 0 && (this.properties = r);
    } else
      this.type = e, this.value = void 0, this.position = { x: 0, y: 0 }, this.dimension = { width: 0, height: 0 };
  }
  static fromTag(e) {
    try {
      return new Q(e);
    } catch {
      return null;
    }
  }
  get style() {
    var e;
    return (e = this.properties) == null ? void 0 : e.style;
  }
  set style(e) {
    var t;
    e ? this.properties = { ...this.properties, style: e } : (t = this.properties) == null || delete t.style;
  }
  get rotation() {
    var e;
    return (e = this.properties) != null && e.rot ? Number.parseFloat(this.properties.rot) : void 0;
  }
  set rotation(e) {
    var t;
    e !== void 0 ? this.properties = { ...this.properties, rot: e.toString() } : (t = this.properties) == null || delete t.rot;
  }
  /**
   * Checks if the sticker is valid.
   *
   * @returns {boolean} - True if the sticker is valid, false otherwise.
   */
  get isValid() {
    return this.hasValidDimensions() && this.hasValidPosition();
  }
  toTag() {
    if (!this.isValid) {
      const r = [
        this.hasValidDimensions() ? void 0 : "dimensions is invalid",
        this.hasValidPosition() ? void 0 : "position is invalid"
      ].filter(Boolean);
      throw new Error(`Invalid sticker: ${r.join(", ")}`);
    }
    let e;
    switch (this.type) {
      case "event":
        e = this.value.tagId();
        break;
      case "pubkey":
        e = this.value.pubkey;
        break;
      default:
        e = this.value;
    }
    const t = ["sticker", this.type, e, coordinates(this.position), dimension(this.dimension)];
    if (this.properties)
      for (const [r, s] of Object.entries(this.properties))
        t.push(`${r} ${s}`);
    return t;
  }
}, y(Q, "Text", "text"), y(Q, "Pubkey", "pubkey"), y(Q, "Event", "event"), y(Q, "Prompt", "prompt"), y(Q, "Countdown", "countdown"), Q), he, NDKStory = (he = class extends NDKEvent {
  constructor(t, r) {
    super(t, r);
    y(this, "_imeta");
    y(this, "_dimensions");
    if (this.kind ?? (this.kind = 23), r)
      for (const s of r.tags)
        switch (s[0]) {
          case "imeta":
            this._imeta = mapImetaTag(s);
            break;
          case "dim":
            this.dimensions = strToDimension(s[1]);
            break;
        }
  }
  /**
   * Creates a NDKStory from an existing NDKEvent.
   *
   * @param event NDKEvent to create the NDKStory from.
   * @returns NDKStory
   */
  static from(t) {
    return new he(t.ndk, t);
  }
  /**
   * Checks if the story is valid (has exactly one imeta tag).
   */
  get isValid() {
    return !!this.imeta;
  }
  /**
   * Gets the first imeta tag (there should only be one).
   */
  get imeta() {
    return this._imeta;
  }
  /**
   * Sets a single imeta tag, replacing any existing ones.
   */
  set imeta(t) {
    this._imeta = t, this.tags = this.tags.filter((r) => r[0] !== "imeta"), t && this.tags.push(imetaTagToTag(t));
  }
  /**
   * Getter for the story dimensions.
   *
   * @returns {NDKStoryDimension | undefined} - The story dimensions if available, otherwise undefined.
   */
  get dimensions() {
    const t = this.tagValue("dim");
    if (t)
      return strToDimension(t);
  }
  /**
   * Setter for the story dimensions.
   *
   * @param {NDKStoryDimension | undefined} dimensions - The dimensions to set for the story.
   */
  set dimensions(t) {
    this.removeTag("dim"), t && this.tags.push(["dim", `${t.width}x${t.height}`]);
  }
  /**
   * Getter for the story duration.
   *
   * @returns {number | undefined} - The story duration in seconds if available, otherwise undefined.
   */
  get duration() {
    const t = this.tagValue("dur");
    if (t)
      return Number.parseInt(t);
  }
  /**
   * Setter for the story duration.
   *
   * @param {number | undefined} duration - The duration in seconds to set for the story.
   */
  set duration(t) {
    this.removeTag("dur"), t !== void 0 && this.tags.push(["dur", t.toString()]);
  }
  /**
   * Gets all stickers from the story.
   *
   * @returns {NDKStorySticker[]} - Array of stickers in the story.
   */
  get stickers() {
    const t = [];
    for (const r of this.tags) {
      if (r[0] !== "sticker" || r.length < 5) continue;
      const s = NDKStorySticker.fromTag(r);
      s && t.push(s);
    }
    return t;
  }
  /**
   * Adds a sticker to the story.
   *
   * @param {NDKStorySticker|StorySticker} sticker - The sticker to add.
   */
  addSticker(t) {
    let r;
    if (t instanceof NDKStorySticker)
      r = t;
    else {
      const s = [
        "sticker",
        t.type,
        typeof t.value == "string" ? t.value : "",
        coordinates(t.position),
        dimension(t.dimension)
      ];
      if (t.properties)
        for (const [o, a] of Object.entries(t.properties))
          s.push(`${o} ${a}`);
      r = new NDKStorySticker(s), r.value = t.value;
    }
    r.type === "pubkey" ? this.tag(r.value) : r.type === "event" && this.tag(r.value), this.tags.push(r.toTag());
  }
  /**
   * Removes a sticker from the story.
   *
   * @param {number} index - The index of the sticker to remove.
   */
  removeSticker(t) {
    const r = this.stickers;
    if (t < 0 || t >= r.length) return;
    let s = 0;
    for (let o = 0; o < this.tags.length; o++)
      if (this.tags[o][0] === "sticker") {
        if (s === t) {
          this.tags.splice(o, 1);
          break;
        }
        s++;
      }
  }
}, y(he, "kind", 23), y(he, "kinds", [
  23
  /* Story */
]), he), coordinates = (n) => `${n.x},${n.y}`, dimension = (n) => `${n.width}x${n.height}`, possibleIntervalFrequencies = [
  "daily",
  "weekly",
  "monthly",
  "quarterly",
  "yearly"
];
function newAmount(n, e, t) {
  return ["amount", n.toString(), e, t];
}
function parseTagToSubscriptionAmount(n) {
  const e = Number.parseInt(n[1]);
  if (Number.isNaN(e) || e === void 0 || e === null || e <= 0) return;
  const t = n[2];
  if (t === void 0 || t === "") return;
  const r = n[3];
  if (r !== void 0 && possibleIntervalFrequencies.includes(r))
    return {
      amount: e,
      currency: t,
      term: r
    };
}
var de, NDKSubscriptionTier = (de = class extends NDKArticle {
  constructor(e, t) {
    const r = (t == null ? void 0 : t.kind) ?? 37001;
    super(e, t), this.kind = r;
  }
  /**
   * Creates a new NDKSubscriptionTier from an event
   * @param event
   * @returns NDKSubscriptionTier
   */
  static from(e) {
    return new de(e.ndk, e);
  }
  /**
   * Returns perks for this tier
   */
  get perks() {
    return this.getMatchingTags("perk").map((e) => e[1]).filter((e) => e !== void 0);
  }
  /**
   * Adds a perk to this tier
   */
  addPerk(e) {
    this.tags.push(["perk", e]);
  }
  /**
   * Returns the amount for this tier
   */
  get amounts() {
    return this.getMatchingTags("amount").map((e) => parseTagToSubscriptionAmount(e)).filter((e) => e !== void 0);
  }
  /**
   * Adds an amount to this tier
   * @param amount Amount in the smallest unit of the currency (e.g. cents, msats)
   * @param currency Currency code. Use msat for millisatoshis
   * @param term One of daily, weekly, monthly, quarterly, yearly
   */
  addAmount(e, t, r) {
    this.tags.push(newAmount(e, t, r));
  }
  /**
   * Sets a relay where content related to this tier can be found
   * @param relayUrl URL of the relay
   */
  set relayUrl(e) {
    this.tags.push(["r", e]);
  }
  /**
   * Returns the relay URLs for this tier
   */
  get relayUrls() {
    return this.getMatchingTags("r").map((e) => e[1]).filter((e) => e !== void 0);
  }
  /**
   * Gets the verifier pubkey for this tier. This is the pubkey that will generate
   * subscription payment receipts
   */
  get verifierPubkey() {
    return this.tagValue("p");
  }
  /**
   * Sets the verifier pubkey for this tier.
   */
  set verifierPubkey(e) {
    this.removeTag("p"), e && this.tags.push(["p", e]);
  }
  /**
   * Checks if this tier is valid
   */
  get isValid() {
    return this.title !== void 0 && // Must have a title
    this.amounts.length > 0;
  }
}, y(de, "kind", 37001), y(de, "kinds", [
  37001
  /* SubscriptionTier */
]), de), pe, NDKVideo = (pe = class extends NDKEvent {
  constructor() {
    super(...arguments);
    y(this, "_imetas");
  }
  /**
   * Creates a NDKArticle from an existing NDKEvent.
   *
   * @param event NDKEvent to create the NDKArticle from.
   * @returns NDKArticle
   */
  static from(t) {
    return new pe(t.ndk, t.rawEvent());
  }
  /**
   * Getter for the article title.
   *
   * @returns {string | undefined} - The article title if available, otherwise undefined.
   */
  get title() {
    return this.tagValue("title");
  }
  /**
   * Setter for the article title.
   *
   * @param {string | undefined} title - The title to set for the article.
   */
  set title(t) {
    this.removeTag("title"), t && this.tags.push(["title", t]);
  }
  /**
   * Getter for the article thumbnail.
   *
   * @returns {string | undefined} - The article thumbnail if available, otherwise undefined.
   */
  get thumbnail() {
    var r;
    let t;
    return this.imetas && this.imetas.length > 0 && (t = (r = this.imetas[0].image) == null ? void 0 : r[0]), t ?? this.tagValue("thumb");
  }
  get imetas() {
    return this._imetas ? this._imetas : (this._imetas = this.tags.filter((t) => t[0] === "imeta").map(mapImetaTag), this._imetas);
  }
  set imetas(t) {
    this._imetas = t, this.tags = this.tags.filter((r) => r[0] !== "imeta"), this.tags.push(...t.map(imetaTagToTag));
  }
  get url() {
    return this.imetas && this.imetas.length > 0 ? this.imetas[0].url : this.tagValue("url");
  }
  /**
   * Getter for the article's publication timestamp.
   *
   * @returns {number | undefined} - The Unix timestamp of when the article was published or undefined.
   */
  get published_at() {
    const t = this.tagValue("published_at");
    if (t)
      return Number.parseInt(t);
  }
  /**
   * Generates content tags for the article.
   *
   * This method first checks and sets the publication date if not available,
   * and then generates content tags based on the base NDKEvent class.
   *
   * @returns {ContentTag} - The generated content tags.
   */
  async generateTags() {
    var t, r;
    if (super.generateTags(), !this.kind && (r = (t = this.imetas) == null ? void 0 : t[0]) != null && r.dim) {
      const [s, o] = this.imetas[0].dim.split("x"), a = s && o && Number.parseInt(s) < Number.parseInt(o);
      this.duration && this.duration < 120 && a ? this.kind = 22 : this.kind = 21;
    }
    return super.generateTags();
  }
  get duration() {
    const t = this.tagValue("duration");
    if (t)
      return Number.parseInt(t);
  }
  /**
   * Setter for the video's duration
   *
   * @param {number | undefined} duration - The duration to set for the video (in seconds)
   */
  set duration(t) {
    this.removeTag("duration"), t !== void 0 && this.tags.push(["duration", Math.floor(t).toString()]);
  }
}, y(pe, "kind", 21), y(pe, "kinds", [
  34235,
  34236,
  22,
  21
  /* Video */
]), pe), ve, NDKWiki = (ve = class extends NDKArticle {
}, y(ve, "kind", 30818), y(ve, "kinds", [
  30818
  /* Wiki */
]), ve);
function wrapEvent(n) {
  const e = /* @__PURE__ */ new Map();
  for (const r of [
    NDKImage,
    NDKVideo,
    NDKCashuMintList,
    NDKArticle,
    NDKHighlight,
    NDKWiki,
    NDKNutzap,
    NDKSimpleGroupMemberList,
    NDKSimpleGroupMetadata,
    NDKSubscriptionTier,
    NDKCashuToken,
    NDKList,
    NDKStory
  ])
    for (const s of r.kinds)
      e.set(s, r);
  const t = e.get(n.kind);
  return t ? t.from(n) : n;
}
function queryFullyFilled(n) {
  return !!(filterIncludesIds(n.filter) && resultHasAllRequestedIds(n));
}
function filterIncludesIds(n) {
  return !!n.ids;
}
function resultHasAllRequestedIds(n) {
  const e = n.filter.ids;
  return !!e && e.length === n.eventFirstSeen.size;
}
function filterFromId(n) {
  let e;
  if (n.match(NIP33_A_REGEX)) {
    const [t, r, s] = n.split(":"), o = {
      authors: [r],
      kinds: [Number.parseInt(t)]
    };
    return s && (o["#d"] = [s]), o;
  }
  if (n.match(BECH32_REGEX))
    try {
      switch (e = nip19_exports.decode(n), e.type) {
        case "nevent": {
          const t = { ids: [e.data.id] };
          return e.data.author && (t.authors = [e.data.author]), e.data.kind && (t.kinds = [e.data.kind]), t;
        }
        case "note":
          return { ids: [e.data] };
        case "naddr": {
          const t = {
            authors: [e.data.pubkey],
            kinds: [e.data.kind]
          };
          return e.data.identifier && (t["#d"] = [e.data.identifier]), t;
        }
      }
    } catch (t) {
      console.error("Error decoding", n, t);
    }
  return { ids: [n] };
}
function isNip33AValue(n) {
  return n.match(NIP33_A_REGEX) !== null;
}
var NIP33_A_REGEX = /^(\d+):([0-9A-Fa-f]+)(?::(.*))?$/, BECH32_REGEX = /^n(event|ote|profile|pub|addr)1[\d\w]+$/;
function relaysFromBech32(n, e) {
  try {
    const t = nip19_exports.decode(n);
    if (["naddr", "nevent"].includes(t == null ? void 0 : t.type)) {
      const r = t.data;
      if (r != null && r.relays)
        return r.relays.map((s) => new NDKRelay(s, e.relayAuthDefaultPolicy, e));
    }
  } catch {
  }
  return [];
}
var defaultOpts = {
  closeOnEose: !1,
  cacheUsage: "CACHE_FIRST",
  dontSaveToCache: !1,
  groupable: !0,
  groupableDelay: 100,
  groupableDelayType: "at-most",
  cacheUnconstrainFilter: ["limit", "since", "until"]
}, NDKSubscription = class extends lib$1.EventEmitter {
  constructor(e, t, r, s) {
    super();
    y(this, "subId");
    y(this, "filters");
    y(this, "opts");
    y(this, "pool");
    y(this, "skipVerification", !1);
    y(this, "skipValidation", !1);
    /**
     * Tracks the filters as they are executed on each relay
     */
    y(this, "relayFilters");
    y(this, "relaySet");
    y(this, "ndk");
    y(this, "debug");
    /**
     * Events that have been seen by the subscription, with the time they were first seen.
     */
    y(this, "eventFirstSeen", /* @__PURE__ */ new Map());
    /**
     * Relays that have sent an EOSE.
     */
    y(this, "eosesSeen", /* @__PURE__ */ new Set());
    /**
     * The time the last event was received by the subscription.
     * This is used to calculate when EOSE should be emitted.
     */
    y(this, "lastEventReceivedAt");
    /**
     * The most recent event timestamp from cache results.
     * This is used for addSinceFromCache functionality.
     */
    y(this, "mostRecentCacheEventTimestamp");
    y(this, "internalId");
    /**
     * Whether the subscription should close when all relays have reached the end of the event stream.
     */
    y(this, "closeOnEose");
    /**
     * Pool monitor callback
     */
    y(this, "poolMonitor");
    y(this, "skipOptimisticPublishEvent", !1);
    /**
     * Filters to remove when querying the cache.
     */
    y(this, "cacheUnconstrainFilter");
    y(this, "onStopped");
    // EOSE handling
    y(this, "eoseTimeout");
    y(this, "eosed", !1);
    this.ndk = e, this.opts = { ...defaultOpts, ...r || {} }, this.pool = this.opts.pool || e.pool, this.filters = Array.isArray(t) ? t : [t], this.subId = s || this.opts.subId, this.internalId = Math.random().toString(36).substring(7), this.debug = e.debug.extend(`subscription[${this.opts.subId ?? this.internalId}]`), this.opts.relaySet ? this.relaySet = this.opts.relaySet : this.opts.relayUrls && (this.relaySet = NDKRelaySet.fromRelayUrls(this.opts.relayUrls, this.ndk)), this.skipVerification = this.opts.skipVerification || !1, this.skipValidation = this.opts.skipValidation || !1, this.closeOnEose = this.opts.closeOnEose || !1, this.skipOptimisticPublishEvent = this.opts.skipOptimisticPublishEvent || !1, this.cacheUnconstrainFilter = this.opts.cacheUnconstrainFilter;
  }
  /**
   * Returns the relays that have not yet sent an EOSE.
   */
  relaysMissingEose() {
    var t;
    return this.relayFilters ? Array.from((t = this.relayFilters) == null ? void 0 : t.keys()).filter(
      (r) => !this.eosesSeen.has(this.pool.getRelay(r, !1, !1))
    ) : [];
  }
  /**
   * Provides access to the first filter of the subscription for
   * backwards compatibility.
   */
  get filter() {
    return this.filters[0];
  }
  get groupableDelay() {
    var e;
    if (this.isGroupable())
      return (e = this.opts) == null ? void 0 : e.groupableDelay;
  }
  get groupableDelayType() {
    var e;
    return ((e = this.opts) == null ? void 0 : e.groupableDelayType) || "at-most";
  }
  isGroupable() {
    var e;
    return ((e = this.opts) == null ? void 0 : e.groupable) || !1;
  }
  shouldQueryCache() {
    var t;
    return this.opts.addSinceFromCache ? !0 : ((t = this.opts) == null ? void 0 : t.cacheUsage) === "ONLY_RELAY" ? !1 : (this.filters.some((r) => {
      var s;
      return (s = r.kinds) == null ? void 0 : s.some((o) => kindIsEphemeral(o));
    }), !0);
  }
  shouldQueryRelays() {
    var e;
    return ((e = this.opts) == null ? void 0 : e.cacheUsage) !== "ONLY_CACHE";
  }
  shouldWaitForCache() {
    var e;
    return this.opts.addSinceFromCache ? !0 : (
      // Must want to close on EOSE; subscriptions
      // that want to receive further updates must
      // always hit the relay
      this.opts.closeOnEose && // Cache adapter must claim to be fast
      !!((e = this.ndk.cacheAdapter) != null && e.locking) && // If explicitly told to run in parallel, then
      // we should not wait for the cache
      this.opts.cacheUsage !== "PARALLEL"
    );
  }
  /**
   * Start the subscription. This is the main method that should be called
   * after creating a subscription.
   *
   * @param emitCachedEvents - Whether to emit events coming from a synchronous cache
   *
   * When using a synchronous cache, the events will be returned immediately
   * by this function. If you will use those returned events, you should
   * set emitCachedEvents to false to prevent seeing them as duplicate events.
   */
  start(e = !0) {
    let t;
    const r = (o) => {
      if (e)
        for (const a of o)
          (!this.mostRecentCacheEventTimestamp || a.created_at > this.mostRecentCacheEventTimestamp) && (this.mostRecentCacheEventTimestamp = a.created_at), this.eventReceived(a, void 0, !0, !1);
      else {
        t = [];
        for (const a of o) {
          (!this.mostRecentCacheEventTimestamp || a.created_at > this.mostRecentCacheEventTimestamp) && (this.mostRecentCacheEventTimestamp = a.created_at), a.ndk = this.ndk;
          const c = this.opts.wrap ? wrapEvent(a) : a;
          if (!c) break;
          if (c instanceof Promise) {
            c.then((l) => {
              this.emitEvent(!1, l, void 0, !0, !1);
            });
            break;
          }
          this.eventFirstSeen.set(c.id, Date.now()), t.push(c);
        }
      }
    }, s = () => {
      this.shouldQueryRelays() ? (this.startWithRelays(), this.startPoolMonitor()) : this.emit("eose", this);
    };
    return this.shouldQueryCache() ? (t = this.startWithCache(), t instanceof Promise ? this.shouldWaitForCache() ? (t.then((o) => {
      if (r(o), queryFullyFilled(this)) {
        this.emit("eose", this);
        return;
      }
      s();
    }), null) : (t.then((o) => {
      r(o);
    }), s(), null) : (r(t), queryFullyFilled(this) ? this.emit("eose", this) : s(), t)) : (s(), null);
  }
  /**
   * We want to monitor for new relays that are coming online, in case
   * they should be part of this subscription.
   */
  startPoolMonitor() {
    this.debug.extend("pool-monitor"), this.poolMonitor = (e) => {
      var r, s;
      if ((r = this.relayFilters) != null && r.has(e.url)) return;
      calculateRelaySetsFromFilters(this.ndk, this.filters, this.pool).get(e.url) && ((s = this.relayFilters) == null || s.set(e.url, this.filters), e.subscribe(this, this.filters));
    }, this.pool.on("relay:connect", this.poolMonitor);
  }
  stop() {
    var e;
    this.emit("close", this), this.poolMonitor && this.pool.off("relay:connect", this.poolMonitor), (e = this.onStopped) == null || e.call(this);
  }
  /**
   * @returns Whether the subscription has an authors filter.
   */
  hasAuthorsFilter() {
    return this.filters.some((e) => {
      var t;
      return (t = e.authors) == null ? void 0 : t.length;
    });
  }
  startWithCache() {
    var e;
    return (e = this.ndk.cacheAdapter) != null && e.query ? this.ndk.cacheAdapter.query(this) : [];
  }
  /**
   * Find available relays that should be part of this subscription and execute in them.
   *
   * Note that this is executed in addition to using the pool monitor, so even if the relay set
   * that is computed (i.e. we don't have any relays available), when relays come online, we will
   * check if we need to execute in them.
   */
  startWithRelays() {
    let e = this.filters;
    if (this.opts.addSinceFromCache && this.mostRecentCacheEventTimestamp) {
      const t = this.mostRecentCacheEventTimestamp + 1;
      e = e.map((r) => ({
        ...r,
        since: Math.max(r.since || 0, t)
      }));
    }
    if (!this.relaySet || this.relaySet.relays.size === 0)
      this.relayFilters = calculateRelaySetsFromFilters(this.ndk, e, this.pool);
    else {
      this.relayFilters = /* @__PURE__ */ new Map();
      for (const t of this.relaySet.relays)
        this.relayFilters.set(t.url, e);
    }
    for (const [t, r] of this.relayFilters)
      this.pool.getRelay(t, !0, !0, r).subscribe(this, r);
  }
  // EVENT handling
  /**
   * Called when an event is received from a relay or the cache
   * @param event
   * @param relay
   * @param fromCache Whether the event was received from the cache
   * @param optimisticPublish Whether this event is coming from an optimistic publish
   */
  eventReceived(e, t, r = !1, s = !1) {
    var l;
    const o = e.id, a = this.eventFirstSeen.has(o);
    let c;
    if (e instanceof NDKEvent && (c = e), a) {
      const u = Date.now() - (this.eventFirstSeen.get(o) || 0);
      if (this.emit("event:dup", e, t, u, this, r, s), t) {
        const h = verifiedSignatures.get(o);
        h && typeof h == "string" && e.sig === h && t.addValidatedEvent();
      }
    } else {
      if (c ?? (c = new NDKEvent(this.ndk, e)), c.ndk = this.ndk, c.relay = t, !r && !s) {
        if (!this.skipValidation && !c.isValid) {
          this.debug("Event failed validation %s from relay %s", o, t == null ? void 0 : t.url);
          return;
        }
        if (t)
          if ((t == null ? void 0 : t.shouldValidateEvent()) !== !1) {
            if (!this.skipVerification) {
              if (!c.verifySignature(!0) && !this.ndk.asyncSigVerification) {
                this.debug("Event failed signature validation", e);
                return;
              }
              t && t.addValidatedEvent();
            }
          } else
            t.addNonValidatedEvent();
        this.ndk.cacheAdapter && !this.opts.dontSaveToCache && this.ndk.cacheAdapter.setEvent(c, this.filters, t);
      }
      (!s || this.skipOptimisticPublishEvent !== !0) && (this.emitEvent(((l = this.opts) == null ? void 0 : l.wrap) ?? !1, c, t, r, s), this.eventFirstSeen.set(o, Date.now()));
    }
    this.lastEventReceivedAt = Date.now();
  }
  /**
   * Optionally wraps, sync or async, and emits the event (if one comes back from the wrapper)
   */
  emitEvent(e, t, r, s, o) {
    const a = e ? wrapEvent(t) : t;
    a instanceof Promise ? a.then((c) => this.emitEvent(!1, c, r, s, o)) : a && this.emit("event", a, r, this, s, o);
  }
  closedReceived(e, t) {
    this.emit("closed", e, t);
  }
  eoseReceived(e) {
    var a;
    this.debug("EOSE received from %s", e.url), this.eosesSeen.add(e);
    let t = this.lastEventReceivedAt ? Date.now() - this.lastEventReceivedAt : void 0;
    const r = this.eosesSeen.size === ((a = this.relayFilters) == null ? void 0 : a.size), s = queryFullyFilled(this), o = (c) => {
      var l;
      this.debug("Performing EOSE: %s %d", c, this.eosed), !this.eosed && (this.eoseTimeout && clearTimeout(this.eoseTimeout), this.emit("eose", this), this.eosed = !0, (l = this.opts) != null && l.closeOnEose && this.stop());
    };
    if (s || r)
      o("query filled or seen all");
    else if (this.relayFilters) {
      let c = 1e3;
      const l = new Set(this.pool.connectedRelays().map((f) => f.url)), u = Array.from(this.relayFilters.keys()).filter(
        (f) => l.has(f)
      );
      if (u.length === 0) {
        this.debug(
          "No connected relays, waiting for all relays to connect",
          Array.from(this.relayFilters.keys()).join(", ")
        );
        return;
      }
      const h = this.eosesSeen.size / u.length;
      if (this.debug("Percentage of relays that have sent EOSE", {
        subId: this.subId,
        percentageOfRelaysThatHaveSentEose: h,
        seen: this.eosesSeen.size,
        total: u.length
      }), this.eosesSeen.size >= 2 && h >= 0.5) {
        if (c = c * (1 - h), c === 0) {
          o("time to wait was 0");
          return;
        }
        this.eoseTimeout && clearTimeout(this.eoseTimeout);
        const f = () => {
          t = this.lastEventReceivedAt ? Date.now() - this.lastEventReceivedAt : void 0, t !== void 0 && t < 20 ? this.eoseTimeout = setTimeout(f, c) : o(`send eose timeout: ${c}`);
        };
        this.eoseTimeout = setTimeout(f, c);
      }
    }
  }
}, kindIsEphemeral = (n) => n >= 2e4 && n < 3e4;
async function follows(n, e, t = 3) {
  var s, o;
  if (!this.ndk) throw new Error("NDK not set");
  const r = await this.ndk.fetchEvent(
    { kinds: [t], authors: [this.pubkey] },
    n || { groupable: !1 }
  );
  if (r) {
    const a = /* @__PURE__ */ new Set();
    return r.tags.forEach((c) => {
      c[0] === "p" && a.add(c[1]);
    }), e && ((o = (s = this.ndk) == null ? void 0 : s.outboxTracker) == null || o.trackUsers(Array.from(a))), [...a].reduce((c, l) => {
      const u = new NDKUser({ pubkey: l });
      return u.ndk = this.ndk, c.add(u), c;
    }, /* @__PURE__ */ new Set());
  }
  return /* @__PURE__ */ new Set();
}
var NIP05_REGEX = /^(?:([\w.+-]+)@)?([\w.-]+)$/;
async function getNip05For(n, e, t = fetch, r = {}) {
  return await n.queuesNip05.add({
    id: e,
    func: async () => {
      var l, u, h;
      if ((l = n.cacheAdapter) != null && l.loadNip05) {
        const f = await n.cacheAdapter.loadNip05(e);
        if (f !== "missing") {
          if (f) {
            const p = new NDKUser({
              pubkey: f.pubkey,
              relayUrls: f.relays,
              nip46Urls: f.nip46
            });
            return p.ndk = n, p;
          }
          if (r.cache !== "no-cache")
            return null;
        }
      }
      const s = e.match(NIP05_REGEX);
      if (!s) return null;
      const [o, a = "_", c] = s;
      try {
        const f = await t(`https://${c}/.well-known/nostr.json?name=${a}`, r), { names: p, relays: m, nip46: E } = parseNIP05Result(await f.json()), g = p[a.toLowerCase()];
        let b = null;
        return g && (b = { pubkey: g, relays: m == null ? void 0 : m[g], nip46: E == null ? void 0 : E[g] }), (u = n == null ? void 0 : n.cacheAdapter) != null && u.saveNip05 && n.cacheAdapter.saveNip05(e, b), b;
      } catch (f) {
        return (h = n == null ? void 0 : n.cacheAdapter) != null && h.saveNip05 && (n == null || n.cacheAdapter.saveNip05(e, null)), console.error("Failed to fetch NIP05 for", e, f), null;
      }
    }
  });
}
function parseNIP05Result(n) {
  const e = {
    names: {}
  };
  for (const [t, r] of Object.entries(n.names))
    typeof t == "string" && typeof r == "string" && (e.names[t.toLowerCase()] = r);
  if (n.relays) {
    e.relays = {};
    for (const [t, r] of Object.entries(n.relays))
      typeof t == "string" && Array.isArray(r) && (e.relays[t] = r.filter((s) => typeof s == "string"));
  }
  if (n.nip46) {
    e.nip46 = {};
    for (const [t, r] of Object.entries(n.nip46))
      typeof t == "string" && Array.isArray(r) && (e.nip46[t] = r.filter((s) => typeof s == "string"));
  }
  return e;
}
function profileFromEvent(n) {
  const e = {};
  let t;
  try {
    t = JSON.parse(n.content);
  } catch (r) {
    throw new Error(`Failed to parse profile event: ${r}`);
  }
  e.created_at = n.created_at, e.profileEvent = JSON.stringify(n.rawEvent());
  for (const r of Object.keys(t))
    switch (r) {
      case "name":
        e.name = t.name;
        break;
      case "display_name":
        e.displayName = t.display_name;
        break;
      case "image":
      case "picture":
        e.picture = t.picture || t.image, e.image = e.picture;
        break;
      case "banner":
        e.banner = t.banner;
        break;
      case "bio":
        e.bio = t.bio;
        break;
      case "nip05":
        e.nip05 = t.nip05;
        break;
      case "lud06":
        e.lud06 = t.lud06;
        break;
      case "lud16":
        e.lud16 = t.lud16;
        break;
      case "about":
        e.about = t.about;
        break;
      case "website":
        e.website = t.website;
        break;
      default:
        e[r] = t[r];
        break;
    }
  return e;
}
function serializeProfile(n) {
  const e = {};
  for (const [t, r] of Object.entries(n))
    switch (t) {
      case "username":
      case "name":
        e.name = r;
        break;
      case "displayName":
        e.display_name = r;
        break;
      case "image":
      case "picture":
        e.picture = r;
        break;
      case "bio":
      case "about":
        e.about = r;
        break;
      default:
        e[t] = r;
        break;
    }
  return JSON.stringify(e);
}
var NDKUser = class Ae {
  constructor(e) {
    y(this, "ndk");
    y(this, "profile");
    y(this, "profileEvent");
    y(this, "_npub");
    y(this, "_pubkey");
    y(this, "relayUrls", []);
    y(this, "nip46Urls", []);
    /**
     * Returns a set of users that this user follows.
     *
     * @deprecated Use followSet instead
     */
    y(this, "follows", follows.bind(this));
    if (e.npub && (this._npub = e.npub), e.hexpubkey && (this._pubkey = e.hexpubkey), e.pubkey && (this._pubkey = e.pubkey), e.relayUrls && (this.relayUrls = e.relayUrls), e.nip46Urls && (this.nip46Urls = e.nip46Urls), e.nprofile)
      try {
        const t = nip19_exports.decode(e.nprofile);
        t.type === "nprofile" && (this._pubkey = t.data.pubkey, t.data.relays && t.data.relays.length > 0 && this.relayUrls.push(...t.data.relays));
      } catch (t) {
        console.error("Failed to decode nprofile", t);
      }
  }
  get npub() {
    if (!this._npub) {
      if (!this._pubkey) throw new Error("pubkey not set");
      this._npub = nip19_exports.npubEncode(this.pubkey);
    }
    return this._npub;
  }
  get nprofile() {
    var t, r;
    const e = (r = (t = this.profileEvent) == null ? void 0 : t.onRelays) == null ? void 0 : r.map((s) => s.url);
    return nip19_exports.nprofileEncode({
      pubkey: this.pubkey,
      relays: e
    });
  }
  set npub(e) {
    this._npub = e;
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
  set pubkey(e) {
    this._pubkey = e;
  }
  /**
   * Equivalent to NDKEvent.filters().
   * @returns {NDKFilter}
   */
  filter() {
    return { "#p": [this.pubkey] };
  }
  /**
   * Gets NIP-57 and NIP-61 information that this user has signaled
   *
   * @param getAll {boolean} Whether to get all zap info or just the first one
   */
  async getZapInfo(e) {
    if (!this.ndk) throw new Error("No NDK instance found");
    const t = async (a) => {
      if (!e) return a;
      let c;
      const l = new Promise((u, h) => {
        c = setTimeout(() => h(new Error("Timeout")), e);
      });
      try {
        const u = await Promise.race([a, l]);
        return c && clearTimeout(c), u;
      } catch (u) {
        if (u instanceof Error && u.message === "Timeout")
          try {
            return await a;
          } catch {
            return;
          }
        return;
      }
    }, [r, s] = await Promise.all([
      t(this.fetchProfile()),
      t(this.ndk.fetchEvent({ kinds: [
        10019
        /* CashuMintList */
      ], authors: [this.pubkey] }))
    ]), o = /* @__PURE__ */ new Map();
    if (s) {
      const a = NDKCashuMintList.from(s);
      a.mints.length > 0 && o.set("nip61", {
        mints: a.mints,
        relays: a.relays,
        p2pk: a.p2pk
      });
    }
    if (r) {
      const { lud06: a, lud16: c } = r;
      o.set("nip57", { lud06: a, lud16: c });
    }
    return o;
  }
  /**
   * Instantiate an NDKUser from a NIP-05 string
   * @param nip05Id {string} The user's NIP-05
   * @param ndk {NDK} An NDK instance
   * @param skipCache {boolean} Whether to skip the cache or not
   * @returns {NDKUser | undefined} An NDKUser if one is found for the given NIP-05, undefined otherwise.
   */
  static async fromNip05(e, t, r = !1) {
    if (!t) throw new Error("No NDK instance found");
    const s = {};
    r && (s.cache = "no-cache");
    const o = await getNip05For(t, e, t == null ? void 0 : t.httpFetch, s);
    if (o) {
      const a = new Ae({
        pubkey: o.pubkey,
        relayUrls: o.relays,
        nip46Urls: o.nip46
      });
      return a.ndk = t, a;
    }
  }
  /**
   * Fetch a user's profile
   * @param opts {NDKSubscriptionOptions} A set of NDKSubscriptionOptions
   * @param storeProfileEvent {boolean} Whether to store the profile event or not
   * @returns User Profile
   */
  async fetchProfile(e, t = !1) {
    if (!this.ndk) throw new Error("NDK not set");
    let r = null;
    if (this.ndk.cacheAdapter && (this.ndk.cacheAdapter.fetchProfile || this.ndk.cacheAdapter.fetchProfileSync) && (e == null ? void 0 : e.cacheUsage) !== "ONLY_RELAY") {
      let s = null;
      if (this.ndk.cacheAdapter.fetchProfileSync ? s = this.ndk.cacheAdapter.fetchProfileSync(this.pubkey) : this.ndk.cacheAdapter.fetchProfile && (s = await this.ndk.cacheAdapter.fetchProfile(this.pubkey)), s)
        return this.profile = s, s;
    }
    return e ?? (e = {}), e.cacheUsage ?? (e.cacheUsage = "ONLY_RELAY"), e.closeOnEose ?? (e.closeOnEose = !0), e.groupable ?? (e.groupable = !0), e.groupableDelay ?? (e.groupableDelay = 250), r || (r = await this.ndk.fetchEvent({ kinds: [0], authors: [this.pubkey] }, e)), r ? (this.profile = profileFromEvent(r), t && this.profile && this.ndk.cacheAdapter && this.ndk.cacheAdapter.saveProfile && this.ndk.cacheAdapter.saveProfile(this.pubkey, this.profile), this.profile) : null;
  }
  /**
   * Returns a set of pubkeys that this user follows.
   *
   * @param opts - NDKSubscriptionOptions
   * @param outbox - boolean
   * @param kind - number
   */
  async followSet(e, t, r = 3) {
    const s = await this.follows(e, t, r);
    return new Set(Array.from(s).map((o) => o.pubkey));
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
  referenceTags(e) {
    const t = [["p", this.pubkey]];
    return e && t[0].push("", e), t;
  }
  /**
   * Publishes the current profile.
   */
  async publish() {
    if (!this.ndk) throw new Error("No NDK instance found");
    if (!this.profile) throw new Error("No profile available");
    this.ndk.assertSigner(), await new NDKEvent(this.ndk, {
      kind: 0,
      content: serializeProfile(this.profile)
    }).publish();
  }
  /**
   * Add a follow to this user's contact list
   *
   * @param newFollow {NDKUser} The user to follow
   * @param currentFollowList {Set<NDKUser>} The current follow list
   * @param kind {NDKKind} The kind to use for this contact list (defaults to `3`)
   * @returns {Promise<boolean>} True if the follow was added, false if the follow already exists
   */
  async follow(e, t, r = 3) {
    if (!this.ndk) throw new Error("No NDK instance found");
    if (this.ndk.assertSigner(), t || (t = await this.follows(void 0, void 0, r)), t.has(e))
      return !1;
    t.add(e);
    const s = new NDKEvent(this.ndk, { kind: r });
    for (const o of t)
      s.tag(o);
    return await s.publish(), !0;
  }
  /**
   * Remove a follow from this user's contact list
   *
   * @param user {NDKUser} The user to unfollow
   * @param currentFollowList {Set<NDKUser>} The current follow list
   * @param kind {NDKKind} The kind to use for this contact list (defaults to `3`)
   * @returns The relays were the follow list was published or false if the user wasn't found
   */
  async unfollow(e, t, r = 3) {
    if (!this.ndk) throw new Error("No NDK instance found");
    this.ndk.assertSigner(), t || (t = await this.follows(void 0, void 0, r));
    const s = /* @__PURE__ */ new Set();
    let o = !1;
    for (const c of t)
      c.pubkey !== e.pubkey ? s.add(c) : o = !0;
    if (!o) return !1;
    const a = new NDKEvent(this.ndk, { kind: r });
    for (const c of s)
      a.tag(c);
    return await a.publish();
  }
  /**
   * Validate a user's NIP-05 identifier (usually fetched from their kind:0 profile data)
   *
   * @param nip05Id The NIP-05 string to validate
   * @returns {Promise<boolean | null>} True if the NIP-05 is found and matches this user's pubkey,
   * False if the NIP-05 is found but doesn't match this user's pubkey,
   * null if the NIP-05 isn't found on the domain or we're unable to verify (because of network issues, etc.)
   */
  async validateNip05(e) {
    if (!this.ndk) throw new Error("No NDK instance found");
    const t = await getNip05For(this.ndk, e);
    return t === null ? null : t.pubkey === this.pubkey;
  }
}, READ_MARKER = "read", WRITE_MARKER = "write", NDKRelayList = class Re extends NDKEvent {
  constructor(e, t) {
    super(e, t), this.kind ?? (this.kind = 10002);
  }
  static from(e) {
    return new Re(e.ndk, e.rawEvent());
  }
  get readRelayUrls() {
    return this.tags.filter((e) => e[0] === "r" || e[0] === "relay").filter((e) => !e[2] || e[2] && e[2] === READ_MARKER).map((e) => tryNormalizeRelayUrl(e[1])).filter((e) => !!e);
  }
  set readRelayUrls(e) {
    for (const t of e)
      this.tags.push(["r", t, READ_MARKER]);
  }
  get writeRelayUrls() {
    return this.tags.filter((e) => e[0] === "r" || e[0] === "relay").filter((e) => !e[2] || e[2] && e[2] === WRITE_MARKER).map((e) => tryNormalizeRelayUrl(e[1])).filter((e) => !!e);
  }
  set writeRelayUrls(e) {
    for (const t of e)
      this.tags.push(["r", t, WRITE_MARKER]);
  }
  get bothRelayUrls() {
    return this.tags.filter((e) => e[0] === "r" || e[0] === "relay").filter((e) => !e[2]).map((e) => e[1]);
  }
  set bothRelayUrls(e) {
    for (const t of e)
      this.tags.push(["r", t]);
  }
  get relays() {
    return this.tags.filter((e) => e[0] === "r" || e[0] === "relay").map((e) => e[1]);
  }
  /**
   * Provides a relaySet for the relays in this list.
   */
  get relaySet() {
    if (!this.ndk) throw new Error("NDKRelayList has no NDK instance");
    return new NDKRelaySet(
      new Set(this.relays.map((e) => {
        var t;
        return (t = this.ndk) == null ? void 0 : t.pool.getRelay(e);
      }).filter((e) => !!e)),
      this.ndk
    );
  }
};
function relayListFromKind3(n, e) {
  try {
    const t = JSON.parse(e.content), r = new NDKRelayList(n), s = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
    for (let [a, c] of Object.entries(t)) {
      try {
        a = normalizeRelayUrl(a);
      } catch {
        continue;
      }
      if (!c)
        s.add(a), o.add(a);
      else {
        const l = c;
        l.write && o.add(a), l.read && s.add(a);
      }
    }
    return r.readRelayUrls = Array.from(s), r.writeRelayUrls = Array.from(o), r;
  } catch {
  }
}
var NDKPrivateKeySigner = class ke {
  /**
   * Create a new signer from a private key.
   * @param privateKey - The private key to use in hex form or nsec.
   * @param ndk - The NDK instance to use.
   */
  constructor(e, t) {
    y(this, "_user");
    y(this, "_privateKey");
    y(this, "_pubkey");
    if (typeof e == "string")
      if (e.startsWith("nsec1")) {
        const { type: r, data: s } = nip19_exports.decode(e);
        if (r === "nsec") this._privateKey = s;
        else throw new Error("Invalid private key provided.");
      } else if (e.length === 64)
        this._privateKey = hexToBytes$1(e);
      else
        throw new Error("Invalid private key provided.");
    else
      this._privateKey = e;
    this._pubkey = getPublicKey(this._privateKey), t && (this._user = t.getUser({ pubkey: this._pubkey })), this._user ?? (this._user = new NDKUser({ pubkey: this._pubkey }));
  }
  /**
   * Get the private key in hex form.
   */
  get privateKey() {
    if (!this._privateKey) throw new Error("Not ready");
    return bytesToHex$1(this._privateKey);
  }
  /**
   * Get the public key in hex form.
   */
  get pubkey() {
    if (!this._pubkey) throw new Error("Not ready");
    return this._pubkey;
  }
  /**
   * Get the private key in nsec form.
   */
  get nsec() {
    if (!this._privateKey) throw new Error("Not ready");
    return nip19_exports.nsecEncode(this._privateKey);
  }
  /**
   * Get the public key in npub form.
   */
  get npub() {
    if (!this._pubkey) throw new Error("Not ready");
    return nip19_exports.npubEncode(this._pubkey);
  }
  /**
   * Generate a new private key.
   */
  static generate() {
    const e = generateSecretKey();
    return new ke(e);
  }
  /**
   * Noop in NDKPrivateKeySigner.
   */
  async blockUntilReady() {
    return this._user;
  }
  /**
   * Get the user.
   */
  async user() {
    return this._user;
  }
  /**
   * Get the user.
   */
  get userSync() {
    return this._user;
  }
  async sign(e) {
    if (!this._privateKey)
      throw Error("Attempted to sign without a private key");
    return finalizeEvent(e, this._privateKey).sig;
  }
  async encryptionEnabled(e) {
    const t = [];
    return (!e || e === "nip04") && t.push("nip04"), (!e || e === "nip44") && t.push("nip44"), t;
  }
  async encrypt(e, t, r) {
    if (!this._privateKey || !this.privateKey)
      throw Error("Attempted to encrypt without a private key");
    const s = e.pubkey;
    if (r === "nip44") {
      const o = nip44_exports.v2.utils.getConversationKey(this._privateKey, s);
      return await nip44_exports.v2.encrypt(t, o);
    }
    return await nip04_exports.encrypt(this._privateKey, s, t);
  }
  async decrypt(e, t, r) {
    if (!this._privateKey || !this.privateKey)
      throw Error("Attempted to decrypt without a private key");
    const s = e.pubkey;
    if (r === "nip44") {
      const o = nip44_exports.v2.utils.getConversationKey(this._privateKey, s);
      return await nip44_exports.v2.decrypt(t, o);
    }
    return await nip04_exports.decrypt(this._privateKey, s, t);
  }
  /**
   * Serializes the signer's private key into a storable format.
   * @returns A JSON string containing the type and the hex private key.
   */
  toPayload() {
    if (!this._privateKey) throw new Error("Private key not available");
    const e = {
      type: "private-key",
      payload: this.privateKey
      // Use the hex private key
    };
    return JSON.stringify(e);
  }
  /**
   * Deserializes the signer from a payload string.
   * @param payloadString The JSON string obtained from toPayload().
   * @param ndk Optional NDK instance.
   * @returns An instance of NDKPrivateKeySigner.
   */
  static async fromPayload(e, t) {
    const r = JSON.parse(e);
    if (r.type !== "private-key")
      throw new Error(`Invalid payload type: expected 'private-key', got ${r.type}`);
    if (!r.payload || typeof r.payload != "string")
      throw new Error("Invalid payload content for private-key signer");
    return new ke(r.payload, t);
  }
};
function disconnect(n, e) {
  return e ?? (e = createDebug5("ndk:relay:auth-policies:disconnect")), async (t) => {
    e == null || e(`Relay ${t.url} requested authentication, disconnecting`), n.removeRelay(t.url);
  };
}
async function signAndAuth(n, e, t, r, s, o) {
  try {
    await n.sign(t), s(n);
  } catch (a) {
    r == null || r(`Failed to publish auth event to relay ${e.url}`, a), o(n);
  }
}
function signIn({ ndk: n, signer: e, debug: t } = {}) {
  return t ?? (t = createDebug5("ndk:auth-policies:signIn")), async (r, s) => {
    t == null || t(`Relay ${r.url} requested authentication, signing in`);
    const o = new NDKEvent(n);
    return o.kind = 22242, o.tags = [
      ["relay", r.url],
      ["challenge", s]
    ], e ?? (e = n == null ? void 0 : n.signer), new Promise(async (a, c) => {
      e ? await signAndAuth(o, r, e, t, a, c) : n == null || n.once("signer:ready", async (l) => {
        await signAndAuth(o, r, l, t, a, c);
      });
    });
  };
}
var NDKRelayAuthPolicies = {
  disconnect,
  signIn
}, NDKNip07Signer = class Ce {
  /**
   * @param waitTimeout - The timeout in milliseconds to wait for the NIP-07 to become available
   */
  constructor(e = 1e3, t) {
    y(this, "_userPromise");
    y(this, "encryptionQueue", []);
    y(this, "encryptionProcessing", !1);
    y(this, "debug");
    y(this, "waitTimeout");
    y(this, "_pubkey");
    y(this, "ndk");
    y(this, "_user");
    this.debug = createDebug5("ndk:nip07"), this.waitTimeout = e, this.ndk = t;
  }
  get pubkey() {
    if (!this._pubkey) throw new Error("Not ready");
    return this._pubkey;
  }
  async blockUntilReady() {
    var r;
    await this.waitForExtension();
    const e = await ((r = window.nostr) == null ? void 0 : r.getPublicKey());
    if (!e)
      throw new Error("User rejected access");
    this._pubkey = e;
    let t;
    return this.ndk ? t = this.ndk.getUser({ pubkey: e }) : t = new NDKUser({ pubkey: e }), this._user = t, t;
  }
  /**
   * Getter for the user property.
   * @returns The NDKUser instance.
   */
  async user() {
    return this._userPromise || (this._userPromise = this.blockUntilReady()), this._userPromise;
  }
  get userSync() {
    if (!this._user) throw new Error("User not ready");
    return this._user;
  }
  /**
   * Signs the given Nostr event.
   * @param event - The Nostr event to be signed.
   * @returns The signature of the signed event.
   * @throws Error if the NIP-07 is not available on the window object.
   */
  async sign(e) {
    var r;
    await this.waitForExtension();
    const t = await ((r = window.nostr) == null ? void 0 : r.signEvent(e));
    if (!t) throw new Error("Failed to sign event");
    return t.sig;
  }
  async relays(e) {
    var s, o;
    await this.waitForExtension();
    const t = await ((o = (s = window.nostr) == null ? void 0 : s.getRelays) == null ? void 0 : o.call(s)) || {}, r = [];
    for (const a of Object.keys(t))
      t[a].read && t[a].write && r.push(a);
    return r.map((a) => new NDKRelay(a, e == null ? void 0 : e.relayAuthDefaultPolicy, e));
  }
  async encryptionEnabled(e) {
    var r, s;
    const t = [];
    return (!e || e === "nip04") && ((r = window.nostr) != null && r.nip04) && t.push("nip04"), (!e || e === "nip44") && ((s = window.nostr) != null && s.nip44) && t.push("nip44"), t;
  }
  async encrypt(e, t, r = "nip04") {
    if (!await this.encryptionEnabled(r))
      throw new Error(`${r}encryption is not available from your browser extension`);
    await this.waitForExtension();
    const s = e.pubkey;
    return this.queueEncryption(r, "encrypt", s, t);
  }
  async decrypt(e, t, r = "nip04") {
    if (!await this.encryptionEnabled(r))
      throw new Error(`${r}encryption is not available from your browser extension`);
    await this.waitForExtension();
    const s = e.pubkey;
    return this.queueEncryption(r, "decrypt", s, t);
  }
  async queueEncryption(e, t, r, s) {
    return new Promise((o, a) => {
      this.encryptionQueue.push({
        scheme: e,
        method: t,
        counterpartyHexpubkey: r,
        value: s,
        resolve: o,
        reject: a
      }), this.encryptionProcessing || this.processEncryptionQueue();
    });
  }
  async processEncryptionQueue(e, t = 0) {
    var h, f;
    if (!e && this.encryptionQueue.length === 0) {
      this.encryptionProcessing = !1;
      return;
    }
    this.encryptionProcessing = !0;
    const r = e || this.encryptionQueue.shift();
    if (!r) {
      this.encryptionProcessing = !1;
      return;
    }
    const { scheme: s, method: o, counterpartyHexpubkey: a, value: c, resolve: l, reject: u } = r;
    this.debug("Processing encryption queue item", {
      method: o,
      counterpartyHexpubkey: a,
      value: c
    });
    try {
      const p = await ((f = (h = window.nostr) == null ? void 0 : h[s]) == null ? void 0 : f[o](a, c));
      if (!p) throw new Error("Failed to encrypt/decrypt");
      l(p);
    } catch (p) {
      const m = p instanceof Error ? p.message : String(p);
      if (m.includes("call already executing") && t < 5) {
        this.debug("Retrying encryption queue item", {
          method: o,
          counterpartyHexpubkey: a,
          value: c,
          retries: t
        }), setTimeout(() => {
          this.processEncryptionQueue(r, t + 1);
        }, 50 * t);
        return;
      }
      u(p instanceof Error ? p : new Error(m));
    }
    this.processEncryptionQueue();
  }
  waitForExtension() {
    return new Promise((e, t) => {
      if (window.nostr) {
        e();
        return;
      }
      let r;
      const s = setInterval(() => {
        window.nostr && (clearTimeout(r), clearInterval(s), e());
      }, 100);
      r = setTimeout(() => {
        clearInterval(s), t(new Error("NIP-07 extension not available"));
      }, this.waitTimeout);
    });
  }
  /**
   * Serializes the signer type into a storable format.
   * NIP-07 signers don't have persistent state to serialize beyond their type.
   * @returns A JSON string containing the type.
   */
  toPayload() {
    return JSON.stringify({
      type: "nip07",
      payload: ""
      // No specific payload needed for NIP-07
    });
  }
  /**
   * Deserializes the signer from a payload string.
   * Creates a new NDKNip07Signer instance.
   * @param payloadString The JSON string obtained from toPayload().
   * @param ndk Optional NDK instance.
   * @returns An instance of NDKNip07Signer.
   */
  static async fromPayload(e, t) {
    const r = JSON.parse(e);
    if (r.type !== "nip07")
      throw new Error(`Invalid payload type: expected 'nip07', got ${r.type}`);
    return new Ce(void 0, t);
  }
}, NDKNostrRpc = class extends lib$1.EventEmitter {
  constructor(e, t, r, s) {
    super();
    y(this, "ndk");
    y(this, "signer");
    y(this, "relaySet");
    y(this, "debug");
    y(this, "encryptionType", "nip04");
    y(this, "pool");
    if (this.ndk = e, this.signer = t, s) {
      this.pool = new NDKPool(s, [], e, {
        debug: r.extend("rpc-pool"),
        name: "Nostr RPC"
      }), this.relaySet = new NDKRelaySet(/* @__PURE__ */ new Set(), e, this.pool);
      for (const o of s) {
        const a = this.pool.getRelay(o, !1, !1);
        a.authPolicy = NDKRelayAuthPolicies.signIn({ ndk: e, signer: t, debug: r }), this.relaySet.addRelay(a), a.connect();
      }
    }
    this.debug = r.extend("rpc");
  }
  /**
   * Subscribe to a filter. This function will resolve once the subscription is ready.
   */
  subscribe(e) {
    const t = this.ndk.subscribe(
      e,
      {
        closeOnEose: !1,
        groupable: !1,
        cacheUsage: "ONLY_RELAY",
        pool: this.pool,
        relaySet: this.relaySet
      },
      !1
    );
    return t.on("event", async (r) => {
      try {
        const s = await this.parseEvent(r);
        s.method ? this.emit("request", s) : this.emit(`response-${s.id}`, s);
      } catch (s) {
        this.debug("error parsing event", s, r.rawEvent());
      }
    }), new Promise((r) => {
      t.on("eose", () => {
        this.debug("eosed"), r(t);
      }), t.start();
    });
  }
  async parseEvent(e) {
    this.encryptionType === "nip44" && e.content.includes("?iv=") ? this.encryptionType = "nip04" : this.encryptionType === "nip04" && !e.content.includes("?iv=") && (this.encryptionType = "nip44");
    const t = this.ndk.getUser({ pubkey: e.pubkey });
    t.ndk = this.ndk;
    let r;
    try {
      r = await this.signer.decrypt(t, e.content, this.encryptionType);
    } catch {
      const f = this.encryptionType === "nip04" ? "nip44" : "nip04";
      r = await this.signer.decrypt(t, e.content, f), this.encryptionType = f;
    }
    const s = JSON.parse(r), { id: o, method: a, params: c, result: l, error: u } = s;
    return a ? { id: o, pubkey: e.pubkey, method: a, params: c, event: e } : { id: o, result: l, error: u, event: e };
  }
  async sendResponse(e, t, r, s = 24133, o) {
    const a = { id: e, result: r };
    o && (a.error = o);
    const c = await this.signer.user(), l = this.ndk.getUser({ pubkey: t }), u = new NDKEvent(this.ndk, {
      kind: s,
      content: JSON.stringify(a),
      tags: [["p", t]],
      pubkey: c.pubkey
    });
    u.content = await this.signer.encrypt(l, u.content, this.encryptionType), await u.sign(this.signer), await u.publish(this.relaySet);
  }
  /**
   * Sends a request.
   * @param remotePubkey
   * @param method
   * @param params
   * @param kind
   * @param id
   */
  async sendRequest(e, t, r = [], s = 24133, o) {
    const a = Math.random().toString(36).substring(7), c = await this.signer.user(), l = this.ndk.getUser({ pubkey: e }), u = { id: a, method: t, params: r }, h = new Promise(() => {
      const p = (m) => {
        m.result === "auth_url" ? (this.once(`response-${a}`, p), this.emit("authUrl", m.error)) : o && o(m);
      };
      this.once(`response-${a}`, p);
    }), f = new NDKEvent(this.ndk, {
      kind: s,
      content: JSON.stringify(u),
      tags: [["p", e]],
      pubkey: c.pubkey
    });
    return f.content = await this.signer.encrypt(l, f.content, this.encryptionType), await f.sign(this.signer), await f.publish(this.relaySet), h;
  }
}, signerRegistry = /* @__PURE__ */ new Map();
signerRegistry.set("private-key", NDKPrivateKeySigner);
signerRegistry.set("nip07", NDKNip07Signer);
signerRegistry.set("nip46", NDKNip46Signer);
async function ndkSignerFromPayload(n, e) {
  let t;
  try {
    t = JSON.parse(n);
  } catch (s) {
    throw new Error(`Failed to parse signer payload: ${s instanceof Error ? s.message : String(s)}`);
  }
  const r = signerRegistry.get(t.type);
  if (!r)
    throw new Error(`Unknown signer type: ${t.type}`);
  try {
    return await r.fromPayload(n, e);
  } catch (s) {
    const o = s instanceof Error ? s.message : String(s);
    throw new Error(`Failed to deserialize signer type ${t.type}: ${o}`);
  }
}
var NDKNip46Signer = class xe extends lib$1.EventEmitter {
  /**
   * @param ndk - The NDK instance to use
   * @param userOrConnectionToken - The public key, or a connection token, of the npub that wants to be published as
   * @param localSigner - The signer that will be used to request events to be signed
   */
  constructor(t, r, s) {
    super();
    y(this, "ndk");
    y(this, "_user");
    /**
     * The pubkey of the bunker that will be providing signatures
     */
    y(this, "bunkerPubkey");
    /**
     * The pubkey of the user that events will be published as
     */
    y(this, "userPubkey");
    /**
     * An optional secret value provided to connect to the bunker
     */
    y(this, "secret");
    y(this, "localSigner");
    y(this, "nip05");
    y(this, "rpc");
    y(this, "debug");
    y(this, "relayUrls");
    y(this, "subscription");
    this.ndk = t, this.debug = t.debug.extend("nip46:signer"), r.startsWith("bunker://") ? this.connectionTokenInit(r) : this.nip05Init(r), s ? this.localSigner = s : this.localSigner = NDKPrivateKeySigner.generate(), this.rpc = new NDKNostrRpc(this.ndk, this.localSigner, this.debug, this.relayUrls);
  }
  get pubkey() {
    if (!this.userPubkey) throw new Error("Not ready");
    return this.userPubkey;
  }
  connectionTokenInit(t) {
    const r = new URL(t), s = r.hostname || r.pathname.replace(/^\/\//, ""), o = r.searchParams.get("pubkey"), a = r.searchParams.getAll("relay"), c = r.searchParams.get("secret");
    this.bunkerPubkey = s, this.userPubkey = o, this.relayUrls = a, this.secret = c;
  }
  nip05Init(t) {
    this.nip05 = t;
  }
  /**
   * We start listening for events from the bunker
   */
  async startListening() {
    if (this.subscription) return;
    const t = await this.localSigner.user();
    if (!t) throw new Error("Local signer not ready");
    this.subscription = await this.rpc.subscribe({
      kinds: [
        24133
        /* NostrConnect */
      ],
      "#p": [t.pubkey]
    });
  }
  /**
   * Get the user that is being published as
   */
  async user() {
    return this._user ? this._user : this.blockUntilReady();
  }
  get userSync() {
    if (!this._user) throw new Error("Remote user not ready synchronously");
    return this._user;
  }
  async blockUntilReady() {
    if (this.nip05 && !this.userPubkey) {
      const t = await NDKUser.fromNip05(this.nip05, this.ndk);
      t && (this._user = t, this.userPubkey = t.pubkey, this.relayUrls = t.nip46Urls, this.rpc = new NDKNostrRpc(this.ndk, this.localSigner, this.debug, this.relayUrls));
    }
    if (!this.bunkerPubkey && this.userPubkey)
      this.bunkerPubkey = this.userPubkey;
    else if (!this.bunkerPubkey)
      throw new Error("Bunker pubkey not set");
    return await this.startListening(), this.rpc.on("authUrl", (...t) => {
      this.emit("authUrl", ...t);
    }), new Promise((t, r) => {
      const s = [this.userPubkey ?? ""];
      if (this.secret && s.push(this.secret), !this.bunkerPubkey) throw new Error("Bunker pubkey not set");
      this.rpc.sendRequest(this.bunkerPubkey, "connect", s, 24133, (o) => {
        o.result === "ack" ? this.getPublicKey().then((a) => {
          this.userPubkey = a, this._user = this.ndk.getUser({ pubkey: a }), t(this._user);
        }) : r(o.error);
      });
    });
  }
  async getPublicKey() {
    return this.userPubkey ? this.userPubkey : new Promise((t, r) => {
      if (!this.bunkerPubkey) throw new Error("Bunker pubkey not set");
      this.rpc.sendRequest(this.bunkerPubkey, "get_public_key", [], 24133, (s) => {
        t(s.result);
      });
    });
  }
  async encryptionEnabled(t) {
    return t ? [t] : Promise.resolve(["nip04", "nip44"]);
  }
  async encrypt(t, r, s = "nip04") {
    return this.encryption(t, r, s, "encrypt");
  }
  async decrypt(t, r, s = "nip04") {
    return this.encryption(t, r, s, "decrypt");
  }
  async encryption(t, r, s, o) {
    return new Promise((c, l) => {
      if (!this.bunkerPubkey) throw new Error("Bunker pubkey not set");
      this.rpc.sendRequest(
        this.bunkerPubkey,
        `${s}_${o}`,
        [t.pubkey, r],
        24133,
        (u) => {
          u.error ? l(u.error) : c(u.result);
        }
      );
    });
  }
  async sign(t) {
    return new Promise((s, o) => {
      if (!this.bunkerPubkey) throw new Error("Bunker pubkey not set");
      this.rpc.sendRequest(
        this.bunkerPubkey,
        "sign_event",
        [JSON.stringify(t)],
        24133,
        (a) => {
          if (a.error)
            o(a.error);
          else {
            const c = JSON.parse(a.result);
            s(c.sig);
          }
        }
      );
    });
  }
  /**
   * Allows creating a new account on the remote server.
   * @param username Desired username for the NIP-05
   * @param domain Desired domain for the NIP-05
   * @param email Email address to associate with this account -- Remote servers may use this for recovery
   * @returns The public key of the newly created account
   */
  async createAccount(t, r, s) {
    await this.startListening();
    const o = [];
    return t && o.push(t), r && o.push(r), s && o.push(s), new Promise((a, c) => {
      if (!this.bunkerPubkey) throw new Error("Bunker pubkey not set");
      this.rpc.sendRequest(
        this.bunkerPubkey,
        "create_account",
        o,
        24133,
        (l) => {
          if (l.error)
            c(l.error);
          else {
            const u = l.result;
            a(u);
          }
        }
      );
    });
  }
  /**
   * Serializes the signer's connection details and local signer state.
   * @returns A JSON string containing the type, connection info, and local signer payload.
   */
  toPayload() {
    if (!this.bunkerPubkey || !this.userPubkey)
      throw new Error("NIP-46 signer is not fully initialized for serialization");
    const t = {
      type: "nip46",
      payload: {
        bunkerPubkey: this.bunkerPubkey,
        userPubkey: this.userPubkey,
        relayUrls: this.relayUrls,
        secret: this.secret,
        localSignerPayload: this.localSigner.toPayload(),
        // Store nip05 if it was used for initialization, otherwise null
        nip05: this.nip05 || null
      }
    };
    return JSON.stringify(t);
  }
  /**
   * Deserializes the signer from a payload string.
   * @param payloadString The JSON string obtained from toPayload().
   * @param ndk The NDK instance, required for NIP-46.
   * @returns An instance of NDKNip46Signer.
   */
  static async fromPayload(t, r) {
    if (!r)
      throw new Error("NDK instance is required to deserialize NIP-46 signer");
    const s = JSON.parse(t);
    if (s.type !== "nip46")
      throw new Error(`Invalid payload type: expected 'nip46', got ${s.type}`);
    const o = s.payload;
    if (!o || typeof o != "object" || !o.localSignerPayload)
      throw new Error("Invalid payload content for nip46 signer");
    const a = await ndkSignerFromPayload(o.localSignerPayload, r);
    if (!a)
      throw new Error("Failed to deserialize local signer for NIP-46");
    let c;
    return o.nip05 ? (c = new xe(r, o.nip05, a), c.userPubkey = o.userPubkey, c.bunkerPubkey = o.bunkerPubkey, c.relayUrls = o.relayUrls, c.secret = o.secret) : (c = new xe(r, o.userPubkey, a), c.bunkerPubkey = o.bunkerPubkey, c.relayUrls = o.relayUrls, c.secret = o.secret), c;
  }
};
function dedup(n, e) {
  return n.created_at > e.created_at ? n : e;
}
async function getRelayListForUser(n, e) {
  return (await getRelayListForUsers([n], e)).get(n);
}
async function getRelayListForUsers(n, e, t = !1, r = 1e3) {
  var f;
  const s = e.outboxPool || e.pool, o = /* @__PURE__ */ new Set();
  for (const p of s.relays.values()) o.add(p);
  const a = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), l = new NDKRelaySet(o, e);
  if ((f = e.cacheAdapter) != null && f.locking && !t) {
    const p = await e.fetchEvents(
      { kinds: [3, 10002], authors: Array.from(new Set(n)) },
      { cacheUsage: "ONLY_CACHE", subId: "ndk-relay-list-fetch" }
    );
    for (const m of p)
      m.kind === 10002 && a.set(m.pubkey, NDKRelayList.from(m));
    for (const m of p)
      if (m.kind === 3) {
        if (a.has(m.pubkey)) continue;
        const E = relayListFromKind3(e, m);
        E && c.set(m.pubkey, E);
      }
    n = n.filter((m) => !a.has(m) && !c.has(m));
  }
  if (n.length === 0) return a;
  const u = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
  return new Promise((p) => {
    (async () => {
      const E = {
        closeOnEose: !0,
        pool: s,
        groupable: !0,
        subId: "ndk-relay-list-fetch",
        addSinceFromCache: !0,
        relaySet: l
      };
      l && (E.relaySet = l), e.subscribe({ kinds: [3, 10002], authors: n }, E, {
        onEvent: (g) => {
          if (g.kind === 10002) {
            const b = u.get(g.pubkey);
            if (b && b.created_at > g.created_at) return;
            u.set(g.pubkey, g);
          } else if (g.kind === 3) {
            const b = h.get(g.pubkey);
            if (b && b.created_at > g.created_at) return;
            h.set(g.pubkey, g);
          }
        },
        onEose: () => {
          for (const g of u.values())
            a.set(g.pubkey, NDKRelayList.from(g));
          for (const g of n) {
            if (a.has(g)) continue;
            const b = h.get(g);
            if (!b) continue;
            const w = relayListFromKind3(e, b);
            w && a.set(g, w);
          }
          p(a);
        }
      }), setTimeout(() => {
        p(a);
      }, r);
    })();
  });
}
var OutboxItem = class {
  constructor(n) {
    /**
     * Type of item
     */
    y(this, "type");
    /**
     * The relay URLs that are of interest to this item
     */
    y(this, "relayUrlScores");
    y(this, "readRelays");
    y(this, "writeRelays");
    this.type = n, this.relayUrlScores = /* @__PURE__ */ new Map(), this.readRelays = /* @__PURE__ */ new Set(), this.writeRelays = /* @__PURE__ */ new Set();
  }
}, OutboxTracker = class extends lib$1.EventEmitter {
  constructor(e) {
    super();
    y(this, "data");
    y(this, "ndk");
    y(this, "debug");
    this.ndk = e, this.debug = e.debug.extend("outbox-tracker"), this.data = new dist.LRUCache({
      maxSize: 1e5,
      entryExpirationTimeInMS: 2 * 60 * 1e3
    });
  }
  /**
   * Adds a list of users to the tracker.
   * @param items
   * @param skipCache
   */
  async trackUsers(e, t = !1) {
    const r = [];
    for (let s = 0; s < e.length; s += 400) {
      const a = e.slice(s, s + 400).map((c) => getKeyFromItem(c)).filter((c) => !this.data.has(c));
      if (a.length !== 0) {
        for (const c of a)
          this.data.set(c, new OutboxItem("user"));
        r.push(
          new Promise((c) => {
            getRelayListForUsers(a, this.ndk, t).then((l) => {
              for (const [u, h] of l) {
                let f = this.data.get(u);
                if (f ?? (f = new OutboxItem("user")), h) {
                  f.readRelays = new Set(normalize(h.readRelayUrls)), f.writeRelays = new Set(normalize(h.writeRelayUrls));
                  for (const p of f.readRelays)
                    this.ndk.pool.blacklistRelayUrls.has(p) && f.readRelays.delete(p);
                  for (const p of f.writeRelays)
                    this.ndk.pool.blacklistRelayUrls.has(p) && f.writeRelays.delete(p);
                  this.data.set(u, f);
                }
              }
            }).finally(c);
          })
        );
      }
    }
    return Promise.all(r);
  }
  /**
   *
   * @param key
   * @param score
   */
  track(e, t, r = !0) {
    const s = getKeyFromItem(e);
    t ?? (t = getTypeFromItem(e));
    let o = this.data.get(s);
    return o || (o = new OutboxItem(t), e instanceof NDKUser && this.trackUsers([e])), o;
  }
};
function getKeyFromItem(n) {
  return n instanceof NDKUser ? n.pubkey : n;
}
function getTypeFromItem(n) {
  return n instanceof NDKUser ? "user" : "kind";
}
function correctRelaySet(n, e) {
  const t = e.connectedRelays();
  if (!Array.from(n.relays).some((s) => t.map((o) => o.url).includes(s.url)))
    for (const s of t)
      n.addRelay(s);
  if (t.length === 0)
    for (const s of e.relays.values())
      n.addRelay(s);
  return n;
}
var NDKSubscriptionManager = class {
  constructor() {
    y(this, "subscriptions");
    y(this, "seenEvents", /* @__PURE__ */ new Map());
    this.subscriptions = /* @__PURE__ */ new Map();
  }
  add(n) {
    this.subscriptions.set(n.internalId, n), n.onStopped, n.onStopped = () => {
      this.subscriptions.delete(n.internalId);
    }, n.on("close", () => {
      this.subscriptions.delete(n.internalId);
    });
  }
  seenEvent(n, e) {
    const t = this.seenEvents.get(n) || [];
    t.push(e), this.seenEvents.set(n, t);
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
  dispatchEvent(n, e, t = !1) {
    e && this.seenEvent(n.id, e);
    const r = this.subscriptions.values(), s = [];
    for (const o of r)
      matchFilters(o.filters, n) && s.push(o);
    for (const o of s)
      o.eventReceived(n, e, !1, t);
  }
}, debug6 = createDebug5("ndk:active-user");
async function getUserRelayList(n) {
  if (!this.autoConnectUserRelays) return;
  const e = await getRelayListForUser(n.pubkey, this);
  if (e) {
    for (const t of e.relays) {
      let r = this.pool.relays.get(t);
      r || (r = new NDKRelay(t, this.relayAuthDefaultPolicy, this), this.pool.addRelay(r));
    }
    return e;
  }
}
async function setActiveUser(n) {
  const e = this.outboxPool || this.pool;
  e.connectedRelays.length > 0 ? setActiveUserConnected.call(this, n) : e.once("connect", () => {
    setActiveUserConnected.call(this, n);
  });
}
async function setActiveUserConnected(n) {
  var o;
  const e = await getUserRelayList.call(this, n), t = [
    {
      kinds: [
        10006
        /* BlockRelayList */
      ],
      authors: [n.pubkey]
    }
  ];
  this.autoFetchUserMutelist && ((o = t[0].kinds) == null || o.push(1e4));
  const r = /* @__PURE__ */ new Map(), s = e ? e.relaySet : void 0;
  this.subscribe(
    t,
    { subId: "active-user-settings", closeOnEose: !0, relaySet: s },
    {
      onEvent: (a) => {
        const c = r.get(a.kind);
        c && c.created_at >= a.created_at || r.set(a.kind, a);
      },
      onEose: () => {
        for (const a of r.values())
          processEvent.call(this, a);
      }
    }
  );
}
async function processEvent(n) {
  n.kind === 10006 ? processBlockRelayList.call(this, n) : n.kind === 1e4 && processMuteList.call(this, n);
}
function processBlockRelayList(n) {
  const e = lists_default.from(n);
  for (const t of e.items)
    this.pool.blacklistRelayUrls.add(t[0]);
  debug6("Added %d relays to relay blacklist", e.items.length);
}
function processMuteList(n) {
  const e = lists_default.from(n);
  for (const t of e.items)
    this.mutedIds.set(t[1], t[0]);
  debug6("Added %d users to mute list", e.items.length);
}
function getEntity(n) {
  try {
    const e = nip19_exports.decode(n);
    return e.type === "npub" ? npub(this, e.data) : e.type === "nprofile" ? nprofile(this, e.data) : e;
  } catch {
    return null;
  }
}
function npub(n, e) {
  return n.getUser({ pubkey: e });
}
function nprofile(n, e) {
  const t = n.getUser({ pubkey: e.pubkey });
  return e.relays && (t.relayUrls = e.relays), t;
}
function isValidHint(n) {
  if (!n || n === "") return !1;
  try {
    return new URL(n), !0;
  } catch {
    return !1;
  }
}
async function fetchEventFromTag(n, e, t, r = {
  type: "timeout"
}) {
  const s = this.debug.extend("fetch-event-from-tag"), [o, a, c] = n;
  t = {}, s("fetching event from tag", n, t, r);
  const l = getRelaysForSync(this, e.pubkey);
  if (l && l.size > 0) {
    s("fetching event from author relays %o", Array.from(l));
    const g = NDKRelaySet.fromRelayUrls(Array.from(l), this), b = await this.fetchEvent(a, t, g);
    if (b) return b;
  } else
    s("no author relays found for %s", e.pubkey, e);
  const u = calculateRelaySetsFromFilters(this, [{ ids: [a] }], this.pool);
  s("fetching event without relay hint", u);
  const h = await this.fetchEvent(a, t);
  if (h) return h;
  if (c && c !== "") {
    const g = await this.fetchEvent(a, t, this.pool.getRelay(c, !0, !0, [{ ids: [a] }]));
    if (g) return g;
  }
  let f;
  const p = isValidHint(c) ? this.pool.getRelay(c, !1, !0, [{ ids: [a] }]) : void 0, m = new Promise((g) => {
    this.fetchEvent(a, t, p).then(g);
  });
  if (!isValidHint(c) || r.type === "none")
    return m;
  const E = new Promise(async (g) => {
    const b = r.relaySet, w = r.timeout ?? 1500, $ = new Promise((B) => setTimeout(B, w));
    if (r.type === "timeout" && await $, f)
      g(f);
    else {
      s("fallback fetch triggered");
      const B = await this.fetchEvent(a, t, b);
      g(B);
    }
  });
  switch (r.type) {
    case "timeout":
      return Promise.race([m, E]);
    case "eose":
      return f = await m, f || E;
  }
}
var Queue = class {
  constructor(n, e) {
    y(this, "queue", []);
    y(this, "maxConcurrency");
    y(this, "processing", /* @__PURE__ */ new Set());
    y(this, "promises", /* @__PURE__ */ new Map());
    this.maxConcurrency = e;
  }
  add(n) {
    if (this.promises.has(n.id))
      return this.promises.get(n.id);
    const e = new Promise((t, r) => {
      this.queue.push({
        ...n,
        func: () => n.func().then(
          (s) => (t(s), s),
          (s) => {
            throw r(s), s;
          }
        )
      }), this.process();
    });
    return this.promises.set(n.id, e), e.finally(() => {
      this.promises.delete(n.id), this.processing.delete(n.id), this.process();
    }), e;
  }
  process() {
    if (this.processing.size >= this.maxConcurrency || this.queue.length === 0)
      return;
    const n = this.queue.shift();
    !n || this.processing.has(n.id) || (this.processing.add(n.id), n.func());
  }
  clear() {
    this.queue = [];
  }
  clearProcessing() {
    this.processing.clear();
  }
  clearAll() {
    this.clear(), this.clearProcessing();
  }
  length() {
    return this.queue.length;
  }
}, DEFAULT_OUTBOX_RELAYS = ["wss://purplepag.es/", "wss://nos.lol/"], DEFAULT_BLACKLISTED_RELAYS = [
  "wss://brb.io/",
  // BRB
  "wss://nostr.mutinywallet.com/"
  // Don't try to read from this relay since it's a write-only relay
  // "wss://purplepag.es/", // This is a hack, since this is a mostly read-only relay, but not fully. Once we have relay routing this can be removed so it only receives the supported kinds
], NDK = class extends lib$1.EventEmitter {
  constructor(e = {}) {
    super();
    y(this, "_explicitRelayUrls");
    y(this, "blacklistRelayUrls");
    y(this, "pool");
    y(this, "outboxPool");
    y(this, "_signer");
    y(this, "_activeUser");
    y(this, "cacheAdapter");
    y(this, "debug");
    y(this, "devWriteRelaySet");
    y(this, "outboxTracker");
    y(this, "mutedIds");
    y(this, "clientName");
    y(this, "clientNip89");
    y(this, "queuesZapConfig");
    y(this, "queuesNip05");
    y(this, "asyncSigVerification", !1);
    y(this, "initialValidationRatio", 1);
    y(this, "lowestValidationRatio", 1);
    y(this, "validationRatioFn");
    y(this, "subManager");
    y(this, "publishingFailureHandled", !1);
    y(this, "pools", []);
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
    y(this, "relayAuthDefaultPolicy");
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
    y(this, "httpFetch");
    /**
     * Provide a caller function to receive all networking traffic from relays
     */
    y(this, "netDebug");
    y(this, "autoConnectUserRelays", !0);
    y(this, "autoFetchUserMutelist", !0);
    y(this, "walletConfig");
    /**
     * Attempts to fetch an event from a tag, following relay hints and
     * other best practices.
     * @param tag Tag to fetch the event from
     * @param originalEvent Event where the tag came from
     * @param subOpts Subscription options to use when fetching the event
     * @param fallback Fallback options to use when the hint relay doesn't respond
     * @returns
     */
    y(this, "fetchEventFromTag", fetchEventFromTag.bind(this));
    y(this, "getEntity", getEntity.bind(this));
    this.debug = e.debug || createDebug5("ndk"), this.netDebug = e.netDebug, this._explicitRelayUrls = e.explicitRelayUrls || [], this.blacklistRelayUrls = e.blacklistRelayUrls || DEFAULT_BLACKLISTED_RELAYS, this.subManager = new NDKSubscriptionManager(), this.pool = new NDKPool(e.explicitRelayUrls || [], [], this), this.pool.name = "Main", this.pool.on("relay:auth", async (t, r) => {
      this.relayAuthDefaultPolicy && await this.relayAuthDefaultPolicy(t, r);
    }), this.autoConnectUserRelays = e.autoConnectUserRelays ?? !0, this.autoFetchUserMutelist = e.autoFetchUserMutelist ?? !0, this.clientName = e.clientName, this.clientNip89 = e.clientNip89, this.relayAuthDefaultPolicy = e.relayAuthDefaultPolicy, e.enableOutboxModel && (this.outboxPool = new NDKPool(e.outboxRelayUrls || DEFAULT_OUTBOX_RELAYS, [], this, {
      debug: this.debug.extend("outbox-pool"),
      name: "Outbox Pool"
    }), this.outboxTracker = new OutboxTracker(this)), this.signer = e.signer, this.cacheAdapter = e.cacheAdapter, this.mutedIds = e.mutedIds || /* @__PURE__ */ new Map(), e.devWriteRelayUrls && (this.devWriteRelaySet = NDKRelaySet.fromRelayUrls(e.devWriteRelayUrls, this)), this.queuesZapConfig = new Queue("zaps", 3), this.queuesNip05 = new Queue("nip05", 10), this.signatureVerificationWorker = e.signatureVerificationWorker, this.initialValidationRatio = e.initialValidationRatio || 1, this.lowestValidationRatio = e.lowestValidationRatio || 1;
    try {
      this.httpFetch = fetch;
    } catch {
    }
  }
  set explicitRelayUrls(e) {
    this._explicitRelayUrls = e.map(normalizeRelayUrl), this.pool.relayUrls = e;
  }
  get explicitRelayUrls() {
    return this._explicitRelayUrls || [];
  }
  set signatureVerificationWorker(e) {
    this.asyncSigVerification = !!e, e && signatureVerificationInit(e);
  }
  /**
   * Adds an explicit relay to the pool.
   * @param url
   * @param relayAuthPolicy Authentication policy to use if different from the default
   * @param connect Whether to connect to the relay automatically
   * @returns
   */
  addExplicitRelay(e, t, r = !0) {
    var o;
    let s;
    return typeof e == "string" ? s = new NDKRelay(e, t, this) : s = e, this.pool.addRelay(s, r), (o = this.explicitRelayUrls) == null || o.push(s.url), s;
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
  set activeUser(e) {
    var r;
    const t = ((r = this._activeUser) == null ? void 0 : r.pubkey) !== (e == null ? void 0 : e.pubkey);
    this._activeUser = e, e && t ? setActiveUser.call(this, e) : e || (this.mutedIds = /* @__PURE__ */ new Map());
  }
  get signer() {
    return this._signer;
  }
  set signer(e) {
    this._signer = e, e && this.emit("signer:ready", e), e == null || e.user().then((t) => {
      t.ndk = this, this.activeUser = t;
    });
  }
  /**
   * Connect to relays with optional timeout.
   * If the timeout is reached, the connection will be continued to be established in the background.
   */
  async connect(e) {
    var r, s;
    this._signer && this.autoConnectUserRelays && (this.debug(
      "Attempting to connect to user relays specified by signer %o",
      await ((s = (r = this._signer).relays) == null ? void 0 : s.call(r, this))
    ), this._signer.relays && (await this._signer.relays(this)).forEach((a) => this.pool.addRelay(a)));
    const t = [this.pool.connect(e)];
    return this.outboxPool && t.push(this.outboxPool.connect(e)), this.debug("Connecting to relays %o", { timeoutMs: e }), Promise.allSettled(t).then(() => {
    });
  }
  /**
   * Get a NDKUser object
   *
   * @param opts
   * @returns
   */
  getUser(e) {
    const t = new NDKUser(e);
    return t.ndk = this, t;
  }
  /**
   * Get a NDKUser from a NIP05
   * @param nip05 NIP-05 ID
   * @param skipCache Skip cache
   * @returns
   */
  async getUserFromNip05(e, t = !1) {
    return NDKUser.fromNip05(e, this, t);
  }
  /**
   * Creates and starts a new subscription.
   *
   * Subscriptions automatically start unless `autoStart` is set to `false`.
   * You can control automatic closing on EOSE via `opts.closeOnEose`.
   *
   * @param filters - A single NDKFilter object or an array of filters.
   * @param opts - Optional NDKSubscriptionOptions to customize behavior (e.g., caching, grouping).
   * @param relaySet - Optional explicit NDKRelaySet to use for this subscription. If not provided, NDK calculates the optimal set.
   * @param autoStart - Controls automatic starting and allows providing event handlers.
   *   - `true` (default): Starts the subscription immediately.
   *   - `false`: Creates the subscription but does not start it (call `subscription.start()` manually).
   *   - `NDKSubscriptionEventHandlers` object: Starts the subscription immediately and attaches the provided handlers (`onEvent`, `onEvents`, `onEose`).
   *     - Using `onEvents` changes behavior: it receives initial cached events in bulk, and `onEvent` is skipped for that initial batch. See {@link NDKSubscriptionEventHandlers}.
   * @returns The created NDKSubscription instance.
   *
   * @example Basic subscription
   * ```typescript
   * const sub = ndk.subscribe({ kinds: [1], authors: [pubkey] });
   * sub.on("event", (event) => console.log("Kind 1 event:", event.content));
   * ```
   *
   * @example Subscription with options and direct handlers
   * ```typescript
   * const sub = ndk.subscribe(
   *   { kinds: [0], authors: [pubkey] },
   *   { closeOnEose: true, cacheUsage: NDKSubscriptionCacheUsage.PARALLEL },
   *   undefined, // Use default relay set calculation
   *   {
   *     onEvents: (events) => { // Renamed parameter
   *       if (events.length > 0) {
   *         console.log(`Got ${events.length} profile events from cache:`, events[0].content);
   *       }
   *     },
   *     onEvent: (event) => { // Renamed parameter
   *       console.log("Got profile update from relay:", event.content); // Clarified source
   *     },
   *     onEose: () => console.log("Profile subscription finished.")
   *   }
   * );
   * ```
   *
   * @since 2.13.0 `relaySet` parameter removed; pass `relaySet` or `relayUrls` via `opts`.
   */
  subscribe(e, t, r = !0) {
    var a;
    const s = new NDKSubscription(this, e, t);
    this.subManager.add(s);
    const o = s.pool;
    if (s.relaySet)
      for (const c of s.relaySet.relays)
        o.useTemporaryRelay(c, void 0, s.filters);
    if (this.outboxPool && s.hasAuthorsFilter()) {
      const c = s.filters.filter((l) => {
        var u;
        return l.authors && ((u = l.authors) == null ? void 0 : u.length) > 0;
      }).flatMap((l) => l.authors);
      (a = this.outboxTracker) == null || a.trackUsers(c);
    }
    if (r) {
      let c;
      typeof r == "object" && (r.onEvent && s.on("event", r.onEvent), r.onEose && s.on("eose", r.onEose), r.onEvents && (c = r.onEvents)), setTimeout(() => {
        const l = s.start(!c);
        l && l.length > 0 && c && c(l);
      }, 0);
    }
    return s;
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
  async publish(e, t, r) {
    return this.debug("Deprecated: Use `event.publish()` instead"), e.publish(t, r);
  }
  /**
   * Fetch an event from the cache synchronously.
   * @param idOrFilter event id in bech32 format or filter
   * @returns events from the cache or null if the cache is empty
   */
  fetchEventSync(e) {
    if (!this.cacheAdapter) throw new Error("Cache adapter not set");
    let t;
    typeof e == "string" ? t = [filterFromId(e)] : t = e;
    const r = new NDKSubscription(this, t), s = this.cacheAdapter.query(r);
    if (s instanceof Promise) throw new Error("Cache adapter is async");
    return s.map((o) => (o.ndk = this, o));
  }
  /**
   * Fetch a single event.
   *
   * @param idOrFilter event id in bech32 format or filter
   * @param opts subscription options
   * @param relaySetOrRelay explicit relay set to use
   */
  async fetchEvent(e, t, r) {
    let s, o;
    if (r instanceof NDKRelay ? o = new NDKRelaySet(/* @__PURE__ */ new Set([r]), this) : r instanceof NDKRelaySet && (o = r), !r && typeof e == "string" && !isNip33AValue(e)) {
      const a = relaysFromBech32(e, this);
      a.length > 0 && (o = new NDKRelaySet(new Set(a), this), o = correctRelaySet(o, this.pool));
    }
    if (typeof e == "string" ? s = [filterFromId(e)] : Array.isArray(e) ? s = e : s = [e], s.length === 0)
      throw new Error(`Invalid filter: ${JSON.stringify(e)}`);
    return new Promise((a) => {
      let c = null;
      const l = {
        ...t || {},
        closeOnEose: !0
      };
      o && (l.relaySet = o);
      const u = this.subscribe(
        s,
        l,
        // relaySet, // Removed: Passed via opts
        !1
        // autoStart = false
      ), h = setTimeout(() => {
        u.stop(), a(c);
      }, 1e4);
      u.on("event", (f) => {
        f.ndk = this, f.isReplaceable() ? (!c || c.created_at < f.created_at) && (c = f) : (clearTimeout(h), a(f));
      }), u.on("eose", () => {
        clearTimeout(h), a(c);
      }), u.start();
    });
  }
  /**
   * Fetch events
   */
  async fetchEvents(e, t, r) {
    return new Promise((s) => {
      const o = /* @__PURE__ */ new Map(), a = {
        ...t || {},
        closeOnEose: !0
      };
      r && (a.relaySet = r);
      const c = this.subscribe(
        e,
        a,
        // relaySet, // Removed: Passed via opts
        !1
        // autoStart = false
      ), l = (u) => {
        let h;
        u instanceof NDKEvent ? h = u : h = new NDKEvent(void 0, u);
        const f = h.deduplicationKey(), p = o.get(f);
        p && (h = dedup(p, h)), h.ndk = this, o.set(f, h);
      };
      c.on("event", l), c.on("eose", () => {
        s(new Set(o.values()));
      }), c.start();
    });
  }
  /**
   * Ensures that a signer is available to sign an event.
   */
  assertSigner() {
    if (!this.signer)
      throw this.emit("signer:required"), new Error("Signer required");
  }
  set wallet(e) {
    var t, r;
    if (!e) {
      this.walletConfig = void 0;
      return;
    }
    this.walletConfig ?? (this.walletConfig = {}), this.walletConfig.lnPay = (t = e == null ? void 0 : e.lnPay) == null ? void 0 : t.bind(e), this.walletConfig.cashuPay = (r = e == null ? void 0 : e.cashuPay) == null ? void 0 : r.bind(e);
  }
};
createDebug5("ndk:zapper:ln");
createDebug5("ndk:zapper");
const DEFAULT_RELAYS = [
  "wss://relay.damus.io",
  "wss://nostr.wine",
  "wss://relay.nostr.net",
  "wss://relay.nostr.band",
  "wss://nos.lol",
  "wss://nostr-pub.wellorder.net",
  "wss://njump.me",
  "wss://relay.getalby.com",
  "wss://relay.primal.net"
], MILLISATS_PER_SAT = 1e3;
function maskNPub(n = "", e = 3) {
  const t = n.length;
  if (t !== 63)
    return "Invalid nPub";
  let r = "npub1";
  for (let o = 5; o < e + 5; o++)
    r += n[o];
  r += "...";
  let s = "";
  for (let o = t - 1; o >= t - e; o--)
    s = n[o] + s;
  return r += s, r;
}
async function getPostStats(n, e) {
  const t = await n.fetchEvents({
    kinds: [NDKKind.Repost],
    "#e": [e || ""]
  }), r = Array.from(t).filter((l) => l.tags.filter((h) => h[0] === "p").length === 1).length, s = await n.fetchEvents({
    kinds: [NDKKind.Reaction],
    "#e": [e || ""]
  }), o = 0, a = await n.fetchEvents({
    kinds: [NDKKind.Text],
    "#e": [e || ""]
  }), c = Array.from(a).filter((l) => l.tags.filter((h) => h[0] === "e").length === 1).length;
  return {
    likes: s.size,
    reposts: r,
    zaps: o / MILLISATS_PER_SAT,
    replies: c
  };
}
function getNostrLogo(n = "dark", e = 24, t = 21) {
  return `
        <svg width="${e}" height="${t}" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.7084 10.1607C18.1683 13.3466 14.8705 14.0207 12.9733 13.9618C12.8515 13.958 12.7366 14.0173 12.6647 14.1157C12.4684 14.384 12.1547 14.7309 11.9125 14.7309C11.6405 14.7309 11.3957 15.254 11.284 15.5795C11.2723 15.6137 11.3059 15.6452 11.3403 15.634C14.345 14.6584 15.5241 14.3238 16.032 14.4178C16.4421 14.4937 17.209 15.8665 17.5413 16.5434C16.7155 16.5909 16.4402 15.8507 16.2503 15.7178C16.0985 15.6116 16.0415 16.0974 16.032 16.3536C15.8517 16.2587 15.6239 16.1259 15.6049 15.7178C15.5859 15.3098 15.3771 15.4142 15.2157 15.4332C15.0544 15.4521 12.5769 16.2493 12.2067 16.3536C11.8366 16.458 11.4094 16.6004 11.0582 16.8471C10.4697 17.1318 10.09 16.9325 9.98561 16.4485C9.90208 16.0614 10.4444 14.8701 10.726 14.3229C10.3779 14.4526 9.65529 14.7158 9.54898 14.7309C9.44588 14.7457 8.13815 15.7552 7.43879 16.3038C7.398 16.3358 7.37174 16.3827 7.36236 16.4336C7.25047 17.0416 6.89335 17.2118 6.27423 17.5303C5.77602 17.7867 4.036 20.4606 3.14127 21.9041C3.0794 22.0039 2.9886 22.0806 2.8911 22.1461C2.32279 22.5276 1.74399 23.4985 1.50923 23.9737C1.17511 23.0095 1.61048 22.1802 1.86993 21.886C1.75602 21.7873 1.49341 21.8449 1.37634 21.886C1.69907 20.7757 2.82862 20.7757 2.79066 20.7757C2.99948 20.5954 5.44842 17.0938 5.50538 16.9325C5.56187 16.7725 5.46892 16.0242 6.69975 15.6139C6.7193 15.6073 6.73868 15.5984 6.75601 15.5873C7.71493 14.971 8.43427 13.9774 8.67571 13.5542C7.39547 13.4662 5.92943 12.7525 5.16289 12.294C4.99765 12.1952 4.8224 12.1092 4.63108 12.0875C3.58154 11.9687 2.53067 12.6401 2.10723 13.0228C1.93258 12.7799 2.12938 12.0739 2.24961 11.7513C1.82437 11.6905 1.19916 12.308 0.939711 12.6243C0.658747 12.184 0.904907 11.397 1.06311 11.0585C0.501179 11.0737 0.120232 11.3306 0 11.4571C0.465109 7.99343 4.02275 9.00076 4.06259 9.04675C3.87275 8.84937 3.88857 8.59126 3.92021 8.48688C6.0749 8.54381 7.08105 8.18321 7.71702 7.81313C12.7288 5.01374 14.8882 6.73133 15.6856 7.1631C16.4829 7.59487 17.9304 7.77042 18.9318 7.37187C20.1278 6.83097 19.9478 5.43673 19.7054 4.90461C19.4397 4.32101 17.9399 3.51438 17.4084 2.49428C16.8768 1.47418 17.34 0.233672 17.9558 0.0607684C18.5425 -0.103972 18.9615 0.0876835 19.2831 0.378128C19.4974 0.571763 20.0994 0.710259 20.3509 0.800409C20.6024 0.890558 21.0201 1.00918 20.9964 1.08035C20.9726 1.15152 20.5699 1.14202 20.5075 1.14202C20.3794 1.14202 20.2275 1.161 20.3794 1.23217C20.5575 1.30439 20.8263 1.40936 20.955 1.47846C20.9717 1.48744 20.9683 1.51084 20.95 1.51577C20.0765 1.75085 19.2966 1.26578 18.7183 1.82526C18.1298 2.39463 19.3827 2.83114 20.0282 3.51438C20.6736 4.19762 21.3381 5.01372 20.8065 6.87365C20.395 8.31355 18.6703 9.53781 17.7795 10.0167C17.7282 10.0442 17.7001 10.1031 17.7084 10.1607Z" fill="${n === "dark" ? "white" : "black"}"/>
        </svg>
    `;
}
function getLoadingNostrich(n = "dark", e = 25, t = 25) {
  return `<img width="${e}" height="${t}" src="./assets/${n === "dark" ? "light" : "dark"}-nostrich-running.gif" />`;
}
function getSuccessAnimation(n = "dark", e = 25, t = 25) {
  return `
        <style>
            .checkmark__circle {
                stroke-dasharray: 166;
                stroke-dashoffset: 166;
                stroke-width: 4;
                stroke-miterlimit: 10;
                stroke: ${n === "dark" ? "#FFF" : "#000"};
                animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
            }

            .checkmark {
                width: ${e}px;
                height: ${t}px;
                border-radius: 50%;
                display: block;
                stroke-width: 2;
                stroke: ${n === "dark" ? "#FFFFFF" : "#000000"};
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
            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="${n === "dark" ? "#000" : "#FFF"}"/>
            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
    `;
}
function getFollowButtonStyles(n, e) {
  let t = "";
  return n === "dark" ? t = `
          --nstrc-follow-btn-background: var(--nstrc-follow-btn-background-dark);
          --nstrc-follow-btn-hover-background: var(--nstrc-follow-btn-hover-background-dark);
    
          --nstrc-follow-btn-text-color: var(--nstrc-follow-btn-text-color-dark);
          --nstrc-follow-btn-border: var(--nstrc-follow-btn-border-dark);
      ` : t = `
          --nstrc-follow-btn-background: var(--nstrc-follow-btn-background-light);
          --nstrc-follow-btn-hover-background: var(--nstrc-follow-btn-hover-background-light);
    
          --nstrc-follow-btn-text-color: var(--nstrc-follow-btn-text-color-light);
          --nstrc-follow-btn-border: var(--nstrc-follow-btn-border-light);
      `, `
        <style>
          :host {
            ${t}

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

            ${e ? "pointer-events: none; user-select: none; background-color: var(--nstrc-follow-btn-hover-background);" : ""}
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
function getPostStylesLegacy(n) {
  let e = "";
  return n === "dark" ? e = `
        --nstrc-post-background: var(--nstrc-post-background-dark);
        --nstrc-post-name-color: var(--nstrc-post-name-color-dark);
        --nstrc-post-nip05-color: var(--nstrc-post-nip05-color-dark);
        --nstrc-post-skeleton-min-hsl: var(--nstrc-post-skeleton-min-hsl-dark);
        --nstrc-post-skeleton-max-hsl: var(--nstrc-post-skeleton-max-hsl-dark);
        --nstrc-post-text-color: var(--nstrc-post-text-color-dark);
        --nstrc-post-stats-color: var(--nstrc-post-stat-text-color-dark);
        ` : e = `
        --nstrc-post-background: var(--nstrc-post-background-light);
        --nstrc-post-name-color: var(--nstrc-post-name-color-light);
        --nstrc-post-nip05-color: var(--nstrc-post-nip05-color-light);
        --nstrc-post-skeleton-min-hsl: var(--nstrc-post-skeleton-min-hsl-light);
        --nstrc-post-skeleton-max-hsl: var(--nstrc-post-skeleton-max-hsl-light);
        --nstrc-post-text-color: var(--nstrc-post-text-color-light);
        --nstrc-post-stats-color: var(--nstrc-post-stat-text-color-light);
      `, `
          <style>
            nostr-post { /* Use host tag selector for scoping */
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

              ${e}
            }
            
            nostr-post a { /* Scope link color */
              color: var(--nstrc-post-accent);
            }

            /* Keep other styles targeting elements within nostr-post */
            nostr-post .post-container {
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

            nostr-post .post-container .post-header {
                display: flex;
                gap: 10px;
            }
            
            nostr-post .post-body {
              display: block;
              width: 100%;
            }

            nostr-post .post-header-left {
                width: 35px;
            }

            nostr-post .post-header-left img {
                width: 35px;
                border-radius: 50%;
            }

            nostr-post .post-header-middle {
                display: flex;
                flex-direction: column;
                width: 100%;
                gap: 5px;
            }

            nostr-post .post-header-right {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: end;
            }

            nostr-post .author-name {
              color: var(--nstrc-post-name-color);
              font-weight: var(--nstrc-post-name-font-weight);
                  word-break: break-word;
            }

            nostr-post .author-username {
                font-weight: var(--nstrc-post-nip05-font-weight);
                color: var(--nstrc-post-nip05-color);
                font-size: 14px;
                word-break: break-all;
            }

            nostr-post .text-content {
              word-break: break-word;
            }

            nostr-post .glide__slide {
                width: 100%;
            }

            nostr-post .glide__slide * {
                border-radius: 10px;
            }

            nostr-post .glide__bullets button {
                border: 1px solid #000; /* Example, adjust as needed */
            }

            nostr-post .post-container .skeleton {
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

          nostr-post .error-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
          }

          nostr-post .error {
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

          nostr-post .error-text {
            color: red;
            font-weight: bold;
          }

          nostr-post .post-footer {
            margin-top: 20px; /* Adjusted margin based on isError logic removal */
            display: block; /* Ensure it takes full width */
            width: 100%;    /* Ensure it takes full width */
          }

          nostr-post .stats-container {
            display: flex;
            gap: 20px;
          }

          nostr-post .stat {
            display: flex;
            align-items: center;
            gap: 5px;
            color: var(--nstrc-post-stats-color);
          }
        </style>
      `;
}
const getProfileBadgeStylesLegacy = (n) => {
  let e = `
    nostr-profile-badge {
      /* Base Variables */
      --nstrc-profile-badge-background-light: #f5f5f5;
      --nstrc-profile-badge-background-dark: #121212;
      --nstrc-profile-badge-text-color-light: #000;
      --nstrc-profile-badge-text-color-dark: #fff;
      --nstrc-profile-badge-border-color-light: #ddd;
      --nstrc-profile-badge-border-color-dark: #333;
      --nstrc-profile-badge-hover-background-color-light: #f0f0f0;
      --nstrc-profile-badge-hover-background-color-dark: #151515;
      --nstrc-profile-badge-hover-text-color-light: #333;
      --nstrc-profile-badge-hover-text-color-dark: #ccc;
      --nstrc-profile-badge-focus-background-color-light: #e0e0e0;
      --nstrc-profile-badge-focus-background-color-dark: #1a1a1a;
      --nstrc-profile-badge-focus-text-color-light: #666;
      --nstrc-profile-badge-focus-text-color-dark: #aaa;
      --nstrc-profile-badge-error-color: #f44336;
      --nstrc-profile-badge-error-background-color: #fbe9e7;
      --nstrc-profile-badge-error-border-color: #f44336;
      --nstrc-profile-badge-error-text-color: #f44336;
      --nstrc-profile-badge-loading-color: #2196f3;
      --nstrc-profile-badge-loading-background-color: #e0e0e0;
      --nstrc-profile-badge-loading-border-color: #2196f3;
      --nstrc-profile-badge-loading-text-color: #2196f3;

      /* Base Styles */
      display: inline-flex; /* Changed from flex to inline-flex */
      align-items: center;
      padding: 5px 10px; /* Adjusted padding */
      border: 1px solid var(--nstrc-profile-badge-border-color-light);
      border-radius: 15px; /* Adjusted border-radius */
      background-color: var(--nstrc-profile-badge-background-light);
      color: var(--nstrc-profile-badge-text-color-light);
      cursor: pointer;
      font-family: sans-serif; /* Added default font */
      max-width: 300px; /* Added max-width */
      overflow: hidden; /* Prevent content overflow */
      text-overflow: ellipsis; /* Add ellipsis for overflow */
      white-space: nowrap; /* Keep content on one line */
    }

    nostr-profile-badge .nostr-profile-badge-container {
      display: flex;
      align-items: center;
      width: 100%; /* Ensure container takes full width */
    }

    nostr-profile-badge .nostr-profile-badge-left-container {
      margin-right: 8px; /* Adjusted margin */
      flex-shrink: 0; /* Prevent image from shrinking */
    }

    nostr-profile-badge img {
        width: 25px; /* Adjusted size */
        height: 25px; /* Adjusted size */
        border-radius: 50%;
        object-fit: cover; /* Ensure image covers the area */
    }

    nostr-profile-badge .nostr-profile-badge-right-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden; /* Hide overflow */
      min-width: 0; /* Allow shrinking */
    }

    nostr-profile-badge .nostr-profile-badge-name {
      font-weight: bold;
      font-size: 14px; /* Adjusted font size */
      margin-bottom: 2px; /* Adjusted margin */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    nostr-profile-badge .nostr-profile-badge-nip05 {
      font-size: 12px; /* Adjusted font size */
      color: grey; /* Adjusted color */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    nostr-profile-badge .nostr-profile-badge-nip05 a {
      text-decoration: none;
      color: inherit; /* Inherit color */
    }

    nostr-profile-badge .nostr-profile-badge-nip05 a:hover {
      text-decoration: underline;
    }

    /* Loading State */
    nostr-profile-badge.loading {
      background-color: var(--nstrc-profile-badge-loading-background-color);
      border-color: var(--nstrc-profile-badge-loading-border-color);
      color: var(--nstrc-profile-badge-loading-text-color);
    }

    nostr-profile-badge .skeleton {
        background-color: #e0e0e0; /* Simplified skeleton color */
        border-radius: 4px;
        display: inline-block;
        line-height: 1;
    }

    nostr-profile-badge .skeleton.img-skeleton {
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }

    nostr-profile-badge .skeleton.text-skeleton-name {
        width: 70%;
        height: 14px;
        margin-bottom: 2px;
    }

    nostr-profile-badge .skeleton.text-skeleton-nip05 {
        width: 90%;
        height: 12px;
    }

    /* Error State */
    nostr-profile-badge.error-container {
      background-color: var(--nstrc-profile-badge-error-background-color);
      border-color: var(--nstrc-profile-badge-error-border-color);
      color: var(--nstrc-profile-badge-error-text-color);
    }
    nostr-profile-badge .error {
      color: var(--nstrc-profile-badge-error-color);
      font-size: 18px; /* Adjusted size */
    }
    nostr-profile-badge .error-text {
        font-size: 12px;
        margin-left: 5px;
    }

    /* Dark Theme */
    nostr-profile-badge.dark {
      background-color: var(--nstrc-profile-badge-background-dark);
      border-color: var(--nstrc-profile-badge-border-color-dark);
      color: var(--nstrc-profile-badge-text-color-dark);
    }
    nostr-profile-badge.dark .nostr-profile-badge-nip05 {
        color: #aaa; /* Adjusted dark theme nip05 color */
    }
    nostr-profile-badge.dark .skeleton {
        background-color: #424242; /* Darker skeleton */
    }
  `;
  return n === "dark" && (e += `
      nostr-profile-badge {
        border-color: var(--nstrc-profile-badge-border-color-dark);
        background-color: var(--nstrc-profile-badge-background-dark);
        color: var(--nstrc-profile-badge-text-color-dark);
      }
    `), `<style>${e}</style>`;
};
function getProfileStyles(n) {
  let e = "";
  return n === "dark" ? e = `
    --nstrc-profile-background: var(--nstrc-profile-background-dark, #000000);
    --nstrc-profile-skeleton-min-hsl: var(--nstrc-profile-skeleton-min-hsl-dark, 200, 20%, 20%);
    --nstrc-profile-skeleton-max-hsl: var(--nstrc-profile-skeleton-max-hsl-dark, 200, 20%, 30%);
    --nstrc-profile-text-primary: var(--nstrc-profile-text-primary-dark, #ffffff);
    --nstrc-profile-text-grey: var(--nstrc-profile-text-grey-dark, #666666);
    --nstrc-profile-banner-placeholder-color: var(--nstrc-profile-banner-placeholder-color-dark, #222222);
    --nstrc-profile-copy-foreground-color: var(--nstrc-profile-copy-foreground-color-dark, #CCC);
    ` : e = `
    --nstrc-profile-background: var(--nstrc-profile-background-light, #f5f5f5);
    --nstrc-profile-skeleton-min-hsl: var(--nstrc-profile-skeleton-min-hsl-light, 200, 20%, 80%);
    --nstrc-profile-skeleton-max-hsl: var(--nstrc-profile-skeleton-max-hsl-light, 200, 20%, 95%);
    --nstrc-profile-text-primary: var(--nstrc-profile-text-primary-light, #111111);
    --nstrc-profile-text-grey: var(--nstrc-profile-text-grey-light, #808080);
    --nstrc-profile-banner-placeholder-color: var(--nstrc-profile-banner-placeholder-color-light, #e5e5e5);
    --nstrc-profile-copy-foreground-color: var(--nstrc-profile-copy-foreground-color-light, #222);
    `, `
  <style>
  :host {
      ${e}

      --nstrc-profile-accent: var(--nstrc-profile-accent, #ca077c);

      /* Override follow button styles for profile context */
      --nstrc-follow-btn-padding: 5px 8px !important;
      --nstrc-follow-btn-font-size: 14px !important;
      --nstrc-follow-btn-border-radius: 12px !important;
      --nstrc-follow-btn-border-dark: 1px solid #DDDDDD !important;
      --nstrc-follow-btn-border-light: 1px solid #DDDDDD !important;
      --nstrc-follow-btn-horizontal-alignment: end !important;
      --nstrc-follow-btn-min-height: auto !important;
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
      display: flex;
      gap: 5px;
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
      :host {
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
class NostrProfileBadge extends HTMLElement {
  constructor() {
    super(), this.rendered = !1, this.ndk = new NDK(), this.userProfile = {
      name: "",
      image: "",
      nip05: ""
    }, this.theme = "light", this.isLoading = !0, this.isError = !1, this.onClick = null, this.connectToNostr = async () => {
      await this.ndk.connect();
    }, this.getRelays = () => {
      const e = this.getAttribute("relays");
      return e ? e.split(",") : DEFAULT_RELAYS;
    }, this.getNDKUser = async () => {
      const e = this.getAttribute("npub"), t = this.getAttribute("nip05"), r = this.getAttribute("pubkey");
      return e ? this.ndk.getUser({
        npub: e
      }) : t ? this.ndk.getUserFromNip05(t) : r ? this.ndk.getUser({
        pubkey: r
      }) : null;
    }, this.getUserProfile = async () => {
      try {
        this.isLoading = !0, this.render();
        const e = await this.getNDKUser();
        if (e != null && e.npub)
          this.ndkUser = e, await e.fetchProfile(), e.profile ? (this.userProfile = e.profile, this.userProfile.image || (this.userProfile.image = "./assets/default_dp.png"), this.isError = !1) : (console.warn(`Could not fetch profile initially for user ${e.npub}`), this.userProfile.image || (this.userProfile.image = "./assets/default_dp.png"), this.isError = !1);
        else
          throw new Error("Either npub or nip05 should be provided");
      } catch (e) {
        throw this.isError = !0, e;
      } finally {
        this.isLoading = !1, this.render();
      }
    }, this.getTheme = async () => {
      this.theme = "light";
      const e = this.getAttribute("theme");
      if (e) {
        if (!["light", "dark"].includes(e))
          throw new Error(`Invalid theme '${e}'. Accepted values are 'light', 'dark'`);
        this.theme = e;
      }
    };
  }
  async connectedCallback() {
    const e = this.getAttribute("onClick");
    e !== null && (this.onClick = window[e]), this.rendered || (this.ndk = new NDK({
      explicitRelayUrls: this.getRelays()
    }), this.getTheme(), await this.connectToNostr(), this.getUserProfile(), this.rendered = !0);
  }
  static get observedAttributes() {
    return ["relays", "npub", "pubkey", "nip05", "theme", "show-npub", "show-follow", "onClick"];
  }
  attributeChangedCallback(e, t, r) {
    e === "relays" && (this.ndk.explicitRelayUrls = this.getRelays(), this.connectToNostr()), ["relays", "npub", "nip05"].includes(e) && this.getUserProfile(), e === "onClick" && (this.onClick = window[r]), e === "theme" && (this.getTheme(), this.render()), ["show-npub", "show-follow"].includes(e) && this.render();
  }
  disconnectedCallback() {
  }
  renderNpub() {
    var r;
    (r = this.ndkUser) == null || r.npub;
    const e = this.getAttribute("npub"), t = this.getAttribute("show-npub");
    return t === "false" || t === null && this.userProfile.nip05 ? "" : !e && !this.ndkUser.npub ? (console.warn("Cannot use showNpub without providing a nPub"), "") : `
      <div class="npub-container">
        <span class="npub">${maskNPub(e || this.ndkUser.npub)}</span>
        <span id="npub-copy" class="copy-button">&#x2398;</span>
      </div>
    `;
  }
  copy(e) {
    navigator.clipboard.writeText(e);
  }
  onProfileClick() {
    if (this.isError)
      return;
    if (this.onClick !== null && typeof this.onClick == "function") {
      this.onClick(this.userProfile);
      return;
    }
    let e = "";
    const t = this.getAttribute("nip05"), r = this.getAttribute("npub");
    if (t)
      e = t;
    else if (r)
      e = r;
    else
      return;
    window.open(`https://njump.me/${e}`, "_blank");
  }
  attachEventListeners() {
    var e, t, r;
    (e = this.querySelector(".nostr-profile-badge")) == null || e.addEventListener("click", (s) => {
      s.target.closest(".nostr-follow-button-container") || this.onProfileClick();
    }), (t = this.querySelector("#npub-copy")) == null || t.addEventListener("click", (s) => {
      s.stopPropagation(), this.copy(this.getAttribute("npub") || this.ndkUser.npub || "");
    }), (r = this.querySelector("#nip05-copy")) == null || r.addEventListener("click", (s) => {
      s.stopPropagation(), this.copy(this.getAttribute("nip05") || this.userProfile.nip05 || "");
    });
  }
  render() {
    var s;
    this.isLoading === !1 && this.userProfile && this.userProfile.image === void 0 && (this.userProfile.image = "./assets/default_dp.png");
    const e = this.getAttribute("show-npub") === "true", t = this.getAttribute("show-follow") === "true";
    let r = "";
    if (this.isLoading)
      r = `
        <div class='nostr-profile-badge-container'>
          <div class='nostr-profile-badge-left-container'>
            <div class="skeleton img-skeleton"></div>
          </div>
          <div class='nostr-profile-badge-right-container'>
            <div class="skeleton text-skeleton-name"></div>
            <div class="skeleton text-skeleton-nip05"></div>
          </div>
        </div>
      `, this.classList.add("loading"), this.classList.remove("error-container");
    else if (this.isError)
      r = `
        <div class='nostr-profile-badge-container'>
          <div class='nostr-profile-badge-left-container'>
            <div class="error">&#9888;</div>
          </div>
          <div class='nostr-profile-badge-right-container'>
            <span class="error-text">Unable to load</span>
          </div>
        </div>
      `, this.classList.add("error-container"), this.classList.remove("loading");
    else if (this.userProfile) {
      this.classList.toggle("dark", this.theme === "dark"), this.classList.remove("loading", "error-container");
      const o = this.userProfile.displayName || this.userProfile.name || maskNPub(((s = this.ndkUser) == null ? void 0 : s.npub) || "");
      r = `
        <div class='nostr-profile-badge-container'>
          <div class='nostr-profile-badge-left-container'>
            <img src='${this.userProfile.image || "./assets/default_dp.png"}' alt='Nostr profile image of ${o}'/>
          </div>
          <div class='nostr-profile-badge-right-container'>
            <div class='nostr-profile-badge-name' title="${o}">${o}</div>
            ${this.userProfile.nip05 ? `<div class='nostr-profile-badge-nip05' title="${this.userProfile.nip05}">${this.userProfile.nip05}</div>` : ""}
            ${e ? this.renderNpub() : ""}
            ${t && this.ndkUser ? `<nostr-follow-button pubkey="${this.ndkUser.pubkey}"></nostr-follow-button>` : ""}
          </div>
        </div>
      `;
    } else
      r = "<div>Error: Profile data unavailable.</div>", this.classList.add("error-container"), this.classList.remove("loading");
    this.innerHTML = getProfileBadgeStylesLegacy(this.theme) + r, this.attachEventListeners();
  }
}
customElements.define("nostr-profile-badge", NostrProfileBadge);
/*!
 * Glide.js v3.7.1
 * (c) 2013-2024 Jędrzej Chałubek (https://github.com/jedrzejchalubek/)
 * Released under the MIT License.
 */
function ownKeys(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    e && (r = r.filter(function(s) {
      return Object.getOwnPropertyDescriptor(n, s).enumerable;
    })), t.push.apply(t, r);
  }
  return t;
}
function _objectSpread2(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
      _defineProperty(n, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
      Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return n;
}
function _typeof(n) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof = function(e) {
    return typeof e;
  } : _typeof = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, _typeof(n);
}
function _classCallCheck(n, e) {
  if (!(n instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(n, e) {
  for (var t = 0; t < e.length; t++) {
    var r = e[t];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(n, r.key, r);
  }
}
function _createClass(n, e, t) {
  return e && _defineProperties(n.prototype, e), n;
}
function _defineProperty(n, e, t) {
  return e in n ? Object.defineProperty(n, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = t, n;
}
function _inherits(n, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Super expression must either be null or a function");
  n.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: n,
      writable: !0,
      configurable: !0
    }
  }), e && _setPrototypeOf(n, e);
}
function _getPrototypeOf(n) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(n);
}
function _setPrototypeOf(n, e) {
  return _setPrototypeOf = Object.setPrototypeOf || function(r, s) {
    return r.__proto__ = s, r;
  }, _setPrototypeOf(n, e);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function _assertThisInitialized(n) {
  if (n === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return n;
}
function _possibleConstructorReturn(n, e) {
  if (e && (typeof e == "object" || typeof e == "function"))
    return e;
  if (e !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(n);
}
function _createSuper(n) {
  var e = _isNativeReflectConstruct();
  return function() {
    var r = _getPrototypeOf(n), s;
    if (e) {
      var o = _getPrototypeOf(this).constructor;
      s = Reflect.construct(r, arguments, o);
    } else
      s = r.apply(this, arguments);
    return _possibleConstructorReturn(this, s);
  };
}
function _superPropBase(n, e) {
  for (; !Object.prototype.hasOwnProperty.call(n, e) && (n = _getPrototypeOf(n), n !== null); )
    ;
  return n;
}
function _get() {
  return typeof Reflect < "u" && Reflect.get ? _get = Reflect.get : _get = function(e, t, r) {
    var s = _superPropBase(e, t);
    if (s) {
      var o = Object.getOwnPropertyDescriptor(s, t);
      return o.get ? o.get.call(arguments.length < 3 ? e : r) : o.value;
    }
  }, _get.apply(this, arguments);
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
  autoplay: !1,
  /**
   * Stop autoplay on mouseover event.
   *
   * @type {Boolean}
   */
  hoverpause: !0,
  /**
   * Allow for changing slides with left and right keyboard arrows.
   *
   * @type {Boolean}
   */
  keyboard: !0,
  /**
   * Stop running `perView` number of slides from the end. Use this
   * option if you don't want to have an empty space after
   * a slider. Works only with `slider` type and a
   * non-centered `focusAt` setting.
   *
   * @type {Boolean}
   */
  bound: !1,
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
  rewind: !0,
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
  waitForTransition: !0,
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
function warn(n) {
  console.error("[Glide warn]: ".concat(n));
}
function toInt(n) {
  return parseInt(n);
}
function toFloat(n) {
  return parseFloat(n);
}
function isString(n) {
  return typeof n == "string";
}
function isObject(n) {
  var e = _typeof(n);
  return e === "function" || e === "object" && !!n;
}
function isFunction(n) {
  return typeof n == "function";
}
function isUndefined(n) {
  return typeof n > "u";
}
function isArray(n) {
  return n.constructor === Array;
}
function mount(n, e, t) {
  var r = {};
  for (var s in e)
    isFunction(e[s]) ? r[s] = e[s](n, r, t) : warn("Extension must be a function");
  for (var o in r)
    isFunction(r[o].mount) && r[o].mount();
  return r;
}
function define(n, e, t) {
  Object.defineProperty(n, e, t);
}
function sortKeys(n) {
  return Object.keys(n).sort().reduce(function(e, t) {
    return e[t] = n[t], e[t], e;
  }, {});
}
function mergeOptions(n, e) {
  var t = Object.assign({}, n, e);
  if (e.hasOwnProperty("classes")) {
    t.classes = Object.assign({}, n.classes, e.classes);
    var r = ["direction", "type", "slide", "arrow", "nav"];
    r.forEach(function(s) {
      e.classes.hasOwnProperty(s) && (t.classes[s] = _objectSpread2(_objectSpread2({}, n.classes[s]), e.classes[s]));
    });
  }
  return e.hasOwnProperty("breakpoints") && (t.breakpoints = Object.assign({}, n.breakpoints, e.breakpoints)), t;
}
var EventsBus = /* @__PURE__ */ function() {
  function n() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _classCallCheck(this, n), this.events = e, this.hop = e.hasOwnProperty;
  }
  return _createClass(n, [{
    key: "on",
    value: function(t, r) {
      if (isArray(t)) {
        for (var s = 0; s < t.length; s++)
          this.on(t[s], r);
        return;
      }
      this.hop.call(this.events, t) || (this.events[t] = []);
      var o = this.events[t].push(r) - 1;
      return {
        remove: function() {
          delete this.events[t][o];
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
    value: function(t, r) {
      if (isArray(t)) {
        for (var s = 0; s < t.length; s++)
          this.emit(t[s], r);
        return;
      }
      this.hop.call(this.events, t) && this.events[t].forEach(function(o) {
        o(r || {});
      });
    }
  }]), n;
}(), Glide$1 = /* @__PURE__ */ function() {
  function n(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    _classCallCheck(this, n), this._c = {}, this._t = [], this._e = new EventsBus(), this.disabled = !1, this.selector = e, this.settings = mergeOptions(defaults, t), this.index = this.settings.startAt;
  }
  return _createClass(n, [{
    key: "mount",
    value: function() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return this._e.emit("mount.before"), isObject(t) ? this._c = mount(this, t, this._e) : warn("You need to provide a object on `mount()`"), this._e.emit("mount.after"), this;
    }
    /**
     * Collects an instance `translate` transformers.
     *
     * @param  {Array} transformers Collection of transformers.
     * @return {Void}
     */
  }, {
    key: "mutate",
    value: function() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      return isArray(t) ? this._t = t : warn("You need to provide a array on `mutate()`"), this;
    }
    /**
     * Updates glide with specified settings.
     *
     * @param {Object} settings
     * @return {Glide}
     */
  }, {
    key: "update",
    value: function() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return this.settings = mergeOptions(this.settings, t), t.hasOwnProperty("startAt") && (this.index = t.startAt), this._e.emit("update"), this;
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
    value: function(t) {
      return this._c.Run.make(t), this;
    }
    /**
     * Move track by specified distance.
     *
     * @param {String} distance
     * @return {Glide}
     */
  }, {
    key: "move",
    value: function(t) {
      return this._c.Transition.disable(), this._c.Move.make(t), this;
    }
    /**
     * Destroy instance and revert all changes done by this._c.
     *
     * @return {Glide}
     */
  }, {
    key: "destroy",
    value: function() {
      return this._e.emit("destroy"), this;
    }
    /**
     * Start instance autoplaying.
     *
     * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Glide}
     */
  }, {
    key: "play",
    value: function() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
      return t && (this.settings.autoplay = t), this._e.emit("play"), this;
    }
    /**
     * Stop instance autoplaying.
     *
     * @return {Glide}
     */
  }, {
    key: "pause",
    value: function() {
      return this._e.emit("pause"), this;
    }
    /**
     * Sets glide into a idle status.
     *
     * @return {Glide}
     */
  }, {
    key: "disable",
    value: function() {
      return this.disabled = !0, this;
    }
    /**
     * Sets glide into a active status.
     *
     * @return {Glide}
     */
  }, {
    key: "enable",
    value: function() {
      return this.disabled = !1, this;
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
    value: function(t, r) {
      return this._e.on(t, r), this;
    }
    /**
     * Checks if glide is a precised type.
     *
     * @param  {String} name
     * @return {Boolean}
     */
  }, {
    key: "isType",
    value: function(t) {
      return this.settings.type === t;
    }
    /**
     * Gets value of the core options.
     *
     * @return {Object}
     */
  }, {
    key: "settings",
    get: function() {
      return this._o;
    },
    set: function(t) {
      isObject(t) ? this._o = t : warn("Options must be an `object` instance.");
    }
    /**
     * Gets current index of the slider.
     *
     * @return {Object}
     */
  }, {
    key: "index",
    get: function() {
      return this._i;
    },
    set: function(t) {
      this._i = toInt(t);
    }
    /**
     * Gets type name of the slider.
     *
     * @return {String}
     */
  }, {
    key: "type",
    get: function() {
      return this.settings.type;
    }
    /**
     * Gets value of the idle status.
     *
     * @return {Boolean}
     */
  }, {
    key: "disabled",
    get: function() {
      return this._d;
    },
    set: function(t) {
      this._d = !!t;
    }
  }]), n;
}();
function Run(n, e, t) {
  var r = {
    /**
     * Initializes autorunning of the glide.
     *
     * @return {Void}
     */
    mount: function() {
      this._o = !1;
    },
    /**
     * Makes glides running based on the passed moving schema.
     *
     * @param {String} move
     */
    make: function(u) {
      var h = this;
      n.disabled || (!n.settings.waitForTransition || n.disable(), this.move = u, t.emit("run.before", this.move), this.calculate(), t.emit("run", this.move), e.Transition.after(function() {
        h.isStart() && t.emit("run.start", h.move), h.isEnd() && t.emit("run.end", h.move), h.isOffset() && (h._o = !1, t.emit("run.offset", h.move)), t.emit("run.after", h.move), n.enable();
      }));
    },
    /**
     * Calculates current index based on defined move.
     *
     * @return {Number|Undefined}
     */
    calculate: function() {
      var u = this.move, h = this.length, f = u.steps, p = u.direction, m = 1;
      if (p === "=") {
        if (n.settings.bound && toInt(f) > h) {
          n.index = h;
          return;
        }
        n.index = f;
        return;
      }
      if (p === ">" && f === ">") {
        n.index = h;
        return;
      }
      if (p === "<" && f === "<") {
        n.index = 0;
        return;
      }
      if (p === "|" && (m = n.settings.perView || 1), p === ">" || p === "|" && f === ">") {
        var E = s(m);
        E > h && (this._o = !0), n.index = o(E, m);
        return;
      }
      if (p === "<" || p === "|" && f === "<") {
        var g = a(m);
        g < 0 && (this._o = !0), n.index = c(g, m);
        return;
      }
      warn("Invalid direction pattern [".concat(p).concat(f, "] has been used"));
    },
    /**
     * Checks if we are on the first slide.
     *
     * @return {Boolean}
     */
    isStart: function() {
      return n.index <= 0;
    },
    /**
     * Checks if we are on the last slide.
     *
     * @return {Boolean}
     */
    isEnd: function() {
      return n.index >= this.length;
    },
    /**
     * Checks if we are making a offset run.
     *
     * @param {String} direction
     * @return {Boolean}
     */
    isOffset: function() {
      var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
      return u ? this._o ? u === "|>" ? this.move.direction === "|" && this.move.steps === ">" : u === "|<" ? this.move.direction === "|" && this.move.steps === "<" : this.move.direction === u : !1 : this._o;
    },
    /**
     * Checks if bound mode is active
     *
     * @return {Boolean}
     */
    isBound: function() {
      return n.isType("slider") && n.settings.focusAt !== "center" && n.settings.bound;
    }
  };
  function s(l) {
    var u = n.index;
    return n.isType("carousel") ? u + l : u + (l - u % l);
  }
  function o(l, u) {
    var h = r.length;
    return l <= h ? l : n.isType("carousel") ? l - (h + 1) : n.settings.rewind ? r.isBound() && !r.isEnd() ? h : 0 : r.isBound() ? h : Math.floor(h / u) * u;
  }
  function a(l) {
    var u = n.index;
    if (n.isType("carousel"))
      return u - l;
    var h = Math.ceil(u / l);
    return (h - 1) * l;
  }
  function c(l, u) {
    var h = r.length;
    return l >= 0 ? l : n.isType("carousel") ? l + (h + 1) : n.settings.rewind ? r.isBound() && r.isStart() ? h : Math.floor(h / u) * u : 0;
  }
  return define(r, "move", {
    /**
     * Gets value of the move schema.
     *
     * @returns {Object}
     */
    get: function() {
      return this._m;
    },
    /**
     * Sets value of the move schema.
     *
     * @returns {Object}
     */
    set: function(u) {
      var h = u.substr(1);
      this._m = {
        direction: u.substr(0, 1),
        steps: h ? toInt(h) ? toInt(h) : h : 0
      };
    }
  }), define(r, "length", {
    /**
     * Gets value of the running distance based
     * on zero-indexing number of slides.
     *
     * @return {Number}
     */
    get: function() {
      var u = n.settings, h = e.Html.slides.length;
      return this.isBound() ? h - 1 - (toInt(u.perView) - 1) + toInt(u.focusAt) : h - 1;
    }
  }), define(r, "offset", {
    /**
     * Gets status of the offsetting flag.
     *
     * @return {Boolean}
     */
    get: function() {
      return this._o;
    }
  }), r;
}
function now() {
  return (/* @__PURE__ */ new Date()).getTime();
}
function throttle(n, e) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r, s, o, a, c = 0, l = function() {
    c = t.leading === !1 ? 0 : now(), r = null, a = n.apply(s, o), r || (s = o = null);
  }, u = function() {
    var f = now();
    !c && t.leading === !1 && (c = f);
    var p = e - (f - c);
    return s = this, o = arguments, p <= 0 || p > e ? (r && (clearTimeout(r), r = null), c = f, a = n.apply(s, o), r || (s = o = null)) : !r && t.trailing !== !1 && (r = setTimeout(l, p)), a;
  };
  return u.cancel = function() {
    clearTimeout(r), c = 0, r = s = o = null;
  }, u;
}
var MARGIN_TYPE = {
  ltr: ["marginLeft", "marginRight"],
  rtl: ["marginRight", "marginLeft"]
};
function Gaps(n, e, t) {
  var r = {
    /**
     * Applies gaps between slides. First and last
     * slides do not receive it's edge margins.
     *
     * @param {HTMLCollection} slides
     * @return {Void}
     */
    apply: function(o) {
      for (var a = 0, c = o.length; a < c; a++) {
        var l = o[a].style, u = e.Direction.value;
        a !== 0 ? l[MARGIN_TYPE[u][0]] = "".concat(this.value / 2, "px") : l[MARGIN_TYPE[u][0]] = "", a !== o.length - 1 ? l[MARGIN_TYPE[u][1]] = "".concat(this.value / 2, "px") : l[MARGIN_TYPE[u][1]] = "";
      }
    },
    /**
     * Removes gaps from the slides.
     *
     * @param {HTMLCollection} slides
     * @returns {Void}
    */
    remove: function(o) {
      for (var a = 0, c = o.length; a < c; a++) {
        var l = o[a].style;
        l.marginLeft = "", l.marginRight = "";
      }
    }
  };
  return define(r, "value", {
    /**
     * Gets value of the gap.
     *
     * @returns {Number}
     */
    get: function() {
      return toInt(n.settings.gap);
    }
  }), define(r, "grow", {
    /**
     * Gets additional dimensions value caused by gaps.
     * Used to increase width of the slides wrapper.
     *
     * @returns {Number}
     */
    get: function() {
      return r.value * e.Sizes.length;
    }
  }), define(r, "reductor", {
    /**
     * Gets reduction value caused by gaps.
     * Used to subtract width of the slides.
     *
     * @returns {Number}
     */
    get: function() {
      var o = n.settings.perView;
      return r.value * (o - 1) / o;
    }
  }), t.on(["build.after", "update"], throttle(function() {
    r.apply(e.Html.wrapper.children);
  }, 30)), t.on("destroy", function() {
    r.remove(e.Html.wrapper.children);
  }), r;
}
function siblings(n) {
  if (n && n.parentNode) {
    for (var e = n.parentNode.firstChild, t = []; e; e = e.nextSibling)
      e.nodeType === 1 && e !== n && t.push(e);
    return t;
  }
  return [];
}
function toArray(n) {
  return Array.prototype.slice.call(n);
}
var TRACK_SELECTOR = '[data-glide-el="track"]';
function Html(n, e, t) {
  var r = {
    /**
     * Setup slider HTML nodes.
     *
     * @param {Glide} glide
     */
    mount: function() {
      this.root = n.selector, this.track = this.root.querySelector(TRACK_SELECTOR), this.collectSlides();
    },
    /**
     * Collect slides
     */
    collectSlides: function() {
      this.slides = toArray(this.wrapper.children).filter(function(o) {
        return !o.classList.contains(n.settings.classes.slide.clone);
      });
    }
  };
  return define(r, "root", {
    /**
     * Gets node of the glide main element.
     *
     * @return {Object}
     */
    get: function() {
      return r._r;
    },
    /**
     * Sets node of the glide main element.
     *
     * @return {Object}
     */
    set: function(o) {
      isString(o) && (o = document.querySelector(o)), o !== null ? r._r = o : warn("Root element must be a existing Html node");
    }
  }), define(r, "track", {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get: function() {
      return r._t;
    },
    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set: function(o) {
      r._t = o;
    }
  }), define(r, "wrapper", {
    /**
     * Gets node of the slides wrapper.
     *
     * @return {Object}
     */
    get: function() {
      return r.track.children[0];
    }
  }), t.on("update", function() {
    r.collectSlides();
  }), r;
}
function Peek(n, e, t) {
  var r = {
    /**
     * Setups how much to peek based on settings.
     *
     * @return {Void}
     */
    mount: function() {
      this.value = n.settings.peek;
    }
  };
  return define(r, "value", {
    /**
     * Gets value of the peek.
     *
     * @returns {Number|Object}
     */
    get: function() {
      return r._v;
    },
    /**
     * Sets value of the peek.
     *
     * @param {Number|Object} value
     * @return {Void}
     */
    set: function(o) {
      isObject(o) ? (o.before = toInt(o.before), o.after = toInt(o.after)) : o = toInt(o), r._v = o;
    }
  }), define(r, "reductor", {
    /**
     * Gets reduction value caused by peek.
     *
     * @returns {Number}
     */
    get: function() {
      var o = r.value, a = n.settings.perView;
      return isObject(o) ? o.before / a + o.after / a : o * 2 / a;
    }
  }), t.on(["resize", "update"], function() {
    r.mount();
  }), r;
}
function Move(n, e, t) {
  var r = {
    /**
     * Constructs move component.
     *
     * @returns {Void}
     */
    mount: function() {
      this._o = 0;
    },
    /**
     * Calculates a movement value based on passed offset and currently active index.
     *
     * @param  {Number} offset
     * @return {Void}
     */
    make: function() {
      var o = this, a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      this.offset = a, t.emit("move", {
        movement: this.value
      }), e.Transition.after(function() {
        t.emit("move.after", {
          movement: o.value
        });
      });
    }
  };
  return define(r, "offset", {
    /**
     * Gets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    get: function() {
      return r._o;
    },
    /**
     * Sets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    set: function(o) {
      r._o = isUndefined(o) ? 0 : toInt(o);
    }
  }), define(r, "translate", {
    /**
     * Gets a raw movement value.
     *
     * @return {Number}
     */
    get: function() {
      return e.Sizes.slideWidth * n.index;
    }
  }), define(r, "value", {
    /**
     * Gets an actual movement value corrected by offset.
     *
     * @return {Number}
     */
    get: function() {
      var o = this.offset, a = this.translate;
      return e.Direction.is("rtl") ? a + o : a - o;
    }
  }), t.on(["build.before", "run"], function() {
    r.make();
  }), r;
}
function Sizes(n, e, t) {
  var r = {
    /**
     * Setups dimensions of slides.
     *
     * @return {Void}
     */
    setupSlides: function() {
      for (var o = "".concat(this.slideWidth, "px"), a = e.Html.slides, c = 0; c < a.length; c++)
        a[c].style.width = o;
    },
    /**
     * Setups dimensions of slides wrapper.
     *
     * @return {Void}
     */
    setupWrapper: function() {
      e.Html.wrapper.style.width = "".concat(this.wrapperSize, "px");
    },
    /**
     * Removes applied styles from HTML elements.
     *
     * @returns {Void}
     */
    remove: function() {
      for (var o = e.Html.slides, a = 0; a < o.length; a++)
        o[a].style.width = "";
      e.Html.wrapper.style.width = "";
    }
  };
  return define(r, "length", {
    /**
     * Gets count number of the slides.
     *
     * @return {Number}
     */
    get: function() {
      return e.Html.slides.length;
    }
  }), define(r, "width", {
    /**
     * Gets width value of the slider (visible area).
     *
     * @return {Number}
     */
    get: function() {
      return e.Html.track.offsetWidth;
    }
  }), define(r, "wrapperSize", {
    /**
     * Gets size of the slides wrapper.
     *
     * @return {Number}
     */
    get: function() {
      return r.slideWidth * r.length + e.Gaps.grow + e.Clones.grow;
    }
  }), define(r, "slideWidth", {
    /**
     * Gets width value of a single slide.
     *
     * @return {Number}
     */
    get: function() {
      return r.width / n.settings.perView - e.Peek.reductor - e.Gaps.reductor;
    }
  }), t.on(["build.before", "resize", "update"], function() {
    r.setupSlides(), r.setupWrapper();
  }), t.on("destroy", function() {
    r.remove();
  }), r;
}
function Build(n, e, t) {
  var r = {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     *
     * @return {Void}
     */
    mount: function() {
      t.emit("build.before"), this.typeClass(), this.activeClass(), t.emit("build.after");
    },
    /**
     * Adds `type` class to the glide element.
     *
     * @return {Void}
     */
    typeClass: function() {
      e.Html.root.classList.add(n.settings.classes.type[n.settings.type]);
    },
    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    activeClass: function() {
      var o = n.settings.classes, a = e.Html.slides[n.index];
      a && (a.classList.add(o.slide.active), siblings(a).forEach(function(c) {
        c.classList.remove(o.slide.active);
      }));
    },
    /**
     * Removes HTML classes applied at building.
     *
     * @return {Void}
     */
    removeClasses: function() {
      var o = n.settings.classes, a = o.type, c = o.slide;
      e.Html.root.classList.remove(a[n.settings.type]), e.Html.slides.forEach(function(l) {
        l.classList.remove(c.active);
      });
    }
  };
  return t.on(["destroy", "update"], function() {
    r.removeClasses();
  }), t.on(["resize", "update"], function() {
    r.mount();
  }), t.on("move.after", function() {
    r.activeClass();
  }), r;
}
function Clones(n, e, t) {
  var r = {
    /**
     * Create pattern map and collect slides to be cloned.
     */
    mount: function() {
      this.items = [], n.isType("carousel") && (this.items = this.collect());
    },
    /**
     * Collect clones with pattern.
     *
     * @return {[]}
     */
    collect: function() {
      var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], a = e.Html.slides, c = n.settings, l = c.perView, u = c.classes, h = c.cloningRatio;
      if (a.length > 0)
        for (var f = +!!n.settings.peek, p = l + f + Math.round(l / 2), m = a.slice(0, p).reverse(), E = a.slice(p * -1), g = 0; g < Math.max(h, Math.floor(l / a.length)); g++) {
          for (var b = 0; b < m.length; b++) {
            var w = m[b].cloneNode(!0);
            w.classList.add(u.slide.clone), o.push(w);
          }
          for (var $ = 0; $ < E.length; $++) {
            var B = E[$].cloneNode(!0);
            B.classList.add(u.slide.clone), o.unshift(B);
          }
        }
      return o;
    },
    /**
     * Append cloned slides with generated pattern.
     *
     * @return {Void}
     */
    append: function() {
      for (var o = this.items, a = e.Html, c = a.wrapper, l = a.slides, u = Math.floor(o.length / 2), h = o.slice(0, u).reverse(), f = o.slice(u * -1).reverse(), p = "".concat(e.Sizes.slideWidth, "px"), m = 0; m < f.length; m++)
        c.appendChild(f[m]);
      for (var E = 0; E < h.length; E++)
        c.insertBefore(h[E], l[0]);
      for (var g = 0; g < o.length; g++)
        o[g].style.width = p;
    },
    /**
     * Remove all cloned slides.
     *
     * @return {Void}
     */
    remove: function() {
      for (var o = this.items, a = 0; a < o.length; a++)
        e.Html.wrapper.removeChild(o[a]);
    }
  };
  return define(r, "grow", {
    /**
     * Gets additional dimensions value caused by clones.
     *
     * @return {Number}
     */
    get: function() {
      return (e.Sizes.slideWidth + e.Gaps.value) * r.items.length;
    }
  }), t.on("update", function() {
    r.remove(), r.mount(), r.append();
  }), t.on("build.before", function() {
    n.isType("carousel") && r.append();
  }), t.on("destroy", function() {
    r.remove();
  }), r;
}
var EventsBinder = /* @__PURE__ */ function() {
  function n() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _classCallCheck(this, n), this.listeners = e;
  }
  return _createClass(n, [{
    key: "on",
    value: function(t, r, s) {
      var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
      isString(t) && (t = [t]);
      for (var a = 0; a < t.length; a++)
        this.listeners[t[a]] = s, r.addEventListener(t[a], this.listeners[t[a]], o);
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
    value: function(t, r) {
      var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
      isString(t) && (t = [t]);
      for (var o = 0; o < t.length; o++)
        r.removeEventListener(t[o], this.listeners[t[o]], s);
    }
    /**
     * Destroy collected listeners.
     *
     * @returns {Void}
     */
  }, {
    key: "destroy",
    value: function() {
      delete this.listeners;
    }
  }]), n;
}();
function Resize(n, e, t) {
  var r = new EventsBinder(), s = {
    /**
     * Initializes window bindings.
     */
    mount: function() {
      this.bind();
    },
    /**
     * Binds `rezsize` listener to the window.
     * It's a costly event, so we are debouncing it.
     *
     * @return {Void}
     */
    bind: function() {
      r.on("resize", window, throttle(function() {
        t.emit("resize");
      }, n.settings.throttle));
    },
    /**
     * Unbinds listeners from the window.
     *
     * @return {Void}
     */
    unbind: function() {
      r.off("resize", window);
    }
  };
  return t.on("destroy", function() {
    s.unbind(), r.destroy();
  }), s;
}
var VALID_DIRECTIONS = ["ltr", "rtl"], FLIPED_MOVEMENTS = {
  ">": "<",
  "<": ">",
  "=": "="
};
function Direction(n, e, t) {
  var r = {
    /**
     * Setups gap value based on settings.
     *
     * @return {Void}
     */
    mount: function() {
      this.value = n.settings.direction;
    },
    /**
     * Resolves pattern based on direction value
     *
     * @param {String} pattern
     * @returns {String}
     */
    resolve: function(o) {
      var a = o.slice(0, 1);
      return this.is("rtl") ? o.split(a).join(FLIPED_MOVEMENTS[a]) : o;
    },
    /**
     * Checks value of direction mode.
     *
     * @param {String} direction
     * @returns {Boolean}
     */
    is: function(o) {
      return this.value === o;
    },
    /**
     * Applies direction class to the root HTML element.
     *
     * @return {Void}
     */
    addClass: function() {
      e.Html.root.classList.add(n.settings.classes.direction[this.value]);
    },
    /**
     * Removes direction class from the root HTML element.
     *
     * @return {Void}
     */
    removeClass: function() {
      e.Html.root.classList.remove(n.settings.classes.direction[this.value]);
    }
  };
  return define(r, "value", {
    /**
     * Gets value of the direction.
     *
     * @returns {Number}
     */
    get: function() {
      return r._v;
    },
    /**
     * Sets value of the direction.
     *
     * @param {String} value
     * @return {Void}
     */
    set: function(o) {
      VALID_DIRECTIONS.indexOf(o) > -1 ? r._v = o : warn("Direction value must be `ltr` or `rtl`");
    }
  }), t.on(["destroy", "update"], function() {
    r.removeClass();
  }), t.on("update", function() {
    r.mount();
  }), t.on(["build.before", "update"], function() {
    r.addClass();
  }), r;
}
function Rtl(n, e) {
  return {
    /**
     * Negates the passed translate if glide is in RTL option.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function(r) {
      return e.Direction.is("rtl") ? -r : r;
    }
  };
}
function Gap(n, e) {
  return {
    /**
     * Modifies passed translate value with number in the `gap` settings.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function(r) {
      var s = Math.floor(r / e.Sizes.slideWidth);
      return r + e.Gaps.value * s;
    }
  };
}
function Grow(n, e) {
  return {
    /**
     * Adds to the passed translate width of the half of clones.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function(r) {
      return r + e.Clones.grow / 2;
    }
  };
}
function Peeking(n, e) {
  return {
    /**
     * Modifies passed translate value with a `peek` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function(r) {
      if (n.settings.focusAt >= 0) {
        var s = e.Peek.value;
        return isObject(s) ? r - s.before : r - s;
      }
      return r;
    }
  };
}
function Focusing(n, e) {
  return {
    /**
     * Modifies passed translate value with index in the `focusAt` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function(r) {
      var s = e.Gaps.value, o = e.Sizes.width, a = n.settings.focusAt, c = e.Sizes.slideWidth;
      return a === "center" ? r - (o / 2 - c / 2) : r - c * a - s * a;
    }
  };
}
function mutator(n, e, t) {
  var r = [Gap, Grow, Peeking, Focusing].concat(n._t, [Rtl]);
  return {
    /**
     * Piplines translate value with registered transformers.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    mutate: function(o) {
      for (var a = 0; a < r.length; a++) {
        var c = r[a];
        isFunction(c) && isFunction(c().modify) ? o = c(n, e, t).modify(o) : warn("Transformer should be a function that returns an object with `modify()` method");
      }
      return o;
    }
  };
}
function Translate(n, e, t) {
  var r = {
    /**
     * Sets value of translate on HTML element.
     *
     * @param {Number} value
     * @return {Void}
     */
    set: function(o) {
      var a = mutator(n, e).mutate(o), c = "translate3d(".concat(-1 * a, "px, 0px, 0px)");
      e.Html.wrapper.style.mozTransform = c, e.Html.wrapper.style.webkitTransform = c, e.Html.wrapper.style.transform = c;
    },
    /**
     * Removes value of translate from HTML element.
     *
     * @return {Void}
     */
    remove: function() {
      e.Html.wrapper.style.transform = "";
    },
    /**
     * @return {number}
     */
    getStartIndex: function() {
      var o = e.Sizes.length, a = n.index, c = n.settings.perView;
      return e.Run.isOffset(">") || e.Run.isOffset("|>") ? o + (a - c) : (a + c) % o;
    },
    /**
     * @return {number}
     */
    getTravelDistance: function() {
      var o = e.Sizes.slideWidth * n.settings.perView;
      return e.Run.isOffset(">") || e.Run.isOffset("|>") ? o * -1 : o;
    }
  };
  return t.on("move", function(s) {
    if (!n.isType("carousel") || !e.Run.isOffset())
      return r.set(s.movement);
    e.Transition.after(function() {
      t.emit("translate.jump"), r.set(e.Sizes.slideWidth * n.index);
    });
    var o = e.Sizes.slideWidth * e.Translate.getStartIndex();
    return r.set(o - e.Translate.getTravelDistance());
  }), t.on("destroy", function() {
    r.remove();
  }), r;
}
function Transition(n, e, t) {
  var r = !1, s = {
    /**
     * Composes string of the CSS transition.
     *
     * @param {String} property
     * @return {String}
     */
    compose: function(a) {
      var c = n.settings;
      return r ? "".concat(a, " 0ms ").concat(c.animationTimingFunc) : "".concat(a, " ").concat(this.duration, "ms ").concat(c.animationTimingFunc);
    },
    /**
     * Sets value of transition on HTML element.
     *
     * @param {String=} property
     * @return {Void}
     */
    set: function() {
      var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "transform";
      e.Html.wrapper.style.transition = this.compose(a);
    },
    /**
     * Removes value of transition from HTML element.
     *
     * @return {Void}
     */
    remove: function() {
      e.Html.wrapper.style.transition = "";
    },
    /**
     * Runs callback after animation.
     *
     * @param  {Function} callback
     * @return {Void}
     */
    after: function(a) {
      setTimeout(function() {
        a();
      }, this.duration);
    },
    /**
     * Enable transition.
     *
     * @return {Void}
     */
    enable: function() {
      r = !1, this.set();
    },
    /**
     * Disable transition.
     *
     * @return {Void}
     */
    disable: function() {
      r = !0, this.set();
    }
  };
  return define(s, "duration", {
    /**
     * Gets duration of the transition based
     * on currently running animation type.
     *
     * @return {Number}
     */
    get: function() {
      var a = n.settings;
      return n.isType("slider") && e.Run.offset ? a.rewindDuration : a.animationDuration;
    }
  }), t.on("move", function() {
    s.set();
  }), t.on(["build.before", "resize", "translate.jump"], function() {
    s.disable();
  }), t.on("run", function() {
    s.enable();
  }), t.on("destroy", function() {
    s.remove();
  }), s;
}
var supportsPassive = !1;
try {
  var opts = Object.defineProperty({}, "passive", {
    get: function() {
      supportsPassive = !0;
    }
  });
  window.addEventListener("testPassive", null, opts), window.removeEventListener("testPassive", null, opts);
} catch (n) {
}
var supportsPassive$1 = supportsPassive, START_EVENTS = ["touchstart", "mousedown"], MOVE_EVENTS = ["touchmove", "mousemove"], END_EVENTS = ["touchend", "touchcancel", "mouseup", "mouseleave"], MOUSE_EVENTS = ["mousedown", "mousemove", "mouseup", "mouseleave"];
function Swipe(n, e, t) {
  var r = new EventsBinder(), s = 0, o = 0, a = 0, c = !1, l = supportsPassive$1 ? {
    passive: !0
  } : !1, u = {
    /**
     * Initializes swipe bindings.
     *
     * @return {Void}
     */
    mount: function() {
      this.bindSwipeStart();
    },
    /**
     * Handler for `swipestart` event. Calculates entry points of the user's tap.
     *
     * @param {Object} event
     * @return {Void}
     */
    start: function(f) {
      if (!c && !n.disabled) {
        this.disable();
        var p = this.touches(f);
        s = null, o = toInt(p.pageX), a = toInt(p.pageY), this.bindSwipeMove(), this.bindSwipeEnd(), t.emit("swipe.start");
      }
    },
    /**
     * Handler for `swipemove` event. Calculates user's tap angle and distance.
     *
     * @param {Object} event
     */
    move: function(f) {
      if (!n.disabled) {
        var p = n.settings, m = p.touchAngle, E = p.touchRatio, g = p.classes, b = this.touches(f), w = toInt(b.pageX) - o, $ = toInt(b.pageY) - a, B = Math.abs(w << 2), P = Math.abs($ << 2), U = Math.sqrt(B + P), R = Math.sqrt(P);
        if (s = Math.asin(R / U), s * 180 / Math.PI < m)
          f.stopPropagation(), e.Move.make(w * toFloat(E)), e.Html.root.classList.add(g.dragging), t.emit("swipe.move");
        else
          return !1;
      }
    },
    /**
     * Handler for `swipeend` event. Finitializes user's tap and decides about glide move.
     *
     * @param {Object} event
     * @return {Void}
     */
    end: function(f) {
      if (!n.disabled) {
        var p = n.settings, m = p.perSwipe, E = p.touchAngle, g = p.classes, b = this.touches(f), w = this.threshold(f), $ = b.pageX - o, B = s * 180 / Math.PI;
        this.enable(), $ > w && B < E ? e.Run.make(e.Direction.resolve("".concat(m, "<"))) : $ < -w && B < E ? e.Run.make(e.Direction.resolve("".concat(m, ">"))) : e.Move.make(), e.Html.root.classList.remove(g.dragging), this.unbindSwipeMove(), this.unbindSwipeEnd(), t.emit("swipe.end");
      }
    },
    /**
     * Binds swipe's starting event.
     *
     * @return {Void}
     */
    bindSwipeStart: function() {
      var f = this, p = n.settings, m = p.swipeThreshold, E = p.dragThreshold;
      m && r.on(START_EVENTS[0], e.Html.wrapper, function(g) {
        f.start(g);
      }, l), E && r.on(START_EVENTS[1], e.Html.wrapper, function(g) {
        f.start(g);
      }, l);
    },
    /**
     * Unbinds swipe's starting event.
     *
     * @return {Void}
     */
    unbindSwipeStart: function() {
      r.off(START_EVENTS[0], e.Html.wrapper, l), r.off(START_EVENTS[1], e.Html.wrapper, l);
    },
    /**
     * Binds swipe's moving event.
     *
     * @return {Void}
     */
    bindSwipeMove: function() {
      var f = this;
      r.on(MOVE_EVENTS, e.Html.wrapper, throttle(function(p) {
        f.move(p);
      }, n.settings.throttle), l);
    },
    /**
     * Unbinds swipe's moving event.
     *
     * @return {Void}
     */
    unbindSwipeMove: function() {
      r.off(MOVE_EVENTS, e.Html.wrapper, l);
    },
    /**
     * Binds swipe's ending event.
     *
     * @return {Void}
     */
    bindSwipeEnd: function() {
      var f = this;
      r.on(END_EVENTS, e.Html.wrapper, function(p) {
        f.end(p);
      });
    },
    /**
     * Unbinds swipe's ending event.
     *
     * @return {Void}
     */
    unbindSwipeEnd: function() {
      r.off(END_EVENTS, e.Html.wrapper);
    },
    /**
     * Normalizes event touches points accorting to different types.
     *
     * @param {Object} event
     */
    touches: function(f) {
      return MOUSE_EVENTS.indexOf(f.type) > -1 ? f : f.touches[0] || f.changedTouches[0];
    },
    /**
     * Gets value of minimum swipe distance settings based on event type.
     *
     * @return {Number}
     */
    threshold: function(f) {
      var p = n.settings;
      return MOUSE_EVENTS.indexOf(f.type) > -1 ? p.dragThreshold : p.swipeThreshold;
    },
    /**
     * Enables swipe event.
     *
     * @return {self}
     */
    enable: function() {
      return c = !1, e.Transition.enable(), this;
    },
    /**
     * Disables swipe event.
     *
     * @return {self}
     */
    disable: function() {
      return c = !0, e.Transition.disable(), this;
    }
  };
  return t.on("build.after", function() {
    e.Html.root.classList.add(n.settings.classes.swipeable);
  }), t.on("destroy", function() {
    u.unbindSwipeStart(), u.unbindSwipeMove(), u.unbindSwipeEnd(), r.destroy();
  }), u;
}
function Images(n, e, t) {
  var r = new EventsBinder(), s = {
    /**
     * Binds listener to glide wrapper.
     *
     * @return {Void}
     */
    mount: function() {
      this.bind();
    },
    /**
     * Binds `dragstart` event on wrapper to prevent dragging images.
     *
     * @return {Void}
     */
    bind: function() {
      r.on("dragstart", e.Html.wrapper, this.dragstart);
    },
    /**
     * Unbinds `dragstart` event on wrapper.
     *
     * @return {Void}
     */
    unbind: function() {
      r.off("dragstart", e.Html.wrapper);
    },
    /**
     * Event handler. Prevents dragging.
     *
     * @return {Void}
     */
    dragstart: function(a) {
      a.preventDefault();
    }
  };
  return t.on("destroy", function() {
    s.unbind(), r.destroy();
  }), s;
}
function Anchors(n, e, t) {
  var r = new EventsBinder(), s = !1, o = !1, a = {
    /**
     * Setups a initial state of anchors component.
     *
     * @returns {Void}
     */
    mount: function() {
      this._a = e.Html.wrapper.querySelectorAll("a"), this.bind();
    },
    /**
     * Binds events to anchors inside a track.
     *
     * @return {Void}
     */
    bind: function() {
      r.on("click", e.Html.wrapper, this.click);
    },
    /**
     * Unbinds events attached to anchors inside a track.
     *
     * @return {Void}
     */
    unbind: function() {
      r.off("click", e.Html.wrapper);
    },
    /**
     * Handler for click event. Prevents clicks when glide is in `prevent` status.
     *
     * @param  {Object} event
     * @return {Void}
     */
    click: function(l) {
      o && (l.stopPropagation(), l.preventDefault());
    },
    /**
     * Detaches anchors click event inside glide.
     *
     * @return {self}
     */
    detach: function() {
      if (o = !0, !s) {
        for (var l = 0; l < this.items.length; l++)
          this.items[l].draggable = !1;
        s = !0;
      }
      return this;
    },
    /**
     * Attaches anchors click events inside glide.
     *
     * @return {self}
     */
    attach: function() {
      if (o = !1, s) {
        for (var l = 0; l < this.items.length; l++)
          this.items[l].draggable = !0;
        s = !1;
      }
      return this;
    }
  };
  return define(a, "items", {
    /**
     * Gets collection of the arrows HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function() {
      return a._a;
    }
  }), t.on("swipe.move", function() {
    a.detach();
  }), t.on("swipe.end", function() {
    e.Transition.after(function() {
      a.attach();
    });
  }), t.on("destroy", function() {
    a.attach(), a.unbind(), r.destroy();
  }), a;
}
var NAV_SELECTOR = '[data-glide-el="controls[nav]"]', CONTROLS_SELECTOR = '[data-glide-el^="controls"]', PREVIOUS_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, ' [data-glide-dir*="<"]'), NEXT_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, ' [data-glide-dir*=">"]');
function Controls(n, e, t) {
  var r = new EventsBinder(), s = supportsPassive$1 ? {
    passive: !0
  } : !1, o = {
    /**
     * Inits arrows. Binds events listeners
     * to the arrows HTML elements.
     *
     * @return {Void}
     */
    mount: function() {
      this._n = e.Html.root.querySelectorAll(NAV_SELECTOR), this._c = e.Html.root.querySelectorAll(CONTROLS_SELECTOR), this._arrowControls = {
        previous: e.Html.root.querySelectorAll(PREVIOUS_CONTROLS_SELECTOR),
        next: e.Html.root.querySelectorAll(NEXT_CONTROLS_SELECTOR)
      }, this.addBindings();
    },
    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    setActive: function() {
      for (var c = 0; c < this._n.length; c++)
        this.addClass(this._n[c].children);
    },
    /**
     * Removes active class to current slide.
     *
     * @return {Void}
     */
    removeActive: function() {
      for (var c = 0; c < this._n.length; c++)
        this.removeClass(this._n[c].children);
    },
    /**
     * Toggles active class on items inside navigation.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    addClass: function(c) {
      var l = n.settings, u = c[n.index];
      u && (u.classList.add(l.classes.nav.active), siblings(u).forEach(function(h) {
        h.classList.remove(l.classes.nav.active);
      }));
    },
    /**
     * Removes active class from active control.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    removeClass: function(c) {
      var l = c[n.index];
      l == null || l.classList.remove(n.settings.classes.nav.active);
    },
    /**
     * Calculates, removes or adds `Glide.settings.classes.disabledArrow` class on the control arrows
     */
    setArrowState: function() {
      if (!n.settings.rewind) {
        var c = o._arrowControls.next, l = o._arrowControls.previous;
        this.resetArrowState(c, l), n.index === 0 && this.disableArrow(l), n.index === e.Run.length && this.disableArrow(c);
      }
    },
    /**
     * Removes `Glide.settings.classes.disabledArrow` from given NodeList elements
     *
     * @param {NodeList[]} lists
     */
    resetArrowState: function() {
      for (var c = n.settings, l = arguments.length, u = new Array(l), h = 0; h < l; h++)
        u[h] = arguments[h];
      u.forEach(function(f) {
        toArray(f).forEach(function(p) {
          p.classList.remove(c.classes.arrow.disabled);
        });
      });
    },
    /**
     * Adds `Glide.settings.classes.disabledArrow` to given NodeList elements
     *
     * @param {NodeList[]} lists
     */
    disableArrow: function() {
      for (var c = n.settings, l = arguments.length, u = new Array(l), h = 0; h < l; h++)
        u[h] = arguments[h];
      u.forEach(function(f) {
        toArray(f).forEach(function(p) {
          p.classList.add(c.classes.arrow.disabled);
        });
      });
    },
    /**
     * Adds handles to the each group of controls.
     *
     * @return {Void}
     */
    addBindings: function() {
      for (var c = 0; c < this._c.length; c++)
        this.bind(this._c[c].children);
    },
    /**
     * Removes handles from the each group of controls.
     *
     * @return {Void}
     */
    removeBindings: function() {
      for (var c = 0; c < this._c.length; c++)
        this.unbind(this._c[c].children);
    },
    /**
     * Binds events to arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    bind: function(c) {
      for (var l = 0; l < c.length; l++)
        r.on("click", c[l], this.click), r.on("touchstart", c[l], this.click, s);
    },
    /**
     * Unbinds events binded to the arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    unbind: function(c) {
      for (var l = 0; l < c.length; l++)
        r.off(["click", "touchstart"], c[l]);
    },
    /**
     * Handles `click` event on the arrows HTML elements.
     * Moves slider in direction given via the
     * `data-glide-dir` attribute.
     *
     * @param {Object} event
     * @return {void}
     */
    click: function(c) {
      !supportsPassive$1 && c.type === "touchstart" && c.preventDefault();
      var l = c.currentTarget.getAttribute("data-glide-dir");
      e.Run.make(e.Direction.resolve(l));
    }
  };
  return define(o, "items", {
    /**
     * Gets collection of the controls HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function() {
      return o._c;
    }
  }), t.on(["mount.after", "move.after"], function() {
    o.setActive();
  }), t.on(["mount.after", "run"], function() {
    o.setArrowState();
  }), t.on("destroy", function() {
    o.removeBindings(), o.removeActive(), r.destroy();
  }), o;
}
function Keyboard(n, e, t) {
  var r = new EventsBinder(), s = {
    /**
     * Binds keyboard events on component mount.
     *
     * @return {Void}
     */
    mount: function() {
      n.settings.keyboard && this.bind();
    },
    /**
     * Adds keyboard press events.
     *
     * @return {Void}
     */
    bind: function() {
      r.on("keyup", document, this.press);
    },
    /**
     * Removes keyboard press events.
     *
     * @return {Void}
     */
    unbind: function() {
      r.off("keyup", document);
    },
    /**
     * Handles keyboard's arrows press and moving glide foward and backward.
     *
     * @param  {Object} event
     * @return {Void}
     */
    press: function(a) {
      var c = n.settings.perSwipe, l = {
        ArrowRight: ">",
        ArrowLeft: "<"
      };
      ["ArrowRight", "ArrowLeft"].includes(a.code) && e.Run.make(e.Direction.resolve("".concat(c).concat(l[a.code])));
    }
  };
  return t.on(["destroy", "update"], function() {
    s.unbind();
  }), t.on("update", function() {
    s.mount();
  }), t.on("destroy", function() {
    r.destroy();
  }), s;
}
function Autoplay(n, e, t) {
  var r = new EventsBinder(), s = {
    /**
     * Initializes autoplaying and events.
     *
     * @return {Void}
     */
    mount: function() {
      this.enable(), this.start(), n.settings.hoverpause && this.bind();
    },
    /**
     * Enables autoplaying
     *
     * @returns {Void}
     */
    enable: function() {
      this._e = !0;
    },
    /**
     * Disables autoplaying.
     *
     * @returns {Void}
     */
    disable: function() {
      this._e = !1;
    },
    /**
     * Starts autoplaying in configured interval.
     *
     * @param {Boolean|Number} force Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Void}
     */
    start: function() {
      var a = this;
      this._e && (this.enable(), n.settings.autoplay && isUndefined(this._i) && (this._i = setInterval(function() {
        a.stop(), e.Run.make(">"), a.start(), t.emit("autoplay");
      }, this.time)));
    },
    /**
     * Stops autorunning of the glide.
     *
     * @return {Void}
     */
    stop: function() {
      this._i = clearInterval(this._i);
    },
    /**
     * Stops autoplaying while mouse is over glide's area.
     *
     * @return {Void}
     */
    bind: function() {
      var a = this;
      r.on("mouseover", e.Html.root, function() {
        a._e && a.stop();
      }), r.on("mouseout", e.Html.root, function() {
        a._e && a.start();
      });
    },
    /**
     * Unbind mouseover events.
     *
     * @returns {Void}
     */
    unbind: function() {
      r.off(["mouseover", "mouseout"], e.Html.root);
    }
  };
  return define(s, "time", {
    /**
     * Gets time period value for the autoplay interval. Prioritizes
     * times in `data-glide-autoplay` attrubutes over options.
     *
     * @return {Number}
     */
    get: function() {
      var a = e.Html.slides[n.index].getAttribute("data-glide-autoplay");
      return toInt(a || n.settings.autoplay);
    }
  }), t.on(["destroy", "update"], function() {
    s.unbind();
  }), t.on(["run.before", "swipe.start", "update"], function() {
    s.stop();
  }), t.on(["pause", "destroy"], function() {
    s.disable(), s.stop();
  }), t.on(["run.after", "swipe.end"], function() {
    s.start();
  }), t.on(["play"], function() {
    s.enable(), s.start();
  }), t.on("update", function() {
    s.mount();
  }), t.on("destroy", function() {
    r.destroy();
  }), s;
}
function sortBreakpoints(n) {
  return isObject(n) ? sortKeys(n) : (warn("Breakpoints option must be an object"), {});
}
function Breakpoints(n, e, t) {
  var r = new EventsBinder(), s = n.settings, o = sortBreakpoints(s.breakpoints), a = Object.assign({}, s), c = {
    /**
     * Matches settings for currectly matching media breakpoint.
     *
     * @param {Object} points
     * @returns {Object}
     */
    match: function(u) {
      if (typeof window.matchMedia < "u") {
        for (var h in u)
          if (u.hasOwnProperty(h) && window.matchMedia("(max-width: ".concat(h, "px)")).matches)
            return u[h];
      }
      return a;
    }
  };
  return Object.assign(s, c.match(o)), r.on("resize", window, throttle(function() {
    n.settings = mergeOptions(s, c.match(o));
  }, n.settings.throttle)), t.on("update", function() {
    o = sortBreakpoints(o), a = Object.assign({}, s);
  }), t.on("destroy", function() {
    r.off("resize", window);
  }), c;
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
}, Glide = /* @__PURE__ */ function(n) {
  _inherits(t, n);
  var e = _createSuper(t);
  function t() {
    return _classCallCheck(this, t), e.apply(this, arguments);
  }
  return _createClass(t, [{
    key: "mount",
    value: function() {
      var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return _get(_getPrototypeOf(t.prototype), "mount", this).call(this, Object.assign({}, COMPONENTS, s));
    }
  }]), t;
}(Glide$1), we, Be, Le;
class NostrPost extends HTMLElement {
  constructor() {
    super(...arguments);
    Te(this, we);
    this.rendered = !1, this.ndk = new NDK(), this.isLoading = !0, this.isError = !1, this.theme = "light", this.post = null, this.stats = null, this.receivedData = !1, this.author = {
      name: "",
      image: "",
      nip05: ""
    }, this.onClick = null, this.onAuthorClick = null, this.connectToNostr = async () => {
      await this.ndk.connect();
    }, this.getRelays = () => {
      const t = this.getAttribute("relays");
      return t ? t.split(",") : DEFAULT_RELAYS;
    }, this.getTheme = async () => {
      this.theme = "light";
      const t = this.getAttribute("theme");
      if (t) {
        if (!["light", "dark"].includes(t))
          throw new Error(`Invalid theme '${t}'. Accepted values are 'light', 'dark'`);
        this.theme = t;
      }
    }, this.parseText = async (t) => {
      let r = t;
      const s = r.matchAll(new RegExp(nip21_exports.NOSTR_URI_REGEX, "g"));
      for (let l of s) {
        const u = nip21_exports.parse(l[0]), h = u.decoded.data;
        let f = "";
        typeof h == "string" ? f = h : f = h.pubkey;
        const p = await this.ndk.getUser({ pubkey: f }).fetchProfile(), m = (p == null ? void 0 : p.displayName) || "";
        r = r.replace(l[0], `<a href="https://njump.me/${u.value}" target="_blank">@${m}</a>`);
      }
      const o = /(https:\/\/(?!njump\.me)[\w.-]+(?:\.[\w.-]+)+(?:\/[^\s]*)?)/g, a = r.match(o), c = [];
      if (a) {
        let l = 0;
        for (const u of a) {
          const h = r.indexOf(u, l), f = h + u.length;
          h > l && c.push({ type: "text", value: r.substring(l, h) });
          const p = new URL(u);
          let m;
          p.pathname.endsWith(".jpg") || p.pathname.endsWith(".jpeg") || p.pathname.endsWith(".png") ? m = "image" : p.pathname.endsWith(".gif") ? m = "gif" : p.pathname.endsWith(".mp4") || p.pathname.endsWith(".webm") ? m = "video" : m = "link", c.push({ type: m, value: u }), l = f;
        }
        l < r.length && c.push({ type: "text", value: r.substring(l) });
      } else
        c.push({ type: "text", value: r });
      return c;
    }, this.renderContent = (t) => {
      const r = [];
      let s = 0, o = "";
      for (const a of t)
        if (a.type === "text")
          o += a.value;
        else
          switch (o && (r.push(`<span class="text-content">${o.replace(/\n/g, "<br />")}</span>`), o = ""), a.type) {
            case "image":
              r.push(`<img width="100%" src="${a.value}" alt="Image">`), s++;
              break;
            case "gif":
              r.push(`<img width="100%" src="${a.value}" alt="GIF">`), s++;
              break;
            case "video":
              r.push(`<video width="100%" src="${a.value}" controls></video>`), s++;
              break;
            case "link":
              r.push(`<a href="${a.value}">${a.value}</a>`);
              break;
          }
      if (o && r.push(`<span class="text-content">${o.replace(/\n/g, "<br />")}</span>`), s > 1) {
        const a = [];
        let c = "";
        for (let l = 0; l < r.length; l++) {
          const u = r[l];
          (u.startsWith("<img") || u.startsWith("<video")) && (a.push(`<li class="glide__slide">${u}</li>`), c += `<button class="glide__bullet" data-glide-dir="=${l}"></button>`, r.splice(l, 1), l--);
        }
        r.push(`
            <div class="glide" style="margin-top: 20px">
                <div class="glide__track" data-glide-el="track">
                    <ul class="glide__slides">
                        ${a.join("")}
                    </ul>
                </div>

                  <div class="glide__bullets" data-glide-el="controls[nav]">
                    ${c}
                </div>
            </div>
          `);
      }
      return r.join("");
    };
  }
  async connectedCallback() {
    const t = this.getAttribute("onClick");
    t !== null && (this.onClick = window[t]);
    const r = this.getAttribute("onAuthorClick");
    r !== null && (this.onAuthorClick = window[r]), this.render(), this.rendered || (this.ndk = new NDK({
      explicitRelayUrls: this.getRelays()
    }), await this.connectToNostr(), this.getPost(), this.rendered = !0);
  }
  static get observedAttributes() {
    return ["relays", "id", "theme", "show-stats", "onClick", "onAuthorClick"];
  }
  attributeChangedCallback(t, r, s) {
    t === "relays" && (this.ndk.explicitRelayUrls = this.getRelays(), this.connectToNostr()), ["relays", "id"].includes(t) && this.getPost(), t === "onClick" && (this.onClick = window[s]), t === "onAuthorClick" && (this.onAuthorClick = window[s]), t === "theme" && (this.getTheme(), this.render()), t === "show-stats" && this.render();
  }
  async getPost() {
    var t;
    try {
      this.isLoading = !0, this.render();
      const r = this.getAttribute("id") || "", s = await this.ndk.fetchEvent(r);
      if (!this.receivedData)
        if (!s)
          this.isError = !0;
        else {
          this.receivedData = !0, this.post = s;
          const o = await ((t = this.post) == null ? void 0 : t.author.fetchProfile());
          o && (this.author = o);
          const a = this.getAttribute("show-stats");
          if (this.post && a) {
            const c = await getPostStats(this.ndk, this.post.id);
            c && (this.stats = c);
          }
          this.isError = !1;
        }
    } catch (r) {
      throw console.log(r), this.isError = !0, r;
    } finally {
      this.isLoading = !1, this.render();
    }
  }
  attachEventListeners() {
    var t;
    (t = this.querySelector(".post-container")) == null || t.addEventListener("click", (r) => {
      const s = r.target;
      s.closest(".post-header-left") || s.closest(".post-header-middle") ? Ee(this, we, Le).call(this) : Ee(this, we, Be).call(this);
    });
  }
  initGlide() {
    const t = this.querySelector(".glide");
    t && new Glide(t).mount();
  }
  async render() {
    var c, l, u, h, f, p;
    const t = ((c = this.post) == null ? void 0 : c.content) || "", r = await this.parseText(t), s = this.renderContent(r);
    let o = "";
    this.post && this.post.created_at && (o = new Date(this.post.created_at * 1e3).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }));
    const a = this.getAttribute("show-stats") === "true";
    this.innerHTML = `
    ${getPostStylesLegacy(this.theme)}
    <div class="post-container">
        <div class="post-header">
          <div class="post-header-left">
            <div class="author-picture">
              ${this.isLoading ? '<div style="width: 35px; height: 35px; border-radius: 50%;" class="skeleton"></div>' : this.isError ? "" : `<img src="${(l = this.author) == null ? void 0 : l.image}" />`}
              </div>
          </div>
          <div class="post-header-middle">
            ${this.isLoading ? `
                <div style="width: 70%; height: 10px; border-radius: 10px;" class="skeleton"></div>
                <div style="width: 80%; height: 8px; border-radius: 10px; margin-top: 5px;" class="skeleton"></div>
              ` : this.isError ? "" : `
                  ${(u = this.author) != null && u.displayName ? `<span class="author-name">${(h = this.author) == null ? void 0 : h.displayName}</span>` : ""}
                  ${(f = this.author) != null && f.nip05 ? `<span class="author-username">${(p = this.author) == null ? void 0 : p.nip05}</span>` : ""}
                  
                `}
          </div>
          <div class="post-header-right">
            ${this.isLoading ? '<div style="width: 100px; height: 10px; border-radius: 10px;" class="skeleton"></div>' : this.isError ? "" : `<span class="post-date">${o}</span>`}
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
                ` : s}
        </div>


        ${a ? `
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
                          <path fill="#ffaf00" fill-rule="evenodd" clip-rule="evenodd" d="M9.49466 2.78774C7.73973 1.25408 5.14439 0.940234 3.12891 2.6623C0.948817 4.52502 0.63207 7.66213 2.35603 9.88052C3.01043 10.7226 4.28767 11.9877 5.51513 13.1462C6.75696 14.3184 7.99593 15.426 8.60692 15.9671C8.61074 15.9705 8.61463 15.9739 8.61859 15.9774C8.67603 16.0283 8.74753 16.0917 8.81608 16.1433C8.89816 16.2052 9.01599 16.2819 9.17334 16.3288C9.38253 16.3912 9.60738 16.3912 9.81656 16.3288C9.97391 16.2819 10.0917 16.2052 10.1738 16.1433C10.2424 16.0917 10.3139 16.0283 10.3713 15.9774C10.3753 15.9739 10.3792 15.9705 10.383 15.9671C10.994 15.426 12.2329 14.3184 13.4748 13.1462C14.7022 11.9877 15.9795 10.7226 16.6339 9.88052C18.3512 7.67065 18.0834 4.50935 15.8532 2.65572C13.8153 0.961905 11.2476 1.25349 9.49466 2.78774Z"/>
                        </g>
                      </svg>
                      <span>${this.stats.zaps}</span>
                    </div>
                    -->

                    <div class="stat">
                      <svg width="18" height="18">
                        <g xmlns="http://www.w3.org/2000/svg">
                          <path fill="#ff006d" d="M12.2197 1.65717C12.5126 1.36428 12.9874 1.36428 13.2803 1.65717L16.2803 4.65717C16.5732 4.95006 16.5732 5.42494 16.2803 5.71783L13.2803 8.71783C12.9874 9.01072 12.5126 9.01072 12.2197 8.71783C11.9268 8.42494 11.9268 7.95006 12.2197 7.65717L13.9393 5.9375H5.85C5.20757 5.9375 4.77085 5.93808 4.43328 5.96566C4.10447 5.99253 3.93632 6.04122 3.81902 6.10099C3.53677 6.2448 3.3073 6.47427 3.16349 6.75652C3.10372 6.87381 3.05503 7.04197 3.02816 7.37078C3.00058 7.70835 3 8.14507 3 8.7875V8.9375C3 9.35171 2.66421 9.6875 2.25 9.6875C1.83579 9.6875 1.5 9.35171 1.5 8.9375V8.75653C1.49999 8.15281 1.49998 7.65452 1.53315 7.24863C1.56759 6.82706 1.64151 6.43953 1.82698 6.07553C2.1146 5.51104 2.57354 5.0521 3.13803 4.76448C3.50203 4.57901 3.88956 4.50509 4.31113 4.47065C4.71703 4.43748 5.2153 4.43749 5.81903 4.4375L13.9393 4.4375L12.2197 2.71783C11.9268 2.42494 11.9268 1.95006 12.2197 1.65717Z"/>
                          <path fill="#1ded00" d="M15.75 9.6875C15.3358 9.6875 15 10.0233 15 10.4375V10.5875C15 11.2299 14.9994 11.6667 14.9718 12.0042C14.945 12.333 14.8963 12.5012 14.8365 12.6185C14.6927 12.9007 14.4632 13.1302 14.181 13.274C14.0637 13.3338 13.8955 13.3825 13.5667 13.4093C13.2292 13.4369 12.7924 13.4375 12.15 13.4375H4.06066L5.78033 11.7178C6.07322 11.4249 6.07322 10.9501 5.78033 10.6572C5.48744 10.3643 5.01256 10.3643 4.71967 10.6572L1.71967 13.6572C1.42678 13.9501 1.42678 14.4249 1.71967 14.7178L4.71967 17.7178C5.01256 18.0107 5.48744 18.0107 5.78033 17.7178C6.07322 17.4249 6.07322 16.9501 5.78033 16.6572L4.06066 14.9375H12.181C12.7847 14.9375 13.283 14.9375 13.6889 14.9044C14.1104 14.8699 14.498 14.796 14.862 14.6105C15.4265 14.3229 15.8854 13.864 16.173 13.2995C16.3585 12.9355 16.4324 12.5479 16.4669 12.1264C16.5 11.7205 16.5 11.2222 16.5 10.6185V10.4375C16.5 10.0233 16.1642 9.6875 15.75 9.6875Z"/>
                        </g>
                      </svg>
                      <span>${this.stats.likes}</span>
                    </div>
                  </div>
                `}
            </div>
          ` : ""}
    </div>
    `, s.includes('class="glide"') && setTimeout(() => this.initGlide(), 0), this.attachEventListeners();
  }
}
we = new WeakSet(), Be = function() {
  if (this.isError)
    return;
  if (this.onClick !== null && typeof this.onClick == "function") {
    this.onClick(this.post);
    return;
  }
  let t = this.getAttribute("id");
  window.open(`https://njump.me/${t}`, "_blank");
}, Le = function() {
  var t, r;
  if (!this.isError) {
    if (this.onAuthorClick !== null && typeof this.onAuthorClick == "function") {
      this.onAuthorClick((t = this.post) == null ? void 0 : t.author.npub, this.author);
      return;
    }
    window.open(`https://njump.me/${(r = this.post) == null ? void 0 : r.author.npub}`, "_blank");
  }
};
customElements.define("nostr-post", NostrPost);
class NostrProfile extends HTMLElement {
  constructor() {
    super(), this.rendered = !1, this.ndk = new NDK(), this.userProfile = {
      name: "",
      image: "",
      nip05: ""
    }, this.theme = "light", this.isLoading = !0, this.isStatsLoading = !0, this.isStatsFollowsLoading = !0, this.isStatsFollowersLoading = !0, this.isStatsNotesLoading = !0, this.isStatsRepliesLoading = !0, this.isStatsZapsLoading = !0, this.isStatsRelaysLoading = !0, this.isError = !1, this.isStatsError = !1, this.stats = {
      follows: 0,
      followers: 0,
      notes: 0,
      replies: 0,
      zaps: 0,
      relays: 0
    }, this.onClick = null, this.connectToNostr = async () => {
      await this.ndk.connect();
    }, this.getRelays = () => {
      const e = this.getAttribute("relays");
      return e ? e.split(",") : DEFAULT_RELAYS;
    }, this.getNDKUser = async () => {
      const e = this.getAttribute("npub"), t = this.getAttribute("nip05"), r = this.getAttribute("pubkey");
      return e ? this.ndk.getUser({
        npub: e
      }) : t ? this.ndk.getUserFromNip05(t) : r ? this.ndk.getUser({
        pubkey: r
      }) : null;
    }, this.getUserProfile = async () => {
      try {
        this.isLoading = !0, this.render();
        const e = await this.getNDKUser();
        if (e != null && e.npub)
          this.ndkUser = e, await e.fetchProfile(), e.profile ? (this.userProfile = e.profile, this.getProfileStats().then((t) => {
            this.isStatsError = !1, this.stats = t;
          }).catch((t) => {
            console.log(t), this.isStatsError = !0;
          }).finally(() => {
            this.isStatsLoading = !1, this.render();
          }), this.userProfile.image || (this.userProfile.image = "./assets/default_dp.png"), this.isError = !1) : (console.warn(`Could not fetch profile for user ${e.npub}`), this.userProfile.image = "./assets/default_dp.png", this.userProfile.name = "", this.userProfile.nip05 = "", this.stats = { follows: 0, followers: 0, notes: 0, replies: 0, zaps: 0, relays: 0 }, this.isStatsLoading = !1, this.isError = !1, this.isStatsError = !0);
        else
          throw new Error("Either npub or nip05 should be provided");
      } catch (e) {
        throw this.isError = !0, e;
      } finally {
        this.isLoading = !1, this.render();
      }
    }, this.getProfileStats = async () => {
      try {
        this.isStatsFollowsLoading = !0, this.isStatsFollowersLoading = !0, this.isStatsNotesLoading = !0;
        const e = this.ndkUser.pubkey;
        return this.ndkUser.follows().then((t) => {
          this.stats.follows = t.size, this.isStatsFollowsLoading = !1, this.render();
        }).catch((t) => {
          console.log("Error fetching follows:", t);
        }), this.ndk.fetchEvents({
          kinds: [NDKKind.Contacts],
          "#p": [e || ""]
        }).then((t) => {
          this.stats.followers = t.size, this.isStatsFollowersLoading = !1, this.render();
        }).catch((t) => {
          console.log("Error fetching followers:", t);
        }), this.ndk.fetchEvents({
          kinds: [NDKKind.Text],
          authors: [e]
        }).then((t) => {
          let r = 0;
          t.forEach((s) => {
            s.hasTag("e") && (r += 1);
          }), this.stats.replies = r, this.stats.notes = t.size - r, this.isStatsNotesLoading = !1, this.render();
        }).catch((t) => {
          console.log("Error fetching notes:", t);
        }), this.stats.zaps = 0, this.render(), this.stats.relays = 0, this.render(), this.stats;
      } catch (e) {
        throw console.log("getProfileStats", e), new Error("Error fetching stats");
      }
    }, this.getTheme = async () => {
      this.theme = "light";
      const e = this.getAttribute("theme");
      if (e) {
        if (!["light", "dark"].includes(e))
          throw new Error(`Invalid theme '${e}'. Accepted values are 'light', 'dark'`);
        this.theme = e;
      }
    }, this.attachShadow({ mode: "open" });
  }
  async connectedCallback() {
    this.rendered || (this.getTheme(), this.ndk.explicitRelayUrls = this.getRelays(), await this.connectToNostr(), this.getUserProfile(), this.rendered = !0);
  }
  static get observedAttributes() {
    return ["relays", "pubkey", "nip05", "theme", "show-npub", "show-follow", "onClick"];
  }
  attributeChangedCallback(e, t, r) {
    e === "relays" && (this.ndk.explicitRelayUrls = this.getRelays(), this.connectToNostr()), ["relays", "npub", "nip05"].includes(e) && this.getUserProfile(), e === "onClick" && (this.onClick = window[r]), e === "theme" && (this.getTheme(), this.render()), ["show-npub", "show-follow"].includes(e) && this.render();
  }
  disconnectedCallback() {
  }
  getStyles() {
    return "";
  }
  renderNpub() {
    const e = this.getAttribute("npub"), t = this.getAttribute("show-npub");
    if (t === "false" || t === null && this.userProfile.nip05 || this.ndkUser == null)
      return "";
    if (!e && !this.ndkUser.npub)
      return console.warn("Cannot use showNpub without providing a nPub"), "";
    let r = e;
    return !r && this.ndkUser && this.ndkUser.npub && (r = this.ndkUser.npub), r ? `
      <div class="npub-container">
        ${this.isLoading ? '<div style="width: 100px; height: 8px; border-radius: 5px" class="skeleton"></div>' : `
                <span class="npub full">${r}</span>
                <span class="npub masked">${maskNPub(r)}</span>
                <span id="npub-copy" class="copy-button">&#x2398;</span>
            `}
      </div>
    ` : (console.warn("Cannot use showNPub without providing a nPub"), "");
  }
  copy(e) {
    navigator.clipboard.writeText(e);
  }
  onProfileClick() {
    if (this.isError)
      return;
    if (this.onClick !== null && typeof this.onClick == "function") {
      this.onClick(this.userProfile);
      return;
    }
    let e = "";
    const t = this.getAttribute("nip05"), r = this.getAttribute("npub");
    if (t)
      e = t;
    else if (r)
      e = r;
    else
      return;
    window.open(`https://njump.me/${e}`, "_blank");
  }
  attachEventListeners() {
    var e, t, r;
    (e = this.shadowRoot.querySelector(".nostr-profile")) == null || e.addEventListener("click", (s) => {
      s.target.closest(".nostr-follow-button-container") || this.onProfileClick();
    }), (t = this.shadowRoot.querySelector("#npub-copy")) == null || t.addEventListener("click", (s) => {
      s.stopPropagation(), this.copy(this.getAttribute("npub") || this.ndkUser.npub || "");
    }), (r = this.shadowRoot.querySelector("#nip05-copy")) == null || r.addEventListener("click", (s) => {
      s.stopPropagation(), this.copy(this.getAttribute("nip05") || this.userProfile.nip05 || "");
    });
  }
  render() {
    this.getAttribute("show-npub");
    const e = this.getAttribute("show-follow") !== "false";
    if (this.isLoading) {
      this.shadowRoot.innerHTML = `
        ${getProfileStyles(this.theme)}
        <div class="nostr-profile">
          <div id="profile">
            <div id="profile_banner">
              <div style="width: 100%; height: 100%;" class="skeleton"></div>
            </div>
            <div class="dp_container">
              <div class="avatar_container">
                <div class="avatar_wrapper">
                  <div class="xxl_avatar">
                    <div class="backfill">
                      <div style="width: 100%; height: 100%; border-radius: 50%" class="skeleton"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="profile_actions">
              ${this.ndkUser && this.ndkUser.npub && e ? `
                  <nostr-follow-button
                    npub="${this.ndkUser.npub}"
                    theme="${this.theme}"
                  ></nostr-follow-button>
                ` : ""}
            </div>
            <div class="profile_data">
              <div class="basic_info">
                <div class="name">
                  <div style="width: 100px; height: 16px; border-radius: 20px" class="skeleton"></div>
                </div>
              </div>
              <div class="nip05-wrapper">
                <div class="nip05-container">
                  <div style="width: 75px; height: 8px; border-radius: 20px" class="skeleton"></div>
                  ${this.renderNpub()}
                </div>
              </div>
            </div>
            <div class="about">
              <div style="width: 100%; height: 12px; border-radius: 20px; margin-bottom: 12px" class="skeleton"></div>
              <div style="width: 40%; height: 12px; border-radius: 20px" class="skeleton"></div>
            </div>
            <div class="links">
              <div style="width: 150px; height: 12px; border-radius: 20px" class="skeleton"></div>
            </div>
          </div>
          <div class="stats" data-orientation="horizontal">
            ${this.isStatsError ? '<p class="error-text">Error loading stats</p>' : `
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
      return;
    }
    if (this.isError) {
      this.shadowRoot.innerHTML = `
        ${getProfileStyles(this.theme)}
        <div class="nostr-profile error-container">
          <div class="error">!</div>
          <span class="error-text">Error fetching profile. Is the npub/nip05 correct?</span>
        </div>
      `;
      return;
    }
    this.shadowRoot.innerHTML = `
      ${getProfileStyles(this.theme)}
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
            ${this.ndkUser && this.ndkUser.npub && e ? `
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
                ${this.renderNpub()}
              </div>
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
          ${this.isStatsError ? '<p class="error-text">Error loading stats</p>' : `
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
    `, this.attachEventListeners();
  }
}
customElements.define("nostr-profile", NostrProfile);
class NostrFollowButton extends HTMLElement {
  constructor() {
    super(), this.rendered = !1, this.ndk = new NDK(), this.theme = "light", this.isLoading = !1, this.isError = !1, this.errorMessage = "", this.isFollowed = !1, this.connectToNostr = async () => {
      await this.ndk.connect();
    }, this.getRelays = () => {
      const e = this.getAttribute("relays");
      return e ? e.split(",") : DEFAULT_RELAYS;
    }, this.getTheme = async () => {
      this.theme = "light";
      const e = this.getAttribute("theme");
      if (e) {
        if (!["light", "dark"].includes(e))
          throw new Error(
            `Invalid theme '${e}'. Accepted values are 'light', 'dark'`
          );
        this.theme = e;
      }
    }, this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.rendered || (this.ndk = new NDK({
      explicitRelayUrls: this.getRelays()
    }), this.getTheme(), this.connectToNostr(), this.render(), this.rendered = !0);
  }
  static get observedAttributes() {
    return ["relays", "npub", "theme"];
  }
  attributeChangedCallback(e, t, r) {
    e === "relays" && (this.ndk.explicitRelayUrls = this.getRelays(), this.connectToNostr()), e === "theme" && this.getTheme(), this.render();
  }
  attachEventListeners() {
    var e;
    (e = this.shadowRoot.querySelector(".nostr-follow-button")) == null || e.addEventListener("click", async () => {
      this.isError = !1;
      const t = new NDKNip07Signer();
      this.isLoading = !0, this.render();
      try {
        this.ndk.signer = t, await this.connectToNostr();
        const r = this.getAttribute("npub"), s = this.getAttribute("nip05"), o = this.getAttribute("pubkey");
        if (!r && !s && !o)
          this.errorMessage = "Provide npub, nip05 or pubkey", this.isError = !0;
        else {
          let a = null;
          if (o)
            a = this.ndk.getUser({
              pubkey: o
            });
          else if (r)
            a = this.ndk.getUser({
              npub: r
            });
          else if (s) {
            const c = await this.ndk.getUserFromNip05(s);
            c && (a = this.ndk.getUser({
              npub: c.npub
            }));
          }
          a != null && (await (await this.ndk.signer.user()).follow(a), this.isFollowed = !0);
        }
      } catch (r) {
        this.isError = !0, r.message && r.message.includes("NIP-07") ? this.errorMessage = `Looks like you don't have any nostr signing browser extension.
                                Please checkout the following video to setup a signer extension - <a href="https://youtu.be/8thRYn14nB0?t=310" target="_blank">Video</a>` : this.errorMessage = "Please authorize, click the button to try again!";
      } finally {
        this.isLoading = !1;
      }
      this.render();
    });
  }
  render() {
    const e = this.getAttribute("icon-width"), t = this.getAttribute("icon-height"), r = e !== null ? Number(e) : 25, s = t !== null ? Number(t) : 25, o = this.isFollowed ? "Followed" : "Follow";
    this.shadowRoot.innerHTML = getFollowButtonStyles(this.theme, this.isLoading), this.shadowRoot.innerHTML += `
      <div class="nostr-follow-button-container ${this.isError ? "nostr-follow-button-error" : ""}">
        <div class="nostr-follow-button-wrapper">
          <button class="nostr-follow-button">
            ${this.isLoading ? `${getLoadingNostrich(this.theme, r, s)} <span>Following...</span>` : this.isFollowed ? `${getSuccessAnimation(this.theme, r, s)} ${o}` : `${getNostrLogo(this.theme, r, s)} <span>Follow me on Nostr</span>`}
          </button>
        </div>

        ${this.isError ? `<small>${this.errorMessage}</small>` : ""}
      </div>
    `, this.attachEventListeners();
  }
}
customElements.define("nostr-follow-button", NostrFollowButton);
export {
  NostrFollowButton,
  NostrPost,
  NostrProfile,
  NostrProfileBadge
};
//# sourceMappingURL=nostr-components.es.js.map
