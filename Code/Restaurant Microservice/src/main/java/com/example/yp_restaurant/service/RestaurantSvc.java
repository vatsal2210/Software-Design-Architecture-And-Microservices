package com.example.yp_restaurant.service;

import com.example.yp_restaurant.Entity.Restaurant;
import java.util.List;

public interface RestaurantSvc {
    public abstract List<Restaurant> getRestaurantListByState(String state);
    public abstract List<Restaurant> getRestaurantListByAddress(String address);
    public abstract List<Restaurant> getRestaurantListByCity(String city);
    public abstract List<Restaurant> getRestaurantListByName(String name);
    public abstract List<Restaurant> getRestaurantListByType(String type);
    public abstract List<Restaurant> getRestaurantListByMultipleConditions(String state, String address, String city, String name, String type);
}
