package com.example.yp_skiresort.Controller;

import com.example.yp_skiresort.Entity.RequestQuery;
import com.example.yp_skiresort.Entity.ResponseMessage;
import com.example.yp_skiresort.Entity.SkiResort;
import com.example.yp_skiresort.service.impl.SkiResortSvcImpl;
import com.netflix.discovery.converters.Auto;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/resort")
public class SkiResortController {
    @Autowired
    SkiResortSvcImpl svc;

    @ApiOperation(value="test123", notes="test")
    @CrossOrigin(origins={"*"})
    @RequestMapping(value="/test",method=RequestMethod.GET)
    @ResponseBody
    public ResponseMessage<List<SkiResort>> test(@RequestParam("country") String country, @RequestParam("max") int max, @RequestParam("min") int min, @RequestParam(value="name",required=false) String name){
        //svc.getResortListByPartialName("aarjaeng");
        //svc.getResortListByPriceRange(100,0);
        //svc.getResortListBySlopeRating(Float.parseFloat("2.0"));
        ;
        ResponseMessage message = new ResponseMessage();
        message.setResponseBody(svc.getResortListByMultipleConditions(name,max, min,2,country));
        message.setHttpCode("200");
        return message;
    }

    @CrossOrigin(origins={"*"})
    @ApiOperation(value="search", notes="search skiresort information ")
    @RequestMapping(value = "/search", method = RequestMethod.POST)
    @ResponseBody
    public List<SkiResort> processQuery(@RequestBody RequestQuery inputQuery){
        String query = inputQuery.getQuery();
        List<SkiResort> resorts = new ArrayList<SkiResort>();
        String[] subqueries = query.split("&");
        String country = "";
        int max = -1;
        int min = -1;
        String resortName = "";
        float rating = 0;
        for(String subquery:subqueries){
            String[] queryParts = subquery.split("=");
            if( queryParts.length > 1 ) {
                switch (queryParts[0]) {
                    case "country":
                        if (!queryParts[1].equals("")) {
                            country = queryParts[1];
                        }
                        break;
                    case "price":
                        if (!queryParts[1].equals("")) {
                            String[] range_end = queryParts[1].split("-");
                            max = Integer.parseInt(range_end[1]);
                            min = Integer.parseInt(range_end[0]);
                        }
                        break;
                    case "resortname":
                        if (!queryParts[1].equals("")) {
                            resortName = queryParts[1];
                        }
                        break;
                    case "sloperating":
                        if (!queryParts[1].equals("")) {
                            rating = Float.parseFloat(queryParts[1]);
                        }
                        break;
                }
            }
            resorts = svc.getResortListByMultipleConditions(resortName,max,min,rating,country);
        }


        ResponseMessage<List<SkiResort>> message = new ResponseMessage<List<SkiResort>>();
        message.setResponseBody(resorts);
        return resorts;
    }
}
