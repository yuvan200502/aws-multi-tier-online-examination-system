package com.exam.system.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "results")
public class Result {

    @Id
    private String id;

    private String studentName;
    private String studentEmail;

    private String examId;
    private String examTitle;

    // 🔥 STORE ANSWERS AS JSON STRING
    private String answersString;

    // 🔥 MALPRACTICE TRACKING
    private int warnings;
    private boolean malpractice;

    private int score;
    private int total;

    private boolean privateExam;

    /* ================= GETTERS & SETTERS ================= */

    public String getId() {
        return id;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getExamId() {
        return examId;
    }

    public void setExamId(String examId) {
        this.examId = examId;
    }

    public String getExamTitle() {
        return examTitle;
    }

    public void setExamTitle(String examTitle) {
        this.examTitle = examTitle;
    }

    public String getAnswersString() {
        return answersString;
    }

    public void setAnswersString(String answersString) {
        this.answersString = answersString;
    }

    public int getWarnings() {
        return warnings;
    }

    public void setWarnings(int warnings) {
        this.warnings = warnings;
    }

    public boolean isMalpractice() {
        return malpractice;
    }

    public void setMalpractice(boolean malpractice) {
        this.malpractice = malpractice;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public boolean isPrivateExam() {
        return privateExam;
    }

    public void setPrivateExam(boolean privateExam) {
        this.privateExam = privateExam;
    }
}