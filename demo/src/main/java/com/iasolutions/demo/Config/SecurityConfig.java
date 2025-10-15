package com.iasolutions.demo.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.iasolutions.demo.Service.AdminService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AdminService adminService;

    public SecurityConfig(AdminService adminService) {
        this.adminService = adminService;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/", "/index.html", "/login.html", "/css/**", "/js/**").permitAll()
            .requestMatchers("/adminPage.html").hasRole("ADMIN")
            .anyRequest().authenticated()
        )
        .formLogin(form -> form
            .loginPage("/login.html")
            .loginProcessingUrl("/login")
            .defaultSuccessUrl("/adminPage.html", true)
            .failureUrl("/login.html?error=true")
            .permitAll()
        )
        .logout(logout -> logout
            .logoutUrl("/logout")
            .logoutSuccessUrl("/login.html?logout=true")
            .permitAll()
        )
        .userDetailsService(adminService)
        .csrf(csrf -> csrf.disable());    // <<== desactivado temporalmente

    return http.build();
}
}
