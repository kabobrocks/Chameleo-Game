//================================================================================
// CREATE USER INTERFACE
//================================================================================   
function createUI (currentState) {        
    for (i = 1; i <= player_lives; i++) {
        heart = game.add.sprite(50 * i, 32, 'lifesaver');
        heart.anchor.setTo(0.5, 0.5);
        heart.fixedToCamera = true;
        textObjects.add(heart);
    }
}

function createDoorKeyUI (currentState) {
    doorKeyObjects = game.add.group();

    for (i = 1; i <= player_keys; i++) {
        doorKey = game.add.sprite(40 * i, 90, 'doorkey');
        doorKey.anchor.setTo(0.5, 0.5);
        doorKey.fixedToCamera = true;
        doorKeyObjects.add(doorKey);
    }
}

//================================================================================
// CREATE OBJECTS
//================================================================================
function createObjects(currentState){
    //empty for now, need to fill when we add new objects, such as coins, powerups, keys, etc.
    createUI(currentState);
    createDoorKeyUI(currentState);

    //coins objects is all doors

    // if coins is currently in the local storage, overwrite coins from the line below with what is in the localstorage
    //coins = localstorage.getItem('coins'); //JSON string
    //else {
    coins = game.add.group();
    map.createFromObjects('objects', 95, 'questionmark', 1, true, false, coins); //questionmark  (99 eckunten rechts)
    coins.forEach(ApplyQuestionSprite, this);
    gameObjects.add(coins);
    //}

    pirateAI = game.add.group();
    map.createFromObjects('objects', 76, 'skelly', 1, true, false, pirateAI);
    pirateAI.forEach(ApplyPirateSprite, this);
    gameObjects.add(pirateAI);

    keyItems = game.add.group();
    map.createFromObjects('objects', 114, 'doorkey', 1, true, false, keyItems);
    keyItems.forEach(ApplyKeySprite, this);
    gameObjects.add(keyItems);

    secretWalls = game.add.group();
    map.createFromObjects('objects', 57, 'secretWall', 1, true, false, secretWalls);
    secretWalls.forEach(ApplySecretWallSprite, this);
    gameObjects.add(secretWalls);

    goal = game.add.group();
    map.createFromObjects('objects', 190, 'goal', 1, true, false, goal);
    goal.forEach(ApplyGoalSprite, this);
    gameObjects.add(goal);

    secretGoal = game.add.group();
    map.createFromObjects('objects', 209, 'secretGoal', 1, true, false, secretGoal);
    secretGoal.forEach(ApplySecretGoalSprite, this);
    gameObjects.add(secretGoal);

    powerups = game.add.group();
    map.createFromObjects('objects', 79, 'powerup1', 1, true, false, powerups);
    powerups.forEach(ApplyPowerupSprite, this);
    gameObjects.add(powerups);

    chains = game.add.group();
    map.createFromObjects('objects', 295, 'chain', 0, false, false, chains);   //this first chain element is set to exists=false because its just there to get the position and the length out ouf tiled editor
    chains.forEach(setupChains, this);
    gameObjects.add(chains);
}

function DoorIt(door){
    // game.physics.p2.enable(questionmark);
    // questionmark.body.y += 32;  //since we are replacing a 32x32 tile with a 64x64 object we need to adjust
    // questionmark.body.static=true;
    // questionmark.body.sprite.name='coin';
    // questionmark.body.setCollisionGroup(questionmarkCG);
    // questionmark.body.collides([playerCG,fireballCG,powerupsCG]);
    // questionmark.body.setMaterial(groundMaterial);
}

//================================================================================
// Apply Sprites/Physics to Objects
//================================================================================

function ApplyQuestionSprite(questionmark) {
    game.physics.p2.enable(questionmark);
    questionmark.body.y += 32;  //since we are replacing a 32x32 tile with a 64x64 object we need to adjust
    questionmark.body.x += 32;
    questionmark.body.static = true;
    questionmark.body.sprite.name = 'coin';
    questionmark.body.setCollisionGroup(questionmarkCG);
    questionmark.body.collides([playerCG,fireballCG,powerupsCG]);
    questionmark.body.setMaterial(groundMaterial);
}

