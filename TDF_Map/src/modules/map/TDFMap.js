/*
* Map object, holds all terrains, enemies. etc/
* */

var TDFMap = cc.Node.extend({
    _instance: null,
    _cells: [[]],
    _movePath: [],
    _width: 0,
    _height: 0,
    _pathFinder: null,

    ctor: function () {
        this._super();
        if (this._instance === null) {
            this._instance = this;
        }

        this._cells = new Array(TDF.MAP_HEIGHT_TILES);
        for (let i = 0; i < this._cells.length; i++) {
            this._cells[i] = new Array(TDF.MAP_WIDTH_TILES);
        }

        this._pathFinder = new Pathfinder(this);
        this.generateMap();
    },

    initiate: function () {
        this._cells = new Array(TDF.MAP_HEIGHT_TILES);

        let i, j;
        for (i = 0; i < this._cells.length; i++) {
            this._cells[i] = new Array(TDF.MAP_WIDTH_TILES);
        }

        for (i = 0; i < TDF.MAP_HEIGHT_TILES; i++ ) {
            for (j = 0; j < TDF.MAP_WIDTH_TILES; j++) {
                this._cells[i][j] = new Terrain(TDF.TERRAINS.NONE);
            }
        }
        this._movePath = [];
        this._width = TDF.MAP_WIDTH_TILES * TDF.TILE_SIZE;
        this._height = TDF.MAP_HEIGHT_TILES * TDF.TILE_SIZE;
    },

    // Getters & Setters
    getInstance: function () {
        if (this._instance) {
            return this._instance;
        }
        return new TDFMap();
    },

    // For test purpose - make a completely random map with no rules.
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

    generateMap: function () {
        this.initiate();
        this.generateRandomPath(0, 0, 6, 6);

        let obstacleCount = 0, i, j;

        for (i = 0; i < TDF.MAP_HEIGHT_TILES; i++ ) {
            for (j = 0; j < TDF.MAP_WIDTH_TILES; j++) {
                if (this._cells[i][j]._type.Type !== -1) continue;
                let index = Math.floor(Math.random() * TDF.TERRAIN_INDEX.length);
                let terrain = null;
                if (index < 2 || (obstacleCount >= TDF.MAX_OBSTACLE_NUMBER)) {
                    terrain = new Terrain(TDF.TERRAIN_INDEX[1]);
                } else {
                    terrain = new Obstacle(TDF.TERRAIN_INDEX[index]);
                    obstacleCount++;
                }
                this.addTerrainToCell(i, j, terrain);
            }
        }
    },

    generateRandomPath: function (sx, sy, tx, ty) {
        this._movePath = this._pathFinder.randomPath(sx, sy, tx, ty);
        for (let i = 0; i < this._movePath.length; i++) {
            let terrain = new Terrain(TDF.TERRAIN_INDEX[0]);
            this.addTerrainToCell(this._movePath[i].x, this._movePath[i].y, terrain);
        }
    },

    addTerrainToCell: function (x, y, terrain) {
        this._cells[x][y] = terrain;
        this.addChild(terrain);
        terrain.setPosition(x * TDF.TILE_SIZE, (TDF.MAP_HEIGHT_TILES - 1 - y) * TDF.TILE_SIZE);
    },

    spawnEnemy: function (type) {
        let enemy = new Enemy(type);
        this.addChild(enemy);
        enemy.setPosition(TDF.TILE_SIZE / 2, (TDF.MAP_HEIGHT_TILES - 1) * TDF.TILE_SIZE + TDF.TILE_SIZE / 2);
    }
});