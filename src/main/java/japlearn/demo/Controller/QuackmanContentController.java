package japlearn.demo.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import japlearn.demo.Entity.QuackamoleContent;
import japlearn.demo.Entity.QuackmanContent;
import japlearn.demo.Service.QuackmanContentService;

@RestController
@RequestMapping("/api/quackmancontent")
@CrossOrigin(origins = "http://localhost:8081") 
public class QuackmanContentController {

	@Autowired
	QuackmanContentService quackmanContentService;
	
	@PostMapping("/addContent")
	public QuackmanContent createQuackmanContent(@RequestBody QuackmanContent quackmanContent) {
		return quackmanContentService.createQuackmanContent(quackmanContent);
	}
	
	@GetMapping("/getContentByLevelId/{levelId}")
	public QuackmanContent getContentByLevelId(@PathVariable ("levelId") String levelId) {
        return quackmanContentService.getContentByLevelId(levelId);
    }
	
	@PostMapping("/addContentToLevel")
	public QuackmanContent addContentToLevel(@RequestParam String levelId, @RequestParam String hint, @RequestParam String word) {
		return quackmanContentService.addContentToLevel(levelId, word, hint);
	}
	
	@PutMapping("/updateContent/{contentId}")
	public ResponseEntity<String> updateQuackmanContent(
			@PathVariable("contentId") String contentId,
			@RequestBody Map<String, List<String>> updateRequest) {
		List<String> words = updateRequest.get("word");
		List<String> hints = updateRequest.get("hint");

		if (words == null || hints == null) {
			return ResponseEntity.badRequest().body("Invalid request data");
		}

		return quackmanContentService.updateQuackmanContent(contentId, words, hints);
	}

	@DeleteMapping("/deleteContent/{contentId}")
	public ResponseEntity<String> deleteQuackmanContentItem(
			@PathVariable("contentId") String contentId, 
			@RequestBody Map<String, String> deleteContentRequest) {
		String word = deleteContentRequest.get("word");
		String hint = deleteContentRequest.get("hint");
		return quackmanContentService.removeQuackmanContentItem(contentId, word, hint);
	}


	
}