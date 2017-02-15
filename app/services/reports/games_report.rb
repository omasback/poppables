module Reports
  class GamesReport < BaseReport
    def self.columns
      hash = {
        'Email'               => -> m { m.email }
      }
      Game::NAMES.keys.map(&:to_s).each do |name|
        hash["Played #{name.capitalize}"] = -> m { m.games_list.include?(name) ? "yes" : "no" }
      end
      hash
    end

    def row_query
      group = ['users.id', 'users.email']
      select = ['array_agg(distinct game_redemptions.game) as games_list']
      User.joins(:game_redemptions).select((group + select).join(',')).group(group)
    end
  end
end
