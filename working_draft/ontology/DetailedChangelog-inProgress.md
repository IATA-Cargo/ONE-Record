# Detailed Changelog - in progress

We will use this markdown page to follow ongoing changes in the ontology.

### Changes for Ontology 3.0.1
| Type of change   | Object  | Type of property  | Property name  | Comments / Reasons for change  | Status |
|---|---|---|---|---|---|
| Addition  | OtherCharge  | Data Property  | `OtherCharge#rateReferenceCode`  | Addition of missing data property in both Ontology and Visualization | To be discussed |
| Addition  | OtherCharge  | Data Property  | `OtherCharge#rateReferenceType`  | Addition of missing data property in both Ontology and Visualization | To be discussed |
| Addition  | OtherCharge  | Data Property  | `OtherCharge#dimensionsForRate` | Addition of missing data property in Visualization | Ok |
| Rename label | WaybillLineItem  | /  | /  | Change the label to match the object name (WaybillLineItem instead of TACTRateDescription)  | Ok |
| Addition | Waybill  | Data Property  | `Waybill#densityGroupCode`  | TBC: Density Group Code (Code List 2 in CXML toolkit) may be used by some stakeholders, we need to further assess if it is relevant  | To be discussed |
| Removal | Shipment | Data Property | `specialHandlingCodes` | Removal of the property as decided by the DM taskforce 5th Sept 2023 | Ok |
| Removal | PhysicalLogisticsObject| Data Property | `transportOrganization` | Removal of the property in Visualization | Ok |
| Modification | Waybill| Data Property | `accountingInformation` | Should it be an array to cmply with XFWB requirements? (see includedAccountingNote in XFWB) | To be discussed |
| | | | | |

### Changes/Bugfixes to ontoogy 3.1.0
| Type of change   | Object  | Type of property  | Property name  | Comments / Reasons for change  |
|---|---|---|---|---|
| | | | | |
