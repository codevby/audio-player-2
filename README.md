Audio Player - Angular + Electron
Audio Player is an audio playback application developed with Angular and Electron . This combination allows you to create a modern and functional interface for playing audio files, leveraging Angular for the frontend and Electron for the desktop environment.

Key Features:
  -Intuitive user interface built with Angular.
  -Local audio file playback.
  -Cross-platform compatibility (Windows, macOS, Linux).
  -Easy to install and run.

Prerequisites:
***Before getting started, ensure you have the following installed:

  -Node.js (version 18 or higher recommended)
  -npm (comes bundled with Node.js)
  -Angular CLI (npm install -g @angular/cli)
  -Electron

Installation:
  1-Clone this repository:
    git clone https://github.com/your-username/audio-player-angular-electron.git
    cd audio-player-angular-electron

  2-Install dependencies:
    npm install

  3-Running in Development Mode
  ***To run the application in development mode, follow these steps:

  -Start the Angular development server:
    npm start

  -Launch the Electron app in parallel:
    npm run electron:serve

  This will open the application in an Electron window while the Angular development server runs in the background.

  4-Building for Production
  ***To build the application for production, follow these steps:

  -Build the Angular project:
    npm run build

  -Generate the Electron executable:
    npm run electron:build

  The executable file will be generated in the dist-electron folder. Depending on your operating system, you will find the corresponding binaries (e.g., .exe for Windows).

Useful Commands:
Here’s a list of the available commands in the package.json file:

  npm start
  *Starts the Angular development server.
  
  npm run build
  *Builds the Angular project for production.
  
  npm run electron
  *Runs the Electron app directly.
  
  npm run electron:serve
  *Runs the Electron app in development mode with Angular.
  
  npm run electron:build
  *Builds the Electron app for production.
  
  npm run watch
  *Watches for changes in the Angular code and rebuilds automatically.
  
  npm test
  *Runs unit tests with Karma.

Project Structure:

audio-player-angular-electron/
├── src/                # Angular source code
├── dist/               # Output folder for Angular builds
├── dist-electron/      # Output folder for Electron builds
├── main.js             # Main Electron file
├── package.json        # Project configuration and dependencies
└── README.md           # Project documentation

Contributions:
Contributions are welcome! If you'd like to improve this application, follow these steps:

  -Fork the repository.
  -Create a new branch (git checkout -b feature/new-feature).
  -Make your changes and commit them (git commit -m "Add new feature").
  -Push your changes (git push origin feature/new-feature).
  -Open a Pull Request.

License:
This project is licensed under the MIT License . See the LICENSE file for more details.
