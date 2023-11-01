
The authentication mechanism employed by ONE Record servers adheres to the OpenID Connect standard. To authenticate successfully, a party must possess an ID Token issued by an authorized identity provider (IdP). This page provides an explanation of OpenID Connect and its application within the network of ONE Record servers (ONE Record network).

# OpenID Connect

OpenID Connect (OIDC) is an interoperable authentication protocol based on the OAuth 2.0 framework of specifications (IETF [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749) and [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750)). It allows third-party applications to verify the identity of the end-user and to obtain basic user profile information. OIDC uses JSON web tokens (JWTs), which you can obtain using flows conforming to the OAuth 2.0 specifications. To know more about OIDC see https://openid.net/.

The ONE Record server employs the OpenID Connect standard to authenticate other servers within the network.

# OpenID Connect Roles

OpenID Connect outlines various actors that play specific and distinct roles in the authentication and authorization process. In the context of the ONE Record servers network, our focus will be on the main roles that hold significance.

- Client Application: The client represents a ONE Record server that wants to access an external resouce (i.e a logistics object situated on a different ONE Record server). In this page, a client application is referred as ONE Record client

- Identity Provider: The Identity Provider (IdP) holds the responsibility of authenticating a ONE Record server. It verifies the server's identity and generates an ID token that the requesting server can utilize for authentication within the ONE Record network.

- Resource Server: The Resource Server is the host of protected resources that a ONE Record server aims to access. In the ONE Record context, these resources may include logistics objects, logistics events, and more. In this page, a resource server is referred as ONE Record Server.

It's essential to understand that OpenID Connect is built on top of OAuth 2.0, which provides the framework for token-based authentication and authorization. OpenID Connect adds an authentication layer and standardizes the exchange of identity information, making it easier for ONE Record servers to authenticate other servers in the network.

# OpenId Connect Grant Types

OpenID Connect (OIDC) defines various grant types that facilitate secure authentication and authorization processes in web and mobile applications. These grant types determine how tokens are exchanged between the involved parties. The "Authorization Code" grant type is widely used and involves the exchange of an authorization code for access tokens, enhancing security by keeping tokens away from the client. The "Implicit" grant type is suitable for browser-based applications, providing access tokens directly, while the "Client Credentials" grant type is employed by confidential clients to authenticate themselves and obtain access tokens directly from the authorization server. Lastly, the "Refresh Token" grant type enables the renewal of access tokens without requiring users to reauthenticate, improving user experience and security.

It is important to node that these grants define only the authentication procedure while the authorization to access specific resources is handled with Access Contol Lists.

The server's implementer holds the authority to select the preferred grant type. However, the JSON Web Token MUST follow the specifications defined in the [JWT section](#json-web-token). Within this page, a demonstration of the "Client Credential" grant type will be showcased, noted for its suitability in facilitating machine-to-machine interactions. 

# JSON Web Token

A JSON Web Token (JWT), pronounced "jot," is an established standard [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519) that defines a concise and self-contained method for securely exchanging data in the form of a JSON object between different parties. It is essential to understand that while all JWTs are tokens, not all tokens necessarily follow the JWT standard.

Due to its compact nature, a JWT can be easily conveyed via a URL, as a POST parameter, or within an HTTP header, ensuring swift transmission. Within a JWT, all pertinent details about an entity are included, eliminating the need for multiple database queries. Furthermore, the recipient of a JWT can verify the token's authenticity without having to contact a server.

The structure of a JWT consists of three parts separated by dots ('.'). These parts are:

- Header
- Payload
- Signature

Example JWT Token:
```
xxxx.yyyy.zzzz
```

## Header

