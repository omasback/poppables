require 'rails_helper'

describe 'Game Scores API' do
  describe '#start' do
    it 'generates a new token' do
      post '/api/games/start', params: { game_name: Game::NAMES.keys.sample }
      expect(response.status).to eq 201
      expect(parsed_body['token']).to be
    end
  end

  describe '#finish' do
    context 'with a valid token' do
      let(:token) do
        t = nil
        Timecop.freeze(Time.new(2016,3,3,12,0,0)) do
          t = GameTokenManager.generate_token('pops')
        end
        t
      end
      let(:winning_token) { GameTokenManager.encode([token,'1','100'].join) }
      let(:losing_token) { GameTokenManager.encode([token,'0','100'].join) }
      let(:base_params) {
        {
          name: 'pops',
        }
      }

      context 'with a signed in user' do
        let(:user) { Fabricate :user }
        before do
          sign_in_user(user)
        end

        context 'under the daily limit' do
          it 'creates a game score' do
            Timecop.freeze(Time.new(2016,3,3,12,0, Game::NAMES[:pops][:min_win_time] + 1)) do
              expect{ post '/api/games/finish', params: base_params.merge(transformed_token: winning_token) }.to change(GameScore, :count).by(1)
            end
          end

          it 'returns successfully with a win' do
            Timecop.freeze(Time.new(2016,3,3,12,0,Game::NAMES[:pops][:min_win_time] + 1)) do
              resp = post '/api/games/finish', params: base_params.merge(transformed_token: winning_token)
              expect(response.status).to eq 200
              expect(parsed_body['message']).to eq 'You Won!'
            end
          end

          it 'returns a message with a loss' do
            Timecop.freeze(Time.new(2016,3,3,12,0,Game::NAMES[:pops][:min_win_time] + 1)) do
              resp = post '/api/games/finish', params: base_params.merge(transformed_token: losing_token)
              expect(response.status).to eq 200
              expect(parsed_body['message']).to include 'Nice try, play again.'
            end
          end

          context 'with an invalid game name' do
            it 'raises an error' do
              Timecop.freeze(Time.now + 10000) do
                resp = post '/api/games/finish', params: { transformed_token: winning_token, name: 'pigbot' }
                expect(response.status).to eq 400
              end
            end
          end
        end

        context 'redeeming too soon' do
          it 'returns an error' do
            Timecop.freeze(Time.new(2016,3,3,12,0,Game::NAMES[:pops][:min_win_time] - 1)) do
              resp = post '/api/games/finish', params: base_params.merge(transformed_token: winning_token)
              expect(response.status).to eq 400
              expect(parsed_body['errors'].join('')).to include 'soon'
            end
          end
        end
      end

      context 'without a signed in user' do
        it 'redirects to the sign in page' do
          Timecop.freeze(Time.new(2016,3,3,12,0,Game::NAMES[:pops][:min_win_time] + 1)) do
            resp = post '/api/games/finish', params: base_params.merge(transformed_token: winning_token)
            expect(response.status).to eq 200
            expect(parsed_body['location']).to eq new_user_registration_url
          end
        end
      end
    end

    context 'with an invalid token' do
      it 'treats it as a loss' do
        resp = post '/api/games/finish', params: { transformed_token: 'alsonotreal', name: 'pops' }
        expect(response.status).to eq 200
        expect(parsed_body['message']).to include 'Nice try, play again.'
      end
    end

    context 'with missing parameters' do
      it 'returns an error' do
        resp = post '/api/games/finish', params: { transformed_token: 'notreal' }
        expect(response.status).to eq 400
        expect(parsed_body['errors']).to include 'Invalid request, missing parameters'
      end
    end
  end
end
