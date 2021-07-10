// Import packages
const express = require("express");
const router = express.Router();

// // Mailgun config
// const api_key = process.env.MAILGUN_SECRET_KEY;
// const domain = process.env.MAILGUN_SANDBOX;
// const mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

// // Route to send a message
// router.post("/message/send", async (req, res) => {
//   const { name, email, object, message } = req.fields;
//   try {
//     // Check if all info were sent
//     if (name && email && object && message) {
//       // Create the content of the email
//       const data = {
//         from: `${name} <${email}>`,
//         to: "pauline.bouchereau@gmail.com",
//         subject: object,
//         text: message,
//       };

//       // Send data via Mailgun
//       await mailgun.messages().send(data, (error, body) => {
//         if (!error) {
//           res.status(200).json(body);
//         } else {
//           res.status(400).json({ error: error });
//         }
//       });
//     } else {
//       res.status(400).json({ error: "Missing parameter." });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// Export the routes
module.exports = router;
