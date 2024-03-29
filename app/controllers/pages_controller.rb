class PagesController < ApplicationController
  layout 'pages'

  def home
    render layout: 'loader'
  end

  def about; end

  def nutrition; end

  def gallery; end

  def faq; end

  def upgrade; end

  def coming_soon; end

  def where_to_buy; end

  def rules; end

  def redemption_winner
    @game_redemption = GameRedemption.new(result: 'win_free_bag', pin_code: SecureRandom.hex, game: 'pops')
  end

  def redemption_error
    @game_redemption = GameRedemption.new(result: 'win_free_bag', pin_code: SecureRandom.hex, game: 'pops')
  end
end
