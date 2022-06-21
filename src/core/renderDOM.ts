import Block from './block';

export default function RenderDOM(block: Block) {
  const root = document.querySelector('#content');
  if (root) {
    root.innerHTML = '';
    root.appendChild(block.getContent());
  }
}
