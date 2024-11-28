package japlearn.demo.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import japlearn.demo.Entity.DatabankLessonPage;

public interface DatabankLessonPageRepository extends MongoRepository<DatabankLessonPage, String>{
	List<DatabankLessonPage> findByLessonId(String LessonId);
	
	void deleteByLessonId(String lessonId);
<<<<<<< HEAD
}
=======
}
>>>>>>> d9c508c5db0a9530d28eb8e0dd4474b93dbb4ad8
