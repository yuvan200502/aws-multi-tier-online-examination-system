package com.exam.system.dto;

import java.util.Map;

public class ExamSubmitRequest {

    private String examId;
    private String studentName;
    private String studentEmail;
    private Map<String,String> answers;
    private boolean autoSubmitted;
    private Integer warnings;

    // getters & setters/ Add warnings field

    public String getExamId() {
        return examId;
    }

    public void setExamId(String examId) {
        this.examId = examId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {   // <-- missing earlier
        this.studentName = studentName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public Map<String,String> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<String,String> answers) {
        this.answers = answers;
    }

    public boolean isAutoSubmitted() {
        return autoSubmitted;
    }

    public void setAutoSubmitted(boolean autoSubmitted) {
        this.autoSubmitted = autoSubmitted;
    }
    public Integer getWarnings() {
        return warnings;
    }
    public void setWarnings(Integer warnings) {
        this.warnings = warnings;
    }
}