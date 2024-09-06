package japlearn.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import japlearn.demo.Entity.QuackslateIntro;

public interface QuackslateIntroRepository extends MongoRepository<QuackslateIntro, Long> {
    QuackslateIntro findByJapPhrase(String japPhrase);
}
