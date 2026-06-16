/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import React from 'react';

import { Overlay, Section } from '../../shared/ui';

import { ReportFeedbackSystemInfoSection } from './ReportFeedbackSystemInfoSection';

import * as css from './ReportFeedbackOverlay.less';

const REPORT_ISSUE_LINK = 'https://github.com/operaton/operaton-modeler/issues/new/choose';

const OFFSET = { right: 0 };


export function ReportFeedbackOverlay(props) {
  return (
    <Overlay
      anchor={ props.anchor }
      onClose={ props.onClose }
      offset={ OFFSET }
      className={ css.ReportFeedbackOverlay }
    >
      <ReportFeedbackChannelsSection
        onClose={ props.onClose }
      />

      <ReportFeedbackSystemInfoSection
        onSubmit={ props.onSubmit }
      />
    </Overlay>
  );
}

function ReportFeedbackChannelsSection(props) {

  const {
    onClose
  } = props;

  return (
    <Section>
      <Section.Header>
        Share your feedback
      </Section.Header>
      <Section.Body>
        <p>
          <a onClick={ onClose } href={ REPORT_ISSUE_LINK }>Open an issue on GitHub</a> to report a bug or request a new feature.
        </p>
      </Section.Body>
    </Section>
  );
}
