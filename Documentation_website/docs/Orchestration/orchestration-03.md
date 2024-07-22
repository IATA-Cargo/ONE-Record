Process where forwarders receives freight from Shipper and checks freight data suhc as weight, dimensions etc.

# 01. Check/apply labelling & verify phyisical integrity of packages

Event is added on Pieces to indicate Freight received in forwarder warehouse.

Check of labelling/physical integrity can be through a Check object or an Event added on Pieces.

**Milestone:** `REW`

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Shipper or Forwarder | Forwarder | POST | Event on Piece | Create Event: eventFor (Piece), eventLocation (if relevant), eventCode or eventName (Received in forwarder warehouse), eventDate, recordingActor |
| Shipper  | Forwarder | POST | Check | Create Check: up to stakeholder to define what and how to check |

# 02. Check information to match actual freight and security status to confirm shipment data on-hand

Forwarder checks weight, dimensions and security status of the freight. Pieces and Shipment are updated if relevant, along with SecurityDeclaration on Pieces

**Milestone:** `SDO`

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | PATCH | Shipment | Update Shipment properties based on check: weight, dimensions, or others |
| Shipper or Forwarder | Forwarder | PATCH | Pieces | Update Piece details on behalf fo shipper |
| Shipper or Forwarder | Forwarder | PATCH | SecurityDeclaration | Update SecurityDeclaration of relevant pieces |

# 03. Check accuracy of booking & adust if needed

Forwarder checks the accuracy of booking compared to freight details, Booking can be updated (see Distribution process)

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Forwarder | PATCH | Booking | Communicate booking updates with Airline, refer to Distribution process |

# 04. Complete shipment record

At this stage shipment record should be accurate and updated already, Forwarder can make a final check and adjust objects if necessary

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Shipper or Forwarder | Forwarder | PATCH | Shipment, Piece, etc. | Update if necessary |

# 05. Transmit/file electronic data to authorities if self-filing

Based on Customs requirements, Customs messages can be populated with 1R data as per proposed mapping.

Event on Waybill (Master) can be added to indicate a self-filing

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Event on Waybill | Create Event: eventFor (Waybill), eventName (Ready for Customs processing) |

**Milestone:** `PHL`

# 06. Asssess Electronic data and provide DNL

Event on Waybill (Master) can be added by Authorities to indicate the Customs assessment status

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Authorities | POST | Event on Waybill | Create Event: eventFor (Waybill), eventName (Relevant Customs assessment status) |

# 07. Sort & transfer freight to build or storage locations

Internal process but could be used with Storing action in the future
