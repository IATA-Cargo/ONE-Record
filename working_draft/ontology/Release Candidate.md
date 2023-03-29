# ONE Record Data Model
## Release Candidate v3.0.0

### 1. Introduction
This document summarizes the changes proposed by the current Release Candidate (v3.0.0) in comparison to the latest endorsed version. The current RC proposes some important changes to the structure of the Data Model.

### 2. Improvements
#### 2.1. Service layer
**LogisticsService** class is added. The first Service in our scope is the Booking. More services can be added in the future, stakeholders are allowed to use the structure to define their own services.

Current definition of **LogisticsService** is the following:
> A **LogisticsService** is a sequence of Activities provided by one Party to another.
