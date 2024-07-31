# Requirements
The Modernizing Cargo Distribution working group (MCD) has defined the standardized Sales & Booking process to highlight the business and data requirements of Distribution.
The current Sales & Booking process is the following:

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/208693593-3cb14437-a7a1-4346-b190-0ac9c971127d.png"></p>

 In addition a specific Cancellation process has been defined:

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/208693718-e891685c-915d-43ff-85cf-d602e042488c.png"></p>

In this process, the quote request should contain a minimum set of information:

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161542864-5186c31b-6751-4077-8576-c6c037c5c4ca.png"></p>

The second step, airline presenting booking options, needs to ensure that the following data are included:

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161542537-7ba94102-e12d-4a39-b6cd-8361b90b0327.png"></p>

The booking confirmation step ends the Quote & Book process, it should ensure that some data are validated and agreed between the two parties. The data are:

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161542478-683d4ade-410f-4602-8505-342320802e79.png"></p>

Further discussions with MCD working group members allowed to identify the need to properly track the shipment status and data throughout the shipment lifecycle. Essential shipment data such as Weight can evolve as the Quote & Book process moves forward, the data model and ONE Record specifications need to ensure that this is possible.
The group came up with a proposal for a standard shipment lifecycle as depicted below:

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161542328-812adeb3-2b26-4d8b-b3f5-2cbe8e3fad25.png"></p>

This is an example of a typical shipment lifecycle that should help standardize some of the events and milestones that are required on the business side of the Quote & Book process.

# Chosen approach in the data model
The chosen approach is on multiple levels to make sure that all requirements are met.

## Definition of appropriate objects to reflect Distribution
Four main objects have been defined to represent the Distribution:
- Booking Shipment: In the context of Distribution, and only distribution, the **BookingShipment** is a simplified mix between Piece and Shipment to meet a quote request minial requirements.
- Booking Option Request: It refers to the quote request.
- Booking Option: A Booking Option is an offer made by a carrier that is supposed to be bookable.
- Booking Request: It refers to the booking confirmation request, equivalent to (X)FFR message.
- Booking: Used for confirmed bookings, it contains all information that have been agreed between customer and carrier.

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/208692176-dbd79115-e340-4567-bcd9-dbd3f79176fc.png"></p>

Along those two main objects, a few simpler objects are added to ensure that all information are available for the Sales & Booking process. It includes **Routing,  ScheduledLegs, BookingTimes, BookingSegment, CarrierProduct, Price, Ratings and Ranges**.

**Ranges** are included to address challenges where cargo tendered to Airline has variance versus the booking option request dimension and/or weight.  

As the Sales & Booking process may occur before actual operations, we have chosen to allow for some data property at **BookingOptionRequest** level that are to be used for the sole purpose of the quote request. Thus the expectedCommodity and requestedHandling data properties are used at an early stage to indicate what the forwarder intends to ship. The **BookingShipment** object, which is still being finalized, is also used for that purpose, with more detailed information on intended shipment.

The expectedCommodity values are to be discussed and decided by the MCD working group, the requestedHandling values shall refer to special handling codes.

## ONE Record mechanisms to ensure keeping track of data throughout the lifecycle
Like all Logistic Objects, **Shipments** can have **Events**. An **Event** can record the state of a shipment (e.g. “Quote Requested, Booking requested, etc.) and reflect the lifecycle.

The Audit Trail specified in ONE Record API can be used to recover older versions of the objects based on, for instance, a specific date and time.

# Data model
Details of the objects and their data properties can be found in the Ontology or the PDF version of the data model.

The impacts on the conceptual data model and the way these objects are supposed to interact with each other are quite straightforward and explained in the figure below.

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/208690795-fd4ad4d6-ea82-49f9-8104-54a074d36e61.png"></p>

 # API mechanism

 Based on the Data Model, a standard API workflow has been designed. The use case shows an interaction between a Customer (Freight Forwarder) and a Carrier where both stakeholders have their own ONE Record servers. Using a 3rd-party service provider would be the same workflow.


![Sales Booking-1](https://github.com/user-attachments/assets/6dc546a9-8b10-4c8b-a942-3ac05432d0b8)
