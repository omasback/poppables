class GameTokenManager
  KEY_TTL_IN_S = 3600

  # redis key => value
  # token => time_after_which_user_can_win_game
  def self.generate_token(game_name)
    token = SecureRandom.hex(16)
    REDIS_POOL.with do |conn|
      conn.setex token, KEY_TTL_IN_S, Time.now.to_i + Game::NAMES[game_name][:min_win_time]
    end
    token
  end

  def self.redeem_token(token)
    timestamp = nil
    REDIS_POOL.with do |conn|
      timestamp = conn.get token
      conn.del(token) if timestamp
    end
    return false unless timestamp.present?
    Time.now >= Time.at(timestamp.to_i)
  end

  # undo base 64 encoding, undo XOR cipher, pluck out necessary fields
  def self.decode(encoded_token)
    raw = Base64.decode64(encoded_token).chars.map(&:ord).map{|o| o ^ 6}.map(&:chr).join
    [raw[0..31], raw[32] == '1', raw[33..-1].to_i]
  rescue StandardError => e
    [nil,nil,nil]
  end

  def self.encode(raw_string)
    Base64.encode64(raw_string.chars.map(&:ord).map{|o| o ^ 6}.map(&:chr).join)
  end
end
