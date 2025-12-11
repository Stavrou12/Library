/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;


import mainClasses.BookInLibrary;
import com.google.gson.Gson;
import database.DB_Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import mainClasses.Book;



public class GuestBooksServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ArrayList<BookInLibrary> availableBooks = new ArrayList<>();

        try {
            Connection connection = DB_Connection.getConnection();
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM booksinlibraries");

            while (resultSet.next()) {
                BookInLibrary book = new BookInLibrary();
                book.setIsbn(resultSet.getString("isbn"));
                book.setLibrary_id(resultSet.getInt("library_id"));
                book.setAvailable(resultSet.getString("available"));
                availableBooks.add(book);
            }

            for (BookInLibrary book : availableBooks) {
                Book bookDetails = getBookDetailsByISBN(book.getIsbn());
                book.setTitle(bookDetails.getTitle());
            }

            statement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        Gson gson = new Gson();
        String json = gson.toJson(availableBooks);
        response.getWriter().write(json);
    }

    private Book getBookDetailsByISBN(String isbn) throws SQLException, ClassNotFoundException {
        Connection con = DB_Connection.getConnection();
        Statement stmt = con.createStatement();

        String query = "SELECT * FROM books WHERE isbn = '" + isbn + "'";
        ResultSet rs = stmt.executeQuery(query);

        if (rs.next()) {
            Book book = new Book();
            book.setIsbn(rs.getString("isbn"));
            book.setTitle(rs.getString("title"));
            book.setAuthors(rs.getString("authors"));
            book.setGenre(rs.getString("genre"));
            book.setPages(rs.getInt("pages"));
            book.setPublicationyear(rs.getInt("publicationyear"));
            book.setUrl(rs.getString("url"));
            book.setPhoto(rs.getString("photo"));
            return book;
        }

        return null; // Book not found
    }

}
