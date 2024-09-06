package japlearn.demo.Controller;

import japlearn.demo.Entity.QuackamoleContent;
import japlearn.demo.Service.QuackamoleContentService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quackamolecontent")
@CrossOrigin(origins = "http://localhost:8081")
public class QuackamoleContentController {

    @Autowired
    private QuackamoleContentService quackamoleContentService;

    @GetMapping("/getContent/{levelId}")
    public QuackamoleContent getContent(@PathVariable String levelId) {
        return quackamoleContentService.getContentByLevelId(levelId);
    }

    @PostMapping("/addCharacter")
    public QuackamoleContent addCharacter(@RequestBody Map<String, String> payload) {
        String levelId = payload.get("levelId");
        String kana = payload.get("kana");
        String romaji = payload.get("romaji");
        return quackamoleContentService.addCharacter(levelId, kana, romaji);
    }

    @DeleteMapping("/removeCharacter")
    public QuackamoleContent removeCharacter(@RequestBody Map<String, String> payload) {
        String levelId = payload.get("levelId");
        String kana = payload.get("kana");
        String romaji = payload.get("romaji");
        return quackamoleContentService.removeCharacter(levelId, kana, romaji);
    }
}
