package japlearn.demo.Entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "quackslatebasics2")

public class QuackslateBasics2 {
    
    private String japPhrase;
    private String engTransl;

    

    public QuackslateBasics2() {
    }

    public QuackslateBasics2(String japPhrase, String engTransl) {
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
