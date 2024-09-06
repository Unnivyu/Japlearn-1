package japlearn.demo.Controller;

import java.util.ArrayList;
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

import japlearn.demo.Entity.QuackslateScore;
import japlearn.demo.Service.QuackslateScoreService;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/quackslateScores")
public class QuackslateScoreController {

    private final QuackslateScoreService quackslateScoreService;

    @Autowired
    public QuackslateScoreController(QuackslateScoreService quackslateScoreService) {
        this.quackslateScoreService = quackslateScoreService;
    }

    @PostMapping("/addScore")
    public QuackslateScore addScore(@RequestBody QuackslateScore quackslateScore) {
        return quackslateScoreService.addScore(quackslateScore);
    }

    @GetMapping("/getAllScores")
    public List<QuackslateScore> getAllScores() {
        return quackslateScoreService.getAllScores();
    }

    @GetMapping("/getScoreById/{id}")
    public Optional<QuackslateScore> getScoreById(@PathVariable String id) {
        return quackslateScoreService.getScoreById(id);
    }

    @GetMapping("/getScoresByClasscode/{classcode}")
    public List<QuackslateScore> getScoresByClasscode(@PathVariable String classcode) {
        return quackslateScoreService.getScoresByClasscode(classcode);
    }

    @GetMapping("/getScoresByLevel/{level}")
    public List<QuackslateScore> getScoresByLevel(@PathVariable String level) {
        return quackslateScoreService.getScoresByLevel(level);
    }

    @PutMapping("/updateScore/{id}")
    public QuackslateScore updateScore(@PathVariable String id, @RequestBody QuackslateScore quackslateScore) {
        return quackslateScoreService.updateScore(id, quackslateScore);
    }

    @DeleteMapping("/deleteScore/{id}")
    public void deleteScore(@PathVariable String id) {
        quackslateScoreService.deleteScore(id);
    }

    @GetMapping("/getScoreByFnameAndLname/{fname}/{lname}")
    public List<QuackslateScore> getScoreByFnameAndLname(@PathVariable String fname, @PathVariable String lname) {
    List<QuackslateScore> scores = quackslateScoreService.getScoreByFnameAndLname(fname, lname);
    return scores != null ? scores : new ArrayList<>();
}


    
}
