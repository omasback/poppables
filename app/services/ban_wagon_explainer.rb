module BanWagonExplainer
  def self.explain
    keys = BanWagon.audit

    if keys['ban']
      bans = keys['ban'].flat_map do |name, ban|
        ban.map { |id, (_, ttl)| explain_ban(name, id, ttl) }
      end
    else
      bans = []
    end

    { bans: bans }
  end

  private

  def self.explain_ban(key, id = nil, ttl = nil)
    if id
      name = key
    else
      _, _, name, id = key.to_s.split(':', 4)
      ttl = REDIS_POOL.with { |r| r.ttl(key) }
    end

    return nil unless config = BanWagon.config[name.to_sym]

    subject = if config[:meta][:user]
      User.find(id).try(:email) || "User(#{id})"
    else
      id
    end

    verb = config[:meta][:desc] || name
    explanation = "#{subject} #{verb} #{config[:limit]} times in #{config[:period]} \
      seconds and was banned for #{config[:ban_time] / 60} minutes (#{ttl.to_i} \
      seconds remaining)"
    {
      name: name,
      id: id,
      subject: subject,
      limit: config[:limit],
      period: config[:period],
      ban_time: config[:ban_time],
      ttl: ttl,
      explanation: explanation,
      until: Time.now + ttl.to_i,
    }
  end
end
