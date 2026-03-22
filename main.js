import './styles.css'
import { supabase } from './supabase.js'

const form = document.getElementById('contact-form')
const btnText = document.getElementById('btn-text')
const btnLoader = document.getElementById('btn-loader')
const formMessage = document.getElementById('form-message')

form?.addEventListener('submit', async (e) => {
  e.preventDefault()

  const name = document.getElementById('name').value.trim()
  const email = document.getElementById('email').value.trim()
  const message = document.getElementById('message').value.trim()

  // Loading state
  btnText.style.display = 'none'
  btnLoader.style.display = 'inline'
  formMessage.textContent = ''
  formMessage.className = 'form-message'

  const { error } = await supabase.from('contacts').insert([{ name, email, message }])

  btnText.style.display = 'inline'
  btnLoader.style.display = 'none'

  if (error) {
    formMessage.textContent = 'Hubo un error al enviar. Intentá de nuevo.'
    formMessage.classList.add('form-message--error')
  } else {
    formMessage.textContent = '¡Mensaje enviado! Me contactaré pronto.'
    formMessage.classList.add('form-message--success')
    form.reset()
  }
})
