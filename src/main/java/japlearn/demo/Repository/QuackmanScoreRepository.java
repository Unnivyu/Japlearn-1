package japlearn.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import japlearn.demo.Entity.QuackmanScore;

@Repository
public interface QuackmanScoreRepository extends MongoRepository<QuackmanScore, String> {
    Optional<QuackmanScore> findByFnameAndLnameAndLevel(String fname, String lname, String level);
    List<QuackmanScore> findByClasscode(String classcode);
    List<QuackmanScore> findByLevel(String level);
    List<QuackmanScore> findByFnameAndLname(String fname, String lname);
}
