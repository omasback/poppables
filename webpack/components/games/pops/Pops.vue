<template>
    <div class="game-body">
        <!-- TODO: put in partial and re-use -->
        <div class="game-page">
            <div class="game-header">
                <div class="headerBar"> 

                </div>
                <div class="menuBar flex-container center-around"> 
                    <div class="flex col center-start">
                        <span class="progress">
                            <div class="progress-bar" id="power"> </div>
                        </span>
                        <span>Power</span>
                    </div>
                    <div class="flex">
                        <div class="flex col center-center">
                            <span id="score">0</span>
                            <span>Score</span>
                        </div>
                        <div class="flex col center-center">
                            <div>
                                <span> x </span> <span id="multiplier">1</span>
                            </div>
                            <span>&nbsp;</span>
                            <!--<span>Multiplier</span>-->
                        </div>
                    </div>
                    <div>
                        <span id="pause-btn" class="btn">| |</span>

                    </div>
                </div>
            </div>
            <div class="game-overlay js-game-ui">
                <div id="instruction-overlay" class="game-overlay-page js-instructions-overlay ghost">
                    <p>How to play:</p>
                    <p>Tap or click to pop the poppables!</p>
                    <button id="play">Play Now</button>
                </div>
                <div id="pause-overlay" class="game-overlay-page js-pause-overlay ghost">
                    <p>Pause</p>
                </div>
                <div class="game-overlay-page js-quit-overlay ghost">
                    <p>Quit</p>
                </div>
                <div class="game-overlay-page js-won-overlay ghost">
                    <p>You won!</p>
                </div>
                <div class="game-overlay-page js-error-overlay ghost">
                    <p>Error</p>
                </div>
                <div class="game-overlay-page js-lost-overlay ghost">
                    <p>You lost!</p>
                </div>
            </div>
        </div>
        <div id="game">

        </div>
    </div>
</template>


<script>
const getById = (id) => document.getElementById(id);
const getByClass = (c) => document.getElementsByClassName(c);
const getEle = (selector) => document.querySelector(selector);
const getElements = (selector) => document.querySelectorAll(selector);

