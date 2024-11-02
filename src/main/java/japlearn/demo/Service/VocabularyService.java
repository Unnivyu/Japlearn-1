package japlearn.demo.Service;

import java.util.List; // Updated import to Vocabulary

import org.springframework.beans.factory.annotation.Autowired; // Updated import to VocabularyRepository
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.Vocabulary;
import japlearn.demo.Repository.VocabularyRepository;

@Service
public class VocabularyService { // Renamed to VocabularyService

    @Autowired
    private VocabularyRepository vocabularyRepository; // Updated to VocabularyRepository

    public List<Vocabulary> getAllVocabulary() {
        return vocabularyRepository.findAll();
    }

    public Vocabulary getVocabularyById(String id) {
        return vocabularyRepository.findById(id).orElse(null);
    }

    public Vocabulary createVocabulary(Vocabulary vocabulary) {
        return vocabularyRepository.save(vocabulary);
    }

    public Vocabulary updateVocabulary(String id, Vocabulary vocabulary) {
        if (vocabularyRepository.existsById(id)) {
            vocabulary.setId(id);
            return vocabularyRepository.save(vocabulary);
        }
        return null;
    }

    public void deleteVocabulary(String id) {
        vocabularyRepository.deleteById(id);
    }
}
