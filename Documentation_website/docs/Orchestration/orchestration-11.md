Flight, including information exchange in parallel.

# 01. Wheels up

MovementTimes created on TransportMovement (Flight) to record the departure wheels up. Event can be added on TransportMovement as well.

**Message:** `MVT/XTMV` with Wheels off status

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline | POST | Event on TransportMovement (TM-Flight) | Create Event: eventFor (TM-Flight), eventLocation (Airport), eventCode (AD), eventDate, recordingActor |
| Airline | Airline | POST | Optional - MovementTime on TransportMovement (TM-Flight) | Create MovementTime: movementTimeType (actual), movementMilestone (AD), movementTimestamp |


# 02. Transmit flight and shipment information to down line stations & authorities

At this stage all data required for XFFM/XFWB/XFHL should be there already. Airline needs to make sure all relevant stakeholders have access to data.

**Message:** `(X)FWB`, `(X)FFM`, `(X)FHL`

# 03. Receive flight and shipment information from airline

Loading Action (Actuals) is created to link Pieces/ULD and TransportMeans (Aircraft) via the TransportMovement (flight) (c.f. 9.5)

**Message:** `UCM`

# 04. Wheels down

MovementTimes created on TransportMovement (Flight) to record the departure wheels down. Event can be added on TransportMovement as well.

**Message:** `MVT/XTMV`
**Milestone:** `WDO`

## API Interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline | POST | Event on TransportMovement (TM-Flight) | Create Event: eventFor (TM-Flight), eventLocation (Airport), eventCode (AA), eventDate, recordingActor |
| Airline | Airline | POST | Optional - MovementTime on TransportMovement (TM-Flight) | Create MovementTime: movementTimeType (actual), movementMilestone (AA), movementTimestamp |
