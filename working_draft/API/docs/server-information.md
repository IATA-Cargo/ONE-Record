# Get Server Information

As a ONE Record client, it is helpful to know the capabilities of a ONE Record server and to be able to retrieve this information in a systematic way.
Therefore, every ONE Record server MUST provide an endpoint that can be used to retrieve this technical server information.
This `ServerInformation` include details about the ONE Record server's ONE Record capabilities, the data owner (as a link to an [Organization](https://onerecord.iata.org/ns/cargo/3.0.0#Organization) using the [Organization URI](concepts.md#organization-uri)), the supported Logistics Object types (incl. data model versions) and the supported serialization formats.

Every `authenticated ONE Record client` who knows this endpoint MUST be able to request this information from the ONE Record server.

## Request

The following HTTP header parameters MUST be present in the request:

| Request Header | Description                  | Examples            |
| -------------- |  -------------------------- | ------------------- |
| **Accept**     | The content type that you want the HTTP response to be formatted in. | application/ld+json |

## Response

One of the following HTTP status codes MUST be present in the response:

| Code    | Description               | Response body     |
| ------- |  ----------------------- | ----------------- |
| 200 |     The request to retrieve the ServerInformation has been successful | ServerInformation |
| 301 | 	Indicate that the server has moved permanently to a new location  | No response body      |
| 401 | 	Not authenticated or expired token | Error       |
| 403 | 	Not authorized to perform action | Error       |
| 404 | 	Resource Not Found | Error       |
| 405 | 	Method not allowed | Error       |
| 415 | 	Unsupported content type | Error       |
| 500 |     Internal Server Error | Error       |

A successful request MUST return a `HTTP/1.1 200 OK` status code and the following HTTP headers parameters MUST be present in the response:

| Response Header      | Description                    | Example   |
| -------------------- |  --- ----------------------- | ----------------------------- |
| **Content-Type**     | The content type that is contained with the HTTP body.                 | application/ld+json           |
| **Content-Language** | Describes the language(s) for which the requested resource is intended.                    | en-US     |
| **Last-Modified**    | Date and time when the ServerInformation was last time changed. See https://developer.mozilla.org/en-US/docs/Web/ | Tue, 21 Feb 2023 07:28:00 GMT |

The HTTP body must contain a valid [ServerInformation](https://iata.onerecord.org/api#ServerInformation) object in the format as specified by the Content-Type in the header.

The response body includes the following data elements.

| Object Property               | Description                 | Required |        |
| ----------------------------- |  ----- | -------- |  ---- |
| **dataOwner**                 | URI to the Company that is hosted on the server | y        | http://www.w3.org/2001/XMLSchema#anyURI        |
| **serverEndpoint**            | ONE Record server endpoint  | y        | http://www.w3.org/2001/XMLSchema#anyURI        |
| **supportedLanguages**        | Languages supported by this server              | y        | http://www.w3.org/2001/XMLSchema#string (list) |
| **supportedContentTypes**     | HTTP content types supported by this server     | y        | http://www.w3.org/2001/XMLSchema#string (list) |
| **supportedLogisticsObjects** | Logistics Object types supported by this server | y        | http://www.w3.org/2001/XMLSchema#anyURI (list) |

## Example A1

Request:

```http

GET / HTTP/1.1
Host: 1r.example.com
Content-Type: application/ld+json
Accept: application/ld+json
```

Response:

```bash
HTTP/1.1 200 OK
Content-Type: application/ld+json

--8<-- "examples/ServerInformation.json"
```
_([examples/ServerInformation.json](examples/ServerInformation.json))_

## Example A2

Request:

```http

GET / HTTP/1.1
Host: 1r.example.com
Content-Type: application/ld+json
Accept: application/ld+json
```

Response:

```http
HTTP/1.1 301 Moved Permanently
Location: https://1r.example.org/
```


