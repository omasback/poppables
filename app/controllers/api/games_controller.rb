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
      # Create game score
      GameScore.create(game: params[:name], score: score, user: current_user, win: winner)

      unless winner
        render status: 200, json: {
          entry: nil,
          message: ['Nice try, play again.'],
        }
        return
      end

      throttle_response?(BanWagon.new(:game_win_user, current_user.id)) &&
        return if current_user

      # throttle_response?(BanWagon.new(:game_win_ip, request.remote_ip)) && return

      unless GameTokenManager.redeem_token(token)
        # invalid or expired token
        Raven.capture_exception(StandardError.new('Invalid Game Token'))

        render status: 400, json: {
          errors: ['You\'ve overloaded us! Take a quick break and come back soon!'],
        }
        return
      end

      unless current_user
        flash[:entry] = params[:name]
        render status: 200, json: {
          message: 'You Won! Log in to redeem your entry',
          location: new_user_registration_url,
        }
        return
      end

      entry = current_user.entries.create(source: params[:name].presence_in(GAMES.keys))
      if entry.valid?
        render status: 201, json: {
          entry: EntrySerializer.new(entry, root: false, scope: current_user),
          message: 'Congrats! You won an Entry',
        }
      else
        if entry.errors.keys != [:base]
          # anything other than daily limit
          Raven.capture_exception(StandardError.new('Invalid Game Entry'))
        end
        render status: 400, json: { errors: entry.errors.full_messages }
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
