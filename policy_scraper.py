import json
import urllib2
from bs4 import BeautifulSoup

base_link = "http://www.publicwhip.org.uk/"

policy_page_request = urllib2.Request('http://www.publicwhip.org.uk/policies.php', headers={'User-Agent' : "Magic Browser"})
list_of_policies_page = urllib2.urlopen(policy_page_request)
soup = BeautifulSoup(list_of_policies_page, 'html.parser')
table = soup.find('table', attrs={'class': 'mps'})

policies = []
for row in table.findAll('tr'):
    if 'headings' not in row.attrs['class']:
        if 'provisional' not in row.findAll('td')[1].text:
            policy = []
            policy_link = base_link + row.find('a').attrs['href']
            policy_name = row.findAll('td')[1].text
            policy.append(policy_name)

            specific_policy_page_request = urllib2.Request(policy_link, headers={'User-Agent' : "Magic Browser"})
            specific_policy_page = urllib2.urlopen(specific_policy_page_request)
            policy_page_dom = BeautifulSoup(specific_policy_page, 'html.parser')
            policy_description = policy_page_dom.find('span', attrs={'class': 'policytext'})
            policy_description_text = policy_description.text

            policy.append(policy_description_text)
            print policy
            policies.append(policy)

with open('policy_data.json', 'w') as outfile:
    json.dump(policies, outfile)
