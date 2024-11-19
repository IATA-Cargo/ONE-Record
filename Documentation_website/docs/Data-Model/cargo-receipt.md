# Requirements
The Receipt for the Cargo (or Cargo Receipt) is defined in CSC Resolution 660, Recommended Practice 1670 and Resolution 672.

The document's layout is the following:
![image](https://github.com/user-attachments/assets/47f19e6a-8c57-4a11-ae9c-8dd22145c816)

# Chosen approach
The mapping for the Cargo Receipt is straightforward and is based on already existing objects and properties.

## Cargo Receipt mapping

| Box | Air Waybill   requirements                   | 1R mapping                          | Comment                                                                                                                                          |
|:---:|----------------------------------------------|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
|  1  | Shipment   Identification                    | Waybill#waybillPrefix+waybillNumber | A   hyphen shall be inserted between waybillPrefix and waybillNumber. Format:   XXX-XXXXXXXX                                                     | 
|  2  | Shipper   Name                               | Waybill#involvedParty               | In   Party: use partyDetails to capture the shipper's name and address. Use   partyRole to specifiy SHP for Shipper or FFW for Freight Forwarder |
|  3  | Issued   By                                  | involvedParty#Party                 | From   Party: use partyDetails to capture the carrier's name and address. Use   ParticipantIdentifier to specifiy AIR for Airline                |
|  4  | Day/Month/Time   (of Shipment Acceptance)    | LogisticsEvent#eventDate            | where   eventCOde is 'RCS'                                                                                                                       | 
|  5  | Airport/City   Code (of Shipment Acceptance) | Waybill#departureLocation           |                                                                                                                                                  |
|  6  | Total   Number of Pieces                     | Shipment#pieces                     | Count   of Pieces linked to Shipment                                                                                                             |
|  7  | Weight                                       | Shipment#totalGrossWeight           | numericalValue   from Value                                                                                                                      |
|  8  | Code                                         | Shipment#totalGrossWeight           | unit   from Value                                                                                                                                |
|  9  | Volume                                       | Shipment#totalDimensions            | volume   from totalDimensions                                                                                                                    |
|  10 | Airport/City   Code (of Origin)              | Waybill#departureLocation           |                                                                                                                                                  | 
|  11 | Airport/City   Code (of Destination)         | Waybill#arrivalLocation             |                                                                                                                                                  | 
|  12 | Airport/City   Code (of Routing)             | TransportLegs#arrivalLocation       | Where   legNumber is between '1' (excluded) and 'Greatest' (excluded)                                                                            | 
