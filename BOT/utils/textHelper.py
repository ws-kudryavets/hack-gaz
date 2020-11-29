import re

import pymorphy2
from langdetect import detect
from nltk.stem.snowball import SnowballStemmer

stemmer = SnowballStemmer("russian")
morph = pymorphy2.MorphAnalyzer()


def remove_html_tags(t):
    '''
    removes html tags
    '''
    pattern = re.compile('<.*?>')
    return re.sub(pattern, '', t)


def memorize(function):
    '''
    wraper function for storing and 
    reusing previously obtained results
    '''
    memo = {}

    def wrapper(*args):
        if args in memo:
            return memo[args]
        else:
            rv = function(*args)
            memo[args] = rv
        return rv

    return wrapper


@memorize
def parse_morph(w, normal=False):
    '''
    return word in its initial form
    #lemmatization
    '''
    if normal:
        # gives best hit? no
        p = morph.parse(w)[0]
        return p.normal_form
    else:
        return stemmer.stem(w)


def prepare_text(t, doDetect=True):
    '''
    prepares text for machine learning
    detect takes way too long
    '''
    def f(t):
        t = t.lower().strip().replace("-", " ").replace("  ", " ")

        # filter all non letters symbols except for the space
        def f(l):
            return l.isalpha() or l == ' ' or l == '-'

        t = remove_html_tags(t)
        t = ''.join(filter(f, t))
        t = ' '.join([parse_morph(w) for w in t.split()]).strip()
        return t

    if doDetect:
        if detect(t) == "ru":
            return f(t)

        else:
            return 'notRu'
    else:
        return f(t)