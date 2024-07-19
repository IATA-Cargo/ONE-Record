# Requirements
The requirements for pharmaceutical shipments may differ depending on the parties involved. We have highlighted two cases.

 ![image](https://user-images.githubusercontent.com/58464775/161540717-d8822fe8-98be-4706-8dd2-95921ddbc4cb.png)
 **From Shipper to forwarder:**

 - Product Temperature Range: the shipper express the temperature range the shipment need to handled. The requirement is expressed in free format.
 - Packaging Technology: passive or active technology
 - Packaging Type: packaging type as per chapter 6.3.7 of the TCR
 - Unit Loading Device: information related to the ULD (exemple: uldTypeCode, serialNumber, ownerCode, ataDesignator)


![image](https://user-images.githubusercontent.com/58464775/161540770-fe4db666-d382-45a7-b899-1410a1c4e8e4.png)
  **From forwarder to carrier:**

  - Product Temperature Range: Special handling code (COL, CRT, ERT, FRO)
  - Packaging Technology: Special handling code (ACT, PIP)
  - Packaging Type: as per chapter 6.3.7
  - Unit Loading Device: see ULD data elements from ONE Record data model

# Chosen approach
Data model covers the pharmaceutical shipments requirements using the **ULD, Piece, ServiceRequest and SpecialHandling** objects.

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161540599-509917bb-17f7-453f-b111-afe3e20b5d77.png"></p>


The ULD object capture all the information related to the ULD used by the shipper/forwarder

The information is captured at Piece level. The Piece object enables to capture all the required information, including goods description, product information, ULD information, handling information, packaging type as per chapter 6.3.7 of the TCR. If accompany certificate are required, they can be digitalized (if acceptable) in PDF format for example and the link to the PDF document can be inserted using the externalReference data property.

The SpecialRequest object is used to capture the shipper requirements. Either the special handling code can be inserted (if known), or the requirement can be inserted in full text using the statementText attribute. Requirements may include:

- Active or Passive packaging
- Product temperature range

The SpecialHandling object aims to capture all the special handling codes. For pharma product, the use of the below codes have been identified:
- PIL: Pharmaceuticals
- ACT: Active Temperature Controlled System
- PIP: Passive Insulated Packaging
- COL: between +2°C to +8°C
- CRT: between +15°C to +25°C
- ERT: between +2°C to +25°C
- FRO: below -18°C

# Data model
As a result there are no specific part of the data model that were required for the integration of pharmaceutical shipments.
