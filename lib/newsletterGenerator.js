export const newsletterGenerator = (newsletter) => {
  return `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <style type="text/css">
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: black;
      }
      .container {
        border: dashed 1px rgb(145, 145, 145);
        width: 90%;
        margin: auto;
        padding: 16px;
        font-family: sans-serif;
        text-align: center;
      }
      .logo {
        width: 50px;
      }
      .header {
        font-size: 32px;
      }
      .date {
        color: #71717a;
        margin-top: 8px;
      }
.newsletter-body {
        text-align: left;
        margin-top: 24px;
        font-family: inherit;
      }
      .newsletter-body h1, .newsletter-body h2, .newsletter-body h3, .newsletter-body h4, .newsletter-body h5, .newsletter-body h6 {
        font-weight: bold;
        margin: 1em 0 0.5em 0;
      }
      .newsletter-body p {
        margin: 0.5em 0;
        font-size: 1em;
      }
      .newsletter-body ul, .newsletter-body ol {
        margin: 1em 0 1em 2em;
      }
      .newsletter-body li {
        margin: 0.3em 0;
      }
      .newsletter-body img {
        max-width: 100%;
        height: auto;
        margin: 1em 0;
        display: block;
      }
      .newsletter-body a {
        color: #2563eb;
        text-decoration: underline;
      }
      .newsletter-body blockquote {
        border-left: 4px solid #ddd;
        margin: 1em 0;
        padding-left: 1em;
        color: #555;
        font-style: italic;
      }
      .newsletter-body pre {
        background: #f4f4f4;
        padding: 1em;
        border-radius: 4px;
        overflow-x: auto;
        font-family: monospace;
      }
      .newsletter-body code {
        background: #f4f4f4;
        padding: 2px 4px;
        border-radius: 4px;
        font-family: monospace;
      }
      .newsletter-body table {
        border-collapse: collapse;
        width: 100%;
        margin: 1em 0;
      }
      .newsletter-body th, .newsletter-body td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      
    </style>
  </head>
  <body>
    <div class="container">
      <h2>THAWB</h2>

      <p class="header">${newsletter.title}</p>


  <div class="newsletter-body">${newsletter.body}</div>
    </div>
 
  </body>
  </html>`;
};
