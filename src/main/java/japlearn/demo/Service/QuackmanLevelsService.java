package japlearn.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.QuackmanLevels;
import japlearn.demo.Repository.QuackmanLevelsRepository;

@Service
public class QuackmanLevelsService {
	
	@Autowired
	QuackmanLevelsRepository quackmanLevelsRepository;
	
	public QuackmanLevels createQuackmanLevel(QuackmanLevels quackmanLevels) {				
		return quackmanLevelsRepository.save(quackmanLevels);		
	}
	
	public QuackmanLevels findQuackmanLevelbyId(String Id) throws Exception{
		Optional<QuackmanLevels> quackmanlevel = quackmanLevelsRepository.findById(Id);
		
		if (quackmanlevel.isPresent()) {
			return quackmanlevel.get();
		} else {
			throw new Exception("Level"+ Id +"not found");
		}
	}
	
	
	public String removeQuackmanLevelbyId(String Id) {
		
		Optional<QuackmanLevels> quackmanlevel = quackmanLevelsRepository.findById(Id);
		
        if (quackmanlevel.isPresent()) {
            quackmanLevelsRepository.deleteById(Id);
            return "Successfully deleted level";
        }
		
		return "Failed to delete";
	}
	
    public List<QuackmanLevels> findLevelsByClassId(String classId) {
        return quackmanLevelsRepository.findByClassId(classId);
    }
	public QuackmanLevels updateQuackmanLevel(String id, QuackmanLevels updatedLevel) throws Exception {
        Optional<QuackmanLevels> existingLevel = quackmanLevelsRepository.findById(id);
        if (existingLevel.isPresent()) {
            QuackmanLevels level = existingLevel.get();
            level.setTitle(updatedLevel.getTitle());
            return quackmanLevelsRepository.save(level);
        } else {
            throw new Exception("Level " + id + " not found");
        }
    }
}
