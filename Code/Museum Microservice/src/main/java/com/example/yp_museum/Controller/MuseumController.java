package com.example.yp_museum.Controller;

import com.example.yp_museum.Entity.RequestQuery;
import com.example.yp_museum.Entity.ResponseMessage;
import com.example.yp_museum.Entity.Museum;
import com.example.yp_museum.service.impl.MuseumSvcImpl;
import com.netflix.discovery.converters.Auto;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import io.swagger.annotations.ApiOperation;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/museum")
public class MuseumController {
    @Autowired
    MuseumSvcImpl svc;

    @ApiOperation(value="test123", notes="test")
    @CrossOrigin(origins={"*"})
    @RequestMapping(value="/test",method=RequestMethod.GET)
    @ResponseBody
    public ResponseMessage<List<Museum>> test(@RequestParam("state") String state, @RequestParam(value="address", required = false, defaultValue = "") String address, @RequestParam(value="city", required = false, defaultValue = "") String city, @RequestParam(value="name", required = false, defaultValue = "") String museumName){
        ResponseMessage message = new ResponseMessage();
        message.setResponseBody(svc.getMuseumListByMultipleConditions(state, address, city, museumName));
        message.setHttpCode("200");
        return message;
    }

    @CrossOrigin(origins={"*"})
    @ApiOperation(value="search", notes="search museum information ")
    @RequestMapping(value = "/search", method = RequestMethod.POST)
    public List<Museum> processQuery(@RequestBody RequestQuery inputQuery){
        String query = inputQuery.getQuery();
        List<Museum> museums = new ArrayList<Museum>();
        String[] subqueries = query.split("&");
        String state = "";
        String address = "";
        String name = "";
        String city = "";
        for(String subquery:subqueries) {
            String[] queryParts = subquery.split("=");
            if( queryParts.length > 1 ) {
                switch (queryParts[0]) {
                    case "state":
                        if (!queryParts[1].equals("")) {
                            state = queryParts[1];
                        }
                        break;
                    case "address":
                        if (!queryParts[1].equals("")) {
                            address = queryParts[1];
                        }
                        break;
                    case "city":
                        if (!queryParts[1].equals("")) {
                            city = queryParts[1];
                        }
                        break;
                    case "name":
                        if (!queryParts[1].equals("")) {
                            name = queryParts[1];
                        }
                        break;
                }
            }
        }
        System.out.println("name:"+name+"city:"+city+"address:"+address+"state:"+state);
        museums = svc.getMuseumListByMultipleConditions(state,address,city,name);
        ResponseMessage<List<Museum>> message = new ResponseMessage<List<Museum>>();
        message.setResponseBody(museums);
        return museums;
    }
}
