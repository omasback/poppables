require 'rails_helper'

describe 'Game Scores API' do
  let(:token) do
    t = nil
    Timecop.freeze(Time.new(2016, 3, 3, 12, 0, 0)) do
      t = GameTokenManager.generate_token('pops')
    end
    t
  end
  let(:winning_token) { GameTokenManager.encode([token, '1', '100'].join) }
  let(:losing_token) { GameTokenManager.encode([token, '0', '100'].join) }

  describe '#fetch_token' do
    it 'generates a new token', doc: true do
      post '/api/games/fetch_token', params: { game_name: Game::NAMES.keys.sample }
      expect(response.status).to eq 201
      expect(parsed_body['token']).to be
    end
  end

  describe '#record_score' do
    context 'with a valid token' do
      let(:base_params) do
        {
          game_name: 'pops',
          initials: 'ABC',
          score: 500
        }
      end

      it 'creates a game score', doc: true do
        Timecop.freeze(Time.new(2016, 3, 3, 12, 0, Game::NAMES[:pops][:min_win_time] + 1)) do
          expect{ post '/api/games/record_score', params: base_params.merge(transformed_token: winning_token) }.to change(GameScore, :count).by(1)
        end
      end

      it 'return success' do
        Timecop.freeze(Time.new(2016, 3, 3, 12, 0, Game::NAMES[:pops][:min_win_time] + 1)) do
          post '/api/games/record_score', params: base_params.merge(transformed_token: winning_token)
          expect(response.status).to eq 201
        end
      end

      it 'rejects naughty words' do
        Timecop.freeze(Time.new(2016, 3, 3, 12, 0, Game::NAMES[:pops][:min_win_time] + 1)) do
          post '/api/games/record_score', params: base_params.merge(transformed_token: winning_token, initials: 'ASS')
          expect(response.status).to eq 401
          expect(JSON.parse(response.body)["errors"].join(' ')).to eql "Sorry, please choose different initials."
        end
      end
    end

    context 'with an invalid token' do
      it 'returns an error' do
        post '/api/games/record_score', params: { transformed_token: 'alsonotreal', game_name: 'pops', initials: 'ABC' }
        expect(response.status).to eq 401
        expect(JSON.parse(response.body)["errors"].join(' ')).to match(/overloaded/)
      end
    end
  end
end
