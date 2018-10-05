const actions = require('./data/helpers/actionModel.js');
const projects = require('./data/helpers/projectModel.js');
const express = require ('express');
const helmet = require('helmet');

const server = express();
server.use(express.json());
server.use(helmet());

const sendRes = (res,num,data) => {
res.status(num).json(data);
};

const validProect = (req,res,next) => {
if(!req.body.name||!req.body.description){sendRes(res,404,'Field cannot be empty');next();}
else{next();}
};

const validPost = (req,res,next) => {
const { project_id,description,notes } = req.body;
if(!project_id || !description || ! notes || typeof project_id != "number"){
sendRes(res,404,'all inputs must be filled, and project id must be a number');
next();
}
else{next();}
}

const projUpdate = (req,res,next) => {
const { name,description } = req.body;
if(!name || !description){
sendRes(res,404,'all inputs must be filled');
next();	
}
else{next();}
}

const postUpdate = (req,res,next) => {
const { description,notes } = req.body;
if(!description || !notes){
sendRes(res,404,'all inputs must be filled');
next();
}
else{next();}
}

server.get('/',(req,res)=>{
res.send("use /api/projects, or /api/actions")
});

server.get('/api/projects',(req,res)=>{
projects.get()
	.then(response=>{
	sendRes(res,200,response);
	})
	.catch(error=>{
	sendRes(res,500,error);
	})
})

server.get('/api/projects/:id',(req,res)=>{
const { id } = req.params;
projects.get(id)
	.then(response=>{
	sendRes(res,200,response);
	})
	.catch(error=>{
	sendRes(res,500,error);
	})
})

server.get('/api/actions/:id',(req,res)=>{
const { id } = req.params;
actions.get(id)
	.then(response=>{
	sendRes(res,200,response);
	})
	.catch(error=>{
	sendRes(res,500,error);
	})
})

server.get('/api/actions',(req,res)=>{
actions.get()
	.then(response=>{
	sendRes(res,200,response);
	})
	.catch(error=>{
	sendRes(res,500,error);
	})
})

server.post('/api/projects',validProect,(req,res)=>{
const { name,description } = req.body;
projects.insert({name,description})
	.then(response=>{
	sendRes(res,200,response);
	})
	.catch(error=>{
	sendRes(res,500,error);
	})
})

server.post('/api/actions',validPost,(req,res)=>{
const { project_id,description,notes } = req.body;
actions.insert({ project_id,description,notes })
	.then(response=>{
	sendRes(res,200,response);
	})
	.catch(error=>{
	sendRes(res,500,error);
	})
})

server.delete('/api/actions/:id',(req,res)=>{
const { id } = req.params;
actions.remove(id)
	.then(response=>{
	sendRes(res,200,response);
	})
	.catch(error=>{
	sendRes(res,500,error);
	})
})

server.put('/api/actions/:id',postUpdate,(req,res)=>{
const { description,notes } = req.body;
const { id } = req.params;
actions.update(id,{ description,notes })
	.then(response=>{
	sendRes(res,200,response);
	})
	.catch(error=>{
	sendRes(res,500,error);
	})
})

server.delete('/api/projects/:id',(req,res)=>{
const { id } = req.params;
projects.remove(id)
	.then(response=>{
	sendRes(res,200,response);
	})
	.catch(error=>{
	sendRes(res,500,error);
	})
})

server.put('/api/projects/:id',projUpdate,(req,res)=>{
const { name,description } = req.body;
const { id } = req.params;
projects.update(id,{ name,description })
	.then(response=>{
	sendRes(res,200,response);
	})
	.catch(error=>{
	sendRes(res,500,error);
	})
})

server.listen(3333, ()=>console.log('server listaning on port 3333'));