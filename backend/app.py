from flask import Flask, jsonify
import xmltodict
import xml.etree.ElementTree as ET
import json
import subprocess

app = Flask(__name__)


def get_link(identifier):
    with open('data.xml', 'r') as f:
        data = f.read()
        root = ET.fromstring(data)
        for item in root.findall(".//item"):
            item_id = item.find(
                ".//{http://purl.org/dc/elements/1.1/}identifier").text
            if item_id == str(identifier):
                link = item.find(
                    ".//{http://purl.org/dc/elements/1.1/}link").text
                return link
        return None


@app.route('/')
def get_json():
    with open('data.xml', 'r') as f:
        data = xmltodict.parse(f.read())
    response = jsonify(data)
    response.headers.add('Content-Type', 'application/json')
    return response


@app.route('/lois/<int:identifier>', methods=['GET', 'POST'])
def get_resume(identifier):
    with open('resumes.json', 'r') as f:
        lois = json.load(f)
    if str(identifier) in lois:
        return jsonify(lois[str(identifier)])
    else:
        link = get_link(identifier)
        if link is not None:
            result = subprocess.run(
                ['python', 'getresume.py', link, str(identifier)], capture_output=True, text=True)
            if result.returncode == 0:
                new_resume = json.loads(result.stdout.strip())
                return jsonify(new_resume)

        return jsonify({'error': 'Impossible de récupérer le résumé'})


if __name__ == '__main__':
    app.run(debug=True)
