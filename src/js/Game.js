import Phaser from 'phaser'
import Main from 'Main.js'

class Game extends Phaser.Game {

	constructor() {
		super(800, 600, Phaser.AUTO)

		this.state.add('Main', Main, false)
	}

	static preload(){

		this.game.load.image('sky', '/assets/sky.png');
		this.game.load.image('ground', '/assets/platform.png');
    	this.game.load.image('star', '/assets/star.png');
	}
}