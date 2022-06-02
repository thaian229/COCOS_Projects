var TDF = TDF || {};

// Map config
TDF.MAP_WIDTH_TILES = 7;
TDF.MAP_HEIGHT_TILES = 7;
TDF.TILE_SIZE = 100;

TDF.MAX_OBSTACLE_NUMBER = 7;

// Terrain config
TDF.TERRAINS = {
    NONE: {
        Type: -1,
        IsWalkable: true,
        BaseSpritePath: "sprite/terrain/map_background_0001.png"
    },
    DIRT: {
        Type: 0,
        IsWalkable: true,
        BaseSpritePath: "sprite/terrain/map_background_0001.png"
    },
    BASE: {
        Type: 1,
        IsWalkable: false,
        BaseSpritePath: "sprite/terrain/map_cell_0002.png"
    },
    STONE: {
        Type: 2,
        IsWalkable: false,
        BaseHP: 100,
        BaseSpritePath: "sprite/terrain/map_cell_0000.png",
        DecorationSpritePath: "sprite/terrain/map_decoration_rock_0001.png"
    },
    TREE: {
        Type: 3,
        IsWalkable: false,
        BaseHP: 35,
        BaseSpritePath: "sprite/terrain/map_cell_0003.png",
        DecorationSpritePath: "sprite/terrain/map_forest_obstacle_1.png"
    }
};

TDF.TERRAIN_INDEX = [
    TDF.TERRAINS.DIRT,
    TDF.TERRAINS.BASE,
    TDF.TERRAINS.STONE,
    TDF.TERRAINS.TREE
];

// Enemy
TDF.ENEMIES = {
    LESSER: {
        BaseHP: 25,
        MoveSpeed: 2 * TDF.TILE_SIZE,
        BaseDamage: 1,
        SPRITE_BASE: "assassin/monster_assassin_run_"
    },

    ELITE: {
        BaseHP: 60,
        MoveSpeed: 1.5 * TDF.TILE_SIZE,
        BaseDamage: 2,
        SPRITE_BASE: "dragon/monster_dragon_run_"
    },

    CAPTAIN: {
        BaseHP: 250,
        MoveSpeed: 0.5 * TDF.TILE_SIZE,
        BaseDamage: 5,
        SPRITE_BASE: "giant/monster_giant_run_"
    }
};

TDF.ENEMY_INDEX = [
    TDF.ENEMIES.LESSER,
    TDF.ENEMIES.ELITE,
    TDF.ENEMIES.CAPTAIN
];

// Draw order
TDF.ZORDERS = {
    BACKGROUND: 0,
    CELL_BASE: 1,
    CELL_DECOR: 2,
    ENEMY: 1,
    UI: 10
};

TDF.TAGS = {
    CELL: 0,
    ENEMY: 1,
    UI: 2
}