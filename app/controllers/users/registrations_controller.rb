class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]

  # POST /resource
  def create
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
    devise_parameter_sanitizer.for(:sign_up).push(*user_params)
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
