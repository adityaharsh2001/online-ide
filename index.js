const express = require('express');
const { post } = require('got');
const app = express();

app.get('/', (req, res) => {
  res.send('new');
});

app.post("/run", (req, res) => {
    
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));