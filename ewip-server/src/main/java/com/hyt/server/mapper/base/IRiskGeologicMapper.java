package com.hyt.server.mapper.base;

import com.hyt.server.config.common.universal.IBaseMapper;
import com.hyt.server.entity.base.RiskGeologic;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @Author: lxm
 * @Description:
 * @Date: Created in 15:30 2018-11-2
 * @Modified By:
 */
@Repository("riskGeologicMapper")
public interface IRiskGeologicMapper extends IBaseMapper<RiskGeologic> {
    /**
     * 分页查询地质灾害隐患点信息
     * @param map
     * @return
     */
    List<RiskGeologic> findAll(Map<String, Object> map);
}