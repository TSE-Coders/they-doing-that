class Name < ApplicationRecord

  def self.randomName

    max = Name.all.length
    id = rand(1..max)
    id

  end


end
