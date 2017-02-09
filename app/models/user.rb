class User < ApplicationRecord
  attr_accessor :captcha

  # devise :database_authenticatable, :registerable,
  #   :recoverable, :rememberable, :trackable, :validatable,
  #   :omniauthable, omniauth_providers: [:facebook]

  validates :email, presence: true, uniqueness: true
  validate :valid_captcha, on: :create unless ENV['LOAD_TEST']
  has_many :game_redemptions, dependent: :destroy

  def self.from_omniauth(hsh)
    user = where(email: hsh.info.email).first_or_initialize
    user.update_from_omniauth(hsh)
  end

  # Devise hook
  def self.new_with_session(params, session)
    super.tap do |user|
      if session.to_hash.dig('devise.facebook_data', 'extra', 'raw_info')
        user.update_from_omniauth(Hashie::Mash.new(session['devise.facebook_data']))
      end
    end
  end

  def update_from_omniauth(data)
    extra = data.extra.raw_info
    self.email = extra.email if email.blank?

    self.first_name, self.last_name =
      if extra.first_name && extra.last_name
        [extra.first_name, extra.last_name]
      elsif extra.name
        [extra.name.split(' ').first, extra.name.split(' ')[1..-1].join(' ')]
      end

    self
  end

  def valid_captcha
    return if captcha
    errors.add(:recaptcha, 'verification response is incorrect, please try again.')
  end
end
