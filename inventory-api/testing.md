Tested locally using Postman with the server running at:
http://localhost:3000/api/items

Postman Screenshots located at bottom of Reflection Word Document (Reflection_&_Postman_Evidence.docx)

API allows creation, retrieval, updating, and deletion of inventory items.
Instead of being stored in an in-memory array, this uses MongoDB to permanently store inventory data that persists even when reloading.

MongoDB Atlas with the following configuration:

Database: InventoryDB
Collection: items
Environment Variable: MONGODB_URI

1. Install Dependencies using "npm install"
2. Copy contents of ".env.example" into ".env"
3. Replace placeholders with own MongoDB Atlas connection string
4. Start server using "npm run dev"



Postman API Testing

1. GET - Retrieve All Inventory Items
Request: GET http://localhost:3000/api/items
Response: 200 OK
Retrieves all inventory items currently stored in MongoDB collection.


2. GET - Retrieve Individual Item
Request: GET http://localhost:3000/api/items/:id
Response: 200 OK
Retrieves one inventory item using its MongoDB-generated ID number (6af0c9b9e640a7c007df7643)


3. POST - Create a New Inventory Item
Request: POST http://localhost:3000/api/items
Request Body:
{
    "name": "1080p Monitor",
    "quantity": 10,
    "category": "Electronics"
}
Response: 201 Created
Creates a new document in MongoDB and returns newly created inventory item including its generated _id.


4. PUT - Update Existing Inventory Item
Request: PUT http://localhost:3000/api/items/:id    (6af0d4099056cb4cff397c5b)
Request Body:
{
    "quantity": 30
}
Response: 200 OK
Updates existing inventory item using its id, can be updated without submitting entire item in request body.


5. Invalid POST - Inputting incorrect data will result in error status 400.
Request: POST http://localhost:3000/api/items
Request Body: 
{
    "name": "1440p Monitor",
    "quantity": -10,
    "category": "Electronics"
}
Response: 400 Bad Request

6. Invalid GET / DELETE - Attempting to retrieve id number that doesn't exist will result in error status 404.
Request: GET / DELETE http://localhost:3000/api/items/000000000
Response: 404 Not Found


7. DELETE - Remove an Inventory Item
Request: DELETE http://localhost:3000/api/items/:id     (6af0d4099056cb4cff397c5b)
Response: 200 OK
Permanently removes selected inventory item from the MongoDB collection using its id.