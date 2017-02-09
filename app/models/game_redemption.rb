class GameRedemption < ApplicationRecord
  RESULTS = %w(win_free_bag win_coupon win_nothing).freeze

  belongs_to :user
  validates :user, :game, :result, :pin_code, presence: true
  validates :game, inclusion: { in: Game::NAMES.keys.map(&:to_s) }
  validates :result, inclusion: { in: RESULTS }

  before_validation :generate_pin_code, on: :create
  before_validation :set_result, on: :create

  def cipher_parameter(offer_code, short_key, long_key)
    decodeX = " abcdefghijklmnopqrstuvwxyz0123456789!$%()*+,-.@;<=>?[]^_{|}~"
    encode_modulo = Array.new(256, 0)
    vob = [ offer_code % 100, ((offer_code - (offer_code % 100)) / 100) % 100 ]
    (0..60).each { |i| encode_modulo[decodeX[i].ord] = i }

    merged_code = pin_code.downcase + offer_code.to_s
    q = 0
    cpt = ''
    (0...merged_code.length).each do |i|
       s1 = encode_modulo[merged_code[i].ord]
       s2 = 2 * encode_modulo[short_key[i % short_key.length].ord]
       s3 = vob[i % 2]
       q = (q + s1 + s2 + s3) % 61
       cpt += long_key[q] || ''
    end
    cpt
  end

  def coupon_url
    return nil unless result == 'win_free_bag'
    cpt = cipher_parameter(ENV['COUPON_OFFER_CODE'], ENV['COUPON_SHORT_CIPHER_KEY'], ENV['COUPON_LONG_CIPHER_KEY'])
    "http://bricks.coupons.com/enable.asp?o=#{ENV['COUPON_OFFER_CODE']}&c=#{ENV['COUPON_CHECK_CODE']}&p=#{pin_code}&cpt=#{cpt}"
  end

  protected

  def generate_pin_code
    self.pin_code = SecureRandom.hex
    while GameRedemption.where(pin_code: self.pin_code).count > 0
      self.pin_code = SecureRandom.hex
    end
  end

  def set_result
    return unless user
    self.result = case user.game_redemptions.count
                  when 0
                    if ENV['FREE_BAGS_EXHAUSTED'] == 'true'
                      'win_coupon'
                    else
                      'win_free_bag'
                    end
                  when 1
                    'win_coupon'
                  else
                    'win_nothing'
                  end
  end
end
