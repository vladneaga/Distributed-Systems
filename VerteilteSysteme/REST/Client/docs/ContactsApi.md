# ContactsApi

All URIs are relative to *http://localhost:8080/api/v1/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createMessage**](ContactsApi.md#createMessage) | **PUT** /messages | Method of creating a message

<a name="createMessage"></a>
# **createMessage**
> Message createMessage(body)

Method of creating a message

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContactsApi;


ContactsApi apiInstance = new ContactsApi();
Message body = new Message(); // Message | Add a message
try {
    Message result = apiInstance.createMessage(body);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContactsApi#createMessage");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Message**](Message.md)| Add a message |

### Return type

[**Message**](Message.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

