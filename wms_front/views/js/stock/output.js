var test = document.getElementById('test');

test.addEventListener('click',function(){
    alert('ok')
})

function selectAll(selectAll)  {
    const checkboxes 
         = document.getElementsByName('item');
    
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAll.checked;
    })
  }