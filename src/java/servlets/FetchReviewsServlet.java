/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import database.tables.EditReviewsTable;
import mainClasses.Review;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FetchReviewsServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        EditReviewsTable reviewsTable = new EditReviewsTable();

        try {
            Map<String, List<Review>> reviewsByISBN = reviewsTable.databaseToReviewsByISBN();
            if (reviewsByISBN != null) {
                Gson gson = new Gson();
                String reviewsJson = gson.toJson(reviewsByISBN);
                response.getWriter().write(reviewsJson);
            } else {
                response.getWriter().write("[]");
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Error fetching reviews: " + e.getMessage());
        }
    }
}
