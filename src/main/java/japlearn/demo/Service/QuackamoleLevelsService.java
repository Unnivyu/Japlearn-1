package japlearn.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.QuackamoleLevels;
import japlearn.demo.Repository.QuackamoleLevelsRepository;

@Service
public class QuackamoleLevelsService {

    @Autowired
    private QuackamoleLevelsRepository quackamoleLevelsRepository;

    public QuackamoleLevels createQuackamoleLevel(QuackamoleLevels quackamoleLevels) {
        return quackamoleLevelsRepository.save(quackamoleLevels);
    }

    public QuackamoleLevels findQuackamoleLevelById(String id) throws Exception {
        Optional<QuackamoleLevels> quackamoleLevel = quackamoleLevelsRepository.findById(id);
        if (quackamoleLevel.isPresent()) {
            return quackamoleLevel.get();
        } else {
            throw new Exception("Level " + id + " not found");
        }
    }

    public String removeQuackamoleLevelById(String id) {
        Optional<QuackamoleLevels> quackamoleLevel = quackamoleLevelsRepository.findById(id);
        if (quackamoleLevel.isPresent()) {
            quackamoleLevelsRepository.deleteById(id);
            return "Successfully deleted level";
        }
        return "Failed to delete";
    }

    public List<QuackamoleLevels> findLevelsByClassId(String classId) {
        return quackamoleLevelsRepository.findByClassId(classId);
    }
    public QuackamoleLevels updateQuackamoleLevel(String id, QuackamoleLevels updatedLevel) throws Exception {
        Optional<QuackamoleLevels> existingLevel = quackamoleLevelsRepository.findById(id);
        if (existingLevel.isPresent()) {
            QuackamoleLevels level = existingLevel.get();
            level.setTitle(updatedLevel.getTitle());
            return quackamoleLevelsRepository.save(level);
        } else {
            throw new Exception("Level " + id + " not found");
        }
    }

    public String getTitleById(String id) throws Exception {
        Optional<QuackamoleLevels> quackamoleLevel = quackamoleLevelsRepository.findById(id);
        if (quackamoleLevel.isPresent()) {
            return quackamoleLevel.get().getTitle();
        } else {
            throw new Exception("Level " + id + " not found");
        }
    }
}
