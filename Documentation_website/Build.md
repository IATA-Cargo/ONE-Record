
# Build ONE Record API ontology documentation

**(1) Install pyLODE with pip**
```bash
$ pip install pylode
```

**(2) Generate HTML document from TTL file**
```bash
$ python -m pylode ONE-Record-API-Ontology.ttl -o minimal.html
```

**(3) Open Documentation**
```bash
$ open minimal.html
```

# Build ONE Record API specification documentation

**(1) Install MkDocs and Material for MkDocs**
```bash
$ pip install mkdocs mkdocs-material
```

**(2) Start built-in development server to preview documentation**
```bash
$ mkdocs serve
INFO     -  Building documentation...
INFO     -  Cleaning site directory
INFO     -  Documentation built in 0.58 seconds
INFO     -  [09:59:34] Watching paths for changes: 'docs', 'mkdocs.yml'
INFO     -  [09:59:34] Serving on http://127.0.0.1:8000/
```


**(3) Resolve symlinks, and publish documentation to GitHub Pages**
```bash
$ rm -rf docs/changelog.md; cp CHANGELOG.md docs/changelog.md
$ rm -rf docs/license.md; cp ../../LICENSE docs/license.md
$ rm -rf docs/assets/ONE-Record-API-Ontology.ttl; cp ONE-Record-API-Ontology.ttl docs/assets/ONE-Record-API-Ontology.ttl
$ rm -rf docs/assets/ONE-Record-API-Class-Diagram.md; cp ONE-Record-API-Class-Diagram.md docs/assets/ONE-Record-API-Class-Diagram.md
$ rm -rf docs/assets/ONE-Record-API-OpenAPI.yaml; cp ONE-Record-API-OpenAPI.yaml docs/assets/ONE-Record-API-OpenAPI.yaml
$ rm -rf docs/assets/ONE-Record-API-Ontology.csv; cp ONE-Record-API-Ontology.csv docs/assets/ONE-Record-API-Ontology.csv
$ mkdocs gh-deploy --ignore-version
$ ln -fs ../CHANGELOG.md docs/changelog.md
$ ln -fs ../../../LICENSE docs/license.md
$ mkdir -p docs/assets
$ ln -fs ../../ONE-Record-API-Ontology.ttl docs/assets/ONE-Record-API-Ontology.ttl
$ ln -fs ../../ONE-Record-API-Class-Diagram.md docs/assets/ONE-Record-API-Class-Diagram.md
$ ln -fs ../../ONE-Record-API-OpenAPI.yaml docs/assets/ONE-Record-API-OpenAPI.yaml
$ ln -fs ../../ONE-Record-API-Ontology.csv docs/assets/ONE-Record-API-Ontology.csv
```
*This creates / uses the branch gh-pages to deploy the documentation and make it available as GitHub page*


