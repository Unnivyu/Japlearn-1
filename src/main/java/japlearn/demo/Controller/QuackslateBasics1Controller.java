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

import japlearn.demo.Entity.QuackslateBasics1;
import japlearn.demo.Service.QuackslateBasics1Service;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/quackslatebasics1")
public class QuackslateBasics1Controller {

    @Autowired
    private QuackslateBasics1Service service;

    // Endpoint to add a new translation
    @PostMapping("/add1")
    public ResponseEntity<QuackslateBasics1> addTranslation1(@RequestParam String japPhrase, @RequestParam String engTransl) {
        QuackslateBasics1 intro = service.addTranslation1(japPhrase, engTransl);
        return ResponseEntity.ok(intro);
    }

    // Endpoint to find a translation by the Japanese phrase
    @GetMapping("/find1")
    public ResponseEntity<String> getTranslation1(@RequestParam String japPhrase) {
        String translation = service.findTranslation1(japPhrase);
        return ResponseEntity.ok(translation);
        
    }

      @GetMapping("/all1")
    public ResponseEntity<List<QuackslateBasics1>> getAllTranslations1() {
    List<QuackslateBasics1> translations = service.getAllTranslations1();
    return ResponseEntity.ok(translations);
}

}
