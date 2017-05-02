var game = new Phaser.Game(800, 600, Phaser.AUTO);

var gameState = {
	entities: {},
	preload : function(){
		this.load.tilemap("map","assets/cave.json",null, Phaser.Tilemap.TILED_JSON);
		this.load.image("tiles", "assets/tileset.png");
		this.load.spritesheet("char","assets/char.png",16,16,-1,0,1);
	},
	create : function(){
		this.entities.map = this.add.tilemap("map");
		this.entities.map.addTilesetImage("Cave","tiles");
		this.entities.groundLayer = this.entities.map.createLayer("Ground");
		this.entities.wallLayer = this.entities.map.createLayer("Walls");
		this.entities.decoLayer = this.entities.map.createLayer("Decoration");

		this.entities.map.setCollisionBetween(1,522,true,this.entities.wallLayer);

		this.entities.player = this.add.sprite(240,200,"char");
		this.entities.player.anchor.set(0.5);
		this.physics.enable(this.entities.player);
		this.entities.player.body.collideWorldBounds=true;
		this.entities.cursors = this.input.keyboard.createCursorKeys();
	},
	update : function(){
		this.physics.arcade.collide(this.entities.player,this.entities.wallLayer);
		this.entities.player.body.velocity.y=0;
		this.entities.player.body.velocity.x=0;

		if(this.entities.cursors.up.isDown){
			this.entities.player.body.velocity.y=-200;
		}
		else if(this.entities.cursors.down.isDown){
			this.entities.player.body.velocity.y=200;
		}
		else if(this.entities.cursors.right.isDown){
			this.entities.player.body.velocity.x=200;
		}
		else if(this.entities.cursors.left.isDown){
			this.entities.player.body.velocity.x=-200;
		}
				if(this.input.activePointer.leftButton.isDown){
			this.state.start("gameOver");
		}
	},
	render : function(){}
};

var gameOverState = {
	entities:{},
	preload : function(){},
	create : function(){
		var style ={font:"32px Arial",fill:"#FF0044",align:"center"};
		this.entities.text = this.add.text(400,300,"Game Over",style);
		this.entities.text.anchor.set(0.5);
	},
	update : function(){
		if(this.input.activePointer.leftButton.isDown){
			this.state.start("game");
		}
	},
	render : function(){},
};

game.state.add('game', gameState);
game.state.add('gameOver', gameOverState);

game.state.start('game');