module Api
  class GamesController < BaseController
    include Throttled

    skip_before_action :verify_authenticity_token
    before_action :verify_game_token, only: [:record_score, :redeem, :redeem_and_register]

    def fetch_token
      token = GameTokenManager.generate_token(params[:game_name])
      render status: 201, json: { token: token }
    end

    # record a game score for the leaderboard
    def record_score
      token, winner, score = GameTokenManager.decode(params[:transformed_token])
      game_score = GameScore.create(game: params[:game_name].presence_in(Game::NAMES.keys.map(&:to_s)), score: score, initials: params[:initials].upcase)
      if game_score.valid?
        render json: { success: true }, status: 201
      else
        render json: { success: false, errors: game_score.errors.full_messages }, status: 401
      end
    end

    protected

    def verify_game_token
      token, winner, score = GameTokenManager.decode(params[:transformed_token])
      unless GameTokenManager.redeem_token(token)
        render json: { success: false, errors: ['You\'ve overloaded us! Take a quick break and come back soon!'] }, status: 401
      end
    end
  end
end
