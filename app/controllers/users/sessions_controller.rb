class Users::SessionsController < Devise::SessionsController
  include GameResultFlash
  before_action :verify_game_params!, only: [:new]
  before_action :create_default_flash, only: [:new]
  before_action :verify_game_flash!, only: [:create]
  before_action :keep_flash, only: [:new, :create]

  # GET /resource/sign_in
  def new
    super
  end

  # POST /resource/sign_in
  def create
    if user = User.find_by(email: params[:user][:email])
      encoded_token = flash[:token]
      game_name = flash[:game_name]
      flash.delete(:token)
      flash.delete(:game_name)

      token, winner, score = GameTokenManager.decode(encoded_token)
      unless GameTokenManager.redeem_token(token)
        redirect_to root_url
        return
      end

      @game_redemption = GameRedemption.new(user: user, game: game_name.presence_in(Game::NAMES.keys.map(&:to_s)))
      if @game_redemption.save
        render 'pages/redemption_winner', layout: 'pages'
      else
        render 'pages/redemption_error', layout: 'pages'
      end
    else
      throw(:warden, scope: :user, message: :not_found_in_database)
    end
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
