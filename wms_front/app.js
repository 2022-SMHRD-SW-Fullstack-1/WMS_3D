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
  multipleStatements: true,
});

// HTML에서 서버에 데이터를 요청하기 위한 라이브러리 : body-parser
// HTML 요청 데이터를 해석하는 역할
const bodyParser = require("body-parser");
const { InsertCompanyData } = require("./mariaDBConn");

const app = express();

app.use(express.json());
var cors = require("cors");
app.use(cors());

const server = require("http").createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/"));

// ejs
app.set("view engine", "ejs");
app.set("views", __dirname + "/");

// 입고 페이지
app.get("/input", (req, res) => {
  mdbConn
    .getInputList()
    .then((rows) => {
      res.render(
        "views/html/stock/input.ejs",
        {
          data: rows,
        },
        function (err, html) {
          if (err) {
            console.log(err);
          }
          res.end(html);
        }
      );
    })
    .catch((errMsg) => {
      err;
    });
});

// 출고 페이지
app.get("/output", (req, res) => {
  mdbConn
    .getOutputList()
    .then((rows) => {
      res.render(
        "views/html/stock/output.ejs",
        {
          data: rows,
        },
        function (err, html) {
          if (err) {
            console.log(err);
          }
          res.end(html);
        }
      );
    })
    .catch((errMsg) => {
      err;
    });
});

// 입/출고 내역 페이지
app.get("/inoutput_history", (req, res) => {
  mdbConn
    .getInOutput_HistoryList()
    .then((rows) => {
      res.render(
        "views/html/stock/inoutput_history.ejs",
        {
          data: rows,
        },
        function (err, html) {
          if (err) {
            console.log(err);
          }
          res.end(html);
        }
      );
    })
    .catch((errMsg) => {
      err;
    });
});

// 재고 페이지
app.get("/stock", (req, res) => {
  mdbConn
    .getStockList()
    .then((rows) => {
      res.render(
        "views/html/stock/stock.ejs",
        {
          data: rows,
        },
        function (err, html) {
          if (err) {
            console.log(err);
          }
          res.end(html);
        }
      );
    })
    .catch((errMsg) => {
      err;
    });
});

// 작업내역 페이지
app.get("/work_history", (req, res) => {
  mdbConn
    .getWork_HistoryList()
    .then((rows) => {
      res.render(
        "views/html/workmanagement/work_history.ejs",
        {
          data: rows,
        },
        function (err, html) {
          if (err) {
            console.log(err);
          }
          res.end(html);
        }
      );
    })
    .catch((errMsg) => {
      err;
    });
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
    rows = await conn.query(`select w.wh_num,w.wh_name,s.shelf_name,
s.shelf_num, s.shelf_width,s.shelf_length,s.shelf_floor,floor(s.shelf_width*s.shelf_length*s.shelf_floor) max_avl, floor((s.shelf_width*s.shelf_length*s.shelf_floor) - count(st.stock_num)) now_avl 
From
tbl_shelf s
left join
tbl_warehouse w
on
w.wh_num=s.wh_num
left join
tbl_stock st
on
s.shelf_num = st.shelf_num
where s.wh_num = ${val}
group by s.shelf_num
`);
    conn.end();
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

// 창고페이지 -> 3d 창고 페이지
app.post("/viewWarehouse", (req, res) => {
  const val = Number(req.body.num);
  console.log(val);
  async function getWarehouseView() {
    let conn, rows;
    conn = await pool.getConnection();
    conn.query("USE wms");

    rows = await conn.query(
      `SELECT w.wh_num,w.wh_name, w.wh_width, w.wh_length ,w.wh_min_temp ,w.wh_max_temp,w.wh_min_humid,w.wh_max_humid,w.wh_info,s.shelf_num,s.shelf_name,s.shelf_x,s.shelf_z,s.shelf_width,s.shelf_length,s.shelf_floor,s.shelf_rotation_yn FROM tbl_warehouse w LEFT JOIN tbl_shelf s ON w.wh_num = s.wh_num WHERE w.wh_num = ${val} ; SELECT s.wh_num, s.shelf_num, s.shelf_name, s.shelf_x, s.shelf_z, s.shelf_width, s.shelf_length, s.shelf_floor, s.shelf_rotation_yn, st.stock_num, st.stock_name, st.stock_info,st.buy_com, DATE_FORMAT(st.wlb_input_date, "%y년%m월%d일") wlb_input_date, DATE_FORMAT(st.input_date, "%y년%m월%d일") input_date,st.stock_floor,st.stock_position,DATE_FORMAT(st.exp_dt, "%y년%m월%d일") exp_dt FROM tbl_shelf s LEFT JOIN tbl_stock st ON s.shelf_num = st.shelf_num WHERE st.shelf_num in (SELECT shelf_num FROM tbl_shelf WHERE wh_num = ${val}) AND st.output_date IS null`
    );

    conn.end();
    return rows;
  }
  getWarehouseView()
    .then((rows) => {
      res.render(
        "views/render/view_warehouse.ejs",
        {
          shelf_data: rows[0],
          stock_data: rows[1],
        },
        function (err, html) {
          if (err) {
            console.log(err);
          }
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
    conn.end();
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
    conn.end();
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
    conn.end();
  }
  InsertWarehouseData();
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

// 3D 창고 페이지
app.get("/three/sj/warehouse_3d.html", (req, res) => {
  res.sendFile(__dirname + "/three/sj/warehouse_3d.html");
});

// 메인페이지
app.get("/main", (req, res) => {
  // 요청 패스에 대한 콜백 함수를 넣어줌
  res.render("views/html/main.ejs");
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
    conn.end();
  }
  InsertCompanyData();
});

//입고 insert 페이지
app.post("/inputForm", (req, res) => {
  // console.log(req.form);
  async function InsertInput() {
    let conn, rows;
    let sql = "insert into tbl_stock values(?,?,?,?,?,?)";
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(sql, [
      req.body.stock_num,
      req.body.stock_name,
      req.body.stock_info,
      req.body.buy_com,
      req.body.wlb_input_date,
      req.body.worker_name,
    ]);
    conn.end();
  }
  InsertInput();
});
// 입고 페이지
// 일단 데이터값 보내기 실험 페이지로 쓰는중
// app.get("/input", (req, res) => {
//   mdbConn
//     .getCompanyList()
//     .then((rows) => {
// console.log(rows);
// res.render(
//   "views/html/stock/input.ejs",
//   {
//     data: rows,
//   },
//   function (err, html) {
//     if (err) {
// console.log(err);
// }
// console.log(rows);
//       res.end(html);
//     }
//   );
// })
// .catch((errMsg) => {
//   console.log(errMsg);
//       err;
//     });
// });

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
