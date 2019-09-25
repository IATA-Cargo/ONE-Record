# General Approach
* This file describes the business rules that can be applied to data fields in ONE Record

## Precondititions
* Business rules are applied and documented in a revision-safe audit trail related to effected data field (see audit trail definition) 
* The business rules depend on a model of roles of stakeholders in the transportation process (see definition of roles and responsibilities)
  * Each stakeholder can have several roles
  * but each stakeholder can perform a transaction applying only one role

# AWB
The transaction "DOC_GENERATION" with the DOC_TYPE "AWB" can only be performed by the role "FORWARDER" 
The following fields are mandatory for the DOC_TYPE "AWB" and must be provided by its data owner:  

## Data Owner: Forwarder (all mandatory fields below the named LO)
* "AIR_WAYBILL\Handling\SpecialHandling\Code"
* "AIR_WAYBILL\Handling\SpecialHandling\Description"
* "AIR_WAYBILL\Handling\ServiceRequest\Code"
* "AIR_WAYBILL\Handling\ServiceRequest\Description"
* "AIR_WAYBILL\Handling\ServiceRequest\StatementType"
* "AIR_WAYBILL\Handling\ServiceRequest\StatementText"
* "AIR_WAYBILL\BOOKING\DEPARTURELOCATION\CODE"
* "AIR_WAYBILL\BOOKING\ARRIVALLOCATION\CODE"
* "AIR_WAYBILL\BOOKING\TotalGrossWeight"
* "AIR_WAYBILL\BOOKING\TotalPieceCount"
* "AIR_WAYBILL\BOOKING\TotalVolume"
* "AIR_WAYBILL\ShipperSignature\Signature"
* "AIR_WAYBILL\ShipperSignature\Location\Name"

* "AIR_WAYBILL\SECURITYINFORMATION"  _requirements on single field level to be defined asap_
* "AIR_WAYBILL\CUSTOMSINFORMATION" _requirements on single field level to be defined asap_

## Data Owner: Carrier (all mandatory fields below the named LO)
* "AIR_WAYBILL\BOOKING\AirWaybillNumber"
* "AIR_WAYBILL\CarrierSignature"

_Routing must be provided due to Warsaw Convention / Montreal Agreement, but must be owned by Carrier as it is provided by Carrier_
* "AIR_WAYBILL\EVENT\(tbd)" _Not decided yet how to bring in cIQ-transportation plan here_

## Data Owner: Shipper (all mandatory fields below the named LO)
* "AIR_WAYBILL\SHIPPER"

## Mandatory AWB Information to be covered by the ONE Record Audit Trail / Authentication
In the transaction "DOC_GENERATION" with the DOC_TYPE "AWB", the following rules apply:
*  the content of the LO "AIR_WAYBILL\DATE" must be written into the Audit trail as the date of performing the DOC_GENERATION transaction
* the content of the LO "AIR_WAYBILL\SHIPPER" must be covered by the ONE Record authentication
  * in case the relevant party is not participating on ONE Record, the data fields can be provided with the marking the data owner and provider using the defined mechanism
* the content of the LO "AIR_WAYBILL\CONSIGNEE" must be covered by the ONE Record authentication
  * in case the relevant party is not participating on ONE Record, the data fields can be provided with the marking the data owner and provider using the defined mechanism
* the content of the LO "AIR_WAYBILL\FREIGHT_FORWARDER" must be covered by the ONE Record ownership
