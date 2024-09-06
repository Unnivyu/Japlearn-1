package japlearn.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.Translation;
import japlearn.demo.Repository.TranslationRepository;

@Service
public class TranslationService {
    private final TranslationRepository repository;

    @Autowired
    public TranslationService(TranslationRepository repository) {
        this.repository = repository;
    }

    public List<Translation> getAllTranslations() {
        return repository.findAll();
    }

    public Optional<Translation> getTranslationById(String id) {
        return repository.findById(id);
    }

    public Translation addTranslation(Translation translation) {
        return repository.save(translation);
    }

    public Translation updateTranslation(String id, Translation translationDetails) {
        return repository.findById(id).map(translation -> {
            translation.setEnglish(translationDetails.getEnglish());
            translation.setJapanese(translationDetails.getJapanese());
            return repository.save(translation);
        }).orElseGet(() -> {
            translationDetails.setId(id);
            return repository.save(translationDetails);
        });
    }

    public void deleteTranslation(String id) {
        repository.deleteById(id);
    }
}
