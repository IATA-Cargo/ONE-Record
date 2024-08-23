# PLACI programs

PreLoading Advance Cargo Information (PLACI) programs are being implemented throughout the world and impact operations of the industry stakeholders.

​IATA's Preloading Advance Cargo Information (PLACI) Guidelines provides harmonized and standardized procedures for advance cargo information filing in a unique, comprehensive manual. It enables users to improve procedural efficiency and empowers their compliance with the preloading advance cargo information regulatory requirements applicable in the United States, Europe, United Kingdom, United Arab Emirates and Canada.

Find out more on PLACI guidelines here: [https://www.iata.org/en/publications/manuals/placi-standard-procedures-for-preloading-advance-cargo-information](https://www.iata.org/en/publications/manuals/placi-standard-procedures-for-preloading-advance-cargo-information)

# PLACI and ONE Record

ONE Record as an IATA standard supports PLACI programs and aims to replace messaging standards to share relevant data with Customs and Authorities.

Business processes guidelines are detailed in the PLACI manual, the objective of this page is to give a version of the processes based on ONE Record.

## General comments applying to all processes

Current processes are based on messaging standards, more specifically on usage of XFWB, XFZB, XFHL and XCSN. These 4 messages provide details on the Master Waybill (XFWB), House Waybill (XFZB), the list of House contained within a Master (XFHL) and to convey details on Customs notifications (XCSN). In terms of data, ONE Record already has the capability to share all relevant information related to those 3 messages, what will differ is the way data is shared/exchanged.

- 1. **No OCI!** The OCI segment in CIMP and CXML standards is used to convey various Customs and Security information that are not included in the core of those messages. While we have kept a similar structure in ONE Record with the `CustomsInformation` object, it should not be necessary for theses processes.

- 2.  PLACI processes we will mostly rely on the fact that **Events** can be used on different objects and that notifications can be automatically triggered to selected stakeholders.

- 3. It is considered that required information for PLACI purposes is already defined in ONE Record realm as House and Master Waybill data should already be recorded and shared between upstream stakeholders (Shipper, Freight Forwarder, Airline, GHA at least)

## Use case #1: Freight forwarder filing pre-loading data for Consolidation shipment

Specificity of this process is that:
- Freight forwarder has an agreement with Airline to file data on its behalf
- Data is filed at House level for consolidated shipment

``` mermaid
graph LR
  A[Freight Forwarder notifies that HAWB content is ready - Event on Shipment] --> B[Customs validates content];
  B --> C{Validation succesful?};
  C -->|Yes| D[Customs notifies that Shipment is OK - Event on Shipment SR];
  C -->|No| E[Customs notifies that there is an error - Event on Shipment Error];
  D --> F{Additional information or screening needed?};
  F -->|Yes| G[Customs notifies RFI or RFS - Event on Shipment RFI or RFS];
  F -->|No| H{Risk assessment completed?};
  H -->|Yes| I{Assessment outcome};
  I -->|Blocked - RFI or RFS| J[CB - 7H, 7J, 8H, 8J];
  I -->|Customs Hold - DNL| K[CD - 6H, 6J];
  I -->|Customs Release - OK| L[CO - SF, 6I, 7I, 8I];
  D --> M[Freight Forwarder notified automatically];
  E --> M;
  G --> M;
  J --> M;
  K --> M;
  L --> M;
  M --> N{MAWB# available?};
  N -->|Yes| O[Carrier notified automatically via the MAWB object];
  ```
