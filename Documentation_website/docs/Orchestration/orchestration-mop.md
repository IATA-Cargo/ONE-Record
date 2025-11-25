# Purpose

This section will focus on providing guidelines on how to use ONE Record from a Data Model point of view based on standardized processes.

# Master Operating Plan (MOP)
## What is the MOP ?
The Master Operating Plan (MOP) describes the key processes and sub-processes involved in transporting air cargo from shipper to consignee in a systematic and harmonized manner. It provides the air cargo supply chain with the first, industry-endorsed, standard description of the end-to-end process for transporting cargo by air.

It is maintained by Cargo iQ and then proposed to the industry for a wider usage and adoption.

For further details you can refer to IATA's website here:

- [IATA Knowledge Hub - Air Cargo Handling](https://www.iata.org/en/publications/newsletters/iata-knowledge-hub/what-to-know-about-air-cargo-handling/)
- [Current MOP version endorsed by COTB](https://a71bcec4-d0e1-4b94-80d6-695ec0bd0435.filesusr.com/ugd/722a02_e289dc70805f4bd491a467906f728abc.pdf)


## Version of the MOP used for the Orchestration
The current version of the MOP endorsed by COTB is v1.2 (see link above). However in 2023 Cargo iQ initiated an update of the MOP. This update includes a swimlane view of the processes to properly identify stakeholders involved and the review of all steps. This is the version tha was used, in collaboration with Cargo iQ, for the Orchestration.

The sequence of the steps may slightly differ from the MOP v1.2 and few additions/removals/adjustemnts were made. However those changes don't have a major impact on the overall logistics supply chain.

## MOP structure

### Process structure

The MOP maps the processes and sub-processes typically involved in the planning and movement of air cargo from shipper to final consignee.

### Based on messaging and associated milestones

MOP is still heavily relying on messaging standard (CIMP mainly) and most milestones are directly linked to messages such as (X)FWB or (X)FSU the Status update dedicated message.

Since ONE Record is about Data Sharing and not messaging, the mapping with the MOP is not about validating a message but making sure the information initially provided in that message is also fully available in ONE Record.

For instance (X)FWB is used to provide Air Waybil data, in ONE Record these data elements are not in one single object but spread among multiple objects (see dedicated CXML Mapping section for further details). Our objective is to make sure that when the (X)FWB needs to be sent from a process perspective, all data is available.

# How did we operate?
The MOP is an overall standard process that defines steps, activities and specific milestones in the transportation supply chain. All stakeholders operate differently thus the MOP should be seen as a general guideline and reference but not an absolute standard. The Data Orchestration decided to use the MOP as a starting point to cover most of the required steps and milestones while transporting general cargo.

<p align="center">
<img src="https://github.com/IATA-Cargo/ONE-Record/assets/58464775/48eb142b-ad17-42d9-938f-31465755a96b">
</p>
<p align="center"><i>The mixed approach</i></p>

We have decided to use a mixed approach based on the Activities/Process steps analysis and the Milestones analysis. The two approaches have different outcomes that are completing each other.


## Starting from the activities

<p align="center">
<img src="https://github.com/IATA-Cargo/ONE-Record/assets/58464775/1ea9a16f-1cc8-4da7-8bef-d39bfbb56f98">
</p>
<p align="center"><i>From the activities to the Data Model</i></p>

The Activites, as defined in the MOP, are sequential although there could be some parallel flows or different order depending on the situation. The main objective of the Data Orchestration is to define for each activity what ONE Record actions are required and by whom. This includes:
* Identifying all data (Objects) that need to be created, updated, deleted or shared accordingly
* Identifying all relevant stakeholders: who holds the data, who is accountable for the data, with whom the data shall be shared
* Defining API calls and content

## Starting from the milestones

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


