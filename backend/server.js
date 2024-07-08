import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer to store uploaded files in 'public/images' directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Path to your db.json file
const DB_FILE = path.join(__dirname, 'product.json');

// Read data from db.json
const readData = () => {
    return JSON.parse(fs.readFileSync(DB_FILE));
};

// Write data to db.json
const writeData = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Get all products
app.get('/products', (req, res) => {
    const data = readData();
    res.json(data.products);
});

// Add a new product with image upload
app.post('/products', upload.single('image'), (req, res) => {
    const data = readData();
    const newProduct = req.body;

    if (req.file) {
        newProduct.image = '/images/' + req.file.filename;
    }

    data.products.push(newProduct);
    writeData(data);
    res.status(201).json(newProduct);
});

// Update a product
app.put('/products/:id', upload.single('image'), (req, res) => {
    const data = readData();
    const productId = req.params.id;
    const productIndex = data.products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const updatedProduct = { ...data.products[productIndex], ...req.body };

    if (req.file) {
        updatedProduct.image = '/images/' + req.file.filename;  //needs to be checked
    }

    data.products[productIndex] = updatedProduct;
    writeData(data);
    res.json(updatedProduct);
});

// Delete a product
// Delete a product
app.delete('/products/:id', (req, res) => {
    const data = readData();
    const productId = req.params.id;
    const productIndex = data.products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const [product] = data.products.splice(productIndex, 1); // Remove the product and get the product

    // Check if the product has an associated image
    if (product.image) {
        const imagePath = path.join(__dirname, '../public', product.image);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Failed to delete image file:', err);
            } else {
                console.log('Image file deleted successfully');
            }
        });
    }

    // Write the updated data back to the file
    writeData(data);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});