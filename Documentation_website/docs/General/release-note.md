# Introduction
As of xxx the endorsed ONE Record version is:

- Ontology 3.2.0
- API 2.2.0
- Data Orchestration 1.1.0

Following IATA governance, this ONE Record release has been endorsed by COTB and by the CSC.

# General comments
This release of ONE Record standards is the outcome of all the work carried out in 2024 by the various working groups involved in the maintenance and improvement of the standard. It includes the API & Security working group, the Data Model working group, the Data Orchestration Working group and all the ad-hoc sub-groups. Feedbacks from ONE Record hackathons have been a very valuable source of improvements as well as the different pilots and live implementations of ONE Record.

We believe this release, as the previous one, is production-ready and is an essential milestone for the success of ONE Record to make it the only effective data exchange and data sharing standard as of 1st January 2026.

The working groups mentioned above are still actively operating and all feedbacks and inputs will be highly appreciated to help us improve further the standard.

# Ontology 3.2.0
## Scope of the release

Feedbacks were shared from the industry after multiple pilots were run under 3.0.0 and 3.1.0. Ontology 3.2.0 brings some improvements in order to faciliate mapping with CXML messages while preserving the piece-centricity and allowing for an "hybrid" usage of both piece-level management and shipment-level management.

## Change

Below is an overview of changes on 3.2.0:

- Addition of `cityName` to *Address* object
- Addition of `accountNumber` to *Party* object with a dedicated open code list for acccount numbers to be mapped with XFWB requirements
- Addition of a *HandlingService* object, subtype of *LogisticsService*
- Addition of `involvedParty` to *LogisticsEvent* object to record additional parties such as receiving party, notify party
- Addition of `ociLineNumber` to *CustomsInformation* object to ensure the OCI line structure remains the same as in messages (required for Customs part)
- Addition of data properties and data objects to *Booking* and *BookingShipment* objects to simplify the linkage of data when Distribution is out of scope
- Addition of *BookingSegment* to suport Split bookings scenarios
- Addition of a few data properties to *DgDeclaration* object to complete the mapping with DG requirements
- Some data properties added back to *WaybillLineItem*, addition of a *LineItemPackage* to *WaybillLineItem*

Detailed changelog can be read directly in the following Pull Requests on GitHub or in the [Detailed Changelog page](../General/changelog.md).

# API 2.1.0

## Scope of the release

xxx

## Change

xxx

More information can be found in the [API Changelog page](../API-Security/changelog.md) or directly on the change page.

# Data Orchestration 1.0.0
## Scope of the release

The Data Orchestration is a work that was intitiated in September 2023. Industry stakeholders (Airline, Freight Forwarders, IT Service Providers, Cargo iQ) have worked to propose a way to use the ONE Record standard to support the operations and business processes.

With 1.0.0 version the focus has been on:
- Identifying ONE Record actions linked to the Master Operating Plan (MOP) as it is being re-designed by Cargo iQ. This includes review of all processes and associated milestones used by the industry.
- Proposing a mapping between ONE Record and main CXML messages (XFWB 5.0.0, XFZB 4.0.0 and XFHL 3.0.0)
