# MessagesApi

All URIs are relative to *http://localhost:8080/api/v1/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getMessagesByFolderId**](MessagesApi.md#getMessagesByFolderId) | **GET** /messages/{folder_id} | Mehod of receiving the list of messages of a folder

<a name="getMessagesByFolderId"></a>
# **getMessagesByFolderId**
> Messages getMessagesByFolderId(folderId)

Mehod of receiving the list of messages of a folder

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.MessagesApi;


MessagesApi apiInstance = new MessagesApi();
String folderId = "folderId_example"; // String | Folder Identificator
try {
    Messages result = apiInstance.getMessagesByFolderId(folderId);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling MessagesApi#getMessagesByFolderId");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **folderId** | **String**| Folder Identificator |

### Return type

[**Messages**](Messages.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

