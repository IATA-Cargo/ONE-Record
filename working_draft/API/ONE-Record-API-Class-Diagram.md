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
        + hasDescription: xsd:string [0..1]
        + hasPermission[]: Permission [1..*]                
        + isRequestedFor[]: Organization [1..*]
        + notifyRequestStatusChange: xsd:boolean = FALSE
        + hasLogisticsObject[]: LogisticsObject [1..*]        
    }

    AccessDelegation "1" --> "1..*" Permission   
    AccessDelegation "1" --> "1..*" Organization: requestedFor
    AccessDelegation "1" --> "1..*" LogisticsObject

    class ActionRequest {
        <<Abstract>>         
        + hasError[]: Error [*]
        + isRequestedAt: xsd:dateTime         
        + isRequestedBy: Organization            
        + isRevokedBy: Organization [0..1]
        + hasRequestStatus: RequestStatus = REQUEST_PENDING
        + isRevokedAt: xsd:dateTime [0..1]                 
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
        + hasLatestRevision: xsd:positiveInteger       
    }
    AuditTrail "1" --> "*" ChangeRequest

    class Change{    
        + hasDescription: xsd:string [0..1]    
        + hasOperation[]: Operation [1..*]        
        + hasLogisticsObject: LogisticsObject
        + hasRevision: xsd:positiveInteger        
        + notifyRequestStatusChange: xsd:boolean = FALSE
    }
    Change "1" --> "1" LogisticsObject
    Change "1" --> "1..*" Operation
    
    class Collection{    
        + hasItem: Object [0..*]
     	+ hasTotalItems: xsd:nonNegativeInteger [0..1]    
    }

    class Error{        
        + hasErrorDetail[]: ErrorDetails [1..*]
        + hasTitle: xsd:string
    }
    Error "1" --> "*" ErrorDetails
    
    class ErrorDetails{
        + hasCode: xsd:string  [0..1]
        + hasMessage: xsd:string [0..1]
        + hasProperty: xsd:anyURI [0..1]
        + hasResource: xsd:anyURI [0..1]
    }
    
    class Notification{
        + hasChangedProperty[]: xsd:anyURI [*]        
        + hasEventType: NotificationEventType
        + isTriggeredBy: ActionRequest [0..1]  
        + hasLogisticsObject: LogisticsObject [0..1]
        + hasLogisticsObjectType: xsd:anyURI [0..1]            
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
        + hasDatatype: xsd:anyURI
        + hasValue: xsd:string   
    }

    class ServerInformation{
        + hasDataHolder: Organization                
        + hasServerEndpoint: xsd:anyURI        
        + hasSupportedApiVersion[]: xsd:string [1..*]
        + hasSupportedContentType[]: xsd:string [1..*]        
        + hasSupportedEncoding[]: xsd:string [*]
        + hasSupportedLanguage[]: xsd:string [1..*]
        + hasSupportedOntology[]: xsd:anyURI [1..*]
        + hasSupportedOntologyVersion[]: xsd:anyURI [1..*]
    }    
    ServerInformation "1" --> "1" Organization

    class Subscription{        
        + hasContentType[]: xsd:string [*]
        + hasDescription: xsd:string [0..1]
        + expiresAt: xsd:dateTime [0..1]                                
        + hasSubscriber: Organization        
        + hasTopicType: TopicType  
        + notifyRequestStatusChange: xsd:boolean = FALSE      
        + sendLogisticsObjectBody: xsd:boolean = FALSE        
        + includeSubscriptionEventType[]: SubscriptionEventType [1..*]
        + hasTopic: xsd:anyURI        
    }    
    Subscription "1" --> "1" Organization: hasSubscriber
    Subscription --> TopicType
    Subscription "1" --> "1..*" SubscriptionEventType

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
        DELETE
    }
    class Permission{
        <<Enumeration>>                
        GET_LOGISTICS_EVENT
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
    class SubscriptionEventType{
        <<Enumeration>>
        LOGISTICS_OBJECT_CREATED
        LOGISTICS_OBJECT_UPDATED

        LOGISTICS_EVENT_RECEIVED
    }
```