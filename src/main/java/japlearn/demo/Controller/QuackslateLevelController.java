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

import japlearn.demo.Entity.QuackslateLevel;
import japlearn.demo.Service.QuackslateLevelService;

@CrossOrigin(origins = "http://localhost:8081") // Update to the correct port of your frontend if necessary
@RestController
@RequestMapping("/api/quackslateLevels")
public class QuackslateLevelController {

    private final QuackslateLevelService quackslateLevelService;

    @Autowired
    public QuackslateLevelController(QuackslateLevelService quackslateLevelService) {
        this.quackslateLevelService = quackslateLevelService;
    }

    @PostMapping("/addquackslatelevel")
    public QuackslateLevel addQuackslateLevel(@RequestBody QuackslateLevel quackslateLevel) {
        return quackslateLevelService.addQuackslateLevel(quackslateLevel);
    }

    @GetMapping("/allquackslatelevels")
    public List<QuackslateLevel> getAllQuackslateLevels() {
        return quackslateLevelService.getAllQuackslateLevels();
    }

    @GetMapping("/getquackslatelevel/{levelID}")
    public Optional<QuackslateLevel> getQuackslateLevelById(@PathVariable int levelID) {
        return quackslateLevelService.getQuackslateLevelById(levelID);
    }

    @PutMapping("/updatequackslatelevel/{levelID}")
    public QuackslateLevel updateQuackslateLevel(@PathVariable int levelID, @RequestBody QuackslateLevel quackslateLevel) throws Exception {
        return quackslateLevelService.updateQuackslateLevel(levelID, quackslateLevel);
    }

    @DeleteMapping("/deletequackslatelevel/{levelID}")
    public void deleteQuackslateLevel(@PathVariable int levelID) {
        quackslateLevelService.deleteQuackslateLevel(levelID);
    }
}
