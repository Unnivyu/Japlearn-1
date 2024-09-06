package japlearn.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.QuackslateContent;
import japlearn.demo.Repository.QuackslateContentRepository;

@Service
public class QuackslateContentService {

    private final QuackslateContentRepository quackslateContentRepository;

    @Autowired
    public QuackslateContentService(QuackslateContentRepository quackslateContentRepository) {
        this.quackslateContentRepository = quackslateContentRepository;
    }

    public QuackslateContent addQuackslateContent(QuackslateContent quackslateContent) {
        return quackslateContentRepository.save(quackslateContent);
    }

    public List<QuackslateContent> getAllQuackslateContent() {
        return quackslateContentRepository.findAll();
    }

    public Optional<QuackslateContent> getQuackslateContentById(int id) {
        return quackslateContentRepository.findById(id);
    }

    public List<QuackslateContent> getByLevel(String level) {
        return quackslateContentRepository.findByLevel(level);
    }

    public QuackslateContent updateQuackslateContent(QuackslateContent quackslateContent) {
        return quackslateContentRepository.save(quackslateContent);
    }

    public void deleteQuackslateContent(int id) {
        quackslateContentRepository.deleteById(id);
    }
}
