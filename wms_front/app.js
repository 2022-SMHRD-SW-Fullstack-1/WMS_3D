const mdbConn = require("./mariaDBConn");
const express = require("express");
const router = express.Router();
const vals = require("./const");
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: vals.DBHost,
  port: vals.DBPort,
  user: vals.DBUser,
  password: vals.DBPass,
  connectionLimit: 10,
});

// HTML에서 서버에 데이터를 요청하기 위한 라이브러리 : body-parser
// HTML 요청 데이터를 해석하는 역할
const bodyParser = require("body-parser");
const { InsertCompanyData } = require("./mariaDBConn");

const app = express();

const server = require("http").createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/"));

// ejs
app.set("view engine", "ejs");
app.set("views", __dirname + "/");

// 메인페이지
app.get("/", (req, res) => {
  // 요청 패스에 대한 콜백 함수를 넣어줌
  res.sendFile(__dirname + "/views/html/main.html");
});

// 로그인페이지  연결
app.get("/login", (req, res) => {
  res.render("views/html/user/login.ejs");
});

//로그인 데이터 값 넣기
app.post("/login", (req, res) => {
  //console.log(req.body.pw);
  // console.log(req.body);
  // insert로 데이터 넣기
  async function InsertuserData() {
    let conn, rows;
    let sql = "insert into tbl_user values(?,?,?,?)";
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(sql, [
      req.body.id,
      req.body.pw,
      req.body.num,
      req.body.joindate,
    ]);
  }
  InsertuserData();
});

// 회사 등록 페이지
app.get("/register_com", (req, res) => {
  res.render("views/html/user/register_com.ejs");
});

// 유저 등록 페이지
app.get("/register_user.html", (req, res) => {
  res.sendFile(__dirname + "/views/html/user/register_user.html");
});

// 3D 창고 페이지
app.get("/three/sj/warehouse_3d.html", (req, res) => {
  res.sendFile(__dirname + "/three/sj/warehouse_3d.html");
});

app.get("/output", (req, res) => {
  res.sendFile(__dirname + "/views/html/stock/output.html");
});

// 창고 관리 페이지
app.get("/warehouse", (req, res) => {
  mdbConn
    .getWarehouseList()
    .then((rows) => {
      res.render(
        "views/html/warehouse/warehouse.ejs",
        {
          data: rows[0],
          shelf_data: rows[1],
        },
        function (err, html) {
          if (err) {
            console.log(err);
          }
          console.log(rows);
          res.end(html);
        }
      );
    })
    .catch((errMsg) => {
      //   console.log(errMsg);
      err;
    });
});

app.post("/outputForm", (req, res) => {
  //console.log(req.body.pw);
  // console.log(req.body);
  // insert로 데이터 넣기
  async function InsertCompanyData() {
    let conn, rows;
    let sql = "insert into tbl_company values(?,?,?,?)";
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(sql, [
      req.body.id,
      req.body.pw,
      req.body.num,
      req.body.joindate,
    ]);
  }
  InsertCompanyData();
});

// 입고 페이지
// 일단 데이터값 보내기 실험 페이지로 쓰는중
app.get("/input", (req, res) => {
  mdbConn
    .getCompanyList()
    .then((rows) => {
      // console.log(rows);
      res.render(
        "views/html/stock/input.ejs",
        {
          data: rows,
        },
        function (err, html) {
          if (err) {
            // console.log(err);
          }
          // console.log(rows);
          res.end(html);
        }
      );
    })
    .catch((errMsg) => {
      //   console.log(errMsg);
      err;
    });
});

// mariaDB connect
// app.get("/select", (req, res) => {
//   mdbConn
//     .getCompanyList()
//     .then((rows) => {
//       console.log(rows);
//       res.send(rows);
//     })
//     .catch((errMsg) => {
//       //   console.log(errMsg);
//       res.send(err);
//     });
// });

app.set("port", process.env.PORT || 3002);
app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
