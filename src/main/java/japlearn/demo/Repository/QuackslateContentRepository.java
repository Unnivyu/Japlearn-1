package japlearn.demo.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import japlearn.demo.Entity.QuackslateContent;

public interface QuackslateContentRepository extends MongoRepository<QuackslateContent, Integer> {
    List<QuackslateContent> findByLevel(String level);
}
