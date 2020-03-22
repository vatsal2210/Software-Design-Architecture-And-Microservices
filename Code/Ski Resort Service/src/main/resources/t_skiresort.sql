create table t_skiresort(
	resort_name varchar(100) not null,
	continent   varchar(100) not null,
	country     varchar(100) not null,
	province    varchar(100) not null,
	altitude    integer,
	beginner_slope_distance integer,
	intermediate_slope_distance integer,
	difficult_slope_distance integer,
	tbar  float default 1,
	circulating_ropeway float default 1,
	chair_lift float default 1,
	adult_ticket_price integer,
	youth_ticket_price integer,
	child_ticket_price integer,
	currency  varchar(100),
	slope_rating float default 0,
	snow_reliability varchar default 'N/A'
);