# A Fresh Start Website

> Website to host campaigns for homeless shelters

## Build Setup

First, install node.js: https://nodejs.org

``` bash
# download the repository
git clone https://github.com/purdue-epics-wise/SoapTowel.git

# enter the new directory
cd SoapTowel

# install project dependencies
# express.js is the web framework that everything else is built on.
# express-stormpath provides convenience features that can be tied in to the Express app
# csurf adds CSRF protection to our forms.
# cookie-Parser is used to read the cookies that are created by the Csurf library.
# forms is a module that will take the pain out of validating HTML forms.
# jade is a templating engine for writing HTML pages.
# xtend is a utility library that makes it easy to copy properties from one JavaScript object to another.
npm i --save express express-stormpath cookie-parser csurf jade forms xtend

# export Stormpath API credentials
export STORMPATH_CLIENT_APIKEY_ID=xxxx
export STORMPATH_CLIENT_APIKEY_SECRET=xxxx
export STORMPATH_APPLICATION_HREF=xxxx

# install Nodemon (file watcher)
npm install -g nodemon

# start server
nodemon server.js

# project should now run on localhost:3000