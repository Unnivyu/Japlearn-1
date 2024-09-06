package japlearn.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.QuackslateLevel;
import japlearn.demo.Repository.QuackslateLevelRepository;

@Service
public class QuackslateLevelService {

    private final QuackslateLevelRepository quackslateLevelRepository;

    @Autowired
    public QuackslateLevelService(QuackslateLevelRepository quackslateLevelRepository) {
        this.quackslateLevelRepository = quackslateLevelRepository;
    }

    public QuackslateLevel addQuackslateLevel(QuackslateLevel quackslateLevel) {
        return quackslateLevelRepository.save(quackslateLevel);
    }

    public List<QuackslateLevel> getAllQuackslateLevels() {
        return quackslateLevelRepository.findAll();
    }

    public Optional<QuackslateLevel> getQuackslateLevelById(int levelID) {
        return quackslateLevelRepository.findById(levelID);
    }

    
    public QuackslateLevel updateQuackslateLevel(int levelID, QuackslateLevel quackslateLevel) throws Exception {
        Optional<QuackslateLevel> existingLevel = quackslateLevelRepository.findById(levelID);
        if (existingLevel.isPresent()) {
            QuackslateLevel level = existingLevel.get();
            level.setTitle(quackslateLevel.getTitle());
            return quackslateLevelRepository.save(level);
        } else {
            throw new Exception("Level " + levelID + " not found");
        }
    }
    public void deleteQuackslateLevel(int levelID) {
        quackslateLevelRepository.deleteById(levelID);
    }
}
