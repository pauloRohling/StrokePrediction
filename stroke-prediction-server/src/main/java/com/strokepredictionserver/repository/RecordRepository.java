package com.strokepredictionserver.repository;

import com.strokepredictionserver.model.Record;
import com.strokepredictionserver.model.interfaces.IAverageValues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordRepository extends JpaRepository<Record, Integer> {

    @Query(nativeQuery = true, value = """
            SELECT\s
            	MAX(age) - MIN(age) AS "age",\s
            	MAX(avg_glucose_level) - MIN(avg_glucose_level) AS "glucoseLevel",\s
            	MAX(bmi) - MIN(bmi) AS "bmi"
            FROM records
            """)
    IAverageValues findAverageValues();

}
