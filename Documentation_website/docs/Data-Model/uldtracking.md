# Requirements

The ULD global tracking business requirements (main operational procedures and minimum data elements to be captured) are based on:
- the existing ULD Control Receipt (UCR) (see Cargo Services Conference Recommended Practice 1654 and Cargo-XML Message XUCR)
- the suggested ULD handover requirements between cargo handling agent (in the warehouse) and ramp handling agent taken consideration of UCR/ XUCR and Cargo iQ FIW/FOW events, and
- the reconciliation requirements for aircraft loading/ unloading of ULDs taken into consideration of CPM/ UWS/ UCM messages

For easy understanding, the recommendation looks at ULD tracking in four scenarios with respective data elements required as follows:

- ULD ground transfer: XUCR data elements
- ULD handover between cargo warehouse and ramp: XUCR data elements (recommended) or relevant data elements in Cargo iQ FIW/ FOW events (optional)
- Aircraft Loading/ Departure: relevant data elements in CPM/ UWS/ UCM
- Aircraft Arrival/ Unloading: relevant data elements in CPM/ UWS/ UCM

# Chosen approach

The ULD tracking requirements can be mainly managed with the usage of proper Events in ONE Record, the chosen approach consists of the following:
o	Addition of new data elements to the ULD objects, related to damage and details of the ULD

For better transparency we propose to split the ground transfer/handover using 2 events. This allows to properly identify the party responsible for the ULD at a given time:
- ULD Transfer: the transferring party creates a “Transfer” Event associated to the ULDs
- ULD Reception: the receiving party creates a “Received” Event associated to the ULDs
With this approach we recommend that events are created on every ULD to ensure proper tracking of the assets.

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161543221-16866468-5c07-4e4b-9171-5b7495871cd1.png"></p>

- Aircraft Loading and Unloading are managed through Events associated to the ULDs
 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161543170-fba25de5-1358-499e-a723-1af37336c502.png"></p>

The Transport movement gives details about the associated flight (flight number, time of departure, etc.).
The loadingPosition field in the Event allows to record the loading position of the ULD in the aircraft (e.g. lower or main deck), it is managed by a EventUld subtype of the Event.

# Data Model
The ULD tracking requirements have highlighted the need for a few additional data properties on the ULD object as well as the need to create a EventUld subtype of Event to record the loading position.

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161543116-b78a7c8b-77ac-499f-b270-9a8c2e2eaf63.png"></p>
