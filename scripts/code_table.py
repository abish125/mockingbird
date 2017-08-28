import os
import pandas as pd
import pickle

cg = []
f = open('data/me-id-dict.txt')
for s in f.readlines():
    cg = cg + [s]
f.close()
cg2 = []
for d in cg:
    cg2 = cg2 + [["me"]+["id="+d.split('\t')[0]] + [d.split('\t')[1].strip()]]

cg = pd.DataFrame(cg2)
cg.columns = ['codetype', 'codeid', 'match']
print(cg.head())

from books.models import Code
entries = cg.to_dict('records')
r=[]
for e in entries:
    r= r + [Code(**e)]
for q in r:
    q.save()