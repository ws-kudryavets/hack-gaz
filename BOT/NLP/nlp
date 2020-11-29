'''
usage :

python main.py http://www.ikea.com/ms/ru_RU/img/ikea_near_you/local_events/443_local_events/HR/april14/povar.pdf
'''


import gc
import os

import joblib
import numpy as np
import pandas as pd
import pytesseract
import requests
from pdf2image import convert_from_path
# pip3 install pdfminer.six
import pdfminer.high_level 

# draws pie plots
from utils.helper import *

import sys

gc.enable()

np.random.seed(7)

pytesseract.pytesseract.tesseract_cmd = "A:/Tesseract-OCR/tesseract.exe"

try:
    from PIL import Image
except ImportError:
    import Image


class MODEL:
    '''
    implements tf 2 layer model {dense, relu, dense, sigmoid} X {20000, 512, 200}
    '''

    def __init__(self):
        self.first_layer_weights = joblib.load('first_layer_weights')
        self.first_layer_biases = joblib.load('first_layer_biases')

        self.second_layer_weights = joblib.load('second_layer_weights')
        self.second_layer_biases = joblib.load('second_layer_biases')

    def predict(self, TEST):
        w = np.empty([len(TEST), self.first_layer_weights.shape[1]])
        TEST.dot(self.first_layer_weights, out=w)

        w += self.first_layer_biases
        TEST2 = np.maximum(w, 0)

        w = np.empty([len(TEST2), self.second_layer_weights.shape[1]])
        TEST2.dot(self.second_layer_weights, out=w)

        def sigmoid(X):
            return 1/(1+np.exp(-X))

        w += self.second_layer_biases
        out = sigmoid(w)
        return out


# initialize the model
MODEL = MODEL()  # models.load_model("MODEL/model_back_200.h5")
TOKENIZE = joblib.load("VECT/vectorizer_back_200.vect")
MATCH_GAZPROMBANK = pd.read_hdf('weights_v200.hdf', 'df')


def find_match(vector):
    '''
    calculates top 5 matches across gazprombank vacancies
    using general skills metric - 'top200'
    '''
    MATCH = MATCH_GAZPROMBANK.generalSkills_v200.apply(
        lambda wa: np.sum(wa * vector)).values.tolist()
    score = list(zip(MATCH_GAZPROMBANK.name.values.tolist(), MATCH))
    score.sort(key=lambda x: x[1])

    return (score[-5:], None)


def ocr(pages):
    '''
    uses pytesseract to ocr files + requires rus language data in
    tesdata
    '''
    S = ''
    i = 1
    for page in pages:
        image_name = "TEMP/Page_" + str(i) + ".jpg"
        page.save(image_name, "JPEG")
        i = i + 1
        # нет stringBuilder
        S += pytesseract.image_to_string(Image.open(image_name),
                                         lang='rus+eng')

    return S


def read_pdf():
	f= open('tmp.txt', 'w') 
	with open("tmp.pdf", 'rb') as file:
		pdfminer.high_level.extract_text_to_fp(file, f)
	f.close()
	handle = open("tmp.txt", "r")
	data = handle.readlines() # read ALL the lines!
	handle.close()
	#print(data)
	return " ".join(data)
	
"""
def read_pdf():
    '''
    reads in  saved pdf
    '''
    someResume = text = extract_text("tmp.pdf")
    if someResume:
        return someResume
    else:
        pages = convert_from_path("tmp.pdf", 350)
        return ocr(pages)
"""

def get_pdf_by_link(linkPdf):
    '''
    gets pdf by link
    '''
    response = requests.get(linkPdf)
    with open('tmp.pdf', 'wb') as f:
        f.write(response.content)
    return read_pdf()


def _estimate(chat_id):
    linkPdf = "http://gpb2.hack48.ru/pdf/"+str(chat_id)+".pdf"
    pdf_text = get_pdf_by_link(linkPdf)
    if pdf_text:
        S, vector = get_plot_and_tags(pdf_text,
                                      12,
                                      prepare_text,
                                      TOKENIZE,
                                      MODEL,
                                      L=list(range(1000)))
        gas, _ = find_match(vector)

        S = get_plot_and_tags(
            pdf_text, N=12, prepare_text=prepare_text, tokenize=TOKENIZE, model=MODEL)
        labels, sizes = list(zip(*S[0]))
        _ = draw_profile(sizes, labels, Name=str(chat_id))
        return gas, S
"""
for i in range (1,15):
	LINK = "http://gpb.hack48.ru/resume/"+str(i)+".pdf"
	print (LINK)
"""	
chat_id = 230637210
gas, S = _estimate(str(chat_id))
for g in gas:
    print (g[0])
print()

