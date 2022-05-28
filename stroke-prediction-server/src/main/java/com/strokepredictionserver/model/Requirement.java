package com.strokepredictionserver.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Requirement {

    private Record record;

    private RecordWeight weights;

}
