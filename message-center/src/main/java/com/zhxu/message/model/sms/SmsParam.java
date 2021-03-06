package com.zhxu.message.model.sms;

import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Builder
@Data
public class SmsParam {
    private String url;
    private String sign;
    private String organizationName;
    private String authorizeUrl;
    private String authorizeName;
    private String authorizePassword;
    private String content;
    private Set<String> mobiles;

}
