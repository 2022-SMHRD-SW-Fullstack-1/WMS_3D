// var test = document.getElementById('test');

// test.addEventListener('click',function(){
//     alert('ok')
// // })

// function dp_menu(){
//     let click = document.getElementById("drop-content");
//     if(click.style.display === "none"){
//         click.style.display = "block";

//     }else{
//         click.style.display = "none";

//     }
// }

//페이지 이동 기능 (warehouse를 shelf로)

function goToCreateShelf(e){
    console.log(e)
    const num = {num:e}
    let url = "/createShelf"

    let form = document.createElement('form');
    form.setAttribute('method','post')
    form.setAttribute('action',url)
    document.characterSet = "utf-8";
    for(let key in num){
      let hiddenField = document.createElement('input')
      hiddenField.setAttribute('type','hidden');
      hiddenField.setAttribute('name',key)
      hiddenField.setAttribute('value',num[key]);
      form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();


  }
  function goToShelf(){
    location.href = "../../../three/sj/warehouse_3D.html"
  }
  //페이지 이동 기능