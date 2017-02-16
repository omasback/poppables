module Reports
  class GamesReport < BaseReport
    def self.columns
      hash = {
        'Email'               => -> m { m.email }
      }
      games = Game::NAMES.keys.reduce({}) do |agg, game|
        agg["Played #{game.capitalize}"] = -> m { m.games_list.include?(game.to_s) ? "yes" : "no" }
        agg
      end
      hash.merge(games)
    end

    def row_query
      group = ['users.id', 'users.email']
      select = ['array_agg(distinct game_redemptions.game) as games_list']
      User.joins(:game_redemptions).select((group + select).join(',')).group(group)
    end
  end
end
