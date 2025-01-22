# Introduction
While the Data Model is primarly defined in the ontology in TTL format, there is a demand to have a visual version of the ONE Record Data Model.

Our objective is to have an automated tool that allows to transcribe the ontology into a visual version.

# Data Model Visualizer
The tool is based on the open-source SQL Schema Visualizer available here: [https://github.com/sqlhabit/sql_schema_visualizer](https://github.com/sqlhabit/sql_schema_visualizer)

We host the tool on GitHub: [https://iata-cargo.github.io/ontology_visualizer/](https://iata-cargo.github.io/ontology_visualizer/)

The tool has been customized to fit our needs in terms of visual and features.

### Navigation between objects
When looking at an object, you can click on the data type of a property if it's another object. The interface will directly zoom on that object to facilitate navigation among objects.

### Descriptions and comments
Descriptions of objects and properties are within the ontology, along with some comments when relevant. These can be also found in the visualizer by hovering over a property pressing shift.

![Visualizer 1](https://github.com/user-attachments/assets/620dc677-2b62-4b55-aefa-92755e698446)

### Search
Search is possible within the visualizer. When text is entered, all objects and properties containing the text are displayed. When clicking on a result the relevant oject is displayed. Note that clicking on a property will display the object containing that property.

![Visualizer 2](https://github.com/user-attachments/assets/9e2fcf3c-bfb2-48f4-b859-3e31d38e1c0d)

### Change Database

The Ontology Visualizer includes several datasets that are aligned with various versions of the data model. Users can click on the database icon located in the bottom left corner to choose the dataset they wish to visualize.

### Property names

To copy the name of a property, press Control and click on the property's name. This shortcut will save the property name to the clipboard.
