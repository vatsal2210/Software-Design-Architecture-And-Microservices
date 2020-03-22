package com.example.yp_skiresort;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableEurekaClient
@EnableSwagger2
@MapperScan("com.example.yp_skiresort.Dao")
public class YpSkiresortApplication {

    public static void main(String[] args) {
        SpringApplication.run(YpSkiresortApplication.class, args);
    }

}
