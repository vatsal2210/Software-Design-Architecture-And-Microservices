package com.example.yp_museum.service.impl;

import com.example.yp_museum.Dao.MuseumDao;
import com.example.yp_museum.Entity.Museum;
import com.example.yp_museum.service.MuseumSvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MuseumSvcImpl implements MuseumSvc {
    @Autowired
    MuseumDao museumDao;
    public List<Museum> getMuseumListByState(String state)
    {
        List<Museum> museums = museumDao.getMuseumListByState( state);
        return museums;
    }
    public List<Museum> getMuseumListByAddress(String address)
    {
        List<Museum> museums = museumDao.getMuseumListByAddress(address);
        return museums;
    }
    public List<Museum> getMuseumListByCity(String city){
        List<Museum> museums = museumDao.getMuseumListByCity(city);
        return museums;
    }
    public List<Museum> getMuseumListByName(String museumName){
        List<Museum> museums = museumDao.getMuseumListByName(museumName);
        return museums;
    }
    public List<Museum> getMuseumListByMultipleConditions(String state, String address, String city, String museumName){
        List<Museum> museums = museumDao.getMuseumListByMultipleConditions(state, address, city, museumName);
        return museums;
    }
}
