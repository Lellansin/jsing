

var jsing = require("./jsing");
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


var a2j = jsing.arr2json(Array("alan", "Bob", "Cici", Array("hello", "world", "你好")))

jsing.print_r(a2j);
console.log(jsing.getStr(a2j));
console.log(jsing.get(a2j, "3", 1));
console.log("类型是 " + a2j.constructor);

/*var j2a = jsing.json2arr({name:"Alan",age:20,num:10000});

jsing.print_r(j2a);
console.log("类型是 " + j2a.constructor);*/