package japlearn.demo.Repository;

import japlearn.demo.Entity.QuackamoleLevels;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuackamoleLevelsRepository extends MongoRepository<QuackamoleLevels, String> {
    List<QuackamoleLevels> findByClassId(String classId);
}
