package com.strokepredictionserver.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecordDto {

    private Integer id;

    private Integer gender;

    private Integer age;

    private Boolean hypertension;

    private Boolean heartDisease;

    private Double avgGlucoseLevel;

    private Double bmi;

    private Integer smokingStatus;

    private Boolean stroke;

    private Double similarity;

}
