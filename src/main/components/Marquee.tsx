import * as React from 'react';
import { Motion, spring, Style, SpringHelperConfig } from 'react-motion';

interface IProps {
  children: React.ReactNode;
}

interface IState {
  fromStyle: Style;
  toStyle: Style;
  reversed: boolean;
}

export default class Marquee extends React.Component<IProps, IState> {
  private _content: HTMLSpanElement | null;
  private _marquee: HTMLDivElement | null;

  private _startMarqueeHandler: any;

  private _fromSpringConfig: SpringHelperConfig = { stiffness: 10, damping: 10, precision: 0.1 };
  private _toSpringConfig: SpringHelperConfig = { stiffness: 10, damping: 10, precision: 1 };

  public componentWillMount() {
    this.state = {
      fromStyle: { x: spring(0, this._fromSpringConfig) },
      toStyle: { x: spring(0, this._toSpringConfig) },
      reversed: false,
    };

    this.animate = this.animate.bind(this);
  }

  public componentDidMount() {
    // Start after a delay
    this._startMarqueeHandler = setTimeout(() => {
      this.animate();

      window.addEventListener('resize', this.animate);
    }, 500);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.animate);
    clearTimeout(this._startMarqueeHandler);
  }

  private animate() {
    const marqueeWidth = this._marquee && this._marquee.offsetWidth || 0;
    const contentWidth = this._content && this._content.offsetWidth || 0;

    this.setState({ toStyle: { x: spring(contentWidth - marqueeWidth, this._toSpringConfig) } });
  }

  public render() {
    return (
      <div ref={(node) => { this._marquee = node; }} className="marquee">
        <Motion
          defaultStyle={{ x: 0 }}
          style={this.state.reversed ? this.state.fromStyle : this.state.toStyle}
          onRest={() => {
            requestAnimationFrame(() => {
              this.setState({
                reversed: !this.state.reversed,
              });
            });
          }}
        >
          {
            (interpolatingStyle) => {
              return (
                <span
                  ref={(node) => { this._content = node; }}
                  className="marquee__content"
                  style={{ right: interpolatingStyle.x }}
                >
                  {this.props.children}
                </span>
              );
            }
          }
        </Motion>
      </div>
    );
  }
}
