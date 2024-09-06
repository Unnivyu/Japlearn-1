package japlearn.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import japlearn.demo.Entity.WordPhrases;
import japlearn.demo.Service.WordPhrasesService;

@RestController
@RequestMapping("/api/wordphrases")
@CrossOrigin(origins = "http://localhost:8081")
public class WordPhrasesController {

    private final WordPhrasesService service;

    @Autowired
    public WordPhrasesController(WordPhrasesService service) {
        this.service = service;
    }

    @GetMapping("/get")
    public WordPhrases getWordPhrases() {
        return service.getWordPhrases();
    }

    @PutMapping("/update")
    public WordPhrases updateWordPhrases(@RequestBody WordPhrases wordPhrases) {
        return service.updateWordPhrases(wordPhrases);
    }

    @PutMapping("/addWord")
    public WordPhrases addWord(@RequestBody String word) {
        return service.addWord(word);
    }

    @PutMapping("/removeWord")
    public WordPhrases removeWord(@RequestBody String word) {
        return service.removeWord(word);
    }
}
