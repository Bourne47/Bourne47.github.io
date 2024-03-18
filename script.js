let barrels;
let floors;
let invisible_walls;
let groundSensor;
let j;
let score;
let ui;
let small_stair1;
let currentScreen;
let gameState = 0;
let pause = 0;
let pause_loaded = 0;
let play_button;
let restart_button;
let home_button;
let instructions;
let start_button;
let gameTitle;
let startLoaded = 0;
let gameOverLoaded = 0;
let gameOver_score;
let gameOver_home_button;
let gameOver_restart_button;
let gameEndedLoaded = 0;
let gameEnded_score;
let gameEnded_home_button;
let gameEnded_restart_button;
let endGame;
let frameCounter = 0;

function preload(){

}

function setup() {
	new Canvas(1510, 675, 'fullscreen');
	background('red');
	currentScreen = "menu";
}

function draw(){
	if (currentScreen == 'menu'){
		drawMenu();
	}else if (currentScreen == 'game'){
		drawGame();
	}else if (currentScreen == 'gameOver'){
		drawGameOver();
	}else if (currentScreen == 'gameEnded'){
		drawGameEnded();
	}
}

function drawMenu(){
    background(227, 181, 16);
    if (startLoaded == 0){
        camera.zoom = 1;
        camera.y = window.height / 2;
        start_button = new Sprite(window.width / 2, window.height / 2 + 50, 400, 300, 'k');
        start_button.color = 'orange';
        start_button.text = 'Start Playing';
        start_button.textSize = 60;
        gameTitle = new Sprite(window.width / 2, 100, 600, 200, 'k');
        gameTitle.color = 'lightblue';
        gameTitle.text = 'Barrel Jumper';
        gameTitle.textSize = 70;
        startLoaded = 1;
    }
    if (start_button.mouse.pressing() || kb.pressing('enter')){
        allSprites.remove();
        startLoaded = 0;
        currentScreen = 'game';
    }
}

function drawGameOver(){
    background(16, 222, 115);
    if (gameOverLoaded == 0){
        camera.zoom = 1;
        camera.y = window.height / 2;
        gameOver_home_button = new Sprite(window.width / 2 + 150, window.height / 2, 200, 100, 'k');
        gameOver_home_button.color = 'orange';
        gameOver_home_button.text = 'Home';
        gameOver_home_button.textSize = 40;
        gameOver_restart_button = new Sprite(window.width / 2 - 150, window.height / 2, 300, 100, 'k');
        gameOver_restart_button.color = 'blue';
        gameOver_restart_button.text = 'Restart Game';
        gameOver_restart_button.textSize = 40;
        gameOver_score = new Sprite(window.width / 2, 100, 820, 200, 'k');
        gameOver_score.color = 'lightblue';
        gameOver_score.text = 'Game Over\nYour Score was ' + score;
        gameOver_score.textSize = 70;
        gameOverLoaded = 1;
    }
    if (gameOver_restart_button.mouse.pressing()){
        allSprites.remove();
        gameOverLoaded = 0;
        currentScreen = 'game';
    }
    if (gameOver_home_button.mouse.pressing()){
        allSprites.remove();
        gameOverLoaded = 0;
        currentScreen = 'menu';
    }
}

function drawGameEnded(){
    background(159, 19, 214);
    if (gameEndedLoaded == 0){
        camera.zoom = 1;
        camera.y = window.height / 2;
        gameEnded_home_button = new Sprite(window.width / 2 + 150, window.height / 2, 200, 100, 'k');
        gameEnded_home_button.color = 'pink';
        gameEnded_home_button.text = 'Home';
        gameEnded_home_button.textSize = 40;
        gameEnded_restart_button = new Sprite(window.width / 2 - 150, window.height / 2, 300, 100, 'k');
        gameEnded_restart_button.color = 'green';
        gameEnded_restart_button.text = 'Restart Game';
        gameEnded_restart_button.textSize = 40;
        gameEnded_score = new Sprite(window.width / 2, 100, 820, 200, 'k');
        gameEnded_score.color = 'lightgreen';
        gameEnded_score.text = 'Game Ended\nYour Score was ' + score;
        gameEnded_score.textSize = 70;
        gameEndedLoaded = 1;
    }
    if (gameEnded_restart_button.mouse.pressing()){
        allSprites.remove();
        gameEndedLoaded = 0;
        currentScreen = 'game';
    }
    if (gameEnded_home_button.mouse.pressing()){
        allSprites.remove();
        gameEndedLoaded = 0;
        currentScreen = 'menu';
    }
}

