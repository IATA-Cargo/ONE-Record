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
        + permissions[]: Permission [1..*]                
        + requestedFor[]: Organization [1..*]
        + targetLogisticsObjects[]: LogisticsObject [1..*]        
    }

    AccessDelegation --> Permission   
    AccessDelegation "1" --> "1..*" Organization: requestedFor
    AccessDelegation "1" --> "1..*" LogisticsObject

     class ActionRequest {
        <<Abstract>> 
        + description: xsd:string [0..1]
        + errors[]: Error [*]
        + requestedAt: xsd:dateTime         
        + requestedBy: Organization    
        + requestStatus: RequestStatus = PENDING
        + revokedAt: xsd:dateTime         
        + revokedBy: Organization 
    }
    ActionRequest <|-- AccessDelegationRequest
    ActionRequest <|-- ChangeRequest
    ActionRequest <|-- SubscriptionRequest

    ActionRequest "1" --> "0..*" Error     
    ActionRequest "1" --> "1..*" Organization : requestedBy    
    ActionRequest --> RequestStatus                
    ActionRequest "1" --> "1..*" Organization : revokedBy

    class AccessDelegationRequest{
        + accessDelegations: AccessDelegation
        + targetLogisticsObjects[]: LogisticsObject [1..*]
    }
    AccessDelegationRequest "1" --> "1" AccessDelegation
    AccessDelegationRequest "1" --> "1..*" LogisticsObject

    class ChangeRequest{
        + affectedLogisticsObject: LogisticsObject                                
        + submittedChange: Change        
    }
    ChangeRequest "1" --> "1" LogisticsObject
    ChangeRequest "1" --> "1" Change
    
    ChangeRequest "1" --> "*" Organization    
    ChangeRequest --> RequestStatus    
    ChangeRequest "1" --> "*" Error

    class SubscriptionRequest{
        + submittedSubscription: Subscription
    }   
    SubscriptionRequest "1" --> "1" Subscription
       
    class AuditTrail{                
        + affectedLogisticsObject: LogisticsObject
        + latestRevision: xsd:nonNegativeInteger                
        + recordedChangeRequests[]: ChangeRequest [*]        
    }

    AuditTrail "1" --> "1" LogisticsObject
    AuditTrail "1" --> "*" ChangeRequest

    class Change{
        + affectedLogisticsObject: LogisticsObject
        + operations[]: Operation [1..*]        
        + revision: xsd:nonNegativeInteger        
    }
    Change "1" --> "1" LogisticsObject
    Change "1" --> "1..*" Operation
    
    class Error{        
        + errorDetails[]: ErrorDetails [1..*]
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
        + affectedLogisticsObject: LogisticsObject [0..1]        
        + changedProperties[]: xsd:anyURI [*]
        + eventType: NotificationEventType
        + topic: xsd:anyURI
        + triggeringActionRequest: ActionRequest [0..1]  
    }
    Notification "1"--> "0..1" LogisticsObject
    Notification --> NotificationEventType
    Notification --> ActionRequest    

    class Operation{
        + o: OperationObject|string
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
        + notificationsEndpoint: xsd:anyURI
        + serverEndpoint: xsd:anyURI
        + supportedContentTypes[]: xsd:string [1..*]
        + supportedAPIVersions[]: xsd:string [1..*]
        + supportedEncodings[]: xsd:string [*]
        + supportedLanguages[]: xsd:string [1..*]
        + supportedLogisticsObjectTypes[]: xsd:anyURI [1..*]
    }    
    ServerInformation "1" --> "1" Organization

    class Subscription{        
        + contentTypes[]: xsd:string [*]
        + expiresAt: xsd:dateTime [0..1]                                
        + sendLogisticsObjectBody: xsd:boolean = FALSE
        + subscriber: Organization        
        + subscribeToLogisticsEvents: xsd:boolean = FALSE
        + topicType: TopicType
        + topic: xsd:anyURI
    }    
    Subscription "1" --> "1" Organization
    Subscription --> TopicType

    class RequestStatus{
        <<Enumeration>>
        PENDING
        ACCEPTED
        REJECTED
        REVOKED
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
        CHANGE_REQUEST_REVOKED
        

        DELEGATION_REQUEST_PENDING
        DELEGATION_REQUEST_ACCEPTED                
        DELEGATION_REQUEST_REJECTED
        DELEGATION_REQUEST_FAILED
        DELEGATION_REQUEST_REVOKED

        SUBSCRIPTION_REQUEST_PENDING
        SUBSCRIPTION_REQUEST_ACCEPTED                
        SUBSCRIPTION_REQUEST_REJECTED
        SUBSCRIPTION_REQUEST_FAILED
        SUBSCRIPTION_REQUEST_REVOKED
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
        ADD_LOGISTICS_EVENT
    }
    class TopicType{
        <<Enumeration>>
        LOGISTICS_OBJECT_TYPE
        LOGISTICS_OBJECT_URI
    }
```