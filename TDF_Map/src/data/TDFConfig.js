var TDF = TDF || {};

// Map config
TDF.MAP_WIDTH_TILES = 7;
TDF.MAP_HEIGHT_TILES = 7;
TDF.TILE_SIZE = 100;

TDF.MAX_OBSTACLE_NUMBER = 7;

// Terrain config
TDF.TERRAINS = {
    DIRT: {
        IsWalkable: true,
        BaseSpritePath: "sprite/terrain/map_background_0001.png"
    },
    BASE: {
        IsWalkable: false,
        BaseSpritePath: "sprite/terrain/map_cell_0002.png"
    },
    STONE: {
        IsWalkable: false,
        BaseHP: 100,
        BaseSpritePath: "sprite/terrain/map_cell_0000.png",
        DecorationSpritePath: "sprite/terrain/map_decoration_rock_0001.png"
    },
    TREE: {
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
        BaseDamage: 1
    },

    ELITE: {
        BaseHP: 60,
        MoveSpeed: 1.5 * TDF.TILE_SIZE,
        BaseDamage: 2
    },

    CAPTAIN: {
        BaseHP: 250,
        MoveSpeed: 0.5 * TDF.TILE_SIZE,
        BaseDamage: 5
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