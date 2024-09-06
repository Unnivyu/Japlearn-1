package japlearn.demo.Service;

import japlearn.demo.Entity.QuackamoleContent;
import japlearn.demo.Repository.QuackamoleContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class QuackamoleContentService {

    @Autowired
    private QuackamoleContentRepository quackamoleContentRepository;

    public QuackamoleContent getContentByLevelId(String levelId) {
        return quackamoleContentRepository.findByLevelId(levelId).orElse(null);
    }

    public QuackamoleContent addCharacter(String levelId, String kana, String romaji) {
        QuackamoleContent content = quackamoleContentRepository.findByLevelId(levelId).orElse(new QuackamoleContent(levelId, new ArrayList<>(), new ArrayList<>()));
        content.getKana().add(kana);
        content.getRomaji().add(romaji);
        return quackamoleContentRepository.save(content);
    }

    public QuackamoleContent removeCharacter(String levelId, String kana, String romaji) {
        Optional<QuackamoleContent> optionalContent = quackamoleContentRepository.findByLevelId(levelId);
        if (optionalContent.isPresent()) {
            QuackamoleContent content = optionalContent.get();
            content.getKana().remove(kana);
            content.getRomaji().remove(romaji);
            return quackamoleContentRepository.save(content);
        }
        return null;
    }
}
