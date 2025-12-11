package servlets;

import database.DB_Connection;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class StatisticsServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String selectedGenre = request.getParameter("genre");

        try {
            Connection con = DB_Connection.getConnection();
            String query = "SELECT genre, COUNT(*) AS book_count FROM books WHERE genre LIKE ? GROUP BY genre";
            PreparedStatement preparedStatement = con.prepareStatement(query);
            preparedStatement.setString(1, "%" + selectedGenre + "%");

            ResultSet rs = preparedStatement.executeQuery();

            String statistics = "<table><tr><th>Genre</th><th>Number of Books</th></tr>";
            while (rs.next()) {
                String genre = rs.getString("genre");
                int bookCount = rs.getInt("book_count");
                statistics += "<tr><td>" + genre + "</td><td>" + bookCount + "</td></tr>";
            }
            statistics += "</table>";

            rs.close();
            preparedStatement.close();
            con.close();

            out.println(statistics);
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.println("<p>Error querying database.</p>");
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(StatisticsServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
