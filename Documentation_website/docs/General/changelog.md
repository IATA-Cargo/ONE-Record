# Ontology 3.3.0

All changes have been tracked on GitHub via issues and have been linked to the Pull-Requests.

## Detailed Changelog

Detailed changelog can be found in the associated GitHub commits:

### Pull Request [#394](https://github.com/IATA-Cargo/ONE-Record/pull/394): 

**Additions:**

- Added securityDeclarations to Shipment (Orchestration clarification about SecurityDeclaration vs. CustomsInformation #344 & Link SecurityDeclaration and Shipment #346)
- Added issuedForShipment to SecurityDeclaration (Orchestration clarification about SecurityDeclaration vs. CustomsInformation #344 & Link SecurityDeclaration and Shipment #346)
- Added totalVolume to Shipment ([Orchestration][DM] Shipment record simplifications #347)
- Added contactDetails to Organization ([Orchestration][DM] Shipment record simplifications #347)
- Added agentReference to Waybill([Orchestration][DM] Shipment record simplifications #347)
- Added otherIdentifiers to Waybill ([Orchestration][DM] Shipment record simplifications #347 Add otherIdentifiers property to all LogisticsObject types #353)
- Added StatusUpdateEvent as subclass of LogisticsEvent ([Orchestration] [DM]: Add StatusUpdateEvent as subclass of LogisticsEvent to facilitate FSU mapping in transition period #350)
- Added recordedPieceCount to StatusUpdateEvent ([Orchestration] [DM]: Add StatusUpdateEvent as subclass of LogisticsEvent to facilitate FSU mapping in transition period #350)
- Added recordedWeight to StatusUpdateEvent ([Orchestration] [DM]: Add StatusUpdateEvent as subclass of LogisticsEvent to facilitate FSU mapping in transition period #350)
- Added recordedVolume to StatusUpdateEvent ([Orchestration] [DM]: Add StatusUpdateEvent as subclass of LogisticsEvent to facilitate FSU mapping in transition period #350)
- Added notifiedOrganization to StatusUpdateEvent ([Orchestration] [DM]: Add StatusUpdateEvent as subclass of LogisticsEvent to facilitate FSU mapping in transition period #350)
- Added transferredTo to StatusUpdateEvent ([Orchestration] [DM]: Add StatusUpdateEvent as subclass of LogisticsEvent to facilitate FSU mapping in transition period #350)
- Added transferredFrom to StatusUpdateEvent ([Orchestration] [DM]: Add StatusUpdateEvent as subclass of LogisticsEvent to facilitate FSU mapping in transition period #350)
- Added notifiedOrganization to StatusUpdateEvent ([Orchestration] [DM]: Add StatusUpdateEvent as subclass of LogisticsEvent to facilitate FSU mapping in transition period #350)
- Added restriction for eventFor to Shipment to StatusUpdateEvent ([Orchestration] [DM]: Add StatusUpdateEvent as subclass of LogisticsEvent to facilitate FSU mapping in transition period #350)
- Added restriction for eventCode to StatusCode to StatusUpdateEvent ([Orchestration] [DM]: Add StatusUpdateEvent as subclass of LogisticsEvent to facilitate FSU mapping in transition period #350)
- Added transportMovementReference to StatusUpdateEvent ([Orchestration] [DM]: Add StatusUpdateEvent as subclass of LogisticsEvent to facilitate FSU mapping in transition period #350)
- Added valuationCharge to Waybill ([Orchestration][DM]: Review calculation of charge totals from ONE Record data #351 XFWB to DM 3.2 Mapping Documentation ValuationChargeTotalAmount > Waybill#declaredValueForCarriage #364)
- Added otherIdentifiers to LogisticsActivity (Add otherIdentifiers property to all LogisticsObject types #353)
- Added otherIdentifiers to PhysicalLogisticsObject (Add otherIdentifiers property to all LogisticsObject types #353)
- Added regulatedEntitiesReceivedFrom to SecurityDeclaration (Clarification required on how KC/AC relationships in eCSD can be established with the corresponding RA/RCs via ONE Record #361)

Removals:

- Deprecated totalDimensions ([Orchestration][DM] Shipment record simplifications #347)
- Deprecated receivedFrom (Clarification required on how KC/AC relationships in eCSD can be established with the corresponding RA/RCs via ONE Record #361)

### Under Pull Request 

Bugfixes:

- Fixed vis_element datatype from string to literal
- Fixed erratic owl:comment axioms to rdfs:comment for :AccountNumber and :handlingServiceFor
