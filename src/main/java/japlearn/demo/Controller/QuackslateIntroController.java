package japlearn.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import japlearn.demo.Entity.QuackslateIntro;
import japlearn.demo.Service.QuackslateIntroService;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/quackslateintro")
public class QuackslateIntroController {

    @Autowired
    private QuackslateIntroService service;

    // Endpoint to add a new translation
    @PostMapping("/add")
    public ResponseEntity<QuackslateIntro> addTranslation(@RequestParam String japPhrase, @RequestParam String engTransl) {
        QuackslateIntro intro = service.addTranslation(japPhrase, engTransl);
        return ResponseEntity.ok(intro);
    }

    // Endpoint to find a translation by the Japanese phrase
    @GetMapping("/find")
    public ResponseEntity<String> getTranslation(@RequestParam String japPhrase) {
        String translation = service.findTranslation(japPhrase);
        return ResponseEntity.ok(translation);
    }

    @GetMapping("/all")
    public ResponseEntity<List<QuackslateIntro>> getAllTranslations() {
    List<QuackslateIntro> translations = service.getAllTranslations();
    return ResponseEntity.ok(translations);
}
}
