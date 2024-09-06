package japlearn.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import japlearn.demo.Entity.WordPhrases;

public interface WordPhrasesRepository extends MongoRepository<WordPhrases, String> {
}
