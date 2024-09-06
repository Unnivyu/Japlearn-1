package japlearn.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.QuackslateScore;
import japlearn.demo.Repository.QuackslateScoreRepository;

@Service
public class QuackslateScoreService {

    private final QuackslateScoreRepository quackslateScoreRepository;

    @Autowired
    public QuackslateScoreService(QuackslateScoreRepository quackslateScoreRepository) {
        this.quackslateScoreRepository = quackslateScoreRepository;
    }

    public QuackslateScore addScore(QuackslateScore quackslateScore) {
        Optional<QuackslateScore> existingScore = quackslateScoreRepository.findByFnameAndLnameAndLevel(
            quackslateScore.getFname(), quackslateScore.getLname(), quackslateScore.getLevel());

        if (existingScore.isPresent()) {
            QuackslateScore scoreToUpdate = existingScore.get();
            scoreToUpdate.setScore(quackslateScore.getScore());
            return quackslateScoreRepository.save(scoreToUpdate);
        } else {
            return quackslateScoreRepository.save(quackslateScore);
        }
    }

    public List<QuackslateScore> getAllScores() {
        return quackslateScoreRepository.findAll();
    }

    public Optional<QuackslateScore> getScoreById(String id) {
        return quackslateScoreRepository.findById(id);
    }

    public List<QuackslateScore> getScoresByClasscode(String classcode) {
        return quackslateScoreRepository.findByClasscode(classcode);
    }

    public List<QuackslateScore> getScoresByLevel(String level) {
        return quackslateScoreRepository.findByLevel(level);
    }

    public QuackslateScore updateScore(String id, QuackslateScore quackslateScore) {
        quackslateScore.setId(id);
        return quackslateScoreRepository.save(quackslateScore);
    }

    public void deleteScore(String id) {
        quackslateScoreRepository.deleteById(id);
    }

    public List<QuackslateScore> getScoreByFnameAndLname(String fname, String lname) {
        return quackslateScoreRepository.findByFnameAndLname(fname, lname); // Changed to return List
    }
}
