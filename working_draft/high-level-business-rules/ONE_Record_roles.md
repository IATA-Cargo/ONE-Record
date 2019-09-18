# General Approach
* This file describes the roles that are to be used in ONE Record
* The baseline are roles required by legal preconditions (e.g. "DG-Shipper") plus roles, that make sense to optimize the business process and provide transparency(e.g. a separation of "Airline" and "GHA"-roles).
* The business rules of ONE Record depend on a model of roles of stakeholders in the transportation process 
  * Each stakeholder can have several roles
  * but each stakeholder can perform a transaction applying only one role
* One of the major goals of this file is to ensure a common understanding of roles throughout all modes of transportation 

# General Roles
## Shipper
* tbd
* Open Issues: Shipper vs. Consignor

## DG Shipper
This role is to be applied when a Shipper creates a documentation of the nature and quantity of Dangerous Goods according to IATA / ICAO regulations.
Special requirements must be fulfilled here as a precondition to act in that role (e.g. certifications in Dangerous Goods handling).

## Forwarder
* tbd

## Customs
* tbd

## Consignee
* tbd

## Packing Company
* tbd

# Air Transportation Domain

## Airline
* tbd

## GHA
A ground handling agent is responsible for handling freight at an airport on behalf of an airline. This usually includes handling documents and physical freight. 

## Security Provider
A security provider is usually a subcontractor of the forwarder to screen / sniff, etc. the freight to ensure compliance with security requirements
As a special issue, the security provider doesn´t own the security status fields, but sets Change requests to the Forwarder´s fields, as the Forwarder will stay responsible for the content of a data field. The Forwarder then can trust his subprovider by executing every update request in terms of security status.
