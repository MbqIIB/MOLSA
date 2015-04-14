var TblId, StartRow, SearchFlt;
TblId = new Array, StartRow = new Array;

function setFilterGrid(id)
/*====================================================
  - Checks if id exists and is a table
  - Then looks for additional params
  - Calls fn that adds inputs and button
=====================================================*/
{
  var tbl = document.getElementById(id);
  var ref_row, fObj;
  if(tbl != null && tbl.nodeName.toLowerCase() == "table")
  {
    TblId.push(id);
    if(arguments.length>1)
    {
      for(var i=0; i<arguments.length; i++)
      {
        var argtype = typeof arguments[i];

        switch(argtype.toLowerCase()){
          case "number":
            ref_row = arguments[i];
          break;
          case "object":
            fObj = arguments[i];
          break;
        }//switch

      }//for
    }//if

    ref_row == undefined ? StartRow.push(2) : StartRow.push(ref_row+2);
    var ncells = getCellsNb(id,ref_row);
    AddRow(id,ncells,fObj);
  }
}

function AddRow(id,n,f)
/*====================================================
  - adds a filter (input) for each column (td)
  - adds button on last column
=====================================================*/
{
  var t = document.getElementById(id);
  var fltrow = t.insertRow(0);
  var inpclass;

  for(var i=0; i<n; i++)
  {
    var fltcell = fltrow.insertCell(i);
    i==n-1 ? inpclass = "flt_s" : inpclass = "flt";

    if(f==undefined || f["col_"+i]==undefined || f["col_"+i]=="none")
    {
      var inp = document.createElement("input");
      inp.setAttribute("id","flt"+i+"_"+id);
      if(f==undefined || f["col_"+i]==undefined) inp.setAttribute("type","text");
      else inp.setAttribute("type","hidden");
      inp.setAttribute("class","flt"); //doesn't seem to work on ie<=6
      fltcell.appendChild(inp);
      document.getElementById("flt"+i+"_"+id).className = inpclass;
      document.getElementById("flt"+i+"_"+id).onkeypress = DetectKey;
    }
    else if(f["col_"+i]=="select")
    {
      var slc = document.createElement("select");
      slc.setAttribute("id","flt"+i+"_"+id);
      fltcell.appendChild(slc);
      PopulateOptions(id,i,n);
      document.getElementById("flt"+i+"_"+id).className = inpclass;
      document.getElementById("flt"+i+"_"+id).onkeypress = DetectKey;
    }

/*
    if(i==n-1) // this adds button
    {
      var btn = document.createElement("a");

      btn.setAttribute("id","btn"+i+"_"+id);
      btn.setAttribute("href","javascript:Filter('"+id+"');");
      btn.setAttribute("class","go");
      fltcell.appendChild(btn);
      btn.appendChild(document.createTextNode("Filter List"));

      document.getElementById("btn"+i+"_"+id).className = "btn";
    }//if
*/
  }// for i
}

function PopulateOptions(id,cellIndex,ncells)
/*====================================================
  - populates select
  - adds only 1 occurence of a value
=====================================================*/
{
  var t = document.getElementById(id);
  var start_row = getStartRow(id);
  var row = t.getElementsByTagName("tr");
  var OptArray = new Array;
  var optIndex = 0; // option index

  for(var k=start_row; k<row.length; k++)
  {
    var cell = getChildElms(row[k]).childNodes;
    var nchilds = cell.length;

    if(nchilds == ncells){// checks if row has exact cell #

      for(var j=0; j<nchilds; j++)// this loop retrieves cell data
      {
        if(cellIndex==j)
        {
          var cell_data = getCellText(cell[j]);
          if(OptArray.toString().search(cell_data) == -1)
          // checks if celldata is already in array
          {
            optIndex++;
            OptArray.push(cell_data);
            var currOpt = new Option(cell_data,cell_data,false,false);
            document.getElementById("flt"+cellIndex+"_"+id).options[optIndex] = currOpt;
          }
        }//if cellIndex==j
      }//for j

    }//if

  }//for k
}

