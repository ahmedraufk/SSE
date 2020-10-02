
#!/bin/bash

echo "Deployment starting...\n"
cd ../app
rm -rf build node_modules
cd ../deployment
node deploy.js
cd ../app
rm -rf build
npm install
echo "Deployment complete!\n"
