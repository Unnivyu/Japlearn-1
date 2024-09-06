package japlearn.demo.Entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "quackslatebasics1")

public class QuackslateBasics1 {
    
    private String japPhrase;
    private String engTransl;

    

    public QuackslateBasics1() {
    }

    public QuackslateBasics1(String japPhrase, String engTransl) {
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
