from django.shortcuts import render
from django.template import *
import os
import subprocess

def index(request):
	#c = Classifier("med_targets.txt", "med_words.txt","wikipedia", "med_conf.txt", ["yes","no"])
	#c.already_started()
	#print os.getcwd()
	return render(request, 'index.html')

def scrape(request):
	import pickle
	#so first you get all the names of the url's you want to scrape
	#then you go to each site and download the text
	#then parse the text
	s = pickle.load(open("mimic_links.p","rb"))
	
	url = "https://physionet.org/physiobank/database/mimic2cdb-ps/" + s[0].strip() + s[0].strip()[:-1] + ".txt" 
	#search = 'soccer'
	cmd = ['casperjs scrape.js \'' + url + '\''] #, 'args']
	results = subprocess.check_output(cmd, shell=True, stderr=subprocess.STDOUT)
	return render(request, 'scrape.html', {'output': results})