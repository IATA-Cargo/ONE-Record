# Requirements
CO2 Emissions transparency is an essential topic in order to move toward a more sustainable industry. IATA has been addressing CO2 Emissions measurement methodology, joint with ICAO, in the Recommended Practice 1678, more details can be found on IATA’s website dedicated page: https://www.iata.org/en/programs/cargo/sustainability/carbon-footprint/  
Our objective is to provide necessary information in the data model to be able to calculate or predict CO2 emissions for transport movements. Required information relate to:
- Typical CO2 coefficient
- Distance of the transport movement, calculated and measured
- Fuel consumed, calculated and measured
- Method used for calculation of the CO2 emissions

# Chosen approach
Calculation of CO2 emissions require some data element that are relevant on `TransportMovement` and `TransportMeans`, it was decided to add a specific `CO2Emissions` object to contain calculated values.

`CO2Emissions` object is generic enough to allow for various calculation methods to be used. The calculation itself is not part of ONE Record scope but we want ot make sure all required information are available.

# Data model

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161542962-673fb079-7f30-44f8-9485-36a519b17e2b.png"></p>
