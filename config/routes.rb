Rails.application.routes.draw do
  namespace :admin do
    resource :sessions, only: [:new, :create, :destroy]
  end

  root to: 'pages#home'
end
