package com.example.yp_skiresort.service.impl;

import com.example.yp_skiresort.Dao.ITUserDao;
import com.example.yp_skiresort.Entity.TUser;
import com.example.yp_skiresort.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private ITUserDao userDao;

    @Override
    public List<TUser> getAllUser() {
        return userDao.getUserList();
    }

}
