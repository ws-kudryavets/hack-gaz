import time
import random

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from fake_useragent import UserAgent


vacId = "40687051"

# Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36

# https://chromedriver.chromium.org/downloads
# put in Scripts

# fighting porve that you are not a robot :
chrome_options = Options()
#ua = UserAgent()
#userAgent = ua.random
#print(userAgent)
#chrome_options.add_argument(f'user-agent={userAgent}')

# Removes navigator.webdriver flag

# For older ChromeDriver under version 79.0.3945.16
chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_options.add_experimental_option('useAutomationExtension', False)

# For ChromeDriver version 79.0.3945.16 or over
chrome_options.add_argument('--disable-blink-features=AutomationControlled')

chrome_options.add_argument("--window-size=1920,1080")


chrome_options.add_argument("--ignore-certificate-error")
chrome_options.add_argument("--ignore-ssl-errors")

driver = webdriver.Chrome(options=chrome_options)

driver.maximize_window()
time.sleep(random.randint(1, 10))

# URL of website
url = "https://taganrog.hh.ru/account/login?backurl=%2F"

# Opening the website
driver.get(url)


time.sleep(random.randint(1, 10))


# input "bloko-input" // login
inputElement = driver.find_element_by_class_name("bloko-input")
inputElement.send_keys('popov@digitalcontest.org')


time.sleep(random.randint(1, 10))


#  input password "bloko-input bloko-input_password"
inputElement = driver.find_element_by_class_name("bloko-input_password")
inputElement.send_keys(str('sLr2sD9J'))


time.sleep(random.randint(1, 10))


# getting the button by class name
button = driver.find_element_by_class_name("bloko-button_stretched")

# clicking on the button
button.click()


time.sleep(random.randint(1, 10))


driver.get(f'https://taganrog.hh.ru/employer/vacancyresponses?vacancyId={vacId}')

time.sleep(random.randint(1, 10))


# bloko-button HH-Pager-Controls-Next HH-Pager-Control
##page = driver.find_elements_by_class_name('HH-Pager-Controls-Next')



#if page:
time.sleep(random.randint(1, 10))


# "resume-search-item__fullname"
#####names = driver.find_elements_by_class_name('resume-search-item__fullname')
# HH-Resume-ContactsAjax-Button
showPhoneBtns = driver.find_elements_by_class_name('HH-Resume-ContactsAjax-Button')


for btn in showPhoneBtns:
    btn.click()
    driver.save_screenshot(f"{vacId}/{str(names[i].text)}.png")
    time.sleep(random.randint(100, 300)/100)

    #print(str(names[i].text))
    #print(str(showPhoneBtns[i].text))
    #print("<SEP>")

    # driver.save_screenshot(f"{vacId}{str(names[i].text)}.png")
time.sleep(random.randint(1, 10))

# https://taganrog.hh.ru/employer/vacancyresponses?vacancyId=40687051&page=1
#driver.get(f'https://taganrog.hh.ru/employer/vacancyresponses?vacancyId={vacId}&page={P}')
#page = driver.find_elements_by_class_name('HH-Pager-Controls-Next')
#if page:
#    resumeCards = driver.find_elements_by_class_name(
#        'resume-search-item__header')
#P += 1


# driver.save_screenshot("test.png")

# driver.page_source.encode('utf-8')

print(driver.page_source.encode("utf-8"))
with open("test.html", "w", encoding="utf8") as f:
    f.write(driver.page_source)


driver.close()
