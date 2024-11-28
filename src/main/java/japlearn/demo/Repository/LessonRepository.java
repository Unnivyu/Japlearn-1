package japlearn.demo.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import japlearn.demo.Entity.Lesson;

public interface LessonRepository extends MongoRepository<Lesson, String>{
	List<Lesson> findByClassId(String classId);
<<<<<<< HEAD
}
=======
}
>>>>>>> d9c508c5db0a9530d28eb8e0dd4474b93dbb4ad8
