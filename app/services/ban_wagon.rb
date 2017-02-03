class BanWagon
  attr_accessor :name, :id, :count_key, :ban_key, :limit, :period, :ban_time

  # pre-configure throttles based on keys
  # should be run in an initializer
  def self.configure(configuration)
    @config = configuration
  end

  def self.config
    @config || {}
  end

  def self.clear_all
    REDIS_POOL.with do |redis|
      keys = redis.keys 'banwagon:*'
      redis.pipelined do
        keys.map { |k| redis.del(k) }
      end
    end
  end

  def self.audit
    data = REDIS_POOL.with do |redis|
      keys = redis.keys 'banwagon:*'
      values = redis.pipelined { keys.map { |k| [redis.get(k), redis.ttl(k)] } }
      Hash[keys.zip(values.each_slice(2))]
    end
    hsh = {}
    data.each do |key, value|
      _, type, name, id = key.split(':', 4)
      hsh[type] ||= {}
      hsh[type][name] ||= {}

      hsh[type][name][id] = value
    end
    hsh
  end

  # sets up a new throttle
  # name: throttle type identiier, used for logging
  # id: discriminator to identify an individual throttle (eg ip, user id)
  # limit: maximum number of times they can take the action within the period
  # period: length of time before count starts over
  # ban_time: how long to ban them if they go over the limit
  def initialize(name, id, options = {})
    options = options.merge(self.class.config[name]) if self.class.config[name]
    @name = name
    @id = id
    @limit = options[:limit]
    @period = options[:period]
    @ban_time = options[:ban_time]
    @count_key = "banwagon:count:#{name}:#{id}"
    @ban_key = "banwagon:ban:#{name}:#{id}"
  end

  # checks whether a ban is triggered for this name/id combo
  def banned?
    return @banned unless @banned.nil?
    @banned = REDIS_POOL.with { |r| r.get(ban_key) || false }
  end

  # increments the rate limit and checks whether they're over it
  # adds them to ban list and returns true if so
  def rate_limit
    return true if banned?

    REDIS_POOL.with do |redis|
      count = redis.incr(count_key)
      redis.expire(count_key, period) if count == 1

      return false unless count > limit
      redis.setex(ban_key, ban_time, 1)
      yield(name, id) if block_given?
      return true
    end
  end
end
