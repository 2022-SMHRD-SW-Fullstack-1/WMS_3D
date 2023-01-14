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

// insert로 데이터 넣기
async function InsertCompanyData() {
  let conn, rows;
  try {
    conn = await pool.getConnection();
    conn.query("USE wms");
    rows = await conn.query("insert into tbl_company values(,)");
  } catch {}
}

// update로 데이터 수정하기

// delete로 데이터 삭제하기

module.exports = {
  getCompanyList: GetCompanyList,
};
