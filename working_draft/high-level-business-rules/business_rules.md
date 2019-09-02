# General Approach
* This file describes the business rules that can be applied to data fields in ONE Record

## Precondititions
* Business rules are applied and documented in a revision-safe audit trail related to effected data field (see audit trail definition) 
* The business rules depend on a model of roles of stakeholders in the transportation process (see definition of roles and responsibilities)
  * Each stakeholder can have several roles
  * but ech stakeholder can perform a transaction applying only one role

# AWB
The transaction "DOC_GENERATION" with the DOC_TYPE "AWB" can only be performed by the role "FORWARDER" 
The following fields are mandatory for the DOC_TYPE "AWB" and must be provided by its data owner:  

## Data Owner: Forwarder (all mandatory fields below the named LO)
* "AIR_WAYBILL\BOOKING\SEGMENTDETAIL\DEPARTURELOCATION\CODE"
* "AIR_WAYBILL\BOOKING\SEGMENTDETAIL\ARRIVALLOCATION\CODE"
* "AIR_WAYBILL\HANDLING"
* "AIR_WAYBILL\SECURITYINFORMATION" 
* "AIR_WAYBILL\SHIPPERSSIGNATURE"
* "AIR_WAYBILL\CUSTOMS_INFORMATION" _maybe go a little bit deeper in this LOs to sort out what´s really needed_
* "AIR_WAYBILL\BOOKING\TotalGrossWeight"
* "AIR_WAYBILL\BOOKING\TotalPieceCount"
* "AIR_WAYBILL\BOOKING\TotalVolume"

_not clear yet: Accounting and Insurance Data fields_

## Data Owner: Carrier (all mandatory fields below the named LO)
* "AIR_WAYBILL\BOOKING\AirWaybillNumber"
* "AIR_WAYBILL\BOOKING\TotalChargeAmount"
* "AIR_WAYBILL\CarrierSignature"

_Routing must be provided due to Warsaw Convention / Montreal Agreement, but must be owned by Carrier_
* "AIR_WAYBILL\BOOKING\SEGMENTDETAIL\(tbd)" _A concept is required to bring in cIQ-Milestones here_

## Mandatory AWB Information to be covered by the ONE Record Audit Trail / Authentication
In the transaction "DOC_GENERATION" with the DOC_TYPE "AWB", the following rules apply:
*  the content of the LO "AIR_WAYBILL\DATE" must be written into the Audit trail as the date of performing the DOC_GENERATION transaction
* the content of the LO "AIR_WAYBILL\SHIPPER" must be covered by the ONE Record authentication
  * in case the relevant party is not participating on ONE Record, the data fields can be provided with the marking the data owner and provider using the defined mechanism
* the content of the LO "AIR_WAYBILL\CONSIGNEE" must be covered by the ONE Record authentication
  * in case the relevant party is not participating on ONE Record, the data fields can be provided with the marking the data owner and provider using the defined mechanism
* the content of the LO "AIR_WAYBILL\FREIGHT_FORWARDER" must be covered by the ONE Record ownership
