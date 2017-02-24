class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]

  # POST /resource
  def create
    build_resource(sign_up_params)
    resource.save
    if resource.persisted?
      redirect_to root_url
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
    if params[:user]['dob(i1)'] && params[:user]['dob(2i)'] && params[:user]['dob(3i)']
      params[:user][:dob] = begin
                              Date.new(params[:user]['dob(i1)'].to_i, params[:user]['dob(2i)'].to_i, params[:user]['dob(3i)'].to_i)
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
