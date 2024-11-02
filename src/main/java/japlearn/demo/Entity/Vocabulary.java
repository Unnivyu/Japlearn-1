package japlearn.demo.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Vocabulary")
public class Vocabulary { // Renamed class to Vocabulary
    @Id
    private String id;
    private String english;
    private String japanese;
    private String kanji; // Added kanji field

    public Vocabulary() {}

    public Vocabulary(String english, String japanese, String kanji) { // Updated constructor to include kanji
        this.english = english;
        this.japanese = japanese;
        this.kanji = kanji;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEnglish() {
        return english;
    }

    public void setEnglish(String english) {
        this.english = english;
    }

    public String getJapanese() {
        return japanese;
    }

    public void setJapanese(String japanese) {
        this.japanese = japanese;
    }

    public String getKanji() {
        return kanji;
    }

    public void setKanji(String kanji) {
        this.kanji = kanji;
    }
}
