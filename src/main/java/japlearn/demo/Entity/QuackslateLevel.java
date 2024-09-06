package japlearn.demo.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "quackslateLevels")
public class QuackslateLevel {

    @Id
    private int levelID;
    private String title;
    private String classID;


    
    public QuackslateLevel(int levelID, String title, String classID) {
        this.levelID = levelID;
        this.title = title;
        this.classID = classID;
    }
    public int getLevelID() {
        return levelID;
    }
    public void setLevelID(int levelID) {
        this.levelID = levelID;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getClassID() {
        return classID;
    }
    public void setClassID(String classID) {
        this.classID = classID;
    }

    
}
