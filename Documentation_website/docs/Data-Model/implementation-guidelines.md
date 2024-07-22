# Paper transport documents in ONE Record

The general concept of legal entities like MAWB or HAWB in ONE Record does not differ from the established concepts in term of legal preconditions or validity. All the legal requirements remain in place and must be fulfilled. But because of the architecture of ONE Record, changes in the practical management of data are required. In the context of ONE Record, a legal entity like the AWB has the following characteristics:
- A defined set of data fields, as described in the corresponding Logistics Object

These data fields are either attributes (e.g. type of AWB) or defined as links to other LOs in the data model (e.g. Booking or Shipment).

- From defined owners

Due to legal requirements, some fields must be provided by the accountable party. E.g. in case of MAWB, the forwarder must be owner of most data fields, although some data fields (like the transport segments with the planned routing) are owned by the carrier, and some are owned by shippers (e.g. the commodity information).

- For a special purpose (“e.g. Master Air Waybill”)

The traditional paper documents fulfil a defined legal purpose. To fulfil this purpose is the only function of the correlating Logistics Object (e.g. “AWB Logistics Object”).

- At a special point in time, consented by two parties (e.g. “Shipper” and “Carrier”)

The data of the LO is intentionally shared by the contractual parties at a defined point in time, to freeze that version of the data set as the one used for the contractual purpose. Data might change afterwards, but the changed revisions will not be taken into consideration, unless a new version of the legal entity is generated and consented on.

## Master AWB
### Digital AWB approach

The digital AWB approach follows the four principles of avoiding redundancy, marking outdated data fields as deprecated, removing all data fields without a legal impact and, fourthly, separating all non-legal, physical characteristics in a separate LO (Shipment).

Firstly: remove redundancies with any other data source and data fields covered by ONE Record mechanisms. Most data classically found in the AWB are essential parts of the Booking Option and Booking Option Request as well as the Piece and Shipment objects. As those LOs are created earlier in the logical chain, the data in the booking process is in the lead and referred to in the AWB. Data like WAYBILL_NUMBER, the total gross weight, the origin and destination, or the number of pieces originate from the Booking, not the AWB. Additionally, some information is not required anymore, especially the total-fields, as the mechanism to be used in ONE Record would be to count the correlated items themselves.

Secondly: Mark outdated data fields clearly as deprecated. All the data fields found under the WayBill Lane in the cIMP/cXML data catalogue are considered to be outdated, especially the IATA Rates. The whole architecture of these fields, presenting characteristics of groups of pieces, is already not supported by most carriers nowadays. Additionally, the structure of this LO is not compatible with the principles of ONE Record.

Thirdly: Remove all data fields that have no legal impact on the AWB. A lot of information was traditionally part of the AWB, as the AWB used to be the major – and often exclusive – source of information on the shipment. With ONE Record, any data can shared in correlation with the AWB number or any other unique ID, but then don’t have to be part of the AWB. This mostly effects fields like the accounting information, the airline product names and codes, or the insurance information. Also, parts of the other charges section not be part of the contract between forwarder and carrier, as the add up during the execution of the AWB.

Fourthly: All physical characteristics of the totality of pieces under one contract can be found in the Shipment LO. This does not include piece-related information, as they are characteristics of pieces themselves, but physical characteristics that are shared by all pieces under that contract.
The data fields of the AWB LO and owners of each of these fields are better described in the Use Case document for the ONE Record data model (insert reference).

#### Pieces / ULDs in AWB wording

The legal terminology for BUPs in the AWB is not consistent, as BUPs don´t count as ULDs, but as pieces. To solve this problem, the following solution is suggested: Whenever a BUP is pre-sented by the forwarder, additionally to the ULD LO, a single Piece LO is created with the dimensions and gross weight of the packed ULD.

###### 4.2. House AWB

The House Waybill is made up from data provided by the Customer in the Shippers Letter of Instruction (SLI) which is then enhanced by the forwarder as necessary to include specific data required by the forwarder, carrier and other authorities. This then provides the door to door route map of the pieces linked to the House Waybill for cIQ transportation plan. 
