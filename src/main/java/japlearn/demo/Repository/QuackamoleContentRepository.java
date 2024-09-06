package japlearn.demo.Repository;

import japlearn.demo.Entity.QuackamoleContent;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface QuackamoleContentRepository extends MongoRepository<QuackamoleContent, String> {
    Optional<QuackamoleContent> findByLevelId(String levelId);
}
