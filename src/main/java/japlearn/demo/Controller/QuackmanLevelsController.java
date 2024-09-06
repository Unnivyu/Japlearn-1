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
import japlearn.demo.Entity.QuackmanLevels;
import japlearn.demo.Service.QuackmanLevelsService;

@RestController
@RequestMapping("/api/quackmanlevels")
@CrossOrigin(origins = "http://localhost:8081") 
public class QuackmanLevelsController {

	@Autowired
	QuackmanLevelsService quackmanLevelsService;
	
	@PostMapping("/addLevel")
	public QuackmanLevels createQuackmanLevel(@RequestBody QuackmanLevels quackmanLevels) {
		return quackmanLevelsService.createQuackmanLevel(quackmanLevels);
	}
	
	@GetMapping("/getLevel/{Id}")
	public QuackmanLevels getQuackmanLevel(@PathVariable("Id") String Id) throws Exception {
		return quackmanLevelsService.findQuackmanLevelbyId(Id);
	}

	@PutMapping("/updateLevel/{Id}")
    public QuackmanLevels updateQuackmanLevel(@PathVariable("Id") String Id, @RequestBody QuackmanLevels updatedLevel) throws Exception {
        return quackmanLevelsService.updateQuackmanLevel(Id, updatedLevel);
    }
	
	@DeleteMapping("/deleteLevel/{Id}")
	public String removeQuackmanLevel(@PathVariable("Id") String Id) {
		return quackmanLevelsService.removeQuackmanLevelbyId(Id);
	}
	
    @GetMapping("/getLevels/{classId}")
    public List<QuackmanLevels> getLevelsByClassId(@PathVariable String classId) {
        return quackmanLevelsService.findLevelsByClassId(classId);
    }
}
