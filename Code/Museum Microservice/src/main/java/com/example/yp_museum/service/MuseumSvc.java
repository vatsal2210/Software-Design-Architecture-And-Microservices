package com.example.yp_museum.service;

import com.example.yp_museum.Entity.Museum;

import java.util.List;

public interface MuseumSvc {
    public abstract List<Museum> getMuseumListByState(String state);
    public abstract List<Museum> getMuseumListByAddress(String address);
    public abstract List<Museum> getMuseumListByCity(String city);
    public abstract List<Museum> getMuseumListByName(String museumName);
    public abstract List<Museum> getMuseumListByMultipleConditions(String state, String address, String city, String museumName);
}
