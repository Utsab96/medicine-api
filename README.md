
# Medicine API

This is a Node.js-based RESTful API for managing medicines, orders, and user accounts. The project is built with Express.js and MongoDB.

## Features

- **User Management**: User signup and login with password hashing using `bcryptjs`.
- **JWT Authentication**: Secured endpoints with `jsonwebtoken`.
- **CRUD Operations**: Manage medicines and orders with endpoints for creating, reading, updating, and deleting records.
- **Validation**: Email and phone validation during signup.

## Prerequisites

- Node.js
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Utsab96/medicine-api.git
create the environment file as .env for port host and mongoDB database connection