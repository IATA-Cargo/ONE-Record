SITE_DIR := $(CURDIR)/site
VERSION  := 2.0.0-dev

install:
	pip install pip --upgrade
	pip install -r requirements.txt

upgrade:
	pip install pip --upgrade
	pip install -r requirements.txt --upgrade

copy-assets:
	rm -rf docs/API-Security/changelog.md; cp ../working_draft/API/CHANGELOG.md docs/API-Security/changelog.md
	rm -rf docs/General/license.md; cp ../LICENSE docs/General/license.md
	rm -rf docs/API-Security/assets/ONE-Record-API-Ontology.ttl; cp ../working_draft/API/ONE-Record-API-Ontology.ttl docs/API-Security/assets/ONE-Record-API-Ontology.ttl
	rm -rf docs/API-Security/assets/ONE-Record-API-Class-Diagram.md; cp ../working_draft/API/ONE-Record-API-Class-Diagram.md docs/API-Security/assets/ONE-Record-API-Class-Diagram.md
	rm -rf docs/API-Security/assets/ONE-Record-API-OpenAPI.yaml; cp ../working_draft/API/ONE-Record-API-OpenAPI.yaml docs/API-Security/assets/ONE-Record-API-OpenAPI.yaml
	rm -rf docs/API-Security/assets/ONE-Record-API-Collections.postman_collection; cp ../working_draft/API/ONE-Record-API-Collections.postman_collection docs/API-Security/assets/ONE-Record-API-Collections.postman_collection

serve:
	$(MAKE) copy-assets
	mkdocs serve

build:
	$(MAKE) copy-assets
	mkdocs build
	mkdir -p $(SITE_DIR)/ns/api/$(VERSION)
	echo "<!DOCTYPE html> <meta charset=\"utf-8\"> <title>Redirecting to versioned ontology</title> <meta http-equiv=\"refresh\" content=\"0; URL=./2.0.0-dev\"> <link rel=\"canonical\" href=\"2.0.0-dev\">" > $(SITE_DIR)/ns/api/index.html
	python -m pylode ONE-Record-API-Ontology.ttl -o $(SITE_DIR)/ns/api/$(VERSION)/index.html


deployGH:	
	$(MAKE) copy-assets
	mkdocs gh-deploy --ignore-version --no-history

clean:
	rm -rf $(SITE_DIR)

ghp-deploy: 
	ghp-import -m "updating docs" --no-history -p site

mike-deploy:
	$(MAKE) copy-assets
	mike deploy --push development

mike-release:
	$(MAKE) copy-assets
	mike deploy --push --update-aliases ${{ github.event.release.tag_name }} latest

.PHONY: install upgrade copy-assets serve build deployGH clean ghp-deploy
