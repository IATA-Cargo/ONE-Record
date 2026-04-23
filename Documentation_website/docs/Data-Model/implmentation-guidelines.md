This page provides general guidelines for implementers of the ONE Record data model. It complements the ontology documentation and the use-case-specific pages by addressing cross-cutting concerns that apply regardless of the business process or message type being implemented.

# Handling of dummy and placeholder values

In legacy cargo messaging standards (CIMP and CXML), dummy or placeholder values are commonly used when a required field has no meaningful data to provide at the time of transmission or when the cardinality of a data field is different from one standard to another. Typical examples include:

- `XXX` as a placeholder airport or location code
- `TBD`, `N/A`, or `.` as placeholder text in mandatory free-text fields
- Arbitrary future dates used to satisfy mandatory date fields e.g. `12/99` used for expiry date

These practices emerged as workarounds for message-level mandatory field constraints that do not exist in the same way in ONE Record.

## Principle: omit rather than fabricate

ONE Record is built on linked data principles. **A property that has no meaningful value should simply be omitted** from the Logistics Object, rather than populated with a dummy or placeholder value. Consuming systems must be designed to handle the absence of optional properties gracefully.

Populating a field with a dummy value is actively harmful in ONE Record because:

- It pollutes the data with false information that downstream systems may consume and act upon.
- It breaks the semantics of the ontology — a `location` of `XXX` has a specific, incorrect meaning.
- It undermines the trustworthiness of the data, which is one of the core value propositions of ONE Record.

## Guidance per scenario

There are multiple scenarios, in a very few cases guidelines were provided in the past but most of the times each Airline have their own rules. Below a few examples:

| Scenario | Legacy messaging habit | ONE Record approach |
|---|---|---|
| Location not yet determined | Use `XXX` | Omit the location property or link to a partial `Location` object with only the known attributes |
| Goods description not available | Use `.` or `N/A` | Omit `goodsDescription` until actual content is available |
| Date/time not yet confirmed | Use a far-future date | Omit the date property or use a `Logistics Event` to record the information once confirmed |
| Mandatory field in legacy message has no equivalent data | Populate with dummy | Do not create a corresponding ONE Record property at all |

## Handling mandatory fields during message conversion

When converting from a legacy message (FWB, XFWB, etc.) to ONE Record, dummy values present in the source message **should not be carried over** into the ONE Record representation. During the mapping process, implementers should identify known dummy value patterns and treat them as absent data — i.e. simply not populate the corresponding ONE Record property when possible.

Conversely, when converting from ONE Record to a legacy message format where a field is mandatory, the mapping layer is responsible for generating an appropriate placeholder. This is a concern of the **outbound message generation**, not of the ONE Record data model itself.

## Skeletons and partial data

ONE Record supports the concept of a **skeleton indicator** (`skeletonIndicator = true`) on Logistics Objects to explicitly signal that an object is incomplete and represents a partial digital twin, pending enrichment by other parties. This is the correct mechanism to use when a Logistics Object needs to be created before all data is available — not the use of dummy values.

Refer to the [Skeleton indicator](../skeleton/) page for further details.

# Data ownership, object reuse, and the authoritative source principle

## Reuse of Logistics Objects

ONE Record is a linked data standard. A core consequence of this is that Logistics Objects — such as `Location`, `Organization`, `RegulatedEntity`, or `Product` — should be **created once and referenced by their URI**, rather than duplicated inline across multiple objects.

For example, if an airline's Frankfurt hub appears as a departure location on hundreds of shipments, there should be a single `Location` object for FRA, referenced by all of them — not a new inline location object created for each shipment. The same applies to `Organization` objects for known parties, `Product` objects for recurring commodities, and so on.

Duplicating objects instead of referencing them:
- Increases storage and processing overhead.
- Makes it impossible to update a shared attribute (e.g. an organization's address) in a single operation.
- Breaks the graph structure that enables cross-object queries and data quality checks.

## The authoritative source principle

In ONE Record, each piece of data has an **authoritative source** — the stakeholder who is best positioned to create, own, and maintain it. Implementers should align their data creation responsibilities accordingly:

- **Carriers** own `TransportMovement` and flight-related data.
- **Freight Forwarders** own `Shipment`, `Piece`, and `Waybill` data for the consignments they manage.
- **Ground Handlers** own operational event data (acceptance, build-up, etc.) for the facilities they operate.
- **Shippers / Known Consignors** own product and commodity data (`Product`, `Item`).

This principle has a direct implication for **object creation**: a party should not create a Logistics Object that falls under another party's ownership unless they are acting on that party's behalf. When a party needs to enrich or correct data owned by another party, the correct mechanism is a **Change Request**, not a silent overwrite of the object.

Respecting data ownership avoids conflicting data versions and ensures that the authoritative record remains traceable to its source.

# Timestamping, events, and audit trail

ONE Record provides two complementary mechanisms for tracking the state of data over time:

- **`LogisticsEvent`** objects, which record that something happened at a given point in time (e.g. freight accepted, security status issued, departure recorded).
- **Change Requests**, which record that a data property on a Logistics Object was modified, by whom, and when.

The general principle is that **data should not be silently overwritten**. When a value changes — because a flight was rescheduled, a weight was updated after reweighing, or a security status was revised — the change should be captured through the appropriate mechanism so that a full history is preserved.

In practice this means:
- Use `LogisticsEvent` to record operational milestones and status changes, even when the underlying Logistics Object properties have not changed.
- Use Change Requests to update Logistics Object properties, so that the audit trail of who changed what and when is maintained by the server.

# Handling of nulls, empty strings, and boolean defaults

## Nulls and empty strings

In ONE Record JSON-LD payloads, **properties with no value should simply be absent** from the serialisation. Neither `null` nor empty string (`""`) values should appear in a valid ONE Record payload:

- A `null` value has no defined meaning in JSON-LD and will be ignored or may cause parsing errors in some implementations.
- An empty string `""` is a valid RDF literal with a specific (non-empty) meaning — it asserts that the property exists and its value is an empty string, which is almost never the intended semantics.

Both patterns are common artefacts of automated serialisation from object models where fields are initialised by default. Implementers should ensure their serialisation layer suppresses null and empty-string properties before publishing a Logistics Object.

## Boolean defaults

Boolean properties in the ONE Record ontology should only be explicitly set when their value carries meaningful information. In particular:

- A boolean property set to `false` that is also the implicit default **should be omitted**, as its presence adds no information and increases payload size unnecessarily.
- A boolean property set to `true` should always be explicitly included, as it signals a deliberate assertion (e.g. `skeletonIndicator = true` explicitly marks an object as incomplete).

The most common example is `skeletonIndicator`: it only needs to be present and set to `true` when the object is genuinely a skeleton. Omitting it is equivalent to `false` and is the expected norm for complete objects.

This is consistent with the broader "omit rather than fabricate" principle described in the dummy values section above.
