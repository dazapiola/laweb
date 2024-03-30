import './style.css'
import TwitterX from './public/twitterx.svg'
import Perfil from './public/perfil.jpeg'
import Github from './public/github-mark-white.png'
import { setupCounter } from './counter.js'
import { setupBlog } from './blog.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://www.linkedin.com/in/zapiola/" target="_blank">
      <img src="${Perfil}" class="logo" alt="Linkedin" />
    </a>
    <a href="https://github.com/dazapiola/laweb" target="_blank">
      <img src="${Github}" class="logo github" alt="Github" />
    </a>
    <a href="https://twitter.com/dazapiola/" target="_blank">
      <img src="${TwitterX}" class="logo twitter" alt="Twitter" />
    </a>
    <h1>Dario Alejandro Zapiola</h1>
    <div class="card">
      <button id="counter" type="button"></button>
      <button id="blog" type="button"></button>
    </div>
    <p class="read-the-docs">
      Mejorando 0.100ms por día.
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
setupBlog(document.querySelector('#blog'))