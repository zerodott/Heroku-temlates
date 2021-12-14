const express = require('express')
const app = express()
const port = 3000;
const axios = require('axios');

app.get('/summa', (req, res) => {

    let a = Number(req.query.a);
    let b = Number(req.query.b);
    let summa = a + b;

    res.send(summa.toString());
})

app.get('/someaddress', (req, res) => {
    res.send('інша адреса')
})


app.get('/getName', (req, res) => {
    let name = req.query.first_name + ' ' + req.query.last_name;
    res.send(name)
})


app.get('/getPhrase', async (req, res) => {
	let count = 3;
	if(req.query.count){
		count = req.query.count;
	}
    console.log('start');
    try {
        let quote = await axios.get('https://goquotes-api.herokuapp.com/api/v1/random?count='+count)
            .then((response) => {
                console.log(response.data);
                return response.data.quotes;
            })
            .catch((error) => {
                console.log('error');
                return error;
            })
            res.send(quote)
    } catch {
        console.log('end');
        res.send('error')
    }

})





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})