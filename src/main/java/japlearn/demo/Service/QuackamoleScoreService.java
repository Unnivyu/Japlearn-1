package japlearn.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.QuackamoleScore;
import japlearn.demo.Repository.QuackamoleScoreRepository;

@Service
public class QuackamoleScoreService {

    private final QuackamoleScoreRepository quackamoleScoreRepository;

    @Autowired
    public QuackamoleScoreService(QuackamoleScoreRepository quackamoleScoreRepository) {
        this.quackamoleScoreRepository = quackamoleScoreRepository;
    }

    public QuackamoleScore addScore(QuackamoleScore quackamoleScore) {
        Optional<QuackamoleScore> existingScore = quackamoleScoreRepository.findByFnameAndLnameAndLevel(
            quackamoleScore.getFname(), quackamoleScore.getLname(), quackamoleScore.getLevel());

        if (existingScore.isPresent()) {
            QuackamoleScore scoreToUpdate = existingScore.get();
            scoreToUpdate.setScore(quackamoleScore.getScore());
            return quackamoleScoreRepository.save(scoreToUpdate);
        } else {
            return quackamoleScoreRepository.save(quackamoleScore);
        }
    }

    public List<QuackamoleScore> getAllScores() {
        return quackamoleScoreRepository.findAll();
    }

    public Optional<QuackamoleScore> getScoreById(String id) {
        return quackamoleScoreRepository.findById(id);
    }

    public List<QuackamoleScore> getScoresByClasscode(String classcode) {
        return quackamoleScoreRepository.findByClasscode(classcode);
    }

    public List<QuackamoleScore> getScoresByLevel(String level) {
        return quackamoleScoreRepository.findByLevel(level);
    }

    public QuackamoleScore updateScore(String id, QuackamoleScore quackamoleScore) {
        quackamoleScore.setId(id);
        return quackamoleScoreRepository.save(quackamoleScore);
    }

    public void deleteScore(String id) {
        quackamoleScoreRepository.deleteById(id);
    }

    public List<QuackamoleScore> getScoreByFnameAndLname(String fname, String lname) {
        return quackamoleScoreRepository.findByFnameAndLname(fname, lname);
    }
}
