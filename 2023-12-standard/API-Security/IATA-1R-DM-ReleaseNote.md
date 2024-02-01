![image](https://user-images.githubusercontent.com/58464775/161543622-0c3ea890-b331-4a6b-86b7-fd41b08370eb.png)
# ONE Record API

## Release note 

**API Version:** 2.0.0

**Status:** Endorsed by COTB on December 2023

This ONE Record API release is the result of the work achieved by the dedicated task force since the last version endorsed by the COTB in November 2020. This version aims to be a stable version that will be the basis of ONE Record implementations in the near future. With this in mind, stakeholders are highly encouraged to base their implementations on this release.

## Dependencies

The ontology of the ONE Record API uses data classes defined in the ONE Record cargo ontology. 
Therefore, this ONE Record API version 2.0.0 requires the ONE Record cargo ontology 3.0.0 or later.

## Purpose

This ONE Record API specification is part of the ONE Record standard.
It defines a standard, programming language-agnostic interface for the interaction with the ONE Record Web API.
This ONE Record API specification supports the effective implementation of ONE Record compliant APIs.
It aims to provide detailed realistic use cases and examples for the various API features while maintaining the necessary technical depth for implementers.

## Prerequisites

It is assumed that the reader is familiar with the ONE Record data model, REST APIs (also known as RESTful APIs), and JSON-LD.

## Supporting Documents

- [Changelog](assets/changelog.md) contains a list of all notable changes for each version of the ONE Record API specification.
- [ONE Record API ontology](assets/ONE-Record-API-Ontology.ttl) provides the vocabulary and data classes for the data model used in the ONE Record API.
- [Tabular overview of ONE Record API ontology](assets/ONE-Record-API-Ontology.csv) is a tabular representation of the ONE Record API ontology and describes the ONE Record API data classes, their properties as attributes, descriptions and valid values.
- [ONE Record API class diagram](assets/ONE-Record-API-Class-Diagram.md) is a visual representation of the ONE Record API ontology and describes the ONE Record API data classes, their properties as attributes, and the relationship that can exist between the classes.
- [OpenAPI specification](assets/ONE-Record-API-OpenAPI.yaml) describes the prescribed API endpoint structure of a ONE Record server implementation. 
- [Postman collection](assets/ONE-Record-API-Collections.postman_collection) contains demo HTTP requests that demonstrate how to interact with the various ONE Record API endpoints and can be used to playback the examples provided in this document.

## Scope of the release
This release includes improvements and selected feature redesign. More details on the release can be found in the [ChangeLog](assets/changelog.md)

## Additional Information

You can discover more details about the API and security aspects of ONE Record by visiting the following link: https://iata-cargo.github.io/ONE-Record/
