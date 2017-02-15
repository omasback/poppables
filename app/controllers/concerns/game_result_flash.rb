module GameResultFlash
  extend ActiveSupport::Concern

  def real_game_env?
    ENV['ALLOW_FAKE_TOKEN_GENERATION'] != 'true'
  end

  def keep_flash
    flash.keep(:game_name) if flash[:game_name]
    flash.keep(:token) if flash[:token]
  end

  def verify_game_params!
    if real_game_env? && (params[:game_name].blank? || params[:token].blank?)
      redirect_to root_path
    end
  end

  def verify_game_flash!
    redirect_to root_path unless flash[:game_name].present? && flash[:token].present?
  end

  def create_default_flash
    flash[:game_name] ||= (params[:game_name] || default_game)
    flash[:token] ||= (params[:token] || default_encoded_token(flash[:game_name]))
  end

  def default_game
    raise 'No game parameter passed.' if real_game_env?
    'pops'
  end

  def default_encoded_token(game_name)
    raise 'No token parameter passed.' if real_game_env?
    token = GameTokenManager.generate_token(game_name)
    GameTokenManager.encode([token, '1', '100'].join)
  end

  def perform_redemption_and_then_render_or_redirect(user)
    encoded_token = flash[:token]
    game_name = flash[:game_name]
    flash.delete(:token)
    flash.delete(:game_name)

    token, winner, score = GameTokenManager.decode(encoded_token)
    unless GameTokenManager.redeem_token(token)
      Raven.capture_message("Attempted to redeem invalid token. Possibly cheating.", tags: {type: 'invalid_token'}, level: 'warning')
      redirect_to root_url
      return
    end

    @game_redemption = GameRedemption.new(user: user, game: game_name.presence_in(Game::NAMES.keys.map(&:to_s)))
    if @game_redemption.save
      render 'pages/redemption_winner', layout: 'pages'
    else
      Raven.capture_message("Game redemption could not be saved.", tags: {type: 'save_error'})
      render 'pages/redemption_error', layout: 'pages'
    end
  end
end
