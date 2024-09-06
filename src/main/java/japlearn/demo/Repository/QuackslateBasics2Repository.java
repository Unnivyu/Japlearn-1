package japlearn.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import japlearn.demo.Entity.QuackslateBasics2;

public interface QuackslateBasics2Repository extends MongoRepository<QuackslateBasics2, Long>{
    QuackslateBasics2 findByJapPhrase(String japPhrase);

}
