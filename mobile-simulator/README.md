# Mobile Simulator
This is a simple script that simulates the [mobile application](mobile-application/README.md) sending a picture to Extra Horizon.

## Instructions
1. Install the dependencies for the script
    ```bash
    cd mobile-simulator
    npm install
    ```
2. Create a `.env` file with your credentials
    ```bash
    cp .env.example .env
    # Edit the .env file
    # Credentials are either provided to you or:
    # - Generate credentials yourself using the Control Center
    # - Find the credentials generated by the CLI by opening the `.exh/credentials` file in your home directory
    ```
4. Run the script
    ```bash
    node index.js
    # It should say something like:
    # Created measurement "674dc71af2f3225fc801efbc"
    ```
