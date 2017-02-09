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
      game_score = GameScore.create(game: params[:name].presence_in(Game::NAMES.keys.map(&:to_s)), score: score, initials: params[:initials].upcase)
      if game_score.valid?
        render json: { success: true }, status: 201
      else
        render json: { success: false, errors: game_score.errors.full_messages }, status: 401
      end
    end

    # see if this user has won a prize for the game completion
    def redeem
      token, winner, score = GameTokenManager.decode(params[:transformed_token])
      user = User.find_by(email: params[:email])
      unless user
        render status: 400, json: { errors: ['No user with that email found'] }
        return
      end

      game_redemption = GameRedemption.new(user: user, game: params[:name].presence_in(Game::NAMES.keys.map(&:to_s)))
      if game_redemption.save
        render json: { success: true, result: game_redemption.result, redemption_url: game_redemption.coupon_url }, status: 201
      else
        render status: 400, json: { errors: game_redemption.errors.full_messages }
      end
    end

    # create a new user and see if he/she has won a prize for the game completion
    def redeem_and_register
      token, winner, score = GameTokenManager.decode(params[:transformed_token])
      user = User.new(params.permit(:email, :first_name, :last_name, :zip_code, :opt_in, :dob, :terms_and_conditions))
      user.captcha = verify_recaptcha
      if user.save
        game_redemption = GameRedemption.new(user: user, game: params[:name].presence_in(Game::NAMES.keys.map(&:to_s)))
        if game_redemption.save
          render json: { success: true, result: game_redemption.result, redemption_url: game_redemption.coupon_url }, status: 201
        else
          render status: 400, json: { errors: game_redemption.errors.full_messages }
        end
      else
        render status: 400, json: { errors: user.errors.full_messages }
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
