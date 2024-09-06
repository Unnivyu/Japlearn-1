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

import japlearn.demo.Entity.QuackslateBasics2;
import japlearn.demo.Service.QuackslateBasics2Service;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/quackslatebasics2")
public class QuackslateBasics2Controller {

    @Autowired
    private QuackslateBasics2Service service;

    // Endpoint to add a new translation
    @PostMapping("/add2")
    public ResponseEntity<QuackslateBasics2> addTranslation2(@RequestParam String japPhrase, @RequestParam String engTransl) {
        QuackslateBasics2 intro = service.addTranslation2(japPhrase, engTransl);
        return ResponseEntity.ok(intro);
    }

    // Endpoint to find a translation by the Japanese phrase
    @GetMapping("/find2")
    public ResponseEntity<String> getTranslation2(@RequestParam String japPhrase) {
        String translation = service.findTranslation2(japPhrase);
        return ResponseEntity.ok(translation);
    }

     @GetMapping("/all2")
    public ResponseEntity<List<QuackslateBasics2>> getAllTranslations2() {
    List<QuackslateBasics2> translations = service.getAllTranslations2();
    return ResponseEntity.ok(translations);
}
}
