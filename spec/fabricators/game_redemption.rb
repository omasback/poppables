Fabricator(:game_redemption) do
  user
  game     { Game::NAMES.keys.sample }
end
