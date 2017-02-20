class Users::SessionsController < Devise::SessionsController
  # include GameResultFlash
  # before_action :verify_game_params!, only: [:new]
  # before_action :create_default_flash, only: [:new]
  # before_action :verify_game_flash!, only: [:create]
  # before_action :keep_flash, only: [:new, :create]

  # GET /resource/sign_in
  def new
    super
  end

  # POST /resource/sign_in
  # def create
  #   if user = User.find_by(email: params[:user][:email])
  #     perform_redemption_and_then_render_or_redirect(user)
  #   else
  #     throw(:warden, scope: :user, message: :not_found_in_database)
  #   end
  # end

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
