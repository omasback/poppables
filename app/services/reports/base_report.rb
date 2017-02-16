require 'csv'

module Reports
  class BaseReport
    include Enumerable

    attr_reader :headings

    def self.columns
      {}
    end

    def initialize
      columns = self.class.columns
      @headings = columns.keys
      @row_callbacks = columns.values
    end

    def each
      yield @headings.to_csv
      row_query.find_each do |record|
        yield @row_callbacks.map { |cb| cb.call(record) }.to_csv
      end
    end
  end
end
