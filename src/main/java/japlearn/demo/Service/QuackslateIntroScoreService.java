package japlearn.demo.Service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.QuackslateIntroScore;
import japlearn.demo.Repository.QuackslateIntroScoreRepository;

@Service
public class QuackslateIntroScoreService {

    private static final Logger logger = LoggerFactory.getLogger(QuackslateIntroScoreService.class);

    @Autowired
    private QuackslateIntroScoreRepository repository;

    public QuackslateIntroScore saveScore(QuackslateIntroScore score) {
        try {
            Optional<QuackslateIntroScore> existingScoreOpt = repository.findByFnameAndLnameAndClasscode(score.getFname(), score.getLname(), score.getClasscode());

            if (existingScoreOpt.isPresent()) {
                QuackslateIntroScore existingScore = existingScoreOpt.get();
                logger.info("Existing score found: {}", existingScore);
                // Update the existing score with the new score
                existingScore.setScore(score.getScore());
                return repository.save(existingScore);
            } else {
                QuackslateIntroScore savedScore = repository.save(score);
                logger.info("New score saved: {}", savedScore);
                return savedScore;
            }

        } catch (Exception e) {
            logger.error("Error saving score: {}", e.getMessage(), e);
            throw e;
        }
    }

    public List<QuackslateIntroScore> getAllScores() {
        return repository.findAll();
    }

    public QuackslateIntroScore getScoreById(String id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteScore(String id) {
        repository.deleteById(id);
    }

    public List<QuackslateIntroScore> getScoresByClassCode(String classCode) {
        return repository.findByClasscode(classCode);
    }
}
