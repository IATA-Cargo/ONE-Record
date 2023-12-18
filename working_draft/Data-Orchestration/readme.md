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
