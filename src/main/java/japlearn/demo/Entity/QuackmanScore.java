package japlearn.demo.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "quackmanScores")
public class QuackmanScore {

    @Id
    private String id;
    private String fname;
    private String lname;
    private int score;
    private String classcode;
    private String level;

    public QuackmanScore(String id, String fname, String lname, int score, String classcode, String level) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.score = score;
        this.classcode = classcode;
        this.level = level;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getFname() {
        return fname;
    }
    public void setFname(String fname) {
        this.fname = fname;
    }
    public String getLname() {
        return lname;
    }
    public void setLname(String lname) {
        this.lname = lname;
    }
    public int getScore() {
        return score;
    }
    public void setScore(int score) {
        this.score = score;
    }
    public String getClasscode() {
        return classcode;
    }
    public void setClasscode(String classcode) {
        this.classcode = classcode;
    }
    public String getLevel() {
        return level;
    }
    public void setLevel(String level) {
        this.level = level;
    }
}
