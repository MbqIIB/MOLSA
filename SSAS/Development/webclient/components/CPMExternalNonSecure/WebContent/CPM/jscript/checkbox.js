function CheckAll() {
if(document.forms(0).mainCheckbox.checked) {
  for (var i=0;i<document.forms(0).elements.length;i++) {
    var e = document.forms(0).elements[i];
    if ((e.type=='checkbox') && (!e.disabled) ) {
      e.checked = true;
    }
  }
  } else {
    for (var i=0;i<document.forms(0).elements.length;i++) {
    var e = document.forms(0).elements[i];
    if ((e.type=='checkbox') && (!e.disabled) ) {
      e.checked = false;
    }
  }
  
  }
}