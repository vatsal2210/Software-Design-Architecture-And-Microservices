package com.example.yp_skiresort.service.impl;

import com.example.yp_skiresort.Dao.SkiResortDao;
import com.example.yp_skiresort.Entity.SkiResort;
import com.example.yp_skiresort.service.SkiResortSvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkiResortSvcImpl implements SkiResortSvc {
    @Autowired
    SkiResortDao resortDao;
    public List<SkiResort> getSkiResortListByCountry(String country)
    {
        List<SkiResort> resorts = resortDao.getSkiResortListByCountry(country);
        return resorts;
    }
    public List<SkiResort> getResortListByPriceRange(int max, int min)
    {
        List<SkiResort> resorts = resortDao.getResortListByPriceRange(max,min);
        return resorts;
    }
    public List<SkiResort> getResortListBySlopeRating(float rating){
        List<SkiResort> resorts = resortDao.getResortListBySlopeRating(rating);
        return resorts;
    }
    public List<SkiResort> getResortListByPartialName(String resortName){
        List<SkiResort> resorts = resortDao.getResortListByPartialName(resortName);
        return resorts;
    }
    public List<SkiResort> getResortListByMultipleConditions(String resortName, int max, int min, float rating, String country){
        List<SkiResort> resorts = resortDao.getResortListByMultipleConditions(resortName,max,min,rating,country);
        return resorts;
    }
}
