class EggTimer {
    constructor() {
        // DOM elements for the timer, start button, and egg image container
        this.timerElement = document.getElementById('countdown-timer');
        this.startButton = document.getElementById('start-btn');
        this.eggImgContainer = document.getElementById('egg-img-container');
        this.eggImg = document.getElementById('egg-img');

        // Egg options (radio buttons)
        this.eggOptions = document.getElementsByName('egg-type');

        // Egg images for each option
        this.eggImages = {
            "soft-boiled": ["images/egg_soft.png", "images/egg_soft2.png", "images/egg_soft3.png"],
            "soft-middle-boiled": ["images/soft_middle_egg.png"],
            "hard-boiled": ["images/hard_boiled_egg.png"]
        };

        // Timer durations for each egg option (in seconds)
        this.timerDurations = {
            "soft-boiled": 240,
            "soft-middle-boiled": 300,
            "hard-boiled": 600
        };

        // Initialize variables for the timer and image intervals
        this.timerInterval = null;
        this.imageInterval = null;
        this.selectedEggType = null;
        this.currentTime = 0;

        // Add event listeners to the options and start button
        this.addEventListeners();
    }

    // Add event listeners to radio buttons and the start button
    addEventListeners() {
        this.eggOptions.forEach(option => {
            option.addEventListener('change', () => {
                // Update selected egg type and enable the start button
                this.selectedEggType = option.value;
                this.enableStartButton();
                this.resetTimer();
            });
        });

        // When the start button is clicked, start the timer
        this.startButton.addEventListener('click', () => this.startTimer());
    }

    // Enable or disable the start button based on whether an egg type is selected
    enableStartButton() {
        if (this.selectedEggType.length > 0) {
            this.startButton.disabled = false; // Enable if a selection is made
        } else {
            this.startButton.disabled = true;  // Disable if no selection
        }
    }

    // Start the timer and show the selected egg's image
    startTimer() {
        // Show egg image container
        this.eggImgContainer.style.display = 'block';

        // Set the initial time based on the selected egg type
        this.currentTime = this.timerDurations[this.selectedEggType];
        this.timerElement.value = this.formatTime(this.currentTime);

        // Set the first egg image immediately
        this.setInitialEggImage();

        // Start the countdown timer
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);

        // Start changing the egg image every second
        this.changeEggImage();
    }

    // Set the first egg image (the one at index 0) when the timer starts
    setInitialEggImage() {
        const images = this.eggImages[this.selectedEggType];
        this.eggImg.src = images[0];  // Set first image
    }

    // Update the countdown timer every second
    updateTimer() {
        if (this.currentTime <= 0) {
            // If the timer reaches 0, stop both the timer and image change
            clearInterval(this.timerInterval);
            clearInterval(this.imageInterval);
            this.timerElement.value = "Time's up!"; // Display "Time's up!"
        } else {
            this.currentTime--;  // Decrease the time
            this.timerElement.value = this.formatTime(this.currentTime); // Update timer display
        }
    }

    // Change the egg image every second based on the selected egg type
    changeEggImage() {
        let imageIndex = 0;
        const images = this.eggImages[this.selectedEggType];

        // Change the image every second
        this.imageInterval = setInterval(() => {
            if (this.currentTime <= 0) {
                // Stop image change when the timer reaches 0
                clearInterval(this.imageInterval);
            } else {
                // Set the current image and loop through the images
                this.eggImg.src = images[imageIndex];
                imageIndex = (imageIndex + 1) % images.length; // Cycle through images
            }
        }, 1000);
    }

    // Reset the timer and hide the egg image when the timer is stopped
    resetTimer() {
        clearInterval(this.timerInterval);  // Clear countdown timer
        clearInterval(this.imageInterval);  // Clear image change interval
        this.timerElement.value = "";  // Reset timer display
        this.eggImgContainer.style.display = 'none';  // Hide the egg image
    }

    // Format the time from seconds to mm:ss format
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60); // Get minutes
        const remainingSeconds = seconds % 60;    // Get remaining seconds
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
}

const eggTimer = new EggTimer();

