package japlearn.demo.Controller;

import java.util.Collections;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import japlearn.demo.Entity.User;
import japlearn.demo.Service.UserService;
import japlearn.demo.DTO.LoginRequest;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:8081") 
public class UserController {

    private final UserService japlearnService;

    @Autowired
    public UserController(UserService japlearnService) {
        this.japlearnService = japlearnService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        String result = japlearnService.registerUser(user);

        if ("success".equals(result)) {
            return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", "Registration successful"));
        } else if ("duplicate".equals(result)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Collections.singletonMap("error", "User already exists"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", "Registration failed"));
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