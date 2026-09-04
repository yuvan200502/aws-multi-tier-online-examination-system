package com.exam.system.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.exam.system.model.Exam;

public interface ExamRepository extends MongoRepository<Exam, String> {
}
