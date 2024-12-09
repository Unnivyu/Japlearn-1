package japlearn.demo.Controller;


import java.io.PrintWriter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import japlearn.demo.Entity.Score;
import japlearn.demo.Service.ScoreService;

@CrossOrigin(origins = {"http://localhost:8081", "*"})
@RestController
@RequestMapping("/api/scores")
public class ScoreController {

    private final ScoreService scoreService;

    @Autowired
    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @PostMapping("/save")
    public ResponseEntity<Score> saveScore(@RequestBody Score score) {
        try {
            return ResponseEntity.ok(scoreService.saveScore(score));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteScore(@RequestParam String id) {
        try {
            scoreService.deleteScore(id);
            return ResponseEntity.ok("{\"message\": \"Score deleted successfully\"}");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/all")
    public List<Score> getAllScores() {
        return scoreService.getAllScores();
    }

    @GetMapping("/export")
    public void exportScoresAsCsv(@RequestParam String date, HttpServletResponse response) {
    try {
        // Fetch the scores for the given date
        List<Score> scores = scoreService.getScoresByDate(date);

        // Set the response headers
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=\"scores_" + date + ".csv\"");

        // Write CSV data to the response output stream
        PrintWriter writer = response.getWriter();

        // Write CSV header
        writer.println("Name,Email,Date,Score");

        // Write data rows
        for (Score score : scores) {
            writer.println(score.getName() + "," + score.getEmail() + "," + score.getDate() + "," + score.getScore());
        }

        writer.flush();
    } catch (Exception e) {
        // Handle exceptions
        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        e.printStackTrace();
    }
}

    
@GetMapping("/getAvailableDates")
public ResponseEntity<List<String>> getAvailableDates() {
    List<String> availableDates = scoreService.getAllAvailableDates(); // Fetch dates from DB
    return ResponseEntity.ok(availableDates);
}


}
