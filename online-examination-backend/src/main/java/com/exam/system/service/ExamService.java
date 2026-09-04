package com.exam.system.service;

import com.exam.system.model.Exam;
import com.exam.system.repository.ExamRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamService {

    private final ExamRepository repo;

    public ExamService(ExamRepository repo) {
        this.repo = repo;
    }

    public Exam saveExam(Exam exam) {
        return repo.save(exam);
    }

    public List<Exam> getAllExams() {
        return repo.findAll();
    }

    public Exam getExam(String id) {
        return repo.findById(id).orElse(null);
    }
}

