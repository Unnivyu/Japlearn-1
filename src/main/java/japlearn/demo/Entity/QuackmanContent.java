package japlearn.demo.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "quackmanContent")
public class QuackmanContent {
    
    @Id
    private String contentId;
    private String levelId;
    private List<String> hint;
    private List<String> word;
    
    public QuackmanContent() {
    	
    }
    
    public QuackmanContent(String contentId, String levelId, List<String> hint, List<String> word) {
        this.contentId = contentId;
        this.levelId = levelId;
        this.hint = hint;
        this.word = word;
    }
    
    public String getContentId() {
        return contentId;
    }
    
    public void setContentId(String contentId) {
        this.contentId = contentId;
    }
    
    public String getLevelId() {
        return levelId;
    }
    
    public void setLevelId(String levelId) {
        this.levelId = levelId;
    }
    
    public List<String> getHint() {
        return hint;
    }
    
    public void setHint(List<String> hint) {
        this.hint = hint;
    }
    
    public List<String> getWord() {
        return word;
    }
    
    public void setWord(List<String> word) {
        this.word = word;
    }
    
    public void addWord(String newWord) {
        word.add(newWord);
    }
    
    public void addHint(String newHint) {
        hint.add(newHint);
    }
}
