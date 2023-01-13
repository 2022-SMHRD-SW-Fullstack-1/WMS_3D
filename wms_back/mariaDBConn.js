const mariadb = require("mariadb");
const vals = require("./consts.js");

const pool = mariadb.createPool({
  host: vals.DBHost,
  port: vals.DBPort,
  user: vals.DBUser,
  password: vals.DBPass,
  connectionLimit: 10,
});

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

module.exports = {
  getCompanyList: GetCompanyList,
};
