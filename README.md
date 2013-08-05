<h1>jSing</h1>

A json tool kit for Node.js. Well, did you find that sometimes console tell you there was certain key is undefined when you want to get or set a json node? if the json object has four level, should I judge it four times? And there are same situations for Create Delete and some other operation. So, all this can be solved by jSing module simply.

<h1>installation</h1>

you can use npm to install this by
<pre>npm install jsing</pre>

<h1>functions</h1>

<ul>
<li><a href="#get_set">get/set</a> without judge undefined</li>
<li><a href="#create_delete">create/delete</a> multilevel simply</li>
<li><a href="#push_pop">push/pop</a> when you like</li>
<li><a href="#json2arr_arr2json">json2arr/arr2json</a> json and array conversions</li>
<li><a href="#print_r">print_r</a> format output the json object like php</li>
</ul>

<h1>Example</h1>

<pre>
var jsing = require("jsing");

var empty = {};

// create a json node key:hello value:jsing
jsing.create(empty, "hello", "jsing");

// format output this json object
jsing.print_r(empty); 
</pre>

<h2 id="get_set">get/set</h2>

<pre>
var json = require("jsing");

var data = {
   0: 120,
   OK: 200,
   FAIL: 500,
   ENTRY: {
       FA_TOKEN_INVALID: 1001,
       FA_TOKEN_EXPIRE: 1002,
       FA_USER_NOT_EXIST: 1003
   },
   GATE: {
       FA_NO_SERVER_AVAILABLE: 2001
   },
   CHAT: {
       FA_CHANNEL_CREATE: 3001,
       FA_CHANNEL_NOT_EXIST: 3002,
       FA_UNKNOWN_CONNECTOR: 3003,
       FA_USER_NOT_ONLINE: 3004
   }
};

console.log("Get the node of Json object");
console.log(jsing.get(data, 0));     // 120
console.log(jsing.get(data, "OK"));  // 200
console.log(jsing.get(data, "ENTRY", "FA_TOKEN_INVALID")); // 1001
console.log(jsing.get(data, "TEST", "NOT_EXIST"));         // false  the node 

console.log("Set the node of Json object");
console.log(jsing.set(data, "ENTRY", "FA_TOKEN_INVALID", 1234));   // true
console.log(jsing.get(data, "ENTRY", "FA_TOKEN_INVALID"));         // 1234
console.log(jsing.set(data, "ENTRY", "NOT_EXIST", 1234));          // false
</pre>


<h2 id="create_delete">create/delete</h2>

<pre>
var prods = {
   'name': 'Alan',
   'grade': {
       'Chinese': 120,
       'math': 130,
       'competition': {
           'NOI': 'First prize'
       }
   }
};

console.log("Create new Json node");
console.log(jsing.create(prods, 'create', 'hello', 'test', 120));      // true
console.log(jsing.create(prods, 'create', 'hello', 'test2', 'PASS'));  // true

console.log("format output");
jsing.print_r(prods);

console.log("Delete the node of Json object");
console.log(jsing.delete(prods, 'grade', 'math'));            // true
console.log(jsing.delete(prods, 'grade', 'competition'));     // true
console.log(jsing.delete(prods, 'grade', 'NODE_NOT_EXIST'));  // false
jsing.print_r(prods);
</pre>


<h2 id="push_pop">push/pop</h2>
<pre>

var empty = {};

jsing.push(empty, "hello", {name:"alan"});
jsing.push(empty, "hello", {name:"Bob"});

jsing.push(empty, 123);
jsing.push(empty, 456);
jsing.push(empty, 789);

jsing.push(empty, {"name": "Alan"});
jsing.push(empty, {"name": "Bob"});

console.log(jsing.pop(empty));
console.log(jsing.pop(empty));
console.log(jsing.pop(empty));

console.log(jsing.pop(empty));
console.log(jsing.pop(empty, "hello"));
console.log(jsing.pop(empty, "hello"));

jsing.print_r(empty);
</pre>


(Chinese support)

<h1>jSing 简介</h1>

json对象的操作工具集，使用递归实现，可操作复杂的节点。json 数组以及排序将是下一个版本的重点。

<h1>函数介绍</h1>

<ul>
<li><a href="#get/set"></a>get/set</a> 获取/设置节点时, 减少中间节点不存在的判断</li>
<li><a href="#create/delete"></a>create/delete</a> 可以方便的创建和删除多级节点</li>
<li><a href="#push/pop"></a>push/pop</a> 简单的入栈出栈</li>
<li>print_r 格式化输出json对象, 类似php中的print_r</li>
</ul>

<h1>安装</h1>

使用NPM即可安装

<pre>npm install jsing</pre>
