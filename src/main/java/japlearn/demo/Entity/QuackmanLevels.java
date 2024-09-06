package japlearn.demo.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "quackmanLevels")

public class QuackmanLevels {
	
	@Id
	String levelId;
	String title;
	String classId;
	
	public QuackmanLevels() {
		
	}
		
	public QuackmanLevels(String levelId, String title, String classId) {
		this.levelId = levelId;
		this.title = title;
		this.classId = classId;
	}
	
	
	public String getLevelId() {
		return levelId;
	}
	public void setLevelId(String levelId) {
		this.levelId = levelId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getClassId() {
		return classId;
	}
	public void setClassId(String classId) {
		this.classId = classId;
	}
			
}
