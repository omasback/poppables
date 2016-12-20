module AdminAuthenticable
  def authenticate!
    return if session[:logged_in].present?

    session[:return_to] = request.url
    redirect_to [:new, :admin, :sessions]
  end
end
