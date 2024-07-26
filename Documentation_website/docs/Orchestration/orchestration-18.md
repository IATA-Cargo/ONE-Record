Movement between forwarder hub and branch facility before final delivery

# 01. Depart truck to forwarder branch facility

MovementTimes is added on TransportMovement (Truck) to record the departure from forwarder hub

**Milestone:** `DIW`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Event on TransportMovement (TM-Truck) | Create Event: eventFor (TM-Truck), eventLocation (forwarder hub), eventName (Arrival at forwarder hub), eventDate, recordingActor |
| Forwarder | Forwarder | POST | Optional - MovementTime on TransportMovement (TM-truck) | Create MovementTime: movementTimeType (actual), movementMilestone (AD), movementTimestamp |

# 02. Arrive truck at forwarder branch facility

MovementTimes is added on TransportMovement (Truck) to record the arrival at forwarder branch facility

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Forwarder | POST | Event on TransportMovement (TM-Truck) | Create Event: eventFor (TM-Truck), eventLocation (forwarder warehouse), eventName (Arrival at forwarder warehouse), eventDate, recordingActor |
| Forwarder | Forwarder | POST | Optional - MovementTime on TransportMovement (TM-truck) | Create MovementTime: movementTimeType (actual), movementMilestone (AA), movementTimestamp |
