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

### 3. Get User Profile

- **Endpoint:** `/users/profile`
- **Method:** `GET`
- **Description:** This endpoint retrieves the profile information of the authenticated user.

#### Authentication

- This endpoint requires a valid JWT token to be provided in the Authorization header or as a cookie.

#### Responses

- **200 OK**

  - **Description:** User profile retrieved successfully.
  - **Response Body:**

  ```json
  {
    "statusCode": 200,
    "data": {
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "roles": ["string"]
    },
    "message": "Success"
  }
  ```

- **401 Unauthorized**
  - **Description:** Authorization token is missing or invalid.
  - **Response Body:**
  ```json
  {
    "message": "Authorization token is missing or invalid",
    "type": "Authorization_error"
  }
  ```

### 4. Logout User

- **Endpoint:** `/users/logout`
- **Method:** `GET`
- **Description:** This endpoint allows an authenticated user to log out by invalidating their session.

#### Authentication

- This endpoint requires a valid JWT token to be provided in the Authorization header or as a cookie.

#### Responses

- **200 OK**

  - **Description:** User logged out successfully.
  - **Response Body:**

  ```json
  {
    "statusCode": 200,
    "message": "Logged out successfully"
  }
  ```

- **401 Unauthorized**
  - **Description:** Authorization token is missing or invalid.
  - **Response Body:**
  ```json
  {
    "message": "Authorization token is missing or invalid",
    "type": "Authorization_error"
  }
  ```

## User Endpoints

### 1. Get User Profile

- **Endpoint:** `/users/profile`
- **Method:** `GET`
- **Description:** This endpoint retrieves the profile information of the authenticated user.

#### Authentication

- This endpoint requires a valid JWT token to be provided in the Authorization header or as a cookie.

#### Responses

- **200 OK**

  - **Description:** User profile retrieved successfully.
  - **Response Body:**

  ```json
  {
    "statusCode": 200,
    "data": {
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "roles": ["string"]
    },
    "message": "Success"
  }
  ```

- **401 Unauthorized**
  - **Description:** Authorization token is missing or invalid.
  - **Response Body:**
  ```json
  {
    "message": "Authorization token is missing or invalid",
    "type": "Authorization_error"
  }
  ```

## Captain Endpoints

### 1. Get Captain Profile

- **Endpoint:** `/captains/profile`
- **Method:** `GET`
- **Description:** This endpoint retrieves the profile information of the authenticated captain.

#### Authentication

- This endpoint requires a valid JWT token to be provided in the Authorization header or as a cookie.

#### Responses

- **200 OK**

  - **Description:** Captain profile retrieved successfully.
  - **Response Body:**

  ```json
  {
    "statusCode": 200,
    "data": {
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "captain": {
        "status": "string",
        "vehicle": {
          "color": "string",
          "plate": "string",
          "capacity": "number",
          "vehicleType": "string"
        }
      }
    },
    "message": "Success"
  }
  ```

- **404 Not Found**
  - **Description:** Captain profile not found.
  - **Response Body:**
  ```json
  {
    "message": "captain not found",
    "type": "NotFound_error"
  }
  ```

### Error Handling

All errors are handled using a centralized error handler, which returns appropriate status codes and messages based on the error type.

## Map Routes

### 1. Get Coordinates

- **Endpoint:** `/maps/get-coordinates`
- **Method:** `GET`
- **Description:** This endpoint retrieves the geographical coordinates for a given address.

#### Request Parameters

- **address**: `string` (at least 3 characters)

#### Responses

- **200 OK**

  - **Description:** Coordinates fetched successfully.
  - **Response Body:**

  ```json
  {
    "statusCode": 200,
    "data": {
      "ltd": "number (latitude)",
      "lng": "number (longitude)"
    },
    "message": "coordinates fetched successfully"
  }
  ```

- **400 Bad Request**
  - **Description:** Validation errors or address not provided.
  - **Response Body:**
  ```json
  {
    "errors": [
      {
        "msg": "address must be provided in query",
        "param": "address",
        "location": "query"
      }
    ]
  }
  ```

### 2. Get Distance and Time

- **Endpoint:** `/maps/get-distance-time`
- **Method:** `GET`
- **Description:** This endpoint retrieves the distance and estimated travel time between two locations.

#### Request Parameters

- **origin**: `string` (at least 3 characters)
- **destination**: `string` (at least 3 characters)

#### Responses

- **200 OK**

  - **Description:** Distance and time fetched successfully.
  - **Response Body:**

  ```json
  {
    "statusCode": 200,
    "data": {
      "distance": {
        "text": "string",
        "value": "number"
      },
      "duration": {
        "text": "string",
        "value": "number"
      },
      "status": "string"
    },
    "message": "distance and time fetched successfully"
  }
  ```

- **400 Bad Request**
  - **Description:** Validation errors or missing parameters.
  - **Response Body:**
  ```json
  {
    "errors": [
      {
        "msg": "origin must be provided in query params",
        "param": "origin",
        "location": "query"
      }
    ]
  }
  ```

### 3. Get Auto-Complete Suggestions

- **Endpoint:** `/maps/get-suggestion`
- **Method:** `GET`
- **Description:** This endpoint provides auto-complete suggestions based on the search input.

