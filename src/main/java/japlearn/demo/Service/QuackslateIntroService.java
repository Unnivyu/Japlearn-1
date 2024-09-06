package japlearn.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.QuackslateIntro;
import japlearn.demo.Repository.QuackslateIntroRepository;

@Service
public class QuackslateIntroService {

    @Autowired
    private QuackslateIntroRepository repository;  // Autowired repository to interact with MongoDB

    public QuackslateIntro addTranslation(String japPhrase, String engTransl) {
        QuackslateIntro newIntro = new QuackslateIntro(japPhrase, engTransl);
        return repository.save(newIntro);  // Save to MongoDB
    }

    public String findTranslation(String japPhrase) {
        QuackslateIntro intro = repository.findByJapPhrase(japPhrase);
        if (intro != null) {
            return intro.getEngTransl();
        }
        return "Translation not found";
    }

    public List<QuackslateIntro> getAllTranslations() {
        return repository.findAll();
    }
}
