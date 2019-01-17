package com.zhxu.model.message;

import lombok.Data;

import java.util.List;

@Data
public class Message {
    private Area area;
    private String title;
    private String content;
    private List<File> files;
    private String template;
    private Channel channel;
    private List<Group> groups;
}