const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
};

app.use(cors(corsOptions));
app.use(express.json());

// GET route for products
app.get("/products", (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);
    res.status(200).json(jsonData.items);
  });
});

// GET route for a single product's campaign
app.get("/products/:id/campaign", (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);
    const product = jsonData.items.find(item => item.id === id);

    if (!product) {
      res.status(404).send("Product Not Found");
      return;
    }

    res.status(200).json(product.campaign || {});
  });
});

// POST route for creating a campaign for a product
app.post("/products/:id/campaign", (req, res) => {
  const id = parseInt(req.params.id);
  const campaign = req.body;

  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);
    const productIndex = jsonData.items.findIndex(item => item.id === id);

    if (productIndex === -1) {
      res.status(404).send("Product Not Found");
      return;
    }

    if (jsonData.items[productIndex].campaign) {
      res.status(400).send("Campaign already exists for this product");
      return;
    }

    jsonData.items[productIndex].campaign = campaign;

    fs.writeFile("db.json", JSON.stringify(jsonData), err => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(201).json(campaign);
    });
  });
});

// PUT route for updating a product's campaign
app.put("/products/:id/campaign", (req, res) => {
  const id = parseInt(req.params.id);
  const campaignUpdates = req.body;

  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);
    const productIndex = jsonData.items.findIndex(item => item.id === id);

    if (productIndex === -1) {
      res.status(404).send("Product Not Found");
      return;
    }

    if (!jsonData.items[productIndex].campaign) {
      res.status(404).send("Campaign not found for this product");
      return;
    }

    // Update campaign fields
    jsonData.items[productIndex].campaign = {
      ...jsonData.items[productIndex].campaign,
      ...campaignUpdates
    };

    fs.writeFile("db.json", JSON.stringify(jsonData), err => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(200).json(jsonData.items[productIndex].campaign);
    });
  });
});

// DELETE route for deleting a product's campaign
app.delete("/products/:id/campaign", (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);
    const productIndex = jsonData.items.findIndex(item => item.id === id);

    if (productIndex === -1) {
      res.status(404).send("Product Not Found");
      return;
    }

    if (!jsonData.items[productIndex].campaign) {
      res.status(404).send("Campaign not found for this product");
      return;
    }

    delete jsonData.items[productIndex].campaign;

    fs.writeFile("db.json", JSON.stringify(jsonData), err => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(204).send();
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
