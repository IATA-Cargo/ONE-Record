This folder contains all the documents of the mkdocs.
The following files will be copied automatically when serving or building the mkdocs
- docs/changelog.md
- docs/license.md
- docs/assets/ONE-Record-API-Ontology.ttl
- docs/assets/ONE-Record-API-Class-Diagram.md
- docs/assets/ONE-Record-API-OpenAPI.yaml
- docs/assets/ONE-Record-API-Ontology.csv
- docs/assets/ONE-Record-API-Collections.postman_collection

In case files are not copied, please use the following script:

```
rm -rf docs/changelog.md; cp CHANGELOG.md docs/changelog.md
rm -rf docs/license.md; cp ../../LICENSE docs/license.md
rm -rf docs/assets/ONE-Record-API-Ontology.ttl; cp ONE-Record-API-Ontology.ttl docs/assets/ONE-Record-API-Ontology.ttl
rm -rf docs/assets/ONE-Record-API-Class-Diagram.md; cp ONE-Record-API-Class-Diagram.md docs/assets/ONE-Record-API-Class-Diagram.md
rm -rf docs/assets/ONE-Record-API-OpenAPI.yaml; cp ONE-Record-API-OpenAPI.yaml docs/assets/ONE-Record-API-OpenAPI.yaml
rm -rf docs/assets/ONE-Record-API-Ontology.csv; cp ONE-Record-API-Ontology.csv docs/assets/ONE-Record-API-Ontology.csv
rm -rf docs/assets/ONE-Record-API-Collections.postman_collection; cp ONE-Record-API-Collections.postman_collection docs/assets/ONE-Record-API-Collections.postman_collection
```
