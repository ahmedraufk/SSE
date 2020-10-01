console.log("Deploying to prod...")
const ghpages = require('gh-pages');
ghpages.publish('..', {
    user: {
        name: 'Ahmed Klasra',
        email: 'ahmedraufk@gatech.edu'
    },
    message: 'Deployed Plesk app',
    branch: 'prod',
    repo: 'https://github.gatech.edu/ez4/sse.git'
}, function(err) {
    console.log(err)
});
