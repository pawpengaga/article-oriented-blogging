module ArticleImagesHandler
  #Tarea, averiguar una mejor forma de hacer esto
  #Esto: Obtener y gestionar url de imagen para json plugin javascript
  extend ActiveSupport::Concern

  def save_article_images
  end

  private

  def parse_content
  end

  def filter_image_blocks(content)
  end

  def extract_signed_id(image_block)
  end

  def find_existing_image(signed_id)
  end

  def create_and_associate_image(signed_id)
  end

  def update_existing_image(existing_image)
  end

  def delete_unused_images
  end

  def delete_unnassociated_images
  end
end
