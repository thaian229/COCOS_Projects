/*
* Map object, holds all terrains, enemies. etc/
* */

var TDFMap = cc.Node.extend({
    _instance: null,
    _cells: [[]],
    _movePath: [],
    _width: 0,
    _height: 0,

    ctor: function () {
        this._super();
        if (this._instance === null) {
            this._instance = this;
        }
        this.initiate();
    },

    initiate: function () {
        this._cells = new Array(TDF.MAP_HEIGHT_TILES).fill(new Array(TDF.MAP_WIDTH_TILES));
        this._movePath = [];
        this._width = TDF.MAP_WIDTH_TILES * TDF.TILE_SIZE;
        this._height = TDF.MAP_HEIGHT_TILES * TDF.TILE_SIZE;

        this.generateRandomMap();
    },

    // For test purpose
    generateRandomMap: function () {
        let i, j;
        for (i = 0; i < TDF.MAP_HEIGHT_TILES; i++ ) {
            for (j = 0; j < TDF.MAP_WIDTH_TILES; j++) {
                let index = Math.floor(Math.random() * TDF.TERRAIN_INDEX.length);
                let terrain = null;
                if (index < 2) {
                    terrain = new Terrain(TDF.TERRAIN_INDEX[index]);
                } else {
                    terrain = new Obstacle(TDF.TERRAIN_INDEX[index]);
                }
                this.addTerrainToCell(i, j, terrain);
            }
        }
    },

    addTerrainToCell: function (x, y, terrain) {
        this._cells[x][y] = terrain;
        this.addChild(terrain);
        terrain.setPosition(x * TDF.TILE_SIZE, (TDF.MAP_HEIGHT_TILES - 1 - y) * TDF.TILE_SIZE);
    }
});