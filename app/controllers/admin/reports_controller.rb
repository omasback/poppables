module Admin
  class ReportsController < BaseController
    before_filter :authenticate!

    REPORT_TYPES = {
      users: Reports::UsersReport,
      games: Reports::GamesReport
    }

    def index
      # TODO implement me
      render text: 'this is root'
    end

    def show
      report_class = REPORT_TYPES.fetch(params[:id].to_sym)

      filename = "#{params[:id]}_#{Time.now.iso8601}.csv"

      headers['Content-Type'] = 'text/csv'
      headers['Content-Disposition'] = "attachment; filename=\"#{filename}\""
      headers['X-Accel-Buffering'] = 'no'
      headers['Cache-Control'] = 'no-cache'
      headers.delete('Content-Length')

      self.response_body = report_class.new
    end
  end
end
