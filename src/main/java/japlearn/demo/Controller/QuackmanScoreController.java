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

import japlearn.demo.Entity.QuackmanScore;
import japlearn.demo.Service.QuackmanScoreService;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/quackmanScores")
public class QuackmanScoreController {

    private final QuackmanScoreService quackmanScoreService;

    @Autowired
    public QuackmanScoreController(QuackmanScoreService quackmanScoreService) {
        this.quackmanScoreService = quackmanScoreService;
    }

    @PostMapping("/addquackmanScore")
    public QuackmanScore addScore(@RequestBody QuackmanScore quackmanScore) {
        return quackmanScoreService.addScore(quackmanScore);
    }

    @GetMapping("/getAllquackmanScores")
    public List<QuackmanScore> getAllScores() {
        return quackmanScoreService.getAllScores();
    }

    @GetMapping("/getquackmanScoreById/{id}")
    public Optional<QuackmanScore> getScoreById(@PathVariable String id) {
        return quackmanScoreService.getScoreById(id);
    }

    @GetMapping("/getquackmanScoresByClasscode/{classcode}")
    public List<QuackmanScore> getScoresByClasscode(@PathVariable String classcode) {
        return quackmanScoreService.getScoresByClasscode(classcode);
    }

    @GetMapping("/getquackmanScoresByLevel/{level}")
    public List<QuackmanScore> getScoresByLevel(@PathVariable String level) {
        return quackmanScoreService.getScoresByLevel(level);
    }

    @PutMapping("/updatequackmanScore/{id}")
    public QuackmanScore updateScore(@PathVariable String id, @RequestBody QuackmanScore quackmanScore) {
        return quackmanScoreService.updateScore(id, quackmanScore);
    }

    @DeleteMapping("/deletequackmanScore/{id}")
    public void deleteScore(@PathVariable String id) {
        quackmanScoreService.deleteScore(id);
    }

    @GetMapping("/getquackmanScoreByFnameAndLname/{fname}/{lname}")
    public List<QuackmanScore> getScoreByFnameAndLname(@PathVariable String fname, @PathVariable String lname) {
        List<QuackmanScore> scores = quackmanScoreService.getScoreByFnameAndLname(fname, lname);
        return scores != null ? scores : new ArrayList<>();
    }
}
