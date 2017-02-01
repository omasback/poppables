class GameScore < ActiveRecord::Base
  belongs_to :user

  validates :user, :score, :game, presence: true

  def self.for_game(game)
    where(game: game)
  end
end
