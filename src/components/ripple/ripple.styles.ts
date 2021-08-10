import { css } from 'lit';
import componentStyles from '../../styles/component.styles';

export default css`
  ${componentStyles}
  :host{
    display:inline-block;
    position:relative;
    overflow:hidden;
    --sl-ripple-color:rgba(0,0,0,.25);
}
.ripple{
    position: absolute;
    background: var(--sl-ripple-color);
    border-radius: 100%;
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
    pointer-events: none;
}
.ripple.show {
  -webkit-animation: ripple .5s ease-out;
  animation: ripple .5s ease-out;
}
@keyframes ripple {
     to {
        -webkit-transform: scale(1.5);
        transform: scale(1.5);
        opacity: 0;
    }
}
`;
