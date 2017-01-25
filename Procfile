# Run Rails & Webpack concurrently
# Example file from webpack-rails gem

rails: bundle exec rails server -b 0.0.0.0
webpack: ./node_modules/.bin/webpack-dev-server --host 0.0.0.0 --config config/webpack.config.js
web: bin/start-nginx bundle exec puma -C config/puma.rb

