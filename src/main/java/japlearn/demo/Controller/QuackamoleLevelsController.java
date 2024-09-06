package japlearn.demo.Controller;

import java.util.List;

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

import japlearn.demo.Entity.QuackamoleLevels;
import japlearn.demo.Service.QuackamoleLevelsService;

@RestController
@RequestMapping("/api/quackamolelevels")
@CrossOrigin(origins = "http://localhost:8081")
public class QuackamoleLevelsController {

    @Autowired
    QuackamoleLevelsService quackamoleLevelsService;

    @PostMapping("/addLevel")
    public QuackamoleLevels createQuackamoleLevel(@RequestBody QuackamoleLevels quackamoleLevels) {
        return quackamoleLevelsService.createQuackamoleLevel(quackamoleLevels);
    }

    @GetMapping("/getLevel/{id}")
    public QuackamoleLevels getQuackamoleLevel(@PathVariable("id") String id) throws Exception {
        return quackamoleLevelsService.findQuackamoleLevelById(id);
    }

    @DeleteMapping("/deleteLevel/{id}")
    public String removeQuackamoleLevel(@PathVariable("id") String id) {
        return quackamoleLevelsService.removeQuackamoleLevelById(id);
    }

    @GetMapping("/getLevels/{classId}")
    public List<QuackamoleLevels> getLevelsByClassId(@PathVariable String classId) {
        return quackamoleLevelsService.findLevelsByClassId(classId);
    }
    
    @PutMapping("/updateLevel/{id}")
    public QuackamoleLevels updateQuackamoleLevel(@PathVariable("id") String id, @RequestBody QuackamoleLevels updatedLevel) throws Exception {
        return quackamoleLevelsService.updateQuackamoleLevel(id, updatedLevel);
    }

    @GetMapping("/getTitle/{id}")
    public String getTitle(@PathVariable String id) {
        try {
            return quackamoleLevelsService.getTitleById(id);
        } catch (Exception e) {
            return e.getMessage();
        }
    }
    
}

