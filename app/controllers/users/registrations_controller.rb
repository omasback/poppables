class Users::RegistrationsController < Devise::RegistrationsController
  include GameResultFlash
  before_action :verify_game_params!, only: [:new]
  before_action :create_default_flash, only: [:new]
  before_action :verify_game_flash!, only: [:create]
  before_action :keep_flash, only: [:new, :create]
  before_action :configure_sign_up_params, only: [:create]

  # POST /resource
  def create
    build_resource(sign_up_params)
    resource.save
    if resource.persisted?
      encoded_token = flash[:token]
      game_name = flash[:game_name]
      flash.delete(:token)
      flash.delete(:game_name)

      token, winner, score = GameTokenManager.decode(encoded_token)
      unless GameTokenManager.redeem_token(token)
        redirect_to root_url
        return
      end

      @game_redemption = GameRedemption.new(user: resource, game: game_name.presence_in(Game::NAMES.keys.map(&:to_s)))
      if @game_redemption.save
        render 'pages/redemption_winner', layout: 'pages'
      else
        render 'pages/redemption_error', layout: 'pages'
      end
    else
      respond_with resource
    end
  end

  def new
    super
  end

  def edit
    raise 'Nope'
  end

  def update
    raise 'Nope'
  end

  def destroy
    raise 'Nope'
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    if params[:user][:dob_year] && params[:user][:dob_day] && params[:user][:dob_day]
      params[:user][:dob] = begin
                              Date.new(params[:user][:dob_year].to_i, params[:user][:dob_month].to_i, params[:user][:dob_day].to_i)
                            rescue
                              nil
                            end
    end
    user_params = [
      :first_name,
      :last_name,
      :zip_code,
      :dob,
      :opt_in,
      :terms_and_conditions,
    ]
    devise_parameter_sanitizer.permit(:sign_up, keys: user_params)
  end

  def build_resource(hash = nil)
    super unless hash.present?

    self.resource = resource_class.new_with_session(hash || {}, session)
    resource.captcha = verify_recaptcha
  end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end
end
