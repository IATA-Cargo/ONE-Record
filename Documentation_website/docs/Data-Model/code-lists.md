The ONE Record data model version 3.0.0 introduced code lists to enhance type safety. This update replaces the use of generic enumerations and strings that previously referenced specific code lists, ensuring more structured data properties.

This page offers practical guidance on applying code lists effectively in real-world scenarios.

!!! note
    Code lists are visually marked by a triple-stripe icon in the [ontology visualizer](https://iata-cargo.github.io/ontology_visualizer/).

Code lists are implemented using custom objects, with many predefined as named individuals within the [ONE Record coreCodeLists ontology](https://onerecord.iata.org/ns/coreCodeLists).

For code lists that are not predefined or are open-ended, the [CodeListElement](https://onerecord.iata.org/ns/cargo#CodeListElement) object is used. A code list is considered "open" when it allows custom entries rather than restricting input to a fixed set of values.

Whenever a [CodeListElement](https://onerecord.iata.org/ns/cargo#CodeListElement) is referenced, it MUST have a unique URI/@id following the structure defined below. This URI MUST NOT be embedded but does not need to be directly accessible.

This URI can reference an existing ontology, such as [code lists published by the UN/CEFACT Web Vocabulary](https://vocabulary.uncefact.org/code-lists).

!!! note
    Code lists element cannot be hosted as Logistics Objects. A new code list element definition MUST be accessible with its human-readable URI. The code list element MUST specify the properties defined in the [CodeListElement](https://onerecord.iata.org/ns/cargo#CodeListElement) object. For internal use, a unique URI in the format {{baseURL}}/{{codeListName}}#{{code}} is sufficient.

# CodeListElement

The `CodeListElement` is a custom object specifically defined for code lists. It is the superclass of all other code lists in ONE Record.
As such, all codes defined as named individuals are viewed as instances of the `CodeListElement`.
It features the following properties:

| Property| Description               |
| ------- |  ----------------------- |
| code | Code or short version of a code, for example "CH" for Switzerland when referring to the UN/LOCODE code list |
| codeDescription | Description or long version of the code, for example "Switzerland" for Switzerland when referring to the UN/LOCODE code list |
| codeLevel | Integer indicating the level of a code if a code list is hierarchical, for example HS-Codes |
| codeListName| Official name of the code list without version number when direct reference is not possible, for example "UN/LOCODE" when referring to the UN/LOCODE code list |
| codeListReference | URL to access the code list the code is taken from, for example "https://unece.org/trade/cefact/unlocode-code-list-country-and-territory" for UN/LOCODE. |
| codeListVersion | Version of the code list, for example "223-1" for UN/LOCODE. Used if the property codeListName is used or the version is not apparent from the resource referred to in property codeListReference. |

!!! note
    When creating a CodeListElement instance, it is essential to assign a reusable and unique URI.

!!! note
    The properties [code](https://onerecord.iata.org/ns/cargo#code) and either [codeListName](https://onerecord.iata.org/ns/cargo#codeListName) or [codeListReference](https://onerecord.iata.org/ns/cargo#codeListReference) at least SHOULD be used if instanced.

# URI structure

For effective filtering and searching, the URI SHOULD be readable when parsed as a string and does need to be resolvable for retrieving additional information. 
The URI MUST follow the following structure:

``` 
 @id: {{baseURL}}/{{codeListName}}#{{code}}
```

As a practical example, an URI can look like this:

``` 
 @id: https://mycodelist.org/handlingCodes#ABC
```

# Examples

## Example 1: Enumeration

In the following example, a named individual defined in the cargo ontology is used to set the [loadType](https://onerecord.iata.org/ns/cargo#loadType) of a [Piece](https://onerecord.iata.org/ns/cargo#Piece) to [LOOSE](https://onerecord.iata.org/ns/cargo#UNIT_LOAD_DEVICE).

```http
--8<-- "Data-Model/examples-dm/code-lists-enumberation.json"
```

_([examples-dm/code-lists-enumberation.json](./examples-dm/code-lists-enumberation.json))_

## Example 2: Closed Code List

In the following example, a named individual defined in the coreCodeLists ontology is used to set the [securityStatus](https://onerecord.iata.org/ns/cargo#securityStatus) of a [SecurityDeclaration](https://onerecord.iata.org/ns/cargo#SecurityDeclaration) to [NSC](https://onerecord.iata.org/ns/coreCodeLists#SecurityStatus_NSC).

```http
--8<-- "Data-Model/examples-dm/code-lists-closed-code-list.json"
```

!!! note
    This code list is defined in the [ONE Record coreCodeLists ontology](https://onerecord.iata.org/ns/coreCodeLists).

_([examples-dm/code-lists-closed-code-list.json](./examples-dm/code-lists-closed-code-list.json))_

## Example 3: Open Code List, defined Code

In the following example, named individuals are used to set the [specialHandlingCodes](https://onerecord.iata.org/ns/cargo#specialHandlingCodes) of a [Piece](https://onerecord.iata.org/ns/cargo#Piece) as [EAW](https://onerecord.iata.org/ns/coreCodeLists#SpecialHandlingCode_EAW) and [NSC](https://onerecord.iata.org/ns/coreCodeLists#SecurityStatus_NSC).

```http
--8<-- "Data-Model/examples-dm/code-lists-open-code-list-1.json"
```

_([examples-dm/code-lists-open-code-list-1.json](./examples-dm/code-lists-open-code-list-1.json))_

!!! note
    Both code lists are defined in the [ONE Record coreCodeLists ontology](https://onerecord.iata.org/ns/coreCodeLists). Note that a [SecurityStatus](https://onerecord.iata.org/ns/coreCodeLists#SecurityStatus) is also an acceptable Special Handling Code.

## Example 4: Open Code List, custom Code

In the example below, a named individual is used to assign the [specialHandlingCodes](https://onerecord.iata.org/ns/cargo#specialHandlingCodes) property of a [Piece](https://onerecord.iata.org/ns/cargo#Piece) to [EAW](https://onerecord.iata.org/ns/coreCodeLists#SpecialHandlingCode_EAW). Additionally, a custom code, "CUS," is introduced as an organization-specific special handling code. 

For custom codes, the URI MUST be resolvable. The organization that manages the custom code may publish it within an ontology that extends the [specialHandlingCodes](https://onerecord.iata.org/ns/cargo#specialHandlingCodes) section of the [ONE Record coreCodeLists ontology](https://onerecord.iata.org/ns/coreCodeLists). Alternatively, the organization can publish detailed information about the code directly at the defined URI without using an ontology.

```http
--8<-- "Data-Model/examples-dm/code-lists-open-code-list-2.json"
```

_([examples-dm/code-lists-open-code-list-2.json](./examples-dm/code-lists-open-code-list-2.json))_

If resolved, the URI should all information regarding the custom code as any code define in the [ONE Record coreCodeLists ontology](https://onerecord.iata.org/ns/coreCodeLists) (i.e.:[EAW](https://onerecord.iata.org/ns/coreCodeLists#SpecialHandlingCode_EAW)). An alternative approach is to return the CodeListElement in JSON format, as demonstrated in the example below:

```http
--8<-- "Data-Model/examples-dm/code-lists-open-code-list-2-lo-example.json"
```
!!! note
    It is recommended to follow the CodeListElement structure. However, the holder of the element can decide its own structure as far as all the information from the CodeListElement object are present. 
    Only the structure of the IRI is mandatory and MUST follow the guidelines from the URI Structure section (#)

_([examples-dm/code-lists-open-code-list-2-lo-example.json](./examples-dm/code-lists-open-code-list-2-lo-example.json))_

!!! note
    The code instanced SHOULD be of type required by the property, in this case as [SpecialHandlingCode](https://onerecord.iata.org/ns/coreCodeLists#SpecialHandlingCode) for property [specialHandlingCodes](https://onerecord.iata.org/ns/cargo#specialHandlingCodes).

## Example 5: CodeListElement, undefined Code List

In the example below, a new object of type [CodeListElement](https://onerecord.iata.org/ns/cargo#CodeListElement) is hosted at `https://1r.example.com/` to convey the [hsCode](https://onerecord.iata.org/ns/cargo#hsCode) for a [Product](https://onerecord.iata.org/ns/cargo#Product).

```http
--8<-- "Data-Model/examples-dm/code-lists-code-list-element.json"
```

_([examples-dm/code-lists-code-list-element.json](./examples-dm/code-lists-code-list-element.json))_

## Example 6: Code List defined in other Vocabulary

In the following example, a named individual defined in the [UN/CEFACT Web Vocabulary](https://vocabulary.uncefact.org/) is used to set the [currencyUnit](https://onerecord.iata.org/ns/cargo#currencyUnit) of a [CurrencyValue](https://onerecord.iata.org/ns/cargo#CurrencyValue) describing the [declaredValueForCarriage](https://onerecord.iata.org/ns/cargo#declaredValueForCarriage) of a [Waybill](https://onerecord.iata.org/ns/cargo#Waybill) to [CHF](https://vocabulary.uncefact.org/CurrencyCodeList#CHF).

```http
--8<-- "Data-Model/examples-dm/code-lists-other-linked-data-code-list.json"
```

_([examples-dm/code-lists-other-linked-data-code-list.json](./examples-dm/code-lists-other-linked-data-code-list.json))_
