// 导入模块
var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'asdzxc456',
    database:'vuecms'
});

// 建立连接
connection.connect();

module.exports = connection