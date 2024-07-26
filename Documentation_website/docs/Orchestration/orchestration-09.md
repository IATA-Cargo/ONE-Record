Process where the Airline/GHA prepares the freight for it transportation

# 01. Transshipment Cargo received from Process 13

1st Airline makes sure that 2nd Airline has proper access (data and/or delegated access) to the shipment record.

# 02. Transshipment Cargo security cleared

GHA checks the Security status of the pieces and updates the SecurityDeclaration on the Pieces if relevant.

An Event is added on the Pieces if relevant to record the check results

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline / GHA | PATCH | SecurityDeclaration | Update accordingly |
| Airline | Airline / GHA | POST | Event on Pieces | Create Event: eventFor (Pieces), eventLocation (carrier domain?), eventName (Security Status checked), eventDate, recordingActor |

# 03. Plan flight and send booking list to warehouse

Most of XFBL data should already be in ONE Record at that stage. Refer to mapping XFBL to 1R for further details.

The Airline needs to make sure that GHA has access to all relevant data related to the freight booked list.

UnitComposition Activity can be created for conslidations made by GHA. Respective Composing actions (Planned) can be created to link Pieces and ULDs Loading Action (Planned) is created by GHA to link Pieces/ULD and TransportMeans (Aircraft) via the TransportMovement (flight). This is either a direct Post via delegated access or request to create objects on Airline system

**Message:** `(X)FBL`

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline / GHA | POST | UnitComposition | Create UnitComposition activity |.
| Airline | Airline / GHA | POST | Composing (Planned) | Create Composing: servedActivity (UnitComposition), loadingUnit (ULD or Pallet), composedPieces (Pieces), compositionType (Composition), actionTimeType (Planned) |
| Airline | Airline / GHA | POST | TransportMovement (Flight) | Create TM-Flight if not created before |
| Airline | Airline / GHA | POST | Loading (planned) | Loading action (planned): servedActivity (TM-Flight), loadedPieces (Pieces) and/or loadingUnits (ULD/Pallet), loadingType (loading), actionTimeType (planned) |
| Airline | Airline / GHA | POST | Event on TM-Flight | Create Event: eventFor (TM-Flight), eventLocation (not relevant), eventName (Freight booked List available), eventDate, recordingActor |

# 04. Move shipment to storage location

Storage Activity is created with Storing Action (actuals) to link the Pieces/ULD to a storage place if relevant

**Milestone:** `STO`

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline / GHA | POST | Storage | Create Storage activty |
| Airline | Airline / GHA | POST | Storing (actual) | Storing action (actual): servedActivity (Storage), storingtype (STORE_IN). storedObjects (Pieces/ULDs), storagePlaceIdentifier |

# 05. Collect freight and unitize as planned

UnitComposition Activity is created with Composing Action (Actuals) to link Pieces and ULDs

**Milestone:** `MAN` / `FUM`

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline / GHA | POST | Composing (Actual) | Create Composing: servedActivity (UnitComposition), loadingUnit (ULD or Pallet), composedPieces (Pieces), compositionType (Composition), actionTimeType (Actual) |

# 06. Consolidate information and send final manifest data

Loading Action (Planned) is updated if relevant by GHA to link Pieces/ULD and TransportMeans (Aircraft) via the TransportMovement (flight). This is either a direct Post via delegated access or request to create objects on Airline system

**Milestone:** `UWS`

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline / GHA | PATCH | Loading (planned) | Update loading (planned) if required |

# 07. Create aircraft load planning by Load control

Loading Actions (Planned) can be updated by Airline if relevant. This is either a Change request (if GHA has the data) or direct Patch.

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Airline | Airline / GHA | PATCH | Loading (planned) | Update loading (planned) if required |

# 07. Process PLACI customs status notification

Customs assesses the PLACI status based on data shared. As a prerequisite, data needs to be made accessible to Authorities by Airline and/or Forwarder.

A dedicated Event on the Waybill can be created to notify Customs that PLACI data can be processed.

# 08. Send PLACI status notification to airline

Event is added on Shipment/MAWB by Authorities for PLACI status.

## API interaction

| 1R Server | Stakeholder | API Calls | LogiticsObject | Details |
| --- | --- | --- | --- | --- |
| Forwarder | Authorities | POST | Event on Waybill | Create Event: eventFor (Waybill), eventName and/or eventCode (PLACI status), eventDate, recordingActor |
