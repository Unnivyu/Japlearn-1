package japlearn.demo.Controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import japlearn.demo.DTO.LoginRequest;
import japlearn.demo.Entity.User;
import japlearn.demo.Service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:8081", "*"}) 
// @CrossOrigin(origins = "*")
// @CrossOrigin(origins = "https://japlearn.vercel.app:8081")
// @CrossOrigin(origins = {"https://frontend-seven-zeta-42.vercel.app", "http://localhost:8081"})
// @CrossOrigin(origins = {"https://rocky-anchorage-61422.herokuapp.com", "*"})


public class UserController {

    private final UserService japlearnService;

    @Autowired
    public UserController(UserService japlearnService) {
        this.japlearnService = japlearnService;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        try {
            japlearnService.sendForgotPasswordEmail(request.get("email"));
            return ResponseEntity.ok(Collections.singletonMap("message", "Password reset email sent"));
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "User not found"));
        }
    }

    @PostMapping("/reset-password")
public ResponseEntity<?> resetPassword(@RequestParam("token") String token, @RequestBody Map<String, String> request) {
    String newPassword = request.get("newPassword");
    String result = japlearnService.resetPassword(token, newPassword);
    if ("password_reset".equals(result)) {
        return ResponseEntity.ok(Collections.singletonMap("message", "Password reset successful"));
    } else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", "Invalid token"));
    }
}


    @GetMapping("/test")
    public String test() {
        System.out.println("Endpoint hit!");
    return "This is a test endpoint";
}


    @GetMapping("/pending-approval")
    public ResponseEntity<List<User>> getPendingUsers() {
        List<User> usersAwaitingApproval = japlearnService.getUsersAwaitingApproval();
        return ResponseEntity.ok(usersAwaitingApproval);
    }

    @PostMapping("/approve/{userId}")
    public ResponseEntity<?> approveUser(@PathVariable String userId) {
        japlearnService.approveUser(userId);
        return ResponseEntity.ok("User approved");
    }

    @GetMapping("/confirm")
    public String confirmEmail(@RequestParam("token") String token) {
        String result = japlearnService.confirmUser(token);
        if ("confirmed".equals(result)) {
            return "Email confirmed successfully!";
        } else {
            return "Invalid or expired confirmation link.";
        }
    }

    @PostMapping("/register")
public ResponseEntity<?> registerUser(@RequestBody User user) {
    try {
        String result = japlearnService.registerUser(user);
        if ("success".equals(result)) {
            return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", "Registration successful"));
        } else if ("duplicate".equals(result)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Collections.singletonMap("error", "User already exists"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", "Registration failed"));
        }
    } catch (Exception e) {
        e.printStackTrace();  // Log the exception
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "An unexpected error occurred"));
    }
}


    @PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
    try {
        User authenticatedUser = japlearnService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        authenticatedUser.setPassword(null); 
        return ResponseEntity.ok(authenticatedUser);
    } catch (UsernameNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "User not found"));
    } catch (BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", "Invalid credentials"));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", e.getMessage()));
    }
}


}