package com.iasolutions.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iasolutions.demo.Model.Comments;
import com.iasolutions.demo.Repositories.CommentsRepository;

@Service
public class CommentsService {
    @Autowired
    private CommentsRepository commentsRepository;

    public Comments guardarComentario(Comments comentario) {
        return commentsRepository.save(comentario);
    }
}
