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
        end
      end
    end

    context 'with an invalid token' do
      it 'returns an error' do
        post '/api/games/record_score', params: { transformed_token: 'alsonotreal', game_name: 'pops', initials: 'ABC' }
        expect(response.status).to eq 401
      end
    end
  end

  describe '#leaderboard_status' do
    let(:base_params) do
      {
        game_name: 'pops',
        initials: 'ABC',
        score: 500
      }
    end
    let(:winning_token) { GameTokenManager.encode([token, '1', '500'].join) }

    it 'creates a game score', doc: true do
      Fabricate :game_score, score: 503, game: 'pops'
      Fabricate :game_score, score: 502, game: 'pops'
      Fabricate :game_score, score: 501, game: 'pops'

      Fabricate :game_score, score: 499, game: 'pops'
      Fabricate :game_score, score: 498, game: 'pops'

      Timecop.freeze(Time.new(2016, 3, 3, 12, 0, Game::NAMES[:pops][:min_win_time] + 1)) do
        get '/api/games/leaderboard_status', params: base_params.merge(transformed_token: winning_token)
        expect(parsed_body['leaders'].map{|e| e['score']}).to match_array([503,502,501,500,499])
        expect(parsed_body['position']).to eq 4
      end
    end
  end
end
