import Head from 'next/head'
import React from 'react';
import styles from '../styles/Home.module.css'
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { orange } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#edf6ff',
    color: '#0070f3',
    maxWidth: 1000,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #0070f3',
  },
}))(Tooltip);

const HtmlTooltipNext = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#fff8f2',
    color: '#ff9138',
    maxWidth: 1000,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #ff9138',
  },
}))(Tooltip);

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  },
}))(Button);

export default function Home({ launchesPast,launchNext }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX Launches</title>
      </Head>

      <main className={styles.main}>
        <br/>
        <h1 className={styles.title}>
          SpaceX Launches
        </h1>

        <h3 className={styles.description} style={{color:"#006ae2"}}>
          Past Launches from SpaceX
        </h3>

        <div className={styles.grid}>
          {launchesPast.map(launch => {
            return (
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">{launch.details}</Typography>
                  </React.Fragment>
                }
              >
                <a key={launch.id} href={launch.links.video_link} className={styles.card}>
                  <h3>{ launch.mission_name }</h3>
                  <h4>with: {launch.rocket.rocket_name  } ({launch.rocket.rocket_type}) / {launch.launch_success?"Successed":"Failed"}</h4>
                  <p><strong>Launch Date:</strong> { new Date(launch.launch_date_local).toLocaleDateString("en-US") }</p>
                  <p><strong>Launch Site:</strong> {launch.launch_site.site_name_long}</p>
                  <br/>
                  <div>
                    <Button size="small" variant="contained" color="primary" href={launch.links.article_link}>Learn More</Button>
                  </div>
                </a>
              </HtmlTooltip>
              
            );
          })}
        </div>

        <br/><br/><br/>
        <h3 className={styles.description} style={{color:"#df6908"}}>
          Next Launches from SpaceX
        </h3>

        <div className={styles.grid}>
          <HtmlTooltipNext
            title={
              <React.Fragment>
                <Typography color="inherit">{launchNext.details}</Typography>
              </React.Fragment>
            }
          >
            <a key={launchNext.id} href={launchNext.links.video_link} className={styles.cardNext}>
              <h3>{ launchNext.mission_name }</h3>
              <h4>with: {launchNext.rocket.rocket_name  } ({launchNext.rocket.rocket_type}) </h4>
              <p><strong>Launch Date:</strong> { new Date(launchNext.launch_date_local).toLocaleDateString("en-US") }</p>
              <p><strong>Launch Site:</strong> {launchNext.launch_site.site_name_long}</p>
            </a>
          </HtmlTooltipNext>
        </div>
      </main>

      <footer className={styles.footer}>
        React GraphQL Challenge - SpaceX API / By Ellen 2021
      </footer>
    </div>
  )
}

export async function getStaticProps() {

  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query GetLaunches {
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
        },
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
    `
  });



  return {
    props: {
      launchesPast: data.launchesPast,
      launchNext: data.launchNext
    }
  }
}