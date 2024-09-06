package japlearn.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import japlearn.demo.Entity.QuackslateBasics1;

public interface QuackslateBasics1Repository extends MongoRepository<QuackslateBasics1, Long>{
    QuackslateBasics1 findByJapPhrase(String japPhrase);

}
