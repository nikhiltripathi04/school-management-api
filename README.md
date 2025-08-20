# School Management API

## Description

This project is a back-end application developed with Node.js and Express.js that provides a RESTful API for managing school data. The system allows for the addition of new schools and the retrieval of a sorted list of schools based on their proximity to a user-specified geographical location. The application is connected to a MySQL database and is deployed for live access.

---

## Features

* Add a new school with name, address, and geographic coordinates.
* List all schools sorted by distance from a user-provided latitude and longitude.
* Utilizes the Haversine formula for accurate distance calculation.
* Secure handling of database credentials using environment variables.

---

## API Endpoints

The base URL for the deployed API is: `https://school-management-api-fjh9.onrender.com`

### 1. Add School

Adds a new school record to the database.

* **Endpoint:** `POST /api/addSchool`
* **Method:** `POST`
* **Request Body:**

    ```json
    {
        "name": "Global Tech School",
        "address": "123 Innovation Drive, Tech City",
        "latitude": 28.6139,
        "longitude": 77.2090
    }
    ```

* **Success Response (201 Created):**

    ```json
    {
        "message": "School added successfully!",
        "schoolId": 1
    }
    ```

### 2. List Schools

Retrieves a list of all schools, sorted by proximity to the given user coordinates.

* **Endpoint:** `GET /api/listSchools`
* **Method:** `GET`
* **Query Parameters:**

    * `latitude` (float, required): The latitude of the user's location.
    * `longitude` (float, required): The longitude of the user's location.

    **Example Request:**
    `/api/listSchools?latitude=28.5355&longitude=77.3910`

* **Success Response (200 OK):**

    ```json
    [
        {
            "id": 1,
            "name": "Global Tech School",
            "address": "123 Innovation Drive, Tech City",
            "latitude": 28.6139,
            "longitude": 77.209,
            "distance": 20.35617265882343
        },
        {
            "id": 2,
            "name": "Future Minds Academy",
            "address": "456 Knowledge Ave, Wisdom Town",
            "latitude": 28.4595,
            "longitude": 77.0266,
            "distance": 33.78901234567890
        }
    ]
    ```

---

## Technologies Used

* **Back-End:** Node.js, Express.js
* **Database:** MySQL
* **Node.js MySQL Driver:** `mysql2`
* **Deployment:** Render
* **Database Hosting:** Railway

---

## Setup and Local Installation

To run this project on a local machine, please follow these steps:

### Prerequisites

* Node.js (v18 or later)
* npm
* Git
* A running local instance of MySQL server

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/school-management-api.git](https://github.com/your-username/school-management-api.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd school-management-api
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Create the environment file:**
    Create a `.env` file in the root of the project and add the following variables with your local database credentials:
    ```ini
    DB_HOST=localhost
    DB_USER=your_mysql_username
    DB_PASSWORD=your_mysql_password
    DB_NAME=school_db
    DB_PORT=3306
    PORT=3000
    ```

5.  **Set up the database:**
    Connect to your local MySQL server and run the following SQL script to create the database and table:
    ```sql
    CREATE DATABASE IF NOT EXISTS school_db;
    USE school_db;
    CREATE TABLE schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL
    );
    ```

6.  **Run the application:**
    ```bash
    npm start
    ```
    The server will start on `http://localhost:3000`.