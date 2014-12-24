/* Copyright IBM Corp. 2011-2013 All Rights Reserved.                    */
(function()
{

	//vars for table width management
	var selectedTable, columnWidth;
	var sizePatternNoPercent = /^(\d+(?:\.\d+)?)(px|in|cm|mm|em|ex|pt|pc)$/;
	var sizeNoUnit = /^(\d+(?:\.\d+)?)$/;
	var sizePercentUnit = /^(\d+(?:\.\d+)?)%$/;
	var ratioPxToIn, ratioPxToCm, ratioPxToMm, ratioPxToEm, ratioPxToEx, ratioPxToPt, ratioPxToPc;

	/* Determines which column to use when checking cell widths and returns the largest cell width in the specified column
	  * cells - selected cells in the table
	  * insertBefore - indicates that cells should be added before the selection
	  */
	function getColMaxWidth(cells, insertBefore){

		var firstSelectedCell = cells[ 0 ],
			startCol =  getColumnsIndices( cells, 1 ),
			lastCol =  getColumnsIndices( cells ),
			colIndex = insertBefore ? startCol : lastCol;
		selectedTable = firstSelectedCell.getAscendant("table");

		var map = CKEDITOR.tools.buildTableMap( selectedTable );

		return getLargestCellWidth(map, colIndex);

	}

	/* Finds the largest cell width in the specified column if all cells have the same unit type
	 * tableMap - the map representation for the selected table
	 * colIndex - the index of the column to search in the table
	 */
	function getLargestCellWidth(tableMap, colIndex){

		//find the first cell in the column
		var firstCellIndex = -1;
		for (var i = 0; i < tableMap.length; i++){
			if (tableMap[ i ][ colIndex ]){		//the cell may not be in all rows
				firstCellIndex = i;
				break;
			}
		}

		if (firstCellIndex == -1)		//should never happen since the colIndex is retrieved from the selection
			return;

		//get the width and unit of the first cell in the column so we have something to compare the rest against
		var firstCell = new CKEDITOR.dom.element(tableMap[ firstCellIndex ][ colIndex ]);
		var firstCellWidth = firstCell.getStyle('width') ? firstCell.getStyle('width') : firstCell.getAttribute('width');

		if (!firstCellWidth){
			firstCellWidth = '0px';
		} else if (sizePercentUnit.exec(firstCellWidth)){		//do nothing for now if unit is %
			return;
		} else if (sizeNoUnit.exec(firstCellWidth)){	//width attribute can be just a number value when units are px
			firstCellWidth += 'px';
		}

		var match = sizePatternNoPercent.exec(firstCellWidth);
		var cellWidthVal = match[1];
		var cellUnitVal = match[2];

		var largestCellWidth = cellWidthVal,
			largestCellUnit = cellUnitVal,
			currentCellWidthVal, currentCellUnitVal;

		//Go through the rest of the table to see if any of the other cells in the column has a larger width value
		for (var j = firstCellIndex+1; j < tableMap.length; j++ )
		{
			var cell = tableMap[ j ][ colIndex ] ? new CKEDITOR.dom.element(tableMap[ j ][ colIndex ]) : null;

			if (cell) {

				var currentCellWidth = cell.getStyle('width') ? cell.getStyle('width') : cell.getAttribute('width');

				if (currentCellWidth){

					if (sizePercentUnit.exec(currentCellWidth)){		//do nothing for now if unit is %
						return;
					} else if (sizeNoUnit.exec(currentCellWidth)){	//width attribute can be just a number value when units are px
						currentCellWidth += 'px';
					}

					match = sizePatternNoPercent.exec(currentCellWidth);
					currentCellWidthVal = match[1];
					currentCellUnitVal = match[2];

					//convert to px if the unit types don't match
					if(currentCellUnitVal != largestCellUnit){
						if (currentCellUnitVal != 'px'){
							currentCellWidthVal = CKEDITOR.tools.convertToPx(currentCellWidth);
						}
						if (largestCellUnit != 'px'){
							largestCellWidth = CKEDITOR.tools.convertToPx(largestCellWidth+largestCellUnit);
							largestCellUnit = 'px';
						}
					}

					if(currentCellWidthVal > largestCellWidth){
						largestCellWidth = currentCellWidthVal;
					}
				}
			}
		}
		return largestCellWidth+largestCellUnit;
	}

	/* Determines which column(s) to check cell widths in and returns the sum of the largest cell widths in the specified column(s)
	  * cells - selected cells in the table
	  */
	function getColWidthSum(cells){
		var firstCell = cells[ 0 ],
			lastCell = cells[ cells.length - 1 ];
		selectedTable = firstCell.getAscendant( 'table' );

		var map = CKEDITOR.tools.buildTableMap( selectedTable ),
			startColIndex,
			endColIndex;

		// Figure out selected cells' column indices.
		for ( var i = 0, rows = map.length; i < rows; i++ )
		{
			for ( var j = 0, cols = map[ i ].length; j < cols; j++ )
			{
				if ( map[ i ][ j ] == firstCell.$ )
					startColIndex = j;
				if ( map[ i ][ j ] == lastCell.$ )
					endColIndex = j;
			}
		}

		//Calculate the sum of the widths of all selected columns
		var columnSum = 0, colWidth;
		for ( i = startColIndex; i <= endColIndex; i++ )
		{
			colWidth = 0;	//reset colWidth
			colWidth = getLargestCellWidth(map, i);		//get width of largest cell in this column
			if (!colWidth)		//colWidth will be undefined if any cell in the column has a percentage width value
				return;

			columnSum += parseFloat(colWidth);
		}

		//use the last colwidth to get the unit type - unit types must be the same for all cells
		var match = sizePatternNoPercent.exec(colWidth);
		var unit = match[2];

		return columnSum+unit;
	}

	/* Calculates the new table width
	  * colWidth - the width value the table should be adjusted by
	  * noColsToInsert - the number of columns that have been inserted
	  * deleteColumns - indicates that the columns are being deleted
	  */
	function calculateTableWidth(colWidth, noColsToInsert, deleteColumns){

		//parse the column width to separate the width value and the unit type
		var match = sizePatternNoPercent.exec(colWidth);
		var colWidthVal = match[1];
		var colUnitVal = match[2];

		//Get the table width and parse it to separate the width value and the unit type
		var tableWidth = selectedTable.getStyle('width') ? selectedTable.getStyle('width') : selectedTable.getAttribute('width');

		if (sizePercentUnit.exec(tableWidth)){		//do nothing for now if unit is %
			return tableWidth;
		} else if (sizeNoUnit.exec(tableWidth)){	//width attribute can be just a number value when units are px
			tableWidth += 'px';
		}

		match = sizePatternNoPercent.exec(tableWidth);
		if (match){
			var tableWidthVal = match[1];
			var tableUnitVal = match[2];
		} else {
			return tableWidth;
		}

		var newTableWidth;

		//convert to px if the unit types don't match
		if(colUnitVal != tableUnitVal){
			if (colUnitVal != 'px'){
				colWidthVal = CKEDITOR.tools.convertToPx(colWidth);
			}
			if (tableUnitVal != 'px'){
				tableWidthVal = CKEDITOR.tools.convertToPx(tableWidth);
				var origTableUnit = tableUnitVal;	//keep a record of the original table unit so that we can convert back to it after the calculations are complete
				tableUnitVal = 'px';
			}
		}

		tableWidthVal = parseFloat(tableWidthVal);
		colWidthVal = parseFloat(colWidthVal)
		if (deleteColumns){		//subtract the column width
			newTableWidth = tableWidthVal > colWidthVal ? tableWidthVal-colWidthVal : tableWidthVal;
		} else {			//add the new column width
			newTableWidth = tableWidthVal+(colWidthVal*noColsToInsert);
		}

		if (origTableUnit) {		//table unit was changed to px during calculations
			newTableWidth = convertToOrigUnit(newTableWidth, origTableUnit);
			tableUnitVal = origTableUnit;
		}

		return newTableWidth+tableUnitVal;
	}

	function convertToOrigUnit(widthValue, unit){
		var newWidth;
		switch (unit) {
			case 'in':
				newWidth = widthValue * ratioPxToIn;
				break;
			case 'cm':
				newWidth = widthValue * ratioPxToCm;
				break;
			case 'mm':
				newWidth = widthValue * ratioPxToMm;
				break;
			case 'em':
				newWidth = widthValue * ratioPxToEm;
				break;
			case 'ex':
				newWidth = widthValue * ratioPxToEx;
				break;
			case 'pt':
				newWidth = widthValue * ratioPxToPt;
				break;
			case 'pc':
				newWidth = widthValue * ratioPxToPc;
		}
		return Math.round(newWidth*Math.pow(10,2))/Math.pow(10,2);
	}

	//Determines the column index of the specified cell using colspan - copied from plugins/tabletools/plugin.js
	function getCellColIndex( cell, isStart )
	{
		var row = cell.getParent(),
			rowCells = row.$.cells;

		var colIndex = 0;
		for ( var i = 0; i < rowCells.length; i++ )
		{
			var mapCell = rowCells[ i ];
			colIndex += isStart ? 1 : mapCell.colSpan;
			if ( mapCell == cell.$ )
				break;
		}

		return colIndex -1;
	}

	//Determines the column index of the specified cell using colspan and the position of the cell in the selection i.e. is it at the start/end of the selection - copied from plugins/tabletools/plugin.js
	function getColumnsIndices( cells, isStart )
	{
		var retval = isStart ? Infinity : 0;
		for ( var i = 0; i < cells.length; i++ )
		{
			var colIndex = getCellColIndex( cells[ i ], isStart );
			if ( isStart ? colIndex < retval  : colIndex > retval )
				retval = colIndex;
		}
		return retval;
	}

	function insertMultipleRows(selection, insertBefore, noOfRows){

		var cells = CKEDITOR.plugins.tabletools.getSelectedCells( selection ),
			firstCell = cells[ 0 ],
			table = firstCell.getAscendant( 'table' ),
			doc = firstCell.getDocument(),
			startRow = cells[ 0 ].getParent(),
			startRowIndex = startRow.$.rowIndex,
			lastCell = cells[ cells.length - 1 ],
			endRowIndex = lastCell.getParent().$.rowIndex + lastCell.$.rowSpan - 1,
			endRow = new CKEDITOR.dom.element( table.$.rows[ endRowIndex ] ),
			rowIndex = insertBefore ? startRowIndex : endRowIndex,
			row = insertBefore ? startRow : endRow;

		var map = CKEDITOR.tools.buildTableMap( table ),
			cloneRow = map[ rowIndex ],
			nextRow = insertBefore ? map[ rowIndex - 1 ] : map[ rowIndex + 1 ],
			width = map[0].length;

		for (var j = 0; j<noOfRows; j++){
		//CKEDITOR.plugins.tabletools.insertRow(selection, insertBefore);

			var newRow = doc.createElement( 'tr' );
			for ( var i = 0; cloneRow[ i ] && i < width; i++ )
			{
				var cell;
				// Check whether there's a spanning row here, do not break it.
				if ( cloneRow[ i ].rowSpan > 1 && nextRow && cloneRow[ i ] == nextRow[ i ] )
				{
					cell = cloneRow[ i ];
					cell.rowSpan += 1;
				}
				else
				{
					cell = new CKEDITOR.dom.element( cloneRow[ i ] ).clone();
					cell.removeAttribute( 'rowSpan' );
					!CKEDITOR.env.ie && cell.appendBogus();
					newRow.append( cell );
					cell = cell.$;
				}

				i += cell.colSpan - 1;
			}

			insertBefore ? newRow.insertBefore( row ) :	newRow.insertAfter( row );
		}
	}

	function insertMultipleCols(selection, insertBefore, noOfCols){

		var cells = CKEDITOR.plugins.tabletools.getSelectedCells( selection ),
			firstCell = cells[ 0 ],
			table = firstCell.getAscendant( 'table' ),
			startCol =  getColumnsIndices( cells, 1 ),
			lastCol =  getColumnsIndices( cells ),
			colIndex = insertBefore? startCol : lastCol;

		var map = CKEDITOR.tools.buildTableMap( table ),
			cloneCol = [],
			nextCol = [],
			height = map.length;

		for ( var i = 0; i < height; i++ )
		{
			cloneCol.push( map[ i ][ colIndex ] );
			var nextCell = insertBefore ? map[ i ][ colIndex - 1 ] : map[ i ][ colIndex + 1 ];
			nextCell && nextCol.push( nextCell );
		}

		for (var j = 0; j<noOfCols; j++){
		//CKEDITOR.plugins.tabletools.insertColumn(selection, insertBefore);

			for ( i = 0; i < height; i++ )
			{
				var cell;

				if (cloneCol[ i ] != undefined){
					// Check whether there's a spanning column here, do not break it.
					if ( cloneCol[ i ].colSpan > 1
						&& nextCol.length
						&& nextCol[ i ] == cloneCol[ i ] )
					{
						cell = cloneCol[ i ];
						cell.colSpan += 1;
					}
					else
					{
						cell = new CKEDITOR.dom.element( cloneCol[ i ] ).clone();
						cell.removeAttribute( 'colSpan' );
						!CKEDITOR.env.ie && cell.appendBogus();
						cell[ insertBefore? 'insertBefore' : 'insertAfter' ].call( cell, new CKEDITOR.dom.element ( cloneCol[ i ] ) );
						cell = cell.$;
					}

					i += cell.rowSpan - 1;
				}
			}
		}
	}

	CKEDITOR.plugins.add( 'lotustabletools',{

		init: function(editor)
		{
			ratioPxToIn = 1/CKEDITOR.tools.convertToPx('1in');
			ratioPxToEm = 1/CKEDITOR.tools.convertToPx('1em');
			ratioPxToEx = 1/CKEDITOR.tools.convertToPx('1ex');
			ratioPxToPc	= 1/CKEDITOR.tools.convertToPx('1pc');
			//some units need extra precision
			ratioPxToCm = 100/CKEDITOR.tools.convertToPx('100cm');
			ratioPxToMm = 100/CKEDITOR.tools.convertToPx('100mm');
			ratioPxToPt = 100/CKEDITOR.tools.convertToPx('100pt');

			// Provide table selection through context menu
			editor.addCommand('selectTable', new CKEDITOR.command( editor,
				{
					exec : function( editor )
					{
						var selection = editor.getSelection(),
							ancestor = selection.getCommonAncestor(),
							element = (ancestor) ? ancestor.getAscendant("table") : null;

						if (element)
						{
							selection.selectElement(element);
						}
					},
					modes : { wysiwyg : 1 }
				})
			);

			editor.on('key', function ( evt )
			{
				//Listen for Ctrl+Shift+up arrow or Ctrl+Shift+down arrow and insert space:
				// 	- before the table if if it is the first element in the editor or if it is directly after another table
				// 	- after the table is it is directly followed by another table
				if (evt.data.keyCode == CKEDITOR.CTRL + CKEDITOR.SHIFT + 38 || evt.data.keyCode == CKEDITOR.CTRL + CKEDITOR.SHIFT + 40){

					var isUpArrow = false;
					var selection = evt.editor.getSelection();
					var range = selection.getRanges()[0];

					if (!range.collapsed)
						return;

					//check if the selection is a table
					var table = range.startContainer.hasAscendant('table') ? range.startContainer.getAscendant('table') : '';

					if (!table)
						return;

					var cells = CKEDITOR.plugins.tabletools.getSelectedCells(selection);

					if (cells.length != 1)		//need to check this in case the selection is outside of a table cell e.g. the caption
						return;

					var tableRow = cells[0].getAscendant('tr');
					var selectedTableRow, adjacentElement;

					if (evt.data.keyCode == CKEDITOR.CTRL + CKEDITOR.SHIFT + 38){		//If Ctrl+Shift+up arrow was pressed, get the first table row and the previous element
						selectedTableRow = new CKEDITOR.dom.element(table.$.rows[0]);
						adjacentElement = table.getPrevious();
						isUpArrow = true;
					} else if (evt.data.keyCode == CKEDITOR.CTRL + CKEDITOR.SHIFT + 40){	//If Ctrl+Shift+down arrow was pressed, get the last table row and the next element
						selectedTableRow = new CKEDITOR.dom.element(table.$.rows[table.$.rows.length-1]);
						adjacentElement = table.getNext();
					}

					//if the selection is the first/last table row, determine whether we need to insert space before/after the table
					if (tableRow.equals(selectedTableRow)){

						if ((isUpArrow && !adjacentElement) 		//table is the first element in a block
								||  (adjacentElement instanceof CKEDITOR.dom.element && adjacentElement.getName() == 'table')){		//table is directly before or after another table

							evt.cancel();		//cancel the event so that we can control the cursor position here instead

							//use enterMode to determine what type of element to insert
							var enterMode = evt.editor.config.enterMode;
							switch ( enterMode )
							{
								case CKEDITOR.ENTER_DIV:
									//in div entermode, it is common for tables to be wrapped in a div - just add a &nbsp; to the existing div
									if (table.getParent() instanceof CKEDITOR.dom.element && table.getParent().getName() == 'div'){
										var element = CKEDITOR.dom.element.createFromHtml( '&nbsp;' );
									} else {	//if the table is not wrapped in a div, create one
										var element = new CKEDITOR.dom.element( 'div' , evt.editor.document);
										element.setHtml('&nbsp;');		//required for webkit
									}
									break;
								case CKEDITOR.ENTER_BR:
									var element = CKEDITOR.dom.element.createFromHtml( '&nbsp;' );
									break;
								default:
									var element = new CKEDITOR.dom.element( 'p' , evt.editor.document);
									element.setHtml('&nbsp;');			//required for webkit
							}

							//insert the element and select it
							if (isUpArrow){
								element.insertBefore(table);
							}else{
								element.insertAfter(table);
							}

							var range = new CKEDITOR.dom.range(evt.editor.document);
							range.setStartAt( element, CKEDITOR.POSITION_AFTER_START );
							range.setEndAt( element, CKEDITOR.POSITION_AFTER_START ); //make this a collapsed selection
							range.select();
						}
					}
				}
			});

			if ( editor.contextMenu ) {
				editor.contextMenu.addListener( function( element, selection )
					{
						if ( element.hasAscendant( 'table', 1 ) )
						{
							return {
								select_table : CKEDITOR.TRISTATE_OFF
							};
						}
						return null;
				});
			}

			// Provide table selection through context menu
			editor.addCommand('selectTableRow', new CKEDITOR.command( editor,
				{
					exec : function( editor )
					{
						var selection = editor.getSelection(),
							ancestor = selection.getCommonAncestor(),
							element = (ancestor && ancestor.getName && ancestor.getName() == 'tr') ? ancestor : ancestor.getAscendant("tr");

						if (element)
						{
							selection.selectElement(element);
						}
					},
					modes : { wysiwyg : 1 }
				})
			);

			editor.addCommand('insertMultipleRows',
			{
				exec : function( editor, data )
				{
					var selection = editor.getSelection();
					var insertBefore = (data.insertLocation == 'before') ?	true : false;
					insertMultipleRows(selection, insertBefore, data.noOfRows);
				}
			});

			editor.addCommand('insertMultipleColumns',
			{
				exec : function( editor, data )
				{
					var selection = editor.getSelection();
					var insertBefore = (data.insertLocation == 'before') ?	true : false;
					insertMultipleCols(selection, insertBefore, data.noOfCols);
				}
			});

			CKEDITOR.dialog.add( 'insertRows', this.path + 'dialogs/insertRows.js' );
			editor.addCommand( 'insertRows', new CKEDITOR.dialogCommand( 'insertRows' ) );

			CKEDITOR.dialog.add( 'insertColumns', this.path + 'dialogs/insertColumns.js' );
			editor.addCommand( 'insertCols', new CKEDITOR.dialogCommand( 'insertColumns' ) );

			CKEDITOR.dialog.add( 'columnProperties', this.path + 'dialogs/columnProperties.js' );
			editor.addCommand( 'columnProps', new CKEDITOR.dialogCommand( 'columnProperties' ) );

			function TableRowParser(tableRowHtml) {

				var _html = tableRowHtml,
					isTableRegex = /^<table(.|\n)+<\/table>(<br[^>]*>)?$/i,
					isTableRowRegex = /^<tr(.|\n)+<\/tr>$/i,
					isTableCellRegex = /^<(td|th)(.|\n)+<\/(td|th)>$/gi;


				/** Parse the table row html */
				this.parse = function()  {

					if (!isTableRowRegex.test(_html) && !isTableCellRegex.test(_html) && !isTableRegex.test(_html) )
						return false;
					else
						return true;
				};

				/* Inserts the pasted row into the table before the row where the cursor is. Returns true if the pasted row has been inserted so that the original event can then be
				 * cancelled
				 */
				this.insertRowBefore = function(editor) {

					//find the selected table row
					var selection = editor.getSelection();
						var selectedElement = selection.getSelectedElement();
						var tableRow;

						if (selectedElement && selectedElement instanceof CKEDITOR.dom.element && selectedElement.getName() == 'tr'){
							tableRow = selectedElement;
						}else {

							var ancestor = selection.getCommonAncestor();
							if (ancestor && ancestor instanceof CKEDITOR.dom.element && ancestor.getName() == 'tr' ){
								tableRow = ancestor;
							}else {
								tableRow = ancestor.getAscendant("tr") ? ancestor.getAscendant("tr") : null;
							}
						}

						if (tableRow){
							var containsTableTag = isTableRegex.test(_html);
							var containsTableRowRegex = /<tr(.|\s)+<\/tr>/i;		//can't use isTableRowRegex from above because the tr tag may not be at the start of _html in this case

							//pasting a table row in Opera (before v11.60) only sends the td tags, so add a tr tag if not already present
							if(!containsTableRowRegex.test(_html)){
								_html = '<tr>'+_html+'</tr>';
							}
							//pasting a table row from firefox into another browser only sends the tr, so add a table tag if not already present
							if(!isTableRegex.test(_html)){
								_html = '<table>'+_html+'</table>';

							}

							var pastedTable = CKEDITOR.dom.element.createFromHtml(_html, editor.document);

							//find just the table row
							var pastedRow;
							for (var i=0; i<pastedTable.getChildCount(); i++){
								if (pastedTable.getChild(i) instanceof CKEDITOR.dom.element && (pastedTable.getChild(i).getName() == 'tbody' || pastedTable.getChild(i).getName() == 'thead')){
									var currentChild = pastedTable.getChild(i);
									for (var j=0; j<currentChild.getChildCount(); j++){
										if (currentChild.getChild(j) instanceof CKEDITOR.dom.element && currentChild.getChild(j).getName() == 'tr'){
											pastedRow = currentChild.getChild(j);
											break;		//the first table row in the pastedTable is the row for pasting, some browser (e.g. Safari) add an extra empty <tr> tag to pasted content so break
										}
									}
									if (pastedRow) break;
								}
							}
							//Default to browser behavior if cells span across multiple rows
							for (var i=0; i<pastedRow.getChildCount(); i++){
								if (pastedRow.getChild(i) instanceof CKEDITOR.dom.element && (pastedRow.getChild(i).getName() == 'td' || pastedRow.getChild(i).getName() == 'th')){
										var rowSpan = pastedRow.getChild(i).hasAttribute( 'rowSpan' ) ? pastedRow.getChild(i).getAttribute( 'rowSpan' ) : 0;
										if (rowSpan > 1)
											return false;
								}
							}

							pastedRow.insertBefore( tableRow );		//insert the pasted row before the row where the cursor is
							return true;

						} else
							return false;		//table row was not pasted so let the native paste event continue
				};
			}


			editor.on('paste', function(evt) {

				var tableRowParser = new TableRowParser(evt.data.html);

				if (tableRowParser.parse()) {
					if (tableRowParser.insertRowBefore(evt.editor))		//insert the pasted row before the current row
						evt.cancel();		//cancel the event so that the row will not be pasted in as a new table which is the default behavior
				}
			});

			// Fix table behavior so that columns do not slide around when editing a table.
			function handleOnInsertElement (evt) {
				var element = evt.data;
				if (element.getName() == 'table') {

					var fixedWidthColumns = element.hasAttribute('fixedwidthcolumns') ? element.getAttribute('fixedwidthcolumns') : false;

					element.removeAttribute('fixedwidthcolumns');		//remove attribute


					if (!fixedWidthColumns)
						return;

					// when inserting a table, set the size of the columns so that typing in the table doesn't slide the columns around when entering text
					// figure out what size the columns should be, base it on evenly distributing the space of the table
					var rows = element.$.rows;
					var tableWidth = element.getStyle('width');
					var numCols = rows[0].childNodes.length;		//every row in a new table will always have the same number of columns as the first row
					var sizePattern = /^(\d+(?:\.\d+)?)(px|%|in|cm|mm|em|ex|pt|pc)$/;

					var widthMatch = sizePattern.exec(tableWidth);
					var widthValue, widthUnit;

					//get the width value and unit
					if (widthMatch){
						widthValue = widthMatch[1];
						widthUnit = widthMatch[2];
					}

					//if table width is specified in percentage, assign columns based on 100%, not % specified for the table, otherwise just parse the tableWidth value
					var tableWidthValue = widthUnit == '%' ? 100 : parseFloat(widthValue);

					var colSize, remainder;
					if (widthUnit != 'px' && widthUnit != 'pt' && widthUnit != 'mm'){
						//allow decimal values up to 3rd decimal place
						colSize = tableWidthValue / numCols;		//size when columns are evenly distributed
						colSize = Math.floor(colSize*Math.pow(10,2))/Math.pow(10,2);

						//there may be a small reminder - calculate it to add to the width of the last table column later
						remainder = tableWidthValue - (colSize * numCols);
						remainder = Math.round(remainder*Math.pow(10,2))/Math.pow(10,2);
					} else {	//do not allow a decimal point
						colSize = Math.floor(tableWidthValue / numCols);
						remainder = tableWidthValue % numCols;
					}

					var colWidth = colSize + widthUnit;
					//Calculate the last column width - round it to 2 decimal places again here because some browsers like webkit and Opera introduce additional decimal values for % values
					var lastColumnWidth = Math.round((colSize + remainder)*Math.pow(10,2))/Math.pow(10,2) + widthUnit;

					// set the width for each cell
					for (var i = 0; i < rows.length; i++) {
						var row = new CKEDITOR.dom.element(rows[i]);
						var cols = row.$.cells;
						for (var j = 0; j < numCols -1; j++) {
							var col = new CKEDITOR.dom.element(cols[j]);
							col.setStyle('width', colWidth);
						}
						// add extra space to last column
						var lastCol = new CKEDITOR.dom.element(cols[numCols - 1]);
						lastCol.setStyle('width', lastColumnWidth);

					}
				}
			};

			editor.on( 'instanceReady', function() {
				editor.on('insertElement', handleOnInsertElement);
			});


			editor.on('beforeCommandExec', function(evt) {

				if (evt.data.name == 'columnDelete'){
					//calculate the sum of the widths of all selected columns
					var selection = evt.editor.getSelection();
					var cells = CKEDITOR.plugins.tabletools.getSelectedCells(selection);
					columnWidth = getColWidthSum(cells);
				}

			});

			editor.on('afterCommandExec', function(evt) {

				if (evt.data.name == 'columnInsertAfter' || evt.data.name == 'columnInsertBefore' || evt.data.name == 'insertMultipleColumns'){
					//add extra column width to table width

					var selection = evt.editor.getSelection();
					var cells = CKEDITOR.plugins.tabletools.getSelectedCells(selection);
					var insertBefore = evt.data.name == 'columnInsertBefore' ? true : false;
					var noColsToInsert = (evt.data.commandData && evt.data.commandData.noOfCols) ? evt.data.commandData.noOfCols : 1;

					//get the width of the new column
					columnWidth = getColMaxWidth (cells, insertBefore);

					//reset the table width to add the width of the new column
					if (columnWidth && columnWidth != '0px'){
						selectedTable.setStyle('width', calculateTableWidth(columnWidth, noColsToInsert));
						editor.fire( 'updateSnapshot' );
					}
				} else if (evt.data.name == 'columnDelete'){
					//reset the table width to subtract the width of the deleted columns as calculated in the beforeCommandExec listener
					if (columnWidth && columnWidth != '0px'){
						selectedTable.setStyle('width', calculateTableWidth(columnWidth, null, true));
						editor.fire( 'updateSnapshot' );
					}
				}
			});

		},
		afterInit : function( editor )
		{

			 // adding context menu
	        if ( editor.addMenuItems )
	      	{
				editor.addMenuGroup("tablecolumnproperties");
				editor.addMenuItems(
				{
					select_table:
					{
						label: editor.lang.ibm.table.selectTable,
						command: "selectTable",
						group: "table",
						order : 2
					},

					select_tablerow:
					{
						label: editor.lang.ibm.table.selectRow,
						command: "selectTableRow",
						group: "tablerow",
						order : 20
					},

					insert_rows:
					{
						label : editor.lang.ibm.table.insertMultipleRows,
						group : 'tablerow',
						command : 'insertRows',
						order : 1
					},

					insert_cols:
					{
						label : editor.lang.ibm.table.insertMultipleCols,
						group : 'tablecolumn',
						command : 'insertCols',
						order : 1
					},

					column_properties:
					{
						label : editor.lang.ibm.table.columnTitle,
						group : 'tablecolumnproperties',
						command : 'columnProps',
						order : 20
					}
				});

				var tablerow_item = editor._.menuItems['tablerow'];
				var tablerow_getItems = tablerow_item.getItems;

				//overwrite getItems for tablerow to add in our entries
				tablerow_item.getItems = function()
				{
					var tablerow_items = tablerow_getItems();
					tablerow_items.insert_rows = CKEDITOR.TRISTATE_OFF;
					tablerow_items.select_tablerow = CKEDITOR.TRISTATE_OFF;
					return tablerow_items;
				}

				var tablecolumn_item = editor._.menuItems['tablecolumn'];
				var tablecolumn_getItems = tablecolumn_item.getItems;

				//overwrite getItems for tablecolumn to add in our entries
				tablecolumn_item.getItems = function()
				{
					var tablecolumn_items = tablecolumn_getItems();
					tablecolumn_items.insert_cols = CKEDITOR.TRISTATE_OFF;
					tablecolumn_items.column_properties = CKEDITOR.TRISTATE_OFF;		////Column Properties is a sub-menu of the Column menu
					return tablecolumn_items;
				}
			}
		}
	});
})();
