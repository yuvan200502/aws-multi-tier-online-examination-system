package com.exam.system.repository;

import com.exam.system.model.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactRepository
        extends MongoRepository<Contact,String> {
}