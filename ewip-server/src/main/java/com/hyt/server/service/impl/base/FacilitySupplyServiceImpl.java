package com.hyt.server.service.impl.base;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hyt.server.config.common.page.MybatisPage;
import com.hyt.server.config.common.universal.AbstractService;
import com.hyt.server.entity.base.FacilitySupply;
import com.hyt.server.mapper.base.IFacilitySupplyMapper;
import com.hyt.server.service.base.IFacilitySupplyService;
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
@Service("facilitySupplyService")
public  class FacilitySupplyServiceImpl extends AbstractService<FacilitySupply> implements IFacilitySupplyService {

    @Autowired
    private IFacilitySupplyMapper facilitySupplyMapper;

    @Override
    public PageInfo<FacilitySupply> selectAll(Map<String, Object> map) {
        MybatisPage.getPageSize(map);
        PageHelper.startPage(MybatisPage.page, MybatisPage.limit);
        List<FacilitySupply> areaList = this.facilitySupplyMapper.findAll(map);
        return new PageInfo<>(areaList);
    }

    @Override
    public List<FacilitySupply> selectList(Map<String, Object> map){
        return this.facilitySupplyMapper.findAll(map);
    }
}
