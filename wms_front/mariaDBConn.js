const mariadb = require("mariadb");
const vals = require("./const");


const pool = mariadb.createPool({
  host: vals.DBHost,
  port: vals.DBPort,
  user: vals.DBUser,
  password: vals.DBPass,
  connectionLimit: 10,
   multipleStatements: true // 여러 쿼리를 ';'를 기준으로 한번에 보낼 수 있게한다.
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
    rows = await conn.query("SELECT w.wh_num,w.com_num,w.wh_name,w.wh_width,w.wh_length,w.wh_min_temp,w.wh_max_temp,w.wh_min_humid,w.wh_max_humid,w.wh_info ,floor(sum(IFNULL((s.shelf_width * s.shelf_length * s.shelf_floor),0))) wh_max_avl,(floor(sum(IFNULL((s.shelf_width * s.shelf_length * s.shelf_floor),0)))-(SELECT COUNT(st.stock_num) stock_count FROM tbl_shelf s LEFT JOIN tbl_stock st ON s.shelf_num = st.shelf_num WHERE s.wh_num = w.wh_num AND st.output_date IS null)) wh_now_avl from tbl_warehouse w left JOIN tbl_shelf s ON w.wh_num = s.wh_num GROUP BY wh_num;SELECT s.wh_num, s.shelf_name,s.shelf_width,s.shelf_length,s.shelf_floor,FLOOR(s.shelf_width * s.shelf_length * s.shelf_floor) shelf_avl, count(st.stock_num) FROM tbl_shelf s LEFT JOIN tbl_stock st ON s.shelf_num = st.shelf_num GROUP BY shelf_name");
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
    rows = await conn.query("SELECT s.wh_num, s.shelf_name,s.shelf_width,s.shelf_length,s.shelf_floor,FLOOR(s.shelf_width * s.shelf_length * s.shelf_floor) shelf_avl, count(st.stock_num) FROM tbl_shelf s LEFT JOIN tbl_stock st ON s.shelf_num = st.shelf_num GROUP BY shelf_name");
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
  getShelfList: GetShelfList
};
