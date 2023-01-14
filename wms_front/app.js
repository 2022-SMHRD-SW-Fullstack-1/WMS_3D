const mdbConn = require("./mariaDBConn");
const express = require("express");
const router = express.Router();

const app = express();

const server = require("http").createServer(app);

app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {
  // 요청 패스에 대한 콜백 함수를 넣어줌
  res.sendFile(__dirname + "/pages/html/main.html");
});

app.get("/three/sj/05_warehouse.html", (req, res) => {
  res.sendFile(__dirname + "/three/sj/05_warehouse.html");
});

// mariaDB connect
app.get("/select", (req, res) => {
  mdbConn
    .getCompanyList()
    .then((rows) => {
      //   console.log(rows);
      res.send(rows);
    })
    .catch((errMsg) => {
      //   console.log(errMsg);
      res.send(err);
    });
});

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

app.set("port", process.env.PORT || 3002);
app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
