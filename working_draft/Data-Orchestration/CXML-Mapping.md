![image](https://user-images.githubusercontent.com/58464775/161543622-0c3ea890-b331-4a6b-86b7-fd41b08370eb.png)
# ONE Record Data Orchestration
## Focus on CXML mapping with ONE Record

## 1. Introduction
We dedicate this section to the mapping between CXML messages (as per the last version on CXMl Toolkit Edition 12) and ONE Record standard (as per last version endorsed by COTB - Data Model 3.0.0)

### 1.1. Objectives
The transition from EDI to Data Sharing is highly dependent on the mapping between messages and ONE Record. 
Two main aspects need to be considered:
* Mechanism: Some guidelines may be required to understand how a message can be converted to ONE Record and vice versa.
* Data field mapping: A direct mapping between CXML fields and ONE Record data model is inevitable, it goes with the Mechanism part to properly understand what objects are impacted

### 1.2. Messages selected
As CIMP standard has been sunset since 31st December 2024, we focus on CXML messages in their latest version (currently CXML Toolkit Edition 12)
The selected messages for mapping are the following:
| Message | Message name | Message version | Comments |
| --- | --- | --- | --- |
| XFWB | XML Waybill Message | 5.00 | 1st draft available |
| XFZB | XML HouseWaybill Message | 4.00 | - |
| XFHL | XML House Manifest Message | 3.00 | - |
| XSDG | XML Shippers' Declaration for Dangerous Goods Message | 6.00 | - |
| XFSU | XML Status Message | 6.00 | Ongoing |
| XFFM | XML Flight Manifest Message | 4.00 | - |
| XFBL | XML Freight Booked List Message | 3.00 | - |
| XTMV | XML Transport Movement Message | 2.00 | ? |
