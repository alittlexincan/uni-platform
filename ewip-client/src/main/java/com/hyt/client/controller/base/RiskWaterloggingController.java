package com.hyt.client.controller.base;

import com.alibaba.fastjson.JSONObject;
import com.hyt.client.service.base.IRiskWaterloggingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("riskWaterlogging")
public class RiskWaterloggingController {

        @Autowired
        private IRiskWaterloggingService riskWaterloggingService;

        /**
         * 根据内涝隐患点ID删除内涝隐患点信息
         * @param id
         * @return
         */
        @DeleteMapping("/delete/{id}")
        public JSONObject deleteById(@PathVariable(value = "id") String id){
            return this.riskWaterloggingService.deleteById(id);
        }

        /**
         * 批量删除内涝隐患点信息
         * @param id
         * @return
         */
        @PostMapping("/delete")
        public JSONObject deleteBatch(@RequestParam(value = "id") String id){
            return this.riskWaterloggingService.deleteBatch(id);
        }

        /**
         * 分页查询内涝隐患点信息
         * @param map
         * @return
         */
        @GetMapping("/select")
        public JSONObject selectAll(@RequestParam Map<String,Object> map){
            return this.riskWaterloggingService.selectAll(map);
        }

}