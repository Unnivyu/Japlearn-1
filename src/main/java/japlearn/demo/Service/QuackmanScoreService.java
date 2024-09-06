package japlearn.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.QuackmanScore;
import japlearn.demo.Repository.QuackmanScoreRepository;

@Service
public class QuackmanScoreService {

    private final QuackmanScoreRepository quackmanScoreRepository;

    @Autowired
    public QuackmanScoreService(QuackmanScoreRepository quackmanScoreRepository) {
        this.quackmanScoreRepository = quackmanScoreRepository;
    }

    public QuackmanScore addScore(QuackmanScore quackmanScore) {
        Optional<QuackmanScore> existingScore = quackmanScoreRepository.findByFnameAndLnameAndLevel(
            quackmanScore.getFname(), quackmanScore.getLname(), quackmanScore.getLevel());

        if (existingScore.isPresent()) {
            QuackmanScore scoreToUpdate = existingScore.get();
            scoreToUpdate.setScore(quackmanScore.getScore());
            return quackmanScoreRepository.save(scoreToUpdate);
        } else {
            return quackmanScoreRepository.save(quackmanScore);
        }
    }

    public List<QuackmanScore> getAllScores() {
        return quackmanScoreRepository.findAll();
    }

    public Optional<QuackmanScore> getScoreById(String id) {
        return quackmanScoreRepository.findById(id);
    }

    public List<QuackmanScore> getScoresByClasscode(String classcode) {
        return quackmanScoreRepository.findByClasscode(classcode);
    }

    public List<QuackmanScore> getScoresByLevel(String level) {
        return quackmanScoreRepository.findByLevel(level);
    }

    public QuackmanScore updateScore(String id, QuackmanScore quackmanScore) {
        quackmanScore.setId(id);
        return quackmanScoreRepository.save(quackmanScore);
    }

    public void deleteScore(String id) {
        quackmanScoreRepository.deleteById(id);
    }

    public List<QuackmanScore> getScoreByFnameAndLname(String fname, String lname) {
        return quackmanScoreRepository.findByFnameAndLname(fname, lname); // Changed to return List
    }
}
