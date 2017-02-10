module GameResultFlash
  extend ActiveSupport::Concern

  def keep_flash
    flash.keep(:game_name) if flash[:game_name]
    flash.keep(:token) if flash[:token]
  end

  def verify_game_params!
    if Rails.env.production? && (params[:game_name].blank? || params[:token].blank?)
      redirect_to root_path
    end
  end

  def verify_game_flash!
    redirect_to root_path unless flash[:game_name].present? && flash[:token].present?
  end

  def create_default_flash
    raise if Rails.env.production?
    flash[:game_name] ||= (params[:game_name] || 'pops')
    flash[:token] ||= (params[:token] || default_encoded_token(flash[:game_name]))
  end

  def default_encoded_token(game_name)
    raise if Rails.env.production?
    token = GameTokenManager.generate_token(game_name)
    GameTokenManager.encode([token, '1', '100'].join)
  end
end
