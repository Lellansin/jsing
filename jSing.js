/**
 *  jSing
 *  @author     lellansin     
 *  @date       2013-07-31
 *  @version    0.0.3
 */
jSing = module.exports;

/**
 *  get(jsonObj, key, [key, ... ])
 *
 *  Example: son.get(Data, 'country', 'province', 'city');
 *  return the value of Data['country']['province']['city']
 *  return false if failed
 */
jSing.get = function(obj, key) {
    var result = obj;

    for (var i = 1; i < arguments.length; i++) {
        result = result[arguments[i]];
        if (result === undefined) {
            return false;
        };
    };
    return result;
};

/**
 *  set(jsonObj, key, [key, ...], value)
 *
 *  Example: obj.set(data, "ENTRY", "FA_TOKEN_INVALID", 1234);
 *  Set the data['ENTRY']['FA_TOKEN_INVALID'] value 1234
 *  success with true, failed with false
 */
jSing.set = function(obj, key) {
    if (ergodic_set(obj, arguments, 1)) {
        return true;
    } else {
        return false;
    }
}

/**
 *  create(jsonObj, key, [key, ... ], value)
 *
 *  create multilevel node, pass at least one key (come with last value)
 *  if the node (key) you want create has exist, the value will be overwrite
 *  if the node is invalid (e.g. the node is not a json object couldn't has next level), function will return false.
 *
 *  Example: obj.create(data, 'add', 'hello', 'test', 120);
 *  create data['create']['hello']['test'] and set is's value 120
 *  success with true, failed with false
 */
jSing.create = function(obj, key) {
    if (ergodic_create(obj, arguments, 1)) {
        return true;
    } else {
        return false;
    }
}

/**
 *  delete(JsonObj, key, [key, ... ] );
 *
 *  Example: obj.delete(prods, 'grade', 'math');
 *  success with true, failed with false
 */
jSing.delete = function(obj, key) {
    if (ergodic_delete(obj, arguments, 1)) {
        return true;
    } else {
        return false;
    }
}

/***
 *  push(jsonObj, [key, ...], value)
 *
 */
jSing.push = function(obj, key) {
    var args = arguments;
    if (args.length == 2) {
        if (isNode(obj)) {
            obj[jSing.getLength(obj)] = key;
        } else {
            var tmp = obj;
            delete obj;
            jSing.create(obj, 0, tmp);
            jSing.create(obj, 1, key);
        }
        return true;
    } else if (ergodic_push(obj, args, 1)) {
        return true;
    } else {
        return false;
    }
}

/***
 *  pop(jsonObj, [key, ...])
 *
 */
jSing.pop = function(obj, key) {
    var args = arguments;
    var rel = ergodic_pop(obj, args, 1);
    if (rel) {
        return rel;
    } else {
        return false;
    }
}

jSing.arr2json = function(arr) {
    // wait for reference pass
    if (arguments.length == 1) {
        var json = {};
        for(var i in arr){
            json[i] = arr[i];
        }
        return json;
    }
}

jSing.json2arr = function(json) {
    if (arguments.length == 1) {
        var arr = new Array();
        for(var k in json) {
            var tmp = {};
            tmp[k] = json[k];
            arr.push(tmp);
        }
        return arr;
    }
}

/**
 * ECMAScript lib
 */
jSing.getStr = function(obj) {
    return JSON.stringify(obj);
}

/**
 * ECMAScript lib
 */
jSing.getJson = function(str) {
    return JSON.parse(str);
}

/**
 * Format output json object like print_r in php
 */
jSing.print_r = function(obj) {
    console.log("{");
    ergodic_print(obj, "");
    console.log("}");
}

/***
 * get length of Json object on the level passed
 */
jSing.getLength = function(obj) {
    var cout = 0;
    for (var item in obj) {
        cout++;
    }
    return cout;
}


// 待优化，将递归中的东西都写入到一个buffer中，减少console.log的调用次数

