export const generateMail = (order) => {
  const items = JSON.parse(order.cart.items);

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
      }

      .summary {
        border-top: 1px solid #c1c1c1;
        border-bottom: 1px solid #c1c1c1;
        padding: 24px 0;
        width: 100%;
        gap: 8px;
        margin: auto;
        margin-top: 32px;
      }
      td {
        text-align: left;
      }
      .itemPrice {
        text-align: right;
      }

      .summaryText {
        text-align: left;
        color: #71717a;
        margin-bottom: 16px;
      }
      .size {
        color: #71717a;
        font-size: 12px;
      }

      .totals {
        margin-top: 24px;
        text-align: right;
        border-top: 1px solid #e3dede;
      }
      .totals p {
        margin-top: 8px;
      }

      .image {
        width: 40px;
      }
      .itemPrice {
        font-weight: bold;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>LYNNE</h2>

      <p class="header">We've received your order.</p>
      <p class="date">Placed on ${new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }).format(order.date)}</p>

  
      <div class="summary">
      <table  width="100%">
      <p class="summaryText">Order Summary</p>
          ${items.map((item) => {
            let sizeAb = "";
            if (item.size[0] == "x") {
              sizeAb = `${item.size[0].toUpperCase()}${item.size[1].toUpperCase()}`;
            } else {
              sizeAb = item.size[0].toUpperCase();
            }
            return `
            <tr>
            <td>
              <img
                src=${item.image}
                alt="item"
                class="image"
              />
            </td>
            <td>
              <p>${item.title}</p>
              <p class="size">${item.size} x${item.quantity}</p>
            </td>
            <td>
              <p class="itemPrice">LE ${item.price}.00</p>
            </td>
          </tr>
            `;
          })}
           
  
            
          </table>
  
          <div class="totals">
            <p>Subtotal: LE ${order.cart.totalAmount}.00</p>
            <p>shipping: LE ${order.cart.shipping}.00</p>
            <p>Total: LE ${order.cart.totalAmount + order.cart.shipping}.00</p>
          </div>
        </div>
      </div>
    </body>
  </html>`;
};
