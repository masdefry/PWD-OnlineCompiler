const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

// Helpers
const {generateFile} = require('./helpers/generateFile');
const {executeJs} = require('./helpers/executeJs');

app.get('/', (req, res) => {

    return res.status(200).send({
        success: false, 
        error: 'Welcome to Online Compiler Api',
        data: null 
    })

})

app.post('/run', async(req, res) => {
    try {
        const {language='js', code} = req.body 
        console.log(code)
        if(!code) throw {message: 'Code Cannot be Empty!'}

        const filePath = await generateFile(language, code)

        const output = await executeJs(filePath)

        res.status(200).send(output)
    } catch (error) {
        res.status(500).send({
            success: false, 
            error: error.message || error.stderr
        })
    }
})

const port = 5000
app.listen(port, () => {
    console.log(`Api Running on Port ${port}`)
})