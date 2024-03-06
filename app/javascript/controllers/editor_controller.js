import { Controller } from "@hotwired/stimulus"
//Aqui deberían ir todos los imports de EditorJS, pero se convirtieron en CDN XDDDD

/**
 * CodeTool
 * Header
 * List
 * Paragraph
 */

// Connects to data-controller="editor"
export default class extends Controller {

  static targets = ["article_content"]

  connect() {
    //Creamos el componente aqui
    console.log('HOLA TILINES')

    const initialContent = this.getInitialContent()

    this.contentEditor = new EditorJS({
      holder: this.article_contentTarget, //Ahora con el componente creado vamos a habilitar el guardado
      data: initialContent,
      tools: {
        header: {
          class: Header
        },
        list: {
          class: List
        },
        paragraph: {
          class: Paragraph,
          config: {
            inlineToolbar: true
          }
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: `/articles/upload_image`
            },
            aditionalRequestHeaders: {
              "X-CSRF-Token": this.csrfToken()
            }
          }
        },
        code: CodeTool
      }
    })
    this.element.addEventListener("submit", this.saveEditorData.bind(this))
  }

  getInitialContent(){
    const hiddenContentField = document.querySelector('#article_content_hidden')
    if (hiddenContentField && hiddenContentField.value){
      return JSON.parse(hiddenContentField.value)
    }
    return {}
  }

  async saveEditorData(event){
    event.preventDefault()

    const outputData = await  this.contentEditor.save()
    const articleForm = this.element

    const hiddenInput = document.querySelector('#article_content_hidden')

    hiddenInput.value = JSON.stringify(outputData)
    articleForm.submit()
  }

  //Helper que fue copypasteado por el creador que diablos XDDDD
  csrfToken(){
    const metaTag = document.querySelector("meta[name='csrf-token']")
    return metaTag ? metaTag.content : ""
  }
}
