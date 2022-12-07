![image](https://user-images.githubusercontent.com/58464775/161543671-fc444388-04af-4998-8a5a-b2218072af50.png)
# ONE Record Data Model
## ChangeLog - Ontology v2.1.0

In addition to the [Release note](https://github.com/IATA-Cargo/ONE-Record/blob/clambert-update2022/May-2022-standard-forCOTBendorsement/Data-Model/IATA-1R-DM-ReleaseNote-vCOTB-May2022.md) this provides further details on the changes compared to the previous version of the ontology.
Are included the reference to issues that are fixed with the release as well.

## Issues fixed with this release
In order to allow for a better followup of Github issues and their resolution, below is the list of all issues that were closed in accordance to the release.
 
- [x] https://github.com/IATA-Cargo/ONE-Record/issues/174
- [x] https://github.com/IATA-Cargo/ONE-Record/issues/178
- [x] https://github.com/IATA-Cargo/ONE-Record/issues/179
- [x] https://github.com/IATA-Cargo/ONE-Record/issues/180


#### Addition of BookingRequest and Booking objects
To facilitate distribution and the API design, **BookingRequest** and **Booking** ojects were added

![image](https://user-images.githubusercontent.com/58464775/206222918-e3a812fb-459c-410e-93d2-59c19ce7b66b.png)
 
#### Removal of deprecated objects and data/object properties
Preivously deprecated objects have been removed (e.g. **Schedule**)

#### Addition of BillingDetails object for CASS2.0 integration
![image](https://user-images.githubusercontent.com/58464775/206226681-9384032c-82a1-48ca-8f33-7dec419fc200.png)


#### Small changes
- Added missing `BookingOptionRequest:bookingOptions` data property

