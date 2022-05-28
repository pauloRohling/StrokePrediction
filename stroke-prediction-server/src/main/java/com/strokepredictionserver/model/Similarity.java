package com.strokepredictionserver.model;

import com.strokepredictionserver.model.enums.SmokingStatus;
import com.strokepredictionserver.model.interfaces.IAverageValues;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Similarity {

    private RecordWeight weight;
    private IAverageValues averageValues;

    public Double calculate(Record record1, Record record2) {
        double sum = 0.0;
        sum += (record1.getGender().equals(record2.getGender()) ? 1.0 : 0.0) * this.weight.getGender();
        sum += (record1.getHypertension().equals(record2.getHypertension()) ? 1.0 : 0.0) * this.weight.getHypertension();
        sum += (record1.getHeartDisease().equals(record2.getHeartDisease()) ? 1.0 : 0.0) * this.weight.getHeartDisease();
        sum += this.compareSmokingStatus(record1.getSmokingStatus(), record2.getSmokingStatus()) * this.weight.getSmokingStatus();

        sum += this.getNumericSimilarity(record1.getAge(), record2.getAge(), this.averageValues.getAge()) * this.weight.getAge();
        sum += this.getNumericSimilarity(record1.getAvgGlucoseLevel(), record2.getAvgGlucoseLevel(), this.averageValues.getGlucoseLevel()) * this.weight.getAvgGlucoseLevel();
        sum += this.getNumericSimilarity(record1.getBmi(), record2.getBmi(), this.averageValues.getBmi()) * this.weight.getBmi();

        return sum / this.sumWeights();
    }

    private Double sumWeights() {
        return this.weight.getGender() + this.weight.getAge() + this.weight.getHypertension() +
                this.weight.getHeartDisease() + this.weight.getAvgGlucoseLevel() + this.weight.getBmi() +
                this.weight.getSmokingStatus();
    }

    private Double getNumericSimilarity(Double value1, Double value2, Double average) {
        if (value1 == null || value2 == null) {
            return 1.0;
        }

        return 1.0 - (Math.abs(value2 - value1) / average);
    }

    private Double getNumericSimilarity(Integer value1, Integer value2, Double average) {
        if (value1 == null || value2 == null) {
            return 1.0;
        }

        return 1.0 - (Math.abs(value2 - value1) / average);
    }

    private Double compareSmokingStatus(Integer status1, Integer status2) {
        if (status1.equals(SmokingStatus.UNKNOWN.getId()) || status2.equals(SmokingStatus.UNKNOWN.getId())) {
            return 1.0;
        }

        if ((status1.equals(SmokingStatus.SMOKES.getId()) && status2.equals(SmokingStatus.FORMERLY_SMOKED.getId())) ||
                (status2.equals(SmokingStatus.SMOKES.getId()) && status1.equals(SmokingStatus.FORMERLY_SMOKED.getId()))) {
            return 0.7;
        }

        return (status1.equals(status2) ? 1.0 : 0.0);
    }

}
