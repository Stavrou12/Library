package servlets;
import database.DB_Connection;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class StudentStatisticsServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        try {
            Connection con = DB_Connection.getConnection();
            String query = "SELECT student_type, COUNT(*) AS student_count FROM students GROUP BY student_type";
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(query);

            String statistics = "<table><tr><th>Student Type</th><th>Number of Students</th></tr>";
            while (rs.next()) {
                String studentType = rs.getString("student_type");
                int studentCount = rs.getInt("student_count");
                statistics += "<tr><td>" + studentType + "</td><td>" + studentCount + "</td></tr>";
            }
            statistics += "</table>";

            rs.close();
            stmt.close();
            con.close();

            out.println(statistics);
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.println("<p>Error querying database.</p>");
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(StudentStatisticsServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
