# High level data model

ONE Record Data Model aims to support air cargo operations and needs to ensure that every piece of data required exists. Starting from existing legacy standards and business use cases, we have defined an extensive data model. 

The high level data model, or conceptual data model, can be seen in details using our [Visualizer tool](https://iata-cargo.github.io/ontology_visualizer/databases/cargo_3_2).

The essential objects for air cargo operations are displayed, they make the core of ONE Record Data Model.

- `Piece` is at the center of the model, it represents transported goods
- `Item` and `Product` are used to describe further de `Piece`
- `ULD` or `LoadingUnit`(s) are the common loading devices used to carry freight into aircrafts' bellies. They are linked to `Piece`(s) via the `UnitComposition` activity (see further in the Activity Model part)
- `TransportMovement` represent the flight legs or any other means of transport movement such as truck movements.
- `Shipment` represent the consignments
- `Waybill` is the digital twin of the Air waybill and represents the contract of carriage between the airline and the freight forwarder
- The `LogisticsEvent` is an essential part of ONE Record, it represents any ocurring event that is worth recording, like a status update for a `Piece`
