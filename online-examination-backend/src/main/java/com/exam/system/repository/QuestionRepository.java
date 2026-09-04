package com.exam.system.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.exam.system.model.Question;

public interface QuestionRepository extends MongoRepository<Question, String> {
}
