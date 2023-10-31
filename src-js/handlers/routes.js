const express = require('express');

async function routesHandler (req, res) {
  const random = req.query.random

  if (!random) {
    return res.json({
      routes: [], // await WORLDS.worlds(),
    });
  }

  const count = req.query.count || 1;
  const routes = []
  for (let i=0; i < count; i++) {
    // routes.push(await WORLDS.generate())
    routes.push({})
  }
  return res.json({
    routes,
  });
};

module.exports = {
  routesHandler,
};
