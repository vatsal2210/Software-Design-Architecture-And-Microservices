package com.example.yp_restaurant.Dao;

import com.example.yp_restaurant.Entity.Restaurant;
import java.util.*;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface RestaurantDao {
    public abstract List<Restaurant> getRestaurantListByState(@Param("state") String state);
    public abstract List<Restaurant> getRestaurantListByAddress(@Param("address") String address);
    public abstract List<Restaurant> getRestaurantListByCity(@Param("city") String city);
    public abstract List<Restaurant> getRestaurantListByName(@Param("name") String name);
    public abstract List<Restaurant> getRestaurantListByType(@Param("type") String type);
    public abstract List<Restaurant> getRestaurantListByMultipleConditions(@Param("state") String state, @Param("address") String address, @Param("city") String city, @Param("name") String name, @Param("type") String type);
}
