const express = require('express');
const app = express();
const fs = require('fs');
const { Server } = require('http');
const { stringify } = require('querystring');

//Liệt kê user
app.get('/listUsers', (req, res) => {
    fs.readFile('users.json', 'utf8', (err, data) => {
        console.log(data);
    });
});
//Thêm user

let user = {
    "user4": {
        "name": "hoang",
        "password": "password4",
        "profession": "sinhvien",
        "id": 4
    }
}


app.get('/addUser', (req, res) => {
    fs.readFile('users.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        data["user4"] = user["user4"];
        console.log(data);
        res.end(JSON.stringify(data))
    })
})

//Hiển thị thông tin id user

app.get('/:id', (req, res) => {
    fs.readFile('users.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        let user = data['user' + req.params.id];
        console.log(user);
        res.end(JSON.stringify(user));
    })
})

//Xóa user khỏi database

// let id = 4;

// app.get('/deleteUser', (req, res) => {
//     fs.readFile('user.json', 'utf8', (err, data) => {
//         console.log(data);
//         data = JSON.parse(data);
//         delete data["user" + id];
//         console.log("Co so du lieu sau khi xoa user la: ");
//         console.log(data);
//         res.end(JSON.stringify(data));
//     })
// })

var id = 4;
app.get('/deleteUser/:id', function (req, res) {
    // Dau tien, doc tat ca cac User dang ton tai.
    fs.readFile("users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        delete data["user" + req.params.id];
        console.log(data);
        res.end(JSON.stringify(data));
    });
})


app.listen(8081, () => {
    console.log(`Ứng dụng của bạn đang chạy trên http://localhost:8081`);
})