function addBarrell(){
    let b = new barrels.Sprite();
    b.y = 10;
}

function drawGame() {
    if (gameState == 1 && pause == 0){
        clear();
        background('orange');
        frameCounter += 1;
        if (frameCounter > 700){
            addBarrell();
            frameCounter = 0;
        }

        for (let i = 0; i < barrels.length; i++){
            if (barrels[i].y > 1200){
                let randomNumber = Math.random() * (10 - 1) + 1;
                if (randomNumber > 8){
                    barrels[i].y = 10;
                    barrels[i].x = window.width / 2 + 170;
                    barrels[i].speed = 0;
                }else{
                    let br = barrels[i];
                    br.remove();
                    i -= 1;
                }
                score += 1;
                ui.text = "Your score is: " + score;
            }
        }

        if (player.colliding(endGame)){
            allSprites.remove();
            frameCounter = 0;
            pause = 0;
            pause_loaded = 0;
            gameState = 0;
            currentScreen = 'gameEnded';
        }

        if (player.colliding(barrels) || player.y > 1200){
            allSprites.remove();
            frameCounter = 0;
            pause = 0;
            pause_loaded = 0;
            gameState = 0;
            currentScreen = 'gameOver';
        }

        if ((kb.pressing('up') || kb.pressing(' '))) {
            if (player.y > 250 && groundSensor.overlapping(floors) && !player.overlapping(small_stair1)){
                if ((player.x < window.width / 2 - 250 && player.x > window.width / 2 - 450) || (player.x > window.width / 2 + 250 && player.x < window.width / 2 + 450)){
                    player.y -= 120;
                }else{
                    player.y -= 50;
                }
            }else if (player.overlapping(small_stair1) && player.y > 460){
                player.y -= 15;
                player.collider = 'k';
                //groundSensor.collider = 'k';
            }
        } else if (kb.pressing('down')) {
            if (player.overlapping(small_stair1) && player.y < window.height / 2 + 262 + 190 / 2 - player.d){
                player.y += 5;
                player.collider = 'k';
                //groundSensor.collider = 'k';
            }
        } else {
            player.velocity.x = 0;
            if (!player.overlapping(small_stair1)){
                player.collider = 'd';
                groundSensor.collider = 'd';
            }
        }
        if (kb.pressing('left')) {
            if (groundSensor.overlapping(floors))
                player.velocity.x = -5;
            else
                player.velocity.x = -4;
        } else if (kb.pressing('right')) {
            if (groundSensor.overlapping(floors))
                player.velocity.x = 5;
            else
                player.velocity.x = 4;
        }
        if (kb.pressing('control')) {
            pause = 1;
        }
    } else if (gameState == 0){
        frameCounter = 0;
        score = 0;
        world.gravity.y = 15;

        barrels = new Group();
        barrels.color = 'red';
        barrels.collider = 'd';
        barrels.x = window.width / 2 + 320;
        barrels.d = 25;
        barrels.layer = 9;
        let barrel = new barrels.Sprite();
        barrel.y = 10;

        player = new Sprite();
        player.d = 40;
        player.color = 'blue';
        player.x = window.width / 2 - 170;
        player.y = window.height + 300;
        player.speed = 10;
        player.friction = 0;
        player.layer = 10;
        groundSensor = new Sprite();
        groundSensor.x = player.x;
        groundSensor.y = player.y + 20;
        groundSensor.width = 40;
        groundSensor.height = 5;
        groundSensor.collider = 'n';
        groundSensor.visible = false;
        groundSensor.mass = 0.01;
        let j = new GlueJoint(player, groundSensor);
        j.visible = false;

        floors = new Group();
        floors.layer = 3;
        invisible_walls = new Group();
        floors.color = 'green';
        invisible_walls.color = 'black';
        floors.x = window.width / 2;
        floors.width = 700;
        invisible_walls.width = 30;
        floors.height = 8;
        invisible_walls.height = 30;
        floors.collider = 'static';
        invisible_walls.collider = 'static';
        invisible_walls.x = window.width / 2;
        while (floors.length < 5){
            let floor = new floors.Sprite();
            let wall = new invisible_walls.Sprite();
            wall.y = 90 + 200 * floors.length - wall.height / 2 - floors.height / 2 - 30;
            floor.y = 90 + 200 * floors.length;
            if (floors.length % 2 == 0){
                wall.rotation = 5;
                floor.rotation = 5;
                floor.x = floors.x - 120;
                wall.x = invisible_walls.x - floors.width / 2 - 120;
            }else{
                floor.rotation = -5;
                wall.rotation = -5;
                floor.x = floors.x + 120;
                wall.x = invisible_walls.x + floors.width / 2 + 120;
            }
        }
        invisible_walls.visible = false;
        
        endGame = new Sprite(window.width - 342, 210, 100, 100, 'k');
        endGame.rotation = -5;
        endGame.color = 'red';
        endGame.text = 'End';
        endGame.textSize = 40;


        small_stair1 = new Group();
        small_stair1.color = (34, 113, 179);
        small_stair1.collider = 'n';
        while (small_stair1.length < 4){
            let piece = new small_stair1.Sprite();
            if (small_stair1.length == 1){
                piece.x = window.width / 2;
                piece.y = window.height / 2 + 242;
                piece.height = 250;
                piece.width = 15;
                piece.layer = 2;
            }else if (small_stair1.length == 2){
                piece.x = window.width / 2 + 35;
                piece.y = window.height / 2 + 240;
                piece.height = 250;
                piece.width = 15;
                piece.layer = 2;
            }
            else if (small_stair1.length == 3){
                piece.x = window.width / 2 + 13;
                piece.y = window.height / 2 + 250;
                piece.height = 15;
                piece.width = 37;
                piece.layer = 1;
            }
            else if (small_stair1.length == 4){
                piece.x = window.width / 2 + 13;
                piece.y = window.height / 2 + 305;
                piece.height = 15;
                piece.width = 37;
                piece.layer = 1;
            }
        }

        camera.zoom = 0.5;
        camera.y = 650;

        ui = new Sprite();
        ui.x = window.width - 100;
        ui.color = 'lightblue';
        ui.y = 25;
        ui.width = window.width / 5;
        ui.height = 40;
        ui.textSize = 40;
        ui.text = "Your score is: " + score;
        textAlign(CENTER);
        ui.collider = 'n';

        instructions = new Sprite();
        instructions.x = 0;
        instructions.y = 330;
        instructions.width = 300;
        instructions.height = 610;
        instructions.color = 'white';
        instructions.collider = 'n';
        instructions.text = 'Press w, space\n or up arrow to\n jump.\nPress a or left\n arrow to move\n to the left.\nPress d or right\n arrow to move\n to the right.\nPress control to\n pause the game.\nPress backspace\n when in pause to\n return to the game.'
        instructions.textSize = 35;

        gameState = 1;
    } else if (pause == 1){
        let old_barrels_speed = [];
        for (let i = 0; i < barrels.length; i++){
            let bar = barrels[i];
            old_barrels_speed.push(bar.speed);
            barrels[i].speed = 0;
        }
        let old_player_speed = player.speed;
        player.speed = 0;
        world.gravity.y = 0;
        if (pause_loaded == 0){
            play_button = new Sprite(window.width - 20, window.height / 1.8, 200, 100, 'k');
            play_button.color = 'green';
            play_button.text = 'play';
            play_button.textSize = 40;
            restart_button = new Sprite(window.width - 20, window.height / 1.8 + 150, 200, 100, 'k');
            restart_button.color = 'purple';
            restart_button.text = 'restart';
            restart_button.textSize = 40;
            home_button = new Sprite(window.width - 20, window.height / 1.8 + 300, 200, 100, 'k')
            home_button.color = 'blue';
            home_button.text = 'menu';
            home_button.textSize = 40;
            pause_loaded = 1;
        }
        
        if (kb.pressing('backspace') || play_button.mouse.pressing()){
            play_button.remove();
            restart_button.remove();
            home_button.remove();
            world.gravity.y = 15;
            for (let i = 0; i < barrels.length; i++){
                barrels[i].speed = old_barrels_speed[i];
            }
            player.speed = old_player_speed;
            pause = 0;
            pause_loaded = 0;
        }

        if (restart_button.mouse.pressing()){
            allSprites.remove();
            pause = 0;
            pause_loaded = 0;
            gameState = 0;
        }

        if (home_button.mouse.pressing()){
            allSprites.remove();
            pause = 0;
            pause_loaded = 0;
            gameState = 0;
            currentScreen = 'menu';
        }
    }
}