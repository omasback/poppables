require 'redis'
require 'connection_pool'

REDIS_POOL = ConnectionPool.new(size: 10, timeout: 5) do
  Redis.new(url: ENV['REDIS_URL'], logger: Rails.logger)
end
