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
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      var cmpX=isNaN(parseFloat(x.innerHTML))?x.innerHTML.toLowerCase():parseFloat(x.innerHTML);
      var cmpY=isNaN(parseFloat(y.innerHTML))?y.innerHTML.toLowerCase():parseFloat(y.innerHTML);
      cmpX=(cmpX=='-')?0:cmpX;
      cmpY=(cmpY=='-')?0:cmpY;
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (cmpX > cmpY) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (cmpX < cmpY) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
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
function CB() {
  var rows = document.getElementById("myTable").rows;
  for (var a = 1; a < rows.length; a++) {
    var churchname = rows[a].cells[0].innerHTML;
    if (churchname.includes("📖")) {
      if (rows[a].style.display == "") {
        rows[a].style.display = "none";
      } else if (rows[a].style.display == "none") {
        rows[a].style.display = "";
      }
    }
  }
}
