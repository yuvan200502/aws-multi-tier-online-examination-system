package com.exam.system.service;

import com.exam.system.dto.ExamSubmitRequest;
import com.exam.system.model.Exam;
import com.exam.system.model.Question;
import com.exam.system.model.Result;
import com.exam.system.repository.ExamRepository;
import com.exam.system.repository.ResultRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@Service
public class ResultService {

    private final ExamRepository examRepository;
    private final ResultRepository resultRepository;

    public ResultService(ExamRepository examRepository,
                         ResultRepository resultRepository) {
        this.examRepository = examRepository;
        this.resultRepository = resultRepository;
    }

    public String evaluateExam(ExamSubmitRequest request) {

        try {

            System.out.println("==== SUBMIT DEBUG ====");
            System.out.println("ExamId: " + request.getExamId());
            System.out.println("Answers: " + request.getAnswers());

            if (request.getExamId() == null || request.getExamId().isEmpty()) {
                throw new RuntimeException("ExamId missing ❌");
            }

            if (request.getStudentEmail() == null || request.getStudentEmail().isEmpty()) {
                throw new RuntimeException("Email missing ❌");
            }

            List<Result> existing = resultRepository
                    .findByExamIdAndStudentEmail(
                            request.getExamId(),
                            request.getStudentEmail()
                    );

            if (!existing.isEmpty()) {
                throw new RuntimeException("Already attempted ❌");
            }

            Exam exam = examRepository
                    .findById(request.getExamId())
                    .orElseThrow(() -> new RuntimeException("Exam not found ❌"));

            int score = 0;

            Map<String, String> answers = request.getAnswers();
            if (answers == null) answers = new HashMap<>();

            if (exam.getQuestions() != null) {

                for (Question q : exam.getQuestions()) {

                    if (q == null || q.getId() == null) continue;

                    String submitted = answers.get(q.getId());

                    if (submitted != null &&
                        q.getCorrect() != null &&
                        submitted.equalsIgnoreCase(q.getCorrect())) {
                        score++;
                    }
                }
            }

            Result result = new Result();

            result.setStudentName(request.getStudentName());
            result.setStudentEmail(request.getStudentEmail());
            result.setExamId(exam.getId());
            result.setExamTitle(exam.getTitle());
            result.setScore(score);

            int total = (exam.getQuestions() != null)
                    ? exam.getQuestions().size()
                    : 0;

            result.setTotal(total);

            ObjectMapper mapper = new ObjectMapper();
            result.setAnswersString(mapper.writeValueAsString(answers));

            int warnings = (request.getWarnings() != null) ? request.getWarnings() : 0;
            result.setWarnings(warnings);
            result.setMalpractice(warnings >= 3);

            result.setPrivateExam(exam.isPrivateExam());

            resultRepository.save(result);

            return "Exam submitted successfully ✅";

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Submit failed: " + e.getMessage());
        }
    }
}