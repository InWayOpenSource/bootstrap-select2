/*! bootstrap-select2.js 0.0.3 | https://github.com/InWayOpenSource/bootstrap-select2/blob/master/LICENSE
 * Merged version: Copyright 2014,2015 InWay.pro and other contributors
 * Original source developed by Igor Vaynberg (for select2), t0m & fk (for select2-bootstrap-theme)
 */

(function(factory) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], factory);
    } else if (typeof exports === "object") {
        factory(require("jquery"));
    } else {
        factory(jQuery);
    }
})(function(jQuery) {
    var S2 = function() {
        if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
            var S2 = jQuery.fn.select2.amd;
        }
        var S2;
        (function() {
            if (!S2 || !S2.requirejs) {
                if (!S2) {
                    S2 = {};
                } else {
                    require = S2;
                }
                var requirejs, require, define;
                (function(undef) {
                    var main, req, makeMap, handlers, defined = {}, waiting = {}, config = {}, defining = {}, hasOwn = Object.prototype.hasOwnProperty, aps = [].slice, jsSuffixRegExp = /\.js$/;
                    function hasProp(obj, prop) {
                        return hasOwn.call(obj, prop);
                    }
                    function normalize(name, baseName) {
                        var nameParts, nameSegment, mapValue, foundMap, lastIndex, foundI, foundStarMap, starI, i, j, part, baseParts = baseName && baseName.split("/"), map = config.map, starMap = map && map["*"] || {};
                        if (name && name.charAt(0) === ".") {
                            if (baseName) {
                                baseParts = baseParts.slice(0, baseParts.length - 1);
                                name = name.split("/");
                                lastIndex = name.length - 1;
                                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, "");
                                }
                                name = baseParts.concat(name);
                                for (i = 0; i < name.length; i += 1) {
                                    part = name[i];
                                    if (part === ".") {
                                        name.splice(i, 1);
                                        i -= 1;
                                    } else if (part === "..") {
                                        if (i === 1 && (name[2] === ".." || name[0] === "..")) {
                                            break;
                                        } else if (i > 0) {
                                            name.splice(i - 1, 2);
                                            i -= 2;
                                        }
                                    }
                                }
                                name = name.join("/");
                            } else if (name.indexOf("./") === 0) {
                                name = name.substring(2);
                            }
                        }
                        if ((baseParts || starMap) && map) {
                            nameParts = name.split("/");
                            for (i = nameParts.length; i > 0; i -= 1) {
                                nameSegment = nameParts.slice(0, i).join("/");
                                if (baseParts) {
                                    for (j = baseParts.length; j > 0; j -= 1) {
                                        mapValue = map[baseParts.slice(0, j).join("/")];
                                        if (mapValue) {
                                            mapValue = mapValue[nameSegment];
                                            if (mapValue) {
                                                foundMap = mapValue;
                                                foundI = i;
                                                break;
                                            }
                                        }
                                    }
                                }
                                if (foundMap) {
                                    break;
                                }
                                if (!foundStarMap && starMap && starMap[nameSegment]) {
                                    foundStarMap = starMap[nameSegment];
                                    starI = i;
                                }
                            }
                            if (!foundMap && foundStarMap) {
                                foundMap = foundStarMap;
                                foundI = starI;
                            }
                            if (foundMap) {
                                nameParts.splice(0, foundI, foundMap);
                                name = nameParts.join("/");
                            }
                        }
                        return name;
                    }
                    function makeRequire(relName, forceSync) {
                        return function() {
                            return req.apply(undef, aps.call(arguments, 0).concat([ relName, forceSync ]));
                        };
                    }
                    function makeNormalize(relName) {
                        return function(name) {
                            return normalize(name, relName);
                        };
                    }
                    function makeLoad(depName) {
                        return function(value) {
                            defined[depName] = value;
                        };
                    }
                    function callDep(name) {
                        if (hasProp(waiting, name)) {
                            var args = waiting[name];
                            delete waiting[name];
                            defining[name] = true;
                            main.apply(undef, args);
                        }
                        if (!hasProp(defined, name) && !hasProp(defining, name)) {
                            throw new Error("No " + name);
                        }
                        return defined[name];
                    }
                    function splitPrefix(name) {
                        var prefix, index = name ? name.indexOf("!") : -1;
                        if (index > -1) {
                            prefix = name.substring(0, index);
                            name = name.substring(index + 1, name.length);
                        }
                        return [ prefix, name ];
                    }
                    makeMap = function(name, relName) {
                        var plugin, parts = splitPrefix(name), prefix = parts[0];
                        name = parts[1];
                        if (prefix) {
                            prefix = normalize(prefix, relName);
                            plugin = callDep(prefix);
                        }
                        if (prefix) {
                            if (plugin && plugin.normalize) {
                                name = plugin.normalize(name, makeNormalize(relName));
                            } else {
                                name = normalize(name, relName);
                            }
                        } else {
                            name = normalize(name, relName);
                            parts = splitPrefix(name);
                            prefix = parts[0];
                            name = parts[1];
                            if (prefix) {
                                plugin = callDep(prefix);
                            }
                        }
                        return {
                            f: prefix ? prefix + "!" + name : name,
                            n: name,
                            pr: prefix,
                            p: plugin
                        };
                    };
                    function makeConfig(name) {
                        return function() {
                            return config && config.config && config.config[name] || {};
                        };
                    }
                    handlers = {
                        require: function(name) {
                            return makeRequire(name);
                        },
                        exports: function(name) {
                            var e = defined[name];
                            if (typeof e !== "undefined") {
                                return e;
                            } else {
                                return defined[name] = {};
                            }
                        },
                        module: function(name) {
                            return {
                                id: name,
                                uri: "",
                                exports: defined[name],
                                config: makeConfig(name)
                            };
                        }
                    };
                    main = function(name, deps, callback, relName) {
                        var cjsModule, depName, ret, map, i, args = [], callbackType = typeof callback, usingExports;
                        relName = relName || name;
                        if (callbackType === "undefined" || callbackType === "function") {
                            deps = !deps.length && callback.length ? [ "require", "exports", "module" ] : deps;
                            for (i = 0; i < deps.length; i += 1) {
                                map = makeMap(deps[i], relName);
                                depName = map.f;
                                if (depName === "require") {
                                    args[i] = handlers.require(name);
                                } else if (depName === "exports") {
                                    args[i] = handlers.exports(name);
                                    usingExports = true;
                                } else if (depName === "module") {
                                    cjsModule = args[i] = handlers.module(name);
                                } else if (hasProp(defined, depName) || hasProp(waiting, depName) || hasProp(defining, depName)) {
                                    args[i] = callDep(depName);
                                } else if (map.p) {
                                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                                    args[i] = defined[depName];
                                } else {
                                    throw new Error(name + " missing " + depName);
                                }
                            }
                            ret = callback ? callback.apply(defined[name], args) : undefined;
                            if (name) {
                                if (cjsModule && cjsModule.exports !== undef && cjsModule.exports !== defined[name]) {
                                    defined[name] = cjsModule.exports;
                                } else if (ret !== undef || !usingExports) {
                                    defined[name] = ret;
                                }
                            }
                        } else if (name) {
                            defined[name] = callback;
                        }
                    };
                    requirejs = require = req = function(deps, callback, relName, forceSync, alt) {
                        if (typeof deps === "string") {
                            if (handlers[deps]) {
                                return handlers[deps](callback);
                            }
                            return callDep(makeMap(deps, callback).f);
                        } else if (!deps.splice) {
                            config = deps;
                            if (config.deps) {
                                req(config.deps, config.callback);
                            }
                            if (!callback) {
                                return;
                            }
                            if (callback.splice) {
                                deps = callback;
                                callback = relName;
                                relName = null;
                            } else {
                                deps = undef;
                            }
                        }
                        callback = callback || function() {};
                        if (typeof relName === "function") {
                            relName = forceSync;
                            forceSync = alt;
                        }
                        if (forceSync) {
                            main(undef, deps, callback, relName);
                        } else {
                            setTimeout(function() {
                                main(undef, deps, callback, relName);
                            }, 4);
                        }
                        return req;
                    };
                    req.config = function(cfg) {
                        return req(cfg);
                    };
                    requirejs._defined = defined;
                    define = function(name, deps, callback) {
                        if (!deps.splice) {
                            callback = deps;
                            deps = [];
                        }
                        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
                            waiting[name] = [ name, deps, callback ];
                        }
                    };
                    define.amd = {
                        jQuery: true
                    };
                })();
                S2.requirejs = requirejs;
                S2.require = require;
                S2.define = define;
            }
        })();
        S2.define("almond", function() {});
        S2.define("jquery", [], function() {
            var _$ = jQuery || $;
            if (_$ == null && console && console.error) {
                console.error("Select2: An instance of jQuery or a jQuery-compatible library was not " + "found. Make sure that you are including jQuery before Select2 on your " + "web page.");
            }
            return _$;
        });
        S2.define("select2/utils", [ "jquery" ], function($) {
            var Utils = {};
            Utils.Extend = function(ChildClass, SuperClass) {
                var __hasProp = {}.hasOwnProperty;
                function BaseConstructor() {
                    this.constructor = ChildClass;
                }
                for (var key in SuperClass) {
                    if (__hasProp.call(SuperClass, key)) {
                        ChildClass[key] = SuperClass[key];
                    }
                }
                BaseConstructor.prototype = SuperClass.prototype;
                ChildClass.prototype = new BaseConstructor();
                ChildClass.__super__ = SuperClass.prototype;
                return ChildClass;
            };
            function getMethods(theClass) {
                var proto = theClass.prototype;
                var methods = [];
                for (var methodName in proto) {
                    var m = proto[methodName];
                    if (typeof m !== "function") {
                        continue;
                    }
                    if (methodName === "constructor") {
                        continue;
                    }
                    methods.push(methodName);
                }
                return methods;
            }
            Utils.Decorate = function(SuperClass, DecoratorClass) {
                var decoratedMethods = getMethods(DecoratorClass);
                var superMethods = getMethods(SuperClass);
                function DecoratedClass() {
                    var unshift = Array.prototype.unshift;
                    var argCount = DecoratorClass.prototype.constructor.length;
                    var calledConstructor = SuperClass.prototype.constructor;
                    if (argCount > 0) {
                        unshift.call(arguments, SuperClass.prototype.constructor);
                        calledConstructor = DecoratorClass.prototype.constructor;
                    }
                    calledConstructor.apply(this, arguments);
                }
                DecoratorClass.displayName = SuperClass.displayName;
                function ctr() {
                    this.constructor = DecoratedClass;
                }
                DecoratedClass.prototype = new ctr();
                for (var m = 0; m < superMethods.length; m++) {
                    var superMethod = superMethods[m];
                    DecoratedClass.prototype[superMethod] = SuperClass.prototype[superMethod];
                }
                var calledMethod = function(methodName) {
                    var originalMethod = function() {};
                    if (methodName in DecoratedClass.prototype) {
                        originalMethod = DecoratedClass.prototype[methodName];
                    }
                    var decoratedMethod = DecoratorClass.prototype[methodName];
                    return function() {
                        var unshift = Array.prototype.unshift;
                        unshift.call(arguments, originalMethod);
                        return decoratedMethod.apply(this, arguments);
                    };
                };
                for (var d = 0; d < decoratedMethods.length; d++) {
                    var decoratedMethod = decoratedMethods[d];
                    DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
                }
                return DecoratedClass;
            };
            var Observable = function() {
                this.listeners = {};
            };
            Observable.prototype.on = function(event, callback) {
                this.listeners = this.listeners || {};
                if (event in this.listeners) {
                    this.listeners[event].push(callback);
                } else {
                    this.listeners[event] = [ callback ];
                }
            };
            Observable.prototype.trigger = function(event) {
                var slice = Array.prototype.slice;
                this.listeners = this.listeners || {};
                if (event in this.listeners) {
                    this.invoke(this.listeners[event], slice.call(arguments, 1));
                }
                if ("*" in this.listeners) {
                    this.invoke(this.listeners["*"], arguments);
                }
            };
            Observable.prototype.invoke = function(listeners, params) {
                for (var i = 0, len = listeners.length; i < len; i++) {
                    listeners[i].apply(this, params);
                }
            };
            Utils.Observable = Observable;
            Utils.generateChars = function(length) {
                var chars = "";
                for (var i = 0; i < length; i++) {
                    var randomChar = Math.floor(Math.random() * 36);
                    chars += randomChar.toString(36);
                }
                return chars;
            };
            Utils.bind = function(func, context) {
                return function() {
                    func.apply(context, arguments);
                };
            };
            Utils._convertData = function(data) {
                for (var originalKey in data) {
                    var keys = originalKey.split("-");
                    var dataLevel = data;
                    if (keys.length === 1) {
                        continue;
                    }
                    for (var k = 0; k < keys.length; k++) {
                        var key = keys[k];
                        key = key.substring(0, 1).toLowerCase() + key.substring(1);
                        if (!(key in dataLevel)) {
                            dataLevel[key] = {};
                        }
                        if (k == keys.length - 1) {
                            dataLevel[key] = data[originalKey];
                        }
                        dataLevel = dataLevel[key];
                    }
                    delete data[originalKey];
                }
                return data;
            };
            Utils.hasScroll = function(index, el) {
                var $el = $(el);
                var overflowX = el.style.overflowX;
                var overflowY = el.style.overflowY;
                if (overflowX === overflowY && (overflowY === "hidden" || overflowY === "visible")) {
                    return false;
                }
                if (overflowX === "scroll" || overflowY === "scroll") {
                    return true;
                }
                return $el.innerHeight() < el.scrollHeight || $el.innerWidth() < el.scrollWidth;
            };
            Utils.escapeMarkup = function(markup) {
                var replaceMap = {
                    "\\": "&#92;",
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                    "/": "&#47;"
                };
                if (typeof markup !== "string") {
                    return markup;
                }
                return String(markup).replace(/[&<>"'\/\\]/g, function(match) {
                    return replaceMap[match];
                });
            };
            Utils.appendMany = function($element, $nodes) {
                if ($.fn.jquery.substr(0, 3) === "1.7") {
                    var $jqNodes = $();
                    $.map($nodes, function(node) {
                        $jqNodes = $jqNodes.add(node);
                    });
                    $nodes = $jqNodes;
                }
                $element.append($nodes);
            };
            return Utils;
        });
        S2.define("select2/results", [ "jquery", "./utils" ], function($, Utils) {
            function Results($element, options, dataAdapter) {
                this.$element = $element;
                this.data = dataAdapter;
                this.options = options;
                Results.__super__.constructor.call(this);
            }
            Utils.Extend(Results, Utils.Observable);
            Results.prototype.render = function() {
                var $results = $('<ul class="select2-results__options" role="tree"></ul>');
                if (this.options.get("multiple")) {
                    $results.attr("aria-multiselectable", "true");
                }
                this.$results = $results;
                return $results;
            };
            Results.prototype.clear = function() {
                this.$results.empty();
            };
            Results.prototype.displayMessage = function(params) {
                var escapeMarkup = this.options.get("escapeMarkup");
                this.clear();
                this.hideLoading();
                var $message = $('<li role="treeitem" class="select2-results__option"></li>');
                var message = this.options.get("translations").get(params.message);
                $message.append(escapeMarkup(message(params.args)));
                $message[0].className += " select2-results__message";
                this.$results.append($message);
            };
            Results.prototype.hideMessages = function() {
                this.$results.find(".select2-results__message").remove();
            };
            Results.prototype.append = function(data) {
                this.hideLoading();
                var $options = [];
                if (data.results == null || data.results.length === 0) {
                    if (this.$results.children().length === 0) {
                        this.trigger("results:message", {
                            message: "noResults"
                        });
                    }
                    return;
                }
                data.results = this.sort(data.results);
                for (var d = 0; d < data.results.length; d++) {
                    var item = data.results[d];
                    var $option = this.option(item);
                    $options.push($option);
                }
                this.$results.append($options);
            };
            Results.prototype.position = function($results, $dropdown) {
                var $resultsContainer = $dropdown.find(".select2-results");
                $resultsContainer.append($results);
            };
            Results.prototype.sort = function(data) {
                var sorter = this.options.get("sorter");
                return sorter(data);
            };
            Results.prototype.setClasses = function() {
                var self = this;
                this.data.current(function(selected) {
                    var selectedIds = $.map(selected, function(s) {
                        return s.id.toString();
                    });
                    var $options = self.$results.find(".select2-results__option[aria-selected]");
                    $options.each(function() {
                        var $option = $(this);
                        var item = $.data(this, "data");
                        var id = "" + item.id;
                        if (item.element != null && item.element.selected || item.element == null && $.inArray(id, selectedIds) > -1) {
                            $option.attr("aria-selected", "true");
                        } else {
                            $option.attr("aria-selected", "false");
                        }
                    });
                    var $selected = $options.filter("[aria-selected=true]");
                    if ($selected.length > 0) {
                        $selected.first().trigger("mouseenter");
                    } else {
                        $options.first().trigger("mouseenter");
                    }
                });
            };
            Results.prototype.showLoading = function(params) {
                this.hideLoading();
                var loadingMore = this.options.get("translations").get("searching");
                var loading = {
                    disabled: true,
                    loading: true,
                    text: loadingMore(params)
                };
                var $loading = this.option(loading);
                $loading.className += " loading-results";
                this.$results.prepend($loading);
            };
            Results.prototype.hideLoading = function() {
                this.$results.find(".loading-results").remove();
            };
            Results.prototype.option = function(data) {
                var option = document.createElement("li");
                option.className = "select2-results__option";
                var attrs = {
                    role: "treeitem",
                    "aria-selected": "false"
                };
                if (data.disabled) {
                    delete attrs["aria-selected"];
                    attrs["aria-disabled"] = "true";
                }
                if (data.id == null) {
                    delete attrs["aria-selected"];
                }
                if (data._resultId != null) {
                    option.id = data._resultId;
                }
                if (data.title) {
                    option.title = data.title;
                }
                if (data.children) {
                    attrs.role = "group";
                    attrs["aria-label"] = data.text;
                    delete attrs["aria-selected"];
                }
                for (var attr in attrs) {
                    var val = attrs[attr];
                    option.setAttribute(attr, val);
                }
                if (data.children) {
                    var $option = $(option);
                    var label = document.createElement("strong");
                    label.className = "select2-results__group";
                    var $label = $(label);
                    this.template(data, label);
                    var $children = [];
                    for (var c = 0; c < data.children.length; c++) {
                        var child = data.children[c];
                        var $child = this.option(child);
                        $children.push($child);
                    }
                    var $childrenContainer = $("<ul></ul>", {
                        "class": "select2-results__options select2-results__options--nested"
                    });
                    $childrenContainer.append($children);
                    $option.append(label);
                    $option.append($childrenContainer);
                } else {
                    this.template(data, option);
                }
                $.data(option, "data", data);
                return option;
            };
            Results.prototype.bind = function(container, $container) {
                var self = this;
                var id = container.id + "-results";
                this.$results.attr("id", id);
                container.on("results:all", function(params) {
                    self.clear();
                    self.append(params.data);
                    if (container.isOpen()) {
                        self.setClasses();
                    }
                });
                container.on("results:append", function(params) {
                    self.append(params.data);
                    if (container.isOpen()) {
                        self.setClasses();
                    }
                });
                container.on("query", function(params) {
                    self.hideMessages();
                    self.showLoading(params);
                });
                container.on("select", function() {
                    if (!container.isOpen()) {
                        return;
                    }
                    self.setClasses();
                });
                container.on("unselect", function() {
                    if (!container.isOpen()) {
                        return;
                    }
                    self.setClasses();
                });
                container.on("open", function() {
                    self.$results.attr("aria-expanded", "true");
                    self.$results.attr("aria-hidden", "false");
                    self.setClasses();
                    self.ensureHighlightVisible();
                });
                container.on("close", function() {
                    self.$results.attr("aria-expanded", "false");
                    self.$results.attr("aria-hidden", "true");
                    self.$results.removeAttr("aria-activedescendant");
                });
                container.on("results:toggle", function() {
                    var $highlighted = self.getHighlightedResults();
                    if ($highlighted.length === 0) {
                        return;
                    }
                    $highlighted.trigger("mouseup");
                });
                container.on("results:select", function() {
                    var $highlighted = self.getHighlightedResults();
                    if ($highlighted.length === 0) {
                        return;
                    }
                    var data = $highlighted.data("data");
                    if ($highlighted.attr("aria-selected") == "true") {
                        self.trigger("close", {});
                    } else {
                        self.trigger("select", {
                            data: data
                        });
                    }
                });
                container.on("results:previous", function() {
                    var $highlighted = self.getHighlightedResults();
                    var $options = self.$results.find("[aria-selected]");
                    var currentIndex = $options.index($highlighted);
                    if (currentIndex === 0) {
                        return;
                    }
                    var nextIndex = currentIndex - 1;
                    if ($highlighted.length === 0) {
                        nextIndex = 0;
                    }
                    var $next = $options.eq(nextIndex);
                    $next.trigger("mouseenter");
                    var currentOffset = self.$results.offset().top;
                    var nextTop = $next.offset().top;
                    var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);
                    if (nextIndex === 0) {
                        self.$results.scrollTop(0);
                    } else if (nextTop - currentOffset < 0) {
                        self.$results.scrollTop(nextOffset);
                    }
                });
                container.on("results:next", function() {
                    var $highlighted = self.getHighlightedResults();
                    var $options = self.$results.find("[aria-selected]");
                    var currentIndex = $options.index($highlighted);
                    var nextIndex = currentIndex + 1;
                    if (nextIndex >= $options.length) {
                        return;
                    }
                    var $next = $options.eq(nextIndex);
                    $next.trigger("mouseenter");
                    var currentOffset = self.$results.offset().top + self.$results.outerHeight(false);
                    var nextBottom = $next.offset().top + $next.outerHeight(false);
                    var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;
                    if (nextIndex === 0) {
                        self.$results.scrollTop(0);
                    } else if (nextBottom > currentOffset) {
                        self.$results.scrollTop(nextOffset);
                    }
                });
                container.on("results:focus", function(params) {
                    params.element.addClass("select2-results__option--highlighted");
                });
                container.on("results:message", function(params) {
                    self.displayMessage(params);
                });
                if ($.fn.mousewheel) {
                    this.$results.on("mousewheel", function(e) {
                        var top = self.$results.scrollTop();
                        var bottom = self.$results.get(0).scrollHeight - self.$results.scrollTop() + e.deltaY;
                        var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
                        var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();
                        if (isAtTop) {
                            self.$results.scrollTop(0);
                            e.preventDefault();
                            e.stopPropagation();
                        } else if (isAtBottom) {
                            self.$results.scrollTop(self.$results.get(0).scrollHeight - self.$results.height());
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });
                }
                this.$results.on("mouseup", ".select2-results__option[aria-selected]", function(evt) {
                    var $this = $(this);
                    var data = $this.data("data");
                    if ($this.attr("aria-selected") === "true") {
                        if (self.options.get("multiple")) {
                            self.trigger("unselect", {
                                originalEvent: evt,
                                data: data
                            });
                        } else {
                            self.trigger("close", {});
                        }
                        return;
                    }
                    self.trigger("select", {
                        originalEvent: evt,
                        data: data
                    });
                });
                this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function(evt) {
                    var data = $(this).data("data");
                    self.getHighlightedResults().removeClass("select2-results__option--highlighted");
                    self.trigger("results:focus", {
                        data: data,
                        element: $(this)
                    });
                });
            };
            Results.prototype.getHighlightedResults = function() {
                var $highlighted = this.$results.find(".select2-results__option--highlighted");
                return $highlighted;
            };
            Results.prototype.destroy = function() {
                this.$results.remove();
            };
            Results.prototype.ensureHighlightVisible = function() {
                var $highlighted = this.getHighlightedResults();
                if ($highlighted.length === 0) {
                    return;
                }
                var $options = this.$results.find("[aria-selected]");
                var currentIndex = $options.index($highlighted);
                var currentOffset = this.$results.offset().top;
                var nextTop = $highlighted.offset().top;
                var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);
                var offsetDelta = nextTop - currentOffset;
                nextOffset -= $highlighted.outerHeight(false) * 2;
                if (currentIndex <= 2) {
                    this.$results.scrollTop(0);
                } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
                    this.$results.scrollTop(nextOffset);
                }
            };
            Results.prototype.template = function(result, container) {
                var template = this.options.get("templateResult");
                var escapeMarkup = this.options.get("escapeMarkup");
                var content = template(result);
                if (content == null) {
                    container.style.display = "none";
                } else if (typeof content === "string") {
                    container.innerHTML = escapeMarkup(content);
                } else {
                    $(container).append(content);
                }
            };
            return Results;
        });
        S2.define("select2/keys", [], function() {
            var KEYS = {
                BACKSPACE: 8,
                TAB: 9,
                ENTER: 13,
                SHIFT: 16,
                CTRL: 17,
                ALT: 18,
                ESC: 27,
                SPACE: 32,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                END: 35,
                HOME: 36,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                DELETE: 46
            };
            return KEYS;
        });
        S2.define("select2/selection/base", [ "jquery", "../utils", "../keys" ], function($, Utils, KEYS) {
            function BaseSelection($element, options) {
                this.$element = $element;
                this.options = options;
                BaseSelection.__super__.constructor.call(this);
            }
            Utils.Extend(BaseSelection, Utils.Observable);
            BaseSelection.prototype.render = function() {
                var $selection = $('<span class="select2-selection" role="combobox" ' + 'aria-autocomplete="list" aria-haspopup="true" aria-expanded="false">' + "</span>");
                this._tabindex = 0;
                if (this.$element.data("old-tabindex") != null) {
                    this._tabindex = this.$element.data("old-tabindex");
                } else if (this.$element.attr("tabindex") != null) {
                    this._tabindex = this.$element.attr("tabindex");
                }
                $selection.attr("title", this.$element.attr("title"));
                $selection.attr("tabindex", this._tabindex);
                this.$selection = $selection;
                return $selection;
            };
            BaseSelection.prototype.bind = function(container, $container) {
                var self = this;
                var id = container.id + "-container";
                var resultsId = container.id + "-results";
                this.container = container;
                this.$selection.on("focus", function(evt) {
                    self.trigger("focus", evt);
                });
                this.$selection.on("blur", function(evt) {
                    self._handleBlur(evt);
                });
                this.$selection.on("keydown", function(evt) {
                    self.trigger("keypress", evt);
                    if (evt.which === KEYS.SPACE) {
                        evt.preventDefault();
                    }
                });
                container.on("results:focus", function(params) {
                    self.$selection.attr("aria-activedescendant", params.data._resultId);
                });
                container.on("selection:update", function(params) {
                    self.update(params.data);
                });
                container.on("open", function() {
                    self.$selection.attr("aria-expanded", "true");
                    self.$selection.attr("aria-owns", resultsId);
                    self._attachCloseHandler(container);
                });
                container.on("close", function() {
                    self.$selection.attr("aria-expanded", "false");
                    self.$selection.removeAttr("aria-activedescendant");
                    self.$selection.removeAttr("aria-owns");
                    self.$selection.focus();
                    self._detachCloseHandler(container);
                });
                container.on("enable", function() {
                    self.$selection.attr("tabindex", self._tabindex);
                });
                container.on("disable", function() {
                    self.$selection.attr("tabindex", "-1");
                });
            };
            BaseSelection.prototype._handleBlur = function(evt) {
                var self = this;
                window.setTimeout(function() {
                    if (document.activeElement == self.$selection[0] || $.contains(self.$selection[0], document.activeElement)) {
                        return;
                    }
                    self.trigger("blur", evt);
                }, 1);
            };
            BaseSelection.prototype._attachCloseHandler = function(container) {
                var self = this;
                $(document.body).on("mousedown.select2." + container.id, function(e) {
                    var $target = $(e.target);
                    var $select = $target.closest(".select2");
                    var $all = $(".select2.select2-container--open");
                    $all.each(function() {
                        var $this = $(this);
                        if (this == $select[0]) {
                            return;
                        }
                        var $element = $this.data("element");
                        $element.select2("close");
                    });
                });
            };
            BaseSelection.prototype._detachCloseHandler = function(container) {
                $(document.body).off("mousedown.select2." + container.id);
            };
            BaseSelection.prototype.position = function($selection, $container) {
                var $selectionContainer = $container.find(".selection");
                $selectionContainer.append($selection);
            };
            BaseSelection.prototype.destroy = function() {
                this._detachCloseHandler(this.container);
            };
            BaseSelection.prototype.update = function(data) {
                throw new Error("The `update` method must be defined in child classes.");
            };
            return BaseSelection;
        });
        S2.define("select2/selection/single", [ "jquery", "./base", "../utils", "../keys" ], function($, BaseSelection, Utils, KEYS) {
            function SingleSelection() {
                SingleSelection.__super__.constructor.apply(this, arguments);
            }
            Utils.Extend(SingleSelection, BaseSelection);
            SingleSelection.prototype.render = function() {
                var $selection = SingleSelection.__super__.render.call(this);
                $selection.addClass("select2-selection--single");
                $selection.html('<span class="select2-selection__rendered"></span>' + '<span class="select2-selection__arrow" role="presentation">' + '<b role="presentation"></b>' + "</span>");
                return $selection;
            };
            SingleSelection.prototype.bind = function(container, $container) {
                var self = this;
                SingleSelection.__super__.bind.apply(this, arguments);
                var id = container.id + "-container";
                this.$selection.find(".select2-selection__rendered").attr("id", id);
                this.$selection.attr("aria-labelledby", id);
                this.$selection.on("mousedown", function(evt) {
                    if (evt.which !== 1) {
                        return;
                    }
                    self.trigger("toggle", {
                        originalEvent: evt
                    });
                });
                this.$selection.on("focus", function(evt) {});
                this.$selection.on("blur", function(evt) {});
                container.on("selection:update", function(params) {
                    self.update(params.data);
                });
            };
            SingleSelection.prototype.clear = function() {
                this.$selection.find(".select2-selection__rendered").empty();
            };
            SingleSelection.prototype.display = function(data, container) {
                var template = this.options.get("templateSelection");
                var escapeMarkup = this.options.get("escapeMarkup");
                return escapeMarkup(template(data, container));
            };
            SingleSelection.prototype.selectionContainer = function() {
                return $("<span></span>");
            };
            SingleSelection.prototype.update = function(data) {
                if (data.length === 0) {
                    this.clear();
                    return;
                }
                var selection = data[0];
                var $rendered = this.$selection.find(".select2-selection__rendered");
                var formatted = this.display(selection, $rendered);
                $rendered.empty().append(formatted);
                $rendered.prop("title", selection.title || selection.text);
            };
            return SingleSelection;
        });
        S2.define("select2/selection/multiple", [ "jquery", "./base", "../utils" ], function($, BaseSelection, Utils) {
            function MultipleSelection($element, options) {
                MultipleSelection.__super__.constructor.apply(this, arguments);
            }
            Utils.Extend(MultipleSelection, BaseSelection);
            MultipleSelection.prototype.render = function() {
                var $selection = MultipleSelection.__super__.render.call(this);
                $selection.addClass("select2-selection--multiple");
                $selection.html('<ul class="select2-selection__rendered"></ul>');
                return $selection;
            };
            MultipleSelection.prototype.bind = function(container, $container) {
                var self = this;
                MultipleSelection.__super__.bind.apply(this, arguments);
                this.$selection.on("click", function(evt) {
                    self.trigger("toggle", {
                        originalEvent: evt
                    });
                });
                this.$selection.on("click", ".select2-selection__choice__remove", function(evt) {
                    if (self.options.get("disabled")) {
                        return;
                    }
                    var $remove = $(this);
                    var $selection = $remove.parent();
                    var data = $selection.data("data");
                    self.trigger("unselect", {
                        originalEvent: evt,
                        data: data
                    });
                });
            };
            MultipleSelection.prototype.clear = function() {
                this.$selection.find(".select2-selection__rendered").empty();
            };
            MultipleSelection.prototype.display = function(data, container) {
                var template = this.options.get("templateSelection");
                var escapeMarkup = this.options.get("escapeMarkup");
                return escapeMarkup(template(data, container));
            };
            MultipleSelection.prototype.selectionContainer = function() {
                var $container = $('<li class="select2-selection__choice">' + '<span class="select2-selection__choice__remove" role="presentation">' + "&times;" + "</span>" + "</li>");
                return $container;
            };
            MultipleSelection.prototype.update = function(data) {
                this.clear();
                if (data.length === 0) {
                    return;
                }
                var $selections = [];
                for (var d = 0; d < data.length; d++) {
                    var selection = data[d];
                    var $selection = this.selectionContainer();
                    var formatted = this.display(selection, $selection);
                    $selection.append(formatted);
                    $selection.prop("title", selection.title || selection.text);
                    $selection.data("data", selection);
                    $selections.push($selection);
                }
                var $rendered = this.$selection.find(".select2-selection__rendered");
                Utils.appendMany($rendered, $selections);
            };
            return MultipleSelection;
        });
        S2.define("select2/selection/placeholder", [ "../utils" ], function(Utils) {
            function Placeholder(decorated, $element, options) {
                this.placeholder = this.normalizePlaceholder(options.get("placeholder"));
                decorated.call(this, $element, options);
            }
            Placeholder.prototype.normalizePlaceholder = function(_, placeholder) {
                if (typeof placeholder === "string") {
                    placeholder = {
                        id: "",
                        text: placeholder
                    };
                }
                return placeholder;
            };
            Placeholder.prototype.createPlaceholder = function(decorated, placeholder) {
                var $placeholder = this.selectionContainer();
                $placeholder.html(this.display(placeholder));
                $placeholder.addClass("select2-selection__placeholder").removeClass("select2-selection__choice");
                return $placeholder;
            };
            Placeholder.prototype.update = function(decorated, data) {
                var singlePlaceholder = data.length == 1 && data[0].id != this.placeholder.id;
                var multipleSelections = data.length > 1;
                if (multipleSelections || singlePlaceholder) {
                    return decorated.call(this, data);
                }
                this.clear();
                var $placeholder = this.createPlaceholder(this.placeholder);
                this.$selection.find(".select2-selection__rendered").append($placeholder);
            };
            return Placeholder;
        });
        S2.define("select2/selection/allowClear", [ "jquery", "../keys" ], function($, KEYS) {
            function AllowClear() {}
            AllowClear.prototype.bind = function(decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);
                if (this.placeholder == null) {
                    if (this.options.get("debug") && window.console && console.error) {
                        console.error("Select2: The `allowClear` option should be used in combination " + "with the `placeholder` option.");
                    }
                }
                this.$selection.on("mousedown", ".select2-selection__clear", function(evt) {
                    self._handleClear(evt);
                });
                container.on("keypress", function(evt) {
                    self._handleKeyboardClear(evt, container);
                });
            };
            AllowClear.prototype._handleClear = function(_, evt) {
                if (this.options.get("disabled")) {
                    return;
                }
                var $clear = this.$selection.find(".select2-selection__clear");
                if ($clear.length === 0) {
                    return;
                }
                evt.stopPropagation();
                var data = $clear.data("data");
                for (var d = 0; d < data.length; d++) {
                    var unselectData = {
                        data: data[d]
                    };
                    this.trigger("unselect", unselectData);
                    if (unselectData.prevented) {
                        return;
                    }
                }
                this.$element.val(this.placeholder.id).trigger("change");
                this.trigger("toggle", {});
            };
            AllowClear.prototype._handleKeyboardClear = function(_, evt, container) {
                if (container.isOpen()) {
                    return;
                }
                if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
                    this._handleClear(evt);
                }
            };
            AllowClear.prototype.update = function(decorated, data) {
                decorated.call(this, data);
                if (this.$selection.find(".select2-selection__placeholder").length > 0 || data.length === 0) {
                    return;
                }
                var $remove = $('<span class="select2-selection__clear">' + "&times;" + "</span>");
                $remove.data("data", data);
                this.$selection.find(".select2-selection__rendered").prepend($remove);
            };
            return AllowClear;
        });
        S2.define("select2/selection/search", [ "jquery", "../utils", "../keys" ], function($, Utils, KEYS) {
            function Search(decorated, $element, options) {
                decorated.call(this, $element, options);
            }
            Search.prototype.render = function(decorated) {
                var $search = $('<li class="select2-search select2-search--inline">' + '<input class="select2-search__field" type="search" tabindex="-1"' + ' autocomplete="off" autocorrect="off" autocapitalize="off"' + ' spellcheck="false" role="textbox" />' + "</li>");
                this.$searchContainer = $search;
                this.$search = $search.find("input");
                var $rendered = decorated.call(this);
                this._transferTabIndex();
                return $rendered;
            };
            Search.prototype.bind = function(decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);
                container.on("open", function() {
                    self.$search.trigger("focus");
                });
                container.on("close", function() {
                    self.$search.val("");
                    self.$search.trigger("focus");
                });
                container.on("enable", function() {
                    self.$search.prop("disabled", false);
                    self._transferTabIndex();
                });
                container.on("disable", function() {
                    self.$search.prop("disabled", true);
                });
                container.on("focus", function(evt) {
                    self.$search.trigger("focus");
                });
                this.$selection.on("focusin", ".select2-search--inline", function(evt) {
                    self.trigger("focus", evt);
                });
                this.$selection.on("focusout", ".select2-search--inline", function(evt) {
                    self._handleBlur(evt);
                });
                this.$selection.on("keydown", ".select2-search--inline", function(evt) {
                    evt.stopPropagation();
                    self.trigger("keypress", evt);
                    self._keyUpPrevented = evt.isDefaultPrevented();
                    var key = evt.which;
                    if (key === KEYS.BACKSPACE && self.$search.val() === "") {
                        var $previousChoice = self.$searchContainer.prev(".select2-selection__choice");
                        if ($previousChoice.length > 0) {
                            var item = $previousChoice.data("data");
                            self.searchRemoveChoice(item);
                            evt.preventDefault();
                        }
                    }
                });
                this.$selection.on("input.searchcheck", ".select2-search--inline", function(evt) {
                    var msie = document.documentMode;
                    if (msie && msie <= 11) {
                        self.$selection.off("input.search input.searchcheck");
                        return;
                    }
                    self.$selection.off("keyup.search");
                });
                this.$selection.on("keyup.search input.search", ".select2-search--inline", function(evt) {
                    var key = evt.which;
                    if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
                        return;
                    }
                    if (key == KEYS.TAB) {
                        return;
                    }
                    self.handleSearch(evt);
                });
            };
            Search.prototype._transferTabIndex = function(decorated) {
                this.$search.attr("tabindex", this.$selection.attr("tabindex"));
                this.$selection.attr("tabindex", "-1");
            };
            Search.prototype.createPlaceholder = function(decorated, placeholder) {
                this.$search.attr("placeholder", placeholder.text);
            };
            Search.prototype.update = function(decorated, data) {
                var searchHadFocus = this.$search[0] == document.activeElement;
                this.$search.attr("placeholder", "");
                decorated.call(this, data);
                this.$selection.find(".select2-selection__rendered").append(this.$searchContainer);
                this.resizeSearch();
                if (searchHadFocus) {
                    this.$search.focus();
                }
            };
            Search.prototype.handleSearch = function() {
                this.resizeSearch();
                if (!this._keyUpPrevented) {
                    var input = this.$search.val();
                    this.trigger("query", {
                        term: input
                    });
                }
                this._keyUpPrevented = false;
            };
            Search.prototype.searchRemoveChoice = function(decorated, item) {
                this.trigger("unselect", {
                    data: item
                });
                this.trigger("open", {});
                this.$search.val(item.text + " ");
            };
            Search.prototype.resizeSearch = function() {
                this.$search.css("width", "25px");
                var width = "";
                if (this.$search.attr("placeholder") !== "") {
                    width = this.$selection.find(".select2-selection__rendered").innerWidth();
                } else {
                    var minimumWidth = this.$search.val().length + 1;
                    width = minimumWidth * .75 + "em";
                }
                this.$search.css("width", width);
            };
            return Search;
        });
        S2.define("select2/selection/eventRelay", [ "jquery" ], function($) {
            function EventRelay() {}
            EventRelay.prototype.bind = function(decorated, container, $container) {
                var self = this;
                var relayEvents = [ "open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting" ];
                var preventableEvents = [ "opening", "closing", "selecting", "unselecting" ];
                decorated.call(this, container, $container);
                container.on("*", function(name, params) {
                    if ($.inArray(name, relayEvents) === -1) {
                        return;
                    }
                    params = params || {};
                    var evt = $.Event("select2:" + name, {
                        params: params
                    });
                    self.$element.trigger(evt);
                    if ($.inArray(name, preventableEvents) === -1) {
                        return;
                    }
                    params.prevented = evt.isDefaultPrevented();
                });
            };
            return EventRelay;
        });
        S2.define("select2/translation", [ "jquery", "require" ], function($, require) {
            function Translation(dict) {
                this.dict = dict || {};
            }
            Translation.prototype.all = function() {
                return this.dict;
            };
            Translation.prototype.get = function(key) {
                return this.dict[key];
            };
            Translation.prototype.extend = function(translation) {
                this.dict = $.extend({}, translation.all(), this.dict);
            };
            Translation._cache = {};
            Translation.loadPath = function(path) {
                if (!(path in Translation._cache)) {
                    var translations = require(path);
                    Translation._cache[path] = translations;
                }
                return new Translation(Translation._cache[path]);
            };
            return Translation;
        });
        S2.define("select2/diacritics", [], function() {
            var diacritics = {
                "Ⓐ": "A",
                "Ａ": "A",
                "À": "A",
                "Á": "A",
                "Â": "A",
                "Ầ": "A",
                "Ấ": "A",
                "Ẫ": "A",
                "Ẩ": "A",
                "Ã": "A",
                "Ā": "A",
                "Ă": "A",
                "Ằ": "A",
                "Ắ": "A",
                "Ẵ": "A",
                "Ẳ": "A",
                "Ȧ": "A",
                "Ǡ": "A",
                "Ä": "A",
                "Ǟ": "A",
                "Ả": "A",
                "Å": "A",
                "Ǻ": "A",
                "Ǎ": "A",
                "Ȁ": "A",
                "Ȃ": "A",
                "Ạ": "A",
                "Ậ": "A",
                "Ặ": "A",
                "Ḁ": "A",
                "Ą": "A",
                "Ⱥ": "A",
                "Ɐ": "A",
                "Ꜳ": "AA",
                "Æ": "AE",
                "Ǽ": "AE",
                "Ǣ": "AE",
                "Ꜵ": "AO",
                "Ꜷ": "AU",
                "Ꜹ": "AV",
                "Ꜻ": "AV",
                "Ꜽ": "AY",
                "Ⓑ": "B",
                "Ｂ": "B",
                "Ḃ": "B",
                "Ḅ": "B",
                "Ḇ": "B",
                "Ƀ": "B",
                "Ƃ": "B",
                "Ɓ": "B",
                "Ⓒ": "C",
                "Ｃ": "C",
                "Ć": "C",
                "Ĉ": "C",
                "Ċ": "C",
                "Č": "C",
                "Ç": "C",
                "Ḉ": "C",
                "Ƈ": "C",
                "Ȼ": "C",
                "Ꜿ": "C",
                "Ⓓ": "D",
                "Ｄ": "D",
                "Ḋ": "D",
                "Ď": "D",
                "Ḍ": "D",
                "Ḑ": "D",
                "Ḓ": "D",
                "Ḏ": "D",
                "Đ": "D",
                "Ƌ": "D",
                "Ɗ": "D",
                "Ɖ": "D",
                "Ꝺ": "D",
                "Ǳ": "DZ",
                "Ǆ": "DZ",
                "ǲ": "Dz",
                "ǅ": "Dz",
                "Ⓔ": "E",
                "Ｅ": "E",
                "È": "E",
                "É": "E",
                "Ê": "E",
                "Ề": "E",
                "Ế": "E",
                "Ễ": "E",
                "Ể": "E",
                "Ẽ": "E",
                "Ē": "E",
                "Ḕ": "E",
                "Ḗ": "E",
                "Ĕ": "E",
                "Ė": "E",
                "Ë": "E",
                "Ẻ": "E",
                "Ě": "E",
                "Ȅ": "E",
                "Ȇ": "E",
                "Ẹ": "E",
                "Ệ": "E",
                "Ȩ": "E",
                "Ḝ": "E",
                "Ę": "E",
                "Ḙ": "E",
                "Ḛ": "E",
                "Ɛ": "E",
                "Ǝ": "E",
                "Ⓕ": "F",
                "Ｆ": "F",
                "Ḟ": "F",
                "Ƒ": "F",
                "Ꝼ": "F",
                "Ⓖ": "G",
                "Ｇ": "G",
                "Ǵ": "G",
                "Ĝ": "G",
                "Ḡ": "G",
                "Ğ": "G",
                "Ġ": "G",
                "Ǧ": "G",
                "Ģ": "G",
                "Ǥ": "G",
                "Ɠ": "G",
                "Ꞡ": "G",
                "Ᵹ": "G",
                "Ꝿ": "G",
                "Ⓗ": "H",
                "Ｈ": "H",
                "Ĥ": "H",
                "Ḣ": "H",
                "Ḧ": "H",
                "Ȟ": "H",
                "Ḥ": "H",
                "Ḩ": "H",
                "Ḫ": "H",
                "Ħ": "H",
                "Ⱨ": "H",
                "Ⱶ": "H",
                "Ɥ": "H",
                "Ⓘ": "I",
                "Ｉ": "I",
                "Ì": "I",
                "Í": "I",
                "Î": "I",
                "Ĩ": "I",
                "Ī": "I",
                "Ĭ": "I",
                "İ": "I",
                "Ï": "I",
                "Ḯ": "I",
                "Ỉ": "I",
                "Ǐ": "I",
                "Ȉ": "I",
                "Ȋ": "I",
                "Ị": "I",
                "Į": "I",
                "Ḭ": "I",
                "Ɨ": "I",
                "Ⓙ": "J",
                "Ｊ": "J",
                "Ĵ": "J",
                "Ɉ": "J",
                "Ⓚ": "K",
                "Ｋ": "K",
                "Ḱ": "K",
                "Ǩ": "K",
                "Ḳ": "K",
                "Ķ": "K",
                "Ḵ": "K",
                "Ƙ": "K",
                "Ⱪ": "K",
                "Ꝁ": "K",
                "Ꝃ": "K",
                "Ꝅ": "K",
                "Ꞣ": "K",
                "Ⓛ": "L",
                "Ｌ": "L",
                "Ŀ": "L",
                "Ĺ": "L",
                "Ľ": "L",
                "Ḷ": "L",
                "Ḹ": "L",
                "Ļ": "L",
                "Ḽ": "L",
                "Ḻ": "L",
                "Ł": "L",
                "Ƚ": "L",
                "Ɫ": "L",
                "Ⱡ": "L",
                "Ꝉ": "L",
                "Ꝇ": "L",
                "Ꞁ": "L",
                "Ǉ": "LJ",
                "ǈ": "Lj",
                "Ⓜ": "M",
                "Ｍ": "M",
                "Ḿ": "M",
                "Ṁ": "M",
                "Ṃ": "M",
                "Ɱ": "M",
                "Ɯ": "M",
                "Ⓝ": "N",
                "Ｎ": "N",
                "Ǹ": "N",
                "Ń": "N",
                "Ñ": "N",
                "Ṅ": "N",
                "Ň": "N",
                "Ṇ": "N",
                "Ņ": "N",
                "Ṋ": "N",
                "Ṉ": "N",
                "Ƞ": "N",
                "Ɲ": "N",
                "Ꞑ": "N",
                "Ꞥ": "N",
                "Ǌ": "NJ",
                "ǋ": "Nj",
                "Ⓞ": "O",
                "Ｏ": "O",
                "Ò": "O",
                "Ó": "O",
                "Ô": "O",
                "Ồ": "O",
                "Ố": "O",
                "Ỗ": "O",
                "Ổ": "O",
                "Õ": "O",
                "Ṍ": "O",
                "Ȭ": "O",
                "Ṏ": "O",
                "Ō": "O",
                "Ṑ": "O",
                "Ṓ": "O",
                "Ŏ": "O",
                "Ȯ": "O",
                "Ȱ": "O",
                "Ö": "O",
                "Ȫ": "O",
                "Ỏ": "O",
                "Ő": "O",
                "Ǒ": "O",
                "Ȍ": "O",
                "Ȏ": "O",
                "Ơ": "O",
                "Ờ": "O",
                "Ớ": "O",
                "Ỡ": "O",
                "Ở": "O",
                "Ợ": "O",
                "Ọ": "O",
                "Ộ": "O",
                "Ǫ": "O",
                "Ǭ": "O",
                "Ø": "O",
                "Ǿ": "O",
                "Ɔ": "O",
                "Ɵ": "O",
                "Ꝋ": "O",
                "Ꝍ": "O",
                "Ƣ": "OI",
                "Ꝏ": "OO",
                "Ȣ": "OU",
                "Ⓟ": "P",
                "Ｐ": "P",
                "Ṕ": "P",
                "Ṗ": "P",
                "Ƥ": "P",
                "Ᵽ": "P",
                "Ꝑ": "P",
                "Ꝓ": "P",
                "Ꝕ": "P",
                "Ⓠ": "Q",
                "Ｑ": "Q",
                "Ꝗ": "Q",
                "Ꝙ": "Q",
                "Ɋ": "Q",
                "Ⓡ": "R",
                "Ｒ": "R",
                "Ŕ": "R",
                "Ṙ": "R",
                "Ř": "R",
                "Ȑ": "R",
                "Ȓ": "R",
                "Ṛ": "R",
                "Ṝ": "R",
                "Ŗ": "R",
                "Ṟ": "R",
                "Ɍ": "R",
                "Ɽ": "R",
                "Ꝛ": "R",
                "Ꞧ": "R",
                "Ꞃ": "R",
                "Ⓢ": "S",
                "Ｓ": "S",
                "ẞ": "S",
                "Ś": "S",
                "Ṥ": "S",
                "Ŝ": "S",
                "Ṡ": "S",
                "Š": "S",
                "Ṧ": "S",
                "Ṣ": "S",
                "Ṩ": "S",
                "Ș": "S",
                "Ş": "S",
                "Ȿ": "S",
                "Ꞩ": "S",
                "Ꞅ": "S",
                "Ⓣ": "T",
                "Ｔ": "T",
                "Ṫ": "T",
                "Ť": "T",
                "Ṭ": "T",
                "Ț": "T",
                "Ţ": "T",
                "Ṱ": "T",
                "Ṯ": "T",
                "Ŧ": "T",
                "Ƭ": "T",
                "Ʈ": "T",
                "Ⱦ": "T",
                "Ꞇ": "T",
                "Ꜩ": "TZ",
                "Ⓤ": "U",
                "Ｕ": "U",
                "Ù": "U",
                "Ú": "U",
                "Û": "U",
                "Ũ": "U",
                "Ṹ": "U",
                "Ū": "U",
                "Ṻ": "U",
                "Ŭ": "U",
                "Ü": "U",
                "Ǜ": "U",
                "Ǘ": "U",
                "Ǖ": "U",
                "Ǚ": "U",
                "Ủ": "U",
                "Ů": "U",
                "Ű": "U",
                "Ǔ": "U",
                "Ȕ": "U",
                "Ȗ": "U",
                "Ư": "U",
                "Ừ": "U",
                "Ứ": "U",
                "Ữ": "U",
                "Ử": "U",
                "Ự": "U",
                "Ụ": "U",
                "Ṳ": "U",
                "Ų": "U",
                "Ṷ": "U",
                "Ṵ": "U",
                "Ʉ": "U",
                "Ⓥ": "V",
                "Ｖ": "V",
                "Ṽ": "V",
                "Ṿ": "V",
                "Ʋ": "V",
                "Ꝟ": "V",
                "Ʌ": "V",
                "Ꝡ": "VY",
                "Ⓦ": "W",
                "Ｗ": "W",
                "Ẁ": "W",
                "Ẃ": "W",
                "Ŵ": "W",
                "Ẇ": "W",
                "Ẅ": "W",
                "Ẉ": "W",
                "Ⱳ": "W",
                "Ⓧ": "X",
                "Ｘ": "X",
                "Ẋ": "X",
                "Ẍ": "X",
                "Ⓨ": "Y",
                "Ｙ": "Y",
                "Ỳ": "Y",
                "Ý": "Y",
                "Ŷ": "Y",
                "Ỹ": "Y",
                "Ȳ": "Y",
                "Ẏ": "Y",
                "Ÿ": "Y",
                "Ỷ": "Y",
                "Ỵ": "Y",
                "Ƴ": "Y",
                "Ɏ": "Y",
                "Ỿ": "Y",
                "Ⓩ": "Z",
                "Ｚ": "Z",
                "Ź": "Z",
                "Ẑ": "Z",
                "Ż": "Z",
                "Ž": "Z",
                "Ẓ": "Z",
                "Ẕ": "Z",
                "Ƶ": "Z",
                "Ȥ": "Z",
                "Ɀ": "Z",
                "Ⱬ": "Z",
                "Ꝣ": "Z",
                "ⓐ": "a",
                "ａ": "a",
                "ẚ": "a",
                "à": "a",
                "á": "a",
                "â": "a",
                "ầ": "a",
                "ấ": "a",
                "ẫ": "a",
                "ẩ": "a",
                "ã": "a",
                "ā": "a",
                "ă": "a",
                "ằ": "a",
                "ắ": "a",
                "ẵ": "a",
                "ẳ": "a",
                "ȧ": "a",
                "ǡ": "a",
                "ä": "a",
                "ǟ": "a",
                "ả": "a",
                "å": "a",
                "ǻ": "a",
                "ǎ": "a",
                "ȁ": "a",
                "ȃ": "a",
                "ạ": "a",
                "ậ": "a",
                "ặ": "a",
                "ḁ": "a",
                "ą": "a",
                "ⱥ": "a",
                "ɐ": "a",
                "ꜳ": "aa",
                "æ": "ae",
                "ǽ": "ae",
                "ǣ": "ae",
                "ꜵ": "ao",
                "ꜷ": "au",
                "ꜹ": "av",
                "ꜻ": "av",
                "ꜽ": "ay",
                "ⓑ": "b",
                "ｂ": "b",
                "ḃ": "b",
                "ḅ": "b",
                "ḇ": "b",
                "ƀ": "b",
                "ƃ": "b",
                "ɓ": "b",
                "ⓒ": "c",
                "ｃ": "c",
                "ć": "c",
                "ĉ": "c",
                "ċ": "c",
                "č": "c",
                "ç": "c",
                "ḉ": "c",
                "ƈ": "c",
                "ȼ": "c",
                "ꜿ": "c",
                "ↄ": "c",
                "ⓓ": "d",
                "ｄ": "d",
                "ḋ": "d",
                "ď": "d",
                "ḍ": "d",
                "ḑ": "d",
                "ḓ": "d",
                "ḏ": "d",
                "đ": "d",
                "ƌ": "d",
                "ɖ": "d",
                "ɗ": "d",
                "ꝺ": "d",
                "ǳ": "dz",
                "ǆ": "dz",
                "ⓔ": "e",
                "ｅ": "e",
                "è": "e",
                "é": "e",
                "ê": "e",
                "ề": "e",
                "ế": "e",
                "ễ": "e",
                "ể": "e",
                "ẽ": "e",
                "ē": "e",
                "ḕ": "e",
                "ḗ": "e",
                "ĕ": "e",
                "ė": "e",
                "ë": "e",
                "ẻ": "e",
                "ě": "e",
                "ȅ": "e",
                "ȇ": "e",
                "ẹ": "e",
                "ệ": "e",
                "ȩ": "e",
                "ḝ": "e",
                "ę": "e",
                "ḙ": "e",
                "ḛ": "e",
                "ɇ": "e",
                "ɛ": "e",
                "ǝ": "e",
                "ⓕ": "f",
                "ｆ": "f",
                "ḟ": "f",
                "ƒ": "f",
                "ꝼ": "f",
                "ⓖ": "g",
                "ｇ": "g",
                "ǵ": "g",
                "ĝ": "g",
                "ḡ": "g",
                "ğ": "g",
                "ġ": "g",
                "ǧ": "g",
                "ģ": "g",
                "ǥ": "g",
                "ɠ": "g",
                "ꞡ": "g",
                "ᵹ": "g",
                "ꝿ": "g",
                "ⓗ": "h",
                "ｈ": "h",
                "ĥ": "h",
                "ḣ": "h",
                "ḧ": "h",
                "ȟ": "h",
                "ḥ": "h",
                "ḩ": "h",
                "ḫ": "h",
                "ẖ": "h",
                "ħ": "h",
                "ⱨ": "h",
                "ⱶ": "h",
                "ɥ": "h",
                "ƕ": "hv",
                "ⓘ": "i",
                "ｉ": "i",
                "ì": "i",
                "í": "i",
                "î": "i",
                "ĩ": "i",
                "ī": "i",
                "ĭ": "i",
                "ï": "i",
                "ḯ": "i",
                "ỉ": "i",
                "ǐ": "i",
                "ȉ": "i",
                "ȋ": "i",
                "ị": "i",
                "į": "i",
                "ḭ": "i",
                "ɨ": "i",
                "ı": "i",
                "ⓙ": "j",
                "ｊ": "j",
                "ĵ": "j",
                "ǰ": "j",
                "ɉ": "j",
                "ⓚ": "k",
                "ｋ": "k",
                "ḱ": "k",
                "ǩ": "k",
                "ḳ": "k",
                "ķ": "k",
                "ḵ": "k",
                "ƙ": "k",
                "ⱪ": "k",
                "ꝁ": "k",
                "ꝃ": "k",
                "ꝅ": "k",
                "ꞣ": "k",
                "ⓛ": "l",
                "ｌ": "l",
                "ŀ": "l",
                "ĺ": "l",
                "ľ": "l",
                "ḷ": "l",
                "ḹ": "l",
                "ļ": "l",
                "ḽ": "l",
                "ḻ": "l",
                "ſ": "l",
                "ł": "l",
                "ƚ": "l",
                "ɫ": "l",
                "ⱡ": "l",
                "ꝉ": "l",
                "ꞁ": "l",
                "ꝇ": "l",
                "ǉ": "lj",
                "ⓜ": "m",
                "ｍ": "m",
                "ḿ": "m",
                "ṁ": "m",
                "ṃ": "m",
                "ɱ": "m",
                "ɯ": "m",
                "ⓝ": "n",
                "ｎ": "n",
                "ǹ": "n",
                "ń": "n",
                "ñ": "n",
                "ṅ": "n",
                "ň": "n",
                "ṇ": "n",
                "ņ": "n",
                "ṋ": "n",
                "ṉ": "n",
                "ƞ": "n",
                "ɲ": "n",
                "ŉ": "n",
                "ꞑ": "n",
                "ꞥ": "n",
                "ǌ": "nj",
                "ⓞ": "o",
                "ｏ": "o",
                "ò": "o",
                "ó": "o",
                "ô": "o",
                "ồ": "o",
                "ố": "o",
                "ỗ": "o",
                "ổ": "o",
                "õ": "o",
                "ṍ": "o",
                "ȭ": "o",
                "ṏ": "o",
                "ō": "o",
                "ṑ": "o",
                "ṓ": "o",
                "ŏ": "o",
                "ȯ": "o",
                "ȱ": "o",
                "ö": "o",
                "ȫ": "o",
                "ỏ": "o",
                "ő": "o",
                "ǒ": "o",
                "ȍ": "o",
                "ȏ": "o",
                "ơ": "o",
                "ờ": "o",
                "ớ": "o",
                "ỡ": "o",
                "ở": "o",
                "ợ": "o",
                "ọ": "o",
                "ộ": "o",
                "ǫ": "o",
                "ǭ": "o",
                "ø": "o",
                "ǿ": "o",
                "ɔ": "o",
                "ꝋ": "o",
                "ꝍ": "o",
                "ɵ": "o",
                "ƣ": "oi",
                "ȣ": "ou",
                "ꝏ": "oo",
                "ⓟ": "p",
                "ｐ": "p",
                "ṕ": "p",
                "ṗ": "p",
                "ƥ": "p",
                "ᵽ": "p",
                "ꝑ": "p",
                "ꝓ": "p",
                "ꝕ": "p",
                "ⓠ": "q",
                "ｑ": "q",
                "ɋ": "q",
                "ꝗ": "q",
                "ꝙ": "q",
                "ⓡ": "r",
                "ｒ": "r",
                "ŕ": "r",
                "ṙ": "r",
                "ř": "r",
                "ȑ": "r",
                "ȓ": "r",
                "ṛ": "r",
                "ṝ": "r",
                "ŗ": "r",
                "ṟ": "r",
                "ɍ": "r",
                "ɽ": "r",
                "ꝛ": "r",
                "ꞧ": "r",
                "ꞃ": "r",
                "ⓢ": "s",
                "ｓ": "s",
                "ß": "s",
                "ś": "s",
                "ṥ": "s",
                "ŝ": "s",
                "ṡ": "s",
                "š": "s",
                "ṧ": "s",
                "ṣ": "s",
                "ṩ": "s",
                "ș": "s",
                "ş": "s",
                "ȿ": "s",
                "ꞩ": "s",
                "ꞅ": "s",
                "ẛ": "s",
                "ⓣ": "t",
                "ｔ": "t",
                "ṫ": "t",
                "ẗ": "t",
                "ť": "t",
                "ṭ": "t",
                "ț": "t",
                "ţ": "t",
                "ṱ": "t",
                "ṯ": "t",
                "ŧ": "t",
                "ƭ": "t",
                "ʈ": "t",
                "ⱦ": "t",
                "ꞇ": "t",
                "ꜩ": "tz",
                "ⓤ": "u",
                "ｕ": "u",
                "ù": "u",
                "ú": "u",
                "û": "u",
                "ũ": "u",
                "ṹ": "u",
                "ū": "u",
                "ṻ": "u",
                "ŭ": "u",
                "ü": "u",
                "ǜ": "u",
                "ǘ": "u",
                "ǖ": "u",
                "ǚ": "u",
                "ủ": "u",
                "ů": "u",
                "ű": "u",
                "ǔ": "u",
                "ȕ": "u",
                "ȗ": "u",
                "ư": "u",
                "ừ": "u",
                "ứ": "u",
                "ữ": "u",
                "ử": "u",
                "ự": "u",
                "ụ": "u",
                "ṳ": "u",
                "ų": "u",
                "ṷ": "u",
                "ṵ": "u",
                "ʉ": "u",
                "ⓥ": "v",
                "ｖ": "v",
                "ṽ": "v",
                "ṿ": "v",
                "ʋ": "v",
                "ꝟ": "v",
                "ʌ": "v",
                "ꝡ": "vy",
                "ⓦ": "w",
                "ｗ": "w",
                "ẁ": "w",
                "ẃ": "w",
                "ŵ": "w",
                "ẇ": "w",
                "ẅ": "w",
                "ẘ": "w",
                "ẉ": "w",
                "ⱳ": "w",
                "ⓧ": "x",
                "ｘ": "x",
                "ẋ": "x",
                "ẍ": "x",
                "ⓨ": "y",
                "ｙ": "y",
                "ỳ": "y",
                "ý": "y",
                "ŷ": "y",
                "ỹ": "y",
                "ȳ": "y",
                "ẏ": "y",
                "ÿ": "y",
                "ỷ": "y",
                "ẙ": "y",
                "ỵ": "y",
                "ƴ": "y",
                "ɏ": "y",
                "ỿ": "y",
                "ⓩ": "z",
                "ｚ": "z",
                "ź": "z",
                "ẑ": "z",
                "ż": "z",
                "ž": "z",
                "ẓ": "z",
                "ẕ": "z",
                "ƶ": "z",
                "ȥ": "z",
                "ɀ": "z",
                "ⱬ": "z",
                "ꝣ": "z",
                "Ά": "Α",
                "Έ": "Ε",
                "Ή": "Η",
                "Ί": "Ι",
                "Ϊ": "Ι",
                "Ό": "Ο",
                "Ύ": "Υ",
                "Ϋ": "Υ",
                "Ώ": "Ω",
                "ά": "α",
                "έ": "ε",
                "ή": "η",
                "ί": "ι",
                "ϊ": "ι",
                "ΐ": "ι",
                "ό": "ο",
                "ύ": "υ",
                "ϋ": "υ",
                "ΰ": "υ",
                "ω": "ω",
                "ς": "σ"
            };
            return diacritics;
        });
        S2.define("select2/data/base", [ "../utils" ], function(Utils) {
            function BaseAdapter($element, options) {
                BaseAdapter.__super__.constructor.call(this);
            }
            Utils.Extend(BaseAdapter, Utils.Observable);
            BaseAdapter.prototype.current = function(callback) {
                throw new Error("The `current` method must be defined in child classes.");
            };
            BaseAdapter.prototype.query = function(params, callback) {
                throw new Error("The `query` method must be defined in child classes.");
            };
            BaseAdapter.prototype.bind = function(container, $container) {};
            BaseAdapter.prototype.destroy = function() {};
            BaseAdapter.prototype.generateResultId = function(container, data) {
                var id = container.id + "-result-";
                id += Utils.generateChars(4);
                if (data.id != null) {
                    id += "-" + data.id.toString();
                } else {
                    id += "-" + Utils.generateChars(4);
                }
                return id;
            };
            return BaseAdapter;
        });
        S2.define("select2/data/select", [ "./base", "../utils", "jquery" ], function(BaseAdapter, Utils, $) {
            function SelectAdapter($element, options) {
                this.$element = $element;
                this.options = options;
                SelectAdapter.__super__.constructor.call(this);
            }
            Utils.Extend(SelectAdapter, BaseAdapter);
            SelectAdapter.prototype.current = function(callback) {
                var data = [];
                var self = this;
                this.$element.find(":selected").each(function() {
                    var $option = $(this);
                    var option = self.item($option);
                    data.push(option);
                });
                callback(data);
            };
            SelectAdapter.prototype.select = function(data) {
                var self = this;
                data.selected = true;
                if ($(data.element).is("option")) {
                    data.element.selected = true;
                    this.$element.trigger("change");
                    return;
                }
                if (this.$element.prop("multiple")) {
                    this.current(function(currentData) {
                        var val = [];
                        data = [ data ];
                        data.push.apply(data, currentData);
                        for (var d = 0; d < data.length; d++) {
                            var id = data[d].id;
                            if ($.inArray(id, val) === -1) {
                                val.push(id);
                            }
                        }
                        self.$element.val(val);
                        self.$element.trigger("change");
                    });
                } else {
                    var val = data.id;
                    this.$element.val(val);
                    this.$element.trigger("change");
                }
            };
            SelectAdapter.prototype.unselect = function(data) {
                var self = this;
                if (!this.$element.prop("multiple")) {
                    return;
                }
                data.selected = false;
                if ($(data.element).is("option")) {
                    data.element.selected = false;
                    this.$element.trigger("change");
                    return;
                }
                this.current(function(currentData) {
                    var val = [];
                    for (var d = 0; d < currentData.length; d++) {
                        var id = currentData[d].id;
                        if (id !== data.id && $.inArray(id, val) === -1) {
                            val.push(id);
                        }
                    }
                    self.$element.val(val);
                    self.$element.trigger("change");
                });
            };
            SelectAdapter.prototype.bind = function(container, $container) {
                var self = this;
                this.container = container;
                container.on("select", function(params) {
                    self.select(params.data);
                });
                container.on("unselect", function(params) {
                    self.unselect(params.data);
                });
            };
            SelectAdapter.prototype.destroy = function() {
                this.$element.find("*").each(function() {
                    $.removeData(this, "data");
                });
            };
            SelectAdapter.prototype.query = function(params, callback) {
                var data = [];
                var self = this;
                var $options = this.$element.children();
                $options.each(function() {
                    var $option = $(this);
                    if (!$option.is("option") && !$option.is("optgroup")) {
                        return;
                    }
                    var option = self.item($option);
                    var matches = self.matches(params, option);
                    if (matches !== null) {
                        data.push(matches);
                    }
                });
                callback({
                    results: data
                });
            };
            SelectAdapter.prototype.addOptions = function($options) {
                Utils.appendMany(this.$element, $options);
            };
            SelectAdapter.prototype.option = function(data) {
                var option;
                if (data.children) {
                    option = document.createElement("optgroup");
                    option.label = data.text;
                } else {
                    option = document.createElement("option");
                    if (option.textContent !== undefined) {
                        option.textContent = data.text;
                    } else {
                        option.innerText = data.text;
                    }
                }
                if (data.id) {
                    option.value = data.id;
                }
                if (data.disabled) {
                    option.disabled = true;
                }
                if (data.selected) {
                    option.selected = true;
                }
                if (data.title) {
                    option.title = data.title;
                }
                var $option = $(option);
                var normalizedData = this._normalizeItem(data);
                normalizedData.element = option;
                $.data(option, "data", normalizedData);
                return $option;
            };
            SelectAdapter.prototype.item = function($option) {
                var data = {};
                data = $.data($option[0], "data");
                if (data != null) {
                    return data;
                }
                if ($option.is("option")) {
                    data = {
                        id: $option.val(),
                        text: $option.text(),
                        disabled: $option.prop("disabled"),
                        selected: $option.prop("selected"),
                        title: $option.prop("title")
                    };
                } else if ($option.is("optgroup")) {
                    data = {
                        text: $option.prop("label"),
                        children: [],
                        title: $option.prop("title")
                    };
                    var $children = $option.children("option");
                    var children = [];
                    for (var c = 0; c < $children.length; c++) {
                        var $child = $($children[c]);
                        var child = this.item($child);
                        children.push(child);
                    }
                    data.children = children;
                }
                data = this._normalizeItem(data);
                data.element = $option[0];
                $.data($option[0], "data", data);
                return data;
            };
            SelectAdapter.prototype._normalizeItem = function(item) {
                if (!$.isPlainObject(item)) {
                    item = {
                        id: item,
                        text: item
                    };
                }
                item = $.extend({}, {
                    text: ""
                }, item);
                var defaults = {
                    selected: false,
                    disabled: false
                };
                if (item.id != null) {
                    item.id = item.id.toString();
                }
                if (item.text != null) {
                    item.text = item.text.toString();
                }
                if (item._resultId == null && item.id && this.container != null) {
                    item._resultId = this.generateResultId(this.container, item);
                }
                return $.extend({}, defaults, item);
            };
            SelectAdapter.prototype.matches = function(params, data) {
                var matcher = this.options.get("matcher");
                return matcher(params, data);
            };
            return SelectAdapter;
        });
        S2.define("select2/data/array", [ "./select", "../utils", "jquery" ], function(SelectAdapter, Utils, $) {
            function ArrayAdapter($element, options) {
                var data = options.get("data") || [];
                ArrayAdapter.__super__.constructor.call(this, $element, options);
                this.addOptions(this.convertToOptions(data));
            }
            Utils.Extend(ArrayAdapter, SelectAdapter);
            ArrayAdapter.prototype.select = function(data) {
                var $option = this.$element.find("option").filter(function(i, elm) {
                    return elm.value == data.id.toString();
                });
                if ($option.length === 0) {
                    $option = this.option(data);
                    this.addOptions($option);
                }
                ArrayAdapter.__super__.select.call(this, data);
            };
            ArrayAdapter.prototype.convertToOptions = function(data) {
                var self = this;
                var $existing = this.$element.find("option");
                var existingIds = $existing.map(function() {
                    return self.item($(this)).id;
                }).get();
                var $options = [];
                function onlyItem(item) {
                    return function() {
                        return $(this).val() == item.id;
                    };
                }
                for (var d = 0; d < data.length; d++) {
                    var item = this._normalizeItem(data[d]);
                    if ($.inArray(item.id, existingIds) >= 0) {
                        var $existingOption = $existing.filter(onlyItem(item));
                        var existingData = this.item($existingOption);
                        var newData = $.extend(true, {}, existingData, item);
                        var $newOption = this.option(newData);
                        $existingOption.replaceWith($newOption);
                        continue;
                    }
                    var $option = this.option(item);
                    if (item.children) {
                        var $children = this.convertToOptions(item.children);
                        Utils.appendMany($option, $children);
                    }
                    $options.push($option);
                }
                return $options;
            };
            return ArrayAdapter;
        });
        S2.define("select2/data/ajax", [ "./array", "../utils", "jquery" ], function(ArrayAdapter, Utils, $) {
            function AjaxAdapter($element, options) {
                this.ajaxOptions = this._applyDefaults(options.get("ajax"));
                if (this.ajaxOptions.processResults != null) {
                    this.processResults = this.ajaxOptions.processResults;
                }
                AjaxAdapter.__super__.constructor.call(this, $element, options);
            }
            Utils.Extend(AjaxAdapter, ArrayAdapter);
            AjaxAdapter.prototype._applyDefaults = function(options) {
                var defaults = {
                    data: function(params) {
                        return {
                            q: params.term
                        };
                    },
                    transport: function(params, success, failure) {
                        var $request = $.ajax(params);
                        $request.then(success);
                        $request.fail(failure);
                        return $request;
                    }
                };
                return $.extend({}, defaults, options, true);
            };
            AjaxAdapter.prototype.processResults = function(results) {
                return results;
            };
            AjaxAdapter.prototype.query = function(params, callback) {
                var matches = [];
                var self = this;
                if (this._request != null) {
                    if ($.isFunction(this._request.abort)) {
                        this._request.abort();
                    }
                    this._request = null;
                }
                var options = $.extend({
                    type: "GET"
                }, this.ajaxOptions);
                if (typeof options.url === "function") {
                    options.url = options.url(params);
                }
                if (typeof options.data === "function") {
                    options.data = options.data(params);
                }
                function request() {
                    var $request = options.transport(options, function(data) {
                        var results = self.processResults(data, params);
                        if (self.options.get("debug") && window.console && console.error) {
                            if (!results || !results.results || !$.isArray(results.results)) {
                                console.error("Select2: The AJAX results did not return an array in the " + "`results` key of the response.");
                            }
                        }
                        callback(results);
                    }, function() {});
                    self._request = $request;
                }
                if (this.ajaxOptions.delay && params.term !== "") {
                    if (this._queryTimeout) {
                        window.clearTimeout(this._queryTimeout);
                    }
                    this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
                } else {
                    request();
                }
            };
            return AjaxAdapter;
        });
        S2.define("select2/data/tags", [ "jquery" ], function($) {
            function Tags(decorated, $element, options) {
                var tags = options.get("tags");
                var createTag = options.get("createTag");
                if (createTag !== undefined) {
                    this.createTag = createTag;
                }
                decorated.call(this, $element, options);
                if ($.isArray(tags)) {
                    for (var t = 0; t < tags.length; t++) {
                        var tag = tags[t];
                        var item = this._normalizeItem(tag);
                        var $option = this.option(item);
                        this.$element.append($option);
                    }
                }
            }
            Tags.prototype.query = function(decorated, params, callback) {
                var self = this;
                this._removeOldTags();
                if (params.term == null || params.page != null) {
                    decorated.call(this, params, callback);
                    return;
                }
                function wrapper(obj, child) {
                    var data = obj.results;
                    for (var i = 0; i < data.length; i++) {
                        var option = data[i];
                        var checkChildren = option.children != null && !wrapper({
                            results: option.children
                        }, true);
                        var checkText = option.text === params.term;
                        if (checkText || checkChildren) {
                            if (child) {
                                return false;
                            }
                            obj.data = data;
                            callback(obj);
                            return;
                        }
                    }
                    if (child) {
                        return true;
                    }
                    var tag = self.createTag(params);
                    if (tag != null) {
                        var $option = self.option(tag);
                        $option.attr("data-select2-tag", true);
                        self.addOptions([ $option ]);
                        self.insertTag(data, tag);
                    }
                    obj.results = data;
                    callback(obj);
                }
                decorated.call(this, params, wrapper);
            };
            Tags.prototype.createTag = function(decorated, params) {
                var term = $.trim(params.term);
                if (term === "") {
                    return null;
                }
                return {
                    id: term,
                    text: term
                };
            };
            Tags.prototype.insertTag = function(_, data, tag) {
                data.unshift(tag);
            };
            Tags.prototype._removeOldTags = function(_) {
                var tag = this._lastTag;
                var $options = this.$element.find("option[data-select2-tag]");
                $options.each(function() {
                    if (this.selected) {
                        return;
                    }
                    $(this).remove();
                });
            };
            return Tags;
        });
        S2.define("select2/data/tokenizer", [ "jquery" ], function($) {
            function Tokenizer(decorated, $element, options) {
                var tokenizer = options.get("tokenizer");
                if (tokenizer !== undefined) {
                    this.tokenizer = tokenizer;
                }
                decorated.call(this, $element, options);
            }
            Tokenizer.prototype.bind = function(decorated, container, $container) {
                decorated.call(this, container, $container);
                this.$search = container.dropdown.$search || container.selection.$search || $container.find(".select2-search__field");
            };
            Tokenizer.prototype.query = function(decorated, params, callback) {
                var self = this;
                function select(data) {
                    self.trigger("select", {
                        data: data
                    });
                }
                params.term = params.term || "";
                var tokenData = this.tokenizer(params, this.options, select);
                if (tokenData.term !== params.term) {
                    if (this.$search.length) {
                        this.$search.val(tokenData.term);
                        this.$search.focus();
                    }
                    params.term = tokenData.term;
                }
                decorated.call(this, params, callback);
            };
            Tokenizer.prototype.tokenizer = function(_, params, options, callback) {
                var separators = options.get("tokenSeparators") || [];
                var term = params.term;
                var i = 0;
                var createTag = this.createTag || function(params) {
                    return {
                        id: params.term,
                        text: params.term
                    };
                };
                while (i < term.length) {
                    var termChar = term[i];
                    if ($.inArray(termChar, separators) === -1) {
                        i++;
                        continue;
                    }
                    var part = term.substr(0, i);
                    var partParams = $.extend({}, params, {
                        term: part
                    });
                    var data = createTag(partParams);
                    if (data == null) {
                        i++;
                        continue;
                    }
                    callback(data);
                    term = term.substr(i + 1) || "";
                    i = 0;
                }
                return {
                    term: term
                };
            };
            return Tokenizer;
        });
        S2.define("select2/data/minimumInputLength", [], function() {
            function MinimumInputLength(decorated, $e, options) {
                this.minimumInputLength = options.get("minimumInputLength");
                decorated.call(this, $e, options);
            }
            MinimumInputLength.prototype.query = function(decorated, params, callback) {
                params.term = params.term || "";
                if (params.term.length < this.minimumInputLength) {
                    this.trigger("results:message", {
                        message: "inputTooShort",
                        args: {
                            minimum: this.minimumInputLength,
                            input: params.term,
                            params: params
                        }
                    });
                    return;
                }
                decorated.call(this, params, callback);
            };
            return MinimumInputLength;
        });
        S2.define("select2/data/maximumInputLength", [], function() {
            function MaximumInputLength(decorated, $e, options) {
                this.maximumInputLength = options.get("maximumInputLength");
                decorated.call(this, $e, options);
            }
            MaximumInputLength.prototype.query = function(decorated, params, callback) {
                params.term = params.term || "";
                if (this.maximumInputLength > 0 && params.term.length > this.maximumInputLength) {
                    this.trigger("results:message", {
                        message: "inputTooLong",
                        args: {
                            maximum: this.maximumInputLength,
                            input: params.term,
                            params: params
                        }
                    });
                    return;
                }
                decorated.call(this, params, callback);
            };
            return MaximumInputLength;
        });
        S2.define("select2/data/maximumSelectionLength", [], function() {
            function MaximumSelectionLength(decorated, $e, options) {
                this.maximumSelectionLength = options.get("maximumSelectionLength");
                decorated.call(this, $e, options);
            }
            MaximumSelectionLength.prototype.query = function(decorated, params, callback) {
                var self = this;
                this.current(function(currentData) {
                    var count = currentData != null ? currentData.length : 0;
                    if (self.maximumSelectionLength > 0 && count >= self.maximumSelectionLength) {
                        self.trigger("results:message", {
                            message: "maximumSelected",
                            args: {
                                maximum: self.maximumSelectionLength
                            }
                        });
                        return;
                    }
                    decorated.call(self, params, callback);
                });
            };
            return MaximumSelectionLength;
        });
        S2.define("select2/dropdown", [ "jquery", "./utils" ], function($, Utils) {
            function Dropdown($element, options) {
                this.$element = $element;
                this.options = options;
                Dropdown.__super__.constructor.call(this);
            }
            Utils.Extend(Dropdown, Utils.Observable);
            Dropdown.prototype.render = function() {
                var $dropdown = $('<span class="select2-dropdown">' + '<span class="select2-results"></span>' + "</span>");
                $dropdown.attr("dir", this.options.get("dir"));
                this.$dropdown = $dropdown;
                return $dropdown;
            };
            Dropdown.prototype.bind = function() {};
            Dropdown.prototype.position = function($dropdown, $container) {};
            Dropdown.prototype.destroy = function() {
                this.$dropdown.remove();
            };
            return Dropdown;
        });
        S2.define("select2/dropdown/search", [ "jquery", "../utils" ], function($, Utils) {
            function Search() {}
            Search.prototype.render = function(decorated) {
                var $rendered = decorated.call(this);
                var $search = $('<span class="select2-search select2-search--dropdown">' + '<input class="select2-search__field" type="search" tabindex="-1"' + ' autocomplete="off" autocorrect="off" autocapitalize="off"' + ' spellcheck="false" role="textbox" />' + "</span>");
                this.$searchContainer = $search;
                this.$search = $search.find("input");
                $rendered.prepend($search);
                return $rendered;
            };
            Search.prototype.bind = function(decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);
                this.$search.on("keydown", function(evt) {
                    self.trigger("keypress", evt);
                    self._keyUpPrevented = evt.isDefaultPrevented();
                });
                this.$search.on("input", function(evt) {
                    $(this).off("keyup");
                });
                this.$search.on("keyup input", function(evt) {
                    self.handleSearch(evt);
                });
                container.on("open", function() {
                    self.$search.attr("tabindex", 0);
                    self.$search.focus();
                    window.setTimeout(function() {
                        self.$search.focus();
                    }, 0);
                });
                container.on("close", function() {
                    self.$search.attr("tabindex", -1);
                    self.$search.val("");
                });
                container.on("results:all", function(params) {
                    if (params.query.term == null || params.query.term === "") {
                        var showSearch = self.showSearch(params);
                        if (showSearch) {
                            self.$searchContainer.removeClass("select2-search--hide");
                        } else {
                            self.$searchContainer.addClass("select2-search--hide");
                        }
                    }
                });
            };
            Search.prototype.handleSearch = function(evt) {
                if (!this._keyUpPrevented) {
                    var input = this.$search.val();
                    this.trigger("query", {
                        term: input
                    });
                }
                this._keyUpPrevented = false;
            };
            Search.prototype.showSearch = function(_, params) {
                return true;
            };
            return Search;
        });
        S2.define("select2/dropdown/hidePlaceholder", [], function() {
            function HidePlaceholder(decorated, $element, options, dataAdapter) {
                this.placeholder = this.normalizePlaceholder(options.get("placeholder"));
                decorated.call(this, $element, options, dataAdapter);
            }
            HidePlaceholder.prototype.append = function(decorated, data) {
                data.results = this.removePlaceholder(data.results);
                decorated.call(this, data);
            };
            HidePlaceholder.prototype.normalizePlaceholder = function(_, placeholder) {
                if (typeof placeholder === "string") {
                    placeholder = {
                        id: "",
                        text: placeholder
                    };
                }
                return placeholder;
            };
            HidePlaceholder.prototype.removePlaceholder = function(_, data) {
                var modifiedData = data.slice(0);
                for (var d = data.length - 1; d >= 0; d--) {
                    var item = data[d];
                    if (this.placeholder.id === item.id) {
                        modifiedData.splice(d, 1);
                    }
                }
                return modifiedData;
            };
            return HidePlaceholder;
        });
        S2.define("select2/dropdown/infiniteScroll", [ "jquery" ], function($) {
            function InfiniteScroll(decorated, $element, options, dataAdapter) {
                this.lastParams = {};
                decorated.call(this, $element, options, dataAdapter);
                this.$loadingMore = this.createLoadingMore();
                this.loading = false;
            }
            InfiniteScroll.prototype.append = function(decorated, data) {
                this.$loadingMore.remove();
                this.loading = false;
                decorated.call(this, data);
                if (this.showLoadingMore(data)) {
                    this.$results.append(this.$loadingMore);
                }
            };
            InfiniteScroll.prototype.bind = function(decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);
                container.on("query", function(params) {
                    self.lastParams = params;
                    self.loading = true;
                });
                container.on("query:append", function(params) {
                    self.lastParams = params;
                    self.loading = true;
                });
                this.$results.on("scroll", function() {
                    var isLoadMoreVisible = $.contains(document.documentElement, self.$loadingMore[0]);
                    if (self.loading || !isLoadMoreVisible) {
                        return;
                    }
                    var currentOffset = self.$results.offset().top + self.$results.outerHeight(false);
                    var loadingMoreOffset = self.$loadingMore.offset().top + self.$loadingMore.outerHeight(false);
                    if (currentOffset + 50 >= loadingMoreOffset) {
                        self.loadMore();
                    }
                });
            };
            InfiniteScroll.prototype.loadMore = function() {
                this.loading = true;
                var params = $.extend({}, {
                    page: 1
                }, this.lastParams);
                params.page++;
                this.trigger("query:append", params);
            };
            InfiniteScroll.prototype.showLoadingMore = function(_, data) {
                return data.pagination && data.pagination.more;
            };
            InfiniteScroll.prototype.createLoadingMore = function() {
                var $option = $('<li class="option load-more" role="treeitem"></li>');
                var message = this.options.get("translations").get("loadingMore");
                $option.html(message(this.lastParams));
                return $option;
            };
            return InfiniteScroll;
        });
        S2.define("select2/dropdown/attachBody", [ "jquery", "../utils" ], function($, Utils) {
            function AttachBody(decorated, $element, options) {
                this.$dropdownParent = options.get("dropdownParent") || document.body;
                decorated.call(this, $element, options);
            }
            AttachBody.prototype.bind = function(decorated, container, $container) {
                var self = this;
                var setupResultsEvents = false;
                decorated.call(this, container, $container);
                container.on("open", function() {
                    self._showDropdown();
                    self._attachPositioningHandler(container);
                    if (!setupResultsEvents) {
                        setupResultsEvents = true;
                        container.on("results:all", function() {
                            self._positionDropdown();
                            self._resizeDropdown();
                        });
                        container.on("results:append", function() {
                            self._positionDropdown();
                            self._resizeDropdown();
                        });
                    }
                });
                container.on("close", function() {
                    self._hideDropdown();
                    self._detachPositioningHandler(container);
                });
                this.$dropdownContainer.on("mousedown", function(evt) {
                    evt.stopPropagation();
                });
            };
            AttachBody.prototype.destroy = function(decorated) {
                decorated.call(this);
                this.$dropdownContainer.remove();
            };
            AttachBody.prototype.position = function(decorated, $dropdown, $container) {
                $dropdown.attr("class", $container.attr("class"));
                $dropdown.removeClass("select2");
                $dropdown.addClass("select2-container--open");
                $dropdown.css({
                    position: "absolute",
                    top: -999999
                });
                this.$container = $container;
            };
            AttachBody.prototype.render = function(decorated) {
                var $container = $("<span></span>");
                var $dropdown = decorated.call(this);
                $container.append($dropdown);
                this.$dropdownContainer = $container;
                return $container;
            };
            AttachBody.prototype._hideDropdown = function(decorated) {
                this.$dropdownContainer.detach();
            };
            AttachBody.prototype._attachPositioningHandler = function(container) {
                var self = this;
                var scrollEvent = "scroll.select2." + container.id;
                var resizeEvent = "resize.select2." + container.id;
                var orientationEvent = "orientationchange.select2." + container.id;
                var $watchers = this.$container.parents().filter(Utils.hasScroll);
                $watchers.each(function() {
                    $(this).data("select2-scroll-position", {
                        x: $(this).scrollLeft(),
                        y: $(this).scrollTop()
                    });
                });
                $watchers.on(scrollEvent, function(ev) {
                    var position = $(this).data("select2-scroll-position");
                    $(this).scrollTop(position.y);
                });
                $(window).on(scrollEvent + " " + resizeEvent + " " + orientationEvent, function(e) {
                    self._positionDropdown();
                    self._resizeDropdown();
                });
            };
            AttachBody.prototype._detachPositioningHandler = function(container) {
                var scrollEvent = "scroll.select2." + container.id;
                var resizeEvent = "resize.select2." + container.id;
                var orientationEvent = "orientationchange.select2." + container.id;
                var $watchers = this.$container.parents().filter(Utils.hasScroll);
                $watchers.off(scrollEvent);
                $(window).off(scrollEvent + " " + resizeEvent + " " + orientationEvent);
            };
            AttachBody.prototype._positionDropdown = function() {
                var $window = $(window);
                var isCurrentlyAbove = this.$dropdown.hasClass("select2-dropdown--above");
                var isCurrentlyBelow = this.$dropdown.hasClass("select2-dropdown--below");
                var newDirection = null;
                var position = this.$container.position();
                var offset = this.$container.offset();
                offset.bottom = offset.top + this.$container.outerHeight(false);
                var container = {
                    height: this.$container.outerHeight(false)
                };
                container.top = offset.top;
                container.bottom = offset.top + container.height;
                var dropdown = {
                    height: this.$dropdown.outerHeight(false)
                };
                var viewport = {
                    top: $window.scrollTop(),
                    bottom: $window.scrollTop() + $window.height()
                };
                var enoughRoomAbove = viewport.top < offset.top - dropdown.height;
                var enoughRoomBelow = viewport.bottom > offset.bottom + dropdown.height;
                var css = {
                    left: offset.left,
                    top: container.bottom
                };
                if (!isCurrentlyAbove && !isCurrentlyBelow) {
                    newDirection = "below";
                }
                if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
                    newDirection = "above";
                } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
                    newDirection = "below";
                }
                if (newDirection == "above" || isCurrentlyAbove && newDirection !== "below") {
                    css.top = container.top - dropdown.height;
                }
                if (newDirection != null) {
                    this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + newDirection);
                    this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + newDirection);
                }
                this.$dropdownContainer.css(css);
            };
            AttachBody.prototype._resizeDropdown = function() {
                var css = {
                    width: this.$container.outerWidth(false) + "px"
                };
                if (this.options.get("dropdownAutoWidth")) {
                    css.minWidth = css.width;
                    css.width = "auto";
                }
                this.$dropdown.css(css);
            };
            AttachBody.prototype._showDropdown = function(decorated) {
                this.$dropdownContainer.appendTo(this.$dropdownParent);
                this._positionDropdown();
                this._resizeDropdown();
            };
            return AttachBody;
        });
        S2.define("select2/dropdown/minimumResultsForSearch", [], function() {
            function countResults(data) {
                var count = 0;
                for (var d = 0; d < data.length; d++) {
                    var item = data[d];
                    if (item.children) {
                        count += countResults(item.children);
                    } else {
                        count++;
                    }
                }
                return count;
            }
            function MinimumResultsForSearch(decorated, $element, options, dataAdapter) {
                this.minimumResultsForSearch = options.get("minimumResultsForSearch");
                if (this.minimumResultsForSearch < 0) {
                    this.minimumResultsForSearch = Infinity;
                }
                decorated.call(this, $element, options, dataAdapter);
            }
            MinimumResultsForSearch.prototype.showSearch = function(decorated, params) {
                if (countResults(params.data.results) < this.minimumResultsForSearch) {
                    return false;
                }
                return decorated.call(this, params);
            };
            return MinimumResultsForSearch;
        });
        S2.define("select2/dropdown/selectOnClose", [], function() {
            function SelectOnClose() {}
            SelectOnClose.prototype.bind = function(decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);
                container.on("close", function() {
                    self._handleSelectOnClose();
                });
            };
            SelectOnClose.prototype._handleSelectOnClose = function() {
                var $highlightedResults = this.getHighlightedResults();
                if ($highlightedResults.length < 1) {
                    return;
                }
                this.trigger("select", {
                    data: $highlightedResults.data("data")
                });
            };
            return SelectOnClose;
        });
        S2.define("select2/dropdown/closeOnSelect", [], function() {
            function CloseOnSelect() {}
            CloseOnSelect.prototype.bind = function(decorated, container, $container) {
                var self = this;
                decorated.call(this, container, $container);
                container.on("select", function(evt) {
                    self._selectTriggered(evt);
                });
                container.on("unselect", function(evt) {
                    self._selectTriggered(evt);
                });
            };
            CloseOnSelect.prototype._selectTriggered = function(_, evt) {
                var originalEvent = evt.originalEvent;
                if (originalEvent && originalEvent.ctrlKey) {
                    return;
                }
                this.trigger("close", {});
            };
            return CloseOnSelect;
        });
        S2.define("select2/i18n/en", [], function() {
            return {
                errorLoading: function() {
                    return "The results could not be loaded.";
                },
                inputTooLong: function(args) {
                    var overChars = args.input.length - args.maximum;
                    var message = "Please delete " + overChars + " character";
                    if (overChars != 1) {
                        message += "s";
                    }
                    return message;
                },
                inputTooShort: function(args) {
                    var remainingChars = args.minimum - args.input.length;
                    var message = "Please enter " + remainingChars + " or more characters";
                    return message;
                },
                loadingMore: function() {
                    return "Loading more results…";
                },
                maximumSelected: function(args) {
                    var message = "You can only select " + args.maximum + " item";
                    if (args.maximum != 1) {
                        message += "s";
                    }
                    return message;
                },
                noResults: function() {
                    return "No results found";
                },
                searching: function() {
                    return "Searching…";
                }
            };
        });
        S2.define("select2/defaults", [ "jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en" ], function($, require, ResultsList, SingleSelection, MultipleSelection, Placeholder, AllowClear, SelectionSearch, EventRelay, Utils, Translation, DIACRITICS, SelectData, ArrayData, AjaxData, Tags, Tokenizer, MinimumInputLength, MaximumInputLength, MaximumSelectionLength, Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll, AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect, EnglishTranslation) {
            function Defaults() {
                this.reset();
            }
            Defaults.prototype.apply = function(options) {
                options = $.extend({}, this.defaults, options);
                if (options.dataAdapter == null) {
                    if (options.ajax != null) {
                        options.dataAdapter = AjaxData;
                    } else if (options.data != null) {
                        options.dataAdapter = ArrayData;
                    } else {
                        options.dataAdapter = SelectData;
                    }
                    if (options.minimumInputLength > 0) {
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, MinimumInputLength);
                    }
                    if (options.maximumInputLength > 0) {
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, MaximumInputLength);
                    }
                    if (options.maximumSelectionLength > 0) {
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, MaximumSelectionLength);
                    }
                    if (options.tags) {
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
                    }
                    if (options.tokenSeparators != null || options.tokenizer != null) {
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tokenizer);
                    }
                    if (options.query != null) {
                        var Query = require(options.amdBase + "compat/query");
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, Query);
                    }
                    if (options.initSelection != null) {
                        var InitSelection = require(options.amdBase + "compat/initSelection");
                        options.dataAdapter = Utils.Decorate(options.dataAdapter, InitSelection);
                    }
                }
                if (options.resultsAdapter == null) {
                    options.resultsAdapter = ResultsList;
                    if (options.ajax != null) {
                        options.resultsAdapter = Utils.Decorate(options.resultsAdapter, InfiniteScroll);
                    }
                    if (options.placeholder != null) {
                        options.resultsAdapter = Utils.Decorate(options.resultsAdapter, HidePlaceholder);
                    }
                    if (options.selectOnClose) {
                        options.resultsAdapter = Utils.Decorate(options.resultsAdapter, SelectOnClose);
                    }
                }
                if (options.dropdownAdapter == null) {
                    if (options.multiple) {
                        options.dropdownAdapter = Dropdown;
                    } else {
                        var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);
                        options.dropdownAdapter = SearchableDropdown;
                    }
                    if (options.minimumResultsForSearch !== 0) {
                        options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, MinimumResultsForSearch);
                    }
                    if (options.closeOnSelect) {
                        options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, CloseOnSelect);
                    }
                    if (options.dropdownCssClass != null || options.dropdownCss != null || options.adaptDropdownCssClass != null) {
                        var DropdownCSS = require(options.amdBase + "compat/dropdownCss");
                        options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, DropdownCSS);
                    }
                    options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter, AttachBody);
                }
                if (options.selectionAdapter == null) {
                    if (options.multiple) {
                        options.selectionAdapter = MultipleSelection;
                    } else {
                        options.selectionAdapter = SingleSelection;
                    }
                    if (options.placeholder != null) {
                        options.selectionAdapter = Utils.Decorate(options.selectionAdapter, Placeholder);
                    }
                    if (options.allowClear) {
                        options.selectionAdapter = Utils.Decorate(options.selectionAdapter, AllowClear);
                    }
                    if (options.multiple) {
                        options.selectionAdapter = Utils.Decorate(options.selectionAdapter, SelectionSearch);
                    }
                    if (options.containerCssClass != null || options.containerCss != null || options.adaptContainerCssClass != null) {
                        var ContainerCSS = require(options.amdBase + "compat/containerCss");
                        options.selectionAdapter = Utils.Decorate(options.selectionAdapter, ContainerCSS);
                    }
                    options.selectionAdapter = Utils.Decorate(options.selectionAdapter, EventRelay);
                }
                if (typeof options.language === "string") {
                    if (options.language.indexOf("-") > 0) {
                        var languageParts = options.language.split("-");
                        var baseLanguage = languageParts[0];
                        options.language = [ options.language, baseLanguage ];
                    } else {
                        options.language = [ options.language ];
                    }
                }
                if ($.isArray(options.language)) {
                    var languages = new Translation();
                    options.language.push("en");
                    var languageNames = options.language;
                    for (var l = 0; l < languageNames.length; l++) {
                        var name = languageNames[l];
                        var language = {};
                        try {
                            language = Translation.loadPath(name);
                        } catch (e) {
                            try {
                                name = this.defaults.amdLanguageBase + name;
                                language = Translation.loadPath(name);
                            } catch (ex) {
                                if (options.debug && window.console && console.warn) {
                                    console.warn('Select2: The language file for "' + name + '" could not be ' + "automatically loaded. A fallback will be used instead.");
                                }
                                continue;
                            }
                        }
                        languages.extend(language);
                    }
                    options.translations = languages;
                } else {
                    var baseTranslation = Translation.loadPath(this.defaults.amdLanguageBase + "en");
                    var customTranslation = new Translation(options.language);
                    customTranslation.extend(baseTranslation);
                    options.translations = customTranslation;
                }
                return options;
            };
            Defaults.prototype.reset = function() {
                function stripDiacritics(text) {
                    function match(a) {
                        return DIACRITICS[a] || a;
                    }
                    return text.replace(/[^\u0000-\u007E]/g, match);
                }
                function matcher(params, data) {
                    if ($.trim(params.term) === "") {
                        return data;
                    }
                    if (data.children && data.children.length > 0) {
                        var match = $.extend(true, {}, data);
                        for (var c = data.children.length - 1; c >= 0; c--) {
                            var child = data.children[c];
                            var matches = matcher(params, child);
                            if (matches == null) {
                                match.children.splice(c, 1);
                            }
                        }
                        if (match.children.length > 0) {
                            return match;
                        }
                        return matcher(params, match);
                    }
                    var original = stripDiacritics(data.text).toUpperCase();
                    var term = stripDiacritics(params.term).toUpperCase();
                    if (original.indexOf(term) > -1) {
                        return data;
                    }
                    return null;
                }
                this.defaults = {
                    amdBase: "./",
                    amdLanguageBase: "./i18n/",
                    closeOnSelect: true,
                    debug: false,
                    dropdownAutoWidth: false,
                    escapeMarkup: Utils.escapeMarkup,
                    language: EnglishTranslation,
                    matcher: matcher,
                    minimumInputLength: 0,
                    maximumInputLength: 0,
                    maximumSelectionLength: 0,
                    minimumResultsForSearch: 0,
                    selectOnClose: false,
                    sorter: function(data) {
                        return data;
                    },
                    templateResult: function(result) {
                        return result.text;
                    },
                    templateSelection: function(selection) {
                        return selection.text;
                    },
                    theme: "default",
                    width: "resolve"
                };
            };
            Defaults.prototype.set = function(key, value) {
                var camelKey = $.camelCase(key);
                var data = {};
                data[camelKey] = value;
                var convertedData = Utils._convertData(data);
                $.extend(this.defaults, convertedData);
            };
            var defaults = new Defaults();
            return defaults;
        });
        S2.define("select2/options", [ "require", "jquery", "./defaults", "./utils" ], function(require, $, Defaults, Utils) {
            function Options(options, $element) {
                this.options = options;
                if ($element != null) {
                    this.fromElement($element);
                }
                this.options = Defaults.apply(this.options);
                if ($element && $element.is("input")) {
                    var InputCompat = require(this.get("amdBase") + "compat/inputData");
                    this.options.dataAdapter = Utils.Decorate(this.options.dataAdapter, InputCompat);
                }
            }
            Options.prototype.fromElement = function($e) {
                var excludedData = [ "select2" ];
                if (this.options.multiple == null) {
                    this.options.multiple = $e.prop("multiple");
                }
                if (this.options.disabled == null) {
                    this.options.disabled = $e.prop("disabled");
                }
                if (this.options.language == null) {
                    if ($e.prop("lang")) {
                        this.options.language = $e.prop("lang").toLowerCase();
                    } else if ($e.closest("[lang]").prop("lang")) {
                        this.options.language = $e.closest("[lang]").prop("lang");
                    }
                }
                if (this.options.dir == null) {
                    if ($e.prop("dir")) {
                        this.options.dir = $e.prop("dir");
                    } else if ($e.closest("[dir]").prop("dir")) {
                        this.options.dir = $e.closest("[dir]").prop("dir");
                    } else {
                        this.options.dir = "ltr";
                    }
                }
                $e.prop("disabled", this.options.disabled);
                $e.prop("multiple", this.options.multiple);
                if ($e.data("select2Tags")) {
                    if (this.options.debug && window.console && console.warn) {
                        console.warn("Select2: The `data-select2-tags` attribute has been changed to " + 'use the `data-data` and `data-tags="true"` attributes and will be ' + "removed in future versions of Select2.");
                    }
                    $e.data("data", $e.data("select2Tags"));
                    $e.data("tags", true);
                }
                if ($e.data("ajaxUrl")) {
                    if (this.options.debug && window.console && console.warn) {
                        console.warn("Select2: The `data-ajax-url` attribute has been changed to " + "`data-ajax--url` and support for the old attribute will be removed" + " in future versions of Select2.");
                    }
                    $e.attr("ajax--url", $e.data("ajaxUrl"));
                    $e.data("ajax--url", $e.data("ajaxUrl"));
                }
                var dataset = {};
                if ($.fn.jquery && $.fn.jquery.substr(0, 2) == "1." && $e[0].dataset) {
                    dataset = $.extend(true, {}, $e[0].dataset, $e.data());
                } else {
                    dataset = $e.data();
                }
                var data = $.extend(true, {}, dataset);
                data = Utils._convertData(data);
                for (var key in data) {
                    if ($.inArray(key, excludedData) > -1) {
                        continue;
                    }
                    if ($.isPlainObject(this.options[key])) {
                        $.extend(this.options[key], data[key]);
                    } else {
                        this.options[key] = data[key];
                    }
                }
                return this;
            };
            Options.prototype.get = function(key) {
                return this.options[key];
            };
            Options.prototype.set = function(key, val) {
                this.options[key] = val;
            };
            return Options;
        });
        S2.define("select2/core", [ "jquery", "./options", "./utils", "./keys" ], function($, Options, Utils, KEYS) {
            var Select2 = function($element, options) {
                if ($element.data("select2") != null) {
                    $element.data("select2").destroy();
                }
                this.$element = $element;
                this.id = this._generateId($element);
                options = options || {};
                this.options = new Options(options, $element);
                Select2.__super__.constructor.call(this);
                var tabindex = $element.attr("tabindex") || 0;
                $element.data("old-tabindex", tabindex);
                $element.attr("tabindex", "-1");
                var DataAdapter = this.options.get("dataAdapter");
                this.dataAdapter = new DataAdapter($element, this.options);
                var $container = this.render();
                this._placeContainer($container);
                var SelectionAdapter = this.options.get("selectionAdapter");
                this.selection = new SelectionAdapter($element, this.options);
                this.$selection = this.selection.render();
                this.selection.position(this.$selection, $container);
                var DropdownAdapter = this.options.get("dropdownAdapter");
                this.dropdown = new DropdownAdapter($element, this.options);
                this.$dropdown = this.dropdown.render();
                this.dropdown.position(this.$dropdown, $container);
                var ResultsAdapter = this.options.get("resultsAdapter");
                this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
                this.$results = this.results.render();
                this.results.position(this.$results, this.$dropdown);
                var self = this;
                this._bindAdapters();
                this._registerDomEvents();
                this._registerDataEvents();
                this._registerSelectionEvents();
                this._registerDropdownEvents();
                this._registerResultsEvents();
                this._registerEvents();
                this.dataAdapter.current(function(initialData) {
                    self.trigger("selection:update", {
                        data: initialData
                    });
                });
                $element.addClass("select2-hidden-accessible");
                $element.attr("aria-hidden", "true");
                this._syncAttributes();
                $element.data("select2", this);
            };
            Utils.Extend(Select2, Utils.Observable);
            Select2.prototype._generateId = function($element) {
                var id = "";
                if ($element.attr("id") != null) {
                    id = $element.attr("id");
                } else if ($element.attr("name") != null) {
                    id = $element.attr("name") + "-" + Utils.generateChars(2);
                } else {
                    id = Utils.generateChars(4);
                }
                id = "select2-" + id;
                return id;
            };
            Select2.prototype._placeContainer = function($container) {
                $container.insertAfter(this.$element);
                var width = this._resolveWidth(this.$element, this.options.get("width"));
                if (width != null) {
                    $container.css("width", width);
                }
            };
            Select2.prototype._resolveWidth = function($element, method) {
                var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                if (method == "resolve") {
                    var styleWidth = this._resolveWidth($element, "style");
                    if (styleWidth != null) {
                        return styleWidth;
                    }
                    return this._resolveWidth($element, "element");
                }
                if (method == "element") {
                    var elementWidth = $element.outerWidth(false);
                    if (elementWidth <= 0) {
                        return "auto";
                    }
                    return elementWidth + "px";
                }
                if (method == "style") {
                    var style = $element.attr("style");
                    if (typeof style !== "string") {
                        return null;
                    }
                    var attrs = style.split(";");
                    for (var i = 0, l = attrs.length; i < l; i = i + 1) {
                        var attr = attrs[i].replace(/\s/g, "");
                        var matches = attr.match(WIDTH);
                        if (matches !== null && matches.length >= 1) {
                            return matches[1];
                        }
                    }
                    return null;
                }
                return method;
            };
            Select2.prototype._bindAdapters = function() {
                this.dataAdapter.bind(this, this.$container);
                this.selection.bind(this, this.$container);
                this.dropdown.bind(this, this.$container);
                this.results.bind(this, this.$container);
            };
            Select2.prototype._registerDomEvents = function() {
                var self = this;
                this.$element.on("change.select2", function() {
                    self.dataAdapter.current(function(data) {
                        self.trigger("selection:update", {
                            data: data
                        });
                    });
                });
                this._sync = Utils.bind(this._syncAttributes, this);
                if (this.$element[0].attachEvent) {
                    this.$element[0].attachEvent("onpropertychange", this._sync);
                }
                var observer = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                if (observer != null) {
                    this._observer = new observer(function(mutations) {
                        $.each(mutations, self._sync);
                    });
                    this._observer.observe(this.$element[0], {
                        attributes: true,
                        subtree: false
                    });
                } else if (this.$element[0].addEventListener) {
                    this.$element[0].addEventListener("DOMAttrModified", self._sync, false);
                }
            };
            Select2.prototype._registerDataEvents = function() {
                var self = this;
                this.dataAdapter.on("*", function(name, params) {
                    self.trigger(name, params);
                });
            };
            Select2.prototype._registerSelectionEvents = function() {
                var self = this;
                var nonRelayEvents = [ "toggle", "focus" ];
                this.selection.on("toggle", function() {
                    self.toggleDropdown();
                });
                this.selection.on("focus", function(params) {
                    self.focus(params);
                });
                this.selection.on("*", function(name, params) {
                    if ($.inArray(name, nonRelayEvents) !== -1) {
                        return;
                    }
                    self.trigger(name, params);
                });
            };
            Select2.prototype._registerDropdownEvents = function() {
                var self = this;
                this.dropdown.on("*", function(name, params) {
                    self.trigger(name, params);
                });
            };
            Select2.prototype._registerResultsEvents = function() {
                var self = this;
                this.results.on("*", function(name, params) {
                    self.trigger(name, params);
                });
            };
            Select2.prototype._registerEvents = function() {
                var self = this;
                this.on("open", function() {
                    self.$container.addClass("select2-container--open");
                });
                this.on("close", function() {
                    self.$container.removeClass("select2-container--open");
                });
                this.on("enable", function() {
                    self.$container.removeClass("select2-container--disabled");
                });
                this.on("disable", function() {
                    self.$container.addClass("select2-container--disabled");
                });
                this.on("blur", function() {
                    self.$container.removeClass("select2-container--focus");
                });
                this.on("query", function(params) {
                    if (!self.isOpen()) {
                        self.trigger("open", {});
                    }
                    this.dataAdapter.query(params, function(data) {
                        self.trigger("results:all", {
                            data: data,
                            query: params
                        });
                    });
                });
                this.on("query:append", function(params) {
                    this.dataAdapter.query(params, function(data) {
                        self.trigger("results:append", {
                            data: data,
                            query: params
                        });
                    });
                });
                this.on("keypress", function(evt) {
                    var key = evt.which;
                    if (self.isOpen()) {
                        if (key === KEYS.ESC || key === KEYS.TAB || key === KEYS.UP && evt.altKey) {
                            self.close();
                            evt.preventDefault();
                        } else if (key === KEYS.ENTER) {
                            self.trigger("results:select", {});
                            evt.preventDefault();
                        } else if (key === KEYS.SPACE && evt.ctrlKey) {
                            self.trigger("results:toggle", {});
                            evt.preventDefault();
                        } else if (key === KEYS.UP) {
                            self.trigger("results:previous", {});
                            evt.preventDefault();
                        } else if (key === KEYS.DOWN) {
                            self.trigger("results:next", {});
                            evt.preventDefault();
                        }
                    } else {
                        if (key === KEYS.ENTER || key === KEYS.SPACE || key === KEYS.DOWN && evt.altKey) {
                            self.open();
                            evt.preventDefault();
                        }
                    }
                });
            };
            Select2.prototype._syncAttributes = function() {
                this.options.set("disabled", this.$element.prop("disabled"));
                if (this.options.get("disabled")) {
                    if (this.isOpen()) {
                        this.close();
                    }
                    this.trigger("disable", {});
                } else {
                    this.trigger("enable", {});
                }
            };
            Select2.prototype.trigger = function(name, args) {
                var actualTrigger = Select2.__super__.trigger;
                var preTriggerMap = {
                    open: "opening",
                    close: "closing",
                    select: "selecting",
                    unselect: "unselecting"
                };
                if (name in preTriggerMap) {
                    var preTriggerName = preTriggerMap[name];
                    var preTriggerArgs = {
                        prevented: false,
                        name: name,
                        args: args
                    };
                    actualTrigger.call(this, preTriggerName, preTriggerArgs);
                    if (preTriggerArgs.prevented) {
                        args.prevented = true;
                        return;
                    }
                }
                actualTrigger.call(this, name, args);
            };
            Select2.prototype.toggleDropdown = function() {
                if (this.options.get("disabled")) {
                    return;
                }
                if (this.isOpen()) {
                    this.close();
                } else {
                    this.open();
                }
            };
            Select2.prototype.open = function() {
                if (this.isOpen()) {
                    return;
                }
                this.trigger("query", {});
            };
            Select2.prototype.close = function() {
                if (!this.isOpen()) {
                    return;
                }
                this.trigger("close", {});
            };
            Select2.prototype.isOpen = function() {
                return this.$container.hasClass("select2-container--open");
            };
            Select2.prototype.hasFocus = function() {
                return this.$container.hasClass("select2-container--focus");
            };
            Select2.prototype.focus = function(data) {
                if (this.hasFocus()) {
                    return;
                }
                this.$container.addClass("select2-container--focus");
                this.trigger("focus", {});
            };
            Select2.prototype.enable = function(args) {
                if (this.options.get("debug") && window.console && console.warn) {
                    console.warn('Select2: The `select2("enable")` method has been deprecated and will' + ' be removed in later Select2 versions. Use $element.prop("disabled")' + " instead.");
                }
                if (args == null || args.length === 0) {
                    args = [ true ];
                }
                var disabled = !args[0];
                this.$element.prop("disabled", disabled);
            };
            Select2.prototype.data = function() {
                if (this.options.get("debug") && arguments.length > 0 && window.console && console.warn) {
                    console.warn('Select2: Data can no longer be set using `select2("data")`. You ' + "should consider setting the value instead using `$element.val()`.");
                }
                var data = [];
                this.dataAdapter.current(function(currentData) {
                    data = currentData;
                });
                return data;
            };
            Select2.prototype.val = function(args) {
                if (this.options.get("debug") && window.console && console.warn) {
                    console.warn('Select2: The `select2("val")` method has been deprecated and will be' + " removed in later Select2 versions. Use $element.val() instead.");
                }
                if (args == null || args.length === 0) {
                    return this.$element.val();
                }
                var newVal = args[0];
                if ($.isArray(newVal)) {
                    newVal = $.map(newVal, function(obj) {
                        return obj.toString();
                    });
                }
                this.$element.val(newVal).trigger("change");
            };
            Select2.prototype.destroy = function() {
                this.$container.remove();
                if (this.$element[0].detachEvent) {
                    this.$element[0].detachEvent("onpropertychange", this._sync);
                }
                if (this._observer != null) {
                    this._observer.disconnect();
                    this._observer = null;
                } else if (this.$element[0].removeEventListener) {
                    this.$element[0].removeEventListener("DOMAttrModified", this._sync, false);
                }
                this._sync = null;
                this.$element.off(".select2");
                this.$element.attr("tabindex", this.$element.data("old-tabindex"));
                this.$element.removeClass("select2-hidden-accessible");
                this.$element.attr("aria-hidden", "false");
                this.$element.removeData("select2");
                this.dataAdapter.destroy();
                this.selection.destroy();
                this.dropdown.destroy();
                this.results.destroy();
                this.dataAdapter = null;
                this.selection = null;
                this.dropdown = null;
                this.results = null;
            };
            Select2.prototype.render = function() {
                var $container = $('<span class="select2 select2-container">' + '<span class="selection"></span>' + '<span class="dropdown-wrapper" aria-hidden="true"></span>' + "</span>");
                $container.attr("dir", this.options.get("dir"));
                this.$container = $container;
                this.$container.addClass("select2-container--" + this.options.get("theme"));
                $container.data("element", this.$element);
                return $container;
            };
            return Select2;
        });
        S2.define("select2/compat/utils", [ "jquery" ], function($) {
            function syncCssClasses($dest, $src, adapter) {
                var classes, replacements = [], adapted;
                classes = $.trim($dest.attr("class"));
                if (classes) {
                    classes = "" + classes;
                    $(classes.split(/\s+/)).each(function() {
                        if (this.indexOf("select2-") === 0) {
                            replacements.push(this);
                        }
                    });
                }
                classes = $.trim($src.attr("class"));
                if (classes) {
                    classes = "" + classes;
                    $(classes.split(/\s+/)).each(function() {
                        if (this.indexOf("select2-") !== 0) {
                            adapted = adapter(this);
                            if (adapted != null) {
                                replacements.push(adapted);
                            }
                        }
                    });
                }
                $dest.attr("class", replacements.join(" "));
            }
            return {
                syncCssClasses: syncCssClasses
            };
        });
        S2.define("select2/compat/containerCss", [ "jquery", "./utils" ], function($, CompatUtils) {
            function _containerAdapter(clazz) {
                return null;
            }
            function ContainerCSS() {}
            ContainerCSS.prototype.render = function(decorated) {
                var $container = decorated.call(this);
                var containerCssClass = this.options.get("containerCssClass") || "";
                if ($.isFunction(containerCssClass)) {
                    containerCssClass = containerCssClass(this.$element);
                }
                var containerCssAdapter = this.options.get("adaptContainerCssClass");
                containerCssAdapter = containerCssAdapter || _containerAdapter;
                if (containerCssClass.indexOf(":all:") !== -1) {
                    containerCssClass = containerCssClass.replace(":all:", "");
                    var _cssAdapter = containerCssAdapter;
                    containerCssAdapter = function(clazz) {
                        var adapted = _cssAdapter(clazz);
                        if (adapted != null) {
                            return adapted + " " + clazz;
                        }
                        return clazz;
                    };
                }
                var containerCss = this.options.get("containerCss") || {};
                if ($.isFunction(containerCss)) {
                    containerCss = containerCss(this.$element);
                }
                CompatUtils.syncCssClasses($container, this.$element, containerCssAdapter);
                $container.css(containerCss);
                $container.addClass(containerCssClass);
                return $container;
            };
            return ContainerCSS;
        });
        S2.define("select2/compat/dropdownCss", [ "jquery", "./utils" ], function($, CompatUtils) {
            function _dropdownAdapter(clazz) {
                return null;
            }
            function DropdownCSS() {}
            DropdownCSS.prototype.render = function(decorated) {
                var $dropdown = decorated.call(this);
                var dropdownCssClass = this.options.get("dropdownCssClass") || "";
                if ($.isFunction(dropdownCssClass)) {
                    dropdownCssClass = dropdownCssClass(this.$element);
                }
                var dropdownCssAdapter = this.options.get("adaptDropdownCssClass");
                dropdownCssAdapter = dropdownCssAdapter || _dropdownAdapter;
                if (dropdownCssClass.indexOf(":all:") !== -1) {
                    dropdownCssClass = dropdownCssClass.replace(":all:", "");
                    var _cssAdapter = dropdownCssAdapter;
                    dropdownCssAdapter = function(clazz) {
                        var adapted = _cssAdapter(clazz);
                        if (adapted != null) {
                            return adapted + " " + clazz;
                        }
                        return clazz;
                    };
                }
                var dropdownCss = this.options.get("dropdownCss") || {};
                if ($.isFunction(dropdownCss)) {
                    dropdownCss = dropdownCss(this.$element);
                }
                CompatUtils.syncCssClasses($dropdown, this.$element, dropdownCssAdapter);
                $dropdown.css(dropdownCss);
                $dropdown.addClass(dropdownCssClass);
                return $dropdown;
            };
            return DropdownCSS;
        });
        S2.define("select2/compat/initSelection", [ "jquery" ], function($) {
            function InitSelection(decorated, $element, options) {
                if (options.get("debug") && window.console && console.warn) {
                    console.warn("Select2: The `initSelection` option has been deprecated in favor" + " of a custom data adapter that overrides the `current` method. " + "This method is now called multiple times instead of a single " + "time when the instance is initialized. Support will be removed " + "for the `initSelection` option in future versions of Select2");
                }
                this.initSelection = options.get("initSelection");
                this._isInitialized = false;
                decorated.call(this, $element, options);
            }
            InitSelection.prototype.current = function(decorated, callback) {
                var self = this;
                if (this._isInitialized) {
                    decorated.call(this, callback);
                    return;
                }
                this.initSelection.call(null, this.$element, function(data) {
                    self._isInitialized = true;
                    if (!$.isArray(data)) {
                        data = [ data ];
                    }
                    callback(data);
                });
            };
            return InitSelection;
        });
        S2.define("select2/compat/inputData", [ "jquery" ], function($) {
            function InputData(decorated, $element, options) {
                this._currentData = [];
                this._valueSeparator = options.get("valueSeparator") || ",";
                if ($element.prop("type") === "hidden") {
                    if (options.get("debug") && console && console.warn) {
                        console.warn("Select2: Using a hidden input with Select2 is no longer " + "supported and may stop working in the future. It is recommended " + "to use a `<select>` element instead.");
                    }
                }
                decorated.call(this, $element, options);
            }
            InputData.prototype.current = function(_, callback) {
                function getSelected(data, selectedIds) {
                    var selected = [];
                    if (data.selected || $.inArray(data.id, selectedIds) !== -1) {
                        data.selected = true;
                        selected.push(data);
                    } else {
                        data.selected = false;
                    }
                    if (data.children) {
                        selected.push.apply(selected, getSelected(data.children, selectedIds));
                    }
                    return selected;
                }
                var selected = [];
                for (var d = 0; d < this._currentData.length; d++) {
                    var data = this._currentData[d];
                    selected.push.apply(selected, getSelected(data, this.$element.val().split(this._valueSeparator)));
                }
                callback(selected);
            };
            InputData.prototype.select = function(_, data) {
                if (!this.options.get("multiple")) {
                    this.current(function(allData) {
                        $.map(allData, function(data) {
                            data.selected = false;
                        });
                    });
                    this.$element.val(data.id);
                    this.$element.trigger("change");
                } else {
                    var value = this.$element.val();
                    value += this._valueSeparator + data.id;
                    this.$element.val(value);
                    this.$element.trigger("change");
                }
            };
            InputData.prototype.unselect = function(_, data) {
                var self = this;
                data.selected = false;
                this.current(function(allData) {
                    var values = [];
                    for (var d = 0; d < allData.length; d++) {
                        var item = allData[d];
                        if (data.id == item.id) {
                            continue;
                        }
                        values.push(item.id);
                    }
                    self.$element.val(values.join(self._valueSeparator));
                    self.$element.trigger("change");
                });
            };
            InputData.prototype.query = function(_, params, callback) {
                var results = [];
                for (var d = 0; d < this._currentData.length; d++) {
                    var data = this._currentData[d];
                    var matches = this.matches(params, data);
                    if (matches !== null) {
                        results.push(matches);
                    }
                }
                callback({
                    results: results
                });
            };
            InputData.prototype.addOptions = function(_, $options) {
                var options = $.map($options, function($option) {
                    return $.data($option[0], "data");
                });
                this._currentData.push.apply(this._currentData, options);
            };
            return InputData;
        });
        S2.define("select2/compat/matcher", [ "jquery" ], function($) {
            function oldMatcher(matcher) {
                function wrappedMatcher(params, data) {
                    var match = $.extend(true, {}, data);
                    if (params.term == null || $.trim(params.term) === "") {
                        return match;
                    }
                    if (data.children) {
                        for (var c = data.children.length - 1; c >= 0; c--) {
                            var child = data.children[c];
                            var doesMatch = matcher(params.term, child.text, child);
                            if (!doesMatch) {
                                match.children.splice(c, 1);
                            }
                        }
                        if (match.children.length > 0) {
                            return match;
                        }
                    }
                    if (matcher(params.term, data.text, data)) {
                        return match;
                    }
                    return null;
                }
                return wrappedMatcher;
            }
            return oldMatcher;
        });
        S2.define("select2/compat/query", [], function() {
            function Query(decorated, $element, options) {
                if (options.get("debug") && window.console && console.warn) {
                    console.warn("Select2: The `query` option has been deprecated in favor of a " + "custom data adapter that overrides the `query` method. Support " + "will be removed for the `query` option in future versions of " + "Select2.");
                }
                decorated.call(this, $element, options);
            }
            Query.prototype.query = function(_, params, callback) {
                params.callback = callback;
                var query = this.options.get("query");
                query.call(null, params);
            };
            return Query;
        });
        S2.define("select2/dropdown/attachContainer", [], function() {
            function AttachContainer(decorated, $element, options) {
                decorated.call(this, $element, options);
            }
            AttachContainer.prototype.position = function(decorated, $dropdown, $container) {
                var $dropdownContainer = $container.find(".dropdown-wrapper");
                $dropdownContainer.append($dropdown);
                $dropdown.addClass("select2-dropdown--below");
                $container.addClass("select2-container--below");
            };
            return AttachContainer;
        });
        S2.define("select2/dropdown/stopPropagation", [], function() {
            function StopPropagation() {}
            StopPropagation.prototype.bind = function(decorated, container, $container) {
                decorated.call(this, container, $container);
                var stoppedEvents = [ "blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart" ];
                this.$dropdown.on(stoppedEvents.join(" "), function(evt) {
                    evt.stopPropagation();
                });
            };
            return StopPropagation;
        });
        S2.define("select2/selection/stopPropagation", [], function() {
            function StopPropagation() {}
            StopPropagation.prototype.bind = function(decorated, container, $container) {
                decorated.call(this, container, $container);
                var stoppedEvents = [ "blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart" ];
                this.$selection.on(stoppedEvents.join(" "), function(evt) {
                    evt.stopPropagation();
                });
            };
            return StopPropagation;
        });
        S2.define("jquery.select2", [ "jquery", "require", "./select2/core", "./select2/defaults" ], function($, require, Select2, Defaults) {
            require("jquery.mousewheel");
            if ($.fn.select2 == null) {
                var thisMethods = [ "open", "close", "destroy" ];
                $.fn.select2 = function(options) {
                    options = options || {};
                    if (typeof options === "object") {
                        this.each(function() {
                            var instanceOptions = $.extend({}, options, true);
                            var instance = new Select2($(this), instanceOptions);
                        });
                        return this;
                    } else if (typeof options === "string") {
                        var instance = this.data("select2");
                        if (instance == null && window.console && console.error) {
                            console.error("The select2('" + options + "') method was called on an " + "element that is not using Select2.");
                        }
                        var args = Array.prototype.slice.call(arguments, 1);
                        var ret = instance[options].apply(instance, args);
                        if ($.inArray(options, thisMethods) > -1) {
                            return this;
                        }
                        return ret;
                    } else {
                        throw new Error("Invalid arguments for Select2: " + options);
                    }
                };
            }
            if ($.fn.select2.defaults == null) {
                $.fn.select2.defaults = Defaults;
            }
            return Select2;
        });
        (function(factory) {
            if (typeof S2.define === "function" && S2.define.amd) {
                S2.define("jquery.mousewheel", [ "jquery" ], factory);
            } else if (typeof exports === "object") {
                module.exports = factory;
            } else {
                factory(jQuery);
            }
        })(function($) {
            var toFix = [ "wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll" ], toBind = "onwheel" in document || document.documentMode >= 9 ? [ "wheel" ] : [ "mousewheel", "DomMouseScroll", "MozMousePixelScroll" ], slice = Array.prototype.slice, nullLowestDeltaTimeout, lowestDelta;
            if ($.event.fixHooks) {
                for (var i = toFix.length; i; ) {
                    $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
                }
            }
            var special = $.event.special.mousewheel = {
                version: "3.1.12",
                setup: function() {
                    if (this.addEventListener) {
                        for (var i = toBind.length; i; ) {
                            this.addEventListener(toBind[--i], handler, false);
                        }
                    } else {
                        this.onmousewheel = handler;
                    }
                    $.data(this, "mousewheel-line-height", special.getLineHeight(this));
                    $.data(this, "mousewheel-page-height", special.getPageHeight(this));
                },
                teardown: function() {
                    if (this.removeEventListener) {
                        for (var i = toBind.length; i; ) {
                            this.removeEventListener(toBind[--i], handler, false);
                        }
                    } else {
                        this.onmousewheel = null;
                    }
                    $.removeData(this, "mousewheel-line-height");
                    $.removeData(this, "mousewheel-page-height");
                },
                getLineHeight: function(elem) {
                    var $elem = $(elem), $parent = $elem["offsetParent" in $.fn ? "offsetParent" : "parent"]();
                    if (!$parent.length) {
                        $parent = $("body");
                    }
                    return parseInt($parent.css("fontSize"), 10) || parseInt($elem.css("fontSize"), 10) || 16;
                },
                getPageHeight: function(elem) {
                    return $(elem).height();
                },
                settings: {
                    adjustOldDeltas: true,
                    normalizeOffset: true
                }
            };
            $.fn.extend({
                mousewheel: function(fn) {
                    return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
                },
                unmousewheel: function(fn) {
                    return this.unbind("mousewheel", fn);
                }
            });
            function handler(event) {
                var orgEvent = event || window.event, args = slice.call(arguments, 1), delta = 0, deltaX = 0, deltaY = 0, absDelta = 0, offsetX = 0, offsetY = 0;
                event = $.event.fix(orgEvent);
                event.type = "mousewheel";
                if ("detail" in orgEvent) {
                    deltaY = orgEvent.detail * -1;
                }
                if ("wheelDelta" in orgEvent) {
                    deltaY = orgEvent.wheelDelta;
                }
                if ("wheelDeltaY" in orgEvent) {
                    deltaY = orgEvent.wheelDeltaY;
                }
                if ("wheelDeltaX" in orgEvent) {
                    deltaX = orgEvent.wheelDeltaX * -1;
                }
                if ("axis" in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
                    deltaX = deltaY * -1;
                    deltaY = 0;
                }
                delta = deltaY === 0 ? deltaX : deltaY;
                if ("deltaY" in orgEvent) {
                    deltaY = orgEvent.deltaY * -1;
                    delta = deltaY;
                }
                if ("deltaX" in orgEvent) {
                    deltaX = orgEvent.deltaX;
                    if (deltaY === 0) {
                        delta = deltaX * -1;
                    }
                }
                if (deltaY === 0 && deltaX === 0) {
                    return;
                }
                if (orgEvent.deltaMode === 1) {
                    var lineHeight = $.data(this, "mousewheel-line-height");
                    delta *= lineHeight;
                    deltaY *= lineHeight;
                    deltaX *= lineHeight;
                } else if (orgEvent.deltaMode === 2) {
                    var pageHeight = $.data(this, "mousewheel-page-height");
                    delta *= pageHeight;
                    deltaY *= pageHeight;
                    deltaX *= pageHeight;
                }
                absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));
                if (!lowestDelta || absDelta < lowestDelta) {
                    lowestDelta = absDelta;
                    if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
                        lowestDelta /= 40;
                    }
                }
                if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
                    delta /= 40;
                    deltaX /= 40;
                    deltaY /= 40;
                }
                delta = Math[delta >= 1 ? "floor" : "ceil"](delta / lowestDelta);
                deltaX = Math[deltaX >= 1 ? "floor" : "ceil"](deltaX / lowestDelta);
                deltaY = Math[deltaY >= 1 ? "floor" : "ceil"](deltaY / lowestDelta);
                if (special.settings.normalizeOffset && this.getBoundingClientRect) {
                    var boundingRect = this.getBoundingClientRect();
                    offsetX = event.clientX - boundingRect.left;
                    offsetY = event.clientY - boundingRect.top;
                }
                event.deltaX = deltaX;
                event.deltaY = deltaY;
                event.deltaFactor = lowestDelta;
                event.offsetX = offsetX;
                event.offsetY = offsetY;
                event.deltaMode = 0;
                args.unshift(event, delta, deltaX, deltaY);
                if (nullLowestDeltaTimeout) {
                    clearTimeout(nullLowestDeltaTimeout);
                }
                nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);
                return ($.event.dispatch || $.event.handle).apply(this, args);
            }
            function nullLowestDelta() {
                lowestDelta = null;
            }
            function shouldAdjustOldDeltas(orgEvent, absDelta) {
                return special.settings.adjustOldDeltas && orgEvent.type === "mousewheel" && absDelta % 120 === 0;
            }
        });
        return {
            define: S2.define,
            require: S2.require
        };
    }();
    var select2 = S2.require("jquery.select2");
    jQuery.fn.select2.amd = S2;
    return select2;
});