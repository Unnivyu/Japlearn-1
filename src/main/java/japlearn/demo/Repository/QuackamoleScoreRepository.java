package japlearn.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import japlearn.demo.Entity.QuackamoleScore;

@Repository
public interface QuackamoleScoreRepository extends MongoRepository<QuackamoleScore, String> {
    Optional<QuackamoleScore> findByFnameAndLnameAndLevel(String fname, String lname, String level);
    List<QuackamoleScore> findByClasscode(String classcode);
    List<QuackamoleScore> findByLevel(String level);
    List<QuackamoleScore> findByFnameAndLname(String fname, String lname);
}
