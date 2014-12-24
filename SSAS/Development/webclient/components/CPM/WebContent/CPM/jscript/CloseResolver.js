function closeDialog() {
  dojo.ready(function() {
    dojo.require('curam.util.UimDialog');
    curam.util.UimDialog.ready(function() {
      var dialogObject = curam.util.UimDialog.get();
      curam.tab.refreshMainContentPanel();
      dialogObject.close(false);
      
    });
  });
}
