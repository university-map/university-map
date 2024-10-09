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

## Acknowledgments for Data and Code Sources

- Wikipedia
- Google Map
- Unsplash
- OpenStreetMap, Leaflet, and all free software
- Each University's Official Website