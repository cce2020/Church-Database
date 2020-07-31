function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    var xgty;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      xgty = false;
      // The Column for the Name:
      if (n == 0) {
      	x = rows[i].cells[0].innerHTML;
      	y = rows[i + 1].cells[0].innerHTML;
        // Get name for every church:
        var x1 = x.substring(x.indexOf(">" + 1));
        var y1 = y.substring(y.indexOf(">" + 1));
        xgty = x1 > y1;
        } 
      // The Column for the Time:
      else if (n == 1) {
        // Get two elements you want to compare within the row:
        x = rows[i].cells[1].innerHTML;
      	y = rows[i + 1].cells[1].innerHTML;
        // First priority is the time:
        var x1 = x.substring(5, 6);
        var y1 = y.substring(5, 6);
        var strx, stry = 0;
        // The next priority is the number:
        if (x.indexOf(":") == 1) {
        	strx = parseInt(x.substring(0, 1));
        } else if (x.indexOf(":") == 2) {
          strx = parseInt(x.substring(0, 2));
        }
        if (y.indexOf(":") == 1) {
          stry = parseInt(y.substring(0, 1));
        } else if (y.indexOf(":") == 2) {
          stry = parseInt(y.substring(0, 2));
        }
        xgty = (x1 > y1) && (strx > stry);
      }
      //The column for everything else:
      else {
      	/* Get the two elements you want to compare,
      	one from current row and one from the next: */
      	x = rows[i].getElementsByTagName("TD")[n];
      	y = rows[i + 1].getElementsByTagName("TD")[n];
      	var cmpX=isNaN(parseFloat(x.innerHTML))?x.innerHTML.toLowerCase():parseFloat(x.innerHTML);
      	var cmpY=isNaN(parseFloat(y.innerHTML))?y.innerHTML.toLowerCase():parseFloat(y.innerHTML);
      	cmpX=(cmpX=='-')?0:cmpX;
      	cmpY=(cmpY=='-')?0:cmpY;
        xgty = (cmpX > cmpY);
      }
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc" && xgty == true) {
          shouldSwitch = true;
          break;
        }
      else if (dir == "desc" && xgty == false) {
         	shouldSwitch = true;
         	break;
        }
      }     
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

function submit() {
	// Init arrays, table, and checked checkboxes
  var CBworshipTime, CBdistance, CBdenomination = [];
  var CBcollegeMin = false;
  var rows = document.getElementById("myTable").rows;
  var checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');
  
  // Sort columns/categories of checked checkboxes
  for (var cb of checkedBoxes) {
    if (cb.name == "time") {
    	CBworshipTime.push(cb.id);
    } else if (cb.name == "distance") {
    	CBdistance.push(cb.id);
    } else if (cb.name == "denomination") {
    	CBdenomination.push(cb.id);
    } else if (cb.name == "collegeMin") {
    	CBcollegeMin = true;
    }
  }
  
  // Bools to check if no checkboxes were selected for each column/category
  var timeArrayExists = Array.isArray(CBworshipTime) && CBworshipTime.length;
  var distanceArrayExists = Array.isArray(CBdistance) && CBdistance.length;
  var denominationArrayExists = Array.isArray(CBdenomination) && CBdenomination.length;
  
  // Checks every row
  for (var i = 1; i < rows.length; i++) {    
    // If any of the conditions are broken, hide current row and move on to next one
    if ((timeArrayExists && !CBworshipTime.includes(rows[i].cells[1].innerHTML)) ||
    	  (distanceArrayExists && !CBdistance.includes(rows[i].cells[3].innerHTML)) ||
        (denominationArrayExists && !CBdenomination.includes(rows[i].cells[4].innerHTML.toLowerCase())) ||
        (CBcollegeMin && !rows[i].cells[0].innerHTML.includes("🎒"))) {
    	rows[i].style.display = "none";
      continue;
    }
    rows[i].style.display = "";
  }
}
