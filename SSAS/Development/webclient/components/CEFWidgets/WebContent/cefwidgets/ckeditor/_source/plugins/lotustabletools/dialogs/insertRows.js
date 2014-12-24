﻿/* Copyright IBM Corp. 2011-2013 All Rights Reserved.                    */

CKEDITOR.dialog.add('insertRows', function(editor) {

	return {

		title : editor.lang.ibm.table.insertMultipleRows,
		minWidth : 220,
		minHeight : 50,

		onOk : function()
		{
			var data = {};
			this.commitContent( data );
			editor.execCommand('insertMultipleRows', data);

		},

       contents:
		[
			{
			    id: 'info',
			    style: 'width: 100%',
			    elements:
				[

					{
						type : 'hbox',
						padding : "5px",
						width : ['30%','70%'],

						children :
						[
							{
								label : editor.lang.ibm.table.noOfRows,
								type : 'text',
								id : 'numberOfRows',
								required : true,
								'default' : '2',

								validate : function()
								{
									var value = this.getValue(),
										pass = !!( CKEDITOR.dialog.validate.integer()( value ) && value > 0 );

									if ( !pass )
									{
										alert( editor.lang.table.invalidRows );
										this.select();
									}
									return pass;
								},

								commit : function( data )
								{
									data.noOfRows = this.getValue();
								}
							},

							{
								type : 'select',
								label : editor.lang.ibm.table.insertPosition,
								id : 'type',
								style : 'width:150px',
								'default' : 'after',
								items :
								[
								 	[ editor.lang.ibm.table.insertAfter, 'after' ],
									[ editor.lang.ibm.table.insertBefore, 'before' ]
								],
								commit : function( data )
								{
									data.insertLocation = this.getValue();
								}
							}
						]
					}
				]
			}
		]
    };
});
