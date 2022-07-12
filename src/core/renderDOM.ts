import Block from './block';

export default function RenderPage(block: Block<{}>, selector = '#content') {
  const root = document.querySelector(selector);

  root!.innerHTML = '';

  root!.appendChild(block.getContent());
}
