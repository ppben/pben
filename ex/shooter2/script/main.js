
var game = new Phaser.Game(800, 800, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('bullet', 'assets/laserBlue16.png');
    game.load.image('ship', 'assets/playerShip2_blue.png');
    game.load.image('background', 'assets/background.jpg');
	game.load.image("enemy","assets/jetpack.png");

}
var score = 0;
var player;
var weapon;
var cursors;
var fireButton;
var Entities = {};
var first = true;
function create() {
	this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    this.background.autoScroll(0, 40); 


    //  Creates 30 bullets, using the 'bullet' graphic
    weapon = game.add.weapon(30, 'bullet');

    //  The bullet will be automatically killed when it leaves the world bounds
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  Because our bullet is drawn facing up, we need to offset its rotation:
    weapon.bulletAngleOffset = 90;

    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 400;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    weapon.fireRate = 200;

    player = this.add.sprite(this.game.width/2, this.game.height-100, 'ship');
	player.scale.set(0.5);

    game.physics.arcade.enable(player);

    //  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
    weapon.trackSprite(player, 28, 0);

	Entities.enemies = game.add.group();
	Entities.enemies.enableBody = true;
	Entities.enemies.physicBodyType = Phaser.Physics.ARCADE;

/*	for (var i = 0; i <50 ; i++) {
		var c = Entities.enemies.create(
				game.world.randomX , 0,"enemy"
			);
		c.scale.set(0.5);
		c.body.collideWorldBounds = true;

	}*/

   enemySpawn(5);



    cursors = this.input.keyboard.createCursorKeys();

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

	weapon.bullets.setAll('scale.x', 0.5);
	weapon.bullets.setAll('scale.y', 0.3);
	player.body.collideWorldBounds = true;


}

function update() {
	game.physics.arcade.overlap(
		weapon.bullets,
		Entities.enemies,
		hitEnemy
	);

	game.physics.arcade.overlap(
		player,
		Entities.enemies,
		beHit
	);

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -400;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 400;
    }


    if (fireButton.isDown)
    {
        weapon.fire();
    }

}

function render() {

    //weapon.debug();

	//game.debug.body(Entities.enemies);
}
function hitEnemy(bullet,enemy){
	score++;
	console.log("score : "+score);
	enemy.kill();
	bullet.kill();

	enemySpawn(5);
}

function beHit(player,enemy){
	
	//player.kill();
	enemy.kill();
	alert("votre score : " + score);
	reload();
}

function reload(){
	Entities.enemies.callAll('kill');
	weapon.bullets.callAll('kill');
	score = 0;
	enemySpawn(5)
}

function enemySpawn(nbr)
{
	 var delay = 0;

    for (var i = 0; i < nbr; i++)
    {
        var enemy = Entities.enemies.create((game.world.randomX), 0, 'enemy');
        enemy.body.collideWorldBounds = true;
        enemy.scale.set(game.rnd.realInRange(0.1, 0.4));

        var speed = game.rnd.between(4000, 6000);

        game.add.tween(enemy).to({ y: 1000 }, speed, Phaser.Easing.Sinusoidal.InOut, true, delay, 1000, false);

        delay += 200;
    }
}