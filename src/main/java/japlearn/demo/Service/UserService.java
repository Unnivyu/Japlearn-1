package japlearn.demo.Service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import japlearn.demo.Entity.User;
import japlearn.demo.Repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender; // Add JavaMailSender for sending emails

    @Autowired
    public UserService(UserRepository userRepository, JavaMailSender mailSender) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.mailSender = mailSender;
    }

    public String registerUser(User user) {
        try {
            if (userRepository.findByEmail(user.getEmail()) != null) {
                return "duplicate"; 
            }
        
            String encryptedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encryptedPassword);
        
            // Generate confirmation token
            String confirmationToken = UUID.randomUUID().toString();
            user.setConfirmationToken(confirmationToken);
        
            userRepository.save(user);
        
            // Send confirmation email
            sendConfirmationEmail(user.getEmail(), confirmationToken);
        
            return "success";
        } catch (Exception e) {
            e.printStackTrace();  // Log the exception
            return "error";
        }
    }

    private void sendConfirmationEmail(String email, String token) {
        String confirmationUrl = "https://japlearn.vercel.app/api/users/confirm?token=" + token;
    
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(email);
            helper.setFrom("JapLearn <mizuchwaan@gmail.com>");
            helper.setSubject("Email Confirmation - JapLearn");
    
            // HTML email content
            String htmlContent = "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;'>"
                               + "<h2 style='text-align: center; color: #333;'>Welcome to JapLearn!</h2>"
                               + "<p style='text-align: center; color: #555;'>Please confirm your email address by clicking the button below:</p>"
                               + "<div style='text-align: center; margin: 30px;'>"
                               + "  <a href='" + confirmationUrl + "' style='background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;'>Confirm Email</a>"
                               + "</div>"
                               + "<p style='text-align: center; color: #777;'>If you did not request this, please ignore this email.</p>"
                               + "<p style='text-align: center; color: #777;'>Thank you, <br> The JapLearn Team</p>"
                               + "</div>";
    
            helper.setText(htmlContent, true); // Set 'true' to send HTML content
    
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();  // Log the exception
            throw new RuntimeException("Failed to send email", e);
        }
    }
    

    public User authenticate(String email, String rawPassword) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        if (!user.isEmailConfirmed()) {
            throw new IllegalStateException("Email not confirmed");
        }
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }
        return user;
    }

    public String confirmUser(String token) {
        User user = userRepository.findByConfirmationToken(token);
        if (user == null) {
            return "invalid";
        }

        user.setEmailConfirmed(true);
        user.setConfirmationToken(null); // Clear the token after confirmation
        userRepository.save(user);

        return "confirmed";
    }
}
