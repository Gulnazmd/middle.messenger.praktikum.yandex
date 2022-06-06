import Block from './block';

export default function renderDOM(block: Block) {
  const root = document.querySelector('#content');

  root!.innerHTML = '';
  root!.appendChild(block.getContent());
}
