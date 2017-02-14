require 'rails_helper'

describe 'User Registration Logic' do
  let(:first_name) { "Some" }
  let(:last_name) { "Name" }
  let(:email_addr) { "some@email.com" }
  let(:pops_game) { "pops" }
  let(:dots_game) { "dots" }
  let(:winning_copy) { "You win" }
  let(:winning_coupon_copy) { "win_coupon" }
  let(:winning_bag_copy) { "win_free_bag" }
  let(:winning_nothing_copy) { "win_nothing" }

  before do
    @free_bags_envvar = ENV["FREE_BAGS_EXHAUSTED"]
    ENV["FREE_BAGS_EXHAUSTED"] = "false"
  end

  describe "User Sign Up" do
    context "invalid cases" do
      it "redirects if no game_name is passed" do
        visit new_user_registration_path(token: "some_token")
        expect(current_path).to eql root_path
      end

      it "redirects if no token param is passed" do
        visit new_user_registration_path(game_name: "some_game")
        expect(current_path).to eql root_path
      end

      it "redirects if token is invalid" do
        visit new_user_registration_path(game_name: pops_game, token: "invalid_token")
        fill_in "user_email", with: email_addr
        fill_in "user_first_name", with: first_name
        fill_in "user_last_name", with: last_name
        check "user_terms_and_conditions"
        click_button "Sign up"
        expect(current_path).to eql root_path
      end
    end

    context "user win cases" do
      before :each do
        Timecop.freeze(Time.now - 30.minutes)
        @token = GameTokenManager.generate_token(pops_game)
        Timecop.return
      end

      it "presents a winner page" do
        visit new_user_registration_path(game_name: pops_game, token: GameTokenManager.encode(@token))
        fill_in "user_email", with: email_addr
        fill_in "user_first_name", with: first_name
        fill_in "user_last_name", with: last_name
        check "user_terms_and_conditions"
        click_button "Sign up"
        expect(body).to include winning_copy
        expect(body).to include winning_bag_copy
      end

      after do
        Timecop.return
      end
    end
  end

  describe "User Sign In" do
    def play_game_and_login(email, token, game)
      visit new_user_session_path(game_name: game, token: GameTokenManager.encode(token))
      fill_in "user_email", with: email
      click_button "Log in"
    end

    context "invalid cases" do
      it "redirects if no game_name is passed" do
        visit new_user_session_path(token: "some_token")
        expect(current_path).to eql root_path
      end

      it "redirects if no token param is passed" do
        visit new_user_session_path(game_name: "some_game")
        expect(current_path).to eql root_path
      end

      it "redirects if token is invalid" do
        play_game_and_login(email_addr, "invalid_token", pops_game)
        expect(current_path).to eql root_path
      end
    end

    context "user win cases" do
      let!(:user) { Fabricate(:user, email: "winner@winner.com", captcha: "captcha") }

      before :each do
        Timecop.freeze(Time.now - 30.minutes)
        @token = GameTokenManager.generate_token(pops_game)
        Timecop.return
      end

      it "presents a winner page (winning bag) on first win" do
        play_game_and_login(user.email, @token, pops_game)
        expect(body).to include winning_copy
        expect(body).to include winning_bag_copy
      end

      it "presents a winner page (winning bag) on first win of a specific game" do
        GameRedemption.create(user: user, game: dots_game)
        play_game_and_login(user.email, @token, pops_game)
        expect(body).to include winning_copy
        expect(body).to include winning_coupon_copy
      end

      it "presents a winner page (winning coupon) on second win" do
        GameRedemption.create(user: user, game: pops_game)
        play_game_and_login(user.email, @token, pops_game)
        expect(body).to include winning_copy
        expect(body).to include winning_coupon_copy
      end

      it "presents a winner page (winning nothing) on third win" do
        GameRedemption.create(user: user, game: pops_game)
        GameRedemption.create(user: user, game: pops_game)
        play_game_and_login(user.email, @token, pops_game)
        expect(body).to include winning_copy
        expect(body).to include winning_nothing_copy
      end

      after do
        Timecop.return
      end
    end
  end

  after do
    ENV["FREE_BAGS_EXHAUSTED"] = @free_bags_envvar
  end
end
