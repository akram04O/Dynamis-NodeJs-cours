import express from "express";

const app = express();
app.use(express.json());


const product = [];

app.get("/api/products", (req, res) => {

    res.status(200).json(product);
});

app.post("/api/products", (req, res) => {
    res.status(202)

    const { id, name, price, description } = req.body;

    if (id == '' || name == '' || price == '' || description == '') {
        return res.status(400).json({ message: "All fields are required" });
        
    } else {
        const newProduct = { id, name, price, description };
        product.push(newProduct);
        res.status(201).json(newProduct);
    }
});

app.patch('/api/products/:id', (req, res) => {
    const product = [
        {"id": 1, "name": "Product 1", "price": 100, "description": "Crrr"},
        {"id": 2, "name": "Product 2", "price": 200, "description": "Grrr"},
        {"id": 3, "name": "Product 3", "price": 300, "description": "Brrr"}
    ];
    res.status(202)
    const productID = req.params.id;
    const updateProduct = req.body; 
    console.log(`updateProduct: ${JSON.stringify(updateProduct)}`);


    if( product.includes(productID) ){
        product[productID] = updateProduct;
        res.status(200).json(updateProduct);
    } else{
        res.status(400).json({ message: "Product ID not found" });
    }
});





















//all products

app.get("/api/products", (req, res) => {
    const products = [
        {"id": 1, "name": "Product 1", "price": 100},
        {"id": 2, "name": "Product 2", "price": 200},
        {"id": 3, "name": "Product 3", "price": 300}
    ];
    res.status(200).json(products);
});




app.get("/api/products/:year", (req, res) => {
    const year = req.params.year;
    //select * from product where product.year = "<year>"
    const products = [
        {"id": 1, "name": "Product 1", "price": 100, "year": 2020},
        {"id": 2, "name": "Product 2", "price": 200, "year": 2021},
        {"id": 3, "name": "Product 3", "price": 300, "year": 2020}
    ];
    const filteredProducts = products.filter(product => product.year == year);
    res.json(filteredProducts);
})




app.get("/api/products/:id", (req, res) => {
    const id = req.params.id;
    // Logic to retrieve a product by ID
    const product = {"id": id, "name": "Product 1", "price": 100};
    res.json(product);
})

app.get("/api/product", (req, res) => {
    const searchParams = req.query.searchParams;
    //database + SEO + keyword search
    res.json({"searchParams": searchParams});
})


app.listen(3010, () => {
    console.log("Server is running on port 3010");
});