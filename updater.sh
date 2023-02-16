#!/bin/sh
export PATH=$PATH:/root/.nvm/versions/node/v18.14.0/bin/

# Specify the path to the Git repository
REPO_PATH="/opt/tgBotWebApp"

# Specify the path to the public directory
PUBLIC_PATH="/opt/tgBotWebApp/build"
STATIC_PATH="/usr/share/nginx/html/front"

# Navigate to the Git repository
cd "$REPO_PATH"

# Start an infinite loop
while true; do
  # Check if there are any new changes
  npm -v
  git fetch
  if ! git diff --quiet HEAD origin/main; then
    # Fetch the latest changes from the remote repository

    # Pull the latest changes from the remote repository
    git pull
    npm install
    # Build the project using npm
    if npm run build; then
      # Copy the public directory to STATIC_PATH
      cp -R "$PUBLIC_PATH" "$STATIC_PATH"

      # Print a success message
      echo "Updated Git repository, built the project, and copied the public directory to /www/html"
    else
      # Print an error message if the build failed
      echo "Error: Build failed"
    fi
  fi

  # Wait for a few seconds before checking for new changes again
  sleep 10
done
