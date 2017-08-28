
# coding: utf-8

# In[174]:

import os
import pandas as pd

data = []
f = open('s00318.txt')
for s in f.readlines():
    data= data + [s]
f.close()
b=""
e=""
ch = []    
for d in range(len(data)):
    if data[d].split('\t')[1]=="ch":
        for a in range(len(data[d].split('\t'))):
            if "=" in data[d].split('\t')[a]:
                b,e,data[d].split('\t')[a] = data[d].split('\t')[a].partition('=')
                #print data[d].split('\t')[a]
        ch = ch +[data[d].split('\t')]
        
ch = pd.DataFrame(ch)
ch.columns = ['s', 't','u','v','x','y','z','a','b','c','d','e']
ch = ch.index.v
#print(ch.describe())

cg = []
f = open('cg-dict.txt')
for s in f.readlines():
    cg = cg + [s]
f.close()
cg2 = []
for d in cg:
    cg2 = cg2 + [["id="+d.split('\t')[0]] + [d.split('\t')[1].strip()]]

cg = pd.DataFrame(cg2)
cg.columns = ['s', 't']
cg.head()
#ch.head()
#print cg[0]
#ch.merge(cg)
ch.lookup(cg.s,cg.t)

#print(ch.describe())

#prices.lookup(orders.Date, orders.ticker)


# In[105]:

import pickle
#so first you get all the names of the url's you want to scrape
#then you go to each site and download the text
#then parse the text
s = pickle.load(open("mimic_links.p","rb"))

#print s[0].strip()[:-1]

import pandas as pd
p = pd.read_excel('mimic_demographics.xlsx')
p.describe()

print(len(s))
x = pd.DataFrame()
for t in s:
    x = x.append(p[p['Clinical Record']==t.strip()[:-1]])
x.describe()
x.columns=[u'name', u'Waveform', u'sex', u'age', u'birthdate',u'Record Date']
x=x.drop('Waveform',1)
x=x.drop('Record Date',1)
x=x.drop_duplicates()
x=x.reset_index(drop=True)
#print(x)

pickle.dump( x, open( "df.p", "wb" ) )

#entries = x.to_dict('records')
#print(entries)


print x['name']


# In[ ]:

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


# In[104]:

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

