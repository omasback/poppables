# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV['RAILS_ENV'] ||= 'test'
# ENV['PRE_RELEASE'] = 'no'
ENV['RECAPTCHA_PRIVATE_KEY'] = 'foo'
ENV['RECAPTCHA_PUBLIC_KEY'] = 'foo'
require File.expand_path('../../config/environment', __FILE__)
# Prevent database truncation if the environment is production
abort('The Rails environment is running in production mode!') if Rails.env.production?

# All the requires
require 'spec_helper'
require 'rspec/rails'
require 'database_cleaner'
require 'webmock/rspec'
# require 'capybara/poltergeist'

# webmock and all the support files
WebMock.disable_net_connect!(allow_localhost: true)
Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }
Dir[Rails.root.join('spec/fabricators.rb')].each { |f| require f }

ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
  config.use_transactional_fixtures = false
  OmniAuth.config.test_mode = true

  config.before(:suite) do
    DatabaseCleaner.strategy = :deletion
    DatabaseCleaner.clean_with(:transaction)
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end

  config.after(:suite) do
    WebMock.disable!
  end

  config.include CommonHelpers
  # config.include ControllerHelpers, type: :controller
  config.include Devise::Test::ControllerHelpers, type: :controller
  config.include ControllerHelpers, type: :request
  # config.include FeatureHelpers, type: :feature
  # config.include Devise::TestHelpers, type: :view
  # config.include ApplicationHelper
  # surpress deprecations
  # config.expose_current_running_example_as :example
end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end
