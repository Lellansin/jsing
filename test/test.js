

var jsing = require("./jsing");

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



/*

var empty = {};

// jsing.push(empty, "hello", "jsing");	// create a json node key:hello value:jsing
// jsing.push(empty, "hello", "world");	// create a json node key:hello value:jsing
// jsing.push(empty, "hello", "testing");	// create a json node key:hello value:jsing
// jsing.print_r(empty);	// format output this json object

*/

/*var arr = {};

jsing.push(arr, "array", { "firstName":"John" , "lastName":"Doe" });
jsing.push(arr, "array", { "firstName":"Anna" , "lastName":"Smith" });
// jsing.push(arr, "array", { "firstName":"Peter" , "lastName":"Jones" });

jsing.print_r(arr);
console.log(jsing.getStr(arr));*/


/*

var createArray = {};

var arr = Array(1,2,3,4);
// jsing.print_r(arr);

jsing.create(createArray, "test", arr);
// jsing.print_r(createArray);
createArray["test"].push({age:5});
console.log(jsing.getStr(createArray));

*/

// pop push， 如果节点已经有值则变成array再push


// var a2j = jsing.arr2json(Array("alan", "Bob", "Cici", Array("hello", "world", "你好")))

// jsing.print_r(a2j);
// console.log(jsing.getStr(a2j));
// console.log(jsing.get(a2j, "3", 1));
// console.log("类型是 " + a2j.constructor);

/*var j2a = jsing.json2arr({name:"Alan",age:20,num:10000});

jsing.print_r(j2a);
console.log("类型是 " + j2a.constructor);*/

