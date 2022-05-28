package com.strokepredictionserver.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SmokingStatus {
    UNKNOWN(0),
    NEVER_SMOKED(1),
    FORMERLY_SMOKED(2),
    SMOKES(3);

    private final Integer id;
}