The header generally consists of two components: the token type (JWT) and the cryptographic signing algorithm employed, like HMAC SHA256 or RSA SHA256. However, additional properties are allowed according to the [JSON Web Signature (JWS) standard](https://www.rfc-editor.org/rfc/rfc7515#section-4.1)

Example header:
```
{
  "alg": "RS256",
  "typ": "JWT",
  "jku": "https://auth.example.com/.well-known/jwks.json",
  "kid":"NjVBRjY5MDlCMUIwNzU4RTA2QzZFMDQ4QzQ2MDAyQjVDNjk1RTM2Qh",
}
```
The header in the example declares that the encoded object is a JWT and it's signed with RSA SHA256 algorithm. The optional "jku" and "kid" Header parameter contains informaion about the public key that matches the key used to digitally sign the JWS. The key is represented as a [JSON Web Key (JWK)](https://www.rfc-editor.org/rfc/rfc7517).

In order to be compliant with ONE Record specification, the JWT token must contains the "alg" and the "typ". The other header parameter are optional but can be used to enhance the authentication process.

## Payload 
The payload contains the claims, which are statements about the ONE Record client server or other data. The claims are divided into three types:

- Registered claims: These are predefined claims that are not mandatory but recommended. They include information such as the issuer (iss), subject (sub), audience (aud) and expiration time (exp). Additional registered claims can be found in the (RFC7519 specification)[https://tools.ietf.org/html/rfc7519#section-4.1]

- Public claims: JWT users have the freedom to define public claims according to their requirements. However, to prevent conflicts, it is recommended to either register these public claims in the IANA JSON Web Token Registry or define them using a URI with a namespace that can withstand collisions.

- Private claims: These are custom claims that are meant to be shared and used between specific parties. These claims are not part of registered or public claims

Example payload:

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```
## Signature

The signature is generated by combining the encoded header, encoded payload, and a secret key (or private key in the case of RSA) using the signing algorithm specified in the header. The signature is used to verify that the token hasn't been tampered with during transmission and that it comes from a trusted source.


Example signature:
```
RSASHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), PUBLIC_KEY, PRIVATE_KEY )
```
The example shows how to generate a signature. The signature will be then encoded in base64 and added at the end of the JWT token, as explained in the section above.

## JSON Web Token Claims 

JSON Web Tokens (JWTs) consist of claims, which are statements providing information about a particular subject. As explained in the previous section, claims are store in the payload of the JWT token. Despite the fact that claims are optional, in ONE Record network, a JWT token must carry the following claims:

- "iss" (Issuer) Claim : The "iss" (issuer) claim identifies the principal that issued the JWT.
- "exp" (Expiration Time) Claim : The "exp" (expiration time) claim identifies the expiration time on or after which the JWT MUST NOT be accepted for processing.
- "logistics_agent_uri" Claim : The "logistics_agent_uri" claim carries the URI of a [cargo:LogisticAgent](https://onerecord.iata.org/ns/cargo#LogisticsAgent) and which identifies the logistics agent in the ONE Record network. 

```
{
  "iss": "https://auth.example.com",
  "logistics_agent_uri": "https://1r.example.com/logistics-objects/957e2622-9d31-493b-8b8f-3c805064dbda",
  "exp": "2023-03-031T10:38:01.000Z"  
}
```

The "iss" must be present to allowed multiple IdP in the network while the "exp" is necessary to define the expiration time of the ID token. 
The "logistics_agent_uri" is necessary for authenticate the party and it's used to fill the `isRequestedBy` property in action requests.
Other claims can be added to the JWT Token according to the IdP configuration but might not be used by the ONE Record server.

## Validate JSON Web Tokens

Validation of JSON Web Tokens should be done using third party libraries that supports the signing algorithm of the JWT Token. It is strongly advised to avoid manually validating JWTs, as it can be error-prone and might overlook critical aspects, resulting in severe security vulnerabilities. Fortunately, there are various JWT libraries available for different platforms and programming languages that handle JWT validation automatically. To find a suitable JWT library for your specific platform and programming language, you can visit [JWT.io](https://jwt.io).


## JSON Web Key Sets

The JSON Web Key Set (JWKS) is a collection of keys that includes the public keys required to validate any JSON Web Token (JWT) issued by the Identity Provider (IdP) and signed using the RS256 signing algorithm. For every tenant, OIDC provides a JWKS endpoint accessible at https://{yourDomain}/.well-known/jwks.json. This endpoint contains the JSON Web Key (JWK) required to validate all JWTs issued by OIDC for that specific tenant. For more information about JWKS, please refer to the specification [RFC7517](https://datatracker.ietf.org/doc/html/rfc7517).

IATA mantains a page with the list of authorized IdP together with:

- the url to request a token.
- the url to refresh a token.
- the location of the JSON Web Key Set. 

Any trusted IdP must immediately communicate any setup change to IATA.

# Example - Client Credential Grant

In this section, a example of the Client Credential grant will be demostrated in the context of ONE Record.

The OIDC Client Credential Flow can be used to secure machine-to-machine (m2m) communications, where a software program, rather than a user, needs to be authenticated. In this type of grant, the client credentials are verified and an ID Token is generated. This ID token is provided in a form of a signed JSON Web Token (JWT). Any ONE Record Server can verify the authenticity of the JWT token, and so the identity of the client server, using [JWKS](#json-web-key-sets) provided by the IdP without the need of a new API call.


## Flow Diagram

The following diagram shows a generic implementation of the Client Credential Flow :

```mermaid
sequenceDiagram
    participant CA as Client Application (One Record Client)
    participant SA as Server Application (One Record Server)
    participant IdP as Identity Provider (IdP)

    CA->>+IdP: 1. Authenticate with Client ID and Client Secret    
    IdP->>IdP: 2. Validate Client ID and Client Secret 
    IdP->>-CA: 3. ID Token


    CA->>+SA: 4. Request resource with ID token  
    SA->>SA: 5.  Validate the ID token with JWKS provided by the IdP
    SA->>-CA: 6. Response with the resource

