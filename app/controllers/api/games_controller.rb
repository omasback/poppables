module Api
  class GamesController < BaseController
    include Throttled

    skip_before_action :verify_authenticity_token
    before_action :validate_token_params, only: [:finish]

    def start
      throttle_response?(BanWagon.new(:game_start_user, current_user.id)) &&
        return if current_user

      # throttle_response?(BanWagon.new(:game_start_ip, request.remote_ip)) && return

      token = GameTokenManager.generate_token(params[:game_name])
      render status: 201, json: { token: token }
    end

    def finish
      token, winner, score = GameTokenManager.decode(params[:transformed_token])

      unless winner
        render status: 200, json: {
          message: ['Nice try, play again.'],
        }
        return
      end

      if current_user
        throttle_response?(BanWagon.new(:game_win_user, current_user.id)) &&
          return if current_user

        unless GameTokenManager.redeem_token(token)
          # invalid or expired token
          Raven.capture_exception(StandardError.new('Invalid Game Token')) if Rails.env.production?

          render status: 400, json: {
            errors: ['You\'ve overloaded us! Take a quick break and come back soon!'],
          }
          return
        end

        game_score = GameScore.create(game: params[:name].presence_in(Game::NAMES.keys.map(&:to_s)), score: score, user: current_user, win: winner)
        unless game_score.valid?
          render status: 400, json: { errors: game_score.errors.full_messages }
          return
        end

        render status: 200, json: {
          message: 'You Won!',
        }
      else
        flash[:entry] = params[:name]
        render status: 200, json: {
          message: 'You Won! Log in to redeem your entry',
          location: new_user_registration_url,
        }
      end
    end

    protected

    def validate_token_params
      unless %i(transformed_token name).all?{ |k| params[k].present? }
        render status: 400, json: {
          errors: ['Invalid request, missing parameters'],
        }
      end
    end
  end
end
