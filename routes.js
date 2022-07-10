const fs = require("fs");

const requestHandler = (req, res) => {
  // console.log(req.url, req.method, req.headers);
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");

    // Here you send the response back to the client
    // "return" is not required to return a response, we are just adding to skip the rest of the code
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    // Node.js will execute that function so often until it's done getting all the data out of our request
    // On data this listener receives a chunk of data
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk); // We can push data to a const because it's pointing to the reference
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString(); // We know that is a string in this case
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        // You can also write the two above lines in one step like this:
        // res.writeHead(302, { Location: "/" });
        res.end();
      });
    });
  }

  // Good article about headers: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server !</h1></body>");
  res.write("</html>");
  res.end(); // Here you send the response back to the client
  // You should not write anymore in the response after you send with .end();
  // process.exit(); // You can use this command to stop the server if you want
};

// This is how you export a function:
// module.exports = requestHandler;

// You can also export multiple things:
// module.exports = {
//   handler: requestHandler,
//   someText: "Some hard coded text",
// };

// This also works:
// module.exports.handler = requestHandler;
// module.exports.someText = "Some hard coded text";

// This is a shortcut by Node.js:
exports.handler = requestHandler;
exports.someText = "Some hard coded text";