function ApplyPirateSprite(pirateAI) {
    //console.log(pirateAI);
    game.physics.p2.enable(pirateAI);
    pirateAI.body.y += 32;  //since we are replacing a 32x32 tile with a 64x64 object we need to adjust
    pirateAI.body.x += 32;
    pirateAI.body.static = true;
    pirateAI.body.sprite.name = pirateAI.name;
    pirateAI.body.setCollisionGroup(computerAICG);
    pirateAI.body.collides([playerCG,fireballCG,powerupsCG]);
    pirateAI.body.setMaterial(groundMaterial);
}

function ApplyKeySprite(key) {
    game.physics.p2.enable(key);
    key.body.y += 32;  //since we are replacing a 32x32 tile with a 64x64 object we need to adjust
    key.body.x += 32;
    key.body.static = true;
    key.body.sprite.name = "doorkey";
    key.body.setCollisionGroup(keyCG);
    key.body.collides([playerCG,fireballCG,powerupsCG]);
    key.body.setMaterial(groundMaterial);
}

function ApplySecretWallSprite(secretWall) {
    game.physics.p2.enable(secretWall);
    secretWall.body.y += 32;  //since we are replacing a 32x32 tile with a 64x64 object we need to adjust
    secretWall.body.x += 32;
    secretWall.body.static = true;
    secretWall.body.sprite.name = "secretWall";
    secretWall.body.setCollisionGroup(secretWallCG);
    secretWall.body.collides([playerCG]);
    secretWall.body.setMaterial(groundMaterial);
}

function ApplyGoalSprite(goal) {
    game.physics.p2.enable(goal);
    goal.body.y += 48;  //since we are replacing a 32x32 tile with a 64x64 object we need to adjust
    goal.body.x += 32;
    goal.scale.x = -1;
    goal.body.static = true;
    goal.body.sprite.name = "goal";
    goal.body.setCollisionGroup(goalCG);
    goal.body.collides([playerCG]);
    goal.body.setMaterial(groundMaterial);
}

function ApplySecretGoalSprite(secretGoal) {
    game.physics.p2.enable(secretGoal);
    secretGoal.body.y += 93;  //since we are replacing a 32x32 tile with a 64x64 object we need to adjust
    secretGoal.body.x += 64;
    secretGoal.scale.x = -1;
    secretGoal.body.static = true;
    secretGoal.body.sprite.name = "goal";
    secretGoal.body.setCollisionGroup(secretGoalCG);
    secretGoal.body.collides([playerCG]);
    secretGoal.body.setMaterial(groundMaterial);
}

function ApplyPowerupSprite(powerup) {
    game.physics.p2.enable(powerup);
    powerup.body.y += 32;  //since we are replacing a 32x32 tile with a 64x64 object we need to adjust
    powerup.body.x += 32;
    powerup.body.static = true;
    powerup.body.sprite.name = "powerup1";
    powerup.body.setCollisionGroup(powerupsCG);
    powerup.body.collides([playerCG, blueplayerCG]);
    powerup.body.setMaterial(groundMaterial);
}

function setupChains(chain){
    createChain(chain.length,chain.x+16,chain.y);
}

function createChain(length, xAnchor,yAnchor){
    var lastRect;  //if we created our first rect this will contain it
    var height = 20;  //height for the physics body - your image height is 8px
    var width = 16;   //this is the width for the physics body.. if to small the rectangles will get scrambled together
    var maxForce =15000;  //the force that holds the rectangles together
    for(var i=0; i<=length; i++){
        var x = xAnchor;                 // all rects are on the same x position
        var y = yAnchor+(i*height);   // every new rects is positioned below the last
        if (i % 2 == 0){
            newRect = chains.create(x, y, 'chain',1);
        }   //add sprite
        else {
            newRect = chains.create(x, y, 'chain',0); 
            lastRect.bringToTop();
        }
        newRect.name = 'chainElement';
        game.physics.p2.enable(newRect,false);      // enable physicsbody
        newRect.body.setRectangle(width,height);    //set custom rectangle
        newRect.body.data.shapes[0].sensor = true  // make the chain elements to sensors (no actual collision but collision events)
        //if (i % 2 == 1){  // less collsion bodies to calculate and the first one is fixed
            newRect.body.setCollisionGroup(groundCG);
            newRect.body.collides([playerCG,fireballCG,groundCG]);
            newRect.body.onBeginContact.add(chainCollision,newRect);  // call chaincollision function to start "hangmode"
        //}
        if (i == 0){
            newRect.body.static=true;   //anchor the first one created
//          newRect.body.kinematic=true;
        }
        else{
            newRect.body.mass =  length/i;  // reduce mass for evey chain element
        }
        //after the first rectangle is created we can add the constraint
        if(lastRect){
            game.physics.p2.createRevoluteConstraint(newRect, [0,-10], lastRect, [0,10], maxForce);
        }
        lastRect = newRect;
    }; 
}

