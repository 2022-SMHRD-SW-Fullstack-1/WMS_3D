const mariadb = require("mariadb");
const vals = require("./const");

const pool = mariadb.createPool({
  host: vals.DBHost,
  port: vals.DBPort,
  user: vals.DBUser,
  password: vals.DBPass,
  connectionLimit: 10,
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
    rows = await conn.query("select * from tbl_warehouse");
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
};
