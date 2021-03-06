import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock } from 'enl-components';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import messages from './messages';
import EventItem from '../../../components/ListEvent/EventItem';
import ListEvent from '../../../components/ListEvent';

function Evenement(props) {
  const title = brand.name + ' - Evenement';
  const description = brand.desc;
  const { intl } = props;
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock
        title={intl.formatMessage(messages.paperTitle)}
        // icon="tasks"
        desc={intl.formatMessage(messages.paperSubtitle)}
      >
        {/* <FormattedMessage {...messages.content} /> */}
        <ListEvent />
      </PapperBlock>
    </div>
  );
}

Evenement.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Evenement);
