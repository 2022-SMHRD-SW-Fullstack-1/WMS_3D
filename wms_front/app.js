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

///////////// 로그인 db에서 확인하기
app.post("/login", function (request, response) {
  // console.log(request.body);
  var com_num = request.body.com_num;
  var user_id = request.body.id;
  var user_pw = request.body.pw;
  if (com_num && user_id && user_pw) {
    async function getlogin() {
      let conn, rows;
      conn = await pool.getConnection();
      conn.query("USE wms");
      rows = await conn.query(
        "SELECT * FROM tbl_user WHERE com_num=? AND  user_id = ? AND user_pw = ?",
        [com_num, user_id, user_pw],
        function (error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            request.session.loggedin = true;
            request.session.com_num = com_num;
            response.redirect("/");
            response.end();
          } else {
            response.send(
              '<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>'
            );
            conn.end();
            return rows;
          }
        }
      );
    }
    getlogin();
  } else {
    response.send(
      '<script type="text/javascript">alert("username과 password를 입력하세요!"); document.location.href="/login";</script>'
    );
    response.end();
  }
});

// 회사 등록 페이지
app.get("/register_com", (req, res) => {
  res.render("views/html/user/register_com.ejs");
});

//회사 등록 데이터 값 넣기
app.post("/register_com", (req, res) => {
  //console.log(req.body.pw);
  console.log(req.body);
  // insert로 데이터 넣기
  async function InsertcomData() {
    let conn, rows;
    let sql =
      "insert into tbl_company(com_num, com_pw, com_name) values(?,?,?)";
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(sql, [
      req.body.com_num,
      req.body.com_pw,
      req.body.com_name,
    ]);
  }
  InsertcomData();
});

// 유저 등록 페이지
app.get("/register_user", (req, res) => {
  res.render("views/html/user/register_user.ejs");
});

// 유저 데이터 값 넣기
app.post("/register_user", (req, res) => {
  //console.log(req.body.pw);
  console.log(req.body);
  // insert로 데이터 넣기
  async function InsertuserData() {
    let conn, rows;
    let sql = "insert into tbl_user(user_id,user_pw,com_num) values(?,?,?)";
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(sql, [req.body.id, req.body.pw, req.body.com_num]);
  }
  InsertuserData();
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
