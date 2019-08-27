# General Approach
* This file describes the business rules that can be applied to data fields in ONE Record
## Precondititions
* Business rules are applied and documented in a revision-safe audit trail attached to effected data field (see audit trail definition) 
* If Business rules apply to more than one field, the unique identifier of the DOCUMENT_TYPE is to be used to identify all effected data fields
* The business rules depend on a model of roles of stakeholders in the transportation process (see definition of roles and responsibilities)
  * Each stakeholder can have several roles
  * but ech stakeholder can perform a transaction applying only one role

# AWB
The transaction "DOC_GENERATION" with the DOC_TYPE "AWB" can only be performed by the role "FORWARDER" 
The following fields are mandatory for the DOC_TYPE "AWB" and must be provided by the data owner:  
## Data Owner Forwarder
* "AIR_WAYBILL\BOOKING\SEGMENTDETAIL\DEPARTURELOCATION\CODE"
* "AIR_WAYBILL\BOOKING\SEGMENTDETAIL\ARRIVALLOCATION\CODE"
* "AIR_WAYBILL\Handling\SpecialHandling\Code"
* "AIR_WAYBILL\SecurityInformation\SecurityStatus"
* "AIR_WAYBILL\ShipperSignature\SignatoryName"
* "AIR_WAYBILL\ShipperSignature\Signature"
* "AIR_WAYBILL\TotalGrossWeight\GrossWeight\Value"
* "AIR_WAYBILL\TotalGrossWeight\GrossWeight\Unit"

## Data Owner Carrier
* "AIR_WAYBILL\CarrierSignature\SignatoryName"
* "AIR_WAYBILL\CarrierSignature\Signature"
* "AIR_WAYBILL\CarrierSignature\Location\Name"
_Routing missing here, must be provided due to Warsaw Convention / Montreal Agreement, but must be owned by Carrier_

## The following rules are not clear if needed or not
In the transaction "DOC_GENERATION" with the DOC_TYPE "AWB", the following rules apply:
* the content of the LO "AIR_WAYBILL\SHIPPER" must be covered by the ONE Record authentication
  * in case the relevant party is not participating on ONE Record, the data fields can be provided with the marking the data owner and provider using the defined mechanism
* the content of the LO "AIR_WAYBILL\CONSIGNEE" must be covered by the ONE Record authentication
  * in case the relevant party is not participating on ONE Record, the data fields can be provided with the marking the data owner and provider using the defined mechanism
* the content of the LO "AIR_WAYBILL\FREIGHT_FORWARDER" must be covered by the ONE Record ownership
