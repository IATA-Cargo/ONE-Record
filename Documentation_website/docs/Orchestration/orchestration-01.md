First Segment of the MOP, related to the interaction between the Shipper and the Forwarder.

# 01. Shipper provides shipment details
In this step the Shipper provides initial shipment details to its freight forwarder.

As Shipper provides shipment details, it is the equivalent of the SLI. The Shipper or the Forwarder on its behalf, creates Product, Item and Piece objects, including ULD if relevant and any Special cargo subtype for Live Animals or Dangerous Goods to further describe goods to transport. SecurityDeclaration object can be created as well if relevant
Parties are created as well (if not already existing), are required at minimum the Consignee (Shipper) and Consignor details.

Are included as well: handling instructions directly in the Piece details, ExternalReference if applicable (for rerefence documents)

If Shipper hosts a 1R server he needs to make sure teh Forwarder has proper access to data

*Values to declare for carriage and customs are not on Piece*

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Shipper or Forwarder | Shipper or Forwarder | POST | Product | Minimum Product details, including HS codes: hsCode, description |
| Shipper or Forwarder | Shipper or Forwarder | POST | Item | Minimum Item details including link to Product: itemQuantity, ofProduct |
| Shipper or Forwarder | Shipper or Forwarder | POST | Piece | Minimum Piece details to define the goods. Includes link to Product or Item: contentProducts/containedItems, goodsDescription, slac, specialHandlingCodes, textualHandlingInstructions, declaredValue |
| Shipper or Forwarder | Shipper or Forwarder | POST | SecurityDeclaration | Security details available at this stage |
| Shipper or Forwarder | Shipper or Forwarder | POST | ULD | Optional, if relevant |
| Shipper or Forwarder | Shipper or Forwarder | PATCH | Product and/or Item | Add backlinks to relevant objects (to Piece or Item>Product) |

# 02. Receive Forwarding Order from shipper & check security status
In this step the Forwarder receives data from the Shipper

Forwarder creates the Waybill objects (House) and Shipments based on the details provided by the Shipper.

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Waybill | House Waybill object: arrivalLocation, departureLocation, involvedParties (Shipper and Forwarder), waybillType (House), waybillNumber, declaredValueForCustoms, declaredValueForCarriage |
| Forwarder | Forwarder | POST | Shipment | Shipments details and link to Waybill object: waybill, insurance, involvedParties, totalGrossWeight, totalDimensions, goodsDescription |
| Forwarder | Forwarder | PATCH | Waybill | Add backlink Waybill>Shipment |

# 03. Check Banned and Restricted Commodities

Internal process

# 04. Plan routing direct or consolidation

Internal process

# 05. Arrange Capacity

Distirbution process

# 06. Confirm Capacity

Distribution process

# 07. Create Shipment Planning (MAWB) and confirm Service Commitment to Forwarder

Distribution process, the main outputs expected are the Booking object created by the Airline and the Waybill object (MAWB) created by the Forwarder

**Status/Message:** `RMP` and `BKD`

**CiQ Milestone:** `BKD`

# 08. Confirm capacity with Customer

Internal process

# 09. Create D2D Shipment Planning (HAWB/DAWB) and confim Service Commitment too Shipper

**Status/Message:** `RMI`

**CiQ Milestone:** `CBK`

The Forwarder updates the Waybill objects (Master and Houses) to link them. TransportMovement objects for Truck movement are created, Loading actions (planned) are created and linked with the respective TransportMovement and Pieces.

Flight details are directly retrieved from the Booking.

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | PATCH | Waybill (Master) | Add backlink Waybill (House) > Waybill (Master) |
| Forwarder | Forwarder | PATCH | Waybill (House) | Add backlink Waybill (Master) > Waybill (House) |
| Forwarder | Forwarder | POST | TransportMovement (Truck Movement) | Add backlink Waybill>Shipment |
| Forwarder | Forwarder | POST | TransportMeans (Truck) | Create TransportMeans or Identify existing one and add link to TransportMovement (Truck): operatedTransportMovement, vehicleType, vehicleModel, vehicleRegistration, transportOrganization |
| Forwarder | Forwarder | PATCH | TransportMovement (Truck Movement) | Add backlink TransportMeans > TransportMovement (Truck) |
| Forwarder | Forwarder | POST | Loading (Planned) | Loading action (planned): servedActivity (TM Truck), loadedPieces, onTransportMeans, loadingType (Loading), executionStatus (Planned), actionEndTime |

# 10. Share planning for pickup all involved Service Suppliers

The Forwarder manages the data access to relevant stakeholders if using ONE Record to share all pickup data.
