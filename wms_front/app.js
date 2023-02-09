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
  multipleStatements: true, // 여러 쿼리를 ';'를 기준으로 한번에 보낼 수 있게한다.
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
app.get("/main", (req, res) => {
  // 요청 패스에 대한 콜백 함수를 넣어줌
  res.render("views/html/main.ejs");
});

// 로그인페이지  연결
app.get("/login", (req, res) => {
  res.render("views/html/user/login.ejs");
});

///////////// 로그인 db에서 확인하기
app.post("/login", function (request, response) {
  var com_num = request.body.com_num;
  var user_id = request.body.id;
  var user_pw = request.body.pw;
  console.log(request.body);
  if (com_num && user_id && user_pw) {
    async function getlogin() {
      let conn, rows;
      let sql =
        "SELECT * FROM tbl_user WHERE com_num=? AND  user_id = ? AND user_pw = ?";
      conn = await pool.getConnection();
      conn.query("USE wms");
      rows = await conn.query(sql, [com_num, user_id, user_pw]);
      if (rows.length > 0) {
        response.send(
          '<script type="text/javascript">alert("로그인에 성공하였습니다!"); document.location.href="/main";</script>'
        );
        response.end();
      } else {
        response.send(
          '<script type="text/javascript">alert("로그인에 실패하셨습니다."); document.location.href="/login";</script>'
        );
        response.end();
      }
      console.log(rows);
      conn.end();
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
  console.log(req.query.num);
  res.render("views/html/user/register_com.ejs");
});

//회사 등록 데이터 값 넣기
app.post("/register_com", (req, res) => {
  console.log(req.body);
  async function InsertcomData() {
    let conn, rows;
    let sql =
      "insert into tbl_company(com_num, com_pw, com_name) values(?,?,?)";
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(sql, [
      req.body.username,
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

// 출고 페이지
app.get("/output", (req, res) => {
  console.log(req.query);
  async function getOutputList() {
    let conn, rows, sql;
    try {
      conn = await pool.getConnection();
      conn.query("USE wms");
      if (req.query.num != null && req.query.bool == "true") {
        sql = `SELECT st.stock_num,st.stock_name,st.stock_info,st.sell_com,date_FORMAT(st.output_date,'%y년 %m월 %d일 %H시 %i분') output_date,wkr.worker_name FROM tbl_stock st left join tbl_worker wkr on st.com_num = wkr.com_num where st.com_num=1123456789 AND st.sell_com is not null AND st.output_date is not null GROUP BY st.stock_num  order by ${req.query.num} DESC`;
      } else if (req.query.num != null && req.query.bool == "false") {
        sql = `SELECT st.stock_num,st.stock_name,st.stock_info,st.sell_com,date_FORMAT(st.output_date,'%y년 %m월 %d일 %H시 %i분') output_date,wkr.worker_name FROM tbl_stock st left join tbl_worker wkr on st.com_num = wkr.com_num where st.com_num=1123456789 AND st.sell_com is not null AND st.output_date is not null GROUP BY st.stock_num  order by ${req.query.num} ASC`;
      } else {
        sql =
          "SELECT st.stock_num,st.stock_name,st.stock_info,st.sell_com,date_FORMAT(st.output_date,'%y년 %m월 %d일 %H시 %i분') output_date,wkr.worker_name FROM tbl_stock st left join tbl_worker wkr on st.com_num = wkr.com_num where st.com_num=1123456789 AND st.sell_com is not null AND st.output_date is not null GROUP BY st.stock_num ";
      }
      rows = await conn.query(sql);
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
      return rows;
    }
  }
  getOutputList()
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

let cate_output = "";
let word_output = "";
app.post("/output", (req, res) => {
  cate_output = req.body.cate;
  word_output = req.body.word;
});

app.get("/output/search", (req, res) => {
  async function getOutputList() {
    let conn, rows, sql;
    try {
      conn = await pool.getConnection();
      conn.query("USE wms");
      sql = `SELECT st.stock_num,st.stock_name,st.stock_info,st.sell_com,date_FORMAT(st.output_date,'%y년 %m월 %d일 %H시 %i분') output_date,wkr.worker_name FROM tbl_stock st left join tbl_worker wkr on st.com_num = wkr.com_num where st.com_num=1123456789 AND st.sell_com is not null AND st.output_date is not null AND ${cate_output} like '%${word_output}%'`;
      rows = await conn.query(sql);
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
      return rows;
    }
  }
  getOutputList()
    .then((rows) => {
      res.render(
        "views/html/stock/output_search.ejs",
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

// DB에 받아온 값 Insert
// 창고 관리 페이지
app.get("/warehouse", (req, res) => {
  console.log(req.query.num);
  console.log(req.query.bool);

  async function getWarehouseList() {
    let conn, rows, sql;
    try {
      conn = await pool.getConnection();
      conn.query("USE wms");
      if (req.query.num != null && req.query.bool == "true") {
        sql = `SELECT w.wh_num,w.com_num,w.wh_name,w.wh_width,w.wh_length,w.wh_min_temp,w.wh_max_temp,w.wh_min_humid,w.wh_max_humid,w.wh_info ,floor(sum(IFNULL((s.shelf_width * s.shelf_length * s.shelf_floor),0))) wh_max_avl,(floor(sum(IFNULL((s.shelf_width * s.shelf_length * s.shelf_floor),0)))-(SELECT COUNT(st.stock_num) stock_count FROM tbl_shelf s LEFT JOIN tbl_stock st ON s.shelf_num = st.shelf_num WHERE s.wh_num = w.wh_num AND st.output_date IS null)) wh_now_avl from tbl_warehouse w left JOIN tbl_shelf s ON w.wh_num = s.wh_num GROUP BY wh_num  order by ${req.query.num} desc;SELECT s.wh_num, s.shelf_name,s.shelf_width,s.shelf_length,s.shelf_floor,FLOOR(s.shelf_width * s.shelf_length * s.shelf_floor) shelf_avl, count(st.stock_num) shelf_used FROM tbl_shelf s LEFT JOIN tbl_stock st ON s.shelf_num = st.shelf_num  WHERE st.output_date IS null GROUP BY s.shelf_num ORDER BY shelf_used desc`;
      } else if (req.query.num != null && req.query.bool == "false") {
        sql = `SELECT w.wh_num,w.com_num,w.wh_name,w.wh_width,w.wh_length,w.wh_min_temp,w.wh_max_temp,w.wh_min_humid,w.wh_max_humid,w.wh_info ,floor(sum(IFNULL((s.shelf_width * s.shelf_length * s.shelf_floor),0))) wh_max_avl,(floor(sum(IFNULL((s.shelf_width * s.shelf_length * s.shelf_floor),0)))-(SELECT COUNT(st.stock_num) stock_count FROM tbl_shelf s LEFT JOIN tbl_stock st ON s.shelf_num = st.shelf_num WHERE s.wh_num = w.wh_num AND st.output_date IS null)) wh_now_avl from tbl_warehouse w left JOIN tbl_shelf s ON w.wh_num = s.wh_num GROUP BY wh_num  order by ${req.query.num} ASC;SELECT s.wh_num, s.shelf_name,s.shelf_width,s.shelf_length,s.shelf_floor,FLOOR(s.shelf_width * s.shelf_length * s.shelf_floor) shelf_avl, count(st.stock_num) shelf_used FROM tbl_shelf s LEFT JOIN tbl_stock st ON s.shelf_num = st.shelf_num  WHERE st.output_date IS null GROUP BY s.shelf_num ORDER BY shelf_used desc`;
      } else {
        sql =
          "SELECT w.wh_num,w.com_num,w.wh_name,w.wh_width,w.wh_length,w.wh_min_temp,w.wh_max_temp,w.wh_min_humid,w.wh_max_humid,w.wh_info ,floor(sum(IFNULL((s.shelf_width * s.shelf_length * s.shelf_floor),0))) wh_max_avl,(floor(sum(IFNULL((s.shelf_width * s.shelf_length * s.shelf_floor),0)))-(SELECT COUNT(st.stock_num) stock_count FROM tbl_shelf s LEFT JOIN tbl_stock st ON s.shelf_num = st.shelf_num WHERE s.wh_num = w.wh_num AND st.output_date IS null)) wh_now_avl from tbl_warehouse w left JOIN tbl_shelf s ON w.wh_num = s.wh_num GROUP BY wh_num;SELECT s.wh_num, s.shelf_name,s.shelf_width,s.shelf_length,s.shelf_floor,FLOOR(s.shelf_width * s.shelf_length * s.shelf_floor) shelf_avl, count(st.stock_num) shelf_used FROM tbl_shelf s LEFT JOIN tbl_stock st ON s.shelf_num = st.shelf_num  WHERE st.output_date IS null GROUP BY s.shelf_num ORDER BY shelf_used desc";
      }
      rows = await conn.query(sql);
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.close();
      return rows;
    }
  }

  getWarehouseList()
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

// 재고 이동 기능
app.post("/moveStockInfo", (req, res) => {
  async function UpdateStockData() {
    let conn, rows;
    let sql =
      "UPDATE tbl_stock st SET st.shelf_num = ? , st.stock_floor = ?, st.stock_position=? WHERE st.stock_num = ?";
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(sql, [
      req.body.shelf_num,
      req.body.st_floor,
      req.body.st_position,
      req.body.st_num,
    ]);
    conn.end();
  }
  UpdateStockData();
});

app.post("/warehouse", (req, res) => {
  // console.log(req.body.cate);
  // console.log(req.body.word);
  cate = req.body.cate;
  word = req.body.word;
});

app.get("/warehouse/search", (req, res) => {
  async function GetSearchData() {
    let conn, rows;
    try {
      conn = await pool.getConnection();
      conn.query("USE wms");
      rows = await conn.query(
        `SELECT w.wh_num,w.com_num,w.wh_name,w.wh_width,w.wh_length,w.wh_min_temp,w.wh_max_temp,w.wh_min_humid,w.wh_max_humid,w.wh_info ,floor(sum(IFNULL((s.shelf_width * s.shelf_length * s.shelf_floor),0))) wh_max_avl,(floor(sum(IFNULL((s.shelf_width * s.shelf_length * s.shelf_floor),0))) - count(st.stock_name)) wh_now_avl from tbl_warehouse w left JOIN tbl_shelf s ON w.wh_num = s.wh_num LEFT join tbl_stock st ON s.shelf_num = st.shelf_num where ${cate} like '%${word}%' GROUP BY wh_num;SELECT s.wh_num, s.shelf_name,s.shelf_width,s.shelf_length,s.shelf_floor,FLOOR(s.shelf_width * s.shelf_length * s.shelf_floor) shelf_avl, count(st.stock_num) FROM tbl_shelf s LEFT JOIN tbl_stock st ON s.shelf_num = st.shelf_num GROUP BY shelf_name`
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
      res.render(
        "views/html/warehouse/warehouse_search.ejs",
        {
          data: rows[0],
          shelf_data: rows[1],
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
    rows = await conn.query(
      `select w.wh_num,w.wh_name,s.shelf_name, s.shelf_num, s.shelf_width,s.shelf_length,s.shelf_floor,floor(s.shelf_width*s.shelf_length*s.shelf_floor) max_avl, floor((s.shelf_width*s.shelf_length*s.shelf_floor) - count(st.stock_num)) now_avl From tbl_shelf s left join tbl_warehouse w on w.wh_num=s.wh_num left join tbl_stock st on s.shelf_num = st.shelf_num where s.wh_num = ${val} AND st.output_date IS NULL  group by s.shelf_num ;SELECT st.stock_num, st.com_num, st.shelf_num, st.stock_name, st.stock_info, st.buy_com, st.sell_com, st.wlb_input_date , DATE_FORMAT(st.input_date, "%y년%m월%d일") input_date, st.stock_floor, st.stock_position, DATE_FORMAT(st.exp_dt, "%y년%m월%d일") exp_dt FROM tbl_stock st LEFT JOIN tbl_shelf s ON st.shelf_num = s.shelf_num WHERE s.wh_num = ${val} AND st.output_date IS NULL`
    );
    conn.end();
    return rows;
  }
  getShelfList()
    .then((rows) => {
      res.render(
        "views/html/warehouse/shelf.ejs",
        {
          data: rows[0],
          stock_data: rows[1],
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

// 창고페이지 -> 3d 창고 페이지
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

// 3D 창고 페이지
app.get("/three/sj/warehouse_3d.html", (req, res) => {
  res.sendFile(__dirname + "three/sj/warehouse_3d.html");
});

// 입고 페이지//
app.get("/input", (req, res) => {
  async function getInputList() {
    let conn, rows, sql;
    try {
      conn = await pool.getConnection();
      conn.query("USE wms");
      if (req.query.num && req.query.bool == "true") {
        sql = `SELECT st.stock_num,st.stock_name,st.stock_info,st.buy_com,date_FORMAT(st.wlb_input_date,'%y년 %m월 %d일 %H시 %i분') wlb_input_date, date_FORMAT(st.input_date,'%y년 %m월 %d일 %H시 %i분') input_date FROM tbl_stock st where st.com_num=1123456789 ORDER BY ${req.query.num} DESC;`;
      } else if (req.query.num && req.query.bool == "false") {
        sql = `SELECT st.stock_num,st.stock_name,st.stock_info,st.buy_com,date_FORMAT(st.wlb_input_date,'%y년 %m월 %d일 %H시 %i분') wlb_input_date, date_FORMAT(st.input_date,'%y년 %m월 %d일 %H시 %i분') input_date FROM tbl_stock st where st.com_num=1123456789 ORDER BY ${req.query.num} asc;`;
      } else {
        sql =
          "SELECT st.stock_num,st.stock_name,st.stock_info,st.buy_com,date_FORMAT(st.wlb_input_date,'%y년 %m월 %d일 %H시 %i분') wlb_input_date, date_FORMAT(st.input_date,'%y년 %m월 %d일 %H시 %i분') input_date FROM tbl_stock st where st.com_num=1123456789 order by stock_num desc;";
      }
      rows = await conn.query(sql);
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
      return rows;
    }
  }
  getInputList()
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

// 출고 기능
app.post("/stockOutput", (req, res) => {
  console.log(req.body);

  for (let i = 1; i < req.body.num.length; i++) {
    console.log(req.body.worker[i]);
    async function StockOutputData() {
      let conn, rows;
      let sql =
        "UPDATE tbl_stock st SET st.output_date = NOW() , st.sell_com = ? WHERE st.stock_num = ?";
      conn = await pool.getConnection();
      conn.query("USE wms");
      rows = await conn.query(sql, [
        req.body.worker[i],
        Number(req.body.num[i]),
      ]);

      conn.end();
    }
    StockOutputData();
  }

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

app.post("/inputStock", (req, res) => {
  let stock_name = req.body.stock_name;
  let stock_info = req.body.stock_info;
  let buy_com = req.body.buy_com;
  let wlb_input_date = new Date(req.body.wlb_input_date);
  const com_num = 1123456789;

  async function stockInput() {
    let conn;
    let sql =
      "INSERT INTO tbl_stock (stock_name, stock_info, buy_com, wlb_input_date, com_num) VALUES (?, ?, ?, ?, ?)";
    conn = await pool.getConnection();
    conn.query("USE wms");
    await conn.query(sql, [
      stock_name,
      stock_info,
      buy_com,
      wlb_input_date,
      com_num,
    ]);
    conn.release();
  }

  stockInput();
  res.redirect("/input");
});

//입고 완료버튼

app.post("/put", (req, res) => {
  console.log(req.body);

  for (let i = 1; i < req.body.num.length; i++) {
    console.log(req.body.worker[i]);
    async function StockOutputData() {
      let conn, rows;
      let sql =
        "UPDATE tbl_stock st SET st.output_date = NOW() , st.sell_com = ? WHERE st.stock_num = ?";
      conn = await pool.getConnection();
      conn.query("USE wms");
      rows = await conn.query(sql, [
        req.body.worker[i],
        Number(req.body.num[i]),
      ]);
      conn.end();
    }
    StockOutputData();
  }
});

app.post("/input", (req, res) => {
  console.log(req.body);
  let conn, rows;
  // console.log(req.body.stock_name[i]);
  async function InsertInput() {
    for (var i = 0; i < req.body.stock_name.length; i++) {
      if (req.body.exp_dt[i] != "undefined") {
        if (req.body.input_date[i] != "undefined") {
          sql = `INSERT INTO tbl_stock(com_num, stock_name, stock_info, buy_com, wlb_input_date, input_date, shelf_num, stock_floor, stock_position, exp_dt) VALUES(1123456789,"${req.body.stock_name[i]}","${req.body.stock_info[i]}","${req.body.buy_com[i]}","${req.body.wlb_input_date[i]}", "${req.body.input_date[i]}", ${req.body.shelf_num[i]}, ${req.body.stock_floor[i]}, "${req.body.stock_position[i]}", "${req.body.exp_dt[i]}")`;
        } else {
          sql = `INSERT INTO tbl_stock(com_num, stock_name, stock_info, buy_com, wlb_input_date, exp_dt) VALUES(1123456789,"${req.body.stock_name[i]}","${req.body.stock_info[i]}","${req.body.buy_com[i]}","${req.body.wlb_input_date[i]}", "${req.body.exp_dt[i]}")`;
        }
      } else {
        if (req.body.input_date[i] != "undefined") {
          sql = `INSERT INTO tbl_stock(com_num, stock_name, stock_info, buy_com, wlb_input_date, input_date, shelf_num, stock_floor, stock_position) VALUES(1123456789,"${req.body.stock_name[i]}","${req.body.stock_info[i]}","${req.body.buy_com[i]}","${req.body.wlb_input_date[i]}", "${req.body.input_date[i]}", ${req.body.shelf_num[i]}, ${req.body.stock_floor[i]}, "${req.body.stock_position[i]}")`;
        } else {
          sql = `INSERT INTO tbl_stock(com_num, stock_name, stock_info, buy_com, wlb_input_date) VALUES(1123456789,"${req.body.stock_name[i]}","${req.body.stock_info[i]}","${req.body.buy_com[i]}","${req.body.wlb_input_date[i]}")`;
        }
      }
      conn = await pool.getConnection();
      conn.query("USE wms");
      rows = await conn.query(sql);
      conn.end();
    }
  }
  InsertInput();
  res.redirect("/input");
});

let cate_input = "";
let word_input = "";
app.post("/input1", (req, res) => {
  console.log(req.body);
  cate_input = req.body.cate;
  word_input = req.body.word;
});

app.get("/input/search", (req, res) => {
  async function getInputList() {
    let conn, rows, sql;
    try {
      conn = await pool.getConnection();
      conn.query("USE wms");
      sql = `SELECT st.stock_num,st.stock_name,st.stock_info,st.buy_com,date_FORMAT(st.wlb_input_date,'%y년 %m월 %d일 %H시 %i분') wlb_input_date FROM tbl_stock st where st.com_num=1123456789 and ${cate_input} like '%${word_input}%'`;
      rows = await conn.query(sql);
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
      return rows;
    }
  }
  getInputList()
    .then((rows) => {
      res.render(
        "views/html/stock/input_search.ejs",
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
  async function GetInOutput_HistoryList() {
    let conn, rows, sql;
    try {
      conn = await pool.getConnection();
      conn.query("USE wms");
      if (req.query.num && req.query.bool == "true") {
        sql = `SELECT stock_num,stock_name,stock_info,date_FORMAT(input_date,'%y년 %m월 %d일 %H시 %i분') input_date,buy_com,IFNULL(date_FORMAT(output_date,'%y년 %m월 %d일 %H시 %i분'),'-')output_date,IFNULL(sell_com,'-') sell_com FROM tbl_stock WHERE input_date IS NOT NULL ORDER BY ${req.query.num} DESC;`;
      } else if (req.query.num && req.query.bool == "false") {
        sql = `SELECT stock_num,stock_name,stock_info,date_FORMAT(input_date,'%y년 %m월 %d일 %H시 %i분') input_date,buy_com,IFNULL(date_FORMAT(output_date,'%y년 %m월 %d일 %H시 %i분'),'-')output_date,IFNULL(sell_com,'-') sell_com FROM tbl_stock WHERE input_date IS NOT NULL ORDER BY ${req.query.num} ASC;`;
      } else {
        sql =
          "SELECT stock_num,stock_name,stock_info,date_FORMAT(input_date,'%y년 %m월 %d일 %H시 %i분') input_date,buy_com,IFNULL(date_FORMAT(output_date,'%y년 %m월 %d일 %H시 %i분'),'-')output_date,IFNULL(sell_com,'-') sell_com FROM tbl_stock WHERE input_date IS NOT NULL";
      }
      rows = await conn.query(sql);
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
      return rows;
    }
  }

  GetInOutput_HistoryList()
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

let cate_inoutput = "";
let word_inoutput = "";

app.post("/inoutput_history", (req, res) => {
  cate_inoutput = req.body.cate;
  word_inoutput = req.body.word;
});

app.get("/inoutput_history/search", (req, res) => {
  async function GetInOutput_HistoryList() {
    let conn, rows, sql;
    try {
      conn = await pool.getConnection();
      conn.query("USE wms");
      sql = `SELECT stock_num,stock_name,stock_info,date_FORMAT(input_date,'%y년 %m월 %d일 %H시 %i분') input_date,buy_com,IFNULL(date_FORMAT(output_date,'%y년 %m월 %d일 %H시 %i분'),'-')output_date,IFNULL(sell_com,'-') sell_com FROM tbl_stock where ${cate_inoutput} like '%${word_inoutput}%'`;
      rows = await conn.query(sql);
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
      return rows;
    }
  }

  GetInOutput_HistoryList()
    .then((rows) => {
      res.render(
        "views/html/stock/inoutput_history_search.ejs",
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
  async function GetStockList() {
    let conn, rows, sql;
    try {
      conn = await pool.getConnection();
      conn.query("USE wms");
      if (req.query.num && req.query.bool == "true") {
        sql = `SELECT st.stock_num, st.stock_name, st.stock_info, st.buy_com, wh.wh_name, date_FORMAT(st.exp_dt,'%y년 %m월 %d일') exp_dt, wh.wh_num FROM tbl_stock st LEFT JOIN tbl_shelf s ON st.shelf_num = s.shelf_num LEFT JOIN tbl_warehouse wh ON s.wh_num = wh.wh_num WHERE st.output_date IS NULL AND wh.wh_num IS NOT null GROUP BY st.stock_num ORDER BY ${req.query.num} desc`;
      } else if (req.query.num && req.query.bool == "false") {
        sql = `SELECT st.stock_num, st.stock_name, st.stock_info, st.buy_com, wh.wh_name, date_FORMAT(st.exp_dt,'%y년 %m월 %d일') exp_dt, wh.wh_num FROM tbl_stock st LEFT JOIN tbl_shelf s ON st.shelf_num = s.shelf_num LEFT JOIN tbl_warehouse wh ON s.wh_num = wh.wh_num WHERE st.output_date IS NULL AND wh.wh_num IS NOT null GROUP BY st.stock_num ORDER BY ${req.query.num} ASC`;
      } else {
        sql =
          "SELECT st.stock_num, st.stock_name, st.stock_info, st.buy_com, wh.wh_name, date_FORMAT(st.exp_dt,'%y년 %m월 %d일') exp_dt, wh.wh_num FROM tbl_stock st LEFT JOIN tbl_shelf s ON st.shelf_num = s.shelf_num LEFT JOIN tbl_warehouse wh ON s.wh_num = wh.wh_num WHERE st.output_date IS NULL AND wh.wh_num IS NOT null GROUP BY st.stock_num";
      }
      rows = await conn.query(sql);
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
      return rows;
    }
  }
  GetStockList()
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

let cate_stock = "";
let word_stock = "";

app.post("/stock", (req, res) => {
  cate_stock = req.body.cate;
  word_stock = req.body.word;
});

app.get("/stock/search", (req, res) => {
  async function GetStockList() {
    let conn, rows, sql;
    try {
      conn = await pool.getConnection();
      conn.query("USE wms");
      sql = `SELECT st.stock_num, st.stock_name, st.stock_info, st.buy_com, wh.wh_name, date_FORMAT(st.exp_dt,'%y년 %m월 %d일') exp_dt FROM tbl_stock st left join tbl_warehouse wh ON st.com_num = wh.com_num WHERE st.output_date IS NULL and ${cate_stock} like '%${word_stock}%' GROUP BY st.stock_num`;
      rows = await conn.query(sql);
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
      return rows;
    }
  }
  GetStockList()
    .then((rows) => {
      res.render(
        "views/html/stock/stock_search.ejs",
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

app.post("/stock", (req, res) => {
  console.log(req.body);
});

// 작업내역 페이지
app.get("/work_history", (req, res) => {
  async function GetWork_HistoryList() {
    let conn, rows, sql;
    try {
      conn = await pool.getConnection();
      conn.query("USE wms");
      if (req.query.num && req.query.bool == "true") {
        sql = `SELECT wk.work_name,wkr.worker_name,st.stock_num,st.stock_name,st.stock_info,wk.from_position,wk.to_position,date_FORMAT(wk.replace_date,'%y년 %m월 %d일%H:%i') replace_date FROM tbl_stock st left join tbl_work wk on st.stock_num = wk.stock_num left join tbl_worker wkr on wk.worker_num = wkr.worker_num where wk.work_name is not null AND wkr.worker_name is not NULL ORDER BY replace_date ,${req.query.num} desc;`;
      } else if (req.query.num && req.query.bool == "false") {
        sql = `SELECT wk.work_name,wkr.worker_name,st.stock_num,st.stock_name,st.stock_info,wk.from_position,wk.to_position,date_FORMAT(wk.replace_date,'%y년 %m월 %d일%H:%i') replace_date FROM tbl_stock st left join tbl_work wk on st.stock_num = wk.stock_num left join tbl_worker wkr on wk.worker_num = wkr.worker_num where wk.work_name is not null AND wkr.worker_name is not NULL ORDER BY replace_date ,${req.query.num} ASC;`;
      } else {
        sql =
          "SELECT wk.work_name,wkr.worker_name,st.stock_num,st.stock_name,st.stock_info,wk.from_position,wk.to_position,date_FORMAT(wk.replace_date,'%y년 %m월 %d일%H:%i') replace_date FROM tbl_stock st left join tbl_work wk on st.stock_num = wk.stock_num left join tbl_worker wkr on wk.worker_num = wkr.worker_num where wk.work_name is not null AND wkr.worker_name is not NULL ORDER BY replace_date";
      }
      rows = await conn.query(sql);
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
      return rows;
    }
  }
  GetWork_HistoryList()
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

let cate_history = "";
let word_history = "";

app.post("/work_history", (req, res) => {
  console.log(req.body);
  cate_history = req.body.cate;
  word_history = req.body.word;
});

app.get("/work_history/search", (req, res) => {
  async function GetWork_HistoryList() {
    let conn, rows, sql;
    try {
      conn = await pool.getConnection();
      conn.query("USE wms");
      sql = `SELECT wk.work_name,wkr.worker_name,st.stock_num,st.stock_name,st.stock_info FROM tbl_stock st left join tbl_work wk on st.stock_num = wk.stock_num left join tbl_worker wkr on wk.worker_num = wkr.worker_num where wk.work_name is not null AND wkr.worker_name is not null and ${cate_history} like '%${word_history}%'`;
      rows = await conn.query(sql);
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
      return rows;
    }
  }
  GetWork_HistoryList()
    .then((rows) => {
      res.render(
        "views/html/workmanagement/work_history_search.ejs",
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

app.set("port", process.env.PORT || 3002);
app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
