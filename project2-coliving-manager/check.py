from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os

options = Options()
options.add_argument('--headless')
options.set_capability('goog:loggingPrefs', {'browser': 'ALL'})

driver = webdriver.Chrome(options=options)
url = 'file:///' + os.path.abspath('index.html').replace('\\', '/')
driver.get(url)

for entry in driver.get_log('browser'):
    print(entry)

driver.quit()
