class GameScore < ActiveRecord::Base
  DIRTY_WORDS = %w(ASS POO DIK FAG CUM SEX TIT)
  validates :initials, :score, :game, presence: true
  validates :game, inclusion: { in: Game::NAMES.keys.map(&:to_s) }
  validates :initials, length: { is: 3 }
  validate  :initials_are_not_dirty

  def self.for_game(game)
    where(game: game)
  end

  def self.leaders(game, n = 5)
    GameScore.for_game(game).order(score: :desc).limit(n)
  end

  def self.rank_of_score(game, score)
    GameScore.for_game(game).order(score: :desc).where('score > ?', score).count + 1
  end

  def self.manually_rank_and_sort(game_scores)
    # We could call .rank on each item, but that would make a database call
    # for each record. Instead lets do this goofy manual loop to figure
    # out ranks.
    rank = 0
    prev_score = nil
    game_scores.sort_by(&:score).reverse.map do |item|
      rank = rank + 1 unless item.score == prev_score
      prev_score = item.score
      {
        rank: rank,
        initials: item.initials,
        score: item.score,
        game_score: item,
      }
    end
  end

  def rank
    GameScore.for_game(game).order(score: :desc).where('score > ?', score).count + 1
  end

  protected

  def initials_are_not_dirty
    if initials && DIRTY_WORDS.include?(initials.upcase)
      errors.add(:initials, 'Sorry, please choose different initials')
    end
  end
end
