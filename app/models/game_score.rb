require 'set'

class GameScore < ActiveRecord::Base
  DIRTY_WORDS = %w(666 $3X $EX A$$ A$5 A$S A$S A5$ A55 AS$ ASS BCH BUM BUT CNT COK C0K CUM D!3 D!E D1E D1E DCK DIE DIK F@G F@T F4G F4T FAG FAT FUC FUK FUX G@Y G0D G4Y GAY GOD GUN IRA J!Z J1Z JIZ KKK KNT KOK LIK LSD NIG P00 P33 P5Y PEE POO POT PSY S3X SEX SHT SUK T!T TIT VAG VAJ)

  @dirty_words_hash = Set.new(DIRTY_WORDS)
  class << self
    attr_reader :dirty_words_hash
  end

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
    if initials && self.class.dirty_words_hash.include?(initials.upcase)
      errors.add(:base, "Sorry, please choose different initials.")
    end
  end
end
