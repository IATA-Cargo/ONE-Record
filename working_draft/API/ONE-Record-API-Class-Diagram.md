# ONE Record API Class Diagram

**Version:** 2.0.0-dev **Status:** Draft; not yet approved by the COTB / CSC

```mermaid
classDiagram   
    direction LR   

    class LogisticsObject{                
    }

    class Organization{        
    }  

    class AccessDelegation{
        + description: xsd:string [0..1]
        + hasPermission[]: Permission [1..*]                
        + isRequestedFor[]: Organization [1..*]
        + hasLogisticsObject[]: LogisticsObject [1..*]        
    }

    AccessDelegation "1" --> "1..*" Permission   
    AccessDelegation "1" --> "1..*" Organization: requestedFor
    AccessDelegation "1" --> "1..*" LogisticsObject

    class ActionRequest {
        <<Abstract>>         
        + hasError[]: Error [*]
        + requestedAt: xsd:dateTime         
        + isRequestedBy: Organization            
        + isRevokedBy: Organization [0..1]
        + hasRequestStatus: RequestStatus = REQUEST_PENDING
        + revokedAt: xsd:dateTime [0..1]                 
    }
    ActionRequest <|-- AccessDelegationRequest
    ActionRequest <|-- ChangeRequest
    ActionRequest <|-- SubscriptionRequest

    ActionRequest "1" --> "0..*" Error     
    ActionRequest "1" --> "1..*" Organization : requestedBy    
    ActionRequest --> RequestStatus                
    ActionRequest "1" --> "1..*" Organization : revokedBy

    class AccessDelegationRequest{
        + hasAccessDelegation: AccessDelegation        
    }
    AccessDelegationRequest "1" --> "1" AccessDelegation    

    class ChangeRequest{        
        + hasChange: Change        
    }
    ChangeRequest "1" --> "1" LogisticsObject
    ChangeRequest "1" --> "1" Change

    class SubscriptionRequest{
        + hasSubscription: Subscription
    }   
    SubscriptionRequest "1" --> "1" Subscription
       
    class AuditTrail{                
        + hasChangeRequest[]: ChangeRequest [*]                
        + latestRevision: xsd:nonNegativeInteger       
    }
    AuditTrail "1" --> "*" ChangeRequest

    class Change{    
        + description: xsd:string [0..1]    
        + hasOperation[]: Operation [1..*]        
        + hasLogisticsObject: LogisticsObject
        + revision: xsd:nonNegativeInteger        
    }
    Change "1" --> "1" LogisticsObject
    Change "1" --> "1..*" Operation
    
    class Error{        
        + hasErrorDetail[]: ErrorDetails [1..*]
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
        + hasEventType: NotificationEventType
        + isTriggeredBy: ActionRequest [0..1]  
        + hasLogisticsObject: LogisticsObject [0..1]                
        + topic: xsd:anyURI
        
    }
    Notification "1"--> "0..1" LogisticsObject
    Notification "1" --> "1" NotificationEventType
    Notification "1" --> "0..1" ActionRequest    

    class Operation{
        + o: OperationObject
        + op: PatchOperation
        + p: xsd:anyURI
        + s: xsd:string
    }
    Operation "1" --> "1" OperationObject
    Operation --> PatchOperation

    class OperationObject{
        + datatype: xsd:anyURI
        + value: xsd:string   
    }

    class ServerInformation{
        + hasDataOwner: Organization        
        + providesNotificationsEndpoint: xsd:boolean = TRUE
        + serverEndpoint: xsd:anyURI        
        + supportedApiVersion[]: xsd:string [1..*]
        + supportedContentType[]: xsd:string [1..*]        
        + supportedEncoding[]: xsd:string [*]
        + supportedLanguage[]: xsd:string [1..*]
        + supportedLogisticsObjectType[]: xsd:anyURI [1..*]
        + supportedOntology[]: xsd:anyURI [1..*]
    }    
    ServerInformation "1" --> "1" Organization

    class Subscription{        
        + contentType[]: xsd:string [*]
        + description: xsd:string [0..1]
        + expiresAt: xsd:dateTime [0..1]                                
        + hasSubscriber: Organization        
        + hasTopicType: TopicType        
        + sendLogisticsObjectBody: xsd:boolean = FALSE        
        + subscribeToLogisticsEvents: xsd:boolean = FALSE
        + topic: xsd:anyURI        
    }    
    Subscription "1" --> "1" Organization: hasSubscriber
    Subscription --> TopicType

    class NotificationEventType{
        <<Enumeration>>
        LOGISTICS_OBJECT_CREATED
        LOGISTICS_OBJECT_UPDATED

        LOGISTICS_EVENT_RECEIVED

        CHANGE_REQUEST_PENDING
        CHANGE_REQUEST_ACCEPTED                
        CHANGE_REQUEST_REJECTED
        CHANGE_REQUEST_FAILED        
        CHANGE_REQUEST_REVOKED
        

        ACCESS_DELEGATION_REQUEST_PENDING
        ACCESS_DELEGATION_REQUEST_ACCEPTED                
        ACCESS_DELEGATION_REQUEST_REJECTED
        ACCESS_DELEGATION_REQUEST_FAILED
        ACCESS_DELEGATION_REQUEST_REVOKED

        SUBSCRIPTION_REQUEST_PENDING
        SUBSCRIPTION_REQUEST_ACCEPTED                
        SUBSCRIPTION_REQUEST_REJECTED
        SUBSCRIPTION_REQUEST_FAILED
        SUBSCRIPTION_REQUEST_REVOKED
    }
    class PatchOperation{
        <<Enumeration>>
        ADD
        DEL
    }
    class Permission{
        <<Enumeration>>
        GET_LOGISTICS_OBJECT
        PATCH_LOGISTICS_OBJECT
        POST_LOGISTICS_EVENT
    }
    class TopicType{
        <<Enumeration>>
        LOGISTICS_OBJECT_TYPE
        LOGISTICS_OBJECT_URI
    }
    class RequestStatus{
        <<Enumeration>>
        REQUEST_PENDING
        REQUEST_ACCEPTED
        REQUEST_REJECTED
        REQUEST_FAILED
        REQUEST_REVOKED        
    }
```