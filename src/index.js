import express from 'express'
import cors from 'cors'
import path from 'path'
import {
    getFolders,
    getFiles,
} from './controller'

const app = express()
app.use(cors({
  origin: "*"
}))

app.use('/projects', express.static(path.join(__dirname, 'projects')));

app.get('/getFolders', (req, res) => {
    res.json(getFolders())
})

app.get('/getFiles', (req, res) => {
    res.json(getFiles(req.query.dir))
})


app.use((err, req, res, next) => {
 res.status(500).json({
   status: false,
   name: err.name,
   message: err.message
 })
})

const port = process.env.PORT

app.listen(port,()=>{
  console.log(`Listened on ${port}`)
})