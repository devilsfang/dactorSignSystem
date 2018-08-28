/*  Prototype JavaScript framework, version 1.5.1
 *  (c) 2005-2007 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://www.prototypejs.org/
 *
/*--------------------------------------------------------------------------*/

var Prototype = {
    Version: '1.5.1',

    Browser: {
        IE:     !!(window.attachEvent && !window.opera),
        Opera:  !!window.opera,
        WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
        Gecko:  navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1
    },

    BrowserFeatures: {
        XPath: !!document.evaluate,
        ElementExtensions: !!window.HTMLElement,
        SpecificElementExtensions:
                (document.createElement('div').__proto__ !==
                 document.createElement('form').__proto__)
    },

    ScriptFragment: '<script[^>]*>([\u0001-\uFFFF]*?)</script>',
    JSONFilter: /^\/\*-secure-\s*(.*)\s*\*\/\s*$/,

    emptyFunction: function() {
    },
    K: function(x) {
        return x
    }
}

var Class = {
    create: function() {
        return function() {
            this.initialize.apply(this, arguments);
        }
    }
}

var Abstract = new Object();

Object.extend = function(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
}

Object.extend(Object, {
    inspect: function(object) {
        try {
            if (object === undefined) return 'undefined';
            if (object === null) return 'null';
            return object.inspect ? object.inspect() : object.toString();
        } catch (e) {
            if (e instanceof RangeError) return '...';
            throw e;
        }
    },

    toJSON: function(object) {
        var type = typeof object;
        switch (type) {
            case 'undefined':
            case 'function':
            case 'unknown': return;
            case 'boolean': return object.toString();
        }
        if (object === null) return 'null';
        if (object.toJSON) return object.toJSON();
        if (object.ownerDocument === document) return;
        var results = [];
        for (var property in object) {
            var value = Object.toJSON(object[property]);
            if (value !== undefined)
                results.push(property.toJSON() + ': ' + value);
        }
        return '{' + results.join(', ') + '}';
    },

    keys: function(object) {
        var keys = [];
        for (var property in object)
            keys.push(property);
        return keys;
    },

    values: function(object) {
        var values = [];
        for (var property in object)
            values.push(object[property]);
        return values;
    },

    clone: function(object) {
        return Object.extend({}, object);
    }
});

//Function.prototype.bind = function() {
//  var __method = this, args =$A(arguments) , object = args.shift();
//  return function() {
//    return __method.apply(object, args.concat($A(arguments)));
//  }
//}
//
//Function.prototype.bindAsEventListener = function(object) {
//  var __method = this, args = $A(arguments), object = args.shift();
//  return function(event) {
//    return __method.apply(object, [event || window.event].concat(args));
//  }
//}
Function.prototype.bindAsEventListener = function(object) {
    var __method = this, args = $A(arguments), object = args.shift();
    return function(event) {
        if (typeof $A === 'function') {                  // <-- Added Firefox Fix
            return __method.apply(object, [( event || window.event)].concat(args).concat($A(arguments)));
        }
    }
}

Function.prototype.bind = function() {
    var __method = this, args = $A(arguments), object = args.shift();
    return function() {
        if (typeof $A === 'function') {                  // <-- Added Firefox Fix
            return __method.apply(object, args.concat($A(arguments)));
        }
    }
}


Object.extend(Number.prototype, {
    toColorPart: function() {
        return this.toPaddedString(2, 16);
    },

    succ: function() {
        return this + 1;
    },

    times: function(iterator) {
        $R(0, this, true).each(iterator);
        return this;
    },

    toPaddedString: function(length, radix) {
        var string = this.toString(radix || 10);
        return '0'.times(length - string.length) + string;
    },

    toJSON: function() {
        return isFinite(this) ? this.toString() : 'null';
    }
});

Date.prototype.toJSON = function() {
    return '"' + this.getFullYear() + '-' +
           (this.getMonth() + 1).toPaddedString(2) + '-' +
           this.getDate().toPaddedString(2) + 'T' +
           this.getHours().toPaddedString(2) + ':' +
           this.getMinutes().toPaddedString(2) + ':' +
           this.getSeconds().toPaddedString(2) + '"';
};

