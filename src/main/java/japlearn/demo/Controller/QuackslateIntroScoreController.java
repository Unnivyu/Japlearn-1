package japlearn.demo.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import japlearn.demo.Entity.QuackslateIntroScore;
import japlearn.demo.Service.QuackslateIntroScoreService;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/quackslateintroscore")
public class QuackslateIntroScoreController {

    private static final Logger logger = LoggerFactory.getLogger(QuackslateIntroScoreController.class);

    @Autowired
    private QuackslateIntroScoreService service;

    @PostMapping("/save")
    public ResponseEntity<QuackslateIntroScore> saveScore(@RequestBody QuackslateIntroScore score) {
        try {
            QuackslateIntroScore savedScore = service.saveScore(score);
            return ResponseEntity.ok(savedScore);
        } catch (Exception e) {
            logger.error("Error in saveScore endpoint: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/all")
    public List<QuackslateIntroScore> getAllScores() {
        return service.getAllScores();
    }

    @GetMapping("/{id}")
    public QuackslateIntroScore getScoreById(@PathVariable String id) {
        return service.getScoreById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteScore(@PathVariable String id) {
        service.deleteScore(id);
    }

    @GetMapping("/class/{classCode}")
    public List<QuackslateIntroScore> getScoresByClassCode(@PathVariable String classCode) {
        return service.getScoresByClassCode(classCode);
    }
}
