

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. 

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/kevinnadar22/announce

# Step 2: Navigate to the project directory.
cd announce/frontend_react

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Create and configure your environment variables
cp .env.example .env
# Edit the .env file with your configuration values

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

<!-- Important: Make sure to set up your environment variables in .env file before deploying -->

**Environment Variables**

The project requires certain environment variables to be set up. Create a `.env` file in the root directory with the following variables:

```env
# Required environment variables
VITE_API_URL=your_api_url_here
# Add any other required environment variables
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