function chainCollision(body){
    if (body.sprite.name == 'pirate' && hanging== false && hangTimer < game.time.now && docked == false) {   //if the hit body is a sprite and belongs to enemies
        chainElement = this;   // we send newRect instead of this in the onBeginContact function and here the chain element is accessable as this
        chainElement.body.velocity.x=body.velocity.x*-50;  //on collision we need an initial drive for more realistic action
        hanging = true;
        playerChainRC = game.physics.p2.createRevoluteConstraint(chainElement, [0,0],player, [0,8], 10000)
        player.body.data.gravityScale=0;
    }
} 

function createChainElement(chainSection, chainLength){
    console.log('createChainElement');
    if(docked == true ){return}
    var x=player.body.x;
    var y=player.body.y;
    var height = 20;  //height for the physics body - your image height is 8px
    var width = 16;   //this is the width for the physics body.. if to small the rectangles will get scrambled together
    var maxForce =100000;  //the force that holds the rectangles together
    if (chainSection == 0) { // first chainSection
        newElement = anchorgroup.create(x, y, 'chain',3);
        game.physics.p2.enable(newElement,false);
        newElement.body.setRectangle(width,height);
        newElement.body.angle=sensorAngle+90;  //+90
        newElement.body.mass =  chainLength;
        newElement.body.angularDamping=1;
        newElement.body.data.gravityScale=0;
        newElement.body.data.shapes[0].sensor = false;
        newElement.body.setCollisionGroup(fireballCG);
        newElement.body.collides([groundCG,questionmarkCG]);
        newElement.body.createGroupCallback(groundCG, anchorCollision, this);
        newElement.body.createGroupCallback(questionmarkCG, anchorCollision, this);
        chainAnchor = newElement;
        accelerate = true; 
    }
    else{
        newElement = anchorgroup.create(x, y, 'chain',1); 
        newElement.scale.setTo(0.6,1);
        game.physics.p2.enable(newElement,false);
        newElement.body.setRectangle(width,height);
        newElement.body.angle=sensorAngle+90;
        newElement.body.mass =  chainLength/chainSectionCount;  // this reduces the mass of every new ropeelement (it stops the rope from beeing pulled apart but it introduces other obstacles) 
        newElement.body.data.gravityScale=0;
        newElement.body.data.shapes[0].sensor = true;
        chainAnchor = newElement;
            
    }
    if (chainSectionCount % 2 == 1)  {lastElement.bringToTop();}
    if (lastElement) {  constraints.push(game.physics.p2.createRevoluteConstraint(newElement, [0,-8], lastElement, [0,8], maxForce) ); }  
    if (chainSection == chainLength) { // if lastRopeSection > anchor Player
        constraints.push(game.physics.p2.createRevoluteConstraint( newElement, [0,8],player, [0,8], maxForce) ); 
        docked = true;
    }
    lastElement = newElement;
    player.bringToTop();
    layerforeground.bringToTop(); 
    chainSectionCount++;
}

//================================================================================
// Player Interactions with Objects
//================================================================================

function hitQuestionmark(player, questionmark) {
    //questionmarks are doors
    if (player_keys > 0) {
        player_keys--;
        game.sound.play('doorOpen', 0.3);
        doorKeyObjects.destroy();
        questionmark.sprite.destroy();
        createDoorKeyUI();
        //console.log(coins.children);
    } else {
        game.sound.play('doorLocked', 0.3);
    }
}

