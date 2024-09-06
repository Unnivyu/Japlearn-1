package japlearn.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import japlearn.demo.Entity.QuackslateScore;

@Repository
public interface QuackslateScoreRepository extends MongoRepository<QuackslateScore, String> {
    Optional<QuackslateScore> findByFnameAndLnameAndLevel(String fname, String lname, String level);
    List<QuackslateScore> findByClasscode(String classcode);
    List<QuackslateScore> findByLevel(String level);
    List<QuackslateScore> findByFnameAndLname(String fname, String lname);
}
