package com.strokepredictionserver.controller;

import com.strokepredictionserver.model.RecordDto;
import com.strokepredictionserver.model.Requirement;
import com.strokepredictionserver.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/records")
public class RecordController {

    private final RecordService recordService;

    @Autowired
    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @PostMapping()
    public List<RecordDto> getRecordsBySimilarity(@RequestBody Requirement requirement) {
        return this.recordService.getRecordsBySimilarity(requirement.getRecord(), requirement.getWeights());
    }
}
