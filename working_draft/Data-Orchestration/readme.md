![image](https://user-images.githubusercontent.com/58464775/161543622-0c3ea890-b331-4a6b-86b7-fd41b08370eb.png)
# ONE Record Data Orchestration

## 1. Introduction
The Data Orchestration is a work that was intitiated in September 2023, under COTB and DCWG governance. Industry stakeholders (Airline, Freight Forwarders, IT Service Providers, Cargo iQ) have worked to propose a way to use the ONE Record standard to support the operations and business processes.

### 1.1. Objectives
As a response to the industry for guidance with ONE Record, we figured the Data Orchestration is the answer to make the link between processes and ONE Record standard. It includes:
* Review of the Industry and Cargo iQ Master Operating Plans (MOP)
* Identification of key industry use cases
* Identification of ONE Record workflow that supports the processes and use cases
* Provide tools to check compliance with the standard and illustrate the Data Orchestration

## 2. How did we operate?
The MOP is an overall standard process that defines steps, activities and specific milestones in the transportation supply chain. All stakeholders operate differently thus the MOP should be seen as a general guideline and reference but not an absolute standard. The Data Orchestration decided to use the MOP as a starting point to cover most of the required steps and milestones while transporting general cargo.

<p align="center">
<img src="https://github.com/IATA-Cargo/ONE-Record/assets/58464775/48eb142b-ad17-42d9-938f-31465755a96b">
</p>
<p align="center"><i>The mixed approach</i></p>

We have decided to use a mixed approach based on the Activities/Process steps analysis and the Milestones analysis. The two approaches have different outcomes that are completing each other.


### 2.1. Starting from the activities

<p align="center">
<img src="https://github.com/IATA-Cargo/ONE-Record/assets/58464775/1ea9a16f-1cc8-4da7-8bef-d39bfbb56f98">
</p>
<p align="center"><i>From the activities to the Data Model</i></p>

The Activites, as defined in the MOP, are sequential although there could be some parallel flows or different order depending on the situation. The main objective of the Data Orchestration is to define for each activity what ONE Record actions are required and by whom. This includes:
* Identifying all data (Objects) that need to be created, updated, deleted or shared accordingly
* Identifying all relevant stakeholders: who holds the data, who is accountable for the data, with whom the data shall be shared
* Defining API calls and content

### 2.2. Starting from the milestones

<p align="center">
<img src="https://github.com/IATA-Cargo/ONE-Record/assets/58464775/e517f1a1-2906-4fc1-b124-960b4dd10f99">
</p>
<p align="center"><i>From the milestones to the Data Model</i></p>


A Milestone, from Cargo iQ perspective is:
> A planned checkpoint in a route map indicating the latest time by which an event or events are expected to happen at a given location.

Milestones are used in the Data Orchestration as the latest time by which we need to ensure that certain mechanisms or data are made avaialble to other stakeholders. In current messaging environment, milestones are converted into:
* Providing status update though (X)FSU messages with dedicated status codes
* Sending Waybill data through (X)FWB and (X)FZB
* Sending booked freight list and manifest through (X)FBL and (X)FFM

For the analysis with the Data Orchestration our main objective is to ensure that all those mechanisms and messages are mapped with ONE Record, it ususally relies on:
* Mapping (X)FSU message with a dedicated LogisticsEvent
* Making sure a proper set of data is available and shared accordingly as a replacement of a message
