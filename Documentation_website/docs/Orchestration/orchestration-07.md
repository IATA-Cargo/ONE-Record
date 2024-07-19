Process where the Airline receives the shipment at Carrier domain

# 01. Registration of AWB (w/ or w/out docs) / Truck driver to obtain unloading dock

TransportMovement of the Truck is updated with accurate drop off location.

An event DOC can be added on the Truck TransportMovement to reflect the registration at the dock.

**Milestone:** `DOC`

# 02. Validate Security/Customs status of truck

A Check object to verify Security and Customs status can be created, the results are registered in the CheckTotalResult object.

An Event on the Pieces/ULDs or Shipment can also be created to record the check

# 03. Assign unloading slot and position to deliver truck

Event is added on the Truck TransportMovement indicating arrival at dock position

# 04. Unload truck

Unloading (actuals) are created and linked with TransportMovement (truck) and Pieces.

Events are created on the Pieces/ULDs with FOH

**Message:** `(X)FSU` with FOH status
**Milestone:** `LAT`

# 05. Receive transferred shipments (FF & carrier)

# 06. Move shipment to storage location

Storage Activity is created with Storing Action (actuals) to link the Pieces/ULD to a storage place.

**Milestone:** `STI`

# 07. Screen freight as applicable

If applicable, create or patch existing SecurityDeclaration linked to Pieces
