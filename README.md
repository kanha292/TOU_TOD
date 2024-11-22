Smart Energy Management and Alert System
Project Overview
This project is designed to help users optimize their energy consumption by providing real-time alerts and live tariff prices. The core feature of the system is an email-based alert system that notifies users about the best time to use high, medium, or low power-consuming appliances based on live energy tariff prices. The system also displays the live tariff prices on the website to assist users in making informed decisions about their energy usage.

Key Features:

Live Tariff Pricing: Displays the current energy price on the website in real-time.
Energy Usage Alerts: Sends users an email alert based on live tariff data, recommending which appliances to use for cost-effective energy consumption.
User Registration & Login: Users can register and log in to receive personalized alerts.
Recommendation System: Suggests appliances based on current tariff prices.
How to Run the Project Locally
To run this project on your local machine, follow these steps:

Prerequisites
Node.js (v14 or higher) should be installed.
npm (Node Package Manager) should be installed.
If you don’t have Node.js, download and install it from here.

Step 1: Clone the Repository
First, clone the repository to your local machine using Git.
git clone https://github.com/your-username/your-repository-name.git
Step 2: Install Dependencies
Navigate into the project directory and install the required dependencies.
cd your-repository-name
npm install
This will install the necessary packages such as express, nodemailer, bcrypt, node-schedule, etc.

Step 3: Set Up Environment Variables
Create a .env file in the root directory.
Add the following details to configure the email service and other necessary configurations.GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-email-app-password
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-email-app-password
Ensure you replace your-email@gmail.com and your-email-app-password with your actual Gmail email and application password.

Step 4: Run the Server
After setting up the environment variables, run the server using:
node server.js
Your server will start running on http://localhost:5005.

Step 5: Access the Website
The front-end of the website will be available through the index.html file. You can open it in your browser directly. If you have a more advanced set-up (e.g., using frameworks like React or Vue.js), you can build and serve your project using a development server like npm start or similar.

Additional Information
Features:
Live Energy Pricing: Real-time energy pricing based on hourly tariff changes.
Energy Consumption Alerts: Email alerts sent to users based on live data and product power consumption.
User Authentication: Users can register, login, and manage their accounts.
Technologies Used:
Node.js: For backend server-side logic.
Nodemailer: For sending email notifications.
bcrypt: For user password hashing.
node-schedule: For scheduling the periodic alerts.
Express.js: For setting up the API and handling requests.
About the Developer
Hello! My name is Kanhaiya Bishnoi, and I am a Computer Science student at BML Munjal University, Gurugram, from the 2021-2025 batch. I am passionate about developing innovative solutions to optimize energy usage and improve sustainability. This project is part of my learning journey to build smart systems that contribute to better energy management.

License
This project is licensed under the MIT License - see the LICENSE file for details.

I hope this README helps in providing a clear and concise explanation of your project! Feel free to modify it further to add any more personal or project-specific information.







