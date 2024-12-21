import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <canvas #gameCanvas width="400" height="400"></canvas>
    <div>Score: {{ score }}</div>
  `,
  styles: [`
    canvas {
      border: 1px solid black;
      margin: 20px;
    }
  `]
})
export class AppComponent implements OnInit {
  @ViewChild('gameCanvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private snake: { x: number; y: number }[] = [];
  private food: { x: number; y: number } = { x: 0, y: 0 };
  private direction: 'up' | 'down' | 'left' | 'right' = 'right';
  private gridSize = 20;
  private gameInterval: any;
  score = 0;

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.startGame();
  }

  startGame() {
    // Initialize snake
    this.snake = [
      { x: 3, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 1 }
    ];
    
    this.score = 0;
    this.direction = 'right';
    this.generateFood();
    
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }
    
    this.gameInterval = setInterval(() => this.gameLoop(), 150);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        if (this.direction !== 'down') this.direction = 'up';
        break;
      case 'ArrowDown':
        if (this.direction !== 'up') this.direction = 'down';
        break;
      case 'ArrowLeft':
        if (this.direction !== 'right') this.direction = 'left';
        break;
      case 'ArrowRight':
        if (this.direction !== 'left') this.direction = 'right';
        break;
    }
  }

  private gameLoop() {
    const head = { ...this.snake[0] };
    
    switch (this.direction) {
      case 'up': head.y--; break;
      case 'down': head.y++; break;
      case 'left': head.x--; break;
      case 'right': head.x++; break;
    }

    // Check collision with walls
    if (head.x < 0 || head.x >= this.canvas.nativeElement.width / this.gridSize ||
        head.y < 0 || head.y >= this.canvas.nativeElement.height / this.gridSize) {
      this.startGame();
      return;
    }

    // Check collision with self
    if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      this.startGame();
      return;
    }

    this.snake.unshift(head);

    // Check if snake ate food
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.generateFood();
    } else {
      this.snake.pop();
    }

    this.draw();
  }

  private generateFood() {
    const maxX = this.canvas.nativeElement.width / this.gridSize - 1;
    const maxY = this.canvas.nativeElement.height / this.gridSize - 1;
    
    do {
      this.food = {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY)
      };
    } while (this.snake.some(segment => 
      segment.x === this.food.x && segment.y === this.food.y));
  }

  private draw() {
    const ctx = this.ctx;
    const canvas = this.canvas.nativeElement;
    
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = 'green';
    this.snake.forEach(segment => {
      ctx.fillRect(
        segment.x * this.gridSize,
        segment.y * this.gridSize,
        this.gridSize - 2,
        this.gridSize - 2
      );
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(
      this.food.x * this.gridSize,
      this.food.y * this.gridSize,
      this.gridSize - 2,
      this.gridSize - 2
    );
  }
}