/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { FC } from 'react';
import React, { Fragment } from 'react';

import {
  EuiDescriptionList,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiTitle,
  EuiSpacer,
} from '@elastic/eui';

export interface SectionItem {
  title: string | JSX.Element;
  description: string | number | JSX.Element;
}

export interface SectionConfig {
  title: string;
  position: 'left' | 'right';
  items: SectionItem[];
}

interface SectionProps {
  section: SectionConfig;
}

export const Section: FC<SectionProps> = ({ section }) => {
  if (section.items.length === 0) {
    return null;
  }

  return (
    <EuiPanel>
      <EuiTitle size="xs">
        <span>{section.title}</span>
      </EuiTitle>
      <EuiDescriptionList compressed type="column" listItems={section.items} />
    </EuiPanel>
  );
};

interface ExpandedRowDetailsPaneProps {
  sections: SectionConfig[];
  dataTestSubj?: string;
}

export const ExpandedRowDetailsPane: FC<ExpandedRowDetailsPaneProps> = ({
  sections,
  dataTestSubj,
}) => {
  return (
    <div data-test-subj={dataTestSubj ?? 'transformDetailsTabContent'}>
      <EuiFlexGroup>
        <EuiFlexItem style={{ width: '50%' }}>
          {sections
            .filter((s) => s.position === 'left')
            .map((s) => (
              <Fragment key={s.title}>
                <EuiSpacer size="s" />
                <Section section={s} />
              </Fragment>
            ))}
        </EuiFlexItem>
        <EuiFlexItem style={{ width: '50%' }}>
          {sections
            .filter((s) => s.position === 'right')
            .map((s) => (
              <Fragment key={s.title}>
                <EuiSpacer size="s" />
                <Section section={s} />
              </Fragment>
            ))}
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
