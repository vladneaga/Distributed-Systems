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

import io.swagger.client.model.Attachment;
import io.swagger.client.model.Error;
import org.junit.Test;
import org.junit.Ignore;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * API tests for AttachmentsApi
 */
@Ignore
public class AttachmentsApiTest {

    private final AttachmentsApi api = new AttachmentsApi();

    /**
     * Mehod of adding an attachment to a message
     *
     * 
     *
     * @throws Exception
     *          if the Api call fails
     */
    @Test
    public void addAttachmentToMessageTest() throws Exception {
        Attachment body = null;
        Attachment response = api.addAttachmentToMessage(body);

        // TODO: test validations
    }
}
