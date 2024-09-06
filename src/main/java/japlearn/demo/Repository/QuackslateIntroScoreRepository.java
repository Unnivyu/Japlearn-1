package japlearn.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import japlearn.demo.Entity.QuackslateIntroScore;

public interface QuackslateIntroScoreRepository extends MongoRepository<QuackslateIntroScore, String>{
    List<QuackslateIntroScore> findByClasscode(String classcode);
Optional<QuackslateIntroScore> findByFnameAndLnameAndClasscode(String fname, String lname, String classcode);
}
