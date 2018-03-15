import * as React from 'react';
import * as classnames from 'classnames';

import {
  Loading,
} from '../';

interface IProps extends React.HTMLProps<HTMLDivElement> {
  showLoader?: boolean;
}

export default (props: IProps) => {
  const { className, children, showLoader, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      className={classnames({
        page: true,
        [className as string]: !!className,
      })}
    >
      {children}

      {showLoader && <Loading />}
    </div>
  );
};
