Rails.application.config.assets.version = ENV["ASSETS_VERSION"] || '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

Rails.application.config.assets.precompile += %w(admin.css admin.js home.js games.js)
