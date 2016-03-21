# A Fresh Start Website

> A Fresh Start is a national non-profit organization benefiting homeless men, women, and children. Today with the collaboration of universities and businesses including fortune five hundred corporations, consulting firms and many, many generous individuals, groups and organizations it is possible for AFS to be dedicated to helping the homeless through hygiene, clothing, professional development, and teaching of personal financial stability.

## Build Setup

First, install node.js: https://nodejs.org

``` bash
# download the repository
git clone https://github.com/AFreshStartCampaign/SoapTowel.git

# enter the new directory
cd SoapTowel

# install npm and nvm/node
apt-get install -g npm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
nvm install v5

# install project dependencies
# express.js is the web framework that everything else is built on.
# express-stormpath provides convenience features that can be tied in to the Express app
# csurf adds CSRF protection to our forms.
# cookie-Parser is used to read the cookies that are created by the Csurf library.
# forms is a module that will take the pain out of validating HTML forms.
# xtend is a utility library that makes it easy to copy properties from one JavaScript object to another.
# body-parser to parse csurf data
# handlebars/express-handlebar will be the templating engine we will be using
# lodash javascript library
npm install --save express express-stormpath cookie-parser csurf forms xtend body-parser express-handlebars handlebars lodash

# export Stormpath API credentials
export STORMPATH_CLIENT_APIKEY_ID=xxxx
export STORMPATH_CLIENT_APIKEY_SECRET=xxxx
export STORMPATH_APPLICATION_HREF=xxxx

# install Nodemon (file watcher)
npm install -g --save nodemon

# start server
nodemon server.js

# project should now run on localhost:3000
```

## To deploy on a server
``` bash
# follow installation steps above

# install forever to keep connection alive
npm install -g forever

# start server
forever start server.js   

# stop server
forever stop server.js