//TODO -- move the Pops Game into another file
const game = {
    bubbles: null,
    speed: .1,
    player: {
        score: 0,
        speed: 1,
        multiplier: 1,
        power: 100,
    },
    boot: {
        preload() {

        },
        create() {
            this.game.state.start("load");
        }
    },
    load: {
        preload() {
            //TODO: Asset pipeline -- where will assets be?
            this.game.load.image('logo', '../img/logo-poppables.png');
            this.game.load.image('bubble', '../img/bubble.png');
            this.game.load.spritesheet('poppable', '../img/poppables.png')
        },
        create() {
            this.game.state.start("menu");
        }
    }, 
    menu: {
        preload() {
            
        },
        doLogoAnim() {
            let sprites = this.game.add.group();
            //these two properties || this.game.physics.arcade.enable(logo)
            //sprites.enableBody = true;
            //sprites.physicsBodyType = Phaser.Physics.ARCADE;
            for(let i = 0; i < 60; i++) {
                let logo = this.game.add.sprite(0, 0, 'logo', 0, sprites);
                
                logo.scale.setTo(0.5 / window.devicePixelRatio, 0.5 / window.devicePixelRatio);
                logo.anchor.setTo(0.5);
                
                this.game.physics.arcade.enable(logo);
                switch(true) {
                    case i < 20:
                        logo.x = -100;
                        logo.y = Math.random() * this.game.height;
                        logo.body.velocity.x = 50 + Math.random() * 200;
                        logo.body.velocity.y = 50 + Math.random() * 200;
                        break;
                    case i >= 20 && i < 40:
                        logo.x = Math.random() * this.game.width;
                        logo.y = -200;
                        logo.body.velocity.x = 50 + Math.random() * 200;
                        logo.body.velocity.y = 50 + Math.random() * 200;
                        break;
                    default:
                        logo.x = this.game.width + 300; 
                        logo.y = Math.random() * this.game.height;
                        logo.body.velocity.x = -(50 + Math.random() * 200);
                        logo.body.velocity.y = 50 + Math.random() * 200;
                        break;
                }                
            }
        },
        create() {
            //this.game.paused = true;

            getById('game').classList.add('blurred');
            getById('instruction-overlay').classList.remove('ghost');

            getById('play').addEventListener('click', function(e) {
                this.game.state.start('play');
                getEle('.game-page').classList.add('close');
                getById('instruction-overlay').classList.add('ghost');
                getById('game').classList.remove('blurred');
            }.bind(this));
            

            this.doLogoAnim();
        },
        update() {
            //this.game.state.start("play");
        },
        render() {
            
        }
    },
    pause: {
        preload() {

        },
        create() {

        },
        update() {

        }
    },
    play: {
        bubbles: {
            init(game) {
                let group1 = game.add.group();
                let group2 = game.add.group();
                group1.inputEnableChildren = true;
                group2.inputEnableChildren = true;
            },
            randomize(group) {

            },
            reset(group) {
                let x, y;

                this.bubbles.randomize(group);
                group.reset(x, y);
            }
        },
        setConfig() {
            let config = {};
            switch(true){
                case 570 > this.game.width:
                    config = {
                        size: 'small',
                        bubble: {
                            size: 300,
                            scaledSize: 300 * .3,
                            scale: { //300 * .3 = 100
                                x: 0.33,
                                y: 0.33
                            },
                            perRow: Math.floor((window.innerWidth - 40) / (300 * .33)),
                            perCol: Math.floor((window.innerHeight - 100) / (300 * .33)) //100 for header
                        }
                    }
                break;
                case 1040 > this.game.width:
                    config = {
                        size: 'medium',
                        bubble: {
                            size: 300,
                            scaledSize: 300 * .5,
                            scale: { //300 * .5 = 150
                                x: 0.5,
                                y: 0.5
                            },
                            perRow: Math.floor((window.innerWidth - 40) / (300 * .5)),
                            perCol: Math.ceil((window.innerHeight - 100) / (300 * .5)) //100 for header
                        }
                    }
                break;
                default: 
                    config = {
                        size: 'large',
                        bubble: {
                            size: 300,
                            scaledSize: 300 * .75,
                            scale: { //300 * .75 = 225
                                x: 0.75,
                                y: 0.75
                            },
                            perRow: Math.floor((window.innerWidth - 40) / (300 * .75)), //40 for padding
                            perCol: Math.ceil((window.innerHeight - 100) / (300 * .75)) //100 for header
                        }
                    }
                break;
            }
            return config;
        },
        preload() {
            
        },
        create() {
            this.game.paused = false;

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 50;
            //this.game.physics.setBoundsToWorld();
            
            let config = this.setConfig();

            let bubbleW = config.bubble.size * config.bubble.scale.x;
            let bubbleH = config.bubble.size * config.bubble.scale.y;

            //need two groups for infinite
            game.bubbles = this.game.add.group(); //add this to game.GLOBAL
            let group1 = this.game.add.group();
            let group2 = this.game.add.group();
            group1.inputEnableChildren = true;
            group2.inputEnableChildren = true;
            
            //TODO -- store all bubbles?
            //bubbles.createMultiple(40, 'bubble', [0], true);

            /*
            for(let i = 0; i < 20; i++) {
                let one = this.game.add.sprite(0, 0, 'bubble', 0, group1);
                //let two = this.game.add.sprite(0, 0, 'bubble', 0, group2);
                one.scale.setTo(config.bubble.scale.x, config.bubble.scale.y);
                //two.scale.setTo(config.bubble.scale.x, config.bubble.scale.y);
            }
            group1.align(config.bubble.perRow, -11, group1.children[0].width, group1.children[0].height);
            group1.x = (this.game.width - config.bubble.perRow * (config.bubble.size * config.bubble.scale.x)) / 2;
            group1.y = 120; //this.game.height;
            */

            for(let x = 0; x < config.bubble.perRow; x++) {
                for (let y = 0; y < config.bubble.perCol; y++) {
                    let bubble;
                    if(x % 2 == 0)
                        bubble = this.game.add.sprite(x * config.bubble.scaledSize, y * config.bubble.scaledSize, 'bubble', 0, group1);
                    else    
                        bubble = this.game.add.sprite(x * config.bubble.scaledSize, y * config.bubble.scaledSize + (config.bubble.scaledSize / 2), 'bubble', 0, group1);
                    
                    bubble.scale.setTo(config.bubble.scale.x, config.bubble.scale.y);

                    //is it lucky?
                    if(Math.random() <= .25) {
                        let poppable = this.game.make.sprite(bubble.width / 2, bubble.height / 2, 'poppable');
                        bubble.addChild(poppable);
                    }
                }
            }

            //TODO - make just one function to reference.
            group1.onChildInputDown.add(function(sprite, pointer) {
                //add score
                //console.log(sprite.children)
                console.log(game.player)
                if(sprite.children.length >= 1) {
                    //TODO - emit message to Bar.vue 
                    game.player.score += game.player.multiplier;
                    game.player.multiplier += 1;

                    getById("score").innerHTML = game.player.score;
                    getById("multiplier").innerHTML = game.player.multiplier;
                }
                else {
                    //reset player things
                    game.player.multiplier = 1;
                    getById("multiplier").innerHTML = game.player.multiplier;
                }

                sprite.kill();
            }, this);
            group2.onChildInputDown.add(function(sprite, pointer) {
                //add score
                // console.log(sprite.children, sprite.children.length) ;
                if(sprite.children.length >= 1) {
                    //TODO - emit message to Bar.vue 
                    console.log(game.player)
                    game.player.score += game.player.multiplier;
                    game.player.multiplier += 1;
                    getById("score").innerHTML = game.player.score;
                    getById("multiplier").innerHTML = game.player.multiplier;
                }
                else {
                    //reset player things
                    game.player.multiplier = 1;
                    getById("multiplier").innerHTML = game.player.multiplier;
                }

                sprite.kill();
            }, this);

            game.bubbles.add(group1);
            game.bubbles.add(group2);

            game.bubbles.x = (this.game.width - config.bubble.perRow * (config.bubble.size * config.bubble.scale.x)) / 2;
            game.bubbles.y = 150; //this.game.height;

            //console.log(this.game, this.game.stage, this.game.stage.children)
        },
        update() {
            //this.game.state.start("menu");
            if(this.game.paused) {
                this.game.state.start("pause")
            }
            //console.log(game)
            game.bubbles.y -= game.speed;

            
            //console.log(this.game)
            

        },
        render() {
            
        }
    }
}

//TODO - menu items become vue components
//import Power from './power/Bar.vue'

const Pops = {
    data() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            test: null,
            game: null,
        }
    },
    components: {

    },
    methods: {
        /** Listen: Window events and stuff.
         */
        listen() {
            
            window.addEventListener('resize', function() {
                this.game.width = this.width = window.innerWidth; //* window.devicePixelRatio
                this.game.height = this.height = window.innerHeight; //* window.devicePixelRatio 
                
            }.bind(this));

        }
    },
    created() {
        this.game = new Phaser.Game(this.width, this.height, Phaser.CANVAS, 'game', {preload(){}, create(){}, update(){}, render(){}}, true);
        this.game.state.add("boot", game.boot);
        this.game.state.add("load", game.load);
        this.game.state.add("menu", game.menu);
        this.game.state.add("play", game.play);
        this.game.state.start("boot"); 

        this.listen();
    },
    mounted() {
        // console.log("mounted -- pops")
    }
}

export { Pops as default }

</script>

<style lang="scss" scoped>

</style>