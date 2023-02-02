var test = document.getElementById("test");

function selectAll(selectAll)  {
    const checkboxes 
         = document.getElementsByName('item');
    
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectAll.checked;
    })
  }

