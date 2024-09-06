package japlearn.demo.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "quackamoleContent")
public class QuackamoleContent {

    @Id
    private String levelId;
    private List<String> kana;
    private List<String> romaji;

    // Constructors, getters, and setters

    public QuackamoleContent() {
    }

    public QuackamoleContent(String levelId, List<String> kana, List<String> romaji) {
        this.levelId = levelId;
        this.kana = kana;
        this.romaji = romaji;
    }

    public String getLevelId() {
        return levelId;
    }

    public void setLevelId(String levelId) {
        this.levelId = levelId;
    }

    public List<String> getKana() {
        return kana;
    }

    public void setKana(List<String> kana) {
        this.kana = kana;
    }

    public List<String> getRomaji() {
        return romaji;
    }

    public void setRomaji(List<String> romaji) {
        this.romaji = romaji;
    }
}
