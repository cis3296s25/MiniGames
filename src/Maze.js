class Maze {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.map = [];
    this.startCoord = { x: 0, y: 0 };
    this.endCoord = { x: 0, y: 0 };
    this.dirs = ['n', 's', 'e', 'w'];
    this.modDir = {
      n: { y: -1, x: 0, o: 's' },
      s: { y: 1, x: 0, o: 'n' },
      e: { y: 0, x: 1, o: 'w' },
      w: { y: 0, x: -1, o: 'e' },
    };
    this.genMap();
    this.defineStartEnd();
    this.defineMaze();
  }

  rand(max) {
    return Math.floor(Math.random() * max);
  }

  genMap() {
    this.map = new Array(this.height);
    for (let y = 0; y < this.height; y++) {
      this.map[y] = new Array(this.width);
      for (let x = 0; x < this.width; ++x) {
        this.map[y][x] = {
          n: false,
          s: false,
          e: false,
          w: false,
          visited: false,
          priorPos: null,
        };
      }
    }
  }

  defineStartEnd() {
    switch (this.rand(4)) {
      case 0:
        this.startCoord = { x: 0, y: 0 };
        this.endCoord = { x: this.height - 1, y: this.width - 1 };
        break;
      case 1:
        this.startCoord = { x: 0, y: this.width - 1 };
        this.endCoord = { x: this.height - 1, y: 0 };
        break;
      case 2:
        this.startCoord = { x: this.height - 1, y: 0 };
        this.endCoord = { x: 0, y: this.width - 1 };
        break;
      case 3:
        this.startCoord = { x: this.height - 1, y: this.width - 1 };
        this.endCoord = { x: 0, y: 0 };
        break;
    }
  }

  defineMaze() {
    let isComp = false;
    let move = false;
    let cellsVisited = 1;
    let numLoops = 0;
    let maxLoops = 0;
    let pos = { x: 0, y: 0 };
    const numCells = this.width * this.height;

    while (!isComp) {
      move = false;
      this.map[pos.x][pos.y].visited = true;

      if (numLoops >= maxLoops) {
        maxLoops = Math.round(this.rand(this.height / 8));
        numLoops = 0;
      }
      numLoops++;

      for (let index = 0; index < this.dirs.length; index++) {
        const direction = this.dirs[index];
        const nx = pos.x + this.modDir[direction].x;
        const ny = pos.y + this.modDir[direction].y;

        if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
          if (!this.map[nx][ny].visited) {
            this.map[pos.x][pos.y][direction] = true;
            this.map[nx][ny][this.modDir[direction].o] = true;
            this.map[nx][ny].priorPos = pos;
            pos = { x: nx, y: ny };
            cellsVisited++;
            move = true;
            break;
          }
        }
      }

      if (!move) {
        pos = this.map[pos.x][pos.y].priorPos;
      }

      if (numCells === cellsVisited) {
        isComp = true;
      }
    }
  }

  getMap() {
    return this.map;
  }

  getStartCoord() {
    return this.startCoord;
  }

  getEndCoord() {
    return this.endCoord;
  }

  drawMaze(ctx) {
    const cellSize = 25; // Adjust size as needed
    const map = this.getMap();
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const cell = map[y][x];
        const posX = x * cellSize;
        const posY = y * cellSize;

        if (cell.n) {
          ctx.beginPath();
          ctx.moveTo(posX, posY);
          ctx.lineTo(posX + cellSize, posY);
          ctx.stroke();
        }
        if (cell.s) {
          ctx.beginPath();
          ctx.moveTo(posX, posY + cellSize);
          ctx.lineTo(posX + cellSize, posY + cellSize);
          ctx.stroke();
        }
        if (cell.e) {
          ctx.beginPath();
          ctx.moveTo(posX + cellSize, posY);
          ctx.lineTo(posX + cellSize, posY + cellSize);
          ctx.stroke();
        }
        if (cell.w) {
          ctx.beginPath();
          ctx.moveTo(posX, posY);
          ctx.lineTo(posX, posY + cellSize);
          ctx.stroke();
        }
      }
    }
  }
}

export default Maze;