```

1. The Client Application sends credentials to the Identity Provider
2. The IdP validates the credentials
3. The IdP generates an ID token and send it to the Client Application as response
4. The Client Application request a resource on the Server Application attaching the ID token
5. The Server Application validates the ID token using the JWKS provided by the IdP
6. The Server Application responds with the requested resource

This diagram does not shows how JWKS are shared between the IdP and the Server Application. More information can be found below in the [JSON Web Key Sets section](#json-web-key-sets).

## Request a Token in Client Credential Grant

The ONE Record server will perform a POST request in order to get an ID Token. The ID Token received can be used to authenticate towards a ONE Record server.

### Endpoint
The endpoint to request a token will be provided by the Identity Provider. 
Example: https://auth.example.com/token

### Request Header Parameter

| Request Header    | Description                                  | Examples                |
| ----------------- |    -------------------------------- |   ------------- |
| **Authorization** | Provides credentials that authenticates a ONE Record client with an IfP. This header must be set to Basic <base64 encoded "clientId:clientSecret"> if the IdP authentication method is set to Basic. The client_id and client_secret are provided when a client subscribes to an IdP.  | Basic b25lOnJlY29yZA==     
| **Content-Type** | Define the content type of the request | application/x-www-form-urlencoded

### Request Body Parameter

| Body property    | Description                                  | Examples                |
| ----------------- |    -------------------------------- |   ------------- |
| **grant_type** | Provides the grant type of the request and must be set to "client_credentials" | client_credentials     
| **client_id** | Provides the client id generated by the IdP. This property must be set if the IdP authentication method is set to POST | 
| **client_secret** | Provides the client secret generated by the IdP. This property must be set if the IdP authentication method is set to POST| 

### Reponse 

One of the following HTTP status codes MUST be present in the response:

| Response    | Description                               | Response Body   |
| ----------------- |    -------------------------------- |   ------------- |
| **200** | ID Token Created                              | Return a newly created ID Token |
| **400** | Bad Request                                   | Error            |
| **401** | Unauthorized                                  | Error            |
| **500** | Internal Server Error                         | Error            |


### Reponse Body

| Body property    | Description                                  | Examples                |
| ----------------- |    -------------------------------- |   ------------- |
| **access_token** | A JWT token representing a session | sdaksmcna3249mn432mn423842....     
| **expires_in** | The number of second till session expiration | 600
| **token_type** | The type of the token. This is always set to bearer| bearer 

!!! note

    OIDC is built upon the foundation of OAuth 2.0 (as defined in [RFC 67490](https://datatracker.ietf.org/doc/html/rfc6749)). It's important to note that the ID Token, which contains user identity information, is returned within the `access_token`` field as described by the OAuth specification.

### Error Body

| Body property    | Description                                  | Examples                |
| ----------------- |    -------------------------------- |   ------------- |
| **error** | Name of the error | invalid_client_id   
| **error_description** | Description of the error | the client id provided is invalid

## Refresh token

