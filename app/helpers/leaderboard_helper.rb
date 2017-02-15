module LeaderboardHelper
  def leaderboard_items(game_slug, n = 5)
    items = GameScore.for_game(game_slug).order(score: :desc).limit(n)
    GameScore.manually_rank_and_sort(items)
  end
end
