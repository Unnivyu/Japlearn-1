package japlearn.demo.Entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "wordPhrases")
public class WordPhrases {
    @Id
    private String id;
    private List<String> wordsArray;

    public WordPhrases() {
    }

    public WordPhrases(String id, List<String> wordsArray) {
        this.id = id;
        this.wordsArray = wordsArray;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getWordsArray() {
        return wordsArray;
    }

    public void setWordsArray(List<String> wordsArray) {
        this.wordsArray = wordsArray;
    }
}
