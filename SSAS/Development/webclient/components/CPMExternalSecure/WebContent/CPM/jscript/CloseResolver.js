function closeDialog() {
  dojo.ready(function() {
    dojo.require('curam.util.UimDialog');
    curam.util.UimDialog.ready(function() {
      var dialogObject = curam.util.UimDialog.get();
      dialogObject.close(true);
    });
  });
}
