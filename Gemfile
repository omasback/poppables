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
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'autoprefixer-rails'
gem 'browserify-rails'

# Admin
gem 'bootstrap-sass', '~> 3.3.5'
gem 'bootstrap_form'
gem 'kaminari'
gem 'haml'

gem 'parallel', require: false

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
  gem 'browser_sync_rails'
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
