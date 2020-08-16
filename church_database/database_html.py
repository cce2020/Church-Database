import openpyxl
import emoji
import sys

# Setting up Excel Document
wb = openpyxl.load_workbook('church_database.xlsx')
wb.sheetnames
sheet = wb['Sheet1']

# /Users/jeffreyliew/Documents/GitHub/Church-Database/church_database/database_html.py > /Users/jeffreyliew/Documents/GitHub/Church-Database/church_database/HTML.txt
sys.stout = open('HTML.txt', 'w')
# Copy paste into terminals
# python database_html.py > HTML.txt

# Convert military to standard time function
def mil2std(time):
    # Formating time
    tm = time.split(":")
    hr = int(tm[0])
    min = int(tm[1])

    # Add zero to minute if less than 10
    if min < 10:
        min = '0'+str(min)

    # Check if AM or PM
    apm = ''
    if hr == 0:
        apm = 'AM'
    elif hr == 24:
        apm = 'AM'
    elif hr > 11:
        apm = 'PM'
    else:
        apm = 'AM'

    # Convert military to standard time
    hr = hr%12
    if(hr == 0):
        hr = 12
    return('{}:{} {}'.format(hr, min, apm))

# Setting up HTML
print("<html>")
print("<head>")
print("    <meta charset=\"utf-8\">")
print("    <meta name=\"viewport\" content=\"width=device-width\">")
print("    <title>repl.it</title>")
print("    <link href=\"style.css\" rel=\"stylesheet\" type=\"text/css\" />")
print("</head>")

print("<body>")

# Slider for Time
print("<div class=\"wrapper\">")
print("<button type=\"button\" class=\"collapsible\">Time</button>")
print("<div class=\"content\">")
print("	<div id=\"time-range\">")
print("     <input type=\"checkbox\" id=\"timeCheck\" name=\"timeCheck\">")
print("     <label for=\"timeCheck\">Check all times?</label><br>")
print("		<p>Time Range: <span class=\"slider-time\" id=\"time1\">10:00 AM</span> - <span class=\"slider-time2\" id=\"time2\">12:00 PM</span></p>")
print("		<div id=\"slider-range\"></div>")
print("	</div>")
print("</div>\n")

# Slider for Distance
print("<button type=\"button\" class=\"collapsible\">Distance</button>")
print("<div class=\"content\">")
print("	<div id=\"dist-range\">")
print("     <input type=\"checkbox\" id=\"distCheck\" name=\"distCheck\">")
print("     <label for=\"distCheck\">Check all distances?</label><br>")
print("		<p>Distance Range: <span class=\"slider-dist\" id=\"dist1\">4 miles</span> - <span class=\"slider-dist2\" id=\"dist2\">6 miles</span></p>")
print("		<div id=\"slider-range2\"></div>")
print("	</div>")
print("</div>")

# Checkbox for Denomination
print()
print("<button type=\"button\" class=\"collapsible\">Denominations</button>")
print("<div class=\"content\">")
denomination = ['Anglican', 'Baptist', 'Lutheranism', 'Christian Church', 'Presbyterian', 'Methodist', 'Episcopal']
for i in denomination:
    print("    <input type=\"checkbox\" name=\"denomination\" id=\"{}\">".format(i))
    print("        <label for=\"{}\"> {}</label><br>".format(i, i))
print("</div>")
print("<br>")

# Checkbox for College Ministry
print("<input type=\"checkbox\" id=\"colMin\" name=\"colMin\">")
print("    <label for=\"colMin\">")
print("🎒: College Ministry Available</label><br>")
print("<br>")

print("<button type=\"button\" id= \"showResults\" onclick=\"submit()\">Click For Results</button>")

# Create Table
print()
print("<table id=\"myTable\">")
print("    <tr class=\"header\">")
print("        <th style=\"width:16%;\" onclick=\"sortTable(0)\">Name</th>")
print("        <th style=\"width:16%;\" onclick=\"sortTable(1)\">Sunday Worship Time</th>")
print("        <th style=\"width:16%;\" onclick=\"sortTable(2)\">Address</th>")
print("        <th style=\"width:16%;\" onclick=\"sortTable(3)\">Distance (miles)</th>")
print("        <th style=\"width:16%;\" onclick=\"sortTable(4)\">Denomination</th>")
print("        <th style=\"width:16%;\" onclick=\"sortTable(5)\">Contact Info</th>")
print("    </tr>")

# Initalizing the first value
notEmpty = 1
i = 2  # Starting row
emoji = ('\U0001F392')

# Run through each row
while(notEmpty):
    # Read the row and store in appropiate variables
    print()
    name = sheet['A{}'.format(i)].value # Name
    adds = sheet['B{}'.format(i)].value # Address
    dist = sheet['C{}'.format(i)].value # Distance(mi)
    link = sheet['D{}'.format(i)].value # Website Link
    deno = sheet['E{}'.format(i)].value # Denomination
    cont = sheet['F{}'.format(i)].value # Contact Email
    cMin = sheet['G{}'.format(i)].value # College Ministry

    time = ''
    timeSlot = ['H', 'I', 'J', 'K', 'L']
    for j in timeSlot:
        timeCheck = sheet['{}{}'.format(j,i)].value # Sunday Worship Time
        # Convert military to standard time
        if timeCheck:
            if j == 'H':
                if (timeCheck != 'Saturday'):
                    time = mil2std(timeCheck)
                else:
                    time = 'Saturday'
            else:
                time += '<br>'
                time += str(mil2std(timeCheck))

    # Print out HTML code
    print('    <tr>')
    # Check for college ministry
    if(cMin == 'Y'):
        cMin = emoji
        print('        <td><a href={} target="blank">{}</a>{}</td>'.format(link, name,cMin))
    else:
        print('        <td><a href={} target="blank">{}</a></td>'.format(link, name))
    print('        <td>{}</td>'.format(time))
    print('        <td>{}</td>'.format(adds))
    print('        <td>{}</td>'.format(dist))
    print('        <td>{}</td>'.format(deno))
    print('        <td>{}</td>'.format(cont))
    print('    </tr>')

    ''' Debuging on smaller scale
    i += 1
    if(i == 10):
        notEmpty = 0
    '''
    i = i + 1
    name = sheet['A{}'.format(i)].value
    if not name:
        notEmpty = 0

print()
print("</table>")
print("<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Spartan\">  <!-- Access to Google Fonts API -->")
print("<link href = \"https://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css\" rel = \"stylesheet\">")
print("<script src = \"https://code.jquery.com/jquery-1.10.2.js\"></script>")
print("<script src = \"https://code.jquery.com/ui/1.10.4/jquery-ui.js\"></script>")
print("<script src=\"script.js\"></script>")
print("</div>")
print("  </body>")
print("</html>")

sys.stdout.close()
