# Face Detection and Photo Analysis API

This project provides a backend API for analyzing profile photos using the Google Cloud Vision API. The API can detect faces in photos and perform SafeSearch analysis to identify potentially inappropriate content. It is built with Next.js using the App Router and adheres to modern best practices for server-side functionality.
Features

    Face Detection: Identifies faces in uploaded profile photos and provides detailed annotations.
    SafeSearch Detection: Analyzes photos for inappropriate content such as adult, violent, or medical imagery.
    Batch Processing: Supports analyzing multiple user photos in a single request.
    Error Handling: Provides meaningful error messages for invalid input or processing failures.

## Technologies Used

    Next.js: Modern framework for server-side rendering and API routes.
    Google Cloud Vision API: For advanced image analysis and detection capabilities.
    TypeScript: Ensures type safety and improves code maintainability.

## Prerequisites

Before running the project, ensure you have the following:

    - Google Cloud Vision API Key:
    - Create a project on the Google Cloud Console.
    - Enable the Vision API.
    - Download the service account key JSON file.
    - Set the JSON file's content as the GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable.

    - Node.js:
        - Install Node.js (version 18 or later is recommended).

## Installation

    Clone the repository:

git clone https://github.com/your-username/face-detection-api.git
cd face-detection-api

## Install dependencies:

npm install

## Set up environment variables:

    Create a .env.local file in the root directory.
    Add the following:

    GOOGLE_APPLICATION_CREDENTIALS_JSON='YOUR_CREDENTIALS_JSON_CONTENT'

## Start the development server:

    npm run dev

    Open the app:
        Visit http://localhost:3000 in your browser.

## API Endpoints
### Analyze Photos

### POST /api/analyzePhotos
Request Body

``` {
  "users": [
    {
      "userid": "user1",
      "profilephoto": "https://example.com/photo1.jpg"
    },
    {
      "userid": "user2",
      "profilephoto": "https://example.com/photo2.jpg"
    }
  ]
} ``` 

### Response

``` {
  "success": true,
  "data": [
    {
      "userid": "user1",
      "results": {
        "faces": [/* Face annotations */],
        "safeSearch": {/* SafeSearch results */}
      }
    },
    {
      "userid": "user2",
      "results": {
        "error": "No faces detected in the photo."
      }
    }
  ]
} ```

## Error Codes

    - 400: Invalid input or missing data.
    - 405: Method not allowed.
    - 500: Internal server error.

## Deployment

To deploy the project, you can use any platform that supports Node.js and Next.js, such as:

    Vercel (recommended)
    AWS
    Google Cloud
    Heroku


## License

This project is licensed under the MIT License.