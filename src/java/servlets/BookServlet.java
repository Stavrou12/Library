package servlets;
import database.tables.EditBooksTable;
import mainClasses.Book;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("/search")
public class BookServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String genre = request.getParameter("genre");
        String fromYearParam = request.getParameter("fromYear");
        String toYearParam = request.getParameter("toYear");

        int fromYear = -1;
        int toYear = -1;

        if (fromYearParam != null && !fromYearParam.isEmpty()) {
            fromYear = Integer.parseInt(fromYearParam);
        }

        if (toYearParam != null && !toYearParam.isEmpty()) {
            toYear = Integer.parseInt(toYearParam);
        }

        if (toYear != -1 && fromYear != -1 && toYear < fromYear) {
            response.getWriter().println("To Year must be greater than or equal to From Year.");
            return;
        }


        try {
            EditBooksTable booksTable = new EditBooksTable();
            ArrayList<Book> books = null;

            if (genre.equalsIgnoreCase("all") && fromYear != -1 && toYear != -1) {
                books = booksTable.databaseToAllBooks(fromYear, toYear);
            } else if (genre.equalsIgnoreCase("all") && fromYear == -1 && toYear == -1) {
                    books = booksTable.databaseToBooks4(genre);
            } else if (fromYear == -1 && toYear == -1) {
                books = booksTable.databaseToBooks(genre);
            } else if (fromYear == -1 && toYear != -1) {
                books = booksTable.databaseToBooks3(genre, toYear);
            } else if (fromYear != -1 && toYear == -1) {
                books = booksTable.databaseToBooks2(genre, fromYear);
            } else {
                books = booksTable.databaseToBooks(genre, fromYear, toYear);
            }

            Gson gson = new Gson();
            String json = gson.toJson(books);

            response.setContentType("application/json");
            response.getWriter().write(json);

        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().println("An error occurred.");
        }
    }
}
