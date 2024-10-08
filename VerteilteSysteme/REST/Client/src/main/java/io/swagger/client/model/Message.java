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

package io.swagger.client.model;

import java.util.Objects;
import java.util.Arrays;
import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.IOException;
/**
 * Message
 */

@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.JavaClientCodegen", date = "2024-04-26T23:20:45.095520767Z[GMT]")

public class Message {
  @SerializedName("message_id")
  private String messageId = null;

  @SerializedName("text")
  private String text = null;

  @SerializedName("sent_at")
  private String sentAt = null;

  @SerializedName("creator_id")
  private Integer creatorId = null;

  @SerializedName("receiver_id")
  private Integer receiverId = null;

  @SerializedName("folder_id")
  private Integer folderId = null;

  public Message messageId(String messageId) {
    this.messageId = messageId;
    return this;
  }

   /**
   * Get messageId
   * @return messageId
  **/
  @Schema(example = "5", description = "")
  public String getMessageId() {
    return messageId;
  }

  public void setMessageId(String messageId) {
    this.messageId = messageId;
  }

  public Message text(String text) {
    this.text = text;
    return this;
  }

   /**
   * Get text
   * @return text
  **/
  @Schema(example = "Hey, Mark!", required = true, description = "")
  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public Message sentAt(String sentAt) {
    this.sentAt = sentAt;
    return this;
  }

   /**
   * Get sentAt
   * @return sentAt
  **/
  @Schema(description = "")
  public String getSentAt() {
    return sentAt;
  }

  public void setSentAt(String sentAt) {
    this.sentAt = sentAt;
  }

  public Message creatorId(Integer creatorId) {
    this.creatorId = creatorId;
    return this;
  }

   /**
   * Get creatorId
   * @return creatorId
  **/
  @Schema(required = true, description = "")
  public Integer getCreatorId() {
    return creatorId;
  }

  public void setCreatorId(Integer creatorId) {
    this.creatorId = creatorId;
  }

  public Message receiverId(Integer receiverId) {
    this.receiverId = receiverId;
    return this;
  }

   /**
   * Get receiverId
   * @return receiverId
  **/
  @Schema(required = true, description = "")
  public Integer getReceiverId() {
    return receiverId;
  }

  public void setReceiverId(Integer receiverId) {
    this.receiverId = receiverId;
  }

  public Message folderId(Integer folderId) {
    this.folderId = folderId;
    return this;
  }

   /**
   * Get folderId
   * @return folderId
  **/
  @Schema(required = true, description = "")
  public Integer getFolderId() {
    return folderId;
  }

  public void setFolderId(Integer folderId) {
    this.folderId = folderId;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Message message = (Message) o;
    return Objects.equals(this.messageId, message.messageId) &&
        Objects.equals(this.text, message.text) &&
        Objects.equals(this.sentAt, message.sentAt) &&
        Objects.equals(this.creatorId, message.creatorId) &&
        Objects.equals(this.receiverId, message.receiverId) &&
        Objects.equals(this.folderId, message.folderId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(messageId, text, sentAt, creatorId, receiverId, folderId);
  }


  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Message {\n");
    
    sb.append("    messageId: ").append(toIndentedString(messageId)).append("\n");
    sb.append("    text: ").append(toIndentedString(text)).append("\n");
    sb.append("    sentAt: ").append(toIndentedString(sentAt)).append("\n");
    sb.append("    creatorId: ").append(toIndentedString(creatorId)).append("\n");
    sb.append("    receiverId: ").append(toIndentedString(receiverId)).append("\n");
    sb.append("    folderId: ").append(toIndentedString(folderId)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }

}
