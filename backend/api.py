from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
import xml.etree.ElementTree as ET
import json
import re

# Initialisation de l'objet Service pour utiliser le driver Chrome
service = Service('/usr/bin/chromedriver')

# Création d'un objet driver pour manipuler la page web
driver = webdriver.Chrome(service=service)
driver.get('https://www.vie-publique.fr/lois-feeds.xml')

# Récupération du contenu XML de la page web
# xml_content = driver.page_source
# Recherche de la balise pre contenant le XML
pre_element = driver.find_element("tag name", "pre")

# Récupération du contenu de la balise pre
xml_content = pre_element.text

# Fermeture du navigateur
driver.quit()


# Parsing du contenu XML à l'aide de la librairie ElementTree
tree = ET.ElementTree(ET.fromstring(xml_content))


# Écriture du contenu XML dans un fichier
tree.write('data.xml', encoding="utf-8")

# with open('data.json', 'w') as f:
#     json.dump(tree, f)


# # Définition du namespace utilisé dans le document XML
# ns = {'dc': 'http://purl.org/dc/elements/1.1/'}

# # Initialisation de la liste pour stocker les données
# items_data = []

# # Boucle pour parcourir tous les éléments <item> dans le document XML
# for item in tree.findall('.//item'):

#     # Initialisation d'un dictionnaire pour stocker les données de l'élément <item>
#     item_data = {}

#     # Récupération du titre de l'article
#     item_data["title"] = item.find(".//title").text

#     # Récupération de la date de publication de l'article
#     item_data["date"] = item.find(".//dc:date", ns).text

#     # Récupération du lien vers l'article
#     item_data["link"] = item.find(".//link").text

#     # Récupération de la description de l'article
#     item_data["description"] = item.find(".//description").text

#     # Ajout des données de l'élément <item> à la liste items_data
#     items_data.append(item_data)

# # Affichage des données récupérées
# print(items_data)

# # Écriture des données dans un fichier JSON
# # with open('data.json', 'w') as f:
# #     json.dump(items_data, f)
