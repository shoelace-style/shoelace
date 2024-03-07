import MarkdownIt from 'markdown-it';
import markdownItContainer from 'markdown-it-container';
import markdownItIns from 'markdown-it-ins';
import markdownItKbd from 'markdown-it-kbd';
import markdownItMark from 'markdown-it-mark';
import markdownItReplaceIt from 'markdown-it-replace-it';

const markdown = MarkdownIt({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: false,
  typographer: false
});

// Third-party plugins
markdown.use(markdownItContainer);
markdown.use(markdownItIns);
markdown.use(markdownItKbd);
markdown.use(markdownItMark);
markdown.use(markdownItReplaceIt);

// Callouts
['tip', 'warning', 'danger'].forEach(type => {
  markdown.use(markdownItContainer, type, {
    render: function (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        return `<div role="alert" class="callout callout--${type}">`;
      }
      return '</div>\n';
    }
  });
});

// Asides
markdown.use(markdownItContainer, 'aside', {
  render: function (tokens, idx) {
    if (tokens[idx].nesting === 1) {
      return `<aside>`;
    }
    return '</aside>\n';
  }
});

// Details
markdown.use(markdownItContainer, 'details', {
  validate: params => params.trim().match(/^details\s+(.*)$/),
  render: (tokens, idx) => {
    const m = tokens[idx].info.trim().match(/^details\s+(.*)$/);
    if (tokens[idx].nesting === 1) {
      return `<details>\n<summary><span>${markdown.utils.escapeHtml(m[1])}</span></summary>\n`;
    }
    return '</details>\n';
  }
});

// Replace [#1234] with a link to GitHub issues
markdownItReplaceIt.replacements.push({
  name: 'github-issues',
  re: /\[#([0-9]+)\]/gs,
  sub: '<a href="https://github.com/shoelace-style/shoelace/issues/$1">#$1</a>',
  html: true,
  default: true
});

export default markdown;
