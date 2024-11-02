package japlearn.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository; // Updated import to Vocabulary
import org.springframework.stereotype.Repository;

import japlearn.demo.Entity.Vocabulary;

@Repository
public interface VocabularyRepository extends MongoRepository<Vocabulary, String> { // Renamed to VocabularyRepository
    // Custom queries can go here if necessary
}