The Client Credential Grant used by ONE Record does not support refresh tokens [(RFC 6749 Section 4.4.2).](https://www.rfc-editor.org/rfc/rfc6749#section-4.4.2)
Refresh tokens primarily serve the purpose of allowing applications to prevent users from having to provide their username and password multiple times.
Since ONE Record server authentication does not involve any user interaction, there is no need for refresh tokens in this scenario.

## Implementation example

The following section describes an example of authentication between two ONE Record servers.

```mermaid
sequenceDiagram
    participant 1Rc as ONE Record Client
    participant 1Rs as ONE Record Server
    participant IdP as Identity Provider (IdP)

    opt Get JSON Web Key Set
        1Rs->>+IdP: Request JSON Web Key Set
        IdP-->>-1Rs: JSON Web Key Set
        1Rs->>1Rs: Cache JWKS
    end
    
    1Rc->>+IdP: Authenticate with Client ID and Client Secret    
    IdP->>IdP: Validate Client ID and Client Secret 
    IdP-->>-1Rc: ID Token

    1Rc->>+1Rs: HTTP request with ID token
    1Rs->>1Rs: Verify ID token with JSON Web Key and check Access Control Lists
    alt is invalid or expired ID token
        1Rs-->>1Rc: Error with status code 401
    else is not authorized
        1Rs-->>1Rc: Error with status code 403
    else is valid token and authorized
        1Rs-->>1Rc: Requested resource with status code 2xx
    end
    deactivate 1Rs
```


0. (Optional) The ONE Record server get the JWKS from the IdP
```
GET /.well-known/jwks.json
Host: auth.example.com
```

```bash
HTTP/1.1 200 OK
Cache-Control: public, max-age=15, stale-while-revalidate=15, stale-if-error=86400
{
   "keys":[
      {
         "alg":"RS256",
         "kty":"RSA",
         "use":"sig",
         "x5c":[
            "MIIC+DCCAeCgAwIBAgIJBIGjYW6hFpn2MA0GCSqGSIb3DQEBBQUAMCMxITAfBgNVBAMTGGN1c3RvbWVyLWRlbW9zLmF1dGgwLmNvbTAeFw0xNjExMjIyMjIyMDVaFw0zMDA4MDEyMjIyMDVaMCMxITAfBgNVBAMTGGN1c3RvbWVyLWRlbW9zLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMnjZc5bm/eGIHq09N9HKHahM7Y31P0ul+A2wwP4lSpIwFrWHzxw88/7Dwk9QMc+orGXX95R6av4GF+Es/nG3uK45ooMVMa/hYCh0Mtx3gnSuoTavQEkLzCvSwTqVwzZ+5noukWVqJuMKNwjL77GNcPLY7Xy2/skMCT5bR8UoWaufooQvYq6SyPcRAU4BtdquZRiBT4U5f+4pwNTxSvey7ki50yc1tG49Per/0zA4O6Tlpv8x7Red6m1bCNHt7+Z5nSl3RX/QYyAEUX1a28VcYmR41Osy+o2OUCXYdUAphDaHo4/8rbKTJhlu8jEcc1KoMXAKjgaVZtG/v5ltx6AXY0CAwEAAaMvMC0wDAYDVR0TBAUwAwEB/zAdBgNVHQ4EFgQUQxFG602h1cG+pnyvJoy9pGJJoCswDQYJKoZIhvcNAQEFBQADggEBAGvtCbzGNBUJPLICth3mLsX0Z4z8T8iu4tyoiuAshP/Ry/ZBnFnXmhD8vwgMZ2lTgUWwlrvlgN+fAtYKnwFO2G3BOCFw96Nm8So9sjTda9CCZ3dhoH57F/hVMBB0K6xhklAc0b5ZxUpCIN92v/w+xZoz1XQBHe8ZbRHaP1HpRM4M7DJk2G5cgUCyu3UBvYS41sHvzrxQ3z7vIePRA4WF4bEkfX12gvny0RsPkrbVMXX1Rj9t6V7QXrbPYBAO+43JvDGYawxYVvLhz+BJ45x50GFQmHszfY3BR9TPK8xmMmQwtIvLu1PMttNCs7niCYkSiUv2sc2mlq1i3IashGkkgmo="
         ],
         "n":"yeNlzlub94YgerT030codqEztjfU_S6X4DbDA_iVKkjAWtYfPHDzz_sPCT1Axz6isZdf3lHpq_gYX4Sz-cbe4rjmigxUxr-FgKHQy3HeCdK6hNq9ASQvMK9LBOpXDNn7mei6RZWom4wo3CMvvsY1w8tjtfLb-yQwJPltHxShZq5-ihC9irpLI9xEBTgG12q5lGIFPhTl_7inA1PFK97LuSLnTJzW0bj096v_TMDg7pOWm_zHtF53qbVsI0e3v5nmdKXdFf9BjIARRfVrbxVxiZHjU6zL6jY5QJdh1QCmENoejj_ytspMmGW7yMRxzUqgxcAqOBpVm0b-_mW3HoBdjQ",
         "e":"AQAB",
         "kid":"NjVBRjY5MDlCMUIwNzU4RTA2QzZFMDQ4QzQ2MDAyQjVDNjk1RTM2Qh",
         "x5t":"NjVBRjY5MDlCMUIwNzU4RTA2QzZFMDQ4QzQ2MDAyQjVDNjk1RTM2Qh"
      }
   ]
}
```
The IdP uses a private key to sign JWTs.
The IdP provides the public key on a URL in the form of a JSON Web Key Set (JWKS).

1. ONE Record client gets ID token from an IdP 

The ONE Record client must authenticate for this request.
As seen in the Request token API, the IdP define the authentication method as BASIC or POST

- `POST`: `client_id` and `client_secret` in the HTTP request body  
- `BASIC`: `client_id` and `client_secret`as username and password in the HTTP Basic auth header following the encoding explained in the API description.

Request:
```http
POST /token
Host: auth.example.com
Authorization: Basic bXljbGllbnRpZDpteWNsaWVudHNlY3JldA==
Content-Type: application/x-www-form-urlencoded

grant_type: "client_credentials"
client_id: "secretid"
client_secret: "secretpassword"
```

Response:
```bash
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8
Cache-Control: no-store
Pragma: no-cache

{
  "access_token" : "eyJhbGciOiJIUzI1NiIsImprdSI6Imh0dHBzOi8vYXV0aC5leGFtcGxlLmNvbS8ud2VsbC1rbm93bi9qd2tzLmpzb24iLCJraWQiOiJjYmQzZDBiZi02YzIwLTRlZDMtOGFlYy1jNGFmMGI2NTdjMmEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2F1dGguZXhhbXBsZS5jb20iLCJzdWIiOiJodHRwczovLzFyLmV4YW1wbGUuY29tL2xvZ2lzdGljcy1vYmplY3RzLzk1N2UyNjIyLTlkMzEtNDkzYi04YjhmLTNjODA1MDY0ZGJkYSIsImV4cCI6IjIwMjMtMDMtMDMxVDEwOjM4OjAxLjAwMFoifQ.1mj-448srB9EEjXZWHosD79KW46Wfm7LQ6pfhrYZg4k",
  "token_type" : "Bearer",
  "expires_in" : 86400
}
```

Using the JWT debugger to decode the ID token, returns the following JSON object:


Header:
```json
{
  "alg": "HS256",
  "jku": "https://auth.example.com/.well-known/jwks.json",
  "kid": "cbd3d0bf-6c20-4ed3-8aec-c4af0b657c2a",
  "typ": "JWT"
}
```
Payload:
```json
{
  "iss": "https://auth.example.com",
  "onerecord_company_id": "https://1r.example.com/logistics-objects/957e2622-9d31-493b-8b8f-3c805064dbda",
  "exp": "2023-03-031T10:38:01.000Z"  
}
```

2. ONE Record client sends request to ONE Record server
Having received an ID token, the ONE Record client can then send a request to a ONE Record server, using that token. 

```http
GET /logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c HTTP/1.1
Host: 1r.example.com
Accept: application/ld+json; version=2.0.0-dev
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovLzFyLmV4YW1wbGUuY29tL2xvZ2lzdGljcy1vYmplY3RzLzk1N2UyNjIyLTlkMzEtNDkzYi04YjhmLTNjODA1MDY0ZGJkYSIsImlzcyI6Imh0dHBzOi8vYXV0aC5leGFtcGxlLmNvbSIsImV4cCI6Ijg2NDAwIn0.IDnawFcz7mfHDMasHLNN7NsnFFZIxp9mVPEF9eyQou0
```


3. Server verifies JWT Token, checks ACLs, and returns requested Logistics Object
    - If present a "kid" is present, the ONE Record can use it to find the public key and verify the JWT Token.
    - The ONE Record server MUST return a 401 Authorized Error if the token is expired or not valid.
4. ONE Record server checks access of requesting client using ACLs
5. ONE Record server response to ONE Record client's request

```bash
HTTP/1.1 200 OK
Content-Type: application/ld+json
Content-Language: en-US
Location: https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c
Type: https://onerecord.iata.org/ns/cargo#Piece
Revision: 1
Latest-Revision: 1

{
   "@context":{
     "api": "https://onerecord.iata.org/ns/api#",
     "@language": "en-US"
   },
    "@type": "https://onerecord.iata.org/ns/cargo#Piece",
    "@id": " https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c",
    "https://onerecord.iata.org/ns/cargo#goodsDescription": "ONE Record Advertisement Materials",
    "https://onerecord.iata.org/ns/cargo#Piece#handlingInstructions": [
        {
            "@type": "https://onerecord.iata.org/ns/cargo#HandlingInstructions",
            "https://onerecord.iata.org/ns/cargo#HandlingInstructions#serviceType": "SPH",
            "https://onerecord.iata.org/ns/cargo#HandlingInstructions#serviceDescription": "Valuable Cargo",
            "https://onerecord.iata.org/ns/cargo#HandlingInstructions#serviceTypeCode": "VAL"
        }
    ]
}

```
# Identity Provider

Identity Providers play a crucial role in the ONE Record network, responsible for authenticating parties and safeguarding the network from external threats and malicious entities.

Due to their critical role, IATA consistently ensures that IdPs adhere to the highest security standards and have a stringent onboarding process for new parties in place. This ongoing monitoring and verification help maintain the integrity and security of the network.

ONE Record servers have the option to place trust in Identity Providers (IdPs) that are not included in IATA's trusted list. However, in such cases, the servers themselves will be responsible for ensuring the trustworthiness of those external IdPs.


## Onboarding of an Identity Provider

The onboarding of a new Identity Provider in ONE Record network is complex procedure which establish the integrity of the IdP. For more information, please contact the [API maintainers](../community.md). 

## Onboarding of a party

The Identity provider is responsible for the onboarding of a party in the network. A procedure to assert the identity of a new party must be in place following the industry security standard. For more information, please contact the [API maintainers](../community.md). 

## Multiple Identity Providers
The ONE Record network allows for the existence of multiple Identity Providers (IdPs). Although not obligatory, different key players may choose different Identity Providers according to their preferences.

Consequently, the ONE Record API must have the capability to handle multiple IdPs. Each server should be able to establish a list of trusted IdPs that ONE Record clients can use for authentication. This specification outlines how to interact with an IdP, but variations in the JWT token implementation can occur, and it is the responsibility of the IdP to provide public information about each variation.

To implement multiple IdPs, a ONE Record Server utilizes the 'iss' claim to identify the issuer of the token (IdP). Once the IdP is identified, the ONE Record server can utilize the appropriate JWKS (JSON Web Key Set) to validate the ID token.

IATA will maintain and publish a list of accredited Identity Providers. ONE Record nodes have the ability to communicate with IATA to obtain information about a specific IdP.

# API Authentication and Autorization

In the following table we summarize the authentication and authorization needed for each API defined by ONE Record API specifications.

|  Resource / Endpoint | HTTP Action | Authentication required |  Authorization required |
| -------- | -------- | -------- |  -------- | 
| / | GET | Yes | No | 
| /logistics-objects | POST | Only Internal Service | Only Interal Service | 
| /logistics-objects/{{logisticsObjectId}} | GET | Yes | Yes | 
| /logistics-objects/{{logisticsObjectId}} | PATCH | Yes | No | 
| /logistics-objects/{{logisticsObjectId}}/audit-trail | GET | Yes | Yes [^1] | 
| /logistics-objects/{{logisticsObjectId}}/logistics-events | GET | Yes | Yes | 
| /logistics-objects/{{logisticsObjectId}}/logistics-events | POST | Yes | Yes [^2] | 
| /logistics-objects/{{logisticsObjectId}}/logistics-events/{{logisticsEventId}} | GET | Yes | Yes | 
| /subscriptions | GET | Yes | No | 
| /subscriptions | POST | Yes | No | 
| /access-delegation | POST | Yes | No |
| /action-requests/{{actionRequestId}} | GET | Yes | Yes |
| /action-requests/{{actionRequestId}} | PATCH | Only Internal Service  | Only Internal Service  |
| /action-requests/{{actionRequestId}} | DELETE | Yes | Yes |
| /notifications | POST | Yes | No | 

The term "Only Internal Service" emphasizes that the service is exclusively accessible to internal actors and should be blocked for third-party ONE Record servers.

More information about the authorization mechanism can be found in the [access control page.](access-control.md)

[^1]: The audit trail can inherit the authorization from the Logistics Object.

[^2]: The implementor can decide to give access to all authenticated users.