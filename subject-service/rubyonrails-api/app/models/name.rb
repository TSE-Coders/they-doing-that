class Name < ApplicationRecord

  /.def self.randomName

    max = Name.all.length
    id = rand(1..max)
    id

  end./

  def self.random_existing_id
    Name.pluck(:id).sample
  end


end
