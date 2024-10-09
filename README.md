# University Map

![](./images/demo.png)

The University Map project is an interactive map of universities around the world. It is built with ReactJS and Leaflet. See live demo at [https://university-map.github.io](https://university-map.github.io).
## How to Run

### Run Source Code

Install NodeJS v20.10.0.
Install Python 3 and install `PyYAML`.

```bash
# Generate or update public/universities/index.json
cd university-map
pip install -r ./scripts/requirements.txt
python scripts/build-index.py

npm install
npm run dev
```

Go to http://localhost:5173.

### Run Docker Container

```bash
docker build -t university-map .
docker run --name myapp --rm -d -p 8080:8080 university-map
```

Go to http://localhost:8080.
Remove the container.

```bash
docker stop myapp
```

### How to Add Universities

Navigate to `university-map/public/universities`, you will see a directory structure like this:

```
.
├── Australia
│   ├── Australian National University
│   │   └── en.yml
│   ├── Monash University
│   │   └── en.yml
...
```

Each university has a directory named after its country and its name. Inside the directory, there is a file named `en.yml` which contains the university's information in YAML format. You can add a new university by creating a new directory and a new `en.yml` file. Here is an example of the `en.yml` file:

```yaml
name: University of Southern California
address: University Park, Los Angeles, CA 90089 United States
website: https://www.usc.edu/
locations:
  - name: University Park
    coordinates: [34.02265420970884, -118.28526720714093]
acronyms: [USC]
banner: https://www.usc.edu/wp-content/uploads/2023/02/48244487066_842b6fedce_o-768x432.jpg
introduction: >-
  The University of Southern California (USC) is a prominent private research university located in Los Angeles, California.
  Founded in 1880 by Robert Maclay Widney, it is the oldest private research university in California.
gallery:
  [
    "https://annenberg.usc.edu/sites/default/files/styles/article_full_content_1240x600/public/usc_campus_bovard_auditorium.jpg",
    "https://gradadm.usc.edu/wp-content/uploads/2024/01/20060214_6992jpg_7304625758_o-Doheny-Front-copy-768x432.webp",
    "https://today.usc.edu/wp-content/uploads/2017/08/11_Great-Lawn-768x432.jpg"
  ]
```

| Field | Description |
| --- | --- |
| `name` | The name of the university |
| `address` | The address of the university |
| `website` | The official website of the university |
| `locations` | A list of locations of the university. Each location has a `name` and `coordinates` (latitude and longtitude)  |
| `acronyms` | A list of acronyms of the university |
| `banner` | The URL of the banner image of the university |
| `introduction` | A brief introduction of the university |
| `gallery` | A list of URLs of images of the university |

Whenever adding an university, you need to run the following command to update the `index.json`:

```bash
cd university-map
python scripts/build-index.py
```

## Acknowledgments for Data and Code Sources

- Wikipedia
- Google Map
- Unsplash
- OpenStreetMap, Leaflet, and all free software
- Each University's Official Website