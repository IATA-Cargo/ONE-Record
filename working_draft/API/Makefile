SITE_DIR := $(CURDIR)/site
VERSION  := 2.0.0-dev

install:
	pip install pip --upgrade
	pip install -r requirements.txt

upgrade:
	pip install pip --upgrade
	pip install -r requirements.txt --upgrade

copy-assets:
	rm -rf docs/changelog.md; cp CHANGELOG.md docs/changelog.md
	rm -rf docs/license.md; cp ../../LICENSE docs/license.md
	rm -rf docs/assets/ONE-Record-API-Ontology.ttl; cp ONE-Record-API-Ontology.ttl docs/assets/ONE-Record-API-Ontology.ttl
	rm -rf docs/assets/ONE-Record-API-Class-Diagram.md; cp ONE-Record-API-Class-Diagram.md docs/assets/ONE-Record-API-Class-Diagram.md
	rm -rf docs/assets/ONE-Record-API-OpenAPI.yaml; cp ONE-Record-API-OpenAPI.yaml docs/assets/ONE-Record-API-OpenAPI.yaml
	rm -rf docs/assets/ONE-Record-API-Ontology.csv; cp ONE-Record-API-Ontology.csv docs/assets/ONE-Record-API-Ontology.csv
	rm -rf docs/assets/ONE-Record-API-Collections.postman_collection; cp ONE-Record-API-Collections.postman_collection docs/assets/ONE-Record-API-Collections.postman_collection

create-symlinks:
	ln -fs ../CHANGELOG.md docs/changelog.md
	ln -fs ../../../LICENSE docs/license.md
	mkdir -p docs/assets
	ln -fs ../../ONE-Record-API-Ontology.ttl docs/assets/ONE-Record-API-Ontology.ttl
	ln -fs ../../ONE-Record-API-Class-Diagram.md docs/assets/ONE-Record-API-Class-Diagram.md
	ln -fs ../../ONE-Record-API-OpenAPI.yaml docs/assets/ONE-Record-API-OpenAPI.yaml
	ln -fs ../../ONE-Record-API-Ontology.csv docs/assets/ONE-Record-API-Ontology.csv
	ln -fs ../../ONE-Record-API-Collections.postman_collection docs/assets/ONE-Record-API-Collections.postman_collection

serve:
	$(MAKE) copy-assets
	mkdocs serve

build:
	$(MAKE) copy-assets
	mkdocs build
	mkdir -p $(SITE_DIR)/ns/api/$(VERSION)
	echo "<!DOCTYPE html> <meta charset=\"utf-8\"> <title>Redirecting to versioned ontology</title> <meta http-equiv=\"refresh\" content=\"0; URL=./2.0.0-dev\"> <link rel=\"canonical\" href=\"2.0.0-dev\">" > $(SITE_DIR)/ns/api/index.html
	python -m pylode ONE-Record-API-Ontology.ttl -o $(SITE_DIR)/ns/api/$(VERSION)/index.html

deploy:	
	$(MAKE) copy-assets
	mkdocs gh-deploy --ignore-version --no-history

deployGH:	
	$(MAKE) copy-assets
	mkdocs gh-deploy --ignore-version --no-history

clean:
	rm -rf $(SITE_DIR)

ghp-deploy: 
	ghp-import -m "updating docs" --no-history -p site

.PHONY: install upggrade copy-assets create-symlinks serve build deploy clean gh-deploy
