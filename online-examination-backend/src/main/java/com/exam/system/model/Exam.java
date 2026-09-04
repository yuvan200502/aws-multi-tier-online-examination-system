    package com.exam.system.model;

    import org.springframework.data.annotation.Id;
    import org.springframework.data.mongodb.core.mapping.Document;

    import java.util.List;

    @Document(collection = "exams")
    public class Exam {

        @Id
        private String id;

        private String title;
        private int duration;
        private boolean privateExam;
        private String password;
        private String examDate;
        private String startTime;
        private String endTime;

        private List<Question> questions; // embedded documents

        // ===== GETTERS & SETTERS =====
        public String getId() {
            return id;
        }

        public String getTitle() {
            return title;
        }

        public int getDuration() {
            return duration;
        }

        public List<Question> getQuestions() {
            return questions;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public void setDuration(int duration) {
            this.duration = duration;
        }
        public String getExamDate() { return examDate; }
        public void setExamDate(String examDate) { this.examDate = examDate; }

        public String getStartTime() { return startTime; }
        public void setStartTime(String startTime) { this.startTime = startTime; }

        public String getEndTime() { return endTime; }
        public void setEndTime(String endTime) { this.endTime = endTime; }

        public void setQuestions(List<Question> questions) {
            this.questions = questions;
        }
        public boolean isPrivateExam() {
        return privateExam;
    }

    public void setPrivateExam(boolean privateExam) {
        this.privateExam = privateExam;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    }
