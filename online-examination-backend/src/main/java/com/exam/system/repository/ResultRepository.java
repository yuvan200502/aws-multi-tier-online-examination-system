package com.exam.system.repository;

import com.exam.system.model.Result;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ResultRepository extends MongoRepository<Result,String> {

    List<Result> findByStudentEmailOrderByIdDesc(String studentEmail);

    List<Result> findByExamIdOrderByScoreDesc(String examId);
    List<Result> findByExamIdAndPrivateExamFalse(String examId);
    List<Result> findByExamIdAndPrivateExamTrue(String examId);
    // 🔥 CHANGE HERE (Optional removed)
    List<Result> findByExamIdAndStudentEmail(String examId, String studentEmail);
    List<Result> findByStudentEmailAndPrivateExamFalseOrderByIdDesc(String email);

}