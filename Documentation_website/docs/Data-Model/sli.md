# Requirements
The Shipper's Letter of Instruction (SLI) is a document in which the shipper gives handling instructions for the freight forwarder. It also allows the freight forwarder to act on the shipper’s behalf.

The SLI is part of CSC Recommended Practice 1650 and should refer to the United Nations Layout Key for Trade Documents in its paper form.

The requirements expressed in this document are based on the XSLI Cargo-XML message, 8th Edition, they can be summarized as follows:

**XSLI Header:**

- Letter of instruction number / customs reference
- Consignor details, including contact information, tax/customs information
- Consignee details, including contact information, tax/customs information
- Freight forwarder details, including contact information, tax/customs information
- Other parties details
- Transport and booking details, including terms of delivery and transport equipment details
- Special handling information, special service request, reference documents
- Currency details


**Packaging detail:**

- Complete packages details, including weights, volumes, etc.

**Commodity details:**

- Complete commodity details, including dangerous goods specific data elements


# Chosen approach

The SLI details are mainly at Piece and Shipment level.
- On the `Piece`: Package marks information.
- On the `Shipment`: Terms of delivery (expected delivery date and location, incoterms), indicators for Weight valuation and Other charges (Prepaid or Collect).
- On the `TransportMovement`: Mode Qualifier to indicate Pre-Carriage, Main-Carriage or On-Carriage.
- On the `Waybill`: Declared values for Carriage, Customs

The overall idea is that the SLI document in itself does not exist in the Data Model but can be recreated using existing objects and their data properties. It is then a matter of mapping the right information, essentially:
- Parties are represented by Company objects
- Packaging and handling details are data properties of Pieces and Shipment objects
- Commodity details are data properties of Item and Product objects
- Transport details are data properties of Transport movement linked to the pieces

# Data model

 <p align="center"><img width="1585" height="180" alt="image" src="https://github.com/user-attachments/assets/8046bfcf-a470-40ec-a197-e6a1f51109af" /></p>

!!! note
    This SLI requirements and mapping need to be further reviewed
