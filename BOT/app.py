#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, request
import requests
import urllib.request
import os
import PyPDF2, sys
import re

from PIL import Image
import pdf2info

import telebot
from telebot import types
import json

import nlp

def get_сcount_resume():
	path = '/var/www/html/pdf/'
	count = len([f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))])
	print (count)
	headers = {'Content-type': 'application/json'}
	data = { "auth_token": "YOUR_AUTH_TOKEN", "current": count}
	r = requests.post('http://gpb2.hack48.ru:3030/widgets/zayavki', data=json.dumps(data), headers=headers)
	return 0
	
def get_status_text(uid):
	a = "Мы получили ваше резюме. И предлагаем вам рассмотреть вакансии."
	return a

token = "1262020270:AAGejUTQb59aspZCECSVadarFADVRHztOZU"

keyboard1 = telebot.types.ReplyKeyboardMarkup()
keyboard1.row('Привет', 'Пока')


app = Flask(__name__)

hello = ("""Привет! Я твой виртуальный интеллектуальный карьерный помощник "Газпромбанка". 👾

Ты уже крутой профессионал 😎? Вместе со мной ты можешь стать частью большой ИТ-команды! 🚀

Отправь мне своё резюме в PDF формате и я подскажу тебе актуальные вакансии персонально для тебя 🔥

Кстати! Мы активно набираем IT-специалистов, и ты можешь нам порекомендовать своих друзей /rec и получить приятный бонус 🎁.

Свой статус можно проверить при помощи команды /status 🧳 """)

status = 0

def send_message(chat_id, text):
	method = "sendMessage"
	url = "https://api.telegram.org/bot" + token + "/" + method
	data = {"chat_id": chat_id, "text": text}
	requests.post(url, data=data)
	
@app.route("/send", methods=["GET", "POST"])
def receive_update2():
	if request.method == "POST":
		print(request.json)
		chat_id = request.json["id"]
		message = request.json["message"]
		send_message(chat_id, message)
		return {"ok": True}	
			
""""			
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('uploaded_file',
                                    filename=filename))
"""

@app.route("/", methods=["GET", "POST"])
def receive_update():
	if request.method == "POST":
		print(request.json)
		try:
			sender = request.json["send"]
			if sender == '1':
				chat_id = request.json["id"]
				message = request.json["message"]
				send_message(chat_id, message)
				return {"ok": True}	
		except:
			print ("Not send")
		chat_id = request.json["message"]["chat"]["id"]
		#status = get_status(chat_id)
		try:
			text = (request.json["message"]["text"])
			print (text)
			if text == "/start":
				send_message(chat_id, hello)
			if text == "/status":
				send_message(chat_id, get_status_text(chat_id))
			if text == "/rec":
				send_message(chat_id, "Отправьте резюме друга в формате PDF")
			if text == "/test":
				send_message(chat_id, "Пройдите тест")
				search_file = sorted(os.listdir("./all_tests"))
				print (search_file)
		except:
			print ("error text")
		try:
			file_id = request.json["message"]["document"]["file_id"]
			print (file_id)
			file_name = request.json["message"]["document"]["file_name"]
			print (file_name)
			url2pdf = "https://api.telegram.org/bot" + token + "/getFile?file_id=" + file_id
			print (url2pdf)
			r = requests.get(url2pdf)
			print (r.json())
			url2pdf2 = "https://api.telegram.org/file/bot"+token+"/"+(r.json())["result"]["file_path"]
			print (url2pdf2)
			print ("/var/www/html/pdf/"+str(chat_id)+".pdf")
			#r = requests.get(url2pdf2, allow_redirects=True)
			urllib.request.urlretrieve(url2pdf2, "/var/www/html/pdf/"+str(chat_id)+".pdf")
			print ("Downloaded")
			get_сcount_resume()
			top5, z = nlp._estimate(str(chat_id))
			print (top5[4][0])
			#print (r)
			#user_info = pdf2info.pdf_info(str(chat_id))
			send_message(chat_id, "Спасибо за резюме.")
			status = 1
			#send_message(chat_id, "Вам подходят следующие вакансии. Выбери одну из них для прохождения отбора.")
			reply_markup={"keyboard":[[top5[4][0]],[top5[3][0]],[top5[2][0]]],"one_time_keyboard":True}
			
			#reply_markup={"keyboard":[["Yes","No"],["Maybe"],["1","2","3"]],"one_time_keyboard":True}
			print (reply_markup)
			text = "Вам подходят следующие вакансии. Выбери одну из них для для дальнейшего прохождения отбора."
			text = text + "\n1. "+str(top5[4][0])
			text = text + "\n2. "+str(top5[3][0])
			text = text + "\n3. "+str(top5[2][0])
			
			data = {'chat_id': chat_id, 'text': text, 'reply_markup': json.dumps(reply_markup)}
			print (data)
			url ="https://api.telegram.org/bot" + token + "/sendMessage"
			print (url)
			r = requests.get(url, data = data)
			print (r.json())
			results = r.json()
			print (results)
		except:
			print ("Not PDF")
		send_message(chat_id, "Для продолжения введите команду. Например /start или /status ")
	return {"ok": True}


