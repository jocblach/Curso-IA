package com.iasolutions.demo.Service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import com.iasolutions.demo.Model.Admin;
import com.iasolutions.demo.Repositories.AdminRepository;

@Service
public class AdminService implements UserDetailsService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
        var authority = new SimpleGrantedAuthority("ROLE_" + admin.getRol().name());
        return new User(admin.getUsername(), admin.getPassword(), List.of(authority));

    }
}

