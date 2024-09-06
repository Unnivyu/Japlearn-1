package japlearn.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.QuackamoleContent;
import japlearn.demo.Entity.QuackmanContent;
import japlearn.demo.Repository.QuackmanContentRepository;

@Service
public class QuackmanContentService {

	@Autowired
	QuackmanContentRepository quackmanServiceRepository;
	
	public QuackmanContent createQuackmanContent(QuackmanContent quackmanContent) {				
		return quackmanServiceRepository.save(quackmanContent);		
	}
	
	public ResponseEntity<String> removeQuackmanContentItem(String contentId, String word, String hint) {
		try {
			Optional<QuackmanContent> quackmanContentOptional = quackmanServiceRepository.findById(contentId);

			if (quackmanContentOptional.isPresent()) {
				QuackmanContent quackmanContent = quackmanContentOptional.get();
				List<String> words = quackmanContent.getWord();
				List<String> hints = quackmanContent.getHint();

				boolean found = false;
				while (true) {
					int index = words.indexOf(word);
					if (index != -1 && hints.get(index).equals(hint)) {
						words.remove(index);
						hints.remove(index);
						found = true;
					} else {
						break;
					}
				}

				if (found) {
					quackmanServiceRepository.save(quackmanContent);
					return ResponseEntity.ok("Successfully deleted item");
				} else {
					return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to delete item: Word and hint not found");
				}
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to delete item: Content not found");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while deleting item: " + e.getMessage());
		}
	}
		
	public QuackmanContent getContentByLevelId(String levelId) {
		return quackmanServiceRepository.findByLevelId(levelId).orElse(null);
	}
	
	public QuackmanContent addContentToLevel(String levelId, String newWord, String newHint) {
		Optional<QuackmanContent> quackmanContent = quackmanServiceRepository.findByLevelId(levelId);
	
		if(quackmanContent.isPresent()) {
			QuackmanContent quackman = quackmanContent.get();
			quackman.addWord(newWord);
			quackman.addHint(newHint);
			return quackmanServiceRepository.save(quackman);
		}
		
		return null;
	}

	public ResponseEntity<String> updateQuackmanContent(String contentId, List<String> newWords, List<String> newHints) {
		try {
			Optional<QuackmanContent> contentOptional = quackmanServiceRepository.findById(contentId);
	
			if (contentOptional.isPresent()) {
				QuackmanContent quackmanContent = contentOptional.get();
				quackmanContent.setWord(newWords);
				quackmanContent.setHint(newHints);
				quackmanServiceRepository.save(quackmanContent);
				return ResponseEntity.ok("Successfully updated content");
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Content not found");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while updating content: " + e.getMessage());
		}
	}
	
	
}
