
import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Link from 'flarum/common/components/Link';
import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';

app.initializers.add('tacraft-sociality-discussion-top', () => {
  extend(DiscussionListItem.prototype, 'view', function (vdom) {
    if (this.attrs.params?.q) {
      return;
    }

    const discussion = this.attrs.discussion;

    if (!discussion || !vdom.children) {
      return;
    }

    vdom.children.forEach((child) => {
      if (
        !child ||
        !child.attrs ||
        !child.attrs.className ||
        !child.attrs.className.includes('DiscussionListItem-content') ||
        !child.children
      ) {
        return;
      }

      child.children.forEach((link) => {
        if (!link || link.tag !== Link || !link.attrs) {
          return;
        }
        link.attrs.href = app.route.discussion(discussion, 0);
      });
    });
  });
});
