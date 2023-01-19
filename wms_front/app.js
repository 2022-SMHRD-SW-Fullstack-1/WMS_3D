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

app.use(express.json());
var cors = require("cors");
app.use(cors());

const server = require("http").createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/"));

// ejs
app.set("view engine", "ejs");
app.set("views", __dirname + "/");


// 출고 페이지
app.get("/output", (req, res) => {
  res.render("views/html/stock/output.ejs");
});


//입고 내역 페이지
app.get("/input_history", (req, res) => {
  res.render("views/html/stock/input_history.ejs");
});

//출고 내역 페이지
app.get("/output_history", (req, res) => {
  res.render("views/html/stock/output_history.ejs");
});




// 재고 페이지
app.get("/stock", (req, res) => {
  res.render("views/html/stock/stock.ejs");
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


app.get('/shelf', (req, res) => {
  res.render("views/html/warehouse/shelf.ejs")
})

// 선반 관리 페이지
app.post("/shelf", (req, res) => {
  const val = Number(req.body.num)
  // console.log(val);
  async function getShelfList(){
    let conn, rows;
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(`SELECT * FROM tbl_shelf WHERE wh_num = ${val}`);
    return rows
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
  })

// 선반 관리 페이지 -> 선반 생성 페이지
app.post("/createShelf", (req, res) => {
  const val = Number(req.body.num)
  // console.log(val);
  async function getShelfList(){
    let conn, rows;
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(`SELECT * FROM tbl_warehouse WHERE wh_num = ${val}`);
    return rows
  }
    // getShelfList()
    // .then((rows) => {
    //   res.render(
    //     "views/html/warehouse/shelf.ejs",
    //     {
    //       data: rows,
    //     },
    //     function (err, html) {
    //       if (err) {
    //         console.log(err);
    //       }
    //       // console.log(rows);
    //       res.end(html);
    //     }
    //     );
    // })
    // .catch((errMsg) => {
    //   console.log(errMsg);
    // });
  })


  

// 창고 생성 페이지
app.post("/three/sj_test/create_warehouse.html", (req, res) => {
  async function InsertWarehouseData(){
    let conn, rows;
    let sql = "INSERT INTO tbl_warehouse(com_num,wh_name,wh_width,wh_length) VALUES(?,?,?,?)"
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(sql, [
      req.body.com_num,
      req.body.name,
      req.body.width,
      req.body.length
    ]);
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
          shelf_data : rows[1]
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
