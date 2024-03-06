module ArticlesHelper

  def display_content(content)
    parsed_content = JSON.parse(content)
    content_html = parsed_content['blocks'].map do |block|
      case block['type']
      when 'paragraph'
        "<p>#{block['data']['text']}</p>"
      when 'header'
        #Se renderea el nivel de header, y luego el contendido
        "<h#{block['data']['level']}>#{block['data']['text']}</h#{block['data']['level']}>"
      when 'list'
        list_items = block['data']['items'].map { |item| "<li>#{item}</li>" }.join
        "<ul>#{list_items}</ul>"
      when 'code'
        #Escapar el HTML es necesario para que el HTML no se renderize
        escaped_code = CGI.escapeHTML(block['data']['code'])
        "<pre><code>#{escaped_code}</code></pre>"
      else
        ""
      end
    end
    content_html.join.html_safe
  end

end
