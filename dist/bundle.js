var WaterSkillGame;
(function (WaterSkillGame) {
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
        }
        run(container, loadedCallback) {
            // Phaser.AUTO - determine the renderer automatically (canvas, webgl)
            this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, container, WaterSkillGame.States.MainState);
            this.game.stateLoadedCallback = loadedCallback;
        }
        setItemsArray(array) {
            let state = this.game.state.getCurrentState();
            if (state) {
                state.setItemsArray(array);
            }
        }
        setWaterLevel(percentage, delay) {
            let state = this.game.state.getCurrentState();
            if (state) {
                state.setWaterLevel(percentage, delay);
            }
        }
    }
    WaterSkillGame.Game = Game;
})(WaterSkillGame || (WaterSkillGame = {}));
var WaterSkillGame;
(function (WaterSkillGame) {
    var Models;
    (function (Models) {
        class SkillModel {
        }
        Models.SkillModel = SkillModel;
    })(Models = WaterSkillGame.Models || (WaterSkillGame.Models = {}));
})(WaterSkillGame || (WaterSkillGame = {}));
var WaterSkillGame;
(function (WaterSkillGame) {
    var Prefabs;
    (function (Prefabs) {
        class MouseDragHandler extends p2.Body {
            constructor(game) {
                super();
                this.game = game;
                this.sprites = [];
                game.physics.p2.world.addBody(this);
                game.input.onDown.add(this.click, this);
                game.input.onUp.add(this.release, this);
                game.input.addMoveCallback(this.move, this);
            }
            click(pointer) {
                let bodies = this.game.physics.p2.hitTest(pointer.position, this.sprites);
                // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
                let physicsPos = [this.game.physics.p2.pxmi(pointer.position.x), this.game.physics.p2.pxmi(pointer.position.y)];
                if (bodies.length) {
                    let clickedBody = bodies[0];
                    let localPointInBody = [0, 0];
                    // this function takes physicsPos and coverts it to the body's local coordinate system
                    clickedBody.toLocalFrame(localPointInBody, physicsPos);
                    // use a revoluteContraint to attach mouseBody to the clicked body
                    this.mouseConstraint = this.game.physics.p2.createRevoluteConstraint(this, [0, 0], clickedBody, [this.game.physics.p2.mpxi(localPointInBody[0]), this.game.physics.p2.mpxi(localPointInBody[1])]);
                }
            }
            release() {
                // remove constraint from object's body
                this.game.physics.p2.removeConstraint(this.mouseConstraint);
            }
            move(pointer) {
                // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
                this.position[0] = this.game.physics.p2.pxmi(pointer.position.x);
                this.position[1] = this.game.physics.p2.pxmi(pointer.position.y);
            }
        }
        Prefabs.MouseDragHandler = MouseDragHandler;
    })(Prefabs = WaterSkillGame.Prefabs || (WaterSkillGame.Prefabs = {}));
})(WaterSkillGame || (WaterSkillGame = {}));
var WaterSkillGame;
(function (WaterSkillGame) {
    var Prefabs;
    (function (Prefabs) {
        class ProxyImageLoader extends Phaser.Loader {
            constructor(game) {
                super(game);
            }
            load(key, callback) {
                this.image(key, "/api/proxy/images/" + this.normaliseKey(key), false);
                this.onLoadComplete.addOnce(() => {
                    callback(key);
                });
                this.start();
            }
            normaliseKey(key) {
                return key.replace("#", "sharp");
            }
        }
        Prefabs.ProxyImageLoader = ProxyImageLoader;
    })(Prefabs = WaterSkillGame.Prefabs || (WaterSkillGame.Prefabs = {}));
})(WaterSkillGame || (WaterSkillGame = {}));
var WaterSkillGame;
(function (WaterSkillGame) {
    var Prefabs;
    (function (Prefabs) {
        class BuoyancyManager {
            constructor(k, c) {
                this.liftForce = new Phaser.Point();
                this.k = 100; // up force per submerged "volume"
                this.c = 0.8; // viscosity
                this.v = [0, 0];
                this.k = k;
                this.c = c;
            }
            applyAABBBuoyancyForces(body, planePosition) {
                let centerOfBuoyancy = new Phaser.Point();
                // Get shape AABB
                let bounds = body.sprite.getBounds();
                let areaUnderWater;
                if (bounds.y > planePosition.y) {
                    // Fully submerged
                    centerOfBuoyancy = body.sprite.position;
                    areaUnderWater = body.sprite.width * body.sprite.height;
                }
                else if (bounds.y + bounds.height > planePosition.y) {
                    // Partially submerged
                    let width = bounds.width;
                    let height = Math.abs(bounds.y - planePosition.y);
                    // areaUnderWater = width * height;
                    areaUnderWater = body.sprite.width * body.sprite.height;
                    centerOfBuoyancy = body.sprite.position;
                }
                else {
                    body.angularDamping = 0.1;
                    return;
                }
                // Compute lift force
                this.liftForce = Phaser.Point.subtract(centerOfBuoyancy, planePosition);
                // this.liftForce.setMagnitude(areaUnderWater * this.k);
                // Make center of bouycancy relative to the body
                centerOfBuoyancy = Phaser.Point.subtract(centerOfBuoyancy, body.sprite.position);
                // Apply forces
                body.velocity.x = body.velocity.x * this.c;
                body.velocity.y = body.velocity.y * this.c;
                body.angularDamping = 0.9;
                // body.applyForce([this.viscousForce.x, this.viscousForce.y], centerOfBuoyancy.x, centerOfBuoyancy.y);
                if (this.liftForce.y > 0) {
                    body.applyForce([0, this.liftForce.y], centerOfBuoyancy.x, centerOfBuoyancy.y);
                }
            }
        }
        Prefabs.BuoyancyManager = BuoyancyManager;
    })(Prefabs = WaterSkillGame.Prefabs || (WaterSkillGame.Prefabs = {}));
})(WaterSkillGame || (WaterSkillGame = {}));
var WaterSkillGame;
(function (WaterSkillGame) {
    var Prefabs;
    (function (Prefabs) {
        class SkillPill extends Phaser.Sprite {
            constructor(game, x, y, buoyancyManager) {
                super(game, x, y);
                this.inWater = false;
                this.buoyancyManager = buoyancyManager;
                this.game.physics.p2.enable(this);
                // this.water = water;
                this.body.angularVelocity = (Math.random() * 8) - 4;
                // this.body.debug = true;
                /*var text = this.game.add.text(0, 0, "MyText", { font: '14px Raleway', align: 'center' });
                text.anchor.setTo(0.5);
                text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
                //var textSprite = this.add.sprite(this.world.centerX - 100, this.world.centerY - 200, null);
                this.addChild(text);
                //this.physics.enable(textSprite, Phaser.Physics.ARCADE);
                /*textSprite.body.bounce.y = 1;
                textSprite.body.gravity.y = 2000;
                textSprite.body.collideWorldBounds = true;*/
            }
            updatePhysics(point, water) {
                if (point) {
                    this.buoyancyManager.applyAABBBuoyancyForces(this.body, point);
                }
                if (this.y > this.game.height / 2 && !this.inWater) {
                    water.splash(this.x, this.body.velocity.y / 10);
                }
                if (this.y < this.game.height / 2 && this.inWater) {
                    water.splash(this.x, this.body.velocity.y / 10);
                }
                if (this.y > this.game.height / 2) {
                    this.inWater = true;
                }
                else {
                    this.inWater = false;
                }
                /*var velocity = [];
                this.body.getVelocityAtPoint(velocity, [0, 0]);
                var velocityVector = new Phaser.Point(velocity[0], velocity[1]);
                if (this.position.y > this.water.getWaterLevel(this.position.x).y) {
                    if (!this.splashed) {
                        this.water.splash(this.position.x, velocityVector.getMagnitude() * 3);
                        this.splashed = true;
                    }
                }
                this.body.angularVelocity *= 0.99;*/
            }
        }
        Prefabs.SkillPill = SkillPill;
    })(Prefabs = WaterSkillGame.Prefabs || (WaterSkillGame.Prefabs = {}));
})(WaterSkillGame || (WaterSkillGame = {}));
var WaterSkillGame;
(function (WaterSkillGame) {
    var Prefabs;
    (function (Prefabs) {
        class SkillPillFactory {
            constructor(game) {
                this.game = game;
                this.imageLoader = new Prefabs.ProxyImageLoader(game);
            }
            newInstance(x, y, term, size) {
                let buoyancyManager = new Prefabs.BuoyancyManager(0.04, 0.9);
                let skillPill = new Prefabs.SkillPill(this.game, x, y, buoyancyManager);
                this.imageLoader.load(term, (key) => {
                    skillPill.loadTexture(key);
                    skillPill.scale.setTo(size / skillPill.width);
                    skillPill.body.setRectangleFromSprite(skillPill);
                });
                return skillPill;
            }
        }
        Prefabs.SkillPillFactory = SkillPillFactory;
    })(Prefabs = WaterSkillGame.Prefabs || (WaterSkillGame.Prefabs = {}));
})(WaterSkillGame || (WaterSkillGame = {}));
var WaterSkillGame;
(function (WaterSkillGame) {
    var Prefabs;
    (function (Prefabs) {
        class Water extends Phaser.Polygon {
            constructor(game, level, resolution, points, waterPoints) {
                super(points);
                this.game = game;
                this.passThroughs = 1;
                this.spread = 0.25;
                this.resolution = resolution;
                this.level = level;
                this.waterPoints = waterPoints;
                this.game.physics.p2.enable(this);
            }
            update(...graphicsCollection) {
                for (let i = 0; i < this.waterPoints.length - 2; i++) {
                    this.waterPoints[i].update(0.025, 0.025);
                }
                let leftDeltas = Array();
                let rightDeltas = Array();
                // do some passes where this.waterPoints pull on their neighbours
                for (let j = 0; j < this.passThroughs; j++) {
                    for (let i = 0; i < this.waterPoints.length - 3; i++) {
                        if (i > 0) {
                            leftDeltas[i] = this.spread * (this.waterPoints[i].y - this.waterPoints[i - 1].y);
                            this.waterPoints[i - 1].speed += leftDeltas[i];
                        }
                        if (i < this.waterPoints.length - 1) {
                            rightDeltas[i] = this.spread * (this.waterPoints[i].y - this.waterPoints[i + 1].y);
                            this.waterPoints[i + 1].speed += rightDeltas[i];
                        }
                    }
                    for (let i = 0; i < this.waterPoints.length - 3; i++) {
                        if (i > 0) {
                            this.waterPoints[i - 1].y += leftDeltas[i];
                        }
                        else if (i < this.waterPoints.length - 1) {
                            this.waterPoints[i + 1].y += rightDeltas[i];
                        }
                    }
                }
                this.fixWaterPositions();
                graphicsCollection.forEach(graphics => {
                    graphics.beginFill(0x4da6ff, 0.5);
                    this.points = this.waterPoints;
                    graphics.drawPolygon(this.points);
                });
            }
            splash(position, speed) {
                let singleLength = this.game.width / this.resolution;
                let index = Math.round(position / singleLength);
                if (index >= 0 && index < this.waterPoints.length) {
                    this.waterPoints[index].speed = speed;
                }
            }
            setLevel(percentage, delay, callback) {
                if (delay !== undefined) {
                    delay = Phaser.Timer.SECOND * 2;
                }
                if (percentage !== undefined) {
                    this.level = percentage;
                }
                for (let i = 0; i < this.waterPoints.length - 2; i++) {
                }
            }
            resize() {
                this.setLevel(this.level);
            }
            getWaterLevel(position) {
                let singleLength = this.game.width / this.resolution;
                let index = Math.round(position / singleLength);
                if (index >= this.waterPoints.length || index < 0) {
                    return new Phaser.Point(0, this.waterPoints[0].y);
                }
                return new Phaser.Point(0, this.waterPoints[index].y);
            }
            fixWaterPositions() {
                let singleLength = this.game.width / this.resolution;
                for (let i = 0; i <= this.waterPoints.length - 3; i++) {
                    this.waterPoints[i].x = singleLength * i;
                }
                this.waterPoints[this.waterPoints.length - 2].x = this.game.width;
                this.waterPoints[this.waterPoints.length - 2].y = this.game.height;
                this.waterPoints[this.waterPoints.length - 1].y = this.game.height;
            }
            calculateWaterHeight() {
                return this.game.height - (this.game.height * this.level);
            }
        }
        Prefabs.Water = Water;
    })(Prefabs = WaterSkillGame.Prefabs || (WaterSkillGame.Prefabs = {}));
})(WaterSkillGame || (WaterSkillGame = {}));
var WaterSkillGame;
(function (WaterSkillGame) {
    var Prefabs;
    (function (Prefabs) {
        class WaterFactory {
            constructor(game) {
                this.game = game;
                this.k = 0.025;
                this.resolution = 20;
            }
            newInstance(level) {
                let waterHeight = this.game.height - (this.game.height * level);
                let waterPoints = this.createwaterPoints(this.resolution, waterHeight, this.k);
                let points = this.createWater(waterPoints);
                return new Prefabs.Water(this.game, level, this.resolution, points, waterPoints);
            }
            createwaterPoints(resolution, waterHeight, k) {
                let points = Array();
                let singleLength = this.game.width / resolution;
                for (let i = 0; i <= resolution; i++) {
                    points.push(new Prefabs.WaterPoint(this.game, singleLength * i, waterHeight, waterHeight, k));
                }
                return points;
            }
            createWater(waterPoints) {
                waterPoints.push(new Phaser.Point(this.game.width, this.game.height));
                waterPoints.push(new Phaser.Point(0, this.game.height));
                return waterPoints;
            }
        }
        Prefabs.WaterFactory = WaterFactory;
    })(Prefabs = WaterSkillGame.Prefabs || (WaterSkillGame.Prefabs = {}));
})(WaterSkillGame || (WaterSkillGame = {}));
var WaterSkillGame;
(function (WaterSkillGame) {
    var Prefabs;
    (function (Prefabs) {
        class WaterPoint extends Phaser.Point {
            constructor(game, x, y, targetHeight, k) {
                super(x, y);
                this.targetHeight = targetHeight;
                this.k = k;
                this.game = game;
                this.speed = 0;
            }
            update(dampening, tension) {
                let deltaY = this.targetHeight - this.y;
                this.speed += tension * deltaY - this.speed * dampening;
                this.y += this.speed;
            }
        }
        Prefabs.WaterPoint = WaterPoint;
    })(Prefabs = WaterSkillGame.Prefabs || (WaterSkillGame.Prefabs = {}));
})(WaterSkillGame || (WaterSkillGame = {}));
var WaterSkillGame;
(function (WaterSkillGame) {
    var States;
    (function (States) {
        class MainState extends Phaser.State {
            constructor() {
                super();
                this.skillPills = new Array();
            }
            create() {
                this.skillPillGroup = new Phaser.Group(this.game);
                this.waterGroup = new Phaser.Group(this.game);
                this.waterGroup.z = 10;
                this.skillPillGroup.z = 1;
                this.setUpPhysics();
                let waterFactory = new WaterSkillGame.Prefabs.WaterFactory(this.game);
                this.water = waterFactory.newInstance(0.5);
                // this.waterGroup.add(this.water);
                this.game.stage.backgroundColor = 0xF5F5F5;
                this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
                this.game.tweens.frameBased = true;
                this.graphics = this.game.add.graphics(0, 0);
                this.skillPillFactory = new WaterSkillGame.Prefabs.SkillPillFactory(this.game);
                this.game.scale.onSizeChange.add(() => {
                    this.water.setLevel();
                });
                this.mouseDragHandler = new WaterSkillGame.Prefabs.MouseDragHandler(this.game);
                this.game.stateLoadedCallback();
            }
            update() {
                this.graphics.clear();
                this.water.update(this.graphics);
                this.graphics.endFill();
                this.skillPills.forEach(skillPill => {
                    skillPill.updatePhysics(this.water.getWaterLevel(skillPill.position.x), this.water);
                });
            }
            setWaterLevel(level, delay) {
                this.water.setLevel(level, delay);
            }
            setItemsArray(array) {
                array.forEach(skillModel => {
                    let skillPill = this.skillPillFactory.newInstance(100, 100, skillModel.skill.name, 100);
                    this.game.add.existing(skillPill);
                    this.mouseDragHandler.sprites.push(skillPill);
                    this.skillPills.push(skillPill);
                    this.skillPillGroup.add(skillPill);
                });
            }
            setUpPhysics() {
                this.game.physics.startSystem(Phaser.Physics.P2JS);
                this.game.physics.p2.gravity.y = 1000;
                this.game.physics.p2.restitution = 0.3;
            }
        }
        States.MainState = MainState;
    })(States = WaterSkillGame.States || (WaterSkillGame.States = {}));
})(WaterSkillGame || (WaterSkillGame = {}));
