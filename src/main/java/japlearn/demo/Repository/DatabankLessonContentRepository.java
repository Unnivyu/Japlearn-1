package japlearn.demo.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import japlearn.demo.Entity.DatabankLessonContent;

public interface DatabankLessonContentRepository extends MongoRepository<DatabankLessonContent,String>{
	List<DatabankLessonContent> findByLessonPageId(String lessonPageId);
	
	void deleteByLessonPageId(String lessonPageId);
<<<<<<< HEAD
}
=======
}
>>>>>>> d9c508c5db0a9530d28eb8e0dd4474b93dbb4ad8
