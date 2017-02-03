class GameScore < ActiveRecord::Base
  belongs_to :user

  validates :user, :score, :game, presence: true
  validates :game, inclusion: { in: Game::NAMES.keys.map(&:to_s) }

  def self.for_game(game)
    where(game: game)
  end
end
