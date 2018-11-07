package com.hyt.server.service.impl.base;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hyt.server.config.common.page.MybatisPage;
import com.hyt.server.config.common.universal.AbstractService;
import com.hyt.server.entity.base.RiskForest;
import com.hyt.server.mapper.base.IRiskForestMapper;
import com.hyt.server.service.base.IRiskForestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @Author: lxm
 * @Description:
 * @Date: Created in 15:29 2018-11-2
 * @Modified By:
 */
@Service("riskForestService")
public  class RiskForestServiceImpl extends AbstractService<RiskForest> implements IRiskForestService {

    @Autowired
    private IRiskForestMapper riskForestMapper;

    @Override
    public PageInfo<RiskForest> selectAll(Map<String, Object> map) {
        MybatisPage.getPageSize(map);
        PageHelper.startPage(MybatisPage.page, MybatisPage.limit);
        List<RiskForest> areaList = this.riskForestMapper.findAll(map);
        return new PageInfo<>(areaList);
    }

    @Override
    public List<RiskForest> selectList(Map<String, Object> map){
        return this.riskForestMapper.findAll(map);
    }
}
