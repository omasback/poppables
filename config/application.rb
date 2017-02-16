require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
# require "action_cable/engine"
# require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Poppables
  class Application < Rails::Application
    config.secret_token = ENV.fetch('SECRET_TOKEN')
    config.autoload_paths <<  Rails.root.join('app', 'services')
    config.autoload_paths <<  Rails.root.join('app', 'uploaders')
    config.action_mailer.default_url_options = { host: ENV.fetch('APPLICATION_HOST') }
    config.generators do |generate|
      generate.helper false
      generate.javascript_engine false
      generate.request_specs true
      generate.controller_specs false
      generate.routing_specs false
      generate.stylesheets false
      generate.test_framework :rspec
      generate.view_specs false
    end
    # config.action_controller.action_on_unpermitted_parameters = :raise

    Rails.application.routes.default_url_options[:host] = ENV.fetch('APPLICATION_HOST')

    config.action_view.field_error_proc = Proc.new { |html_tag, instance| 
      class_attr_index = html_tag.index 'class="'

      if class_attr_index
        html_tag.insert class_attr_index+7, 'error '
      else
        html_tag.insert html_tag.index('>'), ' class="error"'
      end
    }

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
  end
end
