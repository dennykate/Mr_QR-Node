export default ({ code }) => {
  return `
  <!DOCTYPE html>
<html>
<head>
    <style>
        body {{
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }}
        .container {{
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }}
        h1 {{
            color: #333;
        }}
        p {{
            color: #666;
        }}
        .verification-code {{
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>Verification Code</h1>
        <p>Your verification code is: <span class="verification-code">${code}</span></p>
    </div>
</body>
</html>`;
};
