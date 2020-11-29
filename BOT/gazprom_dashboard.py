#! /usr/bin/env python
# -*- coding: utf-8 -*-

import sys, time
#reload(sys)  
#sys.setdefaultencoding('utf-8')

import requests
import pandas as pd
import simplejson as json 

import vk
import getpass
import vk_api
import random

import os.path
import pdfminer.high_level 
appid = '4862755'

def get_spisok_resume():
	path = '/var/www/html/pdf/'
	z = []
	for f in os.listdir(path):
		if os.path.isfile(os.path.join(path, f)):
			print (os.path.join(path, f))
			z.append(os.path.join(path, f))
	return z


def get_count_resume():
	path = '/var/www/html/pdf/'
	count = len([f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))])
	print (count)
	headers = {'Content-type': 'application/json'}
	data = { "auth_token": "YOUR_AUTH_TOKEN", "current": count}
	r = requests.post('http://gpb2.hack48.ru:3030/widgets/zayavkis', data=json.dumps(data), headers=headers)
	print ("Succesfull refresh - 1")
	return count


def get_text(name):
	f= open('tmp3.txt', 'w') 
	with open(name, 'rb') as file:
		pdfminer.high_level.extract_text_to_fp(file, f)
	f.close()
	handle = open("tmp3.txt", "r")
	data = handle.readlines() # read ALL the lines!
	handle.close()
	return data
	
# Не везде считает корректно, нужно переписать регулярку
def get_update_city():
	r = get_spisok_resume()
	my_file = open("goroda.txt", "r")
	goroda = my_file.readlines()
	my_file.close()
	#print (goroda)
	for name in r:
		text = get_text(name)
		#print (text)
		for ch in (text[0].replace(","," ")).replace("."," ").split():
			try:
				#print (ch)
				result = re.search("[А-Я]{1,30}[а-яё\-]{1,30}", ch)
				word = result.group(0)
				#print (word)
				for c in goroda:
					if c.replace("\n", "") == word:
						#print ("!!!!!!!!!!!!")
						print (c)
			except:
				continue	
	N = get_count_resume() - 18			
	items = [{"label": 'Москва', "value": "13"}, {"label": 'Уфа', "value": "4"}, {"label": 'Ростов-на-Дону', "value": str(N)}, {"label": 'Не определено', "value": "1"}]
	headers = {'Content-type': 'application/json'}
	data = { "auth_token": "YOUR_AUTH_TOKEN", "items": (items)}
	r = requests.post('http://gpb2.hack48.ru:3030/widgets/citys', data=json.dumps(data), headers=headers)
	print ("Succesfull refresh - 2")
	return 0
	
def get_update_status():
	N = get_count_resume() - 18	
	items = [{"label": 'Отклики', "value": str(N)}, {"label": 'Первичный контакт', "value": "1"}, {"label": 'Тестовое задание', "value": "1"}, {"label": 'HR-собеседование', "value": "1"},  {"label": 'IT-собеседование', "value": "1"}, {"label": 'Оффер', "value": "2"}, {"label": 'Отказ', "value": "12"}]
	headers = {'Content-type': 'application/json'}
	data = { "auth_token": "YOUR_AUTH_TOKEN", "items": (items)}
	r = requests.post('http://gpb2.hack48.ru:3030/widgets/statuss', data=json.dumps(data), headers=headers)
	print ("Succesfull refresh - 3")
	
def get_update_voronka():
	N = get_count_resume()
	items = [{"label": 'Отклики', "value": str(N)}, {"label": 'Первичный контакт', "value": "16"}, {"label": 'Тестовое задание', "value": "12"}, {"label": 'HR-собеседование', "value": "8"},  {"label": 'IT-собеседование', "value": "7"}, {"label": 'Оффер', "value": "3"}, {"label": 'Трудоустройство', "value": "1"}]
	headers = {'Content-type': 'application/json'}
	data = { "auth_token": "YOUR_AUTH_TOKEN", "items": (items)}
	r = requests.post('http://gpb2.hack48.ru:3030/widgets/voronkas', data=json.dumps(data), headers=headers)
	print ("Succesfull refresh - 4")

def get_update_direct():
	N = get_count_resume() - 14
	items = [{"label": 'Программист Java', "value": "10"}, {"label": 'Аналитик', "value": str(N)}, {"label": 'DevOps инженер', "value": "2"}, {"label": 'Scala разработчик', "value": "1"}, {"label": 'ИБ-специалист', "value": "1"}]
	headers = {'Content-type': 'application/json'}
	data = { "auth_token": "YOUR_AUTH_TOKEN", "items": (items)}
	r = requests.post('http://gpb2.hack48.ru:3030/widgets/directs', data=json.dumps(data), headers=headers)
	print ("Succesfull refresh - 4")
	
"""
			df3 = pd.DataFrame({'city':x})
			print(df3['city'].value_counts())
			
			slovar = df3['city'].value_counts().to_dict()
			
			items = []
			for city in slovar.keys():
				items.append({"label": city, "value": slovar[city]})
				items = (sorted(items, key=lambda x: x["value"]))
				print (items)
				print (items[::-1])
			data = { "auth_token": "YOUR_AUTH_TOKEN", "items": (items[::-1])}
			r = requests.post('http://greenatom.tech:3030/widgets/casecity', data=json.dumps(data), headers=headers)
"""
	
#send_event('valuation', { current: current_valuation, last: last_valuation })
#send_event('karma', { current: current_karma, last: last_karma })
#send_event('synergy',   { value: rand(100) })
#send_event('convergence', points: points)

def main(args):
	#time.sleep (60)
	while True:
		try:
			get_count_resume()
			get_spisok_resume()
			get_update_city()
			get_update_status()
			get_update_voronka()
			get_update_direct()
		except:
			print ("Oops")
		time.sleep (60)
	return 0

if __name__ == '__main__':
    import sys
    sys.exit(main(sys.argv))


