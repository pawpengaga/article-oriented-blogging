class Article < ApplicationRecord
  include ArticleImagesHandler
  #Incluimos un concern
  has_many :article_images, dependent: :destroy
end
