import React, { Component } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router';

import styles from './Welcome.module.scss';

function Welcome():any {
    return (
      <>
        <div className={styles.choose}>Something</div>
      </>
    );
}

export default withRouter(Welcome);