var Try = {
    these: function() {
        var returnValue;

        for (var i = 0, length = arguments.length; i < length; i++) {
            var lambda = arguments[i];
            try {
                returnValue = lambda();
                break;
            } catch (e) {
            }
        }

        return returnValue;
    }
}

/*--------------------------------------------------------------------------*/

var PeriodicalExecuter = Class.create();
PeriodicalExecuter.prototype = {
    initialize: function(callback, frequency) {
        this.callback = callback;
        this.frequency = frequency;
        this.currentlyExecuting = false;

        this.registerCallback();
    },

    registerCallback: function() {
        this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
    },

    stop: function() {
        if (!this.timer) return;
        clearInterval(this.timer);
        this.timer = null;
    },

    onTimerEvent: function() {
        if (!this.currentlyExecuting) {
            try {
                this.currentlyExecuting = true;
                this.callback(this);
            } finally {
                this.currentlyExecuting = false;
            }
        }
    }
}
Object.extend(String, {
    interpret: function(value) {
        return value == null ? '' : String(value);
    },
    specialChar: {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '\\': '\\\\'
    }
});

Object.extend(String.prototype, {
    gsub: function(pattern, replacement) {
        var result = '', source = this, match;
        replacement = arguments.callee.prepareReplacement(replacement);

        while (source.length > 0) {
            if (match = source.match(pattern)) {
                result += source.slice(0, match.index);
                result += String.interpret(replacement(match));
                source = source.slice(match.index + match[0].length);
            } else {
                result += source,source = '';
            }
        }
        return result;
    },

    sub: function(pattern, replacement, count) {
        replacement = this.gsub.prepareReplacement(replacement);
        count = count === undefined ? 1 : count;

        return this.gsub(pattern, function(match) {
            if (--count < 0) return match[0];
            return replacement(match);
        });
    },

    scan: function(pattern, iterator) {
        this.gsub(pattern, iterator);
        return this;
    },

    truncate: function(length, truncation) {
        length = length || 30;
        truncation = truncation === undefined ? '...' : truncation;
        return this.length > length ?
               this.slice(0, length - truncation.length) + truncation : this;
    },

    strip: function() {
        return this.replace(/^\s+/, '').replace(/\s+$/, '');
    },

    stripTags: function() {
        return this.replace(/<\/?[^>]+>/gi, '');
    },

    stripScripts: function() {
        return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
    },

    extractScripts: function() {
        var matchAll = new RegExp(Prototype.ScriptFragment, 'img');
        var matchOne = new RegExp(Prototype.ScriptFragment, 'im');
        return (this.match(matchAll) || []).map(function(scriptTag) {
            return (scriptTag.match(matchOne) || ['', ''])[1];
        });
    },

    evalScripts: function() {
        return this.extractScripts().map(function(script) {
            return eval(script)
        });
    },

    escapeHTML: function() {
        var self = arguments.callee;
        self.text.data = this;
        return self.div.innerHTML;
    },

    unescapeHTML: function() {
        var div = document.createElement('div');
        div.innerHTML = this.stripTags();
        return div.childNodes[0] ? (div.childNodes.length > 1 ?
                                    $A(div.childNodes).inject('', function(memo, node) {
                                        return memo + node.nodeValue
                                    }) :
                                    div.childNodes[0].nodeValue) : '';
    },

    toQueryParams: function(separator) {
        var match = this.strip().match(/([^?#]*)(#.*)?$/);
        if (!match) return {};

        return match[1].split(separator || '&').inject({}, function(hash, pair) {
            if ((pair = pair.split('='))[0]) {
                var key = decodeURIComponent(pair.shift());
                var value = pair.length > 1 ? pair.join('=') : pair[0];
                if (value != undefined) value = decodeURIComponent(value);

                if (key in hash) {
                    if (hash[key].constructor != Array) hash[key] = [hash[key]];
                    hash[key].push(value);
                }
                else hash[key] = value;
            }
            return hash;
        });
    },

    toArray: function() {
        return this.split('');
    },

    succ: function() {
        return this.slice(0, this.length - 1) +
               String.fromCharCode(this.charCodeAt(this.length - 1) + 1);
    },

    times: function(count) {
        var result = '';
        for (var i = 0; i < count; i++) result += this;
        return result;
    },

    camelize: function() {
        var parts = this.split('-'), len = parts.length;
        if (len == 1) return parts[0];

        var camelized = this.charAt(0) == '-'
                ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
                : parts[0];

        for (var i = 1; i < len; i++)
            camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

        return camelized;
    },

    capitalize: function() {
        return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
    },

    underscore: function() {
        return this.gsub(/::/, '/').gsub(/([A-Z]+)([A-Z][a-z])/, '#{1}_#{2}').gsub(/([a-z\d])([A-Z])/, '#{1}_#{2}').gsub(/-/, '_').toLowerCase();
    },

    dasherize: function() {
        return this.gsub(/_/, '-');
    },

    inspect: function(useDoubleQuotes) {
        var escapedString = this.gsub(/[\x00-\x1f\\]/, function(match) {
            var character = String.specialChar[match[0]];
            return character ? character : '\\u00' + match[0].charCodeAt().toPaddedString(2, 16);
        });
        if (useDoubleQuotes) return '"' + escapedString.replace(/"/g, '\\"') + '"';
        return "'" + escapedString.replace(/'/g, '\\\'') + "'";
    },

    toJSON: function() {
        return this.inspect(true);
    },

    unfilterJSON: function(filter) {
        return this.sub(filter || Prototype.JSONFilter, '#{1}');
    },

    evalJSON: function(sanitize) {
        var json = this.unfilterJSON();
        try {
            if (!sanitize || (/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(json)))
                return eval('(' + json + ')');
        } catch (e) {
        }
        throw new SyntaxError('Badly formed JSON string: ' + this.inspect());
    },

    include: function(pattern) {
        return this.indexOf(pattern) > -1;
    },

    startsWith: function(pattern) {
        return this.indexOf(pattern) === 0;
    },

    endsWith: function(pattern) {
        var d = this.length - pattern.length;
        return d >= 0 && this.lastIndexOf(pattern) === d;
    },

    empty: function() {
        return this == '';
    },

    blank: function() {
        return /^\s*$/.test(this);
    }
});

if (Prototype.Browser.WebKit || Prototype.Browser.IE) Object.extend(String.prototype, {
    escapeHTML: function() {
        return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },
    unescapeHTML: function() {
        return this.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    }
});

String.prototype.gsub.prepareReplacement = function(replacement) {
    if (typeof replacement == 'function') return replacement;
    var template = new Template(replacement);
    return function(match) {
        return template.evaluate(match)
    };
}

String.prototype.parseQuery = String.prototype.toQueryParams;

Object.extend(String.prototype.escapeHTML, {
    div:  document.createElement('div'),
    text: document.createTextNode('')
});

with (String.prototype.escapeHTML) div.appendChild(text);

var Template = Class.create();
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;
Template.prototype = {
    initialize: function(template, pattern) {
        this.template = template.toString();
        this.pattern = pattern || Template.Pattern;
    },

    evaluate: function(object) {
        return this.template.gsub(this.pattern, function(match) {
            var before = match[1];
            if (before == '\\') return match[2];
            return before + String.interpret(object[match[3]]);
        });
    }
}

var $break = {}, $continue = new Error('"throw $continue" is deprecated, use "return" instead');

var Enumerable = {
    each: function(iterator) {
        var index = 0;
        try {
            this._each(function(value) {
                iterator(value, index++);
            });
        } catch (e) {
            if (e != $break) throw e;
        }
        return this;
    },

    eachSlice: function(number, iterator) {
        var index = -number, slices = [], array = this.toArray();
        while ((index += number) < array.length)
            slices.push(array.slice(index, index + number));
        return slices.map(iterator);
    },

    all: function(iterator) {
        var result = true;
        this.each(function(value, index) {
            result = result && !!(iterator || Prototype.K)(value, index);
            if (!result) throw $break;
        });
        return result;
    },

    any: function(iterator) {
        var result = false;
        this.each(function(value, index) {
            if (result = !!(iterator || Prototype.K)(value, index))
                throw $break;
        });
        return result;
    },

    collect: function(iterator) {
        var results = [];
        this.each(function(value, index) {
            results.push((iterator || Prototype.K)(value, index));
        });
        return results;
    },

    detect: function(iterator) {
        var result;
        this.each(function(value, index) {
            if (iterator(value, index)) {
                result = value;
                throw $break;
            }
        });
        return result;
    },

    findAll: function(iterator) {
        var results = [];
        this.each(function(value, index) {
            if (iterator(value, index))
                results.push(value);
        });
        return results;
    },

    grep: function(pattern, iterator) {
        var results = [];
        this.each(function(value, index) {
            var stringValue = value.toString();
            if (stringValue.match(pattern))
                results.push((iterator || Prototype.K)(value, index));
        })
        return results;
    },

    include: function(object) {
        var found = false;
        this.each(function(value) {
            if (value == object) {
                found = true;
                throw $break;
            }
        });
        return found;
    },

    inGroupsOf: function(number, fillWith) {
        fillWith = fillWith === undefined ? null : fillWith;
        return this.eachSlice(number, function(slice) {
            while (slice.length < number) slice.push(fillWith);
            return slice;
        });
    },

    inject: function(memo, iterator) {
        this.each(function(value, index) {
            memo = iterator(memo, value, index);
        });
        return memo;
    },

    invoke: function(method) {
        var args = $A(arguments).slice(1);
        return this.map(function(value) {
            return value[method].apply(value, args);
        });
    },

    max: function(iterator) {
        var result;
        this.each(function(value, index) {
            value = (iterator || Prototype.K)(value, index);
            if (result == undefined || value >= result)
                result = value;
        });
        return result;
    },

    min: function(iterator) {
        var result;
        this.each(function(value, index) {
            value = (iterator || Prototype.K)(value, index);
            if (result == undefined || value < result)
                result = value;
        });
        return result;
    },

    partition: function(iterator) {
        var trues = [], falses = [];
        this.each(function(value, index) {
            ((iterator || Prototype.K)(value, index) ?
             trues : falses).push(value);
        });
        return [trues, falses];
    },

    pluck: function(property) {
        var results = [];
        this.each(function(value, index) {
            results.push(value[property]);
        });
        return results;
    },

    reject: function(iterator) {
        var results = [];
        this.each(function(value, index) {
            if (!iterator(value, index))
                results.push(value);
        });
        return results;
    },

    sortBy: function(iterator) {
        return this.map(function(value, index) {
            return {value: value, criteria: iterator(value, index)};
        }).sort(function(left, right) {
            var a = left.criteria, b = right.criteria;
            return a < b ? -1 : a > b ? 1 : 0;
        }).pluck('value');
    },

    toArray: function() {
        return this.map();
    },

    zip: function() {
        var iterator = Prototype.K, args = $A(arguments);
        if (typeof args.last() == 'function')
            iterator = args.pop();

        var collections = [this].concat(args).map($A);
        return this.map(function(value, index) {
            return iterator(collections.pluck(index));
        });
    },

    size: function() {
        return this.toArray().length;
    },

    inspect: function() {
        return '#<Enumerable:' + this.toArray().inspect() + '>';
    }
}

Object.extend(Enumerable, {
    map:     Enumerable.collect,
    find:    Enumerable.detect,
    select:  Enumerable.findAll,
    member:  Enumerable.include,
    entries: Enumerable.toArray
});
var $A = Array.from = function(iterable) {
    if (!iterable) return [];
    if (iterable.toArray) {
        return iterable.toArray();
    } else {
        var results = [];
        for (var i = 0, length = iterable.length; i < length; i++)
            results.push(iterable[i]);
        return results;
    }
}

if (Prototype.Browser.WebKit) {
    $A = Array.from = function(iterable) {
        if (!iterable) return [];
        if (!(typeof iterable == 'function' && iterable == '[object NodeList]') &&
            iterable.toArray) {
            return iterable.toArray();
        } else {
            var results = [];
            for (var i = 0, length = iterable.length; i < length; i++)
                results.push(iterable[i]);
            return results;
        }
    }
}

Object.extend(Array.prototype, Enumerable);

if (!Array.prototype._reverse)
    Array.prototype._reverse = Array.prototype.reverse;

Object.extend(Array.prototype, {
    _each: function(iterator) {
        for (var i = 0, length = this.length; i < length; i++)
            iterator(this[i]);
    },

    clear: function() {
        this.length = 0;
        return this;
    },

    first: function() {
        return this[0];
    },

    last: function() {
        return this[this.length - 1];
    },

    compact: function() {
        return this.select(function(value) {
            return value != null;
        });
    },

    flatten: function() {
        return this.inject([], function(array, value) {
            return array.concat(value && value.constructor == Array ?
                                value.flatten() : [value]);
        });
    },

    without: function() {
        var values = $A(arguments);
        return this.select(function(value) {
            return !values.include(value);
        });
    },

    indexOf: function(object) {
        for (var i = 0, length = this.length; i < length; i++)
            if (this[i] == object) return i;
        return -1;
    },

    reverse: function(inline) {
        return (inline !== false ? this : this.toArray())._reverse();
    },

    reduce: function() {
        return this.length > 1 ? this : this[0];
    },

    uniq: function(sorted) {
        return this.inject([], function(array, value, index) {
            if (0 == index || (sorted ? array.last() != value : !array.include(value)))
                array.push(value);
            return array;
        });
    },

    clone: function() {
        return [].concat(this);
    },

    size: function() {
        return this.length;
    },

    inspect: function() {
        return '[' + this.map(Object.inspect).join(', ') + ']';
    },

    toJSON: function() {
        var results = [];
        this.each(function(object) {
            var value = Object.toJSON(object);
            if (value !== undefined) results.push(value);
        });
        return '[' + results.join(', ') + ']';
    }
});

Array.prototype.toArray = Array.prototype.clone;

function $w(string) {
    string = string.strip();
    return string ? string.split(/\s+/) : [];
}

if (Prototype.Browser.Opera) {
    Array.prototype.concat = function() {
        var array = [];
        for (var i = 0, length = this.length; i < length; i++) array.push(this[i]);
        for (var i = 0, length = arguments.length; i < length; i++) {
            if (arguments[i].constructor == Array) {
                for (var j = 0, arrayLength = arguments[i].length; j < arrayLength; j++)
                    array.push(arguments[i][j]);
            } else {
                array.push(arguments[i]);
            }
        }
        return array;
    }
}
var Hash = function(object) {
    if (object instanceof Hash) this.merge(object);
    else Object.extend(this, object || {});
};

Object.extend(Hash, {
    toQueryString: function(obj) {
        var parts = [];
        parts.add = arguments.callee.addPair;

        this.prototype._each.call(obj, function(pair) {
            if (!pair.key) return;
            var value = pair.value;

            if (value && typeof value == 'object') {
                if (value.constructor == Array) value.each(function(value) {
                    parts.add(pair.key, value);
                });
                return;
            }
            parts.add(pair.key, value);
        });

        return parts.join('&');
    },

    toJSON: function(object) {
        var results = [];
        this.prototype._each.call(object, function(pair) {
            var value = Object.toJSON(pair.value);
            if (value !== undefined) results.push(pair.key.toJSON() + ': ' + value);
        });
        return '{' + results.join(', ') + '}';
    }
});

Hash.toQueryString.addPair = function(key, value, prefix) {
    key = encodeURIComponent(key);
    if (value === undefined) this.push(key);
    else this.push(key + '=' + (value == null ? '' : encodeURIComponent(value)));
}

Object.extend(Hash.prototype, Enumerable);
Object.extend(Hash.prototype, {
    _each: function(iterator) {
        for (var key in this) {
            var value = this[key];
            if (value && value == Hash.prototype[key]) continue;

            var pair = [key, value];
            pair.key = key;
            pair.value = value;
            iterator(pair);
        }
    },

    keys: function() {
        return this.pluck('key');
    },

    values: function() {
        return this.pluck('value');
    },

    merge: function(hash) {
        return $H(hash).inject(this, function(mergedHash, pair) {
            mergedHash[pair.key] = pair.value;
            return mergedHash;
        });
    },

    remove: function() {
        var result;
        for (var i = 0, length = arguments.length; i < length; i++) {
            var value = this[arguments[i]];
            if (value !== undefined) {
                if (result === undefined) result = value;
                else {
                    if (result.constructor != Array) result = [result];
                    result.push(value)
                }
            }
            delete this[arguments[i]];
        }
        return result;
    },

    toQueryString: function() {
        return Hash.toQueryString(this);
    },

    inspect: function() {
        return '#<Hash:{' + this.map(function(pair) {
            return pair.map(Object.inspect).join(': ');
        }).join(', ') + '}>';
    },

    toJSON: function() {
        return Hash.toJSON(this);
    }
});

function $H(object) {
    if (object instanceof Hash) return object;
    return new Hash(object);
}
;

// Safari iterates over shadowed properties
if (function() {
    var i = 0, Test = function(value) {
        this.key = value
    };
    Test.prototype.key = 'foo';
    for (var property in new Test('bar')) i++;
    return i > 1;
}()) Hash.prototype._each = function(iterator) {
    var cache = [];
    for (var key in this) {
        var value = this[key];
        if ((value && value == Hash.prototype[key]) || cache.include(key)) continue;
        cache.push(key);
        var pair = [key, value];
        pair.key = key;
        pair.value = value;
        iterator(pair);
    }
};
ObjectRange = Class.create();
Object.extend(ObjectRange.prototype, Enumerable);
Object.extend(ObjectRange.prototype, {
    initialize: function(start, end, exclusive) {
        this.start = start;
        this.end = end;
        this.exclusive = exclusive;
    },

    _each: function(iterator) {
        var value = this.start;
        while (this.include(value)) {
            iterator(value);
            value = value.succ();
        }
    },

    include: function(value) {
        if (value < this.start)
            return false;
        if (this.exclusive)
            return value < this.end;
        return value <= this.end;
    }
});

var $R = function(start, end, exclusive) {
    return new ObjectRange(start, end, exclusive);
}

var Ajax = {
    getTransport: function() {
        return Try.these(
                function() {
                    return new XMLHttpRequest()
                },
                function() {
                    return new ActiveXObject('Msxml2.XMLHTTP')
                },
                function() {
                    return new ActiveXObject('Microsoft.XMLHTTP')
                }
                ) || false;
    },

    activeRequestCount: 0
}

Ajax.Responders = {
    responders: [],

    _each: function(iterator) {
        this.responders._each(iterator);
    },

    register: function(responder) {
        if (!this.include(responder))
            this.responders.push(responder);
    },

    unregister: function(responder) {
        this.responders = this.responders.without(responder);
    },

    dispatch: function(callback, request, transport, json) {
        this.each(function(responder) {
            if (typeof responder[callback] == 'function') {
                try {
                    responder[callback].apply(responder, [request, transport, json]);
                } catch (e) {
                }
            }
        });
    }
};

Object.extend(Ajax.Responders, Enumerable);

Ajax.Responders.register({
    onCreate: function() {
        Ajax.activeRequestCount++;
    },
    onComplete: function() {
        Ajax.activeRequestCount--;
    }
});

Ajax.Base = function() {
};
Ajax.Base.prototype = {
    setOptions: function(options) {
        this.options = {
            method:       'post',
            asynchronous: true,
            contentType:  'application/x-www-form-urlencoded',
            encoding:     'UTF-8',
            parameters:   ''
        }
        Object.extend(this.options, options || {});

        this.options.method = this.options.method.toLowerCase();
        if (typeof this.options.parameters == 'string')
            this.options.parameters = this.options.parameters.toQueryParams();
    }
}

Ajax.Request = Class.create();
Ajax.Request.Events =
['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];

Ajax.Request.prototype = Object.extend(new Ajax.Base(), {
    _complete: false,

    initialize: function(url, options) {
        this.transport = Ajax.getTransport();
        this.setOptions(options);
        this.request(url);
    },

    request: function(url) {
        this.url = url;
        this.method = this.options.method;
        var params = Object.clone(this.options.parameters);

        if (!['get', 'post'].include(this.method)) {
            // simulate other verbs over post
            params['_method'] = this.method;
            this.method = 'post';
        }

        this.parameters = params;

        if (params = Hash.toQueryString(params)) {
            // when GET, append parameters to URL
            if (this.method == 'get')
                this.url += (this.url.include('?') ? '&' : '?') + params;
            else if (/Konqueror|Safari|KHTML/.test(navigator.userAgent))
                params += '&_=';
        }

        try {
            if (this.options.onCreate) this.options.onCreate(this.transport);
            Ajax.Responders.dispatch('onCreate', this, this.transport);

            this.transport.open(this.method.toUpperCase(), this.url,
                    this.options.asynchronous);

            if (this.options.asynchronous)
                setTimeout(function() {
                    this.respondToReadyState(1)
                }.bind(this), 10);

            this.transport.onreadystatechange = this.onStateChange.bind(this);
            this.setRequestHeaders();

            this.body = this.method == 'post' ? (this.options.postBody || params) : null;
            this.transport.send(this.body);

            /* Force Firefox to handle ready state 4 for synchronous requests */
            if (!this.options.asynchronous && this.transport.overrideMimeType)
                this.onStateChange();

        }
        catch (e) {
            this.dispatchException(e);
        }
    },

    onStateChange: function() {
        var readyState = this.transport.readyState;
        if (readyState > 1 && !((readyState == 4) && this._complete))
            this.respondToReadyState(this.transport.readyState);
    },

    setRequestHeaders: function() {
        var headers = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Prototype-Version': Prototype.Version,
            'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
        };

        if (this.method == 'post') {
            headers['Content-type'] = this.options.contentType +
                                      (this.options.encoding ? '; charset=' + this.options.encoding : '');

            /* Force "Connection: close" for older Mozilla browsers to work
            * around a bug where XMLHttpRequest sends an incorrect
            * Content-length header. See Mozilla Bugzilla #246651.
            */
            if (this.transport.overrideMimeType &&
                (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005)
                headers['Connection'] = 'close';
        }

    // user-defined headers
        if (typeof this.options.requestHeaders == 'object') {
            var extras = this.options.requestHeaders;

            if (typeof extras.push == 'function')
                for (var i = 0, length = extras.length; i < length; i += 2)
                    headers[extras[i]] = extras[i + 1];
            else
                $H(extras).each(function(pair) {
                    headers[pair.key] = pair.value
                });
        }

        for (var name in headers)
            this.transport.setRequestHeader(name, headers[name]);
    },

    success: function() {
        return !this.transport.status
                || (this.transport.status >= 200 && this.transport.status < 300);
    },

    respondToReadyState: function(readyState) {
        var state = Ajax.Request.Events[readyState];
        var transport = this.transport, json = this.evalJSON();

        if (state == 'Complete') {
            try {
                this._complete = true;
                (this.options['on' + this.transport.status]
                        || this.options['on' + (this.success() ? 'Success' : 'Failure')]
                        || Prototype.emptyFunction)(transport, json);
            } catch (e) {
                this.dispatchException(e);
            }

            var contentType = this.getHeader('Content-type');
            if (contentType && contentType.strip().
                    match(/^(text|application)\/(x-)?(java|ecma)script(;.*)?$/i))
                this.evalResponse();
        }

        try {
            (this.options['on' + state] || Prototype.emptyFunction)(transport, json);
            Ajax.Responders.dispatch('on' + state, this, transport, json);
        } catch (e) {
            this.dispatchException(e);
        }

        if (state == 'Complete') {
            // avoid memory leak in MSIE: clean up
            this.transport.onreadystatechange = Prototype.emptyFunction;
        }
    },

    getHeader: function(name) {
        try {
            return this.transport.getResponseHeader(name);
        } catch (e) {
            return null
        }
    },

    evalJSON: function() {
        try {
            var json = this.getHeader('X-JSON');
            return json ? json.evalJSON() : null;
        } catch (e) {
            return null
        }
    },

    evalResponse: function() {
        try {
            return eval((this.transport.responseText || '').unfilterJSON());
        } catch (e) {
            this.dispatchException(e);
        }
    },

    dispatchException: function(exception) {
        (this.options.onException || Prototype.emptyFunction)(this, exception);
        Ajax.Responders.dispatch('onException', this, exception);
    }
});

Ajax.Updater = Class.create();

Object.extend(Object.extend(Ajax.Updater.prototype, Ajax.Request.prototype), {
    initialize: function(container, url, options) {
        this.container = {
            success: (container.success || container),
            failure: (container.failure || (container.success ? null : container))
        }

        this.transport = Ajax.getTransport();
        this.setOptions(options);

        var onComplete = this.options.onComplete || Prototype.emptyFunction;
        this.options.onComplete = (function(transport, param) {
            this.updateContent();
            onComplete(transport, param);
        }).bind(this);

        this.request(url);
    },

    updateContent: function() {
        var receiver = this.container[this.success() ? 'success' : 'failure'];
        var response = this.transport.responseText;

        if (!this.options.evalScripts) response = response.stripScripts();

        if (receiver = $(receiver)) {
            if (this.options.insertion)
                new this.options.insertion(receiver, response);
            else
                receiver.update(response);
        }

        if (this.success()) {
            if (this.onComplete)
                setTimeout(this.onComplete.bind(this), 10);
        }
    }
});

Ajax.PeriodicalUpdater = Class.create();
Ajax.PeriodicalUpdater.prototype = Object.extend(new Ajax.Base(), {
    initialize: function(container, url, options) {
        this.setOptions(options);
        this.onComplete = this.options.onComplete;

        this.frequency = (this.options.frequency || 2);
        this.decay = (this.options.decay || 1);

        this.updater = {};
        this.container = container;
        this.url = url;

        this.start();
    },

    start: function() {
        this.options.onComplete = this.updateComplete.bind(this);
        this.onTimerEvent();
    },

    stop: function() {
        this.updater.options.onComplete = undefined;
        clearTimeout(this.timer);
        (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
    },

    updateComplete: function(request) {
        if (this.options.decay) {
            this.decay = (request.responseText == this.lastText ?
                          this.decay * this.options.decay : 1);

            this.lastText = request.responseText;
        }
        this.timer = setTimeout(this.onTimerEvent.bind(this),
                this.decay * this.frequency * 1000);
    },

    onTimerEvent: function() {
        this.updater = new Ajax.Updater(this.container, this.url, this.options);
    }
});

function wrapAjaxResponse() {
    if (window.Ajax == null || window.Ajax.Request == null) {
        return;
    }
    var _respondToReadyState = Ajax.Request.prototype.respondToReadyState;
    Ajax.Request.prototype.respondToReadyState = function(readyState) {
        var state = Ajax.Request.Events[readyState];
        if (state == 'Complete') {
            var info = null;
            try {
                info = XmlParser(this.transport.responseXML, {record: "info"});
            } catch(e) {
            }
            if (info != null && info.length > 0 && info[0].lookUp('code') == 'noSession') {
                alert("您太久未操作本系统了,为了您的帐号安全,请重新登录.");
                top.location.href = top.CONFIG.serverpath + '/page/frame/login.html';
                return;
            }
        }
        _respondToReadyState.call(this, readyState);
    }
}
if (window.Ajax != null && window.Ajax.Request != null) {
    wrapAjaxResponse();
} else {
    if (document.all) {
        window.attachEvent('onload', wrapAjaxResponse);
    } else {
        window.addEventListener('load', wrapAjaxResponse, false);
    }
}


