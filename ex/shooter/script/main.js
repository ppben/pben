var game = new Phaser.Game(800,600,Phaser.AUTO,'game',
{
	preload : preload,
	create:create,
	update:update,
	render:render
});

function preload(){
game.load.image("ship","assets/playerShip2_blue.png");
game.load.image("bullet","assets/laserBlue16.png");
game.load.image("enemy","assets/ufoRed.png");
}

var Entities = {};

function create()
{
	initPlayer()
	initBullet()

	
	Entities.enemies = game.add.group();
	Entities.enemies.enableBody = true;
	Entities.enemies.physicBodyType = Phaser.Physics.ARCADE;

	for (var i = 0; i <50 ; i++) {
		var c = Entities.enemies.create(
				game.world.randomX, game.world.randomY,"enemy"
			);
		c.scale.set(0.5);
	}

	Entities.cursors=game.input.keyboard.createCursorKeys();
	Entities.fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}

function initBullet(){
	Entities.weapon = game.add.weapon(30,"bullet");
	Entities.weapon.bulletKillTyper = Phaser.Weapon.KILL_WORLD_BOUNDS;
	Entities.weapon.bulletSpeed = 600;
	Entities.weapon.fireRate = 100;
	Entities.weapon.trackSprite(Entities.player,0,0,true);
}

function initPlayer(){
	Entities.player = game.add.sprite(400,300,"ship");
	Entities.player.anchor.set(0.5);

	game.physics.enable( Entities.player);
	Entities.player.body.drag.set(75);
	Entities.player.body.maxVelocity.set(75);
	Entities.player.scale.set(0.5);
}



function update(){
	game.physics.arcade.overlap(
		Entities.weapon.bullets,
		Entities.enemies,
		hitEnemy
	);

	if(Entities.cursors.up.isDown)
	{
		game.physics.arcade.accelerationFromRotation(
			Entities.player.rotation,300,
			Entities.player.body.acceleration
		);
	}
	else
	{
		Entities.player.body.acceleration.set(0);
	}

	if(Entities.cursors.left.isDown)
	{
		Entities.player.body.angularVelocity = -300;
	}
	else if(Entities.cursors.right.isDown)
	{
		Entities.player.body.angularVelocity = 300;
	}
	else
	{
		Entities.player.body.angularVelocity = 0;
	}

	if(Entities.fireButton.isDown)
	{
		Entities.weapon.fire();
	}

}

function render(){}

function hitEnemy(bullet,enemy){
	enemy.kill();
	bullet.kill();
}