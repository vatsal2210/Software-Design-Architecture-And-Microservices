package com.example.yp_restaurant.service.impl;

import com.example.yp_restaurant.Dao.RestaurantDao;
import com.example.yp_restaurant.Entity.Restaurant;
import com.example.yp_restaurant.service.RestaurantSvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RestaurantSvcImpl implements RestaurantSvc{
    @Autowired
    RestaurantDao restaurantDao;
    public List<Restaurant> getRestaurantListByState(String state)
    {
        List<Restaurant> restaurants = restaurantDao.getRestaurantListByState( state);
        return restaurants;
    }
    public List<Restaurant> getRestaurantListByAddress(String address)
    {
        List<Restaurant> restaurants = restaurantDao.getRestaurantListByAddress(address);
        return restaurants;
    }
    public List<Restaurant> getRestaurantListByCity(String city){
        List<Restaurant> restaurants = restaurantDao.getRestaurantListByCity(city);
        return restaurants;
    }
    public List<Restaurant> getRestaurantListByName(String name){
        List<Restaurant> restaurants = restaurantDao.getRestaurantListByName(name);
        return restaurants;
    }
    public List<Restaurant> getRestaurantListByType(String type){
        List<Restaurant> restaurants = restaurantDao.getRestaurantListByType(type);
        return restaurants;
    }
    public List<Restaurant> getRestaurantListByMultipleConditions(String state, String address, String city, String name, String type){
        List<Restaurant> restaurants = restaurantDao.getRestaurantListByMultipleConditions(state, address, city, name, type);
        return restaurants;
    }
}
