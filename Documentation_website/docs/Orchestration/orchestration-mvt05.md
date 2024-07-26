This part of the process represents the movement from the forwarder branch facility to consignee's premises

# 01. Depart truck from forwarder branch facility to consignee

MovementTimes is added on TransportMovement (Truck) to record the arrival at consignee's location

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Event on TransportMovement (TM-Truck) | Create Event: eventFor (TM-Truck), eventLocation (forwarder branch facility), eventName (departure from forwarder branch facility), eventDate, recordingActor |
| Forwarder | Forwarder | POST | Optional - MovementTime on TransportMovement (TM-truck) | Create MovementTime: movementTimeType (actual), movementMilestone (AD), movementTimestamp |

# 02. Arrive truck at consignee

Unloading actions (Actuals) are created between Pieces and the TransportMovement to indicate unloading

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Event on TransportMovement (TM-Truck) | Create Event: eventFor (TM-Truck), eventLocation (consignee location), eventName (Arrival at consignee location), eventDate, recordingActor |
| Forwarder | Forwarder | POST | Optional - MovementTime on TransportMovement (TM-truck) | Create MovementTime: movementTimeType (actual), movementMilestone (AA), movementTimestamp |
