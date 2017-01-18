<template>
  <div class="wrap">
    <div id="game">
    </div>
  </div>
</template>


<script>
import $ from 'jquery'
export default {
    data() {
        return {
            width: $(window).innerWidth(),
            height: $(window).innerHeight(),
            score: 0,
            game: null,
            boot: {
                preload() {
                    
                },
                create() {
                    this.game.state.start("load");
                }
            },
            load: {
                preload() {
                    this.game.load.image('logo', '../img/logo-poppables.png');
                },
                create() {
                    this.game.state.start("menu");
                }
            }, 
            menu: {
                preload() {
                    
                },
                create() {
                    this.game.physics.startSystem(Phaser.Physics.ARCADE);
                    this.game.physics.arcade.gravity.y = 50;
                    //this.game.physics.setBoundsToWorld();
                    
                    let sprites = this.game.add.group();
                    sprites.inputEnableChildren = true;
                    //these two properties || this.game.physics.arcade.enable(logo)
                    //sprites.enableBody = true;
                    //sprites.physicsBodyType = Phaser.Physics.ARCADE;
                    console.log(window.devicePixelRatio)
                    for(let i = 0; i < 60; i++) {
                        let logo = this.game.add.sprite(0, 0, 'logo', 0, sprites);
                        
                        logo.scale.setTo(0.5 / window.devicePixelRatio, 0.5 / window.devicePixelRatio);
                        logo.anchor.setTo(0.5);
                        logo.checkWorldBounds = true;
                        
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
     
                        logo.events.onOutOfBounds.add(function(sprite){
                            //console.log(sprite)
                            //sprite.reset()
                        }, this);
                        
                    }
    
                    sprites.onChildInputDown.add(function(sprite, pointer){
                        //console.log(sprite)
                        sprite.kill();
                    }, this);
                    
                    
                },
                update() {
                    //this.game.state.start("play");
                },
                render() {
                    
                }
            },
            play: {
                preload() {
                    
                },
                create() {
                    
                },
                update() {
                    //this.game.state.start("menu");
                },
                render() {
                    
                }
            }
        }
    },
    methods: {
      
    },
    created() {
        console.log("created -- pops");
        console.log(this);
        this.game = new Phaser.Game(this.width, this.height, Phaser.CANVAS, 'game', {preload(){}, create(){}, update(){}, render(){}}, true);
        this.game.state.add("boot", this.boot);
        this.game.state.add("load", this.load);
        this.game.state.add("menu", this.menu);
        this.game.state.add("play", this.play);
        
        this.game.state.start("boot");
    },
    mounted() {
        console.log("mounted -- pops")
    }
  }
</script>

<style lang="scss" scoped>
.wrap {
  margin-top: 100px; /* space for header */
}
.example {
  font-weight: bold;
}
</style>