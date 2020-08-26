function sortTable(n) {
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	var xDate, yDate, xTimeIndex, yTimeIndex, xM, yM, xHour, yHour, xMinute, yMinute;
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
			// The Column for the Name:
			if (n == 0) {
				x = rows[i].cells[0].innerHTML;
				y = rows[i + 1].cells[0].innerHTML;
				// Get name for every church:
				var x1 = x.substring(x.indexOf(">")+1);
				var y1 = y.substring(y.indexOf(">")+1);
				/* Check if the two rows should switch place,
					based on the direction, asc or desc: */
				if (dir == "asc") {
					if (x1 > y1) {
						// If so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				} else if (dir == "desc") {
					if (x1 < y1) {
						// If so, mark as a switch and break the loop:
						shouldSwitch = true;
						break;
					}
				}
			} // The Column for the Time:
			else if (n == 1) {
				x = rows[i].cells[1].innerHTML;
				y = rows[i + 1].cells[1].innerHTML;

				// Get x time
				xDate = timeToDateObj(x)

				// Get y time
				yDate = timeToDateObj(y);

				// Compare times
				if (dir == "asc" && xDate > yDate) {
					shouldSwitch = true;
					break;
				} else if (dir == "desc" && xDate < yDate) {
					shouldSwitch = true; 
					break;
				}
			} //The column for everything else:
			else {
				/* Get the two elements you want to compare,
				one from current row and one from the next: */
				x = rows[i].getElementsByTagName("TD")[n];
				y = rows[i + 1].getElementsByTagName("TD")[n];
				var cmpX = isNaN(parseFloat(x.innerHTML)) ? x.innerHTML.toLowerCase() : parseFloat(x.innerHTML);
				var cmpY = isNaN(parseFloat(y.innerHTML)) ? y.innerHTML.toLowerCase() : parseFloat(y.innerHTML);
				cmpX = (cmpX == '-') ? 0 : cmpX;
				cmpY = (cmpY == '-') ? 0 : cmpY;
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
		}
		if (shouldSwitch) {
			/* If a switch has been marked, make the switch
			and mark that a switch has been done: */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			// Each time a switch is done, increase this count by 1:
			switchcount++;
		} else {
			/* If no switching has been done AND the direction is "asc",
			set the direction to "desc" and run the while loop again. */
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
	zebraPattern();
}

// For animating collapsibles
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function () {
		this.classList.toggle("active");
		var content = this.nextElementSibling;
		if (content.style.maxHeight) {
			content.style.maxHeight = null;
		} else {
			content.style.maxHeight = content.scrollHeight + "px";
		}
	});
}

// For disappearing sliders when "Check all..." is selected🔒
var collChecks = document.getElementsByClassName("collCheck");
var disableElem = document.getElementsByClassName("disableElement");
var ranges = document.getElementsByClassName("rangeText");
var j, currentSlider, currentRange;

for (j = 0; j < collChecks.length; j++) {
	collChecks[j].addEventListener("click", function() {
		if (this.id == "timeCheck") {
			currentSlider = disableElem[0];
			currentRange = ranges[0];
		} else if (this.id == "distCheck") {
			currentSlider = disableElem[1];
			currentRange = ranges[1];
		}
		currentSlider.classList.toggle("disable");

		if (currentRange.innerHTML.includes("🔒")) {
			currentRange.innerHTML = currentRange.innerHTML.slice(0,-30);
		} else {
			currentRange.insertAdjacentHTML('beforeend',"<span id='secondText'> 🔒</span>");
		}
	});
}

// Filter function once button is clicked
function submit() {
	// Init arrays, table, and checked checkboxes
	var CBcollegeMin, timeCheckAll, distCheckAll = false;
	var rows = document.getElementById("myTable").rows;
	var checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');

	// Sort columns/categories of checked checkboxes
	var CBdenomination = [];
	for (var cb of checkedBoxes) {
		if (cb.name == "denomination") {
			CBdenomination.push(cb.id);
		} else if (cb.name == "colMin") {
			CBcollegeMin = true;
		} else if (cb.name == "timeCheck") {
			timeCheckAll = true;
		} else if (cb.name == "distCheck") {
			distCheckAll = true;
		}
	}

	// Bools to check if no checkboxes were selected for each column/category
	var denominationArrayExists = Array.isArray(CBdenomination) && CBdenomination.length;
	var inTime, inDistance, inDenomination, inCollegeMin = false;
	var time, timeList, timeLeft, colonIndex, distance;
	var startTime = timeToDateObj(document.getElementById("time1").innerHTML);
	var endTime = timeToDateObj(document.getElementById("time2").innerHTML);
	var minDist = document.getElementById("dist1").innerHTML;
	var maxDist = document.getElementById("dist2").innerHTML;
	minDist = parseInt(minDist.substring(0, minDist.indexOf("m")-1));
	maxDist = parseInt(maxDist.substring(0, maxDist.indexOf("m")-1));

	// Checks every row
	// If any of the conditions are broken, hide current row and move on to next one
	for (var i = 1; i < rows.length; i++) {
		// Time check
		timeList = rows[i].cells[1].innerHTML;
		inTime = false;

		if (timeList == "") {
			timeLeft = false;
		} else {
			timeLeft = true;
		}
		if (timeList.includes("Saturday")) {
			timeList = timeList.substring(timeList.indexOf(">")+1);
		}

		while (timeLeft && !inTime) {
			time = timeToDateObj(timeList);
			inTime = time >= startTime && time <= endTime;

			if (timeList.length > 8) {
				timeList = timeList.substring(timeList.indexOf(">")+1);
			} else {
				timeLeft = false;
			}
		}

		// Distance Check
		distance = parseFloat(rows[i].cells[3].innerHTML);
		inDistance = distance >= minDist && distance <= maxDist

		// Denomination and College Ministry Check 
		inDenomination = CBdenomination.includes(rows[i].cells[4].innerHTML);
		inCollegeMin = rows[i].cells[0].innerHTML.includes("🎒");

		if ((!inTime && !timeCheckAll) || (!inDistance && !distCheckAll) ||
			(denominationArrayExists && !inDenomination) ||
			(CBcollegeMin && !inCollegeMin)) {
			rows[i].style.display = "none";
		} else {
			rows[i].style.display = "";
		}
	}
	zebraPattern();
}


