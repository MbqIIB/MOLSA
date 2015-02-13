/* 
 * Licensed Materials - Property of IBM
 * 
 * Copyright IBM Corporation 2013. All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure 
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 */
function enactHiddenActionControl_onFirstLoad() {

  // Note: This check depends upon the Cúram naming
  // scheme for the page which may change in the future.
  if (new String(window.location).indexOf('Action.do') == -1) {
    // Note: This depends on the Cúram naming scheme
    // for the form name which may change in the future.
    document.forms['mainForm'].submit();
  }
}

function enactHiddenActionControl_onChange() {
  // Note: This depends on the Cúram naming scheme
  // for the form name which may change in the future.
  document.forms['mainForm'].submit();
}