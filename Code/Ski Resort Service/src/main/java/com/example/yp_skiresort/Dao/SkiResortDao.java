package com.example.yp_skiresort.Dao;

import java.util.*;
import com.example.yp_skiresort.Entity.SkiResort;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface SkiResortDao {
    public abstract List<SkiResort> getSkiResortListByCountry(String country);
    public abstract List<SkiResort> getResortListByPriceRange(@Param("max") int max, @Param("min") int min);
    public abstract List<SkiResort> getResortListBySlopeRating(@Param("rating") float rating);
    public abstract List<SkiResort> getResortListByPartialName(@Param("name") String resortName);
    public abstract List<SkiResort> getResortListByMultipleConditions(@Param("name") String resortName, @Param("max") int max, @Param("min") int min, @Param("rating") float rating, @Param("country") String country);
}
