package com.example.yp_restaurant.Controller;


import com.example.yp_restaurant.Entity.RequestQuery;
import com.example.yp_restaurant.Entity.ResponseMessage;
import com.example.yp_restaurant.Entity.Restaurant;
import com.example.yp_restaurant.service.impl.RestaurantSvcImpl;
import com.netflix.discovery.converters.Auto;
import io.swagger.annotations.ApiOperation;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import io.swagger.annotations.ApiImplicitParam;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/restaurant")
public class RestaurantController {
    @Autowired
    RestaurantSvcImpl svc;

    @ApiOperation(value="test123", notes="test")
    @CrossOrigin(origins={"*"})
    @RequestMapping(value="/test",method=RequestMethod.GET)
    @ResponseBody
    public ResponseMessage<List<Restaurant>> test(@RequestParam ("state") String state, @RequestParam("address") String address, @RequestParam("city") String city, @RequestParam("name") String name, @RequestParam("type") String type){
        ResponseMessage message = new ResponseMessage();
        message.setResponseBody(svc.getRestaurantListByMultipleConditions(state, address, city, name, type));
        message.setHttpCode("200");
        return message;
    }

    @CrossOrigin(origins={"*"})
    @ApiOperation(value="search", notes="search skiresort information ")
    @RequestMapping(value = "/search", method = RequestMethod.POST)
    @ResponseBody
    public List<Restaurant> processQuery(@RequestBody RequestQuery inputQuery){
        String query = inputQuery.getQuery();
        List<Restaurant> restaurant = new ArrayList<Restaurant>();
        String[] subqueries = query.split("&");
        System.out.println("query length:"+subqueries.length);
        String state = "";
        String address = "";
        String city = "";
        String name = "";
        String type = "";
        for(String subquery:subqueries){
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
                    case "type":
                        if (!queryParts[1].equals("")) {
                            type = queryParts[1];
                        }
                        break;
                }
            }
            System.out.println("state:"+state+" address:"+address+" name:"+name+" city:"+city+" type:"+type);
            restaurant = svc.getRestaurantListByMultipleConditions(state, address, city, name, type);
            System.out.println("result size:"+restaurant.size());

        }
        ResponseMessage<List<Restaurant>> message = new ResponseMessage<List<Restaurant>>();
        message.setResponseBody(restaurant);
        return restaurant;
    }
}
