# import libraries
import urllib2
from bs4 import BeautifulSoup

# specify the url
list_of_mps_page = 'https://web.archive.org/web/20161019053339/http://www.publicwhip.org.uk/mps.php'
page = urllib2.urlopen(list_of_mps_page)
soup = BeautifulSoup(page, 'html.parser')
table = soup.find('table', attrs={'class': 'mps'})
test = table.text.strip() # strip() is used to remove starting and trailing
# print test

for row in table.findAll('tr'):
    first_column = row.findAll('td')[0].contents
    third_column = row.findAll('td')[2].contents
    print mp_link
