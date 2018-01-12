import 'index.js';
import 'babel-polyfill';
const arr = [1, 2, 3, 1, 2, 3];
const uniqueArr = [...new Set(arr)];
const add = (a,b) => {
    return a + b;
};

let foo = 1;
let baz = 2;
[foo,baz] = [baz,foo];

let username = 'zhangsan';
let password = '123456';
let result = `?username=${username}&password=${password}`;

//定义类
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add() {
        return this.x + this.y;
    }
}