require 'rails_helper'
require 'csv'

describe 'Admin Functionality' do
  describe 'reports#show' do

    let!(:user) { Fabricate(:user) }
    let!(:redemption_1) { Fabricate(:game_redemption, user: user, game: 'dots') }
    let!(:redemption_2) { Fabricate(:game_redemption, user: user, game: 'dots') }

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

        index = csv.first.index("Number of Wins")
        expect(csv[1][index].to_i).to eql 2
      end

      it 'should return csv for games' do
        get '/admin/reports/games'
        expect(response.status).to eql 200
        expect(response.headers["Content-Type"]).to eql "text/csv"
        csv = CSV.parse(response.body)
        expect(csv.length).to eql 1 + 1   # 1 extra row for header

        index = csv.first.index("Played Dots")
        expect(csv[1][index]).to eql "yes"
        index = csv.first.index("Played Pops")
        expect(csv[1][index]).to eql "no"
      end
    end
  end
end
