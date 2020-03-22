# western-software-microservice-gateway
Gateway microservice

Gateway's role is to verify a user. If user is a authenticate then forward for dashboard otherwise call for a login page

## Technologies:
node.js, express.js 

## Framework:
It is using Model/View(Response)/Controller design pattern to handle all requests. 

## Http Status Code:
`200 - Success`
`4XX - Client Error`
`5XX - Server Error`

## Installation/Deployment:
Download the code. 
Run `npm install`
run `npm start` to start all the services.

## API:
URL: `http://western01-gateway-pipeline.mybluemix.net`

1. FETCH MICROSERVICE STATUS**
	API: `/service/list`
	Method: `GET`

2. SEARCH DATA**
	API: `service/search`
	Method: `POST`
	Req Params:
	```
		"serviceName": "skiResort",
		"searchParam": "country=canada"
	```

	- Accept only these service name
	`["skiResort", "restaurants", "museums", "companies"]`
