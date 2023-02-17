import sys
import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import xml.etree.ElementTree as ET
import openai

# Set up the OpenAI API client
openai.api_key = "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"


def summarize_text(text):
    model_engine = "text-davinci-003"
    prompt = f"Résumer le texte suivant: {text}"
    completion = openai.Completion.create(
        engine=model_engine,
        prompt=prompt,
        max_tokens=2000,
        n=1,
        stop=None,
        temperature=0.5,
    )
    response = completion.choices[0].text
    return response


if __name__ == '__main__':
    link = sys.argv[1]
    identifier = sys.argv[2]
    service = Service('/usr/bin/chromedriver')
    driver = webdriver.Chrome(service=service)
    driver.get(link)

    try:
        pre_element = driver.find_element(
            By.CLASS_NAME, "field.field--name-field-bloc-paragraphe.field--type-entity-reference-revisions.field--label-hidden.field__items")
        text = pre_element.text
        driver.quit()
        summary = summarize_text(text)
        if summary:
            with open('resumes.json', 'r') as f:
                data = json.load(f)

                data[identifier] = summary

            with open('resumes.json', 'w') as f:
                json.dump(data, f)

            print(json.dumps({'summary': summary}))
        else:
            print(json.dumps({'error': 'Impossible de résumer le texte'}))
    except:
        # If there was an error finding the text to summarize, print an error message
        print(json.dumps(
            {'error': 'Impossible de trouver le texte à résumer'}))
