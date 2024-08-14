
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


**(3) Build the full website**
```bash
$  make build

```
*This creates / uses the branch gh-pages to deploy the documentation and make it available as GitHub page*


