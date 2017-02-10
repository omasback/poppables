Fabricator(:game_score) do
  score    { rand(1_000) }
  game     { Game::NAMES.keys.sample }
  initials { 3.times.map{ ('A'..'Z').to_a.sample }.join }
end
