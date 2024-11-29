# Introduction
As of XXX the endorsed ONE Record version is:
- Ontology 3.1.0
- API 2.1.0
- Data Orchestration 1.0.0

Following IATA governance, this ONE Record release has been endorsed by COTB and by the CSC.

# General comments
This release of ONE Record standards is the outcome of all the work carried out in 2024 by the various working groups involved in the maintenance and improvement of the standard. It includes the API & Security working group, the Data Model working group, the Data Orchestration Working group and all the ad-hoc sub-groups. Feedbacks from ONE Record hackathons have been a very valuable source of improvements as well as the different pilots and live implementations of ONE Record.

We believe this release, as the previous one, is production-ready and is an essential milestone for the success of ONE Record to make it the only effective data exchange and data sharing standard as of 1st January 2026.

The working groups mentioned above are still actively operating and all feedbacks and inputs will be highly appreciated to help us improve further the standard.

# Ontology 3.1.0
## Scope of the release

Ontology 3.1.0 brings many changes compared to 3.0.0. Those changes do not alter the overall object structure but many properties were adjusted based on discussions that have happened in 2024 among the Data Model taskforce and the sub-group dedicated to the mapping between ONE Record and CXML messages.

Main changes include:
- Addition of data properties on `Waybill` to ease mappping with CXML messages
- Re-design of `WaybillLineItem` object and link to `Piece` and `ULD` objects to use actual data (dimensions, volume, ...) instead of duplicating data
- Addition of operatingParties property on `TransportMovement` to indicate the operating organization or driver/pilot
- Adjustment of ONE Record Visualizer
- Refactor of the Code List ontology: alignment with API ontology and best practices, addition of Code List 2 density group codes

## Changelog

Detailed changelog can be read directly in the following Pull Requests on GitHub or in the detailed page after.

# API 2.1.0

# Data Orchestration 1.0.0
## Scope of the release

The Data Orchestration is a work that was intitiated in September 2023. Industry stakeholders (Airline, Freight Forwarders, IT Service Providers, Cargo iQ) have worked to propose a way to use the ONE Record standard to support the operations and business processes.

With 1.0.0 version the focus has been on:
- Identifying ONE Record actions linked to the Master Operating Plan (MOP) as it is being re-designed by Cargo iQ. This includes review of all processes and associated milestones used by the industry.
- Proposing a mapping between ONE Record and main CXML messages (XFWB 5.0.0, XFZB 4.0.0, XFHL 3.0.0 and XFBL 2.1.0)
