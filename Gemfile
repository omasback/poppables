source 'https://rubygems.org'

ruby '2.3.1'

# Basics
gem 'rails'
gem 'pg'
gem 'puma'

# Asset Management
gem 'aws-sdk'
gem 'mini_magick'

# Monitoring
gem 'newrelic_rpm'
gem 'sentry-raven'

# Frontend Common
gem 'sprockets-es6'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'autoprefixer-rails'

# Admin
gem 'bootstrap-sass', '~> 3.3.5'
gem 'bootstrap_form'
gem 'kaminari'
gem 'haml'

gem 'parallel', require: false

source 'https://rails-assets.org' do
  # Bower libraries
  gem 'rails-assets-normalize.css'
  gem 'rails-assets-jquery'
  gem 'rails-assets-jquery-ujs'
  gem 'rails-assets-almond'
end

group :production, :staging do
  gem 'puma_worker_killer'
  gem 'rails_12factor'
  gem 'dalli'
end

group :development do
  gem 'web-console'
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'rubocop'
end

group :development, :test do
  gem 'rspec-rails', '~> 3.5'
  gem 'pry-rails'
  gem 'dotenv-rails'
  gem 'fabrication'
  gem 'ffaker'
  gem 'fuubar'

  gem 'bullet'
  gem 'bundler-audit', '>= 0.5.0', require: false
end

group :test do
  gem 'timecop'
  gem 'webmock'
end
