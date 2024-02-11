import express from "express";
const app = express()
import mongoose from "mongoose"
import Product from "./models/productModel.js"
const PORT = 5000

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
mongoose.set("strictQuery", false)

// routes 
app.get("/", (req, res) => {
    res.status(200).send("This is the home page of our api")
});

app.get("/blog", (req, res) => {
    res.status(200).send("This is the blog website of the app")
})


// routes to get all products
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

// post products to database 
app.post("/product", async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }

})

// routes to get a single product
app.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})

//routes to update data in the database
app.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})





// delete a product from database 
app.delete("/products/:id", async (req,res) => {

    try {
        const { id } = req.params; // Extracting the id from the request parameters
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            // If no product is found with the provided ID, send a 404 response
            return res.status(404).json({ message: "Product not found" });
        }

        // If the product is successfully deleted, send a success response
        res.status(200).json({ message: "Product successfully deleted" });
    } catch (error) {
        // If an error occurs, send a 500 response with the error message
        res.status(500).json({ message: error.message });
    }


})


// MongoDB connection

mongoose.connect("mongodb+srv://compson9:Pascaline1@compsonapi.hqxozfc.mongodb.net/Node-Api?retryWrites=true&w=majority")
    .then(() => {
        app.listen(PORT, () => {
            console.log(`The server is running on port http://localhost:${PORT}`)
        })
        console.log("Connected to MongoDb");
    }).catch((error) => {
        console.log(error);
    })


