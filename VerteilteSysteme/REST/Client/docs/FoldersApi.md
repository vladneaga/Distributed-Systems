# FoldersApi

All URIs are relative to *http://localhost:8080/api/v1/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAllFolders**](FoldersApi.md#getAllFolders) | **GET** /folders | Get the list of all the folders

<a name="getAllFolders"></a>
# **getAllFolders**
> Folders getAllFolders()

Get the list of all the folders

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.FoldersApi;


FoldersApi apiInstance = new FoldersApi();
try {
    Folders result = apiInstance.getAllFolders();
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling FoldersApi#getAllFolders");
    e.printStackTrace();
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**Folders**](Folders.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

