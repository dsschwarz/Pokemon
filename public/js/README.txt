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

Battles
Battle objects are contained in battle folder
Battle scene: 
	Pointer to player
	Pointer to enemy
	Tile array
	Object Array - updates on tick
	Pointer to director
	Pointer to socket - sends data only on keypress

Three attack "objects"
player/enemy  .attackMode = String
If attackMode, cannot launch other attacks. Player is moved according to attack pattern
i.e. if (player.attackMode === "tackle") player.moveRight(3 spaces);

Player can attach attackObjects, which occupy a space on the grid, and have their own update behavior
This will be the majority of attacks.

Player can initiate attackEvents, which have their own update behavior. They can cause effects, dmg over time, or spawn new objects
i.e. Rock fall will cause attackObject rocks to fall onto opponents side

Player has an object containing effects applied to them - roots, stuns, slows, debuffs, etc
These count down per tick, and are removed when none are left
