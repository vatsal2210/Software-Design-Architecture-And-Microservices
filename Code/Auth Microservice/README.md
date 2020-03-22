# western-software-microservice-auth
Authentication service

## Technologies:
node.js, express.js, mongodb 

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
URL: `https://wesetern01-auth.mybluemix.net/`
1. Login
	API: `/user/signin`
	Method: `POST`
	Req Params: 
	```
	{ "email": "vatsalshah2210@gmail.com", "password": "123456" }
	```

2. Signup:
	API: `/user/signup`
	Method: `POST`
	Req Params: 
	```
	{
		"firstName":"vatsal",
		"lastName": "shah",
		"email": "vatsalshah2210@gmail.com",
		"password": "123456"
	}
	```

## MongoDB Collections:
### Json Schema:

```
{
  "fields": [
    {
      "name": "_id",
      "path": "_id",
      "count": 5,
      "types": [
        {
          "name": "ObjectID",
          "bsonType": "ObjectID",
          "path": "_id",
          "count": 5,
          "values": [           
          ],
          "total_count": 0,
          "probability": 1,
          "unique": 5,
          "has_duplicates": false
        }
      ],
      "total_count": 5,
      "type": "ObjectID",
      "has_duplicates": false,
      "probability": 1
    },
    {
      "name": "__v",
      "path": "__v",
      "count": 5,
      "types": [
        {
          "name": "Int32",
          "bsonType": "Int32",
          "path": "__v",
          "count": 5,
          "values": [
            0,
            0,
            0,
            0,
            0
          ],
          "total_count": 0,
          "probability": 1,
          "unique": 1,
          "has_duplicates": true
        }
      ],
      "total_count": 5,
      "type": "Int32",
      "has_duplicates": true,
      "probability": 1
    },
    {
      "name": "email",
      "path": "email",
      "count": 5,
      "types": [
        {
          "name": "String",
          "bsonType": "String",
          "path": "email",
          "count": 5,
          "values": [         
          ],
          "total_count": 0,
          "probability": 1,
          "unique": 5,
          "has_duplicates": false
        }
      ],
      "total_count": 5,
      "type": "String",
      "has_duplicates": false,
      "probability": 1
    },
    {
      "name": "firstName",
      "path": "firstName",
      "count": 5,
      "types": [
        {
          "name": "String",
          "bsonType": "String",
          "path": "firstName",
          "count": 5,
          "values": [
            "vatsal",
            "Test",
            "Test",
            "Test",
            "Test"
          ],
          "total_count": 0,
          "probability": 1,
          "unique": 2,
          "has_duplicates": true
        }
      ],
      "total_count": 5,
      "type": "String",
      "has_duplicates": true,
      "probability": 1
    },
    {
      "name": "lastName",
      "path": "lastName",
      "count": 5,
      "types": [
        {
          "name": "String",
          "bsonType": "String",
          "path": "lastName",
          "count": 5,
          "values": [
    
          ],
          "total_count": 0,
          "probability": 1,
          "unique": 2,
          "has_duplicates": true
        }
      ],
      "total_count": 5,
      "type": "String",
      "has_duplicates": true,
      "probability": 1
    },
    {
      "name": "password",
      "path": "password",
      "count": 5,
      "types": [
        {
          "name": "String",
          "bsonType": "String",
          "path": "password",
          "count": 5,
          "values": [
          ],
          "total_count": 0,
          "probability": 1,
          "unique": 5,
          "has_duplicates": false
        }
      ],
      "total_count": 5,
      "type": "String",
      "has_duplicates": false,
      "probability": 1
    }
  ],
  "count": 5
}
```
