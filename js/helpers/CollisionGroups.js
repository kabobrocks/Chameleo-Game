//define collisiongroups
	
	//player
	playerCG = game.physics.p2.createCollisionGroup();
	fireballCG = game.physics.p2.createCollisionGroup();
	
	//level
	groundCG = game.physics.p2.createCollisionGroup();
	levelEndCG = game.physics.p2.createCollisionGroup(); //need to add the rules for it in Objects.js
	platformCG = game.physics.p2.createCollisionGroup();

	//objects
	questionmarkCG = game.physics.p2.createCollisionGroup();
	powerupCG = game.physics.p2.createCollisionGroup();
	computerAICG = game.physics.p2.createCollisionGroup(); //the scary pirate ghost guys
	keyCG = game.physics.p2.createCollisionGroup(); //keys that you can pick up
	secretWallCG = game.physics.p2.createCollisionGroup(); //wall to be destroyed if you know all secrets
	goalCG = game.physics.p2.createCollisionGroup(); // the normal goal
	secretGoalCG = game.physics.p2.createCollisionGroup(); //the secret goal
    
	//enemies
    enemyAirCG = game.physics.p2.createCollisionGroup();
    enemyGroundCG = game.physics.p2.createCollisionGroup();
    enemyStaticCG = game.physics.p2.createCollisionGroup();
    enemyboundsCG = game.physics.p2.createCollisionGroup();


   