function interactWithNPC(player, computerAI) {
    if (AIText == null) {
        game.sound.play('talkToAI', 0.3);
        AIText = game.add.sprite(400, 90, computerAI.sprite.name);
        AIText.scale.setTo(.5, .5);
        AIText.anchor.setTo(0.5, 0.5);
        AIText.fixedToCamera = true;   
    }
    console.log(computerAI.sprite.x);
    localStorage.setItem('playerX', computerAI.sprite.x);
    localStorage.setItem('playerY', computerAI.sprite.y - 70);
}

function pickupKey(player, key) {
    player_keys++;
    doorKeyObjects.destroy();
    key.sprite.kill();
    game.sound.play('keyPickup', 0.3);  // key, volume
    createDoorKeyUI();
}

function collectGoal(player, goal) {
    if (doneText == null) {
        game.sound.play('talkToAI', 0.3);
        doneText = game.add.sprite(400, 90, 'scroll4a');
        doneText.scale.setTo(.5, .5);
        doneText.anchor.setTo(.5, .5);
        doneText.fixedToCamera = true;

    }
}

function collectSecretGoal(player, secretGoal) {
    //create a victory sound and play here
    music.pause();
    localStorage.clear();
    player_keys = 0;
    game.state.start("secret-win");
}

function collectPowerup(player, powerup) {
    if (powerupstat == true) {
        powerupstat = false;
        setupPlayerLooks(player.sprite, 'pirateSpriteSheet');
    } else {
        powerupstat = true;
        setupPlayerLooks(player.sprite, 'pirateBlue');

        //create a 5 second timer to be the blue pirate, run endPowerup after timer is done
        game.time.events.add(Phaser.Timer.SECOND * 5, endPowerup, this);

        function endPowerup() {
            powerupstat = false;
            setupPlayerLooks(player.sprite, 'pirateSpriteSheet');
        }
    }

}

function interactSecretWall(player, secretWall) {
        answer = prompt("Enter the password using all 3 hints. No Spaces!");
        if (answer.toUpperCase() == "GIMMESKELLYTREASURE") {
            breakWalls();
        } else {
            alert("Incorrect. Find all secrets to learn the password!");
        }
}

//================================================================================
// CREATE CHAINS
//================================================================================
function createChainElement(chainSection, chainLength) {
    if(docked == true) {
        return;
    }
    var x = player.body.x;
    var y = player.body.y;
    var height = 20;  //height for the physics body - your image height is 8px
    var width = 16;   //this is the width for the physics body.. if to small the rectangles will get scrambled together
    var maxForce = 100000;  //the force that holds the rectangles together
    if (chainSection == 0) { // first chainSection
        newElement = anchorgroup.create(x, y, 'chain',3);
        game.physics.p2.enable(newElement, false);
        newElement.body.setRectangle(width, height);
        newElement.body.angle = sensorAngle + 90;  //+90
        newElement.body.mass = chainLength;
        newElement.body.angularDamping = 1;
        newElement.body.data.gravityScale = 0;
        newElement.body.data.shapes[0].sensor = false;
        newElement.body.setCollisionGroup(fireballCG);
        newElement.body.collides([groundCG]);
        newElement.body.createGroupCallback(groundCG, anchorCollision, this);
        chainAnchor = newElement;
        accelerate = true; 
    }
    else{
        newElement = anchorgroup.create(x, y, 'chain', 1); 
        newElement.scale.setTo(0.6, 1);
        game.physics.p2.enable(newElement, false);
        newElement.body.setRectangle(width, height);
        newElement.body.angle = sensorAngle + 90;
        newElement.body.mass = chainLength / chainSectionCount;  // this reduces the mass of every new ropeelement (it stops the rope from beeing pulled apart but it introduces other obstacles) 
        newElement.body.data.gravityScale = 0;
        newElement.body.data.shapes[0].sensor = true;
        chainAnchor = newElement;
            
    }
    if (chainSectionCount % 2 == 1) {
        lastElement.bringToTop();
    }
    if (lastElement) { 
        constraints.push(game.physics.p2.createRevoluteConstraint(newElement, [0, -8], lastElement, [0, 8], maxForce));
    }  
    if (chainSection == chainLength) { // if lastRopeSection > anchor Player
        constraints.push(game.physics.p2.createRevoluteConstraint( newElement, [0, 8], player, [0, 8], maxForce)); 
        docked = true;
    }
    lastElement = newElement;
    player.bringToTop();
    layerforeground.bringToTop(); 
    chainSectionCount++;
}
