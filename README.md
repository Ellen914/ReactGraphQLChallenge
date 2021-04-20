# ReactGraphQLChallenge

## Summary

Using the SpaceX graphql API, create a simple react app that will show the following data.

https://api.spacex.land/graphql/

GET: igraphql viewer
POST: graphql api endpoint

### Past Launches

```bash
{
  launchesPast(limit: 10) {
    id
    mission_name
    launch_date_local
    launch_site {
      site_name_long
    }
    links {
      article_link
      video_link
    }
    rocket {
      rocket_name
      rocket_type
    }
    launch_success
    details
  }
}
```

### Next Launches

```bash
{
  launchNext {
    launch_date_local
    id
    launch_site {
      site_name_long
    }
    launch_success
    links {
      article_link
      video_link
    }
    rocket {
      rocket_name
      rocket_type
    }
    details
    mission_name
  }
}

```

## Installation

Install @material-ui with npm:

```shell
cd my-spacex
npm install @material-ui/core
```
Install @material-ui with yarn:

```shell
cd my-spacex
yarn add @material-ui/core
```

## Getting started

```shell
cd my-spacex
npm run dev
```
