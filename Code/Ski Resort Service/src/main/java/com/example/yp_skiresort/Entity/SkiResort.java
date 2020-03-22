package com.example.yp_skiresort.Entity;

public class SkiResort {
    private String resortName;
    private String continent;
    private String country;
    private String province;
    private int altitude;
    private int beginnerSlopeDistance;
    private int intermediateSlopeDistance;
    private int difficultSlopeDistance;
    private int adultTicketPrice;
    private int youthTicketPrice;
    private int childTicketPrice;
    private String currency;
    private float slopeRating;
    private boolean Tbar;
    private boolean circulatingRopeway;
    private boolean chairLift;
    private String snowReliability;

    public String getSnowReliability() {
        return snowReliability;
    }

    public void setSnowReliability(String snowReliability) {
        this.snowReliability = snowReliability;
    }


    public String getResortName() {
        return resortName;
    }

    public void setResortName(String resortName) {
        this.resortName = resortName;
    }

    public String getContinent() {
        return continent;
    }

    public void setContinent(String continent) {
        this.continent = continent;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public int getAltitude() {
        return altitude;
    }

    public void setAltitude(int altitude) {
        this.altitude = altitude;
    }

    public int getBeginnerSlopeDistance() {
        return beginnerSlopeDistance;
    }

    public void setBeginnerSlopeDistance(int beginnerSlopeDistance) {
        this.beginnerSlopeDistance = beginnerSlopeDistance;
    }

    public int getIntermediateSlopeDistance() {
        return intermediateSlopeDistance;
    }

    public void setIntermediateSlopeDistance(int intermediateSlopeDistance) {
        this.intermediateSlopeDistance = intermediateSlopeDistance;
    }

    public int getDifficultSlopeDistance() {
        return difficultSlopeDistance;
    }

    public void setDifficultSlopeDistance(int difficultSlopeDistance) {
        this.difficultSlopeDistance = difficultSlopeDistance;
    }

    public int getAdultTicketPrice() {
        return adultTicketPrice;
    }

    public void setAdultTicketPrice(int adultTicketPrice) {
        this.adultTicketPrice = adultTicketPrice;
    }

    public int getYouthTicketPrice() {
        return youthTicketPrice;
    }

    public void setYouthTicketPrice(int youthTicketPrice) {
        this.youthTicketPrice = youthTicketPrice;
    }

    public int getChildTicketPrice() {
        return childTicketPrice;
    }

    public void setChildTicketPrice(int childTicketPrice) {
        this.childTicketPrice = childTicketPrice;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public float getSlopeRating() {
        return slopeRating;
    }

    public void setSlopeRating(float slopeRating) {
        this.slopeRating = slopeRating;
    }

    public boolean isTbar() {
        return Tbar;
    }

    public void setTbar(boolean tbar) {
        Tbar = tbar;
    }

    public boolean isCirculatingRopeway() {
        return circulatingRopeway;
    }

    public void setCirculatingRopeway(boolean circulatingRopeway) {
        this.circulatingRopeway = circulatingRopeway;
    }

    public boolean isChairLift() {
        return chairLift;
    }

    public void setChairLift(boolean chairLift) {
        this.chairLift = chairLift;
    }

}
