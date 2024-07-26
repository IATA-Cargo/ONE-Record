This part of the process represents the movement from the destination carrier domain to Forwarder's forwarder hub at destination

# 01. Depart freight for forwarder warehouse

MovementTimes is added on TransportMovement (Truck) to record the departure from carrier domain

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Event on TransportMovement (TM-Truck) | Create Event: eventFor (TM-Truck), eventLocation (WH), eventName (Departure from warehouse), eventDate, recordingActor |
| Forwarder | Forwarder | POST | Optional - MovementTime on TransportMovement (TM-truck) | Create MovementTime: movementTimeType (actual), movementMilestone (AD), movementTimestamp |

# 02. Arrive truck at forwarder warehouse

MovementTimes is added on TransportMovement (Truck) to record the arrival at forwarder warehouse

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Event on TransportMovement (TM-Truck) | Create Event: eventFor (TM-Truck), eventLocation (forwarder hub), eventName (Arrival at forwarder hub), eventDate, recordingActor |
| Forwarder | Forwarder | POST | Optional - MovementTime on TransportMovement (TM-truck) | Create MovementTime: movementTimeType (actual), movementMilestone (AA), movementTimestamp |
