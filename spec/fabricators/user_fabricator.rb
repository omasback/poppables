Fabricator(:user) do
  captcha     true
  email       { FFaker::Internet.email }
  password    { 'password' }
  first_name  { FFaker::Name.first_name }
  last_name   { FFaker::Name.last_name }
  dob         { Time.zone.today - 25.years + rand(365).days }
  zip_code    { rand(99_999) }
end
