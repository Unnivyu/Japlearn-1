package japlearn.demo.Controller;

import java.util.List; // Updated import to Vocabulary

import org.springframework.beans.factory.annotation.Autowired; // Updated import to VocabularyService
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import japlearn.demo.Entity.Vocabulary;
import japlearn.demo.Service.VocabularyService;

@RestController
@RequestMapping("/api/vocabulary") // Updated the API endpoint
@CrossOrigin(origins = "http://localhost:8081") // If needed for CORS, adjust as per your setup
public class VocabularyController { // Renamed to VocabularyController

    @Autowired
    private VocabularyService vocabularyService; // Updated to VocabularyService

    @GetMapping
    public List<Vocabulary> getAllVocabulary() {
        return vocabularyService.getAllVocabulary();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vocabulary> getVocabularyById(@PathVariable String id) {
        Vocabulary vocabulary = vocabularyService.getVocabularyById(id);
        if (vocabulary != null) {
            return ResponseEntity.ok(vocabulary);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Vocabulary createVocabulary(@RequestBody Vocabulary vocabulary) {
        return vocabularyService.createVocabulary(vocabulary);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vocabulary> updateVocabulary(@PathVariable String id, @RequestBody Vocabulary vocabulary) {
        Vocabulary updatedVocabulary = vocabularyService.updateVocabulary(id, vocabulary);
        if (updatedVocabulary != null) {
            return ResponseEntity.ok(updatedVocabulary);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVocabulary(@PathVariable String id) {
        vocabularyService.deleteVocabulary(id);
        return ResponseEntity.noContent().build();
    }
}
