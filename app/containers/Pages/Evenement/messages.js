/*
 * Blank Page Messages
 *
 * This contains all the text for the Blank Page.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.Evenement';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Evenement',
  },
  paperTitle: {
    id: `${scope}.paper.title`,
    defaultMessage: 'Evenement',
  },
  paperSubtitle: {
    id: `${scope}.paper.subtitle`,
    defaultMessage: "Création d'un evenement",
  },
  content: {
    id: `${scope}.paper.content`,
    defaultMessage: 'Contenu',
  },
});
