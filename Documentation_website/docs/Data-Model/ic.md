# Requirements
The Interactive Cargo requirements are still a work in progress however the dedicated taskforce has drafted a Recommended Practice that expresses requirements as to what kind of data should be recorded. The recommended practice follows the guiding principles of ONE Record, meaning that the integration of the requirements are quite straightforward and in line with the existing data model.

The recommended practice highlights:

**IoT Devices:**
- They are “tangible objects that provide the technological interface to interact with or obtain information about physical and other digital entities in an Internet-of-Things (IoT) ecosystem. The IoT device extends physical entities and allows them to be part of the digital world.”
- IoT devices must contain some information to identify them: manufacturer, model, name, description and serial number.
- IoT devices may include sensors that record measurements

**Sensor:**
- They refer to “a device that senses and reports physical or chemical properties from the physical environment and transforms them into digital data that can be transmitted over a network.”
- Sensors contain information to identify them: name, description, serial number, type
- The type gives information on the type of measurements (property) recorded by the sensor, the RP highlights multiple types of sensors e.g. geolocation, thermometer or humidity.
- Most observed properties have a datatype double and a unit of measurement. Only the geolocation differs as the geolocation contains a triplet of values latitude, longitude, altitude.

# Chosen approach
To meet the requirements of the Interactive Cargo RP there **IotDevice, Sensor, and Measurements** objects that have been created. In order to respect the Digital Twin principle and align on the real world, multiple **IotDevice** objects can be linked to any Logistic Object that refers to known physical entities. Such LO can be a **Piece**, a **ULD**, a specific location, etc.

Then an **IotDevice** can be linked to multiple Sensor objects that record a single type Measurements.

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161541172-0009961c-d88d-46d5-99d9-a14f6acb02d5.png"></p>

# Data Model
To take into account the specificity of the Geolocation sensor type, subtypes of Sensor and Measurements have been added to ease the usage of the data model.

 <p align="center"><img src="https://user-images.githubusercontent.com/58464775/161541131-3057fb5d-d9a3-49bd-93e7-ce50ff80917a.png"></p>
