const mdbConn = require("./mariaDBConn.js");
const express = require("express");
const router = express.Router();
const path = require("path");
const cors = require("cors");

const app = express();

const server = require("http").createServer(app);

app.use(cors()); // cors 미들웨어를 삽입

app.get("/", (req, res) => {
  // 요청 패스에 대한 콜백 함수를 넣어줌
  res.send({ message: "hello" });
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

app.set("port", process.env.PORT || 3001);
app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
