module Api
  class BaseController < ApplicationController
    respond_to :json
    protect_from_forgery with: :null_session unless ENV['LOAD_TEST']
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    protected

    def record_not_found
      render json: { errors: ['record not found'] }, status: 404
    end
  end
end