#### Request Parameters

- **search**: `string` (at least 1 character)

#### Responses

- **200 OK**

  - **Description:** Suggestions fetched successfully.
  - **Response Body:**

  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "description": "string",
        "place_id": "string"
      }
    ],
    "message": "Suggestions fetched successfully"
  }
  ```

- **400 Bad Request**
  - **Description:** Validation errors or missing search input.
  - **Response Body:**
  ```json
  {
    "errors": [
      {
        "msg": "\"search\" query must be provided",
        "param": "search",
        "location": "query"
      }
    ]
  }
  ```

## Ride Endpoints

### 1. Create Ride

- **Endpoint:** `/rides`
- **Method:** `POST`
- **Description:** This endpoint allows a user to create a new ride.

#### Request Body

```json
{
  "pickup": "string (at least 5 characters)",
  "destination": "string (at least 5 characters)",
  "vehicleType": "string (at least 2 characters)"
}
```

#### Responses

- **201 Created**

  - **Description:** Ride created successfully.
  - **Response Body:**

  ```json
  {
    "statusCode": 201,
    "data": {
      // ride details
    },
    "message": "ride created successfully"
  }
  ```

- **400 Bad Request**
  - **Description:** Validation errors.
  - **Response Body:**
  ```json
  {
    "errors": [
      {
        "msg": "pickup location is required",
        "param": "pickup",
        "location": "body"
      }
    ]
  }
  ```

### 2. Get Fare

- **Endpoint:** `/rides/get-fare`
- **Method:** `GET`
- **Description:** This endpoint calculates the fare for a ride based on pickup and destination.

#### Request Parameters

- **pickup**: `string` (at least 3 characters)
- **destination**: `string` (at least 3 characters)

#### Responses

- **200 OK**

  - **Description:** Fare calculated successfully.
  - **Response Body:**

  ```json
  {
    "statusCode": 200,
    "data": {
      // fare details
    },
    "message": "fare calculated successfully"
  }
  ```

- **400 Bad Request**
  - **Description:** Validation errors.
  - **Response Body:**
  ```json
  {
    "errors": [
      {
        "msg": "pickup is required in query params",
        "param": "pickup",
        "location": "query"
      }
    ]
  }
  ```

### 3. Accept Ride

- **Endpoint:** `/rides/accept`
- **Method:** `POST`
- **Description:** This endpoint allows a captain to accept a ride.

#### Request Body

```json
{
  "rideId": "string (valid MongoDB ObjectId)"
}
```

#### Responses

- **200 OK**

  - **Description:** Ride accepted successfully.
  - **Response Body:**

  ```json
  {
    "statusCode": 200,
    "data": {
      // ride details
    },
    "message": "ride accepted"
  }
  ```

- **400 Bad Request**
  - **Description:** Validation errors.
  - **Response Body:**
  ```json
  {
    "errors": [
      {
        "msg": "rideId is required",
        "param": "rideId",
        "location": "body"
      }
    ]
  }
  ```

### 4. Get Ride

- **Endpoint:** `/rides/:rideId`
- **Method:** `GET`
- **Description:** This endpoint retrieves details of a specific ride.

#### Request Parameters

- **rideId**: `string` (valid MongoDB ObjectId)

#### Responses

- **200 OK**

  - **Description:** Ride details retrieved successfully.
  - **Response Body:**

  ```json
  {
    "statusCode": 200,
    "data": {
      // ride details
    },
    "message": "Success"
  }
  ```

- **404 Not Found**
  - **Description:** Ride not found.
  - **Response Body:**
  ```json
  {
    "message": "ride not found",
    "type": "NotFound_error"
  }
  ```

### 5. Verify OTP

- **Endpoint:** `/rides/otp/:rideId`
- **Method:** `POST`
- **Description:** This endpoint allows a captain to verify the OTP for a ride.

#### Request Parameters

- **rideId**: `string` (valid MongoDB ObjectId)

#### Request Body

```json
{
  "otp": "string (6 digits)"
}
```

#### Responses

- **200 OK**

  - **Description:** OTP verified successfully.
  - **Response Body:**

  ```json
  {
    "statusCode": 200,
    "data": {
      // ride details
    },
    "message": "OTP verified successfully"
  }
  ```

- **403 Forbidden**
  - **Description:** Invalid OTP or unauthorized action.
  - **Response Body:**
  ```json
  {
    "message": "invalid OTP",
    "type": "Authorization_error"
  }
  ```

### 6. Finish Ride

- **Endpoint:** `/rides/finish/:rideId`
- **Method:** `POST`
- **Description:** This endpoint allows a captain to finish a ride.

#### Request Parameters

- **rideId**: `string` (valid MongoDB ObjectId)

#### Responses

- **200 OK**

  - **Description:** Ride finished successfully.
  - **Response Body:**

  ```json
  {
    "statusCode": 200,
    "data": {},
    "message": "ride finished successfully"
  }
  ```

- **404 Not Found**
  - **Description:** Ride not found.
  - **Response Body:**
  ```json
  {
    "message": "ride not found",
    "type": "NotFound_error"
  }
  ```
