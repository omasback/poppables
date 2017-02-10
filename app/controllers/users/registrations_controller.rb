class Users::RegistrationsController < Devise::RegistrationsController
  include GameResultFlash
  before_action :keep_flash, only: [:new, :create]
  before_action :configure_sign_up_params, only: [:create]

  # POST /resource
  def create
    super
  end

  def new
    if Rails.env.production? && (params[:game_name].blank? || params[:token].blank?)
      redirect_to root_path
      return
    end

    unless Rails.env.production?
      flash[:game_name] ||= (params[:game_name] || 'pops')
      flash[:token] ||= (params[:token] || default_encoded_token(flash[:game_name]))
    end
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

  def default_encoded_token(game_name)
    raise if Rails.env.production?
    token = GameTokenManager.generate_token(game_name)
    GameTokenManager.encode([token, '1', '100'].join)
  end
end
