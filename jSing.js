/**
 *  Json对象操作，增删改查，push pop
 *  @author  lellansin     2013-07-31
 *  @version 0.0.2
 *  实例见底部
 */
jSing = module.exports;

/**
 *  get(json对象, 键名, [键名, ... ])
 *
 *  获取Json对象中的某个节点
 *  例如：json.get(Data, 'country', 'province', 'city');
 *  结果则返回 Data['country']['province']['city']
 *  无则返回false
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
 *  set(json对象, 键名, [键名, ...], 值)
 * 
 *  设置Json对象中的某个节点
 *  例如：obj.set(data, "ENTRY", "FA_TOKEN_INVALID", 1234);
 *  将 data['ENTRY']['FA_TOKEN_INVALID'] 设置为1234
 *  成功true, 失败false
 */
jSing.set = function(obj, key) {
    if (ergodic_set(obj, arguments, 1)) {
        return true;
    } else {
        return false;
    }
}

/**
 *  create(json对象, 键名, [键名, ... ], 值)
 *
 *  多层创建新节点， 至少输入一个键名（最后一个键名与值对应）, 支持值为Json对象
 *  若要创建的键（节点）已存在则会覆盖其值
 *  若节点不合法，则会返回false（例如其中某一个目标节点不为Object不能有层级关系）
 *
 *  例如：obj.create(data, 'add', 'hello', 'test', 120);
 *  添加 data['create']['hello']['test'] 节点并设置值为 120
 *  成功true, 失败false
 */
jSing.create = function(obj, key) {
    if (ergodic_create(obj, arguments, 1)) {
        return true;
    } else {
        return false;
    }
}

/**
 *  delete(Json对象, 键名, [键名, ... ] );
 * 
 *  在Json对象中删除节点
 *  例如：obj.delete(prods, 'grade', 'math');
 *  成功true, 失败false
 */
jSing.delete = function(obj, key) {
    if (ergodic_delete(obj, arguments, 1)) {
        return true;
    } else {
        return false;
    }
}

/***
 *  push(json对象, [键名, ...], 值)
 *
 *  将键值对（最后一个键名与值，无键名则是数字索引与值）压入json对象中，可不指明节点名，默认索引从0开始
 *  若目标节点存在一个值，则这个值会被改成  {0:原值}  新插入的值与其平级  {1:新值}
 *  若目标节点已存储多个值，则新的键值对会以长度为键值插入
 */
jSing.push = function(obj, key) {
    var args = arguments;
    if (args.length == 2) {
        if (isNode(obj)) {
            // 是节点则以长度为下表添加新值
            obj[jSing.getLength(obj)] = key;
        } else {
            // 不是节点则将原来的值变成 0:原值  新push进来的变成 1:新值
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
 *  pop(json对象, [键名, ...])
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

/**
 * 返回Json对象的字符串形式（封装 ECMAScript 库函数）
 */
jSing.getStr = function(obj) {
    return JSON.stringify(obj, function(key, value){
//        console.log("key [" + key + "] value [" + value + "]");
        if(key[0] == '_'){
            console.log("这是特殊键值 key " + key + " value " + value);
//            key = '123'+key+'"';
            return '"'+key+'":"'+value+'"';
        }
        return value;
    });
}

/**
 * 解析字符串返回Json对象（封装 ECMAScript 库函数）
 */
jSing.getJson = function(str) {
    return JSON.parse(str);
}

/**
 * 格式化输出Json对象
 */
jSing.print_r = function(obj) {
    console.log("{");
    ergodic_print(obj, "");
    console.log("}");
}

/***
 * 获取Json对象当层长度
 * @param Json对象
 * @returns {number} 当层长度
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
    if (obj.constructor == Object) {
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
                // 此时参数floor为倒数第二个，加1值为最后一个
                obj[args[floor]] = args[floor + 1];
                // console.log("成功设置，返回true");
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
        // 节点不存在，创建新节点
        if (floor < args.length - 1) {
            var value = args[args.length - 1];
            for (var i = args.length - 2; i > floor; i--) {
                var tmp = {};
                tmp[args[i]] =  value;
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
                // 添加节点
                if (isNode(obj[args[floor]])) {
                    // 是节点则以长度为下表添加新值
                    obj[args[floor]][jSing.getLength(obj[args[floor]])] = args[floor + 1];
                } else {
                    // 不是节点则将原来的值变成 0:原值  新push进来的变成 1:新值
                    var tmp = obj[args[floor]];
                    delete obj[args[floor]];
                    jSing.create(obj, args[floor], 0, tmp);
                    jSing.create(obj, args[floor], 1, args[floor + 1]);
                }
                return true;
            }
        }
        // 节点不存在
        if (floor < args.length - 1) {
            var jsonstr = getJsonFormat(args[args.length - 1]);
            if (jsonstr.constructor == Object)
                jsonstr = jSing.getStr(jsonstr);
            jsonstr = '{"0":' + jsonstr + '}';
            for (var i = args.length - 2; i > floor; i--) {
                jsonstr = '{"' + args[i] + '":' + tmp + '}';
            };
            var node = {};
            if (jsonstr.constructor == String) {
                node = JSON.parse(jsonstr);
            } else {
                node = jsonstr;
            }
            obj[args[floor]] = node;
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
                // 此时参数floor为倒数第一个，即最后一个建
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
        return true; // 是节点
    } else {
        return false; // 不是节点
    }
}

function push_insert(obj, args, floor) {
    // 添加节点
    if (isNode(obj)) {
        // 是节点则以长度为下表添加新值
        obj[jSing.getLength(obj)] = args[floor + 1];
    } else {
        // 不是节点则将原来的值变成 0:原值  新push进来的变成 1:新值
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