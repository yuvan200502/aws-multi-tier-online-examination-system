package com.exam.system.controller;

import com.exam.system.dto.ExamSubmitRequest;
import com.exam.system.model.Exam;
import com.exam.system.model.Result;
import com.exam.system.repository.ResultRepository;
import com.exam.system.service.ResultService;
import com.exam.system.repository.ExamRepository;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map; // ✅ FIX 1
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/results")
@CrossOrigin
public class ResultController {

    private final ResultService resultService;
    private final ResultRepository resultRepository;
    private final ExamRepository examRepository; // ✅ FIX 2

    public ResultController(ResultService resultService,
                            ResultRepository resultRepository,
                            ExamRepository examRepository) {

        this.resultService = resultService;
        this.resultRepository = resultRepository;
        this.examRepository = examRepository; // ✅ FIX 2
    }

    // 🔥 SUBMIT
    @PostMapping("/submit")
    public String submitExam(@RequestBody ExamSubmitRequest request){
        return resultService.evaluateExam(request);
    }

    // 🔥 STUDENT RESULT
    @GetMapping("/student/{examId}")
    public Result getStudentResult(@PathVariable String examId,
                                  @RequestParam String email){

        String decodedEmail = URLDecoder.decode(email, StandardCharsets.UTF_8);

        List<Result> results = resultRepository
                .findByExamIdAndStudentEmail(examId, decodedEmail);

        if(results.isEmpty()){
            throw new RuntimeException("Result not found");
        }

        return results.get(results.size() - 1);
    }

    // 🔥 ANALYSIS (FIXED)
    @GetMapping("/analysis/{examId}/{email}")
    public Map<String, Object> getAnalysis(
            @PathVariable String examId,
            @PathVariable String email){

        String decodedEmail = URLDecoder.decode(email, StandardCharsets.UTF_8);

        // ✅ FIX 3 (List → manual check)
        List<Result> results = resultRepository
                .findByExamIdAndStudentEmail(examId, decodedEmail);

        if(results.isEmpty()){
            throw new RuntimeException("Result not found");
        }

        Result result = results.get(results.size() - 1);

        Exam exam = examRepository
                .findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        Map<String, Object> response = new HashMap<>();

        response.put("result", result);
        response.put("questions", exam.getQuestions());

        return response;
    }

    // 🔥 STUDENT ALL
    @GetMapping("/student/all/{email}")
    public List<Result> getStudentResults(@PathVariable String email){

        String decodedEmail = URLDecoder.decode(email, StandardCharsets.UTF_8);

        return resultRepository
                .findByStudentEmailAndPrivateExamFalseOrderByIdDesc(decodedEmail);
    }

    // 🔥 TEACHER RESULTS
      @GetMapping("/exam/{examId}")
    public List<Result> getExamResults(@PathVariable String examId){

        Exam exam = examRepository.findById(examId).orElseThrow();

        if(exam.isPrivateExam()){
            return resultRepository.findByExamIdAndPrivateExamTrue(examId);
        }

        return resultRepository.findByExamIdAndPrivateExamFalse(examId);
    }

    // 🔥 PRIVATE RESULTS
    @GetMapping("/exam/private/{examId}")
    public List<Result> getPrivateResults(@PathVariable String examId){
        return resultRepository.findByExamIdAndPrivateExamTrue(examId);
    }
}