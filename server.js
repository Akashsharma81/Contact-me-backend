require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { name, email, description } = req.body;

  // Nodemailer transporter setup
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Tumhara email
      pass: process.env.PASSWORD, // Tumhara email password ya App password
    },
  });

  let mailOptions = {
    from: email,
    to: process.env.EMAIL, // Tumhara email jisme receive karna hai
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nDescription: ${description}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
