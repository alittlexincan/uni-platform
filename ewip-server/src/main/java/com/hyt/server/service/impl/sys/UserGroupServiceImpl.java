package com.hyt.server.service.impl.sys;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hyt.server.config.common.page.MybatisPage;
import com.hyt.server.config.common.universal.AbstractService;
import com.hyt.server.entity.sys.Area;
import com.hyt.server.entity.sys.Channel;
import com.hyt.server.entity.sys.Organization;
import com.hyt.server.entity.sys.UserGroup;
import com.hyt.server.mapper.sys.IAreaMapper;
import com.hyt.server.mapper.sys.IChannelMapper;
import com.hyt.server.mapper.sys.IOrganizationMapper;
import com.hyt.server.mapper.sys.IUserGroupMapper;
import com.hyt.server.service.sys.IUserGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: JiangXincan
 * @Description:
 * @Date: Created in 16:29 2018-4-18
 * @Modified By:
 */
@Service("userGroupService")
public class UserGroupServiceImpl extends AbstractService<UserGroup> implements IUserGroupService {

    @Autowired
    private IUserGroupMapper userGroupMapper;

    @Autowired
    private IOrganizationMapper organizationMapper;

    @Autowired
    private IChannelMapper channelMapper;

    @Autowired
    private IAreaMapper areaMapper;

    @Override
    public PageInfo<UserGroup> selectAll(Map<String, Object> map) {
        MybatisPage.getPageSize(map);
        PageHelper.startPage(MybatisPage.page, MybatisPage.limit);
        List<UserGroup> areaList = this.userGroupMapper.findAll(map);
        return new PageInfo<>(areaList);
    }

    @Override
    public UserGroup selectById(String id){
        return this.userGroupMapper.selectById(id);
    }


    /**
     * 查询群组信息
     * @param map
     * @return
     */

    @Override
    public JSONObject selectGroup(Map<String, Object> map) {
        JSONObject json=new JSONObject();
        List<UserGroup> list=userGroupMapper.selectGroup(map);
        json.put("list",list);
        return json;
    }

    /**
     * 下载模板
     * @param map
     * @return
     */
    @Override
    public JSONObject downModel(Map<String, Object> map) {
        JSONObject jsonAll=new JSONObject();
        List<Area> area=areaMapper.areaList(map);
        JSONArray channelArry=new JSONArray();
        List<Channel> channelList=channelMapper.selectByParam(map);
        for(int c=0;c<channelList.size();c++){
            JSONObject channelJson=new JSONObject();
            channelJson.put("name",channelList.get(c).getName());
            channelArry.add(channelJson);
        }
        JSONArray provinceArry=new JSONArray();
        JSONArray cityArrys=new JSONArray();
        JSONArray countyArrys=new JSONArray();
        JSONArray countryArrys=new JSONArray();
        JSONArray cityArry=new JSONArray();
        JSONArray countyArry=new JSONArray();
        JSONArray countryArry=new JSONArray();
        for(int i=0;i<area.size();i++){
            String id=area.get(i).getId();
            String name=area.get(i).getAreaName();
            String pId=area.get(i).getpId();
            Integer level=area.get(i).getLevel();
            if(level==1){
                JSONObject json =new JSONObject();
                json.put("id",id);
                json.put("name",name);
                json.put("pid",pId);
                json.put("level",level);
                provinceArry.add(json);
            }else if(level==2){
                JSONObject json =new JSONObject();
                json.put("id",id);
                json.put("name",name);
                json.put("pid",pId);
                json.put("level",level);
                cityArrys.add(json);
            }else if(level==3){
                JSONObject json =new JSONObject();
                json.put("id",id);
                json.put("name",name);
                json.put("pid",pId);
                json.put("level",level);
                countyArrys.add(json);
            }else if(level==4){
                JSONObject json =new JSONObject();
                json.put("id",id);
                json.put("name",name);
                json.put("pid",pId);
                json.put("level",level);
                countryArrys.add(json);
            }
        }

        if(countyArrys.size()>0){
            for(int i=0;i<countyArrys.size();i++){
                JSONObject countyJson = countyArrys.getJSONObject(i);
                for(int j=0;j<countryArrys.size();j++){
                    JSONObject countryJson = countryArrys.getJSONObject(j);
                    if(countyJson.get("id").equals(countryJson.get("pid"))){
                        JSONObject json =new JSONObject();
                        json.put("id",countryJson.get("id"));
                        json.put("name",countryJson.get("name"));
                        json.put("pid",countryJson.get("pid"));
                        json.put("level",countryJson.get("level"));
                        countryArry.add(json);
                    }
                    countyJson.put("children",countryArry);
                }
            }
        }

        if(cityArrys.size()>0){
            for(int i=0;i<cityArrys.size();i++){
                JSONObject cityJson = cityArrys.getJSONObject(i);
                for(int j=0;j<countyArrys.size();j++){
                    JSONObject countyJson = countyArrys.getJSONObject(j);
                    if(cityJson.get("id").equals(countyJson.get("pid"))){
                        JSONObject json =new JSONObject();
                        json.put("id",countyJson.get("id"));
                        json.put("name",countyJson.get("name"));
                        json.put("pid",countyJson.get("pid"));
                        json.put("level",countyJson.get("level"));
                        json.put("children",countyJson.get("children"));
                        countyArry.add(json);
                    }
                    cityJson.put("children",countyArry);
                }
            }
        }
        if(provinceArry.size()>0) {
            for (int i = 0; i < provinceArry.size(); i++) {
                JSONObject provinceJson = provinceArry.getJSONObject(i);
                for (int j = 0; j < cityArrys.size(); j++) {
                    JSONObject cityJson = cityArrys.getJSONObject(j);
                    if (provinceJson.get("id").equals(cityJson.get("pid"))) {
                        JSONObject json = new JSONObject();
                        json.put("id",cityJson.get("id"));
                        json.put("name",cityJson.get("name"));
                        json.put("pid",cityJson.get("pid"));
                        json.put("level",cityJson.get("level"));
                        json.put("children",cityJson.get("children"));
                        cityArry.add(json);
                    }
                    provinceJson.put("children", cityArry);
                }
            }
        }
        jsonAll.put("data",provinceArry);
        jsonAll.put("cityArrys",cityArrys);
        jsonAll.put("countyArrys",countyArrys);
        jsonAll.put("countryArrys",countryArrys);
        jsonAll.put("channelArry",channelArry);
        return jsonAll;
    }

