import * as React from 'react';

interface IProps {
  withIcon?: boolean;
}

export default (props: IProps) => (
  <div className="loading">
    <div className="loading__container">
      {
        props.withIcon &&
        <img className="loading__icon" src="assets/ing_app_icon.png" />
      }

      <div className="loading__border" />
      <div className="loading__spinner" />
    </div>
  </div>
);
