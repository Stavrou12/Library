package servlets;

import database.DB_Connection;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

public class LibraryBookCountsServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        List<BookCountData> bookCounts = new ArrayList<>();

        try {
            Connection con = DB_Connection.getConnection();
            String query = "SELECT library_id, isbn, COUNT(*) AS book_count FROM booksinlibraries GROUP BY library_id, isbn";
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(query);

            while (rs.next()) {
                int libraryId = rs.getInt("library_id");
                String isbn = rs.getString("isbn");
                int bookCount = rs.getInt("book_count");
                bookCounts.add(new BookCountData(libraryId, isbn, bookCount));
            }

            rs.close();
            stmt.close();
            con.close();

            Gson gson = new Gson();
            String jsonData = gson.toJson(bookCounts);
            out.println(jsonData);
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.println("{\"error\": \"Error querying database.\"}");
        } catch (ClassNotFoundException ex) {
            ex.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.println("{\"error\": \"Database connection error.\"}");
        }
    }

    // Define a class to hold the book count data
    class BookCountData {

        int library_id;
        String isbn;
        int book_count;

        BookCountData(int library_id, String isbn, int book_count) {
            this.library_id = library_id;
            this.isbn = isbn;
            this.book_count = book_count;
        }
    }
}
