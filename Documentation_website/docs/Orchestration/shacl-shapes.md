# SHACL Shapes and Mappings

## Available shapes

The shape files are maintained in the working draft folder of the specification on GitHub:
[working_draft/Data-Orchestration/SHACL-Shapes](https://github.com/IATA-Cargo/ONE-Record/tree/master/working_draft/Data-Orchestration/SHACL-Shapes).

| Shape | Validates | Based on mapping | Version | Namespace | Download |
| --- | --- | --- | --- | --- | --- |
| Waybill shape | Master and direct air waybills (`waybillType` = `MASTER` or `DIRECT`) | [XFWB 5.00](./xfwb.md) / FWB | 2026-07 | `https://onerecord.iata.org/ns/shapes/waybill#` | [air-waybill-2026-07.ttl](./assets/shacl/air-waybill-2026-07.ttl){:download="air-waybill-2026-07.ttl"} |
| House Waybill shape | House waybills (`waybillType` = `HOUSE`) and their link to the master | XFZB 4.00 and XFHL 3.00 / FHL | 2026-07 | `https://onerecord.iata.org/ns/shapes/house-waybill#` | [house-waybill-2026-07.ttl](./assets/shacl/house-waybill-2026-07.ttl){:download="house-waybill-2026-07.ttl"} |

Other Cargo-XML messages (XFSU, XFFM, XFBL, ...) do not have shapes yet. The [Cargo-XML mapping](./orchestration-cxml.md#messages-selected) table shows which shape applies to each message.

!!! info
    The shapes follow the Cargo-XML mappings, not Resolution 600a directly. See [Concepts](./shacl-concepts.md) for details.

## How the shapes relate to the mappings

Each row of a Cargo-XML mapping that leads to a ONE Record property becomes one or more constraints in the shape:

| Mapping information | Shape constraint |
| --- | --- |
| Mandatory in Cargo-IMP (FWB / FHL) | `sh:minCount 1` with severity **Violation** |
| Mandatory in Cargo-XML only (XFWB / XFZB) | `sh:minCount 1` with severity **Warning** |
| Cardinality (`1:1`, `0:1`, ...) | `sh:maxCount` |
| ONE Record object property | `sh:nodeKind sh:IRI` + `sh:node` to the shape of the target object |
| ONE Record data property | `sh:datatype` with severity **Info** |
| Code list (closed) | `sh:in` with the allowed code-list IRIs |
| Code list (open or external) | `sh:pattern "#[A-Za-z0-9_-]+$"` with severity **Warning** |
| Mapping guideline (for example "no ISS in CustomsInformation") | Dedicated constraint with a readable `sh:message` |

Because the shapes follow the mappings, a payload that passes a shape holds the data needed to build the matching message.

## File structure and versioning

- File names follow `<document>-<YYYY-MM>.ttl`, where `YYYY-MM` is the ONE Record data model release the shapes target (for example `2026-07`).
- The header of each file (an `owl:Ontology`) holds the version (`owl:versionInfo`, `owl:versionIRI`), the last change date (`dcterms:modified`) and the flagging logic.
- Prefix shapes such as `AIR_Location`, `CDP_Location` or `PAR_Location` describe the same ONE Record class with different rules depending on where it is used.
- The files include the code-list constraints of the release. When code lists change, a new version of the shapes is released.

## Sample payloads

Two sample air waybill payloads in JSON-LD, built from the [FWB example](./assets/FWB-Example1.txt){:download="FWB-Example1.txt"} and the XFWB mapping:

| File | Content | Expected result with `air-waybill-2026-07.ttl` |
| --- | --- | --- |
| [sample-waybill-valid.jsonld](./assets/shacl/sample-waybill-valid.jsonld){:download="sample-waybill-valid.jsonld"} | Complete master waybill with shipment, parties, piece, security declaration, booking and line item | Conforms (no results) |
| [sample-waybill-errors.jsonld](./assets/shacl/sample-waybill-errors.jsonld){:download="sample-waybill-errors.jsonld"} | Same waybill with two errors: no consignee `cityName`, and a malformed currency URI | 9 Violations and 1 Warning, from 2 root causes |

Use them to test your validation setup, or follow the [SHACL Play guide](./shacl-play.md).

## Running the shapes in your own tools

Any SHACL Core engine works. Example with [pySHACL](https://github.com/RDFLib/pySHACL):

```bash
pip install pyshacl
pyshacl -s air-waybill-2026-07.ttl -df json-ld -f human sample-waybill-errors.jsonld
```

Do not enable inference (`-i none`, the default). The shapes do not need the ONE Record ontology to run.

The report shows one top-level result for the waybill. The nested results, including the root causes, appear under `Details`. In other tools, look for an option that includes the details of `sh:node` results (in SHACL Play: "Include details").
