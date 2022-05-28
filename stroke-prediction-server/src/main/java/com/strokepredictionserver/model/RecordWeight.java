package com.strokepredictionserver.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class RecordWeight {

    private Double gender;

    private Double age;

    private Double hypertension;

    private Double heartDisease;

    private Double avgGlucoseLevel;

    private Double bmi;

    private Double smokingStatus;

    public RecordWeight() {
        this.gender = 0.2;
        this.age = 0.5;
        this.hypertension = 1.0;
        this.heartDisease = 0.8;
        this.avgGlucoseLevel = 0.8;
        this.bmi = 0.8;
        this.smokingStatus = 0.8;
    }

}
