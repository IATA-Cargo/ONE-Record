# XFWB purpose

XFWB message, and its predecessor FWB Message based on CIMP standard, is used to transmit complete Air Waybill data in accordance with IATA Cargo Services Conference Manual Resolution 600a. In reality we see multiple usage of the (X)FWB message that derive a bit from its original purpose. It can be the transmission of additional information (OCI for instance) or the update of goods description and weight/dimensions by a GHA. This page will focus on the main usage.

# XFWB Mapping
## Proposed mechanism
XFWB data fields are mostly a mix of `Waybill`, `WaybillLineItem`, `Shipment`, `Pieces` and `TransportMovement` data in ONE Record realm.

## Usage of WaybillLineItem object
The `WaybillLineItem` object was introduced to properly share rate data as required in the Air Waybill. The `WaybillLineItem` has a n-to-1 relationship with a `Waybill` object and represents the different line items on the paper waybill with all their specifities based on the type of rating used. In order to stick to reality as much as possible, some data at line item level are taken from `Pieces` and `LoadingUnits` directly (dimensions, volume, ...). The `WaybillLineItem` object itself shall only contain **rate** specific data.

It is important to note that the `WaybillLineItem` has been added **only in the context of sharing Air Waybill data**. When looking at Operations, digital twins shall be used (`Piece`, `Item`, `Product`, etc.)

## TransportMovement information
XFWB movement and routing details are mapped to `TransportMovement` objects. The proper linkage, starting from the `Waybill` is to to go through the `Booking` object which refers to the contractual engagements between a carrier and the freight forwarder. The various `TransportMovement`(s) planned for the transportation of the goods need to be linked to the `Booking` as an `ActivitySequence`. 

## Usage of OtherCharge object
The `OtherCharge` object is used to record all charges, it refers to `<ram:ApplicableLogisticsAllowanceCharge>` grouping in XFWB message. Code List 1.2 "Other Charge Code" is used to properly identify the charges associated with the Prepaid/Collect indicator.

Totals are not directly recorded in ONE Record as they can be directly calculated based on the existing data (e.g. filtering by type of charge and prepaid/collect indicator).

### Other specific mapping guidelines

- `DensityGroupCode` field will be linked to Distribution phase as the feedback received from the industry shows that it's not an operational data but used for the Sales & Booking process part. It is then found on the `BookingShipment` object if required.

- `Special Service Request` and `Other Shipping Instructions` code fields are not in ONE Record as there is no evidence of an actual referential and standard used for those. Moreover it seems stakeholders use SSR or OSI for the same purposes. Thus we have merged into `textualHandlingInstructions` property in ONE Record.

- In the `ApplicableRating` grouping, the `TypeCode` field is set to F (Facial) by default as it is the only value used with CXML.

- In the `ApplicalbeFreightRateServiceCharge` grouping, the `AppliedAmount` is not directly mapped as it is a total that needs to be derived from either the **Rate** or the multiplication of **Rate** and **Chargeable weight** depending on the type of charge. Refer to CSC Resolution 600a for further explanations.

# CIMP Mapping example

## Simple scenario
A simple scenario has been chosen to display the JSON-LD equivalent of a FWB subset.
The example showcases:
- A FWB with 6 pieces, total weight 120kg, chargeable weight 180kg (rate percentage of 1.5), total volume 0.31 cubic meter.
- 4 Pieces have 80/40/20 dimensions
- 2 Pieces have 60/30/15 dimensions
- 2 HS codes are defined: 123456 and 987543
- Special handling code NSC (Not Screened) is used

The FWB extracts looks the following:
```http
--8<-- "Orchestration/assets/FWB-Example1.txt"
```

The JSON-LD equivalent looks the following:
```http
--8<-- "Orchestration/assets/CIMP-Example1.json"
```
