package japlearn.demo.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import japlearn.demo.Entity.QuackmanContent;

public interface QuackmanContentRepository extends MongoRepository<QuackmanContent, String>{
	Optional<QuackmanContent> findByLevelId(String levelId);
}
 
