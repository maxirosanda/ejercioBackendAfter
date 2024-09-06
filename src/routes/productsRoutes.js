import { Router } from "express"
import fs from 'fs'
const router = Router()

router.get('/',async (req,res)=>{

    const data = await fs.promises.readFile('products.json','utf-8')
    const products = JSON.parse(data)

    res.status(200).json(products)
})

router.get('/:id',async (req,res)=>{
    const {id} = req.params
    const data = await fs.promises.readFile('products.json','utf-8')
    const products = JSON.parse(data)
    const product = products.find(product => product.id === id)

    res.status(200).json(product)
})

router.post('/',async (req,res)=>{
    const body = req.body
    const data = await fs.promises.readFile('products.json','utf-8')
    const products = JSON.parse(data)
    if(products.some(product => product.code === body.code)){
        return res.status(200).json({error:"producto ya existente"})
    }

    const newProduct = {
        id:crypto.randomUUID(),
        ...body
    }
    products.push(newProduct)
    await fs.promises.writeFile('products.json',JSON.stringify(products,null,2)   )
    res.json({messge:"Producto creado exitosamente"})
})

router.patch('/:id',async (req,res)=>{
    const {id} = req.params
    const body = req.body
    const data = await fs.promises.readFile('products.json','utf-8')
    const products = JSON.parse(data)
    const index = products.findIndex(product => product.id === id)
    if(index === -1){
        return res.status(200).json({error:"producto no existente"})
    }
    products[index] = {...products[index],...body}
    await fs.promises.writeFile('products.json',JSON.stringify(products,null,2)   )
    res.json({messge:"Producto actualizado exitosamente"})
})

router.delete('/:id',async (req,res)=>{
    const {id} = req.params
    const data = await fs.promises.readFile('products.json','utf-8')
    const products = JSON.parse(data)
    const index = products.findIndex(product => product.id === id)
    if(index === -1){
        return res.status(200).json({error:"producto no existente"})
    }
    const newProducts = products.filter(product => product.id != id )
    await fs.promises.writeFile('products.json',JSON.stringify(newProducts,null,2)   )
    res.json({messge:"Producto borrado exitosamente"})
})

export default router

/*
{
"title":"Coca Cola",
"description":"jhdashg lkkdasio",
"code":"hu34jh34",
"price":1800,
"status":true,
"stock":34,
"category":"Bebida",
"thumbnails":[]
}

*/