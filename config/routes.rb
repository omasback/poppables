Rails.application.routes.draw do
  namespace :admin do
    resource :sessions, only: [:new, :create, :destroy]
  end

  resources :games, only: [:index, :show], constraints: { id: /(pops|dots|catch)/ }

  get '/about', to: 'pages#about', as: 'about'
  get '/gallery', to: 'pages#gallery', as: 'gallery'
  get '/rules', to: 'pages#rules', as: 'rules'
  get '/faq', to: 'pages#faq', as: 'faq'

  root to: 'pages#home'
end
