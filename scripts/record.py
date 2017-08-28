#get the file
import os
import pandas as pd
import pickle

data = []
f = open('data/s00439.txt')
for s in f.readlines():
    data= data + [s]
f.close()
b=""
e=""
full = []    
for d in range(len(data)):
    for a in range(len(data[d].split('\t'))):
        if "=" in data[d].split('\t')[a]:
            b,e,data[d].split('\t')[a] = data[d].split('\t')[a].partition('=')
            #print data[d].split('\t')[a]
    full = full +[data[d].split('\t')]
        
full = pd.DataFrame(full)
full.columns = ['timestamp','maincode','extradata1','extradata2','extradata3','extradata4', 'extradata5','extradata6','extradata7','extradata8','extradata9','extradata10','extradata11','extradata12','extradata13','extradata14']

from books.models import Patient, Record
p = Patient.objects.get(name="s00439")
entries = full.to_dict('records')
r=[]
for e in entries:
    s= Record(**e)
    s.patient = p
    r = r + [s]
for q in r:
    q.save()
    
    