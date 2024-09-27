package com.client.RESTClient.controller;

import com.client.RESTClient.api.AttachmentApi;
import com.client.RESTClient.api.FoldersApi;
import com.client.RESTClient.api.MessagesApi;

import com.client.RESTClient.model.Attachment;
import com.client.RESTClient.model.Error;
import com.client.RESTClient.model.Folders;
import com.client.RESTClient.model.Message;
import com.client.RESTClient.model.Messages;
import com.client.RESTClient.service.MyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class MyController implements AttachmentApi, MessagesApi, FoldersApi {
MyService myService;
@Autowired
    public MyController(MyService myService) {
        this.myService = myService;
    }



    @Operation(summary = "Get the list of all the folders", description = "", tags={ "Folders" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful respond with folders list", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Folders.class))),

            @ApiResponse(responseCode = "200", description = "Default Response", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Error.class))) })
    @RequestMapping(value = "/folders",
            produces = { "application/json" },
            method = RequestMethod.GET)
   public ResponseEntity<Folders> getAllFolders() {
    Folders folders = new Folders();
    folders.addAll(myService.getFolders());
        return new ResponseEntity<>(folders, HttpStatus.OK);
    }
    @Operation(summary = "Mehod of receiving the list of messages of a folder", description = "", tags={ "Messages" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful respond with messages list", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Messages.class))),

            @ApiResponse(responseCode = "200", description = "Default Response", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Error.class))) })
    @RequestMapping(value = "/messages/{folder_id}",
            produces = { "application/json" },
            method = RequestMethod.GET)
    public ResponseEntity<Messages> getMessagesByFolderId(@Parameter(in = ParameterIn.PATH, description = "Folder Identificator", required = true, schema = @Schema()) @PathVariable("folder_id") String folderId) {
    Messages messages = new Messages();
    messages.addAll(myService.showMessages(Integer.parseInt(folderId)));
        return new ResponseEntity<>(messages, HttpStatus.OK);


    }
    @Operation(summary = "Method of creating a message", description = "", tags={ "Contacts" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful respond with messages list", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Message.class))),

            @ApiResponse(responseCode = "200", description = "Default Response", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Error.class))) })
    @RequestMapping(value = "/messages",
            produces = { "application/json" },
            consumes = { "application/json" },
            method = RequestMethod.PUT)
    public ResponseEntity<Message> createMessage(@Parameter(in = ParameterIn.DEFAULT, description = "Add a message", required=true, schema=@Schema()) @Valid @RequestBody Message body) {
    myService.sendMessage(body);
     return new ResponseEntity<>(body, HttpStatus.OK);
    }
    @Override
    @Operation(summary = "Mehod of adding an attachment to a message", description = "", tags={ "Attachments" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully added an attachment to the message", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Attachment.class))),

            @ApiResponse(responseCode = "200", description = "Default Response", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Error.class))) })
    @RequestMapping(value = "/attachment",
            produces = { "application/json" },
            consumes = { "application/json" },
            method = RequestMethod.PUT)
    public ResponseEntity<Attachment> addAttachmentToMessage(@Parameter(in = ParameterIn.DEFAULT, description = "Add an attachment to a message", required = true, schema = @Schema()) @Valid @RequestBody Attachment body) {
    myService.addAttachment(body);
    return new ResponseEntity<>(body, HttpStatus.OK);
    }

}
