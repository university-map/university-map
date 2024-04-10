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


def get_univ_data(univ_dir):
    locations = []
    acronyms = []
    en_yml = os.path.join(univ_dir, "en.yml")
    with open(en_yml, 'r', encoding='utf-8') as file:
        try:
            content = yaml.safe_load(file)
            name = content["name"]
            locations = content["locations"]
            acronyms += content["acronyms"]
        except yaml.YAMLError as e:
            print(f"Error reading {en_yml}: {e}")
            sys.exit(1)

    translations = [f for f in os.listdir(univ_dir) if f != "en.yml"]
    for lang in translations:
        lang_yml = os.path.join(univ_dir, lang)
        with open(lang_yml, 'r', encoding='utf-8') as file:
            try:
                content = yaml.safe_load(file)
                acronyms += content["acronyms"]
            except yaml.YAMLError as e:
                print(f"Error reading {lang_yml}: {e}")
                sys.exit(1)
    return name, locations, acronyms


def build_index_json():
    index_data = []
    root_path = os.path.join(get_project_root(), "public/universities")
    countries = [d for d in os.listdir(root_path) if os.path.isdir(os.path.join(root_path, d))]
    for country in countries:
        country_path = os.path.join(root_path, country)
        universities = [d for d in os.listdir(country_path)]
        for univ in universities:
            univObj = { "directoryName": univ, "country": country }
            univObj["name"], univObj["locations"], univObj["acronyms"] = get_univ_data(os.path.join(country_path, univ))
            index_data.append(univObj)

    output_path = os.path.join(get_project_root(), "public/universities/index.json")
    json_data = json.dumps(index_data, ensure_ascii=False, indent=2)
    with open(output_path, 'w', encoding='utf-8') as json_file:
        json_file.write(json_data)


def main():
    build_index_json()


if __name__ == "__main__":
    main()