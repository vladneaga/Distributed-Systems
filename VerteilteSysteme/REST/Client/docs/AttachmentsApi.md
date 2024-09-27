# AttachmentsApi

All URIs are relative to *http://localhost:8080/api/v1/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addAttachmentToMessage**](AttachmentsApi.md#addAttachmentToMessage) | **PUT** /attachment | Mehod of adding an attachment to a message

<a name="addAttachmentToMessage"></a>
# **addAttachmentToMessage**
> Attachment addAttachmentToMessage(body)

Mehod of adding an attachment to a message

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.AttachmentsApi;


AttachmentsApi apiInstance = new AttachmentsApi();
Attachment body = new Attachment(); // Attachment | Add an attachment to a message
try {
    Attachment result = apiInstance.addAttachmentToMessage(body);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling AttachmentsApi#addAttachmentToMessage");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Attachment**](Attachment.md)| Add an attachment to a message |

### Return type

[**Attachment**](Attachment.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

