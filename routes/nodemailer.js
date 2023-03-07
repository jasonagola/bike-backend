const nodemailer = require('nodemailer');

// Create a transport object to send emails
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your Gmail account email
    pass: 'your-password' // Replace with your Gmail account password
  }
});

// Define the message to be sent
const message = {
  from: 'Your Name <your-email@gmail.com>', // Replace with your name and email address
  to: user.email, // Replace with the user's email address
  subject: 'Welcome to My App',
  text: `Hi ${user.name},\n\nWelcome to My App! We're glad to have you on board.\n\nBest regards,\nYour Name`
};

// Send the message
transporter.sendMail(message, (error, info) => {
  if (error) {
    console.log('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});