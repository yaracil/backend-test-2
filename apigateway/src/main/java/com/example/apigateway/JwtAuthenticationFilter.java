package com.example.apigateway;

import com.example.apigateway.dto.SpringUserCustom;
import com.netflix.zuul.context.RequestContext;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.annotation.Resource;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final String HEADER_STRING = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer ";

    @Resource(name = "userService")
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res, FilterChain chain) throws IOException, ServletException {

        String header = req.getHeader(HEADER_STRING);
        String username = null;
        String authToken = null;
        if (header != null && header.startsWith(TOKEN_PREFIX)) {
            authToken = header.replace(TOKEN_PREFIX, "");
            try {
                username = jwtTokenUtil.getUsernameFromToken(authToken);
            } catch (IllegalArgumentException e) {
                logger.error("An error occured during getting username from token", e);
            } catch (ExpiredJwtException e) {
                logger.warn("Token is expired and not valid anymore", e);
                res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            } catch (SignatureException e) {
                logger.error("Authentication Failed. Username or Password not valid.");
            }
        } else {
            logger.warn("Couldn't find bearer string, will ignore the header");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            SpringUserCustom userDetails = (SpringUserCustom) userDetailsService.loadUserByUsername(username);
            if (jwtTokenUtil.validateToken(authToken, userDetails)) {
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, null, null);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
                logger.info("Authenticated user " + username + ", setting security context");
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            // AGREGAR EL ID DE USUARIO Y USUARIO PARA SU USO EN LOS SERVICIOS
            RequestContext ctx = RequestContext.getCurrentContext();
            ctx.addZuulRequestHeader("Username", username);
            ctx.addZuulRequestHeader("IdUser", userDetails.getIdUser().toString());
        }
        chain.doFilter(req, res);
    }
}
