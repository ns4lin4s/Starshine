const hapi = require('hapi')
const server = new hapi.Server()
const path = require('path')
const glue = require('glue')

server.connection({	
	port : process.env.port || 3000
})

server.register(require('inert'), function(err){

	if(err)
		throw err

	server.route({
        method: 'GET',
        path: '/phaser',
        handler: function (request, reply) {
            reply.file('node_modules/phaser/build/phaser.min.js')
        }
    })

    server.route({
        method: 'GET',
	    path: '/assets/{param*}',
	    handler: {
	        directory : {path : path.join(__dirname,'/assets')}
	    }
    })
})


server.register(require('vision'), function (err) { 

	if(err)
		throw err

	server.views({
		engines : {
			html : require('handlebars')
		},
		path : path.join(__dirname,'/dist/public/')
	})

	server.route({
		path : '/',
		method : 'GET',
		handler : {
			view : 'index.html'
		}
	})

});


server.start((err) => {
	if(err)
		throw err
	console.log('Server running at: ', server.info.uri)
})