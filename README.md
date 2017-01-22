# Poppables

- Project links: https://slack-files.com/T026QRL8S-F3GTCNWS0-75d162733e

## Up and Running

### First Time

1. Get Ruby 2.3.1 installed
  - `rvm install 2.3.1` if you have [RVM](https://rvm.io/)
  - `brew install ruby` if you want to use homebrew
2. Install some dependencies
  - `brew install postgres`
  - `brew install imagemagick`
  - `brew services start postgres`
3. Fill in the `.env` file with real values. These might come from Heroku or one of your fellow developers.
4. Make sure you have the most current version of X-Code Command Line Tools
  - `xcode-select --install`
5. Install deps
  - `bundle install`
  - `npm install yarn`
  - `yarn install`
6. Get your app database set up
  - `bin/rake db:create db:migrate db:seed`

## Running the App Locally

1. Each time you pull
  - `bundle install`
  - `yarn install`
  - `rake db:migrate`
2. Run it
  - `foreman start`
  - Navigate to http://localhost:5000/

## Tasks

_TODO: Fill me in_

## Deployment

### Prep

- Add staging remote: `heroku git:remote -r staging -a poppables-staging`
- Add production remote: `heroku git:remote -r production -a poppables`

### Deploy

  - Production: `git push production develop:master` (where `develop` is the branch you want to deploy)
  - Production: `git push production master`

### Other Useful Heroku Stuff

  - Run a console: `heroku run rails c -r staging`
  - Run a shell: `heroku run bash -r staging`
  - Tail the logs: `heroku logs -t -r staging`
  - Launch the site: `heroku open -r staging`

## Syncing Data

_TODO: Fill me in_

## Structure / Guidelines

The app uses `webpack-rails` which is a deeply unholy union. Guidelines:

- Frontend files are in the `webpack` directory.
- [Vue](https://vuejs.org/v2/guide/) is used for some of the dynamic stuff.
- [Bodymovin](https://github.com/bodymovin/bodymovin) is used for some of the fancy animations.
- Webpack config is in `config/webpack.conf.js`
- Add JS dependencies via yarn, eg `yarn add lodash`
- As per usual with webpack, reference images in JS like this:
    - `import logo from 'path/to/logo.png'` (`logo` will be the image URL)
 - And in CSS like this:
    - `url('~path/to/logo.png')`
- HTML files are stored in `app/views`
- They use erb, see: http://guides.rubyonrails.org/layouts_and_rendering.html
- There's currently no way to reference webpack images from erb :( Use CSS rather than image tags for now.
