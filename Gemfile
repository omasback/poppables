source 'https://rubygems.org'

ruby '2.3.1'

# Basics
gem 'rails'
gem 'pg'
gem 'puma'
gem 'redis'
gem 'omniauth-facebook'
gem 'devise'

# Asset Management
gem 'aws-sdk'
gem 'mini_magick'

# Monitoring
gem 'newrelic_rpm'
gem 'sentry-raven'

# Frontend Common
gem 'webpack-rails'

# Admin
gem 'bootstrap_form'
gem 'kaminari'
gem 'haml'

gem 'recaptcha', require: 'recaptcha/rails'
gem 'parallel', require: false

group :production, :staging do
  gem 'puma_worker_killer'
  gem 'rails_12factor'
  gem 'dalli'
  gem 'connection_pool'
end

group :development do
  gem 'web-console'
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'rubocop'
end

group :development, :test do
  gem 'foreman'
  gem 'rspec-rails'
  gem 'pry-rails'
  gem 'dotenv-rails'
  gem 'fabrication'
  gem 'ffaker'
  gem 'fuubar'

  gem 'bullet'
  gem 'bundler-audit', require: false
end

group :test do
  gem 'timecop'
  gem 'webmock'
  gem 'shoulda-matchers', github: 'thoughtbot/shoulda-matchers'
  gem 'poltergeist', require: 'capybara/poltergeist'
  gem 'database_cleaner'
  gem 'launchy'
  gem 'rails-controller-testing'
end
