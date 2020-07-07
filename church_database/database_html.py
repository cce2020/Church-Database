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
print("\n<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Spartan\">  <!-- Access to Google Fonts API -->")
print("<div style=\"overflow-x:auto;\">")

# Checkbox for College Ministry
print("<input type=\"checkbox\" id=\"colMin\" onclick=\"myFunction()\">")
print("    <label for=\"colMin\">\n\U0001F392: College Ministry Available</label><br>")


# Checkbox for Time
print()
print("<button type=\"button\" class=\"collapsible\">Time</button>")
print("<div class=\"content\">")
for i in range(6,24):
    print("    <input type=\"checkbox\" name=\"time\" id=\"{}{}\">".format(i, i+1))
    time = "{}:00".format(i)
    hr1 = mil2std(time)
    time = "{}:00".format(i+1)
    hr2 = mil2std(time)
    print("        <label for=\"{}{}\"> {} - {}</label><br>".format(i, i+1, hr1, hr2))
print("</div>")

# Checkbox for Distnace
print()
print("<button type=\"button\" class=\"collapsible\">Distance (miles)</button>")
print("<div class=\"content\">")
for i in range(1,11):
    print("    <input type=\"checkbox\" name=\"distance\" id=\"{}\">".format(i))
    print("        <label for=\"{}\"> {}</label><br>".format(i, i))
print("</div>")

# Checkbox for Denomination
print()
print("<button type=\"button\" class=\"collapsible\">Denominations</button>")
print("<div class=\"content\">")
denomination = ['Angelican', 'Baptist', 'Lutheranism', 'Christian Church', 'Presbyterian', 'Methodist', 'Episcopal']
for i in denomination:
    print("    <input type=\"checkbox\" name=\"denomination\" id=\"{}\">".format(i))
    print("        <label for=\"{}\"> {}</label><br>".format(i, i))
print("</div>")

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
i = 2
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
    time = sheet['H{}'.format(i)].value # Sunday Worship Time

    # Convert military to standard time
    if time:
        time = mil2std(time)

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

    i = i + 1
    name = sheet['A{}'.format(i)].value
    if not name:
        notEmpty = 0

print()
print("</table>\n</div>\n")

sys.stdout.close()
