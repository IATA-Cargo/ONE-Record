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

### x

### Based on messaging and associated milestones

MOP is still heavily relying on messaging standard (CIMP mainly) and most milestones are directly linked to messages such as (X)FWB or (X)FSU the Status update dedicated message.

Since ONE Record is about Data Sharing and not messaging, the mapping with the MOP is not about validating a message but making sure the information initially provided in that message is also fully available in ONE Record.

For instance (X)FWB is used to provide Air Waybil data, in ONE Record these data elements are not in one single object but spread among multiple objects (see dedicated CXML Mapping section for further details). Our objective is to make sure that when the (X)FWB needs to be sent from a process perspective, all data is available.
