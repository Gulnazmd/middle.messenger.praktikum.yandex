import * as Handlebars from 'handlebars';
import { BlockConstructable } from './Block';

export default function registerComponent<Props extends {}>(
  Component: BlockConstructable<Props>,
  name: string,
) {
  Handlebars
    .registerHelper(name, ({ hash: { ref, ...hash }, data }: Handlebars.HelperOptions) => {
      if (!data.root.children) {
        data.root.children = {};
      }

      if (!data.root.refs) {
        data.root.refs = {};
      }

      const { children, refs } = data.root;

      const component = new Component(hash);

      children[component.id] = component;

      if (ref) {
        refs[ref] = component.getContent();
      }

      return `<div data-id="${component.id}"></div>`;
    });
}
