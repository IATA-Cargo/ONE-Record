ONE Record data model 3.0.0 introduced code lists for type safety. These replaced data properties holding enumerations and strings referencing a particular code list.

Code lists are built on using custom objects. Many code lists are published as named individuals in the [ONE Record coreCodeLists ontology](https://onerecord.iata.org/ns/coreCodeLists).

For unpublished or open code lists, the embedded object [CodeListElement](https://onerecord.iata.org/ns/cargo#CodeListElement) is used. A code list is `open` when it is not  restricted to standard values.

The approach also allows to refer codes defined as linked data outside of ONE Record. This includes, for example, [code lists published as part of the UN/CEFACT Web Vocabulary
](https://vocabulary.uncefact.org/code-lists).

This page provides guidance on how to use code lists in practical use cases.

# CodeListElement

The `CodeListElement` is an embedded object. It is the superclass of all other code lists in ONE Record.
As such, all codes defined as named individuals are viewed as instances of the `CodeListElement`.
It features the following properties if a custom instance as embedded object is required:

| Property| Description               |
| ------- |  ----------------------- |
| code | Code or short version of a code, for example "CH" for Switzerland when referring to the UN/LOCODE code list |
| codeDescription | Description or long version of the code, for example "Switzerland" for Switzerland when referring to the UN/LOCODE code list |
| codeLevel | Integer indicating the level of a code if a code list is hierarchical, for example HS-Codes |
| codeListName| Official name of the code list without version number when direct reference is not possible, for example "UN/LOCODE" when referring to the UN/LOCODE code list |
| codeListReference | 	URL to access the code list the code is taken from, for example "https://unece.org/trade/cefact/unlocode-code-list-country-and-territory" for UN/LOCODE. |
| codeListVersion | Version of the code list, for example "223-1" for UN/LOCODE. Used if the property codeListName is used or the version is not apparent from the resource referred to in property codeListReference. |

!!! note
    The properties [code](https://onerecord.iata.org/ns/cargo#code) and either [codeListName](https://onerecord.iata.org/ns/cargo#codeListName) or [codeListReference](https://onerecord.iata.org/ns/cargo#codeListReference) at least SHOULD be used if instanced.

# Examples

## Example 1: Enumeration

In the following example, a named individual defined in the cargo ontology is used to set the [loadType](https://onerecord.iata.org/ns/cargo#loadType) of a [Piece](https://onerecord.iata.org/ns/cargo#Piece) to [LOOSE](https://onerecord.iata.org/ns/cargo#UNIT_LOAD_DEVICE).

```http
--8<-- "examples-dm/code-lists-enumberation.json"
```

_([examples-dm/code-lists-enumberation.json](examples-dm/code-lists-enumberation.json))_

## Example 2: Closed Code List

In the following example, a named individual defined in the coreCodeLists ontology is used to set the [securityStatus](https://onerecord.iata.org/ns/cargo#securityStatus) of a [SecurityDeclaration](https://onerecord.iata.org/ns/cargo#SecurityDeclaration) to [NSC](https://onerecord.iata.org/ns/coreCodeLists#SecurityStatus_NSC).

```http
--8<-- "examples-dm/code-lists-closed-code-list.json"
```

!!! note
    This code list is defined in the [ONE Record coreCodeLists ontology](https://onerecord.iata.org/ns/coreCodeLists).

_([examples-dm/code-lists-closed-code-list.json](examples-dm/code-lists-closed-code-list.json))_

## Example 3: Open Code List, defined Code

In the following example, named individuals are used to set the [specialHandlingCodes](https://onerecord.iata.org/ns/cargo#specialHandlingCodes) of a [Piece](https://onerecord.iata.org/ns/cargo#Piece) as [EAW](https://onerecord.iata.org/ns/coreCodeLists#SpecialHandlingCode_EAW) and [NSC](https://onerecord.iata.org/ns/coreCodeLists#SecurityStatus_NSC).

```http
--8<-- "examples-dm/code-lists-open-code-list-1.json"
```

_([examples-dm/code-lists-open-code-list-1.json](examples-dm/code-lists-open-code-list-1.json))_

!!! note
    Both code lists are defined in the [ONE Record coreCodeLists ontology](https://onerecord.iata.org/ns/coreCodeLists). Note that a [SecurityStatus](https://onerecord.iata.org/ns/coreCodeLists#SecurityStatus) is also an acceptable Special Handling Code.

## Example 4: Open Code List, custom Code

In the following example, a named individual defined is used to set the [specialHandlingCodes](https://onerecord.iata.org/ns/cargo#specialHandlingCodes) of a [Piece](https://onerecord.iata.org/ns/cargo#Piece) as [EAW](https://onerecord.iata.org/ns/coreCodeLists#SpecialHandlingCode_EAW). Additionally, a new embedded object is created to set CUS, a custom organization-specific special handling code, using the properties of the [CodeListElement](https://onerecord.iata.org/ns/cargo#CodeListElement).

```http
--8<-- "examples-dm/code-lists-open-code-list-2.json"
```

_([examples-dm/code-lists-open-code-list-2.json](examples-dm/code-lists-open-code-list-2.json))_

!!! note
    The code instanced SHOULD be of type required by the property, in this case as [SpecialHandlingCode](https://onerecord.iata.org/ns/coreCodeLists#SpecialHandlingCode) for property [specialHandlingCodes](https://onerecord.iata.org/ns/cargo#specialHandlingCodes).

## Example 5: CodeListElement, undefined Code List

In the following example, a new embedded object of type [CodeListElement](https://onerecord.iata.org/ns/cargo#CodeListElement) is created to set the [hsCode](https://onerecord.iata.org/ns/cargo#hsCode) of a [Product](https://onerecord.iata.org/ns/cargo#Product).

```http
--8<-- "examples-dm/code-lists-code-list-element.json"
```

_([examples-dm/code-lists-code-list-element.json](examples-dm/code-lists-code-list-element.json))_

## Example 6: Code List defined in other Vocabulary

In the following example, a named individual defined in the [UN/CEFACT Web Vocabulary](https://vocabulary.uncefact.org/) is used to set the [currencyUnit](https://onerecord.iata.org/ns/cargo#currencyUnit) of a [CurrencyValue](https://onerecord.iata.org/ns/cargo#CurrencyValue) describing the [declaredValueForCarriage](https://onerecord.iata.org/ns/cargo#declaredValueForCarriage) of a [Waybill](https://onerecord.iata.org/ns/cargo#Waybill) to [CHF](https://vocabulary.uncefact.org/CurrencyCodeList#CHF).

```http
--8<-- "examples-dm/code-lists-other-linked-data-code-list.json"
```

_([examples-dm/code-lists-other-linked-data-code-list.json](examples-dm/code-lists-other-linked-data-code-list.json))_
