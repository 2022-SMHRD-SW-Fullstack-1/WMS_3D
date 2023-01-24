const mariadb = require("mariadb");
const vals = require("./const");

const pool = mariadb.createPool({
  host: vals.DBHost,
  port: vals.DBPort,
  user: vals.DBUser,
  password: vals.DBPass,
  connectionLimit: 10,
  multipleStatements: true, // 여러 쿼리를 ';'를 기준으로 한번에 보낼 수 있게한다.
});

// select로 가져오기

// 회사 정보 가져오기
async function GetCompanyList() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query("select * from tbl_company");
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    return rows;
  }
}

// 창고 정보 가져오기
async function GetWarehouseList() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(
      "SELECT w.wh_num,w.com_num,w.wh_name,w.wh_width,w.wh_length,w.wh_min_temp,w.wh_max_temp,w.wh_min_humid,w.wh_max_humid,w.wh_info ,floor(sum(IFNULL((s.shelf_width * s.shelf_length * s.shelf_floor),0))) wh_max_avl,(floor(sum(IFNULL((s.shelf_width * s.shelf_length * s.shelf_floor),0)))-(SELECT COUNT(st.stock_num) stock_count FROM tbl_shelf s LEFT JOIN tbl_stock st ON s.shelf_num = st.shelf_num WHERE s.wh_num = w.wh_num AND st.output_date IS null)) wh_now_avl from tbl_warehouse w left JOIN tbl_shelf s ON w.wh_num = s.wh_num GROUP BY wh_num;SELECT s.wh_num, s.shelf_name,s.shelf_width,s.shelf_length,s.shelf_floor,FLOOR(s.shelf_width * s.shelf_length * s.shelf_floor) shelf_avl, count(st.stock_num) FROM tbl_shelf s LEFT JOIN tbl_stock st ON s.shelf_num = st.shelf_num GROUP BY shelf_name"
    );
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    return rows;
  }
}

// 선반 정보 가져오기
async function GetShelfList() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(
      "SELECT s.wh_num, s.shelf_name,s.shelf_width,s.shelf_length,s.shelf_floor,FLOOR(s.shelf_width * s.shelf_length * s.shelf_floor) shelf_avl, count(st.stock_num) FROM tbl_shelf s LEFT JOIN tbl_stock st ON s.shelf_num = st.shelf_num GROUP BY shelf_name"
    );
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    return rows;
  }
}

// 입고정보 가져오기
async function GetInputList() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(
      "SELECT st.stock_num,st.stock_name,st.stock_info,st.buy_com,date_FORMAT(st.wlb_input_date,'%y년 %m월 %d일 %H시 %i분') wlb_input_date,wkr.worker_name FROM tbl_stock st left join tbl_worker wkr on st.com_num = wkr.com_num where st.com_num=1123456789"
    );
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    return rows;
  }
}

// 출고정보 가져오기
async function GetOutputList() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(
      "SELECT st.stock_num,st.stock_name,st.stock_info,st.sell_com,date_FORMAT(st.output_date,'%y년 %m월 %d일 %H시 %i분') output_date,wkr.worker_name FROM tbl_stock st left join tbl_worker wkr on st.com_num = wkr.com_num where st.com_num=1123456789 AND st.sell_com is not null AND st.output_date is not null"
    );
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    return rows;
  }
}

// 입/출고내역 가져오기
async function GetInOutput_HistoryList() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(
      "SELECT stock_num,stock_name,stock_info,date_FORMAT(input_date,'%y년 %m월 %d일 %H시 %i분') input_date,buy_com,IFNULL(date_FORMAT(output_date,'%y년 %m월 %d일 %H시 %i분'),'-')output_date,IFNULL(sell_com,'-') sell_com FROM tbl_stock"
    );
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    return rows;
  }
}

// 작업내역 가져오기
async function GetWork_HistoryList() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(
      "SELECT wk.work_name,wkr.worker_name,st.stock_num,st.stock_name,st.stock_info FROM tbl_stock st left join tbl_work wk on st.stock_num = wk.stock_num left join tbl_worker wkr on wk.worker_num = wkr.worker_num where wk.work_name is not null AND wkr.worker_name is not null"
    );
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    return rows;
  }
}

// 재고현황 가져오기
async function GetStockList() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query(
      "SELECT st.stock_num, st.stock_name, st.stock_info, st.buy_com, wh.wh_name, date_FORMAT(st.exp_dt,'%y년 %m월 %d일') exp_dt FROM tbl_stock st left join tbl_warehouse wh ON st.com_num = wh.com_num WHERE st.output_date IS NULL GROUP BY st.stock_num"
    );
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
    return rows;
  }
}

// insert로 데이터 넣기
// async function InsertCompanyData() {
//   console.log(app.name);
//   let conn, rows;
//   let sql = "insert into tbl_company values(null,?,?,?,?,?)";
//   conn = await pool.getConnection();
//   conn.query("USE wms");
//   rows = await conn.query(sql, [app.pw, app.name, app.bsn, app.tel, app.addr]);
//   if (err) {
//     // 실패
//     console.error("insert 실행 실패!" + err);
//   } else {
//     // 성공
//     console.log("insert 성공!!!!!!!!!!");
//   }
// }

// update로 데이터 수정하기

// delete로 데이터 삭제하기

module.exports = {
  getCompanyList: GetCompanyList,
  getWarehouseList: GetWarehouseList,
  getShelfList: GetShelfList,
  getInputList: GetInputList,
  getOutputList: GetOutputList,
  getInOutput_HistoryList: GetInOutput_HistoryList,
  getWork_HistoryList: GetWork_HistoryList,
  getStockList: GetStockList,
};
