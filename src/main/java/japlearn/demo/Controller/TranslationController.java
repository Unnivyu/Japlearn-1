package japlearn.demo.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import japlearn.demo.Entity.Translation;
import japlearn.demo.Service.TranslationService;

@RestController
@RequestMapping("/api/translations")
@CrossOrigin(origins = "http://localhost:8081")
public class TranslationController {

    private final TranslationService service;

    @Autowired
    public TranslationController(TranslationService service) {
        this.service = service;
    }

    @GetMapping("/get")
    public List<Translation> getAllTranslations() {
        return service.getAllTranslations();
    }

    @GetMapping("/get/{id}x")
    public Optional<Translation> getTranslationById(@PathVariable String id) {
        return service.getTranslationById(id);
    }

    @PostMapping("/add")
    public Translation addTranslation(@RequestBody Translation translation) {
        return service.addTranslation(translation);
    }

    @PutMapping("/update/{id}")
    public Translation updateTranslation(@PathVariable String id, @RequestBody Translation translationDetails) {
        return service.updateTranslation(id, translationDetails);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTranslation(@PathVariable String id) {
        service.deleteTranslation(id);
    }
}