// Gets time/list of times and converts first to date object
function timeToDateObj(time) {
	var date, colonIndex, hour, minute, xM;
	if (time == "") {
		date = new Date(2020, 1, 2, 0, 0);
	} else {
		if (time.includes("Saturday")) {
			time = time.substring(time.indexOf(">")+1);
		}
		colonIndex = time.indexOf(":");
		xM = time.substring(time.indexOf("M")-1, time.indexOf("M"));
		hour = parseInt(time.substring(0, colonIndex));
		minute = parseInt(time.substring(colonIndex + 1, colonIndex + 3));
		if (xM == "P" && hour != 12) {
			hour += 12;
		}
		date = new Date(2020, 1, 1, hour, minute);
	}
	return date;
}

// Reapply zebra pattern
function zebraPattern() {
	var count = 0;
	var rows = document.getElementById("myTable").rows;
	var even = false;
	for (i = 1; i < rows.length-1; i++) {
		if (rows[i].style.display == "") {
			if (even) {
				rows[i].style.backgroundColor = "white";
			} else {
				rows[i].style.backgroundColor = "#f2f2f2";
			}
			even = !even;
			count++;
		}
	}
}

// Slider functions in jQuery
// Slider for time
$(function() {
  $("#slider-range").slider({
		range: true,
    min: 0,
    max: 1440,
    step: 15,
    values: [600, 720],
		slide: function( event, ui ) {
			var hours1 = Math.floor(ui.values[0] / 60);
			var minutes1 = ui.values[0] - (hours1 * 60);

			if (hours1.length == 1) hours1 = '0' + hours1;
			if (minutes1.length == 1) minutes1 = '0' + minutes1;
			if (minutes1 == 0) minutes1 = '00';
			if (hours1 >= 12) {
					if (hours1 == 12) {
							hours1 = hours1;
							minutes1 = minutes1 + " PM";
					} else {
							hours1 = hours1 - 12;
							minutes1 = minutes1 + " PM";
					}
			} else {
					hours1 = hours1;
					minutes1 = minutes1 + " AM";
			}
			if (hours1 == 0) {
					hours1 = 12;
					minutes1 = minutes1;
			}

			$('.slider-time').html(hours1 + ':' + minutes1);

			var hours2 = Math.floor(ui.values[1] / 60);
			var minutes2 = ui.values[1] - (hours2 * 60);

			if (hours2.length == 1) hours2 = '0' + hours2;
			if (minutes2.length == 1) minutes2 = '0' + minutes2;
			if (minutes2 == 0) minutes2 = '00';
			if (hours2 >= 12) {
					if (hours2 == 12) {
							hours2 = hours2;
							minutes2 = minutes2 + " PM";
					} else if (hours2 == 24) {
							hours2 = 11;
							minutes2 = "59 PM";
					} else {
							hours2 = hours2 - 12;
							minutes2 = minutes2 + " PM";
					}
			} else {
					hours2 = hours2;
					minutes2 = minutes2 + " AM";
			}

			$('.slider-time2').html(hours2 + ':' + minutes2);
		}
	});
});

// Slider for distance
$(function() {
	$("#slider-range2").slider({
    range: true,
    min: 0,
    max: 10,
    step: 1,
    values: [4, 6],
    slide: function (e, ui) {
        var dist1 = Math.floor(ui.values[0]);

				d1 = dist1;
        dist1 = dist1 + ' mile';
        if (d1 > 1) dist1 = dist1 + 's';


        $('.slider-dist').html(dist1);

        var dist2 = Math.floor(ui.values[1]);

       	d2 = dist2;
        dist2 = dist2 + ' mile';
        if (d2 > 1) dist2 = dist2 + 's';

        $('.slider-dist2').html(dist2);
    	}
	});
});
