# Introduction
While the Data Model is primarly defined in the ontology in TTL format, there is a demand to have a visual version of the ONE Record Data Model.

Our objective is to have an automated tool that allows to transcribe the ontology into a visual version.

# Data Model Visualizer
The tool is based on the open-source SQL Schema Visualizer available here: [https://github.com/sqlhabit/sql_schema_visualizer](https://github.com/sqlhabit/sql_schema_visualizer)

We host the tool on GitHub: [https://iata-cargo.github.io/ontology_visualizer/](https://iata-cargo.github.io/ontology_visualizer/) (temporary repository)

The tool has been customized to fit our needs in terms of visual and features.

# Data Mdodel Visualizer in details
## Preparing the ontology

The ontology in its TTL format cannot be used directly in the Visualizer, it needs to be  transcribed in the format used by the SQL Schema Visualizer.

// to be further documented

## Main technical aspects

// to be further documented

## Additional features
Additional features have been added to enhance the user experience and facilitate the understanding of the data model.

### Navigation between objects
When looking at an object, you can click on the data type of a property if it's another object. The interface will directly zoom on that object to facilitate navigation among objects.

### Descriptions and comments
Descriptions of objects and properties are within the ontology, along with some comments when relevant. These can be also found in the visualizer by hovering over a property pressing shift.

![hover](https://github.com/lambertciata/ONE-Record/assets/58464775/3243253e-343c-4625-9ce1-c22e0dd6c6f3)

### Search
Search is possible within the visualizer. When text is entered, all objects and properties containing the text are displayed. When clicking on a result the relevant oject is displayed. Note that clicking on a property will display the object containing that property.

![search](https://github.com/lambertciata/ONE-Record/assets/58464775/b99dc784-7f33-47bb-a07d-5c051bbd5e45)
