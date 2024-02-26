import os
import sys
import yaml
import json


def get_project_root():
    # if this script is running from the same folder of package.json, the folder is the root
    f = os.path.normpath(__file__)
    if f.replace("\\", "/").endswith("university-map/scripts/build-index.py"):
        return os.path.dirname(os.path.dirname(f))

    if "PROJECT_ROOT" in os.environ:
        return os.environ["PROJECT_ROOT"]

    print("\x1b[31mPlease set PROJECT_ROOT.\x1b[0m")
    sys.exit(1)


def get_univ_locations(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        try:
            content = yaml.safe_load(file)
            return content["locations"]
        except yaml.YAMLError as e:
            print(f"Error reading {file_path}: {e}")
            sys.exit(1)


def get_keywords(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        try:
            content = yaml.safe_load(file)
            keywords = []
            keywords.append(content["name"])
            keywords += content["acronyms"]
            return [kw.upper() for kw in keywords]
        except yaml.YAMLError as e:
            print(f"Error reading {file_path}: {e}")
            sys.exit(1) 

def build_locations_json():
    index_data = []
    root_path = os.path.join(get_project_root(), "public/universities")
    countries = [d for d in os.listdir(root_path) if os.path.isdir(os.path.join(root_path, d))]
    for country in countries:
        country_path = os.path.join(root_path, country)
        universities = [d for d in os.listdir(country_path)]
        for univ in universities:
            univObj = { "name": univ, "country": country }
            file_path = os.path.join(country_path, univ, "en.yml")
            univObj["location"] = get_univ_locations(file_path)
            index_data.append(univObj)

    output_path = os.path.join(get_project_root(), "public/universities/locations.json")
    json_data = json.dumps(index_data, ensure_ascii=False, indent=2)
    with open(output_path, 'w', encoding='utf-8') as json_file:
        json_file.write(json_data)


def build_search_json():
    index = 0
    keyword_index = {}
    all_universities = []

    root_path = os.path.join(get_project_root(), "public/universities")
    countries = [d for d in os.listdir(root_path) if os.path.isdir(os.path.join(root_path, d))]
    for country in countries:
        country_path = os.path.join(root_path, country)
        universities = [d for d in os.listdir(country_path)]
        for univ in universities:
            univ_keywords = []
            univ_path = os.path.join(country_path, univ)
            langs = [f for f in os.listdir(univ_path)]
            for lang in langs:
                univ_keywords += get_keywords(os.path.join(univ_path, lang))
            for kw in univ_keywords:
                keyword_index[kw] = index
            index += 1
        all_universities += universities

    sorted_keywords_index = dict(sorted(keyword_index.items(), key=lambda x: x[0]))
    search_data = { "universities": all_universities, "keywords": list(sorted_keywords_index.keys()), "keyword_index": list(sorted_keywords_index.values()) }
    output_path = os.path.join(get_project_root(), "public/universities/search.json")
    json_data = json.dumps(search_data, ensure_ascii=False, indent=2)
    with open(output_path, 'w', encoding='utf-8') as json_file:
        json_file.write(json_data)

def main():
    build_locations_json()
    build_search_json()


if __name__ == "__main__":
    main()