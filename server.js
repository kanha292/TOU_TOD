const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const schedule = require('node-schedule'); // For scheduling tasks

const app = express();
const PORT = 5005;

app.use(cors());
app.use(bodyParser.json());

// Nodemailer configuration using your email and app password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'helpsolar.in@gmail.com',  // Your email address
    pass: 'geun sokg bkuq uuiq'      // Your Gmail app password
  }
});

// In-memory user storage (for testing purposes)
let users = [];  // Array to store users

// Register route to handle user registration and email sending
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Check if the email already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.json({ success: false, message: 'Email already registered!' });
  }

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.json({ success: false, message: 'Error registering user' });
    }

    // Store user details (email and hashed password)
    users.push({ email, password: hashedPassword });

    // Prepare the email options
    const mailOptions = {
      from: 'helpsolar.in@gmail.com',  // Sender address (Your email address)
      to: email,                      // Recipient address (user's email)
      subject: 'Account Registration Details',
      text: `Your account has been created successfully!\n\nUsername: ${email}\nPassword: ${password}`
    };

    // Send the email to the user
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);  // Log the actual error
        return res.json({ success: false, message: `Error sending email: ${error.message}` });
      }

      console.log('Email sent: ' + info.response);
      return res.json({ success: true, message: 'Registration successful! Please check your email for the details.' });
    });
  });
});

// Login route to authenticate user
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.json({ success: false, message: 'Invalid Email or Password!' });
  }

  // Compare the password with the stored hashed password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      console.error('Error comparing password:', err);
      return res.json({ success: false, message: 'Error logging in' });
    }

    if (result) {
      return res.json({ success: true, message: 'Login successful!' });
    } else {
      return res.json({ success: false, message: 'Invalid Email or Password!' });
    }
  });
});

// --- New Code to Send Energy Alerts ---

// Define prices for different hours
const prices = {
  0: 9.59, 1: 8.50, 2: 7.90, 3: 7.50, 4: 6.80, 5: 6.50,
  6: 9.44, 7: 8.30, 8: 7.75, 9: 7.20, 10: 6.90, 11: 6.40,
  12: 4.46, 13: 5.00, 14: 5.50, 15: 5.80, 16: 5.20, 17: 4.90,
  18: 3.50, 19: 4.00, 20: 4.50, 21: 5.00, 22: 6.00, 23: 7.00
};

// Product list with approximate power consumption
const products = [
  { name: "Electric Kettle", power: 1500 },
  { name: "Microwave", power: 1200 },
  { name: "Refrigerator", power: 300 },
  { name: "Air Conditioner (1 Ton)", power: 1500 },
  { name: "Ceiling Fan", power: 75 },
  { name: "Smartphone Charger", power: 10 },
  { name: "Electric Bicycle", power: 750 }
];

// Function to generate the alert email content
function generateAlertEmailContent(currentHour) {
  const currentPrice = prices[currentHour];
  const lowCostThreshold = 5.00;
  const mediumCostThreshold = 7.00;

  let message = "";
  let recommendedProducts = [];
  if (currentPrice <= lowCostThreshold) {
    message = "Best time to use high-power appliances.";
    recommendedProducts = products.filter(product => product.power > 1000);
  } else if (currentPrice <= mediumCostThreshold) {
    message = "Good time to use medium-power appliances.";
    recommendedProducts = products.filter(product => product.power > 300 && product.power <= 1000);
  } else {
    message = "Avoid high-power appliances. Use low-power devices only.";
    recommendedProducts = products.filter(product => product.power <= 300);
  }

  // Create the email body with dynamic content
  return `
    <h3>Energy Usage Alert</h3>
    <p><strong>Current Hour:</strong> ${currentHour}:00 - ${currentHour + 1}:00</p>
    <p><strong>Current Price:</strong> ₹${currentPrice.toFixed(2)}/unit</p>
    <p><strong>Message:</strong> ${message}</p>
    <p><strong>Recommended Products:</strong></p>
    <ul>
      ${recommendedProducts.map(product => `<li>${product.name} (${product.power}W)</li>`).join("")}
    </ul>
  `;
}

// Function to send the alert email
function sendAlertEmail(userEmail, currentHour) {
  const mailOptions = {
    from: 'helpsolar.in@gmail.com',  // Sender address (Your email address)
    to: userEmail,                  // Recipient address (user's email)
    subject: 'Live Energy Usage Alert',
    html: generateAlertEmailContent(currentHour) // HTML content with dynamic data
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// Function to simulate user email (In a real scenario, you will get this from your user session or database)
let userEmail = 'user@example.com'; // This should be the registered email of the user

// Schedule a task to send the alert email every hour
schedule.scheduleJob('*/1 * * * *', () => {  // Every hour at 0 minutes
  const currentHour = new Date().getHours();

  // Loop through all users and send the alert to their email
  users.forEach(user => {
    sendAlertEmail(user.email, currentHour);  // Use registered email to send alert
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
