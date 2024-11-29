# Ontology 3.1.0

For this release, all changes have been tracked using GitHub project view: [https://github.com/users/IATA-Cargo/projects/2](https://github.com/users/IATA-Cargo/projects/2). All issues are linked to a pull request to properly follow all changes.

## Detailed changelog
Below is the detailed changelog:

- Added custom annotations for WIP visualisation: Inverse and Element ([https://github.com/IATA-Cargo/ONE-Record/issues/236](https://github.com/IATA-Cargo/ONE-Record/issues/236)) 
- Added TemperatureInstructions to Piece ([ #Add temperatureInstructons at Piece level #227](https://github.com/IATA-Cargo/ONE-Record/issues/227))
- Removed Shipment#specialHandlingcodes ([Remove Shipment#specialHandlingcodes #228](https://github.com/IATA-Cargo/ONE-Record/issues/228))
- Renamed label of WaybillLineItem properly ([Rename label of WaybillLineItem properly #234](https://github.com/IATA-Cargo/ONE-Record/issues/234))
- Changed partyDetails to LogisticsAgent ([Change partyDetails type #222](https://github.com/IATA-Cargo/ONE-Record/issues/222))
- Fixed regex pattern of waybillNumber ([waybillNumber xsd:pattern "[-9]+" incorrect, could be "[-0-9]+" #213](https://github.com/IATA-Cargo/ONE-Record/issues/213))
- Removed line breaks in rdfs:comment annotations
- Reassignment of Agents, LoadingUnit for visualization
- Updated Code List Element documentation
- Fixes to Code List md and examples
- Added temperatureInstructions to Piece ([ #Add temperatureInstructons at Piece level #227](https://github.com/IATA-Cargo/ONE-Record/issues/227))
- Added new property textualPostalCode to Address ([Change Address#postalCode type #221](https://github.com/IATA-Cargo/ONE-Record/issues/221))
- Added new property operatingParties to TransportMovement (https://github.com/IATA-Cargo/ONE-Record/issues/229)
- Added new class AccountingNote [(Review of Waybill#accountingInformation #231)](https://github.com/IATA-Cargo/ONE-Record/issues/231)
- Added new property accountingNoteIdentifier to AccountingNote [(Review of Waybill#accountingInformation #231)](https://github.com/IATA-Cargo/ONE-Record/issues/231)
- Added new property accountingNoteText to AccountingNote [(Review of Waybill#accountingInformation #231)](https://github.com/IATA-Cargo/ONE-Record/issues/231)
- Added new property accountingNotes to Waybill [(Review of Waybill#accountingInformation #231)](https://github.com/IATA-Cargo/ONE-Record/issues/231)
- Added new property locationIndicator to OtherCharge [(CXML Mapping XFWB - Add missing fields #247)](https://github.com/IATA-Cargo/ONE-Record/issues/247) - max 1, Location
- Added new property reasonDescription to OtherCharge [(CXML Mapping XFWB - Add missing fields #247)](https://github.com/IATA-Cargo/ONE-Record/issues/247) - max 1, string
- Added new property chargeQuantity to OtherCharge [(CXML Mapping XFWB - Add missing fields #247)](https://github.com/IATA-Cargo/ONE-Record/issues/247) - max 1, double
- Deprecated postalCode in favor of textualPostalCode [(Change Address#postalCode type #221)](https://github.com/IATA-Cargo/ONE-Record/issues/221)
- Deprecated accountingInformation in favor of AccountingNote and included properties [(Review of Waybill#accountingInformation #231)](https://github.com/IATA-Cargo/ONE-Record/issues/231)
- Removed specialHandlingCodes from Shipment [(Remove Shipment#specialHandlingcodes #228)](https://github.com/IATA-Cargo/ONE-Record/issues/228)
- Changed value of partyDetails from Organization to LogisticsAgent [(Change partyDetails type #222)](https://github.com/IATA-Cargo/ONE-Record/issues/222)
- Lifted cardinality restriction on regulatedEntityAcceptor in SecurityDeclaration [(Set securityDeclaration#regulatedEntityAcceptor as an array #244)](https://github.com/IATA-Cargo/ONE-Record/issues/244)
- Added new code-lists ontology [(DM: Refactor core code list ontology URIs to adhere to linked data best practices #268)](https://github.com/IATA-Cargo/ONE-Record/issues/268)
- Deprecated coreCodeLists ontology [(DM: Refactor core code list ontology URIs to adhere to linked data best practices #268)](https://github.com/IATA-Cargo/ONE-Record/issues/268)
- Added new code list DensityGroupCodes [(CXML Mapping XFWB - Add Code List 2 to ontology #248)](https://github.com/IATA-Cargo/ONE-Record/issues/248)
- Added property densityGroupCode to BookingShipment [(Add Density Group Code data property #230)](https://github.com/IATA-Cargo/ONE-Record/issues/230)
- Mirrored DGR and Security Status Codes to the Special Handling Codes namespace for simplification as part of code list review [(DM: Refactor core code list ontology URIs to adhere to linked data best practices #268)](https://github.com/IATA-Cargo/ONE-Record/issues/268)

Rework to WaybillLineItem (#265) as agreed on in DMWG 17/10 and CXML 12/11.

- Added new property pieceReferences to WaybillLineItem [(CXML Mapping XFWB - Multiple dimensions for TransportLogisticsPackage grouping #265)](https://github.com/IATA-Cargo/ONE-Record/issues/265)
- Added new property uldReferences to WaybillLineItem (#265)
- Deprecated and removed chargeableWeightForRate from WaybillLineItem (#265)
- Deprecated and removed commodityItemNumberForRate from WaybillLineItem (#265)
- Deprecated and removed dimensionsForRate from WaybillLineItem (#265)
- Deprecated and removed goodsDescriptionForRate from WaybillLineItem (#265)
- Deprecated and removed grossWeightForRate from WaybillLineItem (#265)
- Deprecated and removed hsCodeForRate from WaybillLineItem (#265)
- Deprecated and removed pieceCountForRate from WaybillLineItem (#265)
- Deprecated and removed productionCountryForRate from WaybillLineItem (#265)
- Deprecated and removed slacForRate from WaybillLineItem (#265)
- Deprecated and removed uldTareWeightForRate from WaybillLineItem (#265)
- Deprecated and removed volumetricWeightForRate from WaybillLineItem (#265)
- Removed uldOwnerCode from WaybillLineItem (#265)
- Removed uldSerialNumber from WaybillLineItem (#265)
- Removed uldType from WaybillLineItem (#265)
- Lifted cardinality restriction on ofShipment in Piece [(DM: Piece can be part of multiple shipments, change from n:1 to n:n #275)](https://github.com/IATA-Cargo/ONE-Record/issues/275)
