module Admin
  class BaseController < ApplicationController
    include AdminAuthenticable
    # include AdminSource
    before_action :authenticate!
    # before_action :ensure_admin_domain

    layout 'admin'
  end
end
