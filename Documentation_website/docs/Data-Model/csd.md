<img width="336" height="376" alt="image" src="https://github.com/user-attachments/assets/c1b04932-1a2b-45bd-a7b2-e3d17de3ff1b" /># Introduction
The Consignment Security Declaration (CSD) is a mandatory security document defined by **ICAO Annex 17** and the **ICAO Aviation Security Manual (Doc. 8973)**. It certifies that a consignment has been secured in accordance with applicable aviation security requirements before being loaded onto an aircraft.

The CSD must be issued by a **Regulated Agent (RA)**, **Known Consignor (KC)**, or **Aircraft Operator (AO)** — the three categories of regulated entities authorised under national civil aviation security programmes to apply and declare security measures on cargo.

IATA defines the electronic CSD (e-CSD) according to ICAO requirements through **CSC Resolution 651**, standardising the format and content of the declaration across the air cargo industry.

## Why move to ONE Record for the e-CSD?

In legacy messaging environments (CIMP and Cargo-XML), e-CSD data is transmitted through the **OCI (Other Customs, Security and Regulatory Information)** grouping. This approach has well-known limitations: OCI acts as a catch-all container, making it difficult to parse, validate, and trace individual security attributes programmatically.

ONE Record addresses this directly by introducing a dedicated **`SecurityDeclaration`** Logistics Object. Rather than embedding security data as opaque text fields inside a message, the e-CSD becomes a structured, linked data object that:

- can be independently accessed and updated via the ONE Record API,
- can be shared selectively with authorised parties using access control delegation,
- remains permanently linked to the shipment it covers,
- provides a full and traceable audit trail through Logistics Events.

