package japlearn.demo.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "quackslateintroscore")
public class QuackslateIntroScore {

    @Id
    private String id;
    private String fname;
    private String lname;
    private int score;
    private String classcode;

    public QuackslateIntroScore(String fname, String lname, int score, String classcode) {
        this.fname = fname;
        this.lname = lname;
        this.score = score;
        this.classcode = classcode;
    }

    // Getters and setters

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
}
