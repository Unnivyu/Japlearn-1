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

import japlearn.demo.Entity.QuackslateContent;
import japlearn.demo.Service.QuackslateContentService;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/quackslateContent")
public class QuackslateContentController {

    private final QuackslateContentService quackslateContentService;

    @Autowired
    public QuackslateContentController(QuackslateContentService quackslateContentService) {
        this.quackslateContentService = quackslateContentService;
    }

    @PostMapping("/addQuackslateContent")
    public QuackslateContent addQuackslateContent(@RequestBody QuackslateContent quackslateContent) {
        return quackslateContentService.addQuackslateContent(quackslateContent);
    }

    @GetMapping("/getAllQuackslateContent")
    public List<QuackslateContent> getAllQuackslateContent() {
        return quackslateContentService.getAllQuackslateContent();
    }

    @GetMapping("/getQuackslateContentById/{id}")
    public Optional<QuackslateContent> getQuackslateContentById(@PathVariable int id) {
        return quackslateContentService.getQuackslateContentById(id);
    }

    @GetMapping("/getByLevel/{level}")
    public List<QuackslateContent> getByLevel(@PathVariable String level) {
        return quackslateContentService.getByLevel(level);
    }

    @PutMapping("/updateQuackslateContent/{id}")
    public QuackslateContent updateQuackslateContent(@PathVariable int id, @RequestBody QuackslateContent quackslateContent) {
        quackslateContent.setId(id);
        return quackslateContentService.updateQuackslateContent(quackslateContent);
    }

    @DeleteMapping("/deleteQuackslateContent/{id}")
    public void deleteQuackslateContent(@PathVariable int id) {
        quackslateContentService.deleteQuackslateContent(id);
    }
}
