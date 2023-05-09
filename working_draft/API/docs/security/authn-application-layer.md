# 
# oAuth 2.0 

OAuth 2.0  is an industry-standard protocol for authorization.

mTLS is a transport layer protocol that authenticates both client and server. OAuth 2.0 is an authorization framework to delegate access to resources. OAuth 2.0 Client Authentication and certificate bound access is a rigorous way to secure your mTLS connection.

The following HTTP header MUST be present in the request:

The so-called `Client Credentials Flow` or `Client Credentials Grant Type` can be used to secure machine-to-machine (m2m) communications, where a software program, rather than a user, needs to be authenticated and authorized.


| Header    | Description                                  | Examples                |
| ----------------- |    -------------------------------- |   ------------- |
| **Authorization** | Provides credentials that authenticates the ONE Record client with the ONE Record server. This COULD be an base64 encoded JSON Web Token (JWT) or credentials.       | Basic b25lOnJlY29yZA==                      |

Basic Authentication

Bearer Authentication
- 

API Keys

# OAUTH 2.0

Following RFC6749, 

## Terminology

Resource Owner

Client

Resource Server

Authorization Server

User Agent

Most implementations of OAuth use one or both of the following tokens:
- **access token:** send with an HTTP request and allows the application to authenticate and authorize a client
- **refresh token:** used to retrieve access token if the access token has been expired. 

The OAuth 2.0 specification does not provide for a refresh token to be issued.

The ONE Record API specification prescribes the use of access token (that have an expiry date) and refresh tokens.

OAuth 2.0 provides different flows for different types of API client. (see Client Credentials Grant 


## JSON Web Token
see RFC 7519

A JWT consists of three parts separated by dots (.):
(1) Header
(2) Payload
(3) Signature

Example JWT:
```
eyJhbGciOiJIUzI1NiIsImprdSI6Imh0dHBzOi8vYXV0aC5leGFtcGxlLmNvbS8ud2VsbC1rbm93bi9qd2tzLmpzb24iLCJraWQiOiJjYmQzZDBiZi02YzIwLTRlZDMtOGFlYy1jNGFmMGI2NTdjMmEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2F1dGguZXhhbXBsZS5jb20iLCJzdWIiOiJodHRwczovLzFyLmV4YW1wbGUuY29tL2xvZ2lzdGljcy1vYmplY3RzLzk1N2UyNjIyLTlkMzEtNDkzYi04YjhmLTNjODA1MDY0ZGJkYSIsImV4cCI6IjIwMjMtMDMtMDMxVDEwOjM4OjAxLjAwMFoifQ.1mj-448srB9EEjXZWHosD79KW46Wfm7LQ6pfhrYZg4k
```

see https://jwt.io/introduction


# JSON Web Token Claims

## JSON Web Signature

JOSE Header
see [RFC 7515](https://www.rfc-editor.org/rfc/rfc7515)

## Json Web Key Set (JWKS)

Example

```mermaid
sequenceDiagram
    participant 1Rc as ONE Record Client
    participant 1Rs as ONE Record Server
    participant IAP as Authorization Server (IAP)

    opt Get JSON Web Key Set
        1Rs->>+IAP: Request JSON Web Key Set
        IAP-->>-1Rs: JSON Web Key Set
        1Rs->>1Rs: Cache JWKS
    end
    
    1Rc->>+IAP: Authenticate with Client ID and Client Secret    
    IAP->>IAP: Validate Client ID and Client Secret 
    IAP-->>-1Rc: Access Token

    1Rc->>+1Rs: HTTP request with access token
    1Rs->>1Rs: Verify access token with JSON Web Key and check Access Control Lists
    alt is invalid or expired access token
        1Rs-->>1Rc: Error with status code 401
    else is not authorized
        1Rs-->>1Rc: Error with status code 403
    else is valid token and authorized
        1Rs-->>1Rc: Requested resource with status code 2xx
    end
    deactivate 1Rs
```

The workflow above illustrates the interactions that happen during the client credentials flow:

0. (Optional) The ONE Record server get the JWKS from the Authorization Server
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
The Authorization server uses a private key to sign JWTs.
The authorization server provides the public key on a URL in the form of a JSON Web Key Set (JWKS).
1. ONE Record client gets refresher token to Authorization server 


The ONE Record client must authenticate for this request.
 Usually, the authorization server either accepts the parameters `client_id` and `client_secret`in the HTTP request body or accepts the `client_id` and `client_secret`as username and password in the HTTP Basic auth header. (see https://www.rfc-editor.org/rfc/rfc6749#section-2.3.1)

Request:
```http
POST /oauth2/token
Host: auth.example.com
Authorization: Basic bXljbGllbnRpZDpteWNsaWVudHNlY3JldA==
Content-Type: application/x-www-form-urlencoded

grant_type: "client_credentials"
client_id: "secretid"
client_secret: "secretpassword"
```

client_id – is a Client ID of OAuth Client Application registered with the Authorization Server,
client_secret – is a Client Secret value of an OAuth Client application,
grant_type – must be client_credentials for a Client Credentials Grant type.

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

Using the JWT debugger to decode the access token, returns the following JSON object:
https://jwt.io/

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
  "sub": "https://1r.example.com/logistics-objects/957e2622-9d31-493b-8b8f-3c805064dbda",
  "exp": "2023-03-031T10:38:01.000Z"  
}
```

2. ONE Record client sends request to ONE Record server
Having received an access token, the client application can then send a request to a resource server, using that access token. 

```http
GET /logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c HTTP/1.1
Host: 1r.example.com
Accept: application/ld+json; version=2.0.0-dev
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovLzFyLmV4YW1wbGUuY29tL2xvZ2lzdGljcy1vYmplY3RzLzk1N2UyNjIyLTlkMzEtNDkzYi04YjhmLTNjODA1MDY0ZGJkYSIsImlzcyI6Imh0dHBzOi8vYXV0aC5leGFtcGxlLmNvbSIsImV4cCI6Ijg2NDAwIn0.IDnawFcz7mfHDMasHLNN7NsnFFZIxp9mVPEF9eyQou0
```

3. Server verifies JWT Token, checks ACLs, and returns requested Logistics Object
```bash
HTTP/1.1 200 OK
Content-Type: application/ld+json
Content-Language: en-US
Location: https://1r.example.com/logistics-objects/1a8ded38-1804-467c-a369-81a411416b7c
Type: https://onerecord.iata.org/ns/cargo#Piece
Revision: 1
Latest-Revision: 1

{
   "@context": {
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




The ONE Record can use the kid in JWT Token to find the public key to verify the JWT Token.

The ONE Record server MUST return a 401 Authorized Error if the token is expired or not valid.


**Properties**

4. ONE Record server checks access of requesting client using ACLs


5. ONE Record server response to ONE Record client's request


# JWT Issuer 

ONE Record server MUST be capable to consider multiple issuer for JWTs.

IATA provides a list of trusted JWT issuers.