package japlearn.demo.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import japlearn.demo.Entity.QuackmanLevels;

public interface QuackmanLevelsRepository extends MongoRepository<QuackmanLevels, String>{
	List<QuackmanLevels> findByClassId(String classId);
}
