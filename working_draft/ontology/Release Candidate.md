# ONE Record Data Model
## Release Candidate v3.0.0

### 1. Introduction
This document summarizes the changes proposed by the current Release Candidate (v3.0.0) in comparison to the latest endorsed version. The current RC proposes some important changes to the structure of the Data Model.

### 2. Improvements

#### 2.1. Overview
The RC 3.0 proposes some structural changes to the Data Model. A few essential classes are added: **LogisticsService, LogisticsActivity, LogisticsAction** mostly. In order to emphasize the Digital Twin principle, a **PhysicalLogisticObject** class is added that contains objects such as **TransportMeans** or **Piece**.

#### 2.2. Services

**LogisticsService** class is added with the following definition:
> A **LogisticsService** is a sequence of Activities provided by one Party to another.

**LogisticsService** class is added. The first Service in our scope is the Booking. More services can be added in the future, stakeholders are allowed to use the structure to define their own services.

#### 2.3. Activities
**LogisticsActivty** class is added with the following definition:
> A **LogisticsActivity** is a scheduled set of tasks that is executed as part of one or more Services.

The main **LogisticsActivity** is the **TransportMovement** which represents essentially flight movements. Activities can also be about moving or storing goods for instance.

In first iteration a generic activity is defined with common data properties and subtypes are defined when relevant (e.g. TransportMovement, Storing, etc.)

#### 2.4. Actions
**LogisticsAction** class is added with the following definition:
> A **LogisticsAction** is a specific task with a specific result performed on one or more LOs by one party in the context of a **LogisticsActivity**.

Actions represent the tasks within an Activity and contain the scheduling of the tasks. In order to track properly the potential discrepancy between a planned action and an actual action there should be a *Scheduled* or *Planned* task and an *Actual* task.
For instance if 5 pieces were intended to be loaded onto a flight and only 4 of them are actually loaded this can be easily tracked.

#### 2.5. Company / Organization
The model for organizations is taken from the W3 model: https://www.w3.org/TR/vocab-org/#description.
