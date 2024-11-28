package japlearn.demo.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "DatabankLessonPages")
public class DatabankLessonPage {

	@Id
	private String id;
	private String lessonId;
	private String page_title;
	
	public DatabankLessonPage() {}

	public DatabankLessonPage(String id, String lessonId, String page_title) {
		super();
		this.id = id;
		this.lessonId = lessonId;
		this.page_title = page_title;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLessonId() {
		return lessonId;
	}

	public void setLessonId(String lessonId) {
		this.lessonId = lessonId;
	}

	public String getPage_title() {
		return page_title;
	}

	public void setPage_title(String page_title) {
		this.page_title = page_title;
	}
<<<<<<< HEAD
}
=======
}
>>>>>>> d9c508c5db0a9530d28eb8e0dd4474b93dbb4ad8
