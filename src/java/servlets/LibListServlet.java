/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import com.google.gson.Gson;
import database.DB_Connection;
import java.util.*;
import java.sql.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LibListServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        try {
            // Establish database connection
            Connection con = DB_Connection.getConnection();
            Statement stmt = con.createStatement();

            ResultSet rs = stmt.executeQuery("SELECT library_id, username, password FROM librarians");

            List<Map<String, String>> userList = new ArrayList<>();
            while (rs.next()) {
                Map<String, String> user = new HashMap<>();
                user.put("library_id", rs.getString("library_id"));
                user.put("username", rs.getString("username"));
                user.put("password", rs.getString("password"));
                userList.add(user);
            }

            rs.close();
            stmt.close();
            con.close();

            // Convert userList to JSON and send response
            out.println(new Gson().toJson(userList));
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.println("{\"error\":\"Error querying database.\"}");
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(LibListServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
