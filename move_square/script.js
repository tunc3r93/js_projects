class Square {
    constructor() {
        this.squareElement = document.getElementById('square');
        this.currentPosition = 0;
        this.positions = [
            { top: '0', left: '0' },
            { top: '0', left: 'calc(100% - 50px)' },
            { top: 'calc(100% - 50px)', left: 'calc(100% - 50px)' },
            { top: 'calc(100% - 50px)', left: '0' }
        ];

        this.squareElement.addEventListener('click', () => this.move());
    }

    move() {
        this.currentPosition = (this.currentPosition + 1) % this.positions.length;
        const position = this.positions[this.currentPosition];

        this.squareElement.style.top = position.top;
        this.squareElement.style.left = position.left;
    }
}

let square = new Square();
