# Controller helpers for rate limiting and rendering errors
module Throttled
  # returns true and renders a json error if a ban is triggered
  # pass a block to override the render functionality
  def banned?(ban_wagon, &block)
    return false unless Rails.env.production? || ENV['RATE_LIMITING']

    if ban_wagon.banned?
      render_throttle_response(&block)
      true
    else
      false
    end
  end

  # checks if they're banned, otherwise increments the throttle counter
  # and returns true and renders a json error if they're over the limit
  # also sends an error to sentry if they go over the limit
  # pass a block to override the error rendering
  def throttle_response?(ban_wagon, &block)
    return false unless Rails.env.production? || ENV['RATE_LIMITING']

    return false unless ban_wagon.rate_limit do |name|
      Raven.capture_message('User triggered ban',
        tags: { type: 'ban', ban_type: name },
        level: 'warning')
    end

    render_throttle_response(&block)
    true
  end

  def render_throttle_response
    if block_given?
      yield
    else
      render status: 429, json: {
        errors: ['Try again later'],
        message: ['Try again later'],
      }
    end
  end
end
