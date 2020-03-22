package com.example.yp_skiresort.Dao;

import com.example.yp_skiresort.Entity.TUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
public interface ITUserDao {

    @Select("select * from user")
    List<TUser> getUserList();

}
