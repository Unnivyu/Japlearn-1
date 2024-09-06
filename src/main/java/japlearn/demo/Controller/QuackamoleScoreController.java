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

import japlearn.demo.Entity.QuackamoleScore;
import japlearn.demo.Service.QuackamoleScoreService;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/quackamoleScores")
public class QuackamoleScoreController {

    private final QuackamoleScoreService quackamoleScoreService;

    @Autowired
    public QuackamoleScoreController(QuackamoleScoreService quackamoleScoreService) {
        this.quackamoleScoreService = quackamoleScoreService;
    }

    @PostMapping("/addquackamoleScore")
    public QuackamoleScore addScore(@RequestBody QuackamoleScore quackamoleScore) {
        return quackamoleScoreService.addScore(quackamoleScore);
    }

    @GetMapping("/getAllquackamoleScores")
    public List<QuackamoleScore> getAllScores() {
        return quackamoleScoreService.getAllScores();
    }

    @GetMapping("/getquackamoleScoreById/{id}")
    public Optional<QuackamoleScore> getScoreById(@PathVariable String id) {
        return quackamoleScoreService.getScoreById(id);
    }

    @GetMapping("/getquackamoleScoresByClasscode/{classcode}")
    public List<QuackamoleScore> getScoresByClasscode(@PathVariable String classcode) {
        return quackamoleScoreService.getScoresByClasscode(classcode);
    }

    @GetMapping("/getquackamoleScoresByLevel/{level}")
    public List<QuackamoleScore> getScoresByLevel(@PathVariable String level) {
        return quackamoleScoreService.getScoresByLevel(level);
    }

    @PutMapping("/updatequackamoleScore/{id}")
    public QuackamoleScore updateScore(@PathVariable String id, @RequestBody QuackamoleScore quackamoleScore) {
        return quackamoleScoreService.updateScore(id, quackamoleScore);
    }

    @DeleteMapping("/deletequackamoleScore/{id}")
    public void deleteScore(@PathVariable String id) {
        quackamoleScoreService.deleteScore(id);
    }

    @GetMapping("/getquackamoleScoreByFnameAndLname/{fname}/{lname}")
    public List<QuackamoleScore> getScoreByFnameAndLname(@PathVariable String fname, @PathVariable String lname) {
        List<QuackamoleScore> scores = quackamoleScoreService.getScoreByFnameAndLname(fname, lname);
        return scores != null ? scores : new ArrayList<>();
    }
}
