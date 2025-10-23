# XFSU Purpose

XFSU message is used to provide a Shipment Status update, discrepancy details or sometimes to provide complementary Customs information. It is also used to share Shipment milestones by Cargo-iQ members.

# XFSU Mapping

FSU and XFSU messages are Shipment level messages, the entry point is the AWB number but it can also be used to provide status updates on part or split shipments. 

## Proposed mechanism

### Shipment-level status

In a fully ONE Record environment the information is shared at Piece level. It implies that all Pieces are properly identified and that statuses can be applied on individial pieces within a shipment. This solves the issues with part or split shipments. However it is currently very complicated to have proper Piece level status updates for two main reasons: From a technological point of view the messages (FSU/XFSU) can only convey Shipment level information and from an operations point of view very few stakeholders are fully capable of handling piece level information.

For the sake of XFSU mapping with ONE Record, everything needs to be made at Shipment level, meaning linked to `Shipment` object.

!!! note
    It is essential to note that these guidelines are only effective in the context of mapping between (X)FSU and ONE Record. ONE Record is by design Piece-centric and is ready for Piece level management.

### Types of status updates

The mapping with ONE Record differs based on the kind of Status update. We identify 2 main use cases:

- Shipment status updates (e.g. RCS, FOH, etc.) are based on the usage of `LogisticsEvents` on the Shipment. **(Will most likely be `StatusEvents` or something similar)**
- Providing additional information such as Security or Customs details, reffered to as (X)FSU-OCI. These do not require usage of `LogisticsEvents` but the update of relevant obejcts.

#### Status updates based on `LogisticsEvents`

In case of **full shipment** status update, the `LogisticsEvents` can be added on the Shipment or on all the Pieces. Both scenarios are valid.

### Specific case of split shipment:
With messaging standard, it is possible to transmit status update on a split shipment without the need to identify properly the pieces impacted. In this case the data transmitted can only be kept at Shipment level, however this pratice is contradictory with the piece level management design principle of ONE Record.
To cope with that there are multiple possibilities to map XFSU with ONE Record, depending on stakeholder's capabilities on the operations side to identify impacted pieces of a shipment.

- If pieces **cannot be** properly identified, recommendation would be to use `LogisticsEvent` on the Shipment, using the *LogisticsEvent#partialEventIndicator* to notify it applies to a split shipment. In this scenario it becomes complicated to provide the right level of information at the "AssociatedStatusConsignment" level as per the XFSU schema.
- If pieces **can be** properly identified, it is recommended to use `LogisticsEvent` on the identified Pieces. The *LogisticsEvent#partialEventIndicator* can be used to notify it applies only to selected pieces and not to the whole shipment but all details at "AssociatedStatusConsignment" level are at Piece level in ONE Record realm.

### Involved parties
When using XFSU, depending on the Status Code some parties need to be identified. By default the `LogisticsEvent` has the *recordActor*/*recordingOrganization* data object to identify the party creating the `LogisticsEvent`.

With Ontology 3.2.0 an *involvedParty* data object (data type: `Party`) has been added to `LogisticsEvent` to allow for a proper mapping.

Let's have a look at the various parties required for XFSU status codes and the proposed mapping:

- Transferring party: usage of *recordActor*/*recordingOrganization*
- receivingParty: usage of *involedParty* with *PartyRole* = "FX" (Current receiver)
- notifiedParty: usage of *involedParty* with *PartyRole* = "NI" (Notify party)
- deliveredToParty: usage of *involedParty* with *PartyRole* = "ST" (Ship to)

Note that the Code List used refers to the [UN/CEFACT Party Role Code List](https://vocabulary.uncefact.org/PartyRoleCodeList).

The mapping of XFSU message still needs to be fine tuned to take into account multiple scenarios.
