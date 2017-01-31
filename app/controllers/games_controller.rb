class GamesController < ApplicationController
  layout 'pages'

  def show
    raise ActionController::RoutingError, 'Not Found' unless Game::NAMES[params[:id].to_sym]

    @game = params[:id]
    render layout: 'loader'
  end
end
