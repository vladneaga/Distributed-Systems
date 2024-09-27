package com.client.RESTClient.service;

import com.client.RESTClient.model.Attachment;
import com.client.RESTClient.model.Contact;
import com.client.RESTClient.model.Folder;
import com.client.RESTClient.model.Message;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MyService {

    List<Folder> folderList = new ArrayList<>();
    List<Message> messageList = new ArrayList<>();
    List<Attachment> attachmentList = new ArrayList<>();
    List<Contact> contactList = new ArrayList<>();
public List<Folder> getFolders() {
    return this.folderList;
}
public List<Message> showMessages(int folderId) {
    return this.messageList.stream().filter( message -> message.getFolderId() == folderId).toList();
}
public Message sendMessage(Message message)  {
     this.messageList.add(message);
     return message;
}
public Attachment addAttachment(Attachment attachment) {
    this.attachmentList.add(attachment);
    return attachment;
}

}
