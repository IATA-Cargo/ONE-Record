This sections contains a list of tools which are related to ONE Record.

# IATA tools

While defining the ONE Record standard, it came as an evidence that some tools were required to support the specifications.

## Ontology

Ontologies are ttl file describing all classes, data properties and how all of these are linked. Within ONE Record specifications we have a core, a code list and an API ontology. There are multiple ways to "display" the ontology apart from a plain text file.

### Ontology - Data Model

- The simplest representation provides a very simple view of all classes and properties: [https://onerecord.iata.org/ns/cargo/index-en.html](https://onerecord.iata.org/ns/cargo/index-en.html)
- We developed the Ontology Visualizer to replace old pdf versions of the ontology: [Ontology Visualizer](./ontology-visualizer.md)

### Ontology - API

- Similarly to the Data Model, we also have a simple representation of the API ontology: [https://onerecord.iata.org/ns/api/index-en.html](https://onerecord.iata.org/ns/api/index-en.html)

## API

### ONE Record API Unit Test suite

The ONE Record standard ensures a unified view of shipment data, and to prevent misinterpretation of its technical specifications, a free, locally runnable unit test suite is provided to verify API compliance using Postman or compatible software. Get more information about the [Unit Test suite.](./unit-tests.md)

## User Interface 

### ONExplorer

ONExplorer is an interface that harnesses the full potential of ONE Record. With ONExplorer, you can seamlessly engage with logistics objects, logistics events, and the pub/sub model. 
Find more information about [ONExplorer on the GitHub repository](https://github.com/IATA-Cargo/ONExplorer)

## Server Implementation

### NE:ONE 

NE:ONE an open-source, free-to-use ONE Record server software package that facilitates the implementation of the IATA ONE Record standard, the new data-sharing standard for air cargo and beyond. More information can be found on [NE:ONE website](https://git.openlogisticsfoundation.org/wg-digitalaircargo/ne-one)

# Third party tools

We rely also on third party tools that are usually open-source and are a great fit for our needs.

- `Protege` is an open-source ontology editor published by Stanford University: [https://protege.stanford.edu/](https://protege.stanford.edu/).
