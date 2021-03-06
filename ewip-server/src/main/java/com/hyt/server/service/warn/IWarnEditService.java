package com.hyt.server.service.warn;

import com.github.pagehelper.PageInfo;
import com.hyt.server.config.common.universal.IBaseService;
import com.hyt.server.entity.message.Message;
import com.hyt.server.entity.warn.WarnEdit;

import java.util.List;
import java.util.Map;

/**
 * @Author: JiangXincan
 * @Description: 预警编辑接口层
 * @Date: Created in 16:29 2018-4-18
 * @Modified By:
 */
public interface IWarnEditService extends IBaseService<WarnEdit> {

    PageInfo<WarnEdit> findAll(Map<String, Object> map);

    /**
     * 添加预警相关信息
     *  1：添加预警编辑基本信息
     *  2：添加预警编辑内容信息
     *  3：添加预警编辑群组信息
     *  4：添加预警编辑流程信息
     *  5：添加预警编辑上传文件信息
     * @param map
     * @return
     */
    WarnEdit insert(Map<String, Object> map);

    /**
     * 重发预警信息
     * 1：根据预警编辑ID删除与此相关的所有信息
     * 2：添加预警编辑基本信息
     * 3：添加预警编辑内容信息
     * 4：添加预警编辑群组信息
     * 5：添加预警编辑流程信息
     * 6：添加预警编辑上传文件信息
     * @param map
     * @return
     */
    WarnEdit resend(Map<String, Object> map);


    /**
     * 获取预警信息
     * @return
     */
    List<WarnEdit> selectWarnInfo(Map<String, Object> map);

    int stopWarn(Map<String,Object> map);
}