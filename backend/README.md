# API Documentation

## User Authentication Endpoints

### 1. Register User

- **Endpoint:** `/users/register`
- **Method:** `POST`
- **Description:** This endpoint allows a new user to register by providing their details.

#### Request Body
```json
{
  "fullname": {
    "firstname": "string (at least 3 characters)",
    "lastname": "string (optional)"
  },
  "email": "string (valid email format)",
  "password": "string (at least 6 characters)"
}
```

#### Validation Rules
- `email`: Must be a valid email format.
- `fullname.firstname`: Must be at least 3 characters long.
- `password`: Must be at least 6 characters long.

#### Responses
- **201 Created**
  - **Description:** User registered successfully.
  - **Response Body:**
  ```json
  {
    "statusCode": 201,
    "data": {
      "token": "string (JWT token)",
      "user": {
        "fullname": {
          "firstname": "string",
          "lastname": "string"
        },
        "email": "string"
      }
    },
    "message": "User Registered Successfully!"
  }
  ```

- **400 Bad Request**
  - **Description:** Validation errors or user already exists.
  - **Response Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field name",
        "location": "body"
      }
    ]
  }
  ```

### 2. Login User

- **Endpoint:** `/users/login`
- **Method:** `POST`
- **Description:** This endpoint allows an existing user to log in.

#### Request Body
```json
{
  "email": "string (valid email format)",
  "password": "string"
}
```

#### Responses
- **200 OK**
  - **Description:** User logged in successfully.
  - **Response Body:**
  ```json
  {
    "statusCode": 200,
    "data": {
      "token": "string (JWT token)",
      "user": {
        "fullname": {
          "firstname": "string",
          "lastname": "string"
        },
        "email": "string"
      }
    },
    "message": "Login Successful!"
  }
  ```

- **400 Bad Request**
  - **Description:** Missing email or password, or user not found.
  - **Response Body:**
  ```json
  {
    "message": "Error message"
  }
  ```

### Error Handling
All errors are handled using a centralized error handler, which returns appropriate status codes and messages based on the error type.
