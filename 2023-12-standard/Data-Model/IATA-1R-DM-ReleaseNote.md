![image](https://user-images.githubusercontent.com/58464775/161543622-0c3ea890-b331-4a6b-86b7-fd41b08370eb.png)
# ONE Record Data Model

## Release note - Ontology version 3.0.0

This ONE Record data model release is the result of the work achieved by the dedicated task force since the last version endorsed by the COTB in April 2023. This version aims to be a stable version that will be the basis of ONE Record implementations in the near future. With this in mind, stakeholders are highly encouraged to base their implementations on this release (including API 2.0.0 specifications as well).

### Attached deliverables
* [Design Principles](https://github.com/IATA-Cargo/ONE-Record/blob/master/2023-12-standard/Data-Model/IATA-1RDM-DesignPrinciples.md)
* [Object Structure](https://github.com/IATA-Cargo/ONE-Record/blob/master/2023-12-standard/Data-Model/IATA-1R-DM-ObjectsStructure.md)
* [Vizualisation of the Data Model](https://github.com/IATA-Cargo/ONE-Record/blob/master/2023-12-standard/Data-Model/1R%20Data%20Model%20-%20December%202023%20-%203.0.0.pdf)
* [Core Ontology](https://github.com/IATA-Cargo/ONE-Record/blob/master/2023-12-standard/Data-Model/IATA-1R-DM-Ontology.ttl)
* [Code List Ontology](https://github.com/IATA-Cargo/ONE-Record/blob/master/2023-12-standard/Data-Model/IATA-1R-CCL-Ontology.ttl)
* [Scope Extension document](https://github.com/IATA-Cargo/ONE-Record/blob/master/2023-12-standard/Data-Model/IATA-1RDM-ScopeExtension.md)

### Scope of the release
This release includes improvements and scope extensions. More details on the release can be found in the [ChangeLog](https://github.com/IATA-Cargo/ONE-Record/blob/master/December-2022-standard/Data-Model/IATA-1R-DM-ChangeLog-vCOTB-December2022.md)

* Redesign of the overall objects architecture with addition of PhysicalLogisticsObject, LogisticsService, LogisticsActivity and LogisticsAction superclass
* Redesign of Organization and Actor modelling based on FOAF standard ad w3c recommended practices
* Redesign of Distribution scope with new objects and review of data and object properties
* Removal of old deprecated objects and data properties
* Redesign of enumerations and code lists with the addition of CodeListElement object and dedicated Code List ontology

### Comments
As with previous releases of the Data Model, this is still a work in progress and improvements can, and will, be made after the endorsement by the COTB. Note that all data properties that are to be removed are set as deprecated in the ontology for backward compatibility purposes. These will be deleted for next version.
