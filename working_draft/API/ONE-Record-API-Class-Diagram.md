# ONE Record API Class Diagram

**Version:** 2.0.0-dev **Status:** Draft; not yet approved by the COTB / CSC

```mermaid
classDiagram   
    direction LR   

    class LogisticsObject{                
    }

    class Organization{        
    }  
    
    class AuditTrail{        
        + changeRequests[]: ChangeRequest [*]        
        + latestRevision: xsd:nonNegativeInteger        
        + logisticsObject: LogisticsObject
    }

    AuditTrail "1" --> "1" LogisticsObject
    AuditTrail "1" --> "*" ChangeRequest

    class ChangeRequest{
        + affectedLogisticsObject: LogisticsObject                
        + callbackUrl: xsd:anyURI [0..1]
        + description: xsd:string [0..1]
        + errors[]: Error [*]                
        + operations[]: Operation [1..*]                
        + requestedAt: xsd:dateTime         
        + requestedBy: Organization    
        + revision: xsd:nonNegativeInteger
        + status: RequestStatus = PENDING
    }
        
    ChangeRequest "1" --> "*" Error
    ChangeRequest "1" --> "*" LogisticsObject
    ChangeRequest "1" --> "1..*" Operation
    ChangeRequest "1" --> "*" Organization    
    ChangeRequest --> RequestStatus        
   
    class DelegationRequest{
        + action: Action
        + delegates[]: Organization [1..*]
        + description: xsd:string [0..1]
        + errors[]: Error [*]
        + permissions[]: Permission [1..*]                
        + requestedAt: xsd:dateTime         
        + requestedBy: Organization    
        + status: RequestStatus = PENDING
        + targetLogisticsObjects[]: LogisticsObject [1..*]
    }
    
    DelegationRequest--> Action
    DelegationRequest "1" --> "0..*" Error
    DelegationRequest --> Permission        
    DelegationRequest "1" --> "1..*" Organization : requestedBy
    DelegationRequest --> RequestStatus        
    DelegationRequest "1" --> "1..*" LogisticsObject
    DelegationRequest "1" --> "1..*" Organization : delegatedTo  
    
    class Error{        
        + details[]: ErrorDetails [1..*]
        + title: xsd:string
    }
    Error "1" --> "*" ErrorDetails
    
    class ErrorDetails{
        + code: xsd:string
        + message: xsd:string [0..1]
        + property: xsd:anyURI [0..1]
        + resource: xsd:anyURI [0..1]
    }
    
    class Notification{
        + changedProperties[]: xsd:anyURI [*]
        + changeRequest: ChangeRequest [0..1]
        + eventType: NotificationEventType
        + logisticsObject: LogisticsObject [0..1]        
        + topic: xsd:anyURI
    }
    Notification "1" --> "0..1" ChangeRequest    
    Notification --> NotificationEventType
    Notification "1"--> "1" LogisticsObject

    class Operation{
        + o: OperationObject
        + op: OperationEnum
        + p: xsd:anyURI
        + s: xsd:string
    }
    Operation "1" --> "1" OperationObject
    Operation --> OperationEnum

    class OperationObject{
        + datatype: xsd:anyURI
        + value: xsd:string   
    }

    class ServerInformation{
        + dataOwner: Organization
        + serverEndpoint: xsd:anyURI
        + supportedContentTypes[]: xsd:string [1..*]
        + supportedAPIVersions[]: xsd:string [1..*]
        + supportedEncodings[]: xsd:string [*]
        + supportedLanguages[]: xsd:string [1..*]
        + supportedLogisticsObjectTypes[]: xsd:anyURI [1..*]
    }    
    ServerInformation "1" --> "1" Organization

    class Subscription{
        + callbackUrl: xsd:anyURI
        + contentTypes[]: xsd:string [*]
        + expiresAt: xsd:dateTime [0..1]                        
        + secret: xsd:string [0..1]
        + sendLogisticsObjectBody: xsd:boolean = FALSE
        + subscriber: Organization        
        + subscribeToLogisticsEvents: xsd:boolean = FALSE
        + topicType: TopicType
        + topic: xsd:anyURI
    }    
    Subscription "1" --> "1" Organization
    Subscription --> TopicType

    class SubscriptionRequest{
        + description: xsd:string [0..1]
        + errors[]: Error [*]        
        + requestedAt: xsd:dateTime         
        + requestedBy: Organization    
        + status: RequestStatus = PENDING
        + subscription: Subscription
    }       
    SubscriptionRequest "1" --> "1..*" Organization : requestedBy
    SubscriptionRequest --> RequestStatus        
    SubscriptionRequest "1" --> "1..*" Subscription

    class RequestStatus{
        <<Enumeration>>
        PENDING
        ACCEPTED
        REJECTED
    }

    class NotificationEventType{
        <<Enumeration>>
        OBJECT_CREATED
        OBJECT_UPDATED

        EVENT_RECEIVED

        CHANGE_REQUEST_PENDING
        CHANGE_REQUEST_ACCEPTED                
        CHANGE_REQUEST_REJECTED
        CHANGE_REQUEST_FAILED

        DELEGATION_REQUEST_PENDING
        DELEGATION_REQUEST_ACCEPTED                
        DELEGATION_REQUEST_REJECTED
        DELEGATION_REQUEST_FAILED

        SUBSCRIPTION_REQUEST_PENDING
        SUBSCRIPTION_REQUEST_ACCEPTED                
        SUBSCRIPTION_REQUEST_REJECTED
        SUBSCRIPTION_REQUEST_FAILED
    }
    class OperationEnum{
        <<Enumeration>>
        ADD
        DEL
    }
    class Permission{
        <<Enumeration>>
        GET
        PATCH
    }
    class TopicType{
        <<Enumeration>>
        LOGISTICS_OBJECT_TYPE
        LOGISTICS_OBJECT_URI
    }
     class Action{
        <<Enumeration>>
        DELEGATE
        REVOKE
    }
    
```