# Requirements
The e-CSD requirements follow the initial paper CSD document, with a set of **15 data fields** to be provided. More details can be found on the [IATA dedicated page](https://www.iata.org/en/programs/security/cargo-security/csd/).

The official CSD layout is available [here](https://www.iata.org/contentassets/4bb3450ef9a2447493a132b38fac1d26/e-consignment-security-declaration.pdf).

# Key concepts

## Logistics Objects involved

Implementing the e-CSD in ONE Record involves several interconnected Logistics Objects. Understanding how they relate to each other is essential before attempting the field-level mapping.

| Logistics Object | Role in the e-CSD |
|---|---|
| `SecurityDeclaration` | Core object carrying the security status, screening methods, exemption grounds, and issuer/acceptor information |
| `Shipment` | The consignment to which the security declaration applies; links to `SecurityDeclaration` via the `securityDeclaration` property |
| `Waybill` | Provides the Unique Consignment Identifier (Box 2), origin (Box 4), and destination (Box 5) |
| `RegulatedEntity` | Reusable object representing an RA, KC, or AO; used for the issuer (Box 1), the entity the cargo was received from (Box 8), and the acceptor (Box 14) |
| `Organization` | Used to derive the country of the `RegulatedEntity` via `basedAtLocation` |
| `Person` | Identifies the individual who issued the security status (Box 12) |

## The `RegulatedEntity` object — used in three places

A key concept to understand is that `RegulatedEntity` is reused across **three different boxes** of the e-CSD:

- **Box 1** — the entity that originally **issued** the security status (`regulatedEntityIssuer`)
- **Box 8** — the entity from which the consignment was **received** (`receivedFrom`)
- **Box 14** — the entity that **accepts custody** and the security status (`regulatedEntityAcceptor`)

Each of these is a separate instance of `RegulatedEntity`, but they share the same structure: `regulatedEntityCategory` (RA, KC, or AO), `regulatedEntityIdentifier`, `regulatedEntityExpiryDate`, and a country derived from the linked `Organization`.

## Security Statuses

The list of accepted Security Statuses is defined in the Code List ontology: [Here](https://onerecord.iata.org/ns/code-lists/index-en.html#SecurityStatus).

# Chosen approach
In legacy messaging standards (CIMP and CXML) the eCSD data is provided through the OCI grouping and guidelines are provided in the OCI Composition Rules Table.

With ONE Record, our objective is to avoid using OCI as a dumping ground to provide Security and Customs information. The `SecurityDeclaration` object has been created to provide most fo the e-CSD information and has the following structure:

![image](https://github.com/user-attachments/assets/1d2408c1-95cc-4f9e-b35d-ce3a2895f8db)

## Linking the `SecurityDeclaration` to a `Shipment` or a `Piece`

A `SecurityDeclaration` can be linked to a `Shipment` or a `Piece` through the `securityDeclaration` property. This means the declaration travels with the shipment/piece object and is discoverable by any party that has access to the shipment/piece.

## Multiple declarations — handling re-tendering

A consignment may change hands between regulated entities during its journey (e.g. a Known Consignor tenders to a Regulated Agent, who then tenders to the airline). Each transfer of custody should be reflected by updating the `regulatedEntityAcceptor` on the existing `SecurityDeclaration`, or — if the security status itself changes — by creating a new `SecurityDeclaration` and linking it to the `Shipment`.

It is important **not** to simply overwrite the previous declaration without leaving a trace. ONE Record's change request and audit mechanisms should be used to maintain a full history.

## e-CSD mapping

| Box | e-CSD   requirements                                                                                          | Description/Comment                                                                                                                                                                               | ONE Record mapping                                       | Comment                                                                                                                                                                                             |
|:---:|---------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  1  | Regulated   Entity Category (RA, KC or AO) and Identifier (of the regulated party issuing the security status) | Regulated   Agent (RA), Known Consignor (KC) or Aircraft Operator (AO) that originally   issued the security status, identified by its category (i.e. RA, KC or AO)   and its unique identifier   | SecurityDeclaration#RegulatedEntityIssuer         | regulatedEntityCategory,   regulatedEntityIdentifier and regulatedEntityExpiryDate from RegulatedEntity;   Country from Location from basedAtLocation, from Organization, from   owningOrganization |
|  2  | Unique   Consignment Identifier                                                                                     | Identification   of the consignment. May be an air waybill (format is nnn-nnnnnnnn), a house   bill or a mail consignment identifier.                                                             | Waybill#waybillPrefix+waybillNumber               |                                                                                                                                                                                                     |
|  3  | Contents   of Consignment                                                                                           | Identification   of the consignment details (e.g. goods description)                                                                                                                              | Shipment#goodsDescription                         |                                                                                                                                                                                                     |
|  4  | Origin                                                                                                              | Origin   related to the appropriate transport documentation (air waybill or house   waybill)                                                                                                      | Waybill#departureLocation                         |                                                                                                                                                                                                     |
|  5  | Destination                                                                                                         | Destination   related to the appropriate transport documentation (air waybill or house   waybill)                                                                                                 | Waybill#arrivalLocation                           |                                                                                                                                                                                                     |
|  6  | Transfer/Transit   points                                                                                           | Identification   of an en-route stopping point where cargo may be transferred to another   aircraft or remain on board the same aircraft should be entered if known to   the issuer. May be blank | N/A                     |                                                                                                                                 |
|  7  | Security   Status    | Coded   identification of the security status assigned to the consignment. See   resolution 651.           | SecurityDeclaration#securityStatus                |  The two accepted Security statuses as per ICAO Doc. 8973 are SPX and SHR |
|  8  | Received   from                                                                                                     | Coded   identification of the category (i.e. Regulated Agent, Known Consignor, or   Aircraft Operator) that tendered the consignment                                                              | SecurityDeclaration#receivedFrom                  | regulatedEntityCategory,   regulatedEntityIdentifier and regulatedEntityExpiryDate from RegulatedEntity;   Country from Location from basedAtLocation, from Organization, from   owningOrganization |
|  9  | Screening   Method                                                                                                  | Coded   identification of the screening methods used by the Regulated Agent, Known   Consignor, or Aircraft Operator when securing the consignment                                                | SecurityDeclaration#screeningMethods              |                                                                                                                                                                                                     |
|  10 | Grounds   for Exemptions                                                                                            | Coded   identification indicating why a consignment is exempted from screening as   defined in State National Civil Aviation Security Programmes                                                  | SecurityDeclaration#groundsForExemption           |                                                                                                                                                                                                     |
|  11 | Other   Screening Method(s)                                                                                         | -                                                                                                                                                                                                 | SecurityDeclaration#otherScreeningMethods         |                                                                                                                                                                                                     |
|  12 | Security   status issued by                                                                                         | Individual   of the Regulated Agent, Known Consignor, or Aircraft Operator who issued the   security status, identified by name or employee number                                                | SecurityDeclaration#issuedBy                      | personal   details or employee ID from Person                                                                                                                                                       |
|  13 | Security   Status issued on                                                                                         | Exact   date and time when the security status was issued by Regulated Agent, Known   Consignor, or Aircraft Operator employee                                                                    | SecurityDeclaration#issuedOn                      |                                                                                                                                                                                                     |
|  14 | Regulated   Entity Category (RA, KC or AO) and Identifier                                                           | Identifier   of any Regulated Agent, Known Consignor, or Aircraft Operator that accepts   custody of the cargo and accepts the security status originally issued by RA,   KC or AO                | SecurityDeclaration#RegulatedEntityAcceptor       | regulatedEntityCategory,   regulatedEntityIdentifier and regulatedEntityExpiryDate from RegulatedEntity;   Country from Location from basedAtLocation, from Organization, from   owningOrganization |
|  15 | Additional   Security information                                                                                   | Any   additional Security information that may be required by an ICAO Member State                                                                                                                | SecurityDeclaration#additionalSecurityInformation |                                                                                                                                                                                                     |

# Step-by-Step Implementation Guide

This section walks through how to create and share an e-CSD using ONE Record, from the initial creation of the relevant Logistics Objects to notifying downstream parties.

## Step 1 — Create the core shipment objects

Before creating the `SecurityDeclaration`, make sure the core shipment objects exist on your ONE Record server:

1. Create the **`Shipment`** Logistics Object with at minimum `goodsDescription` populated (Box 3).
2. Create the **`Waybill`** Logistics Object, populated with `waybillPrefix`, `waybillNumber`, `departureLocation`, and `arrivalLocation` (Boxes 2, 4, 5).
3. Link the `Waybill` to the `Shipment`.

If intermediate legs are known at this point, create the **`TransportLegs`** objects and link them to the shipment. The arrival locations of all intermediate legs will cover Box 6.

## Step 2 — Create the `RegulatedEntity` for the issuer

Create a **`RegulatedEntity`** Logistics Object representing the RA, KC, or AO issuing the declaration:

```json
{
  "@context": "https://onerecord.iata.org/ns/cargo#",
  "@type": "RegulatedEntity",
  "regulatedEntityCategory": "RA",
  "regulatedEntityIdentifier": "RA-DE-12345",
  "regulatedEntityExpiryDate": "2026-12-31",
  "owningOrganization": {
    "@type": "Organization",
    "name": "Acme Freight GmbH",
    "basedAtLocation": {
      "@type": "Location",
      "countryCode": "DE"
    }
  }
}
```

Repeat this step to create separate `RegulatedEntity` objects for the "received from" party (Box 8) and the acceptor (Box 14) if applicable.

## Step 3 — Create the `SecurityDeclaration`

Create the **`SecurityDeclaration`** Logistics Object, referencing the `RegulatedEntity` objects created in Step 2:

```json
{
  "@context": "https://onerecord.iata.org/ns/cargo#",
  "@type": "SecurityDeclaration",
  "securityStatus": "SPX",
  "issuedOn": "2025-03-15T10:45:00Z",
  "issuedBy": {
    "@type": "Person",
    "name": "Jane Müller",
    "employeeId": "EMP-4821"
  },
  "regulatedEntityIssuer": { "@id": "https://1r.acme-freight.de/logistics-objects/re-12345" },
  "receivedFrom": { "@id": "https://1r.acme-freight.de/logistics-objects/re-67890" },
  "screeningMethods": ["PHS", "EDS"],
  "additionalSecurityInformation": "Consignment sealed with tamper-evident tape, seal no. 884421."
}
```

## Step 4 — Link the `SecurityDeclaration` to the `Shipment`

Patch the **`Shipment`** object to add the `securityDeclaration` property pointing to the newly created `SecurityDeclaration`:

```http
PATCH https://1r.acme-freight.de/logistics-objects/shipment-abc123

{
  "@context": "https://onerecord.iata.org/ns/cargo#",
  "@type": "Change",
  "operations": [
    {
      "@type": "Operation",
      "op": "add",
      "s": "https://1r.acme-freight.de/logistics-objects/shipment-abc123",
      "p": "https://onerecord.iata.org/ns/cargo#securityDeclaration",
      "o": {
        "@type": "OperationObject",
        "datatype": "@id",
        "value": "https://1r.acme-freight.de/logistics-objects/secdecl-00112"
      }
    }
  ]
}
```

## Step 5 — Share with the airline or handler

Use ONE Record's **Access Delegation** mechanism to grant read access on the `SecurityDeclaration` to the airline and/or ground handler. This ensures that only authorised parties can access the sensitive security data.

Alternatively, if the airline operates their own ONE Record server, use the **Subscription** mechanism so they are automatically notified when the `SecurityDeclaration` is created or updated.

## Step 6 — Record the handover event (if applicable)

When the consignment is tendered to the next regulated entity (e.g. from an RA to the airline), create a **Logistics Event** on the `SecurityDeclaration` to record the transfer:

```json
{
  "@context": "https://onerecord.iata.org/ns/cargo#",
  "@type": "LogisticsEvent",
  "eventCode": "DEP",
  "eventDate": "2025-03-15T14:00:00Z",
  "createdBy": { "@id": "https://1r.acme-freight.de/logistics-objects/org-acme" },
  "eventLocation": {
    "@type": "Location",
    "locationName": "FRA - Frankfurt Airport"
  }
}
```

Then update the `regulatedEntityAcceptor` on the `SecurityDeclaration` (via a PATCH/Change Request) to reflect the new custodian (Box 14).

## Step 7 — Re-issuance and amendments

If the security status must be amended (e.g. a re-screening has taken place), submit a **Change Request** against the `SecurityDeclaration` object with the updated fields. The ONE Record server will record the change with a full audit trail. Downstream subscribers will be notified automatically.

---

> **Note:** The JSON-LD examples above are illustrative and simplified. Property names and object structures should be validated against the latest version of the IATA ONE Record ontology.

# e-CSD scenarios

Below are a few scenarios that are used in the OCI Composition Rules Table as examples. We show the use case, its OCI representation (CIMP) and ONE Record JSON equivalent.

## #1 **Regulated Agent** issued an eCSD after it secured the shipment (**SPX**)


```
OCI/NL/ISS/RA/00100-01
///ED/0527
///SM/EDD
///SN/JOHN SMITH
///SD/08AUG231230
///SS/SPX
///ST/<addl. sec. info>
```

```json
{
  "@context": {
    "cargo": "https://onerecord.iata.org/ns/cargo#",
    "ccodes": "https://onerecord.iata.org/ns/coreCodeLists#",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@graph": [
    {
      "@id": "https://1r.example.com/logistics-objects/security-declaration-001",
      "@type": "cargo:SecurityDeclaration",
      "cargo:securityStatus": {
        "@id": "ccodes:SecurityStatus_SPX"
      },
      "cargo:additionalSecurityInformation": "FYI",
      "cargo:issuedOn": {
        "@value": "2023-08-08T12:30:00Z",
        "@type": "xsd:dateTime"
      },
      "cargo:issuedBy": {
        "@id": "https://1r.example.com/logistics-objects/person-john-smith"
      },
      "cargo:screeningMethods": [
        {
          "@id": "ccodes:ScreeningMethod_EDD"
        }
      ],
      "cargo:regulatedEntityIssuer": {
        "@id": "https://1r.example.com/logistics-objects/regulated-entity-001"
      }
    },
    {
      "@id": "https://1r.example.com/logistics-objects/person-john-smith",
      "@type": "cargo:Person",
      "cargo:firstName": "John",
      "cargo:lastName": "Smith"
    },
    {
      "@id": "https://1r.example.com/logistics-objects/regulated-entity-001",
      "@type": "cargo:RegulatedEntity",
      "cargo:regulatedEntityCategory": {
        "@id": "ccodes:RegulatedEntityCategoryCode_RA"
      },
      "cargo:regulatedEntityIdentifier": "NL-00100-01",
      "cargo:regulatedEntityExpiryDate": {
        "@value": "2027-04-01T00:00:00Z",
        "@type": "xsd:dateTime"
      }
    }
  ]
}
```

## #2 **Regulated Agent** issued a security declaration for a shipment originating from a **Known Consignor** (KC)

```
OCI/NL/ISS/RA/00100-01
///ED/0527
///SN/JOHN SMITH
///SD/08AUG231230
///SS/SPX
///ST/<addl. sec. info>
/NL//KC/00200-01
///ED/0326
///ST/<addl. sec. info>
```

``` json
{
  "@context": {
    "cargo": "https://onerecord.iata.org/ns/cargo#",
    "ccodes": "https://onerecord.iata.org/ns/coreCodeLists#",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@graph": [
    {
      "@id": "https://1r.example.com/logistics-objects/security-declaration-001",
      "@type": "cargo:SecurityDeclaration",
      "cargo:securityStatus": {
        "@id": "ccodes:SecurityStatus_SPX"
      },
      "cargo:additionalSecurityInformation": "FYI",
      "cargo:issuedOn": {
        "@value": "2023-08-08T12:30:00Z",
        "@type": "xsd:dateTime"
      },
      "cargo:issuedBy": {
        "@id": "https://1r.example.com/logistics-objects/person-john-smith"
      },
      "cargo:regulatedEntityIssuer": {
        "@id": "https://1r.example.com/logistics-objects/regulated-entity-issuer-001"
      },
      "cargo:receivedFrom": {
        "@id": "https://1r.example.com/logistics-objects/regulated-entity-received-from-001"
      }
    },
    {
      "@id": "https://1r.example.com/logistics-objects/person-john-smith",
      "@type": "cargo:Person",
      "cargo:firstName": "John",
      "cargo:lastName": "Smith"
    },
    {
      "@id": "https://1r.example.com/logistics-objects/regulated-entity-issuer-001",
      "@type": "cargo:RegulatedEntity",
      "cargo:regulatedEntityCategory": {
        "@id": "ccodes:RegulatedEntityCategoryCode_RA"
      },
      "cargo:regulatedEntityIdentifier": "NL-00100-01",
      "cargo:regulatedEntityExpiryDate": {
        "@value": "2027-04-01T00:00:00Z",
        "@type": "xsd:dateTime"
      }
    },
    {
      "@id": "https://1r.example.com/logistics-objects/regulated-entity-received-from-001",
      "@type": "cargo:RegulatedEntity",
      "cargo:regulatedEntityCategory": {
        "@id": "ccodes:RegulatedEntityCategoryCode_KC"
      },
      "cargo:regulatedEntityIdentifier": "NL-00200-01",
      "cargo:regulatedEntityExpiryDate": {
        "@value": "2026-03-01T00:00:00Z",
        "@type": "xsd:dateTime"
      }
    }
  ]
}
```




