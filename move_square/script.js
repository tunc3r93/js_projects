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

    getRandomColor () {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    move() {
        this.currentPosition = (this.currentPosition + 1) % this.positions.length;
        const position = this.positions[this.currentPosition];

        this.squareElement.style.top = position.top;
        this.squareElement.style.left = position.left;

        this.squareElement.style.backgroundColor = this.getRandomColor();
    }
}

let square = new Square();
