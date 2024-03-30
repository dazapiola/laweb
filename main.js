import './style.css'
import javascriptLogo from './public/javascript.svg'
import Perfil from './public/perfil.jpeg'
import Github from './public/github-mark-white.png'
import { setupCounter } from './counter.js'
import { setupBlog } from './blog.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://www.linkedin.com/in/zapiola/" target="_blank">
      <img src="${Perfil}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <a href="https://github.com/dazapiola/laweb" target="_blank">
      <img src="${Github}" class="logo github" alt="Github logo" />
    </a>
    <h1>Dario Alejandro Zapiola</h1>
    <div class="card">
      <button id="counter" type="button"></button>
      <button id="start" type="button"></button>
    </div>
    <p class="read-the-docs">
      Improving by 0.100ms per day
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
setupBlog(document.querySelector('#blog'))