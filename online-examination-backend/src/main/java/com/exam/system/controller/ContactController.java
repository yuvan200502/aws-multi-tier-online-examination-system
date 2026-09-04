package com.exam.system.controller;

import com.exam.system.model.Contact;
import com.exam.system.repository.ContactRepository;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactRepository contactRepository;
    private final JavaMailSender mailSender;

    public ContactController(
            ContactRepository contactRepository,
            JavaMailSender mailSender) {

        this.contactRepository = contactRepository;
        this.mailSender = mailSender;
    }

   @PostMapping
public String sendMessage(@RequestBody Contact contact) {

    try {

        contactRepository.save(contact);
        System.out.println("Saved to MongoDB");

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setTo("vasanthsmiley003@gmail.com");
        mail.setSubject("New Contact Form Message");

        mail.setText(
            "Name: " + contact.getName() +
            "\nEmail: " + contact.getEmail() +
            "\nMessage: " + contact.getMessage()
        );

        mailSender.send(mail);

        System.out.println("Mail Sent");

        return "Success";

    } catch (Exception e) {
    e.printStackTrace();
    return "Failed to send message";
}
}
}