## Activity Model

ONE Record data model 3.0 introduced an activity model. It is built on the superclasses [LogisticsService](https://onerecord.iata.org/ns/cargo#LogisticsService), [LogisticsActivity](https://onerecord.iata.org/ns/cargo#LogisticsActivity), [LogisticsAction](https://onerecord.iata.org/ns/cargo#LogisticsAction), and [PhysicalLogisticsObject](https://onerecord.iata.org/ns/cargo#PhysicalLogisticsObject).
The activity model is developed based the design principles Single Source of Truth and Physics-orientation. Further emphasis lays on practicality over abstractation.
This page details the core concepts including examples.

## LogisticsService

A `LogisticsService` (a subtype of `LogisticsObject`) describes a set of scheduled and sequenced `LogisticsActivities` provided by one party to another.

<figure markdown>
  ![Security overview](./img/DM-ActivityModel-LogisticsService.jpg)
  <figcaption>LogisticsService and connected objects</figcaption>
</figure>

## LogisticsActivity

A `LogisticsActivity` (a subtype of `LogisticsObject`) describes an activity or process state which is scheduled and executed by an orchestrating party.
It involves a set of dedicated tasks in the form of specific `LogisticsActions` to be performed on `PhysicalLogisticsObjects`. 
Some activities are directly bound to a specific `PhysicalLogisticsObject`. 
It can be part of one or multiple `LogisticsServices`. 
It has an execution status that is actively maintained.

<figure markdown>
  ![Security overview](./img/DM-ActivityModel-LogisticsActivity.jpg)
  <figcaption>LogisticsActivity and connected objects</figcaption>
</figure>

## LogisticsAction

A `LogisticsAction` (a subtype of `LogisticsObject`) describes a specific task performed on one or a set of `PhysicalLogisticsObjects` in the context of a `LogisticsActivity`.
`LogisticsActions` serve the purpose of connecting different `PhysicalLogisticsObjects` to each other and to an `LogisticsActivity`.
It is set at a specific point in time. This can also be a time frame (start and end time). The time type can be either requested, planned or actual.

<figure markdown>
  ![Security overview](./img/DM-ActivityModel-LogisticsAction.jpg)
  <figcaption>LogisticsAction and connected objects</figcaption>
</figure>

## PhysicalLogisticsObject

A `PhysicalLogisticsObject` (a subtype of `LogisticsObject`) is the digital twin of a physically distinguishable object in the air cargo supply chain. 
It interacts with other `PhysicalLogisticsObjects` and `LogisticsActivities` through `LogisticsActions`.
Some `PhysicalLogisticsObjects` are directly connected to an `LogisticsActivity` describing its state.


<figure markdown>
  ![Security overview](./img/DM-ActivityModel-PhysicalLogisticsObject.jpg)
  <figcaption>PhysicalLogisticsObject and connected objects</figcaption>
</figure>

## Examples