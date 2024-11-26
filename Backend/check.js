const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())

const PORT = 6000

const user = [{id:1,nam:"one"},{id:2,nam:"two"}]

app.get('/user', (req, res)=>{
    res.json(user)
})

app.post('/newuser', (req,res)=>{
    const newUser = req.body
    const userId = user.length+1
    newUser.id=userId
    user.push(newUser)
    res.json(newUser)
    // res.send(user)
})
app.put('/update', (req, res) => {
    const { id, nam } = req.body;
    const userToUpdate = user.find(u => u.id === id);

    // !
    userToUpdate.nam=nam
    res.json(userToUpdate)
    
})

app.delete('/del/:id',(req,res)=>{
    console.log('im in');
    
    const {userId} = req.params
    const userDelId = user.findIndex(user=>user.id===userId)
    const delUser = user.splice(userDelId,1)
    // !
    res.json(delUser)
})

app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})