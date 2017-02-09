class GameRedemption < ApplicationRecord
  RESULTS = %w(win_free_bag win_coupon win_nothing).freeze

  belongs_to :user
  validates :user, :game, :result, :pin_code, presence: true
  validates :game, inclusion: { in: Game::NAMES.keys.map(&:to_s) }
  validates :result, inclusion: { in: RESULTS }

  before_validation :generate_pin_code, on: :create
  before_validation :set_result, on: :create

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
