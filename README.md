<h1>jsing</h1>

A json tool kit for Node.js.

<h1>简介</h1>

json对象的操作工具集

<h1>函数介绍</h1>

<ul>
<li>get/set 获取/设置节点时, 减少中间节点不存在的判断</li>
<li>create 可以方便的创建多级节点</li>
<li>delete 删除节点</li>
<li>push  将制定键值压入制定的json节点中</li>
<li>pop 弹出指定json节点中的键值</li>
</ul>

<h1>安装</h1>

使用NPM即可安装

<pre>npm install jsing</pre>

<h1>使用实例</h1>

<pre>
<code>
/**
 * 使用实例
 */
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

console.log("获取Json中节点");
console.log(jsonModule.get(data, 0));     // 120
console.log(jsonModule.get(data, "OK"));  // 200
console.log(jsonModule.get(data, "ENTRY", "FA_TOKEN_INVALID")); 	// 1001
console.log(jsonModule.get(data, "TEST", "获取没有的节点")); 		// false 没有的节点返回 false

console.log("设置Json中节点");
console.log(jsonModule.set(data, "ENTRY", "FA_TOKEN_INVALID", 1234));   // true 	设置成功
console.log(jsonModule.get(data, "ENTRY", "FA_TOKEN_INVALID")); 		  // 1234  	获取刚设置的节点
console.log(jsonModule.set(data, "ENTRY", "测试设置没有的节点", 1234)); // false 	设置失败

console.log("创建新的Json节点");
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
console.log(jsonModule.create(prods, 'create', 'hello', 'test', 120)); 	 // true
console.log(jsonModule.create(prods, 'create', 'hello', 'test2', '通过')); // true

console.log("格式化输出节点");
jsonModule.print_r(prods);

console.log("删除节点");
console.log(jsonModule.delete(prods, 'grade', 'math'));             // true
console.log(jsonModule.delete(prods, 'grade', 'competition'));  // true
console.log(jsonModule.delete(prods, 'grade', '删除没有的节点')); // false
jsonModule.print_r(prods);

jsonModule.push(prods, 'name', 'Bob');
jsonModule.print_r(prods);


var empty = {};

jsonModule.push(empty, "hello", {name:"alan"});
jsonModule.push(empty, "hello", {name:"Bob"});

jsonModule.push(empty, 123);
jsonModule.push(empty, 456);
jsonModule.push(empty, 789);

jsonModule.push(empty, {"name": "Alan"});
jsonModule.push(empty, {"name": "Bob"});

console.log(jsonModule.pop(empty));
console.log(jsonModule.pop(empty));
console.log(jsonModule.pop(empty));


console.log(jsonModule.pop(empty));
console.log(jsonModule.pop(empty, "hello"));
console.log(jsonModule.pop(empty, "hello"));

jsonModule.print_r(empty);
</code>
</pre>