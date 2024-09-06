package japlearn.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import japlearn.demo.Entity.QuackslateLevel;

public interface QuackslateLevelRepository extends MongoRepository<QuackslateLevel, Integer> {

}
