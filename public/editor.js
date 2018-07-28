var music, player, all_doors, platformCollisionGroup, playerCollisionGroup, enemyCollisionGroup, doorCollisionGroup, platforms;

var posX = 0
var posY = 0
var result = "hello"
function makeDraggable(obj, lvl) {
    obj.sprite.inputEnabled = true;
    obj.sprite.input.enableDrag();
    obj.sprite.events.onDragStart.add(lvl.onDragStart, lvl);
    obj.sprite.events.onDragStop.add(lvl.onDragStop, lvl);
    // needed for delete
    obj.sprite.events.onInputOver.add(lvl.onInputOver, lvl);
    obj.sprite.events.onInputOut.add(lvl.onInputLeft, lvl);

    lvl.spriteset.push( obj)
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}



var level = {
    spriteset: [],
    preload: function () {
        game.load.spritesheet('player', 'player.png', 298, 870);
        game.load.text('level_data1', '/level 1.json')
        game.load.spritesheet('fork', 'fork.png', 298, 870);
        game.load.spritesheet('knife', 'knife.png', 298, 870);
        game.load.spritesheet('background', 'house.png');
        game.load.spritesheet('platform', 'Platform.png');
        game.load.spritesheet('door', 'door.png');
        game.load.spritesheet('final_door', 'final_door.png');
        game.load.spritesheet('hand', 'hand.png');

    },
    
    create: function () {
        all_doors = [];


        game.add.sprite(0, 0, 'background');

        game.world.setBounds(0, 0, 10000, 2000);



        platforms = game.add.group();
        platforms.enableBody = true;
        platforms.inputEnableChildren = true;
        platforms.onChildInputDown.add(this.onDown, this);
        enemies = game.add.group();
        enemies.enableBody = true;


        doors = game.add.group();
        doors.enableBody = true;
        //doors.physicsBodyType = Phaser.Physics.P2JS;

        //    player = new Player(50, 1700);
        lvldata1 = JSON.parse(game.cache.getText('level_data1'))
        curr = lvldata1.rick
        player = new Player(curr.x, curr.y, true)
        makeDraggable(player, this)


        for (i = 0; i < lvldata1.platforms.length; i += 1) {
            curr = lvldata1.platforms[i]
            var plt = new Platform(curr.x1, curr.y, curr.x2 - curr.x1, true)
            makeDraggable( plt,this )

            
        }
        this.hoverSprite = null
        for (i = 0; i < lvldata1.enemies.length; i += 1) {
            curr = lvldata1.enemies[i]
            var enm = new Enemy(curr.type, curr.x, curr.y, curr.does_fly, curr.fly_pos, curr.fly_speed, true)

            makeDraggable(enm, this)
        }

        for (i = 0; i < lvldata1.doors.length; i += 1) {
            curr = lvldata1.doors[i]
            var currDoor = new Door(curr.x, curr.y, { "x": curr.tx, "y": curr.ty }, true);
            makeDraggable(currDoor, this)
            all_doors.push(currDoor);

        }
        curr = lvldata1.final_door
        var final = new FinalDoor(curr.x, curr.y, true)
        makeDraggable(final, this)
        all_doors.push(final);

        cursors = game.input.keyboard.createCursorKeys();

        //    new Platform(45, 1789, 62);
        //    new Platform(188, 1598, 57);
        //    new Platform(334, 1795, 91);
        //    new Platform(45, 1789, 62);
        //    new Platform(188, 1598, 57);
        //    new Platform(334, 1795, 91);
        //    new Platform(1000, 1850, 500);

        //    new Enemy('fork', 480, 1820);
        //    new Enemy('knife', 180, 1760);

        //    new FinalDoor(400, 1300);

        //    game.physics.p2.gravity.y = 600;
        //    game.physics.p2.restitution = 0;

        //if (!music) {
        //  music = game.add.sound('music', 0.1, true);
        //  music.play();
        //}
    },

    update: function () {
        if (cursors.up.isDown) {
            game.camera.y -= 4;
        }
        else if (cursors.down.isDown) {
            game.camera.y += 4;
        }

        if (cursors.left.isDown) {
            game.camera.x -= 4;
        }
        else if (cursors.right.isDown) {
            game.camera.x += 4;
        }


        game.input.keyboard.addCallbacks(this, null, null, function (stringFromCharCode, event) {
            // stringFromCharCode === '-' ?
            console.log(stringFromCharCode, event);
            if (event.code == "KeyP") {
                plt = new Platform(this.input.mousePointer.worldX, this.input.mousePointer.worldY, 100, true)
                makeDraggable(plt, this)
                plt.sprite.events.onInputOver.add(this.onInputOver, this);
                plt.sprite.events.onInputOut.add(this.onInputLeft, this);

            }
            else if (event.code == "KeyF") {
                var enm = new Enemy("fork", this.input.mousePointer.worldX, this.input.mousePointer.worldY, false, null, null, true)
                makeDraggable(enm, this)
            }
            else if (event.code == "KeyK") {
                var enm = new Enemy("knife", this.input.mousePointer.worldX, this.input.mousePointer.worldY, false, null, null, true)
                makeDraggable(enm, this)
            }
            else if (event.code == "KeyD") {
                
                var door = new Door(this.input.mousePointer.worldX, this.input.mousePointer.worldY, { "x": curr.tx, "y": curr.ty }, true);
                makeDraggable(door, this)
            }
            else if (event.code == "KeyE") {

                var door = new FinalDoor(this.input.mousePointer.worldX, this.input.mousePointer.worldY,  true);
                makeDraggable(door, this)
            }
            else if (event.code == "KeyS") {
                var json_result = {}
                for (var i = 0; i < this.spriteset.length; i++) {
                    key = this.spriteset[i].get_key()
                    value = this.spriteset[i].get_value()
                    if (key == "final_door" || key == "rick") {
                        json_result[key] = value
                    } else {
                        if (key in json_result) {
                            json_result[key].push(value)
                        } else {
                            json_result[key] = [value]
                        }
                    }
                }
                download(JSON.stringify(json_result), 'level.json', 'text/plain')
            }
            else if (event.key == "+") {
                console.log("keyPlus")
                if (this.hoverSprite != null && this.hoverSprite.key == "platform") {
                    var w = this.hoverSprite.width + 10
                    this.hoverSprite.width = w
                    console.log("new width = ", w)
                }
            }
            else if (event.key == "-") {
                console.log("keyMinus")
                if (this.hoverSprite != null && this.hoverSprite.key == "platform") {
                    var w = this.hoverSprite.width - 10
                    this.hoverSprite.width = w
                    console.log("new width = ", w)
                }
            }
        });
    },
    onDown: function (sprite, pointer) {

        result = "Down " + sprite.key;

        console.log('down', sprite.key);

    },
    onInputOver: function (sprite, pointer) {

        result = "Over " + sprite.key;

        console.log('over', sprite.key);
        this.hoverSprite = sprite
    },
    onInputLeft: function (sprite, pointer) {

        result = "Out " + sprite.key;

        this.hoverSprite = null
    },
    onDragStart: function (sprite, pointer) {

        result = "Dragging " + sprite.key;


    },

    onDragStop: function (sprite, pointer) {


        result = sprite.key + " dropped at x:" + pointer.worldX + " y: " + pointer.worldY;
        sprite.x = pointer.worldX - sprite.width / 2
        sprite.y = pointer.worldY - sprite.height / 2
    },


    render: function () {
        game.debug.text(result, 10, 20);

    }
}

