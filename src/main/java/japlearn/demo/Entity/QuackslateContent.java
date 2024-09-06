package japlearn.demo.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "quackslateContent")
public class QuackslateContent {


    @Id
    private int id;
    private String word;
    private String translatedWord;
    private String level;


    
    public QuackslateContent(int id, String word, String translatedWord, String level) {
        this.id = id;
        this.word = word;
        this.translatedWord = translatedWord;
        this.level = level;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getWord() {
        return word;
    }
    public void setWord(String word) {
        this.word = word;
    }
    public String getTranslatedWord() {
        return translatedWord;
    }
    public void setTranslatedWord(String translatedWord) {
        this.translatedWord = translatedWord;
    }
    public String getLevel() {
        return level;
    }
    public void setLevel(String level) {
        this.level = level;
    }


}