function ergodic_print(obj, indentation) {
    var indent = "	" + indentation;
    if (obj.constructor == Object || obj.constructor == Array) {
        for (var p in obj) {
            if (obj[p] == undefined) {
                console.log(indent + "[" + p + "] => " + undefined + "");
            } else if (obj[p].constructor == Array || obj[p].constructor == Object) {
                console.log(indent + "[" + p + "] => " + typeof(obj) + "");
                console.log(indent + "{");
                ergodic_print(obj[p], indent);
                console.log(indent + "}");
            } else if (obj[p].constructor == String) {
                console.log(indent + "[" + p + "] => '" + obj[p] + "'");
            } else {
                console.log(indent + "[" + p + "] => " + obj[p] + "");
            }
        }
    }
}

function ergodic_set(obj, args, floor) {
    if (obj.constructor == Object) {
        if (obj[args[floor]] != undefined) {
            if (floor < args.length - 2) {
                return ergodic_set(obj[args[floor]], args, floor + 1);
            } else {
                obj[args[floor]] = args[floor + 1];
                return true;
            }
        }
    }
}

function ergodic_create(obj, args, floor) {
    if (obj.constructor == Object) {
        if (obj[args[floor]] != undefined) {
            if (floor < args.length - 2) {
                return ergodic_create(obj[args[floor]], args, floor + 1);
            } else {
                obj[args[floor]] = args[floor + 1];
                return true;
            }
        }
        // create new
        if (floor < args.length - 1) {
            var value = args[args.length - 1];
            for (var i = args.length - 2; i > floor; i--) {
                var tmp = {};
                tmp[args[i]] = value;
                value = tmp;
            };
            obj[args[floor]] = value;
            return true;
        }
    }
}

function ergodic_delete(obj, args, floor) {
    if (obj.constructor == Object) {
        if (obj[args[floor]] != undefined) {
            if (floor < args.length - 1) {
                return ergodic_delete(obj[args[floor]], args, floor + 1);
            } else {
                delete obj[args[floor]];
                return true;
            }
        }
    }
}

function getJsonFormat(param) {
    if (param == undefined) {
        return undefined;
    } else if (param.constructor == String) {
        return '"' + param + '"';
    } else {
        return param;
    }
}


function ergodic_push(obj, args, floor) {
    if (obj.constructor == Object) {
        if (obj[args[floor]] != undefined) {
            if (floor < args.length - 2) {
                return ergodic_push(obj[args[floor]], args, floor + 1);
            } else {
                // add node
                if (isNode(obj[args[floor]])) {
                    // use length to be the index
                    obj[args[floor]][jSing.getLength(obj[args[floor]])] = args[floor + 1];
                } else {
                    var tmp = obj[args[floor]];
                    delete obj[args[floor]];
                    jSing.create(obj, args[floor], 0, tmp);
                    jSing.create(obj, args[floor], 1, args[floor + 1]);
                }
                return true;
            }
        }
        // create new 
        if (floor < args.length - 1) {
            var value = args[args.length - 1];
            for (var i = args.length - 2; i > floor; i--) {
                var tmp = {};
                tmp[args[i]] = value;
                value = tmp;
            };

            // obj[args[floor]] = value;
            jSing.create(obj, args[floor], 0, value);
            return true;
        }
    }
}

function ergodic_pop(obj, args, floor) {
    if (obj.constructor == Object) {
        if (obj[args[floor]] != undefined) {
            if (floor < args.length - 1) {
                return ergodic_set(obj[args[floor]], args, floor + 1);
            } else {
                var rel = obj[args[floor]][jSing.getLength(obj[args[floor]]) - 1];
                delete obj[args[floor]][jSing.getLength(obj[args[floor]]) - 1];
                return rel;
            }
        }
        var len = jSing.getLength(obj) - 1;
        var rel = obj[len];
        delete obj[len];
        return rel;
    }
}

function isNode(item) {
    if (item.constructor == Object) {
        return true;
    } else {
        return false;
    }
}

function push_insert(obj, args, floor) {
    if (isNode(obj)) {
        obj[jSing.getLength(obj)] = args[floor + 1];
    } else {
        var tmp = obj;
        delete obj;

        if (args.length == 2) {
            jSing.create(obj, 0, tmp);
            jSing.create(obj, 1, args[1]);
        } else {
            jSing.create(obj, args[floor], 0, tmp);
            jSing.create(obj, args[floor], 1, args[floor + 1]);
        }
        return true;
    }
}