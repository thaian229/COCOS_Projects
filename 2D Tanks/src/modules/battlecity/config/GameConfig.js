var BC = BC || {};

// Character scaling
BC.SCALING = 0.25;

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

BC.BULLET_DIRECTION = {
    LEFT: {
        x: -BC.BULLET_SPEED,
        y: 0,
    },
    RIGHT: {
        x: BC.BULLET_SPEED,
        y: 0,
    },
    UP: {
        x: 0,
        y: BC.BULLET_SPEED,
    },
    DOWN: {
        x: 0,
        y: -BC.BULLET_SPEED,
    }
};

// Rotation
BC.ROTATION = {
    LEFT: 270.0,
    RIGHT: 90.0,
    UP: 0.0,
    DOWN: 180.0
};

// the counter of active enemies
BC.ACTIVE_ENEMIES = 0;

// max concurrent enemies
BC.MAX_ENEMIES = 6;