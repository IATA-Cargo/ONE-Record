# Skeleton indicator property

The [skeleton indicator](https://onerecord.iata.org/ns/cargo/index-en.html#skeletonIndicator) has been introduced as a data property of `LogisticsObject` class. It is therefore inherited in most of objects of ONE Record data model.

The Shipment tracking initiated by Lufthansa Cargo briefly explains the skeleton indicator, see [here](https://github.com/digital-cargo/good-practice-shipment-tracking?tab=readme-ov-file#skeletonindicator).

# Skeleton indicator usage

There are multiple use cases when the indicator can be used, it will be up to stakeholders to define whether they want to flag `LogisticsObject`s as skeleton upon creation. 

!!! note
    Usage of the skeleton indicator is not restricted to the examples below.

## Creation of an object in advance 
When populating ONE Record data, it is possible that some objects are created before actual data is available. For instance a Shipper or Forwarder can create a `Piece` in advance without any data to prepare for the operational data.
In this use case, whenever data is available the Shipper/Forwarder can update the `Piece` object and remove the skeleton indicator.

## Enable linkage of objects
It can occur that an object is required to enable the linkage of other objects.

For instance we can imagine that in the transition phase from Shipment-level management to Piece-level management very few information about the `Piece` wil be made available. However some information about the goods are contained in the `Item` or `Product` objects. An "empty" `Piece` may then be required to link the `Item`/`Product` to the `Shipment`.

