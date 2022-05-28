package com.strokepredictionserver.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity(name = "records")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Record {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "gender")
    private Integer gender;

    @Column(name = "age")
    private Integer age;

    @Column(name = "hypertension")
    private Boolean hypertension;

    @Column(name = "heart_disease")
    private Boolean heartDisease;

    @Column(name = "avg_glucose_level")
    private Double avgGlucoseLevel;

    @Column(name = "bmi")
    private Double bmi;

    @Column(name = "smoking_status")
    private Integer smokingStatus;

    @Column(name = "stroke")
    private Boolean stroke;

}
