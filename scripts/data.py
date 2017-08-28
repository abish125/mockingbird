import os
import pandas as pd
import pickle

from books.models import Patient


data = []
f = open('data/s00318.txt')
for s in f.readlines():
    data= data + [s]
f.close()
b=""
e=""
full = []    
for d in range(len(data)):
    if data[d].split('\t')[1]=="ch":
        for a in range(len(data[d].split('\t'))):
            if "=" in data[d].split('\t')[a]:
                b,e,data[d].split('\t')[a] = data[d].split('\t')[a].partition('=')
                #print data[d].split('\t')[a]
        full = full +[data[d].split('\t')]
        
full = pd.DataFrame(full)
full.columns = ['a','b','c','d','e','s', 't','u','v','x','y','z',]

cg = []
f = open('data/cg-dict.txt')
for s in f.readlines():
    cg = cg + [s]
f.close()
cg2 = []
for d in cg:
    cg2 = cg2 + [["id="+d.split('\t')[0]] + [d.split('\t')[1].strip()]]

cg = pd.DataFrame(cg2)
cg.columns = ['s', 't']
cg.head()

print(len(full.d))
for a in range(len(full.d)):
    for b in range(len(cg.s)):
        if full.d[a]==cg.s[b]:
            full.d[a]=cg.t[b]
            print(cg.t[b], a)
            
pickle.dump( d, open( "save.p", "wb" ) )
#print(full.head())

'''
https://physionet.org/physiobank/tutorials/using-mimic2/
wf = waveform data
nu = Numerics Record
ad [1]	Additive (to solution)
ce [3]	Census Event [transfer of patient]
ch [4]	Chart Event [event recorded in the ICU]
de [5]	Delivery
ic [6]	ICD9 [diagnosis code]
io [8]	I/O Event
me [10]	Med[ication] Event
po [11]	Physician Order
so [12]	Solution
to [13]	Total I/O [fluid balance] Event'


https://physionet.org/physiobank/database/
Computing in Cariology Challenge Databases
These databases contain the records used in the PhysioNet/CinC challenges. At the top of each database page is a link to its respective challenge page. See also the archived software contributions of the challenge entrants.
2009 Database. Predicting acute hypotensive episodes.
2010 Database. Mind the gap.
2011 Database. Improving the quality of ECGs collected using mobile phones.
2012 Database. Predicting mortality of ICU patients.
2013 Database. Non-invaside fetal ECG.
2014 Database. Robust detection of heart beats in multimodal data.
2015 Database. Reducing false arrhythmia alarms in the icu.
2016 Database. Classification of normal/abnormal heart sound recordings.

'''

'''
#code that i may need to reuse (this is how you go from dataframe to django)
import pickle
from books.models import Patient
df = pickle.load(open("df.p","rb"))
entries = df.to_dict('records')
p=[]
for e in entries:
    p = p + [Patient(**e)]
for q in p:
    q.save()
'''
