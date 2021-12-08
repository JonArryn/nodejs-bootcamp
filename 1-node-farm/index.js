const fs = require("fs");
const http = require("http");
const url = require("url");

// setting up an http server //

// creates server and creates response
const server = http.createServer((req, res) => {
  // defines url
  const pathName = req.url;

  // basic routing
  if (pathName === "/" || pathName === "/overview") {
    // response
    res.end(`This is the OVERVIEW`);
  } else if (pathName === `/product`) {
    res.end(`This is the PRODUCT`);
  } else if (pathName === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      const productData = JSON.parse(data);
      console.log(productData);
      res.end(data);
    });
  } else {
    // HTTP response type and headers
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello, world",
    });
    // always send headers before sending out response
    res.end("<h1>Page not found!</h1>");
  }
});

// had the server listen to request on a particular host
// res.end displayed
server.listen(8000, "127.0.0.1", () => {
  console.log(`Listening to requests on port 8000`);
});

////////////////////////////// reading/writing files synchronously and asynchronously //////////////////////////////

// blocking / synchronous
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File Written!");

// non-blocking / asynchronous

// welcome BACK to callback hell
// readFile are asynchronous funcitons, but in order to synchronously run functions that only execute after the previous is finished, you can create callback hell and create functions within the aysnchronous functions. Will most likely get back to using promises or async/await
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log(`ERROR`);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile(
//         `.txt/final.txt`,
//         `${data2}\n${data3}`,
//         `utf-8`,
//         (err) => {}
//       );
//       console.log(`Your File has been written!`);
//     });
//   });
// });
// console.log("will read file!");
