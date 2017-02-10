module LeaderboardHelper
  def leaderboard_items(game_slug, n = 5)
    items = GameScore.for_game(game_slug).order(score: :desc).limit(n)

    # We could call .rank on each item, but that would make a database call
    # for each record. Instead lets do this goofy manual loop to figure
    # out ranks.
    rank = 0
    prev_score = nil
    items.map do |item|
      rank = rank + 1 unless item.score == prev_score
      prev_score = item.score
      {
        rank: rank,
        initials: item.initials,
        score: item.score,
      }
    end
  end
end
