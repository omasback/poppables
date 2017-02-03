class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    @user = User.from_omniauth(request.env['omniauth.auth'])
    if @user.new_record?
      # send them to registration
      session['devise.facebook_data'] = request.env['omniauth.auth']
      redirect_to new_user_registration_url
    else
      # already registered, sign them in
      sign_in_and_redirect @user
    end
  end
end
