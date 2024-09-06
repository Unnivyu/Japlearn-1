package japlearn.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.QuackslateBasics1;
import japlearn.demo.Repository.QuackslateBasics1Repository;

@Service
public class QuackslateBasics1Service {

    @Autowired
    private QuackslateBasics1Repository repository;  // Autowired repository to interact with MongoDB

    public QuackslateBasics1 addTranslation1(String japPhrase, String engTransl) {
        QuackslateBasics1 newIntro = new QuackslateBasics1(japPhrase, engTransl);
        return repository.save(newIntro);  // Save to MongoDB
    }

    public String findTranslation1(String japPhrase) {
        QuackslateBasics1 intro = repository.findByJapPhrase(japPhrase);
        if (intro != null) {
            return intro.getEngTransl();
        }
        return "Translation not found";
    }

     public List<QuackslateBasics1> getAllTranslations1() {
        return repository.findAll();
    }
}
