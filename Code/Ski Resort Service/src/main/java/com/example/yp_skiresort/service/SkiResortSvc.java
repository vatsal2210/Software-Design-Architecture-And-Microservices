package com.example.yp_skiresort.service;

import com.example.yp_skiresort.Entity.SkiResort;

import java.util.List;

public interface SkiResortSvc {
    public abstract List<SkiResort> getSkiResortListByCountry(String country);
    public abstract List<SkiResort> getResortListByPriceRange(int max, int min);
    public abstract List<SkiResort> getResortListBySlopeRating(float rating);
    public abstract List<SkiResort> getResortListByPartialName(String resortName);
    public abstract List<SkiResort> getResortListByMultipleConditions(String resortName, int max, int min, float rating, String country);
}
