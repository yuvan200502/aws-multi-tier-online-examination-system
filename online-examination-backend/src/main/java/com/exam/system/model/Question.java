package com.exam.system.model;

import org.springframework.data.mongodb.core.mapping.Field;

public class Question {

    @Field("_id")   // 🔥 ONLY THIS
    private String id;

    private String question;

    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;

    private String correct;

    public String getId() {
        return id;
    }

    public String getQuestion() {
        return question;
    }

    public String getOptionA() {
        return optionA;
    }

    public String getOptionB() {
        return optionB;
    }

    public String getOptionC() {
        return optionC;
    }

    public String getOptionD() {
        return optionD;
    }

    public String getCorrect() {
        return correct;
    }
}