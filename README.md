election-gatineau
=================

Élections municipales Gatineau - 2013

Reflète les données ouvertes pour les élections municipales:
http://donnees.electionsmunicipales.gouv.qc.ca/

En particuler les résultats pour [Gatineau](http://donnees.electionsmunicipales.gouv.qc.ca/81017.json)

Autre page de référence pour Gatineau:
http://www.gatineau.ca/page.asp?p=la_ville/election_municipale_2013/districts_electoraux

## External feed
We are currently pulling the data feed
from http://donnees.electionsmunicipales.gouv.qc.ca/81017.json
through [YQL](http://y.ahoo.it/ftL2w):

    select * from json where url='http://donnees.electionsmunicipales.gouv.qc.ca/81017.json'

