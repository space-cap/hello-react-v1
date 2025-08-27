package com.ezlevup.helloreact.service;

import com.ezlevup.helloreact.dto.SignupRequestDto;
import com.ezlevup.helloreact.entity.User;
import com.ezlevup.helloreact.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    
    private final UserRepository userRepository;
    
    @Transactional
    public User signup(SignupRequestDto signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }
        
        User user = new User(
            signupRequest.getEmail(),
            signupRequest.getPassword(),
            signupRequest.getNickname()
        );
        
        return userRepository.save(user);
    }
    
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}