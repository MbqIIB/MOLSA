/*
Copyright IBM Corp. 2010-2013  All Rights Reserved.
*/

CKEDITOR.dialog.add('insertColumns',function(a){return{title:a.lang.ibm.table.insertMultipleCols,minWidth:230,minHeight:50,onOk:function(){var b={};this.commitContent(b);a.execCommand('insertMultipleColumns',b);},contents:[{id:'info',style:'width: 100%',elements:[{type:'hbox',padding:'5px',width:['30%','70%'],children:[{label:a.lang.ibm.table.noOfCols,type:'text',id:'numberOfCols',required:true,'default':'2',validate:function(){var b=this.getValue(),c=!!(CKEDITOR.dialog.validate.integer()(b)&&b>0);if(!c){alert(a.lang.table.invalidCols);this.select();}return c;},commit:function(b){b.noOfCols=this.getValue();}},{type:'select',label:a.lang.ibm.table.insertPosition,id:'type',style:'width:150px','default':'after',items:[[a.lang.ibm.table.insertAfter,'after'],[a.lang.ibm.table.insertBefore,'before']],commit:function(b){b.insertLocation=this.getValue();}}]}]}]};});
