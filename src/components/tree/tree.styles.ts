import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}

  :host {
    display: block;
    /** 
     * tree-item indentation uses the "em" unit in order to increment its width on each level,
     * so setting the font size to zero here, removes the indentation for all the nodes in the first level.
     */
    font-size: 0;
  }
`;
