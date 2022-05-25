var BC = BC || {};

// Character scaling
BC.SCALING = 0.2;
BC.BULLET_OFFSET = 35;

// Map size
BC.MAP_SIZE = {
    height: 32 * 25,
    width: 32 * 25
};

//game state
BC.GAME_STATE = {
    HOME: 0,
    PLAY: 1,
    OVER: 2
};

//keys
BC.KEYS = [];

//level
BC.LEVEL = {
    STAGE1: 1,
    STAGE2: 2,
};

//score
BC.SCORE = 0;

//sound
BC.SOUND = true;

//unit tag
BC.UNIT_TAG = {
    ENEMY_BULLET: 900,
    PLAYER_BULLET: 901,
    ENEMY: 1000,
    PLAYER: 1000
};

//container
BC.CONTAINER = {
    ENEMIES:[],
    ENEMY_BULLETS:[],
    PLAYER_BULLETS:[],
    EXPLOSIONS:[]
};

//bullet speed and directions
BC.BULLET_SPEED = 32 * 6;

// Rotation
BC.ROTATION = {
    LEFT: 270.0,
    RIGHT: 90.0,
    UP: 0.0,
    DOWN: 180.0
};

BC.BULLET_DIRECTION = {
    LEFT: {
        x: -BC.BULLET_SPEED,
        y: 0,
        offset_x: -BC.BULLET_OFFSET,
        offset_y: 0,
        rotation: BC.ROTATION.LEFT
    },
    RIGHT: {
        x: BC.BULLET_SPEED,
        y: 0,
        offset_x: BC.BULLET_OFFSET,
        offset_y: 0,
        rotation: BC.ROTATION.RIGHT
    },
    UP: {
        x: 0,
        y: BC.BULLET_SPEED,
        offset_x: 0,
        offset_y: BC.BULLET_OFFSET,
        rotation: BC.ROTATION.UP
    },
    DOWN: {
        x: 0,
        y: -BC.BULLET_SPEED,
        offset_x: 0,
        offset_y: -BC.BULLET_OFFSET,
        rotation: BC.ROTATION.DOWN
    }
};

//bullet type
BC.BULLET_TYPE = {
    PLAYER:1,
    ENEMY:2
};

// the counter of active enemies
BC.ACTIVE_ENEMIES = 0;

// max concurrent enemies
BC.MAX_ENEMIES = 6;