package com.exam.system.controller;

import com.exam.system.model.Exam;
import com.exam.system.dto.ExamSubmitRequest;
import com.exam.system.service.ExamService;
import com.exam.system.service.ResultService;
import com.exam.system.repository.ExamRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@CrossOrigin
public class ExamController {

    private final ExamService examService;
    private final ResultService resultService;
    private final ExamRepository examRepository;

    public ExamController(ExamService examService,
                          ResultService resultService,
                          ExamRepository examRepository) {
        this.examService = examService;
        this.resultService = resultService;
        this.examRepository = examRepository;
    }
        @GetMapping("/test")
public String test() {
    return "Backend Working";
}
    // ADMIN → create exam
    @PostMapping("/create")
public Exam createExam(@RequestBody Exam exam){
    System.out.println("privateExam: " + exam.isPrivateExam()); // 🔥 DEBUG
    return examService.saveExam(exam);
}

    // STUDENT + ADMIN → view all exams
    @GetMapping
    //@PreAuthorize("hasAnyAuthority('STUDENT','ADMIN')")
    public List<Exam> all(){
        return examService.getAllExams();
    }

    // STUDENT + ADMIN → view single exam
    @GetMapping("/{id}")
    //@PreAuthorize("hasAnyAuthority('STUDENT','ADMIN')")
    public Exam get(@PathVariable String id){
        return examService.getExam(id);
    }
    

    // STUDENT → submit exam
    @PostMapping("/submit")
    //@PreAuthorize("hasAuthority('STUDENT')")
    public String submitExam(@RequestBody ExamSubmitRequest request){
        return resultService.evaluateExam(request);
    }
    
   @PostMapping("/validate")
   @PreAuthorize("permitAll()")
public boolean validateExam(
        @RequestParam String examId,
        @RequestParam String password){

    Exam exam = examRepository.findById(examId)
            .orElseThrow(() -> new RuntimeException("Exam not found"));

    if(!exam.isPrivateExam()){  
        return true;
    }

    return exam.getPassword() != null &&
           exam.getPassword().equals(password);
}

}