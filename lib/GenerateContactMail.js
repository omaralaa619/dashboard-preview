export const generateContactMail = (formData) => {
  const { name, email, number, message } = formData;

  return `<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Contact Message</title>
      <style type="text/css">
        body {
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          color: #333;
          padding: 20px;
        }
        .container {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          max-width: 600px;
          margin: auto;
          padding: 24px;
        }
        h2 {
          text-align: center;
          color: #444;
        }
        .info {
          margin: 16px 0;
        }
        .info p {
          margin: 8px 0;
          font-size: 16px;
        }
        .label {
          font-weight: bold;
          color: #666;
        }
        .message-box {
          background: #f1f1f1;
          border-left: 4px solid #888;
          padding: 12px;
          margin-top: 16px;
          white-space: pre-wrap;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>New Contact Message</h2>
        
        <div class="info">
          <p><span class="label">Name:</span> ${name}</p>
          <p><span class="label">Email:</span> ${email}</p>
          <p><span class="label">Phone Number:</span> ${number}</p>
        </div>
  
        <div>
          <p class="label">Message:</p>
          <div class="message-box">${message}</div>
        </div>
      </div>
    </body>
    </html>`;
};
