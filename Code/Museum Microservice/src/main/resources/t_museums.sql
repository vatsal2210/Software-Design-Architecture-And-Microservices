create table t_museums(
    NAME_OF_INSTITUTION varchar(100) not null,
    ALTERNATIVE_NAME_OF_INSTITUTION varchar(100),
    PHONE bigint,
    WEB_URL varchar(120),
    MUSEUM_TYPE varchar(3) not null,
    ADDRESS varchar(100) not null,
    CITY varchar(100) not null,
    STATE varchar(2) not null,
    ZIP_CODE varchar(10) not null
);