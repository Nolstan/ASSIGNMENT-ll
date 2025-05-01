
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Product data
let products = [
  { id: 4, name: "Don waiting liquid", category: "Hardware", quantity: 7.18, price: "6.61" },
  { id: 5, name: "Samsung S3A", category: "Electronics", quantity: 3, price: "6.61" },
  { id: 6, name: "Penta", category: "Beverages", quantity: 39, price: "100" },
  { id: 7, name: "Konghazan", category: "Household", quantity: 10, price: "13.65" },
  { id: 8, name: "Kyrgyz old", category: "Electronics", quantity: 2, price: "200000" },
  { id: 9, name: "Massey Choi", category: "Electronics", quantity: 12, price: "16" },
  { id: 10, name: "Nikki", category: "Hardware", quantity: 20000, price: "90" },
  { id: 11, name: "Mises shares", category: "Clothing", quantity: 30, price: "3000" }
];

// Helping functions
function generateId() {
  return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
}

function standardizeCategory(category) {
  const mappings = {
    'electronic': 'Electronics',
    'hardware(s)': 'Hardware',
    'tolledown': 'Household',
    'submonitor': 'Electronics'
  };
  return mappings[category.toLowerCase()] || category;
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

app.get('/welcome_admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'welcome_admin.html'));
});

app.get('/page2.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'page2.html'));
});

app.get('/new-product.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'new-product.html'));
});

app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'dashboard.html'));
});


app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const newProduct = {
    id: generateId(),
    name: req.body.name,
    category: standardizeCategory(req.body.category),
    quantity: parseFloat(req.body.quantity),
    price: parseFloat(req.body.price).toFixed(2)
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.delete('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  products = products.filter(product => product.id !== productId);
  res.status(204).send();
});

app.get('/api/categories', (req, res) => {
  const categories = [
    'Electronics', 'Beverages', 'Household',
    'Clothing', 'Hardware'
  ];
  const data = categories.map(category => ({
    category,
    count: products.filter(p => standardizeCategory(p.category) === category).length
  }));
  res.json(data);
});

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1234') {
    res.redirect('/welcome_admin.html');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

