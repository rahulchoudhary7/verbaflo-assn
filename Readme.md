# LinkedIn PDF to HTML Resume Generator
This web application transforms LinkedIn PDF downloads into professionally formatted HTML resumes using Gemini's API.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Docker Deployment](#docker-deployment)
- [Online Deployed Version](#online-deployed-version)
- [Development](#development)
- [Future Improvements](#future-improvements)


## Features
- PDF upload and processing
- Gemini API integration for AI-powered resume generation
- Responsive frontend for easy user interaction
- Dockerized application for easy deployment

## Technology Stack
- Backend: Python, Flask
- Frontend: React.js, tailwind CSS
- PDF Processing: PyPDF2
- AI Integration: Gemini API
- Containerization: Docker

## Prerequisites
- Python 3.8+
- Node.js and npm
- Docker and Docker Compose (for containerized deployment)
- Gemini API key

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/linkedin-resume-generator.git
   cd linkedin-resume-generator
   ```
2. Set up a virtual environment (recommended):
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```
3. Install backend dependencies:
   ```sh
   cd api
   pip install -r requirements.txt
   ```
4. Install frontend dependencies:
   ```sh
   cd ../client
   npm install
   ```

## Usage
### Backend
1. Navigate to the `api` directory:
   ```sh
   cd api
   ```
2. Set your Gemini API key as an environment variable:
   ```sh
   export GEMINI_API_KEY=your_api_key_here
   ```
3. Run the Flask application:
   ```sh
   python app.py
   ```
4. The backend will be accessible at `http://localhost:5000`.

### Frontend
1. Navigate to the `client` directory:
   ```sh
   cd client
   ```
2. Start the frontend development server:
   ```sh
   npm run dev
   ```
3. Open a web browser and go to `http://localhost:5173`.

### Docker Deployment
1. Build and start the Docker containers:
   ```sh
   docker-compose build
   docker-compose up
   ```
2. Access the application:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

## Online Deployed Version

You can access the live, deployed version of this application at:

https://verbaflo-ai.vercel.app/

This version is always up-to-date with the latest features and improvements.

## Development

To contribute to the project:

1. Fork the repository
2. Create a new branch for your feature
3. Implement your changes
4. Write or update tests as necessary
5. Submit a pull request

## Future Improvements
- [ ] Implement user authentication for secure API key storage
- [ ] Add multiple resume templates and styles
- [ ] Integrate with LinkedIn API for direct profile import
- [ ] Implement caching to optimize API calls and reduce response times
- [ ] Implement error handling and comprehensive input validation
- [ ] Create a mobile-responsive design for the frontend
- [ ] Add support for multiple language resume generation