function Filter(id)
/*====================================================
  - gets search strings from SearchFlt array
  - retrieves data from each td in every single tr
  and compares to search string for current
  column
  - tr is hidden if all search strings are not
  found
=====================================================*/
{
  getFilters(id);
  var t = document.getElementById(id);
  var filteredCount = 0;
  var SearchArgs = new Array();
  var ncells = getCellsNb(id);

  for(i in SearchFlt) SearchArgs.push((document.getElementById(SearchFlt[i]).value).toLowerCase());

  var start_row = getStartRow(id);
  var row = t.getElementsByTagName("tr");

  for(var k=start_row; k<row.length; k++)
  {
    /*** if table already filtered some rows are not visible ***/
    if(row[k].style.display == "none") row[k].style.display = "";

    var cell = getChildElms(row[k]).childNodes;
    var nchilds = cell.length;

    if(nchilds == ncells){// checks if row has exact cell #
      var cell_value = new Array();
      var occurence = new Array();
      var isRowValid = true;

      for(var j=0; j<nchilds; j++)// this loop retrieves cell data
      {
        var cell_data = getCellText(cell[j]).toLowerCase();
        cell_value.push(cell_data);

        if(SearchArgs[j]!="")
        {
          occurence[j] = cell_data.split(SearchArgs[j]).length;
        }
      }//for j

      for(var t=0; t<ncells; t++)
      {
        if(SearchArgs[t]!="" && occurence[t]<2)
        {
          isRowValid = false;
        }
      }//for t

    }//if

    if(isRowValid==false)
    {
      row[k].style.display = "none";
    }
    else
    {
      row[k].style.display = "";
      filteredCount = filteredCount + 1;
    }

  }// for k

  // Check for a filtered count element
  if(document.getElementById("TotalColumn") != null)
  {
    var f = document.getElementById("TotalColumn");
    var totalText = f.innerHTML;
    var leftText = totalText.substring(0, totalText.indexOf('(') + 1);
    var rightText = totalText.substring(totalText.indexOf(')'), totalText.length);
    f.innerHTML = leftText + filteredCount + rightText;
  }

}

function getCellsNb(id,nrow)
/*====================================================
  - returns number of cells in a row
  - if nrow param is passed returns number of cells
  of that specific row
=====================================================*/
{
    var t = document.getElementById(id);
  var tr;
  if(nrow == undefined) tr = t.getElementsByTagName("tr")[0];
  else  tr = t.getElementsByTagName("tr")[nrow];
  var n = getChildElms(tr);
  return n.childNodes.length;
}

function getFilters(id)
/*====================================================
  - filter (input or select) ids are stored in
  SearchFlt array
=====================================================*/
{
  SearchFlt = new Array;
  var t = document.getElementById(id);
  var tr = t.getElementsByTagName("tr")[0];
  var enfants = tr.childNodes;

  for(var i=0; i<enfants.length; i++) SearchFlt.push(enfants[i].firstChild.getAttribute("id"));
}

function getStartRow(id)
/*====================================================
  - returns starting row for Filter fn for a
  given table id
=====================================================*/
{
  var r;
  for(j in TblId)
  {
    if(TblId[j] == id) r = StartRow[j];
  }
  return r;
}

function getChildElms(n)
/*====================================================
  - checks passed node is a ELEMENT_NODE nodeType=1
  - removes TEXT_NODE nodeType=3
=====================================================*/
{
  if(n.nodeType == 1)
  {
    var enfants = n.childNodes;
    for(var i=0; i<enfants.length; i++)
    {
      var child = enfants[i];
      if(child.nodeType == 3) n.removeChild(child);
    }
    return n;
  }
}

function getCellText(n)
/*====================================================
  - returns text + text of child nodes of a cell
=====================================================*/
{
  var s = "";
  var enfants = n.childNodes;
  for(var i=0; i<enfants.length; i++)
  {
    var child = enfants[i];
    if(child.nodeType == 3) s+= child.data;
    else s+= getCellText(child);
  }
  return s;
}

function DetectKey(e)
{
/*====================================================
  - common fn that detects return key for a given
  element (onkeypress attribute on input)
=====================================================*/
  var evt=(e)?e:(window.event)?window.event:null;
  if(evt){
    var key=(evt.charCode)?evt.charCode:
      ((evt.keyCode)?evt.keyCode:((evt.which)?evt.which:0));
    if(key=="13")
    {
      var tblid = this.getAttribute("id").split("_")[1];
      Filter(tblid);
    }
  }
}

function Focus(id)
/*====================================================
  - sets forcus to the first filter field
=====================================================*/
{
  var t = document.getElementById(id);
  var input = t.getElementsByTagName("input")[0];
  input.focus();
}
