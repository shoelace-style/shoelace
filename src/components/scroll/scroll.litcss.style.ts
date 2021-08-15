import { css } from 'lit';
export default css`
  :host {
    display: block;
  }
  div[part='base'] {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  div[part='scroll-y'] {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    width: var(--scroll-bar-out-width, 12px);
    bottom: 0;
    cursor: default;
    user-select: none;
  }
  .showYScroll div[part='scroll-y'] {
    display: block;
  }
  .showXScroll div[part='scroll-y'] {
    bottom: var(--scroll-bar-out-width, 8px);
  }
  div[part='right-bottom'] {
    display: none;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .showYScroll.showXScroll div[part='right-bottom'] {
    width: var(--scroll-bar-out-width, 12px);
    height: var(--scroll-bar-out-width, 12px);
    display: block;
  }
  div[part='scroll-y-handler'],
  div[part='scroll-x-handler'] {
    background-color: var(--scroll-bar-color, #dbdbdb);
    border-radius: 3px;
  }
  div[part='scroll-y-handler'] {
    position: absolute;
    top: 0;
    left: calc((var(--scroll-bar-out-width) - var(--scroll-bar-width)) / 2);
    bottom: auto;
    width: var(--scroll-bar-width);
  }
  div[part='scroll-y-handler']:hover,
  div[part='scroll-x-handler']:hover {
    background-color: var(--scroll-bar-hover-color, #bdbdbd);
  }
  div[part='scroll-x'] {
    position: absolute;
    bottom: 0;
    left: 0;
    display: none;
    right: 0;
    height: var(--scroll-bar-out-width, 8px);
    cursor: default;
    user-select: none;
  }
  .showXScroll div[part='scroll-x'] {
    display: block;
  }
  .showYScroll div[part='scroll-x'] {
    right: var(--scroll-bar-width, 8px);
  }
  div[part='scroll-x-handler'] {
    position: absolute;
    left: 0;
    top: calc((var(--scroll-bar-out-width) - var(--scroll-bar-width)) / 2);
    right: auto;
    height: var(--scroll-bar-width);
  }
  div[part='content'] {
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  .showYScroll div[part='content'] {
    right: var(--scroll-bar-out-width, 12px);
  }
  .showXScroll div[part='content'] {
    bottom: var(--scroll-bar-out-width, 12px);
  }
`;
