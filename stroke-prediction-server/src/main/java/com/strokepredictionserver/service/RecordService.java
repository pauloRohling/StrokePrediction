package com.strokepredictionserver.service;

import com.strokepredictionserver.model.Record;
import com.strokepredictionserver.model.RecordDto;
import com.strokepredictionserver.model.RecordWeight;
import com.strokepredictionserver.model.Similarity;
import com.strokepredictionserver.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecordService {

    private final RecordRepository recordRepository;

    @Autowired
    public RecordService(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    public List<RecordDto> getRecordsBySimilarity(Record record, RecordWeight recordWeight) {
        if (recordWeight == null) {
            recordWeight = new RecordWeight();
        }

        Similarity similarity = new Similarity(recordWeight, this.recordRepository.findAverageValues());

        return this.recordRepository.findAll().stream()
                .map(localRecord -> {
                    RecordDto recordDto = this.toDto(localRecord);
                    recordDto.setSimilarity(similarity.calculate(localRecord, record));
                    return recordDto;
                })
                .sorted(Comparator.comparing(RecordDto::getSimilarity).reversed())
                .collect(Collectors.toList());
    }

    public List<RecordDto> getRecordsBySimilarity(Record record) {
        return this.getRecordsBySimilarity(record, new RecordWeight());
    }

    private RecordDto toDto(Record record) {
        RecordDto recordDto = new RecordDto();
        recordDto.setId(record.getId());
        recordDto.setGender(record.getGender());
        recordDto.setAge(record.getAge());
        recordDto.setHypertension(record.getHypertension());
        recordDto.setHeartDisease(record.getHeartDisease());
        recordDto.setAvgGlucoseLevel(record.getAvgGlucoseLevel());
        recordDto.setBmi(record.getBmi());
        recordDto.setSmokingStatus(record.getSmokingStatus());
        recordDto.setStroke(record.getStroke());
        return recordDto;
    }
}
