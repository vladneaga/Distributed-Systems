/*
 * Email API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

package io.swagger.client.api;

import io.swagger.client.model.Error;
import io.swagger.client.model.Messages;
import org.junit.Test;
import org.junit.Ignore;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * API tests for MessagesApi
 */
@Ignore
public class MessagesApiTest {

    private final MessagesApi api = new MessagesApi();

    /**
     * Mehod of receiving the list of messages of a folder
     *
     * 
     *
     * @throws Exception
     *          if the Api call fails
     */
    @Test
    public void getMessagesByFolderIdTest() throws Exception {
        String folderId = null;
        Messages response = api.getMessagesByFolderId(folderId);

        // TODO: test validations
    }
}