    @Override
    public JSONObject importData(Map<String, Object> map,List<Map<String,Object>> list ) {
        JSONObject json=new JSONObject();
        List<Area> areaList=areaMapper.areaList(map);
        List<Channel> channelList=channelMapper.selectByParam(map);
        List<UserGroup> list1=new ArrayList<>();
        List<UserGroup> listNew=new ArrayList<>();
        if(list.size()>0){
            String areName="";
            for(Map<String,Object> m:list){
                UserGroup userGroup = new UserGroup();
                String country= m.get("country").toString();
                String county= m.get("county").toString();
                String city= m.get("city").toString();
                String province= m.get("province").toString();
                String orgName= m.get("orgName").toString();
                String type= m.get("type").toString();
                String channel= m.get("channel").toString();
                String name= m.get("name").toString();
                Integer typeId=2;
                //类型转换
                if(type.equals("责任人群组")){
                    typeId=1;
                    name=name+"责任人群组";
                }else if(type.equals("基层防御群组")){
                    typeId=2;
                    name=name+"基层防御群组";
                }
                //判断地区
                if(country!=null && !"".equals(country)){
                    areName=country;
                }else{
                    if(county!=null && !"".equals(county)){
                        areName=county;
                    }else{
                        if(city!=null && !"".equals(city)){
                            areName=city;
                        }else{
                            areName=province;
                        }
                    }
                }
                userGroup.setAreaId(areName);
                userGroup.setChannelId(channel);
                userGroup.setOrganizationId(orgName);
                userGroup.setType(typeId);
                userGroup.setName(name);
                list1.add(userGroup);
            }

            //根据渠道名称对比换成渠道ID
            for(UserGroup userGroup: list1){
                for(Channel channel:channelList){
                    if(userGroup.getChannelId().equals(channel.getName())){
                        userGroup.setChannelId(channel.getId());
                    }
                }
            }

            //根据地区名称对比换成地区ID
            for(UserGroup userGroup: list1){
                for(Area area:areaList){
                    if(userGroup.getAreaId().equals(area.getAreaName())){
                        userGroup.setAreaId(area.getId());
                    }
                }
            }
            List<Organization> orgList=organizationMapper.selectOrg(map);
            for (UserGroup userGroup: list1){
                for(Organization organization:orgList){
                    if(userGroup.getAreaId().equals(organization.getAreaId()) &&
                        userGroup.getOrganizationId().equals(organization.getOrganizationName())){
                        userGroup.setOrganizationId(organization.getId());
                        listNew.add(userGroup);
                    }
                }
            }

            List<UserGroup> grouplist=userGroupMapper.selectGroup(map);
            List<UserGroup> groupEndlist=new ArrayList<>();
            for(UserGroup userGroup:grouplist){
                for(UserGroup group:listNew){
                    if(userGroup.getAreaId().equals(group.getAreaId())
                            && userGroup.getOrganizationId().equals(group.getOrganizationId())
                            && userGroup.getChannelId().equals(group.getChannelId())
                            && userGroup.getName().equals(group.getName())){
                        groupEndlist.add(group);
                    }
                }
            }
            listNew.removeAll(groupEndlist);
            System.out.println(listNew);
            if(listNew.size()>0){
                int a=this.userGroupMapper.importData(listNew);
                json.put("code","200");
                json.put("msg","导入成功！共导入数据"+listNew.size()+"条");
            }else {
                json.put("code","500");
                json.put("msg","导入失败！该文件数据已经导入");
            }
        }else{
            json.put("code","500");
            json.put("msg","导入失败请检查文件！");
        }
        return json;
    }


}
