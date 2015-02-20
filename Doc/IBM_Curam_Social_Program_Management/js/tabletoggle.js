function Toggle(tableName)
{
  var icon = document.getElementById("icon" + tableName);
  var tableBody = document.getElementById("tableBody" + tableName);
  
  if (tableBody.style.display == 'none')
  {
    tableBody.style.display = '';
    icon.src = "../images/collapse.bmp";
  }
  else
  {
    tableBody.style.display = 'none';
    icon.src = "../images/expand.bmp";
  }
}
