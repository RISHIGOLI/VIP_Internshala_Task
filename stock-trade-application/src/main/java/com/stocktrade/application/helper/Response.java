package com.stocktrade.application.helper;

import org.springframework.data.annotation.Transient;

import java.util.List;

public class Response<T> {

    private Boolean status;
    private Integer statusCode;
    private String message;
    private long thoughtsLeft;
    private String contentId;

    public String getContentId() {
        return contentId;
    }

    public void setContentId(String contentId) {
        this.contentId = contentId;
    }

    public long getThoughtsLeft() {
        return thoughtsLeft;
    }

    public void setThoughtsLeft(long thoughtsLeft) {
        this.thoughtsLeft = thoughtsLeft;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    private String body;

    public String getHeading() {
        return heading;
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    private String heading;
    private long totalCount;
    private Integer currentPage;
    private Integer totalPages;
    private Long totalItems;
    private List<T> data;
    public Response() {

    }

    public Response(Boolean status, Integer statusCode, String message, long totalCount, Integer currentPage, Integer totalPages, Long totalItems, List<T> data) {
        this.status = status;
        this.statusCode = statusCode;
        this.message = message;
        this.totalCount = totalCount;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalItems = totalItems;
        this.data = data;
    }

    public Integer getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }

    public Integer getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
    }

    public Long getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(Long totalItems) {
        this.totalItems = totalItems;
    }

    public Response(String message) {
        this.setMessage(message);
    }

    public Response(Boolean status, Integer statusCode, String message, List<T> data) {
        this.setStatus(status);
        this.setStatusCode(statusCode);
        this.setMessage(message);
        this.setData(data);
    }
    public Response(Boolean status, Integer statusCode, String heading,String message, List<T> data) {
        this.setStatus(status);
        this.setStatusCode(statusCode);
        this.setMessage(message);
        this.setData(data);
        this.heading = heading;
    }
    public Response(Boolean status, Integer statusCode, String heading,String message, List<T> data,String contentId) {
        this.setStatus(status);
        this.setStatusCode(statusCode);
        this.setMessage(message);
        this.setData(data);
        this.heading = heading;
        this.contentId = contentId;
    }

    public Response(Boolean status, int statusCode, String heading,String message, List<T> data,long thoughtsLeft) {
        this.setStatus(status);
        this.setStatusCode(statusCode);
        this.setMessage(message);
        this.setData(data);
        this.heading = heading;
        this.thoughtsLeft = thoughtsLeft;
    }

    public Response(Boolean status, Integer statusCode, String message, T data) {
        this.setStatus(status);
        this.setStatusCode(statusCode);
        this.setMessage(message);
        this.setSingleReturnedItem(data);
    }

    public Response(Boolean status, Integer statusCode, String message, List<T> data, Integer totalCount) {
        this.setStatus(status);
        this.setStatusCode(statusCode);
        this.setMessage(message);
        this.setData(data);
        this.setTotalCount(totalCount);
    }
    public Response(Boolean status, Integer statusCode, String message, List<T> data, Integer totalCount,long thoughtsLeft) {
        this.setStatus(status);
        this.setStatusCode(statusCode);
        this.setMessage(message);
        this.setData(data);
        this.setTotalCount(totalCount);
        this.setThoughtsLeft(thoughtsLeft);
    }
    public Response(Boolean status, Integer statusCode, String message,String body, List<T> data, Integer totalCount) {
        this.setStatus(status);
        this.setStatusCode(statusCode);
        this.setMessage(message);
        this.setData(data);
        this.setTotalCount(totalCount);
        this.setBody(body);
    }
    public long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(Integer totalCount) {
        this.totalCount = totalCount;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    @Transient
    private String logActionMsg;


    public String getLogActionMsg() {
        return logActionMsg;
    }

    public void setLogActionMsg(String logActionMsg) {
        this.logActionMsg = logActionMsg;
    }
    private T singleReturnedItem;

    public T getSingleReturnedItem() {
        return singleReturnedItem;
    }

    public void setSingleReturnedItem(T singleReturnedItem) {
        this.singleReturnedItem = singleReturnedItem;
    }

    public Response(Boolean status, Integer statusCode, String message)
    {
        this.setStatus(status);
        this.setStatusCode(statusCode);
        this.setMessage(message);
    }
}