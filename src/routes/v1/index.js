const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const projectRoute = require('./project.route');
const sprintRoutes = require('./sprint.route');
const sendbirdRoutes = require('./sendbird.route')
const ticketRoutes = require('./ticket.route')
const ticketTypeRoutes = require('./ticketType.route')
const requirementsRoutes = require('./requirements.route')
const documentsRoute = require('./documents.route')
const linkedTicketRoute = require('./linkedTicket.route')

const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/projects',
    route: projectRoute,
  },
  {
    path: '/projects/:projectId/sprints',
    route: sprintRoutes,
  },
  {
    path: '/projects/:projectId/ticket-types',
    route: ticketTypeRoutes
  },
  {
    path: '/projects/:projectId/ticket',
    route: ticketRoutes,
  },
  {
    path: '/projects/:projectId/requirements',
    route: requirementsRoutes,
  },
  {
    path: '/sendbird',
    route: sendbirdRoutes
  },

  {
    path: '/projects/:projectId/documents',
    route: documentsRoute
  },

  {
    path: '/projects/:projectId/link',
    route: linkedTicketRoute
  }
  

];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
