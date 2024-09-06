package japlearn.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.QuackslateBasics2;
import japlearn.demo.Repository.QuackslateBasics2Repository;

@Service
public class QuackslateBasics2Service {

    @Autowired
    private QuackslateBasics2Repository repository;  // Autowired repository to interact with MongoDB

    public QuackslateBasics2 addTranslation2(String japPhrase, String engTransl) {
        QuackslateBasics2 newIntro = new QuackslateBasics2(japPhrase, engTransl);
        return repository.save(newIntro);  // Save to MongoDB
    }

    public String findTranslation2(String japPhrase) {
        QuackslateBasics2 intro = repository.findByJapPhrase(japPhrase);
        if (intro != null) {
            return intro.getEngTransl();
        }
        return "Translation not found";
    }

    public List<QuackslateBasics2> getAllTranslations2() {
        return repository.findAll();
    }
}
