Process where the freight is prepared to be handed over to Forwarder.

# 01. Notify Forwarder Freight and Information On Hand at Destination

Event is added on Shipment to record the NFD milestone.

**Message:** `(X)FSU` with NFD status
**Milestone:** `NFD`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline/GHA | POST | Event on Shipment | Create Event: eventFor (Shipment), eventCode (NFD), eventDate, recordingActor |

# 02. Hand over of Documents (Information) to Forwarder

Amend AWB data if required.

**Message:** `(X)FSU` with AWD status
**Milestone:** `AWR`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline/GHA | POST | Event on Shipment | Create Event: eventFor (Shipment), eventCode (AWR), eventDate, recordingActor |
