require 'rails_helper'
require 'csv'

describe 'Admin Functionality' do
  describe 'reports#show' do

    let!(:user) { Fabricate(:user) }
    let(:pops_games) { 5 }
    let(:dots_games) { 3 }

    before do
      pops_games.times{ Fabricate(:game_score, game: 'pops') }
      dots_games.times{ Fabricate(:game_score, game: 'dots') }
    end

    context "not authenticated" do
      it "redirects" do
        get '/admin/reports/users'
        expect(response).to redirect_to(new_admin_sessions_path)
      end
    end

    context "authenticated" do
      before do
        post '/admin/sessions', params: { password: ENV['ADMIN_PASSWORD'] }
      end

      it 'should return csv for users' do
        get '/admin/reports/users'
        expect(response.status).to eql 200
        expect(response.headers["Content-Type"]).to eql "text/csv"
        csv = CSV.parse(response.body)
        expect(csv.length).to eql 1 + 1   # 1 extra row for header

        index = csv.first.index("Email")
        expect(csv[1][index]).to eql user.email
      end

      it 'should return csv for games, alphabetically' do
        get '/admin/reports/games'
        expect(response.status).to eql 200
        expect(response.headers["Content-Type"]).to eql "text/csv"
        csv = CSV.parse(response.body)
        expect(csv.length).to eql 1 + 2   # 1 extra row for header

        index = csv.first.index("Game")
        expect(csv[1][index]).to eql "dots"
        index = csv.first.index("Times Played")
        expect(csv[1][index].to_i).to eql dots_games

        index = csv.first.index("Game")
        expect(csv[2][index]).to eql "pops"
        index = csv.first.index("Times Played")
        expect(csv[2][index].to_i).to eql pops_games
      end
    end
  end
end
