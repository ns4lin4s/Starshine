const hapi = require('hapi')
const server = new hapi.Server()
const vision = require('vision')
const path = require('path')

server.connection({

	host : 'localhost',
	port : 8081
})


server.register(vision,(err) => {

	if(err)
		throw err

	server.views({
		engines : {
			html : require('handlebars')
		},
		path : path.join(__dirname,'/templates')
	})

	server.route({
		path : '/',
		method : 'GET',
		handler : {
			view : 'index.html'
		}
	})
})

server.start((err) => {
	if(err)
		throw err
	console.log('Server running at: ', server.info.uri)
})