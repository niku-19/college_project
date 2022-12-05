const nodemailer = require("nodemailer");
function sendMail(email, orderId) {
  console.log(email);
  const message = `<p>Thanks for placing order. Your order id is ${orderId}<br><br>Regards,<br>Brubeck</p>`;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nikhilranjankumar1999@gmail.com",
      pass: "$1999@05@19$;?",
    },
  });

  const mailOptions = {
    from: "Praveen Singh", // sender address
    to: email, // list of receivers
    subject: "Thanks for placing order", // Subject line
    html: message, // plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log("mail sent");
  });
}
module.exports = sendMail;

// sendMail("spraveen593@gmail.com");
