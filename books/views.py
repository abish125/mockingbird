from django.shortcuts import render
from django.template import *
import os

def index(request):
	#c = Classifier("med_targets.txt", "med_words.txt","wikipedia", "med_conf.txt", ["yes","no"])
	#c.already_started()
	#print os.getcwd()
	return render(request, 'index.html')
