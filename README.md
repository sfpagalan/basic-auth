# Basic Auth

Build an Express server for user authentication with Basic Authentication, using a PostgreSQL database for user storage.

## Installation

- Start by running:

```bash
npm install

- Set PORT environment
PORT=3000
SQL_CONNECTION_STRING={Your_PostgreSQL_database_connection_string}

## Usage

Signup
Method: POST
Route: /auth/signup
Input: JSON object or FORM Data with keys "username" and "password"
Returns: A JSON response with a token and the created user record.

POST http://yourauthserver.com/auth/signup 
# placeholder
{
      username: 'roronoazoro',
      password: 'imherefortheplot',
      email: 'zoro@example.com',
      fullname: 'Roronoa Zoro',
      role: 'user',
}

Sign In (Basic Auth)
Method: POST
Route: /auth/signin
Authentication: Basic Authentication header (Username and Password)
Returns: A JSON response with a token and the user object upon successful login.

## UML

![UML]()

## Deployed URL


## Collaborators

Chat GPT for test case

## Partner
