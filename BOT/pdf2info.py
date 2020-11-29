#!/usr/bin/env python
# -*- coding: utf-8 -*-

import PyPDF2, sys
import re

from PIL import Image

ddd = "/var/www/html/tmp/"
import textract
import pdfminer.high_level 

def pdf_info(sname):
	name = "/var/www/html/pdf/" + sname + ".pdf"
	pdf_path = name
	pdf_url = "http://gpb2.hack48.ru/pdf/" + sname + ".pdf"
	#print()
	#print (sname)
	input1 = PyPDF2.PdfFileReader(open(name, "rb"))
	read_pdf = input1
	number_of_pages = read_pdf.getNumPages()
	page = read_pdf.getPage(0)
	page_content = page.extractText()
	print (page_content)
	phone = ""
	print ("111")
	for ch in page_content.split():
		try:
			result = re.search(r'\+7\(\d\d\d\)\d\d\d\d\d\d\d', ch)
			phone = result.group(0)
			break
		except:
			continue
	email = ""
	for ch in page_content.split():
		try:
			result = re.search("[a-zA-Z0-9\.\_]{1,100}[@][a-z]{2,8}\.[a-z]{2,4}", ch)
			email = result.group(0)
			email = email.replace(phone[7:],"")
			break
		except:
			continue	
	print (name)
	text = get_txt(name)
	print ("222")
	utag = []
	for ch in (text[0].replace(","," ")).replace("."," ").split():
		try:
			line = re.findall('[A-Za-z\#\+]', ch)
			a= ""
			if len(line)>0:
				for ch in line:
					a = a + ch
				utag.append(a.lower())
		except:
			continue	
	print (utag)
	i = 0
	uname = ""
	ufamily = ""
	for ch in (text[0].replace(","," ")).replace("."," ").split():
		if i == 0:
			try:
				result = re.search("[А-Я]{1,100}[а-яё]{1,100}", ch)
				uname = result.group(0)
			except:
				uname = ""
		if i == 1:
			try:
				result = re.search("[А-Я]{1,100}[а-яё]{1,100}", ch)
				ufamily = result.group(0)
				break
			except:
				ufamily = ""
		i = i + 1
	input1 = PyPDF2.PdfFileReader(open("/var/www/html/pdf/" + sname + ".pdf", "rb"))
	page0 = input1.getPage(0)
	xObject = page0['/Resources']['/XObject'].getObject()
	for obj in xObject:
		if xObject[obj]['/Subtype'] == '/Image':
			size = (xObject[obj]['/Width'], xObject[obj]['/Height'])
			data = xObject[obj].getData()
			if xObject[obj]['/ColorSpace'] == '/DeviceRGB':
				mode = "RGB"
			else:
				mode = "P"
			if xObject[obj]['/Filter'] == '/FlateDecode':
				img = Image.frombytes(mode, size, data)
				img_path = "/var/www/html/img/"+sname + ".png"
				img_url = "gpb2.hack48.ru/img/"+sname + ".png"
				img.save(img_path)
			elif xObject[obj]['/Filter'] == '/DCTDecode':
				img = open(obj[1:] + ".jpg", "wb")
				img.write(data)
				img.close()
			elif xObject[obj]['/Filter'] == '/JPXDecode':
				img = open(obj[1:] + ".jp2", "wb")
				img.write(data)
				img.close()
	z = {"id":sname, "uname":uname, "ufamily":ufamily, "email":email, "phone":phone, "img_url":img_url, "pdf_url":pdf_url, "img_path": img_path, "pdf_path" : pdf_path, "utag":utag, "status":0}
	print (z)
	return z
	
def get_txt(name):
	f= open('tmp2.txt', 'w') 
	with open(name, 'rb') as file:
		pdfminer.high_level.extract_text_to_fp(file, f)
	f.close()
	
	handle = open("tmp2.txt", "r")
	data = handle.readlines() # read ALL the lines!
	handle.close()
	
	return data
	
	
                
