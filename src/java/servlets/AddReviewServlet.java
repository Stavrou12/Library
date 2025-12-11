package servlets; // Change to your package name

import database.tables.EditReviewsTable;
import mainClasses.Review;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class AddReviewServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        BufferedReader reader = request.getReader();
        StringBuilder jsonBuilder = new StringBuilder();
        String line;

        while ((line = reader.readLine()) != null) {
            jsonBuilder.append(line);
        }

        String json = jsonBuilder.toString();
        try {
            addReview(json);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(AddReviewServlet.class.getName()).log(Level.SEVERE, null, ex);
        }

        response.setStatus(HttpServletResponse.SC_OK);
    }

    private void addReview(String json) throws ClassNotFoundException {
        EditReviewsTable reviewsTable = new EditReviewsTable();
        Review review = jsonToReview(json);

        reviewsTable.createNewReview(review);
    }

    private Review jsonToReview(String json) {
        Gson gson = new Gson();
        return gson.fromJson(json, Review.class);
    }
}
