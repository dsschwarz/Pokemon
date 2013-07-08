Pokemon

Client side overview:
A master director class handles a collection of scenes, one of which is active
The active scene receives takes care of update, draw and events.
Main scenes:
Start  - allows login
Map    - Overworld map, tile based, gets updates from server on object movement and other events
Menu   - Actions are sent to and validated by server, result sent back to client. Pushed on top of map scene, then popped
Battle - Tile based & real time, all events sent to server. All collision handled only on server.

The server does not know or care what scene the client is on, and only needs to receive events from client.
Has its own copy of the world and battles, updates all

Maps are loaded from maps folder, which contains an overview of how to create a map file


People: refers to overworld moving objects
mapobject: Stationary overworld object

map data is pulled from server. Mapinfo will be deprecated soon


