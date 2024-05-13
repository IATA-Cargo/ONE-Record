# API Features
The following features summarize all of the ONE Record API features

**Get ONE Record Server Information** Anyone who has access to a ONE Record server can retrieve the technical server meta information that contains information about supported features, supported ONE Record API version, supported ONE Record data model version, etc.

**Create and publish a Logistics Object** - Anyone who controls a ONE Record server can create a new Logistics Object based on the ONE Record data model specification. Once created the Logistics Object is associated with a unique URI that makes the Logistics Object available on the network.

**Read a Logistics Object** - Logistics Objects can be retrieved by calling the URI of that Logistics Object - its Logistics Object URI. Access rights to that Logistics Object URI is managed by the Holder of the Logistics Object.

**Update a Logistics Object** - As a fundamental principle, _only_ the Holder of a Logistics Object can make changes to it. Therefore, changes required by other parties are expressed as `Change Requests` that needs to be approved and executed by the actual holder.

**Subscribe to a Logistics Object for updates** - Once a Logistics Object has been created, the holder can propose subscriptions to other parties who will then be notified of any changes. Other parties may also request such a subscription at the discretion of the holder.

**Create Logistics Event linked with Logistics Objects** - Logistics Events like "arrival", "acceptance" etc. are central in the management of logistics and transport. Every participant in the network with sufficient access rights can submit any type of Logistics Event to any published Logistics Object.

**Read Logistics Event linked to a Logistics Object** - Every participant of the network with sufficient permissions, can also query the Logistics Events associated with a Logistics Object.

**Manage access to a Logistics Object** - Another fundamental principle of ONE Record is that only holders of Logistics Objects have fully control access rights to that Logistics Object. Therefore, only the holder of a Logistics Object can delegate permissions to users of the Logistics Object.

**Delegate access to a Logistics Object to a third party** - By default, most Logistics Objects are not public accessible. Most of the time, access is granted to specific parties. Should these parties need to delegate access to further stakeholders - because they require data access to fulfil their logistics activities- then there is a mechanism for requesting such access to the holder of the Logistics Object.

**Manage and access versions of Logistics Objects** - Each time a logistics object is updated by a change in data, this change is recorded in an audit trail. This automatically creates a new version of the Logistics Object. Each version of the logistics object SHOULD be found and retrieved.

**API security** - Although not strictly an API feature, ONE Record specifies security measures for implementation on web servers such that access to the server may be identified, authenticated and authorized.

# API Endpoints

| HTTP Methods     | API Endpoint       | API Function                           |
| ---------------- | -------------------------------------- |   -------- |
| GET              | /                  | Retrieve ServerInformation             |
| POST              | /logistics-objects/ | Create Logistics Object. This endpoint could be either internal or not implemented.             |
| GET, PATCH       | /logistics-objects/{logisticsObjectId}                  | Retrieve Logistics Object and links to related resources                       |
| GET              | /logistics-objects/{logisticsObjectId}/audit-trail      | Retrieve Audit Trail of a Logistics Object                 |
| GET, POST        | /logistics-objects/{logisticsObjectId}/logistics-events | Create or retrieve LogisticsEvents to a Logistics Object                       |
| GET              | /logistics-objects/{logisticsObjectId}/logistics-events/{LogisticsEvent URI}                  | Retrieve a LogisticsEvent              |
| GET, POST        | /subscriptions     | Create or retrieve Subscription information for a Logistics Object type or a specific LogisticsObjectIdentifier          |
| GET, PATCH, DELETE | /action-requests   | Create, retrieve, or update Action Request (i.e. SubscriptionRequests, ChangeRequests or AccessDelegationRequests) |
| POST             | /notifications     | Receive Notifications                  |
| POST             | /access-delegations | Create, retrieve, or update Access Delegation Request      |
