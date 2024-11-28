package japlearn.demo.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import japlearn.demo.Entity.DatabankLesson;


public interface DatabankLessonRepository extends MongoRepository<DatabankLesson, String>{
	List<DatabankLesson> findByClassId(String classId);
<<<<<<< HEAD
}
=======
}
>>>>>>> d9c508c5db0a9530d28eb8e0dd4474b93dbb4ad8
