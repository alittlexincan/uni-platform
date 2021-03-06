package com.zxyt.ocpp.client.entity.warn;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "warn_callback_main")
public class WarnCallbackMain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",length = 64)
    private String id;

    @Column(name = "warn_edit_id",length = 64)
    private String warnEditId;

    @Column(name = "channel_code",length = 50)
    private String channelCode;

    @Column(name = "total",length = 11)
    private Integer total;

    @Column(name = "success",length = 11)
    private Integer success;

    @Column(name = "fail",length = 11)
    private Integer fail;

    @Column(name = "work",length = 2000)
    private String work;

    @JSONField(format="yyyy-MM-dd HH:mm:ss")
    @Column(name = "create_time")
    private Date createTime;


}
