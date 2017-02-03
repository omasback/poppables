class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  attr_accessor :captcha

  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable,
    :omniauthable, omniauth_providers: [:facebook]

  has_many :game_scores, dependent: :destroy

  validate :valid_captcha, on: :create unless ENV['LOAD_TEST']

  def self.from_omniauth(hsh)
    where(email: hsh.info.email).first_or_initialize do |user|
      user.provider = hsh.provider
      user.uid = hsh.uid

      if hsh.extra.raw_info.first_name && hsh.extra.raw_info.last_name
        user.first_name = hsh.extra.raw_info.first_name
        user.last_name = hsh.extra.raw_info.last_name
      elsif hsh.extra.raw_info.name
        user.first_name = hsh.extra.raw_info.name.split(' ').first
        user.last_name = hsh.extra.raw_info.name.split(' ')[1..-1].join(' ')
      end
    end
  end

  # Devise hook
  def self.new_with_session(params, session)
    super.tap do |user|
      # FIXME: wha?
      if data = session['devise.facebook_data'] && session['devise.facebook_data']['extra']['raw_info']
        user.email = data['email'] if user.email.blank?
        if data['first_name'] && data['last_name']
          user.first_name = data['first_name']
          user.last_name = data['last_name']
        elsif data['name']
          # TODO: better name parsing
          user.first_name = data['name'].split(' ').first
          user.last_name = data['name'].split(' ')[1..-1].join(' ')
        end
      end
    end
  end

  def valid_captcha
    return if captcha
    errors.add(:recaptcha, 'verification response is incorrect, please try again.')
  end
end
