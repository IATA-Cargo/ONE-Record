# Getting Started with ONE Record

## Introduction

Welcome to the "Getting Started with ONE Record" guide. This comprehensive document is designed to equip you with the knowledge and tools necessary to effectively implement and utilize the ONE Record standard in your logistics operations. By following this guide, you'll gain a deep understanding of technical concepts, establish a simple implementation, learn how to customize the system to meet your specific organizational needs, and see how data orchestration plays a critical role.

## 1. Understanding the Technical Concepts

### ONE Record Data Model and Ontologies

The ONE Record data model underpins the digital ecosystem of logistics operations. It is grounded in two primary ontologies:

\- **Cargo Ontology**: This ontology is pivotal as it encapsulates the industry concepts, the relationships between various logistics entities, and their properties. It offers a detailed framework for understanding and representing logistics processes digitally.

\- **Core Code Lists Ontology**: This defines essential industry code lists, capturing standardized identifiers used across logistics operations. These named individuals ensure uniformity in referencing codes and streamline operations by minimizing ambiguities in data interpretation.

*Please refer to documentation on the [data model](https://iata-cargo.github.io/ONE-Record/development/Data-Model/)

### Logistics Objects and Digital Twins

In the world of ONE Record, Logistics Objects form the cornerstone of logistics modeling. They serve as:

\- **Digital Twins**: Virtual models mirroring physical entities such as containers, shipments, or pallets. This concept allows for the tracking and monitoring of logistics objects with great precision throughout the supply chain.

\- **Granular Representation**: Logistics Objects can range from broad entities like shipments to more granular units like pieces or sensors, enabling a detailed view and management of logistics operations.

*Please refer to documentation on the* [data model](https://iata-cargo.github.io/ONE-Record/development/Data-Model/)

### Linked Data and Semantic Web

ONE Record leverages cutting-edge web standards to foster interconnected data ecosystems:

\- **Linked Data Principles**: Using RDF formats, ONE Record supports seamless integration and querying of data across diverse platforms. This interconnectedness is the backbone of a robust and responsive logistics network.

\- **Semantic Web Technologies**: By embedding meaning within data, ONE Record facilitates smarter data operations, allowing machines and applications to comprehend, infer, and adapt logistics data contextually.

*Please refer to documentation on the* [API and Security](https://iata-cargo.github.io/ONE-Record/development/API-Security/)

### API and Security

Ensuring secure and efficient data exchange is paramount in ONE Record:

\- **API Architecture**: The ONE Record API uses stateless communication methods to facilitate interactions among stakeholders. The RESTful design ensures logistics data can be shared reliably.

\- **Security Measures**: Incorporating Transport Layer Security (TLS) and OpenID Connect, ONE Record ensures secure authentication and data protection, preventing unauthorized access and guaranteeing data integrity.

*Please refer to documentation on the* [API and Security](https://iata-cargo.github.io/ONE-Record/development/API-Security/)

## 2. Getting Started with a Simple Implementation

### Setting Up an Environment

To initiate a ONE Record implementation, set up a conducive development environment.

For first timers, it is *strongly* recommended to work with the NE:ONE server. It can be deployed in less than an hour and provides 100% ONE Record capabilities out-of-the-box.

##### Open source implementation of ONE Record (NE:ONE)

Developed by the [DTAC]( https://www.digital-testbed-air-cargo.com/), the **NE:ONE** server is a “data hub” based on the IATA ONE Record standard for air freight. The project has developed an open source server software package, which implements the data model and API specifications of the IATA ONE Record standard for air freight.

To deploy a NE:ONE stack in few minutes clone the repository [ONE Record first steps](https://github.com/IATA-Cargo/one-record-first-steps/tree/main).
 
If you are interested in a multi node environment to facilitate data exchange (pub-sub) between two nodes, use the repository [ONE Record two nodes](https://github.com/IATA-Cargo/one-record-two-nodes).

### Creating and Managing Logistics Objects

Master the creation and management of Logistics Objects to support operations:

\- **Object Creation**: Use POST requests to create Logistics Objects like Pieces, Shipments, and custom entities. Ensure each object has a unique identifier (URI) for traceability.

\- **Data Management**: Implement PATCH and GET requests to update and retrieve logistics objects. Use appropriate data validation mechanisms to maintain data integrity across operations.

\- **Implementing a use case**: Consider implementating a use case involving multiple Logistics Objects. Refer to orchestration below.

*Please refer to documentation on the* [API](https://iata-cargo.github.io/ONE-Record/development/API-Security/)

## 3. Understanding and Implementing Data Orchestration

Data orchestration is key to maximizing the potential of ONE Record:

### Overview of Data Orchestration

Data orchestration involves coordinating data management tasks across different logistics operations to ensure data consistency, reliability, and availability throughout the supply chain.

### Role in ONE Record

\- **Process Integration**: Orchestration ensures data is seamlessly integrated into logistics workflows, facilitating efficient communication between all stakeholders.

\- **Enhanced Visibility**: By orchestrating data flows, stakeholders gain enhanced visibility into logistics operations, enabling more informed decision-making.

### Setting Up Orchestration

\- **Define Orchestration Goals**: Identify what you aim to achieve through data orchestration, such as improved data consistency, reduced errors, or faster data access.

\- **Select Orchestration Tools**: Leverage appropriate tools and platforms that can automate data management processes and integrate with existing systems.

### Implementing Orchestration

\- **Workflow Design**: Design workflows that define how data moves and transforms through various stages of logistics processes. Consider employing task scheduling and automated triggers to streamline operations.

\- **Data Monitoring and Adjustments**: Establish monitoring protocols to track data flows, identify bottlenecks, and make necessary adjustments to optimize performance.

*Please refer to documentation on the* [orchestration](https://iata-cargo.github.io/ONE-Record/development/Orchestration/)


