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
app.use(bodyParser.json()); // body-parser 모듈을 사용해서 파싱
app.use(express.json());
var cors = require("cors");
app.use(cors());

app.use(express.static(__dirname + "/"));

// ejs
app.set("view engine", "ejs");
app.set("views", __dirname + "/");

// 메인페이지
app.get("/", (req, res) => {
  // 요청 패스에 대한 콜백 함수를 넣어줌
  res.sendFile(__dirname + "/views/html/main.html");
});

// 로그인페이지
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/html/user/login.html");
});

// 회사 등록 페이지
app.get("/register_com.html", (req, res) => {
  res.sendFile(__dirname + "/views/html/user/register_com.html");
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

// DB에 받아온 값 Insert
// 창고 관리 페이지
app.get("/warehouse", (req, res) => {
  // console.log(req.query.num);
  mdbConn
    .getWarehouseList()
    .then((rows) => {
      // console.log(rows);
      res.render(
        "views/html/warehouse/warehouse.ejs",
        {
          data: rows[0],
          shelf_data: rows[1],
        }
        // function (err, html) {
        //   if (err) {
        //     console.log(err);
        //   }
        //   // console.log(rows);
        //   res.end(html);
        // }
      );
    })
    .catch((errMsg) => {
      //   console.log(errMsg);
      err;
    });
});

let cate = "";
let word = "";
// 선반 생성 기능

app.get("/shelf", (req, res) => {
  res.render("views/html/warehouse/shelf.ejs");
});

// 선반 관리 페이지
app.post("/shelf", (req, res) => {
  const val = Number(req.body.num);
  // console.log(val);
  async function getShelfList() {
    let conn, rows;
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(`SELECT * FROM tbl_shelf WHERE wh_num = ${val}`);
    return rows;
  }
  getShelfList()
    .then((rows) => {
      res.render(
        "views/html/warehouse/shelf.ejs",
        {
          data: rows,
        },
        function (err, html) {
          if (err) {
            console.log(err);
          }
          // console.log(rows);
          res.end(html);
        }
      );
    })
    .catch((errMsg) => {
      console.log(errMsg);
    });
});

// 선반 관리 페이지 -> 선반 생성 페이지
app.post("/createShelf", (req, res) => {
  const val = Number(req.body.num);
  // console.log(val);
  async function getWarehouseForShelf() {
    let conn, rows;
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(
      `SELECT w.wh_num, w.com_num, w.wh_name, w.wh_width, w.wh_length, w.wh_min_temp, w.wh_max_temp, w.wh_min_humid, w.wh_max_humid, w.wh_info,s.shelf_num, s.shelf_name, s.shelf_x,s.shelf_z,s.shelf_width,s.shelf_length,s.shelf_floor,s.shelf_rotation_yn FROM tbl_warehouse w LEFT JOIN tbl_shelf s  ON w.wh_num = s.wh_num WHERE w.wh_num =${val}`
    );
    return rows;
  }
  getWarehouseForShelf()
    .then((rows) => {
      res.render(
        "views/render/create_shelf.ejs",
        {
          data: rows,
        },
        function (err, html) {
          if (err) {
            console.log(err);
          }
          // console.log(rows);
          res.end(html);
        }
      );
    })
    .catch((errMsg) => {
      console.log(errMsg);
    });
});

// 선반 생성 기능

app.post("/saveShelf", (req, res) => {
  async function InsertShelfData() {
    let conn, rows;
    let sql =
      "INSERT INTO tbl_shelf(wh_num,shelf_name,shelf_x,shelf_z,shelf_width,shelf_length,shelf_floor,shelf_rotation_yn) VALUES(?,?,?,?,?,?,?,?)";
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(sql, [
      req.body.num,
      req.body.name,
      req.body.x,
      req.body.z,
      req.body.width,
      req.body.length,
      req.body.floor,
      req.body.rotation,
    ]);
  }
  InsertShelfData();
});

// 선반 생성 기능

// 창고 생성 페이지
app.post("/three/sj_test/create_warehouse.html", (req, res) => {
  async function InsertWarehouseData() {
    let conn, rows;
    let sql =
      "INSERT INTO tbl_warehouse(com_num,wh_name,wh_width,wh_length) VALUES(?,?,?,?)";
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(sql, [
      req.body.com_num,
      req.body.name,
      req.body.width,
      req.body.length,
    ]);
  }
  InsertWarehouseData();
});

// 선반 생성 기능

let rowsResult;

app.post("/warehouse", (req, res) => {
  // console.log(req.body.cate);
  // console.log(req.body.word);
  cate = req.body.cate;
  word = req.body.word;
  async function GetSearchData() {
    let conn, rows;
    try {
      conn = await pool.getConnection();
      conn.query("USE wms");
      rows = await conn.query(
        `select * from tbl_warehouse where ${cate} like '%${word}%'`
      );
    } catch (err) {
      throw err;
    } finally {
      // console.log(rows);
      if (conn) conn.end();
      return rows;
    }
  }

  GetSearchData()
    .then((rows) => {
      rowsResult = rows;
      console.log(rowsResult);
      res.render(
        "views/html/warehouse/warehouse.ejs",
        {
          data: rows[0],
        },
        function (err, html) {
          if (err) {
            console.log("err: ", err);
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

app.get("/warehouse/search", (req, res) => {
  res.render(
    "views/html/warehouse/warehouse_search.ejs",
    { data: rowsResult },
    function (err, html) {
      if (err) {
        console.log(err);
      }
      // console.log(rows);
      res.end(html);
    }
  );
});

app.post("/outputForm", (req, res) => {
  // console.log(req.body.pw);
  // console.log(req.body);
  // insert로 데이터 넣기
  async function InsertCompanyData() {
    let conn, rows;
    let sql = "insert into tbl_company values(null,?,?,?,?,?)";
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(sql, [
      req.body.pw,
      req.body.name,
      req.body.bsn,
      req.body.tel,
      req.body.addr,
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
            console.log(err);
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
