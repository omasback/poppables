# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV['RAILS_ENV'] ||= 'test'
# ENV['PRE_RELEASE'] = 'no'
ENV['RECAPTCHA_PRIVATE_KEY'] = 'foo'
ENV['RECAPTCHA_PUBLIC_KEY'] = 'foo'
ENV['COUPON_OFFER_CODE'] = '12345'
ENV['COUPON_CHECK_CODE'] = '123455'
ENV['COUPON_SHORT_CIPHER_KEY'] = 'abcdefgh'
ENV['COUPON_LONG_CIPHER_KEY'] = 'abcdefghijklmnopqrstuvwxyz'
ENV['SECRET_TOKEN'] ||= 'b0dc1287a3007377bbf3c823d5c416a94de5c0c6b368c3cf37a001ae39fb3c347ea1ad7cf359262beadc85260a734cfcd1dbac779df81ef4a1cbaba2dfe5e0b0'
ENV['DEVISE_SECRET'] ||= '41a56c248569d65afe82d0048e567b35a9629f400f012aa1a9e2cffdc568c78c2e0cd54bb2cef8924335a2b36618db4a08673dba71534f9410a48fee41227e94'
ENV['TEST_DATABASE_URL'] ||= 'postgres://localhost/poppables_test'

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

  config.before(:all)  { FFaker::Random.seed = config.seed if ENV['PRINT_REQUESTS'] }
  config.before(:each) { FFaker::Random.reset! if ENV['PRINT_REQUESTS'] }

  config.after do |example|
    next unless example.metadata[:doc] && ENV['PRINT_REQUESTS']
    puts ''
    puts example.full_description
    puts "#{request.request_method} #{request.fullpath}"
    puts JSON.pretty_generate(request.params) if request.params
    puts "Response #{response.status}"
    puts JSON.pretty_generate(JSON.parse(response.body))
  end
end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end
