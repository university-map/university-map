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


def main():
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

if __name__ == "__main__":
    main()