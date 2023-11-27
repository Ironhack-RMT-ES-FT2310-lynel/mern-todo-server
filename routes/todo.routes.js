const router = require("express").Router();
const Todo = require("../models/Todo.model")

// GET "/api/todo" => enviar todos los documentos de to-do. Solo title y isCompleted
router.get("/", async (req, res, next) => {

  try {
    const data = await Todo.find().select({title: 1, isCompleted: 1})
  
    res.json(data) // "", {}, []

  } catch (error) {
    next(error)
  }

})

// POST "/api/todo" => recibir title y description y crear un documento de to-do
router.post("/", async (req, res, next) => {

  console.log(req.body)
  const { title, description } = req.body

  try {
    // await Todo.create({ title, description })
    await Todo.create({ 
      title: req.body.title, 
      description : req.body.description
    })

    res.status(201).json("documento creado")

  } catch (error) {
    next(error)
  }

})

// GET "/api/todo/:todoId" => enviar todos los detalles de un to-do por su id
router.get("/:todoId", async (req, res, next) => {

  console.log(req.params)
  try {

    // if (req.params.todoId.length !== 24) {
    //   res.status(400).json({errorMessage: "id no valido"})
    //   return;
    // }
    
    const oneTodo = await Todo.findById(req.params.todoId) // 1234
    
    res.json(oneTodo)

  } catch (error) {
    next(error)
  }

})


// DELETE "/api/todo/:todoId" => borrar un to-do por su id
router.delete("/:todoId", async (req, res, next) => {

  try {

    // antes de borrar, vamos a hacer una verificacion de autorizacion
    // 1. si es role que puede borrar
    // 2. si es dueño del documento
    // 3. si está logeado
    
    await Todo.findByIdAndDelete(req.params.todoId)
    res.json("documento borrado")
    // o res.status(204)

  } catch (error) {
    next(error)
  }

})


// PUT (actualización total) "/api/todo/:todoId" => editar todas las propiedades del to-do por su id
router.put("/:todoId", async(req, res, next) => {

  // const { params: { todoId }, body: { title, description, isCompleted } } = req

  const { todoId } = req.params;
  const { title, description, isCompleted } = req.body
  
  console.log(req.params, req.body)

  try {

    await Todo.findByIdAndUpdate(todoId, { title, description, isCompleted })
    res.json("documento actualizado")
    
  } catch (error) {
    next(error)
  }

})


// PATCH (actualización parcial) "/api/todo/:todoId/complete" => editar propiedad isCompleted de un to-do por su id
router.patch("/:todoId/complete", async (req, res, next) => {

  try {
    
    await Todo.findByIdAndUpdate(req.params.todoId, {
      isCompleted: true
    })

    res.json("documento actualizado. isCompleted: true")

  } catch (error) {
    next(error)
  }

})


module.exports = router;