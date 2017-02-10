module GameResultFlash
  extend ActiveSupport::Concern

  def keep_flash
    flash.keep(:game_name) if flash[:game_name]
    flash.keep(:token) if flash[:token]
  end
end
