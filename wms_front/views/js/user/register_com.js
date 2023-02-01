function id_overlap_check() {
  $(".username_input").change(function () {
    $("#id_check_sucess").hide();
    $(".id_overlap_button").show();
    $(".username_input").attr("check_result", "fail");
  });

  if ($(".username_input").val() == "") {
    alert("회사명을 입력해주세요.");
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
