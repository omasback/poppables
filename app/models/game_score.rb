class GameScore < ActiveRecord::Base
  DIRTY_WORDS = %w(ASS POO DIK FAG CUM SEX TIT)
  validates :initials, :score, :game, presence: true
  validates :game, inclusion: { in: Game::NAMES.keys.map(&:to_s) }
  validates :initials, length: { is: 3 }
  validate  :initials_are_not_dirty

  def self.for_game(game)
    where(game: game)
  end

  def rank
    GameScore.for_game(game).order(score: :desc).where('score > ?', score).count + 1
  end

  protected

  def initials_are_not_dirty
    if initials && DIRTY_WORDS.include?(initials.upcase)
      errors.add(:initials, 'Initials are not allowed')
    end
  end
end
