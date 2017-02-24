class SharesController < ApplicationController
  layout false

  def score
    raise ActionController::ActionNotFound unless Game::NAMES.keys.map(&:to_s).include?(params[:game])
    @game = Game::NAMES[params[:game].to_sym]
    @score = params[:score].to_i
  end
end
