ONE Record is an industry standard and follows a proper governance established by IATA with industry stakeholders.
Effective governance ensures the model remains robust, up-to-date, and aligned with industry needs.

#  Community Involvement
The ONE Record model is governed with transparency and inclusiveness:

- Industry participants are encouraged to contribute through **GitHub**, where the data model is publicly available. Contributions can be made by [**creating a new issue**](https://github.com/IATA-Cargo/ONE-Record/issues/new), which will then be reviewed and assessed by the dedicated ONE Record Data Model taskforce who is meeting (online) regularly.
- Open discussions and collaborative documentation foster innovation and ensure practical applicability.

You can access the GitHub dashboard through this link: [Data Model Changes](https://github.com/users/IATA-Cargo/projects/2/views/1). Please note that GitHub issues are closed and archived once they have been added in the latest release.

# Change Management Process
A simple change request process is in place to propose updates or extensions to the model:

- Stakeholders (e.g., airlines, freight forwarders, tech providers) submit proposals.
- Each proposal undergoes a review by domain experts and relevant working groups.
- Approved changes are integrated into official releases, typically on an annual cycle.

# Versioning and Backward Compatibility
Each release of our data model follows **semantic versioning**, clearly differentiating between major, minor, and patch updates to ensure transparency and consistency in how changes are communicated.

While we place strong emphasis on maintaining backward compatibility to promote system stability and interoperability, there are instances where **breaking changes** are necessary to support innovation or correct fundamental issues.

A **breaking change** can be:

- Addition of new **mandatory** data properties or objects, usually requirements coming from business processes or regulatory changes
- Removal of **mandatory** data properties or objects, usually coming from simplification of the Data Model, changes on the best practices
- Change of an object's name

!!! note
    When data properties or objects are removed, they are actually set as **deprecated** and could still be used, however they are permanently deleted when next **major version** is released.

Whenever a breaking change is introduced, it is accompanied by an increment in the **major version** number and the creation of a **new namespace** within the cargo ontology. For example, a breaking change would shift the version to 4 and introduce a corresponding namespace such as `http://onerecord.iata.org/ns/2025/cargo`.

This versioned namespace not only helps maintain clarity and traceability as the model evolves but also enables users to easily identify the major version used to create a given logistics object. This information is essential for aligning data across systems and for mapping against other industry standards, ensuring smoother integration and interoperability.

# How to deal with multiple version of the Data model

When creating a logistics object, users are required to specify the **namespace** for each ontology involved, and this namespace must include the corresponding **version information** to ensure accurate interpretation and integration.

For the **cargo ontology**, we have chosen to retain the existing namespace `http://onerecord.iata.org/ns/cargo` for the current major version. Versioning will be explicitly introduced in the namespace starting with the **next major release**, in line with semantic versioning principles.

Below is an example of a shipment logistics object illustrating the current approach:
```json
{
    "@context": {
        "cargo": "https://onerecord.iata.org/ns/cargo#"
    },
    "@type": "cargo:Shipment",
    "cargo:goodsDescription": "Lots of awesome ONE Record information materials",
    "cargo:pieces": [
        {
            "@id": "https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c"
        }
    ]
}
```

As shown, the cargo import within the `@context` references the **current version** of the ontology. When this JSON-LD is expanded, it will be transformed into the following structure:

```json
  {
    "@type": [ "https://onerecord.iata.org/ns/cargo#Shipment"],
    "https://onerecord.iata.org/ns/cargo#goodsDescription": [
      {
        "@value": "Lots of awesome ONE Record information materials"
      }
    ],
    "https://onerecord.iata.org/ns/cargo#pieces": [
      {
        "@id": "https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c"
      }
    ]
  }
```
There may be a situation where the Piece associated with the Shipment object is defined using a different version of the data model (i.e.:`http://onerecord.iata.org/ns/2025/cargo`). In such a case, the Piece would be:

```json
{
   "@context":{
      "cargo":"https://onerecord.iata.org/ns/2025/cargo#"
   },
   "@type":"cargo:Piece",
   "@id":" https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c",
   "cargo:coload":{
      "@type":"http://www.w3.org/2001/XMLSchema#boolean",
      "@value":"false"
   },
   "cargo:specialHandlingCodes":[
      {
         "@id":"https://onerecord.iata.org/ns/code-lists/SpecialHandlingCode#VAL"
      }
   ]
}
```

which expands in 
```json
[
  {
    "@id": " https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c",
    "@type": [
      "https://onerecord.iata.org/ns/2025/cargo#Piece"
    ],
    "https://onerecord.iata.org/ns/2025/cargo#coload": [
      {
        "@type": "http://www.w3.org/2001/XMLSchema#boolean",
        "@value": "false"
      }
    ],
    "https://onerecord.iata.org/ns/2025/cargo#specialHandlingCodes": [
      {
        "@id": "https://onerecord.iata.org/ns/code-lists/SpecialHandlingCode#VAL"
      }
    ]
  }
]
```

To create a unified object, we would need to declare both versions of the ontology. This ensures compatibility and consistency across the differing data model definitions.

```json
{
    "@context": {
        "cargo": "https://onerecord.iata.org/ns/cargo#",
        "cargo_2025": "https://onerecord.iata.org/ns/2025/cargo#",
        "api": "https://onerecord.iata.org/ns/api#"
    },
    "@type": "cargo:Shipment",
    "api:hasRevision": 1,
    "api:hasLatestRevision": 1,
    "cargo:goodsDescription": "Lots of awesome ONE Record information materials",
    "cargo:pieces": [
        {
            "@type": "cargo_2025:Piece",
            "@id": " https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c",
            "cargo_2025:coload": {
                "@type": "http://www.w3.org/2001/XMLSchema#boolean",
                "@value": "false"
            },
            "cargo_2025:specialHandlingCodes": [
                {
                    "@id": "https://onerecord.iata.org/ns/code-lists/SpecialHandlingCode#VAL"
                }
            ]
        }
    ]
}
```

Which will expand into:

```json
[
  {
    "@type": [
      "https://onerecord.iata.org/ns/cargo#Shipment"
    ],
    "https://onerecord.iata.org/ns/api#hasLatestRevision": [
      {
        "@value": 1
      }
    ],
    "https://onerecord.iata.org/ns/api#hasRevision": [
      {
        "@value": 1
      }
    ],
    "https://onerecord.iata.org/ns/cargo#goodsDescription": [
      {
        "@value": "Lots of awesome ONE Record information materials"
      }
    ],
    "https://onerecord.iata.org/ns/cargo#pieces": [
      {
        "@id": " https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c",
        "@type": [
          "https://onerecord.iata.org/ns/2025/cargo#Piece"
        ],
        "https://onerecord.iata.org/ns/2025/cargo#coload": [
          {
            "@type": "http://www.w3.org/2001/XMLSchema#boolean",
            "@value": "false"
          }
        ],
        "https://onerecord.iata.org/ns/2025/cargo#specialHandlingCodes": [
          {
            "@id": "https://onerecord.iata.org/ns/code-lists/SpecialHandlingCode#VAL"
          }
        ]
      }
    ]
  }
]
```

A key constraint is that all properties within a logistics object must conform to the same ontology version. In the case of the cargo ontology, the version specified in the @type should serve as the authoritative reference. Mixing properties from different ontology versions within a single object can lead to inconsistencies and interoperability issues.

For example, the Shipment object in the scenario above is fully defined using the current ontology version, with all its properties aligned accordingly. However, it contains a Piece defined using the 2025 ontology version, where all its properties adhere to version 2025.

To ensure semantic consistency and data integrity, this version alignment rule MUST be strictly enforced for any imported or referenced objects within the context.

