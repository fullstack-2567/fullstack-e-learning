#!/bin/bash

# Check if version argument is provided
if [ -z "$1" ]; then
  echo "Error: Please provide a version tag (e.g., ./build.sh v2)"
  exit 1
fi

# Set the version tag from the argument
VERSION=$1

# Run the docker build command with the provided version
docker build --build-arg VITE_END_POINT=https://fullstack-b.vishsiri.dev -t  2567-2-fullstack-final-frontend:$VERSION .

# Output the result
echo "Docker image ' 2567-2-fullstack-final-frontend:$VERSION' has been built successfully."
