package japlearn.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import japlearn.demo.Entity.Translation;

public interface TranslationRepository extends MongoRepository<Translation, String> {
}
