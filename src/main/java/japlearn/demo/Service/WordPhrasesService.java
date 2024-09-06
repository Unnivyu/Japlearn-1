package japlearn.demo.Service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import japlearn.demo.Entity.WordPhrases;
import japlearn.demo.Repository.WordPhrasesRepository;

@Service
public class WordPhrasesService {
    private final WordPhrasesRepository repository;

    @Autowired
    public WordPhrasesService(WordPhrasesRepository repository) {
        this.repository = repository;
    }

    public WordPhrases getWordPhrases() {
        return repository.findAll().stream().findFirst().orElse(new WordPhrases());
    }

    public WordPhrases updateWordPhrases(WordPhrases wordPhrases) {
        return repository.save(wordPhrases);
    }

    public WordPhrases addWord(String wordJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        String word = "";
        try {
            JsonNode node = objectMapper.readTree(wordJson);
            if (node != null && node.has("word")) {
                word = node.get("word").asText();
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        WordPhrases wp = getWordPhrases();
        if (wp.getWordsArray() == null) {
            wp.setWordsArray(new ArrayList<>());
        }
        wp.getWordsArray().add(word);
        return repository.save(wp);
    }

    public WordPhrases removeWord(String wordJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        String word = "";
        try {
            JsonNode node = objectMapper.readTree(wordJson);
            if (node != null && node.has("word")) {
                word = node.get("word").asText();
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        WordPhrases wp = getWordPhrases();
        if (wp.getWordsArray() != null) {
            wp.getWordsArray().remove(word);
        }
        return repository.save(wp);
    }
}
