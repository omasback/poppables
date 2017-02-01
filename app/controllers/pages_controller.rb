class PagesController < ApplicationController
  layout 'pages'

  def home
    render layout: 'loader'
  end

  def about
  end

  def gallery
  end

  def rules
  end

  def faq
  end
end
