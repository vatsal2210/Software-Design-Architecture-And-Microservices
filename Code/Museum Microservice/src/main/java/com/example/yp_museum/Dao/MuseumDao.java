package com.example.yp_museum.Dao;

import com.example.yp_museum.Entity.Museum;
import java.util.*;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface MuseumDao {
    public abstract List<Museum> getMuseumListByState(@Param("state") String state);
    public abstract List<Museum> getMuseumListByAddress(@Param("address") String address);
    public abstract List<Museum> getMuseumListByCity(@Param("city") String city);
    public abstract List<Museum> getMuseumListByName(@Param("name") String museumName);
    public abstract List<Museum> getMuseumListByMultipleConditions(@Param("state") String state, @Param("address") String address, @Param("city") String city, @Param("name") String museumName);
}
