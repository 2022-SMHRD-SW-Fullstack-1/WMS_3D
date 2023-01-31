// const express = require("express");
// const router = express.Router();
// var mariadb = require("mariadb"); //마이에스큐엘을 쓰고싶다!!

// const pool = mariadb.createPool({
//   host: vals.DBHost,
//   port: vals.DBPort,
//   user: vals.DBUser,
//   password: vals.DBPass,
//   connectionLimit: 10,
//   multipleStatements: true, // 여러 쿼리를 ';'를 기준으로 한번에 보낼 수 있게한다.
// });
// pool.connect(function (err) {
//   //mysql을 연결해주는 친구이다
//   if (err)
//     console.error(
//       "mariadb connection error : " + err
//     ); //정상연결 되었는지 확인용 log
//   else console.log("mariadb is connected successfully!");
// });

// router.post("/register_com", function (req, res) {
//   // client(signup_page.js)에서 이경로로 fetch햇따
//   let user_id = req.body.id; //req는 데이터를 받은건데 ①에서 data객체를 보내줫었다

//   console.log(req.body.id);
//   let sql =
//     "SELECT * FROM tbl_user WHERE com_num=? AND  user_id = ? AND user_pw = ?"; //sql 쿼리문-> id 에맞는 row들고 오고싶다
//   pool.query(sql, [user_id], function (err, rows, fields) {
//     console.log(rows);
//     let com_num = new Object();
//     com_num.tf = false; // 이 아이디를 사용가능 한가요??

//     if (rows[0] === undefined) {
//       //중복되는게 없으면 (없으니까 못가져왓겠지)
//       com_num.tf = true; //없음 사용가능
//       res.send(com_num); //다시 클라이언트로 보낸다 checkid 객체를
//     } else {
//       com_num.tf = false; // 중복됨 사용x
//       res.send(com_num);
//     }
//   });
// });

function id_overlap_check() {
  $(".username_input").change(function () {
    $("#id_check_sucess").hide();
    $(".id_overlap_button").show();
    $(".username_input").attr("check_result", "fail");
  });

  if ($(".username_input").val() == "") {
    alert("이메일을 입력해주세요.");
    return;
  }

  id_overlap_input = document.querySelector('input[name="com_num"]');

  $.ajax({
    url: "http://localhost:3002/register_com",
    data: {
      com_num: id_overlap_input,
    },
    datatype: "json",
    success: function (data) {
      console.log(data["overlap"]);
      if (data["overlap"] == "fail") {
        alert("이미 존재하는 사업자 번호 입니다.");
        id_overlap_input.focus();
        return;
      } else {
        alert("사용가능한 사업자 번호 입니다.");
        $(".username_input").attr("check_result", "success");
        $("#id_check_sucess").show();
        $(".id_overlap_button").hide();
        return;
      }
    },
  });
}
