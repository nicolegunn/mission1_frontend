## Introduction

This is a prototype application that allows a user to upload an image of a vehicle to identify its type.

## Description

The application identifies whether the uploaded image contains a vehicle and returns the body type and make of the vehicle along with confidence percentages for each prediction.  
The make and model are automatically selected within drop-down boxes, which the user can override by selecting a different make and/or model if the information returned by the AI model is incorrect.  
With a make and model selected, the user can then press the "Calculate Premium" button, and an insurance premium based on the make and model is returned.

## Technologies Used

- React: For building the user interface.
- Node.js and Express: For backend development and API handling.
- Azure Custom Vision: For image recognition and vehicle type identification.
- Azure Static Web Apps: For hosting the front-end application.
- Azure App Service: For hosting the backend services.
- Azure Database for MySQL Flexible Server: For storing application data.

## Live Web Application

https://red-mud-0cb8e9600.5.azurestaticapps.net

## GitHub Repositories

### Frontend Repository:

https://github.com/nicolegunn/mission1_frontend.git

### Backend Repository:

https://github.com/nicolegunn/mission1_backend.git

## Installation and Setup

Follow these steps to set up and run the project in development mode:

1. Clone the repository:
   ```
   git clone https://github.com/nicolegunn/mission1_frontend.git
   ```
2. Navigate to the project directory:
   ```
   cd <filepath>
   ```
3. Install dependencies
   ```
   npm i
   ```
4. Run the project in development mode:
   ```
   npm run dev
   ```
