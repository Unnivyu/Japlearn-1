package japlearn.demo.Entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "quackslateintro")

public class QuackslateIntro {
    
    private String japPhrase;
    private String engTransl;

    

    public QuackslateIntro() {
    }

    public QuackslateIntro(String japPhrase, String engTransl) {
        this.japPhrase = japPhrase;
        this.engTransl = engTransl;
    }

    public String getJapPhrase() {
        return japPhrase;
    }

    public void setJapPhrase(String japPhrase) {
        this.japPhrase = japPhrase;
    }

    public String getEngTransl() {
        return engTransl;
    }

    public void setEngTransl(String engTransl) {
        this.engTransl = engTransl;
    }

    
}
