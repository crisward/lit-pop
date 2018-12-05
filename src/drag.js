import {LitElement, html} from '@polymer/lit-element'
import { tween,timeline,pointer,listen, spring } from 'popmotion'


class Drag extends LitElement {

  static get properties(){
    return {
      x: { attribute: 'x',type: Number },
      y: { attribute: 'y', type: Number },
    };
  }

  constructor() {
    super();
    this.x = 0
    this.y = 0
  }

  firstUpdated(){
    listen(document, 'mouseup touchend').start(this.stopTracking.bind(this));
  }

  startTracking(){
    this.pointerTracker = pointer({
      x: this.x,
      y: this.y
    }).start(v =>{
      this.x = v.x
      this.y = v.y
    });
  };
  
  stopTracking(){
    if (this.pointerTracker) this.pointerTracker.stop();
    spring({
      from:{x:this.x,y:this.y}, 
      to: 0,
      stiffness: 200,
      damping: 10
    }).start(v => {
      this.x = v.x
      this.y = v.y
    })
  };

  render() {
    return html`
      <style>
        :host{
          position:relative;
          cursor:move;
        }
      </style>
      <span @mousedown=${this.startTracking} style="display:inline-block;transform:translate(${this.x}px,${this.y}px)">
        <slot></slot>
      </span>
      
    `;
  }

}

export default customElements.define('drag-tag',Drag)