//player=============================================================
var player_health = 1;  //lowest level is 1
var player_chain = false; 
var player_lives = 3;
var player_keys = 4;
var player_lives_reset = 3;
var player_speed = 300;
var player = null;
var playershape;
var invincibleTimer = 0;
var jump = false;   
var duck = false;
var climb = false;
var hitboxchanged = false;
var climbing = false;
var hanging = false;
var onAir = false;  //stores if player is on ground or in the air


//level=============================================================
var level = 1;  //change this to start in a different level
var levels = 7;
var score = 0;
var worldwidth = 800;
var worldheight = 480;
var tileset;
var map;


//ui=============================================================
var AIText;
var doneText;
var cursors;


//controls=============================================================
var buttongroup;
var left = false;
var right = false;
var fire = false;
var anchorfire = false;
var formerMouse = -1;
var controls;


//effects=============================================================
var music;


//localstorage=============================================================
var savepointX = 0;
var savepointY = 0;
var saved = false;


//physics=============================================================
var air_friction = 300;
var fireRate = 200;
var gamestate = 'running';
var playerstate = 'idle';
var weaponangle;
var flightDistance = 0;
var constraints = [];
var accelerate = false;
var docked = false;
var nextFire = 0;

var jumpHeightCounter = 0;
var jumpspeedx = 0;  // this is for jumping of a chain

var objectAbove = false;

	//timers
	var hangTimer = 0;
	var timerEvents = [];
	var timer = 0;
	var jumptimer = 0;

	// anchor vars
	var chainAnchor,wallAnchor,lastElement,anchorgroup;

	//collisions
	var collidableObjects = [];
	
	//sensors
	var sensor;
	var sensorX;
	var sensorY;
	var sensorDistance = 0;
	var sensorexists = false;
	var sensorAngle;


//objects=============================================================
var fireballs;
var enemies;
var chainMaxLength = 550;
var sword;
var gun1;
var powerup = false;
var bullet;
var finishline;
var gameObjects;
var textObjects;

	//chain
	var chainElement;
	var chainSectionCount = 0;
	var chainMaxSections = 20;
	var chainLength = 0;
	var playerChainRC =false;