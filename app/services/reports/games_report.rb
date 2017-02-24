module Reports
  class GamesReport < BaseReport
    def self.columns
      {
        'Game'               => -> m { m.game },
        'Times Played'       => -> m { m.times_played }
      }
    end

    def row_query
      GameScore.select(:game, "count(1) as times_played").group(:game).order(:game)
    end

    def each
      yield @headings.to_csv
      row_query.each do |record|
        yield @row_callbacks.map { |cb| cb.call(record) }.to_csv
      end
    end
  end
end
